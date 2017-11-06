/**
 *
 */
package com.web.entity;

import java.util.Date;

/**
 * @comment: app前段应用下载管理 bean --> T_APP_DOWNLOAD
 * @create: 2015-11-4  付政 
 */
public class AppDownload {

	/**
	 * 版本号
	 */
	private String version;
	
	/**
	 * 下载路径
	 */
	private String downloadUrl;
	
	/**
	 * 上载日期
	 */
	private Date uploadDate;

	/**
	 * 版本标题
	 */
	private String title;
	
	/**
	 * 操作系统
	 */
	private String os;
	
	/**
	 * 设备
	 */
	private String device;
	
	/**
	 * 分页工具类
	 */
	private Page page;
	
	/**
	 * @return the version
	 */
	public String getVersion() {
		return version;
	}

	/**
	 * @param version the version to set
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * @return the downloadUrl
	 */
	public String getDownloadUrl() {
		return downloadUrl;
	}

	/**
	 * @param downloadUrl the downloadUrl to set
	 */
	public void setDownloadUrl(String downloadUrl) {
		this.downloadUrl = downloadUrl;
	}

	/**
	 * @return the uploadDate
	 */
	public Date getUploadDate() {
		return uploadDate;
	}

	/**
	 * @param uploadDate the uploadDate to set
	 */
	public void setUploadDate(Date uploadDate) {
		this.uploadDate = uploadDate;
	}

	
	/**
	 * @return the page
	 */
	public Page getPage() {
		return page;
	}

	/**
	 * @param page the page to set
	 */
	public void setPage(Page page) {
		this.page = page;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the os
	 */
	public String getOs() {
		return os;
	}

	/**
	 * @param os the os to set
	 */
	public void setOs(String os) {
		this.os = os;
	}

	/**
	 * @return the device
	 */
	public String getDevice() {
		return device;
	}

	/**
	 * @param device the device to set
	 */
	public void setDevice(String device) {
		this.device = device;
	}

	/**	
	 * @comment: 
	 * @history: 2015-11-4 付政
	 * @see java.lang.Object#toString()
	 * @return	
	 */
	@Override
	public String toString() {
		return "AppDownload [version=" + version + ", downloadUrl=" + downloadUrl + ", uploadDate="
				+ uploadDate + ", title=" + title + ", os=" + os + ", device=" + device + ", page="
				+ page + "]";
	}
	
}
