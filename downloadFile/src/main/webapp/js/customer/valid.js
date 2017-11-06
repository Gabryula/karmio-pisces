var regAge = /^\d{1,3}$/;
var regDeadline = /^\d{1,2}$/;
var regAccount = /^\d+\.{0,1}\d+$/

//验证年龄
function validAge(age){
	if(regAge.exec(age) == null){
		return false;
	}else{
		return true; 
	}
}
//验证还款期限
function validDeadLine(deadline){
	if(regDeadline.exec(deadline) == null){
		return false;
	}else{
		return true; 
	}
}

//获取字符长度
function get_len(str){
	return str.length;
}
//验证金额
function validAccount(account){
	if(regAccount.exec(account) == null){
		return false;
	}else{
		return true; 
	}
}
//清空
$(function (){
	   $("#cl").click(function(){
		   $(":text").val("");
		   $("select").val("");
		   $("input[type=radio][checked]").val();
	   });
 })
