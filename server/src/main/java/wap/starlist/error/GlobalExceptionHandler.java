package wap.starlist.error;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import wap.starlist.error.exception.BookmarkNotFoundException;
import wap.starlist.error.exception.NotFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handle(HttpRequestMethodNotSupportedException e,
                                                HttpServletRequest request) {
        log.error(e.getClass().getSimpleName(), e);
        return buildErrorResponse(ErrorCode.METHOD_NOT_ALLOWED, request.getRequestURI());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handle(NotFoundException e, HttpServletRequest request) {
        log.error(e.getClass().getSimpleName(), e);
        return buildErrorResponse(e.getErrorCode(), request.getRequestURI());
    }

    @ExceptionHandler(BookmarkNotFoundException.class)
    public ResponseEntity<ErrorResponse> handle(BookmarkNotFoundException e, HttpServletRequest request) {
        log.error(e.getClass().getSimpleName(), e);
        return buildErrorResponse(e.getErrorCode(), request.getRequestURI());
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(ErrorCode errorCode, String path) {
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(ErrorResponse.of(errorCode, path));
    }
}
