<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" 	tagdir="/WEB-INF/tags" %>
<layoutTag:layout>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- summernote css/js -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-bs4.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-bs4.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
.checked {
  color: orange;
}
</style>
<title>Insert title here</title>
</head>
<body>
<div class="container-fluid">
	<h2 align="left">게 시 글 작 성</h2>
	<script>
	$(document).ready(function(){
		$('#summernote').summernote({
				placeholder : 'content',
				minHeight : 370,
				maxHeight : null,
				focus : true,
				lang : 'ko-KR'

			});
		});

	</script>
	<form class="form-horizontal" action="/board/insertProc" method="post" enctype="multipart/form-data">
	
	
		<input type="file" name="files">
		
		<button type="submit" class="btn btn-primary" onclick="/board/uploadList">등 록</button>
	</form>
	</div>
</body>
</html>
</layoutTag:layout>