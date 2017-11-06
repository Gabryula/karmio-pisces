
$(document).ready(function(){
    $(window).scroll(function (){ 
        var offsetTop = 30+ $(window).scrollTop() +"px";       
        $("#CompareBasket").animate({top : offsetTop },{ duration:600 , queue:false });
    });
}); 

// unicode 编码程序
function BasketEncodeCookie(InputString)
{
	/*var strRtn="";
	for (var i=InputString.length-1;i>=0;i--)
	{
		strRtn+=InputString.charCodeAt(i);
		if (i) strRtn+="a"; // 用 a 作分隔符
	}
	return strRtn;*/
	return InputString;
}

// unicode 解码程序
function BasketDecodeCookie(InputString)
{
	/*
	var strArr;
	var strRtn="";

	strArr=InputString.split("a");

	for (var i=strArr.length-1;i>=0;i--)
		strRtn+=String.fromCharCode(eval(strArr[i]));

	return strRtn;*/
	return InputString;
}

// 读 Cookie
function BasketGetCookie(name)
{
	var strArg=name+"=";
	var nArgLen=strArg.length;
	var nCookieLen=document.cookie.length;
	var nEnd;
	var i=0;
	var j;

	while (i<nCookieLen)
	{
		j=i+nArgLen;
		if (document.cookie.substring(i,j)==strArg)
		{
			nEnd=document.cookie.indexOf (";",j);
			if (nEnd==-1) nEnd=document.cookie.length;
			return BasketDecodeCookie(unescape(document.cookie.substring(j,nEnd)));
		}
		i=document.cookie.indexOf(" ",i)+1;
		if (i==0) break;
	}
	return null;
}

// 写 Cookie
function BasketSetCookie(name,value,expires)
{
	var exp = new Date();
	exp.setTime(exp.getTime()+expires*60*60*1000);
	document.cookie=name+"="+escape(BasketEncodeCookie(value))+";expires="+exp.toGMTString()+";path=/";
}

// 判断 Cookie 是否存在并写产品对比 Cookie
function BasketCheckSetCookieValue(name,value,expires)
{
	var nameCookieValue = BasketGetCookie(name);
	if ((nameCookieValue == "") || (nameCookieValue == null))
	{
		var exp = new Date();
		exp.setTime(exp.getTime()+expires*60*60*1000);
		document.cookie=name+"="+escape(BasketEncodeCookie(value))+";expires="+exp.toGMTString()+";path=/";
	}
	else
	{
		if (nameCookieValue.indexOf(value) == -1)
		{
			var arrCookies = nameCookieValue.split("∈");
			var ValueNum = arrCookies.length;
			if (ValueNum > 9)
			{
				nameCookieValue = "";
				for (loop=0; loop < 9; loop++)
				{
					nameCookieValue += arrCookies[loop] + "∈";
				}
				nameCookieValue = nameCookieValue.substring(0,nameCookieValue.length - 1);
			}

			var exp = new Date();
			exp.setTime(exp.getTime()+expires*60*60*1000);
			document.cookie=name+"="+escape(BasketEncodeCookie(value+"∈"+nameCookieValue))+";expires="+exp.toGMTString()+";path=/";
		}
	}
}

function hide()
{
  obj=document.getElementById("CompareBasket");
  obj.style.display='none';
}

function show()
{
  obj=document.getElementById("CompareBasket");
  obj.style.display='block';
}

function Empty()
{
	BasketSetCookie("POP_SubCategory","",24);
	BasketSetCookie("POP_CompareProducts","",24);
	redraw();
	hide();
	valuePK = "";
}

// 判断选择的产品和以前选择的产品是否同类同类产品
function CheckCategoryChange(SubCategory)
{
	var SubCategorySN = BasketGetCookie("POP_SubCategory");
	if ((SubCategory == null) || (SubCategory == ""))
	{
		BasketSetCookie("POP_SubCategory",SubCategory,24);
	}
	else
	{
		if (SubCategory != SubCategorySN)
		{
			BasketSetCookie("POP_SubCategory",SubCategory,24);
			BasketSetCookie("POP_CompareProducts","",24);
		}
	}
}

