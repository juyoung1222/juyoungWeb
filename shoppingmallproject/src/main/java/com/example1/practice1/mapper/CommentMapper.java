package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;


import com.example1.practice1.domain.CommentDTO;

@Repository("com.example1.practice1.mapper.CommentMapper")
public interface CommentMapper {
	
	//댓글 목록
	public List<CommentDTO> commentList(int replycontentid) throws Exception;
	
	//댓글 등록
	public int commentInsert(CommentDTO comment) throws Exception;
	
	//댓글 수정
	public int commentUpdate(CommentDTO comment) throws Exception;
	
	//댓글 삭제
	public int commentDelete(int replyno) throws Exception;
	
	
	
}
