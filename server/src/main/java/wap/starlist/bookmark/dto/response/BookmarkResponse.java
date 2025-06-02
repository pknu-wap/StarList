package wap.starlist.bookmark.dto.response;

import lombok.Builder;
import lombok.Getter;
import wap.starlist.bookmark.domain.Bookmark;

@Getter
@Builder
public class BookmarkResponse {

    private Long id;

    private Long googleId;

    private String title;

    private String summary;

    private String image;

    private String recommended;

    private String url;

    private Long dateAdded;

    private Long dateLastUsed;

    private Integer position;

    private Long folderId;

    // Bookmark을 전달받아 Response 객체를 생성하는 정적 팩토리 메서드
    public static BookmarkResponse from(Bookmark bookmark) {
        return BookmarkResponse.builder()
                .id(bookmark.getId())
                .googleId(bookmark.getGoogleId())
                .title(bookmark.getTitle())
                .summary(bookmark.getSummary())
                .image(bookmark.getImage())
                .recommended(bookmark.getRecommended())
                .url(bookmark.getUrl())
                .dateAdded(bookmark.getDateAdded())
                .dateLastUsed(bookmark.getDateLastUsed())
                .position(bookmark.getPosition())
                .folderId(bookmark.getFolder().getId())
                .build();
    }
}
