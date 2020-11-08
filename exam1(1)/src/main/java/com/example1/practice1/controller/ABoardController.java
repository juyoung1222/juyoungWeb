package com.example1.practice1.controller;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example1.practice1.controller.ABoardController;
import com.example1.practice1.domain.ABoardVO;
import com.example1.practice1.service.ABoardService;

@Controller
@RequestMapping("/board")
public class ABoardController {
	private static final Logger logger 
	= LoggerFactory.getLogger(ABoardController.class);
	
	@Resource(name = "com.example1.practice1.service.ABoardService")
	ABoardService service;
	
	//게시글 등록
	@RequestMapping("/insert")
	public String insertForm() {
		logger.info("insert get...........");
		return "/board/insert";
	}
	
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	public String insertPost(ABoardVO vo,Model model) throws Exception{
		logger.info("insert post...........");
		service.boardInsert(vo);
		return "redirect:/board/list";
	}
	//게시글 목록
	@RequestMapping(value="/list",method=RequestMethod.GET)
	public String getList(Model model) throws Exception{
		logger.info("get list");
		List<ABoardVO> list = service.boardList();
		model.addAttribute("list", list);
		return "/board/list";
	}

	//게시글 상세보기
	@RequestMapping("/view/{b_no}")
	public String postdetail(@PathVariable int b_no,Model model) throws Exception{
		logger.info("view get...........");
		ABoardVO vo = service.detail(b_no);
		model.addAttribute("vo", vo);
		return "/board/view";
	}
	@RequestMapping(value="/update/{b_no}",method=RequestMethod.GET)
	public String getUpdate(@PathVariable int b_no,ABoardVO vo,Model model) throws Exception{
		logger.info("update get.........");
		return "/board/update";
	}
	
	@RequestMapping(value="/update",method=RequestMethod.POST)
	public String postUpdate(ABoardVO vo,Model model,BindingResult result) throws Exception{
		logger.info("update post........");
		service.update(vo);
		model.addAttribute("vo", vo);
		return "redirect:/board/list";
	}
	@RequestMapping(value="/delete/{b_no}",method=RequestMethod.GET)
	public String getDelete(@PathVariable int b_no,Model model) throws Exception{
		logger.info("delete get.......");
		service.delete(b_no);
		
		return "redirect:/board/list";
	}
	
	
	

}