package wap.starlist.bookmark.service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;

import java.util.Queue;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StopWatch;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.domain.Root;
import wap.starlist.bookmark.dto.request.BookmarkCreateRequest;
import wap.starlist.bookmark.dto.request.BookmarkEditRequest;
import wap.starlist.bookmark.dto.request.BookmarkMoveRequest;
import wap.starlist.bookmark.dto.request.BookmarkTreeNode;
import wap.starlist.bookmark.repository.BookmarkRepository;
import wap.starlist.bookmark.repository.FolderRepository;
import wap.starlist.bookmark.repository.RootRepository;
import wap.starlist.error.exception.BookmarkNotFoundException;
import wap.starlist.error.exception.FolderNotFoundException;
import wap.starlist.util.ImageScraper;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final FolderRepository folderRepository;
    private final RootRepository rootRepository;

    @Transactional // 트랜잭션을 보장하기 위해
    public Bookmark createBookmark(String memberProviderId, BookmarkCreateRequest request) {
        String title = request.getTitle();
        String url = request.getUrl();
        Long folderId = request.getFolderId();

        // 중복 확인
        List<Bookmark> found = bookmarkRepository.findByUrl(url);

        if (!found.isEmpty()) {
            // 이미 있다면 추가된 날짜 수정
            Bookmark bookmark = found.get(0);
            bookmark.updateDateAdded();
            return bookmarkRepository.save(bookmark);
        }

        // 웹 페이지의 이미지 파싱
        String imgUrl = scrapImageOrEmpty(url);

        // 폴더 확인
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(FolderNotFoundException::new);

        // 전달받은 값으로 임시 북마크 생성
        Bookmark bookmark = Bookmark.builder()
                .title(title)
                .url(url)
                .image(imgUrl)
                .dateAdded(System.currentTimeMillis())
                .folder(folder) // 북마크 -> 폴더 연관관계 설정
                .build();

        // 폴더 -> 북마크 연관관계 설정, folder는 영속 상태이기 때문에 save하지 않아도 됨
        folder.addChildBookmark(bookmark);

        // 북마크 저장
        return bookmarkRepository.save(bookmark);
    }

    @Transactional(readOnly = true)
    public Bookmark getBookmark(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("[ERROR] id 값이 존재하지 않습니다.");
        }

        // id로 북마크 조회
        return bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("[ERROR] 해당 북마크가 존재하지 않습니다."));
    }

    @Transactional
    public int deleteBookmarks(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            throw new IllegalArgumentException("[ERROR] 삭제할 북마크를 하나 이상 선택해 주세요.");
        }
        bookmarkRepository.deleteAllByIds(ids);
        return ids.size();
    }

    @Transactional
    public Root saveAll(List<BookmarkTreeNode> bookmarkTreeNodes, String loginUser) {
        if (bookmarkTreeNodes.size() != 1) {
            throw new IllegalArgumentException("[ERROR] 잘못된 북마크 트리 구조입니다. 관리자에게 문의해주세요.");
        }

        // 속도 측정
        StopWatch stopWatch = new StopWatch("saveAll-new");
        try {
            Root root = bookmarkTreeNodes.get(0).toRoot();
            rootRepository.save(root); // 연관관계 설정을 위해 엔티티를 미리 저장

            List<BookmarkTreeNode> children = bookmarkTreeNodes.get(0).getChildren();

            for (BookmarkTreeNode child : children) {
                stopWatch.start("user=" + loginUser + "child_" + child.getTitle());

                Folder folder = saveTreeByBfs(child, root);
                root.addFolder(folder);
                stopWatch.stop();
            }

            return root;
        } finally {
            log.info("[saveAll-new] 전체 트리 저장 총 소요 시간: {} ms", stopWatch.getTotalTimeMillis());
            for (StopWatch.TaskInfo info : stopWatch.getTaskInfo()) {
                log.info("[saveAll-new] Task: {}, Time: {} ms", info.getTaskName(), info.getTimeMillis());
            }
        }
    }

    public List<Bookmark> search(String memberProviderId, String query) {
        log.info("[Bookmark search]: query={}", query);

        // N번 수행
        List<Bookmark> foundBookmarks = bookmarkRepository.findByTitleContaining(query);

        // M log N번 수행
        return foundBookmarks.stream()
                .filter(bookmark -> {
                    Folder current = bookmark.getFolder();
                    if (current == null) {
                        log.warn("폴더에 속하지 않은 북마크를 검색하였습니다. bookmark: {}", bookmark.getTitle());
                        return false;
                    }

                    while (current.getParent() != null) {
                        current = current.getParent();
                    }
                    Root root = current.getRoot();
                    if (root == null || root.getMember() == null) {
                        log.warn("동기화되지 않은 북마크를 검색하였습니다. bookmark: {}", bookmark.getTitle());
                        return false;
                    }
                    return root.getMember().getProviderId().equals(memberProviderId);
                }).toList();
    }

    // 3개월 전 북마크 중 최대 15개 조회
    @Transactional(readOnly = true)
    public List<Bookmark> getReminderBookmarks() {
        long threeMonthsAgo = Instant.now()
                .minus(3, ChronoUnit.MONTHS)
                .toEpochMilli();

        return bookmarkRepository.findReminderTargets(threeMonthsAgo, PageRequest.of(0, 15));
    }

    // 리마인드 후 lastRemindTime 갱신
    @Transactional
    public void markReminded(List<Bookmark> bookmarks) {
        long now = Instant.now().toEpochMilli();
        bookmarks.forEach(bookmark -> bookmark.setLastRemindTime(now));
    }

    // 특정 북마크 리마인드 비활성화
    @Transactional
    public void disableRemind(Long id) {
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("[ERROR] 북마크가 존재하지 않습니다."));
        bookmark.setRemindDisabled(true);
        bookmarkRepository.save(bookmark);
    }

    @Transactional
    public void edit(Long id, BookmarkEditRequest request) {
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(BookmarkNotFoundException::new);


        log.info("[북마크 수정] 제목: {}", request.getTitle());
        bookmark.update(request.getTitle(), request.getUrl());
    }

    @Transactional
    public void move(BookmarkMoveRequest request) {
        bookmarkRepository.moveToFolder(request.getMoveTo(), request.getBookmarks());
        folderRepository.moveToFolder(request.getMoveTo(), request.getFolders());
    }

    private Folder saveTreeByBfs(BookmarkTreeNode topFolder, Root root) {
        Folder top = null;
        Queue<BookmarkTreeNode> folderQueue = new ArrayDeque<>();
        Queue<Object> parentQueue = new ArrayDeque<>();

        folderQueue.add(topFolder);
        parentQueue.add(root);

        while (!folderQueue.isEmpty() && !parentQueue.isEmpty()) {
            BookmarkTreeNode current = folderQueue.poll();
            Object parent = parentQueue.poll();

            Folder currentFolder;
            if (parent instanceof Folder) {
                currentFolder = current.toFolderWithParent((Folder) parent);
                ((Folder) parent).addChildFolder(currentFolder);
            } else if (parent instanceof Root) {
                currentFolder = current.toTopFolder(root);
                top = currentFolder;

            } else {
                throw new IllegalArgumentException("[ERROR] 부모 노드가 Root 혹은 Folder가 아닙니다.");
            }

            folderRepository.save(currentFolder); // builder-default로 new ArrayList?

            List<Bookmark> bookmarkChildren = new ArrayList<>();
            // 자식 순회
            for (BookmarkTreeNode child : current.getChildren()) {
                if (isBookmark(child)) { // 노드가 북마크인 경우
                    String imgUrl = scrapImageOrEmpty(child.getUrl()); // 이미지 기져오기
                    bookmarkChildren.add(child.toBookmark(imgUrl, currentFolder));
                } else { // 노드가 폴더인 경우
                    folderQueue.add(child);
                    parentQueue.add(currentFolder);
                }
            }

            currentFolder.updateChildBookmarks(bookmarkChildren);
            bookmarkRepository.saveAll(bookmarkChildren);
        }
        return top;
    }

    private boolean isBookmark(BookmarkTreeNode node) {
        return node.getChildren() == null;
    }

    private String scrapImageOrEmpty(String url) {
        String imgUrl = "";
        try {
            //TODO: orElse로 기본 이미지 가져오기
            log.info("이미지 가져오기 - {}", url);
            imgUrl = ImageScraper.getImageFromOgOrImgTag(url)
                    .orElseThrow(() -> new IllegalArgumentException("[ERROR] 이미지 스크랩 실패"));
            log.info("스크랩 이미지 url: {}", imgUrl);
        } catch (IllegalArgumentException | IOException e){
            log.warn("해당 URL을 파싱할 수 없음: {}", url, e);
        }

        // imgUrl의 UTF-8 바이트 길이가 2048을 초과하면 빈값 반환 (저장 안함)
        if (imgUrl.getBytes(StandardCharsets.UTF_8).length > 2048) {
            log.warn("imgUrl이 VARCHAR(2048) 범위를 초과: {}", imgUrl);
            return "";
        }

        return imgUrl;
    }
}
