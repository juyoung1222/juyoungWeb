<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt" %>
<%@ taglib tagdir="/WEB-INF/tags" 				   prefix="layoutTag" %>
<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<layoutTag:layout>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Update.jsp</title>
</head>
<div class="container-fluid">
	<h2 align="left">게 시 글 업데이트</h2>
	<form class="form-horizontal" action="/product/updateProc" method="post">
		<div class="inputArea">
			<label for="productimagefile">이미지</label>
			<input type="file" id="productimagefile" name="productimagefile">
			 <div class="select_img"><img src="" /></div>
		<!--이미지 미리보기-->
		<script>
			  $("#productimagefile").change(function(){
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
		<div class="form-group">
			<label for="productname">제 품 명</label>
			<input type="text" class="form-control" id="productname" name="productname" placeholder="제품명을 입력하십시오."/>
		</div>
		<div class="form-group">
			<label for="productprice">가 격</label>
			<input type="number" class="form-control" id="productprice" name="productprice"  placeholder="가격를 입력하십시오."/>
		</div>
		<div class="form-group">
			<label for="productsalescnt">판매수량</label>
			<input type="number" class="form-control" id="productsalescnt" name="productsalescnt"  placeholder="수량를 입력하십시오."/>
		</div>
			<input type="hidden" name="productno" value="${productno}"/>
			<button type="submit" class="btn btn-primary">수 정</button>
				
	</form>	
</div>

</body>
</html>
</layoutTag:layout>