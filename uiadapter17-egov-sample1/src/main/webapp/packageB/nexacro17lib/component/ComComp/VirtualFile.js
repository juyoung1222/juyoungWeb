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

if (!nexacro.VirtualFile) {
	nexacro.VirtualFile = function (id, parent) {
		this.id = this.name = id;
		if (parent) {
			this.parent = parent;
		}

		if (nexacro._OS == "iOS") {
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
		}

		this.filename = "";
		this.fullpath = "";
		this.path = "";
		this.async = "true";

		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1
		};

		this._ref_file = null;

		this.onsuccess = null;
		this.onerror = null;

		this.handle = nexacro._createVirtualFileObject(this);

		if (nexacro._OS == "iOS") {
			var params = '{"strFilename":"' + this.filename + '","fullpath":"' + this.fullpath + '","path":"' + this.path + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"constructor", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
	};

	nexacro.VirtualFile.openRead = 0x0001;
	nexacro.VirtualFile.openWrite = 0x0002;
	nexacro.VirtualFile.openAppend = 0x0010;
	nexacro.VirtualFile.openCreate = 0x1000;
	nexacro.VirtualFile.openText = 0x0100;
	nexacro.VirtualFile.openBinary = 0x0200;

	nexacro.VirtualFile.seekBegin = 0x0000;
	nexacro.VirtualFile.seekCurrent = 0x0001;
	nexacro.VirtualFile.seekEnd = 0x0002;

	nexacro.VirtualFile.findAll = 0x0001;
	nexacro.VirtualFile.findFileOnly = 0x0002;
	nexacro.VirtualFile.findDirectoryOnly = 0x0003;
	nexacro.VirtualFile.findCaseless = 0x0010;

	var _pVirtualFile = nexacro.VirtualFile.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.VirtualFile);
	_pVirtualFile._type_name = "VirtualFile";

	_pVirtualFile.on_created = function () {
	};

	_pVirtualFile.destroy = function () {
		if (this._ref_file) {
			this._ref_file = null;
		}
		if (this.handle) {
			this.handle = null;
		}

		if (nexacro._OS == "iOS") {
			var params = '""';
			var jsonstr;

			delete nexacro.Device._userCreatedObj[this._id];
			jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"destroy", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}

		return true;
	};

	_pVirtualFile.set_filename = function (v) {
		if (this.pramck_virtualproperty(v)) {
			this.filename = v;
			nexacro._setVirtualFileHandleFileName(this, v);

			return true;
		}
		else {
			return false;
		}
	};

	_pVirtualFile.set_fullpath = function (v) {
		if (this.pramck_virtualproperty(v)) {
			this.fullpath = v;
			nexacro._setVirtualFileHandleFullPath(this, v);

			return true;
		}
		else {
			return false;
		}
	};

	_pVirtualFile.set_path = function (v) {
		if (this.pramck_virtualproperty(v)) {
			this.path = v;
			nexacro._setVirtualFileHandlePath(this, v);

			return true;
		}
		else {
			return false;
		}
	};

	_pVirtualFile.set_async = function (v) {
		if (v == "true" || v == "false" || v == true || v == false || nexacro._OS != "iOS") {
			v = nexacro._toBoolean(v);
			this.async = v;
			nexacro._setVirtualFileHandleAsync(this, v);

			return true;
		}
		else {
			return false;
		}
	};

	_pVirtualFile.set_filename = nexacro._emptyFn;
	_pVirtualFile.set_fullpath = nexacro._emptyFn;
	_pVirtualFile.set_path = nexacro._emptyFn;


	_pVirtualFile.open = function (strFileName, constOptions) {
		var nConstOptions = "";
		var fullpath = "";

		if (strFileName == null) {
			nConstOptions = strFileName;
		}
		else if (strFileName != null) {
			nConstOptions = constOptions;
			fullpath = strFileName;

			fullpath = fullpath.split("\\").join("/");
			this.fullpath = fullpath;
			this.set_fullpath(fullpath);
		}
		else {
			return false;
		}

		var index_path = fullpath.lastIndexOf("/");
		if (index_path == -1) {
			index_path = fullpath.lastIndexOf("%");
		}
		var path = fullpath.substring(0, index_path + 1);

		this.path = path;
		this.set_path(path);

		var index_name = fullpath.lastIndexOf("/");
		if (index_name == -1) {
			index_name = fullpath.lastIndexOf("%");
		}
		var filename = fullpath.substring(index_name + 1, fullpath.length);

		this.filename = filename;
		this.set_filename(filename);

		if (!this.pramck_open(path, nConstOptions)) {
			return false;
		}

		if (this.handle) {
			nexacro._openVirtualFileHandle(this, strFileName, nConstOptions);
		}
		else if (nexacro._OS == "iOS" && nexacro._isHybrid && nexacro._isHybrid()) {
			this.strFilename = fullpath;

			var params = "";
			params = '{"strFilename":"' + this.strFilename + '","nOptions":"' + nConstOptions + '"}';

			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"open", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
			var e = new nexacro.VirtualFileEventInfo("onsuccess", 1, "", "", null, 0, true);
			this.on_fire_onsuccess(this, e);
		}

		return true;
	};

	_pVirtualFile.close = function () {
		if (this.handle) {
			nexacro._closeVirtualFileHandle(this);
		}
		if (nexacro._OS == "iOS") {
			var params = '""';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"close", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
	};

	_pVirtualFile.read = function (nLength, strCharset) {
		var _nLen = -1;
		var _strCharset = "utf-8";

		if (arguments.length == 1) {
			_nLen = nLength || -1;
		}
		else if (arguments.length == 2) {
			_nLen = nLength;
			_strCharset = strCharset;
		}

		if (!this.pramck_Read(_nLen)) {
			return false;
		}

		if (this.handle) {
			nexacro._readVirtualFileHandle(this, _nLen, _strCharset);
		}

		if (nexacro._OS == "iOS") {
			var params = '{  "nLength":"' + _nLen;
			params += '", "strCharset":"' + _strCharset;
			params += '"}';

			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"read", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}

		return true;
	};

	_pVirtualFile.readLine = function (strDelimeter, strCharset) {
		var _strDelimeter = "";
		var _strCharset = "utf-8";
		if (arguments.length == 1) {
			_strDelimeter = strDelimeter;
		}
		else if (arguments.length == 2) {
			_strDelimeter = strDelimeter;
			_strCharset = strCharset;
		}
		if (!this.pramck_ReadLine(_strDelimeter)) {
			return false;
		}

		if (this.handle) {
			nexacro._readlineVirtualFileHandle(this, _strDelimeter, _strCharset);
		}

		if (nexacro._OS == "iOS") {
			var params = '{  "strDelimeter":"' + _strDelimeter;
			params += '", "strCharset":"' + _strCharset;
			params += '"}';

			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"readLine", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.seek = function (nOffset, constOption) {
		var _nOffset = "";
		var _nOption = "";

		if (arguments.length == 1) {
			_nOffset = nOffset;
			_nOption = nexacro.VirtualFile.seekCurrent;
		}
		else if (arguments.length == 2) {
			_nOffset = nOffset;
			_nOption = constOption;
		}
		if (!this.paramck_Seek(_nOffset, _nOption)) {
			return false;
		}

		if (this.handle) {
			nexacro._seekVirtualFileHandle(this, _nOffset, _nOption);
		}

		if (nexacro._OS == "iOS") {
			var params = '{  "nOffset":"' + _nOffset;
			params += '", "nOption":"' + _nOption;
			params += '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"seek", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.write = function (varData, strCharset) {
		trace("_pVirtualFile.write, this=" + this + ", varData=" + varData);
		var _varData = varData;
		var _strCharset = "utf-8";

		if (typeof (_varData) == "undefined" || _varData.length == 0) {
			return false;
		}
		if (arguments.length == 2) {
			_strCharset = strCharset;
		}

		if (this.handle) {
			nexacro._writeVirtualFileHandle(this, _varData, _strCharset);
		}

		if (nexacro._OS == "iOS") {
			var params = '{  "varData":"' + _varData;
			params += '", "strCharset":"' + _strCharset;
			params += '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"write", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.remove = function (strFilePath) {
		var _strFilePath = "";
		if (strFilePath instanceof nexacro.VirtualFile) {
			_strFilePath = strFilePath.fullpath;
		}
		else {
			_strFilePath = strFilePath;
		}
		if (!this.pramck_Delete(_strFilePath)) {
			return false;
		}

		if (this.handle) {
			nexacro._removeVirtualFileHandle(this, _strFilePath);
		}

		if (nexacro._OS == "iOS") {
			var deletetPath = "";
			var rootPathCheck = "";
			var iosfilepath = "";

			rootPathCheck = _strFilePath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				iosfilepath = "_userapp_" + _strFilePath.substring(9, _strFilePath.length);
			}
			else {
				var application = nexacro.getApplication();
				if (!application) {
					return false;
				}
				var _filecache = application._getFileCache(strFilePath);
				if (null != _filecache) {
					iosfilepath = "_userapp_" + _filecache;
				}
				else {
					return false;
				}
			}
			deletetPath = iosfilepath;

			var params = '{"strFilePath":"' + deletetPath + '"}';
			var jsonstr = '{"id":' + this._id + ',"div":"VirtualFile", "method":"remove", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.getFileList = function (strPath, strSearchExpr, constOption) {
		var _strPath = strPath;
		var _strSearchExpr = strSearchExpr;
		var nConstOptions = constOption;

		if (typeof (nConstOptions) == "undefined") {
			nConstOptions = nexacro.VirtualFile.findAll;
		}

		if (strPath == null || strSearchExpr == null || !this.pramck_GetFileList(_strPath, _strSearchExpr, nConstOptions)) {
			return false;
		}

		if (arguments.length < 2) {
			return false;
		}

		if (this.handle) {
			nexacro._getFileListVirtualFileHandle(this, _strPath, _strSearchExpr, nConstOptions);
		}

		if (nexacro._OS == "iOS") {
			var params = '{"strPath":"' + _strPath + '" ,"strSearchExpr":"' + _strSearchExpr
				 + '","constOption":"' + nConstOptions + '"}';

			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"getFileList", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.getFileSize = function () {
		var ret = 0;


		{

			ret = nexacro._getFileSize(this, this.fullpath);
		}

		if (nexacro._OS == "iOS") {
			var params;
			var iosfilepath = "";
			var rootPathCheck = this.fullpath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				iosfilepath = "_userapp_" + this.fullpath.substring(9, this.fullpath.length);
			}

			params = '{  "strPath":"' + iosfilepath + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"getFileSize", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}

		return ret;
	};

	_pVirtualFile.isExist = function (strPath) {
		if (!this.pramck_IsExist(strPath)) {
			return false;
		}

		if (this.handle) {
			nexacro._isExistVirtualFileHandle(this, strPath);
		}

		if (nexacro._OS == "iOS") {
			var params = '{  "strPath":"' + strPath + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"isExist", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.copy = function (strSrc, strDest) {
		if (!this.pramck_IsExist(strSrc)) {
			return false;
		}

		if (!this.pramck_IsExist(strDest)) {
			return false;
		}

		if (this.handle) {
			nexacro._copyVirtualFileHandle(this, strSrc, strDest);
		}

		if (nexacro.OS == "iOS") {
			var userapppath = strSrc.substring(0, 9);
			if (userapppath.toLowerCase() == "%userapp%") {
				strSrc = "_userapp_" + strSrc.substring(9, strSrc.length);
			}
			else {
				return false;
			}

			userapppath = strDest.substring(0, 9);
			if (userapppath.toLowerCase() == "%userapp%") {
				strDest = "_userapp_" + strDest.substring(9, strDest.length);
			}

			var params = '{  "path":"' + strSrc + '","destpath":"' + strDest + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"copy", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.rename = function (strOldname, strNewname) {
		if (!this.pramck_IsExist(strOldname)) {
			return false;
		}

		if (!this.pramck_IsExist(strNewname)) {
			return false;
		}

		if (this.handle) {
			nexacro._renameVirtualFileHandle(this, strOldname, strNewname);
		}

		if (nexacro.OS == "iOS") {
			var userapppath = strOldname.substring(0, 9);
			if (userapppath.toLowerCase() == "%userapp%") {
				strOldname = "_userapp_" + strOldname.substring(9, strOldname.length);
			}
			else {
				return false;
			}

			userapppath = strNewname.substring(0, 9);
			if (userapppath.toLowerCase() == "%userapp%") {
				strNewname = "_userapp_" + strNewname.substring(9, strNewname.length);
			}
			else {
				return false;
			}

			var params = '{  "path":"' + strOldname + '","destpath":"' + strNewname + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"rename", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.createDirectory = function (strPath, bAllCreate) {
		if (!this.pramck_IsExist(strPath)) {
			return false;
		}

		if (arguments.length == 1) {
			this.strPath = strPath;
			this.bAllCreate = false;
		}
		else if (arguments.length == 2) {
			this.strPath = strPath;
			this.bAllCreate = nexacro._toBoolean(bAllCreate);
		}
		else {
			return false;
		}

		if (this.handle) {
			nexacro._createDirectoryVirtualFileHandle(this, strPath, this.bAllCreate);
		}

		if (nexacro._OS == "iOS") {
			var strInitialPath = "";
			var rootPathCheck = strPath.substring(0, 9);

			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = "_userapp_" + strPath.substring(9, strPath.length);
			}
			else {
				return false;
			}
			var params = '{  "strPath":"' + strInitialPath
				 + '","bAllCreate":"' + this.bAllCreate + '"}';

			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"createDirectory", "params":' + params + '}';

			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.deleteDirectory = function (strPath, bAllChild) {
		if (!this.pramck_IsExist(strPath)) {
			return false;
		}

		if (arguments.length == 1) {
			this.strPath = strPath;
			this.bAllChild = false;
		}
		else if (arguments.length == 2) {
			this.strPath = strPath;
			this.bAllChild = nexacro._toBoolean(bAllChild);
		}
		else {
			return false;
		}

		if (this.handle) {
			nexacro._deleteDirectoryVirtualFileHandle(this, strPath, this.bAllChild);
		}

		if (nexacro._OS == "iOS") {
			var strInitialPath = "";
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = "_userapp_" + strPath.substring(9, strPath.length);
			}
			else {
				return false;
			}

			var params = '{  "strPath":"' + strInitialPath
				 + '","bAllChild":"' + this.bAllChild + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"deleteDirectory", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.renameDirectory = function (strPath, strNewName) {
		if (!this.pramck_IsExist(strPath)) {
			return false;
		}

		if (!this.paramck_folderName(strNewName)) {
			return false;
		}

		if (strNewName == null) {
			return false;
		}

		this.strPath = strPath;
		this.strNewName = strNewName;

		if (this.handle) {
			nexacro._renameDirectoryVirtualFileHandle(this, strPath, strNewName);
		}

		if (nexacro._OS == "iOS") {
			var params = '{  "strPath":"' + strPath
				 + '","strNewName":"' + strNewName + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"renameDirectory", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		return true;
	};

	_pVirtualFile.on_success = function (reason, textdata, bindata, fileattributelist, filesize, fileisexist) {
		var _textdata = "";
		var _bindata = "";
		var temptxtlen = 0;
		var tempbinlen = 0;

		if (textdata) {
			temptxtlen = textdata.length;
		}
		if (bindata) {
			tempbinlen = bindata.length;
		}

		if (temptxtlen > 0) {
			_textdata = textdata.replace(/\&amp\;/g, "&");
			_textdata = _textdata.replace(/\&lt\;/g, "<");
			_textdata = _textdata.replace(/\&gt\;/g, ">");
			_textdata = _textdata.replace(/\&quot\;/g, "\"");
			_textdata = _textdata.replace(/\&apos\;/g, "'");
			_textdata = _textdata.replace(/\&\#32\;/g, " ");
			_textdata = _textdata.replace(/\&\#13\;/g, "\r");
			_textdata = _textdata.replace(/\&\#10\;/g, "\n");
			_textdata = _textdata.replace(/\&\#9\;/g, "\t");
		}
		else if (tempbinlen > 0) {
			_bindata = bindata.replace(/\&amp\;/g, "&");
			_bindata = _bindata.replace(/\&lt\;/g, "<");
			_bindata = _bindata.replace(/\&gt\;/g, ">");
			_bindata = _bindata.replace(/\&quot\;/g, "\"");
			_bindata = _bindata.replace(/\&apos\;/g, "'");
			_bindata = _bindata.replace(/\&\#32\;/g, " ");
			_bindata = _bindata.replace(/\&\#13\;/g, "\r");
			_bindata = _bindata.replace(/\&\#10\;/g, "\n");
			_bindata = _bindata.replace(/\&\#9\;/g, "\t");
		}

		var e = new nexacro.VirtualFileEventInfo("onsuccess", reason, _textdata, _bindata, fileattributelist, filesize, fileisexist);
		this.on_fire_onsuccess(this, e);
	};

	_pVirtualFile._onsuccess = function (objData) {
		var _textdata = "";
		var _bindata = "";
		var temptxtlen = 0;
		var tempbinlen = 0;

		if (objData.textdata) {
			temptxtlen = objData.textdata.length;
		}
		if (objData.binarydata) {
			tempbinlen = objData.binarydata.length;
		}

		if (temptxtlen > 0) {
			_textdata = objData.textdata.replace(/\&amp\;/g, "&");
			_textdata = _textdata.replace(/\&lt\;/g, "<");
			_textdata = _textdata.replace(/\&gt\;/g, ">");
			_textdata = _textdata.replace(/\&quot\;/g, "\"");
			_textdata = _textdata.replace(/\&apos\;/g, "'");
			_textdata = _textdata.replace(/\&\#32\;/g, " ");
			_textdata = _textdata.replace(/\&\#13\;/g, "\r");
			_textdata = _textdata.replace(/\&\#10\;/g, "\n");
			_textdata = _textdata.replace(/\&\#9\;/g, "\t");
		}
		else if (tempbinlen > 0) {
			_bindata = objData.binarydata.replace(/\&amp\;/g, "&");
			_bindata = _bindata.replace(/\&lt\;/g, "<");
			_bindata = _bindata.replace(/\&gt\;/g, ">");
			_bindata = _bindata.replace(/\&quot\;/g, "\"");
			_bindata = _bindata.replace(/\&apos\;/g, "'");
			_bindata = _bindata.replace(/\&\#32\;/g, " ");
			_bindata = _bindata.replace(/\&\#13\;/g, "\r");
			_bindata = _bindata.replace(/\&\#10\;/g, "\n");
			_bindata = _bindata.replace(/\&\#9\;/g, "\t");
		}

		var e = new nexacro.VirtualFileEventInfo("onsuccess", objData.reason, _textdata, _bindata, nexacro._executeGlobalEvalStr(objData.fileattributelist), objData.filesize, objData.fileisexist);
		this.on_fire_onsuccess(this, e);
	};

	_pVirtualFile.on_fire_onsuccess = function (objAsyncVFile, eAsyncVFileEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eAsyncVFileEventInfo);
		}
		return true;
	};

	_pVirtualFile.on_error = function (errorcode, errormsg) {
		var e = new nexacro.VirtualFileErrorEventInfo("onerror", errorcode, errormsg);
		this.on_fire_onerror(this, e);
	};

	_pVirtualFile._onerror = function (objData) {
		var e = new nexacro.VirtualFileErrorEventInfo("onerror", objData.errorcode, objData.errormsg);
		this.on_fire_onerror(this, e);
	};

	_pVirtualFile.on_fire_onerror = function (objAsyncVFile, eAsyncVFileErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eAsyncVFileErrorEventInfo);
		}
		return true;
	};

	_pVirtualFile.toJSON = function () {
		return nexacro._executeGlobalEvalStr('({"filename":"' + this.filename + '","fullpath":"' + this.fullpath + '","path":"' + this.path + '"})');
	};

	_pVirtualFile.paramck_folderName = function (strName) {
		if (strName == null) {
			return false;
		}

		if (strName.match(/[\"\/:*?<>|]/)) {
			return false;
		}

		return true;
	};

	_pVirtualFile.pramck_virtualproperty = function (property) {
		if (typeof (property) == "undefined" || property == "" || property == null) {
			return false;
		}
		else {
			return true;
		}
	};

	_pVirtualFile.pramck_open = function (strFileName, nOptions) {
		if (nOptions == null) {
			if (typeof (strFileName) == "undefined" || strFileName == "" || strFileName == null) {
				return false;
			}

			if (!this._publicNumCheck(strFileName)) {
				return false;
			}
			return true;
		}

		if (strFileName == null || typeof (strFileName) == "undefined") {
			return false;
		}

		if (nOptions == null || typeof (nOptions) == "undefined") {
			return false;
		}

		if (!this._publicNumCheck(nOptions)) {
			return false;
		}
		return true;
	};

	_pVirtualFile.pramck_Read = function (nLength) {
		if (nLength == null || typeof (nLength) == "undefined") {
			return false;
		}

		if (!this._publicNumCheck(nLength)) {
			return false;
		}
		return true;
	};

	_pVirtualFile.pramck_ReadLine = function (strDelimeter) {
		if (strDelimeter == null || typeof (strDelimeter) == "undefined" || typeof (strDelimeter) != "string") {
			return false;
		}

		return true;
	};

	_pVirtualFile.paramck_Seek = function (nOffset, nOption) {
		if (nOffset == null || typeof (nOffset) == "undefined") {
			return false;
		}

		if (nOption == null || typeof (nOption) == "undefined") {
			return false;
		}

		if (!this._publicNumCheck(nOffset)) {
			return false;
		}
		return true;
	};

	_pVirtualFile.pramck_Delete = function (strFilePath) {
		if (strFilePath == null || typeof (strFilePath) == "undefined" || strFilePath == "") {
			return false;
		}
		else {
			return true;
		}
	};

	_pVirtualFile.pramck_IsExist = function (strPath) {
		if (strPath == null || typeof (strPath) == "undefined" || strPath == "" || typeof (strPath) != "string") {
			return false;
		}
		else {
			return true;
		}
	};

	_pVirtualFile.pramck_GetFileList = function (strPath, strSearchExpr, constOption) {
		if (strPath == null || typeof (strPath) == "undefined" || strPath == "" || typeof (strPath) != "string") {
			return false;
		}

		if (strSearchExpr == null || typeof (strSearchExpr) == "undefined" || strSearchExpr == "" || typeof (strSearchExpr) != "string") {
			return false;
		}

		if (constOption == null || typeof (constOption) == "undefined" || constOption == "") {
			return false;
		}

		if (!this._publicNumCheck(constOption)) {
			return false;
		}
		return true;
	};

	_pVirtualFile._publicNumCheck = function (v) {
		var strlength;
		try {
			strlength = v.toString().split(" ").join("");
		}
		catch (e) {
			return false;
		}

		if (strlength.length == 0) {
			return false;
		}

		var numberss;
		try {
			numberss = Number(v.toString());
		}
		catch (e) {
			return false;
		}

		if ((+numberss) != (+numberss)) {
			return false;
		}

		return true;
	};

	_pVirtualFile._setRefFile = function (file) {
		this._ref_file = file;
		this.filename = file.name;
		if (file.fullpath) {
			this.fullpath = file.fullpath;
		}
	};

	delete _pVirtualFile;
}

if (!nexacro.VirtualFileEventInfo) {
	nexacro.VirtualFileEventInfo = function (strEventId, nReason, strTextdata, strBinarydata, strFilelist, strFilesize, strExist) {
		this.eventid = strEventId;
		this.reason = nReason;
		this.textdata = strTextdata;
		this.binarydata = strBinarydata;


		if (nexacro._OS == "iOS") {
			if (strFilelist != null && typeof (strFilelist) != "undefined") {
				var tempArr = new Array(strFilelist.length);
				for (var i = 0; i < strFilelist.length; i++) {
					tempArr[i] = new nexacro.FileAttribute(strFilelist[i]);
				}
				this.fileattributelist = tempArr;
			}
			else {
				this.fileattributelist = "";
			}
		}
		else {
			var jsonObject = nexacro._executeGlobalEvalStr('(' + strFilelist + ')');
			if (jsonObject == undefined) {
				this.fileattributelist = "";
			}
			else {
				var fileattrlist = jsonObject.fileattrlist;
				var tempArr = new Array(fileattrlist.length);

				for (var i = 0; i < fileattrlist.length; i++) {
					tempArr[i] = new nexacro.FileAttribute(fileattrlist[i]);
				}
				this.fileattributelist = tempArr;
			}
		}
		this.filesize = strFilesize;
		this.fileisexist = strExist;
	};
	var _pVirtualFileEventInfo = nexacro.VirtualFileEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.VirtualFileEventInfo);
	_pVirtualFileEventInfo._type_name = "VirtualFileEventInfo";

	delete _pVirtualFileEventInfo;
}

if (!nexacro.VirtualFileErrorEventInfo) {
	nexacro.VirtualFileErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.id = this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};

	var _pVirtualFileErrorEventInfo = nexacro.VirtualFileErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.VirtualFileErrorEventInfo);
	_pVirtualFileErrorEventInfo._type_name = "VirtualFileErrorEventInfo";

	delete _pVirtualFileErrorEventInfo;
}

if (!nexacro.FileAttribute) {
	nexacro.FileAttribute = function (jsonObj) {
		this.accesstime = jsonObj.accesstime;
		this.createtime = jsonObj.createtime;
		this.filename = jsonObj.filename;
		this.groupid = jsonObj.groupid;
		this.modifytime = jsonObj.modifytime;
		this.size = jsonObj.size;
		this.userid = jsonObj.userid;
		this.isdirectory = jsonObj.isdirectory;
		this.isreadonly = jsonObj.isreadonly;
	};
	var _pFileAttribute = nexacro.FileAttribute.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.FileAttribute);

	_pFileAttribute._type_name = "FileAttribute";

	_pFileAttribute.on_created = function () {
	};

	_pFileAttribute.isDirectory = function () {
		return this.isdirectory;
	};

	_pFileAttribute.isReadOnly = function () {
		return this.isreadonly;
	};

	delete _pFileAttribute;
}
