package ino.web.freeBoard.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.mybatis.spring.annotation.MapperScan;

import ino.web.freeBoard.dto.FreeBoardDto;
import ino.web.freeBoard.dto.FreeBoardFileDto;
import ino.web.freeBoard.dto.Pagination;
import ino.web.freeBoard.dto.SearchCriteria;


public interface FreeBoardMapper {
	
	@Select("SELECT SEQ, TITLE, NAME, CONTENT, REGDATE FROM SEQUENCE_FREEBOARD WHERE 1=1 LIMIT #{rowStart}, #{perPageNum}")
	public List<FreeBoardDto> selectList(SearchCriteria scri);
	
	@Select("SELECT seq, title, name, regdate, content, boardimagefile, boardimageName, boardimageOriName, boardimageUrl   FROM SEQUENCE_FREEBOARDFILE WHERE 1=1 LIMIT #{rowStart}, #{perPageNum}")
	public List<FreeBoardFileDto> selectList1(SearchCriteria scri);
	
//	@Select("SELECT * FROM SEQUENCE_FREEBOARD WHERE seq > 0")
//	public List<FreeBoardDto> search(Pagination pagination);
	
	@Select("SELECT COUNT(seq) FROM SEQUENCE_FREEBOARD WHERE 1=1  AND seq >0 ")
	public int totalCount();
	
	@Select("SELECT COUNT(seq) FROM SEQUENCE_FREEBOARDFILE WHERE 1=1  AND seq >0 ")
	public int totalCount1();
	
	@Select("SELECT SEQ, TITLE, NAME, CONTENT, REGDATE FROM SEQUENCE_FREEBOARD WHERE seq=#{seq}")
	public FreeBoardDto selectOne(int seq);
	
	@Select("SELECT SEQ, TITLE, NAME, REGDATE CONTENT, boardimagefile, boardimageName, boardimageOriName, boardimageUrl FROM SEQUENCE_FREEBOARDFILE WHERE seq=#{seq}")
	public FreeBoardFileDto selectOne1(int seq);
	
//	@Select("SELECT * FROM FREEBOARD WHERE NUM = #{num}")
//	public List<FreeBoardDto> detail(int num);
	
	@Insert("INSERT INTO SEQUENCE_FREEBOARD  VALUES(#{seq}, #{title}, #{name}, #{content}, now())")
  	public void insertPro(FreeBoardDto dto);
	
//	@Select("SELECT MAX(NUM) FROM SEQUENCE_FREEBOARD")
//	public int maxNum();
	
	@Update("UPDATE SEQUENCE_FREEBOARD SET TITLE = #{title}, CONTENT = #{content}  WHERE seq = #{seq}")
	public void modify(FreeBoardDto dto);
	
	@Update("UPDATE SEQUENCE_FREEBOARDFILE SET TITLE=#{title} WHERE seq = #{seq}")
	public void modify1(FreeBoardFileDto freeBoardFileDto);
	
	@Delete("DELETE FROM SEQUENCE_FREEBOARD WHERE seq = #{seq}")
	public void delete(int seq);
	
	@Delete("DELETE FROM SEQUENCE_FREEBOARDFILE WHERE seq = #{seq}")
	public void delete1(int seq);
	
	@Insert("INSERT INTO SEQUENCE_FREEBOARDFILE VALUES(#{seq}, #{title}, #{name}, now(), #{content}, #{boardimagegefile},  #{boardimageName}, #{boardimageOriName}, #{boardimageUrl})")
	public int insert(FreeBoardFileDto freeBoardFileDto);
	
	@Update("update sequence_freeboardfile set boardimageName ='' \r\n" + 
			"		where 1=1 and boardimageName \r\n" + 
			"		= (select * from (select boardimageName from sequence_freeboardfile where seq=#{seq} ) as temp );")
	public void deletefile(String boardimageName);
	
	@Select("SELECT boardimageName FROM SEQUENCE_FREEBOARDFILE WHERE seq = #{seq}")
	public List<String> getAttach(int seq);
	
	
//	@Select("SELECT COUNT(NUM) FROM FREEBOARDFILE")
//	public FreeBoardDto1 fileDetail(int num);
	
//	  @Select("SELECT COUNT(*) FROM FREEBOARD")
//	  public int getCount(HashMap<String, Object> map);
//	  
//	  @Select("SELECT * FROM FREEBOARD")
//	  public List<Map<String ,Object>> getSearchList(Map<String, Object> map);
//	  
//	  
//	  @Select("SELECT * FROM FREEBOARD WHERE NUM = #{num}")
//	  public FreeBoardDto getDetailByNum();
//	
//	
////	  @Select("SELECT * FROM FREEBOARD ")
////	  public List<FreeBoardDto> selectList(Pagination pagination);
////	  
////	  @Select("SELECT COUNT(NUM) FROM FREEBOARD")
////	  public int totalCount();
////	  
////	
////	  
////	  @Select("SELECT MAX(NUM) FROM FREEBOARD")
////	  public int maxNum();
////	  
	
////	  
////	  @Insert("INSERT INTO FREEBOARD VALUES(NUM, TITLE, CONTENT, NAME, REGDATE")
////	  public FreeBoardDto afterInsert(int maxNum);
////	  
//	  
	
}



