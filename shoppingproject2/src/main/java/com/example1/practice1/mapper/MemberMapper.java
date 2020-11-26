package com.example1.practice1.mapper;

import org.springframework.stereotype.Repository;
import com.example1.practice1.domain.MemberDTO;

@Repository("com.example1.practice1.mapper.	MemberMapper")
public interface MemberMapper {
	
	//아이디 중복검사
	public int idCheck(MemberDTO memberDTO) throws Exception;
	
	//회원가입
	public void register(MemberDTO memberDTO) throws Exception;
	
	//로그인
	public MemberDTO login(MemberDTO memberDTO) throws Exception;
	
	//회원정보수정
	public void update(MemberDTO memberDTO) throws Exception;
	
	//회원정보삭제
	public void delete(MemberDTO memberDTO) throws Exception;
	
}
