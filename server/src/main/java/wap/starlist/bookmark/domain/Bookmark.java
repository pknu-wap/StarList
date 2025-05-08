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

    private String url;

    private Long dateAdded;

    private Long dateGroupModified;

    private Long dateLastUsed;

    private Integer position;

    private Long parentId;

    // ROOT 혹은 FOLDER로 저장됨
    @Enumerated(EnumType.STRING)
    private ParentType parentType;

    private Boolean syncing;

    private Long googleId;

    @ManyToOne
    private Folder folderId;
}
