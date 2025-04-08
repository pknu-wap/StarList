package wap.starlist.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import wap.starlist.service.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/oauth2")
// TODO: security 사용시 자동으로 /login으로 redirect되기에 추후 수정해야함
public class AuthController {

    private final AuthService authService;

    @GetMapping("/code/{registrationId}")
    public void loginWithGoogle(@RequestParam String code, @PathVariable String registrationId) {
        authService.loginWithGoogle(code, registrationId);
    }
}
