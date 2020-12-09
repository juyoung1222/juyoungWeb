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
<title>login.jsp</title>
</head>
<body>
	<div class="container">
		<form class="form-horizontal" method="post" action="/login/login" id="loginForm">
			<!-- 로그인을 하지않고 들어온 경우 : 로그인을 입력할수 있게 한다. -->
			<h2 align="left">로 그 인</h2>
			<c:if test="${member == null }">
				<div class="form-group">
					<label class="control-label col-sm-2">아 이 디</label>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="userId" name="userId" 
								maxlength=16 placeholder="아이디를 입력하세요"/>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2">비 밀 번 호</label>
					<div class="col-sm-6">
					<input type="password" class="form-control" id="userPw" name="userPw"
							maxlength=16 placeholder="비밀번호를 입력하세요"/>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-4">
						<button class="btn btn-success" type="submit" id="submit">로그인</button>
						<button class="btn btn-danger" type="reset">취소</button>
						<button class="btn btn-info" type="button" id="proRegisterBtn">회원가입</button>
					</div>
				</div>
				
			</c:if>
			<c:if test="${member != null }">
				<div>
					<p><h2>${member.userId}님 환영합니다.</h2></p>
					<button id="proUpdateBtn" type="button">회원정보수정</button>
					<button id="proDeleteBtn" type="button">회원탈퇴</button>
				</div>
			</c:if>
			<c:if test="${msg == false}">
				<div class="form-group">
					<div class="col-sm-8">
						<h3><span class="label label-danger">로그인에 실패하였습니다.다시 입력하세요</span></h3>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-8">
						<div style="background-color: #CF0; color:red"><h3>로그인에 실패하였습니다. 다시 입력하세요</h3></div>
					</div>
				</div>
			</c:if>
		</form>
	</div>
<script>
$(document).ready(function(){
	//로그인 버튼을 눌렀을 경우
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

	//회원가입 버튼을 눌렀을 경우
	$("#proRegisterBtn").on("click",function(){
		location.href="/login/register";
		});
	//회원정보수정버튼을 눌렀을 경우
	$("#proUpdateBtn").on("click",function(){
		location.href="/login/proUpdate";
		});
	//회원탈퇴버튼을 눌렀을 경우
	$("#proDeleteBtn").on("click",function(){
		location.href="/login/proDelete";
		});

	
})

</script>
</body>
</html>
</layoutTag:layout>