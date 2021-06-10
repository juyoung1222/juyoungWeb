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

if (nexacro.PopupDiv) {
	nexacro.PopupDiv = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Div.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};
	var _pPopupDiv = nexacro._createPrototype(nexacro.Div, nexacro.PopupDiv);
	nexacro.PopupDiv.prototype = _pPopupDiv;
	_pPopupDiv._type_name = "PopupDiv";

	_pPopupDiv.on_created_contents = function () {
		nexacro.Div.prototype.on_created_contents.call(this);
		this.visible = false;
	};

	_pPopupDiv.createCssDesignContents = function () {
		this.set_text("PopupDiv");
	};

	delete _pPopupDiv;
}
