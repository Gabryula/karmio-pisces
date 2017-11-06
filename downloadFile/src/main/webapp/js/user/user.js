
		
		function cls(){
			var t = document.getElementsByTagName("input"); 
   			for (var i=0; i <t.length; i++){   
	  			if (t[i].type=='text'){    
	    			t[i].value="";//清空  
	  			} 
	 			if (t[i].type=='password'){    
	    			t[i].value="";//清空  
	  			}
	  			if (t[i].type=='hidden'){    
	    			t[i].value="";//清空  
	  			}
   			}

   			var t1 = document.getElementsByTagName("select"); 
	   		for (var i1=0; i1 <t1.length; i1++){   
	    		t1[i1].options[0].selected=true;//清空  
	
	   		}
	   		if(document.getElementById('endDate')!=null){
	   			document.getElementById('endDate').value=getNowTime();
	   		}
 		}
 
 
 		function submit_form(obj,actionURL){
			var urlStr = obj.action;
			var params="p=1";
			var eleLength = obj.elements.length;
			var xmlhttp;	
			for(var i = 0; i < eleLength; i++){
				var ele = obj.elements[i];
				var name = ele.name;
				var value = ele.value;
				if(ele.type != 'radio' && ele.type != 'checkbox'){
					params += "&" + name + '=' + value;
				}else if(ele.checked){
					params += "&" + name + '=' + value;
				}
			}
			if ((navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4)) 
			{ 
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");   
			} else {
				xmlhttp = new XMLHttpRequest();
			}
			xmlhttp.open("post", urlStr, false);
			xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
			xmlhttp.send(params);
			var res = xmlhttp.responseText;
			
			if(res!=""){
				if(res.indexOf('failure-') > -1 ){
					if(actionURL!=""){
					obj.action=actionURL;
						//document.getElementById("do_OK").attachEvent("onclick",function(){obj.submit()});
						alert(res+"失败");
						obj.submit()
						
					}else{
						//document.getElementById("do_OK").attachEvent("onclick",function(){cls()});
						cls();
					}
				}else if(res.indexOf('success-') > -1 ){
					if(actionURL!=""){
					obj.action=actionURL;
					//document.getElementById("do_OK").attachEvent("onclick",function(){obj.submit()});
					obj.submit();
					}else{
					//document.getElementById("do_OK").attachEvent("onclick",function(){cls()});
					cls();
					}
				}
			}
		}
		
		
		
		
		//获得机构树
		function getOrganTree(){
			$(".shadow").show();
			var dg = new J.dialog({
				title:'机构信息',
				id:'user_new',
				width:830,
				height:500,
				iconTitle:false,
				cover:true,
				maxBtn:false,
				xButton:true,
				resize:false,
				page:'user/aaa.do'
				});
    			dg.ShowDialog();
		}
		//密码重置
		function changePassword(){
			var typeBoxObj = document.getElementsByName("partyId");
			var userAccount = "";
			for(var i = 0; i < typeBoxObj.length; i++) {
	            if(typeBoxObj[i].checked) {
	            	userAccount+=typeBoxObj[i].value+","; 
	            }
            }
            if(userAccount != ""){
        	    if(confirm('   确认要重置密码吗？')){ 
        	    	var curDate = new Date();
        	    	//alert(userAccount);
					var url = "user/resetPassword.do?date="+curDate+"&nums="+userAccount;
        			document.all.userForm.action=url;
					submit_form(document.all.userForm,"user.do");
        		} 
        	  }else{
            	alert("请选择要操作的记录！");
            }
		}
		
		//账户解锁
		function unlockUser(){
			var typeBoxObj = document.getElementsByName("partyId");
			var userAccount = "";
			for(var i = 0; i < typeBoxObj.length; i++) {
	            if(typeBoxObj[i].checked) {
	            	userAccount+=typeBoxObj[i].value+","; 
	            }
            }
            if(userAccount != ""){
        	    if(confirm('   确认要解锁账户吗？')){ 
        	    	var curDate = new Date();
        	    	//alert(userAccount);
					var url = "user/unlockUser.do?date="+curDate+"&nums="+userAccount;
        			document.all.userForm.action=url;
					submit_form(document.all.userForm,"user.do");
        		} 
        	  }else{
            	alert("请选择要操作的记录！");
            }
		}
		
		//锁定账户
		function lockUser(){
			var typeBoxObj = document.getElementsByName("partyId");
			var userAccount = "";
			for(var i = 0; i < typeBoxObj.length; i++) {
	            if(typeBoxObj[i].checked) {
	            	userAccount+=typeBoxObj[i].value+","; 
	            }
            }
            if(userAccount != ""){
        	    if(confirm('   确认要锁定账户吗？')){ 
        	    	var curDate = new Date();
        	    	//alert(userAccount);
					var url = "user/lockUser.do?date="+curDate+"&nums="+userAccount;
        			document.all.userForm.action=url;
					submit_form(document.all.userForm,"user.do");
        		} 
        	  }else{
            	alert("请选择要操作的记录！");
            }
		}
		
		
		//开通快保
		function truckStart(){
			var typeBoxObj = document.getElementsByName("partyId");
			var userAccount = "";
			for(var i = 0; i < typeBoxObj.length; i++) {
	            if(typeBoxObj[i].checked) {
	            	userAccount+=typeBoxObj[i].value+","; 
	            }
            }
            if(userAccount != ""){
        	    if(confirm('确认要开通快保吗？')){ 
        	    	var curDate = new Date();
        	    	//alert(userAccount);
					var url = "user/truckStart.do?date="+curDate+"&nums="+userAccount;
        			document.all.userForm.action=url;
					submit_form(document.all.userForm,"user.do");
        		} 
        	}else{
            	alert("请选择要操作的记录！");
            }
		}
	//关闭快保
		function truckEnd(){
			var typeBoxObj = document.getElementsByName("partyId");
			var userAccount = "";
			for(var i = 0; i < typeBoxObj.length; i++) {
	            if(typeBoxObj[i].checked) {
	            	userAccount+=typeBoxObj[i].value+","; 
	            }
            }
            if(userAccount != ""){
        	    if(confirm('确认要关闭快保吗？')){ 
        	    	var curDate = new Date();
        	    	//alert(userAccount);
					var url = "user/truckEnd.do?date="+curDate+"&nums="+userAccount;
        			document.all.userForm.action=url;
					submit_form(document.all.userForm,"user.do");
        		} 
        	  }else{
            	alert("请选择要操作的记录！");
            }
		}
		
		//开通管理员
		function openAdminUser(){
			var typeBoxObj = document.getElementsByName("partyId");
			var userAccount = "";
			for(var i = 0; i < typeBoxObj.length; i++) {
	            if(typeBoxObj[i].checked) {
	            	userAccount+=typeBoxObj[i].value+","; 
	            }
            }
            if(userAccount != ""){
        	    if(confirm('确认要开通管理员吗？')){ 
        	    	var curDate = new Date();
        	    	//alert(userAccount);
					var url = "user/openAdminUser.do?date="+curDate+"&nums="+userAccount;
        			document.all.userForm.action=url;
					submit_form(document.all.userForm,"user.do");
        		} 
        	  }else{
            	alert("请选择要操作的记录！");
            }
		}
		
		//关闭管理员
		function closeAdminUser(){
			var typeBoxObj = document.getElementsByName("partyId");
			var userAccount = "";
			for(var i = 0; i < typeBoxObj.length; i++) {
	            if(typeBoxObj[i].checked) {
	            	userAccount+=typeBoxObj[i].value+","; 
	            }
            }
            if(userAccount != ""){
        	    if(confirm('确认要关闭管理员吗？')){ 
        	    	var curDate = new Date();
        	    	//alert(userAccount);
					var url = "user/closeAdminUser.do?date="+curDate+"&nums="+userAccount;
        			document.all.userForm.action=url;
					submit_form(document.all.userForm,"user.do");
        		} 
        	  }else{
            	alert("请选择要操作的记录！");
            }
		}
		function addUser(){
			//$(".shadow").show();
			//var dg = new J.dialog({
			//	title:'新增用户',
			//	id:'user_new',
			//	width:330,
			//	height:300,
			//	iconTitle:false,
			//	cover:true,
			//	maxBtn:false,
			//	xButton:true,
			//	resize:false,
			//	page:'user/add.do'
			//	});
    		//dg.ShowDialog();
    		document.all.userForm.action="user/ccx.do";
			submit_form(document.all.userForm,"user.do");
		}




		function editRights(userId){
			var dg = new J.dialog({
				title:'用户授权',
				id:'auth',
				width:280,
				height:370,
				iconTitle:false,
				cover:true,
				maxBtn:false,
				resize:false,
				page:'user/auth.do?userId='+userId
				});
    		dg.ShowDialog();
		}

		
		var zNodes =[
			{id:1, pId:0, name:"北京"},
			{id:2, pId:0, name:"天津"},
			{id:3, pId:0, name:"上海"},
			{id:6, pId:0, name:"重庆"},
			{id:4, pId:0, name:"河北省", open:true},
			{id:41, pId:4, name:"石家庄"},
			{id:42, pId:4, name:"保定"},
			{id:43, pId:4, name:"邯郸"},
			{id:44, pId:4, name:"承德"},
			{id:5, pId:0, name:"广东省", open:true},
			{id:51, pId:5, name:"广州"},
			{id:52, pId:5, name:"深圳"},
			{id:53, pId:5, name:"东莞"},
			{id:54, pId:5, name:"佛山"},
			{id:6, pId:0, name:"福建省", open:true},
			{id:61, pId:6, name:"福州"},
			{id:62, pId:6, name:"厦门"},
			{id:63, pId:6, name:"泉州"},
			{id:64, pId:6, name:"三明"}
		 ];
	