<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>
//alert("script start...");
var imsi = "Good";
var boardno= '${detail.boardno}';	//게시글 번호
//alert("bno : " + bno);
//댓글 등록 버튼을 눌렀을 경우
$('[name=commentInsertBtn]').click(function() {
	//alert("commentInsertBtn.....");
	//alert("commentList....");
	
	//로그인을 하지않고 댓글 등록버튼을 눌렀을 때 alert창이 뜸.
	if(${member == null}){
		alert("로그인을 하셔야 합니다.");
	}
	var insertData = $('[name=commentInsertForm]').serialize();	//commentInsertForm의 내용을 가져온다.
	
	commentInsert(insertData);	
	//commentInsert(boardno);	
	//commentList(listData);
});
//댓글등록
function commentInsert(insertData){
	//alert(insertData)
    $.ajax({
        url : '/comment/insert',
        type : 'post',
        data : insertData,
        success : function(data){
            if(data == 1) {
                commentList(); //댓글 작성 후 댓글 목록 reload
				$('[name=replytext]').val('');
            } else{
            	commentList(); // 댓글 목록 reload
            }     
        }
    });
}
//초기 페이지 로딩시 댓글 불러오기
$(function(){
	commentList();
});
//댓글 목록 보기
function commentList() {
	$.ajax({
		url:	'/comment/list/' + boardno,
		type:	'get',
		data:	{'boardno': boardno},
		success: function(data) {
			
			var str = '';
			$.each(data, function(key, value){ 
				str += '<div class="commentArea"  margin-bottom: 15px;">';
				str += '<div class="commentInfo'+value.replyno+'">'+'댓글번호 : '+value.replyno+' / 작성자 : '+value.replywriterid;
				str += '<div class="commentDate'+value.replyno+'">'+' 작성날짜 : '+value.replydate;
				str += '<a onclick="commentUpdate('+value.replyno+',\''+value.replytext+'\');"> 수정 </a>';
				str += '<a onclick="commentDelete('+value.replyno+');"> 삭제 </a> </div>';
				str += '<div class="commentContent'+value.replyno+'"> <p> 내용 : '+value.replytext +'</p>';
				str += '<hr>';
			});
			$("#commentList").html(str);
			//alert("imsi1["+imsi+"]);
			imsi = bno;
		}
	})
	// 콜백함수 : 요청 성공 시에 호출되는 함수
	// ajax 콜백 함수는 ajax 함수에 연결 연산자를 붙여서 사용한다.
	.done(function(data) {
		//alert("IMSI==>" + imsi);
		////alert(data);
		console.log(data);
	});
	//alert("imsi2["+imsi+"]);
}
//댓글 수정 - 댓글 내용 출력을 input 폼으로 변경한다.
function commentUpdate(replyno, replytext){
	var str = '';
	//alert("commentUpdate replyno:"+replyno);
	//alert("commentUpdate replytext:"+replytext);
	
	str +='<c:if test="${member != null}">';
		alert('로그인한 회원입니다.');
	
	str += '<div class="input-group">';
	//str += '<input type="text" class="form-control" name="replytext_' +replytext +'" value="' +replytext + '"/>';
	str += '<input type="text" class="form-control" name="replytext_' +replyno +'" value="' +replytext + '"/>';
	str += '<span class="input-group-btn"><button class="btn btn-warning" type="button" onclick="mCommentServiceUpdate('+replyno+')";>수정</button></span>';
	str += '</div>';
	str += '</c:if>';
	
	//str +='<c:if test="${admin != null}">';
		//alert('관리자입니다.');
	//str += '<div class="input-group">';
	////str += '<input type="text" class="form-control" name="replytext_' +replytext +'" value="' +replytext + '"/>';
	//str += '<input type="text" class="form-control" name="replytext_' +replyno +'" value="' +replytext + '"/>';
	//str += '<span class="input-group-btn"><button class="btn btn-warning" type="button" onclick="mCommentServiceUpdate('+replyno+')";>수정</button></span>';
	//str += '</div>';
	//str += '</c:if>';

	str += '<c:if test="${member == null}">';
	alert('수정할 권한이 없습니다.');

	//str += '<div class="input-group">';
	str += '<input type="text" class="form-control" name="replytext_' +replyno +'" value="' +replytext + '"/>';
	str += '</c:if>';
	//str += '<span class="input-group-btn"><button class="btn btn-warning" type="button" onclick="mCommentServiceUpdate('+replyno+')";>수정</button></span>';
	//str += '</div>';
	



	$('.commentContent' + replyno).html(str);
}
//댓글 수정 - 수정한 댓글 내용을 테이블에 업데이트 한다.
//function mCommentServiceUpdate(replytext){
function mCommentServiceUpdate(replyno){
	//alert("commentUpdate1:"+replyno)
	//댓글 번호에 해당하는 수정된 내용을 가져온다.
	var updateContent = $('[name=replytext_'+replyno+']').val();
	$.ajax({
		url : '/comment/update',
		type : 'get',
		data : {'replyno' : replyno, 'replytext' :  updateContent},
		success : function(data){
			if(data == 1) commentList();
			}
		});
	}
//댓글 삭제
function commentDelete(replyno){
	//alert("commentDelete");
	var str = '';
	//alert("commentUpdate replyno:"+replyno);
	//alert("commentUpdate replytext:"+replytext);
	
	str += '<c:if test="${member == null}">';

	alert('삭제할 권한이 없습니다.');

		//str += '<div class="input-group">';
		str += '<input type="text" class="form-control" name="replytext_' +replyno +'" value="' +replytext + '"/>';
		//str += '<span class="input-group-btn"><button class="btn btn-warning" type="button" onclick="mCommentServiceUpdate('+replyno+')";>수정</button></span>';
		//str += '</div>';
		str += '</c:if>';
		//str += '<p>테스트</p>';
		
		//str += '<c:if test="${admin != null || member !=null}">';
			//alert('관리자입니다.');
		//str += '</c:if>';
		
	$.ajax({
		url : '/comment/delete/' + replyno,
		type : 'post',
		success : function(data){
			if(data == 1) commentList();
			}
		});
	}
//페이지 로딩시 게시글에 연결된 댓글이 있으면 무조건 댓글을 보여준다.
$(document).ready(function(){
	//alert("commentList called......");
	commentList();
	
});
</script>

