package com.bil.common.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bil.account.vo.Account1VO;
import com.bil.common.service.CommonService;



import egovframework.example.sample.service.SampleDefaultVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("commonService")
public  class CommonServiceImpl implements CommonService {

//	@Resource(name="commonService")
//	private CommonService commonService;
	
	
	@Resource(name="commonDAO")
	private CommonDAO commonDAO;
	
	
	
	
	public int insert(Account1VO account1VO) throws Exception{
		System.out.println("serviceimpl : "  + account1VO);
		return commonDAO.insert(account1VO);
//		//return commonMapper.insert(inOutMap);
	} 
	

	@Override
	public List<EgovMap> selectCombo(Map<String, Object> inOutMap) throws Exception {
		System.out.println("serviceimpl : " + inOutMap);
		return commonDAO.selectCombo(inOutMap);
	}
	
	
	public int update(Account1VO account1VO) throws Exception {
		System.out.println("serviceimpl : " + account1VO);
		return commonDAO.update(account1VO);
		
	}
	
//	public Map<String, Object> selectList(Map<String, Object> inOutMap) throws Exception{
//		System.out.println("serviceimpl : " + inOutMap );
//		return commonDAO.selectList(inOutMap);
//	}
	
	public List<Account1VO> selectList(SampleDefaultVO searchVO) throws Exception{
		System.out.println("serviceimpl : " + searchVO);
		return commonDAO.selectList(searchVO);
	}
	
//	public int select(SampleDefaultVO searchVO) throws Exception{
//		System.out.println("serviceimpl : " + searchVO);
//		return commonDAO.select(searchVO);
//	}
	
	
	
	public List<Account1VO> fileDownload(HttpServletResponse response) throws Exception{
		System.out.println("serviceimpl : " + response);
		 return commonDAO.fileDownload(response);
	}


	@Override
	public int selectOne(SampleDefaultVO searchVO) throws Exception {
		System.out.println("serviceimpl : " + searchVO);
		return commonDAO.selectOne(searchVO);
	}



	



}
