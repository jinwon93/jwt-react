package jin.spring.jwtreact.jwt;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jin.spring.jwtreact.dto.security.TokenDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.security.Key;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

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



    public TokenDto generateTokenDto(Authentication authentication) {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now  = (new Date()).getTime();

        Date tokenExpiresIn = new Date(now  + ACCESS_TOKEN_EXPIRE_TIME);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY , authorities)
                .setExpiration(tokenExpiresIn)
                .signWith(key , SignatureAlgorithm.ES512)
                .compact();

        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(tokenExpiresIn.getTime())
                .build();
    }


    public Authentication getAuthentication(String accessToken) {

        Claims claims = paresClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null){
            throw  new RuntimeException("권한 정보가 없는 토큰입니다");
        }

        Collection<? extends  GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());


        return  new usernamePa
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
