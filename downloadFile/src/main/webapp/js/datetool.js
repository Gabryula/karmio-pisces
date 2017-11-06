/*!author wangyu
 *version 1.0
 *describe:contains some useful date function
 */
(function($){
	$.formatdate = function(date,pattern){
		var o = {
			"y+": date.getFullYear(),  //年
    	"M+": date.getMonth() + 1, //月份 
    	"d+": date.getDate(), //日 
    	"h+": date.getHours(), //小时 
    	"m+": date.getMinutes(), //分 
    	"s+": date.getSeconds(), //秒 
    	"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    	"S": date.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(pattern)){
			pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(pattern)){
				pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return pattern;
	};
	$.transformStringToDate = function(dateText) {
		//格式2012-11-11 13:05:22
		var date = new Date(Date.parse(dateText.replace(/-/g,"/")));
		return date;
	}
	$.ignoreMillseconds = function(date) {
		return new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),0);
	}
	$.getBeginningOfDate = function(date){
		date = $.ignoreMillseconds(date);
		return new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0);
	};
	$.getEndOfDate = function(date){
		date = $.ignoreMillseconds(date);
		return new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,0,0,-1);
	};
	//以月为单位，如果该周跨越当前月与上个月份，则返回该月的第一天
	$.getBeginningOfWeek = function(date){
		date = $.ignoreMillseconds(date);
		var beginOfMonth = new Date(date.getFullYear(),date.getMonth(),1,0,0,0,0);
		if (date == beginOfMonth) {
			var minusDay = date.getDay() == 0 ? 7 : date.getDay();
			var beginOfWeek = new Date(date.getFullYear(),date.getMonth(),date.getDate()-minusDay + 1,0,0,0);
			return beginOfWeek;
		} else {
			var minusDay = date.getDay() == 0 ? 7 : date.getDay();
			var beginOfWeek = new Date(date.getFullYear(),date.getMonth(),date.getDate()-minusDay + 1,0,0,0);
			if (beginOfWeek.getMonth() < date.getMonth()) {
				return new Date(date.getFullYear(),date.getMonth(),1,0,0,0);
			} else {
				return beginOfWeek;
			}
		}
	};
	//以月为单位，如果该周跨越当前月与下个月份，则返回该月的最后一天
	$.getEndOfWeek = function(date){
		date = $.ignoreMillseconds(date);
		var nextWeek = new Date(date.getFullYear(),date.getMonth(),date.getDate()+7,date.getHours(),date.getMinutes(),date.getSeconds());
		if (nextWeek.getMonth() > date.getMonth()){
			return new Date(date.getFullYear(),date.getMonth()+1,1,0,0,0,-1);
		}else{
			var dayValue = (date.getDay() == 0 ? 7 : date.getDay());
			var plusDay = 7 - dayValue;
			return new Date(date.getFullYear(),date.getMonth(),date.getDate() + plusDay + 1,0,0,-1); 
		}
	};
	$.getBeginningOfMonth = function(date){
		date = $.ignoreMillseconds(date);
		return new Date(date.getFullYear(),date.getMonth(),1,0,0,0);
	};
	$.getEndOfMonth = function(date){
		date = $.ignoreMillseconds(date);
		return new Date(date.getFullYear(),date.getMonth()+1,1,0,0,-1);
	}
	//由于java默认用CST，而CST在js中会被判定位美国中部时间，相差十四个小时
	$.transformCSTToGMT = function(date){
		date = $.ignoreMillseconds(date);
		//与js默认的美国中部时间CST的时区差
		var offset = (date.getTimezoneOffset()-6*60)/60;
		return new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours()+offset,date.getMinutes(),date.getSeconds());
	}
	$.getPrevDate = function(date) {
		date = $.ignoreMillseconds(date);
		return new Date(date.getFullYear(),date.getMonth(),date.getDate()-1,date.getHours(),date.getMinutes(),date.getSeconds());
	}
	$.getNextDate = function(date) {
		date = $.ignoreMillseconds(date);
		return new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,date.getHours(),date.getMinutes(),date.getSeconds());
	}

	$.getPrevMonthStart = function(date) {
		date = $.ignoreMillseconds(date);
		var prevMonthDate = new Date(date.getFullYear(),date.getMonth() - 1,1,0,0,0);
		return prevMonthDate;
	}
	$.getPrevMonthEnd = function(date) {
		date = $.ignoreMillseconds(date);
		var prevMonthDate = new Date(date.getFullYear(),date.getMonth(),1,0,0,-1);
	}
	$.getNextMonthEnd = function(date) {
		date = $.ignoreMillseconds(date);
		var nextMonthDate = new Date(date.getFullYear(),date.getMonth() + 2,1,0,0,-1);
		return nextMonthDate;
	}
	$.getNextMonthStart = function(date){
		date = $.ignoreMillseconds(date);
		var nextMonthDate = new Date(date.getFullYear(),date.getMonth()+1,1,0,0,0);
		return nextMonthDate;
	}
	$.getWeekIndexWithinMonth = function(date) {
		date = $.ignoreMillseconds(date);
		var dateValue = date.getDate();
		var dayValue = date.getDay() == 0 ? 7 : date.getDay();
		var weekIndex = 1 + Math.ceil((dateValue - dayValue)/7);
		return weekIndex;
	}
	$.getWeekOfMonth = function(date) {
		var firstDay = $.getBeginningOfMonth(date);
		var lastDay = $.getEndOfMonth(date);
		var weekGroup = [];
		var totalDay = lastDay.getDate()-firstDay.getDate() + 1;
		if(firstDay.getDay() == 1){//如果该月第一天是周一
			for(var i = 1; i <=Math.ceil(totalDay/7); i++){
				var week = {};
				week.start = new Date(firstDay.getFullYear(),firstDay.getMonth(),firstDay.getDate()+7*(i-1));
				week.end = new Date(week.start.getFullYear(),week.start.getMonth(),week.start.getDate()+6);
				week.days = 7;
				if(week.end.getMonth() > week.start.getMonth()){
					week.end = lastDay;
					week.days = totalDay - 7*(i-1);
				}
				weekGroup.push(week);
			}
 		}else{
			var firstWeekDateNum = 7 - (firstDay.getDay() == 0 ? 7 : firstDay.getDay()) + 1;
			var totalWeek = 1 + Math.ceil((totalDay - firstWeekDateNum)/7);
			for (var i = 1; i <= totalWeek; i++){
				var week = {};
				if (i==1){
					week.start = date;
					week.end = new Date(firstDay.getFullYear(),firstDay.getMonth(),firstDay.getDate()+firstWeekDateNum - 1);
					week.days = firstWeekDateNum;
				}else{
					week.start = new Date(weekGroup[0].end.getFullYear(),weekGroup[0].end.getMonth(),weekGroup[0].end.getDate()+ 1 + 7*(i - 2));
					week.end = new Date(week.start.getFullYear(),week.start.getMonth(),week.start.getDate()+6);
					week.days = 7;
					if(week.end.getMonth() > week.start.getMonth()){
						week.end = lastDay;
						week.days = totalDay - 7*(i-1);
					}
				}
				weekGroup.push(week);
			}
		}
		return weekGroup;
	}
//	$.getPrevWeekEnd = function(date) {
//		return new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,date.getHours(),date.getMinutes(),date.getSeconds());
//	}
			
	
})(jQuery);