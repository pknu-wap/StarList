package wap.starlist.config.auth.dto;

import lombok.Getter;

@Getter
public class GoogleUserInfo {

    private String sub;
    private String name;
    private String email;
    private String picture;
}
