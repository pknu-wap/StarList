package wap.starlist.bookmark.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.starlist.member.domain.Member;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Root {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long googleId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "root")
    private List<Folder> folders = new ArrayList<>();

    public boolean addFolder(Folder folder) {
        return folders.add(folder);
    }

    // 연관관계의 주인인 Root가 설정
    public void mapToMember(Member member) {
        this.member = member;
        member.mapToRoot(this);
    }
}
