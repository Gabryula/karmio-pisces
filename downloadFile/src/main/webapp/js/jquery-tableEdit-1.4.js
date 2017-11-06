//�ϲ�����
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
    	deleteLine:null,
    	addColumnBefore:null,
    	addColumnAfter:null,
    	deleteColumn:null
    };    
    var settings = $.extend(defaults, options || {});
    
    var container$ = $(this);
    var selectedCells$;  //���б�ѡ��ĵ�Ԫ��
    var currentTable$; //��ǰ�����ı��
    var thead$;
    var tbody$;
    var rows$;  //����е�������
    var selectedRows$;  //���б�ѡ�����
    var firstCell$;  //��һ����Ԫ��
    var lastCell$;  //���һ����Ԫ��
    var removedCells$;  //�ϲ�������Ҫ��ɾ�����ĵ�Ԫ��
    
    var colNum = settings.colNum;
    var rowNum = settings.rowNum;
    
    createTable();//�������
    initData();
    /*���ϲ�����*/
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
      removedCells$.remove();
    });
    //�����
    $(settings.cellSplit).click(function(event){
    	event.preventDefault();
    	var splitCells$ = $(".ui-selected[rowspan],.ui-selected[colspan]");
    	$.each(splitCells$,function(){
    		var rowspan = parseInt($(this).attr("rowspan") == undefined ? 1 : $(this).attr("rowspan"));
    		var colspan = parseInt($(this).attr("colspan") == undefined ? 1 : $(this).attr("colspan"));
    		var xAxis = $(this).data("xAxis");
    		var yAxis = $(this).data("yAxis");
    		var insertCellXAxis = xAxis + colspan;  //�ڸõ�Ԫ��ǰ���뵥Ԫ��
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

    		var trCount = rowspan;  //�м�����
    		var currentTr$ = occupyTr$;
    		while(trCount > 0){
    			trCount--;
    			var tdCount = colspan;  //�м�����
    			var insertCell$ = currentTr$.children("td").filter(function(){
    				return ($(this).data("xAxis") == insertCellXAxis);
    			});
    			while(tdCount > 0){
    				if(insertCellXAxis >= settings.colNum){
    					var column$ = $("<td><div></div></td>");
    					var xAxis = parseInt(insertCellXAxis) - tdCount;
    			    var yAxis = parseInt(currentTr$.children("td").first().data("yAxis"));
    					column$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"}).text(yAxis + "." + xAxis);
    					column$.addClass("ui-selectee");
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
    					column$.addClass("ui-selectee"); 
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
    
    /*������*/
    $(settings.addLine).click(function(event){
    	event.preventDefault();
    	rowNum++;
    	//var currentSelectedTd$ = container$.find("td.ui-selected").first().;
    	//var currentSelectedTr$ = 
    	tbody$.append($("<tr></tr>").css("height",settings.height));
    	var appendtr$ = tbody$.find("tr").last();
    	for(var i = 0; i < colNum; i++){
    		var appendtd$ = $("<td><div></div></td>");
    		appendtd$.data("xAxis",i);
    		appendtd$.data("yAxis",rowNum - 1);
    		appendtd$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"}); 
    		appendtd$.addClass("ui-selectee");
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
    /*��Ԫ��ǰ������*/
    $(settings.addColumnBefore).click(function(event){
    	event.preventDefault();
    	if (container$.find("td.ui-selected").size() == 0) {
    		return;
    	}
    	var currCell$ = container$.find("td.ui-selected").first();
    	
    	var insertAxis = currCell$.data("xAxis");
    	
    	colNum++;
    	var headTdWidth = settings.width / colNum;

    	var insertHeadTd$ = thead$.find("tr").children("td").filter(function(index){

    		return ($(this).siblings().andSelf().slice(1).index($(this)) == parseInt(insertAxis));
    	});

    	insertHeadTd$.before($("<td></td>"));
    	$.each(thead$.find("td"),function(){
    		$(this).css("width",headTdWidth);
    	});
    	
    	var insertBodyTds$ = tbody$.find("tr td").filter(function(){
    		return ($(this).data("xAxis") == insertAxis);
    	});
      $.each(insertBodyTds$,function(){
      	var insertBodyTd$ = $(this);
      	var currentTr$ = $(this).parent("tr");
    	  if(getRowspan($(this)) > 1){
    	  	var rowCount = getRowspan($(this));
    	  	while(rowCount >= 1){
    	  		var newTd$ = $("<td><div></div></td>");
    	  	  newTd$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"});
    	  	  var insertBeforeTd$ = currentTr$.children("td").filter(function(){
    	  	  	return ($(this).data("xAxis") >= insertAxis);
    	  	  }).first();
    	  	  var insertAfterTd$;
    	  	  if(insertBeforeTd$.size() == 1){
    	  	  	insertBeforeTd$.before(newTd$);
    	  	  }else{
    	  	  	insertAfterTd$ = currentTr$.children("td").filter(function(){
    	  	  	  return (getRightAxis($(this)) <= insertAxis);
    	  	    }).last();
    	  	    insertAfterTd$.after(newTd$);
    	  	  }
    	  	  
    	  	  newTd$.data("xAxis",$(this).data("xAxis"));
    	  	  newTd$.data("yAxis",$(this).closest("tbody").children("tr").index($(this).parent("tr")));
    	  	  $.each(newTd$.nextAll(),function(){
    	  	  	if($(this).is(insertBodyTd$)){
    	  	  			return true;
    	  	  	}
    	  	  	$(this).data("xAxis",$(this).data("xAxis")+1);
    	  	  });

    	  	  newTd$.addClass("ui-selectee");
    		
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
    	  		rowCount--;
    	  		currentTr$ = currentTr$.next();
    	  	}
    	  	insertBodyTd$.data("xAxis",insertBodyTd$.data("xAxis") + 1);
    	  }else{
    	  	var newTd$ = $("<td><div></div></td>");
    	  	newTd$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"});
    	  	$(this).before(newTd$);
    	  	 newTd$.data("xAxis",$(this).data("xAxis"));
    	  	 newTd$.data("yAxis",$(this).closest("tbody").children("tr").index($(this).parent("tr")));
    	  	 $.each(newTd$.nextAll(),function(){
    	  	   $(this).data("xAxis",$(this).data("xAxis")+1);
    	  	 });
    	  	 
    	  	newTd$.addClass("ui-selectee");
    		
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
    	  } 		

    		
      });
    });
    function getRowspan(cell$){
    	return (cell$.attr("rowspan") == undefined ? 1 : parseInt(cell$.attr("rowspan")));
    }
    function getColspan(cell$){
    	return (cell$.attr("colspan") == undefined ? 1 : parseInt(cell$.attr("colspan")));
    }
    /*��Ԫ���������*/
    $(settings.addColumnAfter).click(function(event){
    	event.preventDefault();
    	if (container$.find("td.ui-selected").size() == 0) {
    		return;
    	}
    	var currCell$ = container$.find("td.ui-selected").last();
    	var insertAxis = getRightAxis(currCell$);
    	
    	colNum++;
    	var headTdWidth = settings.width / colNum;
    	var insertHeadTd$ = thead$.find("tr").children("td").filter(function(index){
    		return (($(this).siblings().andSelf().slice(1).index($(this)) + 1) == parseInt(insertAxis));
    	});
    	insertHeadTd$.after($("<td></td>"));
    	$.each(thead$.find("td"),function(){
    		$(this).css("width",headTdWidth);
    	});
    	var insertBodyTds$ = tbody$.find("tr td").filter(function(){
    		return (getRightAxis($(this)) == insertAxis);
    	});
    	
      $.each(insertBodyTds$,function(){
      	var currentTr$ = $(this).parent("tr");
        if(getRowspan($(this)) > 1){
        	var rowCount = getRowspan($(this));
        	while(rowCount >= 1){
    	  		var newTd$ = $("<td><div></div></td>");
    	  	  newTd$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"});
            
    	  	  var insertAfterTd$ = currentTr$.children("td").filter(function(){
    	  	  	return (getRightAxis($(this)) <= insertAxis);
    	  	  }).last();
    	  	  var insertBeforeTd$;
    	  	  if(insertAfterTd$.size() == 1){
    	  	  	insertAfterTd$.after(newTd$);
    	  	  }else{
    	  	  	insertBeforeTd$ = currentTr$.children("td").filter(function(){
    	  	  	  return ($(this).data("xAxis") >= insertAxis);
    	  	    }).first();
    	  	    insertBeforeTd$.before(newTd$);
    	  	  }

    	  	  newTd$.data("xAxis",$(this).data("xAxis") + 1);
    	  	  newTd$.data("yAxis",$(this).closest("tbody").children("tr").index($(this).parent("tr")));
    	  	  $.each(newTd$.nextAll(),function(){
    	  	  	$(this).data("xAxis",$(this).data("xAxis")+1);
    	  	  });
    	  	  newTd$.addClass("ui-selectee");
    		
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
    	  		rowCount--;
    	  		currentTr$ = currentTr$.next();
    	  	}
        }else{
        	var newTd$ = $("<td><div></div></td>");
    	  	newTd$.find("div").css({"width":"100%","height":"100%","margin":"0","padding":"0"});
    	  	$(this).after(newTd$);
    	  	 newTd$.data("xAxis",$(this).data("xAxis")+1);
    	  	 newTd$.data("yAxis",$(this).closest("tbody").children("tr").index($(this).parent("tr")));
    	  	 $.each(newTd$.nextAll(),function(){
    	  	   $(this).data("xAxis",$(this).data("xAxis")+1);
    	  	 });
    	  	 
    	  	newTd$.addClass("ui-selectee");
    		
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
        }
      });
    });
    /*����ɾ��*/
    $(settings.deleteColumn).click(function(event){
    	var count = 0;
    	var leftBorderAxis = container$.find("tbody tr td.ui-selected").first().data("xAxis");
    	var rightBorderAxis = getRightAxis(container$.find("tbody tr td.ui-selected").last());
    	var scope = rightBorderAxis - leftBorderAxis;
    	var deleteHeadTds$ = thead$.find("tr").children("td").filter(function(index){
    		return ($(this).siblings().andSelf().slice(1).index($(this)) >= leftBorderAxis &&
    		  ($(this).siblings().andSelf().slice(1).index($(this)) + 1) <= rightBorderAxis);
    	});
    	colNum = colNum - deleteHeadTds$.size();
    	deleteHeadTds$.remove();
    	var headTdWidth = settings.width / colNum;
    	$.each(container$.find("thead td"),function(){
    		$(this).css("width",headTdWidth);
    	});
    	
    	
      $.each(container$.find("td.ui-selectee"),function(){
      	var leftAxis = $(this).data("xAxis");
      	var rightAxis = getRightAxis($(this));
      	if(leftAxis < rightBorderAxis && rightAxis > leftBorderAxis){
      		if(leftAxis >= leftBorderAxis && rightAxis <= rightBorderAxis){
      			$(this).remove();
      		}else if(leftAxis < leftBorderAxis){
      			var rowspan = parseInt($(this).attr("rowspan")) - (rightAxis - leftBorderAxis);
      			$(this).attr("rowspan",rowspan);
      		}else if(rightAxis > rightBorderAxis){
      			var rowspan = parseInt($(this).attr("rowspan")) - (rightBorderAxis - leftAxis);
      			$(this).attr("rowspan",rowspan);
      		}
      	}
      	
      });
      /*��������*/
      container$.find("td.ui-selectee").filter(function(){
      	return ($(this).data("xAxis") >= rightBorderAxis);
      }).each(function(){
      	$(this).data("xAxis",($(this).data("xAxis")-scope));
      });

    	
    });
    //mark
    /*����ɾ��*/
    $(settings.deleteLine).click(function(event){
    	var selectedCells$ = container$.find("td.ui-selected");
    	var yMinIndex;
    	var yMaxIndex;
    	if (container$.find("td.ui-selected").size() < 1) {
    		return;
    	}
    	$.each(selectedCells$,function(){
    		//alert($(this).data("yAxis"));
    		yMinIndex = (yMinIndex < parseInt($(this).data("yAxis")) ? 
    					yMinIndex : parseInt($(this).data("yAxis")));
    	  var temp1 = getBottomAxis($(this));
    	  //alert("temp1:" + temp1);
    		yMaxIndex = (yMaxIndex > temp1 ? yMaxIndex : temp1);
    	});
    	//alert("yMinIndex:" + yMinIndex);
    	//alert("yMaxIndex:" + yMaxIndex);
    	var removedTrs$ = container$.find("tbody tr").filter(function(index){
    		var trIndex = $(this).index();
    		return (trIndex>= yMinIndex && trIndex <= (yMaxIndex - 1));
    	});
    	container$.find("td.ui-selectee").each(function(index){
    		var yTop = $(this).data("yAxis");
    		var yBottom = getBottomAxis($(this));
    		if (yBottom > yMinIndex && yTop < yMinIndex) {
    			var minusAxis = yBottom - yMinIndex;
    			$(this).attr("rowspan",parseInt($(this).attr("rowspan")) - minusAxis);
    		} else if (yTop == yMinIndex && yBottom > yMaxIndex) {
    			var rowspan = yBottom - yMaxIndex;
    			$(this).attr("rowspan",rowspan);

    			var nextTr$ = $(this).parent("tr").next();
    			var cloneTd$ = $(this).clone(true);
    			var xLeftAxis = $(this).data("xAxis");
    			var xRightAxis = getRightAxis($(this));
    			
    			var leftTds$ = nextTr$.children("td").filter(function(){
    				return (xLeftAxis >= getRightAxis($(this)));
    			});
    			var rightTds$ = nextTr$.children("td").filter(function(){
    				return ($(this).data("xAxis") >= xRightAxis);
    			});
    		  if (rightTds$.size()>0) {
    		  	cloneTd$.data("yAxis",yMaxIndex);
    		  	rightTds$.first().before(cloneTd$);
    		  	var plusXAxis = parseInt(cloneTd$.attr("colspan"));  //������x����ֵ
    		  	rightTds$.each(function(){
    		  		var tempXAxis = $(this).data("xAxis");
    		  		
    		  		$(this).data("xAxis",tempXAxis + plusXAxis);
    		  	});
    		  } else {
    		  	cloneTd$.data("yAxis",yMaxIndex);
    		  	leftTds$.last().after(cloneTd$);
    		  	var plusXAxis = parseInt(cloneTd$.attr("colspan"));  //������x����ֵ
    		  	var updateTds$ = nextTr$.children("td").not(leftTds$).slice(1);
    		  	updateTds$.each(function(){
    		  		var tempXAxis = $(this).data("xAxis");
    		  		$(this).data("xAxis",tempXAxis + plusXAxis);
    		  	});
    		  	
    		  }
    			
    		}
    		
    	});
    	//alert(removedTrs$.html());
    	$.each(removedTrs$,function(){
    		$(this).remove();
    		rowNum--;
    	});
    	
    	 
    	//����Y����ֵ
    	//$.each(container$.find("td.ui-selectee"),function(){
        //$(this).data("yAxis",$(this).closest("tbody").children("tr").index($(this).parent("tr")));
    	//});
    	
    	
    	
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
    //����colspan
    function getSelectedColspan(firstCell$,selectedCells$){
     	xAxisStart = firstCell$.data("xAxis");
     	xAxisEnd = getXAxisEnd(selectedCells$);
     	colspan = eval(xAxisEnd - xAxisStart);
     	return colspan;
    }
    /*����rowspan*/    
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
  
    /*���ɱ��*/
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
    			//appendtd$.find(">div").text("").append("<textarea style='overflow:hidden;margin:0;padding:0;width:100%;'/>");
    			tr$.append(appendtd$);
    		}
    		tr$.prepend($("<th></th>"));
    		tbody$.append(tr$);
    		table$.append(tbody$);
    	}

			container$.append(table$);
			var filterTd$ = container$.find("tbody td");
    	filterTd$.addClass("ui-selectee");
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
        
    	});
    	refreshSelectedStatus();

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
    /*��Ԫ�񵥻��¼�*/
   	function cellClick(event){
			var td = $(this),tdDiv = td.find(">div");
			td.addClass("ui-state-active");
			
			if(!event.ctrlKey){ //many select
				tbody$.find("td.ui-selected").removeClass("ui-selected");
			}
			tbody$.find("td.ui-state-active").removeClass("ui-state-active");//rowHeader colHeader
			td.addClass("ui-selected");
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
		 * ����򽹵��Ƴ�ʱ�¼�,��������滻Ϊ�ı�
		 */
		function editorFocusOut(event){//TODO style
			var textarea = $(this),tdText=textarea.val();
			textarea.replaceWith(tdText);
			event.stopPropagation();
			return false;
		};
		/**
		 * ��Ԫ���ڿ���������µ���ʱ�¼�
		 */
		function editorKeyUp(event){ //TODO style
			var textarea = $(this),text = textarea.val();
		};
    
    /*ѡ��Ԫ���������±��״̬*/
    function refreshSelectedStatus(){
    	selectedCells$ = container$.find(".ui-selected"); //���б�ѡ��ĵ�Ԫ��
      currentTable$ = container$.find("table");  //��ǰ���
      thead$ = container$.find("thead");
      tbody$ = container$.find("tbody");
      rows$ = container$.find("tr");  //���е���
      selectedRows$ = tbody$.find("tr:has(td.ui-selected)");  //���б�ѡ�����
      firstCell$ = selectedCells$.first();  //��ѡ�еĵ�һ����Ԫ�񣬱��ĺϲ����ڵ�һ���� Ԫ��������rowspan��colspan
      lastCell$ = selectedCells$.last();
      removedCells$ = selectedCells$.slice(1);  //��Ҫ��ɾ���ĵ�Ԫ��
    }

    /*ˢ�±������*/
    function initData(){
    	$.each(container$.find("td.ui-selectee"),function(){
    		if($(this).siblings().andSelf().slice(1).index($(this)) == 0){
    			$(this).data("xAxis",0);
    		} else {
    			var xAxis = parseInt($(this).prev().data("xAxis")) + 
    			  parseInt($(this).prev().attr("colspan") == undefined ? 1 : $(this).prev().attr("colspan"));
    			$(this).data("xAxis",xAxis);
    		}
        $(this).data("yAxis",$(this).closest("tbody").children("tr").index($(this).parent("tr")));
    	});
    }
    function getRightAxis(cell$) {
    		return parseInt(cell$.data("xAxis")) + 
    	    parseInt(cell$.attr("colspan") == undefined ? 1 : cell$.attr("colspan"));
    }
    function getBottomAxis(cell$) {
    		return parseInt(cell$.data("yAxis")) + 
    	    parseInt(cell$.attr("rowspan") == undefined ? 1 : cell$.attr("rowspan"));
    }
    /*��ѡ��*/
    table$.selectable({
    	filter:"tbody td",
    	distance:10,
    	start:function(event,ui) {
    	},
    	stop:function(event,ui){
    		refreshSelectedStatus();
    	},
    	selected:function(event,ui) {
    		//alert("selected");
    	},
    	selecting:function(event,ui) {
    		createHelper(event,ui);
    	}
    });
    /*����ѡ������*/
    function createHelper(event,ui) {
    	var newCell$ = $(ui.selecting);  //�����ĵ�Ԫ��
    	var selectingCells$ = container$.find("td.ui-selecting");
    	var first$ = selectingCells$.first();  //������Ϊ���ȽϵĶ���
    	var xMinIndex = parseInt(first$.data("xAxis"));
    	var xMaxIndex = parseInt(first$.data("xAxis")) + 
    	    parseInt(first$.attr("colspan") == undefined ? 1 : first$.attr("colspan"));
    	
    	var yMinIndex = parseInt(first$.data("yAxis"));
    	var yMaxIndex = parseInt(first$.data("yAxis")) + 
        	    parseInt(first$.attr("rowspan") == undefined ? 1 : first$.attr("rowspan"));
    	findCellsInner();

    	
    	function analyseBorder(selectingCells$) {
    		$.each(selectingCells$,function(){
    			xMinIndex = (xMinIndex < parseInt($(this).data("xAxis")) ? 
    					xMinIndex : parseInt($(this).data("xAxis")));
    			yMinIndex = (yMinIndex < parseInt($(this).data("yAxis")) ? 
    					yMinIndex : parseInt($(this).data("yAxis")));
    	    var temp1 = getRightAxis($(this));
    	    var temp2 = getBottomAxis($(this));
    			xMaxIndex = (xMaxIndex > temp1 ? xMaxIndex : temp1);
    			yMaxIndex = (yMaxIndex > temp2 ? yMaxIndex : temp2);
    			
    		});
    	}
    	function findCellsInner() {
    		analyseBorder(container$.find("td.ui-selecting"));
    		var unSelectedCells$ = container$.find("td.ui-selectee").not("td.ui-selecting");
    		$.each(unSelectedCells$,function(){
    			var xLeft = parseInt($(this).data("xAxis"));
    			var xRight = getRightAxis($(this));
    			var yTop = parseInt($(this).data("yAxis"));
    			var yBottom = getBottomAxis($(this));
    			/*�õ�Ԫ��ȫ���򲿷��ڸ÷�Χ��*/
    			if(xLeft < xMaxIndex && xRight > xMinIndex && yTop < yMaxIndex && yBottom > yMinIndex){
    				$(this).addClass("ui-selecting");
    				/*��ȫ�ڸ÷�Χ��*/
    				if(!(xLeft >= xMinIndex && xRight <= xMaxIndex && yTop >=yMinIndex && yBottom <= yMaxIndex)){
    		    	findCellsInner();
    		    }
    				
    			}
    			
    		});
    	}
    	
    }
    

  };
})(jQuery);

