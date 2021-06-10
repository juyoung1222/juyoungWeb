package com.bil.common.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bil.account.vo.Account1VO;

import egovframework.example.sample.service.SampleDefaultVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface CommonService {

	public int insert(Account1VO account1VO) throws Exception; 
	
	//public int insert(Account1VO account1VO) throws Exception;
	
	public List<EgovMap> selectCombo(Map<String, Object> inOutMap) throws Exception;
	
	public int update(Account1VO account1VO) throws Exception;
	
	public List<Account1VO> selectList(SampleDefaultVO searchVO) throws Exception;
	
	//public List<Account1VO> selectList() throws Exception;
	
	public List<Account1VO> fileDownload(HttpServletResponse response) throws Exception;

	public int selectOne(SampleDefaultVO searchVO) throws Exception;
	
	
	
	


}
