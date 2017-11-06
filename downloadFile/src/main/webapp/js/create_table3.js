//初始化行编号
var trId = 0;
//添加一行
function addTr(){
	var tr = $("#template").clone();
	tr.attr("id", "pr"+trId);
	trId++;
	tr.show();
	$("#container").append(tr);
}
//删除一行
function deleteTr(onthis) {
	$($(onthis)[0].parentNode.parentNode).remove();
	$("tr").each(function(index) {
		setTrId($(this));
	});
}
//设置行编号
function setTrId(tr) {
	tr.find("input, select, textarea")
	.not(":submit, :reset, :image, [disabled]").each(function(i){
		this.id = this.id.replace(/\d/, trId);
		this.name = this.name.replace(/\d/, trId);
	});
	trId++;
}
//初始化行编号
var trId2 = 0;
//添加一行
function addTr2(onthis){
	var tr2 = $("#template2").clone();
	tr2.attr("id", "jr"+trId2);
	trId2++;
	tr2.show();
	var trIds =  $(onthis).closest('tr').attr('id'); 
	$("#"+trIds+"  #container2").append(tr2);
}
//删除一行
function deleteTr2(onthis) {
	$($(onthis)[0].parentNode.parentNode).remove();
	$("tr").each(function(index) {
		setTrId2($(this));
	});
}
//设置行编号
function setTrId2(tr) {
	tr.find("input, select, textarea")
	.not(":submit, :reset, :image, [disabled]").each(function(i){
		this.id = this.id.replace(/\d/, trId);
		this.name = this.name.replace(/\d/, trId);
	});
	trId2++;
}