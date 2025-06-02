package wap.starlist.bookmark.dto.request;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkMoveRequest {

    private Long moveTo;
    private List<Long> bookmarks;
    private List<Long> folders;
}
