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
		<form name="myForm" id="myForm" action="/community/insertProc" method="post" class="form-horizontal">
			
			
			<!-- 숨겨서 넘길 정보들 -->
			<input type="hidden" id="boardNo" name="boardNo" value="${detail.boardNo}"/>
			<input type="hidden" id="subject" name="subject" value="${detail.subject}"/>
			<input type="hidden" id="content" name="content" value="${detail.content}"/>
			<input type="hidden" id="boardlike" name="boardlike" value="${detail.boardlike}"/>
			<input type="hidden" id="writer" name="writer" value="${detail.writer}" />
			<input type="hidden" id="userId" name="userId" value="${member.userId}"/>
			
<div class="form-group">
	<div class="col-sm-2"></div>
	<div class="col-sm-6">
		<h2><span class="glyphicon glyphicon-file">게시글 상세 정보</span></h2>
	</div>
</div>

<c:if test="${admin != null}">
			<button type="button" class="btn btn-primary"    onclick="location.href='/community/communityDelete/${detail.boardNo}'">삭제</button>
			<button type="button" class="btn btn-default" onclick="location.href='/community/communityUpdate/${detail.boardNo}'">수정</button>
			<button type="button" class="btn btn-warning " onclick="location.href='/community/communityList'">목록</button>
</c:if>

<div class="form-group">
	<label class="control-label col-sm-2">게시글 번호</label>
	<div class="col-sm-4">
		<input type="text" class="form-control" id="boardNo" name="boardNo" value="${detail.boardNo}" readonly="readonly"/>
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
		<div class="form-group">
			<div class="btn-group btn-group-sm" role="group" style="float:right;">
			<div id="boardList">
				<button type="button" class="btn btn-default" id="like" value="좋아요" onclick="boardLike(this.form);">
							<span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;좋아요&nbsp;${detail.boardlike}</button><br><br>
				</div>
				<button type="button" class="btn btn-info"    onclick="location.href='/community/communityDelete/${detail.boardNo}'">삭제</button>
				<button type="button" class="btn btn-success" onclick="location.href='/community/communityUpdate/${detail.boardNo}'">수정</button>
				<button type="button" class="btn btn-danger " onclick="location.href='/community/communityList'">목록</button>
			</div>
		</div>
	</form>
</div>			
			<!--  <a class="btn btn-outline-dark heart">
				<img id="heart" src="">
			</a>-->
			
			
	
		

	
	<!-- 댓글을 입력하는 영역 -->
	<div class="container">
		<label for="comment">댓글</label>
		<form name="commentInsertForm" >
			<div class="input-group">
				<input type="hidden" name="boardNo" id="boardNo" value="${detail.boardNo}" />
				<input type="hidden" name="replycontentid" id="replycontentid" value="${detail.boardNo}" />
				<input type="hidden" name="replywriterid" id="replywriterid" value="${member.userId}"/>
				<input type="hidden" name="replydate" id="replydate" value="${detail.regdate}"/>
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
</div>
<script>
$(document).ready(function(){
	$(".btn-info").on("click",function(){
		if(${member == null}){
			alert("로그인을 하셔야 합니다.");
			location.href="/member/login";
			}
		else if(${member != null}){
			location.href="/community/communityDelete/${detail.boardNo}";
			}
		});
	$(".btn-success").on("click",function(){
		if(${member == null}){
			alert("로그인을 하셔야 합니다.");
			location.href="/member/login";
			}
		else if(${member != null}){
			location.href="/community/communityUpdate/${detail.boardNo}";
			}
		});
	})

</script>
<script>
$(document).ready(function(){
	$(".btn-primary").on("click",function(){
		if(${admin != null}){
			alert("관리자입니다.");
			location.href="/community/communityDelete/${detail.boardNo}";
			}
		});
	$(".btn-default").on("click",function(){
		if(${admin != null}){
			alert("관리자입니다.");
			location.href="/community/communityUpdate/${detail.boardNo}";
			}
		});
	$(".btn-warning").on("click",function(){
		if(${admin != null}){
			alert("관리자입니다.");
			location.href="/community/communityList";
			}
		});
	
	
})
</script>
<script>
//alert("script start...");

var loginId = document.getElementById("userId").value;

var boardlike='${detail.boardlike}';//좋아요

function boardLike(f){
	if(document.getElementById("like").value == "Y"){
		
		} else {
			$.ajax({
				url : '/community/like',
				type : 'post',
				dataType : 'json',
				data : {'boardNo' : boardNo,'userid' : loginId },
				success : function(data){
					boardlike++;
		
					document.getElementById("like").value = "N";
					document.getElementById("like").style.backgroundColor = "#ffffff";
					document.getElementById("like").style.color = "#000000";
					document.getElementById("like").innerHTML
						= '<span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;좋아요&nbsp;' + data + '';
					}
				});
	
			}
		}


</script>




<!-- 댓글 목록 -->
<%@ include file="commentAction.jsp" %>

</body>

</html>

</layoutTag:layout>

