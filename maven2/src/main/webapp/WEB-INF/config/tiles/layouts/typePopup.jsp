<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@ taglib uri="tiles-tags" prefix="tiles"%><!DOCTYPE html >
<html lang="ko">
<head>
<tiles:insertAttribute name="title" />
</head>
<body>
	<div>
		<div>
			<tiles:insertAttribute name="body" />
		</div>
		<hr />
		<div>
			<tiles:insertAttribute name="footer" />
		</div>
	</div>
</body>
</html>