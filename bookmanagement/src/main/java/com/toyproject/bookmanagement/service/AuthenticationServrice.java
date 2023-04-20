package com.toyproject.bookmanagement.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.toyproject.bookmanagement.dto.auth.LoginReqDto;
import com.toyproject.bookmanagement.dto.auth.SignupReqDto;
import com.toyproject.bookmanagement.dto.auth.response.JwtTokenRespDto;
import com.toyproject.bookmanagement.entity.Authority;
import com.toyproject.bookmanagement.entity.User;
import com.toyproject.bookmanagement.exception.CustomException;
import com.toyproject.bookmanagement.exception.ErrorMap;
import com.toyproject.bookmanagement.repository.UserRepository;
import com.toyproject.bookmanagement.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServrice implements UserDetailsService{

	private final UserRepository userRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;

	public void checkDuplicatedEmail(String email) {
		User findUser = userRepository.findUserByEmail(email);
		if (findUser != null) {
			throw new CustomException("DuplicatedEmail", ErrorMap.builder().put("email", "이미 사용중인 email입니다").bulid());
		}
	}

	public void saveUser(SignupReqDto signupReqDto) {
		User saveUser = signupReqDto.toEntity();
		userRepository.saveUser(saveUser);
		userRepository.addAuthorities(Authority.builder().userId(saveUser.getUserId()).roleId(1).build());
	}

	public JwtTokenRespDto login(LoginReqDto loginReqDto) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				loginReqDto.getEmail(), loginReqDto.getPassword());
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
		
		return jwtTokenProvider.generateToken(authentication);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User userEntity = userRepository.findUserByEmail(username);
		if(userEntity == null) {
			throw new CustomException("로그인실패",ErrorMap.builder().put("email", "사용자 정보를 확인하세요").put("password", "사용자 정보를 확인하세요").bulid());
		}
		return userEntity.toPrincipal();
	}

}
