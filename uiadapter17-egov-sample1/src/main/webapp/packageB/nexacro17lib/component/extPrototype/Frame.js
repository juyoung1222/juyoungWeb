/**
*  컨설팅 표준화 작업
*  @MenuPath 
*  @FileName 		frameBottom.xfdl 
*  @Creator 			soojeong
*  @CreateDate 	2017.01.23
*  @LastModifier  
*  @LastModifyDate  
*  @Version 		1.0
*  @Outline 		
*  @Desction   
************** 소스 수정 이력 *************************************************
*    date          		Modifier            Description
*******************************************************************************
*  2017.01.23     	soojeong 	           최초 생성 
*******************************************************************************
*/

var pForm = nexacro.Form.prototype;
/**
* @class frame open  <br>
* @param {String} sMenuId - 화면ID
* @param {String} sPreFix - 경로
* @param {String} sArgment 
* @return N/A
* @example 
* this.gfnAddPage(strMenuId, strPreFix);
*/
pForm.gfnAddPage = function(sMenuId, sPreFix, sArgment)
{
	// Null Check
	if (this.gfnIsNull(sMenuId) || this.gfnIsNull(sPreFix)){
		return false;
	}
	var objApp = nexacro.getApplication();
	var objMenuDs = objApp.gdsMenu; 		//글로벌데이터셋 메뉴
	var objOpenDS = objApp.gdsOpenMenu; //글로벌데이터셋 오픈메뉴
	
	//workFrameset 
	var objWorkFrame = objApp.gvWorkFrameset;
	
	//글로벌데이터셋에서 현재ID에 맞는 로우검색
	var nFindrow = objMenuDs.findRow("MENU_ID",sMenuId);
	
	if( nFindrow < 0 ) return false;
	
	//make form id
	var sFormId = "WORK_FRAME_"+sMenuId;
	var sMenuNm = objMenuDs.getColumn(nFindrow,"MENU_NM");
	
	// Finding existence
	var nOpenRow;
	      nOpenRow = objOpenDS.findRow("FORM_ID", sFormId);
	
	var objPage;
		  objPage = objWorkFrame.all[sFormId];
		  
	if (objPage != null || nOpenRow > -1) {
			objPage.form.setFocus();
			var objMdi = objApp.gvNaviFrame;
			objMdi.form.fnActiveTab(sFormId);
			return;
	}
	
	// Check limit open pages
	var nLimitCnt = objOpenDS.getRowCount();
	if (nLimitCnt == 10) {
		alert("최대열개까지열수있습니다.");
		return;
	}
	
	//create childFrame
	var objNewFrame;
	objNewFrame = new ChildFrame();
	objNewFrame.init(sFormId, 0, 0, 1368, 818, null, null, "Frame::frameWork.xfdl");
	objWorkFrame.addChild(sFormId, objNewFrame);
	
	objNewFrame.ARG_FORM_URL	= sPreFix;
	objNewFrame.ARG_FORM_ID		= sFormId;
	objNewFrame.ARG_MENU_ID		= sMenuId;
	objNewFrame.ARG_MENU_NM		= sMenuNm;
	objNewFrame.set_titletext(sMenuNm); 
	objNewFrame.set_resizable(true);
	objNewFrame.set_openstatus("maximize");
	objNewFrame.set_layered(false);
	objNewFrame.set_showtitlebar(false);
	objNewFrame.set_showstatusbar(false);
	objNewFrame.set_showcascadetitletext(false);
	
	// It is Temp.
	objNewFrame.set_background("white");
	objNewFrame.show();
	//openDs에넣기
	var nAddRow = objOpenDS.addRow();
	objOpenDS.setColumn(nAddRow, "MENU_ID",		sMenuId);
    objOpenDS.setColumn(nAddRow, "MENU_NM", 	sMenuNm);
    objOpenDS.setColumn(nAddRow, "MENU_PREFIX", sPreFix);
    objOpenDS.setColumn(nAddRow, "FORM_ID", 	sFormId);

	// Create MDI Tab
	objApp.gvNaviFrame.form.fnAddTab(sFormId, sMenuNm);
	return true;
};

