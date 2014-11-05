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
			alert($(":checkbox").attr("class"));
			if($(this).is(':checked')){
				$(":checkbox").attr("checked", true);
            }else{
            	$(":checkbox").attr("checked", false);
            }
		}); 

	}
	//查询节点列表
	var initEquipmentList = function(data){
		var $EquipmentList = $(".EquipmentList");
		var str = "";
		$.each(data,function(index,item){
			var sensorStr = "";
			var iTmp = 10;
			$.each(item.equipmentData,function(i,data){
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
				sensorStr = sensorStr + headTmp + strError + endTmp;
			});
			if(iTmp!=10 && iTmp%2 == 0){
				sensorStr = sensorStr + "</div>";
			}
			str = str + "<div class=\"col-xs-12 col-md-6\">" +
					"<div class=\"panel panel-default \">" +
					"<div class=\"panel-heading\">" +
					"<label>"+item.name+"</label> <span class=\"float-right\"> " +
					"<input type=\"checkbox\" class=\"cursor\" id=\"equipmentCheckbox\"/>" +
					"</span>" +
					"</div>" +
					"<div class=\"panel-body\">" +
					"<form class=\"form-horizontal\" role=\"form\">" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
					"<label class=\"col-sm-3 control-label\">土壤温度：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control projectName\"" +
					"id=\"inputLab\" data-bv-field=\"name\" value=\""+item.equipmentStatus.temperature+" ℃\"/>" +
					"</div>" +
					"<label class=\"col-sm-3 control-label\">阀门状态：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control department\"" +
					"id=\"inputLab\" data-bv-field=\"department\" value=\""+item.equipmentStatus.status+"\"/>" +
					"</div>" +
					"</div>" +
					"<div class=\"form-group has-feedback\" id=\"form-group\">" +
					"<label class=\"col-sm-3 control-label\">预期水量：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control department\"" +
					"id=\"inputLab\" data-bv-field=\"department\" value=\"0 L\"/>" +
					"</div>" +
					"<label class=\"col-sm-3 control-label\">实时水量：</label>" +
					"<div class=\"col-sm-3\">" +
					"<input type=\"text\" class=\"form-control department\"" +
					"id=\"inputLab\" data-bv-field=\"department\" value=\"0 L\"/>" +
					"</div>" +
					"</div>" +
					sensorStr +
					"<input type=\"hidden\" name=\"id\" class=\"id\" value=\""+item.id+"\"/>" +
					"</form>" +
					"</div>" +
					"</div>" +
					"</div>";
		});
		$EquipmentList.find("div").remove();
		$EquipmentList.append(str);
	}
	
	// 查看项目下节点信息
	var setView = function() {
		$('.projectLink').off('click').on('click', function() {
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
			if(item.wifiStatus=="在线"){
				str = str + "<li class='list-group-item' style='margin-top:10px'><a href='javascript:void(0);' class='projectLink' id='"+item.id+"' name='"+item.projecttype+"'>"+item.name+"</a><span class='fa fa-wifi text-success navbar-right dropdown cursor' id='通讯正常!'></span></li>";
			}else{
				str = str + "<li class='list-group-item' style='margin-top:10px'><a href='javascript:void(0);' class='projectLink' id='"+item.id+"' name='"+item.projecttype+"'>"+item.name+"</a><span class='fa fa-exclamation-triangle text-danger navbar-right dropdown cursor' id='通讯故障!'></span></li>";
			}
		});
		$projectList.find("li").remove();
		$projectList.append($(str));
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
	
	var init = function() {
		var param  = { pageSize: 10, pageNow : pageNum };
		rainet.controlCenter.service["project"].list(param, function(data){
			initProjectList(data);
		});
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
				$busyEle : $('#tableContainer'),
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
				$busyEle : $('#tableContainer'),
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



