package com.example1.insurance.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example1.insurance.dto.InsuranceContractDTO;
import com.example1.insurance.dto.InsuranceContractLoginDTO;
import com.example1.insurance.dto.InsuranceContractProductInfoDTO;
import com.example1.insurance.service.InsuranceContractProductInfoService;
import com.example1.insurance.service.InsuranceContractService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class InsuranceContractController {
	
	@Inject
	InsuranceContractService insuranceCotractService;
	@Inject
	InsuranceContractProductInfoService insuranceCotractProductInfoService;
	
	//메인
	@GetMapping("/")
	private String mainForm() {
		return "index";
	}
	//처음 화면 로그인GET
	@RequestMapping(value="/contract/login", method=RequestMethod.GET)
	public String getLogin() throws Exception{
		System.out.println("InsuranceContractController : getLogin 호출");
		return "/contract/login";
	}
	
	//로그인POST
	@RequestMapping(value="/contract/login",method=RequestMethod.POST)
	public String postLogin(InsuranceContractLoginDTO insuranceContractLoginDTO, HttpServletRequest req, RedirectAttributes rttr) throws Exception{
		HttpSession session = req.getSession();
		
		//넘겨받은 회원정보를 가지로 서비스에게 의뢰한다.
		InsuranceContractLoginDTO login = insuranceCotractService.login(insuranceContractLoginDTO);
		
		session.setAttribute("member", login);
		
		return "redirect:/";
		
	
	}
	//계약생성화면GET
	@RequestMapping(value="/contract/register", method=RequestMethod.GET)
	public String getInsert() throws Exception{
		System.out.println("InsuranceContractController : getInsert 호출");
		return "/contract/register";
	}
	
	//계약생성화면POST
	@RequestMapping(value="/contract/register", method=RequestMethod.POST)
	public String postInsert(InsuranceContractDTO insuranceCotractDTO, HttpSession session) throws Exception{
		
		//String poly_id = (String)session.getAttribute("poly_id");
		
		//insuranceCotractDTO.setPoly_id(poly_id);
		
		System.out.println("InsuranceContractController : postInsert 호출" + insuranceCotractDTO);
		insuranceCotractService.register(insuranceCotractDTO);
		
		return "redirect:/contract/list";
	}
	
	//계약내용조회GET
	@RequestMapping(value="/contract/list", method=RequestMethod.GET)
	public String getContractList(Model model) throws Exception{
		System.out.println("InsuranceContractController : getContractList 호출");
		
		List<InsuranceContractDTO> list = insuranceCotractService.contractList();
		model.addAttribute("list", list);
		
		List<InsuranceContractProductInfoDTO> productInfoList = insuranceCotractProductInfoService.addDelProductList();
		model.addAttribute("productInfoList", productInfoList);
		
		return "/contract/list";
	}
	
	//계약내용수정GET
	@RequestMapping(value="/contract/update", method=RequestMethod.GET)
	public String getContractUpdate(Model model) throws Exception{
		System.out.println("InsuranceContractController : getContractUpdate 호출");
		
		List<InsuranceContractDTO> list = insuranceCotractService.contractList();
		model.addAttribute("list", list);
		
		List<InsuranceContractProductInfoDTO> productInfoList = insuranceCotractProductInfoService.addDelProductList();
		model.addAttribute("productInfoList", productInfoList);
		
		return "/contract/update";
	}
	
	//계약내용수정POST
	@RequestMapping(value="/contract/update", method=RequestMethod.POST)
	public String postContractUpdate(HttpServletRequest request, @RequestParam int contract_period, @RequestParam int register_pay, @RequestParam int standard_pay,  HttpSession session) throws Exception{
		System.out.println("InsuranceContractController : postContractUpdate 호출");
		
		InsuranceContractDTO insuranceCotractDTO = new InsuranceContractDTO();
		
		insuranceCotractDTO.setPoly_id(request.getParameter("poly_id"));
		insuranceCotractDTO.setProduct_info(request.getParameter("product_info"));
		insuranceCotractDTO.setReg_info(request.getParameter("reg_info"));
		insuranceCotractDTO.setContract_period(contract_period);
		insuranceCotractDTO.setRegister_pay(register_pay);
		insuranceCotractDTO.setStandard_pay(standard_pay);
		insuranceCotractDTO.setStatus(request.getParameter("status"));
		insuranceCotractDTO.setStart_date(request.getParameter("start_date"));
		insuranceCotractDTO.setEnd_date(request.getParameter("end_date"));
		insuranceCotractService.update(insuranceCotractDTO);
		
		return "redirect:/contract/list"; 
	}
	
	//담보추가를 할 수 있는 상세화면
	@RequestMapping(value="/contract/contractDetailProductInfo", method= RequestMethod.GET)
		public String getProductInfoList(Model model) throws Exception{
		System.out.println("InsuranceContractController : getProductInfo 호출");
				
		//추가된(추가되지않은) 담보목록보기
		List<InsuranceContractProductInfoDTO> productInfoList = insuranceCotractProductInfoService.addDelProductList();
		model.addAttribute("productInfoList", productInfoList);
		return "/contract/contractDetailProductInfo";
	}
	//담보삭제GET
	@RequestMapping(value="/contract/contractDetailProductInfoDelete", method=RequestMethod.GET)
	public String getProductInfoDelete(InsuranceContractProductInfoDTO  insuranceCotractProductInfoDTO, Model model) throws Exception{
		System.out.println("InsuranceContractProductInfoController : getProductInfoDelete" + insuranceCotractProductInfoDTO);
		
		List<InsuranceContractProductInfoDTO> productInfoList = insuranceCotractProductInfoService.addDelProductList();
		model.addAttribute("productInfoList", productInfoList);
		
		return "/contract/contractDetailProductInfoDelete";
	}
	
	//담보삭제POST
	@RequestMapping(value="/contract/contractDetailProductInfoDelete", method=RequestMethod.POST)
	public String postProductInfoDelete(HttpServletRequest request, @RequestParam int contract_period, @RequestParam int register_pay, @RequestParam int standard_pay) throws Exception{
		
		InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO = new InsuranceContractProductInfoDTO();
		
		insuranceCotractProductInfoDTO.setPolyId(request.getParameter("polyId"));
		insuranceCotractProductInfoDTO.setContract_period(contract_period);
		insuranceCotractProductInfoDTO.setReg_info(request.getParameter("reg_info"));
		insuranceCotractProductInfoDTO.setRegister_pay(register_pay);
		insuranceCotractProductInfoDTO.setStandard_pay(standard_pay);
		
		insuranceCotractProductInfoService.productInfoDelete(insuranceCotractProductInfoDTO);
		
		return "redirect:/contract/list";
	}
	
	//보험료예상금액GET
	@RequestMapping(value="/contract/contractDetailProductInfoPayment",method=RequestMethod.GET)
	public String getPayment(InsuranceContractProductInfoDTO  insuranceCotractProductInfoDTO, Model model) throws Exception{
		System.out.println("InsuranceContractProductInfoDTO getPayment");
		List<InsuranceContractProductInfoDTO> productInfoList = insuranceCotractProductInfoService.addDelProductList();
		model.addAttribute("productInfoList", productInfoList);
		
		return "/contract/contractDetailProductInfoPayment";
	}
	
	//보험료예상금액POST
	@RequestMapping(value="/contract/contractDetailProductInfoPayment",method=RequestMethod.POST)
	public String postPayment(HttpServletRequest request,Model model) throws Exception{
		System.out.println("InsuranceContractProductInfoDTO postPayment" );
		
		
		
		//List<InsuranceContractDTO> list = insuranceCotractService.contractList();
		//model.addAttribute("list", list);
		
		List<InsuranceContractProductInfoDTO> productInfoList = insuranceCotractProductInfoService.addDelProductList();
		model.addAttribute("productInfoList", productInfoList);
		
		InsuranceContractProductInfoDTO insuranceCotractProductInfoDTO = new InsuranceContractProductInfoDTO();
		
			
			
			insuranceCotractProductInfoDTO.setPolyId(request.getParameter("polyId"));
			//insuranceCotractProductInfoDTO.setContract_period(contract_period);
			insuranceCotractProductInfoDTO.setReg_info(request.getParameter("reg_info"));
			//insuranceCotractProductInfoDTO.setRegister_pay(register_pay);
			//insuranceCotractProductInfoDTO.setStandard_pay(standard_pay);
		
		insuranceCotractProductInfoService.repeatPayment(insuranceCotractProductInfoDTO);
		
		
		return "/contract/contractDetailProductInfoPayment";
	}
	

	
	
}

