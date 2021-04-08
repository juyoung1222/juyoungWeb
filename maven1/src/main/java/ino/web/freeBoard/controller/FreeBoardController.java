package ino.web.freeBoard.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import ino.web.freeBoard.dto.Criteria;
import ino.web.freeBoard.dto.FreeBoardDto;
import ino.web.freeBoard.dto.FreeBoardFileDto;
import ino.web.freeBoard.dto.MediaUtils;
import ino.web.freeBoard.dto.PageMaker;
import ino.web.freeBoard.dto.Pagination;
import ino.web.freeBoard.dto.Paging;
import ino.web.freeBoard.dto.SearchCriteria;
import ino.web.freeBoard.dto.UploadFileUtils;
import ino.web.freeBoard.service.FreeBoardService;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
//import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.MediaType;

@Controller
public class FreeBoardController {
	
	@Autowired
	private FreeBoardService freeBoardService;
	
	private static final Logger logger = 
			LoggerFactory.getLogger(FreeBoardController.class);
	
	//@Resource(name = "ino.web.freeBoard.dto.UploadFileUtils")
	//private UploadFileUtils uploadPath;
	
	@RequestMapping("/main.ino")
	public ModelAndView main(HttpServletRequest request,@ModelAttribute("scri") SearchCriteria scri, Criteria cri,Model model) {
		int page = 1;
		String url = request.getRequestURI();
		String keyword = request.getParameter("keyword");
		String pageFromReq = request.getParameter("page");
		//String search = request.getParameter("search");
		String searchType = request.getParameter("searchType");
		
		if(pageFromReq == null){
			page = 1;
		}else{
			page = Integer.parseInt(pageFromReq)+1;
		}
		Pagination pagination = new Pagination(page, freeBoardService.totalCount(), url,   searchType);
		
		scri.setKeyword(keyword);
		//pagination.setSearch(search);
		pagination.setSearchType(searchType);
		String pageResult = pagination.getPagination();
		
		List<FreeBoardDto> list = freeBoardService.selectList(scri);
		model.addAttribute("list", list);
		model.addAttribute("scri", scri);
		model.addAttribute("pagination", pagination);
//		//model.addAttribute("search", freeBoardService.search(pagination));
//		
		//List<FreeBoardDto> list = freeBoardService.selectList(scri);
		//model.addAttribute("freeBoardDto", list);
		
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(scri);
		pageMaker.setTotalCount(freeBoardService.totalCount());
		pageMaker.setTotalCount(freeBoardService.totalCount1());
		model.addAttribute("pageMaker", pageMaker);
		model.addAttribute("freeBoardDto",freeBoardService.selectList(scri));
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("boardMain");
		mav.addObject("freeBoardDto", freeBoardService.selectList(scri));
		//mav.addObject("search", search);
		mav.addObject("page", page);
		//mav.addObject("search", search);
		mav.addObject("keyword", keyword);
		mav.addObject("searchType", searchType);
		mav.addObject("pageResult", pageResult);
		System.out.println(pagination);
		System.out.println(scri);
//		//System.out.println(search);
		System.out.println(cri);
//		
	
		
		return mav;

	}
	@RequestMapping("/main1.ino")
	public ModelAndView main1(HttpServletRequest request,@ModelAttribute("scri") SearchCriteria scri, Criteria cri, Model model) {
		
		int page = 1;
		String url = request.getRequestURI();
		String pageFromReq = request.getParameter("page");
		//String search = request.getParameter("search");
		String searchType = request.getParameter("searchType");
		
		if(pageFromReq == null){
			page = 1;
		}else{
			page = Integer.parseInt(pageFromReq);
		}
		Pagination pagination = new Pagination(page, freeBoardService.totalCount(), url, searchType);
		
		//pagination.setSearch(search);
		//System.out.println(search);
		pagination.setSearchType(searchType);
		String pageResult = pagination.getPagination();
		
		
		//List<FreeBoardDto> list = freeBoardService.selectList1(scri);
		//model.addAttribute("freeBoardDto", list);
		
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(scri);
		pageMaker.setTotalCount(freeBoardService.totalCount());
		model.addAttribute("pageMaker", pageMaker);

		ModelAndView mav = new ModelAndView();
		mav.setViewName("boardMain1");
		mav.addObject("freeBoardFileDto", freeBoardService.selectList1(scri));
		//mav.addObject("search", search);
		mav.addObject("page", page);
		//mav.addObject("search", search);
		mav.addObject("pageResult", pageResult);
		System.out.println(pagination);
		
		
		
		return mav;
		
}
//	@RequestMapping("/freeBoardDetail.ino")
//	public ModelAndView detailView(HttpServletRequest request,Model model) {
//		FreeBoardDto dto = freeBoardService.selectOne(Integer.parseInt(request.getParameter("num")));
//		return new ModelAndView("freeBoardDetail", "dto",dto);
//	}
//	@RequestMapping("/freeBoardDetail1.ino")
//	public ModelAndView detailView1(HttpServletRequest request,Model model) {
//		//int num = Integer.parseInt(request.getParameter("seq"));
//		FreeBoardFileDto freeBoardFileDto = freeBoardService.selectOne1(Integer.parseInt(request.getParameter("num")));
//		return new ModelAndView("freeBoardDetail1", "dto",freeBoardFileDto);
//	}
//	
	@RequestMapping("/freeBoardDetail.ino")
	public ModelAndView detailView(HttpServletRequest request, Model model) {
		//FreeBoardDto dto = freeBoardService.selectOne(Integer.parseInt(request.getParameter("num")));
		int seq = Integer.parseInt(request.getParameter("num"));
		logger.info("seq1 : " + seq);
		
		System.out.println(seq);
		
		//model.addAttribute("dto", dto);
		
		return new ModelAndView("freeBoardDetail","dto",freeBoardService.selectOne(seq));
	}
	@RequestMapping("/freeBoardDetail1.ino")
	public ModelAndView detailView1(HttpServletRequest request, Model model) {
		//FreeBoardFileDto freeBoardFileDto = freeBoardService.selectOne1(Integer.parseInt(request.getParameter("num")));
		int seq = Integer.parseInt(request.getParameter("num"));
		//model.addAttribute("freeBoardFileDto", freeBoardFileDto);
		
		System.out.println(seq);
		
		return new ModelAndView("freeBoardDetail1","dto", freeBoardService.selectOne1(seq));
	}
	
