package com.example1.practice1.domain;

public class PageCreator {
	private PageVO paging;
	private int articleTotalCount;//게시판의 총 게시물 수
	private int beginPage;//시작페이지번호
	private int endPage;//끝페이지번호
	private boolean prev;//이전버튼 활성화여부
	private boolean next;//다음버튼 활성화 여부
	
	//한 화면에 보여질 페이지수
	private final int displayPageNum = 5;
	
	//페이징 알고니즘을 수행할 메서드 선언
	private void calcDataOfPage() {
		//보정전 끝 페이지 구하기
		endPage = (int)Math.ceil(paging.getPage()/(double)displayPageNum) * displayPageNum;
		
		//시작 페이지 번호 구하기
		beginPage = (endPage - displayPageNum) +1;
		
		//현재 시작페이지가 1이라면 이전버튼 활성화여부를 false로 지정
		prev = (beginPage == 1) ? false : true;
		
		//마지막 페이지인지 여부 확인후 다음 버튼 비활성
		next = (articleTotalCount <= (endPage * paging.getCountPerPage())) ? false : true;
		
		//재보정 여부 판단하기
		if(!isNext()) {
			//끝 페이지 재보정하기
			endPage = (int)Math.ceil(articleTotalCount / (double)paging.getCountPerPage());
		}
		
		
	}

	public PageVO getPaging() {
		return paging;
	}

	public void setPaging(PageVO paging) {
		this.paging = paging;
	}

	public Integer getArticleTotalCount() {
		return articleTotalCount;
	}

	public void setArticleTotalCount(Integer articleTotalCount) {
		this.articleTotalCount = articleTotalCount;
		calcDataOfPage();
	}

	public Integer getBeginPage() {
		return beginPage;
	}

	public void setBeginPage(Integer beginPage) {
		this.beginPage = beginPage;
	}

	public Integer getEndPage() {
		return endPage;
	}

	public void setEndPage(Integer endPage) {
		this.endPage = endPage;
	}

	public boolean isPrev() {
		return prev;
	}

	public void setPrev(boolean prev) {
		this.prev = prev;
	}

	public boolean isNext() {
		return next;
	}

	public void setNext(boolean next) {
		this.next = next;
	}

	public Integer getDisplayPageNum() {
		return displayPageNum;
	}

	@Override
	public String toString() {
		return "PageCreator [paging=" + paging + ", articleTotalCount=" + articleTotalCount + ", beginPage=" + beginPage
				+ ", endPage=" + endPage + ", prev=" + prev + ", next=" + next + ", displayPageNum=" + displayPageNum
				+ "]";
	}
	
}