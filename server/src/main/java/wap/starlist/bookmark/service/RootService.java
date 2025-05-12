package wap.starlist.bookmark.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wap.starlist.bookmark.domain.Root;
import wap.starlist.bookmark.repository.RootRepository;
import wap.starlist.member.domain.Member;
import wap.starlist.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class RootService {

    private final RootRepository rootRepository;
    private final MemberRepository memberRepository;

    public Root assign(Root root, String providerId) {
        Member member = memberRepository.findByProviderId(providerId)
                .orElseThrow(() -> new IllegalArgumentException("[ERROR] 사용자를 찾을 수 업습니다."));
        root.mapToMember(member);
        return rootRepository.save(root);
    }
}
