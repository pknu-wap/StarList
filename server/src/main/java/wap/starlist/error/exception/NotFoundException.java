package wap.starlist.error.exception;

import wap.starlist.error.ErrorCode;

public class NotFoundException extends BaseException {

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public NotFoundException() {
        super(ErrorCode.NOT_FOUND);
    }

}
