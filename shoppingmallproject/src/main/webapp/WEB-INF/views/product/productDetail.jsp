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
<title>productDetail.jsp</title>
<style>
.navbar-inverse .narbar-nav > .active > a,
.navbar-inverse .narbar-nav > .active > a:focus,
.navbar-inverse .narbar-nav > .active > a:hover{

	color:rgb(255,255,255);
	background-color:red
}
	ul{list-style:none; float:center; padding:6px;}

	img{
		width:100px;
		height:100px;
	}
	

	
</style>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<link rel="stylesheet" href="//code.jquey.com/ui/1.12.1/themes/base/jquey-ui.css">
</head>
<body>

	<div class="container-fluid">
		<form class="form-horizontal" action="/cart/cartInsert" method="post">
		<div class="input-group">
						<input type="hidden" name="cartproductid" value="${product.productno}"/>
						<input type="hidden" id="productname" name="productname" value="${product.productname}"/>
						<!--  <input type="hidden" id="cartno" name="cartno" value="${cartinsert.cartno}"/>-->
						<!--<input type="hidden" id="cartproductid" name="cartproductid" value="${productdetail.productno}"/>-->
						<input type="hidden" id="cartuserid" name="cartuserid" value="${member.userId}"/>
						<input type="hidden" id="productimagefileName" name="productimagefileName" value="${product.productimagefileName}"/>
						<input type="hidden" id="productimagefileOriName" name="productimagefileOriName" value="${product.productimagefileOriName}"/>
						<input type="hidden" id="productimagefileUrl" name="productimagefileUrl" value="${product.productimagefileUrl}"/>
						<!--<input type="hidden" id="productprice" name="productprice" value="${productdetail.productprice}"/>-->
						<!--  <input type="hidden" id="productsalescnt" name="productsalescnt" value="${productdetail.productsalescnt}"/>-->
			</div>	
		<div class="form-group">
		<div class="col-sm-2"></div>
		<div class="col-sm-6">
			<h2><span class="glyphicon glyphicon-file">상품 상세 정보</span></h2>
			<button type="button" class="btn btn-primary" onclick="location.href='/product/productList'">목록으로</button>
			<button type="button" class="btn btn-success" onclick="location.href='/product/productUpdate/${product.productno}'">수정</button>
			<button type="button" class="btn btn-danger" onclick="location.href='/product/productDelete/${product.productno}'">삭제</button>
		</div>
	</div>
			<div class="form-group">
				<label class="control-label col-sm-3">번 호</label>
				<div class="col-sm-4">
					<input type="text" class="form-control" id="productno" name="productno" value="${product.productno}" readonly="readonly"/>
				</div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-3">상 품 이 름</label>
				<div class="col-sm-6">
					<input type="text" class="form-control" id="productname" name="productname" value="${product.productname}" readonly="readonly"/>
				</div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-3">가 격</label>
				<div class="col-sm-6">
					<input type="text" class="form-control" id="productprice" name="productprice" value="${product.productprice}" readonly="readonly"/>
				</div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-3">수 량</label>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="productsalescnt" name="productsalescnt" value="${product.productsalescnt}" readonly="readonly"/>
					</div>
				</div>
			
			<div class="form-group">
				<label class="control-label col-sm-3">이 미 지</label>
					<img src="/static/imagefile/휴지.jpg" alt="이미지업로드">
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-3">내 용</label>
				<div class="col-sm-6">
					<input type="text" class="form-control" id="productcontent" name="productcontent" value="${product.productcontent}" readonly="readonly"/>
				</div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-3">할인 판매가격</label>
				<div class="col-sm-6">
					<input type="text" class="form-control" id="productdiscount" name="productdiscount" value="${Math.round(product.productprice * (100-product.productdiscount)/100) }" readonly="readonly"/>
				</div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-3">상품 등록 일자</label>
				<div class="col-sm-6">
					<input type="text" class="form-control" id="productregdate" name="productregdate" value="${product.productregdate}" readonly="readonly"/>
				</div>	
			</div>
			<center>
				<div class="form-group">	
					<select name="productsalescnt" style="vertical-align:middle; text-align-last:center">
							<c:forEach begin="1" end="10" var="i">
									<option value="${i}">${i}</option>
							</c:forEach>
					</select>&nbsp;개
						<input type="submit" value="장바구니에 담기" id="submit" name="submit"/>
							<a href="/product/productList">상품 목록</a>
				</div>
			</center>
		</form>
	</div>
	
	</body>
</html>
</layoutTag:layout>