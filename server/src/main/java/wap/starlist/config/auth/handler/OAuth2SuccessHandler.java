package wap.starlist.config.auth.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import wap.starlist.config.auth.JwtTokenProvider;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private static final String REDIRECT_URI = "https://sstarlist.netlify.app/auth/success";
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 토큰 생성
        String accessToken = jwtTokenProvider.generateAccessToken(authentication);

        //TODO: 쿼리로 전달하지 않고 쿠키를 사용하도록
        // accessToken을 쿼리 파라미터로 전달
        String redirectUrl = UriComponentsBuilder.fromUriString(REDIRECT_URI)
                .queryParam("token", accessToken)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }
}
