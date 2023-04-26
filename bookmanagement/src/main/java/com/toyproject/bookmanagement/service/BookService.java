package com.toyproject.bookmanagement.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.toyproject.bookmanagement.dto.book.CategoryRespDto;
import com.toyproject.bookmanagement.dto.book.GetBookRespDto;
import com.toyproject.bookmanagement.dto.book.SearchBookReqDto;
import com.toyproject.bookmanagement.dto.book.SearchBookRespDto;
import com.toyproject.bookmanagement.entity.Book;
import com.toyproject.bookmanagement.entity.Category;
import com.toyproject.bookmanagement.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

	private final BookRepository bookRepository;
	
	public GetBookRespDto getBook(int bookId) {
		return bookRepository.getBook(bookId).toGetBook();
	}

	public Map<String, Object> searchBooks(SearchBookReqDto searchBookReqDto) {
		List<SearchBookRespDto> list = new ArrayList<>();
		int index = (searchBookReqDto.getPage() - 1) * 20;
		Map<String, Object> map = new HashMap<>();
		map.put("index", index);
		map.put("categoryIds", searchBookReqDto.getCategoryIds());
		map.put("searchValue",searchBookReqDto.getSearchValue());
		
		bookRepository.searchBooks(map).forEach(book ->{
			list.add(book.toDto());
		});
		int totalCount = bookRepository.getBookTotalCount(map);
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("totalCount", totalCount);
		responseMap.put("bookList", list);
		
		
		return responseMap;
	}
	
	public List<CategoryRespDto> getCategories(){
		List<CategoryRespDto> list = new ArrayList<>();
		bookRepository.categories().forEach(category ->{
			list.add(category.toDto());
		});
		return list;
	}
}
