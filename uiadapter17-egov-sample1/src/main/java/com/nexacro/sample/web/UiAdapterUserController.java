package com.nexacro.sample.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.sample.service.UiAdapterUserService;
import com.nexacro.sample.vo.UserVO;
import com.nexacro.uiadapter17.spring.core.NexacroException;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

/**
 * <pre>
 * @title   
 * @desc    제공된 예제는 샘플용으로 작성된 코드로 참고용으로만
 *          사용하시기 바랍니다.
 * -        Controller Sample Class
 * @package com.nexacro.sample.web
 * <pre>
 * @author  TOBESOFT
 * @since   2017. 11. 8.
 * @version 1.0
 * @see
 * =================== 변경 내역 ==================
 * 날짜			변경자		내용
 * ------------------------------------------------
 * 2017. 11. 8.		TOBESOFT	최초작성
 */
@Controller
public class UiAdapterUserController {
	private static final Logger logger = LoggerFactory.getLogger(UiAdapterUserController.class);
	
	// Name 정의
	@Resource(name = "userService")
	private UiAdapterUserService	userService;

	@Resource
	private Validator	validator;

    @InitBinder
	public void initBinder(WebDataBinder dataBinder){
		dataBinder.setValidator(this.validator);
	}
    
    @RequestMapping(value = "/selectUserInfoWithVo.do")
	public NexacroResult selectUserInfoVo(@ParamDataSet(name = "ds_search", required = false) UserVO searchVo) {
        
        List<UserVO> userList = userService.selectUserVOList(searchVo);
        
        NexacroResult result = new NexacroResult();
        result.addDataSet("output1", userList);
        
        return result;
    }
    
    @RequestMapping(value = "/selectUserInfoWithMap.do")
	public NexacroResult selectUserInfoMap(@ParamDataSet(name = "ds_search", required = false) Map<String,String> searchInfo) {
        
        List<Map<String,Object>> userList = userService.selectUserMapList(searchInfo);
        
        NexacroResult result = new NexacroResult();
        result.addDataSet("output1", userList);
        
        return result;
    }
    
	@RequestMapping(value = "/updateUserInfo.do")
	public NexacroResult updateUserInfo(@ParamDataSet(name = "input1") UserVO userInfo) throws NexacroException {
		
		validate(userInfo);

		userService.updateUserInfo(userInfo);

		NexacroResult result = new NexacroResult();

		return result;
	}

	/**
	 * validate
	 * @param modifyList
	 * @throws NexacroException
	 */
	private void validate(UserVO userVo) throws NexacroException {
		BindingResult bindingResult = null;
		bindingResult = new BeanPropertyBindingResult(userVo, "userVO");
		validator.validate(userVo, bindingResult);
		if (bindingResult.hasErrors()) {
			String errorMessages = getErrorMessages(bindingResult);

			NexacroException nexacroException = new NexacroException(errorMessages);
			nexacroException.setErrorCode(NexacroException.DEFAULT_ERROR_CODE);
			nexacroException.setErrorMsg(errorMessages);

			throw nexacroException;
		}
	}
	
	/**
	 * getErrorMessages
	 * @param bindingResult
	 */
	private String getErrorMessages(BindingResult bindingResult) {
		StringBuffer sb = new StringBuffer();
		
		for (ObjectError error : bindingResult.getAllErrors()) {
			sb.append(error.getDefaultMessage()).append("\n");
		}
		
		return sb.toString();
	}
}
