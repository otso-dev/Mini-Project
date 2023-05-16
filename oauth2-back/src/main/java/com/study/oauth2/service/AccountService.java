package com.study.oauth2.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.study.oauth2.dto.account.PrincipalRespDto;
import com.study.oauth2.entity.User;
import com.study.oauth2.repository.UserRepository;
import com.study.oauth2.security.PrincipalsUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {
	
	private final UserRepository userRepository;
	
	public PrincipalRespDto getPrincipal() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		PrincipalsUser principalsUser = (PrincipalsUser) authentication.getPrincipal();
		
		User userEntity = userRepository.findUserByEmail(principalsUser.getEmail());
		return userEntity.toPrincipalRespDto();
	}
}
