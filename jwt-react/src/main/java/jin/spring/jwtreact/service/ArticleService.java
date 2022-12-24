package jin.spring.jwtreact.service;


import jin.spring.jwtreact.dto.PageResponseDto;
import jin.spring.jwtreact.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<PageResponseDto> allArticle() {

        return null;
    }
}
