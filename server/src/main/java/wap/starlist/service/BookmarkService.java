package wap.starlist.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.starlist.domain.Bookmark;
import wap.starlist.repository.BookmarkRepository;

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

    // 현재 시간을 int으로 반환
    private int currentTime() {
        return (int) (System.currentTimeMillis() / 1000L);
    }
}
