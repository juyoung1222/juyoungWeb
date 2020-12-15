package com.example1.practice1.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.example1.practice1.domain.CartDTO;
import com.example1.practice1.service.CartService;

@Controller
@RequestMapping("/cart")
public class CartController {
	// 로깅을 위한 변수
	private static final Logger logger 
			= LoggerFactory.getLogger(CartController.class);
	
	@Resource(name = "com.example1.practice1.service.CartService")
	CartService service;
	
	//장바구니추가
	@RequestMapping(value="/cartInsert",method= {RequestMethod.GET,RequestMethod.POST})
	private String cartInsert(CartDTO cartDTO, Model model, HttpServletRequest request) throws Exception{
		
		logger.info("cartinsert : " + cartDTO);
		
		String cartuserid = request.getParameter("cartuserid");
		logger.info("cartuserid : " + cartuserid);
		
		model.addAttribute("cartinsert", service.cartInsert(cartDTO));
		
		return "redirect:/cart/cartList";
    	}//end - private String cartInsert(CartDTO cartDTO,HttpServletRequest request) throws Exception
	
	//장바구니리스트
	@RequestMapping(value="/cartList", method= {RequestMethod.GET, RequestMethod.POST})
	private ModelAndView cartList(CartDTO cartDTO,HttpServletRequest request, ModelAndView mav) throws Exception{
	
		
		String cartuserid = request.getParameter("cartuserid");
		logger.info("cartList... " + cartDTO);
		//logger.info("cartuserid " + cartuserid);
		
		Map<String,Object> map = new HashMap<String, Object>();
		List<CartDTO> list = service.cartList(cartuserid);//장바구니정보
		logger.info("cartlist...."  + list);
		
		int sumMoney = service.sumMoney(cartuserid);//장바구니 전체 금액 호출
		logger.info("sumMoney .." + cartuserid);
		
		//장바구니 전체 금액에 따라 배송비 구분
		//배송료(10만원 이상 =>무료, 미만 =>2500원)
		
		int fee = sumMoney >=100000 ? 0 : 2500;
		map.put("list", list); //장바구니정보를 map에 저장
		map.put("count", list.size());//장바구니 상품의 유무
		map.put("sumMoney", sumMoney);//장바구니 전체금액
		map.put("fee", fee);//배송금액
		map.put("allSum", sumMoney + fee);//주문상품전체금액
		mav.setViewName("/cart/cartList");//view(jsp)의 이름저장
		mav.addObject("map", map); //map 변수저장
		
		return mav;
	}//end - private ModelAndView cartList(HttpSession session, ModelAndView mav) throws Exception
	
	//삭제
		@RequestMapping("/cartDelete/{cartno}")
		private String cartDelete(@PathVariable int cartno, Model model) throws Exception {
			
			logger.info("delete" + cartno);
			service.cartDelete(cartno);
			return "redirect:/cart/cartList";
		}//end - private String cartDelete(@PathVariable int cartno, Model model) throws Exception
}//end - public class CartController
	
	



