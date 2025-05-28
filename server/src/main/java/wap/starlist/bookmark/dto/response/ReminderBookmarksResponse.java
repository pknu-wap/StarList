package wap.starlist.bookmark.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReminderBookmarksResponse {

    private List<ReminderBookmarkInfo> data;

    @Getter
    @Builder
    public static class ReminderBookmarkInfo {

        // 서버에서 사용하는 북마크 id
        private Long id;

        // 구글에서 제공하는 북마크 id
        private String googleId;

        private Boolean syncing;

        private String title;

        private Long dateAdded;

        @Builder.Default
        private Integer index = 0; //순서

        private Integer parentId;

        private String url;
    }
}
