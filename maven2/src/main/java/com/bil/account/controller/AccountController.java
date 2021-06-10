package com.bil.account.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

//import com.bil.account.service.AccountService;
import com.bil.account.vo.Account1VO;
import com.bil.account.vo.AccountVO;
import com.bil.common.service.CommonService;
import com.bil.user.vo.UserVO;
import com.bil.util.CommUtils;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import egovframework.example.sample.service.SampleDefaultVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.bind.annotation.CommandMap;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;


@Controller
public class AccountController {


	@Resource(name = "jsonView")
	private MappingJackson2JsonView jsonView;

//	@Resource(name="accountService")
//	private AccountService accountService;

	@Resource(name="commonService")
	private CommonService commonService;
	
	@Resource
	private EgovPropertyService propertyService;

	/**
	 *
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	
//	@RequestMapping(value = "/account/accountList.do")
//	public String selectSampleList(HttpServletRequest request, ModelMap model) throws Exception {
//
//		Map<String, Object> inOutMap  = CommUtils.getFormParam(request);
//
//
//		model.put("inOutMap", inOutMap);
//		return "/account/accountList";
//	}
	@RequestMapping(value="/account/accountList.do")
	public ModelAndView accountList(@ModelAttribute("searchVO") SampleDefaultVO searchVO, HttpServletRequest request,ModelMap model) throws Exception{
		
	Map<String, Object> inOutMap  = CommUtils.getFormParam(request);
//	
//
		model.put("inOutMap", inOutMap);
//		
		ModelAndView mv = new ModelAndView("account/accountList");
		
		//List<SampleDefaultVO> list = commonService.selectList();
		
		//mv.addObject("list", map.get("result"));
		
		//mv.addObject("paginationInfo", (PaginationInfo)map.get("paginationInfo"));
		
		//return mv;
		
		//paginationinfo 처리
		//SampleDefaultVO searchVO = new SampleDefaultVO();
		
		searchVO.setPageUnit(propertyService.getInt("pageUnit"));//record count per page
		searchVO.setPageSize(propertyService.getInt("pageSize"));//페이지네이션 링크 수
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());//페이지번호
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());//페이지 당 행수 설정
		paginationInfo.setPageSize(searchVO.getPageSize());//페이지 링크 수
		
		searchVO.setFirstIndex(paginationInfo.getFirstPageNo()+1);//searchVO.firstIndex=0이므로
		searchVO.setLastIndex(paginationInfo.getLastPageNo());//한화면에 보여줄 리스트의 마지막 행수
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		List<Account1VO> selectList = commonService.selectList(searchVO);
		
		model.addAttribute("selectList", selectList);
		//model.addAttribute("list", list);
		
		//model.addAttribute("resultList", map.get("resultList"));
		//model.addAttribute("resultCnt", map.get("resultCnt"));
		
		int totCnt = commonService.selectOne(searchVO);
		
		paginationInfo.setTotalRecordCount(totCnt);
		
		
		
		model.addAttribute("pagenationInfo", paginationInfo);
		
		//int totCnt = Integer.parseInt("resultCnt");
		
		//paginationInfo.setTotalRecordCount(totCnt);
////		
////		System.out.println(list);
		
		//Map<String, Object>inOutMap  = CommUtils.getFormParam(request);
		
		//commonService.selectCombo(inOutMap);
		
		//System.out.println(inOutMap);
		
		//ModelAndView mv = new ModelAndView("jsonView");
		
		//mv.addObject("resultMap", commonService.selectList());
		System.out.println(paginationInfo);
		return mv;
	}
	


	/**
	 *
	 * @param request
	 * @return
	 * @throws Exception
	 */
	
	@RequestMapping(value="/account/accountInsert.do")
	
