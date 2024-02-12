<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c"   		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
 <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<meta charset="utf-8">
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
<title>카카오페이손해보험 사전과제</title>
</head>
<body>
<div class="container">
    <div class="input-form-backgroud row">

<button type="button" class="btn btn-primary" name="rgBtn" onclick="location.href='/contract/register'">가입신청서</button>
<button type="button" class="btn btn-success" name="listBtn" onclick="location.href='/contract/list'">가입내용조회</button>

    </div>
</div>
</body>
</html>