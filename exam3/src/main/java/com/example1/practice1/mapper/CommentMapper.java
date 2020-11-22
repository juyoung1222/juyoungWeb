package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;


import com.example1.practice1.domain.CommentVO;

@Repository("com.example1.practice1.mapper.CommentMapper")
public interface CommentMapper {
	
	//댓글 등록
	public int commentInsert(CommentVO comment) throws Exception;
	
	// 댓글 목록
	public List<CommentVO> commentList(int bno) throws Exception;

	//댓글 수정
	public int commentUpdate(CommentVO comment) throws Exception;
	
	//댓글 삭제
	public int commentDelete(int cno) throws Exception;
}