	public String accountInsert(HttpServletRequest request, ModelMap model) throws Exception{

		Map<String, Object> inOutMap = new HashMap<>();


		inOutMap.put("category", "A000000");
		inOutMap.put("category", "수익");
		
		List<EgovMap> resultMap= commonService.selectCombo(inOutMap);
		
		
		System.out.println(resultMap);
		System.out.println(inOutMap);
		model.put("resultMap", resultMap);

		return "/account/accountInsert";
	}
//	@ResponseBody
//	@RequestMapping(value="/account/accountInsert.do",method=RequestMethod.POST)
//	public ModelAndView postInsert(HttpServletRequest request,HttpSession session,
//									String profit_cost,String big_group, String middle_group, String small_group, String detail_group, String comments) throws Exception{
//		
//		Map<String, Object> inOutMap = new HashMap<>();
//		
//		ModelAndView mv = new ModelAndView();
//		
//		
//		
//		 commonService.insert(inOutMap);
//		
//		
////		
////		account1VO.setAccount_seq(Integer.parseInt(request.getParameter("account_seq")));
////		String account_seq = request.getParameter("account_seq");
////		account1VO.setProfit_cost(request.getParameter("profit_cost"));
////		account1VO.setBig_group(request.getParameter("big_group"));
////		account1VO.setMiddle_group(request.getParameter("middle_group"));
////		account1VO.setSmall_group(request.getParameter("small_group"));
////		account1VO.setDetail_group(request.getParameter("detail_group"));
////		account1VO.setComments(request.getParameter("comments"));
////		account1VO.setTransaction_money(Integer.parseInt(request.getParameter("transaction_money")));
////		account1VO.setWriter(request.getParameter("writer"));
////	
//		 
//		 inOutMap.put("profit_cost",profit_cost);
//			inOutMap.put("big_group",big_group);
//			inOutMap.put("middle_group",middle_group);
//			inOutMap.put("small_group",small_group);
//			inOutMap.put("detail_group",detail_group);
//			inOutMap.put("comments",comments);
//			
//		UserVO userVO = new UserVO();
//		
//		String writer = (String)session.getAttribute("userId");
//		
//		userVO.setUserId(writer);
//		
//		System.out.println(mv);
//		//System.out.println(account_seq);
//		return new ModelAndView(jsonView, inOutMap);
//	}

	
	@ResponseBody
	@RequestMapping(value="/account/accountInsert.do",method=RequestMethod.POST)
	private ModelAndView postInsert(HttpServletRequest request,Account1VO account1VO,String profit_cost, String big_group, String middle_group, String small_group, String detail_group, String comments) throws Exception{
		//Map<String, Object> inOutMap = new HashMap<>();
		
		Map<String, Object>inOutMap  = CommUtils.getFormParam(request);
		
		ModelAndView mv = new ModelAndView("/account/accountUpdate");
		
		inOutMap.put("profit_cost",profit_cost);
		inOutMap.put("big_group",big_group);
		inOutMap.put("middle_group",middle_group);
		inOutMap.put("small_group",small_group);
		inOutMap.put("detail_group",detail_group);
		inOutMap.put("comments",comments);
		
		commonService.insert(account1VO);
		
		HttpSession session = request.getSession();
		
		UserVO userVO = new UserVO();
		
		String writer = (String)session.getAttribute("userId");
		
		userVO.setUserId(writer);
		
		System.out.println(account1VO);
		
		return mv;
		
	}

	
	
	/**
	 *
	 * @param request
	 * @return
	 * @throws Exception
	 */
	
	@RequestMapping(value="/account/selectCombo.do",method= {RequestMethod.POST, RequestMethod.GET})
	@ResponseBody
	public ModelAndView ajaxtest(HttpServletRequest request,String code, String comKor) throws Exception{
		System.out.println("/account/selectCombo.do");
		
		
		
		Map<String, Object>inOutMap  = CommUtils.getFormParam(request);
		
		//commonService.selectCombo(inOutMap);
		
		System.out.println(inOutMap);
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		mv.addObject("resultMap", commonService.selectCombo(inOutMap));
		
		
		AccountVO accountVO = new AccountVO();
		
		
		
		accountVO.setCode(code);
		accountVO.setComKor(comKor);
		
		
		
		
		
		System.out.println("controller : " + mv);
		System.out.println("controller : " + code);
		System.out.println("controller : " + comKor);
		//return mv;
		
		return new ModelAndView(jsonView, inOutMap);
	}
	
	@RequestMapping("/account/accountUpdate.do")
	private String getUpdate(HttpServletRequest request, ModelMap model,@PathVariable int account_seq) throws Exception{
		Map<String, Object> inOutMap = new HashMap<>();


		inOutMap.put("category", "A000000");
		inOutMap.put("category", "수익");
		
		List<EgovMap> resultMap= commonService.selectCombo(inOutMap);
		
		
		System.out.println(resultMap);
		System.out.println(inOutMap);
		model.put("resultMap", resultMap);

		return "/account/accountUpdate";
	}
	
