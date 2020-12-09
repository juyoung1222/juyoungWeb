package com.example1.practice1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.Pagination;
import com.example1.practice1.domain.ProductCategoryiDTO;
import com.example1.practice1.domain.ProductDTO;



@Repository("com.example1.practice1.mapper.ProductMapper")
public interface ProductMapper {
	
	//게시글의 개수
	public int productCount() throws Exception;

	public int getproductListCnt() throws Exception;
	
	//게시글 목록 보기
	public List<ProductDTO> productList(Pagination pagination) throws Exception;
	
	//게시글 작성
	public int productInsert(ProductDTO product) throws Exception;
	
	//게시글 상제정보
	public ProductDTO productDetail(int productno) throws Exception;
	
	//파일올리기
	public int fileInsert(ProductDTO product) throws Exception;
		
	//파일 상세 정보
	public ProductDTO fileDetail(int Productno) throws Exception;
    
	//게시글 삭제
	public int productDelete(int Productno) throws Exception;

	//게시글 수정
	public int productUpdate(ProductDTO product) throws Exception;
	
	//product 카테고리
    public List<ProductDTO> ProductcateList(Pagination pagination) throws Exception;
    
    //메인 검색 기능
    public List<ProductDTO> search(String searchName) throws Exception;

}
