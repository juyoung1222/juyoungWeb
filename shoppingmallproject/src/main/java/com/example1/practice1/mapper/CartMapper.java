package com.example1.practice1.mapper;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.CartDTO;

@Repository("com.example1.practice1.mapper.CartMapper")
public interface CartMapper {
	
	//장바구니 추가
	public int cartInsert(CartDTO cartDTO) throws Exception;

	//장바구니 목록
	public List<CartDTO> cartList(String cartuserid) throws Exception;
	
	//장바구니 금액합계
	public int sumMoney(String cartuserid) throws Exception;
	
	//장바구니삭제
	public int cartDelete(int cartno) throws Exception;
}
