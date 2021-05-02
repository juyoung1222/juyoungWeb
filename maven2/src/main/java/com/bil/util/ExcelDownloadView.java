package com.bil.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

public class ExcelDownloadView extends AbstractView{

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String fileUploadPath = (String)model.get("fileUploadPath");
		String filePhysicalName = (String)model.get("filePhysicalName");
		String fileLogicalName = (String)model.get("fileLogicalName");
		
		File file = new File(fileUploadPath + filePhysicalName);
		
		String userAgent = request.getHeader("User-Agent");
		int contentLength = (int)file.length();
		
		boolean le = userAgent.indexOf("Chrome") > -1;
		
		if(le == true) {
			fileLogicalName = URLEncoder.encode(fileLogicalName,"UTF-8");
		}else {
			fileLogicalName = new String(fileLogicalName.getBytes("UTF-8"), "ISO-8859-1");
			
		}
		
		response.setContentType("application/download;charset=utf-8");
		response.setContentLength(contentLength);
		response.setHeader("Content-Disposition", "attachment:filename=\"" + fileLogicalName + "\";");
		response.setHeader("Content-Transfer-Encoding", "binary");
		
		OutputStream out = response.getOutputStream();
		FileInputStream fis = null;
		
		try {
			fis = new FileInputStream(file);
			FileCopyUtils.copy(fis, out);
			out.flush();
		} catch (Exception e) {
			
		}finally {
			if(fis != null) {
				try {
					fis.close();
				} catch (IOException ioe) {
					
				}
			}
			if(out != null) {
				try {
					out.close();
				} catch (IOException ioe) {
					
				}
			}
		}
		
	}
	
}
