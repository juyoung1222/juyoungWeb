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
  <title>카카오페이손해보험 사전과제</title>

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
      	<h2 align="left">로 그 인</h2>
	          <form class="form-horizontal" method="post" action="/contract/login">
		          <div class="form-group">
					<label class="control-label col-sm-3">아 이 디</label>
					<div class="col-lg-12">
						<input type="text" class="form-control" id="user_id" name="user_id" 
								maxlength=16 placeholder="아이디를 입력하세요"/>
					</div>
				 </div>
				 <div class="form-group">
					<label class="control-label col-sm-3">비 밀 번 호</label>
					<div class="col-lg-12">
					<input type="password" class="form-control" id="user_pw" name="user_pw"
							maxlength=16 placeholder="비밀번호를 입력하세요"/>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-4">
						<button class="btn btn-success" type="submit" id="submit">로그인</button>
						<button class="btn btn-danger" type="reset">취소</button>
					</div>
				</div>
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
