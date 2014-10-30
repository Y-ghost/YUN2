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