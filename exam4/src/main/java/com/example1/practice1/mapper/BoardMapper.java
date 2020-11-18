package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.Criteria;
import com.example1.practice1.domain.SearchCriteria;




@Repository("com.example1.practice1.mapper.BoardMapper")
public interface BoardMapper {
	
//게시글 작성
public int insertBoard(BoardVO vo) throws Exception;

//게시글 목록보기
public List<BoardVO> boardList(SearchCriteria scri) throws Exception;

//게시글 총 갯수
public int listCount(SearchCriteria scri) throws Exception;

//게시글 상세보기
public BoardVO detail(int bno) throws Exception;

//게시글 수정
public int update(BoardVO vo) throws Exception;

//게시글 삭제
public int delete(int bno) throws Exception;

//게시글 조회수
public int boardHit(int bno) throws Exception;



}
