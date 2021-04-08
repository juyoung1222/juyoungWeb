package ino.web.freeBoard.dto;

public class Pagination {
	private int page;
	private int endPage;
	private int start;
	private int end;
	private int pageSize = 10;
	private int blockSize = 5;
	private String url;
	
	//private String search;
	private String searchType;
	
	public Pagination() {}
	
	public Pagination(int page, int totalCount, String url,String searchType) {
		this.setPage(page);
		this.setEndPage(totalCount);
		this.setUrl(url);
	}
	
	public void setPage(int page) {
		this.page = page > 0 ? page : 1;
	}
	
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
	public void setBlockSize(int blockSize) {
		this.blockSize = blockSize;
	}
	
	public void setEndPage(int totalCount) {
		this.endPage = (int) Math.ceil((double) totalCount / this.pageSize);
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
	
	private int makeStart(int target, int size) {
		return (target - 1) * size + 1;
	}
	
	private int makeEnd(int target, int size) {
		return target * size;
	}
	
	public String getPagination() {
		StringBuffer buffer = this.makeCss(new StringBuffer());
		
		buffer.append("<div class=\"paging\">");
		
		if(this.page != 1){
			buffer.append("<span><a href=\"" + this.url + "?page=" + 1  +"\"><<</a></span>");
		}
		
		if(this.getBlockStart() > 1) {
			buffer.append("<span><a href=\"" + this.url + "?page=" + this.getBlockPrev() +"\"><</a></span>");
		}
		
		for(int i = this.getBlockStart(); i <= this.getBlockEnd(); i++) {
			if(page == i)
				buffer.append("<span>" + i + "</span>");
			else
				buffer.append("<span><a href=\"" + this.url + "?page=" + i + "&search=" + "\">" + i + "</a></span>");
		}
		
		if(this.getBlockEnd() < endPage) {
			buffer.append("<span><a href=\"" + this.url + "?page=" + this.getBlockNext()+ "&search=" +  "\">></a></span>");
		}
		
		if(this.page != endPage){
			buffer.append("<span><a href=\"" + this.url + "?page=" + this.endPage + "&search=" + "\">>></a></span>");
		}
		
		this.getStart();
		this.getEnd();
		
		buffer.append("</div>");
		return buffer.toString();
	}
	
	private StringBuffer makeCss(StringBuffer buffer) {
		buffer.append("<style>")
				.append(".paging {")
				.append("	display: block;")
				.append("	width: 100%;")
				.append("	text-align: center;")
				.append("}")
				.append(".paging > span:not(:last-child) {")
				.append("	margin-right: 5px;")
				.append("}")
				.append(".paging > span {")
				.append("	display: inline-block;")
				.append("	width: 25px;")
				.append("	height: 25px;")
				.append("	border-radius: 2px;")
				.append("	background-color: #03A9F4;")
				.append("	color : #fff;")
				.append("	font-size: 13px;")
				.append("	line-height: 24px;")
				.append("}")
				.append(".paging > span:hover > a {")
				.append("	border-radius: 2px;")
				.append("	background-color: #03A9F4;")
				.append("	color: #fff;")
				.append("}")
				.append(".paging > span > a {")
				.append("	display : inline-block;")
				.append("	width : 100%;")
				.append("	height : 100%;")
				.append("	border-radius: 2px;")
				.append("	cursor : pointer;")
				.append("	text-decoration : none;")
				.append("	background-color: #fff;")
				.append("	color : #8e8e8e;")
				.append("}")
				.append("</style>");
		return buffer;
	}
	
	public int getStart() {
		return this.makeStart(this.page, this.pageSize);
	}
	
	public int getEnd() {
		return this.makeEnd(this.page, this.pageSize);
	}
	
	private int getBlockGroup() {
		return (int) Math.ceil((double) this.page / this.blockSize);
	}
	
	private int getBlockStart() {
		return this.makeStart(this.getBlockGroup(), this.blockSize);
	}
	
	private int getBlockEnd() {
		int blockEnd = this.makeEnd(this.getBlockGroup(), this.blockSize);
		return blockEnd > this.endPage ? this.endPage : blockEnd;
	}
	
	private int getBlockPrev() {
		return this.getBlockStart() - 1;
	}
	
	private int getBlockNext() {
		return this.getBlockEnd() + 1;
	}

//	public String getSearch() {
//		return search;
//	}
//
//	public void setSearch(String search) {
//		this.search = search;
//	}
	
	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	@Override
	public String toString() {
		return "Pagination [page=" + page + ", endPage=" + endPage + ", start="
				+ start + ", end=" + end + ", pageSize=" + pageSize
				+ ", blockSize=" + blockSize + ", url=" + url + ", "
						 + ", searchType=" + searchType + "]";
	}

}