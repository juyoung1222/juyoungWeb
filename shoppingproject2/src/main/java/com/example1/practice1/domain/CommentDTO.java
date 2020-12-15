package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentDTO {
	private int replyno;//댓글번호
	private String replywriterid;//댓글작성자아이디
	private int replycontentid;//게시글번호
	private String replyip;//로컬호스트문자열
	private Date replydate;//작성날짜
	private String replytext;//댓글내용
	
	public CommentDTO() {}

	
	

}
