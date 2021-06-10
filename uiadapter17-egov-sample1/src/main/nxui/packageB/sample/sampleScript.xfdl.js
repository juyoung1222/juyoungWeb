(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("form");
            this.set_titletext("script sample");
            if (Form == this.constructor)
            {
                this._setFormPosition(1050,818);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("stc","5","5",null,"176","31",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("※ Script 표준 정의입니다.\r\r\n\r\r\r\r\nScript 탭 소스를 확인해 주세요.");
            obj.getSetter("setLanguage").set("false");
            obj.set_border("1px solid");
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
        this.registerScript("sampleScript.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath    샘플 > transaction
        *  @FileName 	Sample001_transaction.xfdl
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
         * FORM 변수 선언 영역
        ************************************************************************************************/
        this.fvTest = "aaa";	// form변수 sample


        /***********************************************************************************************
        * FORM EVENT 영역(onload, onbeforeclose)
        /***********************************************************************************************/
        /**
         * @description 화면 onload시 처리내역(필수)
        */
        this.form_onload = function(obj,e)
        {
        	this.gfnFormOnLoad(this);
        };

        /**
         * @description 화면 닫힐때 변경사항 체크(입력 화면에서 변경되는 Dataset 체크 필요, 선택)
         * @return {boolean} true(화면 닫음) / false(화면 닫지 않음)
        */
        this.fnClose = function()
        {
            return true;
        // 	if (this.gfnDsIsUpdated(this.dsList)) {
        // 		return false;
        // 	}
        // 	else {
        // 		return true;
        // 	}
        };


        /************************************************************************************************
         * CALLBACK 콜백 처리부분(Transaction, Popup)
         ************************************************************************************************/
        /**
         * @description Transaction CallBack 함수(선택)
        */
        this.fnCallback = function(svcID,errorCode,errorMsg)
        {
        	// 에러 시 화면 처리 내역
        	if(errorCode != 0)
        	{
        		return;
        	}

        	switch(svcID)
        	{
        		case "search":
        			// trace(this.dsList.saveXML());
        			break;

        		case "save":
        			// 저장 되었습니다.
        			this.gfnAlert("msg.save.success");
        			break;
        	}
        };

        /**
         * @description Popup CallBack 함수(선택)
        */
        this.fnPopupCallback = function(strId, strVal)
        {
        	trace(" strId : " + strId + " strVal : " + strVal);
        };


        /************************************************************************************************
        * CRUD 및 TRANSACTION 서비스 호출 처리
        ************************************************************************************************/
        /**
         * @description 조회
        */
        this.fnSearch = function ()
        {
        	// 조회조건 설정
         	this.dsInput.setColumn(0,"id",this.gfnNvl(this.divSearch.form.edtId.value,""));

         	var strSvcId    = "search";
        	var strSvcUrl   = "transactionSelectTest.do";
        	var inData      = "dsInput=dsInput";
        	var outData     = "dsList=dsList";
        	var strArg      = "name=" + this.gfnNvl(this.divSearch.form.edtName.value,"");
        	var callBackFnc = "fnCallback";
        	var isAsync   	= true;

        	this.gfnTransaction(strSvcId , 		// transaction을 구분하기 위한 svc id값
        						strSvcUrl , 	// trabsaction을 요청할 주소
        						inData , 		// 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭
        						outData , 		// 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭
        						strArg, 		// 입력값으로 보낼 arguments, strFormData="20120607"
        						callBackFnc, 	// transaction의 결과를 받을 Function 이름
        						isAsync); 		// 비동기통신 여부 [생략가능]
        };

        /**
         * @description 입력
        */
        this.fnAdd = function()
        {
        	this.dsList.addRow();
        };

        /**
         * @description 삭제
        */
        this.fnDel = function()
        {
        	this.dsList.deleteRow(this.dsList.rowposition);
        };

        /**
         * @description 저장
        */
        this.fnSave = function()
        {
        	// 변경사항 체크
        	if (this.gfnDsIsUpdated(this.dsList) == false) {
        		// 변경된 내역이 없습니다.
        		this.gfnAlert("msg.save.nochange");
        		return;
        	}

        	// Validation 체크



        	var strSvcUrl   = "transactionSaveTest.do";
        	var inData      = "dsList=dsList:U";
        	var outData     = "dsList=dsList";

        	this.gfnTransaction("save", strSvcUrl, inData, outData);
        };

        /**
         * @description 엑셀
        */
        this.fnExcel = function()
        {

        };

        /**
         * @description 출력
        */
        this.fnPrint = function()
        {

        };

        /************************************************************************************************
        * 사용자 FUNCTION 영역
        ************************************************************************************************/


        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
        ************************************************************************************************/

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
        };

        this.loadIncludeScript("sampleScript.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
