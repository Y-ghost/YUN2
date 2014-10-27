<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
<meta name="keywords" content="节水灌溉,手机灌溉,智能灌溉,河南锐利特计算机科技有限公司,Rainet,锐利特科技,云灌溉"/>
<meta name="Description" content="Rainet云灌溉系统(yun.rainet.com.cn)是由河南锐利特计算机科技有限公司研发的一款远程智能灌溉监控系统，涉及到传感器技术、自动控制技术、计算机技术、无线通信技术等多种高新技术,锐利特科技一家从事物联网智能灌溉设备研发、生产、销售以及提供信息技术服务的高新技术企业。"/> 
<base href="<%=basePath%>" />
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<link rel="shortcut icon" href="images/favicon.ico" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title>Rainet云灌溉-把灌溉装进口袋</title>
<link rel="stylesheet" href="<%=basePath%>bootstrap/css/bootstrap.css" />
<link rel="stylesheet" href="<%=basePath%>bootstrap/css/font-awesome.min.css" />
<link rel="stylesheet" href="<%=basePath%>css/t.css" />

<script src="<%=basePath%>js/lib/jquery-1.11.1.min.js"></script>
<script src="<%=basePath%>bootstrap/js/bootstrap.min.js"></script>
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
			<a class="navbar-brand" href="index.jsp" style="padding-top:12px;">
				<img src="images/logo.png" style="width:120px;height:30px;"/>
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
			<div class="col-xs-2 col-md-2 border-right"><a href="#"><i class="fa fa-home fa-2x">&nbsp;控制中心</i></a></div>
			<div class="col-xs-9 col-md-9"><a href="#"><i class="fa fa-envelope fa-2x"><span class="badge">4</span></i></a>
			
			<span class="float-right font-size-18">2014-10-13 14:30:56</span>
			</div>
		</div>
	<!-- Container body -->
		<div class="row">
			<div class="nav col-xs-1 col-md-1 border-right hidden-xs" style="padding-left:15px;">
				<ul class="list-group text-center no-border"style="height:100%">
  					<li class="list-group-item" style="margin-top:20px"><a href="#"><span class="fa fa-desktop fa-2x"></span></a></li>
  					<li class="list-group-item" style="margin-top:15px"><a href="#"><span class="fa fa-bar-chart fa-2x"></span></a></li>
  					<li class="list-group-item" style="margin-top:15px"><a href="#"><span class="fa fa-comment fa-2x"></span></a></li>
  					<li class="list-group-item" style="margin-top:15px"><a href="#"><span class="fa fa-cogs fa-2x"></span></a></li>
				</ul>
			</div>
			<div class="col-xs-2 col-md-2 border-right hidden-xs" style="height:100%">
				<ul class="list-group ul-border-bottom">
  					<li class="list-group-item" style="margin-top:20px"><a href="#"><span>万科集团1</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团2</span> <span class="navbar-right"><i class="fa fa-exclamation-triangle text-danger"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团3</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团4</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团5</span> <span class="navbar-right"><i class="fa fa-exclamation-triangle text-danger"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团6</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团7</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团8</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团9</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团10</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团11</span> <span class="navbar-right"><i class="fa fa-exclamation-triangle text-danger"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团12</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团13</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团14</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团15</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
				</ul>
				<div class="text-center" style="margin-top:50px">
					<ul class="pagination" style="margin:0;">
	  					<li><a href="#">&laquo;</a></li>
	 				    <li><a href="#">1</a></li>
	  					<li><a href="#">&raquo;</a></li>
					</ul>
				</div>
				
			</div>
			<div class="col-xs-12 col-md-9">
				<div class="node-container">
					<div class="node-tools">
						<label class="checkbox-inline">
  							<input type="checkbox"/> 全选
						</label>
						<span class="col-xs-offset-1 col-md-offset-1"></span>
						<button type="button" class="btn btn-success">开启</button>
						<span class="col-xs-offset-1 col-md-offset-1"></span>
						<button type="button" class="btn btn-warning">关闭</button>
					</div>
					
					<div>
						<div class="col-xs-12 col-md-5">
							<div class="panel panel-default ">
  							<div class="panel-heading">
  							<label>节点1</label>
  							<span class="float-right">
  								<input type="checkbox"/>
  							</span>
  							</div>
  							<div class="panel-body">
    							
 						 	</div>
						</div>
						</div>
						
						<div class="col-md-1"></div>
						<div class="col-xs-12 col-md-5">
							<div class="panel panel-default ">
  							<div class="panel-heading">
  							 <label>节点2</label>
  							<span class="float-right">
  								<input type="checkbox"/>
  							</span>
  							</div>
  							<div class="panel-body">
    							
 						 	</div>
						</div>
						</div>
					</div>
				</div>
			
			</div>
		</div>
	</div>
</body>
</html>