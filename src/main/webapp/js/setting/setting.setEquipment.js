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
			var _growthCycle=$(this.growthCycle)
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
								var sensorStr = "";
								//传感器校准a,b,c,d参数
								$.each(item.result,function(i,data){
									sensorStr =sensorStr + "<input type=\"hidden\" class=\"parama"+(i+1)+"\" value=\""+data.parametera+"\"/>"+
													"<input type=\"hidden\" class=\"paramb"+(i+1)+"\" value=\""+data.parameterb+"\"/>"+
													"<input type=\"hidden\" class=\"paramc"+(i+1)+"\" value=\""+data.parameterc+"\"/>"+
													"<input type=\"hidden\" class=\"paramd"+(i+1)+"\" value=\""+data.parameterd+"\"/>";
								});
								
								var radio = "";
								switch(item.equipment.irrigationtype){
								case 0:
									radio = "<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" checked id=\"inputLab\" value=\"0\" >&nbsp;&nbsp;&nbsp;&nbsp;手动</input></div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" id=\"inputLab\" value=\"1\">&nbsp;&nbsp;&nbsp;&nbsp;自动</div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" id=\"inputLab\" value=\"2\">&nbsp;&nbsp;&nbsp;&nbsp;时段</div></div>" ;
									break;
								case 1:
									radio = "<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" id=\"inputLab\" value=\"0\" >&nbsp;&nbsp;&nbsp;&nbsp;手动</input></div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" checked id=\"inputLab\" value=\"1\">&nbsp;&nbsp;&nbsp;&nbsp;自动</div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" id=\"inputLab\" value=\"2\">&nbsp;&nbsp;&nbsp;&nbsp;时段</div></div>" ;
									break;
								case 2:
									radio = "<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" id=\"inputLab\" value=\"0\" >&nbsp;&nbsp;&nbsp;&nbsp;手动</input></div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" id=\"inputLab\" value=\"1\">&nbsp;&nbsp;&nbsp;&nbsp;自动</div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" checked id=\"inputLab\" value=\"2\">&nbsp;&nbsp;&nbsp;&nbsp;时段</div></div>" ;
									break;
								}
								
								str =str + "<div class=\"col-xs-12 col-md-6\">" +
											"<div class=\"panel panel-default \">" +
											"<div class=\"panel-heading\">" +
											"<label>"+item.equipment.name+"</label> <span class=\"float-right\"> <input type=\"checkbox\" class=\"cursor\" name=\""+item.equipment.id+"\" id=\"equipmentCheckbox\"></span></div>" +
											"<div class=\"panel-body\">" +
											"<form class=\"form-horizontal\" role=\"form\">" +
												"<div class=\"form-group has-feedback\" style='margin-bottom:10px;padding-bottom:10px;border-bottom:#ddd 1px solid;' id=\"form-group\">" +
													sensorStr+radio+
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">土壤：</label>" +
													"<div class=\"col-sm-6\"><select class=\"form-control soil\" value=\""+item.equipment.soilname+"\" id=\"inputLab\"><option>-选择土壤-</option>"+selectSoilStr+"</select></div>" +
													"<div class=\"col-sm-3\" style='line-height:34px;'><a class=\"cursor soilLink\" id=\"inputLab\">自定义</a></div></div>" +
												"<div class=\"form-group has-feedback\" style='margin-bottom:10px;padding-bottom:10px;border-bottom:#ddd 1px solid;' id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">植物：</label>" +
													"<div class=\"col-sm-6\"><select class=\"form-control plants\" value=\""+item.equipment.plantsname+"\" id=\"inputLab\"><option>-选择植物-</option>"+selectPlantsStr+"</select></div>" +
													"<div class=\"col-sm-3\" style='line-height:34px;'><a class=\"cursor plantsLink\" id=\"inputLab\">自定义</a></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">根系深度：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control rootdepth\" style='width:65%;float:left;' id=\"inputLab\" data-bv-field=\"rootdepth\" value=\""+item.equipment.rootdepth+"\"><span style='line-height:34px;'>&nbsp;&nbsp;cm</span></div>" +
													"<label class=\"col-sm-3 control-label\">土壤干重：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control soilweight\" style='width:35%;float:left;' id=\"inputLab\" data-bv-field=\"soilweight\" value=\""+item.equipment.soilweight+"\"><span style='line-height:34px;font-size:6px;'>&nbsp;&nbsp;g/cm<sup>3</sup></span></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">湿度上限：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control humidityup\" style='width:65%;float:left;' id=\"inputLab\" data-bv-field=\"humidityup\" value=\""+item.equipment.humidityup+"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div>" +
													"<label class=\"col-sm-3 control-label\">湿度下限：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control humiditydown\" style='width:65%;float:left;' id=\"inputLab\" data-bv-field=\"humiditydown\" value=\""+item.equipment.humiditydown+"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">温度上限：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control temperatureup\" style='width:65%;float:left;' id=\"inputLab\" data-bv-field=\"temperatureup\" value=\""+item.equipment.temperatureup+"\"><span style='line-height:34px;'>&nbsp;&nbsp;℃</span></div>" +
													"<label class=\"col-sm-3 control-label\">温度下限：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control temperaturedown\" style='width:65%;float:left;' id=\"inputLab\" data-bv-field=\"temperaturedown\" value=\""+item.equipment.temperaturedown+"\"><span style='line-height:34px;'>&nbsp;&nbsp;℃</span></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">饱和水量：</label>" +
													"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control soilwater\" style='width:65%;float:left;' id=\"inputLab\" data-bv-field=\"soilwater\" value=\""+item.equipment.soilwater+"\"><span style='line-height:34px;'>&nbsp;&nbsp;%</span></div></div>" +
												"<div class=\"timeLens\" style=\"display:none;\">"+
												"<hr/>"+
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\">灌溉周期：</label>" +	
													"<div class=\"col-sm-9\"><input type=\"text\" class=\"form-control week cursor \" id=\"inputLab\" data-bv-field=\"week\" value=\""+item.equipment.week+"\"></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段一：</label>" +
													"<div class=\"col-sm-9 input-append\" id='timeone'><input type=\"text\" style='width:80%;float:left;' class=\"form-control cursor\" id=\"inputLab\" data-bv-field=\"department\" value=\""+item.equipment.timeonestart+"-"+item.equipment.timeoneend+"\"/>" +
															"<span class=\"add-on\"style='width:20%;'><i data-time-icon=\"icon-time\">ddddd" +
															"</i>" +
															"</span></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段二：</label>" +
													"<div class=\"col-sm-9\"><input type=\"text\" class=\"form-control timetwo cursor\" id=\"inputLab\" data-bv-field=\"department\" value=\""+item.equipment.timeonestart+"-"+item.equipment.timeoneend+"\"></div></div>" +
												"<div class=\"form-group has-feedback\" id=\"form-group\">" +
													"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段三：</label>" +
													"<div class=\"col-sm-9\"><input type=\"text\" class=\"form-control timethree cursor\" id=\"inputLab\" data-bv-field=\"address\" value=\""+item.equipment.timeonestart+"-"+item.equipment.timeoneend+"\"></div></div>" +
												"</div>"+
											"</form></div></div></div>";
							});
							$EquipmentList.empty().append(str);
							tipShow();
							radioChange();
							this.addSoil(_soilInfoTempate);
							this.addPlants(_plantsInfoTempate,_growthCycleHeader,_growthCycle);
							flag = true;
						});
						//切换时段
					}else{
						rainet.utils.notification.warning("请先选择项目!");
						flag = true;
					}
				}
			});
			
		},
		//修改事件
		modifyEquipments : function($projectList){
			//修改节点
			$(".modifyBtn").off('click').on('click', function(e){
				if(flag){
					flag = false;
					var $forms = $(".form-horizontal");
					var paramArr=[];
					var mark = true;
					var RegEx = /^[0-9]+(\.[0-9]{1,2})?$/;
					var RegEx2 = /^[1-9]\d*$/;
					$($forms).each(function(){
						var $form = $(this)[0];
						var $name = $form.name;
						var $code = $form.code;
						var $area = $form.area;
						var $fowParameter = $form.fowParameter;
						var $controlHostId = $form.controlHostId;
						var $address = $form.address;
						var str = [];
						if($address != undefined){
							$($address).each(function(){
								str.push({number:$(this).val()});
							});
						}
						if($($name).val()==""){
							$($name).parent().addClass("has-error");
							$($name).parent().parent().find("label").eq(0).attr("id","has-error");
							mark = false;
						}else{
							$($name).parent().removeClass("has-error");
							$($name).parent().parent().find("label").eq(0).removeAttr("id");
						}
						if($($area).val()=="" || !RegEx.test($($area).val())){
							$($area).parent().addClass("has-error");
							$($area).parent().parent().find("label").eq(0).attr("id","has-error");
							mark = false;
						}else{
							$($area).parent().removeClass("has-error");
							$($area).parent().parent().find("label").eq(0).removeAttr("id");
						}
						if($($fowParameter).val()=="" || !RegEx.test($($fowParameter).val())){
							$($fowParameter).parent().addClass("has-error");
							$($fowParameter).parent().parent().find("label").eq(1).attr("id","has-error");
							mark = false;
						}else{
							$($fowParameter).parent().removeClass("has-error");
							$($fowParameter).parent().parent().find("label").eq(1).removeAttr("id");
						}
						
						var param =  {name:$($name).val(),code:$($code).val(),area : $($area).val(),fowParameter : $($fowParameter).val(),controlHostId : $($controlHostId).val()
								,result:str};
						paramArr.push(param);
					});
					if(!mark){
						rainet.utils.notification.warning("请填写正确的节点信息!");
					}else{
						bootbox.dialog({
							message : "<label style=\"color:red;\">特别注意：</label><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该操作将删除该主机下所有的数据，包括节点传感器信息、采集的历史数据等，确定注册?",
							title : '注册节点到现场',
							// 支持ESC
							onEscape : function(){
								
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
										bootbox.dialog({
											message : "<label style=\"color:red;\">注意：</label><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该操作特别，将会删除该主机下所有的数据，请再次确认?",
											title : '再次确认',
											// 支持ESC
											onEscape : function(){
												
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
														paramArr.handleError = function(result){
															flag = true;
															return true;
														};
														rainet.setting.service.equipment.add(paramArr, function(data){
															if(data){
																rainet.utils.notification.success("添加节点成功!");
															}
															flag = true;
														});
													}
												}
											}
										});
									}
								}
							}
						});
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
			this.modifyEquipments($projectList);
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
						"<button type=\"button\" class=\"btn btn-warning modifyBtn\">设置</button>" +
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
						"<input type=\"text\" class=\"form-control soiltype\" name=\"soiltype\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">土壤干容重：</label>\n"+
						"<div class=\"col-sm-3\" style='padding-left:0px;' >\n"+
						"<input type=\"text\" style='width:50%;float:left;padding-left:1px;padding-right:1px;' class=\"form-control soilweight\" name=\"soilweight\"/><span style='line-height:34px;'>&nbsp;&nbsp;g/cm<sup>3</sup></span>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">田间持水量：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<input type=\"text\" style='width:89%;float:left;' class=\"form-control soilwater\" name=\"soilwater\"/><span style='line-height:34px;'>&nbsp;&nbsp;%</span>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">土壤所在地：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<div class=\"col-sm-5 selectItem\" style=\"padding-left:0;\">\n"+
						"<select class=\"form-control provinceItem\" name=\"province\"></select>\n"+
						"</div>\n"+
						"<div class=\"col-sm-5 selectItem\">\n"+
						"<select class=\"form-control cityItem\" name=\"city\"></select>\n"+
						"</div>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">详细地址：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<input type=\"text\" class=\"form-control address\" name=\"address\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值1：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control waterVal1\" name=\"waterVal1\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值1：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control originalVal1\" name=\"originalVal1\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值2：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control waterVal2\" name=\"waterVal2\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值2：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control originalVal2\" name=\"originalVal2\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值3：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control waterVal3\" name=\"waterVal3\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值3：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control originalVal3\" name=\"originalVal3\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值4：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control waterVal4\" name=\"waterVal4\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值4：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control originalVal4\" name=\"originalVal4\"/>\n"+
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
						"<input type=\"text\" class=\"form-control plantsname\" name=\"plantsname\"/>\n"+
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
						"<input type=\"text\" class=\"form-control plantsseason\" name=\"plantsseason\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">开始日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control startdate\" name=\"startdate\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">结束日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control enddate\" name=\"enddate\"/>\n"+
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
						"<input type=\"text\" class=\"form-control plantsseason\" name=\"plantsseason\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">开始日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control startdate\" name=\"startdate\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">结束日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control enddate\" name=\"enddate\"/>\n"+
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
	
};

