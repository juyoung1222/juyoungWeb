<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" 	tagdir="/WEB-INF/tags" %>

<nav class="navbar navbar-inverse">
  <div class="container">
    <div class="navbar-header">
    <button type="button" class="navbar-toggle"
				data-toggle="collapse" data-target="#myNavbar">
				<span class="icon-bar"></span>	
				<span class="icon-bar"></span>	
				<span class="icon-bar"></span>	
			</button>
      <a class="navbar-brand" href="/">ShoppingMall</a>
      
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
      <li><a href="/board/boardList">COMMUNITY</a></li>
      <li><a href="/product/productList">PRODUCT</a></li>
      <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">CATEGORY<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="/product/productList/100">컴퓨터/가전</a></li>
          <li><a href="/product/productList/200">브랜드패션</a></li>
          <li><a href="/product/productList/300">스포츠</a></li>
          <li><a href="/product/productList/400">생필품</a></li>
        
          
        </ul>
      </li>
   </ul>   
    
    <ul class="nav navbar-nav navbar-right">
      <li><a href="/chat/chat"><span class="glyphicon glyphicon-envelope">Chat</span></a>
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