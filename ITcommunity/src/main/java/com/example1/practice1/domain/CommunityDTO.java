package com.example1.practice1.domain;



import java.sql.Date;

import lombok.Data;

@Data
public class CommunityDTO {
	
	private int boardNo;//게시판번호
	private String boardchoice;//공지글,비밀글선택
	private String subject;//게시판제목
	private String writer;//게시판작성자
	private String content;//게시판내용
	private Date regdate;//게시판작성일자
	private int boardhit;//조회수
	private int boardlike;//좋아요

}
