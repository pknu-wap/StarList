package wap.starlist.bookmark.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FolderErrorResponse {

    private String code;

    private String message;
}