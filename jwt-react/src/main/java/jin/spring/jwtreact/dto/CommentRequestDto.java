package jin.spring.jwtreact.dto;


import lombok.Getter;

@Getter
public class CommentRequestDto {

    private Long articleId;
    private String body;
}
