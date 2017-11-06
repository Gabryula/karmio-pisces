package com.web.entity;

import java.io.Serializable;

/**
 * <p> 描述: 分页实体</p>
 * <p/>
 * <p> Create Date: 12-5-28  下午5:03 <p>
 *
 * @author Joy.zou
 * @version 1.0
 */
public class Page implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//每页显示记录数
    private int showCount = 10;
	//总页数
    private int totalPage;
	//总记录数
    private int totalResult;
    //当前页
    private int currentPage;
	//当前记录起始索引
    private int currentResult;
    //终止位置记录索引
    private int lastResult;
	//true:需要分页的地方，传入的参数就是Page实体；false:需要分页的地方，传入的参数所代表的实体拥有Page属性
    private boolean entityOrField;
    //记忆标志
    private int there;
    //html分页div
    private String pageAndBtnDIV;
    
	public int getTotalPage() {
		if(totalResult%showCount==0)
			totalPage = totalResult/showCount;
		else
			totalPage = totalResult/showCount+1;
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getTotalResult() {
		return totalResult;
	}
	public void setTotalResult(int totalResult) {
		this.totalResult = totalResult;
	}
	public int getCurrentPage() {
		if(currentPage>getTotalPage())
			currentPage = getTotalPage();
		if(currentPage<=0)
			currentPage = 1;
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	
	/**
	 * @param pageAndBtnDIV the pageAndBtnDIV to set
	 */
	public void setPageAndBtnDIV(String pageAndBtnDIV) {
		this.pageAndBtnDIV = pageAndBtnDIV;
	}
	/**
	 * @param pageAndBtnDIV the pageAndBtnDIV to get
	 */
	public String getPageAndBtnDIV(){
		StringBuffer sb = new StringBuffer("");
		if(this.getTotalPage() >= 1){
			sb.append("<ul>");
			int in = this.getCurrentPage() / 10;
			int pre1 = 1;
			if(this.getCurrentPage() % 10 == 0){
				in = in - 1;
			}
			pre1 = in * 10 + 1;
			int pre = this.getCurrentPage() - 1;
			if(this.getCurrentPage() == 1){
				sb.append("<li style=\"padding:0px 6px;\">首页</li>");
				sb.append("<li style=\"padding:0px 6px;\">上页</li>");
			}else{
				sb.append("<li><a href=\"#@\" class=\"pageinfo\" data=1>首页 </a></li>");
				sb.append("<li><a href=\"#@\" class=\"pageinfo\" data="+pre+">上页</a></li>");
			}
			int end = this.getTotalPage();
			if(end > pre1 + 9){
				end = pre1 + 9;
			}
			for(int i = pre1;i <= end;i++){
				if(i == this.getCurrentPage()){
					sb.append("<li style=\"padding:0px 6px;\" class=\"current\">"+i+"</li>");
				}else{
					sb.append("<li><a href=\"#@\" class=\"pageinfo\" data="+i+">"+i+"</a></li>");
				}
			}
			int next = this.getCurrentPage() + 1;
			if(this.getCurrentPage() == this.getTotalPage()){
				sb.append("<li style=\"padding:0px 6px;\">下页</li>");
				sb.append("<li style=\"padding:0px 6px;\">尾页</li>");
			}else{
				sb.append("<li><a href=\"#@\" class=\"pageinfo\" data="+next+">下页</a></li>");
				sb.append("<li><a href=\"#@\" class=\"pageinfo\" data="+this.getTotalPage()+">尾页</a></li>");
			}
			sb.append("<li style=\"padding:0px 6px;\">共"+this.getTotalPage()+"页</li>");
			sb.append("&nbsp;&nbsp;到");
			sb.append("<input id=\"goPageText\" value=\"\" style=\"height:17px;width:30px;margin:0px 3px;\">");
			sb.append("页&nbsp;");
			sb.append("<input type=\"button\" value=\"Go\" class=\"goPageBtn\" style=\"border:1px solid #CCCCCC;padding:0px 6px;cursor:pointer;height:22px;color:#555\">");
			sb.append("</ul>");
			sb.append("<script type=\"text/javascript\">");
			sb.append("$(document).ready(function() {");
			sb.append("$('.goPageBtn').click(function() {");
			sb.append("var currentpage = $(\"#goPageText\").val();");
			sb.append("var reg = /^[1-9][0-9]*$/;");
			sb.append("if(!reg.test(currentpage)){");
			sb.append("alert(\"请输入数字!\");");
			sb.append("$(\"#goPageText\").val(\"\");");
			sb.append("}else{");
			sb.append("if(currentpage > " + this.getTotalPage() + "){");
			sb.append("alert(\"超过最大页数!\");");
			sb.append("$(\"#goPageText\").val(\"\");");
			sb.append("}else{");
			sb.append("$(\"#pagenum\").val(currentpage);");
			sb.append("$(\"#form1\").submit();");
			sb.append("}");
			sb.append("}");
			sb.append("});");
			sb.append("});");
			sb.append("</script>");
		}else{
			sb.append("<div style=\"text-align:center;width:100%\">无相关数据!</div>");
		}
		pageAndBtnDIV = sb.toString();
		return pageAndBtnDIV;
	}
	
	public int getShowCount() {
		return showCount;
	}
	public void setShowCount(int showCount) {
		this.showCount = showCount;
	}
	public int getCurrentResult() {
		currentResult = (getCurrentPage()-1)*getShowCount();
		if(currentResult<0)
			currentResult = 0;
		return currentResult;
	}
	public void setCurrentResult(int currentResult) {
		this.currentResult = currentResult;
	}
	public boolean isEntityOrField() {
		return entityOrField;
	}
	public void setEntityOrField(boolean entityOrField) {
		this.entityOrField = entityOrField;
	}
	public int getLastResult() {
		return lastResult;
	}
	public void setLastResult(int lastResult) {
		this.lastResult = lastResult;
	}
	
	/**
	 * @return the there
	 */
	public int getThere() {
		return there;
	}
	/**
	 * @param there the there to set
	 */
	public void setThere(int there) {
		this.there = there;
	}
	/**	
	 * @comment: 
	 * @history: 2015-11-10 付政
	 * @see java.lang.Object#toString()
	 * @return	
	 */
	@Override
	public String toString() {
		return "Page [showCount=" + showCount + ", totalPage=" + totalPage + ", totalResult="
				+ totalResult + ", currentPage=" + currentPage + ", currentResult=" + currentResult
				+ ", lastResult=" + lastResult + ", entityOrField=" + entityOrField + ", there="
				+ there + ", pageAndBtnDIV=" + pageAndBtnDIV + "]";
	}
	
}
