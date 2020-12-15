package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardDTO {
	private int boardno;//게시글 일련번호
	private String subject;//게시글 제목
	private String writer;//게시글 작성자
	private String content;//게시글 내용
	private Date regdate;//게시글 작성일시
	private boolean newMark;//게시글 new 버튼
	private int boardhit;//조회수
	
	
	public BoardDTO() {}

	
	
	

}
