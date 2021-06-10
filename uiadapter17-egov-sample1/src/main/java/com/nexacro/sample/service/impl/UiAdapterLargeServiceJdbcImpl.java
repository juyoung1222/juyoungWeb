package com.nexacro.sample.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nexacro.sample.service.UiAdapterLargeDataService;
import com.nexacro.sample.service.impl.jdbc.UiAdapterLargeDataJdbcDAO;
import com.nexacro.uiadapter17.spring.core.data.NexacroFirstRowHandler;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * 
 * <pre>
 * @desc    제공된 예제는 샘플용으로 작성된 코드로 참고용으로만
 *          사용하시기 바랍니다.
 * @package com.nexacro.sample.service.impl
 * <pre>
 * 
 * @author  TOBESOFT
 * @since   2018. 1. 18.
 * @version 1.0
 * @see
 * =================== 변경 내역 ==================
 * 날짜			변경자		내용
 * ------------------------------------------------
 * 2018. 1. 18.		TOBESOFT	최초작성
 */
@Service("largeDataJdbcService")
public class UiAdapterLargeServiceJdbcImpl extends EgovAbstractServiceImpl implements UiAdapterLargeDataService {

    @Resource(name = "largeDataJdbcDAO")
    private UiAdapterLargeDataJdbcDAO largeDataJdbcDAO;
    
    private static boolean isInited = false;
    
    public void selectLargeData(NexacroFirstRowHandler firstRowHandler, String sendDataSetName, int firstRowCount, int initDataCount) {
        
        if(!isInited) {
            largeDataJdbcDAO.initData(initDataCount);
        }
        isInited = true;
        largeDataJdbcDAO.selectLargeData(firstRowHandler, sendDataSetName, firstRowCount);
    }
}
