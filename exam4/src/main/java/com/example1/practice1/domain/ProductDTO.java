package com.example1.practice1.domain;

public class ProductDTO {
	private 	int 		productno;

	private 	String 		productimagefile;
	private		String		productimageName;		// 저장될 파일명
	private		String		productimageOriName;	// 원래 파일명
	private		String		productimageUrl;		// 파일의 위치

	
	private 	String 		productname;
	private 	int			productprice;
	private 	int 		productsalescnt;
	private 	int 		productid;
	
	
	
	public int getProductid() {
		return productid;
	}
	public void setProductid(int productid) {
		this.productid = productid;
	}
	public String getProductimageName() {
		return productimageName;
	}
	public void setProductimageName(String productimageName) {
		this.productimageName = productimageName;
	}
	public String getProductimageOriName() {
		return productimageOriName;
	}
	public void setProductimageOriName(String productimageOriName) {
		this.productimageOriName = productimageOriName;
	}
	public String getProductimageUrl() {
		return productimageUrl;
	}
	public void setProductimageUrl(String productimageUrl) {
		this.productimageUrl = productimageUrl;
	}
	public int getProductno() {
		return productno;
	}
	public void setProductno(int productno) {
		this.productno = productno;
	}
	public String getProductimagefile() {
		return productimagefile;
	}
	public void setProductimagefile(String productimagefile) {
		this.productimagefile = productimagefile;
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
	
	@Override
	public String toString() {
		return "ProductDTO [productno=" + productno + ", productimagefile=" + productimagefile + ", productimageName="
				+ productimageName + ", productimageOriName=" + productimageOriName + ", productimageUrl="
				+ productimageUrl + ", productname=" + productname + ", productprice=" + productprice
				+ ", productsalescnt=" + productsalescnt + ", productid=" + productid + "]";
	}
	
	
	
	
	
	
}
