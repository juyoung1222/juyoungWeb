package ino.web.freeBoard.dto;

import org.springframework.web.util.UriComponentsBuilder;

public class Criteria {
	
	private int page; 		// 페이지
	private int perPageNum; //보여줄 게시글 페이지
	private int rowStart ;	//첫번째 페이지
	private int rowEnd;		//끝페이지
	private String listLink;
	
	
	public Criteria() {
		this.page =  1;
		this.perPageNum = 6;
		
	}
	public void setPage(int page) {
		if(page <= 0) {
			this.page = 1;
			
		}else {
			this.page = page + 1;
		}
		
	}
	public void setPerPageNum(int pageCount) {
		//if(perPageNum <= 0 || perPageNum > 100) {
			//this.perPageNum = 3;
			//return;
		//}
		//this.perPageNum = perPageNum;
		int cnt = this.perPageNum;
		if(pageCount != cnt) {
			this.perPageNum = cnt;
		}else {
			this.perPageNum = pageCount;
		}
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
			rowStart = ((page - 1) * perPageNum) ;
			return rowStart;
		}
		
		public int getRowEnd() {
			rowEnd = rowStart + perPageNum - 1;
			return rowEnd;
		}
	
		
		public String getListLink() {
			UriComponentsBuilder builder = UriComponentsBuilder.fromPath("")
				.queryParam("perPageNum", this.perPageNum)
				.queryParam("page", this.page);
				return builder.toUriString();
			
		}
		public void setListLink(String listLink) {
			this.listLink = listLink;
		}
		@Override
		public String toString() {
			return "Criteria [page=" + page + ", perPageNum=" + perPageNum + ", rowStart=" + rowStart + ", rowEnd="
					+ rowEnd + ", listLink=" + listLink + "]";
		}
		
		
		

		
}
