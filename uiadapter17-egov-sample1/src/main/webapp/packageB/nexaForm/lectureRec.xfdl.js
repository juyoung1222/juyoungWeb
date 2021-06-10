(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("lectureRec");
            this.set_titletext("강사정보등록");
            this.getSetter("classname").set("Work");
            this.getSetter("inheritanceid").set("");
            if (Form == this.constructor)
            {
                this._setFormPosition(1050,818);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds00", this);
            obj._setContents("<ColumnInfo><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">00</Col><Col id=\"datacolumn\">초급</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">중급</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">고급</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grd00","20","40",null,"150","20",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"강사번호\" expandsize=\"16\"/><Cell col=\"1\" text=\"강사명\"/><Cell col=\"2\" text=\"전화번호\"/><Cell col=\"3\" text=\"생년월일\"/><Cell col=\"4\" text=\"주소\"/><Cell col=\"5\" text=\"강사등급\"/><Cell col=\"6\" text=\"고용일\"/></Band><Band id=\"body\"><Cell text=\"\"/><Cell col=\"1\" text=\"\"/><Cell col=\"2\" text=\"\"/><Cell col=\"3\" text=\"\"/><Cell col=\"4\" text=\"\"/><Cell col=\"5\" text=\"\"/><Cell col=\"6\" text=\"\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Tab("tab00","20","210","1010","210",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_tabindex("0");
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.tab00);
            obj.set_text("강사기본정보");
            obj.set_url("");
            this.tab00.addChild(obj.name, obj);

            obj = new Edit("edt00","66","25","154","26",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("0");
            obj.set_readonly("readonly");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("sta01","-3","73","46","21",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("1");
            obj.set_text("생년월일");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Edit("edt00_00_00","68","111","742","26",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("2");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("sta00","0","111","48","27",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("3");
            obj.set_text("주소");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("sta02","245","25","59","26",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("4");
            obj.set_text("강사명");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Edit("edt01","300","25","178","26",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("5");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("sta03","238","70","62","27",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("6");
            obj.set_text("강사등급");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("sta04","508","28","56","22",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("7");
            obj.set_text("전화번호");
            obj.getSetter("displaytype").set("mask");
            obj.getSetter("format").set("### - #### - ####");
            obj.getSetter("maskedittype").set("string");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("sta05","512","78","48","22",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("8");
            obj.set_text("고용일");
            obj.getSetter("displaytype").set("mask");
            obj.getSetter("format").set("yy-MM-dd");
            obj.getSetter("maskedittype").set("string");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Combo("cbo00","303","75","175","25",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("9");
            obj.set_innerdataset("ds00");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_text("cbo00");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new MaskEdit("msk00","572","35","234","23",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("10");
            obj.set_type("number");
            obj.set_trimtype("both");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new MaskEdit("msk01","576","76","232","25",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("11");
            obj.set_trimtype("both");
            obj.getSetter("displaytype").set("mask");
            obj.getSetter("maskeditformat").set("yy-MM-dd");
            obj.getSetter("maskedittype").set("number");
            obj.set_maskchar("yy-MM-dd");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new MaskEdit("msk02","66","73","154","23",null,null,null,null,null,null,this.tab00.Tabpage1.form);
            obj.set_taborder("12");
            obj.set_trimtype("both");
            obj.set_maskchar("yy-MM-dd");
            this.tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.tab00);
            obj.set_text("강사이력정보");
            obj.set_url("");
            this.tab00.addChild(obj.name, obj);

            obj = new Button("btn00","790","218","80","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("추가");
            this.addChild(obj.name, obj);

            obj = new Button("btn01","870","218","80","20",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("저장");
            this.addChild(obj.name, obj);

            obj = new Button("btn02","950","218","80","20",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("삭제");
            this.addChild(obj.name, obj);

            obj = new Static("sta00","20","20","500","19",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("강사관리");
            obj.set_font("normal bold 12pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta01","16","264","62","28",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("강사번호");
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
        this.registerScript("lectureRec.xfdl", function() {
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
        this.tab00.Tabpage2.set_url("nexaForm::tab_careerInfo.xfdl");










        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.tab00.Tabpage1.form.edt00.addEventHandler("onchanged",this.tab00_Tabpage1_edt00_onchanged,this);
            this.tab00.Tabpage1.form.sta02.addEventHandler("onclick",this.tab00_Tabpage1_sta02_onclick,this);
            this.tab00.Tabpage1.form.sta04.addEventHandler("onclick",this.tab00_Tabpage1_sta04_onclick,this);
            this.tab00.Tabpage1.form.sta05.addEventHandler("onclick",this.tab00_Tabpage1_sta05_onclick,this);
            this.tab00.Tabpage1.form.msk00.addEventHandler("onchanged",this.tab00_Tabpage1_msk00_onchanged,this);
        };

        this.loadIncludeScript("lectureRec.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
