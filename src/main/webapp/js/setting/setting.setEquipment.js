;
"user strict";

var rainet = rainet || {};
rainet.setting = rainet.setting || {};
rainet.setting.controller = rainet.setting.controller || {}; 
var flag = true;

// 主机信息
rainet.setting.controller.setEquipment = {
		// 全选
		checked : function(){
			$(".checkAll").change(function() {
				if($(this).is(':checked')){
					$("[id='equipmentCheckbox']").each(function(){
						$(this)[0].checked = true;
					});
	            }else{
	            	$("[id='equipmentCheckbox']").each(function(){
	            		$(this)[0].checked = false;
					});
	            }
			}); 
		},
		
		// 查询事件
		findEquipments : function($projectList){
			var _soilInfoTempate = $(this.soilInfoTempate);
			var _plantsInfoTempate= $(this.plantsInfoTempate);
			var _growthCycleHeader=$(this.growthCycleHeader);
			var _growthCycle=$(this.growthCycle);
			//查询项目下的节点信息
			$(".findBtn").off('click').on('click', function(e){
				if(flag){
					flag = false;
					var projectId = $projectList.val();
					if(projectId!="-1"){
						var param = {pId:projectId};
						param.handleError = function(result){
							flag = true;
							return true;
						};
						//土壤初始化
						var selectSoilStr = "";
						rainet.setting.service.soilInfo.list(function(item){
							$.each(item,function(i,data){
								selectSoilStr += "<option value=\""+data.id+"\">"+data.soiltype+"</option>";
							});
						});
						//植物初始化
						var selectPlantsStr = "";
						rainet.setting.service.plants.list(function(item){
							$.each(item,function(i,data){
								selectPlantsStr += "<option value=\""+data.id+"\">"+data.plantsname+"</option>";
							});
						});
						rainet.setting.service.equipment.selectEquipments(param, function(data){
							var $EquipmentList = $(".EquipmentList");
							var str = "";
							$.each(data,function(index,item){
								var radio = "";
								switch(item.equipment.irrigationtype){
								case 0:
									radio = "<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" checked id=\"inputLab\" value=\"0\" >&nbsp;&nbsp;&nbsp;&nbsp;手动</input></div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" id=\"inputLab\" value=\"1\">&nbsp;&nbsp;&nbsp;&nbsp;自动</div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" id=\"inputLab\" value=\"2\">&nbsp;&nbsp;&nbsp;&nbsp;时段</div></div>" ;
									break;
								case 1:
									radio = "<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" id=\"inputLab\" value=\"0\" >&nbsp;&nbsp;&nbsp;&nbsp;手动</input></div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" checked id=\"inputLab\" value=\"1\">&nbsp;&nbsp;&nbsp;&nbsp;自动</div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" id=\"inputLab\" value=\"2\">&nbsp;&nbsp;&nbsp;&nbsp;时段</div></div>" ;
									break;
								case 2:
									radio = "<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" id=\"inputLab\" value=\"0\" >&nbsp;&nbsp;&nbsp;&nbsp;手动</input></div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" id=\"inputLab\" value=\"1\">&nbsp;&nbsp;&nbsp;&nbsp;自动</div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"irrigationtype\" class=\"modelClass\" checked id=\"inputLab\" value=\"2\">&nbsp;&nbsp;&nbsp;&nbsp;时段</div></div>" ;
									break;
								}
								
								var timeLen = "";
								switch(item.equipment.irrigationtype){
								case 0:
									timeLen = "<div class=\"timeLens\" style=\"display:none;\">" ;
									break;
								case 1:
									timeLen = "<div class=\"timeLens\" style=\"display:none;\">" ;
									break;
								case 2:
									timeLen = "<div class=\"timeLens\">" ;
									break;
								}
								
								//时段
								var week = "";
								var timeonestart = "";
								var timeoneend = "";
								var timetwostart = "";
								var timetwoend = "";
								var timethreestart = "";
								var timethreeend = "";
								
								if(item.equipment.week != null){
									week = item.equipment.week;
								}
								
								if(item.equipment.timeonestart != null){
									timeonestart = item.equipment.timeonestart;
								}
								if(item.equipment.timeoneend != null){
									timeoneend = item.equipment.timeoneend;
								}
								if(item.equipment.timetwostart != null){
									timetwostart = item.equipment.timetwostart;
								}
								if(item.equipment.timetwoend != null){
									timetwoend = item.equipment.timetwoend;
								}
								if(item.equipment.timethreestart != null){
									timethreestart = item.equipment.timethreestart;
								}
								if(item.equipment.timethreeend != null){
									timethreeend = item.equipment.timethreeend;
								}
								
								str =str + "<div class=\"col-xs-12 col-md-6\">" +
											"<div class=\"panel panel-default \">" +
											"<div class=\"panel-heading\">" +
											"<label>"+item.equipment.name+"</label> <span class=\"float-right\"> <input type=\"checkbox\" class=\"cursor\" name=\"id\" value=\""+item.equipment.id+"\" id=\"equipmentCheckbox\"></span></div>" +
											"<div class=\"panel-body\">" +
											"<form class=\"form-horizontal\" role=\"form\">" +
												"<div class=\"form-group has-feedback\" style='margin-bottom:10px;padding-bottom:10px;border-bottom:#ddd 1px solid;' id=\"form-group\">" +
												"<input type=\"hidden\" name=\"id\" value=\""+item.equipment.id+"\"/>" +
												"<input type=\"hidden\" name=\"code\" value=\""+item.equipment.code+"\"/>" +
												"<input type=\"hidden\" name=\"controlhostid\" value=\""+item.equipment.controlhostid+"\"/>"+	
												radio+
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">土壤：</label>" +
													"<div class=\"col-sm-6\"><select class=\"form-control soilname\" name=\"soilname\" id=\"inputLab\"><option value=\"-1\">-选择土壤-</option>"+selectSoilStr+"</select></div>" +
													"<div class=\"col-sm-3\" style='line-height:34px;'><a class=\"cursor soilLink\" id=\"inputLab\">自定义</a></div></div>" +
												"<div class=\"form-group has-feedback\" style='margin-bottom:10px;padding-bottom:10px;border-bottom:#ddd 1px solid;' id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">植物：</label>" +
													"<div class=\"col-sm-6\"><select class=\"form-control plantsname\" name=\"plantsname\" id=\"inputLab\"><option value=\"-1\">-选择植物-</option>"+selectPlantsStr+"</select></div>" +
													"<div class=\"col-sm-3\" style='line-height:34px;'><a class=\"cursor plantsLink\" id=\"inputLab\">自定义</a></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">根系深度：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control rootdepth\" name=\"rootdepth\" id=\"inputLab\" data-bv-field=\"rootdepth\" value=\""+item.equipment.rootdepth+"\"><span style='line-height:34px;'>&nbsp;&nbsp;cm</span></div>" +
													"<label class=\"col-sm-3 control-label\">土壤干重：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\"style='width:35%;float:left;' class=\"form-control soilweight\" name=\"soilweight\" id=\"inputLab\" data-bv-field=\"soilweight\" value=\""+item.equipment.soilweight+"\"><span style='line-height:34px;font-size:10px;'>&nbsp;&nbsp;g/cm<sup>3</sup></span></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">湿度上限：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control humidityup\" name=\"humidityup\" id=\"inputLab\" data-bv-field=\"humidityup\" value=\""+item.equipment.humidityup+"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div>" +
													"<label class=\"col-sm-3 control-label\">湿度下限：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control humiditydown\" name=\"humiditydown\" id=\"inputLab\" data-bv-field=\"humiditydown\" value=\""+item.equipment.humiditydown+"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">温度上限：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control temperatureup\" name=\"temperatureup\" id=\"inputLab\" data-bv-field=\"temperatureup\" value=\""+item.equipment.temperatureup+"\"><span style='line-height:34px;'>&nbsp;&nbsp;℃</span></div>" +
													"<label class=\"col-sm-3 control-label\">温度下限：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control temperaturedown\" name=\"temperaturedown\" id=\"inputLab\" data-bv-field=\"temperaturedown\" value=\""+item.equipment.temperaturedown+"\"><span style='line-height:34px;'>&nbsp;&nbsp;℃</span></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">饱和水量：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control soilwater\" name=\"soilwater\" id=\"inputLab\" data-bv-field=\"soilwater\" value=\""+item.equipment.soilwater+"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div></div>" +
												timeLen+
												"<hr/>"+
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">灌溉周期：</label>" +	
													"<div class=\"col-sm-9\"><input type=\"hidden\" class=\"form-control week \" id=\"week\" data-bv-field=\"week\" name=\"week\" value=\""+week+"\">" +
													"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\" class='cursor' value=\"0\"/>&nbsp;All</label>" +
													"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\" class='cursor' value=\"1\"/>&nbsp;一</label>" +
													"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\" class='cursor' value=\"2\"/>&nbsp;二</label>" +
													"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\" class='cursor' value=\"3\"/>&nbsp;三</label>" +
													"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\" class='cursor' value=\"4\"/>&nbsp;四</label>" +
													"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\" class='cursor' value=\"5\"/>&nbsp;五</label>" +
													"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\" class='cursor' value=\"6\"/>&nbsp;六</label>" +
													"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\" class='cursor' value=\"7\"/>&nbsp;日</label></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段一：</label>" +
													"<div class=\"input-group date col-sm-9\">" +
														"<input type=\"text\" id='dateTime' class=\"form-control timeonestart cursor\" style=\"margin-left:15px;width: 100px; margin-right: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timeonestart\" value=\""+timeonestart+"\"/>" +
														"<span style=\"line-height: 30px; position: relative; float: left;\">-</span> "+
														"<input type=\"text\" id='dateTime' class=\"form-control timeoneend cursor\" style=\"width: 100px; margin-left: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timeoneend\" value=\""+timeoneend+"\"/>" +
													"</div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段二：</label>" +
													"<div class=\"input-group date col-sm-9\">" +
														"<input type=\"text\" id='dateTime' class=\"form-control timetwostart cursor\" style=\"margin-left:15px;width: 100px; margin-right: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timetwostart\" value=\""+timetwostart+"\"/>" +
														"<span style=\"line-height: 30px; position: relative; float: left;\">-</span> "+
														"<input type=\"text\" id='dateTime' class=\"form-control timetwoend cursor\" style=\"width: 100px; margin-left: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timetwoend\" value=\""+timetwoend+"\"/>" +
													"</div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段三：</label>" +
													"<div class=\"input-group date col-sm-9\">" +
														"<input type=\"text\" id='dateTime' class=\"form-control timethreestart cursor\" style=\"margin-left:15px;width: 100px; margin-right: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timethreestart\" value=\""+timethreestart+"\"/>" +
														"<span style=\"line-height: 30px; position: relative; float: left;\">-</span> "+
														"<input type=\"text\" id='dateTime' class=\"form-control timethreeend cursor\" style=\"width: 100px; margin-left: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timethreeend\" value=\""+timethreeend+"\"/>" +
													"</div></div>" +
												"</div>"+
											"</form></div></div></div>";
							});
							$EquipmentList.empty().append(str);
							rainet.setting.utils.tipShow();
							//控制模式切换
							rainet.setting.utils.radioChange();
							//select初始选中事件
							rainet.setting.utils.selectVal(data);
							//日历控件绑定事件
							rainet.setting.utils.dateTime();
							//添加土壤信息事件
							rainet.setting.utils.addSoil(_soilInfoTempate);
							//添加植物信息事件
							rainet.setting.utils.addPlants(_plantsInfoTempate,_growthCycleHeader,_growthCycle);
							rainet.setting.utils.setValidateForEquipmentInfo($EquipmentList);
							flag = true;
						});
					}else{
						rainet.utils.notification.warning("请先选择项目!");
						flag = true;
					}
				}
			});
			
		},
		//修改事件
		modifyEquipments : function(){
			//修改节点
			$(".modifyBtn").off('click').on('click', function(e){
				if(flag){
					flag = false;
					var mark=false;
					$("[id='equipmentCheckbox']").each(function(){
						if($(this).is(":checked")){
							mark = true;
							return false;//跳出循环
						}
					});
					if(mark){
						var list = [];
						$("[id='equipmentCheckbox']").each(function(){
							if($(this).is(":checked")){
								var $form = $(this).parent().parent().parent().find("form");
								var bv = $form.data('bootstrapValidator');
								var formData = $form.serializeArray();
								var jsonData = rainet.utils.serializeObject(formData);
								list.push(jsonData);
							}
						});
						list.handleError = function(result){
							flag = true;
							return true;
						};
						bootbox.dialog({
							message : "初始化设置需要最多5分钟才能完成，确认设置？",
							title : '初始化设置',
							// 支持ESC
							onEscape : function(){
								flag=true;
							},
							buttons :  {
								cancel: {
								      label: "取消",
								      className: "btn-warning",
								      callback : function(){
								    	  flag = true;
								      }
								},
								success: {
								      label: "确定",
								      className: "btn-success",
								      callback : function(){
								    	  var len = 0;
								    	  $("[id='equipmentCheckbox']").each(function(){
												if($(this).is(":checked")){
													var $form = $(this).parent().parent().parent().find("form");
													$($form).bootstrapValidator('validate');
													var bv = $form.data('bootstrapValidator');
													if (bv.$invalidFields.length > 0) {
														len += bv.$invalidFields.length;
													}
												}
											});
								    	  if(len>0){
								    		  bootbox.hideAll();
								    		  return false;
								    	  }
								    	  	rainet.setting.service.equipment.updateList(list, function(data){
												if(data==""){
													rainet.utils.notification.success("设置成功!");
												}else{
													bootbox.dialog({
														message : data,
														title : '设置失败',
														// 支持ESC
														onEscape : function(){
															flag=true;
														},
														buttons :  {
															cancel: {
															      label: "关闭",
															      className: "btn-warning",
															      callback : function(){
															    	  flag = true;
															      }
															}
													}
													});
												}
												flag = true;
											});
								      }
								}
						}
						});
					}else{
						rainet.utils.notification.warning("请先选择节点!");
						flag = true;
					}
				}
			});
		},
		//设置全局模式事件
		setModel : function(){
			var _modelTempate = $(this.modelTempate);
			//设置全局模式
			$(".setModel").off('click').on('click', function(e){
				if(flag){
					flag = false;
					var mark=false;
					$("[id='equipmentCheckbox']").each(function(){
						if($(this).is(":checked")){
							mark = true;
							return false;//跳出循环
						}
					});
					if(mark){
						var list = [];
						
						$("[id='equipmentCheckbox']").each(function(){
							if($(this).is(":checked")){
								var $form = $(this).parent().parent().parent().find("form");
								var formData = $form.serializeArray();
								var jsonData = rainet.utils.serializeObject(formData);
								list.push(jsonData);
							}
						});
						list.handleError = function(result){
							flag = true;
							return true;
						};
						bootbox.dialog({
							message : _modelTempate,
							title : '模式设置',
							// 支持ESC
							onEscape : function(){
								flag=true;
							},
							buttons :  {
								cancel: {
								      label: "取消",
								      className: "btn-warning",
								      callback : function(){
								    	  flag = true;
								      }
								},
								success: {
								      label: "确定",
								      className: "btn-success",
								      callback : function(){
											var model = $('input[name="allModel"]:checked').val();
											for(var i = 0 ;i<list.length;i++){
												list[i].irrigationtype=model;
											}
								    	  	rainet.setting.service.equipment.setListModel(list, function(data){
												if(data){
													rainet.utils.notification.success("设置成功!");
												}else{
													rainet.utils.notification.error("设置失败!");
												}
												flag = true;
											});
								      }
								}
						}
						});
					}else{
						rainet.utils.notification.warning("请先选择节点!");
						flag = true;
					}
				}
			});
		},
		//设置全局自控参数事件
		setAutoParam : function(){
			var _autoParamTempate = $(this.autoParamTempate);
			//设置全局自控参数
			$(".setAutoParam").off('click').on('click', function(e){
				if(flag){
					var $formgroup = $("form",_autoParamTempate).find("div[id=form-group]");
					$($formgroup).each(function(){
						$(this).removeClass("has-error");
					});
					
					rainet.setting.utils.setValidateForEquipmentInfo(_autoParamTempate);
					flag = false;
					var mark=false;
					$("[id='equipmentCheckbox']").each(function(){
						if($(this).is(":checked")){
							mark = true;
							return false;//跳出循环
						}
					});
					if(mark){
						var list = [];
						$("[id='equipmentCheckbox']").each(function(){
							if($(this).is(":checked")){
								var $form = $(this).parent().parent().parent().find("form");
								var formData = $form.serializeArray();
								var jsonData = rainet.utils.serializeObject(formData);
								list.push(jsonData);
							}
						});
						list.handleError = function(result){
							flag = true;
							return true;
						};
						
						//土壤初始化
						var soilSelectObj = $(".soilname",_autoParamTempate);
						var selectSoilStr = "";
						rainet.setting.service.soilInfo.list(function(item){
							$.each(item,function(i,data){
								selectSoilStr += "<option value=\""+data.id+"\">"+data.soiltype+"</option>";
							});
							soilSelectObj.append(selectSoilStr);
						});
						//植物初始化
						var plantsSelectObj = $(".plantsname",_autoParamTempate);
						var selectPlantsStr = "";
						rainet.setting.service.plants.list(function(item){
							$.each(item,function(i,data){
								selectPlantsStr += "<option value=\""+data.id+"\">"+data.plantsname+"</option>";
							});
							plantsSelectObj.append(selectPlantsStr);
						});
						bootbox.dialog({
							message : _autoParamTempate,
							title : '自控参数设置',
							// 支持ESC
							onEscape : function(){
								flag=true;
							},
							buttons :  {
								cancel: {
								      label: "取消",
								      className: "btn-warning",
								      callback : function(){
								    	  flag = true;
								      }
								},
								success: {
								      label: "确定",
								      className: "btn-success",
								      callback : function(){
											var $form = $("#autoParamForm");
											$($form).bootstrapValidator('validate');
											var bv = $form.data('bootstrapValidator');
											if (bv.$invalidFields.length > 0) {
												return false;
											}
								    	  var plantsname = $("#plantsname").val();
								    	  var soilname = $("#soilname").val();
								    	  var rootdepth = $("#rootdepth").val();
								    	  var soilweight = $("#soilweight").val();
								    	  var humidityup = $("#humidityup").val();
								    	  var humiditydown = $("#humiditydown").val();
								    	  var temperatureup = $("#temperatureup").val();
								    	  var temperaturedown = $("#temperaturedown").val();
								    	  var soilwater = $("#soilwater").val();
								    	  
								    	  for(var i = 0 ;i<list.length;i++){
												list[i].plantsname=plantsname;
												list[i].soilname=soilname;
												list[i].rootdepth=rootdepth;
												list[i].soilweight=soilweight;
												list[i].humidityup=humidityup;
												list[i].humiditydown=humiditydown;
												list[i].temperatureup=temperatureup;
												list[i].temperaturedown=temperaturedown;
												list[i].soilwater=soilwater;
											}
								    	  	rainet.setting.service.equipment.setAutoParam(list, function(data){
												if(data){
													rainet.utils.notification.success("设置成功!");
												}else{
													rainet.utils.notification.error("设置失败!");
												}
												flag = true;
											});
								      }
								}
						}
						});
					}else{
						rainet.utils.notification.warning("请先选择节点!");
						flag = true;
					}
				}
			});
		},
		//设置全局自控参数事件
		setTimeLen : function(){
			var _timeLenTempate = $(this.timeLenTempate);
			//设置全局自控参数
			$(".setTimeLen").off('click').on('click', function(e){
				if(flag){
					//日历控件绑定事件
					rainet.setting.utils.timeLen(_timeLenTempate);
					
					var $formgroup = $("form",_timeLenTempate).find("div[id=form-group]");
					$($formgroup).each(function(){
						$(this).removeClass("has-error");
					});
					
					rainet.setting.utils.setValidateForTimeLen(_timeLenTempate);
					flag = false;
					var mark=false;
					$("[id='equipmentCheckbox']").each(function(){
						if($(this).is(":checked")){
							mark = true;
							return false;//跳出循环
						}
					});
					if(mark){
						var list = [];
						var param;
						$("[id='equipmentCheckbox']").each(function(){
							if($(this).is(":checked")){
								var $form = $(this).parent().parent().parent().find("form");
								var formData = $form.serializeArray();
								var jsonData = rainet.utils.serializeObject(formData);
								list.push(jsonData);
							}
						});
						console.log(list);
						list.handleError = function(result){
							flag = true;
							return true;
						};
						bootbox.dialog({
							message : _timeLenTempate,
							title : '时段控制设置',
							// 支持ESC
							onEscape : function(){
								flag=true;
							},
							buttons :  {
								cancel: {
									label: "取消",
									className: "btn-warning",
									callback : function(){
										flag = true;
									}
								},
								success: {
									label: "确定",
									className: "btn-success",
									callback : function(){
											var $form = $("#timeLenForm");
											$($form).bootstrapValidator('validate');
											var bv = $form.data('bootstrapValidator');
											console.log(bv.$invalidFields.length);
											if (bv.$invalidFields.length > 0) {
												return false;
											}
											var week = $("#week").val();
									    	var timeonestart = $(".timeonestart").val();
									    	var timeoneend = $(".timeoneend").val();
									    	var timetwostart = $(".timetwostart").val();
									    	var timetwoend = $(".timetwoend").val();
									    	var timethreestart = $(".timethreestart").val();
									    	var timethreeend = $(".timethreeend").val();
									    	  
									    	for(var i = 0 ;i<list.length;i++){
									    		list[i].week=week;
									    		list[i].timeonestart=timeonestart;
									    		list[i].timeoneend=timeoneend;
									    		list[i].timetwostart=timetwostart;
									    		list[i].timetwoend=timetwoend;
									    		list[i].timethreestart=timethreestart;
									    		list[i].timethreeend=timethreeend;
									    	}
								    	  	rainet.setting.service.equipment.setTimeLen(list, function(data){
												if(data){
													rainet.utils.notification.success("设置成功!");
												}else{
													rainet.utils.notification.error("设置失败!");
												}
												flag = true;
											});
									}
								}
							}
						});
					}else{
						rainet.utils.notification.warning("请先选择节点!");
						flag = true;
					}
				}
			});
		},
		
		setEquipmentInfo : function($hostHtml){
			var $form = $("form", $hostHtml);
			
			// 初始化项目列表
			var $projectList = $('.projectName',$hostHtml);
			rainet.setting.service.project.getProjectNames(function(data){
				var length = data.length;
				$projectList.empty();
				$projectList.append('<option value=\"-1\">-请选择项目-</option>');
				for (var i = 0; i < length; i++) {
					$projectList.append('<option value='+data[i].id+'>'+data[i].name+'</option>');
				}
			});
			// 绑定搜索事件
			this.findEquipments($projectList);
			this.modifyEquipments();
			this.setModel();
			this.setAutoParam();
			this.setTimeLen();
			this.checked();
		},
		
		// 搜索节点信息
		add : function(){
			var $projectHtml = $(this.infoTempate);
			$(".equipment-container").empty().append($projectHtml);
			this.setEquipmentInfo($projectHtml);
			
		},
		
		infoTempate : "<div class=\"col-xs-9 col-md-9\">" +
						"<div class=\"node-container\">" +
						"<div class=\"node-tools\" style=\"font-size:14px;\">" +
						"<label class=\"col-xs-3 col-md-3 text-center\" style=\"line-height: 34px;\">" +
						"<input type=\"checkbox\" class=\"cursor checkAll\"/> 全选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
						"所属项目:" +
						"</label>" +
						"<select class=\"col-xs-3 col-md-3 input-sm projectName\" id=\"projectName\" name=\"projectid\"></select>" +
						"<div class=\"col-xs-3 col-md-3 text-center\">" +
						"<button type=\"button\" class=\"btn btn-success findBtn \">查询</button>" +
						"</div>" +
						"<div class=\"col-xs-3 col-md-3\">" +
						"<button type=\"button\" class=\"btn btn-warning modifyBtn\">初始化设置</button>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>"+
						"<div class=\"col-xs-9 col-md-9\">" +
						"<div class=\"node-container\">" +
						"<div class=\"node-tools\" style=\"font-size:14px;height:55px;\">" +
						"<div class=\"col-xs-4 col-md-4 text-center\">" +
						"<a href=\"javascript:void(0);\" class=\"setModel\">模式设置</a>" +
						"</div>" +
						"<div class=\"col-xs-4 col-md-3 text-left\">" +
						"<a href=\"javascript:void(0);\" class=\"setAutoParam\">自控参数设置</a>" +
						"</div>" +
						"<div class=\"col-xs-4 col-md-5 text-left\">" +
						"<a href=\"javascript:void(0);\" class=\"setTimeLen\">时段设置</a>" +
						"</div>" +
						"</div>" +
						"<div class=\"EquipmentList\">" +
						
						"</div>" +
						"</div>" +
						"</div>",
						
		soilInfoTempate : "<div>\n"+
						"<form class=\"form-horizontal\" role=\"form\">\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">土壤名称：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control soiltype\" name=\"soiltype\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">土壤干容重：</label>\n"+
						"<div class=\"col-sm-3\" style='padding-left:0px;' >\n"+
						"<input type=\"text\" style='width:50%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control soilweight\" name=\"soilweight\"/><span style='line-height:34px;'>&nbsp;&nbsp;g/cm<sup>3</sup></span>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">田间持水量：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<input type=\"text\" style='width:89%;' class=\"form-control soilwater\" name=\"soilwater\"/><span style='line-height:34px;'>&nbsp;&nbsp;%</span>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">土壤所在地：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<div class=\"col-sm-5 selectItem\" style=\"padding-left:0;\">\n"+
						"<select style='width:100%;' class=\"form-control provinceItem\" name=\"province\"></select>\n"+
						"</div>\n"+
						"<div class=\"col-sm-5 selectItem\">\n"+
						"<select style='width:100%;' class=\"form-control cityItem\" name=\"city\"></select>\n"+
						"</div>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">详细地址：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control address\" name=\"address\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值1：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control waterVal1\" name=\"waterVal1\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值1：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control originalVal1\" name=\"originalVal1\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值2：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control waterVal2\" name=\"waterVal2\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值2：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control originalVal2\" name=\"originalVal2\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值3：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control waterVal3\" name=\"waterVal3\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值3：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control originalVal3\" name=\"originalVal3\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值4：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control waterVal4\" name=\"waterVal4\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值4：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control originalVal4\" name=\"originalVal4\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"modal-footer\">\n"+
						"<button data-bb-handler=\"cancel\" type=\"button\" class=\"btn btn-warning\">取消</button>\n"+
						"<button data-bb-handler=\"success\" type=\"submit\" class=\"btn btn-success\">提交</button>\n"+
						"</div>\n"+
						"</form>\n"+
						"</div>",
						
	plantsInfoTempate : "<div>\n"+
						"<form class=\"form-horizontal\" role=\"form\" id=\"plantsForm\">\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">植物名称：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control plantsname\" name=\"plantsname\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">根系深度：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:50%;float:left;padding-left:5px;padding-right:5px;' class=\"form-control rootdepth\" name=\"rootdepth\"/><span style='line-height:34px;'>&nbsp;&nbsp;cm</span>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"growthCycles\">"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-12 text-center\"><a href=\"javascript:void(0);\" class=\"addNewCycle cursor\">添加新周期</a></label>\n"+
						"</div>\n"+
						"<div class=\"modal-footer\">\n"+
						"<button data-bb-handler=\"cancel\" type=\"button\" class=\"btn btn-warning\">取消</button>\n"+
						"<button data-bb-handler=\"success\" type=\"submit\" class=\"btn btn-success\">提交</button>\n"+
						"</div>\n"+
						"</form>\n"+
						"</div>",
		growthCycleHeader : "<div>"+
						"<div class=\"growthCycle\">"+
						"<hr/>"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">植物生长周期名：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control plantsseason\" name=\"plantsseason\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">开始日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control startdate cursor\" id='cycledate' name=\"startdate\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">结束日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;float:left;padding-left:1px;padding-right:1px;'  class=\"form-control enddate cursor\" id='cycledate' name=\"enddate\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">湿度上限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:60%;float:left;padding-right:5px;' class=\"form-control humidityup\" name=\"humidityup\"/><span style='line-height:34px;'>&nbsp;&nbsp;%</span>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">湿度下限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:60%;float:left;padding-right:5px;' class=\"form-control humiditydown\" name=\"humiditydown\"/><span style='line-height:34px;'>&nbsp;&nbsp;%</span>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">温度上限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:60%;float:left;padding-right:5px;' class=\"form-control temperatureup\" name=\"temperatureup\"/><span style='line-height:34px;'>&nbsp;&nbsp;℃</span>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">温度下限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:60%;float:left;padding-right:5px;' class=\"form-control temperaturedown\" name=\"temperaturedown\"/><span style='line-height:34px;'>&nbsp;&nbsp;℃</span>\n"+
						"</div>\n"+
						"</div>\n"+
						"</div>\n"+
						"</div>\n",
		growthCycle : "<div>"+
						"<div class=\"growthCycle\">"+
						"<hr style='width:95%;float:left;'/><button type=\"button\" class=\"closeCycle\" style='color:red;line-height:39px;width:5%;' aria-hidden=\"true\">-</button>"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">植物生长周期名：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<input type=\"text\" style='width:100%;' class=\"form-control plantsseason\" name=\"plantsseason\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">开始日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control startdate cursor\" id='cycledate' name=\"startdate\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">结束日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:100%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control enddate cursor\" id='cycledate' name=\"enddate\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">湿度上限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:60%;float:left;padding-right:5px;' class=\"form-control humidityup\" name=\"humidityup\"/><span style='line-height:34px;'>&nbsp;&nbsp;%</span>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">湿度下限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:60%;float:left;padding-right:5px;' class=\"form-control humiditydown\" name=\"humiditydown\"/><span style='line-height:34px;'>&nbsp;&nbsp;%</span>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">温度上限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:60%;float:left;padding-right:5px;' class=\"form-control temperatureup\" name=\"temperatureup\"/><span style='line-height:34px;'>&nbsp;&nbsp;℃</span>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">温度下限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" style='width:60%;float:left;padding-right:5px;' class=\"form-control temperaturedown\" name=\"temperaturedown\"/><span style='line-height:34px;'>&nbsp;&nbsp;℃</span>\n"+
						"</div>\n"+
						"</div>\n"+
						"</div>\n"+
						"</div>\n",
	modelTempate : "<div>\n"+
						"<form class=\"form-horizontal\" role=\"form\" id=\"plantsForm\">\n"+
						"<div class=\"form-group\" style='padding:20px;'>\n"+
						"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"allModel\" class=\"modelClass\" checked value=\"0\" >&nbsp;&nbsp;&nbsp;&nbsp;手动</input></div>" +
						"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"allModel\" class=\"modelClass\" value=\"1\">&nbsp;&nbsp;&nbsp;&nbsp;自动</div>" +
						"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"allModel\" class=\"modelClass\" value=\"2\">&nbsp;&nbsp;&nbsp;&nbsp;时段</div></div>\n"+
						"</div>\n"+
						"</form>\n"+
						"</div>",
	autoParamTempate : "<div>\n"+
						"<form class=\"form-horizontal\" role=\"form\" id=\"autoParamForm\">\n"+
						"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\">土壤：</label>" +
						"<div class=\"col-sm-8\"><select class=\"form-control soilname\" name=\"soilname\" id=\"soilname\"><option value=\"-1\">-选择土壤-</option>"+1+"</select></div>" +
						"</div>" +
					"<div class=\"form-group has-feedback\" style='margin-bottom:10px;padding-bottom:10px;border-bottom:#ddd 1px solid;' id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\">植物：</label>" +
						"<div class=\"col-sm-8\"><select class=\"form-control plantsname\" name=\"plantsname\" id=\"plantsname\"><option value=\"-1\">-选择植物-</option>"+2+"</select></div>" +
						"</div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\">根系深度：</label>" +
						"<div class=\"col-sm-3\"><input type=\"text\" style='width:60%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control rootdepth\" name=\"rootdepth\" id=\"rootdepth\" data-bv-field=\"rootdepth\" value=\"\"><span style='line-height:34px;'>&nbsp;&nbsp;cm</span></div>" +
						"<label class=\"col-sm-3 control-label\">土壤干重：</label>" +
						"<div class=\"col-sm-3\"><input type=\"text\" style='width:35%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control soilweight\" name=\"soilweight\" id=\"soilweight\" data-bv-field=\"soilweight\" value=\"\"><span style='line-height:34px;font-size:10px;'>&nbsp;&nbsp;g/cm<sup>3</sup></span></div></div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\">湿度上限：</label>" +
						"<div class=\"col-sm-3\"><input type=\"text\" style='width:60%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control humidityup\" name=\"humidityup\" id=\"humidityup\" data-bv-field=\"humidityup\" value=\"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div>" +
						"<label class=\"col-sm-3 control-label\">湿度下限：</label>" +
						"<div class=\"col-sm-3\"><input type=\"text\" style='width:60%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control humiditydown\" name=\"humiditydown\" id=\"humiditydown\" data-bv-field=\"humiditydown\" value=\"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div></div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\">温度上限：</label>" +
						"<div class=\"col-sm-3\"><input type=\"text\" style='width:60%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control temperatureup\" name=\"temperatureup\" id=\"temperatureup\" data-bv-field=\"temperatureup\" value=\"\"><span style='line-height:34px;'>&nbsp;&nbsp;℃</span></div>" +
						"<label class=\"col-sm-3 control-label\">温度下限：</label>" +
						"<div class=\"col-sm-3\"><input type=\"text\" style='width:60%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control temperaturedown\" name=\"temperaturedown\" id=\"temperaturedown\" data-bv-field=\"temperaturedown\" value=\"\"><span style='line-height:34px;'>&nbsp;&nbsp;℃</span></div></div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\">饱和水量：</label>" +
						"<div class=\"col-sm-3\"><input type=\"text\" style='width:60%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control soilwater\" name=\"soilwater\" id=\"soilwater\" data-bv-field=\"soilwater\" value=\"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div></div>\n" +
						"</form>\n"+
						"</div>",
	timeLenTempate : "<div>\n"+
						"<form class=\"form-horizontal\" role=\"form\" id=\"timeLenForm\">\n"+
						"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\">灌溉周期：</label>" +	
						"<div class=\"col-sm-9\"><input type=\"hidden\" class=\"form-control week \" id=\"week\" data-bv-field=\"week\" name=\"week\">" +
						"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\"/>&nbsp;全选</label>" +
						"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\"/>&nbsp;周一</label>" +
						"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\"/>&nbsp;周二</label>" +
						"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\"/>&nbsp;周三</label>" +
						"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\"/>&nbsp;周四</label>" +
						"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\"/>&nbsp;周五</label>" +
						"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\"/>&nbsp;周六</label>" +
						"<label class=\"col-sm-1 control-label\"><input type=\"checkbox\"/>&nbsp;周日</label></div></div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段一：</label>" +
						"<div class=\"input-group date col-sm-9\">" +
							"<input type=\"text\" id='dateTime' class=\"form-control timeonestart cursor\" style=\"margin-left:15px;width: 100px; margin-right: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timeonestart\"/>" +
							"<span style=\"line-height: 30px; position: relative; float: left;\">-</span> "+
							"<input type=\"text\" id='dateTime' class=\"form-control timeoneend cursor\" style=\"width: 100px; margin-left: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timeoneend\"/>" +
						"</div></div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段二：</label>" +
						"<div class=\"input-group date col-sm-9\">" +
							"<input type=\"text\" id='dateTime' class=\"form-control timetwostart cursor\" style=\"margin-left:15px;width: 100px; margin-right: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timetwostart\"/>" +
							"<span style=\"line-height: 30px; position: relative; float: left;\">-</span> "+
							"<input type=\"text\" id='dateTime' class=\"form-control timetwoend cursor\" style=\"width: 100px; margin-left: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timetwoend\"/>" +
						"</div></div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
						"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段三：</label>" +
						"<div class=\"input-group date col-sm-9\">" +
							"<input type=\"text\" id='dateTime' class=\"form-control timethreestart cursor\" style=\"margin-left:15px;width: 100px; margin-right: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timethreestart\"/>" +
							"<span style=\"line-height: 30px; position: relative; float: left;\">-</span> "+
							"<input type=\"text\" id='dateTime' class=\"form-control timethreeend cursor\" style=\"width: 100px; margin-left: 5px; padding-right: 5px;padding-left: 5px;\" name=\"timethreeend\"/>" +
						"</div></div>" +
					"</div>"+
						"</form>\n"+
						"</div>",
};
