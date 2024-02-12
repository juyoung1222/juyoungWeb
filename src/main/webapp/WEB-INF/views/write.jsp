<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h3>회원가입</h3>
<form action="/write" method="post">
계약번호:<input type="text" name="상품정보" id="plyno"><br/>
상품정보:<input type="text" name="상품정보" id="product_info"><br/>
계약기간:<input type="date" name="계약기간" id="contract_period"><br/>
보험시작일:<input type="text" name="보험시작일" id="start_date"><br/>
보험종료일:<input type="text" name="보험종료일" id="end_date"><br/>
<input type="submit" value="보험가입"><br/>
</form>
</body>
<script>
$(document).ready(function(){
	$('.addBtn').click(function(){
		$.ajax({
			url : '/write',
			type : 'post',
			data : {'plyno':$('#plyno').val()}, //전송할 데이터 -- 상품정보라는 파라미터 이름으로 감
			dataType : 'json',
			success : function(result){
				alert('가입생성되었습니다');
			},
			error:function(req, status){
				alert(status);
			}
		})
	})
})
</script>
</html>