package wap.starlist.bookmark.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.dto.request.FolderCreateRequest;
import wap.starlist.bookmark.dto.response.BookmarkNodeResponse;
import wap.starlist.bookmark.dto.response.FolderErrorResponse;
import wap.starlist.bookmark.dto.response.FolderResponse;
import wap.starlist.bookmark.service.FolderService;

import java.net.URI;

@Slf4j
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
                .folderId(createdFolder.getId())
                .message("폴더가 생성되었습니다.")
                .build();

        return ResponseEntity.created(location).body(response);
    }

    //id로 폴더 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getFolder(@PathVariable("id") Long id) {

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

    @GetMapping("/children/{id}")
    public ResponseEntity<?> getChildren(@PathVariable("id") Long id) {
        log.info("[INFO] 요청된 폴더의 하위 노드 가져오기 : {}", id);
        List<BookmarkNodeResponse> nodes = folderService.getChildrenOfFolder(id);
        return ResponseEntity.ok().body(nodes);
    }

    @GetMapping("/top-folders")
    public ResponseEntity<?> getTopFolders(@AuthenticationPrincipal String loginUser) {
        log.info("최상위 폴더 가져오기");
        List<BookmarkNodeResponse> childFolders = folderService.getChildrenOfRoot(loginUser);
        return ResponseEntity.ok().body(childFolders);
    }
}