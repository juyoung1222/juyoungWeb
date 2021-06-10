package com.nexacro.sample.service;

import java.util.List;
import java.util.Map;

import com.nexacro.sample.vo.UserVO;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface NexaBoardService {

	List<EgovMap> selectAllCode();
	List<EgovMap> selectCodeInLvl(Map<String, String> param);
	List<EgovMap> selectComboBox(Map<String, String> param);
	List<EgovMap> selectAccountList();
	void insertAccount(Map<String, String> param);
	void updateAccount(Map<String, String> param);
	void deleteAccount(Map<String, String> param);
	
	List<EgovMap> selectCodeList(Map<String,String> param);
	List<EgovMap> selectLecturerList();
	List<EgovMap> selectCareerList(Map<String,String> param);
	void mergeLecturer(Map<String,String> param);
	void mergeCareer(Map<String,String> param);
	void deleteLecturer(Map<String,String> param);
	void deleteCareer(Map<String,String> param);
	List<UserVO> login(Map<String, String> param);
}