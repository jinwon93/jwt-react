package jin.spring.jwtreact.service;


import jin.spring.jwtreact.dto.RecommendDto;
import jin.spring.jwtreact.entity.Article;
import jin.spring.jwtreact.entity.Member;
import jin.spring.jwtreact.entity.Recommend;
import jin.spring.jwtreact.repository.ArticleRepository;
import jin.spring.jwtreact.repository.MemberRepository;
import jin.spring.jwtreact.repository.RecommendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecommendService {

    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final RecommendRepository recommendRepository;

    public RecommendDto allRecommend(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다"));
        List<Recommend> recommends = recommendRepository.findAllByArticle(article);
        int size = recommends.size();
        if (size == 0) {
            return  RecommendDto.noOne();
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if ( authentication == null  || authentication.getPrincipal() == "anonymousUser") {
            return new RecommendDto(size , false);
        }else {
            Member member =  memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result = recommends.stream().anyMatch(recommend -> recommend.getMember().equals(member));
            return  new RecommendDto(size , result);
        }
    }
}
