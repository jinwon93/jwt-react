package jin.spring.jwtreact.jwt;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.security.Key;
import java.util.Base64;

@Component
@Slf4j
public class TokenPovider {


    private static  final String AUTHORITIES_KEY = "auth";
    private static  final String BEARER_TYPE = "bearer";
    private static  final long ACCESS_TOKEN_EXPIRE_TIME = 1000* 60 * 30;
    private final Key key;


    public TokenPovider(@Value("jwt.secret") String secretKey) {

        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }



    public boolean validateToken(String token) {

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return  true;
        }catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        }catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토근입니다");
        }catch (UnsupportedJwtException e) {
            log.info("지워되지 않는 JWT 토큰입니다");
        }catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다");
        }
        return false;
    }

    private Claims paresClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        }catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
