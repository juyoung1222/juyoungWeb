package com.example1.practice1.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example1.practice1.domain.MemberDTO;
import com.example1.practice1.service.MemberService;

@Controller
//@RequestMapping("/login")
public class MemberController {
	
	//로깅을 위한 변수
	private static final Logger logger 
	 = LoggerFactory.getLogger(MemberController.class);
	
	@Inject
	MemberService service;
	
	//메인
	@GetMapping("/")
	private String mainForm() {
		return "main";
	}
	//채팅
//	@RequestMapping("/chat/chat")
//	private String chatMain() throws Exception{
//		return "/chat/chat";
//	}

	//회원가입GET
	@RequestMapping(value="/login/register",method=RequestMethod.GET)
	private String getRegister() throws Exception{
		
		logger.info("get register........");
		
		return "/login/register";
	}//end - private String getRegister() throws Exception

	//회원가입POST
	@RequestMapping(value="/login/register",method=RequestMethod.POST)
	private String postRegister(MemberDTO memberDTO) throws Exception{
		logger.info("post register......");
		
		//아이디 중복검사
		int result = service.idCheck(memberDTO);
		logger.info("ProjectController Return Count[" + result + "]" + memberDTO);
		
		try {
			if(result == 1) {//아이디를 이미 사용하고 있으면
				//회원가입창으로 보낸다.
				return "/login/register";
			}else  {//아이디가 존재하지 않다면
				System.out.println(memberDTO);
				//회원가입 서비스로 간다.
				service.register(memberDTO);
				}
		  } catch (Exception e) {
			
			
		}
		return "redirect:/login/login";
		
		}//end - private String postRegister(MemberVO vo) throws Exceptio
		
		//아이디 중복검사
		@ResponseBody
		@RequestMapping(value="/login/idCheck",method= {RequestMethod.POST,RequestMethod.GET})
		private int idCheck(MemberDTO memberDTO) throws Exception{
			logger.info("MemberController : " + memberDTO);
			
			//아이디 중복검사를 위해서 vo를 service에게 넘겨준다.
			int result = service.idCheck(memberDTO);
			logger.info("MemberController Return Value [" + result + "]");
			
			return result;
		}//end - private int idCheck(MemberDTO memberDTO) throws Exception
		
		//로그인 GET
		@RequestMapping(value="/login/login", method=RequestMethod.GET)
		private String getLogin() throws Exception{
			
			logger.info("login get.....");
			return "/login/login";
				
		}//end - private String getLogin() throws Exception
		
		//로그인 POST
		@RequestMapping(value="/login/login", method=RequestMethod.POST)
		private String postLogin(MemberDTO memberDTO,HttpServletRequest req, RedirectAttributes rttr) throws Exception{
			logger.info("login post.....");
			
			HttpSession session = req.getSession();
			logger.info("projectcontroller postlogin : " + session);
			
			//넘겨받은 회원정보를 가지고 서비스에게 의뢰한다.
			MemberDTO login = service.login(memberDTO);
			logger.info("projectcontroller return value : " + login);
			
			//해당하는 회원의 정보가 없으면
			if(login == null) {
				session.setAttribute("member", null);
				rttr.addFlashAttribute("msg", false);
			}else {
				//해당하는 회원의 정보가 있으면
				session.setAttribute("member", login);
			}
			return "redirect:/login/login";
			
		}//end - private String postLogin(MemberDTO memberDTO,HttpServletRequest req, RedirectAttributes rttr) throws Exception
		
		//로그아웃 GET
		@RequestMapping(value="/login/logout",method=RequestMethod.GET)
		private String getLogout(HttpSession session) throws Exception{
			
			logger.info("projectController getLogout...");
			
			session.invalidate();
			
			return "redirect:/login/login";
	     }//end - private String getLogout(HttpSession session) throws Exception
		
		//회원정보수정GET
		@RequestMapping(value="/login/proUpdate",method=RequestMethod.GET)
		private String getUpdateView() throws Exception{
			
			logger.info("projectController getUpdate");
			
			return "/login/proUpdate";
		}//end - private String getUpdateView() throws Exception
		
		//회원정보수정POST
		@RequestMapping(value="/login/proUpdate",method=RequestMethod.POST)
		private String postUpdate(MemberDTO memberDTO, HttpSession session) throws Exception{
			
			logger.info("projectController postUpdate");
			
			service.update(memberDTO);
			
			//세션을 종료
			session.invalidate();
			
			return "redirect:/login/login";
		}//end - private String postUpdate(MemberDTO memberDTO, HttpSession session) throws Exception
		
		//회원정보삭제GET
		@RequestMapping(value="/login/proDelete",method=RequestMethod.GET)
		private String getDeleteView() throws Exception{
			
			logger.info("projectController getDelete");
			
			return "/login/proDelete";
		}//end - private String getDeleteView() throws Exception
		
		//회원정보삭제POST
		@RequestMapping(value="/login/proDelete",method=RequestMethod.POST)
		private String postDelete(MemberDTO memberDTO, HttpSession session, RedirectAttributes rttr) throws Exception{
			logger.info("projectController postDelete");
			
			//세션에 들어있는 member정보를 가져와서 member변수에 저장한다.
			MemberDTO member = (MemberDTO) session.getAttribute("member");
			
			//세션에 들어있는 비밀번호만 변수에 저장
			String sessionPasswd = member.getUserPw();
			
			//사용자가 입력한 비밀번호 => memberVO에 들어있는 비밀번호
			String memberDTOPasswd = memberDTO.getUserPw();
			
			if(!sessionPasswd.equals(memberDTOPasswd)) {
				rttr.addFlashAttribute("msg", false);
				return "redirect:/login/proDelete";
			}
			service.delete(memberDTO);
			//세션을 종료
			session.invalidate();
			
			return "redirect:/login/login";
			
		}//end - private String postDelete(MemberDTO memberDTO, HttpSession session, RedirectAttributes rttr) throws Exception
		
		
	
	
	

}//end - public class ProjectController 
