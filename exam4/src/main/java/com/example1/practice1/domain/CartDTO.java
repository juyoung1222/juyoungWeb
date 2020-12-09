package com.example1.practice1.domain;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartDTO {
		
			int		cartno;
			int		cartproductid;
			Date	cartdate;
			String	cartuserid;
			String	productimagefile;
			String	productimageName;
			String	productimageOriName;
			String	productimageUrl;
			String	productname;
			int		productprice;
			int		productsalescnt;

}


