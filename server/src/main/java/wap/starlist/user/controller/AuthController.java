package wap.starlist.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import wap.starlist.user.service.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/oauth2")
// Redirect URI를 처리하는 컨트롤러
public class AuthController {

    private final AuthService authService;

    @GetMapping("/login/google")
    public void login(@RequestParam("code") String code) {
        authService.loginWithGoogle(code);
    }
}
