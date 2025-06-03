package wap.starlist.bookmark.dto.request;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookmarkMoveRequest {

    private Long moveTo;
    private List<Long> bookmarks;
    private List<Long> folders;
}
