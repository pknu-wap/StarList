package wap.starlist.error.exception;

import wap.starlist.error.ErrorCode;

public class BookmarkNotFoundException extends NotFoundException {

    public BookmarkNotFoundException() {
        super(ErrorCode.BOOKMARK_NOT_FOUND);
    }
}
