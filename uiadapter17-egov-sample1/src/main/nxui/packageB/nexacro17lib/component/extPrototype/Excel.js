/**
*  컨설팅 표준화 작업
*  @FileName 		Excel.js 
*  @Creator 			soojeong
*  @CreateDate 	2017.03.08
*  @Desction   
************** 소스 수정 이력 ***************************************************
*  date          		Modifier                Description
*******************************************************************************
*  2017.03.08     	soojeong 	           최초 생성 
*  2017.10.17     	kyk       	           주석 정비
*******************************************************************************
*/

var pForm = nexacro.Form.prototype;

/**
 * @class excel export <br>
 * @param {Object} objGrid - Grid Object	
 * @param {String} [sSheetName]	- sheet name
 * @param {String} [sFileName]	- file name
 * @return N/A
 * @example
 * this.gfnExcelExport(this.grid_export, "SheetName","");
 */
pForm.gfnExcelExport = function(objGrid,  sSheetName, sFileName)
{

	this.setWaitCursor(true);
	var objGrid_excel = objGrid;
	
	var regExp = /[?*:\/\[\]]/g;  				//(엑셀에서 지원하지않는 모든 문자)
	
	sFileName = sFileName.replace(regExp,"");	//파일명에 특수문자 제거
	sSheetName = sSheetName.replace(regExp,""); //시트명에 특수문자 제거
	
	//fileName nullcheck
	sFileName = this.gfnIsNull(sFileName) ? "ExcelExport_"+this.gfnGetDate() : sFileName;
	//sheetName nullcheck
	sSheetName = this.gfnIsNull(sSheetName) ? "sheet1" : sSheetName;
	//sheetName 30이상일경우 기본시트명
	if( String(sSheetName).length > 30 ){
		sSheetName =  "sheet1";
	}
	
	var svcUrl = "svcurl::XExportImport.do";
	this.objExport = null
	this.objExport = new ExcelExportObject();
	
	this.objExport.objgrid = objGrid_excel;
	this.objExport.set_exporturl(svcUrl);
	this.objExport.addExportItem(nexacro.ExportItemTypes.GRID, objGrid_excel, sSheetName+"!A1","allband","allrecord");
	this.objExport.set_exportfilename(sFileName);	
	
 	this.objExport.set_exporteventtype("itemrecord");
 	this.objExport.set_exportuitype("none");
 	this.objExport.set_exportmessageprocess("");
	this.objExport.addEventHandler("onsuccess", this.gfnExportOnsuccess, this);	
	this.objExport.addEventHandler("onerror", this.gfnExportOnerror, this);	
		
	var result = this.objExport.exportData();
};

/**
 * @class excel export on sucess <br>
 * @param {Object} obj	
 * @param {Event} e		
 * @return N/A
 * @example
 */
pForm.gfnExportOnsuccess = function(obj, e)
{	
	this.setWaitCursor(false);
};

/**
 * @class  excel export on error <br>
 * @param {Object} obj	
 * @param {Event} e		
 * @return N/A
 * @example
 */
pForm.gfnExportOnerror = function(obj,  e)
{
	this.alert("Excel Export Error!!");
	this.trace(e);
	this.setWaitCursor(false);
};

/**
 * @class  excel import( 데이터 헤더포함 ) <br>
 * @param {String} objDs - dataset	
 * @param {String} [sSheet]	- sheet name(default:Sheet1)
 * @param {String} sHead - Head 영역지정	
 * @param {String} [sBody] - body 영역지정(default A2)	
 * @param {String} [sCallback]	- callback 함수
 * @param {String} [sImportId] - import id(callback호출시 필수)	
 * @param {Object} [objForm] - form object(callback호출시 필수)
 * @return N/A
 * @example
 * this.gfnExcelImportAll("dsList","SheetName","A1:G1","A2","fnImportCallback","import",this);
 */
pForm.gfnExcelImportAll = function(objDs,sSheet,sHead,sBody,sCallback,sImportId,objForm)
{	
	this.setWaitCursor(true);    	
	
	if(this.gfnIsNull(sSheet)) sSheet = "sheet1";
	if(this.gfnIsNull(sBody)) sBody = "A2";
	if(this.gfnIsNull(sHead)) return false;
	
	//var svcUrl = "SVC::XExportImport.do";
	var svcUrl = "svcurl::XExportImport.do";
	
	var objImport ;	
	
	objImport = new nexacro.ExcelImportObject(objDs+"_ExcelImport",this);				
	objImport.set_importurl(svcUrl);						
	objImport.set_importtype(nexacro.ImportTypes.EXCEL);			
	
	if (!this.gfnIsNull(sCallback))
	{
		objImport.callback = sCallback;
		objImport.importid = sImportId;
		objImport.form = objForm;
	}
	
	objImport.addEventHandler("onsuccess", this.gfnImportAllOnsuccess, this);
	objImport.addEventHandler("onerror", this.gfnImportAllOnerror, this);	
	var sParam1 = "[Command=getsheetdata;Output=outds;Head="+sSheet+"!"+sHead+";Body="+sSheet+"!"+sBody+"]";
	var sParam2 = "["+objDs+"=outds]";


	objImport.importData("", sParam1, sParam2);						
	objImport = null;	 
};

