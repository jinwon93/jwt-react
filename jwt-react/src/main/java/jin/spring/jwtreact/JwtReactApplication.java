package jin.spring.jwtreact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
public class JwtReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwtReactApplication.class, args);
	}

}
