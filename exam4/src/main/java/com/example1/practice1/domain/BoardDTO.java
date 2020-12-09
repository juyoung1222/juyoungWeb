package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


public class BoardDTO {
	private int boardno;//게시글 일련번호
	private String subject;//게시글 제목
	private String writer;//게시글 작성자
	private String content;//게시글 내용
	private Date regdate;//게시글 작성일시
	private boolean newMark;//게시글 new 버튼
	private int boardhit;//조회수
	
	
	public BoardDTO() {}

	public int getBoardno() {
		return boardno;
	}

	public void setBoardno(int boardno) {
		this.boardno = boardno;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getRegdate() {
		return regdate;
	}

	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	
	public void setNewMark(boolean newMark) {
		this.newMark = newMark;
		
	}
	
	public boolean isNewMark() {
		
		
		return newMark;
	}

	public int getBoardhit() {
		return boardhit;
	}

	public void setBoardhit(int boardhit) {
		this.boardhit = boardhit;
	}
	

	@Override
	public String toString() {
		return "BoardDTO [boardno=" + boardno + ", subject=" + subject + ", writer=" + writer + ", content=" + content
				+ ", regdate=" + regdate + "]";
	}
	
	
	

}
