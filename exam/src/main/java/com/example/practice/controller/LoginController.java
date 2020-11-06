package com.example.practice.controller;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.practice.domain.MemberVO;
import com.example.practice.service.MemberService;
//import com.example.practice.service.MemberService2;

@Controller
@RequestMapping("/logon")
public class LoginController {
	
	private static final Logger logger 
	= LoggerFactory.getLogger(LoginController.class);
	
	//@Inject
	@Resource(name="com.example.practice.service.MemberService")
	MemberService service;
	
	//회원가입
	//@RequestMapping(value="/join",method=RequestMethod.GET)
	//public void getRegister() throws Exception{
	@RequestMapping(value="/join")
	public String getRegister() throws Exception{
		logger.info("get register");
		return "logon/join";
	}
	
	@RequestMapping(value="/join",method=RequestMethod.POST)
	public String postRegister(MemberVO vo, Model model) throws Exception{
		logger.info("post register");
		logger.info(vo.toString());
		
		service.register(vo);
		//return "redirect:/logon/list";
		return "logon/list";
		
	}
	//리스트, POST->GET
	@RequestMapping(value="/list", method=RequestMethod.POST)
	public String list() throws Exception{
		logger.info("post list");
		return "logon/list";
	}
	//로그인
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public void getLogin() throws Exception{
		logger.info("get login");
	}
	
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String login(MemberVO vo, HttpServletRequest req) throws Exception{
		logger.info("post login");
				
		HttpSession session = req.getSession();
		
		MemberVO login = service.login(vo);
		
		if(login == null) {
			session.setAttribute("member", null);
		}else {
			session.setAttribute("member", login);
		}
		return "/logon/list";
	}
	

}
