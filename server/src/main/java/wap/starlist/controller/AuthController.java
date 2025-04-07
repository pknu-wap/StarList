package wap.starlist.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import wap.starlist.service.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/oauth2")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/code/{registrationId}")
    public void loginWithGoogle(@RequestParam String code, @PathVariable String registrationId) {
        authService.loginWithGoogle(code, registrationId);
    }
}
