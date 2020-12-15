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
<title>cartList.jsp</title>
</head>
<body>
<h2>장바구니 확인</h2>

	<c:if test="${map.cartamount == 0}">
		장바구니가 비었습니다.
	</c:if>
<div class="container">
	<form action="/cart/cartList" method="post">
		<table class="table table-hover table-bordered">
			<thead>
				<tr>
					<th>번호</th>
					<th>이미지</th>
					<th>상품명</th>
					<th>구매아이디</th>
					<th>가격</th>
					<th>구매 수량</th>
					<!-- <th>할인 판매 가격</th> -->
					
				</tr>
			</thead>
			<c:forEach var="cart" items="${map.list}">
				<tr>
					<td>${cart.cartno}</td>
					<td><img src="/static/upload/${cart.productimagefile}" alt="이미지업로드"></td>
					<td>${cart.productname}</td>
					<td>${member.userId}</td>
					<td>
						<fmt:formatNumber pattern="###,###,###" value="${cart.productprice}"/>
					</td>
					<!--  <td><select name="productsalescnt">
						<c:forEach begin="1" end="10" var="i">
							<option value="${i}">${i}</option>
						</c:forEach>
						</select>&nbsp;개
							<a href="/cart/cartUpdate">변경</a>
					</td>-->
					<!--<td>
					 <c:set var="sum" value="${Math.round(cart.productprice * (100-cart.productdiscount)/100) }"/>
					 <fmt:formatNumber pattern="###,###,###" value="${sum}"/>
					</td>-->
					<td><button type="button" class="btn btn-danger" onclick="location.href='/cart/cartDelete/${cart.cartno}',alert('삭제 완료')">삭제</button>
					<button class="btn btn-warning"  onclick="location.href='/cart/cartDelete/${cart.cartno}',alert('구매 완료')">구매 하기</button>
					<!--  <button class="btn btn-primary" onclick="location.href='/cart/cartUpdate/${cart.cartno}'">수정하기</button></td>-->
				</tr>
					<c:set var="sum1" value="${sum1 + (cart.productprice * cart.productsalescnt )}"/>
					<!-- <fmt:formatNumber pattern="###,###,###" value="${sum}"/>-->
		</c:forEach>
	
				<tr class="danger">
					<td colspan="7" align="right">
						<b><font size="+1">총 구매금액 :<fmt:formatNumber pattern="###,###,###" value="${sum1}" />원</font></b>
					</td>
				</tr>
				
				
			<tbody></tbody>
			
		</table>
		<div class="input-group">
					<input type="hidden" name="cartproductid" value="${product.productno}"/>
					<input type="hidden" id="productname" name="productname" value="${product.productname}"/>
					<!--  <input type="hidden" id="cartno" name="cartno" value="${cartinsert.cartno}"/>-->
					<!--<input type="hidden" id="cartproductid" name="cartproductid" value="${productdetail.productno}"/>-->
					<input type="hidden" id="cartuserid" name="cartuserid" value="${member.userId}"/>
					<input type="hidden" id="productimagefileName" name="productimagefileName" value="${product.productimagefileName}"/>
					<input type="hidden" id="productimagefileOriName" name="productimagefileOriName" value="${product.productimagefileOriName}"/>
					<input type="hidden" id="productimagefileUrl" name="productimagefileUrl" value="${product.productimagefileUrl}"/>
					<!--<input type="hidden" id="productprice" name="productprice" value="${product.productprice}"/>-->
					<!--  <input type="hidden" id="productsalescnt" name="productsalescnt" value="${product.productsalescnt}"/>-->
				</div>	
	</form>
</div>
</body>
</html>
</layoutTag:layout>