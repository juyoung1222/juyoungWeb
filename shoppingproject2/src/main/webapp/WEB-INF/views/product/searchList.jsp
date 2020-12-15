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
.w3-sidebar a {
font-family: "Roboto", sans-serif
}
.btn {
	padding: 8px 10px;
	background-color: #333;
	color: #f1f1f1;
	border-radius: 4;
	transition: .2s;
	margin-left: 35%;
}
.pagination {
	margin-left: 46%;
}
/* Turn off parallax scrolling for tablets and phones */
@media only screen and (max-device-width: 1600px) {
	.bgimg-1 {
		background-attachment: scroll;
		min-height: 400px;
	}
	.w3-sidebar a {
		font-family: "Roboto", sans-serif
	}
	body, h1, h2, h3, h4, h5, h6, .w3-wide {
		font-family: "Montserrat", sans-serif;
	}
}
.btn {
	padding: 8px 10px;
	background-color: #333;
	color: #f1f1f1;
	border-radius: 4;
	transition: .2s;
	margin-left: 35%;
}
</style>
<meta charset="UTF-8">
<link rel="icon" type="image/x-icon" href="/static/images/aland.jpg" />
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<title>검색결과</title>
</head>
<body>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top"
	style="z-index: 3; width: 120px" id="mySidebar">
	<div class="w3-container w3-display-container w3-padding-16">
		<i onclick="w3_close()"
			class="fa fa-remove w3-hide-large w3-button w3-display-topright"></i>
		<h3 class="w3-wide">
			<b>SHOP</b>
		</h3>
	</div>
	<div class="w3-padding-64 w3-large w3-text-grey"
		style="font-weight: bold">
		<a href="/product/productlist/1" class="w3-bar-item w3-button">Shirts</a>
		<a href="/product/productlist/2" class="w3-bar-item w3-button">Dresses</a>
		<a href="/product/productlist/3" class="w3-bar-item w3-button">Jeans</a>
		<a href="/product/productlist/4" class="w3-bar-item w3-button">Jackets</a>
		<a href="/product/productlist/5" class="w3-bar-item w3-button">Gymwear</a>
		<a href="/product/productlist/6" class="w3-bar-item w3-button">Blazers</a>
		<a href="/product/productlist/7" class="w3-bar-item w3-button">Shoes</a>
	</div>
</nav>


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