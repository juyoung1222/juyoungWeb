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
	.navbar-default{
		height : 50px;
	}
	h4{
		color : white;
	}
</style>
<meta charset="UTF-8">
<title>adminmain.jsp</title>
</head>
<body data-spy="scroll" data-target=".navbar" data-offset="50">
<!-- 화면 최상단 부분 -->
<div class="container-fluid" 
	style="background-color:#b30000; color:#FFF; height:300px;">
	<h1>쇼 핑 몰 관 리</h1>
	<h3>관리자가 쇼핑몰에 관한 모든 것을 관리하는 페이지입니다.</h3>
</div>
<!-- 관리자 메뉴바 -->
<nav class="navbar navbar-inverse" data-spy="affix" data-offset-top="100">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#myNavbar">
				<span class="icon-bar"></span>	
				<span class="icon-bar"></span>	
				<span class="icon-bar"></span>	
			</button>
			<a class="navbar-brand" href="/admin/adminindex">ShoppingMall</a>
		</div>
		<div>
			<div class="form-group collapse navbar-collapse" id="myNavbar">
				<ul class="nav navbar-nav">
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#">
						 상품관리 <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="/product/productInsert">상품등록</a></li>
							<li><a href="/product/productList">상품목록(수정/삭제)</a></li>
							<li><a href="/cart/cartList">장바구니</a></li>
						</ul>
					</li>
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#">
						 게시판관리 <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="/board/boardInsert">게시판등록</a></li>
							<li><a href="/board/boardList">게시판목록(수정/삭제)</a></li>
						</ul>
					</li>
				
					<c:if test="${admin == null}">
					<li><a href="/admin/adminloginform">로그인</a></li>
					</c:if>
					<c:if test="${admin != null}">
			      	<li><a href="/admin/adminlogout" role="button">로그아웃</a></li>
			     	</c:if>
			     	
			     	<c:if test="${admin != null}">
			     		<li><h4 align="center"><span class="glyphicon glyphicon-user">${admin.managerId}님 안녕하세요!</span></h4></li>
			     	</c:if>
					
				</ul>
			</div>
		</div>
	</div>
</nav>




</body>
</html>
</layoutTag:layout>
