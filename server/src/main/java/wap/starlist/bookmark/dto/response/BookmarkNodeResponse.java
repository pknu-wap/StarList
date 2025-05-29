package wap.starlist.bookmark.dto.response;

import lombok.Builder;
import lombok.Getter;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;

@Getter
@Builder
public class BookmarkNodeResponse {

    private Long id; // db에 존재하는 고유 id
    private String googleId;
    private Boolean syncing;
    private String title;
    private Long dateAdded;
    private Long dateGroupModified;
    private Integer index;
    private Integer parentId;
    private String url;
    private String folderType;
    private String image;

    public static BookmarkNodeResponse fromFolder(Folder folder) {
        return BookmarkNodeResponse.builder()
                .id(folder.getId())
                .googleId(String.valueOf(folder.getGoogleId()))
                .title(folder.getTitle())
                .dateAdded(folder.getDateAdded())
                .dateGroupModified(folder.getDateGroupModified())
                .index(folder.getPosition())
                .folderType(folder.getFolderType())
                .build();
    }

    public static BookmarkNodeResponse fromBookmark(Bookmark bookmark) {
        return BookmarkNodeResponse.builder()
                .id(bookmark.getId())
                .googleId(String.valueOf(bookmark.getGoogleId()))
                .title(bookmark.getTitle())
                .dateAdded(bookmark.getDateAdded())
                .dateGroupModified(bookmark.getDateGroupModified())
                .index(bookmark.getPosition())
                .url(bookmark.getUrl())
                .image(bookmark.getImage())
                .build();

    }
}
