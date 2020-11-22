<%@ page session="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" 	tagdir="/WEB-INF/tags" %>

<layoutTag:layout>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>proUpdate.jsp</title>
</head>
<body>		
<div class="container-fluid">
	<form class="form-horizontal" method="post" action="/login/proUpdate">
		<div class="form-group">
		<div class="col-sm-2"></div>
		<div class="col-sm-6">
			<h2 align="left">회 원 정 보 수 정</h2>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon-user">아 이 디</span></label>
			<div class="col-sm-6">
			<input type="text" class="form-control" id="userId" name="userId" value="${member.userId}"
			maxlength=20 readonly="readonly"/>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon-eye-open">비 밀 번 호</span></label>
			<div class="col-sm-6">
			<input type="password" class="form-control" id="userPw" name="userPw" value="${member.userPw}"
			maxlength=20 />
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-user">이 름</span></label>
			<div class="col-sm-6">
			<input type="text" class="form-control" id="userName" name="userName" value="${member.userName}"
			maxlength=20/>
		</div>
	</div>
	
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-user">성 별</span></label>
			<input type="checkbox"  id="gender" name="gender" value="female"/>여성
			<input type="checkbox" id="gender" name="gender" value="male"/>남성
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-user">생 년 월 일</span></label>
		<div class="col-sm-6">
		<input type="text" class="form-control" id="userBirth" name="userBirth" maxlength=10 value="${member.userBirth}" readonly="readonly"/>
		<fmt:formatDate value="${DateValue}" pattern="yyyy-MM-dd" />
	</div>
</div>
<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-home">우편번호</span></label>
		<div class="col-sm-6">
			<input type="text" class="form-control" name="zipcode"
			id="zipcode" readonly/>
			<input type="button" class="form-control"
			onclick="daumZipCode()" value="우편번호검색"/>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-home">주소</span></label>
		<div class="col-sm-6">
			<input type="text" class="form-control" name="address01" id="address01" value="${member.address01}" readonly="readonly"/>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-home">상세주소</span></label>
		<div class="col-sm-6">
			<input type="text" class="form-control" name="address02" id="address02" value="${member.address02}" readonly="readonly"/>
		
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-phone-alt">전 화 번 호</span></label>
			<div class="col-sm-2" id="tel1">
			<select class="form-control" name="tel1">
				<option value="010">010</option>
				<option value="011">011</option>
				<option value="017">017</option>
				<option value="018">018</option>
				<option value="019">019</option>
			</select>
		</div>
			<div class="input-group col-sm-3">
				<div class="input-group-addon">-</div>
				<div><input type="text" class="form-control col-sm-1" id="tel2"name="tel2" 
					maxlength="4" value="${member.tel2}" readonly="readonly"/>
				</div>
				<div class="input-group-addon">-</div>
				<div><input type="text" class="form-control col-sm-1" id="tel3" name="tel3" 
					maxlength="4" value="${member.tel3}"  readonly="readonly"/>
				</div>
			</div>
		</div>
		<div class="form-group">
		<label class="control-label col-sm-2"><span class="glyphicon glyphicon glyphicon glyphicon-send">이 메 일</span></label>
			<div class="col-sm-6">
			<input type="email" class="form-control" id="userEmail" name="userEmail"
			maxlength=40 value="${member.userEmail}" readonly="readonly"/>
		</div>
	</div>
	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-4">
			<button class="btn btn-success" type="submit" id="submit">회원정보수정</button>
			<button class="btn btn-danger cancel" type="button">취소</button> 
		</div>
	</div>
</form>

</div>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
    //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
    function daumZipCode() {
	new daum.Postcode({
		oncomplete: function(data) {
			//팝업창에서 검색한 결과 중 항목을 클릭하였을 경우에 
			//실행할 코드를 이곳에 작성한다.

			//각 주소의 노출 규칙에 따라 주소를 조합한다.
			//내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로,
			//이름 참고하여 분기한다.
			var fullAddr  = '';	//최종 주소 변수
			var subAddr   = ''; //조합형 주소 변수

			//사용자가 선택한 주소의 타입에 따라서 해당 주소값을 가져온다.
			if(data.userSelectedType == 'R') { //도로명 주소를 선택한 경우
				fullAddr = data.roadAddress;
			} else { //지번 주소를 선택한 경우
				fullAddr = data.jibunAddress;
			}

			//사용자가 선택한 주소가 도로명 타입일 때 조합한다.
			if(data.userSelectedType == 'R') {
				//법정동명이 있을 경우 추가한다.
				if(data.bname != '') {
					subAddr += data.bname;
				}
				//건물명이 있을 경우에 추가한다.
				if(data.buildingName != '') {
					subAddr += (subAddr != '' ? ', ' + data.buildingName : data.buildingName);
				}
				//조합형 주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (subAddr != '' ? '(' + subAddr + ')' : '');
			}
			//우편번호와 주소정보를 행당 필드에 나타낸다.
			//5자리의 새 우편번호
			document.getElementById('zipcode').value   = data.zonecode; 
			document.getElementById('address01').value = fullAddr;
			//커서를 상세주소 입력필드로 이동시킨다.
			document.getElementById('address02').focus();
		}
	}).open();
}
</script>
</body>
</html>
</layoutTag:layout>