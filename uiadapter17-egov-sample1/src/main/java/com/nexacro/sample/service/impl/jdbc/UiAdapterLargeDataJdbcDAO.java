package com.nexacro.sample.service.impl.jdbc;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import com.nexacro.uiadapter17.spring.core.data.NexacroFirstRowHandler;
import com.nexacro.uiadapter17.spring.dao.Dbms;
import com.nexacro.uiadapter17.spring.dao.DbmsProvider;
import com.nexacro.uiadapter17.spring.dao.jdbc.JdbcRowHandler;

/**
 * 
 * <pre>
 * @desc    제공된 예제는 샘플용으로 작성된 코드로 참고용으로만
 *          사용하시기 바랍니다.
 * @package com.nexacro.sample.service.impl.jdbc
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
@Repository("largeDataJdbcDAO")
public class UiAdapterLargeDataJdbcDAO extends JdbcDaoSupport {

	@Resource(name="dataSource")
    private DataSource dataSource;
    
    @Resource(name="dbmsProvider")
    private DbmsProvider dbmsProvider;

    @PostConstruct
    void init(){
        setDataSource(dataSource);
    }
    
    public void initData(int initDataCount) {
    	
    	getJdbcTemplate().execute("DELETE FROM TB_LARGE");
        
        List<Object[]> batchArgs = new ArrayList<Object[]>();
        for(int i=0; i<initDataCount; i++) {
            Object[] objArr = new Object[2];
            objArr[0] = i;
            objArr[1] = "name-" + i;
            batchArgs.add(objArr);
        }

        getJdbcTemplate().batchUpdate("INSERT INTO TB_LARGE(LARGE_ID, NAME) VALUES(?,?)", batchArgs);

    }
    
    public void selectLargeData(NexacroFirstRowHandler firstRowHandler, String sendName, int firstRowCount) {
        
        String sql = "SELECT LARGE_ID, NAME FROM TB_LARGE";
        
        Dbms dbms = dbmsProvider.getDbms(dataSource);
        
        JdbcRowHandler rowHandler = new JdbcRowHandler(dbms, firstRowHandler, sendName, firstRowCount);
        getJdbcTemplate().query(sql,  new Object[]{}, rowHandler);
        
        rowHandler.sendRemainData();
    }
}
