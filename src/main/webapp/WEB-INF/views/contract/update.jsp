<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>계 약 내 용 수 정</title>  

 
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
	margin-right: 50px;
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
      	<h4 class="mb-3" align="center">계 약 내 용 수 정</h4>
	        <form class="form-horizontal" method="post" action="/contract/update">
	          <div class="find-btn">
	        	<button class="btn btn-success" type="button" id="addProBtn" onclick="location.href='/contract/contractDetailProductInfo'">상품추가</button>
	        	<button class="btn btn-warning" type="button" id="deleteProBtn" onclick="location.href='/contract/contractDetailProductInfoDelete'">상품삭제</button>
		       </div>
		          <c:forEach var="contract" items="${list}">
		          	   <div class="row">
				          <div class="col-sm-6 sm-6">
				              <label for="name">계약번호</label>
				              <input type="text" class="form-control" id="poly_id" name="poly_id" placeholder="" value="${contract.poly_id}" readonly="readonly">
				           </div>
				          <div class="col-sm-6 sm-6">
				              <label for="name">상품명</label>
				              <input type="text" class="form-control" id="product_info" name="product_info" placeholder="" value="${contract.product_info}" readonly="readonly">
				           </div>
				       </div>
			           <div class="row" id="addRow1">
				          	<div class="col-md-12" id="add_Row1">
				              <label for="nickname">담보명</label>
				              <input type="text" class="form-control" id="reg_info" name="reg_info" placeholder="" value="${contract.reg_info}" required>
				            </div>
				            <div class="col-md-6 mb-3" id="add_Row1">
				              <label for="nickname">가입금액</label>
				              <input type="text" class="form-control" id="register_pay" name="register_pay" placeholder="" value="${contract.register_pay}" required>
				            </div>
				            <div class="col-md-6 mb-3" id="add_Row1">
				              <label for="nickname">기준금액</label>
				              <input type="text" class="form-control" id="standard_pay" name="standard_pay" placeholder="" value="${contract.standard_pay}" required>
				            </div>
				        </div>   
			             <div class="row">
				          <div class="col-md-6 mb-3">
				            <label for="start_date">보험시작일</label>
				            <input type="text" class="form-control" id="start_date" name="start_date" placeholder="" value="${contract.start_date}" readonly="readonly">
				          </div>
				          <div class="col-md-6 mb-3">
				            <label for="end_date">보험종료일</label>
				            <input type="text" class="form-control" id="end_date" name="end_date" placeholder="" value="${contract.end_date}" required>
				          </div>
					   </div>
					   <div class="row">
				          <div class="col-sm-6 sm-3" id="status">
						      <label for="root">계약상태</label>
							         <select class="custom-select d-block w-100" id="status" name="status">
							             <option value="">선택</option>
							             <option value="1">정상유지</option>
							             <option value="2">청약철회</option>
							         </select>
					      </div>
					      <div class="col-sm-6 sm-6">
				              <label for="contract_period">계약기간</label>
				              <input type="text" name="contract_period" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" class="form-control" id="contract_period" placeholder="" value="${contract.contract_period}" required>
				           </div>
				  	   </div>
				  	   <hr class="mb-4">
		            		<div class="mb-4"></div>
		            		<button class="btn btn-primary btn-lg btn-block" type="submit">수정 완료</button>
				  </c:forEach>
				  
				 </form>
			    
		 </div>
	   </div>
	  <footer class="my-3 text-center text-small">
	      <p class="mb-1">&copy; 2024 JY</p>
	  </footer>
  </div>
</body>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>

</script>
</html>
