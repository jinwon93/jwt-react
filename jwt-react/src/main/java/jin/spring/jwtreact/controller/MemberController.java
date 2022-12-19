package jin.spring.jwtreact.controller;


import jin.spring.jwtreact.dto.member.ChangePasswordRequestDto;
import jin.spring.jwtreact.dto.member.MemberRequestDto;
import jin.spring.jwtreact.dto.member.MemberResponseDto;
import jin.spring.jwtreact.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;


    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto>  getMyMemberInfo() {
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        log.info(myInfoBySecurity.getNickname());
        return ResponseEntity.ok((myInfoBySecurity));
    }

    @PostMapping("/nickname")
    public ResponseEntity<MemberResponseDto>  setMemberNickname(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(memberService.changeMemberNickname(requestDto.getEmail() , requestDto.getNickname()));
    }


    @PostMapping("/password")
    public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberPassword(request.getExPassword() , request.getNewPassword()));
    }
}
