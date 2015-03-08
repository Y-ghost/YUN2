;
"user strict";

var rainet = rainet || {};
rainet.message = rainet.message || {};
rainet.message.controller = rainet.message.controller || {}; 

// 项目信息
rainet.message.controller.node = {
	
  setData : function(datas) {
	  var result = '';
	  $.each(datas, function(i, data){
			var li = '<li><a class="detail-item">'+data.name+'</a><i class="pull-right fa fa-angle-down"></i><div class="detail" style="display:none;">'+
			'<div><label>节点编号:</label><div class="detail-item-c">'+data.code+'</div></div>'+
		     '<div><label>流量参数:</label><div class="detail-item-c">'+data.fowparameter+'</div></div>'+
		     '<div><label>所属项目名称:</label><div class="detail-item-c">'+data.project.name+'</div></div>'+
		     '<div><label>创建时间:</label><div class="detail-item-c">'+rainet.message.util.formateDate(data.createtime)+'</div></div>'+
		     '<div><label>修改时间:</label><div class="detail-item-c">'+rainet.message.util.formateDate(data.modifytime)+'</div></div>'+
		     '</div></li>';
			result +=li;
	 });
	 return result;
  }
};

