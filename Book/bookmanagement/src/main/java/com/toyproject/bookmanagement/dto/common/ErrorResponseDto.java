package com.toyproject.bookmanagement.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponseDto<T> {
	private String message;
	private T errorData;
}
