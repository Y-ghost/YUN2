;
"user strict";

var rainet = rainet || {};
rainet.setting = rainet.setting || {};
rainet.setting.controller = rainet.setting.controller || {}; 

// 主机信息
rainet.setting.controller.equipment = {
	
	// 添加校验信息 当保存或修改project的时候
	searchEquipments : function($projectList){
		$(".searchBtn").off('click').on('click', function(e){
			// 检查验证是否通过
			var projectId = $projectList.val();
			$projectList.off('change.rainet').on('change.rainet', function(){
				$(".EquipmentList").css("color","#333");
			});
			
			if(projectId=="-1"){
				$(".EquipmentList").css("color","#CC0033");
			}else if(confirm("该操作最多需要30秒钟的时间，确定搜索?")){
				rainet.setting.service.equipment.searchEquipment(projectId, function(data){
					if (data) {
						rainet.utils.notification.success('添加成功');
					}else if(data=="noLogin"){
						rainet.utils.notification.warning('您还没登陆，请先登录!');
					}
				});
			}
			
			// 更新host
//			rainet.setting.service.host.add(jsonData, function(data){
//				if (data) {
//					rainet.utils.notification.success('添加成功');
//				}else if(data=="noLogin"){
//					rainet.utils.notification.warning('您还没登陆，请先登录!');
//				}
//			});
		});
		
	},
	
	// 从后台获取数据之后，设置对应主机信息的值，以弹出框的形式展示
	setEquipmentInfo : function($hostHtml){
		// 如果是更新操作，就添加修改按钮，并绑定修改函数，如果是查看详情，则没有修改按钮
		var $form = $("form", $hostHtml);
		
		// 初始化主机列表
		var $projectList = $('.projectName',$hostHtml);
		rainet.setting.service.project.getProjectNames(function(data){
			var length = data.length;
			$projectList.empty();
			$projectList.append('<option value=\"-1\">-请选择项目-</option>');
			for (var i = 0; i < length; i++) {
				$projectList.append('<option value='+data[i].id+'>'+data[i].name+'</option>');
			}
		});
		// 绑定提交事件
		this.searchEquipments($projectList);
	},
	
	// 更新单个主机信息
	add : function(){
		var $projectHtml = $(this.infoTempate);
		$(".equipment-container").empty().append($projectHtml);
		this.setEquipmentInfo($projectHtml);
	},
	
	infoTempate : "<div class=\"col-xs-9 col-md-9\">" +
					"<div class=\"node-container\">" +
						"<div class=\"node-tools\" style=\"font-size:14px;\">" +
							"<label class=\"col-xs-2 col-md-2 text-center\" style=\"line-height: 34px;\">" +
							"所属项目:" +
							"</label>" +
							"<select class=\"col-xs-4 col-md-4 input-sm projectName\" name=\"projectid\" data-bv-field=\"projectid\"></select>" +
							"<div class=\"col-xs-3 col-md-3 text-center\">" +
							"<button type=\"button\" class=\"btn btn-success searchBtn \">搜索</button>" +
							"</div>" +
							"<div class=\"col-xs-3 col-md-3\">" +
							"<button type=\"button\" class=\"btn btn-warning addBtn\">添加</button>" +
							"</div>" +
							"</div>" +
							"<div class=\"EquipmentList\">" +
							"<label class=\"fa fa-hand-o-up fa-5\"></label>"+
							"<label class=\"fa-1\"> 请先选择项目，搜索正确连接的节点信息!</label>"+
							"</div>" +
							"</div>" +
							"</div>",
	
};

