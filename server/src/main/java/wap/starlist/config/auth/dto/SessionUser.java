package wap.starlist.config.auth.dto;

import lombok.Getter;
import wap.starlist.member.domain.Member;

import java.io.Serializable;

@Getter
// 세션에 사용자 정보를 저장하기 위한 DTO
public class SessionUser implements Serializable {

    private String name;
    private String email;
    private String image;

    public SessionUser(Member member) {
        this.name = member.getName();
        this.email = member.getEmail();
        this.image = member.getProfileImage();
    }
}
