/**
 *
 */
package com.web.mapper;

import java.util.List;

import com.web.entity.AppDownload;

/**
 * @comment: app前段应用下载管理 mapper
 * @create: 2015-11-4  付政 
 */
public interface AppDownloadMapperInterface {

	/**
	 * @comment: 获取app应用总数量
	 * @history: 2015-11-4 付政
	 * @param appDownload
	 * @return
	 */
	public int getCountAppDownload(AppDownload appDownload);
	
	/**
	 * @comment: 分页查询app应用总数量
	 * @history: 2015-11-4 付政
	 * @param appDownload
	 * @return
	 */
	public List<AppDownload> selectAppDownloadPageList(AppDownload appDownload);
}
