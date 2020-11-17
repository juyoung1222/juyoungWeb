package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.CommVO;
import com.example1.practice1.domain.SearchCriteria;

@Repository("com.example1.practice1.mapper.CommMapper")
public interface CommMapper {
	
	//커뮤니티 글 등록
	public int insertComm(CommVO comm) throws Exception;
	
	//게시글 목록보기
	public List<CommVO> commList(SearchCriteria scri) throws Exception;

	//게시글 총 갯수
	public int listCount(SearchCriteria scri) throws Exception;
	
	//커뮤니티 글 상세보기
	public CommVO commDetail(int cno) throws Exception;
	
	//커뮤니티 글 수정
	public int commUpdate(CommVO comm) throws Exception;
	
	//커뮤니티 글 삭제
	public int commDelete(int cno) throws Exception;
	

}
