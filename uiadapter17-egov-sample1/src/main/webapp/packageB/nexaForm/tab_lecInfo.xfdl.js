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
            this.set_titletext("강사기본정보");
            if (Form == this.constructor)
            {
                this._setFormPosition(1010,180);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Edit("edt00","70","10","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Static("sta00","10","10","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("강사번호");
            this.addChild(obj.name, obj);

            obj = new Edit("edt01","330","10","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            this.addChild(obj.name, obj);

            obj = new Static("sta01","270","10","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("강사명");
            this.addChild(obj.name, obj);

            obj = new Edit("edt02","70","50","720","20",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Static("sta02","10","50","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("주소");
            this.addChild(obj.name, obj);

            obj = new Static("sta03","270","30","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("강사등급");
            this.addChild(obj.name, obj);

            obj = new Static("sta04","530","10","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("전화번호");
            this.addChild(obj.name, obj);

            obj = new Static("sta05","10","30","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("생년월일");
            this.addChild(obj.name, obj);

            obj = new Static("sta06","530","30","60","20",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("고용일");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo00","330","30","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("cbo00");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("msk00","70","30","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("msk01","590","30","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("msk02","590","10","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("13");
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
        this.registerScript("tab_lecInfo.xfdl", function() {

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("tab_lecInfo.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
