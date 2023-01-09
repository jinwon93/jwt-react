package jin.spring.jwtreact.controller;


import jin.spring.jwtreact.dto.MessageDto;
import jin.spring.jwtreact.dto.PostRecommnedDto;
import jin.spring.jwtreact.dto.RecommendDto;
import jin.spring.jwtreact.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class RecommendController {


    private final RecommendService recommendService;


    @GetMapping("/list")
    public ResponseEntity<RecommendDto> getRecommend(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(recommendService.allRecommend(id));
    }


    @GetMapping("/")
    public ResponseEntity<MessageDto> postRecommend(@RequestBody PostRecommnedDto dto) {
        recommendService.createRecommend(dto.getId());
        return ResponseEntity.ok(new MessageDto("Success"));
    }


    @DeleteMapping("/one")
    public  ResponseEntity<MessageDto> deleteRecommend(@RequestParam(name = "id") Long id) {
        recommendService.removeRecommend(id);
        return  ResponseEntity.ok(new MessageDto("Success"));
    }
}
