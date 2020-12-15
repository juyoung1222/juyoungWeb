package com.example1.practice1.controller;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.example1.practice1.domain.BoardDTO;
import com.example1.practice1.domain.FileDTO;
import com.example1.practice1.domain.PageMaker;
import com.example1.practice1.domain.Pagination;
import com.example1.practice1.domain.ProductDTO;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.service.ProductService;

@Controller
@RequestMapping("/product")
public class ProductController {
	
	// 로깅을 위한 변수
		private static final Logger logger 
			= LoggerFactory.getLogger(ProductController.class);
	@Resource
	ProductService service;
	
	//상품등록(GET)
	@RequestMapping("/productInsert")
	private String productInsertForm() {
		logger.info("productInsert get......");
		return "/product/productInsert";
	}//end - private String productInsertForm()
	
	@RequestMapping(value="/insertProc",method=RequestMethod.POST)
	private String productInsertProc(HttpServletRequest request,@RequestPart MultipartFile productimagefile) throws Exception{
		logger.info("insertProc post...");
		
		ProductDTO productDTO = new ProductDTO();
		//Pagination page = new Pagination();
		
		//logger.info("Files : "+request.getParameter("productimagefile"));
		logger.info("productname : " + request.getParameter("productname"));
		
		productDTO.setProductkind(request.getParameter("productkind"));
		productDTO.setProductname(request.getParameter("productname"));
		//productDTO.setProductimagefile(request.getParameter("productimagefile"));
		productDTO.setProductprice(Integer.parseInt(request.getParameter("productprice")));
		productDTO.setProductsalescnt(Integer.parseInt(request.getParameter("productsalescnt")));
		productDTO.setProductcontent(request.getParameter("productcontent"));
		productDTO.setProductdiscount(Integer.parseInt(request.getParameter("productdiscount")));
		productDTO.setProductcid(Integer.parseInt(request.getParameter("productcid")));
		
		//service.productInsert(productDTO);
		
		if(productimagefile.isEmpty()) {
			logger.info("isEmpty........" );
			//service.productInsert(productDTO);
		}else {
			logger.info("NOT isEmpty........" );
			
			System.out.println("productimagefile" + productimagefile);
			
			String 	Productimagefile = productimagefile.getOriginalFilename();
			//String ProductimageOriName = productimagefile.getOriginalFilename();
			String 	imagefileNameExtension = FilenameUtils.getExtension(Productimagefile).toLowerCase();
			File 	destinationFile;
			String 	destinationFileName;
			// fileUrl = "uploadFiles 폴더의 위치";
			// upload 폴더의 위치 확인 : upload 우클릭 -> Properties -> Resource - >
			// Location
			String productimagefileUrl = "C:\\Users\\JY-CHOI\\Desktop\\shoppingmallproject\\src\\main\\resources\\static\\upload\\";
			
			                          
			do {
				destinationFileName = RandomStringUtils.randomAlphanumeric(100) + "." + imagefileNameExtension;
				destinationFile = new File(productimagefileUrl + destinationFileName);
			} while (destinationFile.exists());

			// MultipartFile.transferTo() : 요청 시점의 임시 파일을 로컬 파일 시스템에 영구적으로 복사해준다.
			destinationFile.getParentFile().mkdirs();
			productimagefile.transferTo(destinationFile);
			
			productDTO.setProductno(productDTO.getProductno());
			productDTO.setProductimagefileName(destinationFileName);
			productDTO.setProductimagefileOriName(Productimagefile);
			//productDTO.setProductimageoriname(ProductimageOriName);
			productDTO.setProductimagefileUrl(productimagefileUrl);

			
			System.out.println("Product Controller product : " + productDTO);
			service.productInsert(productDTO);
		}

		return "redirect:/product/productList";
	}//end - private String productInsertProc(HttpServletRequest request,@RequestPart MultipartFile productimagefile) throws Exception
	
