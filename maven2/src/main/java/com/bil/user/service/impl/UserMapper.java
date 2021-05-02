package com.bil.user.service.impl;

import org.mybatis.spring.annotation.MapperScan;

import com.bil.user.vo.UserVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("userMapper")
public interface UserMapper {
	
	public void insertUser(UserVO userVO) throws Exception;
	
	public int idCheck(UserVO userVO) throws Exception;
	
	public int pwdCheck(UserVO userVO) throws Exception;

}
