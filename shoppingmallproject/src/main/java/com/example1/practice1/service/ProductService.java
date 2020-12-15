package com.example1.practice1.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.example1.practice1.controller.ProductController;
import com.example1.practice1.domain.BoardDTO;
import com.example1.practice1.domain.FileDTO;
import com.example1.practice1.domain.Pagination;
import com.example1.practice1.domain.ProductDTO;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.mapper.ProductMapper;

@Service("com.example1.practice1.service.ProductService")
public class ProductService {
	
	@Resource
	ProductMapper mapper;
	
	// 로깅을 위한 변수
	private static final Logger logger 
		= LoggerFactory.getLogger(ProductController.class);
	
	//상품등록
	public int productInsert(ProductDTO productDTO) throws Exception{
		logger.info("productDTO : " + productDTO);
		return mapper.productInsert(productDTO);
	}
	//상품리스트 개수
	public int getProductListCnt() throws Exception{
		logger.info("listcnt.......");
		return mapper.getproductListCnt();
	}
//	//파일 올리기
//	public int fileInsert(FileDTO file) throws Exception{
//		logger.info("service fileInsert..... " + file);
//		return mapper.fileInsert(file);
//	}
		//상품리스트 목록보기
		@Transactional(isolation = Isolation.READ_COMMITTED)
		public List<ProductDTO> productList(SearchCriteria scri) throws Exception{
			logger.info("productlistservice :" + scri );
			//List<ProductDTO> list = mapper.productList(scri);
			return mapper.productList(scri);
		}
		
		//말머리리스트보기
		public List<ProductDTO> productkindList(String productkind) throws Exception{
			logger.info("productkindservice..." + productkind);
			return mapper.productkindList(productkind);
		}
		//상품리스트 총 갯수
		public int listCount(SearchCriteria scri) throws Exception {
			logger.info("productlistCount service ....." + scri);
			return mapper.listCount(scri);
		}
		//상품리스트 상세보기
		public ProductDTO detailProduct(int productno) throws Exception{
			logger.info("service detailProduct....." + productno);
			return mapper.detailProduct(productno);
		}
		
		//통합검색기능
		//public int productSearch(ProductDTO productDTO) throws Exception{
			//logger.info("service productSearch...." + productDTO);
			//return mapper.productSearch(productDTO);
		//}
		
		
		//상품수정
		public int updateProduct(ProductDTO productDTO) throws Exception{
			
			logger.info("service updateProduct..... " + productDTO);
			
			System.out.println("Productname : " + productDTO.getProductname());
			System.out.println("Productcontent : " + productDTO.getProductcontent());
			
			return mapper.updateProduct(productDTO );
		}
		//상품삭제
		public int deleteProduct(int productno) throws Exception{
			logger.info("service deleteProduct...." + productno);
			
			return mapper.deleteProduct(productno);
			
		}
		//메인 검색 기능
		public List<ProductDTO> search(String searchName) throws Exception{
			logger.info("service search...." + searchName);
			
			return mapper.search(searchName);
		}
		
//		//게시글 카테고리목록 보기
		public List<ProductDTO> productcateListService(Pagination pagination) throws Exception {
			System.out.println("productListService : " + pagination);
			return mapper.ProductcateList(pagination);
		}
			
	}
		
			

