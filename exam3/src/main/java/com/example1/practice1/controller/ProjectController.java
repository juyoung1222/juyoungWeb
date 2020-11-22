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

import com.example1.practice1.domain.MemberVO;
import com.example1.practice1.service.ProjectService;

@Controller
//@RequestMapping("/login")
public class ProjectController {
	
	//로깅을 위한 변수
	private static final Logger logger 
	 = LoggerFactory.getLogger(ProjectController.class);
	
	@Inject
	ProjectService service;
	
	//메인
	@GetMapping("/")
	public String mainForm() {
		return "main";
	}
	@RequestMapping("/chat/chat")
	public String chatMain() throws Exception{
		return "/chat/chat";
	}
	//회원가입GET
	@RequestMapping(value="/login/register",method=RequestMethod.GET)
	public String getRegister() throws Exception{
		
		logger.info("get register........");
		return "/login/register";
	}//end - public String getRegister() throws Exception
	//회원가입POST
	@RequestMapping(value="/login/register",method=RequestMethod.POST)
	public String postRegister(MemberVO vo) throws Exception{
		logger.info("post register......");
		
		int result = service.idCheck(vo);
		logger.info("ProjectController Return Count[" + result + "]" + vo);
		
		try {
			if(result == 1) {//아이디를 이미 사용하고 있으면
				return "/login/register";
			}else if(result == 0) {//아이디가 존재하지 않다면
				System.out.println(vo);
				service.register(vo);
			}
			
		} catch (Exception e) {
			
			
		}
		return "redirect:/login/login";
		
		}//end - public String postRegister(MemberVO vo) throws Exceptio
		
	//아이디 중복검사
		@ResponseBody
		@RequestMapping(value="/login/idCheck",method=RequestMethod.POST)
		public int idCheck(MemberVO vo) throws Exception{
			logger.info("MemberController : " + vo);
			
			//아이디 중복검사를 위해서 vo를 service에게 넘겨준다.
			int result = service.idCheck(vo);
			logger.info("MemberController Return Value [" + result + "]");
			
			return result;
		}
		
		//로그인 GET
		@RequestMapping(value="/login/login", method=RequestMethod.GET)
		public String getLogin() throws Exception{
			
			logger.info("login get.....");
			return "/login/login";
				
		}//end - public String getLogin() throws Exception
		
		@RequestMapping(value="/login/login", method=RequestMethod.POST)
		public String postLogin(MemberVO vo,HttpServletRequest req, RedirectAttributes rttr) throws Exception{
			logger.info("login post.....");
			
			HttpSession session = req.getSession();
			logger.info("projectcontroller postlogin : " + session);
			
			//넘겨받은 회원정보를 가지고 서비스에게 의뢰한다.
			MemberVO login = service.login(vo);
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
			
		}
		//로그아웃 GET
		@RequestMapping(value="/login/logout",method=RequestMethod.GET)
		public String getLogout(HttpSession session) throws Exception{
			logger.info("projectController getLogout...");
			session.invalidate();
			return "redirect:/login/login";
	     }
		//회원정보수정GET
		@RequestMapping(value="/login/proUpdate",method=RequestMethod.GET)
		public String getUpdateView() throws Exception{
			logger.info("projectController getUpdate");
			return "/login/proUpdate";
		}
		//회원정보수정POST
		@RequestMapping(value="/login/proUpdate",method=RequestMethod.POST)
		public String postUpdate(MemberVO vo, HttpSession session) throws Exception{
			logger.info("projectController postUpdate");
			service.update(vo);
			session.invalidate();
			return "redirect:/login/login";
		}
		//회원정보삭제GET
		@RequestMapping(value="/login/proDelete",method=RequestMethod.GET)
		public String getDeleteView() throws Exception{
			logger.info("projectController getDelete");
			return "/login/proDelete";
		}
		//회원정보삭제POST
		@RequestMapping(value="/login/proDelete",method=RequestMethod.POST)
		public String postDelete(MemberVO vo, HttpSession session, RedirectAttributes rttr) throws Exception{
			logger.info("projectController postDelete");
			
			//세션에 들어있는 member정보를 가져와서 member변수에 저장한다.
			MemberVO member = (MemberVO) session.getAttribute("member");
			
			//세션에 들어있는 비밀번호만 변수에 저장
			String sessionPasswd = member.getUserPw();
			
			//사용자가 입력한 비밀번호 => memberVO에 들어있는 비밀번호
			String memberVOPasswd = vo.getUserPw();
			
			if(!sessionPasswd.equals(memberVOPasswd)) {
				rttr.addFlashAttribute("msg", false);
				return "redirect:/login/proDelete";
			}
			service.delete(vo);
			session.invalidate();
			return "redirect:/login/login";
			
		}
		
		
	
	
	

}//end - public class ProjectController 
