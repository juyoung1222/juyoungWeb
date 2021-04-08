<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib  uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head profile="http://www.w3.org/2005/10/profile">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">


<title>Insert title here</title>

<script>

	//var Num = '${dto.seq}';
	//alert("삭제");
function deleteBoard(seq) {
	if (confirm("삭제하시겠습니까?") == true) {
		//alert("삭제");
			location.href ='./delete.ino?num=' + seq;
			//alert("삭제하였습니다.");
	};
};
//$(document).ready(function(){
	//var formObj = $("form[name='readForm']");
	
	//$(".delete_btn").on("click",function(){
		//formObj.attr("action","/delete.ino");
		//formObj.attr("method", "post");
		//formObj.submit();
	//})
//})

//$(document).ready(function(){
	//$(".btn-default").on("click",function(){
		//location.href="./delete.ino?num=" + ${dto.seq};
	//});
//});
//$(document).ready(function(){
	//alert("삭제");
	//$("#btnDelete").click(function(){
		//if(confirm("삭제하시겠습니까?")){
			//alert("삭제");
			//document.form.action = "./delete.ino";
			//alert("삭제하였습니다.");
			//document.form.submit();
		//}
	//});
//})
</script>
</head>
<body>

	<div>
		<h1>자유게시판</h1>
	</div>
	<div style="width:650px;" align="right">
		<a href="./main.ino">리스트로</a>
	</div>
	<hr style="width: 600px">
	
	<form id="form" action = "./modify.ino" method="post" style="text-align: left;" name="boardForm" >	
			<input type="hidden" id="seq" name="seq" value="${dto.seq}" readonly/><br/>
		제목 : <input type="text" id="title" name="title" value="${dto.title}" readonly/><br/>
		날짜 : <fmt:formatDate value="${dto.regdate}" pattern="YYYY년 MM월 dd일"  /><br/>
		내용 : <textarea rows="20" cols="60" name="content" id="content" readonly>${dto.content}</textarea><br/>
		이름 : <input type="text" id="name" name="name"value="${dto.name}" readonly/><br/>
		
	
	<div class="form-inline">	
		<button type="submit">수정</button>
		<!--  <button type="submit" class="delete_btn">삭제</button>-->
		  <input type="button" value="삭제" onclick="deleteBoard(${dto.seq})">
		<!-- <button type="button" id="btnDelete">삭제</button>	 -->	
		<!--  <button type="button" class="btn btn-default" onclick="location.href='./delete.ino?num=${dto.seq}'">삭제</button>	-->
		<!--  <button type="button" id="btnDelete">삭제</button>	-->			
		<input type="button" value="취소" onclick="removeCheck()">
			&nbsp;&nbsp;&nbsp;
	</div>
</form>



<script>
function removeCheck(){
	if(confirm("정말로 취소하시겠습니까?") == true ){
		location.href="main.ino";
	}else{
		return  false;
	}
}
</script>



		
		
	
	
	
</body>
</html>