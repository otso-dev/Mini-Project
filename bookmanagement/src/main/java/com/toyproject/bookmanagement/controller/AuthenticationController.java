package com.toyproject.bookmanagement.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.bookmanagement.aop.annotation.ValidAspect;
import com.toyproject.bookmanagement.dto.auth.LoginReqDto;
import com.toyproject.bookmanagement.dto.auth.SignupReqDto;
import com.toyproject.bookmanagement.service.AuthenticationServrice;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")//이 controller에 들어오는 
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationServrice authenticationServrice;

	@ValidAspect
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult){
		
		return ResponseEntity.ok(authenticationServrice.login(loginReqDto));
	}
	
	@ValidAspect
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult){
		authenticationServrice.checkDuplicatedEmail(signupReqDto.getEmail());
		authenticationServrice.saveUser(signupReqDto);
		return ResponseEntity.ok(true);
	}
	
	@GetMapping("/authenticated")
	public ResponseEntity<?> authenticated(String accessToken){
		return ResponseEntity.ok().body(authenticationServrice.authenticated(accessToken));
	}
	
	@GetMapping("/principal")
	public ResponseEntity<?> principal(String accessToken){
		return ResponseEntity.ok().body(authenticationServrice.getPrincipal(accessToken));
	}
}
//cors란 서버와 클라이언트의 port번호가 다르기 때문에 발생한다.
//cors를 해결하려면 서버에서 특정 포트, 특정 메소드, 특정 url을 허용시켜주면 된다.