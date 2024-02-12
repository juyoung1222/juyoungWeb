package com.example1.insurance.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

import com.example1.insurance.dto.InsuranceContractDTO;
import com.example1.insurance.dto.InsuranceContractLoginDTO;
import com.example1.insurance.dto.InsuranceContractProductInfoDTO;

@Mapper
public interface InsuranceContractMapper {
	
	//처음 화면 로그인
	public InsuranceContractLoginDTO login(InsuranceContractLoginDTO insuranceContractLoginDTO) throws Exception;
	
	//계약생성
	public void register(InsuranceContractDTO insuranceCotractDTO) throws Exception;

	//계약내용조회
	public List<InsuranceContractDTO> contractList() throws Exception;
	
	//계약내용수정
	public int update(InsuranceContractDTO insuranceCotractDTO) throws Exception;
	
	
}
