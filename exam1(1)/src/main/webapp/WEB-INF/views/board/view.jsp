<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>view.jsp</title>
</head>
<body>
<div class="container">
	<form class="form-horizontal" action="/board/view/${ABoardVO.b_no}" method="post">
		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-6">
				<h2 align="center">게시글 상세 정보</h2>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">제 목</label>
			<div class="col-sm-6">
			<input class="form-control" type="text" name="title" value="${vo.b_title}"/>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">작 성 자</label>
			<div class="col-sm-2">
				<input class="form-control" type="text" name="writer" value="${vo.b_writer}" readonly="readonly"/>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">내 용</label>
			<div class="col-sm-6">
				<textarea rows="10" cols="100" name="content">${vo.b_content}</textarea>
			</div>
		</div>
		<button type="button" onclick="location.href='/board/update/${vo.b_no}'">수정</button>
		<button type="button" onclick="location.href='/board/delete/${vo.b_no}'">삭제</button>
	</form>
</div>
</body>	
</html>