package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.controller.CommunityController;
import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.domain.CommunityDTO;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.mapper.CommunityMapper;

@Service("com.example1.practice1.service.CommunityService")
public class CommunityService {
	
	//로깅을 위한 변수
	private static final Logger logger 
	= LoggerFactory.getLogger(CommunityController.class);
	
	@Resource(name="com.example1.practice1.mapper.CommunityMapper")
	CommunityMapper mapper;
	
	//커뮤니티 글 등록
	public int insertCommunity(CommunityDTO communityDTO) throws Exception{
		logger.info("service insertcommunity ..." + communityDTO);
		return mapper.insertCommunity(communityDTO);
	}
	
	//커뮤니티글 목록보기
	public List<CommunityDTO> communityList(SearchCriteria scri) throws Exception{
		logger.info("service :" + scri);
		List<CommunityDTO> list = mapper.communityList(scri);
		return list;
	}
	
	//커뮤니티글 총 갯수
	public int listCount(SearchCriteria scri) throws Exception{
		logger.info("service listCount... " + scri);
		return mapper.listCount(scri);
	}
	
	//공지글,비밀글 보기
	public List<CommunityDTO> communitychoice(String boardchoice) throws Exception{
		logger.info("communitychoice.. " + boardchoice);
		return mapper.communitychoice(boardchoice);
	}
	
	//커뮤니티글 상세보기
	public CommunityDTO detail(int boardNo) throws Exception{
		logger.info("service detail..." + boardNo);
		return mapper.detail(boardNo);
	}
	
	//댓글목록
	public List<CommentDTO> commentList(int boardNo) throws Exception{
		logger.info("service comment...." + boardNo);
		return mapper.commentList(boardNo);
	}
	
	//커뮤니티글 조회수
	public int boardHit(int boardNo) throws Exception{
		logger.info("service hit..." + boardNo);
		return mapper.boardHit(boardNo);
	}
	
	//게시글 좋아요
	public int insertLike(int boardNo) throws Exception{
		logger.info("service addlike..." + boardNo);
		return mapper.insertLike(boardNo);
	}
	//게시글 추가
	public int writeLike(int boardNo, String userid) throws Exception{
		logger.info("service writelike..." + boardNo + userid );
		return mapper.writeLike(boardNo,userid);
	}
	//좋아요수 가져오기
	public int getLike(int boardNo) throws Exception{
		logger.info("service getlikes.. " + boardNo);
		return mapper.getLike(boardNo);
	}
	
	//커뮤니티글 수정
	public int update(CommunityDTO communityDTO) throws Exception{
		logger.info("service update..." + communityDTO);
		
		System.out.println("boardNo : " + communityDTO.getBoardNo());
		System.out.println("subject : " + communityDTO.getSubject());
		System.out.println("content : " + communityDTO.getContent());
		
		return mapper.update(communityDTO);
	}
	//커뮤니티글 삭제
	public int delete(int boardNo) throws Exception{
		logger.info("service delete ..." + boardNo);
		return mapper.delete(boardNo);
	}
}
