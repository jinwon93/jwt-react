package jin.spring.jwtreact.repository;

import jin.spring.jwtreact.dto.PageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleRepositoryCustom {

    Page<PageResponseDto> searchAll(Pageable pageable);
}
