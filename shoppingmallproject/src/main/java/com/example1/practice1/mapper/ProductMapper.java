package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.Pagination;
import com.example1.practice1.domain.ProductDTO;
import com.example1.practice1.domain.SearchCriteria;

@Repository("com.example1.practice1.mapper.ProductMapper")
public interface ProductMapper {
	
	//게시글의 개수
	public int getproductListCnt() throws Exception;
	
	//상품추가
	public int productInsert(ProductDTO productDTO) throws Exception;
	
	//파일 올리기
	//public int fileInsert(FileDTO file) throws Exception;
	
	//상품리스트 목록보기
	public List<ProductDTO> productList(SearchCriteria scri) throws Exception;
	
	//말머리리스트보기
	public List<ProductDTO> productkindList(String productkind) throws Exception;

	//상품리스트 총 갯수
	public int listCount(SearchCriteria scri) throws Exception;
	
	//상품리스트 상세보기
	public ProductDTO detailProduct(int productno) throws Exception;
	
	//통합 검색 기능
	//public int productSearch(ProductDTO productDTO) throws Exception;
	
	//상품수정
	public int updateProduct(ProductDTO productDTO) throws Exception;
	
	//상품삭제
	public int deleteProduct(int productno) throws Exception;
	
	//메인 검색 기능
    public List<ProductDTO> search(String searchName) throws Exception;
    
    //product 카테고리
    public List<ProductDTO> ProductcateList(Pagination pagination) throws Exception;


}
