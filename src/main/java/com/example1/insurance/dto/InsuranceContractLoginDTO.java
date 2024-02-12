package com.example1.insurance.dto;

public class InsuranceContractLoginDTO {
	
	private String user_id;
	private String user_pw;
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_pw() {
		return user_pw;
	}
	public void setUser_pw(String user_pw) {
		this.user_pw = user_pw;
	}
	
	@Override
	public String toString() {
		return "InsuranceContractLoginDTO [user_id=" + user_id + ", user_pw=" + user_pw + "]";
	}

}
