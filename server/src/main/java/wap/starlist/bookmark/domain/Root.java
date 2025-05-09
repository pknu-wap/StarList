//package wap.starlist.bookmark.domain;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.NoArgsConstructor;
//import wap.starlist.member.domain.Member;
//
//import java.util.List;
//
//@Entity
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//public class Root {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @OneToOne
//    private Member memberId;
//
//    @OneToMany(mappedBy = "rootId")
//    private List<Folder> folders;
//}
