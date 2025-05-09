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

    private static final String PRODUCTION_REDIRECT_URI = "https://sstarlist.netlify.app/auth/success";
    private static final String LOCALHOST_REDIRECT_URI = "http://localhost:5173";
    private static final String LOCAL_STATE = "local";

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 토큰 생성
        String accessToken = jwtTokenProvider.generateAccessToken(authentication);


        String redirectUrl;
        String origin = request.getParameter("state");

        // accessToken을 쿼리 파라미터로 전달
        if (origin.equals(LOCAL_STATE)) {
            redirectUrl = UriComponentsBuilder.fromUriString(LOCALHOST_REDIRECT_URI)
                    .queryParam("token", accessToken)
                    .build().toUriString();
        } else {
            redirectUrl = UriComponentsBuilder.fromUriString(PRODUCTION_REDIRECT_URI)
                    .queryParam("token", accessToken)
                    .build().toUriString();
        }
        response.sendRedirect(redirectUrl);
    }
}
