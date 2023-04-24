package com.toyproject.bookmanagement.security.jwt;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.toyproject.bookmanagement.dto.auth.response.JwtTokenRespDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
	
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (SecurityException | MalformedJwtException e) {
			// Security 라이브러리에 오류가 있거나, Malformed JSON의 포맷이 잘못된 형식의 JWT가 들어왔을때 예외
			// SignatureException이 포함된다.
			log.info("Invalid JWT TOKEN", e);
		} catch (ExpiredJwtException e) {
			// token의 유효기간이 만료된 경우의 예외
			log.info("Expired JWT TOKEN", e);
		} catch (UnsupportedJwtException e) {
			// jwt의 형식을 지키지 않은 경우 (Header.Payload.Signature)

			log.info("Unsupported JWT TOKEN", e);
		} catch (IllegalArgumentException e) {
			// JWT token이 없을 떄
			log.info("IllegalArgument JWT TOKEN", e);
		} catch (Exception e) {
			log.info("JWT TOKEN Error", e);
		}
		return false;
	}
	
	public String getToken(String token) {
		String type ="Bearer";
		
		if(StringUtils.hasText(token) && token.startsWith(type)) {
			return token.substring(type.length());
		}
		return null;
	}
	
	public Claims getClaims(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();//
	}
}
