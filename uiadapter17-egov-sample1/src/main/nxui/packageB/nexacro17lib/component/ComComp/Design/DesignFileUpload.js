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

if (nexacro.FileUpload) {
	var _pFileUpload = nexacro.FileUpload.prototype;

	_pFileUpload._onRecalcScrollSize = function () {
		var control_elem = this.getElement();
		if (control_elem && this._is_created) {
			var scrollWidth = this._getClientWidth();
			var scrollHeight = this.itemcount * this._getItemHeight();

			if (scrollHeight > this._getClientHeight()) {
				var vscroll = this.vscrollbar;
				if (vscroll) {
					if (!vscroll.visible) {
						scrollWidth -= vscroll._getClientWidth();
					}
				}
				else {
					scrollWidth -= this._getVScrollBarSize();
				}
			}

			this._calc_scroll = true;

			control_elem.setElementScrollMaxSize(scrollWidth, scrollHeight);

			if (!this._cnt_resetscroll) {
				this._onResetScrollBar();
			}

			this._calc_scroll = false;
			this._cnt_resetscroll = 0;
		}
	};

	delete _pFileUpload;

	var _pFileUploadItemControl = nexacro._FileUploadItemControl.prototype;

	_pFileUploadItemControl.on_created_contents = function () {
		this._recalcLayout();

		var fileitemedit = this.fileitemedit;
		if (fileitemedit) {
			fileitemedit.on_created();
		}

		var fileitembutton = this.fileitembutton;
		if (fileitembutton) {
			fileitembutton.on_created();
		}
	};

	_pFileUploadItemControl.on_destroy_contents = function () {
		if (this.fileitemedit) {
			this.fileitemedit.destroy();
			this.fileitemedit = null;
		}
		if (this.fileitembutton) {
			this.fileitembutton.destroy();
			this.fileitembutton = null;
		}

		if (this._files) {
			this._files = null;
		}
		if (this._input_node) {
			this._input_node = null;
		}
	};

	delete _pFileUploadItemControl;
}
;