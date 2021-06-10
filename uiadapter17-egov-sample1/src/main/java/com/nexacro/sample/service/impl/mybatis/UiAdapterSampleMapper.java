package com.nexacro.sample.service.impl.mybatis;

import java.util.List;
import java.util.Map;

import com.nexacro.sample.vo.SampleVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * <pre>
 * @title   
 * @desc    제공 예제는 샘플용으로 작성된 코드로 참고용으로만
 *          사용하시기 바랍니다.
 * -        Mapper Class
 * @package nexacro.sample.service.impl.mybatis
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
@Mapper("nexacroSampleMapper") // egovframework annotation
public interface UiAdapterSampleMapper {
	
	List<SampleVO>           selectSampleVoList(SampleVO searchInfo);
    List<Map<String,Object>> selectSampleMapList(Map<String,String> searchInfo);
    List<SampleVO>           selectSamplePaging(SampleVO searchInfo);
    
    int selectSampleCount(SampleVO searchInfo);
    
    
    
    void insertSampleDataWithVo(SampleVO sampleData);
    void updateSampleDataWithVo(SampleVO sampleData);
    void deleteSampleDataWithVo(SampleVO sampleData);
    
    void insertSampleDataWithMap(Map<String,Object> sampleData);
    void updateSampleDataWithMap(Map<String,Object> sampleData);
    void deleteSampleDataWithMap(Map<String,Object> sampleData);
}
