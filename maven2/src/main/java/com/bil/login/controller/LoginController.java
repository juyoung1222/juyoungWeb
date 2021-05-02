package com.bil.login.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.bil.common.service.CommonService;
import com.bil.login.service.LoginService;
import com.bil.user.service.UserService;
import com.bil.user.vo.UserVO;
import com.bil.util.CommUtils;


@Controller
public class LoginController {

	@Resource
	private LoginService loginService;
	
	@Resource(name = "jsonView")
	private MappingJackson2JsonView jsonView;

	@Resource(name="commonService")
	private CommonService commonService;

	@RequestMapping(value="/login/login.do")
	public String loginview(HttpServletRequest request ) {

		return "/login/login";
	}
	
	@RequestMapping(value="/login/login.do", method=RequestMethod.POST)
	private String postLoginView(UserVO userVO, HttpServletRequest req, RedirectAttributes rttr,Model model) throws Exception{
		System.out.println(userVO);
		
		HttpSession session = req.getSession();
		
		UserVO login = loginService.login(userVO);
		
		if(login == null) {
			session.setAttribute("user", null);
			model.addAttribute("msg", false);
		}else {
			session.setAttribute("user", login);
		}
		return "/account/accountList";
	}
	
	
	@RequestMapping(value="/login/idCkedAjax.do")
	public ModelAndView idCkedAjax(HttpServletRequest request ) throws Exception {
		Map<String, Object> inOutMap  = CommUtils.getFormParam(request);



		return new ModelAndView(jsonView, inOutMap);
	}
	
	@RequestMapping(value="/login/logout.do")
	public String getLogout(HttpSession session) throws Exception{
		session.invalidate();
		
		return "redirect:/login/login.do";
	}



}// end of class
