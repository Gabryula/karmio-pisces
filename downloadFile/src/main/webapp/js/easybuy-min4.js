var JdCAreas4 = function() {
	var e = {};
	var g = null;
	var j = function(b, c, d,af) {
		c.empty().append("<option value='-22' >请选择</option>");
		$.ajax({
			url: b,
			data: {
				id: d
			},
			success: function(r) {
				var r = eval("(" + r + ")");
				if (r.flag == 1) {
					for (var i = 0; i < r.obj.areas.length; i++){
						if(af == r.obj.areas[i].occCode){
						    c.append("<option selected='selected' value='" + r.obj.areas[i].occCode+","+r.obj.areas[i].jobLevel+ "'>" + r.obj.areas[i].occName+ "</option>")
						    $("#levelCode").val(r.obj.areas[i].jobLevel);
						}else{
							c.append("<option value='" + r.obj.areas[i].occCode+","+r.obj.areas[i].jobLevel+ "'>" + r.obj.areas[i].occName + "</option>")
						}
					}
//					if(af != "0"){
//						c.val(af);
//					}
				}
			}
		})
	};
	var k = function(b,aj) {
		e.ProvinceC.append("<option value='-22'>请选择</option>");
		e.CityC.append("<option value='-22'>请选择</option>");
		$.ajax({
			url: b,
			data:{
				IdProvince: g.IdProvince,
				IdCity: g.IdCity
			},
			success: function(r) {
				var r = eval("(" + r + ")");
				if (r.flag == 1) {
					var i = 0;
					for (i = 0; i < r.obj.supProvinces.length; i++) {
						e.ProvinceC.append("<option value='" + r.obj.supProvinces[i].occCode + "'>" + r.obj.supProvinces[i].occName + "</option>")
					}
					if(aj != "0"){
					   e.ProvinceC.val(aj);  
					}
				}
			}
		})
	};
	this.Keys = {
		ProvinceKey: "jdp_big",
		CitysKey: "jdp_middle"
	};
	this.init3 = function(a1,a2) {
		e.ProvinceC = $("#" + this.Keys.ProvinceKey);
		e.CityC = $("#" + this.Keys.CitysKey);
		if (!g) g = {
			IdProvince: a1,
			IdCity: a2
		};
		k("getBigOcc.do",a1);
		j("getMiddleCode.do", e.CityC, g.IdProvince,a2);
		e.ProvinceC.change(function() {
			var a = e.ProvinceC.children("option:selected");
			g.IdProvince = a.val();
			j("getMiddleCode.do", e.CityC, g.IdProvince,"0");
		});
		e.CityC.change(function() {
			var a = e.CityC.children("option:selected");
			g.IdCounty = a.val();
			var strs= new Array(); //定义一数组
			strs=a.val().split(","); //字符分割      
			if(strs.length >= 2){
				$("#occCode").val(strs[0]);
				$("#levelCode").val(strs[1]);
			}
			g.NameCounty = a.html().replace("*", "");
		})
	};
	this.init = function() {
		e.ProvinceC = $("#" + this.Keys.ProvinceKey);
		e.CityC = $("#" + this.Keys.CitysKey);
		if (!g) g = {
			IdProvince: -22,
			IdCity: -22
		};
		if (g.IdProvince == 0) g.IdProvince = "";
		if (g.IdCity == 0) g.IdCity = "";
		k("getBigOcc.do","0");
		e.ProvinceC.change(function() {
			var a = e.ProvinceC.children("option:selected");
			g.IdProvince = a.val();
			j("getMiddleCode.do", e.CityC, g.IdProvince,"0");
		});
		e.CityC.change(function() {
			var a = e.CityC.children("option:selected");
			g.IdCounty = a.val();
			var strs= new Array(); //定义一数组
			strs=a.val().split(","); //字符分割      
			if(strs.length >= 2){
				$("#occCode").val(strs[0]);
				$("#levelCode").val(strs[1]);
			}
		})
	};
};
function getDefault(){
	var occCode = $("#occCode").val();
	$.ajax({
		url: "getByOccAllCode.do",
		data:{
			id : occCode
		},
		success: function(r) {
			var r = eval("(" + r + ")");
			var jc4 = new JdCAreas4();
			jc4.init3(r.parentCode,r.occCode);
		}
	})
}
function checkUser(){
	var name = $("#name").val();
	$.ajax({
		url: "checkUser.do",
		data:{
			name : name
		},
		success: function(r) {
			var r = eval("(" + r + ")");
			if(r.flag == "true"){
				    var dg = new J.dialog({
					title:"回填客户列表",
					id:'addC',
					width:1100,
					height:530,
					iconTitle:false,
					cover:true,
					maxBtn:false,
					xButton:true,
					resize:false,
					page:'getUserList.do?name='+name+"&type=add"
					});
	    		dg.ShowDialog();
			}
		}
	});
}