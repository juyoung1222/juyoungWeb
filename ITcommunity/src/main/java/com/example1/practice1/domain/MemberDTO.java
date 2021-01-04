package com.example1.practice1.domain;

import lombok.Data;

@Data
public class MemberDTO {
	
	private String userId;//사용자아이디
	private String userPw;//사용자비밀번호
	private String userName;//사용자이름
	private String gender;//성별
	private String userBirth;//생년월일
	private String address01;//주소
	private String address02;//상세주소
	private String tel1;//전화번호첫번째
	private String tel2;//전화번호두번째
	private String tel3;//전화번호세번째
	private String userEmail;//이메일

}
