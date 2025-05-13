package wap.starlist.bookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import wap.starlist.bookmark.domain.Root;
import wap.starlist.member.domain.Member;

import java.util.Optional;

@Repository
public interface RootRepository extends JpaRepository<Root, Long> {
    Optional<Root> findByMember(Member member);

    @Query("SELECT r FROM Root r WHERE r.member.providerId = :providerId")
    Optional<Root> findByMemberProviderId(@Param("providerId")String providerId);
}
