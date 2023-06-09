package com.study.oauth2.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.study.oauth2.dto.account.PrincipalRespDto;
import com.study.oauth2.entity.User;
import com.study.oauth2.repository.UserRepository;
import com.study.oauth2.security.PrincipalsUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

	@Value("${file.path}")
	private String filePath;

	private final UserRepository userRepository;

	public PrincipalRespDto getPrincipal() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		PrincipalsUser principalsUser = (PrincipalsUser) authentication.getPrincipal();

		User userEntity = userRepository.findUserByEmail(principalsUser.getEmail());
		return userEntity.toPrincipalRespDto();
	}

	public int updateProfileImg(MultipartFile profileImgFile) {

		String originFileName = profileImgFile.getOriginalFilename();
		String extension = originFileName.substring(originFileName.lastIndexOf("."));
		String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;
		
		Path uploadPath = Paths.get(filePath + "profile/" + tempFileName);
		
		try {
			Files.write(uploadPath, profileImgFile.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		PrincipalsUser principalsUser = (PrincipalsUser) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();

		return userRepository.updateProfileImg(User.builder().userId(principalsUser.getUserId())
				.profileImg(tempFileName).build());

	}
}
