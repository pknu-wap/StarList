package wap.starlist.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import lombok.NoArgsConstructor;

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

    private Long googleId;

    @ManyToOne
    private Root rootId;

    @OneToMany(mappedBy = "folderId")
    private List<Bookmark> bookmarks;
}
