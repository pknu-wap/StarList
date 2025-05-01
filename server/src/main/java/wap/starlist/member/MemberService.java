package wap.starlist.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wap.starlist.member.domain.Member;
import wap.starlist.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Boolean hasSynced(String providerId) {
        Member member = memberRepository.findByProviderId(providerId)
                .orElseThrow(() -> new IllegalArgumentException("[ERROR] 사용자를 찾을 수 업습니다."));
        return member.getHasSynced();
    }
}
