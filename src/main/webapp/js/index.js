;
"user strict";

var rainet = rainet || {};
rainet.controlCenter = rainet.controlCenter || {};
var pageNum = 1;
var pages = 1;
rainet.controlCenter.view = function() {
//	var defaultView = 'project';
//	
//	var setProjectInfo = function(data, readonly) {
//		var $projectHtml = $('#projectInfo').clone().attr('id', 'projectInfo1').css('display', 'block');
//		$('.projectName', $projectHtml).val(data.name);
//		$(".id", $projectHtml).val(data.id);
//
//		// Add validation
//		setValidateForPrjoect($("form", $projectHtml));
//	}
//
//	var handlMenuView = function(currentEle) {
//		var $ele = $(currentEle);
//		$ele.siblings().removeClass('active');
//		$ele.addClass('active');
//
//		var module = $ele.attr('data-name');
//		setView(module);
//	}
//
	var setView = function() {
		$('.projectLink').off('click').on('click', function() {
			alert($(this).attr("id"));
		});
		
	};
	
	
	// 初始化项目列表
	var initProjectList = function(data) {
		var $projectList = $('#projectList');
		var str = "";
		pageNum = data.pageNum;
		pages = data.pages;
		$.each(data.result,function(index,item){
			if(item.wifiStatus=="在线"){
				str = str + "<li class='list-group-item' style='margin-top:10px'><a href='javascript:void(0);' class='projectLink' id='"+item.id+"'>"+item.name+"</a><span class='fa fa-wifi text-success navbar-right dropdown cursor' id='通讯正常！'></span></li>";
			}else{
				str = str + "<li class='list-group-item' style='margin-top:10px'><a href='javascript:void(0);' class='projectLink' id='"+item.id+"'>"+item.name+"</a><span class='fa fa-exclamation-triangle text-danger navbar-right dropdown cursor' id='通讯故障！'></span></li>";
			}
		});
		$projectList.find("li").remove();
		$projectList.append($(str));
		//当页数低于
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
			content = $(this).attr("id");
			$(this).popover({
				title:'',
				trigger:'hover',
				placement:'top',
				html: 'true',
				content : '<div style="width:80px;text-align:center;"><font color="green">'+content+'</font></div>',
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
	}
};

$(document).ready(function() {
	$("#homeLab").html("控制中心");
	$("#homeHref").attr("href", "index");
	rainet.controlCenter.view.init();
});