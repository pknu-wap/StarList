package wap.starlist.domain;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String name;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    // OAuth2 로그인 제공자 (ex: google, kakao)
    private String provider;

    // OAuth2 제공자가 발급한 유저 고유 id
    private String providerId;
}
