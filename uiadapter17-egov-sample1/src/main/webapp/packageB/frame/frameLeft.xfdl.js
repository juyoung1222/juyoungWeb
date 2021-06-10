(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("LeftFrame");
            this.set_titletext("frameLeft");
            if (Form == this.constructor)
            {
                this._setFormPosition(240,958);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMenu", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"delAuth\" type=\"STRING\" size=\"32\"/><Column id=\"delBtnAuth\" type=\"STRING\" size=\"32\"/><Column id=\"depth\" type=\"STRING\" size=\"32\"/><Column id=\"exclAuth\" type=\"STRING\" size=\"32\"/><Column id=\"exclBtnAuth\" type=\"STRING\" size=\"32\"/><Column id=\"groupId\" type=\"STRING\" size=\"32\"/><Column id=\"inpAuth\" type=\"STRING\" size=\"32\"/><Column id=\"inpBtnAuth\" type=\"STRING\" size=\"32\"/><Column id=\"menuCd\" type=\"STRING\" size=\"32\"/><Column id=\"menuId\" type=\"STRING\" size=\"32\"/><Column id=\"menuNm\" type=\"STRING\" size=\"32\"/><Column id=\"menuUrl\" type=\"STRING\" size=\"32\"/><Column id=\"param1\" type=\"STRING\" size=\"32\"/><Column id=\"param2\" type=\"STRING\" size=\"32\"/><Column id=\"prgmId\" type=\"STRING\" size=\"32\"/><Column id=\"prnAuth\" type=\"STRING\" size=\"32\"/><Column id=\"prnBtnAuth\" type=\"STRING\" size=\"32\"/><Column id=\"regAuth\" type=\"STRING\" size=\"32\"/><Column id=\"regBtnAuth\" type=\"STRING\" size=\"32\"/><Column id=\"selAuth\" type=\"STRING\" size=\"32\"/><Column id=\"selBtnAuth\" type=\"STRING\" size=\"32\"/><Column id=\"sortSn\" type=\"INT\" size=\"4\"/><Column id=\"supiMenuId\" type=\"STRING\" size=\"32\"/><Column id=\"testCol\" type=\"STRING\" size=\"32\"/><Column id=\"urlLink\" type=\"STRING\" size=\"32\"/><Column id=\"useYn\" type=\"STRING\" size=\"32\"/><Column id=\"userId\" type=\"STRING\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsCalc", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj._setContents("<ColumnInfo><Column id=\"btName\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"btTop\" type=\"string\" size=\"32\" prop=\"\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsPdivMenu", this);
            obj._setContents("<ColumnInfo><Column id=\"level\" type=\"STRING\" size=\"256\"/><Column id=\"groupId\" type=\"STRING\" size=\"256\"/><Column id=\"menuId\" type=\"STRING\" size=\"256\"/><Column id=\"menuNm\" type=\"STRING\" size=\"256\"/><Column id=\"menuUrl\" type=\"STRING\" size=\"256\"/><Column id=\"sortNo\" type=\"STRING\" size=\"256\"/><Column id=\"upMenuId\" type=\"STRING\" size=\"256\"/><Column id=\"useYn\" type=\"STRING\" size=\"256\"/><Column id=\"auth\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("6");
            this.addChild(obj.name, obj);

            obj = new Div("divLeft","0","70",null,null,"1","0",null,null,null,null,this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Grid("grdTree","0","61",null,null,"-1","534",null,null,null,null,this.divLeft.form);
            obj.set_treeinitstatus("collapse,null");
            obj.set_autofittype("col");
            obj.set_treeusecheckbox("false");
            obj.set_cellsizingtype("col");
            obj.set_binddataset("dsMenu");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"247\"/></Columns><Rows><Row size=\"28\"/></Rows><Band id=\"body\"><Cell edittype=\"tree\" text=\"bind:menuNm\" treestartlevel=\"1\" treelevel=\"bind:level\" tooltiptext=\"bind:menuNm\" textAlign=\"left\" displaytype=\"treeitemcontrol\"/></Band></Format></Formats>");
            this.divLeft.addChild(obj.name, obj);

            obj = new Grid("grdMyMenu","0","196",null,null,"0","288",null,null,null,null,this.divLeft.form);
            obj.set_taborder("1");
            obj.set_binddataset("gdsMyMenu");
            obj.set_treeuseline("false");
            obj.set_treeusecheckbox("false");
            obj.set_visible("false");
            obj.set_autofittype("none");
            obj.set_cssclass("");
            obj.set_background("");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"231\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"메뉴명\"/></Band><Band id=\"body\"><Cell text=\"bind:menuNm\" textAlign=\"left\" padding=\"2px 2px 2px 10px\"/></Band></Format></Formats>");
            this.divLeft.addChild(obj.name, obj);

            obj = new Button("btnMenu","1","0","120","32",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_cssclass("btn_LF_Menu_S");
            obj.set_text("메뉴");
            this.addChild(obj.name, obj);

            obj = new Button("btnMyMenu","121","0","118","32",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_cssclass("btn_LF_MyMenu");
            obj.set_text("즐겨찾기");
            this.addChild(obj.name, obj);

            obj = new Static("staMenuSearch","3","39","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("메뉴검색");
            this.addChild(obj.name, obj);

            obj = new Edit("edtMenuSearch","57","39","140","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            this.addChild(obj.name, obj);

            obj = new Button("btnMenuSearch","205","39","30","20",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("검색");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("pdivMenuSearch","57","62","140","197",null,null,null,null,null,null,this);
            obj.set_text("pdiv00");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Grid("grdMenuSearch","0","0",null,null,"0","0",null,null,null,null,this.pdivMenuSearch.form);
            obj.set_taborder("0");
            obj.set_binddataset("dsPdivMenu");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"화면명\"/></Band><Band id=\"body\"><Cell text=\"bind:menuNm\"/></Band></Format></Formats>");
            this.pdivMenuSearch.addChild(obj.name, obj);

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
        this.addIncludeScript("frameLeft.xfdl","lib::cmmInclude.xjs");
        this.registerScript("frameLeft.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath       	frame > frameLeft
        *  @FileName 		frameLeft.xfdl
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
        var fvBtnName ="";
        this.objApp;

        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        /**
         * @description FORM온로드
        */
        this.form_onload = function(obj,e)
        {
        	this.objApp = nexacro.getApplication() ;

        	this.divLeft.form.set_scrollbartype("none")

        	this.divLeft.form.grdTree.set_top(0);
        	this.divLeft.form.grdTree.set_bottom(0);

        	var sGdsMyMenuXML = nexacro.getPrivateProfile("gdsMyMenu");
        	if( !this.gfnIsNull(sGdsMyMenuXML)) {
        		this.objApp.gdsMyMenu.loadXML(sGdsMyMenuXML);
        	}
        };

        /************************************************************************************************
         * CALLBACK 콜백 처리부분
         ************************************************************************************************/

          /************************************************************************************************
         * 사용자 FUNCTION 영역
         ************************************************************************************************/
         /**
         * @description FORM오픈 [공통함수호출]
        */
        this.fnFormOpen = function (objDs,nTargetRow,objArg)
        {
        	if( this.gfnIsNull(objDs) ) return;
        	if( this.gfnIsNull(nTargetRow) ) return;
        	if( this.gfnIsNull(objArg) ) objArg = [];

        	var oObj = {
        		ds    : objDs,  				 	// 메뉴 dataset
        		nRow  : nTargetRow,      	// 선택된
        		oArgs : objArg       			//넘길 argument
        	};
        	this.gfnCall(oObj);
        };

        /**
         * @description 글로벌 데이터셋 메뉴 카피
        */
        this.fnGlobalMenuCopy = function ()
        {
        	this.dsPdivMenu.copyData(this.objApp.gdsMenu);
        };

        /**
         * @description 트리상태 초기화
        */
        this.fnSetTreeStatus = function()
        {
        	//샘플메뉴 열어놓기
        	var nRow = this.objApp.gdsMenu.findRow(this.objApp.gvMenuColumns.menuId, "SA00000005");
        	if (nRow < 0) return;

        	var nCrow = this.divLeft.form.grdTree.getTreeChildRow(nRow, 0);

        	if (nCrow >= 0)
        	{
        		 var nGrow = this.divLeft.form.grdTree.getTreeRow(nRow);

        		 if (this.divLeft.form.grdTree.isTreeCollapsedRow(nCrow))
        		 {
        			 this.divLeft.form.grdTree.setTreeStatus(nGrow, true);
        		 }
        		 else
        		 {
        			 this.divLeft.form.grdTree.setTreeStatus(nGrow, false);
        		 }
        	}
        };

        /**
         * @description 메뉴검색팝업DIV 띄우기
        */
        this.fnSearchMenu = function (sNm)
        {
        	this.dsPdivMenu.set_enableevent(false);
        	this.pdivMenuSearch.form.grdMenuSearch.set_enableredraw(false);

        	this.dsPdivMenu.filter("");
        	if( this.gfnIsNull(sNm)) return;

        	sNm = sNm.trim();
        	this.dsPdivMenu.filter("menuNm.indexOf('"+sNm+"') > -1");

        	this.dsPdivMenu.set_enableevent(true);
        	this.pdivMenuSearch.form.grdMenuSearch.set_enableredraw(true);

        	this.pdivMenuSearch.trackPopupByComponent(this.edtMenuSearch, 0, this.edtMenuSearch.getOffsetHeight());

        	this.pdivMenuSearch.form.grdMenuSearch.setFocus();
        	this.pdivMenuSearch.form.grdMenuSearch.selectCell(0,0,true);
        };

        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        /**
         * @description 트리클릭이벤트
        */
        this.divLeft_grd_tree_oncellclick = function(obj,e)
        {
        	this.fnFormOpen( this.dsMenu, e.row);
        };

        /**
         * @description 마이메뉴클릭이벤트
        */
        this.divLeft_grdMyMenu_oncellclick = function(obj,e)
        {
        	this.fnFormOpen( this.objApp.gdsMyMenu, e.row);
        };

        /**
         * @description  메뉴/마이메뉴 버튼 중 메뉴버튼 클릭
        */
        this.btnMenu_onclick = function(obj,e)
        {
        	this.divLeft.form.grdTree.set_visible(true);
        	this.divLeft.form.grdMyMenu.set_visible(false);

        	this.divLeft.form.grdTree.bringToFront() ;
        	this.divLeft.form.grdMyMenu.sendToBack();
        };

        /**
         * @description  메뉴/마이메뉴 버튼 중 마이메뉴버튼 클릭
        */
        this.btnMyMenu_onclick = function(obj,e)
        {
        	this.divLeft.form.grdMyMenu.bringToFront() ;
        	this.divLeft.form.grdTree.sendToBack() ;

        	this.divLeft.form.grdTree.set_visible(false);
        	this.divLeft.form.grdMyMenu.set_visible(true);
        	this.divLeft.form.grdMyMenu.set_top(5);
        	this.divLeft.form.grdMyMenu.set_bottom(0);
        };

        /**
         * @description  메뉴검색버튼 이벤트
        */
        this.btnMenuSearch_onclick = function(obj,e)
        {
        	var sNm = this.edtMenuSearch.value;
        	this.fnSearchMenu(sNm);
        };

        /**
         * @description  메뉴검색 에디트 엔터버튼이벤트
        */
        this.edtMenuSearch_onkeydown = function(obj,e)
        {
        	if( e.keycode == 13){
        		var sNm = obj.value;
        		this.fnSearchMenu(sNm);
        	}
        };

        /**
         * @description  popupdiv그리드에서 셀클릭 이벤트
        */
        this.pdivMenuSearch_grdMenuSearch_oncellclick = function(obj,e)
        {
        	if( e.row > -1){
        		this.fnFormOpen(this.dsPdivMenu, e.row);
        		this.pdivMenuSearch.closePopup();
        	}
        };

        /**
         * @description  popupdiv그리드에서 엔터 이벤트
        */
        this.pdivMenuSearch_grdMenuSearch_onkeydown = function(obj,e)
        {
        	if( e.keycode == 13 ) {
        		if( obj.currentrow > -1 ) {
        			this.fnFormOpen(this.dsPdivMenu, obj.currentrow);
        			this.pdivMenuSearch.closePopup();
        		}
        	}
        };

        this.fnChangeMenu = function (topMenuId)
        {
        	var filterExpr = this.objApp.gvMenuColumns.groupId + "==" + nexacro.wrapQuote(topMenuId) + "&&" + this.objApp.gvMenuColumns.menuLevel + "!=0";
        	this.objApp.gdsMenu.set_enableevent(false);
        	this.dsMenu.set_enableevent(false);
        	//this.ds_Search_Menu.set_enableevent(false);
        trace(filterExpr);
        	this.objApp.gdsMenu.filter(filterExpr);

        	this.dsMenu.copyData(this.objApp.gdsMenu, true);
        	//this.ds_Search_Menu.copyData(this.objApp.gdsMenu, true);
        	//this.ds_Search_Menu.filter("   ");
        	this.objApp.gdsMenu.filter("");
        	this.objApp.gdsMenu.set_enableevent(true);
        	this.dsMenu.set_enableevent(true);
        	//this.ds_Search_Menu.set_enableevent(true);
        }

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onsize",this.Form_onsize,this);
            this.addEventHandler("onload",this.form_onload,this);
            this.divLeft.form.grdTree.addEventHandler("oncellclick",this.divLeft_grd_tree_oncellclick,this);
            this.divLeft.form.grdMyMenu.addEventHandler("oncellclick",this.divLeft_grdMyMenu_oncellclick,this);
            this.btnMenu.addEventHandler("onclick",this.btnMenu_onclick,this);
            this.btnMyMenu.addEventHandler("onclick",this.btnMyMenu_onclick,this);
            this.edtMenuSearch.addEventHandler("onkeydown",this.edtMenuSearch_onkeydown,this);
            this.btnMenuSearch.addEventHandler("onclick",this.btnMenuSearch_onclick,this);
            this.pdivMenuSearch.form.grdMenuSearch.addEventHandler("oncellclick",this.pdivMenuSearch_grdMenuSearch_oncellclick,this);
            this.pdivMenuSearch.form.grdMenuSearch.addEventHandler("onkeydown",this.pdivMenuSearch_grdMenuSearch_onkeydown,this);
        };

        this.loadIncludeScript("frameLeft.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
