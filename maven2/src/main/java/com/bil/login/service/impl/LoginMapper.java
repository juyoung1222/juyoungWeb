package com.bil.login.service.impl;

import com.bil.user.vo.UserVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("loginMapper")
public interface LoginMapper {
	
	public UserVO login(UserVO userVO) throws Exception;

}