var valuePK = "";		
function addCompareProduct(ProductSN,ProductName,ProductImg,SubCategory,BrandSN)
{
	CheckCategoryChange(SubCategory);
	var CompareProducts = BasketGetCookie("POP_CompareProducts");
	if ((CompareProducts != "") && (CompareProducts != null))
	{
		var arrCookies = CompareProducts.split("∈");
		if (arrCookies.length < 2)
		{
			if (CompareProducts.indexOf(ProductSN) != -1)
			{
				alert("（" + ProductName + "）已经被选择了！");
			}
			else
			{
				valuePK+=ProductSN;
				valuePK+="="
				BasketCheckSetCookieValue("POP_CompareProducts",ProductSN + "Σ" + ProductName + "Σ" + ProductImg+ "Σ" +BrandSN,24);
			}
		}else
		{
			var YESORNO = confirm("对不起，您只能选择两款产品进行对比，是否清除已选产品？");
            if (YESORNO) {
                Empty();
            }
		}
	}
	else
	{
		valuePK+=ProductSN;
		valuePK+="="
		BasketCheckSetCookieValue("POP_CompareProducts",ProductSN + "Σ" + ProductName + "Σ" + ProductImg+ "Σ" +BrandSN,24);
	}
	redraw();
	ShowLayer();
}

function DelProduct(ProductSN)
{
	var nameCookieValue = BasketGetCookie("POP_CompareProducts");
	if ((nameCookieValue != null) && (nameCookieValue != ""))
	{
		if (nameCookieValue.indexOf(ProductSN) > -1)
		{
			var arrCookies = nameCookieValue.split("∈");
			var ValueNum = arrCookies.length;
			nameCookieValue = "";
			for (i=0; i < ValueNum; i++)
			{
				if (arrCookies[i].indexOf(ProductSN) == -1)
				{
					nameCookieValue += arrCookies[i] + "∈";
				}
			}
			nameCookieValue = nameCookieValue.substring(0,nameCookieValue.length - 1);
			BasketSetCookie("POP_CompareProducts",nameCookieValue,24);
		}
		redraw();
	}
}

function redraw()
{
	//FixPosition();
	var CompareProducts = BasketGetCookie("POP_CompareProducts");
	if (CompareProducts == null)
	{
		CompareProducts = "";
	}
	var arrCookies = CompareProducts.split("∈");
	var Mylength=0;
	if(arrCookies.length>0  && (arrCookies[0] != null)&& (arrCookies[0] != "")){Mylength=arrCookies.length;}
	var CompareTable = "";//"<div class='aprmona'><div class='aprmona1'>- 产品对比 - </div><div class='aprmona2'>";HideLayer()
	CompareTable="<div class=db><div class=db1><div class=db11>["+Mylength+"/2]</div><div class=db12><img height=13 onClick='Empty()' style='cursor:pointer' width=14 src='../images/db3.gif'/></div></div>";
		for (i = Mylength-1; i >=0; i--)
		{
			if ((arrCookies[i] != "") && (arrCookies[i] != null))
			{
				if (arrCookies[i].indexOf("Σ") >= 0)
				{
					var ProductInfo = arrCookies[i].split("Σ");
					if (ProductInfo.length = 5)
					{
						var ProductSN = ProductInfo[0];
						var ProductName = ProductInfo[1];
						var ProductLink = "/"+ProductSN+"/Index.html";
						var ProductImg = "";
						if( ProductInfo[2].toString().indexOf(".jpg") > -1 )
						{
							ProductImg = ProductInfo[2].replace("~","");
						}
						else
						{
							ProductImg = ""+ProductInfo[2]+".jpg";
						}
						//alert(ProductImg);
						if(ProductInfo[2]=="")
						{
							ProductImg = ""+ProductInfo[2]+".jpg";
						}
						if (ProductSN == null){ProductSN = "";}
						if (ProductName == null){ProductName = "";}
						if (ProductLink == null){ProductLink = "";}
						if (ProductImg == null){ProductImg = "";}
						if ((ProductName != "") && (ProductSN != "") && (ProductLink != "") && (ProductImg != ""))
						{
							//CompareTable = CompareTable + "<div class='aprmona3'>"
							//				  +"<div class='aprmona4'>"
							//				    +"<div class='aprmona41'><img alt='移除' style='cursor:pointer' onClick=\"DelProduct('" + ProductSN + "')\" src='http://product.pcpop.com/images200805/aprmona1.gif' width='9' height='9'/></div>"
							//					+"<div class='aprmona42'><a href='"+ProductLink+"' target='_blank'><img src='" + ProductImg + "' width='80' height='60' border='0' /></a></div>"
							//					+"<div class='aprmona43'><a title='"+ProductName+"' href='"+ProductLink+"' target='_blank'>" + CutStr(ProductName, 16) + "</a></div>"
							//				  +"</div>"
							//				+"</div>";
							CompareTable+="<div class=db2><div class=db3>";
							//CompareTable+="<div class=db31><a target=_blank ></a></div>";
							CompareTable+="<div class=db32><a target=_blank title='"+ProductName+"'>" + CutStr(ProductName, 16) + "</a></div><div class=db33 style='display:none'><img alt='移除' height=11 width=11 src='http://product.pcpop.com/images200805/db3.gif' style='cursor:pointer' onClick=\"DelProduct('" + ProductSN + "')\"/></div></div></div>";
						}
					}
				}
			}
		}
	//CompareTable = CompareTable + "<div class='aprmona5'><a onClick='Empty()' style='color:blue;cursor:pointer'>清空</a>&nbsp;&nbsp;<a onClick='HideLayer()' style='color:blue;cursor:pointer'>隐藏</a></div>";
	//CompareTable = CompareTable + "<div class='aprmona6'><img style='cursor:pointer' onClick='CompareCheck()' src='http://product.pcpop.com/images200805/aprmona2.gif' width='75' height='22' border='0'/></div>";
	//CompareTable = CompareTable + "</div></div>";
	CompareTable+="<div style='background:#FFFF00;'class=db4><input type=button value=开始对比 onClick=pkProposalInfo() /></div><div  style='background:#FFFF00;'  class=db5><a  style='color:blue;cursor:pointer' onClick='Empty()'>清空对比栏</a></div></div>";

	jQuery('#CompareBasket').html(CompareTable);	
	$(".db .db2").mouseover(function(){this.className='db2r';$(this).children().children('.db33').show();});
	$(".db .db2").mouseout(function(){this.className='db2';$(this).children().children('.db33').hide();});
}

