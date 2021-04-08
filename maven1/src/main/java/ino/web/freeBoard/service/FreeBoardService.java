package ino.web.freeBoard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ino.web.freeBoard.dto.FreeBoardDto;
import ino.web.freeBoard.dto.FreeBoardFileDto;
import ino.web.freeBoard.dto.Pagination;
import ino.web.freeBoard.dto.SearchCriteria;
import ino.web.freeBoard.mapper.FreeBoardMapper;

@Service
public class FreeBoardService {

	@Autowired
	private SqlSession sqlSession;
	
//	public List<FreeBoardDto> selectList(Pagination pagination){
//		return sqlSession.selectList("selectList", pagination);
//	}
	
	public List<FreeBoardDto> selectList(SearchCriteria scri){
		
		return sqlSession.selectList("selectList", scri);
	}
	
	public List<FreeBoardFileDto> selectList1(SearchCriteria scri){
		return sqlSession.selectList("selectList1",scri);
	}
	
//	public List<FreeBoardDto> search(Pagination pagination){
//		return sqlSession.selectOne("search", pagination);
//	}
	
	public int totalCount(){
		return sqlSession.selectOne("totalCount");
	}
	
	public int totalCount1() {
		return sqlSession.selectOne("totalCount1");
	}
	
	public FreeBoardDto selectOne(int seq){
		return sqlSession.selectOne("selectOne", seq);
	}
	
	public FreeBoardFileDto selectOne1(int seq) {
		return sqlSession.selectOne("selectOne1", seq);
	}

	public void modify(FreeBoardDto dto){
		sqlSession.update("modify", dto);
	}
	
	public void modify1(FreeBoardFileDto freeBoardFileDto) {
		sqlSession.update("modify1",freeBoardFileDto);
	}
	
	
	
//	
//	public FreeBoardDto afterInsert(int maxNum){
//		return sqlSession.selectOne("selectOne", maxNum);
//	}
	
//	public int maxNum(){
//		return sqlSession.selectOne("maxNum");
//	}
	
	public void insert(FreeBoardDto dto){
		sqlSession.insert("insertPro", dto);
	}
	
	public void delete(int seq){
		sqlSession.delete("delete", seq);
	}	
	
	public void delete1(int seq) {
		sqlSession.delete("delete1",seq);
	}
//	public List<FreeBoardFileDto> attachList(int seq){
//		return sqlSession.selectList("attachList", seq);
//	}
	
	
	
	public void fileInsert(FreeBoardFileDto freeBoardFileDto) {
		sqlSession.insert("insert",freeBoardFileDto);
	}
	
	public List<String> getAttach(int seq){
		return sqlSession.selectList("getAttach", seq);
	}
	
	public void deletefile(String boardimageName) {
		sqlSession.delete("deletefile", boardimageName);
	}
	
	
//	
//	public FreeBoardDto fileDetail(int num){
//		return sqlSession.selectOne("selectOne", num);
//	}
//	
	
}
