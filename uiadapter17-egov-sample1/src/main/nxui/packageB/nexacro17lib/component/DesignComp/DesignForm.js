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

if (!nexacro.DesignForm) {
	nexacro.isDesignMode = true;

	nexacro._getImageLocation = function (str, baseurl) {
		var url = str;
		return nexacro._getImageServiceLocation(url, baseurl);
	};

	nexacro._getImageServiceLocation = function (url, baseurl, typedefinition_url) {
		if (url.indexOf("::") < 0) {
			if (!typedefinition_url) {
				typedefinition_url = nexacro._typedefinition_url;
			}

			if (!baseurl) {
				baseurl = nexacro._project_url;
			}

			return nexacro._transurl(baseurl, typedefinition_url, url);
		}
		else {
			return nexacro.__getServiceLocation(url);
		}
	};

	nexacro._getImageSize = function (src, callbackFn, pThis, base_url, org_src) {
		if (!src) {
			return null;
		}
		if (src.substring(0, 4).toLowerCase() == "url(") {
			src = src.substring(5, src.length - 2);
		}

		var imgurl;
		if (src.substring(0, 10).toLowerCase() == "data:image") {
			var comma_idx = src.indexOf(",");
			if (comma_idx > -1) {
				var tmp = src.slice(comma_idx + 1, src.legnth);
				src = "data:image;base64," + tmp;
			}
			imgurl = src;
		}
		else {
			imgurl = nexacro._getImageLocation(src, base_url);
		}

		if (imgurl) {
			if (org_src) {
				org_src = org_src.toString();
				org_src = nexacro._getURIValue(org_src);
			}
			var service = nexacro._getServiceObject(org_src ? org_src : src);
			var servicecachelevel = "none";
			var serviceversion = service.version;
			if (service.cachelevel == "static" || service.cachelevel == "session") {
				var retval = nexacro._ImgInfoCacheList[imgurl];
				if (retval) {
					return retval;
				}
			}

			var loadItem = nexacro._CommunicationManager[imgurl];
			if (loadItem) {
				loadItem.appendCallback(pThis, callbackFn);
			}
			else {
				loadItem = new nexacro._CommunicationItem(imgurl, "image", false);
				nexacro._CommunicationManager[imgurl] = loadItem;
				loadItem.appendCallback(pThis, callbackFn);
				if (service) {
					if (service.cachelevel == "session") {
						servicecachelevel = "dynamic";
					}
					else {
						servicecachelevel = service.cachelevel;
					}
				}
				loadItem.handle = nexacro.__getImageSize(imgurl, nexacro.__bindLoadImageHandler(loadItem), servicecachelevel, serviceversion, false);
				var retval = nexacro._ImgInfoCacheList[imgurl];
				if (retval) {
					return retval;
				}
			}
			return null;
		}
	};




	if (nexacro.FormBase) {
		var _pFormBase = nexacro.FormBase.prototype;
		_pFormBase.loadForm = function (formurl, async, reload, baseurl) {
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
					_application._registerLoadforms(this);
				}

				var service = nexacro._getServiceObject(formurl);
				service.cachelevel = "none";
				async = false;
				var ret = this._load_manager.loadMainModule(url, undefined, async, reload, service);
			}
		};
		_pFormBase.registerScript = nexacro._emptyFn;
		delete _pFormBase;
	}
	;

	if (nexacro.Form) {
		var _pForm = nexacro.Form.prototype;
		_pForm.set_titletext = function (v) {
			this._setAccessibilityLabel(v);

			{

				if (this.titletext != v) {
					this.titletext = v;
				}
			}
		};

		_pForm.on_update_position = function (resize_flag, move_flag) {
			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementPosition(this._adjust_left, this._adjust_top);

				if (resize_flag && this instanceof nexacro._InnerForm) {
					var val = this._calcScrollMaxSize();
					control_elem.container_maxwidth = val.w;
					control_elem.container_maxheight = val.h;
				}


				control_elem.setElementSize(this._adjust_width, this._adjust_height);


				if (move_flag) {
					this.on_fire_onmove(this._adjust_left, this._adjust_top);
				}
				if (resize_flag) {
					this.on_fire_onsize(this._adjust_width, this._adjust_height);
				}
			}
		};

		delete _pForm;
	}


	if (nexacro.InputElement) {
		var _pInputElement = nexacro.InputElement.prototype;

		_pInputElement.setElementFocus = function () {
		};
		delete _pInputElement;
	}
	;

	if (nexacro._LoadManager) {
		var __pLoadManager = nexacro._LoadManager.prototype;
		if (__pLoadManager) {
			__pLoadManager.on_load_main = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri, extramsg) {
				if (url == this.main_url) {
					this.status = 2;
					this._main_handle = null;
					this._is_mainloaded = false;
					if (errstatus == 0 && module && typeof (module) == "function") {
						module.call(this.context);

						var obj = this.context;
						if (obj instanceof nexacro._InnerForm) {
							var win = obj._getWindow();
							var frame = obj.getOwnerFrame();
							if (frame.form instanceof nexacro.DesignForm) {
								var designform = frame.form;
								var extra_info = designform._getScopeName(obj);

								nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_div_urlload, designform.id, extra_info);
							}
						}
					}
					else {
						if (this.context == _application) {
							nexacro._onHttpSystemError(this.context, true, this.context, "0x80010006", url, returncode, requesturi, locationuri, extramsg);
							return;
						}
						else {
							if (this.context) {
								this.context._onHttpSystemError(this.context, true, this.context, fireerrorcode, url, returncode, requesturi, locationuri, extramsg);
							}

							nexacro._onHttpSystemError(this.context, true, this.context, fireerrorcode, url, returncode, requesturi, locationuri, extramsg);

							var obj = this.context;
							if (obj instanceof nexacro._InnerForm) {
								var win = obj._getWindow();
								var frame = obj.getOwnerFrame();
								if (frame.form instanceof nexacro.DesignForm) {
									var designform = frame.form;

									var parent = obj.parent;
									var extra_info = designform._getScopeName(parent);

									nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_div_httperror, designform.id, extra_info);
								}
							}
						}
					}
					this._is_mainloaded = true;
					this._check_fire_oninit();
				}
			};
		}
		;
		delete __pLoadManager;
	}
	;

	nexacro.__refreshDirtyWindow = function (_win_handle) {
		var win_handle = _win_handle;
		if (!win_handle) {
			win_handle = nexacro._getMainWindowHandle();
		}
		nexacro.__refreshDirtyRectWithCallBack(win_handle);
	};

	nexacro._appliedTitleBarHeight = function (frame, h) {
		return h;
	};

	nexacro._appliedStatusBarHeight = function (frame, h) {
		return h;
	};

	nexacro._setImageItemCache = function (url, width, height) {
		var imageurl = nexacro._getImageLocation(url);
		var imgcache = nexacro._getImageCacheMaps();
		if (imageurl && imgcache) {
			imgcache[imageurl] = {
				"width" : width, 
				"height" : height
			};
		}
	};

	nexacro._clearImageItemCache = function (url) {
		var imageurl = nexacro._getImageLocation(url);
		var imgcache = nexacro._getImageCacheMaps();
		if (imageurl && imgcache && imgcache[imageurl]) {
			imgcache[imageurl] = null;
			delete imgcache[imageurl];
		}
	};

	nexacro._clearImageCache = function () {
		nexacro._ImgInfoCacheList = {
		};
	};

	nexacro._CSSMapStringtoJson = function (mapdata) {
		eval(mapdata);
	};

	nexacro._updateCSSMapItem = function (parent, prop, value) {
		var valueobject = eval(value);
		var cssmap = nexacro._dimension_maps;

		var parents = parent.split(",");
		var parentlen = parents.length;
		var item = parents[0];

		if (!cssmap[item]) {
			for (var i = 0; i < parentlen; i++) {
				var item = parents[i];
				var childitem = parents[i + 1];
				if (childitem) {
					cssmap[item] = {
					};
					cssmap[item][childitem] = {
					};
					cssmap = cssmap[item];
				}
				else {
					cssmap[item][prop] = valueobject;
				}
			}
		}
		else {
			for (var i = 0; i < parentlen; i++) {
				var item = parents[i];
				var childitem = parents[i + 1];
				if (cssmap[item]) {
					if (cssmap[item][childitem]) {
						cssmap = cssmap[item];
					}
					else {
						if (childitem) {
							cssmap[item][childitem] = {
							};
							cssmap = cssmap[item];
						}
						else {
							cssmap[item][prop] = valueobject;
						}
					}
				}
				else {
					cssmap[item][prop] = valueobject;
				}
			}
		}
	};

	nexacro._deleteCSSMapItem = function (parent, prop) {
		var cssmap = nexacro._dimension_maps;

		var parents = parent.split(",");
		var parentlen = parents.length;
		var item = parents[0];
		item = item.trim();
		if (!cssmap[item]) {
			return;
		}

		for (var i = 0; i < parentlen; i++) {
			var item = parents[i];
			item = item.trim();
			if (cssmap[item]) {
				if (i == parentlen - 1) {
					if (prop) {
						cssmap[item][prop] = null;
						delete cssmap[item][prop];
					}
					else {
						cssmap[item] = null;
						delete cssmap[item];
					}
				}

				cssmap = cssmap[item];
			}
		}
	};


	nexacro._design_notify_layoutchange = 1;
	nexacro._design_notify_div_urlload = 2;
	nexacro._design_notify_div_httperror = 3;
	nexacro._design_notify_refresh_properties = 4;

	nexacro._design_sublayout_overlaycolor = nexacro.BackgroundObject("rgba(0,0,0,0.4)", this);

	nexacro._design_css_cache = new nexacro.Collection();
	nexacro._design_themeid_map = new nexacro.Collection();



	nexacro._getDesignCssContext = function (url) {
		if (!_application._css_context_cache) {
			return null;
		}

		var ar = _application._css_context_cache;
		var css_context = ar.get_item(url);

		return css_context;
	};

	nexacro._addDesignCssContext = function (context) {
		if (!_application._css_context_cache) {
			_application._css_context_cache = new nexacro.Collection();
		}


		var ar = _application._css_context_cache;
		ar.add_item(context._url, context);
	};

	nexacro._removeDesignCssContext = function (url) {
		var a = _application;
		if (!_application._css_context_cache) {
			return;
		}

		_application._css_context_cache.delete_item(url);
	};

	nexacro._updateDesignCssContext = function (cssurl) {
		nexacro._removeDesignCssContext(cssurl);

		_application._load_manager.localList = [];
		_application._load_manager.localCnt = 0;

		var css_context = new nexacro.DesignCssContext(cssurl);

		if (cssurl.indexOf(".xtheme") > 0) {
			nexacro._loadTheme2(cssurl, css_context);
		}
		else {
		}

		nexacro._addDesignCssContext(css_context);
		return css_context;
	};



	nexacro._on_load_cssmodule2 = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri) {
		var _load_manager = this;
		var load_Item = _load_manager.getLocalItem(url);
		if (load_Item) {
			var _handle = load_Item._handle;
			load_Item._handle = null;
			if (errstatus == 0 && module && typeof (module) == "function") {
				if (load_Item.type != "include") {
					var context = load_Item._context;
					if (!context) {
						context = _load_manager.context;
					}
					module.call(context);
				}
			}
			else {
				load_Item.errcode = errstatus;
				nexacro._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri, extramsg);
			}

			return;
		}
	};

	nexacro._loadTheme2 = function (themeid, context) {
		context._css_selectors = {
			_is_selector : true, 
			_has_items : false, 
			_has_attr_items : false
		};

		var curthemeid = themeid;
		var themename;
		var idx = curthemeid.indexOf(".xtheme");
		if (idx < 0) {
			themename = curthemeid;
		}
		else if (idx > 0) {
			themename = curthemeid.substring(0, idx);
		}

		var cssurl, base_url;
		if (themename) {
			var idx = themename.indexOf("::");
			if (idx > 0) {
				themename = themename.substring(idx + 2);
				nexacro._theme_uri = "./_theme_/" + themename;
			}
			else {
				nexacro._theme_uri = "./_theme_/" + themename;
			}

			cssurl = nexacro._theme_uri + "/theme.css";
			cssurl = nexacro._getServiceLocation(cssurl, base_url);
			cssurl += ".js";



			var service = nexacro._getServiceObject(cssurl);
			var _load_manager = _application._load_manager;
			var load_item;
		}
	};

	nexacro._on_load_thememodule2 = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri) {
		var _load_manager = this;
		var load_Item = _load_manager.getLocalItem(url);
		if (load_Item) {
			var _handle = load_Item._handle;
			load_Item._handle = null;
			if (errstatus == 0 && module && typeof (module) == "function") {
				if (load_Item.type != "include") {
					var context = load_Item._context;
					if (!context) {
						context = _load_manager.context;
					}
					module.call(context);
				}
			}
			else {
				load_Item.errcode = errstatus;
				nexacro._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri, extramsg);
			}

			return;
		}
	};

	nexacro._setInitValueID = function (obj, value) {
		if (obj) {
			obj.set_initvalueid(value);

			var fn = obj._type_name + value;

			if (nexacro_init[fn]) {
				nexacro_init[fn].call(obj, obj);
			}
		}
	};

	nexacro._setProperty = function (obj, propid, propval, pseudo) {
		if (!obj) {
			return;
		}

		var propids = propid.split(".");













		if (propval === null) {
			propval = undefined;
		}

		if (obj["design_set_" + propid]) {
			obj["design_set_" + propid](propval);
		}
		else if (obj["set_" + propid]) {
			if (propval === undefined) {
				if (propid == "left" || propid == "top" || propid == "width" || propid == "height" || propid == "right" || propid == "bottom") {
					obj["set_" + propid](null);
					var form = obj._getForm();
					if (form && form.resetScroll) {
						form.resetScroll();
					}
				}
				else {
					obj["set_" + propid](propval);
				}
			}
			else {
				if (propid == "left" || propid == "top" || propid == "width" || propid == "height" || propid == "right" || propid == "bottom") {
					obj["set_" + propid](propval);
					var form = obj._getForm();
					if (form && form.resetScroll) {
						form.resetScroll();
					}
				}
				else {
					obj["set_" + propid](propval);
				}
			}
		}
		else {
			obj.getSetter(propid).set(propval);
		}

		return true;
	};


	nexacro._getStyleProperty = function (obj, propid) {
		if (!obj) {
			return "";
		}



		var str;

		if (propid == "-nexa-text-align" || propid == "-nexa-vertical-align" || propid == "-nexa-text-decoration" || propid == "-nexa-word-wrap"
			 || propid == "-nexa-icon" || propid == "-nexa-icon-position") {
			var control_elem = obj.getElement();
			if (control_elem && control_elem.handle) {
				var child_elem = nexacro.__findElement(control_elem.handle, "nexacontentsbox");
				if (child_elem) {
					str = child_elem._getComputedStyleValue(propid);
					return str;
				}
			}
		}

		var control_elem = obj.getElement();
		if (control_elem) {
			str = control_elem._getComputedStyleValue(propid);
		}

		return str;
	};

	nexacro._getComputedStylePropertiesWithCallback = function (obj, propid, ret_handle) {
		if (!obj) {
			return "";
		}

		var control_elem = obj.getElement();

		return nexacro._getComputedStyleProperties(control_elem, propid, ret_handle);
	};
	nexacro._getComputedStyleProperties = function (control_elem, propid, ret_handle) {
		if (!control_elem || !control_elem.handle) {
			return "";
		}



		var propids = propid.split(",");
		var property_length = propids.length;
		var contents_elem_prop = "";
		var control_elem_prop = "";
		for (var i = 0; i < property_length; i++) {
			if (propids[i] == "-nexa-text-align" || propids[i] == "-nexa-vertical-align" || propids[i] == "-nexa-text-decoration" || propids[i] == "-nexa-word-wrap"
				 || propids[i] == "-nexa-icon" || propids[i] == "-nexa-icon-position") {
				contents_elem_prop += propids[i];
				contents_elem_prop += ",";
			}
			else {
				control_elem_prop += propids[i];
				control_elem_prop += ",";
			}
		}

		if (contents_elem_prop.length > 0) {
			var child_elem = nexacro.__findElement(control_elem.handle, "nexacontentsbox");
			if (child_elem) {
				contents_elem_prop = child_elem._getComputedStyleWithCallback(contents_elem_prop, ret_handle);
			}
			else {
				control_elem_prop = contents_elem_prop + control_elem_prop;
				contents_elem_prop = "";
			}
		}

		if (control_elem_prop.length > 0) {
			control_elem_prop = control_elem._getComputedStyleWithCallback(control_elem_prop, ret_handle);
		}

		var ret = "";
		if (contents_elem_prop.length > 0 && control_elem_prop.length > 0) {
			ret += contents_elem_prop;
			ret += ",";
			ret += control_elem_prop;
		}
		else {
			ret = contents_elem_prop + control_elem_prop;
		}

		return "{" + ret + "}";
	};

	nexacro._getProperty = function (obj, propid, pseudo) {
		if (!obj) {
			return "";
		}

		var ret = "";
		if (obj["design_get_" + propid]) {
			ret = obj["design_get_" + propid].call(obj);
		}
		else {
			ret = obj[propid];
		}

		return ret;
	};

	nexacro._getInlineStyleValue = function (comp) {
		if (!comp) {
			return "";
		}

		var str = "";

		var _style = comp.style;
		if (_style) {
			var _pStyle = nexacro.Style.prototype;
			for (prop in _style) {
				if (prop[0] == "_") {
					continue;
				}
				if (typeof (_style[prop]) == "function") {
					continue;
				}
				if (_style[prop] == null) {
					continue;
				}
				if (_pStyle[prop] == _style[prop]) {
					continue;
				}
				str += prop + ": " + _style[prop]._value + "; ";
			}
		}

		var pseudo_styles = comp._styles;
		if (pseudo_styles) {
			for (pseudo_style in pseudo_styles) {
				if (pseudo_style[0] == "_") {
					continue;
				}
				if (pseudo_style == "normal") {
					continue;
				}
				_style = pseudo_styles[pseudo_style];
				str += ":" + pseudo_style + " { ";
				for (prop in _style) {
					if (prop[0] == "_") {
						continue;
					}
					if (typeof (_style[prop]) == "function") {
						continue;
					}
					if (_style[prop] == null) {
						continue;
					}
					str += prop + ": " + _style[prop]._value + "; ";
				}
				str += " }; ";
			}
		}

		return str;
	};

	nexacro._getInlineStyleProperty = function (obj, propid, pseudo) {
		if (!obj) {
			return "";
		}

		var curobj = null;
		if (!pseudo) {
			curobj = obj.style;
		}
		else if (obj._styles[pseudo]) {
			curobj = obj._styles[pseudo];
		}

		var propids = propid.split(".");
		var property_length = propids.length;

		for (var i = 1; i < property_length; i++) {
			curobj = curobj[propids[i]];
			if (curobj == null) {
				return "";
			}
		}

		return curobj._value ? curobj._value : curobj;
	};

	nexacro._getCurrentStyleValue = function (obj, propid, pseudo) {
		if (!obj) {
			return "";
		}

		var propids = propid.split(".");
		var property_length = propids.length;
		if (property_length == 1 && propid == "style") {
			if (!pseudo) {
				pseudo = "normal";
			}

			var cur_pseudo = obj._pseudo;
			obj.setCurrentPseudo(pseudo);

			var curobj = obj.currentstyle;

			obj.setCurrentPseudo(cur_pseudo);

			if (curobj) {
				return curobj._value ? curobj._value : curobj;
			}
		}
		else if (property_length > 1 && propids[0] == "style") {
			var curobj = null;
			if (!pseudo) {
				curobj = obj.style;
			}
			else if (obj._styles[pseudo]) {
				curobj = obj._styles[pseudo];
			}

			var fn = obj["on_find_CurrentStyle_" + propids[1]];
			if (fn) {
				curobj = fn.call(obj, pseudo);
			}

			if (curobj == null) {
				return "";
			}
			else {
				for (var i = 2; i < property_length; i++) {
					curobj = curobj[propids[i]];
					if (curobj == null) {
						return "";
					}
				}
			}

			return curobj._value ? curobj._value : curobj;
		}

		return "";
	};

	nexacro._getBorderWidth = function (obj) {
		if (nexacro._isNull(obj)) {
			return [0, 0, 0, 0];
		}

		if (obj._getBorderWidth) {
			return obj._getBorderWidth();
		}

		return [0, 0, 0, 0];
	};




	nexacro.DesignForm = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		this._inner_form = null;
		this._root_left = 20;
		this._root_top = 20;
		this._scroll_horz = 0;
		this._scroll_vert = 0;
		this.inner_width = 0;
		this.inner_height = 0;


		this._dot_size_x = 0;
		this._dot_size_y = 0;

		this._sublayoutmode_stack = [];
		this._active_editing_form = null;

		this._outer_background_value = "#262626";
		this._inner_background_value = "#ffffff";

		nexacro.Form.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._onResetScrollBar = nexacro._emptyFn;

		this.set_border("0px none");

		this.init();

		this._is_preview_mode = false;
		this._is_subeditor_mode = false;

		this._filterGrid = null;
		this._loaded = false;
	};

	var _pDesignForm = nexacro._createPrototype(nexacro.Form, nexacro.DesignForm);
	nexacro.DesignForm.prototype = _pDesignForm;

	_pDesignForm._type_name = "Form";


	_pDesignForm.init = function () {
	};

	_pDesignForm.get_root_obj = function () {
		var _stack = this._sublayoutmode_stack;
		if (_stack && _stack.length > 0) {
			return _stack[_stack.length - 1].comp;
		}
		return this._inner_form;
	};

	_pDesignForm.get_step_count = function (rootobj) {
		if (!rootobj) {
			rootobj = this.get_root_obj();
		}

		var stepcount = 0;

		if (rootobj instanceof nexacro.Form) {
			var mlm = nexacro._getLayoutManager();
			var layout = mlm.getCurrentLayout(rootobj);
			if (layout) {
				stepcount = layout.stepcount ? layout.stepcount : 0;
			}
		}
		return stepcount;
	};

	_pDesignForm.get_step_width = function (bScale) {
		var stepwidth = 0;
		var rootobj = this.get_root_obj();

		if (rootobj) {
			stepwidth = rootobj._adjust_width;
			if (bScale) {
				var scale = this._getZoom() / 100;
				stepwidth *= scale;
				stepwidth = parseInt(stepwidth);
			}
		}

		return stepwidth;
	};

	_pDesignForm.get_owner_step_index = function (obj) {
		var positionstep = 0;
		var rootobj = this.get_root_obj();

		while (rootobj && obj && rootobj != obj.parent) {
			obj = obj.parent;
		}

		if (obj) {
			positionstep = obj.positionstep ? obj.positionstep : 0;
		}
		return positionstep;
	};


	_pDesignForm.drawWindow = function () {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__refreshDirtyRectWithCallBack(win.handle);
		}
	};

	_pDesignForm.getScale = function () {
		var scale = this._getZoom() / 100;

		return scale;
	};

	_pDesignForm._get_real_dot_size = function (measure, size, v) {
		if (measure == 0) {
			return size;
		}

		var form = this._inner_form;
		var formsize = eval("form._adjust_" + v);

		size = parseInt(formsize * size / 100);

		return size;
	};


	_pDesignForm.on_create_contents = function () {
		nexacro.Form.prototype.on_create_contents.call(this);
	};

	_pDesignForm.on_destroy_contents = function () {
		this.accessport = null;
		nexacro.Form.prototype.on_destroy_contents.call(this);
	};

	_pDesignForm.destroy = function () {
		if (this._inner_form) {
			this._inner_form.destroy();
			this._inner_form = null;
		}

		var design_frame = this.parent;
		if (design_frame._window) {
			design_frame._window.destroy();
		}

		design_frame.destroy();

		nexacro.Form.prototype.destroy.call(this);
	};

	_pDesignForm._init = function () {
		if (_application.accessport) {
			this._setEventHandler("oninit", this.on_notify_init, this);
		}
	};

	_pDesignForm._get_css_typename = function () {
		return "Form";
	};



	_pDesignForm.reloadForm = function () {
		this._loaded = false;

		var active_form = this._active_editing_form;
		if (active_form) {
			var elem = active_form._control_element;
			if (elem) {
				if (elem._step_containers) {
					var list = elem._step_containers;
					var list_len = list.length;
					for (var i = 0; i < list_len; i++) {
						var step_container_elem = list[i];
						step_container_elem.destroy();
					}
				}
			}
		}

		var inner_form = this._inner_form;
		if (inner_form) {
			inner_form.destroy();
		}

		this.inner_width = this.inner_height = 0;
		this._inner_form = null;
		this._createInnerForm();

		this.setOverflowClip(this._overflowclip);
	};

	_pDesignForm.loadedForm = function () {
	};
	_pDesignForm.setExtraInfo = function (info) {
		if (!info) {
			return;
		}

		var parent = this._inner_form;

		var flag;
		var arrinfo = info.split(",");
		for (var i in arrinfo) {
			flag = arrinfo[i].split(":");

			switch (flag[0]) {
				case "opentype":
					if (flag[1] == "subeditor") {
						this.setSubEditorMode(true);
					}
					break;
				case "opener":
					{

						this.opener = flag[1];
					}
					break;
				case "computedcomp":
					if (flag[1] == "nexacro.ListView") {
						_getFormatCellsStr = function () {
							var controls = nexacro.CellInfo.prototype._use_controls;
							var str = "<Cell id=\"ComputedCell\" left=\"0\" top=\"0\" bottom=\"0\" width=\"100%\"/>";
							for (var i = 0, n = controls.length; i < n; i++) {
								str += "<Cell id=\"Computed" + controls[i][0] + "Cell\" left=\"0\" top=\"0\" bottom=\"0\" width=\"100%\" text=\"\" displaytype=\"" + controls[i][0] + "\"/>";
							}
							return str;
						};

						var contents = "";
						contents += "<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row>1</Row></Rows>";

						var obj = new nexacro.Dataset("ComputedDataset", this);
						obj._setContents(contents);
						this.addChild("ComputedDataset", obj);

						obj.on_created();

						contents = "";
						contents += "<Formats><Format id=\"default\">";
						contents += "<Band id=\"body\" width=\"100%\" height=\"24\">";
						contents += _getFormatCellsStr();
						contents += "</Band>";
						contents += "<Band id=\"detail\" width=\"100%\" height=\"24\">";
						contents += _getFormatCellsStr();
						contents += "</Band></Format></Formats>";

						nexacro._makePropertyDesignSetter("_pListViewCellControl", nexacro.CellInfo.prototype._property_map);

						obj = new nexacro.ListView("ComputedListView", "0", "0", "0", "0", null, null, null, null, null, null, this);
						obj.set_binddataset("ComputedDataset");
						obj._setContents(contents);
						this.addChild("ComputedListView", obj);

						obj.createComponent();
					}
					break;
			}
		}
	};





	_pDesignForm.createComponentCSSPreview = function (classname, controlclassname, issubcontrol, parentid, left, top, width, height, compid, props, values, new_create, show) {
		try {
			var parent;
			if (parentid) {
				parent = this._getChild(parentid);
			}

			if (!parent) {
				parent = this._inner_form;
			}

			var compclassname = classname;
			if (!classname && controlclassname) {
				compclassname = controlclassname;
			}

			if (!compid || compid.length == 0) {
				compid = this._getNextChildID(parent, compclassname);
			}

			var classnameobj;
			if (compclassname == "nexacro.Tabpage") {
				classnameobj = eval("nexacro.Div");
			}
			else if (compclassname == "nexacro.DatePickerControl") {
				classnameobj = eval("nexacro.Calendar");
			}
			else if (compclassname == "nexacro.Step") {
				classnameobj = eval("nexacro.StepControl");
			}
			else {
				classnameobj = eval(compclassname);
			}

			if (classnameobj) {
				var obj = new classnameobj(compid, left, top, width, height, null, null, null, null, null, null, parent);

				if (issubcontrol == true && classname) {
					obj._setControl();
				}

				parent.addChild(compid, obj);

				if (compclassname == "nexacro.DatePickerControl") {
					obj.set_type("monthonly");
				}

				if (props && values) {
					var properties = props.split(".");
					var setvalues = values.split(".");
					var cnt = properties.length;
					for (var i = 0; i < cnt; i++) {
						if (obj["set_" + properties[i]]) {
							obj["set_" + properties[i]](setvalues[i]);
						}
					}
				}

				if (!show && obj.set_visible) {
					obj.set_visible(false);
				}

				obj.show();

				if (new_create && obj._createChild) {
					obj._createChild();
				}

				if (this._is_preview_mode) {
					obj.createCssDesignContents();
				}
				else if (new_create) {
					if (obj._initDesignDefaultProperty) {
						obj._initDesignDefaultProperty();
					}
				}

				if (parent._is_form && parent._is_scrollable) {
					parent._onRecalcScrollSize();
					parent._onResetScrollBar();
				}

				return obj.name;
			}

			return "";
		}
		catch (e) {
			if (e.obj) {
				nexacro.__onNexacroStudioError(e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);
				msg = "target::classname=" + classname + "," + "compid=" + compid + "\n" + msg;
				nexacro.__onNexacroStudioError(msg);
			}
		}
	};

	_pDesignForm.showComponentCSSPreview = function (compid, show) {
		var obj = this._getObject(compid);

		if (obj) {
			if (show) {
				obj.set_visible(true);
			}
			else {
				obj.set_visible(false);
			}
		}
	};

	_pDesignForm.createComponentByRect = function (classname, parentid, left, top, width, height, compid, new_create) {
		try {
			var parent;
			if (parentid) {
				parent = this._getChild(parentid);
			}

			if (!parent) {
				parent = this._inner_form;
			}

			if (!compid || compid.length == 0) {
				compid = this._getNextChildID(parent, classname);
			}

			var classnameobj;
			if (classname == "nexacro.Tabpage") {
				classnameobj = eval("nexacro.Div");
			}
			else if (classname == "nexacro.DatePickerControl") {
				classnameobj = eval("nexacro.Calendar");
			}
			else if (classname == "nexacro.Step") {
				classnameobj = eval("nexacro.StepControl");
			}
			else {
				classnameobj = eval(classname);
			}

			if (classnameobj) {
				var parentform = parent;
				if (parent instanceof nexacro.Div) {
					parentform = parent.form;
				}

				var obj = new classnameobj(compid, left, top, width, height, null, null, null, null, null, null, parentform);

				parent.addChild(compid, obj);

				if (classname == "nexacro.DatePickerControl") {
					obj.set_type("monthonly");
				}

				obj.show();

				if (new_create && obj._createChild) {
					obj._createChild();
				}

				if (this._is_preview_mode) {
					if (obj.createCssDesignContents) {
						obj.createCssDesignContents();
					}
				}
				else if (new_create) {
					if (obj._initDesignDefaultProperty) {
						obj._initDesignDefaultProperty();
					}
				}

				if (parent._is_form && parent._is_scrollable) {
					parent._onRecalcScrollSize();
					parent._onResetScrollBar();
				}

				return obj.name;
			}

			return "";
		}
		catch (e) {
			if (e.obj) {
				nexacro.__onNexacroStudioError(e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);
				msg = "target::classname=" + classname + "," + "compid=" + compid + "\n" + msg;
				nexacro.__onNexacroStudioError(msg);
			}
		}
	};

	_pDesignForm.createFrame = function (classname, parentid, frameid) {
		var parent = null;
		if (parentid) {
			parent = this._getObject(parentid);
		}

		if (!parent) {
			parent = this;
		}

		if (!frameid || frameid.length == 0) {
			frameid = this._getNextChildID(parent, classname);
		}

		var classnameobj = eval(classname);
		if (classnameobj) {
			var obj = null;


			if (classname == "nexacro.ChildFrame") {
				obj = new classnameobj(frameid, null, null, null, null, null, null, "", parent);
			}
			else {
				obj = new classnameobj(frameid, null, null, null, null, null, null, parent);
			}

			parent.addChild(frameid, obj);

			return frameid;
		}
	};

	_pDesignForm.createTabpage = function (classname, parentid, compid) {
		var parent;
		if (parentid) {
			parent = this._getChild(parentid);
		}

		if (!parent) {
			return;
		}

		if (!compid || compid.length == 0) {
			compid = this._getNextChildID(parent, classname);
		}

		if (parent instanceof nexacro.Tab) {
			parent.insertTabpage(compid, parent.getTabpageCount(), "", compid);
			return compid;
		}

		return;
	};

	_pDesignForm.createInvisibleObject = function (classname, objid) {
		try {
			if (!objid || objid.length == 0) {
				objid = this._getNextChildID(this._inner_form, classname);
			}

			var classnameobj = eval(classname);
			if (classnameobj) {
				var obj = new classnameobj(objid, this._inner_form);
				this._inner_form.addChild(objid, obj);
				obj.on_created();
				return obj.name;
			}
		}
		catch (e) {
			if (e.obj) {
				nexacro.__onNexacroStudioError(e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);
				msg = "target::classname=" + classname + "," + "objid=" + objid + "\n" + msg;
				nexacro.__onNexacroStudioError(msg);
			}
		}
	};

	_pDesignForm.getChildList = function (parentid) {
		var parent = this._getChild(parentid);
		if (!parent) {
			return "";
		}

		var chils_list = [];
		var childs = this._getChilds(parent);
		var child_len = childs ? childs.length : 0;
		for (var i = 0; i < child_len; i++) {
			var child = childs[i];
			if (!child) {
				continue;
			}

			chils_list.push(child.name);
		}
		return chils_list.join(",");
	};

	_pDesignForm.deleteObject = function (objid) {
		var obj = this._getChild(objid);
		if (!obj) {
			trace("> Not found objid: " + objid);
			return;
		}
		var parent = obj.parent;
		if (obj && parent) {
			if (this._is_preview_mode) {
				obj.destroyCssDesignContents();
			}

			if (obj.positionstep == -1) {
				var div_elem = obj._control_element;
				nexacro.__setElementHandleFixedStepNode(div_elem.handle, false);
			}

			parent.removeChild(obj.id);

			if (obj._is_component) {
				if (obj.destroy) {
					obj._destroy();
				}
			}
			else {
				if (obj.destroy) {
					obj.destroy();
				}

				delete obj;
			}

			if (parent._is_form && parent._is_scrollable) {
				parent._onRecalcScrollSize();
				parent._onResetScrollBar();
			}
		}
	};

	_pDesignForm.setProperty = function (compid, propid, propval, pseudo) {
		var obj = this._getObject(compid);
		if (obj) {
			if (propid == "id") {
				propid = "name";
			}

			if (propid == "name" && !(obj._is_component) && !(obj instanceof nexacro.BindItem)) {
				var parent_obj = obj.parent;
				var old_id = obj.name;
				var new_id = propval;

				if (parent_obj === null) {
					return;
				}

				var idx = parent_obj.objects.indexOf(old_id);
				if (idx < 0) {
					return;
				}
				parent_obj.objects.update_id(idx, new_id);

				parent_obj[old_id] = null;
				parent_obj[new_id] = obj;

				obj.set_id(new_id);
				obj.name = new_id;

				idx = parent_obj.all.indexOf(old_id);
				if (idx < 0) {
					return;
				}
				parent_obj.all.update_id(idx, new_id);

				return obj[propid];
			}

			var ret = nexacro._setProperty(obj, propid, propval, pseudo);
			if (ret === true) {
				if (obj["design_get_" + propid]) {
					return obj["design_get_" + propid]();
				}
				else {
					this._on_update_property(obj, propid);
					return obj[propid];
				}
			}
			else if (ret === null) {
				this._on_update_property(obj, propid);
				return;
			}
		}
		return "";
	};


	_pDesignForm.appendInlineStyleValue = function (base_value, append_value) {
		var style_value = null;
		if (append_value == null) {
			style_value = base_value;
		}
		else if (base_value == null) {
			style_value = append_value;
		}
		else {
			style_value = this._appendInlineStyleValue(base_value, append_value);
		}
		return style_value;
	};

	_pDesignForm.setLayoutStyle = function (compid, base_value, layout_value, sublayout_value) {
		var style_value = this.appendInlineStyleValue(base_value, layout_value);
		style_value = this.appendInlineStyleValue(style_value, sublayout_value);
		this.setProperty(compid, "style", style_value);
	};

	_pDesignForm.getProperty = function (compid, propid, pseudo) {
		var obj = this._getObject(compid);
		if (obj) {
			return nexacro._getProperty(obj, propid, pseudo);
		}
		return "";
	};

	_pDesignForm.getProperties = function (compids, propids) {
		var obj = null;
		var comp_id_list = compids.split(",");
		var comp_len = comp_id_list.length;
		var comps = [];
		for (var i = 0; i < comp_len; i++) {
			obj = this._getObject(comp_id_list[i]);
			if (obj) {
				comps.push(obj);
			}
		}

		comp_len = comps.length;

		var property_list = propids.split(",");
		var property_len = property_list.length;

		var ret = [];
		var value, value2;
		for (var i = 0; i < property_len; i++) {
			value = "";
			value2 = "";

			var propid = property_list[i];
			for (var j = 0; j < comp_len; j++) {
				obj = comps[j];
				if (!obj) {
					continue;
				}

				if (j == 0) {
					value = nexacro._getProperty(obj, propid);
				}
				else {
					value2 = nexacro._getProperty(obj, propid);

					if (value != value2) {
						value = "";
						break;
					}
				}
			}

			if (nexacro._isNull(value)) {
				value = "";
			}

			ret.push(propid + ":" + value);
		}

		return ret;
	};
	_pDesignForm.getStyleProperty = function (compid, propid, childelement) {
		var obj = this._getObject(compid);
		if (obj) {
			return nexacro._getStyleProperty(obj, propid);
		}
		return "";
	};

	_pDesignForm.getStyleProperties = function (compids, propids) {
		var obj = null;
		var comp_id_list = compids.split(",");
		var comp_len = comp_id_list.length;
		var comps = [];
		for (var i = 0; i < comp_len; i++) {
			obj = this._getObject(comp_id_list[i]);
			if (obj) {
				comps.push(obj);
			}
		}

		comp_len = comps.length;

		var property_list = propids.split(",");
		var property_len = property_list.length;

		var ret = [];
		var value, value2;
		for (var i = 0; i < property_len; i++) {
			value = "";
			value2 = "";

			var propid = property_list[i];
			for (var j = 0; j < comp_len; j++) {
				obj = comps[j];
				if (!obj) {
					continue;
				}

				if (j == 0) {
					value = nexacro._getStyleProperty(obj, propid);
				}
				else {
					value2 = nexacro._getStyleProperty(obj, propid);

					if (value != value2) {
						value = "";
						break;
					}
				}
			}

			if (nexacro._isNull(value)) {
				value = "";
			}

			ret.push(propid + ":" + value);
		}

		return ret;
	};
	_pDesignForm.getComputedStylePropertiesWithCallback = function (compid, propids, ret_handle) {
		var obj = this._getObject(compid);
		if (obj) {
			return nexacro._getComputedStylePropertiesWithCallback(obj, propids, ret_handle);
		}

		return "";
	};

	_pDesignForm.getComputedStyles = function (compid, args) {
		var obj = this._getObject(compid);
		if (obj && obj.getComputedStyles) {
			return obj.getComputedStyles(args);
		}

		return "";
	};

	_pDesignForm.getInlineStyleProperty = function (compid, propid, pseudo) {
		var obj = this._getChild(compid);
		if (!obj) {
			return "";
		}

		return nexacro._getInlineStyleProperty(obj, propid, pseudo);
	};

	_pDesignForm.getCurrentStyleValue = function (compid, propid, pseudo) {
		var obj = this._getObject(compid);
		if (obj) {
			return nexacro._getCurrentStyleValue(obj, propid, pseudo);
		}

		return "";
	};

	_pDesignForm.moveComponentByRect = function (compid, left, top, width, height, resize) {
		var obj = this._getChild(compid);
		return this._moveComponentByRect(obj, left, top, width, height, resize);
	};

	_pDesignForm._moveComponentByRect = function (obj, left, top, width, height, resize) {
		if (obj) {
			var form = obj._getForm();
			var root_form = obj._getRootForm();
			var owner_positionstep = this.get_owner_step_index(obj);
			var step_width = 0;
			if (owner_positionstep > 0 && obj.parent == root_form) {
				step_width = this._inner_form._adjust_width;
			}

			var parent = obj.parent;
			var sublayoutmode_info = this._findSubLayoutMode(obj);
			var offset_pos;
			if (sublayoutmode_info) {
				offset_pos = sublayoutmode_info.offset_pos;
			}

			var parent_client_width = parent._getInnerWidth();
			var parent_client_height = parent._getInnerHeight();

			obj._rePositioning(left, top, width, height, null, null, parent_client_width, parent_client_height);
			if (parent && parent._is_form && parent._is_scrollable) {
				parent._onRecalcScrollSize();
				parent._onResetScrollBar();
			}
			if (form && form.resetScroll) {
				form.resetScroll();
			}
		}
	};

	_pDesignForm.swapPositionUnit = function (compid, pos, unit) {
		var obj = this._getObject(compid);
		if (obj) {
			if (unit == "auto") {
				eval("obj.set_" + pos + "(\"auto\");");
				this.drawWindow();
			}
			else {
				this._swapPositionUnit(obj, pos, unit);
			}
		}
	};

	_pDesignForm.preChangePositionBase = function (compid, propid, targetcompid) {
		var obj = this._getObject(compid);
		if (obj && obj.parent) {
			var target = obj.parent[targetcompid];
			var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(obj);
			var calc_pos, distance;
			if (propid == "left") {
				if (target) {
					calc_pos = target._adjust_left + target._adjust_width;
				}
				else {
					calc_pos = step_logical_offset;
				}
				distance = obj._adjust_left - calc_pos;
				if (typeof obj.left == "string" && obj.left.indexOf("%") >= 0) {
					distance = obj._convToRate(distance, target ? target._adjust_width : (obj.parent ? obj.parent._adjust_width : 0));
					distance = distance.toFixed(2) + "%";
				}
				return distance;
			}
			else if (propid == "top") {
				if (target) {
					calc_pos = target._adjust_top + target._adjust_height;
				}
				else {
					calc_pos = 0;
				}
				distance = obj._adjust_top - calc_pos;
				if (typeof obj.top == "string" && obj.top.indexOf("%") >= 0) {
					distance = obj._convToRate(distance, target ? target._adjust_height : (obj.parent ? obj.parent._adjust_height : 0));
					distance = distance.toFixed(2) + "%";
				}
				return distance;
			}
			else if (propid == "right") {
				if (target) {
					calc_pos = target._adjust_left;
				}
				else {
					calc_pos = obj.parent ? obj.parent._adjust_width + step_logical_offset : step_logical_offset;
				}
				distance = calc_pos - (obj._adjust_left + obj._adjust_width);
				if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
					distance = obj._convToRate(distance, target ? target._adjust_width : (obj.parent ? obj.parent._adjust_width : 0));
					distance = distance.toFixed(2) + "%";
				}
				return distance;
			}
			else if (propid == "bottom") {
				if (target) {
					calc_pos = target._adjust_top;
				}
				else {
					calc_pos = obj.parent ? obj.parent._adjust_height : 0;
				}
				distance = calc_pos - (obj._adjust_top + obj._adjust_height);
				if (typeof obj.bottom == "string" && obj.bottom.indexOf("%") >= 0) {
					distance = obj._convToRate(distance, target ? target._adjust_height : (obj.parent ? obj.parent._adjust_height : 0));
					distance = distance.toFixed(2) + "%";
				}
				return distance;
			}
			else if (propid == "width") {
				distance = obj._convToRate(obj._adjust_width, target ? target._adjust_width : (obj.parent ? obj.parent._adjust_width : 0));
				distance = distance.toFixed(2) + "%";


				return distance;
			}
			else if (propid == "height") {
				distance = obj._convToRate(obj._adjust_height, target ? target._adjust_height : (obj.parent ? obj.parent._adjust_height : 0));
				distance = distance.toFixed(2) + "%";

				return distance;
			}
		}
		return "";
	};

	_pDesignForm.refreshPosition = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			function _restorePositionBase (obj, pos) {
				eval("var temp = obj." + pos + "base;\n"
					 + "obj." + pos + "base = \"\";\n"
					 + "obj.set_" + pos + "base(temp);\n"
				);
			}

			var _left = obj.left;
			var _top = obj.top;
			var _width = obj.width;
			var _height = obj.height;
			var _right = obj.right;
			var _bottom = obj.bottom;

			_restorePositionBase(obj, "left");
			_restorePositionBase(obj, "top");
			_restorePositionBase(obj, "width");
			_restorePositionBase(obj, "height");
			_restorePositionBase(obj, "right");
			_restorePositionBase(obj, "bottom");

			obj._init_position(_left, _top, _width, _height, _right, _bottom);

			var parent = obj.parent;
			if (parent && parent._is_form && parent._is_scrollable) {
				parent._onRecalcScrollSize();
				parent._onResetScrollBar();
			}
		}
	};

	_pDesignForm.fitToContents = function (compid, type) {
		var obj = this._getObject(compid);
		if (obj) {
			var old_left = obj.left;
			var old_top = obj.top;
			var old_width = obj.width;
			var old_height = obj.height;
			var old_right = obj.right;
			var old_bottom = obj.bottom;
			var old_type;

			var fittocontents = (type.length == 0) ? obj.fittocontents : type;
			var adjustWidth, adjustHeight, adjustRight, adjustBottom;

			old_type = obj.fittocontents;
			obj.fittocontents = fittocontents;
			size = obj._on_getFitSize();
			obj.fittocontents = old_type;

			if (fittocontents == "width" || fittocontents == "both") {
				adjustWidth = size[0];
			}
			else {
				adjustWidth = obj._adjust_width;
			}
			if (fittocontents == "height" || fittocontents == "both") {
				adjustHeight = size[1];
			}
			else {
				adjustHeight = obj._adjust_height;
			}

			adjustRight = obj.right;
			adjustBottom = obj.bottom;

			if (obj._minwidth != null) {
				if (adjustWidth < obj._minwidth) {
					adjustWidth = obj._minwidth;
				}
			}
			if (obj._maxwidth != null) {
				if (adjustWidth > obj._maxwidth) {
					adjustWidth = obj._maxwidth;
				}
			}
			if (obj._minheight != null) {
				if (adjustHeight < obj._minheight) {
					adjustHeight = obj._minheight;
				}
			}
			if (obj._maxheight != null) {
				if (adjustHeight > obj._maxheight) {
					adjustHeight = obj._maxheight;
				}
			}
			if (obj._adjustWidth == adjustWidth && obj._adjust_height == adjustHeight) {
				return null;
			}

			if (obj._adjustWidth != adjustWidth) {
				if (obj.width) {
					var target = obj._arrange_info ? obj._arrange_info["width"] : null;
					var targetObject = target ? obj._findComponentForArrange(target.compid) : null;
					if (typeof obj.width == "string" && obj.width.indexOf("%") >= 0) {
						adjustWidth = obj._convToRate(adjustWidth, targetObject ? targetObject._adjust_width : (obj.parent ? obj.parent._adjust_width : 0));
						adjustWidth = adjustWidth.toFixed(2) + "%";
					}
					if (target) {
						adjustWidth = target.compid + ":" + adjustWidth;
					}
				}
				else {
					var calc_pos, distance;
					var target = obj._arrange_info ? obj._arrange_info["right"] : null;
					var targetObject = target ? obj._findComponentForArrange(target.compid) : null;
					if (targetObject) {
						calc_pos = targetObject._adjust_left;
					}
					else {
						calc_pos = (obj.parent ? obj.parent._adjust_width : 0);
					}
					distance = calc_pos - (obj._adjust_left + adjustWidth);
					if (typeof obj.right == "string" && obj.right.indexOf("%") >= 0) {
						distance = obj._convToRate(distance, targetObject ? targetObject._adjust_width : (obj.parent ? obj.parent._adjust_width : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (target) {
						adjustRight = target.compid;
						adjustRight += ":";
						adjustRight += distance;
					}
					else {
						adjustRight = distance;
					}
				}
			}
			if (obj._adjust_height != adjustHeight) {
				if (obj.height) {
					var target = obj._arrange_info ? obj._arrange_info["height"] : null;
					var targetObject = target ? obj._findComponentForArrange(target.compid) : null;
					if (typeof obj.height == "string" && obj.height.indexOf("%") >= 0) {
						adjustHeight = obj._convToRate(adjustHeight, targetObject ? targetObject._adjust_height : (obj.parent ? obj.parent._adjust_height : 0));
						adjustHeight = adjustHeight.toFixed(2) + "%";
					}
					if (target) {
						adjustHeight = target.compid + ":" + adjustHeight;
					}
				}
				else {
					var calc_pos, distance;
					var target = obj._arrange_info ? obj._arrange_info["bottom"] : null;
					var targetObject = target ? obj._findComponentForArrange(target.compid) : null;
					if (targetObject) {
						calc_pos = targetObject._adjust_top;
					}
					else {
						calc_pos = (obj.parent ? obj.parent._adjust_height : 0);
					}
					distance = calc_pos - (obj._adjust_top + adjustHeight);
					if (typeof obj.bottom == "string" && obj.bottom.indexOf("%") >= 0) {
						distance = obj._convToRate(distance, targetObject ? targetObject._adjust_height : (obj.parent ? obj.parent._adjust_height : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (target) {
						adjustBottom = target.compid;
						adjustBottom += ":";
						adjustBottom += distance;
					}
					else {
						adjustBottom = distance;
					}
				}
			}

			if (old_left != obj.left
				 || old_top != obj.top
				 || old_width != adjustWidth
				 || old_height != adjustHeight
				 || old_right != adjustRight
				 || old_bottom != adjustBottom) {
				this._moveComponent(obj, obj.left, obj.top, adjustWidth, adjustHeight, adjustRight, adjustBottom);

				return [obj.left, obj.top, adjustWidth, adjustHeight, adjustRight, adjustBottom];
			}
		}

		return null;
	};


	_pDesignForm.moveComponent = function (compid, left, top, width, height, right, bottom) {
		var obj = this._getChild(compid);
		if (obj) {
			this._moveComponent(obj, left, top, width, height, right, bottom);
		}
	};

	_pDesignForm._moveComponent = function (obj, left, top, width, height, right, bottom) {
		if (obj instanceof nexacro.Tabpage) {
			return;
		}

		obj._init_position(left, top, width, height, right, bottom);

		var parent = obj.parent;
		if (parent && parent._is_form && parent._is_scrollable) {
			parent._onRecalcScrollSize();
			parent._onResetScrollBar();
		}
		var form = obj._getForm();
		if (form && form.resetScroll) {
			form.resetScroll();
		}
	};
	_pDesignForm.resizeComponent = function (compid, width, height) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.resize(width, height);
		}
	};

	_pDesignForm.hitTestByPoint = function (x, y, rootcompid, recursive) {
		var rootobj = this._getObject(rootcompid);
		if (rootobj) {
			var stepcount = this.get_step_count(rootobj);
			var stepwidth = this.get_step_width(true);

			var comps = this._getChildList(rootobj);
			var comp_len = comps ? comps.length : 0;

			for (var i = comp_len - 1; i >= 0; i--) {
				var comp = comps[i];
				if (!comp) {
					continue;
				}

				var _x = x;
				var _y = y;
				var hit = this._hitTestByPoint(comp, _x, _y);
				if (hit == false) {
					var positionstep = comp.positionstep ? comp.positionstep : 0;
					if (positionstep < 0) {
						for (var j = 1; j < stepcount; j++) {
							_x -= stepwidth;
							hit = this._hitTestByPoint(comp, _x, _y);
							if (hit) {
								break;
							}
						}
					}
				}

				if (hit) {
					if (!recursive) {
						return this._getScopeName(comp);
					}

					var url = comp.url;
					if (url || !recursive) {
						return this._getScopeName(comp);
					}

					var childs = this._getChildList(comp);
					var child_len = childs ? childs.length : 0;
					if (child_len > 0) {
						var hitchild = this.hitTestByPoint(_x, _y, this._getChildName(comp), true);
						if (hitchild === "") {
							hitchild = this._getScopeName(comp);
						}

						return hitchild;
					}
					else {
						return this._getScopeName(comp);
					}
				}
			}
		}

		return this._getScopeName(rootobj);
	};

	_pDesignForm.hitTestByRect = function (left, top, width, height, rootcompid, type) {
		var hitcomplist = "";
		var rootobj = this._getObject(rootcompid);
		if (rootobj) {
			var stepcount = this.get_step_count(rootobj);
			var stepwidth = this.get_step_width(true);

			var comps = this._getChildList(rootobj);
			var comp_len = comps.length;
			for (var i = comp_len - 1; i >= 0; i--) {
				var comp = comps[i];
				if (!comp) {
					continue;
				}

				var _left = left;
				var _top = top;
				var _width = width;
				var _height = height;

				var positionstep = comp.positionstep ? comp.positionstep : 0;

				var hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, type);
				if (hit == false) {
					if (positionstep < 0) {
						for (var j = 1; j < stepcount; j++) {
							_left -= stepwidth;
							hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, type);
							if (hit) {
								break;
							}
						}
					}
				}

				if (hit) {
					if (hitcomplist.length > 0) {
						hitcomplist += ",";
					}
					hitcomplist += this._getScopeName(comp);
				}

				var url = comp.url;
				if (url) {
					continue;
				}

				var childs = this._getChildList(comp);
				var child_len = childs ? childs.length : 0;
				if (child_len > 0) {
					var childlist = this.hitTestByRect(left, top, width, height, this._getChildName(comp), type);
					if (childlist && childlist.length > 0) {
						if (hitcomplist.length > 0) {
							hitcomplist += ",";
						}
						hitcomplist += childlist;
					}
					if (positionstep < 0) {
						_left = left;
						for (var j = 1; j < stepcount; j++) {
							_left -= stepwidth;
							childlist = this.hitTestByRect(_left, top, width, height, this._getChildName(comp), type);
							if (childlist && childlist.length > 0) {
								if (hitcomplist.length > 0) {
									hitcomplist += ",";
								}
								hitcomplist += childlist;
							}
						}
					}
				}
			}
		}

		return hitcomplist;
	};

	_pDesignForm.hitTestTracker = function (x, y, rootcompid, compid) {
		var obj = this._getObject(compid);
		var rootobj = this._getObject(rootcompid);

		return this._hitTestTracker(x, y, rootobj, obj);
	};

	_pDesignForm._hitTestTracker = function (x, y, rootcomp, comp) {
		if (comp) {
			var hit = false;
			var rect = this._getClientRect(comp);
			if (rect[0] - 7 <= x && x <= rect[0] + rect[2] + 7 && 
				rect[1] - 7 <= y && y <= rect[1] + rect[3] + 7) {
				hit = true;
			}

			if (!hit) {
				if (!rootcomp) {
					return;
				}

				if (!(rootcomp instanceof nexacro.Form)) {
					return;
				}

				var mlm = nexacro._getLayoutManager();
				var layout = mlm.getCurrentLayout(rootcomp);
				if (!layout) {
					return;
				}

				var stepcount = layout.stepcount ? layout.stepcount : 0;
				if (stepcount < 2) {
					return;
				}

				var stepwidth = rootcomp._adjust_width;
				var scale = this._getZoom() / 100;
				stepwidth *= scale;
				stepwidth = parseInt(stepwidth);

				var check_obj = comp;
				while (check_obj && check_obj.parent && rootcomp != check_obj.parent) {
					check_obj = check_obj.parent;
				}


				if (!check_obj) {
					return;
				}

				var positionstep = check_obj.positionstep ? check_obj.positionstep : 0;
				if (positionstep >= 0) {
					return;
				}

				if (positionstep < 0) {
					for (var j = 1; j < stepcount; j++) {
						rect[0] += stepwidth;
						if (rect[0] - 7 <= x && x <= rect[0] + rect[2] + 7 && 
							rect[1] - 7 <= y && y <= rect[1] + rect[3] + 7) {
							hit = true;
							break;
						}
					}
				}
			}

			if (hit) {
				return rect;
			}
		}

		return -1;
	};

	_pDesignForm.hitTestforFormbase = function (x, y, rootcompid) {
		var comp_list = "";
		var rootobj = this._getObject(rootcompid);
		if (rootobj) {
			var stepcount = this.get_step_count(rootobj);
			var stepwidth = this.get_step_width(true);

			var comps = this._getChildList(rootobj);
			var comp_len = comps ? comps.length : 0;

			for (var i = comp_len - 1; i >= 0; i--) {
				var comp = comps[i];
				if (!comp) {
					continue;
				}

				var _x = x;
				var _y = y;
				var hit = this._hitTestByPoint(comp, _x, _y);
				if (hit == false) {
					var positionstep = comp.positionstep ? comp.positionstep : 0;
					if (positionstep < 0) {
						for (var j = 1; j < stepcount; j++) {
							_x -= stepwidth;
							hit = this._hitTestByPoint(comp, _x, _y);
							if (hit) {
								break;
							}
						}
					}
				}

				if (hit) {
					if (comp instanceof nexacro.Div) {
						comp_list += this._getScopeName(comp);
						comp_list += ",";
					}
					var url = comp.url;
					if (url) {
						continue;
					}

					var childs = this._getChildList(comp);
					var child_len = childs ? childs.length : 0;
					if (child_len > 0) {
						comp_list += this.hitTestforFormbase(_x, _y, this._getChildName(comp));
					}
				}
			}
		}

		return comp_list;
	};



	_pDesignForm.hitTestParentByPoint = function (x, y, rootcompid) {
		var rootobj = this._getObject(rootcompid);
		if (rootobj) {
			var stepcount = this.get_step_count(rootobj);
			var stepwidth = this.get_step_width(true);

			var comps = this._getChildList(rootobj);
			var comp_len = comps ? comps.length : 0;

			for (var i = comp_len - 1; i >= 0; i--) {
				var comp = comps[i];
				if (!comp) {
					continue;
				}

				if (!(comp instanceof nexacro.Div || comp instanceof nexacro.Tab)) {
					continue;
				}

				var _x = x;
				var _y = y;
				var hit = this._hitTestByPoint(comp, _x, _y);
				if (hit == false) {
					var positionstep = comp.positionstep ? comp.positionstep : 0;
					if (positionstep < 0) {
						for (var j = 1; j < stepcount; j++) {
							_x -= stepwidth;
							hit = this._hitTestByPoint(comp, _x, _y);
							if (hit) {
								break;
							}
						}
					}
				}

				if (hit) {
					var url = comp.url;
					if (url) {
						continue;
					}

					var childs = this._getChildList(comp);
					var child_len = childs ? childs.length : 0;
					if (child_len > 0) {
						return this.hitTestParentByPoint(_x, _y, this._getChildName(comp));
					}
					else {
						if (comp instanceof nexacro.Tab) {
							continue;
						}

						return this._getScopeName(comp);
					}
				}
			}
		}

		if (rootobj instanceof nexacro.Tab) {
			var parent = rootobj.parent;

			if (parent != this.inner_form) {
				parent = parent.parent;
			}

			return this._getScopeName(parent);
		}

		return this._getScopeName(rootobj);
	};

	_pDesignForm.hitTestParentByRect = function (left, top, width, height, rootcompid) {
		var hitcomplist = "";
		var rootobj = this._getObject(rootcompid);
		if (rootobj) {
			var stepcount = this.get_step_count(rootobj);
			var stepwidth = this.get_step_width(true);

			var comps = this._getChildList(rootobj);
			var comp_len = comps.length;
			for (var i = comp_len - 1; i >= 0; i--) {
				var comp = comps[i];
				if (!comp) {
					continue;
				}

				if (!(comp instanceof nexacro.Div || comp instanceof nexacro.Tab)) {
					continue;
				}

				var _left = left;
				var _top = top;
				var _width = width;
				var _height = height;

				var positionstep = comp.positionstep ? comp.positionstep : 0;

				var hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, 2);
				if (hit == false) {
					if (positionstep < 0) {
						for (var j = 1; j < stepcount; j++) {
							_left -= stepwidth;
							hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, 2);
							if (hit) {
								break;
							}
						}
					}
				}

				if (hit) {
					var url = comp.url;
					if (url) {
						continue;
					}

					var childs = this._getChildList(comp);
					var child_len = childs ? childs.length : 0;
					if (child_len > 0) {
						return this.hitTestParentByRect(left, top, width, height, this._getChildName(comp));
					}
					else {
						if (comp instanceof nexacro.Tab) {
							continue;
						}

						return this._getScopeName(comp);
					}
				}
			}
		}

		if (rootobj instanceof nexacro.Tab) {
			var parent = rootobj.parent;

			if (parent != this.inner_form) {
				parent = parent.parent;
			}

			return this._getScopeName(parent);
		}

		return this._getScopeName(rootobj);
	};

	_pDesignForm.setScroll = function (is_horz, size) {
		if (is_horz) {
			this._scroll_left = size;
		}
		else {
			this._scroll_top = size;
		}

		this._recalcDesignLayout();

		var window = this._getWindow();
		if (window && window.handle) {
			nexacro.__refresh(window.handle);
		}
	};


	_pDesignForm.getComponentRect = function (compid, isroot) {
		var obj = this._getObject(compid);

		if (obj) {
			return this._getComponentRect(obj, isroot);
		}
	};

	_pDesignForm._getComponentRect = function (obj, isroot) {
		var root_obj = this.get_root_obj();
		if (obj == root_obj) {
			return [0, 0, obj._adjust_width, obj._adjust_height];
		}
		else if (isroot) {
			var _adjust_left = obj._adjust_left;
			var _adjust_top = obj._adjust_top;
			var _adjust_width = obj._adjust_width;
			var _adjust_height = obj._adjust_height;

			var sublayoutmode_info = this._findSubLayoutMode(obj);
			if (sublayoutmode_info) {
				_adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
				_adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
			}

			var parent = obj.parent;
			while (parent && parent != root_obj) {
				_adjust_left += parent._adjust_left;
				_adjust_top += parent._adjust_top;

				var border = this._getBorderWidth(parent);
				_adjust_left += border[0];
				_adjust_top += border[1];

				if (parent instanceof nexacro.Div) {
					sublayoutmode_info = this._findSubLayoutMode(parent);
					if (sublayoutmode_info) {
						_adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
						_adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
					}
				}

				parent = parent.parent;
			}
			return [_adjust_left, _adjust_top, _adjust_width, _adjust_height];
		}
		else {
			return [obj._adjust_left, obj._adjust_top, obj._adjust_width, obj._adjust_height];
		}
	};

	_pDesignForm.getClientRect = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			return this._getClientRect(obj);
		}
	};

	_pDesignForm.getComponentMinMax = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			return [obj.minwidth, obj.minheight, obj.maxwidth, obj.maxheight];
		}
		return [null, null, null, null];
	};

	_pDesignForm.setDotSize = function (measure, size) {
		var x = this._get_real_dot_size(measure, size, "width");
		var y = this._get_real_dot_size(measure, size, "height");

		var control_element = this._active_editing_form._control_element;
		if (control_element && control_element.handle) {
			nexacro.__setElementHandleDotSize(control_element.handle, x, y);
		}

		if (control_element && control_element._step_containers && control_element._step_containers.length > 0) {
			var step_container_elems = control_element._step_containers;
			for (var i = 0; i < step_container_elems.length; i++) {
				var elem = step_container_elems[i];
				if (elem && elem.handle) {
					nexacro.__setElementHandleDotSize(elem.handle, x, y);
				}
			}
		}
		this._dot_size_x = x;
		this._dot_size_y = y;

		this.drawWindow();
	};

	_pDesignForm.setDotStyle = function (dot_style) {
		var control_element = this._active_editing_form._control_element;
		if (control_element && control_element.handle) {
			nexacro.__setElementHandleDotStyle(control_element.handle, dot_style);
		}

		if (control_element && control_element._step_containers && control_element._step_containers.length > 0) {
			var step_container_elems = control_element._step_containers;
			for (var i = 0; i < step_container_elems.length; i++) {
				var elem = step_container_elems[i];
				if (elem && elem.handle) {
					nexacro.__setElementHandleDotStyle(elem.handle, dot_style);
				}
			}
		}

		this._dot_style = dot_style;

		this.drawWindow();
	};

	_pDesignForm.setDotVisible = function (visible) {
		var control_element = this._active_editing_form._control_element;
		if (control_element && control_element.handle) {
			nexacro.__setElementHandleDotVisible(control_element.handle, visible);
		}

		if (control_element && control_element._step_containers && control_element._step_containers.length > 0) {
			var step_container_elems = control_element._step_containers;
			for (var i = 0; i < step_container_elems.length; i++) {
				var elem = step_container_elems[i];
				if (elem && elem.handle) {
					nexacro.__setElementHandleDotVisible(elem.handle, visible);
				}
			}
		}
		this._dot_visible = visible;

		this.drawWindow();
	};

	_pDesignForm.setPreviewMode = function (is_previewmode) {
		this._is_preview_mode = is_previewmode;
	};

	_pDesignForm.setSubEditorMode = function (is_subeditormode) {
		this._is_subeditor_mode = is_subeditormode;
	};

	_pDesignForm.showPreviewContents = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.showCssDesignContents();
		}
	};
	_pDesignForm.showCssDesignContents = function (compid, objpath, status, statusvalue, userstatus, userstatusvalue) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.showCssDesignContents(objpath, status, statusvalue, userstatus, userstatusvalue);
		}
	};
	_pDesignForm.updatePreviewPosition = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.updatePreviewPosition();
		}
	};

	_pDesignForm.updatePreviewStyle = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.updatePreviewStyle();
		}
	};

	_pDesignForm.getFormBitmap = function () {
		var control_element = this._control_element;
		if (control_element && control_element.handle) {
			return nexacro.__getWindowBitmap(control_element.handle);
		}
	};

	_pDesignForm.setBitmapSize = function (width, height) {
		var cf = this.parent;
		if (!cf) {
			return;
		}
		var win = cf._window;
		if (!win || !win.handle) {
			return;
		}
		cf.move(0, 0, width, height);
		this._recalcDesignLayout();
	};

	_pDesignForm.setFormSize = function (width, height) {
		if (width) {
			this.inner_width = width;
		}

		if (height) {
			this.inner_height = height;
		}

		var form = this._inner_form;
		if (form) {
			form.resize(this.inner_width, this.inner_height);
		}

		this.setLayoutProperty("this", "default", "width", this.inner_width);
		this.setLayoutProperty("this", "default", "height", this.inner_height);
	};

	_pDesignForm.DrawOffset = function (offsetx, offsety) {
		var control_element = this._control_element;
		if (control_element && control_element.handle) {
			nexacro.__setElementHandleOffset(control_element.handle, offsetx, offsety);
		}
	};

	_pDesignForm.setDesignWindowBackground = function (color, innerform) {
		this._outer_background_value = color;

		this.set_background(this._outer_background_value);

		if (innerform) {
			this._inner_form.set_background(this._outer_background_value);
		}
	};

	_pDesignForm.setRoot = function (left, top) {
		this._root_left = left;
		this._root_top = top;

		this._recalcDesignLayout();
	};

	_pDesignForm.setDesignZoom = function (scale) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementZoom(scale);

			this._recalcDesignLayout(true, false);
		}

		var _stack = this._sublayoutmode_stack;
		if (_stack.length > 0) {
			for (var i = 0; i < _stack.length; i++) {
				var pt_offset = [0, 0];
				var owner_elem = _stack[i].owner_elem;
				var temp = owner_elem;
				while (temp && temp != this) {
					pt_offset[0] += temp.left;
					pt_offset[1] += temp.top;
					temp = temp.owner_elem;
				}
				;
				_stack[i].offset_pos = pt_offset;

				var overlay_elem = _stack[i].overlay_elem;
				var overlay_container_elem = overlay_elem.getContainerElement();
				nexacro.__setElementHandleScale(overlay_container_elem.handle, scale);
			}

			this._recalcDesignLayout(false, true);
		}
	};

	_pDesignForm.getDesignZoom = function () {
		return this._getZoom();
	};


	_pDesignForm.getBorderWidth = function (compid) {
		return this._getBorderWidth(this._getObject(compid));
	};

	_pDesignForm._getBorderWidth = function (obj) {
		return nexacro._getBorderWidth(obj);
	};

	_pDesignForm.getOverlapComponent = function (compid) {
		var pivot = this._getObject(compid);
		if (!pivot) {
			return "";
		}

		if (pivot instanceof nexacro.Tabpage) {
			pivot = pivot.parent;
		}

		var parent = pivot.parent;
		if (!parent) {
			return "";
		}

		var complist = "";

		var _adjust_left = pivot._adjust_left;
		var _adjust_top = pivot._adjust_top;
		var _adjust_rigth = pivot._adjust_left + pivot._adjust_width;
		var _adjust_bottom = pivot._adjust_top + pivot._adjust_height;

		_adjust_left -= 2;
		_adjust_top -= 2;
		_adjust_rigth += 2;
		_adjust_bottom += 2;

		var comps = this._getChildList(parent);
		var comp_len = comps ? comps.length : 0;

		var find_this = false;
		for (var i = comp_len - 1; i >= 0; i--) {
			var comp = comps[i];
			if (!comp) {
				continue;
			}

			if (comp == pivot) {
				find_this = true;
				continue;
			}

			if (!find_this) {
				continue;
			}

			if (_adjust_left <= comp._adjust_left && 
				_adjust_top <= comp._adjust_top && 
				_adjust_rigth >= (comp._adjust_left + comp._adjust_width) && 
				_adjust_bottom >= (comp._adjust_top + comp._adjust_height)) {
				complist += this._getScopeName(comp);
				complist += ",";
			}
		}

		return complist;
	};

	_pDesignForm.getBindableList = function () {
		var list = [];

		list.push("this|Form");

		this._getBindableList(list, this._inner_form, "");

		return list.join(",");
	};

	_pDesignForm._getBindableList = function (list, parent, parentid) {
		var comps = this._getChildList(parent);
		if (!comps) {
			return;
		}

		var registerclass = nexacro._registerclass;

		var comp_len = comps.length;
		for (var i = 0; i < comp_len; i++) {
			var comp = comps[i];
			if (!comp) {
				continue;
			}

			var compid = parentid + comp.name;

			list.push(compid + "|" + this._getClassID(comp));

			if (comp instanceof nexacro.Div) {
				compid += ".form.";
			}
			else {
				compid += ".";
			}

			this._getBindableList(list, comp, compid);
		}
	};

	_pDesignForm._getClassID = function (obj) {
		var registerclass = nexacro._registerclass;

		var len = registerclass.length;
		for (var i = 0; i < len; i++) {
			var item = registerclass[i];

			if (obj instanceof eval(item.classname)) {
				return item.id;
			}
		}

		return obj._type_name;
	};

	_pDesignForm.setName = function (compid, propval) {
		var obj = this._getChild(compid);
		if (obj) {
			obj.set_id(propval);
			this._changeChildID(obj.name, propval, obj);
			obj.name = propval;

			return propval;
		}
	};

	_pDesignForm.setOverflowClip = function (overflowclip) {
		if (!this._inner_form) {
			return;
		}

		var control_element = this._inner_form._control_element;
		if (control_element && control_element.handle) {
			nexacro.__setElementHandleOverflowClip(control_element.handle, overflowclip);
		}

		this._overflowclip = overflowclip;
	};

	_pDesignForm._is_sub_layout_editting = function () {
		var _stack = this._sublayoutmode_stack;

		return (_stack.length > 0);
	};

	_pDesignForm.showSubLayout = function (compid, bShow, positionstep) {
		var obj = this._getObject(compid);
		if (!obj) {
			return false;
		}

		if (bShow) {
			this._setSubLayoutPosition(obj);
		}

		return this._showSubLayout(obj, bShow, positionstep);
	};

	_pDesignForm._setSubLayoutPosition = function (obj) {
		if (obj.set_minwidth) {
			obj.set_minwidth(null);
		}
		if (obj.set_maxwidth) {
			obj.set_maxwidth(null);
		}
		if (obj.set_minheight) {
			obj.set_maxheight(null);
		}
		if (obj.set_maxheight) {
			obj.set_maxheight(null);
		}

		if (obj.left === null || obj.left === undefined) {
			obj.left = obj._adjust_left;
		}
		if (obj.top === null || obj.top === undefined) {
			obj.top = obj._adjust_top;
		}
		if (obj.width === null || obj.width === undefined) {
			obj.width = obj._adjust_width;
		}
		if (obj.height === null || obj.height === undefined) {
			obj.height = obj._adjust_height;
		}
		obj.right = null;
		obj.bottom = null;
	};

	_pDesignForm._showSubLayout = function (obj, bShow, positionstep) {
		if (!(obj instanceof nexacro.Div)) {
			return false;
		}

		if (bShow) {
			if (this._findSubLayoutMode(obj)) {
				return false;
			}

			var owner_positionstep = this.get_owner_step_index(obj);
			var step_width = 0;
			if (owner_positionstep == -1) {
				step_width = this._inner_form._adjust_width;
			}
			var overlay_elem = new nexacro.SubLayoutOverlayElement(this._control_element);
			overlay_elem.setLinkedControl(this);

			overlay_elem.create(nexacro._design_sublayout_overlaycolor);

			var overlay_container_elem = overlay_elem.getContainerElement();

			nexacro.__setElementHandleScale(overlay_container_elem.handle, this._getZoom());

			var pt_offset = [0, 0];
			var div_elem = obj._control_element;
			var owner_elem = div_elem.owner_elem;
			var temp = owner_elem;

			while (temp && temp != this._control_element) {
				pt_offset[0] += temp.left;
				pt_offset[1] += temp.top;

				var linkedcontrol = temp.linkedcontrol;
				var border = this._getBorderWidth(linkedcontrol);
				pt_offset[0] += border[0];
				pt_offset[1] += border[1];

				temp = temp.owner_elem;
			}
			;

			var parent_comp = obj.parent;
			var next_comp = null;
			if (parent_comp.all) {
				var next_comp_idx = parent_comp.all.indexOf(obj.id) + 1;
				next_comp = parent_comp.all[next_comp_idx];
			}



			nexacro.__setElementHandleFixedStepNode(div_elem.handle, false);

			var scrollbarsize;
			if (obj.form && obj.form.scrollbarsize) {
				scrollbarsize = obj.form.scrollbarsize;
			}
			else {
				scrollbarsize = obj.form._default_scrollbarsize;
			}

			var sublayoutmode_info = {
				comp : obj, 
				elem : div_elem, 
				owner_elem : owner_elem, 
				next_comp : next_comp, 
				overlay_elem : overlay_elem, 
				elem_pos : [div_elem.left, div_elem.top], 
				offset_pos : [pt_offset[0] + this._scroll_left, pt_offset[1] + this._scroll_top], 
				positionstep : positionstep, 
				scrollbarsize : scrollbarsize
			};

			obj._sublayoutmode_info = sublayoutmode_info;
			div_elem._removeFromContainer();
			div_elem._appendToContainer(overlay_container_elem);


			if (this._dot_visible && obj.form) {
				this._showDotGrid(obj.form, true);
			}

			var design_form = this;
			obj._design_form = this;


			obj._adjustPosition = function () {
				var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);

				var parent = this._is_form ? this.parent : this._getForm();
				var info = this._arrange_info;
				var target;

				var left = this._left;
				var top = this._top;
				var right = this._right;
				var bottom = this._bottom;
				var width = this._width;
				var height = this._height;

				var minwidth = this._minwidth;
				var maxwidth = this._maxwidth;
				var minheight = this._minheight;
				var maxheight = this._maxheight;

				var calc_pos;
				var calc_left, calc_top, calc_right, calc_bottom, calc_width, calc_height;
				calc_left = calc_top = calc_right = calc_bottom = calc_width = calc_height = 0;

				if (left != null) {
					if (info && (target = this._getArrangeComp("left"))) {
						calc_pos = target._adjust_left + target._adjust_width;
					}
					else {
						calc_pos = step_logical_offset;
					}

					calc_left = calc_pos + left;

					if (right != null) {
						if (info && (target = this._getArrangeComp("right"))) {
							calc_pos = target._adjust_left;
						}
						else {
							calc_pos = parent._adjust_width + step_logical_offset;
						}
						calc_right = calc_pos - right;
					}
					else {
						calc_right = calc_left + width;
					}
				}
				else {
					if (info && (target = this._getArrangeComp("right"))) {
						calc_pos = target._adjust_left;
					}
					else {
						calc_pos = parent._adjust_width + step_logical_offset;
					}
					calc_right = calc_pos - right;
					calc_left = calc_right - width;
				}

				if (top != null) {
					if (info && (target = this._getArrangeComp("top"))) {
						calc_pos = target._adjust_top + target._adjust_height;
					}
					else {
						calc_pos = 0;
					}

					calc_top = calc_pos + top;

					if (bottom != null) {
						if (info && (target = this._getArrangeComp("bottom"))) {
							calc_pos = target._adjust_top;
						}
						else {
							calc_pos = parent._adjust_height;
						}

						calc_bottom = calc_pos - bottom;
					}
					else {
						calc_bottom = calc_top + height;
					}
				}
				else {
					if (info && (target = this._getArrangeComp("bottom"))) {
						calc_pos = target._adjust_top;
					}
					else {
						calc_pos = parent._adjust_height;
					}

					calc_bottom = calc_pos - bottom;
					calc_top = calc_bottom - height;
				}

				this._adjust_left = calc_left;

				var parentWidth = parent._adjust_width;
				var design_form = this._design_form;
				var scale = design_form._getZoom();
				var sublayoutmode_info = this._sublayoutmode_info;
				var offset_left = (sublayoutmode_info.offset_pos[0] - design_form._scroll_left) + step_logical_offset;
				if (owner_positionstep == -1) {
					parentWidth = step_width;
				}
				var init_positionstep = sublayoutmode_info.positionstep * parentWidth;
				this._adjust_left_ltr = this._adjust_left = (this._adjust_left + offset_left + init_positionstep);
				if (this._isRtl()) {
					this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
				}

				this._adjust_top = calc_top;
				var offset_top = (sublayoutmode_info.offset_pos[1] - design_form._scroll_top);
				this._adjust_top = (this._adjust_top + offset_top);

				calc_pos = calc_right - calc_left;
				if (calc_pos < 0) {
					calc_pos = 0;
				}


				this._adjust_width = calc_pos;

				calc_pos = calc_bottom - calc_top;
				if (calc_pos < 0) {
					calc_pos = 0;
				}


				this._adjust_height = calc_pos;
			};

			obj.move(obj.left, obj.top, obj.width, obj.height, obj.right, obj.bottom);
			obj.on_update_position(false, true);

			if (this._active_editing_form) {
				this._showDotGrid(this._active_editing_form, false);
			}

			this._sublayoutmode_stack.push(sublayoutmode_info);
			this._active_editing_form = obj.form;

			nexacro.__setElementHandleOverflowClip(div_elem.handle, true);
			if (obj.form && obj.form._control_element) {
				var inner_element = obj.form._control_element;
				if (inner_element) {
					obj.form.set_scrollbarsize(0);
					if (obj.form.vscrollbar) {
						obj.form.vscrollbar.set_visible(false);
					}
					if (obj.form.hscrollbar) {
						obj.form.hscrollbar.set_visible(false);
					}
					obj.form._onResetScrollBar = nexacro._emptyFn;
					nexacro.__setElementHandleOverflowClip(inner_element.handle, true);
				}
			}
		}
		else {
			var _stack = this._sublayoutmode_stack;
			var sublayoutmode_info;
			for (var i = 0; i < _stack.length; i++) {
				if (_stack[i].comp == obj) {
					sublayoutmode_info = _stack[i];
					break;
				}
			}

			if (sublayoutmode_info) {
				var overlay_elem = sublayoutmode_info.overlay_elem;
				var owner_elem = sublayoutmode_info.owner_elem;
				var elem_pos = sublayoutmode_info.elem_pos;
				var div_elem = sublayoutmode_info.elem;
				var obj = sublayoutmode_info.comp;
				var next_comp = sublayoutmode_info.next_comp;
				var scrollbarsize = sublayoutmode_info.scrollbarsize;
				div_elem._removeFromContainer();
				if (!next_comp) {
					div_elem._appendToContainer(owner_elem);
				}
				else {
					var next_comp_elem = next_comp._control_element;
					nexacro.__insertElementHandle(owner_elem.handle, div_elem.handle, next_comp_elem.handle);
					div_elem.owner_elem = owner_elem;
				}

				if (obj.form && obj.form._control_element) {
					var inner_element = obj.form._control_element;
					if (inner_element) {
						nexacro.__setElementHandleOverflowClip(inner_element.handle, false);
					}
				}

				nexacro.__setElementHandlePosition(div_elem.handle, elem_pos[0], elem_pos[1]);
				nexacro.__setElementHandleOverflowClip(div_elem.handle, false);

				if (obj.form) {
					this._showDotGrid(obj.form, false);
				}

				overlay_elem._removeFromContainer();
				overlay_elem.destroy();

				_stack.length = _stack.length - 1;

				if (_stack.length > 0) {
					this._active_editing_form = _stack[_stack.length - 1].comp;
				}
				else {
					this._active_editing_form = this._inner_form;
				}

				if (this._active_editing_form) {
					this._showDotGrid(this._active_editing_form, this._dot_visible);
				}

				this._on_update_positionstep(obj);

				obj._adjustPosition = nexacro.Component.prototype._adjustPosition;

				obj.move(obj.left, obj.top, obj.width, obj.height, obj.right, obj.bottom);
				obj.on_update_position(false, true);

				if (obj.form) {
					obj.form.set_scrollbarsize(scrollbarsize);
					if (obj.form.vscrollbar) {
						obj.form.vscrollbar.set_visible(true);
					}
					if (obj.form.hscrollbar) {
						obj.form.hscrollbar.set_visible(true);
					}
					obj.form._onResetScrollBar = nexacro.Component.prototype._onResetScrollBar;

					obj.form._onRecalcScrollSize();
					obj.form._onResetScrollBar();
				}
			}
		}

		return true;
	};


	_pDesignForm.moveComponentToFront = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.bringToFront();

			var form = obj._getForm();
			if (form && form.components) {
				var comps = form.components;
				this.setZorder(compid, comps.length - 1);
			}
		}
	};

	_pDesignForm.moveComponentToPrev = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.bringToPrev();

			var form = obj._getForm();
			if (form && form.components) {
				var comps = form.components;
				var this_idx = comps.indexOf(compid);
				this.setZorder(compid, this_idx + 1);
			}
		}
	};

	_pDesignForm.moveComponentToNext = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.sendToNext();

			var form = obj._getForm();
			if (form && form.components) {
				var comps = form.components;
				var this_idx = comps.indexOf(compid);
				this.setZorder(compid, this_idx - 1);
			}
		}
	};

	_pDesignForm.moveComponentToBack = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.sendToBack();
			this.setZorder(compid, 0);
		}
	};

	_pDesignForm.setZorder = function (compid, zorder, moveComponent) {
		var obj = this._getObject(compid);
		if (obj) {
			var form = obj._getForm();
			if (form && form.components) {
				compid = obj.name;

				var comps = form.components;
				var this_idx = comps.indexOf(compid);

				if (this_idx > -1 && zorder > -1 && zorder < comps.length) {
					var comp = comps[this_idx];
					comps.delete_item(compid);
					comps.insert_item(zorder, compid, comp);
					form.components = comps;

					if (moveComponent === true) {
						if (this_idx < zorder) {
							for (var i = this_idx; i < zorder; i++) {
								comp.bringToPrev();
							}
						}
						else {
							for (var i = this_idx; i > zorder; i--) {
								comp.sendToNext();
							}
						}
					}
				}
			}
		}
	};
	_pDesignForm.getPseudo = function (compid) {
		var obj = this._getChild(compid);
		if (obj) {
			return obj._status;
		}
	};

	_pDesignForm.setPseudo = function (compid, pseudo) {
		var obj = this._getObject(compid);
		if (obj) {
			obj._changeStatus(pseudo, true);

			if (obj._status == pseudo) {
				return true;
			}
		}

		return false;
	};

	_pDesignForm.addLayout = function (compid, layoutname, width, height, screenid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return false;
		}

		if (!(obj instanceof nexacro.Form)) {
			return false;
		}

		if (obj._default_layout == null && layoutname != "default") {
			trace("not found default layout in " + obj.name);
			return false;
		}

		var layout = new Layout(layoutname, screenid, width, height, obj, function (p) {
		});
		obj.addLayout(layout.name, layout);

		return true;
	};

	_pDesignForm.removeLayout = function (compid, layoutname) {
		var obj = this._getObject(compid);
		if (!obj) {
			return false;
		}

		if (!(obj instanceof nexacro.Form)) {
			return false;
		}

		if (obj._current_layout_name == layoutname) {
			obj._current_layout_name = "";
		}

		if (layoutname == "default") {
			return false;
		}
		else {
			obj._layout_list.delete_item(layoutname);
		}

		return true;
	};

	_pDesignForm.removeAllLayout = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return false;
		}

		if (!(obj instanceof nexacro.Form)) {
			return false;
		}

		obj._current_layout_name = "";


		obj._layout_list.clear();

		return true;
	};

	_pDesignForm.setLayoutProperty = function (compid, layoutname, propid, propval) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		var layout = this._getLayout(obj, layoutname);
		if (!layout) {
			return;
		}

		if (propid == "name" && layoutname == "default") {
			return;
		}

		if (layout["set_" + propid]) {
			layout["set_" + propid](propval);
		}

		if (propid == "stepcount") {
			this._refreshStepContainer(obj, layout.stepcount);
		}

		if (propid == "name" && layoutname != "default") {
			var idx = obj._layout_list.indexOf(layoutname);
			obj._layout_list.update_id(idx, propval);
		}

		return layout[propid];
	};

	_pDesignForm.getLayoutProperty = function (compid, layoutname, propid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		var layout = this._getLayout(obj, layoutname);
		if (!layout) {
			return;
		}

		return layout[propid];
	};

	_pDesignForm.changeLayout = function (compid, layoutname) {
		var obj = this._getObject(compid);
		if (!obj) {
			return false;
		}

		if (!(obj instanceof nexacro.Form)) {
			return false;
		}

		obj._current_layout_name = layoutname;

		var layout = this._getLayout(layoutname);
		if (!layout) {
			return false;
		}

		var layout_manager = nexacro._getLayoutManager();
		layout_manager.changeLayout(obj, layout);

		return true;
	};

	_pDesignForm.getCurrentLayout = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		return this._getCurrentLayout(obj);
	};

	_pDesignForm._getCurrentLayout = function (obj) {
		if (!(obj instanceof nexacro.Form)) {
			return;
		}
		return obj._current_layout_name;
	};

	_pDesignForm.setAutoLayoutChange = function (compid, is_auto) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		return this._setAutoLayoutChange(obj, is_auto);
	};



	_pDesignForm._setAutoLayoutChange = function (obj, is_auto) {
		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		obj._auto_layoutchange = is_auto;

		if (is_auto) {
			obj._checkValidLayout = nexacro.FormBase.prototype._checkValidLayout;
		}
		else {
			obj._checkValidLayout = function () {
				return obj._current_layout_name;
			};
		}
	};

	_pDesignForm.refreshLayout = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		var pManager = nexacro._getLayoutManager();
		if (pManager) {
			var xy = {
				cx : obj._adjust_width, 
				cy : obj._adjust_height
			};
			var new_idx = pManager.checkValid(obj, xy);

			if (new_idx > -1) {
				new_layout = obj._layout_list[new_idx];
				if (new_layout) {
					var len = obj.all.length;
					for (var i = 0; i < len; i++) {
						if (obj.all[i]._is_form && obj.all[i]._layout_list.length > 0) {
							obj.all[i]._checkValidLayout(xy);
						}
					}
					pManager.loadLayout(obj, obj._default_layout, new_layout);

					var win = this._getWindow();
					var frame = this.getOwnerFrame();
					var designform = frame.form;
					var extra_info = this._getScopeName(obj) + ":" + new_layout.name;

					nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_layoutchange, designform.id, extra_info);

					if (obj._is_form && obj._is_scrollable) {
						obj._onRecalcScrollSize();
						obj._onResetScrollBar();
					}
				}
			}
		}
	};

	_pDesignForm.recalcLayout = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (obj._is_form && obj._is_scrollable) {
			obj._onRecalcScrollSize();
			obj._onResetScrollBar();
		}
	};

	_pDesignForm.refreshLinkedUrl = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (obj.on_apply_url) {
			obj.on_apply_url();
		}
	};


	_pDesignForm.getControlElementHandle = function (compid) {
		var obj = this._getObject(compid);
		if (obj && obj._control_element && obj._control_element.handle) {
			return obj._control_element.handle;
		}
		return null;
	};

	_pDesignForm.setContents = function (compid, contents) {
		var obj = this._getObject(compid);
		if (!obj || !obj._setContents) {
			return;
		}

		obj._setContents(contents);
	};

	_pDesignForm.makeContentsString = function (compid) {
		var obj = this._getObject(compid);
		if (!obj || !obj.makeContentsString) {
			return;
		}

		return obj.makeContentsString();
	};


	_pDesignForm.setFormats = function (compid, contents) {
		var obj = this._getObject(compid);
		if (!obj || !obj.set_formats) {
			return;
		}

		obj.set_formats(contents);
	};
	_pDesignForm.makeFormatString = function (compid) {
		var obj = this._getObject(compid);
		if (!obj || !obj.makeFormatString) {
			return;
		}

		return obj.makeFormatString();
	};

	_pDesignForm.setInnerDataset = function (compid, value, extern) {
		try {
			var obj = this._getObject(compid);
			if (!obj || !obj.set_innerdataset) {
				return;
			}

			if (obj.innerdataset == "innerdataset") {
				var innerdataset = obj._innerdataset;
				delete innerdataset;

				obj._innerdataset = null;
				obj.innerdataset = "";
			}

			if (extern) {
				var ds = obj._findDataset(value);
				obj.set_innerdataset(ds);
			}
			else {
				var innerdatasetid = "innerdataset";
				var innerdataset = new nexacro.NormalDataset(innerdatasetid, obj);
				innerdataset._setContents(value);

				if (obj.set_innerdataset) {
					obj.set_innerdataset(innerdataset);
				}
				else {
					trace("obj(" + obj + ":" + obj.name + ") have no method set_innerdataset!!!");
				}
			}
		}
		catch (e) {
			if (e.obj) {
				nexacro.__onNexacroStudioError(e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);
				nexacro.__onNexacroStudioError(msg);
			}
		}
	};

	_pDesignForm.setInitValueID = function (compid, value) {
		var obj = this._getObject(compid);
		if (obj) {
			nexacro._setInitValueID(obj, value);
		}
	};

	_pDesignForm.callDesignMethod = function (compid, methodname) {
		var obj = this._getObject(compid);
		if (!obj) {
			return false;
		}

		return eval("obj." + methodname + "();");
	};

	_pDesignForm.setActiveTabpage = function (compid, index) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (obj instanceof nexacro.Tab) {
			obj.set_tabindex(index);
		}
	};

	_pDesignForm.insertTabpage = function (compid, index, tabpageid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (obj instanceof nexacro.Tab) {
			obj.insertTabpage(tabpageid, index, "", tabpageid);
		}
	};

	_pDesignForm.deleteTabpage = function (compid, index) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (obj instanceof nexacro.Tab) {
			obj.deleteTabpage(index);
		}
	};

	_pDesignForm.getGridComputedStyles = function (compid, target, type, properties) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (type == 4) {
			return nexacro._getComputedStyleProperties(obj._control_element, properties);
		}

		if (obj instanceof nexacro.Grid) {
			eval("var css = " + target + ";");
			return obj._getControlComputedStyle(css, type, properties);
		}
	};

	_pDesignForm.setCssList = function (csslist) {
		return;


		this._clearStyles();


		this._css_context_list = [];
		this._find_csslist = [];

		_application._load_manager.localList = [];
		_application._load_manager.localCnt = 0;

		for (var i = 0; i < csslist.length; i++) {
			var cssurl = csslist[i];
			var css_context = nexacro._getDesignCssContext(cssurl);
			if (!css_context) {
				trace("> Not Cached: " + cssurl);
				css_context = new nexacro.DesignCssContext(cssurl);
				if (cssurl.indexOf(".xtheme") > 0) {
					nexacro._loadTheme2(cssurl, css_context);
				}
				else {
					nexacro._loadCss2(cssurl, css_context);
				}

				nexacro._addDesignCssContext(css_context);
			}
			else {
				trace("> Cached: " + cssurl);
			}

			this._css_context_list.push(css_context);
			this._find_csslist.unshift(css_context._css_selectors);
		}

		var obj = this._getObject("this");
		if (obj) {
			if (obj._control_element && obj._control_element._step_containers && obj._control_element._step_containers.length > 0) {
				this._updateStepContainerStyle(obj._control_element, 0xffffffff);
			}
		}

		var cur_theme_uri = nexacro._theme_uri;
		this.setActive();

		this._refreshStyles();
		this._notifyChangedStyles();
	};

	_pDesignForm.setActive = function () {
		if (!this._css_context_list || this._css_context_list.length <= 0) {
			return;
		}

		var _item = this._css_context_list[0];
		if (_item instanceof nexacro.DesignCssContext) {
			if (_item._theme_uri !== undefined) {
				nexacro._theme_uri = _item._theme_uri;
			}
		}
	};

	_pDesignForm.setThemeUri = function (themename) {
		if (typeof themename == "string") {
			if (themename[0] == "\\" || themename[2] == "\\" || 
				themename[0] == "/" || themename[2] == "/") {
				themename = "file://" + themename;
			}
		}

		nexacro._theme_uri = themename;

		this.drawWindow();
	};

	_pDesignForm._clearStyles = function (comp) {
		if (comp === undefined) {
			comp = this;
		}
		else if (comp === null) {
			return;
		}


		if (comp instanceof nexacro.DesignForm) {
			this._clearStyles(comp._inner_form);
		}
		else if (comp instanceof nexacro.FormBase) {
			var len = comp.components.length;
			for (var i = 0; i < len; i++) {
				this._clearStyles(comp.components[i]);
			}
		}



		var subcontrols = this._getSubControlList(comp);
		var len = subcontrols.length;
		for (var i = 0; i < len; i++) {
			var control = subcontrols[i];
			this._clearStyles(control);
		}
	};

	_pDesignForm._refreshStyles = function (comp) {
		if (comp === undefined) {
			comp = this;
		}
		else if (comp === null) {
			return;
		}

		if (comp instanceof nexacro.DesignForm) {
			this._refreshStyles(comp._inner_form);
		}
		else if (comp instanceof nexacro.FormBase) {
			var len = comp.components.length;
			for (var i = 0; i < len; i++) {
				this._refreshStyles(comp.components[i]);
			}
		}

		var subcontrols = this._getSubControlList(comp);
		var len = subcontrols.length;
		for (var i = 0; i < len; i++) {
			var control = subcontrols[i];
			this._refreshStyles(control);
		}
	};

	_pDesignForm._notifyChangedStyles = function () {
		this.drawWindow();

		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_refresh_properties, this.name, null);
		}
	};




	_pDesignForm._on_update_property = function (obj, propid) {
		if (!obj || !propid) {
			return;
		}

		switch (propid) {
			case "name":
				obj.id = obj.name;
				if (obj != this._inner_form) {
					var parent = obj.parent;
					var comps = this._getChilds(parent);
					var comp_len = comps.length;
					for (var i = 0; i < comp_len; i++) {
						var comp = comps[i];
						if (comp.name == obj.name) {
							var old_id = comps.get_id(i);
							parent[old_id] = null;
							parent[obj.name] = obj;

							comps.update_id(i, obj.name);

							if (obj instanceof nexacro.Tab) {
							}
							else if (parent.all) {
								var idx = parent.all.indexOf(old_id);
								if (idx >= 0) {
									parent.all.update_id(idx, obj.name);
								}
							}


							break;
						}
					}
				}
				break;
			case "positionstep":
				this._on_update_positionstep(obj);
				break;
			case "left":
			case "top":
			case "width":
			case "height":
			case "right":
			case "bottom":
				{

					var parent = obj.parent;
					if (parent && parent._is_form && parent._is_scrollable) {
						parent._onRecalcScrollSize();
						parent._onResetScrollBar();
					}
				}
				break;
		}

		if (this._loaded && obj.afterSetProperty) {
			obj.afterSetProperty(propid);
		}

		if (obj._control_element && obj._control_element._step_containers && obj._control_element._step_containers.length > 0) {
			switch (propid) {
				case "border":
				case "borderRadius":
					this._updateStepContainerStyle(obj._control_element, 0x01);
					break;
				case "background":
					this._updateStepContainerStyle(obj._control_element, 0x02);
					break;
				case "color":
					this._updateStepContainerStyle(obj._control_element, 0x04);
					break;
				case "opacity":
					this._updateStepContainerStyle(obj._control_element, 0x08);
					break;
			}
		}
	};

	_pDesignForm.loadedForm = function () {
		this._loaded = true;
	};

	_pDesignForm._on_update_positionstep = function (obj) {
		var parent = obj.parent;
		if (parent) {
			var parent_elem = parent._control_element;
			if (parent_elem && parent_elem._step_containers && parent_elem._step_containers.length > 0) {
				var elem = obj._control_element;
				var elem_handle = elem ? elem.handle : null;

				if (obj.positionstep == -1) {
					nexacro.__setElementHandleStepCount(elem_handle, parent_elem._step_containers.length + 1);
					nexacro.__setElementHandleStepWidth(elem_handle, parent._adjust_width);
					nexacro.__setElementHandleFixedStepNode(elem_handle, true);
				}
				else {
					nexacro.__setElementHandleFixedStepNode(elem_handle, false);
				}
			}
			else {
				var elem = obj._control_element;
				var elem_handle = elem ? elem.handle : null;

				nexacro.__setElementHandleFixedStepNode(elem_handle, false);
			}

			obj._adjustPosition(obj.left, obj.top, obj.right, obj.bottom, obj.width, obj.height, parent._adjust_width, parent._adjust_height);
			obj.on_update_position(false, true);
		}
	};

	_pDesignForm._hitTestByPoint = function (obj, x, y) {
		if (obj) {
			var control_elem = obj._control_element;
			if (control_elem) {
				var elem = control_elem;
				while (elem) {
					if (elem._design_visible === false) {
						return false;
					}
					elem = elem.parent_elem;
				}
			}

			var rect = this._getClientRect(obj);
			if (rect[0] <= x && x <= rect[0] + rect[2] && 
				rect[1] <= y && y <= rect[1] + rect[3]) {
				return true;
			}
		}

		return false;
	};

	_pDesignForm._hitTestByRect = function (obj, left, top, right, bottom, type) {
		if (obj) {
			var control_elem = obj._control_element;
			if (control_elem) {
				var elem = control_elem;
				while (elem) {
					if (elem._design_visible === false) {
						return false;
					}
					elem = elem.parent_elem;
				}
			}

			var rect = this._getClientRect(obj);
			var _left = rect[0];
			var _right = rect[0] + rect[2];
			var _top = rect[1];
			var _bottom = rect[1] + rect[3];
			if (type == 0) {
				if (left <= _left && _right <= right && 
					top <= _top && _bottom <= bottom) {
					return true;
				}
			}
			else if (type == 1) {
				if (left > _right) {
					return false;
				}

				if (top > _bottom) {
					return false;
				}

				if (right < _left) {
					return false;
				}

				if (bottom < _top) {
					return false;
				}

				return true;
			}
			else if (type == 2) {
				if (left >= _left && _right >= right && 
					top >= _top && _bottom >= bottom) {
					return true;
				}
			}
		}

		return false;
	};

	_pDesignForm._getClientRect = function (obj) {
		var _adjust_left = obj._adjust_left;
		var _adjust_top = obj._adjust_top;
		var _adjust_width = obj._adjust_width;
		var _adjust_height = obj._adjust_height;

		var sublayoutmode_info = this._findSubLayoutMode(obj);
		if (sublayoutmode_info) {
			_adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
			_adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
		}

		var parent = obj.parent;
		while (parent && parent != this) {
			_adjust_left += parent._adjust_left;
			_adjust_top += parent._adjust_top;

			var border = this._getBorderWidth(parent);
			_adjust_left += border[0];
			_adjust_top += border[1];

			if (parent instanceof nexacro.Div) {
				sublayoutmode_info = this._findSubLayoutMode(parent);
				if (sublayoutmode_info) {
					_adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
					_adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
				}
			}

			parent = parent.parent;
		}

		var scale = this._getZoom() / 100;

		_adjust_left *= scale;
		_adjust_top *= scale;
		_adjust_width *= scale;
		_adjust_height *= scale;

		_adjust_left = parseInt(_adjust_left);
		_adjust_top = parseInt(_adjust_top);
		_adjust_width = parseInt(_adjust_width);
		_adjust_height = parseInt(_adjust_height);

		return [_adjust_left, _adjust_top, _adjust_width, _adjust_height];
	};

	_pDesignForm._recalcDesignLayout = function (recalc_innerform, recalc_sublayout) {
		var form = this._inner_form;
		if (recalc_innerform != false && form) {
			form.move(0, 0, form.width, form.height);
			form.on_update_position(false, true);
		}

		var _stack = this._sublayoutmode_stack;
		if (recalc_sublayout !== false && _stack.length > 0) {
			for (var i = 0; i < _stack.length; i++) {
				var comp = _stack[i].comp;
				comp.move(comp.left, comp.top, comp.width, comp.height, comp.right, comp.bottom);
				comp.on_update_position(false, true);
			}
		}

		if (this._active_editing_form && this._is_sub_layout_editting()) {
			var active_sublayout = this._active_editing_form;
			var positionstep = (active_sublayout._sublayoutmode_info) ? active_sublayout._sublayoutmode_info.positionstep : 0;

			this._showSubLayout(active_sublayout, false);
			this._showSubLayout(active_sublayout, true, positionstep);
			active_sublayout = null;
		}
		this._recalcStepContainer(form);
	};

	_pDesignForm._getNextChildID = function (parent, classname) {
		if (!parent || !classname) {
			trace("parent or classname is missing");
			return "error";
		}

		var names = classname.split('.');
		if (names[0] == "nexacro") {
			names.splice(0, 1);
		}

		var prefix = names.join("_");

		var nextnum = 0;
		var nextid;
		while (true) {
			nextid = classname + ((nextnum < 10) ? "0" : "") + nextnum;
			if (!parent[nextid]) {
				break;
			}
			nextnum++;
		}

		return nextid;
	};

	_pDesignForm._changeChildID = function (oldid, newid, obj) {
		var idx = this.all.indexOf(oldid);
		if (idx < 0) {
			return;
		}
		this.all.update_id(idx, newid);

		idx = this.components.indexOf(oldid);
		if (idx >= 0) {
			this.components.update_id(idx, newid);
		}

		idx = this.objects.indexOf(oldid);
		if (idx >= 0) {
			return;
		}
		{

			this.objects.update_id(idx, newid);
		}

		idx = this.binds.indexOf(oldid);
		if (idx >= 0) {
			return;
		}
		{

			this.binds.update_id(idx, newid);
		}

		delete this[oldid];
		this[newid] = obj;
	};

	_pDesignForm._getChilds = function (obj) {
		if (!obj) {
			return null;
		}

		if (obj instanceof nexacro.Tab) {
			return obj.tabpages;
		}
		else if (obj instanceof nexacro.Form) {
			return obj.components;
		}
		else if (obj.form) {
			return obj.form.components;
		}

		return null;
	};

	_pDesignForm._getChild = function (childname) {
		if (childname == "" || childname == undefined || childname == "this") {
			return this._inner_form;
		}

		return eval("this._inner_form." + childname);
	};

	_pDesignForm._getChildList = function (obj) {
		if (obj instanceof nexacro.Tab) {
			return obj.tabpages;
		}
		else if (obj instanceof nexacro.Form) {
			return obj._child_list;
		}
		else if (obj.form) {
			return obj.form._child_list;
		}

		return null;
	};

	_pDesignForm._getObjectList = function (obj) {
		if (obj instanceof nexacro.Tab) {
			return null;
		}
		else if (obj instanceof nexacro.Form) {
			return obj.objects;
		}
		else if (obj.form) {
			return obj.form.objects;
		}

		return null;
	};

	_pDesignForm._getObject = function (name) {
		if (!name || name == "this") {
			return this._inner_form;
		}

		if (name.substring(0, 4) == "this.") {
			name = name.substring(5);
		}

		var obj = eval("this._inner_form." + name);


		return obj;
	};

	_pDesignForm._getInlineStyleValue = function (comp) {
		var str = "";

		var _style = comp.style;
		if (_style) {
			var _pStyle = nexacro.Style.prototype;
			for (prop in _style) {
				if (prop[0] == "_") {
					continue;
				}
				if (typeof (_style[prop]) == "function") {
					continue;
				}
				if (_style[prop] == null) {
					continue;
				}
				if (_pStyle[prop] == _style[prop]) {
					continue;
				}
				str += prop + ": " + _style[prop]._value + "; ";
			}
		}

		var pseudo_styles = comp._styles;
		if (pseudo_styles) {
			for (pseudo_style in pseudo_styles) {
				if (pseudo_style[0] == "_") {
					continue;
				}
				if (pseudo_style == "normal") {
					continue;
				}
				_style = pseudo_styles[pseudo_style];
				str += ":" + pseudo_style + " { ";
				for (prop in _style) {
					if (prop[0] == "_") {
						continue;
					}
					if (typeof (_style[prop]) == "function") {
						continue;
					}
					if (_style[prop] == null) {
						continue;
					}
					str += prop + ": " + _style[prop]._value + "; ";
				}
				str += " }; ";
			}
		}

		return str;
	};

	_pDesignForm._getScopeName = function (comp) {
		if (comp instanceof nexacro.DesignForm) {
			return;
		}

		if (comp == this._inner_form) {
			return "this";
		}

		var fullname = [];
		while (comp && comp != this && comp != this._inner_form) {
			if (comp instanceof nexacro._InnerForm) {
				fullname.push("form");
			}
			else {
				fullname.push(comp.id);
			}

			comp = comp.parent;
		}

		fullname.reverse();
		return fullname.join(".");
	};

	_pDesignForm._getChildName = function (comp) {
		if (comp instanceof nexacro.DesignForm) {
			return;
		}

		if (comp == this._inner_form) {
			return "this";
		}

		var parent = comp.parent;
		var fullname = [];

		fullname.push(comp.id);
		while (parent && parent != this && parent != this._inner_form) {
			if (parent instanceof nexacro._InnerForm) {
				fullname.push("form");
			}
			else {
				fullname.push(parent.id);
			}

			parent = parent.parent;
		}

		fullname.reverse();
		return fullname.join(".");
	};

	_pDesignForm._findURlLoadedAncestor = function (comp) {
		if (!comp) {
			return null;
		}

		var found_comp = null;
		while (comp) {
			if (comp == this._inner_form) {
				break;
			}

			if (comp instanceof nexacro.Div && comp._url) {
				found_comp = comp;
			}
			comp = comp.parent;
		}

		return found_comp;
	};

	_pDesignForm._appendInlineStyleValue = function (base_value, append_value) {
		base_value = nexacro._decodeXml(base_value);
		append_value = nexacro._decodeXml(append_value);

		var base_styles = this._parseInlineStyleValue(base_value);
		var append_styles = this._parseInlineStyleValue(append_value);

		for (var pseudo in base_styles) {
			if (!append_styles[pseudo]) {
				continue;
			}

			var base_tokens = base_styles[pseudo].split(";");
			var append_tokens = append_styles[pseudo].split(";");

			var base_style = this._parseStyleToken(base_tokens);
			var append_style = this._parseStyleToken(append_tokens, base_style);

			var append_str = "";
			for (var prop in append_style) {
				append_str += prop + ":" + append_style[prop] + "; ";
			}

			base_styles[pseudo] = append_str;
		}

		for (var pseudo in append_styles) {
			if (base_styles[pseudo]) {
				continue;
			}

			base_styles[pseudo] = append_styles[pseudo];
		}

		var ret = "";
		for (var pseudo in base_styles) {
			if (pseudo == "normal") {
				ret += base_styles[pseudo];
			}
			else {
				ret += ":" + pseudo + "{ " + base_styles[pseudo] + "} ";
			}
		}

		return ret;
	};

	_pDesignForm._parseStyleToken = function (v, source_obj) {
		var ret = source_obj ? source_obj : {
		};
		for (var i = 0; i < v.length; i++) {
			var name_and_value = v[i].split(":");
			var name = name_and_value[0].trim();

			if (name == "" && name_and_value.length == 1) {
				continue;
			}

			var value = name_and_value[1].trim();
			ret[name] = value;
		}

		return ret;
	};

	_pDesignForm._parseInlineStyleValue = function (v) {
		var v = nexacro._decodeXml(v);
		var blocks = v.split("}");
		var s = blocks[0].trim();

		var _styles = {
		};
		blocks.pop();

		var i, len = blocks.length;
		var definition_block, pseudo, normal_style;

		definition_block = s.split("{");
		normal_style = definition_block[0].substring(0, definition_block[0].lastIndexOf(";") + 1).trim();

		if (normal_style.length == 0) {
			normal_style = definition_block[0].substring(0, definition_block[0].length).trim();
		}

		_styles["normal"] = normal_style;
		if (len > 0) {
			for (i = 0; i < len; i++) {
				definition_block = blocks[i].split("{");
				pseudo = definition_block[0].substring(definition_block[0].lastIndexOf(":") + 1).trim();
				_styles[pseudo] = definition_block[1];
			}
		}
		return _styles;
	};

	_pDesignForm._swapPositionUnit = function (obj, pos, unit) {
		if (unit == "auto") {
			return;
		}

		if (pos != "left" && pos != "top" && pos != "width" && pos != "height" && pos != "right" && pos != "bottom") {
			return;
		}

		if (obj[pos] === null) {
			return;
		}

		var parent = obj.parent;
		if (!parent) {
			return;
		}

		var parent_size;

		var form = obj._getForm();
		var root_form = obj._getRootForm();
		var owner_positionstep = this.get_owner_step_index(obj);
		var step_width = 0;
		if (owner_positionstep > 0 && obj.parent == root_form) {
			step_width = this._inner_form._adjust_width;
		}

		if (pos == "left" || pos == "width" || pos == "right") {
			parent_size = parent._control_element.client_width;
		}
		else {
			parent_size = parent._control_element.client_height;
		}


		var arrange_info;
		var adjust_pos;
		var baseCompid = null;
		var _left = obj._adjust_left - owner_positionstep * step_width;

		var base_comp;
		if (pos == "left") {
			adjust_pos = _left;
			arrange_info = obj._arrange_info ? obj._arrange_info["left"] : null;
			if (arrange_info) {
				var target = obj._findComponentForArrange(arrange_info.compid);
				if (target) {
					baseCompid = arrange_info.compid;
					adjust_pos = obj._adjust_left - (target._adjust_left + target._adjust_width);
					parent_size = target._adjust_width;
				}
			}
		}
		else if (pos == "top") {
			adjust_pos = obj._adjust_top;
			arrange_info = obj._arrange_info ? obj._arrange_info["top"] : null;
			if (arrange_info) {
				var target = obj._findComponentForArrange(arrange_info.compid);
				if (target) {
					baseCompid = arrange_info.compid;
					adjust_pos = obj._adjust_top - (target._adjust_top + target._adjust_height);
					parent_size = target._adjust_height;
				}
			}
		}
		else if (pos == "right") {
			adjust_pos = parent_size - (obj._adjust_width + _left);
			arrange_info = obj._arrange_info ? obj._arrange_info["right"] : null;
			if (arrange_info) {
				var target = obj._findComponentForArrange(arrange_info.compid);
				if (target) {
					baseCompid = arrange_info.compid;
					adjust_pos = target._adjust_left - (obj._adjust_left + obj._adjust_width);
					parent_size = target._adjust_width;
				}
			}
		}
		else if (pos == "bottom") {
			adjust_pos = parent_size - (obj._adjust_top + obj._adjust_height);
			arrange_info = obj._arrange_info ? obj._arrange_info["bottom"] : null;
			if (arrange_info) {
				var target = obj._findComponentForArrange(arrange_info.compid);
				if (target) {
					baseCompid = arrange_info.compid;
					adjust_pos = target._adjust_top - (obj._adjust_top + obj._adjust_height);
					parent_size = target._adjust_height;
				}
			}
		}
		else if (pos == "width") {
			adjust_pos = obj._adjust_width;
			arrange_info = obj._arrange_info ? obj._arrange_info["width"] : null;
			if (arrange_info) {
				var target = obj._findComponentForArrange(arrange_info.compid);
				if (target) {
					baseCompid = arrange_info.compid;
					parent_size = target._adjust_width;
				}
			}
		}
		else if (pos == "height") {
			adjust_pos = obj._adjust_height;
			arrange_info = obj._arrange_info ? obj._arrange_info["height"] : null;
			if (arrange_info) {
				var target = obj._findComponentForArrange(arrange_info.compid);
				if (target) {
					baseCompid = arrange_info.compid;
					parent_size = target._adjust_height;
				}
			}
		}
		else {
			adjust_pos = eval("obj._adjust_" + pos);
		}

		if (unit == "px") {
			var new_prop_val;

			if (pos == "right") {
			}

			if (baseCompid) {
				new_prop_val = baseCompid;
				new_prop_val += ":";
				new_prop_val += adjust_pos;
				eval("obj.set_" + pos + "(" + 'new_prop_val' + ");");
			}
			else {
				new_prop_val = adjust_pos;
				eval("obj.set_" + pos + "(" + new_prop_val + ");");
			}
		}
		else {
			if (pos == "right") {
			}
			var new_prop_val;
			if (baseCompid) {
				new_prop_val = baseCompid;
				new_prop_val += ":";
				new_prop_val += nexacro.round((adjust_pos * 100) / parent_size, 2);
				new_prop_val += "%";
				eval("obj.set_" + pos + "(" + 'new_prop_val' + ");");
			}
			else {
				new_prop_val = nexacro.round((adjust_pos * 100) / parent_size, 2);
				new_prop_val += "%";
				eval("obj.set_" + pos + "(" + 'new_prop_val' + ");");
			}
		}
	};

	_pDesignForm._findSubLayoutMode = function (obj) {
		if (obj instanceof nexacro.Div) {
			for (var i = 0; i < this._sublayoutmode_stack.length; i++) {
				if (obj == this._sublayoutmode_stack[i].comp) {
					return this._sublayoutmode_stack[i];
				}
			}
		}
	};

	_pDesignForm._getLayout = function (obj, layoutname) {
		if (!obj) {
			return;
		}

		if (!layoutname || layoutname == "" || layoutname == "default") {
			return obj._default_layout;
		}
		else {
			return obj._layout_list[layoutname];
		}
	};

	_pDesignForm._refreshStepContainer = function (obj, stepcount) {
		if (!obj) {
			return;
		}

		var win = this._getWindow();
		if (!win || !win.handle) {
			return;
		}

		if (this._active_editing_form != obj) {
			return;
		}

		var control_elem = obj._control_element;
		if (!control_elem) {
			return;
		}

		if (!control_elem._step_containers) {
			control_elem._step_containers = [];
		}

		var list = control_elem._step_containers;
		var list_len = list.length;
		if (list_len + 1 < stepcount) {
			nexacro.__setElementHandleStepCount(control_elem.handle, stepcount);

			var parent_elem = control_elem.parent_elem;
			var width = obj._adjust_width;
			var height = obj._adjust_height;
			for (var i = list_len; i < stepcount - 1; i++) {
				var elem = new nexacro.ScrollableControlElement(parent_elem);
				elem.setLinkedControl(this);

				elem.setElementTypeCSSSelector(this.on_get_css_assumedtypename());
				elem.setElementPosition(control_elem.left + ((i + 1) * width), control_elem.top);
				elem.setElementSize(width, height);

				elem.create(win);
				list.push(elem);

				parent_elem.sendToBackElement(elem);

				nexacro.__setElementHandleDotSize(elem.handle, this._dot_size_x, this._dot_size_y);
				nexacro.__setElementHandleDotStyle(elem.handle, this._dot_style);
				nexacro.__setElementHandleDotVisible(elem.handle, this._dot_visible);
			}
		}
		else if (list_len > stepcount - 1) {
			for (var i = list_len - 1; i >= stepcount - 1 && i >= 0; i--) {
				var elem = list[i];
				elem.destroy();
				list[i] = null;
				delete elem;
			}
			list.length = Math.max(0, stepcount - 1);
		}

		var comps = obj.components;
		var comps_len = comps ? comps.length : 0;
		for (var i = 0; i < comps_len; i++) {
			this._on_update_property(comps[i], "positionstep");
		}

		{

			var parent_elem = control_elem.parent_elem;
			for (var i = 0; i < stepcount - 1; i++) {
				var elem = list[i];
				parent_elem.sendToBackElement(elem);
			}
		}
		this._updateStepContainerStyle(control_elem, 0xffffffff);
	};

	_pDesignForm._recalcStepContainer = function (obj) {
		if (!obj) {
			return;
		}

		var control_elem = obj._control_element;

		var list = control_elem ? control_elem._step_containers : null;
		if (!list || list.length < 1) {
			return;
		}

		var parent_elem = control_elem.parent_elem;
		var width = obj._adjust_width;
		var height = obj._adjust_height;
		for (var i = 0; i < list.length; i++) {
			var elem = list[i];

			elem.setElementPosition(control_elem.left + ((i + 1) * width), control_elem.top);
			elem.setElementSize(width, height);
			parent_elem.sendToBackElement(elem);
		}

		var comps = this._getChilds(obj);
		var comps_len = comps ? comps.length : 0;
		for (var i = 0; i < comps_len; i++) {
			var comp = comps[i];
			if (comp.positionstep == -1) {
				var elem = comp._control_element;
				var elem_handle = elem ? elem.handle : null;
				if (elem_handle) {
					nexacro.__setElementHandleStepWidth(elem_handle, width);
				}
			}
		}
	};

	_pDesignForm._showDotGrid = function (obj, is_show) {
		if (!obj) {
			return;
		}

		var control_elem = obj._control_element;
		if (!control_elem) {
			return;
		}

		if (is_show) {
			nexacro.__setElementHandleDotSize(control_elem.handle, this._dot_size_x, this._dot_size_y);
			nexacro.__setElementHandleDotStyle(control_elem.handle, this._dot_style);
			nexacro.__setElementHandleDotVisible(control_elem.handle, this._dot_visible);

			var step_container_elems = control_elem._step_containers;
			if (step_container_elems && step_container_elems.length > 0) {
				for (var i = 0; i < step_container_elems.length; i++) {
					control_elem = step_container_elems[i];
					nexacro.__setElementHandleDotSize(control_elem.handle, this._dot_size_x, this._dot_size_y);
					nexacro.__setElementHandleDotStyle(control_elem.handle, this._dot_style);
					nexacro.__setElementHandleDotVisible(control_elem.handle, this._dot_visible);
				}
			}
		}
		else {
			nexacro.__setElementHandleDotVisible(control_elem.handle, false);

			var step_container_elems = control_elem._step_containers;
			if (step_container_elems && step_container_elems.length > 0) {
				for (var i = 0; i < step_container_elems.length; i++) {
					control_elem = step_container_elems[i];
					nexacro.__setElementHandleDotVisible(control_elem.handle, false);
				}
			}
		}
	};

	_pDesignForm._updateStepContainerStyle = function (control_elem, option) {
		if (!control_elem) {
			return;
		}

		var obj = control_elem.linkedcontrol;
		var list = control_elem ? control_elem._step_containers : null;
		if (!list) {
			return;
		}

		for (var i = 0; i < list.length; i++) {
			var elem = list[i];
			if (option & 0x01) {
				if (obj._border) {
					elem.setElementBorder(obj._border);
				}
				else {
					elem.setElementBorder(null);
				}
				if (obj._borderradius) {
					elem.setElementBorderRadius(obj._borderradius);
				}
				else {
					elem.setElementBorderRadius(null);
				}
			}
			if (option & 0x02) {
				if (obj._background) {
					elem.setElementBackground(obj._background);
				}
				else {
					elem.setElementBackground(null);
				}
			}
			if (option & 0x04) {
				if (obj._color) {
					elem.setElementColor(obj._color);
				}
				else {
					elem.setElementColor(null);
				}
			}
			if (option & 0x08) {
				if (obj._opacity) {
					elem.setElementOpacity(obj._opacity);
				}
				else {
					elem.setElementOpacity(null);
				}
			}
			if (option & 0x10) {
			}
			if (option & 0x20) {
				if (obj._font) {
					elem.setElementFont(obj._font);
				}
				else {
					elem.setElementFont(null);
				}
			}
		}
	};

	_pDesignForm._getCompStepLogicalOffset = function (comp) {
		var parent = comp.parent;
		var step_logical_offset = 0;
		if (!nexacro._isNull(parent._design_form)) {
			var mlm = nexacro._getLayoutManager();

			var layout = this._getLayout(parent, parent._current_layout_name);

			if (layout && layout.stepcount > 1) {
				var positionstep = comp.positionstep;
				if (positionstep === undefined) {
					positionstep = 0;
				}

				if (positionstep !== undefined) {
					if (positionstep < 0 || positionstep > layout.stepcount - 1) {
						positionstep = 0;
					}

					step_logical_offset = parent._adjust_width * positionstep;
				}
			}
		}

		return step_logical_offset;
	};

	_pDesignForm._getSubControlList = function (comp) {
		var list = [];

		for (var p in comp) {
			if (typeof (comp[p]) == "object" && comp[p] instanceof nexacro.Component) {
				var control = comp[p];
				if (comp == control) {
					continue;
				}
				if (control.parent != comp) {
					continue;
				}
				if (control._is_subcontrol) {
					list.push(control);
				}
			}
		}

		return list;
	};

	_pDesignForm._loadCss = function (url, refresh_designform, add_to_cssurls) {
	};

	_pDesignForm._on_load_cssmodule = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri) {
	};

	_pDesignForm.on_notify_init = function (obj, e) {
		if (!_application.accessport) {
			return;
		}

		var accessport = _application.accessport.getFormAccessPort(this._url);
		if (accessport) {
			this.accessport = accessport;
			accessport._setTarget(this);
		}

		this._createInnerForm();
	};

	_pDesignForm._getVScrollBarType = function () {
		return "none";
	};

	_pDesignForm._getHScrollBarType = function () {
		return "none";
	};

	_pDesignForm._createInnerForm = function () {
		try {
			var form = new nexacro.Form("_inner_form", this._root_left, this._root_top, this.inner_width, this.inner_height, null, null, null, null, null, null, this);

			this.addChild(form.name, form);
			form.show();
			this._inner_form = form;
			this._active_editing_form = form;

			form.on_create_control_element = function (parent_elem) {
				if (!parent_elem) {
					return null;
				}

				var control_elem;
				if (this._is_scrollable) {
					control_elem = this.on_create_scrollable_control_element(parent_elem);
				}
				else {
					control_elem = this.on_create_normal_control_element(parent_elem);
				}

				return control_elem;
			};

			var scrollbartype = form.scrollbartype;
			form._onRecalcScrollSize = nexacro._emptyFn;
			form._onResetScrollBar = nexacro._emptyFn;




			form._design_form = this;

			form._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
				nexacro.DesignForm.prototype._adjustPosition_assignPart.call(this, left, top, right, bottom, width, height, parentWidth, parentHeight);
				var bRtl = this._isRtl(this.parent);

				if (this._width != null || (this._right != null && this._left != null)) {
					this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;
				}

				if (this._height != null || this._bottom != null) {
					this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;
				}

				var design_form = this._design_form;
				var scale = design_form._getZoom();
				if (this._left != null || this._right != null) {
					this._adjust_left_ltr = this._adjust_left = this._left != null ? this._left : parentWidth - this._right - this._adjust_width;

					var temp = this._adjust_left_ltr;
					temp = design_form._root_left / (scale / 100) - design_form._scroll_left;
					this._adjust_left_ltr = this._adjust_left = temp;

					if (bRtl) {
						this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
					}
				}

				if (this.top != null || this._bottom != null) {
					this._adjust_top = this._top != null ? this._top : parentHeight - this._bottom - this._adjust_height;

					var temp = this._adjust_top;
					temp = design_form._root_top / (scale / 100) - design_form._scroll_top;
					this._adjust_top = temp;
				}

				if (this.left && this.width && this.right) {
					this._right = 0;
					this.right = null;
				}

				if (this.top && this.height && this.bottom) {
					this._bottom = 0;
					this.bottom = null;
				}

				design_form._recalcStepContainer(this);
			};
		}
		catch (e) {
			if (e.obj) {
				nexacro.__onNexacroStudioError(e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);
				nexacro.__onNexacroStudioError(msg);
			}
		}
	};

	_pDesignForm._adjustPosition_assignPart = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
		this._parseArrangeInfo(left, top, right, bottom, width, height);
	};

	_pDesignForm._on_designform_onsize = function () {
		var _stack = this._sublayoutmode_stack;
		if (_stack.length > 0) {
			var _win = this._getWindow();
			if (!_win || !_win.handle) {
				return;
			}

			for (var i = 0; i < _stack.length; i++) {
				var overlay_elem = _stack[i].overlay_elem;
				var parent_elem = overlay_elem.parent_elem;

				var width = nexacro.__getWindowHandleClientWidth(_win.handle);
				var height = nexacro.__getWindowHandleClientHeight(_win.handle);

				nexacro.__setElementHandleSize(overlay_elem._handle, width, height);
			}
		}
	};

	delete _pDesignForm;

	if (nexacro.Environment) {
		var _pEnvironment = nexacro.Environment.prototype;
		_pEnvironment.set_userfontid = function (v) {
			this.userfontid = v;
		};
	}

	nexacro.ApplicationAccessPort = function (target) {
		this.target = target;
		this._formaccessport = [];
		this._block_css_notify = false;
		this._refresh_css = false;
	};

	var _pApplicationAccessPort = nexacro._createPrototype(nexacro.Object, nexacro.ApplicationAccessPort);
	nexacro.ApplicationAccessPort.prototype = _pApplicationAccessPort;
	_pApplicationAccessPort.setInspectorHandle = function (handle) {
	};

	_pApplicationAccessPort.getObjectList = function (type) {
	};

	_pApplicationAccessPort.getObjectCount = function (type) {
	};

	_pApplicationAccessPort.getObjectByID = function (type, objid) {
	};

	_pApplicationAccessPort.getObjectByIndex = function (type, index) {
	};

	_pApplicationAccessPort.getVariant = function (varid) {
	};

	_pApplicationAccessPort.notifySelect = function (command, obj) {
	};

	_pApplicationAccessPort.getComponentRect = function (compid, isroot) {
	};

	_pApplicationAccessPort.getCurrentStyleValue = function (compid, propid, pseudo) {
	};

	_pApplicationAccessPort.InitializeApplicationProperties = function () {
		_pApplication.componentpath = "";
		_pApplication.commthreadcount = 0;
		_pApplication.commthreadwaittime = 0;
		_pApplication.cachedir = "";
		_pApplication.errorfile = "";
		_pApplication.onlyone = false;
		_pApplication.version = "";
		_pApplication.engineversion = "2.0";
		_pApplication.enginesetupkey = "";
		_pApplication.licenseurl = "";
		_pApplication.mousehovertime = 500;
		_pApplication.mousewheeltype = 0;
		_pApplication.imepastemode = 0;
		_pApplication.locale = 0;
		_pApplication.errorlevel = 0;
		_pApplication.cookiecachetype = "cache";
		_pApplication.loadingimage = "";

		_pApplication.accessibilityfirstovermessage = "";
		_pApplication.accessibilitylastovermessage = "";
		_pApplication.accessibilityreplayhotkey = "";
		_pApplication.accessibilitybackwardkey = "";
		_pApplication.accessibilityforwardkey = "";
		_pApplication.accessibilitywholereadhotkey = "";
		_pApplication.accessibilityhistorycount = 5;
		_pApplication.accessibilitytype = "standard";
		_pApplication.accessibilitydescreadtype = "label";
		_pApplication.accessibilitywholereadtype = "none";
		_pApplication.accessibilityheadingnexthotkey = "";
		_pApplication.accessibilityheadingprevhotkey = "";
		_pApplication.accessibilitycomponentnexthotkey = "";
		_pApplication.accessibilitycomponentprevhotkey = "";
	};

	_pApplicationAccessPort.setDotSize = function (measure, size) {
		var form_aps = this._formaccessport;
		var len = form_aps.length;
		for (var i = 0; i < len; i++) {
			var form_ap = form_aps[i].accessport;
			form_ap.setDotSize(measure, size);
		}
	};

	_pApplicationAccessPort.setDotStyle = function (style) {
		var form_aps = this._formaccessport;
		var len = form_aps.length;
		for (var i = 0; i < len; i++) {
			var form_ap = form_aps[i].accessport;
			form_ap.setDotStyle(style);
		}
	};

	_pApplicationAccessPort.setDotVisible = function (visible) {
		var form_aps = this._formaccessport;
		var len = form_aps.length;
		for (var i = 0; i < len; i++) {
			var form_ap = form_aps[i].accessport;
			form_ap.setDotVisible(visible);
		}
	};

	_pApplicationAccessPort.createFormAccessPort = function (url) {
		var realurl = nexacro._getFDLLocation(url);
		if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl") {
			realurl = realurl + ".js";
		}

		var len = this._formaccessport.length;
		for (var i = 0; i < len; i++) {
			if (this._formaccessport[i].url == realurl) {
				return this._formaccessport[i].accessport;
			}
		}

		this._formaccessport.push({
			url : realurl, 
			accessport : new nexacro.FormAccessPort()
		});
	};

	_pApplicationAccessPort.removeFormAccessPort = function (url) {
		var realurl = nexacro._getFDLLocation(url);
		if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl") {
			realurl = realurl + ".js";
		}

		var form_aps = this._formaccessport;
		var form_aps_len = form_aps ? form_aps.length : 0;
		for (var i = 0; i < form_aps_len; i++) {
			var form_ap = form_aps[i];
			if (form_ap.url == realurl) {
				form_ap.accessport.destroy();
				form_ap.accessport = null;

				delete form_ap;
				form_aps[i] = null;

				form_aps.splice(i, 1);
				break;
			}
		}
	};

	_pApplicationAccessPort.getFormAccessPort = function (url) {
		var realurl = nexacro._getFDLLocation(url);
		if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl") {
			realurl = realurl + ".js";
		}

		var len = this._formaccessport.length;
		for (var i = 0; i < len; i++) {
			if (this._formaccessport[i].url == realurl) {
				return this._formaccessport[i].accessport;
			}
		}

		return null;
	};

	_pApplicationAccessPort.createDesignFrame = function (url, _handle, width, height) {
		try {
			var obj = new ChildFrame("childdesignframe", null, null, width, height, null, null, "", this.target.mainframe);

			obj.set_formurl(url);
			obj.set_autosize("false");
			obj.set_showtitlebar("false");
			obj.set_showstatusbar("false");

			obj.set_border("0px none");

			obj.showDesign(url, this.target.mainframe, null, null, _handle);
		}
		catch (e) {
			if (e.obj) {
				nexacro.__onNexacroStudioError(e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);
				nexacro.__onNexacroStudioError(msg);
			}
		}
	};

	_pApplicationAccessPort.clearGlobalVariables = function () {
		var datasets = _application._datasets;
		var length = datasets ? datasets.length : 0;
		for (var i = length - 1; i >= 0; i--) {
			var dataset = datasets[i];
			if (dataset && dataset.name) {
				this.deleteObject(dataset.name);
				dataset = null;
			}
		}
	};

	_pApplicationAccessPort.addConstColumn = function (datasetid, columnid, type, size, value) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds._addConstColumn(columnid, nexacro._decodeXml(value), type, size);
		}
	};

	_pApplicationAccessPort.insertConstColumn = function (datasetid, index, columnid, type, size, value) {
	};

	_pApplicationAccessPort.deleteConstColumn = function (datasetid, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
				ds._constVars.delete_item(col);
			}
		}
	};

	_pApplicationAccessPort.setConstColumnProperty = function (datasetid, col, propid, propval) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
			}
		}
	};

	_pApplicationAccessPort.getConstColumnProperty = function (datasetid, col, propid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
				if (constVar[propid]) {
					return constVar[propid];
				}
			}
		}
	};

	_pApplicationAccessPort.addColumn = function (datasetid, columnid, type, size, prop, sumtext) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds._addColumn(columnid, type, size, prop, sumtext);
		}
	};

	_pApplicationAccessPort.insertColumn = function (datasetid, idx, id, strtype, size, prop, text) {
		var ds = this._getObject(datasetid);
		if (!ds || !(ds instanceof nexacro.Dataset)) {
			return;
		}

		if ((id in ds.colinfos) || (id in ds._constVars)) {
			return -1;
		}

		var type;
		if (strtype == undefined) {
			type = 1;
			strtype = "STRING";
		}
		else {
			type = nexacro.DataUtils._typeint[strtype.toLowerCase()];
		}

		if (type == null) {
			type = 1;
		}
		if ((+size) != (+size)) {
			size = 256;
		}



		var newcolinfo = new nexacro.DSColumnInfo(id, strtype, type, size, prop, text, ds.colinfos.length);
		ds.colcount++;
		return ds.colinfos.insert_item(idx, id, newcolinfo);
	};

	_pApplicationAccessPort.deleteColumn = function (datasetid, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.deleteColumn(col);
		}
	};

	_pApplicationAccessPort.setColumnProperty = function (datasetid, col, propid, propval) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var colinfo = ds.getColumnInfo(col);
			if (colinfo) {
				if (propid == "id") {
					if (ds.getColumnInfo(propval)) {
						return false;
					}


					var idx = ds.colinfos._idxMap[colinfo.id];
					ds.colinfos.update_id(idx, propval);
				}
				else if (propid == "type") {
					colinfo[propid] = propval;

					nexacro.DSColumnInfo.call(colinfo, colinfo.id, colinfo.type, colinfo.ntype, colinfo.size, colinfo.prop, colinfo.sumtext, colinfo._index);
				}
				else {
					colinfo[propid] = propval;
				}
			}
		}
	};

	_pApplicationAccessPort.getColumnProperty = function (datasetid, col, propid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var colinfo = ds.getColumnInfo(col);
			if (colinfo) {
				if (colinfo[propid]) {
					return colinfo[propid];
				}
			}
		}
	};

	_pApplicationAccessPort.addRow = function (datasetid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.addRow();
		}
	};

	_pApplicationAccessPort.insertRow = function (datasetid, index) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.insertRow(index);
		}
	};

	_pApplicationAccessPort.deleteRow = function (datasetid, row) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.deleteRow(row);
		}
	};

	_pApplicationAccessPort.setColumn = function (datasetid, row, col, value) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			return ds.setColumn(row, col, value);
		}

		return false;
	};

	_pApplicationAccessPort.getColumn = function (datasetid, row, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			return ds.getColumn(row, col);
		}

		return false;
	};

	_pApplicationAccessPort.createFrame = function (classname, parentid, frameid) {
		var parent;
		if (parentid) {
			parent = this._getObject(parentid);
		}

		if (!parent) {
			parent = _application;
		}

		if (!frameid || frameid.length == 0) {
			frameid = this._getNextChildID(parent, classname);
		}

		var classnameobj = eval(classname);
		if (classnameobj) {
			var obj = null;

			if (classname == "MainFrame") {
				if (_application.mainframe) {
					var mainframe = _application.mainframe;
					mainframe._on_close();
					mainframe._destroy();
					delete _application[frameid];
					_application.all.delete_item(frameid);
					_application.mainframe = null;
				}

				obj = _application.createMainFrame(frameid, null, null, null, null, null, null, null, parent);

				obj.createComponent();
				obj.on_created();

				return frameid;
			}
			else if (classname == "ChildFrame") {
				obj = new classnameobj(frameid, null, null, null, null, null, null, "", parent);
			}
			else {
				obj = new classnameobj(frameid, null, null, null, null, null, null, parent);
			}
			obj.show();
			parent.addChild(frameid, obj);

			return frameid;
		}
	};

	_pApplicationAccessPort.deleteFrame = function (frameid) {
		var frame = this._getObject(frameid);
		var parent = frame.parent;
		if (frame && parent) {
			if (!parent.removeChild) {
				trace("* no method: 'removeChild' / " + parent);
				return;
			}
			parent.removeChild(frame.name);
			return frame.destroyComponent();
		}
	};

	_pApplicationAccessPort.moveFrame = function (frameid, left, top, width, height, right, bottom) {
		var frame = this._getObject(frameid);
		if (frame) {
			return frame.move(left, top, width, height, right, bottom);
		}
	};

	_pApplicationAccessPort.createInvisibleObject = function (classname, objid) {
		if (!objid || objid.length == 0) {
			objid = this._getNextChildID(this, classname);
		}

		var classnameobj = eval(classname);
		if (classnameobj) {
			var obj = new classnameobj(objid, _application);
			if (obj instanceof nexacro.Dataset) {
				obj._setContents("");
				_application._addDataset(obj.name, obj);
			}

			else {
				_application._addObject(obj.name, obj);
			}

			return obj.name;
		}
	};

	_pApplicationAccessPort.setContents = function (compid, contents, jsonval) {
		var obj = this._getObject(compid);
		if (!obj || !obj._setContents) {
			return;
		}

		var contents_val = contents;
		if (jsonval === true && !nexacro._isNull(contents) && contents.length > 0) {
			eval("contents_val = " + contents);
		}

		obj._setContents(contents_val);
	};

	_pApplicationAccessPort.deleteObject = function (objid) {
		if (_application._datasets[objid]) {
			var idx = _application._datasets.indexOf(objid);
			_application._datasets.splice(idx, 1);

			delete _application[objid];
			_application.all.delete_item(objid);
		}
		else {
			delete _application[objid];
			_application.all.delete_item(objid);
		}
	};

	_pApplicationAccessPort.getProperty = function (objid, propid, pseudo) {
		var obj = this._getObject(objid);
		if (obj) {
			return nexacro._getProperty(obj, propid, pseudo);
		}
		else {
			trace("_pApplicationAccessPort.getProperty( " + objid + ", " + propid + ", " + pseudo + " )");
			trace("> obj is null!");
		}
	};
	_pApplicationAccessPort.getStyleProperty = function (objid, propid) {
		var obj = this._getObject(objid);
		if (obj) {
			return nexacro._getStyleProperty(obj, propid);
		}
		else {
			trace("_pApplicationAccessPort.getStyleProperty( " + objid + ", " + propid + ", " + childelement + " )");
			trace("> obj is null!");
		}
	};

	_pApplicationAccessPort.getComputedStylePropertiesWithCallback = function (objid, propids, ret_handle) {
		var obj = this._getObject(objid);
		if (obj) {
			return nexacro._getComputedStylePropertiesWithCallback(obj, propids, ret_handle);
		}
		else {
			trace("_pApplicationAccessPort.getComputedStylePropertiesWithCallback( " + objid + ", " + propids + ", " + ret_handle + " )");
			trace("> obj is null!");
		}

		return "";
	};

	_pApplicationAccessPort.setProperty = function (objid, propid, propval, pseudo) {
		var obj = this._getObject(objid);
		if (obj) {
			if (propid == "id") {
				propid = "name";
			}

			if (propid == "name") {
				var parent_obj = obj.parent;
				var old_id = obj.name;
				var new_id = propval;

				if (nexacro._isNull(parent_obj)) {
					return;
				}

				var idx = parent_obj.all.indexOf(old_id);
				if (idx < 0) {
					return;
				}
				parent_obj.all.update_id(idx, new_id);

				if (parent_obj._frames) {
					idx = parent_obj._frames.indexOf(old_id);
					if (idx < 0) {
						return;
					}
					parent_obj._frames.update_id(idx, new_id);
				}

				delete parent_obj[old_id];
				parent_obj[new_id] = obj;

				obj.set_id(new_id);
				obj.name = new_id;

				return obj[propid];
			}

			var ret = nexacro._setProperty(obj, propid, propval, pseudo);
			if (ret === true) {
				if (obj["design_get_" + propid]) {
					return obj["design_get_" + propid]();
				}
				else {
					return obj[propid];
				}
			}
			else {
				return;
			}
		}
	};


	_pApplicationAccessPort.setInitValueID = function (objid, value) {
		var obj = this._getObject(objid);
		if (obj) {
			nexacro._setInitValueID(obj, value);
		}
	};


	_pApplicationAccessPort.getBorderWidth = function (objid) {
		var obj = this._getObject(objid);
		return nexacro._getBorderWidth(obj);
	};


	_pApplicationAccessPort._getObject = function (objid) {
		if (!objid || objid == "this" || objid == "_application") {
			return _application;
		}

		if (objid == "env" || objid == "Environment") {
			return nexacro.getEnvironment();
		}

		var obj = eval("_application." + objid);
		if (obj) {
			return obj;
		}

		return _application.all.get_item(objid);
	};

	_pApplicationAccessPort._getNextChildID = function (parent, classname) {
		if (!parent || !classname) {
			trace("parent or classname is missing");
			return "error";
		}

		var nextnum = 0;
		var nextid;
		while (true) {
			nextid = classname + ((nextnum < 10) ? "0" : "") + nextnum;
			if (!parent[nextid]) {
				break;
			}
			nextnum++;
		}

		return nextid;
	};

	_pApplicationAccessPort.setCssList = function (csslist) {
		this._clearStyles();


		_application._css_context_list = [];
		_application._find_csslist = [];

		_application._load_manager.localList = [];
		_application._load_manager.localCnt = 0;

		for (var i = 0; i < csslist.length; i++) {
			var cssurl = csslist[i];
			var css_context = nexacro._getDesignCssContext(cssurl);
			if (!css_context) {
				trace("> Not Cached: " + cssurl);
				css_context = new nexacro.DesignCssContext(cssurl);
				if (cssurl.indexOf(".xtheme") > 0) {
					nexacro._loadTheme2(cssurl, css_context);
				}
				else {
					nexacro._loadCss2(cssurl, css_context);
				}

				nexacro._addDesignCssContext(css_context);
			}
			else {
				trace("> Cached: " + cssurl);
			}

			_application._css_context_list.push(css_context);
			_application._find_csslist.unshift(css_context._css_selectors);
		}

		this._refreshStyles();

		nexacro.__notifyToNexacroStudio(nexacro._design_notify_refresh_properties, null);
	};

	_pApplicationAccessPort._clearStyles = function (comp) {
		if (comp === undefined) {
			comp = _application.mainframe;
		}
		else if (comp === null) {
			return;
		}


		if (comp instanceof nexacro.MainFrame) {
			_application._find_csslist = null;
			_application._cssfinder_cache = {
			};


			this._clearStyles(comp.frame);
		}
		else if (comp instanceof nexacro.FrameSet) {
			var len = comp.frames.length;
			for (var i = 0; i < len; i++) {
				this._clearStyles(comp.frames[i]);
			}
		}
	};

	_pApplicationAccessPort._refreshStyles = function (comp) {
		if (comp === undefined) {
			comp = _application.mainframe;
		}
		else if (comp === null) {
			return;
		}

		if (comp instanceof nexacro.MainFrame) {
			this._refreshStyles(comp.frame);
		}
		else if (comp instanceof nexacro.FrameSet) {
			var len = comp.frames.length;
			for (var i = 0; i < len; i++) {
				this._refreshStyles(comp.frames[i]);
			}
		}
	};

	_pApplicationAccessPort._loadTheme = nexacro._emptyFn;
	_pApplicationAccessPort._loadCss = nexacro._emptyFn;
	_pApplicationAccessPort._on_load_thememodule = nexacro._emptyFn;
	_pApplicationAccessPort._on_load_cssmodule = nexacro._emptyFn;




	_pApplicationAccessPort.updateCSS = function (url) {
		var updated_context = nexacro._updateDesignCssContext(url);
	};


	_pApplicationAccessPort.addService = function (prefixid, type, url, cachelevel, codepage, language, version, communication) {
		nexacro._addService(prefixid, type, url, cachelevel, codepage, language, version, communication);

		var env = nexacro.getEnvironment();
	};

	_pApplicationAccessPort.deleteService = function (prefixid) {
		nexacro._removeService(prefixid);
	};

	_pApplicationAccessPort.changeService = function (prefixid, propid, propval) {
		var env = nexacro.getEnvironment();

		var service = env.services[prefixid];
		if (service) {
			if (propid == "prefixid") {
				var idx = env.services.indexOf(prefixid);
				if (idx < 0) {
					return;
				}
				env.services.update_id(idx, propval);

				service.prefixid = propval;
			}
			else {
				service[propid] = propval;
			}
		}
	};

	delete _pApplicationAccessPort;


	nexacro.FormAccessPort = function (target) {
		this.target = target;
		this.notify_handle = null;
	};

	var _pFormAccessPort = nexacro._createPrototype(nexacro.Object, nexacro.FormAccessPort);
	nexacro.FormAccessPort.prototype = _pFormAccessPort;

	_pFormAccessPort.destroy = function () {
		if (this.target) {
			this.target.destroy();
			this.target = null;
		}
	};

	_pFormAccessPort.reloadForm = function () {
		return this.target.reloadForm();
	};

	_pFormAccessPort.loadedForm = function () {
		return this.target.loadedForm();
	};

	_pFormAccessPort.setExtraInfo = function (info) {
		return this.target.setExtraInfo(info);
	};

	_pFormAccessPort.setInspectorHandle = function (handle) {
		this.notify_handle = handle;
	};

	_pFormAccessPort.getObjectList = function (type) {
		var form = this.target;
		var len = form.all.length;
		var objlist = [];
		for (var i = 0; i < len; i++) {
			var obj = form.all[i];
			if (obj && obj._type_name == type) {
				objlist.push(comp);
			}
		}
		return objlist;
	};


	_pFormAccessPort.getObjectCount = function (type) {
		var form = this.target;
		var len = form.all.length;
		var cnt = 0;
		for (var i = 0; i < len; i++) {
			var obj = form.all[i];
			if (obj && obj._type_name == type) {
				cnt++;
			}
		}
		return cnt;
	};

	_pFormAccessPort.getObjectByID = function (type, objid) {
		var evalstr = objid;
		var obj = evalstr.replace("this._inner_form", "this._inner_form.target");


		if (obj && obj._type_name == type) {
			return obj;
		}
	};

	_pFormAccessPort.getObjectByIndex = function (type, index) {
	};

	_pFormAccessPort.getVariant = function (varid) {
		var evalstr = varid;
		evalstr.replace("this._inner_form", "this._inner_form.target");
		return eval(evalstr);
	};

	_pFormAccessPort.notifySelect = function (command, obj) {
	};

	_pFormAccessPort._setTarget = function (target) {
		this.target = target;
	};

	_pFormAccessPort.getObject = function () {
		return this.target;
	};

	_pFormAccessPort.createComponent = function (classname, parentid, left, top, width, height, compid, new_create) {
		return this.target.createComponentByRect(classname, parentid, left, top, width, height, compid, new_create);
	};

	_pFormAccessPort.createComponentCSSPreview = function (classname, controlclassname, issubcontrol, parentid, left, top, width, height, compid, props, values, new_create, show) {
		return this.target.createComponentCSSPreview(classname, controlclassname, issubcontrol, parentid, left, top, width, height, compid, props, values, new_create, show);
	};

	_pFormAccessPort.showComponentCSSPreview = function (compid, show) {
		return this.target.showComponentCSSPreview(compid, show);
	};

	_pFormAccessPort.createFrame = function (classname, parentid, frameid) {
		return this.target.createFrame(classname, parentid, frameid);
	};

	_pFormAccessPort.createTabpage = function (classname, parentid, compid) {
		return this.target.createTabpage(classname, parentid, compid);
	};

	_pFormAccessPort.createInvisibleObject = function (classname, objid) {
		return this.target.createInvisibleObject(classname, objid);
	};

	_pFormAccessPort.getChildList = function (parentid) {
		return this.target.getChildList(parentid);
	};

	_pFormAccessPort.deleteObject = function (compid) {
		return this.target.deleteObject(compid);
	};

	_pFormAccessPort.setProperty = function (compid, propid, propval, pseudo) {
		return this.target.setProperty(compid, propid, propval, pseudo);
	};

	_pFormAccessPort.appendInlineStyleValue = function (base_value, append_value) {
		return this.target.appendInlineStyleValue(base_value, append_value);
	};

	_pFormAccessPort.setLayoutStyle = function (compid, base_value, layout_value, sublayout_value) {
		return this.target.setLayoutStyle(compid, base_value, layout_value, sublayout_value);
	};

	_pFormAccessPort.getProperty = function (compid, propid, pseudo) {
		return this.target.getProperty(compid, propid, pseudo);
	};

	_pFormAccessPort.getProperties = function (compids, propids) {
		return this.target.getProperties(compids, propids);
	};

	_pFormAccessPort.getStyleProperty = function (compid, propid) {
		return this.target.getStyleProperty(compid, propid);
	};

	_pFormAccessPort.getStyleProperties = function (compids, propids) {
		return this.target.getStyleProperties(compids, propids);
	};

	_pFormAccessPort.getComputedStyles = function (compid, args) {
		return this.target.getComputedStyles(compid, args);
	};

	_pFormAccessPort.getComputedStylePropertiesWithCallback = function (compid, propids, ret_handle) {
		return this.target.getComputedStylePropertiesWithCallback(compid, propids, ret_handle);
	};

	_pFormAccessPort.getInlineStyleProperty = function (compid, propid, pseudo) {
		return this.target.getInlineStyleProperty(compid, propid, pseudo);
	};

	_pFormAccessPort.getCurrentStyleValue = function (compid, propid, pseudo) {
		return this.target.getCurrentStyleValue(compid, propid, pseudo);
	};

	_pFormAccessPort.moveComponentByRect = function (compid, left, top, width, height, resize) {
		this.target.moveComponentByRect(compid, left, top, width, height, resize);
	};

	_pFormAccessPort.moveComponent = function (compid, left, top, width, height, right, bottom) {
		this.target.moveComponent(compid, left, top, width, height, right, bottom);
	};

	_pFormAccessPort.resizeComponent = function (compid, width, height) {
		this.target.resizeComponent(compid, width, height);
	};

	_pFormAccessPort.swapPositionUnit = function (compid, propid, unit) {
		this.target.swapPositionUnit(compid, propid, unit);
	};

	_pFormAccessPort.preChangePositionBase = function (compid, propid, targetcompid) {
		return this.target.preChangePositionBase(compid, propid, targetcompid);
	};

	_pFormAccessPort.refreshPosition = function (compid) {
		this.target.refreshPosition(compid);
	};

	_pFormAccessPort.fitToContents = function (compid, type) {
		return this.target.fitToContents(compid, type);
	};

	_pFormAccessPort.hitTestByPoint = function (x, y, rootcompid, recursive) {
		return this.target.hitTestByPoint(x, y, rootcompid, recursive);
	};

	_pFormAccessPort.hitTestByRect = function (left, top, width, height, rootcompid, type) {
		return this.target.hitTestByRect(left, top, width, height, rootcompid, type);
	};

	_pFormAccessPort.hitTestTracker = function (x, y, rootcompid, compid) {
		return this.target.hitTestTracker(x, y, rootcompid, compid);
	};

	_pFormAccessPort.hitTestforFormbase = function (x, y, rootcompid) {
		return this.target.hitTestforFormbase(x, y, rootcompid);
	};

	_pFormAccessPort.hitTestParentByPoint = function (x, y, rootcompid) {
		return this.target.hitTestParentByPoint(x, y, rootcompid);
	};

	_pFormAccessPort.hitTestParentByRect = function (left, top, width, height, rootcompid) {
		return this.target.hitTestParentByRect(left, top, width, height, rootcompid);
	};

	_pFormAccessPort.setScroll = function (horz, size) {
		return this.target.setScroll(horz, size);
	};

	_pFormAccessPort.getComponentRect = function (compid, isroot) {
		return this.target.getComponentRect(compid, isroot);
	};

	_pFormAccessPort.getClientRect = function (compid) {
		return this.target.getClientRect(compid);
	};

	_pFormAccessPort.drawWindow = function () {
		return this.target.drawWindow();
	};

	_pFormAccessPort.setDotSize = function (measure, size) {
		this.target.setDotSize(measure, size);
	};

	_pFormAccessPort.setDotStyle = function (style) {
		this.target.setDotStyle(style);
	};

	_pFormAccessPort.setDotVisible = function (visible) {
		this.target.setDotVisible(visible);
	};

	_pFormAccessPort.setPreviewMode = function (is_previewmode) {
		this.target.setPreviewMode(is_previewmode);
	};

	_pFormAccessPort.showPreviewContents = function (compid) {
		this.target.showPreviewContents(compid);
	};

	_pFormAccessPort.updatePreviewPosition = function (compid) {
		this.target.updatePreviewPosition(compid);
	};
	_pFormAccessPort.updatePreviewStyle = function (compid) {
		this.target.updatePreviewStyle(compid);
	};
	_pFormAccessPort.showCssDesignContents = function (compid, objpath, status, statusvalue, userstatus, userstatusvalue) {
		this.target.showCssDesignContents(compid, objpath, status, statusvalue, userstatus, userstatusvalue);
	};
	_pFormAccessPort.getFormBitmap = function () {
		return this.target.getFormBitmap();
	};

	_pFormAccessPort.setBitmapSize = function (width, height) {
		return this.target.setBitmapSize(width, height);
	};

	_pFormAccessPort.setFormSize = function (width, height) {
		return this.target.setFormSize(width, height);
	};

	_pFormAccessPort.DrawOffset = function (offsetx, offsety) {
		return this.target.DrawOffset(offsetx, offsety);
	};

	_pFormAccessPort.setDesignWindowBackground = function (color, innerform) {
		return this.target.setDesignWindowBackground(color, innerform);
	};

	_pFormAccessPort.setRoot = function (left, top) {
		return this.target.setRoot(left, top);
	};

	_pFormAccessPort.setDesignZoom = function (scale) {
		return this.target.setDesignZoom(scale);
	};

	_pFormAccessPort.getDesignZoom = function (scale) {
		return this.target.getDesignZoom(scale);
	};

	_pFormAccessPort.getBorderWidth = function (compid) {
		return this.target.getBorderWidth(compid);
	};

	_pFormAccessPort.getOverlapComponent = function (compid) {
		return this.target.getOverlapComponent(compid);
	};

	_pFormAccessPort.getBindableList = function () {
		return this.target.getBindableList();
	};

	_pFormAccessPort.setName = function (compid, propval) {
		return this.target.setName(compid, propval);
	};

	_pFormAccessPort.attachDesignWindow = function (handle) {
		var win = this.target._getWindow();
		if (win && win.handle) {
			nexacro.__attachDesignWindowHandle(win.handle, handle);
		}
	};

	_pFormAccessPort.detachDesignWindow = function () {
		var win = this.target._getWindow();
		if (win && win.handle) {
			nexacro.__detachDesignWindowHandle(win.handle);
		}
	};

	_pFormAccessPort.setOverflowClip = function (overflowclip) {
		this.target.setOverflowClip(overflowclip);
	};

	_pFormAccessPort.showSubLayout = function (compid, bShow, positionstep) {
		this.target.showSubLayout(compid, bShow, positionstep);
	};

	_pFormAccessPort.moveComponentToFront = function (compid) {
		this.target.moveComponentToFront(compid);
	};

	_pFormAccessPort.moveComponentToPrev = function (compid) {
		this.target.moveComponentToPrev(compid);
	};

	_pFormAccessPort.moveComponentToNext = function (compid) {
		this.target.moveComponentToNext(compid);
	};

	_pFormAccessPort.moveComponentToBack = function (compid) {
		this.target.moveComponentToBack(compid);
	};

	_pFormAccessPort.setZorder = function (compid, zorder) {
		this.target.setZorder(compid, zorder, true);
	};

	_pFormAccessPort.setPseudo = function (compid, pseudo) {
		return this.target.setPseudo(compid, pseudo);
	};

	_pFormAccessPort.getPseudo = function (compid) {
		return this.target.getPseudo(compid);
	};

	_pFormAccessPort.addLayout = function (compid, layoutname, width, height, screenid) {
		return this.target.addLayout(compid, layoutname, width, height, screenid);
	};

	_pFormAccessPort.removeLayout = function (compid, layoutname) {
		return this.target.removeLayout(compid, layoutname);
	};

	_pFormAccessPort.removeAllLayout = function (compid) {
		return this.target.removeAllLayout(compid);
	};

	_pFormAccessPort.setLayoutProperty = function (compid, layoutname, propid, propval) {
		return this.target.setLayoutProperty(compid, layoutname, propid, propval);
	};

	_pFormAccessPort.getLayoutProperty = function (compid, layoutname, propid) {
		return this.target.getLayoutProperty(compid, layoutname, propid);
	};

	_pFormAccessPort.changeLayout = function (compid, layoutname) {
		return this.target.changeLayout(compid, layoutname);
	};

	_pFormAccessPort.getCurrentLayout = function (compid) {
		return this.target.getCurrentLayout(compid);
	};

	_pFormAccessPort.setAutoLayoutChange = function (compid, is_auto) {
		return this.target.setAutoLayoutChange(compid, is_auto);
	};

	_pFormAccessPort.refreshLayout = function (compid) {
		this.target.refreshLayout(compid);
	};

	_pFormAccessPort.recalcLayout = function (compid) {
		this.target.recalcLayout(compid);
	};

	_pFormAccessPort.refreshLinkedUrl = function (compid) {
		this.target.refreshLinkedUrl(compid);
	};

	_pFormAccessPort.getControlElementHandle = function (compid) {
		return this.target.getControlElementHandle(compid);
	};

	_pFormAccessPort.setContents = function (compid, contents, jsonval) {
		var contents_val = contents;
		if (jsonval === true && !nexacro._isNull(contents) && contents.length > 0) {
			eval("contents_val = " + contents);
		}

		this.target.setContents(compid, contents_val);
	};
	_pFormAccessPort.makeContentsString = function (compid) {
		return this.target.makeContentsString(compid);
	};

	_pFormAccessPort.setFormats = function (compid, contents) {
		this.target.setFormats(compid, contents);
	};
	_pFormAccessPort.makeFormatString = function (compid) {
		return this.target.makeFormatString(compid);
	};

	_pFormAccessPort.setInnerDataset = function (compid, value, extern) {
		this.target.setInnerDataset(compid, value, extern);
	};

	_pFormAccessPort.setInitValueID = function (compid, value) {
		this.target.setInitValueID(compid, value);
	};

	_pFormAccessPort.callDesignMethod = function (compid, methodname) {
		return this.target.callDesignMethod(compid, methodname);
	};

	_pFormAccessPort.setActiveTabpage = function (compid, index) {
		this.target.setActiveTabpage(compid, index);
	};

	_pFormAccessPort.insertTabpage = function (compid, index, tabpageid) {
		this.target.insertTabpage(compid, index, tabpageid);
	};

	_pFormAccessPort.deleteTabpage = function (compid, index) {
		this.target.deleteTabpage(compid, index);
	};

	_pFormAccessPort.getGridComputedStyles = function (compid, target, type, properties) {
		return this.target.getGridComputedStyles(compid, target, type, properties);
	};

	_pFormAccessPort.addConstColumn = function (datasetid, columnid, type, size, value) {
		nexacro.ApplicationAccessPort.prototype.addConstColumn.call(this.target, datasetid, columnid, type, size, value);
	};

	_pFormAccessPort.insertConstColumn = function (datasetid, index, columnid, type, size, value) {
		nexacro.ApplicationAccessPort.prototype.insertConstColumn.call(this.target, datasetid, index, columnid, type, size, value);
	};

	_pFormAccessPort.deleteConstColumn = function (datasetid, col) {
		nexacro.ApplicationAccessPort.prototype.deleteConstColumn.call(this.target, datasetid, col);
	};

	_pFormAccessPort.setConstColumnProperty = function (datasetid, col, propid, propval) {
		nexacro.ApplicationAccessPort.prototype.setConstColumnProperty.call(this.target, datasetid, col, propid, propval);
	};

	_pFormAccessPort.getConstColumnProperty = function (datasetid, col, propid) {
		nexacro.ApplicationAccessPort.prototype.getConstColumnProperty.call(this.target, datasetid, col, propid);
	};

	_pFormAccessPort.addColumn = function (datasetid, columnid, type, size, prop, sumtext) {
		nexacro.ApplicationAccessPort.prototype.addColumn.call(this.target, datasetid, columnid, type, size, prop, sumtext);
	};

	_pFormAccessPort.insertColumn = function (datasetid, index, columnid, type, size, prop, sumtext) {
		nexacro.ApplicationAccessPort.prototype.insertColumn.call(this.target, datasetid, index, columnid, type, size, prop, sumtext);
	};

	_pFormAccessPort.deleteColumn = function (datasetid, col) {
		nexacro.ApplicationAccessPort.prototype.deleteColumn.call(this.target, datasetid, col);
	};

	_pFormAccessPort.setColumnProperty = function (datasetid, col, propid, propval) {
		nexacro.ApplicationAccessPort.prototype.setColumnProperty.call(this.target, datasetid, col, propid, propval);
	};

	_pFormAccessPort.getColumnProperty = function (datasetid, col, propid) {
		nexacro.ApplicationAccessPort.prototype.getColumnProperty.call(this.target, datasetid, col, propid);
	};

	_pFormAccessPort.addRow = function (datasetid) {
		nexacro.ApplicationAccessPort.prototype.addRow.call(this.target, datasetid);
	};

	_pFormAccessPort.insertRow = function (datasetid, index) {
		nexacro.ApplicationAccessPort.prototype.insertRow.call(this.target, datasetid, index);
	};

	_pFormAccessPort.deleteRow = function (datasetid, row) {
		nexacro.ApplicationAccessPort.prototype.deleteRow.call(this.target, datasetid, row);
	};

	_pFormAccessPort.setColumn = function (datasetid, row, col, value) {
		return nexacro.ApplicationAccessPort.prototype.setColumn.call(this.target, datasetid, row, col, value);
	};

	_pFormAccessPort.getColumn = function (datasetid, row, col) {
		nexacro.ApplicationAccessPort.prototype.getColumn.call(this.target, datasetid, row, col);
	};

	_pFormAccessPort.setCssList = function (csslist) {
		return this.target.setCssList(csslist);
	};

	_pFormAccessPort.setActive = function () {
		this.target.setActive();
	};

	_pFormAccessPort.setThemeUri = function (themename) {
		this.target.setThemeUri(themename);
	};

	delete _pFormAccessPort;


	if (!nexacro.DesignCssContext) {
		nexacro.DesignCssContext = function (url) {
			this._url = url;
			this._css_selectors = {
				_has_items : false, 
				_has_attr_items : false
			};
		};

		var _pDesignCssContext = nexacro._createPrototype(nexacro.Object, nexacro.DesignCssContext);
		nexacro.DesignCssContext.prototype = _pDesignCssContext;

		_pDesignCssContext._addCss = nexacro.Application._addCss;

		delete _pDesignCssContext;
	}

	nexacro.createApplicationAccessPort = function () {
		if (!_application.accessport) {
			_application.accessport = new nexacro.ApplicationAccessPort(_application);
		}
	};

	nexacro.destroyApplicationAccessPort = function () {
		var app_ap = _application.accessport;
		if (app_ap) {
			var form_aps = app_ap._formaccessport;
			var form_aps_len = form_aps ? form_aps.length : 0;
			for (var i = form_aps_len - 1; i >= 0; i--) {
				var form_ap = form_aps[i].accessport;
				if (!form_ap) {
					continue;
				}

				form_ap.destroy();
				delete form_ap;
			}

			form_aps = [];

			delete _application.accessport;
			_application.accessport = null;
		}
	};

	nexacro.closeApplication = function () {
		if (_application) {
			var mainframe = _application.mainframe;
			if (mainframe) {
				mainframe._destroy();
			}

			nexacro._applicationExit(true);
			delete _application;
			_application = null;
		}
	};

	nexacro.getApplicationAccessPort = function () {
		return _application.accessport;
	};





	nexacro.Form.prototype.on_fire_onlayoutchanged = function (obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight) {
		if (this.onlayoutchanged && this.onlayoutchanged._has_handlers) {
			var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayoutname, curlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight);
			return this.onlayoutchanged._fireEvent(this, evt);
		}

		if (curlayoutname == null) {
			return true;
		}

		var win = this._getWindow();
		var frame = this.getOwnerFrame();
		var designform = frame.form;
		if (designform instanceof nexacro.DesignForm) {
			var extra_info = designform._getScopeName(obj) + ":" + newlayoutname;
			nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_layoutchange, designform.id, extra_info);
		}

		return true;
	};





	this.Form = nexacro.DesignForm;


	if (nexacro._Browser == "Runtime") {
		if (nexacro.Element) {
			var _pElement = nexacro.Element.prototype;
			_pElement.setElementVisible = function (visible) {
				if (this.visible != visible) {
					this.visible = visible;
					var design_visible = visible;
					var _handle = this.handle;
					if (_handle) {
						design_visible = true;

						if (this.linkedcontrol) {
							if (this.linkedcontrol instanceof nexacro.Tabpage || this.linkedcontrol._is_subcontrol) {
								design_visible = visible;
							}
						}
						else {
							design_visible = visible;
						}

						nexacro.__setElementHandleVisible(_handle, design_visible);
					}

					this._design_visible = design_visible;
				}
			};
		}

		if (nexacro.ControlElement) {
			var _pControlElement = nexacro.ControlElement.prototype;
			_pControlElement.setElementDisplay = function (display) {
				if (this.display != display) {
					this.display = display;
					var design_visible = (display == "none" ? false : true);
					var handle = this.handle;
					if (handle) {
						design_visible = true;
						if (this.linkedcontrol) {
							if (this.linkedcontrol instanceof nexacro.Tabpage || this.linkedcontrol._is_subcontrol) {
								design_visible = (display == "none" ? false : true);
							}
						}
						else {
							design_visible = (display == "none" ? false : true);
						}

						nexacro.__setElementHandleVisible(handle, design_visible);
					}

					this._design_visible = design_visible;
				}
			};
		}

		nexacro.SubLayoutOverlayElement = function (parent_elem) {
			this.parent = parent_elem;
			this.parent_elem = parent_elem;

			var client_element = new nexacro._ContainerElement(this);
			this._client_element = client_element;
		};

		var _pSubLayoutOverlayElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.SubLayoutOverlayElement);
		nexacro.SubLayoutOverlayElement.prototype = _pSubLayoutOverlayElement;
		_pSubLayoutOverlayElement._type_name = "SubLayoutOverlayElement";

		_pSubLayoutOverlayElement.create = function (background) {
			var parent_elem = this.parent_elem;
			if (this.parent_elem && !this.handle) {
				var _win = this.linkedcontrol._getWindow();
				this._win_handle = _win.handle;

				this.left = 0;
				this.top = 0;
				this.width = parent_elem.width;
				this.height = parent_elem.height;

				var _handle = this.handle = this._dest_handle = nexacro.__createControlElementHandle(this, this._win_handle, this.left, this.top, this.width, this.height, this._getElementClassName(), this.name, this._is_control);
				_handle._linked_element = this;

				var handle_style = _handle.style;
				this.setElementBackground(background);

				this.owner_elem = parent_elem;
				nexacro.__appendElementHandle(parent_elem.handle, _handle);

				this._refreshControl(_handle);

				var client_elem = this._client_element;
				client_elem.left = this.left;
				client_elem.top = this.top;
				client_elem.width = this.width;
				client_elem.height = this.height;

				if (this.handle && !this._client_element.handle) {
					this._client_element.create(_win);
				}
			}
		};

		_pSubLayoutOverlayElement.destroy = function () {
			if (this.handle) {
				nexacro.__destroyElementHandle(this.parent_elem.handle, this.handle);
				this.handle = null;

				this._client_element.destroy();
			}
		};

		_pSubLayoutOverlayElement.getContainerElement = function () {
			return this._client_element;
		};

		_pSubLayoutOverlayElement.getRootWindowHandle = function () {
			return this._win_handle;
		};
		delete _pSubLayoutOverlayElement;
	}
}

