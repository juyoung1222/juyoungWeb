package com.example1.practice1.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.CommVO;
import com.example1.practice1.domain.PageMaker;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.service.CommService;

@Controller
@RequestMapping("/comm")
public class CommController {
	
	//로깅을 위한 변수
	private static final Logger logger 
		= LoggerFactory.getLogger(CommController.class);
	
	@Resource(name="com.example1.practice1.service.CommService")
	CommService service;
	
	//커뮤니티 글 등록GET
	@RequestMapping(value="/commInsert",method=RequestMethod.GET)
	private String commInsertForm() {
		System.out.println("CommController insert......");
		return "/comm/commInsert";
	}
	
	@RequestMapping("/insertProc")
	private String commInsertProc(HttpServletRequest request) throws Exception{
		CommVO comm = new CommVO();
		
		comm.setSubject(request.getParameter("subject"));
		comm.setWriter(request.getParameter("writer"));
		comm.setContent(request.getParameter("content"));
		
		service.insertComm(comm);
		return "redirect:/comm/commList";
	}
	//커뮤니티 글 목록보기
	@RequestMapping(value="/commList",method=RequestMethod.GET)
	private String boardList(Model model,@ModelAttribute("scri") SearchCriteria scri) throws Exception{
		
		logger.info("commList get...");
		
		List<CommVO> list = service.commList(scri);
		model.addAttribute("list", list);
		
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(scri);
		pageMaker.setTotalCount(service.listCount(scri));
		model.addAttribute("pageMaker", pageMaker);
		return "/comm/commList";
	}//end - private String boardList(Model model,@ModelAttribute("scri") SearchCriteria scri) throws Exception
	
	//게시글 상세보기GET
	@RequestMapping("/commDetail/{cno}")
	private String commDetail(@PathVariable int cno,Model model) throws Exception{
		logger.info("commDetail get....");
		model.addAttribute("detail", service.commDetail(cno));
		return "/comm/commDetail";
	}
	
	//댓글을 달수 있는 상세화면
	@RequestMapping("/detailComment/{cno}")
	private String comment(@PathVariable int cno,Model model) throws Exception{
		logger.info("detailComment...");
		model.addAttribute("detail", service.commDetail(cno));
		return "/comm/detailComment";
	}
	//커뮤니티글 수정
	@RequestMapping("/commUpdate/{cno}")
	private String commUpdate(@PathVariable int cno,Model model) throws Exception{
		logger.info("commUpdate....");
		model.addAttribute("detail", service.commDetail(cno));
		return "/comm/commUpdate";
	}
	//커뮤니티글 수정 화면에서 수정할 자료를 업데이트한다.
	@RequestMapping("/updateProc")
	private String boardUpdateProc(HttpServletRequest request) throws Exception{
		
		logger.info("updateproc get........");
		CommVO comm = new CommVO();
		
		comm.setSubject(request.getParameter("subject"));
		comm.setContent(request.getParameter("content"));
		comm.setCno(Integer.parseInt(request.getParameter("cno")));
		
		service.commUpdate(comm);
		return "redirect:/comm/commDetail/" + request.getParameter("cno");
	}
	//커뮤니티 글 삭제
	@RequestMapping("/commDelete/{cno}")
	private String getDelete(@PathVariable int cno,Model model) throws Exception{
		service.commDelete(cno);
		return "redirect:/comm/commList";
	}

}
