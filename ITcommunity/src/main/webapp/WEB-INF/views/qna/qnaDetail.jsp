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
<title>qnaDetail.jsp</title>
<style>
.navbar-inverse .narbar-nav > .active > a,
.navbar-inverse .narbar-nav > .active > a:focus,
.navbar-inverse .narbar-nav > .active > a:hover{

	color:rgb(255,255,255);
	background-color:red
}
	ul{list-style:none; float:center; padding:6px;}
	
</style>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquey.com/ui/1.12.1/themes/base/jquey-ui.css">
</head>
<body>
<div class="container">
	<h2>질문 상세 정보</h2>
				
		
		<div class="form-group">
			<label class="control-label col-sm-2">번 호</label>
				<div class="col-sm-4">
					<input type="text" class="form-control" id="boardNo" name="boardNo" value="${detail.boardNo}" readonly="readonly"/>
				</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-2">제 목</label>
				<div class="col-sm-4">
					<input type="text" class="form-control" id="qnasubject" name="qnasubject" value="${detail.qnasubject}" readonly="readonly"/>
				</div>
		</div>	
		<div class="form-group">
			<label class="control-label col-sm-2">작 성 자</label>
				<div class="col-sm-4">
					<input type="text" class="form-control" id="userId" name="userId" value="${member.userId}" readonly="readonly"/>
				</div>
		</div>	
		<div class="form-group">
			<label class="control-label col-sm-2">질 문 내 용</label>
				<div class="col-sm-4">
					<input type="text" class="form-control" id="qnacontent" name="qnacontent" value="${detail.qnacontent}" readonly="readonly"/>
				</div>
		</div>	
		<div class="form-group">
			<label class="control-label col-sm-2">이 미 지</label>
				<div class="col-sm-4">
					<img src="/static/upload/${detail.qnaimagename}" alt="이미지업로드">
				</div>
		</div>
		
</div>

<!-- 댓글을 입력하는 영역 -->
	<div class="container">
		<label for="comment">댓글</label>
		<form name="commentInsertForm" >
			<div class="input-group">
				<input type="hidden" name="boardNo" id="boardNo" value="${detail.boardNo}" />
				<input type="hidden" name="replycontentid" id="replycontentid" value="${detail.boardNo}" />
				<input type="hidden" name="replywriterid" id="replywriterid" value="${member.userId}"/>
				<input type="hidden" name="replydate" id="replydate" value="${detail.qnaregdate}"/>
				<input type="text" class="form-control" id="replytext" name="replytext" placeholder="댓글을 입력하십시오"/>
				<span class="input-group-btn">
					<button class="btn btn-warning" type="submit" name="commentInsertBtn" id="commentInsertBtn">등록</button>
					
					
				</span>
			</div>
		</form>
	</div>
	
	<!-- 저장된 댓글을 보여주는 영역 -->
	<div class="container">
		<h6 class="border-bottom pb-2 mb-0">Reply list</h6>
		<form class="commentListForm" name="commentListForm">
			<div id="commentList">
			</div>
		</form>
	</div>

<!-- 댓글 목록 -->
<%@ include file="commentAction.jsp" %>

</body>
</html>
</layoutTag:layout>