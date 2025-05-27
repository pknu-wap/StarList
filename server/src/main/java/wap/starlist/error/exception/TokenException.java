package wap.starlist.error.exception;

import wap.starlist.error.ErrorCode;

public class TokenException extends BaseException {

    public TokenException(ErrorCode errorCode) {
        super(errorCode);
    }
}
