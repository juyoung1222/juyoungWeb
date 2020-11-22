<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" 	tagdir="/WEB-INF/tags" %>

<!DOCTYPE html>
<html lang="en">
<head>
<style>
body {
  font-family: Arial;
}

* {
  box-sizing: border-box;
}

form.example input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}

form.example button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196F3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  cursor: pointer;
}

form.example button:hover {
  background: #0b7dda;
}

form.example::after {
  content: "";
  clear: both;
  display: table;
}

.dropbtn {
  background-color: #003300;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #003300;
}

#myInput {
  box-sizing: border-box;
  background-image: url('searchicon.png');
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
}

#myInput:focus {outline: 3px solid #ddd;}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  min-width: 230px;
  overflow: auto;
  border: 1px solid #ddd;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}
</style>


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
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/"></a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
      <li><a href="board/boardList">Community</a></li>
      

	
    </div>
    <form class="navbar-form navbar-left" action="board/boardList" method="post">
      <div class="form-group">
      
      <div class="search">
    <select name="searchType">
      <option value="n"<c:out value="${scri.searchType == null ? 'selected' : ''}"/>>-----</option>
      <option value="s"<c:out value="${scri.searchType eq 's' ? 'selected' : ''}"/>>제목</option>
      <option value="c"<c:out value="${scri.searchType eq 'c' ? 'selected' : ''}"/>>내용</option>
      <option value="w"<c:out value="${scri.searchType eq 'w' ? 'selected' : ''}"/>>작성자</option>
      <option value="sc"<c:out value="${scri.searchType eq 'sc' ? 'selected' : ''}"/>>제목+내용</option>
      <input type="text" class="form-control" placeholder="Search" name="keyword" id="keywordInput"  value="${scri.keyword}">
    </select>
    	<button type="submit" class="btn btn-default" id="searchBtn">Submit</button>
     </div>
   </div>   	
  </form>
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

<!-- 검색창  스크립트-->





</body>
</html>