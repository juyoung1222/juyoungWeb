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
.checked {
  color: orange;
}
</style>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<title>Insert title here</title>
</head>
<body>
<div class="container-fluid">
	<h2 align="left">게 시 글 작 성</h2>
	<form class="form-horizontal" action="/board/insertProc" method="post">
		<div class="form-group">
			<label for="subject">제 목</label>
			<input type="text" class="form-control" id="subject" name="subject" placeholder="제목을 입력하세요"/>
		</div>
		<div class="form-group">
			<label for="writer">작 성 자</label>
			<input type="text" class="form-control" id="writer" name="writer" placeholder="작성자를 입력하세요"/>
		</div>
		<div class="form-group">
			<label for="content">내 용</label>
			<textarea rows="4" cols="100" class="form-control" id="content" name="content" placeholder="내용을 입력하세요"></textarea>
			
		</div>
		
		<!-- 좋아요버튼 -->
			<h4>좋아요/싫어요</h4>
			<i onclick="myFunction(this)" class="fa fa-thumbs-up"></i>


		<!-- 평점 선택창 -->
		<div class="form-group">
			<h4>평점</h4>
		<div id = "rating1">
 			<span class="fa fa-star"></span>
 			<span class="fa fa-star"></span>
 			<span class="fa fa-star"></span>
 			<span class="fa fa-star"></span>
 			<span class="fa fa-star"></span>
 		</div>
 		<textarea rows="4" cols="100" class="form-control" id="reviews" name="reviews" placeholder="리뷰를 입력하세요"></textarea>
	</div>

		
			<button type="submit" class="btn btn-primary">등 록</button>

		
		
	</form>
</div>
<script>
$('.fa-star').click(function(){
    var i = $(this).index();
    $('.checked').removeClass('checked');
    $('.fa-star:lt('+(i+1)+')').addClass('checked');
});
</script>
<script>
function myFunction(x) {
  x.classList.toggle("fa-thumbs-down");
}
</script>
</body>
</html>
</layoutTag:layout>