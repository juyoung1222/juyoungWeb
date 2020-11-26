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
	public int idCheck(MemberDTO vo) throws Exception{
		logger.info("ProjectService idCheck.......");
		int result = mapper.idCheck(vo);
		return result;
	}
	//회원가입
	public void register(MemberDTO vo) throws Exception{
		logger.info("ProjectService register........");
		mapper.register(vo);
	}
	
	//로그인
	public MemberDTO login(MemberDTO vo) throws Exception{
		logger.info("ProjectService login......");
		return mapper.login(vo);
	}
	
	//회원정보수정
	public void update(MemberDTO vo) throws Exception{
		logger.info("ProjectService update....");
		mapper.update(vo);
	}
	//회원탈퇴
	public void delete(MemberDTO vo) throws Exception{
		logger.info("ProjectService delete....");
		mapper.delete(vo);
	}
}
