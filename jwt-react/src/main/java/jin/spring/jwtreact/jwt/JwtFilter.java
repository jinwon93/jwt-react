package jin.spring.jwtreact.jwt;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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


}
