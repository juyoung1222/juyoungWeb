package com.example.practice.mapper;

import com.example.practice.domain.MemberVO;

public interface MemberMapper {
	
	//회원가입
	public void register(MemberVO vo) throws Exception;
	
	//로그인
	public MemberVO login(MemberVO vo) throws Exception;

}