/**
* @clsdd 탭 전체닫기 <br>
* @return N/A
* @example
*/
pForm.gfnAllClose = function()
{
	var objApp = nexacro.getApplication();
	var objRemove; //삭제대상
	var key;			//삭제FORM_ID
	
	var nFormCnt   = objApp.gvNaviFrame.form.tabNavi.getTabpageCount();
	var objOpenDs =  objApp.gdsOpenMenu;
	
	if( nFormCnt < 0 ) return false;
	
	var arrTab = new Array();
	for( var i=nFormCnt-1; i >= 0; i-- )
	{
		arrTab.push( objApp.gvNaviFrame.form.tabNavi.tabpages[i].name );
	}
	
	for( var j=0; j<arrTab.length; j++)
	{
		key = arrTab[j];
		objRemove = objApp.gvWorkFrameset.removeChild(key);
		
		if( objRemove != null ) objRemove.destroy();
		
		var idx = objApp.gvNaviFrame.form.tabNavi.tabindex;
		objApp.gvNaviFrame.form.tabNavi.removeTabpage(key);
		
		var nRow = objOpenDs.findRow("FORM_ID",key);
		objOpenDs.deleteRow(nRow);
	}
};

/**
* @class frame open <br>
* @param {Object} obj - 화면
* @return N/A
* @example 
* this.gfnFormOnLoad(this);
*/
pForm.gfnFormOnLoad = function(objForm)
{
   var arrComp = objForm.components;
   var nLength = arrComp.length;
   
   for( var i=0; i<nLength; i++)
   {
		if( arrComp[i] instanceof nexacro.Div)
		{
			this.gfnFormOnLoad(arrComp[i].form); //재귀함수
		}
		else if( arrComp[i] instanceof nexacro.Tab )
		{
			var nPages = arrComp[i].tabpages.length;
			
			for( var j=0; j<nPages;j++)
			{			
				this.gfnFormOnLoad(arrComp[i].tabpages[j].form); //재귀함수
			}
		}
   }
};

/**
 * @class left메뉴 클릭시 해당화면 호출함수 <br>
 * @param {Object} oObj 
 * @return N/A
 * @example 
 */
pForm.gfnCall = function(oObj)
{	
	if(!this.gfnIsNull(oObj) && typeof(oObj) !=  "object") return;	
	
	var objApp = nexacro.getApplication();
	var gdsOpen = objApp.gdsOpenMenu;		//열린 dataset	
	var ds   = oObj.ds;							//넘어온 dataset
	var nRow = oObj.nRow;						//선택된 현재 row
	var aArgs = this.gfnIsNull(oObj.oArg) ? "" : oObj.oArg ;   //넘어온 arguments
	var sMenuId;
	
	if (!this.gfnIsNull( oObj.sMenuId)){
		sMenuId = oObj.sMenuId;
	}else{
		sMenuId = ds.getColumn(nRow, objApp.gvMenuColumns.menuId);
	}	
	
	var winid = gdsOpen.lookup(objApp.gvMenuColumns.menuId, sMenuId, objApp.gvMenuColumns.winId);

	if (!this.gfnIsNull(winid))
	{
		if (objApp.gvMdiFrame.form.isActiveFrame(winid, aArgs) == true)
		{
			objApp.gvMdiFrame.form.fnMoveTab(winid);
			return;
		}
	}
	
	//열린메뉴 체크( application.gvMax = 8)	
	if( objApp.gvMax <= gdsOpen.getRowCount() ){
		          
		alert(objApp.gvMax +"개 초과하여 화면을 열수 없습니다");
		return false;
	}
	
	this.gfnNewMdi(sMenuId, nRow, aArgs);
};

