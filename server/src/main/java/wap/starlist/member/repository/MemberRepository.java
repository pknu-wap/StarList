package wap.starlist.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wap.starlist.member.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findByProviderId(String providerId);
}
