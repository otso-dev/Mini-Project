package com.toyproject.bookmanagement.dto.auth;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.toyproject.bookmanagement.entity.User;

import lombok.Data;

@Data
public class SignupReqDto {
	
	@Email//email형식이 아니면 받아들이지 않음
	@NotBlank
	private String email;

	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$"
			, message = "비밀번호는 영문자,숫자, 특수문자를 포함하여 8~16자로 작성") 
	private String password;

	@Pattern(regexp = "^[가-힣]{2,7}$", message = "한글이름만 작성 가능합니다.")
	private String name;
	
	public User toEntity() {
		return User.builder()
				.email(email)
				.password(new BCryptPasswordEncoder().encode(password))
				.name(name)
				.build();
	}

}

//비밀번호
// 정규화
// vaildataion라이브러리가
// 필요함

//정규식 ^ -> 시작 $ -> 끝
//?=. -> 모든 문자열이 일치하느냐
//* 있거나 없거나
//+ 무조건 있어야함
//d -> 숫자 === [0-9]
//[A-Za-z\\d@$!%*#?&] -> 이것만 허용하겠다.
//{8,} 글자 갯수. 뒤에는 최대글자갯수
