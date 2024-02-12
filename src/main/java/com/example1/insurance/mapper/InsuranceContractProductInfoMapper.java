package com.example1.insurance.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.PathVariable;

import com.example1.insurance.dto.InsuranceContractDTO;
import com.example1.insurance.dto.InsuranceContractProductInfoDTO;

@Mapper
public interface InsuranceContractProductInfoMapper {
	
	//담보추가
	public int productInfoInsert(InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO) throws Exception;
	
	//담보목록GET
	public List<InsuranceContractProductInfoDTO> addDelProductList() throws Exception;
	
	//담보삭제
	public int productInfoDelete(InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO) throws Exception;
	
	//예상보험료계산
	public void repeatPayment(InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO) throws Exception;

}
