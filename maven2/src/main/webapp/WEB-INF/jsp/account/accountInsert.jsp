<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ page session="true" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>




<script>
//$(document).ready(function(){
	//alert("ajax시작할꺼얌");
	
//})
	//alert("ajax시작할꺼얌");
function setBox(sParam){
	//alert("ajax시작!");
	//var project = $('#profitCost');
	var select = $("#profit_cost").val();
	var select1 = $('#big_group').val();
	var select2 = $('#middle_group').val();
	var select3 = $("#small_group").val();
	var select4 = $("#detail_group").val();
	var select5 = $("#comments").val();
	var select6 = $("#transaction_money").val();

	//alert("ajax 시작시작");
	$.ajax({
		
		//url : './selectCombo.do',
		//type : 'post',
		//dataType : 'json',
		//data : {'code' : code, 'com_kor' :  comKor},
		//success : function(data){
			//alert("ajax성공");
			//alert(data.message);
			//$(select).children().remove();
			//$(select).append('<option value="">선택</option>');
			//$(select1).append('<option value="">선택</option>');
			//$(select2).append('<option value="">선택</option>');
			//$(select3).append('<option value="">선택</option>');
			
			//var result = data['result'];
			//var code = "";
			
			//for(var i = 0 ; i<data.length; i++){
				
				//code = data['resultCode' + i + ''];
				//comKor = data['resultComKor' + i + ''];
				
				//$(select).append('<option value="' + data.code+ '">' + data.comKor + '</option>');
				//$(select1).append('<option value="' + data.code+ '">' + data.comKor + '</option>');
				//$(select2).append('<option value="' + data.code+ '">' + data.comKor + '</option>');
				//$(select3).append('<option value="' + data.code+ '">' + data.comKor + '</option>');
				
				//if(data.length == 0){
					//$(select).append('<option value="">선택</option>'); 
			//}else{
				//$(select).each(function(i){
					//$(select).append('<option value="' + data.code+ '">' + data.comKor + '</option>');
			//});
				//}
			//}
		//},
		   //error:function(request,status,error){
		        //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		 //}
		
		url : './selectCombo.do',
		type : 'post',
		dataType : 'json',
		data : { 'select' :select, 'select1' : select1, 'select2' : select2,
				 'select3' : select3, 'select4' : select4,'select5' : select5,
				 'select6' : select6
				},
		success : function(data){
			//alert("ajax성공");
			//alert(data.result);
			//alert(JSON.stringify(data));
			//console.log(data);
			
			if(data == null){
				//==alert("data = 0");
				data = 0
				}
			if(data != null){
				//alert("data != null 데이터 있음");
			}
			
			//console.log(data.data[i].code);
			//console.log(data.data[i].comKor);
			//$(project).children().remove();
			
			//$(select).append('<option value="">선택</option>')
			//$(select1).append('<option value="">선택</option>');
			//$(select2).append('<option value="">선택</option>');
			//$(select3).append('<option value="">선택</option>');
			
			//var result = data.data;
			//if(result != null){
				//var choice = $('<select></select>');
				//$(choice).attr('name', 'code');
				//$(choice).attr('onchange', 'setSelectBox(this)');
				
				//$(select).append('<option>선택</option>');
				
			
			//var mcCode = "";
			//var choice = '';
			//alert("for문갈거당");
			//var result = data['result'];
			//for(var i =0 ; i< data.Map.size; i++){
				for(var i in data){
				//alert("for문왔지");
				
				//var choice = data[i].size;
				//alert("111 " + data[i].size);
				
			
				//('<option value="">'+result[i].comKor+'</option>');
				//$(select).append("<option value='" + data.data[i].code+ "'>'" + data.data[i].comKor + "'</option>");
				//console.log(data[i].code);
				//console.log(data[i].comKor);
				//alert("option 이지롱");
				 //select.append('<option value=" ${'+resultMap.code+'}">${'+ resultMap.comKor +'}</option>');
				 //$('#bigGroup').append('<option value="'+ data[i].code+ '">' + data[i].comKor + '</option>');
				 //select1.append('<option value=" ${'+resultMap.code+'}">${'+ resultMap.comKor +'}</option>');
				 //select2.append('<option value=" ${'+resultMap.code+'}">${'+ resultMap.comKor +'}</option>');
				 //select3.append('<option value=" ${'+resultMap.code+'}">${'+ resultMap.comKor +'}</option>');
				 //select4.append('<option value=" ${'+resultMap.code+'}">${'+ resultMap.comKor +'}</option>');
				 //alert("bbbb");
				 //select.append('<option value="'+ data[i].code+ '">' + data[i].comKor + '</option>');
				 $("#big_group").append('<option value="'+ data.code+ '">' + data.comKor + '</option>');
				 $("#middle_group").append('<option value="'+ data.code+ '">' + data.comKor + '</option>');
				 $("#small_group").append('<option value="'+ data.code+ '">' + data.comKor + '</option>');
				 $("#detail_group").append('<option value="'+ data.code+ '">' + data.comKor + '</option>');
				 $("<input>", {type:'text'}).appendTo($("#comments"));
				 $("<input>", {type:'text'}).appendTo($("#transaction_money"));
				//choice += '<option value="' + data[i].code + '">' + data[i].comKor + '</option>';
				
				
				//mcCode = data['resultcode' + i + ''];
				//mcComKor = data['resultcomKor' + i + '']
				//$(select).append('<option value="' + mcCode+ '">' + mcComKor + '</option>');
				//alert("for문끝났지롱");
			}		
			
			
			
		}, 
		error:function(request,status,error){
        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		
		}
	});
	alert("ajax끝!");
};
</script>
<script>
function checkNumber(event){
	if(event.key === '.' || event.key === '-' || event.key >=0 && event.key <=9){
		return true;
	}
	return false;
}
</script>


