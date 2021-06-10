<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	


<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" type="text/css" href="/maven2/js/jquery-ui-1.12.1/themes/blitzer/jquery-ui.min.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script type="text/javascript" src="/maven2/js/jquery/jquery.1.12.4.min.js"></script>
<script type="text/javascript" src="/maven2/js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="/maven2/js/jquery/jquery.blockUI.js"></script>
<script type="text/javascript" src="/maven2/js/jquery/jquery.loading.min.js"></script>
<script type="text/javascript" src="/maven2/js/common.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>



	
<script type="text/javascript">

	alert("ajax시작할꺼얌");
	function setload(){
		//var form = $("#sendForm")[0];
		let f = new FormData(document.getElementById("sendForm"));
		//var data1 = new FormData(form);
		alert("ajax시작");
		$.ajax({
			
			url :'./fileDownload.do',
			data : f,
			type : 'post',
			dataType : 'json',
			contentType:'application/json; charset=utf-8',
			processData: false,
			success : function(data){
				alert("ajax성공");
				
				alert(JSON.stringify(data));
				//document.getElementById('sendForm').html = JSON.stringify(data);
			
			},error:function(request,status,error){
		        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	
	}
	


</script>


</head>

<body>
<form name="sendForm" id="sendForm" method="post" action="./fileDownload.do" onsubmit="return false;" encType="multipart/form-data">

<input type="hidden" id="situSeq" name="situSeq" value="">
<input type="hidden" id="mode" name="mode" value="Cre">

<div id="wrap"  class="col-md-offset-1 col-sm-10" >
		<div align="center"><h2>회계정보리스트</h2></div>
		<div class="form_box2 col-md-offset-7" align="right" >
			<div class="right" >
				<button class="btn btn-primary" onclick="location.href='../account/accountInsert.do'" >등록</button>
				<button type="button" class="btn btn-success" onclick="setload()"  >엑셀 다운</button>
			</div>
		</div>
	    <br/>
		<table class="table table-hover">
			    <thead>
			    
			      <tr align="center">
			        <th style="text-align: center;" >수익/비용</th>
			        <th style="text-align: center;" >관</th>
			        <th style="text-align: center;" >항</th>
			        <th style="text-align: center;" >목</th>
			        <th style="text-align: center;" >과</th>
			        <th style="text-align: center;" >금액</th>
			        <th style="text-align: center;" >등록일</th>
			        
			      </tr>
			    </thead>
			    <tbody>
					
						<c:forEach var="account" items="${selectList}">
					<tr>
						<td style="text-align : center;">${account.profit_cost}</td>
						<td style="text-align : center;">${account.big_group}</td>
						<td style="text-align : center;">${account.middle_group}</td>
						<td style="text-align : center;">${account.small_group}</td>
						<td style="text-align : center;">${account.detail_group}</td>
						<td style="text-align : center;">${account.transaction_money}</td>
						<td style="text-align : center;"><fmt:formatDate value="${account.transaction_date}" pattern="yyyy년 MM월 dd일"/></td>
						
					</tr>
				</c:forEach>
					
			    </tbody>
			</table>
			<!-- 페이지 네비게이션 -->
			<div class="paginate_box">
				<div class="paginate_complex">
					<ui:pagination paginationInfo = "${pagenationInfo}" type="image" jsFunction="linkPage"/>
				</div>
			</div>

</div>
</form>


</body>

