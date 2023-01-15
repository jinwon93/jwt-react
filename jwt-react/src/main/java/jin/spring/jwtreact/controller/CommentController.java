package jin.spring.jwtreact.controller;


import jin.spring.jwtreact.dto.CommentRequestDto;
import jin.spring.jwtreact.dto.CommentResponseDto;
import jin.spring.jwtreact.dto.MessageDto;
import jin.spring.jwtreact.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {


    private final CommentService commentService;

    @GetMapping("/list")
    public ResponseEntity<List<CommentResponseDto>> getComment(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(commentService.getComment(id));
    }

    @PostMapping("/")
    public ResponseEntity<CommentResponseDto> postComment(@RequestBody CommentRequestDto requestDto) {
        return ResponseEntity.ok(commentService.createComment(requestDto.getArticleId() , requestDto.getBody()));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteComment(@RequestParam(name = "id") Long id) {
        commentService.removeComment(id);
        return  ResponseEntity.ok(new MessageDto("Success"));
    }
}
