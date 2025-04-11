package wap.starlist.config.auth.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "spring.security.oauth2.client.registration.google")
// 설정 파일을 가져오는 dto
public class GoogleProperties {

    private String clientId;
    private String clientSecret;
    private String redirectUri;
}
