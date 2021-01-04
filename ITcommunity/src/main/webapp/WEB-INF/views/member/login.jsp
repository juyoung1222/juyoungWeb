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
<style>
	p{
		text-align: center;
		color : red;
	}
</style>
</head>
<body>
	<div class="container">
		<form class="form-horizontal" method="post" action="/member/login" id="loginForm">
			<!-- 로그인을 하지않고 들어온 경우 : 로그인을 입력할수 있게 한다. -->
			<h2 align="left">로 그 인</h2>
				<p>
					이 곳은 회원들만 사용가능한 곳입니다.
				</p>
			
				<div class="form-group">
					<label class="control-label col-sm-2">아 이 디</label>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="userId" name="userId" 
								maxlength=16 placeholder="아이디를 입력하세요"/>
					</div>
					<!-- 메시지 영역 -->
				<div class="form-group">
					<div class="text">
						<div class="check_font" id="userId_Check">
						</div>
					</div>
				</div>
			</div>
			
			<div class="form-group">
					<label class="control-label col-sm-2">비 밀 번 호</label>
					<div class="col-sm-6">
					<input type="password" class="form-control" id="userPw" name="userPw"
							maxlength=16 placeholder="비밀번호를 입력하세요"/>
					</div>
				<!-- 메시지 영역 -->
				<div class="form-group">
					<div class="text">
						<div class="check_font" id="userPw_Check">
						</div>
					</div>
				</div>
			</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-4 col-sm-4">
						<button class="btn btn-success" type="submit" id="submit">로그인</button>
						<button class="btn btn-danger" type="reset">취소</button>
						<button class="btn btn-info" type="button" id="proRegisterBtn">회원가입</button>
					</div>
				</div>
				
		
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
		location.href="/member/register";
		});
	
})
</script>
<script>
$(document).ready(function(){
	//로그인검증
	//ID 입력값 검증
	$("#userId").on("keyup",function(){
		if($("#userId").val() == ""){
			$("#userId_Check").text("아이디는 필수입니다. 아이디는 영문자, 숫자 혼용해서 입력해주세요");
			$("#userId_Check").css("color","red");
			$(".userId").attr("disabled",true);
			}
		})
	//PW 입력값 검증
	$("#userPw").on("keyup",function(){
		if($("#userPw").val() == ""){
			$("#userPw_Check").text("비밀번호는 필수입니다. 비밀번호는 영문자,숫자 혼용해서 입력해주세요");
			$("#userPw_Check").css("color","red");
			$(".userPw").attr("disabled",true);
			}
		})
})
</script>

</body>
</html>
</layoutTag:layout>