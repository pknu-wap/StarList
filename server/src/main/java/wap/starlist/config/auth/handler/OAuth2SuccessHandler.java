package wap.starlist.config.auth.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import wap.starlist.config.auth.JwtTokenProvider;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 토큰 생성
        String accessToken = jwtTokenProvider.generateAccessToken(authentication);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 클라이언트가 직접 처리
        response.getWriter().write("{\"token\":\"" + accessToken + "\"}");
    }
}
