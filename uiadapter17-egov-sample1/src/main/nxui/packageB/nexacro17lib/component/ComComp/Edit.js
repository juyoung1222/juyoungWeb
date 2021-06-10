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

if (!nexacro.Edit) {
	nexacro.Edit = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._onlydisplay = onlydisplay;

		if (onlydisplay) {
			this._apply_client_padding = true;
			this.readonly = true;
		}
	};

	var _pEdit = nexacro._createPrototype(nexacro.Component, nexacro.Edit);
	nexacro.Edit.prototype = _pEdit;
	_pEdit._type_name = "Edit";


	_pEdit.value = undefined;
	_pEdit.displaynulltext = "";
	_pEdit.readonly = false;
	_pEdit.password = false;
	_pEdit.autoselect = false;
	_pEdit.autoskip = false;
	_pEdit.maxlength = 0;
	_pEdit.usesoftkeyboard = true;
	_pEdit.inputmode = "normal";
	_pEdit.inputfilter = "none";
	_pEdit.inputtype = "normal";
	_pEdit.imemode = "none";
	_pEdit.useime = "global";
	_pEdit.text = "";
	_pEdit.usecontextmenu = true;


	_pEdit._input_element = null;

	_pEdit._inputfilter_obj = null;
	_pEdit._inputtype_obj = null;
	_pEdit._undostack = null;

	_pEdit._default_value = undefined;
	_pEdit._default_text = "";
	_pEdit._keypad_type = "text";
	_pEdit._imedisable = false;

	_pEdit._processing_updateToDataset = false;
	_pEdit._result_updateToDataset = true;

	_pEdit._onlydisplay = false;
	_pEdit._apply_client_padding = false;
	_pEdit._has_inputElement = true;


	_pEdit._is_simple_control = true;
	_pEdit._is_editable_control = true;
	_pEdit._use_readonly_status = true;


	_pEdit._event_list = {
		"oneditclick" : 1, 
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
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmousedown" : 1, 
		"onmouseup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"canchange" : 1, 
		"onchanged" : 1, 
		"oninput" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};


	_pEdit.accessibilityrole = "edit";

	_pEdit.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var input_elem;
			if (!this._onlydisplay) {
				input_elem = this._input_element = new nexacro.InputElement(control, "input");
				input_elem.setElementAutoSkip(this.autoskip);
				input_elem.setElementAutoSelect(this.autoselect);
				input_elem.setElementUseIme(this.useime);
				input_elem.setElementImeMode(this.imemode);
				input_elem.setElementReadonly(this.readonly);
				input_elem.setElementDisplayNullText(this.displaynulltext);
				input_elem.setElementMaxLength(this.maxlength);
				input_elem.setElementInputType(this.password ? "password" : this._keypad_type, this._imedisable);
			}
			else {
				input_elem = this._input_element = new nexacro.TextBoxElement(control, "input");
				input_elem.setElementVerticalAlign("middle");
			}

			input_elem.setElementPosition(this._getClientLeft(), this._getClientTop());
			input_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
			input_elem.setElementTextDecoration(this._textdecoration);
			input_elem.setElementTextAlign(this.textAlign);
			input_elem.setElementPadding(this.padding);

			this._undostack = new nexacro._EditUndoStack(this);
		}
	};

	_pEdit.on_created_contents = function (win) {
		var input_elem = this._input_element;
		if (input_elem) {
			this.on_apply_value(this.value);

			input_elem.create(win);
			this.set_usesoftkeyboard(this.usesoftkeyboard, true);

			if (nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
		}
	};

	_pEdit.on_destroy_contents = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.destroy();
			this._input_element = null;
		}

		var undostack = this._undostack;
		if (undostack) {
			undostack.destroy();
			this._undostack = null;
		}

		var inputfilterobj = this._inputfilter_obj;
		if (inputfilterobj) {
			this._inputfilter_obj = null;
		}

		var inputtypeobj = this._inputtype_obj;
		if (inputtypeobj) {
			this._inputtype_obj = null;
		}
	};

	_pEdit.on_create_contents_command = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			this.on_apply_value(this.value);

			return input_elem.createCommand();
		}

		return "";
	};

	_pEdit.on_attach_contents_handle = function (win) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.attachHandle(win);

			if (nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
		}
	};

	_pEdit.on_change_containerRect = function (width, height) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementSize(width, height);
		}
	};

	_pEdit.on_change_containerPos = function (left, top) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementPosition(left, top);
		}
	};

	_pEdit._apply_setfocus = function (evt_name) {
		var input_elem = this._input_element;
		if (input_elem) {
			this._default_value = this.value;
			this._default_text = this.text;

			if (!this._onlydisplay) {
				this._changeUserStatus("nulltext", false);

				input_elem.setElementFocus(evt_name);

				var text = input_elem.getElementText();
				if (text != this.text) {
					this._default_text = this.text = text;
				}
			}
		}
	};

	_pEdit.on_getBindableProperties = function () {
		return "value";
	};

	_pEdit.on_apply_prop_enable = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			var color = this._getCSSStyleValue("color");

			if (!this._onlydisplay) {
				input_elem.setElementEnable(v, color);
			}
		}
	};

	_pEdit.on_init_bindSource = function (columnid, propid) {
		if (propid == "value") {
			if (this._undostack) {
				this._undostack.clear();
			}

			this._setValue(undefined);
		}
	};

	_pEdit.on_change_bindSource = function (propid, ds, row, col) {
		if (propid == "value") {
			var input_elem = this._input_element;
			if (input_elem) {
				if (!this._onlydisplay) {
					input_elem.setCompositionComplete();
				}
			}

			var v = ds.getColumn(row, col);
			if (v == this.value) {
				return;
			}

			if (this._undostack) {
				this._undostack.clear();
			}

			this._setValue(v);
		}
	};

	_pEdit.on_changeUserStatus = function (changestatus, value, applyuserstatus) {
		if (value) {
			return changestatus;
		}
		else {
			return applyuserstatus;
		}
	};

	_pEdit._getDlgCode = function () {
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false
		};
	};

	_pEdit._getDragData = function () {
		return this.getSelectedText();
	};

	_pEdit.on_get_accessibility_label = function () {
		var label = "";
		return label;
	};

	_pEdit._on_getFitSize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var total_w = 0;
			var total_h = 0;

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

			var text = this.text;
			if (text) {
				var font = this._getCurrentStyleInheritValue("font");
				var wordspace = this._getCurrentStyleInheritValue("wordSpacing");
				var letterspace = this._getCurrentStyleInheritValue("letterSpacing");

				var text_size = nexacro._getTextSize(this.text, font, false, undefined, "none", wordspace, letterspace);

				total_w += Math.ceil(text_size[0]);
				total_h += Math.ceil(text_size[1]);
			}

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	_pEdit.set_text = nexacro._emptyFn;

	_pEdit.set_value = function (v) {
		v = (v === undefined || v === null) ? v : nexacro._toString(v).replace(/&quot;/g, "\"");

		if (this.value !== v) {
			if (!this.applyto_bindSource("value", v)) {
				return;
			}

			this._setValue(v);
		}
	};

	_pEdit.on_apply_value = function (value) {
		var input_elem = this._input_element;
		if (input_elem) {
			var text = this.text;
			value = (this.value ? this.text : this.value);

			if (this._is_created && nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
			else {
				this._changeUserStatus("nulltext", false);
			}

			if (!this._onlydisplay) {
				if (this._undostack) {
					var pos = input_elem.getElementCaretPos();
					this._undostack.push(value, (pos && pos != -1) ? pos.begin : 0, pos ? pos.end : 0);
				}

				input_elem.setElementValue(value);
				text = input_elem.getElementText();
			}
			else {
				if (this.displaynulltext && nexacro._isNull(this.value)) {
					input_elem.setElementText(this.displaynulltext);
				}
				else {
					input_elem.setElementText(value);
				}
			}

			if (this.text != text) {
				this.text = text;
			}
			this._updateAccessibilityLabel();
			this._default_value = this.value;
			this._default_text = this.text;
		}
	};

	_pEdit.set_displaynulltext = function (v) {
		v = nexacro._toString(v).replace(/&quot;/g, "\"");
		if (this.displaynulltext != v) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext(v);
		}
	};

	_pEdit.on_apply_displaynulltext = function (displaynulltext) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (this._onlydisplay) {
				this.on_apply_value(this.value);
			}
			else {
				input_elem.setElementDisplayNullText(displaynulltext);
			}
		}
	};

	_pEdit.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pEdit.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementReadonly(readonly);
			}
		}
	};

	_pEdit.set_autoselect = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoselect != v) {
			this.autoselect = v;
			this.on_apply_autoselect(v);
		}
	};

	_pEdit.on_apply_autoselect = function (autoselect) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementAutoSelect(autoselect);
			}
		}
	};

	_pEdit.set_autoskip = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoskip != v) {
			this.autoskip = v;
			this.on_apply_autoskip(v);
		}
	};

	_pEdit.on_apply_autoskip = function (autoskip) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementAutoSkip(autoskip);
			}
		}
	};

	_pEdit.set_inputmode = function (v) {
		var inputmode_enum = ["normal", "upper", "lower"];
		if (inputmode_enum.indexOf(v) == -1) {
			return;
		}

		if (this.inputmode != v) {
			this.inputmode = v;
		}
	};

	_pEdit.set_inputfilter = function (v) {
		if (v) {
			var inputfilter_arr = v.split(',');
			var inputfilter_enum = ["none", "alpha", "digit", "comma", "dot", "sign", "space", "symbol"];
			for (var i in inputfilter_arr) {
				if (inputfilter_enum.indexOf(inputfilter_arr[i]) == -1) {
					return;
				}
			}
		}
		else {
			return;
		}

		if (this.inputfilter != v) {
			this.inputfilter = v;
			this._inputfilter_obj = null;

			this.on_apply_inputfilter(v);
		}
	};

	_pEdit.on_apply_inputfilter = function (inputfilter) {
		this._inputfilter_obj = new nexacro._EditInputFilter(inputfilter);
	};

	_pEdit.set_inputtype = function (v) {
		if (v) {
			var inputtype_arr = v.split(',');
			var inputtype_enum = ["normal", "alpha", "english", "digit", "number", "comma", "dot", "sign", "space", "symbol", "half", "full", "numberandenglish"];
			for (var i = 0, len = inputtype_arr.length; i < len; i++) {
				if (inputtype_enum.indexOf(inputtype_arr[i]) == -1) {
					return;
				}
			}
		}
		else {
			return;
		}

		if (this.inputtype != v) {
			this.inputtype = v;
			this._inputtype_obj = null;

			this.on_apply_inputtype(v);
		}
	};

	_pEdit.on_apply_inputtype = function (inputtype) {
		this._inputtype_obj = new nexacro._EditInputType(inputtype);

		if (nexacro._isTouchInteraction && nexacro._SupportTouch) {
			this._imedisable = false;
		}
		else {
			this._imedisable = this._inputtype_obj.imedisable;
		}

		this._keypad_type = this._inputtype_obj.keypadtype;

		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementInputType(this.password ? "password" : this._keypad_type, this._imedisable);
		}
	};

	_pEdit.set_maxlength = function (v) {
		if (isNaN(v = +v) || v < 0) {
			return;
		}

		if (this.maxlength != v) {
			this.maxlength = v;
			this.on_apply_maxlength(v);
		}
	};

	_pEdit.on_apply_maxlength = function (maxlength) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementMaxLength(maxlength);
		}
	};

	_pEdit.set_password = function (v) {
		v = nexacro._toBoolean(v);
		if (this.password != v) {
			this.password = v;
			this.on_apply_password(v);
		}
	};

	_pEdit.on_apply_password = function (password) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementInputType(password ? "password" : this._keypad_type, this._imedisable);
		}
	};

	_pEdit.set_useime = function (v) {
		v = nexacro._toBoolean(v);
		if (this.useime != v) {
			this.useime = v;
			this.on_apply_useime(v);
		}
	};

	_pEdit.on_apply_useime = function (useime) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementUseIme(useime);
		}
	};

	_pEdit.set_usesoftkeyboard = function (v, bforce) {
		v = nexacro._toBoolean(v);
		if (v != this.usesoftkeyboard || bforce) {
			this.usesoftkeyboard = v;
			this.on_apply_usesoftkeyboard(bforce);
		}
	};

	_pEdit.on_apply_usesoftkeyboard = function (bforce) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementUseSoftKeyboard(this.usesoftkeyboard, bforce);
		}
	};

	_pEdit.set_imemode = function (v) {
		var imemode_enum = ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"];
		if (imemode_enum.indexOf(v) == -1) {
			return;
		}

		if (this.imemode != v) {
			this.imemode = v;
			this.on_apply_imemode(v);
		}
	};

	_pEdit.on_apply_imemode = function (imemode) {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			input_elem.setElementImeMode(imemode);
		}
	};

	_pEdit.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);
		if (this.usecontextmenu != v) {
			this.usecontextmenu = v;
		}
	};

	_pEdit.set_cursor = function (v) {
		this.cursor = v;
		if (v) {
			if (this._cursor == null || this._cursor.value != v) {
				if (this.enable && v == "auto") {
					v = "text";
				}
				var cursor = nexacro.CursorObject(v);
				this._cursor = cursor;
				this.on_apply_cursor(cursor);
			}
		}
		else {
			if (this._cursor) {
				this._cursor = null;
				this.on_apply_cursor(null);
			}
		}
	};

	_pEdit.on_apply_textAlign = function (halign) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementTextAlign(halign);
		}
	};

	_pEdit.on_apply_padding = function (padding) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementPadding(padding);
		}
	};

	_pEdit.on_apply_textDecoration = function (textDecoration) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementTextDecoration(textDecoration);
		}
	};

	_pEdit.getLength = function () {
		return (this.value ? this.value.length : 0);
	};

	_pEdit.getCaretPos = function () {
		if (this.readonly) {
			return -1;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			var pos = input_elem.getElementCaretPos();
			if (pos && pos != -1) {
				return pos.begin;
			}
		}

		return -1;
	};

	_pEdit.setCaretPos = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				if (arguments.length == 0) {
					v = 0;
				}
				else {
					v = nexacro._toInt(v);
					if (v == -1) {
						if (v) {
							v = this.text.length;
						}
						else {
							v = 0;
						}
					}
				}

				input_elem.setElementSetSelect(v, v);
			}

			return true;
		}

		return false;
	};

	_pEdit.getSelect = function () {
		var input_elem = this._input_element;
		if (input_elem && !this._onlydisplay) {
			return input_elem.getElementSelectionRange();
		}

		return [0, 0];
	};

	_pEdit.setSelect = function (start, end) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var txt = this.text ? this.text : "";
				var txt_len = txt.length;

				if (nexacro._isNull(start) || start === "") {
					start = 0;
				}
				if (nexacro._isNull(end) || end === "") {
					end = -1;
				}

				if (!nexacro._isNumber(start)) {
					start = nexacro._toInt(start);
				}
				if (!nexacro._isNumber(end)) {
					end = nexacro._toInt(end);
				}

				if (start == -1) {
					start = txt_len;
				}
				if (end == -1) {
					end = txt_len;
				}

				if (start > end) {
					var tmp = start;
					start = end;
					end = tmp;
				}

				input_elem.setElementSetSelect(start, end);
			}

			return true;
		}

		return false;
	};

	_pEdit.getSelectedText = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var sel = input_elem.getElementSelectionRange();
				var start = sel[0], end = sel[1];
				var text = this.text;

				if (text && (start != end)) {
					return text.substring(start, end);
				}
			}
		}

		return "";
	};

	_pEdit.setSelectedText = function (v) {
		v = nexacro._toString(v).replace(/&quot;/g, "\"");

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var sel = input_elem.getElementSelectionRange();
				var start = sel[0], end = sel[1];
				if (start == end) {
					return "";
				}

				var insertlen = v.length;
				var src = this.text.substring(start, end);
				var newtext = this.text;
				var newlen = newtext.length - (end - start) + insertlen;
				if (this.maxlength > 0 && newlen > this.maxlength) {
					v = v.substring(0, this.maxlength - insertlen);
				}
				newtext = newtext.substring(0, start) + v + newtext.substring(end);

				if (this.text != newtext) {
					this._setValue(newtext);
					input_elem.setElementSetSelect(start, start + insertlen);
				}

				return src;
			}
		}

		return "";
	};

	_pEdit.updateToDataset = function () {
		this._result_updateToDataset = this.applyto_bindSource("value", this.value);
		this._processing_updateToDataset = true;

		return this._result_updateToDataset;
	};

	_pEdit._on_deactivate = function () {
		if (!this._is_alive) {
			return;
		}

		if (!this._isSelected()) {
			this._changeStatus("focused", false);
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay && input_elem.isComposing()) {
				input_elem.setCompositionComplete();
			}
		}
	};

	_pEdit._on_value_change = function (pretext, prevalue, posttext, postvalue) {
		if (!this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue)) {
			return false;
		}

		if (this._processing_updateToDataset) {
			this._processing_updateToDataset = false;
			if (!this._result_updateToDataset) {
				return false;
			}
		}
		else if (!this.applyto_bindSource("value", postvalue)) {
			return false;
		}

		this.on_fire_onchanged(this, pretext, prevalue, posttext, postvalue);

		this._default_value = postvalue;
		this._default_text = posttext;

		return true;
	};

	_pEdit._on_scroll_change = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem._refreshElement();
		}
	};

	_pEdit._on_input_undo = function (item) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (item) {
				input_elem.updateElementText(item.value, item.end);
				input_elem.setElementSetSelect(item.start, item.end);
				return true;
			}
		}
	};

	_pEdit._on_input_redo = function (item) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (item) {
				input_elem.updateElementText(item.value, item.end);
				input_elem.setElementSetSelect(item.start, item.end);
				return true;
			}
		}
	};

	_pEdit.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (keycode == nexacro.KeyCode_ImeInput && this._imedisable) {
				input_elem.stopSysEvent();
				return;
			}
			else if (!alt_key && !shift_key && ctrl_key && keycode == 90) {
				if (input_elem.isComposing()) {
					input_elem.setCompositionComplete();
				}

				if (this._undostack) {
					this._undostack.undo();
					input_elem.stopSysEvent();
					return;
				}
			}
			else if (!alt_key && !shift_key && ctrl_key && keycode == 89) {
				if (this._undostack) {
					this._undostack.redo();
					input_elem.stopSysEvent();
					return;
				}
			}

			if (this._undostack) {
				var pos = input_elem.getElementCaretPos();
				if (pos && pos != -1) {
					this._undostack.update(pos.begin, pos.end);
				}
			}
		}
	};

	_pEdit.on_keydown_default_action = function (keycode) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (keycode == nexacro.Event.KEY_RETURN) {
				if (input_elem.isComposing()) {
					input_elem.setCompositionComplete();
				}

				var pre_value = this._default_value;
				var pre_text = this._default_text;

				var cur_value = input_elem.value;
				var cur_text = cur_value ? cur_value : "";

				if (pre_value != cur_value) {
					if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value)) {
						this.value = pre_value;
						this.text = pre_text;

						input_elem.setElementValue(pre_text);
					}
				}
			}
		}
	};

	_pEdit.on_keypress_basic_action = function (keycode, charcode, alt_key, ctrl_key) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (keycode == nexacro.Event.KEY_TAB) {
				if (!this._getDlgCode().want_tab) {
					input_elem.stopSysEvent();
					return;
				}
			}

			if (keycode !== 0 && charcode === 0) {
				return true;
			}
			else {
				if (keycode == nexacro.Event.KEY_ENTER || keycode == nexacro.Event.KEY_ESC) {
					return true;
				}
			}

			charcode = charcode || keycode;
			if (!ctrl_key && !alt_key && charcode) {
				var inputChar = String.fromCharCode(charcode);
				if (inputChar.length > 0 && this._isFilterChar(inputChar)) {
					input_elem.stopSysEvent();
					return false;
				}
			}
			return true;
		}
	};

	_pEdit.on_beforekeyinput_basic_action = function (value, status, begin, end, inputType) {
		if (this.readonly || !this._isEnable()) {
			return 0;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (input_elem._use_event_beforeinput) {
				return this._beforeinput_process_with_HTMLEvent(value, status, begin, end, inputType);
			}
			else {
				return this._beforeinput_process_with_NexacroInputEvent(value, status, begin, end);
			}
		}
	};

	_pEdit.on_keyinput_basic_action = function () {
		if (this.readonly || !this._isEnable()) {
			return false;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			var input_value = input_elem.value;
			var input_text = input_value ? input_value : "";

			this.value = input_value;
			this.text = input_text;

			var undostack = this._undostack;
			if (!input_elem.isComposing() && undostack) {
				var pos = input_elem.getElementCaretPos();
				this._undostack.push(input_value, (pos && pos != -1) ? pos.begin : 0, (pos && pos != -1) ? pos.end : 0);
			}
		}
		this._updateAccessibilityLabel();
	};

	_pEdit.on_killfocus_basic_action = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				var cur_text;
				if (input_elem.isComposing()) {
					cur_text = this.text;
					var filter_text = this.text;
					if (this._inputtype_obj) {
						filter_text = this._inputtype_obj.apply(cur_text);
					}
					if (this._inputfilter_obj) {
						filter_text = this._inputfilter_obj.apply(cur_text);
					}

					if (cur_text != filter_text) {
						input_elem.setCompositionCancel();
					}
					else {
						input_elem.setCompositionComplete();
					}
				}

				var pre_value = this._default_value;
				var pre_text = this._default_text;

				var cur_value = input_elem.value;
				cur_text = cur_value ? cur_value : "";

				if (pre_value != cur_value) {
					if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value)) {
						this.value = pre_value;
						this.text = pre_text;

						input_elem.setElementValue(pre_value);
					}
				}

				if (nexacro._isNull(this.value)) {
					this._changeUserStatus("nulltext", true);
				}

				if (nexacro._enableaccessibility && nexacro._Browser == "Runtime" && nexacro._accessibilitytype == 5) {
					this._setAccessibilityStatKillFocus();
				}

				input_elem.setElementBlur();
			}
		}
	};

	_pEdit.on_click_basic_action = function (elem, button) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementFocus(button);
			}
		}
	};

	_pEdit.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY) {
		if (this.oneditclick && this.oneditclick._has_handlers) {
			var caretpos = this.getCaretPos();
			var clientXY = this._getClientXY(canvasX, canvasY);

			var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
			return this.oneditclick._fireEvent(this, evt);
		}

		return true;
	};

	_pEdit.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "canchange", pretext, prevalue, posttext, postvalue);
			return this.canchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pEdit.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
	};

	_pEdit.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.InputEventInfo(this, "oninput");
			return this.oninput._fireEvent(this, evt);
		}

		return true;
	};

	_pEdit._setValue = function (v) {
		this.text = nexacro._toString(v);
		this.value = v;

		this.on_apply_value(v);
	};

	_pEdit._setReadonlyView = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (!this._onlydisplay) {
				input_elem.setElementReadonly(v);
			}
		}
	};

	_pEdit._setDefaultCaret = function () {
		this.setCaretPos(0);
	};

	_pEdit._setFocusToNextComponent = function () {
		var root_comp = this._getRootComponent(this);
		var next_comp = this._getForm().getNextComponent(root_comp, true);
		if (next_comp) {
			next_comp.setFocus();
			if (next_comp._is_editable_control) {
				next_comp._setDefaultCaret();
			}
		}
	};

	_pEdit._isFilterChar = function (ch) {
		if (ch != "") {
			if (this._inputfilter_obj && this._inputfilter_obj.test(ch)) {
				return true;
			}

			if (this._inputtype_obj && !this._inputtype_obj.test(ch)) {
				return true;
			}
		}

		return false;
	};

	_pEdit._beforeinput_process_with_HTMLEvent = function (value, status, begin, end, inputType) {
		var input_elem = this._input_element;

		var update_value = value;
		var ret = [input_elem._BeforeinputState.PASS];

		if (inputType == "deleteContentBackward" || inputType == "deleteContentForward" || inputType == "deleteByCut") {
			return ret;
		}


		if (this._inputtype_obj) {
			update_value = this._inputtype_obj.apply(update_value);
			if (value != update_value) {
				ret.push(input_elem._BeforeinputState.CANCEL);
			}
		}

		if (this._inputfilter_obj) {
			update_value = this._inputfilter_obj.apply(update_value);
			if (value != update_value) {
				ret.push(input_elem._BeforeinputState.CANCEL);
			}
		}

		if ((status == 0 || status == 3) && value == update_value) {
			switch (this.inputmode) {
				case "upper":
					ret.push(input_elem._BeforeinputState.CONVERT_UPPER);
					break;
				case "lower":
					ret.push(input_elem._BeforeinputState.CONVERT_LOWER);
					break;
			}
		}

		if (this.maxlength > 0 && (status == 0 || status == 3)) {
			var input_value = input_elem._getInputValue();
			var check = input_elem._checkMaxLength(input_value + (update_value ? update_value : ""), end);
			if (check && check.ismax) {
				ret.push(input_elem._BeforeinputState.MAXLENGTH);
			}
		}

		return ret;
	};

	_pEdit._beforeinput_process_with_NexacroInputEvent = function (value, status, begin, end) {
		var input_elem = this._input_element;
		var input_text = value.substring(begin, end);
		if (input_text) {
			var update_value = input_text;
			if (nexacro._is_hangul(update_value) || (status == nexacro._CompositionState.NONE || status == nexacro._CompositionState.END)) {
				if (this._inputtype_obj) {
					update_value = this._inputtype_obj.apply(update_value);
				}
				if (this._inputfilter_obj) {
					update_value = this._inputfilter_obj.apply(update_value);
				}
				if (this.inputmode == "upper") {
					update_value = update_value.toUpperCase();
				}
				else if (this.inputmode == "lower") {
					update_value = update_value.toLowerCase();
				}
			}

			if (update_value != input_text) {
				input_elem.replaceElementText(update_value, begin, end);
			}
		}
	};

	_pEdit = null;
}

