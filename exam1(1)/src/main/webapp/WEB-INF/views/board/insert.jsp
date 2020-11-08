<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>insert.jsp</title>
</head>
<body>
<h1 align="center">게 시 판 등 록</h1>
	<form action="/board/insert" method="post">
	<div class="container">
		<div class="form-group">
		<label>제 목</label>
		<input type="text" id="b_title" name="b_title" width="20" height="10" placeholder="제목을 입력하세요">
		</div>
	</div>
	<div class="form-group">
		<label>작성자</label>
		<input type="text" id="b_writer" name="b_writer" width="20" height="10" placeholder="작성자를 입력하세요">
	</div>
	<div class="form-group">
		<label>내용</label>
		<textarea rows="10" cols="100" id="b_content" name="b_content"  placeholder="게시판 내용"></textarea>
	</div>
	<button type="submit">등록</button>
</form>
	
</body>
</html>