package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class CartDTO {
	
	private int cartno;//장바구니번호
	private int cartproductid;//장바구니상품id
	private Date cartdate;//장바구니날짜
	private String cartuserid;//장바구니사용자id
	private int cartamount;//장바구니수량

}
