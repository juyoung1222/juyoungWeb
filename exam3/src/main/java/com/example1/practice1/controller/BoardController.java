package com.example1.practice1.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.PageCreator;
import com.example1.practice1.domain.PageVO;
import com.example1.practice1.domain.SearchVO;
import com.example1.practice1.service.BoardService;

@Controller
@RequestMapping("/board")
public class BoardController {
		
	//로깅을 위한 변수
	private static final Logger logger 
	= LoggerFactory.getLogger(BoardController.class);
	
	@Resource(name="com.example1.practice1.service.BoardService")
	BoardService service;
	
	
	
	
	//게시글 등록GET
	@RequestMapping(value="/boardInsert",method= {RequestMethod.GET,RequestMethod.POST})
	private String boardInsertForm() {
		System.out.println("BoardController insert......");
		return "/board/boardInsert";
	}//end - private String boardInsertForm()
	/*
	//게시글 등록POST
	@RequestMapping(value="/boardInsert",method=RequestMethod.POST)
	private String postBoardInsert(BoardVO vo) throws Exception{
		
		logger.info("insert post...." + vo);
		service.insertBoard(vo);
		return "/board/boardList";
	}//end - private String postBoardInsert
	*/
	
	
	@RequestMapping("/insertProc")
	private String boardInsertProc(HttpServletRequest request) throws Exception{
		
		logger.info("insertproc get........" );
		BoardVO vo = new BoardVO();
		
		
		vo.setSubject(request.getParameter("subject"));
		vo.setContent(request.getParameter("content"));
		vo.setWriter(request.getParameter("writer"));
		
		service.insertBoard(vo);
		return "redirect:/board/boardList";
	}
	
	//게시글 목록보기
	@RequestMapping(value="/boardList",method=RequestMethod.GET)
	private String boardList(Model model) throws Exception{
		
		logger.info("boardList get...");
		
		model.addAttribute("list", service.boardList());
		return "/board/boardList";
	}//end - public String boardList(Model model) throws Exception
	//페이징 처리 이후 게시물 목록 불러오기 요청
	@RequestMapping("/boardList")
	public String list(PageVO paging, Model model) throws Exception{
		List<BoardVO> list = service.getArticleListPaging(paging);
		
		//System.out.println("URL:/board/boardList GET -> result:" + list.size());
		System.out.println("parameter(페이지번호): " + paging.getPage() + "번");
		
		PageCreator pc = new PageCreator();
		pc.setPaging(paging);
		pc.setArticleTotalCount(service.countArticles());
		
		//list.forEach(article -> System.out.println(article));
		model.addAttribute("articles", list);
		model.addAttribute("pc", pc);
		return "board/boardList";
		
	}// end - public String list(PageVO paging, Model model) throws Exception
	
	
	
	
	//게시글 상세보기GET
	@RequestMapping(value="/boardDetail/{bno}", method=RequestMethod.GET)
	private String detail(@PathVariable int bno, Model model) throws Exception{
		
		logger.info("boarddatail get...");
		model.addAttribute("detail",service.detail(bno));
		return "/board/boardDetail";
	}//end - public String detail(@PathVariable int bno, Model model) throws Exception
	
	//댓글을 달수 있는 상세화면
	@RequestMapping(value="/detailComment/{bno}",method=RequestMethod.GET)
	private String comment(@PathVariable int bno,Model model) throws Exception{
		
		logger.info("comment get...");
		model.addAttribute("detail", service.detail(bno));//게시글으리 정보를 가져와서 저장한다.
		return "/board/detailComment";
		
	}//end - public String comment(@PathVariable int bno,Model model) throws Exception
	
	//게시글 수정 화면
	@RequestMapping(value="/boardUpdate/{bno}",method=RequestMethod.GET)
	private String getUpdate(@PathVariable int bno,Model model) throws Exception{
		logger.info("update get.....");
		model.addAttribute("detail", service.detail(bno));
		return "/board/boardUpdate";
	}//end - public String getUpdate(@PathVariable int bno,Model model) throws Exception
	
	
	//게시글 수정 화면에서 수정할 자료를 업데이트한다.
	@RequestMapping("/updateProc")
	private String boardUpdateProc(HttpServletRequest request) throws Exception{
		
		logger.info("updateproc get........");
		BoardVO vo = new BoardVO();
		
		vo.setSubject(request.getParameter("subject"));
		vo.setContent(request.getParameter("content"));
		vo.setBno(Integer.parseInt(request.getParameter("bno")));
		
		service.update(vo);
		return "redirect:/board/boardDetail/" + request.getParameter("bno");
	}
	@RequestMapping("/boardDelete/{bno}")
	private String getDelete(@PathVariable int bno,Model model) throws Exception{
		service.delete(bno);
		return "redirect:/board/boardList";
	}
	//검색
	@RequestMapping("/search")
	private String search(Model model) throws Exception{
		logger.info("search get.....");
		model.addAttribute("search", service.search());
		return "/board/boardList";
	}
	
	

	
	
}//end - public class BoardController
