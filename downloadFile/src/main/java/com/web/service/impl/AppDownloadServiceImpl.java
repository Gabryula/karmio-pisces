/**
 *
 */
package com.web.service.impl;

import java.util.List;

import com.web.entity.AppDownload;
import com.web.mapper.AppDownloadMapperInterface;
import com.web.service.AppDownloadServiceInterface;

/**
 * @comment: app前段应用下载管理 业务实现层
 * @create: 2015-11-4  付政 
 */
public class AppDownloadServiceImpl implements AppDownloadServiceInterface {

	private AppDownloadMapperInterface appDownloadMapper;
	/**
	 * @comment: 获取app应用总数量
	 * @history: 2015-11-4 付政
	 * @param appDownload
	 * @return
	 */
	public int getCountAppDownload(AppDownload appDownload){
		return appDownloadMapper.getCountAppDownload(appDownload);
	}
	
	/**
	 * @comment: 分页查询app应用总数量
	 * @history: 2015-11-4 付政
	 * @param appDownload
	 * @return
	 */
	public List<AppDownload> selectAppDownloadPageList(AppDownload appDownload){
		return appDownloadMapper.selectAppDownloadPageList(appDownload);
	}

	/**
	 * @return the appDownloadMapper
	 */
	public AppDownloadMapperInterface getAppDownloadMapper() {
		return appDownloadMapper;
	}

	/**
	 * @param appDownloadMapper the appDownloadMapper to set
	 */
	public void setAppDownloadMapper(AppDownloadMapperInterface appDownloadMapper) {
		this.appDownloadMapper = appDownloadMapper;
	}
	
	
}
