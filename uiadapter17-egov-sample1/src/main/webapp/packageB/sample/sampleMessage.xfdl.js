(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("sample013_message");
            this.set_titletext("메세지");
            if (Form == this.constructor)
            {
                this._setFormPosition(1050,818);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMsg", this);
            obj._setContents("");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grdMessage","7","47","1011","763",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("dsMsg");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"/></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","5","5","655","38",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("그리드 로우 더블클릭시 해당 로우 값에 맞는 메세지 생성");
            this.addChild(obj.name, obj);

            obj = new Button("btn00","831","10","90","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Alert");
            this.addChild(obj.name, obj);

            obj = new Button("btn01","927","10","90","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("Confirm");
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
        this.registerScript("sampleMessage.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath        샘플 > 스크립트
        *  @FileName 		sample013_message.xfdl
        *  @Creator 			soojeong
        *  @CreateDate 	2017.03.09
        *  @Desction         스크립트 표준 및 주석 표준 정의
        ************** 소스 수정 이력 ***************************************************
        *  date          		Modifier                Description
        *******************************************************************************
        *  2017.03.09     	soojeong 	           최초 생성
        *  2017.10.17     	kyk       	           주석 정비
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

        	var oApp = nexacro.getApplication();
        	this.dsMsg.copyData(oApp.gdsMessage, true);
        	this.grdMessage.set_binddataset(this.dsMsg);
        	this.grdMessage.createFormat();
        };

        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/

        /************************************************************************************************
         * CALLBACK 콜백 처리부분
         ************************************************************************************************/

         /**
         * @description 메세지 콜백
        */
        this.fnMsgCallback = function (strId, strVal)
        {
        	//trace("strId >> " + strId + "   strVal >> " + strVal);
        	if(strId == "confirm.before.save"){
        		trace("strVal : " + strVal);
        	}
        };

         /************************************************************************************************
         * 사용자 FUNCTION 영역
         ************************************************************************************************/

        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/

        /**
         * @description Alert 메시지 호출
        */
        this.btn00_onclick = function(obj,e)
        {
        	// {0} 의 입력값의 길이는 {1} 이하이어야 합니다.
        	this.gfnAlert("msg.err.validator.maxlength", ["이름은", "3자"]);
        };

        /**
         * @description Confirm 메시지 호출
        */
        this.btn01_onclick = function(obj,e)
        {
        	var sMsgId = "confirm.before.save";								//메세지ID
        	var arrArg = "";																//메세지취환될값 배열[생략가능]
        	var sPopId = sMsgId;														//메세지팝업ID[생략가능]	*해당화면에서 메시지 중복사용시 구분되는값을 넣어줘야함
        	var sMsgCallback = "fnMsgCallback";								//메세지콜백[생략가능] 		* confirm성 메시지를 사용 시 반드시 필요

        	// 변경된 내역을 저장 하시겠습니까?
        	this.gfnAlert(sMsgId, arrArg, sPopId, sMsgCallback);
        };

        /**
         * @description Grid 더블 클릭시 메시지 호출 예제
        */
        this.grdMessage_oncelldblclick = function(obj,e)
        {
        	var nRow = e.row;

        	var sMsgId = this.dsMsg.getColumn(nRow, "msgId");			//메세지ID
        	var arrArg = ["값1", "값2", "값3"];										//메세지취환될값 배열[생략가능]
        	var sPopId = sMsgId;															//메세지팝업ID[생략가능]	*해당화면에서 메시지 중복사용시 구분되는값을 넣어줘야함
        	var sMsgCallback = "fnMsgCallback";								   //메세지콜백[생략가능] 		* confirm성 메시지를 사용 시 반드시 필요

        	this.gfnAlert( sMsgId, arrArg, sPopId, sMsgCallback);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
            this.grdMessage.addEventHandler("oncelldblclick",this.grdMessage_oncelldblclick,this);
            this.btn00.addEventHandler("onclick",this.btn00_onclick,this);
            this.btn01.addEventHandler("onclick",this.btn01_onclick,this);
        };

        this.loadIncludeScript("sampleMessage.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
