package com.example1.practice1.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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

import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.domain.PageMaker;
import com.example1.practice1.domain.QnADTO;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.service.QnAService;

@Controller
@RequestMapping("/qna")
public class QnAController {
	
	@Resource(name="com.example1.practice1.service.QnAService")
	QnAService service;
	
	//로깅을 위한 변수
	private static final Logger logger 
	= LoggerFactory.getLogger(QnAController.class);
	
	//질문등록(get)
	@RequestMapping("/qnaInsert")
	private String qnaInsertForm() {
		System.out.println("qnaController insert..");
		return "/qna/qnaInsert";
	}//end - private String qnaInsertForm()
	
	//질문등록
	@RequestMapping("/qnaInsertProc")
	private String qnaInsertProc(HttpServletRequest request,@RequestPart MultipartFile qnaimagefile) throws Exception{
		
		logger.info("qnaInsertProc get...");
		
		QnADTO qnaDTO = new QnADTO();
		
		qnaDTO.setQnasubject(request.getParameter("qnasubject"));
		qnaDTO.setQnacontent(request.getParameter("qnacontent"));
		qnaDTO.setQnacid(Integer.parseInt(request.getParameter("qnacid")));
		
		if(qnaimagefile.isEmpty()) {//업로드할 파일이 없는 경우
			service.qnaInsert(qnaDTO);
		}else {//업로드할 파일이 있는 경우
			
			String Qnaimagefile = qnaimagefile.getOriginalFilename();
			String QnaimageOriName = qnaimagefile.getOriginalFilename();
			String fileNameExtension = FilenameUtils.getExtension(QnaimageOriName).toLowerCase();
			File destinationFile;
			String destinationFileName;
			
			String qnaimageurl = "C:\\Users\\JY-CHOI\\Documents\\workspace-spring-tool-suite-4-4.8.0.RELEASE\\ITcommunity\\src\\main\\resources\\static\\upload\\";
			
				do {
					destinationFileName=RandomStringUtils.randomAlphanumeric(32) + "." + fileNameExtension;
					destinationFile = new File(qnaimageurl + destinationFileName);
				}while(destinationFile.exists());
				
				destinationFile.getParentFile().mkdir();
				qnaimagefile.transferTo(destinationFile);
				
			//파일관련 자료를 qna테이블에 등록한다.
			qnaDTO.setBoardNo(qnaDTO.getBoardNo());			
			qnaDTO.setQnaimagefile(Qnaimagefile);
			qnaDTO.setQnaimagename(destinationFileName);
			qnaDTO.setQnaimageoriname(QnaimageOriName);
			qnaDTO.setQnaimageurl(qnaimageurl);
			
			System.out.println("QnA Controller : " + qnaDTO);
			service.qnaInsert(qnaDTO);
		}
			return "redirect:/qna/qnaList";
	}//end - private String qnaInsertProc(HttpServletRequest request,@RequestPart MultipartFile qnaimagefile) throws Exception
	
	//질문글 목록보기
	@RequestMapping(value="/qnaList",method = { RequestMethod.GET, RequestMethod.POST})
	private String qnaList(Model model, @ModelAttribute("scri") SearchCriteria scri) throws Exception{
		logger.info("qnaList...");
		
		List<QnADTO> list = service.qnaList(scri);
		model.addAttribute("list", list);
		
		//페이징처리
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(scri);
		pageMaker.setTotalCount(service.listCount(scri));
		model.addAttribute("pageMaker", pageMaker);
		
		return "/qna/qnaList";
		
	}//end - private String qnaList(Model model, @ModelAttribute("scri") SearchCriteria scri) throws Exception
	
	//답변을 달수 있는 상세화면
	@RequestMapping("/qnaDetail/{boardNo}")
	private String detail(@PathVariable int boardNo, Model model) throws Exception{
		logger.info("detail get..");
		
		model.addAttribute("detail", service.qnaDetail(boardNo));
		
		return "/qna/qnaDetail";
	}//end - private String detail(@PathVariable int qnano, Model model) throws Exception
	
	
	
}// end - public class QnAController
