//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2017 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro17-public-license-readme-1.0.html
//
//==============================================================================

if (nexacro._Browser == "Runtime") {
	nexacro.isDesignMode = false;
	nexacro._isEmbedded = true;






	nexacro._design_css_cache = new nexacro.Collection();
	nexacro._design_themeid_map = new nexacro.Collection();


	nexacro._getDesignCssContext = function (url) {
		if (!_application._css_context_cache) {
			return null;
		}

		var ar = _application._css_context_cache;
		var css_context = ar.get_item(url);

		return css_context;
	};

	nexacro._addDesignCssContext = function (context) {
		if (!_application._css_context_cache) {
			_application._css_context_cache = new nexacro.Collection();
		}


		var ar = _application._css_context_cache;
		ar.add_item(context._url, context);
	};

	nexacro._removeDesignCssContext = function (url) {
		if (!_application._css_context_cache) {
			return;
		}

		_application._css_context_cache.delete_item(url);
	};

	nexacro._updateDesignCssContext = function (cssurl) {
		nexacro._removeDesignCssContext(cssurl);

		_application._load_manager.localList = [];
		_application._load_manager.localCnt = 0;

		var css_context = new nexacro.DesignCssContext(cssurl);
		if (cssurl.indexOf(".xtheme") > 0) {
			nexacro._loadTheme2(cssurl, css_context);
		}


		nexacro._addDesignCssContext(css_context);
		return css_context;
	};



	nexacro._on_load_cssmodule2 = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri, extramsg) {
		var _load_manager = this;
		var load_Item = _load_manager.getLocalItem(url);
		if (load_Item) {
			var _handle = load_Item._handle;
			load_Item._handle = null;
			if (errstatus == 0 && module && typeof (module) == "function") {
				if (load_Item.type != "include") {
					var context = load_Item._context;
					if (!context) {
						context = _load_manager.context;
					}
					module.call(context);
				}
			}
			else {
				load_Item.errcode = errstatus;
				nexacro._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri, extramsg);
			}

			return;
		}
	};

	nexacro._loadTheme2 = function (themeid, context) {
		context._css_selectors = {
			_is_selector : true, 
			_has_items : false, 
			_has_attr_items : false
		};

		var curthemeid = themeid;
		var themename;
		var idx = curthemeid.indexOf(".xtheme");
		if (idx < 0) {
			themename = curthemeid;
		}
		else if (idx > 0) {
			themename = curthemeid.substring(0, idx);
		}

		var cssurl, base_url;
		if (themename) {
			var idx = themename.indexOf("::");
			if (idx > 0) {
				themename = themename.substring(idx + 2);
				nexacro._theme_uri = "./_theme_/" + themename;
			}
			else {
				nexacro._theme_uri = "./_theme_/" + themename;
			}



			cssurl = context._theme_uri + "/theme.css";

			cssurl = nexacro._getServiceLocation(cssurl, base_url);
			cssurl += ".js";



			var service = nexacro._getServiceObject(cssurl);
			var _load_manager = _application._load_manager;
			var load_item;
		}
	};

	nexacro._on_load_thememodule2 = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri, extramsg) {
		var _load_manager = this;
		var load_Item = _load_manager.getLocalItem(url);
		if (load_Item) {
			var _handle = load_Item._handle;
			load_Item._handle = null;
			if (errstatus == 0 && module && typeof (module) == "function") {
				if (load_Item.type != "include") {
					var context = load_Item._context;
					if (!context) {
						context = _load_manager.context;
					}
					module.call(context);
				}
			}
			else {
				load_Item.errcode = errstatus;
				nexacro._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri, extramsg);
			}

			return;
		}
	};
	nexacro.createAppAccessPortRuntime = function () {
		if (!_application.accessportruntime) {
			_application.accessportruntime = new nexacro.AppAccessPortRuntime(_application);
		}
	};
	nexacro.destroyAppAccessPortRuntime = function () {
		var app_ap = _application.accessportruntime;
		if (app_ap) {
			delete _application.accessportruntime;
			_application.accessportruntime = null;
		}
	};
	nexacro.closeApplication = function () {
		if (_application) {
			var mainframe = _application.mainframe;
			if (mainframe) {
				mainframe._destroy();
			}

			nexacro._applicationExit(true);
			delete _application;
			_application = null;
		}
	};
	nexacro.getAppAccessPortRuntime = function () {
		return _application.accessportruntime;
	};



	nexacro.AppAccessPortRuntime = function (target) {
		this.target = target;
		this._block_css_notify = false;
		this._refresh_css = false;
	};
	var _pAppAccessPortRuntime = nexacro._createPrototype(nexacro.Object, nexacro.AppAccessPortRuntime);
	nexacro.AppAccessPortRuntime.prototype = _pAppAccessPortRuntime;


	_pAppAccessPortRuntime.setInspectorHandle = function (handle) {
	};
	_pAppAccessPortRuntime.getObjectList = function (type) {
	};

	_pAppAccessPortRuntime.getObjectCount = function (type) {
	};

	_pAppAccessPortRuntime.getObjectByID = function (type, objid) {
	};

	_pAppAccessPortRuntime.getObjectByIndex = function (type, index) {
	};

	_pAppAccessPortRuntime.getVariant = function (varid) {
	};

	_pAppAccessPortRuntime.notifySelect = function (command, obj) {
	};


	_pAppAccessPortRuntime.addConstColumn = function (datasetid, columnid, type, size, value) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds._addConstColumn(columnid, nexacro._decodeXml(value), type);
		}
	};

	_pAppAccessPortRuntime.insertConstColumn = function (datasetid, index, columnid, type, size, value) {
	};

	_pAppAccessPortRuntime.deleteConstColumn = function (datasetid, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
				ds._constVars.delete_item(id);
			}
		}
	};

	_pAppAccessPortRuntime.setConstColumnProperty = function (datasetid, col, propid, propval) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
			}
		}
	};

	_pAppAccessPortRuntime.getConstColumnProperty = function (datasetid, col, propid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
				if (constVar[propid]) {
					return constVar[propid];
				}
			}
		}
	};

	_pAppAccessPortRuntime.addColumn = function (datasetid, columnid, type, size, prop, sumtext) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds._addColumn(columnid, type, size, prop, sumtext);
		}
	};

	_pAppAccessPortRuntime.insertColumn = function (datasetid, idx, id, strtype, size, prop, text) {
		var ds = this._getObject(datasetid);
		if (!ds || !(ds instanceof nexacro.Dataset)) {
			return;
		}

		if ((id in ds.colinfos) || (id in ds._constVars)) {
			return -1;
		}

		var type;
		if (strtype == undefined) {
			type = 1;
			strtype = "STRING";
		}
		else {
			type = nexacro.DataUtils._typeint[strtype.toLowerCase()];
		}

		if (type == null) {
			type = 1;
		}
		if ((+size) != (+size)) {
			size = 256;
		}

		var len = ds.colinfos.length;
		for (var i = idx; i < len; i++) {
			var colinfo = ds.colinfos[i];
			colinfo._index++;
		}

		var newcolinfo = new nexacro.DSColumnInfo(id, strtype, type, size, prop, text, idx);
		ds.colcount++;
		return ds.colinfos.insert_item(idx, id, newcolinfo);
	};

	_pAppAccessPortRuntime.deleteColumn = function (datasetid, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.deleteColumn(columnid);
		}
	};

	_pAppAccessPortRuntime.setColumnProperty = function (datasetid, col, propid, propval) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var colinfo = ds.getColumnInfo(col);
			if (colinfo) {
				if (propid == "id") {
					if (ds.getColumnInfo(propval)) {
						return false;
					}


					var idx = ds.colinfos._idxMap[colinfo.id];
					ds.colinfos.update_id(idx, propval);
				}
				else if (propid == "type") {
					colinfo[propid] = propval;

					nexacro.DSColumnInfo.call(colinfo, colinfo.id, colinfo.type, colinfo.ntype, colinfo.size, colinfo.prop, colinfo.sumtext, colinfo._index);
				}
				else {
					colinfo[propid] = propval;
				}
			}
		}
	};

	_pAppAccessPortRuntime.getColumnProperty = function (datasetid, col, propid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var colinfo = ds.getColumnInfo(col);
			if (colinfo) {
				if (colinfo[propid]) {
					return colinfo[propid];
				}
			}
		}
	};

	_pAppAccessPortRuntime.addRow = function (datasetid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.addRow();
		}
	};

	_pAppAccessPortRuntime.insertRow = function (datasetid, index) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.insertRow(index);
		}
	};

	_pAppAccessPortRuntime.deleteRow = function (datasetid, row) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.deleteRow(row);
		}
	};

	_pAppAccessPortRuntime.setColumn = function (datasetid, row, col, value) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			return ds.setColumn(row, col, value);
		}

		return false;
	};

	_pAppAccessPortRuntime.getColumn = function (datasetid, row, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			return ds.getColumn(row, col);
		}

		return false;
	};

	_pAppAccessPortRuntime.createObject = function (classname, objid) {
		if (!objid || objid.length == 0) {
			objid = this._getNextChildID(this, classname);
		}

		var classnameobj = eval(classname);
		if (classnameobj) {
			var obj = new classnameobj(objid, _application);
			if (obj instanceof nexacro.Dataset) {
				_application._addDataset(obj.name, obj);
			}

			else {
				_application._addObject(obj.name, obj);
			}

			return obj.name;
		}
	};

	_pAppAccessPortRuntime.deleteObject = function (objid) {
		if (_application._datasets[objid]) {
			var idx = _application._datasets.indexOf(objid);
			_application._datasets.splice(idx, 1);

			delete _application[objid];
			_application.all.delete_item(objid);
		}
		else {
			delete _application[objid];
			_application.all.delete_item(objid);
		}
	};
	_pAppAccessPortRuntime.getProperty = function (objid, propid, pseudo) {
		var obj = this._getObject(objid);
		if (obj) {
			return nexacro._getProperty(obj, propid, pseudo);
		}
		else {
			trace("_pAppAccessPortRuntime.getProperty( " + objid + ", " + propid + ", " + pseudo + " )");
			trace("> obj is null!");
		}
	};
	_pAppAccessPortRuntime.setProperty = function (objid, propid, propval, pseudo) {
		var obj = this._getObject(objid);
		if (obj) {
			if (propid == "name") {
				var parent_obj = obj.parent;
				var old_id = obj.name;
				var new_id = propval;

				if (parent_obj === null) {
					return;
				}

				var idx = parent_obj.all.indexOf(old_id);
				if (idx < 0) {
					return;
				}
				parent_obj.all.update_id(idx, new_id);

				idx = parent_obj._frames.indexOf(old_id);
				if (idx < 0) {
					return;
				}
				parent_obj._frames.update_id(idx, new_id);

				delete parent_obj[old_id];
				parent_obj[new_id] = obj;

				obj.set_id(new_id);
				obj.name = new_id;

				return obj[propid];
			}

			var ret = nexacro._setProperty(obj, propid, propval, pseudo);
			if (ret === true) {
				return obj[propid];
			}
			else if (ret === null) {
				return;
			}
		}
	};
	_pAppAccessPortRuntime._getObject = function (objid) {
		if (!objid || objid == "this" || objid == "application" || objid == "_application") {
			return _application;
		}


		var obj = eval("_application." + objid);
		if (obj) {
			return obj;
		}

		return _application.all.get_item(objid);
	};

	_pAppAccessPortRuntime._getNextChildID = function (parent, classname) {
		if (!parent || !classname) {
			trace("parent or classname is missing");
			return "error";
		}

		var nextnum = 0;
		var nextid;
		while (true) {
			nextid = classname + ((nextnum < 10) ? "0" : "") + nextnum;
			if (!parent[nextid]) {
				break;
			}
			nextnum++;
		}

		return nextid;
	};

	_pAppAccessPortRuntime.setCssList = function (csslist) {
		trace("_pAppAccessPortRuntime.setCssList( " + csslist + " )");

		this._clearStyles();


		_application._css_context_list = [];
		_application._find_csslist = [];

		_application._load_manager.localList = [];
		_application._load_manager.localCnt = 0;

		for (var i = 0; i < csslist.length; i++) {
			var cssurl = csslist[i];
			var css_context = nexacro._getDesignCssContext(cssurl);
			if (!css_context) {
				trace("> Not Cached: " + cssurl);
				css_context = new nexacro.DesignCssContext(cssurl);
				if (cssurl.indexOf(".xtheme") > 0) {
					nexacro._loadTheme2(cssurl, css_context);
				}
				else {
					nexacro._loadCss2(cssurl, css_context);
				}

				nexacro._addDesignCssContext(css_context);
			}
			else {
				trace("> Cached: " + cssurl);
			}

			_application._css_context_list.push(css_context);
			_application._find_csslist.unshift(css_context._css_selectors);
		}

		this._refreshStyles();
	};

	_pAppAccessPortRuntime._clearStyles = function (comp) {
		if (comp === undefined) {
			comp = _application.mainframe;
		}
		else if (comp === null) {
			return;
		}

		trace("ClearStyle: " + comp.name);

		if (comp instanceof nexacro.MainFrame) {
			_application._find_csslist = null;
			_application._cssfinder_cache = {
			};

			comp._find_csslist = null;
			comp._css_finder = null;
			comp._cssfinder_cache = {
			};

			this._clearStyles(comp.frame);
		}
		else if (comp instanceof nexacro.FrameSet) {
			comp._find_csslist = null;
			comp._css_finder = null;
			comp._cssfinder_cache = {
			};

			var len = comp.frames.length;
			for (var i = 0; i < len; i++) {
				this._clearStyles(comp.frames[i]);
			}
		}

		comp.currentstyle = comp.on_create_custom_currentStyle();

		comp._css_finder = null;
		comp._ref_css_finder = null;
	};

	_pAppAccessPortRuntime._refreshStyles = function (comp) {
		if (comp === undefined) {
			comp = _application.mainframe;
		}
		else if (comp === null) {
			return;
		}

		if (comp instanceof nexacro.MainFrame) {
			this._refreshStyles(comp.frame);
		}
		else if (comp instanceof nexacro.FrameSet) {
			var len = comp.frames.length;
			for (var i = 0; i < len; i++) {
				this._refreshStyles(comp.frames[i]);
			}
		}
	};
	_pAppAccessPortRuntime.setActiveObject = function (comp) {
		if (!comp._css_context_list || comp._css_context_list.length <= 0) {
			return;
		}

		var _item = comp._css_context_list[0];
		if (_item instanceof nexacro.DesignCssContext) {
			if (_item._theme_uri !== undefined) {
				nexacro._theme_uri = _item._theme_uri;
			}
		}
	};
	_pAppAccessPortRuntime._getSubControlList = function (comp) {
		var list = [];

		for (var p in comp) {
			if (typeof (comp[p]) == "object" && comp[p] instanceof nexacro.Component) {
				var control = comp[p];
				if (comp == control) {
					continue;
				}
				if (control.parent != comp) {
					continue;
				}
				if (control._is_subcontrol) {
					list.push(control);
				}
			}
		}

		return list;
	};
	_pAppAccessPortRuntime._clearObjectStyles = function (comp) {
		if (comp === undefined) {
			return;
		}
		else if (comp === null) {
			return;
		}
		if (comp instanceof nexacro.FormBase) {
			comp._find_csslist = null;
			comp._css_finder = null;
			comp._cssfinder_cache = {
			};

			var len = (comp.components) ? comp.components.length : 0;
			for (var i = 0; i < len; i++) {
				this._clearObjectStyles(comp.components[i]);
			}
		}

		comp.currentstyle = comp.on_create_custom_currentStyle();

		comp._css_finder = null;
		comp._ref_css_finder = null;
		var subcontrols = this._getSubControlList(comp);
		var len = subcontrols.length;
		for (var i = 0; i < len; i++) {
			var control = subcontrols[i];
			this._clearObjectStyles(control);
		}
	};
	_pAppAccessPortRuntime._refreshObjectStyles = function (comp) {
		if (comp === undefined) {
			comp = this;
		}
		else if (comp === null) {
			return;
		}

		if (comp instanceof nexacro.FormBase) {
			var len = comp.components.length;
			for (var i = 0; i < len; i++) {
				this._refreshObjectStyles(comp.components[i]);
			}
		}

		var subcontrols = this._getSubControlList(comp);
		var len = subcontrols.length;
		for (var i = 0; i < len; i++) {
			var control = subcontrols[i];
			this._refreshObjectStyles(control);
		}
	};

	_pAppAccessPortRuntime._changedObjectStyles = function (target) {
		this.drawWindow(target);

		var win = target._getWindow();
		if (win && win._handle) {
		}
	};
	_pAppAccessPortRuntime.drawWindow = function (target) {
		var win = target._getWindow();
		if (win && win._handle) {
			nexacro.__refreshDirtyRectWithCallBack(win._handle);
		}
	};

	_pAppAccessPortRuntime.setObjectCssList2 = function (csslist, target) {
		alert("test!!!");
	};
	_pAppAccessPortRuntime.setObjectCssList = function (csslist, target) {
		trace(">> setObjectCssList target : " + target);
		if (target) {
			this._clearObjectStyles(target);
			target._css_context_list = [];
			target._find_csslist = [];

			_application._load_manager.localList = [];
			_application._load_manager.localCnt = 0;

			for (var i = 0; i < csslist.length; i++) {
				var cssurl = csslist[i];

				trace(">> setObjectCssList cssurl : " + cssurl);

				var css_context = nexacro._getDesignCssContext(cssurl);
				if (!css_context) {
					trace("> Not Cached: " + cssurl);
					css_context = new nexacro.DesignCssContext(cssurl);
					if (cssurl.indexOf(".xtheme") > 0) {
						nexacro._loadTheme2(cssurl, css_context);
					}
					else {
						nexacro._loadCss2(cssurl, css_context);
					}

					nexacro._addDesignCssContext(css_context);
				}
				else {
					trace("> Cached: " + cssurl);
				}

				target._css_context_list.push(css_context);
				target._find_csslist.unshift(css_context._css_selectors);
			}

			var cur_theme_uri = nexacro._theme_uri;


			this.setActiveObject(target);

			this._refreshObjectStyles(target);
			this._changedObjectStyles(target);
		}
	};
	_pAppAccessPortRuntime._loadTheme = nexacro._emptyFn;
	_pAppAccessPortRuntime._loadCss = nexacro._emptyFn;
	_pAppAccessPortRuntime._on_load_thememodule = nexacro._emptyFn;
	_pAppAccessPortRuntime._on_load_cssmodule = nexacro._emptyFn;


	_pAppAccessPortRuntime.updateCSS = function (url) {
		var updated_context = nexacro._updateDesignCssContext(url);
	};


	_pAppAccessPortRuntime.initPopupWindow = function (id, showtitlebar, showstatusbar, dragmode, x, y, width, height, formurl) {
		trace(">>> EmbedRuntimeAPI > initPopupWindow");

		try {
			var objFrame = new ChildFrame();
			objFrame.init(id, x, y, width, height, null, null, null);

			objFrame.set_autosize("false");
			objFrame.set_showtitlebar(showtitlebar);
			objFrame.set_showstatusbar(showstatusbar);
			objFrame.set_dragmovetype(dragmode);
			objFrame.set_formurl(formurl);

			var ret = _application.mainframe.addChild(id, objFrame);
			if (ret == -1) {
				return false;
			}


			this.frame = objFrame;
		}
		catch (e) {
			if (e.obj) {
				nexacro._onSystemError(e.obj, e.name, e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);

				var environment = nexacro.getEnvironment();
				if (environment) {
					nexacro._onSystemError(environment, e.name, msg);
				}
			}
		}
	};

	_pAppAccessPortRuntime.showPopupWindow = function (id) {
		trace(">>> EmbedRuntimeAPI > showPopupWindow");

		var obj = this._getObject("mainframe." + id);
		if (obj) {
			obj.showModeless(null);
		}
		else {
			trace(">>> EmbedRuntimeAPI > showPopupWindow : obj is null");
		}
	};

	_pAppAccessPortRuntime.hidePopupWindow = function (id) {
		trace(">>> EmbedRuntimeAPI > hidePopupWindow");

		var obj = this._getObject("mainframe." + id);
		if (obj) {
			obj.hideModeless();
		}
		else {
			trace(">>> EmbedRuntimeAPI > hidePopupWindow : obj is null");
		}
	};

	_pAppAccessPortRuntime.destroyPopupWindow = function (id) {
		trace(">>> EmbedRuntimeAPI > destroyPopupWindow");

		var obj = this._getObject("mainframe." + id);
		if (obj) {
			trace(">>> EmbedRuntimeAPI > destroyPopupWindow 1");

			var objChild = _application.mainframe.removeChild(id);

			trace(">>> EmbedRuntimeAPI > destroyPopupWindow 2");

			if (objChild) {
				objChild.destroy();
			}

			trace(">>> EmbedRuntimeAPI > destroyPopupWindow 3");
		}
		else {
			trace(">>> EmbedRuntimeAPI > destroyPopupWindow : obj is null");
		}
	};

	_pAppAccessPortRuntime.resizePopupWindow = function (id, x, y, width, height) {
		trace(">>> EmbedRuntimeAPI > resizePopupWindow");

		var obj = this._getObject("mainframe." + id);
		if (obj) {
			var objForm = obj.getForm();
			if (objForm) {
				trace(">>> EmbedRuntimeAPI > resizePopupWindow id : " + objForm.name + ", x : " + x + ", y : " + y + ", width : " + width + ", height : " + height);
				objForm.move(x, y, width, height);
			}
		}
		else {
			trace(">>> EmbedRuntimeAPI > resizePopupWindow : obj is null");
		}
	};

	_pAppAccessPortRuntime.reloadPopupWindow = function (id) {
		trace(">>> EmbedRuntimeAPI > reloadPopupWindow");

		var obj = this._getObject("mainframe." + id);
		if (obj) {
			var objForm = obj.getForm();
			if (objForm) {
				this._reloadForm(objForm);
			}
		}
		else {
			trace(">>> EmbedRuntimeAPI > reloadPopupWindow : obj is null");
		}
	};

	_pAppAccessPortRuntime.changePopupWindowURL = function (id, url, x, y, width, height) {
		trace(">>> EmbedRuntimeAPI > changePopupWindowURL");

		var obj = this._getObject("mainframe." + id);
		if (obj) {
			obj.set_formurl(url);
			trace(">>> EmbedRuntimeAPI > changePopupWindowURL url : " + url + ", layout_count : " + obj._layout_list.length);

			if (width > 0 && height > 0) {
				this.resizePopupWindow(id, x, y, width, height);
			}

			var objForm = obj.getForm();
			trace(">>> EmbedRuntimeAPI > changePopupWindowURL layout_count : " + objForm._layout_list.length);
		}
		else {
			trace(">>> EmbedRuntimeAPI > changePopupWindowURL : obj is null");
		}
	};

	_pAppAccessPortRuntime.changePopupWindowTheme = function (id, themeID) {
		trace(">>> EmbedRuntimeAPI > changePopupWindowTheme");

		var obj = this._getObject("mainframe." + id);
		if (obj) {
			var objForm = obj.getForm();
			if (objForm) {
				var _items = new Array();
				_items.push(themeid);

				this.setObjectCssList(_items, objForm);

				var len = (objForm.components) ? objForm.components.length : 0;
				for (var i = 0; i < len; i++) {
					var control = objForm.components[i];
					if (control instanceof nexacro.FormBase) {
						this.setObjectCssList(_items, control);
					}
				}

				objForm.set_visible(true);
			}
		}
		else {
			trace(">>> EmbedRuntimeAPI > changePopupWindowTheme : obj is null");
		}
	};

	_pAppAccessPortRuntime.changePopupWindowLayout = function (id, layoutID) {
		trace(">>> EmbedRuntimeAPI > changePopupWindowLayout");

		var obj = this._getObject("mainframe." + id);
		if (obj) {
			var objForm = obj.getForm();
			if (objForm) {
				trace(">>> EmbedRuntimeAPI > changePopupWindowURL layoutID : " + layoutID);

				var layout = this._getLayout(objForm, layoutID);
				if (!layout) {
					trace(">>> EmbedRuntimeAPI > changePopupWindowURL : layout is null");
					this._changeLayout(objForm, layoutID);
					return false;
				}

				var layout_manager = nexacro._getLayoutManager();
				layout_manager.changeLayout(objForm, layout);
			}
		}
		else {
			trace(">>> EmbedRuntimeAPI > changePopupWindowURL : obj is null");
		}
	};



	var nFormWidth = 0;
	var nFormHeight = 0;
	_pAppAccessPortRuntime.FitSizeApp = function (nWidth, nHeight) {
		trace(">>> EmbedRuntimeAPI > FitApp. width : " + nWidth + ", height : " + nHeight);
		nWidth -= 6;
		nHeight -= 6;

		var objMainFrame = this._getObject("mainframe");
		if (objMainFrame) {
			var nCount = objMainFrame.all.length;
			for (var i = 0; i < nCount; i++) {
				var childFrame = objMainFrame.all.get_item(i);

				var showMaintitle = objMainFrame.showtitlebar;
				var showMainstatus = objMainFrame.showstatusbar;
				var showFrametitle = childFrame.showtitlebar;
				var showFramestatus = childFrame.showstatusbar;

				var nChildFrameWidth = nWidth;
				var nChildFrameHeight = nHeight;
				if (showMaintitle == true) {
					objMainFrame.set_showtitlebar(false);
				}
				if (showMainstatus == true) {
					objMainFrame.set_showstatusbar(false);
				}
				nChildFrameWidth = nChildFrameWidth - 4;

				var objForm = childFrame.getForm();
				if (objForm) {
					if (nFormWidth == 0) {
						nFormWidth = objForm.width;
					}
					if (nFormHeight == 0) {
						nFormHeight = objForm.height;
					}

					var nPreviewFormWidth = nChildFrameWidth;
					var nPreviewFormHeight = nChildFrameHeight;
					if (showFrametitle == true) {
						nPreviewFormHeight = nPreviewFormHeight - 24;
					}
					if (showFramestatus == true) {
						nPreviewFormHeight = nPreviewFormHeight - 26;
					}

					var fZoomW = 100 / (nFormWidth / nPreviewFormWidth);
					var fZoomH = 100 / (nFormHeight / nPreviewFormHeight);
					var fZoomFactor = (fZoomW > fZoomH ? fZoomH : fZoomW);


					objForm._setZoom(parseInt(fZoomFactor) - 1);

					objForm.move(0, 0, nPreviewFormWidth - 4, nPreviewFormHeight);
				}

				childFrame.move(0, 0, nChildFrameWidth, nChildFrameHeight);
			}

			objMainFrame.set_width(nWidth);
			objMainFrame.set_height(nHeight);
		}
		else {
			trace(">>> EmbedRuntimeAPI > FitApp : obj is null");
		}
	};

	_pAppAccessPortRuntime.zoomApp = function (nzoom) {
		trace(">>> EmbedRuntimeAPI > zoomApp");

		var objMainFrame = this._getObject("mainframe");
		if (objMainFrame) {
			var nCount = objMainFrame.all.length;
			for (var i = 0; i < nCount; i++) {
				var childFrame = objMainFrame.all.get_item(i);

				var objForm = childFrame.getForm();
				if (objForm) {
					var nChildFrameWidth = childFrame.width;
					var nChildFrameHeight = childFrame.height;
					var nFormWidth = objForm.width;
					var nFormHeight = objForm.height;

					var fZoomW = 100 / (nFormWidth / nChildFrameWidth);
					var fZoomH = 100 / (nFormHeight / nChildFrameHeight);
					var fZoomFactor = (fZoomW > fZoomH ? fZoomW : fZoomH);


					objForm._setZoom(parseInt(fZoomFactor));
				}
			}
		}
		else {
			trace(">>> EmbedRuntimeAPI > zoomApp : obj is null");
		}
	};

	_pAppAccessPortRuntime._getObject = function (objid) {
		if (!objid || objid == "this" || objid == "application" || objid == "_application") {
			return _application;
		}

		var obj = eval("_application." + objid);
		if (obj) {
			return obj;
		}

		return _application.all.get_item(objid);
	};

	_pAppAccessPortRuntime._reloadForm = function (form) {
		trace(">>> EmbedRuntimeAPI > _reloadForm");

		var objForm = form;

		var _win = objForm._getRootWindow();
		_win._removeFromCurrentFocusPath(objForm._last_focused, true);

		var _win = objForm._getWindow();
		_win.clearCurrentFocusPaths();

		objForm._last_focused = null;


		objForm._url = objForm.parent._formurl;
		objForm._base_url = nexacro._getBaseUrl(objForm._url);

		objForm._apply_formurl();
	};

	_pAppAccessPortRuntime._changeLayout = function (objForm, layoutID) {
		trace(">>> EmbedRuntimeAPI > _changeLayout");

		if (objForm && objForm.components) {
			var len = objForm.components.length;

			for (var i = 0; i < len; i++) {
				var control = objForm.components[i];
				if (control != undefined && control != null) {
					if (control instanceof nexacro.FormBase) {
						var layout = this._getLayout(control, layoutID);
						if (!layout) {
							return false;
						}

						var layout_manager = nexacro._getLayoutManager();
						layout_manager.changeLayout(control, layout);
					}
				}
			}
		}
	};




	_pAppAccessPortRuntime._searchLayout = function (objForm, screenInfo, width, height) {
		trace(">>> EmbedRuntimeAPI > _searchLayout");

		var layoutname;

		if (!screenInfo) {
			return;
		}

		var layout_count = objForm._layout_list.length;
		if (layout_count <= 0) {
			return;
		}

		trace(">>> EmbedRuntimeAPI > _searchLayout layout_count : " + layout_count);

		var gapWidth = 0;
		for (var i = 0; i < layout_count; i++) {
			var layoutinfo = objForm._layout_list[i];
			if (!layoutinfo) {
				continue;
			}

			trace(">>> EmbedRuntimeAPI > _searchLayout layoutinfo.screenid.length : " + layoutinfo.screenid.length + ", layoutinfo.screenid : " + layoutinfo.screenid);

			trace(">>> EmbedRuntimeAPI > _searchLayout screenInfo : " + screenInfo + ", screenInfo.name : " + screenInfo.name + ", screenInfo.id : " + screenInfo.id);


			if (layoutinfo.screenid.length > 0) {
				var layout_screenid_list = layoutinfo.screenid.split(",");
				if (layout_screenid_list.indexOf(screenInfo.name) >= 0) {
					var gap = layoutinfo.width - width;
					if (layoutinfo.width >= width && gap > 0 && gap < gapWidth) {
						gapWidth = gap;
						layoutname = layoutinfo.name;
					}
				}
			}
			else {
				var gap = layoutinfo.width - width;
				if (layoutinfo.width >= width && gap > 0 && gap < gapWidth) {
					gapWidth = gap;
					layoutname = layoutinfo.name;
				}
			}
		}

		trace(">>> EmbedRuntimeAPI > _searchLayout layoutname : " + layoutname);
		return layoutname;
	};

	_pAppAccessPortRuntime._searchScrInfo = function (width, height, devicetype, ostype, orientation) {
		trace(">>> EmbedRuntimeAPI > _searchScrInfo : " + _application._screeninfo);
		trace(">>> EmbedRuntimeAPI > _searchScrInfo width : " + width + ", height : " + height + ", devicetype : " + devicetype + ", ostype : " + ostype + ", orientation : " + orientation);

		if (!_application._screeninfo) {
			return null;
		}

		var scr_info_list = _application._screeninfo;
		var scr_len = scr_info_list.length;

		var matched_scrinfo = null;

		var cur_type = devicetype;
		var cur_os = ostype;
		var cur_width = width;
		var cur_height = height;
		var is_landscape = false;

		if ((cur_width > cur_height) || orientation == "landscape") {
			is_landscape = true;
		}

		trace(">>> EmbedRuntimeAPI > _searchScrInfo scr_len : " + scr_len);

		for (var i = 0; i < scr_len; i++) {
			var scr_info = scr_info_list[i];
			scr_info._priority = 0;

			var type = scr_info.type;

			trace(">>> EmbedRuntimeAPI > _searchScrInfo cur_type : " + cur_type + ", type : " + type + ", name : " + scr_info.name);
			if (cur_type && type) {
				scr_info._priority = -100;

				var type_list = type.toLowerCase().split(",");
				var type_cnt = type_list.length;
				var type_found = false;
				for (var j = 0; j < type_cnt; j++) {
					if (type_list[j] === cur_type) {
						scr_info._priority = 100;
						type_found = true;
						break;
					}
				}

				if (!type_found) {
					continue;
				}
			}

			trace(">>> EmbedRuntimeAPI > _searchScrInfo type_found : " + type_found + ", cur_type : " + cur_type + ", scr_info._priority : " + scr_info._priority);





			width = scr_info.screenwidth || 0;
			height = scr_info.screenheight || 0;
			var sizeorientation = scr_info.sizeorientation;
			if (sizeorientation === undefined) {
				if (cur_type == "phone") {
					sizeorientation = "portrait";
				}
				else if (cur_type == "tablet") {
					sizeorientation = "landscape";
				}
			}

			scr_info._device_width = cur_width;
			scr_info._width = cur_width - parseInt(width);
			scr_info._height = cur_height - parseInt(height);

			trace(">>> EmbedRuntimeAPI > _searchScrInfo1 scr_info.type : " + scr_info.type + ", scr_info.name : " + scr_info.name + ", scr_info._priority : " + scr_info._priority);

			if (scr_info._priority >= 0) {
				if (!matched_scrinfo) {
					matched_scrinfo = scr_info;
				}
				else {
					trace(">>> EmbedRuntimeAPI > _searchScrInfo3 : why 'matched_scrinfo' is not null??? ");
				}
			}
		}

		trace(">>> EmbedRuntimeAPI > _searchScrInfo2 name : " + scr_info.name + ", cur_type : " + cur_type + ", scr_info._priority : " + scr_info._priority);


		if (matched_scrinfo) {
			matched_scrinfo._cur_type = cur_type;
		}

		trace(">>> EmbedRuntimeAPI > _searchScrInfo matched_scrinfo._cur_type : " + matched_scrinfo._cur_type + ", matched_scrinfo.name : " + matched_scrinfo.name);

		return matched_scrinfo;
	};

	_pAppAccessPortRuntime._getLayout = function (objForm, layoutname) {
		if (objForm) {
			if (!layoutname || layoutname == "" || layoutname == "default") {
				return objForm._default_layout;
			}
			else {
				return objForm._layout_list[layoutname];
			}
		}
		else {
			trace(">>> EmbedRuntimeAPI > _getLayout : objForm is null");
		}
	};


	delete _pAppAccessPortRuntime;

	if (!nexacro.DesignCssContext) {
		nexacro.DesignCssContext = function (url) {
			this._url = url;
			this._css_selectors = {
				_has_items : false, 
				_has_attr_items : false
			};
		};

		var _pDesignCssContext = nexacro._createPrototype(nexacro.Object, nexacro.DesignCssContext);
		nexacro.DesignCssContext.prototype = _pDesignCssContext;


		delete _pDesignCssContext;
	}

	if (nexacro.MainFrame) {
		var _pMainFrame = nexacro.MainFrame.prototype;

		_pMainFrame._canDragResize = function () {
			return false;
		};
		_pMainFrame._disable_close_button = function () {
			var titlebar = this.titlebar;
			if (titlebar) {
				titlebar._setNotifyHandler(this, this._on_minbutton_click, this._on_maxbutton_click, this._on_normalbutton_click, this._on_closebutton_click, this._on_titlebar_dblclick);
				titlebar._unBindEvent();
				titlebar._bindEvent();
			}
		};

		_pMainFrame._on_closebutton_click = function (obj, e) {
			return;
		};

		_pFrame._procSysCommand2 = function (systemcommand) {
			if (this.resizable == false) {
				return;
			}


			var statevalue = -1;
			switch (systemcommand) {
				case "restore":
					statevalue = 1;
					break;
				case "minimize":
					statevalue = 2;
					break;
				case "maximize":
					statevalue = 3;
					break;
			}

			if (statevalue == 1) {
				if (this._is_window && this._window && this._state_openstatus == 2) {
					systemcommand = ["normal", "restore", "minimize", "maximize"][this._prestate_openstatus];
					statevalue = this._prestate_openstatus;
				}
				else {
					systemcommand = "normal";
					statevalue = 0;
				}
			}

			if (statevalue != (-1)) {
				this.openstatus = systemcommand;
				this._changeOpenStatus(statevalue);
			}
		};

		delete _pMainFrame;
	}


	if (nexacro.ChildFrame) {
		var _pChildFrame = nexacro.ChildFrame.prototype;

		_pChildFrame.showEmbedWindow = function (_parent_handle) {
			var id = this.id;
			var child_frame = this;

			child_frame._is_window = true;
			child_frame._window_type = 2;

			var left = child_frame._adjust_left;
			var top = child_frame._adjust_top;
			var width = child_frame._adjust_width;
			var height = child_frame._adjust_height;

			var is_form_loaded = false;
			if (this.autosize && this.form && !this.form._is_loading) {
				var calculated_size = this._getAutosizedFrameSize(nexacro._Browser == "Runtime");
				this.width = width = calculated_size.width;
				this.height = height = calculated_size.height;

				is_form_loaded = true;
			}

			if (!is_form_loaded) {
				var after_align_pos = child_frame._getOpenAlignPos(child_frame._window, left, top, width, height);
				if (after_align_pos) {
					left = after_align_pos.left;
					top = after_align_pos.top;
				}
			}

			this.opener = null;
			if (this.form) {
				this.form.opener = this.opener;
			}

			this.accessibilityrole = "dialog";


			var parent_window = new nexacro._Window(this.name, null, false);
			parent_window.handle = _parent_handle;

			if (!this.autosize || is_form_loaded) {
				this._window = new nexacro._Window(this.name, parent_window, false);
				this._window.attachFrame(this, false);
				this._window.create(parent_window, this.id, width, height, left, top, this.resizable, this.layered, this.showontaskbar);
				if (this._is_created) {
					this._control_element.parent_elem = null;
				}
			}
			else {
				this._delayed_create_window = true;
				this._delayed_create_parent = parent_window;
			}

			return true;
		};

		_pChildFrame._getWaitComponentElement = function () {
			var waitComp = this._waitcomp;
			if (waitComp) {
				return waitComp.getElement();
			}
			return null;
		};
	}

	if (nexacro.Component) {
		var _pComponent = nexacro.Component.prototype;
		_pComponent._isVisible = function () {
			var form = this;
			while (form != null) {
				if (form instanceof nexacro.MainFrame) {
					break;
				}

				if (form.visible == false) {
					return false;
				}

				form = form.parent;
			}
			return true;
		};
	}
}
