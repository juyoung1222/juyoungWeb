package com.example1.practice1.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example1.practice1.domain.CartDTO;
import com.example1.practice1.domain.MemberDTO;
import com.example1.practice1.service.CartService;

@Controller
@RequestMapping("/cart")
public class CartController {
	
	
	private static final Logger logger = LoggerFactory.getLogger(CartController.class);
	@Resource(name="com.example1.practice1.service.CartService")
	CartService cartService;
	

	//카트 목록 보여주기
	@RequestMapping(value = "/list", method = { RequestMethod.GET, RequestMethod.POST })
	private String cartList(CartDTO cartDetailDTO, Model model) throws Exception {
		
		logger.info("cartlist : " + cartDetailDTO);
		model.addAttribute("list", cartService.cartListService());
		return "/cart/list";
	}
	
	//카트에 담기
	
	@RequestMapping(value = "/insertCart", method = { RequestMethod.GET, RequestMethod.POST})
	//@RequestMapping(value = "/insertCart", method = RequestMethod.POST)
	private String insertCart(CartDTO cartDTO, Model model, HttpServletRequest request,HttpSession session) throws Exception {
		logger.info("insertCart()....");
		
		//CartDTO cartDTO = new CartDTO();
		
		//cartDTO.setCartuserid(cartuserid);
		logger.info("cartDTO : " + cartDTO);
		String cartuserid = request.getParameter("cartuserid");
		logger.info("cartuserid : " + cartuserid);
		
		////cartService.insertCart(cartDTO);
	
	
		
		model.addAttribute("inserCart", cartService.insertCart(cartDTO));
		

		return "redirect:/cart/list";
	}//end - private String insertCart(CartDTO cartDTO, Model model, HttpServletRequest request) throws Exception
	
	//삭제
	@RequestMapping("/cartDelete/{cartno}")
	private String cartDelete(@PathVariable int cartno, Model model) throws Exception {
		
		logger.info("delete" + cartno);
		cartService.cartDeleteService(cartno);
		return "redirect:/cart/list";
	}//end - private String cartDelete(@PathVariable int cartno, Model model) throws Exception
	
	
	
}



