package wap.starlist.user.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.starlist.config.auth.dto.UserRole;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String profileImage;
    private String provider;    // OAuth2 로그인 제공자 (ex: google, kakao)
    private String providerId;  // OAuth2 제공자가 발급한 유저 고유 id
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public User update(String name, String profileImage) {
        this.name = name;
        this.profileImage = profileImage;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
