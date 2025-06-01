package wap.starlist.error.exception;

import wap.starlist.error.ErrorCode;

public class FolderNotFoundException extends NotFoundException {
    public FolderNotFoundException() {
        super(ErrorCode.FOLDER_NOT_FOUND);
    }
}
