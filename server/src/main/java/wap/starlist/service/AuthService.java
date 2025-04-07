package wap.starlist.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public void loginWithGoogle(String code, String registrationId) {
        System.out.println("code = " + code);
        System.out.println("registrationId = " + registrationId);
    }
}
