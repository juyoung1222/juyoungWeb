package com.nexacro.sample.service.impl.ibatis;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.nexacro.sample.vo.UserVO;
import com.nexacro.spring.dao.ibatis.NexacroIbatisAbstractDAO;

/**
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
@Repository("userDAO")
public class UiAdapterUserDAO extends NexacroIbatisAbstractDAO {

    public List<UserVO> selectUserVoList(UserVO searchVO) {
        return (List<UserVO>) list("selectUserVOList", searchVO);
    }

    public List<Map<String,Object>> selectUserMapList(Map<String,String> searchInfo) {
        return (List) list("selectUserVOList", searchInfo);
    }
    
    public void insertUserVO(UserVO user) {
        insert("insertUserVO", user);
    }

    public void updateUserVO(UserVO user) {
        insert("updateUserVO", user);
    }
    
    public void deleteUserVO(UserVO user) {
        insert("deleteUserVO", user);
    }
    
    //Map처리 추가 
    public void updateUserVO(Map user) {
        insert("updateUserVO", user);
    }
}
