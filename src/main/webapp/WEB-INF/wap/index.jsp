<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
<meta name="keywords" content="节水灌溉,手机灌溉,智能灌溉,河南锐利特计算机科技有限公司,Rainet,锐利特科技,云灌溉"/>
<meta name="Description" content="Rainet云灌溉系统(yun.rainet.com.cn)是由河南锐利特计算机科技有限公司研发的一款远程智能灌溉监控系统，涉及到传感器技术、自动控制技术、计算机技术、无线通信技术等多种高新技术,锐利特科技一家从事物联网智能灌溉设备研发、生产、销售以及提供信息技术服务的高新技术企业。"/> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<link rel="shortcut icon" href="${requestScope.basePath}images/favicon.ico" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title>Rainet云灌溉-把灌溉装进口袋</title>
</head>
<jsp:include page="common/header.jsp" />
<body>
	<div class="container v-content" id="v-content">
	   <div class="menu">
	   	<ul>
			<li id="projects"><a href="${requestScope.basePath}indexs/messages?type=project">项目信息</a><i class="pull-right fa fa-angle-right"></i></li>
			<li id="nodes"><a href="${requestScope.basePath}indexs/messages?type=node">节点信息</a><i class="pull-right fa fa-angle-right"></i></li>
		</ul>
	   </div>
	</div>
	<jsp:include page="common/footer.jsp" />
	<script src="${requestScope.basePath}wap/js/index.js"></script>
</body>
</html>
