package wap.starlist.bookmark.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookmarksDeleteResponse {
    private final String code;
    private final String message;
    private final int count;
}
