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

if (nexacro.StepControl) {
	var _pStepControl = nexacro.StepControl.prototype;

	_pStepControl.stepitemsize = 9;

	_pStepControl.createCssDesignContents = function () {
		this.set_stepcount(3);
		this._redrawStepButton();

		var form = this._form;
		if (form) {
			nexacro.Form.prototype.on_apply_stepalign.call(form, "center middle");
		}
	};

	_pStepControl._on_icon_onload = function (url, width, height) {
		nexacro.StepControl.prototype._on_icon_onload.call(this, url, width, height);

		var form = this._form;
		if (form) {
			nexacro.Form.prototype.on_apply_stepalign.call(form, "center middle");
		}
	};

	delete _pStepControl;
}
