package com.example1.practice1.admin.service;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.admin.controller.AdminController;
import com.example1.practice1.admin.domain.AdminDTO;
import com.example1.practice1.admin.mapper.AdminMapper;
import com.example1.practice1.domain.MemberDTO;



@Service("com.example1.practice1.admin.service.AdminService")
public class AdminService {
	
	private static final Logger logger 
	 = LoggerFactory.getLogger(AdminController.class);
	
	@Resource
	AdminMapper mapper;
	
	//아이디체크
	public int adminIdCheck(AdminDTO adminDTO) throws Exception{
		
		logger.info("AdminService idCheck.......");
		
		int result = mapper.adminIdCheck(adminDTO);
		return result;
	}
	//로그인
	public AdminDTO adminLogin(AdminDTO adminDTO) throws Exception{
		
		logger.info("AdminService login......");
		
		return mapper.adminLogin(adminDTO);
		}
	
}
