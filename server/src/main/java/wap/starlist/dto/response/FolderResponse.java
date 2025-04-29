package wap.starlist.dto.response;

import lombok.Builder;
import lombok.Getter;
import wap.starlist.domain.Folder;

@Getter
@Builder
public class FolderResponse {

    private Long folderId;

    private String message;

    // Folder를 전달받아 response 객체를 생성하는 정적 팩토리 메서드
    public static FolderResponse from(Folder folder) {
        return FolderResponse.builder()
                .folderId(folder.getId())
                .build();
    }
}