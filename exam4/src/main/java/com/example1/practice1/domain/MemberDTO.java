package com.example1.practice1.domain;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberDTO {
			private String userId;		//사용자 아이디
			private String userPw;		//사용자 비밀번호
			private String userName;	//사용자 이름
			private String userBirth;	//사용자 생년월일
			private String address01;	//주소
			private String address02;	//상세주소
			private String tel1;		//전화번호(앞자리)
			private String tel2;		//전화번호(두번째)
			private String tel3;		//전화번호(세번째)
			private String userEmail;	//사용자 이메일
			
	
			public MemberDTO() {}


	
	

}
