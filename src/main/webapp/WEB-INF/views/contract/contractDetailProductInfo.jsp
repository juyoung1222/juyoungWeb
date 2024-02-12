<%@ page session="true" %>




<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>상 품 등 록 화 면</title>


<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<style>
body {
     min-height: 100vh;

     background: -webkit-gradient(linear, left bottom, right top, from(#ffe033), to(#ffe033));
     background: -webkit-linear-gradient(bottom left, #ffe033 0%, #ffe033 100%);
     background: -moz-linear-gradient(bottom left, #ffe033 0%, #ffe033 100%);
     background: -o-linear-gradient(bottom left, #ffe033 0%, #ffe033 100%);
     background: linear-gradient(to top right, #ffe033 0%, #ffe033 100%);
}
.input-form {
    max-width: 680px;

    margin-top: 80px;
    padding: 32px;

    background: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15)
}
.find-btn{
	text-align: right;
	margin-right: 30px;
}
.find-btn1{
	display :inline-block;
}
</style>
</head>
<body>
  <div class="container">
    <div class="input-form-backgroud row">
      <div class="input-form col-md-12 mx-auto">
      	<h4 class="mb-3" align="center">상 품 등 록 화 면</h4>
	          <form class="form-horizontal" method="post" action="/productInfo/ProductInsert">
	          	<div class="find-btn">
	          		<button class="btn btn-primary" type="submit">추가 완료</button>
	          	</div>
			        <div class="row">
				          <div class="col-sm-6 sm-6">
				              <label for="name">계약번호</label>
				              <input type="text" class="form-control" id="polyId" name="polyId" placeholder="계약번호를 입력해주세요" value="">
				           </div>
				          <div class="col-sm-6 sm-6">
				              <label for="contract_period">계약기간</label>
				              <input type="text" name="contract_period" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" class="form-control" id="contract_period" placeholder="계약기간을 입력해주세요" value="" required>
				         </div>
				   </div>
			       <div class="row" id="addRow1">
				         <div class="col-md-12" id="add_Row1">
				            <label for="nickname">담보명</label>
				            <input type="text" class="form-control" id="reg_info" name="reg_info" placeholder="담보명을 입력해주세요" value="" required>
				         </div>
				         <div class="col-md-6 mb-3" id="add_Row1">
				            <label for="nickname">가입금액</label>
				            <input type="text" class="form-control" id="register_pay" name="register_pay" placeholder="가입금액을 입력해주세요" value="" required>
				         </div>
				         <div class="col-md-6 mb-3" id="add_Row1">
				            <label for="nickname">기준금액</label>
				            <input type="text" class="form-control" id="standard_pay" name="standard_pay" placeholder="기준금액을 입력해주세요" value="" required>
				         </div>
				       </div>   
			        </form>
				    <!-- 담보 추가하는 영역부분 -->
				  	<hr>
			       	<div class="input_wrap" id="input_wrap">
			       		<div class="container">
		        			<form name="productInfoInsertForm">
					            <div class="input-group">
					                <!-- 정보들을 숨겨서 보낸다. -->
					                <div>
					                </div>
					              </div>
					                <button id="commentInsertBtn" class="btn btn-warning btn-lg btn-block" type="button" name="commentInsertBtn">추가</button>
						      </form>
					      </div>
					   </div>
					</div>
	    	    </div>
		        <footer class="my-3 text-center text-small">
		          <p class="mb-1">&copy; 2024 JY</p>
		        </footer>
          </div>
   </body>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>

$('#commentInsertBtn').click(function(){

	//var insertData = $('[name=productInfoInsertForm]').serialize();
	$('.input-group').append
('<div class="col-sm-6 sm-6" ><input type="text" class="form-control" id="polyId" name="polyId" placeholder="계약번호를 입력해주세요" value="" </div>');
	$('.input-group').append
('<div class="col-sm-6 sm-6"><input type="hidden" name="contract_period" class="form-control" id="contract_period" placeholder="" value="${contract.contract_period}"></div>');
	$('.input-group').append
('<div class="col-md-12" id="add_Row1"><label for="nickname">담보명</label><input type="text" class="form-control" id="reg_info" name="reg_info" placeholder="담보명을 입력해주세요" value=""></div>');
	$('.input-group').append
('<div class="col-sm-6 sm-6" id="add_Row1"><label for="nickname">가입금액</label><input type="text" class="form-control" id="register_pay" name="register_pay" placeholder="가입금액을 입력해주세요" value=""></div>');
	$('.input-group').append
('<div class="col-sm-6 sm-6" id="add_Row1"><label for="nickname">기준금액</label><input type="text" class="form-control" id="standard_pay" name="standard_pay" placeholder="기준금액을 입력해주세요" value=""></div><hr>');
});
</script>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>

</script>
</html>
