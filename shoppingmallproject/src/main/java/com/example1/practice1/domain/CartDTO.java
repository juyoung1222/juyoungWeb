package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class CartDTO {
	
	int cartno;//장바구니번호
	int cartproductid;//장바구니상품id
	Date cartdate;//장바구니날짜
	String cartuserid;//장바구니사용자id
	int cartamount;//장바구니수량
	String productimagefile;
	String productimagefileName;
	String	productimagefileOriName;
	String productimagefileUrl;
	String productname;
	int productprice;
	int productsalescnt;
	int productdiscount;
	

}
