package com.example1.practice1.domain;

import java.sql.Date;

import lombok.Data;


public class CommentDTO {
	private int replyno;//댓글번호
	private String replywriterid;//댓글작성자아이디
	private int replycontentid;//게시글번호
	private String replyip;//로컬호스트문자열
	private Date replydate;//작성날짜
	private String replytext;//댓글내용
	
	public CommentDTO() {}

	public int getReplyno() {
		return replyno;
	}

	public void setReplyno(int replyno) {
		this.replyno = replyno;
	}

	public String getReplywriterid() {
		return replywriterid;
	}

	public void setReplywriterid(String replywriterid) {
		this.replywriterid = replywriterid;
	}

	public int getReplycontentid() {
		return replycontentid;
	}

	public void setReplycontentid(int replycontentid) {
		this.replycontentid = replycontentid;
	}

	public String getReplyip() {
		return replyip;
	}

	public void setReplyip(String replyip) {
		this.replyip = replyip;
	}

	public Date getReplydate() {
		return replydate;
	}

	public void setReplydate(Date replydate) {
		this.replydate = replydate;
	}

	public String getReplytext() {
		return replytext;
	}

	public void setReplytext(String replytext) {
		this.replytext = replytext;
	}

	@Override
	public String toString() {
		return "CommentDTO [replyno=" + replyno + ", replywriterid=" + replywriterid + ", replycontentid="
				+ replycontentid + ", replyip=" + replyip + ", replydate=" + replydate + ", replytext=" + replytext
				+ "]";
	}
	
	
	

}
