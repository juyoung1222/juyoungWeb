package com.example1.practice1.controller;

import java.net.InetAddress;
import java.sql.Date;
import java.util.List;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.example1.practice1.domain.CommentDTO;
import com.example1.practice1.service.CommentService;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


@Controller
@RequestMapping("/comment")
public class CommentController {
	
	@Resource(name="com.example1.practice1.service.CommentService")
	CommentService mCommentService;
	
	// 로깅을 위한 변수
		private static final Logger logger = LoggerFactory.getLogger(CommentController.class);
	//댓글 등록
	@RequestMapping(value="/insert",method= {RequestMethod.POST, RequestMethod.GET } )
	@ResponseBody
	private int mCommentServiceInsert(@RequestParam String replywriterid, @RequestParam String replytext, @RequestParam int replycontentid) throws Exception{
		
		logger.info("comment insert ....");
		System.out.println("mCommentServiceInsert...");
		//System.out.println("replyno[" + replyno + "]");
		
		logger.info("replytext[" + replytext + "]");
		logger.info("replywriterid ===> " + replywriterid);
		logger.info("replycontentid ===> " + replycontentid);
		
		
		HttpServletRequest req = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		/*
		String replyip = req.getHeader("X-FORWARDED-FOR");
		if (replyip == null)
			replyip = req.getRemoteAddr();
		*/
		
		String replyip = req.getRemoteAddr();
		if(replyip.equalsIgnoreCase("0:0:0:0:0:0:0:1")) {
		    InetAddress inetAddress=InetAddress.getLocalHost();
		    replyip=inetAddress.getHostAddress();
		}
		System.out.println("클라이언트IP 주소: "+replyip);
		 
		
		logger.info("clientIP ===> " + replyip);
		
		CommentDTO comment = new CommentDTO();
		//comment.setReplyno(replyno);
		comment.setReplywriterid(replywriterid);
		comment.setReplytext(replytext);
		comment.setReplyip(replyip);
		comment.setReplycontentid(replycontentid);
		
		logger.info("comment:"+comment);
		
		return mCommentService.commentInsertService(comment);
		
		
	}//end -private int mCommentServiceInsert(@RequestParam String replywriterid, @RequestParam String replytext, @RequestParam int replycontentid) throws Exception
	
	//댓글목록보기
	@RequestMapping("/list/{boardno}")
	@ResponseBody
	//private List<CommentDTO> mCommentServiceList(@RequestParam int boardno, @PathVariable int replycontentid, @RequestParam String replywriterid, @RequestParam String replytext ) throws Exception{
	private List<CommentDTO> mCommentServiceList(@PathVariable int boardno, Model model) throws Exception{
	
		logger.info("comment list ......");
		System.out.println("mCommentServiceList...");
		
		logger.info("bno[" + boardno + "]");
		//logger.info("boardno[" + boardno);
		//logger.info("replycontentid[" + replycontentid);
		//logger.info("replytext[" + replytext + "]");
		//logger.info("replywriterid ===> " + replywriterid);
		//logger.info("replydate ===> " + replydate);
		
		 return mCommentService.commentListService(boardno);		
		
	}//end - private List<CommentDTO> mCommentServiceList(@RequestParam String replywriterid, @RequestParam String replytext,@RequestParam Date replydate ) throws Exception
}
