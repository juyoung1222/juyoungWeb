<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" 	tagdir="/WEB-INF/tags" %>

<layoutTag:layout>
<!DOCTYPE html>
<html>
<head>
<style>
	.container{
			margin-top: 5%;
		}
</style>
<meta charset="UTF-8">
<title>productInsert.jsp</title>
</head>
<body>
<div class="container">
	<form class="form-horizontal" name="writerform" action="/product/insertProc" enctype="multipart/form-data" method="post">
	<div class="form-group">
		<div class="col-sm-2"></div>
		<div class="col-sm-6">
			<h2 align="left">상 품 등 록</h2>
		</div>
		<div class="col-sm-3">
			<a href="/" class="btn btn-success">메인메뉴</a>
			<a href="/product/productList" class="btn btn-info">목록으로</a>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2">분류 선택</label>
		<div class="col-sm-2">
			<select class="form-control" name="productkind">
					<option value="100">컴퓨터/가전</option>
					<option value="200">브랜드패션</option>
					<option value="300">스포츠</option>
					<option value="400">생필품</option>
				</select>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">상 품 이 름</label>
			<div class="col-sm-8">
				<input type="text" class="form-control" maxlength="200" id="productname" name="productname" placeholder="상품이름"/>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">가  격</label>
			<div class="col-sm-4">
				<div class="input-group">
					<input type="text" class="form-control" maxlength="8" 
					id="productprice" name="productprice"  placeholder="가격"/>
					<span class="input-group-addon">원</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">수  량</label>
			<div class="col-sm-2">
				<div class="input-group">
					<input type="text" class="form-control" maxlength="6" 
					id="productsalescnt" name="productsalescnt" placeholder="수량"/>
					<span class="input-group-addon">개</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">이미지명</label>
			<div class="col-sm-4">
				<input type="file" class="form-control"  id="productimagefile"
				name="productimagefile"/>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">내  용</label>
			<div class="col-sm-7">
				<textarea class="form-control col-sm-5" id="productcontent" name="productcontent"
				 rows="10" cols="100" placeholder="내용"></textarea>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">할인율</label>
			<div class="col-sm-2">
				<div class="input-group">
					<input type="text" class="form-control" size="4" maxlength="10" 
					id="productdiscount" name="productdiscount"  placeholder="할인율"/>
					<span class="input-group-addon">%</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">카테고리</label>
				<div class="col-sm-2">
					<select name="productcid" id="productcid">
					    <option value="">종류 선택</option>
					    <option value=1>컴퓨터/가전</option>
					    <option value=2>브랜드패션</option>
					    <option value=3>스포츠</option>
					    <option value=4>생필품</option>
					 </select>
				</div>
			</div>
		<div class="form-group">
		<div class="col-sm-offset-2 col-sm-4">
			<button class="btn btn-success" type="submit" id="submit">상품등록</button>
			<button class="btn btn-danger cancel" type="button">취소</button>
		</div>
	</div>
</form>
</div>
<script>
$(document).ready(function() {
	//취소버튼을 눌렀을 경우
	
	$(".cancel").on("click",function(){
		alert("취소되었습니다.");
		location.href="/"
	});
	//회원가입 버튼을 눌렀을 경우 =>입력필드가 비어있는지 검사한다.
	$("#submit").on("click",function(){
		if($("#productname").val() == ""){
			alert("제목을 입력하세요");
			$("#productname").focus();
			return false;
		}
		if($("#productprice").val() == ""){
			alert("가격을 입력하세요");
			$("#productprice").focus();
			return false;
		}
		if($("#productsalescnt").val() == ""){
			alert("수량을 입력하세요");
			$("#productsalescnt").focus();
			return false;
		}
		if($("#productcontent").val() == ""){
			alert("내용을 입력하세요");
			$("#productcontent").focus();
			return false;
		}
		if($("#productdiscount").val() == ""){
			alert("할인율을 입력하세요");
			$("#productdiscount").focus();
			return false;
		}
		
	});
	
})
</script>
</body>
</html>
</layoutTag:layout>