package wap.starlist.config.auth.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {

    USER("ROLE_USER", "일반 사용자");

    private final String key;
    private final String title;
}
