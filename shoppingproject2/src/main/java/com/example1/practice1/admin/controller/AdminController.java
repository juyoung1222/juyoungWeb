package com.example1.practice1.admin.controller;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example1.practice1.admin.domain.AdminDTO;
import com.example1.practice1.admin.service.AdminService;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Resource
	AdminService service;
	
	//로깅을 위한 변수
		private static final Logger logger 
		 = LoggerFactory.getLogger(AdminController.class);
	
	//메인
	@RequestMapping("/adminindex")
	private String adminForm() {
		System.out.println("AdminControllerview show......");
		return "/admin/adminindex";
	}//end - private String adminForm()
	
	//로그인(GET)
	@RequestMapping("/adminloginform")
	private String getAdminLoginForm() {
		System.out.println("AdminLoginForm show.....");
		return "/admin/adminloginform";
	}//end - private String getAdminLoginForm()
	
	//아이디 중복검사
	@ResponseBody
	@RequestMapping(value="/admin/idCheck",method=RequestMethod.POST)
	private int idCheck(AdminDTO adminDTO) throws Exception{
		logger.info("AdminController : " + adminDTO);
				
	//아이디 중복검사를 위해서 를 service에게 넘겨준다.
	int result = service.adminIdCheck(adminDTO);
	
	logger.info("MemberController Return Value [" + result + "]");
				
	return result;
	}//end -private int idCheck(AdminDTO adminDTO) throws Exception
			
	//로그인(POST)
	@RequestMapping(value="/adminloginform",method=RequestMethod.POST)
	private String postAdminLoginForm(AdminDTO adminDTO,HttpServletRequest req ,RedirectAttributes rttr) throws Exception{
		
		logger.info("loginform post...");
		
		HttpSession session = req.getSession();
		
		//넘겨받은 관리자정보를 가지고 서비스에게 의뢰한다.
		AdminDTO adminLogin = service.adminLogin(adminDTO);
		
		logger.info("AdminController Return Value" + adminLogin);
		
		//해당하는 관리자의 정보가 없으면
		if(adminLogin == null) {
			session.setAttribute("admin", null);
			rttr.addFlashAttribute("msg", false);
		}else {
			//해당하는 회원의 정보가 있으면
			session.setAttribute("admin", adminLogin);
		}
		return "redirect:/admin/adminloginform";
		
		}
		//로그아웃 GET
			@RequestMapping(value="/adminlogout",method=RequestMethod.GET)
			private String getadminLogout(HttpSession session) throws Exception{
				
				logger.info("AdminController getadminLogout...");
				
				session.invalidate();
				
				return "redirect:/admin/adminloginform";
		     }
		
	}
	


