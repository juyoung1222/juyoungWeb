(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("sample014_file");
            this.set_titletext("file upload download");
            if (Form == this.constructor)
            {
                this._setFormPosition(1050,818);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsFileSingle", this);
            obj._setContents("<ColumnInfo><Column id=\"FILE_PATH\" type=\"STRING\" size=\"256\"/><Column id=\"FILE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FILE_SIZE\" type=\"STRING\" size=\"256\"/><Column id=\"FILE_SAVENM\" type=\"STRING\" size=\"256\"/><Column id=\"FILE_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"NUM\" type=\"STRING\" size=\"256\"/><Column id=\"CHK\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsFileMulti", this);
            obj._setContents("<ColumnInfo><Column id=\"FILE_PATH\" type=\"STRING\" size=\"256\"/><Column id=\"FILE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FILE_SIZE\" type=\"STRING\" size=\"256\"/><Column id=\"FILE_SAVENM\" type=\"STRING\" size=\"256\"/><Column id=\"FILE_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"NUM\" type=\"STRING\" size=\"256\"/><Column id=\"CHK\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new FileUpload("fileUploadSingle","10","59","390","185",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","8","10","296","42",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("[단건] 업로드");
            this.addChild(obj.name, obj);

            obj = new Button("btnSingleAdd","160","30","61","22",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("item추가");
            this.addChild(obj.name, obj);

            obj = new Button("btnSingleDel","224","30","61","22",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("item삭제");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","408","51","576","193",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("dsFileSingle");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"FILE_PATH\"/><Cell col=\"1\" text=\"FILE_NAME\"/><Cell col=\"2\" text=\"FILE_SIZE\"/><Cell col=\"3\" text=\"FILE_SAVENM\"/><Cell col=\"4\" text=\"FILE_TYPE\"/><Cell col=\"5\" text=\"NUM\"/><Cell col=\"6\" text=\"CHK\"/></Band><Band id=\"body\"><Cell text=\"bind:FILE_PATH\"/><Cell col=\"1\" text=\"bind:FILE_NAME\"/><Cell col=\"2\" text=\"bind:FILE_SIZE\"/><Cell col=\"3\" text=\"bind:FILE_SAVENM\"/><Cell col=\"4\" text=\"bind:FILE_TYPE\"/><Cell col=\"5\" text=\"bind:NUM\"/><Cell col=\"6\" text=\"bind:CHK\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("btnSingleUpload","904","18","77","26",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("upload");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","8","282","296","42",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("[다건] 업로드");
            this.addChild(obj.name, obj);

            obj = new FileUpload("fileUploadMulti","10","331","390","21",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_multiselect("true");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","408","323","576","193",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("dsFileMulti");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"FILE_PATH\"/><Cell col=\"1\" text=\"FILE_NAME\"/><Cell col=\"2\" text=\"FILE_SIZE\"/><Cell col=\"3\" text=\"FILE_SAVENM\"/><Cell col=\"4\" text=\"FILE_TYPE\"/><Cell col=\"5\" text=\"NUM\"/><Cell col=\"6\" text=\"CHK\"/></Band><Band id=\"body\"><Cell text=\"bind:FILE_PATH\"/><Cell col=\"1\" text=\"bind:FILE_NAME\"/><Cell col=\"2\" text=\"bind:FILE_SIZE\"/><Cell col=\"3\" text=\"bind:FILE_SAVENM\"/><Cell col=\"4\" text=\"bind:FILE_TYPE\"/><Cell col=\"5\" text=\"bind:NUM\"/><Cell col=\"6\" text=\"bind:CHK\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("btnMultiUpload","904","290","77","26",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("upload");
            this.addChild(obj.name, obj);

            obj = new Static("Static02","8","538","296","42",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("다운로드");
            this.addChild(obj.name, obj);

            obj = new FileDownload("FileDownload00","8","571","60","38",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("fileDownload");
            obj.set_visible("false");
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
        this.registerScript("pattern03-file.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath
        *  @FileName 		sample014_file.xfdl
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
        this.fileUpload_onsuccess = function(obj,  e)
        {
        	//TODO.
         	trace("fileUpload_onsuccess >> " + e.datasets[0].saveXML());
        // 	this.alert("파일 업로드 완료!!!");
        }

        this.fileUpload_onerror = function(obj,  e)
        {
        	//TODO.
        	trace("fileUpload_onerror >> " + e.errormsg);
        	//this.alert("파일 업로드 실패!!!  "+ e.errormsg);
        }

         /************************************************************************************************
         * 사용자 FUNCTION 영역
         ************************************************************************************************/

         /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        /**
        * fileUploadSingle_onitemchanged 	파일 업로드 컴포넌트(싱글) - 선택된 파일 정보 데이터셋 반영
        * @param  : obj	- FileUpload
        * @param  : e	- FileUploadItemChangeEventInfo
        * @return : N/A
        * @example :
        */
        this.FileUpload00_onitemchanged = function(obj,e)
        {
        	var sCompValue = this.fileUploadSingle.value;
        	var sNewvalue = e.newvalue;
        	var sOldValue = e.oldvalue;

        	trace("sCompValue >> " + sCompValue +  " sNewvalue >> " + sNewvalue + "  sOldValue >> " + sOldValue );
        	var sFilePath = this.fileUploadSingle.value;
        	var dirExpt = nexacro.toNumber(sFilePath.lastIndexOf("\\"))+1;

        	var sFileName = sFilePath.substr(dirExpt);
        	var nRow = this.dsFileSingle.addRow();

        	this.dsFileSingle.setColumn(nRow, "FILE_PATH", sFilePath);
        	this.dsFileSingle.setColumn(nRow, "FILE_NAME", sFileName);
        };
        /**
        * fileUploadMulti_onitemchanged 	파일 업로드 컴포넌트(싱글) 추가
        * @param  : obj	- Button
        * @param  : e	- nexacro.ClickEventInfo
        * @return : N/A
        * @example :
        */
        this.btnSingleAdd_onclick = function(obj,e)
        {
        	this.fileUploadSingle.appendItem();
        };
        /**
        * fileUploadMulti_onitemchanged 	파일 업로드 컴포넌트(싱글) 삭제
        * @param  : obj	- Button
        * @param  : e	- nexacro.ClickEventInfo
        * @return : N/A
        * @example :
        */
        this.btnSingleDel_onclick = function(obj,e)
        {
        	var nRow = this.dsFileSingle.rowposition;
        	this.fileUploadSingle.deleteItem(nRow);
        	this.dsFileSingle.deleteRow(nRow);
        };
        /**
        * btnSingleUpload_onclick 	파일 업로드(싱글)
        * @param  : obj	- Button
        * @param  : e	- nexacro.ClickEventInfo
        * @return : N/A
        * @example :
        */
        this.btnSingleUpload_onclick = function(obj,e)
        {
        	var objFileUpload = this.fileUploadSingle;

        	/**
        	 * 현재 Form 상의 FileUpload 컴포넌트를 서버에 업로드한다.
        	 * @param {Object} objFileUpload		파일업로드 컴포넌트
        	 * @param {String} sUrl		            파일업로드 서비스 호출 경로 (생략 가능)
        	 * @param {String} sPath				파일업로드시킬 폴더 위치 (생략 가능)
        	 * @example this.gfnFileUpload(objFileUpload);
        	 */
        	this.gfnFileUpload(objFileUpload);
        };
        /**
        * fileUploadMulti_onitemchanged 	파일 업로드 컴포넌트(멀티) - 선택된 파일 정보 데이터셋 반영
        * @param  : obj	- FileUpload
        * @param  : e	- FileUploadItemChangeEventInfo
        * @return : N/A
        * @example :
        */
        this.fileUploadMulti_onitemchanged = function(obj,e)
        {
        	var sFileName;
        	var sFilePath;

        	if(obj.multiselect)
            {
        	    //var sFullData = e.newvalue;
        		var sFullData = this.fileUploadMulti.value;
        		var aFilePath = sFullData.split(",");
        		this.dsFileMulti.clearData();
        	}

        	for(var i=0; i<aFilePath.length; i++)
        	{
        		sFilePath = aFilePath[i];

        		var dirExpt = sFilePath.lastIndexOf("\\")+1;

        		sFileName = sFilePath.substr(dirExpt);

        		this.dsFileMulti.addRow();

        		this.dsFileMulti.setColumn(i, "FILE_PATH", sFilePath);
        		this.dsFileMulti.setColumn(i, "FILE_NAME", sFileName);
        		this.dsFileMulti.setColumn(i, "NUM", i+1);
        		this.dsFileMulti.setColumn(i, "CHK",1);
        	}
        };
        /**
        * fileUploadMulti_onitemchanged 	파일 업로드(멀티)
        * @param  : obj	- Button
        * @param  : e	- nexacro.ClickEventInfo
        * @return : N/A
        * @example :
        */
        this.btnMultiUpload_onclick = function(obj,e)
        {
        	//trace(this.dsFileMulti.saveXML());
            var objFileUpload = this.fileUploadMulti;

        	/**
        	 * 현재 Form 상의 FileUpload 컴포넌트를 서버에 업로드한다.
        	 * @param {Object} objFileUpload		파일업로드 컴포넌트
        	 * @param {String} sUrl		            파일업로드 서비스 호출 경로 (생략 가능)
        	 * @param {String} sPath				파일업로드시킬 폴더 위치 (생략 가능)
        	 * @example this.gfnFileUpload(objFileUpload);
        	 */
            this.gfnFileUpload(objFileUpload);
        };



        this.FileDownload00_onerror = function(obj,e)
        {
        	trace(e.errormsg);
        };

        this.FileDownload00_onsuccess = function(obj,e)
        {
        	trace(e.url);
        };

        this.Grid00_oncelldblclick = function(obj,e)
        {
        	var objFileDownload = this.FileDownload00;
        	var sFilename= this.dsFileSingle.getColumn(e.row,"FILE_NAME");

        	/**
        	 * 현재 Form 상의 FileDownload 컴포넌트를 이용하여 지정한 위치에서 원하는 파일을 다운로드한다.
        	 * @param {Object} objFileDownload	파일다운로드 컴포넌트
        	 * @param {Object} sFilename		다운로드 할 파일명
        	 * @param {String} sUrl		        파일업로드 서비스 호출 경로 (생략 가능)
        	 * @param {String} sPath			파일업로드시킬 폴더 위치 (생략 가능)
        	 * @example this.gfnFileUpload(objFileUpload, sFilename);
        	 */
        	this.gfnFileDownload(objFileDownload, sFilename);
        };

        this.Grid01_oncelldblclick = function(obj,e)
        {
        	var objFileDownload = this.FileDownload00;
        	var sFilename= this.dsFileMulti.getColumn(e.row,"FILE_NAME");

        	alert(sFilename);
        	/**
        	 * 현재 Form 상의 FileDownload 컴포넌트를 이용하여 지정한 위치에서 원하는 파일을 다운로드한다.
        	 * @param {Object} objFileDownload	파일다운로드 컴포넌트
        	 * @param {Object} sFilename		다운로드 할 파일명
        	 * @param {String} sUrl		        파일업로드 서비스 호출 경로 (생략 가능)
        	 * @param {String} sPath			파일업로드시킬 폴더 위치 (생략 가능)
        	 * @example this.gfnFileUpload(objFileUpload, sFilename);
        	 */
        	this.gfnFileDownload(objFileDownload, sFilename);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
            this.fileUploadSingle.addEventHandler("onerror",this.fileUpload_onerror,this);
            this.fileUploadSingle.addEventHandler("onitemchanged",this.FileUpload00_onitemchanged,this);
            this.fileUploadSingle.addEventHandler("onsuccess",this.fileUpload_onsuccess,this);
            this.btnSingleAdd.addEventHandler("onclick",this.btnSingleAdd_onclick,this);
            this.btnSingleDel.addEventHandler("onclick",this.btnSingleDel_onclick,this);
            this.Grid00.addEventHandler("oncelldblclick",this.Grid00_oncelldblclick,this);
            this.btnSingleUpload.addEventHandler("onclick",this.btnSingleUpload_onclick,this);
            this.fileUploadMulti.addEventHandler("onerror",this.fileUpload_onerror,this);
            this.fileUploadMulti.addEventHandler("onsuccess",this.fileUpload_onsuccess,this);
            this.fileUploadMulti.addEventHandler("onitemchanged",this.fileUploadMulti_onitemchanged,this);
            this.Grid01.addEventHandler("oncelldblclick",this.Grid01_oncelldblclick,this);
            this.btnMultiUpload.addEventHandler("onclick",this.btnMultiUpload_onclick,this);
            this.FileDownload00.addEventHandler("onsuccess",this.FileDownload00_onsuccess,this);
            this.FileDownload00.addEventHandler("onerror",this.FileDownload00_onerror,this);
        };

        this.loadIncludeScript("pattern03-file.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
