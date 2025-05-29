package wap.starlist.bookmark.controller;

import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.domain.Root;
import wap.starlist.bookmark.dto.request.BookmarkCreateRequest;
import wap.starlist.bookmark.dto.request.BookmarkTreeNode;
import wap.starlist.bookmark.dto.request.BookmarksDeleteRequest;
import wap.starlist.bookmark.dto.response.BookmarkErrorResponse;
import wap.starlist.bookmark.dto.response.BookmarkNodeResponse;
import wap.starlist.bookmark.dto.response.BookmarkResponse;
import wap.starlist.bookmark.dto.response.BookmarksDeleteResponse;
import wap.starlist.bookmark.service.BookmarkService;
import wap.starlist.bookmark.service.FolderService;
import wap.starlist.bookmark.service.RootService;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final RootService rootService;
    private final FolderService folderService;

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal String loginUser, @RequestBody BookmarkCreateRequest request) {
        String title = request.getTitle();
        String url = request.getUrl();

        // 북마크 저장
        Bookmark createdBookmark = bookmarkService.createBookmark(loginUser, title, url);

        // 저장된 북마크 위치 URI
        URI location = URI.create("/bookmarks/" + createdBookmark.getId());

        // 응답 객체 생성
        BookmarkResponse response = BookmarkResponse.from(createdBookmark);

        return ResponseEntity.created(location).body(response);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody BookmarksDeleteRequest request) {
        List<Long> ids = request.getBookmarkIds();
        int deletedCount = bookmarkService.deleteBookmarks(ids);

        BookmarksDeleteResponse response = BookmarksDeleteResponse.builder()
                .code("SUCCESS")
                .message(String.format("북마크 %d개가 성공적으로 삭제되었습니다.", deletedCount))
                .count(deletedCount)
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookmark(@PathVariable("id") Long id) {
        Bookmark bookmark;
        try {
            bookmark = bookmarkService.getBookmark(id);
        } catch (IllegalArgumentException e) {
            BookmarkErrorResponse bookmarkNotFound = BookmarkErrorResponse.builder()
                    .code("BOOKMARK_NOT_FOUND").message("해당 북마크가 존재하지 않습니다.").build();

            return ResponseEntity.badRequest().body(bookmarkNotFound);
        }

        BookmarkResponse response = BookmarkResponse.from(bookmark);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/sync")
    public ResponseEntity<?> sync(@AuthenticationPrincipal String loginUser,
                                  @RequestBody List<BookmarkTreeNode> bookmarkTreeNodes) {
        log.info("sync 응답 받음. [user]: {}", loginUser);
        try {

            // Root-Folder-Bookmark의 연관관계 설정 및 적용
            Root unlinkedRoot = bookmarkService.saveAll(bookmarkTreeNodes);

            log.info("Root를 제외한 연관관계 설정 완료");
            // Root-Member의 연관관계 설정 및 적용
            rootService.assign(unlinkedRoot, loginUser);
        } catch (IllegalArgumentException e) {
            log.error("sync 실패");
            log.error("[{}] : {}", e.getClass(), e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("성공했습니다.");
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@AuthenticationPrincipal String loginUser, @RequestParam String query) {
        List<Bookmark> searchedBookmarks = bookmarkService.search(loginUser, query);
        List<Folder> searchedFolder = folderService.search(loginUser, query);

        // 리스트에 전부 추가하여 전송, 북마크가 폴더보다 앞선다.
        List<BookmarkNodeResponse> response = new ArrayList<>();
        response.addAll(searchedBookmarks.stream().map(BookmarkNodeResponse::fromBookmark).toList());
        response.addAll(searchedFolder.stream().map(BookmarkNodeResponse::fromFolder).toList());

        return ResponseEntity.ok(response);
    }

    //TODO: 사용되지 않지만 BookmarkNodeResponse로 변경하기
//    @GetMapping
//    public ResponseEntity<?> getAllBookmark(@AuthenticationPrincipal String loginUser) {
//        try {
//            log.info("[INFO] 현재 로그인된 유저 providerId : {}", loginUser);
//            BookmarkTreeNode rootNode = rootService.getRootOf(loginUser);
//            return ResponseEntity.ok().body(rootNode);
//        } catch (IllegalArgumentException e) {
//            System.out.println(e.getMessage());
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
}
