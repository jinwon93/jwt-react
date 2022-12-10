package jin.spring.jwtreact.entity;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;


@NoArgsConstructor
@Getter
@Builder
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String email;


    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;


    @Enumerated(EnumType.STRING)
    private Authority authority;


    public void setNickname (String nickname) {
        this.nickname = nickname;
    }

    public void  setPassword (String password) {
        this.password = password;
    }


    @Builder
    public Member(Long id, String email, String password, String nickname, Authority authority) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.authority = authority;
    }
}
