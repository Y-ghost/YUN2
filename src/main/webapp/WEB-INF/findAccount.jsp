<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="http://s.lietou-static.com/r/171004/css/v8/common.css" rel="stylesheet" type="text/css">
<link href="http://s.lietou-static.com/r/164123/css/v8/public/public.css" rel="stylesheet" type="text/css">
<link href="http://s.lietou-static.com/r/172442/css/web2.0/public.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="http://s.lietou-static.com/r/164123/css/v8/dialog/simple.css">
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
			<form method="post" action="/passport/chooseEmailOrSms" lt-plugins-valid="0.6503828165587038">
				<table>
					<tbody>
						<tr>
							<th>我的身份是：</th>
							<td><label><input type="radio" checked="checked"
									value="0" name="user_kind"> 经理人</label>&nbsp;&nbsp; <label><input
									type="radio" value="2" name="user_kind"> 猎头</label>&nbsp;&nbsp;
								<label><input type="radio" value="1" name="user_kind">
									HR</label></td>
						</tr>
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