package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.controller.BoardController;
import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.PageVO;
import com.example1.practice1.mapper.BoardMapper;

@Service("com.example1.practice1.service.BoardService")
public class BoardService {
	//로깅을 위한 변수
		private static final Logger logger 
			= LoggerFactory.getLogger(BoardService.class);
	
	@Resource(name="com.example1.practice1.mapper.BoardMapper")
	BoardMapper mapper;
	
	//게시글 등록
	public int insertBoard(BoardVO vo) throws Exception{
		logger.info("service : " + vo);
		return mapper.insertBoard(vo);
	}
	//게시글 목록보기
	public List<BoardVO> boardList() throws Exception{
		logger.info("service :" );
		List<BoardVO> list = mapper.boardList();
	
		return list; 
	}
	//페이징 이후
	public List<BoardVO> getArticleListPaging(PageVO paging) throws Exception{
		//page = (page -1) * 10;
		return mapper.getArticleListPaging(paging);
	}
	//개수
	public int countArticles() {
		return mapper.countArticles();
	}
	//게시글 상세보기
	public BoardVO detail(int bno) throws Exception{
		logger.info("service :" + bno);
		return mapper.detail(bno);
	}
	//게시글 수정
	public int update(BoardVO vo) throws Exception{
		logger.info("service : " + vo);
		System.out.println("BNO : " + vo.getBno());
		System.out.println("SUBJECT : " + vo.getSubject());
		System.out.println("CONTENT : " + vo.getContent());
		return mapper.update(vo);
	}
	//게시글 삭제
	public int delete(int bno) throws Exception{
		logger.info("service : " + bno);
		return mapper.delete(bno);
	}
	//검색창
	public List<BoardVO> search() throws Exception{
		logger.info("service search ...");
		return mapper.search();
	}
	
	
}
