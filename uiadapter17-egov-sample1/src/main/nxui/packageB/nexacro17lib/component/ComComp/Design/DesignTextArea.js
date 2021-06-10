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

if (nexacro.TextArea) {
	var _pTextArea = nexacro.TextArea.prototype;













	_pTextArea.createCssDesignContents = function () {
		this.set_value("TextArea is a\r\nComponent used\r\nto be input text\r\nstrings in many\r\nlines.");
	};

	_pTextArea.updatePreviewPosition = function () {
		var form = this.parent;
		var nWidth = 100;
		var nHeight = 60;

		var offset_left = (form._adjust_width / 2) - (nWidth / 2);
		var offset_top = (form._adjust_height / 2) - (nHeight / 2);

		this.move(offset_left, offset_top, nWidth, nHeight);
	};

	delete _pTextArea;
}
;