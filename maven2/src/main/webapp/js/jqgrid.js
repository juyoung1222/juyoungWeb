//paging start
var customPageInfo = ""; // 페이지 정보를 나타낼 것인지 / boolean / 생략시 false
var customPageInfoType = ""; // 페이지 정보의 종류
var pageCount = 10; // 한 페이지에 보여줄 페이지수 (ex: 값이 5 면 << |< 1 2 3 4 5 >| >> ) 이런식으로 표시

function initPage(gridId, pagerId, pI, pit, formId) {
	// gridId, pagerId, pI : 페이지 정보를 나타낼 것인지 / boolean / 생략시 false, pit : TOT = 총 페이지수 / 갯수 (현재
	// 페이지의 시작 레코드 ~ 현재 페이지의 마지막 레코드) <=== 기본값 <br/> || TOTP = 총 페이지수 / 갯수 <br/> || PSE = (현재
	// 페이지의 시작 레코드 ~ 현재 페이지의 마지막 레코드) <br/>
	if (pI == null || pI == "") {
		customPageInfo = false;
	} else {
		customPageInfo = true;
	}

	if (pit != "TOTP" && pit != "PSE") {
		customPageInfoType = "TOT";
	} else {
		customPageInfoType = pit;
	}

	// 현재 페이지
	var currentPage = $('#' + gridId).getGridParam('page');
	// 전체 리스트 수
	var totalSize = $('#' + gridId).getGridParam('records');
	// 그리드 데이터 전체의 페이지 수
	var totalPage = Math.ceil(totalSize / $('#' + gridId).getGridParam('rowNum'));
	// 전체 페이지 수를 한화면에 보여줄 페이지로 나눈다.
	var totalPageList = Math.ceil(totalPage / pageCount);
	// 페이지 리스트가 몇번째 리스트인지
	var pageList = Math.ceil(currentPage / pageCount);

	// 페이지 리스트가 1보다 작으면 1로 초기화
	if (pageList < 1)
		pageList = 1;
	// 페이지 리스트가 총 페이지 리스트보다 커지면 총 페이지 리스트로 설정
	if (pageList > totalPageList)
		pageList = totalPageList;
	// 시작 페이지
	var startPageList = ((pageList - 1) * pageCount) + 1;
	// 끝 페이지
	var endPageList = startPageList + pageCount - 1;

	// 시작 페이지와 끝페이지가 1보다 작으면 1로 설정
	// 끝 페이지가 마지막 페이지보다 클 경우 마지막 페이지값으로 설정
	if (startPageList < 1)
		startPageList = 1;
	if (endPageList > totalPage)
		endPageList = totalPage;
	if (endPageList < 1)
		endPageList = 1;

	// 페이징 DIV에 넣어줄 태그 생성변수
	var pageInner = "";

	// 페이지 리스트가 1이나 데이터가 없을 경우 (링크 빼고 흐린 이미지로 변경)
	if (pageList < 2) {
		pageInner += "<span class='customPageMoveBtn'><i class='fa fa-fast-backward'></i></span>";
		pageInner += "<span class='customPageMoveBtn'><i class='fa fa-step-backward'></i></span>";
	}

	// 이전 페이지 리스트가 있을 경우 (링크넣고 뚜렷한 이미지로 변경)
	if (pageList > 1) {
		var titleFirstPage = "첫 페이지로 이동";
		var titlePrePage = (startPageList - 10) + "페이지에서 " + (endPageList - 10) + "페이지까지 이동";

		pageInner += "<span class='customPageMoveBtn'><a class='first' href='javascript:firstPageOrSearch(\""
				+ gridId
				+ "\", \""
				+ formId
				+ "\");' title='"
				+ titleFirstPage
				+ "'><i class='fa fa-fast-backward faPointer'></i></a></span>";
		pageInner += "<span class='customPageMoveBtn'><a class='pre' href='javascript:prePage(\""
				+ gridId + "\", \"" + formId + "\");' title='" + titlePrePage
				+ "'><i class='fa fa-step-backward faPointer'></i></a></span>";
	}

	// 페이지 숫자를 찍으며 태그생성 (현재페이지는 강조태그)
	for (var i = startPageList; i <= endPageList; i++) {
		var titleGoPage = i + "페이지로 이동";

		if (i == currentPage) {
			pageInner = pageInner
					+ "<span class='customPageNumberBtn'><a href='javascript:goPage(\"" + gridId
					+ "\", \"" + formId + "\", " + (i) + ");' id='" + (i) + "' title='"
					+ titleGoPage + "'><strong>" + (i) + "</strong></a></span>";
		} else {
			pageInner = pageInner
					+ "<span class='customPageNumberBtn'><a href='javascript:goPage(\"" + gridId
					+ "\", \"" + formId + "\", " + (i) + ");' id='" + (i) + "' title='"
					+ titleGoPage + "'>" + (i) + "</a></span>";
		}
	}

	// 다음 페이지 리스트가 있을 경우
	if (totalPageList > pageList) {
		var titleNextPage = (startPageList + 10) + "페이지에서 " + (endPageList + 10) + "페이지까지 이동";
		var titleLastPage = "마지막 페이지로 이동";

		pageInner += "<span class='customPageMoveBtn'><a class='next' href='javascript:nextPage(\""
				+ gridId + "\", \"" + formId + "\");' title='" + titleNextPage
				+ "'><i class='fa fa-step-forward faPointer'></i></a></span>";
		pageInner += "<span class='customPageMoveBtn'><a class='last' href='javascript:lastPage(\""
				+ gridId + "\", \"" + formId + "\");' title='" + titleLastPage
				+ "'><i class='fa fa-fast-forward faPointer'></i></a></span>";
	}

	// 현재 페이지리스트가 마지막 페이지 리스트일 경우
	if (totalPageList == pageList) {
		pageInner += "<span class='customPageMoveBtn'><i class='fa fa-step-forward'></i></span>";
		pageInner += "<span class='customPageMoveBtn'><i class='fa fa-fast-forward'></i></span>";
	}

	// 페이지 정보 셋팅
	var pageInfoText = ""; // 페이지 정보를 담을 변수
	if (customPageInfo) {
		var base = parseInt($('#' + gridId).getGridParam('page'), 10) - 1;
		if (base < 0) {
			base = 0;
		}
		base = base * parseInt($('#' + gridId).getGridParam('rowNum'), 10);
		var from = base + 1;
		var to = base + $('#' + gridId).getGridParam('reccount');

		if (totalSize == 0) {
			pageInfoText = "표시할 데이터가 없습니다";
		} else {
			var totpTxt = "총 " + totalPage + " 페이지" + " / " + totalSize + " 개";
			var pseTxt = "( " + from + " ~ " + to + " )&nbsp;&nbsp;";
			var totTxt = totpTxt + " 중 " + pseTxt;
			if (customPageInfoType == "TOTP") {
				pageInfoText = totpTxt;
			} else if (customPageInfoType == "PSE") {
				pageInfoText = pseTxt;
			} else {
				//pageInfoText = totTxt;
				pageInfoText = "";
			}
		}
	}

	var table = "";
	table += "<table width='100%' height='32px;'>";
	table += "<tr>";
	table += "<td width='29%'>";
	table += "</td>";
	table += "<td align='center'>";
	table += pageInner;
	table += "</td>";
	table += "<td width='29%' align='right'>";
	table += customPageInfo ? pageInfoText + " " : "";
	table += "</td>";
	table += "</tr>";
	table += "</table>";

	// 페이징할 DIV태그에 우선 내용을 비우고 페이징 태그삽입
	$("#" + pagerId).html("");
	// 너비 조정
	var w = $('#' + gridId).width() + 18;
	$("#" + pagerId).width(w);
	// 페이징 html 추가
	$("#" + pagerId).append(table);
	// 페이징 클래스 추가
	$("#" + pagerId).addClass("customPaginateBar");
}

