package com.nexacro.sample.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.sample.service.UiAdapterSampleService;
import com.nexacro.sample.vo.SampleVO;
import com.nexacro.sample.vo.UnitVO;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroFirstRowHandler;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;
import com.nexacro17.xapi.data.DataSetList;
import com.nexacro17.xapi.data.PlatformData;
import com.nexacro17.xapi.data.Variable;
import com.nexacro17.xapi.data.VariableList;
import com.nexacro17.xapi.tx.HttpPlatformRequest;
import com.nexacro17.xapi.tx.HttpPlatformResponse;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;



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
public class UiAdapterSampleController {
	private Logger log = LoggerFactory.getLogger(UiAdapterSampleController.class);
	
    @Resource(name = "nexacroSampleService")
    // Name 정의
    private UiAdapterSampleService nexacroSampleService;
    
    @RequestMapping(value = "/selectSampleListWithVo.do")
	public NexacroResult selectVo(@ParamDataSet(name = "ds_search", required = false) SampleVO searchInfo) {

		List<SampleVO> sampleList = nexacroSampleService.selectSampleVoList(searchInfo);

		NexacroResult result = new NexacroResult();
		result.addDataSet("output1", sampleList);

		return result;
	}
    
    @RequestMapping(value = "/selectSampleListWithMap.do")
	public NexacroResult selectMap(@ParamDataSet(name = "ds_search", required = false) Map<String,String> searchInfo) {

		List<Map<String,Object>> sampleList = nexacroSampleService.selectSampleMapList(searchInfo);

		NexacroResult result = new NexacroResult();
		result.addDataSet("output1", sampleList);

		return result;
	}
    
    @RequestMapping(value = "/updateSampleDataWithVo.do")
	public NexacroResult updateSampleDataWithVo(@ParamDataSet(name = "input1") List<SampleVO> updateSampleList) {
    	
    	nexacroSampleService.updateSampleDataWithVo(updateSampleList);
        NexacroResult result = new NexacroResult();
        return result;
    }
    
    @RequestMapping(value = "/updateSampleDataWithMap.do")
	public NexacroResult updateSampleDataWithMap(@ParamDataSet(name = "input1") List<Map<String,Object>> updateSampleList) {
    	
    	nexacroSampleService.updateSampleDataWithMap(updateSampleList);
        NexacroResult result = new NexacroResult();
        return result;
    }
    
    
    @RequestMapping(value = "/samplePaging.do")
	public NexacroResult selectPaging(@ParamDataSet(name = "ds_search", required = false) SampleVO searchVO) {
    
        if(searchVO == null) {
        	searchVO = new SampleVO();
        }

        searchVO.setPageUnit(10);
        searchVO.setPageSize(10);

        
    	PaginationInfo paginationInfo = new PaginationInfo();
    	paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
    	paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
    	paginationInfo.setPageSize(searchVO.getPageSize());

    	searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
    	searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
    	searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

    	List<SampleVO> sampleList = nexacroSampleService.selectSamplePaging(searchVO);

    	int totalCount = nexacroSampleService.selectSampleCount(searchVO);
    	paginationInfo.setTotalRecordCount(totalCount);
        
    	List paginationInfos = new ArrayList();
    	paginationInfos.add(paginationInfo);
        
        NexacroResult result = new NexacroResult();
        result.addDataSet("dsList", sampleList);
        result.addDataSet("dsPagingInfo", paginationInfos);
        
        return result;
    }
    
    @RequestMapping(value = "/test.do")
    public NexacroResult test(
            @ParamDataSet(name="dsUnit") List<UnitVO> unitList
            , @ParamDataSet(name="dsUnit") List<Map> unitMapList
            , @ParamDataSet(name="dsUnit") DataSet dsUnit
            
            , @ParamVariable(name="intValue") int iVar1
            , @ParamVariable(name="intValue") Variable iVar2
            , @ParamVariable(name="stringValue") String sVar1
            , @ParamVariable(name="stringValue") Variable sVar2
            
            , DataSetList dsList
            , VariableList varList
            , PlatformData platformData
            , HttpPlatformRequest platformRequest
            , HttpPlatformResponse platformResponse
            , NexacroFirstRowHandler firstRowHandler
            ){
        
        if (log.isDebugEnabled()) {
            log.debug("debug_message : nexacro supported parameter types..");
        }
        
        // control nexacro result...
        NexacroResult result = new NexacroResult();
        result.addDataSet("dsUnitList", unitList);
        result.addVariable("responseInt", iVar1);
        result.addVariable("responseString", sVar1);
        
        return result;
    }
    

   
}
