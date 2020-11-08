package com.example1.practice1.service;

import java.util.List;

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
	
	//게시글 목록보기
	public List<ABoardVO> boardList() throws Exception{
		System.out.println("Service boardList");
		return mapper.boardList();
	}
	
	//게시글 상세보기
	public ABoardVO detail(Integer b_no) throws Exception{
		System.out.println("Service detail");
		return mapper.detail(b_no);
	}
	//게시글 수정
	public void update(ABoardVO vo) throws Exception{
		System.out.println("Service update " + vo);
		mapper.update(vo);
	}
	//게시글 삭제
	public void delete(Integer b_no) throws Exception{
		System.out.println("Service delete");
		mapper.delete(b_no);
	}

}
