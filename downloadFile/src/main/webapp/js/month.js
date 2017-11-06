function fn_createYearMonthDay() {
    var argArray = fn_createYearMonthDay.arguments;
    var yearName = argArray[0]; //生成下拉列表的id名字(年份)
    var chosedYear = argArray[1]; //修正值(年份)
    var monthName = argArray[2]; //生成下拉列表的id名字(月份)
    var chosedMonth = argArray[3]; //修正值(月份)
    var dayName = argArray[4]; //生成下拉列表的id名字(日)
    var chosedDay = argArray[5]; //修正值(日)
    var argArrayLength = argArray.length;
    var outstr = ""; //输出字符串
    var begin_year = 1999; //开始年
    var today = new Date();//结束年
    if (argArrayLength == 6) {
        //年份
        outstr += '<select id="' + yearName + '"   name="' + yearName + '" onchange ="FnResetTrueDate(\'' + yearName + '\',\'' + monthName + '\',\'' + dayName + '\')" >';
        var todayYear = today.getYear();
        todayYear = todayYear < 1900 ? (todayYear + 1900) : todayYear;
        var end_year = todayYear + 10;
        for (var i = begin_year; i <= end_year; i++) {
            if (i == todayYear) {
                outstr = outstr + '<option value="' + i + '" selected=\"selected\">' + i + '年</option>';
            } else {
                outstr = outstr + '<option value="' + i + '">' + i + '年</option>';
            }
        }
        outstr = outstr + '</select>';
        //月份
        outstr = outstr + '<select id="' + monthName + '" name="' + monthName + '" onchange ="FnResetTrueDate(\'' + yearName + '\',\'' + monthName + '\',\'' + dayName + '\')" >';
        var todayMonth = today.getMonth() + 1;
        for (i = 1; i <= 12; i++) {
            if (i == todayMonth) {
                outstr = outstr + '<option value="' + formatLessTen(i) + '" selected=\"selected\">' + formatLessTen(i) + '月</option>';
            } else {
                outstr = outstr + '<option value="' + formatLessTen(i) + '">' + formatLessTen(i) + '月</option>';
            }
        }
        outstr = outstr + '</select>';

        //日期
        outstr += '<select id="' + dayName + '" name="' + dayName + '">';
        var todayday = today.getDate();
        var newdate = new Date(todayday, todayMonth);
        var datenum = newdate.getUTCDate();
        for (i = 1; i <= datenum; i++) {
            if (i == todayday) {
                outstr = outstr + '<option value="' + formatLessTen(i) + '" selected=\"selected\">' + formatLessTen(i) + '日</option>'
            } else {
                outstr = outstr + '<option value="' + formatLessTen(i) + '">' + formatLessTen(i) + '日</option>'
            }
        }
        outstr = outstr + '</select>'
        //输出
        document.write(outstr)
    }
}
function fn_createMonthDay(){
	    var argArray = fn_createMonthDay.arguments;
	    var monthName = argArray[0]; //生成下拉列表的id名字(月份)
	    var chosedMonth = argArray[1]; //修正值(月份)
	    var dayName = argArray[2]; //生成下拉列表的id名字(日)
	    var chosedDay = argArray[3]; //修正值(日)
	    var argArrayLength = argArray.length;
	    var outstr = ""; //输出字符串
	    var today = new Date();//结束年
	    if (argArrayLength == 4) {
	        //月份
	        outstr = outstr + '<select id="' + monthName + '" name="' + monthName + '" onchange ="resetTrueDate(\'' + monthName + '\',\'' + dayName + '\')" >';
	        var todayMonth = today.getMonth() + 1;
	        for (i = 1; i <= 12; i++) {
	            if (i == todayMonth) {
	                outstr = outstr + '<option value="' + formatLessTen(i) + '" selected=\"selected\">' + formatLessTen(i) + '月</option>';
	            } else {
	                outstr = outstr + '<option value="' + formatLessTen(i) + '">' + formatLessTen(i) + '月</option>';
	            }
	        }
	        outstr = outstr + '</select>';

	        //日期
	        outstr += '<select id="' + dayName + '" name="' + dayName + '">';
	        var todayday = today.getDate();
	        var newdate = new Date(todayday, todayMonth);
	        var datenum = newdate.getUTCDate();
	        for (i = 1; i <= datenum; i++) {
	            if (i == todayday) {
	                outstr = outstr + '<option value="' + formatLessTen(i) + '" selected=\"selected\">' + formatLessTen(i) + '日</option>'
	            } else {
	                outstr = outstr + '<option value="' + formatLessTen(i) + '">' + formatLessTen(i) + '日</option>'
	            }
	        }
	        outstr = outstr + '</select>'
	        //输出
	        document.write(outstr)
	        
	    }
}
function formatLessTen(in_number) {
    if (in_number < 10) {
        return ("0" + in_number)
    } else {
        return (in_number)
    }
}
function FnResetTrueDate(yearid, monthid, dayid) {
    var tarobj = document.getElementById(dayid)
    var temp_year = document.getElementById(yearid).value;
    var temp_month = document.getElementById(monthid).value;
    var temp_day = tarobj.value;
    var newdate = new Date(temp_year, temp_month);
    alert(newdate);
    var datenum = newdate.getUTCDate();
    tarobj.length = datenum;
    for (var i = 1; i < datenum + 1; i++) {
        optionday = document.createElement("option");
        optionday.innerHTML = i + "日";
        optionday.setAttribute("value", i);
        tarobj.options[i - 1] = optionday;
    }
    if (temp_day <= datenum) tarobj.options[temp_day - 1].selected = true;
    else tarobj.options[datenum - 1].selected = true;
}
function resetTrueDate(monthid, dayid) {
    var tarobj = document.getElementById(dayid);
    var temp_month = document.getElementById(monthid).value;
    var temp_day = tarobj.value;
    var today = new Date();//结束年
    var newdate = new Date(today.getYear(),temp_month);
    var datenum = newdate.getUTCDate();
    tarobj.length = 0;
    for (var i = 1; i < datenum+1; i++) {
    	optionday = document.createElement("option");
        optionday.innerHTML = i + "日";
        optionday.setAttribute("value", i);
        tarobj.options[i - 1] = optionday;
    }
    if (temp_day <= datenum) tarobj.options[temp_day - 1].selected = true;
    else tarobj.options[datenum - 1].selected = true;
}
////
//日期生成所用附加函数
//2002-8-19
////
function FnGetSelectValue(obj)
{
 a = document.getElementById(obj)
 return(a.value)
}