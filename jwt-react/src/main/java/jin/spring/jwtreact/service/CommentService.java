package jin.spring.jwtreact.service;


import jin.spring.jwtreact.dto.CommentResponseDto;
import jin.spring.jwtreact.entity.Article;
import jin.spring.jwtreact.entity.Comment;
import jin.spring.jwtreact.entity.Member;
import jin.spring.jwtreact.repository.ArticleRepository;
import jin.spring.jwtreact.repository.CommentRepository;
import jin.spring.jwtreact.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository  commentRepository;


    //댓글조회
    public List<CommentResponseDto> getComment(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("댓글이 없습니다"));
        List<Comment> comments = commentRepository.findByArticle(article);
        if (comments.isEmpty()) {
            return Collections.emptyList();
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return  comments
                    .stream()
                    .map(comment ->  CommentResponseDto.of(comment , false))
                    .collect(Collectors.toList());
        }else {
            Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            Map<Boolean , List<Comment>> collect = comments.stream()
                    .collect(
                            Collectors.partitioningBy(
                                    comment -> comment.getMember().equals(member)
                            )
                    );

            List<CommentResponseDto> tCollect = collect.get(true).stream()
                    .map(t -> CommentResponseDto.of(t , true))
                    .collect(Collectors.toList());
            List<CommentResponseDto> fCollect = collect.get(false).stream()
                    .map(f -> CommentResponseDto.of(f , false))
                    .collect(Collectors.toList());

            return Stream
                    .concat(tCollect.stream() , fCollect.stream())
                    .sorted(Comparator.comparing(CommentResponseDto::getCommentId))
                    .collect(Collectors.toList());
        }
    }
}
