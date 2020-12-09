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
<link rel="icon" type="image/x-icon" href="/static/images/aland.jpg" />
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<meta charset="UTF-8">
<title>product</title>

<style>
.btn {
	padding: 8px 10px;
	background-color: #333;
	color: #f1f1f1;
	border-radius: 4;
	transition: .2s;
	margin-left: 35%;
}

.carousel-inner img {
	-webkit-filter: grayscale(45%);
	filter: grayscale(45%); /* make all photos black and white */
	width: 75%;
	margin: auto;
}

.thumbnail {
	margin-top: 10px;
	font-size: 15px;
	padding: 0 0 15px 0;
	border: 2;
	border-radius: 4;
}

.pagination {
	margin-left: 46%;
}
</style>
</head>
<body>
	<div class=" text-center">
		<p>각각의 장인들이 올린 작품들을 확인해보세요</p>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-sm-10">
				<div id="myCarousel" class="carousel slide" data-ride="carousel">
					<!-- Indicators -->
					<ol class="carousel-indicators">
						<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel" data-slide-to="1"></li>
						<li data-target="#myCarousel" data-slide-to="2"></li>
					</ol>

					<div class="carousel-inner" role="listbox">
						<div class="item active">
							<img src="/static/images/프로필1.jpg" alt="모델1" width="100"
								height="550">
							<div class="carousel-caption">
								<p>좋은 퀄리티의 제품과 보존도가 좋은 중고 제품들</p>
							</div>
						</div>
						<div class="item">
							<img src="/static/images/프로필2.jpg" alt="모델4" width="100"
								height="550">
							<div class="carousel-caption">
								<p>만들고 다른 사람에게도 자신의 캐릭터를 팔아보자</p>
							</div>
						</div>
						<div class="item">
							<img src="/static/images/프로필3.jpg" alt="모델3" width="100"
								height="550">
							<div class="carousel-caption">
								<p>그저 팔기만 하지말고 자작 캐릭터의 설정특징을 알리고 팬으로 만들어 보자!</p>
							</div>
						</div>
					</div>

					<!-- Left and right controls -->
					<a class="left carousel-control" href="#myCarousel" role="button"
						data-slide="prev"> <span
						class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						<span class="sr-only">Previous</span>
					</a> <a class="right carousel-control" href="#myCarousel" role="button"
						data-slide="next"> <span
						class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
						<span class="sr-only">Next</span>
					</a>
				</div>
			</div>
				
			<div class="col-sm-10">
				<c:forEach var="product" items="${list}">
					<div class="col-sm-3">
						<div class="thumbnail">
							<img src="/static/upload/${product.productimageName}"
								alt="이미지 업로드">
								<ul>
								  <li>제품명 : ${product.productname}</li>
								  <li>가격 : ${product.productprice} 원</li>
								</ul>
							<button class="btn" data-toggle="modal" data-target="#myModal" 
							onclick="location.href='/product/productdetail/${product.productno}'">Click</button>
						</div>
					</div>
				</c:forEach>
			</div>
		</div>
	</div>


		<div id="paginationBox" >
			<ul class="pagination">
				<c:if test="${productpagination.prev}">

					<li class="page-item"><a class="page-link" href="#"
						onClick="fn_prev('${productpagination.page}', '${productpagination.range}', '${productpagination.rangeSize}')">Previous</a></li>

				</c:if>
				<c:forEach begin="${productpagination.startPage}"
					end="${pagination.endPage}" var="idx">

					<li
						class="page-item <c:out value="${productpagination.page == idx ? 'active' : ''}"/> "><a
						class="page-link" href="#"
						onClick="fn_pagination('${idx}', '${productpagination.range}', '${productpagination.rangeSize}')">
							${idx} </a></li>

				</c:forEach>

				<c:if test="${pagination.next}">

					<li class="page-item"><a class="page-link" href="#"
						onClick="fn_next('${productpagination.range}','${productpagination.range}', '${productpagination.rangeSize}')">Next</a></li>

				</c:if>

			</ul>

		</div>

	<script>
		$(document).ready(
				function() {
					// Initialize Tooltip
					$('[data-toggle="tooltip"]').tooltip();

					// Add smooth scrolling to all links in navbar + footer link
					$(".navbar a, footer a[href='#myPage']").on('click',
							function(event) {

								// Make sure this.hash has a value before overriding default behavior
								if (this.hash !== "") {

									// Prevent default anchor click behavior
									event.preventDefault();

									// Store hash
									var hash = this.hash;

									// Using jQuery's animate() method to add smooth page scroll
									// The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
									$('html, body').animate({
										scrollTop : $(hash).offset().top
									}, 900, function() {

										// Add hash (#) to URL when done scrolling (default click behavior)
										window.location.hash = hash;
									});
								} // End if
							});
				})
	</script>
<script>
		//이전 버튼 이벤트

		function fn_prev(page, range, rangeSize) {

			var page = ((range - 2) * rangeSize) + 1;

			var range = range - 1;

			var url = "${pageContext.request.contextPath}/product/productlist";

			url = url + "?page=" + page;

			url = url + "&range=" + range;

			location.href = url;

		}

		//페이지 번호 클릭

		function fn_pagination(page, range, rangeSize, searchType, keyword) {

			var url = "${pageContext.request.contextPath}/product/productlist";

			url = url + "?page=" + page;

			url = url + "&range=" + range;

			location.href = url;

		}

		//다음 버튼 이벤트

		function fn_next(page, range, rangeSize) {

			var page = parseInt((range * rangeSize)) + 1;

			var range = parseInt(range) + 1;

			var url = "${pageContext.request.contextPath}/product/productlist";

			url = url + "?page=" + page;

			url = url + "&range=" + range;

			location.href = url;

		}
	</script>

</layoutTag:layout>
</body>
</html>


<!-- layoutTag를 적용하므로 bootstrap.jsp 파일이 필요 없어졌다. -->
<%--== : eq
!= : ne
< : lt
> : gt
<= : le
>= : ge --%>















