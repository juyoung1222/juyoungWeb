package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.controller.CommentController;
import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.mapper.CommentMapper;

@Service("com.example1.practice1.service.CommentService")
public class CommentService {
	
	@Resource(name="com.example1.practice1.mapper.CommentMapper")
	CommentMapper mCommentMapper;
	
	// 로깅을 위한 변수
	private static final Logger logger = LoggerFactory.getLogger(CommentController.class);
	
	
	
	//댓글등록
	public int commentInsertService(CommentDTO comment) throws Exception{
		logger.info("commentInsertService .....");
		return mCommentMapper.commentInsert(comment);
	}
	//댓글리스트
	public List<CommentDTO> commentListService(int replycontentid) throws Exception{
		logger.info("commentListService.....");
		return mCommentMapper.commentList(replycontentid);
	}
	
	//댓글수정
	public int commentUpdateService(CommentDTO comment) throws Exception{
		logger.info("commentUpdateService.....");
		return mCommentMapper.commentUpdate(comment);
	}
	
	//댓글 삭제
	public int commentDeleteService(int replyno) throws Exception{
		logger.info("commentDeleteService...");
		return mCommentMapper.commentDelete(replyno);
	}
	
	
}
