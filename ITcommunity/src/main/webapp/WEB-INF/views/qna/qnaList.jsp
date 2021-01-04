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
<title>qnaList.jsp</title>
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
	<h2 align="left">질문 글 리스트</h2>
		<c:if test="${member != null}">
			<button class="btn btn-primary" onclick="location.href='/qna/qnaInsert'">질문글쓰기</button>
		</c:if>
		<c:if test="${member == null}">
			
		</c:if>
	
	<table class="table table-hover table-bodered">
		<tr>
			<th>#번호</th>
				<th>제목</th>
				<th>작성자</th>
				<th>내용</th>
				<th>작성일시</th>
				
				
			<c:if test="${list.size() <= 0}">
			<tr>
				<td colspan="6" align="center">
				<strong>검색 결과가 없습니다!!</strong>
				</td>
			</tr>
		</c:if>
		<c:forEach var="qna" items="${list}">
			<tr>
				<td class="info" onclick="location.href='/qna/qnaDetail/${qna.boardNo}'">${qna.boardNo}</td>
				<td>${qna.qnasubject}</td>
				<td>${member.userId}</td>
				<td>${qna.qnacontent}</td>
				<td><fmt:formatDate value="${qna.qnaregdate}" pattern="yyyy년 MM월 dd일"/></td>
				
				
			</tr>
		</c:forEach>
	</table>
</div>	
	<ul class="pager justify-content-center">
		<c:if test="${pageMaker.prev}">
			<li class="page-item"><a href="/qna/qnaList${pageMaker.makeSearch(pageMaker.startPage-1)}">이전</a></li>
		</c:if>
		
		<c:forEach begin="${pageMaker.startPage}" end="${pageMaker.endPage}" var="idx">
			<li class="page-item"><a href="/qna/qnaList${pageMaker.makeSearch(idx)}">${idx}</a></li>
		</c:forEach>
		
		<c:if test="${pageMaker.next && pageMaker.endPage >0}">
			<li class="page-item"><a href="/qna/qnaList${pageMaker.makeSearch(pageMaker.endPage+1)}">다음</a></li>
		</c:if>
	</ul>

</body>
</html>
</layoutTag:layout>