/**
 *
 */
package com.web.service;

import java.util.List;

import com.web.entity.AppDownload;

/**
 * @comment: app前段应用下载管理 业务层
 * @create: 2015-11-4  付政 
 */
public interface AppDownloadServiceInterface {

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
