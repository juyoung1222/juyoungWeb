<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="layoutTag" tagdir="/WEB-INF/tags"%>

<layoutTag:layout>

	<!DOCTYPE html>
	<html>
<head>
<meta charset="UTF-8">
<title>상품 상세 정보</title>
<style>
.container{
	margin-top: 5%;
}
#list1 {
	float: left;
	margin: 20px;
}
#Comment{
	margin-top: 20px;
}
</style>
</head>
<body>

	<div class="container">
		<h2>상품 상세 정보</h2>
		
		<table class="table table-hover table-bordered">
			<thead>
				<tr>
					<th>제품명</th>
					<th>가 격</th>
					<th>판매 량</th>
				</tr>
			</thead>
			<tr>
				<td>${productdetail.productname}</td>
				<td>${productdetail.productprice}</td>
				<td>${productdetail.productsalescnt}</td>
			</tr>
		</table>
		<table class="table table-hover table-bordered">
			<thead>
				<tr>
					<th>이미지</th>
				</tr>
			</thead>
				<tr>
					<td><img src="/static/upload/${productdetail.productimageName}" alt="이미지 업로드" ><td>
				</tr>
		</table>
		<form action="/cart/insertCart" method="post">
		<div class="input-group">
					<input type="hidden" name="cartproductid" value="${productdetail.productno}"/>
					<input type="hidden" id="productname" name="productname" value="${productdetail.productname}"/>
					<!--  <input type="hidden" id="cartno" name="cartno" value="${insertCart.cartno}"/>-->
					<!--  <input type="hidden" id="cartproductid" name="cartproductid" value="${productdetail.productno}"/>-->
					<input type="hidden" id="cartuserid" name="cartuserid" value="${member.userId}"/>
					<input type="hidden" id="productimagefile" name="productimagefile" value="${productdetail.productimagefile}"/>
					<input type="hidden" id="produtimageName" name="productimageName" value="${productdetail.productimageName}"/>
					<input type="hidden" id="productimageOriName" name="productimageOriName" value="${productdetail.productimageOriName}"/>
					<input type="hidden" id="productimageUrl" name="productimageUrl" value="${productdetail.productimageUrl}"/>
					<input type="hidden" id="productprice" name="productprice" value="${productdetail.productprice}"/>
					<input type="hidden" id="productsalescnt" name="productsalescnt" value="${productdetail.productsalescnt}"/>
		</div>	
		<c:if test = "${member != null}">
				<select name="수량~">
					<c:forEach begin="1" end="10" var="i">
						<option value="${i}">${i}</option>
					</c:forEach>
				</select>
		<button class="btn btn-warning"
			onclick="'location.href='/cart/list'">구매 하기</button>
		<input type="submit" class="btn btn-default" value="장바구니담기">
		</c:if>
	</form>
		<c:if test="${member == null}">
		<select name="수량~">
			<c:forEach begin="1" end="10" var="i">
				<option value="${i}">${i}</option>
			</c:forEach>
		</select>
		<button class="btn btn-warning"
			onclick="location.href='/login/login',alert('로그인 필요')">구매 하기</button>
		</c:if>
		
		<c:if test="${admin != null}">
			
			<!--  <button class="btn btn-success" onclick="location.href='/product/Update/${productdetail.productno}'">수정</button>-->
			
			<button class="btn btn-danger"  onclick="location.href='/product/delete/${productdetail.productno}'">삭제</button>
		</c:if>
</div>

</body>
</html>
</layoutTag:layout>
<!-- layoutTag를 적용하므로 bootstrap.jsp 파일이 필요 업어졌다. -->


































