<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script src="https://code.jquery.com/jquery-3.4.1.js">

var imsi = "Good";
var polyId = '${contract.polyId}';
var maxFields = 5; //최대입력필드수 설정
var filedCount = 1; // 현재입력필드수
var row = $('.input_wrap'); //입력필드를 포함하는 div태그 클래스
var inputGroup = $('.input-group');
var addProBtn = $('#commentInsertBtn'); // 추가버튼
var listData = $('[name=productListForm]').serialize();
//담보추가 후 추가버튼 눌렀을 경우
alert('추가시작전');

$('[name=commentInsertBtn]').click(function(){
	alert('추가시작');

	var insertData = $('[name=productInfoInsertForm]').serialize();
	
	productInsert(insertData);
});
alert('추가왔지');
//담보추가등록
function productInsert(insertData){
	alert("추가해볼까");
	$.ajax({
		url : '/productInfo/insert',
		type : 'post',
		data : insertData,
		success : function(data){
			var str = '';
			if(data == 1){
				    productList(); //담보작성 후 목록 reload
				    $('[name=polyId]').val('');
				    $('[name=reg_info]').val('');
				    $('[name=contract_period]').val('');
				    $('[name=register_pay]').val('');
				    $('[name=standard_pay]').val('');
		     }else{
				alert("실패야...ㅠㅠ");
				productList();
			 }
		   }
		  });
		}

//초기 페이지 로딩시 댓글 불러오기
$(function(){
	productList();
});
//담보목록보기
function productList() {
	$.ajax({
		url : '/productInfo/productInfoList',
		type : 'get',
		data : {'polyId' : polyId},
		success : function(data){
			var str = '';
			$.each(data, function(key,value){
					str += '<input type="text" class="polyId'+value.polyId+'">';
					str += '<input type="text" class="reg_info'+value.reg_info+'">';
                    str += '<input type="text" class="contract_period'+value.contract_period+'">';
                    str += '<input type="text" class="register_pay'+value.register_pay+'">';
                    str += '<input type="text" class="standard_pay'+value.standard_pay+'">';
			});
			$("#productList").html(str);        
		  }
	    })
		// 콜백함수 : 요청 성공 시에 호출되는 함수
		// ajax 콜백 함수는 ajax 함수에 연결 연산자를 붙여서 사용한다.
		.done(function(data) {
			//alert("IMSI==>" + imsi);
			////alert(data);
			console.log(data);
		});
}
</script>