// 그리드 첫페이지로 이동 또는 검색
function firstPageOrSearch(gridId, formId) {
	var sendPage = 0;

	var page = (parseInt(sendPage) + 1);
	var paging = (parseInt(sendPage));
	var rows = (parseInt($("#" + gridId).getGridParam('rowNum')));

	$("#" + gridId).jqGrid('clearGridData');

	$("#" + gridId).jqGrid(
			'setGridParam',
			{
				postData : $("#" + formId).serialize() + "&page=" + page + "&paging=" + paging
						+ "&rows=" + rows,
			}).trigger("reloadGrid");
}

// 그리드 이전페이지 이동
function prePage(gridId, formId) {
	var currentPage = $("#" + gridId).getGridParam('page');

	currentPage -= pageCount;
	pageList = Math.ceil(currentPage / pageCount);
	var sendPage = (pageList - 1) * pageCount + pageCount;

	var page = (parseInt(sendPage));
	var paging = (parseInt(sendPage) - 1) * parseInt($("#" + gridId).getGridParam('rowNum'));
	var rows = (parseInt($("#" + gridId).getGridParam('rowNum')));

	$("#" + gridId).jqGrid('clearGridData');

	$("#" + gridId).jqGrid(
			'setGridParam',
			{
				postData : $("#" + formId).serialize() + "&page=" + page + "&paging=" + paging
						+ "&rows=" + rows,
			}).trigger("reloadGrid");
}

