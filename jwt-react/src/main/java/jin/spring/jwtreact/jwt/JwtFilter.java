package jin.spring.jwtreact.jwt;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    public static final  String AUTHORIZAION_HEADER = "Authorization";
    public static final  String BEARER_PREFIX = "Bearer";
    private final  TokenPovider tokenPovider;


    private String resolveToken(HttpServletRequest request) {

        String bearerToken = request.getHeader(AUTHORIZAION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }

        return null;
    }



    @Override
    public void doFilterInternal(HttpServletRequest request , HttpServletResponse response , FilterChain filterChain) throws ServletException , IOException {
        String jwt = resolveToken(request);

        if (StringUtils.hasText(jwt) && tokenPovider.validateToken(jwt)) {

            Authentication authentication = tokenPovider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request , response);

    }

}
