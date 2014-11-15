<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!-- header -->
	<jsp:include page="common/header.jsp" />
<head>
<style type="text/css">
.form-signin {
	width: 500px;
	margin: 30px auto;
}

.form-signin div {
	padding: 15px 0;
}

#headLine {
	display: none;
}

#passport-title h2 {
	font-size: 28px;
	padding-left: 30px;
	line-height: 50px;
	font-family: '黑体';
	font-weight: 700;
}

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code,
	form, fieldset, legend, input, textarea, p, blockquote, th, td, img {
	margin: 0;
	padding: 0;
}

h2 {
	display: block;
	font-size: 1.5em;
	-webkit-margin-before: 0.83em;
	-webkit-margin-after: 0.83em;
	-webkit-margin-start: 0px;
	-webkit-margin-end: 0px;
	font-weight: bold;
}

div {
	display: block;
}

.wrap {
	width: 960px;
	margin: 0 auto;
}

.passport-progress {
	margin-bottom: 20px;
}

.passport-progress {
	width: 900px;
	margin: 0 auto;
	font-family: 'Microsoft YaHei';
}

body {
	color: #333;
	font-size: 12px;
	line-height: 22px;
	font-family: Tahoma, "\5b8b\4f53", Arial, Helvetica, STHeiti;
	background: #fff;
	_height: 100%;
}

.passport-progress ul li.current {
	background-color: #3e8cbd;
	color: #fff;
}

.passport-progress ul li {
	width: 300px;
	background-color: #e4e4e4;
	text-align: center;
	font-size: 14px;
	line-height: 31px;
	float: left;
	position: relative;
}

.passport-progress ul {
	border-radius: 5px;
	overflow: hidden;
}

ul {
	list-style: none;
}

li {
	list-style: none;
}

.passport-progress ul li em {
	position: absolute;
	left: -16px;
	top: 0;
	width: 32px;
	height: 31px;
	background: url(${requestScope.basePath}images/arrow_progress.png)
		no-repeat;
}

#passport-finder .content {
	padding: 50px;
	font-size: 14px;
}

#passport-finder .content table {
	width: 100%;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

element.style {
	
}

#passport-finder .content table {
	width: 100%;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
	display: table;
	border-color: gray;
}

tbody {
	display: table-row-group;
	vertical-align: middle;
	border-color: inherit;
}

tr {
	display: table-row;
	vertical-align: inherit;
	border-color: inherit;
}

#passport-finder .content table tr th {
	width: 200px;
	text-align: right;
	font-weight: 400;
}

#passport-finder .content table tr th, #passport-finder .content table tr td
	{
	padding: 6px;
}

.input-text-v3-normal {
	font-size: 14px;
	height: 30px;
	line-height: 30px;
}

.input-text-v3 {
	border-radius: 3px;
	border-top: 1px solid #999;
	border-left: 1px solid #a2a2a2;
	border-right: 1px solid #a9a9a9;
	border-bottom: 1px solid #b2b2b2;
	padding: 0 .5em;
	color: #000;
	font-family: 'Microsoft YaHei';
	background-color: #fefefe;
	vertical-align: middle;
	outline: 0;
}

input, textarea, select {
	font-weight: inherit;
}

p {
	display: block;
	-webkit-margin-before: 1em;
	-webkit-margin-after: 1em;
	-webkit-margin-start: 0px;
	-webkit-margin-end: 0px;
}

input.btn-3d {
	overflow: visible;
	height: 30px;
}

.btn-3d-blue {
	text-shadow: 1px 1px 1px #14486a;
	color: #fff;
	border-color: #4599ce;
	background: #3b86b7;
	background-image: -webkit-gradient(linear, left top, left bottom, from(#4599ce),
		to(#3b86b7));
	background-image: -webkit-linear-gradient(#4599ce, #3b86b7);
	background-image: -moz-linear-gradient(#4599ce, #3b86b7);
	background-image: -ms-linear-gradient(#4599ce, #3b86b7);
	background-image: -o-linear-gradient(#4599ce, #3b86b7);
	background-image: linear-gradient(#4599ce, #3b86b7);
}

.btn-3d {
	font-family: "Microsoft YaHei";
	vertical-align: middle;
	display: inline-block;
	font-size: 14px;
	line-height: 28px !important;
	height: 28px;
	padding: 0 14px;
	border-radius: 5px;
	box-shadow: 1px 1px 1px #ccc;
	border-style: solid;
	border-width: 1px;
	cursor: pointer;
}
</style>
</head>
<body>
	<div id="passport-title">
		<div class="wrap">
			<h2>找回密码</h2>
		</div>
	</div>
	<div id="passport-finder" class="wrap">
		<div class="passport-progress">
			<ul>
				<li class="current">验证身份</li>
				<li>设置新密码<em></em></li>
				<li>完成<em></em></li>
			</ul>
		</div>
		<div class="content">
			<form action="#">
				<table>
					<tbody>
						<tr>
							<th>登录邮箱/用户名：</th>
							<td><input data-selector="passport_username" type="text"
								name="user_login" class="input-text-v3 input-text-v3-normal"
								size="40" maxlength="60" value=""></td>
						</tr>
						<tr>
							<th>验证码：</th>
							<td><input data-selector="passport_vc" type="text"
								name="rand" class="input-text-v3 input-text-v3-normal" size="40"
								maxlength="60" validate-title="验证码"
								validate-rules="[['required','$不能为空']]"></td>
						</tr>
						<tr>
							<th></th>
							<td><img class="very-image"
								src="http://www.liepin.com/image/randomcode/?0.11431201244704425"><a
								class="very-link" href="javascript:;">看不清，换一张</a></td>
						</tr>
						<tr>
							<th></th>
							<td>
								<p class="buttons">
									<input type="submit" class="btn-3d btn-3d-normal btn-3d-blue"
										value="下一步">
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	</div>

	<!-- footer -->
	<jsp:include page="common/footer.jsp" />
</body>
</html>