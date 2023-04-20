package com.toyproject.bookmanagement.security.jwt;

import java.security.Key;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.toyproject.bookmanagement.dto.auth.response.JwtTokenRespDto;
import com.toyproject.bookmanagement.security.PrincipalsUser;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

	private final Key key;

	public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
		this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
	}

	public JwtTokenRespDto generateToken(Authentication authentication) {
		
		String authorities = null;
		StringBuilder builder = new StringBuilder();
		authentication.getAuthorities().forEach(authority ->{
			builder.append(authority.getAuthority() + ",");
		});
		
		builder.delete(builder.length() - 1, builder.length());
		
		authorities = builder.toString();
		
		Date tokenExpriesDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));

		String accessToken = Jwts.builder().setSubject(authentication.getName())// 토큰의 제목
				.claim("auth", authorities)// auth
				.setExpiration(tokenExpriesDate)// 토큰 만료시간
				.signWith(key, SignatureAlgorithm.HS256)// 토큰 암호화
				.compact();

		return JwtTokenRespDto.builder().grantType("Bearer").accessToken(accessToken).build();
	}
}
