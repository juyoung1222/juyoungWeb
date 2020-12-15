package com.example1.practice1.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDTO {
	
	
	private int 	productno;
	private String 	productimagefile;		//상품이미지파일
	private	String	productimageName;		// 저장될 파일명
	private	String	productimageOriName;	// 원래 파일명
	private	String	productimageUrl;		// 파일의 위치
	private String 	productname;			//상품이름
	private int		productprice;			//상품가격
	private int 	productsalescnt;		//상품개수
	private int 	productid;				//상품아이디
	
	
	
	
	
	
	
}
