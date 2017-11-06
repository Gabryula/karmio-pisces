/**
 *	app版本下载
 */
package com.web.controller;

import java.awt.Desktop;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.util.PageControlUtil;
import com.web.entity.AppDownload;
import com.web.entity.Page;
import com.web.service.AppDownloadServiceInterface;

/**
 * @comment:
 * @create: 2015-11-4 付政
 */
@Controller
@RequestMapping("file")
public class AppDownloadController {

	@Autowired
	private AppDownloadServiceInterface appDownloadService;
	
	private final static Log log = LogFactory.getLog(AppDownloadController.class);
	/**
	 * @comment: 进入下载页面
	 * @history: 2015-11-4 付政
	 * @return
	 */
	@RequestMapping("goDownFile")
	public ModelAndView goDownFile(AppDownload appDownload,Page page2){
		ModelAndView mv = new ModelAndView();
		try{
			//获取日志总条数
			int totalnum = appDownloadService.getCountAppDownload(appDownload);
			page2 = PageControlUtil.getPageControl(totalnum, page2);
			appDownload.setPage(page2);
			if(totalnum > 0){
				List<AppDownload> appDownloadList = 
						appDownloadService.selectAppDownloadPageList(appDownload);
				mv.addObject("appDownloadList", appDownloadList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		mv.setViewName("download/fileDown");
		mv.addObject("page2", page2);
		mv.addObject("appDownload", appDownload);
		return mv;
	}
	
	/**
	 * @comment: 文件下载
	 * @history: 2015-11-4 付政
	 * @param response
	 */
	@RequestMapping("download")
	public void fileDownload(HttpServletResponse response,@RequestParam String fileName) {
		try {
			//在系统参数表中得到文件存放路径
//			String appPath = commonService.getSysParamValue("APP", "APPPATH");
			String appPath = "d:/";
			//拼接路径和文件名 得到完整路径
			File file = new File(appPath + fileName);
			if(file.exists()){
				// 1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
				response.setContentType("multipart/form-data");
				// 2.设置文件头：最后一个参数是设置下载文件名
				response.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
				ServletOutputStream out;
				// 通过文件路径获得File对象(假如此路径中有一个download.pdf文件)
				FileInputStream inputStream = new FileInputStream(file);
				// 3.通过response获取ServletOutputStream对象(out)
				out = response.getOutputStream();
				int b = 0;
				byte[] buffer = new byte[512];
				while (b != -1) {
					b = inputStream.read(buffer);
					// 4.写到输出流(out)中
					out.write(buffer, 0, b);
				}
				inputStream.close();
				out.close();
				out.flush();
			}else{
				log.debug("文件未找到");
				this.writeJsonResponse(response, "下载资源未找到!");
			}
		} catch (IOException e) {
			log.debug("下载出现异常"+e.getMessage());
			this.writeJsonResponse(response, "下载出现异常!");
		} catch (ArrayIndexOutOfBoundsException e) {
			log.debug("忽略，输出流冲突");
		} catch (Exception e) {
			log.debug("程序发生异常"+e.getMessage());
			this.writeJsonResponse(response, "程序发生异常!");
		}
	}
	
	/**
	 * @comment: 输出json到页面
	 * @history: 2015-11-4 付政
	 * @param response
	 * @param jsonStr
	 */
	private void writeJsonResponse(HttpServletResponse response, String jsonStr) {
		try {
			response.setContentType("text/json;charset=utf-8");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(jsonStr);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		Desktop desk=Desktop.getDesktop();  
		try  
		{  
		    File file=new File("E:/eclipse汉化包.rar");//创建一个java文件系统  
		    desk.open(file); //调用open（File f）方法打开文件   
		}catch(Exception e)  
		{  
		    System.out.println(e.toString());  
		}  
		
	}
}