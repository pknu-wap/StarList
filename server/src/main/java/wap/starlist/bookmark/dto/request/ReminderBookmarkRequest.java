package wap.starlist.bookmark.dto.request;

import lombok.Getter;

@Getter
public class ReminderBookmarkRequest {

    // 알림 비활성화 여부 -> true로 요청 시 비활성화
    private Boolean remindDisabled;
}
