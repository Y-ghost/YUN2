<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<!-- Header -->
<!-- 放到这里 是header里面的head有效，防止IE8时，自动响应为mobile style-->
<jsp:include page="common/header.jsp" />
<head>
<link rel="stylesheet" href="${requestScope.basePath}bootstrap/css/default.css" />
<link rel="stylesheet" href="${requestScope.basePath}bootstrap/css/default.date.css" />
<link rel="stylesheet" href="${requestScope.basePath}bootstrap/css/default.time.css" />
</head>
<body>
		<div style="font-family: '微软雅黑,宋体';margin:50px;width:850px;font-size: 14px; border: #ccc 1px solid;">
			<div style="height:70px; color: #999999;line-height: 60px;margin-top: 0px;background-color: #fbfbfb;font-size: 12px;border-bottom: #eeeeee 1px solid;border-top: #1b926c 1px solid;"> 
				<div style="float:left;margin-right:15px;margin-left:15px;padding:5px;font-family: 'Copperplate Gothic Bold'; font-size: 36px; color: #000;">Rainet</div> 
				<div style="float:left;margin-top: 12px;">此信为系统邮件，请不要直接回复。</div>
				<div style="float:right;margin-right:60px; margin-top: 12px;"><a href="http://www.rainet.com.cn/contact.jsp" style="font-family: 'Copperplate Gothic Bold';"><strong><font color="#666666">服务中心</font></strong></a></div>
				<div style="float:right;margin-right:30px; margin-top: 12px;"><a href="http://www.rainet.com.cn/service.jsp" style="font-family: 'Copperplate Gothic Bold';">产品中心</a></div>
				<div style="float:right;margin-right:30px; margin-top: 12px;"><a href="http://www.rainet.com.cn" style="font-family: 'Copperplate Gothic Bold';">首页</a></div>
			</div>
			
			<div style="padding:20px;">
			
				<div style="height:30px;line-height: 30px;margin-top: 10px;">亲爱的 <span style="font-size: 18px;font-weight:700;">锐利特</span> 用户：</div>
				<div style="height:40px;padding-left:28px;line-height: 40px;">您好！</div>
				<div style="height:30px;padding-left:28px;line-height: 30px;">您收到这封这封电子邮件是因为您 (也可能是某人冒充您的名义) 申请了一个新的密码。假如这不是您本人所申请, 请不用理会</div>
				<div style="height:30px;line-height: 30px;">这封电子邮件, 但是如果您持续收到这类的信件骚扰, 请您尽快联络管理员。</div>
				<div style="height:30px;padding-left:28px;line-height: 30px;">要使用新的密码,请点击以下链接启用密码:</div>
				<div style="height:50px;text-align:center;line-height: 50px;"><a href="http://localhost/YUN/user/reset_password?userName=admin&amp;sid=D692B14FB450B137AD052F8A03FC329E" style="font-family: 'Copperplate Gothic Bold'; font-size: 20px; color: #1b926c;">点击我重设密码</a></div>
				<div style="height:30px;padding-left:28px;line-height: 30px;">(如果无法点击该URL链接地址，请将它复制并粘帖到浏览器的地址输入框，然后单击回车即可。该链接使用后将立即失效。)</div>
				<div style="height:30px;line-height: 30px;padding-left:28px;">注意:请您在收到邮件1个小时内( <span style="font-size: 18px;font-weight:700;color:#000;">2015-01-28 00:41:57</span> 前 )使用，否则该链接将会失效。想了解更多云灌溉信息，请访问</div>
				<div style="height:30px;line-height: 30px;"> <a href="http://www.rainet.com.cn" style="font-family: 'Copperplate Gothic Bold'; font-size: 16px; color: #1b926c;">官网首页</a>或者登录 <a href="http://yun.rainet.com.cn" style="font-family: 'Copperplate Gothic Bold'; font-size: 16px; color: #1b926c;">云灌溉系统</a>。</div>
				<div style="height:1px;margin-top:20px;margin-bottom:20px;border-top: #e7e7e7 solid 1px;"></div>
				<div style="height:30px;padding-left:28px;line-height: 30px;">锐利特科技将一如既往、热忱的为您服务！</div>
				<div style="height:30px;padding-left:28px;line-height: 30px;">与您携手共创智慧生活，开启未来的世界!</div>
				<div style="height:30px;padding-left:28px;line-height: 30px;margin-bottom: 30px;">用户服务支持：<a href="mailto:service@rainet.com.cn">service@rainet.com.cn</a></div>
			</div>
		</div>
			<br><br><br>




	<div class="input-group date form_datetime col-md-5" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1">
                    <input class="form-control" size="16" type="text" value="" readonly/>
					<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>

