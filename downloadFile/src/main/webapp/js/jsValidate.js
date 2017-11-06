var validateRegExp = {
	mobile: "^[0-9]{11}$",                  //手机
	qqNumber: "^[0-9]{0,15}$",              //数字
	tel: "^[0-9\-()]{7,18}$",               //电话号码的函数(包括验证国内区号,国际区号,分机号)
	email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	postCode: "^[0-9]{6}$",                 //邮政编码
	fullNumber: "^[0-9]$",                  //数字和小数点
	decimalNumber: "^([+-]?)\\d*\\.?\\d+$", //数字和小数点
	age: "^\d{1,2}$",                       //两位数字
	
	intege: "^-?[1-9]\\d*$", //整数
    intege1: "^[1-9]\\d*$", //正整数
    intege2: "^-[1-9]\\d*$", //负整数
    num: "^([+-]?)\\d*\\.?\\d+$", //数字
    num1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
    num2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
    ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
    chinese: "^[\\u4e00-\\u9fa5]+$", //仅中文
    date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
    letter: "^[A-Za-z]+$", //字母
    letter_l: "^[a-z]+$", //小写字母
    letter_u: "^[A-Z]+$", //大写字母
    notempty: "^\\S+$", //非空
    password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$" //用户名
};
//验证规则
var validateRules = {
	isMobile: function (str) {
	     return new RegExp(validateRegExp.mobile).test(str);
	},
	isTel: function (str) {
        return new RegExp(validateRegExp.tel).test(str);
    },
    isQQNumber: function (str) {
        return new RegExp(validateRegExp.qqNumber).test(str);
    },
    isEmail: function (str) {
        return new RegExp(validateRegExp.email).test(str);
    },
    isPostCode: function (str) {
        return new RegExp(validateRegExp.postCode).test(str);
    },
	isNull: function (str) {
        return (str == "" || typeof str != "string");
    },
    isDecimalNumber: function (str) {
        return (str.length <= 16 && new RegExp(validateRegExp.decimalNumber).test(str));
    },
    isProportion: function (str) {
        return (str.length <= 5 && Number(str) >= 0 && Number(str) <= 100);
    },
    isAge: function (str) {
        return (new RegExp(validateRegExp.age).test(str));
    },
    isUid: function (str) {
        return new RegExp(validateRegExp.username).test(str);
    },
    fullNumberName: function (str) {
        return new RegExp(validateRegExp.fullNumber).test(str);
    },
    checkType: function (element) {
        return (element.attr("type") == "checkbox" || element.attr("type") == "radio" || element.attr("rel") == "select");
    }
};