<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>


var imsi = "Good";

var boardno= '${detail.boardno}';	//게시글 번호
//alert("bno : " + bno);
//댓글 등록 버튼을 눌렀을 경우
$('[name=commentInsertBtn]').click(function() {
	alert("commentInsertBtn.....");
	alert("commentList....");
	var insertData = $('[name=commentInsertForm]').serialize();	//commentInsertForm의 내용을 가져온다.
	
	commentInsert(insertData);	
	//commentInsert(boardno);	
	//commentList(listData);
});

//댓글 등록
function commentInsert(insertData){
	alert(insertData);
    $.ajax({
        url : '/comment/insert',
        type : 'post',
        data : insertData,
        success : function(data){
            if(data == 1) {
                commentList(); //댓글 작성 후 댓글 목록 reload
				$('[name=replytext]').val('');
            } else{
            	commentList(); //댓글 작성 후 댓글 목록 reload
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
</script>