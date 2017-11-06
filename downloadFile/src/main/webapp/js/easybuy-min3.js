var JdCAreas3 = function() {
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
						c.append("<option value='" + r.obj.areas[i].regionCode + "'>" + r.obj.areas[i].regionName + "</option>")
					}
					if(af != "0"){
						c.val(af);  
					}
				}
			}
		})
	};
	var k = function(b,aj) {
		e.ProvinceC.append("<option value='-22'>请选择</option>");
		e.CityC.append("<option value='-22'>请选择</option>");
		e.CountyC.append("<option value='-22'>请选择</option>");
		$.ajax({
			url: b,
			data:{
				IdProvince: g.IdProvince,
				IdCity: g.IdCity,
				IdCounty: g.IdCounty
			},
			success: function(r) {
				var r = eval("(" + r + ")");
				if (r.flag == 1) {
					var i = 0;
					for (i = 0; i < r.obj.supProvinces.length; i++) {
							e.ProvinceC.append("<option value='" + r.obj.supProvinces[i].regionCode + "'>" + r.obj.supProvinces[i].regionName + "</option>")
					}
					if(aj != "0"){
					   e.ProvinceC.val(aj);  
					}
				}
			}
		})
	};
	this.Keys = {
		ProvinceKey: "jdp_Province3",
		CitysKey: "jdp_Citys3",
		CountysKey: "jdp_Countys3"
	};
	this.init3 = function(a1,a2,a3) {
		e.ProvinceC = $("#" + this.Keys.ProvinceKey);
		e.CityC = $("#" + this.Keys.CitysKey);
		e.CountyC = $("#" + this.Keys.CountysKey);
		if (!g) g = {
			IdProvince: a1,
			IdCity: a2,
			IdCounty: a3
		};
		k("getProvice.do",a1);
		j("getCity.do", e.CityC, g.IdProvince,a2);
		j("getCounty.do", e.CountyC, g.IdCity,a3);
		e.ProvinceC.change(function() {
			var a = e.ProvinceC.children("option:selected");
			g.IdProvince = a.val();
			e.CountyC.empty().append("<option value='-22'>请选择</option>");
			j("getCity.do", e.CityC, g.IdProvince,"0");
		});
		e.CityC.change(function() {
			var a = e.CityC.children("option:selected");
			g.IdCity = a.val();
			j("getCounty.do", e.CountyC, g.IdCity,"0");
		});
		e.CountyC.change(function() {
			var a = e.CountyC.children("option:selected");
			g.IdCounty = a.val();
			g.NameCounty = a.html().replace("*", "");
		})
	};
	this.init = function() {
		e.ProvinceC = $("#" + this.Keys.ProvinceKey);
		e.CityC = $("#" + this.Keys.CitysKey);
		e.CountyC = $("#" + this.Keys.CountysKey);
		if (!g) g = {
			IdProvince: -22,
			IdCity: -22,
			IdCounty: -22
		};
		if (g.IdProvince == 0) g.IdProvince = "";
		if (g.IdCity == 0) g.IdCity = "";
		if (g.IdCounty == 0) g.IdCounty = "";
		k("getProvice.do","0");
		e.ProvinceC.change(function() {
			var a = e.ProvinceC.children("option:selected");
			g.IdProvince = a.val();
			e.CountyC.empty().append("<option value='-22'>请选择</option>");
			j("getCity.do", e.CityC, g.IdProvince,"0");
		});
		e.CityC.change(function() {
			var a = e.CityC.children("option:selected");
			g.IdCity = a.val();
			j("getCounty.do", e.CountyC, g.IdCity,"0");
		});
		e.CountyC.change(function() {
			var a = e.CountyC.children("option:selected");
			g.IdCounty = a.val();
		})
	};
};