package com.study.oauth2.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.study.oauth2.entity.Posts;
import com.study.oauth2.entity.PostsImg;

@Mapper
public interface PostsRepositoty {
	public int registerPosts(Posts posts);
	public int regiseerPostsImgs(List<PostsImg> postsImgs);
}
