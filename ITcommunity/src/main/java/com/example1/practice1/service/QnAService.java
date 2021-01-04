package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.controller.QnAController;
import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.domain.QnADTO;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.mapper.QnAMapper;

@Service("com.example1.practice1.service.QnAService")
public class QnAService {
	//로깅을 위한 변수
		private static final Logger logger 
			= LoggerFactory.getLogger(QnAController.class);
	
		
	@Resource(name="com.example1.practice1.mapper.QnAMapper")
	QnAMapper mapper;
	
	//질문 등록
	public int qnaInsert(QnADTO qnaDTO) throws Exception{
		logger.info("qnaInsert : " + qnaDTO);
		return mapper.qnaInsert(qnaDTO);
	}
	
	//질문 목록보기
	public List<QnADTO> qnaList(SearchCriteria scri) throws Exception{
		logger.info("qnaListservice : " + scri);
		List<QnADTO> list = mapper.qnaList(scri);
		return list;
	}
	
	
	//질문 글 총 갯수
	public int listCount(SearchCriteria scri) throws Exception{
		logger.info("service listCount.." + scri);
		return mapper.listCount(scri);
	}
	
	//질문글 상세보기
	public QnADTO qnaDetail(int qnano) throws Exception{
		logger.info("service detail.." + qnano);
		return mapper.qnaDetail(qnano);
	}
	
	//댓글 목록
	public List<CommentDTO> commentList(int boardNo) throws Exception{
		logger.info("service comment..." + boardNo);
		return mapper.commentList(boardNo);
	}
	

}
