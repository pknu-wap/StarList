package wap.starlist.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String accessToken;

    @Column(length = 1000)
    private String refreshToken;

    private String sub;

    public static Token create(String sub, String refreshToken, String accessToken) {
        return Token.builder()
                .sub(sub)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Token updateAccessToken(String newAccessToken) {
        this.accessToken = newAccessToken;
        return this;
    }

    public Token updateRefreshToken(String newRefreshToken) {
        this.refreshToken = newRefreshToken;
        return this;
    }
}
