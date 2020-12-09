<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt" %>
<%@ taglib tagdir="/WEB-INF/tags" 				   prefix="layoutTag" %>
<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<layoutTag:layout>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>댓글을 달 수 있는 상세정보 화면</title>
</head>
<body>

<div class="container">
	
	<div class="col-xs-12">
		<form action="/board/insertProc" method="post" class="form-horizontal">
			
			<div class="form-group">
	<div class="col-sm-2"></div>
	<div class="col-sm-6">
		<h2><span class="glyphicon glyphicon-file">게시글 상세 정보</span></h2>
	</div>
</div>
<div class="form-group">
	<label class="control-label col-sm-2">게시글 번호</label>
	<div class="col-sm-4">
		<input type="text" class="form-control" id="boardno" name="boardno" value="${detail.boardno}" readonly="readonly"/>
	</div>
</div>
<div class="form-group">
	<label class="control-label col-sm-2">제 목</label>
	<div class="col-sm-6">
	<input type="text" class="form-control" id="subject" name="subject" value="${detail.subject}" readonly="readonly"/>
	</div>
</div>	
<div class="form-group">
	<label class="control-label col-sm-2">작 성 자</label>
	<div class="col-sm-6">
	<input type="text" class="form-control" id="writer" name="writer" value="${detail.writer}" readonly="readonly"/>
	</div>
</div>
<div class="form-group">
	<label class="control-label col-sm-2">내용</label>
	<div class="col-sm-6">
		<input type="text" class="form-control" id="content" name="content" value="${detail.content}" readonly="readonly"/>
	</div>
</div>
		</form>
		<div class="btn-group btn-group-sm" role="group" style="float:right;">
			<button type="button" class="btn btn-info"    onclick="location.href='/board/boardDelete/${detail.boardno}'">삭제</button>
			<button type="button" class="btn btn-success" onclick="location.href='/board/boardUpdate/${detail.boardno}'">수정</button>
			<button type="button" class="btn btn-danger " onclick="location.href='/board/boardList'">목록</button>
		</div>
	</div>
	
	<!-- 댓글을 입력하는 영역 -->
	<div class="container">
		<label for="comment">댓글</label>
		<form name="commentInsertForm">
			<div class="input-group">
				<input type="hidden" name="boardno" id="boardno" value="${detail.boardno}" />
				<input type="hidden" name="replycontentid" id="replycontentid" value="${detail.boardno}" />
				<input type="hidden" name="replywriterid" id="replywriterid" value="${member.userId}"/>
				<input type="hidden" name="replydate" id="replydate" value="${detail.regdate}"/>
				<input type="text" class="form-control" id="replytext" name="replytext" placeholder="댓글을 입력하십시오"/>
				<span class="input-group-btn">
					<button class="btn btn-warning" type="submit" name="commentInsertBtn">등록</button>
					
					
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
</div>
<script>
$(document).ready(function(){
	$(".btn-info").on("click",function(){
		if(${member == null}){
			alert("로그인을 하셔야 합니다.");
			location.href="/login/login";
			}
		else if(${member != null}){
			location.href="/board/boardUpdate";
			}
		});
	$(".btn-success").on("click",function(){
		if(${member == null}){
			alert("로그인을 하셔야 합니다.");
			location.href="/login/login";
			}
		});
	})

</script>


<!-- 댓글 목록 -->
<%@ include file="commentAction.jsp" %>

</body>

</html>

</layoutTag:layout>

