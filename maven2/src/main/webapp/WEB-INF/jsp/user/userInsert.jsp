<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<script type="text/javascript">
$(document).ready(function(){
	alert("아이디 중복검사");
	//아이디 중복검사
	var idJ = /^[a-z0-9]{4,12}$/;
	
	//var pwd = /^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
	$("#idcked").on("click",function(){
		alert("아이디 중복검사");
		if($("#userId").val() ==""){
			alert("아이디를 입력하세요");
			$("#userId").focus();
			return false;
		}
			alert("ajax시작합니다.");
		$.ajax({
			url : './idCheck.do',
			type : 'post',
			dataType : 'json',
			data : {"userId" : $("#userId").val()},
			success : function(data){
				console.log("1 = 중복됨/ 0 = 사용가능" + data);
				
				if(data == 1){
					//중복되는 문구
					alert("사용중인 아이디 입니다.");
					$("#id_Check").text("사용 불가능한 ID 입니다");
					$("#id_Check").css("color",red);
					$("#id_Check").attr("disabled",true);
					
				}else if(data == 0){
					//사용가능한 문구
					alert("사용가능한 아이디 입니다.");
					$("#id_Check").text("사용 가능한 ID 입니다");
					$("#id_Check").css("color",red);
					$("#id_Check").attr("disabled",true);
				}
					
			}
		})
		alert("ajax끝났습니다.");
	});
	
})

</script>
<script>
var pwd = /^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
alert("비밀번호 검사");
$(document).ready(function(){
	$("#pwdck").on("click",function(){
		if($("#pwd").val() == ""){
			alert("비밀번호를 입력하세요");
			$("#pwd").focus();
			return false;
		}
		alert("ajax 시작합니다.");
		$.ajax({
			url : "./pwdCheck.do",
			type : 'post',
			dataType : 'json',
			success : function(data){
				if(pwd.value.length > 6 || pwd.value.length < 12){
					alert("6자리에서 12자리 사이 영문 , 숫자, 특수문자 조합 하도록 작성해주세요");
					$("#pwd_Check").text("6자리~12자리 사이 영문 , 숫자, 특수문자 조합하게해주세요");
					$("#pwd_Check").css("color",red);
					$("#pwd_Check").attr("disabled",true);
					return false;
				}
				
				
			}
		})
		alert("ajax끝났습니다.");
	});
	
	
})
</script>

<div class="container" style="margin-top: 50px">
	<form class="form-horizontal" id="sendForm" action="../user/userInsert.do" method="post">
	    <div class="form-group">
	      <label class="col-sm-2 control-label">ID</label>
	      <div class="col-sm-4">
	        <input class="form-control" id="userId" name="userId" type="text" value="" title="ID" maxlength="10">
	      </div>

	      <div class="container">
	      	<input type="button" id="idcked" class="btn btn-default idCheck" style="display: block;" value="ID 중복 체크"/>
	      </div>
	      <!-- 메시지 영역 -->
		  <div class="form-group">
		  	<div class="text-center">
		  		<div class="check_font" id="id_Check">
		  		
		  		</div>
		  	</div>
		  
		  </div>
	    </div>

	    <div class="form-group">
	      <label for="disabledInput " class="col-sm-2 control-label">패스워드</label>
	      <div class="col-sm-4">
	        <input class="form-control" id="pwd" name="pwd" type="password" title="패스워드" >
	      </div>
	      <label for="disabledInput " class="col-sm-2 control-label">패스워드 확인</label>
	      <div class="col-sm-4">
	        <input  id="pwdck"  class="btn btn-default pwdCheck" name="pwdCheck" type="button" value="패스워드 확인">
	      </div>
	      
	          <!-- 메시지 영역 -->
		  <div class="form-group">
		  	<div class="text-center">
		  		<div class="check_font" id="pwd_Check">
		  		
		  		</div>
		  	</div>
		  
		  </div>
	    </div>

	    <div class="form-group">
	      <label for="disabledInput" class="col-sm-2 control-label">이름</label>
	      <div class="col-sm-4">
	        <input class="form-control" id="userName" name="userName" type="text" value="" title="이름" >
	      </div>
	    </div>


	    <div class="col-md-offset-4">
			<button type="submit" id="saveBtn"class="btn btn-primary">저장</button>
			<button type="button" id="#"class="btn btn-danger">취소</button>
	    </div>
	</form>
</div>



