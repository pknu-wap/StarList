package wap.starlist.bookmark.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.domain.Root;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkTreeNode {

    private String id; // google id
    private Boolean syncing;
    private String title;
    private Long dateAdded;
    private Long dateGroupModified;
    private Integer index;
    private Integer parentId;
    private String url;
    private String folderType;
    private List<BookmarkTreeNode> children;

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
                .bookmarks(childBookmarks)
                .folders(childFolders)
                .build();
    }

    public Bookmark toBookmark() {
        System.out.println("[INFO] to BOOKMARK");
        return Bookmark.builder()
                .googleId(Long.parseLong(id))
                .title(title)
                .url(url)
                .dateAdded(dateAdded)
                .dateGroupModified(dateGroupModified)
                .parentId(parentId)
                .build();
    }
}
