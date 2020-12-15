<%@ page session="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" tagdir="/WEB-INF/tags"%>


<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<meta charset="UTF-8">
<title>메인</title>
	<script type="text/javascript" src="/static/jquery/lib/jquery.js"></script>
	<script type='text/javascript' src='/static/jquery/lib/jquery.bgiframe.min.js'></script>
	<script type='text/javascript' src='/static/jquery/lib/jquery.ajaxQueue.js'></script>
	<script type='text/javascript' src='/static/jquery/jquery.autocomplete.js'></script>
	<link rel="stylesheet" type="text/css" href="/static/jquery/jquery.autocomplete.css" />

<style>
	
	h2{
		color : white;
	}
	p{
		text-align:center;
		
	}
	.header{
		background-color: #009900;
	}
</style>
</head>
<body>

<div class="header">
  <h2 align="center">SHOPPING MALL</h2>
  <p>안녕하세요 오신것을 환영합니다.</p>
</div>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">ShoppingMall</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
      <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">CATEGORY<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="/product/productList/100">컴퓨터/가전</a></li>
          <li><a href="/product/productList/200">브랜드패션</a></li>
          <li><a href="/product/productList/300">스포츠</a></li>
          <li><a href="/product/productList/400">생필품</a></li>
         </ul>
      </li>
      <li><a href="/product/productList">PRODUCT</a></li>
      <li><a href="/board/boardList">COMMUNITY</a></li>
      <li><a href="/login/register">SIGN UP</a></li>
      <li><a href="/login/login">LOGIN</a></li>
    </ul>
  </div>
</nav>

<br>
<br>
<br>
<!-- 검색창 -->
<div class="container">
	<form class="form-inline" action="/product/searchList" method="post">
		<input type="text" class="form-control" id="searchBox" name="searchName" size="100"
			placeholder="검색어를 입력하세요">
		<button type="submit">검색</button>
	</form>
</div>
  
<script>
	var availableTags = [
						'컴퓨터',
						'노트북',
						'핸드폰',
						'폴로',
						'지오다노',
						'탑텐',
						'나이키',
						'아디다스',
						'데상트',
						'휴지',
						'장갑'
						];
</script>
<script>
$(document).ready(function(){
	$("#searchBox").autocomplete(availableTags,{
			matchContains:true,
			selectFirst : false
		});
})
</script>

</body>
</html>

