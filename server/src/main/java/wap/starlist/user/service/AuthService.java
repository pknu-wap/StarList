package wap.starlist.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import wap.starlist.config.auth.OAuthConstants;
import wap.starlist.config.auth.dto.GoogleProperties;
import wap.starlist.config.auth.dto.GoogleUserInfo;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final GoogleProperties googleProperties;
    private final RestTemplate restTemplate = new RestTemplate();

    // registrationId는 어떤 종류의 소셜 로그인인지 확인하기 위함 (ex. google, kakao, github ...)
    public void loginWithGoogle(String code) {
        String accessToken = getAccessToken(code);
        GoogleUserInfo userInfo = getUserResource(accessToken);

        // 받아온 코드와 토큰 확인
        System.out.println("code = " + code);
        System.out.println("accessToken = " + accessToken);

        System.out.println("userInfo.getName() = " + userInfo.getName());
        System.out.println("userInfo.getEmail() = " + userInfo.getEmail());
        System.out.println("userInfo.getPicture() = " + userInfo.getPicture());
    }

    private String getAccessToken(String authorizationCode) {
        // Google OAuth 설정값 load
        String clientId = googleProperties.getClientId();
        String clientSecret = googleProperties.getClientSecret();
        String redirectUri = googleProperties.getRedirectUri();

        // access token 요청에 사용할 파라미터 구성 (x-www-form-urlencoded 형식)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>(); // 하나의 key에 여러 값을 담을 수 있어서 MultiValueMap 사용
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Google API가 요구하는 Content-Type

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        // TODO: Token Response DTO 생성하기
        // Google Token 엔드포인트로 POST 요청
        ResponseEntity<Map> response = restTemplate.postForEntity(
                OAuthConstants.GOOGLE_TOKEN_URI,
                request,
                Map.class
        );

        return (String) response.getBody().get("access_token");
    }

    private GoogleUserInfo getUserResource(String accessToken) {
        // Authorization 헤더에 Bearer 토큰 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        // GET 요청을 보내기에 body가 필요없음
        HttpEntity<Void> request = new HttpEntity<>(headers);

        // Google 리소스 서버에 GET 요청
        ResponseEntity<GoogleUserInfo> response = restTemplate.exchange(
                OAuthConstants.GOOGLE_USER_INFO_URI,
                HttpMethod.GET,
                request,
                GoogleUserInfo.class
        );

        return response.getBody();
    }
}
