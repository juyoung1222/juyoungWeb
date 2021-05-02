package com.bil.login.service.impl;

import org.springframework.stereotype.Repository;

import com.bil.user.vo.UserVO;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("loginDAO")
public class LoginDAO extends EgovAbstractDAO{
	
	public UserVO login(UserVO userVO) throws Exception{
		return login(userVO);
	}

}
