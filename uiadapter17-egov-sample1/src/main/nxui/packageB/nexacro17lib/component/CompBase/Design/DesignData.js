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

if (nexacro.Dataset) {
	var _pDataset = nexacro.Dataset.prototype;


	_pDataset.updatecontrol = false;
	_pDataset._design_updatecontrol = true;
	_pDataset.design_set_updatecontrol = function (v) {
		this._design_updatecontrol = nexacro._toBoolean(v);
	};

	_pDataset.design_get_updatecontrol = function () {
		return this._design_updatecontrol;
	};

	_pDataset._setContents = function (contents) {
		if (contents.length) {
			this._loadFromXMLStr(contents);
			this.rowposition = -1;
		}

		this.updateSortGroup();

		if (this.colcount > 0) {
			this._endLoad(0, "SUCCESS", 3);
		}
	};

	delete _pDataset;
}
