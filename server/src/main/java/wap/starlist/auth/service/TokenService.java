package wap.starlist.auth.service;

import static wap.starlist.error.ErrorCode.ACCESS_TOKEN_EXPIRED;

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
                .map(t -> t.updateRefreshToken(refreshToken))
                .orElseGet(() -> Token.create(memberSubId, refreshToken, accessToken));

        tokenRepository.save(token);
    }

    public Token getUserTokenFrom(String accessToken) {
        return tokenRepository.findByAccessToken(accessToken)
                .orElseThrow(() -> new TokenException(ACCESS_TOKEN_EXPIRED));
    }

    @Transactional
    public void updateToken(String accessToken, Token token) {
        token.updateAccessToken(accessToken);

        // 엔티티가 이미 저장된적 있다면 덮어씌움
        tokenRepository.save(token);
    }
}
