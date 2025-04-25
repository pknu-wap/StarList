package wap.starlist.config.auth.dto;

import lombok.Builder;
import lombok.Getter;
import wap.starlist.member.domain.Member;

import java.util.Map;

@Getter
@Builder
public class OAuth2Response {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String image;

    public static OAuth2Response ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuth2Response.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .image((String) attributes.get("image"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public Member toEntity() {
        return Member.builder()
                .name(name)
                .email(email)
                .profileImage(image)
                .role(UserRole.USER)
                .build();
    }
}
