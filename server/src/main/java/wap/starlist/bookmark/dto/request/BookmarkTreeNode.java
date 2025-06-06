package wap.starlist.bookmark.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.domain.Root;

import java.util.ArrayList;
import java.util.List;

/**
 * sync 요청을 받을 때만 사용한다. 그 이후엔 클라이언트에서 id값으로 요청을 주고받기 때문이다.
 * 이 id값은 serverId를 의미하고
 */
@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkTreeNode {

    private String id; // google에서 제공하는 북마크 id를 의미
    private Boolean syncing;
    private String title;
    private Long dateAdded;
    private Long dateGroupModified;
    private Long dateLastUsed;
    private Integer index;
    private Integer parentId;
    private String url;
    private String folderType;
    private List<BookmarkTreeNode> children;

//    public static BookmarkTreeNode createTreeFrom(Root root) {
//        List<BookmarkTreeNode> childFolders = new ArrayList<>();
//
//        // 하위 폴더없이 Root만 존재하는 경우
//        if (root.getFolders().isEmpty()) {
//            return BookmarkTreeNode.builder()
//                    .id(root.getId())
//                    .googleId(String.valueOf(root.getGoogleId()))
//                    .build();
//        }
//
//        for (Folder folder : root.getFolders()) {
//            childFolders.add(parseEntity(folder));
//        }
//
//        return BookmarkTreeNode.builder()
//                .id(root.getId())
//                .googleId(String.valueOf(root.getGoogleId()))
//                .children(childFolders)
//                .build();
//    }

    public Root toRoot() {
        System.out.println("[INFO] to ROOT");
        return Root.builder()
                .googleId(Long.parseLong(id))
                .build();
    }

    public Folder toFolder(List<Folder> childFolders, List<Bookmark> childBookmarks) {
        System.out.println("[INFO] to FOLDER");
        return Folder.builder()
                .googleId(Integer.parseInt(id))
                .title(title)
                .position(index)
                .dateAdded(dateAdded)
                .dateGroupModified(dateGroupModified)
                .bookmarks(childBookmarks)
                .folders(childFolders)
                .folderType(folderType)
                .build();
    }

    public Folder toTopFolder(Root root) {
        return Folder.builder()
                .googleId(Integer.parseInt(id))
                .title(title)
                .position(index)
                .dateAdded(dateAdded)
                .dateGroupModified(dateGroupModified)
                .bookmarks(new ArrayList<>())
                .folders(new ArrayList<>())
                .folderType(folderType)
                .root(root)
                .build();
    }

    public Folder toFolderWithParent(Folder folder) {
        return Folder.builder()
                .googleId(Integer.parseInt(id))
                .title(title)
                .position(index)
                .dateAdded(dateAdded)
                .dateGroupModified(dateGroupModified)
                .bookmarks(new ArrayList<>())
                .parent(folder)
                .folders(new ArrayList<>())
                .folderType(folderType)
                .build();
    }

    public Bookmark toBookmark(String imgUrl) {
        System.out.println("[INFO] to BOOKMARK");
        log.info("[TreeNode -> BOOKMARK] title={}, imgUrl={}", title, imgUrl);
        return Bookmark.builder()
                .googleId(Long.parseLong(id))
                .title(title)
                .url(url)
                .image(imgUrl)
                .syncing(syncing)
                .dateLastUsed(dateLastUsed)
                .dateAdded(dateAdded)
                .parentId(parentId)
                .position(index)
                .build();
    }

    public Bookmark toBookmark(String imgUrl, Folder folder) {
        System.out.println("[INFO] to BOOKMARK");
        log.info("[TreeNode -> BOOKMARK] title={}, imgUrl={}, dateLastused={}", title, imgUrl, dateLastUsed);
        return Bookmark.builder()
                .googleId(Long.parseLong(id))
                .title(title)
                .url(url)
                .image(imgUrl)
                .syncing(syncing)
                .dateLastUsed(dateLastUsed)
                .dateAdded(dateAdded)
                .parentId(parentId)
                .position(index)
                .folder(folder)
                .build();
    }

//    private static BookmarkTreeNode parseEntity(Folder folder) {
//        // 하위 폴더, 하위 북마크가 없다면 빈 배열을 담은 BookmarkTreeNode를 반환
//        if (folder.getFolders().isEmpty() && folder.getBookmarks().isEmpty()) {
//            return fromFolder(folder, Collections.emptyList());
//        }
//
//        List<BookmarkTreeNode> children = new ArrayList<>();
//
//        // 자식 폴더를 순회
//        if (!folder.getFolders().isEmpty()) {
//            for (Folder childFolder : folder.getFolders()) {
//                BookmarkTreeNode parsed = parseEntity(childFolder);
//                children.add(parsed);
//            }
//        }
//
//        // 자식 북마크를 순회
//        if (!folder.getBookmarks().isEmpty()) {
//            for (Bookmark childBookmark : folder.getBookmarks()) {
//                BookmarkTreeNode node = fromBookmark(childBookmark);
//                children.add(node);
//            }
//        }
//
//        return fromFolder(folder, children);
//    }

//    private static BookmarkTreeNode fromFolder(Folder folder, List<BookmarkTreeNode> children) {
//        Integer parentGoogleId = null;
//
//        if (folder.getParent() != null) {
//            parentGoogleId = folder.getParent().getGoogleId();
//        }
//
//        return BookmarkTreeNode.builder()
//                .id(folder.getId())
//                .googleId(String.valueOf(folder.getGoogleId()))
//                .title(folder.getTitle())
//                .dateAdded(folder.getDateAdded())
//                .dateGroupModified(folder.getDateGroupModified())
//                .index(folder.getPosition())
//                .parentId(parentGoogleId)
//                .folderType(folder.getFolderType())
//                .children(children)
//                .folderType(folder.getFolderType())
//                .build();
//    }
//
//    private static BookmarkTreeNode fromBookmark(Bookmark bookmark) {
//        return BookmarkTreeNode.builder()
//                .id(bookmark.getId())
//                .googleId(String.valueOf(bookmark.getGoogleId()))
//                .title(bookmark.getTitle())
//                .dateAdded(bookmark.getDateAdded())
//                .index(bookmark.getPosition())
//                .parentId(bookmark.getParentId())
//                .url(bookmark.getUrl())
//                .build();
//    }
}
