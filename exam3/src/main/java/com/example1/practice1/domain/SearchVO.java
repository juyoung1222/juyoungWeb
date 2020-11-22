package com.example1.practice1.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchVO extends PageVO{
	
	private String keyword;
	private String condition;
	
	public SearchVO() {
		this.keyword = "";
		this.condition = "";
		
		
	}

}
