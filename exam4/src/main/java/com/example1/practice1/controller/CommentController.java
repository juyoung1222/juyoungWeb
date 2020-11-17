package com.example1.practice1.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.example1.practice1.domain.CommentVO;
import com.example1.practice1.service.CommentService;

@Controller
@RequestMapping("/comment")
public class CommentController {
	
	@Resource(name="com.example1.practice1.service.CommentService")
	CommentService mCommentService;
	
	@RequestMapping("/insert")
	@ResponseBody
	private int mCommentServiceInsert(@RequestParam int bno, @RequestParam String content) throws Exception{
		System.out.println("mCommentServiceInsert...");
		System.out.println("bno[" + bno + "]");
		System.out.println("content[" +content+"]");
		
		CommentVO comment = new CommentVO();
		comment.setBno(bno);
		comment.setContent(content);
		comment.setWriter("user");
		
		return mCommentService.commentInsertService(comment);
	}
	//댓글 리스트
    @RequestMapping("/list/{bno}") 
    @ResponseBody
    private List<CommentVO> mCommentServiceList(@PathVariable int bno,Model model) throws Exception{
		System.out.println("mCommentServiceList.....");
       return mCommentService.commentListService(bno);
    }
    
    //댓글 수정
    @RequestMapping("/update")
    @ResponseBody
    private int mCommentServiceUpdate(@RequestParam int cno, @RequestParam String content) throws Exception{
    	System.out.println("mCommentServiceUpdateProc...");
    	CommentVO comment = new CommentVO();
		comment.setCno(cno);
		comment.setContent(content);
		
		return mCommentService.commentUpdateService(comment);
    }
    
    //댓글 삭제
    @RequestMapping("/delete/{cno}")
    @ResponseBody
    private int mCommentServiceDelete(@PathVariable int cno) throws Exception{
    	System.out.println("mCommentServiceDelete");
    	
    	return mCommentService.commentDeleteService(cno);
    }
  
	

}
