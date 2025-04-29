package wap.starlist.bookmark.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Long googleId;

    @ManyToOne
    private Root rootId;

    @OneToMany(mappedBy = "folderId")
    private List<Bookmark> bookmarks;
}
