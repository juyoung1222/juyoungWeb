<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>list.jsp</title>
</head>
<body>
<div class="container">
<table border="1">

	
	<tr>
		<th>번호</th>
		<th>제목</th>
		<th>작성자</th>
		<th>내용</th>
	</tr>
	<c:forEach var="b" items="${list}">
	<tr>
		<td><a href="/board/view/${b.b_no}">${b.b_no}</a></td>
		<td>${b.b_title}</td>
		<td>${b.b_writer}</td>
		<td>${b.b_content}</td>
	</c:forEach>
</table>
</div>	
</body>
</html>