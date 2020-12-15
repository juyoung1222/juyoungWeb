package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDTO {
	
	private int productno;//상품번호
	private String productkind;//상품종류
	private String 	productimagefile;//상품이미지파일
	private String productimagefileName;//상품이미지이름
	private String productimagefileOriName;//상품이미지실제이름
	private String productimagefileUrl;//상품이미지url
	private String productname;//상품이름
	private int productprice;//상품가격
	private int productsalescnt;//상품개수
	private String productcontent;//상품내용
	private int productdiscount;//상품할인율
	private Date productregdate;//상품작성일자
	private int productcid;//상품카테고리아이디

	
	public ProductDTO() {}
	
	


	

	

	

	
	





	
	
	
	

}
