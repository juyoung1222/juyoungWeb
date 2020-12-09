package com.example1.practice1.service;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.controller.MemberController;
import com.example1.practice1.domain.MemberDTO;
import com.example1.practice1.mapper.MemberMapper;

@Service("com.example1.practice1.service.MemberService")
public class MemberService {
	private static final Logger logger 
	 = LoggerFactory.getLogger(MemberController.class);
	
	@Resource
	MemberMapper mapper;
	
	//아이디 체크
	public int idCheck(MemberDTO memberDTO) throws Exception{
		logger.info("MemberService idCheck....");
		int result = mapper.idCheck(memberDTO);
		return result;
	}
	//회원가입
	public void register(MemberDTO memberDTO) throws Exception{
		logger.info("MemberController register...");
		mapper.register(memberDTO);
	}
	//로그인
		public MemberDTO login(MemberDTO memberDTO) throws Exception{
			logger.info("ProjectService login......");
			return mapper.login(memberDTO);
		}
		
		//회원정보수정
		public void update(MemberDTO memberDTO) throws Exception{
			logger.info("ProjectService update....");
			mapper.update(memberDTO);
		}
		//회원탈퇴
		public void delete(MemberDTO memberDTO) throws Exception{
			logger.info("ProjectService delete....");
			mapper.delete(memberDTO);
		}
	}

