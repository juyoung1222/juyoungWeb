<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" 	tagdir="/WEB-INF/tags" %>
<!-- <style>
body {
  font-family: 'Lato', sans-serif;
}
.overlay {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.9);
  overflow-x: hidden;
  transition: 0.5s;
}

.overlay-content {
  position: relative;
  top: 25%;
  width: 100%;
  text-align: left;
  margin-top: 30px;
}

.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 19px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.overlay a:hover, .overlay a:focus {
  color: #f1f1f1;
}

.overlay .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
}

@media screen and (max-height: 450px) {
  .overlay a {font-size: 20px}
  .overlay .closebtn {
  font-size: 40px;
  top: 15px;
  right: 35px;
  }
}

/* Fixed sidenav, full height */
.sidenav {
  height: 100%;
  width: 150px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 50px;
}

/* Style the sidenav links and the dropdown button */
.sidenav a, .dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
  
}

/* On mouse-over */
.sidenav a:hover, .dropdown-btn:hover {
  color: #f1f1f1;
}

/* Main content */
.main {
  margin-right: 100px; /* Same as the width of the sidenav */
  font-size: 20px; /* Increased text to enable scrolling */
  padding: 0px 50px;
}

/* Add an active class to the active dropdown button */
.active {
  background-color: #333333;
  color: white;
}

/* Dropdown container (hidden by default). Optional: add a lighter background color and some left padding to change the design of the dropdown content */
.dropdown-container {
  display: none;
  background-color: #0d0d0d;
  padding-left: 8px;
}

/* Optional: Style the caret down icon */
.fa-caret-down {
  float: right;
  padding-right: 8px;
}

/* Some media queries for responsiveness */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style> -->

<%-- <nav class="navbar navbar-inverse">
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
      <li><a href="/product/productlist">Product</a></li>
   
   </ul>   
    
    <ul class="nav navbar-nav navbar-right">
      <li><a href="/chat/chat"><span class="glyphicon glyphicon-envelope"> Chat</span></a>
      
      <c:if test="${member == null}">
      <li><a href="/login/register"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      </c:if>
      
     <c:if test="${member == null}">
      <li><a href="/login/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
     </c:if>
     
     <c:if test="${member != null}">
      <li><a href="/login/logout" role="button"><span class="glyphicon glyphicon-log-out"></span> logout</a></li>
     </c:if>
    </ul>
  </div>
</nav> --%>

<!-- <div id="myNav" class="overlay">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <div class="overlay-content">
    <a href="#">  컴퓨터/가전</a>
    <a href="#">  브랜드패션</a>
    <a href="#">  스포츠</a>
    <a href="#">  식품/생필품</a>
      <button class="dropdown-btn center">Dropdown 
          <i class="fa fa-caret-down"></i>
      </button>
    <div class="dropdown-container">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>
</div>
<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>

<script>
function openNav() {
  document.getElementById("myNav").style.width = "35%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
</script> -->

<style>
/* 네비게이션 바 */
.margin {
	margin-bottom: 45px;
}
.bg-1 {
	background-color: #1abc9c; /* Green */
	color: #ffffff;
}
.bg-2 {
	background-color: #474e5d; /* Dark Blue */
	color: #ffffff;
}
.bg-3 {
	background-color: #ffffff; /* White */
	color: #555555;
}
.bg-4 {
	background-color: #2f2f2f; /* Black Gray */
	color: #fff;
}
.container-fluid {
	padding-top: 70px;
	padding-bottom: 70px;
}
.navbar {
	padding-top: 1px;
	padding-bottom: 1px;
	border: 0;
	border-radius: 0;
	margin-bottom: 0;
	font-size: 12px;
	letter-spacing: 5px;
}
.navbar-nav  li a:hover {
	color: #1abc9c !important;
}

/* 드롭 서치 */
.dropbtn {
background-color: #fcfcfc;
color: 808080;
padding: 16px;
font-size: 12px;
border: none;
cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #1abc9c;
  color : white;
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
<nav class="navbar navbar-default">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				<span class="icon-bar"></span> <span class="icon-bar"></span> 
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="/">MAIN</a>
		</div>
		<div class="collapse navbar-collapse" id="myNavbar">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="/product/productlist">PRODUCT</a></li>
				<li><a href="/board/boardList">COMMUNITY</a></li>
				
				
				<ul class="nav navbar-nav navbar-right">
					<li><a href="/cart/list"><span class="glyphicon hlyphicon-shopping-cart"></span>CART</a></li>
					
					<c:if test="${member == null}">
			      		<li><a href="/login/register"><span class="glyphicon glyphicon-user"></span> SIGN UP</a></li>
			      </c:if>
			      
			     <c:if test="${member == null}">
			      	<li><a href="/login/login"><span class="glyphicon glyphicon-log-in"></span> LOGIN</a></li>
			     </c:if>
			     
			     <c:if test="${member != null}">
			     	<li><a href="/login/logout" role="button"><span class="glyphicon glyphicon-log-out"></span> LOGOUT</a></li>
			     </c:if>
			    </ul>
			</ul>
		</div>
	</div>
	
	
	
<script>
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
</script>

</nav>
