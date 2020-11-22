package com.example1.practice1.domain;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberVO {
	private String userId;
	private String userPw;
	private String userName;
	private String gender;
	private String userBirth;
	private String address01;
	private String address02;
	private String tel1;
	private String tel2;
	private String tel3;
	private String userEmail;
	private Timestamp reg_date;
	
	public MemberVO() {}
	

}
