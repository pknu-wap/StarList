package wap.starlist.bookmark.domain;

import jakarta.persistence.*;
import wap.starlist.member.domain.Member;

import java.util.List;

@Entity
public class Root {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Member memberId;

    @OneToMany(mappedBy = "rootId")
    private List<Folder> folders;
}
