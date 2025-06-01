package wap.starlist.bookmark.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookmarkEditRequest {

    private String title;
    private String url;
    private Long folderId;
    private Integer position;
}
