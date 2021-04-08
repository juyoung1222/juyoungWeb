package ino.web.freeBoard.dto;

public class Paging {
	// 페이지당 게시물 수
	private static final int PAGE_SIZE = 10;
	// 화면당 페이지 수
	private static final int BLOCK_SIZE = 10;

	private int totalCount; // 전체게시물 개수
	private int totalPage; // 전체페이지 개수
	private int curPage;
	private int nextPage;
	private int prevPage;
	private int curBlock;
	private int nextBlock;
	private int prevBlock;
	private int totalBlock;
	
	private int pageBegin;
	private int pageEnd;

	private int blockBegin;
	private int blockEnd;

	public Paging(int totalCount, int curPage) {
		curBlock = 1; // 현재 페이지 블록 번호
		this.curPage = curPage; // 현재 페이지 설정
		setTotalPageCount(totalCount); // 전체 페이지 개수
		setPageRange();
		setTotalBlock(); // 전체 페이지 블록 갯수 계산
		setBlockRange(); // 페이지 블록의 시작, 끝 번호 계산

	}

	private void setBlockRange() {
		// 현재 페이지가 몇번째 블록에 속하는지 계산
		curBlock = (int) Math.ceil((curPage - 1) / BLOCK_SIZE) + 1;
		// 현재 페이지 블록의 시작, 끝 번호 계산
		blockBegin = (curBlock - 1) * BLOCK_SIZE + 1;
		// 페이지 블록의 끝번호
		blockEnd = blockBegin + BLOCK_SIZE - 1;
		// 마지막 블록이 범위를 초과하지 않도록 계산
		if (blockEnd > totalPage) {
			blockEnd = totalPage;
		}
		// 이전을 눌렀을 때 이동할 페이지 번호
		prevPage = (curPage == 1) ? 1 : (curBlock-1) * BLOCK_SIZE;
		// 다음을 눌렀을 때 이동할 페이지 번호
		nextPage = curBlock > totalBlock ? (curBlock * BLOCK_SIZE) : (curBlock * BLOCK_SIZE) + 1;
		if (nextPage >= totalPage) {
			nextPage = totalPage;
		}
	}

	private void setPageRange() {

		// 시작번호 = (현재페이지 - 1) * 페이지당 게시물 수 + 1
		pageBegin = (curPage - 1) * PAGE_SIZE + 1;
		// 끝번호 = 시작번호 + 페이지당 게시물 수 - 1
		pageEnd = pageBegin + PAGE_SIZE - 1;
	}

	private void setTotalPageCount(int totalCount) {
		// ceil(올림처리)
		totalPage = (int) Math.ceil(totalCount * 1.0 / PAGE_SIZE);
	}
	
	public int getTotalBlock() {
		return totalBlock;
	}

	public void setTotalBlock() {
		// 전체 페이지 개수 / 10
		// 91 / 10 => 9.1 => 10개
		totalBlock = (int) Math.ceil(totalPage / BLOCK_SIZE);
	}
	
	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public int getNextPage() {
		return nextPage;
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}

	public int getPrevPage() {
		return prevPage;
	}

	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}

	public int getCurBlock() {
		return curBlock;
	}

	public void setCurBlock(int curBlock) {
		this.curBlock = curBlock;
	}

	public int getNextBlock() {
		return nextBlock;
	}

	public void setNextBlock(int nextBlock) {
		this.nextBlock = nextBlock;
	}

	public int getPrevBlock() {
		return prevBlock;
	}

	public void setPrevBlock(int prevBlock) {
		this.prevBlock = prevBlock;
	}

	public int getPageBegin() {
		return pageBegin;
	}

	public void setPageBegin(int pageBegin) {
		this.pageBegin = pageBegin;
	}

	public int getPageEnd() {
		return pageEnd;
	}

	public void setPageEnd(int pageEnd) {
		this.pageEnd = pageEnd;
	}

	public int getBlockBegin() {
		return blockBegin;
	}

	public void setBlockBegin(int blockBegin) {
		this.blockBegin = blockBegin;
	}

	public int getBlockEnd() {
		return blockEnd;
	}

	public void setBlockEnd(int blockEnd) {
		this.blockEnd = blockEnd;
	}

	public static int getPageSize() {
		return PAGE_SIZE;
	}

	public static int getBlockSize() {
		return BLOCK_SIZE;
	}
}
