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

if (nexacro.FileDownload) {
	var _pFileDownload = nexacro.FileDownload.prototype;















	_pFileDownload.createCssDesignContents = function () {
		this.set_text("FileDownload");
	};

	delete _pFileDownload;
}
;