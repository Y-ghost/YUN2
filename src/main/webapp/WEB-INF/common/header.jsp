<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
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
<link rel="stylesheet" href="${requestScope.basePath}css/message.css" />
</head>
<body>
	<!-- Header -->
	<nav class="navbar navbar-default" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"  data-toggle="collapse" data-target="#navbar">
				<span class="sr-only">Toggle navigation</span> 
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="index" style="padding-top:12px;">
				<img src="${requestScope.basePath}images/logo.png" style="width:120px;height:30px;"/>
				<span style="color: #000;font-size:18px;border:#000 0px solid;"> 云灌溉</span>
			</a>
		</div>
		<div id="navbar" class="collapse navbar-collapse">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#" title="退出"><i class="fa fa-power-off fa-2x"></i></a></li>
			</ul>
		</div>
	</div>
	</nav>
	<div class="container-fluid" style="height:100%">
	<!-- Container Header -->
		<div class="row border-bottom hidden-xs" style="padding-bottom:10px;">
			<div class="col-xs-1 col-md-1 border-right text-center"><a href="#"><i class="fa fa-bars fa-2x"></i></a></div>
			<div class="col-xs-2 col-md-2 border-right"><a href="#" id="homeHref"><i class="fa fa-home fa-2x" >&nbsp;<span style="font-size:18px;" id="homeLab"></span></i></a></div>
			<div class="col-xs-9 col-md-9"><a href="#"><i class="fa fa-envelope fa-2x"><span class="badge">4</span></i></a>
			
			<span class="float-right font-size-18">2014-10-13 14:30:56</span>
			</div>
		</div>
	</div>
<input type="hidden" id="basePath" value="${requestScope.basePath}"/>
</body>
</html>