package com.example1.practice1.domain;

public class Criteria {

	private int page; 		// 페이지
	private int perPageNum; //보여줄 게시글 페이지
	private int rowStart;	//첫번째 페이지
	private int rowEnd;		//끝페이지
	
	public Criteria() {
		this.page = 1;
		this.perPageNum = 4;
		
	}
	public void setPage(int page) {
		if(page <= 0) {
			this.page = 1;
			
		}else {
			this.page = page;
		}
		
	}
	public void setPerPageNum(int perPageNum) {
		if(perPageNum <= 0 || perPageNum > 100) {
			this.perPageNum = 3;
			return;
		}
		this.perPageNum = perPageNum;
	}
		public int getPage() {
			return page;
		}
		
		public int getPageStart() {
			return (this.page - 1) * perPageNum;
		}
		
		public int getPerPageNum() {
			return this.perPageNum;
		}
		
		public int getRowStart() {
			rowStart = ((page - 1) * perPageNum) + 1;
			return rowStart;
		}
		
		public int getRowEnd() {
			rowEnd = rowStart + perPageNum - 1;
			return rowEnd;
		}

		@Override
		public String toString() {
			return "Criteria [page=" + page + ", perPageNum=" + perPageNum + ", rowStart=" + rowStart + ", rowEnd=" + rowEnd
					+ "]";
		}
		
		
	}
