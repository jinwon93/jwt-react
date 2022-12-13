package jin.spring.jwtreact.config;


import jin.spring.jwtreact.jwt.JwtFilter;
import jin.spring.jwtreact.jwt.TokenPovider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtSecurityConfig  extends SecurityConfigurerAdapter<DefaultSecurityFilterChain , HttpSecurity> {

    private final TokenPovider tokenPovider;

    @Override
    public void  configure(HttpSecurity http) {

        JwtFilter customFilter = new JwtFilter(tokenPovider);
        http.addFilterBefore(customFilter , UsernamePasswordAuthenticationFilter.class);
    }
}
