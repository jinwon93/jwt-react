package jin.spring.jwtreact.dto;


import jin.spring.jwtreact.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponseDto {

    private long commentId;
    private String memberNickname;
    private String commentBody;
    private Long createAt;
    private boolean isWritten;

    public static  CommentResponseDto  of(Comment comment , boolean bool) {
        return CommentResponseDto.builder()
                .commentId(comment.getId())
                .memberNickname(comment.getMember().getNickname())
                .commentBody(comment.getText())
                .createAt(Timestamp.valueOf(comment.getCreatAt()).getTime())
                .isWritten(bool)
                .build();
    }
}
