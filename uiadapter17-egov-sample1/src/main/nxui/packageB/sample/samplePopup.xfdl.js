(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("sample012_popup");
            this.set_titletext("popup");
            if (Form == this.constructor)
            {
                this._setFormPosition(1050,818);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("btnPopup","17","22","119","50",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("모달팝업");
            this.addChild(obj.name, obj);

            obj = new Button("btnPopup00","17","86","119","50",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("모달리스 팝업");
            this.addChild(obj.name, obj);

            obj = new Button("btnPopup01","17","150","119","50",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("팝업에 form연결");
            this.addChild(obj.name, obj);

            obj = new Button("btnPopup02","155","22","155","50",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("모달Sync(Runtime)");
            this.addChild(obj.name, obj);

            obj = new Button("btnPopup03","155","86","155","50",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("모달Window(Runtime)");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1050,818,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("samplePopup.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath
        *  @FileName 		sample012_popup.xfdl
        *  @Creator 			soojeong
        *  @CreateDate 	2017.03.10
        *  @LastModifier
        *  @LastModifyDate
        *  @Version 		1.0
        *  @Outline
        *  @Desction
        ************** 소스 수정 이력 *************************************************
        *    date          		Modifier            Description
        *******************************************************************************
        *  2017.03.10     	soojeong 	           최초 생성
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
        	this.gfnFormOnLoad(this);
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
        * fnPopupCallback : popup callback
        * @param  : strId		   - [string]popup id
        * @param  : strVal		   - [string]return val
        * @return : N/A
        */
         this.fnPopupCallback = function(strId, strVal)
         {
        	trace(" strId : " + strId + " strVal : " + strVal);
         };
         /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        /**
        * btnPopup_onclick : modal popup open
        * @param  : obj		   - [object]Button
        * @param  : e		   - [string]ClickEventInfo
        * @return : N/A
        */
        this.btnPopup_onclick = function(obj,e)
        {
        	var oArg = {paramTitle:"가나다라", paramCode:"abcd", paramNum:12345};
        	var oOption = {};	//top, left를 지정하지 않으면 가운데정렬 //"top=20,left=370"
        	var sPopupCallBack = "fnPopupCallback";
        	this.gfnOpenPopup( "popup","cmm::cmmPopup.xfdl",oArg,sPopupCallBack,oOption);
        };
        /**
        * btnPopup00_onclick : modaless popup open
        * @param  : obj		   - [object]Button
        * @param  : e		   - [string]ClickEventInfo
        * @return : N/A
        */
        this.btnPopup00_onclick = function(obj,e)
        {
        	var oArg = {paramTitle:"가나다라", paramCode:"abcd", paramNum:12345};
        	var oOption = {popuptype:"modeless"};	//top, left를 지정하지 않으면 가운데정렬 //top:20,left:370
        	var sPopupCallBack = "fnPopupCallback";
        	this.gfnOpenPopup( "popup","cmm::cmmPopup.xfdl",oArg,sPopupCallBack,oOption);
        };
        /**
        * btnPopup01_onclick : modaless popup open - div에 form연결
        * @param  : obj		   - [object]Button
        * @param  : e		   - [string]ClickEventInfo
        * @return : N/A
        */
        this.btnPopup01_onclick = function(obj,e)
        {
        	var sFormName = "테스트";
        	var sFormUrl      = "sample::sample001_transaction.xfdl";

        	var oArg = {paramTitle:sFormName, paramCode:"abcd", paramNum:12345, paramUrl:sFormUrl};
        	var oOption = {};	//top, left를 지정하지 않으면 가운데정렬 //"top:20,left:370"
        	var sPopupCallBack = "fnPopupCallback";
        	this.gfnOpenPopup( "popup","cmm::cmmPopup.xfdl",oArg,sPopupCallBack,oOption);
        };

        this.btnPopup02_onclick = function(obj,e)
        {
        	var oArg = {paramTitle:"가나다라", paramCode:"abcd", paramNum:12345};
        	var oOption = {popuptype:"modalsync"};	//top, left를 지정하지 않으면 가운데정렬 //"top=20,left=370"
        	trace("modalsync 호출전");
        	this.gfnOpenPopup( "popup","cmm::cmmPopup.xfdl",oArg,"",oOption);
        	trace("modalsync 호출후");
        };

        this.btnPopup03_onclick = function(obj,e)
        {
        	var oArg = {paramTitle:"가나다라", paramCode:"abcd", paramNum:12345};
        	var oOption = {popuptype:"modalwindow"};	//top, left를 지정하지 않으면 가운데정렬 //"top=20,left=370"
        	trace("modalwindow 호출전");
        	var rtn = this.gfnOpenPopup( "popup","cmm::cmmPopup.xfdl",oArg,"",oOption);
        	trace("modalwindow 호출후 : " + rtn);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
            this.btnPopup.addEventHandler("onclick",this.btnPopup_onclick,this);
            this.btnPopup00.addEventHandler("onclick",this.btnPopup00_onclick,this);
            this.btnPopup01.addEventHandler("onclick",this.btnPopup01_onclick,this);
            this.btnPopup02.addEventHandler("onclick",this.btnPopup02_onclick,this);
            this.btnPopup03.addEventHandler("onclick",this.btnPopup03_onclick,this);
        };

        this.loadIncludeScript("samplePopup.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
