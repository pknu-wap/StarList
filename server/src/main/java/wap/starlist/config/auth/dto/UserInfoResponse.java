package wap.starlist.config.auth.dto;

import lombok.Builder;
import lombok.Getter;
import wap.starlist.member.domain.Member;

import java.util.Map;

@Getter
@Builder
public class UserInfoResponse {

    private String name;
    private String email;
    private String image;
    private String provider;
    private String providerId;

    public static UserInfoResponse ofGoogle(Map<String, Object> attributes) {
        return UserInfoResponse.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .image((String) attributes.get("image"))
                .provider("google")
                .providerId((String) attributes.get("sub"))
                .build();
    }

    public Member toEntity() {
        return Member.builder()
                .name(name)
                .email(email)
                .profileImage(image)
                .provider(provider)
                .providerId(providerId)
                .role(UserRole.USER)
                .hasSynced(false)
                .build();
    }
}
