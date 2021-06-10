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

if (!nexacro.Calendar) {
	nexacro.CalendarCloseUpEventInfo = function (obj, id, pretext, posttext, prevalue, postvalue) {
		this.id = this.eventid = id || "oncloseup";
		this.fromobject = this.fromreferenceobject = obj;

		this.pretext = pretext;
		this.posttext = posttext;
		this.prevalue = prevalue;
		this.postvalue = postvalue;
	};
	var _pCalendarCloseUpEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarCloseUpEventInfo);
	nexacro.CalendarCloseUpEventInfo.prototype = _pCalendarCloseUpEventInfo;
	_pCalendarCloseUpEventInfo._type_name = "CalendarCloseUpEventInfo";

	delete _pCalendarCloseUpEventInfo;
	_pCalendarCloseUpEventInfo = null;

	nexacro.CalendarDayClickEventInfo = function (obj, id, date) {
		this.id = this.eventid = id || "ondayclick";
		this.fromobject = this.fromreferenceobject = obj;

		this.date = date;
	};
	var _pCalendarDayClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarDayClickEventInfo);
	nexacro.CalendarDayClickEventInfo.prototype = _pCalendarDayClickEventInfo;
	_pCalendarDayClickEventInfo._type_name = "CalendarDayClickEventInfo";

	delete _pCalendarDayClickEventInfo;
	_pCalendarDayClickEventInfo = null;

	nexacro.CalendarSpinEventInfo = function (obj, id, beforeText, afterText, beforeValue, afterValue, isUp, fromobject, fromreferenceobject) {
		nexacro.Event.call(this, obj, id || "oncalendarspin");
		this.id = this.eventid = id || "oncalendarspin";

		this.fromobject = fromobject || obj;
		this.fromreferenceobject = fromreferenceobject || obj;

		this.pretext = beforeText;
		this.posttext = afterText;
		this.prevalue = beforeValue;
		this.postvalue = afterValue;
		this.up = isUp;
	};
	var _pCalendarSpinEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarSpinEventInfo);
	nexacro.CalendarSpinEventInfo.prototype = _pCalendarSpinEventInfo;
	_pCalendarSpinEventInfo._type_name = "CalendarSpinEventInfo";

	delete _pCalendarSpinEventInfo;
	_pCalendarSpinEventInfo = null;

	nexacro.Calendar = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._masktypeobj = new nexacro._EditMaskTypeDate();
		this._onlydisplay = onlydisplay;
	};

	var _pCalendar = nexacro._createPrototype(nexacro.Component, nexacro.Calendar);
	nexacro.Calendar.prototype = _pCalendar;
	_pCalendar._type_name = "Calendar";


	_pCalendar.calendaredit = null;
	_pCalendar.dropbutton = null;
	_pCalendar.datepicker = null;
	_pCalendar.calendarspinupbutton = null;
	_pCalendar.calendarspindownbutton = null;
	_pCalendar._popupcontrol = null;


	_pCalendar.value = undefined;
	_pCalendar.displaynulltext = "";
	_pCalendar.readonly = false;
	_pCalendar.autoselect = false;
	_pCalendar.autoskip = false;
	_pCalendar.type = "normal";
	_pCalendar.popuptype = undefined;
	_pCalendar.text = "";
	_pCalendar.usecontextmenu = true;
	_pCalendar.usesoftkeyboard = true;
	_pCalendar.locale = "";

	_pCalendar.innerdataset = null;
	_pCalendar.backgroundcolumn = "";
	_pCalendar.bordercolumn = "";
	_pCalendar.datecolumn = "";
	_pCalendar.textcolorcolumn = "";

	_pCalendar.buttonsize = undefined;
	_pCalendar.headheight = undefined;
	_pCalendar.daysize = undefined;
	_pCalendar.popupsize = undefined;

	_pCalendar.dateformat = "yyyy-MM-dd ddd";
	_pCalendar.editformat = "yyyy-MM-dd";
	_pCalendar.headformat = "yyyy.MM";
	_pCalendar.weekformat = undefined;

	_pCalendar.usetrailingday = false;
	_pCalendar.showmonthspin = false;
	_pCalendar.showyearspin = false;


	_pCalendar._masktypeobj = null;
	_pCalendar._innerdataset = null;

	_pCalendar._locale = "";
	_pCalendar._type = "normal";
	_pCalendar._systemformat = "yyyy-MM-dd";
	_pCalendar._default_value = undefined;
	_pCalendar._default_text = "";
	_pCalendar._default_type = "";
	_pCalendar._want_arrows = false;
	_pCalendar._has_inputElement = true;

	_pCalendar._onlydisplay = false;


	_pCalendar._is_locale_control = true;
	_pCalendar._is_editable_control = true;
	_pCalendar._use_readonly_status = true;


	_pCalendar._event_list = {
		"oneditclick" : 1, 
		"ondayclick" : 1, 
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
		"ondropdown" : 1, 
		"oncloseup" : 1, 
		"onspin" : 1, 
		"oninnerdatachanged" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};


	_pCalendar.accessibilityrole = "calendar";
	_pCalendar._is_compound = true;

	nexacro.Calendar.EndDayNormal = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	nexacro.Calendar.EndDayLeap = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

	_pCalendar.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var maskobj = this._masktypeobj;
			if (maskobj) {
				var mode = "number";
				if ((!this.popuptype || this.popuptype == "system") && this._type == "normal") {
					var bMobile = ((nexacro._isMobile && nexacro._isMobile()) || (nexacro._isHybrid && nexacro._isHybrid()) || (!nexacro._isDesktop() && nexacro._OS == "Android" && nexacro._Browser == "Runtime"));
					if (bMobile) {
						mode = "date";
						this._type = "system";
					}
				}

				maskobj.setInputMode(mode);
			}

			switch (this._type) {
				case "normal":
					this._createCalendaredit();
					this._createDropbutton();
					break;
				case "spin":
					this._createCalendaredit();
					this._createSpinbutton();
					break;
				case "monthonly":
					this._createDatePicker();
					break;
				case "system":
					this._createCalendaredit();
			}
		}
	};

	_pCalendar.on_created_contents = function (win) {
		this.on_apply_innerdataset(this._innerdataset);
		this.on_apply_editformat(this.editformat);
		this.on_apply_dateformat(this.dateformat);
		this.on_apply_locale(this._getLocale());
		this.on_apply_weekformat(this.weekformat);

		if (this.expr) {
			this.on_apply_expr();
		}
		else {
			this.on_apply_value(this.value);
		}

		this._recalcLayout();

		switch (this._type) {
			case "spin":
				this._setEventHandlerToCalendarEdit();
				this._setEventHandlerToSpinButton();

				this.calendaredit.on_created(win);
				this.calendarspinupbutton.on_created(win);
				this.calendarspindownbutton.on_created(win);
				if (nexacro._accessibilitytype == 5) {
					this.calendaredit._setAccessibilityStatHidden(true);
					this.calendarspinupbutton._setAccessibilityStatHidden(true);
					this.calendarspindownbutton._setAccessibilityStatHidden(true);
				}
				break;
			case "monthonly":
				this._setEventHandlerToDatePicker();

				this.datepicker.on_created(win);
				break;
			case "system":
				if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
					var control_elem = this.getElement();
					if (control_elem) {
						control_elem.setElementAccessibilityStatHidden(false);
					}
				}

				this._setEventHandlerToCalendarEdit();

				this.calendaredit._on_apply_inputtype();
				this.calendaredit.on_created(win);
				if (nexacro._accessibilitytype == 5) {
					this.calendaredit._setAccessibilityStatHidden(true);
				}
				if (!(this.accessibilitydesclevel == "none") && !(this.accessibilitydesclevel == "child")) {
					this._setAccessibilityActiveDescendant(this.calendaredit._input_element);
				}
				break;
			case "normal":
			default:
				this._setEventHandlerToCalendarEdit();
				this._setEventHandlerToDropButton();

				this.calendaredit.on_created(win);
				if (nexacro._accessibilitytype == 5) {
					this.calendaredit._setAccessibilityStatHidden(true);
				}
				this.dropbutton.on_created(win);
				break;
		}

		if (this.calendaredit) {
			this.calendaredit.set_usesoftkeyboard(this.usesoftkeyboard, true);
		}

		this._default_value = this.value;
		this._default_text = this.text;
	};

	_pCalendar.on_destroy_contents = function () {
		this._destroyControl();

		this._removeEventHandlerToInnerDataset();
	};

	_pCalendar._removeEventHandlerToInnerDataset = function () {
		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onvaluechanged", this._on_dataset_onvaluechanged, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._on_dataset_onrowsetchanged, this);
			this._innerdataset = null;
		}
	};

	_pCalendar.on_create_contents_command = function () {
		this.on_apply_innerdataset(this._innerdataset);
		this.on_apply_editformat(this.editformat);
		this.on_apply_dateformat(this.dateformat);
		this.on_apply_locale(this._getLocale());
		this.on_apply_weekformat(this.weekformat);

		if (this.expr) {
			this.on_apply_expr();
		}
		else {
			this.on_apply_value(this.value);
		}

		this._recalcLayout();

		switch (this._type) {
			case "normal":
				this._setEventHandlerToCalendarEdit();
				this._setEventHandlerToDropButton();
				break;
			case "spin":
				this._setEventHandlerToCalendarEdit();
				this._setEventHandlerToSpinButton();
				break;
			case "monthonly":
				this._setEventHandlerToDatePicker();
				break;
			case "system":
				this._setEventHandlerToCalendarEdit();
		}

		var str = "";
		if (this.calendaredit) {
			this.calendaredit._on_apply_inputtype();

			str += this.calendaredit.createCommand();
		}
		if (this.dropbutton) {
			str += this.dropbutton.createCommand();
		}
		if (this.calendarspindownbutton) {
			str += this.calendarspindownbutton.createCommand();
		}
		if (this.calendarspinupbutton) {
			str += this.calendarspinupbutton.createCommand();
		}
		if (this.datepicker) {
			str += this.datepicker.createCommand();
		}

		return str;
	};

	_pCalendar.on_attach_contents_handle = function (win) {
		if (this.calendaredit) {
			this.calendaredit.attachHandle(win);
		}
		if (this.dropbutton) {
			this.dropbutton.attachHandle(win);
		}
		if (this.calendarspindownbutton) {
			this.calendarspindownbutton.attachHandle(win);
		}
		if (this.calendarspinupbutton) {
			this.calendarspinupbutton.attachHandle(win);
		}
		if (this.datepicker) {
			this.datepicker.attachHandle(win);
		}

		if (nexacro._enableaccessibility) {
			if (this._type == "monthonly") {
				this._setAccessibilityRole("datepicker");
				this._accessibilityvalue = this._masktypeobj.applyMask(this.datepicker.body.on_get_accessibility_label());
			}
			else {
				this.calendaredit._setAccessibilityStatHidden(true);
				if (this.calendarspinupbutton) {
					this.calendarspinupbutton._setAccessibilityStatHidden(true);
				}
				if (this.calendarspinupbutton) {
					this.calendarspinupbutton._setAccessibilityStatHidden(true);
				}
			}
		}
		this._default_value = this.value;
		this._default_text = this.text;
	};

	_pCalendar.on_change_containerRect = function () {
		this._recalcLayout();
	};

	_pCalendar.on_change_containerPos = function () {
	};

	_pCalendar._apply_setfocus = function (evt_name) {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit._on_focus(true, evt_name);
		}
	};

	_pCalendar.on_apply_prop_enable = function (v) {
		if (this.calendaredit) {
			this.calendaredit._setEnable(v);
		}
		if (this.dropbutton) {
			this.dropbutton._setEnable(v);
		}
		if (this.calendarspinupbutton) {
			this.calendarspinupbutton._setEnable(v);
		}
		if (this.calendarspindownbutton) {
			this.calendarspindownbutton._setEnable(v);
		}
		if (this.datepicker) {
			this.datepicker._setEnable(v);
		}
	};

	_pCalendar.on_apply_prop_cssclass = function () {
		if (this.calendaredit) {
			this.calendaredit.on_apply_cssclass();
		}
		if (this.dropbutton) {
			this.dropbutton.on_apply_cssclass();
		}
		if (this.calendarspinupbutton) {
			this.calendarspinupbutton.on_apply_cssclass();
		}
		if (this.calendarspindownbutton) {
			this.calendarspindownbutton.on_apply_cssclass();
		}
		if (this.datepicker) {
			this.datepicker.on_apply_cssclass();
		}
	};

	_pCalendar.on_init_bindSource = function (columnid, propid) {
		if (propid == "value") {
			this._setValue(undefined);
		}
	};

	_pCalendar.on_change_bindSource = function (propid, ds, row, col) {
		if (propid == "value") {
			var v = ds.getColumn(row, col);
			if (v != this.value) {
				this._setValue(v);
			}
		}
	};

	_pCalendar.on_getBindableProperties = function () {
		return "value";
	};

	_pCalendar._getDragData = function () {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			return calendaredit.getSelectedText();
		}
	};

	_pCalendar._getDlgCode = function (keycode, altKey, ctrlKey) {
		var _want_arrows = this._want_arrows;
		this._is_first_focus = false;
		if (ctrlKey == true) {
			_want_arrows = true;
		}
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrows
		};
	};

	_pCalendar.on_get_accessibility_label = function () {
		{
		}
		return "";
	};

	_pCalendar._on_getAccessibilityAdditionalLabel = function () {
		var additionallabel = "";
		if (this.type != "monthonly") {
			additionallabel = this._accessibilityvalue ? this._accessibilityvalue : this.text ? this.text : this._getCurrentDateStr();
		}
		else {
			additionallabel = this._getCurrentDateStr();
		}

		return additionallabel ? additionallabel : this.displaynulltext;
	};

	_pCalendar._getAccessibilityReadLabel = function () {
		var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
		if (this.calendaredit && this.calendaredit._input_element && this._status != "focus") {
			if (!this.calendaredit._input_element._wantAccessibilityAdditionalLabel
				 || !this.calendaredit._input_element._wantAccessibilityAdditionalLabel()) {
				_readlabel = this.text + " " + _readlabel;
			}
		}
		return this._accessibilityvalue ? this._accessibilityvalue : this.text ? this.text : this._getCurrentDateStr();
	};


	_pCalendar.set_text = nexacro._emptyFn;

	_pCalendar.on_apply_text = function (v) {
		var expr = this.expr;
		if (expr) {
			if (expr.substring(0, 4) == "Date") {
				v = new nexacro.Date(v).toString();
			}

			this.set_value(v);
		}
	};

	_pCalendar.set_value = function (v) {
		if (v && ((typeof v) == "object") && !(v instanceof nexacro.Date)) {
			return;
		}

		v = v ? nexacro._toString(v) : v;
		if (this.value !== v) {
			if (this.applyto_bindSource("value", v)) {
				this._setValue(v);
			}
		}
	};

	_pCalendar.on_apply_value = function (value) {
		value = nexacro._isNull(value) ? value : value.trim();

		var maskobj = this._masktypeobj;
		if (maskobj) {
			this.text = maskobj.applyMask(value);

			var calendaredit = this.calendaredit;
			if (calendaredit) {
				calendaredit._setValue(value);
				if (nexacro._enableaccessibility) {
					this._accessibilityvalue = calendaredit.text;
					this._updateAccessibilityLabel();
					calendaredit._updateAccessibilityLabel();
				}
			}

			var datepicker = this.datepicker;
			if (datepicker) {
				datepicker._setValue(maskobj.getDatePickerValue());
			}
		}
	};

	_pCalendar.set_displaynulltext = function (v) {
		v = nexacro._toString(v).replace(/&quot;/g, "\"");
		if (this.displaynulltext != v) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext(v);
		}
	};

	_pCalendar.on_apply_displaynulltext = function (displaynulltext) {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit.set_displaynulltext(displaynulltext);
		}
	};

	_pCalendar.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (this.readonly != v) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pCalendar.on_apply_readonly = function (readonly) {
		this._changeStatus("readonly", readonly);

		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit.set_readonly(readonly);
		}

		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker.set_readonly(readonly);
		}
	};

	_pCalendar.set_autoselect = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoselect != v) {
			this.autoselect = v;
			this.on_apply_autoselect(v);
		}
	};

	_pCalendar.on_apply_autoselect = function (autoselect) {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit.set_autoselect(autoselect);
		}
	};

	_pCalendar.set_autoskip = function (v) {
		v = nexacro._toBoolean(v);
		if (this.autoskip != v) {
			this.autoskip = v;
			this.on_apply_autoskip(v);
		}
	};

	_pCalendar.on_apply_autoskip = function (autoskip) {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit.set_autoskip(autoskip);
		}
	};

	_pCalendar.set_type = function (v) {
		var type_enum = ["normal", "spin", "monthonly"];
		if (type_enum.indexOf(v) == -1) {
			return;
		}

		if (this.type != v) {
			this._default_type = this.type;
			this.type = v;
			this.on_apply_type(v);
		}
	};

	_pCalendar.on_apply_type = function (type) {
		var is_change = true;
		var client_width = this._getClientWidth();
		var normal_height = Math.round(client_width / 5);
		if (this._default_type != "monthonly" || type == "monthonly") {
			is_change = false;
		}

		if (type != "monthonly" && this._masktypeobj.getInputMode() == "date") {
			type = "system";
		}

		this._type = type;

		var control_elem = this.getElement();
		if (control_elem) {
			this._destroyControl();

			switch (this._type) {
				case "normal":
					this._createNormaltypeControl();

					if (is_change) {
						this.resize(client_width, normal_height);
					}
					else {
						this._recalcLayout();
					}
					break;
				case "spin":
					this._createSpintypeControl();

					if (is_change) {
						this.resize(client_width, normal_height);
					}
					else {
						this._recalcLayout();
					}
					break;
				case "monthonly":
					this._createMonthlytypeControl();

					var popupsize = this._getPopupSizeArr();
					if (this._adjust_width == popupsize.width && this._adjust_height == popupsize.height) {
						this._recalcLayout();
					}
					else {
						this.resize(popupsize.width, popupsize.height);
					}
					break;
				case "system":
					this._createSystemtypeControl();

					if (is_change) {
						this.resize(client_width, normal_height);
					}
					else {
						this._recalcLayout();
					}
					break;
			}
		}
	};

	_pCalendar.set_popuptype = function (v) {
		var popuptype_enum = ["center", "none", "normal", "system"];
		if (v && popuptype_enum.indexOf(v) == -1) {
			return;
		}

		if (this.popuptype != v) {
			this.popuptype = v;
			this.on_apply_popuptype(v);
		}
	};

	_pCalendar.on_apply_popuptype = function (popuptype) {
		var type = this._type;
		var maskobj = this._masktypeobj;
		if (maskobj) {
			var mode = "number";
			if ((!popuptype || popuptype == "system") && type != "monthonly") {
				var bMobile = ((nexacro._isMobile && nexacro._isMobile()) || (nexacro._isHybrid && nexacro._isHybrid()) || (!nexacro._isDesktop() && nexacro._OS == "Android" && nexacro._Browser == "Runtime"));
				if (bMobile) {
					mode = "date";
				}
			}

			maskobj.setInputMode(mode);

			this.on_apply_type(this.type);
		}
	};

	_pCalendar.set_locale = function (v) {
		if (this.locale != v) {
			this.locale = v;
			this._locale = v;
			this.on_apply_locale(v);

			this.on_apply_weekformat(this.weekformat);
			this.on_apply_value(this.value);
		}
	};

	_pCalendar.on_apply_locale = function (locale) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			maskobj.setLocale(locale);
		}
	};

	_pCalendar.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);
		if (this.usecontextmenu != v) {
			this.usecontextmenu = v;
			this.on_apply_usecontextmenu(v);
		}
	};

	_pCalendar.on_apply_usecontextmenu = function (usecontextmenu) {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit.set_usecontextmenu(usecontextmenu);
		}
	};

	_pCalendar.set_usesoftkeyboard = function (v, bforce) {
		v = nexacro._toBoolean(v);
		if (v != this.usesoftkeyboard || bforce) {
			this.usesoftkeyboard = v;
			this.on_apply_usesoftkeyboard(bforce);
		}
	};

	_pCalendar.on_apply_usesoftkeyboard = function (bforce) {
		if (this.calendaredit) {
			this.calendaredit.set_usesoftkeyboard(this.usesoftkeyboard, bforce);
		}
	};

	_pCalendar.set_innerdataset = function (v) {
		if (typeof v != "string") {
			this.setInnerDataset(v);
			return;
		}

		if (this.innerdataset != v || (this.innerdataset && !this._innerdataset)) {
			this._setInnerDatasetStr(v);
			this.on_apply_innerdataset(this._innerdataset);
		}
	};

	_pCalendar.on_apply_innerdataset = function (ds) {
		if (ds) {
			ds._setEventHandler("onvaluechanged", this._on_dataset_onvaluechanged, this);
			ds._setEventHandler("onrowsetchanged", this._on_dataset_onrowsetchanged, this);
		}

		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
		}
	};

	_pCalendar.set_backgroundcolumn = function (v) {
		if (this.backgroundcolumn != v) {
			this.backgroundcolumn = v;
			this.on_apply_backgroundcolumn(v);
		}
	};

	_pCalendar.on_apply_backgroundcolumn = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
		}
	};

	_pCalendar.set_bordercolumn = function (v) {
		if (this.bordercolumn != v) {
			this.bordercolumn = v;
			this.on_apply_bordercolumn(v);
		}
	};

	_pCalendar.on_apply_bordercolumn = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
		}
	};

	_pCalendar.set_datecolumn = function (v) {
		if (this.datecolumn != v) {
			this.datecolumn = v;
			this.on_apply_datecolumn(v);
		}
	};

	_pCalendar.on_apply_datecolumn = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
		}
	};

	_pCalendar.set_textcolorcolumn = function (v) {
		if (this.textcolorcolumn != v) {
			this.textcolorcolumn = v;
			this.on_apply_textcolorcolumn(v);
		}
	};

	_pCalendar.on_apply_textcolorcolumn = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
		}
	};

	_pCalendar.set_buttonsize = function (v) {
		if (this.buttonsize != v) {
			this.buttonsize = v;
			this.on_apply_buttonsize(v);
		}
	};

	_pCalendar.on_apply_buttonsize = function () {
		this._recalcLayout();
	};

	_pCalendar.set_headheight = function (v) {
		if (v !== undefined) {
			if (isNaN(v = +v)) {
				return;
			}
		}

		if (this.headheight != v) {
			this.headheight = v;
			this.on_apply_headheight(v);
		}
	};

	_pCalendar.on_apply_headheight = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._recalcLayout();
		}
	};

	_pCalendar.set_daysize = function (v) {
		if (this.daysize != v) {
			this.daysize = v;
			this.on_apply_daysize(v);
		}
	};

	_pCalendar.on_apply_daysize = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
			datepicker.body._recalcLayout();
		}
	};

	_pCalendar.set_popupsize = function (v) {
		if (this.popupsize != v) {
			this.popupsize = v;
		}
	};

	_pCalendar.on_apply_popupsize = nexacro._emptyFn;

	_pCalendar.set_dateformat = function (v) {
		if (this.dateformat != v) {
			this.dateformat = v;
			this.on_apply_dateformat(v);
			this.on_apply_value(this.value);
		}
	};

	_pCalendar.on_apply_dateformat = function (dateformat) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			if (this._type == "system") {
				this.dateformat = dateformat = this._systemformat;
			}

			maskobj.setDateMask(dateformat);
		}
	};

	_pCalendar.set_editformat = function (v) {
		if (this.editformat != v) {
			this.editformat = v;
			this.on_apply_editformat(v);
			this._setValue(this.value);
		}
	};

	_pCalendar.on_apply_editformat = function (editformat) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			if (this._type == "system") {
				this.editformat = editformat = this._systemformat;
			}

			maskobj.setEditMask(editformat);
		}
	};

	_pCalendar.set_headformat = function (v) {
		if (this.headformat != v) {
			this.headformat = v;
			this.on_apply_headformat(v);
		}
	};

	_pCalendar.on_apply_headformat = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._setHeadformatText();
		}
	};

	_pCalendar.set_weekformat = function (v) {
		if (this.weekformat != v) {
			this.weekformat = v;
			this.on_apply_weekformat(v);
		}
	};

	_pCalendar.on_apply_weekformat = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._setWeekformatText();
		}
	};

	_pCalendar.set_usetrailingday = function (v) {
		v = nexacro._toBoolean(v);
		if (this.usetrailingday != v) {
			this.usetrailingday = v;
			this.on_apply_usetrailingday(v);
		}
	};

	_pCalendar.on_apply_usetrailingday = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
		}
	};

	_pCalendar.set_showmonthspin = function (v) {
		v = nexacro._toBoolean(v);
		if (this.showmonthspin != v) {
			this.showmonthspin = v;
			this.on_apply_showmonthspin(v);
		}
	};

	_pCalendar.on_apply_showmonthspin = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshSpindate();
		}
	};

	_pCalendar.set_showyearspin = function (v) {
		v = nexacro._toBoolean(v);
		if (this.showyearspin != v) {
			this.showyearspin = v;
			this.on_apply_showyearspin(v);
		}
	};

	_pCalendar.on_apply_showyearspin = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshSpindate();
		}
	};

	_pCalendar.on_apply_accessibility = function () {
		nexacro.Component.prototype.on_apply_accessibility.call(this);
		if (this.calendaredit) {
			this.calendaredit.on_apply_accessibility();
		}
	};

	_pCalendar.set_visible = function (v) {
		nexacro.Component.prototype.set_visible.call(this, v);

		if (!this.visible && this._isPopupVisible()) {
			this._closePopup();
		}
	};

	_pCalendar.on_apply_accessibility = function (accessibility) {
		nexacro.Component.prototype.on_apply_accessibility.call(this, accessibility);
		if (this.calendaredit) {
			this.calendaredit.on_apply_accessibility(accessibility);
		}
	};

	_pCalendar.dropdown = function () {
		if (!this.enable || this.readonly || !this.visible || this._type == "system") {
			return false;
		}

		this._setFocus(false);

		this._showPopup();
		this._setDefaultCaret();
	};

	_pCalendar.isDropdown = function () {
		return this._isPopupVisible();
	};

	_pCalendar.getCaretPos = function () {
		if (this.readonly) {
			return -1;
		}

		var calendaredit = this.calendaredit;
		if (calendaredit) {
			return calendaredit.getCaretPos();
		}

		return -1;
	};

	_pCalendar.setCaretPos = function (v) {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			return calendaredit.setCaretPos(v);
		}
	};

	_pCalendar.getSelect = function () {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			return calendaredit.getSelect();
		}

		return [0, 0];
	};

	_pCalendar.setSelect = function (begin, end) {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			return calendaredit.setSelect(begin, end);
		}
		return false;
	};

	_pCalendar.getSelectedText = function () {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			return calendaredit.getSelectedText();
		}

		return "";
	};

	_pCalendar.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pCalendar.setInnerDataset = function (obj) {
		this._removeEventHandlerToInnerDataset();

		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset(this._innerdataset);
		}
		else if (obj instanceof nexacro.Dataset) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this.on_apply_innerdataset(this._innerdataset);
		}
	};

	_pCalendar.getYear = function () {
		var ret = 1970;
		if (this.value) {
			var maskobj = this._masktypeobj;
			if (maskobj) {
				return maskobj._dateObj.getFullYear();
			}
		}
		return ret;
	};

	_pCalendar.getMonth = function () {
		var ret = 1;
		if (this.value) {
			var maskobj = this._masktypeobj;
			if (maskobj) {
				return maskobj._dateObj.getMonth() + 1;
			}
		}
		return ret;
	};

	_pCalendar.getDay = function () {
		var ret = 1;
		if (this.value) {
			var maskobj = this._masktypeobj;
			if (maskobj) {
				return maskobj._dateObj.getDate();
			}
		}
		return ret;
	};

	_pCalendar.getDayOfWeek = function () {
		var ret = 4;
		if (this.value) {
			var maskobj = this._masktypeobj;
			if (maskobj) {
				return maskobj._dateObj.getDay();
			}
		}
		return ret;
	};

	_pCalendar.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};

	_pCalendar._on_value_change = function (prevalue, postvalue) {
		var ret = true;
		var pretext = this._getEventInfoText(prevalue);
		var posttext = this._getEventInfoText(postvalue);

		if (!this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue) || 
			!this.applyto_bindSource("value", postvalue)) {
			ret = false;
		}

		if (!ret) {
			this._setValue(prevalue);
			return false;
		}

		this._setValue(postvalue);

		this.on_fire_onchanged(this, pretext, prevalue, posttext, postvalue);

		if (this.autoskip && this._isPopupVisible()) {
			this._closePopup();
		}

		this._default_value = prevalue;
		this._default_text = pretext;

		return true;
	};

	_pCalendar._on_scroll_change = function () {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit._on_scroll_change();
		}
	};

	_pCalendar._on_dataset_onvaluechanged = function (obj, e) {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
		}

		if (this._is_created) {
			this.on_fire_oninnerdatachanged(obj, e.oldvalue, e.newvalue, e.columnid, e.col, e.row);
		}
	};

	_pCalendar._on_dataset_onrowsetchanged = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._refreshDay();
		}
	};

	_pCalendar._on_edit_oneditclick = function (obj, e) {
		this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject);

		if (this._type == "system" && !this.readonly) {
			var control_elem = this.getElement();
			if (control_elem) {
				nexacro._openSystemCalendar(this, this.value);
			}
			return true;
		}
	};

	_pCalendar._on_edit_onlbuttondown = function () {
		if (this.readonly) {
			return false;
		}

		if (this._isPopupVisible()) {
			this._closePopup();
		}
	};

	_pCalendar._on_edit_onlbuttonup = function () {
	};

	_pCalendar._on_edit_onkeydown = function (obj, e) {
		var keycode = e.keycode;
		var calendaredit = this.calendaredit;
		var datepicker = this.datepicker;

		switch (this.type) {
			case "normal":
				if (keycode == nexacro.Event.KEY_ESC) {
					if (this._isPopupVisible()) {
						this._closePopup();
					}
					this._setDefaultCaret();
				}
				else if (keycode == nexacro.Event.KEY_ENTER) {
					if (this._isPopupVisible()) {
						datepicker.on_fire_ondayclick(datepicker._value);
					}
					else {
						if (this.value != calendaredit.value) {
							this._on_value_change(this.value, calendaredit.value);
						}
						else if (this.text != calendaredit.text) {
							this._setValue(this.value);
						}
					}
					this._setDefaultCaret();
				}
				else if (e.altkey && keycode == nexacro.Event.KEY_DOWN) {
					if (!this._isPopupVisible()) {
						this._showPopup();
						this._setDefaultCaret();
					}
				}
				else {
					if (this._isPopupVisible()) {
						if (keycode >= nexacro.Event.KEY_LEFT && keycode <= nexacro.Event.KEY_DOWN) {
							datepicker._on_body_onkeydown(obj, e);
						}
					}
				}
				break;
			case "spin":
				if (keycode == nexacro.Event.KEY_ENTER) {
					if (this.value != calendaredit.value) {
						this._on_value_change(this.value, calendaredit.value);
					}
					else if (this.text != calendaredit.text) {
						this._setValue(this.value);
					}
					this._setDefaultCaret();
				}
				else if (keycode == nexacro.Event.KEY_UP) {
					if (!nexacro._enableaccessibility || e.ctrlkey) {
						this._on_spin_onspinup(obj, e);
					}
				}
				else if (keycode == nexacro.Event.KEY_DOWN) {
					if (!nexacro._enableaccessibility || e.ctrlkey) {
						this._on_spin_onspindown(obj, e);
					}
				}

				break;
			case "monthonly":
				if (keycode >= nexacro.Event.KEY_LEFT && keycode <= nexacro.Event.KEY_DOWN) {
					datepicker.on_keydown_default_action(keycode, e.altkey, e.ctrlkey, e.shiftkey, e.fromreferenceobject);
					datepicker._refreshSpindate();
					datepicker.on_fire_ondayclick(datepicker);
				}
				break;
			default:
				break;
		}

		if (keycode >= nexacro.Event.KEY_LEFT && keycode <= nexacro.Event.KEY_DOWN) {
			if (this._isPopupVisible()) {
				calendaredit._input_element.stopSysEvent();
			}
			else {
				if (keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) {
					calendaredit._input_element.stopSysEvent();
				}
			}
		}
		return false;
	};

	_pCalendar._on_edit_oninput = function () {
		var maskobj = this._masktypeobj;
		var datepicker = this.datepicker;
		if (datepicker && this._isPopupVisible()) {
			datepicker._setValue(maskobj.getDatePickerValue());
		}

		this.on_fire_oninput();

		if (this._type == "system") {
			var pre_value = this.value;
			var cur_value = maskobj.changeNormalizeValue(this.calendaredit.value);

			if (pre_value != cur_value) {
				this._on_value_change(pre_value, cur_value);
			}
		}
	};

	_pCalendar._on_drop_onlbuttondown = function () {
		if (this.readonly || !this.enable) {
			return false;
		}

		if (this._isPopupVisible()) {
			this._closePopup();

			if (!this.autoselect) {
				this._setDefaultCaret();
			}
		}
		else {
			this._showPopup();

			if (!this.autoselect) {
				this._setDefaultCaret();
			}
		}

		return false;
	};

	_pCalendar._on_drop_mobile_onclick = function () {
		if (this.readonly || !this.enable) {
			return false;
		}

		if (this._isPopupVisible()) {
			this._closePopup();
		}
		else {
			this._showPopup();
		}

		return false;
	};

	_pCalendar._on_drop_onclick = function () {
	};

	_pCalendar._on_spin_onspinup = function () {
		if (this.readonly) {
			return false;
		}

		var calendaredit = this.calendaredit;
		if (calendaredit) {
			var cur_text = "";

			var pre_text = this._default_text;
			var pre_value = this._default_value;

			var post_text = "";

			var pos = this.getCaretPos();

			var cur_val, maskobj = this._masktypeobj;
			if (maskobj) {
				if (!maskobj.date) {
					var currDate = this._getCurrentDate();
					var year = nexacro._toString(currDate.year).padLeft(4, "0");
					var month = nexacro._toString(currDate.month).padLeft(2, "0");
					var day = nexacro._toString(currDate.day).padLeft(2, "0");
					var type = maskobj.getEditFormatType();
					switch (type) {
						case 0:
							cur_val = year + month + day;
							break;
						case 1:
							cur_val = "000000000";
							break;
						case 2:
							cur_val = year + month + day + "000000000";
					}

					cur_text = maskobj.applyMask(cur_val);
					this._setSpinValue(cur_val, cur_text, pos);
				}
				else {
					cur_text = maskobj.applyMaskSpin(pos, 1);
					cur_val = maskobj.removeMask();
					cur_val = maskobj.changeNormalizeValue(cur_val);

					pre_text = this._getEventInfoText(pre_value);
					post_text = this._getEventInfoText(cur_val);

					if (!this.on_fire_onspin(this, pre_text, pre_value, post_text, cur_val, true)) {
						cur_text = this._default_text;
						cur_val = this._default_value;
					}

					maskobj.applyMask(cur_val);
					this._setSpinValue(cur_val, cur_text, pos);
				}
			}
		}
	};

	_pCalendar._on_spin_onspindown = function () {
		if (this.readonly) {
			return false;
		}

		var calendaredit = this.calendaredit;
		if (calendaredit) {
			var cur_text = "";

			var pre_text = this._default_text;
			var pre_value = this._default_value;

			var post_text = "";

			var pos = this.getCaretPos();

			var cur_val, maskobj = this._masktypeobj;
			if (maskobj) {
				if (!maskobj.date) {
					var currDate = this._getCurrentDate();
					var year = nexacro._toString(currDate.year).padLeft(4, "0");
					var month = nexacro._toString(currDate.month).padLeft(2, "0");
					var day = nexacro._toString(currDate.day).padLeft(2, "0");
					var type = maskobj.getEditFormatType();
					switch (type) {
						case 0:
							cur_val = year + month + day;
							break;
						case 1:
							cur_val = "000000000";
							break;
						case 2:
							cur_val = year + month + day + "000000000";
					}

					cur_text = maskobj.applyMask(cur_val);
					this._setSpinValue(cur_val, cur_text, pos);
				}
				else {
					cur_text = maskobj.applyMaskSpin(pos, -1);
					cur_val = maskobj.removeMask();

					pre_text = this._getEventInfoText(pre_value);
					post_text = this._getEventInfoText(cur_val);

					if (!this.on_fire_onspin(this, pre_text, pre_value, post_text, cur_val, true)) {
						cur_text = this._default_text;
						cur_val = this._default_value;
					}

					maskobj.applyMask(cur_val);
					this._setSpinValue(cur_val, cur_text, pos);
				}
			}
		}
	};

	_pCalendar._on_spin_mobile_onspinup = function () {
		if (this.readonly) {
			return false;
		}

		var calendaredit = this.calendaredit;
		if (calendaredit) {
			var cur_text = "";

			var pre_text = this._default_text;
			var pre_value = this._default_value;

			var post_text = "";

			var input_elem = calendaredit._input_element;
			var pos = this.getCaretPos();

			var cur_val, maskobj = this._masktypeobj;
			if (maskobj) {
				if (!maskobj.date) {
					var currDate = this._getCurrentDate();
					var year = nexacro._toString(currDate.year).padLeft(4, "0");
					var month = nexacro._toString(currDate.month).padLeft(2, "0");
					var day = nexacro._toString(currDate.day).padLeft(2, "0");
					var type = maskobj.getEditFormatType();
					switch (type) {
						case 0:
							cur_val = year + month + day;
							break;
						case 1:
							cur_val = "000000000";
							break;
						case 2:
							cur_val = year + month + day + "000000000";
					}

					cur_text = maskobj.applyMask(cur_val);
					this._setSpinValue(cur_val, cur_text, pos);
				}
				else {
					cur_text = maskobj.applyMaskSpin(pos, 1);
					cur_val = maskobj.removeMask();
					cur_val = maskobj.changeNormalizeValue(cur_val);

					pre_text = this._getEventInfoText(pre_value);
					post_text = this._getEventInfoText(cur_val);

					if (!this.on_fire_onspin(this, pre_text, pre_value, post_text, cur_val, true)) {
						cur_text = this._default_text;
						cur_val = this._default_value;
					}

					maskobj.applyMask(cur_val);
					this._setSpinValue(cur_val, cur_text, pos);
				}
			}
		}
	};

	_pCalendar._on_spin_mobile_onspindown = function () {
		if (this.readonly) {
			return false;
		}

		var calendaredit = this.calendaredit;
		if (calendaredit) {
			var cur_text = "";

			var pre_text = this._default_text;
			var pre_value = this._default_value;

			var post_text = "";

			var input_elem = calendaredit._input_element;
			var pos = this.getCaretPos();

			var cur_val, maskobj = this._masktypeobj;
			if (maskobj) {
				if (!maskobj.date) {
					var currDate = this._getCurrentDate();
					var year = nexacro._toString(currDate.year).padLeft(4, "0");
					var month = nexacro._toString(currDate.month).padLeft(2, "0");
					var day = nexacro._toString(currDate.day).padLeft(2, "0");
					var type = maskobj.getEditFormatType();
					switch (type) {
						case 0:
							cur_val = year + month + day;
							break;
						case 1:
							cur_val = "000000000";
							break;
						case 2:
							cur_val = year + month + day + "000000000";
					}

					cur_text = maskobj.applyMask(cur_val);
					this._setSpinValue(cur_val, cur_text, pos);
				}
				else {
					cur_text = maskobj.applyMaskSpin(pos, -1);
					cur_val = maskobj.removeMask();

					pre_text = this._getEventInfoText(pre_value);
					post_text = this._getEventInfoText(cur_val);

					if (!this.on_fire_onspin(this, pre_text, pre_value, post_text, cur_val, true)) {
						cur_text = this._default_text;
						cur_val = this._default_value;
					}

					maskobj.applyMask(cur_val);
					this._setSpinValue(cur_val, cur_text, pos);
				}
			}
		}
	};

	_pCalendar._on_datepicker_ondayclick = function (obj, e) {
		if (this.readonly) {
			return;
		}
		var ret = true;
		var maskobj = this._masktypeobj;

		var from_comp = e.fromobject;
		var cur_date = from_comp._year + from_comp._month + from_comp.text.padLeft(2, "0");

		var h = maskobj._date[3] ? maskobj._date[3] : "";
		var m = maskobj._date[4] ? maskobj._date[4] : "";
		var s = maskobj._date[5] ? maskobj._date[5] : "";
		var ss = maskobj._date[6] ? maskobj._date[6] : "";

		var pre_value = this.value;
		var cur_value = maskobj.changeNormalizeValue(cur_date + h + m + s + ss);

		this.on_fire_ondayclick(cur_date);

		if (pre_value != cur_value) {
			ret = this._on_value_change(pre_value, cur_value);
		}

		if (ret && this._isPopupVisible()) {
			this._closePopup();
		}

		if (this.autoskip) {
			this._setFocusToNextComponent();
		}
		else {
			this._setDefaultCaret();
		}
	};

	_pCalendar._on_datepicker_oncloseup = function () {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
		}

		this._changeStatus("mouseover", false);
		this.calendaredit._changeStatus("mouseover", false);
		this.dropbutton._changeStatus("mouseover", false);

		this.on_fire_oncloseup(this, this._default_text, this._default_value, this.text, this.value);
	};

	_pCalendar.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		this._changeStatus("focused", true);

		if (nexacro._enableaccessibility && this.type == "monthonly") {
			this.datepicker.body._on_focus(false);
		}

		if (!(refer_new_focus instanceof nexacro._CalendarEditControl)) {
			var calendaredit = this.calendaredit;
			if (calendaredit) {
				calendaredit._on_focus(true, evt_name);

				if (!this.autoselect) {
					this._setDefaultCaret();
				}
			}
		}
	};

	_pCalendar.on_killfocus_basic_action = function () {
		var calendaredit = this.calendaredit;
		var datepicker = this.datepicker;

		if (this.type != "monthonly") {
			if (this.value != calendaredit.value) {
				this._on_value_change(this.value, calendaredit.value);
			}
			else if (this.text != calendaredit.text) {
				this._setValue(this.value);
			}
		}
		else {
			if (datepicker) {
				datepicker._refreshSpindate();
			}

			this.on_apply_value(this.value);
		}

		if (this._isPopupVisible()) {
			this._closePopup();
		}
	};

	_pCalendar.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.Component.prototype.on_fire_user_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		return (this._popupcontrol && this._popupcontrol._is_popup()) ? true : false;
	};

	_pCalendar.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

		this._updatePopupControlPosition();

		return ret;
	};

	_pCalendar.on_fire_sys_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onfling.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);

		this._updatePopupControlPosition();

		return ret;
	};

	_pCalendar.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.visible && this._isEnable() && this.enableevent) {
			if (this.oneditclick && this.oneditclick._has_handlers) {
				var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp);
				return this.oneditclick._fireEvent(this, evt);
			}
		}

		return true;
	};

	_pCalendar.on_fire_ondayclick = function (postdate) {
		if (this.ondayclick && this.ondayclick._has_handlers) {
			var evt = new nexacro.CalendarDayClickEventInfo(this, "ondayclick", postdate);
			return this.ondayclick._fireEvent(this, evt);
		}

		return true;
	};

	_pCalendar.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(this, "canchange", pretext, prevalue, posttext, postvalue);
			return this.canchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pCalendar.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangedEventInfo(this, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
	};

	_pCalendar.on_fire_oncloseup = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var evt = new nexacro.CalendarCloseUpEventInfo(this, "oncloseup", pretext, posttext, prevalue, postvalue);
			return this.oncloseup._fireEvent(this, evt);
		}

		return false;
	};

	_pCalendar.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var evt = new nexacro.Event(this, "ondropdown");
			evt.fromreferenceobject = this.dropbutton;
			return this.ondropdown._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pCalendar.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.InputEventInfo(this, "oninput");
			return this.oninput._fireEvent(this, evt);
		}

		return true;
	};

	_pCalendar.on_fire_onspin = function (obj, pretext, prevalue, posttext, postvalue, isUp) {
		if (this.onspin && this.onspin._has_handlers) {
			var evt = new nexacro.CalendarSpinEventInfo(this, "onspin", pretext, posttext, prevalue, postvalue, isUp);
			return this.onspin._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pCalendar.on_fire_oninnerdatachanged = function (obj, oldvalue, newvalue, columnid, col, row) {
		if (this.oninnerdatachanged && this.oninnerdatachanged._has_handlers) {
			var evt = new nexacro.InnerdataChangedEventInfo(obj, "oninnerdatachanged", oldvalue, newvalue, columnid, col, row);
			return this.oninnerdatachanged._fireEvent(this, evt);
		}

		return true;
	};

	_pCalendar._createCalendaredit = function () {
		var calendaredit = this.calendaredit;
		if (!calendaredit) {
			calendaredit = this.calendaredit = new nexacro._CalendarEditControl("calendaredit", 0, 0, 0, 0, null, null, null, null, null, null, this, this._onlydisplay);
			calendaredit.set_displaynulltext(this.displaynulltext);
			calendaredit.set_readonly(this.readonly);
			calendaredit.set_autoselect(this.autoselect);
			calendaredit.set_autoskip(this.autoskip);
			calendaredit.set_usecontextmenu(this.usecontextmenu);

			calendaredit.createComponent(true);
		}
	};

	_pCalendar._createDropbutton = function () {
		var dropbutton = this.dropbutton;
		if (!dropbutton) {
			dropbutton = this.dropbutton = new nexacro._CalendarDropButtonControl("dropbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			dropbutton.createComponent(true);
		}
	};

	_pCalendar._createSpinbutton = function () {
		var spinupbutton = this.calendarspinupbutton;
		if (!spinupbutton) {
			spinupbutton = this.calendarspinupbutton = new nexacro._CalendarSpinButtonControl("calendarspinupbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			spinupbutton.createComponent(true);
		}
		var spindownbutton = this.calendarspindownbutton;
		if (!spindownbutton) {
			spindownbutton = this.calendarspindownbutton = new nexacro._CalendarSpinButtonControl("calendarspindownbutton", 0, 0, 0, 0, null, null, null, null, null, null, this);
			spindownbutton.createComponent(true);
		}
	};

	_pCalendar._createDatePicker = function () {
		var datepicker = this.datepicker;
		if (!datepicker) {
			datepicker = this.datepicker = new nexacro.DatePickerControl("datepicker", 0, 0, 0, 0, null, null, null, null, null, null, this);
			if (this.type == "monthonly") {
				datepicker._is_focus_accept = true;
			}
			else {
				datepicker._setPopupContains(true);
				datepicker._is_focus_accept = false;
			}

			datepicker.createComponent(true);
		}
	};

	_pCalendar._createPopupControl = function () {
		var popupcontrol = this._popupcontrol;
		if (!popupcontrol) {
			popupcontrol = this._popupcontrol = new nexacro._CalendarPopupControl("calendarpopup", 0, 0, 0, 0, null, null, null, null, null, null, this);
			popupcontrol.createComponent(true);
		}
	};

	_pCalendar._createNormaltypeControl = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createCalendaredit();
			this._createDropbutton();
			this._createPopupControl();
			this._createDatePicker();
			this._setEventHandlerToCalendarEdit();
			this._setEventHandlerToDropButton();
			this._setEventHandlerToDatePicker();
			this._applyAllProps();

			if (this._is_created) {
				var calendaredit = this.calendaredit;
				var dropbutton = this.dropbutton;

				if (calendaredit) {
					calendaredit.on_created();
				}

				if (dropbutton) {
					dropbutton.on_created();
				}
			}
		}
	};

	_pCalendar._createSpintypeControl = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createCalendaredit();
			this._createSpinbutton();
			this._setEventHandlerToCalendarEdit();
			this._setEventHandlerToSpinButton();
			this._applyAllProps();

			if (this._is_created) {
				var calendaredit = this.calendaredit;
				var spinupbutton = this.calendarspinupbutton;
				var spindownbutton = this.calendarspindownbutton;

				if (calendaredit) {
					calendaredit.on_created();
				}
				if (spinupbutton) {
					spinupbutton.on_created();
				}
				if (spindownbutton) {
					spindownbutton.on_created();
				}
			}
		}
	};

	_pCalendar._createMonthlytypeControl = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createDatePicker();
			this._setEventHandlerToDatePicker();
			this._applyDatePickerProps();

			if (this._is_created) {
				var datepicker = this.datepicker;
				if (datepicker) {
					datepicker.on_created();
				}
			}
		}
	};

	_pCalendar._createSystemtypeControl = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createCalendaredit();
			this._setEventHandlerToCalendarEdit();
			this._applyAllProps();

			if (this._is_created) {
				var calendaredit = this.calendaredit;

				if (calendaredit) {
					calendaredit._on_apply_inputtype();

					calendaredit.on_created();
				}
			}
		}
	};

	_pCalendar._createPopupDatePickerControl = function () {
		this._createPopupControl();
		this._createDatePicker();

		var datepicker = this.datepicker;
		var popupcontrol = this._popupcontrol;
		if (!popupcontrol._is_created) {
			popupcontrol._attach(datepicker);
			popupcontrol.on_created();
		}
		if (!datepicker._is_created) {
			this._setEventHandlerToDatePicker();
			this._applyDatePickerProps();
			datepicker.on_created();
		}
	};

	_pCalendar._destroyControl = function () {
		if (this.calendaredit) {
			this.calendaredit.destroy();
			this.calendaredit = null;
		}
		if (this.dropbutton) {
			this.dropbutton.destroy();
			this.dropbutton = null;
		}
		if (this.calendarspinupbutton) {
			this.calendarspinupbutton.destroy();
			this.calendarspinupbutton = null;
		}
		if (this.calendarspindownbutton) {
			this.calendarspindownbutton.destroy();
			this.calendarspindownbutton = null;
		}
		if (this.datepicker) {
			this.datepicker.destroy();
			this.datepicker = null;
		}
		if (this._popupcontrol) {
			this._popupcontrol.destroy();
			this._popupcontrol = null;
		}
	};

	_pCalendar._recalcLayout = function () {
		if (this._is_created_contents) {
			var calendaredit = this.calendaredit;
			var dropbutton = this.dropbutton;
			var spinupbutton = this.calendarspinupbutton;
			var spindownbutton = this.calendarspindownbutton;
			var datepicker = this.datepicker;

			var client_width = this._getClientWidth();
			var client_height = this._getClientHeight();

			var buttonsize = this.buttonsize;
			var buttonsize_w, buttonsize_h;

			if (buttonsize == undefined) {
				buttonsize_w = client_height;
				buttonsize_h = client_height;
			}
			else {
				buttonsize = buttonsize.split(" ");
				buttonsize_w = +buttonsize[0];
				buttonsize_h = (buttonsize[1]) ? +buttonsize[1] : client_height;
			}

			if (buttonsize_w > client_width) {
				buttonsize_w = client_width;
			}
			if (buttonsize_h > client_height) {
				buttonsize_h = client_height;
			}

			switch (this._type) {
				case "normal":
					var button_l = client_width - buttonsize_w;
					var button_t = 0;

					if (buttonsize_h < client_height) {
						button_t = (client_height - buttonsize_h) / 2;
					}

					dropbutton.move(button_l, button_t, buttonsize_w, buttonsize_h, null, null);
					calendaredit.move(0, 0, button_l, client_height, null, null);

					calendaredit.set_visible(true);
					dropbutton.set_visible(true);
					break;
				case "spin":
					var upbutton_l = client_width - buttonsize_w;
					var upbutton_t = 0;
					var upbutton_h = Math.floor(buttonsize_h / 2);

					if (buttonsize_h < client_height) {
						upbutton_t = (client_height - buttonsize_h) / 2;
					}

					var downbutton_l = upbutton_l;
					var downbutton_t = buttonsize_h - upbutton_h + upbutton_t;
					var downbutton_h = Math.floor(buttonsize_h / 2);

					spinupbutton.move(upbutton_l, upbutton_t, buttonsize_w, upbutton_h, null, null);
					spindownbutton.move(downbutton_l, downbutton_t, buttonsize_w, downbutton_h, null, null);
					calendaredit.move(0, 0, upbutton_l, client_height, null, null);

					calendaredit.set_visible(true);
					spinupbutton.set_visible(true);
					spindownbutton.set_visible(true);
					break;
				case "monthonly":
					this._applyDatePickerProps();
					datepicker.move(0, 0, client_width, client_height, null, null);
					datepicker.set_visible(true);
					break;
				case "system":
					this.calendaredit.move(0, 0, client_width, client_height, null, null);
					this.calendaredit.set_visible(true);
					break;
			}
		}
	};

	_pCalendar._updatePopupControlPosition = function () {
		var popupcontrol = this._popupcontrol;
		if (popupcontrol) {
			var control_elem = this.getElement();
			var popup_control_elem = popupcontrol.getElement();

			var pos = this._getElementPosition(control_elem);

			var scale = this._getCumulativeZoomFactor() / 100.0;
			var left = pos.x;
			var top = pos.y + (this._adjust_height * scale);

			popup_control_elem.setElementPosition(left, top);
		}
	};

	_pCalendar._showPopup = function () {
		if (this.type != "normal") {
			return;
		}

		if (nexacro._enableaccessibility) {
			this._want_arrows = true;
		}

		var _window = this._getWindow();
		var control_elem = this.getElement();
		if (control_elem) {
			var ret = this.on_fire_ondropdown(this);

			if (this.popuptype == "none" || this._type == "system") {
				return;
			}

			if (ret) {
				this._createPopupDatePickerControl();

				var popupsize = this._getPopupSizeArr();

				var pos = this._getElementPosition();
				var scale = this._getCumulativeZoomFactor() / 100.0;

				var cal_winpos_left = pos.x;
				var cal_winpos_top = pos.y;
				var cal_height = this.getOffsetHeight() * scale;

				var popup_left = 0;
				var popup_top = cal_height;
				var popup_width = popupsize.width * scale;
				var popup_height = popupsize.height * scale;

				var popup_winpos_right = cal_winpos_left + popup_width;
				var popup_winpos_bottom = cal_winpos_top + cal_height + popup_height;

				var win_width = _window.clientWidth;
				var win_height = _window.clientHeight;
				var width_gap = popup_winpos_right - win_width;

				if (popup_winpos_right > win_width && cal_winpos_left > width_gap) {
					popup_left = popup_left - width_gap;
				}

				if (cal_winpos_left < 0) {
					popup_left = -cal_winpos_left;
				}

				if (cal_winpos_top > popup_height && popup_winpos_bottom > win_height) {
					popup_top = -popup_height;
				}

				var popupcontrol = this._popupcontrol;
				var popup_elem = popupcontrol.getElement();
				if (popup_elem.setElementZoom) {
					popup_elem.setElementZoom(scale * 100);
				}

				if (this.popuptype == "center") {
					var frame = _window.frame;
					var frame_pos = nexacro._getElementPositionInFrame(frame.getElement());
					var l = ((frame.width / 2) - (popup_width / 2));
					var t = ((frame.height / 2) - (popup_height / 2));

					t = t < 0 ? 0 : t;

					popupcontrol._popup((l + frame_pos.x), (t + frame_pos.y), popup_width, popup_height);
				}
				else {
					popupcontrol._popupBy(this, popup_left, popup_top, popup_width, popup_height);
				}

				if (_window && this._track_capture) {
					_window._setCaptureLock(this, true, false);
				}
			}
		}
	};

	_pCalendar._applyZoomPopup = function () {
		if (this._isPopupVisible()) {
			this._showPopup();
		}
	};

	_pCalendar._closePopup = function () {
		if (this._type == "system") {
			nexacro._closeSystemCalendar();
			return;
		}
		else {
			var popupcontrol = this._popupcontrol;
			if (popupcontrol) {
				popupcontrol._closePopup();
			}
		}

		if (nexacro._enableaccessibility) {
			var type = this.type;
			this._want_arrows = false;
			if (type == "normal") {
				var _window = this._getWindow();
				_window._removeFromCurrentFocusPath(this.calendaredit, true);
				this.calendaredit._on_focus(true);
			}
		}
	};

	_pCalendar._setValue = function (v) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			v = maskobj.changeNormalizeValue(v);

			this.value = v;

			this.on_apply_value(this.value);
		}
	};

	_pCalendar._setSpinValue = function (value, text, pos) {
		this._default_value = value;
		this.text = this._default_text = text;

		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit._setSpinValue(text, pos);
		}
	};

	_pCalendar._setLocale = function (v) {
		if (!this.locale && v != this._locale) {
			this._locale = v;
			this.on_apply_locale(v);
			this.on_apply_weekformat(this.weekformat);
			this.on_apply_value(this.value);
		}
	};

	_pCalendar._setInnerDatasetStr = function (str) {
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

	_pCalendar._setDefaultCaret = function () {
		var edit = this.calendaredit;
		if (edit && this._type != "system" && nexacro._checkActiveElement(edit._input_element)) {
			this.setCaretPos(0);
		}
	};

	_pCalendar._setFocusToNextComponent = function () {
		var root_comp = this._getRootComponent(this);
		var next_comp = this._getForm().getNextComponent(root_comp, true);
		if (next_comp) {
			next_comp.setFocus();
			if (next_comp._is_editable_control) {
				next_comp._setDefaultCaret();
			}
		}
	};

	_pCalendar._setEventHandlerToCalendarEdit = function () {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit._setEventHandler("onkeydown", this._on_edit_onkeydown, this);
			calendaredit._setEventHandler("onlbuttondown", this._on_edit_onlbuttondown, this);
			calendaredit._setEventHandler("onlbuttonup", this._on_edit_onlbuttonup, this);
			calendaredit._setEventHandler("oneditclick", this._on_edit_oneditclick, this);
			calendaredit._setEventHandler("oninput", this._on_edit_oninput, this);
		}
	};

	_pCalendar._setEventHandlerToDropButton = function () {
		var dropbutton = this.dropbutton;
		if (dropbutton) {
			var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);

			if (bMobile) {
				dropbutton._setEventHandler("onclick", this._on_drop_mobile_onclick, this);
			}
			else {
				dropbutton._setEventHandler("onclick", this._on_drop_onclick, this);
				dropbutton._setEventHandler("onlbuttondown", this._on_drop_onlbuttondown, this);
			}
		}
	};

	_pCalendar._setEventHandlerToSpinButton = function () {
		var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);

		var spinupbutton = this.calendarspinupbutton;
		if (spinupbutton) {
			if (bMobile) {
				spinupbutton._setEventHandler("onclick", this._on_spin_mobile_onspinup, this);
			}
			else {
				spinupbutton._setEventHandler("onclick", this._on_spin_onspinup, this);
			}
		}


		var spindownbutton = this.calendarspindownbutton;
		if (spindownbutton) {
			if (bMobile) {
				spindownbutton._setEventHandler("onclick", this._on_spin_mobile_onspindown, this);
			}
			else {
				spindownbutton._setEventHandler("onclick", this._on_spin_onspindown, this);
			}
		}
	};

	_pCalendar._setEventHandlerToDatePicker = function () {
		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._setEventHandler("ondayclick", this._on_datepicker_ondayclick, this);
			datepicker._setEventHandler("oncloseup", this._on_datepicker_oncloseup, this);
		}
	};

	_pCalendar._getDateMaskObj = function () {
		return this._masktypeobj;
	};

	_pCalendar._getFormatType = function () {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			return maskobj.getEditFormatType();
		}

		return;
	};

	_pCalendar._getCurrentDate = function () {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			return maskobj.getCurrentDate();
		}

		return;
	};

	_pCalendar._getCurrentDateStr = function () {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			var currDate = maskobj.getCurrentDate();
			if (currDate) {
				var year = nexacro._toString(currDate.year).padLeft(4, "0");
				var month = nexacro._toString(currDate.month).padLeft(2, "0");
				var day = nexacro._toString(currDate.day).padLeft(2, "0");
				var type = maskobj.getEditFormatType();
				var val = "";
				switch (type) {
					case 0:
						val = year + month + day;
						break;
					case 1:
						val = "000000000";
						break;
					case 2:
						val = year + month + day + "000000000";
				}
				return maskobj.applyMask(val);
			}
		}

		return "";
	};

	_pCalendar._getEndDay = function (y, m) {
		var maskobj = this._masktypeobj;
		if (maskobj) {
			return maskobj.getEndDay(y, m);
		}

		return;
	};

	_pCalendar._getPopupSizeArr = function () {
		var size = this.popupsize;
		if (!size) {
			size = "200 220";
		}

		size = size.split(/\s+/);

		var width = +size[0];
		var height = size[1] ? +size[1] : width;

		return {
			width : width, 
			height : height
		};
	};

	_pCalendar._getElementPosition = function () {
		return nexacro._getElementPositionInFrame(this.getElement());
	};

	_pCalendar._getEventInfoText = function (v) {
		var ret = "";
		var maskobj = this._masktypeobj;
		if (maskobj) {
			var cur_status = maskobj.getEditStatus();

			maskobj.setEditStatus(false);
			ret = maskobj.applyMask(v);
			maskobj.setEditStatus(cur_status);
		}

		return ret;
	};

	_pCalendar._isPopupVisible = function () {
		var ret = false;
		if (this.type != "monthonly") {
			if (this._popupcontrol) {
				ret = this._popupcontrol.visible;
			}
		}
		return ret;
	};

	_pCalendar._applyAllProps = function () {
		this.on_apply_innerdataset(this._innerdataset);
		this.on_apply_locale(this._getLocale());
		this.on_apply_weekformat(this.weekformat);
		this.on_apply_readonly(this.readonly);

		this.on_apply_editformat(this.editformat);
		this.on_apply_dateformat(this.dateformat);
		this.on_apply_value(this.value);
	};

	_pCalendar._applyDatePickerProps = function () {
		var maskobj = this._masktypeobj;

		var datepicker = this.datepicker;
		if (datepicker) {
			datepicker._setEnable(this.enable);
			datepicker.set_readonly(this.readonly);

			datepicker._setValue(maskobj.getDatePickerValue());
		}
	};

	_pCalendar._makeCalendarText = function (value) {
		if (!value) {
			return "";
		}

		var val_str = value.toString();
		var oldformat = this._currentformat;
		this._currentformat = "dateformat";

		var date = this._makeMaskValue(val_str);
		var mask = this._makeMask("dateformat", this._makeDateObj(value));
		var txt_idx = 0;
		var return_txt = "";
		var matchStr = "yMdHhmsl";


		this._currentformat = oldformat;

		for (var i = 0, n = mask.length; i < n; i++) {
			var mask_ch = mask.charAt(i);

			if (matchStr.indexOf(mask_ch) >= 0) {
				return_txt += date.charAt(txt_idx);
				txt_idx++;
			}
			else {
				if (mask_ch === "~" || mask_ch === "^") {
					return_txt += date.charAt(txt_idx);
					txt_idx++;
				}
				else {
					return_txt += mask_ch;
				}
			}
		}
		return return_txt;
	};

	delete _pCalendar;

	nexacro._CalendarDropButtonControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pCalendarDropButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._CalendarDropButtonControl);
	nexacro._CalendarDropButtonControl.prototype = _pCalendarDropButtonControl;
	_pCalendarDropButtonControl._type_name = "ButtonControl";
	_pCalendarDropButtonControl._is_subcontrol = true;

	_pCalendarDropButtonControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var calendar = this.parent;
		if (calendar) {
			var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);
			if (bMobile) {
				nexacro.Component.prototype.on_focus_basic_action.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			}
			else {
				calendar._apply_setfocus(evt_name);
			}
		}
	};

	delete _pCalendarDropButtonControl;

	nexacro._CalendarSpinButtonControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pCalendarSpinButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._CalendarSpinButtonControl);
	nexacro._CalendarSpinButtonControl.prototype = _pCalendarSpinButtonControl;
	_pCalendarSpinButtonControl._type_name = "ButtonControl";
	_pCalendarSpinButtonControl._is_subcontrol = true;

	_pCalendarSpinButtonControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var calendar = this.parent;
		if (calendar) {
			calendar._apply_setfocus(evt_name);
		}
	};

	delete _pCalendarSpinButtonControl;

	nexacro._CalendarEditControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay) {
		nexacro.MaskEdit.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, onlydisplay);
	};

	var _pCalendarEditControl = nexacro._createPrototype(nexacro.MaskEdit, nexacro._CalendarEditControl);
	nexacro._CalendarEditControl.prototype = _pCalendarEditControl;
	_pCalendarEditControl._type_name = "MaskEditControl";
	_pCalendarEditControl._is_subcontrol = true;

	_pCalendarEditControl.on_created_contents = function (win) {
		var input_elem = this._input_element;
		if (input_elem) {
			this.on_apply_value(this.value);

			input_elem.create(win);

			if (nexacro._isNull(this.value)) {
				this._changeUserStatus("nulltext", true);
			}
			else {
				this._changeUserStatus("nulltext", false);
			}
		}
	};

	_pCalendarEditControl.on_create_contents_command = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			this.on_apply_value(this.value);

			return input_elem.createCommand();
		}

		return "";
	};


	_pCalendarEditControl.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp) {
		if (this.readonly || !this._isEnable()) {
			return;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			var maskobj = this._getMaskObj();

			var input_value = input_elem.value;
			var pos = input_elem.getElementCaretPos();
			var idx, ch;

			if (keycode == nexacro.KeyCode_ImeInput) {
				input_elem.stopSysEvent();
			}
			else if (keycode == nexacro.Event.KEY_BACKSPACE) {
				if (maskobj && input_value) {
					if (pos.end > 0 && pos.begin == pos.end) {
						idx = pos.end - 1;
						while ((ch = input_value.charAt(idx))) {
							if (maskobj.isDeletableChar(ch, idx) || idx == 0) {
								break;
							}
							idx--;
						}

						maskobj._is_filled = false;

						if (idx != (pos.end - 1)) {
							input_elem.setElementSetSelect(idx + 1, idx + 1);
						}
					}
				}
			}
			else if (keycode == nexacro.Event.KEY_DEL) {
				if (maskobj && input_value) {
					var len = input_value.length;
					if (pos.end < len && pos.begin == pos.end) {
						idx = pos.end;
						while ((ch = input_value.charAt(idx))) {
							if (maskobj.isDeletableChar(ch, idx) || idx == len) {
								break;
							}
							idx++;
						}

						maskobj._is_filled = false;

						if (idx != pos.end) {
							input_elem.setElementSetSelect(idx, idx);
						}
					}
				}
			}
		}
	};

	_pCalendarEditControl.on_keyinput_basic_action = function () {
		if (this.readonly || !this._isEnable()) {
			return false;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			var input_value = input_elem.value;
			var input_text = input_value ? input_value : "";

			var pos = input_elem.getElementCaretPos();
			var maskobj = this._getMaskObj();
			if (maskobj) {
				if (maskobj._editmasked_empty_text == input_text) {
					input_value = "";
				}
				else {
					input_value = maskobj.removeMask(input_text.split(''));
					input_value = maskobj.changeNormalizeValue(input_value);
				}
			}

			if (!input_value && !this._default_value) {
				this.value = this._default_value;
			}
			else {
				this.value = input_value;
			}
			this.text = input_text;

			var undostack = this._undostack;
			if (undostack) {
				this._undostack.push(input_text, pos ? pos.begin : 0, pos ? pos.end : 0);
			}
		}
	};

	_pCalendarEditControl._beforeinput_process_with_HTMLEvent = function (value, status, begin, end, inputType) {
		var input_elem = this._input_element;
		var maskobj = this._getMaskObj();
		var ret = [];
		if (maskobj) {
			var input_value = input_elem._getInputValue();
			var front_text, rear_text, update_value, result;

			switch (inputType) {
				case "deleteContentBackward":
					if (begin == end) {
						front_text = input_value.substring(0, begin - 1);
						rear_text = input_value.substring(end);

						update_value = front_text + rear_text;
						result = maskobj.arrangeMask(update_value, begin - 1, begin - 1);

						input_elem._beforeinput_result_data = result.text;
						input_elem._beforeinput_result_pos = {
							begin : result.pos, 
							end : result.pos
						};
					}
					else {
						front_text = input_value.substring(0, begin);
						rear_text = input_value.substring(end);

						update_value = front_text + rear_text;
						if ((end - begin == input_value.length)) {
							input_elem._beforeinput_result_data = maskobj.applyMask(update_value);
							input_elem._beforeinput_result_pos = {
								begin : begin, 
								end : begin
							};
						}
						else {
							result = maskobj.arrangeMask(update_value, begin, begin);

							input_elem._beforeinput_result_data = result.text;
							input_elem._beforeinput_result_pos = {
								begin : result.pos, 
								end : result.pos
							};
						}
					}

					ret.push(input_elem._BeforeinputState.REPLACE);
					break;
				case "deleteContentForward":
					if (begin == end) {
						front_text = input_value.substring(0, begin);
						rear_text = input_value.substring(end + 1);

						update_value = front_text + rear_text;
						result = maskobj.arrangeMask(update_value, begin, begin);

						input_elem._beforeinput_result_data = result.text;
						input_elem._beforeinput_result_pos = {
							begin : result.pos, 
							end : result.pos
						};
					}
					else {
						front_text = input_value.substring(0, begin);
						rear_text = input_value.substring(end);

						update_value = front_text + rear_text;
						if ((end - begin == input_value.length)) {
							input_elem._beforeinput_result_data = maskobj.applyMask(update_value);
							input_elem._beforeinput_result_pos = {
								begin : begin, 
								end : begin
							};
						}
						else {
							result = maskobj.arrangeMask(update_value, begin, begin);

							input_elem._beforeinput_result_data = result.text;
							input_elem._beforeinput_result_pos = {
								begin : result.pos, 
								end : result.pos
							};
						}
					}

					ret.push(input_elem._BeforeinputState.REPLACE);
					break;
				case "deleteByCut":
					if (begin == end) {
						input_elem._beforeinput_result_data = result.text;
						input_elem._beforeinput_result_pos = {
							begin : result.pos, 
							end : result.pos
						};
					}
					else {
						front_text = input_value.substring(0, begin);
						rear_text = input_value.substring(end);

						update_value = front_text + rear_text;
						if ((end - begin == input_value.length)) {
							input_elem._beforeinput_result_data = maskobj.applyMask(update_value);
							input_elem._beforeinput_result_pos = {
								begin : begin, 
								end : begin
							};
						}
						else {
							result = maskobj.arrangeMask(update_value, begin, begin);

							input_elem._beforeinput_result_data = result.text;
							input_elem._beforeinput_result_pos = {
								begin : result.pos, 
								end : result.pos
							};
						}
					}

					ret.push(input_elem._BeforeinputState.REPLACE);
					break;
				case "insertText":
				case "insertCompositionText":
					value = value ? value : "";
					var input_pos = maskobj.findNearEditablePos(begin, 1);
					if (input_pos < 0 || maskobj.isFilterChar(value, input_pos)) {
						ret.push(input_elem._BeforeinputState.CANCEL);
					}
					else {
						if (begin == end) {
							var update_value = input_value.substring(0, begin) + value + input_value.substring(end);
							var result = maskobj.arrangeMask(update_value, begin, end + value.length);
							if (result == null) {
								ret.push(input_elem._BeforeinputState.CANCEL);
							}
							else {
								input_elem._beforeinput_result_data = result.text;
								input_elem._beforeinput_result_pos = {
									begin : result.pos, 
									end : result.pos
								};

								ret.push(input_elem._BeforeinputState.REPLACE);
							}
						}
						else {
							var append_value = value + "".padLeft(end - value.length, " ");
							var update_value = input_value.substring(0, begin) + append_value + input_value.substring(begin);
							var result = maskobj.arrangeMask(update_value, begin, append_value.length);
							if (result == null) {
								ret.push(input_elem._BeforeinputState.CANCEL);
							}
							else {
								input_elem._beforeinput_result_data = result.text;
								input_elem._beforeinput_result_pos = {
									begin : begin + value.length, 
									end : begin + value.length
								};

								ret.push(input_elem._BeforeinputState.REPLACE);
							}
						}
					}
					break;
				case "insertFromPaste":
					var input_pos = maskobj.findNearEditablePos(begin, 1);
					if (input_pos < 0 || maskobj.isFilterChar(value, input_pos)) {
						ret.push(input_elem._BeforeinputState.CANCEL);
					}
					else {
						if (begin == end) {
							var update_value = input_value.substring(0, begin) + value + input_value.substring(end);
							var result = maskobj.arrangeMask(update_value, begin, end + value.length);
							if (result == null) {
								ret.push(input_elem._BeforeinputState.CANCEL);
							}
							else {
								input_elem._beforeinput_result_data = result.text;
								input_elem._beforeinput_result_pos = {
									begin : result.pos, 
									end : result.pos
								};

								ret.push(input_elem._BeforeinputState.REPLACE);
							}
						}
						else {
							var update_value = input_value.substring(0, begin) + (value + "".padLeft(" ", end - value.length)) + input_value.substring(begin);
							var result = maskobj.arrangeMask(update_value, begin, begin + value.length);
							if (result == null) {
								ret.push(input_elem._BeforeinputState.CANCEL);
							}
							else {
								input_elem._beforeinput_result_data = result.text;
								input_elem._beforeinput_result_pos = {
									begin : result.pos, 
									end : result.pos
								};

								ret.push(input_elem._BeforeinputState.REPLACE);
							}
						}
					}
					break;
				default:
					ret.push(input_elem._BeforeinputState.PASS);
					break;
			}
		}

		return ret;
	};

	_pCalendarEditControl._beforeinput_process_with_NexacroInputEvent = function (value, status, begin, end) {
		var input_elem = this._input_element;
		if (input_elem) {
			var input_pos = 0;
			var input_text = value ? value : "";
			var inputtype = input_elem.inputtype;

			var maskobj = this._getMaskObj();
			if (maskobj) {
				if (inputtype == "date") {
					if (maskobj.getCurrentText() != input_text) {
						value = maskobj.removeMask(input_text.split(''));
						maskobj.applyMask(value);
					}
				}
				else {
					var result = maskobj.arrangeMask(input_text, begin, end);
					if (result == null) {
						input_elem.replaceElementText("", begin, end);
						input_elem.stopSysEvent();
						return;
					}

					if (result.text != input_text) {
						input_pos = maskobj.findNearEditablePos(result.pos, 1);
						input_elem.updateElementText(result.text, input_pos);
					}
				}
			}
		}
	};


	_pCalendarEditControl._setSpinValue = function (v, pos) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setCompositionComplete();
			if (!this._onlydisplay) {
				input_elem.updateElementText(v, pos);
			}
			if (nexacro._enableaccessibility) {
				this._setAccessibilityLabel(v);
			}
		}
	};

	_pCalendarEditControl._getMaskObj = function () {
		var calendar = this.parent;
		if (calendar) {
			return calendar._masktypeobj;
		}
		return null;
	};

	_pCalendarEditControl._getEmptyText = function () {
		var maskobj = this._getMaskObj();
		if (maskobj) {
			return maskobj.getEmptyText();
		}

		return "";
	};

	nexacro._CalendarPopupControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.PopupControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pCalendarPopupControl = nexacro._createPrototype(nexacro.PopupControl, nexacro._CalendarPopupControl);
	nexacro._CalendarPopupControl.prototype = _pCalendarPopupControl;
	_pCalendarPopupControl._type_name = "popupCalendar";


	_pCalendarPopupControl._is_subcontrol = true;

	_pCalendarPopupControl._getMainFrame = function () {
		var pThis = this;
		while (pThis && !pThis._is_main) {
			pThis = pThis.parent;
		}

		return pThis;
	};

	delete _pCalendarPopupControl;
}
