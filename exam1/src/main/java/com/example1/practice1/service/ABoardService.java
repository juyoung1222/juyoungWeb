package com.example1.practice1.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example1.practice1.domain.ABoardVO;
import com.example1.practice1.mapper.ABoardMapper;

@Service("com.example1.practice1.service.ABoardService")
public class ABoardService {
	
	@Resource(name="com.example1.practice1.mapper.ABoardMapper")
	ABoardMapper mapper;
	
	//게시글 등록
	public int boardInsert(ABoardVO vo) throws Exception{
		System.out.println("Service boardInsert : " + vo);
		return mapper.boardInsert(vo);
	}

}