<script>
//alert("ajax update시작");
//$(document).ready(function(){
	//$("#insertBtn").click(function(){
		//alert("ajax update시작시작");
		//$.ajax({
			//type: 'post',
			//url : './accountUpdate.do',
			//dataType : 'json',
			//data : {},
			//success : function(data){
				//alert(JSON.stringify(data));
				//console.log(data);
				
				//if(data == null){
					//alert("data = 0");
					//data = 0
					//}
				//if(data != null){
					//alert("data != null 데이터 있음");
				//}	
				
							
						//},
				//error:function(request,status,error){
		        //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			//}
		//});
		//alert("ajax 데이터 등록");
		$(function wrapper(){
			$("input:button[name='insertBtn']").on("click",function(){
				var aaa = $("#profit_cost option:selected").val();
					alert(aaa);
				var bbb = $("#big_group option:selected").val();
					alert(bbb);
				var ccc = $("#middle_group option:selected").val();
					alert(ccc);
				var ddd = $("#small_group option:selected").val();
					alert(ddd);
				var eee = $("#detail_group option:selected").val();
					alert(eee);
				var fff = $("#comments").val();
					alert(fff);
				var ggg = $("#transaction_money").val();
				alert("ajax시작!");
				$.ajax({
					url : './accountUpdate.do',
					type : 'post',
					data : {'aaa' : aaa,
							'bbb' : bbb,
							'ccc' : ccc,
							'ddd' : ddd,
							'eee' : eee,
							'fff' : fff,
							'ggg' : ggg
							},
					
					dataType : 'json',
					success : function(data){
						alert("ajax성공");
					
						alert(JSON.stringify(data));
						//console.log(data);
						//$('body').html(data);
						if(data == true){
							//window.location.reload();	
							window.location.href("./accountUpdate.do"); // jquery에서 페이지 이동시 사용
						}
						
					},
					error:function(request,status,error){
			        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
					
				});
				alert("ajax 끝!");
			})	
			
		});
		
		

</script>
<head>
</head>
<body>
<!-- 비용 START -->
<div class="container" style="margin-top: 50px">
	<div class="col-sm-12"><label for="disabledInput" class="col-sm-12 control-label"></label></div>
	<div class="col-sm-12"><label for="disabledInput" class="col-sm-12 control-label"></label></div>
	<div class="col-sm-12"><label for="disabledInput" class="col-sm-12 control-label"></label></div>
	<div class="col-sm-12"><label for="disabledInput" class="col-sm-12 control-label"></label></div>

	
	
	<div class="col-sm-11" id="costDiv">
		
		<div>
			<form id = "form" method="post" >
			<div class="col-sm-11">
			 		<div class="col-sm-12">
			 			
				      <div  id="profitCost" class="col-sm-3" >
						<select class="form-control" id="profit_cost" name="profit_cost" title="비용" onchange = "setBox(this.value)">
				        	<option value="">선택</option>
				        	<c:forEach var="resultMap" items="${resultMap}" varStatus="cnt">
					        	<option value="${resultMap.code}">${resultMap.comKor}</option>
				        	</c:forEach>
				        </select>
				      </div>

				      <div id="bigGroup" class="col-sm-3">
						<select class="form-control" id="big_group"  name="big_group" title="관" onchange = "setBox(this.value)" >
				        	<option value="">선택</option>
				        	 <!--<c:forEach var="list" items="${resultMap}" varStatus="cnt">
					        	<option value="${list.code}">${list.comKor}</option>
				        	</c:forEach>-->
				        	<c:forEach var="resultMap" items="${resultMap}" varStatus="cnt">
					        	<option value="${resultMap.code}">${resultMap.comKor}</option>
				        	</c:forEach>
				        	
				        </select>
				      </div>

				      <div id = "middleGroup" class="col-sm-3">
						<select class="form-control "  id = "middle_group" name="middle_group"  title="항" onchange = "setBox(this.value)" >
					        	<!-- <option value="0">해당없음</option> -->
					        	<option value="">선택</option>
					        	<!--<c:forEach var="list" items="${resultMap}" varStatus="cnt">
					        	<option value="${list.code}">${list.comKor}</option>
				        	</c:forEach>-->
				        	<c:forEach var="resultMap" items="${resultMap}" varStatus="cnt">
					        	<option value="${resultMap.code}">${resultMap.comKor}</option>
				        	</c:forEach>
				        </select>
				      </div>

				      <div id = "smallGroup" class="col-sm-3">
						<select class="form-control " id = "small_group" name="small_group" title="목" onchange = "setBox(this.value)">
					        	<!--  <option value="0">해당없음</option>-->
					        	<option value="">선택</option>
					        	 <!--<c:forEach var="list" items="${resultMap}" varStatus="cnt">
					        	<option value="${list.code}">${list.comKor}</option>
				        	</c:forEach>-->
				        	<c:forEach var="resultMap" items="${resultMap}" varStatus="cnt">
					        	<option value="${resultMap.code}">${resultMap.comKor}</option>
				        	</c:forEach>
				        </select>
				      </div>
			 		</div>

			 		<div class="col-sm-12">  <label for="disabledInput" class="col-sm-12 control-label"> </label></div>
			 		<div class="col-sm-12">
			 			  <div id="comment1" class="col-sm-3">
								<select class="form-control " id = "detail_group" name="detail_group" title="과" onchange = setBox(this.value)>
							        	<!--  <option value="0">해당없음</option>-->
						       			<option value="">선택</option>
						       			<!--<c:forEach var="list" items="${resultMap}" varStatus="cnt">
					        	<option value="${list.code}">${list.comKor}</option>
				        	</c:forEach>-->
				        	<c:forEach var="resultMap" items="${resultMap}" varStatus="cnt">
					        	<option value="${resultMap.code}">${resultMap.comKor}</option>
				        	</c:forEach>
								</select>
					      </div>
				      <div class="col-sm-9">
				      		<input class="form-control " id = "comments" name="comments" type="text" value="" placeholder="비용 상세 입력" title="비용 상세">
				      </div>
			 		</div>

				<div class="col-sm-12">  <label for="disabledInput" class="col-sm-12 control-label"> </label></div>
			 		<div class="col-sm-12">
			 		  <label for="disabledInput" class="col-sm-1 control-label"><font size="1px">금액</font></label>
				      <div class="col-sm-3">
				        	<input id="transaction_money" class="form-control"  name="transaction_money" type="text" onkeypress = 'return checkNumber(event)' value="" title="금액">
				      </div>
			 		  <label for="disabledInput" class="col-sm-1 control-label"><font size="1px">거래일자</font></label>
				      <div class="col-sm-3">
				       	 <input class="form-contro col-sm-2"  id="transaction_date" name="transaction_date" type="date" value="" style="width: 80%" title="거래일자">
				      </div>
			 		</div>

					<div class="col-sm-12"><label for="disabledInput" class="col-sm-12 control-label"></label></div>
					<div class="col-sm-12"><label for="disabledInput" class="col-sm-12 control-label"></label></div>
			 </div>
		
					<input type="submit" id="insertBtn" name="insertBtn" value="등록"/>
				<!-- <button type="submit" id="UpdateBtn" name="UpdateBtn">수정</button> -->
				<button type="button" id="reset" name="reset" onclick="removeCheck()">취소</button>
			</form>
		</div>
	</div>
</div>
</body>
<!-- 비용 END -->

<script>
function removeCheck(){
	if(confirm("정말 취소하시겠습니까?") == true){
		location.href="./account/accountList.do";
		}else{
			return false;	
		}	
	};
	




</script>