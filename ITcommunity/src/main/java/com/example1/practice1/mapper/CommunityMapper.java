package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.domain.CommunityDTO;
import com.example1.practice1.domain.SearchCriteria;

@Repository("com.example1.practice1.mapper.CommunityMapper")
public interface CommunityMapper {
	
	//커뮤니티글 작성
	public int insertCommunity(CommunityDTO communityDTO) throws Exception;
	
	//커뮤니티글 목록보기
	public List<CommunityDTO> communityList(SearchCriteria scri) throws Exception;
	
	//커뮤니티글 총 갯수
	public int listCount(SearchCriteria scri) throws Exception;
	
	//공지글,비밀글 보기
	public List<CommunityDTO> communitychoice(String boardchoice) throws Exception;
	
	//커뮤니티글 상세보기
	public CommunityDTO detail(int boardNo) throws Exception;
	
	//댓글목록
	public List<CommentDTO> commentList(int boardNo) throws Exception;
	
	//커뮤니티글 조회수
	public int boardHit(int boardNo) throws Exception;
	
	//게시글 좋아요
	public int insertLike(int boardNo) throws Exception;

	//게시글 기록
	public int writeLike(int boardNo,String userid) throws Exception;

	//좋아요수 가져오기
	public int getLike(int boardNo) throws Exception;
	
	//커뮤니티글 수정
	public int update(CommunityDTO communityDTO) throws Exception;
	
	//커뮤니티글 삭제
	public int delete(int boardNo) throws Exception;

}
