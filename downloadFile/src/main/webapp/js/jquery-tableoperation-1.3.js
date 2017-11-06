//合并操作
(function($){
	$.fn.tableEdit = function(options){
		    
    var defaults = 
    {
    	colNum:8,
    	rowNum:3,
    	width:800,
    	height:25,
    	collapse:null,
    	cellSplit:null,
    	addLine:null,
    	addColumn:null
    };    
    var settings = $.extend(defaults, options || {});
    
    var container$ = $(this);
    var selectedCells$;  //所有被选择的单元格
    var currentTable$; //当前操作的表格
    var thead$;
    var tbody$;
    var rows$;  //表格中的所有行
    var selectedRows$;  //所有被选择的行
    var firstCell$;  //第一个单元格
    var lastCell$;  //最后一个单元格
    var removedCells$;  //合并操作中要被删除掉的单元格
    
    var colNum = settings.colNum;
    var rowNum = settings.rowNum;
    
    createTable();//创建表格
    initData();
    /*表格合并操作*/
    $(settings.collapse).click(function(event){
    	event.preventDefault();
    	if (selectedCells$.size() <= 1) {
    		return;
    	}
    	if(getSelectedRowspan(firstCell$,selectedCells$) > 1){
    		firstCell$.attr("rowspan",getSelectedRowspan(firstCell$,selectedCells$));
    	}
      if(getSelectedColspan(firstCell$,selectedCells$) > 1) {
      	firstCell$.attr("colspan",getSelectedColspan(firstCell$,selectedCells$));
      }
      //bindCellEvent(firstCell$);
      removedCells$.remove();
    });
    //表格拆分
    $(settings.cellSplit).click(function(event){
    	event.preventDefault();
    	var splitCells$ = $(".ui-state-selected[rowspan],.ui-state-selected[colspan]");
    	$.each(splitCells$,function(){
    		var rowspan = parseInt($(this).attr("rowspan") == undefined ? 1 : $(this).attr("rowspan"));
    		var colspan = parseInt($(this).attr("colspan") == undefined ? 1 : $(this).attr("colspan"));
    		var xAxis = $(this).data("xAxis");
    		var yAxis = $(this).data("yAxis");
    		var insertCellXAxis = xAxis + colspan;  //在该单元格前插入单元格
    		//alert(insertCellXAxis);
    		var allTr$ = $(this).closest("tbody").find("tr");
    		var occupyTr$ = $(this).parent("tr");
    		var occupyTrStart = allTr$.index(occupyTr$);
    		var occupyTrEnd = occupyTrStart + rowspan - 1;
    		//alert(occupyTrEnd);
    		
    		var spanTr$ = $(allTr$).filter(function(){
    			return (($(allTr$).index($(this)) >= occupyTrStart) && ($(allTr$).index($(this)) <= occupyTrEnd));
    		});
    		$(this).remove();

    		var trCount = rowspan;  //行计数器
    		var currentTr$ = occupyTr$;
    		while(trCount > 0){
    			trCount--;
    			var tdCount = colspan;  //列计数器
    			var insertCell$ = currentTr$.children("td").filter(function(){
    				return ($(this).data("xAxis") == insertCellXAxis);
    			});
    			while(tdCount > 0){
    				if(insertCellXAxis >= settings.colNum){
    					var column$ = $("<td><div></div></td>");
    					var xAxis = parseInt(insertCellXAxis) - tdCount;
    			    var yAxis = parseInt(currentTr$.children("td").first().data("yAxis"));
    					column$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"}).text(yAxis + "." + xAxis);
    					column$.addClass("ui-state-selectee");
    					bindCellEvent(column$);  					
    			    currentTr$.append(column$);
    			    currentTr$.children().last().data("xAxis",xAxis);
    			    currentTr$.children().last().data("yAxis",yAxis);
    			    tdCount--;
    				} else {
    					var column$ = $("<td><div></div></td>");
    					var xAxis = parseInt(insertCell$.data("xAxis")) - tdCount;
    			  	var yAxis = parseInt(insertCell$.data("yAxis"));
    					column$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"}).text(yAxis + "." + xAxis);
    					column$.addClass("ui-state-selectee"); 
    					bindCellEvent(column$); 					
    					insertCell$.before(column$);

    			  	insertCell$.prev().data("xAxis",xAxis);
    			  	insertCell$.prev().data("yAxis",yAxis);
    			  	tdCount--;
    				}
    			  			
    			}
    			currentTr$ = currentTr$.next();
    		}
	  	});    		
    });
    
    /*增加行*/
    $(settings.addLine).click(function(event){
    	event.preventDefault();
    	rowNum++;
    	tbody$.append($("<tr></tr>").css("height",settings.height));
    	var appendtr$ = tbody$.find("tr").last();
    	for(var i = 0; i < colNum; i++){
    		var appendtd$ = $("<td><div></div></td>");
    		appendtd$.data("xAxis",i);
    		appendtd$.data("yAxis",rowNum - 1);
    		appendtd$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"}); 
    		appendtd$.addClass("ui-state-selectee");
    		appendtd$.hover(
    			function(){
    				$(this).addClass("ui-state-hover");
					},
					function(){
						$(this).removeClass("ui-state-hover");
					}
				).click(cellClick)
				.dblclick(cellDblClick)
				.keydown(cellKeyDown);
    		appendtr$.append(appendtd$);
    		
    	}
    	appendtr$.prepend($("<th></th>"));
    	
    });
    /*增加列*/
    $(settings.addColumn).click(function(event){
    	event.preventDefault();
    	colNum++;
    	var headTdWidth = settings.width / colNum;
    	thead$.find("tr").append($("<td></td>"));
    	$.each(thead$.find("td"),function(){
    		$(this).css("width",headTdWidth);
    	});

    	$.each(tbody$.find("tr"),function(){
    	  var appendtd$ = $("<td><div></div></td>");
    	  appendtd$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"});    		
    		$(this).append(appendtd$);
    		var newTd$ = $(this).children("td").last();
    		var xAxis = colNum - 1;
    		var yAxis = newTd$.closest("tbody").children("tr").index(newTd$.parent("tr"));
    		newTd$.data("xAxis",xAxis);
    		newTd$.data("yAxis",yAxis);
    		
    		newTd$.addClass("ui-state-selectee");
    		
    		newTd$.hover(
    			function(){
    				$(this).addClass("ui-state-hover");
					},
					function(){
						$(this).removeClass("ui-state-hover");
					}
				).click(cellClick)
				.dblclick(cellDblClick)
				.keydown(cellKeyDown);
    	});
    	
    	 
      $(this).data("xAxis",$(this).siblings().andSelf().slice(1).index($(this)));
     	$(this).data("yAxis",$(this).closest("tbody").children("tr").index($(this).parent("tr")));

    	
    	
    });
    
    function bindCellEvent(targetCell){
    	targetCell.hover(
    			function(){
    			  targetCell.addClass("ui-state-hover");
					},
					function(){
						targetCell.removeClass("ui-state-hover");
					}
				).click(cellClick)
				.dblclick(cellDblClick)
				.keydown(cellKeyDown);
    }
    //计算colspan
    function getSelectedColspan(firstCell$,selectedCells$){
     	xAxisStart = firstCell$.data("xAxis");
     	xAxisEnd = getXAxisEnd(selectedCells$);
     	colspan = eval(xAxisEnd - xAxisStart);
     	return colspan;
    }
    /*计算rowspan*/    
    function getSelectedRowspan(firstCell$,selectedCells$){
     	yAxisStart = firstCell$.data("yAxis");
     	yAxisEnd = getYAxisEnd(selectedCells$);
     	rowspan = eval(yAxisEnd - yAxisStart);
     	return rowspan;
    }
     
    function getYAxisEnd(selectedCells$){
      max = 0;
      $.each(selectedCells$,function(){
     	temp = eval($(this).data("yAxis") + parseInt($(this).attr("rowspan") == undefined ? 1 : $(this).attr("rowspan")));
     	max = (temp > max ? temp : max);
      });
      return max;
    }
     
    function getXAxisEnd(selectedCells$){
     	max = 0;
     	$.each(selectedCells$,function(){
     		temp = eval($(this).data("xAxis") + parseInt($(this).attr("colspan") == undefined ? 1 : $(this).attr("colspan")));
     		max = (temp > max ? temp : max);
     	});
     	return max;
    }
  
    /*生成表格*/
    function createTable(){
    	var colNum = settings.colNum;
    	var rowNum = settings.rowNum;
    	width = settings.width;
    	height = settings.height;
    	table$ = $("<table></table>").css("width",width);
    	thead$ = $("<thead></thead>");
    	tbody$ = $("<tbody></tbody>");
    	
    	//thead
    	headTdWidth = width / colNum;
    	head_tr$ = $("<tr></tr>");
    	
    	for (i = 0; i < colNum; i++){
    		head_tr$.append($("<td></td>").css("width",headTdWidth));
    	}
    	head_tr$.prepend($("<th></th>"));
    	thead$.append(head_tr$);
    	table$.append(thead$);
    	//tbody
    	for(i = 0; i < rowNum; i++){
    		tr$ = $("<tr></tr>").css("height",height);
    	  
    		for (j = 0; j < colNum; j++){
    			appendtd$ = $("<td><div></div></td>");
    			appendtd$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"}).text(i + "." + j);
    			//appendtd$.find(">div").text("").append("<textarea style='overflow:hidden;margin:0;padding:0;'/>");
    			tr$.append(appendtd$);
    		}
    		tr$.prepend($("<th></th>"));
    		tbody$.append(tr$);
    		table$.append(tbody$);
    	}

			container$.append(table$);
			var filterTd$ = container$.find("tbody td");
    	filterTd$.addClass("ui-state-selectee");
    	tbody$.find("td").each(function(){
    		$(this).hover(
    			function(){
    				$(this).addClass("ui-state-hover");
					},
					function(){
						$(this).removeClass("ui-state-hover");
					}
				)
				.click(cellClick)
				.dblclick(cellDblClick)
				.keydown(cellKeyDown);
        refreshSelectedStatus();
    	});

    }
    function cellKeyDown(event){
    	if(event.ctrlKey){
				return;
			}
			var td = $(this), tdText = td.find(">div").text(),width=td.css("width"),height=td.css("height");
			td.find(">div").text("").append("<input type='text' style='overflow:hidden;margin:0;padding:0;height:100%;width:100%;'/>");
			td.find(">div>input")
				.css("width",width)
				.css("height",height)
				.addClass("ui-editor-active")
				.keyup(editorKeyUp)
				.focusout(editorFocusOut)
				.dblclick(function(e){e.stopPropagation();})
				.keydown(function(e){e.stopPropagation();})
				.focus();
    }
    /*单元格单击事件*/
   	function cellClick(event){
			var td = $(this),tdDiv = td.find(">div");
			td.addClass("ui-state-active");
			
			if(!event.ctrlKey){ //many select
				tbody$.find("td.ui-state-selected").removeClass("ui-state-selected");
			}
			tbody$.find("td.ui-state-active").removeClass("ui-state-active");//rowHeader colHeader
			td.addClass("ui-state-selected");
			refreshSelectedStatus();
		}
    function cellDblClick(){
			var td = $(this), tdText = td.find(">div").text(),width=td.css("width"),height=td.css("height");
			td.find(">div").text("").append("<input type='text' style='overflow:hidden;margin:0;padding:0;height:100%;width:100%;'/>");
			td.find(">div>input").focus()
				.css("width",width)
				.css("height",height)
				.val(tdText)
				.addClass("ui-editor-active")
				.focusout(editorFocusOut)
				.keyup(editorKeyUp)
				.dblclick(function(e){e.stopPropagation();return false;})
				.keydown(function(e){e.stopPropagation();})
				.mousedown(function(e){e.stopPropagation();return false;})
				.mouseover(function(e){e.stopPropagation();return false;})
				.mouseup(function(e){e.stopPropagation();return false;})
				;    	
    }
    /**
		 * 输入框焦点移出时事件,把输入框替换为文本
		 */
		function editorFocusOut(event){//TODO style
			var textarea = $(this),tdText=textarea.val();
			textarea.replaceWith(tdText);
			event.stopPropagation();
			return false;
		};
		/**
		 * 单元格在可输入键按下弹起时事件
		 */
		function editorKeyUp(event){ //TODO style
			var textarea = $(this),text = textarea.val();
		};
    
    /*选择单元格结束后更新表格状态*/
    function refreshSelectedStatus(){
    	selectedCells$ = container$.find(".ui-state-selected"); //所有被选择的单元格
      currentTable$ = container$.find("table");  //当前表格
      thead$ = container$.find("thead");
      tbody$ = container$.find("tbody");
      rows$ = container$.find("tr");  //所有的行
      selectedRows$ = tbody$.find("tr:has(td.ui-state-selected)");  //所有被选择的行
      firstCell$ = selectedCells$.first();  //被选中的第一个单元格，表格的合并将在第一个单 元格上设置rowspan和colspan
      lastCell$ = selectedCells$.last();
      removedCells$ = selectedCells$.slice(1);  //将要被删除的单元格
    }
    
    /*初始化表格数据*/
    function initData(){
    	refreshSelectedStatus();
    	$.each(container$.find(".ui-state-selectee"),function(){
     	  $(this).data("xAxis",$(this).siblings().andSelf().slice(1).index($(this)));
     	  $(this).data("yAxis",$(this).closest("tbody").children("tr").index($(this).parent("tr")));
      });
      
    }
    
    

    

  };
})(jQuery);

