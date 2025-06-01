package wap.starlist.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "1001", "잘못된 HTTP 메서드를 호출했습니다."),

    ACCESS_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "2001", "액세스 토큰이 만료되었습니다."),
    REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "2002", "리프레시 토큰이 만료되었습니다."),

    NOT_FOUND(HttpStatus.NOT_FOUND, "3000", "존재하지 않는 엔티티입니다."),
    TOP_FOLDERS_NOT_FOUND(HttpStatus.NOT_FOUND, "3001", "최상위 폴더가 존재하지 않습니다."),
    BOOKMARK_NOT_FOUND(HttpStatus.NOT_FOUND, "3002", "북마크가 존재하지 않습니다."),
    FOLDER_NOT_FOUND(HttpStatus.NOT_FOUND, "3003", "폴더가 존재하지 않스니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
