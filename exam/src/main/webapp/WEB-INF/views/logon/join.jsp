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
	<form action="/logon/join" method="post">
		<div class="form-group">
			<label>아이디</label>
			<input type="text" name="uid" id="uid" size="10" class="form-group" placeholder="id입력하세요">
		</div>
		<div class="form-group">
			<label>비밀번호</label>
			<input type="password" name="upw" id="upw" size="10" class="form-group" placeholder="pw입력하세요">
		</div>
		<div class="form-group">
			<label>이름</label>
			<input type="text" name="uname" id="uname" size="10" class="form-group" placeholder="이름입력하세요">
		</div>
		<div class="form-group">
			<label>이메일</label>
			<input type="text" name="uemail" id="uemail" size="10" class="form-group" placeholder="이메일입력하세요">
		</div>
		<button type="submit">회원가입</button>
	</form>
	
	</div>
</body>
</html>