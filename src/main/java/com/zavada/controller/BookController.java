package com.zavada.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zavada.domain.BookDTO;
import com.zavada.service.BookService;

@RestController
@RequestMapping("books")
public class BookController {

	@Autowired
	private BookService bookService;
	
	@PostMapping
	public ResponseEntity<Void> addBook(@RequestBody BookDTO book) {
		bookService.create(book);
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<BookDTO>> getBooks() {
		return new ResponseEntity<List<BookDTO>>(bookService.getAll(), HttpStatus.OK);
	}
	
	@GetMapping("{bookId}")
	public ResponseEntity<BookDTO> getBook(@PathVariable("bookId") String bookId) {
		return new ResponseEntity<BookDTO>(bookService.get(bookId) , HttpStatus.OK);
		
	}
}
