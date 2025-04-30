package wap.starlist.bookmark.dto.request;

import lombok.Getter;
import java.util.List;

@Getter
public class BookmarksDeleteRequest {

    private List<Long> bookmarkIds;
}
