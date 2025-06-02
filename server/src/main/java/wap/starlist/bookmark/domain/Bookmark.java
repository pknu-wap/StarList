package wap.starlist.bookmark.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import org.springframework.util.StringUtils;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String summary;

    @Column(length = 2048)
    private String image;

    // TODO: 삭제 예정
    private String recommended;

    @Column(length = 2048)
    private String url;

    private Long dateAdded;

    private Long dateLastUsed;

    @Column(name = "parent_id")
    private Integer parentId;

//TODO: ROOT를 삭제하면 관련 필드 모두 삭제
    // ROOT 혹은 FOLDER로 저장됨
//    @Enumerated(EnumType.STRING)
//    private ParentType parentType;

    private Boolean syncing;

    // TODO: Folder, Root 타입 일치
    private Long googleId;

    // 부모 폴더 내에 몇 번째 항목인지
    private Integer position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    // 사용자가 "알림 안 함" 처리 시 "true"
    @Setter
    private boolean remindDisabled = false;

    // 마지막으로 알림을 보낸 시각 (중복 방지용)
    @Setter
    private Long lastRemindTime;

    public void mapToFolder(Folder parentFolder) {
        this.folder = parentFolder;
    }

    public void updateDateAdded() {
        this.dateAdded = new Date().getTime();
    }

    public void update(String title, String url) {
        if (StringUtils.hasText(title)) {
            this.title = title;
        }
        if (StringUtils.hasText(url)) {
            this.url = url;
        }
    }
}
