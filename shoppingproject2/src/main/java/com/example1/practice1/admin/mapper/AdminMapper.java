package com.example1.practice1.admin.mapper;

import org.springframework.stereotype.Repository;

import com.example1.practice1.admin.domain.AdminDTO;


@Repository("com.example1.practice1.admin.mapper.AdminMapper")
public interface AdminMapper {
	
	//아이디 중복검사
	public int adminIdCheck(AdminDTO adminDTO) throws Exception;
		
	//로그인
	public AdminDTO adminLogin(AdminDTO adminDTO) throws Exception;
		

}
