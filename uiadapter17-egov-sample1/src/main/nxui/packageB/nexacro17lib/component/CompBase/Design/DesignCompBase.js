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


	_pComponent.on_create_popup_control_element = function (parent_elem) {
		var control_elem;
		var is_preview = this._is_window = this._isPreviewMode();
		if (is_preview) {
			control_elem = new nexacro.ControlElement(parent_elem);
		}
		else {
			this._is_popup_control = false;
			this._is_trackpopup = true;
			control_elem = new nexacro.ControlElement(this.parent._control_element);
		}

		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	_pComponent.on_create_popupscrollable_control_element = function (parent_elem) {
		var control_elem;
		if (!this._isPreviewMode()) {
			this._is_popup = false;
			this._is_window = false;
			this._is_trackpopup = true;

			control_elem = new nexacro.PopupScrollableControlElement(this.parent._control_element);
		}
		else {
			control_elem = new nexacro.PopupScrollableControlElement(parent_elem);
		}

		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	_pComponent._isPreviewMode = function () {
		var temp = this;
		while (temp) {
			if (temp instanceof nexacro.DesignForm) {
				return temp._is_preview_mode;
			}
			temp = temp.parent;
		}
		;

		return false;
	};

	_pComponent._isSubEditorMode = function () {
		var temp = this;
		while (temp) {
			if (temp instanceof nexacro.DesignForm) {
				return temp._is_subeditor_mode;
			}
			temp = temp.parent;
		}
		;

		return false;
	};

	_pComponent.set_initvalueid = function (initvalueid) {
		this.initvalueid = initvalueid;
	};

	_pComponent._getDesignForm = function () {
		var temp = this;
		while (temp != null) {
			if (temp instanceof nexacro.DesignForm) {
				return temp;
			}

			temp = temp.parent;
		}

		return null;
	};

	_pComponent._convToRate = function (val, parentsize) {
		return parentsize ? (val * 100 / parentsize) : 0;
	};

	_pComponent.set_fittocontents = function (v) {
		var fittocontents_enum = ["none", "width", "height", "both"];
		if (fittocontents_enum.indexOf(v) == -1) {
			return;
		}

		if (this.fittocontents != v) {
			this.fittocontents = v;
		}
	};




	_pComponent._setLeft = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.left != propVal) {
			var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
			if (propVal == null) {
				this.left = null;
				this._parseArrangeInfoProp("left", propVal);

				if (this.width == null) {
					this._setWidth(this._adjust_width);
				}
				else if (this.right == null) {
					var right = step_logical_offset + this.parent._adjust_width - (this._adjust_left + this._adjust_width);
					this._setRight(right);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info["left"] : null;
				var distance;
				var calc_pos;

				var newCompid, oldCompid, newDistance, oldDistance;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				newDistance = parseInfo ? parseInfo.distance : null;
				oldDistance = oldInfo ? oldInfo.distance : null;

				if (newCompid != oldCompid && newDistance == oldDistance) {
					var target = this._findComponentForArrange(newCompid);
					if (target) {
						calc_pos = target._adjust_left + target._adjust_width;
					}
					else {
						calc_pos = 0;
					}

					distance = this._adjust_left - calc_pos;
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(distance, target ? target._adjust_width : (this.parent ? this.parent._adjust_width : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (newCompid) {
						propVal = newCompid;
						propVal += ":";
						propVal += distance;
					}
					else {
						propVal = distance;
					}
				}

				if (parseInfo == null) {
					propVal = parseFloat(propVal);
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}
				this.left = propVal;
				this._parseArrangeInfoProp("left", propVal);

				if (this.right != null && this.width != null) {
					this._setRight(null);
				}
			}
		}
	};

	_pComponent._setTop = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.top != propVal) {
			if (propVal == null) {
				this.top = null;
				this._parseArrangeInfoProp("top", propVal);

				if (this.height == null) {
					this._setHeight(this._adjust_height);
				}
				else if (this.bottom == null) {
					var bottom = this.parent._adjust_height - (this._adjust_top + this._adjust_height);
					this._setBottom(bottom);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info["top"] : null;
				var distance;
				var calc_pos;

				var newCompid, oldCompid, newDistance, oldDistance;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				newDistance = parseInfo ? parseInfo.distance : null;
				oldDistance = oldInfo ? oldInfo.distance : null;

				if (newCompid != oldCompid && newDistance == oldDistance) {
					var target = this._findComponentForArrange(newCompid);
					if (target) {
						calc_pos = target._adjust_top + target._adjust_height;
					}
					else {
						calc_pos = 0;
					}
					distance = this._adjust_top - calc_pos;
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(distance, target ? target._adjust_height : (this.parent ? this.parent._adjust_height : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (newCompid) {
						propVal = newCompid;
						propVal += ":";
						propVal += distance;
					}
					else {
						propVal = distance;
					}
				}

				if (parseInfo == null) {
					propVal = parseFloat(propVal);
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}

				this.top = propVal;
				this._parseArrangeInfoProp("top", propVal);

				if (this.bottom != null && this.height != null) {
					this._setBottom(null);
				}
			}
		}
	};

	_pComponent._setRight = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.right != propVal) {
			var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
			if (propVal == null) {
				this.right = null;
				this._parseArrangeInfoProp("right", propVal);

				if (this.width == null) {
					this._setWidth(this._adjust_width);
				}
				else if (this.left == null) {
					this._setLeft(this._adjust_left - step_logical_offset);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info["right"] : null;
				var distance;
				var calc_pos;

				var newCompid, oldCompid, newDistance, oldDistance;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				newDistance = parseInfo ? parseInfo.distance : null;
				oldDistance = oldInfo ? oldInfo.distance : null;

				if (newCompid != oldCompid && newDistance == oldDistance) {
					var target = this._findComponentForArrange(newCompid);
					if (target) {
						calc_pos = target._adjust_left;
					}
					else {
						calc_pos = (this.parent ? this.parent._adjust_width : 0);
					}

					distance = calc_pos - (this._adjust_left + this._adjust_width);
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(distance, target ? target._adjust_width : (this.parent ? this.parent._adjust_width : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (newCompid) {
						propVal = newCompid;
						propVal += ":";
						propVal += distance;
					}
					else {
						propVal = distance;
					}
				}

				if (parseInfo == null) {
					propVal = parseFloat(propVal);
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}

				this.right = propVal;
				this._parseArrangeInfoProp("right", propVal);

				if (this.left != null && this.width != null) {
					this._setWidth(null);
				}
			}
		}
	};

	_pComponent._setBottom = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.bottom != propVal) {
			if (propVal == null) {
				this.bottom = null;
				this._parseArrangeInfoProp("bottom", propVal);

				if (this.height == null) {
					this.set_height(this._adjust_height);
				}
				else if (this.top == null) {
					this._setTop(this._adjust_top);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info["bottom"] : null;
				var distance;
				var calc_pos;

				var newCompid, oldCompid, newDistance, oldDistance;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;
				newDistance = parseInfo ? parseInfo.distance : null;
				oldDistance = oldInfo ? oldInfo.distance : null;

				if (newCompid != oldCompid && newDistance == oldDistance) {
					var target = this._findComponentForArrange(newCompid);
					if (target) {
						calc_pos = target._adjust_top;
					}
					else {
						calc_pos = this.parent ? this.parent._adjust_height : 0;
					}
					distance = calc_pos - (this._adjust_top + this._adjust_height);
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(distance, target ? target._adjust_height : (this.parent ? this.parent._adjust_height : 0));
						distance = distance.toFixed(2) + "%";
					}
					if (newCompid) {
						propVal = newCompid;
						propVal += ":";
						propVal += distance;
					}
					else {
						propVal = distance;
					}
				}

				if (parseInfo == null) {
					propVal = parseFloat(propVal);
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}

				this.bottom = propVal;
				this._parseArrangeInfoProp("bottom", propVal);

				if (this.top != null && this.height != null) {
					this.set_height(null);
				}
			}
		}
	};

	_pComponent._setWidth = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.width != propVal) {
			var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
			if (propVal == null) {
				this.width = null;
				this._parseArrangeInfoProp("width", propVal);

				if (this.left == null) {
					var left = this.getOffsetRight() - this._adjust_width - step_logical_offset;
					this._setLeft(left);
				}
				else if (this.right == null) {
					var right = this.parent._adjust_width - (this._adjust_left + this._adjust_width - step_logical_offset);
					this._setRight(right);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info["width"] : null;
				var distance;

				var newCompid, oldCompid;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;

				if (newCompid != oldCompid) {
					var target = this._findComponentForArrange(newCompid);
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(this._adjust_width, target ? target._adjust_width : (this.parent ? this.parent._adjust_width : 0));
						distance = distance.toFixed(2) + "%";
						if (newCompid) {
							propVal = newCompid;
							propVal += ":";
							propVal += distance;
						}
						else {
							propVal = distance;
						}
					}
				}

				if (parseInfo == null) {
					propVal = parseFloat(propVal);
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}

				this.width = propVal;
				this._parseArrangeInfoProp("width", propVal);

				if (this.left != null && this.right != null) {
					this._setRight(null);
				}
			}
		}
	};


	_pComponent._setHeight = function (propVal) {
		if (propVal === "") {
			propVal = null;
		}

		if (this.height != propVal) {
			if (propVal == null) {
				this.height = null;
				this._parseArrangeInfoProp("height", propVal);

				if (this.top == null) {
					var top = this.getOffsetBottom() - this._adjust_height;
					this._setTop(top);
				}
				else if (this.bottom == null) {
					var bottom = this.parent._adjust_height - (this._adjust_top + this._adjust_height);
					this._setBottom(bottom);
				}
			}
			else {
				var parseInfo = this._parseArrangeVal(propVal);
				var oldInfo = this._arrange_info ? this._arrange_info["height"] : null;
				var distance;

				var newCompid, oldCompid;
				newCompid = parseInfo ? parseInfo.compid : null;
				oldCompid = oldInfo ? oldInfo.compid : null;

				if (newCompid != oldCompid) {
					var target = this._findComponentForArrange(newCompid);
					if (typeof propVal == "string" && propVal.indexOf("%") >= 0) {
						distance = this._convToRate(this._adjust_height, target ? target._adjust_height : (this.parent ? this.parent._adjust_height : 0));
						distance = distance.toFixed(2) + "%";
						if (newCompid) {
							propVal = newCompid;
							propVal += ":";
							propVal += distance;
						}
						else {
							propVal = distance;
						}
					}
				}

				if (parseInfo == null) {
					propVal = parseFloat(propVal);
					if (isNaN(propVal)) {
						propVal = 0;
					}
				}

				this.height = propVal;
				this._parseArrangeInfoProp("height", propVal);

				if (this.top != null && this.bottom != null) {
					this._setBottom(null);
				}
			}
		}
	};

	_pComponent._calcArrangePosition = function () {
		var info = this._arrange_info;
		var form = this._is_subcontrol ? this.parent : this._getForm();
		var comp;
		var obj;

		var size;
		var fittocontents = this.fittocontents;
		fittocontents = "none";

		if (info && (obj = info.left)) {
			if (form && form._is_created_contents) {
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					comp = form;
				}

				this._left = this._convToPixel(obj.distance, comp._adjust_width);
			}
		}
		else {
			if (this.left != null) {
				this._left = parseFloat(this.left);
			}
			else {
				this._left = null;
			}
		}

		if (info && (obj = info.top)) {
			if (form && form._is_created_contents) {
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					comp = form;
				}

				this._top = this._convToPixel(obj.distance, comp._adjust_height);
			}
		}
		else {
			if (this.top != null) {
				this._top = parseFloat(this.top);
			}
			else {
				this._top = null;
			}
		}

		if (info && (obj = info.right)) {
			if (form && form._is_created_contents) {
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					comp = form;
				}

				this._right = this._convToPixel(obj.distance, comp._adjust_width);
			}
		}
		else {
			if (this.right != null) {
				this._right = parseFloat(this.right);
			}
			else {
				this._right = null;
			}
		}

		if (fittocontents == "width" || fittocontents == "both") {
			this._width = size[0];
		}
		else {
			if (info && (obj = info.width)) {
				if (form && form._is_created_contents) {
					comp = this._findComponentForArrange(obj.compid);
					if (!comp) {
						comp = form;
					}

					this._width = this._convToPixel(obj.distance, comp._adjust_width);
				}
			}
			else {
				if (this.width != null) {
					this._width = parseFloat(this.width);
				}
				else {
					this._width = null;
				}
			}
		}

		if (info && (obj = info.bottom)) {
			if (form && form._is_created_contents) {
				comp = this._findComponentForArrange(obj.compid);
				if (!comp) {
					comp = form;
				}

				this._bottom = this._convToPixel(obj.distance, comp._adjust_height);
			}
		}
		else {
			if (this.bottom != null) {
				this._bottom = parseFloat(this.bottom);
			}
			else {
				this._bottom = null;
			}
		}

		if (fittocontents == "height" || fittocontents == "both") {
			this._height = size[1];
		}
		else {
			if (info && (obj = info.height)) {
				if (form && form._is_created_contents) {
					comp = this._findComponentForArrange(obj.compid);
					if (!comp) {
						comp = form;
					}

					this._height = this._convToPixel(obj.distance, comp._adjust_height);
				}
			}
			else {
				if (this.height != null) {
					this._height = parseFloat(this.height);
				}
				else {
					this._height = null;
				}
			}
		}
	};

	_pComponent._init_position = function (left, top, width, height, right, bottom) {
		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false, bmove = false;
		var update = false;

		this.move(left, top, width, height, right, bottom);
	};

	_pComponent._rePositioning = function (left, top, width, height, right, bottom, parentWidth, parentHeight) {
		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false, bmove = false;
		var update = false;

		var form = this._getForm();
		var base_comp;
		var _val;
		var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);



		var leftVal, topVal, widthVal, heightVal, rightVal, bottomVal;
		var arrange_info = this._arrange_info;
		var target, distance, compid = null;
		if (this.left != null || (this.left == null && this.right == null)) {
			compid = arrange_info ? (arrange_info["left"] ? arrange_info["left"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (target) {
				calc_pos = target._adjust_left + target._adjust_width - step_logical_offset;
			}
			else {
				calc_pos = 0;
			}
			distance = left - calc_pos;
			if (typeof this.left == "string" && this.left.indexOf("%") >= 0) {
				distance = this._convToRate(distance, target ? target._adjust_width : (this.parent ? this.parent._adjust_width : 0));
				distance = distance.toFixed(2) + "%";
			}
			if (compid) {
				leftVal = compid;
				leftVal += ":";
				leftVal += distance;
			}
			else {
				leftVal = distance;
			}
		}
		else {
			leftVal = undefined;
		}
		if (this.top != null || (this.top == null && this.bottom == null)) {
			compid = arrange_info ? (arrange_info["top"] ? arrange_info["top"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (target) {
				calc_pos = target._adjust_top + target._adjust_height;
			}
			else {
				calc_pos = 0;
			}
			distance = top - calc_pos;
			if (typeof this.top == "string" && this.top.indexOf("%") >= 0) {
				distance = this._convToRate(distance, target ? target._adjust_height : (this.parent ? this.parent._adjust_height : 0));
				distance = distance.toFixed(2) + "%";
			}
			if (compid) {
				topVal = compid;
				topVal += ":";
				topVal += distance;
			}
			else {
				topVal = distance;
			}
		}
		else {
			topVal = undefined;
		}
		if (this.width != null) {
			compid = arrange_info ? (arrange_info["width"] ? arrange_info["width"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (typeof this.width == "string" && this.width.indexOf("%") >= 0) {
				distance = this._convToRate(width, target ? target._adjust_width : (this.parent ? this.parent._adjust_width : 0));
				distance = distance.toFixed(2) + "%";
			}
			else {
				distance = width;
			}
			if (compid) {
				widthVal = compid;
				widthVal += ":";
				widthVal += distance;
			}
			else {
				widthVal = distance;
			}
		}
		else {
			widthVal = undefined;
		}
		if (this.height != null) {
			compid = arrange_info ? (arrange_info["height"] ? arrange_info["height"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (typeof this.height == "string" && this.height.indexOf("%") >= 0) {
				distance = this._convToRate(height, target ? target._adjust_height : (this.parent ? this.parent._adjust_height : 0));
				distance = distance.toFixed(2) + "%";
			}
			else {
				distance = height;
			}
			if (compid) {
				heightVal = compid;
				heightVal += ":";
				heightVal += distance;
			}
			else {
				heightVal = distance;
			}
		}
		else {
			heightVal = undefined;
		}

		if (this.right != null) {
			compid = arrange_info ? (arrange_info["right"] ? arrange_info["right"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (target) {
				calc_pos = target._adjust_left - step_logical_offset;
			}
			else {
				calc_pos = this.parent ? this.parent._adjust_width : 0;
			}
			distance = calc_pos - (left + width);
			if (typeof this.right == "string" && this.right.indexOf("%") >= 0) {
				distance = this._convToRate(distance, target ? target._adjust_width : (this.parent ? this.parent._adjust_width : 0));
				distance = distance.toFixed(2) + "%";
			}
			if (compid) {
				rightVal = compid;
				rightVal += ":";
				rightVal += distance;
			}
			else {
				rightVal = distance;
			}
		}
		else {
			rightVal = undefined;
		}
		if (this.bottom != null) {
			compid = arrange_info ? (arrange_info["bottom"] ? arrange_info["bottom"].compid : null) : null;
			target = this._findComponentForArrange(compid);
			if (target) {
				calc_pos = target._adjust_top;
			}
			else {
				calc_pos = this.parent ? this.parent._adjust_height : 0;
			}
			distance = calc_pos - (top + height);
			if (typeof this.bottom == "string" && this.bottom.indexOf("%") >= 0) {
				distance = this._convToRate(distance, target ? target._adjust_height : (this.parent ? this.parent._adjust_height : 0));
				distance = distance.toFixed(2) + "%";
			}
			if (compid) {
				bottomVal = compid;
				bottomVal += ":";
				bottomVal += distance;
			}
			else {
				bottomVal = distance;
			}
		}
		else {
			bottomVal = undefined;
		}

		this.move(leftVal, topVal, widthVal, heightVal, rightVal, bottomVal);
	};

	_pComponent._adjustPosition = function () {
		var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);

		var parent = this.parent ? this.parent : this._getForm();
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
		if (this._isRtl()) {
			this._adjust_left_ltr = calc_right + step_logical_offset;
		}

		this._adjust_top = calc_top;

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


	_pComponent.createCssDesignContents = nexacro._emptyFn;
	_pComponent.destroyCssDesignContents = nexacro._emptyFn;

	_pComponent.beginTransitionEffect = nexacro._emptyFn;
	_pComponent.applyTransitionEffect = nexacro._emptyFn;
	_pComponent.cancelTransitionEffect = nexacro._emptyFn;


	_pComponent.on_getChildObjectforCSSPreivew = function (idcssselector) {
		return null;
	};




	_pComponent.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		var updateobj = null;
		if (!objpath || objpath == "") {
			updateobj = this;
		}
		else {
			var objpaths = objpath.split(".");
			var objcnt = objpaths.length;

			var parent = this;
			for (var i = 0; i < objcnt; i++) {
				var idcssslector = objpaths[i];
				updateobj = parent[idcssslector];
				if (!updateobj) {
					updateobj = parent.on_getChildObjectforCSSPreivew(idcssslector);
				}
				if (updateobj) {
					parent = updateobj;
				}
			}
		}

		if (updateobj instanceof nexacro.GridBandInfo) {
			updateobj = updateobj._bandctrl;
		}

		if (updateobj) {
			if (status) {
				updateobj._changeStatus(status, statusvalue);
			}
			if (userstatus) {
				updateobj._changeUserStatus(userstatus, userstatusvalue);
			}
		}
	};

	_pComponent.updatePreviewPosition = function () {
		var form = this.parent;
		var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);

		this.move(offset_left, offset_top);
	};

	_pComponent.updatePreviewStyle = function () {
		this._makeCSSMapInfo();
		this._apply_status_toelement("", this._status, "", this._userstatus);
	};

	_pComponent._initDesignDefaultProperty = function () {
		if (this["set_text"]) {
			this.set_text(this.name);
		}
	};

	_pComponent._refresh = function () {
		this._makeCSSMapInfo();
		var enabledselector = this._cssselector.enabled;
		if (enabledselector) {
			control_elem.setElementCSSMapInfo(enabledselector.border, enabledselector.padding, enabledselector.edge);
		}

		control_elem.setElementSize(this._adjust_width, this._adjust_height);
	};

	_pComponent._getBorderWidth = function () {
		var str;
		var control_elem = this.getElement();
		if (control_elem) {
			str = control_elem._getComputedStyleValue("border");
		}

		var objBorder = nexacro.BorderObject(str);
		if ((typeof objBorder) == "object") {
			if (objBorder.left && objBorder.top && objBorder.right && objBorder.bottom) {
				return [objBorder.left._width, objBorder.top._width, objBorder.right._width, objBorder.bottom._width];
			}
		}
		return [0, 0, 0, 0];
	};

	delete _pComponent;
}

if (nexacro.PopupControl) {
	var _pPopupControl = nexacro.PopupControl.prototype;

	_pPopupControl._popupBy = function (from_comp, left, top, width, height) {
		if (!this._attached_comp || !from_comp) {
			return;
		}

		var p = {
		};
		if (from_comp._isPreviewMode()) {
			if (from_comp instanceof nexacro._MenuItemControl) {
				p = {
					x : from_comp.parent._adjust_left, 
					y : from_comp.parent._adjust_top
				};
			}
			else {
				p = {
					x : from_comp._adjust_left, 
					y : from_comp._adjust_top
				};
			}
		}
		else {
			p = nexacro._getElementPositionInFrame(from_comp.getElement());
		}

		var win_left = p.x + left;
		var win_top = p.y + top;

		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._setCaptureLock(this._attached_comp, true, false);
		}

		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPosition(win_left, win_top);
			control_elem.setElementSize(width, height);
		}

		this.set_visible(true);
	};

	delete _pPopupControl;
}
