;
"user strict";

var rainet = rainet || {};
rainet.message = rainet.message || {};
rainet.message.controller = rainet.message.controller || {}; 

// 项目信息
rainet.message.controller.node = {
	
  setData : function(datas) {
	  var result = '';
	  $.each(datas, function(i, item){
		  var eTemperature = "异常";
		  var eStatus = "异常";
		  if (item.equipmentStatus) {
			  eTemperature = item.equipmentStatus.temperature;
			  eStatus = item.equipmentStatus.status;
		  }
			var li = '<li style="padding-top:10px;padding-bottom:10px;">'+
				'<div class="detail" >'+
			'<div class="fl" style="width:80%;">'+
				'<label class="detail-item" style="font-size:16px;">'+item.name+'</label><br/>'+
				'<label>土壤湿度：</label><span>'+eTemperature+'</span>'+
				'<label>&nbsp;&nbsp;湿度值一：</label><span>80%</span><br/>'+
				'<label>阀门状态：</label><span>'+eStatus+'</span>'+
				'</div>'+
				'<div class="fr switch-js" style="height:75px;" id='+item.id+'>'+
					'<i class="fa fa-toggle-on  fa-3x" style="line-height:75px;"></i>'+
				'</div>'+
			'</div>'+
			'</li>';
			result +=li;
	 });
	 return result;
  },
  
  updateParam : function(param) {
	  var pId = $('#pId').val();
	  if (pId.trim()) {
		  param.pId = pId;
	  }
  },
  
  loadData : function(param, $ul, callback) {
	  var data = {param : param};
	  data.handleError = function(result) {
		  $('#pullDown').css('text-align', 'center');
			$('.pullDownLabel', '#pullDown').text(result.message);
			$('#pullDown').removeClass('pullDown');
			$('.pullDownLabel', '#pullDown').addClass('error_alert');
	  };
	  var that = this;
	  rainet.message.service.node.listByPid(data, function(result){
		  $('#pullDown').hide();
		  var lis = that.setData(result);
		  $ul.append(lis);
		  if (callback) {
			  callback();
		  };
		  rainet.event.click($('.switch-js', '#list'), function(self){
				alert($(self).attr('id'));
			});
		  
	  });
	  
  }
};

