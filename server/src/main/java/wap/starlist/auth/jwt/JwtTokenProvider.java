package wap.starlist.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.util.StringUtils;
import wap.starlist.auth.entity.Token;
import wap.starlist.auth.service.TokenService;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30L; // 30 min
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60L * 24 * 7; // 1 week
    private static final String KEY_ROLE = "role";

    private final TokenService tokenService;

    @Value("${security.jwt.token.secret-key}")
    private String key;
    private SecretKey secretKey;

    public String generateAccessToken(Authentication authentication) {
        return generateToken(authentication, ACCESS_TOKEN_EXPIRE_TIME);
    }

    public void generateRefreshToken(Authentication authentication, String accessToken) {
        String refreshToken = generateToken(authentication, REFRESH_TOKEN_EXPIRE_TIME);
        log.info("[JWT] 리프레시 토큰이 생성되었습니다. 사용자 sub (Google Id): {}", authentication.getName());

        tokenService.saveOrUpdateToken(authentication.getName(), refreshToken, accessToken);
    }

    public String reissueAccessToken(String accessToken) {
        if (StringUtils.hasText(accessToken)) {
            Token token = tokenService.getUserTokenFrom(accessToken);
            String refreshToken = token.getRefreshToken();

            if (validateToken(refreshToken)) {
                log.info("[JWT] 리프레시 토큰이 유효하기에 새 AccessToken을 발급합니다.");

                Authentication authentication = getAuthentication(refreshToken);
                String reissueAccessToken = generateAccessToken(authentication);

                tokenService.updateToken(reissueAccessToken, token);
                return reissueAccessToken;
            }
        }
        return null;
    }

    /**
     * JWT 토큰을 기반으로 Spring Security에서 사용할 인증 객체를 생성합니다.
     * @param token: 클라이언트로부터 받은 토큰
     * @return
     */
    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token); // jwt에서 사용자 정보 파싱
        List<SimpleGrantedAuthority> authorities = getAuthorities(claims); // 권한 가져오기

        // 파싱한 정보 중 사용자의 googleId만 등록
        String googleId = claims.getSubject();

        // 인증된 사용자 정보를 담은 Authentication 객체 반환
        return new UsernamePasswordAuthenticationToken(googleId, token, authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build()
                    .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e) { // 로그 찍고 false 반환
            Claims claims = e.getClaims();
            String subject = claims != null ? claims.getSubject() : null;

            log.warn("[JWT] 토큰 만료됨: {}, 사용자 정보: subject={}", e.getMessage(), subject);
        } catch (SecurityException | MalformedJwtException e) {
            log.warn("[JWT] 잘못된 서명 또는 구조: {}, 수신한 토큰={}", e.getMessage(), token);

        } catch (Exception e) {
            log.warn("[JWT] 토큰 검증 실패: {}, 수신한 토큰={}", e.getMessage(), token);
        }
        return false;
    }

    @PostConstruct
    private void setSecretKey() {
        secretKey = Keys.hmacShaKeyFor(key.getBytes());
    }

    private String generateToken(Authentication authentication, long expireTime) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expireTime);

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining());

        String jwt = Jwts.builder()
                .subject(authentication.getName())
                .claim(KEY_ROLE, authorities)
                .issuedAt(now)
                .expiration(expiredDate)
                .signWith(secretKey, SIG.HS512)
                .compact();
        log.info("[JWT] 토큰이 생성되었습니다.");

        return jwt;
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parser().verifyWith(secretKey).build()
                    .parseSignedClaims(token).getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        } catch (MalformedJwtException e) {
            throw new IllegalArgumentException("[ERROR] 유효하지 않은 토큰입니다.");
        } catch (SecurityException e) {
            throw new IllegalArgumentException("[ERROR] 유효하지 않은 JWT 서명입니다.");
        }
    }

    private List<SimpleGrantedAuthority> getAuthorities(Claims claims) {
        return Collections.singletonList(new SimpleGrantedAuthority(
                claims.get(KEY_ROLE).toString()
        ));
    }
}
