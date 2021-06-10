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

if (!nexacro.InputEventInfo) {
	nexacro.InputEventInfo = function (obj, id) {
		this.id = this.eventid = id || "oninput";
		this.fromobject = this.fromreferenceobject = obj;
	};
	var _pInputEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.InputEventInfo);
	nexacro.InputEventInfo.prototype = _pInputEventInfo;
	_pInputEventInfo._type_name = "InputEventInfo";

	delete InputEventInfo;

	nexacro.EditClickEventInfo = function (obj, id, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ClickEventInfo.call(this, obj, id || "oneditclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this.caretpos = (caretpos == null) ? 0 : caretpos;
	};

	var _pEditClickEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.EditClickEventInfo);
	nexacro.EditClickEventInfo.prototype = _pEditClickEventInfo;
	_pEditClickEventInfo._type_name = "EditClickEventInfo";

	delete _pEditClickEventInfo;
	_pEditClickEventInfo = null;

	nexacro._substrByUnit = function (str, start, length, unit) {
		if (str === undefined) {
			return str;
		}

		start = Math.max(start, 0);
		length = Math.max(length, 0);

		if (unit == "utf8") {
			return nexacro._substrByUtf8(str, start, length);
		}
		else if (unit == "ascii") {
			return nexacro._substrByAscii(str, start, length);
		}
		else {
			return str.substr(start, length);
		}
	};

	nexacro._getLengthByUnit = function (str, unit) {
		if (unit == "utf8") {
			return nexacro._getUtf8Length(str);
		}
		else if (unit == "ascii") {
			return nexacro._getAsciiLength(str);
		}
		else {
			return str.length;
		}
	};

	nexacro.__utf8Len = function (codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw new Error("Illegal argument: " + codePoint);
		}
		if (codePoint < 0) {
			throw new Error("Illegal argument: " + codePoint);
		}
		if (codePoint <= 0x7F) {
			return 1;
		}
		if (codePoint <= 0x7FF) {
			return 2;
		}
		if (codePoint <= 0xFFFF) {
			return 3;
		}
		if (codePoint <= 0x1FFFFF) {
			return 4;
		}
		if (codePoint <= 0x3FFFFFF) {
			return 5;
		}
		if (codePoint <= 0x7FFFFFFF) {
			return 6;
		}
		throw new Error("Illegal argument: " + codePoint);
	};

	nexacro.__isHighSurrogate = function (codeUnit) {
		return codeUnit >= 0xD800 && codeUnit <= 0xDBFF;
	};

	nexacro.__isLowSurrogate = function (codeUnit) {
		return codeUnit >= 0xDC00 && codeUnit <= 0xDFFF;
	};

	nexacro.__toCodepoint = function (highCodeUnit, lowCodeUnit) {
		if (!nexacro.__isHighSurrogate(highCodeUnit)) {
			throw new Error("Illegal argument: " + highCodeUnit);
		}
		if (!nexacro.__isLowSurrogate(lowCodeUnit)) {
			throw new Error("Illegal argument: " + lowCodeUnit);
		}
		highCodeUnit = (0x3FF & highCodeUnit) << 10;
		var u = highCodeUnit | (0x3FF & lowCodeUnit);
		return u + 0x10000;
	};

	nexacro._substrByUtf8 = function (str, start, length) {
		var count = 0;
		var end = str.length - start;
		for (var i = start; i < end; i++) {
			var ch = str.charCodeAt(i);

			if (nexacro.__isHighSurrogate(ch)) {
				var high = ch;
				var low = str.charCodeAt(++i);
				count += nexacro.__utf8Len(nexacro.__toCodepoint(high, low));
			}
			else {
				count += nexacro.__utf8Len(ch);
			}

			if (length == count) {
				end = i - start + 1;
				break;
			}
			else if (length < count) {
				end = i - start;
				break;
			}
		}
		return str.substring(start, end);
	};

	nexacro._substrByAscii = function (str, start, length) {
		var count = 0;
		var end = str.length - start;
		for (var i = start; i < end; i++) {
			var ch = str.charCodeAt(i);
			if (ch > 255) {
				count++;
			}
			count++;

			if (length == count) {
				end = i - start + 1;
				break;
			}
			else if (length < count) {
				end = i - start;
				break;
			}
		}
		return str.substring(start, end);
	};

	nexacro._getUtf8Length = function (str) {
		var length = str.length;
		var utf8_length = 0;
		for (var i = 0; i < length; i++) {
			var ch = str.charCodeAt(i);

			if (nexacro.__isHighSurrogate(ch)) {
				var high = ch;
				var low = str.charCodeAt(++i);
				utf8_length += nexacro.__utf8Len(nexacro.toCodepoint(high, low));
			}
			else {
				utf8_length += nexacro.__utf8Len(ch);
			}
		}
		return utf8_length;
	};

	nexacro._getAsciiLength = function (str) {
		var length = str.length;
		var ascii_length = 0;
		for (var i = 0; i < length; i++) {
			var ch = str.charCodeAt(i);
			if (ch > 255) {
				ascii_length++;
			}
			ascii_length++;
		}
		return ascii_length;
	};

	nexacro._getWCharLen = function (v) {
		var c = v.charCodeAt(0);

		if (((c & 0xff80) == 0) || c == 0x20a9) {
			return 1;
		}
		else if ((c & 0xff00) < 0x0800) {
			return 2;
		}
		else {
			return 3;
		}
	};

	nexacro._is_hangul = function (v) {
		var r = new RegExp("[\\uac00-\\ud7af\\u3130-\\u318f\\u1100-\\u11ff]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	nexacro._is_english = function (v) {
		var r = new RegExp("[\\u0041-\\u007a]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	nexacro._is_half_japaness = function (v) {
		var r = new RegExp("[\\uff61-\\uff9f]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	nexacro._CompositionState = function () {
		this.status = 0;
		this.startOffset = 0;
		this.endOffset = 0;
		this.hasCandidateWindow = false;

		this._delay_status = undefined;
		this._prev_status = undefined;
		this._delay_status_pos = -1;
	};

	nexacro._CompositionState.NONE = 0;
	nexacro._CompositionState.START = 1;
	nexacro._CompositionState.COMPOSING = 2;
	nexacro._CompositionState.END = 3;

	var _pCompositeState = nexacro._createPrototype(nexacro.Object, nexacro._CompositionState);
	nexacro._CompositionState.prototype = _pCompositeState;

	_pCompositeState.isComposing = function () {
		return (this.status == nexacro._CompositionState.START || this.status == nexacro._CompositionState.COMPOSING);
	};

	_pCompositeState.setStatus = function (status, offset) {
		this._prev_status = this.status;
		this.status = status;

		switch (status) {
			case nexacro._CompositionState.NONE:
			case nexacro._CompositionState.START:
				this.startOffset = offset;
				this.endOffset = offset;
				this.hasCandidateWindow = undefined;
				break;
			case nexacro._CompositionState.COMPOSING:
				this.endOffset = offset;
				break;
			case nexacro._CompositionState.END:
				this.endOffset = offset;
				break;
		}

		this._delay_status = undefined;
		this._delay_status_pos = -1;
	};

	_pCompositeState.setDelayStatus = function (status, pos) {
		this._delay_status = status;
		this._delay_status_pos = pos == undefined ? -1 : pos;
	};

	_pCompositeState.setOffset = function (begin, end) {
		if (this.status != nexacro._CompositionState.NONE) {
			this.startOffset = begin;
			this.endOffset = end;
		}
	};

	_pCompositeState.getOffset = function () {
		return {
			begin : this.startOffset, 
			end : this.endOffset
		};
	};

	_pCompositeState.isHasCandiateWindow = function (chars, recheck) {
		if (this.status != nexacro._CompositionState.NONE) {
			if ((chars && chars.length > 0) && (this.hasCandidateWindow === undefined || recheck)) {
				var hangul_unicode_block = /[(\u1100-\u11FF)|(\u3130-\u318F)|(\uAC00-\uD7AF)|(\uFFA0-\uFFDF)]/g;
				var charCount = chars.match(hangul_unicode_block);
				this.hasCandidateWindow = !(charCount && charCount.length > 0);
			}

			return this.hasCandidateWindow;
		}

		return false;
	};

	delete _pCompositeState;
	_pCompositeState = null;

	nexacro._EditInputFilter = function (filter) {
		this.pattern = null;
		if (filter) {
			this._parse(filter);
		}
	};

	var _pEditInputFilter = nexacro._createPrototype(nexacro.Object, nexacro._EditInputFilter);
	nexacro._EditInputFilter.prototype = _pEditInputFilter;

	nexacro._EditInputFilter.MAP = {
		alpha : "a-zA-Z", 
		digit : "0-9", 
		comma : ",", 
		dot : ".", 
		sign : "+\\-", 
		space : " \t", 
		symbol : "!\"#$%&'()*\\/;:<=>?@\\[\\\\\\]\\^_`{|}~'\\\\\\u20a9"
	};

	_pEditInputFilter.init = function (filter) {
		this.pattern = null;
		this._parse(filter);
	};

	_pEditInputFilter._parse = function (filter) {
		if (filter) {
			var buffer = "";
			var arr = filter.split(",");
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				var regex = nexacro._EditInputFilter.MAP[arr[i]];
				if (regex) {
					buffer += regex;
				}
			}
			this.pattern = (buffer.length ? new RegExp("[" + buffer + "]") : null);
		}
	};

	_pEditInputFilter.test = function (ch) {
		if (ch != '' && this.pattern) {
			return this.pattern.test(ch);
		}

		return false;
	};

	_pEditInputFilter.apply = function (value) {
		if (!value) {
			value = "";
		}
		if (value && this.pattern) {
			var len = value.length;
			var valArr = value.split("");
			var text = [];

			for (var i = 0; i < len; i++) {
				var ch = valArr[i];
				if (this.pattern.test(ch)) {
					continue;
				}

				text.push(ch);
			}

			return text.join("");
		}

		return value;
	};

	delete _pEditInputFilter;
	_pEditInputFilter = null;

	nexacro._EditInputType = function (type) {
		this.typepattern = null;
		this.filterpattern = null;
		this.imedisable = false;
		this.keypadtype = "text";

		if (type) {
			this._parse(type);
		}
	};

	var _pEditInputType = nexacro._createPrototype(nexacro.Object, nexacro._EditInputType);
	nexacro._EditInputType.prototype = _pEditInputType;

	nexacro._EditInputType.MAP = {
		alpha : "a-zA-Z", 
		comma : ",", 
		digit : "0-9", 
		dot : ".", 
		english : "a-zA-Z", 
		symbol : "!\"#$%&'()*\\/;:<=>?@[\\\\\\]\\^_`{|}~'\\u20a9", 
		number : "0-9\\-.,", 
		numberandenglish : "0-9\\-.,\\a-zA-Z", 
		sign : "+\\-", 
		space : " \t", 
		half : "\\uff61-\\uffdc\\uffe8-\\uffee", 
		full : "\\u3000\\uff01-\\uff60\\uffe0-\\uffe6", 
		wide : "\\u2E80-\\u2FFB\\u3001-\\u303E\\u3041-\\u4DBF\\u4E00-\\uA4C6\\uAC00-\\uD7A3\\ud800-\\udbff\\udc00-\\udfff\\uF900-\\uFAFF\\uFE10-\\uFE19\\uFE30-\\uFE6B"
	};

	_pEditInputType.init = function (type) {
		this.typepattern = null;
		this.filterpattern = null;
		this.imedisable = false;
		this.keypadtype = "text";

		this._parse(type);
	};

	_pEditInputType._parse = function (type) {
		if (type) {
			if (type.indexOf("full") > -1 && type.indexOf("half") > -1) {
				return;
			}

			var arrType = type.split(/\s*,\s*/);
			var arrTypeFilter = [];
			if (type.indexOf("half") > -1) {
				arrTypeFilter.push("full");
				arrTypeFilter.push("wide");
				arrType = [];
			}
			else if (type.indexOf("full") > -1) {
				arrType.push("wide");
			}
			else if (type.indexOf("normal") > -1) {
			}
			else {
				this.imedisable = true;

				if (!this.password && type.indexOf("normal") < 0
					 && type.indexOf("alpha") < 0
					 && type.indexOf("english") < 0
					 && type.indexOf("numberandenglish") < 0
					 && type.indexOf("symbol") < 0) {
					this.keypadtype = "number";
				}
				else {
					this.keypadtype = "text";
				}
			}

			var bufferType = "";
			var i, regex, lenType = arrType.length;
			for (i = 0; i < lenType; i++) {
				regex = nexacro._EditInputType.MAP[arrType[i]];
				if (regex) {
					bufferType += regex;
				}
			}

			var bufferTypeFilter = "";
			var lenFilter = arrTypeFilter.length;
			for (i = 0; i < lenFilter; i++) {
				regex = nexacro._EditInputType.MAP[arrTypeFilter[i]];
				if (regex) {
					bufferTypeFilter += regex;
				}
			}

			this.typepattern = (bufferType.length ? new RegExp("[" + bufferType + "]") : null);
			this.filterpattern = (bufferTypeFilter.length ? new RegExp("[" + bufferTypeFilter + "]") : null);
		}
	};

	_pEditInputType.test = function (ch) {
		if (ch != '') {
			if (this.filterpattern && this.filterpattern.test(ch)) {
				return false;
			}

			if (this.typepattern) {
				if (this.typepattern.test(ch)) {
					return true;
				}
			}
			else {
				return true;
			}
		}

		return false;
	};

	_pEditInputType.apply = function (value) {
		if (!value) {
			value = "";
		}
		if (value && (this.typepattern || this.filterpattern)) {
			var len = value.length;
			var valArr = value.split("");
			var text = [];

			for (var i = 0; i < len; i++) {
				var ch = valArr[i];
				if (this.filterpattern && this.filterpattern.test(ch)) {
					continue;
				}

				if (this.typepattern && !this.typepattern.test(ch)) {
					continue;
				}

				text.push(ch);
			}

			return text.join("");
		}

		return value;
	};

	delete _pEditInputType;
	_pEditInputType = null;

	nexacro._EditUndoStack = function (target) {
		nexacro.Object.call(this);
		if (target) {
			this.target = target;
		}

		this.stack = [];
		this.index = -1;

		this._processing_onundoredo = false;
	};

	var _pEditUndoStack = nexacro._createPrototype(nexacro.Object, nexacro._EditUndoStack);
	nexacro._EditUndoStack.prototype = _pEditUndoStack;

	_pEditUndoStack.target = null;

	_pEditUndoStack.push = function (value, start, end) {
		if (this._processing_onundoredo) {
			return;
		}

		var stack = this.stack;
		var index = this.index;

		if (stack.length > 0) {
			if (index > 0) {
				var item = stack[index];
				if (!item) {
					return;
				}

				var cur_value = stack[index].value;
				if (cur_value == value) {
					return;
				}
			}
			else {
				if (!value) {
					return;
				}
			}

			var remove_cnt = stack.length - index - 1;
			if (remove_cnt) {
				stack.splice(index + 1, remove_cnt);
			}
		}
		this.index = stack.length;
		this.stack.push({
			"value" : value, 
			"start" : start, 
			"end" : end
		});
	};

	_pEditUndoStack.update = function (start, end) {
		var stack = this.stack;
		var index = this.index;

		if (stack) {
			var item = stack[index];
			if (!item) {
				return;
			}

			item.start = start;
			item.end = end;
		}
	};

	_pEditUndoStack.undo = function () {
		var stack = this.stack;
		var target = this.target;

		var item = null, prev_index = this.index - 1;
		if (prev_index >= 0) {
			item = stack[prev_index];
		}

		if (target._on_input_undo) {
			this._processing_onundoredo = true;
			if (target._on_input_undo(item) && item) {
				this.index = prev_index;
			}
			this._processing_onundoredo = false;
		}
	};

	_pEditUndoStack.redo = function () {
		var stack = this.stack;
		var target = this.target;

		var item = null, next_index = this.index + 1;
		if (next_index < stack.length) {
			item = stack[next_index];
		}

		if (target._on_input_redo) {
			this._processing_onundoredo = true;
			if (target._on_input_redo(item) && item) {
				this.index = next_index;
			}
			this._processing_onundoredo = false;
		}
	};

	_pEditUndoStack.clear = function () {
		this.stack = [];
		this.index = -1;
	};

	_pEditUndoStack.destroy = function () {
		this.target = null;
	};

	delete _pEditUndoStack;
	_pEditUndoStack = null;


	nexacro._EditMaskType = function () {
		this.mask = "";
		this.locale = "";
		this.limittype = "none";
		this.maskchar = "";
		this.fillchar = "";

		this._is_editing = false;
		this._input_mode = "text";
	};
	var _pMaskType = nexacro._createPrototype(nexacro.Object, nexacro._EditMaskType);
	nexacro._EditMaskType.prototype = _pMaskType;
	_pMaskType._type_name = "MaskType";

	_pMaskType.setMask = function (mask) {
		if (this.mask != mask) {
			this.mask = mask;
		}
	};

	_pMaskType.setLocale = function (v) {
		if (v != this.locale) {
			this.locale = v;
		}
	};

	_pMaskType.setLimitType = function (v) {
		if (this.limittype != v) {
			this.limittype = v;
		}
	};

	_pMaskType.setMaskChar = function (ch) {
		if (this.maskchar != ch) {
			this.maskchar = ch;
		}
	};

	_pMaskType.setFillChar = function (ch) {
		if (this.fillchar != ch) {
			this.fillchar = ch;
		}
	};

	_pMaskType.setEditStatus = function (v) {
		if (this._is_editing != v) {
			this._is_editing = v;
		}
	};

	_pMaskType.applyMask = function (value) {
		return value;
	};

	_pMaskType.arrangeMask = function (input_text, begin, end) {
		return {
			"text" : input_text, 
			"pos" : end
		};
	};

	_pMaskType.removeMask = function (masked_text) {
		return masked_text;
	};

	_pMaskType.keyPressed = function () {
	};

	_pMaskType.findNearEditablePos = function (pos) {
		return pos;
	};

	_pMaskType.isDeletableChar = function () {
		return true;
	};

	_pMaskType.isFilterChar = function () {
		return false;
	};

	_pMaskType.isFilled = function () {
		return false;
	};

	_pMaskType.getInputMode = function () {
		return this._input_mode;
	};

	_pMaskType.getEditStatus = function () {
		return this._is_editing;
	};

	delete _pMaskType;
	_pMaskType = null;

	nexacro._EditMaskTypeNumber = function () {
		nexacro._EditMaskType.call(this);

		this.mask = "";
		this.limittype = "none";
		this.maskchar = "";
		this.fillchar = "0";

		this._input_mode = "number";

		this._decimal_point = ".";
		this._thousands_sep = ",";
		this._mask_decimal_point = ".";
		this._mask_thousands_sep = ",";

		this._init();
	};
	var _pMaskTypeNumber = nexacro._createPrototype(nexacro._EditMaskType, nexacro._EditMaskTypeNumber);
	nexacro._EditMaskTypeNumber.prototype = _pMaskTypeNumber;
	_pMaskTypeNumber._type_name = "MaskTypeNumber";

	nexacro._EditMaskTypeNumber._put_thousand_seperator = function (text, grouping) {
		if (!text || !grouping) {
			return text;
		}

		var group = grouping[0];
		if (!group || group < 1) {
			return text;
		}

		var reg;
		if (grouping.length > 1) {
			grouping.shift();

			reg = new RegExp("(\\d+)(\\d{" + group + "})($|\\.\\d+)");
			if (reg.test(text)) {
				return text.replace(reg, function (str, p1, p2, p3) {
					return nexacro._EditMaskTypeNumber._put_thousand_seperator(p1, grouping) + ',' + p2 + p3;
				});
			}
		}
		else {
			reg = new RegExp("\\B(?=(\\d{" + group + "})+(?!\\d))", "g");
			if (reg.test(text)) {
				return text.replace(reg, ',');
			}
		}
		return text;
	};

	_pMaskTypeNumber._init = function () {
		this.locale = "";

		this._grouping = [];
		this._sign_type = 3;
		this._sign_sep_by_space = 0;

		this._init_digits();
		this._masked_empty_text = "";

		this._is_max_intpart = false;
		this._is_max_decpart = false;

		this._use_grouping = false;
		this._is_intpart_zero = true;
		this._is_decpart_zero = true;
	};

	_pMaskTypeNumber._init_digits = function () {
		this._is_integer_mask = false;
		this._int_digits_min = 0;
		this._int_digits_max = -1;
		this._dec_digits_min = 0;
		this._dec_digits_max = -1;
	};

	_pMaskTypeNumber.setMask = function (mask) {
		if (this.mask != mask) {
			this.mask = mask;
			this._parseMask(mask);
		}
	};

	_pMaskTypeNumber.setUseGrouping = function (bgroup) {
		if (this._use_grouping != bgroup) {
			this._use_grouping = bgroup;
		}
	};

	_pMaskTypeNumber._parseMask = function (mask) {
		this._init_digits();
		if (!mask || mask === ".") {
			return;
		}

		var reg_valid = /(^[\+\-\!]?\s*[#09]{1,}[#09,]*(?:$|\.[#09]*)|^\.[#09]*$)/;
		if (!reg_valid.test(mask)) {
			return;
		}

		var sign_char = mask[0];
		switch (sign_char) {
			case '-':
				this._sign_type = 0;
				break;
			case '+':
				this._sign_type = 1;
				break;
			case '!':
				this._sign_type = 2;
				break;
			default:
				{
					this._sign_type = 3;
					sign_char = '';
				}
				break;
		}

		var len = mask.length;
		var sign_sep_by_space = 0;
		if (this._sign_type != 3) {
			for (var i = 1; i < len; i++) {
				var c = mask[i];
				if (c == '#' || c == '9' || c == '0') {
					break;
				}
				if (c != ' ') {
					return;
				}

				sign_sep_by_space++;
			}
		}
		this._sign_sep_by_space = sign_sep_by_space;

		var point_char = this._mask_decimal_point;
		var point_idx = mask.indexOf(point_char);

		this._is_integer_mask = (point_idx < 0);

		var int_part = "", dec_part = "";
		if (this._is_integer_mask) {
			int_part = mask.substring(sign_char.length + sign_sep_by_space);
		}
		else {
			int_part = mask.substring((sign_char.length + sign_sep_by_space), point_idx);
			dec_part = mask.substring(point_idx + 1);
		}

		var idx, prev_idx = int_part.length - 1;
		var thousands_sep = this._mask_thousands_sep;
		while ((idx = int_part.lastIndexOf(thousands_sep, prev_idx)) > -1) {
			this._use_grouping = true;
			this._grouping.push(prev_idx - idx);
			prev_idx = idx - 1;
		}

		int_part = int_part.split(thousands_sep).join('');

		var int_digits = int_part.length;
		this._int_digits_max = int_digits;

		idx = int_part.indexOf('0');
		if (idx > -1) {
			this._int_digits_min = int_digits - idx;
		}

		var last_int_mask = int_digits ? int_part[int_digits - 1] : "";
		if (idx == -1 && last_int_mask == "#") {
			this._is_intpart_zero = false;
		}

		var empty_value, i;
		if (this._int_digits_min > 0) {
			empty_value = "";
			for (i = 0; i < this._int_digits_min; i++) {
				empty_value += '0';
			}

			var grouping = this._grouping.slice(0);
			if (grouping.length > 0) {
				this._masked_empty_text = nexacro._EditMaskTypeNumber._put_thousand_seperator(empty_value, grouping);
			}
			else {
				this._masked_empty_text = empty_value;
			}
		}

		if (this._is_integer_mask) {
			return;
		}

		dec_part = dec_part.replace(/[.]/g, '');

		var dec_digits = dec_part.length;
		this._dec_digits_max = dec_digits;

		idx = dec_part.lastIndexOf('0');
		if (idx > -1) {
			this._dec_digits_min = idx + 1;
		}

		var last_dec_mask = dec_digits ? dec_part[0] : "";
		if (idx == -1 && last_dec_mask == "#") {
			this._is_decpart_zero = false;
		}

		if (this._dec_digits_min > 0) {
			empty_value = ".";
			for (i = 0; i < this._dec_digits_min; i++) {
				empty_value += '0';
			}

			this._masked_empty_text += empty_value;
		}
	};

	_pMaskTypeNumber.setLocale = function (v) {
		if (v != this.locale) {
			this.locale = v;

			var info = nexacro.Locale.getLocaleInfo(v);
			var first_group = info.grouping[0];
			this._decimal_point = info.decimal_point;
			this._thousands_sep = info.thousands_sep ? info.thousands_sep : this._mask_thousands_sep;

			if (first_group == 0 || first_group == -1) {
				this._grouping = [3];
			}
			else {
				this._grouping = info.grouping;
			}
		}
	};

	_pMaskTypeNumber.setLimitType = function (v) {
		if (this.limittype != v) {
			this.limittype = v;

			this._check_int_max = (v == "both" || v == "integer");
			this._check_dec_max = (v == "both" || v == "decimal");
		}
	};

	_pMaskTypeNumber.applyMask = function (value) {
		var bfillzero = !this._is_editing;
		this._is_max_intpart = false;
		this._is_max_decpart = false;

		var text = nexacro._toString(value);
		if (!text) {
			return (bfillzero ? this._masked_empty_text : "");
		}

		text = text.replace(/^\s\s*/, '').replace(/[,]/g, '');

		var pos = 0;
		var len = text.length;

		var bmask = (this._int_digits_max == -1 && this._dec_digits_max == -1) ? false : true;

		var sign_char = text[pos++];
		if (sign_char != '+' && sign_char != '-') {
			pos -= 1;
			sign_char = '';
		}
		for (; pos < len; ) {
			var c = text[pos];
			if ((c >= '0' && c <= '9') || c == ',' || c == '.') {
				break;
			}
			if (c != ' ') {
				return (bfillzero ? this._masked_empty_text : "");
			}
			pos++;
		}

		var point_char = this._mask_decimal_point;
		var point_idx = text.indexOf(point_char);

		var int_part = "", dec_part = "";
		if (point_idx < 0) {
			int_part = text.substring(pos);
			int_part = !bmask ? int_part.padLeft(1, "0") : int_part;
		}
		else {
			int_part = text.substring(pos, point_idx);
			dec_part = text.substring(point_idx + 1);

			int_part = !bmask ? int_part.padLeft(1, "0") : int_part;
			dec_part = !bmask ? dec_part.padLeft(1, "0") : dec_part;
		}

		if (!this._is_intpart_zero) {
			int_part = (int_part.length && +int_part === 0) ? "" : int_part;
		}
		if (!this._is_decpart_zero) {
			dec_part = (dec_part.length && +dec_part === 0) ? "" : dec_part;
		}

		if ((int_part.length > 0 && !(/^(?:[0-9]*)$/.test(int_part)))
			 || (dec_part.length > 0 && !(/^(?:[0-9]*)$/.test(dec_part)))) {
			return (bfillzero ? this._masked_empty_text : "");
		}

		var i, idx, prev_idx = int_part.length - 1;
		var thousands_sep = this._thousands_sep;
		var grouping = [];
		if (this._use_grouping) {
			grouping = this._grouping.slice(0);
		}

		for (i = 0; ; i++) {
			idx = int_part.lastIndexOf(thousands_sep, prev_idx);
			if (idx < 0) {
				break;
			}

			var group = grouping[(i < grouping.length ? i : grouping.length - 1)];
			if (!group || (prev_idx - idx) != group) {
				return (bfillzero ? this._masked_empty_text : "");
			}

			prev_idx = idx - 1;
		}

		var masked_text = sign_char;
		if (sign_char != '') {
			for (i = 0; i < this._sign_sep_by_space; i++) {
				masked_text += ' ';
			}
		}

		int_part = int_part.split(thousands_sep).join('');

		var int_digits = int_part.length;
		var int_max = this._int_digits_max;
		if (int_digits >= int_max) {
			this._is_max_intpart = true;
		}

		var int_min = this._int_digits_min;
		if (bfillzero && int_min > 0) {
			var fillcnt = int_min - int_digits;
			for (i = 0; i < fillcnt; i++) {
				int_part = '0' + int_part;
			}
		}

		int_part = nexacro._EditMaskTypeNumber._put_thousand_seperator(int_part, grouping);
		int_part = int_part.replace(/,/g, thousands_sep);

		masked_text += int_part;

		if (this._is_integer_mask) {
			return masked_text;
		}

		var dec_digits = dec_part.length;
		var dec_min = this._dec_digits_min;
		var dec_max = this._dec_digits_max;
		if (dec_digits >= dec_max) {
			this._is_max_decpart = true;
		}

		if (bfillzero && dec_min > 0) {
			var fillcnt = dec_min - dec_digits;
			for (i = 0; i < fillcnt; i++) {
				dec_part += '0';
			}
		}

		if (this._check_dec_max && dec_max > -1 && dec_part.length > dec_max) {
			dec_part = dec_part.substring(0, dec_max);
		}

		if (dec_part != "") {
			masked_text += this._decimal_point;
			masked_text += dec_part;
		}
		else if (this._is_editing && point_idx > -1) {
			masked_text += this._decimal_point;
		}

		return masked_text;
	};

	_pMaskTypeNumber.arrangeMask = function (input_text, begin, end) {
		this._is_max_intpart = false;
		this._is_max_decpart = false;

		var text = nexacro._toString(input_text);
		if (!text) {
			return {
				"text" : "", 
				"pos" : end
			};
		}

		var result_buf = [];
		var decimal_point = this._decimal_point;
		var thousands_sep = this._thousands_sep;

		text = text.replace(/^\s\s*/, '');
		var input_ch = input_text.substring(begin, end);
		if (input_ch == '+' || input_ch == '-') {
			text = text.substring(0, begin) + text.substring(end);
		}

		var textlen = text.length;
		var pos = 0, end_rpos = input_text.length - end;
		var ch = text[pos];

		if (input_ch == '+' && (this._sign_type == 1 || this._sign_type == 3)) {
			if (ch == '+') {
				result_buf.push("");
				pos++;
			}
			else {
				result_buf.push(input_ch);
				if (ch == '-') {
					pos++;
				}
			}
		}
		else if (input_ch == '-' && (this._sign_type == 0 || this._sign_type == 3)) {
			if (ch == '-') {
				result_buf.push("");
				pos++;
			}
			else {
				result_buf.push(input_ch);
				if (ch == '+') {
					pos++;
				}
			}
		}

		for (; pos < textlen; ) {
			ch = text[pos];
			if ((ch >= '0' && ch <= '9') || ch == ',' || ch == '.') {
				break;
			}
			if (ch != ' ' && ch != '-' && ch != '+') {
				return null;
			}

			result_buf.push(ch);
			pos++;
		}

		var int_buf = [], buf_len = 0;
		var bTrimZero = true, intpart_last_char;
		var int_begin_pos = pos, splice_begin = -1, changed_cnt = 0;
		while (pos < textlen) {
			ch = text[pos];
			if (!ch || ch == decimal_point) {
				break;
			}

			pos++;
			if (ch == thousands_sep) {
				continue;
			}

			if (!(ch >= '0' && ch <= '9')) {
				return null;
			}

			intpart_last_char = ch;
			if (bTrimZero) {
				if (ch == '0') {
					continue;
				}

				bTrimZero = false;
			}

			buf_len = int_buf.push(ch);
			if (pos <= end) {
				if (pos > begin) {
					changed_cnt++;
				}

				splice_begin = buf_len;
			}
		}

		var int_len = int_buf.length;
		var int_max = this._int_digits_max;
		var chk_int_max = (this._check_int_max && int_max > -1);
		if (chk_int_max && begin < pos && end > int_begin_pos) {
			var over_cnt = int_len - int_max;
			if (over_cnt > 0 && changed_cnt > 0) {
				if (over_cnt > changed_cnt) {
					int_buf.splice(splice_begin - changed_cnt, changed_cnt);
				}
				else {
					int_buf.splice(splice_begin - over_cnt, over_cnt);
				}

				int_len = int_buf.length;
			}
		}

		if (int_buf.length == 0 && intpart_last_char == '0') {
			int_len = int_buf.push('0');
		}

		if (int_len >= int_max) {
			this._is_max_intpart = true;
		}

		if (int_buf.length > 0) {
			var grouping = [];
			if (this._use_grouping) {
				grouping = this._grouping.slice(0);
			}
			var int_part = nexacro._EditMaskTypeNumber._put_thousand_seperator(int_buf.join(''), grouping);
			result_buf.push(int_part.replace(/,/g, thousands_sep));
		}

		if (pos < textlen) {
			if (this._is_integer_mask) {
				return null;
			}

			ch = text[pos++];
			if (ch != decimal_point) {
				return null;
			}

			result_buf.push(ch);
		}

		var dec_buf = [];
		var dec_begin_pos = pos;
		splice_begin = -1;
		changed_cnt = 0;
		while (pos < textlen) {
			ch = text[pos];
			if (!(ch >= '0' && ch <= '9')) {
				return null;
			}

			pos++;
			buf_len = dec_buf.push(ch);
			if (pos <= end) {
				if (pos > begin) {
					changed_cnt++;
				}

				splice_begin = buf_len;
			}
		}

		var dec_max = this._dec_digits_max;
		var chk_dec_max = (this._check_dec_max && dec_max > -1);
		var dec_len = dec_buf.length;

		if (chk_dec_max && end > begin && end > dec_begin_pos) {
			var over_cnt = dec_len - dec_max;
			if (over_cnt > 0 && changed_cnt > 0) {
				if (over_cnt > changed_cnt) {
					dec_buf.splice(splice_begin - changed_cnt, changed_cnt);
				}
				else {
					dec_buf.splice(splice_begin - over_cnt, over_cnt);
				}
			}
			dec_len = dec_buf.length;
		}

		if (dec_len >= dec_max) {
			this._is_max_decpart = true;
		}

		if (dec_buf.length > 0) {
			result_buf.push(dec_buf.join(''));
		}

		input_text = result_buf.join('');
		var newpos = (input_text.length < end_rpos ? end : input_text.length - end_rpos);

		return {
			"text" : input_text, 
			"pos" : newpos
		};
	};

	_pMaskTypeNumber.removeMask = function (masked_text) {
		var text = nexacro._toString(masked_text);
		if (!text) {
			return "";
		}

		text = text.replace(/^\s\s*/, '');
		var textlen = text.length;

		var result_buf = [];
		var decimal_point = this._decimal_point;
		var thousands_sep = this._thousands_sep;

		var pos = 0;
		var ch = text[pos];
		if (ch == '+' || ch == '-') {
			if (ch == '-') {
				result_buf.push(ch);
			}
			pos++;
		}

		for (; pos < textlen; ) {
			ch = text[pos];
			if ((ch >= '0' && ch <= '9') || ch == ',' || ch == '.') {
				break;
			}
			if (ch != ' ') {
				return result_buf.join('');
			}
			pos++;
		}

		if (pos == textlen) {
			return "";
		}

		var bTrimZero = true;
		while (pos < textlen) {
			ch = text[pos];
			if (!ch || ch == decimal_point) {
				break;
			}

			pos++;
			if (ch == thousands_sep) {
				continue;
			}
			if (!(ch >= '0' && ch <= '9')) {
				return result_buf.join('');
			}

			if (bTrimZero) {
				if (ch == '0') {
					continue;
				}
				bTrimZero = false;
			}

			result_buf.push(ch);
		}

		var int_is_zero = false;
		if (bTrimZero) {
			result_buf.push('0');
			int_is_zero = true;
		}

		if (this._is_integer_mask) {
			return result_buf.join('');
		}

		if (pos < textlen) {
			ch = text[pos++];
			if (ch != decimal_point) {
				return result_buf.join('');
			}
		}

		var dec_buf = [];
		var dec_max = this._dec_digits_max;
		var chk_dec_max = (this._check_dec_max && dec_max > -1);

		var dec_digits = textlen - pos;
		if (chk_dec_max && dec_digits > dec_max) {
			dec_digits = dec_max;
		}

		if (dec_digits > 0) {
			ch = text[pos];
			if (!(ch >= '0' && ch <= '9')) {
				return result_buf.join('');
			}

			dec_buf.push(ch);
		}

		bTrimZero = true;
		for (var i = dec_digits - 1; i > 0; i--) {
			ch = text[pos + i];
			if (!(ch >= '0' && ch <= '9')) {
				return result_buf.join('');
			}

			if (bTrimZero) {
				if (ch == '0') {
					continue;
				}
				bTrimZero = false;
			}

			dec_buf[i] = ch;
		}
		if (dec_buf.length > 0) {
			var dec = dec_buf.join('');
			if (!int_is_zero || dec != '0') {
				result_buf.push(this._mask_decimal_point);
				result_buf.push(dec);
			}
		}

		return result_buf.join('');
	};

	_pMaskTypeNumber.isDeletableChar = function (ch) {
		if (ch == this._thousands_sep) {
			return false;
		}
		return true;
	};

	_pMaskTypeNumber.isFilterChar = function (ch) {
		if (/[,\.\+\-0-9\s]/.test(ch)) {
			return false;
		}
		return true;
	};

	_pMaskTypeNumber.isFilled = function () {
		var isfill = false;

		if (this._is_integer_mask) {
			isfill = this._is_max_intpart;
		}
		else {
			isfill = this._is_max_decpart;
		}

		return isfill;
	};

	delete _pMaskTypeNumber;
	_pMaskTypeNumber = null;

	nexacro._EditMaskTypeString = function () {
		nexacro._EditMaskType.call(this);

		this.mask = "";
		this.maskchar = "_";
		this.fillchar = " ";

		this._input_mode = "text";

		this._char_buf = [];
		this._is_filled = false;

		this._init();
	};
	var _pMaskTypeString = nexacro._createPrototype(nexacro._EditMaskType, nexacro._EditMaskTypeString);
	nexacro._EditMaskTypeString.prototype = _pMaskTypeString;
	_pMaskTypeString._type_name = "MaskTypeString";

	_pMaskTypeString._init = function () {
		this._masked_empty_text = "";
		this._mask_buf = [];
		this._value_buf = [];
		this._input_mode = "text";
		this._is_filled = false;
	};

	_pMaskTypeString.setMask = function (mask) {
		if (this.mask != mask) {
			this.mask = mask;
			this._parseMask(mask);
		}
	};

	_pMaskTypeString._parseMask = function (mask) {
		this._init();

		if (!mask) {
			return;
		}

		var ch, pos = 0;
		var mask_buf = this._mask_buf;
		var value_buf = this._value_buf;
		var empty_buf = [];
		var maskchar = this.maskchar;
		var bNumberMaskOnly;

		var bQuote = false;
		var nBrace = 0;

		while ((ch = mask[pos++])) {
			switch (ch) {
				case '@':
					{

						mask_buf.push(/[\u0020-\u00ff]/);
						value_buf.push(nBrace > 0 ? '*' : '$1');
						empty_buf.push(maskchar);
						bNumberMaskOnly = false;
					}
					break;
				case '#':
					{

						mask_buf.push(/\d/);
						value_buf.push(nBrace > 0 ? '*' : '$1');
						empty_buf.push(maskchar);
						if (bNumberMaskOnly == undefined) {
							bNumberMaskOnly = true;
						}
					}
					break;
				case '*':
					{

						mask_buf.push(/[a-zA-Z]/);
						value_buf.push(nBrace > 0 ? '*' : '$1');
						empty_buf.push(maskchar);
						bNumberMaskOnly = false;
					}
					break;
				case '9':
					{

						mask_buf.push(/[a-zA-Z0-9]/);
						value_buf.push(nBrace > 0 ? '*' : '$1');
						empty_buf.push(maskchar);
						bNumberMaskOnly = false;
					}
					break;
				case 'A':
					{

						mask_buf.push(/[a-zA-Z]/);
						value_buf.push(nBrace > 0 ? '*.toUpperCase()' : '$1.toUpperCase()');
						empty_buf.push(maskchar);
						bNumberMaskOnly = false;
					}
					break;
				case 'a':
					{

						mask_buf.push(/[a-zA-Z]/);
						value_buf.push(nBrace > 0 ? '*.toLowerCase()' : '$1.toLowerCase()');
						empty_buf.push(maskchar);
						bNumberMaskOnly = false;
					}
					break;
				case 'Z':
					{

						mask_buf.push(/[a-zA-Z0-9]/);
						value_buf.push(nBrace > 0 ? '*.toUpperCase()' : '$1.toUpperCase()');
						empty_buf.push(maskchar);
						bNumberMaskOnly = false;
					}
					break;
				case 'z':
					{

						mask_buf.push(/[a-zA-Z0-9]/);
						value_buf.push(nBrace > 0 ? '*.toLowerCase()' : '$1.toLowerCase()');
						empty_buf.push(maskchar);
						bNumberMaskOnly = false;
					}
					break;
				case '\'':
					{

						bQuote = true;
						while ((ch = mask[pos++])) {
							if (ch == '\'') {
								bQuote = false;
								break;
							}
							if (ch == '\\') {
								ch = mask[pos++];
							}

							if (ch) {
								mask_buf.push(ch);
								value_buf.push('');
								empty_buf.push(ch);
							}
						}

						if (bQuote) {
							return;
						}
					}
					break;
				case '{':
					{

						nBrace++;
					}
					break;
				case '}':
					{

						nBrace--;
					}
					break;
				case '\\':
					{

						ch = mask[pos++];
						if (ch) {
							mask_buf.push(ch);
							value_buf.push('');
							empty_buf.push(ch);
						}
					}
					break;
				default:
					{

						mask_buf.push(ch);
						value_buf.push('');
						empty_buf.push(ch);
					}
					break;
			}
		}

		if (bNumberMaskOnly) {
			this._input_mode = "number";
		}

		this._masked_empty_text = empty_buf.join('');
	};

	_pMaskTypeString.setMaskChar = function (ch) {
		if (this.maskchar != ch) {
			this.maskchar = ch;
			this._parseMask(this.mask);
		}
	};

	_pMaskTypeString.applyMask = function (value) {
		this._is_filled = false;

		var text = nexacro._toString(value);
		if (!text) {
			return this._masked_empty_text;
		}

		var mask_buf = this._mask_buf;
		var value_buf = this._value_buf;
		var char_buf = this._char_buf;
		var result_buf = [];

		var ch, mask, val;
		var bufpos = 0, txtpos = 0;

		var maskchar = this.maskchar;
		var fillchar = this.fillchar;

		var is_filled = true;
		while ((mask = mask_buf[bufpos])) {
			val = value_buf[bufpos];
			if (val == "") {
				result_buf.push(mask);
				if ((this.mask.length == text.length) && (mask == text[txtpos])) {
					txtpos++;
				}
			}
			else {
				do {
					ch = text[txtpos++];
				} while (ch && !mask.test(ch) && !(ch == "\u200e"));

				if (!ch || (fillchar != "" && ch == fillchar) || !mask.test(ch)) {
					char_buf[bufpos] = '';
					result_buf.push(maskchar);
					is_filled = false;
				}
				else if (val == "*") {
					char_buf[bufpos] = ch;
					result_buf.push(val);
				}
				else if (val == "$1") {
					char_buf[bufpos] = ch;
					result_buf.push(ch);
				}
				else if (val[0] == '*') {
					ch = nexacro._executeEvalStr(val.replace("*", "\"" + ch + "\""));
					char_buf[bufpos] = ch;
					result_buf.push('*');
				}
				else {
					ch = nexacro._executeEvalStr(val.replace("$1", "\"" + ch + "\""));
					char_buf[bufpos] = ch;
					result_buf.push(ch);
				}
			}
			bufpos++;
		}
		this._is_filled = is_filled;

		return result_buf.join('');
	};

	_pMaskTypeString.arrangeMask = function (input_text, begin, end) {
		var mask_buf = this._mask_buf;
		var value_buf = this._value_buf;
		var char_buf = this._char_buf;

		var mask_len = mask_buf.length;
		if (mask_len == 0) {
			return {
				"text" : input_text, 
				"pos" : end
			};
		}

		var text = nexacro._toString(input_text);
		var over_cnt = text.length - mask_len;
		var target_text = text.substr(0, over_cnt);
		var over_text = text.substr(over_cnt);
		if (target_text == over_text) {
			return {
				"text" : target_text, 
				"pos" : end
			};
		}

		var text_buf = text.split('');
		var mask, ch;
		var maskchar = this.maskchar;
		var val, i, fillchar = this.fillchar;

		for (i = begin; i < end; i++) {
			val = value_buf[i];
			if (val == null) {
				break;
			}

			if (val == "") {
				end++;
				over_cnt++;
				text_buf.splice(i, 0, mask_buf[i]);
			}
			else if (text_buf[i] == "-") {
				end--;
				over_cnt--;
				i--;
				text_buf.splice(i, 1);
			}
			else {
				mask = mask_buf[i];
				ch = text_buf[i];

				if (!ch || (fillchar != "" && ch == fillchar) || !mask.test(ch)) {
					char_buf[i] = '';
					text_buf[i] = maskchar;
				}
				else if (val == "*") {
					char_buf[i] = ch;
					text_buf[i] = '*';
				}
				else if (val == "$1") {
					char_buf[i] = ch;
					text_buf[i] = ch;
				}
				else if (val[0] == '*') {
					ch = nexacro._executeEvalStr(val.replace("*", "\"" + ch + "\""));
					char_buf[i] = ch;
					text_buf[i] = '*';
				}
				else {
					ch = nexacro._executeEvalStr(val.replace("$1", "\"" + ch + "\""));
					char_buf[i] = ch;
					text_buf[i] = ch;
				}
			}
		}

		if (end < mask_len) {
			if (over_cnt > 0) {
				text_buf.splice(end, over_cnt);
			}
			else if (over_cnt < 0) {
				over_cnt = -(over_cnt);
				for (i = 0; i < over_cnt; i++) {
					var pos = end + i;
					val = value_buf[pos];
					if (val == "") {
						text_buf.splice(pos, 0, mask_buf[pos]);
					}
					else {
						text_buf.splice(pos, 0, maskchar);
						char_buf[pos] = "";
					}
				}
			}
		}
		else {
			end = mask_len;
			text_buf.splice(end, (text_buf.length - end));
		}

		return {
			"text" : text_buf.join(''), 
			"pos" : end
		};
	};

	_pMaskTypeString.removeMask = function (masked_text) {
		var mask_buf = this._mask_buf;
		var value_buf = this._value_buf;
		var char_buf = this._char_buf;

		this._is_filled = false;
		var mask_len = mask_buf.length;
		if (mask_len == 0) {
			return masked_text;
		}

		var maskchar = this.maskchar;
		var fillchar = this.fillchar;

		var text = nexacro._toString(masked_text);

		var ch, mask, val, bufpos = 0;
		var result_buf = [];
		var is_filled = true;
		while ((mask = mask_buf[bufpos])) {
			val = value_buf[bufpos];
			if (val != "") {
				ch = text[bufpos];
				if (!ch) {
					if (fillchar != "") {
						result_buf.push(fillchar);
					}
					is_filled = false;
				}
				else if (ch == maskchar) {
					ch = char_buf[bufpos];
					if (ch && ch == maskchar) {
						result_buf.push(ch);
					}
					else {
						if (fillchar != "") {
							result_buf.push(fillchar);
						}
						is_filled = false;
					}
				}
				else if (ch == '*' && val[0] == '*') {
					ch = char_buf[bufpos];
					if (ch) {
						result_buf.push(ch);
					}
					else {
						if (fillchar != "") {
							result_buf.push(fillchar);
						}
						is_filled = false;
					}
				}
				else {
					result_buf.push(ch);
				}
			}
			bufpos++;
		}
		this._is_filled = is_filled;

		return result_buf.join('');
	};

	_pMaskTypeString.keyPressed = function (ch, pos) {
		this._char_buf[pos] = ch;
	};

	_pMaskTypeString.findNearEditablePos = function (pos, direction) {
		var value_buf = this._value_buf;
		var ch, len = value_buf.length;

		if (direction > 0) {
			while (pos < len) {
				ch = value_buf[pos];
				if (ch != "") {
					return pos;
				}
				pos++;
			}
		}
		else if (direction < 0) {
			while (pos > -1) {
				ch = value_buf[pos];
				if (ch != "") {
					return pos;
				}
				pos--;
			}
		}
		else {
			if ((ch = value_buf[pos])) {
				return pos;
			}
		}
		return -1;
	};

	_pMaskTypeString.isDeletableChar = function (ch, pos) {
		if (this._value_buf[pos]) {
			return true;
		}
		return false;
	};

	_pMaskTypeString.isFilterChar = function (ch, pos) {
		var mask = this._mask_buf[pos];
		if (mask && typeof mask != "string" && mask.test(ch)) {
			return false;
		}
		return true;
	};

	_pMaskTypeString.isFilled = function () {
		return this._is_filled;
	};

	delete _pMaskTypeString;
	_pMaskTypeString = null;

	nexacro._EditMaskTypeDate = function () {
		nexacro._EditMaskType.call(this);

		this.maskchar = " ";
		this.date = "";
		this.editmask = "";
		this.datemask = "";

		this._input_mode = "number";
		this._is_filled = false;

		this._init();
	};
	var _pMaskTypeDate = nexacro._createPrototype(nexacro._EditMaskType, nexacro._EditMaskTypeDate);
	nexacro._EditMaskTypeDate.prototype = _pMaskTypeDate;
	_pMaskTypeDate._type_name = "MaskTypeDate";

	_pMaskTypeDate._dateformatMap = [["yyyy", "yy"], ["MM", "M", "MMMM"], ["dd", "d"], ["HH", "H", "hh", "h"], ["mm", "m"], ["ss", "s"], ["sss"], ["ddd", "dddd"]];

	_pMaskTypeDate._init = function () {
		this.locale = "";
		this._datelistS = ["일", "월", "화", "수", "목", "금", "토"];
		this._datelistL = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

		this._initdate();
		this._initeditmask();
		this._initdatemask();
	};

	_pMaskTypeDate._initdate = function () {
		this._date = [];
		this._dateObj = null;
	};

	_pMaskTypeDate._initeditmask = function () {
		this._editmask_type = -1;
		this._editmasked_empty_text = "";

		this._editmask = [];
		this._edit_char_buf = [];
		this._edit_value_buf = [];
		this._edit_mask_buf = [];
		this._edit_type_buf = [];
	};

	_pMaskTypeDate._initdatemask = function () {
		this._datemask_type = -1;
		this._datemasked_empty_text = "";

		this._datemask = [];
		this._date_char_buf = [];
		this._date_value_buf = [];
		this._date_mask_buf = [];
		this._date_type_buf = [];
	};

	_pMaskTypeDate.setInputMode = function (mode) {
		this._input_mode = mode;
	};

	_pMaskTypeDate.setDate = function (date) {
		this.date = date;
		this._parseDate(date);
	};

	_pMaskTypeDate._parseDate = function (date) {
		this._initdate();

		if (!date) {
			return;
		}

		var info = this._date;

		var y, M, d;
		switch (this.getEditFormatType()) {
			case 0:
				y = date.substr(0, 4);
				M = date.substr(4, 2);
				d = date.substr(6, 2);

				info.push(y);
				info.push(M);
				info.push(d);
				break;
			case 1:
				y = "0000";
				M = "01";
				d = "01";

				info.push(y);
				info.push(M);
				info.push(d);
				info.push(date.substr(0, 2));
				info.push(date.substr(2, 2));
				info.push(date.substr(4, 2));
				info.push(date.substr(6, 3));

				break;
			case 2:
				y = date.substr(0, 4);
				M = date.substr(4, 2);
				d = date.substr(6, 2);

				info.push(y);
				info.push(M);
				info.push(d);
				info.push(date.substr(8, 2));
				info.push(date.substr(10, 2));
				info.push(date.substr(12, 2));
				info.push(date.substr(14, 3));
				break;
		}

		this._dateObj = new Date(y, +M - 1, d);
	};

	_pMaskTypeDate.setEditMask = function (mask) {
		if (this.editmask != mask) {
			this.editmask = mask;
			this._parseEditMask(mask);
			if (this.date) {
				this._parseDate(this.date);
			}
		}
	};

	_pMaskTypeDate._parseEditMask = function (mask) {
		this._initeditmask();

		if (!mask) {
			return;
		}

		if (mask == "SHORTDATE" || mask == "LONGDATE") {
			var locale = this._getLocale();
			mask = nexacro.Locale._makeDateMaskString(locale, mask);
		}

		var maskchar = this.maskchar;
		var mask_buf = this._edit_mask_buf;
		var value_buf = this._edit_value_buf;
		var type_buf = this._edit_type_buf;
		var empty_buf = [];

		var info = this._editmask;
		var ch, str;
		var type;
		var updateinfos = [];
		var updateinfo = {
		};
		var bApostrophe = false;
		var bDateMask = false;
		var bTimeMask = false;
		var pos = 0, idx = 0;

		do {
			ch = mask[pos];
			if (this.isMaskChar(ch) && !bApostrophe) {
				if (!str) {
					str = ch;
					idx = pos;
				}
				else {
					if (ch == mask[pos - 1]) {
						str += ch;
					}
					else {
						type = this.changeMaskToType(str);
						info.push({
							mask : str, 
							type : type
						});

						for (idx; idx < pos; idx++) {
							if (str == "dddd" || str == "MMMM") {
								mask_buf[idx] = str[0];
								value_buf[idx] = "";
							}
							type_buf[idx] = type;
						}
						str = ch;
						idx = pos;
					}
				}

				empty_buf.push(maskchar);
				value_buf.push('$1');
				mask_buf.push(/\d/);
			}
			else {
				if (str) {
					type = this.changeMaskToType(str);
					info.push({
						mask : str, 
						type : type
					});

					if ((type >= 10 && type <= 69) && ((type % 10) > 0)) {
						updateinfos.push({
							pos : pos, 
							type : type
						});
					}

					for (idx; idx < pos; idx++) {
						if (str == "dddd" || str == "MMMM") {
							mask_buf[idx] = str[0];
							value_buf[idx] = "";
						}
						type_buf[idx] = type;
					}
				}
				else if (ch == "'" && bApostrophe) {
					bApostrophe = false;
					continue;
				}
				else if (ch == "'" && !bApostrophe) {
					bApostrophe = true;
					continue;
				}

				if (!nexacro._isNull(ch)) {
					info.push({
						mask : ch, 
						type : -1
					});

					empty_buf.push(ch);
					value_buf.push('');
					mask_buf.push(ch);
					type_buf.push(-1);
				}

				str = "";
			}

			if (type >= 0 && type <= 29) {
				bDateMask = true;
			}
			if (type >= 30 && type <= 69) {
				bTimeMask = true;
			}
		} while (ch = mask[pos++]);

		for (var i = updateinfos.length - 1; i >= 0; i--) {
			updateinfo = updateinfos[i];
			mask_buf.splice(updateinfo.pos, 0, /\d/);
			type_buf.splice(updateinfo.pos, 0, updateinfo.type);
			value_buf.splice(updateinfo.pos, 0, "$1");
			empty_buf.splice(updateinfo.pos, 0, maskchar);
		}

		if (bDateMask) {
			if (bTimeMask) {
				this._editmask_type = 2;
			}
			else {
				this._editmask_type = 0;
			}
		}
		else {
			if (bTimeMask) {
				this._editmask_type = 1;
			}
			else {
				this._editmask_type = -1;
			}
		}

		this._editmasked_empty_text = empty_buf.join('');
	};

	_pMaskTypeDate.setDateMask = function (mask) {
		if (this.datemask != mask) {
			this.datemask = mask;
			this._parseDateMask(this.datemask);
		}
	};

	_pMaskTypeDate._parseDateMask = function (mask) {
		this._initdatemask();

		if (!mask) {
			return;
		}

		if (mask == "SHORTDATE" || mask == "LONGDATE") {
			var locale = this._getLocale();
			mask = nexacro.Locale._makeDateMaskString(locale, mask);
		}

		var maskchar = this.maskchar;
		var mask_buf = this._date_mask_buf;
		var value_buf = this._date_value_buf;
		var type_buf = this._date_type_buf;
		var empty_buf = [];

		var info = this._datemask;
		var ch, str;
		var type;
		var bApostrophe = false;
		var bDateMask = false;
		var bTimeMask = false;
		var pos = 0, idx = 0;

		do {
			ch = mask[pos];
			if (this.isMaskChar(ch) && !bApostrophe) {
				if (!str) {
					str = ch;
					idx = pos;
				}
				else {
					if (ch == mask[pos - 1]) {
						str += ch;
					}
					else {
						type = this.changeMaskToType(str);
						info.push({
							mask : str, 
							type : type
						});

						for (idx; idx < pos; idx++) {
							type_buf[idx] = type;
						}
						str = ch;
						idx = pos;
					}
				}

				empty_buf.push(maskchar);
				value_buf.push('$1');
				mask_buf.push(/\d/);
			}
			else {
				if (str) {
					type = this.changeMaskToType(str);
					info.push({
						mask : str, 
						type : type
					});

					for (idx; idx < pos; idx++) {
						type_buf[idx] = type;
					}
				}
				else if (ch == "'" && bApostrophe) {
					bApostrophe = false;
					continue;
				}
				else if (ch == "'" && !bApostrophe) {
					bApostrophe = true;
					continue;
				}

				if (!nexacro._isNull(ch)) {
					info.push({
						mask : ch, 
						type : -1
					});

					empty_buf.push(ch);
					value_buf.push('');
					mask_buf.push(ch);
					type_buf.push(-1);
				}

				str = "";
			}

			if (type >= 0 && type <= 29) {
				bDateMask = true;
			}
			if (type >= 30 && type <= 69) {
				bTimeMask = true;
			}
		} while (ch = mask[pos++]);

		if (bDateMask) {
			if (bTimeMask) {
				this._datemask_type = 2;
			}
			else {
				this._datemask_type = 0;
			}
		}
		else {
			if (bTimeMask) {
				this._datemask_type = 1;
			}
			else {
				this._datemask_type = -1;
			}
		}

		this._datemasked_empty_text = empty_buf.join('');
	};

	_pMaskTypeDate.setLocale = function (locale) {
		this.locale = locale;

		var locale_info = nexacro.Locale.getLocaleInfo(locale);

		this._datelistS = locale_info.weekday_names_short;
		this._datelistL = locale_info.weekday_names_long;
		this._monthlistS = locale_info.month_names_short;
		this._monthlistL = locale_info.month_names_long;

		this._parseEditMask(this.editmask);
		this._parseDateMask(this.datemask);
	};

	_pMaskTypeDate.applyMask = function (value) {
		if (this.date != value) {
			this.setDate(value);
		}

		if (!this.datemask || !this.editmask) {
			return value;
		}

		if (!value) {
			if (this._is_editing) {
				return this._editmasked_empty_text;
			}
			else {
				return this._datemasked_empty_text;
			}
		}

		if (this._is_editing) {
			this._edit_char_buf = [];
		}

		var pos = 0;
		var info, mask, type;
		var infos = this._is_editing ? this._editmask : this._datemask;
		var tmpStr = "";
		var resultStr = "";

		while (info = infos[pos]) {
			mask = info.mask;
			type = info.type;
			if (type >= 0) {
				tmpStr = this._appliedMaskString(info);

				if (this._is_editing) {
					if (type == 12 || type == 70 || type == 71) {
						tmpStr = mask;
					}
					else if (type > 10 && type < 69) {
						tmpStr = tmpStr.length == 1 ? " " + tmpStr : tmpStr;
					}
				}
			}
			else {
				tmpStr = mask;
			}

			resultStr += tmpStr;

			if (this._is_editing) {
				this._edit_char_buf = this._edit_char_buf.concat(tmpStr.split(''));
			}

			pos++;
		}

		return resultStr;
	};

	_pMaskTypeDate.applyMaskSpin = function (caretPos, diff) {
		var editmask = this._editmask;
		var type_buf = this._edit_type_buf.slice(0);
		var char_buf = this._edit_char_buf;

		caretPos = (caretPos == type_buf.length) ? caretPos - 1 : caretPos;
		var caretType = type_buf[caretPos];
		if (caretType == -1) {
			caretPos = caretPos > 0 ? caretPos - 1 : caretPos;
			caretType = type_buf[caretPos];
			if (caretType == -1) {
				return char_buf.join('');
			}
		}

		var pos = 0;
		var type = -1;
		var tmpStr = "";
		var changeidx_buf = [];
		var info = {
		};
		while (!nexacro._isNull(type = type_buf[pos])) {
			if (caretType == type) {
				tmpStr += char_buf[pos];
				changeidx_buf.push(pos);
			}
			if (editmask[pos] && editmask[pos].type == caretType) {
				info = editmask[pos];
			}
			pos++;
		}

		var intVal = +tmpStr + diff;

		switch (caretType) {
			case 0:
			case 1:
				if (intVal < 0) {
					intVal = 9999;
				}
				else if (intVal > 9999) {
					intVal = 0;
				}
				break;
			case 10:
			case 11:
				if (intVal < 1) {
					intVal = 12;
				}
				else if (intVal > 12) {
					intVal = 1;
				}
				break;
			case 20:
			case 21:
				var endday = this.getEndDay(this._date[0], this._date[1]);
				if (intVal < 1) {
					intVal = endday;
				}
				else {
					if (intVal > endday) {
						intVal = 1;
					}
				}
				break;
			case 30:
			case 31:
				if (intVal < 0) {
					intVal = 23;
				}
				else if (intVal > 23) {
					intVal = 0;
				}
				break;
			case 32:
			case 33:
				if (intVal < 0) {
					intVal = 11;
				}
				else if (intVal > 11) {
					intVal = 0;
				}
				break;
			case 40:
			case 41:
				if (intVal < 0) {
					intVal = 59;
				}
				else if (intVal > 59) {
					intVal = 0;
				}
				break;
			case 50:
			case 51:
				if (intVal < 0) {
					intVal = 59;
				}
				else if (intVal > 59) {
					intVal = 0;
				}
				break;
			case 60:
				if (intVal < 0) {
					intVal = 999;
				}
				else if (intVal > 999) {
					intVal = 0;
				}
				break;
		}

		var text_buf = [];
		tmpStr = this._appliedMaskString(info, intVal.toString());
		if (caretType > 10 && caretType < 69) {
			tmpStr = tmpStr.length == 1 ? " " + tmpStr : tmpStr;
		}
		text_buf = tmpStr.split('');

		for (var i = 0; i < changeidx_buf.length; i++) {
			char_buf[changeidx_buf[i]] = text_buf[i];
		}

		return char_buf.join('');
	};

	_pMaskTypeDate.arrangeMask = function (input_text, begin, end) {
		var mask_buf = this._edit_mask_buf;
		var value_buf = this._edit_value_buf;
		var char_buf = this._edit_char_buf;

		var mask_len = mask_buf.length;
		if (mask_len == 0) {
			return {
				"text" : input_text, 
				"pos" : end
			};
		}

		var text = nexacro._toString(input_text);
		var text_buf = text.split('');

		var mask;
		var maskchar = this.maskchar;
		var i, val, over_cnt = (text.length - mask_len);

		for (i = begin; i < end; i++) {
			val = value_buf[i];
			if (val == null) {
				break;
			}

			if (val == "") {
				end++;
				over_cnt++;
				text_buf.splice(i, 0, mask_buf[i]);
			}
			else if (text_buf[i] == "-") {
				end--;
				over_cnt--;
				i--;
				text_buf.splice(i, 1);
			}
			else {
				mask = mask_buf[i];
				var ch = text_buf[i];

				if (val == "$1" && mask.test(ch)) {
					char_buf[i] = ch;
					text_buf[i] = ch;
				}
				else {
					char_buf[i] = maskchar;
					text_buf[i] = maskchar;
				}
			}
		}

		if (end < mask_len) {
			if (over_cnt > 0) {
				text_buf.splice(end, over_cnt);
			}
			else if (over_cnt < 0) {
				over_cnt = -(over_cnt);
				for (i = 0; i < over_cnt; i++) {
					var pos = end + i;
					val = value_buf[pos];
					if (val == "") {
						text_buf.splice(pos, 0, mask_buf[pos]);
					}
					else {
						text_buf.splice(pos, 0, maskchar);
						char_buf[pos] = maskchar;
					}
				}
			}
		}
		else {
			end = mask_len;
			text_buf.splice(end, (text_buf.length - end));
		}
		return {
			"text" : text_buf.join(''), 
			"pos" : end
		};
	};

	_pMaskTypeDate.removeMask = function (char_buf) {
		if (!char_buf) {
			char_buf = this._edit_char_buf;
		}

		var type_buf = this._edit_type_buf;
		var tmp_str = "";
		var result_buf = [];
		var pos = 0, type = 0, ch = "";

		do {
			if (type_buf[pos] > -1) {
				ch = char_buf[pos] ? char_buf[pos] : "";
				if (tmp_str === "") {
					type = type_buf[pos];
				}
				tmp_str = tmp_str.concat(ch);
			}
			else {
				if (tmp_str !== "") {
					result_buf[type] = this._getRemoveMaskString(type, tmp_str);
					tmp_str = "";
				}
			}

			pos++;
		} while (!nexacro._isNull(type_buf[pos]));

		if (tmp_str !== "") {
			result_buf[type] = this._getRemoveMaskString(type, tmp_str);
		}

		return result_buf.join('');
	};

	_pMaskTypeDate.keyPressed = function (ch, pos) {
		this._edit_char_buf[pos] = ch;

		var value_buf = this._edit_value_buf;
		var value_len = value_buf.length;
		for (var i = value_len; i > 0; i--) {
			if (value_buf[i] && value_buf[i] == "$1") {
				break;
			}
		}

		if ((this._edit_char_buf.length == value_len) && (pos == i)) {
			this._is_filled = true;
		}
		else {
			this._is_filled = false;
		}
	};

	_pMaskTypeDate.findNearEditablePos = function (pos, direction) {
		var value_buf = this._edit_value_buf;
		var ch, len = value_buf.length;

		if (direction > 0) {
			while (pos < len) {
				ch = value_buf[pos];
				if (ch != "") {
					return pos;
				}
				pos++;
			}
		}
		else if (direction < 0) {
			while (pos > -1) {
				ch = value_buf[pos];
				if (ch != "") {
					return pos;
				}
				pos--;
			}
		}
		else {
			if ((ch = value_buf[pos])) {
				return pos;
			}
		}
		return -1;
	};

	_pMaskTypeDate.isDeletableChar = function (ch, pos) {
		if (this._edit_value_buf[pos]) {
			return true;
		}
		return false;
	};

	_pMaskTypeDate.isFilterChar = function (ch, pos) {
		if (!/[0-9]/.test(ch)) {
			return true;
		}

		var char_buf = this._edit_char_buf.slice(0);
		char_buf[pos] = ch;

		var val = this.removeMask(char_buf);

		var y, M, d;
		var h, m, s, ss;

		switch (this.getEditFormatType()) {
			case 0:
				y = val.substr(0, 4);
				M = val.substr(4, 2);
				d = val.substr(6, 2);
				break;
			case 1:
				h = val.substr(0, 2);
				m = val.substr(2, 2);
				s = val.substr(4, 2);
				ss = val.substr(6, 3);
				break;
			case 2:
				y = val.substr(0, 4);
				M = val.substr(4, 2);
				d = val.substr(6, 2);
				h = val.substr(8, 2);
				m = val.substr(10, 2);
				s = val.substr(12, 2);
				ss = val.substr(14, 3);
				break;
		}

		if ((y && isNaN(y = +y)) || (M && isNaN(M = +M)) || (d && isNaN(d = +d)) || (h && isNaN(h = +h)) || (m && isNaN(m = +m)) || (s && isNaN(s = +s)) || (ss && isNaN(ss = +ss))) {
			return true;
		}

		var maxDay = this.getEndDay(y, M);

		if (!maxDay || (M && (+M > 12)) || (d && (+d > maxDay)) || (h && (+h > 24)) || (m && (+m > 60)) || (s && (+s > 60)) || (ss && (+ss > 1000))) {
			return true;
		}

		return false;
	};

	_pMaskTypeDate.isFilled = function () {
		return this._is_filled;
	};

	_pMaskTypeDate.isMaskChar = function (ch) {
		if (ch == "y" || ch == "M" || ch == "d" || ch == "H" || ch == "h" || ch == "m" || ch == "s") {
			return true;
		}
		return false;
	};

	_pMaskTypeDate.isMaskString = function (str) {
		if (str === "yyyy" || str === "yy" || str === "MMMM" || str === "MMM" || str === "MM" || str === "M" || str === "dddd" || str === "ddd" || str === "dd" || str === "d") {
			return true;
		}
		return false;
	};

	_pMaskTypeDate.getEditFormatType = function () {
		return this._editmask_type;
	};

	_pMaskTypeDate.getDateFormatType = function () {
		return this._datemask_type;
	};

	_pMaskTypeDate.getCurrentText = function () {
		return this._edit_char_buf.join('');
	};

	_pMaskTypeDate.getEmptyText = function () {
		if (this._is_editing) {
			return this._editmasked_empty_text;
		}
		else {
			return this._datemasked_empty_text;
		}
	};

	_pMaskTypeDate.getDatePickerValue = function () {
		var date = this._date;
		if (date.length == 0) {
			var currentDate = new Date();
			var year = nexacro._toString(currentDate.getFullYear()).padLeft(4, "0");
			var month = nexacro._toString(currentDate.getMonth() + 1).padLeft(2, "0");
			var day = nexacro._toString(currentDate.getDate()).padLeft(2, "0");

			return year + month + day;
		}
		else {
			return date[0] + date[1] + date[2];
		}
	};

	_pMaskTypeDate.getCurrentDate = function () {
		var year, month, day;
		var currDate = new Date();

		year = currDate.getFullYear();
		month = currDate.getMonth() + 1;
		day = currDate.getDate();

		return {
			year : year, 
			month : month, 
			day : day
		};
	};

	_pMaskTypeDate.getEndDay = function (y, m) {
		var endDayN = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		var endDayL = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

		var ret = "";
		var year = +y;
		var month = +m;

		if (isNaN(year) || isNaN(month)) {
			return;
		}

		if (month == 0) {
			month = 1;
		}

		if (year == 0) {
			ret = endDayN[month - 1];
			return ret;
		}

		if ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0) {
			ret = endDayL[month - 1];
		}
		else {
			ret = endDayN[month - 1];
		}
		endDayN = endDayL = null;
		return ret;
	};

	_pMaskTypeDate.changeNormalizeValue = function (v) {
		if (v instanceof nexacro.Date) {
			v = v.toString();
		}

		if (nexacro._isNull(v) || v === "" || v.trim() === "") {
			return v;
		}

		var y, M, d;
		var h, m, s, ss;
		var str = "";

		switch (this.getEditFormatType()) {
			case 0:
				y = v.substr(0, 4);
				M = v.substr(4, 2);
				d = v.substr(6, 2);
				break;
			case 1:
				h = v.substr(0, 2);
				m = v.substr(2, 2);
				s = v.substr(4, 2);
				ss = v.substr(6, 3);
				break;
			case 2:
				y = v.substr(0, 4);
				M = v.substr(4, 2);
				d = v.substr(6, 2);
				h = v.substr(8, 2);
				m = v.substr(10, 2);
				s = v.substr(12, 2);
				ss = v.substr(14, 3);
				break;
			default:
				return v;
		}

		if (!nexacro._isNull(y)) {
			str += y.padLeft(4, "0");
		}
		if (!nexacro._isNull(M)) {
			M = M.padLeft(2, "0");
			if (M == "00") {
				M = "01";
			}

			str += M;
		}
		if (!nexacro._isNull(d)) {
			d = d.padLeft(2, "0");
			if (d == "00") {
				d = "01";
			}

			str += d;
		}
		if (!nexacro._isNull(h)) {
			str += h.padLeft(2, "0");
		}
		if (!nexacro._isNull(m)) {
			str += m.padLeft(2, "0");
		}
		if (!nexacro._isNull(s)) {
			str += s.padLeft(2, "0");
		}
		if (!nexacro._isNull(ss)) {
			str += ss.padLeft(3, "0");
		}

		return str;
	};

	_pMaskTypeDate.changeMaskToType = function (mask) {
		var type = -1;
		var i = 0, j = 0;
		var maskList = [];
		var map = this._dateformatMap;
		var bFindMask = false;

		for (i = 0; i < map.length; i++) {
			maskList = map[i];
			if (bFindMask) {
				break;
			}

			for (j = 0; j < maskList.length; j++) {
				if (maskList[j] == mask) {
					type = +(nexacro._toString(i) + nexacro._toString(j));
					bFindMask = true;
					break;
				}
			}
		}

		return type;
	};

	_pMaskTypeDate._appliedMaskString = function (info, text) {
		var ret = "";

		var type = info.type;
		var typeStr = nexacro._toString(type).padLeft(2, "0");
		var mask = info.mask;
		var masklen = mask.length;
		var maskchar = this.maskchar;

		var date = this._date;
		var val = text ? text : date[typeStr[0]];
		var bValidate = (date.length && !val) ? true : false;
		var intVal = (+val | 0);
		var jsDate = new Date(date[0], +date[1] - 1, date[2]);

		if (!val) {
			val = "";
			for (var i = 0; i < masklen; i++) {
				val += maskchar;
			}
		}

		switch (type) {
			case 0:
				ret = val.padLeft(4, "0");
				break;
			case 1:
				ret = val.substr(2, 2);
				break;
			case 10:
			case 20:
				ret = val.padLeft(2, "0");
				break;
			case 30:
			case 40:
			case 50:
				ret = bValidate ? "00" : val.padLeft(2, "0");
				break;
			case 11:
			case 21:
			case 41:
			case 51:
				ret = nexacro._toString(intVal);
				break;
			case 31:
				if (intVal < 10) {
					ret = nexacro._toString(intVal);
				}
				else {
					ret = val;
				}
				break;
			case 32:
				if (intVal > 12 && intVal < 24) {
					intVal -= 12;
					val = nexacro._toString(intVal);
				}
				ret = val.padLeft(2, "0");
				break;
			case 33:
				if (intVal > 12 && intVal < 24) {
					intVal -= 12;
					val = nexacro._toString(intVal);
				}
				ret = val;
				break;
			case 60:
				ret = val.padLeft(3, "0");
				break;
			case 12:
				ret = this._monthlistL[intVal - 1];
				break;
			case 70:
				ret = this._datelistS[jsDate.getDay()];
				break;
			case 71:
				ret = this._datelistL[jsDate.getDay()];
			default:
				break;
		}

		return ret;
	};

	_pMaskTypeDate._getRemoveMaskString = function (type, val) {
		var ret = "";
		val = val.trim();
		switch (type) {
			case 0:
				ret = val.padLeft(4, "0");
				break;
			case 1:
				if (val) {
					if (val.length == 4) {
						ret = val;
					}
					else if (val.length == 2) {
						ret = this._date.length ? this._date[0].substr(0, 2) + val : "19" + val;
					}
					else {
						ret = val.padLeft(4, "0");
					}
				}
				else {
					ret = val.padLeft(4, "0");
				}
				break;
			case 10:
			case 11:
				ret = val ? val.padLeft(2, "0") : "01";
				break;
			case 12:
				ret = this._date.length ? this._date[1] : "01";
				break;
			case 20:
			case 21:
				ret = val ? val.padLeft(2, "0") : "01";
				break;
			case 30:
			case 31:
			case 32:
			case 33:
			case 40:
			case 41:
			case 50:
			case 51:
				ret = val.padLeft(2, "0");
				break;
			case 60:
				ret = val.padLeft(3, "0");
				break;
		}
		return ret;
	};

	_pMaskTypeDate._getLocale = function () {
		if (this.locale) {
			return this.locale;
		}
		else {
			return nexacro._getLocale();
		}
	};

	delete _pMaskTypeDate;
	_pMaskTypeDate = null;

	nexacro._GridMaskTypeNumber = function () {
		nexacro._EditMaskTypeNumber.call(this);

		this._init();
	};
	var _pGridMaskTypeNumber = nexacro._createPrototype(nexacro._EditMaskTypeNumber, nexacro._GridMaskTypeNumber);
	nexacro._GridMaskTypeNumber.prototype = _pGridMaskTypeNumber;
	_pGridMaskTypeNumber._type_name = "GridTypeNumber";







	delete _pGridMaskTypeNumber;
	_pGridMaskTypeNumber = null;
}
