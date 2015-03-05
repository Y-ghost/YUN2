;
"user strict";

var rainet = rainet || {};
rainet.message = rainet.message || {};
rainet.message.controller = rainet.message.controller || {}; 

// 项目信息
rainet.message.controller.project = {
	
	// 从后台获取数据之后，设置对应项目信息的值，以弹出框的形式展示
	setProjectInfo : function(data, readonly, $dataTable){
		var $projectHtml = $(this.infoTempate).attr('id', 'projectInfo'+data.id).css('display','block');
		$('.projectName',$projectHtml).val(data.name);
		$('.department',$projectHtml).val(data.department);
		$('.address',$projectHtml).val(data.address);
		$.initProv($('.provinceItem',$projectHtml), $('.cityItem',$projectHtml), "-省份-", "-城市-");
		$(".provinceItem", $projectHtml).val(data.province);
		$.initCities($(".provinceItem", $projectHtml),$(".cityItem", $projectHtml));
		$(".cityItem", $projectHtml).val(data.city);
		$(".id", $projectHtml).val(data.id);
		
		if (readonly) {
			$("input", $projectHtml).attr('disabled', true);
			$("select", $projectHtml).attr('disabled', true);
			$('button[type=submit]', $projectHtml).css('display', 'none');
		}
		// 如果是更新操作，就添加修改按钮，并绑定修改函数，如果是查看详情，则没有修改按钮
		var $form = $("form", $projectHtml);
		if (!readonly) {
			$('button[type=submit]', $form).off('click').on('click', function(){
				// 检查验证是否通过
				$($form).bootstrapValidator('validate');
				var bv = $form.data('bootstrapValidator');
				if (bv.$invalidFields.length > 0) {
					return false;
				}
				var formData = $form.serializeArray();
				var jsonData = rainet.utils.serializeObject(formData);
				// 更新项目
				rainet.message.service.project.update(jsonData, function(data){
					if (data) {
						rainet.utils.notification.success('修改成功');
						$dataTable.api().ajax.reload();
					}
				});
			});
			// Add validation
			$form.attr('data-id', data.id);
			this.setValidateForPrjoect($form, 'update');
		}
		bootbox.dialog({
			message : $projectHtml,
			title : '项目信息',
			// 支持ESC
			onEscape : function(){
				
			}
		});
	},
	
  table : {
		// 项目管理的表头
		columns : [
		           	{ "targets": 0, "orderable": false, "render" : rainet.message.util.formateSeq},
		           	{ "sTitle": "项目名称",  "targets": 1, "render" : rainet.message.util.formateLink},
		           	{ "sTitle": "项目单位", "targets": 2 },
		           	{ "sTitle": "项目地址",  "targets": 3 },
		           	{ "sTitle": "创建时间",    "targets": 4, "render" :rainet.message.util.formateDate},
		           	{ "sTitle": "操作",    "targets": 5, "orderable": false, "data": null,
		    			"defaultContent": rainet.message.util.operaterHtml }
		],
		// 默认排序的字段
		order : [4, 'desc'],
		
		// 映射后台返回的数据
		dataRef : [
		             {'data':'id'},
				     {'data':'name'},
				     {'data':'department'},
				     {'data':'address'},
				     {'data':'createtime'},
		]
	},
	
	// 初始化项目模块的数据
	init : function(){
		// Init province and city selects
		//$.initProv("#province","#city","-省份-","-城市-");
		
		// Bind search event
		$('#city').off('change.rainet').on('change.rainet', function(){
		});
		
		
		$('#province').off('change.rainet').on('change.rainet', function(){
		});
		
		var param  = {pageSize : 10, pageNow : 1}
		
		// Get list
		/*rainet.message.service.project.list(param, function(data){
			console.log(data);
		});*/
	},
	
	infoTempate : "<div>\n"+
		"<form class=\"form-horizontal\" role=\"form\">\n"+
			"<div class=\"form-group\">\n"+
    			"<label class=\"col-sm-3 control-label\">项目名称：</label>\n"+
    			"<div class=\"col-sm-9\">\n"+
    				"<input type=\"text\" class=\"form-control projectName\" name=\"name\"/>\n"+
    			"</div>\n"+
  			"</div>\n"+
  			"<div class=\"form-group\">\n"+
    			"<label class=\"col-sm-3 control-label\">负责单位：</label>\n"+
    			"<div class=\"col-sm-9\">\n"+
    				"<input type=\"text\"  class=\"form-control department\" name=\"department\"/>\n"+
    			"</div>\n"+
  			"</div>\n"+
  		"<div class=\"form-group\">\n"+
  		"<label class=\"col-sm-3 control-label\">项目地址：</label>\n"+
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
  			"<input type=\"hidden\" name=\"id\" class=\"id\"/>\n"+
  			 "<div class=\"modal-footer\">\n"+
					"<button data-bb-handler=\"cancel\" type=\"button\" class=\"btn btn-warning\">取消</button>\n"+
					"<button data-bb-handler=\"success\" type=\"submit\" class=\"btn btn-success\">修改</button>\n"+
			"</div>\n"+
		"</form>\n"+
	"</div>"
	
};

