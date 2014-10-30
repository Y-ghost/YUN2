"user strict";

var rainet = rainet || {};

rainet.ajax = {
		execute : function(options) {
			$.ajax({
				  beforeSend : function(){
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
					  var status = data.code;
					  if (status != '200') {
						  alert(data.message);
						  return ;
					  }
					  if (options.success) {
						  return options.success(data.data);
					  }
				  },
				  error: function(xhr, type){
					  alert("error");
					  return ;
				  }
				});
		}
};