//通讯状态弹框提示
var tipShow = function(){
	var content = "";
	$(".dropdown").mouseenter(function() {
		var tmp = $(this).attr("id");
		content = '<div style="width:180px;text-align:center;font-weight:700;"><font color="#000">'+tmp+'</font></div>';
		$(this).popover({
			title:'',
			trigger:'hover',
			placement:'top',
			html: 'true',
			content : content ,
			animation: false
		});
		var _this = this;
		$(this).popover("show");
		$(this).siblings(".popover").on("mouseleave", function () {
			$(_this).popover('hide');
		});
	});
}

//时段切换
var radioChange = function(){
	$(".modelClass").change(function() {
		if($(this).val()==2){
			$(this).parent().parent().parent().find("div.timeLens").css("display","inline");
			dateTimePicker();
		}else{
			$(this).parent().parent().parent().find("div.timeLens").css("display","none");
		}
	});
}
//自定义植物信息
var addPlants = function($plantsInfo,$growthCycleHeader,$growthCycle){
	$(".plantsLink").off('click').on('click', function(e){
		var gcs = $(".growthCycles",$plantsInfo);
			gcs.empty().append($growthCycleHeader.html());
		
		$(".addNewCycle",$plantsInfo).off('click').on('click', function(e){
			gcs.append($growthCycle.html());
			$(".closeCycle",$plantsInfo).off('click').on('click', function(e){
				$(this).parent().remove();
			});
			var $form = $("form",$plantsInfo);
			setValidateForPlants($form);
		});
		
		var $form = $("form",$plantsInfo);
		setValidateForPlants($form);
		
		$('button[type=submit]', $form).off('click').on('click', function(){
			// 检查验证是否通过
			$($form).bootstrapValidator('validate');
			var bv = $form.data('bootstrapValidator');
			if (bv.$invalidFields.length > 0) {
				return false;
			}
			var formData = $form.serializeArray();
			var jsonData = rainet.utils.serializeObject(formData);
			console.log(JSON.stringify(jsonData));
			// 添加植物
//			rainet.setting.service.plants.add(jsonData, function(data){
//				if (data) {
//					bootbox.hideAll();
//					rainet.utils.notification.success('添加成功!');
//				}
//			});
		});
		bootbox.dialog({
			message : $plantsInfo,
			title : '自定义植物',
			// 支持ESC
			onEscape : function(){
				
			}
		});
	});
}
//自定义土壤信息
var addSoil = function($soilInfo){
	$(".soilLink").off('click').on('click', function(e){
		$.initProv($('.provinceItem',$soilInfo), $('.cityItem',$soilInfo), "-省份-", "-城市-");
		$.initCities($(".provinceItem", $soilInfo),$(".cityItem", $soilInfo));
		var $form = $("form", $soilInfo);
		setValidateForSoil($form);
		$('button[type=submit]', $form).off('click').on('click', function(){
			// 检查验证是否通过
			$($form).bootstrapValidator('validate');
			var bv = $form.data('bootstrapValidator');
			if (bv.$invalidFields.length > 0) {
				return false;
			}
			var formData = $form.serializeArray();
			var jsonData = rainet.utils.serializeObject(formData);
			// 添加土壤
			rainet.setting.service.soilInfo.add(jsonData, function(data){
				if (data) {
					bootbox.hideAll();
					rainet.utils.notification.success('添加成功!');
				}
			});
		});
		bootbox.dialog({
			message : $soilInfo,
			title : '自定义土壤',
			// 支持ESC
			onEscape : function(){
				
			}
		});
	});
}
// 添加校验信息 当保存或修改soil的时候
var setValidateForSoil = function($form){
	$form.bootstrapValidator({
		feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		fields : {
			soiltype : {
				validators : {
					notEmpty : {
						message: '土壤名称不能为空'
					}
				}
			},
			soilweight : {
				validators : {
					notEmpty : {
						message: '土壤干容重不能为空'
					},
					regexp: {
                        regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
                        message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			soilwater : {
				validators : {
					notEmpty : {
						message: '田间持水量不能为空'
					},
					regexp: {
                        regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
                        message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			province : {
				validators : {
					regexp: {
                        regexp: /^[^1]+$/i,
                        message: '省份不能为空'
                    }
				}
			},
			city : {
				validators : {
					regexp: {
                        regexp: /^[^1]+$/i,
                        message: '城市不能为空'
                    }
				}
			},
			address : {
				validators : {
					notEmpty : {
						message: '详细地址不能为空'
					}
				}
			},
			waterVal1 : {
				validators : {
					notEmpty : {
						message: '实测湿度值1不能为空'
					},
					regexp: {
                        regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
                        message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			originalVal1 : {
				validators : {
					notEmpty : {
						message: '传感器原始值1不能为空'
					},
					regexp: {
						 regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
	                     message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			waterVal2 : {
				validators : {
					notEmpty : {
						message: '实测湿度值2不能为空'
					},
					regexp: {
                        regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
                        message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			originalVal2 : {
				validators : {
					notEmpty : {
						message: '传感器原始值2不能为空'
					},
					regexp: {
						 regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
	                     message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			waterVal3 : {
				validators : {
					notEmpty : {
						message: '实测湿度值3不能为空'
					},
					regexp: {
                        regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
                        message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			originalVal3 : {
				validators : {
					notEmpty : {
						message: '传感器原始值3不能为空'
					},
					regexp: {
						 regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
	                     message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			waterVal4 : {
				validators : {
					notEmpty : {
						message: '实测湿度值4不能为空'
					},
					regexp: {
                        regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
                        message: '只能为整数或者保留两位的小数'
                    }
				}
			},
			originalVal4 : {
				validators : {
					notEmpty : {
						message: '传感器原始值4不能为空'
					},
					regexp: {
						 regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
	                     message: '只能为整数或者保留两位的小数'
                    }
				}
			}
		}
	})
	
	// 修复-->当选择省份时，已经校验过的城市不会重新验证的问题
	.on('change', '.provinceItem', function(){
		$form.bootstrapValidator('revalidateField', 'city');
		
	// 验证土壤名称是否存在
	}).on('blur.rainet', '.soiltype', function(){
		var bv = $form.data('bootstrapValidator');
		$field = bv.getFieldElements('soiltype');
		var value = $field.val();
		if ($.trim(value) === '') {
			bv.updateMessage($field, 'notEmpty');
			return ;
		}
		var param = {soiltype : value};
		rainet.setting.service.soilInfo.validName(param, function(data){
			if (data) {
				// 存在，更新错误信息的提示
				bv.updateMessage($field, 'notEmpty', '土壤名称已存在');
				bv.updateStatus($field, 'INVALID');
			}
		});
	});
	
	$form.data('bootstrapValidator').disableSubmitButtons(true);
}
// 添加校验信息 当保存或修改plants的时候
var setValidateForPlants = function($form){
	$form.bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields : {
			plantsname : {
				validators : {
					notEmpty : {
						message: '植物名称不能为空'
					}
				}
			},
			rootdepth : {
				validators : {
					notEmpty : {
						message: '植物根系长度不能为空'
					},
					regexp: {
						regexp: /^[1-9]*$/,
						message: '只能为正整数'
					}
				}
			},
			plantsseason : {
				validators : {
					notEmpty : {
						message: '生长周期名不能为空'
					}
				}
			},
			startdate : {
				validators : {
					notEmpty : {
						message: '开始日期不能为空'
					}
				}
			},
			enddate : {
				validators : {
					notEmpty : {
						message: '结束日期不能为空'
					}
				}
			},
			humidityup : {
				validators : {
					notEmpty : {
						message: '湿度上限不能为空'
					},
					regexp: {
						regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
						message: '只能为整数或者保留两位的小数'
					}
				}
			},
			humiditydown : {
				validators : {
					notEmpty : {
						message: '湿度下限不能为空'
					},
					regexp: {
						regexp: /^[0-9]+(\.[0-9]{1,2})?$/,
						message: '只能为整数或者保留两位的小数'
					}
				}
			},
			temperatureup : {
				validators : {
					notEmpty : {
						message: '温度上限不能为空'
					},
					regexp: {
						regexp: /^[0-9]+(\.[0-9]{1})?$/,
						message: '只能为整数或者保留一位的小数'
					}
				}
			},
			temperaturedown : {
				validators : {
					notEmpty : {
						message: '温度下限不能为空'
					},
					regexp: {
						regexp: /^[0-9]+(\.[0-9]{1})?$/,
						message: '只能为整数或者保留一位的小数'
					}
				}
			}
		}
	})
	
	// 修复-->当选择省份时，已经校验过的城市不会重新验证的问题
	.on('change', '.provinceItem', function(){
		$form.bootstrapValidator('revalidateField', 'city');
		
		// 验证土壤名称是否存在
	}).on('blur.rainet', '.soiltype', function(){
		var bv = $form.data('bootstrapValidator');
		$field = bv.getFieldElements('soiltype');
		var value = $field.val();
		if ($.trim(value) === '') {
			bv.updateMessage($field, 'notEmpty');
			return ;
		}
		var param = {soiltype : value};
		rainet.setting.service.soilInfo.validName(param, function(data){
			if (data) {
				// 存在，更新错误信息的提示
				bv.updateMessage($field, 'notEmpty', '土壤名称已存在');
				bv.updateStatus($field, 'INVALID');
			}
		});
	});
	
	$form.data('bootstrapValidator').disableSubmitButtons(true);
}

var dateTimePicker = function() {
	$('#timeone').datetimepicker({
		format : 'HH:mm',
		weekStart : 1,
		autoclose : true,
		pick12HourFormat: true,
		todayBtn : 'linked',
		language : 'zh-CN'
	}).on('changeDate', function(ev) {
		var startTime = ev.date.valueOf();
//		if (start < teach) {
			alert("“评估开始时间 ”不能早于“授课时间 ” ！");
			$(".timeone").focus();
//		}
	});
}