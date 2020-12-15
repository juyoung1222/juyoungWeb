package com.example1.practice1.service;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.controller.MemberController;
import com.example1.practice1.domain.MemberDTO;
import com.example1.practice1.mapper.MemberMapper;

@Service("com.example1.practice1.service.ProjectService")
public class MemberService {
	private static final Logger logger 
	 = LoggerFactory.getLogger(MemberController.class);
	
	@Resource
	MemberMapper mapper;
	
	//아이디체크
	public int idCheck(MemberDTO memberDTO) throws Exception{
		logger.info("MemberService idCheck.......");
		int result = mapper.idCheck(memberDTO);
		return result;
	}
	//회원가입
	public void register(MemberDTO memberDTO) throws Exception{
		logger.info("MemberService register........");
		mapper.register(memberDTO);
	}
	
	//로그인
	public MemberDTO login(MemberDTO memberDTO) throws Exception{
		logger.info("MemberService login......");
		return mapper.login(memberDTO);
	}
	
	//회원정보수정
	public void update(MemberDTO memberDTO) throws Exception{
		logger.info("MemberService update....");
		mapper.update(memberDTO);
	}
	//회원탈퇴
	public void delete(MemberDTO memberDTO) throws Exception{
		logger.info("MemberService delete....");
		mapper.delete(memberDTO);
	}
}
