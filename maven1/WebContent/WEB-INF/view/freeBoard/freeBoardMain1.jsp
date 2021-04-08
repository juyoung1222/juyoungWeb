<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>

	<div>
		<h1>자료실</h1>
	</div>
	<div style="width:650px;" align="right">
		<a href="./freeBoardInsert1.ino">글쓰기</a>
	</div>
	<hr style="width: 600px">
	
	<div id="listBoard">
		<c:forEach items="${freeBoardFileDto}" var="dto">
			<div style="width: 50px; float: left;">${dto.seq}</div>
			<div style="width: 50px; float: left;"><a href="./freeBoardDetail1.ino?num=${dto.seq}">${dto.title}</a></div>
			<div style="width: 50px; float: left;">${dto.name}</div>
			<div style="width:150px; float: left;"><fmt:formatDate value="${dto.regdate}" pattern="YYYY년 MM월 dd일" /></div>
			<div style="width: 50px; float: left;">${dto.boardimageName}</div>
			
			<hr style="width: 600px">
		</c:forEach>
	</div>
		<c:if test="${dto.size() <= 0}">
			<tr>
				<td colspan="5" align="center">
				<strong>검색 결과가 없습니다!!</strong>
				</td>
			</tr>
		</c:if>
		
		<form action="./main1.ino" method="get" style="float: center;">
	  		<div class="form-inline">
	    		<select id="searchType" class="form-control" name="searchType" >
					  <!--  <option value="t">제목</option>-->
					  <option value="t"<c:out value="${scri.searchType eq 't' ? 'selected' : ''}"/>>제목</option>
					  <!--  <option value="w">작성자</option>-->
					  <option value="w"<c:out value="${scri.searchType eq 'w' ? 'selected' : ''}"/>>작성자</option>
					  <!-- <option value="tw">제목+작성자</option> -->
					   <option value="tw"<c:out value="${scri.searchType eq 'tw' ? 'selected' : ''}"/>>제목+작성자</option>
				</select>
			<input type="text" class="form-control form-control-sm" name="keyword" id="keywordInput" />
	    	<button type="button"  id="formBtn" class="btn btn-default">검색</button>
	  		</div>
	  
		</form>
		<!--  
		<form style="float: center;">
			${pageResult }
		</form>
		-->
		<div class="container-fluid">
				<div class="pager justify-content-center">
				<c:if test="${pageMaker.prev}">
					<a href="./main1.ino${pageMaker.makeSearch(pageMaker.startPage-1)}">이전</a>
				</c:if>
				
				<c:forEach begin="${pageMaker.startPage}" end="${pageMaker.endPage}" var="idx">
					<a href="./main1.ino${pageMaker.makeSearch(idx)}">${idx}</a>
				</c:forEach>
				
				<c:if test="${pageMaker.next && pageMaker.endPage >0}">
					<a href="./main1.ino${pageMaker.makeSearch(pageMaker.endPage+1)}">다음</a>
				</c:if>
			</div>
	</div>
 <script type="text/javascript">
		alert("hihi");
    	$(document).ready(function(){
    		$("#formBtn").click(function(){
  				alert("hihi");
    			
  				location.href ="main1.ino${pageMaker.makeQuery(1)}" 
  				+ "&searchType=" + $("select option:selected").val() 
  				+ "&keyword=" + encodeURIComponent($('#keywordInput').val());
  				//location.href="main1.ino?search="+$("#keyword").val() + "&searchType="+$("#searchType").val();
    		});
    	});
</script>

	
	
	
</body>
</html>