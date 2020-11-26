<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt" %>
<%@ taglib tagdir="/WEB-INF/tags" 				   prefix="layoutTag" %>
<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<layoutTag:layout>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>boardUpdate.jsp</title>
</head>
<div class="container-fluid">
	<h2 align="left">게 시 글 작 성</h2>
	<form class="form-horizontal" action="/board/updateProc" method="post">
		<div class="form-group">
			<label for="subject">제 목</label>
			<input type="text" class="form-control" id="subject" name="subject" placeholder="제목을 입력하세요"/>
		</div>
		<div class="form-group">
			<label for="writer">작 성 자</label>
			<input type="text" class="form-control" id="writer" name="writer"readonly="readonly"/>
		</div>
		<div class="form-group">
			<label for="content">내 용</label>
			<textarea rows="4" cols="100" class="form-control" id="content" name="content" placeholder="내용을 입력하세요"></textarea>
			<input type="hidden" name="boardno" value="${boardno}"/>
			<button type="submit" class="btn btn-primary">수 정</button>
			
		</div>
		
	</form>
</div>
</body>
</html>
</layoutTag:layout>