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
	<title>장바구니 목록 보기</title>

<style>
	.navbar-inverse .navbar-nav > .active > a, 
	.navbar-inverse .navbar-nav > .active > a:focus, 
	.navbar-inverse .navbar-nav > .active > a:hover {
	    color: rgb(255, 255, 255);
	    background-color: red
	}
	img{
		width : 100px;
		height : 100px;
	}
	</style>
</head>
<body>

<div class="container">
	<h2>장바구니 목록</h2>
	
	<button class="btn btn-warning"
			onclick="button1_click()" style="float: right;">구매 하기</button>
	
	<table class="table table-hover table-bordered">
		<thead>
			<tr>
				<th>No</th>
				<th>이미지</th>
				<th>상품명</th>
				<th>가격</th>
				<th>수량</th>
				<!--  <th>구매아이디</th>-->
				<th>일자</th>
				<th>삭제</th>
			</tr>
		</thead>
			<c:forEach var="cart" items="${list}">
			<tr>
				<td>${cart.cartno}</td>
				<td><img src="/static/upload/${cart.productimageName}" alt="" ></td>
				<td>${cart.productname}</td>
				<td>${cart.productprice}</td>
				<td>${cart.productsalescnt}</td>
				<!-- <td>${member.getUserId()}</td> -->
				<td><fmt:formatDate value="${cart.cartdate}" pattern="yyyy년 MM월 dd일"/></td>
				<td><button type="button" class="btn btn-danger" onclick="location.href='/cart/cartDelete/${cart.cartno}',alert('삭제 완료')">삭제</button>
				<button class="btn btn-warning"  onclick="location.href='/cart/cartDelete/${cart.cartno}',alert('구매 완료')">구매 하기</button></td>
			</tr>
			</c:forEach>
		<tbody>
		</tbody>
	</table>
</div>

<script>
function button1_click() {
	alert("구매 완료 했습니다.");
	location.href="/product/productlist";
}
</script>

</body>

</html>

</layoutTag:layout>





















