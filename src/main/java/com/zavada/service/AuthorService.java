package com.zavada.service;

import java.util.List;

import com.zavada.domain.AuthorDTO;

public interface AuthorService {

	void create(AuthorDTO author);
	
	AuthorDTO get(String authorId);
	
	List<AuthorDTO> getAll();
	
	void update(AuthorDTO author);
	
	boolean existsByEmail(String email);
}
