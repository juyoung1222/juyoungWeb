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

if (nexacro.WebBrowser) {
	var _pWebBrowser = nexacro.WebBrowser.prototype;

	_pWebBrowser.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var cellElem = new nexacro.TextBoxElement(control_elem, "icontext");
			this._cell_elem = cellElem;
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);

			cellElem.setElementTextAlign("center");
			cellElem.setElementVerticalAlign("middle");
			this.on_apply_text(this.name);
		}
	};

	_pWebBrowser.on_created_contents = function (win) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.create(win);
		}
	};

	_pWebBrowser.on_destroy_contents = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.destroy();
			this._cell_elem = null;
		}
	};

	_pWebBrowser.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	_pWebBrowser.on_apply_text = function (text) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementText(text);
		}
	};

	_pWebBrowser.createCssDesignContents = function () {
		this.set_text("WebBrowser");
	};

	delete _pWebBrowser;
}

