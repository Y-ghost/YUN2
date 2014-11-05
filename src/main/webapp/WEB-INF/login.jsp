<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="keywords" content="节水灌溉,手机灌溉,智能灌溉,河南锐利特计算机科技有限公司,Rainet,锐利特科技,云灌溉"/>
<meta name="Description" content="Rainet云灌溉系统(yun.rainet.com.cn)是由河南锐利特计算机科技有限公司研发的一款远程智能灌溉监控系统，涉及到传感器技术、自动控制技术、计算机技术、无线通信技术等多种高新技术,锐利特科技一家从事物联网智能灌溉设备研发、生产、销售以及提供信息技术服务的高新技术企业。"/> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<link rel="shortcut icon" href="images/favicon.ico" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title>Rainet云灌溉-把灌溉装进口袋</title>
<link rel="stylesheet" href="${requestScope.basePath}bootstrap/css/bootstrap.css" />
<link rel="stylesheet" href="${requestScope.basePath}bootstrap/css/font-awesome.min.css" />
<link rel="stylesheet" href="${requestScope.basePath}bootstrap/validation/css/bootstrapValidator.min.css" />
<style type="text/css">
.form-signin {
	width : 500px;
	margin: 30px auto;
}

.form-signin div {
	padding : 15px 0;
}
</style>
</head>
<body>
	<div class="container">


		<form class="form-horizontal form-signin" role="form">
	
			<div class="text-center"><h1>Rainet云灌溉</h1></div>
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
					<a href="#">忘记密码</a>
				</div>
				<div class="col-sm-6 text-right">
					没有账号？<a href="#">注册</a>
				</div>
				
			</div>
		</form>

	</div>
<script src="${requestScope.basePath}js/lib/jquery-1.11.1.min.js"></script>
<script src="${requestScope.basePath}bootstrap/js/bootstrap.min.js"></script>
<script src="${requestScope.basePath}bootstrap/validation/js/bootstrapValidator.min.js"></script>
<script src="${requestScope.basePath}js/lib/jquery.noty.packaged.min.js"></script>
<script src="${requestScope.basePath}js/settings.js"></script>
<script src="${requestScope.basePath}js/common.js"></script>
<script src="${requestScope.basePath}js/ajax.js"></script>
</body>
</html>