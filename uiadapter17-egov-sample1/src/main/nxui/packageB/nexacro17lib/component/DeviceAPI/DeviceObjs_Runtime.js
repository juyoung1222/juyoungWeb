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
	if (!nexacro._init_deviceobjs_api) {
		nexacro._init_deviceobjs_api = true;

		nexacro._createFileDialogObject = function (target) {
			return nexacro.__createFileDialogObject(target, target.on_close);
		};
		nexacro._setFileDialogHandleDefaultExtension = function (target, v) {
			return nexacro.__setFileDialogHandleDefaultExtension(target.handle, v);
		};
		nexacro._setFileDialogHandleFilter = function (target, v) {
			return nexacro.__setFileDialogHandleFilter(target.handle, v);
		};
		nexacro._setFileDialogHandleFilterIndex = function (target, v) {
			return nexacro.__setFileDialogHandleFilterIndex(target.handle, v);
		};
		nexacro._setFileDialogHandleAsync = function (target, v) {
			return nexacro.__setFileDialogHandleAsync(target.handle, v);
		};
		nexacro._openFileDialogHandle = function (target, strTitle, constOpenMode, strInitialPath, strFileName) {
			return nexacro.__openFileDialogHandle(target.handle, target._winhandle, strTitle, constOpenMode, strInitialPath, strFileName);
		};

		nexacro._createVirtualFileObject = function (target) {
			return nexacro.__createVirtualFileObject(target, target.on_success, target.on_error);
		};
		nexacro._setVirtualFileHandleAsync = function (target, v) {
			return nexacro.__setVirtualFileHandleAsync(target.handle, v);
		};
		nexacro._openVirtualFileHandle = function (target, strFileName, nOptions) {
			return nexacro.__openVirtualFileHandle(target.handle, strFileName, nOptions);
		};
		nexacro._closeVirtualFileHandle = function (target) {
			return nexacro.__closeVirtualFileHandle(target.handle);
		};
		nexacro._readVirtualFileHandle = function (target, nLength, strCharset) {
			return nexacro.__readVirtualFileHandle(target.handle, nLength, strCharset);
		};
		nexacro._readlineVirtualFileHandle = function (target, strDelimeter, strCharset) {
			return nexacro.__readlineVirtualFileHandle(target.handle, strDelimeter, strCharset);
		};
		nexacro._seekVirtualFileHandle = function (target, nOffset, nOption) {
			return nexacro.__seekVirtualFileHandle(target.handle, nOffset, nOption);
		};
		nexacro._writeVirtualFileHandle = function (target, varData, strCharset) {
			return nexacro.__writeVirtualFileHandle(target.handle, varData, strCharset);
		};
		nexacro._removeVirtualFileHandle = function (target, strDeletePath) {
			return nexacro.__removeVirtualFileHandle(target.handle, strDeletePath);
		};
		nexacro._getFileListVirtualFileHandle = function (target, strPath, strSearchExpr, nOptions) {
			return nexacro.__getFileListVirtualFileHandle(target.handle, strPath, strSearchExpr, nOptions);
		};
		nexacro._getFileSizeVirtualFileHandle = function (target, strfullpath) {
			return nexacro.__getFileSizeVirtualFileHandle(target.handle, strfullpath);
		};
		nexacro._isExistVirtualFileHandle = function (target, isExistPath) {
			return nexacro.__isExistVirtualFileHandle(target.handle, isExistPath);
		};
		nexacro._copyVirtualFileHandle = function (target, path, destpath) {
			return nexacro.__copyVirtualFileHandle(target.handle, path, destpath);
		};
		nexacro._renameVirtualFileHandle = function (target, path, destpath) {
			return nexacro.__renameVirtualFileHandle(target.handle, path, destpath);
		};
		nexacro._createDirectoryVirtualFileHandle = function (target, strPath, bAllCreate) {
			return nexacro.__createDirectoryVirtualFileHandle(target.handle, strPath, bAllCreate);
		};
		nexacro._deleteDirectoryVirtualFileHandle = function (target, strPath, bAllChild) {
			return nexacro.__deleteDirectoryVirtualFileHandle(target.handle, strPath, bAllChild);
		};
		nexacro._renameDirectoryVirtualFileHandle = function (target, strPath, strNewName) {
			return nexacro.__renameDirectoryVirtualFileHandle(target.handle, strPath, strNewName);
		};

		nexacro._showModalSync = function (childframe, str_id, _parent_frame, arr_arg, opener) {
			if (childframe != null) {
				return childframe._showModalSync(str_id, _parent_frame, arr_arg, opener);
			}
		};

		nexacro._showModalWindow = function (childframe, str_id, parent_frame, arr_arg, opener) {
			if (childframe) {
				return childframe._showModalWindow(str_id, parent_frame, arr_arg, opener);
			}
		};

		nexacro._setIconWidget = function (strWidgetId, strWidgetIconPath) {
			var widgetFrame = nexacro._popupframes.get_item(strWidgetId);
			if (widgetFrame && widgetFrame.widget) {
				if (widgetFrame.titlebar != null) {
					widgetFrame.set_icon(strWidgetIconPath);
				}
				else {
					if (strWidgetIconPath) {
						widgetFrame.set_icon(strWidgetIconPath);
						widgetFrame.on_update_style_icon();

						var val = widgetFrame.icon ? widgetFrame.icon._value : "";
						val = nexacro._getURIValue(val);
						val = nexacro._getImageLocation(val, "");
						var result = nexacro._getImageSize(val, function () {
							var attachedWindow = widgetFrame._getWindow();
							nexacro._setWindowHandleIcon(attachedWindow.handle, val);
						}, this);

						if (result != null) {
							var attachedWindow = widgetFrame._getWindow();
							nexacro._setWindowHandleIcon(attachedWindow.handle, val);
						}
					}
				}
			}
		};

		nexacro._setTopmostWidget = function (strWidgetId, bWidgetTopmost) {
			var widgetFrame = nexacro._popupframes.get_item(strWidgetId);
			if (widgetFrame && widgetFrame.widget) {
				var attachedWindow = widgetFrame._getWindow();
				nexacro.__setWindowHandleTopmost(attachedWindow.handle, bWidgetTopmost);
			}
		};
	}
}
