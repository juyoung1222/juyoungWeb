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

if (nexacro.DatePickerControl) {
	var _pDatePickerControl = nexacro.DatePickerControl.prototype;












	_pDatePickerControl.createCssDesignContents = function () {
		;
	};

	delete _pDatePickerControl;

	var _pDatePickerHeadControl = nexacro._DatePickerHeadControl.prototype;












	_pDatePickerHeadControl.createCssDesignContents = function () {
		this._setYear("1982");
		this._setMonth("03");
	};

	_pDatePickerHeadControl.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
		this._recalcLayout();
	};

	_pDatePickerHeadControl._getShowyearspin = function () {
		if (this._isPreviewMode()) {
			return true;
		}
		else {
			var datepicker = this.parent;
			if (datepicker) {
				return datepicker._getShowyearspin();
			}
		}

		return false;
	};

	_pDatePickerHeadControl._getShowmonthspin = function () {
		if (this._isPreviewMode()) {
			return true;
		}
		else {
			var datepicker = this.parent;
			if (datepicker) {
				return datepicker._getShowmonthspin();
			}
		}

		return false;
	};

	delete _pDatePickerHeadControl;

	var _pDatePickerBodyControl = nexacro._DatePickerBodyControl.prototype;


	_pDatePickerBodyControl.on_created_contents = function (win) {
		var control_elem = this.getElement();
		if (control_elem) {
			var i = 0;
			var weeks = this._weekitems;
			var days = this._dayitems;
			var maxWeek = this._maxWeek;
			var maxDay = this._maxDay;

			this.weekband.on_created(win);

			for (i = 0; i < maxWeek; i++) {
				if (weeks[i]._cell_elem) {
					weeks[i]._cell_elem.setElementTextAlign("center");
					weeks[i]._cell_elem.setElementVerticalAlign("middle");
				}

				weeks[i].on_created(win);
			}
			for (i = 0; i < maxDay; i++) {
				if (days[i]._cell_elem) {
					days[i]._cell_elem.setElementTextAlign("center");
					days[i]._cell_elem.setElementVerticalAlign("middle");
				}

				days[i]._setEventHandler("onclick", this._on_dayitem_ondayclick, this);
				days[i].on_created(win);
			}
		}
	};

	_pDatePickerBodyControl.on_change_containerRect = function (width, height) {
		this._recalcLayout();
	};









	_pDatePickerBodyControl.createCssDesignContents = function () {
		this._setDate("1982", "03", "15");
	};

	_pDatePickerBodyControl.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
		this._recalcLayout();
		this._refreshDay();
	};

	_pDatePickerBodyControl._getCurrentDate = function () {
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

	delete _pDatePickerBodyControl;

	var _pDatePickerDayItemControl = nexacro._DatePickerDayItemControl.prototype;











	_pDatePickerDayItemControl.createCssDesignContents = function () {
		this.set_text("15");
	};

	delete _pDatePickerDayItemControl;

	var _pDatePickerWeekItemControl = nexacro._DatePickerWeekItemControl.prototype;












	_pDatePickerWeekItemControl.createCssDesignContents = function () {
		this.set_text("S");
	};

	delete _pDatePickerWeekItemControl;
}
;