var trId = 0;
function addTr(onthis){
	var divId =  $(onthis).closest('div').attr('id'); 
    var drawAgeStart = $("#"+divId+" #drawAgeStart").val();
    var drawAgeEnd = $("#"+divId+" #drawAgeEnd").val();
    var collectAmount = $("#"+divId+" #collectAmount").val();
    
    $("#"+divId+" #template #ageStart").html(drawAgeStart);
    $("#"+divId+" #template #ageEnd").html(drawAgeEnd);
    $("#"+divId+" #template #collectVal").html(collectAmount);
    
    //封装一行对象
	var customerAge = new Object();
	customerAge.stAge = drawAgeStart;
	customerAge.enAge = drawAgeEnd;
	customerAge.account = collectAmount;
	var json = JSON.stringify(customerAge); 
	$("#"+divId+" #benefitCount").html(json);
	//赋值添加一行
	var tr = $("#"+divId+" #template").clone();
	tr.attr("id", trId);
	trId++;
	tr.show();
	$("#"+divId+" #containers").append(tr);
	//设置总计金额
	var account = 0;
	$("#"+divId+" #containers .account").each(function(i){
		account += Number($(this).html()); 
    });
	$("#"+divId+" #sumAccount").val(account);
	//设置隐藏域的值
	var arr = new Array();
	$("#"+divId+" #containers .benefitCount").each(function(i){
        arr[i] = $(this).html(); 
    }); 
    var jsonStr = arrayToJson(arr);
    $("#"+divId+" #ageJson").val(jsonStr);
}

function editAddTR(divId,drawAgeStart,drawAgeEnd,collectAmount) {
		if(drawAgeStart != '' && drawAgeEnd != '' && collectAmount != ''){
		    $("#"+divId+" #template #ageStart").html(drawAgeStart);
		    $("#"+divId+" #template #ageEnd").html(drawAgeEnd);
		    $("#"+divId+" #template #collectVal").html(collectAmount);
			var customerAge = new Object();
			customerAge.stAge = drawAgeStart;
			customerAge.enAge = drawAgeEnd;
			customerAge.account = collectAmount;
			var json = JSON.stringify(customerAge); 
			$("#"+divId+" #benefitCount").html(json);
			var tr = $("#"+divId+" #template").clone();
			tr.attr("id", trId);
			tr.show();
			$("#"+divId+" #containers").append(tr);
			trId ++;
			//设置隐藏域的值
			var arr = new Array();
			$("#"+divId+" #containers .benefitCount").each(function(i){
		            arr[i] = $(this).html(); 
		    });
		    var jsonStr = arrayToJson(arr);
		    $("#"+divId+" #ageJson").val(jsonStr);
		    return false;
	    }
}
function deleteTR(onthis) {
	$($(onthis)[0].parentNode.parentNode).remove();
	revertID();
	
	var divId =  $(onthis).closest('div').attr('id'); 
	//设置隐藏域的值
	var arr = new Array();
	$("#"+divId+" #containers .benefitCount").each(function(i){
            arr[i] = $(this).html(); 
    }); 
    var jsonStr = arrayToJson(arr);
    $("#"+divId+" #ageJson").val(jsonStr);
}
function revertID(containerId) {
	trId = 0;
	$("#"+containerId+" tr").each(function(index) {
		setTrId($(this));
	});
}

function setTrId(tr) {
	tr.find("input, select, textarea")
	.not(":submit, :reset, :image, [disabled]").each(function(i){
		this.id = this.id.replace(/\d/, trId);
		this.name = this.name.replace(/\d/, trId);
	});
	trId++;
}
/**
 *js数组转json
 *
 */ 
function arrayToJson(o) {  
	var r = [];  
	if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";  
	if (typeof o == "object") {  
	if (!o.sort) {  
	for (var i in o)  
	r.push(i + ":" + arrayToJson(o[i]));  
	if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {  
	r.push("toString:" + o.toString.toString());  
	}  
	r = "{" + r.join() + "}";  
	} else {  
	for (var i = 0; i < o.length; i++) {  
	r.push(arrayToJson(o[i]));  
	}  
	r = "[" + r.join() + "]";  
	}  
	return r;  
	}  
	return o.toString();  
}