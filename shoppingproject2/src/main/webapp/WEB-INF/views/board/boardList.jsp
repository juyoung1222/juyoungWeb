<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" 	tagdir="/WEB-INF/tags" %>

<layoutTag:layout>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>boardList.jsp</title>
<style>
.navbar-inverse .narbar-nav > .active > a,
.navbar-inverse .narbar-nav > .active > a:focus,
.navbar-inverse .narbar-nav > .active > a:hover{

	color:rgb(255,255,255);
	background-color:red
}
	ul{list-style:none; float:center; padding:6px;}

	
</style>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<link rel="stylesheet" href="//code.jquey.com/ui/1.12.1/themes/base/jquey-ui.css">
</head>
<body>
<div class="container-fluid">
	<h2 align="left">자 유 게 시 판</h2>
	
	
	<button class="btn btn-primary" onclick="location.href='/board/boardInsert'">글쓰기</button>
	
	
	<table class="table table-hover table-bodered">
		<thead>
		
			<tr>
				<th>#번호</th>
				<th>제목</th>
				<th>작성자</th>
				<th>내용</th>
				<th>작성일시</th>
			
			</tr>
		</thead>
		<c:if test="${list.size() <= 0}">
			<tr>
				<td colspan="5" align="center">
				<strong>검색 결과가 없습니다!!</strong>
				</td>
			</tr>
		</c:if>
		
				<c:forEach var="board" items="${list}">
			<tr>
			
				
				<td class="info" onclick="location.href='/board/boardDetail/${board.boardno}'">${board.boardno}</td>
				<td>${board.subject}</td>
				<td>${board.writer}</td>
				<td>${board.content}</td>
				<td><fmt:formatDate value="${board.regdate}" pattern="yyyy년 MM월 dd일"/></td>
				
				<td class="warning" onclick="location.href='/board/detailComment/${board.boardno}'">댓글</td>
			</tr>
		</c:forEach>
	
	</table>
	
	<ul class="pagination justify-content-center">
		<c:if test="${pageMaker.prev}">
			<li class="page-item"><a href="/board/boardList${pageMaker.makeSearch(pageMaker.startPage-1)}">이전</a></li>
		</c:if>
		
		<c:forEach begin="${pageMaker.startPage}" end="${pageMaker.endPage}" var="idx">
			<li class="page-item"><a href="/board/boardList${pageMaker.makeSearch(idx)}">${idx}</a></li>
		</c:forEach>
		
		<c:if test="${pageMaker.next && pageMaker.endPage >0}">
			<li class="page-item"><a href="/board/boardList${pageMaker.makeSearch(pageMaker.endPage+1)}">다음</a></li>
		</c:if>
	</ul>
</div>
<!-- 검색 버튼 -->
	 <div class="search">
    <select name="searchType">
      <option value="n"<c:out value="${scri.searchType == null ? 'selected' : ''}"/>>-----</option>
      <option value="s"<c:out value="${scri.searchType eq 's' ? 'selected' : ''}"/>>제목</option>
      <option value="c"<c:out value="${scri.searchType eq 'c' ? 'selected' : ''}"/>>내용</option>
      <option value="w"<c:out value="${scri.searchType eq 'w' ? 'selected' : ''}"/>>작성자</option>
      <option value="sc"<c:out value="${scri.searchType eq 'sc' ? 'selected' : ''}"/>>제목+내용</option>
    </select>

    <input type="text" name="keyword" id="keywordInput" value="${scri.keyword}"/>

    <button id="searchBtn" type="button">검색</button>
    

  <script>

$(document).ready(function(){
        $('#searchBtn').click(function() {
       self.location = "/board/boardList" + '${pageMaker.makeQuery(1)}' + "&searchType=" + $("select option:selected").val() + "&keyword=" + encodeURIComponent($('#keywordInput').val());
        });
      }); 
</script>
<script>

</script>
<script>
$(document).ready(function(){
	$(".btn-primary").on("click",function(){
		
		if(${member == null}){
			alert("로그인을 하셔야 합니다.");
			location.href="/login/login";
			}
		else if(${member != null}){
			location.href="/board/boardInsert";
			}
		});
});
</script>
</div>
	</body>
</html>
</layoutTag:layout>