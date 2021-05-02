package com.bil.account.vo;

import java.sql.Date;

public class AccountVO {
	
	private int code_seq;
	private String code;
	private String category;
	private String comKor;
	private String subCom;
	private String use_yn;
	private Date reg_dt;
	public int getCode_seq() {
		return code_seq;
	}
	public void setCode_seq(int code_seq) {
		this.code_seq = code_seq;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getComKor() {
		return comKor;
	}
	public void setComKor(String comKor) {
		this.comKor = comKor;
	}
	public String getSubCom() {
		return subCom;
	}
	public void setSubCom(String subCom) {
		this.subCom = subCom;
	}
	public String getUse_yn() {
		return use_yn;
	}
	public void setUse_yn(String use_yn) {
		this.use_yn = use_yn;
	}
	public Date getReg_dt() {
		return reg_dt;
	}
	public void setReg_dt(Date reg_dt) {
		this.reg_dt = reg_dt;
	}
	@Override
	public String toString() {
		return "AccountVO [code_seq=" + code_seq + ", code=" + code + ", category=" + category + ", comKor=" + comKor
				+ ", subCom=" + subCom + ", use_yn=" + use_yn + ", reg_dt=" + reg_dt + "]";
	}

	
}
