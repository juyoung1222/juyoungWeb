<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>
var insertData = $('#commentInsertForm').serialize();	//commentInsertForm의 내용을 가져온다.
var plyNo = $('#plyno').val();
$('#addBtn').click(function() {
	//alert("commentInsertBtn.....");
	//alert("commentList....");
	

	var insertData = $('#commentInsertForm').serialize();	//commentInsertForm의 내용을 가져온다.
	
	addBtnData(insertData);
	alert(insertData);	
	
	//commentInsert(boardno);	
	//commentList(listData);
	
});
//댓글등록
alert('스크립트시작전');
function addBtnData(insertData){
  alert(insertData);
  alert('스크립트시작');
    $.ajax({
        url : '/api/write',
        type : 'post',
        data : insertData,
        success : function(data){
            if(data == 1) {
            	alert('가입생성되었습니다/');
				alert('스크립트 성공');
            }
            else{
				alert('실패..ㅠㅠ');
            }    
        }
    
    });
}
</script>
<style>
table{
	width:50%;
}
td{
	background-color: gray;
}
</style>
<title>카카오페이손해보험 사전과제</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
	<h2>계약내용조회</h2>
		 <button type="button" class="addBtn">추가하기</button>
		 <button type="button" class="btn btn-primary">수정하기</button>
	<table border="1">
		<tr>
			<td colspan="7" align="center">테스트</td>
			<td colspan="2" align="center">테스트2</td>
		</tr>
		<tr>
			<th colspan="7">테스트</th>
			<th colspan="2">테스트2</th>
		</tr>
		<tr>
			<td colspan="3" align="center">테스트</td>
			<td colspan="3" align="center">테스트2</td>
			<td colspan="3" align="center">테스트2</td>
		</tr>
		<tr>
			<th colspan="3">테스트</th>
			<th colspan="3">테스트2</th>
			<th colspan="3">테스트2</th>
		</tr>
	</table>   
</body>
<body>
<h3>회원가입</h3>
<form action="/api/write" method="post" id="commentInsertForm" name="commentInsertForm">
<input type="hidden" name="polyNo" id="polyNo">
<input type="hidden" name="reg_info" id="reg_info">
상품정보:<input type="text" name="product_info" id="product_info"><br/>
계약기간:<input type="date"  name="contract_period" id="contract_period"><br/>
보험시작일:<input type="date" name="start_date" id="start_date"><fmt:formatDate value="${DateValue}" pattern="yy-MM-dd"/><br/>
보험종료일:<input type="date" name="end_date" id="end_date"><fmt:formatDate value="${DateValue}" pattern="yy-MM-dd"/><br/>
<button type="button" id="addBtn" name = "addBtn" onclick="addBtnData();">추가하기</button>
</form>
</body>
</html>
