package wap.starlist.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wap.starlist.domain.Folder;
import wap.starlist.dto.request.FolderCreateRequest;
import wap.starlist.dto.response.FolderErrorResponse;
import wap.starlist.dto.response.FolderResponse;
import wap.starlist.service.FolderService;

import java.net.URI;

@RestController
@RequestMapping("/folders")
@RequiredArgsConstructor
public class FolderController {

    private final FolderService folderService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody FolderCreateRequest request) {
        String title = request.getTitle();
        Long userId = request.getUserId();

        // 폴더 생성
        Folder createdFolder = folderService.createFolder(title, userId);

        // 생성된 폴더 위치 URI
        URI location = URI.create("/folders/" + createdFolder.getId());

        // 응답 객체 생성
        FolderResponse response = FolderResponse.builder()
                .folderId(createdFolder.getId()).build();

        return ResponseEntity.created(location).body(response);
    }

    //id로 폴더 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getFolder(@PathVariable Long id) {

        Folder folder;

        try {
            folder = folderService.getFolder(id);
        } catch (IllegalArgumentException e) {
            FolderErrorResponse folderNotFound = FolderErrorResponse.builder()
                    .code("FOLDER_NOT_FOUND").message("해당 폴더가 존재하지 않습니다.").build();

            return ResponseEntity.badRequest().body(folderNotFound);
        }

        FolderResponse response = FolderResponse.from(folder);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFolder(@PathVariable("id") Long id) {
        try {
            folderService.deleteFolder(id);
        } catch (IllegalArgumentException e) {
            FolderErrorResponse folderNotFound = FolderErrorResponse.builder()
                    .code("FOLDER_NOT_FOUND").message("해당 폴더가 존재하지 않습니다.").build();

            return ResponseEntity.badRequest().body(folderNotFound);
        }
        return ResponseEntity.noContent().build(); // 삭제 성공 시 204 No Content
    }
}