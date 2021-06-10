(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("sample015_calendar");
            this.set_titletext("월달력/기간달력");
            if (Form == this.constructor)
            {
                this._setFormPosition(1050,818);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsList", this);
            obj._setContents("<ColumnInfo><Column id=\"dtFrom\" type=\"STRING\" size=\"256\"/><Column id=\"dtTo\" type=\"STRING\" size=\"256\"/><Column id=\"dtMonth\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"dtFrom\">20171017</Col><Col id=\"dtTo\">20171231</Col><Col id=\"dtMonth\">201712</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("stc","5","5",null,"176","31",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("※달력(기간,월력) 사용방법(Default)\r\r\r\n\r\r\r\n1. div를 추가한다.\r\r\r\n\r\r\r\n2. div에 \"Properties\"에서 \"url에 \r\r\r\n기간 >> \"cmm::cmmCalFromTo.xfdl\" (220x26)\r\r\r\n월력 >> \"cmm::cmmCalMM.xfdl\"(98x26)\r\r\r\n를 입력한다.\r\n\r\n3. Dataset과 binding이 필요하면 해당 div의 Calendar에 bind를 한다.");
            obj.getSetter("setLanguage").set("false");
            obj.set_border("1px solid");
            this.addChild(obj.name, obj);

            obj = new Div("divCalFromTo","8","199","220","26",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Div00");
            obj.set_url("cmm::cmmCalFromTo.xfdl");
            this.addChild(obj.name, obj);

            obj = new Button("btnInit","283","199","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("초기화");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","383","199","241","25",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("초기화시 시작, 종료일자가 모두 없어짐");
            this.addChild(obj.name, obj);

            obj = new Button("btnGetFromDate","8","240","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_text("getFromDate");
            this.addChild(obj.name, obj);

            obj = new Edit("editFromDate","104","240","131","25",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new Button("btnGetToDate","8","270","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_text("getToDate");
            this.addChild(obj.name, obj);

            obj = new Edit("editToDate","104","270","131","25",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new Button("btnSetFromDate","8","300","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_text("setFromDate");
            this.addChild(obj.name, obj);

            obj = new Edit("edtSetFrom","104","300","131","25",null,null,null,null,null,null,this);
            obj.set_taborder("28");
            obj.set_maxlength("8");
            this.addChild(obj.name, obj);

            obj = new Button("btnSetToDate","8","330","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("setToDate");
            this.addChild(obj.name, obj);

            obj = new Edit("edtSetTo","104","330","131","25",null,null,null,null,null,null,this);
            obj.set_taborder("29");
            obj.set_maxlength("8");
            this.addChild(obj.name, obj);

            obj = new Button("btnEnableTrue","283","228","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("enable true");
            this.addChild(obj.name, obj);

            obj = new Button("btnEnableFalse","379","228","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("enable false");
            this.addChild(obj.name, obj);

            obj = new Button("btnReadonlyTrue","283","258","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("readonly true");
            this.addChild(obj.name, obj);

            obj = new Button("btnReadonlyFalse","379","258","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("readonly false");
            this.addChild(obj.name, obj);

            obj = new Button("btnRequiredFalse","379","288","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("required false");
            this.addChild(obj.name, obj);

            obj = new Button("btnRequiredTrue","283","288","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("required true");
            this.addChild(obj.name, obj);

            obj = new Div("divCalMM","10","387","98","26",null,null,null,null,null,null,this);
            obj.set_taborder("30");
            obj.set_text("Div00");
            obj.set_url("cmm::cmmCalMM.xfdl");
            this.addChild(obj.name, obj);

            obj = new Button("btnGetDate00","8","424","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("getFromDate");
            this.addChild(obj.name, obj);

            obj = new Edit("editFromDate00","104","424","131","25",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new Button("btnSetDate00","8","484","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_text("setFromDate");
            this.addChild(obj.name, obj);

            obj = new Edit("edtSetFrom00","104","484","131","25",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_maxlength("6");
            this.addChild(obj.name, obj);

            obj = new Button("btnEnableTrue00","248","424","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("enable true");
            this.addChild(obj.name, obj);

            obj = new Button("btnEnableFalse00","344","424","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("enable false");
            this.addChild(obj.name, obj);

            obj = new Button("btnReadonlyTrue00","248","454","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("readonly true");
            this.addChild(obj.name, obj);

            obj = new Button("btnReadonlyFalse00","344","454","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("readonly false");
            this.addChild(obj.name, obj);

            obj = new Button("btnRequiredFalse00","344","484","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("required false");
            this.addChild(obj.name, obj);

            obj = new Button("btnRequiredTrue00","248","484","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("required true");
            this.addChild(obj.name, obj);

            obj = new Button("btnInit00","248","389","88","25",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("초기화");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","348","389","241","25",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("초기화시 일자가 없어짐");
            this.addChild(obj.name, obj);

            obj = new Div("divCalFromTo00","800","754","220","26",null,null,null,null,null,null,this);
            obj.set_taborder("31");
            obj.set_text("Div00");
            obj.set_url("cmm::cmmCalFromTo.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("divCalMM01","924","782","98","26",null,null,null,null,null,null,this);
            obj.set_taborder("32");
            obj.set_text("Div00");
            obj.set_url("cmm::cmmCalMM.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("divCalFromTo01","810","14","220","26",null,null,null,null,null,null,this);
            obj.set_taborder("33");
            obj.set_text("Div00");
            obj.set_url("cmm::cmmCalFromTo.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("divCalMM00","934","42","98","26",null,null,null,null,null,null,this);
            obj.set_taborder("34");
            obj.set_text("Div00");
            obj.set_url("cmm::cmmCalMM.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("divCalFromTo02","8","752","220","26",null,null,null,null,null,null,this);
            obj.set_taborder("35");
            obj.set_text("Div00");
            obj.set_url("cmm::cmmCalFromTo.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("divCalMM02","7","780","98","26",null,null,null,null,null,null,this);
            obj.set_taborder("36");
            obj.set_text("Div00");
            obj.set_url("cmm::cmmCalMM.xfdl");
            this.addChild(obj.name, obj);

            obj = new Button("btnTest","640","199","118","32",null,null,null,null,null,null,this);
            obj.set_taborder("37");
            obj.set_text("Util Library Test");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1050,818,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","divCalFromTo.form.calFrom","value","dsList","dtFrom");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","divCalFromTo.form.calTo","value","dsList","dtTo");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","divCalFromTo00.form.calFrom","value","dsList","dtFrom");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","divCalFromTo00.form.calTo","value","dsList","dtTo");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","divCalMM.form.calYM","value","dsList","dtMonth");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","divCalMM01.form.calYM","value","dsList","dtMonth");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","divCalFromTo01.form.calFrom","value","dsList","dtFrom");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","divCalFromTo01.form.calTo","value","dsList","dtTo");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item8","divCalMM00.form.calYM","value","dsList","dtMonth");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item9","divCalFromTo02.form.calFrom","value","dsList","dtFrom");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item10","divCalFromTo02.form.calTo","value","dsList","dtTo");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item11","divCalMM02.form.calYM","value","dsList","dtMonth");
            this.addChild(obj.name, obj);
            obj.bind();
        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl","cmm::cmmCalFromTo.xfdl");
            this._addPreloadList("fdl","cmm::cmmCalMM.xfdl");
        };
        
        // User Script
        this.registerScript("sampleCalendar.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath
        *  @FileName 		sample015_calendar.xfdl
        *  @Creator 			soojeong
        *  @CreateDate 	2017.03.13
        *  @LastModifier
        *  @LastModifyDate
        *  @Version 		1.0
        *  @Outline
        *  @Desction
        ************** 소스 수정 이력 *************************************************
        *    date          		Modifier            Description
        *******************************************************************************
        *  2017.03.13     	soojeong 	           최초 생성
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

         /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
         /**
        * btnInit_onclick :  달력 버튼이벤트
        * @param  : obj		   - [object]Button
        * @param  : e		   - [string]ClickEventInfo
        * @return : N/A
        * @example :
        */
        this.btnInit_onclick = function(obj,e)
        {
        	var objForm = this.divCalFromTo.form;
        	var objFormMM = this.divCalMM.form;
        	var sTarget = obj.name;
        	var sDate ;

        	switch(sTarget) {
        	case "btnInit":
        		objForm.fnInit();
        		break;
        	case "btnGetFromDate":
        		sDate = objForm.fnGetFromDate();
        		this.editFromDate.set_value(sDate);
        		break;
        	case "btnGetToDate":
        		sDate = objForm.fnGetToDate();
        		this.editToDate.set_value(sDate);
        		break;
        	case "btnSetFromDate":
        		sDate = this.edtSetFrom.value;
        		objForm.fnSetFromDate(sDate);
        		break;
        	case "btnSetToDate":
        		sDate = this.edtSetTo.value;
        		objForm.fnSetToDate(sDate);
        		break;
        	case "btnEnableTrue":
        		objForm.fnSetEnable(true);
        		break;
        	case "btnEnableFalse":
        		objForm.fnSetEnable(false);
        		break;
        	case "btnReadonlyTrue":
        		objForm.fnSetReadonly(true);
        		break;
        	case "btnReadonlyFalse":
        		objForm.fnSetReadonly(false);
        		break;
        	case "btnRequiredTrue":
        		objForm.fnSetEssential(true);
        		break;
        	case "btnRequiredFalse":
        		objForm.fnSetEssential(false);
        		break;
        	case "btnInit00":
        		objFormMM.fnInit();
        		break;
        	case "btnGetDate00":
        		sDate = objFormMM.fnGetValue();
        		if( sDate != false ) this.editFromDate00.set_value(sDate);
        		else this.divCalMM.form.setFocus();
        		break;
        	case "btnSetDate00":
        		sDate = this.edtSetFrom00.value;
        		objFormMM.fnSetValue(sDate);
        		break;
        	case "btnEnableTrue00":
        		objFormMM.fnSetEnable(true);
        		break;
        	case "btnEnableFalse00":
        		objFormMM.fnSetEnable(false);
        		break;
        	case "btnReadonlyTrue00":
        		objFormMM.fnSetReadonly(true);
        		break;
        	case "btnReadonlyFalse00":
        		objFormMM.fnSetReadonly(false);
        		break;
        	case "btnRequiredTrue00":
        		objFormMM.fnSetEssential(true);
        		break;
        	case "btnRequiredFalse00":
        		objFormMM.fnSetEssential(false);
        		break;
        	default:
        	}
        };

        this.btnTest_onclick = function(obj,e)
        {
         	var sComma = this.gfnAppendComma(123456789.52, 1);
         	trace("gfnAppendComma : " + sComma);

        	trace("gfnRemoveComma : " + this.gfnRemoveComma(sComma));

        	trace("gfnTrim : " + this.gfnTrim(" 123 456 789 "));

        	trace("gfnAllTrim : " + this.gfnAllTrim(" 123 456 789 "));

        	trace("gfnGetDigit : " + this.gfnGetDigit("가나다 123 456 789 마바사"));

        	trace("gfnRemoveSpecialChar : " + this.gfnRemoveSpecialChar("$% 가나다 123 456 789 마바사&*"));

        	trace("gfnIsExistInArray : " + this.gfnIsExistInArray(["a", "b", "c"], "b"));

        	trace("gfnLeft : " + this.gfnLeft("abc", 1));

        	trace("gfnRight : " + this.gfnRight("abc", 1));

        	trace("gfnPosReverse : " + this.gfnPosReverse("aaBBbbccBB", "BB"));

        	trace("gfnTypeOf : " + this.gfnTypeOf(this.btn00));

        	trace("gfnIsNexaComponent : " + this.gfnIsNexaComponent("this.btn00"));

        	trace("gfnIsNexaComponent : " + this.gfnIsNexaComponent(this.btn00));

        	trace("gfnGetDate 일시 : " + this.gfnGetDate());

        	trace("gfnGetDate 일시+time: " + this.gfnGetDate("time"));

        	trace("gfnGetDate 일시+time+milliseconds: " + this.gfnGetDate("milli"));

        	trace("gfnGetLastDate : " + this.gfnGetLastDate("20171011"));

        	trace("gfnGetLastDate : " + this.gfnGetLastDate("201710"));

        	trace("gfnGetFirstDate : " + this.gfnGetFirstDate("20171022"));

        	trace("gfnGetDay : " + this.gfnGetDay("20171011"));

        	trace("gfnGetDiffDate : " + this.gfnGetDiffDate("20171011", "20171231"));

        	trace("gfnGetDiffMonth : " + this.gfnGetDiffMonth("20171011", "20171231"));

        	trace("gfnAddDate : " + this.gfnAddDate("20171011", 3));

        	trace("gfnAddMonth : " + this.gfnAddMonth("20171031", 1));

        	trace("gfnAddMonth : " + this.gfnAddMonth("20171031", -1));

        	trace("gfnGetWeek : " + this.gfnGetWeek("20171011"));

        	var sDate = this.gfnSolarToLunar("20171020");
        	trace("gfnSolarToLunar : " + sDate);

        	trace("gfnLunarToSolar : " + this.gfnLunarToSolar(sDate.substring(1,9), sDate.substring(0,1)));
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btnInit.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnGetFromDate.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnGetToDate.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnSetFromDate.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnSetToDate.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnEnableTrue.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnEnableFalse.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnReadonlyTrue.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnReadonlyFalse.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnRequiredFalse.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnRequiredTrue.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnGetDate00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnSetDate00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnEnableTrue00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnEnableFalse00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnReadonlyTrue00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnReadonlyFalse00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnRequiredFalse00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnRequiredTrue00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnInit00.addEventHandler("onclick",this.btnInit_onclick,this);
            this.btnTest.addEventHandler("onclick",this.btnTest_onclick,this);
        };

        this.loadIncludeScript("sampleCalendar.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
