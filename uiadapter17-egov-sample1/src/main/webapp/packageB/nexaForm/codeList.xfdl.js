(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("test");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("Dataset00", this);
            obj._setContents("<ColumnInfo><Column id=\"profit_cost\" type=\"STRING\" size=\"256\"/><Column id=\"big_group\" type=\"STRING\" size=\"256\"/><Column id=\"middle_group\" type=\"STRING\" size=\"256\"/><Column id=\"small_group\" type=\"STRING\" size=\"256\"/><Column id=\"detail_group\" type=\"STRING\" size=\"256\"/><Column id=\"comments\" type=\"STRING\" size=\"256\"/><Column id=\"transaction_money\" type=\"INT\" size=\"256\"/><Column id=\"transaction_date\" type=\"DATE\" size=\"256\"/><Column id=\"writer\" type=\"STRING\" size=\"256\"/><Column id=\"reg_date\" type=\"DATE\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"profit_cost\">수익</Col><Col id=\"big_group\">a</Col><Col id=\"middle_group\">b</Col><Col id=\"small_group\">c</Col><Col id=\"detail_group\">d</Col><Col id=\"comments\">e</Col><Col id=\"transaction_money\">1</Col><Col id=\"transaction_date\">21-01-11</Col><Col id=\"writer\">f</Col><Col id=\"reg_date\">21-01-11</Col></Row><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds00", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">00</Col><Col id=\"datacolumn\">수익</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">비용</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds01", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매출수익</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">매출금</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">외상매출금</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">선수금</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">영업외 수익</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">자본금</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">이자수익</Col></Row><Row><Col id=\"codecolumn\">08</Col><Col id=\"datacolumn\">차입금</Col></Row><Row><Col id=\"codecolumn\">09</Col><Col id=\"datacolumn\">대여금상환금</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">미수금</Col></Row><Row><Col id=\"codecolumn\">11</Col><Col id=\"datacolumn\">예수금</Col></Row><Row><Col id=\"codecolumn\">12</Col><Col id=\"datacolumn\">가수금</Col></Row><Row><Col id=\"codecolumn\">13</Col><Col id=\"datacolumn\">가지급금반환금</Col></Row><Row><Col id=\"codecolumn\">14</Col><Col id=\"datacolumn\">외화환산이익</Col></Row><Row><Col id=\"codecolumn\">15</Col><Col id=\"datacolumn\">유형자산처분이익</Col></Row><Row><Col id=\"codecolumn\">16</Col><Col id=\"datacolumn\">법인세환급금</Col></Row><Row><Col id=\"codecolumn\">17</Col><Col id=\"datacolumn\">부가가치세환급금</Col></Row><Row><Col id=\"codecolumn\">18</Col><Col id=\"datacolumn\">정부보조및지원금</Col></Row><Row><Col id=\"codecolumn\">19</Col><Col id=\"datacolumn\">특별이익</Col></Row><Row><Col id=\"codecolumn\">20</Col><Col id=\"datacolumn\">자산수증이익</Col></Row><Row><Col id=\"codecolumn\">21</Col><Col id=\"datacolumn\">채무면제이익</Col></Row><Row><Col id=\"codecolumn\">22</Col><Col id=\"datacolumn\">보험차익</Col></Row><Row><Col id=\"codecolumn\">23</Col><Col id=\"datacolumn\">매출원가</Col></Row><Row><Col id=\"codecolumn\">24</Col><Col id=\"datacolumn\">사업인건비</Col></Row><Row><Col id=\"codecolumn\">25</Col><Col id=\"datacolumn\">계약직</Col></Row><Row><Col id=\"codecolumn\">26</Col><Col id=\"datacolumn\">특급기술자</Col></Row><Row><Col id=\"codecolumn\">27</Col><Col id=\"datacolumn\">고급기술자</Col></Row><Row><Col id=\"codecolumn\">28</Col><Col id=\"datacolumn\">중급기술자</Col></Row><Row><Col id=\"codecolumn\">29</Col><Col id=\"datacolumn\">초급기술자</Col></Row><Row><Col id=\"codecolumn\">30</Col><Col id=\"datacolumn\">특별인부</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds02", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매출수익</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">매출금</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">외상매출금</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">선수금</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">영업외 수익</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">자본금</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">이자수익</Col></Row><Row><Col id=\"codecolumn\">08</Col><Col id=\"datacolumn\">차입금</Col></Row><Row><Col id=\"codecolumn\">09</Col><Col id=\"datacolumn\">대여금상환금</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">미수금</Col></Row><Row><Col id=\"codecolumn\">11</Col><Col id=\"datacolumn\">예수금</Col></Row><Row><Col id=\"codecolumn\">12</Col><Col id=\"datacolumn\">가수금</Col></Row><Row><Col id=\"codecolumn\">13</Col><Col id=\"datacolumn\">가지급금반환금</Col></Row><Row><Col id=\"codecolumn\">14</Col><Col id=\"datacolumn\">외화환산이익</Col></Row><Row><Col id=\"codecolumn\">15</Col><Col id=\"datacolumn\">유형자산처분이익</Col></Row><Row><Col id=\"codecolumn\">16</Col><Col id=\"datacolumn\">법인세환급금</Col></Row><Row><Col id=\"codecolumn\">17</Col><Col id=\"datacolumn\">부가가치세환급금</Col></Row><Row><Col id=\"codecolumn\">18</Col><Col id=\"datacolumn\">정부보조및지원금</Col></Row><Row><Col id=\"codecolumn\">19</Col><Col id=\"datacolumn\">특별이익</Col></Row><Row><Col id=\"codecolumn\">20</Col><Col id=\"datacolumn\">자산수증이익</Col></Row><Row><Col id=\"codecolumn\">21</Col><Col id=\"datacolumn\">채무면제이익</Col></Row><Row><Col id=\"codecolumn\">22</Col><Col id=\"datacolumn\">보험차익</Col></Row><Row><Col id=\"codecolumn\">23</Col><Col id=\"datacolumn\">매출원가</Col></Row><Row><Col id=\"codecolumn\">24</Col><Col id=\"datacolumn\">사업인건비</Col></Row><Row><Col id=\"codecolumn\">25</Col><Col id=\"datacolumn\">계약직</Col></Row><Row><Col id=\"codecolumn\">26</Col><Col id=\"datacolumn\">특급기술자</Col></Row><Row><Col id=\"codecolumn\">27</Col><Col id=\"datacolumn\">고급기술자</Col></Row><Row><Col id=\"codecolumn\">28</Col><Col id=\"datacolumn\">중급기술자</Col></Row><Row><Col id=\"codecolumn\">29</Col><Col id=\"datacolumn\">초급기술자</Col></Row><Row><Col id=\"codecolumn\">30</Col><Col id=\"datacolumn\">특별인부</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds03", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매출수익</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">매출금</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">외상매출금</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">선수금</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">영업외 수익</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">자본금</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">이자수익</Col></Row><Row><Col id=\"codecolumn\">08</Col><Col id=\"datacolumn\">차입금</Col></Row><Row><Col id=\"codecolumn\">09</Col><Col id=\"datacolumn\">대여금상환금</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">미수금</Col></Row><Row><Col id=\"codecolumn\">11</Col><Col id=\"datacolumn\">예수금</Col></Row><Row><Col id=\"codecolumn\">12</Col><Col id=\"datacolumn\">가수금</Col></Row><Row><Col id=\"codecolumn\">13</Col><Col id=\"datacolumn\">가지급금반환금</Col></Row><Row><Col id=\"codecolumn\">14</Col><Col id=\"datacolumn\">외화환산이익</Col></Row><Row><Col id=\"codecolumn\">15</Col><Col id=\"datacolumn\">유형자산처분이익</Col></Row><Row><Col id=\"codecolumn\">16</Col><Col id=\"datacolumn\">법인세환급금</Col></Row><Row><Col id=\"codecolumn\">17</Col><Col id=\"datacolumn\">부가가치세환급금</Col></Row><Row><Col id=\"codecolumn\">18</Col><Col id=\"datacolumn\">정부보조및지원금</Col></Row><Row><Col id=\"codecolumn\">19</Col><Col id=\"datacolumn\">특별이익</Col></Row><Row><Col id=\"codecolumn\">20</Col><Col id=\"datacolumn\">자산수증이익</Col></Row><Row><Col id=\"codecolumn\">21</Col><Col id=\"datacolumn\">채무면제이익</Col></Row><Row><Col id=\"codecolumn\">22</Col><Col id=\"datacolumn\">보험차익</Col></Row><Row><Col id=\"codecolumn\">23</Col><Col id=\"datacolumn\">매출원가</Col></Row><Row><Col id=\"codecolumn\">24</Col><Col id=\"datacolumn\">사업인건비</Col></Row><Row><Col id=\"codecolumn\">25</Col><Col id=\"datacolumn\">계약직</Col></Row><Row><Col id=\"codecolumn\">26</Col><Col id=\"datacolumn\">특급기술자</Col></Row><Row><Col id=\"codecolumn\">27</Col><Col id=\"datacolumn\">고급기술자</Col></Row><Row><Col id=\"codecolumn\">28</Col><Col id=\"datacolumn\">중급기술자</Col></Row><Row><Col id=\"codecolumn\">29</Col><Col id=\"datacolumn\">초급기술자</Col></Row><Row><Col id=\"codecolumn\">30</Col><Col id=\"datacolumn\">특별인부</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds04", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매출수익</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">매출금</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">외상매출금</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">선수금</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">영업외 수익</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">자본금</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">이자수익</Col></Row><Row><Col id=\"codecolumn\">08</Col><Col id=\"datacolumn\">차입금</Col></Row><Row><Col id=\"codecolumn\">09</Col><Col id=\"datacolumn\">대여금상환금</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">미수금</Col></Row><Row><Col id=\"codecolumn\">11</Col><Col id=\"datacolumn\">예수금</Col></Row><Row><Col id=\"codecolumn\">12</Col><Col id=\"datacolumn\">가수금</Col></Row><Row><Col id=\"codecolumn\">13</Col><Col id=\"datacolumn\">가지급금반환금</Col></Row><Row><Col id=\"codecolumn\">14</Col><Col id=\"datacolumn\">외화환산이익</Col></Row><Row><Col id=\"codecolumn\">15</Col><Col id=\"datacolumn\">유형자산처분이익</Col></Row><Row><Col id=\"codecolumn\">16</Col><Col id=\"datacolumn\">법인세환급금</Col></Row><Row><Col id=\"codecolumn\">17</Col><Col id=\"datacolumn\">부가가치세환급금</Col></Row><Row><Col id=\"codecolumn\">18</Col><Col id=\"datacolumn\">정부보조및지원금</Col></Row><Row><Col id=\"codecolumn\">19</Col><Col id=\"datacolumn\">특별이익</Col></Row><Row><Col id=\"codecolumn\">20</Col><Col id=\"datacolumn\">자산수증이익</Col></Row><Row><Col id=\"codecolumn\">21</Col><Col id=\"datacolumn\">채무면제이익</Col></Row><Row><Col id=\"codecolumn\">22</Col><Col id=\"datacolumn\">보험차익</Col></Row><Row><Col id=\"codecolumn\">23</Col><Col id=\"datacolumn\">매출원가</Col></Row><Row><Col id=\"codecolumn\">24</Col><Col id=\"datacolumn\">사업인건비</Col></Row><Row><Col id=\"codecolumn\">25</Col><Col id=\"datacolumn\">계약직</Col></Row><Row><Col id=\"codecolumn\">26</Col><Col id=\"datacolumn\">특급기술자</Col></Row><Row><Col id=\"codecolumn\">27</Col><Col id=\"datacolumn\">고급기술자</Col></Row><Row><Col id=\"codecolumn\">28</Col><Col id=\"datacolumn\">중급기술자</Col></Row><Row><Col id=\"codecolumn\">29</Col><Col id=\"datacolumn\">초급기술자</Col></Row><Row><Col id=\"codecolumn\">30</Col><Col id=\"datacolumn\">특별인부</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds05", this);
            obj._setContents("");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grd01","10","30",null,"230","10",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_autofittype("col");
            obj.set_binddataset("Dataset00");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"214\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell text=\"수익/비용\"/><Cell col=\"1\" text=\"관\"/><Cell col=\"2\" text=\"항\"/><Cell col=\"3\" text=\"목\"/><Cell col=\"4\" text=\"과\"/><Cell col=\"5\" text=\"내용\"/><Cell col=\"6\" text=\"금액\"/><Cell col=\"7\" text=\"거래일자\"/><Cell col=\"8\" text=\"작성자\"/><Cell col=\"9\" text=\"등록일\"/></Band><Band id=\"body\"><Cell text=\"bind:profit_cost\"/><Cell col=\"1\" text=\"bind:big_group\"/><Cell col=\"2\" text=\"bind:middle_group\"/><Cell col=\"3\" text=\"bind:small_group\"/><Cell col=\"4\" text=\"bind:detail_group\"/><Cell col=\"5\" text=\"bind:comments\"/><Cell col=\"6\" text=\"bind:transaction_money\"/><Cell col=\"7\" text=\"bind:transaction_date\"/><Cell col=\"8\" text=\"bind:writer\"/><Cell col=\"9\" text=\"bind:reg_date\" suppress=\"0\"/><Cell row=\"1\" suppress=\"2\"/><Cell row=\"1\" col=\"1\" suppress=\"2\"/><Cell row=\"1\" col=\"2\" suppress=\"2\"/><Cell row=\"1\" col=\"3\" suppress=\"2\"/><Cell row=\"1\" col=\"4\" suppress=\"2\"/><Cell row=\"1\" col=\"5\"/><Cell row=\"1\" col=\"6\"/><Cell row=\"1\" col=\"7\"/><Cell row=\"1\" col=\"8\"/><Cell row=\"1\" col=\"9\" suppress=\"3\"/><Cell row=\"2\"/><Cell row=\"2\" col=\"1\"/><Cell row=\"2\" col=\"2\"/><Cell row=\"2\" col=\"3\"/><Cell row=\"2\" col=\"4\"/><Cell row=\"2\" col=\"5\"/><Cell row=\"2\" col=\"6\"/><Cell row=\"2\" col=\"7\"/><Cell row=\"2\" col=\"8\"/><Cell row=\"2\" col=\"9\"/></Band><Band id=\"summary\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\" expr=\"dataset.getSum(&quot;transaction_money&quot;)\"/><Cell col=\"7\"/><Cell col=\"8\"/><Cell col=\"9\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("addBtn","1090","10","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("추가");
            this.addChild(obj.name, obj);

            obj = new Button("btn01","1150","10","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("삭제");
            this.addChild(obj.name, obj);

            obj = new Button("btn02",null,"10","60","20","10",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("저장");
            this.addChild(obj.name, obj);

            obj = new Div("div00","10","269","1263","22",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("div00");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo00","0","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("0");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_innerdataset("ds00");
            obj.set_text("cbo00");
            obj.set_value("");
            obj.set_index("-1");
            this.div00.addChild(obj.name, obj);

            obj = new Combo("cbo01","109","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("1");
            obj.set_innerdataset("ds01");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_text("cbo00");
            this.div00.addChild(obj.name, obj);

            obj = new Combo("cbo02","218","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("2");
            obj.set_innerdataset("ds02");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_text("cbo00");
            this.div00.addChild(obj.name, obj);

            obj = new Combo("cbo03","327","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("3");
            obj.set_innerdataset("ds03");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_text("cbo00");
            this.div00.addChild(obj.name, obj);

            obj = new Combo("cbo04","436","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("4");
            obj.set_innerdataset("ds04");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_text("cbo00");
            this.div00.addChild(obj.name, obj);

            obj = new Edit("edt00","545","0","280","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("5");
            this.div00.addChild(obj.name, obj);

            obj = new MaskEdit("msk00","825","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("6");
            obj.set_format("");
            this.div00.addChild(obj.name, obj);

            obj = new Calendar("cal00","934","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("7");
            this.div00.addChild(obj.name, obj);

            obj = new Edit("edt01","1043","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("8");
            obj.set_readonly("true");
            this.div00.addChild(obj.name, obj);

            obj = new Calendar("cal01","1152","0","109","20",null,null,null,null,null,null,this.div00.form);
            obj.set_taborder("9");
            obj.set_readonly("true");
            this.div00.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","btn02","text","ds05","dsAccount");
            this.addChild(obj.name, obj);
            obj.bind();
        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("codeList.xfdl", function() {

        /************************************************************************************************
         * CALLBACK 콜백 처리부분(Transaction, Popup)
         ************************************************************************************************/
        nexacro.getCookieVariable("JSESSIONID");
        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/

        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
        ************************************************************************************************/

        /************************************************************************************************
        * 사용자 FUNCTION 영역
        ************************************************************************************************/
        this.div00_cbo00_onitemchanged = function(obj,e)
        {
        	var strSelectType = e.postindex;
        	this.grd01.set_selecttype(strSelectType);
        	//상위콤보 데이터를 기준으로 하위콤보 필터링
        	this.ds00.filter("Code.substr(0,1) =='" + e.postvalue + "'");
        	//첫번째 index에 해당하는 combo데이터 선택
        	this.div00.form.cbo00.set_index(-1);

        	//this.ds00.filter("codecolumn == '00'");

        	//this.ds00.filter("codecolumn == '01'");

        // 	if(this.ds00.filter("codecolumn == '00'")){
        // 		this.ds01.filter("codecolumn < 23");
        // 	}else if(this.ds00.filter("codecolumn == '01'")){
        // 		this.ds01.filter("codecolumn > 24");
        // 	}else{
        // 		this.div00.form.cbo00.set_index(0);
        // 	}



        };

        this.div00_cbo01_onitemchanged = function(obj,e)
        {
        	//var strSelectType = e.postindex;
        	//this.grd01.set_selecttype(strSelectType);
        	//상위콤보 데이터를 기준으로 하위콤보 필터링
        	this.ds00.filter("Code.substr(0,1) =='" + e.postvalue + "'");
        	//첫번째 index에 해당하는 combo데이터 선택
        	//this.div00.form.cbo01.set_index(-1);

        	if(this.ds00.filter("codecolumn == '00'")){
        		this.ds01.filter("codecolumn < 24");
        	}else if(this.ds00.filter("codecolumn == '01'")){
        		this.ds01.filter("codecolumn > 24");
        	}else{
        		this.div00.form.cbo01.set_index(-1);
        	}
         	this.ds01.set_enableevent(false);//이벤트를 발생시킬지 여부를 설정하는 속성

         	this.ds01.set_updatecontrol(false);//RowType을 자동으로 변경할 것인지 여부를 설정하는 속성

        	this.ds01.setRowType(this.ds01.rowposition,Dataset.ROWTYPE_NORMAL);

        	this.ds01.set_enableevent(true);

        	this.ds01.set_updatecontrol(true);

        // 	e.preindex; // 변경전 combo index
        // 	e.prevalue;//변경전 combo value;
        // 	e.pretext;//변경전 combo text
        //
        // 	e.postindex;//변경후 combo index
        // 	e.postvalue;//변경후 combo value
        // 	e.posttext;//변경후 combo text

        };

        this.div00_cbo02_onitemchanged = function(obj,e)
         {
        // 	//var strSelectType = e.postindex;
        // 	//this.grd01.set_selecttype(strSelectType);
        // 	//상위콤보 데이터를 기준으로 하위콤보 필터링
         	this.ds00.filter("Code.substr(0,1) =='" + e.postvalue + "'");
         	//첫번째 index에 해당하는 combo데이터 선택
        	//this.div00.form.cbo02.set_index(-1);

        	if(this.ds00.filter("codecolumn == '00'")){
         		this.ds02.filter("codecolumn < 24");
         	}else if(this.ds00.filter("codecolumn == '01'")){
         		this.ds02.filter("codecolumn > 24");
         	}else{
         		this.div00.form.cbo02.set_index(-1);
         	}
         };
        //
         this.div00_cbo03_onitemchanged = function(obj,e)
         {
        // 	//var strSelectType = e.postindex;
        // 	//this.grd01.set_selecttype(strSelectType);
         	//상위콤보 데이터를 기준으로 하위콤보 필터링
         	this.ds00.filter("Code.substr(0,1) =='" + e.postvalue + "'");
        	//첫번째 index에 해당하는 combo데이터 선택
        	//this.div00.form.cbo03.set_index(-1);

        	if(this.ds00.filter("codecolumn == '00'")){
        		this.ds03.filter("codecolumn < 24");
         	}else if(this.ds00.filter("codecolumn == '01'")){
         		this.ds03.filter("codecolumn > 24");
         	}else{
         		this.div00.form.cbo03.set_index(-1);
         	}
         };
        //
         this.div00_cbo04_onitemchanged = function(obj,e)
         {
         	//상위콤보 데이터를 기준으로 하위콤보 필터링
         	this.ds00.filter("Code.substr(0,1) =='" + e.postvalue + "'");
        	//첫번째 index에 해당하는 combo데이터 선택
        	//this.div00.form.cbo04.set_index(-1);

         	if(this.ds00.filter("codecolumn == '00'")){
        		this.ds04.filter("codecolumn < 24");
         	}else if(this.ds00.filter("codecolumn == '01'")){
         		this.ds04.filter("codecolumn > 24");
         	}else{
         		this.div00.form.cbo04.set_index(-1);
         	}
         };

        this.addBtn_onclick = function(obj,e)
        {
        	var rRow = this.Dataset00.addRow();
        	var currDate = new Date();
        	this.Dataset00.setColumn(rRow, "writer", "test1"); // 작성자 나오게 하는방법
        	this.Dataset00.setColumn(rRow, "reg_date", currDate); // 현재시간 나오게 하는 방법
        	trace("rRow ==>" + rRow + " : " + this.Dataset00.saveXML());
        };

        this.btn01_onclick = function(obj,e)
        {
        	var rRow = this.Dataset00.deleteRow(this.Dataset00.rowposition);
        	trace("rRow ==>" + rRow + " : " + this.Dataset00.deleteRow());
        };

        this.btn02_onclick = function(obj,e)
        {
        //      var formatString = this.grd01.getCurFormatString();
        //      nexacro.setPrivateProfile("DataSet00", formatString);
        //      nexacro.setPrivateProfile("ds00", this.Dataset00.saveXML());
        //      nexacro.setPrivateProfile("ds01", this.Dataset00.saveXML());
        //      nexacro.setPrivateProfile("ds02", this.Dataset00.saveXML());
        //      nexacro.setPrivateProfile("ds03", this.Dataset00.saveXML());
        //      nexacro.setPrivateProfile("ds04", this.Dataset00.saveXML());
        //    	 alert("저장완료");

        	var id="save";
        	var url = "svcurl::saveAccount.do";
        	var reqDs = "";
        	var resDs = "ds05=dsAccount";
        	var args = "";
        	var callback = "received";

        	this.transaction(id,url,reqDs,resDs,args,callback);
        };
        this.received = function(id, nErrorCode, strErrorMag){
        	if(id == "save"){
        		this.alert("success");
        		}else if(nErrorCode<0){
        			this.alert("fail");
        			return;
        		}

        }

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addBtn.addEventHandler("onclick",this.addBtn_onclick,this);
            this.btn01.addEventHandler("onclick",this.btn01_onclick,this);
            this.btn02.addEventHandler("onclick",this.btn02_onclick,this);
            this.div00.form.cbo00.addEventHandler("onitemchanged",this.div00_cbo00_onitemchanged,this);
            this.div00.form.cbo01.addEventHandler("onitemchanged",this.div00_cbo01_onitemchanged,this);
            this.div00.form.cbo02.addEventHandler("onitemchanged",this.div00_cbo02_onitemchanged,this);
            this.div00.form.cbo03.addEventHandler("onitemchanged",this.div00_cbo03_onitemchanged,this);
            this.div00.form.cbo04.addEventHandler("onitemchanged",this.div00_cbo04_onitemchanged,this);
        };

        this.loadIncludeScript("codeList.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
