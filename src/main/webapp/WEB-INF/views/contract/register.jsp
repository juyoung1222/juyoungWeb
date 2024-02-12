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
  <title>가 입 신 청 서</title>

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
  </style>
</head>
<body>
  <div class="container">
    <div class="input-form-backgroud row">
      <div class="input-form col-md-12 mx-auto">
        <h4 class="mb-3" align="center">가 입 신 청 서</h4>
        <form class="form-horizontal" method="post" action="/contract/register">
          <div class="row">
          <div class="col-md-6 mb-3">
              <label for="name">계약번호</label>
              <input type="text" class="form-control" id="poly_id" name="poly_id" placeholder="계약번호를 입력해주세요" value="" required>
            </div>
            <!--  <div class="col-md-6 mb-3">
              <label for="name">상품명</label>
              <input type="text" class="form-control" id="product_info" name="product_info" placeholder="상품명을 입력해주세요" value="" required>
            </div>-->
             <div class="col-sm-6 sm-3" id="product_info">
				<label for="root">상품명</label>
					<select class="custom-select d-block w-100" id="product_info" name="product_info" >
						<option value="">선택</option>
						<option value="여행보험">여행보험</option>
						<option value="휴대폰보증보험">휴대폰보증보험</option>
					</select>
			</div>
            <!--  <div class="col-md-6 mb-3">
              <label for="nickname">담보명</label>
              <input type="text" class="form-control" id="reg_info" name="reg_info" placeholder="가입명을 입력해주세요" value="" required>
            </div>-->
          </div>
          <div class="row">
            <div class="col-sm-6 sm-3" id="reg_info">
				<label for="root">담보명</label>
					<select class="custom-select d-block w-100" id="reg_info" name="reg_info" >
						<option value="">선택</option>
						<option value="상해치료비">상해치료비</option>
						<option value="부분손실">부분손실</option>
					</select>
			</div>
		  </div>
          <div class="row">
			  <div class="col-md-6 mb-3">
	              <label for="contract_period">계약기간<b><font size="-1">※계약기간은 월단위입니다.</font></b></label>
	              <input type="text" name="contract_period" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" class="form-control" id="contract_period" placeholder="계약기간를 입력해주세요" value="" required>
	          </div>
	      </div>
	       
		  <div class="row">
	          <div class="col-md-6 mb-3">
	            <label for="start_date">보험시작일<b><font size="-1">※보험시작일은은 8자리입니다.</font></b></label>
	            <input type="text" class="form-control" id="start_date" name="start_date" placeholder="보험시작일을 입력해주세요" required>
	          </div>
	          <div class="col-md-6 mb-3">
	            <label for="end_date">보험종료일<b><font size="-1">※보험종료일은 8자리입니다.</font></b></label>
	            <input type="text" class="form-control" id="end_date" name="end_date" placeholder="보험종료일을 입력해주세요" required>
	          </div>
		  </div>
		  <div class="row">
	          <div class="col-md-6 mb-3">
	            <label for="register_pay">가입금액</label>
	            <input type="text" name="register_pay" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" class="form-control" id="register_pay" placeholder="가입금액을 입력해주세요.">
	          </div>
	          <div class="col-md-6 mb-3">
	            <label for="standard_pay">기준금액</label>
	            <input type="text" name="standard_pay" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" class="form-control" id="standard_pay" placeholder="기준금액을 입력해주세요.">
	          </div>
	      </div>
	      <div class="row">
	      		<div class="col-md-6 mb-3" id="status">
	      		  <label for="root">계약상태</label>
		              <select class="custom-select d-block w-100" id="status" name="status">
		                <option value="">선택</option>
		                <option value="1">정상유지</option>
		              </select>
	           </div>
          </div>
           <!--  <div class="row">
	          <div class="col-md-6 mb-3">
	            <label for="status">계약상태</label>
	            <input type="text" id="status" name="status" class="form-control" id="status" placeholder="">
	          </div>
	      </div>-->
	      <input type="hidden" id="user_pw" name="user_pw"/>
	      <hr class="mb-4">
          <div class="mb-4"></div>
          <button class="btn btn-primary btn-lg btn-block" type="submit">가입 완료</button>
        </form>
      </div>
    </div>
    <footer class="my-3 text-center text-small">
      <p class="mb-1">&copy; 2024 JY</p>
    </footer>
  </div>
<script>
</script>
</body>
</html>
