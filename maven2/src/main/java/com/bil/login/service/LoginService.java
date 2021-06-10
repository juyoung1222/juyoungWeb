package com.bil.login.service;

import com.bil.user.vo.UserVO;

public interface LoginService {
	
	public UserVO login(UserVO userVO) throws Exception;
}
