<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<style>
table{
	width:50%;
}
.find-btn{
	text-align: right;
	margin-right: 50px;
}
.find-btn1{
	display :inline-block;
}
body 
{
      min-height: 100vh;

      background: -webkit-gradient(linear, left bottom, right top, from(#ffe033), to(#ffe033));
      background: -webkit-linear-gradient(bottom left, #ffe033 0%, #ffe033 100%);
      background: -moz-linear-gradient(bottom left, #ffe033 0%, #ffe033 100%);
      background: -o-linear-gradient(bottom left, #ffe033 0%, #ffe033 100%);
      background: linear-gradient(to top right, #ffe033 0%, #ffe033 100%);
}
th{
	background-color: gray;
}
td{
	background-color: white;
}
input type="text"{
  width:50px;
  height:30px;
  font-size:20px;
}
</style>
<title>계약내용조회</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
	<h2 align="center">계약내용조회</h2>
	
		<div class="find-btn">
				<button class="btn btn-success" type="button" id="upBtn" onclick="location.href='/contract/update'">수정하기</button>
				<button class="btn btn-primary" type="button" id="selectBtn" onclick="location.href='/contract/contractDetailProductInfoPayment'">예상보험료계산</button>
		</div>
		
					<table border="1" align="center" id="tblShow">
						<tr>
							<th colspan="3"><input type="checkbox" name="chkRowAll" id="chkRowAll"/></th>
							<th colspan="3" align="center">계약아이디</th>
							<th colspan="3" align="center">상품명</th>				
							<th colspan="3" align="center">계약기간</th>
						</tr>
						<c:forEach var="contract" items="${list}">
						<tr>
							<td></td>
							<td colspan="3">${contract.poly_id}</td>
							<td colspan="3">${contract.product_info}</td>
							<td colspan="3"><span>1개월</span><span> ~ </span>${contract.contract_period}<span>개월</span></td>
						</tr>
						</c:forEach>
						<tr>
							<th colspan="3"></th>
							<th colspan="3" align="center">담보명</th>
							<th colspan="3" align="center">가입금액</th>
							<th colspan="3" align="center">기준금액</th>
						</tr>
						<c:forEach var="contract" items="${list}">
						 <!--   <c:if test="${empty productInfoList}">-->
							    <tr>
								  <td></td>
									<td colspan="3">${contract.reg_info}</td>
									<td colspan="3"><fmt:formatNumber pattern="###,###" value="${contract.register_pay}"/><span>원</span></td>
									<td colspan="3"><fmt:formatNumber pattern="###,###" value="${contract.standard_pay}"/><span>원</span></td>
							     </tr>
							     <c:set var="sum" value="${contract.contract_period * contract.register_pay / contract.standard_pay}"/>
							     <tr class="danger">
										<td colspan="12" align="right">
											<b><font size="+1">총 보험료 :<fmt:formatNumber pattern="####.##" value="${sum + sum1}" />원</font></b>
										</td>
						         </tr>
							     
					  <!--  </c:if> -->
				       <c:forEach var="list" items="${productInfoList}">
				       	 <c:if test="${!empty productInfoList}">
				       	 	      <tr>
								  <td></td>
									<td colspan="3">${contract.reg_info}</td>
									<td colspan="3"><fmt:formatNumber pattern="###,###" value="${contract.register_pay}"/><span>원</span></td>
									<td colspan="3"><fmt:formatNumber pattern="###,###" value="${contract.standard_pay}"/><span>원</span></td>
							    </tr>
							    <tr>
								<td></td>
									<td colspan="3">${list.reg_info}</td>
									<td colspan="3"><fmt:formatNumber pattern="###,###" value="${list.register_pay}"/><span>원</span></td>
									<td colspan="3"><fmt:formatNumber pattern="###,###" value="${list.standard_pay}"/><span>원</span></td>
							     </tr>
							      <c:set var="sum" value="${contract.contract_period * contract.register_pay / contract.standard_pay}"/>
							      <c:set var="sum1" value="${list.contract_period * ((list.register_pay / list.standard_pay) + (list.register_pay / list.standard_pay))}"/>
								     <tr class="danger">
										<td colspan="12" align="right">
											<b><font size="+1">총 보험료 :<fmt:formatNumber pattern="####.##" value="${sum + sum1}" />원</font></b>
										</td>
						           </tr>
						</c:if>
				</c:forEach>
		</c:forEach>
	</table>
</body>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>
//상단 수정하기 버튼 클릭 시 체크된 row의 값 가져온다.
$("#upBtn").click(function(){
	var rowData = new Array();
	var arr = new Array();
	
	var checkbox = $("input[name=chkRowAll]:checked");

	//체크된 체크박스 값을 가져온다.
	checkbox.each(function(i){

	//checkbox.parent() : checkbox의 부모는 <td>이다.
	//checkbox.parent().parent() : td의 부모이므로 <tr>이다.
	var tr = checkbox.parent().parent().eq(i);
	var td = tr.children();

	// 체크된 row의 모든 값을 배열에 담는다.                
	rowData.push(tr.text());

	// td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
	var poly_id = td.eq(1).text()+", ";
	var product_info = td.eq(2).text()+", ";
	var contract_period = td.eq(3).text()+", ";
	var end_date = td.eq(4).text()+", ";
	var reg_info = td.eq(5).text()+", ";
	var register_pay = td.eq(6).text()+", ";
	var standard_pay = td.eq(7).text()+", ";

	arr.push(poly_id);
	arr.push(product_info);
	arr.push(contract_period);
	arr.push(end_date);
	arr.push(reg_info);
	arr.push(register_pay);
	arr.push(standard_pay);
	});
})
</script>
<script>
//상단 예상보험료 버튼 클릭 시 체크된 row의 값 가져온다.
$("#selectBtn").click(function(){
	var rowData = new Array();
	var arr = new Array();
	
	var checkbox = $("input[name=chkRowAll]:checked");

	//체크된 체크박스 값을 가져온다.
	checkbox.each(function(i){

	//checkbox.parent() : checkbox의 부모는 <td>이다.
	//checkbox.parent().parent() : td의 부모이므로 <tr>이다.
	var tr = checkbox.parent().parent().eq(i);
	var td = tr.children();

	// 체크된 row의 모든 값을 배열에 담는다.                
	rowData.push(tr.text());

	// td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
	var poly_id = td.eq(1).text()+", ";
	var product_info = td.eq(2).text()+", ";
	var contract_period = td.eq(3).text()+", ";
	var end_date = td.eq(4).text()+", ";
	var reg_info = td.eq(5).text()+", ";
	var register_pay = td.eq(6).text()+", ";
	var standard_pay = td.eq(7).text()+", ";

	arr.push(poly_id);
	arr.push(product_info);
	arr.push(contract_period);
	arr.push(end_date);
	arr.push(reg_info);
	arr.push(register_pay);
	arr.push(standard_pay);
	});
})
</script>

</html>