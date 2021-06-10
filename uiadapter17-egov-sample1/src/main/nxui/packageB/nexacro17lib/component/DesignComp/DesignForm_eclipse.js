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

if (nexacro.DesignForm) {
	nexacro.UXFORM_CANVAS_SIZE_X = 12800;
	nexacro.UXFORM_CANVAS_SIZE_Y = 12800;

	nexacro._design_option_show_ruler = true;
	nexacro._design_option_show_guideline = true;
	nexacro._design_option_show_mousepos = true;

	nexacro._design_option_snap_dot = true;
	nexacro._design_option_snap_component = true;
	nexacro._design_option_snap_component_sapce = 10;

	nexacro._design_option_select_type = 0;
	nexacro._design_option_measure_type = 0;

	nexacro.showRuler = function (v) {
		nexacro._design_option_show_rule = v;
	};

	nexacro.showGuideLine = function (v) {
		nexacro._design_option_show_guideline = v;
	};

	nexacro.showMousePos = function (v) {
		nexacro._design_option_show_mousepos = v;
	};

	nexacro.snapDot = function (v) {
		nexacro._design_option_snap_dot = v;
	};

	nexacro.snapComponent = function (v) {
		nexacro._design_option_snap_component = v;
	};

	nexacro.setSelectType = function (v) {
		nexacro._design_option_select_type = v;
	};

	nexacro.setMeasureType = function (v) {
		nexacro._design_option_measure_type = v;
	};

	nexacro._design_option_measure_pixel = 0;
	nexacro._design_option_measure_percent = 1;

	nexacro._design_mode_select = "Select";
	nexacro._design_mode_form_move = "Form Move";
	nexacro._design_mode = nexacro._design_mode_select;

	nexacro.setDesignMode = function (v) {
		nexacro._design_mode = v;
	};

	nexacro._mouse_cursor_none = -1;
	nexacro._mouse_cursor_lt = 0;
	nexacro._mouse_cursor_t = 1;
	nexacro._mouse_cursor_rt = 2;
	nexacro._mouse_cursor_l = 3;
	nexacro._mouse_cursor_r = 4;
	nexacro._mouse_cursor_lb = 5;
	nexacro._mouse_cursor_b = 6;
	nexacro._mouse_cursor_rb = 7;
	nexacro._mouse_cursor_move = 8;
	nexacro._mouse_cursor_form_move = 9;
	nexacro._mouse_cursor_create_component = 10;
	nexacro._mouse_cursor_tooltip = 11;

	nexacro._min_tracker_size = 20;

	nexacro.Event.KEY_A = 65;
	nexacro.Event.KEY_a = 96;


	nexacro.MoveInfo = function () {
		this._layer = -1;
		this._start_x = null;
		this._start_y = null;
		this._move_x = null;
		this._move_y = null;

		this.x1 = null;
		this.y1 = null;
		this.x2 = null;
		this.y2 = null;
	};

	var _pMoveInfo = nexacro._createPrototype(Object, nexacro.MoveInfo);
	nexacro.MoveInfo.prototype = _pMoveInfo;

	_pMoveInfo.start = function (layer, x, y) {
		this._layer = layer;
		this._start_x = this.x1 = x;
		this._start_y = this.y1 = y;
	};

	_pMoveInfo.move = function (x, y) {
		this._move_x = this.x2 = x;
		this._move_y = this.y2 = y;
	};

	_pMoveInfo.clear = function () {
		this._layer = -1;
		this._start_x = null;
		this._start_y = null;
		this._move_x = null;
		this._move_y = null;

		this.x1 = null;
		this.y1 = null;
		this.x2 = null;
		this.y2 = null;
	};

	_pMoveInfo.distance_x = function () {
		if (this._move_x == null || this._start_x == null) {
			return 0;
		}

		return this._move_x - this._start_x;
	};

	_pMoveInfo.distance_y = function () {
		if (this._move_y == null || this._start_y == null) {
			return 0;
		}

		return this._move_y - this._start_y;
	};

	_pMoveInfo.normalize = function () {
		if (this._start_x < this._move_x) {
			this.x1 = this._start_x;
			this.x2 = this._move_x;
		}
		else {
			this.x1 = this._move_x;
			this.x2 = this._start_x;
		}

		if (this._start_y < this._move_y) {
			this.y1 = this._start_y;
			this.y2 = this._move_y;
		}
		else {
			this.y1 = this._move_y;
			this.y2 = this._start_y;
		}
	};

	_pMoveInfo.get_width = function () {
		var w = this.distance_x();
		return Math.abs(w);
	};

	_pMoveInfo.get_height = function () {
		var h = this.distance_y();
		return Math.abs(h);
	};

	delete _pMoveInfo;


	nexacro.SnapInfo = function (pos, type) {
		this.pos = pos;
		this.type = type;
	};

	nexacro.SnapInfo.INFO_HORI = 0;
	nexacro.SnapInfo.INFO_VERT = 1;
	nexacro.SnapInfo.INFO_GUIDE = 2;

	nexacro.SnapInfo.SNAP_NONE = -1;
	nexacro.SnapInfo.SNAP_BASE = 0;
	nexacro.SnapInfo.SNAP_DOT = 1;
	nexacro.SnapInfo.SNAP_GUIDE = 2;
	nexacro.SnapInfo.SNAP_COMP_L = 3;
	nexacro.SnapInfo.SNAP_COMP_C = 4;
	nexacro.SnapInfo.SNAP_COMP_R = 5;
	nexacro.SnapInfo.SNAP_COMP_T = 6;
	nexacro.SnapInfo.SNAP_COMP_M = 7;
	nexacro.SnapInfo.SNAP_COMP_B = 8;

	var _pSnapInfo = nexacro._createPrototype(Object, nexacro.SnapInfo);
	nexacro.SnapInfo.prototype = _pSnapInfo;

	_pSnapInfo.is_Component_snap = function () {
		return (this.type >= nexacro.SnapInfo.SNAP_COMP_L && this.type <= nexacro.SnapInfo.SNAP_COMP_B);
	};
	delete _pSnapInfo;

	nexacro.SnapCompInfo = function (pos, type, rect) {
		nexacro.SnapInfo.call(this, pos, type);

		var left = parseInt(rect[0]);
		var top = parseInt(rect[1]);
		var width = parseInt(rect[2]);
		var height = parseInt(rect[3]);

		this._rect = {
			"left" : left, 
			"top" : top, 
			"width" : width, 
			"height" : height, 
			"right" : left + width, 
			"bottom" : top + height
		};
	};

	var _pSnapCompInfo = nexacro._createPrototype(nexacro.SnapInfo, nexacro.SnapCompInfo);
	nexacro.SnapCompInfo.prototype = _pSnapCompInfo;

	delete _pSnapCompInfo;

	nexacro.SnapGuideInfo = function (pos, type, obj, rect, is_resize, cur_step) {
		nexacro.SnapInfo.call(this, pos, type);

		var left = parseInt(rect[0]);
		var top = parseInt(rect[1]);
		var width = parseInt(rect[2]);
		var height = parseInt(rect[3]);

		this._rect = {
			"left" : left, 
			"top" : top, 
			"width" : width, 
			"height" : height, 
			"right" : left + width, 
			"bottom" : top + height
		};

		this._old_rect = {
			"left" : left, 
			"top" : top, 
			"width" : width, 
			"height" : height, 
			"right" : left + width, 
			"bottom" : top + height
		};

		this._is_resize = is_resize;
		this._cur_step = cur_step;
	};

	var _pSnapGuideInfo = nexacro._createPrototype(nexacro.SnapInfo, nexacro.SnapGuideInfo);
	nexacro.SnapGuideInfo.prototype = _pSnapGuideInfo;

	delete _pSnapGuideInfo;

	nexacro.SnapManager = function (target) {
		this.target = target;

		this._snap_length = 10;

		this._arr_x = [];
		this._arr_y = [];
		this._guideline_snap_comps = [];

		this._snap_point = {
			"x" : this._snap_length + 1, 
			"y" : this._snap_length + 1
		};
	};

	var _pSnapManager = nexacro._createPrototype(Object, nexacro.SnapManager);
	nexacro.SnapManager.prototype = _pSnapManager;

	nexacro.SnapManager.SNAP_FRONT_SPACE = 0;

	nexacro.SnapManager.SNAP_LEFT = 1;
	nexacro.SnapManager.SNAP_CENTER = 2;
	nexacro.SnapManager.SNAP_RIGHT = 3;

	nexacro.SnapManager.SNAP_TOP = 1;
	nexacro.SnapManager.SNAP_MIDDLE = 2;
	nexacro.SnapManager.SNAP_BOTTOM = 3;

	nexacro.SnapManager.SNAP_BACK_SPACE = 4;

	_pSnapManager.destroy = function () {
		this.clear();
	};

	_pSnapManager.clear_snap_point = function () {
		this._snap_point.x = this._snap_length + 1;
		this._snap_point.y = this._snap_length + 1;
	};

	_pSnapManager.get_snap_point = function () {
		var x = (this._snap_point.x <= this._snap_length) ? this._snap_point.x : 0;
		var y = (this._snap_point.y <= this._snap_length) ? this._snap_point.y : 0;
		return {
			"x" : x, 
			"y" : y
		};
	};

	_pSnapManager.clear = function () {
		var arr = this._arr_x;
		while (arr.length != 0) {
			var info = arr.pop();
			delete info;
		}

		arr = this._arr_y;
		while (arr.length != 0) {
			var info = arr.pop();
			delete info;
		}

		this._guideline_snap_comps = [];
	};

	_pSnapManager.sort = function () {
		this._arr_x.sort(this._sort);
		this._arr_y.sort(this._sort);
	};

	_pSnapManager._sort = function (a, b) {
		if (a.pos < b.pos) {
			return -1;
		}

		if (a.pos == b.pos) {
			return 0;
		}

		return 1;
	};

	_pSnapManager.add_info = function (info_type, info) {
		switch (info_type) {
			case nexacro.SnapInfo.INFO_HORI:
				this._arr_x.push(info);
				break;
			case nexacro.SnapInfo.INFO_VERT:
				this._arr_y.push(info);
				break;
			case nexacro.SnapInfo.INFO_GUIDE:
				this._arr_guide.push(info);
				break;
		}
	};

	_pSnapManager.add_base_info = function () {
		var designform = this.target;
		var snap_manager = designform._snap_manager;
		var rootobj = designform.get_root_obj();
		var rect = designform._getComponentRect(rootobj, true);
		var stepcount = designform.get_step_count();

		var border_width = designform._getBorderWidth(rootobj);

		var width = parseInt(rect[2]) - (border_width * 2);
		var height = parseInt(rect[3]) - (border_width * 2);

		snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo(0, nexacro.SnapInfo.SNAP_BASE));
		snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo(width, nexacro.SnapInfo.SNAP_BASE));

		snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapInfo(0, nexacro.SnapInfo.SNAP_BASE));
		snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapInfo(height, nexacro.SnapInfo.SNAP_BASE));

		for (var i = 1; i < stepcount; i++) {
			snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo((width * (i + 1)), nexacro.SnapInfo.SNAP_BASE));
		}

		if (nexacro._design_option_snap_component) {
			snap_manager.add_components_info(rootobj, stepcount, parseInt(rect[2]));
		}
	};

	_pSnapManager.add_components_info = function (obj, stepcount, stepwidth) {
		var designform = this.target;
		var snap_manager = designform._snap_manager;
		var comps = designform._getChilds(obj);
		if (comps) {
			var snap_manager = designform._snap_manager;
			var selected_components = designform._selected_components;

			var count = comps.length;
			for (var i = 0; i < count; i++) {
				var comp = comps[i];
				if (comp) {
					var id = designform._getScopeName(comp);
					if (selected_components.indexOf(id) >= 0) {
						continue;
					}

					var rect = designform._getComponentRect(comp, true);
					var l = parseInt(rect[0]);
					var t = parseInt(rect[1]);
					var w = parseInt(rect[2]);
					var h = parseInt(rect[3]);

					snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapCompInfo(l, nexacro.SnapInfo.SNAP_COMP_L, rect));
					snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapCompInfo(l + parseInt(w / 2), nexacro.SnapInfo.SNAP_COMP_C, rect));
					snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapCompInfo(l + w, nexacro.SnapInfo.SNAP_COMP_R, rect));

					snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapCompInfo(t, nexacro.SnapInfo.SNAP_COMP_T, rect));
					snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapCompInfo(t + parseInt(h / 2), nexacro.SnapInfo.SNAP_COMP_M, rect));
					snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapCompInfo(t + h, nexacro.SnapInfo.SNAP_COMP_B, rect));

					if (stepcount > 1) {
						var positionstep = designform.get_owner_step_index(comp);
						if (positionstep < 0) {
							for (var step = 1; step < stepcount; step++) {
								l += stepwidth;

								snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapCompInfo(l, nexacro.SnapInfo.SNAP_COMP_L, rect));
								snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapCompInfo(l + parseInt(w / 2), nexacro.SnapInfo.SNAP_COMP_C, rect));
								snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapCompInfo(l + w, nexacro.SnapInfo.SNAP_COMP_R, rect));
							}
						}
					}
				}

				this.add_components_info(comp, stepcount, stepwidth);
			}
		}
	};

	_pSnapManager.add_guideline_info = function () {
		var designform = this.target;
		var snap_manager = designform._snap_manager;
		var guideline = designform._ruler_layer.get_guideline(true);
		var count = guideline.length;
		for (var i = 0; i < count; i++) {
			snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo(parseInt(guideline[i]), nexacro.SnapInfo.SNAP_GUIDE));
		}

		guideline = designform._ruler_layer.get_guideline(false);
		var count = guideline.length;
		for (var i = 0; i < count; i++) {
			snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapInfo(parseInt(guideline[i]), nexacro.SnapInfo.SNAP_GUIDE));
		}
	};

	_pSnapManager.add_dot_info = function () {
		var designform = this.target;
		var snap_manager = designform._snap_manager;
		var rootobj = designform.get_root_obj();
		var stepcount = designform.get_step_count();
		var rect = designform._getComponentRect(rootobj, true);

		var width = parseInt(rect[2]);
		var dist = designform._dot_size_x;
		var pt = designform.getStartPos(rootobj);
		var stepindex = 1;
		for (var i = 0; i < nexacro.UXFORM_CANVAS_SIZE_X; i += dist) {
			if (stepindex < stepcount && stepindex * width < i) {
				i = stepindex * width + dist;
				stepindex++;
			}

			snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo(i, nexacro.SnapInfo.SNAP_DOT));
		}
		for (var i = -dist; i > -pt.x; i -= dist) {
			snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapInfo(i, nexacro.SnapInfo.SNAP_DOT));
		}

		dist = designform._dot_size_y;
		for (var i = 0; i < nexacro.UXFORM_CANVAS_SIZE_Y; i += dist) {
			snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapInfo(i, nexacro.SnapInfo.SNAP_DOT));
		}

		for (var i = -dist; i > -pt.y; i -= dist) {
			snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapInfo(i, nexacro.SnapInfo.SNAP_DOT));
		}
	};

	_pSnapManager.add_components_info_for_guideline = function (obj, pos, hori, stepcount, stepwidth) {
		var designform = this.target;
		var snap_manager = designform._snap_manager;
		var comps = designform._getChilds(obj);
		if (comps) {
			var snap_manager = designform._snap_manager;
			var selected_components = designform._selected_components;
			var ruler_layer = designform._ruler_layer;
			var count = comps.length;
			for (var i = 0; i < count; i++) {
				var comp = comps[i];
				if (comp) {
					var snap_comp = null;
					var rect = designform._getComponentRect(comp, true);

					var l = parseInt(rect[0]);
					var t = parseInt(rect[1]);
					var w = parseInt(rect[2]);
					var h = parseInt(rect[3]);

					var rc = {
						"left" : l, 
						"top" : t, 
						"right" : l + w, 
						"bottom" : t + h
					};

					if (hori) {
						if (pos == rc.left) {
							snap_comp = {
								"comp" : comp, 
								"rc" : rc, 
								"target" : "left", 
								"side" : "right", 
								"resize" : ruler_layer.find_guideline(hori, rc.right)
							};
						}
						else if (pos == rc.right) {
							snap_comp = {
								"comp" : comp, 
								"rc" : rc, 
								"target" : "right", 
								"side" : "left", 
								"resize" : ruler_layer.find_guideline(hori, rc.left)
							};
						}
						else {
							snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo(rc.left, nexacro.SnapInfo.SNAP_GUIDE));
							snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo(rc.right, nexacro.SnapInfo.SNAP_GUIDE));
						}

						if (stepcount > 1) {
							var positionstep = designform.get_owner_step_index(comp);
							if (positionstep < 0) {
								for (var step = 1; step < stepcount; step++) {
									l += stepwidth;
									var r = l + w;

									if (pos == l) {
										snap_comp = {
											"comp" : comp, 
											"rc" : rc, 
											"target" : "left", 
											"side" : "right", 
											"resize" : ruler_layer.find_guideline(hori, rc.right)
										};
									}
									else if (pos == r) {
										snap_comp = {
											"comp" : comp, 
											"rc" : rc, 
											"target" : "right", 
											"side" : "left", 
											"resize" : ruler_layer.find_guideline(hori, rc.left)
										};
									}
									else {
										snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo(l, nexacro.SnapInfo.SNAP_GUIDE));
										snap_manager.add_info(nexacro.SnapInfo.INFO_HORI, new nexacro.SnapInfo(r, nexacro.SnapInfo.SNAP_GUIDE));
									}
								}
							}
						}
					}
					else {
						snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapInfo(rc.top, nexacro.SnapInfo.SNAP_GUIDE));
						snap_manager.add_info(nexacro.SnapInfo.INFO_VERT, new nexacro.SnapInfo(rc.bottom, nexacro.SnapInfo.SNAP_GUIDE));

						if (pos == rc.top) {
							snap_comp = {
								"comp" : comp, 
								"rc" : rc, 
								"target" : "top", 
								"side" : "bottom", 
								"resize" : ruler_layer.find_guideline(hori, rc.bottom)
							};
						}
						else if (pos == rc.bottom) {
							snap_comp = {
								"comp" : comp, 
								"rc" : rc, 
								"target" : "bottom", 
								"side" : "top", 
								"resize" : ruler_layer.find_guideline(hori, rc.top)
							};
						}
					}
				}

				if (snap_comp) {
					this._guideline_snap_comps.push(snap_comp);
				}

				this.add_components_info_for_guideline(comp, pos, hori, stepcount, stepwidth);
			}
		}
	};

	_pSnapManager.snap = function (rect, cursor_type) {
		var dist_x = this._get_snap_dist(rect, true, cursor_type);
		var dist_y = this._get_snap_dist(rect, false, cursor_type);

		if (Math.abs(this._snap_point.x) > Math.abs(dist_x)) {
			this._snap_point.x = dist_x;
		}
		if (Math.abs(this._snap_point.y) > Math.abs(dist_y)) {
			this._snap_point.y = dist_y;
		}
	};

	_pSnapManager._get_snap_dist = function (rc, hori, cursor_type) {
		var arr = null;
		var pos = [];
		if (hori) {
			pos.push(rc.left - nexacro._design_option_snap_component_sapce);
			pos.push(rc.left);
			pos.push(rc.left + parseInt(rc.width / 2));
			pos.push(rc.right);
			pos.push(rc.right + nexacro._design_option_snap_component_sapce);

			arr = this._arr_x;
		}
		else {
			pos.push(rc.top - nexacro._design_option_snap_component_sapce);
			pos.push(rc.top);
			pos.push(rc.top + parseInt(rc.height / 2));
			pos.push(rc.bottom);
			pos.push(rc.bottom + nexacro._design_option_snap_component_sapce);

			arr = this._arr_y;
		}
		var dist = this._snap_length + 1;

		var count = arr.length;
		for (var i = 0; i < count; i++) {
			var info = arr[i];
			if (info) {
				var cur_dist = this._snap_length + 1;

				for (var index = 0; index < 5; index++) {
					if (!this._check_snap_info(hori, info, index, cursor_type)) {
						continue;
					}

					cur_dist = info.pos - pos[index];

					if (Math.abs(cur_dist) <= this._snap_length && Math.abs(cur_dist) < Math.abs(dist)) {
						dist = cur_dist;
					}
				}

				if (pos[nexacro.SnapManager.SNAP_BACK_SPACE] + this._snap_length < info.pos) {
					break;
				}
			}
		}

		return (Math.abs(dist) <= this._snap_length) ? dist : this._snap_length + 1;
	};

	_pSnapManager.snap_guideline = function (pos, hori) {
		var arr = null;
		if (hori) {
			arr = this._arr_x;
		}
		else {
			arr = this._arr_y;
		}

		var dist = this._snap_length + 1;

		var count = arr.length;
		for (var i = 0; i < count; i++) {
			var info = arr[i];
			if (info) {
				var cur_dist = this._snap_length + 1;
				cur_dist = info.pos - pos;

				if (Math.abs(cur_dist) <= this._snap_length && Math.abs(cur_dist) < Math.abs(dist)) {
					dist = cur_dist;
				}

				if (pos + this._snap_length < info.pos) {
					break;
				}
			}
		}

		return (Math.abs(dist) <= this._snap_length) ? dist : 0;
	};

	_pSnapManager.move_guideline = function (pos) {
		var info_list = this._guideline_snap_comps;
		var count = info_list.length;
		for (var i = 0; i < count; i++) {
			var info = info_list[i];
			if (!info.resize) {
				var side = 0;
				eval("side = info.rc." + info.side + " + (pos - info.rc." + info.target + ")");
				eval("info.rc." + info.side + " = " + side);
			}

			eval("info.rc." + info.target + " = pos;");
		}
	};

	_pSnapManager.moved_guideline = function () {
		var designform = this.target;
		var info_list = this._guideline_snap_comps;
		var count = info_list.length;
		var comp_list = [];
		var normalize = function (rc) {
			if (rc.left > rc.right) {
				var temp = rc.left;
				rc.left = rc.right;
				rc.right = temp;
			}
			if (rc.top > rc.bottom) {
				var temp = rc.top;
				rc.top = rc.bottom;
				rc.bottom = temp;
			}

			return rc;
		};

		for (var i = 0; i < count; i++) {
			var info = info_list[i];
			var comp = info.comp;
			var parent = comp.parent;
			var rc = info.rc;
			rc = normalize(rc);
			var l = designform.rootToParent(rc.left, true, parent);
			var t = designform.rootToParent(rc.top, false, parent);
			designform._moveComponentByRect(comp, l, t, rc.right - rc.left, rc.bottom - rc.top);
			comp_list.push(designform._getScopeName(comp));
		}

		return comp_list.join(',');
	};

	_pSnapManager._check_snap_info = function (hori, info, index, cursor_type) {
		switch (cursor_type) {
			case nexacro._mouse_cursor_lt:
				{

					if (index > 1) {
						return false;
					}
				}
				break;
			case nexacro._mouse_cursor_t:
				{

					if (hori || index > 1) {
						return false;
					}
				}
				break;
			case nexacro._mouse_cursor_rt:
				{

					if (!((hori && index > 2) || (!hori && index < 2))) {
						return false;
					}
				}
				break;
			case nexacro._mouse_cursor_l:
				{

					if (!hori || index > 1) {
						return false;
					}
				}
				break;
			case nexacro._mouse_cursor_r:
				{

					if (!hori || index < 3) {
						return false;
					}
				}
				break;
			case nexacro._mouse_cursor_lb:
				{

					if (!((hori && index < 2) || (!hori && index > 2))) {
						return false;
					}
				}
				break;
			case nexacro._mouse_cursor_b:
				{

					if (hori || index < 3) {
						return false;
					}
				}
				break;
			case nexacro._mouse_cursor_rb:
				{

					if (index < 3) {
						return false;
					}
				}
				break;
		}

		if (index == nexacro.SnapManager.SNAP_BACK_SPACE) {
			if (!nexacro._design_option_snap_component) {
				return false;
			}

			if (info.type != nexacro.SnapInfo.SNAP_COMP_L && info.type != nexacro.SnapInfo.SNAP_COMP_T) {
				return false;
			}
		}

		if (index == nexacro.SnapManager.SNAP_FRONT_SPACE) {
			if (!nexacro._design_option_snap_component) {
				return false;
			}

			if (info.type != nexacro.SnapInfo.SNAP_COMP_R && info.type != nexacro.SnapInfo.SNAP_COMP_B) {
				return false;
			}
		}

		return true;
	};

	_pSnapManager._make_snap_draw_info = function (rc, hori, cursor_type) {
		var line_info = [];
		var arr = null;
		var pos1 = 0;
		var pos2 = 0;
		var pos = [];
		if (hori) {
			pos.push(rc.left - nexacro._design_option_snap_component_sapce);
			pos.push(rc.left);
			pos.push(rc.left + parseInt(rc.width / 2));
			pos.push(rc.right);
			pos.push(rc.right + nexacro._design_option_snap_component_sapce);

			arr = this._arr_x;

			pos1 = rc.top - 20;
			pos2 = rc.bottom + 20;
		}
		else {
			pos.push(rc.top - nexacro._design_option_snap_component_sapce);
			pos.push(rc.top);
			pos.push(rc.top + parseInt(rc.height / 2));
			pos.push(rc.bottom);
			pos.push(rc.bottom + nexacro._design_option_snap_component_sapce);

			arr = this._arr_y;

			pos1 = rc.left - 20;
			pos2 = rc.right + 20;
		}
		var offset = 0;

		var MIN = function (a, b) {
			return (a < b) ? a : b;
		};
		var MAX = function (a, b) {
			return (a > b) ? a : b;
		};

		var x1;
		var y1;
		var x2;
		var y2;
		var designform = this.target;
		var rootobj = designform.get_root_obj();

		var count = arr.length;
		for (var i = 0; i < count; i++) {
			var info = arr[i];
			if (info) {
				for (var index = 0; index < 5; index++) {
					if (!this._check_snap_info(hori, info, index, cursor_type)) {
						continue;
					}

					if (pos[index] == info.pos) {
						if (info.is_Component_snap()) {
							if (hori) {
								pos1 = MIN(pos1, info._rect.top - 20);
								pos2 = MAX(pos2, info._rect.bottom + 20);
							}
							else {
								pos1 = MIN(pos1, info._rect.left - 20);
								pos2 = MAX(pos2, info._rect.right + 20);
							}
						}

						if (hori) {
							x1 = info.pos + offset;
							y1 = pos1;
							x2 = info.pos + offset;
							y2 = pos2;
						}
						else {
							x1 = pos1;
							y1 = info.pos;
							x2 = pos2;
							y2 = info.pos;
						}

						x1 = designform.formToClient(x1, true, rootobj);
						y1 = designform.formToClient(y1, false, rootobj);
						x2 = designform.formToClient(x2, true, rootobj);
						y2 = designform.formToClient(y2, false, rootobj);

						line_info.push(x1 + "," + y1 + "," + x2 + "," + y2);
					}
				}

				if (pos[nexacro.SnapManager.SNAP_BACK_SPACE] < info.pos) {
					break;
				}
			}
		}

		return line_info.join('/');
	};

	_pSnapManager._make_guideline_draw_info = function () {
		var draw_info = [];
		var info_list = this._guideline_snap_comps;
		var count = info_list.length;
		var designform = this.target;
		var rootobj = designform.get_root_obj();

		for (var i = 0; i < count; i++) {
			var info = info_list[i];

			var x1 = designform.formToClient(info.rc.left, true, rootobj);
			var y1 = designform.formToClient(info.rc.top, false, rootobj);
			var x2 = designform.formToClient(info.rc.right, true, rootobj);
			var y2 = designform.formToClient(info.rc.bottom, false, rootobj);

			draw_info.push(x1 + "," + y1 + "," + (x2 - x1) + "," + (y2 - y1));
		}

		return draw_info.join('/');
	};

	delete _pSnapManager;

	nexacro.DesignLayer = function (target) {
		this.target = target;
		this._layer_index = -1;
	};

	var _pDesignLayer = nexacro._createPrototype(Object, nexacro.DesignLayer);
	nexacro.DesignLayer.prototype = _pDesignLayer;

	_pDesignLayer._start_drag = function () {
		this.target._dragging_layer = this._layer_index;
	};

	_pDesignLayer._end_drag = function () {
		var designform = this.target;
		designform._dragging_layer = -1;
		designform._move_info.clear();
		designform._snap_manager.clear();
	};

	_pDesignLayer._check_drag = function () {
		var move_info = this.target._move_info;

		if (move_info._layer != this._layer_index) {
			return false;
		}

		if (Math.abs(move_info.distance_x()) > 3 || Math.abs(move_info.distance_y()) > 3) {
			return true;
		}

		return false;
	};

	_pDesignLayer._is_dragging = function () {
		return (this.target._dragging_layer == this._layer_index);
	};

	_pDesignLayer._is_button_down = function () {
		return (this.target._move_info._layer == this._layer_index);
	};


	delete _pDesignLayer;

	nexacro.TrackerLayer = function (target) {
		nexacro.DesignLayer.call(this, target);

		this._layer_index = 0;
		this._drag_type = -1;

		this._move_comps = null;
		this._resize_comps = null;
		this._fixed_comps = null;
	};

	var _pTrackerLayer = nexacro._createPrototype(nexacro.DesignLayer, nexacro.TrackerLayer);
	nexacro.TrackerLayer.prototype = _pTrackerLayer;

	_pTrackerLayer.check_cursor = function (x, y) {
		var designform = this.target;
		var cursor = nexacro._mouse_cursor_none;

		if (nexacro._design_mode == nexacro._design_mode_form_move) {
			cursor = nexacro._mouse_cursor_form_move;
		}
		else if (nexacro._design_mode != nexacro._design_mode_select) {
			cursor = nexacro._mouse_cursor_create_component;
		}
		else {
			var rootobj = designform.get_root_obj();
			if (designform._selected_components.length > 0) {
				var comps = designform._selected_components;
				var count = comps.length;
				for (var i = 0; i < count; i++) {
					var obj = comps[i];
					var rect = designform._hitTestTracker(x, y, rootobj, obj);
					if (!Array.isArray(rect)) {
						continue;
					}

					if (rect[0] < x && rect[0] + rect[2] > x && rect[1] < y && rect[1] + rect[3] > y) {
						cursor = nexacro._mouse_cursor_move;
						break;
					}

					for (var j = 0; j < 8; j++) {
						var rcTracker = this._get_tracker_rect(j, rect);

						if (rcTracker[0] < x && rcTracker[0] + rcTracker[2] > x && rcTracker[1] < y && rcTracker[1] + rcTracker[3] > y && 
							!(obj instanceof nexacro.Tabpage)) {
							cursor = j;
							break;
						}
					}
				}
			}
			else {
				var rect = designform._getClientRect(rootobj);

				function _check_base_tracker (rcTracker) {
					if (rcTracker[0] < x && rcTracker[0] + rcTracker[2] > x && rcTracker[1] < y && rcTracker[1] + rcTracker[3] > y) {
						return true;
					}

					return false;
				}

				if (_check_base_tracker(this._get_tracker_rect(nexacro._mouse_cursor_r, rect))) {
					cursor = nexacro._mouse_cursor_r;
				}
				else if (_check_base_tracker(this._get_tracker_rect(nexacro._mouse_cursor_rb, rect))) {
					cursor = nexacro._mouse_cursor_rb;
				}
				else if (_check_base_tracker(this._get_tracker_rect(nexacro._mouse_cursor_b, rect))) {
					cursor = nexacro._mouse_cursor_b;
				}
			}
		}

		designform.set_cursor(cursor);

		return true;
	};

	_pTrackerLayer._get_tracker_rect = function (v, rect) {
		if ((v == nexacro._mouse_cursor_t || v == nexacro._mouse_cursor_b) && 
			rect[0] + rect[2] < nexacro._min_tracker_size) {
			return 0;
		}
		if ((v == nexacro._mouse_cursor_l || v == nexacro._mouse_cursor_r) && 
			rect[1] + rect[3] < nexacro._min_tracker_size) {
			return 0;
		}

		var left = rect[0];
		var top = rect[1];
		var right = rect[0] + rect[2];
		var bottom = rect[1] + rect[3];
		var width_harf = rect[0] + rect[2] / 2;
		var height_harf = rect[1] + rect[3] / 2;

		var rc = [];

		if (v == nexacro._mouse_cursor_lt) {
			rc = [left - 7, top - 7, left - 1, top - 1];
		}
		if (v == nexacro._mouse_cursor_t) {
			rc = [width_harf - 3, top - 7, width_harf + 3, top - 1];
		}
		if (v == nexacro._mouse_cursor_rt) {
			rc = [right + 1, top - 7, right + 7, top - 1];
		}
		if (v == nexacro._mouse_cursor_l) {
			rc = [left - 7, height_harf - 3, left - 1, height_harf + 3];
		}
		if (v == nexacro._mouse_cursor_r) {
			rc = [right + 1, height_harf - 3, right + 7, height_harf + 3];
		}
		if (v == nexacro._mouse_cursor_lb) {
			rc = [left - 7, bottom + 1, left - 1, bottom + 7];
		}
		if (v == nexacro._mouse_cursor_b) {
			rc = [width_harf - 3, bottom + 1, width_harf + 3, bottom + 7];
		}
		if (v == nexacro._mouse_cursor_rb) {
			rc = [right + 1, bottom + 1, right + 7, bottom + 7];
		}

		rc[2] -= rc[0];
		rc[3] -= rc[1];

		return rc;
	};

	_pTrackerLayer._make_draw_info = function () {
		var designform = this.target;
		var rootid = designform._getScopeName(designform.get_root_obj());
		var comps = [];
		if (this._move_comps) {
			comps = comps.concat(this._move_comps);
		}
		if (this._resize_comps) {
			comps = comps.concat(this._resize_comps);
		}
		if (this._fixed_comps) {
			comps = comps.concat(this._fixed_comps);
		}

		var info = [];
		var count = comps.length;
		for (var i = 0; i < count; i++) {
			var rect = comps[i].split(',');

			var l = parseInt(rect[0]);
			var t = parseInt(rect[1]);
			var w = parseInt(rect[2]);
			var h = parseInt(rect[3]);

			var left = designform.formToClient(l, true, rootid);
			var top = designform.formToClient(t, false, rootid);
			var width = designform.formToClient(l + w, true, rootid) - left;
			var height = designform.formToClient(t + h, false, rootid) - top;

			info.push(left + "," + top + "," + width + "," + height);
		}

		return info.join('/');
	};

	_pTrackerLayer._make_snap_draw_info = function () {
		var designform = this.target;
		var snap_manager = designform._snap_manager;
		var rootid = designform._getScopeName(designform.get_root_obj());
		var comps = [];
		if (this._move_comps) {
			comps = comps.concat(this._move_comps);
		}
		if (this._resize_comps) {
			comps = comps.concat(this._resize_comps);
		}
		if (this._fixed_comps) {
			comps = comps.concat(this._fixed_comps);
		}

		var cursor_type = designform.get_cursor_type();
		var info_list = [];
		var count = comps.length;
		for (var i = 0; i < count; i++) {
			var rect = comps[i].split(',');

			var left = parseInt(rect[0]);
			var top = parseInt(rect[1]);
			var width = parseInt(rect[2]);
			var height = parseInt(rect[3]);

			var _rect = {
				"left" : left, 
				"top" : top, 
				"width" : width, 
				"height" : height, 
				"right" : left + width, 
				"bottom" : top + height
			};

			var info = snap_manager._make_snap_draw_info(_rect, true, cursor_type);
			if (info.length > 0) {
				info_list.push(info);
			}

			info = snap_manager._make_snap_draw_info(_rect, false, cursor_type);
			if (info.length > 0) {
				info_list.push(info);
			}
		}

		return info_list.join('/');
	};

	_pTrackerLayer._make_preselect_draw_info = function (comp_list) {
		var designform = this.target;
		var comps = comp_list.split(',');

		var rootobj = designform.get_root_obj();
		var rootid = designform._getScopeName(rootobj);

		var info = [];
		var count = comps.length;
		for (var i = 0; i < count; i++) {
			var rect = designform.getClientRect(comps[i]);
			info.push(rect.join(','));
		}

		return info.join('/');
	};

	_pTrackerLayer._drag_move = function (x, y) {
		var designform = this.target;
		var comps = designform._selected_components;
		var count = comps.length;

		var move_comps = [];
		var fixed_comps = [];
		var shiftkey = nexacro.__IsSHIFTpressed();
		var altkey = nexacro.__IsALTpressed();
		var snap = (!altkey && designform.is_need_snap(0));

		if (shiftkey) {
			var abs_x = Math.abs(x);
			var abs_y = Math.abs(y);

			if (abs_x > abs_y) {
				y = 0;
			}
			else {
				x = 0;
			}
		}

		var scale = designform._getZoom() / 100;
		x /= scale;
		x = parseInt(x);
		y /= scale;
		y = parseInt(y);

		designform.clear_snap_point();

		var stepcount = designform.get_step_count();
		var stepwidth = 0;
		if (stepcount > 1) {
			stepwidth = designform.get_step_width(false);
		}

		for (var i = 0; i < count; i++) {
			var comp = comps[i];

			var rect = designform._getComponentRect(comp, true);
			rect[0] += x;
			rect[1] += y;

			if (snap) {
				designform.snap(rect, nexacro._mouse_cursor_move);
			}

			move_comps.push(rect.join(','));

			if (stepcount < 2) {
				continue;
			}

			var positionstep = designform.get_owner_step_index(comp);
			if (positionstep >= 0) {
				continue;
			}

			for (var j = 1; j < stepcount; j++) {
				rect[0] += stepwidth;

				if (snap) {
					designform.snap(rect, nexacro._mouse_cursor_move);
				}

				fixed_comps.push(rect.join(','));
			}
		}

		if (snap) {
			var snap_point = designform.get_snap_point();
			var dist_x = snap_point.x;
			var dist_y = snap_point.y;

			if (dist_x != 0 || dist_y != 0) {
				for (var i = 0; i < count; i++) {
					var rect = move_comps[i].split(',');
					rect[0] = parseInt(rect[0]) + dist_x;
					rect[1] = parseInt(rect[1]) + dist_y;

					move_comps[i] = rect.join(',');
				}

				count = fixed_comps.length;
				for (var i = 0; i < count; i++) {
					var rect = fixed_comps[i].split(',');
					rect[0] = parseInt(rect[0]) + dist_x;
					rect[1] = parseInt(rect[1]) + dist_y;

					fixed_comps[i] = rect.join(',');
				}
			}
		}

		this._move_comps = move_comps;
		this._fixed_comps = fixed_comps;
	};

	_pTrackerLayer._drag_resize = function (x, y) {
		var designform = this.target;
		var comps = designform._selected_components;
		var count = comps.length;

		var resize_comps = [];
		var fixed_comps = [];
		var shiftkey = nexacro.__IsSHIFTpressed();
		var ctrlkey = nexacro.__IsCTRLpressed();
		var altkey = nexacro.__IsALTpressed();
		var snap = (!altkey && designform.is_need_snap(0));

		var scale = designform._getZoom() / 100;
		x /= scale;
		x = parseInt(x);
		y /= scale;
		y = parseInt(y);

		designform.clear_snap_point();
		var cursor_type = designform.get_cursor_type();

		var stepcount = designform.get_step_count();
		var stepwidth = 0;
		if (stepcount > 1) {
			stepwidth = designform.get_step_width(false);
		}

		var index = 0;
		var comp = (count > 0) ? comps[index] : designform.get_root_obj();

		while (comp) {
			var rect = designform._getComponentRect(comp, true);
			if (comp == designform._inner_form) {
				var borderwidth = designform._getBorderWidth(comp);

				rect[0] -= borderwidth;
				rect[1] -= borderwidth;
			}

			rect = this._resize(rect, x, y, shiftkey, ctrlkey);

			if (snap) {
				designform.snap(rect, cursor_type);
			}

			resize_comps.push(rect.join(','));

			if (stepcount < 2) {
				comp = comps[++index];
				continue;
			}

			var positionstep = designform.get_owner_step_index(comp);
			if (positionstep >= 0) {
				comp = comps[++index];
				continue;
			}

			for (var j = 1; j < stepcount; j++) {
				rect[0] += stepwidth;

				if (snap) {
					designform.snap(rect, cursor_type);
				}

				fixed_comps.push(rect.join(','));
			}
		}

		if (snap) {
			var snap_point = designform.get_snap_point();
			var dist_x = snap_point.x;
			var dist_y = snap_point.y;

			if (dist_x != 0 || dist_y != 0) {
				count = resize_comps.length;
				for (var i = 0; i < count; i++) {
					var rect = resize_comps[i].split(',');

					rect = this._resize(rect, dist_x, dist_y, shiftkey, ctrlkey);

					resize_comps[i] = rect.join(',');
				}

				count = fixed_comps.length;
				for (var i = 0; i < count; i++) {
					var rect = fixed_comps[i].split(',');

					rect = this._resize(rect, dist_x, dist_y, shiftkey, ctrlkey);

					fixed_comps[i] = rect.join(',');
				}
			}
		}

		this._resize_comps = resize_comps;
		this._fixed_comps = fixed_comps;
	};

	_pTrackerLayer._resize = function (rect, x, y, shiftkey, ctrlkey) {
		var designform = this.target;
		var cursor_type = designform.get_cursor_type();
		var l = parseInt(rect[0]);
		var t = parseInt(rect[1]);
		var w = parseInt(rect[2]);
		var h = parseInt(rect[3]);
		var r = l + w;
		var b = t + h;

		if (!ctrlkey && shiftkey) {
			var x1 = Math.abs(x);
			var y1 = Math.abs(y);

			var dSacleX = x1 / w;
			var dSacleY = y1 / h;

			var dy = h * dSacleX;
			var dx = w * dSacleY;

			var bChangeX = true;
			var bIncrease = true;

			switch (cursor_type) {
				case nexacro._mouse_cursor_lt:
					{

						if (x > 0 && y > 0) {
							bChangeX = (dSacleX > dSacleY);
							bIncrease = false;
						}
						else if (x < 0 && y < 0) {
							bChangeX = (dSacleX < dSacleY);
						}
						else {
							bChangeX = (x > 0);
						}

						if (bChangeX) {
							x = parseInt(dx);
							if (bIncrease) {
								x *= -1;
							}
						}
						else {
							y = parseInt(dy);
							if (bIncrease) {
								y *= -1;
							}
						}
					}
					break;
				case nexacro._mouse_cursor_rt:
					{

						if (x < 0 && y > 0) {
							bChangeX = (dSacleX > dSacleY);
							bIncrease = false;
						}
						else if (x > 0 && y < 0) {
							bChangeX = (dSacleX < dSacleY);
						}
						else {
							bChangeX = (x < 0);
						}

						if (bChangeX) {
							x = parseInt(dx);
							if (!bIncrease) {
								x *= -1;
							}
						}
						else {
							y = parseInt(dy);
							if (bIncrease) {
								y *= -1;
							}
						}
					}
					break;
				case nexacro._mouse_cursor_lb:
					{

						if (x > 0 && y < 0) {
							bChangeX = (dSacleX > dSacleY);
							bIncrease = false;
						}
						else if (x < 0 && y > 0) {
							bChangeX = (dSacleX < dSacleY);
						}
						else {
							bChangeX = (x > 0);
						}

						if (bChangeX) {
							x = parseInt(dx);
							if (bIncrease) {
								x *= -1;
							}
						}
						else {
							y = parseInt(dy);
							if (!bIncrease) {
								y *= -1;
							}
						}
					}
					break;
				case nexacro._mouse_cursor_rb:
					{

						if (x < 0 && y < 0) {
							bChangeX = (dSacleX > dSacleY);
							bIncrease = false;
						}
						else if (x > 0 && y > 0) {
							bChangeX = (dSacleX < dSacleY);
						}
						else {
							bChangeX = (x < 0);
						}

						if (bChangeX) {
							x = parseInt(dx);
							if (!bIncrease) {
								x *= -1;
							}
						}
						else {
							y = parseInt(dy);
							if (!bIncrease) {
								y *= -1;
							}
						}
					}
					break;
				default:
					break;
			}
		}

		switch (cursor_type) {
			case nexacro._mouse_cursor_lt:
				{

					l += x;
					t += y;

					if (ctrlkey && !shiftkey) {
						r -= x;
						b -= y;
					}
				}
				break;
			case nexacro._mouse_cursor_t:
				{

					t += y;

					if (ctrlkey && !shiftkey) {
						b -= y;
					}
				}
				break;
			case nexacro._mouse_cursor_rt:
				{

					r += x;
					t += y;

					if (ctrlkey && !shiftkey) {
						l -= x;
						b -= y;
					}
				}
				break;
			case nexacro._mouse_cursor_l:
				{

					l += x;

					if (ctrlkey && !shiftkey) {
						r -= x;
					}
				}
				break;
			case nexacro._mouse_cursor_r:
				{

					r += x;

					if (ctrlkey && !shiftkey) {
						l -= x;
					}
				}
				break;
			case nexacro._mouse_cursor_lb:
				{

					l += x;
					b += y;

					if (ctrlkey && !shiftkey) {
						r -= x;
						t -= y;
					}
				}
				break;
			case nexacro._mouse_cursor_b:
				{

					b += y;

					if (ctrlkey && !shiftkey) {
						t -= y;
					}
				}
				break;
			case nexacro._mouse_cursor_rb:
				{

					r += x;
					b += y;

					if (ctrlkey && !shiftkey) {
						l -= x;
						t -= y;
					}
				}
				break;
			default:
				break;
		}

		if (l > r) {
			var x = l;
			l = r;
			r = x;
		}

		if (t > b) {
			var y = t;
			t = b;
			b = y;
		}

		return [l, t, r - l, b - t];
	};

	_pTrackerLayer._resizeKeyEvent = function (v, x, y) {
		var designform = this.target;
		var comps = designform._selected_components;
		var count = comps.length;
		for (var i = 0; i < count; i++) {
			var comp = comps[i];
			var rect = designform._getComponentRect(comp);
			var l = parseInt(rect[0]);
			var t = parseInt(rect[1]);
			var r = parseInt(rect[2]) + l;
			var b = parseInt(rect[3]) + t;

			switch (v) {
				case nexacro.Event.KEY_UP:
					{

						t -= y;
					}
					break;
				case nexacro.Event.KEY_DOWN:
					{

						b += y;
					}
					break;
				case nexacro.Event.KEY_LEFT:
					{

						l -= x;
					}
					break;
				case nexacro.Event.KEY_RIGHT:
					{

						r += x;
					}
					break;
			}
			designform._moveComponentByRect(comp, l, t, r - l, b - t);
		}
		designform.movedComponents(comps.get_component_list());
	};

	_pTrackerLayer._moveKeyEvent = function (v, x, y) {
		var designform = this.target;
		var comps = designform._selected_components;
		var count = comps.length;
		for (var i = 0; i < count; i++) {
			var comp = comps[i];
			var rect = designform._getComponentRect(comp);
			var l = parseInt(rect[0]);
			var t = parseInt(rect[1]);
			var r = parseInt(rect[2]) + l;
			var b = parseInt(rect[3]) + t;

			switch (v) {
				case nexacro.Event.KEY_UP:
					{

						t -= y;
						b -= y;
					}
					break;
				case nexacro.Event.KEY_DOWN:
					{

						t += y;
						b += y;
					}
					break;
				case nexacro.Event.KEY_LEFT:
					{

						l -= x;
						r -= x;
					}
					break;
				case nexacro.Event.KEY_RIGHT:
					{

						l += x;
						r += x;
					}
					break;
			}
			designform._moveComponentByRect(comp, l, t, r - l, b - t);
		}
		designform.movedComponents(comps.get_component_list());
	};

	_pTrackerLayer.execLButtonDown = function (x, y) {
		var designform = this.target;
		var rootobj = designform.get_root_obj();
		var rootid = designform._getScopeName(rootobj);

		switch (designform.get_cursor_type()) {
			case nexacro._mouse_cursor_none:
			case nexacro._mouse_cursor_move:
				{

					var hitcomp = designform.hitTestByPoint(x, y, rootid, true);
					designform.selectComponents(hitcomp, false);
					if (hitcomp != rootid) {
						designform.set_cursor(nexacro._mouse_cursor_move);
					}
					designform.drawWindow(false);
				}
				break;
		}

		return true;
	};

	_pTrackerLayer.execLButtonUp = function (x, y) {
		if (!this._is_button_down()) {
			return false;
		}

		var designform = this.target;
		var rootobj = designform.get_root_obj();
		var rootid = designform._getScopeName(rootobj);

		switch (this.target.get_cursor_type()) {
			case nexacro._mouse_cursor_create_component:
				{

					var parentid = designform.checkParent(x, y, rootid);

					var left = designform.clientToForm(x, true, parentid);
					var top = designform.clientToForm(y, false, parentid);

					var width = nexacro.__getDefaultWidth(nexacro._design_mode);
					var height = nexacro.__getDefaultHeight(nexacro._design_mode);
					var compid = designform.createComponentByRect(nexacro._design_mode, parentid, left, top, width, height, "", true);

					if (parentid != "" && parentid != "this") {
						compid = parentid + "." + compid;
					}

					designform.createdComponents(compid);
					designform.selectComponents(compid, true);

					designform.drawWindow(true);
				}
				break;
		}

		return true;
	};

	_pTrackerLayer.execLButtonDblClk = function (x, y) {
		var designform = this.target;
		var rootobj = designform.get_root_obj();
		var rootid = designform._getScopeName(rootobj);

		switch (designform.get_cursor_type()) {
			case nexacro._mouse_cursor_none:
			case nexacro._mouse_cursor_move:
				{

					var hitcomp = designform.hitTestByPoint(x, y, rootid, true);
					designform.selectComponents(hitcomp, false);

					var pivot = designform._selected_components.get_pivot();
					if (pivot) {
						designform.defaultAction(pivot);
					}
				}
				break;
		}

		return true;
	};

	_pTrackerLayer.execMouseMove = function (x, y) {
		var designform = this.target;
		if (this._is_dragging()) {
			var move_info = designform._move_info;
			var distance_x = move_info.distance_x();
			var distance_y = move_info.distance_y();
			var realform = false;

			switch (this.target.get_cursor_type()) {
				case nexacro._mouse_cursor_form_move:
					{

						designform.moveRoot(distance_x, distance_y, false);
						realform = true;
					}
					break;
				case nexacro._mouse_cursor_move:
					{

						this._drag_move(distance_x, distance_y);
					}
					break;
				case nexacro._mouse_cursor_none:
				case nexacro._mouse_cursor_create_component:
					break;
				default:
					{

						this._drag_resize(distance_x, distance_y);
					}
					break;
			}

			designform.drawWindow(realform);

			return true;
		}
		else if (this._check_drag()) {
			this._start_drag();

			var cursor_type = designform.get_cursor_type();
			if (designform.is_need_snap(cursor_type)) {
				designform.init_snap_info();
			}

			var bApply = designform.startDrag();

			if (bApply) {
				var move_info = this.target._move_info;
				var rootobj = designform.get_root_obj();
				var rootid = designform._getScopeName(rootobj);
				var realform = false;

				switch (cursor_type) {
					case nexacro._mouse_cursor_form_move:
						{

							this.target.moveRoot(move_info.distance_x(), move_info.distance_y(), true);
						}
						break;
					case nexacro._mouse_cursor_move:
						{

							var move_comps = this._move_comps;
							if (move_comps === null) {
								break;
							}

							var comps = designform._selected_components;
							var count = move_comps.length;
							for (var i = 0; i < count; i++) {
								var comp = comps.get_item(i);
								var rect = move_comps[i].split(',');

								var parentid = designform._getScopeName(comp.parent);
								var l = designform.rootToParent(rect[0], true, parentid);
								var t = designform.rootToParent(rect[1], false, parentid);
								designform._moveComponentByRect(comps[i], l, t, rect[2], rect[3]);
							}

							designform.movedComponents(comps.get_component_list());

							this._move_comps = null;
							this._fixed_comps = null;
							realform = true;
						}
						break;
					case nexacro._mouse_cursor_none:
						{

							move_info.normalize();

							var hitcomplist = designform.hitTestByRect(move_info.x1, move_info.y1, move_info.get_width(), move_info.get_height(), rootid, nexacro._design_option_select_type);
							designform.selectComponents(hitcomplist, true);
						}
						break;
					case nexacro._mouse_cursor_create_component:
						{

							move_info.normalize();

							var parentid = designform.checkParent(move_info.x1, move_info.y1, rootid);

							var parentobj = designform._getObject(parentid);
							while (parentobj && parentobj != designform._inner_form) {
								var rect = designform._getClientRect(parentobj);
								if (move_info.x2 < rect[0] + rect[2] && 
									move_info.y2 < rect[1] + rect[3]) {
									break;
								}

								parentobj = parentobj.parent;
							}

							parentid = designform._getScopeName(parentobj);

							var left = designform.clientToForm(move_info.x1, true, parentid);
							var top = designform.clientToForm(move_info.y1, false, parentid);
							var right = designform.clientToForm(move_info.x2, true, parentid);
							var bottom = designform.clientToForm(move_info.y2, false, parentid);

							var compid = designform.createComponentByRect(nexacro._design_mode, parentid, left, top, right - left, bottom - top, "", true);

							if (parentid != "" && parentid != "this") {
								compid = parentid + "." + compid;
							}

							designform.createdComponents(compid);
							designform.selectComponents(compid, true);

							realform = true;
						}
						break;
					default:
						{

							var resize_comps = this._resize_comps;
							if (resize_comps === null) {
								break;
							}

							var comps = designform._selected_components;
							var count = comps.length;
							var i = 0;
							var comp = (count > 0) ? comps[i] : rootobj;
							while (comp) {
								var rect = resize_comps[i].split(',');
								if (comp == designform._inner_form) {
									designform.setFormSize(rect[2], rect[3]);
								}
								else if (comp == rootobj) {
									comp.resize(rect[2], rect[3]);
								}
								else {
									var parentid = designform._getScopeName(comp.parent);
									var l = designform.rootToParent(parseInt(rect[0]), true, parentid);
									var t = designform.rootToParent(parseInt(rect[1]), false, parentid);

									designform._moveComponentByRect(comp, l, t, rect[2], rect[3]);
								}

								comp = comps[++i];
							}

							designform.movedComponents(comps.get_component_list());

							this._resize_comps = null;
							this._fixed_comps = null;
							realform = true;
						}
						break;
				}
			}

			this._end_drag();

			designform.drawWindow(realform);

			return true;
		}
		else if (!this._is_button_down()) {
			this.check_cursor(x, y);
			designform.redrawRuler();
		}

		return true;
	};

	_pTrackerLayer.execKeyDown = function (v) {
		var designform = this.target;

		switch (v) {
			case nexacro.Event.KEY_UP:
			case nexacro.Event.KEY_DOWN:
			case nexacro.Event.KEY_LEFT:
			case nexacro.Event.KEY_RIGHT:
				{

					var x = designform._dot_size_x;
					var y = designform._dot_size_y;

					if (nexacro.__IsCTRLpressed()) {
						x = y = 1;
					}

					if (nexacro.__IsSHIFTpressed()) {
						this._resizeKeyEvent(v, x, y);
					}
					else {
						this._moveKeyEvent(v, x, y);
					}
				}
				designform.drawWindow(true);
				return true;
			case nexacro.Event.KEY_TAB:
				{

					var pivot = designform._selected_components.get_pivot();
					if (pivot) {
						var parent = pivot.parent;
						var childs = designform._getChilds(parent);
						var count = childs.length;
						if (childs && count > 1) {
							var index = childs.indexOf(pivot.id);
							index = (nexacro.__IsSHIFTpressed() ? (index + 1) : (index - 1));

							if (index < 0) {
								index = count - 1;
							}
							else if (index == count) {
								index = 0;
							}

							var comp = childs.get_item(index);
							designform.selectComponent(designform._getScopeName(comp));
							designform.drawWindow(false);
						}
					}
				}
				return true;
			case nexacro.Event.KEY_DELETE:
				{

					designform.deleteComponents(designform._selected_components.get_component_list());
					designform.selectComponent("");
					designform.drawWindow(true);
				}
				return true;
			case nexacro.Event.KEY_ESC:
				{

					var pivot = designform._selected_components.get_pivot();
					if (pivot && pivot.parent) {
						var parent = pivot.parent;
						if (parent == designform.get_root_obj()) {
							designform.selectComponent("");
						}
						else {
							designform.selectComponent(designform._getScopeName(parent), true);
						}
						designform.drawWindow(false);
					}
					else {
						if (designform._is_sub_layout_editting()) {
							designform.cancelSubLayoutEdit();
						}
					}
				}
				return true;
			case nexacro.Event.KEY_ENTER:
				{

					if (designform._is_sub_layout_editting()) {
						designform.endSubLayoutEdit(nexacro.__IsCTRLpressed());
					}
				}
				return true;
			case nexacro.Event.KEY_A:
			case nexacro.Event.KEY_a:
				{

					if (nexacro.__IsCTRLpressed()) {
						designform.selectAll();
						designform.drawWindow(false);
					}
				}
				return true;
		}

		return false;
	};

	_pTrackerLayer.execDrawBack = function (hDC) {
		var designform = this.target;

		var selected_components = designform._selected_components;
		var count = selected_components.length;
		if (count == 0) {
			var obj = designform.get_root_obj();
			var rect = designform._getClientRect(obj);
			designform.draw_tracker_base(hDC, rect[0], rect[1], rect[2], rect[3]);
		}
		else {
			var trackers = [];
			for (var i = 0; i < count; i++) {
				var tracker = [];
				var obj = selected_components[i];
				var rect = designform._getClientRect(obj);

				tracker.push(rect[0]);
				tracker.push(rect[1]);
				tracker.push(rect[2]);
				tracker.push(rect[3]);

				function _is_use_position (pos) {
					return eval("!(undefined === obj." + pos + " || null === obj." + pos + ")");
				}

				tracker.push(_is_use_position("left"));
				tracker.push(_is_use_position("top"));
				tracker.push(_is_use_position("width"));
				tracker.push(_is_use_position("height"));
				tracker.push(_is_use_position("right"));
				tracker.push(_is_use_position("bottom"));


				trackers.push(tracker.join(','));
			}

			designform.draw_tracker(hDC, trackers.join('/'));
		}

		if (designform.get_cursor_type() == nexacro._mouse_cursor_none && this._is_dragging()) {
			var move_info = this.target._move_info;
			move_info.normalize();

			var rootobj = designform.get_root_obj();
			var rootid = designform._getScopeName(rootobj);

			var hitcomplist = designform.hitTestByRect(move_info.x1, move_info.y1, move_info.get_width(), move_info.get_height(), rootid, nexacro._design_option_select_type);
			if (hitcomplist && hitcomplist.length > 0) {
				var draw_info = this._make_preselect_draw_info(hitcomplist);
				designform.drawPreSelectRect(hDC, draw_info);
			}
		}
	};

	_pTrackerLayer.execDrawFront = function (hDC) {
		if (this._is_dragging()) {
			var designform = this.target;
			var cursor_type = designform.get_cursor_type();
			switch (cursor_type) {
				case nexacro._mouse_cursor_form_move:
					break;
				case nexacro._mouse_cursor_move:
					{

						var draw_info = this._make_draw_info();
						designform.drawMoveRect(hDC, draw_info);

						if (designform.is_need_snap(cursor_type)) {
							var draw_info = this._make_snap_draw_info();
							designform.drawSnapGuide(hDC, draw_info);
						}
					}
					break;
				case nexacro._mouse_cursor_none:
				case nexacro._mouse_cursor_create_component:
					{

						var move_info = this.target._move_info;
						designform.drawSelectRect(hDC, move_info._start_x, move_info._start_y, move_info._move_x, move_info._move_y);
					}
					break;
				default:
					{

						var draw_info = this._make_draw_info();
						designform.drawResizeRect(hDC, draw_info);
						if (designform.is_need_snap(cursor_type)) {
							var draw_info = this._make_snap_draw_info();
							designform.drawSnapGuide(hDC, draw_info);
						}
					}
					break;
			}
		}
	};

	delete _pTrackerLayer;

	nexacro.InfoLayer = function (target) {
		nexacro.DesignLayer.call(this, target);

		this._layer_index = 1;
		this._hitcomp = "";
		this._hit_x = 0;
		this._hit_y = 0;

		this._bind_info = new nexacro.Collection();
	};

	var _pInfoLayer = nexacro._createPrototype(nexacro.DesignLayer, nexacro.InfoLayer);
	nexacro.InfoLayer.prototype = _pInfoLayer;

	delete _pInfoLayer;

	_pInfoLayer.destroy = function () {
		this._bind_info.clear();
	};

	_pInfoLayer.execMouseMove = function (x, y) {
		var designform = this.target;
		if (!designform._show_bind_info) {
			return false;
		}

		if (nexacro._design_mode != nexacro._design_mode_select) {
			return false;
		}

		var hitcomp = designform.hitTestByPoint(x, y, "", true);
		if (hitcomp) {
			var rect = designform.getClientRect(hitcomp);

			var width = parseInt(rect[2]);
			var height = parseInt(rect[3]);
			if (width < 10 || height < 10) {
				hitcomp = "";
			}
			else {
				var right = parseInt(rect[0]) + width;
				var bottom = parseInt(rect[1]) + height;

				if (right - 10 > x || bottom - 10 > y) {
					hitcomp = "";
				}
			}
		}

		if (this._hitcomp != hitcomp) {
			this._hitcomp = hitcomp;
			this._hit_x = x;
			this._hit_y = y;

			designform.drawWindow(false);
		}

		var hit = (this._hitcomp && this._hitcomp.length > 0);

		if (hit) {
			designform.set_cursor(nexacro._mouse_cursor_tooltip);
		}

		return hit;
	};


	_pInfoLayer.execDrawBack = function (hDC) {
		var designform = this.target;
		if (designform._show_taborder_info) {
			var info = this._make_taborder_info(designform._inner_form);
			designform.drawTaborderInfo(hDC, info);
		}

		if (designform._show_bind_info) {
			var info = "";
			var bind_info = this._bind_info;
			var count = bind_info.length;
			for (var i = 0; i < count; i++) {
				var compid = bind_info.get_id(i);
				var rect = designform.getClientRect(compid);
				if (!Array.isArray(rect)) {
					continue;
				}

				var width = parseInt(rect[2]);
				var height = parseInt(rect[3]);
				if (width < 10 || height < 10) {
					continue;
				}

				var right = parseInt(rect[0]) + width;
				var bottom = parseInt(rect[1]) + height;
				info += (right + ",");
				info += (bottom + "/");
			}

			designform.drawBindInfo(hDC, info);
		}
	};

	_pInfoLayer.execDrawFront = function (hDC) {
		var designform = this.target;
		if (designform._show_bind_info) {
			if (this._hitcomp && this._hitcomp.length > 0) {
				var info = this._bind_info[this._hitcomp];
				if (info && info.length > 0) {
					designform.drawBindInfoTooltip(hDC, info, this._hit_x, this._hit_y);
				}
			}
		}
	};

	_pInfoLayer._make_taborder_info = function (rootobj) {
		var info = "";
		if (rootobj) {
			var designform = this.target;
			var childs = designform._getChilds(rootobj);
			var count = childs ? childs.length : 0;

			for (var i = 0; i < count; i++) {
				var comp = childs[i];

				if (!(comp instanceof nexacro.Tabpage)) {
					var rect = designform._getClientRect(comp);
					info += (rect[0] + ",");
					info += (rect[1] + ",");
					info += ((comp._taborder ? comp._taborder : "0") + ",");
					info += i;

					info += "/";
				}

				info += this._make_taborder_info(comp);
			}
		}

		return info;
	};

	_pInfoLayer.setBindInfo = function (info) {
		var bind_info = this._bind_info;
		bind_info.clear();

		var info_list = info.split('/');
		var info_len = info_list.length;
		for (var i = 0; i < info_len; i++) {
			var tmp = info_list[i].split(';');
			bind_info.add(tmp[0], tmp[1]);
		}
	};

	nexacro.RulerLayer = function (target) {
		nexacro.DesignLayer.call(this, target);

		this._layer_index = 2;

		this._ruler_width = 20;

		this._ruler_button = 0;
		this._ruler_h = 1;
		this._ruler_v = 2;

		this._drag_guideline_pos = null;
		this._drag_guideline_hori = null;

		this._guideline_h = [];
		this._guideline_v = [];
	};

	var _pRulerLayer = nexacro._createPrototype(nexacro.DesignLayer, nexacro.RulerLayer);
	nexacro.RulerLayer.prototype = _pRulerLayer;

	_pRulerLayer.is_use_guideline = function () {
		var count = this._guideline_h.length + this._guideline_v.length;

		return (count > 0);
	};

	_pRulerLayer.get_guideline = function (hori) {
		return hori ? this._guideline_h : this._guideline_v;
	};

	_pRulerLayer.find_guideline = function (hori, pos) {
		var guidelines = this.get_guideline(hori);
		var count = guidelines.length;
		for (var i = 0; i < count; i++) {
			if (pos == guidelines[i]) {
				return true;
			}
		}

		return false;
	};

	_pRulerLayer.load_guideline = function (guideline_h, guideline_v) {
		this._guideline_h = (guideline_h.length > 0) ? guideline_h.split(',') : [];
		this._guideline_v = (guideline_v.length > 0) ? guideline_v.split(',') : [];

		this.target.drawWindow(false);
	};

	_pRulerLayer.save_guideline = function () {
		return [this._guideline_h.join(','), this._guideline_v.join(',')];
	};

	_pRulerLayer.get_ruler_width = function () {
		if (!nexacro._design_option_show_ruler) {
			return 0;
		}

		return this._ruler_width;
	};

	_pRulerLayer.vaild_pos = function (x, y) {
		if (!nexacro._design_option_show_ruler) {
			return false;
		}

		if (x < this._ruler_width && y < this._ruler_width) {
			return this._ruler_button;
		}
		else if (y < this._ruler_width) {
			return this._ruler_h;
		}
		else if (x < this._ruler_width) {
			return this._ruler_v;
		}

		return -1;
	};

	_pRulerLayer.add_guideline = function (pos, hori) {
		var index = this._exsit_guideline(pos, hori);
		if (index < 0) {
			var guidelines = (hori ? this._guideline_h : this._guideline_v);
			guidelines.push(pos);
		}
	};

	_pRulerLayer.remove_guideline = function (pos, hori) {
		var index = this._exsit_guideline(pos, hori);
		if (index < 0) {
			return;
		}

		var guidelines = (hori ? this._guideline_h : this._guideline_v);
		guidelines.splice(index, 1);
	};

	_pRulerLayer._exsit_guideline = function (pos, hori) {
		var guidelines = (hori ? this._guideline_h : this._guideline_v);
		var count = guidelines.length;
		for (var i = 0; i < count; i++) {
			if (Math.abs(guidelines[i] - pos) < 5) {
				return i;
			}
		}

		return -1;
	};

	_pRulerLayer._get_guideline = function (pos, hori) {
		this._drag_guideline_pos = null;
		this._drag_guideline_hori = null;

		var index = this._exsit_guideline(pos, hori);
		if (index < 0) {
			return false;
		}

		var guidelines = (hori ? this._guideline_h : this._guideline_v);

		this._drag_guideline_pos = guidelines[index];
		this._drag_guideline_hori = hori;

		guidelines.splice(index, 1);

		return true;
	};

	_pRulerLayer.check_cursor = function (x, y) {
		var type = this.vaild_pos(x, y);
		if (type < 0) {
			return false;
		}

		var designform = this.target;
		switch (type) {
			case this._ruler_h:
				var pos = designform.clientToForm(x, true);
				var index = this._exsit_guideline(pos, true);
				if (index >= 0) {
					designform.set_cursor(nexacro._mouse_cursor_l);
				}
				else {
					designform.set_cursor(nexacro._mouse_cursor_none);
				}
				break;
			case this._ruler_v:
				var pos = designform.clientToForm(y, false);
				var index = this._exsit_guideline(pos, false);
				if (index >= 0) {
					designform.set_cursor(nexacro._mouse_cursor_t);
				}
				else {
					designform.set_cursor(nexacro._mouse_cursor_none);
				}
				break;
		}

		return true;
	};

	_pRulerLayer.execLButtonDown = function (x, y) {
		var type = this.vaild_pos(x, y);
		if (type < 0) {
			return false;
		}

		var designform = this.target;
		switch (type) {
			case this._ruler_button:
				{

					if (nexacro._design_option_measure_type == nexacro._design_option_measure_pixel) {
						designform.changedOptMeasure(nexacro._design_option_measure_percent);
					}
					else {
						designform.changedOptMeasure(nexacro._design_option_measure_pixel);
					}
				}
				break;
			case this._ruler_h:
				{

					var pos = designform.clientToForm(x, true);
					if (!this._get_guideline(pos, true)) {
						this._drag_guideline_pos = pos;
						this._drag_guideline_hori = true;
						designform.drawWindow(false);
					}
				}
				break;
			case this._ruler_v:
				{

					var pos = designform.clientToForm(y, false);
					if (!this._get_guideline(pos, false)) {
						this._drag_guideline_pos = pos;
						this._drag_guideline_hori = false;
						designform.drawWindow(false);
					}
				}
				break;
		}

		return true;
	};

	_pRulerLayer.execLButtonUp = function (x, y) {
		if (!this._is_button_down()) {
			return false;
		}

		if (this._drag_guideline_pos != null) {
			this.add_guideline(this._drag_guideline_pos, this._drag_guideline_hori);
			this.target.drawWindow(false);
		}

		this._drag_guideline_pos = null;
		this._drag_guideline_hori = null;

		return true;
	};

	_pRulerLayer.execLButtonDblClk = function (x, y) {
		var type = this.vaild_pos(x, y);
		if (type < 0) {
			return false;
		}

		switch (type) {
			case this._ruler_button:
				break;
			case this._ruler_h:
				var pos = this.target.clientToForm(x, true);
				this.remove_guideline(pos, true);
				this.target.drawWindow(false);
				break;
			case this._ruler_v:
				var pos = this.target.clientToForm(y, false);
				this.remove_guideline(pos, false);
				this.target.drawWindow(false);
				break;
		}

		return true;
	};

	_pRulerLayer.execMouseMove = function (x, y) {
		var designform = this.target;
		if (this._is_dragging()) {
			var cf = designform.parent;
			if (!cf) {
				return false;
			}
			var width = cf._adjust_width;
			var height = cf._adjust_height;

			var pos = null;
			if (this._drag_guideline_hori) {
				if (y >= 0 && x >= this._ruler_width && x <= width) {
					pos = designform.clientToForm(x, true);
				}
			}
			else {
				if (x >= 0 && y >= this._ruler_width && y <= height) {
					pos = designform.clientToForm(y, false);
				}
			}

			if (pos != null) {
				pos += designform.snap_guideline(pos, this._drag_guideline_hori);
			}

			this._drag_guideline_pos = pos;

			designform.drawWindow(false);

			return true;
		}
		else if (this._check_drag() && this._drag_guideline_pos != null && this._drag_guideline_hori != null) {
			this._start_drag();

			designform.init_guideline_snap_info(this._drag_guideline_pos, this._drag_guideline_hori);

			designform.startDrag();

			if (this._drag_guideline_pos != null) {
				this.add_guideline(this._drag_guideline_pos, this._drag_guideline_hori);
				designform.movedGuideline();
			}

			this._drag_guideline_pos = null;
			this._drag_guideline_hori = null;

			this._end_drag();

			designform.drawWindow(false);

			return true;
		}
		else {
			if (this.check_cursor(x, y)) {
				designform.redrawRuler();
				return true;
			}
		}

		return false;
	};

	_pRulerLayer.execDrawFront = function (hDC) {
		if (!nexacro._design_option_show_ruler) {
			return;
		}

		var designform = this.target;
		designform.drawRuler(hDC, nexacro._design_option_measure_type, nexacro._design_option_show_mousepos);

		if (nexacro._design_option_show_guideline) {
			designform.drawGuideLine(hDC, this._guideline_h.join(','), this._guideline_v.join(','));

			if (this._drag_guideline_pos != null && this._drag_guideline_hori != null) {
				designform.drawMoveGuideLine(hDC, this._drag_guideline_pos, this._drag_guideline_hori, this._is_dragging());

				var draw_info = designform._snap_manager._make_guideline_draw_info();
				designform.drawMoveRect(hDC, draw_info);
			}
		}
	};

	delete _pRulerLayer;

	nexacro.EditorLayer = function (target) {
		nexacro.DesignLayer.call(this, target);

		this._layer_index = 3;
	};

	var _pEditorLayer = nexacro._createPrototype(nexacro.DesignLayer, nexacro.EditorLayer);
	nexacro.EditorLayer.prototype = _pEditorLayer;

	delete _pEditorLayer;


	_pDesignForm.init = function () {
		this._real_root_left = 10;
		this._real_root_top = 10;
		this._root_left = 30;
		this._root_top = 30;

		this._cursor_type = nexacro._mouse_cursor_none;
		this._move_info = new nexacro.MoveInfo();

		this._layer_count = 4;
		this._layer_list = [];

		this._track_layer_index = 0;
		this._track_layer = new nexacro.TrackerLayer(this);
		this._layer_list.push(this._track_layer);

		this._info_layer_index = 1;
		this._info_layer = new nexacro.InfoLayer(this);
		this._layer_list.push(this._info_layer);

		this._ruler_layer_index = 2;
		this._ruler_layer = new nexacro.RulerLayer(this);
		this._layer_list.push(this._ruler_layer);

		this._editor_layer_index = 3;
		this._editor_layer = new nexacro.EditorLayer(this);
		this._layer_list.push(this._editor_layer);

		this._dragging_layer = -1;

		this._selected_components = new nexacro.Collection();
		this._selected_components.get_component_list = function () {
			var comp_list = "";
			var count = this.length;
			if (count > 0) {
				comp_list += this.get_id(0);

				for (var i = 1; i < count; i++) {
					comp_list += ",";
					comp_list += this.get_id(i);
				}
			}

			return comp_list;
		};

		this._selected_components.get_pivot = function () {
			if (this.length > 0) {
				var comp = this.get_item(this.length - 1);
				return comp;
			}

			return null;
		};

		this._show_taborder_info = false;
		this._show_bind_info = false;

		this._snap_manager = new nexacro.SnapManager(this);
	};




	_pDesignForm.onLButtonDown = function (x, y) {
		for (var i = this._layer_count - 1; i >= 0; i--) {
			var layer = this._layer_list[i];
			if (layer && layer.execLButtonDown) {
				if (layer.execLButtonDown(x, y)) {
					this._move_info.start(layer._layer_index, x, y);
					break;
				}
			}
		}
	};

	_pDesignForm.onLButtonUp = function (x, y) {
		for (var i = this._layer_count - 1; i >= 0; i--) {
			var layer = this._layer_list[i];
			if (layer && layer.execLButtonUp) {
				if (layer.execLButtonUp(x, y)) {
					break;
				}
			}
		}

		this._move_info.clear();
	};

	_pDesignForm.onLButtonDblClk = function (x, y) {
		for (var i = this._layer_count - 1; i >= 0; i--) {
			var layer = this._layer_list[i];
			if (layer && layer.execLButtonDblClk) {
				if (layer.execLButtonDblClk(x, y)) {
					break;
				}
			}
		}
	};

	_pDesignForm.onRButtonDown = function (x, y) {
		for (var i = this._layer_count - 1; i >= 0; i--) {
			var layer = this._layer_list[i];
			if (layer && layer.execRButtonDown) {
				if (layer.execRButtonDown(x, y)) {
					break;
				}
			}
		}
	};

	_pDesignForm.onMouseMove = function (x, y) {
		this._move_info.move(x, y);
		if (this._dragging_layer >= 0) {
			var layer = this._layer_list[this._dragging_layer];
			if (layer && layer.execMouseMove) {
				layer.execMouseMove(x, y);
			}
			return;
		}

		for (var i = this._layer_count - 1; i >= 0; i--) {
			var layer = this._layer_list[i];
			if (layer && layer.execMouseMove) {
				if (layer.execMouseMove(x, y)) {
					break;
				}
			}
		}
	};

	_pDesignForm.onMouseWheel = function (flag) {
	};

	_pDesignForm.onKeyDown = function (key) {
		for (var i = this._layer_count - 1; i >= 0; i--) {
			var layer = this._layer_list[i];
			if (layer && layer.execKeyDown) {
				if (layer.execKeyDown(key)) {
					break;
				}
			}
		}
	};

	_pDesignForm.onChar = function (key) {
		for (var i = this._layer_count - 1; i >= 0; i--) {
			var layer = this._layer_list[i];
			if (layer && layer.execChar) {
				if (layer.execChar(key)) {
					break;
				}
			}
		}
	};

	_pDesignForm.onDrawBack = function (hDC) {
		for (var i = 0; i < this._layer_count; i++) {
			var layer = this._layer_list[i];
			if (layer && layer.execDrawBack) {
				layer.execDrawBack(hDC);
			}
		}
	};

	_pDesignForm.onDrawFront = function (hDC) {
		for (var i = 0; i < this._layer_count; i++) {
			var layer = this._layer_list[i];
			if (layer && layer.execDrawFront) {
				layer.execDrawFront(hDC);
			}
		}
	};

	_pDesignForm.onSetCursor = function () {
	};

	_pDesignForm.set_cursor = function (v) {
		if (this._cursor_type != v) {
			this._cursor_type = v;

			if (this._cursor_type == nexacro._mouse_cursor_create_component) {
				if (this.set_cursor_by_component()) {
					return true;
				}
			}

			var win = this._getWindow();
			if (win && win.handle) {
				return nexacro.__setCursorType(win.handle, this._cursor_type);
			}
		}

		return false;
	};

	_pDesignForm.set_cursor_by_component = function () {
		return nexacro.__setCursorByComponent();
	};

	_pDesignForm.get_cursor_type = function () {
		if (nexacro._design_mode == nexacro._design_mode_form_move) {
			return nexacro._mouse_cursor_form_move;
		}
		else if (nexacro._design_mode == nexacro._design_mode_select) {
			return this._cursor_type;
		}
		else {
			return nexacro._mouse_cursor_create_component;
		}
	};

	_pDesignForm.loadGuideLine = function (guideline_h, guideline_v) {
		this._ruler_layer.load_guideline(guideline_h, guideline_v);
	};

	_pDesignForm.saveGuideLine = function () {
		return this._ruler_layer.save_guideline();
	};

	_pDesignForm.selectAll = function () {
		var selected_components = this._selected_components;
		selected_components.clear();

		this._selectChilds(this.get_root_obj());

		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__selectedComponents(win.handle, selected_components.get_component_list());
		}
	};

	_pDesignForm._selectChilds = function (obj) {
		var selected_components = this._selected_components;

		var components = this._getChilds(obj);
		if (components && components.length > 0) {
			var count = components.length;
			for (var i = 0; i < count; i++) {
				var comp = components[i];
				selected_components.add(this._getScopeName(comp), comp);

				this._selectChilds(comp);
			}
		}
	};

	_pDesignForm.selectComponent = function (compid) {
		var root_obj_id = this._getScopeName(this.get_root_obj());
		var selected_components = this._selected_components;

		selected_components.clear();

		if (compid != "this" && compid != "" && compid != root_obj_id) {
			var obj = this._getObject(compid);
			selected_components.add(compid, obj);
		}

		var win = this._getWindow();
		if (win && win._handle) {
			nexacro.__selectedComponents(win._handle, selected_components.get_component_list());
		}
	};

	_pDesignForm.selectComponents = function (comp_list, c) {
		var root_obj_id = this._getScopeName(this.get_root_obj());
		var selected_components = this._selected_components;
		if (comp_list == "this" || comp_list == "" || comp_list == root_obj_id) {
			selected_components.clear();
		}
		else {
			var comps = comp_list.split(',');
			if (comps[comps.length - 1] == "") {
				comps.pop();
			}

			if (nexacro.__ctrlkey || (nexacro.__IsSHIFTpressed() && c)) {
				var count = comps.length;
				for (var i = 0; i < count; i++) {
					var compid = comps[i];
					if (selected_components.indexOf(compid) >= 0) {
						selected_components.remove(compid);
					}
					else {
						var obj = this._getObject(compid);
						selected_components.add(compid, obj);
					}
				}
			}
			else if (nexacro.__IsSHIFTpressed()) {
				var count = comps.length;
				for (var i = 0; i < count; i++) {
					var compid = comps[i];
					if (selected_components.indexOf(compid) >= 0) {
						selected_components.remove(compid);
					}

					var obj = this._getObject(compid);
					selected_components.add(compid, obj);
				}
			}
			else if (c) {
				selected_components.clear();

				var count = comps.length;
				for (var i = 0; i < count; i++) {
					var compid = comps[i];
					var obj = this._getObject(compid);
					selected_components.add(compid, obj);
				}
			}
			else {
				var compid = comps[0];

				if (selected_components.indexOf(compid) >= 0) {
					selected_components.remove(compid);
					var obj = this._getObject(compid);
					selected_components.add(compid, obj);
				}
				else {
					selected_components.clear();
					var obj = this._getObject(compid);
					selected_components.add(compid, obj);
				}
			}
		}

		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__selectedComponents(win.handle, selected_components.get_component_list());
		}
	};

	_pDesignForm.deleteComponents = function (comp_list) {
		if (comp_list && comp_list.length > 0) {
			var comps = comp_list.split(',');
			var count = comps.length;
			for (var i = 0; i < count; i++) {
				this.deleteObject(comps[i]);
			}
		}

		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__deletedComponents(win.handle, comp_list);
		}
	};

	_pDesignForm.createdComponents = function (comp_list) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__createdComponents(win.handle, comp_list);
		}
	};

	_pDesignForm.movedComponents = function (comp_list) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__movedComponents(win.handle, comp_list);
		}
	};

	_pDesignForm.movedGuideline = function () {
		var comp_list = this._snap_manager.moved_guideline();
		this.drawWindow(true);

		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__movedComponents(win.handle, comp_list);
		}
	};

	_pDesignForm.defaultAction = function (comp) {
		if (comp instanceof nexacro.Div) {
			redraw_realform = true;
			this.startSubLayoutEdit(comp);
			this.selectComponents("", true);
		}
		else {
		}
	};

	_pDesignForm.startSubLayoutEdit = function (comp) {
		var cur_layout_name = comp._current_layout_name ? comp._current_layout_name : "";
		if (this._showSubLayout(comp, true)) {
			this._setAutoLayoutChange(comp, false);

			var win = this._getWindow();
			if (win && win.handle) {
				nexacro.__startSubLayoutEdit(win.handle, this._getScopeName(comp), cur_layout_name);
			}

			this.drawWindow(true);
		}
	};

	_pDesignForm.endSubLayoutEdit = function (bApplySize) {
		var comp = this._active_editing_form;
		if (this._showSubLayout(comp, false)) {
			this._setAutoLayoutChange(comp, true);

			var win = this._getWindow();
			if (win && win.handle) {
				nexacro.__endSubLayoutEdit(win.handle, bApplySize);
			}

			this.drawWindow(true);
		}
	};

	_pDesignForm.cancelSubLayoutEdit = function () {
		var comp = this._active_editing_form;
		trace("_pDesignForm.cancelSubLayoutEdit : " + comp);
		if (this._showSubLayout(comp, false)) {
			this._setAutoLayoutChange(comp, true);

			var win = this._getWindow();
			if (win && win.handle) {
				nexacro.__cancelSubLayoutEdit(win.handle);
			}

			this.drawWindow(true);
		}
	};

	_pDesignForm.clear_snap_point = function () {
		this._snap_manager.clear_snap_point();
	};

	_pDesignForm.snap = function (rect, cursor_type) {
		var left = parseInt(rect[0]);
		var top = parseInt(rect[1]);
		var width = parseInt(rect[2]);
		var height = parseInt(rect[3]);

		var _rect = {
			"left" : left, 
			"top" : top, 
			"width" : width, 
			"height" : height, 
			"right" : left + width, 
			"bottom" : top + height
		};

		this._snap_manager.snap(_rect, cursor_type);
	};

	_pDesignForm.snap_guideline = function (pos, hori) {
		var snap_manager = this._snap_manager;
		var dist = snap_manager.snap_guideline(pos, hori);

		snap_manager.move_guideline(pos + dist);

		return dist;
	};

	_pDesignForm.get_snap_point = function () {
		return this._snap_manager.get_snap_point();
	};

	_pDesignForm.init_snap_info = function () {
		var snap_manager = this._snap_manager;

		snap_manager.clear();

		if (nexacro._design_option_snap_component) {
			snap_manager.add_base_info();
		}

		if (nexacro._design_option_show_ruler && nexacro._design_option_show_guideline) {
			snap_manager.add_guideline_info();
		}

		if (this._dot_visible && nexacro._design_option_snap_dot) {
			snap_manager.add_dot_info();
		}

		snap_manager.sort();
	};

	_pDesignForm.is_need_snap = function (v) {
		if (((this._dot_visible && nexacro._design_option_snap_dot) || 
			nexacro._design_option_snap_component || 
			this._ruler_layer.is_use_guideline()) && 
			v >= 0 && v < 9) {
			return true;
		}

		return false;
	};

	_pDesignForm.init_guideline_snap_info = function (pos, hori) {
		var snap_manager = this._snap_manager;

		snap_manager.clear();

		var rootobj = this.get_root_obj();
		var stepcount = this.get_step_count();
		var rect = this._getComponentRect(rootobj, true);
		var stepwidth = parseInt(rect[2]);

		snap_manager.add_components_info_for_guideline(rootobj, pos, hori, stepcount, stepwidth);

		snap_manager.sort();
	};

	_pDesignForm.drawWindow = function (realform) {
		var win = this._getWindow();
		if (win && win.handle) {
			if (realform) {
				nexacro.__refreshDirtyRectWithCallBack(win.handle, this.drawWindowCallBack);
			}
			else {
				nexacro.__redrawForm(win.handle);
			}
		}
	};

	_pDesignForm.redrawRuler = function () {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__redrawRuler(win.handle);
		}
	};

	_pDesignForm.startDrag = function () {
		var win = this._getWindow();
		if (win && win.handle) {
			return nexacro.__startDrag(win.handle, this._click_x, this._click_y);
		}

		return false;
	};

	_pDesignForm.draw_tracker_base = function (hDC, l, t, r, b) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawTrackerBase(win.handle, hDC, l, t, r, b);
		}
	};

	_pDesignForm.draw_tracker = function (hDC, trackers) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawTracker(win.handle, hDC, trackers);
		}
	};

	_pDesignForm.drawSelectRect = function (hDC, l, t, r, b) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawSelectRect(win.handle, hDC, l, t, r, b);
		}
	};

	_pDesignForm.drawMoveRect = function (hDC, info) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawMoveRect(win.handle, hDC, info);
		}
	};

	_pDesignForm.drawResizeRect = function (hDC, info) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawResizeRect(win.handle, hDC, info);
		}
	};

	_pDesignForm.drawSnapGuide = function (hDC, info) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawSnapGuide(win.handle, hDC, info);
		}
	};


	_pDesignForm.drawPreSelectRect = function (hDC, info) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawPreSelectRect(win.handle, hDC, info);
		}
	};

	_pDesignForm.drawRuler = function (hDC, measure_type, mousepos) {
		var win = this._getWindow();

		if (win && win.handle) {
			nexacro.__drawRuler(win.handle, hDC, measure_type, mousepos);
		}
	};

	_pDesignForm.drawGuideLine = function (hDC, h, v) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawGuideLine(win.handle, hDC, h, v);
		}
	};

	_pDesignForm.drawMoveGuideLine = function (hDC, pos, hori, tooltip) {
		var win = this._getWindow();
		if (win && win.handle) {
			nexacro.__drawMoveGuideLine(win.handle, hDC, pos, hori, tooltip);
		}
	};

	_pDesignForm.drawTaborderInfo = function (hDC, info) {
		nexacro.__drawTaborderInfo(hDC, info);
	};

	_pDesignForm.drawBindInfo = function (hDC, info) {
		nexacro.__drawBindInfo(hDC, info);
	};

	_pDesignForm.drawBindInfoTooltip = function (hDC, info, x, y) {
		nexacro.__drawBindInfoTooltip(hDC, info, x, y);
	};


	_pDesignForm.checkParent = function (x, y, rootcompid) {
		var rootobj = this._getObject(rootcompid);
		if (rootobj) {
			var stepcount = 0;
			var stepwidt = 0;
			var mlm = nexacro._getLayoutManager();
			var layout = mlm.getCurrentLayout(rootobj);
			if (layout) {
				stepcount = layout.stepcount ? layout.stepcount : 0;

				stepwidth = rootobj._adjust_width;
				var scale = this._getZoom() / 100;
				stepwidth *= scale;
				stepwidth = parseInt(stepwidth);
			}

			var comps = this._getChilds(rootobj);
			var comp_len = comps ? comps.length : 0;

			for (var i = comp_len - 1; i >= 0; i--) {
				var comp = comps[i];
				if (!comp) {
					continue;
				}

				if (!(comp instanceof nexacro.Div)) {
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
						return rootcompid;
					}

					var childs = this._getChilds(comp);
					var child_len = childs ? childs.length : 0;
					if (child_len > 0) {
						return this.checkParent(_x, _y, this._getScopeName(comp));
					}
					else {
						return this._getScopeName(comp);
					}
				}
			}
		}

		return rootcompid;
	};


	_pDesignForm.GetBaseRect = function (apply_border, scale) {
		var root_obj = this.get_root_obj();
		var rect = this._getComponentRect(root_obj, true);

		var _adjust_left = parseInt(rect[0]);
		var _adjust_top = parseInt(rect[1]);
		var _adjust_right = _adjust_left + parseInt(rect[2]);
		var _adjust_bottom = _adjust_top + parseInt(rect[3]);

		if (apply_border) {
			var border_width = this._getBorderWidth(root_obj);
			if (border_width > 0) {
				if (root_obj == this._inner_form) {
					_adjust_right -= (border_width * 2);
					_adjust_bottom -= (border_width * 2);
				}
				else {
					_adjust_left += border_width;
					_adjust_top += border_width;
					_adjust_right -= border_width;
					_adjust_bottom -= border_width;
				}
			}
		}

		if (scale) {
			var scale = this._getZoom() / 100;

			if (scale != 1) {
				_adjust_left *= scale;
				_adjust_top *= scale;
				_adjust_right *= scale;
				_adjust_bottom *= scale;

				_adjust_left = parseInt(_adjust_left);
				_adjust_top = parseInt(_adjust_top);
				_adjust_right = parseInt(_adjust_right);
				_adjust_bottom = parseInt(_adjust_bottom);
			}
		}

		return [_adjust_left, _adjust_top, _adjust_right, _adjust_bottom];
	};


	_pDesignForm.getStartPos = function (parent) {
		if (!parent) {
			parent = this.get_root_obj();
		}
		else if (!(parent instanceof nexacro.Component)) {
			parent = this._getObject(parent);
		}

		var rect = this._getClientRect(parent);

		var border_width = this._getBorderWidth(parent);

		return {
			"x" : parseInt(rect[0]) + border_width, 
			"y" : parseInt(rect[1]) + border_width
		};
	};

	_pDesignForm.clientToForm = function (pos, hori, parent) {
		var pt = this.getStartPos(parent);
		if (hori) {
			pos -= pt.x;
		}
		else {
			pos -= pt.y;
		}

		pos /= this.getScale();

		return pos;
	};

	_pDesignForm.formToClient = function (pos, hori, parent) {
		pos *= this.getScale();

		var pt = this.getStartPos(parent);
		if (hori) {
			pos += pt.x;
		}
		else {
			pos += pt.y;
		}

		return pos;
	};

	_pDesignForm.rootToParent = function (pos, hori, parent) {
		if (!parent) {
			return pos;
		}
		else if (!(parent instanceof nexacro.Component)) {
			parent = this._getObject(parent);
		}

		if (parent == this.get_root_obj()) {
			return pos;
		}

		var rect = this._getComponentRect(parent, true);
		trace("_pDesignForm.rootToParent 1 : " + pos);
		var border_width = this._getBorderWidth(parent);
		if (hori) {
			pos -= (parseInt(rect[0]) + parseInt(border_width));
		}
		else {
			pos -= (parseInt(rect[1]) + parseInt(border_width));
		}

		trace("_pDesignForm.rootToParent 2 : " + pos);
		return pos;
	};

	_pDesignForm.changedOptMeasure = function (opt) {
		nexacro.setMeasureType(opt);
		nexacro.__changedOptMeasure(opt);
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

		delete this._move_info;
		for (var i = this._layer_count - 1; i >= 0; i--) {
			var layer = this._layer_list[i];
			if (layer.destroy) {
				layer.destroy();
			}

			delete layer;
		}

		this._layer_list = [];
		this._selected_components.clear();

		this._snap_manager.destroy();
		delete this._snap_manager;

		nexacro.Form.prototype.destroy.call(this);
	};



	_pDesignForm.setRoot = function (left, top) {
		var ruler_width = this._ruler_layer.get_ruler_width();
		this._real_root_left = left;
		this._real_root_top = top;

		if (this._real_root_left < 10) {
			this._real_root_left = 10;
		}
		if (this._real_root_top < 10) {
			this._real_root_top = 10;
		}

		this._root_left = this._real_root_left + ruler_width;
		this._root_top = this._real_root_top + ruler_width;

		this._recalcDesignLayout();
	};

	_pDesignForm.moveRoot = function (left, top, set) {
		var ruler_width = this._ruler_layer.get_ruler_width();

		var root_left = this._real_root_left + left;
		var root_top = this._real_root_top + top;

		if (root_left < 10) {
			root_left = 10;
		}
		if (root_top < 10) {
			root_top = 10;
		}

		this._root_left = root_left + ruler_width;
		this._root_top = root_top + ruler_width;

		if (set) {
			this._real_root_left = root_left;
			this._real_root_top = root_top;
		}

		this._recalcDesignLayout();
	};

	_pDesignForm.showTaborderInfo = function (visible) {
		if (this._show_taborder_info == visible) {
			return;
		}

		this._show_taborder_info = visible;

		this.drawWindow(false);
	};

	_pDesignForm.showBindInfo = function (visible) {
		if (this._show_bind_info == visible) {
			return;
		}

		this._show_bind_info = visible;

		this.drawWindow(false);
	};

	_pDesignForm.setBindInfo = function (info) {
		this._info_layer.setBindInfo(info);

		this.drawWindow(false);
	};

	_pDesignForm.deleteAllComponents = function () {
		var form = this._inner_form;
		var components = form.components;
		len = components.length;

		for (var i = len - 1; i >= 0; i--) {
			var comp = components[i];
			if (comp) {
				form.removeChild(comp.id);
				if (comp.destroy) {
					comp._destroy();
				}
			}
		}

		this.components.clear();
	};

	_pDesignForm.deleteAllInvObjects = function () {
		var form = this._inner_form;
		var objects = form.objects;
		len = objects.length;

		for (var i = len - 1; i >= 0; i--) {
			var obj = objects[i];
			if (obj) {
				form.removeChild(obj.id);
				if (obj.destroy) {
					obj.destroy();
				}

				delete obj;
			}
		}

		this.objects.clear();
	};

	_pDesignForm.deleteAllObjects = function () {
		var form = this._inner_form;

		var components = form.components;
		len = components.length;
		for (var i = len - 1; i >= 0; i--) {
			var comp = components[i];
			if (comp) {
				form.removeChild(comp.id);
				if (comp.destroy) {
					comp._destroy();
				}
			}
		}

		var objects = form.objects;
		len = objects.length;
		for (var i = len - 1; i >= 0; i++) {
			var obj = objects[i];
			if (obj) {
				form.removeChild(obj.id);
				if (obj.destroy) {
					obj.destroy();
				}

				delete obj;
			}
		}

		this.all.clear();
		this.components.clear();
		this.objects.clear();
	};


	_pApplicationAccessPort.setDotSize = function (size) {
		var form_aps = this._formaccessport;
		var len = form_aps.length;
		for (var i = 0; i < len; i++) {
			var form_ap = form_aps[i].accessport;
			form_ap.setDotSize(nexacro._design_option_measure_type, size);
		}
	};


	_pFormAccessPort.onLButtonDown = function (x, y) {
		this.target.onLButtonDown(x, y);
	};

	_pFormAccessPort.onLButtonUp = function (x, y) {
		this.target.onLButtonUp(x, y);
	};

	_pFormAccessPort.onLButtonDblClk = function (x, y) {
		this.target.onLButtonDblClk(x, y);
	};

	_pFormAccessPort.onRButtonDown = function (x, y) {
		this.target.onRButtonDown(x, y);
	};

	_pFormAccessPort.onMouseMove = function (x, y) {
		this.target.onMouseMove(x, y);
	};

	_pFormAccessPort.onMouseWheel = function (flag) {
		this.target.onMouseWheel(flag);
	};

	_pFormAccessPort.onKeyDown = function (char) {
		this.target.onKeyDown(char);
	};

	_pFormAccessPort.onChar = function (char) {
		this.target.onChar(char);
	};

	_pFormAccessPort.onDrawBack = function (hDC) {
		this.target.onDrawBack(hDC);
	};

	_pFormAccessPort.onDrawFront = function (hDC) {
		this.target.onDrawFront(hDC);
	};

	_pFormAccessPort.onSetCursor = function (hDC) {
		this.target.onSetCursor(hDC);
	};

	_pFormAccessPort.loadGuideLine = function (guideline_h, guideline_v) {
		this.target.loadGuideLine(guideline_h, guideline_v);
	};

	_pFormAccessPort.saveGuideLine = function () {
		return this.target.saveGuideLine();
	};

	_pFormAccessPort.drawWindow = function (realform) {
		return this.target.drawWindow(realform);
	};

	_pFormAccessPort.GetBaseRect = function (apply_border, scale) {
		return this.target.GetBaseRect(apply_border, scale);
	};

	_pFormAccessPort.setDotSize = function (size) {
		this.target.setDotSize(nexacro._design_option_measure_type, size);
	};

	_pFormAccessPort.showTaborderInfo = function (visible) {
		return this.target.showTaborderInfo(visible);
	};

	_pFormAccessPort.showBindInfo = function (visible) {
		return this.target.showBindInfo(visible);
	};

	_pFormAccessPort.setBindInfo = function (visible) {
		return this.target.setBindInfo(visible);
	};

	_pFormAccessPort.selectComponents = function (comps_list) {
		this.target.selectComponents(comps_list, true);
		this.target.drawWindow(false);
	};

	_pFormAccessPort.deleteAllComponents = function () {
		this.target.deleteAllComponents();
	};

	_pFormAccessPort.deleteAllInvObjects = function () {
		this.target.deleteAllInvObjects();
	};

	_pFormAccessPort.deleteAllObjects = function () {
		this.target.deleteAllObjects();
	};
}

