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
    private List<Bookmark> bookmarks;
    private List<Folder> folders;

    public static SearchResponse of(List<Bookmark> bookmarks, List<Folder> folders) {
        return new SearchResponse(bookmarks, folders);
    }
}
