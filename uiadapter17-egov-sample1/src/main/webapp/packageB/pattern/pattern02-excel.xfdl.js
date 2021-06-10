(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Sample003_excel");
            this.set_titletext("엑셀 import/export");
            this.getSetter("classname").set("Work");
            this.getSetter("inheritanceid").set("");
            if (Form == this.constructor)
            {
                this._setFormPosition(1050,818);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsList", this);
            obj._setContents("<ColumnInfo><Column id=\"communityId\" type=\"string\" size=\"32\"/><Column id=\"contents\" type=\"string\" size=\"32\"/><Column id=\"hitCount\" type=\"string\" size=\"32\"/><Column id=\"postId\" type=\"string\" size=\"32\"/><Column id=\"regDate\" type=\"datetime\" size=\"17\"/><Column id=\"regId\" type=\"string\" size=\"32\"/><Column id=\"searchCondition\" type=\"string\" size=\"32\"/><Column id=\"searchKeyword\" type=\"string\" size=\"32\"/><Column id=\"searchUseYn\" type=\"string\" size=\"32\"/><Column id=\"title\" type=\"string\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("divSearch","0","0",null,"52","0",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Button("btnSearch",null,"8","89","34","5",null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("2");
            obj.set_text("조회");
            this.divSearch.addChild(obj.name, obj);

            obj = new Grid("Grid00","0","57",null,"444","0",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("dsList");
            obj.set_autofittype("col");
            obj.getSetter("no").set("true");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"112\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"communityId\"/><Cell col=\"1\" text=\"contents\"/><Cell col=\"2\" text=\"hitCount\"/><Cell col=\"3\" text=\"postId\"/><Cell col=\"4\" text=\"regDate\"/><Cell col=\"5\" text=\"regId\"/><Cell col=\"6\" text=\"title\"/></Band><Band id=\"body\"><Cell text=\"bind:communityId\"/><Cell col=\"1\" text=\"bind:contents\"/><Cell col=\"2\" text=\"bind:hitCount\"/><Cell col=\"3\" text=\"bind:postId\"/><Cell col=\"4\" text=\"bind:regDate\"/><Cell col=\"5\" text=\"bind:regId\"/><Cell col=\"6\" text=\"bind:title\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("btnExcelEx","0","508","90","34",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("excel export");
            this.addChild(obj.name, obj);

            obj = new Button("btnExcelImport","96","508","90","34",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("excel import");
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
        this.registerScript("pattern02-excel.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath
        *  @FileName 		utilExcel.xfdl
        *  @Creator 			soojeong
        *  @CreateDate 	2017.01.24
        *  @LastModifier
        *  @LastModifyDate
        *  @Version 		1.0
        *  @Outline
        *  @Desction
        ************** 소스 수정 이력 *************************************************
        *    date          		Modifier            Description
        *******************************************************************************
        *  2017.01.23     	soojeong 	           최초 생성
        *******************************************************************************
        */

        /************************************************************************************************
         * FORM 변수 선언 영역
         ************************************************************************************************/

        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        this.Form_onload = function(obj,e)
        {
        };
        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/
        /**
        * fnSearch : 조회
        * @return : N/A
        * @example :
        */
        this.fnSearch = function ()
         {
         	var strSvcId    = "search";
        	var strSvcUrl   = "selectSampleListWithVo.do";
        	var inData      = "";
        	var outData     = "dsList=output1";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	//생략가능
        	var isAsync   = true;
        	var nDataType = 0;

        	this.gfnTransaction( strSvcId , strSvcUrl , inData , outData , strArg, callBackFnc, nDataType);
         };
        /************************************************************************************************
         * CALLBACK 콜백 처리부분
         ************************************************************************************************/
        this.fnCallback = function(svcID,errorCode,errorMsg)
        {
        	switch(svcID)
        	{
        		case "search":
         			//trace(this.dsList.saveXML());
        			break;
        	}
        };
        this.fnImportCallback = function(importId)
        {
        	trace(this.dsList.saveXML());
        };
         /************************************************************************************************
         * 사용자 FUNCTION 영역
         ************************************************************************************************/

        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
         /**
        * divSearch_btnSearch_onclick : 조회버튼이벤트
        * @param  : obj		   - [object]Button
        * @param  : e		   - [string]ClickEventInfo
        * @return : N/A
        * @example :
        */
        this.divSearch_btnSearch_onclick = function(obj,e)
        {
        	this.fnSearch();
        };
         /**
        * btnExcelEx_onclick : 엑셀 익스포트 버튼이벤트
        * @param  : obj		   - [object]Button
        * @param  : e		   - [string]ClickEventInfo
        * @return : N/A
        * @example :
        */
        this.btnExcelEx_onclick = function(obj,e)
        {
        	/**
        	* gfnExcelExport : excel export
        	* @param  : obj		   - [object]Grid Object
        	* @param  : sSheetName - [string]sheet name[생략가능] sheet명 30자까지가능, *?등 특수문자 불가
        	* @param  : sFileName  - [string]file name[생략가능]
        	* @return : N/A
        	* @example : this.gfnExcelExport(this.grid_export, "SheetName","");
        	*/
        	this.gfnExcelExport(this.Grid00, "*?*?*?*?*?*?*?","");
        };
         /**
        * btnExcelImport_onclick : 엑셀임포트 버튼이벤트
        * @param  : obj		   - [object]Button
        * @param  : e		   - [string]ClickEventInfo
        * @return : N/A
        * @example :
        */
        this.btnExcelImport_onclick = function(obj,e)
        {
        	/**
        	* gfnExcelImport : excel import
        	* @param  : sDataset	- [string] dataset
        	* @param  : sSheet 		- [string] sheet name	  [생략가능 default:Sheet1]
        	* @param  : sHead  		- [string] Head 영역지정 [필수:: from:to]
        	* @param  : sBody  		- [string] body 영역지정 [생략가능default A2]
        	* @param  : sCallback	- [string] callback 함수[callback호출시 필수]
        	* @param  : sImportId 	- [string] import id 	 [callback호출시 필수]
        	* @param  : objForm  	- [object] form object	 [callback호출시 필수]
        	* @return : N/A
        	* @example :this.gfnExcelImportAll("dsList","SheetName","A1:G1","A2","fnImportCallback","import",this);
        	*/
        	this.gfnExcelImportAll("dsList","sheet1","A1:G1","A2","fnImportCallback","import",this);
        };






        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
            this.divSearch.form.btnSearch.addEventHandler("onclick",this.divSearch_btnSearch_onclick,this);
            this.btnExcelEx.addEventHandler("onclick",this.btnExcelEx_onclick,this);
            this.btnExcelImport.addEventHandler("onclick",this.btnExcelImport_onclick,this);
        };

        this.loadIncludeScript("pattern02-excel.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
