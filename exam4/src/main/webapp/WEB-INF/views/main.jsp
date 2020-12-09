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
<script type='text/javascript' src='/static/jquery/lib/jquery.bgiframe.min.js'></script>
<script type='text/javascript' src='/static/jquery/lib/jquery.ajaxQueue.js'></script>
<script type='text/javascript' src='/static/jquery/jquery.autocomplete.js'></script>
<link rel="stylesheet" type="text/css" href="/static/jquery/jquery.autocomplete.css" />
<style>
.w3-sidebar a {
	font-family: "Roboto", sans-serif
}

/* 맨위 메인 사진 */
.bgimg-1 {
	background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

/* 맨위 메인 크기 */
.bgimg-1 {
	background-image: url('/static/images/main.jpg');
	min-height: 80%;
}

/* Turn off parallax scrolling for tablets and phones */
@media only screen and (max-device-width: 1600px) {
	.bgimg-1 {
		background-attachment: scroll;
		min-height: 400px;
	}
	.w3-sidebar a {
		font-family: "Roboto", sans-serif
	}
	body, h1, h2, h3, h4, h5, h6, .w3-wide {
		font-family: "Montserrat", sans-serif;
	}
}

</style>
</head>
<!-- 메인사진(글) -->
<div class="bgimg-1 w3-display-container w3-opacity-min" id="home">
	<div class="w3-display-middle" style="white-space: nowrap;">
		<span class="w3-xxlarge w3-text-white w3-wide">FASHION</span>
	</div>
</div>
<br>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top"
	style="z-index: 3; width: 120px" id="mySidebar">
	<div class="w3-container w3-display-container w3-padding-16">
		<i onclick="w3_close()"
			class="fa fa-remove w3-hide-large w3-button w3-display-topright"></i>
		<h3 class="w3-wide">
			<b>SHOP</b>
		</h3>
	</div>
	<div class="w3-padding-64 w3-large w3-text-grey"
		style="font-weight: bold">
		<a href="/product/productlist/1" class="w3-bar-item w3-button">Shirts</a> 
		<a href="/product/productlist/2" class="w3-bar-item w3-button">Dresses</a> 
		<a onclick="myAccFunc()" href="/product/productlist/3" class="w3-button w3-block w3-white w3-left-align" id="myBtn">Jeans <i class="fa fa-caret-down"></i>
		</a>
		<div id="demoAcc"class="w3-bar-block w3-hide w3-padding-large w3-medium">
		<a href="/product/productlist/3" class="w3-bar-item w3-button w3-light-grey"><i class="fa fa-caret-right w3-margin-right"></i>Skinny</a>
	</div>
		<a href="/product/productlist/4" class="w3-bar-item w3-button">Jackets</a>
		<a href="/product/productlist/5" class="w3-bar-item w3-button">Gymwear</a> 
		<a href="/product/productlist/6" class="w3-bar-item w3-button">Blazers</a> 
		<a href="/product/productlist/7" class="w3-bar-item w3-button">Shoes</a>
	</div>
	<a href="#contact" class="w3-bar-item w3-button w3-padding">Contact</a>
	<a href="javascript:void(0)" class="w3-bar-item w3-button w3-padding"
		onclick="document.getElementById('newsletter').style.display='block'">Newsletter</a>
	<a href="#footer" class="w3-bar-item w3-button w3-padding">Subscribe</a>
</nav>

<!-- 검색창 -->
<div class="container">
	<form class="form-inline" action="/product/searchList" method="post">
		<input type="text" class="form-control" id="searchBox" name="searchName" size="100"
			placeholder="검색어를 입력하세요">
		<button type="submit">검색</button>
	</form>
</div>


<!-- 메인가운데 -->
<div class="container text-center">
	<div class="row text-center">
		<div class="col-sm-3">
			<div class="thumbnail">
				<img src="/static/images/jackets.jpg" width="600" height="400"
					onclick="location.href='/product/productdetail/6'">
				<p>
					<strong>프로필</strong>
				</p>
				<p>Jacket</p>
				<p>
					가을 완판 제품<br>10% 할인
				</p>
				<button class="btn btn-default"
					onclick="location.href='/product/productdetail/14'">More
					Click</button>
			</div>
		</div>


		<div class="col-sm-3" style=>
			<div class="thumbnail">
				<img src="/static/images/blazers.jpg" width="600" height="400"
					onclick="location.href='/product/productdetail/8'">
				<p>
					<strong>프로필</strong>
				</p>
				<p>Blazer</p>
				<p>
					남성미를 강조하는<br>검정색
				</p>
				<button class="btn btn-default"
					onclick="location.href='/product/productdetail/6'">More
					Click</button>
			</div>
		</div>


		<div class="col-sm-3">
			<div class="thumbnail">
				<img src="/static/images/jeans.jpg" width="600" height="400"
					onclick="location.href='/product/productdetail/5'">
				<p>
					<strong>프로필</strong>
				</p>
				<p>Jean</p>
				<p>
					감각 적인 핏으로 <br>하반신도 감동중 
				</p>
				<button class="btn btn-default"
					onclick="location.href='/product/productdetail/13'">More Click
				</button>
			</div>
		</div>
		
		
		<br id="dress">
		
		
		<!-- 오른쪽 칸 -->
		<div class="col-sm-2 well" style="width: 20%">
			<!-- 로그인시 나의프로필과 환영합니다 창이 뜸 -->
			<c:if test="${member != null }">
				<div class="well">
					<p>
						<a href="/login/login">나의 프로필</a>
					</p>
					<img
						src="https://ext.fmkorea.com/files/attach/new/20191012/486616/1351010096/2272376735/ba9a8fb2a6735f4f2787821924619db5.jpeg"
						class="img-circle" height="65" width="65" alt="Avatar">
				</div>
				
			</c:if>

			<div class="well">
				<p>
					<a href="#">해시태그 검색</a>
				</p>
				<p>
					<a
						href="https://www.instagram.com/explore/tags/%EB%8D%B0%EC%9D%BC%EB%A6%AC%EB%A3%A9/?hl=ko">
						<span class="label label-default">#데일리룩</span>
					</a><a href="https://www.instagram.com/explore/tags/ootd/"> <span
						class="label label-primary">#ootd</span></a> <span
						class="label label-success">#인스타</span> <span
						class="label label-info">#패션</span> <span
						class="label label-warning">#화장품</span> <span
						class="label label-danger">#스킨</span>
				</p>
			</div>
			<div class="alert alert-success fade in">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
				<p>
					<strong>광고!</strong>
				</p>
				여기는 광고칸입니다.
			</div>
			<p>
				<a href="#">링크1</a>
			</p>
			<p>
				<a href="#">링크2</a>
			</p>
			<p>
				<a href="#">링크3</a>
			</p>
		</div>
		
	</div>
</div>


<br>

<!-- 밑의 여섯칸 쇼핑몰 창 -->
<div class="container">
	<div class="row">
		<a
			href="http://www.11st.co.kr/products/2801850298?trTypeCd=22&trCtgrNo=895019">
			<div class="col-sm-4">
				<div class="panel panel-primary">
					<div class="panel-heading">BLACK FRIDAY DEAL</div>
					<div class="panel-body">
						<img
							src="https://cdn.011st.com/11dims/resize/400x400/quality/75/11src/pd/20/4/0/6/2/0/9/FBZSr/2884406209_L300.jpg"
							class="img-responsive" style="width: 100%" alt="Image">
					</div>
					<div class="panel-footer">[40%]데이데이 매일 입고 싶은 겨울코디!
						가을신상/블라우스/원피스/니트/스커트/팬츠</div>
				</div>
			</div>
		</a>


		<div class="col-sm-4">
			<div class="panel panel-danger">
				<div class="panel-heading">BLACK FRIDAY DEAL</div>
				<div class="panel-body">
					<img
						src="https://cdn.011st.com/11dims/resize/400x400/quality/75/11src/pd/20/6/7/0/7/8/1/WmoHB/1013670781_L300.jpg"
						class="img-responsive" style="width: 100%" alt="Image">
				</div>
				<div class="panel-footer">[업타운홀릭]무드있는 겨울신상 세일~! 니트/코트</div>
			</div>
		</div>
		<div class="col-sm-4">
			<div class="panel panel-success">
				<div class="panel-heading">BLACK FRIDAY DEAL</div>
				<div class="panel-body">
					<img
						src="http://cdn.011st.com/11dims/resize/376x376/quality/75/11src/pd/20/7/1/6/5/1/1/ykZIE/2988716511_L300.jpg"
						class="img-responsive" style="width: 100%" alt="Image">
				</div>
				<div class="panel-footer">[K2]다가오늘 겨울 성인&키즈 BEST 다운&플리스&점퍼 모음!</div>
			</div>
		</div>
	</div>
</div>
<br>

<div class="container">
	<div class="row">
		<div class="col-sm-4">
			<div class="panel panel-primary">
				<div class="panel-heading">BLACK FRIDAY DEAL</div>
				<div class="panel-body">
					<img
						src="https://cdn.011st.com/11dims/resize/720x360/quality/75/11src/pd/20/7/8/1/0/7/0/URfTZ/SD2751781070.jpg"
						class="img-responsive" style="width: 100%" alt="Image">
				</div>
				<div class="panel-footer">아이폰12프로/ 갤럭시노트10/ 갤럭시S20 /아이폰11/ XS/
					아이폰8/7 /갤럭시S9/S8 바벨TUA 핸드폰케이스</div>
			</div>
		</div>
		<div class="col-sm-4">
			<div class="panel panel-primary">
				<div class="panel-heading">BLACK FRIDAY DEAL</div>
				<div class="panel-body">
					<img
						src="https://cdn.011st.com/11dims/resize/720x360/quality/75/11src/browsing/seller/2020/11/13/2020111315571302830.jpg"
						class="img-responsive" style="width: 100%" alt="Image">
				</div>
				<div class="panel-footer">[곰블리][11+20%]겨울신발/로퍼/삭스/부츠/플랫/앵클/리본/펌프스/힐/워커/슬립온</div>
			</div>
		</div>
		<div class="col-sm-4">
			<div class="panel panel-primary">
				<div class="panel-heading">BLACK FRIDAY DEAL</div>
				<div class="panel-body">
					<img
						src="https://cdn.011st.com/11dims/resize/720x360/quality/75/11src/browsing/seller/2020/11/13/2020111314211356145.jpg"
						class="img-responsive" style="width: 100%" alt="Image">
				</div>
				<div class="panel-footer">헤라 시그니아 세럼 + 크림 2종세트, 기획세트</div>
			</div>
		</div>
	</div>
</div>
<br>
<br>
</div>

<!-- 밑 그 외 나머지 것들 -->
<div class="container">
	<div class="row">
		<div class="col-sm-8">
			<div id="myCarousel" class="carousel slide" data-ride="carousel">
				<!-- Indicators -->
				<ol class="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
					<li data-target="#myCarousel" data-slide-to="1"></li>
				</ol>

				<!-- Wrapper for slides -->
				<div class="carousel-inner" role="listbox">
					<div class="item active">
						<img
							src="https://mblogthumb-phinf.pstatic.net/MjAxOTA0MDhfNCAg/MDAxNTU0NjcyNzk1NTU5.6qDawyE1ZcAr1VeERaZSSU98_QhsMTHDDvskdat19Y0g.VDieUeTr-L52qsli0RH_aru0TX6LD_gnA1FqLpPsAwMg.JPEG.nanast1004/C_2639_R2_nanast1004_(13).jpg?type=w800"
							alt="Image">
						<div class="carousel-caption">
							<h3>남자 코트</h3>
							<p>사세요 얼른</p>
						</div>
					</div>

					<div class="item">
						<img
							src="https://mblogthumb-phinf.pstatic.net/MjAxOTExMTdfODcg/MDAxNTczOTkxNDc2NTYx.OHlBIfSGhFrn9dciVK-GsWzEnMe0Ki0qnEyqywWYSuog.vdO0x4DEAl3hXNQYuPJrg4oMeedSUyIrIFkW1JdECbEg.JPEG.whoknows_/ami-paris-womens-double-breasted-coat_13817077_22595964_1000-side.jpg?type=w800"
							alt="Image">
						<div class="carousel-caption">
							<h3>여자 코트</h3>
							<p>이쁩니다</p>
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
		<div class="col-sm-4">
			<div class="well">
				<p><a href="#">자세히 보기</a></p>
			</div>
			<div class="well">
				<p>신상</p>
			</div>
			<div class="well">
				<p>후후훙루ㅜ루루</p>
			</div>
			<div class="well">
				<p>리라ㅣ라ㅣ릴</p>
			</div>
		</div>
	</div>
</div>
<hr id="contact">
<script>
	var availableTags = [
							'셔츠',
							'반팔 셔츠',
							'긴팔 셔츠',
							'shirts',
							'Shirts',
							'드레스',
							'dress',
							'Dress',
							'바지',
							'긴바지',
							'반바지',
							'jeans',
							'Jeans',
							'자켓',
							'jackets',
							'Jackets',
							'블레이져',
							'blazers',
							'신발',
							'운동화',
							'구두',
							'샌들',
							'Shoes',
							'shoes'
						];
</script>
<script>
$(document).ready(function(){
	$("#searchBox").autocomplete(availableTags,{
			matchContains:true,
			selectFirst : false
		});
})
</script>
</body>

	</html>
</layoutTag:layout>