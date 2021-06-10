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

if (nexacro._Browser != "Runtime" && !nexacro.Element) {
	"use strict";
	var _process = true;


	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
		nexacro.__createCanvasElementHandle = function (element, _doc, left, top, width, height) {
			var handle = _doc.createElement("div");
			var handle_style = handle.style;

			nexacro.__setDOMStyle_Pos(handle_style, left, top);
			nexacro.__setDOMStyle_Size(handle, width, height);
			handle._linked_element = element;
			return handle;
		};
		nexacro.__destroyCanvasElementHandle = nexacro._desyroyElementHandle;
	}
	else if (nexacro._Browser != "IE" || (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 9)) {
		nexacro.__createCanvasElementHandle = function (element, _doc, left, top, width, height) {
			var handle = _doc.createElement("canvas");
			var handle_style = handle.style;

			nexacro.__setDOMStyle_Pos(handle_style, left, top);
			nexacro.__setDOMStyle_Size(handle, width, height);

			handle._linked_element = element;
			handle._draw_ctx = handle.getContext("2d");
			return handle;
		};
		nexacro.__destroyCanvasElementHandle = function (_parent_handle, handle) {
			if (_parent_handle) {
				_parent_handle.removeChild(handle);
			}
			handle._draw_ctx = null;
			handle._linked_element = null;
		};
	}



	nexacro.__setLastFocusedElement = function (elem) {
		if (elem) {
			var win = elem.linkedcontrol ? elem.linkedcontrol._getWindow() : (elem.parent_elem ? elem.parent_elem.linkedcontrol._getWindow() : null);
			if (win) {
				var root_win = win;
				while (true) {
					if (root_win instanceof nexacro._PopupWindow) {
						if (root_win == root_win.parent) {
							break;
						}
						root_win = root_win.parent;
					}
					else {
						break;
					}
				}
				if (!root_win) {
					root_win = win;
				}
				root_win._last_focused_elem = elem;
			}
		}
	};



	nexacro.Element = function (parent_elem, id) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.id = id;
		this.name = this.parent_elem.name + ":" + (id || "elem");
	};

	var _pElement = nexacro._createPrototype(nexacro.Object, nexacro.Element);
	nexacro.Element.prototype = _pElement;

	_pElement._type_name = "Element";

	_pElement.parent = null;
	_pElement.parent_elem = null;

	_pElement.id = "";
	_pElement.status = "";
	_pElement.userstatus = "";

	_pElement.left = 0;
	_pElement.top = 0;
	_pElement.width = 0;
	_pElement.height = 0;
	_pElement.visible = true;
	_pElement.mirror = false;
	_pElement.direction = "";

	_pElement.color = null;
	_pElement.font = null;
	_pElement.textDecoration = null;
	_pElement.wordSpacing = null;
	_pElement.letterSpacing = null;


	_pElement.handle = null;
	_pElement.dest_handle = null;
	_pElement.owner_elem = null;

	_pElement._is_nc_element = false;
	_pElement._is_input_element = false;

	_pElement.typeselector = "";
	_pElement.classselector = "";


	_pElement.clearContents = nexacro._emptyFn;

	_pElement.create = function (win) {
		var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && owner_elem.handle && !this.handle) {
			this.owner_elem = owner_elem;
			var _doc = win._doc || owner_elem._getRootWindowHandle();

			var handle = _doc.createElement("div");
			nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
			this.handle = handle;

			handle.id = this.name;
			handle._linked_element = this;

			var handle_style = handle.style;

			this._refreshCommonStyleProps(handle_style);


			nexacro.__appendDOMNode(this._is_nc_element ? owner_elem.handle : owner_elem.dest_handle, handle);
		}
	};

	_pElement.createCommand = function () {
		var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this.handle) {
			this.owner_elem = owner_elem;

			var handle_style = this._getCommonStyleStr();


			var str = "<div id='" + this.name + "' class='" + this._getElementClassName() + "'";
			str += (handle_style) ? (" style='" + handle_style + "'>") : ">";
			str += "</div>";
			return str;
		}
		return "";
	};

	_pElement.attachHandle = function (win) {
		if (this.name && !this.handle) {
			this.handle = win._doc.getElementById(this.name);
		}
	};


	_pElement._removeElementHandle = function () {
		var handle = this.handle;
		if (handle) {
			var dest_handle;
			handle._linked_element = null;
			if (this._is_nc_element) {
				dest_handle = (this.owner_elem ? this.owner_elem.handle : null);
			}
			else {
				dest_handle = (this.owner_elem ? this.owner_elem.dest_handle : null);
			}
			nexacro.__removeDOMNode(dest_handle, handle);
		}
	};

	_pElement._destroyElementHandle = function () {
		var handle = this.handle;
		if (handle) {
			this._removeElementHandle();
			this.handle = null;
		}
	};

	_pElement.destroy = function () {
		this._destroyElementHandle();
		this.owner_elem = null;
		this.parent = null;
		this.parent_elem = null;
	};

	_pElement.isInputElement = function () {
		return this._is_input_element;
	};

	_pElement.stopSysEvent = function () {
		this._event_stop = true;
	};

	_pElement._appendToContainer = function (owner_elem) {
		var handle = this.handle;
		if (this.owner_elem == null) {
			this.owner_elem = owner_elem;
			if (handle && owner_elem.handle) {
				nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
			}
		}
	};

	_pElement._removeFromContainer = function () {
		var owner_elem = this.owner_elem;
		if (owner_elem) {
			this.owner_elem = null;
			var handle = this.handle;
			var linkedcontrol = this.linkedcontrol;
			if (linkedcontrol._findOwnerElementHandle) {
				var owner_elem_info = linkedcontrol._findOwnerElementHandle();
				if (owner_elem_info.is_append) {
					if (owner_elem_info.ref_handle) {
						nexacro.__removeDOMNode(owner_elem_info.ref_handle, handle);
					}
					else {
						nexacro.__removeDOMNode(owner_elem_info.owner_handle, handle);
					}
				}
			}
			else if (handle && owner_elem.handle) {
				if (this._is_nc_element) {
					nexacro.__unlinkDOMNode(owner_elem.handle, handle);
				}
				else if (owner_elem.dest_handle != handle) {
					nexacro.__unlinkDOMNode(owner_elem.dest_handle, handle);
				}
			}
		}
	};


	_pElement.getContainerElement = function () {
		return this;
	};

	_pElement._getRootWindowHandle = function () {
		if (this.owner_elem) {
			return this.owner_elem._getRootWindowHandle();
		}
		return null;
	};

	_pElement._getElementDirection = function () {
		var elem = this.parent_elem;
		var direction = this.direction;
		while (elem) {
			if (elem.direction && elem.direction != "inherit") {
				return elem.direction;
			}
			elem = elem.parent_elem;
		}
		return direction;
	};

	_pElement.setElementPosition = function (left, top, bforce) {
		if (this.left != left || this.top != top || bforce) {
			this.left = left;
			this.top = top;

			var handle = this.handle;
			if (handle) {
				if (this._use_translate_move) {
					if (this._style_left == undefined || this._style_top == undefined) {
						this._style_left = (handle.style.left) ? parseInt(handle.style.left) : 0;
						this._style_top = (handle.style.top) ? parseInt(handle.style.top) : 0;
					}

					var translate_left = left;
					var translate_top = top;
					var style_left = this._style_left;
					var style_top = this._style_top;

					if (nexacro._Browser_Transform3d > 0) {
						translate_left -= style_left;
						translate_top -= style_top;
					}

					if (translate_left || translate_top) {
						nexacro.__setDOMStyle_Translate(handle.style, translate_left, translate_top);
					}
					else {
						nexacro.__clearDOMStyle_Translate(handle.style);
					}
				}
				else {
					nexacro.__setDOMStyle_Pos(handle.style, left, top);
				}
			}
		}
	};


	_pElement.setElementSize = function (width, height) {
		if (this.width != width || this.height != height) {
			this.width = width;
			this.height = height;

			if (width < 0) {
				width = 0;
			}
			if (height < 0) {
				height = 0;
			}

			var handle = this.handle;
			if (handle) {
				if (width && height) {
					nexacro.__setDOMStyle_Size(handle.style, width, height);
				}
				else {
					nexacro.__clearDOMStyle_Size(handle.style);
				}
			}
		}
	};

	if (nexacro._OS == "Android") {
		_pElement.setElementVisible = function (visible) {
			if (this.visible != visible) {
				this.visible = visible;
				var handle = this.handle;
				if (handle) {
					nexacro.__setDOMStyle_Visible(handle.style, visible);

					if (this.visible) {
						var v = this.zindex;
						if (!v || v < 0) {
							v = "";
						}
						nexacro.__setDOMStyle_Zindex(handle.style, v);
					}
					else {
						nexacro.__setDOMStyle_Zindex(handle.style, nexacro._zindex_hide);
					}
				}
			}
		};
	}
	else {
		_pElement.setElementVisible = function (visible) {
			if (this.visible != visible) {
				this.visible = visible;
				var handle = this.handle;
				if (handle) {
					nexacro.__setDOMStyle_Visible(handle.style, visible);
				}
			}
		};
	}

	_pElement.setElementDirection = function (direction) {
		if (this.direction != direction) {
			this.direction = direction;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_Direction(handle.style, direction);
			}
		}
	};

	_pElement.setElementTypeCSSSelector = function (typename) {
		if (this.typeselector != typename) {
			this.typeselector = typename;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
			}
		}
	};

	_pElement.setElementClassCSSSelector = function (classname) {
		if (this.classselector != classname) {
			this.classselector = classname;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
			}
		}
	};

	_pElement.setElementTextAlignByClassCSSSelector = function (textalign) {
		var classselector = "nexacenteralign";
		if (textalign == "left") {
			classselector = "nexaleftalign";
		}
		else if (textalign == "right") {
			classselector = "nexarightalign";
		}

		this.setElementClassCSSSelector(classselector);
	};

	_pElement._getElementClassName = function () {
		var classname = this.typeselector;
		if (this.classselector) {
			classname += " " + this.classselector;
		}
		return classname;
	};

	_pElement.setElementStatus = function (status) {
		if (this.status != status) {
			this.status = status;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMNode_Status(handle, status);
			}
		}
	};

	_pElement.setElementUserStatus = function (userstatus) {
		if (this.userstatus != userstatus) {
			this.userstatus = userstatus;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMNode_UserStatus(handle, userstatus);
			}
		}
	};

	_pElement._getWindow = function () {
		return this.linkedcontrol._getWindow();
	};

	_pElement.setElementColor = function (color) {
		if (this.color != color) {
			this.color = color;
			if (this.handle) {
				nexacro.__setDOMStyle_ColorObject(this.handle.style, color);
			}
		}
	};

	_pElement.setElementFont = function (font) {
		if (this.font != font) {
			this.font = font;
			if (this.handle) {
				nexacro.__setDOMStyle_FontObject(this.handle.style, font);
			}
		}
	};

	_pElement.setElementTextDecoration = function (decoration) {
		if (this.textDecoration != decoration) {
			this.textDecoration = decoration;
			if (this.handle) {
				nexacro.__setDOMStyle_TextDecorationObject(this.handle.style, decoration);
			}
		}
	};

	_pElement.setElementWordSpacing = function (wordspacing) {
		if (this.wordSpacing != wordspacing) {
			this.wordSpacing = wordspacing;
			if (this.handle) {
				nexacro.__setDOMStyle_WordSpacingObject(this.handle.style, wordspacing);
			}
		}
	};

	_pElement.setElementLetterSpacing = function (letterspacing) {
		if (this.letterSpacing != letterspacing) {
			this.letterSpacing = letterspacing;
			if (this.handle) {
				nexacro.__setDOMStyle_LetterSpacingObject(this.handle.style, letterspacing);
			}
		}
	};


	_pElement._refreshCommonStyleProps = function (handle_style) {
		if (!this.visible) {
			nexacro.__setDOMStyle_Visible(handle_style, false);
		}

		if (this.display == "none") {
			nexacro.__setDOMStyle_Display(handle_style, "none");
		}

		{

			if (this._use_translate_move) {
				nexacro.__setDOMStyle_Pos(handle_style, 0, 0);
				nexacro.__setDOMStyle_Translate(handle_style, this.left, this.top);
			}
			else {
				nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
			}
		}

		var linked_control = this.linkedcontrol;
		if (!(linked_control && linked_control._is_frame && (linked_control._is_main && !nexacro._allow_default_pinchzoom))) {
			if (this.width && this.height) {
				nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);
			}
		}

		if (this.color) {
			nexacro.__setDOMStyle_ColorObject(handle_style, this.color);
		}
		if (this.font) {
			nexacro.__setDOMStyle_FontObject(handle_style, this.font);
		}
		if (this.wordSpacing) {
			nexacro.__setDOMStyle_WordSpacingObject(handle_style, this.wordSpacing);
		}
		if (this.letterSpacing) {
			nexacro.__setDOMStyle_LetterSpacingObject(handle_style, this.letterSpacing);
		}
		if (this.textDecoration) {
			nexacro.__setDOMStyle_TextDecorationObject(handle_style, this.textDecoration);
		}

		if (this.direction) {
			nexacro.__setDOMStyle_Direction(handle_style, this.direction);
		}
		if (this.wordWrap) {
			nexacro.__setDOMStyle_WordWrap(handle_style, this.wordWrap);
		}
	};

	_pElement._getCommonStyleStr = function () {
		var str = "";
		if (!this.visible) {
			str += nexacro.__getHTMLStyle_Visible(false);
		}
		if (this.display == "none") {
			str += nexacro.__getHTMLStyle_Display("none");
		}
		if (this.left >= 0 || this.top >= 0) {
			str += nexacro.__getHTMLStyle_Pos(this.left, this.top);
		}
		if (this.width >= 0 && this.height >= 0) {
			str += nexacro.__getHTMLStyle_Size(this.width, this.height);
		}

		if (this.color) {
			str += nexacro.__getHTMLStyle_ColorObject(this.color);
		}
		if (this.font) {
			str += nexacro.__getHTMLStyle_FontObject(this.font);
		}
		if (this.wordSpacing) {
			str += nexacro.__getHTMLStyle_WordSpacingObject(this.wordSpacing);
		}
		if (this.letterSpacing) {
			str += nexacro.__getHTMLStyle_LetterSpacingObject(this.letterSpacing);
		}
		if (this.textDecoration) {
			str += nexacro.__getHTMLStyle_TextDecorationObject(this.textDecoration);
		}
		if (this.direction) {
			str += nexacro.__getHTMLStyle_Direction(this.direction);
		}
		if (this.wordWrap) {
			str += nexacro.__getHTMLStyle_WordWrap(this.wordWrap);
		}
		return str;
	};

	_pElement._getOverflowScrollSize = function () {
		return 0;
	};

	_pElement._contains = function (oDescendant) {
		while (oDescendant) {
			if (oDescendant == this) {
				return true;
			}
			oDescendant = oDescendant.parent_elem;
		}
		return false;
	};

	_pElement._getComputedStyle = nexacro._emptyFn;
	_pElement._getComputedStyleBackgroundColor = nexacro._emptyFn;
	_pElement.setElementAccessibilityRole = nexacro._emptyFn;
	_pElement.setElementAccessibilityLabel = nexacro._emptyFn;
	_pElement._getPositionInWindow = function () {
		return nexacro._getElementXYInWindow(this.handle);
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 10) {
		nexacro._EdgeImageElement = function (parent_elem) {
			this.parent = parent_elem;
			this.parent_elem = parent_elem;
			this.name = this.parent_elem.name + ":edge";
		};
		var __pEdgeImageElement = nexacro._createPrototype(nexacro.Element, nexacro._EdgeImageElement);
		nexacro._EdgeImageElement.prototype = __pEdgeImageElement;

		__pEdgeImageElement._type_name = "_EdgeImageElement";

		__pEdgeImageElement.edgeImage = null;
		__pEdgeImageElement.url = "";
		__pEdgeImageElement.edgex = 0;
		__pEdgeImageElement.edgey = 0;
		__pEdgeImageElement._edge_type = -1;
		__pEdgeImageElement._img_width = 0;
		__pEdgeImageElement._img_height = 0;
		__pEdgeImageElement._img_sizereq = false;
		__pEdgeImageElement._ready_image = false;
		__pEdgeImageElement._is_nc_element = true;

		__pEdgeImageElement.create = function (_doc) {
			var owner_elem = this.parent_elem;
			if (owner_elem.handle && !this.handle) {
				this.owner_elem = owner_elem;
				_doc = _doc || owner_elem._getRootWindowHandle();

				var handle = _doc.createElement("div");
				nexacro.__setDOMNode_ClassName(handle, "nexaedge");

				this.handle = handle;

				this._applied_edge_type = 0;

				var width = this.width;
				var height = this.height;

				if (!this._inner_command) {
					if (this._ready_image) {
						this._inner_command = this._create_inner_command(this._edge_type, width, height, this.url, this._img_width, this._img_height, this.edgex, this.edgey);
					}
					else {
						if (this.url) {
							var imgsize = nexacro._getImageSize(this.url, this._on_notify_imgsize, this);
							this._img_sizereq = true;
							if (imgsize) {
								this._img_sizereq = false;
								this._ready_image = true;
								this._img_width = imgsize.width;
								this._img_height = imgsize.height;
								this._inner_command = this._create_inner_command(this._edge_type, width, height, this.url, this._img_width, this._img_height, this.edgex, this.edgey);
							}
						}
					}
				}

				if (this._inner_command) {
					handle.innerHTML = this._inner_command;
				}

				var dest_handle = owner_elem.handle;
				nexacro.__insertDOMNode(dest_handle, handle, dest_handle.firstChild);
			}
		};

		__pEdgeImageElement.createCommand = function () {
			var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this.handle) {
				this.owner_elem = owner_elem;
				var str = "<div class='nexaedge'>";

				if (!this._inner_command) {
					if (this._ready_image) {
						this._inner_command = this._create_inner_command(this._edge_type, this.width, this.height, this.url, this._img_width, this._img_height, this.edgex, this.edgey);
					}
					else {
						if (this.url) {
							var imgsize = nexacro._getImageSize(this.url, this._on_notify_imgsize, this);
							this._img_sizereq = true;
							if (imgsize) {
								this._img_sizereq = false;
								this._ready_image = true;
								this._img_width = imgsize.width;
								this._img_height = imgsize.height;
								this._inner_command = this._create_inner_command(this._edge_type, this.width, this.height, this.url, this._img_width, this._img_height, this.edgex, this.edgey);
							}
						}
					}
				}

				if (this._inner_command) {
					str += this._inner_command;
				}

				str += "</div>";
				return str;
			}
			return "";
		};
		__pEdgeImageElement.attachHandle = function (win) {
			if (this.name && !this.handle) {
				var handle = win._doc.getElementById(this.name);
				if (handle) {
					this.handle = handle;
				}
			}
		};
		__pEdgeImageElement.attach_handle_fromparent = function (_parent) {
			if (_parent && !this.handle) {
				var handle = _parent.firstChild;
				if (handle) {
					this.handle = handle;
				}
			}
		};

		__pEdgeImageElement.destroy = function () {
			var handle = this.handle;
			if (handle) {
				var dest_handle = (this.owner_elem ? this.owner_elem.handle : null);
				nexacro.__removeDOMNode(dest_handle, handle);

				this.owner_elem = null;
				this.handle = null;
			}
			this.parent = null;
			this.parent_elem = null;
		};

		__pEdgeImageElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;

				if (this._ready_image) {
					this._inner_command = this._create_inner_command(this._edge_type, width, height, this.url, this._img_width, this._img_height, this.edgex, this.edgey);
				}

				var handle = this.handle;
				if (handle) {
					nexacro.__setDOMStyle_Size(handle.style, width, height);
					handle.innerHTML = this._inner_command;
				}
			}
		};

		__pEdgeImageElement.setElementInfo = function (edgeImage, edge_info) {
			edgeImage = (edgeImage || edge_info);
			if (this.edgeImage != edgeImage) {
				this.edgeImage = edgeImage;
				this._edge_info = edge_info;

				var url = edgeImage._sysurl;
				var edgex = edgeImage.edge_x;
				var edgey = edgeImage.edge_y;

				var url_change = false;
				var layout_change = false;
				var edge_type = 0;

				if (edgex < 0) {
					edgex = 0;
				}
				if (edgey < 0) {
					edgey = 0;
				}

				if (edgex > 0 && edgey > 0) {
					edge_type = 3;
				}
				else if (edgey > 0) {
					edge_type = 2;
				}
				else if (edgex > 0) {
					edge_type = 1;
				}

				if (this._edge_type != edge_type || this.edgex != edgex || this.edgey != edgey) {
					this._edge_type = edge_type;
					this.edgex = edgex;
					this.edgey = edgey;
					layout_change = true;
				}

				if (this.url != url) {
					this.url = url;
					url_change = true;

					var imgsize = nexacro._getImageSize(this.url, this._on_notify_imgsize, this);
					if (imgsize) {
						this._img_sizereq = false;
						this._ready_image = true;
						if (this._img_width != imgsize.width || this._img_height != imgsize.height) {
							this._img_width = imgsize.width;
							this._img_height = imgsize.height;
							layout_change = true;
						}
					}
					else {
						this._img_sizereq = true;
						this._ready_image = false;
						this._img_width = 0;
						this._img_height = 0;
					}
				}
				else {
					this._ready_image = true;
				}

				if (layout_change || url_change) {
					this._inner_command = "";
					if (this._ready_image) {
						this._inner_command = this._create_inner_command(edge_type, this.width, this.height, url, this._img_width, this._img_height, edgex, edgey);
					}

					var handle = this.handle;
					if (handle) {
						if (layout_change) {
							handle.innerHTML = this._inner_command;
						}
						else {
							this._updateURL(handle, url);
						}
					}
				}
			}
		};

		if (nexacro._BrowserVersion <= 7) {
			nexacro._makeImageClipInfo = function (top, right, bottom, left) {
				return "rect(" + top + " " + right + " " + bottom + " " + left + ")";
			};
		}
		else {
			nexacro._makeImageClipInfo = function (top, right, bottom, left) {
				return "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
			};
		}

		__pEdgeImageElement._createLeftRight_command = function (img_width, height, img_offset_y, edgex, edgey, url) {
			var _top = (-img_offset_y);
			var _height = height + img_offset_y + img_offset_y;
			var _clip_top = edgey + img_offset_y;
			var _clip_bottom = height - edgey + img_offset_y;

			var str = "";
			str += "<img alt='' ";
			str += nexacro.__getHTMLAttr_ImageUrl(url);
			str += " style='left:0px;top:" + _top + "px;";
			str += nexacro.__getHTMLStyle_Size(img_width, _height);
			str += "clip:" + nexacro._makeImageClipInfo(_clip_top, edgex, _clip_bottom, 0) + ";'/>";

			str += "<img alt='' ";
			str += nexacro.__getHTMLAttr_ImageUrl(url);
			str += " style='right:0px;top:" + _top + "px;";
			str += nexacro.__getHTMLStyle_Size(img_width, _height);
			str += "clip:" + nexacro._makeImageClipInfo(_clip_top, img_width, _clip_bottom, -edgex + img_width) + ";'/>";

			return str;
		};
		__pEdgeImageElement._createTopBottom_command = function (img_height, width, img_offset_x, edgex, edgey, url) {
			var _left = (-img_offset_x);
			var _width = width + img_offset_x + img_offset_x;
			var _clip_left = edgex + img_offset_x;
			var _clip_right = width - edgex + img_offset_x;

			var str = "";
			str += "<img alt='' ";
			str += nexacro.__getHTMLAttr_ImageUrl(url);
			str += " style='left:" + _left + "px;top:0px;";
			str += nexacro.__getHTMLStyle_Size(_width, img_height);
			str += "clip:" + nexacro._makeImageClipInfo(0, _clip_right, edgey, _clip_left) + ";'/>";

			str += "<img alt='' ";
			str += nexacro.__getHTMLAttr_ImageUrl(url);
			str += " style='left:" + _left + "px;bottom:0px;";
			str += nexacro.__getHTMLStyle_Size(_width, img_height);
			str += "clip:" + nexacro._makeImageClipInfo(-edgey + img_height, _clip_right, img_height, _clip_left) + ";'/>";

			return str;
		};
		__pEdgeImageElement._createCorners_command = function (edgex, edgey, url) {
			var str = "";
			var style_str = nexacro.__getHTMLStyle_Size(edgex, edgey);
			if (this.edgeImage != this._edge_info) {
				style_str += nexacro.__getHTMLStyle_BKImageUrl(url);
			}

			str += "<div class='nexalefttop' style='" + style_str + "'></div>";
			str += "<div class='nexarighttop' style='" + style_str + "'></div>";
			str += "<div class='nexaleftbottom' style='" + style_str + "'></div>";
			str += "<div class='nexarightbottom' style='" + style_str + "'></div>";

			return str;
		};

		__pEdgeImageElement._create_inner_command = function (edge_type, width, height, img_url, img_width, img_height, edgex, edgey) {
			if (edgex > img_width) {
				edgex = img_width;
			}
			if (edgey > img_height) {
				edgey = img_height;
			}
			var test_img_offset_x = img_width - edgex - edgex;
			var test_img_offset_y = img_height - edgey - edgey;
			var img_offset_x = 0;
			var img_offset_y = 0;

			var half_width = img_width / 2;
			var half_height = img_height / 2;

			if (edgex > half_width) {
				if (test_img_offset_x < 0) {
					test_img_offset_x = test_img_offset_x * -1;
				}
				img_offset_x = Math.round(edgex * ((width - edgex - edgex) / (test_img_offset_x)) - width + edgex);
			}
			else {
				if (test_img_offset_x == 0) {
					img_offset_x = Math.round(edgex * ((width - edgex - edgex + 1) / (img_width - edgex - edgex + 1)) - edgex);
				}
				else {
					img_offset_x = Math.round(edgex * ((width - edgex - edgex) / (img_width - edgex - edgex)) - edgex);
				}
			}

			if (edgey > half_height) {
				if (test_img_offset_y < 0) {
					test_img_offset_y = test_img_offset_y * -1;
				}
				img_offset_y = Math.round(edgey * ((height - edgey - edgey) / (test_img_offset_y)) - height + edgey);
			}
			else {
				if (test_img_offset_y == 0) {
					img_offset_y = Math.round(edgey * ((height - edgey - edgey + 1) / (img_height - edgey - edgey + 1)) - edgey);
				}
				else {
					img_offset_y = Math.round(edgey * ((height - edgey - edgey) / (img_height - edgey - edgey)) - edgey);
				}
			}

			var str = "";
			str += "<img class='nexacenter' alt='' ";
			str += nexacro.__getHTMLAttr_ImageUrl(img_url);
			str += " style='";
			str += nexacro.__getHTMLStyle_Pos((-img_offset_x), (-img_offset_y));
			str += nexacro.__getHTMLStyle_Size((width + img_offset_x + img_offset_x), (height + img_offset_y + img_offset_y));
			str += "clip:" + nexacro._makeImageClipInfo(edgey + img_offset_y, width - edgex + img_offset_x, height - edgey + img_offset_y, edgex + img_offset_x) + ";'/>";
			if (edge_type == 1) {
				str += this._createLeftRight_command(img_width, height, img_offset_y, edgex, edgey, img_url);
			}
			else if (edge_type == 2) {
				str += this._createTopBottom_command(img_height, width, img_offset_x, edgex, edgey, img_url);
			}
			else if (edge_type == 3) {
				str += this._createCorners_command(edgex, edgey, img_url);
				str += this._createLeftRight_command(img_width, height, img_offset_y, edgex, edgey, img_url);
				str += this._createTopBottom_command(img_height, width, img_offset_x, edgex, edgey, img_url);
			}

			return str;
		};

		__pEdgeImageElement._updateURL = function (handle, url) {
			var url2 = "url(" + url + ")";
			var node = handle.firstChild;
			while (node) {
				if (node.tagName.toLowerCase() == "img") {
					node.src = url;
				}
				else {
					node.style.backgroundImage = url2;
				}
				node = node.nextSibling;
			}
		};

		__pEdgeImageElement._on_notify_imgsize = function (img_url, img_width, img_height) {
			if (this._img_sizereq) {
				if (!(img_width && img_height)) {
					return;
				}
				if (img_url != this.url) {
					return;
				}

				var edge_type = this._edge_type;

				this._img_sizereq = false;
				this._img_width = img_width;
				this._img_height = img_height;

				if (edge_type >= 0) {
					this._inner_command = this._create_inner_command(edge_type, this.width, this.height, img_url, img_width, img_height, this.edgex, this.edgey);
					this._applied_edge_type = edge_type;
					var handle = this.handle;
					if (handle) {
						handle.innerHTML = this._inner_command;
					}
				}
			}
		};
	}
	else if (nexacro._Browser != "IE" || (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 10)) {
		nexacro._EdgeImageElement = function (parent_elem) {
			this.parent = parent_elem;
			this.parent_elem = parent_elem;
		};
		var __pEdgeImageElement = nexacro._createPrototype(nexacro.Element, nexacro._EdgeImageElement);
		nexacro._EdgeImageElement.prototype = __pEdgeImageElement;

		__pEdgeImageElement._type_name = "_EdgeImageElement";

		__pEdgeImageElement.edgeImage = null;
		__pEdgeImageElement._is_nc_element = true;

		__pEdgeImageElement.create = function (_doc) {
			var edgeProp = this.edgeImage;
			var edgeCss = this._edge_info;
			var bEdgeProp = (edgeProp && edgeProp.value != "none");
			var bEdgeCss = (edgeCss && edgeCss.value != "none");

			var owner_elem = this.parent_elem;
			if (owner_elem.handle && !this.handle && (bEdgeProp || bEdgeCss)) {
				this.owner_elem = owner_elem;
				_doc = _doc || owner_elem._getRootWindowHandle();

				var handle = _doc.createElement("div");
				this.handle = handle;
				nexacro.__setDOMNode_ClassName(handle, "nexaedge");
				nexacro.__setDOMStyle_EdgeObject(handle.style, edgeProp ? edgeProp : edgeCss);

				var _parent_handle = owner_elem.handle;
				nexacro.__insertDOMNode(_parent_handle, handle, _parent_handle.firstChild);
			}
		};

		__pEdgeImageElement.setElementSize = function (width, height) {
			this.width = width;
			this.height = height;
		};

		__pEdgeImageElement.setElementInfo = function (edgeImage, edge_info) {
			if (this.edgeImage != edgeImage || this._edge_info != edge_info) {
				this.edgeImage = edgeImage;
				this._edge_info = edge_info;

				var handle = this.handle;
				if (handle) {
					nexacro.__setDOMStyle_EdgeObject(handle.style, edgeImage);
				}
			}
		};

		__pEdgeImageElement.createCommand = function () {
			if (this.edgeImage) {
				if (this.edgeImage.value != "none") {
					return "<div class='nexaedge' style='" + nexacro.__getHTMLStyle_EdgeObject(this.edgeImage) + "'></div>";
				}
			}
			else if (this._edge_info) {
				if (this._edge_info.value != "none") {
					return "<div class='nexaedge'></div>";
				}
			}

			return "";
		};

		__pEdgeImageElement.attachHandle = function (win) {
			if (this.name && !this.handle) {
				var handle = win._doc.getElementById(this.name);
				if (handle) {
					this.handle = handle;
				}
			}
		};
		__pEdgeImageElement.attach_handle_fromparent = function (_parent) {
			if (_parent && !this.handle) {
				var handle = _parent.firstChild;
				if (handle) {
					this.handle = handle;
				}
			}
		};

		__pEdgeImageElement.destroy = function () {
			var handle = this.handle;
			if (handle) {
				var dest_handle = (this.owner_elem ? this.owner_elem.handle : null);
				nexacro.__removeDOMNode(dest_handle, handle);

				this.owner_elem = null;
				this.handle = null;
			}
			this.parent = null;
			this.parent_elem = null;
		};
	}

	nexacro.TextBoxElement = function (parent_elem, id) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.id = id;
		this.name = this.parent_elem.name + ":" + (id || "text");
	};

	var _pTextBoxElement = nexacro._createPrototype(nexacro.Element, nexacro.TextBoxElement);
	nexacro.TextBoxElement.prototype = _pTextBoxElement;

	_pTextBoxElement._type_name = "TextBoxElement";
	_pTextBoxElement.typeselector = "nexacontentsbox";

	_pTextBoxElement.text = "";
	_pTextBoxElement._use_decoration = false;
	_pTextBoxElement.padding = null;
	_pTextBoxElement.textAlign = null;
	_pTextBoxElement.verticalAlign = null;
	_pTextBoxElement.wordWrap = null;
	_pTextBoxElement._wordwrap_info = null;


	_pTextBoxElement._box_node = null;
	_pTextBoxElement._created = false;



	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 7) {
		_pTextBoxElement._createTextElementHandle = function (_doc) {
			var handle = _doc.createElement("table");
			handle.cellSpacing = 0;
			handle.cellPadding = 0;

			var _tbody_node = _doc.createElement("tbody");
			var _tr_node = _doc.createElement("tr");
			var box_node = _doc.createElement("td");
			handle.appendChild(_tbody_node);
			_tbody_node.appendChild(_tr_node);
			_tr_node.appendChild(box_node);

			this._box_node = box_node;
			nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
			return handle;
		};
	}
	else if (nexacro._Browser != "IE" || (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 8)) {
		_pTextBoxElement._createTextElementHandle = function (_doc) {
			var handle = _doc.createElement("div");
			this._box_node = handle;
			nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
			return handle;
		};
	}

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
		_pTextBoxElement._getComputedStyle = function (prop) {
			var handle = this._box_node;
			if (handle && prop) {
				return handle.currentStyle[prop];
			}
		};
	}
	else {
		_pTextBoxElement._getComputedStyle = function (prop) {
			var handle = this._box_node;
			if (handle && prop) {
				var style = window.getComputedStyle(handle, null);
				return style.getPropertyValue(prop);
			}
		};
	}


	_pTextBoxElement._getComputedStyleAlign = function () {
		var align = {
			textAlign : "", 
			verticalAlign : ""
		};
		align.textAlign = this._getComputedStyle("text-align");
		align.verticalAlign = this._getComputedStyle("vertical-align");
		return align;
	};

	_pTextBoxElement._createElementHandle = function (owner_elem, _doc) {
		if (this.text) {
			_doc = _doc || owner_elem._getRootWindowHandle();
			var handle = this._createTextElementHandle(_doc);

			handle.id = this.name;
			handle._linked_element = this;

			this.handle = handle;

			var handle_style = handle.style;
			var box_node = this._box_node;
			var box_style = box_node.style;

			this._refreshCommonStyleProps(handle_style);

			if (this.textAlign) {
				nexacro.__setDOMStyle_textAlign(box_style, this.textAlign);
			}
			if (this.verticalAlign) {
				nexacro.__setDOMStyle_verticalAlign(box_style, this.verticalAlign);
			}

			if (this._use_decoration) {
				nexacro.__setDOMNode_DecorateText(box_node, this.text);
			}
			else {
				nexacro.__setDOMNode_Text(box_node, this.text, this.wordWrap || this._wordwrap_info);
			}

			nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
		}
	};






	_pTextBoxElement.create = function (win) {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this._created) {
			this.owner_elem = owner_elem;

			this._createElementHandle(owner_elem, win._doc);
			this._created = true;
		}
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 7) {
		_pTextBoxElement.createCommand = function () {
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this._created) {
				this.owner_elem = owner_elem;
				if (this.text) {
					var handle_style = this._getCommonStyleStr();
					var box_style = "";

					if (this.textAlign) {
						box_style += nexacro.__getHTMLStyle_textAlign(this.textAlign);
					}
					if (this.verticalAlign) {
						box_style += nexacro.__getHTMLStyle_verticalAlign(this.verticalAlign);
					}

					var classname = this._getElementClassName();

					var str = "<table id='" + this.name + "' class='" + classname + "'";
					str += (handle_style) ? (" style='" + handle_style + "'>") : ">";
					str += "<tbody><tr>";

					str += "<td class='" + classname + "'";
					str += (box_style) ? (" style='" + box_style + "'>") : ">";

					if (this._use_decoration) {
						str += nexacro.__getHTMLAttr_DecorateText(this.text);
					}
					else {
						str += nexacro.__getHTMLAttr_Text(this.text, this.wordWrap || this._wordwrap_info);
					}

					str += "</td></tr></tbody></table>";

					return str;
				}
			}
			return "";
		};
		_pTextBoxElement.attachHandle = function (win) {
			if (this.name && !this._created) {
				var handle = win._doc.getElementById(this.name);
				if (handle) {
					this.handle = handle;
					this._box_node = handle.firstChild.firstChild.firstChild;
					handle._linked_element = this;
				}
				this._created = true;
			}
		};
	}
	else {
		_pTextBoxElement.createCommand = function () {
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this._created) {
				this.owner_elem = owner_elem;

				if (this.text) {
					var handle_style = this._getCommonStyleStr();
					var box_style = "";

					if (this.textAlign) {
						box_style += nexacro.__getHTMLStyle_textAlign(this.textAlign);
					}
					if (this.verticalAlign) {
						box_style += nexacro.__getHTMLStyle_verticalAlign(this.verticalAlign);
					}

					var classname = this._getElementClassName();
					var str = "<div id='" + this.name + "' class='" + classname + "'";
					str += (handle_style || box_style) ? (" style='" + handle_style + box_style + "'>") : ">";

					if (this._use_decoration) {
						str += nexacro.__getHTMLAttr_DecorateText(this.text);
					}
					else {
						str += nexacro.__getHTMLAttr_Text(this.text, this.wordWrap || this._wordwrap_info);
					}

					str += "</div>";
					return str;
				}
			}
			return "";
		};
		_pTextBoxElement.attachHandle = function (win) {
			if (this.name && !this._created) {
				var handle = win._doc.getElementById(this.name);
				if (handle) {
					this.handle = handle;
					this._box_node = handle;
					handle._linked_element = this;
				}
				this._created = true;
			}
		};
	}

	_pTextBoxElement.destroy = function () {
		this._destroyElementHandle();
		this.owner_elem = null;
		this._box_node = null;
		this.parent = null;
		this.parent_elem = null;
		this._created = false;
	};



	_pTextBoxElement.setElementPadding = function () {
	};


	_pTextBoxElement.setElementTextAlign = function (textalign) {
		if (this.textAlign != textalign) {
			this.textAlign = textalign;
			var box_node = this._box_node;
			if (box_node) {
				nexacro.__setDOMStyle_textAlign(box_node.style, textalign);
			}
		}
	};

	_pTextBoxElement.setElementVerticalAlign = function (verticalalign) {
		if (this.verticalAlign != verticalalign) {
			this.verticalAlign = verticalalign;
			var box_node = this._box_node;
			if (box_node) {
				nexacro.__setDOMStyle_verticalAlign(box_node.style, verticalalign);
			}
		}
	};

	_pTextBoxElement.setElementText = function (text) {
		if (this.text != text || this._use_decoration == true) {
			this.text = text;
			this._use_decoration = false;
			if (this._created) {
				if (text) {
					if (this.handle) {
						nexacro.__setDOMNode_Text(this._box_node, text, this.wordWrap || this._wordwrap_info);
					}
					else {
						this._createElementHandle(this.owner_elem);
					}
				}
				else {
					if (this.handle) {
						this._destroyElementHandle();
					}
				}
			}
		}
	};

	_pTextBoxElement.setElementDecorateText = function (text) {
		if (this.text != text || this._use_decoration == false) {
			this.text = text;
			this._use_decoration = true;
			if (this._created) {
				if (text) {
					if (this.handle) {
						nexacro.__setDOMNode_DecorateText(this._box_node, text);
					}
					else {
						this._createElementHandle(this.owner_elem);
					}
				}
				else {
					if (this.handle) {
						this._destroyElementHandle();
					}
				}
			}
		}
	};

	_pTextBoxElement.setElementWordWrap = function (wordwrap) {
		if (this.wordWrap != wordwrap) {
			var oldwordwrap = this.wordWrap || this._wordwrap_info;
			this.wordWrap = wordwrap;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMNodeStyle_WordWrap(handle.style, wordwrap);
				if (this._created && this.text && this._use_decoration == false && oldwordwrap != wordwrap) {
					nexacro.__setDOMNode_Text(this._box_node, this.text, wordwrap);
				}
			}
		}
	};

	_pTextBoxElement.setElementCSSMapInfo = function (wordwrap) {
		if (this._wordwrap_info != wordwrap) {
			var oldwordwrap = this.wordWrap || this._wordwrap_info;
			this._wordwrap_info = wordwrap;
			var handle = this.handle;
			if (handle) {
				if (!this.wordWrap && this.text && this._use_decoration == false && oldwordwrap != wordwrap) {
					nexacro.__setDOMNode_Text(this._box_node, this.text, wordwrap);
				}
			}
		}
	};



	nexacro.IconElement = function (parent_elem, id) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.id = id;
		this.name = this.parent_elem.name + ":" + (id || "icon");
	};
	var _pIconElement = nexacro._createPrototype(nexacro.Element, nexacro.IconElement);
	nexacro.IconElement.prototype = _pIconElement;


	_pIconElement._type_name = "IconElement";
	_pIconElement.typeselector = "nexacontentsbox";

	_pIconElement.padding = null;
	_pIconElement.textAlign = null;
	_pIconElement.verticalAlign = null;
	_pIconElement.icon = "";
	_pIconElement._created = false;

	_pIconElement._createElementHandle = function (owner_elem, _doc) {
		if (this.icon && (this.icon.value != "none")) {
			_doc = _doc || owner_elem._getRootWindowHandle();

			var handle = _doc.createElement("div");
			this.handle = handle;

			nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
			handle.id = this.name;
			handle._linked_element = this;

			var handle_style = handle.style;

			this._refreshCommonStyleProps(handle_style);

			var textAlign = this.textAlign;
			if (textAlign) {
				nexacro.__setDOMStyle_BKImageTextAlign(handle_style, textAlign);
			}

			if (this.verticalAlign) {
				nexacro.__setDOMStyle_BKImageVerticalAlign(handle_style, this.verticalAlign);
			}

			nexacro.__setDOMStyle_BKImageUrl(handle_style, this.icon._sysurl);

			nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
		}
	};



	_pIconElement.create = function (win) {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this._created) {
			this.owner_elem = owner_elem;

			this._createElementHandle(owner_elem, win._doc);
			this._created = true;
		}
	};

	_pIconElement.createCommand = function () {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this._created) {
			this.owner_elem = owner_elem;

			if (this.icon && (this.icon.value != "none")) {
				var handle_style = this._getCommonStyleStr();
				var str = "";
				var textAlign = this.textAlign;
				if (textAlign || this.verticalAlign) {
					str += nexacro.__getHTMLStyle_BKImageAlign(textAlign, this.verticalAlign);
				}

				handle_style += nexacro.__getHTMLStyle_BKImageUrl(this.icon._sysurl);

				var classname = this._getElementClassName();
				str = "<div id='" + this.name + "' class='" + classname + "'";
				str += (handle_style) ? (" style='" + handle_style + "'>") : ">";
				str += "</div>";

				return str;
			}
		}
		return "";
	};

	_pIconElement.attachHandle = function (win) {
		if (this.name && !this._created) {
			var handle = win._doc.getElementById(this.name);
			if (handle) {
				this.handle = handle;
				handle._linked_element = this;
			}
			this._created = true;
		}
	};

	_pIconElement.destroy = function () {
		this._destroyElementHandle();
		this.owner_elem = null;
		this.parent = null;
		this.parent_elem = null;
		this._created = false;
	};



	_pIconElement.setElementTextAlign = function (textalign) {
		if (this.textAlign != textalign) {
			this.textAlign = textalign;

			var handle = this.handle;
			if (handle) {
				if (textalign) {
					nexacro.__setDOMStyle_BKImageTextAlign(handle.style, textalign);
				}
				else {
					nexacro.__clearDOMStyle_BKImageTextAlign(handle.style);
				}
			}
		}
	};
	_pIconElement.setElementVerticalAlign = function (verticalalign) {
		if (this.verticalAlign != verticalalign) {
			this.verticalAlign = verticalalign;

			var handle = this.handle;
			if (handle) {
				if (verticalalign) {
					nexacro.__setDOMStyle_BKImageVerticalAlign(handle.style, verticalalign);
				}
				else {
					nexacro.__clearDOMStyle_BKImageVerticalAlign(handle.style);
				}
			}
		}
	};

	_pIconElement.setElementIcon = function (icon) {
		if (this.icon != icon) {
			this.icon = icon;
			if (this._created) {
				if (icon && icon.value != "none") {
					var handle = this.handle;
					if (handle) {
						var url = icon._sysurl;
						nexacro.__setDOMStyle_BKImageUrl(handle.style, url);
					}
					else {
						this._createElementHandle(this.owner_elem);
					}
				}
				else {
					if (this.handle) {
						this._destroyElementHandle();
					}
				}
			}
		}
	};




	nexacro.IconTextElement = function (parent_elem, id) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.id = id;
		this.name = this.parent_elem.name + ":" + (id || "contents");
	};

	var _pIconTextElement = nexacro._createPrototype(nexacro.Element, nexacro.IconTextElement);
	nexacro.IconTextElement.prototype = _pIconTextElement;

	_pIconTextElement._type_name = "IconTextElement";
	_pIconTextElement.typeselector = "nexacontentsbox";

	_pIconTextElement.text = "";
	_pIconTextElement.icon = null;
	_pIconTextElement.iconPos = "";
	_pIconTextElement.textAlign = null;
	_pIconTextElement.verticalAlign = null;
	_pIconTextElement.textwidth = 0;

	_pIconTextElement.wordWrap = null;
	_pIconTextElement._wordwrap_info = null;

	_pIconTextElement._contents_type = 0;
	_pIconTextElement._box_node = null;
	_pIconTextElement._icon_node = null;
	_pIconTextElement._text_node = null;
	_pIconTextElement._created = false;
	_pIconTextElement._use_decoration = false;

	_pIconTextElement._use_newline = true;

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 7) {
		_pIconTextElement._createBoxElementHandle = function (_doc, _type) {
			var handle;
			if (_type == 1 || _type == 3) {
				handle = _doc.createElement("table");
				handle.cellSpacing = 0;
				handle.cellPadding = 0;

				var _tbody_node = _doc.createElement("tbody");
				var _tr_node = _doc.createElement("tr");
				var _box_node = _doc.createElement("td");
				handle.appendChild(_tbody_node);
				_tbody_node.appendChild(_tr_node);
				_tr_node.appendChild(_box_node);

				this._box_node = _box_node;

				nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
				return handle;
			}
			else if (_type == 2) {
				handle = _doc.createElement("div");
				this._box_node = handle;
				nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
				return handle;
			}
			return null;
		};
	}
	else if (nexacro._Browser != "IE" || (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 8)) {
		_pIconTextElement._createBoxElementHandle = function (_doc, _type) {
			var classname = this._getElementClassName();

			if (_type == 1 || _type == 2 || _type == 3) {
				var handle = _doc.createElement("div");
				this._box_node = handle;

				nexacro.__setDOMNode_ClassName(handle, classname);
				return handle;
			}
			return null;
		};
	}

	_pIconTextElement._createElementHandle = function (owner_elem, _doc) {
		var _type = this._contents_type;
		if (_type) {
			_doc = _doc || owner_elem._getRootWindowHandle();
			var handle = this.handle;
			var newhandle;

			if (!handle) {
				handle = this._createBoxElementHandle(_doc, _type);
				handle.id = this.name;
				handle._linked_element = this;
				newhandle = this.handle = handle;
			}

			var box_node = this._box_node;
			var text_node = null, icon_node = null;

			if (box_node.getElementsByTagName("img").length) {
				text_node = this._text_node;
				icon_node = this._icon_node;
			}
			else {
				this._text_node = this._icon_node = null;
			}

			if (_type == 3) {
				if (this._use_decoration) {
					nexacro.__setDOMNode_DecorateText(box_node, "");
				}
				else {
					nexacro.__setDOMNode_Text(box_node, "");
				}

				nexacro.__setDOMStyle_BKImageUrl(box_node.style, "");

				if (!this._icon_node) {
					icon_node = _doc.createElement("img");
					nexacro.__setDOMNode_ClassName(icon_node, "nexaiconitem");
					this._icon_node = icon_node;

					text_node = _doc.createElement("div");
					nexacro.__setDOMNode_ClassName(text_node, "nexatextitem");
					if (this.iconPos == "left" || this.iconPos == "right") {
						nexacro.__setDOMStyle_Display(text_node.style, "inline-block");
					}
					this._text_node = text_node;

					if (this.iconPos == "left" || this.iconPos == "top") {
						nexacro.__appendDOMNode(box_node, icon_node);
						nexacro.__appendDOMNode(box_node, text_node);
					}
					else {
						nexacro.__appendDOMNode(box_node, text_node);
						nexacro.__appendDOMNode(box_node, icon_node);
					}
				}
				else {
					nexacro.__setDOMStyle_Display(this._icon_node, "");
					nexacro.__setDOMStyle_Display(this._text_node, "");
				}
			}
			else {
				if (this._icon_node) {
					nexacro.__setDOMStyle_Display(this._icon_node, "none");
					nexacro.__setDOMStyle_Display(this._text_node, "none");
				}
			}

			var handle_style = handle.style;
			var box_style = box_node.style;

			this._refreshCommonStyleProps(handle_style);

			if (_type == 1 || _type == 3) {
				if (this.textAlign) {
					nexacro.__setDOMStyle_textAlign(box_style, this.textAlign);
				}
				if (this.verticalAlign) {
					nexacro.__setDOMStyle_verticalAlign(box_style, this.verticalAlign);
				}
			}
			else if (_type == 2) {
				var textAlign = this.textAlign;
				if (textAlign) {
					nexacro.__setDOMStyle_BKImageTextAlign(box_style, textAlign);
				}
				if (this.verticalAlign) {
					nexacro.__setDOMStyle_BKImageVerticalAlign(box_style, this.verticalAlign);
				}
			}

			if (_type == 1) {
				if (this._use_decoration) {
					nexacro.__setDOMNode_DecorateText(box_node, this.text);
				}
				else {
					nexacro.__setDOMNode_Text(box_node, this.text, this.wordWrap || this._wordwrap_info);
				}
			}
			else if (_type == 2) {
				nexacro.__setDOMStyle_BKImageUrl(box_style, this.icon._sysurl);
			}
			else if (_type == 3) {
				if (this.textPadding) {
					nexacro.__setDOMStyle_PaddingObject(text_node.style, this.textPadding);
				}

				if (this._use_decoration) {
					nexacro.__setDOMNode_DecorateText(text_node, this.text);
				}
				else {
					nexacro.__setDOMNode_Text(text_node, this.text, this.wordWrap || this._wordwrap_info);
				}

				nexacro.__setDOMNode_ImageUrl(icon_node, this.icon._sysurl);
			}

			if (newhandle) {
				nexacro.__appendDOMNode(owner_elem.dest_handle, newhandle);
			}
		}
	};




	_pIconTextElement.create = function (win) {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && owner_elem.handle && !this._created) {
			this.owner_elem = owner_elem;

			this._createElementHandle(owner_elem, win._doc);
			this._created = true;
		}
	};



	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 7) {
		_pIconTextElement.createCommand = function () {
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this._created) {
				this.owner_elem = owner_elem;

				var _type = this._contents_type;
				if (_type) {
					var handle_style = this._getCommonStyleStr();
					var box_style = "";
					var text_style = "";
					var value_str = "";

					if (_type == 1 || _type == 3) {
						if (this.textAlign) {
							box_style += nexacro.__getHTMLStyle_textAlign(this.textAlign);
						}
						if (this.verticalAlign) {
							box_style += nexacro.__getHTMLStyle_verticalAlign(this.verticalAlign);
						}
					}
					else if (_type == 2) {
						var textAlign = this.textAlign;
						if (textAlign || this.verticalAlign) {
							box_style += nexacro.__getHTMLStyle_BKImageAlign(textAlign, this.verticalAlign);
						}
					}

					if (_type == 1) {
						if (this._use_decoration) {
							value_str = nexacro.__getHTMLAttr_DecorateText(this.text);
						}
						else {
							value_str = nexacro.__getHTMLAttr_Text(this.text, this.wordWrap || this._wordwrap_info);
						}
					}
					else if (_type == 2) {
						box_style += nexacro.__getHTMLStyle_BKImageUrl(this.icon._sysurl);
					}
					else if (_type == 3) {
						if (this.textPadding) {
							text_style += nexacro.__getHTMLStyle_PaddingObject(this.textPadding);
						}

						if (this.iconPos == "left" || this.iconPos == "right") {
							text_style += nexacro.__getHTMLStyle_Display("inline-block");
						}

						if (this._use_decoration) {
							value_str = nexacro.__getHTMLAttr_DecorateText(this.text);
						}
						else {
							value_str = nexacro.__getHTMLAttr_Text(this.text, this.wordWrap || this._wordwrap_info);
						}
					}

					var classname = this._getElementClassName();
					var str = "";
					if (_type == 1) {
						str = "<table id='" + this.name + "' class='" + classname + "'";
						str += handle_style ? (" style='" + handle_style + "'>") : ">";
						str += "<tbody><tr><td";
						str += (box_style) ? (" style='" + box_style + "'>") : ">";
						str += value_str;
						str += "</td></tr></tbody></table>";
					}
					else if (_type == 2) {
						str = "<div id='" + this.name + "' class='" + classname + "'";
						str += (handle_style || box_style) ? (" style='" + handle_style + box_style + "'>") : ">";
					}
					else if (_type == 3) {
						str = "<table id='" + this.name + "' class='" + classname + "'";
						str += handle_style ? (" style='" + handle_style + "'>") : ">";
						str += "<tbody><tr><td";
						str += (box_style) ? (" style='" + box_style + "'>") : ">";

						if (this.iconPos == "left" || this.iconPos == "top") {
							str += "<img class='nexaiconitem' src='" + this.icon._sysurl + "'/>";
							str += "<div class='nexatextitem'";
							if (text_style) {
								str += " style='" + text_style + "'";
							}
							str += ">" + value_str + "</div>";
						}
						else {
							str += "<div class='nexatextitem'";
							if (text_style) {
								str += " style='" + text_style + "'";
							}
							str += ">" + value_str + "</div>";
							str += "<img class='nexaiconitem' src='" + this.icon._sysurl + "'/>";
						}

						str += "</td></tr></tbody></table>";
					}
					return str;
				}
			}
			return "";
		};
		_pIconTextElement.attachHandle = function (win) {
			if (this.name && !this._created) {
				var handle = win._doc.getElementById(this.name);
				if (handle) {
					this.handle = handle;
					handle._linked_element = this;

					var _type = this._contents_type, box_node;
					if (_type == 1) {
						box_node = handle.firstChild.firstChild.firstChild;
						this._box_node = box_node;
					}
					else if (this._contents_type == 3) {
						box_node = handle.firstChild.firstChild.firstChild;
						this._box_node = box_node;
						if (this.iconPos == "left" || this.iconPos == "top") {
							this._icon_node = box_node.firstChild;
							this._text_node = box_node.lastChild;
						}
						else {
							this._text_node = box_node.firstChild;
							this._icon_node = box_node.lastChild;
						}
					}
				}
				this._created = true;
			}
		};
	}
	else {
		_pIconTextElement.createCommand = function () {
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this._created) {
				this.owner_elem = owner_elem;

				var _type = this._contents_type;
				if (_type) {
					var handle_style = this._getCommonStyleStr();
					var box_style = "";
					var text_style = "";
					var value_str = "";

					if (_type == 1 || _type == 3) {
						if (this.textAlign) {
							box_style += nexacro.__getHTMLStyle_textAlign(this.textAlign);
						}
						if (this.verticalAlign) {
							box_style += nexacro.__getHTMLStyle_verticalAlign(this.verticalAlign);
						}
					}
					else if (_type == 2) {
						var textAlign = this.textAlign;
						if (textAlign || this.verticalAlign) {
							box_style += nexacro.__getHTMLStyle_BKImageAlign(textAlign, this.verticalAlign);
						}
					}

					if (_type == 1) {
						if (this._use_decoration) {
							value_str = nexacro.__getHTMLAttr_DecorateText(this.text);
						}
						else {
							value_str = nexacro.__getHTMLAttr_Text(this.text, this.wordWrap || this._wordwrap_info);
						}
					}
					else if (_type == 2) {
						box_style += nexacro.__getHTMLStyle_BKImageUrl(this.icon._sysurl);
					}
					else if (_type == 3) {
						if (this.textwidth) {
							text_style += nexacro.__getHTMLStyle_TextWidth(parseInt(this.textwidth));
						}

						if (this.textPadding) {
							text_style += nexacro.__getHTMLStyle_PaddingObject(this.textPadding);
						}

						if (this.iconPos == "left" || this.iconPos == "right") {
							text_style += nexacro.__getHTMLStyle_Display("inline-block");
						}

						if (this._use_decoration) {
							value_str = nexacro.__getHTMLAttr_DecorateText(this.text);
						}
						else {
							value_str = nexacro.__getHTMLAttr_Text(this.text, this.wordWrap || this._wordwrap_info);
						}
					}

					var aria_hidden = "";
					if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
						aria_hidden = " aria-hidden = 'true' ";
					}

					var classname = this._getElementClassName(), str = "";
					if (_type == 1) {
						str = "<div id='" + this.name + "' class='" + classname + "'";
						str += aria_hidden;
						str += (handle_style || box_style) ? (" style='" + handle_style + box_style + "'>") : ">";
						str += value_str + "</div>";
					}
					else if (_type == 2) {
						str = "<div id='" + this.name + "' class='" + classname + "'";
						str += aria_hidden;
						str += (handle_style || box_style) ? (" style='" + handle_style + box_style + "'>") : ">";
						str += "</div>";
					}
					else if (_type == 3) {
						str = "<div id='" + this.name + "' class='" + classname + "'";
						str += aria_hidden;
						str += (handle_style || box_style) ? (" style='" + handle_style + box_style + "'>") : ">";

						if (this.iconPos == "left" || this.iconPos == "top") {
							str += "<img class='nexaiconitem' src='" + this.icon._sysurl + "'/>";
							str += "<div class='nexatextitem'";
							str += (text_style) ? (" style='" + text_style + "'>") : ">";
							str += value_str + "</div>";
						}
						else {
							str += "<div class='nexatextitem'";
							str += (text_style) ? (" style='" + text_style + "'>") : ">";
							str += value_str + "</div>";
							str += "<img class='nexaiconitem' src='" + this.icon._sysurl + "'/>";
						}

						str += "</div>";
					}
					return str;
				}
			}
			return "";
		};
		_pIconTextElement.attachHandle = function (win) {
			if (this.name && !this._created) {
				var handle = win._doc.getElementById(this.name);
				if (handle) {
					this.handle = handle;
					handle._linked_element = this;

					this._box_node = handle;
					if (this._contents_type == 3) {
						var box_node = handle;
						if (this.iconPos == "left" || this.iconPos == "top") {
							this._icon_node = box_node.firstChild;
							this._text_node = box_node.lastChild;
						}
						else {
							this._text_node = box_node.firstChild;
							this._icon_node = box_node.lastChild;
						}
					}
				}
				this._created = true;
			}
		};
	}

	_pIconTextElement.destroy = function () {
		this._destroyElementHandle();

		this.owner_elem = null;
		this._box_node = null;
		this._text_node = null;
		this._icon_node = null;

		this.parent = null;
		this.parent_elem = null;
		this._created = false;
	};


	_pIconTextElement.setElementPadding = function (padding) {
		if (this.padding != padding) {
			this.padding = padding;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_PaddingObject(handle.style, padding);
			}
		}
	};

	_pIconTextElement.setElementTextAlign = function (textalign) {
		if (this.textAlign != textalign) {
			this.textAlign = textalign;

			var box_node = this._box_node;
			if (box_node) {
				var _type = this._contents_type;
				if (_type == 1 || _type == 3) {
					nexacro.__setDOMStyle_textAlign(box_node.style, textalign);
				}
				else {
					if (textalign) {
						nexacro.__setDOMStyle_BKImageTextAlign(box_node.style, textalign);
					}
					else {
						nexacro.__clearDOMStyle_BKImageTextAlign(box_node.style);
					}
				}
			}
		}
	};
	_pIconTextElement.setElementVerticalAlign = function (verticalalign) {
		if (this.verticalAlign != verticalalign) {
			this.verticalAlign = verticalalign;

			var box_node = this._box_node;
			if (box_node) {
				var _type = this._contents_type;
				if (_type != 2) {
					nexacro.__setDOMStyle_verticalAlign(box_node.style, verticalalign);
				}
				else {
					if (verticalalign) {
						nexacro.__setDOMStyle_BKImageVerticalAlign(box_node.style, verticalalign);
					}
					else {
						nexacro.__clearDOMStyle_BKImageVerticalAlign(box_node.style);
					}
				}
			}
		}
	};

	_pIconTextElement.setElementTextPadding = function (textPadding) {
		if (this.textPadding != textPadding) {
			this.textPadding = textPadding;
			var text_node = this._text_node;
			if (text_node) {
				nexacro.__setDOMStyle_PaddingObject(text_node.style, textPadding);
			}
		}
	};

	_pIconTextElement.setElementTextWidth = function (textwidth) {
		if (this.textwidth != textwidth) {
			this.textwidth = textwidth;

			var text_node = this._text_node;
			if (text_node) {
				var _type = this._contents_type;
				if (_type == 3) {
					var _textwidth = parseInt(textwidth);
					if (_textwidth > 0) {
						nexacro.__setDOMStyle_TextWidth(text_node.style, _textwidth);
					}
					else {
						nexacro.__clearDOMStyle_TextWidth(text_node.style);
					}
				}
			}
		}
	};

	_pIconTextElement.setElementText = function (text) {
		if (this.text !== text || this._use_decoration == true) {
			this.text = text;
			this._use_decoration = false;

			var _type = 0;
			var icon_url = this.icon ? (this.icon.value == "none" ? undefined : this.icon._sysurl) : undefined;
			if (icon_url && text) {
				_type = 3;
			}
			else if (icon_url) {
				_type = 2;
			}
			else if (text) {
				_type = 1;
			}

			if (this._contents_type != _type) {
				this._contents_type = _type;
				if (this._created) {
					this._destroyElementHandle();
					this._createElementHandle(this.owner_elem);
				}
			}
			else {
				if (this._created) {
					if (_type == 1) {
						var box_node = this._box_node;
						if (box_node) {
							nexacro.__setDOMNode_Text(box_node, text, this.wordWrap || this._wordwrap_info);
						}
					}
					else if (_type == 3) {
						var text_node = this._text_node;
						if (text_node) {
							nexacro.__setDOMNode_Text(text_node, text, this.wordWrap || this._wordwrap_info);
						}
					}
				}
			}
		}
	};

	_pIconTextElement.setElementDecorateText = function (text) {
		if (this.text != text || this._use_decoration == false) {
			this.text = text;
			this._use_decoration = true;

			var _type = 0;
			var icon_url = this.icon ? (this.icon.value == "none" ? undefined : this.icon._sysurl) : undefined;
			if (icon_url && text) {
				_type = 3;
			}
			else if (icon_url) {
				_type = 2;
			}
			else if (text) {
				_type = 1;
			}

			if (this._contents_type != _type) {
				this._contents_type = _type;
				if (this._created) {
					this._destroyElementHandle();
					this._createElementHandle(this.owner_elem);
				}
			}
			else {
				if (this._created) {
					if (_type == 1) {
						var box_node = this._box_node;
						nexacro.__setDOMNode_DecorateText(box_node, text);
					}
					else if (_type == 3) {
						var text_node = this._text_node;
						nexacro.__setDOMNode_DecorateText(text_node, text);
					}
				}
			}
		}
	};

	_pIconTextElement.setElementWordWrap = function (wordwrap) {
		if (this.wordWrap != wordwrap) {
			var oldwordwrap = this.wordWrap || this._wordwrap_info;
			this.wordWrap = wordwrap;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMNodeStyle_WordWrap(handle.style, wordwrap);
				if (this._created && this.text && this._use_decoration == false && oldwordwrap != wordwrap) {
					var _type = this._contents_type;
					if (_type == 1) {
						var box_node = this._box_node;
						if (box_node) {
							nexacro.__setDOMNode_Text(box_node, this.text, wordwrap);
						}
					}
					else if (_type == 3) {
						var text_node = this._text_node;
						if (text_node) {
							nexacro.__setDOMNode_Text(text_node, this.text, wordwrap);
						}
					}
				}
			}
		}
	};

	_pIconTextElement.setElementCSSMapInfo = function (wordwrap) {
		if (this._wordwrap_info != wordwrap) {
			var oldwordwrap = this.wordWrap || this._wordwrap_info;
			this._wordwrap_info = wordwrap;
			var handle = this.handle;
			if (handle) {
				if (!this.wordWrap && this.text && this._use_decoration == false && oldwordwrap != wordwrap) {
					var _type = this._contents_type;
					if (_type == 1) {
						var box_node = this._box_node;
						if (box_node) {
							nexacro.__setDOMNode_Text(box_node, this.text, wordwrap);
						}
					}
					else if (_type == 3) {
						var text_node = this._text_node;
						if (text_node) {
							nexacro.__setDOMNode_Text(text_node, this.text, wordwrap);
						}
					}
				}
			}
		}
	};

	_pIconTextElement.setElementIcon = function (icon) {
		if (this.icon != icon) {
			this.icon = icon;
			var icon_url = icon ? (icon.value == "none" ? undefined : icon._sysurl) : undefined;
			var _type = 0;
			if (icon_url && this.text) {
				_type = 3;
			}
			else if (icon_url) {
				_type = 2;
			}
			else if (this.text) {
				_type = 1;
			}

			if (this._contents_type != _type) {
				this._contents_type = _type;
				if (this._created) {
					this._createElementHandle(this.owner_elem);
				}
			}
			else {
				if (this._created) {
					if (_type == 2) {
						var box_node = this._box_node;
						nexacro.__setDOMStyle_BKImageUrl(box_node.style, icon_url);
					}
					else if (_type == 3) {
						var icon_node = this._icon_node;
						nexacro.__setDOMNode_ImageUrl(icon_node, icon_url);
					}
				}
			}
		}
	};

	_pIconTextElement.setElementIconPos = function (icon_pos) {
		var pos = ["left", "right", "top", "bottom"];
		if (pos.indexOf(icon_pos) < 0) {
			icon_pos = "left";
		}

		if (this.iconPos != icon_pos) {
			var oldpos = this.iconPos;
			this.iconPos = icon_pos;

			if (this._created && this._contents_type == 3) {
				var text_node = this._text_node;
				var icon_node = this._icon_node;
				var box_node = this._box_node;

				if (oldpos) {
					if (icon_pos == "left" || icon_pos == "right") {
						if (oldpos == "top" || oldpos == "bottom") {
							nexacro.__setDOMStyle_Display(text_node.style, "inline-block");
						}
					}
					else {
						if (oldpos == "left" || oldpos == "right") {
							nexacro.__setDOMStyle_Display(text_node.style, "block");
						}
					}

					if (icon_pos == "left" || icon_pos == "top") {
						if (oldpos == "right" || oldpos == "bottom") {
							nexacro.__appendDOMNode(box_node, text_node);
						}
					}
					else {
						if (oldpos == "left" || oldpos == "top") {
							nexacro.__appendDOMNode(box_node, icon_node);
						}
					}
				}
				else {
					switch (icon_pos) {
						case "left":
							nexacro.__setDOMStyle_Display(text_node.style, "inline-block");
							nexacro.__appendDOMNode(box_node, text_node);
							break;
						case "right":
							nexacro.__setDOMStyle_Display(text_node.style, "inline-block");
							break;
						case "top":
							nexacro.__appendDOMNode(box_node, text_node);
							break;
					}
				}
			}
		}
	};

	nexacro.ImageElement = function (parent_elem, id) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.id = id;
		this.name = this.parent_elem.name + ":" + (id || "image");
	};
	var _pImageElement = nexacro._createPrototype(nexacro.Element, nexacro.ImageElement);
	nexacro.ImageElement.prototype = _pImageElement;

	_pImageElement._type_name = "ImageElement";
	_pImageElement.typeselector = "nexaimagebox";

	_pImageElement.image = null;

	_pImageElement.padding = null;
	_pImageElement._created = false;


	_pImageElement._createElementHandle = function (owner_elem, _doc) {
		if (this.image) {
			_doc = _doc || owner_elem._getRootWindowHandle();
			var handle = _doc.createElement("img");
			if (handle) {
				handle.id = this.name;
				handle._linked_element = this;

				this.handle = handle;
				nexacro.__setDOMNode_Alt(handle, this.parent_elem.accessibilitylabel ? this.parent_elem.accessibilitylabel : this.parent_elem.linkedcontrol.id);
				var handle_style = handle.style;

				this._refreshCommonStyleProps(handle_style);

				nexacro.__setDOMNode_ImageUrl(handle, this.image._sysurl);
				nexacro.__setDOMStyle_Pos(handle.style, this.left, this.top);

				nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
			}
		}
	};


	_pImageElement.create = function (win) {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && owner_elem.handle && !this.handle) {
			this.owner_elem = owner_elem;

			this._createElementHandle(owner_elem, win._doc);
			this._created = true;
		}
	};

	_pImageElement.createCommand = function () {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this._created) {
			this.owner_elem = owner_elem;

			if (this.image) {
				var handle_style = this._getCommonStyleStr();
				var str = "<img id='" + this.name + "' class='nexaimagebox'";
				str += " src='" + this.image._sysurl + "'";
				str += (handle_style) ? (" style='" + handle_style + "'/>") : "/>";
				return str;
			}
		}
		return "";
	};
	_pImageElement.attachHandle = function (win) {
		if (this.name && !this._created) {
			var handle = win._doc.getElementById(this.name);
			if (handle) {
				this.handle = handle;
				handle._linked_element = this;
			}
			this._created = true;
		}
	};

	_pImageElement.destroy = function () {
		this._destroyElementHandle();
		this.owner_elem = null;
		this.parent = null;
		this.parent_elem = null;
		this._created = false;
	};



	_pImageElement.setElementPadding = function (padding) {
		if (this.padding != padding) {
			this.padding = padding;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_PaddingObject(handle.style, padding);
			}
		}
	};


	_pImageElement.setElementImage = function (image) {
		if (this.image != image) {
			this.image = image;

			if (image) {
				if (this.handle) {
					nexacro.__setDOMNode_ImageUrl(this.handle, image._sysurl);
				}
				else if (this.owner_elem) {
					this._createElementHandle(this.owner_elem);
				}
			}
			else {
				if (this.handle) {
					this._destroyElementHandle();
				}
			}
		}
		_pImageElement.getImageCount = nexacro._emptyFn;
		_pImageElement.setImageIndex = nexacro._emptyFn;
	};


	nexacro.InputElement = function (parent_elem, id) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.id = id;
		this.name = this.parent_elem.name + ":" + (id || "input");

		this._composer = new nexacro._CompositionState();
	};

	var _pInputElement = nexacro._createPrototype(nexacro.Element, nexacro.InputElement);
	nexacro.InputElement.prototype = _pInputElement;

	_pInputElement._type_name = "InputElement";
	_pInputElement.typeselector = "nexainput";

	_pInputElement.textAlign = null;
	_pInputElement.padding = null;
	_pInputElement.caretcolor = null;
	_pInputElement.selectcolor = null;
	_pInputElement.selectbackground = null;
	_pInputElement.compositecolor = null;

	_pInputElement.enable = true;
	_pInputElement.useime = "global";
	_pInputElement.imemode = "auto";
	_pInputElement.readonly = false;
	_pInputElement.maxlength = 0;
	_pInputElement.autoskip = false;
	_pInputElement.autoselect = false;
	_pInputElement.value = null;
	_pInputElement.defaultvalue = "";
	_pInputElement.displaynulltext = "";
	_pInputElement.tabindentsize = 4;
	_pInputElement.usesoftkeyboard = true;
	_pInputElement.inputtype = "text";

	_pInputElement._is_focused = false;
	_pInputElement._is_sys_focused = false;

	_pInputElement._is_input_touchstart = false;
	_pInputElement._is_input_element = true;

	_pInputElement._zerolength_value = undefined;
	_pInputElement._input_text = "";
	_pInputElement._disabled_color = null;
	_pInputElement._imedisable = false;

	_pInputElement._checkmax_editing_only = true;
	_pInputElement._last_selection_range = null;

	_pInputElement._keypad_type = "text";

	_pInputElement._BeforeinputState = {
	};
	_pInputElement._BeforeinputState.PASS = 0;
	_pInputElement._BeforeinputState.CANCEL = 1;
	_pInputElement._BeforeinputState.CONVERT_UPPER = 2;
	_pInputElement._BeforeinputState.CONVERT_LOWER = 3;
	_pInputElement._BeforeinputState.REPLACE = 4;
	_pInputElement._BeforeinputState.MAXLENGTH = 5;

	_pInputElement._beforeinput_result_data = null;
	_pInputElement._beforeinput_result_pos = null;

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
		_pInputElement.MOUSE_LBUTTON = 1;
		_pInputElement.MOUSE_MBUTTON = 4;
		_pInputElement.MOUSE_RBUTTON = 2;
	}
	else {
		_pInputElement.MOUSE_LBUTTON = 0;
		_pInputElement.MOUSE_MBUTTON = 1;
		_pInputElement.MOUSE_RBUTTON = 2;
	}

	if ((nexacro._Browser != "IE" && nexacro._Browser != "Gecko")) {
		_pInputElement._use_html_maxlength = true;
	}
	else {
		_pInputElement._use_html_maxlength = false;
	}

	if (nexacro._Browser == "Chrome" && nexacro._BrowserVersion >= 60) {
		_pInputElement._use_event_beforeinput = true;
	}
	else {
		_pInputElement._use_event_beforeinput = false;
	}

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 10) {
		_pInputElement._evtorder_compositionend_is_last = true;
	}
	else {
		_pInputElement._evtorder_compositionend_is_last = false;
	}

	if (nexacro._Browser == "IE" && nexacro._BrowserType == "Edge") {
		_pInputElement._evtfire_oninput_after_compositionend = false;
	}
	else {
		_pInputElement._evtfire_oninput_after_compositionend = true;
	}

	if (nexacro._OS == "Android" && nexacro._Browser == "Chrome" && nexacro._BrowserVersion <= 34) {
		_pInputElement._evtfire_oninput_only_when_backspacekey = true;
	}
	else {
		_pInputElement._evtfire_oninput_only_when_backspacekey = false;
	}
	if (nexacro._Browser == "IE") {
		if (nexacro._BrowserVersion > 9 || nexacro._BrowserType == "Edge") {
			_pInputElement._use_scroll_referesh = true;
		}
		else {
			_pInputElement._use_scroll_referesh = false;
		}
	}
	else if (nexacro._OS == "iOS") {
		_pInputElement._use_scroll_referesh = true;
	}
	else {
		_pInputElement._use_scroll_referesh = false;
	}

	_pInputElement._paste_caret_pos = null;

	if (nexacro._OS == "iOS" && nexacro._SystemType == "iphone") {
		_pInputElement._NUMERIC_KEYPAD_TYPE = "number";
	}
	else if (nexacro._OS == "iOS" || nexacro._OS == "Android" || nexacro._OS == "Windows Phone") {
		_pInputElement._NUMERIC_KEYPAD_TYPE = "tel";
	}
	else {
		_pInputElement._NUMERIC_KEYPAD_TYPE = "text";
	}

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
		_pInputElement._createElementHandle = function (owner_elem, _doc) {
			owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this._created) {
				this._setElementDefaultLineHeight();
				this.owner_elem = owner_elem;

				var handle_style = this._getCommonStyleStr();

				if (!this.enable) {
					handle_style += nexacro.__getHTMLStyle_Enable(this.enable, this._disabled_color);
				}

				if (this.textAlign) {
					handle_style += nexacro.__getHTMLStyle_textAlign(this.textAlign);
				}

				if (this.padding) {
					handle_style += nexacro.__getHTMLStyle_PaddingObject(this.padding);
				}

				if (this.imemode) {
					handle_style += nexacro.__getHTMLStyle_ImeMode(this.imemode);
				}

				var handle_attr = nexacro.__getHTMLAttr_Enable(this.enable) + 
					nexacro.__getHTMLAttr_ReadOnly(this.readonly);
				if (this.maxlength > 0 && this._use_html_maxlength) {
					handle_attr += nexacro.__getHTMLAttr_MaxLength(this.maxlength);
				}

				var str = "<input id='" + this.name + "' class='" + this._getElementClassName() + "' ";
				str += (handle_style) ? (" style='" + handle_style + "' ") : "";
				if (this.value) {
					str += "value ='" + nexacro._encodeXml(this.value) + "' ";
					handle_attr += nexacro.__getHTMLAttr_InputType(this.inputtype);
				}
				else if (this.displaynulltext) {
					str += "value ='" + nexacro._encodeXml(this.displaynulltext) + "' ";
					handle_attr += nexacro.__getHTMLAttr_InputType("text");
				}
				else {
					str += "value ='" + nexacro._encodeXml(this.defaultvalue) + "' ";
					handle_attr += nexacro.__getHTMLAttr_InputType(this.inputtype);
				}
				str += handle_attr ? (" " + handle_attr) : "";
				str += ">";

				owner_elem.handle.innerHTML = str;

				var input_handle = owner_elem.handle.firstChild;
				this.handle = input_handle;
				this.handle._linked_element = this;
			}
		};
	}
	else {
		_pInputElement._createElementHandle = function (owner_elem, _doc) {
			var handle = this.handle = _doc.createElement("input");
			var handle_style = handle.style;

			handle.id = this.name;
			nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

			handle._linked_element = this;

			this._refreshCommonStyleProps(handle_style);
			this._setElementDefaultLineHeight();

			if (this.textAlign) {
				nexacro.__setDOMStyle_textAlign(handle_style, this.textAlign);
			}

			if (this.padding) {
				nexacro.__setDOMStyle_PaddingObject(handle_style, this.padding);
			}

			if (!this.enable) {
				nexacro.__setDOMNode_Enable(handle, false);
			}

			if (this.readonly) {
				nexacro.__setDOMNode_ReadOnly(handle, true);
			}

			if (this.value) {
				nexacro.__setDOMNode_Value(handle, this.value);
				nexacro.__setDOMNode_Type(handle, this.inputtype);
			}
			else if (this.displaynulltext) {
				nexacro.__setDOMNode_Value(handle, this.displaynulltext);
				nexacro.__setDOMNode_Type(handle, "text");
			}

			if (this.imemode) {
				nexacro.__setDOMNode_ImeMode(handle, this.imemode);
			}

			if (this.maxlength > 0 && this._use_html_maxlength) {
				nexacro.__setDOMNode_MaxLength(handle, this.maxlength);
			}

			if (this.handle) {
				nexacro.__appendDOMNode(owner_elem.dest_handle, this.handle);
			}
		};
	}

	_pInputElement.create = function (win) {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && owner_elem.handle && !this._created) {
			this.owner_elem = owner_elem;

			this._createElementHandle(owner_elem, win._doc);
			this._bindSysEvent();
			this._created = true;
		}
	};

	_pInputElement._destroyInputHandle = function () {
		if (this.handle) {
			var dest_handle = (this.owner_elem ? this.owner_elem.dest_handle : null);
			this.handle._linked_element = null;

			nexacro.__removeDOMNode(dest_handle, this.handle);

			this.handle = null;
		}
	};

	_pInputElement.destroy = function () {
		if (this._restore_scrollpos_timer > 0) {
			clearTimeout(this._restore_scrollpos_timer);
			this._restore_scrollpos_timer = 0;
		}


		this._unbindSysEvent();

		this._destroyInputHandle();

		return nexacro.Element.prototype.destroy.call(this);
	};

	_pInputElement.createCommand = function () {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this._created) {
			this._setElementDefaultLineHeight();
			this.owner_elem = owner_elem;

			var handle_style = this._getCommonStyleStr();

			if (!this.enable) {
				handle_style += nexacro.__getHTMLStyle_Enable(this.enable, this._disabled_color);
			}

			if (this.textAlign) {
				handle_style += nexacro.__getHTMLStyle_textAlign(this.textAlign);
			}

			if (this.padding) {
				handle_style += nexacro.__getHTMLStyle_PaddingObject(this.padding);
			}

			if (this.imemode) {
				if (this._imedisable) {
					handle_style += nexacro.__getHTMLStyle_ImeMode("disabled");
				}
				else {
					handle_style += nexacro.__getHTMLStyle_ImeMode(this.imemode);
				}
			}

			if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
				handle_style += nexacro.__getHTMLStyle_LineHeightObject(nexacro.CSSValueObject(this.height + "px"));
			}

			var handle_attr = nexacro.__getHTMLAttr_Enable(this.enable) + 
				nexacro.__getHTMLAttr_ReadOnly(this.readonly);
			if (this.maxlength > 0 && this._use_html_maxlength) {
				handle_attr += nexacro.__getHTMLAttr_MaxLength(this.maxlength);
			}

			var str = "<input id='" + this.name + "' class='" + this._getElementClassName() + "' ";
			str += (handle_style) ? (" style='" + handle_style + "' ") : "";
			if (this.value) {
				str += "value ='" + nexacro._encodeXml(this.value) + "' ";
				handle_attr += nexacro.__getHTMLAttr_InputType(this.inputtype);
			}
			else if (this.displaynulltext) {
				str += "value ='" + nexacro._encodeXml(this.displaynulltext) + "' ";
				handle_attr += nexacro.__getHTMLAttr_InputType("text");
			}
			else {
				str += "value ='" + nexacro._encodeXml(this.defaultvalue) + "' ";
				handle_attr += nexacro.__getHTMLAttr_InputType(this.inputtype);
			}

			if (nexacro._enableaccessibility) {
				str += nexacro.__getDOMAccessibilityStr_LabelBy(owner_elem.name);
				if (nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) {
					str += nexacro.__getDOMAccessibilityStr_Role(owner_elem.accessibilityrole);
				}

				str += nexacro.__getHTMLAttr_Autocomplete("off");
			}
			str += handle_attr ? (" " + handle_attr) : "";

			str += ">";

			return str;
		}
		return "";
	};

	_pInputElement.attachHandle = function (win) {
		if (this.name && !this.handle) {
			var input_handle = win._doc.getElementById(this.name);
			this.handle = input_handle;
			this.handle._linked_element = this;

			this._bindSysEvent();
		}
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 10) {
		_pInputElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;

				if (width < 0) {
					width = 0;
				}
				if (height < 0) {
					height = 0;
				}

				var handle = this.handle;
				if (handle) {
					if (width && height) {
						nexacro.__setDOMStyle_Size(handle.style, width - 1, height);

						setTimeout(function () {
							nexacro.__setDOMStyle_Size(handle.style, width, height);
						}, 0);
					}
					else {
						nexacro.__clearDOMStyle_Size(handle.style);
					}

					this._setElementDefaultLineHeight();
				}
			}
		};
	}
	else {
		_pInputElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;

				if (width < 0) {
					width = 0;
				}
				if (height < 0) {
					height = 0;
				}

				var handle = this.handle;
				if (handle) {
					if (width && height) {
						nexacro.__setDOMStyle_Size(handle.style, width, height);
					}
					else {
						nexacro.__clearDOMStyle_Size(handle.style);
					}

					this._setElementDefaultLineHeight();
				}
			}
		};
	}

	_pInputElement.setElementTextAlign = function (textalign) {
		if (this.textAlign != textalign) {
			this.textAlign = textalign;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_textAlign(handle.style, textalign);
			}
		}
	};

	_pInputElement.setElementPadding = function (padding) {
		if (this.padding != padding) {
			this.padding = padding;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_PaddingObject(handle.style, padding);
			}
		}
	};

	_pInputElement.setElementCaretColor = function (color) {
		if (this.caretcolor != color) {
			this.caretcolor = color;
			var input_handle = this.handle;
			if (input_handle) {
			}
		}
	};

	_pInputElement.setElementSelectColor = function (color) {
		this.selectcolor = color;
	};

	_pInputElement.setElementSelectBackgroundColor = function (color) {
		this.selectbackground = color;
	};

	_pInputElement.setElementCompositeColor = function (color) {
		this.compositecolor = color;
	};

	_pInputElement.setElementTabindentSize = function (indent) {
		this.tabindentsize = indent;
	};

	if (nexacro._Browser == "IE") {
		_pInputElement._setElementDefaultLineHeight = function () {
			if (this.handle) {
				nexacro.__setDOMStyle_LineHeightObject(this.handle.style, nexacro.CSSValueObject(this.height + "px"));
			}
		};
	}
	else {
		_pInputElement._setElementDefaultLineHeight = function () {
			if (this.handle) {
				nexacro.__setDOMStyle_LineHeightObject(this.handle.style, nexacro.CSSValueObject("100%"));
			}
		};
	}

	_pInputElement.setElementEnable = function (enable, color) {
		if (this.enable != enable) {
			this.enable = enable;

			if (!enable) {
				this._disabled_color = color;
			}
			else {
				this._disabled_color = null;
			}

			var input_handle = this.handle;
			if (input_handle) {
				nexacro.__setDOMNode_Enable(input_handle, enable);
				nexacro.__setDOMStyle_ColorObject(input_handle.style, this._disabled_color);
			}
		}
	};

	_pInputElement.setElementReadonly = function (readonly) {
		if (this.readonly != readonly) {
			this.readonly = readonly;

			var input_handle = this.handle;
			if (input_handle) {
				nexacro.__setDOMNode_ReadOnly(input_handle, readonly);
			}
		}
	};

	_pInputElement.setElementAutoSkip = function (v) {
		if (this.autoskip != v) {
			this.autoskip = v;
		}
	};

	_pInputElement.setElementAutoSelect = function (v) {
		if (this.autoselect != v) {
			this.autoselect = v;
		}
	};

	_pInputElement.setElementMaxLength = function (length) {
		if (this.maxlength != length) {
			this.maxlength = length;

			var input_handle = this.handle;
			if (input_handle) {
				if (this._use_html_maxlength) {
					nexacro.__setDOMNode_MaxLength(input_handle, (length > 0) ? length : 65535);
				}

				var text = this.getElementText();
				if (this._is_focused || !this._checkmax_editing_only) {
					if (this.maxlength > 0 && text.length > this.maxlength) {
						text = text.substring(0, this.maxlength);
						this._updateInputValue(text);
					}
				}
			}
		}
	};

	_pInputElement.setElementUseSoftKeyboard = function (usesoftkeyboard) {
		if (this.usesoftkeyboard != usesoftkeyboard) {
			this.usesoftkeyboard = usesoftkeyboard;
		}
	};

	_pInputElement.setElementUseIme = function (useime) {
		if (this.useime != useime) {
			this.useime = useime;
		}
	};

	_pInputElement.setElementImeMode = function (imemode) {
		if (this.imemode != imemode) {
			this.imemode = imemode;
			var input_handle = this.handle;
			if (input_handle) {
				nexacro.__setDOMNode_ImeMode(input_handle, imemode);
			}
		}
	};

	_pInputElement.setElementDisplayNullText = function (nulltext) {
		var input_handle = this.handle;

		if (this.displaynulltext == nulltext) {
			return;
		}

		this.displaynulltext = nulltext;

		if (input_handle) {
			if (nexacro._isNull(this.value) && !this._is_focused) {
				this._updateInputValue(this.displaynulltext);
			}
		}
	};

	_pInputElement.setElementDefaultValue = function (value) {
		if (value != this.defaultvalue) {
			this.defaultvalue = value;
		}
	};

	_pInputElement.setElementValue = function (value) {
		var text = (nexacro._isNull(value) ? this.defaultvalue : (value + ""));
		var inputtype = this.inputtype;

		if ((this.value == value) && (this._getInputValue() == text)) {
			return;
		}

		this.value = value;
		this._input_text = text;

		var input_handle = this.handle;
		if (input_handle) {
			if (this.value || this.value === "") {
				if (this._is_focused || !this._checkmax_editing_only) {
					if (this.maxlength > 0 && text.length > this.maxlength) {
						text = text.substring(0, this.maxlength);
					}
				}

				this._updateInputValue(text);
			}
			else if (!this._is_focused && this.displaynulltext != "") {
				inputtype = "text";
				this._updateInputValue(this.displaynulltext);
			}
			else {
				this._updateInputValue(text);
			}
			nexacro.__setDOMNode_Type(input_handle, inputtype);
		}
	};

	_pInputElement.replaceElementText = function (value, begin, end, bselect) {
		var input_value = this._getInputValue();
		if (begin < 0) {
			return;
		}

		if (end < 0) {
			end = input_value.length;
		}
		if (begin > end) {
			end = begin;
		}

		value = (value ? value : "");
		var caretpos = begin + value.length;

		var text = input_value.substring(0, begin) + value + input_value.substring(end);

		if (bselect) {
			this._updateInputValue(text, !this._processing_oninput, begin, caretpos);
		}
		else {
			this._updateInputValue(text, !this._processing_oninput, caretpos);
		}
	};

	_pInputElement.updateElementText = function (value, caretpos) {
		value = (value ? value : "");
		this._updateInputValue(value, !this._processing_oninput, caretpos);
	};

	_pInputElement._updateElementValue = function (value) {
		if (this.value == value) {
			return;
		}

		if (!value) {
			value = this._zerolength_value;
		}

		this.value = value;
	};

	if (nexacro._Browser == "IE") {
		if (nexacro._BrowserVersion <= 8) {
			_pInputElement._updateInputValue = function (value, fireevent, selectionStart, selectionEnd) {
				var input_handle = this.handle;
				if (input_handle) {
					if (this._composer && this._composer.isComposing()) {
						input_handle.blur();
						input_handle.focus();
					}

					var processing_flag = this._processing_oninput;
					if (!fireevent) {
						this._processing_oninput = true;
					}

					if (selectionStart != null && selectionStart > -1) {
						if (selectionEnd == -1) {
							selectionEnd = value.length;
						}
						if (selectionEnd == null || selectionEnd < selectionStart) {
							selectionEnd = selectionStart;
						}
					}

					this._selectstartpos_onprepertychange_afterupdate = selectionStart;
					this._selectendpos_onprepertychange_afterupdate = selectionEnd;

					this._input_text = value;
					nexacro.__setDOMNode_Value(input_handle, value);

					this._selectstartpos_onprepertychange_afterupdate = undefined;
					this._selectendpos_onprepertychange_afterupdate = undefined;
					if (!fireevent) {
						this._processing_oninput = processing_flag;
					}
				}
			};
		}
		else {
			_pInputElement._updateInputValue = function (value, fireevent, selectionStart, selectionEnd) {
				var input_handle = this.handle;
				if (input_handle) {
					if (this._composer && this._composer.isComposing()) {
						input_handle.blur();
						input_handle.focus();
					}

					this._input_text = value;
					nexacro.__setDOMNode_Value(input_handle, value);

					if (selectionStart != null && selectionStart > -1) {
						if (selectionEnd == -1) {
							selectionEnd = value.length;
						}
						if (selectionEnd == null || selectionEnd < selectionStart) {
							selectionEnd = selectionStart;
						}

						var _doc = this._getRootWindowHandle();
						if (_doc) {
							nexacro.__setDOMNode_SetSelect(_doc, input_handle, selectionStart, selectionEnd);
						}
					}

					if (fireevent) {
						nexacro.__fireHTMLEvent(input_handle, "input", "oninput");
					}
				}
			};
		}
	}
	else {
		_pInputElement._updateInputValue = function (value, fireevent, selectionStart, selectionEnd) {
			var input_handle = this.handle;
			if (input_handle) {
				if (nexacro._Browser == "Chrome") {
					if (this._composer && this._composer.isComposing()) {
						this._composer.setStatus(nexacro._CompositionState.END, selectionEnd);
					}
				}

				this._input_text = value;
				nexacro.__setDOMNode_Value(input_handle, value);

				if (selectionStart != null && selectionStart > -1) {
					if (selectionEnd == -1) {
						selectionEnd = value.length;
					}
					if (selectionEnd == null || selectionEnd < selectionStart) {
						selectionEnd = selectionStart;
					}

					var _doc = this._getRootWindowHandle();
					if (_doc) {
						nexacro.__setDOMNode_SetSelect(_doc, input_handle, selectionStart, selectionEnd);
					}
				}
				if (fireevent) {
					nexacro.__fireHTMLEvent(input_handle, "input", "oninput");
				}
			}
		};
	}

	_pInputElement.setElementInputType = function (type, bImedisable) {
		if (type == "number" || type == "tel") {
			type = this._NUMERIC_KEYPAD_TYPE;
		}
		else if (type == "date") {
			type = "date";
		}
		else if (type != "password") {
			type = "text";
		}

		var input_handle = this.handle;
		var new_handle;

		if (this._imedisable != bImedisable) {
			this._imedisable = bImedisable ? bImedisable : false;
			if (input_handle) {
				nexacro.__setDOMNode_ImeMode(input_handle, this._imedisable ? "disabled" : this.imemode);
			}
		}

		if (this.inputtype != type) {
			this._keypad_type = type;

			var inputtype = (type == "number" ? "text" : type);
			if (nexacro._OS == "Android" && (type == "number" || type == "tel")) {
				inputtype = "tel";
			}
			if (this.inputtype != inputtype) {
				this.inputtype = inputtype;

				if (input_handle) {
					new_handle = nexacro.__changeInputDOMNodeType(input_handle, inputtype);
					if (new_handle != input_handle) {
						this._unbindSysEvent();

						new_handle._linked_element = this;
						input_handle = this.handle = new_handle;

						this._bindSysEvent();

						if (this._is_focused) {
							nexacro.__setInputDOMNodeFocus(input_handle);
						}
					}
				}
			}
		}
	};

	if (nexacro._OS == "iOS" && nexacro._SystemType == "iphone") {
		_pInputElement._change_to_keypad_type = function () {
			if (this.readonly || this._is_sys_focused || this.inputtype == this._keypad_type) {
				return;
			}

			var input_handle = this.handle;
			if (input_handle) {
				var text = this._inputtext_on_inputtype = this.getElementText();
				this._caretpos_on_inputtype = this.getElementCaretPos();

				var keypad_type = this._keypad_type;
				if (keypad_type == "number" && text) {
					if (nexacro.isNumeric(text) == false) {
						keypad_type = "text";
					}
				}
				nexacro.__changeInputDOMNodeType(input_handle, keypad_type);
			}
		};

		_pInputElement._change_type_on_sys_focus = function (type) {
			var input_handle = this.handle;
			if (input_handle) {
				var text = this._inputtext_on_inputtype;
				var pos = this._caretpos_on_inputtype;

				nexacro.__changeInputDOMNodeType(input_handle, type);

				this._updateInputValue(text ? text : "");
				this.setElementSetSelect(pos.begin, pos.end);

				this._inputtext_on_inputtype = "";
				this._caretpos_on_inputtype = null;

				this._restore_scrollpos_onclick = true;

				var cur_doc = this._getRootWindowHandle();
				var cur_win = cur_doc.defaultView || cur_doc.parentWindow;

				nexacro._observeSysEvent(cur_win, "scroll", "onscroll", this._on_sys_scroll);
				var pThis = this;
				this._restore_scrollpos_timer = setTimeout(function () {
					clearTimeout(pThis._restore_scrollpos_timer);
					pThis._restore_scrollpos_timer = 0;

					nexacro._stopSysObserving(cur_win, "scroll", "onscroll", pThis._on_sys_scroll);
					pThis._restore_scrollpos_onclick = false;
				}, 500);
			}
		};

		_pInputElement._scrollintoview_on_sys_click = function () {
			if (this._restore_scrollpos_onclick) {
				if (this._restore_scrollpos_timer > 0) {
					clearTimeout(this._restore_scrollpos_timer);
					this._restore_scrollpos_timer = 0;
				}

				var cur_doc = this._getRootWindowHandle();
				var cur_win = cur_doc.defaultView || cur_doc.parentWindow;

				if (this._scoll_pos) {
					cur_win.scrollTo(this._scoll_pos[0], this._scoll_pos[1]);
				}
				nexacro._stopSysObserving(cur_win, "scroll", "onscroll", this._on_sys_scroll);
				this._restore_scrollpos_onclick = false;
			}
		};
	}
	else {
		_pInputElement._change_to_keypad_type = nexacro._emptyFn;
		_pInputElement._change_type_on_sys_focus = nexacro._emptyFn;
		_pInputElement._scrollintoview_on_sys_click = nexacro._emptyFn;
	}

	_pInputElement._refreshElement = function () {
		var _doc = this._getRootWindowHandle();
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (_doc && owner_elem && owner_elem.handle) {
			if (this._use_scroll_referesh) {
				var pThis = this.handle;
				var tmp_handle = _doc.createElement("div");
				pThis.style.outlineColor = "transparent";
				pThis.style.outlineStyle = "dotted";
				pThis.style.outlineWidth = "0px";

				owner_elem.handle.appendChild(tmp_handle);
				setTimeout(function () {
					pThis.style.outlineColor = "";
					pThis.style.outlineStyle = "";
					pThis.style.outlineWidth = "";

					owner_elem.handle.removeChild(tmp_handle);
				}, 0);
			}
		}
	};

	_pInputElement._applyElementFocus = function () {
		nexacro.__setInputDOMNodeFocus(this.handle);
	};

	_pInputElement.setElementFocus = function (trigger_type) {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused) {
				this._is_focused = true;

				if (this._checkmax_editing_only && this.maxlength > 0) {
					var text = (nexacro._isNull(this.value) ? this.defaultvalue : (this.value + ""));
					if (text.length > this.maxlength) {
						text = text.substring(0, this.maxlength);
						this._updateInputValue(text);
					}
				}
			}

			if (nexacro._isNull(this.value)) {
				var value = this._getInputValue();
				if (value != this.defaultvalue) {
					this._updateInputValue(this.defaultvalue);
					nexacro.__setDOMNode_Type(input_handle, this.inputtype);
					nexacro.__setDOMStyle_ColorObject(input_handle.style, "");
				}
			}

			if (!this._is_sys_focused) {
				if (trigger_type == "lbutton" || trigger_type == "lbuttondown" || trigger_type == "rbuttondown" || 
					trigger_type == "touch" || trigger_type == "tap" || trigger_type == "longpress") {
					if (!(nexacro._OS == "iOS" && nexacro._enableaccessibility)) {
						this._change_to_keypad_type();
					}
				}

				if (trigger_type != "lbuttondown" || nexacro._BrowserType != "Edge") {
					nexacro.__setInputDOMNodeFocus(input_handle);
				}
			}

			nexacro.__setLastFocusedElement(this);
		}
	};

	_pInputElement.setElementBlur = function () {
		var input_handle = this.handle;
		if (input_handle) {
			var _doc = this._getRootWindowHandle();
			if (_doc) {
				if (nexacro._BrowserType != "Edge") {
					if (this.inputtype != "date") {
						if (!(nexacro._Browser == "MobileSafari")) {
							if (!(nexacro._enableaccessibility && nexacro._accessibilitytype == 5)) {
								nexacro.__setDOMNode_SetSelect(_doc, input_handle, 0, 0);
							}
						}
						nexacro._removeInputDOMNodeCaret(input_handle);
					}
				}
			}

			if (this._is_focused) {
				this._is_focused = false;

				if (this._is_sys_focused) {
					nexacro.__setDOMNode_Blur(input_handle);
				}
			}

			if (this._checkmax_editing_only && this.maxlength > 0) {
				var text = (nexacro._isNull(this.value) ? this.defaultvalue : (this.value + ""));
				var value = this._getInputValue();
				if (text != value) {
					this._updateInputValue(text);
				}
			}

			if (this.value == null && this.displaynulltext != "") {
				if (nexacro._OS == "iOS" && nexacro._SystemType == "iphone") {
					var pThis = this;
					setTimeout(function () {
						nexacro.__setDOMNode_Type(input_handle, "text");
						pThis._updateInputValue(pThis.displaynulltext, false);
					}, 0);
				}
				else {
					nexacro.__setDOMNode_Type(input_handle, "text");
					this._updateInputValue(this.displaynulltext, false);
				}
			}
		}
	};

	_pInputElement.setElementSetSelect = function (start, end) {
		if (this.inputtype == "date") {
			return;
		}

		var input_handle = this.handle;
		if (input_handle) {
			var _doc = this._getRootWindowHandle();
			var val = this.getElementText();
			var len = val.length;

			end = (typeof end == 'number') ? (end == -1 ? len : end) : start;

			if (!this._is_focused) {
				this._setElementLastSelectionRange([start, end]);
				return;
			}

			var range = end - start;
			if (_doc) {
				if (range == len) {
					if (nexacro._isTouchInteraction && nexacro._OS == "iOS") {
						nexacro.__setDOMNode_SetSelect(_doc, input_handle, start, end);
					}
					else {
						nexacro.__setDOMNode_Select(_doc, input_handle);
					}
				}
				else {
					nexacro.__setDOMNode_SetSelect(_doc, input_handle, start, end);
				}
			}
		}
	};

	_pInputElement._setElementLastSelectionRange = function (range) {
		if (range) {
			this._last_selection_range = range;
		}
		else {
			this._last_selection_range = null;
		}
	};

	_pInputElement.getElementCaretPos = function () {
		var input_handle = this.handle;
		if (input_handle && this.inputtype != "date" && this._is_focused) {
			var _doc = this._getRootWindowHandle();
			if (_doc) {
				return nexacro.__getDOMNodeCaretPos(_doc, input_handle);
			}
		}
		return -1;
	};

	_pInputElement.getElementSelectionRange = function () {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused && this._last_selection_range) {
				return this._last_selection_range;
			}

			var _doc = this._getRootWindowHandle();
			if (_doc) {
				var sel = nexacro.__getDOMNodeSelectionRange(_doc, input_handle);
				return sel.splice(0, 2);
			}
		}
		return [0, 0];
	};

	_pInputElement.getElementText = function () {
		var input_handle = this.handle;
		if (input_handle) {
			return this._getInputValue();
		}
		return this._input_text;
	};

	_pInputElement._getInputValue = function () {
		var input_handle = this.handle;
		if (input_handle) {
			if (this._is_focused || !this.displaynulltext) {
				return nexacro.__getDOMNodeValue(input_handle);
			}
			else {
				return this._input_text;
			}
		}
		return "";
	};

	_pInputElement.getElementValue = function () {
		return this.value;
	};

	_pInputElement.getCompositionStatus = function () {
		return (this._composer ? this._composer.status : nexacro._CompositionState.NONE);
	};

	_pInputElement.isComposing = function () {
		return (this._composer ? this._composer.isComposing() : false);
	};

	_pInputElement.setCompositionComplete = function () {
		var input_handle = this.handle;
		if (input_handle) {
			var pos = this.getElementCaretPos();

			var value = this._getInputValue();

			var is_composing = this._composer.isComposing();
			if (is_composing) {
				this._composer.setStatus(nexacro._CompositionState.END, pos.end);
				this._updateInputValue(value, !this._processing_oninput);
			}

			pos = this.getElementCaretPos();
			this._composer.setStatus(nexacro._CompositionState.NONE, pos.end);
		}
	};

	_pInputElement.setCompositionCancel = function () {
		var input_handle = this.handle;
		if (input_handle) {
			var pos = this.getElementCaretPos();

			var value = this._getInputValue();

			var is_composing = this._composer.isComposing();
			if (is_composing) {
				var offset = this._composer.getOffset();
				this._composer.setStatus(nexacro._CompositionState.END, offset.begin);
				this._updateInputValue(value.substring(0, offset.begin), !this._processing_oninput);
			}

			pos = this.getElementCaretPos();
			this._composer.setStatus(nexacro._CompositionState.NONE, pos.end);
		}
	};

	_pInputElement.setInputProcess = function (v) {
		this._processing_oninput = v;
	};

	_pInputElement.getInputProcess = function () {
		return this._processing_oninput;
	};

	_pInputElement.setElementAccessibilityRole = nexacro._emptyFn;
	_pInputElement._setElementInputRole = nexacro._emptyFn;
	_pInputElement._wantAccessibilityAdditionalLabel = nexacro._emptyFn;

	_pInputElement._checkMaxLength = function (value, caretpos) {
		var maxlength = this.maxlength;
		if (maxlength <= 0 && caretpos <= 0) {
			return;
		}

		var vlength = value.length;
		var _is_composing = this._composer.isComposing();
		if (maxlength < vlength) {
			if (this._use_html_maxlength && _is_composing) {
				return;
			}

			var _has_candidate_window;
			if (_is_composing) {
				_has_candidate_window = this._composer.isHasCandiateWindow(value.charAt(caretpos - 1));
			}

			if (!_is_composing || !_has_candidate_window) {
				return {
					"ismax" : true, 
					"pos" : (caretpos - (vlength - maxlength))
				};
			}
			else {
				var offset = this._composer.getOffset();
				if (maxlength == (vlength - (offset.end - offset.begin))) {
					return {
						"ismax" : true, 
						"pos" : (caretpos - (vlength - maxlength))
					};
				}
			}
		}
		else {
			return {
				"ismax" : (!_is_composing && maxlength == vlength), 
				"pos" : caretpos
			};
		}

		return;
	};

	_pInputElement._go_next_focus = function () {
		var input_handle = this.handle;
		var comp = this.parent_elem.linkedcontrol;
		if (input_handle && comp) {
			var form = comp._getForm();
			var newfocus_comp = form._searchNextTabFocus(form._last_focused);

			if (newfocus_comp && newfocus_comp[0]) {
				if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
					var win = form._getWindow();
					win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
				}

				newfocus_comp[0]._setFocus(true, 0, true);
				if (newfocus_comp[0]._is_editable_control) {
					newfocus_comp[0]._setDefaultCaret();
				}
			}
		}
	};

	_pInputElement._bindSysEvent = function () {
		var input = this.handle;
		if (input) {
			nexacro._observeSysEvent(input, "keydown", "onkeydown", this._on_sys_keydown);
			nexacro._observeSysEvent(input, "keyup", "onkeyup", this._on_sys_keyup);
			nexacro._observeSysEvent(input, "keypress", "onkeypress", this._on_sys_keypress);

			if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8 && input.onpropertychange !== "undefined") {
				nexacro._observeSysEvent(input, "propertychange", "onpropertychange", this._on_sys_propertychange);
			}
			else {
				if (this._use_event_beforeinput) {
					nexacro._observeSysEvent(input, "beforeinput", "onbeforeinput", this._on_sys_beforeinput_forward);
				}

				nexacro._observeSysEvent(input, "input", "oninput", this._on_sys_keyinput_forward);
				nexacro._observeSysEvent(input, "compositionstart", "oncompositionstart", this._on_sys_compositionstart);
				nexacro._observeSysEvent(input, "compositionupdate", "oncompositionupdate", this._on_sys_compositionupdate);
				nexacro._observeSysEvent(input, "compositionend", "oncompositionend", this._on_sys_compositionend);
			}

			nexacro._observeSysEvent(input, "cut", "oncut", this._on_sys_cut);
			nexacro._observeSysEvent(input, "paste", "onpaste", this._on_sys_paste);

			nexacro._observeSysEvent(input, "mousedown", "onmousedown", this._on_sys_mousedown);
			nexacro._observeSysEvent(input, "mouseup", "onmouseup", this._on_sys_mouseup);

			nexacro._observeSysEvent(input, "focus", "onfocus", this._on_sys_focus);
			nexacro._observeSysEvent(input, "blur", "onblur", this._on_sys_blur);

			nexacro._observeSysEvent(input, "select", "onselect", this._on_sys_select);
			nexacro._observeSysEvent(input, "click", "onclick", this._on_sys_click);

			if (nexacro._SupportTouch) {
				nexacro._observeSysEvent(input, "touchstart", "ontouchstart", this._on_sys_touchstart);
				nexacro._observeSysEvent(input, "touchend", "ontouchend", this._on_sys_touchend);
			}
		}
	};

	_pInputElement._unbindSysEvent = function () {
		var input = this.handle;
		if (input) {
			nexacro._stopSysObserving(input, "keydown", "onkeydown", this._on_sys_keydown);
			nexacro._stopSysObserving(input, "keyup", "onkeyup", this._on_sys_keyup);
			nexacro._stopSysObserving(input, "keypress", "onkeypress", this._on_sys_keypress);

			if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8 && input.onpropertychange !== "undefined") {
				nexacro._stopSysObserving(input, "propertychange", "onpropertychange", this._on_sys_propertychange);
			}
			else {
				if (this._use_event_beforeinput) {
					nexacro._stopSysObserving(input, "beforeinput", "onbeforeinput", this._on_sys_beforeinput_forward);
				}

				nexacro._stopSysObserving(input, "input", "oninput", this._on_sys_keyinput_forward);
				nexacro._stopSysObserving(input, "compositionstart", "oncompositionstart", this._on_sys_compositionstart);
				nexacro._stopSysObserving(input, "compositionupdate", "oncompositionupdate", this._on_sys_compositionupdate);
				nexacro._stopSysObserving(input, "compositionend", "oncompositionend", this._on_sys_compositionend);
			}

			nexacro._stopSysObserving(input, "cut", "oncut", this._on_sys_cut);
			nexacro._stopSysObserving(input, "paste", "onpaste", this._on_sys_paste);

			nexacro._stopSysObserving(input, "mousedown", "onmousedown", this._on_sys_mousedown);
			nexacro._stopSysObserving(input, "mouseup", "onmouseup", this._on_sys_mouseup);

			nexacro._stopSysObserving(input, "focus", "onfocus", this._on_sys_focus);
			nexacro._stopSysObserving(input, "blur", "onblur", this._on_sys_blur);

			nexacro._stopSysObserving(input, "select", "onselect", this._on_sys_select);
			nexacro._stopSysObserving(input, "click", "onclick", this._on_sys_click);

			if (nexacro._SupportTouch) {
				nexacro._stopSysObserving(input, "touchstart", "ontouchstart", this._on_sys_touchstart);
				nexacro._stopSysObserving(input, "touchend", "ontouchend", this._on_sys_touchend);
			}
		}
	};

	_pInputElement._on_sys_keydown = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			var keycode = nexacro._getSysEventKey(evt);
			if (!pThis.readonly) {
				var pos = pThis.getElementCaretPos();
				pThis._composer.setDelayStatus(undefined);

				if (keycode == nexacro.KeyCode_ImeInput && nexacro._OS != "Android") {
					if (!pThis._composer.isComposing()) {
						pThis._composer.setDelayStatus(nexacro._CompositionState.START, pos.begin);
					}
					else {
						pThis._composer.setDelayStatus(nexacro._CompositionState.COMPOSING, pos.end);
					}
				}
				else {
					var is_composing = pThis._composer.isComposing();
					if (is_composing) {
						pThis._composer.setDelayStatus(nexacro._CompositionState.END, pos.end);
					}
					else {
						pThis._composer.setStatus(nexacro._CompositionState.NONE, pos.begin);
					}
				}

				if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) {
					if (input_handle.value.length > 0 && (keycode == nexacro.Event.KEY_BACKSPACE || keycode == nexacro.Event.KEY_DEL)) {
						setTimeout(function () {
							nexacro.__fireHTMLEvent(input_handle, "input", "oninput");
						}, 0);
					}
				}
			}
		}
	};

	_pInputElement._on_sys_keyup = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var keycode = nexacro._getSysEventKey(evt);
			var ctrlkey = evt.ctrlKey;

			var pThis = input_handle._linked_element;
			if (!pThis.readonly) {
				pThis._composer.setDelayStatus(undefined);

				var pos = pThis.getElementCaretPos();
				var is_composing = pThis._composer.isComposing();
				if (is_composing) {
					if (keycode == nexacro.Event.KEY_RETURN
						 || keycode == nexacro.Event.KEY_ESC
						 || (ctrlkey && keycode == 77)
						 || (ctrlkey && keycode == 90)) {
						pThis._composer.setStatus(nexacro._CompositionState.END, pos.end);

						var value = pThis._getInputValue();
						pThis._updateInputValue(value, true);
					}
				}
				if (nexacro._OS == "Android" && nexacro._Browser == "Chrome" && nexacro._BrowserVersion > "34") {
					if (pThis._beforeinput_result_pos && !pThis._composer.isComposing()) {
						var selectionStart = pThis._beforeinput_result_pos.begin;
						var selectionEnd = pThis._beforeinput_result_pos.end;

						if (selectionStart != null && selectionStart > -1) {
							if (selectionEnd == -1) {
								selectionEnd = value.length;
							}
							if (selectionEnd == null || selectionEnd < selectionStart) {
								selectionEnd = selectionStart;
							}

							var _doc = pThis._getRootWindowHandle();
							if (_doc) {
								nexacro.__setDOMNode_SetSelect(_doc, input_handle, selectionStart, selectionEnd);
							}
						}
					}
				}
			}
		}
	};

	_pInputElement._on_sys_keypress = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			var value = pThis._getInputValue();

			var charcode = evt.charCode || evt.keyCode;
			if (!evt.ctrlKey && !evt.altKey && charcode) {
				var inputChar = String.fromCharCode(charcode);
				if (inputChar.length > 0) {
					if (pThis.autoskip && pThis.maxlength > 0 && value.length >= pThis.maxlength) {
						if (nexacro._BrowserType != "Gecko") {
							pThis._go_next_focus();
						}
					}
				}
			}

			if (!pThis._use_html_maxlength) {
				if (pThis.maxlength > 0 && value.length > pThis.maxlength) {
					nexacro._stopSysEvent(evt);
					return false;
				}
			}
		}
	};

	_pInputElement._on_sys_beforeinput_forward = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			var comp = pThis.parent_elem.linkedcontrol;

			var beforeinput_data = evt.data;
			var beforeinput_type = evt.inputType;

			var input_value = pThis._getInputValue();
			var input_pos = pThis.getElementCaretPos();
			var composing_status = pThis.getCompositionStatus();
			var beginOffset = input_pos.begin;
			var endOffset = input_pos.end;


			if (beforeinput_type == "insertCompositionText") {
				pThis._composing_start = beginOffset;
				pThis._composing_end = endOffset;
			}
			pThis._beforeinput_result = comp._on_beforekeyinput(pThis, beforeinput_data, composing_status, beginOffset, endOffset, beforeinput_type);

			if (pThis._beforeinput_result) {
				pThis._beforeinput_result.forEach(function (state) {
					switch (state) {
						case pThis._BeforeinputState.PASS:
							break;
						case pThis._BeforeinputState.CANCEL:
							pThis._beforeinput_result_data = input_value;
							pThis._beforeinput_result_pos = {
								begin : null, 
								end : null
							};

							break;
						case pThis._BeforeinputState.CONVERT_UPPER:
							var caret_after_convert = endOffset + beforeinput_data.length;

							pThis._beforeinput_result_data = input_value.substring(0, beginOffset) + beforeinput_data.toUpperCase() + input_value.substring(endOffset, input_value.length);
							pThis._beforeinput_result_pos = {
								begin : caret_after_convert, 
								end : caret_after_convert
							};

							break;
						case pThis._BeforeinputState.CONVERT_LOWER:
							var caret_after_convert = endOffset + beforeinput_data.length;

							pThis._beforeinput_result_data = input_value.substring(0, beginOffset) + beforeinput_data.toLowerCase() + input_value.substring(endOffset);
							pThis._beforeinput_result_pos = {
								begin : caret_after_convert, 
								end : caret_after_convert
							};

							break;
						case pThis._BeforeinputState.MAXLENGTH:
							break;
						case pThis._BeforeinputState.REPLACE:
							break;
						default:
							break;
					}
				}, pThis);
			}
		}
	};

	_pInputElement._on_sys_propertychange = function (evt) {
		if (evt.propertyName == "value") {
			var input_handle = evt.srcElement;
			if (input_handle) {
				var ret;
				var pThis = input_handle._linked_element;

				if (pThis) {
					var select_start = pThis._selectstartpos_onprepertychange_afterupdate;
					var select_end = pThis._selectendpos_onprepertychange_afterupdate;
					if (select_start != null && select_start > -1) {
						var _doc = pThis._getRootWindowHandle();
						if (_doc) {
							nexacro.__setDOMNode_SetSelect(_doc, input_handle, select_start, select_end);
						}

						pThis._selectstartpos_onprepertychange_afterupdate = undefined;
						pThis._selectendpos_onprepertychange_afterupdate = undefined;
					}

					if (!pThis._processing_oninput) {
						var cur_status = pThis._composer.status;
						var delay_status = pThis._composer._delay_status;
						if (delay_status != null) {
							if (delay_status == nexacro._CompositionState.END) {
								pThis.setCompositionComplete();
							}
							else {
								var pos = pThis.getElementCaretPos();
								var delay_status_pos = pThis._composer._delay_status_pos;

								if (delay_status == nexacro._CompositionState.START) {
									if (delay_status_pos < 0) {
										delay_status_pos = pos.begin;
									}
									pThis._composer.setStatus(delay_status, delay_status_pos);
									pThis._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
								}
								else if (delay_status == nexacro._CompositionState.COMPOSING) {
									pThis._composer.setStatus(delay_status, pos.end);
								}
								else {
									if (delay_status_pos < 0) {
										delay_status_pos = pos.begin;
									}
									pThis._composer.setStatus(delay_status, delay_status_pos);
								}
							}
						}
						pThis._composer.setDelayStatus(undefined);

						var value = pThis._getInputValue();

						var prev_status = pThis._composer._prev_status;
						cur_status = pThis._composer.status;

						if (prev_status == cur_status && pThis.value == value) {
							return;
						}

						pThis._processing_oninput = true;
						ret = pThis._on_sys_keyinput.call(this, evt);
						pThis._processing_oninput = false;
					}
				}
				return ret;
			}
		}
	};

	_pInputElement._on_sys_keyinput_forward = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var ret;
			var pThis = input_handle._linked_element;
			if (pThis && !pThis._processing_oninput) {
				var value = pThis._getInputValue();

				var prev_status = pThis._composer._prev_status;
				var cur_status = pThis._composer.status;
				if (prev_status == cur_status) {
					if (pThis.value && pThis.value == value) {
						return;
					}

					if (!pThis.value && pThis.defaultvalue == value) {
						return;
					}
				}

				pThis._processing_oninput = true;
				ret = pThis._on_sys_keyinput.call(this, evt);
				pThis._processing_oninput = false;
			}

			return ret;
		}
	};

	if (_pInputElement._use_event_beforeinput) {
		_pInputElement._on_sys_keyinput = function (evt) {
			var input_handle = (evt.target || evt.srcElement);
			if (input_handle) {
				var pThis = input_handle._linked_element;
				var comp = pThis.parent_elem.linkedcontrol;

				var value = pThis._getInputValue();
				var pos = pThis.getElementCaretPos();
				if (pThis._beforeinput_result) {
					pThis._beforeinput_result.forEach(function (state) {
						switch (state) {
							case nexacro.InputElement.prototype._BeforeinputState.PASS:
								break;
							case nexacro.InputElement.prototype._BeforeinputState.CANCEL:
								pThis._updateInputValue(pThis._beforeinput_result_data, false, pThis._beforeinput_result_pos.begin, pThis._beforeinput_result_pos.end);
								return;
								break;
							case nexacro.InputElement.prototype._BeforeinputState.CONVERT_UPPER:
							case nexacro.InputElement.prototype._BeforeinputState.CONVERT_LOWER:
							case nexacro.InputElement.prototype._BeforeinputState.REPLACE:
								pThis._updateInputValue(pThis._beforeinput_result_data, false, pThis._beforeinput_result_pos.begin, pThis._beforeinput_result_pos.end);
								break;
						}
					}, pThis);
				}

				value = pThis._getInputValue();
				pos = pThis.getElementCaretPos();

				if (pThis._composer.isComposing()) {
					pThis._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
				}

				var old_value = pThis.value;
				pThis._updateElementValue(value);

				var prev_status = pThis._composer._prev_status;
				var cur_status = pThis._composer.status;

				if (prev_status == cur_status && pThis.value == old_value) {
					if (comp._on_input_autoskip) {
						comp._on_input_autoskip();
					}
					return;
				}

				pThis._composer._prev_status = cur_status;

				if (comp._on_keyinput) {
					comp._on_keyinput(pThis);
				}

				if (pThis.autoskip && (pThis._beforeinput_result.indexOf(nexacro.InputElement.prototype._BeforeinputState.MAXLENGTH)) > -1) {
					if (!(pThis.value && value.length > pThis.value.length)) {
						pThis._go_next_focus();
					}
				}
			}
		};
	}
	else {
		_pInputElement._on_sys_keyinput = function (evt) {
			var input_handle = (evt.target || evt.srcElement);
			if (input_handle) {
				var pThis = input_handle._linked_element;
				var comp = pThis.parent_elem.linkedcontrol;

				var composing_status = pThis._composer.status;
				var beginOffset, endOffset;

				var value = pThis._getInputValue();

				var pos = pThis.getElementCaretPos();
				if (composing_status == nexacro._CompositionState.NONE) {
					beginOffset = pThis._paste_caret_pos ? pThis._paste_caret_pos.begin : pThis._composer.startOffset;
					endOffset = pThis._paste_caret_pos ? pThis._paste_caret_pos.end : pos.end;
				}
				else {
					var offsetCompose = pThis._composer.getOffset();
					beginOffset = offsetCompose.begin;
					endOffset = offsetCompose.end;

					if (pThis._composer.isComposing()) {
						endOffset = pos.end;
					}
				}

				var bBackspace = pThis._checkBackspaceKeyInKeyInput(pThis.value, value, beginOffset, endOffset);
				var bSelect = pThis._checkSelectionInKeyInput(pThis.value, value, beginOffset, endOffset);

				if (bBackspace) {
					nexacro.__fireHTMLEvent(input_handle, "keydown", "onkeydown");
				}

				if (bSelect !== false) {
					beginOffset = bSelect;
				}

				if (comp._on_beforekeyinput) {
					comp._on_beforekeyinput(pThis, value, composing_status, beginOffset, endOffset);
					if (pThis._event_stop) {
						nexacro._stopSysEvent(evt);
						pThis._event_stop = false;
						return false;
					}
				}

				value = pThis._getInputValue();
				pos = pThis.getElementCaretPos();

				var ismax = false;
				if (pThis.maxlength > 0) {
					var caretpos = pThis._paste_caret_pos ? pThis._paste_caret_pos.end : pos.end;
					var check = pThis._checkMaxLength(value, caretpos);
					if (check) {
						ismax = check.ismax;
						var newpos = check.pos;

						if (ismax) {
							if (caretpos != newpos) {
								value = value.substring(0, newpos) + value.substring(caretpos);
								pThis._updateInputValue(value);
								pThis.setElementSetSelect(newpos, newpos);

								value = pThis._getInputValue();
								pos = pThis.getElementCaretPos();
							}

							pThis.setCompositionComplete();
						}
					}
				}

				if (pThis._composer.isComposing()) {
					pThis._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
				}

				var old_value = pThis.value;
				pThis._updateElementValue(value);

				var prev_status = pThis._composer._prev_status;
				var cur_status = pThis._composer.status;

				if (prev_status == cur_status && pThis.value == old_value) {
					if (comp._on_input_autoskip) {
						comp._on_input_autoskip();
						return;
					}
				}

				pThis._composer._prev_status = cur_status;

				if (comp._on_keyinput) {
					comp._on_keyinput(pThis);
				}

				if (pThis._event_stop) {
					nexacro._stopSysEvent(evt);
					pThis._event_stop = false;
					return false;
				}


				if (ismax && pThis.autoskip) {
					if (pThis.value && value.length > pThis.value.length) {
						ismax = false;
					}

					if (ismax) {
						if (nexacro._Browser == "Safari") {
							setTimeout(function () {
								pThis._go_next_focus();
							}, 0);
						}
						else {
							pThis._go_next_focus();
						}
					}
				}
			}
		};
	}

	_pInputElement._on_sys_cut = function () {
	};

	_pInputElement._on_sys_paste = function (evt) {
		var data;
		if (evt.clipboardData && evt.clipboardData.getData) {
			data = evt.clipboardData.getData('text/plain');
		}
		else if (window.clipboardData && window.clipboardData.getData) {
			data = window.clipboardData.getData('text');
		}

		var input_handle = (evt.target || evt.srcElement);
		if (input_handle && !input_handle._linked_element._use_event_beforeinput && data) {
			var pThis = input_handle._linked_element;
			var value = pThis._getInputValue();

			var pos = pThis.getElementCaretPos();
			var begin = pos.begin;
			var end = pos.end;

			var newvalue = value.substring(0, begin) + data + value.substring(end);
			var newpos = begin + data.length;

			pos.end = newpos;
			nexacro._stopSysEvent(evt);
			setTimeout(function () {
				pThis._paste_caret_pos = pos;
				pThis._updateInputValue(newvalue, true, newpos);
				pThis._paste_caret_pos = null;
			}, 0);

			nexacro._stopSysEvent(evt);
			return false;
		}
	};

	_pInputElement._on_sys_compositionstart = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;

			var pos = pThis.getElementCaretPos();
			pThis._composer.setStatus(nexacro._CompositionState.START, pos.begin);
		}
	};

	_pInputElement._on_sys_compositionupdate = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;

			var pos = pThis.getElementCaretPos();
			pThis._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
		}
	};

	_pInputElement._on_sys_compositionend = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;

			var value = pThis._getInputValue();
			var pos = pThis.getElementCaretPos();
			pThis._composer.setStatus(nexacro._CompositionState.END, pos.end);

			if (pThis._evtorder_compositionend_is_last) {
				setTimeout(function () {
					pThis._updateInputValue(value, true);
				}, 0);
			}
			else if (!pThis._evtfire_oninput_after_compositionend) {
				if (!nexacro._is_hangul(evt.data)) {
					pThis._updateInputValue(value, true);
				}
				else {
					pThis._on_sys_keyinput(evt);
				}
			}
			else if (pThis._use_event_beforeinput && nexacro._OS == "Android") {
				var comp = pThis.parent_elem.linkedcontrol;

				var beforeinput_data = evt.data;
				var beforeinput_type = evt.type;

				var input_value = pThis._getInputValue();
				var input_pos = pThis._composer.getOffset();

				var composing_status = pThis.getCompositionStatus();
				var beginOffset = pos.begin;
				var endOffset = pos.end;

				if (pThis._composing_start !== undefined && pThis._composing_end !== undefined) {
					beginOffset = pThis._composing_start;
				}

				if (endOffset == undefined) {
					endOffset = Math.min(beginOffset + beforeinput_data.length, pThis.maxlength);
				}
				beforeinput_data = beforeinput_data.substr(0, endOffset - beginOffset);

				input_value = input_value.substring(0, beginOffset) + input_value.substring(endOffset, Math.min(input_value.length, pThis.maxlength));

				pThis._beforeinput_result = comp._on_beforekeyinput(pThis, beforeinput_data, composing_status, beginOffset, endOffset, beforeinput_type);
				if (pThis._beforeinput_result) {
					pThis._beforeinput_result.forEach(function (state) {
						switch (state) {
							case pThis._BeforeinputState.PASS:
								break;
							case pThis._BeforeinputState.CANCEL:
								pThis._beforeinput_result_data = input_value;
								pThis._beforeinput_result_pos = {
									begin : null, 
									end : null
								};

								break;
							case pThis._BeforeinputState.CONVERT_UPPER:
								var caret_after_convert = endOffset;

								pThis._beforeinput_result_data = input_value.substring(0, beginOffset) + beforeinput_data.toUpperCase() + input_value.substring(endOffset, input_value.length);
								pThis._beforeinput_result_pos = {
									begin : caret_after_convert, 
									end : caret_after_convert
								};
								trace(pThis._beforeinput_result_pos.begin, pThis._beforeinput_result_pos.end);
								break;
							case pThis._BeforeinputState.CONVERT_LOWER:
								var caret_after_convert = endOffset + beforeinput_data.length;

								pThis._beforeinput_result_data = input_value.substring(0, beginOffset) + beforeinput_data.toLowerCase() + input_value.substring(endOffset);
								pThis._beforeinput_result_pos = {
									begin : caret_after_convert, 
									end : caret_after_convert
								};

								break;
							case pThis._BeforeinputState.MAXLENGTH:
								break;
							case pThis._BeforeinputState.REPLACE:
								break;
							default:
								break;
						}
					}, pThis);
				}

				pThis._on_sys_keyinput(evt);
			}
			pThis._composing_start = pThis._composing_end = undefined;

			pThis._setElementLastSelectionRange();
		}
	};

	_pInputElement._on_sys_mousedown = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle && evt.button == nexacro.InputElement.prototype.MOUSE_LBUTTON) {
			var pThis = input_handle._linked_element;
			if (pThis) {
				var sel = pThis.getElementSelectionRange();

				if (evt.ctrlKey && (sel[0] == sel[1])) {
					pThis.setElementSetSelect(0, -1);
					pThis.__prevent_sys_lbuttonup = true;
				}
				else {
					pThis._setElementLastSelectionRange();
					pThis.__prevent_sys_lbuttonup = false;
				}

				if (nexacro._BrowserType == "Edge") {
					if (!pThis._is_sys_focused && pThis.autoselect) {
						evt.preventDefault();
						nexacro.__setInputDOMNodeFocus(input_handle);
					}
				}
			}
		}
	};

	_pInputElement._on_sys_mouseup = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle && evt.button == nexacro.InputElement.prototype.MOUSE_LBUTTON) {
			var pThis = input_handle._linked_element;
			if (pThis) {
				if (pThis.__prevent_sys_lbuttonup) {
					pThis.__prevent_sys_lbuttonup = false;
					if (evt.preventDefault) {
						evt.preventDefault();
					}
					else {
						evt.returnValue = false;
					}
					return false;
				}

				var pos = pThis.getElementCaretPos();
				pThis._composer.setStatus(nexacro._CompositionState.NONE, pos.end);
			}
		}
	};

	_pInputElement._on_sys_scroll = function (evt) {
		var target = (evt.target || evt.srcElement);
		if (target) {
			if (target.nodeName == "input" || target.nodeName == "textarea") {
			}
			else if (target.nodeName == "#document") {
				var cur_win = target.defaultView || target.parentWindow;

				var scrollLeft = ('pageXOffset' in cur_win) ? cur_win.pageXOffset : target.documentElement.scrollLeft;
				var scrollTop = ('pageXOffset' in cur_win) ? cur_win.pageYOffset : target.documentElement.scrollTop;

				var focused = target.activeElement;
				if (focused && focused != target.body) {
					var pThis = focused._linked_element;
					if (!pThis) {
						return;
					}

					if (pThis._restore_scrollpos_onclick) {
						if (pThis._restore_scrollpos_timer > 0) {
							clearTimeout(pThis._restore_scrollpos_timer);
							pThis._restore_scrollpos_timer = 0;
						}

						pThis._scoll_pos = [scrollLeft, scrollTop];
						nexacro._stopSysObserving(cur_win, "scroll", "onscroll", pThis._on_sys_scroll);
					}
				}
			}
		}
	};

	_pInputElement._on_sys_focus = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;

			if (!pThis) {
				return;
			}

			pThis._is_sys_focused = true;

			var b_do_after_focus_processing = true;
			var after_focus_processing_func = function () {
				var _doc = pThis._getRootWindowHandle();
				if (pThis.autoselect && pThis.inputtype != "date") {
					pThis.__prevent_sys_lbuttonup = true;
					if (nexacro._OS == "iOS") {
						nexacro.__setDOMNode_SetSelect(_doc, input_handle, 0, pThis._getInputValue().length);
					}
					else {
						nexacro.__setDOMNode_Select(_doc, input_handle);
					}
				}
				else if (pThis._last_selection_range && !(nexacro._enableaccessibility && nexacro._accessibilitytype == 5)) {
					var sel = pThis._last_selection_range;
					nexacro.__setDOMNode_SetSelect(_doc, input_handle, sel[0], sel[1]);
				}

				if (pThis.value == null) {
					pThis._zerolength_value = undefined;
				}
				else {
					pThis._zerolength_value = "";
				}


				var pos = pThis.getElementCaretPos();
				pThis._composer.setStatus(nexacro._CompositionState.NONE, pos.begin);
			};

			if (b_do_after_focus_processing) {
				after_focus_processing_func();
			}
		}
	};

	_pInputElement._on_sys_blur = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			if (pThis) {
				pThis._is_sys_focused = false;
				pThis._restore_scrollpos_onclick = false;

				if (pThis._restore_scrollpos_timer > 0) {
					clearTimeout(pThis._restore_scrollpos_timer);
					pThis._restore_scrollpos_timer = 0;
				}

				var cur_doc = pThis._getRootWindowHandle();
				if (cur_doc) {
					var cur_win = cur_doc.defaultView || cur_doc.parentWindow;
					nexacro._stopSysObserving(cur_win, "scroll", "onscroll", pThis._on_sys_scroll);
				}
			}
		}
	};

	_pInputElement._on_sys_select = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			if (pThis) {
				if (pThis._is_focused) {
					pThis._setElementLastSelectionRange(pThis.getElementSelectionRange());
				}
			}
		}
	};

	_pInputElement._on_sys_click = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			if (pThis) {
				pThis._scrollintoview_on_sys_click();
			}
		}
	};

	_pInputElement._on_sys_touchstart = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			if (pThis) {
				if (pThis.inputtype == "date" && pThis.readonly) {
					nexacro._stopSysEvent(evt);
					return false;
				}
			}
		}
	};

	_pInputElement._on_sys_touchend = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			if (pThis) {
				var pos = pThis.getElementCaretPos();
				pThis._composer.setStatus(nexacro._CompositionState.NONE, pos.end);
			}
		}
	};

	_pInputElement._on_sys_touchmove = nexacro._emptyFn;


	if (_pInputElement._evtfire_oninput_only_when_backspacekey) {
		_pInputElement._checkBackspaceKeyInKeyInput = function (old_value, value, begin, end) {
			var ret = false;

			var old_pos = this._composer.getOffset();

			if (old_value) {
				if (old_value.length > value.length) {
					var range = this.getElementSelectionRange();
					var pos = this.getElementCaretPos();

					if (end < old_pos.end) {
						var idx = old_value.substring(0, end).indexOf(value.substring(0, end));

						if (idx == 0) {
							ret = true;
						}
					}
				}
			}
			return ret;
		};

		_pInputElement._checkSelectionInKeyInput = function (old_value, value, begin, end) {
			var ret = false;

			if (end - begin != 1) {
				if (old_value && old_value.length == begin) {
					if (begin != end) {
						ret = true;
						for (var i = 0; i < old_value.length; i++) {
							if (old_value.charAt(i) != value.charAt(i)) {
								ret = i;
								break;
							}

							if (i == end) {
								ret = i;
								break;
							}
						}
					}
				}
			}
			return ret;
		};
	}
	else {
		_pInputElement._checkBackspaceKeyInKeyInput = function () {
			return false;
		};
		_pInputElement._checkSelectionInKeyInput = function () {
			return false;
		};
	}


	_pInputElement = null;

	nexacro.TextAreaElement = function (parent_elem, id) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.id = id;
		this.name = this.parent_elem.name + ":" + (id || "input");

		this._composer = new nexacro._CompositionState();
	};

	var _pTextAreaElement = new nexacro._createPrototype(nexacro.InputElement, nexacro.TextAreaElement);
	nexacro.TextAreaElement.prototype = _pTextAreaElement;

	_pTextAreaElement._type_name = "TextAreaElement";
	_pTextAreaElement.typeselector = "nexatextarea";

	_pTextAreaElement.usemultiline = true;
	_pTextAreaElement._use_html_maxlength = false;

	if (nexacro._BrowserType == "Edge") {
		_pTextAreaElement._BROWSER_SCROLLBAR_SIZE = 12;
	}
	else if (nexacro._BrowserType == "WebKit" || nexacro._BrowserType == "Opera") {
		_pTextAreaElement._BROWSER_SCROLLBAR_SIZE = 0;
	}
	else if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
		_pTextAreaElement._BROWSER_SCROLLBAR_SIZE = 17;
	}
	else {
		_pTextAreaElement._BROWSER_SCROLLBAR_SIZE = undefined;
	}


	_pTextAreaElement._createElementHandle = function (owner_elem, _doc) {
		var handle = this.handle = _doc.createElement("textarea");
		var handle_style = handle.style;

		handle.id = this.name;
		nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());
		nexacro.__setTextAreaDOMStyle_AbsoluteTransparent(handle.style);
		handle._linked_element = this;

		this._refreshCommonStyleProps(handle_style);

		var wordWrap = this.wordWrap || this._wordwrap_info;
		if (wordWrap) {
			nexacro.__setTextAreaDOMNode_WordWrap(handle, wordWrap);
		}

		if (this.textAlign) {
			nexacro.__setDOMStyle_textAlign(handle_style, this.textAlign);
		}

		if (this.padding) {
			nexacro.__setDOMStyle_PaddingObject(handle_style, this.padding);
		}

		if (!this.enable) {
			nexacro.__setDOMNode_Enable(handle, false);
		}

		if (this.readonly) {
			nexacro.__setDOMNode_ReadOnly(handle, true);
		}

		if (this.value) {
			nexacro.__setDOMNode_Value(handle, this.value);
		}
		else if (this.displaynulltext) {
			nexacro.__setDOMNode_Value(handle, this.displaynulltext);
		}

		if (this.imemode) {
			nexacro.__setDOMNode_ImeMode(handle, this.imemode);
		}

		if (this.maxlength > 0 && this._use_html_maxlength) {
			nexacro.__setDOMNode_MaxLength(handle, this.maxlength);
		}

		if (this.handle) {
			nexacro.__appendDOMNode(owner_elem.dest_handle, this.handle);
		}
	};

	_pTextAreaElement._destroyInputHandle = function () {
		if (this.handle) {
			var dest_handle = (this.owner_elem ? this.owner_elem.dest_handle : null);
			this.handle._linked_element = null;

			nexacro.__removeDOMNode(dest_handle, this.handle);

			this.handle = null;
		}
	};

	_pTextAreaElement.createCommand = function () {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this._created) {
			this.owner_elem = owner_elem;

			var handle_style = this._getCommonStyleStr();
			handle_style += nexacro.__getTextAreaHTMLStyle_AbsoluteTransparent();

			if (!this.enable) {
				handle_style += nexacro.__getHTMLStyle_Enable(this.enable, this._disabled_color);
			}
			if (this.imemode) {
				handle_style += nexacro.__getHTMLStyle_ImeMode(this.imemode);
			}
			if (this.padding) {
				handle_style += nexacro.__getHTMLStyle_PaddingObject(this.padding);
			}
			if (this.textAlign) {
				handle_style += nexacro.__getHTMLStyle_textAlign(this.textAlign);
			}
			if (this.imemode) {
				if (this._imedisable) {
					handle_style += nexacro.__getHTMLStyle_ImeMode("disabled");
				}
				else {
					handle_style += nexacro.__getHTMLStyle_ImeMode(this.imemode);
				}
			}

			var attr_str = nexacro.__getHTMLAttr_Enable(this.enable) + 
				nexacro.__getHTMLAttr_Wrap(this.wordWrap || this._wordwrap_info) + 
				nexacro.__getHTMLAttr_ReadOnly(this.readonly);
			if (this.maxlength > 0 && this._use_html_maxlength) {
				attr_str += nexacro.__getHTMLAttr_MaxLength(this.maxlength);
			}

			var str = "<textarea id='" + this.name + "' class='nexatextarea' ";
			str += (handle_style) ? (" style='" + handle_style + "'") : "";
			str += attr_str ? (" " + attr_str) + ">" : ">";
			if (this.value) {
				str += nexacro._encodeXml(this.value);
			}
			else if (this.displaynulltext) {
				str += nexacro._encodeXml(this.displaynulltext);
			}
			else {
				str += "";
			}

			str += "</textarea>";

			return str;
		}

		return "";
	};

	if ((nexacro._Browser == "IE" && nexacro._BrowserVersion < 10) || nexacro._BrowserType == "IE10") {
		_pTextAreaElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				var parent_elem = this.parent_elem;
				var padding = parent_elem.padding ? parent_elem.padding : parent_elem._padding_info;
				if (padding) {
					width -= padding.left + padding.right;
					height -= padding.top + padding.bottom;
				}
				this.width = width + this._getOverflowScrollSize();
				this.height = height + this._getOverflowScrollSize();

				if (width < 0) {
					width = 0;
				}
				if (height < 0) {
					height = 0;
				}

				var input_handle = this.handle;
				if (input_handle) {
					var pos_before = this.getElementCaretPos();

					nexacro.__setDOMStyle_Size(input_handle.style, this.width, this.height);

					var pos_after = this.getElementCaretPos();
					if ((pos_before != -1 && pos_after != -1) && (pos_before.begin != pos_after.begin || pos_before.end != pos_after.end)) {
						this.setElementSetSelect(0, 0);
						this.setElementSetSelect(pos_before.begin, pos_before.end);
					}
				}
			}
		};
	}
	else {
		_pTextAreaElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width + this._getOverflowScrollSize();
				this.height = height + this._getOverflowScrollSize();

				if (width < 0) {
					width = 0;
				}
				if (height < 0) {
					height = 0;
				}

				var input_handle = this.handle;
				if (input_handle) {
					var pos_before = this.getElementCaretPos();

					nexacro.__setDOMStyle_Size(input_handle.style, this.width, this.height);

					var pos_after = this.getElementCaretPos();
					if ((pos_before != -1 && pos_after != -1) && (pos_before.begin != pos_after.begin || pos_before.end != pos_after.end)) {
						this.setElementSetSelect(0, 0);
						this.setElementSetSelect(pos_before.begin, pos_before.end);
					}
				}
			}
		};
	}

	_pTextAreaElement.setElementEnable = function (enable, color) {
		if (this.enable != enable) {
			this.enable = enable;

			if (!enable) {
				this._disabled_color = color;
			}
			else {
				this._disabled_color = null;
			}

			var input_handle = this.handle;
			if (input_handle) {
				nexacro.__setTextAreaDOMNode_Enable(input_handle, enable);
				nexacro.__setDOMStyle_ColorObject(input_handle.style, this.color);
			}
		}
	};

	_pTextAreaElement.setElementCSSMapInfo = function (wordwrap) {
		if (this._wordwrap_info != wordwrap) {
			var oldwordwrap = this.wordWrap || this._wordwrap_info;
			this._wordwrap_info = wordwrap;
			var input_handle = this.handle;
			if (input_handle) {
				if (!this.wordWrap && oldwordwrap != wordwrap) {
					nexacro.__setTextAreaDOMNode_Wrap(input_handle, wordwrap);
				}
			}
		}
	};

	_pTextAreaElement.setElementWordWrap = function (wordWrap) {
		if (this.wordWrap != wordWrap) {
			this.wordWrap = wordWrap;
			var input_handle = this.handle;

			if (input_handle) {
				nexacro.__setTextAreaDOMNode_WordWrap(input_handle, wordWrap);

				if (!this._is_focused && this.value == null && this.displaynulltext) {
					this._updateInputValue(this.displaynulltext);
				}
				else {
					this._updateInputValue(this.getElementText());
				}
			}
		}
	};

	_pTextAreaElement.setElementValue = function (value) {
		if (value) {
			value = value.replace(/\r\n/g, "\n");
		}

		nexacro.InputElement.prototype.setElementValue.call(this, value);
	};

	_pTextAreaElement.updateElementText = function (value, caretpos) {
		if (value) {
			value = value.replace(/\r\n/g, "\n");
		}

		nexacro.InputElement.prototype.updateElementText.call(this, value, caretpos);
	};

	_pTextAreaElement._updateElementValue = function (value) {
		if (value) {
			value = value.replace(/\r\n/g, "\n");
		}

		nexacro.InputElement.prototype._updateElementValue.call(this, value);
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
		_pTextAreaElement._getInputValue = function () {
			var value = nexacro.InputElement.prototype._getInputValue.call(this);
			if (value) {
				return value.replace(/\r\n/g, "\n");
			}
			return value;
		};
	}
	else {
		_pTextAreaElement._getInputValue = function () {
			return nexacro.InputElement.prototype._getInputValue.call(this);
		};
	}

	_pTextAreaElement.setElementInputType = function (type, bImedisable) {
		var input_handle = this.handle;
		var new_handle;

		if (this._imedisable != bImedisable) {
			this._imedisable = bImedisable ? bImedisable : false;
			if (input_handle) {
				nexacro.__setDOMNode_ImeMode(input_handle, this._imedisable ? "disabled" : this.imemode);
			}
		}
	};

	_pTextAreaElement.setElementSetSelect = function (start, end) {
		var input_handle = this.handle;
		if (input_handle) {
			var value = this._getInputValue();
			end = (typeof end == 'number') ? (end == -1 ? value.length : end) : start;

			this._setElementLastSelectionRange([start, end]);

			if (this._is_focused) {
				nexacro.__setTextAreaDOMNodeSetSelect(this._getRootWindowHandle(), input_handle, start, end);
			}
		}
	};

	_pTextAreaElement.getElementCaretPos = function () {
		var input_handle = this.handle;
		if (input_handle && this._is_focused) {
			var _doc = this._getRootWindowHandle();
			if (_doc) {
				return nexacro.__getTextAreaDOMNodeCaretPos(_doc, input_handle);
			}
		}
		return -1;
	};

	_pTextAreaElement.getElementSelectionRange = function () {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused && this._last_selection_range) {
				return this._last_selection_range;
			}

			var _doc = this._getRootWindowHandle();
			if (_doc) {
				var sel = nexacro.__getTextAreaDOMNodeSelectionRange(_doc, input_handle);
				return sel.slice(0, 2);
			}
		}
		return [0, 0];
	};

	_pTextAreaElement.getElementCaretLine = function () {
		var input_handle = this.handle;
		if (input_handle && this._is_focused) {
			var _doc = this._getRootWindowHandle();
			if (_doc) {
				return nexacro.__getTextAreaDOMNodeCaretLine(_doc, input_handle, this.wordWrap, this.font);
			}
		}
		return 0;
	};

	_pTextAreaElement.getElementTextLineCount = function (withwrap) {
		var input_handle = this.handle;
		if (input_handle) {
			var _doc = this._getRootWindowHandle();
			if (_doc) {
				var wordWrap = withwrap ? this.wordWrap : "none";
				return nexacro.__getTextAreaDOMNodeTextLineCount(_doc, input_handle, input_handle.value, wordWrap, this.font);
			}
		}
		return 0;
	};

	_pTextAreaElement.isFirstCaretLine = function () {
		var input_handle = this.handle;
		if (input_handle && this._is_focused) {
			var _doc = this._getRootWindowHandle();
			if (_doc) {
				var sel = nexacro.__getTextAreaDOMNodeSelectionRange(_doc, input_handle);

				var start = sel[0], end = sel[1], direction = sel[2];
				var text = this._getInputValue();

				if (direction == "none" || direction == "backward") {
					text = text.slice(0, start);
				}
				else {
					text = text.slice(0, end);
				}

				if (text == "") {
					return true;
				}

				if (/[\r\n]/g.test(text)) {
					return false;
				}

				var lines = nexacro.__getTextAreaDOMNodeTextLineCount(_doc, input_handle, text, this.wordWrap, this.font);
				if (lines <= 1) {
					return true;
				}
			}
		}
		return false;
	};

	_pTextAreaElement.isLastCaretLine = function () {
		var input_handle = this.handle;
		if (input_handle && this._is_focused) {
			var _doc = this._getRootWindowHandle();
			if (_doc) {
				var sel = nexacro.__getTextAreaDOMNodeSelectionRange(_doc, input_handle);

				var end, direction = sel[2];
				var text = this._getInputValue();

				var remain_text;
				if (direction == "backward") {
					end = sel[0];
				}
				else {
					end = sel[1];
				}

				remain_text = text.slice(end);
				if (remain_text == "") {
					return true;
				}

				if (/[\r\n]/g.test(remain_text)) {
					return false;
				}

				var newline = text.lastIndexOf('\n');
				if (newline < 0) {
					newline = text.lastIndexOf('\r');
				}
				if (newline >= 0) {
					newline += 1;
				}
				else {
					newline = 0;
				}

				var full_text = text.slice(newline);
				var full_lines = nexacro.__getTextAreaDOMNodeTextLineCount(_doc, input_handle, full_text, this.wordWrap, this.font);

				var prev_text = text.slice(newline, end);
				var prev_lines = nexacro.__getTextAreaDOMNodeTextLineCount(_doc, input_handle, prev_text, this.wordWrap, this.font);

				if (full_lines == prev_lines) {
					return true;
				}
			}
		}
		return false;
	};

	_pTextAreaElement.setElementScrollPos = function (hpos, vpos) {
		if (hpos < 0) {
			hpos = 0;
		}
		if (vpos < 0) {
			vpos = 0;
		}

		this.setElementHScrollPos(hpos);
		this.setElementVScrollPos(vpos);
	};

	_pTextAreaElement.getElementHScrollPos = function () {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused && this.value == null && this.displaynulltext) {
				return 0;
			}

			return input_handle.scrollLeft;
		}
		return 0;
	};

	_pTextAreaElement.setElementHScrollPos = function (v) {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused && this.value == null && this.displaynulltext) {
				return;
			}

			input_handle.scrollLeft = v;
		}
	};

	_pTextAreaElement.getElementVScrollPos = function () {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused && this.value == null && this.displaynulltext) {
				return 0;
			}

			return input_handle.scrollTop;
		}
		return 0;
	};

	_pTextAreaElement.setElementVScrollPos = function (v) {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused && this.value == null && this.displaynulltext) {
				return;
			}

			input_handle.scrollTop = v;
		}
	};

	_pTextAreaElement.getElementScrollWidth = function () {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused && this.value == null && this.displaynulltext) {
				return input_handle.clientWidth;
			}

			return input_handle.scrollWidth;
		}
		return 0;
	};

	_pTextAreaElement.getElementScrollHeight = function () {
		var input_handle = this.handle;
		if (input_handle) {
			if (!this._is_focused && this.value == null && this.displaynulltext) {
				return input_handle.clientHeight;
			}

			if (input_handle.clientHeight > input_handle.scrollHeight) {
				return input_handle.clientHeight;
			}
			else {
				return input_handle.scrollHeight;
			}
		}
		return 0;
	};

	_pTextAreaElement._getOverflowScrollSize = function () {
		if (this._BROWSER_SCROLLBAR_SIZE === undefined) {
			nexacro.TextAreaElement.prototype._BROWSER_SCROLLBAR_SIZE = nexacro.__getOverflowScrollSize();
		}
		return this._BROWSER_SCROLLBAR_SIZE;
	};

	_pTextAreaElement._bindSysEvent = function () {
		var input = this.handle;
		if (input) {
			nexacro.InputElement.prototype._bindSysEvent.call(this);
			nexacro._observeSysEvent(input, "scroll", "onscroll", this._on_sys_scroll);
		}
	};

	_pTextAreaElement._unbindSysEvent = function () {
		var input = this.handle;
		if (input) {
			nexacro.InputElement.prototype._unbindSysEvent.call(this);
			nexacro._stopSysObserving(input, "scroll", "onscroll", this._on_sys_scroll);
		}
	};

	_pTextAreaElement._on_sys_scroll = function (evt) {
		var input_handle = (evt.target || evt.srcElement);
		if (input_handle) {
			var pThis = input_handle._linked_element;
			if (pThis) {
				var parent_elem = pThis.parent_elem;
				var comp = parent_elem.linkedcontrol;
				var _win = comp._getWindow();

				var evtid = "";
				var scrolltype = parent_elem._scrolltype;

				var pos = pThis.getElementCaretPos();

				var bWheel = false;
				var bResetPos = false;
				var bScroll = false;
				if (_win && (_win._cur_ldown_elem || _win._cur_mdown_elem)) {
					if (_win._cur_mdown_elem) {
						bWheel = true;
					}
					bResetPos = true;
				}
				else if (nexacro._isTouchInteraction) {
					if (_win && _win._cur_touch_elem || (pos && pos != -1 && pos.begin != pos.end)) {
						bResetPos = true;
					}
				}

				if (bResetPos) {
					var hscroll_pos = parent_elem.scroll_top;
					var vscroll_pos = parent_elem.scroll_left;

					if (hscroll_pos != input_handle.scrollLeft) {
						if (scrolltype != "none" && scrolltype != "vertical" && !comp._is_tracking) {
							hscroll_pos = input_handle.scrollLeft;
							bScroll = true;
						}
						if (bWheel) {
							evtid = "mousewheel_h";
						}
					}

					if (vscroll_pos != input_handle.scrollTop) {
						if (scrolltype != "none" && scrolltype != "horizontal" && !comp._is_tracking) {
							vscroll_pos = input_handle.scrollTop;
							bScroll = true;
						}
						if (bWheel) {
							evtid = "mousewheel_v";
						}
					}

					if (bScroll) {
						comp._scrollTo(hscroll_pos, vscroll_pos, true, false, undefined, evtid);
					}
				}
			}
		}
	};

	_pTextAreaElement = null;

	nexacro.ControlElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
	};

	var _pControlElement = nexacro._createPrototype(nexacro.Element, nexacro.ControlElement);
	nexacro.ControlElement.prototype = _pControlElement;
	_pControlElement._type_name = "ControlElement";

	_pControlElement.enable = true;
	_pControlElement.tabindex = -1;
	_pControlElement.zindex = -1;

	_pControlElement.color = null;
	_pControlElement.font = null;
	_pControlElement.textDecoration = null;

	_pControlElement.borderRadius = null;
	_pControlElement.border = null;
	_pControlElement.background = null;
	_pControlElement.edge = null;

	_pControlElement.padding = null;

	_pControlElement.cursor = null;
	_pControlElement.opacity = null;
	_pControlElement.boxShadow = null;

	_pControlElement.position_step = undefined;
	_pControlElement.linkedcontrol = null;

	_pControlElement.inner_width = 0;
	_pControlElement.inner_height = 0;
	_pControlElement.client_left = 0;
	_pControlElement.client_top = 0;
	_pControlElement.client_width = 0;
	_pControlElement.client_height = 0;

	_pControlElement._client_left = 0;
	_pControlElement._client_top = 0;

	_pControlElement._classname = "";

	_pControlElement._is_popup = false;
	_pControlElement.zoom = 100;

	_pControlElement._edge_elem = null;
	_pControlElement._apply_client_padding = true;
	_pControlElement._border_info = null;
	_pControlElement._padding_info = null;
	_pControlElement._edge_info = null;

	_pControlElement.accessibilityrole = "";
	_pControlElement.accessibilityenable = true;
	_pControlElement.accessibilitylabel = "";
	_pControlElement.accessibilitydesclevel = "";
	_pControlElement.accessibilitydescription = "";
	_pControlElement.accessibilityaction = "";
	_pControlElement.accessibility_value = undefined;
	_pControlElement.accessibility_stat_disabled = undefined;
	_pControlElement.accessibility_stat_hidden = undefined;
	_pControlElement.accessibility_stat_checked = undefined;
	_pControlElement.accessibility_stat_pressed = undefined;
	_pControlElement.accessibility_stat_selected = undefined;
	_pControlElement.accessibility_stat_expanded = undefined;
	_pControlElement.accessibility_stat_autocomplete = undefined;
	_pControlElement.accessibility_flag_haspopup = undefined;
	_pControlElement.accessibility_flag_focusable = undefined;
	_pControlElement.accessibility_flag_readonly = undefined;
	_pControlElement.accessibility_flag_password = undefined;
	_pControlElement.accessibility_flag_multiselectable = undefined;
	_pControlElement.accessibility_flag_selectable = undefined;
	_pControlElement.accessibility_flag_defaultbutton = undefined;
	_pControlElement.accessibility_prop_itemcount = undefined;
	_pControlElement.accessibility_prop_itemindex = undefined;
	_pControlElement.accessibility_prop_valuemax = undefined;
	_pControlElement.accessibility_prop_valuemin = undefined;

	_pControlElement.create = nexacro._emptyFn;
	_pControlElement.destroy = nexacro._emptyFn;
	_pControlElement.clearContents = nexacro._emptyFn;

	_pControlElement.setElementStepCount = nexacro._emptyFn;
	_pControlElement.setElementStepIndex = nexacro._emptyFn;

	_pControlElement.borderLeftNone = false;
	_pControlElement.borderTopNone = false;
	_pControlElement.borderRightNone = false;
	_pControlElement.borderBottomNone = false;

	_pControlElement.create = function (win) {
		if (!this._is_popup) {
			var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && owner_elem.handle) {
				if (!this.handle) {
					this.owner_elem = owner_elem;
					var _doc = win._doc || owner_elem._getRootWindowHandle();

					var handle = _doc.createElement("div");
					handle.id = this.name;
					handle._linked_element = this;


					this.handle = this.dest_handle = handle;
					nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

					if (!this._is_simple_control) {
						var inner_node = _doc.createElement("div");
						this.dest_handle = inner_node;
						nexacro.__setDOMNode_ClassName(inner_node, "nexasimplecontainer");
						nexacro.__setDOMNode_Id(inner_node, "", "nexacontainer");

						nexacro.__appendDOMNode(handle, inner_node);

						var innernodestyle = inner_node.style;
						nexacro.__setDOMStyle_Pos(innernodestyle, this.client_left, this.client_top);
						if (this.client_width && this.client_height) {
							nexacro.__setDOMStyle_Size(innernodestyle, this.client_width, this.client_height);
						}
					}
					var handle_style = handle.style;
					nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
					nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);


					this._refreshControl(handle, handle_style, _doc);

					if (this.direction) {
						nexacro.__setDOMStyle_Direction(handle_style, this.direction);
					}

					nexacro.__appendDOMNode((this._is_nc_element) ? owner_elem.handle : owner_elem.dest_handle, handle);
				}
			}
		}
		else {
			var _doc = this._doc = win._doc;
			var owner_elem = win;

			var handle = _doc.createElement("div");
			var linkedcontrol = this.linkedcontrol;

			handle._linked_element = this;
			handle.id = this.name;

			this.handle = this.dest_handle = handle;
			nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

			var handle_style = handle.style;
			nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
			nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);

			if (linkedcontrol._findOwnerElementHandle) {
				var owner_elem_info = linkedcontrol._findOwnerElementHandle();
				if (owner_elem_info.is_append) {
					if (owner_elem_info.ref_handle) {
						nexacro.__appendDOMNode(owner_elem_info.ref_handle, handle);
					}
					else {
						nexacro.__appendDOMNode(owner_elem_info.owner_handle, handle);
					}
				}
				else {
					owner_elem_info.owner_handle.insertBefore(handle, owner_elem_info.ref_handle);
				}
				this.owner_elem = owner_elem_info.owner_handle._linked_element;
			}
			else {
				nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
				this.owner_elem = owner_elem;
			}

			this._refreshControl(handle, handle_style, _doc);

			this._frame_node = nexacro._createFrameNode(handle, this.left, this.top, _doc);
		}
	};
	_pControlElement._getControlStatusStr = function () {
		var str = "";
		if (this.status) {
			str += nexacro.__getHTMLAttr_Status(this.status);
		}

		if (this.userstatus) {
			str += nexacro.__getHTMLAttr_UserStatus(this.userstatus);
		}
		return str;
	};

	_pControlElement.createCommandStart = function () {
		if (!this._is_popup) {
			var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this.handle) {
				this.owner_elem = owner_elem;
				var str = "<div id='" + this.name + "' class='" + this._getElementClassName() + "' tabindex ='" + this.tabindex + "' ";
				if (this.tooltiptext) {
					if (nexacro._AccessibilityUtil.isUseTooltipText()) {
						str += " title = '" + this.tooltiptext + "' ";
					}
				}

				var acc_str = this._getAccessibilityInfoStr();
				var style_str = this._getControlStyleStr();
				var status_str = this._getControlStatusStr();

				str += status_str ? (" " + status_str) : "";
				str += style_str ? (" style='" + style_str + "'") : "";
				str += acc_str ? (" " + acc_str + ">") : ">";

				var edge_elem = this._edge_elem;
				if (edge_elem) {
					str += edge_elem.createCommand();
				}

				if (this._client_elem && !this._is_popup) {
					str += this._client_elem.createCommandStart();
				}
				else if (!this._is_simple_control) {
					style_str = "";
					if (this.client_left || this.client_top) {
						style_str += nexacro.__getHTMLStyle_Pos(this.client_left, this.client_top);
					}
					if (this.client_width && this.client_height) {
						style_str += nexacro.__getHTMLStyle_Size(this.client_width, this.client_height);
					}
					str += "<div class='nexasimplecontainer' id='nexacontainer' ";
					str += style_str ? (" style='" + style_str + "' >") : " >";
				}

				return str;
			}
		}
		return "";
	};

	_pControlElement._on_createCommandEnd = function () {
		return "";
	};

	_pControlElement.createCommandEnd = function () {
		if (!this._is_popup) {
			var str = "";
			if (this._client_elem && !this._is_popup) {
				str = this._client_elem.createCommandEnd();
			}
			else if (!this._is_simple_control) {
				str += "</div>";
			}

			str += this._on_createCommandEnd();
			str += "</div>";
			return str;
		}
		return "";
	};

	_pControlElement._on_attachHandle = nexacro._emptyFn;
	_pControlElement.attachHandle = function (win) {
		if (this.name && !this.handle) {
			var handle = win._doc.getElementById(this.name);
			if (handle) {
				handle._linked_element = this;

				if (this._is_simple_control) {
					this.handle = this.dest_handle = handle;
				}
				else if (this._client_elem) {
					this.handle = this.dest_handle = handle;
					this._client_elem.attachHandle(win);
				}
				else {
					this.handle = handle;
					this.dest_handle = handle.lastChild;
				}

				var edge_elem = this._edge_elem;
				if (edge_elem) {
					edge_elem.attach_handle_fromparent(handle);
				}

				this._setAccessibility_notify();

				this._on_attachHandle(win);
			}
		}
	};

	_pControlElement._on_destroy = nexacro._emptyFn;

	_pControlElement.destroy = function () {
		var handle = this.handle;
		if (handle) {
			this._removeElementHandle();
			this.dest_handle = null;

			if (this._is_popup) {
				nexacro._destroyFrameNode(handle, this._frame_node);
				this._frame_node = null;
			}
			if (this._edge_elem) {
				this._edge_elem.destroy();
				this._edge_elem = null;
			}

			if (this._client_elem) {
				this._client_elem.destroy();
				this._client_elem = null;
			}

			this._on_destroy();
		}
		this.owner_elem = null;
		this.handle = null;
		this.parent = null;
		this.parent_elem = null;
		this.linkedcontrol = null;
	};

	_pControlElement.initElementInfo = function () {
		var control = this.linkedcontrol;

		this._is_simple_control = control._is_simple_control;
		this._is_popup = control._is_popup_control;

		this._use_translate_move = (control._use_translate_move === false) ? control._use_translate_move : nexacro._use_translate_scroll;
		this._use_container_move = control._use_container_move;

		this._apply_client_padding = control._apply_client_padding;
	};

	_pControlElement.setLinkedControl = function (control) {
		if (!this.linkedcontrol && control) {
			this.parent = control;
			this.linkedcontrol = control;
			this.id = control.id;
			this.name = control._unique_id;
		}
	};

	_pControlElement.setElementPositionStep = function (position_step) {
		if (this.position_step != position_step || position_step == -1) {
			this.position_step = position_step;

			var handle = this.handle;
			if (handle && this.parent_elem) {
				var old_owner_elem = this.owner_elem;
				var owner_elem = this.parent_elem.getContainerElement(position_step);
				if (old_owner_elem && old_owner_elem.dest_handle && owner_elem && owner_elem.dest_handle) {
					nexacro.__unlinkDOMNode(old_owner_elem.dest_handle, this.handle);
					nexacro.__appendDOMNode(owner_elem.dest_handle, this.handle);
					this.owner_elem = owner_elem;
				}
			}
		}
	};

	_pControlElement._on_clearContents = nexacro._emptyFn;
	_pControlElement.clearContents = function () {
		if (this.handle && this._client_elem) {
			this._client_elem.clearContents();
			this._on_clearContents();
		}
	};

	_pControlElement.appendChildElement = function (child_elem) {
		if (this.handle) {
			if (child_elem.parent_elem != this) {
				child_elem.parent_elem = this;
			}

			if (!child_elem.handle) {
				child_elem.create(this._getWindow());
			}
			else {
				child_elem._appendToContainer(this.getContainerElement(child_elem.position_step));
			}
		}
	};

	_pControlElement.removeChildElement = function (child_elem) {
		if (child_elem.parent_elem == this) {
			child_elem._removeFromContainer();
		}
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
		_pControlElement._getComputedStyle = function (prop) {
			var handle = this.handle;
			if (handle && prop) {
				return handle.currentStyle(prop);
			}
		};

		_pControlElement._getComputedStyleBackgroundColor = function () {
			var handle = this.handle;
			if (handle) {
				return handle.currentStyle["backgroundColor"];
			}
		};
	}
	else {
		_pControlElement._getComputedStyle = function (prop) {
			var handle = this.handle;
			if (handle && prop) {
				var style = window.getComputedStyle(handle, null);
				return style.getPropertyValue(prop);
			}
		};

		_pControlElement._getComputedStyleBackgroundColor = function () {
			var handle = this.handle;
			if (handle) {
				var style = window.getComputedStyle(handle, null);
				return style.getPropertyValue("background-color");
			}
		};
	}

	_pControlElement._getComputedStyleSubValue = nexacro._emptyFn;




	_pControlElement._sendToBackElement = function (elem) {
		if (elem && elem.owner_elem == this && elem.handle) {
			nexacro.__sendDOMNodeToBack(elem.handle);
		}
	};
	_pControlElement._bringToFrontElement = function (elem) {
		if (elem && elem.owner_elem == this && elem.handle) {
			nexacro.__bringDOMNodeToFront(elem.handle);
		}
	};
	_pControlElement._moveToNextElement = function (elem, base_elem) {
		if (elem && base_elem && elem.owner_elem == this && base_elem.owner_elem == this && elem.handle && base_elem.handle) {
			nexacro.__moveDOMNodeToNext(elem.handle, base_elem.handle);
		}
	};
	_pControlElement._moveToPrevElement = function (elem, base_elem) {
		if (elem && base_elem && elem.owner_elem == this && base_elem.owner_elem == this && elem.handle && base_elem.handle) {
			nexacro.__moveDOMNodeToPrev(elem.handle, base_elem.handle);
		}
	};

	_pControlElement.sendToBackElement = function (elem) {
		var client_elem = this.getContainerElement(elem.position_step);
		client_elem._sendToBackElement(elem);
	};

	_pControlElement.bringToFrontElement = function (elem) {
		var client_elem = this.getContainerElement(elem.position_step);
		client_elem._bringToFrontElement(elem);
	};

	_pControlElement.moveToNextElement = function (elem, base_elem) {
		var client_elem = this.getContainerElement(elem.position_step);
		client_elem._moveToNextElement(elem, base_elem);
	};

	_pControlElement.moveToPrevElement = function (elem, base_elem) {
		var client_elem = this.getContainerElement(elem.position_step);
		client_elem._moveToPrevElement(elem, base_elem);
	};



	_pControlElement.saveToImageFile = nexacro._emptyFn;
	_pControlElement.saveToImageObject = nexacro._emptyFn;


	_pControlElement._setElementHScrollPos = function (hpos) {
		var handle = this.handle;
		if (handle) {
			nexacro.__setDOMNode_HScrollPos(handle, hpos);
		}
	};

	_pControlElement._setElementVScrollPos = function (vpos) {
		var handle = this.handle;
		if (handle) {
			nexacro.__setDOMNode_VScrollPos(handle, vpos);
		}
	};
	_pControlElement._setElementScrollPos = function (hpos, vpos) {
		var handle = this.handle;
		if (handle) {
			nexacro.__setDOMNode_Offset(handle, hpos, vpos);
		}
	};

	_pControlElement.setElementHScrollPos = function (hpos) {
		if (hpos < 0) {
			hpos = 0;
		}
		if (hpos > this.hscroll_limit) {
			hpos = this.hscroll_limit;
		}

		if (this.scroll_left != hpos || this._reset_scrollpos) {
			this.scroll_left = hpos;
			if (this._use_container_move) {
				this._client_elem._setElementHScrollPos(hpos);
			}

			if (this.linkedcontrol) {
				this.linkedcontrol._setHscrollPos(hpos);
			}
		}
	};

	_pControlElement.setElementVScrollPos = function (vpos) {
		if (vpos < 0) {
			vpos = 0;
		}
		if (vpos > this.vscroll_limit) {
			vpos = this.vscroll_limit;
		}
		if (this.scroll_top != vpos || this._reset_scrollpos) {
			this.scroll_top = vpos;
			if (this._use_container_move) {
				this._client_elem._setElementVScrollPos(vpos);
			}

			if (this.linkedcontrol) {
				this.linkedcontrol._setVscrollPos(vpos);
			}
		}
	};

	_pControlElement.setElementScrollPos = function (hpos, vpos) {
		if (hpos < 0) {
			hpos = 0;
		}
		if (vpos < 0) {
			vpos = 0;
		}
		if (hpos > this.hscroll_limit) {
			hpos = this.hscroll_limit;
		}
		if (vpos > this.vscroll_limit) {
			vpos = this.vscroll_limit;
		}

		if (this.scroll_left != hpos || this.scroll_top != vpos) {
			this.scroll_left = hpos;
			this.scroll_top = vpos;
			if (this._use_container_move) {
				this._client_elem._setElementScrollPos(hpos, vpos);
			}

			if (this.linkedcontrol) {
				this.linkedcontrol._setHscrollPos(hpos);
				this.linkedcontrol._setVscrollPos(vpos);
			}
		}
	};

	_pControlElement.getElementScrollLeft = function () {
		return 0;
	};
	_pControlElement.getElementScrollTop = function () {
		return 0;
	};

	_pControlElement.getElementScrollWidth = function () {
		return this.inner_width;
	};
	_pControlElement.getElementScrollHeight = function () {
		return this.inner_height;
	};

	_pControlElement.beginTransitionEffect = nexacro._emptyFn;
	_pControlElement.applyTransitionEffect = nexacro._emptyFn;
	_pControlElement.cancelTransitionEffect = nexacro._emptyFn;

	_pControlElement._getElementClassName = function () {
		var classname = this.typeselector;
		if (this.idselector) {
			classname += " " + this.idselector;
		}

		if (this.classselector) {
			classname += " " + this.classselector;
		}

		if (this._use_translate_move) {
			classname += " nexatransform";
		}

		return classname;
	};

	_pControlElement.setElementTypeCSSSelector = function (typename) {
		if (this.typeselector != typename) {
			this.typeselector = typename;
			var handle = this.handle;
			if (handle) {
				var classname = this._getElementClassName();
				if (this._classname != classname) {
					this._classname = classname;
					nexacro.__setDOMNode_ClassName(handle, classname);
				}
			}
		}
	};

	_pControlElement.setElementClassCSSSelector = function (classname) {
		if (this.classselector != classname) {
			this.classselector = classname;

			var handle = this.handle;
			if (handle) {
				classname = this._getElementClassName();
				if (this._classname != classname) {
					this._classname = classname;
					nexacro.__setDOMNode_ClassName(handle, classname);
				}
			}
		}
	};

	_pControlElement.setElementIDCSSSelector = function (id) {
		if (this.idselector != id) {
			this.idselector = id;

			var handle = this.handle;
			if (handle) {
				var classname = this._getElementClassName();
				if (this._classname != classname) {
					this._classname = classname;
					nexacro.__setDOMNode_ClassName(handle, classname);
				}
			}
		}
	};

	_pControlElement.setElementCSSMapInfo = function (border, padding, edge) {
		var change_border = false, change_padding = false, change_edge = false;
		if (this._border_info != border) {
			this._border_info = border;
			change_border = (this.border == null);
		}

		if (this._padding_info != padding) {
			this._padding_info = padding;
			change_padding = (this.padding == null);
		}

		if (this._edge_info != edge) {
			this._edge_info = edge;
		}

		var handle = this.handle;
		var change_inner = (change_border && this._updateInnerSize());

		var create_edge = false;
		var edge_elem = this._edge_elem;
		if (edge_elem) {
			if ((this.edge && this.edge.value != "none") || (this._edge_info && this._edge_info.value != "none")) {
				if (change_inner) {
					edge_elem.setElementSize(this.inner_width, this.inner_height);
				}
				if (this.edge == null) {
					edge_elem.setElementInfo(null, edge);
				}
			}
			else {
				edge_elem.destroy();
				this._edge_elem = null;
			}
		}
		else {
			if (this.edge) {
				if (this.edge.value != "none") {
					create_edge = true;
				}
			}
			else if (this._edge_info) {
				if (this._edge_info.value != "none") {
					create_edge = true;
				}
			}

			if (create_edge) {
				edge_elem = this._edge_elem = new nexacro._EdgeImageElement(this);
				edge_elem.setElementSize(this.inner_width, this.inner_height);
				edge_elem.setElementInfo(this.edge, edge);

				if (handle) {
					edge_elem.create();
				}
			}
		}

		if (change_inner || change_padding) {
			this._updateClientRect();
		}
	};



	_pControlElement.setElementZIndex = function (zindex) {
		if (this.zindex != zindex) {
			this.zindex = zindex;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_Zindex(handle.style, zindex);
			}
		}
	};

	_pControlElement.setElementToolTip = function (tooltiptext, tooltiptype) {
		if (tooltiptext === undefined) {
			tooltiptext = "";
		}
		if (this.tooltiptext != tooltiptext || this.tooltiptype != tooltiptype) {
			this.tooltiptext = tooltiptext;
			this.tooltiptype = tooltiptype;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMNode_ToolTip(handle, tooltiptext, tooltiptype);
			}
		}
	};

	_pControlElement.setElementFocus = function (selffocus) {
		var handle = this.handle;
		if (handle) {
			nexacro.__setDOMNode_Focus(handle, selffocus);
			nexacro.__setLastFocusedElement(this);
		}
	};

	_pControlElement.setElementSize = function (width, height) {
		if (width < 0) {
			width = 0;
		}
		if (height < 0) {
			height = 0;
		}

		if (this.handle) {
			nexacro.__setDOMStyle_Size(this.handle.style, width, height);
			if (width == 0 || height == 0) {
				var border = nexacro.BorderObject("0px none");
				nexacro.__setDOMStyle_BorderObject(this.handle.style, border);
			}
			else if (this.width == 0 || this.height == 0) {
				nexacro.__setDOMStyle_BorderObject(this.handle.style, this.border);
				if (this.borderLeftNone || this.borderTopNone || this.borderRightNone || this.borderBottomNone) {
					nexacro.__setDOMStyle_BorderNone(this.handle.style, this.borderLeftNone, this.borderTopNone, this.borderRightNone, this.borderBottomNone, this.border || this._border_info);
				}
			}
		}

		this.width = width;
		this.height = height;


		if (this._updateInnerSize()) {
			this._updateClientRect();

			if (this._edge_elem) {
				this._edge_elem.setElementSize(this.inner_width, this.inner_height);
			}
		}
	};

	_pControlElement.setElementBorderRadius = function (borderRadius) {
		if (this.borderRadius != borderRadius) {
			this.borderRadius = borderRadius;
			if (this.handle) {
				nexacro.__setDOMStyle_BorderRadiusObject(this.handle.style, borderRadius);
			}
		}
	};

	_pControlElement.setElementBorder = function (border) {
		if (this.border != border) {
			this.border = border;
			if (this.handle) {
				nexacro.__setDOMStyle_BorderObject(this.handle.style, border);
			}

			if (this._updateInnerSize()) {
				this._updateClientRect();

				if (this._edge_elem) {
					this._edge_elem.setElementSize(this.inner_width, this.inner_height);
				}
			}
		}
	};

	_pControlElement.setElementBorderLeftNone = function (borderleft) {
		if (this.borderLeftNone != borderleft) {
			this.borderLeftNone = borderleft;
			if (this.handle) {
				nexacro.__setDOMStyle_BorderLeftNone(this.handle.style, borderleft);
			}

			if (this._updateInnerSize()) {
				this._updateClientRect();

				if (this._edge_elem) {
					this._edge_elem.setElementSize(this.inner_width, this.inner_height);
				}
			}
		}
	};

	_pControlElement.setElementBorderTopNone = function (bordertop) {
		if (this.borderTopNone != bordertop) {
			this.borderTopNone = bordertop;
			if (this.handle) {
				nexacro.__setDOMStyle_BorderTopNone(this.handle.style, bordertop);
			}

			if (this._updateInnerSize()) {
				this._updateClientRect();

				if (this._edge_elem) {
					this._edge_elem.setElementSize(this.inner_width, this.inner_height);
				}
			}
		}
	};

	_pControlElement.setElementBorderRightNone = function (borderright) {
		if (this.borderRightNone != borderright) {
			this.borderRightNone = borderright;
			if (this.handle) {
				nexacro.__setDOMStyle_BorderRightNone(this.handle.style, borderright);
			}

			if (this._updateInnerSize()) {
				this._updateClientRect();

				if (this._edge_elem) {
					this._edge_elem.setElementSize(this.inner_width, this.inner_height);
				}
			}
		}
	};

	_pControlElement.setElementBorderBottomNone = function (borderbottom) {
		if (this.borderBottomNone != borderbottom) {
			this.borderBottomNone = borderbottom;
			if (this.handle) {
				nexacro.__setDOMStyle_BorderBottomNone(this.handle.style, borderbottom);
			}

			if (this._updateInnerSize()) {
				this._updateClientRect();

				if (this._edge_elem) {
					this._edge_elem.setElementSize(this.inner_width, this.inner_height);
				}
			}
		}
	};

	_pControlElement.setElementBorderNone = function (borderleft, bordertop, borderright, borderbottom) {
		if (borderleft != this.borderLeftNone || bordertop != this.borderTopNone || borderright != this.borderRightNone || borderbottom != this.borderBottomNone) {
			this.borderLeftNone = borderleft;
			this.borderTopNone = bordertop;
			this.borderRightNone = borderright;
			this.borderBottomNone = borderbottom;

			if (this.handle) {
				nexacro.__setDOMStyle_BorderNone(this.handle.style, borderleft, bordertop, borderright, borderbottom, this.border || this._border_info);
			}

			if (this._updateInnerSize()) {
				this._updateClientRect();

				if (this._edge_elem) {
					this._edge_elem.setElementSize(this.inner_width, this.inner_height);
				}
			}
		}
	};

	_pControlElement.setElementBackground = function (background) {
		if (this.background != background) {
			this.background = background;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_BackgroundObject(handle.style, background);
			}
		}
	};

	_pControlElement.setElementEdge = function (edge) {
		if (this.edge != edge) {
			this.edge = edge;

			var create_edge = false;
			var edge_elem = this._edge_elem;
			if (edge_elem) {
				if (edge) {
					if (edge.value == "none") {
						edge_elem.destroy();
						this._edge_elem = null;
					}
					else {
						edge_elem.setElementInfo(edge, this._edge_info);
					}
				}
				else if (this._edge_info) {
					if (this._edge_info.value == "none") {
						edge_elem.destroy();
						this._edge_elem = null;
					}
					else {
						edge_elem.setElementInfo(null, this._edge_info);
					}
				}
				else {
					edge_elem.destroy();
					this._edge_elem = null;
				}
			}
			else {
				if (edge) {
					if (edge.value != "none") {
						create_edge = true;
					}
				}
				else if (this._edge_info) {
					if (this._edge_info.value != "none") {
						create_edge = true;
					}
				}

				if (create_edge) {
					edge_elem = this._edge_elem = new nexacro._EdgeImageElement(this);
					edge_elem.setElementSize(this.inner_width, this.inner_height);
					edge_elem.setElementInfo(edge, this._edge_info);

					if (this.handle) {
						edge_elem.create();
					}
				}
			}
		}
	};


	_pControlElement.setElementPadding = function (padding) {
		if (this.padding != padding) {
			this.padding = padding;

			if (this._apply_client_padding) {
				this._updateClientRect();
			}
		}
	};

	_pControlElement.setElementCursor = function (cursor) {
		if (this.cursor != cursor) {
			this.cursor = cursor;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_CursorObject(handle.style, cursor);
			}
		}
	};

	_pControlElement.setElementOpacity = function (opacity) {
		if (this.opacity != opacity) {
			this.opacity = opacity;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_OpacityObject(handle.style, opacity);
			}
		}
	};

	_pControlElement.setElementBoxShadow = function (boxshadow) {
		if (this.boxShadow != boxshadow) {
			this.boxShadow = boxshadow;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_ShadowObject(handle.style, boxshadow);
			}
		}
	};

	_pControlElement.setElementZoom = function (zoomfactor) {
		var handle = this.handle;
		if (handle) {
			if (zoomfactor < 0) {
				zoomfactor = 0;
			}
			this.zoom = zoomfactor;
			nexacro.__setDOMStyle_TransformScale(handle.style, zoomfactor / 100);
			this._updateClientRect();
		}
	};

	_pControlElement.setElementDisplay = function (display) {
		if (this.display != display) {
			this.display = display;
			var handle = this.handle;
			if (handle) {
				nexacro.__setDOMStyle_Display(handle.style, display);
			}
		}
	};

	_pControlElement.setElementSimpleControl = function (simplecontrol) {
		if (this._is_simple_control != simplecontrol) {
			if (this.handle) {
				if (!this._is_simple_control) {
					nexacro.__removeDOMNode(this.handle, this.dest_handle);
					this.dest_handle = this.handle;
				}
				else {
					var owner_elem = this.owner_elem;
					var _doc = owner_elem._getRootWindowHandle();
					var inner_node = _doc.createElement("div");
					this.dest_handle = inner_node;
					nexacro.__setDOMNode_ClassName(inner_node, "nexasimplecontainer");
					nexacro.__setDOMNode_Id(inner_node, "", "nexacontainer");
					nexacro.__appendDOMNode(this.handle, inner_node);

					var innernodestyle = inner_node.style;
					nexacro.__setDOMStyle_Pos(innernodestyle, this.client_left, this.client_top);
					if (this.client_width && this.client_height) {
						nexacro.__setDOMStyle_Size(innernodestyle, this.client_width, this.client_height);
					}
				}
			}

			this._is_simple_control = simplecontrol;
		}
	};

	_pControlElement.setElementHittestType = nexacro._emptyFn;
	_pControlElement.getClientLeft = function () {
		if (this._apply_client_padding && !this._is_simple_control) {
			return 0;
		}
		return this.client_left;
	};

	_pControlElement.getClientTop = function () {
		if (this._apply_client_padding && !this._is_simple_control) {
			return 0;
		}
		return this.client_top;
	};


	_pControlElement.getClientWidth = function () {
		return this.client_width;
	};

	_pControlElement.getClientHeight = function () {
		return this.client_height;
	};

	_pControlElement._updateInnerSize = function () {
		var inner_width = this.width;
		var inner_height = this.height;

		var border = this.border || this._border_info;

		if (border) {
			var borderleft = border.left ? border.left._width : 0;
			var borderright = border.right ? border.right._width : 0;
			var bordertop = border.top ? border.top._width : 0;
			var borderbottom = border.bottom ? border.bottom._width : 0;

			if (this.borderLeftNone) {
				borderleft = 0;
			}
			if (this.borderRightNone) {
				borderright = 0;
			}
			if (this.borderTopNone) {
				bordertop = 0;
			}
			if (this.borderBottomNone) {
				borderbottom = 0;
			}

			inner_width -= (borderleft + borderright);
			inner_height -= (bordertop + borderbottom);

			if (inner_width < 0) {
				inner_width = 0;
			}
			if (inner_height < 0) {
				inner_height = 0;
			}
		}

		if (this.inner_width != inner_width || this.inner_height != inner_height) {
			this.inner_width = inner_width;
			this.inner_height = inner_height;
			return true;
		}
		return false;
	};

	_pControlElement._on_updateClientRect = function () {
		var ret = 0;
		if (this._apply_client_padding) {
			var client_left = 0;
			var client_top = 0;
			var client_width = this.inner_width;
			var client_height = this.inner_height;

			var padding = (this.padding || this._padding_info);
			if (padding) {
				client_left = padding.left;
				client_top = padding.top;
				client_width -= padding.left + padding.right;
				client_height -= padding.top + padding.bottom;
			}

			if (this.client_left != client_left || this.client_top != client_top) {
				this.client_left = client_left;
				this.client_top = client_top;
				ret = 1;
			}
			if (this.client_width != client_width || this.client_height != client_height) {
				this.client_width = client_width;
				this.client_height = client_height;
				ret += 2;
			}
		}
		else {
			if (this.client_width != this.inner_width || this.client_height != this.inner_height) {
				this.client_width = this.inner_width;
				this.client_height = this.inner_height;
				ret += 2;
			}
		}

		return ret;
	};

	_pControlElement._updateClientRect = function () {
		var ret = this._on_updateClientRect();
		if (ret & 1) {
			this._on_change_clientPos(this.client_left, this.client_top);
		}
		if (ret & 2) {
			this._on_change_clientSize(this.client_width, this.client_height);
		}
	};

	_pControlElement._on_change_clientPos = function (left, top) {
		var notify = false;

		var client_elem = this._client_elem;
		if (client_elem) {
			client_elem.setElementPosition(left, top);
		}
		else if (this._apply_client_padding) {
			if (this.handle && this.handle != this.dest_handle) {
				var dest_handle = this.dest_handle;
				nexacro.__setDOMStyle_Pos(dest_handle.style, left, top);
			}
			else {
				notify = true;
			}
		}

		var control = this.linkedcontrol;
		if (control && notify) {
			control.on_change_containerPos(left, top);
		}
	};

	_pControlElement._on_change_clientSize = function (width, height) {
		var client_elem = this._client_elem;
		if (client_elem) {
			client_elem.setElementSize(width, height);
		}
		else if (this._apply_client_padding || !this._is_simple_control) {
			if (this.handle && this.handle != this.dest_handle) {
				var dest_handle = this.dest_handle;
				nexacro.__setDOMStyle_Size(dest_handle.style, width, height);
			}
		}


		var control = this.linkedcontrol;
		if (control) {
			control.on_change_containerRect(width, height);
		}
	};


	_pControlElement._refreshControl = function (handle, handle_style) {
		if (this.tabindex >= -1) {
			nexacro.__setDOMNode_TabIndex(handle, this.tabindex);
		}
		if (this.tooltiptext) {
			nexacro.__setDOMNode_ToolTip(handle, this.tooltiptext, this.tooltiptype);
		}

		if (this.zindex >= 0) {
			nexacro.__setDOMStyle_Zindex(handle_style, this.zindex);
		}

		this._refreshCommonStyleProps(handle_style);

		if (this.borderRadius) {
			nexacro.__setDOMStyle_BorderRadiusObject(handle_style, this.borderRadius);
		}

		if (this.width == 0 || this.height == 0) {
			var border = nexacro.BorderObject("0px none");
			nexacro.__setDOMStyle_BorderObject(handle_style, border);
		}
		else {
			nexacro.__setDOMStyle_BorderObject(handle_style, this.border);
			if (this.borderLeftNone || this.borderTopNone || this.borderRightNone || this.borderBottomNone) {
				nexacro.__setDOMStyle_BorderNone(this.handle.style, this.borderLeftNone, this.borderTopNone, this.borderRightNone, this.borderBottomNone, this.border || this._border_info);
			}
		}

		if (this.borderLeftNone) {
			nexacro.__setDOMStyle_BorderLeftNone(handle_style, this.borderLeftNone);
		}
		if (this.borderTopNone) {
			nexacro.__setDOMStyle_BorderTopNone(handle_style, this.borderTopNone);
		}
		if (this.borderRightNone) {
			nexacro.__setDOMStyle_BorderRightNone(handle_style, this.borderRightNone);
		}
		if (this.borderBottomNone) {
			nexacro.__setDOMStyle_BorderBottomNone(handle_style, this.borderBottomNone);
		}

		if (this.background) {
			nexacro.__setDOMStyle_BackgroundObject(handle_style, this.background);
		}



		if (this.cursor) {
			nexacro.__setDOMStyle_CursorObject(handle_style, this.cursor);
		}
		if (this.opacity) {
			nexacro.__setDOMStyle_OpacityObject(handle_style, this.opacity);
		}
		if (this.boxShadow) {
			nexacro.__setDOMStyle_ShadowObject(handle_style, this.boxShadow);
		}

		if (this.status) {
			nexacro.__setDOMNode_Status(handle, this.status);
		}

		if (this.userstatus) {
			nexacro.__setDOMNode_UserStatus(handle, this.userstatus);
		}

		if (nexacro._enableaccessibility) {
			this._refreshAccessibilityInfo(handle, handle_style);
		}

		if (this._edge_elem) {
			this._edge_elem.create();
		}
	};

	_pControlElement._getControlStyleStr = function () {
		var str = this._getCommonStyleStr();

		if (this.borderRadius) {
			str += nexacro.__getHTMLStyle_BorderRadiusObject(this.borderRadius);
		}

		if (this.width == 0 || this.height == 0) {
			str += "border: 0px none;";
		}
		else if (this.border) {
			str += nexacro.__getHTMLStyle_BorderObject(this.border);
		}

		if (this.borderLeftNone) {
			str += nexacro.__getHTMLStyle_BorderLeftNone();
		}
		if (this.borderTopNone) {
			str += nexacro.__getHTMLStyle_BorderTopNone();
		}
		if (this.borderRightNone) {
			str += nexacro.__getHTMLStyle_BorderRightNone();
		}
		if (this.borderBottomNone) {
			str += nexacro.__getHTMLStyle_BorderBottomNone();
		}

		if (this.background) {
			str += nexacro.__getHTMLStyle_BackgroundObject(this.background);
		}


		if (this.cursor) {
			str += nexacro.__getHTMLStyle_CursorObject(this.cursor);
		}

		if (this.opacity) {
			str += nexacro.__getHTMLStyle_OpacityObject(this.opacity);
		}

		if (this.boxShadow) {
			str += nexacro.__getHTMLStyle_ShadowObject(this.boxShadow);
		}

		return str;
	};


	_pControlElement._refreshAccessibilityInfo = nexacro._emptyFn;
	_pControlElement._getAccessibilityInfoStr = function () {
		return "";
	};
	_pControlElement._setAccessibility_notify = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityRole = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityLabel = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityEnable = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityDescription = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityDescLevel = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityAction = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityValue = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatDisabled = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatHidden = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatChecked = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatPressed = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatSelected = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatExpanded = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatAutoComplete = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityFlagHasPopup = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityFlagFocusable = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityFlagReadOnly = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityFlagPassword = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityFlagMultiSelectable = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityFlagSelectable = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityFlagDefaultButton = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityFlagMultiLine = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityInfoCount = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityInfoIndex = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityInfoValueMax = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityInfoValueMin = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityInfoValueCur = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityInfoLevel = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityHotKey = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityActiveDescendant = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatFocus = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatKillFocus = nexacro._emptyFn;
	_pControlElement.setElementAccessibilityStatLive = nexacro._emptyFn;

	_pControlElement.notifyAccessibility = nexacro._emptyFn;
	_pControlElement._makeAccessibilityLabelbyReadtype = nexacro._emptyFn;



	nexacro.ScrollableControlElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;

		var client_elem = new nexacro._ContainerElement(this);
		this._client_elem = client_elem;
	};

	var _pScrollableControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.ScrollableControlElement);
	nexacro.ScrollableControlElement.prototype = _pScrollableControlElement;
	_pScrollableControlElement._type_name = "ScrollableControlElement";

	_pScrollableControlElement.create = function (win) {
		var owner_elem;
		if (!this._is_popup) {
			owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && owner_elem.handle) {
				if (!this.handle) {
					this.owner_elem = owner_elem;
					var _doc = win._doc || owner_elem._getRootWindowHandle();

					var handle = _doc.createElement("div");
					handle.id = this.name;
					handle._linked_element = this;


					this.handle = this.dest_handle = handle;
					nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

					var handle_style = handle.style;
					nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
					nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);

					this._refreshControl(handle, handle_style, _doc);

					nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
				}
			}
		}
		else {
			var _doc = win._doc;
			owner_elem = win;

			var handle = _doc.createElement("div");
			handle.id = this.name;
			handle._linked_element = this;

			this.handle = this.dest_handle = handle;
			nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

			var handle_style = handle.style;
			nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
			nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);

			this._refreshControl(handle, handle_style, _doc);

			this.handle = this.dest_handle = handle;
			if (this.linkedcontrol._findOwnerElementHandle) {
				var owner_elem_info = this.linkedcontrol._findOwnerElementHandle();
				if (owner_elem_info.is_append) {
					nexacro.__appendDOMNode(owner_elem_info.owner_handle, handle);
				}
				else {
					owner_elem_info.owner_handle.insertBefore(handle, owner_elem_info.ref_handle);
				}
				this.owner_elem = owner_elem_info.owner_handle._linked_element;
			}
			else {
				nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
				this.owner_elem = owner_elem;
			}

			this._frame_node = nexacro._createFrameNode(handle, this.left, this.top, _doc);
		}

		if (this.handle) {
			if (!this._client_elem.handle) {
				this._client_elem.create(win);
			}

			var step_count = this._step_count;
			if (step_count > 0) {
				this._step_containers = [];
				for (var i = 0; i < step_count; i++) {
					var step_client = new nexacro._ContainerElement(this._client_elem, this._use_translate_scroll);
					step_client.setElementPosition(i * this.client_width, 0);
					step_client.setElementSize(this.client_width, this.container_maxheight);
					step_client.create(win);
					this._step_containers.push(step_client);
				}
			}
		}
	};

	_pScrollableControlElement._on_destroy = function () {
		var handle = this.handle;
		if (handle) {
			var step_containers = this._step_containers;
			if (step_containers) {
				var step_count = step_containers.length;
				for (var i = 0; i < step_count; i++) {
					var step_client = step_containers[i];
					step_client.destroy();
				}
				this._step_containers = null;
			}
		}
	};

	_pScrollableControlElement._on_clearContents = function () {
		if (this.handle) {
			var step_containers = this._step_containers;
			if (step_containers) {
				var step_count = step_containers.length;
				for (var i = 0; i < step_count; i++) {
					var step_client = step_containers[i];
					step_client.destroy();
				}
				this._step_containers = null;
			}
		}
	};

	_pScrollableControlElement.initElementInfo = function () {
		nexacro.ControlElement.prototype.initElementInfo.call(this);

		this._zclient_width = 0;
		this._zclient_height = 0;

		var control = this.linkedcontrol;
		if (control._is_scrollable) {
			this._hscroll_control = null;
			this._vscroll_control = null;

			this._step_containers = null;

			this.zoom = 100;

			this.scroll_left = 0;
			this.scroll_top = 0;
			this.container_maxwidth = 0;
			this.container_maxheight = 0;

			this.hscroll_limit = 0;
			this.vscroll_limit = 0;

			this._hscroll_size = 0;
			this._vscroll_size = 0;
			this._hscrollbartype = "";
			this._vscrollbartype = "";
			this._scrolltype = "";

			this._scrollview_width_top = 0;
			this._step_count = 0;
			this._step_index = -1;

			this._use_translate_scroll = (control._use_translate_scroll === false) ? control._use_translate_scroll : nexacro._use_translate_scroll;
			this._use_container_move = control._use_container_move;
			this._use_native_scroll = control._use_native_scroll;


			this.setElementScrollbarSize(control._getHScrollBarSize(), control._getVScrollBarSize(), control._getHScrollBarType(), control._getVScrollBarType(), control.scrolltype);
		}
		else if (control._is_expandable) {
			this._expandbarwidth = 0;
			this._expandbarheight = 0;
			this._expandbartype = false;
			this._expanddirtype = "horz";
			this._expandvisible;
			this._expandarrange;

			this._use_translate_scroll = false;
			this._use_container_move = false;
			this._use_native_scroll = false;

			this._on_updateClientRect = this._on_updateClientRectExpand;
			this._on_change_clientPos = this._on_change_clientPosExpand;
			this._on_change_clientSize = this._on_change_clientSizeExpand;
		}

		var client_elemt = this._client_elem;
		if (client_elemt) {
			client_elemt._use_translate_scroll = this._use_translate_scroll;
			client_elemt._use_container_move = this._use_container_move;
			client_elemt._use_native_scroll = this._use_native_scroll;
		}
	};

	_pScrollableControlElement.setElementStepCount = function (count) {
		if (this._step_count != count) {
			var step_count = this._step_count;
			var step_containers = this._step_containers;
			var i, step_client;
			if (step_containers && this._step_count) {
				for (i = 0; i < step_count; i++) {
					step_client = step_containers[i];
					step_client.destroy();
				}
				this._step_containers = null;
			}

			this._step_count = count;

			if (this.handle && count > 0) {
				this._step_containers = [];

				for (i = 0; i < count; i++) {
					step_client = new nexacro._ContainerElement(this._client_elem, this._use_translate_scroll);
					step_client.setElementPosition(i * this.client_width, 0);
					step_client.setElementSize(this.client_width, this.container_maxheight);
					step_client.create();
					this._step_containers.push(step_client);
				}
			}

			this._updateClientRect();
		}
	};

	_pScrollableControlElement.setElementStepIndex = function (index) {
		if (this._step_index != index) {
			if (this._step_count > 0) {
				if (index > -1 && this._step_count > index) {
					this._step_index = index;
				}
			}
			else {
				this._step_index = index;
			}
		}
	};

	_pScrollableControlElement.setElementZoom = function (zoomfactor) {
		var handle = this.handle;
		if (handle) {
			if (zoomfactor < 0) {
				zoomfactor = 0;
			}
			this.zoom = zoomfactor;
			var client = this.getContainerElement(this._step_index);
			if (client) {
				client.setElementZoom(zoomfactor);
			}
			this._updateClientRect();
		}
	};

	_pScrollableControlElement.setElementScrollMaxSize = function (width, height) {
		if (this.container_maxwidth != width || this.container_maxheight != height) {
			this.container_maxwidth = width;
			this.container_maxheight = height;

			if (this._step_count) {
				var client_elem = this.getContainerElement(this._step_index);
				if (client_elem) {
					client_elem.setElementScrollMaxSize(this.client_width, height);
				}
			}
			if (this._client_elem) {
				this._client_elem.setElementScrollMaxSize(width, height);
			}

			this._updateClientRect();
		}
	};

	_pScrollableControlElement.setElementScrollbarSize = function (hscroll_size, vscroll_size, hscrollbartype, vscrollbartype, scrolltype) {
		var ret = false;

		if (this._vscroll_size != vscroll_size || this._hscroll_size != hscroll_size) {
			this._vscroll_size = vscroll_size | 0;
			this._hscroll_size = hscroll_size | 0;

			ret = true;
		}

		if (this._hscrollbartype != hscrollbartype || this._vscrollbartype != vscrollbartype) {
			this._hscrollbartype = hscrollbartype;
			this._vscrollbartype = vscrollbartype;

			ret = true;
		}

		if (this._scrolltype != scrolltype) {
			this._scrolltype = scrolltype;
			var container = this._client_elem;
			if (container) {
				container._setElementScrolltype(this._getElementScrollType(scrolltype));
			}
			ret = true;
		}
		if (ret) {
			this._updateClientRect();
		}
		return ret;
	};

	_pScrollableControlElement.setElementExpandbarSize = function (expandbarsize, expandbartype, expanddirtype, expandvisible, expandarrange) {
		var ret = false;

		if (this._expandbarwidth != expandbarsize[0]) {
			this._expandbarwidth = +expandbarsize[0];
			ret = true;
		}
		if (this._expandbarheight != expandbarsize[1]) {
			this._expandbarheight = +expandbarsize[1];
			ret = true;
		}
		if (this._expandbartype != expandbartype) {
			this._expandbartype = expandbartype;
			ret = true;
		}
		if (this._expanddirtype != expanddirtype) {
			this._expanddirtype = expanddirtype;
			ret = true;
		}
		if (this._expandvisible != expandvisible) {
			this._expandvisible = expandvisible;
			ret = true;
		}
		if (this._expandarrange != expandarrange) {
			this._expandarrange = expandarrange;
			ret = true;
		}

		if (ret) {
			this._updateClientRect();
		}

		return ret;
	};

	_pScrollableControlElement.getContainerElement = function (position_step) {
		var step_count = this._step_count;
		var step_index = this._step_index;
		var step_containers = this._step_containers;
		if (step_count > 0 && step_containers && step_count > position_step) {
			if (position_step < 0 || position_step == null) {
				position_step = (step_index > -1 ? step_index : 0);
			}

			return step_containers[position_step];
		}
		else {
			return this._client_elem;
		}
	};

	_pScrollableControlElement.getElementScrollLeft = function () {
		var container = this.getContainerElement(this.position_step);
		if (!container) {
			return 0;
		}

		return container.getElementScrollLeft();
	};

	_pScrollableControlElement.getElementScrollTop = function () {
		var container = this._client_elem;
		if (!container) {
			return 0;
		}

		return container.getElementScrollTop();
	};

	_pScrollableControlElement.getElementScrollWidth = function () {
		var container = this.getContainerElement(this.position_step);
		if (!container) {
			return 0;
		}

		return container.getElementScrollWidth();
	};

	_pScrollableControlElement.getElementScrollHeight = function () {
		var container = this._client_elem;
		if (!container) {
			return 0;
		}

		return container.getElementScrollHeight();
	};

	_pScrollableControlElement._updateClientRect = function () {
		var ret = this._on_updateClientRect();
		if (ret & 1) {
			this._on_change_clientPos(this.client_left, this.client_top);
		}
		if (ret & 2) {
			this._on_change_clientSize(this._zclient_width, this._zclient_height);
		}
	};

	_pScrollableControlElement._on_change_clientPos = function (left, top) {
		if (this._apply_client_padding) {
			if (this._client_elem) {
				var step_count = this._step_count;
				var step_index = this._step_index;
				var step_containers = this._step_containers;
				if (step_count > 0 && step_containers) {
					var zclient_width = this._zclient_width;
					for (var i = 0; i < step_count; i++) {
						var step_client_elem = step_containers[i];
						step_client_elem.setElementPosition(zclient_width * i, 0);
						if (i == step_index) {
							step_client_elem.setElementSize(zclient_width, this.container_maxheight);
						}
					}
				}
				else {
					this._client_elem.setElementPosition(left, top);
				}
			}
			else if (this.handle && this.handle != this.dest_handle) {
				var dest_handle = this.dest_handle;
				nexacro.__setDOMStyle_Pos(dest_handle.style, left, top);
			}
		}
		else if (this._client_elem) {
			this._client_elem.setElementPosition(left, top);
			var step_count = this._step_count;
			var step_index = this._step_index;
			var step_containers = this._step_containers;
			if (step_count > 0 && step_containers) {
				var zclient_width = this._zclient_width;
				for (var i = 0; i < step_count; i++) {
					var step_client_elem = step_containers[i];
					step_client_elem.setElementPosition(zclient_width * i, 0);
				}

				step_index = this._step_index;
				var step_scroll_left = zclient_width * step_index;
				if (this.scroll_left != step_scroll_left) {
					this.scroll_left = step_scroll_left;
					this._client_elem._setElementHScrollPos(step_scroll_left);
				}
			}
		}

		var control = this.linkedcontrol;
		if (control) {
			control.on_change_containerPos(left, top);
		}
	};

	_pScrollableControlElement._on_change_clientPosExpand = function (left, top) {
		var client_elem = this._client_elem;
		if (client_elem) {
			client_elem.setElementPosition(left, top);
		}
		else {
			var handle = this.handle;
			var dest_handle = this.dest_handle;
			if (handle && handle != dest_handle & this._apply_client_padding) {
				nexacro.__setDOMStyle_Pos(dest_handle.style, left, top);
			}
		}

		var control = this.linkedcontrol;
		if (control) {
			control.on_change_containerPos(left, top);
		}
	};

	_pScrollableControlElement._on_change_clientSize = function (width, height) {
		var max_width = Math.max(width, this.container_maxwidth);
		var max_height = Math.max(height, this.container_maxheight);

		if (this._apply_client_padding) {
			if (this._client_elem) {
				this._client_elem.setElementSize(width, height);

				var step_count = this._step_count;
				var step_index = this._step_index;
				var step_containers = this._step_containers;

				if (step_count > 0 && step_containers) {
					var zclient_width = this._zclient_width;
					for (var i = 0; i < step_count; i++) {
						var step_client_elem = step_containers[i];
						if (step_client_elem) {
							step_client_elem.setElementSize(zclient_width, max_height);
							var dest_handle = step_client_elem.dest_handle;
							if (dest_handle) {
								nexacro.__setDOMStyle_Size(dest_handle.style, width, max_height);
							}
						}
					}
				}
			}
			else if (this.handle && this.handle != this.dest_handle) {
				var dest_handle = this.dest_handle;
				nexacro.__setDOMStyle_Size(dest_handle.style, width, height);
			}
		}
		else if (this._client_elem) {
			var step_count = this._step_count;
			var step_index = this._step_index;
			var step_containers = this._step_containers;
			if (step_count > 0 && step_containers) {
				var zclient_width = this._zclient_width;
				for (var i = 0; i < step_count; i++) {
					var step_client_elem = step_containers[i];
					step_client_elem.setElementSize(zclient_width, max_height);
				}
			}
			else {
				this._client_elem.setElementSize(width, height);
			}
		}

		if (this._client_elem && this._client_elem._use_translate_scroll) {
			if (this._client_elem.dest_handle) {
				nexacro.__setDOMStyle_Size(this._client_elem.dest_handle.style, max_width, max_height);
			}
		}

		var control = this.linkedcontrol;
		if (control) {
			control.on_change_containerRect(width, height);
		}
	};

	_pScrollableControlElement._on_change_clientSizeExpand = function (width, height) {
		var client_elem = this._client_elem;
		if (client_elem) {
			client_elem.setElementSize(width, height);
		}
		else {
			var handle = this.handle;
			var dest_handle = this.dest_handle;
			if (handle && handle != dest_handle & this._apply_client_padding) {
				nexacro.__setDOMStyle_Size(dest_handle.style, width, height);
			}
		}

		var control = this.linkedcontrol;
		if (control) {
			control.on_change_containerRect(width, height);
		}
	};

	_pScrollableControlElement._on_updateClientRect = function () {
		var client_left = 0;
		var client_top = 0;
		var client_width = this.inner_width;
		var client_height = this.inner_height;

		var cur_inner_width = client_width;
		var cur_inner_height = client_height;
		var cur_client_width = this.client_width;
		var cur_client_height = this.client_height;

		if (this._apply_client_padding) {
			var padding = this.padding ? this.padding : this._padding_info;
			if (padding) {
				client_left = padding.left;
				client_top = padding.top;
				client_width -= padding.left + padding.right;
				client_height -= padding.top + padding.bottom;
			}
		}

		var client_elem = this._client_elem;
		if (!client_elem) {
			return 0;
		}

		var zoomfactor = this.zoom / 100;
		var zclient_width = this._zclient_width = client_width / zoomfactor;
		var zclient_height = this._zclient_height = client_height / zoomfactor;

		var container_maxwidth = this.container_maxwidth;
		var container_maxheight = this.container_maxheight;

		var scroll_left = this.scroll_left;
		var scroll_top = this.scroll_top;

		if (zoomfactor != 1) {
			zclient_width = zclient_width;
			zclient_height = zclient_height;
			container_maxwidth = container_maxwidth;
			container_maxheight = container_maxheight;
		}

		var step_count = this._step_count;
		var step_containers = this._step_containers;
		if (step_count > 0 && step_containers) {
			container_maxwidth = step_count * zclient_width;
		}

		var reset_vlimit = false;
		var reset_hlimit = false;


		var hscroll_limit = 0;
		var vscroll_limit = 0;

		var hscrollbartype = this._hscrollbartype;
		var vscrollbartype = this._vscrollbartype;

		if (step_count > 0 && step_containers) {
			hscrollbartype = "none";
		}

		if (container_maxwidth > zclient_width) {
			if (hscrollbartype != "none" && hscrollbartype != "autoindicator") {
				client_height -= this._hscroll_size;
				zclient_height = client_height / zoomfactor;
			}

			hscroll_limit = container_maxwidth - zclient_width;
		}
		else {
			if (hscrollbartype == "fixed") {
				client_height -= this._hscroll_size;
				zclient_height = client_height / zoomfactor;
			}

			hscroll_limit = 0;
		}

		if (container_maxheight > zclient_height) {
			if (container_maxheight >= zclient_height) {
				vscroll_limit = container_maxheight - zclient_height;
			}
			else if (container_maxheight > cur_client_height) {
				vscroll_limit = container_maxheight - cur_client_height;
			}

			if (vscrollbartype != "none" && vscrollbartype != "autoindicator") {
				client_width -= this._vscroll_size;
				zclient_width = client_width / zoomfactor;
			}

			if (container_maxwidth > zclient_width) {
				if (hscrollbartype != "none" && hscrollbartype != "autoindicator" && hscroll_limit == 0) {
					client_height -= this._hscroll_size;
					zclient_height = client_height / zoomfactor;
					vscroll_limit += this._hscroll_size;
				}
				hscroll_limit = container_maxwidth - zclient_width;
			}
			else if (container_maxwidth > cur_client_width) {
				hscroll_limit = container_maxwidth - cur_client_width;
			}
		}
		else {
			if (vscrollbartype == "fixed") {
				client_width -= this._vscroll_size;
				zclient_width = client_width / zoomfactor;

				if (container_maxwidth > zclient_width) {
					hscroll_limit = container_maxwidth - zclient_width;
				}
				else if (container_maxwidth > cur_client_width) {
					hscroll_limit = container_maxwidth - cur_client_width;
				}
			}
			vscroll_limit = 0;
		}

		if (step_count > 0 && step_containers) {
			container_maxwidth = step_count * zclient_width;

			if (container_maxwidth > zclient_width) {
				hscroll_limit = container_maxwidth - zclient_width;
			}
		}

		if (this.hscroll_limit != hscroll_limit) {
			reset_hlimit = true;
			this.hscroll_limit = hscroll_limit;

			if (scroll_left > hscroll_limit && hscroll_limit >= 0) {
				this.setElementHScrollPos(hscroll_limit);
			}
		}

		if (this.vscroll_limit != vscroll_limit) {
			reset_vlimit = true;
			this.vscroll_limit = vscroll_limit;

			if (scroll_top > vscroll_limit && vscroll_limit >= 0) {
				this.setElementVScrollPos(vscroll_limit);
			}
		}

		this._zclient_width = zclient_width;
		this._zclient_height = zclient_height;

		var ret = 0;
		if (this.client_left != client_left || this.client_top != client_top) {
			this.client_left = client_left;
			this.client_top = client_top;
			ret = 1;
		}
		else if (step_count > 0) {
			ret = 1;
		}

		var cw = this.client_width != client_width;
		var ch = this.client_height != client_height;

		if (cw || ch) {
			this.client_width = client_width;
			this.client_height = client_height;
			ret += 2;
		}
		else if (this.client_width != zclient_width || this.client_height != zclient_height) {
			ret += 2;
		}
		else if (reset_hlimit || reset_vlimit) {
			ret += 2;
		}
		return ret;
	};

	_pScrollableControlElement._on_updateClientRectExpand = function () {
		var ret = 0;

		var client_left = 0;
		var client_top = 0;
		var client_width = this.inner_width;
		var client_height = this.inner_height;

		if (!this._client_elem) {
			return ret;
		}

		if (this._apply_client_padding) {
			var padding = this.padding ? this.padding : this._padding_info;
			if (padding) {
				client_left = padding.left;
				client_top = padding.top;
				client_width -= padding.left + padding.right;
				client_height -= padding.top + padding.bottom;
			}
		}

		if (this._expandbartype && this._expanddirtype == "vert") {
			client_height -= this._expandbarheight;
		}

		if (this._expandbartype && this._expanddirtype == "horz") {
			client_width -= this._expandbarwidth;
		}

		if (this.client_left != client_left || this.client_top != client_top) {
			this.client_left = client_left;
			this.client_top = client_top;
			ret = 1;
		}

		if (this.client_width != client_width || this.client_height != client_height) {
			this.client_width = this._zclient_width = client_width;
			this.client_height = this._zclient_height = client_height;
			ret += 2;
		}

		return ret;
	};

	_pScrollableControlElement._getElementScrollType = function (scrolltype) {
		var ret = 0x11;
		if (scrolltype == "both") {
			ret = 0x00;
		}
		else if (scrolltype == "horizontal") {
			ret = 0x01;
		}
		else if (scrolltype == "vertical") {
			ret = 0x10;
		}
		return ret;
	};
	nexacro.FrameControlElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;

		this._border_elems = new nexacro.Collection();
		this._frame_node = null;
	};
	var _pFrameControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.FrameControlElement);
	nexacro.FrameControlElement.prototype = _pFrameControlElement;
	_pFrameControlElement._type_name = "FrameControlElement";

	_pFrameControlElement._title_control = null;
	_pFrameControlElement._status_control = null;
	_pFrameControlElement._title_height = 0;
	_pFrameControlElement._status_height = 0;
	_pFrameControlElement._title_top = 0;
	_pFrameControlElement._title_width = 0;
	_pFrameControlElement._status_top = 0;
	_pFrameControlElement._status_width = 0;
	_pFrameControlElement._max_child_zindex = 0;
	_pFrameControlElement._is_window_element = false;
	_pFrameControlElement._resizable = false;

	_pFrameControlElement._doc = null;

	_pFrameControlElement.create = function (win) {
		if (!this.handle) {
			if (this.parent_elem == null) {
				var _doc = this._doc = win._doc;
				this.owner_elem = win;
				this._is_window_element = true;
				this.left = 0;
				this.top = 0;
				if (nexacro._allow_default_pinchzoom) {
					this.width = nexacro._getWindowHandleClientWidth(win.handle);
					this.height = nexacro._getWindowHandleClientHeight(win.handle);
				}
				else {
					this.width = win.clientWidth;
					this.height = win.clientHeight;
				}

				var handle = win.dest_handle;

				handle.id = this.name;
				handle._linked_element = this;

				this.handle = this.dest_handle = handle;
				nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

				if (!this._is_simple_control) {
					var inner_node = _doc.createElement("div");
					this.dest_handle = inner_node;
					nexacro.__setDOMNode_ClassName(inner_node, "nexasimplecontainer");
					nexacro.__setDOMNode_Id(inner_node, "", "nexacontainer");
					nexacro.__appendDOMNode(handle, inner_node);

					var innernodestyle = inner_node.style;
					nexacro.__setDOMStyle_Pos(innernodestyle, this.client_left, this.client_top);
					nexacro.__setDOMStyle_Size(innernodestyle, this.client_width, this.client_height);
				}

				var handle_style = handle.style;


				if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
					nexacro.__setDOMStyle_Fixed(handle_style);
				}

				this._refreshControl(handle, handle_style, _doc);
			}
			else {
				var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement();
				if (owner_elem && owner_elem.handle && !this.handle) {
					this.owner_elem = owner_elem;
					var _doc = owner_elem._getRootWindowHandle();
					var handle = _doc.createElement("div");

					handle.id = this.name;
					handle._linked_element = this;

					this.handle = this.dest_handle = handle;
					nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

					var handle_style = handle.style;
					if (owner_elem instanceof nexacro.ModalOverlayElement) {
						if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
							nexacro.__setDOMStyle_Fixed(handle_style);
						}
					}


					if (!this._is_simple_control) {
						var inner_node = _doc.createElement("div");
						this.dest_handle = inner_node;
						nexacro.__setDOMNode_ClassName(inner_node, "nexasimplecontainer");
						nexacro.__setDOMNode_Id(inner_node, "", "nexacontainer");
						nexacro.__appendDOMNode(handle, inner_node);

						var innernodestyle = inner_node.style;
						nexacro.__setDOMStyle_Pos(innernodestyle, this.client_left, this.client_top);
						if (this.client_width && this.client_height) {
							nexacro.__setDOMStyle_Size(innernodestyle, this.client_width, this.client_height);
						}
					}

					nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
					if (this.width && this.height) {
						nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);
					}

					this._refreshControl(handle, handle_style, _doc);

					nexacro.__appendDOMNode(owner_elem.dest_handle, handle);


					this._frame_node = nexacro._createFrameNode(handle, this.left, this.top, _doc);
				}
			}

			if (this._resizable) {
				this._createBorderElements();
				this._updateBorderElementsPosition();
			}
		}
		else {
			if (this.parent_elem == null) {
				var _win = win;
				if (this.handle != _win.dest_handle) {
					var old_handle = this.handle;

					var _doc = this._doc = _win._doc;
					var handle = _win.dest_handle;

					this.owner_elem = _win;
					this._is_window_element = true;
					this.left = 0;
					this.top = 0;
					this.width = _win.clientWidth;
					this.height = _win.clientHeight;

					handle.id = this.name;
					handle._linked_element = this;

					this.handle = this.dest_handle = handle;

					var handle_style = handle.style;

					if (this.border) {
						this.border = null;
					}

					this._title_height = 0;
					this._status_height = 0;

					nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
					if (this.width && this.height) {
						nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);
					}

					this._refreshControl(handle, handle_style, _doc);

					if (old_handle.hasChildNodes()) {
						var childs = old_handle.childNodes;
						for (var i = 0; i < childs.length; i++) {
							var child = childs[i];
							nexacro.__appendDOMNode(handle, child);
						}
					}
				}
			}
		}
	};

	_pFrameControlElement._on_destroy = function () {
		this._destroyBorderElements();

		this._title_control = null;
		this._status_control = null;
	};



	_pFrameControlElement.setElementCSSMapInfo = function (border, padding, edge) {
		if (this.linkedcontrol && this.linkedcontrol._is_window) {
			border = null;
		}

		nexacro.ControlElement.prototype.setElementCSSMapInfo.call(this, border, null, edge);
	};

	_pFrameControlElement._getRootWindowHandle = function () {
		if (this._is_window_element) {
			return this._doc;
		}
		else if (this.owner_elem) {
			return this.owner_elem._getRootWindowHandle();
		}
		else if (this.parent && this.parent._getRootWindowHandle) {
			return this.parent._getRootWindowHandle();
		}
		return null;
	};

	_pFrameControlElement.setElementBorder = function (border) {
		if (this.linkedcontrol && this.linkedcontrol._is_window) {
			return;
		}

		nexacro.ControlElement.prototype.setElementBorder.call(this, border);
	};

	_pFrameControlElement._updateClientRect = function () {
		var ret = this._on_updateClientRect();
		if (ret & 1) {
			this._on_change_clientPos(this.client_left, this.client_top);
		}
		if (ret & 2) {
			this._on_change_clientSize(this.client_width, this.client_height);
		}

		if (ret) {
			this._updateBorderElementsPosition();
		}
	};

	_pFrameControlElement._on_updateClientRect = function () {
		var client_left = 0;
		var client_top = 0;
		var client_width = this.inner_width;
		var client_height = this.inner_height;

		if (this._apply_client_padding) {
			var padding = (this.padding || this._padding_info);
			if (padding) {
				client_left = padding.left;
				client_top = padding.top;
				client_width -= padding.left + padding.right;
				client_height -= padding.top + padding.bottom;
			}
		}

		var title_control = this._title_control;
		if (title_control) {
			if (!this._is_verticalmin && (this.client_left != client_left || this._title_top != client_top || this._title_width != client_width)) {
				this._title_top = client_top;
				this._title_width = client_width;
				title_control.move(client_left, client_top, client_width, this._title_height);
			}
			else if (this._is_verticalmin && (this.client_top != client_top || this._title_top != client_top || this._title_height != client_height)) {
				this._title_top = client_top;
				this._title_width = client_width;
				title_control.move(client_left, client_top, client_width, client_height);
			}
			client_top += this._title_height;
			client_height -= this._title_height;
			if (client_height < 0) {
				client_height = 0;
			}
		}
		else {
			this._title_top = client_top;
		}

		var status_control = this._status_control;
		if (status_control) {
			if (this._status_height > 0) {
				client_height -= this._status_height;
				if (client_height < 0) {
					client_height = 0;
				}
			}
			var status_top = client_top + client_height;
			if (this.client_left != client_left || this._status_top != status_top || this._status_width != client_width) {
				this._status_top = status_top;
				this._status_width = client_width;
				status_control.move(client_left, status_top, client_width, this._status_height);
			}
		}
		else {
			this._status_top = client_top + client_height;
		}

		var ret = 0;
		if (this.client_left != client_left || this.client_top != client_top) {
			this.client_left = client_left;
			this.client_top = client_top;
			ret = 1;
		}
		if (this.client_width != client_width || this.client_height != client_height) {
			this.client_width = client_width;
			this.client_height = client_height;
			ret += 2;
		}
		return ret;
	};





	_pFrameControlElement.appendChildElement = function (child_elem) {
		if (this.handle) {
			if (!this._client_elem) {
				return;
			}

			if (child_elem.parent_elem == this._client_elem) {
				child_elem._is_nc_element = true;
			}
			else {
				if (child_elem.handle) {
					var old_doc = child_elem._getRootWindowHandle();
					var new_doc = this._getRootWindowHandle();
					if (old_doc != new_doc) {
						child_elem.parent_elem = this._client_elem;
						child_elem._removeFromContainer();
					}
					else {
						child_elem.parent_elem = this._client_elem;
					}
				}
				else {
					child_elem.parent_elem = this._client_elem;
				}
			}

			child_elem._is_nc_element = true;

			child_elem.setElementPosition(0, 0);
			child_elem.setElementSize(this.client_width, this.client_height);

			if (!child_elem.handle) {
				child_elem.create();
			}
			else {
				child_elem._appendToContainer(this._client_elem);
			}
		}
	};

	_pFrameControlElement.removeChildElement = function (child_elem) {
		if (child_elem.parent_elem == this) {
			child_elem._removeFromContainer();
		}
	};


	_pFrameControlElement.sendToBackElement = function (elem) {
		if (elem && elem.owner_elem && 
			elem.owner_elem.owner_elem == this.owner_elem && elem.handle) {
			nexacro.__sendDOMNodeToBack(elem.handle);
			if (elem._border_elems) {
				for (var i = 0; i < elem._border_elems.length; i++) {
					nexacro.__sendDOMNodeToBack(elem._border_elems[i].handle);
				}
			}
		}
	};

	_pFrameControlElement.bringToFrontElement = function (elem) {
		if (this.handle) {
			this._max_child_zindex++;

			var new_zindex = (this._max_child_zindex * 10);

			elem.setElementZIndex(new_zindex);
			if (elem._border_elems) {
				for (var i = 0; i < elem._border_elems.length; i++) {
					elem._border_elems[i].setElementZIndex(new_zindex + (i + 1));
				}
			}
		}
	};

	_pFrameControlElement.moveToNextElement = function (elem, base_elem) {
		var client_elem = this.getContainerElement(elem.position_step);
		client_elem.moveToNextElement(elem, base_elem);
	};

	_pFrameControlElement.moveToPrevElement = function (elem, base_elem) {
		var client_elem = this.getContainerElement(elem.position_step);
		client_elem.moveToPrevElement(elem, base_elem);
	};

	_pFrameControlElement.setTitleBarControl = function (title_control, title_height) {
		this._title_control = title_control;
		if (title_control) {
			this._title_height = parseInt(title_height) | 0;
			this._title_width = 0;
		}
		else {
			this._title_height = 0;
			this._title_width = 0;
		}

		this._updateClientRect();
	};

	_pFrameControlElement.setStatusBarControl = function (status_control, status_height) {
		this._status_control = status_control;
		if (status_control) {
			this._status_height = parseInt(status_height) | 0;
			this._status_width = 0;
		}
		else {
			this._status_height = 0;
			this._status_width = 0;
		}

		this._updateClientRect();
	};


	_pFrameControlElement._createBorderElements = function () {
		if (this.parent == null || this.parent_elem == null) {
			return;
		}

		if (this._border_elems.length > 0) {
			return;
		}

		var name_table = Array("lt", "t", "rt", "l", "r", "lb", "b", "rb");
		for (var i = 0; i < 8; i++) {
			var border_elem = new nexacro._FrameResizeBorderElement(this.parent_elem);

			border_elem.parent = this;

			this._border_elems.add_item(name_table[i], border_elem);
		}

		this._setResizable(this._resizable);

		var win = this.linkedcontrol._getWindow();

		for (var i = 0; i < 8; i++) {
			var border_elem = this._border_elems[i];
			border_elem.linkedcontrol = this.linkedcontrol;
			border_elem.create(win);
		}
	};

	_pFrameControlElement._destroyBorderElements = function () {
		var cnt = this._border_elems.length;
		for (var i = 0; i < cnt; i++) {
			this._border_elems[i].destroy();
			this._border_elems[i] = null;
		}

		this._border_elems.clear();
		this._border_elems = null;
	};

	_pFrameControlElement.setElementPosition = function (x, y) {
		nexacro.ControlElement.prototype.setElementPosition.call(this, x, y);
		this._updateBorderElementsPosition();
	};


	_pFrameControlElement._updateBorderElementsPosition = function () {
		if (this._border_elems.length == 0) {
			return;
		}

		var border = this.border || this._border_info;
		if (!border) {
			return;
		}

		var lw, tw, rw, bw;
		if (border._single == 1) {
			lw = tw = rw = bw = border._getBorderWidth();
		}
		else {
			lw = border.left._width;
			tw = border.top._width;
			rw = border.right._width;
			bw = border.bottom._width;
		}

		var inner_width = this.inner_width;
		var inner_height = this.inner_height;

		if (lw < 5) {
			var lx = 5 - lw;
			lw += lx;
			inner_width -= lx;
		}
		if (tw < 5) {
			var tx = 5 - tw;
			tw += tx;
			inner_height -= tx;
		}
		if (rw < 5) {
			var rx = 5 - rw;
			rw += rx;
			inner_width -= rx;
		}
		if (bw < 5) {
			var bx = 5 - bw;
			bw += bx;
			inner_height -= bx;
		}

		var left = this.left;
		var top = this.top;
		var right = left + this.width;
		var bottom = top + this.height;

		var x = left;
		var y = top;
		for (var i = 0; i < 8; i++) {
			this._border_elems[i].setElementPosition(x, y);
			switch (i) {
				case 0:
					x += lw;
					break;
				case 1:
					x += inner_width;
					break;
				case 2:
					x = left;
					y += tw;
					break;
				case 3:
					x += (lw + inner_width);
					break;
				case 4:
					x = left;
					y += inner_height;
					break;
				case 5:
					x += lw;
					break;
				case 6:
					x += inner_width;
					break;
				case 7:
					break;
			}
		}
		var w, h;
		for (var i = 0; i < 8; i++) {
			if (i == 0 || i == 3 || i == 5) {
				w = lw;
			}
			if (i == 1 || i == 6) {
				w = inner_width;
			}
			if (i == 2 || i == 4 || i == 7) {
				w = rw;
			}
			if (i < 3) {
				h = tw;
			}
			else if (i < 5) {
				h = inner_height;
			}
			else {
				h = bw;
			}
			this._border_elems[i].setElementSize(w, h);
		}
	};

	_pFrameControlElement._setResizable = function (resizable) {
		this._resizable = resizable;
		if (this.handle) {
			if (this._border_elems.length == 0) {
				if (resizable) {
					this._createBorderElements();
					this._updateBorderElementsPosition();
				}
				else {
					return;
				}
			}

			var cursor_table = Array("nw", "n", "ne", "w", "e", "sw", "s", "se");
			for (var i = 0; i < 8; i++) {
				var border_elem = this._border_elems[i];
				border_elem._is_track = resizable;

				var cursor;
				if (resizable) {
					cursor = nexacro.CursorObject(cursor_table[i] + "-resize");
				}
				else {
					cursor = nexacro.CursorObject("arrow");
				}
				border_elem.setElementCursor(cursor);
			}
		}

		var statuscontrol = this._status_control;
		if (statuscontrol) {
			statuscontrol.set_resizable(resizable);
		}
	};

	nexacro._FrameResizeBorderElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
	};

	var __pFrameResizeBorderElement = nexacro._createPrototype(nexacro.ControlElement, nexacro._FrameResizeBorderElement);
	nexacro._FrameResizeBorderElement.prototype = __pFrameResizeBorderElement;

	__pFrameResizeBorderElement._type_name = "FrameResizeBorderElement";
	__pFrameResizeBorderElement._is_simple_control = true;

	__pFrameResizeBorderElement._on_starttrack = function () {
		this.linkedcontrol._on_border_starttrack(this.cursor);
	};
	__pFrameResizeBorderElement._on_endtrack = function (x, y, dragdata) {
		this.linkedcontrol._on_border_endtrack(x, y, dragdata);
	};
	__pFrameResizeBorderElement._on_movetrack = function (x, y, dragdata) {
		this.linkedcontrol._on_border_movetrack(x, y, dragdata);
	};

	__pFrameResizeBorderElement._updateClientRect = nexacro._emptyFn;

	nexacro.ModalOverlayElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
	};

	var _pModalOverlayElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.ModalOverlayElement);
	nexacro.ModalOverlayElement.prototype = _pModalOverlayElement;
	_pModalOverlayElement._type_name = "ModalOverlayElement";
	_pModalOverlayElement._background_handle = null;


	_pModalOverlayElement.create = function (win) {
		if (this.parent_elem && !this.handle) {
			var _doc = this._doc = this.parent_elem._getRootWindowHandle();
			var handle = _doc.createElement("div");
			handle._linked_element = this;


			this.handle = this.dest_handle = handle;

			var handle_style = handle.style;

			nexacro.__setDOMNode_ClassName(handle, "nexamodaloverlay");
			nexacro.__setDOMNode_Id(handle, "", "nexacontainer");
			nexacro.__setDOMStyle_Pos(handle_style, 0, 0);

			var owner_elem = win.frame.getElement();
			var waitcomp_elem = win.frame._getWaitComponentElement();
			var ref_dest_handle = null;
			if (waitcomp_elem) {
				ref_dest_handle = waitcomp_elem.handle;
			}
			if (ref_dest_handle) {
				owner_elem.dest_handle.insertBefore(handle, ref_dest_handle);
			}
			else {
				nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
			}


			this._refreshControl(handle, handle.style, _doc);
			this._createBackgroundElement(_doc, handle);

			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
				nexacro.__removeHTMLAttr_Proeprty(handle, "tabindex");
			}

			this._frame_node = nexacro._createFrameNode(handle, this.left, this.top, _doc);
			if (this._frame_node) {
				this._frame_node._linked_element = this;
				nexacro._observeSysEvent(this._frame_node, "load", "onload", this._iframe_eventhandler_onload);
			}
		}
	};

	_pModalOverlayElement._iframe_eventhandler_onload = function (evt) {
		if (window.event) {
			evt = window.event;
		}
		var node = evt.target;
		if (!node) {
			return;
		}

		try {
			var _doc = node.contentDocument || node.contentWindow.document;
			if (this._linked_element) {
				nexacro._observeSysEvent(_doc, "mousemove", "onmousemove", this._linked_element._iframe_eventhandler_onmousemove);
			}
		}
		catch (e) {
			;
		}
	};

	_pModalOverlayElement._iframe_eventhandler_onmousemove = function (evt) {
		return nexacro._syshandler_onmousemove(window.nexacro_HTMLSysEvent, null, evt);
	};

	_pModalOverlayElement.destroy = function () {
		if (!this.handle) {
			return;
		}

		var _win = this.linkedcontrol._getWindow();
		var owner_elem = _win.frame.getElement();
		this._destroyBackgroundElement(this.handle);
		nexacro.__removeDOMNode(owner_elem.dest_handle, this.handle);
		this.handle = null;

		if (this._frame_node) {
			this._frame_node._linked_element = null;
		}

		nexacro._destroyFrameNode(this.handle, this._frame_node);
		this._frame_node = null;
	};

	_pModalOverlayElement.setElementSize = function (width, height) {
		nexacro.Element.prototype.setElementSize.call(this, width, height);
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
		_pModalOverlayElement._createBackgroundElement = function (_doc, overlay_handle) {
			var background = this.background;
			var background_handle = _doc.createElement("div");
			nexacro.__setDOMStyle_PercentageSize(background_handle.style, 100, 100);
			if (background) {
				nexacro.__setDOMStyle_BackgroundObject(overlay_handle.style, null);
				nexacro.__setDOMStyle_BackgroundObject(background_handle.style, background);
			}
			nexacro.__setDOMStyle_Filter(background_handle.style, 50);
			nexacro.__appendDOMNode(overlay_handle, background_handle);
			this._background_handle = background_handle;
		};

		_pModalOverlayElement._destroyBackgroundElement = function (handle) {
			var background_handle = this._background_handle;
			if (background_handle) {
				nexacro.__removeDOMNode(handle, background_handle);
			}
			this._background_handle = null;
		};
	}
	else {
		_pModalOverlayElement._createBackgroundElement = nexacro._emptyFn;
		_pModalOverlayElement._destroyBackgroundElement = nexacro._emptyFn;
	}

	_pModalOverlayElement._getRootWindowHandle = function () {
		return this._doc;
	};



	nexacro._ContainerElement = function (parent_elem, use_translate_scroll, type) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this._use_translate_scroll = (use_translate_scroll === false) ? use_translate_scroll : nexacro._use_translate_scroll;
		this.type = (type) ? type : "";
	};

	var __pContainerElement = nexacro._createPrototype(nexacro.Element, nexacro._ContainerElement);
	nexacro._ContainerElement.prototype = __pContainerElement;
	__pContainerElement._type_name = "ContainerElement";

	__pContainerElement._scroll_left = 0;
	__pContainerElement._scroll_top = 0;
	__pContainerElement._scroll_maxwidth = 0;
	__pContainerElement._scroll_maxheight = 0;
	__pContainerElement._is_nc_element = true;
	__pContainerElement._use_translate_scroll = nexacro._use_translate_scroll;
	__pContainerElement._use_container_move = true;

	var _bind_container_scroll_handler = function (elem) {
		return function (evt) {
			if (!evt && window.event) {
				evt = window.event;
			}

			var target = evt.srcElement || evt.target;
			if (!target) {
				return;
			}

			if (elem._use_translate_scroll) {
				target.scrollLeft = 0;
				target.scrollTop = 0;
			}
			else {
				elem._scroll_left = target.scrollLeft;
				elem._scroll_top = target.scrollTop;
				elem._scroll_maxwidth = target.scrollWidth;
				elem._scroll_maxheight = target.scrollHeight;
			}
		};
	};

	__pContainerElement.create = function (win) {
		var owner_elem = this.parent_elem;
		if (owner_elem && owner_elem.handle && !this.handle) {
			this.owner_elem = owner_elem;
			var _doc = win ? win._doc : owner_elem._getRootWindowHandle();
			var handle = _doc.createElement("div");
			this.name = owner_elem.name + ":container" + this.type;
			handle._linked_element = this;
			this.handle = handle;

			if (this._use_native_scroll) {
				nexacro.__setDOMNode_ClassName(handle, "nexacontainer nexanativescroll");
				nexacro.__setDOMNode_Id(handle, "", "nexacontainer");
			}
			else {
				nexacro.__setDOMNode_ClassName(handle, "nexacontainer");
				nexacro.__setDOMNode_Id(handle, "", "nexacontainer");
			}

			var dest_handle;
			if (this._use_translate_scroll) {
				dest_handle = _doc.createElement("div");
				this.dest_handle = dest_handle;

				nexacro.__setDOMNode_ClassName(dest_handle, "nexainnercontainer");
				nexacro.__setDOMNode_Id(dest_handle, "", "nexacontainer");
				nexacro.__appendDOMNode(handle, dest_handle);
			}
			else {
				this.dest_handle = handle;
			}

			var handle_style = handle.style;
			nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
			if (this.width && this.height) {
				nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);
			}

			if (this._use_translate_scroll) {
				var scroll_maxwidth = this._scroll_maxwidth || this.parent._scroll_maxwidth;
				var scroll_maxheight = this._scroll_maxheight || this.parent._scroll_maxheight;
				if (scroll_maxwidth && scroll_maxheight) {
					nexacro.__setDOMStyle_Size(dest_handle.style, scroll_maxwidth, scroll_maxheight);
				}

				if (this._scroll_left != 0 || this._scroll_top != 0) {
					nexacro.__setDOMStyle_Translate(dest_handle.style, -this._scroll_left, -this._scroll_top);
				}
			}
			else {
				if (this._scroll_left) {
					nexacro.__setDOMNode_HScrollPos(handle, this._scroll_left);
				}
				if (this._scroll_top) {
					nexacro.__setDOMNode_VScrollPos(handle, this._scroll_top);
				}
			}

			var scroll_type = this._scroll_type;
			nexacro.__setDOMStyle_ScrollLimitX(handle.style, scroll_type & 0x01);
			nexacro.__setDOMStyle_ScrollLimitY(handle.style, scroll_type & 0x10);

			nexacro.__appendDOMNode(owner_elem.dest_handle, handle);

			this._syshandler_onscroll_forward = _bind_container_scroll_handler(this);
			nexacro._observeSysEvent(handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
		}
	};

	__pContainerElement.createCommandStart = function () {
		var owner_elem = this.parent_elem;
		if (owner_elem && !this.handle) {
			this.owner_elem = owner_elem;
			this.name = owner_elem.name + ":container" + this.type;
			var str = "<div";
			str += this._use_native_scroll ? " class='nexacontainer nexanativescroll'" : " class='nexacontainer'";
			str += " id='" + this.name + "' ";
			var style_str = this._getCommonStyleStr();
			str += " style='";
			str += style_str;
			var scroll_type = this._scroll_type;
			if (scroll_type & 0x01) {
				str += nexacro.__getHTMLStyle_ScrollLimitX(true);
			}
			if (scroll_type & 0x10) {
				str += nexacro.__getHTMLStyle_ScrollLimitY(true);
			}
			str += "'>";
			if (this._use_translate_scroll) {
				str += "<div class='nexainnercontainer' style='width : " + (this._scroll_maxwidth ? this._scroll_maxwidth : this.width) + "px; height : " + (this._scroll_maxheight ? this._scroll_maxheight : this.height) + "px;'>";
			}

			return str;
		}
		return "";
	};
	__pContainerElement.createCommandEnd = function () {
		if (this._use_translate_scroll) {
			return "</div></div>";
		}
		return "</div>";
	};

	__pContainerElement.attachHandle = function (win) {
		if (this.name && !this.handle) {
			var handle = win._doc.getElementById(this.name);
			if (handle) {
				this.handle = handle;
				if (this._use_translate_scroll) {
					this.dest_handle = handle.firstChild;
				}
				else {
					this.dest_handle = handle;
				}

				this._syshandler_onscroll_forward = _bind_container_scroll_handler(this);
				nexacro._observeSysEvent(handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			}
		}
	};

	__pContainerElement._setElementVScrollPos = function (vpos) {
		if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
			this._scroll_top = vpos;
			if (this._use_translate_scroll) {
				var inner_handle = this.dest_handle;
				if (inner_handle) {
					nexacro.__setDOMStyle_Translate(inner_handle.style, -this._scroll_left, -vpos);
				}
			}
			else if (this._use_container_move) {
				var handle = this.handle;
				if (handle) {
					if (this._cached_scrollTop != vpos) {
						nexacro.__setDOMNode_VScrollPos(handle, vpos);
					}
				}
			}
		}
	};

	__pContainerElement._setElementHScrollPos = function (hpos) {
		if (this._scroll_left != hpos || this.parent._reset_scrollpos) {
			this._scroll_left = hpos;
			if (this._use_translate_scroll) {
				var inner_handle = this.dest_handle;
				if (inner_handle) {
					nexacro.__setDOMStyle_Translate(inner_handle.style, -hpos, -this._scroll_top);
				}
			}
			else if (this._use_container_move) {
				var handle = this.handle;
				if (handle) {
					if (this._cached_scrollLeft != hpos) {
						nexacro.__setDOMNode_HScrollPos(handle, hpos);
					}
				}
			}
		}
	};

	__pContainerElement._setElementScrolltype = function (scrolltype) {
		this._scroll_type = scrolltype;
		var handle = this.handle;
		if (handle) {
			nexacro.__setDOMStyle_ScrollLimitX(handle.style, scrolltype & 0x10);
			nexacro.__setDOMStyle_ScrollLimitY(handle.style, scrolltype & 0x01);
		}
	};

	__pContainerElement._setElementScrollPos = function (hpos, vpos) {
		if (this._scroll_left != hpos || this._scroll_top != vpos || this.parent._reset_scrollpos) {
			this._scroll_left = hpos;
			this._scroll_top = vpos;
			if (this._use_translate_scroll) {
				var inner_handle = this.dest_handle;
				if (inner_handle) {
					nexacro.__setDOMStyle_Translate(inner_handle.style, -hpos, -vpos);
				}
			}
			else if (this._use_container_move) {
				var handle = this.handle;
				if (handle) {
					if (this._cached_scrollTop != vpos) {
						nexacro.__setDOMNode_VScrollPos(handle, vpos);
					}
					if (this._cached_scrollLeft != hpos) {
						nexacro.__setDOMNode_HScrollPos(handle, hpos);
					}
				}
			}
		}
	};

	__pContainerElement.setElementScrollMaxSize = function (width, height) {
		this._scroll_maxwidth = width;
		this._scroll_maxheight = height;
		if (this._use_translate_scroll) {
			var inner_handle = this.dest_handle;
			if (inner_handle) {
				nexacro.__setDOMStyle_Size(inner_handle.style, width, height);
			}
		}
	};

	__pContainerElement.getElementScrollLeft = function () {
		return this._scroll_left;
	};
	__pContainerElement.getElementScrollTop = function () {
		return this._scroll_top;
	};

	__pContainerElement.getElementScrollWidth = function () {
		return this._scroll_maxwidth;
	};
	__pContainerElement.getElementScrollHeight = function () {
		return this._scroll_maxheight;
	};































	__pContainerElement.destroy = function () {
		var handle = this.handle;
		if (handle) {
			nexacro._stopSysObserving(handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
		}

		this._destroyElementHandle();

		this.owner_elem = null;
		this.dest_handle = null;
		this.parent = null;
		this.parent_elem = null;
	};

	if (nexacro._Browser == "IE") {
		if (nexacro._BrowserVersion <= 8) {
			__pContainerElement._syshandler_onscroll_forward = function (evt) {
				if ((!evt || evt.type != "scroll") && window.event) {
					evt = window.event;
				}
				if (evt.type != "scroll") {
					return;
				}

				var target = evt.srcElement;
				if (!target) {
					return;
				}

				var container = target._linked_element;
				if (container) {
					var parent_elem = container.parent;
					var retn = false;

					if (parent_elem._recover_vpos != undefined) {
						target.scrollTop = parent_elem._recover_vpos;
						retn = true;
					}
					if (parent_elem._recover_hpos != undefined) {
						target.scrollLeft = parent_elem._recover_hpos;
						retn = true;
					}

					if (retn) {
						return;
					}

					var elem_scroll_top = container._scroll_top | 0;
					var elem_scroll_left = container._scroll_left | 0;

					container._cached_scrollLeft = target.scrollLeft;
					container._cached_scrollTop = target.scrollTop;

					var hscroll_pos = container._cached_scrollLeft;
					var vscroll_pos = container._cached_scrollTop;

					var linkedcontrol = container._findScrollbarControl(container, false);

					var bhscroll = false;
					var bvscroll = false;
					if (linkedcontrol) {
						if (elem_scroll_left != container._cached_scrollLeft) {
							if (linkedcontrol.scrollbartype != "none" && linkedcontrol.scrollbartype != "vertical") {
								bhscroll = true;
							}
						}

						if (elem_scroll_top != container._cached_scrollTop) {
							if (linkedcontrol.scrollbartype != "none" && linkedcontrol.scrollbartype != "horizontal") {
								bvscroll = true;
							}
						}

						if (bhscroll || bvscroll) {
							linkedcontrol._scrollTo(bhscroll ? hscroll_pos : null, bvscroll ? vscroll_pos : null);
						}
					}
				}
			};
		}
		else {
			__pContainerElement._syshandler_onscroll_forward = function (evt) {
				if ((!evt || evt.type != "scroll") && window.event) {
					evt = window.event;
				}
				if (evt.type != "scroll") {
					return;
				}

				var target = evt.srcElement;
				if (!target) {
					return;
				}

				var container = target._linked_element;
				if (container) {
					var parent_elem = container.parent;
					var retn = false;

					if (parent_elem._recover_vpos != undefined) {
						target.scrollTop = parent_elem._recover_vpos;
						parent_elem._recover_vpos = undefined;
						retn = true;
					}
					if (parent_elem._recover_hpos != undefined) {
						target.scrollLeft = parent_elem._recover_hpos;
						parent_elem._recover_hpos = undefined;
						retn = true;
					}

					if (retn) {
						return;
					}

					var elem_scroll_top = container._scroll_top | 0;
					var elem_scroll_left = container._scroll_left | 0;

					container._cached_scrollLeft = target.scrollLeft;
					container._cached_scrollTop = target.scrollTop;

					var hscroll_pos = container._cached_scrollLeft;
					var vscroll_pos = container._cached_scrollTop;

					var linkedcontrol = container._findScrollbarControl(container, false);

					var bhscroll = false;
					var bvscroll = false;
					if (linkedcontrol) {
						if (elem_scroll_left != container._cached_scrollLeft) {
							if (linkedcontrol.scrollbartype != "none" && linkedcontrol.scrollbartype != "vertical") {
								bhscroll = true;
							}
						}

						if (elem_scroll_top != container._cached_scrollTop) {
							if (linkedcontrol.scrollbartype != "none" && linkedcontrol.scrollbartype != "horizontal") {
								bvscroll = true;
							}
						}

						if (bhscroll || bvscroll) {
							linkedcontrol._scrollTo(bhscroll ? hscroll_pos : null, bvscroll ? vscroll_pos : null);
						}
					}
				}
			};
		}
	}
	else {
		__pContainerElement._syshandler_onscroll_forward = function (evt) {
			var target = evt.target;
			var container = target._linked_element;
			if (container) {
				var parent_elem = container.parent;

				if (parent_elem._recover_vpos != undefined) {
					target.scrollTop = parent_elem._recover_vpos;
					parent_elem._recover_vpos = undefined;
					return;
				}
				if (parent_elem._recover_hpos != undefined) {
					target.scrollLeft = parent_elem._recover_hpos;
					parent_elem._recover_hpos = undefined;
					return;
				}

				var elem_scroll_top = container._scroll_top | 0;
				var elem_scroll_left = container._scroll_left | 0;

				container._cached_scrollLeft = target.scrollLeft;
				container._cached_scrollTop = target.scrollTop;

				var hscroll_pos = container._cached_scrollLeft;
				var vscroll_pos = container._cached_scrollTop;

				var linkedcontrol = container._findScrollbarControl(container, false);

				var bhscroll = false;
				var bvscroll = false;
				if (linkedcontrol) {
					if (elem_scroll_left != container._cached_scrollLeft) {
						if (linkedcontrol.scrollbartype != "none" && linkedcontrol.scrollbartype != "vertical") {
							bhscroll = true;
						}
					}

					if (elem_scroll_top != container._cached_scrollTop) {
						if (linkedcontrol.scrollbartype != "none" && linkedcontrol.scrollbartype != "horizontal") {
							bvscroll = true;
						}
					}

					if (bhscroll || bvscroll) {
						linkedcontrol._scrollTo(bhscroll ? hscroll_pos : null, bvscroll ? vscroll_pos : null);
					}
				}
			}
		};
	}

	__pContainerElement._findScrollbarControl = function (elem, is_vert) {
		while (elem) {
			var linkedcontrol = elem.linkedcontrol;
			if (linkedcontrol) {
				return linkedcontrol;
			}

			elem = elem.parent;
		}

		return null;
	};

	__pContainerElement.clearContents = function () {
		var handle = this.handle;
		if (handle) {
			nexacro._stopSysObserving(handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			handle._linked_element = null;

			var dest_handle = (this.owner_elem ? this.owner_elem.dest_handle : null);
			nexacro.__removeDOMNode(dest_handle, handle);

			this.owner_elem = null;
			this.handle = this.dest_handle = null;
		}
	};

	__pContainerElement.appendChildElement = function (child_elem) {
		if (this.handle) {
			if (child_elem.parent_elem != this.parent_elem) {
				if (child_elem.handle) {
					var old_doc = child_elem._getRootWindowHandle();
					var new_doc = this._getRootWindowHandle();
					if (old_doc != new_doc) {
						child_elem.parent_elem = this.parent_elem;
						child_elem._removeFromContainer();
					}
					else {
						child_elem.parent_elem = this.parent_elem;
					}
				}
				else {
					child_elem.parent_elem = this.parent_elem;
				}
			}

			if (!child_elem.handle) {
				child_elem.create();
			}
			else {
				child_elem._appendToContainer(this);
			}
		}
	};
	__pContainerElement.removeChildElement = function (child_elem) {
		if (child_elem.owner_elem == this) {
			child_elem._removeFromContainer();
		}
	};



	__pContainerElement._moveToNextElement = function (elem, base_elem) {
		if (elem && base_elem && elem.owner_elem == this && base_elem.owner_elem == this && elem.handle && base_elem.handle) {
			nexacro.__moveDOMNodeToNext(elem.handle, base_elem.handle);
		}
	};
	__pContainerElement._moveToPrevElement = function (elem, base_elem) {
		if (elem && base_elem && elem.owner_elem == this && base_elem.owner_elem == this && elem.handle && base_elem.handle) {
			nexacro.__moveDOMNodeToPrev(elem.handle, base_elem.handle);
		}
	};
	__pContainerElement._sendToBackElement = function (elem) {
		if (elem && elem.owner_elem == this && elem.handle) {
			nexacro.__sendDOMNodeToBack(elem.handle);
		}
	};
	__pContainerElement._bringToFrontElement = function (elem) {
		if (elem && elem.owner_elem == this && elem.handle) {
			nexacro.__bringDOMNodeToFront(elem.handle);
		}
	};

	__pContainerElement._getElementClassName = function () {
		return this._use_native_scroll ? "nexacontainer nexanativescroll" : "nexacontainer";
	};



	__pContainerElement.setElementZoom = function (zoomfactor) {
		this.zoom = zoomfactor;
		var handle = this.handle;
		if (handle) {
			nexacro.__setDOMStyle_TransformScale(handle.style, zoomfactor / 100);
		}
	};


	nexacro.PluginElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;

		this._params = new nexacro.Collection();
		this._events = new nexacro.Collection();
	};

	var _pPluginElement = nexacro._createPrototype(nexacro.Element, nexacro.PluginElement);
	nexacro.PluginElement.prototype = _pPluginElement;
	_pPluginElement._type_name = "PluginElement";

	_pPluginElement.license = "";
	_pPluginElement.lpkpath = "";
	_pPluginElement.classid = "";
	_pPluginElement.codebase = "";
	_pPluginElement.code = "";
	_pPluginElement.archive = "";
	_pPluginElement.mimetype = "";

	_pPluginElement.pluginsrc = "";
	_pPluginElement.plugintype = "";
	_pPluginElement.pluginpage = "";

	_pPluginElement.windowed = false;
	_pPluginElement.popupstyle = false;

	_pPluginElement.enable = true;
	_pPluginElement.font = null;
	_pPluginElement.color = null;
	_pPluginElement.cursor = null;
	_pPluginElement.align = null;
	_pPluginElement.padding = null;
	_pPluginElement.color = null;

	_pPluginElement._object_node = null;
	_pPluginElement._embed_node = null;
	_pPluginElement._params = null;
	_pPluginElement._events = null;
	_pPluginElement._object_id = null;

	_pPluginElement.create = function () {
		var owner_elem;
		var _doc;
		if (!this.parent_elem) {
			_doc = nexacro._managerFrameDoc;
			owner_elem = _doc.body;
			this.owner_elem = _doc.body;
			this.owner_elem.dest_handle = _doc.body;
		}
		else {
			owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && owner_elem.handle && !this.handle) {
				this.owner_elem = owner_elem;
				_doc = owner_elem._getRootWindowHandle();
			}
		}


		if (owner_elem && !this.handle) {
			var handle = this._createObjectElementHandle(_doc, this.left, this.top, this.width, this.height, this._params);
			nexacro.__setDOMNode_Selectable(handle, false);
			var handle_style = handle.style;
			if (!this.visible) {
				nexacro.__setDOMStyle_Visible(handle_style, false);
			}

			this.handle = this.dest_handle = handle;

			var events = this._events;
			var event_cnt = events.length;
			for (var i = 0; i < event_cnt; i++) {
				this.addEventHandler(events.get_id(i), events.get_item(i), null);
			}

			nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
		}
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserType != "Edge") {
		_pPluginElement.createCommand = function () {
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this._created) {
				var handle_style = this._getCommonStyleStr();
				var width = this.width;
				var height = this.height;
				this.owner_elem = owner_elem;
				this.name = owner_elem.name + ":" + this._type_name;
				var str = "";

				if (this.lpkpath) {
					str += '<object classid = "clsid:5220cb21-c88d-11cf-b347-00aa00a28331" id = "' + this.name + '">';
					str += '<param name="LPKPath" value="' + this.lpkpath + '">';
					str += '<embed src= "' + this.lpkpath + '" ></embed>';
					str += '</object>';
				}
				str += '<object id="' + this.name + '" ';

				var classid = this.classid;
				if (classid) {
					str += 'classid="' + classid + '" ';
				}

				var codebase = this.codebase;
				if (codebase) {
					str += 'codebase="' + codebase + '" ';
				}

				var code = this.code;
				if (code) {
					str += 'code="' + code + '" ';
				}

				var archive = this.archive;
				if (archive) {
					str += 'archive="' + archive + '" ';
				}

				var mimetype = this.mimetype;
				if (mimetype) {
					str += 'type="' + mimetype + '" ';
				}

				var data = this.data;
				if (data) {
					str += 'data="' + data + '" ';
				}
				str += (handle_style) ? (" style='" + handle_style + "'>") : ">";
				var params = this._params;
				var param_cnt = (params ? params.length : 0);
				for (var i = 0; i < param_cnt; i++) {
					str += '<param name="' + params.get_id(i) + '" value="' + params.get_item(i) + '" />';
				}

				var has_embed_node = false;
				if (nexacro._BrowserVersion >= 9) {
					if (this.pluginsrc || this.pluginpage) {
						has_embed_node = true;
						str += '<embed width="' + width + '" height="' + height + '" ';

						var pluginsrc = this.pluginsrc;
						if (pluginsrc) {
							str += 'src="' + pluginsrc + '" ';
						}

						var pluginpage = this.pluginpage;
						if (pluginpage) {
							str += 'pluginspage="' + pluginpage + '" ';
						}

						var plugintype = this.plugintype;
						if (plugintype) {
							str += 'type="' + plugintype + '" ';
						}
						for (i = 0; i < param_cnt; i++) {
							str += params.get_id(i) + '="' + params.get_item(i) + '" ';
						}
						str += '/>';
					}
				}
				str += "</object></div>";
				return str;
			}
			return "";
		};
	}
	else {
		_pPluginElement.createCommand = function () {
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && !this._created) {
				this.owner_elem = owner_elem;
				this.name = owner_elem.name + ":" + this._type_name;
				var handle_style = this._getCommonStyleStr();
				var str = "<object id = '" + this.name + "'";
				str += this.codebase ? "codebase = '" + this.codebase + "'" : "";
				str += this.code ? "code = '" + this.code + "'" : "";
				str += this.archive ? "archive = '" + this.archive + "'" : "";
				str += this.mimetype ? "mimetype = '" + this.mimetype + "'" : "";
				str += this.movie ? "data = '" + this.movie + "'" : "";
				str += (handle_style) ? (" style='" + handle_style + "'/>") : "/>";
				var params = this._params;
				var param_cnt = (params ? params.length : 0);

				for (var i = 0; i < param_cnt; i++) {
					str += "<param name ='" + params.get_id(i) + "' value ='" + params.get_item(i) + "'/>";
				}
				if (this.pluginsrc || this.pluginpage) {
					str += "<embed ";
					str += this.pluginsrc ? "src = '" + this.pluginsrc + "'" : "";
					str += this.pluginpage ? "pluginpage = '" + this.pluginpage + "'" : "";
					str += this.plugintype ? "type = '" + this.plugintype + "'" : "";
					for (i = 0; i < param_cnt; i++) {
						str += " " + params.get_id(i) + " = '" + params.get_item(i) + "' ";
					}
					str += "/></embed>";
				}
				str += "</object>";
				return str;
			}
			return "";
		};
	}
	_pPluginElement.attachHandle = function (win) {
		var object_node = null;
		var handle = this.handle = win._doc.getElementById(this.name);
		if (handle) {
			this._object_node = handle;

			if (handle) {
				var embed_node = null;
				var nodes = handle.getElementsByTagName("embed");
				if (nodes && nodes.length > 0) {
					embed_node = nodes[0];
				}
				this._embed_node = embed_node;
			}
		}
	};

	_pPluginElement.destroy = function () {
		var handle = this.handle;
		if (handle) {
			handle._linked_element = null;

			var _owner_handle = null;
			if (this.owner_elem && this.owner_elem.dest_handle) {
				_owner_handle = this.owner_elem.dest_handle;
			}

			if (!this.owner_elem || _owner_handle) {
				nexacro.__removeDOMNode(_owner_handle, handle);
			}

			this.owner_elem = null;
			this.handle = this.dest_handle = null;
			this._object_node = null;
			this._embed_node = null;
		}
		this.parent = null;
		this.parent_elem = null;

		var params = this._params;
		if (params) {
			params.destroy();
			this._params = null;
		}

		var events = this._events;
		if (events) {
			events.destroy();
			this._events = null;
		}
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserType != "Edge") {
		_pPluginElement._createObjectElementHandle = function (_doc, left, top, width, height, params) {
			var handle = _doc.createElement("div");

			handle._linked_element = this;

			var handle_style = handle.style;
			nexacro.__setDOMStyle_Pos(handle_style, left, top);
			nexacro.__setDOMStyle_Size(handle_style, width, height);

			var innerHtml = "";
			if (this.lpkpath) {
				innerHtml += '<object classid = "clsid:5220cb21-c88d-11cf-b347-00aa00a28331">';
				innerHtml += '<param name="LPKPath" value="' + this.lpkpath + '">';
				innerHtml += '<embed src= "' + this.lpkpath + '" ></embed>';
				innerHtml += '</object>';
			}

			if (this.parent_elem && this.component) {
				this._object_id = this.parent_elem.handle.id + '_' + this.component._type_name;
				innerHtml += '<object id=' + this._object_id + ' style="position: absolute; overflow: hidden; width: ' + width + 'px; height: ' + height + 'px;" ';
			}
			else {
				innerHtml += '<object style="position: absolute; overflow: hidden; width: ' + width + 'px; height: ' + height + 'px;" ';
			}

			var classid = this.classid;
			if (classid) {
				innerHtml += 'classid="' + classid + '" ';
			}

			var codebase = this.codebase;
			if (codebase) {
				innerHtml += 'codebase="' + codebase + '" ';
			}

			var code = this.code;
			if (code) {
				innerHtml += 'code="' + code + '" ';
			}

			var archive = this.archive;
			if (archive) {
				innerHtml += 'archive="' + archive + '" ';
			}

			var mimetype = this.mimetype;
			if (mimetype) {
				innerHtml += 'type="' + mimetype + '" ';
			}

			var data = this.data;
			if (data) {
				innerHtml += 'data="' + data + '" ';
			}
			innerHtml += '>';

			var param_cnt = (params ? params.length : 0);
			for (var i = 0; i < param_cnt; i++) {
				innerHtml += '<param name="' + params.get_id(i) + '" value="' + params.get_item(i) + '" />';
			}

			var has_embed_node = false;
			if (nexacro._BrowserVersion >= 9) {
				if (this.pluginsrc || this.pluginpage) {
					has_embed_node = true;
					innerHtml += '<embed width="' + width + '" height="' + height + '" ';

					var pluginsrc = this.pluginsrc;
					if (pluginsrc) {
						innerHtml += 'src="' + pluginsrc + '" ';
					}

					var pluginpage = this.pluginpage;
					if (pluginpage) {
						innerHtml += 'pluginspage="' + pluginpage + '" ';
					}

					var plugintype = this.plugintype;
					if (plugintype) {
						innerHtml += 'type="' + plugintype + '" ';
					}
					for (i = 0; i < param_cnt; i++) {
						innerHtml += params.get_id(i) + '="' + params.get_item(i) + '" ';
					}
					innerHtml += '/>';
				}
			}
			innerHtml += "</object>";

			handle.innerHTML = innerHtml;

			var object_node = null;
			var child_node = handle.firstChild;
			while (child_node) {
				if (child_node.nodeType == 1 && child_node.tagName.toLowerCase() == "object") {
					object_node = child_node;
				}
				child_node = child_node.nextSibling;
			}

			this._object_node = object_node;

			if (object_node && has_embed_node) {
				var embed_node = null;
				var nodes = object_node.getElementsByTagName("embed");
				if (nodes && nodes.length > 0) {
					embed_node = nodes[0];
				}
				this._embed_node = embed_node;
			}
			return handle;
		};
	}
	else {
		_pPluginElement._createObjectElementHandle = function (_doc, left, top, width, height, params) {
			var handle = _doc.createElement("object");

			handle._linked_element = this;

			var handle_style = handle.style;
			nexacro.__setDOMStyle_Pos(handle_style, left, top);
			nexacro.__setDOMStyle_Size(handle_style, width, height);

			var codebase = this.codebase;
			if (codebase) {
				nexacro.__setHTMLAttr_Proeprty(handle, 'codebase', codebase);
			}

			var code = this.code;
			if (code) {
				nexacro.__setHTMLAttr_Proeprty(handle, 'code', code);
			}

			var movie = this.movie;
			if (movie) {
				nexacro.__setHTMLAttr_Proeprty(handle, 'data', movie);
			}

			var archive = this.archive;
			if (archive) {
				nexacro.__setHTMLAttr_Proeprty(handle, 'archive', archive);
			}

			if (nexacro._Browser == "Chrome" || nexacro._BrowserType == "Edge") {
				var mimetype = this.mimetype;
				if (mimetype) {
					nexacro.__setHTMLAttr_Proeprty(handle, 'mimetype', mimetype);
				}
			}

			var param_cnt = (params ? params.length : 0);
			for (var i = 0; i < param_cnt; i++) {
				this._setObjectDOMParam(_doc, handle, params.get_id(i), params.get_item(i));
			}

			if (this.pluginsrc || this.pluginpage) {
				var _embed_node = _doc.createElement("embed");

				var node_style = _embed_node.style;
				nexacro.__setDOMStyle_Absolute(node_style);
				nexacro.__setDOMStyle_Size(node_style, width, height);

				var pluginsrc = this.pluginsrc;
				if (pluginsrc) {
					nexacro.__setHTMLAttr_Proeprty(_embed_node, 'src', pluginsrc);
				}

				var pluginpage = this.pluginpage;
				if (pluginpage) {
					nexacro.__setHTMLAttr_Proeprty(_embed_node, 'pluginspage', pluginpage);
				}

				var plugintype = this.plugintype;
				if (plugintype) {
					nexacro.__setHTMLAttr_Proeprty(_embed_node, 'type', plugintype);
				}

				for (i = 0; i < param_cnt; i++) {
					nexacro.__setHTMLAttr_Proeprty(_embed_node, params.get_id(i), params.get_item(i));
				}

				this._embed_node = _embed_node;
				nexacro.__appendDOMNode(handle, _embed_node);
			}

			this._object_node = handle;
			return handle;
		};
	}

	_pPluginElement._setObjectDOMParam = function (_doc, target_handle, name, value) {
		var param_node = _doc.createElement("param");
		nexacro.__setHTMLAttr_Proeprty(param_node, "name", name);
		nexacro.__setHTMLAttr_Proeprty(param_node, "value", value);
		nexacro.__appendDOMNode(target_handle, param_node);
	};

	_pPluginElement.on_update_position = function (resize_flag, move_flag, newleft, newtop) {
		var handle = this._object_node;
		if (handle) {
			var handle_style = handle.style;

			nexacro.__setDOMStyle_Absolute(handle_style);
			if (move_flag) {
				nexacro.__setDOMStyle_Pos(handle_style, newleft, newtop);
			}
			if (resize_flag) {
				nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);
			}
		}
	};

	_pPluginElement.setElementFocus = function (selffocus) {
		var handle = this._object_node;
		if (handle) {
			nexacro.__setDOMNode_Focus(handle, true);
			nexacro.__setLastFocusedElement(this);
		}
	};

	_pPluginElement.setElementLicense = function (license) {
		if (this.license != license) {
			this.license = license;
		}
	};

	_pPluginElement.setElementLicenseFile = function (lpkpath) {
		if (!this.handle && this.lpkpath != lpkpath) {
			this.lpkpath = lpkpath;
		}
	};

	_pPluginElement.setElementMIMEType = function (mimetype) {
		if (this.mimetype != mimetype) {
			this.mimetype = mimetype;
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLAttr_Proeprty(object_node, 'mimetype', mimetype);
			}
		}
		if (this.plugintype != mimetype) {
			this.plugintype = mimetype;

			var object_node = this._object_node;
			if (object_node) {
				var _embed_node = this._embed_node;
				if (_embed_node == null) {
					var _doc = this._getRootWindowHandle();
					this._embed_node = _embed_node = _doc.createElement("embed");
					nexacro.__appendDOMNode(object_node, _embed_node);
				}
				nexacro.__setHTMLAttr_Proeprty(_embed_node, 'type', mimetype);
			}
		}
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserType != "Edge") {
		_pPluginElement.setElementClassId = function (classid) {
			if (classid) {
				if (classid.charAt(0) == '{') {
					var clsid = classid.replace(/\{|\}/g, "");
					classid = "clsid:" + clsid;
				}
			}

			if (this.classid != classid) {
				this.classid = classid;

				var object_node = this._object_node;
				if (object_node) {
					nexacro.__setHTMLAttr_Proeprty(object_node, 'classid', classid);
				}
			}
		};
	}
	else {
		_pPluginElement.setElementClassId = nexacro._emptyFn;
	}

	_pPluginElement.setElementCodebase = function (codebase) {
		if (this.codebase != codebase) {
			this.codebase = codebase;
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLAttr_Proeprty(object_node, 'codebase', codebase);
			}
		}
	};

	_pPluginElement.setElementCode = function (code) {
		if (this.code != code) {
			this.code = code;
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLAttr_Proeprty(object_node, 'code', code);
			}
		}
	};

	_pPluginElement.setElementArchive = function (archive) {
		if (this.archive != archive) {
			this.archive = archive;
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLAttr_Proeprty(object_node, 'archive', archive);
			}
		}
	};

	_pPluginElement.getElementParam = function (name) {
		var handle = this.handle;
		var object_node = this._object_node;
		if (handle && object_node) {
			var param = object_node.getElementsByTagName("param");
			for (var i in param) {
				if (param[i].name == name) {
					return param[i].value;
				}
			}
			if (object_node[name]) {
				return this._object_node[name];
			}
		}
		else {
			var params = this._params;
			return params.get_item(name);
		}
	};

	_pPluginElement.setElementParam = function (name, value) {
		var obj_node = this._object_node;
		if (this.handle && obj_node) {
			var _doc = this._getRootWindowHandle();
			var param = obj_node.getElementsByTagName("param");
			for (var i in param) {
				if (param[i].name == name) {
					param[i].value = value;
					this._object_node[name] = value;
					return;
				}
			}
			this._setObjectDOMParam(_doc, obj_node, name, value);
			this._object_node[name] = value;
		}
		else {
			var params = this._params;
			if (params.get_item(name)) {
				params.set_item(name, value);
			}
			else {
				params.add_item(name, value);
			}
		}
	};

	_pPluginElement.setElementPluginSrc = function (src) {
		if (this.pluginsrc != src) {
			this.pluginsrc = src;
			var object_node = this._object_node;
			if (object_node) {
				var embed_node = this._embed_node;
				if (embed_node == null) {
					var _doc = this._getRootWindowHandle();
					this._embed_node = embed_node = _doc.createElement("embed");
					var embed_node_style = embed_node.style;
					nexacro.__setDOMStyle_Absolute(embed_node_style);
					nexacro.__setDOMStyle_Pos(embed_node_style, this.left, this.top);
					nexacro.__setDOMStyle_Size(embed_node_style, this.width, this.height);
					nexacro.__setHTMLAttr_Proeprty(embed_node, 'src', src);
					nexacro.__appendDOMNode(object_node, embed_node);
				}
				else {
					nexacro.__setHTMLAttr_Proeprty(embed_node, 'src', src);
					nexacro.__removeDOMNode(object_node, embed_node);
					nexacro.__appendDOMNode(object_node, embed_node);
				}
			}
		}
	};

	_pPluginElement._setElementPluginName = nexacro._emptyFn;

	_pPluginElement.setElementPluginMIMEType = function (type) {
		if (this.plugintype != type) {
			this.plugintype = type;
			var object_node = this._object_node;
			if (object_node) {
				var embed_node = this._embed_node;
				if (embed_node == null) {
					var _doc = this._getRootWindowHandle();
					this._embed_node = embed_node = _doc.createElement("embed");
					nexacro.__appendDOMNode(object_node, embed_node);
				}
				nexacro.__setHTMLAttr_Proeprty(embed_node, 'type', type);
			}
		}
	};

	_pPluginElement.callMethod = function () {
		if (arguments.length < 1) {
			return;
		}

		if (this.handle && this._object_node) {
			var fn_name = Array.prototype.shift.call(arguments);
			var str;

			if (this._embed_node) {
				str = 'this._embed_node.' + fn_name;
			}
			else if (this._object_node) {
				str = 'this._object_node.' + fn_name;
			}
			else {
				str = this._object_id + '.' + fn_name;
			}

			str += '(';
			var len = arguments.length;
			if (len > 0) {
				str += 'arguments[0]';
				for (var i = 1; i < len; i++) {
					str += ', arguments[' + i + ']';
				}
			}
			str += ');';

			return eval(str);
		}
	};

	_pPluginElement._getPluginObject = function () {
		if (this.handle && this._object_node) {
			var obj = new nexacro._PluginObject();
			obj.handle = this._object_node;
			obj._doc = this._getRootWindowHandle();
			return obj;
		}
	};


	if (nexacro._Browser == "IE" && nexacro._BrowserType != "Edge") {
		_pPluginElement.addEventHandler = function (name, callback) {
			if (this.handle && this._object_node && this._object_id) {
				var _doc = this._getRootWindowHandle();
				var script_node = _doc.createElement("script");
				nexacro.__setHTMLAttr_Proeprty(script_node, 'for', this._object_id);

				var nameFromToStringRegex = /^function\s?([^\s(]*)/;
				var paramsFromToStringRegex = /\(.*?\)/;
				var params = callback.toString().match(paramsFromToStringRegex)[0];
				var eventValue = name + params;
				var callfunc = "";

				nexacro.__setHTMLAttr_Proeprty(script_node, 'event', eventValue);
				nexacro.__setHTMLAttr_Proeprty(script_node, 'language', 'javascript');

				var parentFrame, parentFrame2;
				parentFrame = this.component ? this.component.parent : null;
				if (parentFrame) {
					callfunc = "." + this.component.id + '["' + name + '"]; \n';
					callfunc += 'if (eventFn) eventFn._firePluginEvent' + params + ';';
					do {
						if (parentFrame instanceof nexacro.MainFrame) {
							callfunc = 'var eventFn = nexacro.getApplication().mainframe' + callfunc;
							break;
						}
						if (parentFrame instanceof nexacro.ChildFrame) {
							parentFrame2 = parentFrame.parent;
							if (parentFrame2) {
								if (parentFrame2 instanceof nexacro.FrameSet || 
									parentFrame2 instanceof nexacro.VFrameSet || 
									parentFrame2 instanceof nexacro.HFrameSet || 
									parentFrame2 instanceof nexacro.ChildFrame) {
									if (parentFrame2._frames && parentFrame2._frames.length) {
										var frmidx;
										var frmlen = parentFrame2._frames.length;
										for (frmidx = 0; frmidx < frmlen; frmidx++) {
											if (parentFrame2._frames[frmidx] == parentFrame) {
												callfunc = '._frames[' + frmidx + ']' + callfunc;
												break;
											}
										}
									}
								}
								else if (parentFrame2 instanceof nexacro.MainFrame) {
									callfunc = '.frame' + callfunc;
								}
								else if (parentFrame2 instanceof nexacro.Form) {
									callfunc = '.' + parentFrame.id + callfunc;
								}
							}
						}
						else if (parentFrame instanceof nexacro.FrameSet || 
							parentFrame instanceof nexacro.VFrameSet || 
							parentFrame instanceof nexacro.HFrameSet) {
							parentFrame2 = parentFrame.parent;
							if (parentFrame2) {
								if (parentFrame2._frames && parentFrame2._frames.length) {
									var frmidx;
									var frmlen = parentFrame2._frames.length;
									for (frmidx = 0; frmidx < frmlen; frmidx++) {
										if (parentFrame2._frames[frmidx] == parentFrame) {
											callfunc = '._frames[' + frmidx + ']' + callfunc;
											break;
										}
									}
								}
							}
						}
						else if (parentFrame instanceof nexacro.Div) {
							callfunc = '.' + parentFrame.id + callfunc;
						}
						else if (parentFrame instanceof nexacro.Form) {
							callfunc = '.form' + callfunc;
						}
						parentFrame = parentFrame.parent;
					} while (parentFrame);
				}
				nexacro.__setDOMNode_Text(script_node, callfunc);

				var owner_elem = this.parent_elem.getContainerElement(this.position_step);
				nexacro.__appendDOMNode(owner_elem.dest_handle, script_node);
				return true;
			}
			else {
				this._events.add_item(name, callback);
			}
			return false;
		};

		_pPluginElement.removeEventHandler = function (name, callback) {
			if (this.handle) {
				var _doc = this._getRootWindowHandle();
				var nameFromToStringRegex = /^function\s?([^\s(]*)/;
				var paramsFromToStringRegex = /\(.*?\)/;
				var params = callback.toString().match(paramsFromToStringRegex)[0];
				var eventValue = name + params;

				var i;
				var owner_elem = this.parent_elem.getContainerElement(this.position_step);
				var _scripts = owner_elem.dest_handle.getElementsByTagName("script");
				var length = _scripts.length;
				for (i = 0; i < length; i++) {
					var script = _scripts[i];
					if (script) {
						var eventAttribute = nexacro.__getHTMLAttr_Proeprty(script, 'event');
						if (eventAttribute === eventValue) {
							var parentNode = script.parentNode;
							nexacro.__unlinkDOMNode(parentNode, script);
							break;
						}
					}
				}
			}
		};

		_pPluginElement.setElementMovie = function (movie) {
			this.setElementParam("movie", movie);
		};

		_pPluginElement.setElementPluginPage = function (pluginpage) {
			if (this.pluginpage != pluginpage) {
				this.pluginpage = pluginpage;

				var object_node = this._object_node;
				if (object_node) {
					var embed_node = this._embed_node;
					if (embed_node == null) {
						var _doc = this._getRootWindowHandle();
						this._embed_node = embed_node = _doc.createElement("embed");
						nexacro.__appendDOMNode(object_node, embed_node);
					}
					nexacro.__setHTMLAttr_Proeprty(embed_node, 'pluginspage', pluginpage);
				}
			}
		};

		_pPluginElement._play = function (movie) {
			var obj_node = this._object_node;
			if (obj_node) {
				obj_node.Play();
			}
		};

		_pPluginElement._stopPlay = function (movie) {
			var obj_node = this._object_node;
			if (obj_node) {
				obj_node.StopPlay();
			}
		};
	}
	else {
		_pPluginElement.addEventHandler = function (name, callback) {
			if (this.handle && this._object_node) {
				var object_node = this._object_node;
				nexacro.__setHTMLAttr_Proeprty(object_node, name, name);

				var doc = this._getRootWindowHandle();
				var script_node = doc.createElement("script");

				var nameFromToStringRegex = /^function\s?([^\s(]*)/;
				var paramsFromToStringRegex = /\(.*?\)/;
				var params = callback.toString().match(paramsFromToStringRegex)[0];
				var eventValue = name + params;

				nexacro.__setHTMLAttr_Proeprty(script_node, 'event', eventValue);

				var parentFrame, parentFrame2;
				var callfunc = "";
				parentFrame = this.component ? this.component.parent : null;
				if (parentFrame) {
					callfunc = "." + this.component.id + '["' + name + '"]; \n';
					callfunc += '\tif (eventFn) eventFn._firePluginEvent' + params + ';' + "\n};";
					do {
						if (parentFrame instanceof nexacro.MainFrame) {
							callfunc = '\tvar eventFn = nexacro.getApplication().mainframe' + callfunc;
							break;
						}
						if (parentFrame instanceof nexacro.ChildFrame) {
							parentFrame2 = parentFrame.parent;
							if (parentFrame2) {
								if (parentFrame2 instanceof nexacro.FrameSet || 
									parentFrame2 instanceof nexacro.VFrameSet || 
									parentFrame2 instanceof nexacro.HFrameSet || 
									parentFrame2 instanceof nexacro.ChildFrame) {
									if (parentFrame2._frames && parentFrame2._frames.length) {
										var frmidx;
										var frmlen = parentFrame2._frames.length;
										for (frmidx = 0; frmidx < frmlen; frmidx++) {
											if (parentFrame2._frames[frmidx] == parentFrame) {
												callfunc = '._frames[' + frmidx + ']' + callfunc;
												break;
											}
										}
									}
								}
								else if (parentFrame2 instanceof nexacro.MainFrame) {
									callfunc = '.frame' + callfunc;
								}
								else if (parentFrame2 instanceof nexacro.Form) {
									callfunc = '.' + parentFrame.id + callfunc;
								}
							}
						}
						else if (parentFrame instanceof nexacro.FrameSet || 
							parentFrame instanceof nexacro.VFrameSet || 
							parentFrame instanceof nexacro.HFrameSet) {
							parentFrame2 = parentFrame.parent;
							if (parentFrame2) {
								if (parentFrame2._frames && parentFrame2._frames.length) {
									var frmidx;
									var frmlen = parentFrame2._frames.length;
									for (frmidx = 0; frmidx < frmlen; frmidx++) {
										if (parentFrame2._frames[frmidx] == parentFrame) {
											callfunc = '._frames[' + frmidx + ']' + callfunc;
											break;
										}
									}
								}
							}
						}
						else if (parentFrame instanceof nexacro.Div) {
							callfunc = '.' + parentFrame.id + callfunc;
						}
						else if (parentFrame instanceof nexacro.Form) {
							callfunc = '.form' + callfunc;
						}
						parentFrame = parentFrame.parent;
					} while (parentFrame);
				}
				if (callfunc) {
					callfunc = 'function ' + eventValue + '\n{\n' + callfunc;
				}

				script_node.text = callfunc;
				this.handle.appendChild(script_node);
				return true;
			}
			else {
				this._events.add_item(name, callback);
			}
			return false;
		};

		_pPluginElement.removeEventHandler = function (name, callback) {
			if (this.handle && this._object_node) {
				var object_node = this._object_node;
				nexacro.__removeHTMLAttr_Proeprty(object_node, name);
				object_node.removeAttribute(name);

				var _doc = this._getRootWindowHandle();
				var nameFromToStringRegex = /^function\s?([^\s(]*)/;
				var paramsFromToStringRegex = /\(.*?\)/;
				var params = callback.toString().match(paramsFromToStringRegex)[0];
				var eventValue = name + params;

				var i;
				var scripts = this.handle.getElementsByTagName("script");
				var length = scripts.length;
				for (i = 0; i < length; i++) {
					var script = scripts[i];
					if (script) {
						var eventAttribute = nexacro.__getHTMLAttr_Proeprty(script, 'event');
						if (eventAttribute === eventValue) {
							var parentNode = script.parentNode;
							nexacro.__unlinkDOMNode(parentNode, script);
							break;
						}
					}
				}
			}
		};

		if (nexacro._Browser == "Chrome") {
			_pPluginElement.setElementMovie = function (movie) {
				if (this.movie) {
					nexacro.__removeDOMNode(this.owner_elem.handle, this._object_node);
					var handle = this._createObjectElementHandle(document, this.left, this.top, this.width, this.height, this._params);
					nexacro.__appendDOMNode(this.owner_elem.dest_handle, handle);
				}
				this.movie = movie;
				var obj_node = this._object_node;
				if (obj_node) {
					nexacro.__setHTMLAttr_Proeprty(obj_node, "data", movie);
				}
			};
		}
		else if (nexacro._BrowserType == "Edge") {
			_pPluginElement.setElementMovie = function (movie) {
				this.movie = movie;
				var obj_node = this._object_node;
				if (obj_node) {
					nexacro.__removeDOMNode(this.owner_elem.handle, obj_node);
					var handle = this._createObjectElementHandle(document, this.left, this.top, this.width, this.height, this._params);
					nexacro.__appendDOMNode(this.owner_elem.handle, handle);
				}
			};
		}
		else {
			_pPluginElement.setElementMovie = function (movie) {
				this.movie = movie;
				var obj_node = this._object_node;
				if (obj_node) {
					nexacro.__setHTMLAttr_Proeprty(obj_node, "data", movie);
				}
			};
		}

		_pPluginElement.setElementPluginPage = nexacro._emptyFn;

		_pPluginElement._play = function () {
			var obj_node = this._object_node;
			if (obj_node) {
				obj_node.Play();
			}
		};

		_pPluginElement._stopPlay = function () {
			var obj_node = this._object_node;
			if (obj_node) {
				obj_node.StopPlay();
			}
		};
	}


	_pPluginElement.getProperty = _pPluginElement.getElementParam;
	_pPluginElement.setProperty = _pPluginElement.setElementParam;

	_pPluginElement.install = nexacro._emptyFn;
	_pPluginElement.isInstalled = nexacro._emptyFn;
	_pPluginElement.isLoaded = nexacro._emptyFn;
	_pPluginElement.setElementVisible = nexacro._emptyFn;
	_pPluginElement.setElementAdjustAlpha = nexacro._emptyFn;
	_pPluginElement.setElementWindowed = nexacro._emptyFn;
	_pPluginElement.setElementEnable = nexacro._emptyFn;
	_pPluginElement.setElementPopupStyle = nexacro._emptyFn;
	_pPluginElement.initEvent = nexacro._emptyFn;
	_pPluginElement.updateWindow = nexacro._emptyFn;
	_pPluginElement.setElementAdjustAlpha = nexacro._emptyFn;
	_pPluginElement.setElementUsePersistData = nexacro._emptyFn;
	_pPluginElement.setElementClassId64 = nexacro._emptyFn;



	nexacro._PluginObject = function () {
	};

	var __pPluginObject = nexacro._createPrototype(nexacro.Object, nexacro._PluginObject);
	nexacro._PluginObject.prototype = __pPluginObject;
	__pPluginObject._type_name = "PluginObject";
	__pPluginObject.handle = null;
	__pPluginObject._doc = null;
	__pPluginObject._window = null;

	__pPluginObject.getProperty = function (name) {
		var handle = this.handle;
		if (handle !== undefined) {
			if (name) {
				var property = handle[name];
				if (property !== undefined) {
					if (property === null || (typeof property != "object" && property != undefined)) {
						return property;
					}
					var pobject = new nexacro._PluginObject();
					pobject.handle = property;
					pobject._window = this._window;
					return pobject;
				}
				var param = this.handle.getElementsByTagName("param");
				for (var i in param) {
					if (param[i].name == name) {
						return param[i].value;
					}
				}
			}
		}
	};

	__pPluginObject.setProperty = function (name, value) {
		if (this.handle && name) {
			this.handle[name] = value;

			var param = this.handle.getElementsByTagName("param");
			for (var i in param) {
				if (param[i].name == name) {
					param[i].value = value;
					return;
				}
			}

			if (this._doc) {
				var param_node = this._doc.createElement("param");
				nexacro.__setHTMLAttr_Proeprty(param_node, "name", name);
				nexacro.__setHTMLAttr_Proeprty(param_node, "value", value);
				nexacro.__appendDOMNode(this.handle, param_node);
			}
		}
	};

	__pPluginObject._delete_property = function (name) {
		if (this.handle && name) {
			if (this.handle[name]) {
				this.handle[name] = "";
				return;
			}
			var param = this.handle.getElementsByTagName("param");
			for (var i in param) {
				if (param[i].name == name) {
					nexacro.__unlinkDOMNode(this.handle, param[i]);
					return;
				}
			}
		}
	};

	__pPluginObject.callMethod = function () {
		if (arguments.length < 1) {
			return;
		}

		if (this.handle) {
			var fn_name = Array.prototype.shift.call(arguments);
			var str = 'this.handle.' + fn_name;

			str += '(';
			var len = arguments.length;
			if (len > 0) {
				str += 'arguments[0]';
				for (var i = 1; i < len; i++) {
					str += ', arguments[' + i + ']';
				}
			}
			str += ');';

			var value = eval(str);

			if (value != null && typeof (value) == "object") {
				var pobject = new nexacro._PluginObject();
				pobject.handle = value;
				return pobject;
			}
			return value;
		}
	};

	__pPluginObject.destroy = nexacro._emptyFn;



	nexacro._WebBrowserPluginElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.parent_elem.windowed = true;

		this._params = new nexacro.Collection();
		this._events = new nexacro.Collection();
	};

	var __pWebBrowserPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro._WebBrowserPluginElement);
	nexacro._WebBrowserPluginElement.prototype = __pWebBrowserPluginElement;

	__pWebBrowserPluginElement._type_name = "WebBrowserPluginElement";
	__pWebBrowserPluginElement.initEvent = nexacro._emptyFn;

	__pWebBrowserPluginElement._object_node = null;
	__pWebBrowserPluginElement._embed_node = null;
	__pWebBrowserPluginElement._params = null;
	__pWebBrowserPluginElement._events = null;
	__pWebBrowserPluginElement._window = null;
	__pWebBrowserPluginElement._document = null;
	__pWebBrowserPluginElement._block_node = null;
	__pWebBrowserPluginElement._prev_outfocus_message_elem = null;
	__pWebBrowserPluginElement._next_outfocus_message_elem = null;



	__pWebBrowserPluginElement.create = function (win) {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && owner_elem.handle && !this.handle) {
			this.owner_elem = owner_elem;
			var _doc = owner_elem._getRootWindowHandle();
			var handle = this._createInternalFrameElementHandle(_doc, this.left, this.top, this.width, this.height, this._params);
			handle._contaniner = owner_elem;

			if (nexacro._enableaccessibility) {
				nexacro.__setDOMAccessibility_ActiveDescendant(handle, this.parent_elem.linkedcontrol._unique_id);
			}

			nexacro.__setDOMNode_Selectable(handle, true);

			if (nexacro._OS == "iOS") {
				nexacro.__setMobileIframeDOMNodeStyleScroll(owner_elem.dest_handle.style);
			}

			if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari") && this.visible) {
				this._need_hide = true;
			}

			var handle_style = handle.style;
			if (!this.visible || this._need_hide) {
				nexacro.__setDOMStyle_Visible(handle_style, false);
			}

			if (this.font) {
				nexacro.__setDOMStyle_Font(handle_style, this.font);
			}
			if (this.color) {
				nexacro.__setDOMStyle_Color(handle_style, this.color);
			}

			if (nexacro._enableaccessibility) {
				this._createInternalPrevAccessibilityElementHandle(win, _doc, owner_elem, handle);
			}

			this.handle = this.dest_handle = handle;
			nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
			nexacro._observeSysEvent(handle, "load", "onload", _iframe_eventhandler_onload);
			if (nexacro._enableaccessibility) {
				this._createInternalNextAccessibilityElementHandle(win, _doc, owner_elem, handle);
			}

			if ((nexacro._Browser == "IE" && nexacro._BrowserVersion >= 9) || (nexacro._isTouchInteraction && nexacro._SupportTouch)) {
				nexacro._observeSysEvent(handle, "focusin", "onfocusin", this._iframe_onfocusin_forward);
				nexacro._observeSysEvent(handle, "focusout", "onfocusout", this._iframe_onfocusout_forward);
			}
		}
	};

	__pWebBrowserPluginElement.createCommand = function () {
		return "";
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this.handle) {
			this.owner_elem = owner_elem;
			var _doc = owner_elem._getRootWindowHandle();
			var str = "";
			var handle_style = "";
			if (!this.visible) {
				handle_style += nexacro.__getHTMLStyle_Visible(false);
			}
			if (this.color) {
				handle_style += nexacro.__getHTMLStyle_ColorObject(this.color);
			}
			if (this.font) {
				handle_style += nexacro.__getHTMLStyle_FontObject(this.font);
			}
			handle_style += nexacro.__getHTMLStyle_Pos(this.left, this.top);
			if (this.width && this.height) {
				handle_style += nexacro.__getHTMLStyle_Size(this.width + this._getOverflowScrollSize(), this.height + this._getOverflowScrollSize());
			}

			if (nexacro._enableaccessibility) {
				str += "<div tabindex='0' style='left:0px; top:0px; width:1px; height:1px; opacity:0;'></div>";
				str += "<div tabindex='0' style='left:0px; top:0px; width:1px; height:1px; opacity:0;'></div>";
			}
			str += "<iframe ";
			this._object_id = this.parent.name + ":" + this._type_name;
			if (this._object_id) {
				str += " id = '" + this._object_id + "'";
			}


			var params = this._params;
			var param_cnt = (params ? params.length : 0);
			for (var i = 0; i < param_cnt; i++) {
				str += "<param name ='" + params.get_id(i) + "' value ='" + params.get_item(i) + "'/>";
			}

			if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari") && this.visible) {
				this._need_hide = true;
			}

			if (this.textAlign || this.verticalAlign) {
				handle_style += nexacro.__getHTMLStyle_BKImageAlign(this.textAlign, this.verticalAlign);
			}
			str += (handle_style) ? (" style='" + handle_style + "'>") : ">";
			str += "<div";
			str += (handle_style) ? (" style='" + handle_style + "'>") : ">";


			str += "<div";
			var handle_style = this._getCommonStyleStr();
			str += (handle_style) ? (" style='" + handle_style + "'>") : ">";
			str += "</div></div></iframe>";


			if (nexacro._enableaccessibility) {
				str += "<div tabindex='0' style='left:0px; top:0px; width:1px; height:1px; opacity:0;'></div>";
				str += "<div tabindex='0' style='left:0px; top:0px; width:1px; height:1px; opacity:0;'></div>";
			}


			return str;
		}

		return "";
	};
	__pWebBrowserPluginElement.attachHandle = function (win) {
		return;
		if (this._object_id && !this.handle) {
			this.handle = win._doc.getElementById(this._object_id);
			this.handle._linked_element = this;
			nexacro._observeSysEvent(this.handle, "load", "onload", _iframe_eventhandler_onload);
		}
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && owner_elem.handle) {
			nexacro.__setMobileIframeDOMNodeStyleScroll(owner_elem.handle.style);
		}

		if (nexacro._enableaccessibility) {
			var owner_handle = this.handle.offsetParent;
			if (owner_handle) {
				var cur_handle = owner_handle.firstChild;
				cur_handle.parent_elem = this.parent;
				nexacro._observeSysEvent(cur_handle, "focus", "onfocus", this._go_prev_focus);

				cur_handle = cur_handle.nextSibling;
				nexacro._observeSysEvent(cur_handle, "focus", "onfocus", this._iframe_onfocus_forward);

				cur_handle = cur_handle.nextSibling.nextSibling;
				nexacro._observeSysEvent(cur_handle, "focus", "onfocus", this._iframe_onfocus_forward);

				cur_handle = cur_handle.nextSibling;
				cur_handle.parent_elem = this.parent;
				nexacro._observeSysEvent(cur_handle, "focus", "onfocus", this._go_next_focus);
			}
		}
	};

	__pWebBrowserPluginElement._createInternalPrevAccessibilityElementHandle = function (win, _doc, owner_elem, handle) {
		var _focus_input = _doc.createElement("div");
		var f_input_style = _focus_input.style;
		nexacro.__setDOMNode_TabIndex(_focus_input, 0);
		f_input_style.opacity = 0;
		_focus_input.parent_elem = this.parent;
		nexacro.__appendDOMNode(owner_elem.dest_handle, _focus_input);
		nexacro._observeSysEvent(_focus_input, "focus", "onfocus", this._go_prev_focus);

		var message_elem = this._prev_outfocus_message_elem = new nexacro.TextBoxElement(owner_elem);
		message_elem.text = " ";
		if (nexacro._Browser == "MobileSafari" || nexacro._OS == "Android") {
			message_elem.setElementVisible(false);
		}
		message_elem.create(win);
		var message_elem_handle = message_elem.handle;
		if (message_elem_handle) {
			nexacro.__setDOMNode_TabIndex(message_elem_handle, 0);
			message_elem_handle.style.opacity = 0;
			nexacro._observeSysEvent(message_elem_handle, "focus", "onfocus", this._iframe_onfocus_forward);
		}
	};

	__pWebBrowserPluginElement._createInternalNextAccessibilityElementHandle = function (win, _doc, owner_elem, handle) {
		var message_elem = this._next_outfocus_message_elem = new nexacro.TextBoxElement(owner_elem);
		message_elem.text = " ";
		if (nexacro._Browser == "MobileSafari" || nexacro._OS == "Android") {
			message_elem.setElementVisible(false);
		}

		message_elem.create(win);
		var message_elem_handle = message_elem.handle;
		if (message_elem_handle) {
			nexacro.__setDOMNode_TabIndex(message_elem_handle, 0);

			message_elem_handle.style.opacity = 0;
			nexacro._observeSysEvent(message_elem_handle, "focus", "onfocus", this._iframe_onfocus_forward);
		}

		var _focus_input = _doc.createElement("div");
		var f_input_style = _focus_input.style;
		nexacro.__setDOMNode_TabIndex(_focus_input, 0);

		f_input_style.opacity = 0;
		_focus_input.parent_elem = this.parent;
		nexacro.__appendDOMNode(owner_elem.dest_handle, _focus_input);
		nexacro._observeSysEvent(_focus_input, "focus", "onfocus", this._go_next_focus);
	};
	__pWebBrowserPluginElement._go_prev_focus = function (evt) {
		var node = evt.target ? evt.target : evt.srcElement;
		var form = node.parent_elem.linkedcontrol._getForm();

		var newfocus_comp = form._searchPrevTabFocus(form._last_focused);

		if (newfocus_comp && newfocus_comp[0]) {
			if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
				var win = form._getWindow();
				win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
			}

			newfocus_comp[0]._setFocus(true, 1, true);
		}
	};

	__pWebBrowserPluginElement._go_next_focus = function (evt) {
		var node = evt.target ? evt.target : evt.srcElement;
		var form = node.parent_elem.linkedcontrol._getForm();

		var newfocus_comp = form._searchNextTabFocus(form._last_focused);

		if (newfocus_comp && newfocus_comp[0]) {
			if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
				var win = form._getWindow();
				win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
			}

			newfocus_comp[0]._setFocus(true, 0, true);
		}
	};

	__pWebBrowserPluginElement._on_frame_load = function (_win) {
		var comp;
		try {
			var docurl = "";
			comp = this.parent_elem.linkedcontrol;
			if (_win) {
				if (this._need_hide) {
					nexacro.__setDOMStyle_Visible(this.handle.style, true);
					this._need_hide = false;
				}

				this._window = _win;

				this._document = _win.document;
				if (_win.NEXACROWEBBROWSER == undefined) {
					_win.NEXACROWEBBROWSER = comp;
				}
			}

			if (this._document) {
				docurl = this._document.location.href;
			}
		}
		catch (e) {
			this._window = null;
			this._document = null;
		}

		var _win = comp._getWindow();
		var cur_focus_paths = _win.getCurrentFocusPaths();
		var pThis = comp;

		while (pThis && pThis._is_nc_control) {
			pThis = pThis.parent;
		}

		if (!pThis) {
			return;
		}

		var focuspath_index = -1;
		if (cur_focus_paths) {
			focuspath_index = nexacro._indexOf(cur_focus_paths, pThis);
		}
		var len = cur_focus_paths.length;

		if (focuspath_index < 0) {
			var focus_comp = cur_focus_paths[len - 1];
			focus_comp._apply_setfocus();
			var input_elem = focus_comp._input_element;
			if (input_elem) {
				input_elem._is_sys_focused = false;
				input_elem.setElementFocus();
			}
		}
		comp.on_load_handler(docurl);
	};

	__pWebBrowserPluginElement.destroy = function () {
		if (this._prev_outfocus_message_elem) {
			nexacro._stopSysObserving(this._prev_outfocus_message_elem.handle, "focus", "onfocus", this._iframe_onfocus_forward);
			this._prev_outfocus_message_elem.destroy();
			this._prev_outfocus_message_elem = null;
		}

		if (this._next_outfocus_message_elem) {
			this._next_outfocus_message_elem.destroy();
			this._next_outfocus_message_elem = null;
		}

		var handle = this.handle;
		if (handle) {
			nexacro._stopSysObserving(handle, "load", "onload", _iframe_eventhandler_onload);
			handle._linked_element = null;

			var _owner_handle = null;
			if (this.owner_elem && this.owner_elem.dest_handle) {
				_owner_handle = this.owner_elem.dest_handle;
			}

			if (!this.owner_elem || _owner_handle) {
				nexacro.__removeDOMNode(_owner_handle, handle);
			}

			var _block_node = this._block_node;
			if (_block_node && _owner_handle) {
				nexacro.__removeDOMNode(_owner_handle, _block_node);
			}

			this._block_node = null;
			this._document = null;
			this.owner_elem = null;
			this.handle = this.dest_handle = null;
		}
		this.parent = null;
		this.parent_elem = null;

		var params = this._params;
		if (params) {
			params.destroy();
			this._params = null;
		}

		var events = this._events;
		if (events) {
			events.destroy();
			this.events = null;
		}
	};

	__pWebBrowserPluginElement._createInternalFrameElementHandle = function (_doc, left, top, width, height, params) {
		var handle = _doc.createElement("iframe");

		handle._linked_element = this;
		handle.frameBorder = 0;

		this._object_id = this.parent_elem.handle.id + '_' + this.component._type_name;
		if (this._object_id) {
			nexacro.__setHTMLAttr_Proeprty(handle, 'id', this._object_id);
		}

		var handle_style = handle.style;
		handle_style.position = "absolute";

		nexacro.__setDOMNode_ToolTip(handle, this.parent_elem.tooltiptext ? this.parent_elem.tooltiptext : (this.parent_elem.accessibilitylabel ? this.parent_elem.accessibilitylabel : this.parent_elem.linkedcontrol.id));

		nexacro.__setDOMStyle_Pos(handle_style, left, top);
		nexacro.__setDOMStyle_Size(handle_style, width, height);

		var param_cnt = (params ? params.length : 0);
		for (var i = 0; i < param_cnt; i++) {
			this._setInternalFrameDOMParam(_doc, handle, params.get_id(i), params.get_item(i));
		}

		return handle;
	};

	__pWebBrowserPluginElement._setInternalFrameDOMParam = function (_doc, target_handle, name, value) {
		nexacro.__setHTMLAttr_Proeprty(target_handle, name, value);
	};

	__pWebBrowserPluginElement.setElementFocus = nexacro._emptyFn;

	__pWebBrowserPluginElement._setElementFocus = function (selffocus) {
		var handle = this.handle;
		if (handle) {
			nexacro.__setDOMNode_Focus(handle, true);
			nexacro.__setLastFocusedElement(this);
			if (nexacro._enableaccessibility) {
				var next_outfocus_message_elem = this._next_outfocus_message_elem;
				if (next_outfocus_message_elem) {
					next_outfocus_message_elem._killfocus_flag = false;
				}

				var prev_outfocus_message_elem = this._prev_outfocus_message_elem;
				if (prev_outfocus_message_elem) {
					prev_outfocus_message_elem._killfocus_flag = false;
				}
			}
		}
	};

	__pWebBrowserPluginElement.setElementCodebase = function (codebaseurl) {
		if (this.codebase != codebaseurl) {
			this.codebase = codebaseurl;
			var handle = this.handle;
			if (handle) {
				nexacro.__setHTMLAttr_Proeprty(handle, 'codebase', codebaseurl);
			}
		}
	};

	__pWebBrowserPluginElement.getElementParam = function (name) {
		var handle = this.handle;
		if (handle) {
			var _doc = this._document;
			if (!_doc) {
				_doc = this._document = handle.contentDocument || handle.contentWindow.document;
			}
			var value = null;
			if (name) {
				if (name === "document") {
					var pobject = new nexacro._PluginObject();
					pobject.handle = _doc;
					return pobject;
				}
				else if (name == "window") {
					var _win = this._window;
					if (!_win) {
						_win = this._window = handle.contentWindow;
					}
					var pobject = new nexacro._PluginObject();
					pobject.handle = _win;
					return pobject;
				}
				value = handle[name];
				if (value != null && typeof (value) == "object") {
					var pobject = new nexacro._PluginObject();
					pobject.handle = value;
					return pobject;
				}
				return value;
			}
		}
		else {
			var params = this._params;
			return params.get_item(name);
		}
	};

	__pWebBrowserPluginElement.setElementParam = function (name, value) {
		if (this.handle) {
			var _doc = this._getRootWindowHandle();
			this._setInternalFrameDOMParam(_doc, this.handle, name, value);
		}
		else {
			var params = this._params;
			params.add_item(name, value);
		}
	};

	__pWebBrowserPluginElement.setElementEnable = function (value) {
		if (this.enable != value) {
			this.enable = value;
			var handle = this.handle;
			if (handle) {
				var _block_node = this._block_node;
				if (value) {
					if (_block_node) {
						nexacro.__removeDOMNode(_block_node.parentNode, _block_node);
						this._block_node = null;
					}
				}
				else {
					var _doc = this._getRootWindowHandle();
					this._block_node = _block_node = _doc.createElement("DIV");
					var _block_style = _block_node.style;
					_block_style.cssText = handle.style.cssText;

					this.parent._setControlOpacity(this, _block_node, 1);
					_block_style.backgroundColor = "#ffffff";
					_block_style.zIndex = 100000;

					var pNode = handle.parentNode;
					pNode.appendChild(_block_node);
					pNode.insertBefore(_block_node, handle);
				}
			}
		}
	};

	__pWebBrowserPluginElement._getDoc = function () {
		return this._document;
	};

	__pWebBrowserPluginElement._setUrl = function (url, useurlhistory) {
		if (this.handle) {
			if (useurlhistory) {
				this.setElementParam("src", url);
			}
			else {
				this._replaceURL(url);
			}
		}
	};

	if (nexacro._Browser == "Gecko" || (nexacro._Browser == "IE" && nexacro._BrowserVersion > 10)) {
		__pWebBrowserPluginElement._setGo = function () {
			if (this.handle && this.handle.contentWindow) {
				try {
					this.handle.contentWindow.location.reload(true);
				}
				catch (e) {
				}
			}
		};
	}
	else {
		__pWebBrowserPluginElement._setGo = function () {
			if (this.handle && this.handle.contentWindow) {
				try {
					this.handle.contentWindow.history.go(0);
				}
				catch (e) {
				}
			}
		};
	}

	__pWebBrowserPluginElement._setBack = function () {
		if (this.handle && this.handle.contentWindow) {
			try {
				this.handle.contentWindow.history.back();
			}
			catch (e) {
			}
		}
	};

	__pWebBrowserPluginElement._setForward = function () {
		if (this.handle && this.handle.contentWindow) {
			try {
				this.handle.contentWindow.history.forward();
			}
			catch (e) {
			}
		}
	};


	__pWebBrowserPluginElement._replaceURL = function (v) {
		var iframe_window = this.handle.contentWindow;
		if (iframe_window) {
			iframe_window.location.replace(v);
		}
	};

	__pWebBrowserPluginElement.callMethod = function () {
		if (arguments.length < 1) {
			return;
		}

		var name = arguments[0];

		var fn_name = Array.prototype.shift.call(arguments);
		return this._window[fn_name].apply(this._window, arguments);
	};

	if ((nexacro._Browser == "IE" && nexacro._BrowserVersion >= 9) || (nexacro._isTouchInteraction && nexacro._SupportTouch)) {
		__pWebBrowserPluginElement._iframe_onfocusout_forward = function (evt) {
			var win = this._linked_element.parent_elem.linkedcontrol._getWindow();
			win._is_iframe_focus = false;
		};

		__pWebBrowserPluginElement._iframe_onfocusin_forward = function (evt) {
			var win = this._linked_element.parent_elem.linkedcontrol._getWindow();
			win._is_iframe_focus = true;
		};
	}

	if (nexacro._Browser == "IE") {
		__pWebBrowserPluginElement._iframe_onfocus_forward = function (evt) {
			if (window.event) {
				evt = window.event;
			}
			if (nexacro._com_waiting) {
				if (evt.preventDefault) {
					evt.preventDefault();
				}
			}
			this._linked_element._killfocus_flag = true;
		};
	}
	else {
		__pWebBrowserPluginElement._iframe_onfocus_forward = function (evt) {
			if (nexacro._com_waiting) {
				nexacro._stopSysEvent(evt);
			}
			this._linked_element._killfocus_flag = true;
		};
	}

	__pWebBrowserPluginElement._setElementInternalFocus = function (keycode) {
		var E = nexacro.Event;
		if (keycode == E.KEY_UP) {
			if (this._prev_outfocus_message_elem._killfocus_flag == true) {
				this._prev_outfocus_message_elem._killfocus_flag = false;
			}
			else {
				try {
					this.handle.contentDocument.body.focus();
				}
				catch (e) {
				}
			}
		}
		else if (keycode == E.KEY_DOWN) {
			if (this._next_outfocus_message_elem._killfocus_flag == true) {
				this._next_outfocus_message_elem._killfocus_flag = false;
			}
			else {
				try {
					this.handle.contentDocument.body.focus();
				}
				catch (e) {
				}
			}
		}
	};

	__pWebBrowserPluginElement._setElementLeaveMessage = function (message) {
		var prev_outfocus_elem = this._prev_outfocus_message_elem;
		if (prev_outfocus_elem) {
			prev_outfocus_elem.setElementText(message);
		}
		var next_outfocus_elem = this._next_outfocus_message_elem;
		if (next_outfocus_elem) {
			next_outfocus_elem.setElementText(message);
		}
	};

	var _iframe_eventhandler_ontouchmove = function (evt) {
		var target;
		if (nexacro._Browser == "IE") {
			target = evt.srcElement;
		}
		else {
			target = evt.target;
		}

		if (target) {
			var _doc = target.ownerDocument;
			var _body = _doc.body;
			var ct = _doc._nexacro_iframe_contaniner;

			if (_doc._nexacro_bInnerScroll) {
				return;
			}
			if (nexacro._OS == "iOS") {
				var scroll_target = _doc._nexacro_iframe;
			}
			else {
				var scroll_target = _body;
			}

			if (_doc._nexacro_preTouchInfo) {
				var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
				for (var i = 0; i < touchlen; i++) {
					var touch = evt.changedTouches ? evt.changedTouches[i] : (evt.touches ? evt.touches[0] : evt);
				}

				var clientX = touch.pageX || touch.clientX;
				var clientY = touch.pageY || touch.clientY;
				var screenX = touch.screenX || clientX;
				var screenY = touch.screenY || clientY;

				var touchInfo = [clientX, clientY, screenX, screenY];

				function getDirection (tInfo1, tInfo2) {
					var gap_x = tInfo2[2] - tInfo1[2];
					var gap_y = tInfo2[3] - tInfo1[3];

					if (Math.abs(gap_y) >= Math.abs(gap_x)) {
						if (gap_y > 0) {
							return 1;
						}
						else {
							return 2;
						}
					}
					else {
						if (gap_x < 0) {
							return 4;
						}
						else {
							return 8;
						}
					}
				}

				function getDistance (dir, tInfo1, tInfo2) {
					var gap_x = tInfo2[2] - tInfo1[2];
					var gap_y = tInfo2[3] - tInfo1[3];
					if (dir < 3) {
						return gap_y;
					}
					else {
						return gap_x;
					}
				}

				var pNode = target.parentNode;
				var dir = getDirection(_doc._nexacro_preTouchInfo, touchInfo);
				var distance = getDistance(dir, _doc._nexacro_preTouchInfo, touchInfo);
				var bNexacroScroll = undefined;
				var _win = _doc.defaultView || _doc.parentWindow;

				if (_doc._nexacro_bInnerScroll === false) {
					if (dir != _doc._nexacro_bInnerScrollDir) {
						_doc._nexacro_bInnerScroll = undefined;
					}
				}

				if (dir < 3) {
					while (pNode && _doc._nexacro_bInnerScroll !== false && pNode != scroll_target) {
						if (dir == 1) {
							if (pNode.scrollTop > 0) {
								_doc._nexacro_bInnerScroll = true;
								return;
							}
						}
						else {
							if (pNode.scrollTop && (pNode.scrollTop + pNode.clientHeight) < pNode.scrollHeight) {
								_doc._nexacro_bInnerScroll = true;
								return;
							}
						}
						pNode = pNode.parentNode;
					}

					if (nexacro._OS == "iOS") {
						var clientHeight = parseInt(scroll_target.style.height);
					}
					else {
						var clientHeight = _win.innerHeight;
					}

					var scrollHeight = scroll_target.scrollHeight || _doc.documentElement.scrollHeight;
					var scrollTop = scroll_target.scrollTop || _doc.documentElement.scrollTop;
					if (bNexacroScroll === undefined) {
						if (dir == 1) {
							if (scrollTop == 0) {
								bNexacroScroll = true;
							}
						}
						else {
							if (scrollTop + clientHeight >= scrollHeight) {
								bNexacroScroll = true;
							}
						}
					}
					var preClientY = _doc._nexacro_preTouchInfo[1];
					if ((dir == 2 && clientY > preClientY) || (dir == 1 && clientY < preClientY)) {
						return;
					}
				}
				else {
					while (pNode && _doc._nexacro_bInnerScroll !== false && pNode != scroll_target) {
						if (dir == 4) {
							if (pNode.scrollLeft > 0) {
								_doc._nexacro_bInnerScroll = true;
								return;
							}
						}
						else {
							if (pNode.scrollLeft && (pNode.scrollLeft + pNode.clientWidth) < pNode.scrollWidth) {
								_doc._nexacro_bInnerScroll = true;
								return;
							}
						}

						pNode = pNode.parentNode;
					}

					if (nexacro._OS == "iOS") {
						var clientWidth = parseInt(scroll_target.style.width);
					}
					else {
						var clientWidth = _win.innerWidth;
					}

					var scrollWidth = scroll_target.scrollWidth || _doc.documentElement.scrollWidth;
					var scrollLeft = scroll_target.scrollLeft || _doc.documentElement.scrollLeft;

					if (bNexacroScroll === undefined) {
						if (dir == 8) {
							if (scrollLeft == 0) {
								bNexacroScroll = true;
							}
						}
						else {
							if (scrollLeft + clientWidth >= scrollWidth) {
								bNexacroScroll = true;
							}
						}
					}

					var preClientX = _doc._nexacro_preTouchInfo[0];
					if ((dir == 4 && clientX > preClientX) || (dir == 8 && clientX < preClientX)) {
						return;
					}
				}
				_doc._nexacro_preTouchInfo[0] = clientX;
				_doc._nexacro_preTouchInfo[1] = clientY;
				_doc._nexacro_preTouchInfo[2] = screenX;
				_doc._nexacro_preTouchInfo[3] = screenY;
				_doc._nexacro_bInnerScroll = false;
				_doc._nexacro_bInnerScrollDir = dir;

				if (bNexacroScroll) {
					nexacro._syshandler_ontouchmove(window.nexacro_HTMLSysEvent, ct, evt);
				}
				else {
					_doc._nexacro_bScroll = false;
				}
			}
		}
	};

	var _iframe_eventhandler_ontouchstart = function (evt) {
		if (nexacro._Browser == "IE") {
			var target = evt.srcElement;
		}
		else {
			var target = evt.target;
		}

		if (target) {
			var _doc = target.ownerDocument;
			var _body = _doc.body;
			var ct = _doc._nexacro_iframe_contaniner;

			_doc._nexacro_bInnerScroll = undefined;
			if (nexacro._OS == "iOS") {
				var scroll_target = _doc._nexacro_iframe;
			}
			else {
				var scroll_target = _body;
			}


			_doc._nexacro_bScroll = false;

			var _win = _doc.defaultView || _doc.parentWindow;

			if (nexacro._OS == "iOS") {
				var clientHeight = parseInt(scroll_target.style.height);
				var clientWidth = parseInt(scroll_target.style.width);
			}
			else {
				var clientHeight = nexacro._getWindowHandleClientHeight(_win);
				var clientWidth = nexacro._getWindowHandleClientWidth(_win);
				var w_innerHeight = _win.innerHeight;
				var w_innerWidth = _win.innerWidth;

				clientHeight = (clientHeight > w_innerHeight) ? clientHeight : w_innerHeight;
				clientWidth = (clientWidth > w_innerWidth) ? clientWidth : w_innerWidth;
			}

			var scrollHeight = scroll_target.scrollHeight || _doc.documentElement.scrollHeight;
			var scrollTop = scroll_target.scrollTop || _doc.documentElement.scrollTop;
			var scrollWidth = scroll_target.scrollWidth || _doc.documentElement.scrollWidth;
			var scrollLeft = scroll_target.scrollLeft || _doc.documentElement.scrollLeft;

			if ((scrollTop == 0 || (scrollHeight - clientHeight) <= scrollTop)
				 || (scrollLeft == 0 || (scrollWidth - clientWidth) <= scrollLeft)) {
				_doc._nexacro_bScroll = true;

				var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
				for (var i = 0; i < touchlen; i++) {
					var touch = evt.changedTouches ? evt.changedTouches[i] : (evt.touches ? evt.touches[0] : evt);
				}

				var clientX = touch.pageX || touch.clientX;
				var clientY = touch.pageY || touch.clientY;
				var screenX = touch.screenX || clientX;
				var screenY = touch.screenY || clientY;

				_doc._nexacro_preTouchInfo = [clientX, clientY, screenX, screenY];

				nexacro._syshandler_ontouchstart(window.nexacro_HTMLSysEvent, ct, evt);
			}
		}
	};

	var _iframe_eventhandler_ontouchend = function (evt) {
		if (nexacro._Browser == "IE") {
			var target = evt.srcElement;
		}
		else {
			var target = evt.target;
		}
		if (target) {
			var _doc = target.ownerDocument;
			var _body = _doc.body;
			var ct = _doc._nexacro_iframe_contaniner;

			if (_doc._nexacro_bScroll) {
				nexacro._syshandler_ontouchend(window.nexacro_HTMLSysEvent, ct, evt);
			}
		}
	};

	var _iframe_eventhandler_onmousewheel = function (evt) {
		if (nexacro._Browser == "IE") {
			var target = evt.srcElement;
		}
		else {
			var target = evt.target;
		}

		if (target) {
			var _doc = target.ownerDocument;
			var _body = _doc.body;
			var ct = _doc._nexacro_iframe_contaniner;

			if (nexacro._OS == "iOS") {
				var scroll_target = _doc._nexacro_iframe;
			}
			else {
				var scroll_target = _body;
			}

			var _win = _doc.defaultView || _doc.parentWindow;
			var clientHeight = 0;
			var scrollHeight = scroll_target.scrollHeight || _doc.documentElement.scrollHeight;
			var scrollTop = scroll_target.scrollTop || _doc.documentElement.scrollTop;

			if (nexacro._OS == "iOS") {
				clientHeight = parseInt(scroll_target.style.height);
			}
			else {
				if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
					clientHeight = _doc.documentElement.offsetHeight;
				}
				else {
					clientHeight = _win.innerHeight;
				}
			}

			if (scrollTop == 0 || (scrollHeight - clientHeight) <= scrollTop) {
				nexacro._syshandler_onmousewheel(window.nexacro_HTMLSysEvent, ct, evt);
			}
		}
	};

	var _iframe_eventhandler_oncontextmenu = function (evt) {
		if (nexacro._Browser == "IE") {
			var target = evt.srcElement;
		}
		else {
			var target = evt.target;
		}

		if (target) {
			var _doc = target.ownerDocument;
			var ct = _doc._nexacro_iframe_contaniner;

			return nexacro._syshandler_oncontextmenu(window.nexacro_HTMLSysEvent, ct, evt);
		}
	};

	if (nexacro._Browser == "IE") {
		var _iframe_eventhandler_onload = function (evt) {
			if (window.event) {
				evt = window.event;
			}
			var node = evt.srcElement;
			if (!node) {
				return;
			}

			try {
				var _doc = node.contentDocument || node.contentWindow.document;

				_doc._nexacro_iframe_contaniner = node._contaniner.handle;

				if (nexacro._SupportTouch && nexacro._isTouchInteraction) {
					nexacro._observeSysEvent(_doc, "MSPointerMove", "ontouchmove", _iframe_eventhandler_ontouchmove);
					nexacro._observeSysEvent(_doc, "MSPointerDown", "ontouchstart", _iframe_eventhandler_ontouchstart);
					nexacro._observeSysEvent(_doc, "MSPointerUp", "ontouchend", _iframe_eventhandler_ontouchend);
				}

				nexacro._observeSysEvent(_doc, "contextmenu", "oncontextmenu", _iframe_eventhandler_oncontextmenu);
				nexacro._observeSysEvent(_doc, "mousewheel", "onmousewheel", _iframe_eventhandler_onmousewheel);
			}
			catch (e) {
				;
			}
			finally {
				var elem = node._linked_element;
				if (!elem) {
					return;
				}
				return elem._on_frame_load(node.contentWindow);
			}
		};
	}
	else {
		var _iframe_eventhandler_onload = function (evt) {
			var node = evt.target;
			if (!node) {
				return;
			}

			try {
				var _doc = node.contentDocument || node.contentWindow.document;

				_doc._nexacro_iframe_contaniner = node._contaniner.handle;
				_doc._nexacro_iframe = node._contaniner.dest_handle;

				if (nexacro._SupportTouch) {
					nexacro._observeSysEvent(_doc, "touchmove", "ontouchmove", _iframe_eventhandler_ontouchmove);
					nexacro._observeSysEvent(_doc, "touchstart", "ontouchstart", _iframe_eventhandler_ontouchstart);
					nexacro._observeSysEvent(_doc, "touchend", "ontouchend", _iframe_eventhandler_ontouchend);
				}

				nexacro._observeSysEvent(_doc, "contextmenu", "oncontextmenu", _iframe_eventhandler_oncontextmenu);
				nexacro._observeSysEvent(_doc, "mousewheel", "onmousewheel", _iframe_eventhandler_onmousewheel);
				nexacro._observeSysEvent(_doc, "DOMMouseScroll", "onmousewheel", _iframe_eventhandler_onmousewheel);
			}
			catch (e) {
				;
			}
			finally {
				var elem = node._linked_element;
				if (!elem) {
					return;
				}
				return elem._on_frame_load(node.contentWindow);
			}
		};
	}

	__pWebBrowserPluginElement.getProperty = __pWebBrowserPluginElement.getElementParam;
	__pWebBrowserPluginElement.setProperty = __pWebBrowserPluginElement.setElementParam;


	nexacro._VideoPlayerPluginElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this.parent_elem.windowed = true;

		this._params = new nexacro.Collection();
		this._events = new nexacro.Collection();

		this._node_type = null;
	};

	var __pVideoPlayerPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro._VideoPlayerPluginElement);
	nexacro._VideoPlayerPluginElement.prototype = __pVideoPlayerPluginElement;

	__pVideoPlayerPluginElement._type_name = "VideoPlayerPluginElement";

	__pVideoPlayerPluginElement.classid = "{6bf52a52-394a-11d3-b153-00c04f79faa6}";

	__pVideoPlayerPluginElement._is_input_element = true;
	__pVideoPlayerPluginElement._current_event = "";

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
		__pVideoPlayerPluginElement._createObjectElementHandle = function (_doc, left, top, width, height, params) {
			var handle = _doc.createElement("object");

			handle._linked_element = this;

			var handle_style = handle.style;
			nexacro.__setDOMStyle_Absolute(handle_style);
			nexacro.__setDOMStyle_Pos(handle_style, left, top);
			nexacro.__setDOMStyle_Size(handle_style, width, height);
			nexacro.__setHTMLAttr_Proeprty(handle, 'classid', "clsid:6bf52a52-394a-11d3-b153-00c04f79faa6");
			nexacro.__setHTMLAttr_Proeprty(handle, 'type', "video/x-ms-wmv");
			this._setObjectDOMParam(_doc, handle, "wmode", "transparent");

			var param_cnt = (params ? params.length : 0);
			for (var i = 0; i < param_cnt; i++) {
				this._setObjectDOMParam(_doc, handle, params.get_id(i), params.get_item(i));
			}
			this._object_node = handle;
			return handle;
		};

		__pVideoPlayerPluginElement._play = function () {
			var object = this._getPluginObject();
			if (object) {
				var controls = object.getProperty("controls");
				if (controls) {
					controls.callMethod("play");
				}
			}
		};

		__pVideoPlayerPluginElement._pause = function () {
			var object = this._getPluginObject();
			if (object) {
				var controls = object.getProperty("controls");
				if (controls) {
					controls.callMethod("pause");
				}
			}
		};

		__pVideoPlayerPluginElement._stop = function () {
			var object = this._getPluginObject();
			if (object) {
				var controls = object.getProperty("controls");
				if (controls) {
					controls.callMethod("stop");
				}
			}
		};

		__pVideoPlayerPluginElement._setVideoMute = function () {
			var object = this._getPluginObject();
			if (object) {
				var settings = object.getProperty("settings");
				if (settings) {
					settings.setProperty("mute", v);
					settings.destroy();
				}
			}
		};


		__pVideoPlayerPluginElement._setVideoEnable = __pVideoPlayerPluginElement._setVideoShowControlBar = __pVideoPlayerPluginElement._setVideoUrl = __pVideoPlayerPluginElement._setVideoCurrentTime = __pVideoPlayerPluginElement._setVideoLoop = __pVideoPlayerPluginElement._setVideoAutoPlay = __pVideoPlayerPluginElement._setVideoVolume = nexacro.PluginElement.prototype.setElementParam;
	}
	else {
		__pVideoPlayerPluginElement._getNodeType = function (file_type) {
			var ret = "video";

			switch (file_type) {
				case "mp3":
				case "wav":
					ret = "audio";
					break;
			}
			return ret;
		};

		__pVideoPlayerPluginElement._getType = function (file_type) {
			var ret = "video/" + file_type;

			switch (file_type) {
				case "mp3":
				case "wav":
					ret = "audio" + file_type;
					break;
			}
			return ret;
		};

		__pVideoPlayerPluginElement._createObjectElementHandle = function (_doc, left, top, width, height, params) {
			var source = this.source;
			if (source) {
				var file_type = (source + "").substring(source.lastIndexOf(".") + 1).toLowerCase();
			}
			var type = this._getType(file_type);
			var node_name = this._getNodeType(file_type);
			var handle = _doc.createElement(node_name);

			this._node_type = node_name;

			handle._linked_element = this;

			var handle_style = handle.style;
			nexacro.__setDOMStyle_Absolute(handle_style);
			nexacro.__setDOMStyle_Pos(handle_style, left, top);
			nexacro.__setDOMStyle_Size(handle_style, width, height);

			var control = this.showcontrolbar;
			if (control != null) {
				handle.controls = control;
			}
			if (this.autoplay != null) {
				handle.autoplay = this.autoplay;
			}
			if (this.volume != null) {
				handle.volume = this.volume;
			}
			if (this.loop != null) {
				handle.loop = this.loop;
			}

			if (source) {
				var source_node = this._source_node = _doc.createElement("source");
				nexacro.__setHTMLAttr_Proeprty(source_node, 'src', this.source);
				nexacro.__setHTMLAttr_Proeprty(source_node, 'type', this._getType(file_type));
				nexacro.__appendDOMNode(handle, source_node);
			}

			nexacro._observeSysEvent(handle, "canplay", "oncanplay", this._video_eventhandler_changedstatus);
			nexacro._observeSysEvent(handle, "canplaythrough", "oncanplaythrough", this._video_eventhandler_canplaythrough);

			nexacro._observeSysEvent(handle, "ended", "onended", this._video_eventhandler_changedstatus);
			nexacro._observeSysEvent(handle, "error", "onerror", this._video_eventhandler_error);


			nexacro._observeSysEvent(handle, "pause", "onpause", this._video_eventhandler_changedstatus);
			nexacro._observeSysEvent(handle, "play", "onplay", this._video_eventhandler_changedstatus);
			nexacro._observeSysEvent(handle, "progress", "onprogress", this._video_eventhandler_progress);


			nexacro._observeSysEvent(handle, "timeupdate", "ontimeupdate", this._video_eventhandler_timeupdate);
			nexacro._observeSysEvent(handle, "volumechange", "onvolumechange", this._video_eventhandler_volumechange);

			this._object_node = handle;
			return handle;
		};

		__pVideoPlayerPluginElement._video_eventhandler_changedstatus = function (evt) {
			var comp = evt.target._linked_element.parent_elem.linkedcontrol;
			if (comp) {
				if (comp._obj_elem) {
					if (evt.type == "pause" && comp._obj_elem._current_event == "stop") {
						comp._obj_elem._current_event = "";
						comp._on_statuschanged("stop");
						return;
					}
					else if (evt.type == "canplay") {
						comp._obj_elem._current_event = "";
						comp._on_statuschanged("ready");
						return;
					}
					else if (evt.type == "pause") {
						comp._obj_elem._current_event = "pause";
					}
					else {
						comp._obj_elem._current_event = "";
					}
					comp._on_statuschanged(evt.type);
				}
			}
		};

		__pVideoPlayerPluginElement._video_eventhandler_timeupdate = function (evt) {
			var node = evt.target;
			var comp = node._linked_element.parent_elem.linkedcontrol;
			comp && comp._on_currenttimechanged(node.currentTime * 1000);
		};

		__pVideoPlayerPluginElement._video_eventhandler_volumechange = function (evt) {
			var node = evt.target;
			var comp = node._linked_element.parent_elem.linkedcontrol;
			comp && comp._on_volumechangechanged(parseInt(node.volume * 100), node.muted);
		};

		__pVideoPlayerPluginElement._video_eventhandler_error = function (evt) {
			var node = evt.target;
			var comp = node._linked_element.parent_elem.linkedcontrol;
			if (comp) {
				var errormsg = "";
				var statuscode = node.error.code;
				switch (statuscode) {
					case 1:
						errormsg = "fetching process aborted by user";
						break;
					case 2:
						errormsg = "error occurred when downloading";
						break;
					case 3:
						errormsg = "error occurred when decoding";
						break;
					case 4:
						errormsg = "video not supported";
						break;
				}
				comp._on_error("NativeError", errormsg, statuscode);
			}
		};

		__pVideoPlayerPluginElement._video_eventhandler_canplaythrough = function (evt) {
			var node = evt.target;
			var comp = node._linked_element.parent_elem.linkedcontrol;
			comp.size = node.videoWidth + " " + node.videoHeight;
			comp.duration = node.duration * 1000;
			comp._on_statuschanged("buffer");
		};

		__pVideoPlayerPluginElement.setElementSource = function (v) {
			this.source = v;
			var object_node = this._object_node;
			if (object_node) {
				var source_node = this._source_node;
				if (source_node) {
					object_node.removeChild(source_node);
				}
				var _doc = nexacro._managerFrameDoc;
				source_node = this._source_node = _doc.createElement("source");
				nexacro.__setHTMLAttr_Proeprty(source_node, 'src', v);
				if (this.type) {
					nexacro.__setHTMLAttr_Proeprty(source_node, 'type', v);
				}
				nexacro.__appendDOMNode(object_node, source_node);
			}
		};

		__pVideoPlayerPluginElement.setElementAttribute = function (attribute_name, v) {
			this[attribute_name] = v;
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLAttr_Proeprty(object_node, attribute_name, v);
			}
		};

		__pVideoPlayerPluginElement.setElementProperty = function (property_name, v) {
			this[property_name] = v;
			if (this._object_node) {
				this._object_node[property_name] = v;
			}
		};


		__pVideoPlayerPluginElement._play = function () {
			var object_node = this._object_node;
			object_node.play();
		};

		__pVideoPlayerPluginElement._pause = function () {
			var object_node = this._object_node;
			object_node.pause();
		};

		__pVideoPlayerPluginElement._stop = function () {
			var object_node = this._object_node;
			if (object_node.currentTime != null) {
				object_node.pause();
				nexacro.__setHTMLElem_Proeprty(object_node, "currentTime", 0);
				if (this._current_event == "pause") {
					var comp = this.parent_elem.linkedcontrol;
					if (comp) {
						comp._on_statuschanged("stop");
					}
				}
				else {
					this._current_event = "stop";
				}
			}
		};

		__pVideoPlayerPluginElement._setVideoMute = function (v) {
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLElem_Proeprty(object_node, "muted", !object_node.muted);
			}
			return;
		};

		__pVideoPlayerPluginElement._setVideoShowControlBar = function (name, v) {
			if (this.showcontrolbar != v) {
				this.showcontrolbar = v;
				var object_node = this._object_node;
				if (object_node) {
					if (this.showcontrolbar) {
						this._object_node.controls = true;
					}
					else {
						this._object_node.controls = false;
					}
				}
			}
		};

		__pVideoPlayerPluginElement._setVideoUrl = function (name, v) {
			this.source = v;
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLElem_Proeprty(object_node, "src", v);
			}
		};

		__pVideoPlayerPluginElement._setVideoCurrentTime = function (name, v) {
			if (v > -1) {
				var object_node = this._object_node;
				if (object_node) {
					var seconds = v / 1000;
					nexacro.__setHTMLElem_Proeprty(object_node, "currentTime", seconds);
				}
			}
		};

		__pVideoPlayerPluginElement._setVideoLoop = function (name, v) {
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLElem_Proeprty(object_node, "loop", v);
			}
		};

		__pVideoPlayerPluginElement._setVideoAutoPlay = function (name, v) {
			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLElem_Proeprty(object_node, "autoplay", v);
			}
		};

		__pVideoPlayerPluginElement._setVideoVolume = function (name, v) {
			var volume = v / 100;

			var object_node = this._object_node;
			if (object_node) {
				nexacro.__setHTMLElem_Proeprty(object_node, "volume", volume);
			}
		};

		__pVideoPlayerPluginElement._setVideoEnable = function (name, v) {
			this.enable = v;
		};

		__pVideoPlayerPluginElement._setVideo360VRMode = function (name, v) {
		};
	}

	__pVideoPlayerPluginElement.createCommand = function () {
		var owner_elem = this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this.handle) {
			var source = this.source;
			if (source) {
				var file_type = (source + "").substring(source.lastIndexOf(".") + 1).toLowerCase();
			}
			var type = this._getType(file_type);
			var node_name = this._node_type = this._getNodeType(file_type);
			this.owner_elem = owner_elem;
			var _doc = owner_elem._getRootWindowHandle();
			var str = "";
			str += "<" + node_name + " ";

			if (this.showcontrolbar == true) {
				str += "controls ";
			}
			if (this.source != null) {
				str += "src = '" + this.source + "'";
			}
			var type = this._getType(file_type);
			if (type != null) {
				str += "type = '" + type + "'";
			}
			if (this.autoplay != null) {
				str += "autoplay ";
			}
			if (this.volume != null) {
				str += "volume = '" + this.volume + "' ";
			}
			if (this.loop != null) {
				str += "loop = '" + this.loop + "' ";
			}
			var handle_style = this._getCommonStyleStr();
			if (handle_style) {
				str += "style = '" + handle_style + "' ";
			}
			str += ">";
			str += "</" + node_name + ">";
			return str;
		}
		return "";
	};

	__pVideoPlayerPluginElement.attachHandle = function (win) {
		if (!this.handle) {
			var parent_handle = win._doc.getElementById(this.parent.name);
			var handle = this._object_node = parent_handle.firstChild;
			handle._linked_element = this;
			nexacro._observeSysEvent(handle, "canplaythrough", "oncanplaythrough", this._video_eventhandler_canplaythrough);

			nexacro._observeSysEvent(handle, "ended", "onended", this._video_eventhandler_changedstatus);
			nexacro._observeSysEvent(handle, "error", "onerror", this._video_eventhandler_error);


			nexacro._observeSysEvent(handle, "pause", "onpause", this._video_eventhandler_changedstatus);
			nexacro._observeSysEvent(handle, "play", "onplay", this._video_eventhandler_changedstatus);
			nexacro._observeSysEvent(handle, "progress", "onprogress", this._video_eventhandler_progress);


			nexacro._observeSysEvent(handle, "timeupdate", "ontimeupdate", this._video_eventhandler_timeupdate);
		}
	};

	__pVideoPlayerPluginElement.destroy = function () {
		nexacro.PluginElement.prototype.destroy.call();
	};

	__pVideoPlayerPluginElement.set_volume = function (v) {
	};


	nexacro.CanvasElement = function (parent_elem, id) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		if (id) {
			this.id = id;
		}
	};

	var _pCanvasElement = nexacro._createPrototype(nexacro.Element, nexacro.CanvasElement);
	nexacro.CanvasElement.prototype = _pCanvasElement;

	_pCanvasElement._type_name = "CanvasElement";

	_pCanvasElement.lineOffset = 0.5;
	_pCanvasElement.scale = 10;
	_pCanvasElement.scalex = 0;
	_pCanvasElement.scaley = 0;


	_pCanvasElement.fillStyle = "#000000";
	_pCanvasElement.strokeStyle = "#000000";
	_pCanvasElement.lineCap = "butt";
	_pCanvasElement.lineJoin = "miter";
	_pCanvasElement.lineWidth = 1;
	_pCanvasElement.miterLimit = 10;
	_pCanvasElement.shadowColor = "#000000";
	_pCanvasElement._shadowColor = "#000000";
	_pCanvasElement.shadowOffsetX = 0;
	_pCanvasElement.shadowOffsetY = 0;
	_pCanvasElement.shadowBlur = 0;

	_pCanvasElement.font = null;
	_pCanvasElement._font = null;

	_pCanvasElement.textAlign = "start";
	_pCanvasElement.textBaseline = "top";
	_pCanvasElement.globalAlpha = 1;
	_pCanvasElement.globalCompositeOperation = 1;

	_pCanvasElement._status_stack = [];
	_pCanvasElement._matrix_stack = [];

	_pCanvasElement.createPattern = function () {
		return null;
	};

	_pCanvasElement.createLinearGradient = function (aX0, aY0, aX1, aY1) {
		var handle = this.handle;
		if (handle) {
			return nexacro.__createCanvasLinearGradient(handle, aX0, aY0, aX1, aY1);
		}
		return null;
	};

	_pCanvasElement.createRadialGradient = function (aX0, aY0, aR0, aX1, aY1, aR1) {
		var handle = this.handle;
		if (handle) {
			return nexacro.__createCanvasRadialGradient(handle, aX0, aY0, aR0, aX1, aY1, aR1);
		}
		return null;
	};

	_pCanvasElement.setElementFillStyle = function (fillstyle) {
		var handle = this.handle;
		if (handle && fillstyle) {
			this.fillStyle = fillstyle;
			if (fillstyle instanceof nexacro._ColorObject) {
				nexacro.__setCanvasFillColor(handle, fillstyle);
			}
			else {
				nexacro.__setCanvasFillGradation(handle, fillstyle);
			}
		}
	};

	_pCanvasElement.setElementFont = function (font) {
		var handle = this.handle;
		if (!font || !handle) {
			return;
		}

		var sysvalue = font.value;
		if (!this.font || this.font.value != sysvalue) {
			this.font = font;
			this._font = sysvalue;
			nexacro.__setCanvasFont(handle, font, sysvalue);
		}
		else {
			nexacro.__setCanvasFont(handle, font, sysvalue);
		}
	};

	_pCanvasElement.clearRect = function (x, y, dx, dy) {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasClearRect(handle, x, y, dx, dy);
		}
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9) {
		_pCanvasElement.setElementPosition = function (left, top) {
			if (this.left != left || this.top != top) {
				this.left = left;
				this.top = top;
				var handle = this.handle;
				if (handle) {
					nexacro.__setCanvasNodeStylePos(handle.style, left, top);
				}
			}
		};
	}
	else {
		_pCanvasElement.setElementPosition = function (left, top) {
			if (this.left != left || this.top != top) {
				this.left = left;
				this.top = top;
				var handle = this.handle;
				if (handle) {
					nexacro.__setCanvasNodeStylePos(handle._draw_node.style, left, top);
				}
			}
		};
	}

	_pCanvasElement.setElementGlobalAlpha = function (alpha) {
		var handle = this.handle;
		if (handle && alpha >= 0) {
			this.globalAlpha = alpha;
			nexacro.__setCanvasGlobalAlpha(handle, alpha);
		}
	};

	_pCanvasElement.setElementGlobalCompositeOperation = function (strOperation) {
		var handle = this.handle;
		if (handle && strOperation) {
			this.globalCompositeOperation = strOperation;
			nexacro.__setCanvasGlobalCompositeOperation(handle, strOperation);
		}
	};

	_pCanvasElement.setElementLineCap = function (linecap) {
		var handle = this.handle;
		if (handle) {
			this.lineCap = linecap;
			nexacro.__setCanvasLineCap(handle, linecap);
		}
	};

	_pCanvasElement.setElementLineJoin = function (linejoin) {
		var handle = this.handle;
		if (handle) {
			this.lineJoin = linejoin;
			nexacro.__setCanvasLineJoin(handle, linejoin);
		}
	};

	_pCanvasElement.setElementLineWidth = function (width) {
		var handle = this.handle;
		if (handle && isFinite(width)) {
			this.lineWidth = width;
			this.lineOffset = width / 2;
			nexacro.__setCanvasLineWidth(handle, width);
		}
	};

	_pCanvasElement.setElementStrokeStyle = function (strokestyle) {
		var handle = this.handle;
		if (handle && strokestyle) {
			this.strokeStyle = strokestyle;
			nexacro.__setCanvasStrokeStyle(handle, strokestyle);
		}
	};

	_pCanvasElement.setElementMiterLimit = function (limit) {
		var handle = this.handle;
		if (handle && limit) {
			this.miterLimit = limit;
			nexacro.__setCanvasMiterLimit(handle, limit);
		}
	};

	_pCanvasElement.setElementShadowBlur = function (blur) {
		var handle = this.handle;
		if (handle) {
			this.shadowBlur = blur;
			nexacro.__setCanvasShadowBlur(handle, blur);
		}
	};

	_pCanvasElement.setElementShadowColor = function (color) {
		var handle = this.handle;
		if (color && handle) {
			this.shadowColor = color;
			handle._shadowColor = nexacro._getWebColorFromXreColor(color.value);
			nexacro.__setCanvasShadowColor(handle, handle._shadowColor);
		}
	};

	_pCanvasElement.setElementShadowOffsetX = function (offsetx) {
		var handle = this.handle;
		if (handle) {
			this.shadowOffsetX = offsetx;
			nexacro.__setCanvasShadowOffsetX(handle, offsetx);
		}
	};

	_pCanvasElement.setElementShadowOffsetY = function (offsety) {
		var handle = this.handle;
		if (handle) {
			this.shadowOffsetY = offsety;
			nexacro.__setCanvasShadowOffsetY(handle, offsety);
		}
	};

	_pCanvasElement.setElementTextAlign = function (align) {
		var handle = this.handle;
		if (handle) {
			this.textAlign = align;
			nexacro.__setCanvasTextAlign(handle, align);
		}
	};

	_pCanvasElement.setElementTextBaseline = function (value) {
		var handle = this.handle;
		if (handle) {
			this.textBaseline = value;
			nexacro.__setCanvasTextBaseline(handle, value);
		}
	};

	_pCanvasElement.arc = function (x, y, r, start_rad, end_rad, counterclockwise) {
		var handle = this.handle;
		if (handle) {
			nexacro.__darwCanvasArc(handle, x, y, r, start_rad, end_rad, counterclockwise);
		}
	};

	_pCanvasElement.arc2 = function (x, y, r, start_deg, end_deg, counterclockwise) {
		var start_rad = nexacro._degreesToRadians(start_deg);
		var end_rad = nexacro._degreesToRadians(end_deg);
		var handle = this.handle;
		if (handle) {
			nexacro.__darwCanvasArc(handle, x, y, r, start_rad, end_rad, counterclockwise);
		}
	};

	_pCanvasElement.arcTo = function (x, y, x2, y2, r) {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasArcTo(handle, x, y, x2, y2, r);
		}
	};

	_pCanvasElement.beginPath = function () {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasBeginPath(handle);
		}
	};

	_pCanvasElement.bezierCurveTo = function (p1x, p1y, p2x, p2y, x, y) {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasBezierCurveTo(handle, p1x, p1y, p2x, p2y, x, y);
		}
	};

	_pCanvasElement.clip = function () {
		var handle = this.handle;
		if (handle) {
			nexacro.__clipCanvas(handle);
		}
	};

	_pCanvasElement.closePath = function () {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasClosePath(handle);
		}
	};

	_pCanvasElement.drawImage = function (objimage, x, y, imgWidth, imgHeight) {
		var handle = this.handle;
		var img = objimage.handle;
		if (img && handle) {
			nexacro.__drawCanvasImage(handle, img, x, y, imgWidth, imgHeight);
		}
	};

	_pCanvasElement.fill = function () {
		var handle = this.handle;
		if (handle) {
			nexacro.__fillCanvas(handle);
		}
	};

	_pCanvasElement.fillRect = function (x, y, dx, dy) {
		var handle = this.handle;
		if (handle) {
			nexacro.__fillCanvasRect(handle, x, y, dx, dy);
		}
	};

	_pCanvasElement.fillText = function (text, x, y, maxWidth) {
		var handle = this.handle;
		if (handle) {
			nexacro.__setCanvasTextBaseline(handle, this.textBaseline);
			nexacro.__drawCanvasFillText(handle, text, x, y, maxWidth);
		}
	};

	_pCanvasElement.isPointInPath = function (x, y) {
		var handle = this.handle;
		if (handle) {
			return nexacro.__isPointInCanvasPath(handle, x, y);
		}
		return false;
	};

	_pCanvasElement.lineTo = function (x, y) {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvaslineTo(handle, x, y);
		}
	};

	_pCanvasElement.moveTo = function (x, y) {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasmoveTo(handle, x, y);
		}
	};


	_pCanvasElement.quadraticCurveTo = function (px, py, x, y) {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasQuadraticCurveTo(handle, px, py, x, y);
		}
	};

	_pCanvasElement.rect = function (x, y, w, h) {
		var handle = this.handle;
		if (handle) {
			nexacro.__rectCanvas(handle, x, y, w, h);
		}
	};

	_pCanvasElement.rotate = function (angle_rad) {
		var handle = this.handle;
		if (handle) {
			nexacro.__rotateCanvas(handle, angle_rad);
		}
	};

	_pCanvasElement.rotate2 = function (angle) {
		var radians = nexacro._degreesToRadians(angle);
		this.rotate(radians);
	};

	_pCanvasElement.scale = function (dx, dy) {
		var handle = this.handle;
		this.scalex = dx;
		this.scaley = dy;
		if (handle) {
			nexacro.__scaleCanvas(handle, dx, dy);
		}
	};

	_pCanvasElement.setTransform = function (a, b, c, d, e, f) {
		var handle = this.handle;
		if (handle) {
			nexacro.__setCanvasTransform(handle, a, b, c, d, e, f);
		}
	};

	_pCanvasElement.stroke = function () {
		var handle = this.handle;
		if (handle) {
			nexacro.__strokeCanvas(handle);
		}
	};

	_pCanvasElement.strokeRect = function (x, y, width, height) {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasStrokeRect(handle, x, y, width, height);
		}
	};

	_pCanvasElement.strokeText = function (text, x, y, maxWidth) {
		var handle = this.handle;
		if (handle) {
			nexacro.__drawCanvasStrokeText(handle, text, x, y, maxWidth);
		}
	};

	_pCanvasElement.transform = function (a, b, c, d, e, f) {
		var handle = this.handle;
		if (handle) {
			nexacro.__transformCanvas(handle, a, b, c, d, e, f);
		}
	};

	_pCanvasElement.translate = function (x, y) {
		var handle = this.handle;
		if (handle) {
			nexacro.__translateCanvas(handle, x, y);
		}
	};

	_pCanvasElement.save = function () {
		var handle = this.handle;
		if (handle) {
			nexacro.__saveCanvas(handle);
		}
	};

	_pCanvasElement.toDataURL = function () {
		var handle = this.handle;
		try {
			if (handle) {
				return nexacro.__toDataURLCanvas(handle);
			}
		}
		catch (e) {
			try {
				if (handle) {
					return nexacro.__toDataURLCanvas(handle);
				}
			}
			catch (e) {
				return "";
			}
		}
	};


	_pCanvasElement.restore = function () {
		var handle = this.handle;
		if (handle) {
			nexacro.__restoreCanvas(handle);
		}
	};


	_pCanvasElement.drawFill = function () {
		this.fill();
		this.beginPath();
	};

	_pCanvasElement._setPenStyle = function (pen) {
		if (pen) {
			this.setElementStrokeStyle(pen.color);
			this.setElementLineWidth(parseInt(pen.width));
		}
	};

	_pCanvasElement.drawStrokeLine = function (x1, y1, x2, y2) {
		this.moveTo(x1, y1);
		this.lineTo(x2, y2);
		this.drawStroke();
	};

	_pCanvasElement.drawStrokeVLine = function (x, y1, y2) {
		this.moveTo(x, y1);
		this.lineTo(x, y2);
		this.drawStroke();
	};

	_pCanvasElement.drawStrokeHLine = function (y, x1, x2) {
		this.moveTo(x1, y);
		this.lineTo(x2, y);
		this.drawStroke();
	};

	_pCanvasElement.drawFillArc = function (x, y, r, start_rad, end_rad, bClockwise) {
		this.drawArc(x, y, r, start_rad, end_rad, bClockwise, true);
		this.closePath();
		this.fill();
		this.beginPath();
	};

	_pCanvasElement.drawFillArc2 = function (x, y, r, start_deg, end_deg, bClockwise) {
		var start_rad = nexacro._degreesToRadians(start_deg);
		var end_rad = nexacro._degreesToRadians(end_deg);
		this.arc(x, y, r, start_rad, end_rad, bClockwise);
		this.closePath();
		this.fill();
		this.beginPath();
	};



	_pCanvasElement.drawStrokeRect = function (x, y, w, h) {
		this.rect(x, y, w, h, true);
		this.drawStroke();
	};

	_pCanvasElement.drawStrokeArc = function (x, y, r, start_rad, end_rad, bClockwise) {
		this.arc(x, y, r, start_rad, end_rad, bClockwise);
		this.drawStroke();
	};

	_pCanvasElement.drawStrokeArc2 = function (x, y, r, start_deg, end_deg, bClockwise) {
		this.arc2(x, y, r, start_deg, end_deg, bClockwise);
		this.drawStroke();
	};

	_pCanvasElement.drawStrokeInsetRect = function (x, y, w, h) {
		this.insetRect(x, y, w, h);
		this.drawStroke();
	};

	_pCanvasElement.hline = function (y, x1, x2) {
		this.moveTo(x1, y);
		this.lineTo(x2, y);
	};

	_pCanvasElement.vline = function (x, y1, y2) {
		this.moveTo(x, y1);
		this.lineTo(x, y2);
	};

	_pCanvasElement._getElementScreenXY = function () {
		var handle = this.handle;
		var _doc = handle.ownerDocument || handle.document;
		return nexacro.__getHTMLNodePositionInFrame(_doc, handle);
	};


	if (!(nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)) {
		_pCanvasElement.create = function () {
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && owner_elem.handle) {
				var handle = this.handle;
				if (!handle) {
					this.owner_elem = owner_elem;
					var _doc = owner_elem._getRootWindowHandle();
					handle = _doc.createElement("div");
					handle._linked_element = this;

					nexacro.__setDOMNode_ClassName(handle, "nexacontainer");
					this.handle = this.dest_handle = handle;
					var _draw_node = _doc.createElement("canvas");
					handle._draw_node = _draw_node;
					handle._draw_ctx = _draw_node.getContext("2d");
					var node_style = _draw_node.style;
					node_style.border = "none";

					nexacro.__setDOMStyle_AbsoluteTransparent(node_style);
					nexacro.__setDOMStyle_Pos(node_style, this.left, this.top);
					nexacro.__setCanvasNodeSize(_draw_node, this.width, this.height);
					nexacro.__setCanvasTextAlign(handle, this.textAlign);
					nexacro.__setCanvasTextBaseline(handle, this.textBaseline);

					nexacro.__appendDOMNode(handle, _draw_node);

					nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
				}
			}
		};

		_pCanvasElement.createCommand = function () {
			return "";
		};

		_pCanvasElement.destroy = function () {
			var handle = this.handle;
			if (handle) {
				handle._linked_element = null;

				var _owner_handle = null;
				if (this.owner_elem && this.owner_elem.dest_handle) {
					_owner_handle = this.owner_elem.dest_handle;
				}

				if (!this.owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, handle);
				}

				this.owner_elem = null;
				this.handle = this.dest_handle = null;

				handle._draw_node = null;
				handle._draw_ctx = null;
			}
			this.parent = null;
			this.parent_elem = null;
		};

		_pCanvasElement._drawRotate = function (angle_deg) {
			var handle = this.handle;
			if (!handle) {
				return;
			}

			var angle_rad = angle_deg * Math.PI / 180;
			this.handle._draw_ctx.rotate(angle_rad);
		};

		_pCanvasElement.circle = function (x, y, r) {
			this.arc(x, y, r, 0, 2 * Math.PI, true);
		};

		_pCanvasElement.drawStrokeCircle = function (x, y, r) {
			this.arc(x, y, r, 0, 2 * Math.PI, true);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeInsetArc = function (x, y, r, start_deg, end_deg) {
			var gap = this.lineWidth / 2;
			this.drawArc(x, y, r - gap, start_deg, end_deg);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeInsetCircle = function (x, y, r) {
			var gap = this.lineOffset;
			this.arc(x, y, r - gap, 0, 2 * Math.PI, true);
			this.drawStroke();
		};

		_pCanvasElement.drawFillRect = function (x, y, dx, dy) {
			this.rect(x, y, dx, dy);
			this.fill();
			this.beginPath();
		};

		_pCanvasElement.endDraw = function () {
			this.beginPath();
			this.closePath();
		};

		_pCanvasElement.drawStroke = function () {
			this.stroke();
			this.beginPath();
		};

		_pCanvasElement.drawFillCircle = function (x, y, r) {
			this.arc(x, y, r, 0, 2 * Math.PI, true);
			this.fill();
			this.beginPath();
		};

		_pCanvasElement.insetRect = function (x, y, w, h) {
			if (w == 0 || h == 0) {
				return;
			}
			var gap = this.lineOffset;
			var wgap = (w > 0) ? gap : -gap;
			var hgap = (h > 0) ? gap : -gap;
			this.moveTo(x + wgap, y + hgap);
			this.lineTo(x + wgap, y + h - hgap);
			this.lineTo(x + w - wgap, y + h - hgap);
			this.lineTo(x + w - wgap, y + hgap);
			this.closePath();
		};

		_pCanvasElement._setLineStyle = function (line) {
			if (line) {
				this.setElementStrokeStyle(line.color);
				this.setElementLineWidth(parseInt(line.width));
			}
		};

		_pCanvasElement._moveCanvas = function (left, top, width, height) {
			this.left = left || 0;
			this.top = top || 0;
			this.width = width || 0;
			this.height = height || 0;
			if (this.handle) {
				var _draw_node = this.handle._draw_node;
				if (_draw_node) {
					_draw_node.width = this.width;
					_draw_node.height = this.height;
					var nodeStyle = _draw_node.style;
					nodeStyle.left = this.left + "px";
					nodeStyle.top = this.top + "px";
					nodeStyle.width = this.width + "px";
					nodeStyle.height = this.height + "px";
				}
			}
		};

		_pCanvasElement.measureText = function (text, font) {
			var handle = this.handle;
			if (handle) {
				if (!font) {
					font = nexacro.FontObject(handle._draw_ctx.font);
				}
				var obj = nexacro._getTextSize(text, font);
				return {
					width : obj[0], 
					height : obj[1]
				};
			}
		};

		_pCanvasElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				var handle = this.handle;
				if (handle) {
					nexacro.__setCanvasNodeSize(handle._draw_node, width, height);
				}
			}
		};
	}
	else {
		_pCanvasElement._image_data = null;
		_pCanvasElement.create = function () {
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && owner_elem.handle) {
				var handle = this.handle;
				if (!handle) {
					this.owner_elem = owner_elem;
					var _doc = owner_elem._getRootWindowHandle();
					handle = _doc.createElement("div");
					nexacro.__setDOMNode_ClassName(handle, "nexacontainer");
					handle._linked_element = this;

					handle._scale = 10;
					handle._half_scale = 5;
					handle._path_str = "";
					handle._vml_str = "";
					handle._line_scale = 1;
					handle._matrix = nexacro._createMatrixIdentity();
					handle._pathArray = [];
					handle._image = null;
					handle._textAlign = 2;
					handle._textBaseline = 2;

					this.handle = this.dest_handle = handle;
					var _draw_node = _doc.createElement("div");
					handle._draw_node = _draw_node;
					var node_style = _draw_node.style;
					node_style.border = "none";

					nexacro.__setDOMStyle_AbsoluteTransparent(node_style);
					nexacro.__setDOMStyle_Pos(node_style, this.left, this.top);
					nexacro.__setDOMStyle_Size(node_style, this.width, this.height);
					if (!this.font) {
						this.font = new nexacro.FontObject("8px Arial");
					}
					nexacro.__appendDOMNode(handle, _draw_node);
					nexacro.__appendDOMNode(owner_elem.dest_handle, handle);
				}
			}
		};

		_pCanvasElement.createCommand = function () {
			var str = "";
			var owner_elem = this.parent_elem.getContainerElement(this.position_step);
			if (owner_elem && owner_elem.handle) {
				var handle_style = this._getCommonStyleStr();
				str += "<div class = 'nexacontainer' >";
				str += "<div ";
				str += (handle_style) ? (" style='" + handle_style + "'>") : ">";
				str += "</div></div>";
			}
			return str;
		};

		_pCanvasElement.destroy = function () {
			var handle = this.handle;
			if (handle) {
				handle._linked_element = null;

				var _owner_handle = null;
				if (this.owner_elem && this.owner_elem.dest_handle) {
					_owner_handle = this.owner_elem.dest_handle;
				}

				if (!this.owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, handle);
				}

				this.owner_elem = null;
				this.handle = this.dest_handle = null;

				handle._linked_element = null;
				handle._pathArray = null;
				handle._matrix = null;
				handle._draw_node = null;
			}
			this.parent = null;
			this.parent_elem = null;
		};

		_pCanvasElement._getCoordSize = function (x, y) {
			var m = this.handle._matrix;
			var scale = this.handle._scale;
			var _half_scale = this.handle._half_scale;
			return {
				x : Math.round(scale * (x * m[0][0] + y * m[1][0] + m[2][0]) - _half_scale), 
				y : Math.round(scale * (x * m[0][1] + y * m[1][1] + m[2][1]) - _half_scale)
			};
		};

		_pCanvasElement._getCoordPos = function (x, y) {
			var m = this.handle._matrix;
			return {
				x : (x * m[0][0] + y * m[1][0] + m[2][0]), 
				y : (x * m[0][1] + y * m[1][1] + m[2][1])
			};
		};

		_pCanvasElement._getLineCapStr = function () {
			return (this.lineCap == "butt") ? "flat" : this.lineCap;
		};

		_pCanvasElement._moveCanvas = function (left, top, width, height) {
			this.left = left || 0;
			this.top = top || 0;
			this.width = width || 0;
			this.height = height || 0;
			if (this.handle && this.handle._draw_node) {
				var _draw_node = this.handle._draw_node;
				if (_draw_node) {
					var nodestyle = _draw_node.style;
					nodestyle.left = this.left + "px";
					nodestyle.top = this.top + "px";
					nodestyle.width = this.width + "px";
					nodestyle.height = this.height + "px";
				}
			}
		};

		_pCanvasElement._setLineStyle = function (line) {
			if (line) {
				this.setElementStrokeStyle(line.color);
				this.setElementLineWidth(parseInt(line.width));
			}
		};

		_pCanvasElement._setPenStyle = function (pen) {
			if (pen) {
				this.setElementStrokeStyle(pen.color);
				this.setElementLineWidth(parseInt(pen.width));
			}
		};

		_pCanvasElement._circle = function (x, y, r) {
			var handle = this.handle;
			if (handle) {
				var scale = handle._scale;
				var hscale = handle._half_scale;
				var _r = r * scale;
				var xStart = x + _r - hscale;
				var yStart = y - hscale;

				var p = this._getCoordSize(x, y);
				var sp = this._getCoordSize(xStart, yStart);
				var sub = ' at' + (p.x - _r) + ',' + (p.y - _r) + ' ' + (p.x + _r) + ',' + (p.y + _r) + ' ' + 
					sp.x + ',' + sp.y + ' ' + sp.x + ',' + sp.y + ' ';

				handle._pathArray.push({
					x : p.x - _r, 
					y : p.y - _r
				});
				handle._pathArray.push({
					x : p.x + _r, 
					y : p.y + _r
				});
				handle._pathArray.push({
					x : sp.x, 
					y : sp.y
				});

				handle._path_str += sub;
			}
		};

		_pCanvasElement.circle = function (x, y, r, bstroke) {
			if (bstroke) {
				var gap = this.lineOffset;
				this._circle(x, y, r - gap);
			}
			else {
				this._circle(x, y, r);
			}
		};

		_pCanvasElement.insetRect = function (x, y, w, h) {
			if (w == 0 || h == 0) {
				return;
			}
			var gap = this.lineOffset;
			var wgap = (w > 0) ? gap : -gap;
			var hgap = (h > 0) ? gap : -gap;
			this.moveTo(x + wgap, y + hgap);
			this.lineTo(x + wgap, y + h - hgap);
			this.lineTo(x + w - wgap, y + h - hgap);
			this.lineTo(x + w - wgap, y + hgap);
			this.closePath();
		};


		_pCanvasElement.drawFillRect = function (x, y, dx, dy) {
			this.moveTo(x, y);
			this.lineTo(x + dx, y);
			this.lineTo(x + dx, y + dy);
			this.lineTo(x, y + dy);
			this.closePath();
			this.fill();
			this.beginPath();
		};

		_pCanvasElement.strokeRect = function (x, y, dx, dy) {
			this.rect(x, y, dx, dy, true);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeInsetArc = function (x, y, r, start_deg, end_deg) {
			var gap = this.lineWidth;
			this.drawArc(x, y, r - gap, start_deg, end_deg);
			this.drawStroke();
			this.closePath();
		};

		_pCanvasElement.drawFillCircle = function (x, y, r) {
			this.circle(x, y, r);
			this.fill();
			this.beginPath();
		};

		_pCanvasElement.drawStrokeCircle = function (x, y, r) {
			var gap = this.lineOffset;
			this.circle(x, y, r + gap);
			this.circle(x, y, r - gap);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeInsetCircle = function (x, y, r) {
			var gap = this.lineWidth;
			this.circle(x, y, r);
			this.circle(x, y, r - gap);
			this.drawStroke();
		};

		_pCanvasElement.drawStroke = function () {
			var handle = this.handle;
			var elem = handle._linked_element;
			if (handle && handle._path_str) {
				var vml_str = "";
				vml_str += "<v:shape filled='f' stroked='t' style='position:absolute;width:10px;height:10px;' ";
				vml_str += "coordorigin='0 0' coordsize='" + handle._scale * 10 + ' ' + handle._scale * 10 + "' ";
				vml_str += "color='" + handle._stroke_color + "' ";
				vml_str += "strokecolor='" + handle._stroke_color + "' ";
				if (handle._stroke_alpha != 1) {
					vml_str += "opacity='" + handle._stroke_alpha + "' ";
				}

				var lineWidth = elem.lineWidth * handle._line_scale;
				vml_str += "joinstyle='" + elem.lineJoin + "' endcap='" + elem._getLineCapStr() + "' strokeweight='" + lineWidth + "px' ";
				vml_str += "path='" + handle._path_str + "' />";

				handle._vml_str += vml_str;
				handle._draw_node.innerHTML = handle._vml_str;
				handle._path_str = "";
			}
		};
		_pCanvasElement.endDraw = function () {
			this.beginPath();
		};

		_pCanvasElement.measureText = function (text, font) {
			var handle = this.handle;
			if (handle) {
				if (!font) {
					font = this.font;
				}
				var obj = nexacro._getTextSize(text, font);
				return {
					width : obj[0], 
					height : obj[1]
				};
			}
		};

		_pCanvasElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				var handle = this.handle;
				if (handle) {
					nexacro.__setCanvasNodeSize(handle._draw_node.style, width, height);
					handle._draw_node.innerHTML = "";
					handle._vml_str = "";
					handle._path_str = "";
				}
			}
		};
	}

	_pCanvasElement.drawFillText = function (text, x, y, maxwidth) {
		this.setElementTextBaseline(this.textBaseline);
		this.fillText(text, x, y, maxwidth);
		this.beginPath();
	};



	nexacro._CanvasGradient = function (type) {
		this.type = type;
		this.x0 = 0;
		this.y0 = 0;
		this.r0 = 0;
		this.x1 = 0;
		this.y1 = 0;
		this.r1 = 0;
		this.colors = [];
	};

	var __pCanvasGradient = nexacro._CanvasGradient.prototype;

	__pCanvasGradient.addColorStop = function (aOffset, aColor) {
		var color = nexacro._getWebColorFromXreColor(aColor);
		var alpha = nexacro._getXreColorAlpha(aColor) / 255;
		this.colors.push({
			offset : aOffset, 
			color : color, 
			alpha : alpha
		});
	};


	nexacro.GridScrollableControlElement = function (parent_elem) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;

		this._target_vscroll_elements = null;
		this._target_hscroll_elements = null;
		var client_elem = new nexacro._ContainerElement(this, false);
		this._client_elem = client_elem;
	};
	var _pGridScrollableControlElement = nexacro._createPrototype(nexacro.ScrollableControlElement, nexacro.GridScrollableControlElement);
	nexacro.GridScrollableControlElement.prototype = _pGridScrollableControlElement;
	_pGridScrollableControlElement._type_name = "GridScrollableControlElement";








	_pGridScrollableControlElement._on_attachHandle = function (win) {
		if (this._hscroll_control) {
			this._hscroll_control.attachHandle(win);
		}
		if (this._vscroll_control) {
			this._vscroll_control.attachHandle(win);
		}

		nexacro._observeSysEvent(this._client_elem.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
		nexacro._observeSysEvent(this.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
	};

	_pGridScrollableControlElement.destroy = function () {
		var handle = this.handle;
		if (handle) {
			this._removeElementHandle();
			this.dest_handle = null;

			if (this._is_popup) {
				nexacro._destroyFrameNode(handle, this._frame_node);
				this._frame_node = null;
			}
			if (this._edge_elem) {
				this._edge_elem.destroy();
				this._edge_elem = null;
			}

			if (this._client_elem) {
				nexacro._stopSysObserving(this._client_elem.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
				this._client_elem.destroy();
				this._client_elem = null;
			}

			this._on_destroy();
		}
		this.owner_elem = null;
		this.handle = null;
		this.parent = null;
		this.parent_elem = null;
		this.linkedcontrol = null;
	};

	_pGridScrollableControlElement._on_destroy = function () {
		var handle = this.handle;
		if (handle) {
			nexacro._stopSysObserving(handle, "scroll", "onscroll", this._syshandler_onscroll_forward);

			if (this._target_vscroll_elements) {
				if (nexacro._isArray(this._target_vscroll_elements)) {
					for (var i = 0, n = this._target_vscroll_elements.length; i < n; i++) {
						this._target_vscroll_elements[i] = null;
					}
				}

				this._target_vscroll_elements = null;
			}

			if (this._target_hscroll_elements) {
				if (nexacro._isArray(this._target_hscroll_elements)) {
					for (var i = 0, n = this._target_hscroll_elements.length; i < n; i++) {
						this._target_hscroll_elements[i] = null;
					}
				}

				this._target_hscroll_elements = null;
			}

			this._hscroll_control = null;
			this._vscroll_control = null;
		}
	};

	_pGridScrollableControlElement.clearContents = function () {
		if (this.handle) {
			nexacro._stopSysObserving(this._client_elem.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			nexacro._stopSysObserving(this.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			this._client_elem.clearContents();
		}
	};

	_pGridScrollableControlElement._syshandler_onscroll_forward = function (evt) {
		if (window.event) {
			evt = window.event;
		}
		var target = evt.srcElement || evt.target;
		target.scrollLeft = 0;
		target.scrollTop = 0;
	};

	_pGridScrollableControlElement.getContainerElement = function (position_step) {
		return this._client_elem;
	};

	_pGridScrollableControlElement.setVertScrollElements = function (elems) {
		this._target_vscroll_elements = elems;
	};

	_pGridScrollableControlElement.setHorzScrollElements = function (elems) {
		this._target_hscroll_elements = elems;
	};

	_pGridScrollableControlElement._setContainerVScrollPos = function (pos) {
		var vert_elems = this._target_vscroll_elements;
		if (vert_elems) {
			vert_elems.setElementVScrollPos(pos);
		}
	};

	_pGridScrollableControlElement._setContainerHScrollPos = function (pos) {
		var horz_elems = this._target_hscroll_elements;
		if (horz_elems) {
			if (nexacro._isArray(horz_elems)) {
				var elem;
				for (var i = 0, n = horz_elems.length; i < n; i++) {
					elem = horz_elems[i];
					elem.setElementHScrollPos(pos);
				}
			}
			else {
				horz_elems.setElementHScrollPos(pos);
			}
		}
	};

	_pGridScrollableControlElement._setContainerMaxHeight = function (height) {
		var vert_elems = this._target_vscroll_elements;
		if (vert_elems) {
			this.container_maxheight = height;
			if (nexacro._isArray(vert_elems)) {
				var elem;
				for (var i = 0, n = vert_elems.length; i < n; i++) {
					elem = vert_elems[i];
					elem._setContainerMaxHeight(height);
				}
			}
			else {
				vert_elems._setContainerMaxHeight(height);
			}
		}
	};

	_pGridScrollableControlElement._setContainerMaxWidth = function (width) {
		var horz_elems = this._target_hscroll_elements;
		if (horz_elems) {
			this.container_maxwidth = width;
			if (nexacro._isArray(horz_elems)) {
				var elem;
				for (var i = 0, n = horz_elems.length; i < n; i++) {
					elem = horz_elems[i];
					elem._setContainerMaxWidth(width);
				}
			}
			else {
				horz_elems._setContainerMaxWidth(width);
			}
		}
	};

	_pGridScrollableControlElement._on_updateClientRect = function () {
		var client_left = 0;
		var client_top = 0;
		var client_width = this.inner_width;
		var client_height = this.inner_height;

		if (this._apply_client_padding) {
			var padding = this.padding ? this.padding : this._padding_info;
			if (padding) {
				client_left = padding.left;
				client_top = padding.top;
				client_width -= padding.left + padding.right;
				client_height -= padding.top + padding.bottom;
			}
		}

		var client_elem = this._client_elem;
		if (!client_elem || client_width == 0 || client_height == 0) {
			return 0;
		}

		var v_elements = this._target_vscroll_elements, v_element = v_elements, h_elements = this._target_hscroll_elements, h_element = h_elements;
		if (nexacro._isArray(v_elements)) {
			v_element = v_elements[0];
		}
		if (nexacro._isArray(h_elements)) {
			h_element = h_elements[0];
		}


		var zoomfactor = this.zoom / 100;
		var zclient_width = this._zclient_width = client_width / zoomfactor;
		var zclient_height = this._zclient_height = client_height / zoomfactor;
		var zclient_width_body = ((h_element) ? h_element._calculateClientWidth(client_width) : client_width) / zoomfactor;
		var zclient_height_body = ((v_element) ? v_element._calculateClientHeight(client_height - this.client_height) : client_height) / zoomfactor;
		var container_maxwidth = (h_element) ? h_element._getContainerMaxWidth() : 0;
		var container_maxheight = (v_element) ? v_element._getContainerMaxHeight() : 0;

		var scroll_left = this.scroll_left;
		var scroll_top = this.scroll_top;

		if (zoomfactor != 1) {
			zclient_width = zclient_width;
			zclient_height = zclient_height;
			zclient_width_body = zclient_width_body;
			zclient_height_body = zclient_height_body;
			container_maxwidth = container_maxwidth;
			container_maxheight = container_maxwidth;
		}

		var step_count = this._step_count;
		var step_index = this._step_index;
		var step_containers = this._step_containers;
		if (step_count > 0 && step_containers) {
			container_maxwidth = step_count * zclient_width_body;
		}

		var reset_vlimit = false;
		var reset_hlimit = false;

		var hscroll_visible = false;
		var vscroll_visible = false;

		var hscroll_limit = 0;
		var vscroll_limit = 0;

		var hscrollbartype = this._hscrollbartype;
		var vscrollbartype = this._vscrollbartype;

		if (step_count > 0 && step_containers) {
			hscrollbartype = "none";
		}

		if (zclient_width_body >= 0 && container_maxwidth > zclient_width_body) {
			hscroll_limit = container_maxwidth - zclient_width_body;

			if (hscrollbartype != "none" && hscrollbartype != "autoindicator") {
				client_height -= this._hscroll_size;
				zclient_height = client_height / zoomfactor;
				zclient_height_body -= this._hscroll_size / zoomfactor;
			}
		}
		else {
			if (hscrollbartype == "fixed") {
				client_height -= this._hscroll_size;
				zclient_height = client_height / zoomfactor;
				zclient_height_body -= this._hscroll_size / zoomfactor;
			}

			hscroll_limit = 0;
		}

		if (zclient_height_body >= 0 && container_maxheight > zclient_height_body) {
			vscroll_limit = container_maxheight - zclient_height_body;

			if (vscrollbartype != "none" && vscrollbartype != "autoindicator") {
				client_width -= this._vscroll_size;
				zclient_width = client_width / zoomfactor;
				zclient_width_body -= this._vscroll_size / zoomfactor;
			}

			if (zclient_width_body >= 0 && container_maxwidth > zclient_width_body) {
				if (hscrollbartype != "none" && hscrollbartype != "autoindicator" && hscroll_limit == 0) {
					client_height -= this._hscroll_size;
					zclient_height = client_height / zoomfactor;
					zclient_height_body -= this._hscroll_size / zoomfactor;
					vscroll_limit += this._hscroll_size;
				}
				hscroll_limit = container_maxwidth - zclient_width_body;
			}
		}
		else {
			if (vscrollbartype == "fixed") {
				client_width -= this._vscroll_size;
				zclient_width = client_width / zoomfactor;
				zclient_width_body -= this._vscroll_size / zoomfactor;

				if (zclient_width_body >= 0 && container_maxwidth > zclient_width_body) {
					hscroll_limit = container_maxwidth - zclient_width_body;
				}
			}

			vscroll_limit = 0;
		}

		if (step_count > 0 && step_containers) {
			container_maxwidth = step_count * zclient_width_body;

			if (zclient_width_body >= 0 && container_maxwidth > zclient_width_body) {
				hscroll_limit = container_maxwidth - zclient_width_body;
			}
		}

		if (this.hscroll_limit != hscroll_limit) {
			reset_hlimit = true;
			this.hscroll_limit = hscroll_limit;

			if (scroll_left > hscroll_limit) {
				this.setElementHScrollPos(hscroll_limit);
			}
		}

		if (this.vscroll_limit != vscroll_limit) {
			reset_vlimit = true;
			this.vscroll_limit = vscroll_limit;

			if (scroll_top > vscroll_limit) {
				this.setElementVScrollPos(vscroll_limit);
			}
		}

		this._zclient_width = zclient_width;
		this._zclient_height = zclient_height;

		var ret = 0;
		if (this.client_left != client_left || this.client_top != client_top) {
			this.client_left = client_left;
			this.client_top = client_top;
			ret = 1;
		}
		else if (step_count > 0) {
			ret = 1;
		}

		if (this.client_width != client_width || this.client_height != client_height) {
			this.client_width = client_width;
			this.client_height = client_height;
			ret += 2;
		}
		else if (this.client_width != zclient_width || this.client_height != zclient_height) {
			ret += 2;
		}

		return ret;
	};




	_pGridScrollableControlElement.setElementHScrollPos = function (hpos) {
		var h_element = this._target_hscroll_elements;

		if (h_element) {
			if (nexacro._isArray(h_element)) {
				h_element = h_element[0];
			}
			if (hpos < 0) {
				hpos = 0;
			}
			if (hpos > this.hscroll_limit) {
				hpos = this.hscroll_limit;
			}
			var scrollLeft = h_element.scroll_left;
			if (scrollLeft != hpos || this._reset_scrollpos) {
				this.scroll_left = hpos;
				this.linkedcontrol._scroll_left = hpos;
				this._setContainerHScrollPos(hpos);
			}

			if (!this._use_translate_scroll && this.parent._procRefreshDOM == true) {
				var areacontents;
				if (nexacro._isArray(h_element)) {
					areacontents = h_element[0]._client_body_element;
				}
				else {
					areacontents = h_element._client_body_element;
				}

				if (areacontents) {
				}
			}
		}
	};

	_pGridScrollableControlElement.setElementVScrollPos = function (vpos) {
		var v_element = this._target_vscroll_elements;

		if (v_element) {
			if (nexacro._isArray(v_element)) {
				v_element = v_element[0];
			}
			if (vpos < 0) {
				vpos = 0;
			}
			if (vpos > this.vscroll_limit) {
				vpos = this.vscroll_limit;
			}
			var scrollTop = v_element._getScrollTop();
			this.scroll_top = vpos;

			if (scrollTop != vpos || this._reset_scrollpos) {
				this.linkedcontrol._scroll_top = vpos;
				this._setContainerVScrollPos(vpos);
			}

			if (!this._use_translate_scroll && this.parent._procRefreshDOM == true) {
				var bandcontents;
				if (nexacro._isArray(v_element)) {
					bandcontents = v_element[0]._client_elem;
				}
				else {
					bandcontents = v_element._client_elem;
				}

				if (bandcontents) {
					bandcontents._refreshDOM();
				}
			}
		}
	};


	_pGridScrollableControlElement.setElementScrollPos = function (hpos, vpos) {
		var v_element = this._target_vscroll_elements;
		var h_element = this._target_hscroll_elements;

		if (v_element) {
			if (nexacro._isArray(v_element)) {
				v_element = v_element[0];
			}
			if (vpos < 0) {
				vpos = 0;
			}
			if (vpos > this.vscroll_limit) {
				vpos = this.vscroll_limit;
			}

			var scrollTop = v_element._getScrollTop();
			if (scrollTop != vpos) {
				this.scroll_top = vpos;
				this.linkedcontrol._scroll_top = vpos;
				this._setContainerVScrollPos(vpos);
			}
		}
		if (h_element) {
			if (nexacro._isArray(h_element)) {
				h_element = h_element[0];
			}
			if (hpos < 0) {
				hpos = 0;
			}
			if (hpos > this.hscroll_limit) {
				hpos = this.hscroll_limit;
			}

			var scrollLeft = h_element.scroll_left;
			if (scrollLeft != hpos) {
				this.scroll_left = hpos;
				this.linkedcontrol._scroll_left = hpos;
				this._setContainerHScrollPos(hpos);
			}
		}
	};

	_pGridScrollableControlElement._setInnerElementScrollMaxTops = function (tops) {
		var v_element = this._target_vscroll_elements;
		if (v_element && tops) {
			v_element._client_elem._scroll_max_arr = tops;
		}
	};

	_pGridScrollableControlElement.setElementScrollMaxSize = function (width, height) {
		if (this._client_elem) {
			this._client_elem.setElementScrollMaxSize(width, height);
		}

		var v_element = this._target_vscroll_elements;
		if (nexacro._isArray(v_element)) {
			v_element = v_element[0];
		}
		var h_element = this._target_hscroll_elements;
		if (nexacro._isArray(h_element)) {
			h_element = h_element[0];
		}

		this._setContainerMaxHeight(height);
		this._setContainerMaxWidth(width);

		if (v_element) {
			this._updateClientRect();
		}
	};

	nexacro.GridBandControlElement = function (parent_elem, type) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;
		this._type = type;
		this._client_elem = new nexacro._GridBandContainerElement(this, (type == "body"));
		this._client_elem_fix = null;
		this._fix_height = 0;
		this.container_maxwidth = 0;
		this.container_maxheight = 0;
		this._cur_border = null;
	};

	var _pGridBandControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.GridBandControlElement);
	nexacro.GridBandControlElement.prototype = _pGridBandControlElement;

	_pGridBandControlElement._type_name = "GridBandControlElement";

	_pGridBandControlElement.scroll_left = 0;
	_pGridBandControlElement.scroll_top = 0;

	_pGridBandControlElement.create = function (win) {
		var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && owner_elem.handle) {
			if (!this.handle) {
				this.owner_elem = owner_elem;
				_doc = win._doc || owner_elem._getRootWindowHandle();

				var handle = _doc.createElement("div");
				handle.id = this.name;
				handle._linked_element = this;

				this.handle = this.dest_handle = handle;
				nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

				var handle_style = handle.style;
				nexacro.__setDOMStyle_Pos(handle_style, this.left, this.top);
				nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);


				if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
					if (this.linkedcontrol && this.linkedcontrol._skip_mobile_tabfocus) {
						this.tabindex = -99;
					}
				}

				this._refreshControl(handle, handle_style, _doc);

				if (this.direction) {
					nexacro.__setDOMStyle_Direction(handle_style, this.direction);
				}

				nexacro.__appendDOMNode((this._is_nc_element) ? owner_elem.handle : owner_elem.dest_handle, handle);

				if (!this._client_elem.handle) {
					this._client_elem.create(win);
				}

				if (this._client_elem_fix && !this._client_elem_fix.handle) {
					this._client_elem_fix.create(win);
				}
			}
		}
	};

	_pGridBandControlElement.destroy = function () {
		if (this._client_elem_fix) {
			this._client_elem_fix.destroy();
			this._client_elem_fix = null;
		}
		return nexacro.ControlElement.prototype.destroy.call(this);
	};

	_pGridBandControlElement._setFixArea = function (height) {
		this._fix_height = height;

		if (height) {
			if (!this._client_elem_fix) {
				this._client_elem_fix = new nexacro._GridBandContainerElement(this, true, "fixed");
			}
		}
		else {
			if (this._client_elem_fix) {
				this._client_elem_fix.destroy();
				this._client_elem_fix = null;
			}
		}

		if (this.handle && this._client_elem_fix && !this._client_elem_fix.handle) {
			this._client_elem_fix.create();
		}

		this._updateClientSize();
	};

	_pGridBandControlElement.getContainerElement = function (is_fixed) {
		if (is_fixed) {
			return this._client_elem_fix;
		}

		return this._client_elem;
	};

	_pGridBandControlElement._setContainerMaxHeight = function (height) {
		if (this._type == "body") {
			if (this.container_maxheight != height) {
				this.container_maxheight = height;
				this._client_elem._setScrollHeight(height);
			}
		}
	};

	_pGridBandControlElement._resetExtendContainer = function () {
		this._client_elem._setScrollHeight(this.container_maxheight);
	};

	_pGridBandControlElement._calculateClientHeight = function (change_height) {
		var border = this.border || this.linkedcontrol._getCSSStyleValue("border", "enabled");
		var c_height = this.client_height + change_height + ((border) ? border._getBorderHeight() : 0);
		return c_height;
	};


	_pGridBandControlElement._getContainerMaxHeight = function () {
		if (this._type == "body") {
			return this.container_maxheight;
		}
		else {
			return this.client_height;
		}
	};

	_pGridBandControlElement._getScrollTop = function () {
		if (this._type == "body") {
			return this.scroll_top;
		}
		else {
			return 0;
		}
	};

	_pGridBandControlElement.setElementScrollMaxSize = function (width, height) {
		if (this._client_elem) {
			this._client_elem.setElementScrollMaxSize(width, height);
		}
	};

	_pGridBandControlElement._on_change_clientSize = function (width, height) {
		nexacro.ControlElement.prototype._on_change_clientSize.call(this, width, height);

		var client_element_fix = this._client_elem_fix;

		if (client_element_fix) {
			client_element_fix.setElementSize(width, this._fix_height);
		}
	};

	_pGridBandControlElement._on_updateClientRect = function () {
		var ret = 0;
		var client_left = 0;
		var client_top = 0;
		var client_width = this.inner_width;
		var client_height = this.inner_height;

		if (!this._cur_border) {
			this._cur_border = this.border || this.linkedcontrol._getCSSStyleValue("border", "normal");
		}

		var border = this._cur_border;

		if (border) {
			client_width += border._getBorderWidth();
			client_height += border._getBorderHeight();
		}

		var fix_height = this._fix_height;

		client_top += fix_height;
		client_height -= fix_height;

		if (this.client_left != client_left || this.client_top != client_top) {
			this.client_left = client_left;
			this.client_top = client_top;
			ret = 1;
		}
		if (this.client_width != client_width || this.client_height != client_height) {
			this.client_width = client_width;
			this.client_height = client_height;
			ret += 2;
		}

		return ret;
	};

	_pGridBandControlElement._updateClientSize = function () {
		var client_left = 0;
		var client_top = 0;
		var client_width = this.inner_width;
		var client_height = this.inner_height;

		if (!this._cur_border) {
			this._cur_border = this.border || this.linkedcontrol._getCSSStyleValue("border", "normal");
		}

		var border = this._cur_border;

		if (border) {
			client_width += border._getBorderWidth();
			client_height += border._getBorderHeight();
		}

		var fix_height = this._fix_height;

		client_top += fix_height;
		client_height -= fix_height;

		var client_element_fix = this._client_elem_fix;
		if (client_element_fix) {
			client_element_fix.setElementPosition(client_left, 0);
			client_element_fix.setElementSize(client_width, fix_height);
		}

		var client_element = this._client_elem;
		if (client_element) {
			if (this.client_left != client_left || this.client_top != client_top) {
				this.client_left = client_left;
				this.client_top = client_top;
				client_element.setElementPosition(client_left, client_top);
			}
			if (this.client_width != client_width || this.client_height != client_height) {
				this.client_width = client_width;
				this.client_height = client_height;
				client_element.setElementSize(client_width, client_height);
			}
		}
		else {
			this.client_left = client_left;
			this.client_top = client_top;
			this.client_width = client_width;
			this.client_height = client_height;
		}
	};

	_pGridBandControlElement.setElementVScrollPos = function (vpos) {
		if (this._type == "body") {
			this._client_elem._try_user_setvpos = true;
			this._client_elem.setElementVScrollPos(vpos);
			this._client_elem._try_user_setvpos = null;
			this.scroll_top = vpos;
		}
	};

	_pGridBandControlElement._setOnScrollCallbackTarget = function (target) {
		if (this._type == "body") {
			this._client_elem._grid = target;
		}
	};

	_pGridBandControlElement._getExtendContainerCount = function () {
		if (this._client_elem) {
			return this._client_elem._ext_inners.length;
		}

		return 0;
	};

	_pGridBandControlElement.setElementBorder = function (border) {
		var retn = nexacro.ControlElement.prototype.setElementBorder.call(this, border);
		this._cur_border = border;
		this._updateClientSize();
		this._client_elem._adjustPos();
		return retn;
	};

	_pGridBandControlElement.setElementShadow = nexacro._emptyFn;


	nexacro._GridBandContainerElement = function (parent_elem, use_translate_scroll, type) {
		nexacro._ContainerElement.call(this, parent_elem, use_translate_scroll, type);
		this._scroll_max_arr = [];
		this._ext_inners = [];
		this._grid = null;
	};



	var __pGridBandContainerElement = nexacro._createPrototype(nexacro._ContainerElement, nexacro._GridBandContainerElement);

	nexacro._GridBandContainerElement.prototype = __pGridBandContainerElement;
	__pGridBandContainerElement._type_name = "GridBandContainerElement";

	__pGridBandContainerElement._adjustPos = function () {
		this.setElementPosition(this.left, this.top);
	};

	__pGridBandContainerElement.destroy = function () {
		nexacro._ContainerElement.prototype.destroy.call(this);
		this._grid = null;
	};

	__pGridBandContainerElement.setElementPosition = function (left, top) {
		var border = this.parent._cur_border;
		this.left = left;
		this.top = top;
		var handle = this.handle;
		if (handle) {
			if (border) {
				left = left - border.left._width;
				top = top - border.top._width;
			}
			nexacro.__setDOMStyle_Pos(handle.style, left, top);
		}
	};

	__pGridBandContainerElement.setElementSize = function (width, height) {
		var border = this.parent._cur_border;
		this.width = width;
		this.height = height;
		if (width < 0) {
			width = 0;
		}
		if (height < 0) {
			height = 0;
		}

		var handle = this.handle;
		if (handle) {
			if (border) {
				width = width + border.left._width + border.right._width;
				height = height + border.top._width + border.bottom._width;
			}
			if (width && height) {
				nexacro.__setDOMStyle_Size(handle.style, width, height);
			}
			else {
				nexacro.__clearDOMStyle_Size(handle.style);
			}

			if (this.type == "fixed") {
				if (this.dest_handle) {
					nexacro.__setDOMStyle_Size(this.dest_handle.style, width, height);
				}
			}
			else {
				if (this.dest_handle) {
					this._setScrollHeight(this.height);
				}
			}
		}
	};

	if (nexacro._use_translate_scroll) {
		__pGridBandContainerElement.create = function (win) {
			var owner_elem = this.owner_elem = this.parent_elem;

			nexacro._ContainerElement.prototype.create.call(this, win);

			this._setScrollHeight(owner_elem.container_maxheight);
			nexacro._observeSysEvent(this.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			this._adjustPos();
		};

		__pGridBandContainerElement.attachHandle = function (win) {
			nexacro._ContainerElement.prototype.attachHandle.call(this, win);
			nexacro.__setDOMStyle_Size(this.dest_handle.style, this.width, this.height);

			if (this.parent._type == "body") {
				this._setScrollHeight(this.owner_elem.container_maxheight);
			}

			nexacro._observeSysEvent(this.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			this.setElementPosition(this.left, this.top);
		};

		__pGridBandContainerElement._syshandler_onscroll_forward = function (evt) {
			var target = evt.target;
			if (!target) {
				return;
			}

			var container = target._linked_element;
			if (container) {
				if (container._noEventScroll == true) {
					container._noEventScroll = false;
					return;
				}

				var elem_scroll_top = container._scroll_top | 0;

				if (target.scrollLeft > 0) {
					container._noEventScroll = true;
					target.scrollLeft = 0;
				}
				if (target.scrollTop > 0) {
					container._noEventScroll = true;
					target.scrollTop = 0;
				}
			}
		};

		__pGridBandContainerElement._setInnerElementExtend = function () {
			var handle = this.handle;
			var dest_handle = this.dest_handle;
			var _scroll_max = this._scroll_max_arr;
			var _doc = this.owner_elem._getRootWindowHandle();

			this._removeExtinners();
			this._ext_inners = [];

			if (_scroll_max.length > 0) {
				for (var i = 1; i < _scroll_max.length; i++) {
					var _ext_inner = _doc.createElement("div");
					nexacro.__setDOMNode_ClassName(_ext_inner, "nexainnercontainer");
					nexacro.__setDOMNode_Id(_ext_inner, "", dest_handle.id + "_ext_" + (i - 1));
					nexacro.__setDOMNode_Selectable(_ext_inner, false);

					var inner_style = _ext_inner.style;
					nexacro.__setDOMStyle_Absolute(inner_style);
					nexacro.__setDOMStyle_Pos(inner_style, 0, this.height);
					nexacro.__setDOMStyle_Size(_ext_inner.style, this.width, _scroll_max[i] - _scroll_max[i - 1]);

					nexacro.__appendDOMNode(handle, _ext_inner);

					this._ext_inners.push(_ext_inner);
				}
			}
		};

		__pGridBandContainerElement._setScrollHeight = function (height) {
			var handle = this.dest_handle;
			if (handle) {
				if (this._scroll_max_arr && this._scroll_max_arr.length > 0) {
					height = this._scroll_max_arr[0];
					if (height < this.height) {
						height = this.height;
					}

					nexacro.__setDOMStyle_Size(handle.style, this.width, height);
					this._setInnerElementExtend();
				}
				else {
					if (height < this.height) {
						height = this.height;
					}

					nexacro.__setDOMStyle_Size(handle.style, this.width, height);
				}
			}
		};

		__pGridBandContainerElement._getDestHandle = function (top, idx) {
			if (idx == undefined) {
				idx = this._getExtInnerIdx(top);
			}

			return (idx < 0) ? this.dest_handle : this._ext_inners[idx];
		};

		__pGridBandContainerElement._getExtInnerIdx = function (top) {
			var _ext_inners = this._ext_inners;
			var _scroll_max = this._scroll_max_arr;
			var idx = -1;

			for (var i = 0, n = _scroll_max.length; i < n; i++) {
				if (top < _scroll_max[i]) {
					idx = i - 1;
					break;
				}
			}
			return idx;
		};

		__pGridBandContainerElement._changeInnerElement = function (top, row_handle) {
			var idx = this._getExtInnerIdx(top);
			var next_handle = this._getDestHandle(top, idx);
			var prev_handle = row_handle.parentElement;

			if (idx != null && idx > -1) {
				top = top - this._scroll_max_arr[idx];
			}

			if (prev_handle && (prev_handle != next_handle)) {
				nexacro.__removeDOMNode(prev_handle, row_handle);
				nexacro.__appendDOMNode(next_handle, row_handle);
			}

			return top;
		};

		__pGridBandContainerElement.setElementVScrollPos = function (vpos) {
			if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
				this._scroll_top = vpos;
				var _inner_handle = this.dest_handle;
				if (_inner_handle) {
					nexacro.__setDOMStyle_Translate(_inner_handle.style, 0, -vpos);

					var ext_vpos;
					var _ext_inner = this._ext_inners;
					var scroll_max_arr = this._scroll_max_arr;

					for (var i = 0; i < _ext_inner.length; i++) {
						if (vpos + this.height > scroll_max_arr[i] && vpos < scroll_max_arr[i + 1]) {
							if (nexacro._Browser_Transform3d > 0) {
								ext_vpos = vpos - (scroll_max_arr[i] - this.height);
							}
							else {
								ext_vpos = vpos - scroll_max_arr[i];
							}
						}
						else {
							ext_vpos = 0;
						}
						nexacro.__setDOMStyle_Translate(_ext_inner[i].style, 0, -ext_vpos);
					}

					if (this._grid) {
						this._grid._callback_onscroll(vpos);
					}
				}
			}
		};

		__pGridBandContainerElement._refreshDOM = function () {
			if (this.handle) {
				nexacro.__setDOMNode_VScrollPos(this.handle, 1);
			}
		};

		__pGridBandContainerElement._removeExtinners = function () {
			var handle = this.handle;
			var ext_inners = this._ext_inners;

			for (var i = 0; i < ext_inners.length; i++) {
				nexacro.__removeDOMNode(handle, ext_inners[i]);
			}
			this._ext_inners = null;
		};

		__pGridBandContainerElement.destroy = function () {
			var handle = this.handle;
			this._destroyElementHandle();

			this._removeExtinners();
			this.owner_elem = null;
			this.dest_handle = null;
			this.parent = null;
			this.parent_elem = null;
			this._scroll_max_arr = null;
		};
	}
	else {
		__pGridBandContainerElement.create = function (win) {
			nexacro._ContainerElement.prototype.create.call(this, win);

			var owner_elem = this.owner_elem = this.parent_elem;

			var _doc = win._doc || owner_elem._getRootWindowHandle();
			var tempdiv = this._tempdiv = _doc.createElement("div");

			nexacro.__setDOMStyle_AbsoluteTransparent(tempdiv.style);
			nexacro.__setDOMStyle_Pos(tempdiv.style, 0, 0);
			nexacro.__setDOMStyle_Size(tempdiv.style, 1, 1);
			nexacro.__setDOMStyle_Visible(tempdiv.style, false);
			nexacro.__appendDOMNode(this.handle, tempdiv);

			this._setScrollHeight(owner_elem.container_maxheight);

			nexacro._observeSysEvent(this.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			this._adjustPos();
		};

		__pGridBandContainerElement.createCommandStart = function () {
			var owner_elem = this.parent_elem;
			if (owner_elem && !this.handle) {
				this.owner_elem = owner_elem;
				this.name = owner_elem.name + ":container";
				var str = "<div class='nexacontainer' id='" + this.name + "' ";

				var style_str = this._getCommonStyleStr();
				str += style_str ? (" style='" + style_str + "'> </div>") : "> </div>";

				str += "<div ";
				style_str = nexacro.__getHTMLStyle_AbsoluteTransparent() + "left:0px;top:0px;width:1px;height:1px;visibility:hidden;";
				str += " style='" + style_str + "'> </div>";
				return str;
			}
			return "";
		};


		__pGridBandContainerElement.attachHandle = function (win) {
			if (this.name && !this.handle) {
				var handle = win._doc.getElementById(this.name);
				if (handle) {
					this.handle = this.dest_handle = handle;
					this._tempdiv = handle.nextSibling;
				}
			}
			nexacro.__setDOMStyle_Size(this.dest_handle.style, this.width, this.height);

			if (this.parent._type == "body") {
				this._setScrollHeight(this.owner_elem.container_maxheight);
			}

			nexacro._observeSysEvent(this.handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			this.setElementPosition(this.left, this.top);
		};

		__pGridBandContainerElement.destroy = function () {
			var handle = this.handle;
			if (handle) {
				nexacro._stopSysObserving(handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			}

			this._destroyElementHandle();

			nexacro.__removeDOMNode(handle, this._tempdiv);
			this._tempdiv = null;

			this.owner_elem = null;
			this.dest_handle = null;
			this.parent = null;
			this.parent_elem = null;
			this._scroll_max_arr = null;
			this._ext_inners = null;
		};

		if (nexacro._Browser == "IE") {
			if (nexacro._BrowserVersion <= 8) {
				__pGridBandContainerElement._syshandler_onscroll_forward = function (evt) {
					if ((!evt || evt.type != "scroll") && window.event) {
						evt = window.event;
					}
					if (evt.type != "scroll") {
						return;
					}

					var target = evt.srcElement;
					if (!target) {
						return;
					}

					var container = target._linked_element;
					if (container) {
						if (container._noEventScroll == true) {
							container._noEventScroll = false;

							if (container._grid) {
								container._grid._callback_onscroll(target.scrollTop);
							}

							return;
						}

						var elem_scroll_top = container._scroll_top | 0;

						if (!container._try_user_setvpos) {
							if (elem_scroll_top != target.scrollTop) {
								var vscrollbar = container._findScrollbarControl(container, true);
								if (vscrollbar) {
									if (vscrollbar.parent._scrollpixel == "all") {
										vscrollbar.set_pos(target.scrollTop);
									}
									else {
										vscrollbar.set_pixelpos(target.scrollTop);
									}
								}
								else {
									target.scrollTop = elem_scroll_top;
								}
							}
						}
					}
				};
			}
			else {
				__pGridBandContainerElement._syshandler_onscroll_forward = function (evt) {
					if ((!evt || evt.type != "scroll") && window.event) {
						evt = window.event;
					}
					if (evt.type != "scroll") {
						return;
					}

					var target = evt.srcElement;
					if (!target) {
						return;
					}

					var container = target._linked_element;
					if (container) {
						if (container._noEventScroll == true) {
							container._noEventScroll = false;

							if (container._grid) {
								container._grid._callback_onscroll(target.scrollTop);
							}

							return;
						}

						var elem_scroll_top = container._scroll_top | 0;

						if (elem_scroll_top != target.scrollTop) {
							var vscrollbar = container._findScrollbarControl(container, true);
							if (vscrollbar) {
								if (vscrollbar.parent._scrollpixel == "all") {
									vscrollbar.set_pos(target.scrollTop);
								}
								else {
									vscrollbar.set_pixelpos(target.scrollTop);
								}
							}
							else {
								target.scrollTop = elem_scroll_top;
							}
						}
					}
				};
			}
		}
		else {
			__pGridBandContainerElement._syshandler_onscroll_forward = function (evt) {
				var target = evt.target;
				if (!target) {
					return;
				}
				var container = target._linked_element;
				if (container) {
					if (container._noEventScroll == true) {
						container._noEventScroll = false;

						if (container._grid) {
							container._grid._callback_onscroll(target.scrollTop);
						}

						return;
					}

					var elem_scroll_top = container._scroll_top | 0;

					if (elem_scroll_top != target.scrollTop) {
						var vscrollbar = container._findScrollbarControl(container, true);
						if (vscrollbar) {
							if (vscrollbar.parent._scrollpixel == "all") {
								vscrollbar.set_pos(target.scrollTop);
							}
							else {
								vscrollbar.set_pixelpos(target.scrollTop);
							}
						}
						else {
							target.scrollTop = elem_scroll_top;
						}
					}
				}
			};
		}

		__pGridBandContainerElement._setScrollHeight = function (height) {
			if (this._tempdiv) {
				nexacro.__setDOMStyle_Pos(this._tempdiv.style, 0, height - 1);
			}
		};

		__pGridBandContainerElement.setElementVScrollPos = function (vpos) {
			if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
				this._scroll_top = vpos;

				var handle = this.handle;
				if (handle) {
					this._noEventScroll = true;
					nexacro.__setDOMNode_VScrollPos(handle, vpos);
				}
			}
		};
	}
	;



	nexacro.GridRowControlElement = function (parent_elem, left_gap) {
		this.parent = parent_elem;
		this.parent_elem = parent_elem;

		this._client_left_element = null;
		this._client_body_element = new nexacro._ContainerElement(this, true, "body");
		this._client_right_element = null;

		this._left_width = 0;
		this._right_width = 0;
		this._body_width = 0;
		this.scroll_left = 0;
		this._left_gap = left_gap;
	};

	var _pGridRowControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.GridRowControlElement);

	nexacro.GridRowControlElement.prototype = _pGridRowControlElement;

	_pGridRowControlElement._type_name = "GridRowControlElement";

	_pGridRowControlElement.create = function (win) {
		var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.linkedcontrol._fixed);
		if (owner_elem && owner_elem.handle) {
			if (!this.handle) {
				this.owner_elem = owner_elem;
				var _doc = win._doc || owner_elem._getRootWindowHandle();
				var handle = _doc.createElement("div");
				handle.id = this.name;
				handle._linked_element = this;

				this.handle = this.dest_handle = handle;
				nexacro.__setDOMNode_ClassName(handle, this._getElementClassName());

				var handle_style = handle.style;
				var _owner_dest_handle = (this._is_nc_element) ? owner_elem.handle : owner_elem._getDestHandle(this.top);

				if (this._use_translate_move) {
					nexacro.__setDOMStyle_Pos(handle_style, this.left, 0);
				}

				this.setElementPosition(this.left, this.top, true);
				nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);

				this._refreshControl(handle, handle_style, _doc);

				nexacro.__appendDOMNode(_owner_dest_handle, handle);
			}

			if (this.handle) {
				if (this._client_left_element && !this._client_left_element.handle) {
					this._client_left_element.create(win);
				}
				if (!this._client_body_element.handle) {
					this._client_body_element.create(win);
				}
				if (this._client_right_element && !this._client_right_element.handle) {
					this._client_right_element.create(win);
				}

				this._client_elem = this._client_body_element;
			}
		}
	};


	_pGridRowControlElement._on_destroy = function () {
		var handle = this.handle;
		if (handle) {
			this._client_body_element.destroy();

			if (this._client_left_element) {
				this._client_left_element.destroy();
			}

			if (this._client_right_element) {
				this._client_right_element.destroy();
			}

			this._client_body_element = null;
			this._client_left_element = null;
			this._client_right_element = null;
			this._client_elem = null;
		}
	};

	_pGridRowControlElement.createCommandStart = function () {
		var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
		if (owner_elem && !this.handle) {
			this.owner_elem = owner_elem;

			var str = "<div id='" + this.name + "' class='" + this._getElementClassName() + "'";
			if (this.tooltiptext) {
				str += " title = '" + this.tooltiptext + "' ";
			}
			var acc_str = this._getAccessibilityInfoStr();
			var style_str = this._getControlStyleStr();
			var status_str = this._getControlStatusStr();

			str += status_str ? (" " + status_str) : "";
			str += style_str ? (" style='" + style_str + "'") : "";
			str += acc_str ? (" " + acc_str + ">") : ">";

			var edge_elem = this._edge_elem;
			if (edge_elem) {
				str += edge_elem.createCommand();
			}

			return str;
		}
	};

	_pGridRowControlElement.createCommandAreaStart = function (area) {
		var str = "";
		if (area == "body") {
			if (this._client_body_element) {
				str += this._client_body_element.createCommandStart();
			}
		}
		else if (area == "left") {
			if (this._client_left_element) {
				str += this._client_left_element.createCommandStart();
			}
		}
		else {
			if (this._client_right_element) {
				str += this._client_right_element.createCommandStart();
			}
		}
		return str;
	};

	_pGridRowControlElement.createCommandAreaEnd = function (area) {
		var str = "";
		if (area == "body") {
			if (this._client_body_element) {
				str += this._client_body_element.createCommandEnd();
			}
		}
		else if (area == "left") {
			if (this._client_left_element) {
				str += this._client_left_element.createCommandEnd();
			}
		}
		else {
			if (this._client_right_element) {
				str += this._client_right_element.createCommandEnd();
			}
		}
		return str;
	};

	_pGridRowControlElement.createCommandEnd = function (area) {
		return "</div>";
	};

	_pGridRowControlElement.attachHandle = function (win) {
		if (this.name && !this.handle) {
			var handle = win._doc.getElementById(this.name);
			if (handle) {
				handle._linked_element = this;

				if (this._client_body_element) {
					this.handle = this.dest_handle = handle;
					this._client_body_element.attachHandle(win);
				}

				var edge_elem = this._edge_elem;
				if (edge_elem) {
					edge_elem.attach_handle_fromparent(handle);
				}

				this._setAccessibility_notify();

				if (this._client_left_element) {
					this._client_left_element.attachHandle(win);
				}

				if (this._client_right_element) {
					this._client_right_element.attachHandle(win);
				}
			}
			this.owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.linkedcontrol._fixed);
		}
	};

	_pGridRowControlElement.clearContents = function () {
		if (this.handle) {
			this._client_body_element.clearContents();
			if (this._client_left_element) {
				this._client_left_element.clearContents();
			}
			if (this._client_right_element) {
				this._client_right_element.clearContents();
			}
		}
	};

	_pGridRowControlElement.getContainerElement = function (area) {
		if (area == 1) {
			return this._client_left_element;
		}
		else if (area == 2) {
			return this._client_right_element;
		}

		return this._client_body_element;
	};

	_pGridRowControlElement._refreshCommonStyleProps = function (handle_style) {
		if (!this.visible) {
			nexacro.__setDOMStyle_Visible(handle_style, false);
		}

		if (this.width && this.height) {
			nexacro.__setDOMStyle_Size(handle_style, this.width, this.height);
		}

		if (this.color) {
			nexacro.__setDOMStyle_ColorObject(handle_style, this.color);
		}
		if (this.font) {
			nexacro.__setDOMStyle_FontObject(handle_style, this.font);
		}
		if (this.wordSpacing) {
			nexacro.__setDOMStyle_WordSpacingObject(handle_style, this.wordSpacing);
		}
		if (this.letterSpacing) {
			nexacro.__setDOMStyle_LetterSpacingObject(handle_style, this.letterSpacing);
		}
		if (this.textDecoration) {
			nexacro.__setDOMStyle_TextDecorationObject(handle_style, this.textDecoration);
		}

		if (this.direction) {
			nexacro.__setDOMStyle_Direction(handle_style, this.direction);
		}
		if (this.wordWrap) {
			nexacro.__setDOMStyle_WordWrap(handle_style, this.wordWrap);
		}
	};

	_pGridRowControlElement.setArea = function (leftwidth, rightwidth) {
		if (leftwidth > 0 && !this._client_left_element) {
			this._client_left_element = new nexacro._ContainerElement(this, false, "left");
		}

		if (rightwidth > 0 && !this._client_right_element) {
			this._client_right_element = new nexacro._ContainerElement(this, false, "right");
		}

		this._left_width = leftwidth;

		var addgap = this._left_gap;

		if (this._client_left_element) {
			this._client_left_element.setElementPosition(this.client_left - addgap, this.client_top);
			this._client_left_element.setElementSize(leftwidth, this.client_height);
		}

		this._right_width = rightwidth;
		if (this._client_right_element) {
			this._client_right_element.setElementPosition(this.client_width - rightwidth + addgap, this.client_top);
			this._client_right_element.setElementSize(rightwidth - addgap, this.client_height);
		}

		this._body_width = this.client_width - leftwidth - rightwidth + (addgap * 2);
		this._client_body_element.setElementPosition(leftwidth - addgap, this.client_top);
		this._client_body_element.setElementSize(this._body_width, this.height);
	};

	_pGridRowControlElement._updateClientRect = function () {
		var ret = this._on_updateClientRect();
		if (ret & 1) {
			this._on_change_clientPos(this.client_left, this.client_top);
		}
		if (ret & 2) {
			this._on_change_clientSize(this.client_width, this.client_height);
		}

		if (ret) {
			this.setArea(this._left_width, this._right_width);
		}

		this._setContainerMaxWidth(this._client_body_element._scroll_maxwidth, this.height);
	};



	_pGridRowControlElement._setContainerMaxWidth = function (width) {
		this._client_body_element.setElementScrollMaxSize(width, this.height);
	};

	_pGridRowControlElement._calculateClientWidth = function (parent_client_width) {
		return parent_client_width - this._left_width - this._right_width;
	};

	_pGridRowControlElement._getContainerMaxWidth = function () {
		return this._client_body_element._scroll_maxwidth;
	};

	_pGridRowControlElement.setElementHScrollPos = function (hpos) {
		this._client_body_element._setElementHScrollPos(hpos);
		this.scroll_left = hpos;
	};

	_pGridRowControlElement.setElementPosition = function (left, top, bForce) {
		if (this.parent_elem._use_container_move) {
			var owner_elem = this.owner_elem;
			if (this.left != left || this.top != top || bForce) {
				var adjust_top = top;

				if (!this._is_nc_element && owner_elem && (this.top != top || bForce)) {
					adjust_top = owner_elem._changeInnerElement(top, this.handle);
				}

				nexacro.ControlElement.prototype.setElementPosition.call(this, left, adjust_top, bForce);
				this.top = top;
			}
		}
		else {
			nexacro.ControlElement.prototype.setElementPosition.call(this, left, top);
		}
	};
}


if (_process) {
	delete _process;
	delete _pElement;
	delete __pEdgeImageElement;
	delete _pTextBoxElement;
	delete _pImageElement;
	delete _pIconElement;
	delete _pIconTextElement;
	delete _pTextAreaElement;
	delete __pFrameResizeBorderElement;
	delete _pModalOverlayElement;
	delete _pControlElement;
	delete _pFrameControlElement;
	delete _pScrollableControlElement;
	delete __pContainerElement;
	delete _pPluginElement;
	delete __pPluginObject;
	delete __pWebBrowserPluginElement;
	delete __pVideoPlayerPluginElement;
	delete _pCanvasElement;
	delete __pCanvasGradient;
	delete _pGridScrollableControlElement;
	delete _pGridBandControlElement;
	delete __pGridBandContainerElement;
	delete _pGridRowControlElement;
}
