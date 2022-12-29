package jin.spring.jwtreact.repository;


import jin.spring.jwtreact.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article,  Long> , ArticleRepositoryCustom {

    Article findByTitle(String title);
}
