(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("frameTop");
            this.set_titletext("frameTop");
            this.set_scrolltype("none");
            this.set_scrollbartype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1024,44);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMenu", this);
            obj._setContents("");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("staLogo","-12","0","165",null,null,"0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Nexacro17");
            obj.set_textAlign("center");
            obj.set_font("16pt \"맑은 고딕\"");
            obj.set_color("slategray");
            this.addChild(obj.name, obj);

            obj = new Static("staName",null,"8","43","24","191",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("운영자");
            obj.set_font("bold 10pt \"맑은 고딕\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static02",null,"8","91","24","93",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("님 환영합니다.");
            this.addChild(obj.name, obj);

            obj = new Button("btnLogOut",null,"12","60","19","15",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("로그아웃");
            this.addChild(obj.name, obj);

            obj = new Div("divTopBtn","240","0",null,null,"326","0",null,null,null,null,this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Button("btnPre",null,"11","20","20","278",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_visible("true");
            obj.set_text("<");
            this.addChild(obj.name, obj);

            obj = new Button("btnNex",null,"11","20","20","257",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_visible("true");
            obj.set_text(">");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1024,44,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("frameTop.xfdl", function() {
        /**
        *  컨설팅 표준화 작업
        *  @MenuPath
        *  @FileName         frameBottom.xfdl
        *  @Creator             soojeong
        *  @CreateDate     2017.01.23
        *  @LastModifier
        *  @LastModifyDate
        *  @Version         1.0
        *  @Outline
        *  @Desction
        ************** 소스 수정 이력 *************************************************
        *    date                  Modifier            Description
        *******************************************************************************
        *  2017.01.23         soojeong                최초 생성
        *******************************************************************************
        */


        /************************************************************************************************
         * FORM 변수 선언 영역
         ************************************************************************************************/
        this.objApp;
        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        this.form_onload = function(obj,e)
        {
             this.objApp = nexacro.getApplication();
            this.divTopBtn.form.set_scrollbartype("none");
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
         /**
         * 로그인 사용자 세팅
         * @return
         * @example
         *
         * @memberOf
         */
        this.fnSetName = function()
        {
            this.staName.set_text(nexacro.getEnvironmentVariable("gvUserNm"));
        }

        /**
         * @description 메세지 콜백
        */
        this.fnMsgCallback = function (strId, strVal)
        {
            //trace("strId >> " + strId + "   strVal >> " + strVal);
            if(strId == "confirm.logout"){
                //trace("strVal : " + strVal);
                if(strVal)
                {
                    this.objApp.exit();
                }
            }
        };

        /**
         * menu tab 버튼 첫번째 index 가져오는 함수
         * @public
         * @return
         * @example
         * @memberOf
         */
        this.fnGetFirstTabIndex = function ()
        {
            for(var i=0; i < this.dsMenu.rowcount;i++)
            {
                var tabID   = this.dsMenu.getColumn(i, this.objApp.gvMenuColumns.menuId);
                var tabObj  = this.fnFindObj("btnTop" + tabID);
                if(0 <= tabObj.left) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * menu tab 버튼 첫번째 이동 함수
         * @public
         * @return
         * @example
         * @memberOf
         */
        this.fnMoveFirst = function (nMoveIdx)
        {
            var nIndex;
            var tabID;
            var tabObj;
            var btnObj;
            var tabFirstObj;

            nIndex = this.fnGetFirstTabIndex();
            if (nIndex < 0)
            {
                return;
            }

            if (nMoveIdx < 0)
            {
                return;
            }
            if (nMoveIdx >= this.dsMenu.rowcount)
            {
                return;
            }

            tabID = this.dsMenu.getColumn(nIndex, this.objApp.gvMenuColumns.menuId);
            var tabFirstObj = this.fnFindObj("btnTop" + tabID);

            tabID = this.dsMenu.getColumn(nMoveIdx, this.objApp.gvMenuColumns.menuId);
            tabObj = this.fnFindObj("btnTop" + tabID);

            var nShiftPos = tabObj.getOffsetLeft() - tabFirstObj.getOffsetLeft();

            for (var i = 0; i < this.dsMenu.rowcount; i++)
            {
                tabID = this.dsMenu.getColumn(i, this.objApp.gvMenuColumns.menuId);
                tabObj = this.fnFindObj("btnTop" + tabID);
                tabObj.move(tabObj.getOffsetLeft() - nShiftPos, tabObj.getOffsetTop());
            }
        }

        /**
         * menu tab 체크
         * @public
         * @param
         * @return
         * @example
         * @memberOf
         */
        this.fnRedrawTab = function ()
        {
            var tabObj;
            var exBtnObj;

            this.fnCheckShowBtnAll();
            this.fnSetTabSpinBtnShow();
        }

        /**
         * menu tab 모든 버튼 체크
         * @public
         * @param
         * @return
         * @example
         * @memberOf
         */
        this.fnCheckShowBtnAll = function ()
        {
            if (this.dsMenu.rowcount == 0) return;

            var tabFirstObj = this.fnFindObj("btnTop" + this.dsMenu.getColumn(0, this.objApp.gvMenuColumns.menuId));
            var tabLastObj = this.fnFindObj("btnTop" + this.dsMenu.getColumn(this.dsMenu.rowcount - 1, this.objApp.gvMenuColumns.menuId));
            var nLeft = tabFirstObj.getOffsetLeft();
            var nRight = tabLastObj.getOffsetRight();

            if (this.divTopBtn.getOffsetWidth() >= (nRight - nLeft))
            {
                this.fnMoveFirst(0);
                return;
            }
        }

        /**
         * mdi spin 버튼 visible 처리
         * @public
         * @return
         * @example
         * @memberOf
         */
        this.fnSetTabSpinBtnShow = function ()
        {
            var tabObj;

            if(this.dsMenu.rowcount == 0)
            {
                this.btnPre.set_enable(false);
                this.btnNex.set_enable(false);
                return;
            }

            tabObj = this.fnFindObj("btnTop" + this.dsMenu.getColumn(this.dsMenu.rowcount - 1, this.objApp.gvMenuColumns.menuId));

            if(this.divTopBtn.getOffsetWidth() < tabObj.getOffsetRight())
            {
                this.btnNex.set_enable(true);
            }
            else
            {
                this.btnNex.set_enable(false);
            }

            tabObj = this.fnFindObj("btnTop" + this.dsMenu.getColumn(0, this.objApp.gvMenuColumns.menuId));

            if(tabObj.getOffsetLeft() < 0)
            {
                this.btnPre.set_enable(true);
            }
            else
            {
                this.btnPre.set_enable(false);
            }
        }

        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        this.Menu00_onmenuclick = function(obj,e)
        {
            this.objApp.gvLeftFrame.form.getMenu(e.id);
        };

        this.staLogo_onclick = function(obj,e)
        {
            var objApp = nexacro.getApplication() ;

            objApp.gvVFrameSet1.set_separatesize("32,0,*");
        };

        this.btnLogOut_onclick = function(obj,e)
        {
            if(system.navigatorname == "nexacro")
            {
                var sMsgId = "confirm.logout";                                    //메세지ID
                var arrArg = "";                                                //메세지취환될값 배열[생략가능]
                var sPopId = sMsgId;                                            //메세지팝업ID[생략가능]    *해당화면에서 메시지 중복사용시 구분되는값을 넣어줘야함
                var sMsgCallback = "fnMsgCallback";                                //메세지콜백[생략가능]         * confirm성 메시지를 사용 시 반드시 필요

                // 변경된 내역을 저장 하시겠습니까?
                this.gfnAlert(sMsgId, arrArg, sPopId, sMsgCallback);
            }
            else
            {
                window.top.location.reload(true);
            }
        };

        this.fnLoad = function ()
        {
            this.objApp.gdsMenu.filter(this.objApp.gvMenuColumns.menuLevel + "==0");
            this.dsMenu.copyData(this.objApp.gdsMenu, true);
            this.objApp.gdsMenu.filter("");
            this.fnSetTopMenu();
        };

        this.fnSetTopMenu = function ()
        {
            var btnObj;

            for (var i = 0; i < this.dsMenu.getRowCount(); i++)
            {
                var strID = this.dsMenu.getColumn(i, this.objApp.gvMenuColumns.menuId);
                var strName = this.dsMenu.getColumn(i, this.objApp.gvMenuColumns.menuNm);
                this.fnCreateTopMenu(strID, strName, i);
            }
            this.fnRedrawTab();
        };

        // Top menu creation
        this.fnCreateTopMenu = function (strID, strName, index)
        {
            // Creating page button
            var objBtn = new Button();
            objBtn.init("btnTop" + strID, ((index * 133)), 0, (index * 133) + 133 - (index * 133), 40);
            this.divTopBtn.addChild(objBtn.name, objBtn);
            objBtn.set_text(strName);
            objBtn.menuid = strID;
            //objBtn.set_cssclass("TF_menu");

            objBtn.setEventHandler("onclick", this.Button_onclick, this);
            objBtn.set_visible(true);
            objBtn.show();
        };

        this.Button_onclick = function (obj, e)
        {
            this.objApp.gvLeftFrame.form.fnChangeMenu(obj.menuid);
            this.fnSetActiveBtn(obj.menuid);
        };

        this.fnSetActiveBtn = function (menuId)
        {
            var MenuObj;

            for (var i = 0; i < this.dsMenu.getRowCount(); i++)
            {
                MenuObj = this.fnFindObj("btnTop" + this.dsMenu.getColumn(i, this.objApp.gvMenuColumns.menuId));
                if (menuId == this.dsMenu.getColumn(i, this.objApp.gvMenuColumns.menuId))
                {
                    //MenuObj.set_cssclass("btn_menu_select");
                }
                else
                {
                    //MenuObj.set_cssclass("btn_menu");
                }
            }
        };

        this.fnFindObj = function (strId)
        {
            return this.divTopBtn.form.components[strId];
        };

        this.btnPre_onclick = function(obj,e)
        {
            this.fnMoveFirst(this.fnGetFirstTabIndex() - 1);
            this.fnRedrawTab();
        };

        this.btnNex_onclick = function(obj,e)
        {
            this.fnMoveFirst(this.fnGetFirstTabIndex() + 1);
            this.fnRedrawTab();
        };

        this.form_onsize = function(obj,e)
        {
            this.fnRedrawTab();
        };


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.addEventHandler("onsize",this.form_onsize,this);
            this.staLogo.addEventHandler("onclick",this.staLogo_onclick,this);
            this.btnLogOut.addEventHandler("onclick",this.btnLogOut_onclick,this);
            this.divTopBtn.addEventHandler("onclick",this.div_Tab_onclick,this);
            this.btnPre.addEventHandler("onclick",this.btnPre_onclick,this);
            this.btnNex.addEventHandler("onclick",this.btnNex_onclick,this);
        };

        this.loadIncludeScript("frameTop.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
