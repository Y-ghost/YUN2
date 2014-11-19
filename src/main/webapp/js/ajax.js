"user strict";

var rainet = rainet || {};

rainet.ajax = {
		execute : function(options) {
			var $loginHtml = $(this.infoTempate).css('display','block');
			$.ajax({
				  beforeSend : function(){
					  rainet.utils.busy.remove();
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
						  // 自定义处理错误
						  if(status == 'A409'){
							  bootbox.dialog({
									message : $loginHtml,
									title : '欢迎登录',
									// 支持ESC
									onEscape : function(){
										
									}
								});
						  }
						  var isContinue = true;
						  if (options.customHandleError) {
							  // 如果返回false，说明不会用统一的错误处理
							  isContinue = options.customHandleError(data);
						  }
						  if (isContinue){
							  rainet.utils.notification.error(data.message);
						  }
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
		},
		infoTempate : "<div style=\"margin-top:20px;\">\n"+
		"<form class=\"form-horizontal\" role=\"form\">\n"+
			"<div class=\"form-group\">\n"+
    			"<label class=\"col-sm-3 control-label\">登录名/邮箱：</label>\n"+
    			"<div class=\"col-sm-8\">\n"+
    				"<input type=\"text\" class=\"form-control\" name=\"loginname\"/>\n"+
    			"</div>\n"+
  			"</div>\n"+
  			"<div class=\"form-group\">\n"+
    			"<label class=\"col-sm-3 control-label\">密码：</label>\n"+
    			"<div class=\"col-sm-8\">\n"+
    				"<input type=\"text\"  class=\"form-control\" name=\"password\"/>\n"+
    			"</div>\n"+
  			"</div>\n"+
  			"<div class=\"form-group\">\n"+
    			"<label class=\"col-sm-3 control-label\">验证码：</label>\n"+
    			"<div class=\"col-sm-3\">\n"+
    				"<input type=\"text\" class=\"form-control\" name=\"validNum\"/>\n"+
    			"</div>\n"+
    			"<div>\n"+
    				"<div class=\"control-label col-sm-2\" style=\"text-align:center;background-color:blue;color:white;font-size:20px;\">\n"+
    				"<label >1234</label>\n"+
    				"</div>\n"+
    				"<div class=\"control-label col-sm-3\" style=\"text-align:center;\">\n"+
    				"<a href=\"javascript:void(0);\">看不清，换一张</a>\n"+
    				"</div>\n"+
    			"</div>\n"+
    		"</div>\n"+
  			 "<div class=\"modal-footer\" style=\"margin-top:30px;\">\n"+
		  			 "<div class=\"col-sm-4 control-label\" style=\"text-align:center;\">" +
		  			 "<a href=\"findAccount\">忘记密码?</a>" +
		  			 "</div>" +
		  			 "<button data-bb-handler=\"success\" type=\"submit\" class=\"col-sm-4 btn btn-success\">登录</button>\n"+
		  			 "<div class=\"col-sm-4 control-label\" style=\"text-align:center;\">" +
		  			 "没有账号？<a href=\"register\">立即注册</a>" +
		  			 "</div>" +
			"</div>\n"+
		"</form>\n"+
	"</div>"
};