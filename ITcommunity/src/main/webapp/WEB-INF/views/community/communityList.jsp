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
<title>boardList.jsp</title>
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
<div class="container-fluid">
	<h2 align="left">자 유 게 시 판</h2>
	
	
	<button class="btn btn-primary" onclick="location.href='/community/communityInsert'">글쓰기</button>
	

	<table class="table table-hover table-bodered">
		<tr>
				<td>
					<div class="btn-group">	
				<select class="form-control"  id="boardchoice" name="boardchoice" onchange="location.href='/community/communityList/'+ this.value">
				
				<c:if test="${boardchoice == all}">
						<!-- <option value="300"<c:if test="${boardchoice == 300}">selected</c:if>>전체</option> -->
						<option value="100"<c:if test="${boardchoice == 100}">selected</c:if>>공지글</option>
						<option value="200"<c:if test="${boardchoice == 200}">selected</c:if>>비밀글</option>
						
				</c:if>
				<c:if test="${boardchoice == '100'}">
						<!--  <option value="300"<c:if test="${boardchoice == 300}">selected</c:if>>전체</option>-->
						<option value="100"<c:if test="${boardchoice == 100}">selected</c:if>>공지글</option>
						<option value="200"<c:if test="${boardchoice == 200}">selected</c:if>>비밀글</option>
						
						
				</c:if>
				<c:if test="${boardchoice == '200'}">
						<!--  <option value="300"<c:if test="${boardchoice == 300}">selected</c:if>>전체</option>-->
						<option value="100"<c:if test="${boardchoice == 100}">selected</c:if>>공지글</option>
						<option value="200"<c:if test="${boardchoice == 200}">selected</c:if>>비밀글</option>
				</c:if>
			
			</select>
		</div>
	</td>
</tr>
			<tr>
				<th>#번호</th>
				<th>제목</th>
				<th>작성자</th>
				<th>내용</th>
				<th>작성일시</th>
				<th>조회수</th>
				
			<c:if test="${list.size() <= 0}">
			<tr>
				<td colspan="6" align="center">
				<strong>검색 결과가 없습니다!!</strong>
				</td>
			</tr>
		</c:if>
		
		<c:forEach var="community" items="${communitychoice}">
			<tr>
				<td class="info" onclick="location.href='/community/detailComment/${community.boardNo}'">${community.boardNo}</td>
				<td>${community.subject}</td>
				<td>${community.writer}</td>
				<td>${community.content}</td>
				<td>${community.regdate}</td>
				<td>${community.boardhit}</td>
				
				
			</tr>
		</c:forEach>
			<c:forEach var="community" items="${list}">
			<tr>
				<td class="info" onclick="location.href='/community/detailComment/${community.boardNo}'">${community.boardNo}</td>
				<td>${community.subject}</td>
				<td>${community.writer}</td>
				<td>${community.content}</td>
				<td><fmt:formatDate value="${community.regdate}" pattern="yyyy년 MM월 dd일"/></td>
				<td><c:out value="${community.boardhit}"/></td>
				
			</tr>
		</c:forEach>
	</table>
</div>	
	<ul class="pager justify-content-center">
		<c:if test="${pageMaker.prev}">
			<li class="page-item"><a href="/community/communityList${pageMaker.makeSearch(pageMaker.startPage-1)}">이전</a></li>
		</c:if>
		
		<c:forEach begin="${pageMaker.startPage}" end="${pageMaker.endPage}" var="idx">
			<li class="page-item"><a href="/community/communityList${pageMaker.makeSearch(idx)}">${idx}</a></li>
		</c:forEach>
		
		<c:if test="${pageMaker.next && pageMaker.endPage >0}">
			<li class="page-item"><a href="/community/communityList${pageMaker.makeSearch(pageMaker.endPage+1)}">다음</a></li>
		</c:if>
	</ul>
<!-- 검색 버튼 -->
<div class="row" style="clear:right;width:400px;margin:auto">
	<div class="col-lg-12">
		<form id="searchForm" action="/community/communityList">
			<select name="searchType">
				<option value="n"<c:out value="${scri.searchType == null ? 'selected' : ''}"/>>-----</option>
	      		<option value="s"<c:out value="${scri.searchType eq 's' ? 'selected' : ''}"/>>제목</option>
	      		<option value="c"<c:out value="${scri.searchType eq 'c' ? 'selected' : ''}"/>>내용</option>
	      		<option value="w"<c:out value="${scri.searchType eq 'w' ? 'selected' : ''}"/>>작성자</option>
	      		<option value="sc"<c:out value="${scri.searchType eq 'sc' ? 'selected' : ''}"/>>제목+내용</option>
				</select>
			<input type="text" name="keyword" id="keywordInput" value="${scri.keyword}"/>
			<button class="btn btn-primary btn-sm">검색</button>
		</form>
	</div>
</div>

  <script>
$(document).ready(function(){
        $('.btn-primary').click(function() {
       self.location = "/community/communityList" + '${pageMaker.makeQuery(1)}' + "&searchType=" + $("select option:selected").val() + "&keyword=" + encodeURIComponent($('#keywordInput').val());
        });
      }); 
</script>

<script>
$(document).ready(function(){
	$(".btn-primary").on("click",function(){
		
		if(${member == null}){
			alert("로그인을 하셔야 합니다.");
			location.href="/member/login";
			}
		else if(${member != null}){
			location.href="/community/communityInsert";
			}
		});
});
</script>
</body>
</html>
</layoutTag:layout>