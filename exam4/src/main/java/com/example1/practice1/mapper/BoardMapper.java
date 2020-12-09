package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.BoardDTO;
import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.domain.Criteria;
import com.example1.practice1.domain.FileDTO;
import com.example1.practice1.domain.SearchCriteria;




@Repository("com.example1.practice1.mapper.BoardMapper")
public interface BoardMapper {
	
//게시글 작성
public int insertBoard(BoardDTO boardDTO ) throws Exception;

//게시글 목록보기
public List<BoardDTO> boardList(SearchCriteria scri) throws Exception;

//게시글 총 갯수
public int listCount(SearchCriteria scri) throws Exception;

//게시글 상세보기
public BoardDTO detail(int boardno) throws Exception;

//게시글 수정
public int update(BoardDTO boardDTO ) throws Exception;

//게시글 삭제
public int delete(int boardno) throws Exception;

//게시글 조회수
public int boardHit(int boardno) throws Exception;
//
////파일 올리기
//public int fileInsert(FileVO file) throws Exception;
//
////파일업로드목록보기
//public FileVO uploadFileList(int boardno) throws Exception;
//
////검색기능
//public List<BoardVO> searchList(SearchCriteria scri) throws Exception;

//댓글목록
public List<CommentDTO> commentList(int boardno) throws Exception;







}
