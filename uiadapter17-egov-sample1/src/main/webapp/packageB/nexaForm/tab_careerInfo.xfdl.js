(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("tabPage1");
            this.set_titletext("강사이력정보");
            if (Form == this.constructor)
            {
                this._setFormPosition(1010,180);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds00", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">00</Col><Col id=\"datacolumn\">초급</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">중급</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">고급</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">특급</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">근무경력</Col></Row><Row><Col id=\"codecolumn\">05</Col><Col id=\"datacolumn\">자격</Col></Row><Row><Col id=\"codecolumn\">06</Col><Col id=\"datacolumn\">수상내역</Col></Row><Row><Col id=\"codecolumn\">07</Col><Col id=\"datacolumn\">집필내역</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Combo("cbo00","20","20","150","20",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_innerdataset("ds00");
            obj.set_text("cbo00");
            obj.set_index("-1");
            this.addChild(obj.name, obj);

            obj = new Grid("grd01","20","40",null,"100","191",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"경력번호\"/><Cell col=\"1\" text=\"내용\"/><Cell col=\"2\" text=\"시작일\"/><Cell col=\"3\" text=\"종료일\"/></Band><Band id=\"body\"><Cell text=\"\"/><Cell col=\"1\" text=\"\"/><Cell col=\"2\" text=\"\"/><Cell col=\"3\" text=\"\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1010,180,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("tab_careerInfo.xfdl", function() {
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
        this.cbo00_onitemchanged = function(obj,e)
        {

        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.cbo00.addEventHandler("onitemchanged",this.cbo00_onitemchanged,this);
        };

        this.loadIncludeScript("tab_careerInfo.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
