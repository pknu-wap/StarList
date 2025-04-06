package wap.starlist.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookmarkResponse {

    // TODO: NotBlank로 검사하기
    Long bookmarkId;
}
