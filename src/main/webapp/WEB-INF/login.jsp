<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style type="text/css">
.form-signin {
	width : 500px;
	margin: 30px auto;
}

.form-signin div {
	padding : 15px 0;
}
#headLine{
	display:none;
}
</style>
</head>
<body>
	<!-- header -->
	<jsp:include page="common/header.jsp" />
	<div class="container">
		<form class="form-horizontal form-signin" role="form">
			<div class="text-center"><h2>欢迎登录</h2></div>
			<div class="input-group input-group-lg">
				<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span> 
				<input type="text" class="form-control" placeholder="用户名" name="username" id="username">
			</div>
			<div class="input-group input-group-lg">
				<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span> 
				<input type="password" class="form-control" placeholder="密码" name="password" id="password">
			</div>
			<div>
				<button type="submit" class="btn btn-primary btn-lg btn-block">登录</button>
			</div>
			<div>
				<div class="col-sm-6">
					<a href="${requestScope.basePath}indexs/findAccount">忘记密码?</a>
				</div>
				<div class="col-sm-6 text-right" style="margin-bottom:20%;">
					没有账号？<a href="${requestScope.basePath}indexs/register">立即注册</a>
				</div>
			</div>
		</form>
	</div>
	<!-- footer -->
	<jsp:include page="common/footer.jsp" />
	
	<script src="${requestScope.basePath}js/login.js"></script>
</body>
</html>