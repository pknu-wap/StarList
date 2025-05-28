package wap.starlist.bookmark.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReminderBookmarkErrorResponse {

    private String code;

    private String message;
}
