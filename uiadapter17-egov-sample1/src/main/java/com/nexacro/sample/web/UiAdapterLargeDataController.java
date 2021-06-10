package com.nexacro.sample.web;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.sample.service.UiAdapterLargeDataService;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroFirstRowHandler;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.tx.PlatformType;

/**
 * <pre>
 * @title   Controller Sample Class
 * @desc    제공 예제는 샘플용으로 작성된 코드로 참고용으로만
 *          사용하시기 바랍니다.
 * -        대용량 데이터인 경우 firstRow 방식 데이터 조회
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
public class UiAdapterLargeDataController {
	private static final Logger log = LoggerFactory.getLogger(UiAdapterLargeDataController.class);
	
    @Resource(name = "largeDataService")
    private UiAdapterLargeDataService largeDataService;
    
    @Resource(name = "largeDataJdbcService")
    private UiAdapterLargeDataService largeDataJdbcService;
    
    @Resource(name = "largeDataMybatisService")
    private UiAdapterLargeDataService largeDataMybatisService;
    
    private static int DATA_CNT = 100000;
    
    @RequestMapping(value = "/sampleLargeData.do")
    public NexacroResult largeData(NexacroFirstRowHandler firstRowHandler, @ParamVariable(name="firstRowCount", required=false) int firstRowCount) {
    	
    	/**===================================================================================================================
		 * 전용브라우저   : XML, SSV, BINARY 가능
		 * 인터넷브라우저 : XML, SSV(firefirstcount event가 모든데이터를 받았을 때 이벤트가 발생함.), BINARY(미지원).
         * 공통           : firenextcount event는 발생하지 않음.
         *====================================================================================================================*/

    	firstRowHandler.setContentType(PlatformType.CONTENT_TYPE_XML);
        //firstRowHandler.setContentType(PlatformType.CONTENT_TYPE_SSV);
        //firstRowHandler.setContentType(PlatformType.CONTENT_TYPE_BINARY); // browser에서 데이터 받을수 없음.
        
        String sendDataSetName = "ds_firstRowData";
        int initDataCount = DATA_CNT; // This is dummy data!!
        
        log.debug("======================= 분할 전송 데이터 호출 정보 ================================");
        log.debug("    전체 데이터 갯수 :"+ initDataCount);
        log.debug("    최초 데이터 갯수 :"+ firstRowCount);
        
        largeDataService.selectLargeData(firstRowHandler, sendDataSetName, firstRowCount, initDataCount);
        
        NexacroResult result = new NexacroResult();
        return result;
    }
    
    @RequestMapping(value = "/sampleJdbcLargeData.do")
    public NexacroResult jdbcLargeData(NexacroFirstRowHandler firstRowHandler, @ParamVariable(name="firstRowCount", required=false) int firstRowCount){
        
        firstRowHandler.setContentType(PlatformType.CONTENT_TYPE_SSV);
        
        String sendDataSetName = "ds_firstRowData";
        int initDataCount = DATA_CNT; // this is dummy data!!
        
        largeDataJdbcService.selectLargeData(firstRowHandler, sendDataSetName, firstRowCount, initDataCount);
        
        NexacroResult result = new NexacroResult();
        return result;
    }
    
    @RequestMapping(value = "/sampleMybatisLargeData.do")
    public NexacroResult mybatisLargeData(NexacroFirstRowHandler firstRowHandler, @ParamVariable(name="firstRowCount", required=false) int firstRowCount){
        
        firstRowHandler.setContentType(PlatformType.CONTENT_TYPE_SSV);
        String sendDataSetName = "ds_firstRowData";
        int initDataCount      = DATA_CNT; // this is dummy data!!
        
        largeDataMybatisService.selectLargeData(firstRowHandler, sendDataSetName, firstRowCount, initDataCount);
        
        NexacroResult result = new NexacroResult();
        return result;
    }
}
