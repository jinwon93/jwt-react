package jin.spring.jwtreact.controller;


import jin.spring.jwtreact.dto.ArticleResponseDto;
import jin.spring.jwtreact.dto.CreateArticleRequestDto;
import jin.spring.jwtreact.dto.PageResponseDto;
import jin.spring.jwtreact.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/article")
public class ArticleController {


    private final ArticleService articleService;


    @GetMapping("/page")
    public ResponseEntity<Page<PageResponseDto>> pageArticle(@RequestParam(name = "page") int page) {
        return ResponseEntity.ok(articleService.pageArticle(page));
    }


    @GetMapping("/one")
    public  ResponseEntity<ArticleResponseDto> getOneArticle(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(articleService.oneArticle(id));
    }

    @PostMapping("/")
    public  ResponseEntity<ArticleResponseDto> createArticle(@RequestBody CreateArticleRequestDto request) {
        return ResponseEntity.ok(articleService.postArticle(request.getTitle() , request.getBody()));
    }
}
