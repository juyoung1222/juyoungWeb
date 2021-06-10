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

if (!nexacro._MenuItemControl) {
	nexacro._MenuItemControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Static.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pMenuItemControl = nexacro._createPrototype(nexacro.Static, nexacro._MenuItemControl);
	nexacro._MenuItemControl.prototype = _pMenuItemControl;

	_pMenuItemControl._type_name = "MenuItemControl";
	_pMenuItemControl._is_subcontrol = true;
	_pMenuItemControl._use_selected_status = true;
	_pMenuItemControl.index = 0;
	_pMenuItemControl.datarow = 0;
	_pMenuItemControl._canExpand = true;
	_pMenuItemControl._id = "";
	_pMenuItemControl.enable = true;
	_pMenuItemControl.level = "";
	_pMenuItemControl.userdata = null;
	_pMenuItemControl.accessibilityrole = "menuitem";
	_pMenuItemControl._is_simple_control = false;

	_pMenuItemControl.on_apply_accessibility = function () {
		nexacro.Component.prototype.on_apply_accessibility.call(this);
		this._updateAccessibilityLabel(this);
	};

	_pMenuItemControl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp) {
		var parent = this.parent;
		var popupmenu = parent._popupmenu;
		if (popupmenu) {
			if (popupmenu._is_popup()) {
				if (parent._previtemindex != this.index) {
					parent._previtemindex = this.index;
				}
				popupmenu.cancelPopup();
				parent._menuitemindex = this.index;
				parent._popupitemindex = -1;
			}
		}

		var rootComp = this._getRootComponent(this);
		if (this._canExpand && this._isEnable()) {
			parent._showPopup(this);

			if (rootComp instanceof nexacro.Menu) {
				rootComp._popupitemindex = this.index;
			}
		}
		else {
			var popuptype = rootComp.popuptype;

			if (this.enable == false || popuptype == "none") {
				return;
			}

			if (rootComp.onmenuclick && rootComp.onmenuclick._has_handlers) {
				rootComp.on_fire_onitemclick(rootComp, "onmenuclick", this._id, this.userdata, this.index, this.parent.level);
				rootComp._popupitemindex = -1;
			}
			rootComp._closePopup(true);
		}
		return nexacro.Component.prototype.on_tap_basic_action.call(this, elem, canvasX, canvasY, screenX, screenY, refer_comp);
	};

	_pMenuItemControl.on_getIDCSSSelector = function () {
		return "menuitem";
	};



	_pMenuItemControl._on_dragleave = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = nexacro.Component.prototype._on_dragleave.call(this, elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);

		var rootCom = this._getRootComponent(this);
		if (rootCom.ondragleave) {
			rootCom._last_mouseleave_iteminfo.index = this.index;
			rootCom._last_mouseleave_iteminfo.bindindex = this._bindindex;
			rootCom._last_mouseleave_iteminfo.level = this.parent.level;
		}
		return ret;
	};

	_pMenuItemControl._getTextSize = function (text) {
		var font = this._getCurrentStyleInheritValue("font");
		return nexacro._getTextSize(text, font, undefined, undefined, this.wordWrap, this._getCurrentStyleInheritValue("wordSpacing"), this._getCurrentStyleInheritValue("letterSpacing"));
	};

	_pMenuItemControl._on_apply_mouseover = function (isovered) {
		this._changeStatus("mouseover", isovered);
	};

	_pMenuItemControl._on_apply_selected = function (bflag) {
		this._changeUserStatus("selected", bflag);
	};

	_pMenuItemControl._getWindowPosition = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var elem_pos = nexacro._getElementXYInWindow(control_elem.handle);
			var windowLeft = elem_pos[0];
			var windowTop = elem_pos[1];
			return {
				x : windowLeft, 
				y : windowTop
			};
		}
		return {
			x : 0, 
			y : 0
		};
	};

	_pMenuItemControl._updateAccessibilityLabel = function (item) {
		var rootComp = this._getRootComponent(this);
		if (rootComp && rootComp._innerdataset) {
			var dataLen = rootComp._innerdataset.getRowCount();
			item._setAccessibilityInfoIndex(item.datarow + 1);
			item._setAccessibilityInfoCount(dataLen);
			item._setAccessibilityFlagHasPopup(item._canExpand ? true : false);
		}
	};

	delete _pMenuItemControl;
}

