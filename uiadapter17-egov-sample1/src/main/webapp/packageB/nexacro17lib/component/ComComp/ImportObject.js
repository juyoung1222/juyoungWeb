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

if (!nexacro.ExcelImportObject) {
	nexacro.ExcelImportEventInfo = function (obj, id, url, refferObj) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = obj;
		this.fromreferenceobject = refferObj;
		this.url = url;
	};
	var _pExcelImportEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ExcelImportEventInfo, nexacro.ExcelImportEventInfo);
	nexacro.ExcelImportEventInfo.prototype = _pExcelImportEventInfo;
	_pExcelImportEventInfo._type_name = "ExcelImportEventInfo";

	delete _pExcelImportEventInfo;


	nexacro.ExcelImportErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode) {
		this.id = this.eventid = id || "onerror";
		this.fromobject = obj;
		this.fromreferenceobject = errorobj;
		this.errortype = errortype;
		this.errormsg = errormsg;
		this.statuscode = statuscode;
	};
	var _pExcelImportErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.ExcelImportErrorEventInfo);
	nexacro.ExcelImportErrorEventInfo.prototype = _pExcelImportErrorEventInfo;
	_pExcelImportErrorEventInfo._type_name = "ExcelImportErrorEventInfo";

	delete _pExcelImportErrorEventInfo;


	nexacro.ImportTypes = 
		{
		EXCEL : 0x0100, 
		EXCEL97 : 0x0110, 
		EXCEL2007 : 0x0120, 
		HANCELL2014 : 0x0410, 
		CSV : 0x0500
	};


	nexacro.ExcelImportObject = function (name, parent) {
		this.id = this.name = name;

		if (!parent) {
			var app = nexacro.getApplication();
			if (app) {
				parent = app.getActiveForm();
				if (!parent) {
					parent = app.mainframe.childframe.form;
				}
			}
		}
		this.parent = parent;

		var unique_id = this._unique_id = this.parent._unique_id + "_" + this.id;
		if (!nexacro._get_hidden_frame(unique_id, this._hidden_frame_handle)) {
			var ranid = new Date().valueOf().toString();

			nexacro._create_hidden_frame(unique_id, ranid, this._uploadComplete, this);
			nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._hidden_frame_handle);
			nexacro._append_hidden_textitem(unique_id, "ds_command");
		}

		this.onerror = new nexacro.EventListener("onerror");
		this.onsuccess = new nexacro.EventListener("onsuccess");
	};

	var _pExcelImport = nexacro.ExcelImportObject.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.ExcelImportObject);
	_pExcelImport._type_name = "ExcelImportObject";

	_pExcelImport._hidden_frame_handle = null;

	_pExcelImport.importfilemode = "local";
	_pExcelImport._importfilemode = 0;
	_pExcelImport.commcompress = "none";
	_pExcelImport._commcompress = false;
	_pExcelImport.importtype = nexacro.ImportTypes.EXCEL;
	_pExcelImport.importurl = "";
	_pExcelImport._importurl = "";
	_pExcelImport._uploadurl = "";
	_pExcelImport._uploadservlet = "";

	_pExcelImport._fileurl = "";
	_pExcelImport._range = "";
	_pExcelImport._applyAllsheet = false;

	_pExcelImport._responseData = "";
	_pExcelImport._responseRVal = null;
	_pExcelImport._responseLVal = null;
	_pExcelImport._user_data = null;
	_pExcelImport._file_password = null;

	_pExcelImport._importSheet = "";
	_pExcelImport._importStartCell = null;
	_pExcelImport._importEndCell = null;

	_pExcelImport._tran_item = null;
	_pExcelImport._file_url_ds = null;

	_pExcelImport._event_list = 
		{
		"onerror" : 1, 
		"onsuccess" : 1
	};

	_pExcelImport.on_created = nexacro._emptyFn;



	_pExcelImport.set_importtype = function (v) {
		switch ((v + "").toUpperCase()) {
			case "EXCEL":
				v = 0x0100;
				break;
			case "EXCEL97":
				v = 0x0110;
				break;
			case "EXCEL2007":
				v = 0x0120;
				break;
			case "HANCELL2010":
				v = 0x0400;
				break;
			case "HANCELL2014":
				v = 0x0410;
				break;
			case "CSV":
				v = 0x0500;
				break;
		}
		if (v != this.importtype) {
			this.importtype = v;
		}
		return v;
	};

	_pExcelImport.set_importurl = function (v) {
		if (v != this.importurl) {
			this.importurl = v;
			if (v == null) {
				this._importurl = "";
			}
			else {
				var uploadservlet = this._uploadservlet = nexacro._getServiceLocation(v, this.parent._getFormBaseUrl());
				var baseurl = uploadservlet.substring(0, uploadservlet.lastIndexOf("/") + 1);
				this._importurl = baseurl + "XExportImport";
			}
		}
		return v;
	};

	_pExcelImport.set_commcompress = function (v) {
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

	_pExcelImport.set_importfilemode = function (v) {
		if (this.importfilemode != v) {
			this.importfilemode = v;
			this._importfilemode = v == "server" ? 1 : 0;
		}
		return v;
	};

	_pExcelImport._setImportRange = function (range) {
		var obj = {
		};
		if (range) {
			if (range.indexOf("!") > 0) {
				var rg = range.split("!");
				obj.sheet = rg[0];
				var cells = rg[1];
				var temp;
				if (cells.indexOf(":") > 0) {
					cells = cells.split(":");
					temp = this._getExcelRowCol(cells[0]);
					obj.startRow = temp[1] ? temp[1] : "";
					obj.startCol = temp[0] ? temp[0] : "";
					temp = this._getExcelRowCol(cells[1]);
					obj.endRow = temp[1] ? temp[1] : "";
					obj.endCol = temp[0] ? temp[0] : "";
				}
				else {
					temp = this._getExcelRowCol(cells);
					obj.startRow = temp[1] ? temp[1] : "";
					obj.startCol = temp[0] ? temp[0] : "";
					obj.endRow = "";
					obj.endCol = "";
				}
			}
		}
		else {
			obj.sheet = "";
			obj.startRow = "";
			obj.startCol = "";
			obj.endRow = "";
			obj.endCol = "";
		}
		this._range.push(obj);
	};

	_pExcelImport.importData = function (fileurl, range, responseData, userData) {
		this._file_password = null;
		this._fileurl = "";

		if (arguments.length < 3) {
			return false;
		}

		if (!this.importurl) {
			return false;
		}

		var mode = this.importfilemode.toLowerCase();
		if (mode != "server" || !fileurl) {
			this._importfilemode = 0;
		}
		else {
			this._importfilemode = 1;
		}


		if (range) {
			this._range = range;
		}
		else {
			this._range = "";
		}
		var i, r_len, u_len;
		if (responseData) {
			this._responseLVal = [];
			this._responseRVal = [];
			var temp_response = "";

			var responseDatas = responseData.split(",");
			if (responseDatas.length <= 1 && responseDatas[0]) {
				responseDatas = responseDatas[0].split(" ");
			}

			for (i = 0, r_len = responseDatas.length; i < r_len; i++) {
				if (responseDatas[i].length) {
					var responArr = responseDatas[i].match(/[_A-Za-z0-9]+/g);
					this._responseLVal.push(responArr[0]);
					if (responArr[1] == null) {
						responArr[1] = "output" + (i + 1);
					}
					this._responseRVal.push(responArr[1]);
					temp_response += " " + responArr[0] + "=" + responArr[1];

					responArr = null;
				}
			}
			this._responseData = temp_response;
		}

		if (userData) {
			var userDatas = nexacro.replaceAll(userData, " ", "").split(",");
			for (i = 0, u_len = userDatas.length; i < u_len; i++) {
				var dataArr = userDatas[i].split("=");
				if (dataArr[0] == "filepassword") {
					this._file_password = dataArr[1];
					userDatas.splice(i, 1);
					userData = userDatas.join(",");
					break;
				}
			}
		}
		this._user_data = userData;

		if (!this._importfilemode) {
			nexacro._change_inputnode_name(this._input_node, "upfile");
			nexacro._findclick(this._unique_id, "upfile", this, this._hidden_frame_handle);
		}
		else {
			nexacro._change_inputnode_name(this._input_node, "");
			if (this._checkFileName(fileurl)) {
				this._fileurl = fileurl;
				this._requestImport(fileurl);
			}
			else {
				var errormsg = "the file extension is wrong";
				var evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, -1);
				this.on_fire_onerror(this, evt);
				return false;
			}
		}

		return true;
	};

	_pExcelImport.destroy = function () {
		var unique_id = this._unique_id;
		if (this.parent) {
			this.parent.removeChild(this.id);
		}
		if (this._hidden_frame_handle) {
			nexacro._remove_hidden_item(unique_id, "upfile", this._hidden_frame_handle);
			nexacro._remove_hidden_item(unique_id, "ds_command", this._hidden_frame_handle);
			nexacro._destroy_hidden_frame(unique_id, this, this._hidden_frame_handle);
		}

		this._hidden_frame_handle = null;
		this.parent = null;

		return true;
	};

	_pExcelImport.on_fire_onerror = function (obj, e) {
		this._setWaitCursor(false);
		var event = this.onerror;
		if (event && event._has_handlers) {
			event._fireEvent(this, e);
		}
	};

	_pExcelImport.on_fire_onsuccess = function (obj, e) {
		this._setWaitCursor(false);
		var event = this.onsuccess;
		if (event && event._has_handlers) {
			event._fireEvent(this, e);
		}
	};


	_pExcelImport._getExcelRowCol = function (cell) {
		var strLen = cell.length;
		var arr = [];
		for (var i = 0; i < strLen; i++) {
			if (!isNaN(cell[i])) {
				arr.push(cell.substring(0, i));
				arr.push(cell.substring(i));
				break;
			}
		}
		return arr;
	};

	_pExcelImport._transaction = function (id, url, inDatasetsParam, outDatasetsParam, userData, callbackFn, isAsync, datatype, isCompress) {
		this._load_manager = new nexacro._LoadManager(this);
		var service = nexacro._getServiceObject(url, true);
		this._load_manager.loadDataModule(url, id, inDatasetsParam, outDatasetsParam, userData, callbackFn, isAsync, datatype, isCompress, service);
	};

	_pExcelImport._getDataset = function (ds_id) {
		var form = this.parent;
		if (!form) {
			form = this._getForm();
		}

		var r_val = this._responseRVal;
		var len = r_val.length;

		for (var i = 0; i < len; i++) {
			if (r_val[i] == ds_id) {
				return form[this._responseLVal[i]];
			}
		}
		return null;
	};

	_pExcelImport._waitCursor = nexacro._emptyFn;
	_pExcelImport._setParamter = nexacro._emptyFn;
	_pExcelImport._getDatasetObject = function (queryid) {
		var _ds = this[queryid];
		var app = nexacro.getApplication();
		if (_ds == null && this.parent && this.parent != app) {
			_ds = this.parent._getDatasetObject(queryid);
		}

		if (_ds == null) {
			_ds = app[queryid];
		}

		return _ds;
	};

	_pExcelImport._getForm = function () {
		var app = nexacro.getApplication();
		var form;
		if (app) {
			form = app.getActiveForm();
			if (!form) {
				var mainframe = app.getActiveFrame();
				var pThis = this;
				while (pThis && mainframe != pThis) {
					if (!pThis._is_frame) {
						pThis = pThis.parent;
					}
					else if (pThis.form) {
						return pThis.form;
					}
				}
			}
		}
		return form;
	};

	_pExcelImport._isPopupFrame = function () {
		return false;
	};


	_pExcelImport._makeImportFormat = function () {
		var str = "<Import>";
		str += "<Sheets>";



		var sheets = this._range.split("]");
		var s_len = sheets.length - 1;
		s_len = s_len == 0 ? 1 : s_len;
		var properties = "";

		for (var i = 0; i < s_len; i++) {
			str += "<Sheet ";

			properties = sheets[i].match(/[_A-Za-z0-9]+=[\(\)_!:A-Za-z0-9가-힣 \.\-]+/g);

			if (properties == null) {
				var range = sheets[i];
				if (range.indexOf("!") > 0) {
					var range_arr = range.split("!");
					if (range_arr[1].indexOf(":") > 0) {
						var sheet = range_arr[0];
						var rangeitem = range_arr[1].split(":");
						var start_row = rangeitem[0].match(/[0-9]+/);
						var start_col = rangeitem[0].match(/[A-Z]+/);

						var end_row = rangeitem[1].match(/[0-9]+/);
						var end_col = rangeitem[1].match(/[A-Z]+/);

						str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" head=\"' + sheet + '!' + start_col + start_row + ':' + end_col + start_row + '\" body=\"' + sheet + '!' + start_col + (+start_row + 1) + ':' + end_col + end_row + '\" />';
					}
					else {
						str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" Body=\"' + sheets[i] + '\" />';
					}
				}
				else {
					str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" Body=\"' + sheets[i] + '\" />';
				}
			}
			else {
				var tmp_num = 1;
				var flag = false;
				var property = "";
				for (var j = 0, p_len = properties.length; j < p_len; j++) {
					property = properties[j].match(/[\(\)_!:A-Za-z0-9가-힣 \.\-]+/g);

					var property_name = property[0].toLowerCase();

					if (property_name != "command") {
						if (j == 0) {
							str += 'command=\"getsheetdata\" ';
						}
						if (property_name == "output") {
							flag = true;
						}
					}
					str += property_name + "=\"" + property[1] + "\" ";
				}
				if (!flag) {
					str += 'output=\"output' + tmp_num + '\" ';
					tmp_num++;
				}
				str += "/>";
			}
		}

		str += "</Sheets>";
		str += "</Import>";

		return str;
	};

	_pExcelImport._requestImport = function (fileUrl) {
		var ds_command = new nexacro.NormalDataset("COMMAND");
		this._ds_command = ds_command;

		ds_command.addColumn("command", "String", 32);
		ds_command.addColumn("type", "int", 32);
		ds_command.addColumn("url", "String", 256);
		ds_command.addColumn("format", "String", 256);
		ds_command.addColumn("filemode", "String", 256);
		ds_command.addColumn("password", "String", 256);

		ds_command.addRow();

		ds_command.setColumn(0, "command", "import");
		ds_command.setColumn(0, "type", this._importType);
		ds_command.setColumn(0, "url", fileUrl);
		ds_command.setColumn(0, "format", this._makeImportFormat());
		ds_command.setColumn(0, "filemode", this._importfilemode ? "server" : "local");
		ds_command.setColumn(0, "password", this._file_password);


		if (this._ds_response) {
			delete this._ds_response;
		}

		var datasets = this._responseLVal;
		for (var i = 0, d_len = datasets.length; i < d_len; i++) {
			var reponseDS = this.parent[datasets[i]];
			if (reponseDS) {
			}
			else {
				var errormsg = "Dataset is null";
				var evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, -2011);
				this.on_fire_onerror(this, evt);
				return;
			}
		}

		this._file_url_ds = new nexacro.NormalDataset("_file_url_ds", this);

		var tran_item = this._tran_item = new nexacro.TransactionItem(this._importurl, this, this.id, "COMMAND=_ds_command", this._responseData + ", _file_url_ds=IMPORTFILES", this._user_data, 0, true);

		var send_data = tran_item._sendData;
		nexacro._setImportCommand(this._unique_id, "ds_command", this, this._hidden_frame_handle, send_data);

		nexacro._submit(this._unique_id, this._uploadservlet, this._hidden_frame_handle, send_data, fileUrl);
	};

	if (nexacro._Browser == "Runtime") {
		_pExcelImport._uploadComplete = function (status, data, url, errcode, httpcode, locationurl, extramsg) {
			var evt, error_info, fileUrl, unique_id = this._unique_id, code = -1, msg = "", result = null;
			if (status < 0) {
				nexacro._onHttpSystemError(this, true, this, errcode, url, httpcode, url, null, extramsg);

				var errormsg = nexacro._GetSystemErrorMsg(this, errcode);
				evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, 9901);
				this.on_fire_onerror(this, evt);
			}
			else {
				if (data) {
					if (data.indexOf("<!--") == 0) {
						data = nexacro.replaceAll(data, "<!--", "");
						data = nexacro.replaceAll(data, "-->", "");
					}

					result = this._tran_item._deserializeData(data);

					error_info = result[0];
					if (error_info) {
						code = error_info[0];
						msg = error_info[1];
					}
				}
				this._tran_item = null;
				if (code < 0) {
					evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", msg, this, 9901);
					this.on_fire_onerror(this, evt);
				}
				else {
					fileUrl = this._fileurl = this._file_url_ds ? this._file_url_ds.getColumn(0, 3) : null;
					this._file_url_ds = null;
					evt = new nexacro.ExcelImportEventInfo(this, "onsuccess", fileUrl, this);
					this.on_fire_onsuccess(this, evt);
				}
			}
			nexacro._remove_hidden_item(unique_id, "upfile", this._hidden_frame_handle);
			nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._hidden_frame_handle);
		};
	}
	else {
		_pExcelImport._uploadComplete = function (status, data, url) {
			var error_info, evt, fileUrl, code = -1, msg = "", result = null, unique_id = this._unique_id;
			try {
				var xmldoc = nexacro._getXMLDocument(unique_id);
				url = xmldoc.URL ? xmldoc.URL : xmldoc.url;
				if (url == "about:blank") {
					return;
				}

				data = nexacro._getDataFromDOM(xmldoc);
				if ((!data || data.length <= 0) && xmldoc.childNodes[0].data) {
					data = xmldoc.childNodes[0].data;
				}
				else {
					data = nexacro.replaceAll(data, "&amp;", "&");
				}


				result = this._tran_item._deserializeData(data);
				this._tran_item = null;

				error_info = result[0];
				if (error_info) {
					code = error_info[0];
					msg = error_info[1];
				}

				if (code < 0) {
					evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", msg, this, 9901);
					this.on_fire_onerror(this, evt);
				}
				else {
					fileUrl = this._fileurl = this._file_url_ds ? this._file_url_ds.getColumn(0, 3) : null;
					this._file_url_ds = null;
					evt = new nexacro.ExcelImportEventInfo(this, "onsuccess", fileUrl, this);
					this.on_fire_onsuccess(this, evt);
				}
			}
			catch (e) {
				evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", "failed to get", this, 9901);
				this.on_fire_onerror(this, evt);
			}
			nexacro._remove_hidden_item(unique_id, "upfile", this._hidden_frame_handle);
			nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._hidden_frame_handle);
		};
	}

	_pExcelImport._checkFileName = function (str) {
		if (str == null) {
			return false;
		}
		var checkExcel = false;
		var extension = "";
		var index = str.lastIndexOf("\\");
		var filename = str.substring(index + 1);
		var _split = filename.split(".");
		var len = _split.length;
		if (len > 1) {
			extension = _split[len - 1];
			switch (extension) {
				case "xls":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.EXCEL97;
					break;
				case "xlsx":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.EXCEL2007;
					break;
				case "cell":
					checkExcel = true;
					this._importType = this.importtype;
					break;
				case "csv":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.CSV;
					break;
			}
		}
		return checkExcel;
	};

	_pExcelImport._checkUploadFile = function (excel) {
		this._setWaitCursor(true);
		if (this._checkFileName(excel)) {
			this._requestImport(excel);
		}
		else {
			var errormsg = "the file extension is wrong";
			var evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, -1);
			this.on_fire_onerror(this, evt);
		}
	};

	_pExcelImport._setWaitCursor = function (wait_flag) {
		var form = this._getForm();
		if (form) {
			form.setWaitCursor(wait_flag, true);
		}
	};

	_pExcelImport._getWindow = function () {
		var form = this.parent;
		if (form._is_form) {
			return form._getWindow();
		}
		return null;
	};

	_pExcelImport._getWindowHandle = function () {
		var form = this.parent;
		if (form._is_form) {
			return form._getWindowHandle();
		}
		return null;
	};

	_pExcelImport._changeFiles = nexacro._emptyFn;

	delete _pExcelImport;
}
