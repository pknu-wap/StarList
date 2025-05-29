package wap.starlist.bookmark.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.domain.Root;
import wap.starlist.bookmark.dto.response.BookmarkNodeResponse;
import wap.starlist.bookmark.dto.response.FolderTreeNode;
import wap.starlist.bookmark.repository.FolderRepository;
import wap.starlist.bookmark.repository.RootRepository;
import wap.starlist.error.exception.TopFoldersNotFoundException;

@Slf4j
@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderRepository folderRepository;
    private final RootRepository rootRepository;

    public Folder createFolder(String title, Long userId) {
        // 필수값 검증(title, userId 존재 여부 확인)
        if (userId == null) {
            throw new IllegalArgumentException("[ERROR] 유저 정보가 존재하지 않습니다.");
        } else if (!StringUtils.hasText(title)) {
            throw new IllegalArgumentException("[ERROR] 폴더명이 존재하지 않습니다.");
        }

        //TODO: userId와 googleId는 매치되지 않음
        Folder folder = Folder.builder()
                .title(title)
                //.googleId(userId)
                .build();

        return folderRepository.save(folder);
    }

    public Folder getFolder(long id) {
        // id로 폴더 조회
        return folderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("[ERROR] 해당 폴더가 존재하지 않습니다."));
    }

    //폴더 삭제 메서드
    public void deleteFolder(Long id) {
        Folder folder = getFolder(id);
        folderRepository.delete(folder);
    }

    /**
     * @param id: jpa에서 자동으로 생성되는 id값을 의미한다. 이를 통해 member에 해당하는 폴더를 찾기 위해 불필요한 쿼리를 작성하지 않아도 된다.
     * @return
     */
    public List<BookmarkNodeResponse> getChildrenOfFolder(Long id) {
        Optional<Folder> found = folderRepository.findById(id);

        if (found.isPresent()) {
            List<Bookmark> bookmarks = found.get().getBookmarks();
            List<Folder> folders = found.get().getFolders();
            List<BookmarkNodeResponse> nestedNodes = new ArrayList<>();

            //TODO: parentId가 null인 오류 수정
            for (Bookmark bookmark : bookmarks) {
                nestedNodes.add(BookmarkNodeResponse.fromBookmark(bookmark));
            }
            for (Folder folder : folders) {
                nestedNodes.add(BookmarkNodeResponse.fromFolder(folder));
            }

            return nestedNodes;
        }
        log.warn("폴더의 하위 노드가 존재하지 않음: id={}", id);
        return Collections.emptyList();
    }

    public List<BookmarkNodeResponse> getChildrenOfRoot(String memberProviderId) {
        Root found = rootRepository.findByMemberProviderId(memberProviderId)
                .orElseThrow(TopFoldersNotFoundException::new);

        return found.getFolders().stream()
                .map(BookmarkNodeResponse::fromFolder).toList();
    }

    public FolderTreeNode getTreeOf(String memberProviderId) {
        Root found = rootRepository.findByMemberProviderId(memberProviderId)
                .orElseThrow(TopFoldersNotFoundException::new);

        FolderTreeNode root = FolderTreeNode.from(found);
        for (Folder top : found.getFolders()) {
            FolderTreeNode topFolder = collectFolder(top);
            root.getChildren().add(topFolder);
        }

        log.info("[service#getTreeOf] user: {}, found root id: {}, folders size: {}",
                found.getMember().getName(), found.getId(), found.getFolders().size());
        return root;
    }

    public List<Folder> search(String memberProviderId, String query) {
        log.info("[Folder search]: query={}", query);
        // N번
        List<Folder> foundFolders = folderRepository.findByTitleContaining(query);

        // M log N번
        return foundFolders.stream()
                .filter(folder -> {
                    Folder current = folder;
                    while (current.getParent() != null) {
                        current = current.getParent();
                    }
                    Root root = current.getRoot();
                    if (root == null || root.getMember() == null) {
                        log.warn("동기화되지 않은 폴더를 검색하였습니다. folder: {}", folder.getTitle());
                        return false; // 동기화되지 않은 폴더나 root가 없는 폴더는 제외
                    }
                    return root.getMember().getProviderId().equals(memberProviderId);
                }).toList();
    }

    private FolderTreeNode collectFolder(Folder folder) {
        FolderTreeNode parent = FolderTreeNode.from(folder);
        for (Folder childEntity : folder.getFolders()) {
            FolderTreeNode child = collectFolder(childEntity);
            parent.addChild(child);
        }

        return parent;
    }
}