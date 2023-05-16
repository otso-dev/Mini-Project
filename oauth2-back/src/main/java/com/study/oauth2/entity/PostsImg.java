package com.study.oauth2.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostsImg {
	private int postsImgId;
	private int postId;
	private String originName;
	private String tempName;
	private String imgSize; 
}
