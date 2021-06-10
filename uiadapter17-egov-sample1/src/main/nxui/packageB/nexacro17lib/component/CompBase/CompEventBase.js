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

if (nexacro.Component) {
	var _pComponent = nexacro.Component.prototype;

	_pComponent._setfocusing_comp = null;
	_pComponent._focus_refer_comp = null;
	_pComponent._is_killfocusing = false;

	_pComponent._resetScrollPos = function (target_comp, left, top, right, bottom, focus_direction) {
		if (this._is_frame) {
			return;
		}

		if (!this._is_popup_control && this.parent && this.parent != this) {
			this.parent._resetScrollPos(this, left, top, right, bottom, focus_direction);
		}
	};

	_pComponent._getSameParent = function (paths) {
		if (!paths) {
			return;
		}

		var p = this.parent;
		var idx = 0;
		var self_parent_paths = [];
		while (p) {
			idx = nexacro._indexOf(paths, p);
			self_parent_paths.push(p);
			if (idx > -1 || p._is_window || (p._is_frame && (p._window_type == 1 || p._window_type == 4))) {
				return [self_parent_paths, idx];
			}
			p = p.parent;
		}
	};

	_pComponent._getTabOrderFirst = function () {
		return null;
	};

	_pComponent._getFromComponent = function (from_comp) {
		var comp = from_comp;
		if (comp._is_subcontrol || comp instanceof nexacro._InnerForm) {
			comp = this._getRootComponent(comp);
		}
		return comp;
	};

	_pComponent._getRecalcCanvasXY = function (elem, canvasX, canvasY) {
		canvasX += this._adjust_left - this._scroll_left || 0;
		canvasY += this._adjust_top - this._scroll_top || 0;

		var window = this._getWindow();
		var comp = window.findComponent(elem);

		if (comp != this) {
			var padding = this._getCurrentStylePadding();
			if (padding) {
				canvasX += padding.left;
				canvasY += padding.top;
			}
		}
		return [canvasX, canvasY];
	};

	_pComponent._getClientXY = function (canvasX, canvasY) {
		var border_left = 0, border_top = 0;
		var border = this._getCurrentStyleBorder();
		if (border) {
			border_top = border._getBorderTopWidth();
			border_left = border._getBorderLeftWidth();
		}

		var clientX = canvasX - border_left;
		var clientY = canvasY - border_top;

		return [clientX, clientY];
	};

	_pComponent._setLastFocus = function (comp) {
		if (comp && !comp._is_popup_control) {
			if (this == comp) {
				this._last_focused = null;
				return;
			}

			var p = this;
			while (p && (p._is_form || p instanceof nexacro.Div || p instanceof nexacro.Tab || p instanceof nexacro.Tabpage)) {
				p._last_focused = comp;
				comp = p;
				p = p.parent;
			}
		}
	};

	_pComponent._setCurFocusPathsByCurPos = function (cur, root_window) {
		var _win = root_window ? root_window : this._getRootWindow();
		var parent_path = [];
		var p = cur.parent;

		_win.clearCurrentFocusPaths();

		if (_win.frame == cur) {
			return;
		}

		while (p) {
			parent_path.push(p);
			if (p == _win.frame || (p._is_frame && (p._window_type == 1 || p._window_type == 4))) {
				break;
			}
			p = p.parent;
		}
		for (var i = parent_path.length; i > 0; i--) {
			_win.addCurrentFocusPaths(parent_path[i - 1]);
		}
	};

	_pComponent._setVScrollDefaultAction = function (wheelDelta) {
		var control_elem = this.getElement();

		if (!control_elem) {
			return false;
		}

		if (!this._is_scrollable) {
			return false;
		}

		if (this.scrolltype == "none" || this.scrolltype == "horizontal") {
			return false;
		}

		var old_value = this._vscroll_pos;
		var value = old_value - wheelDelta;

		var vscroll_limit = control_elem.vscroll_limit;
		if (value > vscroll_limit) {
			value = vscroll_limit;
		}

		this._scrollTo(this._hscroll_pos, value, true, true, undefined, "mousewheel_v");

		var new_value = this._vscroll_pos;

		if (old_value != new_value) {
			return true;
		}

		return false;
	};

	_pComponent._setHScrollDefaultAction = function (wheelDelta) {
		var control_elem = this.getElement();

		if (!control_elem) {
			return false;
		}

		if (!this._is_scrollable) {
			return false;
		}

		if (this.scrolltype == "none" || this.scrolltype == "vertical") {
			return false;
		}

		var old_value = this._hscroll_pos;
		var value = old_value - wheelDelta;

		var hscroll_limit = control_elem.hscroll_limit;
		if (value > hscroll_limit) {
			value = hscroll_limit;
		}

		this._scrollTo(value, this._vscroll_pos, true, true, undefined, "mousewheel_h");
		var new_value = this._hscroll_pos;

		if (old_value != new_value) {
			return true;
		}

		return false;
	};

	_pComponent._isParentdefaultprevented = function (comp, event_name) {
		var p_comp = comp.parent;
		while (p_comp) {
			if (!p_comp._getFromComponent) {
				return false;
			}
			var root_comp = p_comp._getFromComponent(p_comp);
			var listener = root_comp["on" + event_name];
			if (!listener || (listener && !listener.defaultprevented)) {
				p_comp = p_comp.parent;
				if (root_comp instanceof nexacro.MainFrame) {
					return false;
				}
			}
			else {
				return true;
			}
		}

		return false;
	};

	_pComponent._init_drag_info = function () {
		nexacro._cur_drag_info = null;
	};

	_pComponent._isSelected = function () {
		return this._use_selected_status && this._userstatusmap && this._userstatusmap.selected;
	};

	_pComponent._isPushed = function () {
		return this._use_pushed_status && this._userstatusmap && this._userstatusmap.pushed;
	};


	_pComponent._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		if (nexacro._enableaccessibility && this._on_accessibility_focus) {
			return this._on_accessibility_focus(self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
		}

		if (!this._is_alive || !this.visible || !this._isEnable()) {
			return;
		}


		var _win = this._getRootWindow();
		var i, j, n;

		if (self_flag) {
			var pThis = this;
			while (pThis && pThis._is_nc_control) {
				pThis = pThis.parent;
			}

			if (!pThis || !pThis._isFocusAcceptable()) {
				return;
			}

			var focus_info = null;
			var focuspath_index = -1;
			var cur_focus_paths = _win.getCurrentFocusPaths();
			if (cur_focus_paths && cur_focus_paths.length) {
				cur_focus_paths = cur_focus_paths.slice(0);

				focuspath_index = nexacro._indexOf(cur_focus_paths, pThis);
				if (focuspath_index > -1) {
					if (focuspath_index == cur_focus_paths.length - 1) {
						if (this._getTabOrderFirst() == null) {
							return;
						}
					}
					else {
						if (!(this instanceof nexacro.PopupDiv)) {
							return;
						}
					}
				}

				focus_info = pThis._getSameParent(cur_focus_paths);
			}

			if (focus_info) {
				new_focus = this._getRootComponent(pThis);
				var old_refer_focus = cur_focus_paths[cur_focus_paths.length - 1];
				var old_focus = this._getRootComponent(old_refer_focus);

				var focus_arrs = focus_info[0];
				if (focus_arrs) {
					var focus_path, prev_focus_path;
					var focus_arrs_len = focus_arrs.length;
					for (i = 0; i < focus_arrs_len; i++) {
						focus_path = focus_arrs[i];
						if (focus_path && !focus_path._isFocusAcceptable()) {
							return;
						}
					}

					if (focus_arrs_len > 1) {
						for (i = 0; i < focus_arrs_len; i++) {
							focus_path = focus_arrs[i];
							if (focus_path && (focus_path.components || focus_path._is_container || focus_path._is_containerset)) {
								focus_path._last_focused = (prev_focus_path ? prev_focus_path : pThis);
							}
							prev_focus_path = focus_path;
						}
					}
					else {
						if (pThis.parent && (pThis.parent.components || pThis.parent._is_container || pThis.parent._is_containerset)) {
							pThis.parent._setLastFocus(pThis);
						}
					}
				}

				var focus_path_before, focus_path_after;
				var is_focus_changed = false;
				var kill_focus_arrs = cur_focus_paths.slice(focus_info[1] + 1).reverse();
				if (kill_focus_arrs && kill_focus_arrs.length > 0) {
					for (i = 0, n = kill_focus_arrs.length; i < n; i++) {
						lose_focus = kill_focus_arrs[i];
						if (lose_focus && lose_focus._is_alive && !lose_focus._is_killfocusing) {
							lose_focus._is_killfocusing = true;

							_win._removeFromCurrentFocusPath(lose_focus, false, new_focus, this);
							if (lose_focus.enableevent) {
								if (new_focus._is_popup_control) {
									lose_focus._changeStatus("mouseover", false);
								}

								_win._setfocusing_comp = new_focus;

								focus_path_before = _win.getCurrentFocusPaths().slice(0);
								lose_focus.on_fire_onkillfocus(new_focus, this);
								focus_path_after = _win.getCurrentFocusPaths();

								is_focus_changed = (focus_path_before.length != focus_path_after.length);
								if (!is_focus_changed) {
									for (j = 0; j < focus_path_before.length; j++) {
										if (focus_path_before[j] != focus_path_after[j] || (cur_focus_paths.length == focus_path_before.length && cur_focus_paths[j] == focus_path_before[j]) || (cur_focus_paths.length != focus_path_before.length && cur_focus_paths[j] != focus_path_before[j])) {
											is_focus_changed = true;
											break;
										}
									}
								}
								if (is_focus_changed) {
									lose_focus._is_killfocusing = false;
									return;
								}
							}
							lose_focus._is_killfocusing = false;
						}
					}
				}

				if (focus_arrs && (focus_arrs.length > 1)) {
					var focus_start = focus_arrs[focus_arrs.length - 2];

					pThis._setCurFocusPathsByCurPos(focus_start, _win);
					focus_start._on_focus(false, evt_name, old_focus, old_refer_focus, new_focus, this);
				}
				else {
					pThis._setCurFocusPathsByCurPos(pThis, _win);
					pThis._on_focus(false, evt_name, old_focus, old_refer_focus, new_focus, this);
				}
			}
			else {
				pThis._setCurFocusPathsByCurPos(pThis, _win);
				pThis._on_focus(false, evt_name, lose_focus, refer_lose_focus);
			}
		}
		else {
			var c = this._getLastFocused();
			if (!c || (c && (!c.visible || !c.enable))) {
				c = this._getTabOrderFirst();
			}

			if (c && c.visible && !this._block_inner_focus) {
				if (_win._is_active_window !== false) {
					this._changeStatus("focused", true);
				}

				var focus_paths = _win.getCurrentFocusPaths();
				var focus_path_before, focus_path_after;

				if (focus_paths) {
					focus_path_before = focus_paths.slice(0);
				}

				this.on_fire_onsetfocus(lose_focus, refer_lose_focus);

				if (focus_paths) {
					var focus_path_after = _win.getCurrentFocusPaths();
					var is_focus_changed = (focus_path_before.length != focus_path_after.length);
					if (!is_focus_changed) {
						for (j = 0; j < focus_path_before.length; j++) {
							if (focus_path_before[j] != focus_path_after[j]) {
								is_focus_changed = true;
								break;
							}
						}
					}

					if (is_focus_changed) {
						return;
					}
				}

				this._setLastFocus(c);

				_win.addCurrentFocusPaths(this);
				c._on_focus(false, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			}
			else {
				var is_refer_new_focus_mychild, p;
				if (refer_new_focus && this != refer_new_focus) {
					p = refer_new_focus;
					while (p && !(p._is_window)) {
						if (p == this) {
							is_refer_new_focus_mychild = true;
							break;
						}
						p = p.parent;
					}
				}

				if (evt_name == "lbuttondown" && is_refer_new_focus_mychild == true) {
					this._changeStatus("focused", true);
					this._changeStatus("mouseover", true);
				}
				else {
					if (_win._is_active_window !== false) {
						this._changeStatus("focused", true);
					}
				}

				var focus_paths = _win.getCurrentFocusPaths();
				var focus_path_before, focus_path_after;

				if (focus_paths) {
					focus_path_before = focus_paths.slice(0);
				}

				this.on_fire_onsetfocus(lose_focus, refer_lose_focus, this, refer_new_focus);

				if (focus_paths) {
					focus_path_after = _win.getCurrentFocusPaths();
					var is_focus_changed = (focus_path_before.length != focus_path_after.length);
					if (!is_focus_changed) {
						for (j = 0; j < focus_path_before.length; j++) {
							if (focus_path_before[j] != focus_path_after[j]) {
								is_focus_changed = true;
								break;
							}
						}
					}
					if (is_focus_changed) {
						return;
					}
				}

				this._setLastFocus(this);
				_win.addCurrentFocusPaths(this);
				this.on_focus_basic_action((this == refer_new_focus), evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

				if (is_refer_new_focus_mychild) {
					var fireComp = null;
					p = refer_new_focus;
					while (p && this != p) {
						if (p instanceof nexacro.Form) {
							break;
						}
						fireComp = p;
						p = p.parent;
					}
					if (fireComp && !fireComp._is_application) {
						fireComp._on_focus(false, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
					}
				}
			}
		}
	};

	_pComponent.on_focus_basic_action = function (self_flag, evt_name) {
		if (nexacro._enableaccessibility) {
			this._setAccessibilityStatFocus(evt_name);
		}

		this._apply_setfocus(evt_name, self_flag);
	};

	_pComponent._on_killfocus = function (new_focus, new_refer_focus) {
		if (!this._is_alive) {
			return;
		}

		this.on_killfocus_basic_action(new_focus, new_refer_focus);
	};

	_pComponent.on_killfocus_basic_action = function () {
		return;
	};

	_pComponent._on_activate = function () {
		if (!this._is_alive) {
			return;
		}

		if (!this._isSelected()) {
			this._changeStatus("focused", true);
		}
	};

	_pComponent._on_deactivate = function () {
		if (!this._is_alive) {
			return;
		}

		if (!this._isSelected()) {
			this._changeStatus("focused", false);
		}
	};

	_pComponent._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		if (this.visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
			this.on_click_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);
		}
	};

	_pComponent.on_click_basic_action = function () {
		return;
	};

	_pComponent._on_dblclick = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onlbuttonup || (pThis.onlbuttonup && !pThis.onlbuttonup.defaultprevented))) {
			if (this.visible && this._isEnable() && this.enableevent) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
			}
		}
	};

	_pComponent._on_keypress = function (elem, keycode, charcode, alt_key, ctrl_key, shift_key) {
		if (!this._is_alive) {
			return;
		}

		return this.on_keypress_basic_action(keycode, charcode, alt_key, ctrl_key, shift_key);
	};

	_pComponent.on_keypress_basic_action = function () {
		return;
	};

	_pComponent._on_beforekeyinput = function (elem, value, status, begin, end, inputType) {
		if (!this._is_alive) {
			return false;
		}

		return this.on_beforekeyinput_basic_action(value, status, begin, end, inputType);
	};

	_pComponent.on_beforekeyinput_basic_action = function () {
		return;
	};

	_pComponent._on_keyinput = function () {
		if (!this._is_alive) {
			return;
		}

		this.on_keyinput_basic_action();
		if (this.visible && this._isEnable() && this.enableevent) {
			this.on_fire_oninput();
			this.on_keyinput_default_action();
		}
	};

	_pComponent.on_keyinput_basic_action = function () {
		return;
	};

	_pComponent.on_keyinput_default_action = function () {
		return;
	};

	_pComponent._on_contextmenu = function () {
		var root_comp = this._getFromComponent(this);
		if (this.visible && this._isEnable()) {
			root_comp.on_fire_oncontextmenu(root_comp, this);
		}

		var listener = root_comp.oncontextmenu;
		if (!listener || (listener && !listener.defaultprevented)) {
			var ret = this._on_contextmenu_default_action();
			return ret;
		}

		return true;
	};

	_pComponent._on_contextmenu_basic_action = function () {
		return;
	};

	_pComponent._on_contextmenu_default_action = function () {
		return nexacro._checkShowContextMenu(this);
	};

	_pComponent._on_zoom = function (zoomfactor) {
		if (!this._is_alive) {
			return;
		}

		if (this.visible && this._isEnable()) {
			this._setZoom(zoomfactor);
		}
	};

	_pComponent._on_orientationchange = function (orientation) {
		if (!this._is_alive) {
			return;
		}

		if (this.visible && this._isEnable()) {
			if (this.enableevent) {
				this.on_fire_onorientationchange(orientation);
			}
		}
	};


	_pComponent._on_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		nexacro._skipDragEventAfterMsgBox = false;

		var ret = this._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onlbuttondown || (pThis.onlbuttondown && !pThis.onlbuttondown.defaultprevented))) {
			this.on_lbuttondown_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, this._focus_refer_comp);
			ret = this._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_touch_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		nexacro._skipDragEventAfterMsgBox = false;

		var ret;
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onlbuttondown || (pThis.onlbuttondown && !pThis.onlbuttondown.defaultprevented))) {
			ret = this._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_touch_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		var win = this._getWindow();

		if (event_bubbles === undefined) {
			var first_comp;

			if (!refer_comp) {
				first_comp = this;
				refer_comp = this._focus_refer_comp = this;
				if (!this._is_focus_accept) {
					this._focus_refer_comp = this._getFocusAcceptableComponent(this);
				}
			}

			if (this.visible && this._isEnable()) {
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}

				var bubble = this.on_touch_lbuttondown_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp);
				if (bubble) {
					return;
				}
				else if (bubble === false) {
					event_bubbles = bubble;
				}
			}

			if ((!this.onlbuttondown || (this.onlbuttondown && !this.onlbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					var select_mode = "select";

					if (this.selectscrollmode) {
						if (this.selectscrollmode == "default") {
							select_mode = (nexacro._isTouchInteraction) ? "scroll" : "select";
						}
						else {
							select_mode = this.selectscrollmode;
						}
					}

					if (select_mode == "select") {
						nexacro._setDragInfo(win, elem, win._curWindowX, win._curWindowY, null, null);
					}

					return this.parent._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if ((!this.onlbuttondown || (this.onlbuttondown && !this.onlbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent._on_bubble_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		var win = this._getWindow();

		if (event_bubbles === undefined) {
			var first_comp;

			if (!refer_comp) {
				first_comp = this;
				refer_comp = this._focus_refer_comp = this;

				if (!this._is_focus_accept) {
					this._focus_refer_comp = this._getFocusAcceptableComponent(this);
				}
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}

				if (event_bubbles === false) {
					event_bubbles = undefined;
				}

				if (bubble_scope) {
					var bubble = this.on_lbuttondown_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
					if (bubble) {
						return;
					}
					else if (bubble === false) {
						event_bubbles = bubble;
					}
				}
			}

			if ((!this.onlbuttondown || (this.onlbuttondown && !this.onlbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					nexacro._setDragInfo(win, elem, win._curWindowX, win._curWindowY, null, null);
					return this.parent._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
			}
			if ((!this.onlbuttondown || (this.onlbuttondown && !this.onlbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_touch_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp) {
		var win = this._getWindow();

		if (refer_comp === this) {
			if (this._use_pushed_status) {
				this._changeUserStatus("pushed", true);
			}
		}

		if (this._is_track) {
			nexacro._setTrackInfo(win, this, win._curWindowX, win._curWindowY);
			return false;
		}

		if (this._is_repeat) {
			nexacro._setRepeatInfo(this, win, refer_comp, win._curWindowX, win._curWindowY, canvasX, canvasY);
			return true;
		}
	};

	_pComponent.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp) {
		var win = this._getWindow();
		if (refer_comp === this) {
			if (this._use_pushed_status) {
				this._changeUserStatus("pushed", true);
			}
		}

		if (this._is_track) {
			nexacro._setTrackInfo(win, this, win._curWindowX, win._curWindowY);
			return false;
		}

		if (this._is_repeat) {
			nexacro._setRepeatInfo(this, win, refer_comp, win._curWindowX, win._curWindowY, canvasX, canvasY);
			return true;
		}
	};

	_pComponent.on_lbuttondown_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp) {
		var win = this._getWindow();
		if (this.visible && this._isEnable() && refer_comp) {
			refer_comp._on_focus(true, "lbuttondown");
		}
		else {
			var comp = win._findComponentForEvent(elem, 0, 0);
			if (comp && comp[0]) {
				comp[0]._on_focus(true, "lbuttondown");
			}
		}
	};

	_pComponent._on_rbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = this._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onrbuttondown || (pThis.onrbuttondown && !pThis.onrbuttondown.defaultprevented))) {
			this.on_rbuttondown_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_rbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onrbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onrbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}
			if ((!this.onrbuttondown || (this.onrbuttondown && !this.onrbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onrbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onrbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
			}
			if ((!this.onrbuttondown || (this.onrbuttondown && !this.onrbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_rbuttondown_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, parent) {
		var win = this._getWindow();
		if (this.visible && this._isEnable() && refer_comp) {
			refer_comp._on_focus(true, "rbuttondown");
		}
		else {
			var comp = win._findComponentForEvent(elem, 0, 0);
			if (comp && comp[0]) {
				comp[0]._on_focus(true, "rbuttondown");
			}
		}
	};

	_pComponent._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem) {
		var ret = this._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, true);
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onlbuttonup || (pThis.onlbuttonup && !pThis.onlbuttonup.defaultprevented))) {
			this.on_lbuttonup_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false);
		}
		return ret;
	};

	_pComponent._on_touch_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem) {
		var ret;
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onlbuttonup || (pThis.onlbuttonup && !pThis.onlbuttonup.defaultprevented))) {
			ret = this._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false);
		}
		return ret;
	};

	_pComponent._on_bubble_touch_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			this.on_lbuttonup_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

			if ((!this.onlbuttonup || (this.onlbuttonup && !this.onlbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, from_elem, bubble_scope);
				}
				else {
					return this.parent._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, from_elem, bubble_scope);
				}
			}
		}
		else {
			if ((!this.onlbuttonup || (this.onlbuttonup && !this.onlbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, from_elem, bubble_scope);
			}
		}
	};

	_pComponent._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (bubble_scope) {
				this.on_lbuttonup_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
				}
				else {
					event_bubbles = this.on_fire_sys_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}
			if ((!this.onlbuttonup || (this.onlbuttonup && !this.onlbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, from_elem, bubble_scope);
				}
				else {
					return this.parent._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, from_elem, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
				}
				else {
					event_bubbles = this.on_fire_sys_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
				}
			}
			if ((!this.onlbuttonup || (this.onlbuttonup && !this.onlbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, from_elem, bubble_scope);
			}
		}
	};

	_pComponent.on_lbuttonup_basic_action = function () {
		if (this._use_pushed_status) {
			if (this._isPushed()) {
				if (nexacro._isTouchInteraction) {
					this._changeUserStatus("pushed", false);
				}
				else {
					this._changeUserStatus("pushed", false);
					this._changeStatus("mouseover", true);
				}
			}
		}
	};

	_pComponent.on_lbuttonup_default_action = function () {
	};

	_pComponent._on_rbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem) {
		var ret = this._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, true);
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onrbuttonup || (pThis.onrbuttonup && !pThis.onrbuttonup.defaultprevented))) {
			this.on_rbuttonup_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false);
		}
		return ret;
	};

	_pComponent._on_bubble_rbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			this.on_rbuttonup_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
				}
				else {
					event_bubbles = this.on_fire_sys_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}

			if ((!this.onrbuttonup || (this.onrbuttonup && !this.onrbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, from_elem, bubble_scope);
				}
				else {
					return this.parent._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, from_elem, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
				}
				else {
					event_bubbles = this.on_fire_sys_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
				}
			}
			if ((!this.onrbuttonup || (this.onrbuttonup && !this.onrbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, from_elem, bubble_scope);
			}
		}
	};

	_pComponent.on_rbuttonup_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp) {
		if (this._use_pushed_status) {
			if (this._isPushed()) {
				if (nexacro._isTouchInteraction) {
					if (this._isPushed()) {
						this._changeUserStatus("pushed", false);
					}
				}
			}
		}
	};

	_pComponent.on_rbuttonup_default_action = function () {
	};

	_pComponent._on_mouseup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem) {
		var ret = this._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, true);

		if (!this._is_alive) {
			return ret;
		}

		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onmouseup || (pThis.onmouseup && !pThis.onmouseup.defaultprevented))) {
			this.on_mouseup_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false);
		}
		return ret;
	};

	_pComponent._on_bubble_mouseup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
				}
				else {
					event_bubbles = this.on_fire_sys_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}
			if ((!this.onmouseup || (this.onmouseup && !this.onmouseup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, from_elem, bubble_scope);
				}
				else {
					return this.parent._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, from_elem, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
				}
				else {
					event_bubbles = this.on_fire_sys_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
				}
			}
			if ((!this.onmouseup || (this.onmouseup && !this.onmouseup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, from_elem, bubble_scope);
			}
		}
	};

	_pComponent.on_mouseup_default_action = function () {
	};

	_pComponent._on_mousedown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = this._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

		if (!this._is_alive) {
			return ret;
		}

		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onmousedown || (pThis.onmousedown && !pThis.onmousedown.defaultprevented))) {
			this.on_mousedown_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_mousedown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}
			if ((!this.onmousedown || (this.onmousedown && !this.onmousedown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
			}
			if ((!this.onmousedown || (this.onmousedown && !this.onmousedown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_mousedown_default_action = function () {
	};

	_pComponent._on_mousemove = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (nexacro._current_popups.length > 0) {
			var win = this._getWindow();
			var elem_comp = win.findComponent(elem, 0, 0);
			if (elem_comp && elem_comp[0]) {
				var cur_popup = nexacro._current_popups[0];
				if (cur_popup._track_capture && !cur_popup._contains(elem_comp[0])) {
					return;
				}
			}
		}

		if (nexacro._mousewheel_obj && nexacro._mousewheel_obj != this) {
			if (nexacro._mousewheel_obj._is_alive) {
				nexacro._mousewheel_obj._changeStatus("mouseover", false);
			}

			nexacro._mousewheel_obj = null;
		}

		var ret = this._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

		if (!this._is_alive) {
			return ret;
		}

		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onmousemove || (pThis.onmousemove && !pThis.onmousemove.defaultprevented))) {
			this.on_mousemove_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_mousemove = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				if (bubble_scope) {
					this.on_mousemove_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
				}

				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onmousemove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onmousemove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}

			if ((!this.onmousemove || (this.onmousemove && !this.onmousemove.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (bubble_scope) {
					this.on_mousemove_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
				}

				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onmousemove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onmousemove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
			}

			if ((!this.onmousemove || (this.onmousemove && !this.onmousemove.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_mousemove_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp) {
		if (this._isPushed()) {
			this._changeUserStatus("pushed", true);
		}
		else {
			if (!nexacro._isTouchInteraction) {
				this._changeStatus("mouseover", true);
			}
			else {
				var win = this._getWindow();
				var ldown_elem = win._cur_ldown_elem;

				if (elem != ldown_elem) {
					var elem_comp = win.findComponent(ldown_elem, 0, 0)[0];

					if (elem_comp && elem_comp._isPushed()) {
						elem_comp._changeUserStatus("pushed", false);
					}
				}
			}
		}
	};

	_pComponent.on_mousemove_default_action = function () {
	};

	_pComponent._on_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (nexacro._current_popups.length > 0) {
			var win = this._getWindow();
			var elem_comp = win.findComponent(elem, 0, 0);
			if (elem_comp && elem_comp[0]) {
				var cur_popup = nexacro._current_popups[0];
				if (cur_popup._track_capture && !cur_popup._contains(elem_comp[0])) {
					return;
				}
			}
		}

		var ret = this._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

		if (!this._is_alive) {
			return ret;
		}

		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onmouseenter || (pThis.onmouseenter && !pThis.onmouseenter.defaultprevented))) {
			this.on_mouseenter_default_action(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			var first_comp;
			var is_subcontrol_bubble = this._is_subcontrol ? true : false;

			if (!refer_comp) {
				first_comp = this;
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				if (is_subcontrol_bubble) {
					if (from_comp && this._contains(from_comp)) {
						return true;
					}

					if (first_comp == this) {
						var clientXY = this._getClientXY(canvasX, canvasY);
						if (bubble_scope) {
							event_bubbles = this.on_fire_user_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
						}
						else {
							event_bubbles = this.on_fire_sys_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
						}
						if (event_bubbles === false) {
							event_bubbles = undefined;
						}
					}
				}
				else {
					from_comp = this._getRootComponent(from_comp);
					if (from_comp && this._contains(from_comp)) {
						return true;
					}

					var clientXY = this._getClientXY(canvasX, canvasY);

					if (bubble_scope) {
						event_bubbles = this.on_fire_user_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
					else {
						event_bubbles = this.on_fire_sys_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
				}
			}
			if ((!this.onmouseenter || (this.onmouseenter && !this.onmouseenter.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (is_subcontrol_bubble) {
					return this.parent._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
			}

			if ((!this.onmouseenter || (this.onmouseenter && !this.onmouseenter.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_mouseenter_default_action = function () {
	};

	_pComponent._on_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (nexacro._current_popups.length > 0) {
			var win = this._getWindow();
			var elem_comp = win.findComponent(elem, 0, 0);
			if (elem_comp && elem_comp[0]) {
				var cur_popup = nexacro._current_popups[0];
				if (cur_popup._track_capture && !cur_popup._contains(elem_comp[0])) {
					return;
				}
			}
		}

		var ret = this._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

		if (!this._is_alive) {
			return ret;
		}

		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onmouseleave || (pThis.onmouseleave && !pThis.onmouseleave.defaultprevented))) {
			this.on_mouseleave_default_action(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			var first_comp;
			var is_subcontrol_bubble = this._is_subcontrol ? true : false;

			if (!refer_comp) {
				first_comp = this;
				refer_comp = this;
			}

			if (this.visible) {
				if (is_subcontrol_bubble) {
					if (to_comp && this._contains(to_comp)) {
						return true;
					}
					if (first_comp == this) {
						this.on_mouseleave_basic_action(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

						if (this._isEnable()) {
							var clientXY = this._getClientXY(canvasX, canvasY);
							if (bubble_scope) {
								event_bubbles = this.on_fire_user_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
							}
							else {
								event_bubbles = this.on_fire_sys_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
							}
							if (event_bubbles === false) {
								event_bubbles = undefined;
							}
						}
					}
				}
				else {
					to_comp = this._getRootComponent(to_comp);
					if (to_comp && this._contains(to_comp)) {
						return true;
					}

					if (first_comp == this) {
						this.on_mouseleave_basic_action(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
					}
					if (this._isEnable()) {
						var clientXY = this._getClientXY(canvasX, canvasY);
						if (bubble_scope) {
							event_bubbles = this.on_fire_user_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
						}
						else {
							event_bubbles = this.on_fire_sys_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
						}
					}
				}
			}
			if ((!this.onmouseleave || (this.onmouseleave && !this.onmouseleave.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (is_subcontrol_bubble) {
					return this.parent._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
			}
			if ((!this.onmouseleave || (this.onmouseleave && !this.onmouseleave.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_mouseleave_basic_action = function () {
		if (this._is_subcontrol) {
			if (this._isPushed()) {
				this._changeUserStatus("pushed", false);
			}
			else {
				var tmp_comp = this;
				var alive = true;
				if (!this._isSelected()) {
					while (tmp_comp) {
						if (tmp_comp._window) {
							break;
						}
						if (tmp_comp._is_alive == false) {
							alive = false;
							break;
						}
						tmp_comp = tmp_comp.parent;
					}
				}

				if (alive) {
					this._changeStatus("mouseover", false);
				}
			}
		}
		else {
			if (this._isPushed()) {
				this._changeUserStatus("pushed", false);
			}

			else {
				this._changeStatus("mouseover", false);
			}
		}
	};

	_pComponent.on_mouseleave_default_action = function () {
	};

	_pComponent._on_mousewheel = function (elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll) {
		if (!nexacro._mousewheel_obj) {
			nexacro._mousewheel_obj = this;
		}

		return this._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll);
	};

	_pComponent._on_bubble_mousewheel = function (elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				event_bubbles = this.on_fire_user_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);

				var pThis = this._getFromComponent(this);

				if (event_bubbles !== true) {
					if (pThis && (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.defaultprevented))) {
						var ret = this.on_fire_sys_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);

						if (ret) {
							return false;
						}

						var vScrollbarType = this._getVScrollBarType();
						if (this.vscrollbar && this.vscrollbar.enable && (this.vscrollbar.visible || vScrollbarType == "autoindicator")) {
							var vscrollbar = this.vscrollbar;
							var old_vpos = vscrollbar._pos;
							this._setVScrollDefaultAction(wheelDeltaY);
							var new_vpos = vscrollbar._pos;
							if (old_vpos != new_vpos) {
								return false;
							}
						}

						var hScrollbarType = this._getHScrollBarType();
						if (this.hscrollbar && this.hscrollbar.enable && (this.hscrollbar.visible || hScrollbarType == "autoindicator")) {
							var hscrollbar = this.hscrollbar;
							var old_hpos = hscrollbar._pos;
							this._setHScrollDefaultAction(wheelDeltaX);
							var new_hpos = hscrollbar._pos;
							if (old_hpos != new_hpos) {
								return false;
							}
						}
					}
					if (event_bubbles === false) {
						event_bubbles = undefined;
					}

					if (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.stoppropagation)) {
						if (this.parent && !this.parent._is_application) {
							var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

							canvasX = canvas[0];
							canvasY = canvas[1];

							if (this._is_subcontrol) {
								return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bScroll);
							}
							else {
								return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bScroll);
							}
						}
					}
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				event_bubbles = this.on_fire_user_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[0], fire_comp, refer_comp);

				var pThis = this._getFromComponent(this);

				if (event_bubbles !== true) {
					if (pThis && (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.defaultprevented))) {
						var ret = this.on_fire_sys_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[0], fire_comp, refer_comp);

						if (ret) {
							return false;
						}
						var vScrollbarType = this._getVScrollBarType();
						if (this.vscrollbar && this.vscrollbar.enable && (this.vscrollbar.visible || vScrollbarType == "autoindicator")) {
							var vscrollbar = this.vscrollbar;
							var old_vpos = vscrollbar._pos;
							this._setVScrollDefaultAction(wheelDeltaY);
							var new_vpos = vscrollbar._pos;
							if (old_vpos != new_vpos) {
								return false;
							}
						}

						if (nexacro.OS == "Mac OS") {
							var hScrollbarType = this._getHScrollBarType();
							if (this.hscrollbar && this.hscrollbar.enable && (this.hscrollbar.visible || hScrollbarType == "autoindicator")) {
								var hscrollbar = this.hscrollbar;
								var old_hpos = hscrollbar._pos;
								this._setHScrollDefaultAction(wheelDeltaX);
								var new_hpos = hscrollbar._pos;
								if (old_hpos != new_hpos) {
									return false;
								}
							}
						}
					}

					if (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.stoppropagation)) {
						if (this.parent && !this.parent._is_application) {
							var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

							canvasX = canvas[0];
							canvasY = canvas[1];

							return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bScroll);
						}
					}
				}
			}
		}
	};

	_pComponent.on_mousewheel_default_action = function () {
	};

	_pComponent._on_drag = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (nexacro._skipDragEventAfterMsgBox) {
			this._init_drag_info();
			return false;
		}

		var ret = this._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
		var pThis = this._getFromComponent(this);
		if (pThis && (pThis.ondrag && pThis.ondrag.defaultprevented)) {
			this._init_drag_info();
		}

		return ret;
	};

	_pComponent._on_bubble_drag = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			var is_subcontrol_bubble;

			if (!refer_comp) {
				refer_comp = this;
			}

			var pThis = this._getFromComponent(this);

			if (this._is_subcontrol) {
				is_subcontrol_bubble = true;
			}
			else {
				is_subcontrol_bubble = false;
				var clientXY = this._getClientXY(canvasX, canvasY);

				event_bubbles = this.on_fire_user_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, refer_comp);
				if (!event_bubbles || event_bubbles[0] !== true) {
					if (!this.ondrag || (pThis && (pThis.ondrag && !pThis.ondrag.defaultprevented))) {
						this.on_fire_sys_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, refer_comp);
					}
				}
			}

			if ((!event_bubbles || event_bubbles[0] !== true)) {
				if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.stoppropagation)) && !this._window && this.parent && !this.parent._is_application) {
					var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

					canvasX = canvas[0];
					canvasY = canvas[1];

					if (is_subcontrol_bubble) {
						return this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, this, refer_comp);
					}
					else {
						return this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp);
					}
				}
			}
			return event_bubbles;
		}
		else {
			if ((!event_bubbles || event_bubbles[0] !== true) && this.parent && !this.parent._is_application) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				event_bubbles = this.on_fire_user_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, this);
				if (!event_bubbles || event_bubbles[0] !== true) {
					var pThis = this._getFromComponent(this);
					if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.defaultprevented))) {
						this.on_fire_sys_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, this);
					}

					if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.stoppropagation)) && !this._window && this.parent && !this.parent._is_application) {
						var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

						canvasX = canvas[0];
						canvasY = canvas[1];

						return this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp);
					}
				}
			}
			return event_bubbles;
		}
	};

	_pComponent.on_drag_default_action = function () {
	};

	_pComponent._on_drop = function (elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = this._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.ondrop || (pThis.ondrop && !pThis.ondrop.defaultprevented))) {
			this.on_drop_default_action(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_drop = function (elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_ondrop(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_ondrop(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}

			if ((!this.ondrop || (this.ondrop && !this.ondrop.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_ondrop(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_ondrop(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
			}
			if ((!this.ondrop || (this.ondrop && !this.ondrop.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_drop_default_action = function () {
	};

	_pComponent._on_dragmove = function (elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = this._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.ondragmove || (pThis.ondragmove && !pThis.ondragmove.defaultprevented))) {
			this.on_dragmove_default_action(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		else if (pThis && (pThis.ondragmove && pThis.ondragmove.defaultprevented)) {
			this._init_drag_info();
		}
		return ret;
	};

	_pComponent._on_bubble_dragmove = function (elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			var is_subcontrol_bubble;

			if (!refer_comp) {
				refer_comp = this;
			}

			if (this._is_subcontrol) {
				is_subcontrol_bubble = true;
			}
			else {
				is_subcontrol_bubble = false;
				if (this.visible && this._isEnable()) {
					var clientXY = this._getClientXY(canvasX, canvasY);
					if (bubble_scope) {
						event_bubbles = this.on_fire_user_ondragmove(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
					else {
						event_bubbles = this.on_fire_sys_ondragmove(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
				}
			}

			if ((!this.ondragmove || (this.ondragmove && !this.ondragmove.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (is_subcontrol_bubble) {
					return this.parent._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_ondragmove(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_ondragmove(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
			}
			if ((!this.ondragmove || (this.ondragmove && !this.ondragmove.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_dragmove_default_action = function () {
	};

	_pComponent._on_dragenter = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = this._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);
		var pThis = this._getFromComponent(this);
		if (!pThis.ondragenter || (pThis.ondragenter && !pThis.ondragenter.defaultprevented)) {
			this.on_dragenter_default_action(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		else if (pThis && (pThis.ondragenter && pThis.ondragenter.defaultprevented)) {
			this._init_drag_info();
		}
		return ret;
	};

	_pComponent._on_bubble_dragenter = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			var is_subcontrol_bubble;

			if (!refer_comp) {
				this._dragenter_first_comp = this;
				refer_comp = this;
			}

			if (this._is_subcontrol) {
				is_subcontrol_bubble = true;
				if (from_comp && this._contains(from_comp)) {
					return;
				}
				if (from_comp == this) {
					this.on_dragenter_basic_action(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
				}
			}
			else {
				is_subcontrol_bubble = false;
				from_comp = this._getRootComponent(from_comp);
				if (from_comp && this._contains(from_comp)) {
					return;
				}

				if (this.visible && this._isEnable()) {
					this.on_dragenter_basic_action(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

					var clientXY = this._getClientXY(canvasX, canvasY);
					if (bubble_scope) {
						event_bubbles = this.on_fire_user_ondragenter(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
					else {
						event_bubbles = this.on_fire_sys_ondragenter(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
				}
			}
			if ((!this.ondragenter || (this.ondragenter && !this.ondragenter.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (is_subcontrol_bubble) {
					return this.parent._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_ondragenter(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_ondragenter(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}

				this._changeStatus("mouseover", true);
			}
			if ((!this.ondragenter || (this.ondragenter && !this.ondragenter.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_dragenter_basic_action = function () {
		if (this._isPushed()) {
			this._changeUserStatus("pushed", true);
		}
		else {
			this._changeStatus("mouseover", true);
		}
	};

	_pComponent.on_dragenter_default_action = function () {
	};

	_pComponent._on_dragleave = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = this._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.ondragleave || (pThis.ondragleave && !pThis.ondragleave.defaultprevented))) {
			this.on_dragleave_default_action(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
			ret = this._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_dragleave = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			var is_subcontrol_bubble;

			if (!refer_comp) {
				refer_comp = this;
			}

			if (this._is_subcontrol) {
				is_subcontrol_bubble = true;
				if (to_comp && this._contains(to_comp)) {
					return;
				}
				if (fire_comp == this) {
					this.on_dragleave_basic_action(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
				}
			}
			else {
				is_subcontrol_bubble = false;
				to_comp = this._getRootComponent(to_comp);
				if (to_comp && this._contains(to_comp)) {
					return;
				}

				if (this.visible && this._isEnable()) {
					this.on_dragleave_basic_action(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

					var clientXY = this._getClientXY(canvasX, canvasY);
					if (bubble_scope) {
						event_bubbles = this.on_fire_user_ondragleave(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
					else {
						event_bubbles = this.on_fire_sys_ondragleave(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
				}
			}

			if ((!this.ondragleave || (this.ondragleave && !this.ondragleave.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (is_subcontrol_bubble) {
					return this.parent._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_ondragleave(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_ondragleave(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				if (!to_comp || !this._contains(to_comp)) {
					this._changeStatus("mouseover", false);
				}
			}
			if ((!this.ondragleave || (this.ondragleave && !this.ondragleave.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_dragleave_basic_action = function () {
		if (this._isPushed()) {
			this._changeUserStatus("pushed", false);
		}
		else {
			this._changeStatus("mouseover", false);
		}
	};

	_pComponent.on_dragleave_default_action = function () {
	};

	_pComponent._on_keydown = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp) {
		var ret = this._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, true);

		if (!this._is_alive) {
			return ret;
		}

		var pThis = this._getFromComponent(this);

		if (pThis && (!pThis.onkeydown || (pThis.onkeydown && !pThis.onkeydown.defaultprevented))) {
			this.on_keydown_default_action(keycode, alt_key, ctrl_key, shift_key, refer_comp);
			ret = this._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_keydown = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				if (bubble_scope) {
					this.on_keydown_basic_action(keycode, alt_key, ctrl_key, shift_key, refer_comp);
				}

				if (bubble_scope && !this._is_hotkey) {
					event_bubbles = this.on_fire_user_onkeydown(keycode, alt_key, ctrl_key, shift_key, this, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, this, refer_comp);
					this._is_hotkey = false;
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}
			if ((!this.onkeydown || (this.onkeydown && !this.onkeydown.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
			}
			if ((!this.onkeydown || (this.onkeydown && !this.onkeydown.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_keydown_basic_action = function () {
	};

	_pComponent.on_keydown_default_action = function () {
	};

	_pComponent._on_keyup = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp) {
		if (keycode == nexacro.Event.KEY_TAB) {
			if (!this._getDlgCode().want_tab) {
				return;
			}
		}

		var ret = this._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, true);
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onkeyup || (pThis.onkeyup && !pThis.onkeyup.defaultprevented))) {
			this.on_keyup_default_action(keycode, alt_key, ctrl_key, shift_key, refer_comp);
			ret = this._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_keyup = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (this.visible && this._isEnable()) {
				if (bubble_scope) {
					this.on_keyup_basic_action(keycode, alt_key, ctrl_key, shift_key, refer_comp);
				}
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onkeyup(keycode, alt_key, ctrl_key, shift_key, this, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onkeyup(keycode, alt_key, ctrl_key, shift_key, this, refer_comp);
				}

				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}
			if ((!this.onkeyup || (this.onkeyup && !this.onkeyup.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onkeyup(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onkeyup(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
				}
			}
			if ((!this.onkeyup || (this.onkeyup && !this.onkeyup.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_keyup_basic_action = function () {
	};

	_pComponent.on_keyup_default_action = function () {
	};

	_pComponent._on_touchstart = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.ontouchstart;
		if (!listener || (listener && !listener.defaultprevented)) {
			this._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, false);
		}
	};

	_pComponent._on_bubble_touchstart = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_touchstart_basic_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
			}
			else {
				this.on_touchstart_default_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
			}

			if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble)) {
				var fire_event_func = is_userbubble ? this.on_fire_user_ontouchstart : this.on_fire_sys_ontouchstart;
				event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);

				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}

			listener = this.ontouchstart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));

				if (this._is_subcontrol) {
					return this.parent._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					var select_mode = "select";

					if (this.selectscrollmode) {
						if (this.selectscrollmode == "default") {
							select_mode = (nexacro._isTouchInteraction) ? "scroll" : "select";
						}
						else {
							select_mode = this.selectscrollmode;
						}
					}

					if (touchinfos.length == 1 && select_mode == "select") {
						var win = touch_manager._start_win;
						var elem = touch_manager._start_elem;

						nexacro._setDragInfo(win, elem, win._curWindowX, win._curWindowY, null, null);
					}
					return this.parent._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble)) {
				touch_manager.updateTouchInputInfosClientXY(touchinfos, this);

				var fire_event_func = is_userbubble ? this.on_fire_user_ontouchstart : this.on_fire_sys_ontouchstart;
				event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, fire_comp, refer_comp);
			}

			listener = this.ontouchstart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
				return this.parent._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_touchstart_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp) {
		var firsttouchinput = touch_manager.getFirstTouchInputInfo(changedtouchinfos);
		if (firsttouchinput) {
			if (this._use_pushed_status) {
				this._changeUserStatus("pushed", true);
			}

			if (nexacro._current_popups.length > 0) {
				nexacro._checkClosePopupComponent(refer_comp ? refer_comp : this, true);
			}

			var win = this._getWindow();
			if (this._is_track) {
				nexacro._setTrackInfo(win, this, win._curWindowX, win._curWindowY);
				return false;
			}

			if (this._is_repeat) {
				nexacro._setRepeatInfo(this, win, refer_comp, win._curWindowX, win._curWindowY, changedtouchinfos[0].canvasx, changedtouchinfos[0].canvasy);
				return true;
			}
		}
	};

	_pComponent.on_touchstart_default_action = function () {
	};

	_pComponent._on_touchmove = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.ontouchmove;
		if (!listener || (listener && !listener.defaultprevented)) {
			this._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, false);
		}
	};

	_pComponent._on_bubble_touchmove = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_touchmove_basic_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
			}
			else {
				this.on_touchmove_default_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
			}

			if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble)) {
				var fire_event_func = is_userbubble ? this.on_fire_user_ontouchmove : this.on_fire_sys_ontouchmove;
				event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);

				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}

			listener = this.ontouchmove;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
				if (this._is_subcontrol) {
					return this.parent._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					return this.parent._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble)) {
				touch_manager.updateTouchInputInfosClientXY(touchinfos, this);

				var fire_event_func = is_userbubble ? this.on_fire_user_ontouchmove : this.on_fire_sys_ontouchmove;
				event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);
			}

			listener = this.ontouchmove;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
				return this.parent._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_touchmove_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp) {
		var win = this._getWindow();
		var firsttouchinput = touch_manager.getFirstTouchInputInfo(changedtouchinfos);
		if (firsttouchinput) {
			var touch_elem = win._cur_touch_elem;

			if (firsttouchinput.target != touch_elem) {
				var elem_comp = win.findComponent(touch_elem, 0, 0)[0];

				if (elem_comp && elem_comp._isPushed()) {
					elem_comp._changeUserStatus("pushed", false);
				}
			}
		}
	};

	_pComponent.on_touchmove_default_action = function () {
	};

	_pComponent._on_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, true);

		var root_comp = this._getFromComponent(this);
		if (root_comp) {
			var listener = root_comp.ontouchend;
			if (!listener || (listener && !listener.defaultprevented)) {
				this._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, false);
			}
			if (listener && listener.defaultprevented) {
				return true;
			}
		}
	};

	_pComponent._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_touchend_basic_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
			}
			else {
				this.on_touchend_default_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
			}

			if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble)) {
				var fire_event_func = is_userbubble ? this.on_fire_user_ontouchend : this.on_fire_sys_ontouchend;
				event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);

				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}

			listener = this.ontouchstart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
				if (this._is_subcontrol) {
					return this.parent._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					return this.parent._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble)) {
				touch_manager.updateTouchInputInfosClientXY(touchinfos, this);

				var fire_event_func = is_userbubble ? this.on_fire_user_ontouchend : this.on_fire_sys_ontouchend;
				event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);
			}

			listener = this.ontouchstart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
				return this.parent._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_touchend_basic_action = function (touch_manager, touchinfos, changedtouchinfos) {
		var firsttouchinput = touch_manager.getFirstTouchInputInfo(changedtouchinfos);
		if (firsttouchinput) {
			if (this._use_pushed_status) {
				if (nexacro._isTouchInteraction) {
					this._changeUserStatus("pushed", false);
				}
				else {
					this._changeUserStatus("pushed", false);
					this._changeStatus("mouseover", false);
				}
			}
		}
	};

	_pComponent.on_touchend_default_action = function () {
	};

	_pComponent._on_tap = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

		if (!this._is_alive) {
			return;
		}

		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.ontap || (pThis.ontap && !pThis.ontap.defaultprevented))) {
			this._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
	};

	_pComponent._on_bubble_tap = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			var is_first = false;
			if (!refer_comp) {
				refer_comp = this._focus_refer_comp = this;
				if (!this._is_focus_accept) {
					this._focus_refer_comp = this._getFocusAcceptableComponent(this);
				}
				is_first = true;
			}

			if (is_userbubble) {
				if (is_first) {
					this.on_tap_basic_action(elem, canvasX, canvasY, screenX, screenY, refer_comp);
				}
			}
			else {
				this.on_tap_default_action(elem, canvasX, canvasY, screenX, screenY, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_ontap : this.on_fire_sys_ontap;
					event_bubbles = fire_event_func.call(this, elem, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.ontap;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					return this.parent._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable() && nexacro._enabletouchevent && this.enableevent) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				var fire_event_func = is_userbubble ? this.on_fire_user_ontap : this.on_fire_sys_ontap;
				event_bubbles = fire_event_func.call(this, elem, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
			}

			listener = this.ontap;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp) {
		var win = this._getWindow();
		if (this.visible && this._isEnable() && refer_comp) {
			if (!this._is_focus_accept) {
				this._focus_refer_comp._on_focus(true, "tap");
			}
			else {
				refer_comp._on_focus(true, "tap");
			}
		}
		else {
			var comp = win._findComponentForEvent(elem, 0, 0);
			if (comp && comp[0]) {
				comp[0]._on_focus(true, "tap");
			}
		}

		this._on_click(elem, "touch", false, false, false, canvasX, canvasY, screenX, screenY);
	};

	_pComponent.on_tap_default_action = function () {
	};

	_pComponent._on_dbltap = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.ondbltap;
		if (!listener || (listener && !listener.defaultprevented)) {
			this._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
	};

	_pComponent._on_bubble_dbltap = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_dbltap_basic_action(elem, canvasX, canvasY, screenX, screenY, refer_comp);
			}
			else {
				this.on_dbltap_default_action(elem, canvasX, canvasY, screenX, screenY, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_ondbltap : this.on_fire_sys_ondbltap;
					event_bubbles = fire_event_func.call(this, elem, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.ondbltap;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._is_subcontrol) {
					return this.parent._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					return this.parent._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable() && nexacro._enabletouchevent && this.enableevent) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				var fire_event_func = is_userbubble ? this.on_fire_user_ondbltap : this.on_fire_sys_ondbltap;
				event_bubbles = fire_event_func.call(this, elem, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
			}

			listener = this.ondbltap;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				return this.parent._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_dbltap_basic_action = function () {
	};

	_pComponent.on_dbltap_default_action = function () {
	};

	_pComponent._on_pinchstart = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom) {
		this._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onpinchstart;
		if (!listener || (listener && !listener.defaultprevented)) {
			if (this._isParentdefaultprevented(root_comp, "pinchstart")) {
				return true;
			}
			this._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, false);
		}
		if (listener && listener.defaultprevented) {
			return true;
		}
	};

	_pComponent._on_bubble_pinchstart = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_pinchstart_basic_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
			}
			else {
				this.on_pinchstart_default_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent))) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onpinchstart : this.on_fire_sys_onpinchstart;
					event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onpinchstart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, null, refer_comp, bZoom, is_userbubble);
				}
				else {
					return this.parent._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, this, refer_comp, bZoom, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent))) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onpinchstart : this.on_fire_sys_onpinchstart;
					event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, fire_comp, refer_comp);
				}
			}

			listener = this.onpinchstart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, fire_comp, refer_comp, bZoom, is_userbubble);
			}
		}
	};

	_pComponent.on_pinchstart_basic_action = function () {
	};

	_pComponent.on_pinchstart_default_action = function () {
	};

	_pComponent._on_pinch = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom) {
		this._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onpinch;
		if (!listener || (listener && !listener.defaultprevented)) {
			if (this._isParentdefaultprevented(root_comp, "pinch")) {
				return true;
			}
			this._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, false);
		}
		if (listener && listener.defaultprevented) {
			return true;
		}
	};

	_pComponent._on_bubble_pinch = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_pinch_basic_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
			}
			else {
				this.on_pinch_default_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent))) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onpinch : this.on_fire_sys_onpinch;
					event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, firstrange, currange, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onpinch;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, null, refer_comp, bZoom, is_userbubble);
				}
				else {
					return this.parent._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, this, refer_comp, bZoom, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent))) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onpinch : this.on_fire_sys_onpinch;
					event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, firstrange, currange, fire_comp, refer_comp);
				}
			}

			listener = this.onpinch;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, fire_comp, refer_comp, bZoom, is_userbubble);
			}
		}
	};

	_pComponent.on_pinch_basic_action = function () {
	};

	_pComponent.on_pinch_default_action = function () {
	};

	_pComponent._on_pinchend = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom) {
		this._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onpinchend;
		if (!listener || (listener && !listener.defaultprevented)) {
			this._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, false);
		}
	};

	_pComponent._on_bubble_pinchend = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_pinchend_basic_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
			}
			else {
				this.on_pinchend_default_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent))) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onpinchend : this.on_fire_sys_onpinchend;
					event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onpinchend;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, null, refer_comp, bZoom, is_userbubble);
				}
				else {
					return this.parent._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, this, refer_comp, bZoom, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent))) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onpinchend : this.on_fire_sys_onpinchend;
					event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, fire_comp, refer_comp);
				}
			}

			listener = this.onpinchend;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, fire_comp, refer_comp, bZoom, is_userbubble);
			}
		}
	};

	_pComponent.on_pinchend_basic_action = function () {
	};

	_pComponent.on_pinchend_default_action = function () {
	};

	_pComponent._on_flingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onflingstart;
		if (!listener || (listener && !listener.defaultprevented)) {
			if (this._isParentdefaultprevented(root_comp, "flingstart")) {
				return true;
			}
			this._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, false);
		}
		if (listener && listener.defaultprevented) {
			return true;
		}
	};

	_pComponent._on_bubble_flingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_flingstart_basic_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
			}
			else {
				this.on_flingstart_default_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onflingstart : this.on_fire_sys_onflingstart;
					event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onflingstart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					return this.parent._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onflingstart : this.on_fire_sys_onflingstart;
					event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, fire_comp, refer_comp);
				}
			}

			listener = this.onflingstart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track) {
				return this.parent._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_flingstart_basic_action = function () {
	};

	_pComponent.on_flingstart_default_action = function () {
	};

	_pComponent._on_fling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onfling;
		if (!listener || (listener && !listener.defaultprevented)) {
			if (this._isParentdefaultprevented(root_comp, "fling")) {
				return true;
			}
			this._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, false);
		}
		if (listener && listener.defaultprevented) {
			return true;
		}
	};

	_pComponent._on_bubble_fling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var pThis = this._getFromComponent(this);
		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_fling_basic_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
			}
			else {
				this.on_fling_default_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if ((!is_userbubble && (!pThis.onfling || (pThis.onfling && !pThis.onfling.defaultprevented)))
					 || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onfling : this.on_fire_sys_onfling;
					event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onfling;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					return this.parent._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if ((!is_userbubble && (!pThis.onfling || (pThis.onfling && !pThis.onfling.defaultprevented)))
					 || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onfling : this.on_fire_sys_onfling;
					event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, fire_comp, refer_comp);
				}
			}

			listener = this.onfling;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track) {
				return this.parent._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_fling_basic_action = function () {
	};

	_pComponent.on_fling_default_action = function () {
	};

	_pComponent._on_flingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onflingend;
		if (!listener || (listener && !listener.defaultprevented)) {
			this._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, false);
		}

		if (this instanceof nexacro.Form) {
			if (nexacro._OS == "iOS") {
				var _win = this._getWindow();
				var cur_focus_paths = _win.getCurrentFocusPaths();
				var focused_comp = cur_focus_paths[cur_focus_paths.length - 1];
				var input_elem = focused_comp._input_element;

				if (input_elem) {
					nexacro._deleteRefreshNode();
					nexacro._refreshCaret();
				}
			}
		}
		this._is_bubble_fling_v = undefined;
		this._is_bubble_fling_h = undefined;
	};

	_pComponent._on_bubble_flingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_flingend_basic_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
			}
			else {
				this.on_flingend_default_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onflingend : this.on_fire_sys_onflingend;
					event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onflingend;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					return this.parent._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onflingend : this.on_fire_sys_onflingend;
					event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, fire_comp, refer_comp);
				}
			}

			listener = this.onflingend;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track) {
				return this.parent._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_flingend_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) {
		var pThis = this;
		while ((!pThis._is_frame && !pThis._getScrollable()) || !pThis._isEnable()) {
			pThis = pThis.parent;
		}

		if (!pThis._is_frame) {
			var vscrollbartype = pThis._getVScrollBarType();
			var hscrollbartype = pThis._getHScrollBarType();

			if (pThis.vscrollbar && pThis.vscrollbar.visible && vscrollbartype == "autoindicator") {
				pThis.vscrollbar.set_visible(false);
			}

			if (pThis.hscrollbar && pThis.hscrollbar.visible && hscrollbartype == "autoindicator") {
				pThis.hscrollbar.set_visible(false);
			}
		}
	};

	_pComponent.on_flingend_default_action = function () {
	};

	_pComponent._on_longpress = function (elem, touchinfos, event_bubbles, fire_comp, refer_comp) {
		this._on_bubble_longpress(elem, touchinfos, event_bubbles, fire_comp, refer_comp, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onlongpress;
		if (!listener || (listener && !listener.defaultprevented)) {
			this._on_bubble_longpress(elem, touchinfos, event_bubbles, fire_comp, refer_comp, false);
		}
	};

	_pComponent._on_bubble_longpress = function (elem, touchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_longpress_basic_action(elem, touchinfos, refer_comp);
			}
			else {
				this.on_longpress_default_action(elem, touchinfos, refer_comp);
			}

			if (this.visible && this._isEnable() && (!is_userbubble || (is_userbubble && this.enableevent))) {
				var fire_event_func = is_userbubble ? this.on_fire_user_onlongpress : this.on_fire_sys_onlongpress;
				event_bubbles = fire_event_func.call(this, elem, touchinfos, this, refer_comp);

				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}

			listener = this.onlongpress;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_longpress(elem, touchinfos, event_bubbles, null, refer_comp, is_userbubble);
				}
				else {
					return this.parent._on_bubble_longpress(elem, touchinfos, false, this, refer_comp, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable() && (!is_userbubble || (is_userbubble && this.enableevent))) {
				var fire_event_func = is_userbubble ? this.on_fire_user_onlongpress : this.on_fire_sys_onlongpress;
				event_bubbles = fire_event_func.call(this, elem, touchinfos, fire_comp, refer_comp);
			}

			listener = this.onlongpress;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_longpress(elem, touchinfos, false, fire_comp, refer_comp, is_userbubble);
			}
		}
	};

	_pComponent.on_longpress_basic_action = function () {
	};

	_pComponent.on_longpress_default_action = function (elem, touchinfos, refer_comp) {
		var win = this._getWindow();
		if (this.visible && this._isEnable() && refer_comp) {
			refer_comp._on_focus(true, "longpress");
		}
		else {
			var comp = win._findComponentForEvent(elem, 0, 0);
			if (comp && comp[0]) {
				comp[0]._on_focus(true, "longpress");
			}
		}
	};

	_pComponent._on_slidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll) {
		this._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onslidestart;
		if (!listener || (listener && !listener.defaultprevented)) {
			if (this._isParentdefaultprevented(root_comp, "slidestart")) {
				return true;
			}

			this._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, false);
		}
		if (listener && listener.defaultprevented) {
			return true;
		}
	};

	_pComponent._on_bubble_slidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_slidestart_basic_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
			}
			else {
				this.on_slidestart_default_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onslidestart : this.on_fire_sys_onslidestart;
					event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onslidestart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, null, refer_comp, bScroll, is_userbubble);
				}
				else {
					return this.parent._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, this, refer_comp, bScroll, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onslidestart : this.on_fire_sys_onslidestart;
					event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, fire_comp, refer_comp);
				}
			}

			listener = this.onslidestart;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, fire_comp, refer_comp, bScroll, is_userbubble);
			}
		}
	};

	_pComponent.on_slidestart_basic_action = function () {
	};

	_pComponent.on_slidestart_default_action = function () {
	};

	_pComponent._on_slide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll) {
		this._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onslide;
		if (!listener || (listener && !listener.defaultprevented)) {
			if (this._isParentdefaultprevented(root_comp, "slide")) {
				return true;
			}
			this._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, false);
		}
		if (listener && listener.defaultprevented) {
			return true;
		}
	};

	_pComponent._on_bubble_slide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var pThis = this._getFromComponent(this);
		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_slide_basic_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
			}
			else {
				this.on_slide_default_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if ((!is_userbubble && (!pThis.onslide || (pThis.onslide && !pThis.onslide.defaultprevented)))
					 || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onslide : this.on_fire_sys_onslide;
					event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onslide;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent) {
				if (this.parent._is_application) {
					if (!is_userbubble && touch_manager._scroll_comp == null && !nexacro._cur_track_info) {
						if (nexacro._allow_default_pinchzoom && xdeltavalue != 0 && Math.abs(xdeltavalue) > Math.abs(ydeltavalue)) {
							touch_manager._scroll_end = true;
							touch_manager._scroll_direction = (xdeltavalue > 0) ? -10 : 10;
						}
						else if (ydeltavalue != 0) {
							touch_manager._scroll_end = true;
							touch_manager._scroll_direction = (ydeltavalue > 0) ? -1 : 1;
						}
					}
					return;
				}

				if (this._is_subcontrol) {
					return this.parent._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, null, refer_comp, bScroll, is_userbubble);
				}
				else {
					return this.parent._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, this, refer_comp, bScroll, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if ((!is_userbubble && (!pThis.onslide || (pThis.onslide && !pThis.onslide.defaultprevented)))
					 || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onslide : this.on_fire_sys_onslide;
					event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, fire_comp, refer_comp);
				}
			}

			listener = this.onslide;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent) {
				if (this.parent._is_application) {
					if (!is_userbubble && touch_manager._scroll_comp == null && !nexacro._cur_track_info) {
						if (nexacro._allow_default_pinchzoom && xdeltavalue != 0 && Math.abs(xdeltavalue) > Math.abs(ydeltavalue)) {
							touch_manager._scroll_end = true;
							touch_manager._scroll_direction = (xdeltavalue > 0) ? -10 : 10;
						}
						else if (ydeltavalue != 0) {
							touch_manager._scroll_end = true;
							touch_manager._scroll_direction = (ydeltavalue > 0) ? -1 : 1;
						}
					}
					return;
				}

				return this.parent._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, fire_comp, refer_comp, bScroll, is_userbubble);
			}
		}
	};

	_pComponent.on_slide_basic_action = function () {
	};

	_pComponent.on_slide_default_action = function () {
	};

	_pComponent._on_slideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll) {
		this._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, true);

		var root_comp = this._getFromComponent(this);
		var listener = root_comp.onslideend;
		if (!listener || (listener && !listener.defaultprevented)) {
			this._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, false);
		}
	};

	_pComponent._on_bubble_slideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, is_userbubble) {
		if (!this._is_alive) {
			return;
		}

		var listener;
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if (is_userbubble) {
				this.on_slideend_basic_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
			}
			else {
				this.on_slideend_default_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
			}

			if (this.visible && this._isEnable()) {
				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onslideend : this.on_fire_sys_onslideend;
					event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, this, refer_comp);

					if (event_bubbles === false) {
						event_bubbles = undefined;
					}
				}
			}

			listener = this.onslideend;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, null, refer_comp, bScroll, is_userbubble);
				}
				else {
					return this.parent._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, this, refer_comp, bScroll, is_userbubble);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent)) {
					var fire_event_func = is_userbubble ? this.on_fire_user_onslideend : this.on_fire_sys_onslideend;
					event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, fire_comp, refer_comp);
				}
			}

			listener = this.onslideend;
			if ((!listener || (listener && !listener.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, fire_comp, refer_comp, bScroll, is_userbubble);
			}
		}
	};

	_pComponent.on_slideend_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp) {
		var pThis = this;
		while ((!pThis._is_frame && !pThis._getScrollable()) || !pThis._isEnable()) {
			pThis = pThis.parent;
		}

		if (!pThis._is_frame) {
			var is_fling = false;
			var touchsession = touch_manager._touch_session;

			if (touchsession && touchsession._cur_detector) {
				is_fling = touchsession._cur_detector._checkFlingOption();
			}

			if (!is_fling) {
				var vscrollbartype = pThis._getVScrollBarType();
				var hscrollbartype = pThis._getHScrollBarType();

				if (pThis.vscrollbar && pThis.vscrollbar.visible && vscrollbartype == "autoindicator") {
					pThis.vscrollbar.set_visible(false);
				}

				if (pThis.hscrollbar && pThis.hscrollbar.visible && hscrollbartype == "autoindicator") {
					pThis.hscrollbar.set_visible(false);
				}
			}
		}
	};

	_pComponent.on_slideend_default_action = function () {
	};


	_pComponent._on_accessibilitygesture = function (direction, event_bubbles, fire_comp, refer_comp) {
		var pThis = this;
		var ret = this._on_bubble_accessibilitygesture(direction, event_bubbles, fire_comp, refer_comp, true);

		if (!this._is_alive) {
			return ret;
		}


		if (!pThis.onaccessibilitygesture || (pThis.onaccessibilitygesture && !pThis.onaccessibilitygesture.defaultprevented)) {
			this.on_accessibilitygesture_default_action();
			ret = this._on_bubble_accessibilitygesture(direction, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pComponent._on_bubble_accessibilitygesture = function (direction, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}

			if ((this.visible && this._isEnable()) || (this.visible && nexacro._enableaccessibility && nexacro._accessibilitytype == 5)) {
				if (bubble_scope && !this._is_hotkey) {
					event_bubbles = this.on_fire_user_onaccessibilitygesture(direction, this, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onaccessibilitygesture(direction, this, refer_comp);
					this._is_hotkey = false;
				}
				if (event_bubbles === false) {
					event_bubbles = undefined;
				}
			}
			if ((!this.onaccessibilitygesture || (this.onaccessibilitygesture && !this.onaccessibilitygesture.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				if (this._is_subcontrol) {
					return this.parent._on_bubble_accessibilitygesture(direction, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
					return this.parent._on_bubble_accessibilitygesture(direction, false, this, refer_comp, bubble_scope);
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_onaccessibilitygesture(direction, fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_onaccessibilitygesture(direction, fire_comp, refer_comp);
				}
			}
			if ((!this.accessibilitygesture || (this.accessibilitygesture && !this.accessibilitygesture.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				return this.parent._on_bubble_accessibilitygesture(direction, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pComponent.on_accessibilitygesture_default_action = function () {
	};

	_pComponent._on_starttrack = nexacro._emptyFn;
	_pComponent._on_movetrack = nexacro._emptyFn;
	_pComponent._on_endtrack = nexacro._emptyFn;

	_pComponent._on_startrepeat = nexacro._emptyFn;
	_pComponent._on_repeat = nexacro._emptyFn;
	_pComponent._on_endrepeat = nexacro._emptyFn;

	_pComponent.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onclick && this.onclick._has_handlers) {
			var evt = new nexacro.ClickEventInfo(this, "onclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			var ret = this.onclick._fireEvent(this, evt);
			evt.destroy();
			evt = null;

			return ret;
		}
		return false;
	};

	_pComponent.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro._fireBeforeDblclick(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		if (this.ondblclick && this.ondblclick._has_handlers) {
			var evt = new nexacro.ClickEventInfo(this, "ondblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.ondblclick._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onkillfocus = function (newobj, newreferobj, from_comp, from_refer_comp) {
		if (this.onkillfocus && this.onkillfocus._has_handlers) {
			var evt = new nexacro.KillFocusEventInfo(this, "onkillfocus", newobj, newreferobj, from_comp, from_refer_comp);
			return this.onkillfocus._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onsetfocus = function (oldobj, oldreferobj, from_comp, from_refer_comp) {
		if (this.onsetfocus && this.onsetfocus._has_handlers) {
			var evt = new nexacro.SetFocusEventInfo(this, "onsetfocus", oldobj, oldreferobj, from_comp, from_refer_comp);
			return this.onsetfocus._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeydown && this.onkeydown._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
			return this.onkeydown._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeydown && this.onkeydown._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
			return this.onkeydown._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeydown && this.onkeydown._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
			return this.onkeydown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeyup && this.onkeyup._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
			return this.onkeyup._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeyup && this.onkeyup._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
			return this.onkeyup._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeyup && this.onkeyup._has_handlers) {
			var evt = new nexacro.KeyEventInfo(this, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
			return this.onkeyup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.InputEventInfo(this, "oninput");
			return this.oninput._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttondown._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttondown._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttonup._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttonup._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onrbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttondown._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onrbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttondown._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onrbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onrbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttonup._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onrbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttonup._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onrbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseup._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseup._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmousedown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmousedown._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmousedown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmousedown._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmousedown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmousedown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseenter && this.onmouseenter._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseenter", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseenter._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseenter && this.onmouseenter._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseenter", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseenter._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseenter && this.onmouseenter._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseenter", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseleave && this.onmouseleave._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseleave", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseleave._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseleave && this.onmouseleave._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseleave", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseleave._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseleave && this.onmouseleave._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmouseleave", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmousemove", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmousemove._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmousemove", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmousemove._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onmousemove", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmousemove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousewheel && this.onmousewheel._has_handlers) {
			var evt = new nexacro.MouseWheelEventInfo(this, "onmousewheel", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, wheelDeltaY, from_comp, from_refer_comp);
			return this.onmousewheel._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousewheel && this.onmousewheel._has_handlers) {
			var evt = new nexacro.MouseWheelEventInfo(this, "onmousewheel", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, wheelDeltaY, from_comp, from_refer_comp);
			return this.onmousewheel._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousewheel && this.onmousewheel._has_handlers) {
			var evt = new nexacro.MouseWheelEventInfo(this, "onmousewheel", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, wheelDeltaY, from_comp, from_refer_comp);
			return this.onmousewheel._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp) {
		if (this.ondrag && this.ondrag._has_handlers) {
			var dragData = this._getDragData();
			var evt = new nexacro.DragEventInfo(this, "ondrag", dragData, null, this, self_refer_comp, from_comp, refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return [this.ondrag._fireEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
		}
		return [false];
	};

	_pComponent.on_fire_sys_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp) {
		if (this.ondrag && this.ondrag._has_handlers) {
			var dragData = this._getDragData();
			var evt = new nexacro.DragEventInfo(this, "ondrag", dragData, null, this, self_refer_comp, from_comp, refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return [this.ondrag._fireSysEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
		}
		return [false];
	};

	_pComponent.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp) {
		if (this.ondrag && this.ondrag._has_handlers) {
			var dragData = this._getDragData();
			var evt = new nexacro.DragEventInfo(this, "ondrag", dragData, null, this, self_refer_comp, from_comp, refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return [this.ondrag._fireUserEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
		}
		return [false];
	};

	_pComponent.on_fire_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondrop && this.ondrop._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondrop", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondrop._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondrop && this.ondrop._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondrop", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondrop._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondrop && this.ondrop._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondrop", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondrop._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragenter && this.ondragenter._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragenter", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragenter._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragenter && this.ondragenter._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragenter", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragenter._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragenter && this.ondragenter._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragenter", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragleave && this.ondragleave._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragleave", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragleave._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragleave && this.ondragleave._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragleave", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragleave._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragleave && this.ondragleave._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragleave", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragmove && this.ondragmove._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragmove", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragmove._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragmove && this.ondragmove._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragmove", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragmove._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragmove && this.ondragmove._has_handlers) {
			var evt = new nexacro.DragEventInfo(this, "ondragmove", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.ondragmove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onmove = function (left, top) {
		if (this.onmove && this.onmove._has_handlers) {
			var evt = new nexacro.MoveEventInfo(this, "onmove", left, top);
			return this.onmove._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onsize = function (width, height) {
		if (this.onsize && this.onsize._has_handlers) {
			var evt = new nexacro.SizeEventInfo(this, "onsize", width, height);
			return this.onsize._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_oncontextmenu = function (from_comp, from_refer_comp) {
		if (this.oncontextmenu && this.oncontextmenu._has_handlers) {
			var evt = new nexacro.ContextMenuEventInfo(this, "oncontextmenu", from_comp, from_refer_comp);
			return this.oncontextmenu._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_oncontextmenu = function (from_comp, from_refer_comp) {
		if (this.oncontextmenu && this.oncontextmenu._has_handlers) {
			var evt = new nexacro.ContextMenuEventInfo(this, "oncontextmenu", from_comp, from_refer_comp);
			return this.oncontextmenu._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_oncontextmenu = function (from_comp, from_refer_comp) {
		if (this.oncontextmenu && this.oncontextmenu._has_handlers) {
			var evt = new nexacro.ContextMenuEventInfo(this, "oncontextmenu", from_comp, from_refer_comp);
			return this.oncontextmenu._fireSysEvent(this, evt);
		}
		return true;
	};

	_pComponent.on_fire_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchstart && this.ontouchstart._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchstart._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchstart && this.ontouchstart._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchstart._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchstart && this.ontouchstart._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchstart._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchmove && this.ontouchmove._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchmove._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchmove && this.ontouchmove._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchmove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchmove && this.ontouchmove._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchmove._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchend && this.ontouchend._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchend._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchend && this.ontouchend._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchend._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this.ontouchend && this.ontouchend._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			return this.ontouchend._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_ontap = function () {
		return false;
	};

	_pComponent.on_fire_user_ontap = _pComponent.on_fire_ontap;

	_pComponent.on_fire_sys_ontap = function () {
		return true;
	};

	_pComponent.on_fire_ondbltap = function () {
		if (this.ondbltap && this.ondbltap._has_handlers) {
			var evt = new nexacro.TapEventInfo(this, "ondbltap");
			return this.ondbltap._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_ondbltap = _pComponent.on_fire_ondbltap;

	_pComponent.on_fire_sys_ondbltap = function (elem, screenX, screenY, canvasX, canvasY) {
		this._on_dblclick(elem, "touch", false, false, false, canvasX, canvasY, screenX, screenY);
		return true;
	};

	_pComponent.on_fire_onpinchstart = function () {
		return false;
	};

	_pComponent.on_fire_user_onpinchstart = function () {
		return false;
	};

	_pComponent.on_fire_sys_onpinchstart = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp) {
		if (this.onpinchstart && this.onpinchstart._has_handlers) {
			var evt = new nexacro.PinchEventInfo(this, "onpinchstart", touchinfos, accvalue, deltavalue, from_comp, from_refer_comp);
			return this.onpinchstart._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onpinch = function () {
		return false;
	};

	_pComponent.on_fire_user_onpinch = function () {
		return false;
	};

	_pComponent.on_fire_sys_onpinch = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, from_comp, from_refer_comp) {
		if (this instanceof nexacro.Form) {
			if (this._is_popup_control) {
				return true;
			}

			if (this.parent && this.parent instanceof nexacro.ChildFrame) {
				var zoom_amount = Math.abs(deltavalue) / (currange - firstrange);
				var zoom_dir = deltavalue > 0 ? 1 : -1;
				var zoom_delta = (1.0 + (zoom_dir * zoom_amount));
				var zoom_factor = this._getZoom() || 100;
				var before_zoom = zoom_factor;

				zoom_factor = zoom_factor * zoom_delta;

				if (!nexacro._allow_default_pinchzoom) {
					var current_screen = nexacro._getCurrentScreenID();
					if (current_screen) {
						var autofitted_zoom_factor = 100;
						if (this._autofittedZoomFactor !== undefined) {
							autofitted_zoom_factor = this._autofittedZoomFactor;
						}
					}
				}
				this._on_zoom(zoom_factor, this, from_refer_comp);
				return true;
			}
		}

		return false;
	};

	_pComponent.on_fire_onpinchend = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp) {
		if (this.onpinchend && this.onpinchend._has_handlers) {
			var evt = new nexacro.PinchEventInfo(this, "onpinchend", touchinfos, accvalue, deltavalue, from_comp, from_refer_comp);
			return this.onpinchend._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onpinchend = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp) {
		if (this.onpinchend && this.onpinchend._has_handlers) {
			var evt = new nexacro.PinchEventInfo(this, "onpinchend", touchinfos, accvalue, deltavalue, from_comp, from_refer_comp);
			return this.onpinchend._fireUserEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_sys_onpinchend = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp) {
		if (this.onpinchend && this.onpinchend._has_handlers) {
			var evt = new nexacro.PinchEventInfo(this, "onpinchend", touchinfos, accvalue, deltavalue, from_comp, from_refer_comp);
			return this.onpinchend._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onflingstart = function () {
		return false;
	};

	_pComponent.on_fire_user_onflingstart = function () {
		return false;
	};

	_pComponent.on_fire_sys_onflingstart = function (elem, touch_manager, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		if (touch_manager) {
			return true;
		}

		return this.on_fire_sys_onfling(elem, touch_manager, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);
	};

	_pComponent.on_fire_onfling = function () {
		return false;
	};

	_pComponent.on_fire_user_onfling = function () {
		return false;
	};

	_pComponent.on_fire_sys_onfling = function (elem, touch_manager, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue) {
		var hscrollbar = this.hscrollbar;
		var vscrollbar = this.vscrollbar;
		var dragscrolltype = this.dragscrolltype;
		var scroll_comp = touch_manager._scroll_comp;
		var scroll_mode = touch_manager._scroll_mode;

		var is_scrollable = this._getScrollable();

		if (scroll_comp) {
			if (scroll_comp != this) {
				return false;
			}
		}
		else {
			var can_hscroll = false;
			var can_vscroll = false;

			if (xdeltavalue != 0 && is_scrollable && hscrollbar && hscrollbar.enable && (dragscrolltype != "none" && dragscrolltype != "vert")) {
				if (xdeltavalue < 0) {
					if (hscrollbar.pos < hscrollbar.max) {
						can_hscroll = true;
					}
				}
				else {
					if (hscrollbar.pos > 0) {
						can_hscroll = true;
					}
				}
			}

			if (ydeltavalue != 0 && is_scrollable && vscrollbar && vscrollbar.enable && (dragscrolltype != "none" && dragscrolltype != "horz")) {
				if (ydeltavalue < 0) {
					if (vscrollbar.pos < vscrollbar.max) {
						can_vscroll = true;
					}
				}
				else {
					if (vscrollbar.pos > 0) {
						can_vscroll = true;
					}
				}
			}

			var scroll_mode = 0;
			if (this.dragscrolltype == "all" && (can_hscroll || can_vscroll)) {
				scroll_mode = 3;
			}
			else if (can_hscroll && can_vscroll) {
				if (Math.abs(ydeltavalue) < Math.abs(xdeltavalue)) {
					scroll_mode = 2;
				}
				else {
					scroll_mode = 1;
				}
			}
			else if (can_hscroll) {
				scroll_mode = 2;
			}
			else if (can_vscroll) {
				scroll_mode = 1;
			}

			if (this.selectscrollmode != undefined) {
				var select_mode;

				if (this.selectscrollmode == "default") {
					select_mode = (nexacro._isTouchInteraction) ? "scroll" : "select";
				}
				else {
					select_mode = this.selectscrollmode;
				}

				if (select_mode == "select") {
					scroll_mode = 0;
				}
			}

			if (scroll_mode > 0) {
				touch_manager._scroll_end = false;
				touch_manager._scroll_comp = this;
				touch_manager._scroll_mode = scroll_mode;
			}
			else {
				return false;
			}
		}

		if (scroll_mode > 0) {
			if (scroll_mode == 1 && scroll_mode != 3) {
				xdeltavalue = 0;
			}
			else if (scroll_mode == 2 && scroll_mode != 3) {
				ydeltavalue = 0;
			}

			var old_vpos = this._vscroll_pos;
			var old_hpos = this._hscroll_pos;

			if (xdeltavalue != 0 || ydeltavalue != 0) {
				this._scrollBy(-xdeltavalue, -ydeltavalue, true, false, undefined, "fling");
			}

			var new_vpos = this._vscroll_pos;
			var new_hpos = this._hscroll_pos;

			if (this._is_bubble_fling_v === undefined && this._is_bubble_fling_h === undefined) {
				if (old_vpos == new_vpos && old_hpos == new_hpos) {
					return false;
				}
				else {
					return true;
				}
			}

			if (xdeltavalue != 0 && ydeltavalue != 0) {
				if (this._is_bubble_fling_v && this._is_bubble_fling_h) {
					return false;
				}
			}
			else if (xdeltavalue != 0) {
				if (this._is_bubble_fling_h) {
					return false;
				}
			}
			else if (ydeltavalue != 0) {
				if (this._is_bubble_fling_v) {
					return false;
				}
			}
			return true;
		}

		return false;
	};

	_pComponent.on_fire_onflingend = function () {
		return false;
	};

	_pComponent.on_fire_user_onflingend = function () {
		return false;
	};

	_pComponent.on_fire_sys_onflingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		return this.on_fire_sys_onfling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);
	};

	_pComponent.on_fire_onlongpress = function () {
		return false;
	};

	_pComponent.on_fire_user_onlongpress = function (elem, touchinfos, from_comp, from_refer_comp) {
		if (nexacro._OS == "iOS") {
			if (this.oncontextmenu && this.oncontextmenu._has_handlers) {
				var evt = new nexacro.ContextMenuEventInfo(this, "oncontextmenu", from_comp, from_refer_comp);
				return this.oncontextmenu._fireEvent(this, evt);
			}
		}
		return false;
	};

	_pComponent.on_fire_sys_onlongpress = function (elem, touchinfos, from_comp, from_refer_comp) {
		if (this.onlongpress && this.onlongpress._has_handlers) {
			var evt = new nexacro.LongPressEventInfo(this, "onlongpress", touchinfos, from_comp, from_refer_comp);
			return this.onlongpress._fireSysEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_onslidestart = function () {
		return false;
	};

	_pComponent.on_fire_user_onslidestart = function () {
		return false;
	};

	_pComponent.on_fire_sys_onslidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		return this.on_fire_sys_onslide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp, true);
	};

	_pComponent.on_fire_onslide = function () {
		return false;
	};

	_pComponent.on_fire_user_onslide = function () {
		return false;
	};

	_pComponent.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp, start) {
		if (nexacro._cur_track_info) {
			if (nexacro._cur_track_info.target._no_slide_scroll == true) {
				return true;
			}
		}

		var scroll_comp = touch_manager._scroll_comp;
		var scroll_mode = touch_manager._scroll_mode;

		if (scroll_comp) {
			if (scroll_comp != this) {
				return false;
			}
		}
		else {
			var hscrollbar = this.hscrollbar;
			var vscrollbar = this.vscrollbar;
			var dragscrolltype = this.dragscrolltype;

			var select_mode;
			var can_hscroll = false;
			var can_vscroll = false;

			if (xdeltavalue != 0 && hscrollbar && hscrollbar.enable && (dragscrolltype != "none" && dragscrolltype != "vert")) {
				if (xdeltavalue < 0) {
					if (hscrollbar.pos < hscrollbar.max) {
						can_hscroll = true;
					}
				}
				else {
					if (hscrollbar.pos > 0) {
						can_hscroll = true;
					}
				}
			}

			if (this.stepselector) {
				can_hscroll = true;
			}

			if (ydeltavalue != 0 && vscrollbar && vscrollbar.enable && (dragscrolltype != "none" && dragscrolltype != "horz")) {
				if (ydeltavalue < 0) {
					if (vscrollbar.pos < vscrollbar.max) {
						can_vscroll = true;
					}
				}
				else {
					if (vscrollbar.pos > 0) {
						can_vscroll = true;
					}
				}
			}

			if (Math.abs(xaccvalue) < Math.abs(yaccvalue) && (Math.abs(xdeltavalue) <= 5)) {
				can_hscroll = false;
			}
			else if (Math.abs(xaccvalue) > Math.abs(yaccvalue) && (Math.abs(ydeltavalue) <= 5)) {
				can_vscroll = false;
			}

			if (dragscrolltype == "all" && (can_hscroll || can_vscroll)) {
				scroll_mode = 3;
			}
			else if (can_hscroll && can_vscroll) {
				if (Math.abs(ydeltavalue) < Math.abs(xdeltavalue)) {
					scroll_mode = 2;
				}
				else {
					scroll_mode = 1;
				}
			}
			else if (can_hscroll) {
				scroll_mode = 2;
			}
			else if (can_vscroll) {
				scroll_mode = 1;
			}
			else {
				scroll_mode = -1;
			}

			if (this.selectscrollmode != undefined) {
				if (this.selectscrollmode == "default") {
					select_mode = (nexacro._isTouchInteraction) ? "scroll" : "select";
				}
				else {
					select_mode = this.selectscrollmode;
				}

				if (select_mode == "select") {
					scroll_mode = 0;
				}
			}

			if (scroll_mode > 0) {
				scroll_comp = this;
				touch_manager._scroll_end = false;
				touch_manager._scroll_comp = this;
				touch_manager._scroll_mode = scroll_mode;
			}
			else {
				return false;
			}
		}

		if (this._getZoom) {
			var zoom_factor = this._getZoom();
			if (zoom_factor != 100) {
				xdeltavalue /= (zoom_factor / 100.0);
				ydeltavalue /= (zoom_factor / 100.0);
			}
		}

		var hscroll_pos = this._hscroll_pos;
		var vscroll_pos = this._vscroll_pos;

		if ((scroll_mode == 3 || scroll_mode == 2) && xdeltavalue != 0) {
			hscroll_pos -= xdeltavalue;
		}

		if ((scroll_mode == 3 || scroll_mode == 1) && ydeltavalue != 0) {
			vscroll_pos -= ydeltavalue;
		}

		var old_vpos = this._vscroll_pos;
		var old_hpos = this._hscroll_pos;

		this._scrollTo(hscroll_pos, vscroll_pos, true, false, undefined, "slide");
		var new_vpos = this._vscroll_pos;
		var new_hpos = this._hscroll_pos;

		if (start) {
			this._is_bubble_fling_v = false;
			this._is_bubble_fling_h = false;

			if (xdeltavalue != 0 && ydeltavalue != 0) {
				if (old_vpos == new_vpos && old_hpos == new_hpos) {
					this._is_bubble_fling_v = true;
					this._is_bubble_fling_h = true;
				}
				else if (old_hpos == new_hpos) {
					this._is_bubble_fling_h = true;
				}
				else if (old_vpos == new_vpos) {
					this._is_bubble_fling_v = true;
				}
			}
			else if (xdeltavalue != 0) {
				if (old_hpos == new_hpos) {
					this._is_bubble_fling_h = true;
				}
			}
			else if (ydeltavalue != 0) {
				if (old_vpos == new_vpos) {
					this._is_bubble_fling_v = true;
				}
			}
		}
		return true;
	};

	_pComponent.on_fire_onslideend = function () {
		return false;
	};

	_pComponent.on_fire_user_onslideend = function () {
		return false;
	};

	_pComponent.on_fire_sys_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		return this.on_fire_sys_onslide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp, false);
	};

	_pComponent.on_fire_onzoom = function () {
		return false;
	};

	_pComponent.on_fire_user_onzoom = function () {
		return false;
	};

	_pComponent.on_fire_sys_onzoom = function () {
		return false;
	};

	_pComponent.on_fire_onorientationchange = function (orientation) {
		if (this.onorientationchange && this.onorientationchange._has_handlers) {
			var evt = new nexacro.OrientationChangeEventInfo(this, "onorientationchange", orientation);
			return this.onorientationchange._fireEvent(this, evt);
		}
		return false;
	};

	_pComponent.on_fire_user_onaccessibilitygesture = function () {
	};

	_pComponent.on_fire_sys_onaccessibilitygesture = function () {
	};

	delete _pComponent;
}
