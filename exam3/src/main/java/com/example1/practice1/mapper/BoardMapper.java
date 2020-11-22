package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.PageVO;



@Repository("com.example1.practice1.mapper.BoardMapper")
public interface BoardMapper {
	
//게시글 작성
public int insertBoard(BoardVO vo) throws Exception;

//게시글 목록보기
public List<BoardVO> boardList() throws Exception;

//게시글 페이징 목록 조회
List<BoardVO> getArticleListPaging(PageVO paging) throws Exception;

//총 게시물의 수 조회기능
public int countArticles();
//게시글 상세보기
public BoardVO detail(int bno) throws Exception;

//게시글 수정
public int update(BoardVO vo) throws Exception;

//게시글 삭제
public int delete(int bno) throws Exception;

//검색창 
public List<BoardVO> search() throws Exception;




}
