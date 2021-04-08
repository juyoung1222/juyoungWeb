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
<style>
	#fileDrop{
		width : 600px;
		height : 80px;
		border : 1px solid gray;
		background-color : gray;
	}
</style>

<title>Insert title here</title>

<script>
function updateBoard(seq){
	var form = document.boardForm;
	if(confirm("수정하시겠습니까?") == true){
		alert("수정");
			//location.href="./modify1.ino";
		form.action ="./modify1.ino?num=" + seq;
		form.method="POST";
		form.submit();
		alert("수정하였습니다.");
	}
};
//$(document).ready(function(){
	//var formObj = $("form[name='boardForm']");
	//$(".update_Btn").on("click",function(){
		//alert("수정");
		//formObj.attr("action", "./modify1.ino");
		//formObj.attr("method","post");
		//formObj.submit();
		//alert("수정되었습니다.");
	//});
//})



</script>


<script>
function deleteBoard(seq) {
	if (confirm("삭제하시겠습니까?") == true) {
		alert("삭제");
			location.href ='./delete1.ino?num=' + seq;
			alert("삭제하였습니다.");
	};
};
</script>



<script>
alert("삭제");
function deletefile(seq){
	
	if(confirm("삭제하시겠습니까?") == true){
			
		$('#file').val('');
		//document.getElementByName(["file"]).value='';
		//location.href='./deletefile.ino';
		//reset();
		
		alert("삭제하였습니다.");
	}
};

//$("#removeTest").click(function(){
	//$('input').remove();
//});
</script>
<script>
//alert("삭제");
//$(document).ready(function(){
	//$("a[name='file_delete']").on("click",function(e){
		//e.preventDefault();
		//deleteFile($this);
	//});
//})
//alert("삭제하였습니다.");
//function deleteFile(obj){
	//obj.parent().remove();
//}

</script>



</head>
<body>

	<div>
		<h1>자료실</h1>
	</div>
	<div style="width:650px;" align="right">
		<a href="./main1.ino">리스트로 </a>
	</div>
	<hr style="width: 600px">
	
	<form id="form" action = "./modify1.ino" method="post" style="text-align: left;" name="boardForm" encType ="multipart/form-data">	
			<input type="hidden" id="seq1" name="seq1" value="${dto.seq}"/><br/>
		제목 : <input type="text" id="title" name="title" value="${dto.title}"/><br/>
		날짜 : <input type="text" id="regdate" name="regdate" value="${dto.regdate}"/><br/>
		내용 : <textarea rows="20" cols="60" name="content" id="content" >${dto.content}</textarea><br/>
		이름 : <input type="text" id="name" name="name"value="${dto.name}" readonly/><br/>
		<div id="uploadedList" class="file_del">
		   <input type="text" id="file" value="${dto.boardimageName}" name="file">
		    <input type="button"   id="delete_file" value="삭제" value="Reset" onclick="deletefile(${dto.seq})"/>
		파일 : <input type="file" id="files[0]" name="files[0]" value="${dto.boardimageName}"/>
			 
			   
			   
		</div> 
		
		<div class="container-fluid">
			<input type="button" value="수정" class="update_Btn" onclick="updateBoard(${dto.seq})">
			
			<input type="button" value="삭제" onclick="deleteBoard(${dto.seq})">
			<input type="button" value="취소" onclick="removeCheck()">
				&nbsp;&nbsp;&nbsp;
		</div>
</form>



<script>
function removeCheck(){
	if(confirm("정말로 취소하시겠습니까?") == true ){
		location.href="main1.ino";
	}else{
		return  false;
	}
}
</script>






		
		
	
	
	
</body>
</html>