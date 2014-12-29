<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<!-- Header -->
<!-- 放到这里 是header里面的head有效，防止IE8时，自动响应为mobile style-->
<jsp:include page="common/header.jsp" />
<head>
<link rel="stylesheet" href="${requestScope.basePath}bootstrap/css/bootstrap-datetimepicker.min.css" />
</head>
<body>
	<div class="input-group date form_datetime col-md-5" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1">
                    <input class="form-control" size="16" type="text" value="" readonly/>
					<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>


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


	<div class="col-xs-12 col-md-6">
		<div class="panel panel-default ">
			<div class="panel-heading">
				<label>1号节点</label> <span class="float-right"> <input
					type="checkbox" class="cursor" name="1" id="equipmentCheckbox"></span>
			</div>
			<div class="panel-body">
				<form class="form-horizontal" role="form">
					<div class="form-group" id="form-group"><label class="col-sm-3 control-label">饱和水量：</label><div class="col-sm-3"><input type="text" class="form-control soilwater" style="width:65%;float:left;" id="inputLab" data-bv-field="soilwater" value="23.5"><span style="line-height:34px;">&nbsp;&nbsp;%</span></div></div>
					<div class="timeLens" style="display: inline;">
						<hr>
							<div class="form-group" id="form-group"><label class="col-sm-3 control-label">灌溉周期：</label><div class="col-sm-9"><input type="text" class="form-control week cursor " id="inputLab" data-bv-field="week" value="null"></div></div>
							<div class="form-group" id="form-group">
								<label class="col-sm-3 control-label"><input
									type="checkbox">&nbsp;时段一：</label>
								<div class="input-group date col-sm-9">
									<!-- <input type="text" id="timeone" class="form-control cursor"
										style="width: 100px; margin-right: 5px; padding-right: 5px;"
										value="null-null" /> 
									<span style="line-height: 30px; position: relative; float: left;">-</span> 
									<input type="text" id="timetwo" class="form-control cursor"
										style="width: 100px; margin-left: 5px; padding-right: 5px;"
										class="form-control cursor" value="null-null" /> -->
								</div>
							</div>
							<div class="form-group" id="form-group"><label class="col-sm-3 control-label"><input type="checkbox">&nbsp;时段二：</label><div class="col-sm-9"><input type="text" class="form-control timetwo cursor" id="inputLab" data-bv-field="department" value="null-null"></div></div>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<script src="${requestScope.basePath}js/lib/jquery-1.11.1.min.js"></script>
<script src="${requestScope.basePath}bootstrap/js/bootstrap.min.js"></script>
	<script
		src="${requestScope.basePath}bootstrap/js/bootstrap-datetimepicker.min.js"></script>
	<script
		src="${requestScope.basePath}bootstrap/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script type="text/javascript">
		$("#timeone").datetimepicker({
			format : "hh:ii",
	        language:  'zh-CN',
	        weekStart: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 0,
			minView: 0,
			forceParse: 0
		});
		$("#timetwo").datetimepicker({
			format : "hh:ii",
	        language:  'zh-CN',
	        weekStart: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 0,
			minView: 0,
			forceParse: 0
		});
		$("#time1").datetimepicker({
			format : "hh:ii",
	        language:  'zh-CN',
	        weekStart: 1,
			autoclose: 1,
			todayHighlight: true,
			startView: 2,
			minView: 0,
			forceParse: true
		});
		$("#time2").datetimepicker({
			format : "hh:ii",
	        language:  'zh-CN',
	        weekStart: 1,
			autoclose: 1,
			todayHighlight: true,
			startView: 1,
			minView: 0,
			forceParse: true
		});
		$(".form_datetime").datetimepicker({
			format : "mm-dd",
	        language:  'zh-CN',
	        weekStart: 1,
			autoclose: 1,
			todayHighlight: true,
			startView: 2,
			minView: 0,
			forceParse: true
		});
	</script>
</body>
</html>
