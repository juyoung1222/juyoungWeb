package com.nexacro.sample.service.impl.ibatis;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.nexacro.sample.vo.SampleVO;
import com.nexacro.spring.dao.ibatis.NexacroIbatisAbstractDAO;

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
@Repository("nexacroSampleDAO")
public class UiAdapterSampleDAO extends NexacroIbatisAbstractDAO {

    public List<SampleVO> selectSampleVoList(SampleVO searchInfo) {
    	return (List<SampleVO>) list("nexacroSample.selectSampleVOList", searchInfo);
    }
    
    public List<Map> selectSampleMapList(Map<String,String> searchInfo) {
    	return (List<Map>) list("nexacroSample.selectSampleMapList", searchInfo);
    }

    public List<SampleVO> selectSamplePaging(SampleVO searchInfo) {
    	return (List<SampleVO>) list("nexacroSample.selectSamplePaging", searchInfo);
    }
    
    public int selectSampleCount(SampleVO searchVO) {
		return (int) select("nexacroSample.selectSampleCount", searchVO);
	}
    
   
    
    //=============== VO 데이터 처리 ===========================
    public void insertSampleVO(SampleVO sample) {
        insert("nexacroSample.insertSampleVO", sample);
    }
    
    public void updateSampleVO(SampleVO sample) {
        update("nexacroSample.updateSampleVO", sample);
    }
    public void deleteSampleVO(SampleVO sample) {
        delete("nexacroSample.deleteSampleVO", sample);
    }

    //==================== MAP 데이터 처리 ===================
    public void insertSampleMap(Map<String,Object> sample) {
        insert("nexacroSample.insertSampleMap", sample);
    }
    
    public void updateSampleMap(Map<String,Object> sample) {
        update("nexacroSample.updateSampleMap", sample);
    }
    public void deleteSampleMap(Map<String,Object> sample) {
        delete("nexacroSample.deleteSampleMap", sample);
    }
}
