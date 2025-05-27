package wap.starlist.auth.service;

import static wap.starlist.error.ErrorCode.ACCESS_TOKEN_EXPIRED;
import static wap.starlist.error.ErrorCode.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.starlist.auth.entity.Token;
import wap.starlist.auth.repository.TokenRepository;
import wap.starlist.error.exception.TokenException;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService {

    private final TokenRepository tokenRepository;

    @Transactional
    public void saveOrUpdateToken(String memberSubId, String refreshToken, String accessToken) {
        Token token = tokenRepository.findBySub(memberSubId)
                .map(t -> t.updateAccessToken(accessToken).updateRefreshToken(refreshToken))
                .orElseGet(() -> Token.create(memberSubId, refreshToken, accessToken));

        log.info("[JWT] 토큰이 생성되었습니다. 사용자 sub (Google Id): {}", token.getSub());

        tokenRepository.save(token);
        log.info("[JWT] 토큰이 저장되었습니다.");
    }

    public Token getUserTokenFrom(String accessToken) {
        return tokenRepository.findByAccessToken(accessToken)
                .orElseThrow(() -> new TokenException(NOT_FOUND));
    }

    @Transactional
    public void updateToken(String accessToken, Token token) {
        token.updateAccessToken(accessToken);

        // 엔티티가 이미 저장된적 있다면 덮어씌움
        tokenRepository.save(token);
    }
}
