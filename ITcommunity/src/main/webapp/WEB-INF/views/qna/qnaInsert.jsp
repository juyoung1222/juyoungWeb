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
<title>qnaInsert.jsp</title>
</head>
<body>
<div class="container-fluid">
	<h2 align="left">질 문 작 성</h2>
		<form class="form-horizontal" action="/qna/qnaInsertProc" method="post" enctype="multipart/form-data">
			
			<div class="form-group">
				<label>질 문 제 목</label>
					
						<input type="text" id="qnasubject" name="qnasubject" maxlength="200" placeholder="제목을 입력하세요"/>
				
			</div>
			
			
			<div class="inputArea">
				<label for="qnaimagefile">질 문 사 진 첨 부</label>
					<input type="file" id="qnaimagefile" name="qnaimagefile">
			 			<div class="select_img"><img src="" /></div>
					<!--이미지 미리보기-->
					<script>
						  $("#qnaimagefile").change(function(){
						   if(this.files && this.files[0]) {
						    var reader = new FileReader;
						    reader.onload = function(data) {
						     $(".select_img img").attr("src", data.target.result).width(500);        
						    }
						    reader.readAsDataURL(this.files[0]);
						   }
						  });
					</script>
			</div>
			<br>
			
			<div class="form-group">
				<label >질 문 내 용</label>
					<textarea rows="4" cols="100" class="form-control" id="qnacontent" name="qnacontent" placeholder="내용을 입력하세요"></textarea>
			</div>
			
			<div class="form-group">
			<select name="qnacid" id="qnaid">
			    <option value="">종류 선택</option>
			    <option value=1>JAVA</option>
			    <option value=2>JSP</option>
			    <option value=3>SPRING</option>
			    <option value=4>MYSQL</option>
			    <option value=5>ANDROID</option>
			</select>
		</div>
		
		<div class="form-group">			
				<button class="btn btn-success" type="submit" id="submit">작성</button>
				<button class="btn btn-danger" type="reset">취소</button>	
		</div>
	</form>
</div>
</body>
</html>
</layoutTag:layout>