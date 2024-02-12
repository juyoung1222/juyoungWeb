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
  <title>예 상 보 험 료 계 산 화 면</title>


<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>

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
 <div class="container" id="container">
    <div class="input-form-backgroud row">
				      <div class="input-form col-md-12 mx-auto">
				      	<h4 class="mb-3" align="center">예 상 보 험 료 계 산 화 면</h4>
				      	   
					          <form id="infoFormPayment" class="form-horizontal" method="post" action="/contract/contractDetailProductInfoPayment">
					          	<c:forEach var="productInfoList" items="${productInfoList}">
					          	   <c:if test="${not empty productInfoList}">
					          	 <div class="modal" id="myModal">
									<div class="modal-dialog">
										<div class="modal-content">
											<!-- Modal header -->
											<div class="modal-header">
												<h4 class="modal-title">예상보험료</h4>
												<button type="button" class="close" data-dismiss="modal">&times;</button>
											</div>
											<!-- Modal body -->
									  		<div class="modal-body">
									  		    
													<c:set var="sum1" value="${productInfoList.contract_period * productInfoList.register_pay / productInfoList.standard_pay}"/>	
													<b><font size="+1">${productInfoList.polyId} 님의 총 보험료 :<fmt:formatNumber pattern="####.##" value="${sum1}" />원 입니다.</font></b>
												
												
									    </div>
									<!-- Modal footer -->
								   <div class="modal-footer">
									 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
		    			</div>
					         <div class="row" id="row">
								          <div class="col-sm-6 sm-6">
								              <label for="name">계약번호</label>
								              <input type="text" class="form-control" id="polyId" name="polyId" placeholder="" value="">
								           </div>
								          <div class="col-sm-6 sm-6">
								              <label for="contract_period">계약기간</label>
								              <input type="text" name="contract_period" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" class="form-control" id="contract_period" placeholder="" value="">
								         </div>
								   </div>
							       <div class="row" id="addRow1">
							             <!--    <div class="col-md-12" id="add_Row1">
								            <label for="nickname">상품명</label>
								            <input type="text" class="form-control" id="product_info" name="product_info" placeholder="" value=""  required>
								         </div>
								           <div class="col-sm-6 sm-3" id="product_info">
										      <label for="root">계약상태</label>
											         <select class="custom-select d-block w-100" id="product_info" name="product_info" onchange="selectBoxChange(this.value);" >
											             <option value="">선택</option>
											             <option value="여행가자">여행가자</option>
											             <option value="갈꺼지?">갈꺼지?</option>
											         </select>
									      </div>-->
									      <div class="col-sm-6 sm-3" id="reg_info">
										      <label for="root">담보명</label>
											         <select class="custom-select d-block w-100" id="reg_info" name="reg_info" required="required">
											             <option value="">선택</option>
											             <option value="${productInfoList.reg_info}">${productInfoList.reg_info}</option>
											             <!--  <option value="항공지연연착보상금">항공지연연착보상금</option>-->
											         	
											         </select>
									      </div>
								        <!--   <div class="col-md-12" id="add_Row1">
								            <label for="nickname">담보명</label>
								            <input type="text" class="form-control" id="reg_info" name="reg_info" placeholder="" value=""  required>
								         </div>-->
								         <div class="col-md-6 mb-3" id="add_Row1">
								            <label for="nickname">가입금액</label>
								            <input type="text" class="form-control" id="register_pay" name="register_pay" placeholder="" value="">
								         </div>
								         <div class="col-md-6 mb-3" id="add_Row1">
								            <label for="nickname">기준금액</label>
								            <input type="text" class="form-control" id="standard_pay" name="standard_pay" placeholder="" value="">
								         </div>
								       </div>
								       <hr class="mb-4">
						            <div class="mb-4"></div>
						            <div class="btn-wrap">
						            	
								     	<button id="selectBtn" class="btn btn-primary btn-lg btn-block" type="button" onclick="" data-toggle="modal" data-target="#myModal">조회</button>
								     	<button id="resetBtn" class="btn btn-primary btn-lg btn-block" type="button">초기화</button>
								     	
									</div>
								</c:if>
						</c:forEach>
						</form>
					
					<footer class="my-3 text-center text-small">
						 <p class="mb-1">&copy; 2024 JY</p>
				   </footer>
				</div>
				
			</div>
		</div>
	</body>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>
var users = new Array();
var container = document.getElementById("container");
var inputValue = $("#polyId").val(); //get
var inputValue1 = $("#contract_period").val(); //get
var selectValue2 = $("select[name=reg_info] option:selected").text(); //get
var inputValue3 = $("#register_pay").val(); //get
var inputValue4 = $("#standard_pay").val(); //get

$("#selectBtn").click(function(){
	
	
	$.ajax({
		url : "/contract/contractDetailProductInfoPayment",
		type: 'post',
		data : {'polyId' : inputValue, 'contract_period' : inputValue1, 'reg_info' : selectValue2, 'register_pay' : inputValue3, 'standard_pay' : inputValue4},
		success : function(data){
			for(var i = 0; users.length; i++){
				if(users[i].polyId === inputValue){
					$("#polyId").val(users[i].polyId);
					break;
				}
				if(users[i].contract_period === inputValue1){
					$("#contract_period").val(users[i].contract_period);
					break;
				}
				if(users[i].reg_info === selectValue2){
					$('#reg_info option:checked').text(users[i].reg_info);
					break;
				}
				
				if(users[i].register_pay === inputValue3){
					$("#register_pay").val(users[i].register_pay);
					break;
				}
				if(users[i].standard_pay === inputValue4){
					$("#standard_pay").val(users[i].standard_pay);
					break;
				}
				
				
			}
			console.log(data);	
			
		},
		error : function(request, status, error){
			console.log(error);	
		}
			
	})
	// 콜백함수 : 요청 성공 시에 호출되는 함수
	// ajax 콜백 함수는 ajax 함수에 연결 연산자를 붙여서 사용한다.
	.done(function(data) {
		//alert("IMSI==>" + imsi);
		////alert(data);
		console.log(data);	
		$("#infoFormPayment").submit();
		//$("#myModal").submit();
	});
	
	
});

</script>
<script>
$("select[name=reg_info] option:selected").change(function(){
	$("select[name=reg_info]").val().prop("selected",true);
})
</script>
<script>
$("#resetBtn").click(function(){
	$(".form-control").val('');
})
</script>
</html>