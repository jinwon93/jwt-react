package jin.spring.jwtreact.repository;

import jin.spring.jwtreact.entity.Article;
import jin.spring.jwtreact.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment , Long> {

    List<Comment> findByArticle(Article article);
}
