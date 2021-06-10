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
            obj._setContents("<ColumnInfo><Column id=\"profit_cost\" type=\"STRING\" size=\"256\"/><Column id=\"big_group\" type=\"STRING\" size=\"256\"/><Column id=\"middle_group\" type=\"STRING\" size=\"256\"/><Column id=\"small_group\" type=\"STRING\" size=\"256\"/><Column id=\"detail_group\" type=\"STRING\" size=\"256\"/><Column id=\"comments\" type=\"STRING\" size=\"256\"/><Column id=\"transaction_money\" type=\"INT\" size=\"256\"/><Column id=\"transaction_date\" type=\"DATE\" size=\"256\"/><Column id=\"writer\" type=\"STRING\" size=\"256\"/><Column id=\"reg_date\" type=\"DATE\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"profit_cost\"/><Col id=\"big_group\"/><Col id=\"middle_group\"/><Col id=\"small_group\"/><Col id=\"detail_group\"/></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds00", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">00</Col><Col id=\"datacolumn\">수익</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">비용</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds01", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">00</Col><Col id=\"datacolumn\">매출수익</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매출금</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">외상매출금</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">선수금</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">영업외 수익</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">자본금</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">이자수익</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">매출원가</Col></Row><Row><Col id=\"codecolumn\">08</Col><Col id=\"datacolumn\">사업인건비</Col></Row><Row><Col id=\"codecolumn\">09</Col><Col id=\"datacolumn\">계약직</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">특급기술자</Col></Row><Row><Col id=\"codecolumn\">11</Col><Col id=\"datacolumn\">고급기술자</Col></Row><Row><Col id=\"codecolumn\">12</Col><Col id=\"datacolumn\">중급기술자</Col></Row><Row><Col id=\"codecolumn\">13</Col><Col id=\"datacolumn\">초급기술자</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds02", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">00</Col><Col id=\"datacolumn\">매출수익</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매출금</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">외상매출금</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">선수금</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">영업외 수익</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">자본금</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">이자수익</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">매출원가</Col></Row><Row><Col id=\"codecolumn\">08</Col><Col id=\"datacolumn\">사업인건비</Col></Row><Row><Col id=\"codecolumn\">09</Col><Col id=\"datacolumn\">계약직</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">특급기술자</Col></Row><Row><Col id=\"codecolumn\">11</Col><Col id=\"datacolumn\">고급기술자</Col></Row><Row><Col id=\"codecolumn\">12</Col><Col id=\"datacolumn\">중급기술자</Col></Row><Row><Col id=\"codecolumn\">13</Col><Col id=\"datacolumn\">초급기술자</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds03", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">00</Col><Col id=\"datacolumn\">매출수익</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매출금</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">외상매출금</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">선수금</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">영업외 수익</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">자본금</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">이자수익</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">매출원가</Col></Row><Row><Col id=\"codecolumn\">08</Col><Col id=\"datacolumn\">사업인건비</Col></Row><Row><Col id=\"codecolumn\">09</Col><Col id=\"datacolumn\">계약직</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">특급기술자</Col></Row><Row><Col id=\"codecolumn\">11</Col><Col id=\"datacolumn\">고급기술자</Col></Row><Row><Col id=\"codecolumn\">12</Col><Col id=\"datacolumn\">중급기술자</Col></Row><Row><Col id=\"codecolumn\">13</Col><Col id=\"datacolumn\">초급기술자</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds04", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">00</Col><Col id=\"datacolumn\">매출수익</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매출금</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">외상매출금</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">선수금</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">영업외 수익</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">자본금</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">이자수익</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">매출원가</Col></Row><Row><Col id=\"codecolumn\">08</Col><Col id=\"datacolumn\">사업인건비</Col></Row><Row><Col id=\"codecolumn\">09</Col><Col id=\"datacolumn\">계약직</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">특급기술자</Col></Row><Row><Col id=\"codecolumn\">11</Col><Col id=\"datacolumn\">고급기술자</Col></Row><Row><Col id=\"codecolumn\">12</Col><Col id=\"datacolumn\">중급기술자</Col></Row><Row><Col id=\"codecolumn\">13</Col><Col id=\"datacolumn\">초급기술자</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grd01","10","30",null,"316","10",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_autofittype("col");
            obj.set_autoenter("select");
            obj.set_binddataset("Dataset00");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"214\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell text=\"수익/비용\"/><Cell col=\"1\" text=\"관\"/><Cell col=\"2\" text=\"항\"/><Cell col=\"3\" text=\"목\"/><Cell col=\"4\" text=\"과\"/><Cell col=\"5\" text=\"내용\"/><Cell col=\"6\" text=\"금액\"/><Cell col=\"7\" text=\"거래일자\"/><Cell col=\"8\" text=\"작성자\"/><Cell col=\"9\" text=\"등록일\"/></Band><Band id=\"body\"><Cell text=\"bind:profit_cost\" displaytype=\"combocontrol\" edittype=\"combo\" combocodecol=\"codecolumn\" combodatacol=\"datacolumn\" combodataset=\"ds00\"/><Cell col=\"1\" text=\"bind:big_group\" displaytype=\"combocontrol\" edittype=\"combo\" combocodecol=\"codecolumn\" combodatacol=\"datacolumn\" combodataset=\"ds01\"/><Cell col=\"2\" text=\"bind:middle_group\" displaytype=\"combocontrol\" edittype=\"combo\" combocodecol=\"codecolumn\" combodatacol=\"datacolumn\" combodataset=\"ds02\"/><Cell col=\"3\" text=\"bind:small_group\" displaytype=\"combocontrol\" edittype=\"combo\" combocodecol=\"codecolumn\" combodatacol=\"datacolumn\" combodataset=\"ds03\"/><Cell col=\"4\" text=\"bind:detail_group\" displaytype=\"combocontrol\" edittype=\"combo\" combocodecol=\"codecolumn\" combodatacol=\"datacolumn\" combodataset=\"ds04\"/><Cell col=\"5\" text=\"bind:comments\" displaytype=\"textareacontrol\" edittype=\"textarea\" wordWrap=\"char\"/><Cell col=\"6\" text=\"bind:transaction_money\"/><Cell col=\"7\" text=\"bind:transaction_date\"/><Cell col=\"8\" text=\"bind:writer\"/><Cell col=\"9\" text=\"bind:reg_date\"/></Band><Band id=\"summary\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\" expr=\"dataset.getSum(&quot;transaction_money&quot;)\"/><Cell col=\"7\"/><Cell col=\"8\"/><Cell col=\"9\"/></Band></Format></Formats>");
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

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("editableGrid.xfdl", function() {
        /************************************************************************************************
         * CALLBACK 콜백 처리부분(Transaction, Popup)
         ************************************************************************************************/

        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/

        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
        ************************************************************************************************/

        /************************************************************************************************
        * 사용자 FUNCTION 영역
        ************************************************************************************************/
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

        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.grd01.addEventHandler("oncellclick",this.Grid00_oncellclick,this);
            this.grd01.addEventHandler("onkeyup",this.edit_input_onkeyup,this);
            this.addBtn.addEventHandler("onclick",this.addBtn_onclick,this);
            this.btn01.addEventHandler("onclick",this.btn01_onclick,this);
            this.btn02.addEventHandler("onclick",this.btn02_onclick,this);
        };

        this.loadIncludeScript("editableGrid.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