<input type="text" id="a"></input>

	<div class="form-group" id="form-group">
		<label class="col-sm-3 control-label"><input type="checkbox"/>&nbsp;时段一：</label>
		<div class="input-group date col-sm-9">
			<input type="text" id="time1" class="form-control cursor" style="width:100px;margin-right:5px;padding-right:5px;"
				/>
			<span style="line-height:30px;position: relative;float: left;">-</span>
			<input type="text" id="time2" class="form-control cursor" style="width:100px;margin-left:5px;padding-right:5px;"
				class="form-control cursor"/>
		</div>
	</div>

	<div class="col-xs-12 col-md-6">
		<div class="panel panel-default ">
			<div class="panel-heading">
				<label>1号节点</label> <span class="float-right"> <input
					type="checkbox" class="cursor" name="1" id="equipmentCheckbox"></span>
			</div>
			<div class="panel-body">
				<form class="form-horizontal" role="form">
					<div class="input-group date col-md-5">
	                    <input class="form_datetime" size="16" type="text" value="" readonly/>
	                </div>
					<div class="form-group"
						style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: #ddd 1px solid;"
						id="form-group">
						<input type="hidden" class="parama1" value="12"><input
							type="hidden" class="paramb1" value="12"><input
								type="hidden" class="paramc1" value="12"><input
									type="hidden" class="paramd1" value="12"><input
										type="hidden" class="parama2" value="12"><input
											type="hidden" class="paramb2" value="12"><input
												type="hidden" class="paramc2" value="12"><input
													type="hidden" class="paramd2" value="12"><input
														type="hidden" class="parama3" value="12"><input
															type="hidden" class="paramb3" value="12"><input
																type="hidden" class="paramc3" value="12"><input
																	type="hidden" class="paramd3" value="12"><input
																		type="hidden" class="parama4" value="12"><input
																			type="hidden" class="paramb4" value="12"><input
																				type="hidden" class="paramc4" value="12"><input
																					type="hidden" class="paramd4" value="12"><input
																						type="hidden" class="parama5" value="12"><input
																							type="hidden" class="paramb5" value="12"><input
																								type="hidden" class="paramc5" value="12"><input
																									type="hidden" class="paramd5" value="12"><div
																											class="col-sm-4 text-center">
																											<input type="radio" name="model"
																												class="modelClass" checked="" id="inputLab"
																												value="0">&nbsp;&nbsp;&nbsp;&nbsp;手动
																										</div>
																										<div class="col-sm-4 text-center">
																											<input type="radio" name="model"
																												class="modelClass" id="inputLab" value="1">&nbsp;&nbsp;&nbsp;&nbsp;自动
																										</div>
																										<div class="col-sm-4 text-center">
																											<input type="radio" name="model"
																												class="modelClass" id="inputLab" value="2">&nbsp;&nbsp;&nbsp;&nbsp;时段
																										</div>
					</div>
					<div class="form-group " id="form-group">
						<label class="col-sm-3 control-label">土壤：</label>
						<div class="col-sm-6">
							<select class="form-control soil" value="null" id="inputLab"><option>-选择土壤-</option>
								<option value="1">沙土</option>
								<option value="2">黏土</option></select>
						</div>
						<div class="col-sm-3" style="line-height: 34px;">
							<a class="cursor soilLink" id="inputLab">自定义</a>
						</div>
					</div>
					<div class="form-group" id="form-group">
						<label class="col-sm-3 control-label">湿度上限：</label>
						<div class="col-sm-3">
							<input type="text" class="form-control humidityup"
								style="width: 65%; float: left;" id="inputLab"
								data-bv-field="humidityup" value="100"><span
								style="line-height: 34px;">&nbsp;&nbsp;%</span>
						</div>
						<label class="col-sm-3 control-label">湿度下限：</label>
						<div class="col-sm-3">
							<input type="text" class="form-control humiditydown"
								style="width: 65%; float: left;" id="inputLab"
								data-bv-field="humiditydown" value="60"><span
								style="line-height: 34px;">&nbsp;&nbsp;%</span>
						</div>
					</div>
					<div class="form-group" id="form-group">
						<label class="col-sm-3 control-label">温度上限：</label>
						<div class="col-sm-3">
							<input type="text" class="form-control temperatureup"
								style="width: 65%; float: left;" id="inputLab"
								data-bv-field="temperatureup" value="30"><span
								style="line-height: 34px;">&nbsp;&nbsp;℃</span>
						</div>
						<label class="col-sm-3 control-label">温度下限：</label>
						<div class="col-sm-3">
							<input type="text" class="form-control temperaturedown"
								style="width: 65%; float: left;" id="inputLab"
								data-bv-field="temperaturedown" value="0"><span
								style="line-height: 34px;">&nbsp;&nbsp;℃</span>
						</div>
					</div>
					<div class="form-group" id="form-group">
						<label class="col-sm-3 control-label">饱和水量：</label>
						<div class="col-sm-3">
							<input type="text" class="form-control soilwater"
								style="width: 65%; float: left;" id="inputLab"
								data-bv-field="soilwater" value="23.5"><span
								style="line-height: 34px;">&nbsp;&nbsp;%</span>
						</div>
					</div>
					<div class="timeLens" style="display: inline;">
						<hr>
							<div class="form-group" id="form-group">
								<label class="col-sm-3 control-label">灌溉周期：</label>
								<div class="col-sm-9">
									<input type="text" class="form-control week cursor "
										id="inputLab" data-bv-field="week" value="null">
								</div>
							</div>
							<div class="form-group" id="form-group">
								<label class="col-sm-3 control-label"><input
									type="checkbox">&nbsp;时段一：</label>
								<div class="input-group date col-sm-9">
									<input type="text" id="timeone" class="form-control cursor"
										style="width: 100px; margin-right: 5px; padding-right: 5px;"
										value="null-null" /> 
									<span style="line-height: 30px; position: relative; float: left;">-</span> 
									<input type="text" id="timetwo" class="form-control cursor"
										style="width: 100px; margin-left: 5px; padding-right: 5px;"
										class="form-control cursor" value="null-null" />
								</div>
							</div>
							<div class="form-group" id="form-group">
								<label class="col-sm-3 control-label"><input
									type="checkbox">&nbsp;时段二：</label>
								<div class="col-sm-9">
									<input type="text" class="form-control timetwo cursor"
										id="inputLab" data-bv-field="department" value="null-null">
								</div>
							</div>
							<div class="form-group" id="form-group">
								<label class="col-sm-3 control-label"><input
									type="checkbox">&nbsp;时段三：</label>
								<div class="col-sm-9">
									<input type="text" class="form-control timethree cursor"
										id="inputLab" data-bv-field="address" value="null-null">
								</div>
							</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<script src="${requestScope.basePath}js/lib/jquery-1.11.1.min.js"></script>
<script src="${requestScope.basePath}bootstrap/js/picker.js"></script>
<script src="${requestScope.basePath}bootstrap/js/picker.date.js"></script>
<script src="${requestScope.basePath}bootstrap/js/picker.time.js"></script>
	<script type="text/javascript">
		/* $(".startDate").pickadate({
		    today: '今天',
		    clear: '关闭',
		    selectYears: true,
		    selectMonths: true
			}); */
		$("#timeone").pickatime({
			format: 'H:i',
			clear: '关闭'
		});
		$("#timetwo").pickatime({
			format: 'H:i',
			clear: '关闭'
		});
	</script>
</body>
</html>
