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

<title>register.jsp</title>
</head>
<body>
<div class="container-fluid">
	<form class="form-horizontal" method="post" action="/login/proDelete">
		<div class="form-group">
		<div class="col-sm-2"></div>
		<div class="col-sm-6">
			<h2 align="left">회 원 탈 퇴</h2>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon-user">아 이 디</span></label>
			<div class="col-sm-6">
			<input type="text" class="form-control" id="userId" name="userId"
			maxlength=20 value="${member.userId}" readonly="readonly"/>
		</div>
	</div>
		<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon-eye-open">비 밀 번 호</span></label>
			<div class="col-sm-6">
			<input type="password" class="form-control" id="userPw" name="userPw"
			maxlength=20 />
		</div>
	</div>
	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-4">
			<button class="btn btn-danger" type="submit" id="submit">회원탈퇴</button>
			<button class="btn btn-warning cancel" type="button">취소</button>
		</div>
	</div>
	<!-- 회원탈퇴버튼을 눌렀는데 비밀번호가 맞지 않으면 메시지를 보여준다. -->
	<c:if test = "${msg == false}">
		<div class="form-group">
			<div class="col-sm-8">
				<h3><span class="label label danger">로그인에 실패하였습니다. 비밀번호를 다시 입력하세요</span></h3>
			</div>
		</div>
	</c:if>
</form>
</div>
<script>
$(document).ready(function(){
	$(".cancel").on("click",function(){
		location.href="/login/login";
	});
	$("#submit").on("click",function(){
		if($("#userId").val() == ""){
			alert("아이디를 입력하세요");
			$("#userId").focus();
			return false;
			}
		if($("#userPw").val() == ""){
			alert("비밀번호를 입력하세요");
			$("#userPw").focus();
			return false;
			}
		});
	
})
</script>


</body>
</html>
</layoutTag:layout>