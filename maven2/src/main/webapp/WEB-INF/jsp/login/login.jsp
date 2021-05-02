<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="true" %>
<script type="text/javascript">

</script>


<form id="sendForm" method="post" action="/login/login"> 

	<input type="hidden" id="platform" name="platform" value="">
	<div class="container col-md-offset-2 col-sm-6" style="margin-top: 100px;">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
				<input id="memId" type="text" class="form-control valiChk" name="memId" placeholder="id" title="ID">
			</div>
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
				<input id="memPassword" type="password" class="form-control valiChk" name="memPassword" placeholder="Password" title="Password">
			</div>
			<br />
		<br>
		<div class="col-md-offset-4">
			<button type="button" id="loginBtn" class="btn btn-primary">로그인</button>
			<button type="button" id="#" class="btn btn-warning" onclick="location.href='./login/login.do'">취소</button>
			<button type="button" id="#" class="btn btn-info" onclick="location.href='./user/userInsert.do'">회원가입</button>
		</div>
		<c:if test="${msg == false}">
				<div class="form-group">
					<div class="col-sm-8">
						<div style="background-color: #CF0; color:red"><h3>로그인에 실패하였습니다. 다시 입력하세요</h3></div>
					</div>
				</div>
			</c:if>
	</div>
</form>
<script>
$(document).ready(function(){
	$("#loginBtn").on("click",function(){
		alert("hihi");
	location.href="./account/accountList.do";
	});
})
</script>

