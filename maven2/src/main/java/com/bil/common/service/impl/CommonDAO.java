package com.bil.common.service.impl;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.bil.account.vo.Account1VO;

import egovframework.example.sample.service.SampleDefaultVO;
import egovframework.rte.fdl.cmmn.exception.EgovBizException;
import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("commonDAO")
public class CommonDAO extends EgovAbstractMapper{

	public int insert(Account1VO account1VO)  throws EgovBizException{
		System.out.println("dao  : " + account1VO);
		return insert("Common.insert", account1VO);
	}
	
	
//	public int insert(Account1VO account1VO, Map<String, Object> inOutMap) throws Exception{
//		System.out.println("dao : " + account1VO +inOutMap);
//		return insert("Common.insert", inOutMap);
//	}
	
	public List<EgovMap> selectCombo( Map<String, Object> inOutMap) throws EgovBizException{
		
		System.out.println("dao : " +  inOutMap);
		return selectList("Common.selectCombo", inOutMap );
	}
	
	public int update(Account1VO account1VO) throws Exception{
		System.out.println("dao : " + account1VO);
		return update("Common.update",account1VO);
	}

	public List<Account1VO> selectList(SampleDefaultVO searchVO) throws Exception{
		System.out.println("dao : "  + searchVO);
		return selectList("Common.selectList" , searchVO);
	}
//	
//	public Map<String, Object> selectList(Map<String, Object> inOutMap) throws Exception{
//		System.out.println("dao : " + inOutMap);
//		return (Map<String, Object>)selectList("Common.selectList" + inOutMap);
//	}
//	
//	public List<Account1VO> listSelect(Map<String, Object> inOutMap) throws Exception{
//		System.out.println("dao : " + inOutMap);
//		return selectList("Common.listSelect : " + inOutMap);
//	}
//	
	public int selectOne(SampleDefaultVO searchVO) throws Exception{
		System.out.println("dao : " + searchVO);
	    return (Integer) selectOne("Common.selectOne", searchVO);
//
//
//		
	}
	



//	public List<Account1VO> fileDownload(Map<String, Object> inOutMap) throws Exception{
//		System.out.println("dao : " + inOutMap);
//		return selectList("Common.fileDownload", inOutMap);
//	}
	
	public List<Account1VO> fileDownload(HttpServletResponse response) throws Exception{
		System.out.println("dao : " + response);
		return selectList("Common.fileDownload", response);
	}


//	public int select(SampleDefaultVO searchVO) throws Exception{
//		System.out.println("dao : " + searchVO);
//	    return  selectOne("Common.select", searchVO);
//	}

	

}
