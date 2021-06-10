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

if (nexacro.StatusBarControl) {
	var _pStatusBar = nexacro.StatusBarControl.prototype;

	_pStatusBar.createCssDesignContents = function () {
		this.set_text("statustext");
		this.set_resizable(true);
	};

	_pStatusBar.updatePreviewPosition = function () {
		this.setOffsetHeight(nexacro.Frame.prototype._defaultstatusheight);

		var form = this.parent;
		var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);

		this.move(offset_left, offset_top);
	};


	delete _pStatusBar;
}
