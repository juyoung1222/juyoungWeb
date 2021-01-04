<%@ page session="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="layoutTag" tagdir="/WEB-INF/tags"%>
<layoutTag:layout>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<meta charset="UTF-8">
<title>메인</title>
<script type="text/javascript" src="/static/jquery/lib/jquery.js"></script>
<script type='text/javascript'src='/static/jquery/lib/jquery.bgiframe.min.js'></script>
<script type='text/javascript'src='/static/jquery/lib/jquery.ajaxQueue.js'></script>
<script type='text/javascript'src='/static/jquery/jquery.autocomplete.js'></script>
<script type='text/javascript' src="https://code.jquery.com/jquery-latest/js"></script>
<link rel="stylesheet" type="text/css" href="/static/jquery/jquery.autocomplete.css" />
<meta charset="UTF-8">
<title>메인</title>
<style>
#searchBox{
	width: 500px;
	
}
 /* The Modal (background) */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
    
        /* Modal Content/Box */
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto; /* 15% from the top and centered */
            padding: 20px;
            border: 1px solid #888;
            width: 30%; /* Could be more or less, depending on screen size */                          
        }
</style>

</head>
<body>
	<!-- 메인가운데 -->
<div class="container-fluid text-center">
	<div class="row content">
		<div class="col-sm-1 sidenav"></div>
		<div class="col-sm-9 text-left">
			<div class="container-fluid bg-4 text-center">
				<h3>과목 둘러보기</h3>
				<br>
				<div class="row">
					<div class="col-sm-3">
						<a onclick="location.href='/qna/qnaDetail/1'"class="image"> <img
							src="/static/image/그림1.png"
							class="img-responsive" style="width: 100%" alt="Image">
						</a>
						<p>
							<a onclick="location.href='/qna/qnaDetail/1'" class="image">자바</a>
						</p>
					</div>

					<div class="col-sm-3">
						<a onclick="location.href='/qna/qnaDetail/2'" class="image"> <img
							src="/static/image/그림3.png" class="img-responsive"
							style="width: 50%" alt="Image">
						</a>
						<p>
							<a onclick="location.href='/qna/qnaDetail/2'">JSP</a>
						</p>
					</div>

					<div class="col-sm-3">
						<a onclick="location.href='/qna/qnaDetail/3'" class="image"> <img
							src="/static/image/그림2.png" class="img-responsive"
							style="width: 100%" alt="Image">
						</a>
						<p>
							<a onclick="location.href='/qna/qnaDetail/3'" class="image">SRRING</a>
						</p>
					</div>

					<div class="col-sm-3">
						<a onclick="location.href='/qna/qnaDetail/4'" class="image"> <img
							src="/static/image/그림4.png"
							class="img-responsive" style="width: 100%" alt="Image">
						</a>
						<p>
							<a onclick="location.href='/qna/qnaDetail/4'" class="image">MySQL</a>
						</p>
					</div>

					<div class="col-sm-3">
						<a onclick="location.href='/qna/qnaDetail/5'" class="image"> <img
							src="/static/image/tH1496SipRLCtEL.jpg" class="img-responsive"
							style="width: 100%" alt="Image">
						</a>
						<p>
							<a onclick="location.href='/qna/qnaDetail/5'" class="image">Android</a>
						</p>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>

	

 <!-- The Modal -->
    <div id="myModal" class="modal">
 
      <!-- Modal content -->
      <div class="modal-content">
                <p style="text-align: center;"><span style="font-size: 14pt;"><b><span style="font-size: 24pt;">공지</span></b></span></p>
                <p style="text-align: center; line-height: 1.5;"><br /></p>
                <p style="text-align: center; line-height: 1.5;"><span style="font-size: 14pt;">IT 커뮤니티입니다.</span></p>
				<p style="text-align: center; line-height: 1.5;"><span style="font-size: 14pt;">IT에 관련된 언어가 있습니다.</span></p>
                <p style="text-align: center; line-height: 1.5;"><span style="font-size: 14pt;"><br /></span></p>
                <p style="text-align: center; line-height: 1.5;"><span style="font-size: 14pt;">많은 이용을</span></p>
                <p style="text-align: center; line-height: 1.5;"><span style="font-size: 14pt;">부탁드립니다.</span></p>
                <p style="text-align: center; line-height: 1.5;"><br /></p>
                <p><br /></p>
            <div style="cursor:pointer;background-color:#DDDDDD;text-align: center;padding-bottom: 10px;padding-top: 10px;" onClick="close_pop();">
                <span class="pop_bt" style="font-size: 13pt;" >
                     닫기
                </span>
            </div>
      </div>
 
    </div>
<!--End Modal-->

<script type="text/javascript">
      
        jQuery(document).ready(function() {
                $('#myModal').show();
        });
        //팝업 Close 기능
        function close_pop(flag) {
             $('#myModal').hide();
        };
        
      </script>
<script>
$(document).ready(function(){
	$(".image").on("click",function(){
		if(${member == null}){
			alert("로그인을 하셔야 합니다.");
			location.href="/member/login";
			}

		
		})
})
</script>      
   


</body>
</html>
</layoutTag:layout>