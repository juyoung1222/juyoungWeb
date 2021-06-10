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

if (nexacro.ListBox) {
	var _pListBox = nexacro.ListBox.prototype;

	_pListBox.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			this._redrawListBoxContents(true);

			if (!this._calc_scroll) {
				this._onRecalcScrollSize();
			}
			else {
				this._cnt_resetscroll++;
				this._onResetScrollBar();
			}
		}
	};

	_pListBox._onRecalcScrollSize = function () {
		var control_elem = this.getElement();
		if (control_elem && this._is_created) {
			var client_w = this._getClientWidth();
			var client_h = this._getClientHeight();

			var scrollWidth = Math.max(this._contents_maxwidth, client_w);
			var scrollHeight = Math.max(this._contents_maxheight, client_h);

			this._calc_scroll = true;

			control_elem.setElementScrollMaxSize(scrollWidth, scrollHeight);

			if (!this._cnt_resetscroll) {
				this._onResetScrollBar();
			}

			this._calc_scroll = false;
			this._cnt_resetscroll = 0;
		}
	};

	_pListBox._redrawListBoxContents = function (bScrollChange, post_call) {
		this._destroyListBoxContents();

		var info = this._innerdataset_info;
		var rowcount = info._rowcount;
		if (rowcount) {
			var itemheight = this._getItemHeight();
			var client_h = this._getClientHeight();
			var page_rowcount = itemheight ? client_h / itemheight : 0;

			if (nexacro._enableaccessibility && (nexacro._isMobile && nexacro._isMobile())) {
				page_rowcount = rowcount;
			}
			this._page_rowcount = Math.ceil(page_rowcount);
			this._page_rowcount_min = Math.floor(page_rowcount);

			var start_index = 0;
			var end_index = 0;
			if (bScrollChange) {
				end_index = rowcount - 1;

				if (end_index >= this._page_rowcount) {
					end_index = this._page_rowcount - 1;
				}
			}
			else {
				start_index = this._get_first_visible_row();
				end_index = this._get_last_visible_row(true);
			}

			this._recalcContentsMaxSize();
			this._createListBoxContents(start_index, end_index);

			if (this.value !== undefined) {
				this.on_apply_value(this.value);
			}
			else if (this.index > -1) {
				this.on_apply_index(this.index);
			}
		}
	};

	_pListBox.createCssDesignContents = function () {
		this.set_codecolumn("codecolumn");
		this.set_datacolumn("datacolumn");
		var ListBox_innerdataset = new nexacro.NormalDataset("ListBox_innerdataset", this.parent);
		ListBox_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">ListItem01</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">ListItem02</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">ListItem03</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">ListItem04</Col></Row><Row><Col id=\"codecolumn\">5</Col><Col id=\"datacolumn\">ListItem05</Col></Row><Row><Col id=\"codecolumn\">6</Col><Col id=\"datacolumn\">ListItem06</Col></Row></Rows>");
		this.set_innerdataset(ListBox_innerdataset);
	};

	_pListBox.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
		this.set_index(1);
	};

	delete _pListBox;


	var _pListBoxItemControl = nexacro._ListBoxItemControl.prototype;

	_pListBoxItemControl.createCssDesignContents = function () {
		this.set_text("ListBoxItemControl");
	};

	_pListBoxItemControl.destroy = function () {
		nexacro.Component.prototype.destroy.call(this);
	};

	delete _pListBoxItemControl;
}
;