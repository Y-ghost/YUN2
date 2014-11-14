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
		                        message: '密码长度为6~30!'
		                    }
						}
					},
					email : {
						validators : {
							notEmpty : {
								message: '邮箱不能为空,用于找回密码!'
							},
							regexp: {
		                        regexp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		                        message: '邮箱格式不正确!'
		                    }
						}
					}
					,
					serviceAgreement : {
						validators : {
							notEmpty : {
								message: '请选择接受用户服务协议!'
							}
						}
					}
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
					if (!data) {
						// 存在，更新错误信息的提示
						bv.updateMessage($field, 'notEmpty', '登录名称已存在!');
						bv.updateStatus($field, 'INVALID');
					}
				});
			}).on('blur', '#email', function(){
				// 验证项目名称是否存在
				var bv = $form.data('bootstrapValidator');
				$field = bv.getFieldElements('email');
				var value = $field.val();
				if ($.trim(value) === '') {
					bv.updateMessage($field, 'notEmpty');
					return ;
				}
				var data = {loginname : value};
				rainet.login.service["User"].validLoginName(data, function(data){
					if (!data) {
						// 存在，更新错误信息的提示
						bv.updateMessage($field, 'notEmpty', '邮箱已注册，您可以使用该邮箱登录，也可以换一个邮箱重新注册!');
						bv.updateMessage($field, 'regexp', '');
						bv.updateStatus($field, 'INVALID');
					}
				});
			});
			
			$form.data('bootstrapValidator').disableSubmitButtons(true);
		},
		register : function(){
			var $form = $(".form-signin");
				$('button[type=submit]',$form).off('click').on('click', function(){
					if($("#serviceAgreement").is(':checked')){
						// 检查验证是否通过
						var bv = $form.data('bootstrapValidator');
						if (bv.$invalidFields.length > 0) {
							return false;
						}
						var formData = $form.serializeArray();
						var jsonData = rainet.utils.serializeObject(formData);
						//注册用户
						rainet.login.service["User"].register(jsonData, function(data){
							if (data) {
								redirect(data);
							}else{
								return false;
							}
						});
					}else{
						alert("请选择接受用户服务协议!");
						return false;
					}
				});
				// Add validation
				this.setValidateForUser($form);
		},
		login : function(){
			var $form = $(".form-signin");
				$('button[type=submit]',$form).off('click').on('click', function(){
					if($("#serviceAgreement").is(':checked')){
						// 检查验证是否通过
						var bv = $form.data('bootstrapValidator');
						if (bv.$invalidFields.length > 0) {
							return false;
						}
						var formData = $form.serializeArray();
						var jsonData = rainet.utils.serializeObject(formData);
						//注册用户
						rainet.login.service["User"].register(jsonData, function(data){
							if (data) {
								redirect(data,"register");
							}else{
								return false;
							}
						});
					}else{
						alert("请选择接受用户服务协议!");
						return false;
					}
				});
				// Add validation
				this.setValidateForUser($form);
		}
};

//注册成功跳转
var redirect = function(data,type){
	if(type="register"){
		location.href=rainet.settings.baseUrl+'indexs/login';
	}else if(type="login"){
		location.href=rainet.settings.baseUrl+'indexs/index';
	}
}


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
				data : JSON.stringify(param),
				$busyEle : $('#form'),
				method : 'PUT',
				contentType : 'application/json; charset=utf-8',
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
				method : 'POST',
				contentType : 'application/json; charset=utf-8',
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
	//隐藏退出按钮
	$(".fa-power-off").css("display","none");
	//添加底部年限
	var myDate = new Date();
	$(".copyYear").html(myDate.getFullYear());
	rainet.login.view.init();
});



