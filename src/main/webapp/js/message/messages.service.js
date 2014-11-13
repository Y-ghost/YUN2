;
"user strict";

var rainet = rainet || {};
rainet.message = rainet.message || {};

// 信息管理所用模块与后台交互的API的URL的配置
rainet.message.url = {
		project : {
			url : rainet.settings.baseUrl + 'project/'
		},
		host : {
			url : rainet.settings.baseUrl + 'host/'
		},
		node : {
			url : rainet.settings.baseUrl + 'equipment/'
		},
		
		systemLog : {
			url : rainet.settings.baseUrl + 'message/'
		}
};

// 信息管理所用模块与后台交互的API
rainet.message.service = {
		
		project : {
			get: function(projectId, callback){
				rainet.ajax.execute({
					url : rainet.message.url.project.url + projectId,
					$busyEle : $('#tableContainer'),
					success : function(data){
						callback(data);
					}
				});
			},
			list : function(param, callback){
				rainet.ajax.execute({
					url : rainet.message.url.project.url,
					data : param,
					$busyEle : $('#tableContainer'),
					success : function(data){
						callback(data);
					}
				});
			},
			
			update: function(project, callback){
				rainet.ajax.execute({
					url : rainet.message.url.project.url,
					$busyEle : $('#tableContainer'),
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
					$busyEle : $('#tableContainer'),
					method : 'DELETE',
					success : function(data){
						callback(data);
					}
				});
			},
			
			validName: function(data, callback){
				rainet.ajax.execute({
					url : rainet.message.url.project.url + 'validation',
					method : 'GET',
					data : {
						projectName : data.name,
						projectId : data.id
					},
					success : function(data){
						callback(data);
					}
				});
			},
			
			getProjectNames : function(callback){
				rainet.ajax.execute({
					url : rainet.message.url.project.url + 'names',
					method : 'GET',
					success : function(data){
						callback(data);
					}
				});
			}
		},
		
		
		host : {
			get: function(projectId, callback){
				rainet.ajax.execute({
					url : rainet.message.url.host.url + projectId,
					$busyEle : $('#tableContainer'),
					success : function(data){
						callback(data);
					}
				});
			},
			
			list : function(param, callback){
				rainet.ajax.execute({
					url : rainet.message.url.host.url,
					data : param,
					$busyEle : $('#tableContainer'),
					success : function(data){
						callback(data);
					}
				});
			},
			
			update: function(config, callback){
				rainet.ajax.execute({
					url : rainet.message.url.host.url,
					$busyEle : $('#tableContainer'),
					method : 'PUT',
					customHandleError : function(result){
						if (config.handleError){
							return config.handleError(result);
						}
						return true;
					},
					data : JSON.stringify(config.jsonData),
					contentType : 'application/json; charset=utf-8',
					success : function(data){
						callback(data);
					}
				});
			},
			
			del: function(projectId, callback){
				rainet.ajax.execute({
					url : rainet.message.url.host.url + projectId,
					$busyEle : $('#tableContainer'),
					method : 'DELETE',
					success : function(data){
						callback(data);
					}
				});
			},
			
			validCode: function(data, callback){
				rainet.ajax.execute({
					url : rainet.message.url.host.url + 'validation',
					method : 'GET',
					customHandleError : function(result){
						if (data.handleError){
							return data.handleError(result);
						}
						return true;
					},
					data : {
						hostCode : data.hostCode,
						hostId : data.hostId || 0,
						projectId : data.projectId || 0
					},
					success : function(data){
						callback(data);
					}
				});
			},
		},
		
		node : {
			get: function(nodeId, callback){
				rainet.ajax.execute({
					url : rainet.message.url.node.url + nodeId,
					$busyEle : $('#tableContainer'),
					success : function(data){
						callback(data);
					}
				});
			},
			
			list : function(param, callback){
				rainet.ajax.execute({
					url : rainet.message.url.node.url,
					data : param,
					$busyEle : $('#tableContainer'),
					success : function(data){
						callback(data);
					}
				});
			},
			
			update: function(config, callback){
				rainet.ajax.execute({
					url : rainet.message.url.node.url,
					$busyEle : $('#tableContainer'),
					method : 'PUT',
					customHandleError : function(result){
						if (config.handleError){
							return config.handleError(result);
						}
						return true;
					},
					data : JSON.stringify(config.jsonData),
					contentType : 'application/json; charset=utf-8',
					success : function(data){
						callback(data);
					}
				});
			},
			
			del: function(nodeId, callback){
				rainet.ajax.execute({
					url : rainet.message.url.node.url + nodeId,
					$busyEle : $('#tableContainer'),
					method : 'DELETE',
					success : function(data){
						callback(data);
					}
				});
			},
			
			
		},
		
		systemLog : {
			get: function(logId, callback){
				rainet.ajax.execute({
					url : rainet.message.url.systemLog.url + logId,
					$busyEle : $('#tableContainer'),
					success : function(data){
						callback(data);
					}
				});
			},
			
			list : function(param, callback){
				rainet.ajax.execute({
					url : rainet.message.url.systemLog.url,
					data : param,
					$busyEle : $('#tableContainer'),
					success : function(data){
						callback(data);
					}
				});
			},
			
			markLogRead: function(config, callback){
				rainet.ajax.execute({
					url : rainet.message.url.systemLog.url + config.logId,
					$busyEle : $('#tableContainer'),
					method : 'PUT',
					customHandleError : function(result){
						if (config.handleError){
							return config.handleError(result);
						}
						return true;
					},
					success : function(data){
						callback(data);
					}
				});
			},
			
			
		}
		
		
};
