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

if (nexacro.XPush) {
	var _pXPush = nexacro.XPush.prototype;

	_pXPush = function (id, parent) {
		this.id = this.name = id;
		if (parent) {
			this.parent = parent;
		}

		this._xpush_controller = null;
		this.commandlist = [];
		this.iplist = [];
	};
}
;
