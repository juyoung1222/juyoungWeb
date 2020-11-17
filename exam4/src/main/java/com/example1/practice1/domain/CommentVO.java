package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class CommentVO {
	private int cno;//일련번호
	private int bno;//댓글이 달릴게시글의 일련번호
	private String subject; //게시글 제목
	private String content;//내용
	private String writer;//작성자
	private Date reg_date;//작성일시

}
