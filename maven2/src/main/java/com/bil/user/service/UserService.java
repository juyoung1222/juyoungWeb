package com.bil.user.service;

import org.springframework.stereotype.Service;

import com.bil.user.vo.UserVO;

public interface UserService {
	
	public void insertUser(UserVO userVO) throws Exception;
	
	public int idCheck(UserVO userVO) throws Exception;
	
	public int pwdCheck(UserVO userVO) throws Exception;

}
