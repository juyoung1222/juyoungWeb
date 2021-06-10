package com.nexacro.sample.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.sample.service.UiAdapterSampleService;
import com.nexacro.sample.vo.SampleVO;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

/**
 * <pre>
 * @title   
 * @desc    제공 예제는 샘플용으로 작성된 코드로 참고용으로만
 *          사용하시기 바랍니다.
 * -        Controller mybatis Sample Class
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
public class UiAdapterMybatisController {
	private Logger logger = LoggerFactory.getLogger(UiAdapterMybatisController.class);
	
    @Resource(name = "sampleMybatisService")
    private UiAdapterSampleService sampleMybatisService;
    
    @RequestMapping(value = "/sampleMybatisSelectVo.do")
	public NexacroResult selectMybatisVo(@ParamDataSet(name = "ds_search", required = false) SampleVO searchVo) {
        
        List<SampleVO> sampleList = sampleMybatisService.selectSampleVoList(searchVo);
        
        NexacroResult result = new NexacroResult();
        result.addDataSet("output1", sampleList);
        
        return result;
    }
    
    
    @RequestMapping(value = "/sampleMybatisSelectMap.do")
	public NexacroResult selectMybatisMap(@ParamDataSet(name = "ds_search", required = false) Map<String,String> searchInfo) {
        
    	logger.debug("---------- client arguments > " + searchInfo);
        List<Map<String,Object>> sampleList = sampleMybatisService.selectSampleMapList(searchInfo);
        
        NexacroResult result = new NexacroResult();
        result.addDataSet("output1", sampleList);
        
        return result;
    }
    
    @RequestMapping(value = "/updateMybatisSampleDataWithVo.do")
	public NexacroResult updateSampleDataWithVo(@ParamDataSet(name = "input1") List<SampleVO> updateSampleList) {
    	
    	sampleMybatisService.updateSampleDataWithVo(updateSampleList);
        NexacroResult result = new NexacroResult();
        return result;
    }
    
    @RequestMapping(value = "/updateMybatisSampleDataWithMap.do")
	public NexacroResult updateSampleDataWithMap(@ParamDataSet(name = "input1") List<Map<String,Object>> updateSampleList) {
    	
    	sampleMybatisService.updateSampleDataWithMap(updateSampleList);
        NexacroResult result = new NexacroResult();
        return result;
    }
}
