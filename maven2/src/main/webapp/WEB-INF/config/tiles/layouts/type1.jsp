<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@ 
taglib uri="tiles-tags" prefix="tiles"%><%@ 
taglib uri="jstl-c" prefix="c"%><!DOCTYPE html>
<html lang="ko">
<head>
<tiles:insertAttribute name="title" />
<script type="text/javascript">
<!--
	$(document).ready(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() > 200) {
				$('.top').fadeIn();
			} else {
				$('.top').fadeOut();
			}
		});
		$('.top').click(function() {
			$('html, body').animate({
				scrollTop : 0
			}, 400);
			return false;
		});
	});
//-->
</script>
</head>
<body>
	<div class="container open">
		<tiles:insertAttribute name="header" />
		<tiles:insertAttribute name="menu" />
		<div id="dBody">
			<tiles:insertAttribute name="body" />
		</div>
		<span class="a"> <a href="#" class="top"><!-- Top -->
			<img alt="" src="<c:url value='/images/btn_up.png'/>">
		</a>
		</span>
		<tiles:insertAttribute name="footer" />
	</div>
</body>
</html>