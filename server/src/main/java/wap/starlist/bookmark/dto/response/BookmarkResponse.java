package wap.starlist.bookmark.dto.response;

import lombok.Builder;
import lombok.Getter;
import wap.starlist.bookmark.domain.Bookmark;

@Getter
@Builder
public class BookmarkResponse {

    // TODO: NotBlank로 검사하기
    private Long bookmarkId;

    private String title;

    private String summary;

    private String image;

    private String recommended;

    private String url;

    private Long dateAdded;

    private Long dateGroupModified;

    private Long dateLastUsed;

    // Bookmark을 전달받아 Response 객체를 생성하는 정적 팩토리 메서드
    public static BookmarkResponse from(Bookmark bookmark) {
        return BookmarkResponse.builder()
                .bookmarkId(bookmark.getId())
                .title(bookmark.getTitle())
                .summary(bookmark.getSummary())
                .image(bookmark.getImage())
                .recommended(bookmark.getRecommended())
                .url(bookmark.getUrl())
                .dateAdded(bookmark.getDateAdded())
                .dateGroupModified(bookmark.getDateGroupModified())
                .dateLastUsed(bookmark.getDateLastUsed())
                .build();
    }
}
