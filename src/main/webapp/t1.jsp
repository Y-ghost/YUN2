<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<base href="<%=basePath%>" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>test1</title>
<link rel="stylesheet" href="<%=basePath%>bootstrap/css/bootstrap.css" />
<link rel="stylesheet" href="<%=basePath%>bootstrap/css/font-awesome.min.css" />
</head>
<body>
	<p><i class="icon-align-justify icon-1x"></i>  &nbsp;&nbsp;icon-align-justify</p>
	<p><i class="icon-indent-left icon-1x"></i>  &nbsp;&nbsp;icon-indent-left</p>
	<p><i class="icon-indent-right icon-1x"></i>  &nbsp;&nbsp;icon-indent-right</p>
	<p><i class="icon-tint icon-1x"></i>  &nbsp;&nbsp;icon-tint</p>
	<p><i class="icon-refresh icon-1x"></i>  &nbsp;&nbsp;icon-refresh</p>
	<p><i class="icon-envelope icon-1x"></i>   &nbsp;&nbsp;icon-envelope</p>
	<p><i class="icon-envelope-alt icon-1x"></i>   &nbsp;&nbsp;icon-envelope-alt</p>
	<p><i class="icon-warning-sign icon-1x"></i>   &nbsp;&nbsp;icon-warning-sign</p>
	<p><i class="icon-signal icon-1x"></i>   &nbsp;&nbsp;icon-signal</p>
	<p><i class="icon-home icon-1x"></i> &nbsp;&nbsp;icon-home</p>
	<p><i class="icon-off icon-2x"></i> &nbsp;&nbsp;icon-off</p>
	<p><i class="icon-desktop icon-2x"></i>  &nbsp;&nbsp;icon-desktop</p>
	<p><i class="icon-comment icon-2x"></i>  &nbsp;&nbsp;icon-comment</p>
	<p><i class="icon-cogs icon-2x"></i>  &nbsp;&nbsp;icon-cogs</p>
	<p><i class="icon-bar-chart icon-2x"></i>  &nbsp;&nbsp;icon-bar-chart</p>
</body>
</html>