;
"user strict";

var rainet = rainet || {};
rainet.controlCenter = rainet.controlCenter || {};
var pageNum = 1;
var pages = 1;
rainet.controlCenter.view = function() {
	var checked = function(){
		// 全选
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

	}
	//查询节点列表
	var initEquipmentList = function(data){
		var $EquipmentList = $(".EquipmentList");
		var str = "";
		var humidity = 0;
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
				var strError = "";
				if(data.humidity==0){
					strError = "<label class=\"col-sm-3 control-label\" id=\"has-error\">传感器"+Num+"：</label>" +
					"<div class=\"col-sm-3 has-error\">" +
					"<input type=\"text\" class=\"form-control address\"" +
					"id=\"inputLab\" data-bv-field=\"address\"value=\""+data.humidity+" %\"/>" +
					"</div>";
				}else{
					strError = "<label class=\"col-sm-3 control-label\">传感器"+Num+"：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control address\"" +
					"id=\"inputLab\" data-bv-field=\"address\"value=\""+data.humidity+" %\"/>" +
					"</div>"
				}
				humidity = data.humidity;
				sensorStr = sensorStr + headTmp + strError + endTmp;
			});
			if(iTmp!=10 && iTmp%2 == 0){
				sensorStr = sensorStr + "</div>";
			}
			var eTemperature = "";
			var eStatus = "";
			var velocity = "";
			if(item.equipmentStatus == null){
				eTemperature = "null";
				eStatus = "null";
				velocity = "0";
			}else{
				eTemperature = item.equipmentStatus.temperature;
				eStatus = item.equipmentStatus.status;
				velocity = item.equipmentStatus.velocity;
			}
			
			var area = item.equipment.area;
			var soilweight = item.equipment.soilweight;
			var soilwater = item.equipment.soilwater;
			var rootdepth = item.equipment.rootdepth;
			if(area==null){
				area = 0 ;
			}
			if(soilweight==null){
				soilweight = 1 ;
			}
			if(soilwater==null){
				soilwater = 0 ;
			}
			if(rootdepth==null){
				rootdepth = 0 ;
			}
			
			var water = area*rootdepth*soilweight/10000*(soilwater-(humidity*soilwater)/(soilweight*100));
			
			str = str + "<div class=\"col-xs-12 col-md-6\">" +
					"<div class=\"panel panel-default \">" +
					"<div class=\"panel-heading\">" +
					"<label>"+item.name+"</label> <span class=\"float-right\"> " +
					"<input type=\"checkbox\" class=\"cursor\" name=\""+item.id+"\" id=\"equipmentCheckbox\"/>" +
					"</span>" +
					"</div>" +
					"<div class=\"panel-body\">" +
					"<form class=\"form-horizontal\" role=\"form\">" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
					"<label class=\"col-sm-3 control-label\">土壤温度：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control projectName\"" +
					"id=\"inputLab\" data-bv-field=\"name\" value=\""+eTemperature+" ℃\"/>" +
					"</div>" +
					"<label class=\"col-sm-3 control-label\">阀门状态：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control department\"" +
					"id=\"inputLab\" data-bv-field=\"department\" value=\""+eStatus+"\"/>" +
					"</div>" +
					"</div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
					"<label class=\"col-sm-3 control-label\">预期水量：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control department\"" +
					"id=\"inputLab\" data-bv-field=\"department\" value=\""+(Number(water)).toFixed(3)+" L\"/>" +
					"</div>" +
					"<label class=\"col-sm-3 control-label\">水流速度：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control department\"" +
					"id=\"inputLab\" data-bv-field=\"department\" value=\""+velocity+" L/min\"/>" +
					"</div>" +
					"</div>" +
					sensorStr +
					"</form>" +
					"</div>" +
					"</div>" +
					"</div>";
		});
		$EquipmentList.empty().append(str);
	}
	var handlMenuView = function(currentEle){
		var $ele = $(currentEle);
		$ele.siblings().removeClass('active');
		$ele.addClass('active');
	}
	// 查看项目下节点信息
	var setView = function() {
		//首次加载项目第一个的节点信息
		var id = $("#projectList a:first").attr("id");
		if(id!=undefined){
			var param = {pId : id};
			rainet.controlCenter.service["equipment"].list(param, function(data){
				initEquipmentList(data);
			});
		}
		
		$('.panelLink').off('click').on('click', function() {
			handlMenuView(this);
			var projectId =$(this).attr("id");
			var param = {pId : projectId};
			rainet.controlCenter.service["equipment"].list(param, function(data){
				initEquipmentList(data);
			});
		});
		checked();
	};
	
	// 初始化项目列表
	var initProjectList = function(data) {
		var $projectList = $('#projectList');
		var str = "";
		pageNum = data.pageNum;
		pages = data.pages;
		$.each(data.result,function(index,item){
			var linkActive = "";
			if(index==0){
				linkActive = " link-heading active";
			}else{
				linkActive = "";
			}
			if(item.wifiStatus=="在线"){
				str = str + "<a href='javascript:void(0);' class='list-group-item panelLink "+linkActive+"' id='"+item.id+"' name='"+item.projecttype+"'>"+item.name+"<span class='fa fa-wifi text-success navbar-right dropdown cursor' id='通讯正常!'></span></a>";
			}else{
				str = str + "<a href='javascript:void(0);' class='list-group-item panelLink "+linkActive+"' id='"+item.id+"' name='"+item.projecttype+"'>"+item.name+"<span class='fa fa-exclamation-triangle text-danger navbar-right dropdown cursor' id='通讯故障!'></span></a>";
			}
		});
		$projectList.empty().append($(str));
		//分页查询
		$(".pagination").jqPagination({
			link_string : "/?page={page_number}",
			current_page: pageNum, //设置当前页 默认为1
			max_page : pages, //设置最大页 默认为1
			page_string : "{current_page} / {max_page}",
			paged : function(page) {
				var param  = { pageSize: 10, pageNow : page };
				rainet.controlCenter.service["project"].list(param, function(data){
					initProjectList(data);
				});
			}
		});
		
		tipShow();
		
		setView();
	};
	
	//通讯状态弹框提示
	var tipShow = function(){
		var content = "";
		$(".dropdown").mouseenter(function() {
			var tmp = $(this).attr("id");
			if(tmp=="通讯正常!"){
				content = '<div style="width:80px;text-align:center;font-weight:700;"><font color="green">'+tmp+'</font></div>';
			}else{
				content = '<div style="width:80px;text-align:center;font-weight:700;"><font color="red">'+tmp+'</font></div>';
			}
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
	//开启灌溉
	var open = function(){
		var flag = true;
			$(".openBtn").click(function(){
				if(flag){
					flag = false;
					var idStr = "";
					$("[id='equipmentCheckbox']").each(function(){
						if($(this).is(":checked")){
							idStr = idStr + $(this).attr("name")+",";
						}
					});
					if(idStr != ""){
						bootbox.dialog({
							message : "确认开启？",
							title : '开启实时灌溉',
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
								    	  idStr = idStr.substring(0,idStr.length-1);
											var param  = {optionType: 0, id: idStr };
											rainet.controlCenter.service["equipment"].openOrClose(param, function(data){
												if(data){
													rainet.utils.notification.success("开启实时灌溉成功!");
												}else{
													rainet.utils.notification.error("开启实时灌溉失败!");
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
			$(".closeBtn").click(function(){
				if(flag){
					flag = false;
					var idStr = "";
					$("[id='equipmentCheckbox']").each(function(){
						if($(this).is(":checked")){
							idStr = idStr + $(this).attr("name")+",";
						}
					});
					if(idStr != ""){
						bootbox.dialog({
							message : "确认关闭？",
							title : '关闭实时灌溉',
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
								    	  	idStr = idStr.substring(0,idStr.length-1);
											var param  = {optionType: 1, id: idStr };
											rainet.controlCenter.service["equipment"].openOrClose(param, function(data){
												if(data){
													rainet.utils.notification.success("关闭实时灌溉成功!");
												}else{
													rainet.utils.notification.error("关闭实时灌溉失败!");
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
	}
	
	var init = function() {
		var param  = { pageSize: 10, pageNow : pageNum };
		rainet.controlCenter.service["project"].list(param, function(data){
			initProjectList(data);
		});
		open();
		//获取系统时间
//		rainet.utils.systime();
		//退出系统
		rainet.utils.exist();
	}

	return {
		init : init
	};

}();


rainet.controlCenter.url = {
	project : {
		url : rainet.settings.baseUrl + 'project/'
	},
	equipment : {
		url : rainet.settings.baseUrl + 'equipment/'
	}
};


rainet.controlCenter.service = {
	project : {
		list : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.controlCenter.url.project.url,
				data : param,
				success : function(data) {
					callback(data);
				}
			});
		}
	},
	equipment : {
		list : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.controlCenter.url.equipment.url+"selectEquipmentExt/",
				data : param,
				$busyEle : $('body'),
				success : function(data) {
					callback(data);
				}
			});
		},
		openOrClose : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.controlCenter.url.equipment.url+"openOrCloseEquipments/",
				data : param,
				$busyEle : $('body'),
				success : function(data) {
					callback(data);
				}
			});
		}
	}
};

$(document).ready(function() {
	$("#homeLab").html("控制中心");
	$("#homeHref").attr("href", "index");
	
	rainet.controlCenter.view.init();
});



