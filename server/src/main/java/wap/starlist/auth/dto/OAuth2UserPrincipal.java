package wap.starlist.auth.dto;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import wap.starlist.member.domain.Member;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@AllArgsConstructor
public class OAuth2UserPrincipal implements OAuth2User {

    private Member member;
    private Map<String, Object> attributes;
    private String attributeKey;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new SimpleGrantedAuthority(member.getRole().getKey()));
    }

    @Override
    public String getName() {
        // Spring Security가 사용자 객체를 식별할 수 있는 id가 들어가야 하기에 attributeKey로 값을 가져온다
        return attributes.get(attributeKey).toString();
    }
}
