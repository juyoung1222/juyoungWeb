<%@ page session="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" tagdir="/WEB-INF/tags"%>


<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  margin: 0;
  font-size: 28px;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  background-color: #f1f1f1;
  padding: 30px;
  text-align: center;
}

#navbar {
  overflow: hidden;
  background-color: #333;
}

#navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

#navbar a:hover {
  background-color: #ddd;
  color: black;
}

#navbar a.active {
  background-color: #4CAF50;
  color: white;
}

.content {
  padding: 16px;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

.sticky + .content {
  padding-top: 60px;
}

</style>
<script type="text/javascript" src="/static/jquery/lib/jquery.js"></script>
<script type='text/javascript' src='/static/jquery/lib/jquery.bgiframe.min.js'></script>
<script type='text/javascript' src='/static/jquery/lib/jquery.ajaxQueue.js'></script>
<script type='text/javascript' src='/static/jquery/jquery.autocomplete.js'></script>
<link rel="stylesheet" type="text/css" href="/static/jquery/jquery.autocomplete.css" />
</head>
<body>

<div class="header">
  <h2>쇼핑몰</h2>
  <p>안녕하세요 오신것을 환영합니다.</p>
</div>

<div id="navbar">
  <a class="active" href="/">Home</a>
  <a href="/board/boardList">COMMUNITY</a>
  <a href="/product/productList">product</a>
  <a href="/login/register">SIGN UP</a>
  <a href="/login/login">LOGIN</a>
  
</div>

<div class="content">
  <h3></h3>
  
</div>

</body>
</html>
