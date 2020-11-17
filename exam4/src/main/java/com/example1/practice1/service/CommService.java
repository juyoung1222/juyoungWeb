package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.CommVO;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.mapper.CommMapper;

@Service("com.example1.practice1.service.CommService")
public class CommService {
	
	//로깅을 위한 변수
	private static final Logger logger 
		= LoggerFactory.getLogger(BoardService.class);
	
	@Resource(name="com.example1.practice1.mapper.CommMapper")
	CommMapper mapper;
	
	//커뮤니티 글 등록
	public int insertComm(CommVO comm) throws Exception{
		logger.info("service :" + comm);
		return mapper.insertComm(comm);
	}
	
	//커뮤니티 글 목록보기
	public List<CommVO> commList(SearchCriteria scri) throws Exception{
		logger.info("service : ....");
		List<CommVO> list = mapper.commList(scri);
		//1일 이내 신규글 new마크 처리 로직
			for(CommVO article : list) {
		//현재 시간 읽어오기
				long now = System.currentTimeMillis();//밀리초로 읽기 15억... * 1000초  
		//각 게시물들의 작성 시간 밀리초로 읽어오기
				long regTime = article.getReg_date().getTime();
				
				if(now - regTime < 60 * 60 * 24 * 5 * 1000) {
					article.setNewMark(true);
				}
			}
		return list;
	}
	//커뮤니티 글 총 갯수
	public int listCount(SearchCriteria scri) throws Exception{
		logger.info("service:....");
		return mapper.listCount(scri);
	}
	
	//커뮤니티 글 상세보기
	public CommVO commDetail(int cno) throws Exception{
		logger.info("service : " + cno );
		return mapper.commDetail(cno);
	} 
	//커뮤니티 글 수정
	public int commUpdate(CommVO comm) throws Exception{
		logger.info("service : " + comm);
		System.out.println("CNO : " + comm.getCno());
		System.out.println("SUBJECT : " + comm.getSubject());
		System.out.println("CONTENT : " + comm.getContent());
		return mapper.commUpdate(comm);
	}
	//커뮤니티 글 삭제
	public int commDelete(int cno) throws Exception{
		logger.info("service : " + cno);
		return mapper.commDelete(cno);
	}

}
