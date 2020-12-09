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
<title>Insert title here</title>
</head>
<body>
<div class="container-fluid">
	<form class="form-horizontal">
	<div class="form-group">
	<div class="col-sm-2"></div>
	<div class="col-sm-6">
		<h2><span class="glyphicon glyphicon-file">게시글 상세 정보</span></h2>
		<button type="button" class="btn btn-primary" onclick="location.href='/board/boardList'">목록으로</button>
		<button type="button" class="btn btn-success" onclick="location.href='/board/boardUpdate/${detail.boardno}'">수정</button>
		<button type="button" class="btn btn-danger" onclick="location.href='/board/boardDelete/${detail.boardno}'">삭제</button>
	
	</div>
</div>
<div class="form-group">
	<label class="control-label col-sm-2">제 목</label>
	<div class="col-sm-6">
	<input type="text" class="form-control" id="subject" name="subject" value="${detail.subject}" readonly="readonly"/>
	</div>
</div>	
<div class="form-group">
	<label class="control-label col-sm-2">작 성 자</label>
	<div class="col-sm-6">
	<input type="text" class="form-control" id="writer" name="writer" value="${detail.writer}" readonly="readonly"/>
	</div>
</div>
<div class="form-group">
	<label class="control-label col-sm-2">내용</label>
	<div class="col-sm-6">
		<input type="text" class="form-control" id="content" name="content" value="${detail.content}" readonly="readonly"/>
	</div>
</div>
</form>	

</div>	

</body>
</html>
</layoutTag:layout>