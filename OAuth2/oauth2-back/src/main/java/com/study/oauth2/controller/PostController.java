package com.study.oauth2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.oauth2.dto.posts.RegisterPostReqDto;
import com.study.oauth2.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;

	// form data는 requstbody로 받으면 안된다.
	@PostMapping("/post/register")
	public ResponseEntity<?> register(RegisterPostReqDto registerPostReqDto) {
		
		return ResponseEntity.ok(postService.registerPost(registerPostReqDto));
	}
}
