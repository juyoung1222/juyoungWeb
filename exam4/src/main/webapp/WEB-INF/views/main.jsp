<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" 	tagdir="/WEB-INF/tags" %>

<!DOCTYPE html>
<html lang="en">
<head>

  <title>Bootstrap Example</title>
  <meta charset="utf-8">
 
 <!-- 상단메뉴바  -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>
<nav class="navbar navbar-inverse">
  <div class="container">
    <div class="navbar-header">
    <button type="button" class="navbar-toggle"
				data-toggle="collapse" data-target="#myNavbar">
				<span class="icon-bar"></span>	
				<span class="icon-bar"></span>	
				<span class="icon-bar"></span>	
			</button>
      <a class="navbar-brand" href="/">커뮤니티</a>
      
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
     
      <li><a href="/board/boardList">Board</a></li>
      <li><a href="/comm/commList">Community</a></li>
     </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="/login/register"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
     <c:if test="${member == null}">
      <li><a href="/login/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
     </c:if>
     <c:if test="${member != null}">
      <li><a href="/login/logout" role="button"><span class="glyphicon glyphicon-log-out"></span>로그아웃</a></li>
     </c:if>
    </ul>
  </div>
</nav>
<!-- 메인 -->
<div class="container">
  <h2>안녕하세요 IT커뮤니티에 잘 오셨습니다.</h2>  
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <div class="item active">
        <img src="/static/image/다운로드.png"  style="width:100%;">
      </div>

      <div class="item">
        <img src="/static/image/썸네일.png" style="width:100%;">
      </div>
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>




</body>
</html>