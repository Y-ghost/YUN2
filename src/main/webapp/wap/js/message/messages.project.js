;
"user strict";

var rainet = rainet || {};
rainet.message = rainet.message || {};
rainet.message.controller = rainet.message.controller || {}; 

// 项目信息
rainet.message.controller.project = {
	
  setData : function(datas) {
	  var result = '';
	  $.each(datas, function(i, data){
			var li = '<li><a class="detail-item">'+data.name+'</a><i class="pull-right fa fa-angle-down"></i><div class="detail" style="display:none;">'+
			'<div><label>项目单位:</label><div class="detail-item-c">'+data.department+'</div></div><div><label>项目地址:</label><div class="detail-item-c">'+data.address+'</div></div>'+
		     '<div><label>创建时间:</label><div class="detail-item-c">'+rainet.message.util.formateDate(data.createtime)+'</div></div></div></li>';
			result +=li;
	 });
	 return result;
  }
};

