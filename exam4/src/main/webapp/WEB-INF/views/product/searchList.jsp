<%@ page session="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" tagdir="/WEB-INF/tags"%>

<layoutTag:layout>
<!DOCTYPE html>
<html>
<head>
<style>
	.thumbnail {
		margin-top: 10px;
		font-size: 15px;
		padding: 0 0 15px 0;
		border: 2;
		border-radius: 4;
	}
	.btn{
		
	}
</style>
<meta charset="UTF-8">
<title>searchList.jsp</title>
</head>
<body>
	<div class="container">
		<div class="col-sm-10">
				<c:forEach var="product" items="${search}">
					<div class="col-sm-3">
						<div class="thumbnail">
							<img src="/static/upload/${product.productimageName}"
								alt="이미지 업로드">
								<ul>
								  <li>제품명 : ${product.productname}</li>
								  <li>가격 : ${product.productprice} 원</li>
								</ul>
							<button class="btn" data-toggle="modal" data-target="#myModal" 
							onclick="location.href='/product/productdetail/${product.productno}'">Click</button>
						</div>
					</div>
				</c:forEach>
			</div>
		</div>
	
</body>
</html>
</layoutTag:layout>