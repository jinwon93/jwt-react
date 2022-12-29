package jin.spring.jwtreact.dto;


import jin.spring.jwtreact.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.annotation.processing.Generated;
import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleResponseDto {


    private Long articleId;
    private String memberNickname;
    private String articleTitle;
    private String articleBody;
    private String createdAt;
    private String updateAt;
    private boolean isWritten;



    public static ArticleResponseDto of(Article article , boolean bool) {

        return ArticleResponseDto.builder()
                .articleId(article.getId())
                .memberNickname(article.getMember().getNickname())
                .articleTitle(article.getTitle())
                .articleBody(article.getBody())
                .createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .updateAt(article.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .isWritten(bool)
                .build();
    }
}
