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
<title>proUpdate.jsp</title>
</head>
<body>		
<div class="container-fluid">
	<form class="form-horizontal" method="post" action="/member/proUpdate">
		<div class="form-group">
		<div class="col-sm-2"></div>
		<div class="col-sm-6">
			<h2 align="left">회 원 정 보 수 정</h2>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon-user">아 이 디</span></label>
			<div class="col-sm-6">
			<input type="text" class="form-control" id="userId" name="userId" value="${member.userId}"
			maxlength=20 readonly="readonly"/>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon-eye-open">비 밀 번 호</span></label>
			<div class="col-sm-6">
			<input type="password" class="form-control" id="userPw" name="userPw" value="${member.userPw}"
			maxlength=20 />
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-user">이 름</span></label>
			<div class="col-sm-6">
			<input type="text" class="form-control" id="userName" name="userName" value="${member.userName}"
			maxlength=20/>
		</div>
	</div>

	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-4">
			<button class="btn btn-success" type="submit" id="submit">회원정보수정</button>
			<button class="btn btn-danger cancel" type="button">취소</button> 
			
		</div>
	</div>
</form>

</div>

</body>
</html>
</layoutTag:layout>