package wap.starlist.bookmark.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.bookmark.repository.BookmarkRepository;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private static final long MILLIS_PER_SECOND = 1000L;

    private final BookmarkRepository bookmarkRepository;

    @Transactional // 트랜잭션을 보장하기 위해
    public Bookmark createBookmark(String title, String url) {
        // 전달받은 값으로 임시 북마크 생성
        Bookmark bookmark = Bookmark.builder()
                .title(title)
                .url(url)
                .dateAdded(currentTime())
                .build();

        // 북마크 저장
        return bookmarkRepository.save(bookmark);
    }

    @Transactional(readOnly = true)
    public Bookmark getBookmark(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("[ERROR] id 값이 존재하지 않습니다.");
        }

        // id로 북마크 조회
        return bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("[ERROR] 해당 북마크가 존재하지 않습니다."));
    }

    @Transactional
    public int deleteBookmarks(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            throw new IllegalArgumentException("[ERROR] 삭제할 북마크를 하나 이상 선택해 주세요.");
        }

        List<Bookmark> toDelete = bookmarkRepository.findAllById(ids);
        if (toDelete.isEmpty()) {
            return 0; // 존재하는 북마크만 삭제
        }

        bookmarkRepository.deleteAll(toDelete); // 북마크 일괄 삭제

        return toDelete.size(); // 삭제된 북마크 개수 반환
    }

    // 현재 시간을 millis를 제외한 long으로 반환
    private long currentTime() {
        return System.currentTimeMillis() / MILLIS_PER_SECOND;
    }
}
