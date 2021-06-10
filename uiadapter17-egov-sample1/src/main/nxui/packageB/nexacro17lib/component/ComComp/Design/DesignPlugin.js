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


if (nexacro.Plugin) {
	var _pPlugin = nexacro.Plugin.prototype;

	_pPlugin._type_name = "Plugin";

	_pPlugin.classid = "";
	_pPlugin.codebase = "";
	_pPlugin.code = "";
	_pPlugin.archive = "";

	_pPlugin.mimetype = "";
	_pPlugin.pluginsrc = "";
	_pPlugin.pluginpage = "";
	_pPlugin.license = "";
	_pPlugin.lpkpath = "";

	_pPlugin.contents = "";
	_pPlugin.adjustalpha = false;
	_pPlugin.usepersistdata = false;

	_pPlugin.windowed = false;
	_pPlugin.popupstyle = false;

	_pPlugin._obj_id = "";
	_pPlugin._obj_elem = null;
	_pPlugin._params = null;

	_pPlugin._event_params = null;
	_pPlugin._cell_elem = null;


	_pPlugin.set_name = function (id) {
		this.id = this.name = id;
		if (this._cell_elem) {
			this._cell_elem.setElementText(this.id);
		}
	};


	_pPlugin.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var cellElem = new nexacro.TextBoxElement(control_elem, "icontext");
			this._cell_elem = cellElem;
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);

			cellElem.setElementTextAlign("center");
			cellElem.setElementVerticalAlign("middle");
			this.on_apply_text(this.name);

			this.set_border("1px solid #cccccc");
		}
	};

	_pPlugin.on_create_contents_command = function () {
		return this._cell_elem.createCommand();
	};

	_pPlugin.on_attach_contents_handle = function (win) {
		if (this._cell_elem) {
			this._cell_elem.attachHandle(win);
		}
	};

	_pPlugin.on_created_contents = function (win) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.create(win);
		}
	};

	_pPlugin.on_destroy_contents = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.destroy();
			this._cell_elem = null;
		}
	};
	_pPlugin.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	_pPlugin.on_apply_text = function (text) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementText(text);
		}
	};

	_pPlugin.createCssDesignContents = function () {
		this.set_text("Plugin");
	};

	_pPlugin._setContents = function (str) {
	};



	delete _pPlugin;
}
