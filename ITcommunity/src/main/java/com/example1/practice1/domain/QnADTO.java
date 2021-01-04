package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class QnADTO {
	
	private int boardNo;//qna번호
	private String qnaimagefile;//qna이미지파일
	private String qnaimagename;//qna이미지명
	private String qnaimageoriname;//qna실제이미지명
	private String qnaimageurl;//qnaurl
	private int qnacid;//qna카테고리아이디
	private String qnasubject;//질문제목
	private String qnacontent;//질문내용
	private Date qnaregdate;//작성일시

}
