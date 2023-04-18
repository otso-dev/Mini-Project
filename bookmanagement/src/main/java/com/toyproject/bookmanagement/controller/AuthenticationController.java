package com.toyproject.bookmanagement.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.bookmanagement.aop.annotation.ValidAspect;
import com.toyproject.bookmanagement.dto.auth.SignupReqDto;

@RestController
@RequestMapping("/auth")//이 controller에 들어오는 
public class AuthenticationController {
	
	@PostMapping("/login")
	public ResponseEntity<?> login(){
		
		return ResponseEntity.ok(null);
	}
	
	@CrossOrigin
	@ValidAspect
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult){
		
		return ResponseEntity.ok(null);
	}
	
}
//cors란 서버와 클라이언트의 port번호가 다르기 때문에 발생한다.
//cors를 해결하려면 서버에서 특정 포트, 특정 메소드, 특정 url을 허용시켜주면 된다.