package wap.starlist.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import wap.starlist.config.auth.CustomOAuth2UserService;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/", "/oauth2/**", "/login").permitAll()  // 허용 URL 설정
                        .anyRequest().authenticated())      // 그 외 모든 요청에 대해 인증

                // oauth2 로그인 관련 설정
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo // 사용자 정보를 가져오는 endpoint
                                .userService(customOAuth2UserService)))
                .build();
    }
}
