package wap.starlist.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wap.starlist.domain.Bookmark;
import wap.starlist.dto.request.BookmarkCreateRequest;
import wap.starlist.dto.response.BookmarkErrorResponse;
import wap.starlist.dto.response.BookmarkResponse;
import wap.starlist.service.BookmarkService;

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
        BookmarkResponse response = BookmarkResponse.builder()
                .bookmarkId(createdBookmark.getId()).build();

        return ResponseEntity.created(location).body(response);
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
}
