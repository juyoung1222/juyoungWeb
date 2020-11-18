package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.example1.practice1.controller.BoardController;
import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.Criteria;
import com.example1.practice1.domain.SearchCriteria;
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
	@Transactional(isolation = Isolation.READ_COMMITTED)
	public List<BoardVO> boardList(SearchCriteria scri) throws Exception{
		logger.info("service :" + scri );
		List<BoardVO> list = mapper.boardList(scri);
		//1일 이내 신규글 new마크 처리 로직
			for(BoardVO article : list) {
		//현재 시간 읽어오기
			long now = System.currentTimeMillis();//밀리초로 읽기 15억... * 1000초  
		//각 게시물들의 작성 시간 밀리초로 읽어오기
		long regTime = article.getReg_date().getTime();
					
					if(now - regTime < 60 * 60 * 24 * 5 * 1000) {
						article.setNewMark(true);
					}
				}
		
			
			return mapper.boardList(scri);
	
		
	}
	//게시글 총 갯수
	public int listCount(SearchCriteria scri) throws Exception {
		logger.info("service ...." + scri);
		return mapper.listCount(scri);
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
	
	//게시글 조회수
	public int boardHit(int bno) throws Exception{
		logger.info("service hit ..." + bno);
		return mapper.boardHit(bno);
	
	}

		
		
	
}
