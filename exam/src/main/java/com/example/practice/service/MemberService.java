package com.example.practice.service;

//import javax.annotation.Resource;
import javax.inject.Inject;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.practice.controller.LoginController;
import com.example.practice.domain.MemberVO;
import com.example.practice.mapper.MemberMapper;

@Service("com.example.practice.service.MemberService")
public class MemberService {
	
	private static final Logger logger 
	= LoggerFactory.getLogger(LoginController.class);
	@Inject
	//@Resource(name="com.example.practice.mapper.MemberMapper")
	MemberMapper mapper;

	public void register(MemberVO vo) throws Exception {
		logger.info("ServiceImpl register.....");
		mapper.register(vo);

	}

	public MemberVO login(MemberVO vo) throws Exception {
		
		return mapper.login(vo);
	}

}
