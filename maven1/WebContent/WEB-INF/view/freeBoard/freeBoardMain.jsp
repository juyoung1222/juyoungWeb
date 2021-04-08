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
<link rel="icon" type="image/png" href="http://example.com/myicon.png">



<title>Insert title here</title>
<style>
	ul{list-style:none; float:center; padding:6px;}
	
</style>

</head>
<body>

	<div>
		<h1>자유게시판 </h1>
	</div>
	<div style="width:650px;" align="right">
		<a href="./freeBoardInsert.ino">글쓰기 </a>
	</div>
	<hr style="width: 600px">
	
	<div id="listBoard">
		<c:forEach items="${freeBoardDto}" var="dto">
			<div style="width: 50px; float: left;">${dto.seq}</div>
			<div style="width: 300px; float: left;"><a href="./freeBoardDetail.ino?num=${dto.seq}">${dto.title}</a></div>
			<div style="width: 150px; float: left;">${dto.name}</div>
			<div style="width: 150px; float: left;"><fmt:formatDate value="${dto.regdate}" pattern="YYYY년 MM월 dd일" /></div>
			<hr style="width: 600px">
		</c:forEach>
	</div>
		<!-- 
		<c:if test="${freeBoardDto.size() <= 0}">
			<tr>
				<td colspan="5" align="center">
				<strong>검색 결과가 없습니다!!</strong>
				</td>
			</tr>
		</c:if>
		 -->
		
		<form action="./main.ino" method="get" style="float: center;" id="searchForm" >
	  		<div class = "form-group" >
	    		<select id="searchType" class="form-control" name="searchType" >
					  <!--  <option value="t">제목</option>-->
					  <option value="t"<c:out value="${scri.searchType eq 't' ? 'selected' : ''}"/>>제목</option>
					  <!--  <option value="w">작성자</option>-->
					  <option value="w"<c:out value="${scri.searchType eq 'w' ? 'selected' : ''}"/>>작성자</option>
					  <!-- <option value="tw">제목+작성자</option> -->
					   <option value="tw"<c:out value="${scri.searchType eq 'tw' ? 'selected' : ''}"/>>제목+작성자</option>
				</select>
			<input type="text" class="form-control form-control-sm" name="keyword" id="keywordInput" value="${scri.keyword}" />
	    	<button type="button" id="formBtn" class="btn btn-default">검색</button>
	  		</div>
	  
		</form>
		<!--  <form style="float: center;">
			${pageResult }
		</form>-->
		<div class="container-fluid">
				<div class="pager justify-content-center">
				<c:if test="${pageMaker.prev}">
					 <a href='<c:url value="./main.ino${pageMaker.makeSearch(pageMaker.startPage-1)}"/>'>이전</a></li>
					
				</c:if>
				
				<c:forEach begin="${pageMaker.startPage}" end="${pageMaker.endPage}" var="idx">
					<a href='<c:url value="./main.ino${pageMaker.makeSearch(idx)}"/>'>${idx}</a></li>
					
				</c:forEach>
				
				<c:if test="${pageMaker.next && pageMaker.endPage >0}">
					 <a href='<c:url value="./main.ino${pageMaker.makeSearch(pageMaker.endPage+1)}"/>'>다음</a></li>
					
				</c:if>
			</div>
	</div>
  <script type="text/javascript">
		alert("hihi");
    	$(document).ready(function(){
    		$("#formBtn").click(function(){
  				alert("hihi");
    			
  				location.href ="main.ino${pageMaker.makeQuery(1)}" 
  				+ "&searchType=" + $("select option:selected").val() 
  				+ "&keyword=" + encodeURIComponent($('#keywordInput').val());
  				//location.href="main1.ino?search="+$("#keyword").val() + "&searchType="+$("#searchType").val();
    		});
    	});
</script>

		
		
	
	
	
</body>
</html>