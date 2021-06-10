package com.nexacro.sample.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nexacro.sample.service.NexaBoardService;
import com.nexacro.sample.service.impl.mybatis.NexaBoardMapper;
import com.nexacro.sample.vo.UserVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("nexaBoardService")
public class NexaBoardServiceImpl extends EgovAbstractServiceImpl implements
		NexaBoardService {

	private Logger logger = LoggerFactory.getLogger(NexaBoardServiceImpl.class);

	@Resource(name = "nexaBoardMapper")
	private NexaBoardMapper nexaBoardMapper;

	@Override
	public List<EgovMap> selectAllCode() {
		return nexaBoardMapper.selectAllCode();
	}

	@Override
	public List<EgovMap> selectCodeInLvl(Map<String, String> param) {
		return nexaBoardMapper.selectCodeInLvl(param);
	}

	@Override
	public List<EgovMap> selectComboBox(Map<String, String> param) {
		return nexaBoardMapper.selectComboBox(param);
	}

	@Override
	public List<EgovMap> selectAccountList() {
		return nexaBoardMapper.selectAccountList();
	}

	@Override
	public void insertAccount(Map<String, String> param) {
		nexaBoardMapper.insertAccount(param);
	}

	@Override
	public void updateAccount(Map<String, String> param) {
		nexaBoardMapper.updateAccount(param);
	}
	
	@Override
	public void deleteAccount(Map<String, String> param) {
		nexaBoardMapper.deleteAccount(param);
	}
	
	
	@Override
	public List<EgovMap> selectCodeList(Map<String, String> param) {
		return nexaBoardMapper.selectCodeList(param);
	}

	@Override
	public List<EgovMap> selectLecturerList() {
		return nexaBoardMapper.selectLecturerList();
	}

	@Override
	public List<EgovMap> selectCareerList(Map<String, String> param) {
		return nexaBoardMapper.selectCareerList(param);
	}

	@Override
	public void mergeLecturer(Map<String, String> param) {
		nexaBoardMapper.mergeLecturer(param);
	}

	@Override
	public void mergeCareer(Map<String, String> param) {
		nexaBoardMapper.mergeCareer(param);
	}

	@Override
	public void deleteLecturer(Map<String, String> param) {
		nexaBoardMapper.deleteLecturer(param);
	}

	@Override
	public void deleteCareer(Map<String, String> param) {
		nexaBoardMapper.deleteCareer(param);
	}
	
	public List<UserVO> login(Map<String, String> param){
		return nexaBoardMapper.login(param);
	}
}