	@RequestMapping("/freeBoardInsert.ino")
	public String freeBoardInsert(){
		
		logger.info("freeBoardInsert.ino...");
		
		return "freeBoardInsert";
	}
	
	@RequestMapping("/freeBoardInsert1.ino")
	public String freeBoardInsert1() {
		return "freeBoardInsert1";
	}
	
	@RequestMapping(value="/freeBoardInsertPro.ino", method=RequestMethod.POST)
	public String freeBoardInsertPro(HttpServletRequest request,FreeBoardDto dto) {
		freeBoardService.insert(dto);
		
		//int maxNum = freeBoardService.maxNum();
		
		return "redirect:/main.ino";
	}
	
	@RequestMapping(value = "/freeBoardInsertPro1.ino", method=RequestMethod.POST)
	public String freeBoardInsertPro1(HttpServletRequest request, FreeBoardDto dto,@RequestParam("file") MultipartFile freeboardimagefile ) throws Exception {
		
		logger.info("freeBoardInsertPro.ino...");
		
//		freeBoardService.insert(dto);
//		
//		int maxNum = freeBoardService.maxNum();
		
		FreeBoardFileDto freeBoardFileDto = new FreeBoardFileDto();
		
		freeBoardFileDto.setName(request.getParameter("name"));
		freeBoardFileDto.setTitle(request.getParameter("title"));
		freeBoardFileDto.setContent(request.getParameter("content"));
		//freeBoardFileDto.setBoardfilename(request.getParameter("boardfilename"));
		
		if(freeboardimagefile.isEmpty()) {
			freeBoardService.fileInsert(freeBoardFileDto);
		}else {
			String BoardimageFile = freeboardimagefile.getOriginalFilename();
			String BoardimageOriName = freeboardimagefile.getOriginalFilename();
			String fileNameExtension = FilenameUtils.getExtension(BoardimageOriName).toLowerCase();
			File destinationFile;
			
			String destinationFileName;
			
			String boardimageUrl = "C:\\Users\\JY-CHOI\\Desktop\\eGovFrameDev-3.8.0-64bit\\workspace\\maven1\\src\\main\\resource\\upload\\";
			
			do {
				destinationFileName=RandomStringUtils.randomAlphanumeric(32) + "." + fileNameExtension;
				destinationFile = new File(boardimageUrl + destinationFileName);
			}while(destinationFile.exists());
			
				destinationFile.getParentFile().mkdir();
				freeboardimagefile.transferTo(destinationFile);
				
				freeBoardFileDto.setBoardimagegefile(BoardimageFile);
				//freeBoardFileDto.setBoardfilename(Boardfilename);
				freeBoardFileDto.setBoardimageName(destinationFileName);
				freeBoardFileDto.setBoardimageOriName(BoardimageOriName);
				freeBoardFileDto.setBoardimageUrl(boardimageUrl);
				
				System.out.println("FreeBoardController : " + freeBoardFileDto);
				
				freeBoardService.fileInsert(freeBoardFileDto);
			}
			return "redirect:/main1.ino";
		
		
		//FreeBoardDto postDto = freeBoardService.afterInsert(maxNum);
		
		}
//	@RequestMapping("/modify.ino")
//	public String freeBoardModify(HttpServletRequest request, FreeBoardDto dto) {
//		freeBoardService.modify(dto);
//		return "modify";
//	}
	
	
	@RequestMapping(value = "/modify.ino" ,method = { RequestMethod.GET, RequestMethod.POST })
	public String modify(HttpServletRequest request) {
		//int num = Integer.parseInt(request.getParameter("num"));
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String name = request.getParameter("name");
		//String regdate = request.getParameter("regdate");

		FreeBoardDto dto = new FreeBoardDto();
		//dto.setNum(num);
		dto.setTitle(title);
		dto.setContent(content);
		dto.setName(name);
		//dto.setRegdate(regdate);

		freeBoardService.modify(dto);
		return "redirect:/main.ino";
	}

	
	@RequestMapping(value="/modify1.ino",method={ RequestMethod.GET, RequestMethod.POST })
	public String postModify(HttpServletRequest request) {
		
		int seq = Integer.parseInt(request.getParameter("num"));
		String title = request.getParameter("title");
		String name = request.getParameter("name");
		String content = request.getParameter("content");
		String boardimageName = request.getParameter("boardimageName");
		
		FreeBoardFileDto freeBoardFileDto = new FreeBoardFileDto();
		
		freeBoardFileDto.setSeq(seq);
		freeBoardFileDto.setTitle(title);
		freeBoardFileDto.setName(name);
		freeBoardFileDto.setContent(content);
		freeBoardFileDto.setBoardimageName(boardimageName);
		
		
		freeBoardService.modify1(freeBoardFileDto);
		
		System.out.println(freeBoardFileDto);
		System.out.println(seq);
		
		return "redirect:/main1.ino";
	}
	
		
		@RequestMapping(value = "/delete.ino",method={ RequestMethod.GET, RequestMethod.POST })
		public String delete(FreeBoardDto dto, HttpServletRequest request) {
			int seq1 = Integer.parseInt(request.getParameter("num"));
			freeBoardService.delete(seq1);
			return "redirect:/main.ino";
		}
		@RequestMapping(value = "/delete1.ino",method={ RequestMethod.GET, RequestMethod.POST })
		public String delete1(FreeBoardFileDto freeBoardFileDto,HttpServletRequest request) {
			
			int seq = Integer.parseInt(request.getParameter("num"));
			
			freeBoardService.delete1(seq);
			
			return "redirect:/main1.ino";
		}
		
		@RequestMapping(value="/deletefile.ino",method={ RequestMethod.GET, RequestMethod.POST })
		
		public String getDeleteFile(FreeBoardFileDto freeBoardFileDto, HttpServletRequest request){
			
			//int seq = Integer.parseInt(request.getParameter("num"));
			
			String boardimageName = request.getParameter("boardimageName");
			
			String rootUploadDir = "C"+File.separator + "upload";
			
			File dir = new File(rootUploadDir + File.separator + "boardimageName");
			
			if(dir.exists()) {
				dir.delete();
			}
			
			freeBoardFileDto.setBoardimageName(boardimageName);
			
			freeBoardService.deletefile(boardimageName);
			
			return "freeBoardDetail1";
		}
		
//		@RequestMapping("getAttach.ino/{seq}")
//		@ResponseBody
//		public List<String> getAttach(@PathVariable int seq){
//			return freeBoardService.getAttach(seq);
//		}
//		
	
		
}
