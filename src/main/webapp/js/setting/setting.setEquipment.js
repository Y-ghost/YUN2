;
"user strict";

var rainet = rainet || {};
rainet.setting = rainet.setting || {};
rainet.setting.controller = rainet.setting.controller || {}; 
var flag = true;

// 主机信息
rainet.setting.controller.setEquipment = {
		//自定义植物信息
		addPlants:function($plantsInfo,$growthCycle){
			
			$(".plantsLink").off('click').on('click', function(e){
				var gcs = $(".growthCycles",$plantsInfo);
					gcs.append($growthCycle);
				
				$(".addNewCycle",$plantsInfo).off('click').on('click', function(e){
					console.log(gcs.children());
					gcs.append(gcs.children());
				});
				bootbox.dialog({
					message : $plantsInfo,
					title : '自定义植物',
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
						      label: "提交",
						      className: "btn-success",
						      callback : function(){
						    	  idStr = idStr.substring(0,idStr.length-1);
									var param  = {optionType: 0, id: idStr };
//									rainet.controlCenter.service["equipment"].openOrClose(param, function(data){
//										if(data){
//											rainet.utils.notification.success("开启实时灌溉成功!");
//										}else{
//											rainet.utils.notification.error("开启实时灌溉失败!");
//										}
//										flag = true;
//									});
						      }
						}
				}
				});
			});
		},
		//自定义土壤信息
		addSoil:function($soilInfo){
			$(".soilLink").off('click').on('click', function(e){
				$.initProv($('.provinceItem',$soilInfo), $('.cityItem',$soilInfo), "-省份-", "-城市-");
				$.initCities($(".provinceItem", $soilInfo),$(".cityItem", $soilInfo));
				bootbox.dialog({
					message : $soilInfo,
					title : '自定义土壤',
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
							label: "提交",
							className: "btn-success",
							callback : function(){
								idStr = idStr.substring(0,idStr.length-1);
								var param  = {optionType: 0, id: idStr };
//									rainet.controlCenter.service["equipment"].openOrClose(param, function(data){
//										if(data){
//											rainet.utils.notification.success("开启实时灌溉成功!");
//										}else{
//											rainet.utils.notification.error("开启实时灌溉失败!");
//										}
//										flag = true;
//									});
							}
						}
					}
				});
			});
		},
		//时段切换
		radioChange:function(){
			$(".modelClass").change(function() {
				if($(this).val()==2){
					$(this).parent().parent().parent().find("div.timeLens").css("display","inline");
				}else{
					$(this).parent().parent().parent().find("div.timeLens").css("display","none");
				}
			});
		},
		// 搜索事件
		findEquipments : function($projectList){
			//搜索节点
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
						rainet.setting.service.equipment.searchEquipment(param, function(data){
							var $EquipmentList = $(".EquipmentList");
							var str = "";
							$.each(data,function(index,item){
								var sensorStr = "";
								var iTmp = 10;
								$.each(item.result,function(i,data){
									iTmp = i;
									var headTmp = ""; 
									var endTmp = ""; 
									if(i%2==0){
										headTmp = "<div class=\"form-group has-feedback\" id=\"form-group\">";
									}else{
										headTmp = "";
									}
									
									if(i%2>0){
										endTmp = "</div>";
									}else{
										endTmp = "";
									}
									var Num = "";
									switch(i+1){
									case 1:
										Num = "一";
										break;
									case 2:
										Num = "二";
										break;
									case 3:
										Num = "三";
										break;
									case 4:
										Num = "四";
										break;
									case 5:
										Num = "五";
										break;
									}
									var strContent = "<label class=\"col-sm-3 control-label\">传感器"+Num+"：</label>" +
													"<div class=\"col-sm-3\">" +
													"<input type=\"text\" class=\"form-control address\"" +
													"id=\"inputLab\" name=\"address\" disabled value=\""+data.number+"\"/>" +
													"</div>"
									sensorStr = sensorStr + headTmp + strContent + endTmp;
								});
								if(iTmp!=10 && iTmp%2 == 0){
									sensorStr = sensorStr + "</div>";
								}
								
								str = str + "<div class=\"col-xs-12 col-md-6\">" +
										"<div class=\"panel panel-default \">" +
										"<div class=\"panel-heading\">" +
										"<label>节点信息</label>" +
										"</div>" +
										"<div class=\"panel-body\">" +
										"<form class=\"form-horizontal\" role=\"form\">" +
										"<div class=\"form-group has-feedback\" id=\"form-group\">" +
										"<label class=\"col-sm-3 control-label\">节点名称：</label>" +
										"<div class=\"col-sm-3\">" +
										"<input type=\"text\" class=\"form-control\"" +
										"id=\"inputLab\" name=\"name\" value=\""+(index+1)+" 号节点\"/>" +
										"</div>" +
										"<label class=\"col-sm-3 control-label\">节点地址：</label>" +
										"<div class=\"col-sm-3\">" +
										"<input type=\"text\" class=\"form-control\"" +
										"id=\"inputLab\" name=\"code\" disabled value=\""+item.code+"\"/>" +
										"</div>" +
										"</div>" +
										"<div class=\"form-group has-feedback\" id=\"form-group\">" +
										"<label class=\"col-sm-3 control-label\">灌溉面积：</label>" +
										"<div class=\"col-sm-3\">" +
										"<input type=\"text\" class=\"form-control\"" +
										"id=\"inputLab\" name=\"area\" value=\"\"/>" +
										"<span class=\"fa fa-exclamation-circle text-primary navbar-right dropdown cursor\" id=\"请输入正整数或保留2位的小数，如：123，123.12 ！\"></span>" +
										"</div>" +
										"<label class=\"col-sm-3 control-label\">流量参数：</label>" +
										"<div class=\"col-sm-3\">" +
										"<input type=\"text\" class=\"form-control\"" +
										"id=\"inputLab\" name=\"fowParameter\" value=\"\"/>" +
										"<span class=\"fa fa-exclamation-circle text-primary navbar-right dropdown cursor\" id=\"请输入正整数，如：123 ！\"></span>" +
										"<input type=\"hidden\" class=\"form-control\" name=\"controlHostId\" value=\""+item.controlHostId+"\"/>" +
										"</div>" +
										"</div>" +
										sensorStr +
										"</form>" +
										"</div>" +
										"</div>" +
										"</div>";
							});
							$EquipmentList.empty().append(str);
							tipShow();
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
			this.radioChange();
			this.addSoil($(this.soilInfoTempate));
			this.addPlants($(this.plantsInfoTempate),$(this.growthCycle));
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
						
							"<div class=\"col-xs-12 col-md-6\">" +
							"<div class=\"panel panel-default \">" +
							"<div class=\"panel-heading\">" +
							"<label>1号节点</label> <span class=\"float-right\"> <input type=\"checkbox\" class=\"cursor\" name=\"1\" id=\"equipmentCheckbox\"></span></div>" +
							"<div class=\"panel-body\">" +
							"<form class=\"form-horizontal\" role=\"form\">" +
								"<div class=\"form-group has-feedback\" style='margin-bottom:10px;padding-bottom:10px;border-bottom:#ddd 1px solid;' id=\"form-group\">" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" checked id=\"inputLab\" value=\"0\" >&nbsp;&nbsp;&nbsp;&nbsp;手动</input></div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" id=\"inputLab\" value=\"1\">&nbsp;&nbsp;&nbsp;&nbsp;自动</div>" +
									"<div class=\"col-sm-4 text-center\"><input type=\"radio\" name=\"model\" class=\"modelClass\" id=\"inputLab\" value=\"2\">&nbsp;&nbsp;&nbsp;&nbsp;时段</div></div>" +
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\">土壤：</label>" +
									"<div class=\"col-sm-6\"><select class=\"form-control address\" id=\"inputLab\"><option>-选择土壤-</option></select></div>" +
									"<div class=\"col-sm-3\" style='line-height:34px;'><a class=\"cursor soilLink\" id=\"inputLab\">自定义</a></div></div>" +
								"<div class=\"form-group has-feedback\" style='margin-bottom:10px;padding-bottom:10px;border-bottom:#ddd 1px solid;' id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\">植物：</label>" +
									"<div class=\"col-sm-6\"><select class=\"form-control address\" id=\"inputLab\"><option>-选择植物-</option></select></div>" +
									"<div class=\"col-sm-3\" style='line-height:34px;'><a class=\"cursor plantsLink\" id=\"inputLab\">自定义</a></div></div>" +
//								"<hr/>"+
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\">根系深度：</label>" +
									"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control address\" id=\"inputLab\" data-bv-field=\"address\" value=\"12 %\"></div>" +
									"<label class=\"col-sm-3 control-label\">土壤干重：</label>" +
									"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control address\" id=\"inputLab\" data-bv-field=\"address\" value=\"0 %\"></div></div>" +
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\">湿度上限：</label>" +
									"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control department\" id=\"inputLab\" data-bv-field=\"department\" value=\"0 L\"></div>" +
									"<label class=\"col-sm-3 control-label\">湿度下限：</label>" +
									"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control department\" id=\"inputLab\" data-bv-field=\"department\" value=\"0 L\"></div></div>" +
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\">温度上限：</label>" +
									"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control address\" id=\"inputLab\" data-bv-field=\"address\" value=\"0 %\"></div>" +
									"<label class=\"col-sm-3 control-label\">温度下限：</label>" +
									"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control address\" id=\"inputLab\" data-bv-field=\"address\" value=\"0 %\"></div></div>" +
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\">饱和水量：</label>" +
									"<div class=\"col-sm-3\"><input type=\"text\" class=\"form-control address\" id=\"inputLab\" data-bv-field=\"address\" value=\"0 %\"></div></div>" +
								"<div class=\"timeLens\" style=\"display:none;\">"+
								"<hr/>"+
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\">灌溉周期：</label>" +	
									"<div class=\"col-sm-9\"><input type=\"text\" class=\"form-control address cursor\" id=\"inputLab\" data-bv-field=\"address\" value=\"\"></div></div>" +
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段一：</label>" +
									"<div class=\"col-sm-9\"><input type=\"text\" class=\"form-control department cursor\" id=\"inputLab\" data-bv-field=\"department\" value=\"\"></div></div>" +
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段二：</label>" +
									"<div class=\"col-sm-9\"><input type=\"text\" class=\"form-control department cursor\" id=\"inputLab\" data-bv-field=\"department\" value=\"\"></div></div>" +
								"<div class=\"form-group has-feedback\" id=\"form-group\">" +
									"<label class=\"col-sm-3 control-label\"><input type=\"checkbox\"/>&nbsp;时段三：</label>" +
									"<div class=\"col-sm-9\"><input type=\"text\" class=\"form-control address cursor\" id=\"inputLab\" data-bv-field=\"address\" value=\"\"></div></div>" +
								"</div>"+
							"</form></div></div></div>"+
						
						"</div>" +
						"</div>" +
						"</div>",
						
		soilInfoTempate : "<div>\n"+
						"<form class=\"form-horizontal\" role=\"form\">\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">土壤名称：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">土壤干容重：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">田间持水量：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
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
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值1：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值2：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值2：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值3：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值3：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">实测湿度值4：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">传感器原始值4：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<input type=\"hidden\" name=\"id\" class=\"id\"/>\n"+
						"</form>\n"+
						"</div>",
						
	plantsInfoTempate : "<div>\n"+
						"<form class=\"form-horizontal\" role=\"form\">\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">植物名称：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">根系深度：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"growthCycles\">"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-12 text-center\"><a href=\"javascript:void(0);\" class=\"addNewCycle cursor\">添加新周期</a></label>\n"+
						"</div>\n"+
						"<input type=\"hidden\" name=\"id\" class=\"id\"/>\n"+
						"</form>\n"+
						"</div>",
		growthCycle : "<div class=\"growthCycle\">"+
						"<hr/>"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">植物生长周期名：</label>\n"+
						"<div class=\"col-sm-9\">\n"+
						"<input type=\"text\" class=\"form-control plantsName\" name=\"name\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">开始日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">结束日期：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">湿度上限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">湿度下限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
						"</div>\n"+
						"</div>\n"+
						"<div class=\"form-group\">\n"+
						"<label class=\"col-sm-3 control-label\">温度上限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\" class=\"form-control soilName\" name=\"name\"/>\n"+
						"</div>\n"+
						"<label class=\"col-sm-3 control-label\">温度下限：</label>\n"+
						"<div class=\"col-sm-3\">\n"+
						"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
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