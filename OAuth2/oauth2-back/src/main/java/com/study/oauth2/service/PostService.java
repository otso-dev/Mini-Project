package com.study.oauth2.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.study.oauth2.dto.posts.RegisterPostReqDto;
import com.study.oauth2.entity.Posts;
import com.study.oauth2.entity.PostsImg;
import com.study.oauth2.repository.PostsRepositoty;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	
	private final PostsRepositoty postsRepositoty;
	
	@Value("${file.path}")
	private String filePath;
	
	public int registerPost(RegisterPostReqDto registerPostReqDto) {
		
		Posts posts = registerPostReqDto.toEntity();
		postsRepositoty.registerPosts(posts);
		
		
		return postsRepositoty.regiseerPostsImgs(uploadFile(posts.getPostsId(),registerPostReqDto.getImgFiles()));
	}
	
	private List<PostsImg> uploadFile(int postsId, List<MultipartFile> files) {
		if(files == null) {
			return null;
		}
		
		List<PostsImg> postsFiles = new ArrayList<>();
		
		files.forEach(file ->{
			String originFileName = file.getOriginalFilename();
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;
			Path uploadpath = Paths.get(filePath + "post/" + tempFileName);
//			
//			System.out.println(originFileName);
//			System.out.println(extension);
//			System.out.println(tempFileName);
//			System.out.println(uploadpath);
//			try {
//				System.out.println(file.getBytes());
//			} catch (IOException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
//			
			File f = new File(filePath + "post/");
			
			if(!f.exists()) {
				f.mkdirs();
			}
			
			try {
				Files.write(uploadpath,file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}

			postsFiles.add(PostsImg.builder()
					.postId(postsId)
					.originName(originFileName)
					.tempName(tempFileName)
					.imgSize(Long.toString(file.getSize()))
					.build());
		}); 
		return postsFiles;
	}
}
