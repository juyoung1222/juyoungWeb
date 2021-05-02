package com.bil.login.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bil.login.service.LoginService;
import com.bil.user.service.UserService;
import com.bil.user.vo.UserVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


@Service("loginService")
public class LoginServiceImpl extends EgovAbstractServiceImpl implements LoginService{
	
	@Resource
	private LoginMapper loginMapper;
	
	public UserVO login(UserVO userVO) throws Exception{
		
		return loginMapper.login(userVO);
	}
}
