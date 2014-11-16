;
"user strict";

var rainet = rainet || {};
rainet.findAccount = rainet.findAccount || {};
rainet.findAccount.controller = rainet.findAccount.controller || {};
rainet.findAccount.view = function() {
		var init = function(){
			var pageType = $("#pageType").val();
			rainet.findAccount.controller[pageType].send();
		};

		return {
			init : init
		};

}();


rainet.findAccount.controller.findAccount = {
		// 添加校验信息 找回用户的时候
		setValidate : function($form){
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
					validNum : {
						validators : {
							notEmpty : {
								message: '验证码不能为空!'
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
				var param = {loginname : value};
				rainet.findAccount.service["User"].validLoginName(param, function(data){
					if (data) {
						// 存在，更新错误信息的提示
						bv.updateMessage($field, 'notEmpty', '登录名称不存在!');
						bv.updateStatus($field, 'INVALID');
					}
				});
			}).on('blur', '#validNum', function(){
				// 验证项目名称是否存在
				var bv = $form.data('bootstrapValidator');
				$field = bv.getFieldElements('validNum');
				var value = $field.val();
				if ($.trim(value) === '') {
					bv.updateMessage($field, 'notEmpty');
					return ;
				}
				if(value!="1111"){
					
					bv.updateMessage($field, 'notEmpty', '验证码输入不正确，请重新输入!');
					bv.updateStatus($field, 'INVALID');
				}
			});
			
			$form.data('bootstrapValidator').disableSubmitButtons(true);
		},
		send : function(){
				var $form = $("#form");
				$('button[type=submit]',$form).off('click').on('click', function(){
					// 检查验证是否通过
					var bv = $form.data('bootstrapValidator');
					$field = bv.getFieldElements('loginname');
					var value = $field.val();
		        	if (bv.$invalidFields.length > 0) {
		        		return false;
		        	}
		        	var param ={loginname:value};
		        	//注册用户
		        	rainet.findAccount.service["User"].sendEmail(param, function(data){
						if (data) {
							redirect(data,"findAccount");
						}else{
							return false;
						}
					});
				});
				// Add validation
				this.setValidate($form);
		}
};

rainet.findAccount.controller.modifyPassword = {
		// 添加校验信息 修改密码的时候
		setValidate : function($form){
			$form.bootstrapValidator({
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields : {
					newPassword : {
						validators : {
							notEmpty : {
								message: '新密码不能为空!'
							},
							stringLength: {
								min: 6,
								max: 30,
								message: '密码长度为6~30!'
							}
						}
					},
					rePassword : {
						validators : {
							notEmpty : {
								message: '确认密码不能为空!'
							},
							stringLength: {
								min: 6,
								max: 30,
								message: '密码长度为6~30!'
							}
						}
					}
				}
			}).on('blur', '#rePassword', function(){
				// 验证两次输入的密码是否一致
				var bv = $form.data('bootstrapValidator');
				var password = bv.getFieldElements('newPassword').val();
				$field = bv.getFieldElements('rePassword');
				var rePassword = $field.val();
				
				if (bv.$invalidFields.length > 0) {
					return false;
				}
				
				if (password != rePassword) {
					// 存在，更新错误信息的提示
					bv.updateMessage($field, 'notEmpty', '两次输入的密码不一致!');
					bv.updateMessage($field, 'stringLength', '');
					bv.updateStatus($field, 'INVALID');
				}
			});
			
			$form.data('bootstrapValidator').disableSubmitButtons(true);
		},
		send : function(){
			var $form = $("#form");
			$('button[type=submit]',$form).off('click').on('click', function(){
				// 检查验证是否通过
				var bv = $form.data('bootstrapValidator');
				var userId = $('#userId').val();
				var password = bv.getFieldElements('newPassword').val();
				
				if (bv.$invalidFields.length > 0) {
					return false;
				}
				var param ={userId:userId,password:password};
				//注册用户
				rainet.findAccount.service["User"].modifyPassword(param, function(data){
					if (data) {
						redirect(data,"modifyPassword");
					}else{
						return false;
					}
				});
			});
			// Add validation
			this.setValidate($form);
		}
};

//注册成功跳转
var redirect = function(data,methodType){
	if(methodType=="findAccount"){
		location.href=rainet.settings.baseUrl+'indexs/modifyPassword';
	}else if(methodType=="modifyPassword"){
		location.href=rainet.settings.baseUrl+'indexs/modifyPasswordFinish';
	}
}


rainet.findAccount.url = {
	User : {
		url : rainet.settings.baseUrl + 'User/'
	}
};


rainet.findAccount.service = {
	User : {
		sendEmail : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.findAccount.url.User.url+"sendEmail/",
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
				url : rainet.findAccount.url.User.url+"modifyPassword/",
				data : param,
				$busyEle : $('#passport-title'),
				method : 'POST',
				success : function(data) {
					callback(data);
				}
			});
		},
		validLoginName : function(param, callback) {
			rainet.ajax.execute({
				url : rainet.findAccount.url.User.url+"validLoginName/",
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
	$("#exist").css("display","none");
	//添加底部年限
	var myDate = new Date();
	$(".copyYear").html(myDate.getFullYear());
	rainet.findAccount.view.init();
});



