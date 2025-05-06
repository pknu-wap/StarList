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
    private Integer googleId;

//    @ManyToOne
//    private Root rootId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="parent_id")
    private Folder parent;

    @OneToMany(mappedBy = "google_id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Folder> folders = new ArrayList<>();

    @OneToMany(mappedBy = "folder")
    private List<Bookmark> bookmarks = new ArrayList<>();

    @ManyToOne
    private Root rootId;

    @OneToMany(mappedBy = "folderId")
    private List<Bookmark> bookmarks;
}
