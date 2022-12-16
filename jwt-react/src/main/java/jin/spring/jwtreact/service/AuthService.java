package jin.spring.jwtreact.service;


import jin.spring.jwtreact.dto.member.MemberRequestDto;
import jin.spring.jwtreact.dto.member.MemberResponseDto;
import jin.spring.jwtreact.dto.security.TokenDto;
import jin.spring.jwtreact.entity.Member;
import jin.spring.jwtreact.jwt.TokenProvider;
import jin.spring.jwtreact.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {


    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;



    public MemberResponseDto signup(MemberRequestDto requestDto) {

        if (memberRepository.existsByEmail(requestDto.getEmail())) {

            throw  new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        Member member = requestDto.toMember(passwordEncoder);
        return  MemberResponseDto.of(memberRepository.save(member));
    }


    public TokenDto login(MemberRequestDto requestDto) {

        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAUthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }
}
