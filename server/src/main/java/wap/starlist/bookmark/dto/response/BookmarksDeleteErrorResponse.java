package wap.starlist.bookmark.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookmarksDeleteErrorResponse {
    private final String code;
    private final String message;
}
