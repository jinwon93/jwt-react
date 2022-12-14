package jin.spring.jwtreact.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    private SecurityUtil() { }

    public static Long getCurrentMemberId() {
        // SecurityContext 유저 정보가 저장되는 시점
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {

             throw  new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        return  Long.parseLong(authentication.getName());
    }
}
