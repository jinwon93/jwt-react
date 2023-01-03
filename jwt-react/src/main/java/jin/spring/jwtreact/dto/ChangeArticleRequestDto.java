package jin.spring.jwtreact.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangeArticleRequestDto {

    private Long id;
    private String title;
    private String body;
}
