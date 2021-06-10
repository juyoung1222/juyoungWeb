package com.nexacro.sample.service.impl.ibatis;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nexacro.spring.dao.ibatis.NexacroIbatisAbstractDAO;
import com.nexacro.uiadapter17.spring.core.data.NexacroFirstRowHandler;

/**
 * 
 * <pre>
 * @desc    제공된 예제는 샘플용으로 작성된 코드로 참고용으로만
 *          사용하시기 바랍니다.
 * @package com.nexacro.sample.service.impl.ibatis
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
@Repository("largeDataDAO")
public class UiAdapterLargeDataDAO extends NexacroIbatisAbstractDAO {

    public void initData(int initDataCount) {
        List<String> batchArgs = new ArrayList<String>();
        for(int i=0; i<initDataCount; i++) {
            String value = "name-" + i;
            batchArgs.add(value);
        }

        try {
            batch("largeDataDAO.initData", batchArgs);
        } catch (Exception e) {
            throw new RuntimeException("temproary data insert failed. e="+e.getMessage(), e);
        }
    }
    
    public void selectLargeData(NexacroFirstRowHandler firstRowHandler, String sendName, int firstRowCount) {
    	String queryId = "largeDataDAO.selectLargeData";
    	Object parameterObject = null;
    	queryWithFirstRowHandler(queryId, parameterObject, firstRowHandler, sendName, firstRowCount);;
    }
}
