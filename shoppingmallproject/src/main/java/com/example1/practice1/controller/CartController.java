package com.example1.practice1.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
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
	private String cartInsert(@ModelAttribute CartDTO cartDTO,HttpSession session) throws Exception{
		
		logger.info("cartinsert : " + cartDTO);
		String cartuserid = (String)session.getAttribute("cartuserid");
		
		cartDTO.setCartuserid(cartuserid);
		
		if (cartuserid != null) {
           return "redirect:/login/login";
			}
			cartDTO.setCartuserid(cartuserid);
        	service.cartInsert(cartDTO);
			
        	return "redirect:/cart/cartList";
    	}//end - private String cartInsert(@ModelAttribute CartDTO cartDTO,HttpSession session) throws Exception
	
	//장바구니리스트
	@RequestMapping("/cartList")
	private ModelAndView cartList(ModelAndView mav , HttpSession session) throws Exception{
		
		logger.info("cartList......");
		//장바구니목록, 금액합계, 배송료, 리스트의 사이즈(주문아이템갯수등)
		//dto로 표현되지않는 여러자지 정보를 담아 뷰로 넘겨야 하므로 HashMap사용
		Map<String, Object> map = new HashMap<String, Object>();
		
		String cartuserid = (String) session.getAttribute("cartuserid");
		
			if(cartuserid != null) {//로그인한 상태라면
				List<CartDTO> list = service.cartList(cartuserid);//서비스단에서 장바구니목록 가져옴.
				int sumMoney = service.sumMoney(cartuserid);//금액합계를 가져오고
				int fee = sumMoney >= 30000 ? 0 : 2500; //금액합계에 대한 배송료를 계산하고
					//금액,배송비,총액,리스트사이즈,장바구니목록 각 값들을 map에 넣어준다.
					map.put("sumMoney", sumMoney);
						map.put("fee", fee);
					map.put("sum", fee + sumMoney);
						map.put("list", list);
					map.put("count", list.size());
					
					mav.setViewName("/cart/cartList");//장바구니리스트로 뷰 설정
						mav.addObject("map", map);
						//ModelAndView객체에 map을 담고 리스트 뷰를 설정해준뒤 포워딩
						
						return mav;
			}else {
				//로그인하지않은상태이면 로그인페이지로 
				mav.setViewName("/login/login");
					return mav;
				}
			}// end - private ModelAndView cartList(ModelAndView mav , HttpSession session) throws Exception
	
}


