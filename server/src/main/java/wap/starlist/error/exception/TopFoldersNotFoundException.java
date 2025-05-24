package wap.starlist.error.exception;

import wap.starlist.error.ErrorCode;

public class TopFoldersNotFoundException extends NotFoundException {

    public TopFoldersNotFoundException() {
        super(ErrorCode.TOP_FOLDERS_NOT_FOUND);
    }
}
