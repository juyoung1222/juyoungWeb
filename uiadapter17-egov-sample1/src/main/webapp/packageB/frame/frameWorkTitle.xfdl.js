(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("frameWorkTitle");
            this.set_scrolltype("none");
            this.set_titletext("frameWorkTitle");
            if (Form == this.constructor)
            {
                this._setFormPosition(1040,32);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("staTitle","60","2","500","28",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_cssclass("sta_WF_Title");
            obj.set_text("메뉴타이틀");
            this.addChild(obj.name, obj);

            obj = new Button("btnMyMenu","25","2","28","28",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("☆");
            this.addChild(obj.name, obj);

            obj = new Button("btnSel",null,"3","64","25","369",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("조회");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btnAdd",null,"3","64","25","304",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("입력");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btnSav",null,"3","70","25","162",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("저장");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btnDel",null,"3","70","25","233",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("삭제");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btnExl",null,"3","70","25","91",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("엑셀");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btnPrt",null,"3","70","25","20",null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("출력");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btnMenuOpen","2","2","21","28",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_tooltiptext("left menu open/close");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",this._adjust_width,this._adjust_height,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("frameWorkTitle.xfdl","lib::cmmInclude.xjs");
        this.registerScript("frameWorkTitle.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath       	frame > frameWorkTitle
        *  @FileName 		frameWorkTitle.xfdl
        *  @Creator 			soojeong
        *  @CreateDate 	2017.03.09
        *  @Desction         스크립트 표준 및 주석 표준 정의
        ************** 소스 수정 이력 ***************************************************
        *  date          		Modifier                Description
        *******************************************************************************
        *  2017.03.09     	soojeong 	           최초 생성
        *  2017.10.23     	soojeong  	           주석 정비 및 메뉴검색, 즐겨찾기 기능 추가
        *******************************************************************************
        */

        /************************************************************************************************
        * include 선언부  													               *
         ************************************************************************************************/
        this.executeIncludeScript("lib::cmmInclude.xjs"); /*include "lib::cmmInclude.xjs"*/;

        /************************************************************************************************
         * FORM 변수 선언 영역
         ************************************************************************************************/
        this.objApp;
        this.fv_menuId;
        this.fv_objArray = new Array();
        	this.fv_objArray[0] = "btnSel";  //조회
        	this.fv_objArray[1] = "btnAdd";  //등록
        	this.fv_objArray[2] = "btnSav";  //저장
        	this.fv_objArray[3] = "btnDel";  //삭제
        	this.fv_objArray[4] = "btnExl"; //엑셀
        	this.fv_objArray[5] = "btnPrt";  //인쇄

        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        /**
         * @description 화면 온로드
        */
        this.form_onload = function(obj,e)
        {
        	this.objApp = nexacro.getApplication() ;

        	this.fv_menuId = this.getOwnerFrame().arguments["menuId"];
        	this.fnSetMyMenuBtn();
        };

        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/

        /************************************************************************************************
         * CALLBACK 콜백 처리부분
         ************************************************************************************************/

         /************************************************************************************************
         * 사용자 FUNCTION 영역
         ************************************************************************************************/
         /**
         * @description 마이메뉴버튼 텍스트바꾸기<br>
        	즐겨찾기되어있는 화면 -> ★ <br>
        	즐겨찾기가안되있는화면 -> ☆
        */
        this.fnSetMyMenuBtn = function ()
        {
        	var objDs = this.objApp.gdsMyMenu;
        	var nRow = objDs.findRow("menuId", this.fv_menuId);

        	if( nRow < 0 ){
        		this.btnMyMenu.set_text("☆");
        	}else{
        		this.btnMyMenu.set_text("★");
        	}
        };

        /**
         * @description  폼권한에 따른 공통버튼 visible처리(6자리)
        */
        this.fnSetAuthBtn = function(sAuth)
        {
        	var nRigth = 20; //right기준값
        	var nGap = 2;    //버튼사이 폭
        	for (var i = 0; i < 6; i++)
        	{
        		if(sAuth.substr(i,1) == "Y"){

        			var sObj = this[this.fv_objArray[i]];
        			sObj.set_visible(true);

        			//=================글자크기에 맞게 버튼 폭을 변경하려면 주석 해제==========
        			//var arr = nexacro.getTextSize(sObj.text, sObj);
        			//sObj.set_width(arr.nx + 30);
        			//===============================================================================
        		}else{
        			var sObj = this[this.fv_objArray[i]];
        			sObj.set_visible(false);
        		}
        	}

        	for(var i = 5; i > -1; i--) {
        		var sObj = this[this.fv_objArray[i]];
        		if (sObj.visible){
        			sObj.move(null, 3, sObj.getOffsetWidth(), sObj.getOffsetHeight(), nRigth);
        			nRigth = nRigth + nexacro.toNumber(nGap) + nexacro.toNumber(sObj.getOffsetWidth());
        		}
        	}
        };


        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        /**
         * @description  즐겨찾기버튼 클릭 이벤트
        */
        this.btnMyMenu_onclick = function(obj,e)
        {
        	var bIsMymenu=false;
        	var sBtnText = this.btnMyMenu.text;
        	if( sBtnText == "★") bIsMymenu = true;

        	var objDs = this.objApp.gdsMyMenu;
        	var objMenuDs = this.objApp.gdsMenu;

        	objDs.set_enableevent(false);
        	this.objApp.gvLeftFrame.form.divLeft.form.grdMyMenu.set_enableredraw(false);

        	if( bIsMymenu ) {
        		//즐겨찾기해제
        		var nRow = objDs.findRow("menuId",this.fv_menuId);
        		if( nRow > -1 ) objDs.deleteRow(nRow);
        	}else{
        		//즐겨찾기추가
        		var nRow = objMenuDs.findRow("menuId", this.fv_menuId);
        		var nNewRow =  objDs.addRow();
        		objDs.copyRow(nNewRow, objMenuDs, nRow);
        	}
        	//TODO. MyMenu Transaction

        	objDs.set_enableevent(true);
        	this.objApp.gvLeftFrame.form.divLeft.form.grdMyMenu.set_enableredraw(true);
        	nexacro.setPrivateProfile("gdsMyMenu", objDs.saveXML());
        	this.fnSetMyMenuBtn();
        };

        /**
         * @description  공통버튼클릭이벤트
        */
        this.fnBtnClick = function(obj,e)
        {
        	//this.parent.divWork.fn_comBtnClick(obj, e);
        	var sName = String(obj.name).substr(3,3);

            switch(sName) {
            case "Sel":
        	    this.parent.parent.divWork.form.fnSearch();
            	break;
            case "Add":
            	 this.parent.parent.divWork.form.fnAdd();
            	break;
            case "Sav":
            	 this.parent.parent.divWork.form.fnSave();
            	break;
            case "Del":
            	 this.parent.parent.divWork.form.fnDel();
            	break;
            case "Exl":
            	 this.parent.parent.divWork.form.fnExcel();
            	break;
            case "Prt":
            	 this.parent.parent.divWork.form.fnPrint();
            	break;
            default:
            }

        }

        /**
         * @description  레프트메뉴 열고닫기 이벤트
        */
        this.btnMenuOpen_onclick = function(obj,e)
        {
        	this.fnLeftMenuAction();
        };

        /**
         * @description Left 접고/펼치기 (frameWorkTitle에서 호출)
        */
        this.fnLeftMenuAction = function()
        {
        	var objApp = nexacro.getApplication();
        	if(objApp.gvHFrame.separatesize == "0,*")
        	{
        		objApp.gvHFrame.set_separatesize("240,*");
        	}
        	else
        	{
        		objApp.gvHFrame.set_separatesize("0,*");
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.btnMyMenu.addEventHandler("onclick",this.btnMyMenu_onclick,this);
            this.btnSel.addEventHandler("onclick",this.fnBtnClick,this);
            this.btnAdd.addEventHandler("onclick",this.fnBtnClick,this);
            this.btnSav.addEventHandler("onclick",this.fnBtnClick,this);
            this.btnDel.addEventHandler("onclick",this.fnBtnClick,this);
            this.btnExl.addEventHandler("onclick",this.fnBtnClick,this);
            this.btnPrt.addEventHandler("onclick",this.fnBtnClick,this);
            this.btnMenuOpen.addEventHandler("onclick",this.btnMenuOpen_onclick,this);
        };

        this.loadIncludeScript("frameWorkTitle.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
