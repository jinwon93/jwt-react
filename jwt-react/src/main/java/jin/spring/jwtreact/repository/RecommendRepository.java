package jin.spring.jwtreact.repository;


import jin.spring.jwtreact.entity.Article;
import jin.spring.jwtreact.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend , Long> {

    List<Recommend> findAllByArticle(Article article);
}
