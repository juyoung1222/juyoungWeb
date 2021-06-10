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

if (!nexacro.Device || nexacro._OS == "Windows" || nexacro._OS == "iOS" || nexacro._OS == "OSX") {
	if (!nexacro._init_deviceobjs_api) {
		nexacro._createFileDialogObject = nexacro._emptyFn;
		nexacro._setFileDialogHandleDefaultExtension = nexacro._emptyFn;
		nexacro._setFileDialogHandleFilter = nexacro._emptyFn;
		nexacro._setFileDialogHandleFilterIndex = nexacro._emptyFn;
		nexacro._setFileDialogHandleAsync = nexacro._emptyFn;
		nexacro._openFileDialogHandle = nexacro._emptyFn;

		nexacro._createVirtualFileObject = nexacro._emptyFn;
		nexacro._setVirtualFileHandleFileName = nexacro._emptyFn;
		nexacro._setVirtualFileHandleFullPath = nexacro._emptyFn;
		nexacro._setVirtualFileHandlePath = nexacro._emptyFn;
		nexacro._openVirtualFileHandle = nexacro._emptyFn;
		nexacro._closeVirtualFileHandle = nexacro._emptyFn;
		nexacro._readVirtualFileHandle = nexacro._emptyFn;
		nexacro._readlineVirtualFileHandle = nexacro._emptyFn;
		nexacro._seekVirtualFileHandle = nexacro._emptyFn;
		nexacro._writeVirtualFileHandle = nexacro._emptyFn;
		nexacro._removeVirtualFileHandle = nexacro._emptyFn;
		nexacro._getFileListVirtualFileHandle = nexacro._emptyFn;
		nexacro._getFileSizeVirtualFileHandle = nexacro._emptyFn;
		nexacro._isExistVirtualFileHandle = nexacro._emptyFn;
		nexacro._copyVirtualFileHandle = nexacro._emptyFn;
		nexacro._renameVirtualFileHandle = nexacro._emptyFn;
		nexacro._createDirectoryVirtualFileHandle = nexacro._emptyFn;
		nexacro._deleteDirectoryVirtualFileHandle = nexacro._emptyFn;
		nexacro._renameDirectoryVirtualFileHandle = nexacro._emptyFn;

		nexacro._showModalSync = nexacro._emptyFn;
		nexacro._showModalWindow = nexacro._emptyFn;

		nexacro._setIconWidget = nexacro._emptyFn;
		nexacro._setTopmostWidget = nexacro._emptyFn;
	}

	if (!nexacro.FileDialog && nexacro._OS != "iOS") {
		nexacro.FileDialog = function (id, parent) {
			this.id = this.name = id;
			if (parent) {
				this.parent = parent;
				var curFrame = parent._getOwnerFrame();
				if (curFrame._window) {
					this._winhandle = curFrame._window.handle;
				}
				else {
					this._winhandle = nexacro._getMainWindowHandle();
				}
			}

			this.defaultextension = true;
			this.filter = "";
			this.filterindex = 0;
			this.async = "true";

			this._event_list = {
				"onclose" : 1, 
				"onerror" : 1
			};

			this.onclose = null;
			this.onerror = null;

			this.handle = nexacro._createFileDialogObject(this);
		};

		nexacro.FileDialog.LOAD = 1;
		nexacro.FileDialog.SAVE = 2;
		nexacro.FileDialog.MULTILOAD = 3;
		nexacro.FileDialog.SELFOLDER = 4;

		var _pFileDialog = nexacro.FileDialog.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.FileDialog);
		_pFileDialog._type_name = "FileDialog";

		_pFileDialog.on_created = function () {
		};

		_pFileDialog.destroy = function () {
			if (this.handle) {
				this.handle = null;
			}

			return true;
		};

		_pFileDialog.set_defaultextension = function (v) {
			if (this.pramck_filedialog_defaultextension(v)) {
				if (typeof (v) != "boolean") {
					if (v.toLowerCase() == 'true') {
						this.defaultextension = true;
					}
					else if (v.toLowerCase() == 'false') {
						this.defaultextension = false;
					}
				}
				else {
					this.defaultextension = v;
				}
				nexacro._setFileDialogHandleDefaultExtension(this, v);

				return true;
			}
			else {
				return false;
			}
		};

		_pFileDialog.set_filter = function (v) {
			if (this.pramck_filedialog_filter(v)) {
				var filterarr = v.split("|");
				var f_len = filterarr.length;
				if (f_len < 2) {
					return false;
				}

				if ((f_len % 2 == 1) && filterarr[f_len - 1] != "") {
					return false;
				}

				var normalize = /[\*].[a-zA-Z0-9가-힣\*]/gi;

				for (var i = 0; i < f_len; i++) {
					if (i % 2 == 1) {
						if (normalize.test(filterarr[i]) == false) {
							return false;
						}
						normalize.lastIndex = 0;
					}
				}
				this.filter = v;
				nexacro._setFileDialogHandleFilter(this, v);

				return true;
			}
			else {
				return false;
			}
		};

		_pFileDialog.set_filterindex = function (v) {
			if (this.pramck_filedialog_numbercheck(v)) {
				this.filterindex = v;
				nexacro._setFileDialogHandleFilterIndex(this, v);

				return true;
			}
			else {
				return false;
			}
		};

		_pFileDialog.set_async = function (v) {
			if (v == "true" || v == "false" || v == true || v == false) {
				this.async = v;
				nexacro._setFileDialogHandleAsync(this, v);

				return true;
			}
			else {
				return false;
			}
		};

		_pFileDialog.open = function (strTitle, constOpenMode, strInitialPath, strFileName) {
			if (strInitialPath == null && strFileName == null) {
				strInitialPath = "%USERAPP%";
				strFileName = "";
			}
			else if (strFileName == null) {
				strFileName = "";
			}
			else if (strFileName != null) {
			}
			else {
				return false;
			}

			if (!this.pramck_filedialogOpen(strTitle, constOpenMode, strInitialPath, strFileName)) {
				return false;
			}

			if (this.filter == "") {
				var filter = "All(*.*)|*.*|";

				this.filter = filter;
				this.set_filter(filter);
			}

			var filterarr = this.filter.split("|");

			if (this.defaultextension == true && this.filterindex >= (filterarr.length / 2)) {
				return false;
			}

			if (this.handle) {
				nexacro._openFileDialogHandle(this, strTitle, constOpenMode, strInitialPath, strFileName);
			}

			return true;
		};

		_pFileDialog.on_close = function (reason, path, virtualfiles) {
			var _virtualFile = virtualfiles;
			var arr = new Array(_virtualFile.length);

			for (var i = 0; i < _virtualFile.length; i++) {
				var obj = new nexacro.VirtualFile("VirtualFile", "");

				obj.filename = _virtualFile[i].filename;
				obj.fullpath = _virtualFile[i].fullpath;
				obj.path = _virtualFile[i].path;
				arr[i] = obj;

				if (obj.handle) {
					obj.handle = null;
				}
			}

			var e = new nexacro.FileDialogEventInfo("onclose", reason, path, arr);
			this.on_fire_onclose(this, e);
		};

		_pFileDialog.on_fire_onclose = function (objFileDialog, eFileDialogEventInfo) {
			if (this.onclose && this.onclose._has_handlers) {
				return this.onclose._fireEvent(this, eFileDialogEventInfo);
			}
			return true;
		};

		_pFileDialog.pramck_filedialog_defaultextension = function (property) {
			if (property == null || typeof (property) == "undefined" || typeof (property) != "boolean") {
				if (property.toLowerCase() == 'true' || property.toLowerCase() == 'false') {
					return true;
				}
				else {
					return false;
				}
			}
			else {
				return true;
			}
		};

		_pFileDialog.pramck_filedialog_filter = function (property) {
			if (property == null || typeof (property) == "undefined" || typeof (property) != "string") {
				return false;
			}
			else {
				return true;
			}
		};

		_pFileDialog.pramck_filedialog_numbercheck = function (property) {
			if (property == null || typeof (property) == "undefined") {
				return false;
			}

			if (!this._publicNumCheck(property)) {
				return false;
			}
			return true;
		};

		_pFileDialog.pramck_filedialogOpen = function (strTitle, constOpenMode, strInitialPath, strFileName) {
			if (strTitle == null || typeof (strTitle) == "undefined") {
				return false;
			}

			if (constOpenMode == null || typeof (constOpenMode) == "undefined") {
				return false;
			}
			else {
				if (!this._publicNumCheck(constOpenMode)) {
					return false;
				}

				if (constOpenMode > 4 || constOpenMode < 1) {
					return false;
				}
			}

			if (strInitialPath == null || typeof (strInitialPath) == "undefined") {
				return false;
			}

			if (strFileName == null || typeof (strFileName) == "undefined") {
				return false;
			}

			return true;
		};

		_pFileDialog._publicNumCheck = function (v) {
			try {
				var strlength = v.toString().split(" ").join("");
			}
			catch (e) {
				return false;
			}

			if (strlength.length == 0) {
				return false;
			}

			try {
				var numberss = Number(v.toString());
			}
			catch (e) {
				return false;
			}

			if ((+numberss) != (+numberss)) {
				return false;
			}

			return true;
		};

		delete _pFileDialog;
	}

	if (!nexacro.FileDialogEventInfo) {
		nexacro.FileDialogEventInfo = function (strEventId, strReason, strPath, arrVirtualfiles) {
			this.eventid = strEventId;
			this.reason = strReason;
			this.path = strPath;
			this.virtualfiles = arrVirtualfiles;
		};
		var _pFileDialogEventInfo = nexacro.FileDialogEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.FileDialogEventInfo);
		_pFileDialogEventInfo._type_name = "FileDialogEventInfo";

		delete _pFileDialogEventInfo;
	}
}

if (!nexacro.Device || nexacro._OS == "Android" || nexacro._OS == "iOS") {
	if (nexacro.Application) {
		nexacro.Application.setIconWidget = function (strWidgetId, strWidgetIconPath) {
			nexacro._setIconWidget(strWidgetId, strWidgetIconPath);
		};

		nexacro.Application.setTopmostWidget = function (strWidgetId, bWidgetTopmost) {
			nexacro._setTopmostWidget(strWidgetId, bWidgetTopmost);
		};
	}
}
