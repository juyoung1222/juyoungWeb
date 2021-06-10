package com.nexacro.sample.service;

import com.nexacro.uiadapter17.spring.core.data.NexacroFirstRowHandler;

/**
 * 
 * <pre>
 * @desc    제공된 예제는 샘플용으로 작성된 코드로 참고용으로만
 *          사용하시기 바랍니다.
 * @package com.nexacro.sample.service
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
public interface UiAdapterLargeDataService {
    void selectLargeData(NexacroFirstRowHandler firstRowHandler, String sendDataSetName, int firstRowCount, int initDataCount);
}
