package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.domain.QnADTO;
import com.example1.practice1.domain.SearchCriteria;

@Repository("com.example1.practice1.mapper.QnAMapper")
public interface QnAMapper {

	//질문등록
	public int qnaInsert(QnADTO qnaDTO) throws Exception;
	
	//질문 목록보기
	public List<QnADTO> qnaList(SearchCriteria scri) throws Exception;
	
	//질문 글 총 개수
	public int listCount(SearchCriteria scri) throws Exception;
	
	//질문 글 상세보기
	public QnADTO qnaDetail(int boardNo) throws Exception;
	
	//댓글목록
	public List<CommentDTO> commentList(int boardNo) throws Exception;
	

}
