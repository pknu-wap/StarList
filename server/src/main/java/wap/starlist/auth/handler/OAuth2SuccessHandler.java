package wap.starlist.auth.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import wap.starlist.auth.jwt.JwtTokenProvider;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Value("${oauth2.success-url}")
    private String SUCCESS_URL;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 토큰 생성
        String accessToken = jwtTokenProvider.generateAccessToken(authentication);
        jwtTokenProvider.generateRefreshToken(authentication, accessToken);

        // 사용자 정보 출력
        Object principal = authentication.getPrincipal();
        if (principal instanceof OAuth2User oauth2User) {
            String sub = oauth2User.getAttribute("sub"); // Google의 고유 식별자
            log.info("[로그인 성공] OAuth2 사용자 sub (Google ID): {}", sub);
        } else {
            log.warn("[로그인 오류] OAuth2 로그인 흐름에서 예상치 못한 principal 타입입니다. 실제 타입: {}\n로그인된 사용자 정보: {}",
                    principal.getClass().getName(), principal);
        }

        // accessToken을 쿼리 파라미터로 전달
        String redirectUrl = UriComponentsBuilder.fromUriString(SUCCESS_URL)
                .queryParam("token", accessToken)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }
}
