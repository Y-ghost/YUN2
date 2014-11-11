;
"user strict";

var rainet = rainet || {};
rainet.message = rainet.message || {};
rainet.message.controller = rainet.message.controller || {}; 

// 节点信息
rainet.message.controller.node = {
	
	initProjectList : function(data){
		var length = data.length;
		$('#projectNameList').empty();
		$('#projectNameList').append('<option value=-1>-请选择项目-</option>');
		for (var i = 0; i < length; i++) {
			$('#projectNameList').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
		}
		$('#projectNameList').off('change.rainet').on('change.rainet', function(){
			if($datatable){
				var projectId = $('#projectNameList').val();
				$datatable.api().ajax.reload();
			}
		});
	},
	
	table : {
	  columns : [
		           	{ "sTitle":'', "targets": 0, "orderable": false, "render" : rainet.message.util.formateSeq },
		           	{ "sTitle": "节点名称",  "targets": 1, "render" : rainet.message.util.formateLink },
		           	{ "sTitle": "节点编号", "targets": 2 },
		           	{ "sTitle": "流量参数",  "targets": 3 },
		           	{ "sTitle": "所属项目名称", "targets": 4 },
		        	{ "sTitle": "创建时间",  "targets": 5, "render" : rainet.message.util.formateDate },
		           	{ "sTitle": "修改时间", "targets": 6, "render" : rainet.message.util.formateDate },
		           	{ "sTitle": "操作",   "targets": 7, "orderable": false, "data": null,
		    			"defaultContent": rainet.message.util.operaterHtml }
		],
		order : [5, 'desc'],
		
		dataRef : [
		           {'data':'id'},
		           {'data':'name'},
		           {'data':'code'},
		           {'data':'fowparameter'},
		           {'data':'project.name'},
		           {'data':'createtime'},
		           {'data':'modifytime'},
		],
		
		initEvent : function($datatable){
			/*rainet.message.service.project.getProjectNames(function(data){
				var length = data.length;
				$('#projectNameList').empty();
				$('#projectNameList').append('<option value=-1>-请选择项目-</option>');
				for (var i = 0; i < length; i++) {
					$('#projectNameList').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
				}
				$('#projectNameList').off('change.rainet').on('change.rainet', function(){
					if($datatable){
						var projectId = $('#projectNameList').val();
						$datatable.api().ajax.reload();
					}
				});
				rainet.message.util.setSearchForm('host');
			});*/
			
		},
		
		row : function(row, data, index){
			$(row).attr('id', data.id);
			$(row).attr('data-name', data.code);
		}
	},
	
	// 在共用table的js方法提交参数给后台之前，添加不同模块特有的参数信息
	updateParam : function(param){
		var projectId = $.trim($('#projectNameList').val());
		if (projectId != -1) {
			param.projectId = projectId;
		}
	},
	infoTemplate : "<div>\n"+
		"<form class=\"form-horizontal\" role=\"form\" style=\"padding-right:15px;\" onsubmit=\"return false;\">\n"+
			"<div class=\"form-group\">\n"+
				"<label class=\"col-sm-3 control-label\">所属项目：</label>\n"+
				"<div class=\"col-sm-9 selectItem\">\n"+
    				"<select class=\"form-control projectName\" name=\"projectid\"></select>\n"+
    			"</div>\n"+
    		"</div>\n"+
    		"<div class=\"form-group\">\n"+
    			"<label class=\"col-sm-3 control-label\">主机编号：</label>\n"+
    			"<div class=\"col-sm-9 selectItem\">\n"+
    				"<input type=\"text\" class=\"form-control code\" name=\"code\"/>\n"+
    				"<p class=\"help-block js-placehoder\">只允许8位数字</p>\n"+
    			"</div>\n"+
    		"</div>\n"+
  			"<input type=\"hidden\" name=\"id\" class=\"id\"/>\n"+
  			 "<div class=\"dialog-footer\">\n"+
				"<button data-bb-handler=\"cancel\" type=\"button\" class=\"btn btn-warning\">取消</button>\n"+
				"<button type=\"submit\" class=\"btn btn-success\">修改</button>\n"+
		     "</div>\n"+
		"</form>\n"+
	"</div>\n",
	
	
};

