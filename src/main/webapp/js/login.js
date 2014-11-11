;
"user strict";

var rainet = rainet || {};
rainet.login = rainet.login || {};
rainet.login.view = function() {
		var init = function(){
			rainet.login.controller.register();
		};

		return {
			init : init
		};

}();


rainet.login.controller = {
		// 添加校验信息 当保存或修改project的时候
		setValidateForUser : function($form){
			$form.bootstrapValidator({
				feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
				fields : {
					loginname : {
						validators : {
							notEmpty : {
								message: '登录名不能为空!'
							}
						}
					},
					password : {
						validators : {
							notEmpty : {
								message: '密码不能为空!'
							},
		                    stringLength: {
		                        min: 6,
		                        max: 30,
		                        message: 'The username must be more than 6 and less than 30 characters long'
		                    },
		                    regexp: {
		                        regexp: /^[^1]+$/i,
		                        message: '密码不能为空,用于找回密码!'
		                    }
						}
					},
					email : {
						validators : {
							regexp: {
		                        regexp: /^[^1]+$/i,
		                        message: '邮箱不能为空,用于找回密码!'
		                    }
						}
					},
//					serviceAgreement : {
//						validators : {
//							regexp: {
//								regexp: /^[^1]+$/i,
//								message: '邮箱不能为空,用于找回密码!'
//							}
//						}
//					}
				}
			}).on('blur', '#loginname', function(){
				// 验证项目名称是否存在
				var bv = $form.data('bootstrapValidator');
				$field = bv.getFieldElements('loginname');
				var value = $field.val();
				if ($.trim(value) === '') {
					bv.updateMessage($field, 'notEmpty');
					return ;
				}
				var data = {loginname : value};
				rainet.login.service["User"].validLoginName(data, function(data){
					if (data) {
						// 存在，更新错误信息的提示
						bv.updateMessage($field, 'notEmpty', '登录名称已存在!');
						bv.updateStatus($field, 'INVALID');
					}
				});
			});
			
			$form.data('bootstrapValidator').disableSubmitButtons(true);
		},
		register : function(){
			var $form = $(".form-signin");
				$('button[type=submit]',$form).off('click').on('click', function(){
					alert("ss");
					// 检查验证是否通过
					var bv = $form.data('bootstrapValidator');
					if (bv.$invalidFields.length > 0) {
						return false;
					}
					var formData = $form.serializeArray();
					var jsonData = rainet.utils.serializeObject(formData);
					// 更新项目
//					rainet.login.service["User"].register(jsonData, function(data){
//						if (data) {
//							rainet.utils.notification.success('注册成功,马上跳转!');
//							//
//						}
//					});
				});
				// Add validation
				this.setValidateForUser($form);
		}
};

rainet.login.url = {
	User : {
		url : rainet.settings.baseUrl + 'User/'
	}
};


rainet.login.service = {
	User : {
		login : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.login.url.User.url+"login/",
				data : param,
				$busyEle : $('.container'),
				method : 'GET',
				success : function(data) {
					callback(data);
				}
			});
		},
		register : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.login.url.User.url+"register/",
				data : param,
				$busyEle : $('.container'),
				method : 'POST',
				success : function(data) {
					callback(data);
				}
			});
		},
		sendEmail : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.login.url.User.url+"sendEmail/",
				data : param,
				$busyEle : $('#passport-title'),
				method : 'GET',
				success : function(data) {
					callback(data);
				}
			});
		},
		modifyPassword : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.login.url.User.url+"modifyPassword/",
				data : param,
				$busyEle : $('#passport-title'),
				method : 'GET',
				success : function(data) {
					callback(data);
				}
			});
		},
		validLoginName : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.login.url.User.url+"validLoginName/",
				data : param,
				$busyEle : $('#passport-title'),
				method : 'GET',
				success : function(data) {
					callback(data);
				}
			});
		}
	}
};

$(document).ready(function() {
	var myDate = new Date();
	$(".copyYear").html(myDate.getFullYear());
	rainet.login.view.init();
});



