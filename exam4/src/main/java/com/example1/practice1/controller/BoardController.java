package com.example1.practice1.controller;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.example1.practice1.domain.BoardVO;
import com.example1.practice1.domain.Criteria;
import com.example1.practice1.domain.FileVO;
import com.example1.practice1.domain.MemberVO;
import com.example1.practice1.domain.PageMaker;
import com.example1.practice1.domain.SearchCriteria;
import com.example1.practice1.service.BoardService;

@Controller
@RequestMapping("/board")
public class BoardController {

	// 로깅을 위한 변수
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Resource(name = "com.example1.practice1.service.BoardService")
	BoardService service;

	// 게시글 등록GET
	@RequestMapping(value = "/boardInsert", method = { RequestMethod.GET, RequestMethod.POST })
	private String boardInsertForm() {
		System.out.println("BoardController insert......");
		
		
		return "/board/boardInsert";
	}// end - private String boardInsertForm()
	/*
	 * //게시글 등록POST
	 * 
	 * @RequestMapping(value="/boardInsert",method=RequestMethod.POST) private
	 * String postBoardInsert(BoardVO vo) throws Exception{
	 * 
	 * logger.info("insert post...." + vo); service.insertBoard(vo); return
	 * "/board/boardList"; }//end - private String postBoardInsert
	 */
	//파일 등록
	@RequestMapping("/uploadInsert")
	private String uploadInsert(FileVO file, Model model) throws Exception{
		logger.info("uploadInsert get...");
		
		return "/board/uploadInsert";
	}

	@RequestMapping("/insertProc")
	private String boardInsertProc(HttpServletRequest request,@RequestPart MultipartFile files) throws Exception {

		logger.info("insertproc get........");
		BoardVO vo = new BoardVO();
		FileVO file = new FileVO();
		
		logger.info("Files:"+files.getOriginalFilename());
		logger.info("subject : " + request.getParameter("subject") );

		vo.setSubject(request.getParameter("subject"));
		vo.setContent(request.getParameter("content"));
		vo.setWriter(request.getParameter("writer"));
		
		service.insertBoard(vo);
		
		if(files.isEmpty()) {
			logger.info("isEmpty.....");
			service.insertBoard(vo);
		}else {
			logger.info("NOT isEmpty.....");
			
			String fileName = files.getOriginalFilename();
			String fileNameExtension = FilenameUtils.getExtension(fileName).toLowerCase();
			File destinationFile;
			String destinationFileName;
			String fileUrl = "D:\\project\\juyoungWeb\\exam4\\src\\main\\webapp\\WEB-INF\\views\\upload";
			
			do {
				destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + fileNameExtension;
				destinationFile = new File(fileUrl + destinationFileName);
			}while(destinationFile.exists());
			
			destinationFile.getParentFile().mkdir();
			files.transferTo(destinationFile);
			
		
			
			logger.info("FileName : " + destinationFileName);
			//파일관련 자료를 files테이블에 등록한다.
			file.setBno(vo.getBno());
			file.setFileName(destinationFileName);
			file.setFileOriName(fileName);
			file.setFileUrl(fileUrl);
			
			service.fileInsert(file);
		}
		return "redirect:/board/boardList";
		
		}

	// 게시글 목록보기
	@RequestMapping(value = "/boardList", method = { RequestMethod.GET, RequestMethod.POST })
	private String boardList(Model model, @ModelAttribute("scri") SearchCriteria scri) throws Exception {

		logger.info("boardList get...");
		
		
		
		List<BoardVO> list = service.boardList(scri);
		model.addAttribute("list", list);
		
		

		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(scri);
		pageMaker.setTotalCount(service.listCount(scri));
		model.addAttribute("pageMaker", pageMaker);
		
		List<BoardVO> search = service.searchList(scri);
		model.addAttribute("search", search);

		return "/board/boardList";
	}// end - private String boardList(Model model,@ModelAttribute("scri")
		// SearchCriteria scri) throws Exception
	

	// 게시글 상세보기GET
	@RequestMapping(value = "/boardDetail/{bno}", method = RequestMethod.GET)
	private String detail(@PathVariable int bno,Model model) throws Exception {

		logger.info("boarddatail get...");
		model.addAttribute("detail", service.detail(bno));
		model.addAttribute("board", service.boardHit(bno));
		model.addAttribute("upload", service.uploadFileList(bno));
		return "/board/boardDetail";
	}// end - public String detail(@PathVariable int bno, Model model) throws
		// Exception

	// 댓글을 달수 있는 상세화면
	@RequestMapping(value = "/detailComment/{bno}", method = RequestMethod.GET)
	private String comment(@PathVariable int bno, Model model) throws Exception {

		logger.info("comment get...");
		model.addAttribute("detail", service.detail(bno));// 게시글으리 정보를 가져와서 저장한다.
		return "/board/detailComment";

	}// end - public String comment(@PathVariable int bno,Model model) throws
		// Exception

	// 게시글 수정 화면
	@RequestMapping(value = "/boardUpdate/{bno}", method = RequestMethod.GET)
	private String getUpdate(@PathVariable int bno, Model model) throws Exception {
		logger.info("update get.....");
		model.addAttribute("detail", service.detail(bno));
		return "/board/boardUpdate";
	}// end - public String getUpdate(@PathVariable int bno,Model model) throws
		// Exception

	// 게시글 수정 화면에서 수정할 자료를 업데이트한다.
	@RequestMapping("/updateProc")
	private String boardUpdateProc(HttpServletRequest request) throws Exception {

		logger.info("updateproc get........");
		BoardVO vo = new BoardVO();

		vo.setSubject(request.getParameter("subject"));
		vo.setContent(request.getParameter("content"));
		vo.setBno(Integer.parseInt(request.getParameter("bno")));

		service.update(vo);
		return "redirect:/board/boardDetail/" + request.getParameter("bno");
	}

	@RequestMapping("/boardDelete/{bno}")
	private String getDelete(@PathVariable int bno, Model model) throws Exception {
		service.delete(bno);
		return "redirect:/board/boardList";
	}

}// end - public class BoardController
