package wap.starlist.bookmark.dto.response;

import lombok.Builder;
import lombok.Getter;
import wap.starlist.bookmark.domain.Folder;

@Getter
@Builder
public class FolderResponse {

    private Long folderId;

    private String title;

    private Integer googleId;

    private Integer position;

    private String folderType;

    private Long dateAdded;

    private Long dateGroupModified;

    private String message;

    // Folder를 전달받아 response 객체를 생성하는 정적 팩토리 메서드
    public static FolderResponse from(Folder folder) {
        return FolderResponse.builder()
                .folderId(folder.getId())
                .title(folder.getTitle())
                .googleId(folder.getGoogleId())
                .position(folder.getPosition())
                .folderType(folder.getFolderType())
                .dateAdded(folder.getDateAdded())
                .dateGroupModified(folder.getDateGroupModified())
                .build();
    }
}