	// 상품 목목록보기
	@RequestMapping("/productList")
	private String productList(Model model, @ModelAttribute("scri") SearchCriteria scri) throws Exception {
		
		logger.info("productList get...");
				
			List<ProductDTO> list = service.productList(scri);
			model.addAttribute("list", list);
				
			PageMaker pageMaker = new PageMaker();
			pageMaker.setCri(scri);
			pageMaker.setTotalCount(service.listCount(scri));
			model.addAttribute("pageMaker", pageMaker);
			
			
			return "/product/productList";
		}//end - private String productList(Model model, @ModelAttribute("scri") SearchCriteria scri) throws Exception 
	
	//말머리별 리스트
	@RequestMapping("/productList/{productkind}")
	private String productkindList(@PathVariable String productkind, Model model,HttpServletRequest request) throws Exception{
		
		logger.info("productkindList ...");
		
		//String kindList = request.getParameter("productkind");
		
		model.addAttribute("productkindlist", service.productkindList(productkind));
	
		return "/product/productList";
			
	}
	
//	// 게시글 카테고리 목록 보여주기
//	@RequestMapping(value = "/productList/{productcid}", method = RequestMethod.GET)
//	private String ProductcateList(@PathVariable int productcid, Model model) throws Exception {
//		
//		logger.info("productcid : " + productcid);
//		// 전체 게시글 개수
//		int listCnt = service.getProductListCnt();
//
//		// Pagination 객체생성
//		Pagination pagination = new Pagination();
//
//		int page = 1;
//		int range = 1;
//			pagination.pageInfo(page, range, listCnt);
//			pagination.setProductid(productcid);
//				System.out.println("*****productcid : " + pagination.getProductcid());
//				
//			model.addAttribute("pagination", pagination);
//				
//			model.addAttribute("list", service.productcateListService(pagination));
//				
//		return "/product/productList";
//	}//end - private String ProductcateList(@PathVariable int productid, Model model) throws Exception
//	
	
	//상품리스트 상세보기
	@RequestMapping(value = "/productDetail/{productno}", method = RequestMethod.GET)
	private String detailProduct(@PathVariable int productno ,Model model) throws Exception {

		logger.info("detailProduct get...");
		model.addAttribute("product", service.detailProduct(productno));// 게시글으리 정보를 가져와서 저장한다.
		
		return "/product/productDetail";
	
	}//end - private String detailProduct(@PathVariable int productno ,Model model) throws Exception
	
	//메인 검색 기능
	@RequestMapping("/searchList")
	private String searchList( Model model, HttpServletRequest request) throws Exception {

		logger.info("ProductController productlist.....");
				
		logger.info("searchList :  " + request.getParameter("searchName"));
				
		model.addAttribute("search", service.search(request.getParameter("searchName")));
				
		return "/product/searchList";
	}//end - private String searchList( Model model, HttpServletRequest request) throws Exception  
	

	//상품수정
	@RequestMapping(value="/productUpdate/{productno}", method=RequestMethod.GET)
	private String getProductUpdate(@PathVariable int productno,Model model) throws Exception{
		logger.info("update get.....");
		model.addAttribute("product", service.detailProduct(productno));
		
		return "/product/productUpdate";
	}//end - private String getProductUpdate(@PathVariable int productno,Model model) throws Exception
	
	//상품 수정 화면에서 수정할 자료를 업데이트한다.
	@RequestMapping("/updateProc")
	private String productUpdateProc(HttpServletRequest request) throws Exception {

		logger.info("updateproc get........");
		ProductDTO productDTO  = new ProductDTO();
		
			//업데이트 할 정보를 요청한다.
			productDTO.setProductname(request.getParameter("productname"));
			logger.info("productname : " + request.getParameter("productname"));
			
			productDTO.setProductcontent(request.getParameter("productcontent"));
			logger.info("productcontent : " + request.getParameter("productcontent"));
			
			logger.info("productno : " + request.getParameter("productno"));
			productDTO.setProductno(Integer.parseInt(request.getParameter("productno")));
			
			service.updateProduct(productDTO);
		
		return "redirect:/product/productDetail/" + request.getParameter("productno");
	}
	
	//상품삭제
	@RequestMapping(value="/productDelete/{productno}",method=RequestMethod.GET)
	private String productDelete(@PathVariable int productno,HttpSession session) throws Exception{
		
		logger.info("prodelete......");
		service.deleteProduct(productno);
		
		session.invalidate();
		
		return "redirect:/product/productList";
	}
	
}
