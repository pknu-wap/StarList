package wap.starlist.bookmark.domain;

import jakarta.persistence.*;
import lombok.*;

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

    private String image;

    private String recommended;

    @Column(length = 2048)
    private String url;

    private Long dateAdded;

    private Long dateGroupModified;

    private Long dateLastUsed;

    private Integer position;

    @Column(name = "parent_id")
    private Integer parentId;

//TODO: ROOT를 삭제하면 관련 필드 모두 삭제
    // ROOT 혹은 FOLDER로 저장됨
//    @Enumerated(EnumType.STRING)
//    private ParentType parentType;

    private Boolean syncing;

    private Integer googleId;

    private Folder folderId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;
}
