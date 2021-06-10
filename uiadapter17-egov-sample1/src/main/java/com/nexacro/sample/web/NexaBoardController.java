package com.nexacro.sample.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Case;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.sample.service.NexaBoardService;
import com.nexacro.sample.vo.UserVO;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import egovframework.rte.psl.dataaccess.util.EgovMap;

@Controller
public class NexaBoardController {

	private Logger logger = LoggerFactory.getLogger(NexaBoardController.class);
	
	@Resource(name = "nexaBoardService")
    private NexaBoardService nexaBoardService;
	    
	
    /**
     * 모든 코드마스터 테이블 데이터 리스트 
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/selectAllCode.do")
    public NexacroResult selectAllCode()throws Exception{
    	NexacroResult result  = new NexacroResult();
    	
    	List<EgovMap> codeList =  nexaBoardService.selectAllCode();
    	
    	result.addDataSet("output000", codeList);
    	
    	return result;
    }
	 
    /**
     * 코드 리스트 
     * @param param
     * @param category
     * @return
     * @throws Exception
     */
	@RequestMapping(value="/selectCombo.do")
	public NexacroResult selectComboAjax(@ParamDataSet(name = "dsIn") Map<String, String> param, @ParamVariable(name="category", required=false) String category) throws Exception{
		System.out.println(category);
		List<EgovMap> comboList = nexaBoardService.selectComboBox(param);
		
		NexacroResult result = new NexacroResult();
		
		result.addDataSet("output00", comboList);
		
	
		return result;
	}
	
	@RequestMapping(value="/selectCodeInlvl.do")
	public NexacroResult selectCodeInlvl(@ParamDataSet(name = "dsIn") Map<String, String> param) throws Exception{
		List<EgovMap> comboList = nexaBoardService.selectCodeInLvl(param);
		
		NexacroResult result = new NexacroResult();
		
		result.addDataSet("output01", comboList);
		
	
		return result;
	}
	
	@RequestMapping(value="/accountList.do")
	public NexacroResult accountList()throws Exception{
		NexacroResult result = new NexacroResult();
		
		List<EgovMap> accountList = nexaBoardService.selectAccountList();
		result.addDataSet("output01", accountList);
		
		
		return result;
	}
	
	
	/**
	 * 업데이트 account
	 * @param paramList
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/saveAccount.do")
	public NexacroResult saveAccount(@ParamDataSet(name="dsAccount", required = false) List<Map<String, String>> paramList )throws Exception{
		NexacroResult result = new NexacroResult();
		
		for(Map<String, String> param : paramList){
			switch (param.get("uiRowType")) {
			case "2":
				nexaBoardService.insertAccount(param);
				break;
				

			case "4":
				nexaBoardService.updateAccount(param);	
				break;
			}
			
		}
		
		return result;
	}
	
	/**
	 * 삭제 account
	 * @param paramList
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteAccount.do")
	public NexacroResult deleteAccount(@ParamDataSet(name="dsAccount") List<Map<String, String>> paramList )throws Exception{
		NexacroResult result = new NexacroResult();
		
		for(Map<String, String> param : paramList){
			nexaBoardService.deleteAccount(param);
		}
		
		return result;
	}
	
	
	
	
	/*강사등록샘플*/
	
	@RequestMapping(value = "/selectCodeList.do")
	public NexacroResult selectCodeList(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {

		List<EgovMap> resultList = nexaBoardService.selectCodeList(param);

		NexacroResult result = new NexacroResult();
		result.addDataSet("output1", resultList);

		return result;
	}

	@RequestMapping(value = "/selectLecturerList.do")
	public NexacroResult selectLecturerList(
			@ParamDataSet(name = "input1", required = false) Map<String, String> param) {

		List<EgovMap> resultList = nexaBoardService.selectLecturerList();

		NexacroResult result = new NexacroResult();
		result.addDataSet("output1", resultList);

		return result;
	}

	@RequestMapping(value = "/selectCareerList.do")
	public NexacroResult selectCareerList(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {

		List<EgovMap> resultList = nexaBoardService.selectCareerList(param);

		NexacroResult result = new NexacroResult();
		result.addDataSet("output1", resultList);

		return result;
	}
	
	@RequestMapping(value = "/mergeLecturer.do")
	public NexacroResult mergeLecturer(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {

		nexaBoardService.mergeLecturer(param);

		NexacroResult result = new NexacroResult();

		return result;
	}
	
	@RequestMapping(value = "/mergeCareer.do")
	public NexacroResult mergeCareer(@ParamDataSet(name = "input1", required = false) List<Map<String, String>> param) {
		
		for(Map<String,String> temp : param){
			nexaBoardService.mergeCareer(temp);
		}

		NexacroResult result = new NexacroResult();

		return result;
	}

	@RequestMapping(value = "/deleteLecturer.do")
	public NexacroResult deleteLecturer(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {

		nexaBoardService.deleteLecturer(param);

		NexacroResult result = new NexacroResult();

		return result;
	}

	@RequestMapping(value = "/deleteCareer.do")
	public NexacroResult deleteCareer(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {

		nexaBoardService.deleteCareer(param);

		NexacroResult result = new NexacroResult();

		return result;
	}
	
	@RequestMapping(value="/login.do")
	public NexacroResult login(@ParamDataSet(name = "input1", required = false) Map<String, String> param,UserVO userVO,HttpServletRequest req) throws Exception{
		
		HttpSession session = req.getSession();
		
		UserVO login = (UserVO) nexaBoardService.login(param);
		
		if(login == null){
			session.setAttribute("user", null);
		}else{
			session.setAttribute("user", login);
		}
		
		NexacroResult result = new NexacroResult();
		
		
		System.out.println(result);
		return result;
	}
	
	
}


