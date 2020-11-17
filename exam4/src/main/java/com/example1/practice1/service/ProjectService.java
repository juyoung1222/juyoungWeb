package com.example1.practice1.service;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.controller.ProjectController;
import com.example1.practice1.domain.MemberVO;
import com.example1.practice1.mapper.ProjectMapper;

@Service("com.example1.practice1.service.ProjectService")
public class ProjectService {
	private static final Logger logger 
	 = LoggerFactory.getLogger(ProjectController.class);
	
	@Resource
	ProjectMapper mapper;
	
	//아이디체크
	public int idCheck(MemberVO vo) throws Exception{
		logger.info("ProjectService idCheck.......");
		int result = mapper.idCheck(vo);
		return result;
	}
	//회원가입
	public void register(MemberVO vo) throws Exception{
		logger.info("ProjectService register........");
		mapper.register(vo);
	}
	
	//로그인
	public MemberVO login(MemberVO vo) throws Exception{
		logger.info("ProjectService login......");
		return mapper.login(vo);
	}
	
	//회원정보수정
	public void update(MemberVO vo) throws Exception{
		logger.info("ProjectService update....");
		mapper.update(vo);
	}
	//회원탈퇴
	public void delete(MemberVO vo) throws Exception{
		logger.info("ProjectService delete....");
		mapper.delete(vo);
	}
}
