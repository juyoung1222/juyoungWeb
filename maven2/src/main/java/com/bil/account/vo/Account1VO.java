package com.bil.account.vo;

import java.util.Date;

import egovframework.example.sample.service.SampleDefaultVO;

public class Account1VO extends SampleDefaultVO{
	
	private int account_seq;
	private String profit_cost;
	private String big_group;
	private String middle_group;
	private String small_group;
	private String detail_group;
	private String comments;
	private int transaction_money;
	private Date transaction_date;
	//private String writer;
	private Date reg_date;
	public int getAccount_seq() {
		return account_seq;
	}
	public void setAccount_seq(int account_seq) {
		this.account_seq = account_seq;
	}
	public String getProfit_cost() {
		return profit_cost;
	}
	public void setProfit_cost(String profit_cost) {
		this.profit_cost = profit_cost;
	}
	public String getBig_group() {
		return big_group;
	}
	public void setBig_group(String big_group) {
		this.big_group = big_group;
	}
	public String getMiddle_group() {
		return middle_group;
	}
	public void setMiddle_group(String middle_group) {
		this.middle_group = middle_group;
	}
	public String getSmall_group() {
		return small_group;
	}
	public void setSmall_group(String small_group) {
		this.small_group = small_group;
	}
	public String getDetail_group() {
		return detail_group;
	}
	public void setDetail_group(String detail_group) {
		this.detail_group = detail_group;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public int getTransaction_money() {
		return transaction_money;
	}
	public void setTransaction_money(int transaction_money) {
		this.transaction_money = transaction_money;
	}
	public Date getTransaction_date() {
		return transaction_date;
	}
	public void setTransaction_date(Date transaction_date) {
		this.transaction_date = transaction_date;
	}
//	public String getWriter() {
//		return writer;
//	}
//	public void setWriter(String writer) {
//		this.writer = writer;
//	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	@Override
	public String toString() {
		return "Account1VO [account_seq=" + account_seq + ", profit_cost=" + profit_cost + ", big_group=" + big_group
				+ ", middle_group=" + middle_group + ", small_group=" + small_group + ", detail_group=" + detail_group
				+ ", comments=" + comments + ", transaction_money=" + transaction_money + ", transaction_date="
				+ transaction_date + ", reg_date=" + reg_date + "]";
	}

	
	
}
