;
"user strict";

var rainet = rainet || {};
rainet.setting = rainet.setting || {};

// 信息管理所用模块与后台交互的API的URL的配置
rainet.setting.url = {
		project : {
			url : rainet.settings.baseUrl + 'project/'
		},
		host : {
			url : rainet.settings.baseUrl + 'host/'
		},
		node : {
			url : rainet.settings.baseUrl + 'equipment/'
		}
};

// 设置管理所用模块与后台交互的API
rainet.setting.service = {
		
		project : {
			add: function(param, callback){
				rainet.ajax.execute({
					url : rainet.setting.url.project.url+"save/",
					$busyEle : $('.node-container'),
					data : JSON.stringify(param),
					method : 'POST',
					contentType : 'application/json; charset=utf-8',
					success : function(data){
						callback(data);
					}
				});
			},
			
			validName: function(param, callback){
				rainet.ajax.execute({
					url : rainet.setting.url.project.url + 'validation',
					method : 'GET',
					data : param,
					success : function(data){
						callback(data);
					}
				});
			},
			
			getProjectNames : function(callback){
				rainet.ajax.execute({
					url : rainet.setting.url.project.url + 'names',
					method : 'GET',
					success : function(data){
						callback(data);
					}
				});
			}
		},
		
		
		host : {
			add: function(param, callback){
				rainet.ajax.execute({
					url : rainet.setting.url.host.url,
					$busyEle : $('.node-container'),
					data : JSON.stringify(param),
					method : 'POST',
					contentType : 'application/json; charset=utf-8',
					success : function(data){
						callback(data);
					}
				});
			},
			validTime: function(param, callback){
				rainet.ajax.execute({
					url : rainet.setting.url.host.url+"validTime/",
					$busyEle : $('.node-container'),
					method : 'GET',
					data : JSON.stringify(param),
					success : function(data){
						callback(data);
					}
				});
			}
		},
		
		equipment : {
			searchEquipment: function(param, callback){
				rainet.ajax.execute({
					url : rainet.setting.url.node.url+"searchEquipment/",
					$busyEle : $('.EquipmentList'),
					data : param,
					method : 'GET',
					success : function(data){
						callback(data);
					}
				});
			},
			add: function(param, callback){
				rainet.ajax.execute({
					url : rainet.setting.url.node.url,
					$busyEle : $('.node-container'),
					data : JSON.stringify(param),
					method : 'POST',
					contentType : 'application/json; charset=utf-8',
					success : function(data){
						callback(data);
					}
				});
			},
			
			putData : function(param, callback){
				rainet.ajax.execute({
					url : rainet.setting.url.node.url+"putData/",
					$busyEle : $('.node-container'),
					data : param,
					method : 'POST',
					success : function(data){
						callback(data);
					}
				});
			}
		}
};
