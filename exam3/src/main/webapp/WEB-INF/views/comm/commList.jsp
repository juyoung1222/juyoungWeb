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
</style>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<link rel="stylesheet" href="//code.jquey.com/ui/1.12.1/themes/base/jquey-ui.css">
</head>
<body>
<div class="container-fluid">
	<h2 align="left">자 유 게 시 판</h2>
	<button class="btn btn-primary" onclick="location.href='/comm/commInsert'">글쓰기</button>
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
		<c:forEach var="comm" items="${list}">
			<tr>
				<td class="info" onclick="location.href='/comm/commDetail/${comm.cno}'">${comm.cno}</td>
				<td>${comm.subject}</td>
				<td>${comm.writer}</td>
				<td>${comm.content}</td>
				<td><fmt:formatDate value="${comm.reg_date}" pattern="yyyy년 MM월 dd일"/></td>
				<td class="warning" onclick="location.href='/comm/detailComment/${comm.cno}'">댓글</td>
			</tr>
		</c:forEach>
	</table>
	
</div>
</body>
</html>
</layoutTag:layout>