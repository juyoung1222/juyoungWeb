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
<title>productList.jsp</title>
<style>
.navbar-inverse .narbar-nav > .active > a,
.navbar-inverse .narbar-nav > .active > a:focus,
.navbar-inverse .narbar-nav > .active > a:hover{

	color:rgb(255,255,255);
	background-color:red
}
	ul{list-style:none; float:center; padding:6px;}

	
</style>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<link rel="stylesheet" href="//code.jquey.com/ui/1.12.1/themes/base/jquey-ui.css">
</head>
<body>
<div class="container-fluid">
	<h2 align="left">상 품 리 스 트</h2>
	<button type="button" class="btn btn-success" onclick="location.href='/product/productInsert'">상 품 등 록</button>
	
	<table class="table table-hover table-bodered">
		<tr>
			<td>
			<div class="btn-group">	
				<select class="form-control"  id="productkind" name="productkind" onchange="location.href='/product/productList/' + this.value">
				<c:if test="${productkind == all}">
						
						<!--  <option value="500"<c:if test="${productkind == 500}">selected</c:if>>전체</option>-->
						<option value="100"<c:if test="${productkind == 100}">selected</c:if>>컴퓨터/가전</option>
						<option value="200"<c:if test="${productkind == 200}">selected</c:if>>브랜드패션</option>
						<option value="300"<c:if test="${productkind == 300}">selected</c:if>>스포츠</option>
						<option value="400"<c:if test="${productkind == 400}">selected</c:if>>생필품</option>
				</c:if>
				<c:if test="${productkind == '100'}">
						<!--  <option value="500"<c:if test="${productkind == 500}">selected</c:if>>전체</option>-->
						<option value="100"<c:if test="${productkind == 100}"> selected </c:if>>컴퓨터/가전</option>
						<option value="200"<c:if test="${productkind == 200}"></c:if>>브랜드패션</option>
						<option value="300"<c:if test="${productkind == 300}"></c:if>>스포츠</option>
						<option value="400"<c:if test="${productkind == 400}"></c:if>>생필품</option>
						
				</c:if>
				<c:if test="${productkind == '200'}">
						<!--  <option value="500"<c:if test="${productkind == 500}">selected</c:if>>전체</option>-->
						<option value="100"<c:if test="${productkind == 100}"></c:if>>컴퓨터/가전</option>
						<option value="200"<c:if test="${productkind == 200}"> selected </c:if>>브랜드패션</option>
						<option value="300"<c:if test="${productkind == 300}"></c:if>>스포츠</option>
						<option value="400"<c:if test="${productkind == 400}"></c:if>>생필품</option>
						
				</c:if>
				<c:if test="${productkind == '300'}">
						<!--  <option value="500"<c:if test="${productkind == 500}">selected</c:if>>전체</option>-->
						<option value="100"<c:if test="${productkind == 100}"></c:if>>컴퓨터/가전</option>
						<option value="200"<c:if test="${productkind == 200}"></c:if>>브랜드패션</option>
						<option value="300"<c:if test="${productkind == 300}"> selected </c:if>>스포츠</option>
						<option value="400"<c:if test="${productkind == 400}"></c:if>>생필품</option>
						
			    </c:if>
				<c:if test="${productkind == '400'}">
						<!--  <option value="500"<c:if test="${productkind == 500}">selected</c:if>>전체</option>-->
						<option value="100"<c:if test="${productkind == 100}"></c:if>>컴퓨터/가전</option>
						<option value="200"<c:if test="${productkind == 200}"></c:if>>브랜드패션</option>
						<option value="300"<c:if test="${productkind == 300}"></c:if>>스포츠</option>
						<option value="400"<c:if test="${productkind == 400}"> selected </c:if>>생필품</option>
					</c:if>
			</select>
		</div>
	</td>
