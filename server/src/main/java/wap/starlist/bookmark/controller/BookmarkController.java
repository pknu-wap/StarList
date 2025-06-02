package wap.starlist.bookmark.controller;

import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.domain.Root;
import wap.starlist.bookmark.dto.request.BookmarkCreateRequest;
import wap.starlist.bookmark.dto.request.BookmarkEditRequest;
import wap.starlist.bookmark.dto.request.BookmarkMoveRequest;
import wap.starlist.bookmark.dto.request.BookmarkTreeNode;
import wap.starlist.bookmark.dto.request.BookmarksDeleteRequest;
import wap.starlist.bookmark.dto.request.ReminderBookmarkRequest;
import wap.starlist.bookmark.dto.response.BookmarkErrorResponse;
import wap.starlist.bookmark.dto.response.BookmarkNodeResponse;
import wap.starlist.bookmark.dto.response.BookmarkResponse;
import wap.starlist.bookmark.dto.response.BookmarksDeleteResponse;
import wap.starlist.bookmark.dto.response.ReminderBookmarkErrorResponse;
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

    // TODO: dateLastUsed는 어떻게?
    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal String loginUser, @RequestBody BookmarkCreateRequest request) {
        log.info("[bookmark-create] request user: {}", loginUser);

        // 북마크 저장
        BookmarkResponse response = bookmarkService.createBookmark(request);

        // 저장된 북마크 위치 URI
        URI location = URI.create("/bookmarks/" + response.getId());

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
            Root unlinkedRoot = bookmarkService.saveAll(bookmarkTreeNodes, loginUser);

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

    // 리마인드 대상 북마크 조회
    @GetMapping("/reminders")
    public ResponseEntity<?> getReminders(@AuthenticationPrincipal String loginUser) {
        try {
            log.info("[reminder] 리마인더 조회: {}", loginUser);
            // 3개월 전 사용된 리마인드 대상 북마크 조회
            List<BookmarkResponse> reminderBookmarks = bookmarkService.getReminderBookmarks();

            // 배열 반환
            return ResponseEntity.ok(reminderBookmarks);

        } catch (DataAccessException ex) {
            // DB 오류
            ReminderBookmarkErrorResponse error = ReminderBookmarkErrorResponse.builder()
                    .code("DATABASE_ERROR")
                    .message("데이터베이스 오류가 발생했습니다.")
                    .build();

            return ResponseEntity.badRequest().body(error);
        }
    }

    // 특정 북마크 리마인드 비활성화
    @PatchMapping("/{id}/remind-disable")
    public ResponseEntity<?> disableRemind(@PathVariable Long id, @RequestBody ReminderBookmarkRequest request) {
        // 요청 검증 (remindDisabled 필드가 true여야 함)
        if (!Boolean.TRUE.equals(request.getRemindDisabled())) {
            ReminderBookmarkErrorResponse error = ReminderBookmarkErrorResponse.builder()
                    .code("INVALID_REQUEST")
                    .message("[ERROR] remindDisabled 필드는 true여야 합니다.")
                    .build();

            return ResponseEntity.badRequest().body(error);
        }

        // 비활성화 시도
        try {
            bookmarkService.disableRemind((id));
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException exception) {
            // 존재하지 않는 id 요청 시
            ReminderBookmarkErrorResponse error = ReminderBookmarkErrorResponse.builder()
                    .code("NOT_FOUND")
                    .message("[ERROR] 해당 북마크를 찾을 수 없습니다.")
                    .build();

            return ResponseEntity.badRequest().body(error);
        }
    }

    @PatchMapping("/{id}/edit")
    public ResponseEntity<?> edit(@PathVariable("id") Long id, BookmarkEditRequest request) {
        bookmarkService.edit(id, request); // 내부에서 커스텀 예외로 처리하고 있기에 try-catch 필요없음
        return ResponseEntity.ok("수정되었습니다.");
    }

    @PatchMapping("/move")
    public ResponseEntity<?> move(BookmarkMoveRequest request) {
        bookmarkService.move(request);
        return ResponseEntity.ok("이동되었습니다.");
    }
}
