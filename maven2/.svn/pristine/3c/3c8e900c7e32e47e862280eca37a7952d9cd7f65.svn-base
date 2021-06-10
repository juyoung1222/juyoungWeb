package com.bil.account.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.bil.account.service.AccountService;
import com.bil.common.service.CommonService;
import com.bil.util.CommUtils;

import egovframework.rte.psl.dataaccess.util.EgovMap;


@Controller
public class AccountController {


	@Resource(name = "jsonView")
	private MappingJackson2JsonView jsonView;

	@Resource(name="accountService")
	private AccountService accountService;

	@Resource(name="commonService")
	private CommonService commonService;

	/**
	 *
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/account/accountList.do")
	public String selectSampleList(HttpServletRequest request, ModelMap model) throws Exception {

		Map<String, Object> inOutMap  = CommUtils.getFormParam(request);


		model.put("inOutMap", inOutMap);
		return "/account/accountList";
	}



	/**
	 *
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/account/accountInsert.do")
	public String accountInsert(HttpServletRequest request, ModelMap model) throws Exception{

		Map<String, Object> inOutMap = new HashMap<>();


		inOutMap.put("category", "A000000");
		List<EgovMap> resultMap= commonService.selectCombo(inOutMap);

		System.out.println(resultMap);
		model.put("resultMap", resultMap);

		return "/account/accountInsert";
	}


	/**
	 *
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/account/selectCombo.do")
	public ModelAndView ajaxtest(HttpServletRequest request) throws Exception{
		System.out.println("/account/selectCombo.do");

		Map<String, Object> inOutMap  = CommUtils.getFormParam(request);

		commonService.selectCombo(inOutMap);


		return new ModelAndView(jsonView, inOutMap);
	}







}// end of calss
