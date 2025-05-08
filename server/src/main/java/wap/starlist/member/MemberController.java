package wap.starlist.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/sync")
    public ResponseEntity<?> getSynced(@AuthenticationPrincipal String loginUser) {
        Boolean hasSynced = memberService.hasSynced(loginUser);
        return ResponseEntity.ok(hasSynced);
    }
}
