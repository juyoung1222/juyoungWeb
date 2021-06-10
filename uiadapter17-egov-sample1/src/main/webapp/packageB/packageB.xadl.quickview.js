(function()
{
    return function()
    {
        this.on_loadAppVariables = function()
        {		
            var obj = null;
            
            // global dataset
            obj = new Dataset("gdsUserInfo", this);
            obj._setContents("<ColumnInfo><Column id=\"userId\" type=\"STRING\" size=\"256\"/><Column id=\"UserNm\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"userId\">admin</Col><Col id=\"UserNm\">admin</Col></Row></Rows>");
            this._addDataset(obj.name, obj);


            obj = new Dataset("gdsMenu", this);
            obj._setContents("<ColumnInfo><Column id=\"level\" type=\"STRING\" size=\"256\"/><Column id=\"groupId\" type=\"STRING\" size=\"256\"/><Column id=\"menuId\" type=\"STRING\" size=\"256\"/><Column id=\"menuNm\" type=\"STRING\" size=\"256\"/><Column id=\"menuUrl\" type=\"STRING\" size=\"256\"/><Column id=\"sortNo\" type=\"STRING\" size=\"256\"/><Column id=\"upMenuId\" type=\"STRING\" size=\"256\"/><Column id=\"useYn\" type=\"STRING\" size=\"256\"/><Column id=\"auth\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this._addDataset(obj.name, obj);


            obj = new Dataset("gdsOpenMenu", this);
            obj._setContents("<ColumnInfo><Column id=\"winId\" type=\"STRING\" size=\"32\"/><Column id=\"menuId\" type=\"STRING\" size=\"32\"/><Column id=\"title\" type=\"STRING\" size=\"32\"/><Column id=\"pageUrl\" type=\"STRING\" size=\"256\"/><Column id=\"tokenId\" type=\"STRING\" size=\"256\"/><Column id=\"groupId\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this._addDataset(obj.name, obj);


            obj = new Dataset("gdsOpenPopMenu", this);
            obj._setContents("<ColumnInfo><Column id=\"winId\" type=\"STRING\" size=\"32\"/><Column id=\"menuId\" type=\"STRING\" size=\"32\"/><Column id=\"title\" type=\"STRING\" size=\"32\"/><Column id=\"pageUrl\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this._addDataset(obj.name, obj);


            obj = new Dataset("gdsMessage", this);
            obj._setContents("<ColumnInfo><Column id=\"msgId\" type=\"STRING\" size=\"256\"/><Column id=\"msgText\" type=\"STRING\" size=\"256\"/><Column id=\"msgTextEN\" type=\"STRING\" size=\"256\"/><Column id=\"msgType\" type=\"STRING\" size=\"2\"/></ColumnInfo><Rows><Row><Col id=\"msgId\">msg.server.error</Col><Col id=\"msgText\">서버 오류입니다.\\n관리자에게 문의하세요.</Col><Col id=\"msgTextEN\">Server error. Please contact your administrator.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.server.error.msg</Col><Col id=\"msgText\">서버에서 다음과 같은 에러메시지를 받았습니다.\\n{0}</Col><Col id=\"msgTextEN\">The server received the following error message.s\\n{0}</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.session.timeout</Col><Col id=\"msgText\">세션이 종료되었습니다. 다시 로그인해주세요.</Col><Col id=\"msgTextEN\">Your session has expired, please login again.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.login.url.error</Col><Col id=\"msgText\">정상적인 경로로 접속하시기 바랍니다.</Col><Col id=\"msgTextEN\">invalid access! please, login first at www.tobesoft.com</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.login.error</Col><Col id=\"msgText\">해당하는 사용자 정보가 없습니다.</Col><Col id=\"msgTextEN\">No user found.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.call.nofile</Col><Col id=\"msgText\">해당하는 메뉴에 Program File이 등록되지 않았습니다.</Col><Col id=\"msgTextEN\">the requested menu does not exist!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.nomenu</Col><Col id=\"msgText\">해당 Menu가 존재하지 않습니다.</Col><Col id=\"msgTextEN\">The specified menu doesn't exist.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">confirm.logout</Col><Col id=\"msgText\">로그아웃 하시겠습니까?</Col><Col id=\"msgTextEN\">Are you sure you want to log out?</Col><Col id=\"msgType\">C</Col></Row><Row><Col id=\"msgId\">confirm.before.movepage</Col><Col id=\"msgText\">변경된 데이터가 있습니다. 현재 화면을 닫겠습니까?</Col><Col id=\"msgTextEN\">There are unsaved data. Would you like to leave now?</Col><Col id=\"msgType\">C</Col></Row><Row><Col id=\"msgId\">confirm.before.search</Col><Col id=\"msgText\">검색을 진행하면 변경된 데이터가 사라집니다. \\n계속 진행 하시겠습니까?</Col><Col id=\"msgTextEN\">Any unsaved data will be discarded. \\nWould you like to continue?</Col><Col id=\"msgType\">C</Col></Row><Row><Col id=\"msgId\">confirm.before.moveropos</Col><Col id=\"msgText\">해당 row의 위치를 이동하면 변경된 데이터가 사라집니다. \\n계속 진행 하시겠습니까?</Col><Col id=\"msgTextEN\">If you move the selected row, your changes will be discarded. \\nWould you like to continue?</Col><Col id=\"msgType\">C</Col></Row><Row><Col id=\"msgId\">confirm.before.delete</Col><Col id=\"msgText\">선택된 자료를 삭제 하시겠습니까?</Col><Col id=\"msgTextEN\">Are you sure you want to delete?</Col><Col id=\"msgType\">C</Col></Row><Row><Col id=\"msgId\">confirm.before.deletesave</Col><Col id=\"msgText\">선택된 자료를 삭제 후 저장하시겠습니까?</Col><Col id=\"msgTextEN\">Are you sure you want to delete and save?</Col><Col id=\"msgType\">C</Col></Row><Row><Col id=\"msgId\">msg.noselect</Col><Col id=\"msgText\">{0} 을(를) 선택해 주십시요.</Col><Col id=\"msgTextEN\">Please, select {0}</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.search.nodata</Col><Col id=\"msgText\">지정된 조건에 해당하는 항목을 찾을 수 없습니다.</Col><Col id=\"msgTextEN\">No data found.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.save.nodata</Col><Col id=\"msgText\">저장할 데이터가 없습니다.</Col><Col id=\"msgTextEN\">No data to save.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.save.nochange</Col><Col id=\"msgText\">변경된 내역이 없습니다.</Col><Col id=\"msgTextEN\">No changes found.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">confirm.before.save</Col><Col id=\"msgText\">변경된 내역을 저장 하시겠습니까?</Col><Col id=\"msgTextEN\">Would you like to save your changes?</Col><Col id=\"msgType\">C</Col></Row><Row><Col id=\"msgId\">msg.save.success</Col><Col id=\"msgText\">저장 되었습니다.</Col><Col id=\"msgTextEN\">Successfully saved!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.update.success</Col><Col id=\"msgText\">수정 되었습니다.</Col><Col id=\"msgTextEN\">Successfully updated!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.delete.success</Col><Col id=\"msgText\">삭제 되었습니다.</Col><Col id=\"msgTextEN\">Successfully deleted!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.action.success</Col><Col id=\"msgText\">처리 되었습니다.</Col><Col id=\"msgTextEN\">Successfully processed!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.action.fail</Col><Col id=\"msgText\">프로세스가 실패하였습니다.</Col><Col id=\"msgTextEN\">Failed process!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.updateafter</Col><Col id=\"msgText\">변경된 내역을 저장 후 작업하세요.</Col><Col id=\"msgTextEN\">Please, save your changes first!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.delete.child</Col><Col id=\"msgText\">하위 자료가 있어 삭제할 수 없습니다.</Col><Col id=\"msgTextEN\">the requested deletion could not be performed because dependent data found!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.grid.noselect</Col><Col id=\"msgText\">선택된 항목이 없습니다.</Col><Col id=\"msgTextEN\">No item has been selected!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.before.delete</Col><Col id=\"msgText\">정말로 삭제 하시겠습니까?</Col><Col id=\"msgTextEN\">Are you sure you want to delete?</Col><Col id=\"msgType\">C</Col></Row><Row><Col id=\"msgId\">msg.err.validator.required</Col><Col id=\"msgText\">{0} 은(는) 필수 입력 항목입니다.</Col><Col id=\"msgTextEN\">{0} Is a required field.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.maxlength</Col><Col id=\"msgText\">{0} 의 입력값은 {1} 이하이어야 합니다.</Col><Col id=\"msgTextEN\">The length of {0} must be less than or equal to {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.minlength</Col><Col id=\"msgText\">{0} 의 입력값은 {1} 이상이어야 합니다.</Col><Col id=\"msgTextEN\">The length of {0} must be greater than or equal to {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.maxlengthB</Col><Col id=\"msgText\">{0} 의 입력값의 길이는 {1} 이하이어야 합니다.</Col><Col id=\"msgTextEN\">The length of {0} must be less than or equal to {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.minlengthB</Col><Col id=\"msgText\">{0} 의 입력값의 길이는 {1} 이상이어야 합니다.</Col><Col id=\"msgTextEN\">The length of {0} must be greater than or equal to {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.digits</Col><Col id=\"msgText\">{0} 은(는) 숫자만 입력 가능합니다.</Col><Col id=\"msgTextEN\">{0} must be a numeric value.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.min</Col><Col id=\"msgText\">{0} 은(는) {1} 이상의 숫자만 입력 가능합니다.</Col><Col id=\"msgTextEN\">{0} must be a numeric value greater than or equal to {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.max</Col><Col id=\"msgText\">{0} 은(는) {1} 이하의 숫자만 입력 가능합니다.</Col><Col id=\"msgTextEN\">{0} must be a numeric value less than or equal to {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.date</Col><Col id=\"msgText\">{0} 은(는) 유효하지 않은 날짜 형식입니다.</Col><Col id=\"msgTextEN\">{0} is in invalid date format.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.dateym</Col><Col id=\"msgText\">{0} 은(는) 유효하지 않은 년월 형식입니다.</Col><Col id=\"msgTextEN\">{0} is in invalid year/month format.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.comparemax</Col><Col id=\"msgText\">{0} 이(가) {1} 보다 작습니다.</Col><Col id=\"msgTextEN\">{0} is less than {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.comparemin</Col><Col id=\"msgText\">{0} 이(가) {1} 보다 큽니다.</Col><Col id=\"msgTextEN\">{0} is greater than {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.equalto</Col><Col id=\"msgText\">{0} 이(가) {1} 와(과) 틀립니다.</Col><Col id=\"msgTextEN\">{0} is not equal to {1}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.range</Col><Col id=\"msgText\">{0} 은(는) {1} 와(과) {2} 사이의 값입니다.</Col><Col id=\"msgTextEN\">The value of {0} is between {1} and {2}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.declimit</Col><Col id=\"msgText\">{0} 은(는) 소숫점 {1} 자리로 구성되어야 합니다.</Col><Col id=\"msgTextEN\">The fractional part of {0} must consiste of {1} digits.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.code</Col><Col id=\"msgText\">{0} 은(는) {1} 의 값이어야 합니다.</Col><Col id=\"msgTextEN\">{0} must be the value of {1}</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.email</Col><Col id=\"msgText\">e-mail이 잘못된 형태로 입력 되었습니다.</Col><Col id=\"msgTextEN\">The entered email address is invalid.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.url</Col><Col id=\"msgText\">웹사이트 주소가 잘못 입력 되었습니다.</Col><Col id=\"msgTextEN\">The entered website address is invalid.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.phone</Col><Col id=\"msgText\">전화번호가 잘못된 형태로 입력 되었습니다.</Col><Col id=\"msgTextEN\">The entered phone number is invalid.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.zipcode</Col><Col id=\"msgText\">우편번호가 잘못된 형태로 입력 되었습니다.</Col><Col id=\"msgTextEN\">The entered ZIP code is invalid.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.multicombo.maxcnt</Col><Col id=\"msgText\">{0}개 이상 선택 할 수 없습니다.</Col><Col id=\"msgTextEN\">You can't select more than {0}</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.maxdate</Col><Col id=\"msgText\">날짜의 입력 가능 범위를 벗어났습니다.</Col><Col id=\"msgTextEN\">Invalid date.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.validator.date.great</Col><Col id=\"msgText\">종료일이 시작일보다 빠릅니다.</Col><Col id=\"msgTextEN\">Invalid date range.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.filesize</Col><Col id=\"msgText\">첨부 파일의 용량은 최고 5MB까지 입니다.</Col><Col id=\"msgTextEN\">Maximum allowed attachment size is 5 MB.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.nofilepath</Col><Col id=\"msgText\">경로가 지정되지 않은 첨부파일은 업/다운로드 할 수 없습니다.</Col><Col id=\"msgTextEN\">A valid file path must be provided.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.exist.code</Col><Col id=\"msgText\">입력하는 Code ({0})값이 이미 등록되어 있습니다.</Col><Col id=\"msgTextEN\">Code already exsits!</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.invalid.filename</Col><Col id=\"msgText\">파일 이름이 정의되지 않았습니다.</Col><Col id=\"msgTextEN\">Please, specify a filename.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.notice.itemcount</Col><Col id=\"msgText\">첨부 파일은 {0}개 이상 등록 할 수 없습니다.</Col><Col id=\"msgTextEN\">Attachments can not be registered in more than {0}.</Col><Col id=\"msgType\">A</Col></Row><Row><Col id=\"msgId\">msg.err.uploadfail</Col><Col id=\"msgText\">{0}로(으로) 파일업로드 실패 입니다.</Col><Col id=\"msgTextEN\">the file upload is failed because {0}.</Col><Col id=\"msgType\">A</Col></Row></Rows>");
            this._addDataset(obj.name, obj);


            obj = new Dataset("gdsMyMenu", this);
            obj._setContents("<ColumnInfo><Column id=\"level\" type=\"STRING\" size=\"32\"/><Column id=\"groupId\" type=\"STRING\" size=\"32\"/><Column id=\"menuId\" type=\"STRING\" size=\"32\"/><Column id=\"menuNm\" type=\"STRING\" size=\"32\"/><Column id=\"menuUrl\" type=\"STRING\" size=\"32\"/><Column id=\"sortNo\" type=\"INT\" size=\"4\"/><Column id=\"upMenuId\" type=\"STRING\" size=\"32\"/><Column id=\"useYn\" type=\"STRING\" size=\"32\"/></ColumnInfo>");
            this._addDataset(obj.name, obj);
            
            // global variable

            
            obj = null;
        };
        
        // property, event, createMainFrame
        this.on_initApplication = function()
        {
            // properties
            this.set_id("packageB");
            this.set_screenid("Screen_D");
            this.set_version("17.0.0.101");

            if (this._is_attach_childframe)
            	return;
            
            // frame
            var mainframe = this.createMainFrame("mainframe","0","0","1280","984",null,null,this);
            mainframe.set_showtitlebar("true");
            mainframe.set_showstatusbar("false");
            mainframe.set_titletext("nexacro17MDI");
            mainframe.set_showtitleicon("false");
            mainframe.set_showcascadetitletext("false");
            mainframe.on_createBodyFrame = this.mainframe_createBodyFrame;

            // tray

        };
        
        this.loadPreloadList = function()
        {

        };
        
        this.mainframe_createBodyFrame = function()
        {
            var obj = new ChildFrame("QuickViewFrame", null, null, null, null, null, null, "", this);
            
            obj.set_showtitlebar("false");
            obj.set_showstatusbar("false");
            obj.set_border("0px none");
			
            this.addChild(obj.name, obj);

            obj.set_formurl(nexacro._quickview_formurl);

            this.frame = obj;
            
            obj = null;
        };
        
        this.on_initEvent = function()
        {
        };

		// script Compiler
        this.registerScript("packageB.xadl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath
        *  @FileName
        *  @Creator 	soojeong
        *  @CreateDate 	2017.03.09
        *  @Desction         스크립트 표준 및 주석 표준 정의
        ************** 소스 수정 이력 ***********************************************
        *  date          		Modifier                Description
        *******************************************************************************
        *  2017.03.09     	soojeong 	           최초 생성
        *  2017.10.17     	kyk       	           주석 정비
        *******************************************************************************
        */

        /************************************************************************************************
         * application 변수 선언 영역
        ************************************************************************************************/
        this.gvVFrameSet	= "";
        this.gvLoginFrame	= "";
        this.gvHFrame      = "";
        this.gvLeftFrame   = "";
        this.gvVFrameSet1  = "";
        this.gvTopFrame    = "";
        this.gvWorkFrame   = "";
        this.gvMainFrame   = "";
        this.gvMdiFrame    = "";
        this.gvExtCommonPath  = "";
        this.gvIsComBtnUse = false;	//공통 버튼 사용유무

        this.gvMenuColumns = {
        	menuId : "menuId",    //  MENU ID
        	menuNm : "menuNm",
        	pageUrl : "menuUrl",
        	pageId : "pageId",    //PROGRAM_ID
        	winId : "winId",      //윈도우(프레임)아이디(열린 메뉴의 윈도우 아이디)
        	title : "title",
        	menuUrl : "menuUrl",
        	groupId : "groupId",
        	menuArgs : "menuArgs", //메뉴파라메터
        	menuLevel : "level"    //메뉴레벨
        };

        this.gvMax        = 8;     //열린 메뉴 최대 갯수
        this.gvWorkWinkey = "";
        this.gvWorkMenuNm = "";
        this.gvWorkMenuId = "";
        this.gvWorkTitle  = "";
        this.gvRealTrace = trace;

        /***********************************************************************************************
        * Application EVENT 영역(onload, onbeforeclose)
        /***********************************************************************************************/

        /**
         * @description Applicaton onload시 처리내역
        */
        this.Application_onload = function(obj,e)
        {
        	var objApp = nexacro.getApplication();

        	// Frame 변수 저장
        	this.gvVFrameSet	= objApp.mainframe.VFrameSet;                                			//VFrameSet
        	this.gvLoginFrame	= objApp.mainframe.VFrameSet.frameLogin; 				   				//LoginFrame
        	this.gvHFrame       = objApp.mainframe.VFrameSet.HFrameSet;                      			//HFrame
        	this.gvLeftFrame    = objApp.mainframe.VFrameSet.HFrameSet.frameLeft;            			//leftFrame
        	this.gvVFrameSet1   = objApp.mainframe.VFrameSet.HFrameSet.VFrameSet1;           			//VFrameSet1
        	this.gvTopFrame     = objApp.mainframe.VFrameSet.frameTop;  								//TopFrame
        	this.gvWorkFrame    = objApp.mainframe.VFrameSet.HFrameSet.VFrameSet1.framesetWork;         //WorkForm
        	this.gvMainFrame    = objApp.mainframe.VFrameSet.HFrameSet.VFrameSet1.frameMain;  			//mainform
        	this.gvMdiFrame     = objApp.mainframe.VFrameSet.HFrameSet.VFrameSet1.frameNavi;  			//mdi frame

        	// 접속경로 확인
        	trace("===== 접속경로 : " + nexacro.getProjectPath());
            var nRunMode = 0;

        	//로컬(파일)
        	if (system.navigatorname == "nexacro")
        	{
        	    nRunMode = "0";
        		objApp.mainframe.set_titletext("로컬(파일) - " + objApp.mainframe.titletext);
        	}
        	// 웹 접속
        	else {
        		var urlPath = window.location.protocol + "//" + window.location.host;
        		var objEnv = nexacro.getEnvironment();

        		// service URL 설정
        		var objSrv = objEnv.services["svcurl"];
        		//objSrv.set_url(urlPath+"/nexacro/");

        		//로컬(웹)
        	    if (objSrv.url.indexOf("localhost") > -1 || objSrv.url.indexOf("127.0.0.1") > -1 ) {
        			nRunMode = "1";
        			objApp.mainframe.set_titletext("로컬(웹)  - " + objApp.mainframe.titletext);
        		}
        		//운영
        		else {
        		    nRunMode = "2";

        			// trace 정지 설정
        			this.afnSetTraceMode(false);
        		}
        	}
        	nexacro.setEnvironmentVariable("gvRunMode", nRunMode);

        	// 로그인 화면 open
        	this.gvLoginFrame.set_formurl("frame::frameLogin.xfdl");
        	this.gvVFrameSet.set_separatesize("0,*,0,0");
        };

        /**
         * @description trace 재정의하여 trace로그 생성 방지
        */
        this.afnSetTraceMode = function(bTrace)
        {
        	trace("★★ 운영접속시에는 trace 로그를 남기지 않도록 설정되었습니다.");

            nexacro.setEnvironmentVariable("gvTraceMode", bTrace);
            if (bTrace)
            {
        		trace = this.gvRealTrace;
            }
            else {
                trace = function trace(){};
            }
        }

        /**
         * @description ESC 통신중단 방지(10월 16일 버전에서는 작동하지 않음)
        */
        this.Application_onerror = function(obj,e)
        {
        	trace("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Application_onerror!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        	trace("e.statuscode : " + e.statuscode);
        	trace("e.errormsg : " + e.errormsg);

        	// 사용자가 ESC키를 눌렀을 경우 ESC통신 중단 방지처리
        	if (e.errorcode == -2147418039) {
        		return true;
        	}
        };
        });
        
        this.loadPreloadList();

    };
}
)();
