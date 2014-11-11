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
.input-group-container .form-control-feedback{top:35px !important; right:0px !important;}
</style>
</head>
<body>
	<!-- header -->
	<jsp:include page="common/header.jsp" />
	<div class="container">
		<form class="form-horizontal form-signin" role="form">
			<div class="text-center"><h2>用户注册</h2></div>
			<div class="form-group input-group-container">
				<div class="input-group input-group-lg">
					<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span> 
					<input type="text" class="form-control" placeholder="用户名" name="loginname" id="loginname">
				</div>
			</div>
			
			<div class="form-group input-group-container">
				<div class="input-group input-group-lg">
					<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span> 
					<input type="password" class="form-control" placeholder="密码" name="password" id="password">
				</div>
			</div>
			
			<div class="form-group input-group-container">
				<div class="input-group input-group-lg">
					<span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span> 
					<input type="email" class="form-control" placeholder="邮箱" name="email" id="email">
				</div>
			</div>
			<div class="form-group input-group-container">
				<div class="input-group input-group-lg">
					<span class="input-group-addon"><span class="glyphicon glyphicon-phone"></span></span> 
					<input type="tel" class="form-control" placeholder="电话" name="phone" id="phone">
				</div>
			</div>
			<div class="form-group input-group-container">
				<div class="input-group input-group-lg">
					<span class="input-group-addon"><span class="glyphicon glyphicon-map-marker"></span></span> 
					<input type="text" class="form-control" placeholder="地址" name="address" id="address">
				</div>
			</div>
			<div>
				<button type="submit" class="btn btn-primary btn-lg btn-block">免费注册</button>
			</div>
			<div>
				<div class="col-sm-6">
					<input type="checkbox" checked name="serviceAgreement"/>&nbsp;&nbsp;接受<a href="${requestScope.basePath}indexs/login">用户服务协议</a>
				</div>
				<div class="col-sm-6 text-right" style="margin-bottom:20%;">
					已有账号，<a href="${requestScope.basePath}indexs/login">立马登录</a>
				</div>
			</div>
		</form>
	</div>
	<!-- footer -->
	<jsp:include page="common/footer.jsp" />
	
	<script src="${requestScope.basePath}js/login.js"></script>
</body>
</html>