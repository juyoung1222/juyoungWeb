<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>

var imsi = "Good";

var bno = '${detail.bno}';	//게시글 번호
//alert("bno : " + bno);
//댓글 등록 버튼을 눌렀을 경우
$('[name=commentInsertBtn]').click(function() {
	var insertData = $('[name=commentInsertForm]').serialize();	//commentInsertForm의 내용을 가져온다.
	commentInsert(insertData);	
});

//댓글 등록
function commentInsert(insertData){
    $.ajax({
        url : '/comment/insert',
        type : 'post',
        data : insertData,
        success : function(data){
            if(data == 1) {
                commentList(); //댓글 작성 후 댓글 목록 reload
                $('[name=content]').val('');
            }
        }
    });
}

//댓글 목록 보기
function commentList() {
	$.ajax({
		url:	'/comment/list/'+bno,
		type:	'get',
		data:	{'bno': bno},
		success: function(data) {
			var str = '';
			$.each(data, function(key, value){ 
				str += '<div class="commentArea" style="border-bottom:1px solid darkgray; margin-bottom: 15px;">';
				str += '<div class="commentInfo'+value.cno+'">'+'댓글번호 : '+value.cno+' / 작성자 : '+value.writer;
				str += '<a onclick="commentUpdate('+value.cno+',\''+value.content+'\');"> 수정 </a>';
				str += '<a onclick="commentDelete('+value.cno+');"> 삭제 </a> </div>';
				str += '<div class="commentContent'+value.cno+'"> <p> 내용 : '+value.content +'</p>';
				str += '</div></div>';
			});
			$(".commentList").html(str);
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
function commentUpdate(cno, content) {
	var str = '';

	str += '<div class="input-group">';
	str += '<input type="text" class="form-control" name="content_' + cno + '" value="' +content + '"/>';
	str += '<span class="input-group-btn"><button class="btn btn-warning" type="button" onclick="commentUpdateProc('+cno+');">수정</button> </span>';
	str += '</div>';

	$('.commentContent' + cno).html(str);
}

//댓글 수정 - 수정한 댓글 내용을 테이블에 업데이트한다.
function commentUpdateProc(cno) {
	//댓글 번호에 해당하는 수정된 내용을 가져온다.
	var updateContent = $('[name=content_' + cno + ']').val();
	
	$.ajax({
		url:	'/comment/update',
		type:	'post',
		data:	{'content' : updateContent, 'cno' : cno},
		success: function(data) {
			if(data == 1) commentList(bno); //댓글을 수정한 후 목록을 출력한다.
		}
	});
}

//댓글 삭제
function commentDelete(cno) {
	//alert("commentDelete");
	$.ajax({
		url:	'/comment/delete/' + cno,
		type:	'post',
		success: function(data) {
			if(data == 1) commentList(bno);	//댓글 삭제 후에 목록을 출력한다.
		}
	});
}


//페이지 로딩시 게시글에 연결된 댓글이 있으면 무조건 댓글을 보여준다.
$(document).ready(function() {
	//alert("commentList Called.....");
	commentList();
});


</script>