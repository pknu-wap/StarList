package wap.starlist.bookmark.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = false)
    private Long googleId;

    // 부모 Root 혹은 Folder 내에 몇 번째 항목인지
    private Integer position;

    // 크롬 브라우저 최상위에서 분류되는 폴더명 : "bookmarks-bar", "other", "mobile"
    // 변경 및 추가 불가
    // 클라이언트에서 데이터 가공을 위해 남겨둠
    private String folderType;

    private Long dateAdded;

    private Long dateGroupModified;

    @ManyToOne
    @JoinColumn(name = "root_id")
    private Root root;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="parent_id")
    private Folder parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Folder> folders = new ArrayList<>();

    @OneToMany(mappedBy = "folder")
    private List<Bookmark> bookmarks = new ArrayList<>();

    public void updateChildFolders(List<Folder> folders) {
        this.folders = folders;
        for (Folder child : folders) {
            child.setParent(this);
        }
    }

    public void updateChildBookmarks(List<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
    }

    public void mapToRoot(Root root) {
        this.root = root;
    }

    private void setParent(Folder parent) {
        this.parent = parent;
    }
}
