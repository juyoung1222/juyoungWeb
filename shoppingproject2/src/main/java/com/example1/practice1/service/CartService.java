package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;


import com.example1.practice1.domain.CartDTO;
import com.example1.practice1.mapper.CartMapper;

@Service("com.example1.practice1.service.CartService")
public class CartService {

	
	@Resource(name="com.example1.practice1.mapper.CartMapper")
	CartMapper cartMapper;
	
	//게시글 목록 보기
	public List<CartDTO> cartListService() throws Exception {
		return cartMapper.cartList();
	}
	
	//장바구니 등록
		public int insertCart(CartDTO cartDTO ) throws Exception{
			
			return cartMapper.insertCart(cartDTO);
	}
	
	//삭제
	public int cartDeleteService(int cartno) throws Exception {
		return cartMapper.cartDelete(cartno);
	}
	

	

	
}