	@ResponseBody
	@RequestMapping(value="/account/accountUpdate.do",method= RequestMethod.POST )
	private ModelAndView ajaxtest1(HttpServletRequest request,Account1VO account1VO, String profit_cost, String big_group, String middle_group, String small_group, String detail_group, String comments) throws Exception{
		
		Map<String, Object> map = CommUtils.getFormParam(request);
		
		System.out.println(map);
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		mv.addObject("resultMap", commonService.update(account1VO));
		
		
		
		//account_seq1 = Integer.parseInt(request.getParameter("account_seq"));
		//String account_seq = request.getParameter("account_seq").trim();
		
		//map.put("account_seq", Integer.parseInt(request.getParameter("account_seq")));
		map.put("profit_cost",profit_cost);
		map.put("big_group",big_group);
		map.put("middle_group",middle_group);
		map.put("small_group",small_group);
		map.put("detail_group",detail_group);
		map.put("comments",comments);
		
			//Account1VO account1VO = new Account1VO();
////		
			account1VO.setAccount_seq(Integer.parseInt(request.getParameter("account_seq")));
////		String account_seq = request.getParameter("account_seq");
////		account1VO.setProfit_cost(request.getParameter("profit_cost"));
////		account1VO.setBig_group(request.getParameter("big_group"));
////		account1VO.setMiddle_group(request.getParameter("middle_group"));
////		account1VO.setSmall_group(request.getParameter("small_group"));
////		account1VO.setDetail_group(request.getParameter("detail_group"));
////		account1VO.setComments(request.getParameter("comments"));
////		account1VO.setTransaction_money(Integer.parseInt(request.getParameter("transaction_money")));
////		account1VO.setWriter(request.getParameter("writer"));
////		
//		System.out.println(mv);
//		
//		//System.out.println("account_seq : " + account_seq );
//		
//		return "/account/accountUpdate";
//			
			//System.out.println(account_seq1);
			//System.out.println(account_seq);
			return new ModelAndView(jsonView, map);
		
	}
	
//	@RequestMapping(value="/account/accountList.do",method= {RequestMethod.POST, RequestMethod.GET})
//	public String accountList(@ModelAttribute("searchVO") SampleDefaultVO searchVO, HttpServletRequest request,Model model) throws Exception{
//		
//		
//		
//		ModelAndView mv = new ModelAndView();
//		
//		//paginationinfo 처리
//		//SampleDefaultVO searchVO = new SampleDefaultVO();
//		
//		searchVO.setPageUnit(propertyService.getInt("pageUnit"));
//		searchVO.setPageSize(propertyService.getInt("pageSize"));
//		
//		PaginationInfo paginationInfo = new PaginationInfo();
//		
//		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
//		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
//		paginationInfo.setPageSize(searchVO.getPageSize());
//		
//		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
//		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
//		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
//		
//		List selectList = commonService.selectList();
//		
//		model.addAttribute("resultList", selectList);
//		//model.addAttribute("list", list);
//		
//		//model.addAttribute("resultList", map.get("resultList"));
//		//model.addAttribute("resultCnt", map.get("resultCnt"));
//		
//		int totCnt = commonService.select(searchVO);
//		
//		paginationInfo.setTotalRecordCount(totCnt);
//		
//		model.addAttribute("pagenationInfo", paginationInfo);
//		
//		//int totCnt = Integer.parseInt("resultCnt");
//		
//		//paginationInfo.setTotalRecordCount(totCnt);
//////		
//////		System.out.println(list);
//		
//		Map<String, Object>inOutMap  = CommUtils.getFormParam(request);
//		
//		//commonService.selectCombo(inOutMap);
//		
//		System.out.println(inOutMap);
//		
//		//ModelAndView mv = new ModelAndView("jsonView");
//		
//		//mv.addObject("resultMap", commonService.selectList());
//		
//		return "/account/accountList";
//	}
	
//	@ResponseBody
//	@RequestMapping(value="/account/fileDownload.do",method={RequestMethod.POST, RequestMethod.GET})
//	public ModelAndView fileDownloadAjax(String fileLogicalName, String profit_cost, String big_group, String middle_group, String small_group,
//			String detail_group, String comments,
//			HttpServletRequest request,HttpServletResponse response,Model model) throws Exception{
//		//MultipartFile file = null;
//		
//		
//		
//		Account1VO account1VO = new Account1VO();
//		
//	
//		
//		Map<String, Object> inOutMap = CommUtils.getFormParam(request);
//		
//		List<Account1VO> list = commonService.fileDownload(response);
//		
//		response.setHeader("Content-Disposition", "attachment:filename=\"" + fileLogicalName + "\";" +  ".xlsx");
//		
//		inOutMap.put("profit_cost", profit_cost);
//		inOutMap.put("big_group", big_group);
//		inOutMap.put("middle_group", middle_group);
//		inOutMap.put("small_group", small_group);
//		inOutMap.put("detail_group", detail_group);
//		inOutMap.put("commnts", comments);
//		
//		list.add(account1VO);
////		
//		//String title = "회계정보리스트";
//		//String[] header = {"수익/비용", "관", "항", "목", "과", "금액", "등록일"};
//		//String[] order = {"account_seq", "profit_cost", "big_group", "middle_group", "small_group", "detail_group", "transaction_money" , "transaction_date" };
//		
////		inOutMap.put("category", list);
//		
////		System.out.println(inOutMap);
////		
//		
//		
//		
//		commonService.fileDownload(response);
//		
//		return new ModelAndView("categoryExcelView", "categoryMap", inOutMap);
//		
//	}
//		
	@ResponseBody
	@RequestMapping(value="/account/fileDownload",method={RequestMethod.POST, RequestMethod.GET})
	public ModelAndView fileDownload(String fileLogicalName, HttpServletRequest request,HttpServletResponse response, Model model)	throws Exception{
		Map<String, Object> inOutMap  = CommUtils.getFormParam(request);
		
		String path = "C:\\Users\\JY-CHOI\\Desktop\\eGovFrameDev-3.8.0-64bit\\workspace\\maven2\\src\\main\\webapp\\WEB-INF\\exceldownload\\";
		
		String realFileNm = "파일명.xls";
		
		
		commonService.fileDownload(response);
		
		//String target = inOutMap.get("target").toString()
		
		//response.setHeader("Content-Disposition", "attachment; fileName=\"list_excel.xls\";");
		//response.setHeader("Content-Transfer-Encoding", "binary");
		
		
//Map<String, Object> map = new HashMap<String, Object>();
		
		
		
		List<Account1VO> list =commonService.fileDownload(response);
		
		try {
			Workbook workbook = new HSSFWorkbook();
			
			Sheet sheet = workbook.createSheet("리스트");
			
			Row row = null;
			Cell cell = null;
			int rowNo = 0;
			
			//테이블 헤더용 스타일
			CellStyle headStyle = workbook.createCellStyle();
			
			//가는 경계선을 가짐
			headStyle.setBorderTop(BorderStyle.THIN);
			headStyle.setBorderBottom(BorderStyle.THIN);
			headStyle.setBorderLeft(BorderStyle.THIN);
			headStyle.setBorderRight(BorderStyle.THIN);
			
			//데이터는 가운데 정렬
			headStyle.setAlignment(HorizontalAlignment.CENTER);
			
			
			// 데이터용 경계 스타일 테두리만 지정
            CellStyle bodyStyle = workbook.createCellStyle();
            bodyStyle.setBorderTop(BorderStyle.THIN);
            bodyStyle.setBorderBottom(BorderStyle.THIN);
            bodyStyle.setBorderLeft(BorderStyle.THIN);
            bodyStyle.setBorderRight(BorderStyle.THIN);



			
			//헤더생성
            String[] exampleArr = {"수익/비용","관","항","목","과","금액","등록일"};
			row = sheet.createRow(rowNo++);
			for(int i =0; i < exampleArr.length;i++ ) {
			cell = row.createCell(0);
			cell.setCellStyle(headStyle);
			cell.setCellValue("수익/비용");
			
			cell = row.createCell(1);
			cell.setCellStyle(headStyle);
			cell.setCellValue("관");
			
			cell = row.createCell(2);
			cell.setCellStyle(headStyle);
			cell.setCellValue("항");
			
			cell = row.createCell(3);
			cell.setCellStyle(headStyle);
			cell.setCellValue("목");
			
			cell = row.createCell(4);
			cell.setCellStyle(headStyle);
			cell.setCellValue("과");
			
			cell = row.createCell(5);
			cell.setCellStyle(headStyle);
			cell.setCellValue("금액");
			
			cell = row.createCell(6);
			cell.setCellStyle(headStyle);
			cell.setCellValue("등록일");
			}
			for(Account1VO map : list) {
				//Map<String, Object> mapValue = (Map<String, Object>) map;
				
				row = sheet.createRow(rowNo++);
				cell = row.createCell(0);
				cell.setCellStyle(bodyStyle);
				cell.setCellValue(""+map.getProfit_cost());
                cell = row.createCell(1);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(""+map.getBig_group());
                cell = row.createCell(2);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(""+map.getMiddle_group());
                cell = row.createCell(3);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(""+map.getSmall_group());
                cell = row.createCell(4);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(""+map.getDetail_group());
                cell = row.createCell(5);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(""+map.getTransaction_money());
                cell = row.createCell(6);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(""+map.getTransaction_date());
				}
			
			//컨텐츠 타입과 파일명 지정
			response.setContentType("application/download;charset=utf-8");
			//response.setContentLength(contentLength);
			//response.setHeader("Content-Disposition", "attachment:filename=\"" + URLEncoder.encode(fileLogicalName, "utf-8") + ";");
			  response.setHeader("Content-Disposition", "ATTachment; Filename="+URLEncoder.encode("테스트","UTF-8")+".xls");

			response.setHeader("Content-Transfer-Encoding", "binary");
			
			//엑셀 출력
			FileOutputStream fileoutputstream = new FileOutputStream("D:\\\\roqkffhwk2.xls");
			workbook.write(fileoutputstream);
			workbook.close();
			fileoutputstream.close();
			
			
			
			} catch (Exception e) {

		}
	 

	

		System.out.println("엑셀 파일생성성공");
		
		//System.out.println(path + realFileNm);	
	 return new ModelAndView(jsonView, inOutMap);
	}
		
		
		





}// end of calss