/**
 * @class excel import on success <br>
 * @param {Object} obj	
 * @param {Event} e		
 * @return N/A
 * @example
 */
pForm.gfnImportAllOnsuccess = function(obj,  e)
{		
	this.setWaitCursor(false);
	var sCallback = obj.callback;
	var sImportId = obj.importid;	
	//화면의 callback 함수 호출
	if (!this.gfnIsNull(sCallback)) this.lookupFunc(sCallback).call(this,sImportId);
};

/**
 * @class  excel import( 데이터 헤더제외 ) <br>
 * @param {String} sDataset - dataset	
 * @param {String} [sSheet]	- sheet name
 * @param {String} [sBody] - body 영역지정	
 * @param {String} [sCallback] - callback 함수	
 * @param {String} [sImportId] - import id(callback호출시 필수)	
 * @param {Object} [objForm] - form object(callback호출시 필수)	
 * @return N/A
 * @example
 * this.gfnExcelImport("dsList","SheetName","A2","fnImportCallback","import",this);
 */
pForm.gfnExcelImport = function(sDataset,sSheet,sBody,sCallback, sImportId, objForm)
{
	this.setWaitCursor(true);    	
	
	if(this.gfnIsNull(sSheet)) sSheet = "sheet1";
	if(this.gfnIsNull(sBody)) sBody = "A2";
	
	//var svcUrl = "SVC::XExportImport.do";
	var svcUrl = "svcurl::XExportImport.do";
	
	var objImport ;	
	objImport = new nexacro.ExcelImportObject(sDataset+"_ExcelImport",this);				
	objImport.set_importurl(svcUrl);						
	objImport.set_importtype(nexacro.ImportTypes.EXCEL);			
	objImport.outds = sDataset;
	
	if (!this.gfnIsNull(sCallback))
	{
		objImport.callback = sCallback;
		objImport.importid = sImportId;
		objImport.form = objForm;
	}
	
	//out dataset 생성(차후 onsucess 함수에서 헤더생성하기 위한)
	var sOutDsName = sDataset+"_outds";	
	if(this.isValidObject(sOutDsName)) this.removeChild(sOutDsName);			
	var objOutDs = new Dataset();
	objOutDs.name = sOutDsName;
	this.addChild(objOutDs.name, objOutDs);
	
	objImport.addEventHandler("onsuccess", this.gfnImportOnsuccess, this);
	objImport.addEventHandler("onerror", this.gfnImportAllOnerror, this);	
	var sParam = "[command=getsheetdata;output=outDs;body=" + sSheet + "!" + sBody +";]";
 	var sParam2 = "[" + sOutDsName + "=outDs]";
 	
	objImport.importData("", sParam, sParam2);						
	objImport = null;	
};

/**
 * @class excel import on success <br>
 * @param {Object} obj	
 * @param {Event} e		
 * @return N/A
 * @example
 */
pForm.gfnImportOnsuccess = function(obj,  e)
{		
	this.setWaitCursor(false);
	
	var objOutDs = this.objects[obj.outds+"_outds"];
	var objOrgDs = this.objects[obj.outds];
	var sCallback = obj.callback;
	var sImportId = obj.importid;
	var objForm = obj.form;
	var sColumnId;
	
	//기존 데이터셋의 내용으로 헤더복사
	for (var i=0; i<objOrgDs.getColCount(); i++)
	{
		sColumnId = "Column"+i;
		if (sColumnId != objOrgDs.getColID(i))
		{
			objOutDs.updateColID(sColumnId, objOrgDs.getColID(i))
		}
	}
	
	objOrgDs.clearData();
	objOrgDs.copyData(objOutDs);
	
	if (!this.gfnIsNull(sCallback)) this.lookupFunc(sCallback).call(this,sImportId);
};

/**
 * @class  excel import on error <br>
 * @param {Object} obj	
 * @param {Event} e		
 * @return N/A
 * @example
 */
pForm.gfnImportAllOnerror = function(obj,  e)
{
	this.setWaitCursor(false);	
	this.alert(e.errormsg);
};