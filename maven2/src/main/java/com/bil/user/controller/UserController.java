package com.bil.user.controller;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bil.user.service.UserService;
import com.bil.user.service.impl.UserDAO;
import com.bil.user.service.impl.UserServiceImpl;
import com.bil.user.vo.UserVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Controller
public class UserController {
	//로깅을 위한 변수
		private static final Logger logger 
		 = LoggerFactory.getLogger(UserController.class);
	
	//@Resource(name="userService")
	//private UserService userService;

	//@Resource(name="userDAO")
	//private UserDAO userDAO;
	
	@Resource
	private UserServiceImpl userServiceImpl;
	
	
	
	@RequestMapping("/user/userInsert.do")
	public String userInsert() {
		
		return "/user/userInsert";
	}
	
	@RequestMapping(value="/user/userInsert.do",method=RequestMethod.POST)
	private String postUserInsert(UserVO userVO) throws Exception{
		logger.info("post userInsert..."); 
		
		int result = userServiceImpl.idCheck(userVO);
		int result1 = userServiceImpl.pwdCheck(userVO);
		
		logger.info("usercontroller retrun count[" + result + "]" + userVO);
		System.out.println(userVO.getUserName());
		
		
//		try {
//			if(result == 1) {
//				return "/login/login";
//			
//			}else if(result1 == 1) {
//				
//				userServiceImpl.pwdCheck(userVO);
//				
//				return "/login/login";
//				
//			}
//		} catch (Exception e) {
//			System.out.println(userVO);
		
		try {
			if(result == 1) {
				return "/user/userInsert";
			}else if(result1 ==1) {
				return "/user/userInsert";
			}else {
				System.out.println(userVO);
				userServiceImpl.insertUser(userVO);
			}
			
		} catch (Exception e) {
			
		}
			
			return "redirect:/login/login.do";
	}
	@ResponseBody
	@RequestMapping(value="/user/idCheck.do",method= {RequestMethod.POST, RequestMethod.GET})
	private int idCheck(UserVO userVO) throws Exception{
		
		System.out.println(userVO.getUserId());
		 int result = userServiceImpl.idCheck(userVO);
		 
		 //logger.info("UserController Return Value [" + result + "]");
			
			return result;
		}
	@ResponseBody
	@RequestMapping(value="/user/pwdCheck.do", method={RequestMethod.POST, RequestMethod.GET})
	private int pwdCheck(UserVO userVO) throws Exception{
		System.out.println(userVO.getPwd());
		int result1 = userServiceImpl.pwdCheck(userVO);
		System.out.println(userServiceImpl.pwdCheck(userVO));
		return result1;
	}
	
	
}
