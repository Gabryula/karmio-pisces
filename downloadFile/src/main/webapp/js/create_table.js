var myTBody=null;
	$(function() {
		myTBody=$("#content_TBody");
	});
var tableObjectID = 0;
function addTR(templateId,containerId,drawAgeStart,drawAgeEnd,collectAmount) {
	$("#ageStart").html(drawAgeStart);
	$("#ageEnd").html(drawAgeEnd);
	$("#collectVal").html(collectAmount);
	
	var customerAge = new Object();
	customerAge.stAge = drawAgeStart;
	customerAge.enAge = drawAgeEnd;
	customerAge.account = collectAmount;
	var json = JSON.stringify(customerAge); 
	
	$("#benefitCount").html(json);
	var sumCount = 0;
    $(".benefitCount").each(function(i){
           if(Number($(this).html()) >= 1){
                   sumCount += Number($(this).html());
           }
    });
	var tr = $("#"+templateId).clone();
	tr.attr("id", tableObjectID);
	setID(tr);
	tr.show();
	$("#"+containerId).append(tr);
	
	//设置隐藏域的值
	var arr = new Array();
	$("#containers .benefitCount").each(function(i){
            arr[i] = $(this).html(); 
    }); 
    var jsonStr = arrayToJson(arr);
    $("#ageJson").val(jsonStr);
}

function editAddTR(templateId,containerId,drawAgeStart,drawAgeEnd,collectAmount) {
	$("#ageStart").html(drawAgeStart);
	$("#ageEnd").html(drawAgeEnd);
	$("#collectVal").html(collectAmount);
	
	var customerAge = new Object();
	customerAge.stAge = drawAgeStart;
	customerAge.enAge = drawAgeEnd;
	customerAge.account = collectAmount;
	var json = JSON.stringify(customerAge); 
	$("#benefitCount").html(json);
	
	var tr = $("#"+templateId).clone();
	tr.attr("id", tableObjectID);
	setID(tr);
	tr.show();
	$("#"+containerId).append(tr);
	
	
	//设置隐藏域的值
	var arr = new Array();
	$("#containers .benefitCount").each(function(i){
            arr[i] = $(this).html(); 
    }); 
    var jsonStr = arrayToJson(arr);
    $("#ageJson").val(jsonStr);
}
function deleteTR(a) {
	$($(a)[0].parentNode.parentNode).remove();
	revertID();
	//设置隐藏域的值
	var arr = new Array();
	$("#containers .benefitCount").each(function(i){
            arr[i] = $(this).html(); 
    }); 
    var jsonStr = arrayToJson(arr);
    $("#ageJson").val(jsonStr);
}
function revertID(containerId) {
	tableObjectID = 0;
	$("#"+containerId+" tr").each(function(index) {
		setID($(this));
	});
}
function setID(tr) {
	tr.find("input, select, textarea")
	.not(":submit, :reset, :image, [disabled]").each(function(i){
		this.id = this.id.replace(/\d/, tableObjectID);
		this.name = this.name.replace(/\d/, tableObjectID);
	});
	tableObjectID++;
}

function addJsonSuggest(containerId){
	      var installstaffs = $("#"+containerId+" input[id^=sku_]");
	      installstaffs.each(function(i){
	    	  if(this.id){
	  				var id = this.id;
	  				$(this).unbind();
	  				$('#'+id).jsonSuggest({url: 'datas.txt', maxResults: 10});
	    	  }
	      });
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