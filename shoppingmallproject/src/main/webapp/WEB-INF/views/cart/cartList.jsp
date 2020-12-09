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
<c:choose>
	<c:when test="${map.cartamount == 0}">
		장바구니가 비었습니다.
	</c:when>
	<c:otherwise>
		<form action="/cart/cartList" method="post">
			<table border="1">
				<tr>
					<th>상품명</th>
					<th>단가</th>
					<th>수량</th>
					<th>금액</th>
				</tr>
				<c:forEach var="row" items="${map.list}" varStatus="i">
					<tr>
						<td>
							${row.productname}
						</td>
						<td>
							<fmt:formatNumber pattern="###,###,###" value="${row.productprice}"/>
						</td>
						<td>
							<input type="number" style="width:40px" name="amount" value="${row.amount}"/>
							<input type="hidden" name="productname" value="${row.productname}"/>
						</td>
						<td style="width:100px" align="right">
							<fmt:formatNumber pattern="###,###,###" value="${row.productprice}"/>
						</td>
					</tr>
				</c:forEach>
				<tr>
					<td colspan="5" align="right">
					장바구니 금액 합계 : <fmt:formatNumber pattern="###,###,###" value="${map.sumMoney}"/><br>
					배송료 : ${map.fee}<br>
					전체 주문금액 : <fmt:formatNumber pattern="###,###,###" value="${map.allSum}"/>
					</td>
				</tr>
			</table>
			<input type="hidden" name="count" value="${map.count}">
			<button type="submit" class="btn btn-danger" id="btnUpdate">수정</button>
		</form>
	</c:otherwise>
			<button type="button" id="btnList" class="btn btn-success">상품 목록</button>
</c:choose>
<script>
$(document).ready(function(){
	$("#btnList").on("click",function(){
		location.href="/product/productList";
		});
})
</script>

</body>
</html>
</layoutTag:layout>