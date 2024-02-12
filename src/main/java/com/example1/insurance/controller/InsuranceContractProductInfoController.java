package com.example1.insurance.controller;

import javax.inject.Inject;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example1.insurance.dto.InsuranceContractProductInfoDTO;
import com.example1.insurance.service.InsuranceContractProductInfoService;
import com.example1.insurance.service.InsuranceContractService;



@Controller
@RequestMapping("/productInfo")
public class InsuranceContractProductInfoController {
	@Inject
	InsuranceContractService insuranceCotractService;
	
	@Inject
	InsuranceContractProductInfoService insuranceCotractProductInfoService;
	
	//담보추가
	@RequestMapping(value="/ProductInsert", method= {RequestMethod.GET,RequestMethod.POST})
	public String productInfoInsert(InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO) throws Exception{
		System.out.println("InsuranceContractProductInfoController : productInfoInsert 호출");
		
		insuranceCotractProductInfoService.productInfoInsert(insuranceCotractProductInfoDTO);
		
		return "redirect:/contract/list";
	}
	
	
	
	
	
	
}
