;
"user strict";

var rainet = rainet || {};
rainet.message = rainet.message || {};
rainet.message.view = function(){
	var defaultView = 'project';
	var $golabDataTable = null;
	
	var operaterHtml = "<button class=\"btn btn-info edit\" style=\"margin-right: 5px;\" title=\"编辑\"><i class=\"fa fa-pencil-square-o\"></i></button>"+
						"<button class=\"btn btn-danger delete\" title=\"删除\"><i class=\"fa fa-trash-o\"></i></button>";
	var formateSeq = function(data, type, full, meta){
		var pageInfo = meta.settings.oInstance.fnPagingInfo();
		var pageNow = pageInfo.iPage + 1;
		var pageSize = pageInfo.iLength;
		var index = (pageNow - 1) * pageSize + meta.row + 1;
		return index;
	}
	
	var formateLink = function(data, type, full, meta){
		return "<a class='detail' href='javascipt:;' data-id="+full.id+">"+data+"</a>";
	}
	var formateDate = function(data){
		return rainet.utils.formateDate(data);
	}
	
	var setProjectInfo = function(data, readonly){
		var $projectHtml = $('#projectInfo').clone().attr('id', 'projectInfo1').css('display','block');
		$('.projectName',$projectHtml).val(data.name);
		$('.department',$projectHtml).val(data.department);
		$('.address',$projectHtml).val(data.address);
		$.initProv($('.provinceItem',$projectHtml), $('.cityItem',$projectHtml), "-省份-", "-城市-");
		$(".provinceItem", $projectHtml).val(data.province);
		$.initCities($(".provinceItem", $projectHtml),$(".cityItem", $projectHtml));
		$(".cityItem", $projectHtml).val(data.city);
		$(".id", $projectHtml).val(data.id);
		
		var buttons = {
				cancel: {
				      label: "取消",
				      className: "btn-warning",
				}
		};
		if (readonly) {
			$("input", $projectHtml).attr('disabled', true);
			$("select", $projectHtml).attr('disabled', true);
		}
		if (!readonly) {
			buttons.success = {label : '修改', className : 'btn-success', callback : function(){
				console.log($("form", $projectHtml).serialize);
				var formData = $("form", $projectHtml).serializeArray();
				var jsonData = rainet.utils.serializeObject(formData);
				rainet.message.service.update(jsonData, function(data){
					if (data) {
						// Add notification
						$golabDataTable.api().ajax.reload();
					}
				});
			}};
		}
		bootbox.dialog({
			message : $projectHtml,
			title : '项目信息',
			buttons : buttons
		});
	}
	
	var tableConfig = {
			// Project
			project : {
				columns : [
				           	{ "targets": 0, "orderable": false, "render" : formateSeq},
				           	{ "sTitle": "项目名称",  "targets": 1, "render" : formateLink},
				           	{ "sTitle": "项目单位", "targets": 2 },
				           	{ "sTitle": "项目地址",  "targets": 3 },
				           	{ "sTitle": "创建时间",    "targets": 4, "render" :formateDate},
				           	{ "sTitle": "操作",    "targets": 5, "orderable": false, "data": null,
				    			"defaultContent": operaterHtml }
				],
				order : [4, 'desc'],
				
				dataRef : [
				             {'data':'id'},
						     {'data':'name'},
						     {'data':'department'},
						     {'data':'address'},
						     {'data':'createtime'},
				],
				
				initEvent : function($datatable){
					// Init province and city selects
					$.initProv("#province","#city","-省份-","-城市-");
					
					// Bind search event
					$('#city').off('change').on('change', function(){
						if($datatable){
							var city = $('#city').val();
							var province = $('#province').val();
							if ($.trim(province) != -1 && $.trim(city) == -1) {
								return ;
							}
							$datatable.api().ajax.reload();
						}
					});
				},
				detail : function(self){
					var projectId = $(self).attr('data-id');
					rainet.message.service.get(projectId, function(data){
						setProjectInfo(data, true);
					});
				},
				edit : function(self){
					var projectId = $(self).parent().parent().attr('id');
					rainet.message.service.get(projectId, function(data){
						setProjectInfo(data);
					});
				},
				
				del : function(self){
					var projectId = $(self).parent().parent().attr('id');
					var projectName = $(self).parent().parent().attr('data-name');
					bootbox.dialog({
						message : "确认删除此项目？",
						title : '删除项目"'+projectName+'"',
						buttons :  {
							cancel: {
							      label: "取消",
							      className: "btn-warning",
							},
							success: {
							      label: "确定",
							      className: "btn-success",
							      callback : function(){
							    	  rainet.message.service.del(projectId, function(data){
							    		// Add notification
										$golabDataTable.api().ajax.reload();
							    	  });
							      }
							}
					}
					});
				},
				
				updateParam : function(param){
					var city = $.trim($('#city').val());
					if (city != -1) {
						param.city = city;
						param.province = $.trim($('#province').val());
					}
				}
				
			},
			
			// HOST
			host : {
				columns : [
				           	{ "targets": 0, "orderable": false, "render" : formateSeq },
				           	{ "sTitle": "主机编号",  "targets": 1, "render" : formateLink },
				           	{ "sTitle": "所属项目名称", "targets": 2 },
				           	{ "sTitle": "创建时间",  "targets": 3, "render" :formateDate },
				           	{ "sTitle": "修改时间",    "targets": 4, "render" :formateDate },
				           	{ "sTitle": "操作",    "targets": 5, "orderable": false, "data": null,
				    			"defaultContent": operaterHtml }
				],
				order : [3, 'desc'],
				
				dataRef : [],
				
				initEvent : function($datatable){
					
				},
				updateParam : function(param){
					
				}
				
			}
	}
	
	
	var handlMenuView = function(currentEle){
		var $ele = $(currentEle);
		$ele.siblings().removeClass('active');
		$ele.addClass('active');
		
		var module = $ele.attr('data-name');
		setView(module);
	}
	
	var setView = function(module){
		$golabDataTable = $('#table').dataTable({
			processing: true,
	        serverSide: true,
			autoWidth: false,
			destroy: true,
			info : true,
			searching : false,
			pageLength : 10,
			language : {
				infoEmpty : '',
				zeroRecords: "<div class='text-center'>无数据</div>",
				info : ' 共_TOTAL_条 ',
				paginate: {
			        next:       "下一页",
			        previous:   "上一页"
			    }
			},
			createdRow : function(row, data, index){
				$(row).attr('id', data.id);
				$(row).attr('data-name', data.name);
			},
			dom : 'tip',
			order: tableConfig[module].order,
			columnDefs: tableConfig[module].columns,
			ajax : function(data, callback, settings){
				// Get Paging
				var pageNow = settings.oInstance.fnPagingInfo().iPage;
				if (pageNow == 0) {
					pageNow = 1;
				} else {
					pageNow +=1;
				}
				// Get order
				var orderObj = data.order[0];
				var orderColumn = data.columns[orderObj.column].data;
				var orderDir = orderObj.dir;
				
				var criteria = {
						sortField : orderColumn,
						sortDirection  : orderDir
				};
				
				//Update criteria
				tableConfig[module].updateParam(criteria)
				
				var param  = {pageSize : 10, pageNow : pageNow}
				
				
				if (criteria.sortField) {
					param.criteria = JSON.stringify(criteria);
				}
				// Get list project
				rainet.message.service.list(param, function(data){
					var result = {};
					result.draw = data.pageNum;
					settings.iDraw = data.pageNum;
					result.recordsTotal = data.total;
					result.recordsFiltered = data.total;
					result.data = data.result;
					callback(result);
					bindEventForTable(tableConfig[module]);
				});
			},
			columns : tableConfig[module].dataRef
		});
		
		tableConfig[module].initEvent($golabDataTable);
	}
	
	var bindEventForTable = function(fnConfg){
		$('.edit', '#table').off('click').on('click', function(){
			fnConfg.edit(this);
		});
		
		$('.delete', '#table').off('click').on('click', function(){
			fnConfg.del(this);
		});
		
		$('.detail', '#table').off('click').on('click', function(){
			fnConfg.detail(this);
		});
		
	}
	
	var bindEvent = function(){
		$('.list-group-item').off('click').on('click', function(){
			handlMenuView(this);
		});
	};
	
	var init = function(){
		bindEvent();
		setView(defaultView);
	}
	
	return {
		init : init
	};
	
}();

rainet.message.url = {
		project : {
			url : rainet.settings.baseUrl + 'project/'
		}
};

rainet.message.service = {
		get: function(projectId, callback){
			rainet.ajax.execute({
				url : rainet.message.url.project.url + projectId,
				success : function(data){
					callback(data);
				}
			});
		},
		list : function(param, callback){
			rainet.ajax.execute({
				url : rainet.message.url.project.url,
				data : param,
				success : function(data){
					callback(data);
				}
			});
		},
		
		update: function(project, callback){
			rainet.ajax.execute({
				url : rainet.message.url.project.url,
				method : 'PUT',
				data : JSON.stringify(project),
				contentType : 'application/json; charset=utf-8',
				success : function(data){
					callback(data);
				}
			});
		},
		
		del: function(projectId, callback){
			rainet.ajax.execute({
				url : rainet.message.url.project.url + projectId,
				method : 'DELETE',
				success : function(data){
					callback(data);
				}
			});
		},
		
};

$(document).ready(function(){
	rainet.message.view.init();
});
