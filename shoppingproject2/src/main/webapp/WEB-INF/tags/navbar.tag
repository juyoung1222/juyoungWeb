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
      <a class="navbar-brand" href="/">쇼핑몰</a>
      
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
      <li><a href="/board/boardList">Community</a></li>
   
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