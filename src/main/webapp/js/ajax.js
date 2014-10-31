"user strict";

var rainet = rainet || {};

rainet.ajax = {
		execute : function(options) {
			$.ajax({
				  beforeSend : function(){
					  rainet.utils.busy.loading(options.busyMsg, options.$busyEle);
					  if (options.beforeSend) {
						  options.beforeSend();
					  }
				  },
				  async : options.async || true,
				  type: options.method || 'GET',
				  url: options.url,
				  // data to be added to query string:
				  data: options.data,
				  // type of data we are expecting in return:
				  contentType : options.contentType,
				  dataType: options.dataType || 'json',
				  success: function(data){
					  rainet.utils.busy.remove();
					  var status = data.code;
					  if (status != '200') {
						  rainet.utils.notification.error(data.message);
						  return ;
					  }
					  if (options.success) {
						  return options.success(data.data);
					  }
				  },
				  error: function(xhr, type){
					  rainet.utils.busy.remove();
					  rainet.utils.notification.error('服务异常');
					  return ;
				  }
				});
		}
};