function IsNumber(inputVal)
{
	var inputStr = inputVal.toString();
	var i = 0;
	for (i =0; i<inputStr.length; i++)
	{
		var oneChar = inputStr.charAt(i)
		if (oneChar < "0" || oneChar> "9")
		{
			return false;
		}
	}
	return true;
}

function CompareCheck()
{
	var URL = "/";
	var CompareProductsValue = BasketGetCookie("POP_CompareProducts");
	var b="00283";
	if ((CompareProductsValue != "") && (CompareProductsValue != null))
	{
		var arrValues = CompareProductsValue.split("∈");
		var ValuesNum = arrValues.length;
		if (ValuesNum < 2)
		{
			alert ('请至少选择两款同类别产品进行对比！');
			return;
		}
		else
		{
			var isTwo = false;
			//if (ValuesNum == 2)//2款产品比较跳转至PK页{//isTwo = true;}
			var SubCategorySN = BasketGetCookie("POP_SubCategory");
			if ((SubCategorySN != "") && (SubCategorySN != null))
			{
				if (IsNumber(SubCategorySN)) {
                    var QueryString = "";
                    if (isTwo) {
                        QueryString = "";
                    }
                    for (i = 0; i < ValuesNum; i++) {
                        var ProductInfo = arrValues[ValuesNum-1-i].split("Σ");
                        if (IsNumber(ProductInfo[0])) {
                            QueryString += ProductInfo[0] + "_";

                        }
                        if (i == ValuesNum - 1) { if (arrValues[i].split("Σ")[3] != "undefined") b = arrValues[i].split("Σ")[3]; }
                    }
                    QueryString = QueryString.substring(0, QueryString.length - 1);
                    window.open(URL + QueryString.replace("{brandsn}", b) + "/Detail.html");

                }
			}
		}
	}
	Empty();
}

redraw();

function HideLayer()
{
	BasketSetCookie("POP_HiddenCompare","Hide",24);
	hide();
}

function ShowLayer()
{
	BasketSetCookie("POP_HiddenCompare","Show",24);
	show();
}

if ((BasketGetCookie("POP_HiddenCompare") == "Hide") || (BasketGetCookie("POP_CompareProducts") == "") || (BasketGetCookie("POP_CompareProducts") == null))
{
	HideLayer();
}
else
{
	ShowLayer();
}

function CutStr(str, length)
{   
   var a = str.replace(/([\u0391-\uffe5])/ig, '$1a');
   var b = a.substring(0, length);
   var c = b.replace(/([\u0391-\uffe5])a/ig, '$1');
   return c;
}
