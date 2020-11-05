<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>join.jsp</title>
</head>
<body>
	<div class="container">
		<form action="/logon/list" method="post">
		<div class="form-group">
			<label>아이디</label>
			<input type="text" name="uid" id="uid" placeholder="id입력">
		</div>
		<div class="form-group">
			<label>비밀번호</label>
			<input type="password" name="upw" id="upw" placeholder="pw입력">
		</div>
		<button type="submit">로그인</button>
		</form>
	</div>
</body>
</html>