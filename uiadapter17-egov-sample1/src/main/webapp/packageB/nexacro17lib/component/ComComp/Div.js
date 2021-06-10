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

if (!nexacro.Div) {
	nexacro.Div = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.form = new nexacro._InnerForm("form", 0, 0, width, height, null, null, null, null, null, null, this);
	};

	var _pDiv = nexacro._createPrototype(nexacro.Component, nexacro.Div);
	nexacro.Div.prototype = _pDiv;
	_pDiv._type_name = "Div";


	_pDiv._cell_elem = null;


	_pDiv.async = true;
	_pDiv.url = "";
	_pDiv.urlchangeeffect = "";
	_pDiv.text = "";
	_pDiv.textAlign = "center";
	_pDiv.verticalAlign = "middle";


	_pDiv._urlchangeeffect = null;


	_pDiv._apply_client_padding = false;
	_pDiv._is_simple_control = true;
	_pDiv._is_container = true;


	_pDiv.accessibilityrole = "form";

	_pDiv._event_list = {
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"onkeypress" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmousewheel" : 1, 
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondrop" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"oncontextmenu" : 1, 
		"onvscroll" : 1, 
		"onhscroll" : 1, 
		"onmouseup" : 1, 
		"onmousedown" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};

	_pDiv.on_create_contents = function () {
		if (!this.url) {
			this.form.createComponent(true);
		}
	};

	_pDiv._applyElementVisible = function (v) {
		this._control_element.setElementDisplay(v ? "" : "none");
	};

	_pDiv.on_created_contents = function (win) {
		var form = this.form;

		if (!this.url) {
			form.on_created(win);
		}
		else {
			if (this.url && form._is_loaded && !form._is_created) {
				form.createComponent();
			}
		}

		this.on_apply_text();
		this._recalcLayout();
	};

	_pDiv.on_destroy_contents = function () {
		this._destroyTextElement();
		this._destroyFormControl();

		this._user_property_list = null;
	};

	_pDiv.on_create_contents_command = function () {
		var str = "";

		return str;
	};

	_pDiv.on_attach_contents_handle = function (win) {
		var form = this.form;

		if (!this.url) {
			form.on_created(win);
		}
		else {
			if (this.url && form._is_loaded && !form._is_created) {
				form.createComponent();
			}
		}

		this.on_apply_text();
		this._recalcLayout();
	};

	_pDiv.on_change_containerRect = function (width, height) {
		if (this._cell_elem) {
			this._cell_elem.setElementSize(width, height);
		}

		this._recalcLayout();
	};

	_pDiv.on_change_containerPos = function () {
	};

	_pDiv.on_apply_prop_enable = function (v) {
		if (this.form) {
			this.form._setEnable(v);
		}
	};

	_pDiv.on_get_css_assumedtypename = function () {
		return this._type_name;
	};

	_pDiv.on_apply_text = function (text) {
		var form = this.form;
		if (form && ((form._child_list && form._child_list.length > 0) || this.url) || !this._is_alive) {
			return;
		}

		var control_elem = form.getElement();
		if (control_elem) {
			if (!text) {
				text = this._displaytext;
			}

			var cell_elem = this._cell_elem;
			if (!cell_elem && text) {
				var win = this._getWindow();
				cell_elem = this._cell_elem = new nexacro.TextBoxElement(control_elem);
				cell_elem.create(win);
			}

			if (cell_elem) {
				cell_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
				cell_elem.setElementVerticalAlign(this.verticalAlign);
				cell_elem.setElementTextAlign(this.textAlign);
				cell_elem.setElementText(text);
			}
		}
	};

	_pDiv.set_url = function (v) {
		if (this.url != v) {
			this.url = v;
			this.on_apply_url();
		}
	};

	_pDiv.on_apply_url = function (reload) {
		var form = this.form;
		if (!form) {
			return;
		}

		var url = this.url;
		if (url && url.length > 0) {
			nexacro._getLayoutManager().clearLayout(form);

			if (form._is_loaded && reload != true) {
				var confirm_message = form._on_beforeclose();
				if (form._checkAndConfirmClose(confirm_message) == false) {
					return;
				}

				form._on_close();
				form.set_tooltiptext("");
			}

			var _parent = this.parent;
			if (_parent != null) {
				while (!_parent._url) {
					_parent = _parent.parent;
				}

				form.loadForm(url, this.async, true, _parent._url);
			}

			this._destroyTextElement();
		}
		else {
			if (form._is_loaded) {
				var confirm_message = form._on_beforeclose();
				if (form._checkAndConfirmClose(confirm_message) == false) {
					return;
				}
				form._on_close();
				form.set_tooltiptext("");
			}

			this._destroyFormControl();

			var pos = this._getFormPosition();
			form = this.form = new nexacro._InnerForm("form", pos.left, pos.top, pos.width, pos.height, null, null, null, null, null, null, this);
			form.createComponent();

			this._destroyTextElement();

			this.on_apply_text();
		}

		if (form.onactivate && form.onactivate._has_handlers) {
			var evt = new nexacro.ActivateEventInfo(form, "onactivate", true);
			form.onactivate._fireEvent(form, evt);
			evt = null;
		}
	};

	_pDiv.set_urlchangeeffect = function (v) {
		this.urlchangeeffect = v;
		if (v) {
			if (this._urlchangeeffect == null || this._urlchangeeffect.value != v) {
				var urlchangeeffect = nexacro.TransitionEffectObject(v);
				this._urlchangeeffect = urlchangeeffect;
			}
		}
		else {
			if (this._urlchangeeffect) {
				this._urlchangeeffect = null;
			}
		}
	};

	_pDiv.set_async = function (v) {
		v = nexacro._toBoolean(v);
		if (this.async != v) {
			this.async = v;
			if (this.form) {
				this.form._async = v;
			}
		}
	};

	_pDiv.set_padding = nexacro._emptyFn;

	_pDiv.reload = function () {
		this.on_apply_url(true);
	};

	_pDiv.getFocus = function () {
		return this.parent ? this.parent.getFocus() : null;
	};

	_pDiv.getParentContext = function () {
		return this.parent;
	};

	_pDiv.getSetter = function (name, fnname) {
		if (!this._user_property_list) {
			this._user_property_list = [];
		}
		this._user_property_list[name] = 1;
		if (!fnname) {
			fnname = "set_" + name;
		}
		var fn = this[fnname];
		if (fn) {
			return new nexacro.SetterBinder(this, name, fn);
		}
		return new nexacro.PropBinder(this, name);
	};

	_pDiv.getOwnerFrame = function () {
		return this._getOwnerFrame();
	};

	_pDiv.addChild = function (id, obj) {
		var form = this.form;
		var ret = form.addChild(id, obj);

		return ret;
	};

	_pDiv.insertChild = function (idx, id, obj) {
		var form = this.form;
		var ret = form.insertChild(idx, id, obj);

		return ret;
	};

	_pDiv.removeChild = function (id) {
		var obj = null;
		if (!this._is_alive && id === "form") {
			obj = this.form;
			if (obj) {
				var is_focused = false;
				var _window = this._getWindow();
				if (_window) {
					is_focused = (_window._indexOfCurrentFocusPaths(obj) > -1);
				}

				if (obj._control_element) {
					if (obj._control_element) {
						obj._control_element._removeFromContainer();
					}

					if (is_focused) {
						if (obj instanceof nexacro.Form) {
							obj._on_deactivate();
						}

						_window._removeFromCurrentFocusPath(obj, true);
					}
				}
			}

			obj.parent = null;
			delete this[id];
		}
		else {
			var form = this.form;
			obj = form.removeChild(id);
		}

		return obj;
	};

	_pDiv.addLayout = function (name, obj) {
		var form = this.form;
		if (form) {
			form.addLayout(name, obj);
		}
	};

	_pDiv._on_activate = function () {
		nexacro.Component.prototype._on_activate.call(this);

		if (this.form) {
			this.form._on_activate();
		}

		return true;
	};

	_pDiv._on_deactivate = function () {
		nexacro.Component.prototype._on_deactivate.call(this);

		if (this.form) {
			this.form._on_deactivate();
		}

		return true;
	};

	_pDiv._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp) {
		return this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
	};

	_pDiv._on_bubble_close = function (event_bubbles, fire_comp, refer_comp) {
		return this.parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
	};

	_pDiv._clearUserFunctions = nexacro._emptyFn;

	_pDiv._loadedForm = nexacro._emptyFn;

	_pDiv._destroyTextElement = function () {
		if (this._cell_elem) {
			this._cell_elem.destroy();
			this._cell_elem = null;
		}
	};

	_pDiv._destroyFormControl = function () {
		if (this.form) {
			this.form._destroy();
			this.form = null;
		}
	};

	_pDiv._loadInclude = function (mainurl, url) {
		var asyncmode = this.async;
		if (!this._is_created) {
			if (!this.parent || !this.parent._is_created) {
				asyncmode = true;
			}
		}

		this._loadIncludeJS.call(this, mainurl, url, asyncmode);
	};

	_pDiv._loadIncludeJS = function (mainurl, url, asyncmode) {
		var service = nexacro._getServiceObject(url);
		this._load_manager.loadIncludeModule(url, null, asyncmode, service);
	};

	_pDiv._closeForm = function () {
		this._destroyFormControl();
	};

	_pDiv._recalcLayout = function () {
		var form = this.form;
		if (form) {
			var pos = this._getFormPosition();

			form._setPos(pos.left, pos.top);
			form._setSize(pos.width, pos.height);
		}
	};

	_pDiv._on_orientationchange = function (orientation) {
		if (this.form) {
			this.form._on_orientationchange(orientation);
		}
	};

	_pDiv._getFormPosition = function () {
		var left = 0;
		var top = 0;
		var width = 0;
		var height = 0;

		width = this._getClientWidth();
		height = this._getClientHeight();

		if (!this._is_initcssselector) {
			this._initCSSSelector();
		}

		var border = this._getCurrentStyleBorder();
		var border_l = 0, border_t = 0, border_r = 0, border_b = 0;

		if (border) {
			if (border.left) {
				border_l = border.left._width;
			}
			if (border.top) {
				border_t = border.top._width;
			}
			if (border.right) {
				border_r = border.right._width;
			}
			if (border.bottom) {
				border_b = border.bottom._width;
			}
		}

		left = 0;
		top = 0;

		return {
			left : left, 
			top : top, 
			width : width, 
			height : height
		};
	};

	_pDiv._getComponentsByTaborder = function () {
		if (!this.form._isEnable() || !this.form._child_list || this.form._child_list.length == 0) {
			return null;
		}

		return [this.form];
	};

	_pDiv._searchNextTabFocus = function (current, bSearchFromFirst, opt_force_cycle, filter_type) {
		var ret = nexacro.FormBase.prototype._searchNextTabFocus.call(this, current, bSearchFromFirst, opt_force_cycle, filter_type);

		if (bSearchFromFirst && ret && ret[0] === this.form) {
			return this.parent._searchNextTabFocus(this, undefined, undefined, filter_type);
		}

		return ret;
	};

	_pDiv._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, filter_type) {
		var ret = nexacro.FormBase.prototype._searchPrevTabFocus.call(this, current, bSearchFromLast, opt_force_cycle, filter_type);

		if (bSearchFromLast && ret && ret[0] === this.form) {
			return [this];
		}

		return ret;
	};

	_pDiv._getTabOrderNext = function (current, direction, filter_type) {
		return nexacro.FormBase.prototype._getTabOrderNext.call(this, current, direction, filter_type);
	};

	_pDiv._getTabOrderFirst = function (filter_type) {
		return nexacro.FormBase.prototype._getTabOrderFirst.call(this, filter_type);
	};

	_pDiv._getTabOrderLast = function (filter_type) {
		return nexacro.FormBase.prototype._getTabOrderLast.call(this, filter_type);
	};

	delete _pDiv;

	if (!nexacro._InnerForm) {
		nexacro._InnerForm = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
			nexacro.Form.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		};

		var _pInnerForm = nexacro._createPrototype(nexacro.Form, nexacro._InnerForm);
		nexacro._InnerForm.prototype = _pInnerForm;
		_pInnerForm._type_name = "Form";

		_pInnerForm._is_subcontrol = false;

		_pInnerForm.on_created_contents = function (win) {
			nexacro.FormBase.prototype.on_created_contents.call(this, win);
			this._changeUserStatus("contents", true);
		};

		_pInnerForm.on_update_position = function (resize_flag, move_flag) {
			nexacro.Form.prototype.on_update_position.call(this, resize_flag, move_flag);
		};

		_pInnerForm.on_changeUserStatus = function (changestatus, value, applyuserstatus) {
			if (value) {
				return changestatus;
			}

			return applyuserstatus;
		};

		_pInnerForm._on_load = function (obj, url) {
			nexacro.Form.prototype._on_load.call(this, obj, url);

			this.parent.applyTransitionEffect();
		};

		_pInnerForm.set_url = function (v) {
			this.parent.set_url(v);
		};

		_pInnerForm.loadForm = function (formurl, async, reload, baseurl) {
			if (this._load_manager) {
				var url = nexacro._getFDLLocation(formurl, baseurl);

				var parent = this.parent;
				while (parent && !parent._is_frame) {
					if (parent._is_form) {
						var _p_url = parent._url;
						if (url == _p_url) {
							trace("[ERROR] can not use same url with parent form");
							return;
						}
					}
					parent = parent.parent;
				}

				this._url = url;

				this._base_url = nexacro._getBaseUrl(url);

				if (this._load_manager) {
					this._load_manager.clearAllLoad();
				}

				this._clearUserFunctions();

				this._is_loading = true;
				if (this.parent._is_frame && this.parent.form == this) {
					var application = nexacro.getApplication();
					if (application) {
						application._registerLoadforms(this);
					}
				}

				var service = nexacro._getServiceObject(formurl);

				if (this.parent._urlchangeeffect) {
					this.parent.beginTransitionEffect(this.parent._urlchangeeffect);
					this._load_manager._use_transition_effect = true;
				}
				this._load_manager.loadMainModule(url, undefined, async, reload, service);
			}
		};

		_pInnerForm.addChild = function (id, obj) {
			var ret = -1;

			if (id && id.length <= 0) {
				return -1;
			}
			if (!obj) {
				throw nexacro.MakeReferenceError(this, "reference_not_define", id);
			}

			if (this[id]) {
				throw nexacro.MakeNativeError(this, "native_exist_id", id);
			}

			if (!obj.id) {
				obj.id = obj.name = id;
			}

			obj.parent = this;
			obj._refform = this;

			this[id] = obj;
			this.all.add_item(id, obj);


			if (this.visible && !this._real_visible) {
				obj._real_visible = false;
			}
			else {
				obj._real_visible = this.visible;
			}

			if (obj._is_component) {
				ret = this.components.add_item(id, obj);
				this._child_list.push(obj);
				if (obj._is_alive && obj._is_created) {
					this._control_element.appendChildElement(obj.getElement());
				}
			}
			else if (obj instanceof nexacro.BindItem) {
				ret = this.binds.add_item(id, obj);
			}
			else {
				ret = this.objects.add_item(id, obj);
			}

			if (obj._is_component) {
				this.parent._destroyTextElement();
			}

			return ret;
		};

		_pInnerForm.insertChild = function (idx, id, obj) {
			var ret = nexacro.Form.prototype.insertChild.call(this, idx, id, obj);
			if (ret != -1) {
				if (obj._is_component) {
					this.parent._destroyTextElement();
				}
			}

			return ret;
		};

		_pInnerForm.removeChild = function (id) {
			var ret = nexacro.Form.prototype.removeChild.call(this, id);

			if (this.parent) {
				this.parent.on_apply_text();
			}

			return ret;
		};

		_pInnerForm.reload = function () {
			this.parent.reload();
		};

		_pInnerForm.getOwnerFrame = function () {
			var frame = null;
			if (this.parent && !(this.parent instanceof nexacro.Frame)) {
				frame = this.parent.getOwnerFrame();
			}
			else {
				frame = this.parent;
			}
			return frame;
		};

		_pInnerForm.getParentContext = function () {
			return this.parent.getParentContext();
		};

		_pInnerForm.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
			this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		};

		_pInnerForm.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
			this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		};

		_pInnerForm.on_fire_onhscroll = function (eventid, pos, strType, evtkind) {
			nexacro.Component.prototype.on_fire_onhscroll.call(this, eventid, pos, strType, evtkind);
			nexacro.Component.prototype.on_fire_onhscroll.call(this.parent, eventid, pos, strType, evtkind);
		};

		_pInnerForm.on_fire_onvscroll = function (eventid, pos, strType, evtkind) {
			nexacro.Component.prototype.on_fire_onvscroll.call(this, eventid, pos, strType, evtkind);
			nexacro.Component.prototype.on_fire_onvscroll.call(this.parent, eventid, pos, strType, evtkind);
		};

		delete _pInnerForm;
	}
}