// 그리드 다음페이지 이동
function nextPage(gridId, formId) {
	var currentPage = $("#" + gridId).getGridParam('page');

	currentPage += pageCount;
	pageList = Math.ceil(currentPage / pageCount);
	var sendPage = (pageList - 1) * pageCount + 1;

	var page = (parseInt(sendPage));
	var paging = (parseInt(sendPage) - 1) * parseInt($("#" + gridId).getGridParam('rowNum'));
	var rows = (parseInt($("#" + gridId).getGridParam('rowNum')));

	$("#" + gridId).jqGrid('clearGridData');

	$("#" + gridId).jqGrid(
			'setGridParam',
			{
				postData : $("#" + formId).serialize() + "&page=" + page + "&paging=" + paging
						+ "&rows=" + rows,
			}).trigger("reloadGrid");
}

// 그리드 마지막페이지 이동
function lastPage(gridId, formId) {
	var totalSize = jQuery('#' + gridId).getGridParam('records');
	var sendPage = Math.ceil(totalSize / $('#' + gridId).getGridParam('rowNum'));

	var page = (parseInt(sendPage));
	var paging = (parseInt(sendPage) - 1) * parseInt($("#" + gridId).getGridParam('rowNum'));
	var rows = (parseInt($("#" + gridId).getGridParam('rowNum')));

	$("#" + gridId).jqGrid('clearGridData');

	$("#" + gridId).jqGrid(
			'setGridParam',
			{
				postData : $("#" + formId).serialize() + "&page=" + page + "&paging=" + paging
						+ "&rows=" + rows,
			}).trigger("reloadGrid");
}

// 그리드 페이지 이동
function goPage(gridId, formId, num) {
	var sendPage = num;

	var page = (parseInt(sendPage));
	var paging = (parseInt(sendPage) - 1) * parseInt($("#" + gridId).getGridParam('rowNum'));
	var rows = (parseInt($("#" + gridId).getGridParam('rowNum')));

	$("#" + gridId).jqGrid('clearGridData');

	$("#" + gridId).jqGrid(
			'setGridParam',
			{
				postData : $("#" + formId).serialize() + "&page=" + page + "&paging=" + paging
						+ "&rows=" + rows,
			}).trigger("reloadGrid");
}
// paging end

// grid 삭제 버튼
function deleteBtnKeyVal(val) {
	return $("span.deleteBtn:eq(" + val + ")").attr("title");
}