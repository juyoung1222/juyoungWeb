package com.example1.practice1.controller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
		return "/board/list";
	}
	@RequestMapping(value="/list", method=RequestMethod.POST)
	public String list() throws Exception{
		logger.info("post list");
		return "/board/list";

}

}