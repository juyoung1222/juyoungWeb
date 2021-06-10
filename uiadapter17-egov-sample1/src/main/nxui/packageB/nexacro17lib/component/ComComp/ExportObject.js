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

if (!nexacro.ExcelExportObject) {
	nexacro.ExcelExportProgressEventInfo = function (obj, id, itemindex, itemtype, recordindex, errorobj) {
		this.id = this.eventid = id || "onprogress";
		this.fromobject = obj;
		this.fromreferenceobject = errorobj;

		this.itemindex = itemindex;
		this.itemtype = itemtype;
		this.recordindex = recordindex;
	};
	var _pExportEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ExcelExportProgressEventInfo);
	nexacro.ExcelExportProgressEventInfo.prototype = _pExportEventInfo;
	_pExportEventInfo._type_name = "ExcelExportProgressEventInfo";

	delete _pExportEventInfo;

	nexacro.ExcelExportEventInfo = function (obj, id, url, errorobj) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = obj;
		this.fromreferenceobject = errorobj;

		this.url = url;
	};
	var _pExcelExportEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ExcelExportEventInfo);
	nexacro.ExcelExportEventInfo.prototype = _pExcelExportEventInfo;
	_pExcelExportEventInfo._type_name = "ExcelExportEventInfo";

	delete _pExcelExportEventInfo;


	nexacro.ExcelExportErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode) {
		this.id = this.eventid = id || "onerror";
		this.fromobject = obj;
		this.fromreferenceobject = errorobj;

		this.errortype = errortype;
		this.errormsg = errormsg;
		this.statuscode = statuscode;
	};
	var _pExportErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.ExcelExportErrorEventInfo);
	nexacro.ExcelExportErrorEventInfo.prototype = _pExportErrorEventInfo;
	_pExportErrorEventInfo._type_name = "ExcelExportErrorEventInfo";

	delete _pExportErrorEventInfo;


	nexacro.ExcelExportObject = function (name, parent) {
		this.id = this.name = name;

		if (!parent) {
			var app = nexacro.getApplication();
			if (app) {
				parent = app.getActiveForm();
				if (!parent) {
					var currwin = app.mainframe._window;
					var cur_focus_paths = currwin.getCurrentFocusPaths();
					var cur_focus_paths_len = (cur_focus_paths ? cur_focus_paths.length : 0);
					for (var i = 0; i < cur_focus_paths_len; i++) {
						var _comp = cur_focus_paths[i];
						if (!_comp) {
							continue;
						}
						if (_comp._is_form) {
							parent = _comp;
							break;
						}
					}
				}
			}
		}
		this.parent = parent;
		this._grids = [];
		this._dataset = [];
		this._xml = [];

		this.onsuccess = new nexacro.EventListener("onsuccess");
		this.onprogress = new nexacro.EventListener("onprogress");
		this.onerror = new nexacro.EventListener("onerror");
		this._hidden_frame_handle = null;
		nexacro._create_filedownload_handle(nexacro._emptyFn, this);
	};

	var _pExcelExport = nexacro.ExcelExportObject.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.ExcelExportObject);
	_pExcelExport._type_name = "ExportObject";

	_pExcelExport.activepagename = "";
	_pExcelExport.exportactivemode = "active";
	_pExcelExport.exporteventtype = "itemrecord";
	_pExcelExport.exportfilename = "";

	_pExcelExport.exportmessagealert = "";
	_pExcelExport.exportmessagecomplete = "";
	_pExcelExport.exportmessageprocess = "";
	_pExcelExport.exportmessageready = "";

	_pExcelExport.exportopenmode = "noopen";

	_pExcelExport._exporttype = nexacro.ExportTypes.EXCEL;
	_pExcelExport.exporttype = nexacro.ExportTypes.EXCEL;
	_pExcelExport.exportuitype = "none";

	_pExcelExport.templatefilename = "";
	_pExcelExport.commdataformat = "";

	_pExcelExport.commcompress = "none";
	_pExcelExport.exporturl = "";

	_pExcelExport._exportuitype = 0;
	_pExcelExport._exporturl = "";
	_pExcelExport._commcompress = false;
	_pExcelExport._commdataformat = 2;

	_pExcelExport._allRowCount = 0;
	_pExcelExport._progress_pos = 0;
	_pExcelExport._uniqueIndex = 0;
	_pExcelExport._fileURL = "";
	_pExcelExport._itemsIndex = 0;

	_pExcelExport._argsParam = null;
	_pExcelExport._argsDsParam = null;
	_pExcelExport._is_orgval = false;
	_pExcelExport._file_password = null;

	_pExcelExport._exportBar = null;
	_pExcelExport._tempSaveMethod = null;

	_pExcelExport.excelTypeTable = 
		{
		EXCEL : 0x0100, 
		EXCEL97 : 0x0110, 
		EXCEL2007 : 0x0120, 
		HANCELL2010 : 0x0400, 
		HANCELL2014 : 0x0410, 
		CSV : 0x0500, 
		256 : 0x0100, 
		272 : 0x0110, 
		288 : 0x0120, 
		1024 : 0x0400, 
		1040 : 0x0410, 
		1280 : 0x0500
	};

	_pExcelExport._event_list = 
		{
		"onsuccess" : 1, 
		"onerror" : 1, 
		"onprogress" : 1
	};

	_pExcelExport.on_created = nexacro._emptyFn;
	_pExcelExport.set_templatefilename = function (v) {
		if (v != this.templatefilename) {
			this.templatefilename = v;
		}
		return v;
	};

	_pExcelExport.set_commdataformat = function (v) {
		if (v != this.commdataformat) {
			this.commdataformat = v;
			switch (v.toString().toUpperCase()) {
				case "XML":
					this._commdataformat = 0;
					break;
				case "BINARY":
					this._commdataformat = 1;
					break;
				default:
					this._commdataformat = 2;
					break;
			}
		}
		return v;
	};

	_pExcelExport.set_commcompress = function (v) {
		if (v != this.commcompress) {
			this.commcompress = v;
			switch (v.toString().toUpperCase()) {
				case "COMPRESS":
					this._commcompress = true;
					break;
				default:
					this._commcompress = false;
					break;
			}
		}
		return v;
	};

	_pExcelExport.set_exporturl = function (v) {
		if (v != this.exporturl) {
			this.exporturl = this._exporturl = v;
			if (v) {
				this._exporturl = nexacro._getServiceLocation(v, this.parent._getFormBaseUrl());
			}
		}
		return v;
	};

	_pExcelExport.set_exporttype = function (v) {
		if (v != this.exporttype) {
			this.exporttype = v;
			var export_type = this.excelTypeTable[(v + "").toUpperCase()];
			if (!export_type) {
				export_type = 256;
			}
			this._exporttype = export_type;
		}
		return v;
	};

	_pExcelExport.set_activepagename = function (v) {
		if (v != this.activepagename) {
			this.activepagename = v;
		}
		return v;
	};

	_pExcelExport.set_exportactivemode = function (v) {
		if (v != this.exportactivemode) {
			this.exportactivemode = v;
		}
		return v;
	};

	_pExcelExport.set_exporteventtype = function (v) {
		if (v != this.exporteventtype) {
			this.exporteventtype = v;
		}
		return v;
	};


	_pExcelExport.set_exportopenmode = function (v) {
		if (v != this.exportopenmode) {
			this.exportopenmode = v;
		}
		return v;
	};

	_pExcelExport.set_exportfilename = function (v) {
		if (v != this.exportfilename) {
			var special_xmlchar = /[&"'\<\>\r\n\t\\\/]/g;
			if (v) {
				v.match(special_xmlchar);
			}
			this.exportfilename = v;
		}
		return v;
	};

	_pExcelExport.set_exportmessagealert = function (v) {
		if (v != this.exportmessagealert) {
			this.exportmessagealert = v;
		}
		return v;
	};

	_pExcelExport.set_exportuitype = function (v) {
		if (v != this.exportuitype) {
			this.exportuitype = v;
			switch (v) {
				case "exportprogress":
					this._exportuitype = 1;
					break;
				case "statusbar":
					this._exportuitype = 2;
					break;
				default:
					this._exportuitype = 0;
					break;
			}
		}
		return v;
	};

	_pExcelExport.set_exportmessageready = function (v) {
		if (v != this.exportmessageready) {
			this.exportmessageready = v;
		}

		return v;
	};

	_pExcelExport.set_exportmessageprocess = function (v) {
		if (v != this.exportmessageprocess) {
			this.exportmessageprocess = v;
		}

		return v;
	};

	_pExcelExport.set_exportmessagecomplete = function (v) {
		if (v != this.exportmessagecomplete) {
			this.exportmessagecomplete = v;
		}

		return v;
	};

	_pExcelExport.addExportItem = function (type, item) {
		var size = -1;
		var eItem;
		if (arguments.length == 2) {
			if (type && item && item instanceof nexacro.ExportItem) {
				eItem = item;
				eItem.parent = this;
				eItem._setEventHandler("onprogress", this.on_notify_onprogress, this);
				eItem._setEventHandler("onsuccess", this.on_notify_onsuccess, this);
				eItem._setEventHandler("onerror", this.on_notify_onerror, this);
			}
			else {
				return -1;
			}
		}
		else {
			if (type && item && type == this._getItemType(item)) {
				eItem = new nexacro.ExportItem(this.id + "item" + this._uniqueIndex++, this);

				eItem._setEventHandler("onprogress", this.on_notify_onprogress, this);
				eItem._setEventHandler("onsuccess", this.on_notify_onsuccess, this);
				eItem._setEventHandler("onerror", this.on_notify_onerror, this);

				var len = arguments.length;
				switch (len) {
					case 11:
					case 10:
						arguments[9] && eItem.set_exportsize(arguments[9]);
					case 9:
						arguments[8] && eItem.set_exceptstyle(arguments[8]);
					case 8:
						arguments[7] && eItem.set_exportimage(arguments[7]);
					case 7:
						arguments[6] && eItem.set_exportvalue(arguments[6]);
					case 6:
						arguments[5] && eItem.set_exportmerge(arguments[5]);
					case 5:
						arguments[4] && eItem.set_exportselect(arguments[4]);
					case 4:
						arguments[3] && eItem.set_exporthead(arguments[3]);
					case 3:
						arguments[2] && eItem.set_range(arguments[2]);
					case 2:
						arguments[1] && eItem.set_source(arguments[1]);
						break;
				}
			}
			else {
				return -1;
			}
		}
		switch (type) {
			case nexacro.ExportItemTypes.GRID:
				eItem.set_type(type);
				size = this._grids.push(eItem) - 1;
				break;
			case nexacro.ExportItemTypes.DATA:
				break;
			case nexacro.ExportItemTypes.XML:
				break;
		}
		return size;
	};

	_pExcelExport.clear = function () {
		var count = 0;

		count += this._grids.length;
		count += this._dataset.length;
		count += this._xml.length;

		for (var i = 0, len = this._grids.length; i < len; i++) {
			var item = this._grids.pop();
			if (item) {
				item._clear();
				item = null;
			}
		}

		this._grids = [];
		this._dataset = [];
		this._xml = [];

		return count;
	};

	_pExcelExport.clearExportItems = function (type) {
		var length;
		switch (type) {
			case nexacro.ExportItemTypes.GRID:
				length = this._grids.length;
				for (var i = 0; i < length; i++) {
					var item = this._grids.pop();
					if (item) {
						item._clear();
						item = null;
					}
				}
				this._grids = [];
				break;
		}

		if (length == 0) {
			this._uniqueIndex = 0;
		}
		return length;
	};

	_pExcelExport.count = function () {
		var count = 0;

		count += this._grids.length;
		count += this._dataset.length;
		count += this._xml.length;

		return count;
	};

	_pExcelExport.countExportItems = function (type) {
		var count = 0;

		switch (type) {
			case nexacro.ExportItemTypes.GRID:
				count += this._grids.length;
				break;
		}

		return count;
	};

	_pExcelExport.delExportItem = function (type, index) {
		var isDelete = false;

		switch (type) {
			case nexacro.ExportItemTypes.GRID:
				if (this._grids.splice(index, 1).length > 0) {
					isDelete = true;
				}
				break;
		}

		return isDelete;
	};

	_pExcelExport.getExportItem = function (type, index) {
		var item = null;

		switch (type) {
			case nexacro.ExportItemTypes.GRID:
				item = this._grids[index];
				break;
		}

		return item ? item : null;
	};

	_pExcelExport.setExportItem = function (type, index, item) {
		if (!item || !(item instanceof nexacro.ExportItem)) {
			return false;
		}

		var reVal = false;

		switch (type) {
			case nexacro.ExportItemTypes.GRID:
				if (index > -1 && index < this._grids.length) {
					item.parent = this;
					this._grids[index] = item;
					reVal = true;
				}
				break;
		}

		return reVal;
	};

	_pExcelExport.exportItems = function (type) {
		var g_len = -1;
		if (!this.exporturl) {
			return g_len;
		}
		switch (type) {
			case nexacro.ExportItemTypes.GRID:
				var grid_items = this._grids;
				g_len = this._gCount = grid_items.length;
				this._allCount = g_len;

				if (g_len > 0) {
					if (this.exportmessagealert != "") {
						alert(this.exportmessagealert);
					}
					grid_items[0]._gridItemExport(this);
				}
				break;
		}
		return g_len;
	};

	_pExcelExport.exportData = function (argsParam, argsDsParam, bOrgValue) {
		this._argsParam = argsParam;
		this._argsDsParam = argsDsParam;
		this._is_orgval = bOrgValue ? true : false;
		var i;
		if (argsParam) {
			this._file_password = null;
			var userDatas = argsParam.split(",");
			for (i = 0, u_len = userDatas.length; i < u_len; i++) {
				var dataArr = userDatas[i].split("=");
				if (dataArr[0] == "filepassword") {
					this._file_password = dataArr[1];
					userDatas.splice(i, 1);
					argsParam = userDatas.join(",");
					break;
				}
			}
			this._argsParam = argsParam;
		}

		var ret = -1;
		if (!this.exporturl) {
			return ret;
		}

		var grid_items = this._grids;
		var g_len = this._gCount = grid_items.length;
		this._allCount = g_len;
		if (this._allCount > 0 && this.exportmessagealert != "") {
			alert(this.exportmessagealert);
		}


		for (i = 0; i < g_len; i++) {
			this._allRowCount += grid_items[i].source._getGridRowCount();
		}
		if (g_len > 0) {
			grid_items[0]._gridItemExport(this);
		}

		return this.count();
	};

	_pExcelExport.destroy = function () {
		var exportbar = this._exportBar;
		if (exportbar) {
			exportbar.destroy();
		}

		for (var i = 0, len = this._grids.length; i < len; i++) {
			var item = this._grids.pop();
			if (item) {
				item._clear();
				item = null;
			}
		}
		this._grids = null;
		this._dataset = null;
		this._grids = null;
		this._dataset = null;

		this._excel_suppress_info = null;
		this._merge_datas = null;
		this._xml.length = 0;

		if (this.parent) {
			this.parent.removeChild(this.id);
		}
		nexacro._EventSinkObject.prototype.destroy.call(this);
		return true;
	};


	_pExcelExport.on_fire_onprogress = function (obj, e) {
		var event = this.onprogress;

		if (event && event._has_handlers) {
			event._fireEvent(this, e);
		}
	};

	_pExcelExport.on_fire_onsuccess = function (obj, e) {
		var event = this.onsuccess;

		if (event && event._has_handlers) {
			event._fireEvent(this, e);
		}
	};

	_pExcelExport.on_fire_onerror = function (obj, e) {
		var event = this.onerror;
		var ret;

		if (event && event._has_handlers) {
			ret = event._fireEvent(this, e);
		}
		return ret;
	};

	_pExcelExport.on_notify_onprogress = function (obj, e) {
		this.on_fire_onprogress(obj, e);
		return false;
	};

	_pExcelExport.on_notify_onsuccess = function (obj, e) {
		this.on_fire_onsuccess(obj, e);
		return false;
	};

	_pExcelExport.on_notify_onerror = function (obj, e) {
		this.on_fire_onerror(obj, e);
		return false;
	};


	_pExcelExport._getItemType = function (item) {
		var rt;
		switch (item && item._type_name) {
			case "Grid":
				rt = nexacro.ExportItemTypes.GRID;
				break;
			case "Dataset":
				break;
			case "Xml":
				break;
			default:
				if (item instanceof nexacro.Grid) {
					rt = nexacro.ExportItemTypes.GRID;
				}
				break;
		}
		return rt;
	};

	_pExcelExport._getProcessStr = function (item, itemrecord, totalrecord) {
		var str = "";
		str = this.exportmessageprocess.replace("%d", item);
		str = str.replace("%d", itemrecord);
		str = str.replace("%d", totalrecord);

		return str;
	};

	_pExcelExport._getForm = function () {
		if (this.parent instanceof nexacro.Form) {
			return this.parent;
		}
		return null;
	};

	_pExcelExport._getExportBar = function (uiType) {
		var form = this._getForm();
		var pbar_name = "_exportBar";
		var obj = form[pbar_name];
		if (obj) {
			obj.destroy();
		}

		obj = new nexacro.ExportProgress(pbar_name, 0, 0, 10, 10, null, null, null, null, null, null, form);
		form.addChild(obj.name, obj);
		obj._uitype = uiType;
		if (obj.createComponent(true)) {
			obj.on_created();
		}
		return obj;
	};

	delete _pExcelExport;

	nexacro.ExportItem = function (name, parent) {
		this.id = this.name = name;
		this.parent = parent || null;
	};

	var _pExportItem = nexacro.ExportItem.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.ExportItem);
	_pExportItem._type_name = "ExportItem";


	_pExportItem.exceptstyle = "";
	_pExportItem.exporthead = "allband";
	_pExportItem._exporthead = "";
	_pExportItem.exportimage = "none";
	_pExportItem.exportmerge = "suppress";
	_pExportItem._exportmerge = 1;
	_pExportItem.exportselect = "allrecord";
	_pExportItem.exportvalue = "allstyle";
	_pExportItem.exportsize = "width";

	_pExportItem.range = "";
	_pExportItem.source = "";
	_pExportItem.type = "";

	_pExportItem._applyA = true;
	_pExportItem._applyB = true;
	_pExportItem._applyC = true;
	_pExportItem._applyF = true;
	_pExportItem._applyHead = true;
	_pExportItem._applySumm = true;
	_pExportItem._applyL = true;

	_pExportItem._d_BLColor = "";

	_pExportItem._seq = 1;
	_pExportItem._preStartRow = 0;
	_pExportItem._startRow = 0;
	_pExportItem._eof = false;
	_pExportItem._instanceId = "";

	_pExportItem._a_ct = 0;
	_pExportItem._bg_ct = 0;
	_pExportItem._c_ct = 0;
	_pExportItem._f_ct = 0;
	_pExportItem._l_ct = 0;
	_pExportItem._t_ct = 0;
	_pExportItem._sm_ct = 0;
	_pExportItem._g_ct = 0;
	_pExportItem._s_ct = 0;
	_pExportItem._stylecache = {
	};
	_pExportItem._selectcount = 0;
	_pExportItem._merge_datas = null;
	_pExportItem._excel_suppress_info = {
	};

	_pExportItem._gridTempInfo = null;

	_pExportItem._tmpSuppressInfos = undefined;
	_pExportItem._event_list = {
		"onsuccess" : 1, 
		"onprogress" : 1, 
		"onerror" : 1
	};

	_pExportItem._suppress_align_table = {
		"first" : "top", 
		"first,over" : "top", 
		"middle" : "middle", 
		"middle,over" : "middle", 
		"last" : "bottom", 
		"last,over" : "bottom"
	};

	_pExportItem._clear = function () {
		if (this._ds_style2) {
			this._ds_style2.destroy();
			this._ds_style2 = null;
			delete this._ds_style2;
		}

		if (this._ds_style) {
			this._ds_style.destroy();
			this._ds_style = null;
			delete this._ds_style;
		}

		if (this._ds_command) {
			this._ds_command.destroy();
			this._ds_command = null;
			delete this._ds_command;
		}

		if (this._ds_cell) {
			this._ds_cell.destroy();
			this._ds_cell = null;
			delete this._ds_cell;
		}

		if (this._ds_response) {
			this._ds_response.destroy();
			this._ds_response = null;
			delete this._ds_response;
		}
		if (this._load_manager) {
			this._load_manager.destroy();
			this._load_manager = null;
			delete this._load_manager;
		}

		if (this._merge_datas) {
			this._merge_datas = null;
		}
		if (this._stylecache) {
			this._stylecache = null;
		}
		if (this.source) {
			this.source = null;
		}
		if (this._gridTempInfo) {
			this._gridTempInfo = null;
		}
		if (this._excel_suppress_info) {
			this._excel_suppress_info = null;
		}

		if (this._tmpSuppressInfos) {
			this._tmpSuppressInfos = null;
		}
	};


	_pExportItem.set_exceptstyle = function (v) {
		if (v != this.exceptstyle) {
			this.exceptstyle = v;
			var except = v.replace(/ /g, "").split(",");
			var eLen = except.length;
			for (var i = 0; i < eLen; i++) {
				switch (except[i].toLowerCase()) {
					case "align":
						this._applyA = false;
						break;
					case "background":
						this._applyB = false;
						break;
					case "color":
						this._applyC = false;
						break;
					case "font":
						this._applyF = false;
						break;
					case "border":
						this._applyL = false;
						break;
					case "none":
						this._applyA = true;
						this._applyB = true;
						this._applyC = true;
						this._applyF = true;
						this._applyL = true;
				}
			}
		}

		return v;
	};

	_pExportItem.set_exporthead = function (v) {
		if (v != this.exporthead) {
			this.exporthead = v;
			var except = v.replace(/ /g, "").split(",");
			var eLen = except.length;
			for (var i = 0; i < eLen; i++) {
				switch (except[i].toLowerCase()) {
					case "nohead":
						this._applyHead = false;
						break;
					case "nosumm":
						this._applySumm = false;
						break;
					default:
						this._applySumm = true;
						this._applySumm = true;
						break;
				}
			}
		}

		if (!this._applyHead || !this._applySumm) {
			if (!this._applyHead && !this._applySumm) {
				this._exporthead = "nohead, nosumm";
			}
			else if (!this._applyHead) {
				this._exporthead = "nohead";
			}
			else {
				this._exporthead = "nosumm";
			}
		}
		else {
			this._exporthead = "allband";
		}

		return v;
	};

	_pExportItem.set_exportimage = function (v) {
		if (v != this.exportimage) {
			this.exportimage = v;
		}

		return v;
	};

	_pExportItem.set_exportmerge = function (v) {
		if (v != this.exportmerge) {
			this.exportmerge = v;
			switch (v) {
				case "nosuppress":
					this._exportmerge = 0;
					break;
				case "merge":
					this._exportmerge = 2;
					break;
				default:
					this._exportmerge = 1;
					break;
			}
		}

		return v;
	};

	_pExportItem.set_exportselect = function (v) {
		if (v != this.exportselect) {
			this.exportselect = v;
		}
		return v;
	};

	_pExportItem.set_exportvalue = function (v) {
		if (v != this.exportvalue) {
			this.exportvalue = v;
		}
		return v;
	};


	_pExportItem.set_range = function (v) {
		if (v != this.range) {
			this.range = v;
		}

		return v;
	};

	_pExportItem.set_source = function (v) {
		if (v != this.source) {
			this.source = v;
		}

		return v;
	};

	_pExportItem.set_type = function (v) {
		if (v != this.type) {
			this.type = v;
		}

		return v;
	};

	_pExportItem.set_exportsize = function (v) {
		if (v != this.exportsize) {
			this.exportsize = v;
		}
		return v;
	};



	_pExportItem.on_fire_onprogress = function (obj, itemindex, itemtype, recordindex) {
		var event = this.parent.onprogress;

		if (event && event._has_handlers) {
			var evt = new nexacro.ExcelExportProgressEventInfo(obj, "onprogress", itemindex, itemtype, recordindex, this);
			event._fireEvent(this, evt);
		}
	};

	_pExportItem.on_fire_onsuccess = function (obj, referObj, url) {
		var event = this.parent.onsuccess;

		if (event && event._has_handlers) {
			var evt = new nexacro.ExcelExportEventInfo(obj, "onsuccess", url, this);
			event._fireEvent(this, evt);
		}
	};


	_pExportItem.on_fire_onerror = function (obj, errortype, errormsg, statuscode) {
		var event = this.parent.onerror;

		if (event && event._has_handlers) {
			var evt = new nexacro.ExcelExportErrorEventInfo(obj, "onerror", errortype, errormsg, this, statuscode);
			event._fireEvent(this, evt);
		}
	};

	_pExportItem._getWindow = function () {
		var excelexport = this.parent;
		if (excelexport) {
			var form = excelexport.parent;
			if (form._is_form) {
				return form._getWindow();
			}
		}
		return null;
	};

	_pExportItem._getWindowHandle = function () {
		var excelexport = this.parent;
		if (excelexport) {
			var form = excelexport.parent;
			if (form._is_form) {
				return form._getWindowHandle();
			}
		}
		return null;
	};

	_pExportItem._getCellStyle = function (cell, rowIdx, odd, sn, status) {
		var cellStyleinfo;
		var userstatus = status == true ? "selected" : undefined;

		switch (sn) {
			case "align":
				cellStyleinfo = cell._query_status_align(rowIdx, cell.displaytype, userstatus);
				break;
			case "background":
				cellStyleinfo = cell._query_status_background(rowIdx, userstatus);
				break;
			case "border":
				cellStyleinfo = cell._query_status_border(rowIdx, userstatus);
				cellStyleinfo = nexacro.BorderObject(cellStyleinfo);
				break;
			case "color":
				cellStyleinfo = cell._query_status_color(rowIdx, userstatus);
				break;
			case "font":
				cellStyleinfo = cell._query_status_font(rowIdx, userstatus);
				break;
		}
		return cellStyleinfo;
	};


	_pExportItem._getCellText = function (source, rowidx, cellidx) {
		var celltext;

		if (source && source instanceof nexacro.Grid) {
			var band;
			if (rowidx == -1) {
				band = "head";
			}
			else if (rowidx == -2) {
				band = "summ";
			}
			else {
				band = "body";
			}

			var export_obj = this.parent;

			if (source.getSubCellCount(band, cellidx)) {
				if (export_obj._is_orgval) {
					celltext = source.getSubCellValue(rowidx, cellidx, 0);
				}
				else {
					celltext = source.getSubCellText(rowidx, cellidx, 0);
				}
			}
			else {
				if (export_obj._is_orgval) {
					celltext = source.getCellValue(rowidx, cellidx);
				}
				else {
					celltext = source.getCellText(rowidx, cellidx);
				}
			}
		}

		return celltext;
	};

	_pExportItem._find_styleName = function (dataset, type, value, count, startRow) {
		var style_name = "";
		var s_type = "";
		var r_count = 0;
		var finded_row = -1;
		if (value) {
			finded_row = dataset.findRow("value", value, startRow);
			if (finded_row > -1) {
				s_type = dataset.getColumn(finded_row, 0);
				if (s_type == type) {
					style_name = dataset.getColumn(finded_row, 1);
				}
				else {
					return this._find_styleName(dataset, type, value, count, finded_row + 1);
				}
			}
			else {
				r_count = dataset.getRowCount();
				style_name = type + (++count);
				dataset.addRow();
				dataset.setColumn(r_count, "type", type);
				dataset.setColumn(r_count, "name", style_name);
				dataset.setColumn(r_count, "value", value);
			}
		}
		return [style_name, count];
	};

	_pExportItem._getFitValue = function (obj) {
		if (!obj) {
			return;
		}

		var str = this._fontParseInfo(obj._sysvalue);

		return str;
	};

	_pExportItem._getFitFontValue = function (fontval) {
		var size = this._default_size, face = this._default_face, type;

		if (fontval) {
			var font = new nexacro._FontObject();
			font._parseInfo(fontval);

			size = font.size;
			type = font.type;
			face = font.face;
		}

		return type + "," + size + "," + face;
	};

	_pExportItem._getHEXtoRGB = function (color) {
		var rgb = "transparent";
		if (color) {
			if (typeof color == "object") {
				rgb = this._getHexColor(color.value.split(" ")[0]);
			}
			else if (typeof (color) == "string" && (color.indexOf("rgb(") >= 0) || (color.indexOf("RGB(") >= 0)) {
				rgb = "rgbstring";
			}
			else if (typeof (color) == "string" && (color.indexOf("rgba(") >= 0) || (color.indexOf("RGBA(") >= 0)) {
				rgb = "rgbastring";
			}
			else {
				rgb = this._getHexColor(color);
			}
			var style_a = [];

			if (rgb === "") {
				rgb = color._value;
			}
			else {
				if (rgb.indexOf("#") > -1) {
					style_a.push(parseInt(rgb.substring(1, 3), 16));
					style_a.push(parseInt(rgb.substring(3, 5), 16));
					style_a.push(parseInt(rgb.substring(5, 7), 16));
					rgb = style_a.join(",");
				}
				else if (rgb == "rgbstring") {
					color = color.substring(4, 17);
					color = color.split(",");

					for (var i = 0; i < color.length; i++) {
						color[i] = parseInt(color[i]);
					}
					rgb = color.join(",");
				}
				else if (rgb == "rgbastring" || rgb == "transparent") {
					rgb = "transparent";
				}
				else {
					var start = rgb.indexOf("(");
					var end = rgb.indexOf(")");
					style_a = rgb.substring(start + 1, end - 1).split(",");
					style_a.pop();
					rgb = style_a.join(",");
				}
			}
		}
		return rgb;
	};

	_pExportItem._makeforDsStyle = function (ds_style, align, background, color, font, line, cell_type, row_merge, col_merge) {
		var rt, style_name = "";
		var cellStyleinfo = "";

		if (this._applyA) {
			rt = this._find_styleName(ds_style, "align", align, this._a_ct);
			style_name = rt[0];
			this._a_ct = rt[1];
			cellStyleinfo += "align:" + style_name + ",";
		}
		if (this._applyB) {
			rt = this._find_styleName(ds_style, "background", background, this._bg_ct);
			style_name = rt[0];
			this._bg_ct = rt[1];
			cellStyleinfo += "background:" + style_name + ",";
		}
		if (this._applyC) {
			rt = this._find_styleName(ds_style, "color", color, this._c_ct);
			style_name = rt[0];
			this._c_ct = rt[1];
			cellStyleinfo += "color:" + style_name + ",";
		}
		if (this._applyF) {
			rt = this._find_styleName(ds_style, "font", font, this._f_ct);
			style_name = rt[0];
			this._f_ct = rt[1];
			cellStyleinfo += "font:" + style_name + ",";
		}

		line = line.replace(/transparent/g, "empty");
		rt = this._find_styleName(ds_style, "line", line, this._l_ct);
		style_name = rt[0];
		this._l_ct = rt[1];
		cellStyleinfo += "line:" + style_name + ",";

		rt = this._find_styleName(ds_style, "type", cell_type, this._t_ct);
		style_name = rt[0];
		this._t_ct = rt[1];
		cellStyleinfo += "type:" + style_name;

		if (row_merge > 1) {
			rt = this._find_styleName(ds_style, "rowsuppress", row_merge, this._sm_ct);
			style_name = rt[0];
			this._sm_ct = rt[1];
			cellStyleinfo += ",rowsuppress:" + style_name;
		}
		if (col_merge > 1) {
			rt = this._find_styleName(ds_style, "colsuppress", col_merge, this._sm_ct);
			style_name = rt[0];
			this._sm_ct = rt[1];
			cellStyleinfo += ",colsuppress:" + style_name;
		}

		rt = this._find_styleName(ds_style, "style", cellStyleinfo, this._s_ct);
		style_name = rt[0];
		this._s_ct = rt[1];

		return style_name;
	};

	_pExportItem._checkExpr = function (obj) {
		if (obj && obj._bindtype > 0) {
			return true;
		}

		return false;
	};

	_pExportItem._checkGradation = function (background) {
		return false;
	};

	_pExportItem._getHexColor = function (color) {
		var v = nexacro._xreNamedColorList[color];
		if (v) {
			return v;
		}

		len = color.length;
		if (color.substring(0, 1) == '#') {
			if (len == 7) {
				return color;
			}
			if (len > 7) {
				return color.substr(0, 7);
			}
		}
		if (color.substring(0, 2) == "0x") {
			if (len == 8) {
				return "#" + color.substring(2);
			}
			if (len == 10) {
				return "#" + color.substring(2, 8);
			}
		}
		return "";
	};

	_pExportItem._getGradationColor = function (gradation) {
		var gColor;
		var gColor2;
		var gArr = [];
		if (gradation) {
			gColor = gradation._value;
			if (gColor != "") {
				gColor = this._getHexColor(gradation.start_color);
				gColor2 = this._getHexColor(gradation.end_color);

				if (gColor.indexOf("#") > -1) {
					var name = gColor + gColor2;
					if (this._stylecache[name]) {
						return this._stylecache[name];
					}
					else {
						gArr.push(Math.round((parseInt(gColor.substring(1, 3), 16) + parseInt(gColor2.substring(1, 3), 16)) / 2));
						gArr.push(Math.round((parseInt(gColor.substring(3, 5), 16) + parseInt(gColor2.substring(3, 5), 16)) / 2));
						gArr.push(Math.round((parseInt(gColor.substring(5), 16) + parseInt(gColor2.substring(5), 16)) / 2));
						gColor = gArr.join(",");
						this._stylecache[name] = gColor;
					}
				}
				return gColor;
			}
		}
		return "";
	};

	_pExportItem._getCellBodyStyle = function (cell, idx) {
		var align, background, background2, color, color2, font, line, gradation, gradation2, c_style, c_style2, _background2, _color2;

		var str = "";
		var ds_style = this._ds_style;
		var flag = false;
		var viewType = cell.displaytype._value;
		var _linestyle = "empty:empty:empty:empty";
		var linecolor = {
			vertical : "empty", 
			horizon : "empty"
		};

		align = cell._query_status_align(0, viewType);
		if (align == ",") {
			align = "left,";
		}
		background = cell._query_status_background(0);
		color = cell._query_status_color(0);
		font = cell._query_status_font(0);

		if (this._applyL && !cell._getSuppressInfo(0)) {
			line = cell._query_status_border(0);
			line = nexacro.BorderObject(line);
		}

		background2 = cell._query_status_background(1);
		color2 = cell._query_status_color(1);

		var _align = align;
		if (this._checkGradation(background)) {
		}
		else {
			var _background = this._getHEXtoRGB(background);
		}

		var _color = this._getHEXtoRGB(color);
		var _font = this._getFitFontValue(font);

		if (this._applyL && line) {
			if (line.right && line.right.style != "none" && line.right._width != 0) {
				linecolor.vertical = this._getHEXtoRGB(line.right.color) + (line.right.style == "solid" ? "" : "," + line.right.style);
				linecolor.horizon = this._getHEXtoRGB(line.bottom.color) + (line.bottom.style == "solid" ? "" : "," + line.bottom.style);
				if (this._applyHead) {
					_linestyle = (cell._col == 0 ? linecolor.vertical : "empty") + ":" + "empty" + ":";
				}
				else {
					_linestyle = (cell._col == 0 ? linecolor.vertical : "empty") + ":" + (cell._row == 0 ? linecolor.horizon : "empty") + ":";
				}

				_linestyle += linecolor.vertical + ":" + linecolor.horizon;
			}
		}

		if (this._checkExpr(align)) {
			_align = undefined;
		}
		else {
			this._stylecache[idx + "align"] = _align;
		}
		if (this._checkExpr(background)) {
			_background = undefined;
		}
		else {
			this._stylecache[idx + "background0"] = _background;
		}
		if (this._checkExpr(color)) {
			_color = undefined;
		}
		else {
			this._stylecache[idx + "color0"] = _color;
		}
		if (this._checkExpr(font)) {
			_font = undefined;
		}
		else {
			this._stylecache[idx + "font"] = _font;
		}
		if (this._checkExpr(line)) {
			_line = undefined;
		}
		else {
			this._stylecache[idx + "line"] = _linestyle;
		}

		if (background2) {
			if (this._checkGradation(background2)) {
				gradation2 = cell._stylecache.gradationtruefalsenormal;
				if (!gradation2) {
					gradation2 = cell.style.gradation2;
					if (!gradation2) {
						gradation2 = cell._query_pseudo_gradation(0, true, false, "enabled");
					}
				}
				var _background2 = this._getGradationColor(gradation2);
			}
			else {
				var _background2 = this._getHEXtoRGB(background2);
			}
			if (this._checkExpr(background2)) {
				_background2 = undefined;
			}
			else {
				this._stylecache[idx + "background1"] = _background2;
			}
			if (_background != _background2) {
				flag = true;
			}
		}
		else {
			this._stylecache[idx + "background1"] = _background2 = _background;
		}
		if (color2) {
			var _color2 = this._getHEXtoRGB(color2);
			if (this._checkExpr(color2)) {
				_color2 = undefined;
			}
			else {
				this._stylecache[idx + "color1"] = _color2;
			}
			if (_color != _color2) {
				flag = true;
			}
		}
		else {
			this._stylecache[idx + "color1"] = _color2 = _color;
		}

		var cell_type = this._getFixedCellType(cell, 0);
		c_style = this._makeforDsStyle(ds_style, _align, _background, _color, _font, _linestyle, cell_type);
		if (flag) {
			c_style2 = this._makeforDsStyle(ds_style, _align, _background2, _color2, _font, _linestyle, cell_type);
		}

		subCell = cell._subcells;
		subL = subCell.length;
		if (subL) {
			var subCellFormat = "";
			for (var i = 0; i < subL; i++) {
				subCellFormat += this._modifyFormat(subCell[i], c_style, c_style2, 0, cell);
			}
			return subCellFormat;
		}
		else {
			return this._modifyFormat(cell, c_style, c_style2, 0);
		}
	};

	_pExportItem._getFixedCellType = function (cell, rowidx) {
		var cell_type = cell._getDisplaytype(rowidx);
		var displaytype = "";
		switch (cell_type) {
			case "number":
				break;
			case "maskeditcontrol":
			case "mask":
				var format = cell._getAttrValue(cell.maskeditformat, rowidx);
				if (format != null && format.length != 0) {
					displaytype = format;
				}
				break;
			case "calendarcontrol":
			case "date":
			case "time":
			case "datetime":
				cell_type = "date";
				var format = cell._getAttrValue(cell.calendardateformat, rowidx);
				if (format == null || format.length == 0 || !format.match(/LONGDATE|SHORTDATE|[yMdHhms]/)) {
					format = "yyyy-MM-dd";
				}
				else {
					var locale = cell._getAttrValue(cell.locale, rowidx);
					if (!locale) {
						locale = nexacro._BrowserLang;
					}

					if (format == "SHORTDATE") {
						format = nexacro.Locale._makeDateMaskString(locale, format);
						if (format == "") {
							format = nexacro.Locale._default_shortdate_format;
						}
					}
					else if (format == "LONGDATE") {
						format = nexacro.Locale._makeDateMaskString(locale, "SHORTDATE");
						if (format == "") {
							format = nexacro.Locale._default_longdate_format;
						}
					}
				}
				displaytype = format;
				break;
			case "imagecontrol":
				if (this.exportimage.toLowerCase() == "image") {
					displaytype += "image";
				}
				cell_type = "text";
				break;
			case "text":
				if (cell._getAttrValue(cell.displaytype, rowidx) == "enabled") {
					cell_type = "enabled";
				}
				else {
					cell_type = "text";
				}
				break;
			default:
				cell_type = "text";
				break;
		}
		return cell_type + (displaytype ? ":" + displaytype : "");
	};

	_pExportItem._modifyFormat = function (cell, style1, style2, rowidx, mainCell, fake_merge_value) {
		var text, temp_str, str;
		temp_str = str = "";
		var subcells = cell._subcells;
		var subLen = subcells ? subcells.length : 0;
		var rowspan = 1;
		var colspan = 1;
		var _colspan = cell._colspan;
		var _rowspan = cell._rowspan;
		var row = cell._row;
		var col = cell._col;
		var _row = row;
		var _col = col;

		text = rowidx < 0 ? cell._getDisplayText(rowidx) : cell.text._value;
		text = nexacro._encodeXml(text);
		if (mainCell) {
			row = _row + mainCell._row;
			col = _col + mainCell._col;
		}
		else {
			rowspan = _rowspan;
			colspan = _colspan;
		}
		str += "<Cell ";
		str += "row=\"" + row + "\" col=\"" + col + "\" ";

		temp_str += "rowspan=\"" + rowspan + "\" ";
		temp_str += "colspan=\"" + colspan + "\" ";


		if (this._exportmerge == 1) {
			if (fake_merge_value != null) {
				text = fake_merge_value;
			}
		}
		else if (this._exportmerge == 2) {
			if (fake_merge_value != null) {
				temp_str = fake_merge_value;
			}
		}

		str += temp_str;

		if (text) {
			str += "text=\"" + text + "\" ";
		}

		var dataType = "";
		var grid = this.source;

		str += "style1=\"" + style1 + "\" ";

		if (style2) {
			str += "style2=\"" + style2 + "\" ";
		}

		var cType = cell.displaytype;
		if (cType) {
			var cTypeVal = cType._value;
			if (cTypeVal == "imagecontrol" && this.exportimage.toLowerCase() == "image") {
				str += "displaytype=\"imagecontrol\" ";
			}
			dataType = cell._getDisplaytype(rowidx);
			switch (dataType) {
				case "imagecontrol":
				case "text":
					dataType = "string";
					break;
				case "number":
					dataType = "int";
					break;
				case "calendarcontrol":
				case "date":
				case "time":
				case "datetime":
					dataType = "date";
					var format = cell._getAttrValue(cell.calendardateformat, rowidx);
					if (format == null || format.length == 0 || !format.match(/[yMdHhms]/)) {
						format = "yyyy-MM-dd";
					}
					str += "displaytype=\"" + format + "\" ";
					break;
				default:
					dataType = "text";
					break;
			}
			str += "type=\"" + dataType + "\" ";
		}
		str += "/>";

		return str;
	};

	_pExportItem._getSubCellLine = function (subCell, defaultColor, linecolor, rsp, csp) {
		var lLine, tLine, rLine, bLine;

		var sbc = subCell._col;
		var sbr = subCell._row;

		if (sbc == csp) {
			rLine = linecolor.vertical;
		}
		else {
			rLine = "empty";
		}
		if (sbc == 0) {
			lLine = defaultColor.vertical;
		}
		else {
			lLine = "empty";
		}
		if (sbr == rsp) {
			bLine = linecolor.horizon;
		}
		else {
			bLine = "empty";
		}
		if (sbr == 0) {
			tLine = defaultColor.horizon;
		}
		else {
			tLine = "empty";
		}

		return lLine + ":" + tLine + ":" + rLine + ":" + bLine;
	};

	_pExportItem._makeFakeLine = function (str, color, type) {
		var linestyle_str;
		switch (str) {
			case "topfake":
			case "bottomfake":
				linestyle_str = "empty:empty:" + color.vertical + ":empty";
				break;
			case "rightfake":
				if (type) {
					linestyle_str = "empty:empty:empty:" + color.horizon;
				}
				else {
					linestyle_str = "empty:" + color.horizon + ":empty:empty";
				}
				break;
			case "righttopfake":
			case "rightbottomfake":
				linestyle_str = "empty:empty:empty:empty";
				break;
			default:
				if (type) {
					linestyle_str = "empty:empty:" + color.vertical + ":" + color.horizon;
				}
				else {
					linestyle_str = "empty:" + color.horizon + ":" + color.vertical + ":empty";
				}
				break;
		}
		return linestyle_str;
	};

	_pExportItem._makeFormat = function (grid) {
		var bg, align, font, color, line, style, cell, subCell, background, gradation;

		var format = grid._curFormat;
		var hCells = format._headcells;
		var hLen = hCells ? hCells.length : 0;
		var bCells = format._bodycells;
		var bLen = bCells ? bCells.length : 0;
		var sCells = format._summcells;
		var sLen = sCells ? sCells.length : 0;
		var str = "";
		var ds_style = this._ds_style;
		var linecolor = {
			vertical : "empty", 
			horizon : "empty"
		};
		var linestyle = "empty:empty:empty:empty";
		var subL = 0;
		var f_cols = format._cols;
		var f_hrows = format._headrows;
		var f_brows = format._bodyrows;
		var f_srows = format._summrows;

		str = "<Formats><Format><Columns>";
		for (var i = 0, fcLen = f_cols.length; i < fcLen; i++) {
			str += '<Column size="' + Math.round(f_cols[i].size) + '" />';
		}
		str += "</Columns><Rows>";
		for (var i = 0, frLen = f_hrows ? f_hrows.length : 0; i < frLen; i++) {
			str += '<Row size="' + Math.round(f_hrows[i].size) + '" band="head" />';
		}
		for (var i = 0, frLen = f_brows ? f_brows.length : 0; i < frLen; i++) {
			str += '<Row size="' + Math.round(f_brows[i].size) + '" />';
		}
		for (var i = 0, frLen = f_srows ? f_srows.length : 0; i < frLen; i++) {
			str += '<Row size="' + Math.round(f_srows[i].size) + '" band="summ" />';
		}
		str += "</Rows>";

		if (hLen > 0 && this._applyHead) {
			str += "<Head>";
			for (var i = 0; i < hLen; i++) {
				cell = hCells[i];
				background = this._getCellStyle(cell, -1, false, "background", "enabled");
				if (this._checkGradation(background)) {
					gradation = this._getCellStyle(cell, -1, false, "gradation", "enabled");
					bg = this._getGradationColor(gradation);
				}
				else {
					bg = this._getHEXtoRGB(background);
				}

				align = this._getCellStyle(cell, -1, false, "align", "enabled");
				font = this._getFitFontValue(this._getCellStyle(cell, -1, false, "font", "enabled"));
				color = this._getHEXtoRGB(this._getCellStyle(cell, -1, false, "color", "enabled"));
				linecolor = {
					vertical : "empty", 
					horizon : "empty"
				};

				if (this._applyL) {
					line = this._getCellStyle(cell, -1, false, "border", "enabled");

					if (line) {
						if (line.right && line.right.style != "none" && line.right._width != 0) {
							linecolor.vertical = this._getHEXtoRGB(line.right.color) + (line.right.style == "solid" ? "" : "," + line.right.style);
						}

						if (line.bottom && line.bottom.style != "none" && line.bottom._width != 0) {
							linecolor.horizon = this._getHEXtoRGB(line.bottom.color) + (line.bottom.style == "solid" ? "" : "," + line.bottom.style);
						}
					}
				}

				var cell_type = this._getFixedCellType(cell, -1);
				subCell = cell._subcells;
				subL = subCell.length;
				if (subL) {
					for (var j = 0; j < subL; j++) {
						linestyle = this._getSubCellLine(subCell[j], linecolor, linecolor, cell._rowspan - 1, cell._colspan - 1);
						style = this._makeforDsStyle(ds_style, align, bg, color, font, linestyle, cell_type);
						str += this._modifyFormat(subCell[j], style, null, -1, cell);
					}
				}
				else {
					linestyle = (cell._col == 0 ? linecolor.vertical : "empty") + ":" + (cell._row == 0 ? linecolor.horizon : "empty") + ":";
					linestyle += linecolor.vertical + ":" + linecolor.horizon;

					var need_merge_cell = false;
					var fake_value = null;
					var row_suppress_count = 0;
					var col_suppress_count = 0;

					if (this._exportmerge == 1) {
						if (!!grid._checkFakeMerge(cell, -1)) {
							linestyle = this._makeFakeLine(cell._fakemerge_infos[1], linecolor, true);
							fake_value = "";

							var merge_data = this._merge_datas && this._merge_datas[-1 + "_" + i];
							if (merge_data) {
								if (merge_data.isFakeStart) {
									fake_value = nexacro._encodeXml(cell._getDisplayText(-1));
									if (align != "left,top") {
										var temp_align = align.split(",");
										var merge_str = merge_data[temp_align[1]] + "_" + merge_data[temp_align[0]];
										if (this._merge_datas[merge_str]) {
											this._merge_datas[merge_str].disPlayText = fake_value;
											this._merge_datas[merge_str].showText = true;
										}
										else {
											this._merge_datas[merge_str] = {
												disPlayText : fake_value, 
												showText : true
											};
										}
									}
									fake_value = "";
								}
								else if (merge_data.showText) {
									fake_value = merge_data.disPlayText;
								}
							}
						}
					}
					else if (this._exportmerge == 2) {
						var merge_data = this._merge_datas && this._merge_datas[-1 + "_" + i];
						if (merge_data) {
							if (merge_data.isFakeStart) {
								fake_value = "rowspan=\"" + merge_data.rowspan + "\" colspan=\"" + merge_data.colspan + "\" ";
							}
							else {
								need_merge_cell = true;
							}
						}
					}

					if (!need_merge_cell) {
						style = this._makeforDsStyle(ds_style, align, bg, color, font, linestyle, cell_type);
						str += this._modifyFormat(cell, style, null, -1, false, fake_value);
					}
				}
			}
			str += "</Head>";
		}

		if (bLen > 0) {
			str += "<Body>";
			for (var i = 0; i < bLen; i++) {
				cell = bCells[i];
				str += this._getCellBodyStyle(cell, i);
			}
			str += "</Body>";
		}

		if (sLen > 0 && this._applySumm) {
			str += "<Summary>";
			for (var i = 0; i < sLen; i++) {
				cell = sCells[i];
				background = this._getCellStyle(cell, -2, false, "background", "enabled");
				if (this._checkGradation(background)) {
					gradation = this._getCellStyle(cell, -2, false, "gradation", "enabled");
					bg = this._getGradationColor(gradation);
				}
				else {
					bg = this._getHEXtoRGB(background);
				}
				align = this._getCellStyle(cell, -2, false, "align", "enabled");
				font = this._getFitFontValue(this._getCellStyle(cell, -2, false, "font", "enabled"));
				color = this._getHEXtoRGB(this._getCellStyle(cell, -2, false, "color", "enabled"));
				linecolor = {
					vertical : "empty", 
					horizon : "empty"
				};

				if (this._applyL) {
					line = this._getCellStyle(cell, -2, false, "border", "enabled");

					if (line) {
						if (line.right && line.right.style != "none" && line.right._width != 0) {
							linecolor.vertical = this._getHEXtoRGB(line.right.color) + (line.right.style == "solid" ? "" : "," + line.right.style);
						}

						if (line.top && line.top.style != "none" && line.top._width != 0) {
							linecolor.horizon = this._getHEXtoRGB(line.top.color) + (line.top.style == "solid" ? "" : "," + line.top.style);
						}
					}
				}

				var cell_type = this._getFixedCellType(cell, -2);
				subCell = cell._subcells;
				subL = subCell.length;
				if (subL) {
					for (var j = 0; j < subL; j++) {
						linestyle = this._getSubCellLine(subCell[j], linecolor, linecolor, cell._rowspan - 1, cell._colspan - 1);
						style = this._makeforDsStyle(ds_style, align, bg, color, font, linestyle, cell_type);
						str += this._modifyFormat(subCell[j], style, null, -2, cell);
					}
				}
				else {
					var need_merge_cell = false;
					linestyle = linecolor.vertical + ":" + linecolor.horizon + ":" + linecolor.vertical + ":" + linecolor.horizon;
					var fake_value = null;
					if (this._exportmerge == 1) {
						if (!!grid._checkFakeMerge(cell, -2)) {
							linestyle = this._makeFakeLine(cell._fakemerge_infos[0], linecolor);
							fake_value = "";

							var merge_data = this._merge_datas && this._merge_datas[-2 + "_" + i];
							if (merge_data) {
								if (merge_data.isFakeStart) {
									fake_value = nexacro._encodeXml(cell._getDisplayText(-2));
									if (align != "left,top") {
										var temp_align = align.split(",");
										var merge_str = merge_data[temp_align[1]] + "_" + merge_data[temp_align[0]];
										if (this._merge_datas[merge_str]) {
											this._merge_datas[merge_str].disPlayText = fake_value;
											this._merge_datas[merge_str].showText = true;
										}
										else {
											this._merge_datas[merge_str] = {
												disPlayText : fake_value, 
												showText : true
											};
										}
										fake_value = "";
									}
								}
								else if (merge_data.showText) {
									fake_value = merge_data.disPlayText;
								}
							}
						}
					}
					else if (this._exportmerge == 2) {
						if (!!grid._checkFakeMerge(cell, -2)) {
							var merge_data = this._merge_datas && this._merge_datas[-2 + "_" + i];
							if (merge_data) {
								if (merge_data.isFakeStart) {
									fake_value = "rowspan=\"" + merge_data.rowspan + "\" colspan=\"" + merge_data.colspan + "\" ";
								}
								else {
									need_merge_cell = true;
								}
							}
						}
					}

					if (!need_merge_cell) {
						style = this._makeforDsStyle(ds_style, align, bg, color, font, linestyle, cell_type);
						str += this._modifyFormat(cell, style, null, -2, false, fake_value);
					}
				}
			}
			str += "</Summary>";
		}

		str += "</Format></Formats>";
		return str;
	};

	_pExportItem._getForm = function () {
		return this.parent.parent;
	};

	_pExportItem._eventExport = function (exportObj, type, row_index, selectCnt) {
		var eventtype = exportObj.exporteventtype;
		var itemIndex = exportObj._itemsIndex;
		var exportbar = exportObj._exportBar;
		if (eventtype != "none") {
			var row_num = row_index + 1;
			var processStr = "";
			var is_end = row_num == this._bodyRowCnt;
			var progress_pos = exportObj._progress_pos + row_num;

			if (eventtype == "item" && is_end) {
				this.on_fire_onprogress(exportObj, itemIndex, this.type, selectCnt == null ? row_index : selectCnt);
				if (exportbar) {
					processStr = exportObj._getProcessStr(itemIndex + 1, progress_pos, exportObj._allRowCount);
					exportbar._set_text(processStr);
					exportbar._set_pos((itemIndex + 1) / exportObj._allCount * 100);
				}
			}
			else if (eventtype == "itemrecord") {
				this.on_fire_onprogress(exportObj, itemIndex, this.type, selectCnt == null ? row_index : selectCnt);
				if (exportbar) {
					processStr = exportObj._getProcessStr(itemIndex + 1, row_num, this._bodyRowCnt);
					exportbar._set_text(processStr);
					exportbar._set_pos(row_num / this._bodyRowCnt * 100);
				}
			}
			else if (eventtype == "totalrecord") {
				this.on_fire_onprogress(exportObj, itemIndex, this.type, selectCnt == null ? row_index : selectCnt);
				if (exportbar) {
					processStr = exportObj._getProcessStr(itemIndex + 1, progress_pos, exportObj._allRowCount);
					exportbar._set_text(processStr);
					exportbar._set_pos(progress_pos / exportObj._allRowCount * 100);
				}
			}

			if (progress_pos == exportObj._allRowCount && exportObj.exportmessagecomplete != "") {
				if (exportbar) {
					exportbar._set_text(exportObj.exportmessagecomplete);
				}
			}
			if (is_end && exportbar) {
				exportObj._progress_pos = progress_pos;
			}
		}
	};

	_pExportItem._updateBarPos = function (exportObj, eventtype) {
		if (eventtype != "none" && exportObj._exportuitype) {
			var itemIndex = exportObj._itemsIndex;
			var exportbar = exportObj._exportBar;
			exportObj._progress_pos += this._startRow - this._preStartRow;
			var processStr = "";
			var is_end = this._startRow == this._bodyRowCnt;
			if (eventtype == "item" && is_end) {
				processStr = exportObj._getProcessStr(itemIndex + 1, exportObj._progress_pos, exportObj._allRowCount);
				exportbar._set_text(processStr);
				exportbar._set_pos((itemIndex + 1) / exportObj._allCount * 100);
			}
			else if (eventtype == "itemrecord") {
				processStr = exportObj._getProcessStr(itemIndex + 1, this._startRow, this._bodyRowCnt);
				exportbar._set_text(processStr);
				exportbar._set_pos(this._startRow / this._bodyRowCnt * 100);
			}
			else if (eventtype == "totalrecord") {
				processStr = exportObj._getProcessStr(itemIndex + 1, exportObj._progress_pos, exportObj._allRowCount);
				exportbar._set_text(processStr);
				exportbar._set_pos(exportObj._progress_pos / exportObj._allRowCount * 100);
			}
			if (exportObj._progress_pos == exportObj._allRowCount && exportObj.exportmessagecomplete != "") {
				exportbar._set_text(exportObj.exportmessagecomplete);
			}
		}
	};

	_pExportItem._rollbackSuppressInfo = function () {
		var cells = this.source._curFormat._bodycells;
		var supLen = this._tmpSuppressInfos && this._tmpSuppressInfos.length;
		for (var i = 0; i < supLen; i++) {
			cells[i]._suppress_infos = this._tmpSuppressInfos.shift();
		}
	};

	_pExportItem._gridSuppressUpdate = function (grid, rowcount) {
		var cells = grid._curFormat._bodycells;
		var cLen = cells.length;
		this._tmpSuppressInfos = [];
		for (var i = 0; i < cLen; i++) {
			this._tmpSuppressInfos.push(cells[i]._suppress_infos);
		}

		grid._analyzeSuppress(true);

		for (var i = 0; i < rowcount; i++) {
			grid._suppressUpdateRow(i, 0, rowcount - 1, true);
		}
	};

	_pExportItem._gridExportContinue = function (exportObj) {
		var grid = this.source;
		var ds_command = this._ds_command;

		ds_command.setColumn(0, "command", "export");
		ds_command.setColumn(0, "type", exportObj._exporttype);
		ds_command.setColumn(0, "item", grid.id);
		ds_command.setColumn(0, "seq", this._seq);
		ds_command.setColumn(0, "startrow", this._startRow);
		ds_command.setColumn(0, "instanceid", this._instanceId);
		ds_command.setColumn(0, "url", exportObj._fileURL);
		ds_command.setColumn(0, "summarytype", grid.summarytype);

		ds_command.setColumn(0, "range", this.range);
		ds_command.setColumn(0, "exportsize", this.exportsize);
		ds_command.setColumn(0, "exporthead", this._exporthead);
		ds_command.setColumn(0, "exportimage", this.exportimage);

		ds_command.setColumn(0, "exportfilename", exportObj.exportfilename);
		ds_command.setColumn(0, "format", "");
		ds_command.setColumn(0, "password", exportObj._file_password);

		var ds_style = this._ds_style;

		var ds_style2 = this._ds_style2;

		if (!ds_style2) {
			var ds_style2 = new Dataset("STYLE2");
			this._ds_style2 = ds_style2;
			ds_style2.addColumn("type", "String", 10);
			ds_style2.addColumn("name", "String", 32);
			ds_style2.addColumn("value", "String", 1024);
		}
		else {
			this._ds_style2.clearData();
		}

		delete this._ds_cell;
		var ds = new Dataset("CELL");
		this._ds_cell = ds;

		var bodycntcell = grid.getCellCount("body");

		var bodycntrow = this._bodyRowCnt;

		var style_name;
		var rt;

		if (this._exportmerge && grid._is_use_suppress && bodycntrow > grid._bodyBand._get_rows().length) {
			this._gridSuppressUpdate(grid, bodycntrow);
		}

		var export_param = null;
		var export_dsparam = null;
		if (bodycntcell > 0) {
			var kk = 0;
			var selectedrow = 0;

			for (var jj = 0; jj < bodycntcell; jj++) {
				ds.addColumn("Column" + jj, "String", 256);
			}

			var partitionRow = this._partitionRow + this._startRow;
			if (partitionRow >= bodycntrow) {
				partitionRow = bodycntrow;
				this._eof = true;
				export_param = this.parent._argsParam;
				export_dsparam = this.parent._argsDsParam;
			}

			var cells = grid._curFormat._bodycells;

			var is_selected;
			var rr = 0;
			var subcnt;
			for (var k = this._startRow; k < partitionRow; k++) {
				subcnt = 0;

				var val;

				var selectChk = false;
				for (var j = 0; j < bodycntcell; j++) {
					selectChk = selectChk || grid.isSelectedCell(j, "body", k, -9);
				}
				var is_selectRec = this.exportselect == "selectrecord";
				if (selectChk || !is_selectRec) {
					var idx = ds.addRow();
					if (is_selectRec) {
						this._eventExport(exportObj, this.type, k, this._selectcount++);
					}
					else {
						this._eventExport(exportObj, this.type, k);
					}
				}
				else {
					continue;
				}

				var odd = k % 2;
				var cc = 0;
				is_selected = false;
				var activate_select_style = (this.exportvalue == "selectstyle");
				for (var j = 0; j < bodycntcell; j++) {
					is_selected = grid.isSelectedCell(j, "body", k, -9);
					var emptyCellFlag;
					if (is_selected) {
						emptyCellFlag = false;
					}
					else {
						if (is_selectRec) {
							emptyCellFlag = true;
						}
					}
					var backgroundCell;
					var alignCell;
					var fontCell;
					var colorCell;
					var lineCell;

					var bodyBand = grid._bodyBand;

					var cell = cells[j];
					var suppress_infos = cell._suppress_infos;
					var cellStyle = "";

					var status = "enabled";
					var cacheA = this._stylecache[j + "align"];
					var cacheL = this._stylecache[j + "line"];
					var cacheB, cacheC, cacheF;

					if (is_selected && activate_select_style) {
						status = "selected";
						cacheB = "";
						cacheC = "";
						cacheF = "";
					}
					else {
						if (emptyCellFlag) {
							cacheB = "255,255,255";
							cacheC = "255,255,255";
							var d_BLColor = this._d_BLColor;
							cacheL = d_BLColor + ":" + d_BLColor + ":" + d_BLColor + ":" + d_BLColor;
							sFlag = true;
						}
						else {
							cacheB = this._stylecache[j + "background" + odd];
							cacheC = this._stylecache[j + "color" + odd];
						}
						cacheF = this._stylecache[j + "font"];
					}

					var sFlag = false;
					if (cacheB) {
						backgroundCell = cacheB;
					}
					else {
						sFlag = true;
						backgroundCell = nexacro._nvl(this._getHEXtoRGB(this._getCellStyle(cell, k, odd, "background", status)), "");
					}
					if (cacheA) {
						alignCell = cacheA;
					}
					else {
						sFlag = true;
						alignCell = nexacro._nvl(this._getCellStyle(cell, k, odd, "align", status), "");
					}
					if (cacheC) {
						colorCell = cacheC;
					}
					else {
						sFlag = true;
						colorCell = nexacro._nvl(this._getHEXtoRGB(this._getCellStyle(cell, k, odd, "color", status)), "");
					}
					if (cacheF) {
						fontCell = cacheF;
					}
					else {
						sFlag = true;
						fontCell = nexacro._nvl(this._getFitFontValue(this._getCellStyle(cell, k, odd, "font", status)), "");
					}

					var is_line_changed = false, d_BLColor, right_linecolor, bottom_linecolor, linecolor;
					right_linecolor = bottom_linecolor = null;

					var row_suppress_count = 0;
					var col_suppress_count = 0;
					switch (this._exportmerge) {
						case 0:
							break;
						case 1:
							if (cell.suppress > 0) {
								sFlag = is_line_changed = true;
								if (suppress_infos[k].border_proc) {
									bottom_linecolor = "empty";
								}
							}

							grid._checkFakeMerge(cell, k);
							if (cell._fakemerge_infos) {
								var fake_border_str = cell._fakemerge_infos[k + 2];
								if (fake_border_str) {
									sFlag = is_line_changed = true;
									switch (fake_border_str) {
										case "bottomfake":
											bottom_linecolor = "empty";
											break;
										case "rightbottomfake":
											right_linecolor = bottom_linecolor = "empty";
											break;
										case "rightfake":
											right_linecolor = "empty";
											break;
									}
								}
							}
							break;
						case 2:
							if (cell.suppress > 0) {
								sFlag = is_line_changed = true;
								var column_suppress = j + "count";
								var excel_suppress_info = this._excel_suppress_info;
								if (!excel_suppress_info[column_suppress]) {
									excel_suppress_info[column_suppress] = 0;
									alignCell = alignCell.split(",")[0] + ", " + this._suppress_align_table[cell.suppressalign];
								}

								if (suppress_infos[k].border_proc) {
									this._excel_suppress_info[column_suppress]++;
								}
								else {
									row_suppress_count = ++excel_suppress_info[column_suppress];
									excel_suppress_info[column_suppress] = 0;
								}
							}

							var merge_data = this._merge_datas && this._merge_datas[k + "_" + j];
							if (merge_data && merge_data.isFakeEnd) {
								sFlag = is_line_changed = true;
								row_suppress_count = merge_data.rowspan;
								col_suppress_count = merge_data.colspan;
							}
							break;
					}

					if (!is_line_changed && cacheL) {
						lineCell = cacheL;
					}
					else {
						if (this._applyL) {
							var line = this._getCellStyle(cell, k, odd, "border", status);
							linecolor = this._getHEXtoRGB(line.right.color) + (line.right.style == "solid" ? "" : "," + line.right.style);
							if (!right_linecolor) {
								right_linecolor = linecolor;
							}
							if (!bottom_linecolor) {
								bottom_linecolor = linecolor;
							}
						}
						else {
							bottom_linecolor = right_linecolor = "empty";
						}
						lineCell = "empty:empty:" + right_linecolor + ":" + bottom_linecolor;
					}

					if (this._applyA) {
						rt = this._find_styleName(ds_style, "align", alignCell, this._a_ct);
						style_name = rt[0];
						if (this._a_ct != rt[1]) {
							rt = this._find_styleName(ds_style2, "align", alignCell, this._a_ct);
						}
						this._a_ct = rt[1];
						cellStyle += "align:" + style_name + ",";
					}

					if (this._applyB) {
						rt = this._find_styleName(ds_style, "background", backgroundCell, this._bg_ct);
						style_name = rt[0];
						if (this._bg_ct != rt[1]) {
							rt = this._find_styleName(ds_style2, "background", backgroundCell, this._bg_ct);
						}
						this._bg_ct = rt[1];
						cellStyle += "background:" + style_name + ",";
					}

					if (this._applyC) {
						rt = this._find_styleName(ds_style, "color", colorCell, this._c_ct);
						style_name = rt[0];
						if (this._c_ct != rt[1]) {
							rt = this._find_styleName(ds_style2, "color", colorCell, this._c_ct);
						}
						this._c_ct = rt[1];
						cellStyle += "color:" + style_name + ",";
					}
					if (this._applyF) {
						rt = this._find_styleName(ds_style, "font", fontCell, this._f_ct);
						style_name = rt[0];
						if (this._f_ct != rt[1]) {
							rt = this._find_styleName(ds_style2, "font", fontCell, this._f_ct);
						}
						this._f_ct = rt[1];
						cellStyle += "font:" + style_name + ",";
					}
					rt = this._find_styleName(ds_style, "line", lineCell, this._l_ct);
					style_name = rt[0];
					if (this._l_ct != rt[1]) {
						rt = this._find_styleName(ds_style2, "line", lineCell, this._l_ct);
					}
					this._l_ct = rt[1];
					cellStyle += "line:" + style_name + ",";

					var cell_type = this._getFixedCellType(cell, k);
					rt = this._find_styleName(ds_style, "type", cell_type, this._t_ct);
					style_name = rt[0];
					if (this._t_ct != rt[1]) {
						rt = this._find_styleName(ds_style2, "type", cell_type, this._t_ct);
					}
					this._t_ct = rt[1];
					cellStyle += "type:" + style_name;

					var longdate_flag = false;
					if (cell_type.indexOf("date") > -1 && (this._checkExpr(cell.locale) || this._checkExpr(cell.calendardateformat))) {
						sFlag = true;
						if (cell.calendardateformat == "LONGDATE") {
							longdate_flag = true;
						}
					}

					if (row_suppress_count) {
						rt = this._find_styleName(ds_style, "rowsuppress", row_suppress_count, this._sm_ct);
						style_name = rt[0];
						if (this._sm_ct != rt[1]) {
							rt = this._find_styleName(ds_style2, "rowsuppress", row_suppress_count, this._sm_ct);
						}
						this._sm_ct = rt[1];
						cellStyle += ",rowsuppress:" + style_name;
					}
					if (col_suppress_count) {
						rt = this._find_styleName(ds_style, "colsuppress", col_suppress_count, this._sm_ct);
						style_name = rt[0];
						if (this._sm_ct != rt[1]) {
							rt = this._find_styleName(ds_style2, "colsuppress", col_suppress_count, this._sm_ct);
						}
						this._sm_ct = rt[1];
						cellStyle += ",colsuppress:" + style_name;
					}

					rt = this._find_styleName(ds_style, "style", cellStyle, this._s_ct);
					style_name = rt[0];
					if (this._s_ct != rt[1]) {
						rt = this._find_styleName(ds_style2, "style", cellStyle, this._s_ct);
					}
					this._s_ct = rt[1];

					var display_text = this._getCellText(grid, k, j);
					val = emptyCellFlag ? "" : display_text;

					if (longdate_flag) {
						cell.calendardateformat = "SHORTDATE";
						val = cell._getDisplayText_date(k);
						cell.calendardateformat = "LONGDATE";
					}

					var displaytype = grid.getCellProperty("body", j, "displaytype");
					if (displaytype == "imagecontrol") {
						var expImg = this.exportimage.toLowerCase();
						if (expImg == "url" || expImg == "image") {
							var path = this._getCellText(grid, k, j);

							if (path) {
								var url = nexacro._getURIValue(path);
								val = nexacro._getImageLocation(url, this._getForm()._getFormBaseUrl());
							}
							else {
								val = path;
							}
						}
						else {
							val = "";
						}
					}

					var delimiter = String.fromCharCode(29);

					if (this._exportmerge == 1) {
						if (cell.suppress > 0) {
							if (suppress_infos[k].text_proc) {
								val = "";
							}
						}

						if (!!grid._checkFakeMerge(cell, k)) {
							val = "";
							var merge_data = this._merge_datas && this._merge_datas[k + "_" + j];
							if (merge_data) {
								if (merge_data.isFakeStart) {
									if (alignCell == "left,top") {
										val = display_text;
									}
									else {
										var temp_align = alignCell.split(",");
										var merge_str = merge_data[temp_align[1]] + "_" + merge_data[temp_align[0]];
										if (this._merge_datas[merge_str]) {
											this._merge_datas[merge_str].disPlayText = display_text;
											this._merge_datas[merge_str].showText = true;
										}
										else {
											this._merge_datas[merge_str] = {
												disPlayText : display_text, 
												showText : true
											};
										}
									}
								}
								else if (merge_data.showText) {
									val = merge_data.disPlayText;
								}
							}
						}
					}

					if (exportObj._is_orgval) {
						val = nexacro._isNumber(val) ? val : nexacro._isDecimal(val) ? val : nexacro._nvl(val, "");
					}
					else {
						val = nexacro._nvl(val, "");
					}

					ds.setColumn(idx, "Column" + (j + subcnt), val + delimiter + (sFlag || (is_selected && activate_select_style) ? style_name : ""));

					if (cell._subcells.length) {
						var subCell = cell._subcells;
						var subL = subCell.length;
						var rsp = cell._rowspan - 1;
						var csp = cell._colspan - 1;

						var subline = "";
						var line = this._getCellStyle(cell, k, odd, "border", status);
						var d_BLColor = this._d_BLColor;
						if (this._applyL) {
							linecolor = this._getHEXtoRGB(line.right.color) + (line.right.style == "solid" ? "" : "," + line.right.style);
						}
						else {
							linecolor = d_BLColor;
						}

						var lLine;
						var tLine;
						var rLine;
						var bLine;

						for (var i = 0; i < subL; i++) {
							var sbc = subCell[i]._col;
							var sbr = subCell[i]._row;
							if (sbc == csp) {
								rLine = linecolor;
							}
							else {
								rLine = "empty";
							}
							if (sbc == 0) {
								lLine = d_BLColor;
							}
							else {
								lLine = "empty";
							}
							if (sbr == rsp) {
								bLine = linecolor;
							}
							else {
								bLine = "empty";
							}
							if (sbr == 0) {
								tLine = d_BLColor;
							}
							else {
								tLine = "empty";
							}

							subline = lLine + ":" + tLine + ":" + rLine + ":" + bLine;

							var cell_type = this._getFixedCellType(subCell[i], 0);
							style_name = this._makeforDsStyle(ds_style, alignCell, backgroundCell, colorCell, fontCell, subline, cell_type);

							if (i != 0) {
								ds.addColumn("Column" + (jj + subcnt), "String", 256);
								subcnt++;
							}

							var val = subCell[i]._getDisplayText(k);
							if (exportObj._is_orgval) {
								var cellinfo = subCell[i]._refobj;
								if (cellinfo) {
									val = cellinfo._getValue(k);
								}
							}

							ds.setColumn(idx, "Column" + (j + subcnt), val + delimiter + style_name);
						}
					}
				}
				rr++;
			}
			this._preStartRow = this._startRow;
			this._startRow = partitionRow;
		}

		ds_command.setColumn(0, "eof", this._eof);

		if (this._ds_response) {
			delete this._ds_response;
		}

		this._ds_response = new Dataset("RESPONSE");

		this._rollbackSuppressInfo();

		if (export_dsparam != undefined) {
			this._transaction(this.id, exportObj._exporturl, "COMMAND=_ds_command STYLE=_ds_style2 CELL=_ds_cell" + " " + export_dsparam, "_ds_response=RESPONSE", export_param, "_exportCallback", true, exportObj._commdataformat, exportObj._commcompress);
		}
		else {
			this._transaction(this.id, exportObj._exporturl, "COMMAND=_ds_command STYLE=_ds_style2 CELL=_ds_cell", "_ds_response=RESPONSE", export_param, "_exportCallback", true, exportObj._commdataformat, exportObj._commcompress);
		}
		this._updateBarPos(exportObj, exportObj.exporteventtype);
	};


	_pExportItem._onHttpTransactionError = function (obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri, extramsg) {
		var ret = false;
		var commerrorobj = nexacro.MakeCommunicationError(this, errortype, url, returncode, requesturi, locationuri, extramsg);
		if (bfireevent) {
			ret = this.on_fire_onerror(obj, commerrorobj.name, commerrorobj.message, errorobj, returncode, requesturi, locationuri);
		}

		return ret;
	};

	_pExportItem._exportCallback = function (svcid, errstatus, message) {
		var grid = this.source;
		var exportObj = this.parent;
		var exportbar = exportObj._exportBar;
		if (errstatus < 0) {
			message = nexacro._decodeXml(message);
			this.on_fire_onerror(exportObj, "ObjectError", message, errstatus);
			nexacro._stopTransaction(this, 0);
			if (exportbar) {
				exportbar._hide();
				exportbar._set_pos(0);
				exportbar._set_text("");
			}
			if (grid._hasTree) {
				grid.set_treeinitstatus(this._gridTempInfo.treeinitstatus);
				nexacro.Grid.prototype._recreate_contents_all = exportObj._tempSaveMethod;
				exportObj._tempSaveMethod = null;
				grid._treeIndexes = this._gridTempInfo.treeIndexes;
				grid._treeStates = this._gridTempInfo.treeStates;
				grid.enableevent = this._gridTempInfo.enableevent;
				this._gridTempInfo = null;
			}
		}
		else {
			var item_id = this._ds_response.getColumn(0, "item");

			this._instanceId = this._ds_response.getColumn(0, "instanceid");
			var excelURL = this._ds_response.getColumn(0, "url");
			if (excelURL != null && excelURL != "") {
				exportObj._fileURL = excelURL;
			}

			var itemIndex = exportObj._itemsIndex;
			var is_finish = itemIndex + 1 == exportObj._allCount;
			var is_end = this._startRow == this._bodyRowCnt;
			this._seq++;

			if (is_end) {
				if (is_finish) {
					var completemessage = exportObj.exportmessagecomplete;
					if (completemessage) {
						exportbar._set_text(completemessage);
					}
					if (exportbar) {
						exportbar._hide();
						exportbar._set_pos(0);
						exportbar._set_text("");
					}


					this._tmpSuppressInfos = null;
					exportObj._fileURL = "";
					exportObj._allRowCount = 0;
					exportObj._progress_pos = 0;
					exportObj._itemsIndex = 0;

					var exportfilename_;
					if (excelURL != null && excelURL != "") {
						var index_ = excelURL.lastIndexOf("/");
						if (index_ == -1) {
							index_ = excelURL.lastIndexOf("\\");
						}
						if (index_ != -1) {
							exportfilename_ = excelURL.substring(index_ + 1);
						}
					}

					var application = nexacro.getApplication();
					if (application) {
						application._endCommProgress();
					}

					this.on_fire_onsuccess(exportObj, this, excelURL);
					switch (exportObj.exporttype) {
						case nexacro.ExportTypes.EXCEL:
						case nexacro.ExportTypes.EXCEL97:
							exportfilename_ = exportObj.exportfilename;
							exportfilename_ += ".xls";
							break;
						case nexacro.ExportTypes.EXCEL2007:
							exportfilename_ = exportObj.exportfilename;
							exportfilename_ += ".xlsx";
							break;
						case nexacro.ExportTypes.HANCELL2010:
						case nexacro.ExportTypes.HANCELL2014:
							exportfilename_ = exportObj.exportfilename;
							exportfilename_ += ".cell";
							break;
					}
					nexacro._download(excelURL, exportObj._hidden_frame_handle, exportfilename_);
				}
				else {
					exportObj._itemsIndex++;
					if (exportObj._itemsIndex == exportObj._gCount) {
						;
					}
					else {
						exportObj._grids[exportObj._itemsIndex]._gridItemExport(exportObj);
					}
				}
				this._instanceId = "";
				this._startRow = 0;
				this._seq = 1;
				this._eof = false;
				this._selectcount = 0;
				if (grid._hasTree) {
					grid.set_treeinitstatus(this._gridTempInfo.treeinitstatus);
					nexacro.Grid.prototype._recreate_contents_all = exportObj._tempSaveMethod;
					exportObj._tempSaveMethod = null;
					grid._treeIndexes = this._gridTempInfo.treeIndexes;
					grid._treeStates = this._gridTempInfo.treeStates;
					grid.enableevent = this._gridTempInfo.enableevent;
					this._gridTempInfo = null;
				}
			}
			else {
				this._gridExportContinue(exportObj);
			}
		}
	};

	_pExportItem._makeMergeDatas = function (grid, format_body_rowcount, col_len) {
		var row_len = format_body_rowcount;
		var merge_datas = this._merge_datas = {
		};
		var merge_end_row, merge_end_col, row_merge_count, col_merge_count;
		var fake_mergecell, end_row, last_row, end_subrow, start_subrow, temp;
		last_row = end_row = end_subrow = start_subrow = temp = 0;
		var rowspan, colspan, top_row, middle_row, bottom_row, left_col, center_col, right_col, start_col, end_col, start_row;
		var rowcount = grid._getGridRowCount() - 1;

		for (var i = 0, len = grid._fake_mergecell_arr.length; i < len; i++) {
			fake_mergecell = grid._fake_mergecell_arr[i];

			if (fake_mergecell.start_subrow != null) {
				start_subrow = fake_mergecell.start_subrow;
			}

			if (fake_mergecell.end_subrow != null) {
				end_subrow = fake_mergecell.end_subrow;
			}

			if (fake_mergecell.end_row > rowcount) {
				last_row = end_row = rowcount;
				end_subrow = row_len - 1;
			}
			else {
				last_row = end_row = fake_mergecell.end_row;
				end_subrow = fake_mergecell.end_subrow;
			}

			if (fake_mergecell.start_row == -1) {
				row_len = grid._curFormat._headrows ? grid._curFormat._headrows.length : 0;
				end_row = start_row = 0;
			}
			else if (fake_mergecell.start_row == -2) {
				row_len = grid._curFormat._summrows ? grid._curFormat._summrows.length : 0;
				end_row = start_row = 0;
			}
			else {
				start_row = fake_mergecell.start_row;
			}

			rowspan = (row_len * end_row + fake_mergecell.end_subrow) - (row_len * start_row + start_subrow) + 1;
			colspan = fake_mergecell.end_column - fake_mergecell.start_column + 1;

			var temp = ((row_len * start_row + start_subrow + 1) + (row_len * end_row + fake_mergecell.end_subrow + 1)) / 2 << 0;
			top_row = fake_mergecell.start_row;
			middle_row = (temp - 1) / row_len << 0;
			bottom_row = last_row;

			start_col = col_len * start_subrow + fake_mergecell.start_column;
			end_col = col_len * fake_mergecell.end_subrow + fake_mergecell.end_column;

			left_col = ((temp - 1) % row_len * col_len + fake_mergecell.start_column) << 0;
			center_col = ((temp - 1) % row_len * col_len + (fake_mergecell.start_column + fake_mergecell.end_column) / 2) << 0;
			right_col = ((temp - 1) % row_len * col_len + fake_mergecell.end_column) << 0;

			if (fake_mergecell.start_row < 0) {
				middle_row = fake_mergecell.start_row;
			}

			merge_datas[top_row + "_" + start_col] = {
				isFakeStart : true, 
				left : left_col, 
				center : center_col, 
				right : right_col, 
				top : top_row, 
				middle : middle_row, 
				bottom : bottom_row, 
				rowspan : rowspan, 
				colspan : colspan
			};

			merge_datas[bottom_row + "_" + end_col] = {
				isFakeEnd : true, 
				rowspan : rowspan, 
				colspan : colspan
			};
		}
	};

	_pExportItem._gridItemExport = function (exportObj) {
		var uiType = exportObj._exportuitype;
		if (exportObj.exporteventtype != "none" && uiType) {
			var exportbar = exportObj._exportBar;
			if (!exportbar || exportbar._uitype != uiType) {
				exportbar = exportObj._exportBar = exportObj._getExportBar(uiType);
				var str = exportObj._getProcessStr(exportObj.count(), exportObj._allRowCount, exportObj._allRowCount);
				str = nexacro._getLongerStr(str, exportObj.exportmessagecomplete, exportObj.exportmessageready);
				var font = exportbar.font || exportbar._getCurrentStyleInheritValue("font");
				var tSize = nexacro._getTextSize(str, font);
				exportbar._textWidth = tSize[0];
				exportbar._textHeight = tSize[1];
			}

			if (exportObj._itemsIndex == 0 && exportObj.exportmessageready != "") {
				exportbar._set_text(exportObj.exportmessageready);
			}
			exportbar._show();
		}

		var grid = this.source;
		var cur_fomat_col_len = grid._curFormat._cols ? grid._curFormat._cols.length : 0;
		var cur_fomat_row_len = grid._curFormat._bodyrows ? grid._curFormat._bodyrows.length : 0;

		if (grid._hasTree) {
			this._gridTempInfo = {
			};
			exportObj._tempSaveMethod = nexacro.Grid.prototype._recreate_contents_all;
			nexacro.Grid.prototype._recreate_contents_all = nexacro._emptyFn;
			this._gridTempInfo.enableevent = grid.enableevent;
			grid.enableevent = false;
			this._gridTempInfo.treeIndexes = grid._treeIndexes.slice(0);
			this._gridTempInfo.treeStates = grid._treeStates.slice(0);
			this._gridTempInfo.treeinitstatus = grid.treeinitstatus;
			grid.set_treeinitstatus("expand,all");
		}

		if (grid._is_use_fakemerge) {
			this._makeMergeDatas(grid, cur_fomat_row_len, cur_fomat_col_len);
		}

		var ds_style = new Dataset("STYLE");
		this._ds_style = ds_style;

		ds_style.addColumn("type", "String", 10);
		ds_style.addColumn("name", "String", 32);
		ds_style.addColumn("value", "String", 1024);

		var ds_command = new Dataset("COMMAND");
		this._ds_command = ds_command;

		ds_command.addColumn("command", "String", 32);
		ds_command.addColumn("type", "int", 32);
		ds_command.addColumn("item", "String", 256);
		ds_command.addColumn("seq", "int");
		ds_command.addColumn("startrow", "int", 32);
		ds_command.addColumn("eof", "boolean", 32);
		ds_command.addColumn("instanceid", "String", 256);
		ds_command.addColumn("url", "String", 256);
		ds_command.addColumn("summarytype", "String", 256);
		ds_command.addColumn("range", "String", 32);
		ds_command.addColumn("exportsize", "String", 32);
		ds_command.addColumn("exporthead", "String", 32);
		ds_command.addColumn("exportimage", "String", 32);
		ds_command.addColumn("exportfilename", "String", 32);
		ds_command.addColumn("format", "String", 1024 * 1024);
		ds_command.addColumn("password", "String", 256);

		ds_command.addRow();

		ds_command.setColumn(0, "command", "export");
		ds_command.setColumn(0, "type", exportObj._exporttype);
		ds_command.setColumn(0, "item", grid.id);
		ds_command.setColumn(0, "seq", this._seq);
		ds_command.setColumn(0, "startrow", this._startRow);
		ds_command.setColumn(0, "instanceid", this._instanceId);
		ds_command.setColumn(0, "url", exportObj._fileURL);
		ds_command.setColumn(0, "summarytype", grid.summarytype);

		ds_command.setColumn(0, "range", this.range);
		var is_selectRec = this.exportselect == "selectrecord";
		var is_show_head = grid.selecttype != ("area" || "multiarea" || "treecell") ? true : false;
		if (is_show_head) {
			if (is_selectRec) {
				if (this._exporthead == "") {
					this._exporthead = "nohead, nosumm";
					this._applyHead = false;
					this._applySumm = false;
				}
				this._exportmerge = false;
			}
		}
		else {
			this._exporthead = "nohead, nosumm";
			this._applyHead = false;
			this._applySumm = false;
		}
		ds_command.setColumn(0, "exportsize", this.exportsize);
		ds_command.setColumn(0, "exporthead", this._exporthead);
		ds_command.setColumn(0, "exportimage", this.exportimage);
		ds_command.setColumn(0, "exportfilename", exportObj.exportfilename);

		var madeformat = nexacro._replaceAll(this._makeFormat(grid), "&#13;", "");
		ds_command.setColumn(0, "format", madeformat);
		ds_command.setColumn(0, "password", exportObj._file_password);

		var ds = new Dataset("CELL");
		this._ds_cell = ds;

		var bodycntcell = grid.getCellCount("body");

		var bodycntrow = this._bodyRowCnt = grid._getGridRowCount();

		var style_name;
		var rt;

		if (this._exportmerge && grid._is_use_suppress && bodycntrow > grid._bodyBand._get_rows().length) {
			this._gridSuppressUpdate(grid, bodycntrow);
		}

		var export_param = null;
		var export_dsparam = null;

		if (bodycntcell > 0) {
			var kk = 0;

			var str_lenth = "";
			var b_row = bodycntrow / 5;
			for (var jj = 0; jj < bodycntcell; jj++) {
				ds.addColumn("Column" + jj, "String", 256);
				str_lenth += this._getCellText(grid, 0, jj);
				str_lenth += this._getCellText(grid, b_row * 2, jj);
				str_lenth += this._getCellText(grid, b_row * 3, jj);
				str_lenth += this._getCellText(grid, b_row * 4, jj);
				str_lenth += this._getCellText(grid, bodycntrow - 1, jj);
			}
			str_lenth = str_lenth.length + 1;
			var partRowCount = this._partitionRow = parseInt(23000 / str_lenth);

			if (partRowCount >= bodycntrow) {
				partRowCount = bodycntrow;
				this._eof = true;
				export_param = this.parent._argsParam;
				export_dsparam = this.parent._argsDsParam;
			}
			else {
				partRowCount = parseInt(partRowCount / 2);
			}

			var cells = grid._curFormat._bodycells;

			var activate_select_style = (this.exportvalue == "selectstyle");
			var is_selected;
			var subcnt;
			for (var k = 0; k < partRowCount; k++) {
				subcnt = 0;

				var val;
				var selectChk = false;
				for (var j = 0; j < bodycntcell; j++) {
					selectChk = selectChk || grid.isSelectedCell(j, "body", k, -9);
				}

				if (selectChk || !is_selectRec) {
					var idx = ds.addRow();
					if (is_selectRec) {
						this._eventExport(exportObj, this.type, k, this._selectcount++);
					}
					else {
						this._eventExport(exportObj, this.type, k);
					}
				}
				else {
					continue;
				}
				var odd = k % 2;

				is_selected = false;
				for (var j = 0; j < bodycntcell; j++) {
					is_selected = grid.isSelectedCell(j, "body", k, -9);
					if (is_selected) {
						var emptyCellFlag = false;
					}
					else {
						if (is_selectRec) {
							emptyCellFlag = true;
						}
					}
					var backgroundCell, alignCell, fontCell, colorCell, lineCell;

					var bodyBand = grid._bodyBand;

					var cell = cells[j];
					var suppress_infos = cell._suppress_infos;
					var style_name = "";
					var selected = false;
					var sFlag = false;

					var cacheA = this._stylecache[j + "align"];

					var cacheL = this._stylecache[j + "line"];
					var cacheB, cacheC, cacheF;


					if (is_selected && activate_select_style) {
						selected = true;
						cacheB = "";
						cacheC = "";
						cacheF = "";
					}
					else {
						if (emptyCellFlag) {
							cacheB = "255,255,255";
							cacheC = "255,255,255";
							var d_BLColor = this._d_BLColor;
							cacheL = d_BLColor + ":" + d_BLColor + ":" + d_BLColor + ":" + d_BLColor;
							sFlag = true;
						}
						else {
							cacheB = this._stylecache[j + "background" + odd];
							cacheC = this._stylecache[j + "color" + odd];
						}
						cacheF = this._stylecache[j + "font"];
					}


					if (cacheB) {
						backgroundCell = cacheB;
					}
					else {
						sFlag = true;
						backgroundCell = nexacro._nvl(this._getHEXtoRGB(this._getCellStyle(cell, k, odd, "background", selected)), "");
					}
					if (cacheA) {
						alignCell = cacheA;
					}
					else {
						sFlag = true;
						alignCell = nexacro._nvl(this._getCellStyle(cell, k, odd, "align", selected), "");
					}
					if (cacheC) {
						colorCell = cacheC;
					}
					else {
						sFlag = true;
						colorCell = nexacro._nvl(this._getHEXtoRGB(this._getCellStyle(cell, k, odd, "color", selected)), "");
					}
					if (cacheF) {
						fontCell = cacheF;
					}
					else {
						sFlag = true;
						fontCell = nexacro._nvl(this._getFitFontValue(this._getCellStyle(cell, k, odd, "font", selected)), "");
					}

					var is_line_changed = false, d_BLColor, right_linecolor = null, bottom_linecolor = null, linecolor;

					var row_suppress_count = 0;
					var col_suppress_count = 0;
					switch (this._exportmerge) {
						case 0:
							break;
						case 1:
							if (cell.suppress > 0) {
								sFlag = is_line_changed = true;
								if (suppress_infos[k].border_proc) {
									bottom_linecolor = "empty";
								}
							}

							grid._checkFakeMerge(cell, k);

							if (cell._fakemerge_infos) {
								var fake_border_str = cell._fakemerge_infos[k + 2];
								if (fake_border_str) {
									sFlag = is_line_changed = true;
									switch (fake_border_str) {
										case "bottomfake":
											bottom_linecolor = "empty";
											break;
										case "rightbottomfake":
											right_linecolor = bottom_linecolor = "empty";
											break;
										case "rightfake":
											right_linecolor = "empty";
											break;
									}
								}
							}
							break;
						case 2:
							if (cell.suppress > 0) {
								sFlag = is_line_changed = true;
								var column_suppress = j + "count";
								var excel_suppress_info = this._excel_suppress_info;
								if (!excel_suppress_info[column_suppress]) {
									excel_suppress_info[column_suppress] = 0;
									alignCell = alignCell.split(",")[0] + ", " + this._suppress_align_table[cell.suppressalign];
								}

								if (suppress_infos[k].border_proc) {
									this._excel_suppress_info[column_suppress]++;
								}
								else {
									row_suppress_count = ++excel_suppress_info[column_suppress];
									excel_suppress_info[column_suppress] = 0;
								}
							}

							var merge_data = this._merge_datas && this._merge_datas[k + "_" + j];
							if (merge_data && merge_data.isFakeEnd) {
								sFlag = is_line_changed = true;
								row_suppress_count = merge_data.rowspan;
								col_suppress_count = merge_data.colspan;
							}
							break;
					}

					if (!is_line_changed && cacheL) {
						lineCell = cacheL;
					}
					else {
						if (this._applyL) {
							var line = this._getCellStyle(cell, k, odd, "border", selected);
							linecolor = this._getHEXtoRGB(line.right.color) + (line.right.style == "solid" ? "" : "," + line.right.style);
							if (!right_linecolor) {
								right_linecolor = linecolor;
							}
							if (!bottom_linecolor) {
								bottom_linecolor = linecolor;
							}
						}
						else {
							bottom_linecolor = right_linecolor = "empty";
						}
						lineCell = "empty:empty:" + right_linecolor + ":" + bottom_linecolor;
					}

					var cell_type = this._getFixedCellType(cell, k);
					style_name = this._makeforDsStyle(ds_style, alignCell, backgroundCell, colorCell, fontCell, lineCell, cell_type, row_suppress_count, col_suppress_count);

					var longdate_flag = false;
					if (cell_type.indexOf("date") > -1 && (this._checkExpr(cell.locale) || this._checkExpr(cell.calendardateformat))) {
						sFlag = true;
						if (cell.calendardateformat == "LONGDATE") {
							longdate_flag = true;
						}
					}

					var display_text = this._getCellText(grid, k, j);
					val = emptyCellFlag ? "" : display_text;

					if (longdate_flag) {
						cell.calendardateformat = "SHORTDATE";
						val = cell._getDisplayText_date(k);
						cell.calendardateformat = "LONGDATE";
					}

					var displaytype = grid.getCellProperty("body", j, "displaytype");
					if (displaytype == "imagecontrol") {
						var expImg = this.exportimage.toLowerCase();
						if (expImg == "url" || expImg == "image") {
							var path = this._getCellText(grid, k, j);

							if (path) {
								var url = nexacro._getURIValue(path);
								val = nexacro._getImageLocation(url, this._getForm()._getFormBaseUrl());
							}
							else {
								val = path;
							}
						}
						else {
							val = "";
						}
					}

					var delimiter = String.fromCharCode(29);
					if (this._exportmerge == 1) {
						if (cell.suppress > 0) {
							if (suppress_infos[k].text_proc) {
								val = "";
							}
						}

						if (!!grid._checkFakeMerge(cell, k)) {
							val = "";
							var merge_data = this._merge_datas && this._merge_datas[k + "_" + j];
							if (merge_data) {
								if (merge_data.isFakeStart) {
									if (alignCell == "left,top") {
										val = display_text;
									}
									else {
										var temp_align = alignCell.split(",");
										var merge_str = merge_data[temp_align[1]] + "_" + merge_data[temp_align[0]];
										if (this._merge_datas[merge_str]) {
											this._merge_datas[merge_str].disPlayText = display_text;
											this._merge_datas[merge_str].showText = true;
										}
										else {
											this._merge_datas[merge_str] = {
												disPlayText : display_text, 
												showText : true
											};
										}
									}
								}
								else if (merge_data.showText) {
									val = merge_data.disPlayText;
								}
							}
						}
					}

					if (exportObj._is_orgval) {
						val = nexacro._isNumber(val) ? val : nexacro._isDecimal(val) ? val : nexacro._nvl(val, "");
					}
					else {
						val = nexacro._nvl(val, "");
					}

					ds.setColumn(idx, "Column" + (j + subcnt), val + delimiter + (sFlag || (is_selected && activate_select_style) ? style_name : ""));

					if (cell._subcells.length) {
						var subCell = cell._subcells;
						var subL = subCell.length;
						var rsp = cell._rowspan - 1;
						var csp = cell._colspan - 1;

						var subline = "";
						var line = this._getCellStyle(cell, k, odd, "border", selected);
						var d_BLColor = this._d_BLColor;
						if (this._applyL) {
							linecolor = this._getHEXtoRGB(line.right.color) + (line.right.style == "solid" ? "" : "," + line.right.style);
						}
						else {
							linecolor = d_BLColor;
						}
						var lLine;
						var tLine;
						var rLine;
						var bLine;

						for (var i = 0; i < subL; i++) {
							var sbc = subCell[i]._col;
							var sbr = subCell[i]._row;
							if (sbc == csp) {
								rLine = linecolor;
							}
							else {
								rLine = "empty";
							}
							if (sbc == 0) {
								lLine = d_BLColor;
							}
							else {
								lLine = "empty";
							}
							if (sbr == rsp) {
								bLine = linecolor;
							}
							else {
								bLine = "empty";
							}
							if (sbr == 0) {
								tLine = d_BLColor;
							}
							else {
								tLine = "empty";
							}

							subline = lLine + ":" + tLine + ":" + rLine + ":" + bLine;
							var cell_type = this._getFixedCellType(subCell[i], 0);
							style_name = this._makeforDsStyle(ds_style, alignCell, backgroundCell, colorCell, fontCell, subline, cell_type);

							if (i != 0) {
								ds.addColumn("Column" + (jj + subcnt), "String", 256);
								subcnt++;
							}

							var val = subCell[i]._getDisplayText(k);
							if (exportObj._is_orgval) {
								var cellinfo = subCell[i]._refobj;
								if (cellinfo) {
									val = cellinfo._getValue(k);
								}
							}

							ds.setColumn(idx, "Column" + (j + subcnt), val + delimiter + style_name);
						}
					}
				}
			}
			this._preStartRow = this._startRow;
			this._startRow = partRowCount;
		}
		else {
			this._eof = true;
			export_param = this.parent._argsParam;
			export_dsparam = this.parent._argsDsParam;
		}

		ds_command.setColumn(0, "eof", this._eof);

		if (this._ds_response) {
			delete this._ds_response;
		}

		this._ds_response = new Dataset("RESPONSE");

		this._rollbackSuppressInfo();

		if (export_dsparam != undefined) {
			this._transaction(this.id, exportObj._exporturl, "COMMAND=_ds_command STYLE=_ds_style CELL=_ds_cell" + " " + export_dsparam, "_ds_response=RESPONSE", export_param, "_exportCallback", true, exportObj._commdataformat, exportObj._commcompress);
		}
		else {
			this._transaction(this.id, exportObj._exporturl, "COMMAND=_ds_command STYLE=_ds_style CELL=_ds_cell", "_ds_response=RESPONSE", export_param, "_exportCallback", true, exportObj._commdataformat, exportObj._commcompress);
		}
		return true;
	};

	_pExportItem._transaction = function (id, url, inDatasetsParam, outDatasetsParam, argsParam, callbackFn, isAsync, datatype, isCompress) {
		this._load_manager = new nexacro._LoadManager(this);
		var service = nexacro._getServiceObject(url, true);
		this._load_manager.loadDataModule(url, id, inDatasetsParam, outDatasetsParam, argsParam, callbackFn, isAsync, datatype, isCompress, service);
	};

	_pExportItem._stopTransaction = function () {
		nexacro.Form.prototype._stopTransaction.apply(this, arguments);
	};

	_pExportItem._getDatasetObject = function (queryid) {
		var _ds = this[queryid];
		var form = this.parent.parent;
		if (_ds == null && form) {
			_ds = form._getDatasetObject(queryid);
		}

		if (_ds == null) {
			var app = nexacro.getApplication();
			_ds = app[queryid];
		}

		return _ds;
	};

	_pExportItem._waitCursor = nexacro._emptyFn;

	_pExportItem._removeUrl = function (v) {
		if (v && v.length) {
			var index = v.indexOf("'");
			var end = -1;

			if (index > -1) {
				end = v.lastIndexOf("'");
				v = v.substring(index + 1, end);
			}

			index = v.indexOf("(");
			if (index > -1) {
				end = v.lastIndexOf(")");
				v = v.substring(index + 1, end);
			}
		}
		return v;
	};

	delete _pExportItem;

	nexacro.ExportProgress = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.PopupControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._uitype = 0;
		this.visible = false;

		this.progressbar = null;
		this._textWidth = 0;
		this._textHeight = 0;
	};
	var _pExportProgress = nexacro.ExportProgress.prototype = nexacro._createPrototype(nexacro.PopupControl, nexacro.ExportProgress);

	_pExportProgress._type_name = "ExportProgress";


	_pExportProgress.on_apply_color = function (color) {
		var textbox = this._textbox;
		if (textbox) {
			if (color) {
				textbox.set_color(color);
			}
			else {
				textbox.set_color("");
			}
		}
	};

	_pExportProgress.on_apply_font = function (font) {
		var textbox = this._textbox;
		if (textbox) {
			textbox.set_font(font);
		}
	};

	_pExportProgress.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			switch (this._uitype) {
				case 1:
					var progressbar = new nexacro.ProgressBar("progressbar", 0, 0, 1, 1, null, null, null, null, null, null, this);
					progressbar.createComponent();
					this.progressbar = progressbar;
					var textbox = new nexacro.Static("progressbar:text", 0, 0, 1, 1, null, null, null, null, null, null, this);
					textbox.createComponent();
					this._textbox = textbox;
					break;
				case 2:
					var app = nexacro.getApplication();
					if (app) {
						this.progressbar = app.mainframe.statusbar;
					}
					break;
			}
		}
	};

	_pExportProgress.createCommand = function () {
		return "";
	};

	_pExportProgress.on_created_contents = function (_window) {
		_window = _window || this._getWindow();
		switch (this._uitype) {
			case 1:
				var textbox = this._textbox;
				var progressbar = this.progressbar;
				if (progressbar) {
					progressbar.on_created();
				}
				if (textbox) {
					textbox.on_created();
				}
				break;
			case 2:
				break;
		}
	};

	_pExportProgress.on_change_containerRect = function (width, height) {
		switch (this._uitype) {
			case 1:
				var textbox = this._textbox;
				if (textbox) {
					textbox.move(0, 0, width, height);
					var textwidth = this._textWidth;
					var textheight = this._textHeight;
				}
				var progressbar = this.progressbar;
				if (progressbar) {
					progressbar.move(null, null, width, 20, 0, 0);
				}
				break;
			case 2:
				break;
		}
	};

	_pExportProgress.on_destroy_contents = function () {
		switch (this._uitype) {
			case 1:
				var textbox = this._textbox;
				if (textbox) {
					textbox.destroy();
				}
				this.progressbar.destroy();
				this.progressbar = null;
				break;
			case 2:
				this.textbox = null;
				this.progressbar = null;
				break;
		}
	};



	_pExportProgress._getWindow = function () {
		return nexacro.Component.prototype._getWindow.call(this);
	};

	_pExportProgress.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return true;
	};

	_pExportProgress._on_keydown = function (elem, keycode, altKey, ctrlKey, shiftKey) {
		if (keycode == nexacro.Event.KEY_TAB) {
			elem._event_stop = true;
		}
		else if (keycode == nexacro.Event.KEY_ESC) {
			nexacro._stopTransaction(this, 2);
		}

		return true;
	};


	_pExportProgress._show = function () {
		if (!this._is_created || !this.parent) {
			return;
		}

		var _window = this._getWindow();
		if (_window) {
			var left, top, width, height;

			left = _window.getLeft();
			top = _window.getTop();

			if (_window.frame) {
				var frame = _window.frame;
				width = frame.getOffsetWidth();
				height = frame.getOffsetHeight();
			}
			else {
				width = _window.getClientWidth();
				height = _window.getClientHeight();
			}

			var capture_comp = _window._getCaptureComp(true, true, this);
			if (capture_comp != this) {
				_window._setCaptureLock(this, true, true);
			}

			var cpd = this._getCurrentStylePadding();
			var pWidth = 0;
			var pHeight = 0;
			var _left = 0;
			var _top = 0;

			if (this._uitype == 1) {
				pWidth = (this._textWidth < 100 ? 100 : this._textWidth);
				pHeight = this._textHeight + 22;
				if (cpd) {
					pWidth += cpd.left + cpd.right;
					pHeight += cpd.top + cpd.bottom;
				}
				_left = Math.round((width - pWidth) / 2);
				_top = Math.round((height - pHeight) / 2);
			}

			this.move(_left, _top, pWidth, pHeight, null, null);
			this.set_visible(true);
		}
	};

	_pExportProgress._hide = function () {
		var excelexport = this.parent;
		if (excelexport) {
			var _window = excelexport._getWindow();
			if (_window) {
				_window._releaseCaptureLock(this);

				if (nexacro._resize_popup_inbound == true) {
					var control_elem = this._control_element;
					if (control_elem) {
						control_elem.setElementSize(1, 1);
					}
				}
			}
		}
		if (this._is_created && this._is_alive) {
			this.set_visible(false);
		}
	};

	nexacro._getLongerStr = function (str1, str2, str3) {
		var len = arguments.length;
		if (len < 2) {
			return;
		}

		var str = arguments[0];
		for (var i = 1; i < len; i++) {
			if (str.length < arguments[i].length) {
				str = arguments[i];
			}
		}
		return str;
	};

	_pExportProgress._set_text = function (v) {
		switch (this._uitype) {
			case 1:
				this._textbox.set_text(v);
				break;
			case 2:
				var form = this._getForm();
				form.set_statustext(v);
				break;
		}
	};
	_pExportProgress._set_pos = function (v) {
		switch (this._uitype) {
			case 1:
				if (this.progressbar) {
					this.progressbar.set_pos(v);
				}
				break;
			case 2:
				var comp = this;
				while (comp && !comp._is_top_frame) {
					if (comp._is_frame) {
						comp.statusbar && comp.statusbar.progressbar.set_pos(v);
					}
					comp = comp.parent;
				}
				break;
		}
	};

	delete _pExportProgress;
}
