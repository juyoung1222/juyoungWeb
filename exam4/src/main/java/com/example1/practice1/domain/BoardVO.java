package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Data;


@Data
public class BoardVO {
	
	private int bno;//게시글 일련번호
	private String subject;//게시글 제목
	private String writer;//게시글 작성자
	private String content;//게시글 내용
	private Date reg_date;//게시글 작성일시
	//신규 게시물에 new마크를 붙일지 말지 결정하는 논리필드 선언.
	private boolean newMark;
	
	public BoardVO() {}
	
	public void setNewMark(boolean newMark) {
		this.newMark = newMark;
	}
	
	public boolean isNewMark() {
		return newMark;
	}

}
