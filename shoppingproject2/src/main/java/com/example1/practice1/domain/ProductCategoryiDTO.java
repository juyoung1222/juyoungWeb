package com.example1.practice1.domain;

public class ProductCategoryiDTO {
	private int productcategoryidid;
	private String productcategoryname;
	
	public int getProductcategoryidid() {
		return productcategoryidid;
	}
	
	public void setProductcategoryidid(int productcategoryidid) {
		this.productcategoryidid = productcategoryidid;
	}
	public String getProductcategoryname() {
		return productcategoryname;
	}
	public void setProductcategoryname(String productcategoryname) {
		this.productcategoryname = productcategoryname;
	}

	@Override
	public String toString() {
		return "ProductCategoryiDTO [productcategoryidid=" + productcategoryidid + ", productcategoryname="
				+ productcategoryname + "]";
	}
	
	
	
}
