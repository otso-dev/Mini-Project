package com.toyproject.bookmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.bookmanagement.dto.book.SearchBookReqDto;
import com.toyproject.bookmanagement.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BookController {
	
	private final BookService bookService;

	@GetMapping("/book/{bookId}")
	public ResponseEntity<?> getBook(@PathVariable int bookId){
		
		return ResponseEntity.ok().body(bookService.getBook(bookId));
	}
	
	@GetMapping("/books")
	public ResponseEntity<?> searchBooks(SearchBookReqDto serBookReqDto){
		System.out.println(serBookReqDto);
		return ResponseEntity.ok().body(bookService.searchBooks(serBookReqDto));
	}
	
	@GetMapping("/categories")
	public ResponseEntity<?> categories(){
		return ResponseEntity.ok(bookService.getCategories());
	}
	
	@GetMapping("/book/{bookId}/like")
	public ResponseEntity<?> getLikeCount(@PathVariable int bookId) {
		return ResponseEntity.ok().body(bookService.getLikeCount(bookId));
	}
}
