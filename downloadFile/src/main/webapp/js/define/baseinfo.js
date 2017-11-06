$(function(){
  //错误信息
  if("$!{msg}" != ""){
    var dg = new J.dialog({
      title:'错误',
      width:200,
      height:150,
      maxBtn:false,
      cancel:false,
      html:'<p style="text-align:center">$!{msg}</p>'
    });
    dg.ShowDialog();
    dg.addBtn('ok','确定',function(){
      dg.cancel();
    });
    $("input[name=productCode]").focus();
  }
  
  $("#payPeriodTxt").click(function(){
    showPayMenu();
  });
  
  $("#ensurePeriodTxt").click(function(){
    showEnsureMenu();
  });
  
  $("#drawPeriodTxt").click(function(){
    showDrawMenu();
  });
  createPayTree();
  createEnsureTree();
  createDrawTree();
  //生成领取期间树
  function createDrawTree(){
    var setting = {
      check: {
        enable: true,
        chkboxType: {"Y":"", "N":""}
      },
      view: {
        dblClickExpand: false,
        showIcon:false
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeClick: payBeforeClick,
        onCheck:payTreeOnCheck
      }
    };

    var zNodes =eval('$!{drawTreeData}');
    $.fn.zTree.init($("#drawPeriodTree"), setting, zNodes);
    
    function payBeforeClick(treeId, treeNode){
      var zTree = $.fn.zTree.getZTreeObj("payPeriodTree");
      zTree.checkNode(treeNode, !treeNode.checked, null, true);
      return false;
    }
    function payTreeOnCheck(e, treeId, treeNode){
      var zTree = $.fn.zTree.getZTreeObj("payPeriodTree"),
      nodes = zTree.getCheckedNodes(true),v = "";
      var array = [];
      nodes.sort(function compare(a,b){return a.id-b.id;});
      for (var i=0, l=nodes.length; i<l; i++) {
        var obj = {};
        v += nodes[i].name + ",";
        obj.mode = nodes[i].getParentNode().code;
        obj.code = nodes[i].code;
        obj.id = nodes[i].id;
        array.push(obj);
      }
      if (v.length > 0 ) v = v.substring(0, v.length-1);
      $("#payPeriodTxt").val(v);
      $("#payPeriodJson").val(JSON.stringify(array));
    }

  }

  function showDrawMenu() {
      var drawObj = $("#drawPeriodTxt");
      var drawOffset = drawObj.offset();
      $("#drawTree").css({left:drawOffset.left + "px", top:drawOffset.top + drawObj.outerHeight() + "px"}).slideDown("fast");
      $("body").bind("mousedown.draw", onBodyDown);
    function hideMenu() {
      $("#drawTree").fadeOut("fast");
      $("body").unbind("mousedown.draw", onBodyDown);
    }
    function onBodyDown(event) {
      if (!(event.target.id == "drawPeriod" || event.target.id == "drawTree" || $(event.target).parents(".treeContent").length>0)) {
        hideMenu();
      }
    }
  }
    
  //生成保障期间树
  function createEnsureTree(){
    var setting = {
      check: {
        enable: true,
        chkboxType: {"Y":"", "N":""}
      },
      view: {
        dblClickExpand: false,
        showIcon:false
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeClick: ensureBeforeClick,
        onCheck:ensureTreeOnCheck
        
      }
    };

    var zNodes =eval('$!{ensureTreeData}');
    $.fn.zTree.init($("#ensurePeriodTree"), setting, zNodes);
    function ensureBeforeClick(treeId, treeNode){
      var zTree = $.fn.zTree.getZTreeObj("ensurePeriodTree");
      zTree.checkNode(treeNode, !treeNode.checked, null, true);
      return false;
    }
    function ensureTreeOnCheck(e, treeId, treeNode){
      var zTree = $.fn.zTree.getZTreeObj("ensurePeriodTree"),
      nodes = zTree.getCheckedNodes(true),v = "";
      var array = [];
      nodes.sort(function compare(a,b){return a.id-b.id;});
      for (var i=0, l=nodes.length; i<l; i++) {
        var obj = {};
        v += nodes[i].name + ",";
        obj.code = nodes[i].code;
        obj.id = nodes[i].id;
        obj.name = nodes[i].name;
        array.push(obj);
      }
      if (v.length > 0 ) v = v.substring(0, v.length-1);
      $("#ensurePeriodTxt").val(v);
      $("#ensurePeriodJson").val(JSON.stringify(array));
    }
  }
  
  function showEnsureMenu() {
    var obj = $("#ensurePeriodTxt");
    var ensureOffset = $("#ensurePeriodTxt").offset();
    $("#ensureTree").css({left:ensureOffset.left + "px", top:ensureOffset.top + obj.outerHeight() + "px"}).slideDown("fast");
    $("body").bind("mousedown.ensure", onBodyDown);
    function hideMenu() {
      $("#ensureTree").fadeOut("fast");
      $("body").unbind("mousedown.ensure", onBodyDown);
    }
    function onBodyDown(event) {
      if (!(event.target.id == "ensurePeriod" || event.target.id == "ensureTree" || $(event.target).parents(".treeContent").length>0)) {
        hideMenu();
      }
    }
  }
  
  //生成缴费期间树
  function createPayTree(){
    var setting = {
      check: {
        enable: true,
        chkboxType: {"Y":"", "N":""}
      },
      view: {
        dblClickExpand: false,
        showIcon:false
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeClick: payBeforeClick,
        //onCheck: zTreeOnCheck
        onCheck:payTreeOnCheck
        
      }
    };

    var zNodes =eval('$!{payTreeData}');
    $.fn.zTree.init($("#payPeriodTree"), setting, zNodes);
    function payBeforeClick(treeId, treeNode){
      var zTree = $.fn.zTree.getZTreeObj("payPeriodTree");
      zTree.checkNode(treeNode, !treeNode.checked, null, true);
      return false;
    }
    function payTreeOnCheck(e, treeId, treeNode){
      var zTree = $.fn.zTree.getZTreeObj("payPeriodTree"),
      nodes = zTree.getCheckedNodes(true),
      v = "";
      var array = [];
      nodes.sort(function compare(a,b){return a.id-b.id;});
      for (var i=0, l=nodes.length; i<l; i++) {
        var obj = {};
        v += nodes[i].name + ",";
        obj.mode = nodes[i].getParentNode().code;
        obj.code = nodes[i].code;
        obj.id = nodes[i].id;
        array.push(obj);
      }
      if (v.length > 0 ) v = v.substring(0, v.length-1);
      $("#payPeriodTxt").val(v);
      $("#payPeriodJson").val(JSON.stringify(array));
    }
  }

  function showPayMenu() {
    var payObj = $("#payPeriodTxt");
    var payOffset = payObj.offset();
    $("#payTree").css({left:payOffset.left + "px", top:payOffset.top + payObj.outerHeight() + "px"}).slideDown("fast");
    $("body").bind("mousedown.pay", onBodyDown);
    function hideMenu() {
      $("#payTree").fadeOut("fast");
      $("body").unbind("mousedown.pay", onBodyDown);
    }
    function onBodyDown(event) {
      if (!(event.target.id == "payPeriod" || event.target.id == "payTree" || $(event.target).parents(".treeContent").length>0)) {
        hideMenu();
      }
    }
  }
    
  //设置公司下拉框默认值
  if("$!{pd.companyCode}" != ""){
    $("select#companyCode").val("$!{pd.companyCode}");
  }
  //设置产品类型下拉框默认值
  if("$!{pd.productTypeCode}" != ""){
    $("select#productTypeCode").val("$!{pd.productTypeCode}");
  }
  //设置是否主险下拉框默认值
  if("$!{pd.isMainProduct}" != ""){
    $("select#isMainProduct").val("$!{pd.isMainProduct}");
  }
  //设置交费期间
  initPayPeriodTxt();
  function initPayPeriodTxt(){
    var zTree = $.fn.zTree.getZTreeObj("payPeriodTree"),
    nodes = zTree.getCheckedNodes(true),
    v = "";
    var array = [];

    nodes.sort(function compare(a,b){return a.id-b.id;});
    for (var i=0, l=nodes.length; i<l; i++) {
      var obj = {};
      v += nodes[i].name + ",";
      obj.mode = nodes[i].getParentNode().code;
      obj.code = nodes[i].code;
      obj.id = nodes[i].id;
      array.push(obj);
    }
    if (v.length > 0 ) v = v.substring(0, v.length-1);
    $("#payPeriodTxt").val(v);
    $("#payPeriodJson").val(JSON.stringify(array));
  }
  //设置保障期间
  initEnsurePeriodTxt();
  function initEnsurePeriodTxt(){
    var zTree = $.fn.zTree.getZTreeObj("ensurePeriodTree"),
    nodes = zTree.getCheckedNodes(true),
    v = "";
    var array = [];

    nodes.sort(function compare(a,b){return a.id-b.id;});
    for (var i=0, l=nodes.length; i<l; i++) {
      var obj = {};
      v += nodes[i].name + ",";
      obj.code = nodes[i].code;
      obj.id = nodes[i].id;
      obj.name = nodes[i].name;
      array.push(obj);
    }
    if (v.length > 0 ) v = v.substring(0, v.length-1);
    $("#ensurePeriodTxt").val(v);
    $("#ensurePeriodJson").val(JSON.stringify(array));
  }
  //设置领取期间
  initDrawPeriodTxt();
  function initDrawPeriodTxt(){
    var zTree = $.fn.zTree.getZTreeObj("drawPeriodTree"),
    nodes = zTree.getCheckedNodes(true),
    v = "";
    var array = [];

    nodes.sort(function compare(a,b){return a.id-b.id;});
    for (var i=0, l=nodes.length; i<l; i++) {
      var obj = {};
      v += nodes[i].name + ",";
      obj.mode = nodes[i].getParentNode().code;
      obj.code = nodes[i].code;
      obj.id = nodes[i].id;
      array.push(obj);
    }
    if (v.length > 0 ) v = v.substring(0, v.length-1);
    $("#drawPeriodTxt").val(v);
    $("#drawPeriodJson").val(JSON.stringify(array));
  }
  //表单提交
  $("#submit").click(function(event){
    event.preventDefault();
    $("form#baseInfo").submit();
  });
  //$("#next").click(function(event){
    //$.each($("input").add("select"),function(index){
      //if($(this).val()==""){
        //alert($(this).parent().prev().text().replace("*","") + "不能为空");
        //event.preventDefault();
        //$(this.focus();
        //return false;
      //}
    //});
  //});  
});