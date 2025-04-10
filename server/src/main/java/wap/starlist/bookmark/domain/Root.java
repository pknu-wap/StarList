package wap.starlist.bookmark.domain;

import jakarta.persistence.*;
import wap.starlist.user.domain.User;

import java.util.List;

@Entity
public class Root {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User memberId;

    @OneToMany(mappedBy = "rootId")
    private List<Folder> folders;
}
