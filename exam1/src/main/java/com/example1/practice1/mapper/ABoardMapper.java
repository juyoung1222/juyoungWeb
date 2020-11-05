package com.example1.practice1.mapper;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.ABoardVO;

@Repository("com.example1.practice1.mapper.ABoardMapper")
public interface ABoardMapper {
	
	//게시글 등록
	public int boardInsert(ABoardVO vo) throws Exception;

}
