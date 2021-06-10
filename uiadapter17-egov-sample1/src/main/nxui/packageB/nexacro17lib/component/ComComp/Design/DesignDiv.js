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

if (nexacro.Div) {
	var _pDiv = nexacro.Div.prototype;

	_pDiv.createCssDesignContents = function () {
		this.set_text("Div");
	};

	_pDiv.resetScroll = function () {
		var form = this.form;

		if (form) {
			form.resetScroll();
		}
	};

	delete _pDiv;
}

if (nexacro._InnerForm) {
	var _pInnerForm = nexacro._InnerForm.prototype;
	_pInnerForm.loadForm = nexacro.FormBase.prototype.loadForm;

	delete _pInnerForm;
}