if (!nexacro.Menu) {
	nexacro.MenuClickEventInfo = function (obj, id, itemid, itemuserdata, index, level) {
		this.eventid = id || "onmenuclick";
		this.id = itemid;
		this.fromobject = obj;
		this.fromreferenceobject = obj;
		this.index = index;
		this.level = level;

		this.userdata = itemuserdata;
	};
	var _pMenuClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuClickEventInfo);
	nexacro.MenuClickEventInfo.prototype = _pMenuClickEventInfo;
	_pMenuClickEventInfo._type_name = "MenuClickEventInfo";

	delete _pMenuClickEventInfo;

	nexacro.MenuDragEventInfo = function (obj, id, itemid, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, level, index, bindindex) {
		this.id = itemid;
		this.eventid = id || "onmenudrag";

		if (!from_refer_comp) {
			from_refer_comp = from_comp;
		}

		this.cancelable = true;
		this.bubbles = true;
		this.dragdata = dragdata;
		this.userdata = userdata;
		this.sourceobject = src_comp;
		this.sourcereferenceobject = src_refer_comp;
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altkey = alt_key || false;
		this.ctrlkey = ctrl_key || false;
		this.button = button || "";
		this.shiftkey = shift_key || false;
		this.screenx = screenX || -1;
		this.screeny = screenY || -1;
		this.canvasx = canvasX || -1;
		this.canvasy = canvasY || -1;
		this.clientx = clientX || -1;
		this.clienty = clientY || -1;

		this.level = level;
		this.index = index;
		this.bindindex = bindindex;
	};
	var _pEventMenuDragEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuDragEventInfo);
	nexacro.MenuDragEventInfo.prototype = _pEventMenuDragEventInfo;
	_pEventMenuDragEventInfo._type_name = "MenuDragEventInfo";

	delete _pEventMenuDragEventInfo;

	nexacro.MenuMouseEventInfo = function (obj, id, itemid, strButton, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, level, index, bindindex) {
		this.id = itemid;
		this.eventid = id || "onmenumouse";
		this.cancelable = true;
		this.bubbles = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altkey = altKey || false;
		this.ctrlkey = ctrlKey || false;
		this.button = strButton || "";
		this.shiftkey = shiftKey || false;
		this.screenx = screenX || -1;
		this.screeny = screenY || -1;
		this.canvasx = canvasX || -1;
		this.canvasy = canvasY || -1;
		this.clientx = clientX || -1;
		this.clienty = clientY || -1;

		this.level = level;
		this.index = index;
		this.bindindex = bindindex;
	};

	var _pEventMenuMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuMouseEventInfo);
	nexacro.MenuMouseEventInfo.prototype = _pEventMenuMouseEventInfo;
	_pEventMenuMouseEventInfo._type_name = "MenuMouseEventInfo";

	delete _pEventMenuMouseEventInfo;


	nexacro.Menu = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._items = [];
		this._hot_key_list = [];
		this._items_width = [];
	};

	var _pMenu = nexacro._createPrototype(nexacro.Component, nexacro.Menu);
	nexacro.Menu.prototype = _pMenu;
	_pMenu._type_name = "Menu";

	_pMenu.autohotkey = false;
	_pMenu.captioncolumn = "";
	_pMenu.checkboxcolumn = "";
	_pMenu.enablecolumn = "";
	_pMenu.hotkeycolumn = "";
	_pMenu.iconcolumn = "";
	_pMenu.idcolumn = "";
	_pMenu.levelcolumn = "";
	_pMenu.userdatacolumn = "";
	_pMenu.level = 0;
	_pMenu.innerdataset = null;

	_pMenu.popuptype = "normal";
	_pMenu.popupitemheight = undefined;
	_pMenu.navigationbuttonsize = undefined;
	_pMenu.popupnavigationbuttonsize = undefined;
	_pMenu.buttonalign = "auto";


	_pMenu.accessibilityrole = "menubar";
	_pMenu.accessibilityenable = true;
	_pMenu.accessibilitylabel = "";
	_pMenu.accessibilitydescription = "";
	_pMenu.accessibilityaction = "";
	_pMenu.accessibilitydesclevel = "all";


	_pMenu._menuitemindex = -1;
	_pMenu._menuitemonmouseenter = null;
	_pMenu._popupitemLR = -1;
	_pMenu._popupitemindex = -1;
	_pMenu._popupitempreviousindex = 0;
	_pMenu._previtemindex = 0;
	_pMenu._clickitemindex = 0;
	_pMenu._hotkeytextgap = 20;
	_pMenu._icontextpadding = 5;
	_pMenu._focus_obj = null;

	_pMenu._is_menu_click = false;
	_pMenu._innerdataset = "";
	_pMenu._popupmenu = null;
	_pMenu._want_tab = nexacro._enableaccessibility;
	_pMenu._want_arrow = true;
	_pMenu._items_total_width = 0;
	_pMenu._start_navigation_index = 0;
	_pMenu._end_navigation_index = 0;
	_pMenu._is_navigationbutton_visible = false;
	_pMenu._last_mouseleave_iteminfo = {
		bindindex : -1, 
		index : -1, 
		level : -1
	};

	_pMenu._event_list = 
		{
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkeypress" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondrop" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmenuclick" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"oninnerdatachanged" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};


	_pMenu.on_create_contents = function () {
		this._createMenu(true);
	};

	_pMenu.on_created_contents = function () {
		var control = this.getElement();
		if (control) {
			var i, len, items = this._items;
			if (items) {
				len = this._items.length;
				for (i = 0; i < len; i++) {
					items[i].on_created();
				}
			}

			if (nexacro._enableaccessibility) {
				this._setAccessibilityInfoLevel(this.level);
			}

			if (this._innerdataset && this.enablecolumn) {
				this.on_apply_enablecolumn();
			}
			var hotkey_list = this._hot_key_list;
			if (hotkey_list) {
				for (i = 0, len = hotkey_list.length; i < len; i++) {
					this._registerItemHotkey(hotkey_list[i].key);
				}
			}
			this._relayout();
		}
	};


	_pMenu.on_create_contents_command = function () {
		var str = "";
		var items = this._items;
		if (items) {
			var len = this._items.length;
			for (var i = 0; i < len; i++) {
				str += items[i].createCommand();
			}
		}

		return str;
	};

	_pMenu.on_attach_contents_handle = function (win) {
		var i, len, items = this._items;
		if (items) {
			len = this._items.length;

			for (i = 0; i < len; i++) {
				items[i].attachHandle(win);
			}
		}
		if (this._innerdataset && this.enablecolumn) {
			this.on_apply_enablecolumn();
		}
		var hotkey_list = this._hot_key_list;
		if (hotkey_list) {
			for (i = 0, len = hotkey_list.length; i < len; i++) {
				this._registerItemHotkey(hotkey_list[i].key);
			}
		}
		this._relayout();
	};

	_pMenu.on_destroy_contents = function () {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.destroy();
			popupmenu = null;
		}

		var i, len, items = this._items;
		if (items) {
			len = items.length;
			for (i = 0; i < len; i++) {
				items[i].destroy();
				items[i] = null;
			}
			this._items = null;
		}
		var hotkey_list = this._hot_key_list;
		if (hotkey_list) {
			for (i = hotkey_list.length - 1; i > -1; i--) {
				var item = hotkey_list[i];
				this._unregisterItemHotkey(item.key);
				item = null;
			}
		}

		if (this._items_width) {
			this._items_width.length = 0;
			this._items_width = null;
		}

		this._removeEventHandlerToInnerDataset();

		hotkey_list = null;
		items = null;
	};

	_pMenu._removeEventHandlerToInnerDataset = function () {
		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onload", this._callbackFromDataset, this);
			this._innerdataset._removeEventHandler("onrowposchanged", this._callbackFromDataset, this);
			this._innerdataset._removeEventHandler("oncolumnchanged", this._callbackFromDataset, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._callbackFromDataset, this);
			this._innerdataset._removeEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
			this._innerdataset = null;
		}
	};

	_pMenu.on_change_containerRect = function (width, height) {
		var items = this._items;
		var len = items.length;
		var padding = this._getCSSStyleValue("padding", this._status);

		if (padding) {
			height = height - padding.top - padding.bottom;
		}
		var navigation_visible = this._isNavigationVisible();
		if (navigation_visible) {
			this._showNavigationButton(true);
			this._rearrangeMenuItems();
		}
		else {
			var move_flag = this._end_navigation_index | 0;
			this._end_navigation_index = 0;
			this._showNavigationButton(false);
			var items_width = this._items_width;
			var left = 0;
			for (var i = 0; i < len; i++) {
				var item = items[i];
				var item_width = items_width[i];
				if (move_flag) {
					item.move(left, 0, item_width, height);
					left += item_width;
				}
				else {
					item.resize(item_width, height);
				}
			}
		}
	};

	_pMenu.on_get_accessibility_label = function () {
		return this.text ? this.text : this.id;
	};

	_pMenu._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		var list = this._hot_key_list;
		var len = list.length;
		var key = null;
		var modifykey = null;
		var hotkey = this._hotkey;
		if (hotkey) {
			if (hotkey._keycode == keycode && (((hotkey._modifierkey & 0x02) == 0x02) == altKey) && (((hotkey._modifierkey & 0x01) == 0x01) == ctrlKey) && (((hotkey._modifierkey & 0x04) == 0x04) == shiftKey)) {
				this.setFocus();
				return;
			}
		}

		for (var i = 0; i < len; i++) {
			key = list[i].key;
			if (key._keycode == keycode) {
				modifykey = key._modifierkey;
				if (altKey == ((modifykey & 0x02) == 0x02) && ctrlKey == ((modifykey & 0x01) == 0x01) && shiftKey == ((modifykey & 0x04) == 0x04)) {
					this.setFocus();
					this.on_fire_onitemclick(this, "onmenuclick", list[i]._id, "", list[i].index, list.level);
					break;
				}
			}
		}
	};

	_pMenu._unregisterItemHotkey = function (hotkey) {
		if (!hotkey || !hotkey._is_registered) {
			return;
		}
		var _form = this._getMainForm();
		if (this._is_frame || this == _form) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				nexacro._unregisterHotkeyComp(owner_frame, this, hotkey);
				this._hot_key_list.pop();
			}
		}
		else {
			if (_form) {
				nexacro._unregisterHotkeyComp(_form, this, hotkey);
				this._hot_key_list.pop();
			}
		}
	};

	_pMenu._registerItemHotkey = function (hotkey) {
		if (!hotkey || hotkey._is_registered) {
			return;
		}

		this._setAccessibilityHotKey(this.hotkey);

		var _form = this._getMainForm();
		if (this._is_frame || this == _form) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				nexacro._registerHotkeyComp(owner_frame, this, hotkey);
			}
		}
		else {
			if (_form) {
				nexacro._registerHotkeyComp(_form, this, hotkey);
			}
		}
	};


	_pMenu.on_apply_autohotkey = function (autohotkey) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_autohotkey(autohotkey);
		}
		if (autohotkey == true) {
			var ds = this._innerdataset;
			if (ds) {
				var len = ds.getRowCount();
				for (var i = 0; i < len; i++) {
					var id = ds.getColumn(i, this.idcolumn);
					var hotkey = ds.getColumn(i, this.hotkeycolumn);
					var level = ds.getColumn(i, this.levelcolumn);
					if (hotkey && this.autohotkey && (i == len - 1 || level >= ds.getColumn(i + 1, this.levelcolumn))) {
						this._set_hotkey(id, hotkey);
					}
				}
			}
		}
		else {
			var hotkey_list = this._hot_key_list;
			if (hotkey_list && hotkey_list.length > -1) {
				for (var i = hotkey_list.length - 1; i > -1; i--) {
					var item = hotkey_list[i];
					this._unregisterItemHotkey(item.key);
					item = null;
				}
			}
		}
	};


	_pMenu.set_popupitemheight = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.popupitemheight != v) {
			this.popupitemheight = v;
			this.on_apply_popupitemheight(v);
		}
	};

	_pMenu.on_apply_popupitemheight = function (popupitemheight) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_itemheight(popupitemheight ? popupitemheight : this.popupitemheight);
		}
	};

	_pMenu.set_popuptype = function (popuptype) {
		var popuptype_enum = ["center", "none", "normal", "system"];
		if (popuptype_enum.indexOf(popuptype) == -1) {
			return;
		}
		if (this.popuptype != popuptype) {
			this.popuptype = popuptype;
			this.on_apply_popuptype(popuptype);
		}
	};

	_pMenu.on_apply_popuptype = function (popuptype) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_popuptype(popuptype);
		}
	};


	_pMenu.set_navigationbuttonsize = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}
		this.navigationbuttonsize = v;
		this.on_apply_navigationbuttonsize(v);
	};

	_pMenu.on_apply_navigationbuttonsize = function () {
		if (this._is_created_contents) {
			this.on_change_containerRect();
		}
	};

	_pMenu.set_popupnavigationbuttonsize = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}
		this.popupnavigationbuttonsize = v;
		this.on_apply_popupnavigationbuttonsize(v);
	};

	_pMenu.on_apply_popupnavigationbuttonsize = function () {
		if (this._is_created_contents) {
			this.on_change_containerRect();
		}
	};

	_pMenu.on_apply_prop_cssclass = function () {
		var popupemenu = this._popupmenu;
		if (popupemenu) {
			popupemenu.on_apply_cssclass();
		}
	};



	_pMenu.set_autohotkey = function (v) {
		var val = nexacro._toBoolean(v);
		if (val != this.autohotkey) {
			this.autohotkey = val;
			this.on_apply_autohotkey(val);
		}
	};

	_pMenu.set_captioncolumn = function (v) {
		var val = v;
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_captioncolumn(val);
		}

		if (val != this.captioncolumn) {
			this.captioncolumn = val;
			this.on_apply_captioncolumn();
		}
	};

	_pMenu.on_apply_captioncolumn = function () {
		if (this._innerdataset) {
			this._createMenu(false);
			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var text = this._innerdataset.getColumn(items[i].datarow, this.captioncolumn);
				if (text) {
					items[i].set_text(text);
				}
				else {
					items[i].set_text("");
				}
			}
		}
	};

	_pMenu.set_checkboxcolumn = function (v) {
		var val = v;
		if (this._popupmenu) {
			this._popupmenu.set_checkboxcolumn(val);
		}

		if (val != this.checkboxcolumn) {
			this.checkboxcolumn = val;
			this._createMenu(false);
		}
	};

	_pMenu.set_enablecolumn = function (v) {
		if (v != this.enablecolumn) {
			this.enablecolumn = v;
			this.on_apply_enablecolumn();
		}
	};

	_pMenu.on_apply_enablecolumn = function () {
		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var enabletext = this._innerdataset.getColumn(items[i].datarow, this.enablecolumn);
				if (enabletext) {
					items[i].set_enable(enabletext);
				}
				else {
					items[i].set_enable(true);
				}
			}
		}
		if (this._popupmenu) {
			this._popupmenu.set_enablecolumn(this.enablecolumn);
		}
	};

	_pMenu.set_hotkeycolumn = function (v) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_hotkeycolumn(v);
		}

		if (v != this.hotkeycolumn) {
			this.hotkeycolumn = v;
			this._createMenu(false);
		}
	};

	_pMenu.set_iconcolumn = function (v) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_iconcolumn(v);
		}

		if (v != this.iconcolumn) {
			this.iconcolumn = v;
			this._createMenu(false);
		}
	};

	_pMenu.set_idcolumn = function (v) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_idcolumn(v);
		}

		if (v != this.idcolumn) {
			this.idcolumn = v;
			this.on_apply_idcolumn();
		}
	};

	_pMenu.on_apply_idcolumn = function () {
		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var id = this._innerdataset.getColumn(items[i].datarow, this.idcolumn);
				items[i]._id = id ? id : "";
			}
		}
	};

	_pMenu.set_levelcolumn = function (v) {
		var val = v;
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_levelcolumn(val);
		}

		if (val != this.levelcolumn) {
			this.levelcolumn = val;
			this.on_apply_levelcolumn();
		}
	};

	_pMenu.on_apply_levelcolumn = function () {
		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var level = this._innerdataset.getColumn(items[i].datarow, this.levelcolumn);
				items[i].level = level ? level : -1;
			}
		}
	};

	_pMenu.set_userdatacolumn = function (v) {
		var val = v;
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_userdatacolumn(val);
		}

		if (val != this.userdatacolumn) {
			this.userdatacolumn = val;
			this.on_apply_userdatacolumn();
		}
	};

	_pMenu.on_apply_userdatacolumn = function () {
		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var userdata = this._innerdataset.getColumn(items[i].datarow, this.userdatacolumn);
				if (userdata) {
					items[i].userdata = userdata;
				}
			}
		}
	};

	_pMenu.setInnerDataset = function (obj) {
		this._removeEventHandlerToInnerDataset();

		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset();
		}
		else if (obj instanceof nexacro.Dataset) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this.on_apply_innerdataset();
		}
	};

	_pMenu._setInnerDatasetStr = function (str) {
		this._removeEventHandlerToInnerDataset();

		if (!str) {
			this._innerdataset = null;
			this.innerdataset = "";
		}
		else {
			str = str.replace("@", "");
			this._innerdataset = this._findDataset(str);
			this.innerdataset = str;
		}
	};

	_pMenu.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pMenu.set_innerdataset = function (str) {
		if (typeof str != "string") {
			this.setInnerDataset(str);
			return;
		}

		if (str != this.innerdataset) {
			this._removeEventHandlerToInnerDataset();

			if (!str) {
				this._innerdataset = null;
				this.innerdataset = "";
			}
			else {
				str = str.replace("@", "");
				this._innerdataset = this._findDataset(str);
				this.innerdataset = str;
			}
			this.on_apply_innerdataset();
		}
		else if (this.innerdataset && !this._innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
			this.on_apply_innerdataset();
		}
	};

	_pMenu.on_apply_innerdataset = function () {
		var ds = this._innerdataset;
		if (ds) {
			var callback = this._callbackFromDataset;
			ds._setEventHandler("onload", callback, this);
			ds._setEventHandler("onrowposchanged", callback, this);
			ds._setEventHandler("oncolumnchanged", callback, this);
			ds._setEventHandler("onrowsetchanged", callback, this);
			ds._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
		}
		var control = this.getElement();
		if (control && this.innerdataset) {
			this._createMenu(true);
			this.beforevalue = "";
			this.beforeText = "";
		}
	};

	_pMenu.set_icontextpadding = function (v) {
		this._icontextpadding = v;
		this.on_apply_icontextpadding();
	};

	_pMenu.on_apply_icontextpadding = function () {
		if (this._popupmenu) {
			this._popupmenu.set_icontextpadding(this._icontextpadding);
		}
	};

	_pMenu.set_hotkeytextgap = function (v) {
		this._hotkeytextgap = v;
		this.on_apply_hotkeytextgap();
	};

	_pMenu.on_apply_hotkeytextgap = function () {
		if (this._popupmenu) {
			this._popupmenu.set_hotkeytextgap(this._hotkeytextgap);
		}
	};

	_pMenu.on_apply_wordSpacing = function (wordSpacing) {
		nexacro.Component.prototype.on_apply_wordSpacing.call(this, wordSpacing);
		this._createMenu();
	};

	_pMenu.on_apply_letterSpacing = function (letterSpacing) {
		nexacro.Component.prototype.on_apply_letterSpacing.call(this, letterSpacing);
		this._createMenu();
	};


	_pMenu.isPopup = function () {
		return this._isPopupVisible();
	};
	_pMenu.trackPopup = function (index, x, y, bcapture) {
		index = parseInt(index);
		this._track_capture = bcapture == undefined ? true : nexacro._toBoolean(bcapture);
		var items = this._items;
		if (items) {
			this._showPopup(items[index], x, y, bcapture);
			this._menuitemindex = items[index].index;
			return true;
		}
		return false;
	};

	_pMenu.cancelPopup = function () {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			if (popupmenu.isPopup()) {
				popupmenu.cancelPopup();
			}
			if (this._is_menu_click) {
				this._is_menu_click = false;
			}
		}
		return true;
	};

	_pMenu.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onlbuttondown", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.onlbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onlbuttonup", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onrbuttondown", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onrbuttonup", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.onrbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseup", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.onmouseup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onmousedown", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.onmousedown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseenter && this.onmouseenter._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseenter", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.onmouseenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseleave && this.onmouseleave._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseleave", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, this._last_mouseleave_iteminfo.level, this._last_mouseleave_iteminfo.index, this._last_mouseleave_iteminfo.bindindex);
			return this.onmouseleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuMouseEventInfo(this, "onmousemove", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.onmousemove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp) {
		if (this.ondrag && this.ondrag._has_handlers) {
			var dragData = this._getDragData();
			var evtinfo_control = this._getEventInfoComponent(self_refer_comp);
			var evt = new nexacro.MenuDragEventInfo(this, "ondrag", evtinfo_control.id, dragData, null, this, self_refer_comp, from_comp, refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return [this.ondrag._fireUserEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
		}
		return [false];
	};

	_pMenu._getEventInfoComponent = function (refer_comp) {
		while (!refer_comp._is_eventinfo_control) {
			refer_comp = refer_comp.parent;
		}
		return refer_comp;
	};

	_pMenu.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondrop && this.ondrop._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuDragEventInfo(this, "ondrop", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.ondrop._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragenter && this.ondragenter._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuDragEventInfo(this, "ondragenter", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.ondragenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragleave && this.ondragleave._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuDragEventInfo(this, "ondragleave", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this._last_mouseleave_iteminfo.level, this._last_mouseleave_iteminfo.index, this._last_mouseleave_iteminfo.bindindex);

			return this.ondragleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragmove && this.ondragmove._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.MenuDragEventInfo(this, "ondragmove", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
			return this.ondragmove._fireUserEvent(this, evt);
		}
		return false;
	};


	_pMenu.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var pThis = this._popupmenu_find(this);
		var item = this._item_find(pThis);
		var popupvisible = this._is_popupmenu_visible(this);
		var menuitem = this._items;
		var menuexpand;

		if (menuitem[this._menuitemindex]) {
			menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);
		}


		var E = nexacro.Event;
		var is_accessibility = nexacro._enableaccessibility;

		switch (keycode) {
			case E.KEY_UP:
				if (is_accessibility) {
					break;
				}
				if (!popupvisible) {
					if (menuexpand) {
						var item = this._items[this._menuitemindex];
						if (item) {
							this._showPopup(item);
						}
					}
				}
				else {
					this._fire_on_Popupmenu(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
				break;
			case E.KEY_DOWN:
				if (is_accessibility) {
					break;
				}
				if (!popupvisible && this._menuitemindex > -1) {
					if (menuexpand) {
						var item = this._items[this._menuitemindex];
						if (item) {
							this._showPopup(item);
							this._fire_on_Popupmenu(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
						}
					}
				}
				else {
					this._fire_on_Popupmenu(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
				break;
			case E.KEY_LEFT:
				if (!popupvisible) {
					if (this._isNavigationVisible()) {
						var previouse_item_index = this._menuitemindex;
						var item_len = this._items.length;
						if (previouse_item_index == 0 || previouse_item_index <= this._start_navigation_index) {
							this._navigationprev(true);
						}
					}
					var previouse_item_index = this._menuitemindex;
					this._select_menuitem(this._getItemIndex(-1), previouse_item_index, popupvisible);
				}
				else if (!is_accessibility) {
					this._fire_on_Popupmenu(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
				break;
			case E.KEY_RIGHT:
				if (!popupvisible) {
					if (this._isNavigationVisible()) {
						var previouse_item_index = this._menuitemindex;
						var item_len = this._items.length;
						if (previouse_item_index + 1 >= this._end_navigation_index) {
							this._navigationnext(true);
						}
					}
					var previouse_item_index = this._menuitemindex;
					this._select_menuitem(this._getItemIndex(1), previouse_item_index, popupvisible);
				}
				else if (!is_accessibility) {
					this._fire_on_Popupmenu(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
				break;
			case E.KEY_ENTER:
				if (!popupvisible) {
					var item = this._items[this._menuitemindex];
					if (menuexpand) {
						if (item && item._isEnable()) {
							this._showPopup(item);
						}
						this._fire_on_Popupmenu(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
					}
					else {
						if (item) {
							var bselected = item._userstatus == "selected" ? true : false;
							this.on_notify_menuitem_onclick(item);
							if (bselected) {
								item._changeUserStatus("selected", false);
							}
							else {
								item._changeUserStatus("selected", true);
							}
						}
					}
				}
				else if (!is_accessibility) {
					this._fire_on_Popupmenu(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
				break;
			case E.KEY_ESC:
				if (popupvisible) {
					this._fire_on_Popupmenu(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
				else {
					var item = this._items[this._menuitemindex];
					if (refer_comp.parent == pThis) {
						this._item_killfocus(item);
						item._on_apply_selected(false);
						this._menuitemindex = -1;
					}
					else {
						item._on_focus(false);
					}
				}
				break;
			default:
				break;
		}
		return nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pMenu.on_fire_oninnerdatachanged = function (obj, oldvalue, newvalue, columnid, col, row) {
		if (this.oninnerdatachanged && this.oninnerdatachanged._has_handlers) {
			var evt = new nexacro.InnerdataChangedEventInfo(obj, "oninnerdatachanged", oldvalue, newvalue, columnid, col, row);
			return this.oninnerdatachanged._fireEvent(this, evt);
		}
		return true;
	};

	_pMenu.on_notify_menuitem_onmouseleave = function (obj) {
		this._last_mouseleave_iteminfo.index = obj.index;
		this._last_mouseleave_iteminfo.bindindex = obj._bindindex;
		this._last_mouseleave_iteminfo.level = obj.parent.level;
	};

	_pMenu._select_menuitem = function (nextitemindex, previtemindex, popupvisible) {
		var next_item = this._items[nextitemindex > -1 ? nextitemindex : this._menuitemindex];
		var prev_item = this._items[previtemindex];
		this._closePopup();

		if (prev_item && nextitemindex != previtemindex) {
			prev_item._on_apply_selected(false);
			this._do_defocus(prev_item, false);
		}
		this._previtemindex = this._menuitemindex = nextitemindex;
		if (popupvisible) {
			this._showPopup(next_item);
			next_item._on_focus(false);
			var popupmenu = this._popupmenu;
			if (popupmenu) {
				popupmenu._select_menuitem(popupmenu._getItemIndex(0));
			}
		}
		this._item_focus(next_item, true);
		next_item._on_apply_selected(true);
	};

	_pMenu._fire_on_Popupmenu = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
		}
	};

	_pMenu.on_notify_menuitem_onmouseenter = function (obj) {
		var popupmenu = this._popupmenu;
		this._menuitemonmouseenter = obj;
		if (popupmenu) {
			if (popupmenu._is_popup()) {
				if (this._previtemindex != obj.index) {
					popupmenu.cancelPopup();
					this._showPopup(obj);
					var item = this._items[this._previtemindex];
					if (item) {
						item._on_apply_selected(false);
						item._changeStatus("focused", false);
					}
					this._previtemindex = obj.index;
				}
			}
		}
		return true;
	};

	_pMenu.on_notify_menuitem_onclick = function (obj) {
		if (!obj) {
			return;
		}
		var popuptype = this.popuptype;
		if (obj.enable == false || popuptype == "none") {
			return;
		}

		if (nexacro._enableaccessibility) {
			this._want_tab = true;
		}
		if (!this._is_alive) {
			return;
		}

		if (this._previtemindex != obj.index) {
			var item = this._items[this._previtemindex];
			if (item) {
				item._on_apply_selected(false);
			}
			this._previtemindex = obj.index;
		}
		if (this.visible && this._isEnable() && this.enableevent && obj && obj._isEnable()) {
			var rootComp = this._getRootComponent(obj);

			if (!obj._canExpand) {
				var bselected = obj._userstatus == "selected" ? true : false;
				this.on_fire_onitemclick(rootComp, "onmenuclick", obj._id, obj.userdata, obj.index, obj.parent.level);
				if (bselected) {
					obj._changeUserStatus("selected", false);
				}
				else {
					obj._changeUserStatus("selected", true);
				}
			}
			else {
				obj._on_apply_selected(true);
			}
			this._item_focus(obj, false);
		}
	};

	_pMenu.on_notify_menuitem_onlbuttondown = function (obj) {
		if (this._previtemindex != obj.index) {
			var item = this._items[this._previtemindex];
			if (item) {
				item._on_apply_selected(false);
			}
			this._previtemindex = obj.index;
		}
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			if (popupmenu._is_popup()) {
				popupmenu.cancelPopup();
				this._menuitemindex = obj.index;
				this._popupitemindex = -1;
			}
		}
		else {
			this._menuitemonmouseenter = obj;
			this._menuitemindex = obj.index;
		}

		if (obj._canExpand && obj._isEnable()) {
			this._showPopup(obj);
			this._is_menu_click = true;
			this._menuitemindex = obj.index;
		}

		this._item_focus(obj, true);
	};

	_pMenu.on_fire_onitemclick = function (obj, id, itemid, itemuserdata, index, level) {
		if (this.onmenuclick && this.onmenuclick._has_handlers) {
			var evt = new nexacro.MenuClickEventInfo(obj, id, itemid, itemuserdata, index, level);
			this.onmenuclick._fireEvent(this, evt);
		}
	};

	_pMenu.on_notify_navigationnext_onclick = function () {
		this._closePopup();
		this._navigationnext();
	};

	_pMenu.on_notify_navigationprev_onclick = function () {
		this._closePopup();
		this._navigationprev();
	};


	_pMenu._on_getFitSize = function () {
		var elem = this.getElement();
		if (elem) {
			var total_w = 0;
			var total_h = 0;

			var border = this._getCurrentStyleBorder();
			var padding = this._getCurrentStylePadding();

			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			if (padding) {
				total_w += padding.left + padding.right;
				total_h += padding.top + padding.bottom;
			}

			var items = this._items;
			var item_len = items.length;
			if (item_len) {
				var item = items[0];
				var itemborder = item._getCurrentStyleBorder();
				var itempadding = item._getCurrentStylePadding();

				var itemwidth = 0;
				var itemheight = 0;
				var items_width = this._items_width = [];
				var itemsize = null;
				for (var i = 0, n = this._items.length; i < n; i++) {
					item = items[i];
					itemsize = item._on_getFitSize();
					itemwidth = Math.ceil(itemsize[0]);
					items_width.push(itemwidth);
					total_w += itemwidth;
					itemheight = Math.max(itemheight, itemsize[1]);
				}
				if (itemborder) {
					total_h += itemborder._getBorderHeight();
				}
				if (itempadding) {
					total_h += itempadding.top + itempadding.bottom;
				}

				total_h += itemheight;
			}

			return [total_w, total_h];
		}
		return [this._adjust_width, this._adjust_height];
	};


	_pMenu._createMenu = function () {
		var control = this.getElement();
		if (control) {
			this._deleteMenu();
			var ds = this._innerdataset;

			if (ds && this.captioncolumn && this.captioncolumn && this.idcolumn) {
				var left = 0;
				var index = 0;
				var len = ds.getRowCount();
				var text, enable, hotkey, id, level, userdata;
				var item;
				for (var i = 0; i < len; i++) {
					hotkey = ds.getColumn(i, this.hotkeycolumn);
					id = ds.getColumn(i, this.idcolumn);
					level = ds.getColumn(i, this.levelcolumn);

					if (hotkey && this.autohotkey && (i == len - 1 || level >= ds.getColumn(i + 1, this.levelcolumn))) {
						this._set_hotkey(id, hotkey);
					}

					if (level == 0) {
						text = ds.getColumn(i, this.captioncolumn);
						enable = ds.getColumn(i, this.enablecolumn);
						userdata = ds.getColumn(i, this.userdatacolumn);

						item = new nexacro._MenuItemControl("item" + i, 0, 0, 0, 0, null, null, null, null, null, null, this);
						this._items.push(item);

						item.userdata = userdata;
						item._bindindex = i;
						item.index = index++;
						item.datarow = i;
						item._id = id ? id : "";
						item.level = level;

						if (text) {
							item.set_text(text);
						}

						item._setEventHandler("onlbuttondown", this.on_notify_menuitem_onlbuttondown, this);
						item._setEventHandler("onclick", this.on_notify_menuitem_onclick, this);

						if (!(nexacro._isTouchInteraction && nexacro._SupportTouch)) {
							item._setEventHandler("onmouseenter", this.on_notify_menuitem_onmouseenter, this);
							item._setEventHandler("onmouseleave", this.on_notify_menuitem_onmouseleave, this);
						}

						if (i == ds.getRowCount() - 1) {
							item._canExpand = false;
						}
						else {
							level = ds.getColumn(i + 1, this.levelcolumn);
							if (level <= this.level) {
								item._canExpand = false;
							}
						}

						item.set_enable(enable == false || enable == "false" ? false : true);
						item.createComponent();
					}
				}

				if (this.fittocontents !== "none") {
					this._update_position();
				}

				var items_width = this._items_width = [];
				var items_total_width = this._items_total_width;
				var size, width, height;
				var itemborder, itempadding, itemfont, itemwordwrap, itemwordspace, itemletterspace;
				for (i = 0; i < this._items.length; i++) {
					item = this._items[i];

					itemfont = item._getCurrentStyleInheritValue("font");
					itemwordwrap = item.wordWrap || item._getCSSStyleValue("wordWrap");
					itemborder = item._border || item._getCSSStyleValue("border");
					itempadding = item._padding || item._getCSSStyleValue("padding");
					itemwordspace = this._wordspacing || item._wordspacing || item._getCSSStyleValue("wordSpacing");
					itemletterspace = this._letterspacing || item._letterspacing || item._getCSSStyleValue("letterSpacing");

					size = nexacro._getTextSize(item.text, itemfont, true, undefined, itemwordwrap, itemwordspace, itemletterspace);
					width = Math.ceil(size[0]) + (itemborder ? itemborder.left._width + itemborder.right._width : 0);

					width += (itempadding ? itempadding.left + itempadding.right : 0);
					height = this._adjust_height - (itemborder ? itemborder.top._width + itemborder.bottom._width : 0);
					item.move(left, 0, width, height);
					items_width.push(width);
					items_total_width += width;

					left += width;
				}

				if (items_total_width) {
					this._items_total_width = items_total_width;
				}

				item = null;
			}
		}
	};

	_pMenu._deleteMenu = function () {
		var list = this._hot_key_list;
		var len = list.length;
		var i, _form = this._getMainForm();

		for (i = 0; i < len; i++) {
			nexacro._unregisterHotkeyComp(_form, this, list[i].key);
		}

		this._hot_key_list = [];
		this._items_width = [];
		this._items_total_width = 0;

		var items = this._items;
		if (items) {
			len = items.length;
			for (i = 0; i < len; i++) {
				items[i].destroy();
				items[i] = null;
			}

			this._items = [];
		}
	};


	_pMenu._rearrangeMenuItems = function (need_calc, dir) {
		var start_navigation_index = this._start_navigation_index;
		var items_width = this._items_width;
		var client_width = this._getClientWidth();
		var items = this._items;
		var left = this.navigationbuttonsize || this._prev_width || 0;
		var navigationnext_width = this.navigationbuttonsize || this._next_width || 0;
		var sum_itemwidth = left + navigationnext_width;
		var height = parseInt(this.height);
		var len = items_width.length;
		var end_navigation_index = this._end_navigation_index;
		var padding = this._getCSSStyleValue("padding", this._status);
		var border = this._getCSSStyleValue("border", this._status);
		if (padding) {
			sum_itemwidth += padding.left + padding.right;
		}
		if (border) {
			if (border._single) {
				sum_itemwidth += border.top._width + border.top._width;
			}
			else {
				sum_itemwidth = border.left._width + border.right._width;
			}
		}

		var i, end;
		if (need_calc) {
			for (i = end_navigation_index - 1; i >= 0; i--) {
				var item = items[i];
				var item_width = items_width[i];
				sum_itemwidth += item_width;
				start_navigation_index = i;
				if (i == end_navigation_index - 1 || sum_itemwidth > client_width) {
					break;
				}
			}

			for (i = 0, end = start_navigation_index; i < end; i++) {
				var item = items[i];
				if (item) {
					item.move(0, 0, 0, 0);
				}
			}
			for (i = start_navigation_index; i < end_navigation_index; i++) {
				var item = items[i];
				var item_width = items_width[i];
				if (item) {
					item.move(left, 0, item_width, height);
				}
				left += item_width;
			}
			if (end_navigation_index > 0 && end_navigation_index < len) {
				for (i = end_navigation_index + 1; i < len; i++) {
					var item = items[i];
					if (item) {
						item.move(0, 0, 0, 0);
					}
				}
			}
		}
		else {
			for (i = 0, end = start_navigation_index; i < end; i++) {
				var item = items[i];
				if (item) {
					item.move(0, 0, 0, 0);
				}
			}
			for (i = start_navigation_index; i < len; i++) {
				var item = items[i];
				var item_width = items_width[i];
				sum_itemwidth += item_width;
				if (i == start_navigation_index || sum_itemwidth < client_width) {
					if (item) {
						item.move(left, 0, item_width, height);
					}
				}
				else {
					if (dir < 0 && i == end_navigation_index && end_navigation_index == this._end_navigation_index) {
						return true;
					}
					break;
				}
				end_navigation_index = i + 1;
				left += item_width;
			}

			if (end_navigation_index > 0 && end_navigation_index < len) {
				for (i = end_navigation_index; i < len; i++) {
					items[i].move(0, 0, 0, 0);
				}
			}
		}
		this._start_navigation_index = start_navigation_index;
		this._end_navigation_index = end_navigation_index;
	};


	_pMenu._getDlgCode = function (keycode) {
		var E = nexacro.Event;
		var want_tab = this._want_tab;
		var want_arrow = !(nexacro._enableaccessibility && (keycode == E.KEY_DOWN || keycode == E.KEY_UP));
		this._want_tab = want_tab;

		return {
			want_tab : want_tab, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : want_arrow
		};
	};

	_pMenu._showPopup = function (obj, x, y, bcapture) {
		var popuptype = this.popuptype;
		if (popuptype == "none") {
			return;
		}
		if (this._innerdataset && this.levelcolumn && this.captioncolumn && this.idcolumn && obj._canExpand === true) {
			var popupmenu = this._popupmenu;
			if (popupmenu == null) {
				popupmenu = this._popupmenu = new nexacro.PopupMenu("menupopupmenu", 0, 0, 0, 0, null, null, null, null, null, null, this);
				popupmenu._setControl();
				this._setPopupContains(true);

				var color = this._color ? this._color : this._getCurrentStyleInheritValue("color");
				if (color) {
					popupmenu.set_color(color.value);
				}
				var font = this._font ? this._font : this._getCurrentStyleInheritValue("font");
				if (font) {
					popupmenu.set_font(font.value);
				}

				popupmenu.level = 1;
				popupmenu.index = obj.index;
				popupmenu.datarow = obj.datarow + 1;

				popupmenu.setInnerDataset(this._innerdataset);

				popupmenu.set_iconcolumn(this.iconcolumn);
				popupmenu.set_captioncolumn(this.captioncolumn);
				popupmenu.set_checkboxcolumn(this.checkboxcolumn);
				popupmenu.set_hotkeycolumn(this.hotkeycolumn);
				popupmenu.set_idcolumn(this.idcolumn);
				popupmenu.set_levelcolumn(this.levelcolumn);
				popupmenu.set_userdatacolumn(this.userdatacolumn);
				popupmenu.set_enablecolumn(this.enablecolumn);
				popupmenu.set_navigationbuttonsize(this.popupnavigationbuttonsize);
				popupmenu.set_cssclass(this.cssclass);
				popupmenu.createComponent();
				popupmenu._setEventHandler("oncloseup", this.on_notify_onclosepopup, this);
			}
			else {
				popupmenu.datarow = obj.datarow + 1;
				popupmenu.set_cssclass(this.cssclass);
			}
			popupmenu.popuptype = this.popuptype;
			popupmenu._track_capture = bcapture;
			if (this._icontextpadding) {
				popupmenu.set_icontextpadding(this._icontextpadding);
			}
			if (this._hotkeytextgap) {
				popupmenu.set_hotkeytextgap(this._hotkeytextgap);
			}
			if (this.popupitemheight) {
				popupmenu.set_itemheight(this.popupitemheight);
			}
			popupmenu._trackPopup(obj, "vertical", x, y);


			if (popupmenu._is_popup()) {
				var _window = this._getWindow();
				if (_window) {
					if (this._track_capture) {
						_window._setCaptureLock(this, true, false);
					}
					else {
						_window._releaseCaptureLock();
					}
				}
			}
		}
	};

	_pMenu._showNavigationButton = function (navigation_visible) {
		this._is_navigation_visible = navigation_visible;
		var prevbutton, nextbutton;
		if (navigation_visible) {
			if (!this.nextbutton || !this.prevbutton) {
				this._createNavigationButton();
			}
			nextbutton = this.nextbutton;
			prevbutton = this.prevbutton;
			var buttonsize = this.navigationbuttonsize;
			var prevbutton_width = 0;
			var nextbutton_width = 0;

			if (!buttonsize) {
				var navigationbutton_width = this._getNavigationbuttonWidth(prevbutton, nextbutton);
				prevbutton_width = navigationbutton_width[0];
				nextbutton_width = navigationbutton_width[1];
			}
			else {
				prevbutton_width = buttonsize;
				nextbutton_width = buttonsize;
			}
			var client_width = this._getClientWidth();
			var client_height = this._getClientHeight();
			prevbutton.set_visible(true);
			prevbutton.move(0, 0, prevbutton_width, client_height);
			nextbutton.set_visible(true);
			nextbutton.move(client_width - nextbutton_width, 0, nextbutton_width, client_height);
		}
		else {
			nextbutton = this.nextbutton;
			if (nextbutton) {
				nextbutton.set_visible(false);
				nextbutton.move(0, 0, 0, 0);
			}

			prevbutton = this.prevbutton;
			if (prevbutton) {
				prevbutton.set_visible(false);
				prevbutton.move(0, 0, 0, 0);
			}
		}
	};

	_pMenu._getNavigationbuttonWidth = function (prevbutton, nextbutton) {
		var next_width = 0;
		var img_size, padding, border, prev_width = 0;

		var previcon = prevbutton._getCSSStyleValue("icon", "enabled");
		if (previcon) {
			img_size = nexacro._getImageSize(previcon.url, nexacro._emptyFn, this);
			if (img_size) {
				prev_width = img_size.width;
				padding = prevbutton._getCSSStyleValue("padding", this._status);
				border = prevbutton._getCSSStyleValue("border", this._status);
				if (padding) {
					prev_width += padding.left + padding.right;
				}
				if (border) {
					if (border._single) {
						prev_width += border.top._width + border.top._width;
					}
					else {
						prev_width = border.left._width + border.right._width;
					}
				}

				this._prev_width = prev_width;
			}
		}
		var nexticon = nextbutton._getCSSStyleValue("icon", "enabled");
		if (nexticon) {
			img_size = nexacro._getImageSize(nexticon.url, nexacro._emptyFn, this);
			if (img_size) {
				next_width = img_size.width;
				padding = nextbutton._getCSSStyleValue("padding", this._status);
				border = nextbutton._getCSSStyleValue("border", this._status);
				if (padding) {
					next_width += padding.left + padding.right;
				}
				if (border) {
					if (border._single) {
						next_width += border.top._width + border.top._width;
					}
					else {
						next_width = border.top._width + border.bottom._width;
					}
				}
				this._next_width = next_width;
			}
		}
		return [prev_width, next_width];
	};


	_pMenu._getItemIndex = function (inc) {
		if (inc === undefined) {
			inc = 0;
		}
		var menuitemindex = this._menuitemindex + inc;
		var menuitem_len = this._items ? this._items.length - 1 : 0;
		if (menuitemindex > menuitem_len) {
			menuitemindex = 0;
		}
		else if (menuitemindex < 0) {
			menuitemindex = menuitem_len;
		}
		var item = this._items[menuitemindex];
		if (!nexacro._enableaccessibility && item && item.enable == false && inc < 5 && inc > -5) {
			return this._getItemIndex(inc + inc);
		}

		return menuitemindex;
	};

	_pMenu._do_defocus = function (target, bParent) {
		var _window = this._getWindow();
		_window._removeFromCurrentFocusPath(target, true);
		target._changeStatus("focused", false);
		if (bParent) {
			_window._removeFromCurrentFocusPath(this, false);
		}
	};

	_pMenu._setFocus = function (bResetScroll, dir) {
		if (dir > -1 || dir < 4) {
			this._focus_direction = dir;
		}
		else {
			this._focus_direction = -1;
		}

		var retn = this.setFocus(bResetScroll);
		var menuitem = this._items;
		var menuitem_len = menuitem.length - 1;

		if (menuitem_len > 0) {
			if (dir >= 2) {
				this._focus_obj = this;
				this._menuitemindex = -1;
			}
			else {
				if (dir == 0) {
					this._menuitemindex = 0;
				}
				else if (dir == 1) {
					this._menuitemindex = menuitem_len;
				}
				this._focus_obj = menuitem[this._menuitemindex];
				this._menuitemonmouseenter = this._focus_obj;
				this._item_focus(this._focus_obj, true);
			}
		}
		else {
			if (nexacro._enableaccessibility) {
				this._focus_obj = this;
			}
			this._previtemindex = 0;
			this._menuitemindex = -1;
			var last_focused = this._last_focused;
			if (last_focused) {
				this._do_defocus(last_focused, true);
			}
			this._on_focus(true);
		}
		return retn;
	};


	_pMenu._loaded_expImage = function (imgurl, w, h) {
		this._expImage_width = w;
		this._expImage_height = h;
	};

	_pMenu._loaded_chkImage = function (imgurl, w, h) {
		this._chkImage_width = w;
		this._chkImage_height = h;
	};

	_pMenu._load_image = function (strImageUrl, flag) {
		var control_elem = this._control_element;
		if (control_elem) {
			var val = strImageUrl;
			if (val) {
				val = nexacro._getURIValue(val);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

				var size;
				if (flag) {
					size = nexacro._getImageSize(val, this._loaded_expImage, this);
					if (size) {
						this._expImage_width = size.width;
						this._expImage_height = size.height;
					}
				}
				else {
					size = nexacro._getImageSize(val, this._loaded_chkImage, this);
					if (size) {
						this._chkImage_width = size.width;
						this._chkImage_height = size.height;
					}
				}
			}
		}
	};

	_pMenu._isNavigationVisible = function () {
		if (this._items_total_width > this._adjust_width) {
			return true;
		}
		return false;
	};

	_pMenu._navigationnext = function (bKeyaction) {
		var threshold = this._items.length;
		var end_index = this._end_navigation_index;
		var need_calc_start_index = false;
		if (end_index < threshold) {
			if (this._start_navigation_index == 0) {
				this.prevbutton._changeStatus("disabled", false);
			}
			this._start_navigation_index++;
		}
		if (bKeyaction && end_index >= threshold) {
			this._start_navigation_index = 0;
			this.nextbutton._changeStatus("disabled", false);
			this.prevbutton._changeStatus("disabled", true);
		}

		var b = this._rearrangeMenuItems(need_calc_start_index, -1);
		if (b) {
			this._navigationnext();
		}

		if (this._end_navigation_index == threshold) {
			this.nextbutton._changeStatus("disabled", true);
		}
	};

	_pMenu._navigationprev = function (bKeyaction) {
		var start_index = this._start_navigation_index;
		var item_len = this._items.length;
		var need_calc_start_index = false;
		if (start_index > 0) {
			start_index--;
			if (start_index == 0) {
				this.prevbutton._changeStatus("disabled", true);
			}
		}
		else if (bKeyaction && start_index <= 0) {
			this._end_navigation_index = item_len;
			this.nextbutton._changeStatus("disabled", true);
			this.prevbutton._changeStatus("disabled", false);
			need_calc_start_index = true;
		}
		this._start_navigation_index = start_index;

		var b = this._rearrangeMenuItems(need_calc_start_index, 1);
		if (b) {
			this._navigationprev(true);
		}
		if (item_len > this._end_navigation_index) {
			this.nextbutton._changeStatus("disabled", false);
		}
	};

	_pMenu._createNavigationButton = function () {
		var navagationprevbutton = new nexacro.Button("prevbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
		navagationprevbutton._setControl("ButtonControl");
		navagationprevbutton.createComponent();
		navagationprevbutton.set_visible(true);
		navagationprevbutton._setEventHandler("onclick", this.on_notify_navigationprev_onclick, this);
		navagationprevbutton.on_created();
		navagationprevbutton._changeStatus("disabled", true);
		this.prevbutton = navagationprevbutton;

		var navagationnextbutton = new nexacro.Button("nextbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
		navagationnextbutton._setControl("ButtonControl");
		navagationnextbutton.createComponent();
		navagationnextbutton.set_visible(true);
		navagationnextbutton._setEventHandler("onclick", this.on_notify_navigationnext_onclick, this);
		navagationnextbutton.on_created();
		this.nextbutton = navagationnextbutton;
	};


	_pMenu._getPopupControl = function () {
		var rootcomp = this._getRootComponent(this);
		return rootcomp._popupmenu;
	};

	_pMenu._isPopupVisible = function () {
		var popupmenu = this._popupmenu;
		return popupmenu ? popupmenu._is_popup() : false;
	};

	_pMenu._callbackFromDataset = function (obj, e) {
		var _reason = e.reason;
		if (_reason == 91) {
			this._deleteMenu();
		}
		else {
			this._createMenu();
			if (this._is_created) {
				this._relayout();
			}
		}
	};

	_pMenu._callback_onvaluechanged = function (obj, e) {
		if (this._is_created) {
			this.on_fire_oninnerdatachanged(obj, e.oldvalue, e.newvalue, e.columnid, e.col, e.row);
		}
	};

	_pMenu._relayout = function () {
		if (this._isNavigationVisible()) {
			this._showNavigationButton(true);
			this._rearrangeMenuItems();
		}
		else {
			this._showNavigationButton(false);
		}
	};

	_pMenu._closePopup = function () {
		var popup = this._popupmenu;

		if (this._is_menu_click) {
			this._is_menu_click = false;
		}

		if (popup) {
			popup.cancelPopup();

			var _window = this._getWindow();
			if (_window && this._track_capture) {
				_window._releaseCaptureLock(this);
			}
		}
		var cur_index = this._menuitemindex;
		{

			var item = this._items[cur_index];
			if (item) {
				item._on_apply_selected(false);
			}
		}
		this._popupitemindex = -1;
		this._menuitemindex = -1;
	};

	_pMenu.on_fire_onkillfocus = function (obj, fromObj) {
		this._closePopup();
		var cur_index = this._menuitemindex;
		if (cur_index > -1) {
			var item = this._items[cur_index];
			if (item) {
				item._on_apply_selected(false);
			}
		}
		var lastfocuseditem = this._last_focused;
		if (lastfocuseditem && lastfocuseditem != obj) {
			this._do_defocus(lastfocuseditem, true);
		}
		nexacro.Component.prototype.on_fire_onkillfocus.call(this, obj, fromObj);
	};

	_pMenu.on_notify_onclosepopup = function (obj) {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
		}

		var items = this._items;
		if (items) {
			var prev_sel_menu = this._previtemindex;
			var item = items[prev_sel_menu];
			if (item) {
				item._on_apply_selected(false);
			}
		}
	};


	_pMenu._set_hotkey = function (id, v) {
		var hotkey = new nexacro._HotKey(v);
		if (hotkey._isEmpty()) {
			delete hotkey;
		}
		else {
			if (this._is_created) {
				this._registerItemHotkey(hotkey);
			}
		}

		var list = {
			id : id, 
			key : hotkey
		};
		this._hot_key_list.push(list);
	};

	_pMenu._item_focus = function (obj, bflag) {
		var lastfocuedobj = this._last_focused;
		if (lastfocuedobj && lastfocuedobj != obj) {
			this._do_defocus(lastfocuedobj, false);
		}
		var evt_name = "";
		if (nexacro._enableaccessibility) {
			evt_name = "downkey";
		}
		if (lastfocuedobj != obj) {
			if (nexacro._enableaccessibility) {
				if (obj instanceof nexacro._PopupMenuItemControl) {
					obj._on_focus(false, evt_name);
				}
				else {
					obj._on_focus(true, evt_name);
				}
			}
			else {
				obj._on_focus(false, evt_name);
			}

			if (!(obj instanceof nexacro._PopupMenuItemControl)) {
				this._last_focused = obj;
			}
		}
	};

	_pMenu._item_killfocus = function (obj) {
		if (obj) {
			if (nexacro._enableaccessibility) {
				var _window = this._getWindow();
				if (_window) {
					_window._removeFromCurrentFocusPath(obj, true);
				}
			}
		}
	};

	_pMenu._item_find = function (obj) {
		if (obj._popupmenu == null || obj._popupmenu.visible == false) {
			return obj._items;
		}
		return obj._popupmenu._items;
	};

	_pMenu._is_popupmenu_visible = function (obj) {
		if (obj._popupmenu == null || obj._popupmenu.visible == false) {
			return false;
		}
		return true;
	};

	_pMenu._popupmenu_find = function (obj) {
		var pThis = obj;
		while (pThis) {
			if (pThis._popupmenu === null || pThis._popupmenu.visible == false) {
				break;
			}
			var pThis = pThis._popupmenu;
		}
		return pThis;
	};

	_pMenu._popupmenuitem_extend = function (obj) {
		return obj._canExpand;
	};

	delete _pMenu;
}
