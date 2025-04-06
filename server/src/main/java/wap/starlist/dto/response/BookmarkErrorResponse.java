package wap.starlist.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookmarkErrorResponse {

    private String code;

    private String message;
}
