package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.example1.practice1.domain.Pagination;
import com.example1.practice1.domain.ProductCategoryiDTO;
import com.example1.practice1.domain.ProductDTO;
import com.example1.practice1.mapper.ProductMapper;

@Repository("com.example1.practice1.service.ProductService")
public class ProductService {
	
	//로깅을 위한 변수
	private static final Logger logger = LoggerFactory.getLogger(ProductService.class);
	
	@Resource(name="com.example1.practice1.mapper.ProductMapper")
	ProductMapper productMapper;
	
	public int getProductListCnt() throws Exception{
		
		return productMapper.getproductListCnt();
	}
	//게시글 목록 보기
	public List<ProductDTO> productListService(Pagination pagination) throws Exception {
		System.out.println("productListService : " + pagination);
		return productMapper.productList(pagination);
	}
	//게시글 등록
	public int productInsertService(ProductDTO product) throws Exception {
		return productMapper.productInsert(product);
	}
	//파일 올리기
	public int fileInsertService(ProductDTO product) throws Exception {
		return productMapper.fileInsert(product);
	}
	
	public ProductDTO fileDetailService(int productno) throws Exception {
		return productMapper.fileDetail(productno);
	}
	//게시글 상세보기
	public ProductDTO productDetailService(int productno) throws Exception {
		return productMapper.productDetail(productno);
	}
	//게시글 삭제		
	public int productDeleteService(int productno) throws Exception {
		return productMapper.productDelete(productno);
	}
	//게시글 수정
	public int update(ProductDTO productDTO) throws Exception{
		logger.info("service update..... " + productDTO);
		System.out.println("Productname : " + productDTO.getProductname());
		System.out.println("Productprice : " + productDTO.getProductprice());
		System.out.println("Productsalescnt : " + productDTO.getProductsalescnt());
		return productMapper.productUpdate(productDTO );
	}
	//게시글 카테고리목록 보기
	public List<ProductDTO> productcateListService(Pagination pagination) throws Exception {
		System.out.println("productListService : " + pagination);
		return productMapper.ProductcateList(pagination);
	}
//	// 서비스는 매퍼를 호출한다.
//	@Resource(name = "com.edu.Product.mapper.ProductMapper")
//	ProductMapper ProductMapper;

	//메인 검색 기능
	public List<ProductDTO> search(String searchName) throws Exception{
		logger.info("service search...." + searchName);
		
		return productMapper.search(searchName);
	}
}
