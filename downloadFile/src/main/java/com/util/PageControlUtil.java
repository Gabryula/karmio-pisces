/**
 *
 */
package com.util;

import com.web.entity.Page;

/**
 * @comment: controller层 分页工具类
 * @create: 2015-11-5  付政 
 */
public class PageControlUtil {

	private static final int PER_NUM = 10;
	public static Page getPageControl(int totalnum,Page page2){
		//总记录数
		page2.setTotalResult(totalnum);
		//设置每页展示数据条数
		page2.setShowCount(PER_NUM);
		if(page2.getCurrentPage() == 1){
			//设置当前页
			page2.setCurrentPage(1);
			//设置总页数
			if(totalnum % page2.getShowCount() == 0){
				page2.setTotalPage(totalnum/page2.getShowCount());
			}else{
				page2.setTotalPage(totalnum/page2.getShowCount() + 1);
			}
		}
		//设置记录起始索引
		page2.setCurrentResult((page2.getCurrentPage() - 1) * page2.getShowCount());
		//设置记录终止索引
		page2.setLastResult((page2.getCurrentPage() - 1) * page2.getShowCount() +
				page2.getShowCount());
		return page2;
	}
}
