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


if (nexacro.FlashPlayer) {
	var _pFlashPlayer = nexacro.FlashPlayer.prototype;

	_pFlashPlayer.on_create_contents = function () {
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

	_pFlashPlayer.on_created_contents = function (win) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.create(win);
		}
	};

	_pFlashPlayer.on_destroy_contents = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.destroy();
			this._cell_elem = null;
		}
	};

	_pFlashPlayer.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	_pFlashPlayer.on_apply_text = function (text) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementText(text);
		}
	};

	_pFlashPlayer.createCssDesignContents = function () {
		this.set_text("FlashPlayer");
	};



	delete _pFlashPlayer;
}


