package jin.spring.jwtreact.repository;


import com.querydsl.core.QueryFactory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jin.spring.jwtreact.dto.PageResponseDto;
import jin.spring.jwtreact.entity.Article;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.stream.Collectors;

import static jin.spring.jwtreact.entity.QArticle.article;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;


    @Override
    public Page<PageResponseDto> searchAll(Pageable pageable) {

        List<Article> content = queryFactory
                .selectFrom(article)
                .orderBy(article.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();


        List<PageResponseDto> pages = content
                .stream()
                .map(PageResponseDto::of)
                .collect(Collectors.toList());


        int totalSize  = queryFactory
                .selectFrom(article)
                .fetch()
                .size();

        return  new PageImpl<>(pages , pageable , totalSize);
    }
}
