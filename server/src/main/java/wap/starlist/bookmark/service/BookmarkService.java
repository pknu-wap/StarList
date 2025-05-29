package wap.starlist.bookmark.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.domain.Root;
import wap.starlist.bookmark.dto.request.BookmarkTreeNode;
import wap.starlist.bookmark.dto.response.BookmarkNodeResponse;
import wap.starlist.bookmark.repository.BookmarkRepository;
import wap.starlist.bookmark.repository.FolderRepository;
import wap.starlist.bookmark.repository.RootRepository;
import wap.starlist.util.ImageScraper;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkService {

    private static final long MILLIS_PER_SECOND = 1000L;

    private final BookmarkRepository bookmarkRepository;
    private final FolderRepository folderRepository;
    private final RootRepository rootRepository;

    @Transactional // 트랜잭션을 보장하기 위해
    public Bookmark createBookmark(String memberProviderId, String title, String url) {
        // 중복 확인
        List<Bookmark> found = bookmarkRepository.findByUrl(url);

        if (!found.isEmpty()) {
            // 이미 있다면 추가된 날짜 수정
            Bookmark bookmark = found.get(0);
            bookmark.updateDateAdded();
            return bookmarkRepository.save(bookmark);
        }

        // 웹 페이지의 이미지 파싱
        String imgUrl = scrapImage(url);

        // 전달받은 값으로 임시 북마크 생성
        Bookmark bookmark = Bookmark.builder()
                .title(title)
                .url(url)
                .image(imgUrl)
                .dateAdded(currentTime())
                .build();

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

        List<Bookmark> toDelete = bookmarkRepository.findAllById(ids);
        if (toDelete.isEmpty()) {
            return 0; // 존재하는 북마크만 삭제
        }

        bookmarkRepository.deleteAll(toDelete); // 북마크 일괄 삭제

        return toDelete.size(); // 삭제된 북마크 개수 반환
    }


    // 상위 객체를 저장하기 위해 하위 객체를 준비해야하므로 Bottom-up으로 DFS를 통해 구현
    //TODO: 의미가 중복된 컬럼 제거해야함
    @Transactional
    public Root saveAll(List<BookmarkTreeNode> bookmarkTreeNodes) {
        if (bookmarkTreeNodes.size() != 1) {
            throw new IllegalArgumentException("[ERROR] 잘못된 북마크 트리 구조입니다. 관리자에게 문의해주세요.");
        }

        Root root = bookmarkTreeNodes.get(0).toRoot();
        List<BookmarkTreeNode> children = bookmarkTreeNodes.get(0).getChildren();

        rootRepository.save(root); // 연관관계 설정을 위해 엔티티를 미리 저장

        for (BookmarkTreeNode child : children) {
            System.out.println("[INFO] child.getTitle() = " + child.getTitle());
            Folder folder = collectNode(child);
            if (folder == null) {
                continue; // root 직속 자식으로 북마크가 있는 경우는 제외
            }

            folder.mapToRoot(root);
            root.addFolder(folder);
        }

        if (root == null) {
            throw new IllegalArgumentException("[ERROR] 북마크가 최상위 노드일 순 없습니다.");
        }

        return root;
    }

    public List<Bookmark> search(String memberProviderId, String query) {
        log.info("[Bookmark search]: query={}", query);

        // N번 수행
        List<Bookmark> foundBookmarks = bookmarkRepository.findByTitleContaining(query);

        // M log N번 수행
        return foundBookmarks.stream()
                .filter(bookmark -> {
                    Folder folder = bookmark.getFolder();
                    while (folder.getParent() != null) {
                        folder = folder.getParent();
                    }
                    Root root = folder.getRoot();
                    return root.getMember().getProviderId().equals(memberProviderId);
                }).toList();
    }

    // DFS로 트리를 탐색
    // 연관관계의 주인은 하위 폴더 & 북마크이므로 자식이 부모와 연관관계를 설정하고 return 해야함
    private Folder collectNode(BookmarkTreeNode node) {
        if (isBookmark(node)) { // Bookmark
            String imgUrl = scrapImage(node.getUrl()); // 이미지 기져오기
            Bookmark leafBookmark = node.toBookmark(imgUrl);

            bookmarkRepository.save(leafBookmark);
            return null;
        }

        List<Folder> childFolders = new ArrayList<>();
        List<Bookmark> childBookmarks = new ArrayList<>();

        Folder currentFolder = node.toFolder(childFolders, childBookmarks); // 자식 없이 먼저 생성
        folderRepository.save(currentFolder); // ID 생성을 위해 먼저 저장

        // 현재 노드의 자식들을 탐색하며 db에 저장 or 다시 탐색한다
        for (BookmarkTreeNode child : node.getChildren()) {
            if (isBookmark(child)) { // Bookmark
                String imgUrl = scrapImage(child.getUrl()); // 이미지 가져오기
                Bookmark childBookmark = child.toBookmark(imgUrl);

                childBookmark.mapToFolder(currentFolder);
                bookmarkRepository.save(childBookmark);
                childBookmarks.add(childBookmark);
            } else { // Folder
                Folder childFolder = collectNode(child);
                childFolders.add(childFolder);
            }
        }

        // 연관관계를 수동으로 설정
        currentFolder.updateChildFolders(childFolders);
        currentFolder.updateChildBookmarks(childBookmarks);
        folderRepository.save(currentFolder);
        return currentFolder;
    }

    private boolean isBookmark(BookmarkTreeNode node) {
        return node.getChildren() == null;
    }

    // 현재 시간을 millis를 제외한 long으로 반환
    private long currentTime() {
        return System.currentTimeMillis() / MILLIS_PER_SECOND;
    }

    private String scrapImage(String url) {
        String imgUrl = "";
        try {
            //TODO: orElse로 기본 이미지 가져오기
            log.info("이미지 가져오기 - {}", url);
            imgUrl = ImageScraper.getImageUrl(url)
                    .orElseThrow(() -> new IllegalArgumentException("[ERROR] 이미지 스크랩 실패"));
            log.info("스크랩 이미지 url: {}", imgUrl);
        } catch (IllegalArgumentException | IOException e){
            log.warn("해당 URL을 파싱할 수 없음: {}", url, e);
        }
        return imgUrl;
    }
}