</tr>
			<tr>
						<th>번호</th>
						<th>상품이름</th>
						<th>가격</th>
						<th>수량</th>
						<th>이미지명</th>
						<th>내용</th>
						<th>할인율</th>
						<th>카테고리번호</th>
						
		<c:if test="${list.size() <= 0}">
			<tr>
				<td colspan="8" align="center">
				<strong>검색 결과가 없습니다!!</strong>
				</td>
			</tr>
		</c:if>
			<c:forEach var="detail" items="${productkindlist}">
			<tr>
				<td class="info" onclick="location.href='/product/productDetail/${detail.productno}'">${detail.productno}</td>
				<td>${detail.productname}</td>
				<td>${detail.productprice}</td>
				<td>${detail.productsalescnt}</td>
				<td>${detail.productimagefileName}</td>
				<td>${detail.productcontent}</td>
				<td>${detail.productdiscount}</td>
				<td>${detail.productcid}</td>
			</tr>
		</c:forEach>
		<c:forEach var="list" items="${list}">
			<tr>
				<td class="info" onclick="location.href='/product/productDetail/${list.productno}'">${list.productno}</td>
				<td>${list.productname}</td>
				<td>${list.productprice}</td>
				<td>${list.productsalescnt}</td>
				<td>${list.productimagefileName}</td>
				<td>${list.productcontent}</td>
				<td>${list.productdiscount}</td>
				<td>${list.productcid}</td>
			</tr>
			
		</c:forEach>
		
	</table>

	<div class="input-group">
			<input type="hidden" id="productcid" name="productcid" value="${detail.productcid}"/>
	</div>
		
		<ul class="pager justify-content-center">
			<c:if test="${pageMaker.prev}">
				<li class="page-item"><a href="/product/productList${pageMaker.makeSearch(pageMaker.startPage-1)}">이전</a></li>
			</c:if>
			
			<c:forEach begin="${pageMaker.startPage}" end="${pageMaker.endPage}" var="idx">
				<li class="page-item"><a href="/product/productList${pageMaker.makeSearch(idx)}">${idx}</a></li>
			</c:forEach>
			
			<c:if test="${pageMaker.next && pageMaker.endPage >0}">
				<li class="page-item"><a href="/product/productList${pageMaker.makeSearch(pageMaker.endPage+1)}">다음</a></li>
			</c:if>
		</ul>
	

<!-- 검색 버튼 -->
<div class="row" style="clear:right;width:400px;margin:auto">
	<div class="col-lg-12">
		<form id="searchForm" action="/product/productList">
			<select name="searchType">
			<option value="n"<c:out value="${scri.searchType == null ? 'selected' : ''}"/>>-----</option>
      		<option value="productname"<c:out value="${scri.searchType == productname ? 'selected' : ''}"/>>상품이름</option>
      		<option value="productcontent"<c:out value="${scri.searchType == productcontent ? 'selected' : ''}"/>>내용</option>
      		<option value="w"<c:out value="${scri.searchType eq 'w' ? 'selected' : ''}"/>>작성자</option>
      		<!--  <option value="sc"<c:out value="${scri.searchType eq 'sc' ? 'selected' : ''}"/>>상품이름+내용</option>-->
				</select>
			<input type="text" name="keyword" id="keywordInput" value="${scri.keyword}"/>
			<button class="btn btn-primary btn-sm">검색</button>
		</form>
	</div>
</div>

  <script>
$(document).ready(function(){
        $('#searchBtn').click(function() {
       self.location = "/product/productList" + '${pageMaker.makeQuery(1)}' + "&searchType=" + $("select option:selected").val() + "&keyword=" + encodeURIComponent($('#keywordInput').val());
        });
      }); 
</script>

<script>
$(document).ready(function(){
	$(".btn-primary btn-sm").on("click",function(){
		
		if(${member == null}){
			alert("로그인을 하셔야 합니다.");
			location.href="/login/login";
			}
		
		});
});
</script>
</div>
</body>
</html>
</layoutTag:layout>