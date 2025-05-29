package wap.starlist.bookmark.dto.response;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SearchResponse {
    private List<BookmarkNodeResponse> bookmarks;
    private List<BookmarkNodeResponse> folders;

    public static SearchResponse of(List<Bookmark> bookmarks, List<Folder> folders) {
        List<BookmarkNodeResponse> bookmarkNodes = bookmarks.stream().map(BookmarkNodeResponse::fromBookmark).toList();
        List<BookmarkNodeResponse> folderNodes = folders.stream().map(BookmarkNodeResponse::fromFolder).toList();
        return new SearchResponse(bookmarkNodes, folderNodes);
    }
}