/**
 * @class gdsOpenMenu의 해당 Row의 정보를 기준으로 신규 윈도우 화면을 생성하고 open 시킴 <br>
 * @param {String} sMenuId - menuId
 * @param {Number} nRow - gdsOpenMenu의rowpostion
 * @param {Array} aArgs - arguments
 * @return N/A
 */
pForm.gfnNewMdi = function(sMenuId,  nRow, aArgs)
{
	var objApp = nexacro.getApplication();
	var gdsOpen = objApp.gdsOpenMenu;		//열린 dataset
	var gdsMenu = objApp.gdsMenu;
	var winid = "win" + sMenuId + "_" + gdsOpen.getRowCount() + "_" + parseInt(Math.random() * 1000);		
	var strTitle = gdsMenu.lookupAs("menuId", sMenuId, "menuNm");	
	var sPageUrl = gdsMenu.lookupAs(objApp.gvMenuColumns.menuId, sMenuId, objApp.gvMenuColumns.pageUrl);
	var sMenuNm = gdsMenu.lookupAs(objApp.gvMenuColumns.menuId, sMenuId, objApp.gvMenuColumns.menuNm);
	var sGroupId = gdsMenu.lookupAs(objApp.gvMenuColumns.menuId, sMenuId, objApp.gvMenuColumns.groupId);

	if(this.gfnIsNull(sPageUrl)) return;		//pageURl 이 없으면 return
	this.gfnSetOpenMenuDs(winid, sMenuId, strTitle, sPageUrl, sGroupId);	// 열린메뉴 화면 삽입

	var objNewWin = new ChildFrame;
	objNewWin.init(winid, 0, 0, objApp.gvWorkFrame.getOffsetWidth() - 0, objApp.gvWorkFrame.getOffsetHeight() - 0);
	objApp.gvWorkFrame.addChild(winid, objNewWin);

	objNewWin.set_tooltiptext(winid);
	objNewWin.arguments = [];
	objNewWin.set_dragmovetype("all");
	objNewWin.set_showtitlebar(false);
	objNewWin.set_resizable(true);
	objNewWin.set_openstatus("maximize");
	objNewWin.set_titletext( strTitle);
	objNewWin.set_showcascadetitletext(false);
	objNewWin.arguments["winKey"] = winid;
	objNewWin.arguments["menuId"] = sMenuId;
	objNewWin.arguments["menuNm"] = sMenuNm;
	objNewWin.arguments["pageUrl"] = sPageUrl;
	objNewWin.arguments["aArgs"] = aArgs;
	objNewWin.set_formurl("frame::frameWork.xfdl");
	objNewWin.show();

	objApp.gvMdiFrame.form.fnAddTab(winid, strTitle);   //mdi tab button add	
	objApp.gvMdiFrame.form.isActiveFrame(winid);		
};

/**
 * @class 열린화면 데이터셋에 추가 <br>
 * @param {String} winid
 * @param {String} menuId
 * @param {String} strTitle
 * @param {String} spageUrl
 * @param {String} sGroupId
 * @return N/A
 */
pForm.gfnSetOpenMenuDs = function(winid, menuid, strTitle, spageUrl, sGroupId)
{
	var objApp = nexacro.getApplication();
	var gdsOpen = objApp.gdsOpenMenu ;  //열린 dataset
	var nRow = gdsOpen.addRow();
	gdsOpen.setColumn(nRow, objApp.gvMenuColumns.winId, winid);
	gdsOpen.setColumn(nRow, objApp.gvMenuColumns.menuId, menuid);
	gdsOpen.setColumn(nRow, objApp.gvMenuColumns.title, strTitle);	
	gdsOpen.setColumn(nRow, objApp.gvMenuColumns.groupId, sGroupId);
	gdsOpen.setColumn(nRow, "pageUrl", spageUrl);
};
