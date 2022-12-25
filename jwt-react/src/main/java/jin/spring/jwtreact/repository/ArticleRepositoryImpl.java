package jin.spring.jwtreact.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import jin.spring.jwtreact.dto.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public Page<PageResponseDto> searchAll(Pageable pageable) {

        return null;
    }
}
