package com.example1.practice1.mapper;

import org.springframework.stereotype.Repository;
import com.example1.practice1.domain.MemberVO;

@Repository("com.example1.practice1.mapper.ProjectMapper")
public interface ProjectMapper {
	
	//아이디 중복검사
	public int idCheck(MemberVO vo) throws Exception;
	
	//회원가입
	public void register(MemberVO vo) throws Exception;
	
	//로그인
	public MemberVO login(MemberVO vo) throws Exception;
	
	//회원정보수정
	public void update(MemberVO vo) throws Exception;
	
	//회원정보삭제
	public void delete(MemberVO vo) throws Exception;
	
}
