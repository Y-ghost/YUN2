;
"user strict";

var rainet = rainet || {};
rainet.setting = rainet.setting || {};
rainet.setting.controller = rainet.setting.controller || {}; 

// 主机信息
rainet.setting.controller.equipment = {
	
	// 添加校验信息 当保存或修改project的时候
	setValidHost : function($form){
		$form.bootstrapValidator({
			feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields : {
				projectid : {
					validators : {
						notEmpty : {
							message: '主机名称不能为空'
						}
					}
				},
				code : {
					validators : {
						notEmpty : {
							message: '主机编号不能为空'
						},
						regexp: {
	                        regexp: /^[0-9]{8}$/i,
	                        message : ' '
	                    }
					}
				}
			}
		});
		
		$form.data('bootstrapValidator').disableSubmitButtons(true);
	},
	
	// 从后台获取数据之后，设置对应主机信息的值，以弹出框的形式展示
	setHostInfo : function($hostHtml){
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
		$('button[type=submit]', $form).off('click').on('click', function(e){
			// 检查验证是否通过
			var bv = $form.data('bootstrapValidator');
			if (bv.$invalidFields.length > 0) {
				return false;
			}
			var formData = $form.serializeArray();
			var jsonData = rainet.utils.serializeObject(formData);
			var config = {jsonData : jsonData};
			config.handleError = function(result){
				// code已存在或主机已有主机，更新错误信息的提示
				$form.data('bootstrapValidator').disableSubmitButtons(true);
				var filed = 'code';
				$('.help-block', $form).hide();
				if (result.message.indexOf('主机') > -1) {
					filed = 'projectid'
					$('.js-placehoder', $form).show();
				}
				$field = bv.getFieldElements(filed);
				bv.updateMessage($field, 'notEmpty', result.message);
				bv.updateStatus($field, 'INVALID');
				return false;
			}
			// 更新host
			rainet.setting.service.host.add(jsonData, function(data){
				if (data) {
					rainet.utils.notification.success('添加成功');
				}else if(data=="noLogin"){
					rainet.utils.notification.warning('您还没登陆，请先登录!');
				}
			});
		});
		
		this.setValidHost($form);
	},
	
	// 更新单个主机信息
	add : function(){
		var $projectHtml = $(this.infoTempate);
		$(".equipment-container").empty().append($projectHtml);
		this.setHostInfo($projectHtml);
	},
	
	infoTempate : "<div class=\"col-xs-9 col-md-9\">" +
					"<div class=\"node-container\">" +
						"<div class=\"node-tools\" style=\"font-size:14px;\">" +
							"<label class=\"col-xs-2 col-md-2 text-center\" style=\"line-height: 34px;\">" +
							"所属项目:" +
							"</label>" +
							"<select class=\"col-xs-4 col-md-4 input-sm projectName\" style=\"margin-top: 2px;font-size:14px;\" name=\"projectid\" data-bv-field=\"projectid\"></select>" +
							"<div class=\"col-xs-3 col-md-3 text-center\">" +
							"<button type=\"button\" class=\"btn btn-success searchBtn \">搜索</button>" +
							"</div>" +
							"<div class=\"col-xs-3 col-md-3\">" +
							"<button type=\"button\" class=\"btn btn-warning addBtn\">添加</button>" +
							"</div>" +
							"</div>" +
							"<div class=\"EquipmentList\">" +
							"</div>" +
							"</div>" +
							"</div>",
	
};

