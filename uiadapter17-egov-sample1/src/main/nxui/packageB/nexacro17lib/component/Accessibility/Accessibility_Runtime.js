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

if (nexacro._Browser == "Runtime") {
	if (nexacro.ControlElement) {
		var _pControlElement = nexacro.ControlElement.prototype;
		_pControlElement.setElementAccessibilityRole = function (role) {
			var accrole = nexacro._roleList[role];
			if (this.accessibilityrole != accrole) {
				this.accessibilityrole = accrole;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityRole(handle, accrole);
				}
			}
		};

		_pControlElement.setElementAccessibilityLabel = function (label) {
			if (this.accessibilitylabel != label) {
				this.accessibilitylabel = label;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityLabel(handle, label);
				}
			}
		};

		_pControlElement.setElementAccessibilityEnable = function (enable) {
			if (this.accessibilityenable != enable) {
				this.accessibilityenable = enable;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityEnable(handle, enable);
				}
			}
		};

		_pControlElement.setElementAccessibilityDescription = function (desc) {
			if (this.accessibilitydescription != desc) {
				this.accessibilitydescription = desc;
				this._updateAccessibilityLabel();
			}
		};



		_pControlElement.setElementAccessibilityDescLevel = function (desclevel) {
			if (this.accessibilitydesclevel != desclevel) {
				this.accessibilitydesclevel = desclevel;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityDescLevel(handle, desclevel);
				}
			}
		};

		_pControlElement.setElementAccessibilityAction = function (action) {
			if (this.accessibilityaction != action) {
				this.accessibilityaction = action;
			}
		};

		_pControlElement.setElementAccessibilityValue = function (value) {
		};

		_pControlElement.setElementAccessibilityStatDisabled = function (disabled) {
			if (this.accessibility_stat_disabled != disabled) {
				this.accessibility_stat_disabled = disabled;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityStatDisabled(handle, disabled);
				}
			}
		};

		_pControlElement.setElementAccessibilityStatHidden = function (hidden) {
			if (this.accessibility_stat_hidden != hidden) {
				this.accessibility_stat_hidden = hidden;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityStatHidden(handle, hidden);
				}
			}
		};

		_pControlElement.setElementAccessibilityStatChecked = function (checked) {
			if (this.accessibility_stat_checked != checked) {
				this.accessibility_stat_checked = checked;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityStatChecked(handle, checked);
				}
			}
		};

		_pControlElement.setElementAccessibilityStatPressed = function (pressed) {
			if (this.accessibility_stat_pressed != pressed) {
				this.accessibility_stat_pressed = pressed;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityStatPressed(handle, pressed);
				}
			}
		};

		_pControlElement.setElementAccessibilityStatSelected = function (selected) {
			if (this.accessibility_stat_selected != selected) {
				this.accessibility_stat_selected = selected;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityStatSelected(handle, selected);
				}
			}
		};

		_pControlElement.setElementAccessibilityStatExpanded = function (expanded) {
			if (this.accessibility_stat_expanded != expanded) {
				this.accessibility_stat_expanded = expanded;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityStatExpanded(handle, expanded);
				}
			}
		};

		_pControlElement.setElementAccessibilityStatAutoComplete = function (autocomplete) {
		};

		_pControlElement.setElementAccessibilityFlagHasPopup = function (haspopup) {
			if (this.accessibility_flag_haspopup != haspopup) {
				this.accessibility_flag_haspopup = haspopup;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityStatHasPopup(handle, haspopup);
				}
			}
		};

		_pControlElement.setElementAccessibilityFlagFocusable = function (focusable) {
			if (this.accessibility_flag_focusable != focusable) {
				this.accessibility_flag_focusable = focusable;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityFlagFocusable(handle, focusable);
				}
			}
		};

		_pControlElement.setElementAccessibilityFlagReadOnly = function (readonly) {
			if (this.accessibility_flag_readonly != readonly) {
				this.accessibility_flag_readonly = readonly;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityFlagReadOnly(handle, readonly);
				}
			}
		};

		_pControlElement.setElementAccessibilityFlagPassword = function (password) {
			if (this.accessibility_flag_password != password) {
				this.accessibility_flag_password = password;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityFlagPassword(handle, password);
				}
			}
		};

		_pControlElement.setElementAccessibilityFlagMultiSelectable = function (multiselectable) {
			if (this.accessibility_flag_multiselectable != multiselectable) {
				this.accessibility_flag_multiselectable = multiselectable;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityFlagMultiSelectable(handle, multiselectable);
				}
			}
		};

		_pControlElement.setElementAccessibilityFlagSelectable = function (selectable) {
			if (this.accessibility_flag_selectable != selectable) {
				this.accessibility_flag_selectable = selectable;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityFlagSelectable(handle, selectable);
				}
			}
		};

		_pControlElement.setElementAccessibilityFlagDefaultButton = function (defaultbutton) {
			if (this.accessibility_flag_defaultbutton != defaultbutton) {
				this.accessibility_flag_defaultbutton = defaultbutton;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityStatDefaultButton(handle, defaultbutton);
				}
			}
		};

		_pControlElement.setElementAccessibilityFlagMultiLine = function (multiline) {
			if (this.accessibility_flag_multiline != multiline) {
				this.accessibility_flag_multiline = multiline;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityFlagMultiLine(handle, multiline);
				}
			}
		};

		_pControlElement.setElementAccessibilityInfoCount = function (count) {
			if (this.accessibility_prop_infocount != count) {
				this.accessibility_prop_infocount = count;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityInfoCount(handle, count);
				}
			}
		};

		_pControlElement.setElementAccessibilityInfoIndex = function (index) {
			if (this.accessibility_prop_infoindex != index) {
				this.accessibility_prop_infoindex = index;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityInfoIndex(handle, index);
				}
			}
		};

		_pControlElement.setElementAccessibilityInfoValueMax = function (valuemax) {
			if (this.accessibility_prop_infovaluemax != valuemax) {
				this.accessibility_prop_infovaluemax = valuemax;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityInfoValueMax(handle, valuemax);
				}
			}
		};

		_pControlElement.setElementAccessibilityInfoValueMin = function (valuemin) {
			if (this.accessibility_prop_infovaluemin != valuemin) {
				this.accessibility_prop_infovaluemin = valuemin;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityInfoValueMin(handle, valuemin);
				}
			}
		};

		_pControlElement.setElementAccessibilityInfoValueCur = function (valuecur) {
			if (this.accessibility_prop_infovaluecur != valuecur) {
				this.accessibility_prop_infovaluecur = valuecur;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityInfoValueCur(handle, valuecur);
				}
			}
		};

		_pControlElement.setElementAccessibilityInfoLevel = function (level) {
			if (this.accessibility_prop_infolevel != level) {
				this.accessibility_prop_infolevel = level;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityInfoLevel(handle, level);
				}
			}
		};

		_pControlElement.setElementAccessibilityHotKey = function (hotkey) {
			if (this.accessibility_prop_hotkey != hotkey) {
				this.accessibility_prop_hotkey = hotkey;
				var handle = this.handle;
				if (handle) {
					nexacro.__setElementHandleAccessibilityHotKey(handle, hotkey);
				}
			}
		};

		_pControlElement.setElementAccessibilityActiveDescendant = function (activedescendant_elem) {
			return;
			this.accessibility_prop_activedescendant = activedescendant_elem.linkedcontrol._unique_id;
			var handle = this.handle;
			if (handle) {
				nexacro.__setElementHandleAccessibilityActiveDescendant(handle, activedescendant_elem.linkedcontrol._unique_id);
			}
		};

		_pControlElement.setElementAccessibilityStatFocus = function (label) {
			var notifyvalue;
			var handle = this.handle;
			if (handle) {
				if (label) {
					notifyvalue = label;
				}
				else {
					var readlabel = this._makeAccessibilityLabelbyReadtype(this);
					this.accessibilityreadlabel = readlabel;
					notifyvalue = readlabel;
				}

				nexacro._notifyAccessibility(handle, notifyvalue, "focus", this);
			}
		};

		_pControlElement.setElementAccessibilityStatKillFocus = function () {
			var handle = this.handle;
			if (handle) {
				nexacro._notifyAccessibility(handle, null, "killfocus", this);
			}
		};

		_pControlElement.notifyAccessibility = function (label, notifyevent) {
			var handle = this.handle;
			if (handle) {
				var readlabel = this._makeAccessibilityLabelbyReadtype(this);
				if (readlabel != this.accessibilityreadlabel) {
					this.accessibilityreadlabel = readlabel;
					nexacro.__setElementHandleAccessibilityLabel(handle, readlabel);
				}
				nexacro._notifyAccessibility(handle, label ? label : this.accessibilityreadlabel, notifyevent ? notifyevent : "notify", this);
			}
		};

		_pControlElement._refreshAccessibilityInfo = function (handle) {
			if (nexacro._enableaccessibility) {
				if (this.accessibilityrole) {
					nexacro.__setElementHandleAccessibilityRole(handle, this.accessibilityrole);
				}

				if (this.accessibilityenable) {
					if (this.accessibilityenable) {
						nexacro.__setElementHandleAccessibilityEnable(handle, this.accessibilityenable);
					}
					if (this.accessibilitydesclevel) {
						nexacro.__setElementHandleAccessibilityDescLevel(handle, this.accessibilitydesclevel);
					}
					var readlabel = this._makeAccessibilityLabelbyReadtype(this);
					if (readlabel != this.accessibilityreadlabel) {
						this.accessibilityreadlabel = readlabel;
						nexacro.__setElementHandleAccessibilityLabel(handle, this.accessibilityreadlabel);
					}
				}
				else {
					nexacro.__setElementHandleAccessibilityEnable(handle, this.accessibilityenable);
				}

				if (this.accessibility_stat_disabled) {
					nexacro.__setElementHandleAccessibilityStatDisabled(handle, this.accessibility_stat_disabled);
				}
				if (this.accessibility_stat_hidden) {
					nexacro.__setElementHandleAccessibilityStatHidden(handle, this.accessibility_stat_hidden);
				}
				if (this.accessibility_stat_checked) {
					nexacro.__setElementHandleAccessibilityStatChecked(handle, this.accessibility_stat_checked);
				}

				if (this.accessibility_stat_pressed) {
					nexacro.__setElementHandleAccessibilityStatPressed(handle, this.accessibility_stat_pressed);
				}
				if (this.accessibility_stat_selected) {
					nexacro.__setElementHandleAccessibilityStatSelected(handle, this.accessibility_stat_selected);
				}
				if (this.accessibility_stat_expanded) {
					nexacro.__setElementHandleAccessibilityStatExpanded(handle, this.accessibility_stat_expanded);
				}

				if (this.accessibility_flag_haspopup) {
					nexacro.__setElementHandleAccessibilityStatHasPopup(handle, this.accessibility_flag_haspopup);
				}
				if (this.accessibility_flag_focusable) {
					nexacro.__setElementHandleAccessibilityFlagFocusable(handle, this.accessibility_flag_focusable);
				}
				if (this.accessibility_flag_readonly) {
					nexacro.__setElementHandleAccessibilityFlagReadOnly(handle, this.accessibility_flag_readonly);
				}

				if (this.accessibility_flag_password) {
					nexacro.__setElementHandleAccessibilityFlagPassword(handle, this.accessibility_flag_password);
				}
				if (this.accessibility_flag_multiselectable) {
					nexacro.__setElementHandleAccessibilityFlagMultiSelectable(handle, this.accessibility_flag_multiselectable);
				}
				if (this.accessibility_flag_selectable) {
					nexacro.__setElementHandleAccessibilityFlagSelectable(handle, this.accessibility_flag_selectable);
				}
				if (this.accessibility_flag_defaultbutton) {
					nexacro.__setElementHandleAccessibilityStatDefaultButton(handle, this.accessibility_flag_defaultbutton);
				}

				if (this.accessibility_flag_multiline) {
					nexacro.__setElementHandleAccessibilityFlagMultiLine(handle, this.accessibility_flag_multiline);
				}

				if (this.accessibility_prop_hotkey) {
					nexacro.__setElementHandleAccessibilityHotKey(handle, this.accessibility_prop_hotkey);
				}

				if (this.accessibility_prop_itemcount) {
					nexacro.__setElementHandleAccessibilityInfoCount(handle, this.accessibility_prop_itemcount);
				}
				if (this.accessibility_prop_itemindex) {
					nexacro.__setElementHandleAccessibilityInfoIndex(handle, this.accessibility_prop_itemindex);
				}

				if (this.accessibility_prop_valuemax) {
					nexacro.__setElementHandleAccessibilityInfoValueMax(handle, this.accessibility_prop_valuemax);
				}
				if (this.accessibility_prop_valuemin) {
					nexacro.__setElementHandleAccessibilityInfoValueMin(handle, this.accessibility_prop_valuemin);
				}
			}
		};

		_pControlElement._makeAccessibilityLabelbyReadtype = function () {
			var label = "";
			if (this.accessibilitydesclevel != "none" && this.accessibilitydesclevel != "child") {
				if ((nexacro._accessibilitydescreadtype & 0x01) == 0x01) {
					label = nexacro._AccessibilityUtil.getAccessibilityLabel(this);
				}
				if ((nexacro._accessibilitydescreadtype & 0x02) == 0x02 && this.accessibilityaction) {
					label += " " + nexacro._AccessibilityUtil.getAccessibilityAction(this);
				}
				if ((nexacro._accessibilitydescreadtype & 0x04) == 0x04 && this.accessibilitydescription) {
					label += " " + nexacro._AccessibilityUtil.getAccessibilityDescription(this);
				}
			}
			if (nexacro._AccessibilityUtil.getAccessibilityAdditionalLabel) {
				label += " " + nexacro._AccessibilityUtil.getAccessibilityAdditionalLabel(this);
				label = label.trim();
			}
			return label;
		};

		_pControlElement._setAccessibilityNotifyEvent = function () {
			var handle = this.handle;
			if (handle) {
				nexacro.__setElementHandleAccessibilityNotifyEvent(handle);
			}
		};

		_pControlElement._updateAccessibilityLabel = function () {
			var handle = this.handle;
			if (handle) {
				var readlabel = this._makeAccessibilityLabelbyReadtype(this);
				if (readlabel != this.accessibilityreadlabel) {
					this.accessibilityreadlabel = readlabel;
					nexacro.__setElementHandleAccessibilityLabel(handle, readlabel);
				}
			}
		};
		delete _pControlElement;
	}

	if (nexacro.InputElement) {
		var _pInputElement = nexacro.InputElement.prototype;

		_pInputElement.setElementAccessibilityRole = function (role) {
		};

		_pInputElement.setElementAccessibilityLabel = nexacro._emptyFn;
		_pInputElement._setElementInputRole = nexacro._emptyFn;
		_pInputElement._setAccessibilityLabel = nexacro._emptyFn;

		_pInputElement._wantAccessibilityAdditionalLabel = function () {
			return true;
		};

		delete _pInputElement;
	}
}
