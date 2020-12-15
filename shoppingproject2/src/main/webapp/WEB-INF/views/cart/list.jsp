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
	
	<table class="table table-hover table-bordered">
		<thead>
			<tr>
				<th>No</th>
				<th>이미지</th>
				<th>상품명</th>
				<th>가격</th>
				<th>구매 수량</th>
				<th>일자</th>
				<th></th>
			</tr>
			
		</thead>
			<c:forEach var="cart" items="${list}">
			<tr>
				<td>${cart.cartno}</td>
				<td><img src="/static/upload/${cart.productimageName}" alt="" ></td>
				<td>${cart.productname}</td>
				<td>${cart.productprice}</td>
				<td><select name="수량~">
					<c:forEach begin="1" end="10" var="i">
						<option value="${i}">${i}</option>
					</c:forEach>
				</select></td>
				<!-- <td>${member.getUserId()}</td> -->
				<td><fmt:formatDate value="${cart.cartdate}" pattern="yyyy년 MM월 dd일"/></td>
				<td><button type="button" class="btn btn-danger" onclick="location.href='/cart/cartDelete/${cart.cartno}',alert('삭제 완료')">삭제</button>
				<button class="btn btn-warning"  onclick="location.href='/cart/cartDelete/${cart.cartno}',alert('구매 완료')">구매 하기</button></td>
			</tr>
				 <c:set var="sum" value="${sum + (cart.productprice * cart.productsalescnt )}"/>
		</c:forEach>
	
				<tr class="danger">
					<td colspan="7" align="right">
						<b><font size="+1">총 구매금액 :<fmt:formatNumber pattern="###,###,###" value="${sum}" />원</font></b>
					</td>
				</tr>
	
<tbody>
</tbody>
	
</table>
	
</div>


</body>
</html>
</layoutTag:layout>






















