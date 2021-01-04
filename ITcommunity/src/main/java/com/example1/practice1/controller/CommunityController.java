package com.example1.practice1.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.domain.CommunityDTO;
import com.example1.practice1.domain.MemberDTO;
import com.example1.practice1.domain.PageMaker;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.service.CommunityService;

@Controller
@RequestMapping("/community")
public class CommunityController {
	
	// 로깅을 위한 변수
	private static final Logger logger 
		= LoggerFactory.getLogger(CommunityController.class);
	
	@Resource(name = "com.example1.practice1.service.CommunityService")
	CommunityService service;
	
	//커뮤니 글 등록 GET
	@RequestMapping("/communityInsert")
	private String communityInsertForm() {
		System.out.println("CommunityController insert....");
		
		return "/community/communityInsert";
	}//end - private String communityInsertForm()
	
	@RequestMapping("/insertProc")
	private String communityInsertProc(@ModelAttribute CommunityDTO communityDTO, HttpServletRequest request,HttpSession session, Model model) throws Exception{
		
		logger.info("insertProc get...");
		MemberDTO memberDTO = new MemberDTO();
		
		String writer = (String)session.getAttribute("userId");
		
		logger.info("subject : " + request.getParameter("subject") );
		logger.info("writer : " + request.getParameter("writer"));
		
		//입력할 창의 값들을 요청한다.
		communityDTO.setSubject(request.getParameter("subject"));
		communityDTO.setContent(request.getParameter("content"));
		communityDTO.setWriter(request.getParameter("writer"));
		
		
		memberDTO.setUserId(writer);
		
		service.insertCommunity(communityDTO);
		return "redirect:/community/communityList";
	}//end - private String communityInsertProc(@ModelAttribute CommunityDTO communityDTO, HttpServletRequest request,HttpSession session, Model model) throws Exception
	
	//커뮤니티글 목록보기
	@RequestMapping(value="/communityList", method = { RequestMethod.GET, RequestMethod.POST})
	private String communityList(Model model, @ModelAttribute("scri") SearchCriteria scri) throws Exception{
		logger.info("communityList get....");
		
		List<CommunityDTO> list = service.communityList(scri);
		model.addAttribute("list", list);
		
		//페이징처리
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(scri);
		pageMaker.setTotalCount(service.listCount(scri));
		model.addAttribute("pageMaker", pageMaker);
		
		return "/community/communityList";
	}//end - private String communityList(Model model, @ModelAttribute("scri") SearchCriteria scri) throws Exception
	
	//말머리별 리스트
	@RequestMapping("/communityList/{boardchoice}")
	private String communityChoice(@PathVariable String boardchoice, Model model,HttpServletRequest request) throws Exception{
		
		logger.info("communitychoice ...");
			
		model.addAttribute("communitychoice", service.communitychoice(boardchoice));
		
		return "/community/communityList";
				
	}//end - private String communityChoice(@PathVariable String boardchoice, Model model,HttpServletRequest request) throws Exception
	
	//댓글을 달수 있는 상세화면
	@RequestMapping("/detailComment/{boardNo}")
	private String comment(@PathVariable int boardNo, Model model) throws Exception{
		logger.info("detailcomment get...");
		
		model.addAttribute("detail", service.detail(boardNo));
		
		model.addAttribute("board", service.boardHit(boardNo));
		
		//댓글리스트 보기
		List<CommentDTO> commentDTO = new ArrayList<CommentDTO>();
		commentDTO = service.commentList(boardNo);
		logger.info("return comment : " + commentDTO);
		model.addAttribute("comment", commentDTO);
		
		
		return "/community/detailComment";
	}//end - private String comment(@PathVariable int boardNo, Model model) throws Exception
	
	//게시글 좋아요
	@ResponseBody
	@RequestMapping(value="/like",method=RequestMethod.POST)
	private int like(@RequestParam int boardNo,String userid,HttpSession session) throws Exception{
		logger.info("boardcontroller like..." + boardNo);
		logger.info("boardcontroller like..."  + userid);
		
		
		service.insertLike(boardNo);
		
		service.writeLike(boardNo,userid);
		
		int result = service.getLike(boardNo);
		logger.info("boardcontroller return value [" + result +"]");
		return result;
	}//end - private int like(@RequestParam int boardno,String userid,HttpSession session) throws Exception

	
	//커뮤니티글 수정화면
	@RequestMapping("/communityUpdate/{boardNo}")
	private String getUpdate(@PathVariable int boardNo, Model model) throws Exception{
		logger.info("update get...");
		model.addAttribute("detail", service.detail(boardNo));
		
		return "/community/communityUpdate";
	}//end - private String getUpdate(@PathVariable int boardNo, Model model) throws Exception
	
	//커뮤니티글 수정화면에서 수정할 자료를 업데이트한다.
	@RequestMapping("/updateProc")
	private String communityUpdateProc(HttpServletRequest request) throws Exception{
		
		logger.info("updateproc get...");
		CommunityDTO communityDTO = new CommunityDTO();
		
		communityDTO.setSubject(request.getParameter("subject"));
		communityDTO.setContent(request.getParameter("content"));
		communityDTO.setBoardNo(Integer.parseInt(request.getParameter("boardNo")));
		
		service.update(communityDTO);
		return "redirect:/community/detailComment/" + request.getParameter("boardNo");
	}//end - private String communityUpdateProc(HttpServletRequest request) throws Exception
	
	//커뮤니티글 삭제
	@RequestMapping("/communityDelete/{boardNo}")
	private String getDelete(@PathVariable int boardNo, Model model) throws Exception{
		logger.info("delete get...");
		
		service.delete(boardNo);
		return "redirect:/community/communityList";
	}

}//end - public class CommunityController
