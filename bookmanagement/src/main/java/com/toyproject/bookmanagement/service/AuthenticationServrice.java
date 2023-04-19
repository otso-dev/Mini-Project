package com.toyproject.bookmanagement.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.toyproject.bookmanagement.dto.auth.SignupReqDto;
import com.toyproject.bookmanagement.entity.Authority;
import com.toyproject.bookmanagement.entity.User;
import com.toyproject.bookmanagement.exception.CustomException;
import com.toyproject.bookmanagement.exception.ErrorMap;
import com.toyproject.bookmanagement.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServrice {
	
	private final UserRepository userRepository;
	
	public void checkDuplicatedEmail(String email) {
		User findUser = userRepository.findUserByEmail(email);
		if(findUser != null) {
			throw new CustomException("DuplicatedEmail",ErrorMap.builder().put("email", "이미 사용중인 email입니다").bulid());
		}
	}
	
	public void saveUser(SignupReqDto signupReqDto) {
		User saveUser = signupReqDto.toEntity();
		userRepository.saveUser(saveUser);
		
		List<Authority> authorities = new ArrayList<>();
		authorities.add(Authority.builder().userId(saveUser.getUserId()).roleId(1).build());
		
		userRepository.addAuthorities(authorities);
	}
}
