"user strict";

var rainet = rainet || {};

rainet.utils = rainet.utils || {};

rainet.utils.formateDate = function (sTime, format) {
    var _this = new Date();

    if (!!sTime) {
        if (typeof sTime === 'string') {
            sTime = this.replaceAll(sTime, '-', '/');
        }
        _this = new Date(sTime);
    }

    var o = {
        "M+": _this.getMonth() + 1, //month
        "d+": _this.getDate(), //day
        "h+": _this.getHours(), //hour
        "m+": _this.getMinutes(), //minute
        "s+": _this.getSeconds(), //second
        "q+": Math.floor((_this.getMonth() + 3) / 3), //quarter
        "S": _this.getMilliseconds() //millisecond
    };

    if(!format) {
        format = "yyyy-MM-dd hh:mm:ss";
    }

    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

rainet.utils.serializeObject = function(array){
	var o = {};
    $.each(array, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

rainet.utils.notification = {
	success : function(text){
		noty({text : text, type : 'success', timeout : 1500});
	},
	error : function(text){
		noty({text : text, type : 'error', theme : 'bootstrapTheme', timeout : 1500});
	},
	warning : function(text){
		noty({text : text, type : 'warning', theme : 'bootstrapTheme', timeout : 1500});
	}
};

rainet.utils.busy = function(){
	var defaults = {
			template: "<div style=\"position:absolute;left:0;top:0;right:0;bottom:0;height: 100%;width:100%;opacity:.7;background-color:white;\" ng-show=\"display()\">\n"+
							"<div style=\"position:absolute;left:44.5%;top:37%;\">\n"+
							"<i class=\"fa fa-spinner fa-spin fa-lg\"></i><Label style=\"padding:0 5px;\"></Label>\n"+
							"</div>\n"+
						"</div>\n",
			message:'正在努力加载...'
	};
	
	var $template = undefined;
	
	var loading = function(text, $ele) {
		if (!$ele) {
			$ele = $('body');
		}
		var position = $ele.css('position');
		if (position === 'static' || position === '' || typeof position === 'undefined'){
			$ele.css('position','relative');
		}
		$template = $(defaults.template);
		$('label', $template).text(text || defaults.message);
		$ele.append($template);
	}
	
	var remove = function() {
		if ($template){
			$template.remove();
		}
	}
	
	return {
		loading : loading,
		remove : remove
	};
}();