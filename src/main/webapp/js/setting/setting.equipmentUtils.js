;
"user strict";

var rainet = rainet || {};
rainet.setting = rainet.setting || {};

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
		}else{
			$(this).parent().parent().parent().find("div.timeLens").css("display","none");
		}
	});
}

//select初始选中事件
var selectVal = function(data){
	$.each(data,function(index,item){
		$("[id='equipmentCheckbox']").each(function(){
			var $form = $(this).parent().parent().parent().find("form");
			var id = $form.find("input[name=id]").val(); 
			if(item.equipment.id==id){
				$(".soilname",$form).val(item.equipment.soilname); 
				$(".plantsname",$form).val(item.equipment.plantsname); 
			}else{
				$(".soilname",$form).val(-1); 
				$(".plantsname",$form).val(-1); 
			}
		});
	});
}
//自定义植物信息
var addPlants = function($plantsInfo,$growthCycleHeader,$growthCycle){
	$(".plantsLink").off('click').on('click', function(e){
		var gcs = $(".growthCycles",$plantsInfo);
			gcs.empty().append($growthCycleHeader.html());
		
		var $form = $("form",$plantsInfo);
		setValidateForPlants($form);
		
		cycledate();//....
		$(".addNewCycle",$plantsInfo).off('click').on('click', function(e){
			gcs.append($growthCycle.html());
			
			$(".closeCycle",$plantsInfo).off('click').on('click', function(e){
				$(this).parent().remove();
			});
			
			var cycle = $('.growthCycle', gcs).last();
			var $plantsseason = $(".plantsseason", cycle);
			var $startdate = $(".startdate", cycle);
			var $enddate = $(".enddate", cycle);
			var $humidityup = $(".humidityup", cycle);
			var $humiditydown = $(".humiditydown", cycle);
			var $temperatureup = $(".temperatureup", cycle);
			var $temperaturedown = $(".temperaturedown", cycle);
			$form.bootstrapValidator('addField', $plantsseason);
			$form.bootstrapValidator('addField', $startdate);
			$form.bootstrapValidator('addField', $enddate);
			$form.bootstrapValidator('addField', $humidityup);
			$form.bootstrapValidator('addField', $humiditydown);
			$form.bootstrapValidator('addField', $temperatureup);
			$form.bootstrapValidator('addField', $temperaturedown);
			
			cycledate();
		});
		
		
		$('button[type=submit]', $form).off('click').on('click', function(){
			// 检查验证是否通过
			$($form).bootstrapValidator('validate');
			var bv = $form.data('bootstrapValidator');
			if (bv.$invalidFields.length > 0) {
				return false;
			}
			var formData = $form.serializeArray();
			var jsonData = rainet.utils.serializeObject(formData);
			//组装json
			var plantsname = $('.plantsname', $form).val();
			var rootdepth = $('.rootdepth', $form).val();
			var plants = {plantsname : plantsname, rootdepth : rootdepth};
			var param = {plants: plants};
			var list = [];
			var $array = $('.growthCycle', $form);
			$array.each(function(i,cycle){
				var d = {};
				$('input', $(cycle)).each(function(){
					var name = $(this).attr("name");
					var value = $(this).val();
					d[name] = value;
				});
				list.push(d);
			});
			param.result = list;
			// 添加植物
			rainet.setting.service.plants.add(param, function(data){
				if (data) {
					bootbox.hideAll();
					rainet.utils.notification.success('添加成功!');
				}
			});
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
					},
					regexp: {
						regexp: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,
						message: '日期格式如：2014-01-01'
					}
				}
			},
			enddate : {
				validators : {
					notEmpty : {
						message: '结束日期不能为空'
					},
					regexp: {
						regexp: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,
						message: '日期格式如：2014-01-01'
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
		// 验证植物名称是否存在
	}).on('blur.rainet', '.plantsname', function(){
		var bv = $form.data('bootstrapValidator');
		$field = bv.getFieldElements('plantsname');
		var value = $field.val();
		if ($.trim(value) === '') {
			bv.updateMessage($field, 'notEmpty');
			return ;
		}
		var param = {plantsname : value};
		rainet.setting.service.plants.validName(param, function(data){
			if (data) {
				// 存在，更新错误信息的提示
				bv.updateMessage($field, 'notEmpty', '植物名称已存在');
				bv.updateStatus($field, 'INVALID');
			}
		});
	});
	
	$form.data('bootstrapValidator').disableSubmitButtons(true);
}
// 添加校验信息 当保存或修改节点信息的时候
var setValidateForEquipmentInfo = function($form){
	$form.bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields : {
			soilname : {
				validators : {
					regexp: {
                        regexp: /^[0-9]*[1-9][0-9]*$/,
                        message: '土壤不能为空'
                    }
				}
			},
			plantsname : {
				validators : {
					regexp: {
                        regexp: /^[0-9]*[1-9][0-9]*$/,
                        message: '植物不能为空'
                    }
				}
			},
			rootdepth : {
				validators : {
					notEmpty : {
						message: '生长周期名不能为空'
					}
				}
			},
			soilweight : {
				validators : {
					notEmpty : {
						message: '开始日期不能为空'
					},
					regexp: {
						regexp: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,
						message: '日期格式如：2014-01-01'
					}
				}
			},
			humidityup : {
				validators : {
					notEmpty : {
						message: '结束日期不能为空'
					},
					regexp: {
						regexp: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,
						message: '日期格式如：2014-01-01'
					}
				}
			},
			humiditydown : {
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
			temperatureup : {
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
			temperaturedown : {
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
			soilwater : {
				validators : {
					notEmpty : {
						message: '温度下限不能为空'
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
						message: '温度上限不能为空'
					},
					regexp: {
						regexp: /^[0-9]+(\.[0-9]{1})?$/,
						message: '只能为整数或者保留一位的小数'
					}
				}
			},
			week : {
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
			timeonestart : {
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
			timeoneend : {
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
			timetwostart : {
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
			timetwoend : {
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
			timethreestart : {
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
			timethreeend : {
				validators : {
					notEmpty : {
						message: '温度上限不能为空'
					},
					regexp: {
						regexp: /^[0-9]+(\.[0-9]{1})?$/,
						message: '只能为整数或者保留一位的小数'
					}
				}
			}
		}
		// 验证植物名称是否存在
	}).on('blur.rainet', '.plantsname', function(){
		var bv = $form.data('bootstrapValidator');
		$field = bv.getFieldElements('plantsname');
		var value = $field.val();
		if ($.trim(value) === '') {
			bv.updateMessage($field, 'notEmpty');
			return ;
		}
		var param = {plantsname : value};
		rainet.setting.service.plants.validName(param, function(data){
			if (data) {
				// 存在，更新错误信息的提示
				bv.updateMessage($field, 'notEmpty', '植物名称已存在');
				bv.updateStatus($field, 'INVALID');
			}
		});
	});
	
	$form.data('bootstrapValidator').disableSubmitButtons(true);
}
// 日历控件显示时间
var dateTime = function() {
	var time = $(".EquipmentList").find("input[id=dateTime]");
	$(time).each(function(i){ 
		$(this).pickatime({
			format : 'H:i',
			clear : '关闭'
		});
	});
}
// 日历控件显示时间
var cycledate = function() {
	var time = $(".growthCycles").find("input[id=cycledate]");
	console.log(time.length);
	$(time).each(function(i){ 
		$(this).pickadate({
			today: '今天',
			clear: '关闭',
			selectYears: true,
			selectMonths: true
		});
	});
}