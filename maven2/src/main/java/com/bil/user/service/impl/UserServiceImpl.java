package com.bil.user.service.impl;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bil.user.service.UserService;
import com.bil.user.vo.UserVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("userService")
public class UserServiceImpl extends EgovAbstractServiceImpl implements UserService{
	
	@Resource(name="userService")
	private UserService userService;
	
	@Resource
	private UserMapper userMapper;
	
	//@Autowired
	//private SqlSession sqlSession;
		
	public void insertUser(UserVO userVO) throws Exception{
		userMapper.insertUser(userVO);
	}
	
	public int idCheck(UserVO userVO) throws Exception{
		
		int result = userMapper.idCheck(userVO);
		
		//return userMapper.idCheck(userVO);
		
		return result;
	}
	
	public int pwdCheck(UserVO userVO) throws Exception{
		int result1 = userMapper.pwdCheck(userVO);
		
		return result1;
	}
	
	
}
