package jin.spring.jwtreact.service;


import jin.spring.jwtreact.config.SecurityUtil;
import jin.spring.jwtreact.dto.ArticleResponseDto;
import jin.spring.jwtreact.dto.PageResponseDto;
import jin.spring.jwtreact.entity.Article;
import jin.spring.jwtreact.entity.Member;
import jin.spring.jwtreact.repository.ArticleRepository;
import jin.spring.jwtreact.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;

    public Page<PageResponseDto> pageArticle(int pageNum) {

        return articleRepository.searchAll(PageRequest.of(pageNum - 1 , 20));
    }
    public List<PageResponseDto> allArticle() {

        List<Article> articles = articleRepository.findAll();
        return articles
                .stream()
                .map(PageResponseDto::of)
                .collect(Collectors.toList());
    }


    public ArticleResponseDto oneArticle(Long id) {

        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser"){
            return ArticleResponseDto.of(article , false);
        }else {
            Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result  = article.getMember().equals(member);
            return ArticleResponseDto.of(article , result);
        }

    }
    @Transactional
    public ArticleResponseDto postArticle(String title, String body) {
        Member member = isMemberCurrent();
        Article article = Article.createArticle(title, body, member);
        return ArticleResponseDto.of(articleRepository.save(article), true);
    }

    public Member isMemberCurrent(){
        return  memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

}
