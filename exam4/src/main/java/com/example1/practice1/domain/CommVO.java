package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommVO {
	
	private int cno;//댓글 일련번호
	private int bno;//댓글이 달릴 게시글의 일련번호
	private String subject; //게시글 제목
	private String content;//댓글의 내용
	private String writer;//댓글 작성자
	private Date reg_date;//댓글 작성일시
	private boolean newMark;//신규게시물에 new마크를 붙일지 말지 결정하는 논리필드 선언

	public CommVO() {}
	
	

}
