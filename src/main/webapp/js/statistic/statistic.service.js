;
"user strict";

var rainet = rainet || {};
rainet.statistic = rainet.statistic || {};

// 信息管理所用模块与后台交互的API的URL的配置
rainet.statistic.url = {
		project : {
			url : rainet.settings.baseUrl + 'project/'
		},
		node : {
			url : rainet.settings.baseUrl + 'equipment/'
		},
		statistic : {
			url : rainet.settings.baseUrl + 'statistic/'
		}
};

// 设置管理所用模块与后台交互的API
rainet.statistic.service = {
		
		project : {
			list : function(param, callback) {
				rainet.ajax.execute({
					url : rainet.statistic.url.project.url,
					data : param,
					$busyEle : $('#projectList'),
					success : function(data) {
						callback(data);
					}
				});
			}
		},
		equipment : {
			list : function(param, callback) {
				rainet.ajax.execute({
					url : rainet.statistic.url.node.url+"selectEquipments/",
					$busyEle : $('.equipment-container'),
					data : param,
					method : 'GET',
					success : function(data) {
						callback(data);
					}
				});
			}
		},
		statistic : {
			waterList : function(param, callback) {
				rainet.ajax.execute({
					url : rainet.statistic.url.statistic.url+"waterList/",
					$busyEle : $('.equipment-container'),
					data : param,
					method : 'GET',
					success : function(data) {
						callback(data);
					}
				});
			},
			humidityList : function(param, callback) {
				rainet.ajax.execute({
					url : rainet.statistic.url.statistic.url+"humidityList/",
					$busyEle : $('.equipment-container'),
					data : param,
					method : 'GET',
					success : function(data) {
						callback(data);
					}
				});
			}
		}
};
