
/*-------用户添加验证-----------*/
$().ready(function() {
	 $("#fm").validate({
		rules: {
			userName:{
				required: true
			},
			idNumber:{
				required: true,
				//rangelength:[18,18]
			},
			userAccount:{
				required: true,
				number:true
			},
			mobile:{
				required: true,
				rangelength:[11,11],
				digits: "只能输入整数"
				},
			password: {
				required: true,
				//remote:"showRole.do",
				rangelength:[8,20]
				},
			password1: {
				required: true,
				equalTo: "#password",   
				rangelength:[8,20]
				},
			email:     {
				required: true,
				email:true
				}
			},
			messages: {
				userName:{
					required: "请输入姓名",
				},
				idNumber:{
					required: "请输入身份证号",
					//rangelength: jQuery.format("请输入正确的身份证号"),
				},
				userAccount:{
					required: "请输入工号",
					number:"请输入合法的工号"
				},
				mobile:{
					required: "请输入手机号",
					rangelength: jQuery.format("请输入正确的手机号"),
				},
				password: {
						required: "请输入密码",
						//remote:"请修正该字段"
						//rangelength: jQuery.format("密码在8~20个字符之间"),
				},
				password1: {
					required: "请输入确认密码",
					rangelength: jQuery.format("密码在8~20个字符之间"),
					equalTo: "两次输入密码不一致"
				},
				email:     {
					required: "请输入邮箱",
					email:"请输入正确格式的邮箱"
				}
		}
	});
});
