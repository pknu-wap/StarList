package wap.starlist.error;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ErrorResponse {

    private final String code;
    private final String message;
    private final String path;
    private final LocalDateTime timestamp;

    @Builder
    public ErrorResponse(String code, String message, String path) {
        this.code = code;
        this.message = message;
        this.path = path;
        this.timestamp = LocalDateTime.now();
    }

    public static ErrorResponse of(final ErrorCode errorCode, String path) {
        return ErrorResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .path(path)
                .build();
    }
}
