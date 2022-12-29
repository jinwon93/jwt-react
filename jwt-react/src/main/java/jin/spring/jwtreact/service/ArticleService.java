package jin.spring.jwtreact.service;


import jin.spring.jwtreact.dto.PageResponseDto;
import jin.spring.jwtreact.entity.Article;
import jin.spring.jwtreact.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;


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
}
