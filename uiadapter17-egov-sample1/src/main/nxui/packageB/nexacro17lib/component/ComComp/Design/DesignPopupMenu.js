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

if (nexacro.PopupMenu) {
	var _pPopupMenu = nexacro.PopupMenu.prototype;
	_pPopupMenu.createCssDesignContents = function () {
		var obj = new Dataset("PopupMenu_innerdataset", this.parent);
		obj._setContents("<ColumnInfo><Column id=\"idcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"captioncolumn\" type=\"STRING\" size=\"256\"/><Column id=\"levelcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"iconcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"enablecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"checkboxcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"hotkeycolumn\" type=\"STRING\" size=\"256\"/><Column id=\"userdatcolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"idcolumn\">1</Col><Col id=\"captioncolumn\">File</Col><Col id=\"levelcolumn\">0</Col><Col id=\"checkboxcolumn\">false</Col><Col id=\"hotkeycolumn\">F</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">2</Col><Col id=\"captioncolumn\">New</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">false</Col><Col id=\"hotkeycolumn\">CTRL+N</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')(</Col></Row><Row><Col id=\"idcolumn\">3</Col><Col id=\"captioncolumn\">Open</Col><Col id=\"levelcolumn\">1</Col><Col id=\"hotkeycolumn\">CTRL+O</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">4</Col><Col id=\"captioncolumn\">Project</Col><Col id=\"levelcolumn\">2</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+P</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">5</Col><Col id=\"captioncolumn\">File..</Col><Col id=\"levelcolumn\">2</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+F</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">6</Col><Col id=\"captioncolumn\">Save</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+S</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">7</Col><Col id=\"captioncolumn\">Exit</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">false</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+E</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">8</Col><Col id=\"captioncolumn\">Edit</Col><Col id=\"levelcolumn\">0</Col><Col id=\"enablecolumn\">false</Col><Col id=\"hotkeycolumn\">E</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">9</Col><Col id=\"captioncolumn\">Cut</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+X</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">10</Col><Col id=\"captioncolumn\">Copy</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+C</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">copy</Col></Row><Row><Col id=\"idcolumn\">11</Col><Col id=\"captioncolumn\">Undo</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">false</Col><Col id=\"hotkeycolumn\">CTRL+U</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">undo</Col></Row><Row><Col id=\"idcolumn\">12</Col><Col id=\"captioncolumn\">View</Col><Col id=\"levelcolumn\">0</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\"></Col></Row><Row><Col id=\"idcolumn\">13</Col><Col id=\"captioncolumn\">1-1</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">14</Col><Col id=\"captioncolumn\">1-2</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\"></Col></Row><Row><Col id=\"idcolumn\">15</Col><Col id=\"captioncolumn\">1-2-1</Col><Col id=\"levelcolumn\">2</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\"></Col></Row><Row><Col id=\"idcolumn\">16</Col><Col id=\"captioncolumn\">1-2-2</Col><Col id=\"levelcolumn\">2</Col><Col id=\"iconcolumn\"></Col><Col id=\"enablecolumn\">true</Col></Row><Row><Col id=\"idcolumn\">17</Col><Col id=\"captioncolumn\">1-2-2-1</Col><Col id=\"levelcolumn\">3</Col><Col id=\"iconcolumn\">titlebar_icon</Col><Col id=\"enablecolumn\">true</Col></Row></Rows>");

		this.set_idcolumn("idcolumn");
		this.set_captioncolumn("captioncolumn");
		this.set_levelcolumn("levelcolumn");
		this.set_iconcolumn("iconcolumn");
		this.set_enablecolumn("enablecolumn");
		this.set_checkboxcolumn("checkboxcolumn");
		this.set_hotkeycolumn("hotkeycolumn");
		this.set_userdatacolumn("userdatacolumn");
		this.parent.addChild(obj.name, obj);
		this.set_innerdataset("PopupMenu_innerdataset");
	};

	_pPopupMenu.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		var form = this.parent;
		var offset_left = (form._adjust_width / 4) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);
		if (this.isPopup()) {
			this.trackPopup(offset_left, offset_top);
		}
		else {
			this.trackPopup(offset_left, offset_top);
		}
		var obj = this._items[0];
		if (obj) {
			obj._changeUserStatus("selected", true);
			this._showPopup(obj);
		}
	};

	_pPopupMenu.updatePreviewPosition = function () {
		var form = this.parent;
		var offset_left = (form._adjust_width / 4) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);
		this.move(offset_left, offset_top);
	};

	_pPopupMenu.destroyCssDesignContents = function () {
		if (this.isPopup()) {
			this._closePopup();
		}
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.destroy();
		}
		var obj = this.parent.removeChild("PopupMenu_innerdataset");
		obj.destroy();
	};

	_pPopupMenu.on_create_contents = function () {
	};

	_pPopupMenu.on_created_contents = function (_window) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (!this._innerdataset && this.innerdataset) {
				this._innerdataset = this._findDataset(this.innerdataset);
				this.on_apply_innerdataset();
			}
			this._createPopupMenu();

			var items = this._lineItems;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i].on_created();
				}
			}
		}
		if (!this._isPreviewMode()) {
			this.set_visible(true);
		}
	};

	_pPopupMenu._createPopupMenu = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._deletePopupMenu(true);
			var ds = this._innerdataset;
			if (ds && this.levelcolumn && this.captioncolumn && this.idcolumn) {
				var top = 0;
				var height = 0;
				var currentstatus = this._status;
				var itemheight = this.itemheight;
				if (itemheight) {
					height = itemheight;
				}

				var index = 0, len = ds.getRowCount();
				var datarow = this.datarow;

				for (var rowlength = datarow; rowlength < len; rowlength++) {
					var level = thislevel = ds.getColumn(rowlength, this.levelcolumn);
					if (level == this.level) {
						var text = ds.getColumn(rowlength, this.captioncolumn);
						var popupmenuitem = new nexacro._PopupMenuItemControl("popupmenuitem", 0, top, 0, height, null, null, null, null, null, null, this);
						popupmenuitem.createComponent();

						top += height;

						popupmenuitem._bindindex = rowlength;
						popupmenuitem.index = index++;
						popupmenuitem.datarow = rowlength;
						popupmenuitem.level = level;

						var enable = ds.getColumn(rowlength, this.enablecolumn);
						popupmenuitem._setEnable(enable === false || enable === "false" ? false : true);

						if (text) {
							popupmenuitem.set_text(text);
						}

						var id = ds.getColumn(rowlength, this.idcolumn);
						if (id) {
							popupmenuitem.id = id;
						}

						var hotkey = ds.getColumn(rowlength, this.hotkeycolumn);
						if (hotkey) {
							popupmenuitem._setHotkey(hotkey);
						}

						var userdata = ds.getColumn(rowlength, this.userdatacolumn);
						if (userdata) {
							popupmenuitem._setUserdata(userdata);
						}
						if (rowlength == ds.getRowCount() - 1) {
							popupmenuitem._canExpand = false;
						}
						else {
							level = +ds.getColumn(rowlength + 1, this.levelcolumn);
							if (level <= this.level) {
								popupmenuitem._canExpand = false;
							}
							else {
								popupmenuitem._setExpandimage();
							}
						}
						this._items.push(popupmenuitem);
					}
					else if (level < this.level) {
						break;
					}
				}
			}
		}
		this._reCalcSize();
	};

	_pPopupMenu.on_created = function (_window) {
		if (!this._is_created) {
			nexacro.Component.prototype.on_created.call(this, _window);
		}
	};

	_pPopupMenu.createComponent = function (bCreateOnly) {
		return nexacro.Component.prototype.createComponent.call(this, bCreateOnly);
	};


	_pPopupMenu.set_visible = function (v) {
		nexacro.Component.prototype.set_visible.apply(this, arguments);
	};

	_pPopupMenu.on_apply_innerdataset = function () {
		this._createPopupMenu();
		this.beforeindex = -1;
		this.beforevalue = "";
		this.beforeText = "";
	};

	_pPopupMenu._reCalcSize = function () {
		var ds = this._innerdataset;
		if (ds && this.captioncolumn) {
			var items = this._items;
			if (!items || items.length == 0) {
				return;
			}

			var len = items.length;
			var currentstatus = this._status;
			var expandtext_width = parseInt(nexacro._getTextSize(">", items[0]._getCurrentStyleInheritValue("font", this._status))[0]);
			var controls_info = this._getControlInfo();
			var textcontrol_width = controls_info[0];
			var hotkeycontrol_width = controls_info[1];
			var maxtextheight = controls_info[2];
			var maxhotkeyheight = controls_info[3];
			var has_expand = controls_info[4];
			var itemborder = controls_info[5];
			var itempadding = controls_info[6];
			var iconimgwidth = controls_info[7];
			var itemheight = controls_info[8];
			var expimgwidth = controls_info[9];
			var expimgheight = 0;
			var chkimgwidth = 0;
			var border = this._getCSSStyleValue("border", currentstatus);
			var padding = this._getCSSStyleValue("padding", currentstatus);

			var itempadding_l = 0, itempadding_r = 0, itempadding_t = 0, itempadding_b = 0;
			if (itempadding) {
				itempadding_l = itempadding.left;
				itempadding_r = itempadding.right;
				itempadding_t = itempadding.top;
				itempadding_b = itempadding.bottom;
			}

			var itemborder_l = 0, itemborder_r = 0, itemborder_t = 0, itemborder_b = 0;
			if (itemborder) {
				if (itemborder._single) {
					itemborder_l = itemborder_r = itemborder_t = itemborder_b = itemborder.top._width;
				}
				else {
					if (itemborder.left) {
						itemborder_l = itemborder.left._width;
					}
					if (itemborder.right) {
						itemborder_r = itemborder.right._width;
					}
					if (itemborder.top) {
						itemborder_t = itemborder.top._width;
					}
					if (itemborder.bottom) {
						itemborder_b = itemborder.bottom._width;
					}
				}
			}

			var border_left = 0, border_top = 0, border_right = 0, border_bottom = 0;
			if (border) {
				border_left = border.left._width;
				border_top = border.top._width;
				border_right = border.right._width;
				border_bottom = border.bottom._width;
			}

			var padding_left = 0, padding_top = 0, padding_right = 0, padding_bottom = 0;
			if (padding) {
				padding_left = padding.left;
				padding_right = padding.right;
				padding_top = padding.top;
				padding_bottom = padding.bottom;
			}


			var item_h = this.itemheight;
			var item_contents_height = 0;
			if (item_h == undefined) {
				item_h = itemheight + itemborder_t + itemborder_b + itempadding_t + itempadding_b;
				item_contents_height = itemheight;
			}
			else {
				item_contents_height = item_h - itemborder_t - itemborder_b - itempadding_t - itempadding_b;
			}
			this._itemheight = item_h;

			var gap = 0, icontextpadding = 0;
			if (this.level == 0) {
				hotkeycontrol_width = 0;
				iconimgwidth = 0;
				chkimgwidth = 0;
				icontextpadding = 0;
			}
			if (!this.checkboxcolumn && !this.iconcolumn) {
				iconimgwidth = 0;
				chkimgwidth = 0;
				icontextpadding = 0;
			}
			var iconwidth = (chkimgwidth ? chkimgwidth : iconimgwidth);
			if (this.level == 0) {
				var item_width = itempadding_l + itempadding_r + (textcontrol_width ? textcontrol_width + gap : 0) + (has_expand ? expimgwidth ? expimgwidth + gap : gap + expandtext_width : 0);
			}
			else {
				var item_width = itempadding_l + itempadding_r + icontextpadding + (iconwidth ? iconwidth : 0) + (textcontrol_width ? textcontrol_width + gap : 0) + (hotkeycontrol_width ? hotkeycontrol_width + gap : 0) + (has_expand ? expimgwidth ? expimgwidth + gap : gap + expandtext_width : 0);
			}
			var popupmenu_width = item_width + padding_left + padding_right + border_left + border_right;
			var items_total_height = this._items_total_height = item_h * len;
			var popupmenu_height = items_total_height + border_top + border_bottom + padding_top + padding_bottom;

			if (this._isPreviewMode()) {
				this.resize(popupmenu_width, popupmenu_height);
			}
			var buttonsize = this.buttonsize | 0;
			var _item_top = buttonsize;

			var icon_x = 0;
			var icon_end_x = icon_x;
			icon_end_x = chkimgwidth == 0 ? iconimgwidth + icon_x : chkimgwidth + icon_x;
			var text_x = icon_x > itempadding_l ? icon_end_x + icontextpadding : icon_end_x;
			var hotkey_x = text_x + textcontrol_width + gap;

			this._setItemControlPosition(icon_x, iconimgwidth, itemheight, text_x, textcontrol_width, maxtextheight, hotkey_x, hotkeycontrol_width, maxhotkeyheight, gap, chkimgwidth, expimgwidth ? expimgwidth : expandtext_width, expimgheight ? expimgheight : 0, item_contents_height);

			var items = this._items;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				item.move(0, _item_top, popupmenu_width, item_h);
				_item_top += item_h;
			}
		}
	};


	delete _pPopupMenu;

	var _pPopupMenuItemControl = nexacro._PopupMenuItemControl.prototype;

	_pPopupMenuItemControl._updateAccessibilityLabel = nexacro._emptyFn;
	delete _pPopupMenuItemControl;
}
