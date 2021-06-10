package com.bil.user.service.impl;

import org.springframework.stereotype.Repository;

import com.bil.user.vo.UserVO;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("userDAO")
public class UserDAO extends EgovAbstractDAO{
	
	public void insertUser(UserVO userVO) throws Exception{
		 insertUser(userVO);
	}
	
	public int idCheck(UserVO userVO) throws Exception{
		return idCheck(userVO);
	}
	
	public int pwdCheck(UserVO userVO) throws Exception{
		return pwdCheck(userVO);
	}

}
