package com.example1.practice1.domain;

import java.sql.Date;

public class ProductDTO {
	
	private int productno;//상품번호
	private String productkind;//상품종류
	private String productimagefileName;//상품이미지이름
	private String productimagefileOriName;//상품이미지실제이름
	private String productimagefileUrl;//상품이미지url
	private String productname;//상품이름
	private int productprice;//상품가격
	private int productsalescnt;//상품개수
	private String productcontent;//상품내용
	private int productdiscount;//상품할인율
	private Date productregdate;//상품작성일자

	
	public ProductDTO() {}
	
	public int getProductno() {
		return productno;
	}
	public void setProductno(int productno) {
		this.productno = productno;
	}
	
	public String getProductkind() {
		return productkind;
	}
	public void setProductkind(String productkind) {
		this.productkind = productkind;
	}
	

	public String getProductimagefileName() {
		return productimagefileName;
	}
	public void setProductimagefileName(String productimagefileName) {
		this.productimagefileName = productimagefileName;
	}
	public String getProductimagefileOriName() {
		return productimagefileOriName;
	}
	public void setProductimagefileOriName(String productimagefileOriName) {
		this.productimagefileOriName = productimagefileOriName;
	}
	public String getProductimagefileUrl() {
		return productimagefileUrl;
	}
	public void setProductimagefileUrl(String productimagefileUrl) {
		this.productimagefileUrl = productimagefileUrl;
	}
	public String getProductname() {
		return productname;
	}
	public void setProductname(String productname) {
		this.productname = productname;
	}
	public int getProductprice() {
		return productprice;
	}
	public void setProductprice(int productprice) {
		this.productprice = productprice;
	}
	public int getProductsalescnt() {
		return productsalescnt;
	}
	public void setProductsalescnt(int productsalescnt) {
		this.productsalescnt = productsalescnt;
	}
	
	public String getProductcontent() {
		return productcontent;
	}

	public void setProductcontent(String productcontent) {
		this.productcontent = productcontent;
	}
	
	public int getProductdiscount() {
		return productdiscount;
	}

	public void setProductdiscount(int productdiscount) {
		this.productdiscount = productdiscount;
	}
	
	public Date getProductregdate() {
		return productregdate;
	}

	public void setProductregdate(Date productregdate) {
		this.productregdate = productregdate;
	}
	
	@Override
	public String toString() {
		return "ProductDTO [productno=" + productno + ", productkind=" + productkind + ", productimagefileName="
				+ productimagefileName + ", productimagefileOriName=" + productimagefileOriName
				+ ", productimagefileUrl=" + productimagefileUrl + ", productname=" + productname + ", productprice="
				+ productprice + ", productsalescnt=" + productsalescnt + ", productcontent=" + productcontent
				+ ", productdiscount=" + productdiscount + ", productregdate=" + productregdate + "]";
	}

	

	

	

	
	





	
	
	
	

}
