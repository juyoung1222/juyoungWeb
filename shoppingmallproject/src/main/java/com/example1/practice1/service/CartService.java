package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example1.practice1.controller.CartController;
import com.example1.practice1.domain.CartDTO;
import com.example1.practice1.mapper.CartMapper;

@Service("com.example1.practice1.service.CartService")
public class CartService {
	
	// 로깅을 위한 변수
	private static final Logger logger 
			= LoggerFactory.getLogger(CartController.class);
	
	@Resource(name="com.example1.practice1.mapper.CartMapper")
	CartMapper mapper;
	
	//장바구니 추가
	public int cartInsert(CartDTO cartDTO) throws Exception{
		logger.info("cartInsertService : " + cartDTO);
		
		return mapper.cartInsert(cartDTO);
	}
	
	//장바구니목록
	public List<CartDTO> cartList(String userId) throws Exception{
		logger.info("cartListService : " + userId);
		logger.info("cartuserid " + userId);
		
		return mapper.cartList(userId);
	}
	
	//장바구니금액합계
	public int sumMoney(String userId) throws Exception{
		logger.info("sumMoney : " +  userId);
		logger.info("cartuserid " + userId);
		
		return mapper.sumMoney(userId);
	}
	

	//장바구니삭제
	public int cartDelete(int cartno) throws Exception{
		logger.info("cartdelete : " + cartno);
		return mapper.cartDelete(cartno);
	}
	

}
