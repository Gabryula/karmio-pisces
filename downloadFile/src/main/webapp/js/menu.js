$( 
  function() {
   init();
  }
 );
 
function init() {
     //第一次加载页面的时候，查询所有的省份
     $.post("getProvice.do", null, callback1);
}
 //省份
function callback1(data) {
	  var data = eval("(" + data + ")");
	  var select1 = $("#select1");
	  select1.empty();
	  select1.append("<option value=0>请选择</option>");
	  for ( var i = 0; i < data.length; i++) {
	   select1.append("<option value=" + data[i].regionCode + ">"+ data[i].regionName + "</option>");
	  }
}

 //当选中一个省份后，查询对应的市区名称
function sel1(){
	  var select1 = $("#select1");
	  alert(select1);
	  if(select1.val() != "0"){
		  $("#select2").empty();
		  $("#select3").empty();
	      $.post("getCity.do?provinceCode="+select1.val()+"",null,callback2);
	  }else{
	   //当用户没有选择省份的时候，就将市区下拉列表框中原有的“请选择”字样删除。
	     $("#select2").empty();
	  }
	  //当用户进行一次省市县的操作后，再次选择省份的时候，后面的县区里面如果有值就要清空
	  var select3 = $("#select3");
	  select3.empty();
 }
 
 //市区
 function callback2(data) {
	  var data = eval("(" + data + ")");
	  var select2 = $("#select2");
	  select2.empty();
	  select2.append("<option value=0>请选择</option>");
	  for ( var i = 0; i < data.length; i++) {
	   select2.append("<option value=" + data[i].regionCode + ">"+ data[i].regionName + "</option>");
	  }
 }
 
 //当选中市区名称后，查询对应的县区名称
 function sel2(){
	  var select2 = $("#select2");
	  if(select2.val() != "0"){ 
	      $.post("getCounty.do?cityCode="+select2.val()+"",null,callback3);
	  }else{
		   //当用户没有选择市区的时候，就将县区下拉列表框中原有的“请选择”字样删除。
		   $("#select3").empty();
	  }
 }
 
 //县区
 function callback3(data) {
	  var data = eval("(" + data + ")");
	  var select3 = $("#select3");
	  select3.empty();
	  select3.append("<option value=0>请选择</option>");
	  for ( var i = 0; i < data.length; i++) {
		 select3.append("<option value=" + data[i].regionCode + ">"+ data[i].regionName + "</option>");
	  }
 }