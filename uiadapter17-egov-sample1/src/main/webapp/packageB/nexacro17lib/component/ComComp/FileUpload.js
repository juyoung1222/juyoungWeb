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

if (!nexacro.FileUpload) {
	nexacro.FileUploadItemEventInfo = function (obj, id, idx) {
		this.id = this.eventid = id || "onfileuploaditem";
		this.fromobject = this.fromreferenceobject = obj;

		this.index = idx;
	};

	var _pEventFileUploadItemEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadItemEventInfo);
	nexacro.FileUploadItemEventInfo.prototype = _pEventFileUploadItemEventInfo;
	_pEventFileUploadItemEventInfo._type_name = "FileUploadItemEventInfo";

	delete _pEventFileUploadItemEventInfo;

	nexacro.FileUploadMouseEventInfo = function (obj, id, strButton, altKey, ctrlKey, shiftKey, index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onmouse";

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altkey = altKey || false;
		this.ctrlkey = ctrlKey || false;
		this.shiftkey = shiftKey || false;
		this.button = strButton || "";
		this.index = index;
		this.screenx = screenX || -1;
		this.screeny = screenY || -1;
		this.canvasx = canvasX || -1;
		this.canvasy = canvasY || -1;
		this.clientx = clientX || -1;
		this.clienty = clientY || -1;
	};

	var _pFileUploadMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadMouseEventInfo);
	nexacro.FileUploadMouseEventInfo.prototype = _pFileUploadMouseEventInfo;
	_pFileUploadMouseEventInfo._type_name = "FileUploadMouseEventInfo";

	delete _pFileUploadMouseEventInfo;

	nexacro.FileUploadEventInfo = function (obj, id, dsArray, code, msg, url) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = this.fromreferenceobject = obj;

		this.datasets = dsArray;
		this.errorcode = code;
		this.errormsg = msg;
		this.url = url;
	};

	var _pFileUploadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadEventInfo);
	nexacro.FileUploadEventInfo.prototype = _pFileUploadEventInfo;
	_pFileUploadEventInfo._type_name = "FileUploadEventInfo";

	delete _pFileUploadEventInfo;

	nexacro.FileUploadItemChangeEventInfo = function (obj, id, index, oldvalue, newvalue) {
		this.id = this.eventid = id || "onitemchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.index = obj.index;
		this.oldvalue = oldvalue;
		this.newvalue = newvalue;
	};

	var _pFileUploadItemChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadItemChangeEventInfo);
	nexacro.FileUploadItemChangeEventInfo.prototype = _pFileUploadItemChangeEventInfo;
	_pFileUploadItemChangeEventInfo._type_name = "FileUploadItemChangeEventInfo";

	delete _pFileUploadItemChangeEventInfo;

	nexacro.FileUploadErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index) {
		nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
		this.index = index;
	};

	var _pFileUploadErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.FileUploadErrorEventInfo);
	nexacro.FileUploadErrorEventInfo.prototype = _pFileUploadErrorEventInfo;
	_pFileUploadErrorEventInfo._type_name = "FileUploadErrorEventInfo";

	delete _pFileUploadErrorEventInfo;

	nexacro.FileUpload = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.filelist = [];
		this.filepathedits = new nexacro.Collection();
		this.filefindbuttons = new nexacro.Collection();

		this._items = [];
		this.context = this._refform;
	};

	var _pFileUpload = nexacro._createPrototype(nexacro.Component, nexacro.FileUpload);
	nexacro.FileUpload.prototype = _pFileUpload;
	_pFileUpload._type_name = "FileUpload";




	_pFileUpload.buttonsize = undefined;
	_pFileUpload.buttontext = "find";
	_pFileUpload.index = -1;
	_pFileUpload.itemcount = 1;
	_pFileUpload.itemheight = undefined;
	_pFileUpload.multiselect = false;
	_pFileUpload.text = "";
	_pFileUpload.uploadurl = "";
	_pFileUpload.value = undefined;

	_pFileUpload.rtldirection = "";
	_pFileUpload.rtlimagemirroring = "";


	_pFileUpload._hidden_frame_handle = null;
	_pFileUpload._last_id = -1;
	_pFileUpload._bresetscroll = 0;
	_pFileUpload._onPopupWin = false;
	_pFileUpload._is_listtype = true;
	_pFileUpload._calc_scroll = false;
	_pFileUpload._cnt_resetscroll = 0;


	_pFileUpload._is_scrollable = true;


	_pFileUpload.accessibilityaction = "";
	_pFileUpload.accessibilityrole = "fileupload";
	_pFileUpload.accessibilitydesclevel = "all";
	_pFileUpload.accessibilitydescription = "";
	_pFileUpload.accessibilityenable = true;
	_pFileUpload.accessibilitylabel = "";

	_pFileUpload.buttonaccessibilityaction = "";
	_pFileUpload.buttonaccessibilityrole = "";
	_pFileUpload.buttonaccessibilitydesclevel = "all";
	_pFileUpload.buttonaccessibilitydescription = "";
	_pFileUpload.buttonaccessibilityenable = true;
	_pFileUpload.buttonaccessibilitylabel = "";

	_pFileUpload.editaccessibilityaction = "";
	_pFileUpload.editaccessibilityrole = "";
	_pFileUpload.editaccessibilitydesclevel = "all";
	_pFileUpload.editaccessibilitydescription = "";
	_pFileUpload.editaccessibilityenable = true;
	_pFileUpload.editaccessibilitylabel = "";

	_pFileUpload._want_tab = true;
	_pFileUpload._want_arrow = false;
	_pFileUpload._first_focus = false;
	_pFileUpload._editFlag = null;
	_pFileUpload._buttonFlag = false;


	_pFileUpload._event_list = 
		{
		"ondblclick" : 1, 
		"onkeypress" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"ondrag" : 1, 
		"ondrop" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmousewheel" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onsuccess" : 1, 
		"onerror" : 1, 
		"oncontextmenu" : 1, 
		"onappenditem" : 1, 
		"ondeleteitem" : 1, 
		"onitemclick" : 1, 
		"onfindclick" : 1, 
		"onitemchanged" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};

	_pFileUpload.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var item;
			var items = this._items;
			var itemcount = this.itemcount;
			for (var i = 0; i < itemcount; i++) {
				item = this._createFileItem(i, 0, 0, 0, 0, true);
				this.filepathedits.add_item(item.id, item.fileitemedit);
				this.filefindbuttons.add_item(item.id, item.fileitembutton);
				items[i] = item;
			}
		}
	};

	_pFileUpload.on_created_contents = function () {
		var rand_id = new Date().valueOf().toString();
		nexacro._create_hidden_frame(this._unique_id, rand_id, this._on_manager_onload, this);
		rand_id = null;

		if (!this.context) {
			this.context = this._refform;
		}

		this.on_apply_index(this.index);
		this.on_apply_prop_enable(this._isEnable());

		this._recalcLayout();

		var item;
		var items = this._items;
		var itemcount = this.itemcount;
		for (var i = 0; i < itemcount; i++) {
			item = items[i];

			item.on_created();

			item._setEventHandler("onfindclick", this._on_item_onfindclick, this);
			item._setEventHandler("onitemclick", this._on_item_onitemclick, this);

			if (nexacro._enableaccessibility) {
				item._setAccessibilityInfoIndex(i + 1);
				item._setAccessibilityInfoCount(itemcount);
			}
		}

		this._buttonFlag = true;

		if (nexacro._enableaccessibility) {
			this.on_apply_editaccessibility();
			this.on_apply_buttonaccessibility();
		}

		this._onRecalcScrollSize();
	};

	_pFileUpload.on_destroy_contents = function () {
		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].destroy();
		}
		this.filelist = null;
		this._items = null;

		this.filepathedits.clear();
		this.filepathedits = null;
		this.filefindbuttons.clear();
		this.filefindbuttons = null;
		nexacro._destroy_hidden_frame(this._unique_id, this, this._hidden_frame_handle);
	};

	_pFileUpload.on_create_contents_command = function () {
		this.on_apply_index(this.index);
		this.on_apply_prop_enable(this._isEnable());

		this._recalcLayout();

		var str = "";
		var items = this._items;
		var itemcount = this.itemcount;
		for (var i = 0; i < itemcount; i++) {
			str += items[i].createCommand();
		}

		return str;
	};

	_pFileUpload.on_attach_contents_handle = function (win) {
		var rand_id = new Date().valueOf().toString();
		nexacro._create_hidden_frame(this._unique_id, rand_id, this._on_manager_onload, this);
		rand_id = null;

		var item;
		var items = this._items;
		var itemcount = this.itemcount;
		for (var i = 0; i < itemcount; i++) {
			item = items[i];
			item.attachHandle(win);
			item._setEventHandler("onfindclick", this._on_item_onfindclick, this);
			item._setEventHandler("onitemclick", this._on_item_onitemclick, this);

			if (nexacro._enableaccessibility) {
				item._setAccessibilityInfoIndex(i + 1);
				item._setAccessibilityInfoCount(itemcount);
			}

			if (this.index == i) {
				if (this._editFlag) {
					item.fileitemedit.setFocus(false);
				}

				if (this._buttonFlag) {
					item.fileitembutton.setFocus(false);
				}

				this.value = item.value;
			}
		}

		this._buttonFlag = true;
		if (nexacro._enableaccessibility) {
			this.on_apply_editaccessibility(this.editaccessibility);
			this.on_apply_buttonaccessibility(this.buttonaccessibility);
		}
		if (this.multiselect) {
			this.on_apply_multiselect(this.multiselect);
		}

		this._onRecalcScrollSize();
	};

	_pFileUpload.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			this._recalcLayout();

			if (!this._calc_scroll) {
				this._onRecalcScrollSize();
			}
			else {
				this._cnt_resetscroll++;
				this._onResetScrollBar();
			}
		}
	};

	_pFileUpload.on_change_containerPos = function (left, top) {
	};

	_pFileUpload._apply_setfocus = function (evt_name) {
		var enableaccessibility = nexacro._enableaccessibility;
		var selffocus = ((evt_name == "lbutton") ? false : enableaccessibility);
		var items = this._items;
		if (items.length < -1 || enableaccessibility) {
			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementFocus(selffocus);
			}
		}
		else {
			var item = items[this.index];
			if (item) {
				item.fileitembutton._control_element.setElementFocus(selffocus);
			}
		}
	};

	_pFileUpload.on_apply_prop_enable = function (enable) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, enable);

		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			items[i]._setEnable(enable);
			items[i].fileitemedit._setEnable(enable);
			items[i].fileitembutton._setEnable(enable);
		}
	};

	_pFileUpload._onRecalcScrollSize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
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

	_pFileUpload._on_getAccessibilityAdditionalLabel = function () {
		if (this._first_focus == false) {
			var count = 0;
			var items = this._items;
			if (items) {
				count = items.length;
			}
			return (+this.index) + 1 + " " + count;
		}
		return "";
	};

	_pFileUpload._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_tab = this._want_tab;
		this._want_tab = true;
		this._want_arrow = this._want_arrow && this._isEnable();

		return {
			want_tab : want_tab, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._want_arrow
		};
	};

	_pFileUpload._isAccessibilityEnable = function () {
		return true;
	};

	_pFileUpload.set_text = nexacro._emptyFn;

	_pFileUpload.set_value = nexacro._emptyFn;

	_pFileUpload.set_buttonsize = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.buttonsize != v) {
			this.buttonsize = v;
			this.on_apply_buttonsize(v);
		}
	};

	_pFileUpload.on_apply_buttonsize = function (buttonsize) {
		var item;
		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			if (items[i]) {
				items[i]._recalcLayout();
			}
		}
	};

	_pFileUpload.set_buttontext = function (v) {
		if (this.buttontext != v) {
			this.buttontext = v;
			this.on_apply_buttontext(v);
		}
	};

	_pFileUpload.on_apply_buttontext = function (buttontext) {
		var item, itembutton;
		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			itembutton = items[i].fileitembutton;
			if (itembutton) {
				itembutton.set_text(buttontext);
			}
		}
	};

	_pFileUpload.set_index = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		if (this.index != v) {
			this.index = v;
			this.on_apply_index(v);
			this._setAccessibilityStatSelected(v);
		}
	};

	_pFileUpload.on_apply_index = function (index) {
		var control_elem = this.getElement();
		if (control_elem) {
			var item = this._items[index];
			if (item) {
				if (this._editFlag) {
					item.fileitemedit.setFocus(false);
				}

				if (this._buttonFlag) {
					item.fileitembutton.setFocus(false);
				}

				this.value = item.value;
			}
		}
	};

	_pFileUpload.set_itemcount = function (v) {
		if (isNaN(v = +v) || v < 0) {
			return;
		}

		if (this.itemcount != v) {
			var pre_itemcount = this.itemcount;
			this.itemcount = v;
			this.on_apply_itemcount(v, pre_itemcount);
		}
	};

	_pFileUpload.on_apply_itemcount = function (itemcount, pre_itemcount) {
		var control_elem = this.getElement();
		if (control_elem) {
			var item;
			var items = this._items;
			var item_len = items.length;

			while (item_len && pre_itemcount > itemcount) {
				pre_itemcount--;
				items.pop().destroy();
			}

			for (var i = item_len; i < itemcount; i++) {
				item = this._items[i] = this._createFileItem(i);
				this.filepathedits.add_item(item.id, item.fileitemedit);
				this.filefindbuttons.add_item(item.id, item.fileitembutton);
			}

			this._recalcLayout();
			this._onRecalcScrollSize();
		}
	};

	_pFileUpload.set_itemheight = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.itemheight != v) {
			this.itemheight = v;
			this.on_apply_itemheight(v);
		}
	};

	_pFileUpload.on_apply_itemheight = function (itemheight) {
		this._recalcLayout();
		this._onRecalcScrollSize();
	};

	_pFileUpload.set_multiselect = function (v) {
		v = nexacro._toBoolean(v);
		if (this.multiselect != v) {
			this.multiselect = v;
			this.on_apply_multiselect(v);
		}
	};

	_pFileUpload.on_apply_multiselect = function (multiselect) {
		var control_elem = this.getElement();
		if (control_elem) {
			var item;
			var items = this._items;
			var item_len = items.length;
			var comp_name = this._unique_id;

			for (var i = 0; i < item_len; i++) {
				item = items[i];
				nexacro._setMultipleFile(comp_name, item.name, multiselect, item);
			}
		}
	};

	_pFileUpload.set_uploadurl = function (v) {
		if (this.uploadurl != v) {
			this.uploadurl = v;
		}
	};

	_pFileUpload.on_apply_accessibility = function () {
		nexacro.Component.prototype.on_apply_accessibility.call(this);
		this.on_apply_editaccessibility();
		this.on_apply_buttonaccessibility();
	};

	_pFileUpload.on_apply_editaccessibility = function () {
		var iLen = this._items.length;
		var item = null;
		var role = this.editaccessibilityrole;
		var label = this.editaccessibilitylabel;
		var desclevel = this.editaccessibilitydesclevel;
		var description = this.editaccessibilitydescription;
		var enable = this.editaccessibilityenable;
		var action = this.editaccessibilityaction;

		for (var i = 0; i < iLen; i++) {
			item = this._getItem(i);
			var fileitemedit = item.fileitemedit;
			if (fileitemedit) {
				if (role) {
					fileitemedit.set_accessibilitydescrole(role);
				}
				if (label) {
					fileitemedit.set_accessibilitydesclabel(label);
				}
				if (desclevel) {
					fileitemedit.set_accessibilitydesclevel(desclevel);
				}
				if (action) {
					fileitemedit.set_accessibilityaction(action);
				}
				if (description) {
					fileitemedit.set_accessibilitydesclevel(description);
				}
				fileitemedit.set_accessibilityenable(enable);
			}
		}
	};

	_pFileUpload.on_apply_buttonaccessibility = function (buttonaccessibility) {
		var iLen = this._items.length;
		var item = null;
		var role = this.editaccessibilityrole;
		var label = this.editaccessibilitylabel;
		var desclevel = this.editaccessibilitydesclevel;
		var description = this.editaccessibilitydescription;
		var enable = this.editaccessibilityenable;
		var action = this.editaccessibilityaction;

		for (var i = 0; i < iLen; i++) {
			item = this._getItem(i);
			var fileitembutton = item.fileitembutton;
			if (fileitembutton) {
				if (role) {
					fileitembutton.set_accessibilitydescrole(role);
				}
				if (label) {
					fileitembutton.set_accessibilitydesclabel(label);
				}
				if (desclevel) {
					fileitembutton.set_accessibilitydesclevel(desclevel);
				}
				if (action) {
					fileitembutton.set_accessibilityaction(action);
				}
				if (description) {
					fileitembutton.set_accessibilitydesclevel(description);
				}
				fileitembutton.set_accessibilityenable(enable);
			}
		}
	};

	_pFileUpload.appendItem = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var index = this.itemcount;
			var item = this._items[index] = this._createFileItem(index);
			this.filepathedits.add_item(item.id, item.fileitemedit);
			this.filefindbuttons.add_item(item.id, item.fileitembutton);

			this.itemcount++;
			if (nexacro._enableaccessibility) {
				item._setAccessibilityInfoIndex(index);
				item._setAccessibilityInfoCount(index + 1);
			}

			this._recalcLayout();
			this._onRecalcScrollSize();

			this.on_fire_onappenditem(this, index);
		}
	};

	_pFileUpload.deleteItem = function (idx) {
		if (idx < 0) {
			return;
		}
		var cur_index = this.index;
		var control_elem = this.getElement();
		if (control_elem) {
			idx = parseInt(idx, 10);
			var items = this._items;

			if (this.itemcount <= idx) {
				return;
			}

			var iCount = this.itemcount;
			var iCnt = iCount - 1;
			for (var i = idx + 1; i < iCount; i++) {
				if (cur_index == i) {
					this.index--;
				}
				items[i].index--;

				if (nexacro._enableaccessibility) {
					items[i]._setAccessibilityInfoIndex(i);
					items[i]._setAccessibilityInfoCount(iCnt);
				}
			}

			items[idx].destroy();
			items.splice(idx, 1);
			if (cur_index == idx) {
				this.index = -1;
				this.value = undefined;
			}

			this.itemcount--;

			this._recalcLayout();
			this._onRecalcScrollSize();
			this.on_fire_ondeleteitem(this, idx);
		}
	};

	_pFileUpload.getItemCount = function (bHasValue) {
		var control_elem = this.getElement();
		if (control_elem) {
			bHasValue = nexacro._toBoolean(bHasValue);

			var cnt = 0;
			var idx = 0;
			var itemval_check;
			var items = this._items;
			var item_len = items.length;

			while (idx < item_len) {
				if (bHasValue == true) {
					if (items[idx].value) {
						cnt++;
					}
				}
				else {
					return item_len;
				}
				++idx;
			}
			return cnt;
		}
	};

	_pFileUpload.getItemIndex = function (obj) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (typeof obj == "object") {
				var idx = 0;
				var items = this._items;
				while (idx < items.length) {
					if (obj == items[idx].fileitembutton) {
						return idx;
					}
					if (obj == items[idx].fileitemedit) {
						return idx;
					}
					++idx;
				}
				return -1;
			}
		}
	};

	_pFileUpload.hasValue = function (idx) {
		var control_elem = this.getElement();
		if (control_elem) {
			var i = 0, cnt = 0;
			var items = this._items;
			if (idx == -1) {
				while (i < items.length) {
					if (items[i].value) {
						++cnt;
					}
					++i;
				}
				if (cnt == items.length) {
					return true;
				}
				return false;
			}

			if (idx < items.length && items[idx].value) {
				return true;
			}
			return false;
		}
	};

	_pFileUpload.upload = function (v) {
		var ret = false;
		var uploadurl;

		if (v == undefined) {
			if (this.uploadurl) {
				uploadurl = nexacro._getServiceLocation(this.uploadurl);
			}
		}
		else {
			uploadurl = nexacro._getServiceLocation(v);
		}

		if (uploadurl) {
			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				if (items[i].value) {
					ret = true;
					nexacro._submit(this._unique_id, uploadurl, this._hidden_frame_handle, null, items[i].value);
					break;
				}
			}
		}
		return ret;
	};

	_pFileUpload._on_manager_onload = function (node, data, url, errcode, httpcode, errmsg) {
		var i, id, val, remoteId, ds;
		var code = 0, msg = "";
		var dsArray = new nexacro.Collection();

		try {
			var xmldoc = nexacro._getXMLDocument(this._unique_id, data, url);
			if (xmldoc) {
				url = xmldoc.URL ? xmldoc.URL : url;
				if (url == "about:blank") {
					return;
				}

				var result = nexacro._getCommDataFromDom(xmldoc, this);
				var variables = result[0];
				var datasets = result[1];
				var len = variables.length;

				if (len > 0) {
					for (i = 0; i < len; i++) {
						id = variables[i]["id"];
						if (id && id.length) {
							val = variables[i]["val"];
							if (id == "ErrorCode") {
								code = parseInt(val, 10);
								if (!isFinite(code)) {
									code = -1;
								}
							}
							else if (id == "ErrorMsg") {
								msg = val;
							}
						}
					}
					if (code < 0) {
						this.on_fire_onerror(this, "ObjectError", msg, this, 9901, null, null, -1);
					}
					else {
						this.on_fire_onsuccess(datasets, code, msg, url, variables);
					}
				}
				else {
					var errormsg = "failed to get";
					this.on_fire_onerror(this, "ObjectError", errormsg, this, 9901, null, null, -1);
				}
			}
		}
		catch (e) {
			var errormsg = "failed to get";
			if (e && e.message) {
				errormsg = e.message;
			}

			this.on_fire_onerror(this, "ObjectError", errormsg, this, 9901, null, null, -1);
		}
	};

	_pFileUpload._on_item_onfindclick = function (obj, e) {
		this.set_index(obj.index);

		var bHandled = false;
		var index = nexacro._indexOf(this._items, obj);

		if (this._isEnable() && this.enableevent) {
			bHandled = this.on_fire_onfindclick(obj, index);

			if (bHandled) {
				try {
					nexacro._findclick(this._unique_id, obj.name, obj, this._hidden_frame_handle);
				}
				catch (e) {
					var errorobj = nexacro.MakeError("ObjectError", this, "comp_incorrect_file");
					this.on_fire_onerror(this, errorobj.name, errorobj.message, obj, null, null, null, index);
				}
			}
		}
		return bHandled;
	};

	_pFileUpload._on_item_onitemclick = function (obj, e) {
		this.set_index(obj.index);

		if (this.visible && this._isEnable() && this.enableevent) {
			this.on_fire_onitemclick(obj, obj.index);
		}
	};

	_pFileUpload._on_getAccessibilityAdditionalLabel = function () {
		if (this._first_focus == false) {
			var count = 0;
			var items = this._items;
			if (items) {
				count = items.length;
			}
			return (+this.index) + 1 + " " + count;
		}
		return "";
	};

	_pFileUpload._isAccessibilityEnable = function () {
		return true;
	};

	_pFileUpload.on_get_accessibility_label = function () {
		var label = "";
		return label;
	};


	_pFileUpload.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var idx = this.index;
		var items = this._items;

		while (true) {
			if (direction) {
				if (!this._buttonFlag && items[idx].fileitembutton._isAccessibilityEnable()) {
					this._editFlag = false;
					this._buttonFlag = true;
				}
				else {
					if (items[++idx]) {
						this._editFlag = true;
						this._buttonFlag = false;

						if (!items[idx].fileitemedit._isAccessibilityEnable()) {
							continue;
						}
					}
					else {
						this._editFlag = false;
						this._buttonFlag = false;
						return this._want_arrow = false;
					}
				}
			}
			else {
				if (!this._editFlag && items[idx].fileitemedit._isAccessibilityEnable()) {
					this._editFlag = true;
					this._buttonFlag = false;
				}
				else {
					if (items[--idx]) {
						this._editFlag = false;
						this._buttonFlag = true;
						if (!items[idx].fileitembutton._isAccessibilityEnable()) {
							continue;
						}
					}
					else {
						this._editFlag = false;
						this._buttonFlag = false;
						return this._want_arrow = false;
					}
				}
			}
			break;
		}

		if (items[idx]) {
			if (this._editFlag) {
				items[idx].fileitemedit._setAccessibilityNotifyEvent();
			}
			else if (this._buttonFlag) {
				items[idx].fileitembutton._setAccessibilityNotifyEvent();
			}

			this.index = idx;
			this.value = items[idx].value;
			return this._want_arrow = true;
		}
		else {
			return this._want_arrow = false;
		}
	};

	_pFileUpload._setAccessibilityNotifyEvent = function (direction) {
		this._editFlag = false;
		this._buttonFlag = false;

		var idx = 0;
		var items = this._items;
		var itemLen = items.length;
		if (itemLen) {
			if (direction) {
				idx = 0;
				if (items[idx] && items[idx].fileitemedit._isAccessibilityEnable()) {
					this._editFlag = true;
				}
				else if (items[idx] && items[idx].fileitembutton._isAccessibilityEnable()) {
					this._buttonFlag = true;
				}
			}
			else {
				idx = itemLen - 1;
				if (items[idx] && items[idx].fileitembutton._isAccessibilityEnable()) {
					this._buttonFlag = true;
				}
				else if (items[idx] && items[idx].fileitemedit._isAccessibilityEnable()) {
					this._editFlag = true;
				}
			}

			if (this._buttonFlag || this._editFlag) {
				if (this._editFlag) {
					items[idx].fileitemedit._setAccessibilityNotifyEvent();
				}
				else if (this._buttonFlag) {
					items[idx].fileitembutton._setAccessibilityNotifyEvent();
				}

				this.index = idx;
				this.value = items[idx].value;
				return this._want_arrow = true;
			}
		}

		this._want_arrow = false;
		return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, direction);
	};

	_pFileUpload._setAccessibilityInfoByHover = function (control) {
		if (control) {
			this._editFlag = false;
			this._buttonFlag = false;

			var item = control.parent;
			if (control instanceof nexacro.FileItemEditCtrl) {
				this._editFlag = true;
			}
			else if (control instanceof nexacro.FileItemButtonCtrl) {
				this._buttonFlag = true;
			}

			this.index = item.index;
			this._want_arrow = true;
			control._setAccessibilityNotifyEvent();

			return true;
		}

		return false;
	};


	_pFileUpload.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.FileUploadErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index);
			return this.onerror._fireEvent(this, evt);
		}
		return true;
	};

	_pFileUpload.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.FileUploadMouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, evtinfo_control.index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttondown._fireEvent(this, evt);
		}
		return false;
	};

	_pFileUpload.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
			var evt = new nexacro.FileUploadMouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, evtinfo_control.index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pFileUpload.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var items = this._items;
		var tab_flag = false;
		var idx = this.index;
		var E = nexacro.Event;

		if (keycode == E.KEY_TAB) {
			if ((shift_key && idx == 0) || (!shift_key && idx == items.length - 1)) {
				this._want_tab = false;
				this.set_index(-1);
			}
			else {
				if (shift_key) {
					idx--;
				}
				else {
					idx++;
				}
				this.set_index(idx);
			}
			this._getWindow()._keydown_element._event_stop = true;
		}
		else {
			if (nexacro._enableaccessibility) {
				var focus_up = keycode == E.KEY_UP;
				var focus_down = keycode == E.KEY_DOWN;


				var accessibilityenable = this.accessibilityenable;
				var buttonaccessibilityenable = this.buttonaccessibilityenable;
				var editaccessibilityenable = this.editaccessibilityenable;

				if (focus_up || focus_down) {
					var _window = this._getWindow();
					if ((focus_up && idx < 0) || (focus_down && this._buttonFlag && idx == items.length - 1)) {
						this._want_arrow = false;
					}
					else {
						while (editaccessibilityenable || buttonaccessibilityenable) {
							if (focus_up) {
								if (!this._editFlag && editaccessibilityenable) {
									this.index = -1;
									this._editFlag = true;
									this._buttonFlag = false;
								}
								else {
									idx--;
									if (buttonaccessibilityenable) {
										if (idx < 0) {
											if (accessibilityenable) {
												this._editFlag = false;
												this._buttonFlag = false;
												_window._removeFromCurrentFocusPath(this, false);
												this._setFocus(false);
											}
											else {
												this._want_arrow = false;
												break;
											}
										}
										else {
											this.index = -1;
											this._editFlag = false;
											this._buttonFlag = true;
										}
									}
									else {
										if (idx > 0) {
											this._buttonFlag = false;
											continue;
										}
										else {
											this._want_arrow = false;
											if (accessibilityenable) {
												this._editFlag = false;
												this._buttonFlag = false;
												_window._removeFromCurrentFocusPath(this, false);
												this._setFocus(false);
											}
										}
									}
								}
							}
							else if (focus_down) {
								if (!this._editFlag && editaccessibilityenable) {
									idx++;
									this._editFlag = true;
									this._buttonFlag = false;
								}
								else {
									if (buttonaccessibilityenable) {
										this.index = -1;
										this._editFlag = false;
										this._buttonFlag = true;
									}
									else {
										if (idx < items.length - 1) {
											this._editFlag = false;
											continue;
										}
										else {
											this._want_arrow = false;
											break;
										}
									}
								}
							}
							this.set_index(idx);
							this._want_arrow = true;
							this._getWindow()._keydown_element._event_stop = true;
							break;
						}
					}
				}
				else {
					this._want_arrow = false;
				}
			}
		}
		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};
	_pFileUpload._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
		var items = this._items;
		var itemLen = items.length;
		var focus_dir = null;
		var idx = this.index;
		if (itemLen) {
			this._want_tab = true;
			focus_dir = evt_name == "shifttabkey";
			if (evt_name == "shifttabkey" || evt_name == "tabkey") {
				this._editFlag = false;
				this._buttonFlag = true;
				if (focus_dir) {
					idx = this.index < 0 ? itemLen - 1 : this.index;
				}
				else {
					idx = this.index < 0 ? 0 : this.index;
					this._first_focus = true;
				}
				this.index = -1;

				this.set_index(idx);
			}
			else {
				focus_dir = evt_name == "upkey";
				if (nexacro._enableaccessibility && this._isAccessibilityEnable()) {
					this._editFlag = false;
					this._buttonFlag = false;
					this._want_arrow = true;

					var accessibility = nexacro._toBoolean(this.accessibilityenable);
					var editaccessibility = nexacro._toBoolean(this.editaccessibilityenable);
					var buttonaccessibility = nexacro._toBoolean(this.buttonaccessibilityenable);

					if (focus_dir) {
						this.index = -1;
						idx = itemLen - 1;
						if (buttonaccessibility) {
							this._buttonFlag = true;
						}
						else if (editaccessibility) {
							this._editFlag = true;
						}
					}
					else {
						idx = -1;
						if (accessibility == false) {
							idx = 0;
							this.index = -1;
							if (editaccessibility) {
								this._editFlag = true;
							}
							else if (buttonaccessibility) {
								this._buttonFlag = true;
							}
							this._first_focus = (this._editFlag || this._buttonFlag) ? true : false;
						}
					}

					this.set_index(idx);
				}
			}

			if (nexacro._enableaccessibility) {
				this._first_focus = false;
			}
		}
	};

	_pFileUpload._find_item_status = function (item) {
		this._editFlag = (item.fileitemedit._status == "focused");
		this._buttonFlag = (item.fileitembutton._status == "focused");
	};

	_pFileUpload.on_fire_ondeleteitem = function (obj, index) {
		if (this.ondeleteitem && this.ondeleteitem._has_handlers) {
			var evt = new nexacro.FileUploadItemEventInfo(obj, "ondeleteitem", index);
			this.ondeleteitem._fireEvent(this, evt);
		}
	};

	_pFileUpload.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.FileUploadErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index);
			return this.onerror._fireEvent(this, evt);
		}
		return true;
	};

	_pFileUpload.on_fire_onfindclick = function (obj, index) {
		if (this.onfindclick && this.onfindclick._has_handlers) {
			var evt = new nexacro.FileUploadItemEventInfo(this, "onfindclick", index);
			return this.onfindclick._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pFileUpload.on_fire_onitemchanged = function (obj, index, oldvalue, newvalue) {
		if (this.onitemchanged && this.onitemchanged._has_handlers) {
			var evt = new nexacro.FileUploadItemChangeEventInfo(obj, "onitemchanged", index, oldvalue, newvalue);
			this.onitemchanged._fireEvent(this, evt);
		}
	};

	_pFileUpload.on_fire_onitemclick = function (obj, index) {
		if (this.onitemclick && this.onitemclick._has_handlers) {
			var evt = new nexacro.FileUploadItemEventInfo(this, "onitemclick", index);
			this.onitemclick._fireEvent(this, evt);
		}
	};

	_pFileUpload.on_fire_onappenditem = function (obj, index) {
		if (this.onappenditem && this.onappenditem._has_handlers) {
			var evt = new nexacro.FileUploadItemEventInfo(obj, "onappenditem", index);
			this.onappenditem._fireEvent(this, evt);
		}
	};

	_pFileUpload.on_fire_onsuccess = function (ds, code, msg, url, variables) {
		var application = nexacro.getApplication();
		if (application) {
			application._endCommProgress();
		}

		if (this.onsuccess && this.onsuccess._has_handlers) {
			if (variables && variables.length > 0) {
				var evt = new nexacro.FileUploadEventInfo(this, "onsuccess", ds, code, msg, url);
				return this.onsuccess._fireEvent(this, evt);
			}
			else {
				var evt = new nexacro.FileUploadEventInfo(this, "onsuccess", ds, undefined, undefined, url);
				return this.onsuccess._fireEvent(this, evt);
			}
		}
	};

	_pFileUpload._createFileItem = function (index) {
		var create_only = this._is_created ? false : true;
		var unique = this.itemcount < 1 ? this._last_id = 0 : ++this._last_id;
		var name = "upfile" + unique;
		var item = new nexacro._FileUploadItemControl("upfile" + unique, 0, 0, 0, 0, null, null, null, null, null, null, this);
		item._setControl();
		item._setItemInfo(index, this.buttontext);
		item.createComponent(create_only);

		item._setEventHandler("onfindclick", this._on_item_onfindclick, this);
		item._setEventHandler("onitemclick", this._on_item_onitemclick, this);

		return item;
	};

	_pFileUpload._recalcLayout = function () {
		var items = this._items;
		var item_len = items.length;
		if (!item_len) {
			return;
		}

		var item_left = this._getClientLeft();
		var item_top;
		var item_width = this._getClientWidth();
		var item_height = this._getItemHeight();

		for (var i = 0; i < item_len; i++) {
			item_top = item_height * i;

			items[i].move(item_left, item_top, item_width, item_height, null, null);
		}
	};

	_pFileUpload._updateFileList = function () {
		var file_list = this.filelist = [];

		var item;
		var items = this._items;
		var item_len = items.length;

		var v_file, files, files_len, file;
		for (var i = 0; i < item_len; i++) {
			item = items[i];
			files = item._files;
			if (files) {
				files_len = files.length;
				for (var j = 0; j < files_len; j++) {
					v_file = new nexacro.VirtualFile("uploadfile" + j);
					file = files[j];
					v_file._setRefFile(file);
					file_list[j] = v_file;
				}
			}
		}
		this.filelist = file_list;
	};

	_pFileUpload._setText = function (v) {
		if (this.text != v) {
			this.text = v;
		}
	};

	_pFileUpload._setValue = function (v) {
		if (this.value != v) {
			this.value = v;
		}
	};

	_pFileUpload._setControlFlag = function (item) {
		this._editFlag = (item.fileitemedit._status == "focused");
		this._buttonFlag = (item.fileitembutton._status == "focused");
	};

	_pFileUpload._getItem = function (index) {
		if (index >= 0 && this._items.length > 0) {
			return this._items[index];
		}

		return null;
	};

	_pFileUpload._getItemHeight = function () {
		var item = this._items[0];
		if (!item) {
			return 0;
		}

		var itemheight = this.itemheight;
		if (itemheight) {
			return itemheight;
		}

		return item._on_getFitSize()[1];
	};

	_pFileUpload._getEventInfoComponent = function (refer_comp) {
		while (!refer_comp._is_eventinfo_control) {
			refer_comp = refer_comp.parent;
		}
		return refer_comp;
	};

	_pFileUpload._isPopupFrame = function () {
		return this._onPopupWin;
	};

	delete _pFileUpload;

	nexacro._FileUploadItemControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pFileUploadItemControl = nexacro._createPrototype(nexacro.Component, nexacro._FileUploadItemControl);
	nexacro._FileUploadItemControl.prototype = _pFileUploadItemControl;
	_pFileUploadItemControl._type_name = "FileUploadItemControl";


	_pFileUploadItemControl.fileitemedit = null;
	_pFileUploadItemControl.fileitembutton = null;


	_pFileUploadItemControl.buttontext = "find";
	_pFileUploadItemControl.index = 0;
	_pFileUploadItemControl.value = undefined;


	_pFileUploadItemControl._oldvalue = "";
	_pFileUploadItemControl._newvalue = "";
	_pFileUploadItemControl.value = "";
	_pFileUploadItemControl.index = 0;
	_pFileUploadItemControl.accessibilityrole = "none";


	_pFileUploadItemControl._event_list = 
		{
		"onfindclick" : 1, 
		"onitemclick" : 1
	};

	_pFileUploadItemControl.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var itemedit = this.fileitemedit = new nexacro._FileUploadItemEditControl("fileuploaditemedit", 0, 0, 0, 0, null, null, null, null, null, null, this);
			var itembutton = this.fileitembutton = new nexacro._FileUploadItemButtonControl("fileuploaditembutton", 0, 0, 0, 0, null, null, null, null, null, null, this);

			itemedit.set_readonly("true");
			itemedit.createComponent(true);

			itembutton.set_text(this.buttontext);
			itembutton.createComponent(true);
		}
	};

	_pFileUploadItemControl.on_created_contents = function () {
		var parent = this.parent;
		if (parent) {
			nexacro._append_hidden_item(parent._unique_id, this.name, this._on_itemedit_onchange, this, parent._hidden_frame_handle, parent.multiselect);
		}

		var itemedit = this.fileitemedit;
		var itembutton = this.fileitembutton;

		itemedit.on_created();
		itemedit._setEventHandler("oneditclick", this._on_itemedit_oneditclick, this);
		itemedit._setEventHandler("onlbuttondown", this._on_itemedit_oneditlbuttondown, this);

		itembutton.on_created();
		itembutton._setEventHandler("onclick", this._on_itembutton_onfindclick, this);
		itembutton._setEventHandler("onlbuttondown", this._on_itembutton_onfindlbuttondown, this);
	};

	_pFileUploadItemControl.on_destroy_contents = function () {
		if (this.fileitemedit) {
			this.parent.filepathedits.delete_item(this.id);

			this.fileitemedit.destroy();
			this.fileitemedit = null;
		}
		if (this.fileitembutton) {
			this.parent.filefindbuttons.delete_item(this.id);

			this.fileitembutton.destroy();
			this.fileitembutton = null;
		}

		if (this._files) {
			this._files = null;
		}


		var parent = this.parent;
		nexacro._remove_hidden_item(parent._unique_id, this.name, parent._hidden_frame_handle);
		if (this._input_node) {
			this._input_node = null;
		}
	};

	_pFileUploadItemControl.on_create_contents_command = function () {
		var str = "";
		var itemedit = this.fileitemedit;
		if (itemedit) {
			str += itemedit.createCommand();
		}

		var itembutton = this.fileitembutton;
		if (itembutton) {
			str += itembutton.createCommand();
		}

		return str;
	};

	_pFileUploadItemControl.on_attach_contents_handle = function (win) {
		var itemedit = this.fileitemedit;
		var itembutton = this.fileitembutton;

		itemedit.attachHandle(win);
		itemedit._setEventHandler("oneditclick", this._on_itemedit_oneditclick, this);
		itemedit._setEventHandler("onlbuttondown", this._on_itemedit_oneditlbuttondown, this);

		itembutton.attachHandle(win);
		itembutton._setEventHandler("onclick", this._on_itembutton_onfindclick, this);
		itembutton._setEventHandler("onlbuttondown", this._on_itembutton_onfindlbuttondown, this);

		var parent = this.parent;
		nexacro._append_hidden_item(parent._unique_id, this.name, this._on_itemedit_onchange, this, parent._hidden_frame_handle, parent._multiselect);
	};

	_pFileUploadItemControl.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			this._recalcLayout();
		}
	};

	_pFileUploadItemControl.on_getIDCSSSelector = function () {
		return "fileuploaditem";
	};

	_pFileUploadItemControl._on_getFitSize = function () {
		var elem = this.getElement();
		if (elem) {
			var total_w = 0;
			var total_h = 0;

			var itemedit_size = [0, 0];
			var itembutton_size = [0, 0];

			var border = this._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			var padding = this._getCurrentStylePadding();
			if (padding) {
				total_w += padding.left + padding.right;
				total_h += padding.top + padding.bottom;
			}

			var itemedit = this.fileitemedit;
			if (itemedit) {
				itemedit_size = itemedit._on_getFitSize();
			}

			var itembutton = this.fileitembutton;
			if (itembutton) {
				itembutton_size = itembutton._on_getFitSize();
			}

			var itemheight = this._getPropItemHeight();
			if (itemheight == null) {
				itemheight = Math.max(itemedit_size[1], itembutton_size[1]);
			}

			var buttonsize = this._getPropButtonSize();
			if (buttonsize == null) {
				buttonsize = itembutton_size[0];
			}

			total_w += buttonsize + itemedit_size[1];
			total_h += itemheight;

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pFileUploadItemControl._on_itemedit_oneditclick = function (obj, e) {
		if (this.onitemclick && this.onitemclick._has_handlers) {
			this.onitemclick._fireEvent(this, e);
		}
		return false;
	};

	_pFileUploadItemControl._on_itemedit_oneditlbuttondown = function (obj, e) {
		this._accessibility_find_focus_flag(true, false);
		this.parent.set_index(this.index);
	};

	_pFileUploadItemControl._on_itemedit_onchange = function (value, files, value_arr) {
		var fileupload = this.parent;
		if (files) {
			this._files = files;
			if (fileupload) {
				fileupload._updateFileList();
			}
		}

		if (this.value != value) {
			this.value = value;
			this._oldvalue = this._newvalue;
			this._newvalue = value_arr;

			if (this.fileitemedit) {
				this.fileitemedit.set_value(value);
			}

			if (fileupload) {
				fileupload.set_index(this.index);
				fileupload._setText(value);
				fileupload._setValue(value);
			}

			fileupload.on_fire_onitemchanged(this, this.index, this._oldvalue, this._newvalue);
		}
	};

	_pFileUploadItemControl._on_itembutton_onfindclick = function (obj, e) {
		if (this.onfindclick && this.onfindclick._has_handlers) {
			return this.onfindclick._fireCheckEvent(this, e);
		}
		return false;
	};

	_pFileUploadItemControl._on_itembutton_onfindlbuttondown = function (obj, e) {
		this._accessibility_find_focus_flag(false, true);
		this.parent.set_index(this.index);
	};

	_pFileUploadItemControl._recalcLayout = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var itemedit = this.fileitemedit;
			var itembutton = this.fileitembutton;

			var client_w = this._getClientWidth();
			var client_h = this._getClientHeight();

			var itembutton_size = [0, 0];
			if (itembutton) {
				itembutton_size = itembutton._on_getFitSize();
			}

			var itemheight = this._getPropItemHeight();
			if (itemheight == null) {
				var itemedit_size = [0, 0];

				if (itemedit) {
					itemedit_size = itemedit._on_getFitSize();
				}

				itemheight = Math.max(itemedit_size[1], itembutton_size[1]);
			}

			var buttonsize = this._getPropButtonSize();
			if (buttonsize == null) {
				buttonsize = itembutton_size[0];
			}

			if (client_w < buttonsize) {
				buttonsize = client_w;
			}

			var edit_l = this._getClientLeft();
			var edit_t = this._getClientTop();
			var edit_w = client_w - buttonsize;
			var edit_h = itemheight;

			var button_l = edit_l + edit_w;
			var button_t = edit_t;
			var button_w = buttonsize;
			var button_h = itemheight;

			if (itemedit) {
				itemedit.move(edit_l, edit_t, edit_w, edit_h, null, null);
			}

			if (itembutton) {
				itembutton.move(button_l, button_t, button_w, button_h, null, null);
			}
		}
	};

	_pFileUploadItemControl._setItemInfo = function (index, buttontext) {
		this.index = index;
		this.buttontext = buttontext;
	};

	_pFileUploadItemControl._getPropButtonSize = function () {
		var fileupload = this.parent;
		if (fileupload) {
			return fileupload.buttonsize;
		}

		return;
	};

	_pFileUploadItemControl._getPropItemHeight = function () {
		var fileupload = this.parent;
		if (fileupload) {
			return fileupload.itemheight;
		}

		return;
	};

	_pFileUploadItemControl._accessibility_find_focus_flag = function (editflag, buttonflag) {
		if (nexacro._enableaccessibility) {
			this.parent._editFlag = editflag;
			this.parent._buttonFlag = buttonflag;
		}
	};

	_pFileUploadItemControl._isPopupFrame = function () {
		return this.parent._onPopupWin;
	};

	delete _pFileUploadItemControl;

	nexacro._FileUploadItemEditControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Edit.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pFileUploadItemEditControl = nexacro._createPrototype(nexacro.Edit, nexacro._FileUploadItemEditControl);
	nexacro._FileUploadItemEditControl.prototype = _pFileUploadItemEditControl;
	_pFileUploadItemEditControl._type_name = "EditControl";


	_pFileUploadItemEditControl._is_subcontrol = true;
	_pFileUploadItemEditControl._is_eventinfo_control = false;

	_pFileUploadItemEditControl._getAccessibilityLabel = function (accessibility) {
		var label = "";
		if (this.parent.parent._first_focus) {
			var comp = this.parent.parent;
			label = comp._control_element._makeAccessibilityLabelbyReadtype();
		}
		label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
		return label;
	};

	_pFileUploadItemEditControl.on_focus_basic_action = function (self_flag, evt_name) {
		if (this._isAccessibilityEnable()) {
			this.on_apply_accessibility();
		}

		return nexacro.Component.prototype.on_focus_basic_action.call(this, self_flag, evt_name);
	};

	delete _pFileUploadItemEditControl;

	nexacro._FileUploadItemButtonControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pFileUploadItemButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._FileUploadItemButtonControl);
	nexacro._FileUploadItemButtonControl.prototype = _pFileUploadItemButtonControl;
	_pFileUploadItemButtonControl._type_name = "ButtonControl";


	_pFileUploadItemButtonControl._is_subcontrol = true;
	_pFileUploadItemButtonControl._is_eventinfo_control = false;

	_pFileUploadItemButtonControl._getAccessibilityLabel = function (accessibility) {
		var label = "";
		if (this.parent.parent._first_focus) {
			var comp = this.parent.parent;
			label = comp._control_element._makeAccessibilityLabelbyReadtype();
		}
		label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
		return label;
	};

	_pFileUploadItemButtonControl.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		var window = this._getWindow();
		var elem = window._cur_ldown_elem || window._keydown_element;

		if (elem == this._cur_ldown_elem) {
			if (key_code == 13 || key_code == 32) {
				this._click(key_code);
			}
		}

		this._cur_ldown_elem = null;

		return ret;
	};

	delete _pFileUploadItemButtonControl;
}
