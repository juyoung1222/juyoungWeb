package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.domain.CommVO;
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
	public List<CommVO> commList() throws Exception{
		logger.info("service : ....");
		return mapper.commList();
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
