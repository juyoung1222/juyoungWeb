package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.ABoardVO;

@Repository("com.example1.practice1.mapper.ABoardMapper")
public interface ABoardMapper {
	
	//게시글 등록
	public int boardInsert(ABoardVO vo) throws Exception;
	
	//게시글 목록보기
	public List<ABoardVO> boardList() throws Exception;
	
	//게시글 상세보기
	public ABoardVO detail(Integer b_no) throws Exception;

	//게시글 수정
	public void update(ABoardVO vo) throws Exception;
	
	//게시글 삭제
	public void delete(Integer b_no) throws Exception;
}
