package wap.starlist.bookmark.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.dto.request.BookmarkCreateRequest;
import wap.starlist.bookmark.dto.request.BookmarkTreeNode;
import wap.starlist.bookmark.dto.request.BookmarksDeleteRequest;
import wap.starlist.bookmark.dto.response.BookmarkErrorResponse;
import wap.starlist.bookmark.dto.response.BookmarkResponse;
import wap.starlist.bookmark.dto.response.BookmarksDeleteResponse;
import wap.starlist.bookmark.service.BookmarkService;

import java.net.URI;

@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookmarkCreateRequest request) {
        String title = request.getTitle();
        String url = request.getUrl();

        // 북마크 저장
        Bookmark createdBookmark = bookmarkService.createBookmark(title, url);

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
    public ResponseEntity<?> getBookmark(@PathVariable Long id) {
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
    public ResponseEntity<?> sync(@AuthenticationPrincipal User user,
                                  @RequestBody List<BookmarkTreeNode> bookmarkTreeNodes) {

        Folder savedFolder = bookmarkService.saveAll(bookmarkTreeNodes);
        return ResponseEntity.ok().build();
    }
}
