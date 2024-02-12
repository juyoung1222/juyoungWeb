package com.example1.insurance.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.example1.insurance.dto.InsuranceContractDTO;
import com.example1.insurance.dto.InsuranceContractLoginDTO;
import com.example1.insurance.dto.InsuranceContractProductInfoDTO;
import com.example1.insurance.mapper.InsuranceContractMapper;
import com.example1.insurance.mapper.InsuranceContractProductInfoMapper;

import jakarta.annotation.Resource;

@Service("com.example1.insurance.service.InsuranceContractService")
public class InsuranceContractService {

	@Resource
	InsuranceContractMapper insurancecontractMapper;
	
	//처음화면 로그인
	public InsuranceContractLoginDTO login(InsuranceContractLoginDTO insuranceContractLoginDTO) throws Exception{
		System.out.println("InsuranceContractService :  login 호출 " + insuranceContractLoginDTO);
		return insurancecontractMapper.login(insuranceContractLoginDTO);
	}
	
	//계약생성
	public void register(InsuranceContractDTO insuranceCotractDTO) throws Exception{
		System.out.println("InsuranceContractService :  register 호출 " + insuranceCotractDTO);
		insurancecontractMapper.register(insuranceCotractDTO);
	}
	
	//계약내용조회
	public List<InsuranceContractDTO> contractList() throws Exception{
		return insurancecontractMapper.contractList(); 
	}
	
	//계약내용수정
	public int update(InsuranceContractDTO insuranceCotractDTO) throws Exception{
		System.out.println("InsuranceContractService update 호출 " + insuranceCotractDTO);
		return insurancecontractMapper.update(insuranceCotractDTO);
	}
	
	
	
	
	
	
	
}
