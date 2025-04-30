package wap.starlist.config.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.starlist.config.auth.dto.OAuth2UserPrincipal;
import wap.starlist.config.auth.dto.UserInfoResponse;
import wap.starlist.member.domain.Member;
import wap.starlist.member.repository.MemberRepository;

import java.util.Map;

/**
 * DefaultOauth2UserService: 리소스 서버에서 사용자 정보를 받아오는 클래스
 * 이를 상속받아 사용자를 우리 서비스에 회원가입 혹은 로그인한다.
 */
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        Map<String, Object> oAuth2UserAttributes = super.loadUser(userRequest).getAttributes();

        // registrationId는 현재 google만 사용하기에 받아오지 않는다
        // userNameAttributeName(provider에서 제공하는 사용자를 구별하는 번호의 필드명)을 가져온다
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        UserInfoResponse userInfo = UserInfoResponse.ofGoogle(oAuth2UserAttributes);
        Member member = getOrSave(userInfo);

        return new OAuth2UserPrincipal(member, oAuth2UserAttributes, userNameAttributeName);
    }

    private Member getOrSave(UserInfoResponse userInfo) {
        Member member = memberRepository.findByEmail(userInfo.getEmail())
                .orElseGet(userInfo::toEntity);
        return memberRepository.save(member);
    }
}
