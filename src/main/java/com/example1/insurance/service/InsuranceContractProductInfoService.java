package com.example1.insurance.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example1.insurance.dto.InsuranceContractDTO;
import com.example1.insurance.dto.InsuranceContractProductInfoDTO;
import com.example1.insurance.mapper.InsuranceContractProductInfoMapper;

import jakarta.annotation.Resource;

@Service("com.example1.insurance.service.InsuranceContractProductInfoService")
public class InsuranceContractProductInfoService {

	@Resource
	InsuranceContractProductInfoMapper insurancecontractproductinfoMapper;
	
	//담보추가
	public int productInfoInsert(InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO) throws Exception{
		System.out.println("InsuranceContractProductInfoService 호출 : " + insuranceCotractProductInfoDTO);
		return insurancecontractproductinfoMapper.productInfoInsert(insuranceCotractProductInfoDTO);
	}
	
	//담보목록GET
	public List<InsuranceContractProductInfoDTO> addDelProductList() throws Exception{
		System.out.println("InsuranceContractProductInfoService addDelProductList 호출 ");
		return insurancecontractproductinfoMapper.addDelProductList();
	}
	
	//담보삭제
	public int productInfoDelete(InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO) throws Exception{
		System.out.println("InsuranceContractProductInfoService productInfoDelete 호출 : " + insuranceCotractProductInfoDTO);
		return insurancecontractproductinfoMapper.productInfoDelete(insuranceCotractProductInfoDTO);
	}
	
	//예상보험료계산
	public void repeatPayment(InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO) throws Exception{
		System.out.println("InsuranceContractProductInfoService : repeatPayment"  + insuranceCotractProductInfoDTO);
		insurancecontractproductinfoMapper.repeatPayment(insuranceCotractProductInfoDTO);
	}
	
	
	

}
