package com.bil.user.vo;

import java.sql.Date;

public class UserVO {

	private int userSeq   ;
	private String userId  ;
	private String pwd  ;
	private String userName  ;
	private Date regDt  ;
	public int getUserSeq() {
		return userSeq;
	}
	public void setUserSeq(int userSeq) {
		this.userSeq = userSeq;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Date getRegDt() {
		return regDt;
	}
	public void setRegDt(Date regDt) {
		this.regDt = regDt;
	}
	@Override
	public String toString() {
		return "UserVO [userSeq=" + userSeq + ", userId=" + userId + ", pwd=" + pwd + ", userName=" + userName
				+ ", regDt=" + regDt + "]";
	}
	

}
