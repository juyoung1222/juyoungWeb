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

if (!nexacro.Grid) {
	nexacro.GridLongPressEventInfo = function (obj, id, pointinfos, from_comp, from_refer_comp, cell, col, row, subrow, pivotindex, mergecell, mergecol, mergerow) {
		nexacro.LongPressEventInfo.call(this, obj, id, pointinfos, from_comp, from_refer_comp);

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
		this.mergecell = mergecell;
		this.mergecol = mergecol;
		this.mergerow = mergerow;
	};
	var _pGridLongPressEventInfo = nexacro._createPrototype(nexacro.LongPressEventInfo, nexacro.GridLongPressEventInfo);
	nexacro.GridLongPressEventInfo.prototype = _pGridLongPressEventInfo;
	_pGridLongPressEventInfo._type_name = "GridLongPressEventInfo";
	delete _pGridLongPressEventInfo;

	nexacro.GridDragEventInfo = function (obj, id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow) {
		nexacro.DragEventInfo.call(this, obj, id || "ongriddrag", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
		this.mergecell = mergecell;
		this.mergecol = mergecol;
		this.mergerow = mergerow;
	};
	var _pGridDragEventInfo = nexacro._createPrototype(nexacro.DragEventInfo, nexacro.GridDragEventInfo);
	nexacro.GridDragEventInfo.prototype = _pGridDragEventInfo;
	_pGridDragEventInfo._type_name = "GridDragEventInfo";

	delete _pGridDragEventInfo;

	nexacro.GridClickEventInfo = function (obj, id, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ClickEventInfo.call(this, obj, id || "ongridclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		this.cell = afterCell;
		this.col = afterCol;
		this.row = afterRow;
		this.subrow = afterSubrow;
		this.pivotindex = afterPvt;
		this.oldcell = beforeCell;
		this.oldcol = beforeCol;
		this.oldrow = beforeRow;
		this.oldsubrow = beforeSubrow;
		this.oldpivotindex = beforePvt;
	};
	var _pGridClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.GridClickEventInfo);
	nexacro.GridClickEventInfo.prototype = _pGridClickEventInfo;
	_pGridClickEventInfo._type_name = "GridClickEventInfo";
	_pGridClickEventInfo._is_event = true;
	delete _pGridClickEventInfo;

	nexacro.GridEditEventInfo = function (obj, id, cell, col, pivotindex, row, subrow, value) {
		this.id = this.eventid = id || "ongridedit";
		this.fromobject = this.fromreferenceobject = obj;
		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
		this.value = value;
	};
	var _pGridEditEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridEditEventInfo);
	nexacro.GridEditEventInfo.prototype = _pGridEditEventInfo;
	_pGridEditEventInfo._type_name = "GridEditEventInfo";

	delete _pGridEditEventInfo;

	nexacro.GridInputEventInfo = function (obj, cell, col, row, subrow, pivotindex, id) {
		this.id = this.eventid = id || "oninput";
		this.fromobject = this.fromreferenceobject = obj;
		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
	};
	var _pGridInputEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridInputEventInfo);
	nexacro.GridInputEventInfo.prototype = _pGridInputEventInfo;
	_pGridInputEventInfo._type_name = "GridInputEventInfo";

	delete _pGridInputEventInfo;

	nexacro.GridFormatChangedEventInfo = function (obj, id, newvalue, oldvalue, reason) {
		this.id = this.eventid = id || "ongridformatchanged";
		this.fromobject = this.fromreferenceobject = obj;
		this.newvalue = newvalue;
		this.oldvalue = oldvalue;
		this.reason = reason;
	};
	var _pGridFormatChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridFormatChangedEventInfo);
	nexacro.GridFormatChangedEventInfo.prototype = _pGridFormatChangedEventInfo;
	_pGridFormatChangedEventInfo._type_name = "GridFormatChangedEventInfo";

	delete _pGridFormatChangedEventInfo;

	nexacro.GridSelectEventInfo = function (obj, id, cell, col, row, subrow, pivotindex, oldcell, oldcol, oldrow, oldsubrow, oldpivotindex, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow) {
		this.id = this.eventid = id || "ongridselect";
		this.fromobject = this.fromreferenceobject = obj;

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;

		this.oldcell = oldcell;
		this.oldcol = oldcol;
		this.oldrow = oldrow;
		this.oldpivotindex = oldpivotindex;
		this.oldsubrow = oldsubrow;

		this.selectendcol = selectendcol;
		this.selectendpivot = selectendpivot;
		this.selectendrow = selectendrow;
		this.selectendsubrow = selectendsubrow;

		this.selectstartcol = selectstartcol;
		this.selectstartpivot = selectstartpivot;
		this.selectstartrow = selectstartrow;
		this.selectstartsubrow = selectstartsubrow;
	};
	var _pGridSelectEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridSelectEventInfo);
	nexacro.GridSelectEventInfo.prototype = _pGridSelectEventInfo;
	_pGridSelectEventInfo._type_name = "GridSelectEventInfo";

	delete _pGridSelectEventInfo;

	nexacro.GridTreeStatusEventInfo = function (obj, id, cell, realrow, row, reason) {
		this.id = this.eventid = id || "ongridtreestatus";
		this.fromobject = this.fromreferenceobject = obj;
		this.cell = cell;
		this.realrow = realrow;
		this.row = row;
		this.reason = reason;
	};
	var _pGridTreeStatusEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridTreeStatusEventInfo);
	nexacro.GridTreeStatusEventInfo.prototype = _pGridTreeStatusEventInfo;
	_pGridTreeStatusEventInfo._type_name = "GridTreeStatusEventInfo";

	delete _pGridTreeStatusEventInfo;

	nexacro.GridMouseEventInfo = function (obj, id, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.MouseEventInfo.call(this, obj, id || "ongridmouse", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		this.cell = cell;
		this.col = col;
		this.mergecell = mergecell;
		this.mergecol = mergecol;
		this.mergerow = mergerow;
		this.pivotindex = pivotindex;
		this.row = row;
		this.subrow = subrow;
	};
	var _pGridMouseEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.GridMouseEventInfo);
	nexacro.GridMouseEventInfo.prototype = _pGridMouseEventInfo;
	_pGridMouseEventInfo._type_name = "GridMouseEventInfo";

	delete _pGridMouseEventInfo;

	nexacro.GridSizeChangedEventInfo = function (obj, id, formatindex, index, newvalue, oldvalue, reason, subindex) {
		this.id = this.eventid = id || "ongridsizechanged";
		this.fromobject = this.fromreferenceobject = obj;
		this.eventid = id;
		this.formatindex = formatindex;
		this.index = index;
		this.newvalue = newvalue;
		this.oldvalue = oldvalue;
		this.reason = reason;
		this.subindex = subindex;
	};

	var _pGridSizeChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridSizeChangedEventInfo);
	nexacro.GridSizeChangedEventInfo.prototype = _pGridSizeChangedEventInfo;
	_pGridSizeChangedEventInfo._type_name = "GridSizeChangedEventInfo";

	delete _pGridSizeChangedEventInfo;

	nexacro._GridCellControl = function (id, left, top, width, height, right, bottom, parent, refinfo, rowidx, cellidx) {
		this._grid = refinfo ? refinfo._grid : null;

		nexacro._CellControl.call(this, id, left, top, width, height, right, bottom, parent, refinfo, cellidx, this._grid, rowidx);

		if (parent) {
			this._band = parent._band;
		}
		else {
			this._band = null;
		}

		this._clickcall = false;
		this._is_clickproc = false;
		this._refresh_display = false;

		this._cellExpandObj = "_GridExpandControl";
		this._cellButtonObj = "_GridButtonControl";
		this._cellCheckBoxObj = "_GridCheckboxControl";
		this._cellImageObj = "_GridImageControl";
		this._cellComboObj = "_GridComboControl";
		this._cellCalendarObj = "_GridCalendarControl";
		this._cellEditObj = "_GridEditControl";
		this._cellTextAreaObj = "_GridTextAreaControl";
		this._cellProgressBarObj = "_GridProgressBarControl";
		this._cellMaskEditObj = "_GridMaskEditControl";
		this._cellTreeObj = "_CellTreeItemControl";

		if (nexacro._enableaccessibility && refinfo) {
			var dispaytype = refinfo._getDisplaytype(rowidx);
			if (dispaytype == "treeitemcontrol") {
				this._skip_mobile_tabfocus = true;
			}
		}
	};

	var _pGridCell = nexacro._createPrototype(nexacro._CellControl, nexacro._GridCellControl);
	nexacro._GridCellControl.prototype = _pGridCell;
	_pGridCell._is_subcontrol = true;
	_pGridCell._type_name = "GridCellControl";

	_pGridCell._getDataRow = function () {
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		return datarow;
	};

	_pGridCell._isFakeCell = function () {
		var grid = this._grid;
		return grid._isFakeCell(this._rowidx);
	};

	_pGridCell.destroy = function () {
		if (this._grid) {
			if (this._tree_lbuttondown && this._grid) {
				if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
					this._control_element.destroy();
				}

				this._grid._lbuttondown_treecell = this;
				nexacro._OnceCallbackTimer.callonce(this._grid, function () {
					if (this._lbuttondown_treecell) {
						this._lbuttondown_treecell.destroy();
					}
				}, 10);
				return;
			}

			if (this._grid._lbuttondown_treecell == this) {
				this._grid._lbuttondown_treecell = null;
			}
		}
		nexacro.Component.prototype.destroy.call(this);
	};

	_pGridCell.on_destroy_contents = function () {
		nexacro._CellControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
		this._band = null;
	};

	_pGridCell._on_apply_status = function (oldstatus, status, olduserstatus, userstatus, apply, is_userstatus, status_param, value_param) {
		nexacro.Component.prototype._on_apply_status.call(this, oldstatus, status, olduserstatus, userstatus, apply, is_userstatus, status_param, value_param);

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (grid._isFakeCell(datarow)) {
			this._changeStatus("mouseover", false);
			this._changeStatus("focused", false);
			return;
		}
	};

	_pGridCell._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		this._grid._focused_row = this._getDataRow();
		this._grid._focused_cell = this._cellidx;
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
	};

	_pGridCell.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		if (this._getRowControl()._floating) {
			return "enabled";
		}

		return applystatus;
	};

	_pGridCell.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
		if (this._getRowControl()._floating) {
			return "";
		}

		if (changestatus == "blinked" && value) {
			return changestatus;
		}

		return applyuserstatus;
	};

	_pGridCell.on_apply_status = function (status, userstatus, is_userstatus, status_param, value_param) {
		if (!this._rowstatuschange) {
			if (status_param == "mouseover" || status_param == "focused") {
				this._grid._on_apply_cell_status(this, status_param, value_param);
			}
		}
	};

	_pGridCell._getClassCSSSelector = function () {
		var cssarr;
		if (this._getRowControl()._floating) {
			cssarr = nexacro.Component.prototype._getClassCSSSelector.call(this);
		}
		else {
			cssarr = nexacro._CellControl.prototype._getClassCSSSelector.call(this);
		}

		return cssarr;
	};

	_pGridCell._apply_setfocus = function (evt_name, self_flag) {
		nexacro._CellControl.prototype._apply_setfocus.call(this, evt_name, self_flag);

		var control_elem = this._control_element;


		if (evt_name == "lbuttondown") {
			this._grid._focus_proc = control_elem;
		}


		if (nexacro._enableaccessibility) {
			this._grid.currentcell = this._cellidx;
			this._grid._currentBand = this._band.id;
		}
	};

	_pGridCell._on_last_lbuttonup = function () {
		if (this.parent) {
			this.parent._on_last_lbuttonup();
		}
	};

	_pGridCell._on_last_keyup = function () {
		if (this.parent) {
			this.parent._on_last_keyup();
		}
	};

	_pGridCell._on_killfocus = function () {
		if (this._status != "disable") {
			if (this._readonly) {
				this._status = "readonly";
			}
			else {
				this._status = "enable";
			}
		}
		this._setAccessibilityStatFlag(this._status, this._pseudo);
		if (nexacro._enableaccessibility) {
			if (nexacro._OS == "Android" && nexacro._Browser != "Runtime") {
				this._setAccessibilityStatLive(false);
			}
		}
	};

	_pGridCell._getTreeStatus = function () {
		return this._grid.getTreeStatus(this._rowidx);
	};


	_pGridCell.__getAccessibilityMakeAddLabelMiddleClass = function () {
		var tmpLabel = "", grid = this._grid, curCellinfo = this._refinfo, i, n;


		if (curCellinfo._type == "body" || curCellinfo._type == "summary") {
			var headband = grid._headBand;
			var label = "", cells = null, cellinfo = null, leftLabel = "", headLabel = "";

			if (this.parentcell) {
				cells = this.parentcell.parent._cells;
			}
			else {
				cells = this.parent._cells;
			}


			for (i = 0, n = cells.length; i < n; i++) {
				cellinfo = cells[i]._refinfo;

				if (cellinfo._area == "left") {
					label = cells[i]._getAccessibilityLabel(true);
					if (cellinfo._row <= curCellinfo._row && curCellinfo._row <= (cellinfo._row + cellinfo._rowspan - 1)) {
						if (leftLabel) {
							leftLabel += " " + label;
						}
						else {
							leftLabel = label;
						}
					}
				}
				else {
					break;
				}
			}


			if (headband) {
				var rows = headband._get_rows();
				var row_len = rows.length;
				if (rows && row_len) {
					cells = rows[0]._cells;

					for (i = 0, n = cells.length; i < n; i++) {
						cellinfo = cells[i]._refinfo;

						var is_currow = row_len == 1 ? true : cellinfo._row == curCellinfo._row ? true : false;
						if (is_currow && cellinfo._col <= curCellinfo._col && curCellinfo._col <= (cellinfo._colspan + cellinfo._col - 1)) {
							label = cells[i]._getAccessibilityLabel(true);
							if (headLabel) {
								headLabel = headLabel + " " + label;
							}
							else {
								headLabel = label;
							}
						}
					}
				}
			}


			if (curCellinfo._area == "left") {
				if (headLabel) {
					tmpLabel += " " + headLabel;
				}
			}
			else {
				if (grid.accessibilityreadbandlabel) {
					tmpLabel += " " + leftLabel + " " + headLabel;
				}
				else {
					if (leftLabel && grid._beforegridrowpos != grid.currentrow) {
						tmpLabel += " " + leftLabel;
					}

					if (grid._beforegridcolpos != grid.currentcol
						 || (grid._is_first_bodycell && (grid.currentcell == 0 || grid.currentrow == grid.rowcount - 1))) {
						if (headLabel) {
							if (tmpLabel) {
								tmpLabel = tmpLabel + " " + headLabel;
							}
							else {
								tmpLabel = headLabel;
							}
						}
					}
				}
			}
		}

		return tmpLabel;
	};

	_pGridCell._getAccessibilityRoleParentType = function () {
		var cellinfo = this._refinfo;
		var role;

		if (cellinfo._type == "head") {
			role = "columnheader";
		}
		else if (cellinfo._type == "body" && cellinfo._area == "left") {
			role = "rowheader";
		}

		return role;
	};


	_pGridCell._resetScrollPos = function (target_comp, left, top, right, bottom, focus_direction) {
		var grid = this._grid;
		if (grid) {
			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5 && grid._scrollbars == 0) {
				var row = this.parent;
				if (row) {
					row._showfull(this);
					top = row._adjust_top;
				}
				bottom = top + this._adjust_height;
				nexacro.Component.prototype._resetScrollPos.call(this, target_comp, left, top, right, bottom, focus_direction);
			}
		}
	};

	_pGridCell._common_lbuttonup = function (changedtouchinfos, elem, canvasX, canvasY, from_elem) {
		if (changedtouchinfos) {
			var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

			if (touchinfo) {
				elem = touchinfo._elem;
				canvasX = touchinfo.canvasx;
				canvasY = touchinfo.canvasy;
				from_elem = elem;
			}
		}

		if (elem != from_elem) {
			var upelem = this._is_real_upelem = from_elem;
			var grid = this._grid;
			var is_inGridElem = false;

			while (upelem) {
				if (upelem._type_name == "GridCellControl") {
					grid._lastmouseentercell = upelem;
				}
				if (upelem instanceof nexacro.Grid) {
					is_inGridElem = true;
					break;
				}
				upelem = upelem.parent;
			}

			if (!upelem) {
				this._is_real_upelem = upelem;
			}
			if ((nexacro._Browser == "Edge" || nexacro._Browser == "IE") && !is_inGridElem) {
				if (grid._showEditing && canvasX >= 0 && canvasX < this._adjust_width && canvasY >= 0 && canvasY < this._adjust_height) {
					grid._lastmouseentercell = this;
					this._clickcall = true;
				}
			}
		}
		return true;
	};

	_pGridCell._on_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		if (this._common_lbuttonup(changedtouchinfos, null, null, null, null)) {
			nexacro.Component.prototype._on_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp);
		}
	};

	_pGridCell._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem) {
		if (this._common_lbuttonup(null, elem, canvasX, canvasY, from_elem)) {
			nexacro.Component.prototype._on_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem);
		}

		return true;
	};

	_pGridCell._on_dragenter = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		return nexacro.Component.prototype._on_dragenter.call(this, elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pGridCell._common_mouseenter = function (from_comp) {
		if (!this._is_alive) {
			return false;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		if (from_comp != this) {
			if (this.parentcell) {
				grid._mouseovercell = {
					row : this.parentcell._rowidx, 
					cell : this.parentcell._cellidx
				};
				grid._lastmouseentercell = this.parentcell;
			}
			else {
				grid._mouseovercell = {
					row : this._rowidx, 
					cell : this._cellidx
				};
				grid._lastmouseentercell = this;
			}

			return true;
		}
		return true;
	};

	_pGridCell._on_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (this._isSubCell) {
			return nexacro.Component.prototype._on_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
		}
		else if (this._common_mouseenter(from_comp)) {
			return nexacro.Component.prototype._on_mouseenter.call(this._grid._lastmouseentercell, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
		}
	};

	_pGridCell._common_mouseleave = function (to_comp) {
		if (!this._is_alive) {
			return false;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		if (to_comp != this) {
			grid._mouseovercell = null;
			return true;
		}
		return false;
	};

	_pGridCell._on_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (this._isSubCell) {
			return nexacro.Component.prototype._on_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
		}
		else if (this._common_mouseleave(to_comp)) {
			if (!this._grid._lastmouseentercell) {
				this._grid._lastmouseentercell = this;
			}

			return nexacro.Component.prototype._on_mouseleave.call(this._grid._lastmouseentercell, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
		}
	};

	_pGridCell._common_fire_lbuttondown = function (from_comp) {
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		this._is_clickproc = false;
		this._clickcall = false;

		grid._lastmouseentercell = this;

		if (!grid || grid._isFakeCell(datarow)) {
			return false;
		}

		if (this._refinfo._isSubCell) {
			return this.parent._common_fire_lbuttondown(from_comp);
		}

		if (this._band.id == "body") {
			var show = false;
			if ((datarow != grid._selectinfo.curdsrow) || (this._cellidx != grid._selectinfo.curcell)) {
				if (grid.autoenter == "select") {
					show = true;
				}
			}
			else {
				if (!grid._showEditing) {
					show = true;
				}
			}
			if (show) {
				grid._showEditorCell = true;
				grid._showEditRowIdx = datarow;
				grid._showEditCellIdx = this._cellidx;
			}
		}
		else {
			if ((datarow != grid._selectinfo.curdsrow) || (this._cellidx != grid._selectinfo.curcell)) {
				if (grid._showEditing) {
					grid._hideEditor();
				}
			}
		}
	};

	_pGridCell.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown(from_comp);

		var parent = this._grid.parent;
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		var subcomp = from_refer_comp;

		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro._GridCellControl) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, touchinfo.canvasx, touchinfo.canvasy);
			touchinfo.canvasx = canvas[0];
			touchinfo.canvasy = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		if (this._isSubCell) {
			touchinfo.canvasx += this._adjust_left;
			touchinfo.canvasy += this._adjust_top;
			touchinfo.clientx += this._adjust_left;
			touchinfo.clienty += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			var padding = this._getCurrentStylePadding();
			if (padding) {
				touchinfo.canvasx += padding.left;
				touchinfo.canvasy += padding.top;
				touchinfo.clientx += padding.left;
				touchinfo.clienty += padding.top;
			}
		}

		var retn = this._grid.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true);

		var canvas_new = this._grid._getRecalcCanvasXY(from_refer_comp._control_element, touchinfo.canvasx, touchinfo.canvasy);
		touchinfo.canvasx = canvas_new[0];
		touchinfo.canvasy = canvas_new[1];

		var clientXY_new = this._getClientXY(touchinfo.clientx, touchinfo.clienty);
		touchinfo.clientx = clientXY_new[0];
		touchinfo.clienty = clientXY_new[1];

		if (!retn) {
			while (parent) {
				if (parent.on_fire_user_ontouchstart) {
					retn = parent.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
					if (retn) {
						break;
					}
				}
				parent = parent.parent;
			}
		}
		return true;
	};

	_pGridCell.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro._GridCellControl) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		this._common_fire_lbuttondown(from_comp);

		var parent = this._grid.parent;

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			var padding = this._getCurrentStylePadding();
			if (padding) {
				canvasX += padding.left;
				canvasY += padding.top;
				clientX += padding.left;
				clientY += padding.top;
			}
		}

		var retn = this._grid.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true);

		var canvas_new = this._grid._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
		canvasX = canvas_new[0];
		canvasY = canvas_new[1];

		var clientXY_new = this._getClientXY(canvasX, clientY);
		clientX = clientXY_new[0];
		clientY = clientXY_new[1];

		if (!retn) {
			while (parent) {
				if (parent.on_fire_user_onlbuttondown) {
					retn = parent.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
					if (retn) {
						break;
					}
				}
				parent = parent.parent;
			}
		}
		return true;
	};

	_pGridCell._common_fire_lbuttonup = function (touchinfos, changedtouchinfos, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, from_elem) {
		var retn = false;
		var window = this._getWindow();
		var orgcell = this;

		if (this._is_real_upelem) {
			orgcell = window.findComponent(this._is_real_upelem);
		}

		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro._GridCellControl || subcomp instanceof nexacro.Grid) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		if (changedtouchinfos) {
			var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

			if (!touchinfo) {
				return false;
			}

			if (this._isSubCell) {
				touchinfo.canvasx += this._adjust_left;
				touchinfo.canvasy += this._adjust_top;
				touchinfo.clientx += this._adjust_left;
				touchinfo.clienty += this._adjust_top;
			}

			if (this._subComp == obj) {
				var padding = this._getCurrentStylePadding();
				if (padding) {
					touchinfo.canvasx += padding.left;
					touchinfo.canvasy += padding.top;
					touchinfo.clientx += padding.left;
					touchinfo.clienty += padding.top;
				}
			}

			var parent = this._grid.parent;
			retn = this._grid.on_fire_user_ontouchend(touchinfos, changedtouchinfos, orgcell, orgcell, true);

			var canvas_new = this._grid._getRecalcCanvasXY(from_refer_comp._control_element, touchinfo.canvasx, touchinfo.canvasy);
			touchinfo.canvasx = canvas_new[0];
			touchinfo.canvasy = canvas_new[1];

			var clientXY_new = this._getClientXY(touchinfo.clientx, touchinfo.clienty);
			touchinfo.clientx = clientXY_new[0];
			touchinfo.clienty = clientXY_new[1];

			if (!retn) {
				while (parent) {
					if (parent.on_fire_user_ontouchend) {
						retn = parent.on_fire_user_ontouchend(touchinfos, changedtouchinfos, obj, from_refer_comp);
						if (retn) {
							break;
						}
					}
					parent = parent.parent;
				}
			}
		}
		else {
			if (this._isSubCell) {
				canvasX += this._adjust_left;
				canvasY += this._adjust_top;
				clientX += this._adjust_left;
				clientY += this._adjust_top;
			}

			if (this._subComp == obj) {
				var padding = this._getCurrentStylePadding();
				if (padding) {
					canvasX += padding.left;
					canvasY += padding.top;
					clientX += padding.left;
					clientY += padding.top;
				}
			}

			var parent = this._grid.parent;
			retn = this._grid.on_fire_user_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, orgcell, orgcell, from_elem, true);

			var canvas_new = this._grid._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas_new[0];
			canvasY = canvas_new[1];

			var clientXY_new = this._getClientXY(canvasX, clientY);
			clientX = clientXY_new[0];
			clientY = clientXY_new[1];

			if (!retn) {
				while (parent) {
					if (parent.on_fire_user_onlbuttonup) {
						retn = parent.on_fire_user_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, from_elem);
						if (retn) {
							break;
						}
					}
					parent = parent.parent;
				}
			}
		}

		if (!this._is_alive) {
			return true;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var upelem = this._is_real_upelem;
		var alreadyclick = this._is_clickproc;
		var clickcall = this._clickcall;

		this._is_real_upelem = null;
		this._is_clickproc = false;
		this._clickcall = false;

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		var cell = (this.parentcell) ? this.parentcell : this;
		var cellinfo = cell._refinfo;

		if (!alreadyclick) {
			if (grid._lastmouseentercell == cell) {
				if ((datarow == grid._selectinfo.curdsrow) && (cell._cellidx == grid._selectinfo.curcell)) {
					if (grid._showEditing) {
						var editor = grid._currentCellEditor;
						if (editor) {
							if (upelem instanceof nexacro.InputElement) {
								upelem.setElementFocus();

								if (editor.getCaretPos) {
									var selection = editor.getSelect();

									if (selection[0] == selection[1]) {
										var cpos = editor.getCaretPos();
										editor._setFocus(false);

										if (editor.setCaretPos) {
											editor.setCaretPos(cpos);
										}
									}
								}
								else {
									editor._setFocus(false);
								}
							}
							else {
								editor._setFocus(false);
							}
						}

						if (upelem) {
							var check = false;
							var upelemtemp = upelem;

							while (upelemtemp) {
								if (upelemtemp._cellobj == obj) {
									check = true;
									break;
								}
								upelemtemp = upelemtemp.parent;
							}

							if (!check) {
								check = clickcall;
							}

							if (check) {
								cell.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, "", true);
							}
						}
					}
					else {
						if (upelem) {
							var parentcell = (obj.parentcell) ? obj.parentcell : obj;
							var check = false;
							var upelemtemp = upelem;

							while (upelemtemp) {
								if (upelemtemp == parentcell) {
									check = true;
									break;
								}
								upelemtemp = upelemtemp.parent;
							}

							if (check) {
								cell.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, "", true);
							}
						}
					}
				}
			}
		}
	};

	_pGridCell.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttonup(touchinfos, changedtouchinfos, "", false, false, false, -1, -1, -1, -1, -1, -1, from_comp, from_refer_comp, null);
		return true;
	};

	_pGridCell.on_fire_user_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem) {
		this._common_fire_lbuttonup(null, null, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem);
		return true;
	};

	_pGridCell.on_fire_oninput = function () {
		return this._grid.on_fire_oninput();
	};

	_pGridCell.on_fire_ondropdown = function (obj) {
		return this._grid.on_fire_ondropdown(obj);
	};

	_pGridCell.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue) {
		return this._grid.on_fire_oncloseup(obj, pretext, posttext, prevalue, postvalue);
	};

	_pGridCell.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem, logic) {
		if (!logic) {
			var subcomp = from_refer_comp;
			while (subcomp && subcomp instanceof nexacro.Component) {
				if (subcomp instanceof nexacro._GridCellControl) {
					break;
				}

				var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._subComp == subcomp) {
					break;
				}

				subcomp = subcomp.parent;
			}
		}

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			var padding = this._getCurrentStylePadding();

			if (padding) {
				canvasX += padding.left;
				canvasY += padding.top;
				clientX += padding.left;
				clientY += padding.top;
			}
		}

		if (this._band) {
			this._is_clickproc = true;

			if (clickitem == undefined) {
				clickitem = "";
			}

			if (this._grid._scrollpixel == "all") {
				this._showfull(this);
			}
			else {
				this.parent._showfull(this);
			}

			if (this._band.id == "body") {
				this._grid.on_fire_cellclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			else if (this._band.id == "head") {
				this._grid.on_fire_headclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			else if (this._band.id == "summary") {
				this._grid.on_fire_summaryclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}

			this._needToggle("onclick", from_comp);
		}
		return true;
	};

	_pGridCell.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro._GridCellControl) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			var padding = this._getCurrentStylePadding();

			if (padding) {
				canvasX += padding.left;
				canvasY += padding.top;
				clientX += padding.left;
				clientY += padding.top;
			}
		}

		if (this._band) {
			nexacro._fireBeforeDblclick(from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

			if (clickitem == undefined) {
				clickitem = "";
			}
			if (this._band.id == "body") {
				return this._grid.on_fire_celldblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			else if (this._band.id == "head") {
				return this._grid.on_fire_headdblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			else if (this._band.id == "summary") {
				return this._grid.on_fire_summarydblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			if (!this._is_alive) {
				return;
			}
		}
		return true;
	};


	_pGridCell._getFormatSize = function () {
		var cellinfo = this._refinfo;
		var col = cellinfo._col;
		var colspan = cellinfo._colspan;
		var row = cellinfo._row;
		var rowspan = cellinfo._rowspan;
		var format = this._grid._curFormat;

		return format._getFormatCellSize(col, row, colspan, rowspan, this._rowidx, true);
	};

	_pGridCell.__showExpand = function (flag) {
		if (!this._expandCtrl) {
			return;
		}

		if (this._fakecell || this._is_fakemerge) {
			this._expandCtrl.set_visible(false);
			return;
		}

		var grid = this._grid;
		var cellinfo = this._refinfo;
		var datarow = grid._getDataRow(this._rowidx);
		var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, datarow);

		if (expandshow == "show") {
			if (flag == false) {
				if (cellinfo.suppressalign.indexOf("over") > 0) {
					this._expandCtrl.set_visible(true);
				}
				else {
					this._expandCtrl.set_visible(this.selected);
				}
			}
			else {
				this._expandCtrl.set_visible(true);
			}
		}
		else {
			this._expandCtrl.set_visible(false);
		}
	};

	_pGridCell._isUpdateArea = function () {
		if (this._isSubCell || this.id == "tempcell") {
			return true;
		}

		var gridrow = this._getRowControl(), gridrow_elem = gridrow.getElement(), update_left = gridrow_elem.scroll_left, update_right = update_left + this._grid._adjust_width;

		var cellinfo = this._refinfo;
		if (cellinfo._area != "body" || (update_left <= this.getOffsetRight() && update_right >= this._adjust_left)) {
			return true;
		}

		return false;
	};

	_pGridCell._getRemoveLine = function () {
		var grid = this._grid;
		var cellinfo = this._refinfo;
		var remove_l, remove_t, remove_r, remove_b;
		if (this._isSubCell) {
			remove_l = true;
			remove_t = true;
			remove_r = true;
			remove_b = true;
		}
		else if (this._band.id == "summary" && (grid.summarytype != "top" && grid.summarytype != "lefttop")) {
			if (cellinfo._area == "right") {
				remove_l = false;
				remove_t = false;
				remove_r = true;
				remove_b = true;
			}
			else {
				remove_l = true;
				remove_t = false;
				remove_r = false;
				remove_b = true;
			}
		}
		else {
			if (cellinfo._area == "right") {
				remove_l = false;
				remove_t = true;
				remove_r = true;
				remove_b = false;
			}
			else {
				remove_l = true;
				remove_t = true;
				remove_r = false;
				remove_b = false;
			}
		}

		return [remove_l, remove_t, remove_r, remove_b];
	};

	_pGridCell._updateAll = function (status, onlycontents) {
		if (this.__update(status, onlycontents)) {
			var control_elem = this.getElement();
			if (control_elem) {
				var remove_line = this._getRemoveLine();
				var remove_l, remove_t, remove_r, remove_b;
				var grid = this._grid;

				remove_l = remove_line[0];
				remove_t = remove_line[1];
				remove_r = remove_line[2];
				remove_b = remove_line[3];

				if (!this._isSubCell) {
					if (grid._focused_row == this._getDataRow()) {
						if (grid._isSelectRowType() || grid._focused_cell == this._cellidx) {
							if (grid._find_lastFocused() == grid) {
								this._changeStatus("focused", true);
							}
						}
					}
					else {
						this._changeStatus("focused", false);
					}
				}

				if (this.subcells.length > 0) {
					for (var i = 0, n = this.subcells.length; i < n; i++) {
						this.subcells[i]._updateAll();
					}
				}
				else {
					var cellinfo = this._refinfo;
					var datarow = this._getDataRow();

					if (this._isCellSuppress(cellinfo, datarow) && cellinfo._getSuppress(datarow) != 0) {
						if (this._band.id == "body" && cellinfo.suppressalign.indexOf("over") > 0) {
							this._hideInnerElement();
						}
						else {
							if (this._disp_show) {
								var suppinfo = this._getSuppressInfo();
								if (suppinfo) {
									var suppressborder = suppinfo.border_proc;


									if (this._getDisplayRowIdx() == this._grid._getDispRowCnt() - 1) {
										suppressborder = 0;
									}

									if (suppressborder > 0) {
										remove_b = true;
									}

									if (suppinfo.text_proc != 0) {
										this._hideInnerElement();
									}
									else {
										this._showInnerElement();
									}
								}
							}
						}
					}
					else {
						if (this._disp_show && this._hideInner) {
							this._showInnerElement();
						}
					}
				}

				if (!onlycontents) {
					this._control_element.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
				}

				if (control_elem._mode == "text") {
					this._changeClientmode("text");
				}
			}
		}
	};

	_pGridCell._isCellSuppress = function (cellinfo, datarow) {
		if (!datarow) {
			datarow = this._grid._getDataRow(this._rowidx);
		}

		if (!cellinfo) {
			cellinfo = this._refinfo;
		}

		var disp_type = cellinfo._getDisplaytype(datarow);
		return (this._grid._is_use_suppress && (disp_type != "checkboxcontrol" && disp_type != "treeitemcontrol" && disp_type != "buttoncontrol" && disp_type != "progressbarcontrol" || (disp_type == "progressbarcontrol" && this._display_text.length > 0)));
	};

	_pGridCell._getSuppressInfo = function () {
		var grid = this._grid;
		var row2;

		if (grid._fixed_rowcnt > 0) {
			if (grid._fixed_endrow >= this._rowidx) {
				row2 = grid._fixed_startrow;
			}
			else {
				row2 = grid._toprowpos[0] - (grid._fixed_rowcnt - grid._fixed_startrow);
			}
		}
		else {
			row2 = grid._toprowpos[0];
		}

		var row = this._rowidx - row2;

		if (this._rowidx >= 0 && row < 0) {
			return null;
		}

		return this._refinfo._getSuppressInfo(row);
	};

	_pGridCell._getDisplayRowIdx = function () {
		return this._rowidx - this._grid._getBodyBegRowPos(this._rowidx);
	};

	_pGridCell._setDisplayText = function () {
		this._displaytext = this._getDisplayText();
		this.on_apply_text();
	};

	_pGridCell._showfull = function (is_vscroll) {
		if (this._isSubCell) {
			return this.parent._showfull();
		}

		var band = this._band;
		var scrollleft = this._grid._getScrollLeft();
		var scrolltop = this._grid._getScrollTop();
		var topPos = this.parent._adjust_top;

		var l = this._adjust_left;
		var t = this._adjust_top + topPos;
		var w = this._adjust_width;
		var h = this._adjust_height;
		var r = l + w;
		var b = t + h;

		l -= scrollleft;
		r -= scrollleft;
		t -= scrolltop;
		b -= scrolltop;

		var grid = this._grid;
		var gridrow = this._getRowControl();
		var hscroll = grid._hscrollmng;
		var vscroll = grid._vscrollmng;
		var cellinfo = this._refinfo;
		var bandrc = gridrow._getAreaRect(cellinfo._area);

		if (hscroll && cellinfo._area == "body") {
			if (w < bandrc.width) {
				if (l < 0) {
					hscroll.setPos(hscroll.pos + l);
				}
				else if (r > bandrc.width) {
					var gap = r - bandrc.width;
					hscroll.setPos(hscroll.pos + gap);
				}
			}
		}

		if (band.id == "body") {
			if (vscroll && is_vscroll && !gridrow._fixed) {
				if (h < band._getClientHeight()) {
					if (t < 0) {
						vscroll.setPixelPos(vscroll._pos + t);
					}
					else if (b > band._getClientHeight()) {
						var gab = b - band._getClientHeight();
						vscroll.setPixelPos(vscroll._pos + gab);
					}
				}
			}
		}
	};

	_pGridCell._needToggle = function (eventname, from_comp) {
		if (!this._is_alive) {
			return;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var editType = this._refinfo._getEdittype(datarow);

		if (grid.selectchangetype == "down" && eventname == "onclick") {
			return;
		}
		else if (grid.selectchangetype == "up" && eventname == "onlbuttondown") {
			return;
		}

		if (editType == "checkbox" && nexacro._toBoolean(grid.readonly) == false) {
			if (this._curDisplayType != "checkboxcontrol") {
				grid._toggleVal(datarow, this._refinfo);
			}
			else {
				if (eventname == "onclick" || eventname == "onlbuttondown") {
					if (this._grid.cellclickbound == "cell" && from_comp == this) {
						if (this._subComp && this._subComp._toggleCheck) {
							this._subComp._toggleCheck();
						}
					}
				}
				else {
					if (this._subComp && this._subComp._toggleCheck) {
						this._subComp._toggleCheck();
					}
				}
			}
		}
	};

	_pGridCell._getRowControl = function () {
		return (this._isSubCell) ? this.parent.parent : this.parent;
	};

	_pGridCell._setPositionInGrid = function (editComp, noScrollPos, noPadding) {
		var gridrow = this._getRowControl();
		var band = this._band;
		var grid = this._grid;
		var cellinfo = this._refinfo;
		var rect = gridrow._getAreaRect(cellinfo._area);

		var areal = rect.left;
		var arear = rect.left + rect.width;

		var is_fixed = (band.id == "body" && gridrow._fixed);
		var bandt = band._adjust_top + ((band.id == "body" && is_fixed == false) ? grid._fixed_height : 0);
		var bandb = band.getOffsetBottom();

		var l = this._adjust_left + areal;
		var t = gridrow._adjust_top + this._adjust_top + bandt;

		if (!noScrollPos) {
			var band_scroll_top = (is_fixed) ? 0 : grid._getScrollTop();
			var area_scroll_left = grid._getScrollLeft();

			if (cellinfo._area == "body") {
				l -= (area_scroll_left >= 0) ? area_scroll_left : 0;
			}
			if (band.id == "body") {
				t -= (band_scroll_top >= 0) ? band_scroll_top : 0;
			}
		}

		if (band._refinfo._noborder == true && cellinfo._row == 0 && this._getDisplayRowIdx() <= 0) {
			var border = this._getCurrentStyleBorder();
			t += border ? border.bottom._width : 0;
		}

		var crect = this._getAvailableRect();

		if (!noPadding) {
			var padding = this._getCurrentStylePadding();
			l += (padding) ? padding.left : 0;
			t += (padding) ? padding.top : 0;
		}

		var r = l + crect.width;
		var b = t + crect.height;
		var orgt = t, orgl = l;

		if (t < bandt) {
			t = bandt;
		}
		if (b > bandb) {
			b = bandb;
		}
		if (l < areal) {
			l = areal;
		}
		if (r > arear) {
			r = arear;
		}

		var w = r - l;
		var h = b - t;

		if (w < 0) {
			w = 0;
		}
		if (h < 0) {
			h = 0;
		}

		if (editComp) {
			if (w == 0 || h == 0) {
				editComp.move(0, -10, 0, 0);
			}
			else {
				editComp.move(l, t, w, h);
			}
		}

		return {
			left : l, 
			top : t, 
			right : r, 
			bottom : b, 
			width : w, 
			height : h, 
			orgt : orgt, 
			orgl : orgl
		};
	};

	_pGridCell._isConditionEditor = function () {
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		return (grid._currentCellCell == this._cellidx && grid._currentCellRow == datarow);
	};

	_pGridCell._showEditor = function (focus, showfull) {
		var textCtrl = this._text_elem;
		var cellinfo = this._refinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var editComp;

		grid._currentCellCell = this._cellidx;
		grid._currentCellRow = datarow;

		if (showfull) {
			this._showfull();
		}

		if (this._grid._showEditing) {
			this._grid._hideEditor();
		}

		if (textCtrl) {
			textCtrl.setElementVisible(false);
		}
		if (this._subComp) {
			this._subComp.set_visible(false);
		}

		grid._currentCellEditor = editComp = this._createEditor();
		editComp._EditUpdateAll(cellinfo, this);
		editComp.set_visible(true);

		if (focus || nexacro._isTouchInteraction || grid.selectchangetype == "up") {
			editComp._apply_setfocus();
		}

		if (grid.autoenter == "select" && grid._lbuttondown_proc) {
			editComp._user_push = true;
			editComp._changeStatus("focused", true);
			editComp._is_pushed_area = true;
			editComp._is_push = true;
		}
		else {
			editComp._changeStatus("focused", true);
		}

		if (nexacro._enableaccessibility) {
			editComp._setFocus(false);
		}

		this._editor = editComp;

		if (editComp.setCaretPos && !editComp.autoselect) {
			editComp.setCaretPos(0);
		}
		else if (editComp.comboedit && editComp.comboedit.setCaretPos && !editComp.comboedit.autoselect) {
			editComp.comboedit.setCaretPos(0);
		}
	};

	_pGridCell._hideEditor = function () {
		var text = this._text_elem;
		if (text) {
			text.setElementVisible(true);
		}
		if (this._subComp) {
			this._subComp.set_visible(true);
		}

		this._destroyEditor();

		this._grid._currentCellCell = -1;
		this._grid._currentCellRow = -1;
	};

	delete _pGridCell;

	nexacro._GridSubCellControl = function (id, left, top, width, height, right, bottom, parent, cellinfo, rowidx, cellidx) {
		nexacro._GridCellControl.call(this, id, left, top, width, height, right, bottom, parent, cellinfo, rowidx, cellidx);
		this._isSubCell = true;
	};

	var _pSubGridCell = nexacro._createPrototype(nexacro._GridCellControl, nexacro._GridSubCellControl);
	nexacro._GridSubCellControl.prototype = _pSubGridCell;
	_pSubGridCell._is_subcontrol = true;
	_pSubGridCell._type_name = "GridSubCellControl";

	_pSubGridCell.on_getIDCSSSelector = function () {
		return "subcell";
	};

	nexacro._GridExpandControl = function (parent, left, top, right, bottom, controlmode) {
		nexacro._CellExpandControl.call(this, parent, left, top, right, bottom, controlmode);

		if (parent._refinfo) {
			this._grid = parent._grid;
			this._cellobj = parent;
			this._cellinfo = parent._refinfo;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridExpand = nexacro._createPrototype(nexacro._CellExpandControl, nexacro._GridExpandControl);
	nexacro._GridExpandControl.prototype = _pGridExpand;

	_pGridExpand.on_destroy_contents = function () {
		nexacro._CellExpandControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridExpand._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridExpand._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridExpand.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (touchinfo) {
			this._grid.on_fire_onexpanddown("", false, false, false, touchinfo.screenx, touchinfo.screeny, touchinfo.canvasx, touchinfo.canvasy, touchinfo.clientx, touchinfo.clienty, from_comp, from_refer_comp);
		}

		return true;
	};

	_pGridExpand.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._grid.on_fire_onexpanddown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridExpand.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		if (touchinfo) {
			this._grid.on_fire_onexpandup("", false, false, false, touchinfo.screenx, touchinfo.screeny, touchinfo.canvasx, touchinfo.canvasy, touchinfo.clientx, touchinfo.clienty, from_comp, from_refer_comp);
		}
		return true;
	};

	_pGridExpand.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._grid.on_fire_onexpandup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridExpand._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridExpand._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};


	delete _pGridExpand;

	nexacro._GridButtonControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellButtonControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
			this._cellinfo = null;
			this._cellobj = null;
		}
	};
	var _pGridButton = nexacro._createPrototype(nexacro._CellButtonControl, nexacro._GridButtonControl);
	nexacro._GridButtonControl.prototype = _pGridButton;

	_pGridButton.on_destroy_contents = function () {
		nexacro._CellButtonControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridButton.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_user_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		if (key_code == 13 || key_code == 32) {
			this.click();
		}
		return ret;
	};

	_pGridButton._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridButton._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridButton._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridButton._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridButton.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Button.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridButton.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.Button.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridButton.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Button.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridButton.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.Button.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridButton._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridButton._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridButton._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		if (visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
		}
	};

	_pGridButton._setDataset = function () {
	};

	delete _pGridButton;

	nexacro._GridProgressBarControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro._CellProgressBarControl.call(this, id, left, top, width, height, parent, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};
	var _pGridBar = nexacro._GridProgressBarControl.prototype = nexacro._createPrototype(nexacro._CellProgressBarControl, nexacro._GridProgressBarControl);


	_pGridBar.on_destroy_contents = function () {
		nexacro._CellProgressBarControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridBar._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.ProgressBar.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridBar._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.ProgressBar.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridBar._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridBar._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	delete _pGridBar;

	nexacro._GridEditControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellEditControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridEdit = nexacro._createPrototype(nexacro._CellEditControl, nexacro._GridEditControl);
	nexacro._GridEditControl.prototype = _pGridEdit;

	_pGridEdit.on_destroy_contents = function () {
		nexacro._CellEditControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridEdit.on_apply_autoskip = function () {
		this._grid._moveToCell("next", true);
	};

	_pGridEdit._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.Edit.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridEdit._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.Edit.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridEdit._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Edit.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridEdit._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Edit.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}
		return true;
	};

	_pGridEdit.on_fire_onkillfocus = function (newobj, newreferobj) {
		return this._cellobj.on_fire_onkillfocus(newobj, newreferobj);
	};

	_pGridEdit.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Edit.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridEdit.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.Edit.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridEdit.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Edit.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridEdit.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.Edit.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridEdit.on_fire_onclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.Edit.prototype.on_fire_onclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	if (nexacro._Browser == "Gecko" || nexacro._Browser == "Opera") {
		_pGridEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;

			if (this._displaymode) {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, "control");
			}
		};
	}
	else {
		_pGridEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, "control");
			}
		};
	}

	_pGridEdit._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridEdit._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridEdit._setDataset = function (b_async, row) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridEdit;

	nexacro._GridTextAreaControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellTextAreaControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridTextArea = nexacro._createPrototype(nexacro._CellTextAreaControl, nexacro._GridTextAreaControl);
	nexacro._GridTextAreaControl.prototype = _pGridTextArea;

	_pGridTextArea.on_destroy_contents = function () {
		nexacro._CellTextAreaControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};



	_pGridTextArea._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.TextArea.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridTextArea._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.TextArea.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridTextArea._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.TextArea.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridTextArea._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.TextArea.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridTextArea.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.TextArea.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridTextArea.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.TextArea.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridTextArea.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.TextArea.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridTextArea.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.TextArea.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridTextArea.on_fire_onclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.TextArea.prototype.on_fire_onclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	if (nexacro._Browser == "Gecko" || nexacro._Browser == "Opera") {
		_pGridTextArea._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode) {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, "control");
			}
		};
	}
	else {
		_pGridTextArea._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);

				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, "control");
			}
		};
	}

	_pGridTextArea._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridTextArea._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridTextArea._setDataset = function (b_async, row) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1 && !this.readonly) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridTextArea;

	nexacro._GridMaskEditControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro._CellMaskEditControl.call(this, id, left, top, width, height, parent, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridMaskEdit = nexacro._createPrototype(nexacro._CellMaskEditControl, nexacro._GridMaskEditControl);
	nexacro._GridMaskEditControl.prototype = _pGridMaskEdit;

	_pGridMaskEdit.on_destroy_contents = function () {
		nexacro._CellMaskEditControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridMaskEdit.on_apply_autoskip = function () {
		this._grid._moveToCell("next", true);
	};

	_pGridMaskEdit._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.MaskEdit.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridMaskEdit._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.MaskEdit.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridMaskEdit._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.MaskEdit.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridMaskEdit._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.MaskEdit.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridMaskEdit.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.MaskEdit.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridMaskEdit.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.MaskEdit.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridMaskEdit.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.MaskEdit.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridMaskEdit.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.MaskEdit.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridMaskEdit.on_fire_onclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.MaskEdit.prototype.on_fire_onclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	if (nexacro._Browser == "Gecko" || nexacro._Browser == "Opera") {
		_pGridMaskEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode) {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, "control");
			}
		};
	}
	else {
		_pGridMaskEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, "control");
			}
		};
	}

	_pGridMaskEdit._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridMaskEdit._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridMaskEdit._setDataset = function (b_async, row) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridMaskEdit;

	nexacro._GridCalendarControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellCalendarControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridCalendar = nexacro._createPrototype(nexacro._CellCalendarControl, nexacro._GridCalendarControl);
	nexacro._GridCalendarControl.prototype = _pGridCalendar;

	_pGridCalendar.on_destroy_contents = function () {
		nexacro._CellCalendarControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridCalendar.set_innerdataset = function (str) {
		var ret = nexacro.CalendarCtrl.prototype.set_innerdataset.call(this, str);

		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendarinnerdataset", str);
				}

				if (grid._currentCellEditor && grid._currentCellEditor instanceof nexacro._GridCalendarControl) {
					grid._currentCellEditor.set_innerdataset(str);
				}
			}
		}
		return ret;
	};

	_pGridCalendar.set_backgroundcolumn = function (str) {
		nexacro.CalendarCtrl.prototype.set_backgroundcolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendarbackgroundcolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_bordercolumn = function (str) {
		nexacro.CalendarCtrl.prototype.set_bordercolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendarbordercolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_datecolumn = function (str) {
		nexacro.CalendarCtrl.prototype.set_datecolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendardatecolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_textcolorcolumn = function (str) {
		nexacro.CalendarCtrl.prototype.set_textcolorcolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendartextcolorcolumn", str);
				}
			}
		}
	};

	_pGridCalendar._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.Calendar.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridCalendar._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.Calendar.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridCalendar._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Calendar.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCalendar._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Calendar.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCalendar.on_notify_onkeydown = function (obj, e) {
		var grid = this._grid;

		if (e.keycode == nexacro.Event.KEY_DOWN && e.altkey) {
			grid._is_editor_keyaction = false;
		}
		if (!obj._displaymode) {
			return (nexacro.Calendar.prototype.on_notify_onkeydown.call(this, obj, e));
		}
	};

	_pGridCalendar.on_fire_onchanged = function (obj, pre_text, pre_value, post_text, post_value) {
		if (!obj._displaymode) {
			if (this._grid.autoupdatetype == "dateselect" || this._grid.autoupdatetype == "itemselect") {
				this._setDataset(true, undefined, false, post_text, post_value, pre_value);
			}
			return (nexacro.Calendar.prototype.on_fire_onchanged.call(this, obj, pre_text, pre_value, post_text, post_value));
		}
	};

	_pGridCalendar.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasx -= from_refer_comp._adjust_left;
			touchinfo.canvasy -= from_refer_comp._adjust_top;
			touchinfo.clientx -= from_refer_comp._adjust_left;
			touchinfo.clienty -= from_refer_comp._adjust_top;
		}

		nexacro.Calendar.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCalendar.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.Calendar.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridCalendar.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasx -= from_refer_comp._adjust_left;
			touchinfo.canvasy -= from_refer_comp._adjust_top;
			touchinfo.clientx -= from_refer_comp._adjust_left;
			touchinfo.clienty -= from_refer_comp._adjust_top;
		}

		nexacro.Calendar.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCalendar.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.Calendar.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridCalendar._on_edit_oneditclick = function (obj, e) {
		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		nexacro.Calendar.prototype._on_edit_oneditclick.call(this, obj, e);
		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, "control");
	};

	_pGridCalendar._on_drop_onclick = function (obj, e) {
		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, "control");
	};

	_pGridCalendar._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		if (visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, "control");
		}
	};

	_pGridCalendar._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCalendar._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridCalendar._setDataset = function (b_async, row, fire, post_text, post_value, oldvalue) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (fire == undefined) {
			fire = true;
		}

		this._setValueCtrl(fire, post_text, post_value);

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				this._setValue(oldvalue);
				retn = false;
			}
			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridCalendar;

	nexacro._GridComboControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellComboControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);
		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridCombo = nexacro._createPrototype(nexacro._CellComboControl, nexacro._GridComboControl);
	nexacro._GridComboControl.prototype = _pGridCombo;

	_pGridCombo.on_destroy_contents = function () {
		nexacro._CellComboControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridCombo._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.Combo.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridCombo._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.Combo.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridCombo._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Combo.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCombo._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Combo.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCombo.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasx -= from_refer_comp._adjust_left;
			touchinfo.canvasy -= from_refer_comp._adjust_top;
			touchinfo.clientx -= from_refer_comp._adjust_left;
			touchinfo.clienty -= from_refer_comp._adjust_top;
		}

		nexacro.Combo.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCombo.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.Combo.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridCombo.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasx -= from_refer_comp._adjust_left;
			touchinfo.canvasy -= from_refer_comp._adjust_top;
			touchinfo.clientx -= from_refer_comp._adjust_left;
			touchinfo.clienty -= from_refer_comp._adjust_top;
		}

		nexacro.Combo.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCombo.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.Combo.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridCombo.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (!obj._displaymode) {
			if (this._grid.autoupdatetype == "comboselect" || this._grid.autoupdatetype == "itemselect") {
				this._setDataset(true, undefined, prevalue);
			}

			return (nexacro.Combo.prototype.on_fire_onitemchanged.call(this, obj, preindex, pretext, prevalue, postindex, posttext, postvalue));
		}
	};

	_pGridCombo._on_edit_oneditclick = function (obj, e) {
		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, "control");
	};

	_pGridCombo._on_edit_mobile_oneditclick = function (obj, e) {
		nexacro.Combo.prototype._on_edit_mobile_oneditclick.call(this, obj, e);

		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, "control");
	};

	_pGridCombo._on_drop_mobile_onclick = function (obj, e) {
		nexacro.Combo.prototype._on_drop_mobile_onclick.call(this, obj, e);

		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, "control");
	};

	_pGridCombo._on_drop_onclick = function (obj, e) {
		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, "control");
	};

	_pGridCombo._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		if (visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
		}
	};

	_pGridCombo._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCombo._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridCombo._setDataset = function (b_async, row, prevalue) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			if (this._prevalue !== this.value) {
				grid._is_async_recreate = b_async;
				grid._dsEventOccured = true;

				var fail = {
					status : ""
				};
				grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

				if (fail.status == "cancolumnchange") {
					this.set_value(prevalue);
					retn = false;
				}
				grid._is_async_recreate = false;
				grid._dsEventOccured = false;
			}
		}
		return retn;
	};

	delete _pGridCombo;

	nexacro._GridCellControlCheckbox = function (id, left, top, width, height, parent) {
		nexacro._CellCheckboxControlBase.call(this, id, left, top, width, height, parent);
	};

	var _pGridCellCheckbox = nexacro._createPrototype(nexacro._CellCheckboxControlBase, nexacro._GridCellControlCheckbox);
	nexacro._GridCellControlCheckbox.prototype = _pGridCellCheckbox;


	_pGridCellCheckbox.on_notify_checkbox_onkeydown = function () {
	};

	_pGridCellCheckbox._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCellCheckbox._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};


	delete _pGridCellCheckbox;

	nexacro._GridCheckboxControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro._GridCellControlCheckbox.call(this, id, left, top, width, height, parent);
		this._controlmode = (controlmode) ? true : false;
		this._grid = this._view;
	};

	var _pGridCheckbox = nexacro._createPrototype(nexacro._GridCellControlCheckbox, nexacro._GridCheckboxControl);
	nexacro._GridCheckboxControl.prototype = _pGridCheckbox;



	_pGridCheckbox._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro._GridCellControlCheckbox.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCheckbox._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro._GridCellControlCheckbox.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCheckbox._common_fire_lbuttondown = function () {
		var grid = this._grid;

		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}
	};

	_pGridCheckbox.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown();
		return this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
	};

	_pGridCheckbox.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown();
		return this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGridCheckbox.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro._GridCellControlCheckbox.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCheckbox.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro._GridCellControlCheckbox.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridCheckbox.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var grid = this._grid;

		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}

		if (grid.selectchangetype != "down") {
			if (nexacro._toBoolean(grid.readonly) == false) {
				this._toggleCheck();
			}
		}

		if (!this._is_alive) {
			return;
		}

		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pGridCheckbox.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var grid = this._grid;
		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}

		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pGridCheckbox._toggleCheck = function () {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);
		var editType = cellinfo._getEdittype(datarow);

		if (editType == "checkbox") {
			var v = nexacro._toBoolean(this.value);
			v = (v) ? 0 : 1;

			if (cellinfo.text._bindtype == 1) {
				grid._dsEventOccured = true;
				if (cellinfo._grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, v)) {
					v = this._getDisplayText();
					this.set_value(v);
				}
				if (grid) {
					grid._dsEventOccured = false;
				}
			}
		}
	};

	_pGridCheckbox._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}
		return "";
	};

	delete _pGridCheckbox;

	nexacro._GridImageControl = function (id, left, top, width, height, parent) {
		nexacro._CellImageControl.call(this, id, left, top, width, height, parent);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
	};

	var _pGridImage = nexacro._createPrototype(nexacro._CellImageControl, nexacro._GridImageControl);
	nexacro._GridImageControl.prototype = _pGridImage;

	_pGridImage.on_destroy_contents = function () {
		nexacro._CellImageControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridImage._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Component.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridImage._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Component.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridImage.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "image");
	};

	_pGridImage.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp);
	};

	_pGridImage.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_ontouchend(touchinfos, changedtouchinfos, this, from_refer_comp);
	};

	_pGridImage.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		return this.parent.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, from_elem);
	};

	_pGridImage.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_onkeydown(key_code, alt_key, ctrl_key, shift_key, this, from_refer_comp);
	};

	_pGridImage.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_onkeyup(key_code, alt_key, ctrl_key, shift_key, this, from_refer_comp);
	};

	_pGridImage._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridImage._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};


	delete _pGridImage;

	nexacro._GridSelectorButtonControl = function (id, left, top, width, height, right, bottom, parent, target, idx) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, null, null, null, null, target);
		this._real_parent = parent;
		this._band = parent._band;
		this._grid = target;
		this._idx = idx;
		this._point = {
			x : 0, 
			y : 0, 
			w : 0, 
			h : 0
		};
		this._minibox = null;
		this._minibox_size = 8;
		this._minibox_wgap = 0;
		this._minibox_hgap = 0;
		this._minibox_backcolor = "black";
		this._is_track = true;
		this._setControl();
	};
	var _pGridSelectorButtonControl = nexacro._GridSelectorButtonControl.prototype = nexacro._createPrototype(nexacro.Button, nexacro._GridSelectorButtonControl);
	_pGridSelectorButtonControl._is_subcontrol = true;

	_pGridSelectorButtonControl._updateMiniBox = function () {
		if (!this.image || !this._image_width || !this._image_height) {
			var x = (this._adjust_height - this._minibox_size) / 2;

			this._minibox_wgap = x;
			this._minibox_hgap = x;

			if (!this._minibox) {
				this._minibox = new nexacro.Component("minibox", x, x, this._minibox_size, this._minibox_size, null, null, null, null, null, null, this);
				this._minibox._is_simple_control = true;
				this._minibox._is_track = true;
				this._minibox.set_background(this._minibox_backcolor);

				this._minibox._on_starttrack = function () {
					return this.parent._on_starttrack();
				};
				this._minibox._on_movetrack = function (x, y, dragdata) {
					return this.parent._on_movetrack(x, y, dragdata);
				};
				this._minibox._on_endtrack = function (x, y, dragdata) {
					return this.parent._on_endtrack(x, y, dragdata);
				};

				this._minibox.createComponent();
			}
			else {
				this._minibox.move(x, x, this._minibox_size, this._minibox_size);
			}
		}
		else {
			if (this._minibox) {
				this._minibox.destroy();
				this._minibox = null;
			}
			if (this._img_elem) {
				this._minibox_wgap = (this._adjust_width - this._image_width) / 2;
				this._minibox_hgap = (this._adjust_height - this._image_height) / 2;

				if (this._minibox_wgap < 0) {
					this._minibox_wgap = 0;
				}
				if (this._minibox_hgap < 0) {
					this._minibox_hgap = 0;
				}
			}
		}
	};

	_pGridSelectorButtonControl.on_fire_onsize = function () {
		this._updateMiniBox();
	};

	_pGridSelectorButtonControl.on_create_contents = function () {
		nexacro.Button.prototype.on_create_contents.call(this);
		this._updateMiniBox();
	};

	_pGridSelectorButtonControl.on_created_contents = function (win) {
		nexacro.Button.prototype.on_created_contents.call(this, win);

		if (this._minibox) {
			this._minibox.on_created();
		}
	};

	_pGridSelectorButtonControl.on_destroy_contents = function () {
		this._band = null;
		this._grid = null;
		this._minibox = null;
		this._real_parent = null;
		nexacro.Button.prototype.on_destroy_contents.call(this);
	};

	_pGridSelectorButtonControl._on_starttrack = function () {
		var p = this._real_parent;
		p._is_tracking = true;
		p._track_reset_scroll = false;
		p._track_up_scroll = false;

		var scroll_top = this._grid._getScrollTop();
		var scroll_left = this._grid._getScrollLeft();

		this._point.hgap = 0;
		this._point.wgap = 0;
		this._point.scrolltop = scroll_top;
		this._point.scrollleft = scroll_left;

		this._point.x = p._area_pos.l;
		this._point.y = p._area_pos.t;
		this._point.w = p._area_pos.w;
		this._point.h = p._area_pos.h;


		var start_row = -1, end_row = -1, start_col = -1, end_col = -1;
		var select_area = this._grid._selectinfo.area;
		if (select_area.length > 0) {
			var area = select_area[select_area.length - 1];
			start_row = area.begrow;
			end_row = area.endrow;
			start_col = area.begrow;
			end_col = area.endrow;

			if (this._idx != p._pre_idx) {
				var areainfo = this._grid._selectinfo.areainfo;
				var ctrlpoint = this._grid._selectinfo.ctrlpoint;
				var cellinfo;
				if (areainfo) {
					var format = this._grid._curFormat;
					var subrowlen = format._bodyrows.length;
					if (this._idx == 0) {
						cellinfo = format._bodycells[areainfo.ecell];
						ctrlpoint._set(cellinfo, areainfo.erow, subrowlen);
					}
					else if (this._idx == 1) {
						cellinfo = format._bodycells[areainfo.scell];
						ctrlpoint._set(cellinfo, areainfo.srow, subrowlen);
					}
					else if (this._idx == 2) {
						cellinfo = format._bodycells[areainfo.ecell];
						ctrlpoint._set(cellinfo, areainfo.srow, subrowlen);
					}
					else if (this._idx == 3) {
						cellinfo = format._bodycells[areainfo.scell];
						ctrlpoint._set(cellinfo, areainfo.erow, subrowlen);
					}
				}
			}
		}


		if (this._grid._fixed_rowcnt > 0) {
			var headheight = this._grid._getHeadHeight();
			var fixedheight = this._grid._fixed_height;

			if (start_row >= this._grid._fixed_startrow && start_row <= this._grid._fixed_endrow) {
				this._point.y = p._area_pos.t += this._point.scrolltop;

				if (end_row > this._grid._fixed_endrow && scroll_top > 0) {
					if (p._end_scroll_top >= 0) {
						this._point.h = p._area_pos.h -= scroll_top;
					}
				}
			}
		}

		p.set_visible(true);
		p._trackbar[0].set_visible(false);
		p._trackbar[1].set_visible(false);
		p._trackbar[2].set_visible(false);
		p._trackbar[3].set_visible(false);

		p._start_begarea = this._grid._selectinfo.arearect.barea;
		p._start_endarea = this._grid._selectinfo.arearect.earea;

		if (this._idx == 0) {
			this._area = p._start_begarea;
		}
		else {
			this._area = p._start_endarea;
		}

		this._grid._track_mode = "areaselect";


		p._callback_start.call(this._grid, p._area_pos, this._idx);
	};

	_pGridSelectorButtonControl._on_movetrack = function (x, y) {
		var p = this._real_parent;

		var cur_scrolltop = this._grid._getScrollTop();
		var cur_scrollleft = this._grid._getScrollLeft();

		var scroll_top_gap = 0, scroll_left_gap = 0;

		if (p._start_scroll_top >= 0) {
			scroll_top_gap = p._start_scroll_top - cur_scrolltop;
		}
		if (p._start_scroll_left >= 0) {
			scroll_left_gap = p._start_scroll_left - cur_scrollleft;
		}

		var ctrl_row = this._grid._selectinfo.ctrlpoint.row;

		var bApply_scroll_top = true;
		if (this._grid._fixed_rowcnt > 0 && ctrl_row >= this._grid._fixed_startrow && ctrl_row <= this._grid._fixed_endrow) {
			bApply_scroll_top = false;
		}

		var l, t, w, h;
		if (this._idx == 0) {
			l = this._point.x + x;
			t = this._point.y + y;
			w = this._point.w - x + scroll_left_gap;
			h = this._point.h - y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (this._idx == 1) {
			l = this._point.x + scroll_left_gap;
			t = this._point.y + (bApply_scroll_top ? scroll_top_gap : 0);
			w = this._point.w + x - scroll_left_gap;
			h = this._point.h + y - (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (this._idx == 2) {
			l = this._point.x + x;
			t = this._point.y;
			w = this._point.w - x;
			h = this._point.h + y;
		}
		else if (this._idx == 3) {
			l = this._point.x;
			t = this._point.y + y;
			w = this._point.w + x;
			h = this._point.h - y;
		}

		var select_area = this._grid._selectinfo.area;
		if (this._grid._fixed_rowcnt > 0 && select_area.length) {
			var border = this._grid._getCurrentStyleBorder();
			var border_top = (border) ? parseInt(border.right._width, 10) : 0;

			var headheight = this._grid._getHeadHeight();
			var fixedheight = this._grid._fixed_height;
			var fixedbottom = headheight + fixedheight + border_top;

			var cur_area = select_area[select_area.length - 1];
			var cur_srow = cur_area.begrow;
			var cur_erow = cur_area.endrow;

			var ctrlpoint = this._grid._selectinfo.ctrlpoint;

			var fixederow = this._grid._fixed_endrow;
			var vscroll = this._grid._vscrollmng;

			if ((t + h) < fixedbottom) {
				p._track_reset_scroll = true;
			}

			if (cur_erow > fixederow) {
				p._track_up_scroll = true;
			}

			if (p._track_reset_scroll && cur_srow <= fixederow && cur_scrolltop > 0 && (t + h) >= fixedbottom) {
				vscroll.setPos(0);
				p._track_reset_scroll = false;
			}
			else if (p._track_up_scroll && ctrlpoint.row <= fixederow && cur_scrolltop > 0 && (t + h) <= (fixedbottom)) {
				vscroll.setPos(vscroll.pos - 1);
			}
			else if (ctrlpoint.row > fixederow && cur_scrolltop > 0 && t <= fixedbottom) {
				vscroll.setPos(vscroll.pos - 1);
			}
		}

		var type = p._setAreaPos(l, t, w, h, true, this._idx);
		var scroll = false;
		p._adjust_scroll = false;

		if (type[0] != "" || type[1] != "") {
			var area;
			if (p._onlyarea) {
				area = p._curarea;
			}

			var p_l = p._area_pos.l;
			var p_t = p._area_pos.t;
			var p_w = p._area_pos.w;
			var p_h = p._area_pos.h;

			scroll = p._callback_scroll.call(this._grid, type, area);

			p._area_pos.l = p_l;
			p._area_pos.t = p_t;
			p._area_pos.w = p_w;
			p._area_pos.h = p_h;
		}




		p._callback.call(this._grid, p._area_pos, this._idx, true);
	};

	_pGridSelectorButtonControl._on_endtrack = function (x, y) {
		var p = this._real_parent;
		p._is_tracking = false;
		p._adjust_scroll = true;
		p.set_visible(false);
		p._trackbar[0].set_visible(true);
		p._trackbar[1].set_visible(true);
		p._start_begarea = this._grid._selectinfo.arearect.barea;
		p._start_endarea = this._grid._selectinfo.arearect.earea;

		if (this._idx == 0) {
			this._area = p._start_begarea;
		}
		else {
			this._area = p._start_endarea;
		}

		p._end_scroll_top = this._grid._getScrollTop();
		p._end_scroll_left = this._grid._getScrollLeft();
		p._pre_idx = this._idx;

		var select_area = this._grid._selectinfo.area;
		if (this._grid._fixed_rowcnt > 0 && select_area.length) {
			var cur_area = select_area[select_area.length - 1];
			var cur_erow = cur_area.endrow;

			var fixederow = this._grid._fixed_endrow;

			if (cur_erow > fixederow) {
				p._track_up_scroll = true;
			}
			else {
				p._track_up_scroll = false;
			}
		}

		this._grid._track_mode = "";

		this._grid._updateSelector();
	};

	delete _pGridSelectorButtonControl;

	nexacro._GridSelector = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
		this._is_subcontrol = true;

		this._is_simple_control = true;

		this._callback_start = null;
		this._callback = null;
		this._callback_scroll = null;
		this._trackbar = [];
		this._grid = parent;
		this._band = parent._bodyBand;
		this._area_pos = {
			l : 0, 
			t : 0, 
			w : 0, 
			h : 0, 
			empty : true
		};
		this._curarea = "";
		this._onlyarea = false;
		this._start_begarea = "";
		this._start_endarea = "";
		this._start_scroll_top = -1;
		this._start_scroll_left = -1;
		this._end_scroll_top = -1;
		this._end_scroll_left = -1;
		this._pre_idx = -1;
	};

	var _pGridSelector = nexacro._createPrototype(nexacro.Component, nexacro._GridSelector);
	nexacro._GridSelector.prototype = _pGridSelector;
	_pGridSelector._is_subcontrol = true;
	_pGridSelector._type_name = "GridSelectorControl";

	_pGridSelector._trackbar_size = 22;

	_pGridSelector.on_create_contents = function () {
	};

	_pGridSelector.on_created_contents = function () {
		if (this._trackbar[0]) {
			this._trackbar[0].on_created();
			this._trackbar[1].on_created();
			this._trackbar[2].on_created();
			this._trackbar[3].on_created();
		}
	};

	_pGridSelector.on_destroy_contents = function () {
		this._trackbar[0].destroy();
		this._trackbar[1].destroy();
		this._trackbar[0] = null;
		this._trackbar[1] = null;
		this._trackbar[2] = null;
		this._trackbar[3] = null;
		this._trackbar = null;
		this._band = null;
		this._grid = null;
	};

	_pGridSelector._createButton = function () {
		if (!this._trackbar[0]) {
			this._trackbar[0] = new nexacro._GridSelectorButtonControl("selectortrackbar1", 0, 0, 0, 0, null, null, this, this.parent, 0);
			this._trackbar[0].createComponent();
			this._trackbar[1] = new nexacro._GridSelectorButtonControl("selectortrackbar2", 0, 0, 0, 0, null, null, this, this.parent, 1);
			this._trackbar[1].createComponent();
			this._trackbar[2] = new nexacro._GridSelectorButtonControl("selectortrackbar3", 0, 0, 0, 0, null, null, this, this.parent, 2);
			this._trackbar[2].createComponent();
			this._trackbar[3] = new nexacro._GridSelectorButtonControl("selectortrackbar4", 0, 0, 0, 0, null, null, this, this.parent, 3);
			this._trackbar[3].createComponent();

			this._trackbar[0]._no_slide_scroll = true;
			this._trackbar[1]._no_slide_scroll = true;
			this._trackbar[2]._no_slide_scroll = true;
			this._trackbar[3]._no_slide_scroll = true;
			this._recalcarea();
		}
	};

	_pGridSelector._updateAll = function () {
	};

	_pGridSelector._recalcarea = function (mode) {
		if (!this._trackbar[0]) {
			return;
		}

		if (this._area_pos.empty) {
			this._trackbar[0].set_visible(false);
			this._trackbar[1].set_visible(false);
			this._trackbar[2].set_visible(false);
			this._trackbar[3].set_visible(false);
			return;
		}

		if (mode != "hscroll" && mode != "vscroll") {
			this.__showbutton(false);
		}

		var fullsize = this._trackbar_size;
		var halfsize = fullsize / 2;
		var grid = this._grid;
		var format = grid._curFormat;
		var leftwidth = format.leftWidth;
		var rightstart = grid._getClientWidth() - format.rightWidth;
		var hmin, hmax, vmin, vmax;
		var l, t, r, b;
		var adjust_top;

		vmin = this._band._adjust_top;
		vmax = this._band.getOffsetBottom();

		hmin = [];
		hmax = [];

		if (this._start_begarea == "left") {
			hmin[0] = 0;
			hmax[0] = leftwidth;
		}
		else if (this._start_begarea == "right") {
			hmin[0] = rightstart;
			hmax[0] = grid._getClientWidth();
		}
		else {
			hmin[0] = leftwidth;
			hmax[0] = rightstart;
		}

		if (this._start_endarea == "left") {
			hmin[1] = 0;
			hmax[1] = leftwidth;
		}
		else if (this._start_endarea == "right") {
			hmin[1] = rightstart;
			hmax[1] = grid._getClientWidth();
		}
		else {
			hmin[1] = leftwidth;
			hmax[1] = rightstart;
		}

		var border = this._grid._getCurrentStyleBorder();
		var border_top = (border) ? parseInt(border.right._width, 10) : 0;

		var headheight = this._grid._getHeadHeight();
		var fixedheight = this._grid._fixed_height;

		var fixed_srow = this._grid._fixed_startrow;
		var fixed_rowcnt = this._grid._fixed_rowcnt;
		var infixedrows = [false, false, false, false];
		var scroll_top = this._grid._scroll_top;

		if (fixed_rowcnt) {
			var area = this._grid._selectinfo.area;
			var srow, erow;
			if (area.length > 0) {
				srow = area[area.length - 1].begrow;
				erow = area[area.length - 1].endrow;

				if (srow <= (fixed_srow + fixed_rowcnt)) {
					infixedrows[0] = infixedrows[3] = true;
				}

				if (erow <= (fixed_srow + fixed_rowcnt)) {
					infixedrows[1] = infixedrows[2] = true;
				}
			}
		}

		adjust_top = infixedrows[0] ? scroll_top : 0;
		l = this._area_pos.l - halfsize;
		t = this._area_pos.t - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[0].move(l, t, fullsize, fullsize);

		var wgap = this._trackbar[0]._minibox_wgap;
		var hgap = this._trackbar[0]._minibox_hgap;

		var lastfocus = grid._find_lastFocused();

		if (lastfocus == grid) {
			if (r - wgap < hmin[0] || b - hgap < vmin || l + wgap > hmax[0] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[0].visible = infixedrows[0] || false;
			}
			else {
				this._trackbar[0].visible = true;
			}
		}
		else {
			this._trackbar[0].visible = false;
		}

		adjust_top = infixedrows[1] ? scroll_top : 0;
		l = this._area_pos.l + this._area_pos.w - halfsize;
		t = this._area_pos.t + this._area_pos.h - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[1].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[1] || b - hgap < vmin || l + wgap > hmax[1] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[1].visible = infixedrows[1] || false;
			}
			else {
				this._trackbar[1].visible = true;
			}
		}
		else {
			this._trackbar[1].visible = false;
		}

		adjust_top = infixedrows[2] ? scroll_top : 0;
		l = this._area_pos.l - halfsize;
		t = this._area_pos.t + this._area_pos.h - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[2].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[0] || b - hgap < vmin || l + wgap > hmax[0] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[2].visible = false;
			}
		}

		adjust_top = infixedrows[3] ? scroll_top : 0;
		l = this._area_pos.l + this._area_pos.w - halfsize;
		t = this._area_pos.t - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[3].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[1] || b - hgap < vmin || l + wgap > hmax[1] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[3].visible = false;
			}
		}

		this.__showbutton(true);
	};

	if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")) {
		_pGridSelector.__showbutton = function (v) {
			if (this._trackbar[0]) {
				if (!v) {
					this._trackbar[0]._control_element.setElementVisible(false);
					this._trackbar[1]._control_element.setElementVisible(false);
					this._trackbar[2]._control_element.setElementVisible(false);
					this._trackbar[3]._control_element.setElementVisible(false);
				}
				else {
					nexacro._OnceCallbackTimer.callonce(this, function () {
						this._trackbar[0]._control_element.setElementVisible(this._trackbar[0].visible);
						this._trackbar[1]._control_element.setElementVisible(this._trackbar[1].visible);
					}, 10);
				}
			}
		};
	}
	else {
		_pGridSelector.__showbutton = function (v) {
			if (this._trackbar[0]) {
				if (!v) {
					this._trackbar[0]._control_element.setElementVisible(false);
					this._trackbar[1]._control_element.setElementVisible(false);
					this._trackbar[2]._control_element.setElementVisible(false);
					this._trackbar[3]._control_element.setElementVisible(false);
				}
				else {
					this._trackbar[0]._control_element.setElementVisible(this._trackbar[0].visible);
					this._trackbar[1]._control_element.setElementVisible(this._trackbar[1].visible);
				}
			}
		};
	}

	_pGridSelector._trackingHScroll = function (idx, left, right, bodystart, rightstart, scroll_left, scroll_max) {
		if (!this._adjust_scroll && this._grid.scrolltype == "none") {
			return [0, 0];
		}

		return this._grid._trackingHScroll(idx, left, right, this._start_begarea, this._start_endarea, bodystart, rightstart, scroll_left, scroll_max);
	};

	_pGridSelector._setAreaPos = function (left, top, width, height, is_track, idx) {
		var retn = ["", ""];
		var grid = this._grid;
		this._curarea = grid._selectinfo.ctrlpoint.area;

		if (is_track) {
			var typeinfo = this._grid._getTrackType(this, left, top, width, height, idx, this._onlyarea);

			left = typeinfo.adjust_l;
			top = typeinfo.adjust_t;
			width = typeinfo.adjust_w;
			height = typeinfo.adjust_h;

			retn[0] = typeinfo.type[0];
			retn[1] = typeinfo.type[1];
		}

		var empty = (grid._selectinfo.area.length > 0) ? false : true;

		if (width <= 0) {
			width = 1;
		}
		if (height <= 0) {
			height = 1;
		}

		this._area_pos.l = left;
		this._area_pos.t = top;
		this._area_pos.w = width;
		this._area_pos.h = height;
		this._area_pos.area = this._curarea;
		this._area_pos.empty = empty;
		if (is_track) {
			this._area_pos.scrolltop = grid._getScrollTop();
		}
		return retn;
	};

	_pGridSelector.move = function (left, top, width, height, mode) {
		if (!this._is_tracking) {
			if (left > this._grid._getClientWidth()) {
				return;
			}

			this._start_begarea = this._grid._selectinfo.arearect.barea;
			this._start_endarea = this._grid._selectinfo.arearect.earea;
			this._setAreaPos(left, top, width, height);
			this._recalcarea(mode);
		}
		else {
			this._setAreaPos(left, top, width, height);
		}

		return nexacro.Component.prototype.move.call(this, left, top, width, height, undefined, undefined);
	};

	_pGridSelector._setCallbackFn = function (startfn, applyfn, scrollfn) {
		this._callback_start = startfn;
		this._callback = applyfn;
		this._callback_scroll = scrollfn;
	};

	_pGridSelector._initTrackInfo = function () {
		this._start_scroll_top = -1;
		this._start_scroll_left = -1;
		this._end_scroll_top = -1;
		this._end_scroll_left = -1;
		this._pre_idx = -1;
	};

	delete _pGridSelector;

	nexacro._GridResizerControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
		this._is_simple_control = true;
		this._is_track = true;

		this._callback = null;
		this._index = -1;
		this._direction = "";
		this._tracksize = -1;
		this._is_range = false;
		this._movedPos = 0;
		this._is_tracking = false;
		this._no_slide_scroll = true;
	};

	var _pGridResizer = nexacro._createPrototype(nexacro.Component, nexacro._GridResizerControl);
	nexacro._GridResizerControl.prototype = _pGridResizer;
	_pGridResizer._is_subcontrol = true;
	_pGridResizer._type_name = "GridControlResizerControl";

	_pGridResizer.on_create_contents = function () {
	};

	_pGridResizer.on_created_contents = function () {
		this.set_visible(false);
		this._on_apply_tracksize();

		this.set_background("gray");

		var direction = this._direction;
		var resize_cursor;

		if (direction == "horizon") {
			resize_cursor = nexacro.CursorObject("col-resize");
		}
		else {
			resize_cursor = nexacro.CursorObject("row-resize");
		}

		this._control_element.setElementCursor(resize_cursor);
	};

	_pGridResizer._setCallbackFn = function (fn) {
		this._callback = fn;
	};

	_pGridResizer._setIndex = function (idx) {
		this._index = idx;
	};

	_pGridResizer._setDirection = function (dir) {
		if (this._direction != dir) {
			this._direction = dir;
			this._on_apply_direction();
		}
	};

	_pGridResizer._on_apply_direction = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._on_apply_tracksize();

			var direction = this._direction;
			var resize_cursor;

			if (direction == "horizon") {
				resize_cursor = nexacro.CursorObject("col-resize");
			}
			else {
				resize_cursor = nexacro.CursorObject("row-resize");
			}

			this.on_apply_cursor(resize_cursor);
		}
	};

	_pGridResizer._on_apply_status = function (oldstatus, status, olduserstatus, userstatus) {
		nexacro.Component.prototype._on_apply_status(this, oldstatus, status, olduserstatus, userstatus);

		var remove_l = false, remove_t = false, remove_r = false, remove_b = false;
		var direction = this._direction;

		if (direction == "horizon") {
			remove_t = true;
			remove_r = true;
			remove_b = true;
		}
		else {
			remove_l = true;
			remove_r = true;
			remove_b = true;
		}

		this._control_element.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
	};

	_pGridResizer._setTracksize = function (size) {
		if (this._tracksize != size) {
			this._tracksize = size;
			this._on_apply_tracksize();
		}
	};

	_pGridResizer._on_apply_tracksize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var size = this._tracksize;
			var direction = this._direction;
			if (direction == "horizon") {
				this.resize(1, size);
			}
			else if (direction == "vertical") {
				this.resize(size, 1);
			}
		}
	};

	_pGridResizer._moveLeftTo = function (left) {
		this.left = left = left || 0;
		this.move(left, this.top);
	};

	_pGridResizer._moveTopTo = function (top) {
		this.top = top = top || 0;
		this.move(this.left, top);
	};

	_pGridResizer._on_starttrack = function () {
		if (!this._is_alive) {
			return;
		}
		this._movedPos = 0;
		this._is_tracking = true;
	};

	_pGridResizer._on_movetrack = function (x, y) {
		if (!this._is_alive) {
			return;
		}

		var parent = this.parent;
		if (parent.ondrag && parent.ondrag.defaultprevented == true) {
			return;
		}
		if (parent.ondragmove && parent.ondragmove.defaultprevented == true) {
			return;
		}

		if (!this.visible) {
			this.set_visible(true);
		}
		if (this._direction == "horizon") {
			var _x = x - this._movedPos;
			this._moveLeftTo(this.left + _x);
			this._movedPos = x;
		}
		else if (this._direction == "vertical") {
			var _y = y - this._movedPos;
			this._moveTopTo(this.top + _y);
			this._movedPos = y;
		}
	};

	_pGridResizer._on_endtrack = function (x, y) {
		if (!this._is_alive) {
			return;
		}

		var control_elem = this.getElement();
		if (control_elem) {
			if (nexacro._cur_drag_info) {
				nexacro._cur_drag_info = null;
			}

			if (this.visible) {
				this.set_visible(false);
			}

			var parent = this.parent;
			if ((parent.ondrag && parent.ondrag.defaultprevented == true) || (parent.ondragmove && parent.ondragmove.defaultprevented == true)) {
				parent._setGlobalCursor(null, parent);
			}
			else {
				if (this._callback && this._movedPos != 0) {
					if (this._direction == "horizon") {
						this._callback.call(this.parent, x, this._index);
					}
					else if (this._direction == "vertical") {
						this._callback.call(this.parent, y, this._index);
					}
				}
				parent._setGlobalCursor(null, parent);
			}
		}
		this._is_tracking = false;
	};

	delete _pGridResizer;

	nexacro._CellTreeItemControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro._CellTreeControl.call(this, id, left, top, width, height, right, bottom, parent);
		this._grid = this._view;
		this._checkboxObj = "_GridCellControlCheckbox";
	};

	var _pGridTree = nexacro._createPrototype(nexacro._CellTreeControl, nexacro._CellTreeItemControl);
	nexacro._CellTreeItemControl.prototype = _pGridTree;

	_pGridTree.on_destroy_contents = function () {
		nexacro._CellTreeControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridTree._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Component.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridTree._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Component.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridTree._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridTree._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridTree._common_fire_lbuttondown = function (canvasX, canvasY) {
		if (this._btnimg_ctrl && this._grid.treeusebutton != "noclick") {
			if (this._is_elem_area(this._btnimg_ctrl, canvasX, canvasY)) {
				if (this._isEditTypeTree()) {
					var grid = this._grid;
					var cellobj = this._cellobj;
					var datarow = grid._getDataRow(cellobj._rowidx);
					cellobj._tree_lbuttondown = true;

					grid._toggleTreeState(cellobj._rowidx, true);

					if (this._is_alive) {
						cellobj._tree_lbuttondown = false;
					}
				}
			}
		}
	};

	_pGridTree.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		if (touchinfo) {
			this._common_fire_lbuttondown(touchinfo.canvasx, touchinfo.canvasy);
		}
	};

	_pGridTree.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY) {
		this._common_fire_lbuttondown(canvasX, canvasY);
	};

	_pGridTree._common_fire_lbuttonup = function () {
		if (this._cellobj._tree_lbuttondown) {
			this._cellobj._tree_lbuttondown = false;
		}
	};

	_pGridTree.on_fire_user_ontouchend = function () {
		this._common_fire_lbuttonup();
	};

	_pGridTree.on_fire_user_onlbuttonup = function () {
		this._common_fire_lbuttonup();
	};

	_pGridTree._on_treecheckboxclick = function (obj, e) {
		if (!this._is_alive) {
			return;
		}

		var grid = this._grid;
		if (obj == this._chk_ctrl) {
			var cellobj = this._cellobj;
			var cellinfo = this._cellinfo;
			var rowidx = grid._getDataRow(cellobj._rowidx);
			var disprowidx = cellobj._getDisplayRowIdx();

			if (cellinfo.treecheck._bindtype == 1) {
				var checked = grid._treeChecked[rowidx];
				var colid = cellinfo.treecheck._bindexpr;
				var v = (checked == 0) ? 1 : 0;
				grid._binddataset.setColumn(rowidx, colid, v);
			}
			else {
				if (grid._toggleTreeChecked(cellobj._rowidx)) {
					grid._refreshBodyRow(disprowidx);
				}
			}
		}
	};

	_pGridTree.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		if (!this._is_alive) {
			return;
		}

		var obj = from_refer_comp;
		while (obj) {
			if (obj._type_name == "CheckBoxControl") {
				break;
			}

			obj = obj.parent;
		}

		if (this._isEditTypeTree()) {
			this._on_treecheckboxclick(obj);
		}

		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
	};

	_pGridTree._is_elem_area = function (elem, point_x, point_y) {
		var scale = this._getCumulativeZoomFactor() / 100.0;

		var left = elem.left;
		var top = elem.top;
		var width = elem.width * scale;
		var height = elem.height * scale;

		if (point_x >= left && point_x <= (left + width)) {
			if (point_y >= top && point_y <= (top + height)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	};

	_pGridTree._lineUpdate = function (rowidx, level) {
		if (this._grid.treeuseline != this._treeuseline) {
			this._createLines();

			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(this._grid.treeuseline);
			}

			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(this._grid.treeuseline);
			}

			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(this._grid.treeuseline);
			}

			this._treeuseline = this._grid.treeuseline;
		}

		var grid = this._grid;
		var startlevel = this._cellinfo._getTreeStartLevel(rowidx);
		var bExistNextNode = (grid._hasSameNextNode[rowidx]) ? grid._hasSameNextNode[rowidx][1] : false;
		var bRootNode = (startlevel >= level) ? true : false;

		this._createLeftLine(rowidx);
		var ctrl;

		if (this._rightline_ctrl) {
			ctrl = this._rightline_ctrl;
			ctrl._set_line(false, true);
		}
		if (this._upline_ctrl) {
			ctrl = this._upline_ctrl;
			ctrl._set_line(!bRootNode, false);
		}

		if (this._downline_ctrl && !bRootNode && bExistNextNode) {
			ctrl = this._downline_ctrl;
			ctrl._set_line(true, false);
		}
		else if (this._downline_ctrl) {
			this._downline_ctrl.set_visible(false);
		}

		this._treeline_visible(!this._cellobj._hideInner);
	};

	_pGridTree._getRowParentLevel = function (p_level, startrow) {
		var level;
		var cellinfo = this._cellinfo;

		for (var i = startrow; i >= 0; i--) {
			level = cellinfo._getTreeLevel(i);

			if (level == p_level) {
				return i;
			}
			else if (level < p_level) {
				break;
			}
		}
		return -9;
	};

	_pGridTree.__isNextSameLevelInSameParent = function (parentlvl, startrow) {
		var rowcount = this._grid._rowcount;
		var cellinfo = this._cellinfo;
		var level;
		var parentrow = this._getRowParentLevel(parentlvl, startrow);

		if (parentrow >= 0) {
			var retn = this._grid._hasSameNextNode[parentrow];
			return retn[1];
		}
		else {
			for (var i = startrow; i < rowcount; i++) {
				level = cellinfo._getTreeLevel(i);
				if (level < parentlvl) {
					break;
				}
				else if (level == parentlvl) {
					return true;
				}
			}
		}
		return false;
	};

	_pGridTree._createLeftLine = function (rowidx) {
		var grid = this._grid;
		var i = 0, n;
		if (!grid.treeuseline) {
			for (i = 0, n = this._leftline_ctrls.length; i < n; i++) {
				this._leftline_ctrls[i].destroy();
			}
			this._leftline_ctrls = [];

			return;
		}

		var level = this._cellinfo._getTreeLevel(rowidx);
		var parentlevel = level - 1;
		var bExistNextParentNode;
		i = 0;
		var leftlines = this._leftline_ctrls;

		while (grid._rootlevel < parentlevel) {
			bExistNextParentNode = this.__isNextSameLevelInSameParent(parentlevel, rowidx);

			if (bExistNextParentNode) {
				var parentheight = this._getLineHeight();
				var ctrl = leftlines[i];

				if (!ctrl) {
					ctrl = new nexacro._CellTreeLineControl("treeleftline", 0, 0, 1, parentheight, null, null, this.parent);
					ctrl.createComponent();
					this._leftline_ctrls[i] = ctrl;
				}
				else {
					ctrl.set_height(parentheight);
				}

				ctrl._set_line(true, false);
				ctrl._depth = parentlevel;
				i++;
			}
			parentlevel--;
		}

		for (; leftlines.length > i; ) {
			leftlines[leftlines.length - 1].destroy();
			leftlines.splice(leftlines.length - 1, 1);
		}
	};

	delete _pGridTree;

	nexacro._GridCoverControl = function (parent, grid) {
		nexacro.Component.call(this, "gridblur", 0, 0, 0, 0, 0, 0, null, null, null, null, parent);
		this._grid = grid;
	};

	var _pGridCoverControl = nexacro._createPrototype(nexacro.Component, nexacro._GridCoverControl);
	nexacro._GridCoverControl.prototype = _pGridCoverControl;
	_pGridCoverControl._type_name = "GridCoverControl";

	_pGridCoverControl._is_subcontrol = true;
	_pGridCoverControl._is_scrollable = false;
	_pGridCoverControl._is_nc_control = true;
	_pGridCoverControl._is_simple_control = true;

	_pGridCoverControl.on_create_contents = function () {
		this.set_visible(false);
		this.set_background("#ffffff");
		this.set_opacity("0.8");
	};

	_pGridCoverControl.on_destroy_contents = function () {
		this._grid = null;
	};

	_pGridCoverControl._coverOn = function (srow, erow) {
		var grid = this._grid;
		var rowsize = grid._bodyrowheight;
		var body = this.parent;
		var top = body._getClientTop() + grid._fixed_height;
		var left = body._getClientLeft();
		var width = body._getClientWidth();
		var height = body._getClientHeight();
		var tpos = srow * rowsize;

		if (erow != undefined) {
			var epos = erow * rowsize;
			height = epos - tpos;
		}
		else {
			height -= tpos;
		}

		this.move(left, top + tpos, width, height);

		this.set_visible(true);
	};

	_pGridCoverControl._coverOff = function () {
		if (this.visible) {
			this.set_visible(false);
			return true;
		}
		return false;
	};

	delete _pGridCoverControl;

	nexacro._GridRowControl = function (parent, left, top, width, height, rowidx, temp, floating, right, bottom) {
		nexacro.Component.call(this, "gridrow_" + rowidx, left, top, width, height, right, bottom, null, null, null, null, parent);


		this._grid = parent.parent;
		this._band = parent;
		this._cells = [];
		this._rowidx = rowidx;
		this._row_sizes = [];
		this._row_tops = [];
		this._row_bottoms = [];
		this._format_rows = [];
		this._format_cols = [];
		this._format_cells = [];
		this._noupdate_remain_cells = [];
		this.accessibilityrole = "none";
		this._fixed = false;
		this._is_temp = !!temp;
		this._use_translate_move = true;
		this._use_translate_scroll = true;
		this._is_nc_control = this._floating = !!floating;
	};

	var _pGridRow = nexacro._createPrototype(nexacro.Component, nexacro._GridRowControl);
	nexacro._GridRowControl.prototype = _pGridRow;

	_pGridRow._is_subcontrol = true;
	_pGridRow._is_scrollable = false;

	_pGridRow._type_name = "GridRowControl";
	_pGridRow._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridRow.createCommand = function () {
		var str = "";
		if (!this._is_loading) {
			var enable = this._isEnable();

			if ((this._real_enable == null && enable == false) || (this._real_enable && this._real_enable != enable)) {
				this._real_enable = enable;
				this._changeStatus("disabled", !enable);
				this.on_apply_prop_enable(enable);
			}
			else {
				this._real_enable = enable;
			}

			var control_elem = this._control_element;
			if (control_elem) {
				str = control_elem.createCommandStart();

				str += control_elem.createCommandAreaStart("left");
				str += this.on_create_contents_command("left");
				str += control_elem.createCommandAreaEnd("left");

				str += control_elem.createCommandAreaStart("body");
				str += this.on_create_contents_command("body");
				str += control_elem.createCommandAreaEnd("body");

				str += control_elem.createCommandAreaStart("right");
				str += this.on_create_contents_command("right");
				str += control_elem.createCommandAreaEnd("right");

				str += control_elem.createCommandEnd();
			}

			if (!this._is_subcontrol) {
				this._registerHotkey();
			}

			this._is_create_commandstr = true;
		}
		return str;
	};

	_pGridRow.on_create_contents = function () {
		if (this._is_temp) {
			return;
		}

		this._init(this._grid._curFormat);

		if (this._grid._async_create) {
			this._createCellComponents_async();
		}
		else {
			this._createCellComponents();
		}
	};

	_pGridRow.on_created_contents = function () {
		if (this._is_temp) {
			return;
		}

		this._control_element.setElementHScrollPos(this._grid._getScrollLeft());

		if (this._grid._async_create) {
			this._createCellElements_async(false);
		}
		else {
			this._createCellElements(0, false);
		}

		this._control_element._setContainerMaxWidth((this._grid._bodyBand ? this._grid._bodyBand._scrollWidth : 0));
	};

	_pGridRow.on_create_contents_command = function (area) {
		if (this._grid._async_create) {
			return "";
		}

		var str = this._createCellElements(0, true, area);

		return str;
	};

	_pGridRow.on_attach_contents_handle = function (win) {
		if (this._grid._async_create) {
			nexacro._GridRowControl.prototype.on_created_contents.call(this);
			return;
		}

		var cells = this._cells;
		var cells_len = cells.length;

		if (cells_len == 0) {
			return;
		}

		var grid = this._grid, subcells, subcells_len, update = false;

		if (this._rowidx < 0 || grid._is_created == true) {
			update = true;
		}

		for (var i = 0; i < cells_len; i++) {
			cells[i].attachHandle(win);

			subcells = cells[i].subcells;
			subcells_len = subcells.length;

			for (var j = 0; j < subcells_len; j++) {
				subcells[j].attachHandle(win);
			}
		}
	};

	_pGridRow.on_destroy_contents = function () {
		var cells = this._cells, cells_len = cells.length;

		for (var i = 0; i < cells_len; i++) {
			cells[i].destroy();
		}

		this._grid = this._cells = this._format = this._band = this._cells = this._row_sizes = this._row_tops = this._row_bottoms = this._format_rows = this._format_cols = this._format_cells = this._noupdate_remain_cells = null;
	};

	_pGridRow.on_getIDCSSSelector = function () {
		return "row";
	};

	_pGridRow.on_fire_onclick = function () {
		if (nexacro._isTouchInteraction) {
			this._grid._hideEditor();
		}
	};

	_pGridRow.on_create_control_element = function (parent_elem) {
		var control_elem;
		var gap = 0;

		if (this._floating) {
			var border = this._border;
			gap = this._grid._floating_gap + ((border) ? border.left._width : 0);
		}

		if (!this._is_temp) {
			control_elem = new nexacro.GridRowControlElement(parent_elem, gap);
		}
		else {
			control_elem = new nexacro.ControlElement(parent_elem);
		}

		var format = this._grid._curFormat;

		control_elem.setLinkedControl(this);
		control_elem._left_width = format.leftWidth;
		control_elem._right_width = format.rightWidth;
		this._control_element = control_elem;
		return control_elem;
	};

	_pGridRow._apply_setfocus = function (evt_name, self_flag) {
		if (self_flag) {
			nexacro.Component.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pGridRow._getAccessibilityLabel = function () {
		var label = "";
		var grid = this._grid;
		if (grid._isSelectRowType()) {
			var cellLabel = "";
			var cells = this._cells;

			for (var i = 0, n = cells.length; i < n; i++) {
				cellLabel = cells[i]._getAccessibilityLabel(true);
				if (label) {
					if (cellLabel) {
						label += " " + cellLabel;
					}
				}
				else {
					label = cellLabel;
				}
			}
		}
		return label;
	};

	_pGridRow.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		var cells = this._cells;
		var _rtldirection = this._rtldirection;

		if (cells) {
			for (var i = 0, n = cells.length; i < n; i++) {
				cells[i].set_rtldirection(_rtldirection);
			}
		}
	};

	_pGridRow._init = function (format) {
		var grid = this._grid, control_elem = this._control_element;

		control_elem.setArea(format.leftWidth, format.rightWidth);

		if (this._rowidx == -1) {
			this._format_rows = format._headrows;
			this._format_cells = format._headcells;
		}
		else if (this._rowidx == -2) {
			this._format_rows = format._summrows;
			this._format_cells = format._summcells;
		}
		else {
			this._format_rows = format._bodyrows;
			this._format_cells = format._bodycells;
		}

		this._format_cols = format._cols;

		if (!this._format_cols) {
			this._format_cols = [];
		}

		if (!this._format_rows) {
			this._format_rows = [];
		}

		if (!this._format_cells) {
			this._format_cells = [];
		}

		var rowSizeListSub, datarow = 0;

		if (this._rowidx == -1) {
			rowSizeListSub = grid._rowHeadListSub;
		}
		else if (this._rowidx == -2) {
			rowSizeListSub = grid._rowSummListSub;
		}
		else {
			datarow = grid._getDataRow(this._rowidx);
			rowSizeListSub = grid._rowSizeListSub;
		}

		var rows = this._format_rows, rows_len = rows.length, size = 0, top = 0, i;

		this._row_tops = [];
		this._row_sizes = [];
		this._row_bottoms = [];

		if (datarow >= 0) {
			var start = datarow * rows_len;

			if (!this._floating) {
				for (i = 0; i < rows_len; i++) {
					this._row_tops.push(top);
					size = (rowSizeListSub.length > 0) ? rowSizeListSub[start + i] : rows[i].size;
					this._row_sizes.push(size);
					top += size;
					this._row_bottoms.push(top);
				}
			}
			else {
				for (i = 0; i < rows_len; i++) {
					this._row_tops.push(top);
					size = rows[i].size;
					this._row_sizes.push(size);
					top += size;
					this._row_bottoms.push(top);
				}
			}
		}
		else {
			for (i = 0; i < rows_len; i++) {
				this._row_tops.push(top);
				size = (rowSizeListSub.length > 0) ? rowSizeListSub[i] : rows[i].size;
				this._row_sizes.push(size);
				top += size;
				this._row_bottoms.push(top);
			}
		}
	};

	_pGridRow._setTempCursor = function (cursor) {
		var cells = this._cells;

		for (var i = 0, n = cells.length; i < n; i++) {
			if (cursor) {
				cells[i]._temp_cursor = cells[i].cursor;
			}
			else {
				cursor = cells[i]._temp_cursor;
			}

			cells[i]._updateCursor(cursor);
		}
		this._updateCursor(cursor);
	};

	_pGridRow._on_last_lbuttonup = function () {
		this.parent._on_last_lbuttonup();
	};

	_pGridRow._on_last_keyup = function () {
		this.parent._on_last_keyup();
	};

	_pGridRow._updateAll = function (status, is_remain_cell, onlycontents, for_select, startcol, removecell) {
		var grid = this._grid, cells = this._cells;

		if (is_remain_cell) {
			cells = this._noupdate_remain_cells;
		}

		var cells_len = cells.length, datarow = grid._getDataRow(this._rowidx), subcells, subcellsLen, cell, cellinfo, selected, is_change, exprbindcells = null;

		this._noupdate_remain_cells = [];
		this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);

		if (for_select) {
			exprbindcells = grid._getUseBindExprProp("body");
		}

		var k = 0;

		for (var i = 0; i < cells_len; i++) {
			cell = cells[i];
			cellinfo = cell._refinfo;

			if (removecell && removecell == cell) {
				continue;
			}

			if (startcol) {
				if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
					continue;
				}
			}

			if (cell._refinfo._area != "body" || (cell._is_created && cell._isUpdateArea())) {
				if (grid._isSelectRowType()) {
					if (selected == undefined) {
						selected = grid._isSelectedCell(cell._cellidx, datarow);
					}
				}
				else {
					selected = grid._isSelectedCell(cell._cellidx, datarow);
				}

				is_change = false;
				if (cell.selected != selected) {
					cell.selected = selected;
					onlycontents = false;
					is_change = true;
				}
				subcells = cell.subcells;
				subcellsLen = subcells.length;

				for (var j = 0; j < subcellsLen; j++) {
					subcells[j].selected = selected;
				}

				if (for_select) {
					if (is_change) {
						cell._updateAll(status, onlycontents);
					}
					else {
						if (exprbindcells) {
							if (exprbindcells[k] != undefined && cell._cellidx == exprbindcells[k]) {
								cell._updateAll(status, onlycontents);
								k++;
							}
						}
					}
				}
				else {
					cell._updateAll(status, onlycontents);
				}
			}
			else {
				this._noupdate_remain_cells.push(cell);
			}
		}
	};

	_pGridRow._getAreaRect = function (area) {
		var rect = {
			left : 0, 
			top : 0, 
			width : 0, 
			height : 0
		}, format = this._grid._curFormat;

		rect.top = this._getClientTop();
		rect.height = this._getClientHeight();

		if (area == "left") {
			rect.left = this._getClientLeft();
			rect.width = format.leftWidth;
		}
		else if (area == "right") {
			rect.left = this._getClientWidth() - format.rightWidth;
			rect.width = format.rightWidth;
		}
		else {
			rect.left = format.leftWidth;
			rect.width = this._getClientWidth() - format.leftWidth - format.rightWidth;
		}
		return rect;
	};

	_pGridRow._changeRow = function (row, init) {
		if (this._rowidx == row) {
			return false;
		}

		this._rowidx = row;

		if (init) {
			this._init(this._grid._curFormat);
		}

		return true;
	};

	_pGridRow._hideArea = function () {
		if (this._fixed) {
			return "";
		}

		var band = this._band;
		var grid = this._grid;
		var scrolltop = grid._getScrollTop();

		var t = this._adjust_top;
		var h = this._adjust_height;
		var b = t + h;

		t -= scrolltop;
		b -= scrolltop;

		var bandrc = grid._getAvailableRect(band);
		var border = band._getCurrentStyleBorder();

		b -= border ? border.top._width : 0;
		b -= border ? border.bottom._width : 0;

		if (b <= 0) {
			return "top";
		}
		else if (t >= bandrc.bottom) {
			return "bottom";
		}

		return "";
	};

	_pGridRow._showfull = function (clickcell) {
		if (!this._fixed) {
			var band = this._band;
			var grid = this._grid;
			var scrolltop = grid._getScrollTop();

			var t = this._adjust_top;
			var h = this._adjust_height;
			var b = t + h;

			t -= scrolltop;
			b -= scrolltop;

			var vscroll = grid._vscrollmng;
			var bandrc = grid._getAvailableRect(band);
			var border = band._getCurrentStyleBorder();

			b -= border ? border.top._width : 0;
			b -= border ? border.bottom._width : 0;

			if (vscroll) {
				if (h < bandrc.height) {
					if (t < 0) {
						vscroll.setRowPos(grid._toprowpos[0]);
					}
					else if (b > bandrc.bottom) {
						vscroll.setRowPos(grid._toprowpos[0] + 1);
					}
				}
			}
		}

		if (clickcell && clickcell._is_alive) {
			clickcell._showfull(false);
		}
	};

	_pGridRow._createCellElements_async = function (bCommandMode) {
		nexacro._OnceCallbackTimer.callonce(this, function () {
			this._createCellElements(0, bCommandMode);
		});
	};

	_pGridRow._createCellComponents = function () {
		var _cols = this._format_cols, _cells = this._format_cells, _row_tops = this._row_tops, _row_bottoms = this._row_bottoms, cellcnt = (_cells) ? _cells.length : 0, _cellinfo, top = 0, left, width, height, cellitem, id, _subcells, _subcellsLen, _subcell, col, row, subcellitem, selected, _subcellinfo, grid = this._grid, datarow = grid._getDataRow(this._rowidx);

		for (var i = 0; i < cellcnt; i++) {
			_cellinfo = _cells[i];

			left = _cols[_cellinfo._col].left;
			top = _row_tops[_cellinfo._row];
			width = _cols[_cellinfo._col + _cellinfo._colspan - 1].right - left;
			height = _row_bottoms[_cellinfo._row + _cellinfo._rowspan - 1] - top;

			if (grid._isSelectRowType()) {
				if (selected == undefined) {
					selected = grid._isSelectedCell(_cellinfo._cellidx, datarow);
				}
			}
			else {
				selected = grid._isSelectedCell(_cellinfo._cellidx, datarow);
			}

			id = "cell_" + this._rowidx + "_" + _cellinfo._cellidx;
			cellitem = new nexacro._GridCellControl(id, left, top, width, height, null, null, this, _cellinfo, this._rowidx, _cellinfo._cellidx);
			cellitem.selected = selected;

			var step = 0;
			switch (_cellinfo._area) {
				case "left":
					step = 1;
					break;
				case "right":
					step = 2;
					break;
			}

			cellitem.set_positionstep(step);
			cellitem.createComponent(true);

			this._cells[i] = cellitem;

			_subcells = _cellinfo._subcells;
			_subcellsLen = _subcells.length;

			for (var j = 0; j < _subcellsLen; j++) {
				_subcellinfo = _subcells[j];
				col = _cellinfo._col + _subcellinfo._col;
				row = _cellinfo._row + _subcellinfo._row;

				left = _cols[col].left;
				top = _row_tops[row];
				width = _cols[col + _subcellinfo._colspan - 1].right - left;
				height = _row_bottoms[row + _subcellinfo._rowspan - 1] - top;

				left -= _cols[_cellinfo._col].left;
				top -= _row_tops[_cellinfo._row];
				id = "subcell_" + this._rowidx + "_" + _cellinfo._cellidx + "_" + _subcellinfo._cellidx;
				subcellitem = new nexacro._GridSubCellControl(id, left, top, width, height, null, null, cellitem, _subcellinfo, this._rowidx, _subcellinfo._cellidx);
				subcellitem.selected = selected;
				subcellitem.parentcell = cellitem;
				subcellitem.createComponent(true);
				cellitem.subcells[j] = subcellitem;
			}
		}
	};

	_pGridRow._createCellElements = function (startcol, bCommandMode, area) {
		var cells = this._cells;
		var cells_len = cells.length;

		if (cells_len == 0) {
			return "";
		}

		var str = "";
		var grid = this._grid, update = false, datarow = grid._getDataRow(this._rowidx), selected, cell_elem, cellinfo;

		if (this._rowidx < 0 || grid._is_created == true) {
			update = true;
		}

		for (var i = 0; i < cells_len; i++) {
			cellinfo = cells[i]._refinfo;

			if (startcol) {
				if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
					continue;
				}
			}

			if (area && cellinfo._area != area) {
				continue;
			}

			if (cellinfo._area == "body") {
				if (grid._isSelectRowType()) {
					if (selected == undefined) {
						selected = grid._isSelectedCell(cells[i]._cellidx, datarow);
					}
				}
				else {
					selected = grid._isSelectedCell(cells[i]._cellidx, datarow);
				}

				cell_elem = cells[i]._control_element;

				if (cells[i]._isUpdateArea() || this._floating) {
					if (cells[i]._is_created) {
						if (cells[i]._refresh_display == true) {
							if (update) {
								cells[i].selected = selected;
								cells[i]._updateAll();
							}

							cells[i]._refresh_display = false;
						}
					}
					else {
						if (update) {
							cells[i].selected = selected;
							cells[i]._updateAll();
						}

						if (bCommandMode) {
							str += cells[i].createCommand();
						}
						else {
							cells[i].on_created();
						}
					}
				}
				else {
					if (cells[i]._is_created) {
						if (cells[i]._refresh_display == false) {
							cells[i]._refresh_display = true;
						}
					}
				}
			}
			else {
				if (cells[i]._is_created) {
					continue;
				}

				if (update) {
					cells[i]._updateAll();
				}
				if (bCommandMode) {
					str += cells[i].createCommand();
				}
				else {
					cells[i].on_created();
				}
			}
		}
		return str;
	};

	_pGridRow._createCellComponents_async = function () {
		nexacro._OnceCallbackTimer.callonce(this, function () {
			this._createCellComponents();
		});
	};

	_pGridRow._resetCellsSize = function (format, startcol) {
		var cols = this._format_cols, cells, cells_len, cell, cellinfo, subcells, subcells_len, subcell, subcellinfo, left, width, top, height, subcol, subrow;

		this._control_element.setArea(format.leftWidth, format.rightWidth);

		cells = this._cells;
		cells_len = cells.length;

		var _row_tops = this._row_tops, _row_bottoms = this._row_bottoms;

		for (var i = 0; i < cells_len; i++) {
			cell = cells[i];
			cellinfo = cell._refinfo;

			if (startcol) {
				if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
					continue;
				}
			}

			left = cols[cellinfo._col].left;
			top = _row_tops[cellinfo._row];
			width = cols[cellinfo._col + cellinfo._colspan - 1].right - left;
			height = _row_bottoms[cellinfo._row + cellinfo._rowspan - 1] - top;

			cell.move(left, top, width, height);
			var expand_ctrl = cell._expandCtrl;
			if (expand_ctrl) {
				var border = cell._getCurrentStyleBorder();
				var padding = cell._getCurrentStylePadding();

				left = width - expand_ctrl.width - ((border) ? border.right._width : 0) - ((padding) ? padding.right : 0);
				expand_ctrl.set_left(left);
			}

			subcells = cell.subcells;
			subcells_len = subcells.length;

			for (var j = 0; j < subcells_len; j++) {
				subcell = subcells[j];
				subcellinfo = subcell._refinfo;

				subcol = cellinfo._col + subcellinfo._col;
				subrow = cellinfo._row + subcellinfo._row;

				left = cols[subcol].left;
				top = _row_tops[subrow];
				width = cols[subcol + subcellinfo._colspan - 1].right - left;
				height = _row_bottoms[subrow + subcellinfo._rowspan - 1] - top;

				left -= cols[cellinfo._col].left;
				top -= _row_tops[cellinfo._row];

				subcell.move(left, top, width, height);
				expand_ctrl = subcell._expandCtrl;
				if (expand_ctrl) {
					left = width - expand_ctrl.width;
					top = expand_ctrl.top;
					width = expand_ctrl.width;
					height = expand_ctrl.height;

					expand_ctrl.move(left, top, width, height);
				}
			}
		}
	};

	_pGridRow._isEnable = function () {
		if (this._grid) {
			return this._grid._enable;
		}

		return true;
	};

	_pGridRow._get_cells = function () {
		return this._cells;
	};

	delete _pGridRow;

	nexacro._GridMatrixManager = function (grid, band) {
		this._width = 0;
		this._height = 0;
		this._grid = grid;
		this._isBody = band._isBody;
		this._rows = [];
		this._band = band;
		this._fixed_rows = [];
	};

	var _pGridMatrixManager = nexacro._createPrototype(nexacro.Object, nexacro._GridMatrixManager);
	nexacro._GridMatrixManager.prototype = _pGridMatrixManager;

	_pGridMatrixManager._is_subcontrol = true;

	_pGridMatrixManager.destroy = function () {
		this._deleteAllRow();
		this._grid = this._band = this._rows = this._fixed_rows = null;
	};

	_pGridMatrixManager._init = function () {
		this._deleteAllRow();
	};

	_pGridMatrixManager._async_create_page = function () {
		return;
	};

	_pGridMatrixManager._getBodyRowTopPos = function (rowidx) {
		if (rowidx < 0) {
			return 0;
		}

		var grid = this._grid, top = 0;

		if (grid._fixed_endrow >= 0 && rowidx >= grid._fixed_startrow && rowidx <= grid._fixed_endrow) {
			if (grid._is_variable_bodyrowsize == false) {
				top = grid._bodyrowheight * (rowidx - grid._fixed_startrow);
			}
			else {
				var rowcnt = grid._fixed_rowcnt;

				for (var i = 0; i < rowcnt; i++) {
					if (grid._fixed_startrow + i == rowidx) {
						break;
					}

					top += grid._getRowSize(grid._fixed_startrow + i);
				}
			}
		}
		else {
			if (grid._is_variable_bodyrowsize == false) {
				top = grid._bodyrowheight * rowidx;
			}
			else {
				var rowcnt = grid._getGridRowCount();

				for (var i = 0; i < rowcnt; i++) {
					if (i == rowidx) {
						break;
					}

					top += grid._getRowSize(i);
				}
			}

			top -= grid._fixedrow_height;
		}
		return top;
	};

	_pGridMatrixManager._getAllRows = function () {
		var rows;

		if (this._isBody && this._fixed_rows.length) {
			rows = [];
			rows = rows.concat(this._fixed_rows);
			rows = rows.concat(this._rows);
		}
		else {
			rows = this._rows;
		}
		return rows;
	};

	_pGridMatrixManager._getPhysicalRow = function (rows, rowidx) {
		var length = rows.length;

		for (var i = 0; i < length; i++) {
			if (rows[i]._rowidx == rowidx) {
				return i;
			}
		}
		return null;
	};

	_pGridMatrixManager._adjustTreeDisplay = function (rowidx, collapse) {
		var update_rows = [], grid = this._grid, band = this._band, rows = this._rows, rows_len = rows.length, toprow = 0, update_row_phidx = this._getPhysicalRow(this._rows, rowidx), update_row = rows[update_row_phidx], sub = false, i;

		if (!update_row) {
			update_row = rows[0];
			update_row_phidx = 0;
		}

		if (update_row) {
			if (collapse) {
				for (i = rows_len - 1; i >= update_row_phidx; i--) {
					if (update_row._rowidx < rows[i]._rowidx) {
						this._subtractRow();
						sub = true;
					}
					else {
						update_rows[0] = rows[i];
					}
				}
			}
			else {
				for (i = update_row_phidx; i < rows_len; i++) {
					if (update_row_phidx == i) {
						update_rows[0] = rows[i];
					}
					else {
						this._subtractRow();
						sub = true;
					}
				}
			}
		}

		if (sub) {
			grid._setHscrollElement();
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementHScrollPos(grid._scroll_left);
			grid._absolutelyResetScrollPos(false);
		}

		var add = this._adjustRowsDisplay();

		rows_len = rows.length;
		band._update_rows = update_rows;

		if (rows_len) {
			toprow = rows[0]._rowidx;
		}

		for (i = 0; i < rows_len; i++) {
			rows[i]._rowidx = toprow + i;
		}

		band._on_refresh_rows();

		var change = grid._resetColSizeList();
		if (change || add) {
			this._adjustColsDisplay(true);
		}
		else {
			grid._resetScrollMax();
		}

		return change;
	};

	_pGridMatrixManager._adjustRowsDisplay = function (reset_bandsize, is_scrolling) {
		var grid = this._grid, add = false, sub = false, rows = this._rows, rows_len = rows.length, addcnt;

		if (this._isBody) {
			if (reset_bandsize) {
				var rowitem, l, t, w, h, gridrowcnt = grid._getGridRowCount();
				for (var i = 0; i < rows.length; i++) {
					rowitem = rows[i];

					if (rowitem._rowidx >= gridrowcnt) {
						rowitem.destroy();
						rows[i] = null;
						rows.splice(i, 1);
						i--;
						sub = true;
					}
					else {
						l = rowitem._adjust_left;
						t = this._getBodyRowTopPos(rowitem._rowidx);
						w = this._band._getClientWidth();
						h = grid._getRowSize(rowitem._rowidx);
						rows[i].move(l, t, w, h);
					}
				}
				rows_len = rows.length;

				var frows = this._fixed_rows;

				for (var i = 0, n = frows.length; i < n; i++) {
					rowitem = frows[i];
					l = rowitem._adjust_left;
					t = this._getBodyRowTopPos(rowitem._rowidx);
					w = this._band._getClientWidth();
					h = grid._getRowSize(rowitem._rowidx);
					frows[i].move(l, t, w, h);
				}
			}


			if (grid._fixed_endrow >= 0 && this._fixed_rows.length == 0) {
				var sfixrow = grid._fixed_startrow;
				var efixrow = grid._fixed_endrow;
				var top = 0, size;

				for (var i = sfixrow; i <= efixrow; i++) {
					size = grid._getRowSize(i);
					if (size < 0) {
						break;
					}

					this._addRow(top, size, i, false, true);
					top += size;
				}
			}


			grid._resetDisplayInfo(reset_bandsize);
			var dispcnt = 0;

			if (grid._disprowcnt > 0) {
				addcnt = (grid._disprowcnt % 2) ? 1 : 2;
				dispcnt = grid._disprowcnt + addcnt;
			}
			var rowcnt = grid._getGridRowCount();
			var variable_size = grid._is_variable_bodyrowsize;

			if (dispcnt < 0) {
				dispcnt = 0;
			}

			if (rowcnt < rows_len) {
				for (var i = rows_len - 1; i >= rowcnt; i--) {
					this._subtractRow();
					sub = true;
				}
				rows_len = rows.length;
			}

			if (dispcnt < rows_len) {
				if (rows_len % 2 == 0) {
					for (var i = rows_len - 1; i >= dispcnt; i--) {
						if (!variable_size) {
							this._subtractRow();
							sub = true;
						}
					}
				}
			}
			else if (dispcnt > rows_len) {
				var size = 0, top = 0, toprow = 0, lastrow = rowcnt - 1;

				if (rows_len > 0) {
					toprow = rows[0]._rowidx;
				}
				else {
					toprow = grid._toprowpos[0];
				}

				var backrow = toprow;
				var newrow, back = false;

				for (var i = rows_len; i < dispcnt; i++) {
					if (rowcnt <= i) {
						break;
					}

					newrow = toprow + i;

					if (lastrow < newrow) {
						newrow = --backrow;
						back = true;
					}

					top = this._getBodyRowTopPos(newrow);
					size = grid._getRowSize(newrow);

					if (newrow <= lastrow && newrow >= grid._getFixRowCnt() && size > 0) {
						this._addRow(top, size, newrow, is_scrolling);
						add = true;
					}
				}
				if (back && add) {
					rows.sort(function (a, b) {
						return a._rowidx - b._rowidx;
					});
				}
			}

			rows_len = rows.length;

			if (grid.fillareatype != "none" && dispcnt > rows_len) {
				var top = 0, size = this._band._datarowsheight;

				if (rows_len) {
					top = rows[rows_len - 1].getOffsetBottom();
				}

				for (var i = rows_len; i < dispcnt; i++) {
					this._addRow(top, size, i, is_scrolling);
					top += size;
					add = true;
				}
			}

			if (rows.length > 0) {
				grid._begrowpos = rows[0]._rowidx;
				grid._endrowpos = rows[rows.length - 1]._rowidx;
			}
			else {
				grid._begrowpos = 0;
				grid._endrowpos = 0;
			}
		}
		else {
			if (reset_bandsize) {
				var rowitem, l, t, w, h, gridrowcnt = grid._getGridRowCount();
				for (var i = 0; i < rows.length; i++) {
					rowitem = rows[i];

					l = rowitem._adjust_left;
					t = rowitem._adjust_top;
					w = this._band._getClientWidth();
					h = this._band._getClientHeight();
					rowitem.move(l, t, w, h);
				}
			}

			if (rows_len == 0) {
				var size;

				if (this._band.id == "head") {
					size = grid._getRowSize(-1);
					this._addRow(0, size, -1);
					add = true;
				}
				else if (this._band.id == "summary") {
					size = grid._getRowSize(-2);
					this._addRow(0, size, -2);
					add = true;
				}
			}
		}

		if (add || sub || rows.length == 0) {
			grid._setHscrollElement();
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementHScrollPos(grid._scroll_left);
			grid._absolutelyResetScrollPos(false);
		}

		return add;
	};

	_pGridMatrixManager._adjustColsDisplay = function (reset_colsize, scrolling, startcol) {
		if (!scrolling) {
			this._grid._resetScrollMax();
		}

		var rows = this._getAllRows(), rows_len = rows.length;

		if (reset_colsize) {
			var format = this._grid._curFormat;

			for (var i = 0; i < rows_len; i++) {
				rows[i]._init(format);
				rows[i].set_width(rows[i].parent._getClientWidth());
				rows[i]._resetCellsSize(format, startcol);

				if (!scrolling) {
					rows[i]._updateAll(null, true, undefined, undefined, startcol);
				}

				rows[i]._createCellElements(startcol);
			}
		}
		else {
			for (var i = 0; i < rows_len; i++) {
				if (!scrolling) {
					rows[i]._updateAll(null, true, undefined, undefined, startcol);
				}

				rows[i]._createCellElements(startcol);
			}
		}
	};

	_pGridMatrixManager._addRow = function (top, height, rowidx, is_scrolling, is_fixed) {
		var rect = this._grid._getAvailableRect(this._band), row = new nexacro._GridRowControl(this._band, rect.left, top, rect.width, height, rowidx);

		row._fixed = !!is_fixed;
		row.createComponent();

		if (!is_scrolling) {
			this._band._create_rows.push(row);
		}

		if (is_fixed) {
			this._fixed_rows.push(row);
		}
		else {
			this._rows.push(row);
		}
	};

	_pGridMatrixManager._subtractRow = function () {
		if (this._rows.length > 0) {
			var rowidx = this._rows.length - 1, row = this._rows[rowidx], create_rows = this._band._create_rows, create_rows_len = create_rows.length;

			for (var i = 0; i < create_rows_len; i++) {
				if (create_rows[i] == row) {
					create_rows.splice(i, 1);
					break;
				}
			}
			row.destroy();
			this._rows.splice(rowidx, 1);
		}
	};

	_pGridMatrixManager._deleteAllRow = function () {
		var rows = this._rows;

		for (var i = 0, n = rows.length; i < n; i++) {
			rows[i].destroy();
		}

		var fixed_rows = this._fixed_rows;

		for (var i = 0, n = fixed_rows.length; i < n; i++) {
			fixed_rows[i].destroy();
		}

		var create_rows = this._band._create_rows;

		for (var i = 0, n = create_rows.length; i < n; i++) {
			create_rows[i].destroy();
		}

		this._band._create_rows = [];
		this._rows = [];
		this._fixed_rows = [];
		this._grid._setHscrollElement();
		this._grid._is_over_scroll = 0;
	};

	_pGridMatrixManager._isShowScreenRow = function (row, scroll_top, client_height) {
		if (row._rowidx < 0) {
			return true;
		}

		var visible_top = scroll_top, visible_bottom = visible_top + client_height;

		if (visible_top < row.getOffsetBottom() && visible_bottom > row._adjust_top) {
			return true;
		}

		return false;
	};

	_pGridMatrixManager._adjustScrollRows = function (vpos, is_updatecontents, each) {
		var grid = this._grid, totalcnt = grid._getGridRowCount(), rows = this._rows, first_rowidx = grid._getFixRowCnt(), last_rowidx = totalcnt - 1, bodyHeight = grid._getBodyClientSize()[1], hide_rows = [], hide_row, r, l, w, h, t, band = this._band, variable_size = grid._is_variable_bodyrowsize, hide_len = 0, dir = 0, hidecnt = 0, target_rowidx, lastPosition = grid._last_scroll_top, b_row_sort = false, b_adjust_row = false, editor = grid._currentCellEditor, swap_row1 = (editor) ? editor.parent.parent : null, swap_row2 = null, editing_rowidx = grid._getGridRow(grid._currentCellRow);

		if (vpos > lastPosition) {
			dir = 1;
		}
		else if (vpos < lastPosition) {
			dir = -1;
		}

		if (!each) {
			each = rows.length;
		}

		var i, n, target_rowidx;
		if (dir > 0) {
			for (i = 0, n = rows.length; i < n; i++) {
				if (this._isShowScreenRow(rows[i], vpos, band._getClientHeight()) == true) {
					break;
				}

				if (each > hide_rows.length) {
					hide_rows.push(rows[i]);
				}

				hidecnt++;
			}

			hide_len = hide_rows.length;

			var prev_rowidx = null;

			if (hide_len > 0) {
				if (rows.length == hidecnt) {
					target_rowidx = grid._toprowpos[0];

					if (target_rowidx % 2 != hide_rows[0]._rowidx % 2) {
						hide_rows.push(hide_rows.shift());
						rows.push(rows.shift());
					}

					for (i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];

						if (i == 0 && hide_row._overrow) {
							break;
						}

						hide_row._overrow = false;
						r = target_rowidx++;

						if (r >= grid.rowcount) {
							if (prev_rowidx == null) {
								prev_rowidx = grid._toprowpos[0] - 1;
							}

							r = prev_rowidx--;
							hide_row._overrow = true;


							if (r < 0) {
								break;
							}
						}

						if (r == editing_rowidx) {
							swap_row2 = hide_row;
						}

						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
				}
				else {
					target_rowidx = rows[rows.length - 1]._rowidx + 1;

					for (i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						hide_row._overrow = false;
						r = target_rowidx++;

						if (!variable_size && r > last_rowidx) {
							break;
						}

						if (r == editing_rowidx) {
							swap_row2 = hide_row;
						}

						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
					b_row_sort = true;
				}
				if (prev_rowidx != null) {
					b_row_sort = true;
				}
			}

			if (variable_size) {
				b_adjust_row = true;
			}
		}
		else if (dir < 0) {
			if (variable_size) {
				this._adjustRowsDisplay(false, true);
			}

			for (i = rows.length - 1; i >= 0; i--) {
				if (this._isShowScreenRow(rows[i], vpos, band._getClientHeight()) == true) {
					break;
				}

				if (each > hide_rows.length) {
					hide_rows.push(rows[i]);
				}

				hidecnt++;
			}

			hide_len = hide_rows.length;

			if (hide_len > 0) {
				if (rows.length == hidecnt) {
					target_rowidx = grid._toprowpos[0];

					if (target_rowidx % 2 != hide_rows[hide_len - 1]._rowidx % 2) {
						hide_rows.push(hide_rows.shift());
						rows.unshift(rows.pop());
					}

					for (i = hide_len - 1; i >= 0; i--) {
						hide_row = hide_rows[i];
						hide_row._overrow = false;
						r = target_rowidx++;

						if (r == editing_rowidx) {
							swap_row2 = hide_row;
						}

						hide_row._changeRow(r, variable_size);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}

					for (i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						r = hide_row._rowidx;
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);
					}
				}
				else {
					target_rowidx = rows[0]._rowidx - 1;

					for (i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						hide_row._overrow = false;
						r = target_rowidx--;

						if (r < first_rowidx) {
							break;
						}

						if (r == editing_rowidx) {
							swap_row2 = hide_row;
						}

						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
					b_row_sort = true;
				}
			}
		}
		else {
			if (is_updatecontents) {
				var prev_rowidx = null;

				target_rowidx = grid._toprowpos[0];

				var org_row, org_rows = rows, orgrows_len = rows.length;

				if (orgrows_len && target_rowidx % 2 != org_rows[0]._rowidx % 2) {
					var oddrow = org_rows.shift();
					org_rows.push(oddrow);
				}

				for (i = 0; i < orgrows_len; i++) {
					org_row = org_rows[i];

					if (i == 0 && org_row._overrow) {
						break;
					}

					org_row._overrow = false;
					r = target_rowidx++;

					if (r >= grid.rowcount) {
						if (prev_rowidx == null) {
							prev_rowidx = grid._toprowpos[0] - 1;
						}

						r = prev_rowidx--;
						org_row._overrow = true;


						if (r < 0) {
							break;
						}
					}

					if (org_row._changeRow(r, variable_size)) {
						if (r == editing_rowidx) {
							swap_row2 = org_row;
						}

						l = org_row._adjust_left;
						w = org_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);

						if (h < 0) {
							continue;
						}

						org_row.move(l, t, w, h);

						if (variable_size) {
							org_row._resetCellsSize(grid._curFormat);
						}

						hide_rows.push(org_row);
					}
				}

				if (prev_rowidx != null) {
					b_row_sort = true;
				}
			}
		}

		if (rows.length > 0) {
			if (swap_row1 && swap_row2 && (swap_row1 != swap_row2)) {
				var tr = swap_row1._rowidx;
				var tl = swap_row1._adjust_left;
				var tt = swap_row1._adjust_top;
				var tw = swap_row1._adjust_width;
				var th = swap_row1._adjust_height;

				swap_row1._changeRow(swap_row2._rowidx, variable_size);
				swap_row1.move(swap_row2._adjust_left, swap_row2._adjust_top, swap_row2._adjust_width, swap_row2._adjust_height);

				swap_row2._changeRow(tr, variable_size);
				swap_row2.move(tl, tt, tw, th);

				if (variable_size) {
					swap_row1._resetCellsSize(grid._curFormat);
					swap_row2._resetCellsSize(grid._curFormat);
				}

				if (hide_rows.length != rows.length) {
					hide_rows.push(swap_row1);
				}

				b_row_sort = true;
			}

			if (b_row_sort) {
				rows.sort(function (a, b) {
					return a._rowidx - b._rowidx;
				});
			}

			if (b_adjust_row) {
				this._adjustRowsDisplay(false, true);
			}

			grid._begrowpos = rows[0]._rowidx;
			grid._endrowpos = rows[rows.length - 1]._rowidx;
		}

		return hide_rows;
	};

	delete _pGridMatrixManager;

	nexacro._GridBandControl = function (id, left, top, width, height, right, bottom, parent, refobj) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
		this._is_subcontrol = true;

		this._isBody = (id == "body");
		this._refinfo = refobj;
		this._grid = parent;
		this._rowsizesperdatarow = null;
		this._datarowsheight = -1;
		this._colinfos = null;
		this._rowinfos = null;
		this._cellsinfo = null;
		this._update_rows = [];
		this._create_rows = [];
		this._text_elem = null;
		this._use_translate_scroll = true;
		this._use_readonly_status = true;

		if (refobj) {
			refobj._bandctrl = this;
		}

		this._matrix = new nexacro._GridMatrixManager(this._grid, this);
		this._scrollWidth = 0;
		this._scrollHeight = 0;
		this._recreating = false;
		this.accessibilityrole = "none";
	};

	var _pGridBand = nexacro._createPrototype(nexacro.Component, nexacro._GridBandControl);
	nexacro._GridBandControl.prototype = _pGridBand;

	_pGridBand._is_subcontrol = true;
	_pGridBand._type_name = "GridBandControl";


	_pGridBand._apply_normalstyleFromInfo = function () {
		var info = this._refinfo;
		var normal_prop = info._property_map;
		var prop, val, datarow = this._grid._currentDSrow;

		for (var i = 0, n = normal_prop.length; i < n; i++) {
			if ((normal_prop[i][3] == true) || (normal_prop[i][0].substring(0, 13) == "accessibility")) {
				prop = normal_prop[i][0];

				if (normal_prop[i][1] == true) {
					val = info._getAttrValue(info[prop], datarow);
				}
				else {
					val = info[prop];
				}

				this["set_" + prop](val);
			}
		}
	};

	_pGridBand._getElementClassCSSSelector = function () {
		var cssarr = nexacro.Component.prototype._getElementClassCSSSelector.call(this);

		if (cssarr) {
			cssarr.push("dummy");
		}

		return cssarr;
	};
	_pGridBand.on_create_contents = function () {
		var control_elem = this.getElement();
		var format = this._grid._curFormat;
		if (control_elem && format) {
			this._apply_normalstyleFromInfo();
			this._recreate_contents();

			if (this._isBody) {
				var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
				text_elem.setElementVisible(false);
				text_elem.setElementTextAlign("center");
				text_elem.setElementVerticalAlign("middle");

				if (this._get_rows().length == 0) {
					var text = this.parent.nodatatext;
					text_elem.setElementText(text);
				}
			}
		}
	};

	_pGridBand.on_created_contents = function (win) {
		var control_elem = this.getElement();
		var format = this._grid._curFormat;

		if (control_elem && format) {
			var text_elem = this._text_elem;
			if (text_elem) {
				text_elem.create(win);
			}

			this._on_refresh_rows();

			var grid = this._grid;
			var _hpos = grid._getScrollLeft();
			var _vpos = grid._getScrollTop();

			if (_hpos > 0) {
				this._matrix._adjustColsDisplay();
				grid._absolutelyResetScrollPos(true);
				grid._control_element.setElementHScrollPos(_hpos);
				grid._absolutelyResetScrollPos(false);
			}

			if (_vpos > 0) {
				grid._absolutelyResetScrollPos(true);
				grid._control_element.setElementVScrollPos(_vpos);
				grid._absolutelyResetScrollPos(false);
			}

			if (nexacro._enableaccessibility && !grid._accept_focus) {
				if (this.accessibilityenable) {
					grid._accept_focus = true;
				}
			}
			this.on_apply_prop_tooltip();
		}
	};

	_pGridBand._on_apply_status = function (oldstatus, status, olduserstatus, userstatus) {
		nexacro.Component.prototype._on_apply_status.call(this, oldstatus, status, olduserstatus, userstatus);

		if (this._isBody) {
			var grid = this._grid;
			var rowcount = grid._getGridRowCount();

			if (this.getElement() && rowcount == 0) {
				if (grid.nodataimage) {
					var val = "transparent " + grid.nodataimage + " center center no-repeat";
					var backgroud = nexacro.BackgroundObject(val, this);
					this._control_element.setElementBackground(backgroud);
				}
			}
		}
	};

	_pGridBand.on_create_contents_command = function () {
		var str = "";
		var control_elem = this.getElement();
		var format = this._grid._curFormat;

		if (control_elem && format) {
			var text_elem = this._text_elem;
			if (text_elem) {
				str += text_elem.createCommand();
			}

			if (this._update_rows.length > 0 || this._create_rows.length > 0) {
				var update_rows = this._update_rows;
				var create_rows = this._create_rows;

				this._on_refresh_rows_physical(update_rows, create_rows, false, false, false);

				for (var i = 0, n = create_rows.length; i < n; i++) {
					str += create_rows[i].createCommand();
				}
				this._update_rows = [];
			}
		}

		return str;
	};

	_pGridBand.on_attach_contents_handle = function (win) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.attachHandle(win);
		}

		for (var i = 0, n = this._create_rows.length; i < n; i++) {
			this._create_rows[i].attachHandle(win);
		}
		this._create_rows = [];

		this.on_apply_text();
		var grid = this._grid;

		if (this.id == "head") {
			grid._applyResizer();
		}

		var _hpos = grid._getScrollLeft();
		var _vpos = grid._getScrollTop();

		if (_hpos > 0) {
			this._matrix._adjustColsDisplay();
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementHScrollPos(_hpos);
			grid._absolutelyResetScrollPos(false);
		}

		if (_vpos > 0) {
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementVScrollPos(_vpos);
			grid._absolutelyResetScrollPos(false);
		}

		if (nexacro._enableaccessibility && !grid._accept_focus) {
			if (this.accessibilityenable) {
				grid._accept_focus = true;
			}
		}
		this.on_apply_prop_tooltip();
	};

	_pGridBand.on_destroy_contents = function () {
		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}
		if (this._refinfo) {
			this._refinfo._bandctrl = null;
			this._refinfo = null;
		}
		this._rows = null;
		this._grid = null;
		this._matrix.destroy();
		this._matrix = null;

		this._colinfos = null;
		this._rowinfos = null;
		this._cellsinfo = null;
		this._update_rows = null;
		this._create_rows = null;
		this._rowsizesperdatarow = null;
		this._scroll_rect_queue = null;
	};

	_pGridBand._update_rect_useaniframe = false;
	_pGridBand.on_change_containerRect = function (width, height) {
		if (this._recreating) {
			return;
		}

		if (this._text_elem) {
			var rect = this._grid._getAvailableRect(this);
			this._text_elem.setElementPosition(rect.left, rect.top);
			this._text_elem.setElementSize(rect.width, rect.height);
		}

		var grid = this._grid;


		if (grid._is_changingRect) {
			if (grid._colautofit) {
				if (grid.autosizingtype == "row" || grid.autosizingtype == "both") {
					if (grid._is_body_wordwrap || grid._is_head_wordwrap || grid._is_summ_wordwrap) {
						grid._resetRowSizeList();
						grid._resetColSizeList();
					}
				}
			}
		}

		if (this._is_created || this._update_size_contents) {
			if (this._update_rect_useaniframe) {
				var pThis = this;

				if (!this._aniframe_clientrect) {
					this._scroll_rect_queue = [];
					this._aniframe_clientrect = new nexacro.AnimationFrame(this, function () {
						pThis._callback_update_rect();
					});
				}

				var cnt = this._scroll_rect_queue.push(1);

				if (cnt == 1) {
					this._aniframe_clientrect.start();
				}
			}
			else {
				this._callback_update_rect(true);
			}
		}
	};

	_pGridBand._callback_update_rect = function (no_ani) {
		var grid = this._grid;

		if (this._isBody) {
			var _vpos = grid._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			grid._last_scroll_top = _vpos;
			grid._toprowpos = grid._getScreenTopRowPos(_vpos);
			grid._bottomrowpos = grid._getScreenBottomRowPos(_vpos);

			if (grid._needUpdateExtinner()) {
				grid._recreate_contents_all(false, false, true);
			}
			else {
				this._matrix._adjustRowsDisplay(true);
				this._matrix._adjustColsDisplay();

				this._update_rows = this._matrix._adjustScrollRows(_vpos, true);
			}
			grid._updateHighlightrowPos();
		}
		else {
			this._matrix._adjustRowsDisplay(true);
			this._matrix._adjustColsDisplay();
		}

		this._on_refresh_rows();

		if (!no_ani) {
			this._scroll_rect_queue.pop();

			if (this._scroll_rect_queue.length > 0) {
				this._aniframe_clientrect.start();
			}
		}
	};

	_pGridBand.on_create_control_element = function (parent_elem) {
		var control_elem = new nexacro.GridBandControlElement(parent_elem, this.id);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};


	_pGridBand._apply_setfocus = function (evt_name, self_flag) {
		if (self_flag || nexacro._enableaccessibility) {
			nexacro.Component.prototype._apply_setfocus.call(this, evt_name);
		}

		if (nexacro._enableaccessibility) {
			this._grid._currentBand = this.id;

			if (this.id == "head") {
				this._grid._currentDSrow = -1;
			}
			else if (this.id == "summary") {
				this._grid._currentDSrow = -2;
			}
			else {
				this._grid._currentDSrow = 0;
			}
		}
	};

	_pGridBand.on_get_accessibility_label = function () {
		return this.id;
	};

	_pGridBand._setAccessibilityStatFocus = function (evt_name) {
		var label = this._getAccessibilityLabel();

		if (this._isBody && this._grid.rowcount <= 0) {
			label += (this._grid.nodatatext) ? this._grid.nodatatext : "";
			this._setAccessibilityLabel(label);
		}
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pGridBand.on_apply_prop_class = function () {
		nexacro.Component.prototype.on_apply_prop_class.call(this);
		this._refresh_contents(true);
	};

	_pGridBand.on_apply_wordWrap = function () {
		this._refresh_contents();
	};

	_pGridBand.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();
		this.tooltiptext = this._refinfo._getTooltipText();

		nexacro.Component.prototype.on_apply_prop_tooltip.call(this);

		if (control_elem) {
			var rows = this._get_rows();
			var cells;

			for (var i = 0, n = rows.length; i < n; i++) {
				cells = rows[i]._cells;

				for (var j = 0, nn = cells.length; j < nn; j++) {
					cells[j].on_apply_prop_tooltip();
				}
			}
		}
	};

	_pGridBand.on_apply_text = function () {
		if (this._text_elem) {
			if (this._isBody && this._get_rows().length == 0) {
				var text = this.parent.nodatatext;
				this._text_elem.setElementVisible(text ? true : false);
				this._text_elem.setElementText(text);
				this._grid._text_elem.setElementVisible(false);
			}
			else {
				this._text_elem.setElementVisible(false);
			}
		}
	};

	_pGridBand.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		var rows = this._matrix._rows;
		var _rtldirection = this._rtldirection;
		if (rows) {
			var left;
			for (var i = 0, n = rows.length; i < n; i++) {
				rows[i].set_rtldirection(_rtldirection);
			}
		}
		this._matrix._adjustColsDisplay(true);
	};

	_pGridBand.on_getIDCSSSelector = function () {
		return this.id;
	};

	_pGridBand.on_apply_prop_enable = function (v) {
		var control_elem = this.getElement();
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (control_elem) {
			var rows = this._get_rows();
			var cells;

			for (var i = 0, n = rows.length; i < n; i++) {
				cells = rows[i]._cells;

				for (var j = 0, nn = cells.length; j < nn; j++) {
					cells[j]._setEnable(v);
				}
			}
		}
	};

	_pGridBand.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (nexacro._isTouchInteraction) {
			this._grid._hideEditor();
		}

		if (this.parent.onnodataareaclick && this.parent.onnodataareaclick._has_handlers) {
			return this.parent.on_fire_onnodataareaclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp.parent, from_refer_comp);
		}
		return false;
	};

	_pGridBand.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.parent.onnodataareadblclick && this.parent.onnodataareadblclick._has_handlers) {
			return this.parent.on_fire_onnodataareadblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp.parent, from_refer_comp);
		}
		return false;
	};

	_pGridBand._on_refresh_rows = function (scrolling, no_update_supp, no_after_apply) {
		var grid = this._grid;
		if (this._control_element.handle) {
			var update_rows = this._update_rows;
			var create_rows = this._create_rows;

			this._on_refresh_rows_physical(update_rows, create_rows, scrolling, no_update_supp, true);

			this._update_rows = [];
			this._create_rows = [];

			this.on_apply_text();

			if (!no_after_apply) {
				grid._applyResizer();
			}

			if (!scrolling) {
				grid._adjustOverlayElements(false, grid._is_use_fakemerge);
			}
		}
	};

	_pGridBand._on_refresh_rows_physical = function (update_rows, create_rows, scrolling, no_update_supp, bCreate) {
		var update_rows_len = update_rows.length;
		var i, create_rows_len = create_rows.length;

		if (this._isBody) {
			var grid = this._grid;
			if (grid._is_created == true) {
				var rows = this._get_rows();
				var rows_len = rows.length;

				if (!no_update_supp) {
					grid._suppressUpdate();
				}

				for (i = 0; i < create_rows_len; i++) {
					var create_row = create_rows[i];

					if (create_row._is_alive) {
						create_row._updateAll();
					}
				}

				var onlycontents = false;

				if (rows_len != update_rows_len) {
					onlycontents = (!grid._isUseBindExprStyle("body") && !grid._is_variable_bodyrowsize && !grid._is_use_fakemerge);
				}

				for (i = 0; i < update_rows_len; i++) {
					if (update_rows[i]._is_alive) {
						update_rows[i]._updateAll(undefined, undefined, onlycontents);
					}
				}

				if (grid._is_use_suppress) {
					var cells = grid._curFormat._bodycells, cells_cnt = cells.length;
					var rowidx, datarow, rowupdate;

					for (var j = 0; j < rows_len; j++) {
						rowidx = rows[j]._rowidx;
						datarow = (grid._hasTree) ? grid._treeIndexes[rowidx] : rowidx;
						rowupdate = false;

						if (grid._mouseovercell && grid._mouseovercell.row == rowidx) {
							rowupdate = true;
						}

						for (i = 0; i < cells_cnt; i++) {
							if (rowupdate || cells[i].suppress != 0) {
								this._refreshRowCell(j, i, grid._isSelectedCell(i, datarow));
							}
						}
					}
				}
			}
		}
		else {
			for (i = 0; i < create_rows_len; i++) {
				create_rows[i]._updateAll();
			}

			for (i = 0; i < update_rows_len; i++) {
				update_rows[i]._updateAll();
			}
		}

		if (bCreate) {
			for (i = 0; i < create_rows_len; i++) {
				create_rows[i].on_created();
			}
		}
	};

	_pGridBand._on_last_lbuttonup = function () {
		this.parent._on_last_lbuttonup();
	};

	_pGridBand._on_last_keyup = function () {
		this.parent._on_last_keyup();
	};

	_pGridBand._refreshRowCell = function (displayrow, cellidx, selected, status, onlycontents) {
		var rows = this._get_rows();
		var cells = rows[displayrow]._cells;
		var grid = this._grid;
		var cell = cells[cellidx];

		if (!cell) {
			return;
		}

		cell.selected = selected;

		var subcells = cell.subcells;
		var subcellsLen = subcells.length;

		for (var i = 0; i < subcellsLen; i++) {
			subcells[i].selected = selected;
		}
		cell._updateAll(status, onlycontents);
	};

	_pGridBand._refreshRow = function (displayrow, status, for_select, removecell) {
		var rows = this._get_rows();
		var row = rows[displayrow];
		row._updateAll(status, false, undefined, for_select, null, removecell);
	};

	_pGridBand._refreshCelltype = function (celltype, clearCurstyle) {
		var format = this.parent._curFormat;

		function checktype (cells, celltype) {
			var cells_len = cells.length;

			for (var i = 0; i < cells_len; i++) {
				if (cells[i].celltype == celltype) {
					return true;
				}
			}
			return false;
		}

		if (celltype == "head") {
			if (format._bodycells) {
				if (checktype(format._bodycells, celltype)) {
					this.parent._refreshBody(clearCurstyle);
				}
			}
			if (format._summcells) {
				if (checktype(format._summcells, celltype)) {
					this.parent._refreshSumm(clearCurstyle);
				}
			}
		}
		else if (celltype == "summary") {
			if (format._bodycells) {
				if (checktype(format._bodycells, celltype)) {
					this.parent._refreshBody(clearCurstyle);
				}
			}
			if (format._headcells) {
				if (checktype(format._headcells, celltype)) {
					this.parent._refreshHead(clearCurstyle);
				}
			}
		}
		else {
			if (format._summcells) {
				if (checktype(format._summcells, celltype)) {
					this.parent._refreshSumm(clearCurstyle);
				}
			}
			if (format._headcells) {
				if (checktype(format._headcells, celltype)) {
					this.parent._refreshHead(clearCurstyle);
				}
			}
		}
	};

	_pGridBand._refresh_contents = function (clearCurstyle) {
		if (clearCurstyle) {
			var rows = this._get_rows();
			var rowsLen = rows.length;
			var cells, cellsLen, cell;

			for (var i = 0; i < rowsLen; i++) {
				cells = rows[i]._cells;
				cellsLen = cells.length;

				for (var j = 0; j < cellsLen; j++) {
					cell = cells[j];
				}
			}
		}

		if (this.id == "head") {
			this.parent._refreshHead(clearCurstyle);
			this._refreshCelltype("head", clearCurstyle);
		}
		else if (this.id == "summary") {
			this.parent._refreshSumm(clearCurstyle);
			this._refreshCelltype("summary", clearCurstyle);
		}
		else {
			this.parent._refreshBody(clearCurstyle);
			this._refreshCelltype("body", clearCurstyle);
		}
	};

	_pGridBand._isEnable = function () {
		if (this._grid) {
			return this._grid._isEnable();
		}
		return true;
	};

	_pGridBand._get_cols = function (format) {
		var cols = format._cols, cols_len = cols.length, col, left_cols = [], right_cols = [], body_cols = [];

		for (var i = 0; i < cols_len; i++) {
			col = cols[i];
			if (col._area == "left") {
				left_cols.push(col.size);
			}
			else if (col._area == "right") {
				right_cols.push(col.size);
			}
			else {
				body_cols.push(col.size);
			}
		}

		this._colinfos = cols;
		return [body_cols, left_cols, right_cols];
	};

	_pGridBand._recreate_contents = function (init_scroll, scrolling, no_hide_edit, no_update_supp) {
		var grid = this._grid, format = grid._curFormat, rows;

		this._matrix._init();

		if (!format) {
			return;
		}

		this._create_rows = [];
		this._update_rows = [];
		this._rowsizesperdatarow = [];
		this._recreating = true;

		if (this.id == "head") {
			if (grid._focused_row == -1) {
				this._grid._focused_row = undefined;
				this._grid._focused_cell = undefined;
			}
			rows = format._headrows;
			this._datarowsheight = format.headHeight;
		}
		else if (this.id == "summary") {
			if (grid._focused_row == -2) {
				this._grid._focused_row = undefined;
				this._grid._focused_cell = undefined;
			}
			rows = format._summrows;
			this._datarowsheight = format.summHeight;
		}
		else {
			if (grid._focused_row >= 0) {
				this._grid._focused_row = undefined;
				this._grid._focused_cell = undefined;
			}
			rows = format._bodyrows;
			grid._rowheight = this._datarowsheight = format._body_height;
		}

		var rows_len = rows ? rows.length : 0, row;

		for (var i = 0; i < rows_len; i++) {
			this._rowsizesperdatarow.push(rows[i].size);
		}

		var hpos = (grid._hscrollmng) ? grid._hscrollmng.pos : 0, vpos = (grid._vscrollmng) ? grid._vscrollmng.pos : 0, _vpos = (grid._vscrollmng) ? grid._vscrollmng._pos : 0;

		if (this._isBody) {
			this._control_element._setFixArea(grid._fixed_height);

			if (!scrolling && !no_hide_edit) {
				grid._hideEditor();
			}

			var rowcnt = grid._getGridRowCount();

			grid._resetScrollMax(this);
			this._control_element._resetExtendContainer();

			var vlimit = grid._control_element.vscroll_limit;

			if (_vpos < 0) {
				_vpos = 0;
			}
			else if (_vpos > vlimit) {
				_vpos = vlimit;
			}

			grid._toprowpos = grid._getScreenTopRowPos(_vpos);
			grid._bottomrowpos = grid._getScreenBottomRowPos(_vpos);

			if (_vpos == 0) {
				this._matrix._adjustRowsDisplay();
				this._matrix._async_create_page();
			}
			else {
				this._matrix._adjustRowsDisplay();
			}

			if (!grid._headBand && !grid._summBand) {
				grid._setScrollMaxSize(this._scrollWidth, this._scrollHeight, this._band_scroll_tops);
			}

			if (grid._is_created && !grid._autofiting) {
				this._on_refresh_rows(false, no_update_supp);
				grid._applyAutofittype(true);
			}
		}
		else {
			this._scrollWidth = format.bodyWidth;
			this._matrix._adjustRowsDisplay();
			grid._setScrollMaxSize(this._scrollWidth);

			if (grid._is_created && !grid._autofiting) {
				this._on_refresh_rows(false, no_update_supp);
			}
		}

		var lastfocus = grid._find_lastFocused();
		if (lastfocus == grid) {
			grid._control_element.setElementFocus();
		}

		var hlimit = grid._control_element.hscroll_limit;

		if (hpos < 0) {
			hpos = 0;
		}
		else if (hpos > hlimit) {
			hpos = hlimit;
		}

		if (this._isBody) {
			if (hpos > 0) {
				if (init_scroll) {
					grid._hscrollmng.setPos(0);
					grid._control_element.setElementHScrollPos(0);
				}
				else {
					if (grid._control_element._target_hscroll_elements) {
						this._matrix._adjustColsDisplay();
						grid._absolutelyResetScrollPos(true);
						grid._control_element.setElementHScrollPos(hpos);
						grid._absolutelyResetScrollPos(false);
					}
				}
			}
			if (_vpos > 0) {
				if (init_scroll) {
					grid._vscrollmng.setPos(0);
					this._control_element.setElementVScrollPos(0);
					this._is_over_scroll = 0;
				}
				else {
					grid._absolutelyResetScrollPos(true);
					grid._control_element.setElementVScrollPos(_vpos);
					grid._absolutelyResetScrollPos(false);
				}
			}
		}
		else {
			if (hpos > 0) {
				if (init_scroll) {
					grid._hscrollmng.setPos(0);
					grid._control_element.setElementHScrollPos(0);
				}
				else {
					this._matrix._adjustColsDisplay();
					grid._absolutelyResetScrollPos(true);
					grid._control_element.setElementHScrollPos(hpos);
					grid._absolutelyResetScrollPos(false);
				}
			}
		}
		this._recreating = false;
	};

	_pGridBand._get_rows = function () {
		return this._matrix._getAllRows();
	};

	_pGridBand._get_row = function (dataRowIdx) {
		if (!this._is_created) {
			return null;
		}

		var rows = this._get_rows();
		var rows_len = (rows) ? rows.length : 0;
		var cells;
		var grid = this._grid;
		var datarow;

		for (var i = 0; i < rows_len; i++) {
			datarow = grid._getDataRow(rows[i]._rowidx);

			if (dataRowIdx == datarow) {
				return rows[i];
			}
		}
		return null;
	};

	_pGridBand._updateAll = function (clearCurstyle) {
		if (this.getElement()) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
	};

	delete _pGridBand;

	nexacro._GridHScrollManager = function (grid) {
		this.max = 0;
		this.min = 0;
		this.pos = 0;
		this.line = 0;
		this.page = 0;
		this.view = 0;

		this._pos = 0;
		this._min = 0;
		this._max = 0;
		this._orgmax = 0;
		this._grid = grid;
	};

	var _pGridHScrollManager = nexacro._GridHScrollManager.prototype = nexacro._createPrototype(nexacro.Object, nexacro._GridHScrollManager);

	_pGridHScrollManager.setPos = function (v, evt_kind, evtsync) {
		if (v < this.min) {
			v = this.min;
		}
		if (v > this.max) {
			v = this.max;
		}

		if (this.pos != v) {
			this.pos = v;
			this._pos = this._scroll_convert_pixel(v);
		}
		if (!evtsync) {
			this._grid._scrollTo(this._pos, this._grid._vscroll_pos, undefined, true, undefined, evt_kind);
		}
	};

	_pGridHScrollManager.destroy = function () {
		this._grid = null;
	};

	_pGridHScrollManager._scroll_convert_pixel = function (v) {
		return v;
	};

	_pGridHScrollManager._scroll_reverse_convert = function (v) {
		return [v, v];
	};

	_pGridHScrollManager._setInfo = function (left, top, width, height, si_min, si_max, si_line, si_page, si_view, si_pos) {
		var posarr = this._scroll_reverse_convert(si_min);
		this.min = posarr[0];
		this._min = posarr[1];

		posarr = this._scroll_reverse_convert(si_max, false, true);
		this.max = posarr[0];
		this._max = posarr[1];
		this._orgmax = si_max;

		this.line = si_line;
		this.page = si_page;
		this.view = si_view;

		posarr = this._scroll_reverse_convert(si_pos);
		this.pos = posarr[0];
		this._pos = posarr[1];

		if (this._pos < this._min) {
			this.pos = this.min;
			this._pos = this._min;
		}
		if (this._pos > this._max) {
			this.pos = this.max;
			this._pos = this._max;
		}
	};

	delete _pGridHScrollManager;

	nexacro._GridVScrollManager = function (grid) {
		this.max = 0;
		this.min = 0;
		this.pos = 0;
		this.line = 0;
		this.page = 0;
		this.view = 0;

		this._pos = 0;
		this._min = 0;
		this._max = 0;
		this._orgmax = 0;
		this._grid = grid;
	};

	var _pGridVScrollManager = nexacro._GridVScrollManager.prototype = nexacro._createPrototype(nexacro.Object, nexacro._GridVScrollManager);

	_pGridVScrollManager.setPos = function (v, evt_kind) {
		if (v < this.min) {
			v = this.min;
		}
		if (v > this.max) {
			v = this.max;
		}

		if (this.pos != v) {
			this.pos = v;
			this._pos = this._scroll_convert_pixel(v);
		}
		this._grid._scrollTo(this._grid._hscroll_pos, this._pos, undefined, true, undefined, evt_kind);
	};

	_pGridVScrollManager.setPixelPos = function (v, evt_kind, adjustrow, evtsync) {
		if (v < this._min) {
			v = this._min;
		}
		if (v > this._max) {
			v = this._max;
		}

		this._no_set_scrollinfo = true;
		if (this._pos != v) {
			if (adjustrow) {
				var posarr = this._scroll_reverse_convert(v);
				this.pos = posarr[0];
				this._pos = posarr[1];
			}
			else {
				this.pos = this._scroll_reverse_convert(v)[0];
				this._pos = v;
			}
		}

		if (!evtsync) {
			this._grid._scrollTo(this._grid._hscroll_pos, this._pos, undefined, true, undefined, evt_kind);
		}
	};

	_pGridVScrollManager.setRowPos = function (v, evt_kind) {
		var grid = this._grid;
		v -= grid._getFixRowCnt();

		if (grid._scrollpixel == "all") {
			v = this._scroll_convert_pixel(v, true);
		}
		this.setPos(v, evt_kind);
	};

	_pGridVScrollManager._setInfo = function (left, top, width, height, si_min, si_max, si_line, si_page, si_view, si_pos) {
		var posarr = this._scroll_reverse_convert(si_min);
		this.min = posarr[0];
		this._min = posarr[1];

		posarr = this._scroll_reverse_convert(si_max, false, true);
		this.max = posarr[0];
		this._max = posarr[1];
		this._orgmax = si_max;

		this.line = si_line;
		this.page = si_page;
		this.view = si_view;

		posarr = this._scroll_reverse_convert(si_pos);
		this.pos = posarr[0];
		this._pos = posarr[1];

		if (this._pos < this._min) {
			this.pos = this.min;
			this._pos = this._min;
		}
		if (this._pos > this._max) {
			this.pos = this.max;
			this._pos = this._max;
		}
	};

	_pGridVScrollManager._scroll_convert_pixel = function (v, is_notcheck) {
		var grid = this._grid;
		var bodyband = grid._bodyBand;

		if (grid._scrollpixel != "all" || is_notcheck) {
			if (bodyband) {
				var srowidx = grid._getFixRowCnt();
				var rowidx = v + srowidx;

				if (grid._is_variable_bodyrowsize) {
					var height = 0, row;

					for (var i = srowidx; i < rowidx; i++) {
						row = grid._getDataRow(i);
						height += grid._rowSizeList[row];
					}
					v = height;
				}
				else {
					v = (rowidx - srowidx) * bodyband._datarowsheight;
				}
			}
		}

		return v;
	};

	_pGridVScrollManager._scroll_reverse_convert = function (v, is_notcheck, is_max) {
		var grid = this._grid;
		var bodyband = grid._bodyBand;
		var renew = v;

		if (grid._scrollpixel != "all" || is_notcheck) {
			if (bodyband) {
				if (grid._is_variable_bodyrowsize) {
					var srowidx = grid._getFixRowCnt();
					var rowcnt = grid._getGridRowCount();
					var height = 0, row = 0, i;

					if (is_max) {
						for (i = srowidx; i < rowcnt; i++) {
							row = grid._getDataRow(i);

							if (v <= height) {
								row = i;
								renew = height;
								break;
							}
							height += grid._rowSizeList[row];
						}
					}
					else {
						for (i = srowidx; i < rowcnt; i++) {
							row = grid._getDataRow(i);

							if (v < height) {
								row = i - 1;

								if (grid._rowSizeList[row] > bodyband._getClientHeight()) {
									if (height - v < bodyband._getClientHeight()) {
										if (v < this._orgmax) {
											renew = height - bodyband._getClientHeight();
										}
									}
								}
								else {
									if (v < this._orgmax) {
										renew = height - grid._rowSizeList[row];
									}
								}
								break;
							}
							height += grid._rowSizeList[row];
						}
					}
					v = row;
					v -= srowidx;
				}
				else {
					var height = 0, row = 0;

					if (is_max) {
						if (v > 0) {
							row = Math.ceil(v / bodyband._datarowsheight);
						}

						renew = row * bodyband._datarowsheight;
					}
					else {
						if (v == this._orgmax) {
							row = Math.ceil(v / bodyband._datarowsheight);
						}
						else if (v > 0) {
							row = Math.floor(v / bodyband._datarowsheight);
						}

						height = bodyband._datarowsheight * (row + 1);
						if (bodyband._datarowsheight > bodyband._getClientHeight()) {
							if (height - v < bodyband._getClientHeight()) {
								renew = height - bodyband._getClientHeight();
							}
						}
						else {
							renew = row * bodyband._datarowsheight;
						}
					}
					v = row;
				}
			}
		}

		return [v, renew];
	};

	_pGridVScrollManager._checkoverscroll = function (si_pos) {
		var grid = this._grid;

		if (grid._scrollpixel != "all") {
			grid._is_over_scroll = 0;

			if (this._pos > this._orgmax) {
				grid._is_over_scroll = this._pos - this._orgmax;
			}
		}
	};

	_pGridVScrollManager.destroy = function () {
		this._grid = null;
	};

	delete _pGridVScrollManager;

	nexacro.Grid = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);


		this._event_list = {
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
			"onmousedown" : 1, 
			"onmouseup" : 1, 
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
			"ongesture" : 1, 
			"onvscrolllastover" : 1, 
			"onvscroll" : 1, 
			"onhscroll" : 1, 
			"onvtracklast" : 1, 
			"oncellclick" : 1, 
			"onheadclick" : 1, 
			"onsummaryclick" : 1, 
			"oncelldblclick" : 1, 
			"onheaddblclick" : 1, 
			"onsummarydblclick" : 1, 
			"onnodataareaclick" : 1, 
			"onnodataareadblclick" : 1, 
			"onselectchanged" : 1, 
			"onenteredit" : 1, 
			"onenterdown" : 1, 
			"cantreestatuschange" : 1, 
			"ontreestatuschanged" : 1, 
			"onsubselectchanged" : 1, 
			"oncolresizing" : 1, 
			"onrowresizing" : 1, 
			"ondropdown" : 1, 
			"oncloseup" : 1, 
			"onitemchanged" : 1, 
			"onexpanddown" : 1, 
			"oninput" : 1, 
			"onexpandup" : 1, 
			"oncolresized" : 1, 
			"onrowresized" : 1, 
			"oncontextmenu" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"onflingstart" : 1, 
			"onfling" : 1, 
			"onflingend" : 1, 
			"onpinchstart" : 1, 
			"onpinch" : 1, 
			"onpinchend" : 1, 
			"onlongpress" : 1, 
			"onslidestart" : 1, 
			"onslide" : 1, 
			"onslideend" : 1
		};

		this._hscrollmng = new nexacro._GridHScrollManager(this);
		this._vscrollmng = new nexacro._GridVScrollManager(this);


		this._use_readonly_status = true;
		this._use_translate_scroll = false;
		this._is_scrollable = true;
		this._is_locale_control = true;
		this._formats = {
		};
		this._curFormat = null;
		this._headBand = null;
		this._summBand = null;
		this._bodyBand = null;

		this._exprcache = {
		};

		this._selectstartrow = [];
		this._selectstartcol = [];
		this._selectstartsubrow = [];
		this._selectstartpvt = [];
		this._selectendrow = [];
		this._selectendcol = [];
		this._selectendsubrow = [];
		this._selectendpvt = [];
		this._resizerCols = [];
		this._resizerRows = [];
		this._imgsize_cache = {
		};
		this._rowSizeListSub = [];
		this._rowSizeList = [];
		this._rowHeadListSub = [];
		this._rowHeadList = [];
		this._rowSummListSub = [];
		this._rowSummList = [];
		this._begrowpos = 0;
		this._endrowpos = 0;
		this._toprowpos = [0, 0];
		this._bottomrowpos = -1;

		this._selectinfo = {
			rows : [], 
			selects : [], 
			ctrlpoint : {
				"cell" : -1, 
				"col" : -1, 
				"subrow" : -1, 
				"row" : -9, 
				"colspan" : -1, 
				"rowspan" : -1, 
				"_init" : function () {
					this.cell = -1;
					this.col = -1;
					this.subrow = -1;
					this.row = -9;
					this.colspan = -1;
					this.rowspan = -1;
					this.subrowslen = 0;
					this.area = "";
				}, 
				"_set" : function (cellinfo, row, subrowslen) {
					this.cell = cellinfo._cellidx;
					this.col = cellinfo._col;
					this.subrow = cellinfo._row;
					this.row = row;
					this.colspan = cellinfo._colspan;
					this.rowspan = cellinfo._rowspan;
					this.subrowslen = subrowslen;
					this.area = cellinfo._area;
				}
			}, 
			area : [], 
			"curcell" : -1, 
			"curcol" : -1, 
			"curpvt" : -9, 
			"cursubrow" : -1, 
			"curdsrow" : -1, 
			"currow" : -9, 
			"getSelectCells" : function (row) {
				return this.selects[row + 2];
			}, 
			arearect : {
				left : 0, 
				top : 0, 
				width : 0, 
				height : 0, 
				barea : "", 
				earea : ""
			}
		};

		this._text_elem = null;
		this._is_use_suppress = false;
		this._is_head_wordwrap = false;
		this._is_body_wordwrap = false;
		this._is_summ_wordwrap = false;
		this._recreate_contents_proc = [];
		this._keydown_elem = null;
		this._tree_load_all = null;
		this._image_load_all = null;
		this._is_editor_keyaction = true;
		this._focus_proc = null;
		this._after_recreate_contents_all = null;
		this._after_recreate = false;
		this._is_async_recreate = false;
		this._is_after_recreate = false;


		this.accessibilityrole = "grid";
		this._accept_arrow = false;
		this._accept_focus = false;
		this._is_first_focus = false;
		this._is_first_bodycell = false;
		this._is_band_focus = false;
		this._beforegridrowpos = -1;
		this._beforegridcolpos = -1;
		this.accessibilityreadbandlabel = true;


		this._aniframe_rowscroll = null;
		this._aniframe_rowscroll_float = null;
		this._aniframe_colscroll = null;
		this._aniframe_rowscroll_end = null;
		this._aniframe_colscroll_end = null;
		this._aniframe_clientrect = null;

		this._use_bind_expr_cells = {
			body : null, 
			head : null, 
			summ : null
		};
		this._is_use_bind_expr_style = {
			body : null, 
			head : null, 
			summ : null
		};
		this._expr_allrow_update_prop = false;
		this._expr_allrow_update_style = false;

		this._select_ctrl = null;
		this._format_str = null;
		this._track_point = {
			x : -1, 
			y : -1
		};
		this._track_idx = -1;
		this._track_start_info = null;
		this._track_mode = "";
		this._overlay_elements = [];
		this._func_queue = [];
		this._recalcXY_info = null;
		this._fake_mergecell_arr = [];
		this._enable_redraw_history = {
		};
		this._autofitcol_rate = [];
		this._org_treeStates = [];

		this._scroll_vpos_queue = [];
		this._style_tempband = {
		};
		this._blinktask = null;
	};

	var _pGrid = nexacro._createPrototype(nexacro.Component, nexacro.Grid);
	nexacro.Grid.prototype = _pGrid;

	_pGrid._type_name = "Grid";

	_pGrid._rowheight = 24;

	_pGrid._rowcount = 0;
	_pGrid._rowposition = -1;

	_pGrid._beforeheadcellpos = -1;
	_pGrid._beforeheadrowpos = -1;
	_pGrid._beforeheadcolpos = -1;
	_pGrid._beforeheadsubrowpos = -1;

	_pGrid._beforebodycellpos = -1;
	_pGrid._beforebodyrowpos = -1;
	_pGrid._beforebodycolpos = -1;
	_pGrid._beforebodysubrowpos = -1;
	_pGrid._beforepvt = -9;

	_pGrid._beforesummcellpos = -1;
	_pGrid._beforesummrowpos = -1;
	_pGrid._beforesummcolpos = -1;
	_pGrid._beforesummsubrowpos = -1;

	_pGrid._multiselect = "none";

	_pGrid._bodyrowheight = 0;
	_pGrid._mouseRowPos = -9;
	_pGrid._mouseovercell = null;
	_pGrid._mouseCellPos = -1;
	_pGrid._dsEventOccured = false;
	_pGrid._bPivotGrid = false;

	_pGrid._showEditorCell = false;
	_pGrid._showEditRowIdx = -1;
	_pGrid._showEditCellIdx = -1;

	_pGrid._dbclickPreCell = -1;
	_pGrid._dbclickPreCol = -1;
	_pGrid._dbclickPreRow = -9;
	_pGrid._dbclickPreSubrow = -1;
	_pGrid._dbclickPrePvt = -9;
	_pGrid._lbuttondown_proc = false;

	_pGrid._bDragArea = false;
	_pGrid._nDragRow = -1;
	_pGrid._nDragCell = -1;
	_pGrid._nDragPivot = -9;
	_pGrid._nDragEndRow = -1;
	_pGrid._nDragEndCell = -1;
	_pGrid._nDragEndCol = -9;
	_pGrid._nDragBand = -1;
	_pGrid._bShiftClick = false;

	_pGrid._selectClear = false;
	_pGrid._acceptstab = true;

	_pGrid.body = null;
	_pGrid.head = null;
	_pGrid.summ = null;
	_pGrid.summary = null;

	_pGrid.currentcell = -1;
	_pGrid.currentcol = -1;
	_pGrid.currentpivot = -9;
	_pGrid.currentsubrow = -1;
	_pGrid.currentrow = -9;
	_pGrid._currentDSrow = -1;
	_pGrid._currentBand = "body";

	_pGrid.selectcount = 0;
	_pGrid.selectstartrow = -9;
	_pGrid.selectstartcol = -1;
	_pGrid.selectstartsubrow = -1;
	_pGrid.selectstartpivot = -9;
	_pGrid.selectendrow = -9;
	_pGrid.selectendcol = -1;
	_pGrid.selectendsubrow = -1;
	_pGrid.selectendpivot = -9;

	_pGrid.pagerowcount = 0;
	_pGrid._pagerowcnt = 0;
	_pGrid.rowcount = 0;
	_pGrid.pivotcount = 0;
	_pGrid._disprowcnt = 0;

	_pGrid._displaycalendarctrl = null;

	_pGrid.fillareatype = "none";
	_pGrid._resetfillarea = false;
	_pGrid.scrollpixel = "default";
	_pGrid._scrollpixel = (nexacro._isTouchInteraction) ? "all" : "none";
	_pGrid._selectscrollmode = (nexacro._isTouchInteraction) ? "scroll" : "select";
	_pGrid.dragscrolltype = "both";
	_pGrid.hideendline = "none";
	_pGrid.userdata = "";
	_pGrid.nodataimage = "";
	_pGrid.nodatatext = "";
	_pGrid.summarytype = "default";
	_pGrid.suppresslevel = "sameskip";
	_pGrid.useselcolor = true;

	_pGrid.autoupdatetype = "none";
	_pGrid.cellclickbound = "control";
	_pGrid.cellmovingtype = "none";
	_pGrid.cellsizebandtype = "body";
	_pGrid.cellsizingtype = "none";
	_pGrid.extendsizetype = "none";
	_pGrid.readonly = false;
	_pGrid.selectbandtype = "default";
	_pGrid.selectchangetype = "down";
	_pGrid.selecttype = "row";
	_pGrid.wheelscrollrow = 2;
	_pGrid.usecontrolkey = true;
	_pGrid.treeusebutton = "use";
	_pGrid.treeuseline = true;
	_pGrid.treeusecheckbox = true;
	_pGrid.treeuseimage = true;
	_pGrid.treeuseexpandkey = false;
	_pGrid.treeinitstatus = "collapse,null";
	_pGrid.treepathdelimiter = ".";
	_pGrid.useinputpanel = false;
	_pGrid.usesoftkeyboard = true;
	_pGrid._enable = true;
	_pGrid._changeDisplayer = false;
	_pGrid._autoSizeRowProc = false;
	_pGrid._iskey_movetocell = false;


	_pGrid.binddataset = "";
	_pGrid._binddataset = null;

	_pGrid._userRowposChange = false;
	_pGrid._create_selection = null;

	_pGrid.formatid = "";
	_pGrid.formats = "";
	_pGrid.locale = "";
	_pGrid.areaselecttype = "limitband";
	_pGrid.autoenter = "none";
	_pGrid.autofitbandtype = "body";
	_pGrid.autofitminheight = 100;
	_pGrid.autofitminwidth = 100;
	_pGrid.autofittype = "none";
	_pGrid.autosizingtype = "none";
	_pGrid.autosizebandtype = "body";
	_pGrid.selectscrollmode = "default";

	_pGrid._colautofit = false;
	_pGrid._rowautofit = false;
	_pGrid._autofiting = false;
	_pGrid._bodyAutoSize = true;
	_pGrid._headAutoSize = false;
	_pGrid._summAutoSize = false;
	_pGrid._AutoSizeLcol = false;
	_pGrid._AutoSizeRcol = false;
	_pGrid._rowSizeEx = false;
	_pGrid._noInternalvscroll = false;
	_pGrid._is_variable_bodyrowsize = false;
	_pGrid._bGridCtrlLdown = false;
	_pGrid._locale = "";


	_pGrid._fixed_startrow = -9;
	_pGrid._fixed_endrow = -9;
	_pGrid._fixed_height = 0;
	_pGrid._fixedrow_height = 0;
	_pGrid._fixed_rowcnt = 0;
	_pGrid._fixed_row_scrolling = false;

	_pGrid.createcellasync = false;

	_pGrid.cellcombobuttonsize = undefined;
	_pGrid.cellcalendarbuttonsize = undefined;
	_pGrid.cellcomboscrollbarsize = undefined;
	_pGrid.celltextareascrollbarsize = undefined;
	_pGrid.cellcalendarpopuptype = undefined;
	_pGrid.cellcombopopuptype = undefined;
	_pGrid.cellcheckboxsize = undefined;
	_pGrid.cellcalendarpopupsize = undefined;
	_pGrid.cellcombopopupsize = undefined;

	_pGrid.mouseovertype = "default";
	_pGrid.fastvscrolltype = "alldisplay";
	_pGrid.cellexprupdatecondition = "all";

	_pGrid._is_listtype = true;


	_pGrid._accessibility_row = -1;
	_pGrid._accessibility_cellidx = -1;
	_pGrid._skip_mobile_tabfocus = true;

	_pGrid.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
			text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
			text_elem.setElementVisible(false);
			text_elem.setElementTextAlign("center");
			text_elem.setElementVerticalAlign("middle");

			if (this.binddataset && !this._binddataset) {
				var ds = this._findDataset(this.binddataset);
				if (ds) {
					this.setBindDataset(ds);
				}
			}

			this._createBandsAndAreas(true);
		}
	};

	_pGrid.on_created_contents = function (win) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.create(win);
		}

		var head_band = this._headBand;
		if (head_band) {
			head_band.on_created();
		}

		var body_band = this._bodyBand;
		if (body_band) {
			body_band.on_created();
		}

		var summ_band = this._summBand;
		if (summ_band) {
			summ_band.on_created();
		}

		var select_ctrl = this._select_ctrl;
		if (select_ctrl) {
			select_ctrl.on_created();
		}

		if (this._covercontrol) {
			this._covercontrol.on_created();
		}
		if (this._highlight_row_main) {
			this._highlight_row_main.on_created();
		}
		if (this._highlight_row_sublast) {
			this._highlight_row_sublast.on_created();
		}
		if (this._highlight_row_subcenter) {
			this._highlight_row_subcenter.on_created();
		}

		this._onResetScrollBar();

		if (body_band || head_band || summ_band) {
			this._applyAutofittype(true);
		}

		if (this._create_selection != null) {
			var sel = this._create_selection;
			this._resetSelect(sel.row, sel.cell, sel.col, sel.subrow, sel.pivot);
		}

		this._create_selection = null;
		this._is_created = true;

		if (this._tree_recreate == true) {
			this._recreate_contents_all(true, true);
			this._tree_recreate = false;
		}
		else if (this._image_recreate == true) {
			this._recreate_contents_all(true, true);
			this._image_recreate = false;
		}
		else if (this.autosizingtype != "none") {
			this._recreate_contents_all(true, true);
		}
		else {
			this._refreshBody();
		}

		if (nexacro._enableaccessibility && !this._accept_focus) {
			if (this.accessibilityenable) {
				this._accept_focus = true;
			}
		}
		this.on_apply_nodatatext();
		this.on_apply_nodataimage();
		this.on_apply_readonly();
		this._applyResizer();
		this.on_apply_prop_rtldirection();

		if (this._after_resizeband) {
			this._resizeBand();
		}

		this._adjustOverlayElements(true, false);
	};

	_pGrid._on_apply_status = function (oldstatus, status, olduserstatus, userstatus) {
		nexacro.Component.prototype._on_apply_status.call(this, oldstatus, status, olduserstatus, userstatus);

		var rowcount = this._getGridRowCount();
		if (this.getElement() && rowcount == 0 && this._bodyBand == null && this._is_created) {
			if (this.nodataimage) {
				var val = "transparent " + this.nodataimage + " center center";
				var backgroud = nexacro.BackgroundObject(val, this);
				this._control_element.setElementBackground(backgroud);
			}
		}
	};

	_pGrid.on_create_contents_command = function () {
		var command = "";
		var text_elem = this._text_elem;
		if (text_elem) {
			command += text_elem.createCommand();
		}

		var head_band = this._headBand;
		if (head_band) {
			command += head_band.createCommand();
		}

		var body_band = this._bodyBand;
		if (body_band) {
			command += body_band.createCommand();
		}

		var summ_band = this._summBand;
		if (summ_band) {
			command += summ_band.createCommand();
		}
		return command;
	};

	_pGrid.on_attach_contents_handle = function (win) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.attachHandle(win);
		}

		var head_band = this._headBand;
		if (head_band) {
			head_band._control_element._cur_border = head_band._border || head_band._getCSSStyleValue("border", head_band._status);
			head_band.attachHandle(win);
		}

		var body_band = this._bodyBand;
		if (body_band) {
			body_band._control_element._cur_border = body_band._border || body_band._getCSSStyleValue("border", body_band._status);
			body_band.attachHandle(win);
		}

		var summ_band = this._summBand;
		if (summ_band) {
			summ_band._control_element._cur_border = summ_band._border || summ_band._getCSSStyleValue("border", summ_band._status);
			summ_band.attachHandle(win);
		}

		var select_ctrl = this._select_ctrl;
		if (select_ctrl) {
			select_ctrl.attachHandle(win);
		}

		this._onResetScrollBar();

		if (body_band || head_band || summ_band) {
			this._applyAutofittype(true);
		}

		if (this._create_selection != null) {
			var sel = this._create_selection;
			this._resetSelect(sel.row, sel.cell, sel.col, sel.subrow, sel.pivot);
		}

		this._create_selection = null;
		this._is_created = true;

		if (this._tree_recreate == true) {
			this._recreate_contents_all(true, true);
			this._tree_recreate = false;
		}
		else if (this._image_recreate == true) {
			this._recreate_contents_all(true, true);
			this._image_recreate = false;
		}
		else if (this.autosizingtype != "none") {
			this._recreate_contents_all(true, true);
		}
		else {
			this._refreshBody();
		}

		if (nexacro._enableaccessibility && !this._accept_focus) {
			if (this.accessibilityenable) {
				this._accept_focus = true;
			}
		}
		this.on_apply_nodatatext();
		this.on_apply_nodataimage();
		this.on_apply_readonly();
		this._applyResizer();
		this.on_apply_prop_rtldirection();

		if (this._control_element) {
			if (this._control_element._arrangeBandOrder) {
				this._control_element._arrangeBandOrder();
			}
		}

		if (this._after_resizeband) {
			this._resizeBand();
		}

		if (this._select_ctrl) {
			this._select_ctrl.on_created(win);
		}

		if (this._covercontrol) {
			this._covercontrol.on_created();
		}
		if (this._highlight_row_main) {
			this._highlight_row_main.on_created();
		}
		if (this._highlight_row_sublast) {
			this._highlight_row_sublast.on_created();
		}
		if (this._highlight_row_subcenter) {
			this._highlight_row_subcenter.on_created();
		}

		this._adjustOverlayElements(true, this._is_use_fakemerge);
	};

	_pGrid.on_destroy_contents = function () {
		if (this._binddataset) {
			this._removeDSEventHandlers(this._binddataset);
		}

		if (this._aniframe_rowscroll) {
			this._aniframe_rowscroll.destroy();
		}
		if (this._aniframe_rowscroll_float) {
			this._aniframe_rowscroll_float.destroy();
		}
		if (this._aniframe_colscroll) {
			this._aniframe_colscroll.destroy();
		}
		if (this._aniframe_rowscroll_end) {
			this._aniframe_rowscroll_end.destroy();
		}
		if (this._aniframe_colscroll_end) {
			this._aniframe_colscroll_end.destroy();
		}
		if (this._aniframe_clientrect) {
			this._aniframe_clientrect.destroy();
		}

		this._aniframe_rowscroll = null;
		this._aniframe_rowscroll_float = null;
		this._aniframe_colscroll = null;
		this._aniframe_rowscroll_end = null;
		this._aniframe_colscroll_end = null;
		this._aniframe_clientrect = null;

		this._scroll_vpos_queue = null;

		this._destroyHighlightRow();

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}

		var formats = this._formats;
		if (formats) {
			for (var id in formats) {
				var format = formats[id];

				if (format && format.destroy) {
					format.destroy();
					formats[id] = null;
				}
			}
		}
		this._select_ctrl = null;

		this._destroyBands(true);
		this._currentCellEditor = null;

		if (this._displaycalendarctrl) {
			delete this._displaycalendarctrl;
			this._displaycalendarctrl = null;
		}

		this._binddataset = null;
		if (this._resizer_colctrl) {
			this._resizer_colctrl.destroy();
		}
		if (this._resizer_rowctrl) {
			this._resizer_rowctrl.destroy();
		}

		if (this._extratrack_timer) {
			this._extratrack_timer._handle.stop();
			this._extratrack_timer._handle = null;
			this._extratrack_timer = null;
		}

		if (this._style_tempband["head"]) {
			this._style_tempband["head"].destroy();
			this._style_tempband["head"] = null;
		}

		if (this._style_tempband["body"]) {
			this._style_tempband["body"].destroy();
			this._style_tempband["body"] = null;
		}

		if (this._style_tempband["summary"]) {
			this._style_tempband["summary"].destroy();
			this._style_tempband["summary"] = null;
		}
		this._style_tempband = null;
		this._blinktask = null;

		this._destroyOverlayElements();

		this._hscrollmng.destroy();
		this._hscrollmng = null;
		this._vscrollmng.destroy();
		this._vscrollmng = null;
		this._curFormat = null;
		this._formats = null;
		this._mouseovercell = null;
		this._lastmouseentercell = null;
		this._prevAreaCellObj = null;
		this._selectstartrow = null;
		this._selectstartcol = null;
		this._selectstartsubrow = null;
		this._selectstartpvt = null;
		this._selectendrow = null;
		this._selectendcol = null;
		this._selectendsubrow = null;
		this._selectendpvt = null;
		this._resizerCols = null;
		this._resizerRows = null;
		this._imgsize_cache = null;
		this._rowSizeListSub = null;
		this._rowSizeList = null;
		this._rowHeadListSub = null;
		this._rowHeadList = null;
		this._rowSummListSub = null;
		this._rowSummList = null;
		this._toprowpos = null;
		this._selectinfo = null;
		this._recreate_contents_proc = null;
		this._keydown_elem = null;
		this._tree_load_all = null;
		this._image_load_all = null;
		this._focus_proc = null;
		this._after_recreate_contents_all = null;
		this._band_scroll_tops = null;
		this._format_str = null;
		this._exprcache = null;
		this._use_bind_expr_cells = null;
		this._is_use_bind_expr_style = null;
		this._setdataobj = null;
		this._resizer_colctrl = null;
		this._resizer_rowctrl = null;
		this.selectstartrow = null;
		this.selectstartcol = null;
		this.selectstartsubrow = null;
		this.selectstartpivot = null;
		this.selectendrow = null;
		this.selectendcol = null;
		this.selectendsubrow = null;
		this.selectendpivot = null;
		this.formats = null;
		this._overlay_elements = null;
		this._recalcXY_info = null;
		this._fake_mergecell_arr = null;
		this._enable_redraw_history = null;
		this._autofitcol_rate = null;
		this._org_treeStates = null;
		this._treeCellinfo = null;
	};

	_pGrid._is_changingRect = false;
	_pGrid.on_change_containerRect = function (width, height) {
		if (!this._is_changingRect) {
			nexacro.Component.prototype.on_change_containerRect.call(this, width, height);
		}

		this._is_changingRect = true;
		this._resizeBand();
		this._adjustOverlayElements(true, this._is_use_fakemerge);
		this._is_changingRect = false;
	};

	_pGrid.on_create_control_element = function (parent_elem) {
		var control_elem = new nexacro.GridScrollableControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	_pGrid._on_deactivate = function () {
		if (!this._isSelected()) {
			this._changeStatus("enabled", true);
		}
	};

	_pGrid.on_update_position = function (resize_flag, move_flag) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);

		if (this._currentCellEditor && this._currentCellEditor._isPopupVisible()) {
			this._currentCellEditor.on_update_position(resize_flag, move_flag);
		}
	};

	_pGrid.applyto_bindSource = function (propid, Val) {
		if (this._currentCellEditor) {
			this._currentCellEditor._setDataset();
		}
	};

	_pGrid._getAccessibilityRole = function (accessibility) {
		var role = nexacro.Component.prototype._getAccessibilityRole.call(this);
		if (this._hasTree) {
			role = "treegrid";
		}
		return role;
	};

	_pGrid._isAccessibilityEnable = function () {
		return this._accept_focus;
	};

	_pGrid.on_get_accessibility_label = function () {
		return this.id;
	};




	_pGrid.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var bIsAndroidRuntimeAccessibility = (nexacro._Browser == "Runtime" && nexacro._accessibilitytype == 5);
		var bIsNotInitialized = (this._currentBand == "body" && this._accessibility_row == -1 && this._accessibility_cellidx == -1);

		if (bIsAndroidRuntimeAccessibility) {
			if (direction === undefined) {
				return false;
			}
			if (bIsNotInitialized) {
				this._accessibility_row = 0;
				this._accessibility_cellidx = 0;
			}
		}

		var ret = false;
		var curFormat = this._curFormat;
		if (curFormat) {
			var headcells_len = (curFormat._headcells) ? curFormat._headcells.length : 0;
			var bodycells_len = (curFormat._bodycells) ? curFormat._bodycells.length : 0;
			var summcells_len = (curFormat._summcells) ? curFormat._summcells.length : 0;

			if (this._currentBand == "grid" && this._accessibility_cellidx < 0 && this._accessibility_row < 0) {
				if (headcells_len == 0 && bodycells_len == 0 && summcells_len == 0) {
					var _form = this._getForm();
					var comp = _form._getTabOrderNext(this, (direction > 0) ? direction : -1, true);
					if (comp && (!this.nodatatext || this.nodatatext.length <= 0)) {
						comp._setAccessibilityNotifyEvent(direction);
					}
				}

				if (direction) {
					this._currentBand = "head";
					this._accessibility_row = 0;
					this._accessibility_cellidx = -1;
				}
				else {
					this._currentBand = "summary";
					this._accessibility_row = 0;
					this._accessibility_cellidx = summcells_len;
				}
			}

			var cellobj = null;
			while (true) {
				cellobj = null;

				if (direction) {
					this._accessibility_cellidx++;
				}
				else {
					this._accessibility_cellidx--;
				}

				if (this._currentBand == "head") {
					if (direction) {
						if (!this._headBand || this._accessibility_cellidx >= headcells_len) {
							this._currentBand = "body";
							this._accessibility_row = 0;
							this._accessibility_cellidx = 0;


							if (this.rowcount <= 0 && this.nodatatext) {
								this._bodyBand._setAccessibilityNotifyEvent();
								ret = true;
								break;
							}
						}
					}
					else {
						if (!this._headBand || this._accessibility_cellidx < 0) {
							this._accessibility_row = -1;
							this._accessibility_cellidx = -1;
							ret = false;
							break;
						}
					}
				}
				else if (this._currentBand == "summary") {
					if (direction) {
						if (!this._summBand || this._accessibility_cellidx >= summcells_len) {
							this._accessibility_row = -1;
							this._accessibility_cellidx = -1;
							ret = false;
							break;
						}
					}
					else {
						if (!this._summBand || this._accessibility_cellidx < 0) {
							this._currentBand = "body";
							this._accessibility_row = this._rowcount - 1;
							this._accessibility_cellidx = bodycells_len - 1;


							if (this.rowcount <= 0 && this.nodatatext) {
								this._bodyBand._setAccessibilityNotifyEvent();
								ret = true;
								break;
							}
						}
					}
				}
				else {
					if (direction) {
						if (this._accessibility_cellidx >= bodycells_len) {
							this._accessibility_row++;
							this._accessibility_cellidx = 0;
						}

						if (this._rowcount <= 0 || this._accessibility_row >= this._rowcount) {
							this._currentBand = "summary";
							this._accessibility_row = 0;
							this._accessibility_cellidx = 0;
						}
					}
					else {
						if (this._accessibility_cellidx < 0) {
							this._accessibility_row--;
							this._accessibility_cellidx = bodycells_len - 1;
						}

						if (this._rowcount <= 0 || this._accessibility_row < 0) {
							this._currentBand = "head";
							this._accessibility_row = 0;
							this._accessibility_cellidx = headcells_len - 1;
						}
					}
				}

				cellobj = this._getAccessibilityCurrentCell(this._accessibility_row, this._accessibility_cellidx);
				if (cellobj) {
					cellobj._setAccessibilityNotifyEvent();
					ret = true;
					break;
				}
			}
		}
		return ret;
	};

	_pGrid._setAccessibilityNotifyEvent = function (direction) {
		this._resetScrollPos(this, this._adjust_left, this._adjust_top, this._adjust_left + this._adjust_width, this._adjust_top + this._adjust_height, (direction && direction > 0) ? 0 : 1);

		var bIsAndroidRuntimeAccessibility = (nexacro._Browser == "Runtime" && nexacro._accessibilitytype == 5);
		if (bIsAndroidRuntimeAccessibility && direction !== undefined) {
			this._accessibility_row = -1;
			this._accessibility_cellidx = -1;
			this._currentBand = "grid";
		}
		else {
			this._accessibility_row = -1;
			this._accessibility_cellidx = -1;
			this._currentBand = "grid";
		}

		this.on_fire_sys_onaccessibilitygesture(direction);
	};

	_pGrid._setAccessibilityInfoByHover = function (control) {
		var ret = false;
		if (control) {
			if (control._cellobj) {
				control = control._cellobj;
			}

			if (control instanceof nexacro.GridCell) {
				this._currentBand = control._band.id;
				this._accessibility_cellidx = control._cellidx;
				this._accessibility_row = this._getDataRow(control._rowidx);
				this._first_focus = true;
			}
			else {
				this._first_focus = false;
			}

			ret = control._setAccessibilityInfoByHover();
		}
		return ret;
	};

	_pGrid.on_apply_prop_class = function () {
		if (this._bodyBand) {
			this._bodyBand._css_finder = null;
			this._bodyBand._ref_css_finder = null;
		}
		if (this._headBand) {
			this._headBand._css_finder = null;
			this._headBand._ref_css_finder = null;
		}
		if (this._summBand) {
			this._summBand._css_finder = null;
			this._summBand._ref_css_finder = null;
		}

		nexacro.Component.prototype.on_apply_prop_class.call(this);

		if (this._is_created) {
			this._refreshAll(true);
		}

		if (this._currentCellEditor) {
			this._currentCellEditor.on_apply_prop_class();
		}
	};

	_pGrid.set_fillareatype = function (v) {
		switch (v) {
			case "none":
			case "linerow":
			case "datarow":
			case "controlrow":
			case "allrow":
				if (v != this.fillareatype) {
					this.fillareatype = v;
					this.on_apply_fillareatype();
				}
				break;
		}
	};

	_pGrid.on_apply_fillareatype = function () {
		this._resetfillarea = true;

		if (this._bodyBand) {
			this._bodyBand._matrix._adjustRowsDisplay();
			this._bodyBand._matrix._adjustColsDisplay();
			this._bodyBand._on_refresh_rows(false, false);
		}

		this._resetfillarea = false;
	};

	_pGrid.set_selectscrollmode = function (v) {
		switch (v) {
			case "select":
			case "scroll":
				this._selectscrollmode = this.selectscrollmode = v;
				break;
			case "default":
				this.selectscrollmode = v;
				this._selectscrollmode = (nexacro._isTouchInteraction) ? "scroll" : "select";
				break;
		}
	};

	_pGrid.set_scrollpixel = function (v) {
		if (v != this.scrollpixel) {
			switch (v) {
				case "none":
				case "all":
					this.scrollpixel = this._scrollpixel = v;
					this.on_apply_scrollpixel();
					break;
				case "default":
					this.scrollpixel = v;
					this._scrollpixel = (nexacro._isTouchInteraction) ? "all" : "none";
					this.on_apply_scrollpixel();
					break;
			}
		}
	};

	_pGrid.on_apply_scrollpixel = function () {
		this._updateScrollInfo();
	};

	_pGrid.set_mouseovertype = function (v) {
		if (v != this.mouseovertype) {
			switch (v) {
				case "cell":
				case "row":
					this.mouseovertype = v;
					break;
				default:
					this.mouseovertype = "default";
					break;
			}
		}
	};

	_pGrid._updateScrollInfo = function () {
		if (this._control_element) {
			this._control_element._updateClientRect();
		}
	};

	_pGrid.set_hideendline = function (v) {
		switch (v) {
			case "none":
			case "row":
			case "col":
			case "both":
				if (v != this.hideendline) {
					this.hideendline = v;
					this.on_apply_hideendline();
				}
				break;
		}
	};

	_pGrid.on_apply_hideendline = function () {
		this._refreshAll();
	};

	_pGrid.set_userdata = function (v) {
		if (this.userdata != v) {
			this.userdata = v;
		}
	};

	_pGrid.set_nodataimage = function (v) {
		if (v && v.substring(0, 4).toLowerCase() != "url(") {
			v = "URL(" + v + ")";
		}

		this.nodataimage = v;
		this.on_apply_nodataimage();
	};

	_pGrid.on_apply_nodataimage = function () {
		if (this.getElement()) {
			var body = this._bodyBand;
			if (body) {
				body._changeStatus("enable", true);
			}
			else {
				this._changeStatus("enable", true);
			}
		}
	};

	_pGrid.set_nodatatext = function (v) {
		this.nodatatext = v;
		this.on_apply_nodatatext();
	};

	_pGrid.on_apply_nodatatext = function () {
		var rowcount = this._getGridRowCount();
		if (this.getElement() && rowcount == 0) {
			var body = this._bodyBand;
			if (body) {
				if (this._text_elem) {
					this._text_elem.setElementVisible(false);
				}

				body.on_apply_text();
			}
			else {
				if (this._text_elem) {
					var text = this.nodatatext;
					this._text_elem.setElementVisible(true);
					this._text_elem.setElementText(text);
				}
			}
		}
		else {
			if (this._text_elem) {
				this._text_elem.setElementVisible(false);
			}
		}
	};

	_pGrid.set_summarytype = function (v) {
		switch (v) {
			case "default":
			case "top":
			case "left":
			case "lefttop":
				if (v != this.summarytype) {
					this.summarytype = v;
					this.on_apply_summarytype();
				}
				break;
		}
	};

	_pGrid.on_apply_summarytype = function () {
		if (this.getElement() && this._curFormat != null && this._curFormat.summHeight > 0) {
			this._recreate();
		}
	};

	_pGrid.set_suppresslevel = function (v) {
		switch (v) {
			case "sameskip":
			case "allskip":
			case "allcompare":
				if (v != this.suppresslevel) {
					this.suppresslevel = v;
					this.on_apply_suppresslevel();
				}
				break;
		}
	};

	_pGrid.on_apply_suppresslevel = function () {
		if (this.getElement() && this._curFormat != null) {
			this._refreshBody();
		}
	};

	_pGrid.set_useselcolor = function (v) {
		if (v != undefined) {
			v = nexacro._toBoolean(v);
			this.useselcolor = v;
			this.on_apply_useselcolor();
		}
	};

	_pGrid.on_apply_useselcolor = function () {
		this._refreshBody();
	};

	_pGrid.setBindDataset = function (obj) {
		if (obj instanceof nexacro.Dataset) {
			if (this._binddataset) {
				this._removeDSEventHandlers(this._binddataset);
			}

			if (!obj) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				this._binddataset = obj;
				this.binddataset = obj.id;
			}
			this.on_apply_prop_binddataset();
		}
	};

	_pGrid.getBindDataset = function () {
		return this._binddataset;
	};

	_pGrid.set_binddataset = function (str) {
		if (str && typeof str != "string") {
			this.setBindDataset(str);
			return;
		}
		if (str != this.binddataset || this.binddataset && !this._binddataset) {
			if (this._binddataset) {
				this._removeDSEventHandlers(this._binddataset);
			}

			if (!str) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				str = str.replace("@", "");
				this._binddataset = this._findDataset(str);
				this.binddataset = str;
			}
			this.on_apply_prop_binddataset();
		}
		return this.binddataset;
	};

	_pGrid.on_apply_prop_binddataset = function () {
		var dsobj = this._binddataset;
		if (dsobj) {
			this.binddataset = dsobj.id;
			this.rowcount = this._rowcount = dsobj.rowcount;
			this._rowposition = dsobj.rowposition;

			this._exprcache = {
			};
			this._initTreeStates();
			this._recreate_contents_all(true, true);
			this._initSelect(this._rowposition);
			this._setDSEventHandlers(dsobj);
		}
		else {
			this.rowcount = this._rowcount = 0;
			this._rowposition = -1;
			this._exprcache = {
			};
			this._initTreeStates();
			this._recreate_contents_all(true, true);
			this._initSelect(this._rowposition);
		}
	};

	_pGrid.set_formatid = function (v) {
		if (this.formatid != v) {
			this.formatid = v;
			this.on_apply_formatid();
		}
	};

	_pGrid.on_apply_formatid = function () {
		var formatid = this.formatid;
		if (formatid == "" || !formatid) {
			formatid = "default";
		}

		this._curFormat = this._formats[formatid];
		this._autofitcol_rate = [];
		this._clearBindTypeFlag();
		this._recreate();
		this._resetSelect(this._rowposition);
	};

	_pGrid.set_formats = function (v) {
		this.formats = v;
		this.on_apply_formats();
	};

	_pGrid.on_apply_formats = function () {
		this._setContents(this.formats);
		this._recreate();
		this._resetSelect(this._rowposition);
	};

	_pGrid.set_locale = function (v) {
		if (v != this.locale) {
			this.locale = v;
			this._locale = v;
			this.on_apply_locale(v);
		}
	};

	_pGrid.on_apply_locale = function (v) {
		this._recreate();
	};

	_pGrid.set_areaselecttype = function (v) {
		if (this.areaselecttype != v) {
			switch (v) {
				case "overband":
				case "limitband":
					this.areaselecttype = v;

					break;
			}
		}
	};

	_pGrid.set_autoenter = function (v) {
		if (this.autoenter != v) {
			switch (v) {
				case "select":
				case "key":
				case "none":
					this.autoenter = v;
					break;
			}
		}
	};

	_pGrid.set_autofitbandtype = function (v) {
		if (this.autofitbandtype != v) {
			switch (v) {
				case "body":
				case "allband":
				case "nohead":
				case "noleft":
				case "nohead,noleft":
					this.autofitbandtype = v;

					break;
			}
		}
	};

	_pGrid.set_autofitminheight = function (v) {
		if (this.autofitminheight != v) {
			this.autofitminheight = (isNaN(v) ? 100 : parseInt(v, 10));
		}
	};

	_pGrid.set_autofitminwidth = function (v) {
		if (this.autofitminwidth != v) {
			this.autofitminwidth = (isNaN(v) ? 100 : parseInt(v, 10));
		}
	};

	_pGrid.set_autofittype = function (v) {
		if (this.autofittype != v) {
			switch (v) {
				case "none":
				case "col":
				case "row":
				case "both":
				case "allpivot":
				case "allrow":
				case "allboth":
				case "col,allrow":
				case "row,allpivot":
					this.autofittype = v;
					this.on_apply_prop_autofittype();
					break;
			}
		}
	};

	_pGrid.on_apply_prop_autofittype = function () {
		if (this._curFormat) {
			if (!this._isUserChangeColSize) {
				this._autofitcol_rate = [];
			}

			var width;
			var bodysize = this._getBodyClientSize();
			var control_elem = this.getElement();

			width = bodysize[0];

			if (control_elem) {
				if (!this._is_created && width <= 0) {
					width = control_elem.client_width;
				}

				this._curFormat._resetOrgColSize(true, this._autofitcol_rate, width);
			}
		}
		this._applyAutofittype(true, true);
	};

	_pGrid.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		if (this.visible != v) {
			nexacro.Component.prototype.set_visible.call(this, v);
			if (v && this._is_created) {
				this._refreshAll();
				if (nexacro._Browser == "Chrome" && this._vscrollmng) {
					this._absolutelyResetScrollPos(true);
					var limit = this._control_element.vscroll_limit;
					var top = this._vscrollmng._pos;
					if (top >= limit) {
						top = limit;
						this._control_element.setElementVScrollPos(top - 1);
					}
					else {
						this._control_element.setElementVScrollPos(top + 1);
					}
					this._control_element.setElementVScrollPos(top);
					this._absolutelyResetScrollPos(false);
				}
			}
		}
	};

	_pGrid.set_autosizebandtype = function (v) {
		if (this.autosizebandtype != v) {
			var error = false;
			switch (v) {
				case "body":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = false;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "head":
					this._bodyAutoSize = false;
					this._headAutoSize = true;
					this._summAutoSize = false;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "summary":
					this._bodyAutoSize = false;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "allband":
					this._bodyAutoSize = true;
					this._headAutoSize = true;
					this._summAutoSize = true;
					this._AutoSizeLcol = true;
					this._AutoSizeRcol = true;
					break;
				case "nohead":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "noleft":
					this._bodyAutoSize = true;
					this._headAutoSize = true;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = true;
					break;
				case "nohead,noleft":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = true;
					break;
				default:
					error = true;
					break;
			}
			if (!error) {
				this.autosizebandtype = v;
				this.on_apply_autosizebandtype();
			}
		}
	};

	_pGrid.on_apply_autosizebandtype = function () {
		if (this.getElement()) {
			this._recreate_contents_all(true, true);
		}
	};

	_pGrid.set_autosizingtype = function (v) {
		if (this.autosizingtype != v) {
			var size = false;
			if (this.extendsizetype == "row" || this.extendsizetype == "both") {
				size = true;
			}

			switch (v) {
				case "none":
				case "col":
					this._rowSizeEx = size;
					break;
				case "row":
				case "both":
					this._rowSizeEx = true;
					break;
			}
			if (v == "row" || v == "none" || !v) {
				if (this._curFormat) {
					var width;
					var bodysize = this._getBodyClientSize();
					var control_elem = this.getElement();

					width = bodysize[0];

					if (control_elem) {
						if (!this._is_created && width <= 0) {
							width = control_elem.client_width;
						}

						this._curFormat._resetOrgColSize(true, this._autofitcol_rate, width);
					}
				}
			}
			this.autosizingtype = v;
		}
		this.on_apply_autosizingtype();
	};

	_pGrid.on_apply_autosizingtype = function () {
		if (this.getElement()) {
			this._isUserChangeHeadRowSize = false;
			this._isUserChangeBodyRowSize = false;
			this._isUserChangeSummRowSize = false;

			this._recreate_contents_all(true, true);
			this._resetFixSize();
		}
	};

	_pGrid.set_readonly = function (v) {
		if (v != null) {
			v = nexacro._toBoolean(v);
			if (v != this.readonly) {
				this.readonly = v;
				this.on_apply_readonly();
			}
		}
	};

	_pGrid.on_apply_readonly = function () {
		var v = this.readonly;

		this._changeStatus("readonly", v);
		if (this._headBand) {
			this._headBand._changeStatus("readonly", v);
		}
		if (this._bodyBand) {
			this._bodyBand._changeStatus("readonly", v);
		}
		if (this._summBand) {
			this._summBand._changeStatus("readonly", v);
		}

		this._refreshAll();
	};

	_pGrid.set_selectbandtype = function (v) {
		if (this.selectbandtype != v) {
			switch (v) {
				case "default":
				case "allband":
				case "body":
				case "nohead":
				case "noleft":
					this.selectbandtype = v;
					this.on_apply_selectbandtype();
					break;
			}
		}
	};

	_pGrid.on_apply_selectbandtype = function () {
	};

	_pGrid.set_selectchangetype = function (v) {
		if (this.selectchangetype != v) {
			switch (v) {
				case "up":
				case "down":
					this.selectchangetype = v;
					break;
			}
		}
	};

	_pGrid.set_selecttype = function (v) {
		if (this.selecttype != v) {
			switch (v) {
				case "row":
				case "cell":
				case "area":
				case "multirow":
				case "multicell":
				case "multiarea":
				case "treecell":
				case "multitreecell":
					this.selecttype = v;
					this.on_apply_selecttype();
					break;
				default:
					if (this.selecttype != "row") {
						this.selecttype = "row";
						this.on_apply_selecttype();
					}
					break;
			}
		}
	};

	_pGrid.on_apply_selecttype = function () {
		this._resetSelect();
		this._refreshBody();
		this._updateSelector();
	};

	_pGrid._applySelectorScroll = function (type, area) {
		var oldpos, new_pos, newpos;
		var format = this._curFormat;
		var retn = false;
		var topPos = this._toprowpos[0];
		var ctrl_flag = this._selectinfo.area.length > 1 && this.selecttype == "multirow";

		if (type[0] == "leftover0") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("prev", false, true, area, null);
			retn = true;
		}
		else if (type[0] == "rightover0") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("next", false, true, area, this._selectinfo.ctrlpoint.col);
			retn = true;
		}
		else if (type[0] == "leftover1") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("prev", false, true, area, this._selectinfo.ctrlpoint.col);
			retn = true;
		}
		else if (type[0] == "rightover1") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("next", false, true, area, null);
			retn = true;
		}

		if (type[1] == "topover0") {
			new_pos = this._selectinfo.currow - 1;
			oldpos = this._begrowpos;
			if (topPos != new_pos) {
				newpos = this._jumpCurrentRow(new_pos);
			}
			retn = (oldpos != newpos);
		}
		else if (type[1] == "bottomover0") {
			new_pos = this._selectinfo.currow + 1;
			oldpos = this._begrowpos;

			newpos = this._jumpCurrentRow(new_pos);
			retn = (oldpos != newpos);
		}
		else if (type[1] == "topover1") {
			new_pos = this._selectinfo.currow - 1;
			oldpos = this._begrowpos;
			if (topPos != new_pos) {
				newpos = this._jumpCurrentRow(new_pos);
			}
			retn = (oldpos != newpos);
		}
		else if (type[1] == "bottomover1") {
			new_pos = this._selectinfo.currow + 1;
			oldpos = this._begrowpos;
			newpos = this._jumpCurrentRow(new_pos);
			retn = (oldpos != newpos);
		}
		return retn;
	};

	_pGrid._startAreaSizing = function (posobj, idx) {
		var format = this._curFormat;
		var subrowlen = format._bodyrows.length;

		var info = this._getAreaInfoWithPos(posobj, idx);
		var cellinfo, areaInfo = this._selectinfo.area;

		if (idx == 0) {
			cellinfo = format._bodycells[info.ecell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.erow, subrowlen);
			}
		}
		else if (idx == 1) {
			cellinfo = format._bodycells[info.scell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.srow, subrowlen);
			}
		}
		else if (idx == 2) {
			cellinfo = format._bodycells[info.ecell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.srow, subrowlen);
			}
		}
		else if (idx == 3) {
			cellinfo = format._bodycells[info.scell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.erow, subrowlen);
			}
		}
	};

	_pGrid._applyAreaSizing = function (posobj, idx, is_tracking) {
		var format = this._curFormat;
		var beforeCell = this._selectinfo.curcell;
		var beforeCol = this._selectinfo.curcol;
		var beforeRow = this._selectinfo.curdsrow;
		var beforeSubrow = this._selectinfo.cursubrow;
		var beforePvt = this._selectinfo.curpvt;
		var afterCell, afterCol, afterRow, afterSubrow, afterPvt = this._selectinfo.curpvt;

		var info = this._getAreaInfoWithPos(posobj, idx);

		if (idx == 0) {
			this._setSelectedInfo(info.scell, info.scol, info.srow, info.ssubrow, null, info);
			afterCell = info.scell;
			afterCol = info.scol;
			afterRow = info.srow;
			afterSubrow = info.ssubrow;
		}
		else if (idx == 1) {
			this._setSelectedInfo(info.ecell, info.ecol, info.erow, info.esubrow, null, info);
			afterCell = info.ecell;
			afterCol = info.ecol;
			afterRow = info.erow;
			afterSubrow = info.esubrow;
		}
		else if (idx == 2) {
			this._setSelectedInfo(info.scell, info.scol, info.erow, info.esubrow, null, info);
			afterCell = info.scell;
			afterCol = info.scol;
			afterRow = info.erow;
			afterSubrow = info.esubrow;
		}
		else if (idx == 3) {
			this._setSelectedInfo(info.ecell, info.ecol, info.erow, info.esubrow, null, info);
			afterCell = info.ecell;
			afterCol = info.ecol;
			afterRow = info.srow;
			afterSubrow = info.ssubrow;
		}

		var kind;
		if (is_tracking) {
			kind = "selectorsizing";
		}
		else if (is_tracking === false) {
			kind = "selector";
		}
		if (this._selectinfo.area.length > 1 && this.selecttype == "multirow") {
			this._multiselect = "ctrl";
		}
		else {
			this._multiselect = "shift";
		}
		this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body", kind);
	};

	_pGrid._getAreaInfoWithPos = function (posobj, idx) {
		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();
		var scroll_max = this._getScollMaxLeft();
		var select_ctrl = this._select_ctrl;
		var l = posobj.l;
		var r = l + posobj.w;
		var t = posobj.t;
		var b = t + posobj.h;
		var format = this._curFormat;
		var cols = format._cols;
		var rows = format._bodyrows;
		var rowcnt = this._getGridRowCount();
		var row, srow, erow, scell, ecell, scol, ecol, ssubrow, esubrow, spvt, epvt;
		var cell_left, cell_top, cell_right, cell_bottom;
		var arealeft;
		var toppos;
		var begarea, endarea;

		if (select_ctrl) {
			begarea = select_ctrl._start_begarea;
			endarea = select_ctrl._start_endarea;
		}
		else {
			begarea = this._selectinfo.arearect.barea;
			endarea = this._selectinfo.arearect.earea;
		}


		var fixed_rowcnt = parseInt(this._fixed_rowcnt);
		var fixed_startrow = fixed_rowcnt > 0 ? parseInt(this._fixed_startrow) : 0;
		var fixed_endrow = parseInt(this._fixed_endrow);
		var fixed_height = parseInt(this._fixed_height);

		if (fixed_rowcnt > 0) {
			toppos = this._getHeadHeight();
		}
		else {
			toppos = this._getHeadHeight() - scroll_top;
		}

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			toppos += this._getSummHeight();
		}

		var row_top, row_bottom;
		var cells = format._bodycells;
		var cells_len = cells.length;
		var col, colspan, rowspan, area;
		var condition;
		var cell_rect;
		srow = -1;

		row_top = toppos;

		for (var i = fixed_startrow; i < rowcnt; i++) {
			if (fixed_rowcnt > 0 && i == (fixed_endrow + 1)) {
				row_top -= scroll_top;
			}
			row_bottom = row_top + this._getRowSize(i);

			if (this._track_mode == "areaselect") {
				condition = (t < row_bottom);
				if (i == 0 && t < row_top) {
					condition = true;
				}
			}
			else {
				condition = (row_top <= t && t < row_bottom);
			}

			if (srow < 0 && condition) {
				srow = this._getDataRow(i);

				for (var j = 0; j < cells_len; j++) {
					area = cells[j]._area;
					col = cells[j]._col;
					row = cells[j]._row;
					colspan = cells[j]._colspan;
					rowspan = cells[j]._rowspan;

					if (cells[j]._area == "left") {
						arealeft = this._getClientLeft();
					}
					else if (cells[j]._area == "right") {
						arealeft = this._getClientWidth() - format.rightWidth;
					}
					else {
						arealeft = format.leftWidth - scroll_left;
					}

					cell_left = arealeft + cols[col].left;
					cell_right = arealeft + cols[col + colspan - 1].right;
					cell_top = row_top + rows[row].top;
					cell_bottom = row_top + rows[row + rowspan - 1].bottom;

					cell_rect = this._getSubCellRect(i, j, -1, -1, false);
					cell_left = cell_rect.left;
					cell_top = cell_rect.top;
					cell_right = cell_rect.right;
					cell_bottom = cell_rect.bottom;

					if (fixed_rowcnt > 0 && i <= fixed_endrow) {
						cell_top += scroll_top;
						cell_bottom += scroll_top;
					}

					if (this._track_mode == "areaselect") {
						condition = (cell_left <= l && l < cell_right && t < cell_bottom);
						if (j == 0 && l < cell_left) {
							condition = true;
						}
					}
					else {
						condition = (cell_left <= l && l < cell_right && t < cell_bottom);
					}

					if (condition) {
						if (endarea != begarea || (begarea == "body" && endarea == "body")) {
							if (begarea != "left" && scroll_left > 0 && area == "left") {
								continue;
							}

							if (begarea != "right" && scroll_left < scroll_max && area == "right") {
								continue;
							}

							if (endarea != "right" && area == "right") {
								continue;
							}
						}

						scell = j;
						scol = col;
						ssubrow = row;

						if (posobj.area != "right") {
							break;
						}
						else if (cells[j]._area == "right") {
							break;
						}
					}
				}
			}


			if (this._track_mode == "areaselect") {
				condition = b < row_bottom;

				if ((i + 1) == rowcnt && b >= row_bottom) {
					condition = true;
				}
			}
			else {
				condition = row_top < b && b <= row_bottom;
			}

			if (srow >= 0 && condition) {
				erow = this._getDataRow(i);

				for (var j = 0; j < cells_len; j++) {
					col = cells[j]._col;
					row = cells[j]._row;
					colspan = cells[j]._colspan;
					rowspan = cells[j]._rowspan;



					if (cells[j]._area == "left") {
						arealeft = 0;
					}
					else if (cells[j]._area == "right") {
						arealeft = this._getClientWidth() - format.rightWidth;
					}
					else {
						arealeft = 0;
					}

					cell_rect = this._getSubCellRect(i, j, -1, -1, false);

					cell_top = cell_rect.top;
					cell_bottom = cell_rect.bottom;

					if (fixed_rowcnt > 0 && i <= fixed_endrow) {
						cell_top += scroll_top;
						cell_bottom += scroll_top;
					}

					if (cells[j]._area == "right") {
						cell_left = cell_rect.left - scroll_left;
						cell_right = cell_rect.right - scroll_left;
					}
					else {
						cell_left = cell_rect.left;
						cell_right = cell_rect.right;
					}
					if (this._track_mode == "areaselect") {
						condition = cell_left < r && r <= cell_right;
						if ((j + 1) == cells_len && r >= cell_right) {
							condition = true;
						}
					}
					else {
						condition = cell_left < r && r <= cell_right && cell_top < b;
					}

					if (condition) {
						if (endarea != begarea || (begarea == "body" && endarea == "body")) {
							if (endarea != "right" && scroll_left < scroll_max && cells[j]._area == "right") {
								continue;
							}

							if (endarea != "left" && scroll_left > 0 && cells[j]._area == "left") {
								continue;
							}

							if (begarea != "left" && cells[j]._area == "left") {
								continue;
							}
						}

						ecell = j;
						ecol = col;
						esubrow = row;

						if (posobj.area != "right") {
							break;
						}
						else if (cells[j]._area == "right") {
							break;
						}
					}
				}
				break;
			}
			row_top = row_bottom;
		}
		spvt = epvt = this._selectinfo.curpvt;

		return {
			srow : srow, 
			erow : erow, 
			scell : scell, 
			ecell : ecell, 
			scol : scol, 
			ecol : ecol, 
			ssubrow : ssubrow, 
			esubrow : esubrow, 
			spvt : spvt, 
			epvt : epvt
		};
	};

	_pGrid._getSelectRect = function (onlyarea, bApplyFixedRow) {
		var rect = this._selectinfo.arearect;
		var area = this._selectinfo.area;

		rect.left = 0;
		rect.top = 0;
		rect.width = 0;
		rect.height = 0;
		rect.barea = "";
		rect.earea = "";

		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();

		while (area.length) {
			var areainfo = area[area.length - 1];
			var format = this._curFormat;
			var cols = format._cols;
			var rows = format._bodyrows;
			var subrow_size_list = this._rowSizeListSub;
			var begcol = areainfo.begcol;
			var endcol = areainfo.endcol;
			var bodystart = format.leftWidth;
			var rightstart = this._getClientWidth() - format.rightWidth;

			var fixed_startrow = this._fixed_startrow;

			if (areainfo.begrow < 0) {
				break;
			}

			if (!this._isAreaSelect()) {
				begcol = 0;
				endcol = cols.length - 1;
			}



			if (begcol >= 0 && endcol >= 0) {
				if (onlyarea && cols[begcol]._area != cols[endcol]._area) {
					break;
				}

				rect.barea = cols[begcol]._area;
				rect.earea = cols[endcol]._area;



				if (rect.barea == "right") {
					rect.left = rightstart + cols[begcol].left;
					rect.width = cols[endcol].right - cols[begcol].left;
				}
				else {
					if (rect.barea == "left") {
						rect.left = cols[begcol].left;
					}
					else {
						rect.left = bodystart + cols[begcol].left - scroll_left;
					}

					if (rect.earea == "left") {
						rect.width = cols[endcol].right - rect.left;
					}
					else if (rect.earea == "body") {
						rect.width = (bodystart + cols[endcol].right - scroll_left) - rect.left;
					}
					else {
						rect.width = (rightstart + cols[endcol].right) - rect.left;
					}
				}
			}
			else {
				rect.left = this._getClientLeft();
				rect.width = this._getClientWidth();
			}

			var area_begrow = areainfo.begrow;
			var area_endrow = areainfo.endrow;

			for (var row = 0; row <= area_endrow; row++) {
				var s = 0, e = rows.length - 1;

				if (this._hasTree) {
					if (this._getGridRow(row) < -2) {
						continue;
					}
				}

				if (row < area_begrow) {
					if (bApplyFixedRow && row < fixed_startrow) {
						continue;
					}

					for (var i = s; i <= e; i++) {
						rect.top += subrow_size_list[row * rows.length + i];
					}
				}
				else {
					if (row == area_begrow) {
						s = areainfo.begsubrow[0];
					}
					if (row == area_endrow) {
						e = areainfo.endsubrow[row - area_begrow];
					}

					for (var i = 0; i <= e; i++) {
						if (i < s) {
							rect.top += subrow_size_list[row * rows.length + i];
						}
						else {
							rect.height += subrow_size_list[row * rows.length + i];
						}
					}
				}
			}

			rect.top += this._bodyBand._adjust_top - scroll_top;
			break;
		}
		this._selectinfo.arearect = rect;

		return rect;
	};

	_pGrid._updateSelector = function (mode, pos) {
		var v = this._isAreaSelect() && nexacro._isTouchInteraction;

		if (this._control_element) {
			var rect, l, t, w, h;

			var select_ctrl = this._select_ctrl;
			if (v) {
				if (!select_ctrl) {
					select_ctrl = new nexacro._GridSelector("gridselector", 0, 0, 0, 0, null, null, this);
					select_ctrl._setCallbackFn(this._startAreaSizing, this._applyAreaSizing, this._applySelectorScroll);
					select_ctrl.createComponent();
					select_ctrl._createButton();
					this._select_ctrl = select_ctrl;
				}

				if ((mode == "vscroll" || mode == "hscroll") && !select_ctrl._is_tracking) {
					rect = this._selectinfo.arearect;

					if (mode == "hscroll") {
						if (rect.barea == "left") {
							if (rect.earea == "body") {
								rect.width -= pos;
							}
						}
						else if (rect.barea == "body") {
							rect.left -= pos;

							if (rect.earea == "right") {
								rect.width += pos;
							}
						}
					}
					if (mode == "vscroll") {
						rect.top -= pos;
					}

					l = rect.left;
					t = rect.top;
					w = rect.width;
					h = rect.height;

					if (t + h <= this._bodyBand._adjust_top) {
						v = false;
					}
				}
				else {
					rect = this._getSelectRect(select_ctrl._onlyarea, true);

					l = rect.left;
					t = rect.top;
					w = rect.width;
					h = rect.height;
				}

				if (!l && !t && !w && !h) {
					v = false;
				}

				select_ctrl.move(l, t, w, h, mode);

				if (v) {
					if (!select_ctrl._is_tracking) {
						select_ctrl.set_visible(false);
					}
				}
				else {
					select_ctrl.set_visible(false);
				}
			}
		}
		else {
			if (this._select_ctrl) {
				this._select_ctrl.destroy();
				this._select_ctrl = null;
			}
		}
	};

	_pGrid.set_autoupdatetype = function (v) {
		if (this.autoupdatetype != v) {
			switch (v) {
				case "none":
				case "comboselect":
				case "dateselect":
				case "itemselect":
					this.autoupdatetype = v;
					break;
			}
		}
	};

	_pGrid.set_cellclickbound = function (v) {
		if (this.cellclickbound != v) {
			switch (v) {
				case "control":
				case "cell":
					this.cellclickbound = v;
					break;
			}
		}
	};

	_pGrid.set_cellmovingtype = function (v) {
		if (this.cellmovingtype != v) {
			switch (v) {
				case "none":
				case "col":
				case "col,band":
				case "col,merge":
				case "col,line":
					this.cellmovingtype = v;
					break;
			}
		}
	};

	_pGrid.set_cellsizebandtype = function (v) {
		if (this.cellsizebandtype != v) {
			switch (v) {
				case "body":
				case "allband":
				case "nohead":
				case "noleft":
				case "nohead,noleft":
					this.cellsizebandtype = v;
					this.on_apply_cellsizebandtype();
					break;
			}
		}
	};

	_pGrid.on_apply_cellsizebandtype = function () {
	};

	_pGrid.set_cellsizingtype = function (v) {
		if (this.cellsizingtype != v) {
			switch (v) {
				case "none":
				case "col":
				case "row":
				case "both":
					this.cellsizingtype = v;
					this.on_apply_cellsizingtype();
					break;
			}
		}
	};

	_pGrid.on_apply_cellsizingtype = function () {
		this._applyResizer();
	};

	_pGrid.set_extendsizetype = function (v) {
		if (this.extendsizetype != v) {
			var size = false;
			if (this.autosizingtype == "row" || this.autosizingtype == "both") {
				size = true;
			}

			var error = false;
			switch (v) {
				case "none":
				case "col":
					this._rowSizeEx = size;
					break;
				case "row":
				case "both":
					this._rowSizeEx = true;
					break;
				default:
					error = true;
					break;
			}

			if (!error) {
				this.extendsizetype = v;
				this.on_apply_extendsizetype();
			}
		}
	};

	_pGrid.on_apply_extendsizetype = function () {
		if (this.getElement()) {
			this._recreate_contents_all(true, true);
		}
	};

	_pGrid.set_wheelscrollrow = function (v) {
		if (this.wheelscrollrow != v) {
			this.wheelscrollrow = (isNaN(v) ? 2 : parseInt(v, 10));
		}
	};

	_pGrid.set_usecontrolkey = function (v) {
		if (this.usecontrolkey != v) {
			this.usecontrolkey = v;
		}
	};

	_pGrid.set_treeusebutton = function (v) {
		if (this.treeusebutton != v) {
			switch (v) {
				case "use":
				case "no":
				case "noclick":
					this.treeusebutton = v;
					this.on_apply_treeusebutton();
					break;
			}
		}
	};

	_pGrid.set_dragscrolltype = function (v) {
		nexacro.Form.prototype.set_dragscrolltype.call(this, v);
	};

	_pGrid.on_apply_treeusebutton = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseline = function (v) {
		if (v != null && this.treeuseline != v) {
			v = nexacro._toBoolean(v);
			this.treeuseline = v;
			this.on_apply_treeuseline();
		}
	};

	_pGrid.on_apply_treeuseline = function () {
		this._refreshBody();
	};

	_pGrid.set_treeusecheckbox = function (v) {
		if (v != null && this.treeusecheckbox != v) {
			v = nexacro._toBoolean(v);
			this.treeusecheckbox = v;
			this.on_apply_treeusecheckbox();
		}
	};

	_pGrid.on_apply_treeusecheckbox = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseimage = function (v) {
		if (v != null && this.treeuseimage != v) {
			v = nexacro._toBoolean(v);
			this.treeuseimage = v;
			this.on_apply_treeuseimage();
		}
	};

	_pGrid.on_apply_treeuseimage = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseexpandkey = function (v) {
		if (v != null && this.treeuseexpandkey != v) {
			v = nexacro._toBoolean(v);
			this.treeuseexpandkey = v;
		}
	};

	_pGrid.set_treeinitstatus = function (v) {
		this.treeinitstatus = v;
		var expand, value;
		var error = false;

		switch (v) {
			case "collapse,null":
				expand = false;
				value = false;
				break;
			case "expand,null":
				expand = true;
				value = false;
				break;
			case "collapse,all":
				expand = false;
				value = true;
				break;
			case "expand,all":
				expand = true;
				value = true;
				break;
			default:
				error = true;
				break;
		}

		if (!error) {
			this.on_apply_treeinitstatus(expand, value);
		}
	};

	_pGrid.on_apply_treeinitstatus = function (expand, value) {
		if (!this._hasTree) {
			return;
		}

		var format = this._curFormat;

		if (!format) {
			return;
		}

		var cells = format._bodycells;
		var cellsLen = cells.length;
		var _treeIndexes = this._treeIndexes;
		var _treeStates = this._treeStates;

		if (!_treeIndexes || !_treeStates) {
			return;
		}

		this._org_treeStates = [];

		if (!value) {
			var update = false;
			var dsrowidx;

			for (var i = _treeIndexes.length - 1; i >= 0; i--) {
				var cellinfo, editType;
				dsrowidx = this.getDatasetRow(i);

				for (var j = 0; j < cellsLen; j++) {
					cellinfo = cells[j];
					editType = cellinfo._getEdittype(dsrowidx);

					if (editType == "tree") {
						break;
					}
				}
				if (cellinfo) {
					var state, precnt;
					if (cellinfo.treestate._bindtype != 0) {
						state = cellinfo._getAttrValue(cellinfo.treestate, dsrowidx);
					}
					if (!state || state == "") {
						precnt = _treeIndexes.length;
						if (expand) {
							if (this._setTreeState(i, 1, false, "null") > 0) {
								i += (_treeIndexes.length - precnt + 1);
								update = true;
							}
						}
						else {
							if (this._setTreeState(i, 0, false, "null") > 0) {
								update = true;
							}
						}
					}
					else {
						precnt = _treeIndexes.length;

						var s = this._setTreeState(i, state, false, "null_value");
						if (s == 2) {
							if ((_treeIndexes.length - precnt) > 0) {
								i += (_treeIndexes.length - precnt + 1);
							}

							update = true;
						}
						else if (s == 1) {
							update = true;
						}
					}
				}
			}
			if (update == true) {
				this._recreate_contents_all(false, false, true);
			}
		}
		else {
			var update = false, precnt;

			for (var i = _treeIndexes.length - 1; i >= 0; i--) {
				precnt = _treeIndexes.length;
				if (expand) {
					if (this._setTreeState(i, 1, false, "all") > 0) {
						i += (_treeIndexes.length - precnt + 1);
						update = true;
					}
				}
				else {
					if (this._setTreeState(i, 0, false, "all") > 0) {
						update = true;
					}
				}
			}

			if (!expand) {
				for (var i = _treeStates.length - 1; i >= 0; i--) {
					var state = this._getOrgTreeStates(i);

					if (state == 2) {
						_treeStates[i] = 2;
					}
				}
			}

			if (update == true) {
				if (this.autosizingtype == "col" || this.autosizingtype == "both") {
					this._recreate_contents_all(true, false);
				}
				else {
					this._recreate_contents_all(false, false, true);
				}
			}
		}
	};

	_pGrid.set_treepathdelimiter = function (v) {
		if (this.treepathdelimiter != v) {
			this.treepathdelimiter = v;
		}
	};

	_pGrid.set_useinputpanel = function (v) {
		if (this.useinputpanel != v) {
			this.useinputpanel = v;
		}
	};

	_pGrid.set_usesoftkeyboard = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.usesoftkeyboard) {
			this.usesoftkeyboard = v;
		}
	};

	_pGrid.on_apply_prop_enable = function (v) {
		if (!v) {
			this._enable = v;
		}

		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (this._is_created) {
			var band = this._headBand;
			if (band) {
				band._setEnable(v);
			}
			var band = this._bodyBand;
			if (band) {
				band._setEnable(v);
			}
			var band = this._summBand;
			if (band) {
				band._setEnable(v);
			}
		}
	};

	_pGrid.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var _rtldirection = this._rtldirection;
		if (this._headBand) {
			this._headBand.set_rtldirection(_rtldirection);
		}
		if (this._bodyBand) {
			this._bodyBand.set_rtldirection(_rtldirection);
		}
		if (this._summBand) {
			this._summBand.set_rtldirection(_rtldirection);
		}
	};

	_pGrid.createFormat = function () {
		var hr = 0;
		var pDataset = this._binddataset;
		var i = 0;
		var nColCount = 0;
		var nPvtCount = 0;
		var nRowCount = 0;

		if (pDataset) {
			nColCount = pDataset.getColCount();
		}

		var strContents;

		if (nColCount > 0) {
			strContents = "<Formats>\n";
			strContents += "<Format id=\"default\">\n";
			strContents += "<Columns>\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Column size=\"";
					strContents += "80";
					strContents += "\"/>\n";
				}
			}
			strContents += "</Columns>\n";
			strContents += "<Rows>\n";
			{

				strContents += "<Row band=\"head\" size=\"";
				strContents += "24";
				strContents += "\"/>\n";
				strContents += "<Row band=\"body\" size=\"";
				strContents += "24";
				strContents += "\"/>\n";
			}
			strContents += "</Rows>\n";
			strContents += "<Band id=\"head\">\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Cell col=\"";
					strContents += i.toString();
					strContents += "\" displaytype=\"normal\" text=\"";
					strContents += pDataset.getColID(i);
					strContents += "\"/>\n";
				}
			}
			strContents += "</Band>\n";
			strContents += "<Band id=\"body\">\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Cell col=\"";
					strContents += i.toString();
					strContents += "\" displaytype=\"normal\" text=\"bind:";
					strContents += pDataset.getColID(i);
					strContents += "\"/>\n";
				}
			}
			strContents += "</Band>\n";
			strContents += "</Format>\n";
			strContents += "</Formats>\n";
		}
		else {
			strContents = "<Formats>\n";
			strContents += "<Format id=\"default\">\n";
			strContents += "</Format>\n";
			strContents += "</Formats>\n";
		}

		this.set_formats(strContents);
		return 0;
	};

	_pGrid.setFormat = function (id) {
		var format = this._formats[id];

		if (format) {
			if (format != this._curFormat) {
				this.set_formatid(id);
				return true;
			}
		}
		else {
			this.formatid = "";
			this._curFormat = null;
			this._clearBindTypeFlag();
			this._destroyBands();
		}
		return false;
	};

	_pGrid.getFormatString = function () {
		return this.formats;
	};

	_pGrid.getCurFormatString = function (bOrginal) {
		if (this._curFormat) {
			if (bOrginal) {
				return this._curFormat._getOrgFormatStr();
			}
			else {
				return this._curFormat._getFormatStr();
			}
		}
		else {
			return this.formats;
		}
	};

	_pGrid.getCellPos = function () {
		return this._selectinfo.curcell;
	};

	_pGrid.setCellPos = function (nCellIdx) {
		return this._moveToPosCell(this._selectinfo.curdsrow, nCellIdx);
	};

	_pGrid.getCellCount = function (strBand) {
		if (!this._curFormat) {
			return 0;
		}

		strBand = strBand.toLowerCase();
		var cells;
		if (strBand == "head") {
			cells = this._curFormat._headcells;
		}
		else if (strBand == "summ" || strBand == "summary") {
			cells = this._curFormat._summcells;
		}
		else {
			cells = this._curFormat._bodycells;
		}

		if (cells) {
			return cells.length;
		}
		return 0;
	};

	_pGrid.getCellRect = function (nRow, nCellIdx, nPivotIdx) {
		return this.getSubCellRect(nRow, nCellIdx, -1, nPivotIdx);
	};

	_pGrid.getSubCellRect = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		return this._getSubCellRect(nRow, nCellIdx, nSubCellIdx, nPivotIdx, true);
	};

	_pGrid._getSubCellRect = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx, bApplyScroll) {
		var rect = {
			"left" : 0, 
			"top" : 0, 
			"right" : 0, 
			"bottom" : 0, 
			"width" : 0, 
			"height" : 0
		};
		rect.left = 0;
		rect.top = 0;
		rect.right = 0;
		rect.bottom = 0;
		rect.width = 0;
		rect.height = 0;

		if (nRow >= 0 && nRow < this._rowcount) {
			if (this._curFormat && this._curFormat._bodycells) {
				var parentinfo = null;
				var cellinfo = this._curFormat._bodycells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					parentinfo = cellinfo;
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}
				if (cellinfo) {
					var top = 0;
					var left = 0;
					var right = 0;
					var bottom = this._getHeadHeight();
					var _cols = this._curFormat._cols;

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						bottom += this._getSummHeight();
					}

					var bodyrows = this._curFormat._bodyrows;
					var rowcnt = bodyrows.length;
					var rowcount = this._getGridRowCount();
					var cellinfo_row = (parentinfo) ? parentinfo._row + cellinfo._row : cellinfo._row;
					var cellinfo_col = (parentinfo) ? parentinfo._col + cellinfo._col : cellinfo._col;
					var cellinfo_rowspan = cellinfo._rowspan;
					var cellinfo_colspan = cellinfo._colspan;
					var _rowSizeListSub = this._rowSizeListSub;
					var row;

					for (var i = 0; i < rowcount; i++) {
						row = i;
						if (this._hasTree) {
							row = this._treeIndexes[row];
						}

						var r = row * rowcnt;

						if (row == nRow) {
							for (var k = 0; k < cellinfo_row; k++) {
								bottom += _rowSizeListSub[r++];
							}
							top = bottom;

							for (var j = 0; j < cellinfo_rowspan; j++) {
								bottom += _rowSizeListSub[r++];
							}
							break;
						}
						else {
							for (var j = 0; j < rowcnt; j++) {
								bottom += _rowSizeListSub[r + j];
							}
						}
					}

					var size = 0;
					for (i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}

					top -= this._getScrollTop();
					bottom -= this._getScrollTop();

					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
						if (top < 0) {
							top = 0;
						}
						if (bottom < 0) {
							bottom = 0;
						}
					}

					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				var cellinfo = this._curFormat._headcells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}

				if (cellinfo) {
					var top = 0;
					var left = 0;
					var right = 0;
					var bottom = 0;
					var _cols = this._curFormat._cols;

					var headrows = this._curFormat._headrows;
					var rowcnt = headrows.length;
					var cellinfo_row = cellinfo._row;
					var cellinfo_col = cellinfo._col;
					var cellinfo_rowspan = cellinfo._rowspan;
					var cellinfo_colspan = cellinfo._colspan;

					for (var k = 0; k < cellinfo_row; k++) {
						bottom += headrows[k].size;
					}

					top = bottom;

					for (k = 0; k < cellinfo_rowspan; k++) {
						bottom += headrows[k + cellinfo_row].size;
					}

					var size = 0;
					for (var i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}
					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
					}

					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				var cellinfo = this._curFormat._summcells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}

				if (cellinfo) {
					var top = 0;
					var left = 0;
					var right = 0;
					var bottom = 0;
					var _cols = this._curFormat._cols;

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						bottom += this._getHeadHeight();
					}
					else {
						bottom = this._getClientTop() + this._getClientHeight() - this._getSummHeight();
					}

					var summrows = this._curFormat._summrows;
					var rowcnt = summrows.length;
					var cellinfo_row = cellinfo._row;
					var cellinfo_col = cellinfo._col;
					var cellinfo_rowspan = cellinfo._rowspan;
					var cellinfo_colspan = cellinfo._colspan;

					for (var k = 0; k < cellinfo_row; k++) {
						bottom += summrows[k].size;
					}

					top = bottom;

					for (k = 0; k < cellinfo_rowspan; k++) {
						bottom += summrows[k + cellinfo_row].size;
					}

					var size = 0;
					for (var i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}
					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
					}
					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		return rect;
	};

	_pGrid.getCellText = function (nRow, nCellIdx, nPivotIdx) {
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				var cellinfo = this._curFormat._bodycells[nCellIdx];
				if (cellinfo) {
					if (this._hasTree) {
						if (nRow < this._treeIndexes.length) {
							nRow = this._treeIndexes[nRow];
							return cellinfo._getDisplayText(nRow);
						}
					}
					else {
						if (nRow < this._rowcount) {
							return cellinfo._getDisplayText(nRow);
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				var cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getDisplayText(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				var cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getDisplayText(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.getCellValue = function (nRow, nCellIdx, nPivotIdx) {
		if (nPivotIdx == undefined) {
			nPivotIdx = 0;
		}

		var cellinfo;
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				cellinfo = this._curFormat._bodycells[nCellIdx];
				if (cellinfo) {
					if (this._hasTree) {
						if (nRow < this._treeIndexes.length) {
							nRow = this._treeIndexes[nRow];
							return cellinfo._getValue(nRow);
						}
					}
					else {
						if (nRow < this._rowcount) {
							return cellinfo._getValue(nRow);
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getValue(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getValue(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.getSubCellCount = function (strBand, nCellIdx) {
		var format = this._curFormat;
		strBand = strBand.toLowerCase();

		if (format) {
			var cells;
			if (strBand == "head") {
				cells = format._headcells;
			}
			else if (strBand == "summ" || strBand == "summary") {
				cells = format._summcells;
			}
			else {
				cells = format._bodycells;
			}
			if (cells && cells.length > nCellIdx && nCellIdx >= 0) {
				var cell = cells[nCellIdx];
				return cell._subcells.length;
			}
		}
		return 0;
	};

	_pGrid.getSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return undefined;
		}

		return format.getSubCellProperty(strBand, nCellIdx, nSubCellIdx, strPropID);
	};

	_pGrid.getSubCellText = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		var cellinfo;
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				if (nCellIdx >= 0 && nCellIdx < this._curFormat._bodycells.length) {
					cellinfo = this._curFormat._bodycells[nCellIdx];
					if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
						if (this._hasTree) {
							if (nRow < this._treeIndexes.length) {
								nRow = this._treeIndexes[nRow];
								return cellinfo._subcells[nSubCellIdx]._getDisplayText(nRow);
							}
						}
						else {
							if (nRow < this._rowcount) {
								return cellinfo._subcells[nSubCellIdx]._getDisplayText(nRow);
							}
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getDisplayText(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getDisplayText(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.getSubCellValue = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		var cellinfo;
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				if (nCellIdx >= 0 && nCellIdx < this._curFormat._bodycells.length) {
					cellinfo = this._curFormat._bodycells[nCellIdx];
					if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
						if (this._hasTree) {
							if (nRow < this._treeIndexes.length) {
								nRow = this._treeIndexes[nRow];
								return cellinfo._subcells[nSubCellIdx]._getValue(nRow);
							}
						}
						else {
							if (nRow < this._rowcount) {
								return cellinfo._subcells[nSubCellIdx]._getValue(nRow);
							}
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getValue(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getValue(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.setSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		var cellinfo = format.setSubCellProperty(strBand, nCellIdx, nSubCellIdx, strPropID, varValue);
		if (cellinfo) {
			this._refreshCell(strBand, nCellIdx, -1, strPropID, nSubCellIdx);
		}

		return (cellinfo != null);
	};

	_pGrid.setFormatColProperty = function (nColIdx, strPropID, nValue) {
		if (strPropID && this._curFormat) {
			strPropID = strPropID.toLowerCase();
			if (this._curFormat.setFormatColProperty(nColIdx, strPropID, nValue)) {
				this._clearBindTypeFlag();

				if (strPropID == "band") {
					this._autofitcol_rate = [];
					this._recreate();
				}
				else if (strPropID == "size") {
					if (this.enableredraw) {
						this._updateColSize(nColIdx);
					}
					else {
						if (!this._enable_redraw_history.updatecolsize) {
							this._enable_redraw_history.updatecolsize = [];
						}

						this._enable_redraw_history.updatecolsize.push(nColIdx);
					}
				}
				else {
					this._recreate_contents_all(false, false);
				}
				return true;
			}
		}
		return false;
	};

	_pGrid.setFormatRowProperty = function (nRowIdx, strPropID, nValue) {
		if (strPropID && this._curFormat) {
			strPropID = strPropID.toLowerCase();
			if (this._curFormat.setFormatRowProperty(nRowIdx, strPropID, nValue)) {
				this._clearBindTypeFlag();

				if (strPropID == "band" || strPropID == "size") {
					this._isUserChangeHeadRowSize = false;
					this._isUserChangeSummRowSize = false;
					this._isUserChangeBodyRowSize = false;
					this._recreate();
				}
				else {
					this._recreate_contents_all(false, false);
				}
				return true;
			}
		}
		return false;
	};

	_pGrid.getFormatColProperty = function (nCollIdx, strPropId) {
		if (this._curFormat) {
			return this._curFormat.getFormatColProperty(nCollIdx, strPropId);
		}

		return null;
	};

	_pGrid.getFormatRowProperty = function (nRowIdx, strPropId) {
		if (this._curFormat) {
			return this._curFormat.getFormatRowProperty(nRowIdx, strPropId);
		}

		return null;
	};

	_pGrid.getFormatColCount = function () {
		if (this._curFormat) {
			return this._curFormat._cols.length;
		}
		return 0;
	};

	_pGrid.getFormatRowCount = function () {
		if (this._curFormat) {
			var format = this._curFormat;
			var rowcnt = 0;

			if (format._headrows) {
				rowcnt += format._headrows.length;
			}
			if (format._bodyrows) {
				rowcnt += format._bodyrows.length;
			}
			if (format._summrows) {
				rowcnt += format._summrows.length;
			}

			return rowcnt;
		}
		return 0;
	};

	_pGrid.getFormatColSize = function (nColIdx) {
		if (this._curFormat) {
			if (this._curFormat._cols.length > 0 && this._curFormat._cols.length > nColIdx) {
				var col = this._curFormat._cols[nColIdx];
				if (col) {
					return col.orgsize;
				}
			}
		}
		return -1;
	};

	_pGrid.getFormatRowSize = function (nRowIdx) {
		if (this._curFormat) {
			if (nRowIdx < 0) {
				return -1;
			}

			var top = 0;
			var rows = this._curFormat._headrows;
			if (rows) {
				if (rows.length > nRowIdx) {
					var row = rows[nRowIdx];
					return row.orgsize;
				}
				top += rows.length;
			}

			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				rows = this._curFormat._summrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						var row = rows[nRowIdx - top];
						return row.orgsize;
					}
					top += rows.length;
				}
				rows = this._curFormat._bodyrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						var row = rows[nRowIdx - top];
						return row.orgsize;
					}
				}
			}
			else {
				rows = this._curFormat._bodyrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						var row = rows[nRowIdx - top];
						return row.orgsize;
					}
					top += rows.length;
				}
				rows = this._curFormat._summrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						var row = rows[nRowIdx - top];
						return row.orgsize;
					}
				}
			}
		}
		return -1;
	};

	_pGrid._isUserChangeHeadRowSize = false;
	_pGrid._isUserChangeBodyRowSize = false;
	_pGrid._isUserChangeSummRowSize = false;
	_pGrid._isUserChangeColSize = false;

	_pGrid.setRealColSize = function (nColIndex, nSize, enumband) {
		this._isUserChangeColSize = true;

		if (enumband) {
			return this._setColSize(-9, nColIndex, nSize, false, true);
		}
		else {
			return this._setColSize(enumband, nColIndex, nSize, true, true);
		}
	};

	_pGrid.setRealRowSize = function (nRowIndex, nSize, nSubRowIndex, bBandIndex) {
		var format = this._curFormat;

		if (bBandIndex == undefined) {
			bBandIndex = true;
		}

		var band = "none";
		if (bBandIndex) {
			if (nRowIndex >= 0) {
				band = "body";
			}
			else if (nRowIndex == -1) {
				band = "head";
			}
			else if (nRowIndex == -2) {
				band = "summ";
			}
		}
		else {
			if (format._headrows) {
				if (nRowIndex < format._headrows.length) {
					band = "head";
				}
				else {
					nRowIndex -= format._headrows.length;
				}
			}

			if (band == "none") {
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (format._summrows) {
						if (nRowIndex < format._summrows.length) {
							band = "summ";
						}
						else {
							nRowIndex -= format._headrows.length;
						}
					}
					if (band == "none") {
						band = "body";
					}
				}
				else {
					if (format._bodyrows) {
						var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
						if (nRowIndex < length) {
							band = "body";
						}
						else {
							nRowIndex -= length;
						}
					}
					if (band == "none") {
						if (format._summrows) {
							if (nRowIndex < format._summrows.length) {
								band = "summ";
							}
						}
					}
				}
			}
		}

		var change = false;

		if (band == "body") {
			if (format && format._bodyrows) {
				var nRow = nRowIndex;
				if (this._hasTree) {
					if (nRow >= this._treeIndexes.length) {
						return false;
					}

					nRow = this._treeIndexes[nRow];
				}
				else {
					if (nRow >= this._rowcount) {
						return false;
					}
				}

				var rows = format._bodyrows;
				var rowsLen = rows.length;
				var _rowSizeList = this._rowSizeList;
				var _rowSizeListSub = this._rowSizeListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						this._is_variable_bodyrowsize = true;

						var index = (nRow * rowsLen) + nSubRowIndex;
						var oldsize = _rowSizeListSub[index];
						var newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[nRow] += (newsize - oldsize);
							change = true;

							this._updateRowSizeExtendEx(format._bodyrows, _rowSizeList, _rowSizeListSub, nRow, true);

							if (this.enableredraw) {
								if (this.extendsizetype != "row" && this.extendsizetype != "both") {
									if (this._bodyBand) {
										this._bodyBand._recreate_contents();
									}
								}
								else {
									this._updateRowSize(nRowIndex, nSubRowIndex);
								}
							}
							else {
								if (this.extendsizetype != "row" && this.extendsizetype != "both") {
									this._enable_redraw_history.recreate_body = true;
								}
								else {
									if (!this._enable_redraw_history.updaterowsize) {
										this._enable_redraw_history.updaterowsize = [];
									}

									this._enable_redraw_history.updaterowsize.push([nRowIndex, nSubRowIndex]);
								}
							}
							this._isUserChangeBodyRowSize = true;
						}
					}
					else {
						return false;
					}
				}
				else {
					if (nRow < _rowSizeList.length) {
						this._is_variable_bodyrowsize = true;

						var index, oldsize, newsize;

						for (var i = 0; i < rowsLen; i++) {
							index = (nRow * rowsLen) + i;
							oldsize = _rowSizeListSub[index];
							newsize = nSize;

							if (oldsize != newsize) {
								_rowSizeListSub[index] = newsize;
								_rowSizeList[nRow] += (newsize - oldsize);
								change = true;
							}
						}

						if (change) {
							this._updateRowSizeExtendEx(format._bodyrows, _rowSizeList, _rowSizeListSub, nRow, true);

							if (this.enableredraw) {
								if (this._bodyBand) {
									this._bodyBand._recreate_contents();
								}
							}
							else {
								this._enable_redraw_history.recreate_body = true;
							}
							this._isUserChangeBodyRowSize = true;
						}
					}
					else {
						return false;
					}
				}
			}
		}
		else if (band == "head") {
			if (format && format._headrows) {
				var rows = format._headrows;
				var rowsLen = rows.length;
				var _rowSizeList = this._rowHeadList;
				var _rowSizeListSub = this._rowHeadListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						var index = nSubRowIndex;
						var oldsize = _rowSizeListSub[index];
						var newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
							this._updateRowSizeExtendEx(format._headrows, _rowSizeList, _rowSizeListSub, 0);
						}
					}
					else {
						return false;
					}
				}
				else {
					var index, oldsize, newsize;

					for (var i = 0; i < rowsLen; i++) {
						index = i;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
						}
					}

					if (change == true) {
						this._updateRowSizeExtendEx(format._headrows, _rowSizeList, _rowSizeListSub, 0);
					}
				}

				if (change) {
					if (this.enableredraw) {
						if (this._headBand) {
							this._headBand._recreate_contents();
						}
						this._resizeBand();
					}
					else {
						this._enable_redraw_history.recreate_head = true;
						this._enable_redraw_history.resize_band = true;
					}
					this._isUserChangeHeadRowSize = true;
				}
			}
		}
		else if (band == "summ") {
			if (format && format._summrows) {
				var rows = format._summrows;
				var rowsLen = rows.length;
				var _rowSizeList = this._rowSummList;
				var _rowSizeListSub = this._rowSummListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						var index = nSubRowIndex;
						var oldsize = _rowSizeListSub[index];
						var newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
							this._updateRowSizeExtendEx(format._summrows, _rowSizeList, _rowSizeListSub, 0);
						}
					}
					else {
						return false;
					}
				}
				else {
					var index, oldsize, newsize;

					for (var i = 0; i < rowsLen; i++) {
						index = i;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
						}
					}

					if (change == true) {
						this._updateRowSizeExtendEx(format._summrows, _rowSizeList, _rowSizeListSub, 0);
					}
				}

				if (change == true) {
					if (this.enableredraw) {
						if (this._summBand) {
							this._summBand._recreate_contents();
						}
						this._resizeBand();
					}
					else {
						this._enable_redraw_history.recreate_summ = true;
						this._enable_redraw_history.resize_band = true;
					}
					this._isUserChangeSummRowSize = true;
				}
			}
		}

		return change;
	};

	_pGrid.getRealColSize = function (nColIndex, bBandIndex) {
		var format = this._curFormat;

		var leftcnt = this._getColFixCnt("left");
		var bodycnt = this._getColFixCnt("body");
		var rightcnt = this._getColFixCnt("right");
		var _cols = format._cols;
		var _colsLen = _cols.length;

		var areatype = "body";

		if (bBandIndex == true) {
			if (nColIndex >= 0) {
				nColIndex += leftcnt;
			}
			else if (nColIndex == -2) {
				nColIndex += leftcnt;
				nColIndex += bodycnt;
			}

			if (_colsLen <= nColIndex) {
				return -1;
			}
		}
		return _cols[nColIndex].size;
	};

	_pGrid.getRealRowSize = function (nRowIndex, nSubRowIndex, bBandIndex) {
		var format = this._curFormat;

		if (bBandIndex == undefined) {
			bBandIndex = true;
		}

		var band = "none";
		if (bBandIndex) {
			if (nRowIndex >= 0) {
				band = "body";
			}
			else if (nRowIndex == -1) {
				band = "head";
			}
			else if (nRowIndex == -2) {
				band = "summ";
			}
		}
		else {
			if (format._headrows) {
				if (nRowIndex < format._headrows.length) {
					band = "head";
				}
				else {
					nRowIndex -= format._headrows.length;
				}
			}

			if (band == "none") {
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (format._summrows) {
						if (nRowIndex < format._summrows.length) {
							band = "summ";
						}
						else {
							nRowIndex -= format._headrows.length;
						}
					}
					if (band == "none") {
						band = "body";
					}
				}
				else {
					if (format._bodyrows) {
						var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
						if (nRowIndex < length) {
							band = "body";
						}
						else {
							nRowIndex -= length;
						}
					}
					if (band == "none") {
						if (format._summrows) {
							if (nRowIndex < format._summrows.length) {
								band = "summ";
							}
						}
					}
				}
			}
		}

		if (band == "body") {
			if (format && format._bodyrows) {
				var nRow = nRowIndex;
				if (this._hasTree) {
					if (nRow >= this._treeIndexes.length) {
						return 0;
					}
					nRow = this._treeIndexes[nRow];
				}
				else {
					if (nRow >= this._rowcount) {
						return 0;
					}
				}

				var rows = format._bodyrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowSizeListSub[nRow * rows.length + nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					if (nRow < this._rowSizeList.length) {
						return this._rowSizeList[nRow];
					}
					else {
						return 0;
					}
				}
			}
		}
		else if (band == "head") {
			if (format && format._headrows) {
				var rows = format._headrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowHeadListSub[nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					return this._rowHeadList[0];
				}
			}
		}
		else if (band == "summ") {
			if (format && format._summrows) {
				var rows = format._summrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowSummListSub[nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					return this._rowSummList[0];
				}
			}
		}
		return 0;
	};

	_pGrid.getRealColFullSize = function (strBand) {
		var format = this._curFormat;
		var i, leftcnt, size = 0;

		if (!strBand) {
			leftcnt = this._getColFixCnt("left");
			for (i = 0; i < leftcnt; i++) {
				size += this.getRealColSize(i);
			}

			var bodycnt = this._getColFixCnt("body");

			for (i = 0; i < bodycnt; i++) {
				size += this.getRealColSize(leftcnt + i);
			}

			var rightcnt = this._getColFixCnt("right");
			for (i = 0; i < rightcnt; i++) {
				size += this.getRealColSize(leftcnt + bodycnt + i);
			}
		}
		else {
			strBand = strBand.toLowerCase();
			if (strBand == "left") {
				leftcnt = this._getColFixCnt("left");
				for (i = 0; i < leftcnt; i++) {
					size += this.getRealColSize(i);
				}
			}
			else if (strBand == "body") {
				leftcnt = this._getColFixCnt("left");
				var bodycnt = this._getColFixCnt("body");
				for (i = 0; i < bodycnt; i++) {
					size += this.getRealColSize(leftcnt + i);
				}
			}
			else if (strBand == "right") {
				leftcnt = this._getColFixCnt("left");
				var bodycnt = this._getColFixCnt("body");
				var rightcnt = this._getColFixCnt("right");
				for (i = 0; i < rightcnt; i++) {
					size += this.getRealColSize(leftcnt + bodycnt + i);
				}
			}
		}
		return size;
	};

	_pGrid.getRealRowFullSize = function (strBand) {
		if (!strBand) {
			var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
			var size = 0;

			for (var i = 0; i < length; i++) {
				size += this.getRealRowSize(i);
			}

			size += this.getRealRowSize(-1);
			size += this.getRealRowSize(-2);
			return size;
		}
		else {
			strBand = strBand.toLowerCase();
			if (strBand == "body") {
				var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
				var size = 0;
				for (var i = 0; i < length; i++) {
					size += this.getRealRowSize(i);
				}

				return size;
			}
			else if (strBand == "head") {
				return this.getRealRowSize(-1);
			}
			else if (strBand == "summ" || strBand == "summary") {
				return this.getRealRowSize(-2);
			}
		}
		return 0;
	};

	_pGrid.__createDefualtColFormat = function (band) {
		var strContents;

		strContents = "<Formats>\n";
		strContents += "<Format id=\"default\">\n";
		strContents += "<Columns>\n";
		strContents += "<Column size=\"40\"/>\n";
		strContents += "</Columns>\n";

		if (band == "head") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"head\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"head\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}
		else if (band == "summ" || band == "summary") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"summ\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"summary\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}
		else if (band == "body") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"body\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"body\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}

		strContents += "</Format>\n";
		strContents += "</Formats>\n";

		this.set_formats(strContents);

		return 0;
	};

	_pGrid.appendContentsRow = function (strBand, bBandAppend) {
		if (!strBand) {
			strBand = "body";
		}

		if (typeof (strBand) == "number") {
			if (strBand == -1) {
				strBand = "head";
			}
			else if (strBand == -2) {
				strBand = "summ";
			}
			else if (strBand >= 0) {
				strBand = "body";
			}
		}

		strBand = strBand.toLowerCase();

		if (!this._curFormat) {
			return this.__createDefualtColFormat(strBand);
		}

		if (!bBandAppend == undefined) {
			bBandAppend = true;
		}

		if (bBandAppend == false) {
			strBand = this._getLastRowBand();
		}

		var row = this._curFormat.appendContentsRow(strBand, bBandAppend);
		var rows;

		if (row >= 0) {
			this._recreate();
			this._initSelect();

			if (strBand == "body" || strBand >= 0) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (rows = this._curFormat._summrows) {
						row += rows.length;
					}
				}
			}
			else if (strBand == "summ" || strBand == "summary" || strBand == -2) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype != "top" && this.summarytype != "lefttop") {
					if (rows = this._curFormat._bodyrows) {
						row += rows.length;
					}
				}
			}
		}
		return row;
	};

	_pGrid.appendContentsCol = function (strBand, bBandAppend) {
		if (!this._curFormat || (!isNaN(parseInt(strBand)) && strBand < -2)) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.appendContentsCol(strBand, bBandAppend);

		if (col >= 0) {
			this._recreate();
		}

		return col;
	};

	_pGrid.insertContentsRow = function (strBand, nSubRowIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		if (arguments.length == 1) {
			nSubRowIndex = strBand;
			strBand = "body";
		}
		var row = this._curFormat.insertContentsRow(strBand, nSubRowIndex, bBandIndex);
		var rows;

		if (row >= 0) {
			this._recreate();

			if (strBand == "body" || strBand >= 0) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (rows = this._curFormat._summrows) {
						row += rows.length;
					}
				}
			}
			else if (strBand == "summ" || strBand == "summary" || strBand == -2) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype != "top" && this.summarytype != "lefttop") {
					if (rows = this._curFormat._bodyrows) {
						row += rows.length;
					}
				}
			}
		}
		return row;
	};

	_pGrid.insertContentsCol = function (strBand, nColIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.insertContentsCol(strBand, nColIndex, bBandIndex);

		if (col >= 0) {
			this._recreate();
		}

		return col;
	};

	_pGrid.deleteContentsRow = function (strBand, nSubRowIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		if (arguments.length == 1) {
			nSubRowIndex = strBand;
			strBand = "body";
		}
		var row = this._curFormat.deleteContentsRow(strBand, nSubRowIndex, bBandIndex);

		if (row >= 0) {
			this._recreate();
		}

		return row;
	};

	_pGrid.deleteContentsCol = function (strBand, nColIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.deleteContentsCol(strBand, nColIndex, bBandIndex);

		if (col >= 0) {
			this._recreate();
		}

		return col;
	};

	_pGrid.mergeContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, nFirstCell, bKeepSubCell) {
		if (!this._curFormat) {
			return -1;
		}

		bKeepSubCell = nexacro._toBoolean(bKeepSubCell);
		var cell = this._curFormat.mergeContentsCell(strBand, nStartRow, nStartCol, nEndRow, nEndCol, nFirstCell, bKeepSubCell);

		if (cell >= 0) {
			this._recreate();
		}

		return cell;
	};

	_pGrid.splitContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, bMakeSubCell) {
		if (!this._curFormat) {
			return -1;
		}
		else {
			bMakeSubCell = nexacro._toBoolean(bMakeSubCell);
			var cell = this._curFormat.splitContentsCell(strBand, nStartRow, nStartCol, nEndRow, nEndCol, bMakeSubCell);

			if (cell > 0) {
				this._recreate();
			}
			return cell;
		}
	};

	_pGrid.setBandProperty = function (strBand, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		strBand = strBand.toLowerCase();

		var bandinfo = format.setBandProperty(strBand, strPropID, varValue);
		if (bandinfo) {
			strBand = strBand.toLowerCase();
			if (strBand == "body") {
				this._refreshBody(true);
			}
			else if (strBand == "head") {
				this._refreshHead(true);
			}
			else {
				this._refreshSumm(true);
			}
		}
		return (bandinfo != null);
	};

	_pGrid.getBandProperty = function (strBand, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		strBand = strBand.toLowerCase();

		return format.getBandProperty(strBand, strPropID);
	};

	_pGrid.setCellProperty = function (strBand, nCellIdx, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		strBand = strBand.toLowerCase();

		var cellinfo = format.setCellProperty(strBand, nCellIdx, strPropID, varValue);
		if (cellinfo) {
			if (strPropID == "displaytype" && varValue == "treeitemcontrol") {
				this._setTreeCellinfo(cellinfo);
				this._setTree(true);
			}
			else if (strPropID == "autosizecol" || strPropID == "autosizerow") {
				this._recreate_contents_all(true, false);
			}
			else if (strPropID == "text") {
				if (strBand == "head" && this._headAutoSize) {
					this._recreate_contents_all(true, false);
				}
				else if (strBand == "body" && this._bodyAutoSize) {
					this._recreate_contents_all(true, false);
				}
				else if (strBand.indexOf("summ") >= 0 && this._summAutoSize) {
					this._recreate_contents_all(true, false);
				}
				else {
					this._refreshCell(strBand, nCellIdx, -1);
				}
			}
			else if (strPropID == "suppress") {
				if (varValue != 0) {
					this._is_use_suppress = true;
				}
				else {
					cellinfo._clearSuppressInfo();

					var cells = this._curFormat._bodycells;
					var cellcnt = cells ? cells.length : 0;
					var cellinfo2;

					this._is_use_suppress = false;
					for (var j = 0; j < cellcnt; j++) {
						cellinfo2 = cells[j];
						if (cellinfo2.suppress != 0) {
							this._is_use_suppress = true;
							break;
						}
					}
				}
				this._refreshBody();
			}
			else if (strPropID == "suppressalign" && this._is_use_suppress) {
				this._destroyOverlayElements();
				this._refreshBody();
			}
			else {
				if (strPropID == "displaytype") {
					this._changeDisplayer = true;
				}
				else if (strPropID == "wordwrap") {
					if (varValue != "none") {
						if (strBand == "head") {
							this._is_head_wordwrap = true;
						}
						if (strBand == "body") {
							this._is_body_wordwrap = true;
						}
						if (strBand.indexOf("summ") >= 0) {
							this._is_head_wordwrap = true;
						}
					}
					else {
						var cells, cellcnt, cellinfo2;

						if (strBand == "body") {
							cells = this._curFormat._bodycells;
							cellcnt = cells ? cells.length : 0;

							this._is_body_wordwrap = false;
							for (var j = 0; j < cellcnt; j++) {
								cellinfo2 = cells[j];
								if (cellinfo2.wordwrap != "none") {
									this._is_body_wordwrap = true;
									break;
								}
							}
						}

						if (strBand == "head") {
							cells = this._curFormat._headcells;
							cellcnt = cells ? cells.length : 0;

							this._is_head_wordwrap = false;
							for (var j = 0; j < cellcnt; j++) {
								cellinfo2 = cells[j];
								if (cellinfo2.wordwrap != "none") {
									this._is_head_wordwrap = true;
									break;
								}
							}
						}

						if (strBand == "summ") {
							cells = this._curFormat._summcells;
							cellcnt = cells ? cells.length : 0;

							this._is_summ_wordwrap = false;
							for (var j = 0; j < cellcnt; j++) {
								cellinfo2 = cells[j];
								if (cellinfo2.wordwrap != "none") {
									this._is_summ_wordwrap = true;
									break;
								}
							}
						}
					}
				}

				this._refreshCell(strBand, nCellIdx, -1, strPropID);
				this._changeDisplayer = false;
			}
		}

		return (cellinfo != null);
	};

	_pGrid.getCellProperty = function (strBand, nCellIdx, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		strBand = strBand.toLowerCase();

		return format.getCellProperty(strBand, nCellIdx, strPropID);
	};

	_pGrid.autoFitRow = function (strType) {
	};

	_pGrid.autoFitCol = function () {
		var af = this.autofittype;
		this.autofittype = "col";

		if (this._curFormat) {
			var width;
			var bodysize = this._getBodyClientSize();
			var control_elem = this.getElement();

			width = bodysize[0];

			if (control_elem) {
				if (!this._is_created && width <= 0) {
					width = control_elem.client_width;
				}

				this._curFormat._resetOrgColSize(true, this._autofitcol_rate, width);
			}
		}

		var retn = this._applyAutofittype(true);
		this.autofittype = af;
		return retn;
	};

	_pGrid.autoSizeRow = function (nRowIndex, nSubRowIndex, bIsDatasetRow) {
		if (!this._binddataset || !this._curFormat || nRowIndex == undefined) {
			return false;
		}

		if (bIsDatasetRow == undefined || bIsDatasetRow == true) {
			nRowIndex = this._getDataRow(nRowIndex);
		}

		var retn = false;
		var change = false;

		this._autoSizeRowProc = true;

		if (nRowIndex >= 0) {
			this._is_variable_bodyrowsize = true;

			var rows = this._curFormat._bodyrows;
			var rowsLen = rows.length;

			if (nSubRowIndex >= 0) {
				var index = (nRowIndex * rows.length) + nSubRowIndex;
				var oldsize = this._rowSizeListSub[index];
				var newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

				if (oldsize != newsize) {
					this._rowSizeListSub[index] = newsize;
					this._rowSizeList[nRowIndex] += (newsize - oldsize);
					change = true;
				}
			}
			else {
				for (var j = 0; j < rowsLen; j++) {
					var index = (nRowIndex * rows.length) + j;
					var oldsize = this._rowSizeListSub[index];
					var newsize = this._getMaxSubRowSize(nRowIndex, j);

					if (oldsize != newsize) {
						this._rowSizeListSub[index] = newsize;
						this._rowSizeList[nRowIndex] += (newsize - oldsize);
						change = true;
					}
				}
			}
			if (change == true) {
				this._updateRowSizeExtend();
			}

			this._recreate_contents_all(false, false);
			retn = true;
		}
		else if (nRowIndex == -1) {
			var rows = this._curFormat._headrows;
			var rowsLen = rows.length;

			if (nSubRowIndex >= 0) {
				var index = nSubRowIndex;
				var oldsize = this._rowHeadListSub[index];
				var newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

				if (oldsize != newsize) {
					this._rowHeadListSub[index] = newsize;
					this._rowHeadList[0] += (newsize - oldsize);
					change = true;
				}
			}
			else {
				for (var j = 0; j < rowsLen; j++) {
					var index = j;
					var oldsize = this._rowHeadListSub[index];
					var newsize = this._getMaxSubRowSize(nRowIndex, j);

					if (oldsize != newsize) {
						this._rowHeadListSub[index] = newsize;
						this._rowHeadList[0] += (newsize - oldsize);
						change = true;
					}
				}
			}
			if (change == true) {
				this._updateRowSizeExtend();
			}

			this._resizeBand();
			this._recreate_contents_all(false, false);
			retn = true;
		}
		else if (nRowIndex == -2) {
			var rows = this._curFormat._summrows;
			var rowsLen = rows.length;

			if (nSubRowIndex >= 0) {
				var index = nSubRowIndex;
				var oldsize = this._rowSummListSub[index];
				var newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

				if (oldsize != newsize) {
					this._rowSummListSub[index] = newsize;
					this._rowSummList[0] += (newsize - oldsize);
					change = true;
				}
			}
			else {
				for (var j = 0; j < rowsLen; j++) {
					var index = j;
					var oldsize = this._rowSummListSub[index];
					var newsize = this._getMaxSubRowSize(nRowIndex, j);

					if (oldsize != newsize) {
						this._rowSummListSub[index] = newsize;
						this._rowSummList[0] += (newsize - oldsize);
						change = true;
					}
				}
			}
			if (change == true) {
				this._updateRowSizeExtend();
			}

			this._resizeBand();
			this._recreate_contents_all(false, false);
			retn = true;
		}
		this._autoSizeRowProc = false;
		return retn;
	};

	_pGrid.autoSizeCol = function (strBand, nColIndex, bBandindex) {
		var size, change = false;

		if (bBandindex == undefined) {
			bBandindex = false;
		}

		if (nColIndex == -1) {
			var cols = this._curFormat._cols;
			var colsLen = cols.length;

			for (var i = 0; i < colsLen; i++) {
				size = this._getMaxColDataSizeBand(i);

				if (size >= 0 && this._setColSize(strBand, i, size, bBandindex, true, true, (i != colsLen - 1))) {
					change = true;
				}
			}
		}
		else if (nColIndex >= 0) {
			size = this._getMaxColDataSizeBand(nColIndex);

			if (size >= 0) {
				this._setColSize(strBand, nColIndex, size, bBandindex, true, true);
			}
		}
	};

	_pGrid.isDropdownCalendar = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "CalendarControl") {
			return this._currentCellEditor.isDropdown();
		}
		return false;
	};

	_pGrid.isDropdownCombo = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "ComboControl") {
			return this._currentCellEditor.isDropdown();
		}
		return false;
	};

	_pGrid.moveToNextCell = function () {
		return this._moveToCell("next", true, false, undefined, undefined, true);
	};

	_pGrid.moveToPrevCell = function () {
		return this._moveToCell("prev", true, false, undefined, undefined, true);
	};

	_pGrid.showEditor = function (bShow) {
		var val;

		if (bShow === undefined) {
			bShow = true;
		}
		bShow = nexacro._toBoolean(bShow);

		if (this._showEditing == bShow) {
			return false;
		}

		if (bShow) {
			this.setFocus(false);
			val = this._showEditor();
		}
		else {
			val = this._hideEditor();
		}
		return val;
	};

	_pGrid.dropdownCombo = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "ComboControl") {
			this._currentCellEditor.dropdown();
			return true;
		}
		return false;
	};

	_pGrid.dropdownCalendar = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "CalendarControl") {
			this._currentCellEditor.dropdown();
			return true;
		}
		return false;
	};

	_pGrid.getCurEditType = function () {
		var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
		if (cellinfo) {
			return cellinfo._getAttrValue(cellinfo.edittype, this._selectinfo.curdsrow);
		}
		return "";
	};

	_pGrid.getEditCaret = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp && editComp.getCaretPos) {
				return editComp.getCaretPos();
			}
		}
	};

	_pGrid.getEditSelect = function () {
		var editComp = this._currentCellEditor;
		if (editComp && editComp.getSelect) {
			return editComp.getSelect();
		}
	};

	_pGrid.getEditSelectedText = function () {
		var editComp = this._currentCellEditor;
		if (editComp && editComp.getSelectedText) {
			return editComp.getSelectedText();
		}
		return "";
	};

	_pGrid.getEditText = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp.text;
			}
		}
	};

	_pGrid.setEditCaret = function (nPos) {
	};

	_pGrid.setEditSelect = function (nStart, nEnd) {
		var editor = this._currentCellEditor;

		if (!editor) {
			return false;
		}

		if (nStart == -1) {
			editor.setSelect(0, 0);
			return true;
		}
		else {
			if (editor.setSelect) {
				return editor.setSelect(nStart, nEnd);
			}
		}
		return false;
	};

	_pGrid.setEditSelectedText = function (strText) {
	};

	_pGrid.setEditText = function (strText) {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp.set_value(strText);
			}
		}
	};

	_pGrid.updateToDataset = function () {
		if (this._dsEventOccured) {
			return false;
		}

		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				editComp._setDataset(false, this._currentCellRow);
				return true;
			}
			return false;
		}
		return false;
	};

	_pGrid.setTreeStatus = function (nRowIndex, bTreeStatus) {
		if (!this._hasTree) {
			return false;
		}

		bTreeStatus = nexacro._toBoolean(bTreeStatus);
		var indexes = this._treeIndexes;
		var rowcount = indexes.length;
		var rows = this._bodyBand._get_rows();

		if (rowcount <= nRowIndex || !rows || rows.length == 0) {
			return false;
		}

		var dsrowidx = indexes[nRowIndex];
		var cells = rows[0]._cells;

		var cellinfo = this._treeCellinfo;
		var editType = cellinfo._getEdittype(dsrowidx);

		var retn;
		if (bTreeStatus) {
			retn = this._setTreeState(nRowIndex, 1, true);
		}
		else {
			retn = this._setTreeState(nRowIndex, 0, true);
		}

		if (retn > 0) {
			return true;
		}

		return false;
	};

	_pGrid.getTreeStatus = function (nRowIndex) {
		if (!this._hasTree) {
			return -1;
		}

		var indexes = this._treeIndexes;
		var rowcount = indexes.length;
		var rows = this._bodyBand._get_rows();

		if (rowcount <= nRowIndex || !rows || rows.length == 0) {
			return -1;
		}

		var dsrowidx = indexes[nRowIndex];
		var state = this._treeStates[dsrowidx];
		var cells = rows[0]._cells;

		var cellinfo = this._treeCellinfo;
		var editType = cellinfo._getEdittype(dsrowidx);

		if (editType == "tree") {
			if (cellinfo.treestate._bindtype == 1) {
				var colid = cellinfo.treestate._bindexpr;
				var state2 = this._binddataset.getColumn(dsrowidx, colid);

				if (state2 > 1) {
					state = state2;
				}
			}
		}

		if (state == 2) {
			state++;
		}
		return state;
	};

	_pGrid.getTreeChildCount = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return 0;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2, temp = -1;
			var cnt = 0;

			for (var i = row + 1, n = this._rowcount; i < n; i++) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 >= lvl2) {
					break;
				}

				if (temp >= 0) {
					if (temp >= lvl2) {
						if (temp > lvl2) {
							temp = lvl2;
						}

						cnt++;
					}
				}
				else {
					if (lvl1 < lvl2) {
						cnt++;
						temp = lvl2;
					}
				}
			}
			return cnt;
		}
		return 0;
	};

	_pGrid.getTreeChildRow = function (nRowIndex, nChildIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2, temp = -1;
			var lastrow = -1;
			var cnt = 0;

			for (var i = row + 1, n = this._rowcount; i < n; i++) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 >= lvl2) {
					break;
				}

				if (temp >= 0) {
					if (temp >= lvl2) {
						if (temp > lvl2) {
							temp = lvl2;
						}

						cnt++;
						if (nChildIndex == cnt) {
							return i;
						}

						lastrow = i;
					}
				}
				else {
					if (lvl1 < lvl2) {
						temp = lvl2;
						if (nChildIndex == 0) {
							return i;
						}

						lastrow = i;
					}
				}
			}

			if (nChildIndex == -1) {
				return lastrow;
			}
		}

		return -1;
	};

	_pGrid.getTreeParentRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2;

			for (var i = row - 1; i >= 0; i--) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 > lvl2) {
					return i;
				}
			}
		}
		return -1;
	};

	_pGrid.getTreeSiblingRow = function (nRowIndex, nOffset, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (nOffset === undefined) {
				nOffset = 1;
			}

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2;
			var set = 0;

			if (nOffset < 0) {
				for (var i = row - 1; i >= 0; i--) {
					lvl2 = cellinfo._getTreeLevel(i);
					if (lvl1 > lvl2) {
						break;
					}
					else if (lvl1 == lvl2) {
						set--;
						if (nOffset == set) {
							return i;
						}
					}
				}
			}
			else if (nOffset > 0) {
				for (var i = row + 1, n = this._rowcount; i < n; i++) {
					lvl2 = cellinfo._getTreeLevel(i);
					if (lvl1 > lvl2) {
						break;
					}
					else if (lvl1 == lvl2) {
						set++;
						if (nOffset == set) {
							return i;
						}
					}
				}
			}
			else {
				return row;
			}
		}
		return -1;
	};

	_pGrid.getTreePath = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return "";
			}

			var cellinfo = this._treeCellinfo;
			var lvl = cellinfo._getTreeLevel(row);
			var start = cellinfo._getTreeStartLevel(row);
			var val = [];
			var i = 0;

			while (row >= 0) {
				val[i] = cellinfo._getValue(row);
				row = this.getTreeParentRow(row);
				i++;
			}

			var str = "";
			for (i = val.length - 1; i >= 0; i--) {
				str += val[i];

				if (i > 0) {
					str += this.treepathdelimiter;
				}
			}
			return str;
		}
		return "";
	};

	_pGrid.getTreeRow = function (nRowIndex) {
		if (this._hasTree) {
			if (typeof (nRowIndex) == "string") {
				var treepath = nRowIndex;
				var cnt = this._rowcount;
				var path;
				nRowIndex = -1;

				for (var i = 0; i < cnt; i++) {
					path = this.getTreePath(i, true);
					if (path == treepath) {
						nRowIndex = i;
						break;
					}
				}
			}
			if (nRowIndex >= 0) {
				var _treeIndexes = this._treeIndexes;
				var _treeIndexesLen = _treeIndexes.length;

				for (var k = 0; k < _treeIndexesLen; k++) {
					if (_treeIndexes[k] == nRowIndex) {
						return k;
					}
				}
			}
		}
		return -1;
	};

	_pGrid.getDatasetRow = function (nRowIndex) {
		if (nRowIndex >= 0) {
			if (this._hasTree) {
				if (this._treeIndexes.length > nRowIndex) {
					return this._treeIndexes[nRowIndex];
				}
			}
			else {
				if (this._rowcount > nRowIndex) {
					return nRowIndex;
				}
			}
		}
		return -1;
	};

	_pGrid.isTreeLeafRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var cnt = this.getTreeChildCount(nRowIndex, bIsDatasetRow);
			if (cnt == 0) {
				if (bIsDatasetRow == undefined) {
					bIsDatasetRow = true;
				}
				else {
					bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
				}

				var row = nRowIndex;
				if (bIsDatasetRow === false) {
					row = this.getDatasetRow(nRowIndex);
				}

				if (row < 0 || this._rowcount <= row) {
					return false;
				}

				return true;
			}
		}
		return false;
	};

	_pGrid.isTreeRootRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			var cellinfo = this._treeCellinfo;
			var lvl = cellinfo._getTreeLevel(row);
			var start = cellinfo._getTreeStartLevel(row);

			if (start == lvl) {
				return true;
			}
		}
		return false;
	};

	_pGrid.isTreeExpandedRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			while (row >= 0) {
				row = this.getTreeParentRow(row);

				if (row < 0) {
					break;
				}

				var indexes = this._treeIndexes;
				var rowcount = indexes.length;

				if (row >= 0 && rowcount > 0) {
					var state = this._treeStates[row];

					if (state == 0) {
						return false;
					}
				}
			}
			return true;
		}
		return false;
	};

	_pGrid.isTreeCollapsedRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			while (row >= 0) {
				row = this.getTreeParentRow(row);

				if (row < 0) {
					break;
				}

				var indexes = this._treeIndexes;
				var rowcount = indexes.length;

				if (row >= 0 && rowcount > 0) {
					var state = this._treeStates[row];

					if (state == 0) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid.getCsvData = function () {
	};

	_pGrid.getHeadValue = function (nCell) {
		var format = this._curFormat;
		if (format && format._headcells && nCell >= 0 && format._headcells.length > nCell) {
			var cellinfo = this._curFormat._headcells[nCell];

			if (cellinfo && cellinfo.text._bindtype != 0) {
				return cellinfo._getValue(this._currentDSrow);
			}
		}
		return null;
	};

	_pGrid.getSummValue = function (nCell) {
		var format = this._curFormat;
		if (format && format._summcells && nCell >= 0 && format._summcells.length > nCell) {
			var cellinfo = this._curFormat._summcells[nCell];

			if (cellinfo && cellinfo.text._bindtype != 0) {
				return cellinfo._getValue(this._currentDSrow);
			}
		}
		return null;
	};

	_pGrid.getBindCellIndex = function (strBand, strColID) {
		var format = this._curFormat;

		if (!format) {
			return -1;
		}

		strBand = strBand.toLowerCase();

		if (strColID) {
			if (strBand == "head" && format._headcells) {
				var _headcells = format._headcells;
				var _headcellsLen = _headcells.length;
				var cellinfo;

				for (var i = 0; i < _headcellsLen; i++) {
					cellinfo = _headcells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
			else if (strBand == "body" && format._bodycells) {
				var _bodycells = format._bodycells;
				var _bodycellsLen = _bodycells.length;
				var cellinfo;

				for (var i = 0; i < _bodycellsLen; i++) {
					cellinfo = _bodycells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
			else if (strBand == "summ" && format._summcells) {
				var _summcells = format._summcells;
				var _summcellsLen = _summcells.length;
				var cellinfo;

				for (var i = 0; i < _summcellsLen; i++) {
					cellinfo = _summcells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
		}
		return -1;
	};

	_pGrid.isAboveSelected = function () {
	};

	_pGrid._absolutelyResetScrollPos = function (v) {
		var head = this._headBand;
		var body = this._bodyBand;
		var summ = this._summBand;

		if (this._control_element) {
			this._control_element._reset_scrollpos = v;
		}

		if (head && head._control_element) {
			head._control_element._reset_scrollpos = v;
		}

		if (body && body._control_element) {
			body._control_element._reset_scrollpos = v;
		}

		if (summ && summ._control_element) {
			summ._control_element._reset_scrollpos = v;
		}
	};

	_pGrid._no_use_onscroll_callback_after = false;
	_pGrid._moverow_frame = (nexacro._isTouchInteraction && nexacro._Browser != "Runtime") ? 1 : 0;

	_pGrid._float_updown = false;
	_pGrid._float_center = false;
	_pGrid._float_move = false;
	_pGrid._floating_row_addsize = 2;
	_pGrid._floating_row_border = "1px solid gray";
	_pGrid._floating_row_shadow = "1px 1px 12px gray";
	_pGrid._floating_gap = 3;

	_pGrid._createHighlightRow = function () {
		if (!this._use_blindscroll) {
			return;
		}

		var body = this._bodyBand;

		if (!body) {
			return;
		}

		if (!this._covercontrol) {
			this._covercontrol = new nexacro._GridCoverControl(this._bodyBand, this);
			this._covercontrol.createComponent();
		}

		if (!this._highlight_row_main) {
			var top = (this._float_center && !this._float_updown) ? ((body._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2) : this._floating_gap;
			var highlight_row_main = this._highlight_row_main = new nexacro._GridRowControl(body, this._floating_gap, top + this._fixed_height, null, this._bodyrowheight + this._floating_row_addsize, 0, false, true, this._floating_gap);
			highlight_row_main.set_border(this._floating_row_border);
			highlight_row_main.set_boxShadow(this._floating_row_shadow);
			highlight_row_main.set_visible(false);
			highlight_row_main._updateAll();
			highlight_row_main.createComponent();
		}

		if (!this._float_move) {
			if (this._float_updown) {
				if (!this._highlight_row_sublast) {
					var highlight_row_sublast = this._highlight_row_sublast = new nexacro._GridRowControl(body, this._floating_gap, null, null, this._bodyrowheight + this._floating_row_addsize, 0, false, true, this._floating_gap, this._floating_gap - this._fixed_height);
					highlight_row_sublast.set_border(this._floating_row_border);
					highlight_row_sublast.set_boxShadow(this._floating_row_shadow);
					highlight_row_sublast.set_visible(false);
					highlight_row_sublast._updateAll();
					highlight_row_sublast.createComponent();
				}
				if (this._float_center) {
					if (!this._highlight_row_subcenter) {
						var top = ((body._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2);
						var highlight_row_subcenter = this._highlight_row_subcenter = new nexacro._GridRowControl(body, this._floating_gap, top + this._fixed_height, null, this._bodyrowheight + this._floating_row_addsize, 0, false, true, this._floating_gap);
						highlight_row_subcenter.set_border(this._floating_row_border);
						highlight_row_subcenter.set_boxShadow(this._floating_row_shadow);
						highlight_row_subcenter.set_visible(false);
						highlight_row_subcenter._updateAll();
						highlight_row_subcenter.createComponent();
					}
				}
			}
		}
	};

	_pGrid._updateHighlightrowPos = function () {
		if (!this._bodyBand) {
			return;
		}

		if (!this._float_move) {
			if (this._highlight_row_main) {
				var top = (this._float_center && !this._float_updown) ? ((this._bodyBand._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2) : this._floating_gap;
				this._highlight_row_main._setTop(top + this._fixed_height);
				this._highlight_row_main._update_position();
			}
			if (this._highlight_row_sublast) {
				this._highlight_row_sublast._setBottom(this._floating_gap - this._fixed_height);
				this._highlight_row_sublast._update_position();
			}
			if (this._highlight_row_subcenter) {
				var top = (this._bodyBand._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2 + this._fixed_height;
				this._highlight_row_subcenter._setTop(top);
				this._highlight_row_subcenter._update_position();
			}
		}
	};

	_pGrid._destroyHighlightRow = function () {
		if (this._highlight_row_main) {
			this._highlight_row_main.destroy();
		}
		if (this._highlight_row_sublast) {
			this._highlight_row_sublast.destroy();
		}
		if (this._highlight_row_subcenter) {
			this._highlight_row_subcenter.destroy();
		}
		if (this._covercontrol) {
			this._covercontrol.destroy();
		}

		this._covercontrol = null;
		this._highlight_row_main = null;
		this._highlight_row_sublast = null;
		this._highlight_row_subcenter = null;
	};

	_pGrid._setBlindBody = function (v) {
		var body = this._bodyBand;

		if (this._covercontrol && body) {
			if (v) {
				this._covercontrol._coverOn(0);
			}
			else {
				this._covercontrol._coverOff(0);
			}
		}
	};

	_pGrid._getRowIdxInClient = function (top) {
		var lastrow = this.rowcount - 1;
		var rowpos = this._toprowpos[0];
		var remain = this._toprowpos[1];
		var disprowcnt = this._disprowcnt;
		var bodyrow_h = this._bodyrowheight, incrow_h;

		if (!this._is_variable_bodyrowsize) {
			incrow_h = remain - bodyrow_h + this._fixed_height;
			for (var i = 0; i < disprowcnt; i++) {
				incrow_h += bodyrow_h;

				if (top < incrow_h) {
					rowpos += i;
					break;
				}
			}
		}
		else {
			var toppos = rowpos;
			var rowsizelist = this._rowSizeList;
			var rowsize;

			incrow_h = remain - rowsizelist[this._getDataRow(toppos)] + this._fixed_height;
			for (var i = 0; i < disprowcnt; i++) {
				rowsize = rowsizelist[this._getDataRow(toppos + i)];
				incrow_h += rowsize;

				if (top < incrow_h) {
					rowpos += i;
					break;
				}
			}
		}

		if (rowpos > lastrow) {
			rowpos = lastrow;
		}

		return rowpos;
	};

	_pGrid._floatingScrollRows_callback = function (no_ani) {
		var control_elem = this._control_element;
		var vscroll_limit = control_elem.vscroll_limit;
		var pos = this._vscrollmng._pos;
		var body = this._bodyBand;

		if (pos > vscroll_limit) {
			pos = vscroll_limit;
		}

		this._last_scroll_top = control_elem.scroll_top;
		this._toprowpos = this._getScreenTopRowPos(pos);
		this._bottomrowpos = this._getScreenBottomRowPos(pos);

		this._setBlindBody(true);

		var rowpos;
		var disprowcnt = this._disprowcnt;
		var highlight_row_main = this._highlight_row_main;

		if (this._float_move) {
			var ratio = (pos) ? this._vscrollmng._pos / this._vscrollmng._max : 0;
			var bodyrow_h = this._bodyrowheight;
			var body_height = body._getClientHeight();
			var top;

			if (pos < vscroll_limit) {
				top = ((body_height - (bodyrow_h + this._floating_row_addsize)) * ratio) + this._fixed_height;
				rowpos = this._getRowIdxInClient(top);
			}
			else {
				top = body_height - (bodyrow_h + this._floating_row_addsize) + this._fixed_height;
				rowpos = this.rowcount - 1;
			}

			highlight_row_main._changeRow(rowpos);
			highlight_row_main._updateAll(undefined, undefined, true);
			highlight_row_main.set_top(top);
			highlight_row_main._control_element.setElementHScrollPos(this._getScrollLeft());
			highlight_row_main.set_visible(true);
		}
		else {
			var centerpos = 0;

			rowpos = this._toprowpos[0];

			if (this._float_center) {
				var top = (body._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2 + this._fixed_height;
				centerpos = this._getRowIdxInClient(top) - rowpos;
			}

			if (this._float_updown) {
				highlight_row_main._changeRow(rowpos);
				highlight_row_main._updateAll(undefined, undefined, true);
				highlight_row_main._control_element.setElementHScrollPos(this._getScrollLeft());
				highlight_row_main.set_visible(true);

				var highlight_row_sublast = this._highlight_row_sublast;
				highlight_row_sublast._changeRow(rowpos + disprowcnt - 1);
				highlight_row_sublast._updateAll(undefined, undefined, true);
				highlight_row_sublast._control_element.setElementHScrollPos(this._getScrollLeft());
				highlight_row_sublast.set_visible(true);

				if (this._float_center) {
					var highlight_row_subcenter = this._highlight_row_subcenter;
					highlight_row_subcenter._changeRow(rowpos + centerpos);
					highlight_row_subcenter._updateAll(undefined, undefined, true);
					highlight_row_subcenter._control_element.setElementHScrollPos(this._getScrollLeft());
					highlight_row_subcenter.set_visible(true);
				}
			}
			else {
				highlight_row_main._changeRow(rowpos + centerpos);
				highlight_row_main._updateAll(undefined, undefined, true);
				highlight_row_main._control_element.setElementHScrollPos(this._getScrollLeft());
				highlight_row_main.set_visible(true);
			}
		}

		if (!no_ani) {
			this._scroll_vpos_queue.pop();

			if (this._scroll_vpos_queue.length > 0) {
				this._aniframe_rowscroll_float.start();
			}
		}
		else {
			this._aniframe_rowscroll.stop();
			this._scroll_vpos_queue = [];
		}
	};

	_pGrid._adjustGridScrollRows_callback_end = function () {
		var control_elem = this._control_element;
		var vscroll_limit = control_elem.vscroll_limit;
		var pos = this._vscrollmng._pos;
		var body = this._bodyBand;

		if (pos > vscroll_limit) {
			pos = vscroll_limit;
		}

		if (this._aniframe_rowscroll_float) {
			this._aniframe_rowscroll_float.stop();
		}

		this._aniframe_rowscroll.stop();

		this._last_scroll_top = control_elem.scroll_top;
		this._toprowpos = this._getScreenTopRowPos(pos);
		this._bottomrowpos = this._getScreenBottomRowPos(pos);

		this._scroll_vpos_queue = [];
		body._update_rows = body._matrix._adjustScrollRows(pos, true);

		if (this._use_blindscroll) {
			this._setBlindBody(false);

			if (this._highlight_row_main) {
				this._highlight_row_main.set_visible(false);
			}
			if (this._highlight_row_sublast) {
				this._highlight_row_sublast.set_visible(false);
			}
			if (this._highlight_row_subcenter) {
				this._highlight_row_subcenter.set_visible(false);
			}
		}

		body._on_refresh_rows(true, undefined, false);
		this._no_use_onscroll_callback_after = true;
		control_elem.setElementVScrollPos(pos);
		this._updateSelector("vscroll", pos - this._last_scroll_top);
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._adjustGridScrollRows_callback = function (no_ani) {
		var control_elem = this._control_element;
		var vscroll_limit = control_elem.vscroll_limit;
		var pos = this._vscrollmng._pos;
		var body = this._bodyBand;

		if (pos > vscroll_limit) {
			pos = vscroll_limit;
		}

		this._last_scroll_top = control_elem.scroll_top;
		this._toprowpos = this._getScreenTopRowPos(pos);
		this._bottomrowpos = this._getScreenBottomRowPos(pos);

		if (!no_ani) {
			if (this._moverow_frame > 0) {
				if (body._update_rows.length > 0) {
					this._aniframe_rowscroll.start();
				}
				else {
					this._scroll_vpos_queue = [];
				}
			}
			else {
				this._scroll_vpos_queue.pop();

				if (this._scroll_vpos_queue.length > 0) {
					this._aniframe_rowscroll.start();
				}
			}
		}
		else {
			this._aniframe_rowscroll.stop();
			this._scroll_vpos_queue = [];
		}
		body._update_rows = body._matrix._adjustScrollRows(pos, false, this._moverow_frame);
		body._on_refresh_rows(true, undefined, true);
		this._no_use_onscroll_callback_after = true;
		control_elem.setElementVScrollPos(pos);
		this._updateSelector("vscroll", pos - this._last_scroll_top);
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._adjustGridScrollRows_callback_onscroll_after = function (pos) {
		if (this._no_use_onscroll_callback_after == true) {
			this._no_use_onscroll_callback_after = false;
			return;
		}

		if (pos == undefined) {
			var body = this._bodyBand;
			pos = this._vscrollmng._pos;

			this._toprowpos = this._getScreenTopRowPos(pos);
			this._bottomrowpos = this._getScreenBottomRowPos(pos);
			body._update_rows = body._matrix._adjustScrollRows(pos, true, this._moverow_frame);

			if (body._update_rows.length > 0) {
				this._aniframe_rowscroll.start();
			}

			body._on_refresh_rows(true, undefined, true);
			this._adjustOverlayElements(false, this._is_use_fakemerge);
		}
		else {
			this._aniframe_rowscroll.start();
		}
	};

	_pGrid._adjustGridScrollRows_callback_onscroll = function () {
		this._no_use_onscroll_callback_after = false;

		var pos = this._vscrollmng._pos;
		var control_elem = this._control_element;

		this._last_scroll_top = control_elem.scroll_top;
		control_elem.setElementVScrollPos(pos);
		this._updateSelector("vscroll", pos - this._last_scroll_top);
	};

	_pGrid._callback_onscroll = _pGrid._adjustGridScrollRows_callback_onscroll_after;

	_pGrid._is_over_scroll = 0;

	_pGrid._on_beforescroll = function (prehpos, prevpos, posthpos, postvpos, evttype, evtkind) {
		var hmove = Math.abs(prehpos - posthpos);
		var vmove = Math.abs(prevpos - postvpos);

		if (hmove < vmove) {
			if (prevpos > postvpos || (prevpos < postvpos && this._vscrollmng._orgmax != prevpos)) {
				this._vscrollmng.setPixelPos(postvpos, evtkind, true, true);
				this.on_vscroll(postvpos, evttype, evtkind);
			}
		}
		else if (hmove > vmove) {
			if (prehpos > posthpos || (prehpos < posthpos && this._hscrollmng._orgmax != prehpos)) {
				this._hscrollmng.setPos(posthpos, evtkind, true);
				this.on_hscroll(posthpos, evttype, evtkind);
			}
		}
		else if (evttype == "trackend" || evttype == "trackstart") {
			if (evtkind == "vertical") {
				this.on_vscroll(postvpos, evttype, evtkind);
			}
			else if (evtkind == "horizontal") {
				this.on_hscroll(posthpos, evttype, evtkind);
			}
		}
	};

	_pGrid.on_vscroll = function (postvpos, evttype, evtkind) {
		this._is_over_scroll = 0;

		var vscroll = this._vscrollmng;

		if (!vscroll) {
			return;
		}

		if (this._scrollpixel != "all") {
			if (vscroll._pos > vscroll._orgmax) {
				this._is_over_scroll = vscroll._pos - vscroll._orgmax;
			}
		}

		var control_elem = this._control_element;

		if (!control_elem || !this._bodyBand || evttype == "trackstart" || evttype == "tracklastover" || evttype == "trackfirstover") {
			return;
		}

		if (evttype == "trackend" || evttype == "first" || evttype == "last") {
			this._procRefreshDOM = true;
		}

		if (nexacro._isTouchInteraction && nexacro._Browser != "Runtime") {
			if (evtkind == "mousewheel_v") {
				this._aniframe_rowscroll_end.start();
			}
			else if (this._use_blindscroll && evtkind == "fling") {
				var limit = (this._bodyrowheight + this._floating_row_addsize) + this._floating_gap * 2;
				var cnt = this._scroll_vpos_queue.push(postvpos);

				if (cnt == 1) {
					if (this._bodyBand._getClientHeight() < limit) {
						this._aniframe_rowscroll_end.start();
					}
					else {
						this._aniframe_rowscroll_float.start();
					}
				}
			}
			else {
				if (this._use_blindscroll) {
					this._aniframe_rowscroll_end.start();
				}
				else {
					this._adjustGridScrollRows_callback_onscroll();
				}
			}
		}
		else {
			if (evttype == "track" || evttype == "trackfirst" || evttype == "tracklast") {
				var cnt = this._scroll_vpos_queue.push(postvpos);

				if (cnt == 1) {
					if (this._use_blindscroll) {
						var limit = (this._bodyrowheight + this._floating_row_addsize) + this._floating_gap * 2;
						if (this._bodyBand._getClientHeight() < limit) {
							this._aniframe_rowscroll.start();
						}
						else {
							this._aniframe_rowscroll_float.start();
						}
					}
					else {
						this._aniframe_rowscroll.start();
					}
				}
			}
			else if (evtkind == "fling") {
				if (this._use_blindscroll) {
					var limit = (this._bodyrowheight + this._floating_row_addsize) + this._floating_gap * 2;

					if (this._bodyBand._getClientHeight() < limit) {
						this._adjustGridScrollRows_callback(true);
					}
					else {
						this._floatingScrollRows_callback(true);
					}
				}
				else {
					this._adjustGridScrollRows_callback(true);
				}
			}
			else {
				this._adjustGridScrollRows_callback_end();
			}
		}

		this._procRefreshDOM = undefined;

		return true;
	};

	_pGrid._adjustGridScrollCols_callback = function () {
		var control_elem = this._control_element;
		var pos = this._hscrollmng._pos;

		this._scroll_hpos_queue.pop();

		if (this._scroll_hpos_queue.length > 0) {
			this._aniframe_colscroll.start();
		}

		if (!nexacro._isTouchInteraction) {
			this._last_scroll_left = control_elem.scroll_left;
			this._control_element.setElementHScrollPos(pos);
			this._updateSelector("hscroll", pos - this._last_scroll_left);
		}

		this._bodyBand._matrix._adjustColsDisplay(false, true);
		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay(false, true);
		}
		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay(false, true);
		}

		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._adjustGridScrollCols_callback_end = function () {
		var pos = this._hscrollmng._pos;

		this._scroll_hpos_queue = [];
		this._aniframe_colscroll.stop();

		if (!nexacro._isTouchInteraction) {
			this._last_scroll_left = this._control_element.scroll_left;
			this._control_element.setElementHScrollPos(pos);
			this._updateSelector("hscroll", pos - this._last_scroll_left);
		}

		this._bodyBand._matrix._adjustColsDisplay(false, true);
		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay(false, true);
		}
		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay(false, true);
		}

		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid.on_hscroll = function (posthpos, evttype, evtkind) {
		var control_elem = this._control_element;

		if (!control_elem || !this._bodyBand || evttype == "tracklastover" || evttype == "trackfirstover") {
			return;
		}

		if (evttype == "trackend" || evttype == "first" || evttype == "last") {
			this._procRefreshDOM = true;
		}

		if (nexacro._isTouchInteraction) {
			this._last_scroll_left = control_elem.scroll_left;
			this._control_element.setElementHScrollPos(posthpos);
			this._updateSelector("hscroll", posthpos - this._last_scroll_left);
		}

		if (!this._aniframe_colscroll) {
			var pThis = this;
			this._scroll_hpos_queue = [];

			this._aniframe_colscroll = new nexacro.AnimationFrame(this, function () {
				pThis._adjustGridScrollCols_callback();
			});
			this._aniframe_colscroll_end = new nexacro.AnimationFrame(this, function () {
				pThis._adjustGridScrollCols_callback_end();
			});
		}

		if (nexacro._isTouchInteraction || evttype == "track") {
			var cnt = this._scroll_hpos_queue.push(posthpos);

			if (cnt == 1) {
				this._aniframe_colscroll.start();
			}
		}
		else {
			this._adjustGridScrollCols_callback_end();
		}

		this._procRefreshDOM = undefined;
		return true;
	};

	_pGrid._use_blindscroll = false;
	_pGrid.set_fastvscrolltype = function (v) {
		if (this.fastvscrolltype != v) {
			switch (v) {
				case "default":
					this._float_updown = false;
					this._float_center = false;
					this._use_blindscroll = false;
					this._float_move = false;
					break;
				case "centerdisplay":
					this._float_updown = false;
					this._float_center = true;
					this._use_blindscroll = true;
					this._float_move = false;
					break;
				case "topdisplay":
					this._float_updown = false;
					this._float_center = false;
					this._use_blindscroll = true;
					this._float_move = false;
					break;
				case "topbottomdisplay":
					this._float_updown = true;
					this._float_center = false;
					this._use_blindscroll = true;
					this._float_move = false;
					break;
				case "topcenterbottomdisplay":
					this._float_updown = true;
					this._float_center = true;
					this._use_blindscroll = true;
					this._float_move = false;
					break;
				case "trackbarfollow":
					this._float_updown = false;
					this._float_center = false;
					this._use_blindscroll = true;
					this._float_move = true;
					break;
				default:
					return;
			}
			this.fastvscrolltype = v;
			this.on_apply_fastvscrolltype();
		}
	};

	_pGrid.on_apply_fastvscrolltype = function () {
		if (this._aniframe_rowscroll) {
			this._aniframe_rowscroll.destroy();
			this._aniframe_rowscroll = null;
		}

		this._destroyHighlightRow();
		this._createHighlightRow();

		if (!this._bodyBand) {
			return;
		}

		var pThis = this;

		if (!this._aniframe_rowscroll) {
			if (nexacro._isTouchInteraction && nexacro._Browser != "Runtime") {
				this._bodyBand._control_element._setOnScrollCallbackTarget(this);
				this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () {
					pThis._adjustGridScrollRows_callback_onscroll_after();
				});
			}
			else {
				this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () {
					pThis._adjustGridScrollRows_callback();
				});
			}
		}

		if (this._use_blindscroll && !this._aniframe_rowscroll_float) {
			this._aniframe_rowscroll_float = new nexacro.AnimationFrame(this, function () {
				pThis._floatingScrollRows_callback();
			});
		}

		if (!this._aniframe_rowscroll_end) {
			this._aniframe_rowscroll_end = new nexacro.AnimationFrame(this, function () {
				pThis._adjustGridScrollRows_callback_end();
			});
		}
	};

	_pGrid._isWheelScrollable = function (delta) {
		var control_elem = this._control_element;
		if (!control_elem) {
			return false;
		}

		var st = control_elem.scroll_top;
		var sh = control_elem.container_maxheight;
		var ch = this._getBodyClientSize()[1];

		if ((st + ch >= sh && delta < 0) || (st == 0 && delta > 0)) {
			return false;
		}

		return true;
	};

	_pGrid._setVScrollDefaultAction = function (wheelDelta) {
		var pos, max;
		var vscroll = this._vscrollmng;
		var prevpos = vscroll.pos;

		if (this._scrollpixel != "all") {
			if (wheelDelta < 0) {
				if (vscroll.max > vscroll.pos) {
					pos = vscroll.pos + this.wheelscrollrow;
				}
				else {
					vscroll.setPixelPos(vscroll._pos - wheelDelta, "mousewheel_v");
					if (prevpos != vscroll.pos) {
						return true;
					}

					return false;
				}
			}
			else {
				if (vscroll.min < vscroll.pos) {
					pos = vscroll.pos - this.wheelscrollrow;
				}
				else {
					vscroll.setPixelPos(vscroll._pos - wheelDelta, "mousewheel_v");
					if (prevpos != vscroll.pos) {
						return true;
					}

					return false;
				}
			}
		}
		else {
			if (wheelDelta < 0) {
				pos = vscroll._scroll_reverse_convert(vscroll.pos, true)[0];
				max = vscroll._scroll_reverse_convert(vscroll.max, true)[0];

				if (max > pos) {
					pos += this.wheelscrollrow;
				}
				else {
					vscroll.setPixelPos(vscroll._pos - wheelDelta, "mousewheel_v");

					if (prevpos != vscroll.pos) {
						return true;
					}

					return false;
				}
			}
			else {
				pos = vscroll._scroll_reverse_convert(vscroll.pos, true)[0];
				pos -= this.wheelscrollrow;
			}
		}

		vscroll.setRowPos(pos + this._getFixRowCnt(), "mousewheel_v");

		if (prevpos != vscroll.pos) {
			return true;
		}

		return false;
	};

	_pGrid._makeEventInfo = function (cellobj, subcellobj, from_refer_comp) {
		var obj = {
			cell : -1, 
			col : -1, 
			row : -9, 
			subrow : -1, 
			mergecell : -1, 
			mergecol : -1, 
			mergerow : -1, 
			pivotindex : -9
		};

		if (cellobj && cellobj._type_name == "GridCellControl") {
			obj.cell = cellobj._cellidx;
			obj.col = cellobj._refinfo._col;
			obj.row = this._getDataRow(cellobj._rowidx);
			obj.subrow = cellobj._refinfo._row;

			if (subcellobj) {
				obj.mergecell = subcellobj._cellidx;
				obj.mergecol = subcellobj._refinfo._col;
				obj.mergerow = subcellobj._refinfo._row;
			}
		}
		else {
			var band = this._findBandObj(from_refer_comp);

			if (band) {
				if (band.id == "head") {
					obj.row = -1;
				}
				else if (band.id == "summary") {
					obj.row = -2;
				}
			}
		}
		return obj;
	};

	_pGrid.on_fire_sys_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		this._applyResizer();
		return nexacro.Component.prototype.on_fire_sys_onslideend.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_sys_onflingend = function () {
		if (this._aniframe_colscroll_end) {
			this._aniframe_colscroll_end.start();
		}
		if (this._aniframe_rowscroll_end) {
			this._aniframe_rowscroll_end.start();
		}

		return true;
	};

	_pGrid._on_nodataareaclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}
		if (this.enable) {
			this.on_fire_onnodataareaclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		}
		return true;
	};

	_pGrid.on_fire_onnodataareaclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onnodataareaclick && this.onnodataareaclick._has_handlers) {
			var evt = new nexacro.MouseEventInfo(from_comp, "onnodataareaclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onnodataareaclick._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid._on_nodataareadblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}
		if (this.enable) {
			this.on_fire_onnodataareadblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		}
		return true;
	};

	_pGrid.on_fire_onnodataareadblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onnodataareadblclick && this.onnodataareadblclick._has_handlers) {
			var evt = new nexacro.MouseEventInfo(from_comp, "onnodataareadblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onnodataareadblclick._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._noFireDragFlag == true) {
			return;
		}

		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		return nexacro.Component.prototype.on_fire_user_ondragenter.call(this, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._noFireDragFlag == true) {
			return;
		}

		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		return nexacro.Component.prototype.on_fire_user_ondragleave.call(this, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._noFireDragFlag == true) {
			return;
		}

		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.ondragmove && this.ondragmove._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridDragEventInfo(this, "ondragmove", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow);

			return this.ondragmove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_sys_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_drag_sameselect) {
			return this._areaselectMove(from_refer_comp, canvasX, canvasY);
		}
		else {
			this._is_drag_selecting = true;
		}
	};

	_pGrid._noFireDragFlag = false;
	_pGrid.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, self_refer_comp) {
		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
		var cell = evtinfo.cell;
		var col = evtinfo.col;
		var mergecell = evtinfo.mergecell;
		var mergecol = evtinfo.mergecol;
		var mergerow = evtinfo.mergerow;
		var pivotindex = evtinfo.pivotindex;
		var row = evtinfo.row;
		var subrow = evtinfo.subrow;

		this._noFireDragFlag = false;
		var evt;
		var retn = null;

		if (this.ondrag && this.ondrag._has_handlers) {
			evt = new nexacro.GridDragEventInfo(this, "ondrag", this._getDragData(), null, this, self_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow);

			if (this.ondrag._fireUserEvent(this, evt) == true) {
				retn = [true, this, self_refer_comp, evt.dragdata, evt.userdata];
			}
			else if (this.ondrag.defaultprevented == true) {
				retn = [false, this, self_refer_comp, evt.dragdata, evt.userdata];
			}
		}

		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking == true) {
			var resize_cursor = nexacro.CursorObject("row-resize");
			this._setGlobalCursor(resize_cursor, cellobj);
		}
		else if (this._resizer_colctrl && this._resizer_colctrl._is_tracking == true) {
			var resize_cursor = nexacro.CursorObject("col-resize");
			this._setGlobalCursor(resize_cursor, cellobj);
		}
		else if (this.cellmovingtype != "none") {
			if (cellobj && cellobj._type_name == "GridCellControl" && cellobj._rowidx == -1) {
				var colidx = cellobj._refinfo._col;
				var info0 = this._getColMergeInfo("head", colidx);
				var info1 = this._getColMergeInfo("body", colidx);
				var info2 = this._getColMergeInfo("summ", colidx);
				var dragcursor = nexacro.CursorObject("move");

				if (info0[1] == 1 && (info1 == null || info1[1] == 1) && (info2 == null || info2[1] == 1)) {
					if (this.cellmovingtype != "none") {
						this._movingcell = cellobj;
						cellobj.parent._setTempCursor(dragcursor);
					}
				}
				else {
					this._movingcell = null;
				}
			}

			if (this._movingcell != null) {
				if (retn) {
					this._noFireDragFlag = !retn[0];
					retn[0] = true;
				}
				else {
					this._noFireDragFlag = true;
					retn = [true, this, self_refer_comp, this._getDragData(), null];
				}
			}
		}

		if (!retn) {
			retn = [false];
		}

		return retn;
	};

	_pGrid.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking == true) {
			this._setGlobalCursor(null, cellobj);
		}
		else if (this._resizer_colctrl && this._resizer_colctrl._is_tracking == true) {
			this._setGlobalCursor(null, cellobj);
		}
		else if (this.cellmovingtype != "none" && this._movingcell) {
			var movingcell = this._movingcell;
			var format = this._curFormat;

			movingcell.parent._setTempCursor(null);

			if (movingcell && movingcell._is_alive && movingcell != cellobj && cellobj._rowidx == -1) {
				var fromcol = movingcell._refinfo._col;
				var fromidx = movingcell._refinfo._cellidx;
				var tocol = cellobj._refinfo._col;
				var fromcolspan = movingcell._refinfo._colspan;

				var info = this._getColMergeInfo("head", tocol);
				tocol = info[0];
				var tocolspan = info[1];

				this._autofitcol_rate = [];
				format._moveColumn(fromcol, tocol, fromcolspan, tocolspan, this.cellmovingtype);

				this._addRefreshContents("cellmoving", this._headBand);
				this._addRefreshContents("cellmoving", this._bodyBand);
				this._addRefreshContents("cellmoving", this._summBand);
			}
			this._movingcell = null;
		}

		if (this._noFireDragFlag == true) {
			this._noFireDragFlag = false;
			return;
		}

		if (this.ondrop && this.ondrop._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridDragEventInfo(this, "ondrop", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow);

			return this.ondrop._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid._isDownUpScroll = function () {
		if (this._down_scroll_top >= 0 && this._down_scroll_top != this._last_scroll_top) {
			return true;
		}

		return false;
	};

	_pGrid._mouseSelection = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, no_select) {
		var editor = this._currentCellEditor;
		var fobj = from_refer_comp;
		var bhide = true;

		while (fobj) {
			if (fobj == editor || fobj instanceof nexacro.ScrollBarControl) {
				bhide = false;
				break;
			}
			fobj = fobj.parent;
		}

		if (bhide && editor) {
			this._hideEditor();
		}

		if (this._resizer_colctrl && this._resizer_colctrl._is_tracking) {
			return;
		}
		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking) {
			return;
		}
		if (this._isDownUpScroll()) {
			return;
		}

		if (cellobj && cellobj._type_name == "GridCellControl") {
			this._lbuttondown_proc = true;

			var band = cellobj._band.id;
			var retn = this._on_grid_lbuttondown(cellobj, band, ctrl_key, shift_key, no_select);

			if (!cellobj._is_alive || no_select) {
				return;
			}

			if (this._showEditorCell) {
				if (nexacro._toBoolean(this.readonly) == false) {
					if (retn) {
						var cell = cellobj;

						if (cell && cell._hasEditor()) {
							cell._showEditor(true);
							var datarow = this._getDataRow(cell._rowidx);
							this._beforeEditRowIdx = datarow;
							this._beforeEditCellIdx = cell._cellidx;
							this._showEditing = true;
						}
					}
					else {
						this._onceTime_focus = true;
						this._showEditor();
						this._onceTime_focus = false;
					}
				}
				this._showEditorCell = false;
				this._showEditRowIdx = -1;
				this._showEditCellIdx = -1;
			}

			if (this.selectchangetype == "down" && nexacro._toBoolean(this.readonly) == false) {
				var datarow = this._getDataRow(cellobj._rowidx);
				var displayType = cellobj._refinfo._getDisplaytype(datarow);

				if (displayType == "checkboxcontrol") {
					if (this.cellclickbound == "cell") {
						cellobj._needToggle("onlbuttondown", cellobj);
					}
					else {
						if (cellobj != from_refer_comp && cellobj._subComp && cellobj._subComp._toggleCheck) {
							if (cellobj.selected) {
								cellobj._subComp._toggleCheck();
							}
						}
					}
				}
				else {
					cellobj._needToggle("onlbuttondown", cellobj);
				}
			}
			this._lbuttondown_proc = false;
		}
	};

	_pGrid._common_fire_sys_lbuttondown = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		if (this.selectchangetype == "up") {
			if (this._isAreaSelect() && this._selectscrollmode == "select") {
				this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
			}
			else if (this.selecttype == "multirow") {
				this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, true);
			}

			var win = this._getWindow();
			if (!win._cur_ldown_elem) {
				this._setdataobj = null;
			}
		}
		else {
			this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
		}

		if (this._is_down_act) {
			this._on_last_lbuttonup(true);
		}
	};

	_pGrid._common_fire_user_lbuttondown = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		this._resizerStart(canvasX, canvasY, cellobj, "down", from_refer_comp);

		var resizer_colctrl = this._resizer_colctrl;
		var resizer_rowctrl = this._resizer_rowctrl;
		var client = this._getClientXY(canvasX, canvasY);
		var win = this._getWindow();

		if (resizer_colctrl && resizer_colctrl._is_range) {
			resizer_colctrl._setTracksize(this._getClientHeight());

			if (resizer_colctrl._direction == "horizon") {
				resizer_colctrl.move(client[0], this._getClientTop(), 1, resizer_colctrl._tracksize);
			}

			nexacro._setTrackInfo(win, resizer_colctrl, win._curWindowX, win._curWindowY);
		}
		else if (resizer_rowctrl && resizer_rowctrl._is_range) {
			resizer_rowctrl._setTracksize(this._getClientWidth());

			if (resizer_rowctrl._direction == "vertical") {
				resizer_rowctrl.move(this._getClientLeft(), client[1], resizer_rowctrl._tracksize, 1);
			}

			nexacro._setTrackInfo(win, resizer_rowctrl, win._curWindowX, win._curWindowY);
		}

		if (this._select_ctrl) {
			this._select_ctrl._initTrackInfo();
		}
	};

	_pGrid._recalcTouchInfosXY = function (obj, touchinfos, need_recalcXY, from_refer_comp) {
		var touchinfo, posobj;
		for (var i = 0, n = touchinfos.length; i < n; i++) {
			if (touchinfo = touchinfos[i]) {
				posobj = this._recalcXY(obj, touchinfo.canvasx, touchinfo.canvasy, need_recalcXY, from_refer_comp);
				touchinfo.canvasx = posobj.canvasX;
				touchinfo.canvasy = posobj.canvasY;
				touchinfo.clientx = posobj.clientX;
				touchinfo.clienty = posobj.clientY;
			}
		}
	};

	_pGrid._getRecalcCanvasXY = function (elem, canvasX, canvasY) {
		if (this._recalcXY_info) {
			canvasX = this._recalcXY_info[0] + this._adjust_left;
			canvasY = this._recalcXY_info[1] + this._adjust_top;
			this._recalcXY_info = null;
		}
		else {
			canvasX += this._adjust_left - this._scroll_left || 0;
			canvasY += this._adjust_top - this._scroll_top || 0;
		}
		return [canvasX, canvasY];
	};

	_pGrid._recalcXY = function (obj, canvasX, canvasY, need_recalcXY, from_refer_comp) {
		var real_canvasX = canvasX;
		var real_canvasY = canvasY;

		if (obj._type_name == "GridCellControl") {
			if (need_recalcXY) {
				var rect = obj._setPositionInGrid(null, false, true);

				real_canvasX = canvasX + rect.orgl;
				real_canvasY = canvasY + rect.orgt;
			}
			else {
				var area = obj._refinfo._area;
				var band = obj._band.id;

				if (area == "body") {
					real_canvasX = canvasX + this._curFormat.leftWidth;
					real_canvasX -= this._getScrollLeft();
				}
				else if (area == "right") {
					var gridrow = obj._getRowControl();
					var rect = gridrow._getAreaRect(area);
					var areal = rect.left;
					real_canvasX = canvasX + areal;
				}

				if (band == "body" && !obj.parent._fixed) {
					real_canvasY -= this._getScrollTop();
					real_canvasY += this._fixed_height;
				}
			}
		}

		if (!(from_refer_comp instanceof nexacro.Grid)) {
			if (from_refer_comp._type_name == "GridRowControl") {
				real_canvasY -= this._getScrollTop();
			}

			var cur_border = this._border || this._getCSSStyleValue("border", this._status);
			if (cur_border) {
				real_canvasX += cur_border.left._width;
				real_canvasY += cur_border.top._width;
			}
		}

		this._recalcXY_info = [real_canvasX, real_canvasY];
		var real_clientXY = this._getClientXY(real_canvasX, real_canvasY);

		return {
			canvasX : real_canvasX, 
			canvasY : real_canvasY, 
			clientX : real_clientXY[0], 
			clientY : real_clientXY[1]
		};
	};

	_pGrid.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, false, need_recalcXY);
	};

	_pGrid._down_scroll_top = -1;
	_pGrid.on_fire_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, user_fire, need_recalcXY) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, need_recalcXY, from_refer_comp);

		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		var subcellobj;

		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var retn = false;
		if (this.ontouchstart && this.ontouchstart._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);

			if (user_fire) {
				retn = this.ontouchstart._fireUserEvent(this, evt);
			}
			else {
				retn = this.ontouchstart._fireSysEvent(this, evt);
			}
		}

		this._down_scroll_top = this._last_scroll_top;

		if (touchinfo) {
			if (user_fire) {
				this._common_fire_user_lbuttondown(cellobj, false, false, touchinfo.canvasx, touchinfo.canvasy, from_comp, from_refer_comp);
			}
			else {
				if (this._selectscrollmode == "select") {
					if (cellobj._band && cellobj._band.id == "body") {
						if (this._isAreaSelect()) {
							this._common_fire_sys_lbuttondown(cellobj, false, false, touchinfo.canvasx, touchinfo.canvasy, from_comp, from_refer_comp);
						}
					}
				}
			}
		}
		return retn;
	};

	_pGrid.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false, need_recalcXY);
	};

	_pGrid.on_touch_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp) {
		var retn = nexacro.Component.prototype.on_touch_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp);

		var cellobj = refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;

		this._down_scroll_top = this._last_scroll_top;
		this._common_fire_user_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, fire_comp, refer_comp);

		if (this._selectscrollmode == "select") {
			if (cellobj._band && cellobj._band.id == "body") {
				if (this._isAreaSelect()) {
					this._common_fire_sys_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, fire_comp, refer_comp);
				}
			}
		}

		return retn;
	};

	_pGrid.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire, need_recalcXY) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, need_recalcXY, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onlbuttondown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

			if (user_fire) {
				retn = this.onlbuttondown._fireUserEvent(this, evt);
			}
			else {
				retn = this.onlbuttondown._fireSysEvent(this, evt);
			}
		}

		if (!nexacro._isTouchInteraction) {
			if (user_fire) {
				this._common_fire_user_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
			}
			else {
				this._common_fire_sys_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
			}
		}
		return retn;
	};

	_pGrid.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onrbuttondown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.on_fire_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true);
	};

	_pGrid.on_fire_sys_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.on_fire_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false);
	};

	_pGrid.on_fire_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmousedown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

			if (user_fire) {
				retn = this.onmousedown._fireUserEvent(this, evt);
			}
			else {
				retn = this.onmousedown._fireSysEvent(this, evt);
			}
		}

		return retn;
	};

	_pGrid._resetFixSize = function () {
		var rowsizes = this._rowSizeList;
		var fixrow_height = 0, fix_height = 0;
		var srow = this._fixed_startrow;
		var erow = this._fixed_endrow;

		if (srow < 0) {
			return;
		}

		for (var i = 0, n = rowsizes.length; i < n; i++) {
			fixrow_height += rowsizes[i];

			if (srow > i) {
				continue;
			}

			fix_height += rowsizes[i];

			if (erow == i) {
				break;
			}
		}

		this._fixed_height = fix_height;
		this._fixedrow_height = fixrow_height;

		this._updateHighlightrowPos();
	};

	_pGrid.setFixedRow = function (row) {
		this._setFixedRow(row, undefined);
	};

	_pGrid._setFixedRow = function (fixrow, no_redraw) {
		if (this._hasTree) {
			return;
		}

		var bfix = (fixrow < 0) ? false : true;
		var srow, erow = this._endrowpos;

		srow = this._fixed_startrow;

		if (srow < 0) {
			srow = this._toprowpos[0];
		}

		if (fixrow >= 0 && (fixrow < srow || fixrow > erow)) {
			return;
		}

		if (bfix) {
			if (this._fixed_height) {
				this._setFixedRow(-1);
				return;
			}
		}

		var band = this._bodyBand;

		if (bfix) {
			var rowcnt = this._getGridRowCount();
			var toppos = this._toprowpos[0];
			var fixedheight = 0, fixedrow_height = 0;
			var bset = false;
			var rowheight = 0;

			for (var i = 0; i < rowcnt; i++) {
				this._fixed_rowcnt++;
				rowheight = this._getRowSize(i);
				fixedrow_height += rowheight;

				if (i >= toppos) {
					if (this._fixed_startrow < 0) {
						this._fixed_startrow = i;
					}

					fixedheight += rowheight;
					bset = true;
				}

				if (i >= fixrow) {
					break;
				}
			}

			if (bset) {
				this._fixedrow_height = fixedrow_height;
				this._fixed_endrow = fixrow;
				this._fixed_height = fixedheight;

				if (!no_redraw) {
					this._recreate_contents_all(false, true, true);
				}
			}
			else {
				this._fixed_startrow = -9;
				this._fixed_endrow = -9;
				this._fixed_height = 0;
				this._fixedrow_height = 0;
				this._fixed_rowcnt = 0;
			}
		}
		else {
			var srow = this._fixed_startrow;

			this._fixed_endrow = -9;
			this._fixed_height = 0;
			this._fixedrow_height = 0;
			this._fixed_rowcnt = 0;
			this._fixed_startrow = -9;

			if (!no_redraw) {
				this._recreate_contents_all(false, false, true);

				if (srow >= 0) {
					this._vscrollmng.setRowPos(srow);
				}
			}
		}

		this._destroyHighlightRow();
		this._createHighlightRow();
	};

	_pGrid._getFixRowCnt = function () {
		return (this._bodyBand) ? this._fixed_rowcnt : 0;
	};

	_pGrid._checkInclude = function (fake, subrowcnt, col, row, subrow) {
		if (fake.start_column <= col && fake.end_column >= col) {
			if (fake.start_row <= row && fake.end_row >= row) {
				if (subrow == undefined || fake.start_subrow == undefined) {
					return true;
				}
				else {
					if (fake.start_row < row && fake.end_row > row) {
						return true;
					}

					if (fake.start_row == fake.end_row) {
						if (fake.start_subrow <= subrow && fake.end_subrow >= subrow) {
							return true;
						}
					}
					else {
						if (fake.start_row == row) {
							if (fake.start_subrow <= subrow && subrowcnt > subrow) {
								return true;
							}
						}

						if (fake.end_row == row) {
							if (0 <= subrow && fake.end_subrow >= subrow) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	};

	_pGrid._getFakeMergeCellInfos = function (cellinfos, scol, ecol, srow, erow, ssubrow, esubrow, subrowcnt) {
		var target_cellinfos = [];
		var cellsrow, cheksrow, cellerow, chekerow;
		var col1, col2, colspan, row1, row2, rowspan;

		for (var i = 0, n = cellinfos.length; i < n; i++) {
			col1 = cellinfos[i]._col;
			colspan = cellinfos[i]._colspan;
			col2 = col1 + colspan - 1;
			row1 = cellinfos[i]._row;
			rowspan = cellinfos[i]._rowspan;
			row2 = row1 + rowspan - 1;

			if ((scol <= col1 && ecol >= col1) || (scol <= col2 && ecol >= col2) || (col1 <= scol && col2 >= scol) || (col1 <= ecol && col2 >= ecol)) {
				if (srow >= 0) {
					cellsrow = srow * subrowcnt + row1;
					cheksrow = srow * subrowcnt + ssubrow;
					cellerow = erow * subrowcnt + row2;
					chekerow = erow * subrowcnt + esubrow;
				}
				else {
					cellsrow = row1;
					cheksrow = ssubrow;
					cellerow = row2;
					chekerow = esubrow;
				}

				if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
					target_cellinfos.push(cellinfos[i]);
				}
			}
		}
		return target_cellinfos;
	};

	_pGrid.setFakeMerge = function (scol, ecol, srow, erow, ssubrow, esubrow) {
		this._setFakeMerge(scol, srow, ssubrow, ecol, erow, esubrow, false);
	};

	_pGrid._getFakeMergeCellObjs = function (fake_mergecell) {
		var band;
		var cellobjs = [];
		var format = this._curFormat;
		var subrowcnt;

		if (fake_mergecell.start_row == -1) {
			band = this._headBand;
			subrowcnt = format._headrows.length;
		}
		else if (fake_mergecell.start_row == -2) {
			band = this._summBand;
			subrowcnt = format._summrows.length;
		}
		else if (fake_mergecell.start_row >= 0) {
			band = this._bodyBand;
			subrowcnt = format._bodyrows.length;
		}

		if (!band) {
			return cellobjs;
		}

		var rows = band._get_rows();
		var cells;
		var scol = fake_mergecell.start_column;
		var ecol = fake_mergecell.end_column;
		var srow = fake_mergecell.start_row;
		var erow = fake_mergecell.end_row;
		var ssubrow = fake_mergecell.start_subrow;
		var esubrow = fake_mergecell.end_subrow;
		var datarow;
		var cellsrow, cheksrow, cellerow, chekerow;
		var cellinfo;

		for (var i = 0, n = rows.length; i < n; i++) {
			datarow = this._getDataRow(rows[i]._rowidx);

			if (datarow >= srow && datarow <= erow) {
				cells = rows[i]._cells;

				for (var j = 0, nn = cells.length; j < nn; j++) {
					cellinfo = cells[j]._refinfo;

					if (cellinfo._col >= scol && cellinfo._col <= ecol) {
						if (ssubrow == undefined) {
							cellobjs.push(cells[j]);
						}
						else {
							if (srow >= 0) {
								cellsrow = datarow * subrowcnt + cellinfo._row;
								cheksrow = srow * subrowcnt + ssubrow;
								cellerow = datarow * subrowcnt + cellinfo._row + cellinfo._rowspan - 1;
								chekerow = erow * subrowcnt + esubrow;
							}
							else {
								cellsrow = cellinfo._row;
								cheksrow = ssubrow;
								cellerow = cellinfo._row + cellinfo._rowspan - 1;
								chekerow = esubrow;
							}

							if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
								cellobjs.push(cells[j]);
							}
						}
					}
				}
			}
		}
		return cellobjs;
	};

	_pGrid._is_use_fakemerge = false;
	_pGrid._setFakeMerge = function (scol, srow, ssubrow, ecol, erow, esubrow, norelease) {
		var format = this._curFormat;
		var cellinfos;
		var subrowcnt;
		var band;

		if (scol > ecol || scol < 0 || ecol < 0) {
			return false;
		}

		if (srow == -1 || erow == -1) {
			if (srow != erow) {
				return false;
			}

			if (!format._headrows) {
				return false;
			}

			cellinfos = format._headcells;
			subrowcnt = format._headrows.length;
			band = "head";

			if (esubrow < ssubrow) {
				return false;
			}
		}
		else if (srow == -2 || erow == -2) {
			if (srow != erow) {
				return false;
			}

			if (!format._summrows) {
				return false;
			}

			cellinfos = format._summcells;
			subrowcnt = format._summrows.length;
			band = "summ";

			if (esubrow < ssubrow) {
				return false;
			}
		}
		else {
			if (srow < 0 || erow < 0) {
				return false;
			}

			if (srow > erow) {
				return false;
			}

			if (!format._bodyrows) {
				return false;
			}

			cellinfos = format._bodycells;
			subrowcnt = format._bodyrows.length;
			band = "body";
		}

		if (ssubrow == undefined) {
			ssubrow = 0;
		}
		if (esubrow == undefined) {
			esubrow = subrowcnt - 1;
		}

		if (subrowcnt <= ssubrow || subrowcnt <= esubrow) {
			return false;
		}

		var col1, colspan, col2, fail = false;
		var row1, rowspan, row2;
		var target_cellinfos = [];
		var cell = null;
		var cellsrow, cheksrow, cellerow, chekerow;

		for (var i = 0, n = cellinfos.length; i < n; i++) {
			cell = cellinfos[i];
			col1 = cell._col;
			colspan = cell._colspan;
			col2 = col1 + colspan - 1;
			row1 = cell._row;
			rowspan = cell._rowspan;
			row2 = row1 + rowspan - 1;

			if ((scol <= col1 && ecol >= col1) || (scol <= col2 && ecol >= col2) || (col1 <= scol && col2 >= scol) || (col1 <= ecol && col2 >= ecol)) {
				if (srow >= 0) {
					cellsrow = srow * subrowcnt + row1;
					cheksrow = srow * subrowcnt + ssubrow;
					cellerow = erow * subrowcnt + row2;
					chekerow = erow * subrowcnt + esubrow;
				}
				else {
					cellsrow = row1;
					cheksrow = ssubrow;
					cellerow = row2;
					chekerow = esubrow;
				}

				if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
					if (cell.suppress != 0) {
						return false;
					}

					var change = false;

					if (cell._colspan > 1) {
						var cellecol = cell._col + cell._colspan - 1;
						if (cell._col < scol) {
							change = true;
							scol = cell._col;
						}
						if (cellecol > ecol) {
							change = true;
							ecol = cellecol;
						}
					}

					if (cell._rowspan > 1) {
						if (cellsrow < cheksrow) {
							change = true;
							ssubrow = cell._row;
						}
						if (cellerow > chekerow) {
							change = true;
							esubrow = cell._row + cell._rowspan - 1;
						}
					}

					if (change == true) {
						target_cellinfos = [];
						i = -1;
					}
					else {
						target_cellinfos.push(cell);
					}
				}
			}
		}

		var fake_mergecell = {
			start_column : scol, 
			start_row : srow, 
			start_subrow : ssubrow, 
			end_column : ecol, 
			end_row : erow, 
			end_subrow : esubrow, 
			cellinfos : target_cellinfos
		};
		var fake_arr = this._fake_mergecell_arr;
		var fake_arr_len = fake_arr.length;
		var fake_merge;
		var i = 0, n;


		var fail_idxs = [];
		for (; i < fake_arr_len; i++) {
			if (this._checkInclude(fake_arr[i], subrowcnt, scol, srow, ssubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_arr[i], subrowcnt, scol, erow, esubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_arr[i], subrowcnt, ecol, srow, ssubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_arr[i], subrowcnt, ecol, erow, esubrow)) {
				fail_idxs.push(i);
			}

			else if (this._checkInclude(fake_mergecell, subrowcnt, fake_arr[i].start_column, fake_arr[i].start_row, fake_arr[i].start_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_mergecell, subrowcnt, fake_arr[i].start_column, fake_arr[i].end_row, fake_arr[i].end_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_mergecell, subrowcnt, fake_arr[i].end_column, fake_arr[i].start_row, fake_arr[i].start_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_mergecell, subrowcnt, fake_arr[i].end_column, fake_arr[i].end_row, fake_arr[i].end_subrow)) {
				fail_idxs.push(i);
			}
		}

		if (fail_idxs.length == 0) {
			for (i = 0, n = target_cellinfos.length; i < n; i++) {
				if (target_cellinfos[i]._fakemerge_infos == null) {
					target_cellinfos[i]._fakemerge_infos = [];
				}
			}

			fake_arr.push(fake_mergecell);
			this._is_use_fakemerge = true;

			for (i = 0, n = target_cellinfos.length; i < n; i++) {
				this._refreshCell(band, target_cellinfos[i]._cellidx, -1);
			}
		}
		else {
			if (norelease) {
				return false;
			}

			for (i = 0, n = fail_idxs.length; i < n; i++) {
				var idx = fail_idxs[i];
				var release_fake = fake_arr.splice(idx - i, 1)[0];
				var release_cellinfos = this._getFakeMergeCellInfos(cellinfos, release_fake.start_column, release_fake.end_column, release_fake.start_row, release_fake.end_row, release_fake.start_subrow, release_fake.end_subrow, subrowcnt);

				for (var j = 0, nn = release_cellinfos.length; j < nn; j++) {
					for (var k = release_fake.start_row; k <= release_fake.end_row; k++) {
						release_cellinfos[j]._fakemerge_infos[k + 2] = undefined;
					}

					this._refreshCell(band, release_cellinfos[j]._cellidx, -1);
				}

				for (j = 0, nn = target_cellinfos.length; j < nn; j++) {
					for (var k = srow; k <= erow; k++) {
						if (target_cellinfos[j]._fakemerge_infos) {
							target_cellinfos[j]._fakemerge_infos[k + 2] = undefined;
						}
					}

					this._refreshCell(band, target_cellinfos[j]._cellidx, -1);
				}
			}
		}
		this._adjustOverlayElements(false, this._is_use_fakemerge);

		if (fake_arr.length == 0) {
			this._is_use_fakemerge = false;
		}

		return true;
	};

	_pGrid._checkFakeMerge = function (cellinfo, row) {
		if (!cellinfo._fakemerge_infos) {
			return "";
		}

		if (cellinfo._fakemerge_infos[row + 2]) {
			return cellinfo._fakemerge_infos[row + 2];
		}

		var fake_arr = this._fake_mergecell_arr;
		var fake_arr_len = fake_arr.length;
		var subrowcnt;
		var format = this._curFormat;
		var band;

		if (row == -1) {
			subrowcnt = (format._headrows) ? format._headrows.length : 0;
			band = "head";
		}
		else if (row == -2) {
			subrowcnt = (format._summrows) ? format._summrows.length : 0;
			band = "summ";
		}
		else if (row >= 0) {
			subrowcnt = (format._bodyrows) ? format._bodyrows.length : 0;
			band = "body";
		}

		if (!subrowcnt) {
			return "";
		}

		if (fake_arr_len == 0) {
			return "";
		}

		var scol = cellinfo._col, ecol = cellinfo._col + cellinfo._colspan - 1, ssubrow = cellinfo._row, esubrow = cellinfo._row + cellinfo._rowspan - 1, area = cellinfo._area;

		for (var i = 0; i < fake_arr_len; i++) {
			if (this._checkInclude(fake_arr[i], subrowcnt, scol, row, ssubrow)) {
				if (this._checkInclude(fake_arr[i], subrowcnt, ecol, row, ssubrow)) {
					if (this._checkInclude(fake_arr[i], subrowcnt, scol, row, esubrow)) {
						if (this._checkInclude(fake_arr[i], subrowcnt, ecol, row, esubrow)) {
							var retn = "";

							if (area != "right") {
								if (ecol < fake_arr[i].end_column) {
									retn += "right";
								}
							}
							else {
								if (scol > fake_arr[i].start_column) {
									retn += "left";
								}
							}

							if (band != "summ") {
								if (row < fake_arr[i].end_row) {
									retn += "bottom";
								}
								else if (row == fake_arr[i].end_row) {
									if (fake_arr[i].end_subrow == undefined && esubrow < subrowcnt - 1) {
										retn += "bottom";
									}
									else if (esubrow < fake_arr[i].end_subrow) {
										retn += "bottom";
									}
								}
							}
							else {
								if (row > fake_arr[i].start_row) {
									retn += "top";
								}
								else if (row == fake_arr[i].start_row) {
									if (fake_arr[i].start_subrow == undefined && ssubrow > 0) {
										retn += "top";
									}
									else if (ssubrow > fake_arr[i].start_subrow) {
										retn += "top";
									}
								}
							}

							retn += "fake";
							cellinfo._fakemerge_infos[row + 2] = retn;
							return retn;
						}
					}
				}
			}
		}
		return "";
	};

	_pGrid._on_last_lbuttonup = function (down_act) {
		if (this._movingcell) {
			this._movingcell.parent._setTempCursor(null);
			this._movingcell = null;
		}

		this._is_down_act = false;
		this._setdataobj = null;

		var args = this._after_recreate_contents_all;
		if (args != null) {
			this._is_after_recreate = true;
			this._recreate_contents_all(args[0], args[1], args[2], args[3]);
			this._after_recreate_contents_all = null;
			this._is_after_recreate = false;
		}

		if (this._after_recreate) {
			this._is_after_recreate = true;
			this._recreate();
			this._after_recreate = false;
			this._is_after_recreate = false;
		}

		if (this._currentCellEditor && this._currentCellEditor._user_push) {
			this._currentCellEditor._user_push = false;
			this._currentCellEditor._changeStatus("focused", true);
			this._currentCellEditor._is_pushed_area = false;
			this._currentCellEditor._is_push = false;
		}
	};

	_pGrid._on_last_keyup = function (down_act) {
		this._is_down_act = false;
		this._setdataobj = null;

		var args = this._after_recreate_contents_all;
		if (args != null) {
			this._is_after_recreate = true;
			this._recreate_contents_all(args[0], args[1], args[2], args[3]);
			this._after_recreate_contents_all = null;
			this._is_after_recreate = false;
		}

		if (this._after_recreate) {
			this._is_after_recreate = true;
			this._recreate();
			this._after_recreate = false;
			this._is_after_recreate = false;
		}
	};

	_pGrid._common_fire_sys_lbuttonup = function (cellobj, altKey, ctrlKey, shiftKey) {
		if (!this._is_alive) {
			return;
		}
		if (!this.enable) {
			return true;
		}

		if (cellobj && cellobj._type_name == "GridCellControl") {
			var newPos = this._getDataRow(cellobj._rowidx);

			if (this._isFakeCell(newPos)) {
				this._is_drag_selectstart = false;
				this._is_drag_selecting = false;
				this._is_drag_sameselect = false;
				return true;
			}
			if (ctrlKey == false && shiftKey == false && this._is_drag_selecting == false && newPos >= 0) {
				if (this._isMultiSelected()) {
					if (this._isIncludeSelectpos(cellobj._cellidx, newPos)) {
						this._clrMultiSelect();
						this._refreshAll(true);
						this._ChangeSelect(this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.curdsrow, this._selectinfo.cursubrow, this._selectinfo.curpvt, false, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.curdsrow, this._selectinfo.cursubrow, this._selectinfo.curpvt, "body", "lbuttonup");
					}
				}
			}
		}

		this._is_drag_selectstart = false;
		this._is_drag_selecting = false;
		this._is_drag_sameselect = false;
		this._execRefreshContents("colsizing", false, true);
		this._execRefreshContents("rowsizing", false, false);
		this._execRefreshContents("cellmoving", true);
		this._exeFuncQueue("colsizing");
		this._exeFuncQueue("rowsizing");
	};

	_pGrid._is_down_act = false;
	_pGrid._cancelEvent = function (target_comp) {
		this._endExtraTrack();
		this._is_drag_selectstart = false;
		this._is_drag_selecting = false;
		this._is_down_act = this._isDownActionKeyMouse();
		this._setdataobj = null;
		this._focus_proc = null;
	};

	_pGrid.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp, false, need_recalcXY);
	};

	_pGrid.on_fire_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, user_fire, need_recalcXY) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, need_recalcXY, from_refer_comp);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var retn = false;
		if (this.ontouchend && this.ontouchend._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);

			if (user_fire) {
				retn = this.ontouchend._fireUserEvent(this, evt);
			}
			else {
				retn = this.ontouchend._fireSysEvent(this, evt);
			}
		}

		if (!user_fire) {
			this._common_fire_sys_lbuttonup(cellobj, false, false, false);
		}

		return retn;
	};

	_pGrid._isCheckAlive = function (comp) {
		var parent = comp;
		while (parent != this) {
			if (!parent || parent._is_alive == false) {
				return false;
			}
			parent = parent.parent;
		}
		return true;
	};

	_pGrid._on_afterHideWaitComp = function (pseudo) {
		if (this._currentCellEditor) {
			this._currentCellEditor._setFocus(false);
		}
	};
	_pGrid.on_fire_user_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, need_recalcXY) {
		return this.on_fire_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, need_recalcXY) {
		return this.on_fire_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, false, need_recalcXY);
	};

	_pGrid.on_fire_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, user_fire, need_recalcXY) {
		if (this._focus_proc) {
			if (!this._showEditing) {
				if (this._isCheckAlive(this._focus_proc.parent)) {
					var is_vscroll = false;
					if (this._scrollpixel == "all") {
						is_vscroll = true;
					}
					this._focus_proc.parent._showfull(is_vscroll);
					this._focus_proc.parent._setFocus(false);
				}
			}
			else if (this._currentCellEditor.setCaretPos) {
				if (this._currentCellEditor.autoselect) {
					this._currentCellEditor.setSelect(0, -1);
				}
				else {
					this._currentCellEditor.setCaretPos(0);
				}
			}
			this._focus_proc = null;
		}

		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, need_recalcXY, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onlbuttonup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			if (user_fire) {
				retn = this.onlbuttonup._fireUserEvent(this, evt);
			}
			else {
				retn = this.onlbuttonup._fireSysEvent(this, evt);
			}
		}

		if (!user_fire) {
			if (cellobj) {
				if (this.selectchangetype == "up") {
					if (this.selecttype != "area" && this.selecttype != "multiarea") {
						if (!this._is_drag_selecting) {
							this._mouseSelection(cellobj, ctrlKey, shiftKey, canvasX, canvasY, from_comp, from_refer_comp);
							this._endExtraTrack();
						}
					}
				}
			}

			this._common_fire_sys_lbuttonup(cellobj, altKey, ctrlKey, shiftKey);
			this._resizerStart(canvasX, canvasY, cellobj, "up", from_refer_comp);
		}
		return retn;
	};

	_pGrid.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onrbuttonup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.on_fire_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true);
	};

	_pGrid.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.on_fire_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false);
	};

	_pGrid.on_fire_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmouseup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			if (user_fire) {
				retn = this.onmouseup._fireUserEvent(this, evt);
			}
			else {
				retn = this.onmouseup._fireSysEvent(this, evt);
			}
		}

		return retn;
	};

	_pGrid._resizerStart = function (canvasX, canvasY, cellobj, kind, from_refer_comp) {
		if (this._movingcell) {
			return;
		}

		var resizer_colctrl = this._resizer_colctrl;
		var resizer_rowctrl = this._resizer_rowctrl;

		if ((resizer_colctrl && resizer_colctrl._is_tracking) || (resizer_rowctrl && resizer_rowctrl._is_tracking)) {
			return;
		}

		var r_canvasX = canvasX;
		var r_canvasY = canvasY;
		var rowidx = cellobj._rowidx;
		var cellidx = cellobj._cellidx;

		if (cellobj._is_alive == false) {
			if (rowidx == -1) {
				cellobj = this._getCurrentHeadCell(cellidx, true);
			}
			else {
				cellobj = this._getCurrentBodyCell(rowidx, cellidx);
			}
		}

		if (!cellobj) {
			return;
		}

		var area = (cellobj._refinfo) ? cellobj._refinfo._area : "";
		var band = (cellobj._band) ? cellobj._band.id : "";

		if (area == "body") {
			r_canvasX += this._getScrollLeft();
		}
		if (band == "body") {
			if (!cellobj.parent._fixed) {
				r_canvasY += this._getScrollTop();
			}
		}

		var action = false;
		if (resizer_colctrl && !resizer_colctrl._is_tracking) {
			var resize_cursor = nexacro.CursorObject("col-resize");
			var resizer_range = this._resizerColRange;
			var resizer_arr_length = resizer_range.length;

			if (resizer_arr_length > 0) {
				resizer_colctrl._is_range = false;

				for (var i = 0; i < resizer_arr_length; i++) {
					var range = resizer_range[i];

					if (r_canvasX >= range.left && r_canvasX <= range.right) {
						if (area != range.area) {
							continue;
						}

						if (r_canvasY >= range.top && r_canvasY <= range.bottom) {
							this.a = r_canvasX;
							resizer_colctrl._is_range = true;
							resizer_colctrl._setIndex(range.index);
							this._setGlobalCursor(resize_cursor, cellobj);
							action = true;
							break;
						}
					}
				}
			}
			if (!resizer_colctrl._is_range && !resizer_colctrl._is_tracking && (!resizer_rowctrl || !resizer_rowctrl._is_tracking)) {
				if (cellobj._type_name != "GridCellControl") {
					this._setGlobalCursor(null, from_refer_comp);
				}
				else {
					this._setGlobalCursor(null, cellobj);
				}
				action = false;
			}
			else if (resizer_colctrl._is_tracking) {
				this._setGlobalCursor(resize_cursor, cellobj);
				action = true;
			}
		}

		if (action) {
			return;
		}

		if (resizer_rowctrl && !resizer_rowctrl._is_tracking) {
			var resize_cursor = nexacro.CursorObject("row-resize");
			var resizer_range = this._resizerRowRange;
			var resizer_arr_length = resizer_range.length;

			if (resizer_arr_length > 0) {
				resizer_rowctrl._is_range = false;

				for (var i = 0; i < resizer_arr_length; i++) {
					var range = resizer_range[i];
					if (r_canvasY >= range.top && r_canvasY <= range.bottom) {
						if (band != range.area) {
							continue;
						}

						if (r_canvasX >= range.left && r_canvasX <= range.right) {
							resizer_rowctrl._is_range = true;
							resizer_rowctrl._setIndex(range.index);
							this._setGlobalCursor(resize_cursor, cellobj);
							break;
						}
					}
				}
			}
			if (!resizer_rowctrl._is_range && !resizer_rowctrl._is_tracking && (!resizer_colctrl || !resizer_colctrl._is_tracking)) {
				if (cellobj._type_name != "GridCellControl") {
					this._setGlobalCursor(null, from_refer_comp);
				}
				else {
					this._setGlobalCursor(null, cellobj);
				}
			}
			else if (resizer_rowctrl._is_tracking) {
				this._setGlobalCursor(resize_cursor, cellobj);
			}
		}
	};

	_pGrid.on_fire_user_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, false, from_refer_comp);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var retn = false;
		if (this.ontouchmove && this.ontouchmove._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			retn = this.ontouchmove._fireUserEvent(this, evt);
		}

		return retn;
	};

	_pGrid.on_fire_user_onmousemove = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!from_refer_comp._is_alive) {
			return;
		}

		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmousemove", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			retn = this.onmousemove._fireUserEvent(this, evt);
		}

		if (!nexacro._isTouchInteraction) {
			this._resizerStart(canvasX, canvasY, cellobj, "move", from_refer_comp);
		}

		return retn;
	};

	_pGrid._prevAreaCellObj = null;

	_pGrid._areaselectMove = function (from_refer_comp, canvasX, canvasY) {
		if (this._is_drag_selectstart && !this._showEditing) {
			var cellobj = from_refer_comp;

			cellobj = this._findCellObj(cellobj);

			var subcellobj, area;
			if (cellobj && cellobj._type_name == "GridCellControl") {
				if (cellobj.parentcell) {
					subcellobj = cellobj;
					cellobj = cellobj.parentcell;
				}

				var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
				canvasX = posobj.canvasX;
				canvasY = posobj.canvasY;

				if ((this._prevAreaCellObj == cellobj) && !this._fixed_row_scrolling) {
					return;
				}

				area = cellobj._refinfo._area;

				var newPos = this._getDataRow(cellobj._rowidx);
				if (newPos == undefined) {
					newPos = 0;
				}

				if (this._isFakeCell(newPos) || newPos < 0) {
					return true;
				}

				var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
				var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
				var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
				var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
				var beforePvt = this._beforepvt = this._selectinfo.curpvt;

				var afterCell = cellobj._cellidx;
				var afterCol = cellobj._refinfo._col;
				var afterRow = newPos;
				var afterSubrow = cellobj._refinfo._row;
				var afterPvt = -9;

				if (subcellobj) {
					afterCol += subcellobj._refinfo._col;
				}

				if (this._fixed_rowcnt > 0) {
					var fixed_startrow = this._fixed_startrow;
					var fixed_endrow = this._fixed_endrow;

					var selectinfo = this._selectinfo;
					if (selectinfo.area.length > 0) {
						var cur_selected_area = selectinfo.area[selectinfo.area.length - 1];
						var cur_srow = cur_selected_area.begrow;
						var cur_erow = cur_selected_area.endrow;
						var cur_vscrollpos = this._vscrollmng.pos;
						var scrollTop = this._getScrollTop();

						var mode = "";
						if (afterRow < beforeRow) {
							mode = "up";
						}
						else if (afterRow > beforeRow) {
							mode = "down";
						}
						else {
							mode = "keep";
						}

						if (mode == "up") {
							this._fixed_row_scrolling = true;
							if (cur_erow > afterRow && afterRow <= fixed_endrow && cur_erow > fixed_endrow) {
								this._vscrollmng.setPos(cur_vscrollpos - 1);
							}
							else {
								this._fixed_row_scrolling = false;
							}
						}
						else if (mode == "down") {
							if (cur_srow <= this._fixed_endrow && cur_erow <= this._fixed_endrow) {
								this._fixed_row_scroll_zeroset = true;
							}
							else {
								this._fixed_row_scroll_zeroset = false;
							}

							if (this._fixed_row_scroll_zeroset && afterRow && (afterRow <= 0 || (afterRow <= this._fixed_endrow && cur_erow > this._fixed_endrow) || (afterRow > this._fixed_endrow && cur_srow <= this._fixed_endrow))) {
								if (cur_vscrollpos > 0) {
									this._vscrollmng.setPos(0);
									this._fixed_row_scroll_zeroset = false;
									return;
								}
							}
						}
						else {
							if (cur_vscrollpos == 0) {
								this._fixed_row_scrolling = false;
							}
							else if (this._fixed_row_scrolling) {
								this._vscrollmng.setPos(cur_vscrollpos - 1);
							}
						}
					}
				}

				if (this._fixed_rowcnt > 0) {
					var fixed_startrow = this._fixed_startrow;
					var fixed_endrow = this._fixed_endrow;

					var selectinfo = this._selectinfo;
					if (selectinfo.area.length > 0) {
						var cur_selected_area = selectinfo.area[selectinfo.area.length - 1];
						var cur_srow = cur_selected_area.begrow;
						var cur_erow = cur_selected_area.endrow;
						var cur_vscrollpos = this._vscrollmng.pos;
						var scrollTop = this._getScrollTop();

						var mode = "";
						if (afterRow < beforeRow) {
							mode = "up";
						}
						else if (afterRow > beforeRow) {
							mode = "down";
						}
						else {
							mode = "keep";
						}

						if (mode == "up") {
							this._fixed_row_scrolling = true;
							if (cur_erow > afterRow && afterRow <= fixed_endrow && cur_erow > fixed_endrow) {
								this._vscrollmng.setPos(cur_vscrollpos - 1);
							}
							else {
								this._fixed_row_scrolling = false;
							}
						}
						else if (mode == "down") {
							if (cur_srow <= this._fixed_endrow && cur_erow <= this._fixed_endrow) {
								this._fixed_row_scroll_zeroset = true;
							}
							else {
								this._fixed_row_scroll_zeroset = false;
							}

							if (this._fixed_row_scroll_zeroset && afterRow && (afterRow <= 0 || (afterRow <= this._fixed_endrow && cur_erow > this._fixed_endrow) || (afterRow > this._fixed_endrow && cur_srow <= this._fixed_endrow))) {
								if (cur_vscrollpos > 0) {
									this._vscrollmng.setPos(0);
									this._fixed_row_scroll_zeroset = false;
									return;
								}
							}
						}
						else {
							if (cur_vscrollpos == 0) {
								this._fixed_row_scrolling = false;
							}
							else if (this._fixed_row_scrolling) {
								this._vscrollmng.setPos(cur_vscrollpos - 1);
							}
						}
					}
				}

				while (true) {
					if (this.selecttype == "multirow" && afterRow == beforeRow) {
						break;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
					this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, cellobj._band.id, "mousemove");
					break;
				}
				this._prevAreaCellObj = cellobj;
			}
		}
	};

	_pGrid._on_start_extratrack = function (windowX, windowY, screenX, screenY, keepstart) {
		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();

		this._track_point.x = screenX;
		this._track_point.y = screenY;
		this._track_point.w = 0;
		this._track_point.h = 0;
		this._track_point.cur_rect = {
			l : 0, 
			t : 0, 
			w : 0, 
			h : 0
		};

		this._track_start_info = {
		};
		this._track_start_info.target = this._lastmouseentercell;

		this._track_start_info.cell_screenX = system.clientToScreenX(this._lastmouseentercell, 0);
		this._track_start_info.cell_screenY = system.clientToScreenY(this._lastmouseentercell, 0);


		var frame = this._getOwnerFrame();

		if (frame && (frame._window_type == 1 || frame._window_type == 4 || frame._window_type == 5)) {
			var adjust_x = this._lastmouseentercell._adjust_left;
			var adjust_y = this._lastmouseentercell._adjust_top;

			var parent = this._lastmouseentercell.parent;

			while (parent) {
				if (parent._is_frame) {
					break;
				}
				adjust_x += parent._adjust_left;
				adjust_y += parent._adjust_top;

				parent = parent.parent;
			}

			var frame_screenx = system.clientToScreenX(frame, 0);
			var frame_screeny = system.clientToScreenY(frame, 0);
			if (frame_screenx == 0 && frame._adjust_left < 0) {
				frame_screenx = frame._adjust_left;
			}
			if (frame_screeny == 0 && frame._adjust_top < 0) {
				frame_screeny = frame._adjust_top;
			}

			this._track_start_info.cell_screenX = frame_screenx + adjust_x;
		}

		this._track_start_info.start_screenX = screenX;
		this._track_start_info.start_screenY = screenY;
		this._track_start_info.scrollLeft = scroll_left;
		this._track_start_info.scrollTop = scroll_top;

		this._track_start_info._start_begarea = this._selectinfo.arearect.barea;
		this._track_start_info._start_endarea = this._selectinfo.arearect.earea;

		var cur_rect = this._getSelectRect(false, true);
		var rectinfo = this._getExtraTrackSelectRect(screenX, screenY, 0, 0, true);

		if (!keepstart) {
			this._startAreaSizing(rectinfo, rectinfo.idx);
		}

		this._track_mode = "areaselect";
	};

	_pGrid._on_move_extratrack = function (obj, windowX, windowY, distX, distY, screenX, screenY) {
		var rootcomp = this._getRootComponent(obj);

		if (!obj || (this._showEditing == false && (rootcomp != this || 
			obj && (rootcomp == this && obj instanceof nexacro._GridCellControl && (obj._band.id == "head" || obj._band.id == "summary")) || (rootcomp == this && obj instanceof nexacro._GridRowControl && obj._band.id == "body") || (rootcomp == this && obj.id == "body")))) {
			var rectinfo = this._getExtraTrackSelectRect(screenX, screenY, distX, distY, false);
			var idx = rectinfo.idx;

			var typeinfo = this._getTrackType(this._track_start_info, rectinfo.l, rectinfo.t, rectinfo.w, rectinfo.h, idx, false);

			var select_area = this._selectinfo.area;
			if (this._fixed_rowcnt > 0 && select_area.length) {
				var cur_area = select_area[select_area.length - 1];
				var cur_srow = cur_area.begrow;
				var cur_erow = cur_area.endrow;

				var ctrlpoint = this._selectinfo.ctrlpoint;
				var cur_row = ctrlpoint.row;
				var cur_col = ctrlpoint.col;

				var border = this._getCurrentStyleBorder();
				var border_top = (border) ? parseInt(border.right._width, 10) : 0;

				var headheight = this._getHeadHeight();
				var fixedheight = this._fixed_height;
				var fixedbottom = headheight + fixedheight + border_top;
				var fixedsrow = this._fixed_startrow;
				var fixederow = this._fixed_endrow;
				var t = rectinfo.t;
				var h = rectinfo.h;

				var cur_scrolltop = this._getScrollTop();
				var vscroll = this._vscrollmng;

				if (cur_srow <= fixederow && cur_erow <= fixederow && cur_scrolltop > 0 && (t + h) > fixedbottom) {
					vscroll.setPos(0);
				}
				else if (cur_srow <= fixederow && cur_erow >= fixederow && cur_scrolltop > 0 && (t + h) <= fixedbottom) {
					vscroll.setPos(vscroll.pos - 1);
				}
				else if (ctrlpoint.row > fixederow && cur_scrolltop > 0 && t <= fixedbottom) {
					vscroll.setPos(vscroll.pos - 1);
				}
			}

			this._applySelectorScroll(typeinfo.type);
			this._applyAreaSizing(rectinfo, idx);
			var cur_rect = this._getSelectRect(false, true);

			this._extratrack_typeinfo = typeinfo;
			this._extratrack_rectinfo = rectinfo;
			this._extratrack_idx = idx;

			var init_interval = 500;
			var min_intervalgap = 10;

			function getTimerInterval (obj) {
				var interval = init_interval;

				var grid_x = nexacro.System.clientToScreenX(obj, 0);
				var grid_y = nexacro.System.clientToScreenY(obj, 0);
				var frame = obj._getOwnerFrame();

				if (frame && (frame._window_type == 1 || frame._window_type == 4)) {
					var adjust_x = obj._adjust_left;
					var adjust_y = obj._adjust_top;

					var parent = obj.parent;

					while (parent) {
						if (parent._is_frame) {
							break;
						}

						adjust_x += parent._adjust_left;
						adjust_y += parent._adjust_top;

						parent = parent.parent;
					}


					var frame_screenx = system.clientToScreenX(frame, 0);
					var frame_screeny = system.clientToScreenY(frame, 0);
					if (frame_screenx == 0 && frame._adjust_left < 0) {
						frame_screenx = frame._adjust_left;
					}
					if (frame_screeny == 0 && frame._adjust_top < 0) {
						frame_screeny = frame._adjust_top;
					}

					grid_x = frame_screenx + adjust_x;
				}

				var grid_r = grid_x + parseInt(obj._adjust_width);
				var grid_b = grid_y + parseInt(obj._adjust_height);

				var wgap = (screenX < grid_x) ? (grid_x - screenX) : (screenX - grid_r);
				var hgap = (screenY < grid_y) ? (grid_y - screenY) : (screenY - grid_b);

				if (wgap >= 0) {
					interval = interval - (wgap * 10);

					return interval > 0 ? interval : 1;
				}

				if (hgap >= 0) {
					interval = interval - (hgap * 10);

					return interval > 0 ? interval : 1;
				}

				return -1;
			}

			var timer_interval = getTimerInterval(this);

			if (timer_interval > 0 && timer_interval < min_intervalgap) {
				timer_interval = min_intervalgap;
			}

			if (timer_interval > 0) {
				if (!this._extratrack_timer) {
					this._extratrack_timer = {
					};
					this._extratrack_timer._handle = null;
					this._extratrack_timer._interval = timer_interval;

					this._extratrack_timer._handle = new nexacro._CallbackTimer(this, function () {
						this._applySelectorScroll(this._extratrack_idx, this._extratrack_typeinfo.type);
						this._applyAreaSizing(this._extratrack_rectinfo, this._extratrack_idx);
						var cur_rect = this._getSelectRect(false, true);
					}, timer_interval);

					this._extratrack_timer._handle.start();
				}
				else {
					if (this._extratrack_timer && this._extratrack_timer._interval != timer_interval) {
						if (timer_interval > 0) {
							this._extratrack_timer._interval = timer_interval;
							this._extratrack_timer._handle.setInterval(timer_interval);
							this._extratrack_timer._handle.start();
						}
						else {
							this._extratrack_timer._handle.stop();
						}
					}
				}
			}
		}
		else {
			if (this._extratrack_timer) {
				this._extratrack_timer._handle.stop();
			}
		}
	};

	_pGrid._on_end_extratrack = function (x, y, dragdata) {
		var p = this._select_ctrl;

		this._track_start_info = null;
		this._track_idx = -1;
		this._track_mode = "";

		if (this._extratrack_timer) {
			this._extratrack_timer._handle.stop();
			this._extratrack_timer._handle = null;
			this._extratrack_timer = null;
		}

		this._getSelectRect(false, true);
	};

	_pGrid._endExtraTrack = function () {
		this._on_end_extratrack();
		nexacro._cur_extra_track_info = null;
	};

	_pGrid._trackingHScroll = function (idx, left, right, start_begarea, start_endarea, bodystart, rightstart, scroll_left, scroll_max) {
		var retn = [0, 0];

		if (this.scrolltype == "none") {
			return retn;
		}

		var hscroll = this._hscrollmng;

		if (idx == 0 || idx == 2) {
			if (start_begarea == "right") {
				if (left < rightstart && left > bodystart) {
					hscroll.setPos(scroll_max);
				}
			}
			else if (start_begarea == "left") {
				if (left > bodystart && left < rightstart) {
					hscroll.setPos(0);
					retn[1] = scroll_left;
				}
			}
		}
		else {
			if (start_endarea == "left") {
				if (right > bodystart && right < rightstart) {
					hscroll.setPos(0);
				}
			}
			else if (start_endarea == "right") {
				if (right < rightstart && right > bodystart) {
					hscroll.setPos(scroll_max);
					retn[0] = scroll_left - scroll_max;
					retn[1] = scroll_max - scroll_left;
				}
			}
		}
		return retn;
	};

	_pGrid._getTrackType = function (obj, left, top, width, height, idx, onlyarea) {
		var hmin, hmax, vmin, vmax;
		var grid = this;
		var format = grid._curFormat;
		var type = ["", ""];
		var area = grid._selectinfo.ctrlpoint.area;

		var leftwidth = format.leftWidth;
		var rightstart = grid._getClientWidth() - format.rightWidth;
		var bodylast = format.leftWidth + format.bodyWidth;
		var scroll_left = grid._getScrollLeft();
		var scroll_max = grid._getScollMaxLeft();
		var right = left + width;
		var headheight = grid._getHeadHeight();
		var fixedheight = grid._fixed_height;
		var fixedbottom = headheight + fixedheight;


		if (onlyarea) {
			if (area == "left") {
				hmin = 0;
				hmax = leftwidth;
			}
			else if (area == "right") {
				hmin = rightstart;
				hmax = grid._getClientWidth();
			}
			else {
				hmin = leftwidth;
				hmax = (bodylast < rightstart) ? bodylast : rightstart;
			}
		}
		else {
			var move = this._trackingHScroll(idx, left, right, leftwidth, obj._start_begarea, obj._start_endarea, rightstart, scroll_left, scroll_max);

			left += move[0];
			width += move[1];
			right = left + width;

			if (area == "left") {
				hmin = 0;

				if (scroll_left == scroll_max) {
					hmax = (bodylast < grid._getClientWidth()) ? bodylast : grid._getClientWidth();
				}
				else {
					hmax = (bodylast < rightstart) ? bodylast : rightstart;
				}
			}
			else if (area == "right") {
				if (scroll_left == 0) {
					hmin = 0;
				}
				else {
					hmin = leftwidth;
				}

				hmax = grid._getClientWidth();
			}
			else {
				if (scroll_left == 0) {
					hmin = 0;
				}
				else {
					hmin = leftwidth;
				}

				if (scroll_left == scroll_max) {
					hmax = (bodylast < grid._getClientWidth()) ? bodylast : grid._getClientWidth();
				}
				else {
					hmax = (bodylast < rightstart) ? bodylast : rightstart;
				}
			}
		}

		vmin = this._bodyBand._adjust_top;
		vmax = this._bodyBand.getOffsetBottom();

		if (idx == 0) {
			if (left < hmin) {
				width -= (hmin - left);
				left = hmin;

				if (this._start_begarea != "left") {
					type[0] = "leftover0";
				}
			}
			else if (left > hmax || (scroll_left < scroll_max && left > rightstart)) {
				type[0] = "rightover0";
			}

			if (grid._fixed_rowcnt > 0) {
				if (top < (fixedheight + headheight)) {
					type[1] = "topover0";
				}
				else if (top > vmax) {
					type[1] = "bottomover0";
				}
			}
			else {
				if (top < vmin) {
					height -= (vmin - top);
					top = vmin;
					type[1] = "topover0";
				}
				else if (top > vmax) {
					type[1] = "bottomover0";
				}
			}


			if (width <= 0) {
				left += width - 1;
			}

			if (height <= 0) {
				top += height - 1;
			}
		}
		else if (idx == 1) {
			var r = left + width, b = top + height;

			if (r < hmin || (scroll_left > 0 && r < leftwidth)) {
				type[0] = "leftover1";
			}
			else if (r > hmax) {
				width = hmax - left;

				if (this._start_endarea != "right") {
					type[0] = "rightover1";
				}
			}

			if (b < vmin) {
				type[1] = "topover1";
			}
			else if (b > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}
		else if (idx == 2) {
			var b = top + height;
			if (left < hmin) {
				width -= (hmin - left);
				left = hmin;

				if (this._start_begarea != "left") {
					type[0] = "leftover0";
				}
			}
			else if (left > hmax || (scroll_left < scroll_max && left > rightstart)) {
				type[0] = "rightover0";
			}
			if (b < vmin || b > fixedbottom) {
				type[1] = "topover1";
			}
			else if (b > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}
		else if (idx == 3) {
			var r = left + width;

			if (r < hmin || (scroll_left > 0 && r < leftwidth)) {
				type[0] = "leftover1";
			}
			else if (r > hmax) {
				width = hmax - left;

				if (this._start_endarea != "right") {
					type[0] = "rightover1";
				}
			}
			if (top < vmin) {
				type[1] = "topover1";
			}
			else if (top > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}

		return {
			type : type, 
			adjust_l : left, 
			adjust_t : top, 
			adjust_w : width, 
			adjust_h : height
		};
	};

	_pGrid._getExtraTrackSelectRect = function (screenX, screenY, distX, distY, bApplyFixedRow) {
		var idx = 1;
		var startinfo = this._track_start_info;

		var start_cell_startX = startinfo.start_screenX;
		var start_cell_startY = startinfo.start_screenY;
		var start_cell_screenX = startinfo.cell_screenX;
		var start_cell_screenY = startinfo.cell_screenY;


		var start_cell_scrollLeft = startinfo.scrollLeft;
		var start_cell_scrollTop = startinfo.scrollTop;


		var start_cell_width = startinfo.target.width;
		var start_cell_height = startinfo.target.height;
		var start_cell_row = startinfo.target._rowidx;

		var start_cell_startTopGap = start_cell_screenY - start_cell_startY;
		var start_cell_startBottomGap = start_cell_screenY - start_cell_startY + start_cell_height;
		var start_cell_startLeftGap = start_cell_startX - start_cell_screenX;
		var start_cell_startRightGap = start_cell_screenX - start_cell_startX + start_cell_width;

		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();
		var scroll_left_gap = scroll_left - start_cell_scrollLeft;
		var scroll_top_gap = scroll_top - start_cell_scrollTop;
		var adjust_scroll_top_gap = scroll_top_gap;

		var grid_body_screenx = system.clientToScreenX(this, 0);
		var grid_body_screeny = system.clientToScreenY(this, 0);

		var frame = this._getOwnerFrame();


		if (frame && (frame._window_type == 1 || frame._window_type == 4 || frame._window_type == 5)) {
			var adjust_x = this._adjust_left;
			var adjust_y = this._adjust_top;

			var parent = this.parent;

			while (parent) {
				if (parent._is_frame) {
					break;
				}

				adjust_x += parent._adjust_left;
				adjust_y += parent._adjust_top;

				parent = parent.parent;
			}
			var frame_screenx = system.clientToScreenX(frame, 0);
			var frame_screeny = system.clientToScreenY(frame, 0);
			if (frame_screenx == 0 && frame._adjust_left < 0) {
				frame_screenx = frame._adjust_left;
			}
			if (frame_screeny == 0 && frame._adjust_top < 0) {
				frame_screeny = frame._adjust_left;
			}

			grid_body_screenx = frame_screenx + adjust_x;
		}

		var bApply_scroll_top = true;
		if (this._fixed_rowcnt > 0 && start_cell_row >= this._fixed_startrow && start_cell_row <= this._fixed_endrow) {
			bApply_scroll_top = false;
		}

		if (!bApply_scroll_top) {
			adjust_scroll_top_gap = 0;
		}

		if (screenX < (start_cell_startX - scroll_left_gap) && screenY < (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 0;
		}
		else if (screenX > (start_cell_startX - scroll_left_gap) && screenY > (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 1;
		}
		else if (screenX < (start_cell_startX - scroll_left_gap) && screenY > (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 2;
		}
		else if (screenX > (start_cell_startX - scroll_left_gap) && screenY < (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 3;
		}


		var x = distX;
		var y = distY;

		var type = new Array(2);

		var border = this._getCurrentStyleBorder();
		var border_left = (border) ? border.left._width : 0;
		var border_right = (border) ? border.right._width : 0;
		var border_top = (border) ? border.right._width : 0;
		var border_bottom = (border) ? border.right._width : 0;

		var l, t, w, h;

		if (idx == 0) {
			l = this._track_point.x - grid_body_screenx + x;
			t = this._track_point.y - grid_body_screeny + y;
			w = -(x);
			h = -(y) - (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 1) {
			l = this._track_point.x - grid_body_screenx - scroll_left_gap;
			t = this._track_point.y - grid_body_screeny - (bApply_scroll_top ? scroll_top_gap : 0);
			w = x + scroll_left_gap;
			h = y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 2) {
			l = this._track_point.x - grid_body_screenx + x;
			t = this._track_point.y - grid_body_screeny - (bApply_scroll_top ? scroll_top_gap : 0);
			w = -(x) - scroll_left_gap;

			h = y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 3) {
			l = this._track_point.x - grid_body_screenx - scroll_left_gap;
			t = this._track_point.y - grid_body_screeny + y;
			w = x + scroll_left_gap;
			h = -(y) - (bApply_scroll_top ? scroll_top_gap : 0);
		}

		return {
			idx : idx, 
			l : l, 
			t : t, 
			w : w, 
			h : h
		};
	};

	_pGrid.on_fire_sys_onmousemove = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable) {
			return true;
		}

		return this._areaselectMove(from_refer_comp, canvasX, canvasY);
	};

	_pGrid._setSelectedInfo = function (cell, col, datarow, subrow, pvt, areainfo) {
		if (this._currentBand != "body") {
			return;
		}

		if (cell !== null) {
			this._selectinfo.curcell = this.currentcell = cell;
		}
		if (col !== null) {
			this._selectinfo.curcol = this.currentcol = col;
		}
		if (datarow !== null) {
			this._selectinfo.curdsrow = this._currentDSrow = datarow;
			this._selectinfo.currow = this.currentrow = (datarow < 0) ? datarow : this._getTreeRowPosition(datarow);
		}
		if (subrow !== null) {
			this._selectinfo.cursubrow = this.currentsubrow = subrow;
		}
		if (pvt !== null) {
			this._selectinfo.curpvt = this.currentpivot = pvt;
		}

		if (areainfo) {
			this._selectinfo.areainfo = null;
			this._selectinfo.areainfo = {
				srow : areainfo.srow, 
				erow : areainfo.erow, 
				scell : areainfo.scell, 
				ecell : areainfo.ecell, 
				scol : areainfo.scol, 
				ecol : areainfo.ecol, 
				ssubrow : areainfo.ssubrow, 
				esubrow : areainfo.esubrow, 
				spvt : areainfo.spvt, 
				epvt : areainfo.epvt
			};
		}
	};

	_pGrid._is_drag_selecting = false;
	_pGrid._on_grid_lbuttondown = function (cellobj, band, ctrlkey, shiftkey, no_select) {
		if (!this._is_alive) {
			return;
		}
		if (!this.enable) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);
		if (newPos == undefined) {
			newPos = 0;
		}

		if (this._isFakeCell(newPos) || newPos < 0) {
			return true;
		}

		var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
		var beforePvt = this._beforepvt = this._selectinfo.curpvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		var parentcell = cellobj.parentcell;
		this._prevAreaCellObj = cellobj;

		if (parentcell) {
			afterCell = parentcell._cellidx;
			afterCol += parentcell._refinfo._col;
			this._prevAreaCellObj = parentcell;
		}

		if (!no_select) {
			this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
		}

		if (ctrlkey == true) {
			if (this._isMultiSelect()) {
				this._multiselect = "ctrl";
			}
			else {
				this._multiselect = "none";
			}
		}
		else if (shiftkey == true) {
			if (this._isMultiSelect() || this._isAreaSelect()) {
				this._multiselect = "shift";
			}
			else {
				this._multiselect = "none";
			}
		}
		else {
			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}

		if ((this._isAreaSelect() || this._isMultiSelect()) && !nexacro._isTouchInteraction) {
			this._is_drag_selectstart = true;
		}

		var retn = false;

		if (!no_select) {
			retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "lbuttondown");
		}

		if (!retn) {
			this._is_drag_sameselect = true;
		}

		var win = this._getWindow();
		if (!nexacro._isTouchInteraction && (this._isAreaSelect() || this.selecttype == "multirow")) {
			if (nexacro._Browser == "Runtime") {
				var frame = this._getOwnerFrame();

				if (frame._window_type != 1 && frame._window_type != 4 && frame._window_type != 5) {
					frame = nexacro.getApplication().mainframe;
				}

				var screenX = system.clientToScreenX(frame, 0) + win._curWindowX - ((frame._adjust_left >= 0) ? frame._adjust_left : 0);
				var screenY = system.clientToScreenY(frame, 0) + win._curWindowY - ((frame._adjust_top >= 0) ? frame._adjust_top : 0);

				nexacro._setExtraTrackInfo(win, this, win._curWindowX, win._curWindowY, screenX, screenY, shiftkey || no_select);
			}
			else {
				nexacro._setExtraTrackInfo(win, this, win._curWindowX, win._curWindowY, win._cur_screen_pos.x, win._cur_screen_pos.y, shiftkey || no_select);
			}
		}

		return retn;
	};

	_pGrid.on_fire_onselectchanged = function (obj, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow) {
		if (this.onselectchanged && this.onselectchanged._has_handlers) {
			var evt = new nexacro.GridSelectEventInfo(obj, "onselectchanged", cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow);
			return this.onselectchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_user_onkeyup = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp) {
		if (!this.enable) {
			return true;
		}

		if (shiftKey == false && ctrlKey == false) {
			if (keyCode != nexacro.Event.KEY_SHIFT && keyCode != nexacro.Event.KEY_CTRL) {
				this._multiselect = "none";
			}
		}

		if (this._iskey_movetocell) {
			this._moveCellAfterFocus();
		}

		this._iskey_movetocell = false;
		this._keydown_elem = null;

		var retn = nexacro.Component.prototype.on_fire_user_onkeyup.call(this, keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp);

		if (!this._is_alive) {
			return retn;
		}

		if (keyCode == nexacro.Event.KEY_RIGHT && altKey) {
			var format = this._curFormat;
			if (format) {
				var bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, this._selectinfo.curdsrow);
						if (expandshow == "show") {
							if (this.onkeyup && this.onkeyup.defaultprevented == true) {
							}
							else {
								this.on_fire_onexpandup("none", altKey, ctrlKey, shiftKey, -1, -1, -1, -1, -1, -1, obj, refer_comp);
							}
						}
					}
				}
			}
		}

		return retn;
	};

	_pGrid.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		if (this._is_down_act) {
			this._on_last_keyup(true);
		}
	};

	_pGrid._accessibilityHotkeyAction = function (keyCode, altKey, ctrlKey, shiftKey) {
		var accGridHotkey = nexacro._AccessibilityUtil.checkComponentHotkey(this, keyCode, altKey, ctrlKey, shiftKey);
		if (accGridHotkey) {
			this._hideEditor();
			var row = this.currentrow;
			switch (accGridHotkey) {
				case nexacro._AccessibilityUtil.Hotkey.FIRSTCELL:
					this.currentcell = 0;
					this._currentBand = "grid";
					if (this._vscrollmng) {
						this._vscrollmng.setPos(0);
					}
					this._setAccessibilityBandFocus("next", false, true);
					break;
				case nexacro._AccessibilityUtil.Hotkey.LASTCELL:
					this.currentcell = this._getAccessibilityCellIndex() - 1;
					this._currentBand = "grid";
					if (this._vscrollmng) {
						this._vscrollmng.setPos(this._vscrollmng._max);
					}
					this._setAccessibilityBandFocus("prev", false, true);
					break;
				case nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINROW:
					this.currentcol = 0;
					if (nexacro._enableaccessibility) {
						this._moveToPosAccessibilityCell(row, 0);
					}
					else {
						this._moveToPosCell(row, 0);
					}
					break;
				case nexacro._AccessibilityUtil.Hotkey.LASTCELLINROW:
					this.currentcol = this._curFormat._cols.length - 1;
					if (nexacro._enableaccessibility) {
						this._moveToPosAccessibilityCell(row, this.currentcol);
					}
					else {
						this._moveToPosCell(row, this.currentcol);
					}
					break;
				case nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN:
					this._currentBand = "grid";
					if (this._vscrollmng) {
						this._vscrollmng.setPos(0);
					}

					if (nexacro._enableaccessibility) {
						this._setAccessibilityBandFocus("next", false, true);
					}
					else {
						this._moveToPosCell(0, this.currentcol);
					}
					break;
				case nexacro._AccessibilityUtil.Hotkey.LASTCELLINCOLUMN:
					this._currentBand = "grid";
					if (this._vscrollmng) {
						this._vscrollmng.setPos(this._vscrollmng._max);
					}

					if (nexacro._enableaccessibility) {
						this._setAccessibilityBandFocus("prev", false, true);
					}
					else {
						this._moveToPosCell(this._rowcount - 1, this.currentcol);
					}
					break;
			}
			return true;
		}
		return false;
	};

	_pGrid.on_fire_user_onkeydown = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp) {
		if (this._accessibilityHotkeyAction(keyCode, altKey, ctrlKey, shiftKey)) {
			return true;
		}

		if (!this.enable) {
			return true;
		}

		var ret = nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp);

		if ((this.onkeydown && this.onkeydown.defaultprevented == true) || !this._is_alive) {
			return ret;
		}

		this._keydown_elem = this._getWindow()._keydown_element;

		var areamove = false;

		if (this._isAreaSelect()) {
			areamove = true;
		}

		if (shiftKey == true) {
			if (keyCode == nexacro.Event.KEY_SHIFT) {
				return ret;
			}

			if (this._isMultiSelect() || this._isAreaSelect()) {
				this._multiselect = "shift";
			}
			else {
				this._multiselect = "none";
			}
		}
		else if (ctrlKey == true) {
			if (keyCode == nexacro.Event.KEY_CTRL) {
				return ret;
			}

			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}
		else {
			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}

		var bEnterDown = false;
		var bShowEditor = true;

		if (this.autoenter == "key" && nexacro._Browser == "Runtime") {
			if (this._isChar(keyCode) || keyCode == 25) {
				if (!this._showEditing) {
					this._showEditor();

					if (keyCode == nexacro.Event.KEY_ENTER) {
						bEnterDown = true;
					}
					else {
						if (this._currentCellEditor) {
							this._currentCellEditor.set_value("");
						}
					}
				}
			}
		}

		if (!bEnterDown && keyCode == nexacro.Event.KEY_ENTER && this._showEditing) {
			var edit = this._currentCellEditor;
			var edittype = edit._cellinfo._getEdittype(edit._cellobj._rowidx);

			if (edittype == "textarea" && (altKey || ctrlKey || shiftKey)) {
				;
			}
			else if (edittype == "text" || edittype == "mask" || edittype == "date" || edittype == "combo" || edittype == "textarea") {
				bEnterDown = true;
				bShowEditor = false;

				if ((refer_comp instanceof nexacro._ComboEditControl || refer_comp instanceof nexacro._CalendarEditControl) && refer_comp.parent._isPopupVisible()) {
				}
				else {
					this._hideEditor();

					if (this.autoenter == "select") {
						bShowEditor = true;
					}
				}
			}
		}

		var firecomp = refer_comp;
		var postvalue = "";

		if (keyCode == nexacro.Event.KEY_UP) {
			if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey) == false) {
				if (ctrlKey) {
					var newpos;

					if (this._scrollpixel == "all") {
						newpos = this._vscrollmng.pos - 25;
					}
					else {
						newpos = this._vscrollmng.pos - 1;
					}

					if (newpos < 0) {
						newpos = 0;
					}

					this._vscrollmng.setPos(newpos);
				}
				else {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("up", false);
					}
					else {
						this._moveToCell("up");
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_DOWN) {
			if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey) == false) {
				if (ctrlKey) {
					var newpos;

					if (this._scrollpixel == "all") {
						newpos = this._vscrollmng.pos + 25;
					}
					else {
						newpos = this._vscrollmng.pos + 1;
					}

					if (newpos > this._vscrollmng.max) {
						newpos = this._vscrollmng.max;
					}

					this._vscrollmng.setPos(newpos);
				}
				else {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("down", false);
					}
					else {
						this._moveToCell("down");
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_SPACE) {
			if (!nexacro._enableaccessibility || nexacro._enableaccessibility && this._currentBand == "body") {
				var format = this._curFormat;
				if (format) {
					var bodycells = format._bodycells;
					if (bodycells && bodycells.length) {
						var cellinfo = bodycells[this._selectinfo.curcell];
						if (cellinfo) {
							var editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
							if (editType == "checkbox" && nexacro._toBoolean(this.readonly) == false) {
								if (this._toggleVal(this._selectinfo.curdsrow, cellinfo)) {
									this._jumpCurrentRow(this._selectinfo.currow);
								}
							}
						}
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_ENTER) {
			if (!nexacro._enableaccessibility || nexacro._enableaccessibility && this._currentBand == "body") {
				{

					var editType = "";

					if (refer_comp._type_name == "GridCellControl") {
						editType = refer_comp._refinfo._getEdittype(refer_comp._rowidx);
						postvalue = refer_comp._refinfo._getValue(refer_comp._rowidx);
					}
					else if (refer_comp instanceof nexacro._GridCheckboxControl) {
						postvalue = refer_comp._cellinfo._getValue(refer_comp._cellobj._rowidx);
					}
					else if (refer_comp.parent instanceof nexacro._GridCheckboxControl) {
						postvalue = refer_comp.parent._cellinfo._getValue(refer_comp.parent._cellobj._rowidx);
					}

					if (refer_comp instanceof nexacro._GridEditControl || 
						refer_comp instanceof nexacro._GridTextAreaControl || 
						refer_comp instanceof nexacro._GridMaskEditControl || 
						refer_comp instanceof nexacro._GridCheckboxControl || refer_comp.parent instanceof nexacro._GridCheckboxControl || editType == "checkbox" || 
						refer_comp instanceof nexacro._GridCalendarControl || refer_comp.parent instanceof nexacro._GridCalendarControl || 
						refer_comp instanceof nexacro._GridComboControl || refer_comp.parent instanceof nexacro._GridComboControl) {
						if (nexacro._Browser == "Edge" || nexacro._Browser == "IE") {
							if (refer_comp instanceof nexacro._GridComboControl) {
								firecomp = refer_comp.comboedit;
							}
						}
						if (this._showEditing || editType == "checkbox") {
							if (!altKey && !ctrlKey && !shiftKey) {
								bEnterDown = true;
							}
						}
						else if (bShowEditor) {
							var lastfocus = this._find_lastFocused();
							if (lastfocus == this) {
								if (!this._getWindow()._modal_frame_stack.length) {
									nexacro._OnceCallbackTimer.callonce(this, function () {
										this._showEditor();
									}, 50);
								}
							}
						}
					}
					else {
						if (!this._showEditing) {
							nexacro._OnceCallbackTimer.callonce(this, function () {
								this._showEditor();
							}, 50);
						}
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_LEFT) {
			var format = this._curFormat;
			if (format) {
				var bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						var editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
						if (this._hasTree && editType == "tree" && (this.treeuseexpandkey || altKey)) {
							this._is_editor_keyaction = false;
							this._treeStateKeyAction(this._selectinfo.currow, 0);
						}
						else if (editType == "combo" && 
							cellinfo._getAttrValue(cellinfo.combotype, this._getDataRow(this._selectinfo.curdsrow)) == "dropdown") {
							this._is_editor_keyaction = false;
							if (nexacro._enableaccessibility) {
								ret = this._moveToAccessibilityCell("prev", false, undefined, areamove);
							}
							else {
								this._moveToCell("prev", false, areamove, undefined, undefined, true);
							}
						}
					}
				}

				if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey) == false) {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("prev", false, undefined, areamove);
					}
					else {
						this._moveToCell("prev", false, areamove, undefined, undefined, true);
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_RIGHT) {
			var format = this._curFormat;
			if (format) {
				var bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						var editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
						if (this._hasTree && editType == "tree" && (this.treeuseexpandkey || altKey)) {
							this._is_editor_keyaction = false;
							this._treeStateKeyAction(this._selectinfo.currow, 1);
						}
						else if (editType == "combo" && 
							cellinfo._getAttrValue(cellinfo.combotype, this._getDataRow(this._selectinfo.curdsrow)) == "dropdown") {
							this._is_editor_keyaction = false;
							if (nexacro._enableaccessibility) {
								ret = this._moveToAccessibilityCell("next", false, undefined, areamove);
							}
							else {
								this._moveToCell("next", false, areamove, undefined, undefined, true);
							}
						}
						else {
							var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, this._selectinfo.curdsrow);
							if (expandshow == "show" && altKey) {
								this._is_editor_keyaction = false;
								this.on_fire_onexpanddown("none", altKey, ctrlKey, shiftKey, -1, -1, -1, -1, -1, -1, obj, refer_comp);
							}
						}
					}
				}

				if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey) == false) {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("next", false, undefined, areamove);
					}
					else {
						this._moveToCell("next", false, areamove, undefined, undefined, true);
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_PAGE_UP) {
			if (this._vscrollmng) {
				var newpos = this._vscrollmng._pos - this._vscrollmng.page;

				if (this._scrollpixel != "all") {
					newpos = this._vscrollmng._scroll_reverse_convert(newpos)[0];
				}

				if (newpos < 0) {
					newpos = 0;
				}

				this._vscrollmng.setPos(newpos, "page_v");
			}
		}
		else if (keyCode == nexacro.Event.KEY_PAGE_DOWN) {
			if (this._vscrollmng) {
				var newpos = this._vscrollmng._pos + this._vscrollmng.page;

				if (this._scrollpixel != "all") {
					newpos = this._vscrollmng._scroll_reverse_convert(newpos)[0];
				}

				if (newpos > this._vscrollmng.max) {
					newpos = this._vscrollmng.max;
				}

				this._vscrollmng.setPos(newpos, "page_v");
			}
		}
		else if (keyCode == nexacro.Event.KEY_TAB) {
			if (nexacro._enableaccessibility) {
				if (shiftKey) {
					this._acceptstab = this._moveToAccessibilityCell("prev", true);
				}
				else {
					this._acceptstab = this._moveToAccessibilityCell("next", true);
				}
			}
			else {
				if (shiftKey == true) {
					this._acceptstab = this._moveToCell("prev", true, false, undefined, undefined, true);
				}
				else {
					this._acceptstab = this._moveToCell("next", true, false, undefined, undefined, true);
				}
			}

			if (this._acceptstab && this._iskey_movetocell) {
				this._moveCellAfterFocus();
				this._iskey_movetocell = false;
			}

			this._keydown_elem._event_stop = true;

			return this._acceptstab;
		}
		else {
			if (this.autoenter == "key" && nexacro._Browser == "Runtime") {
				if (this._isChar(keyCode) || keyCode == 25) {
					if (!this._showEditing) {
						this._showEditor();
					}
				}
			}
		}

		if (bEnterDown) {
			this.on_fire_onenterdown(keyCode, altKey, ctrlKey, shiftKey, obj, firecomp, postvalue);
		}

		return ret;
	};

	_pGrid.on_fire_allclick = function (obj, eventid, clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if ((this.onlbuttondown && this.onlbuttondown.defaultprevented == true) || (this.onlbuttonup && this.onlbuttonup.defaultprevented == true)) {
			return;
		}
		if (this._isDownUpScroll()) {
			return;
		}

		var click = this[eventid];
		if (click && click._has_handlers && this.enableevent) {
			var evt = new nexacro.GridClickEventInfo(obj, eventid, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			evt.clickitem = clickitem;
			return click._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid._getByteLength_UTF8 = function (s, b, i, c) {
		for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1) {
		}
		return b;
	};

	_pGrid.on_fire_cellclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		if (!this.enable) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);

		if (this._isFakeCell(newPos)) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (nexacro._isTouchInteraction) {
			if (cellobj._band.id == "body") {
				if (!(this._selectscrollmode == "select" && this._isAreaSelect())) {
					this._common_fire_sys_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
				}
			}
		}

		var beforeCell = this._beforebodycellpos;
		var beforeCol = this._beforebodycolpos;
		var beforeRow = this._beforebodyrowpos;
		var beforeSubrow = this._beforebodysubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;
		var parentcell = cellobj.parentcell;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}


		var obj = from_refer_comp;
		var showEditclick = false;

		while (obj && !(obj instanceof nexacro.Grid)) {
			if (obj._displaymode == false && !obj._clickevt_able) {
				showEditclick = true;
			}

			obj = obj.parent;
		}

		if (!showEditclick) {
			this.on_fire_allclick(this, "oncellclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		}
	};

	_pGrid.on_fire_headclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._beforeheadcellpos;
		var beforeCol = this._beforeheadcolpos;
		var beforeRow = this._beforeheadrowpos;
		var beforeSubrow = this._beforeheadsubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = this._beforeheadcellpos = cellobj._cellidx;
		var afterCol = this._beforeheadcolpos = cellobj._refinfo._col;
		var afterRow = this._beforeheadrowpos = this._getDataRow(cellobj._rowidx);
		var afterSubrow = this._beforeheadsubrowpos = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this.on_fire_allclick(this, "onheadclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_summaryclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._beforesummcellpos;
		var beforeCol = this._beforesummcolpos;
		var beforeRow = this._beforesummrowpos;
		var beforeSubrow = this._beforesummsubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = this._beforesummcellpos = cellobj._cellidx;
		var afterCol = this._beforesummcolpos = cellobj._refinfo._col;
		var afterRow = this._beforesummrowpos = this._getDataRow(cellobj._rowidx);
		var afterSubrow = this._beforesummsubrowpos = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this.on_fire_allclick(this, "onsummaryclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_celldblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);

		if (this._isFakeCell(newPos)) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "oncelldblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_headdblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = this._getDataRow(cellobj._rowidx);
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "onheaddblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_summarydblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = this._getDataRow(cellobj._rowidx);
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "onsummarydblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_dsnotify_onrowposchanged = function (obj, e) {
		var oldPos = this._rowposition;
		var newPos = parseInt(obj.rowposition, 10);

		this._rowposition = newPos;

		if (this.getElement() && this._userRowposChange == false) {
			var cellOldPos = -1;
			var cellNewPos = -1;
			var pthis = this;

			if (this._hasTree) {
				cellOldPos = this._getTreeRowPosition(oldPos);
				cellNewPos = this._getTreeRowPosition(newPos);
			}
			else {
				cellOldPos = oldPos;
				cellNewPos = newPos;
			}

			var beforeCell;
			var beforeCol;
			var beforeRow;
			var beforeSubrow;
			var beforePvt;

			var afterCell;
			var afterCol;
			var afterRow;
			var afterSubrow;
			var afterPvt = -9;

			beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
			beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
			beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
			beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
			beforePvt = this._beforepvt = this._selectinfo.curpvt;

			if (cellNewPos < 0) {
				afterCell = (this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell;
				afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
				afterRow = newPos;
				afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;

				function proc1 () {
					pthis._hideEditor();
					pthis._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
					pthis._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
					pthis._moveCellAfterFocus();
				}
				;

				if (this._is_async_recreate) {
					nexacro._OnceCallbackTimer.callonce(this, proc1, 100);
				}
				else {
					proc1();
				}
			}
			else if (cellOldPos == cellNewPos) {
			}
			else {
				afterCell = (this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell;
				afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
				afterRow = newPos;
				afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;

				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

				if (afterRow >= 0 && (this._isMultiSelect() || this._isAreaSelect())) {
					if (obj._bWorkingstatus == true) {
						this._beforebodycellpos = -1;
						this._beforebodycolpos = -1;
						this._beforebodyrowpos = -1;
						this._beforebodysubrowpos = -1;

						this._setSelectedInfo(-1, -1, -1, -1, null);
						this._hideEditor();
						this._ChangeSelect(-1, -1, -1, -1, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
						this._moveCellAfterFocus();
					}
					else {
						if (this._getUseBindExprProp("body") || this._isUseBindExprStyle("body")) {
							this._refreshBody(true);
						}
						if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
							this._refreshHead(true);
						}
						if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
							this._refreshSumm(true);
						}

						var disprow = this._dsRowToDispRow(afterRow);

						function proc2 () {
							pthis._jumpCurrentRow(disprow);
							pthis._moveCellAfterFocus();
						}
						;

						if (this._is_async_recreate) {
							nexacro._OnceCallbackTimer.callonce(this, proc2, 100);
						}
						else {
							proc2();
						}
					}
				}
				else {
					function proc3 () {
						pthis._hideEditor();
						pthis._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
						pthis._moveCellAfterFocus();
					}
					;

					if (this._is_async_recreate) {
						nexacro._OnceCallbackTimer.callonce(this, proc3, 100);
					}
					else {
						proc3();
					}
				}
			}
		}
	};

	_pGrid.on_dsnotify_oncolumnchanged = function (obj, e, async_call) {
		if (this._is_async_recreate) {
			if (!async_call) {
				var win = this._getWindow();
				win._postMessage(this, "oncolumnchanged", this._callbackPostmsg, [obj, e]);
			}
			return;
		}

		if (obj._bWorkingstatus == true) {
			this._recreate_contents_all(true, false);
			return;
		}

		var b_change_state = false;
		var cols = [];

		if (this._isTreeStateChanged(e, this._dsEventOccured) == true) {
			b_change_state = true;

			this._updateTreeStates();

			var rowidx = this._getTreeRowPosition(e.row);
			var state = this._treeStates[e.row];

			if (this._bodyBand) {
				if (rowidx == -1) {
					this._recreate_contents_all(true, false, true);
				}
				else {
					if (this._treeCellinfo.treelevel._bindexpr == e.columnid) {
						this._refreshBody();
					}
					else {
						if (state == 0) {
							this._bodyBand._matrix._adjustTreeDisplay(rowidx, true);
						}
						else {
							this._bodyBand._matrix._adjustTreeDisplay(rowidx, false);
						}

						var parentrow = this.getTreeParentRow(rowidx, true);
						parentrow = this._dsRowToDispRow(parentrow, true);

						this._refreshBodyRow(parentrow);
					}
				}
			}
		}
		else if ((this.autosizingtype == "row" || this.autosizingtype == "both") && this._isChangeBodyRowSizeList(e.row) == true) {
			this._recreate_contents_all(true, false);
		}
		else if ((this.autosizingtype == "col" || this.autosizingtype == "both") && this._isChangeBodyColSizeList(e.columnid, cols, e.row) == true) {
			this._autofitcol_rate = [];

			if (cols.length > 1) {
				if (this.autosizingtype == "both") {
					this._recreate_contents_all(true, false);
				}
				else {
					this._recreate_contents_all(false, false);
				}
			}
			else if (cols.length == 1) {
				this._updateColSize(cols[0]);
			}
		}
		else {
			if (e.row >= 0) {
				if (this._hasTree && this._treeCellinfo.treecheck._bindexpr == e.columnid) {
					this._treeChecked = this._createTreeChecked();
				}

				var displayrow = this._dsRowToDispRow(e.row, true);
				if (displayrow >= 0) {
					var bindcells = this._getBindTextCellInfo(e.columnid);
					var bhead = false;
					var bsumm = false;

					if (bindcells) {
						var cells = bindcells[0];
						var bind = bindcells[1];

						var cellsLen = cells.length, csupp;

						if (this._is_use_suppress) {
							for (var i = 0; i < cellsLen; i++) {
								csupp = cells[i]._getSuppress(e.row);
								if (csupp != 0) {
									this._suppressUpdate();
									break;
								}
							}
						}

						var b_continue = false;

						for (var i = 0; i < cellsLen; i++) {
							if (cells[i]._type == "head") {
								bhead = true;
							}
							else if (cells[i]._type == "summary") {
								bsumm = true;
							}
							else {
								if (e.col == -1 && e.colidx == -1) {
									if (e.newvalue != undefined) {
										if (!b_continue) {
											if (this._hasTree) {
												this._initTreeStates(true, true);
												this._recreate_contents_all(false, false, true);
											}
											else {
												this._refreshBodyRow(displayrow);
											}
											b_continue = true;
										}
									}
								}
								else {
									if (this._hasTree && b_change_state) {
										if (!b_continue) {
											this._refreshBody();
											b_continue = true;
										}
									}
									else {
										csupp = cells[i]._getSuppress(e.row);
										if (csupp > 0) {
											this._refreshCell("body", cells[i]._cellidx);
										}
										else if (csupp < 0) {
											if (!b_continue) {
												this._refreshBodyRow(displayrow);
												b_continue = true;
											}
										}
										else {
											if (!b_continue) {
												var ds = this._binddataset;
												if (ds.keystring && ds._keycols.length > 0) {
													this._refreshBody();
												}
												else {
													this._refreshBodyRow(displayrow);

													var exprbindcells = null;

													if ((exprbindcells = this._getUseBindExprProp("body"))) {
														if (this._expr_allrow_update_prop || this._expr_allrow_update_style) {
															if (exprbindcells) {
																for (var j = 0; j < exprbindcells.length; j++) {
																	this._refreshCell("body", exprbindcells[j], undefined);
																}
															}
														}
													}
												}
												b_continue = true;
											}

											if (bind && this._currentCellEditor && cells[i]._col == this._currentCellEditor._cellinfo._col && cells[i]._row == this._currentCellEditor._cellinfo._row && e.row == this._currentCellRow) {
												this._currentCellEditor._setProperty();
											}
										}
									}
								}
								bsumm = true;
							}
						}
					}
					if (bhead || this._getUseBindExprProp("head")) {
						this._refreshHead();
					}
					if (bsumm || this._getUseBindExprProp("summ")) {
						this._refreshSumm();
					}
				}
				else {
					if (this._hasTree && e.columnid == "") {
						this._initTreeStates(true);
						this._recreate_contents_all(false, false, true);
					}
				}
			}
			else {
				this._refreshHead();
				this._refreshSumm();

				if (obj._isConstColumn(e.col) == true) {
					this._refreshBody();
				}
			}
		}
	};

	_pGrid.on_dsnotify_onload = function (obj, e) {
		if (!this._is_created && this._rowcount == obj.rowcount) {
			return;
		}

		var prevrowcnt = this._rowcount;
		this.rowcount = this._rowcount = obj.rowcount;
		this._rowposition = obj.rowposition;

		this._initSelect(this._rowposition);

		if (this._is_down_act && !this._isDownActionKeyMouse()) {
			this._is_down_act = false;
		}

		this._exprcache = {
		};
		this._initTreeStates();

		var _reason = e.reason;
		var _errorcode = e.errorcode;
		if (_errorcode < 0) {
			return;
		}

		if (_reason == 0 || _reason == 1 || _reason == 2 || _reason == 3) {
			if (this.autosizingtype != "none") {
				if (this._async_create == true) {
					this._recreate_contents_all_async(true, true);
				}
				else {
					this._recreate_contents_all(true, true);
				}
			}
			else {
				this._updateBodyClient("load");
			}
		}
		else if (_reason == 91) {
			this._recreate_contents_all(true, true);
			this._binddataset = null;
		}
		else if (_reason == 12) {
			var body = this._bodyBand;
			if (!body) {
				return;
			}

			var lastrow = prevrowcnt - 1;
			var toppos = body._matrix._getBodyRowTopPos(lastrow + 1) - this._getScrollTop();
			var rect = this._getAvailableRect(body);
			var chk_srow = prevrowcnt;

			var disp_rows_len = body._matrix._rows.length;
			var row = lastrow + 1;

			if (toppos >= rect.height && lastrow < row && (disp_rows_len % 2 != 1)) {
				if (this._isUserChangeHeadRowSize || this._isUserChangeBodyRowSize || this._isUserChangeSummRowSize) {
					this._recreate_contents_all(true, false, true);
				}
				else {
					this._resetRowSizeList(chk_srow);
					this._resetColSizeList(chk_srow);
					this._resetScrollMax();
				}
			}
			else {
				if (this._hasTree) {
					this._initTreeStates(true);
					this._recreate_contents_all(true, false, true);
				}
				else if (this.autosizingtype == "col" || this.autosizingtype == "both") {
					this._recreate_contents_all(true, false);
				}
				else {
					this._updateBodyClient("appenddata");
				}
			}
		}
	};

	_pGrid.on_dsnotify_onrowsetchanged = function (obj, e) {
		var dataset = this._binddataset;
		var bchange_rowcnt = (this._rowcount != dataset.rowcount);
		var prev_rowcnt = this._rowcount;
		this.rowcount = this._rowcount = dataset.rowcount;

		var updaterow_pos = false;
		if (this._rowposition != dataset.rowposition) {
			updaterow_pos = true;
		}

		if (this._is_down_act && !this._isDownActionKeyMouse()) {
			this._is_down_act = false;
		}

		this._rowposition = dataset.rowposition;
		if (this._curFormat) {
			var cells = this._curFormat._bodycells;
			var lastrow = this._rowcount - 1;
			var kind;

			switch (e.reason) {
				case 10:
					kind = "assign";
					break;
				case 11:
					kind = "copydata";
					break;
				case 12:
					if (e.row == -1) {
						kind = "appenddata";
					}
					else if (e.row == lastrow) {
						kind = "addrow";
					}
					else if (e.row < lastrow) {
						kind = "insertrow";
					}
					break;
				case 20:
					if (e.row == -1) {
						kind = "deletemultirows";
					}
					else {
						kind = "deleterow";
					}
					break;
				case 22:
					kind = "deleteall";
					break;
				case 23:
					kind = "cleardata";
					break;
				case 24:
					kind = "clear";
					break;
				case 30:
					kind = "keystring";
					break;
				case 31:
					if (e.row == -1) {
						kind = "filter";
					}
					else {
						kind = "filterrow";
					}
					break;
				case 32:
					kind = "moverow";
					break;
				case 33:
					kind = "exchangerow";
					break;
				case 34:
					kind = "addcolumn";
					break;
				case 41:
					kind = "enableevent";
					break;
				case 40:
					kind = "rowtype";
					break;
				default:
					break;
			}

			if (kind == "copydata" || kind == "addcolumn" || kind == "assign" || kind == "filter") {
				this._exprcache = {
				};
				this._resetSelect(this._rowposition);
			}
			else if (kind == "enableevent" || kind == "appenddata") {
				this._exprcache = {
				};
			}
			else if (kind == "deleterow" || kind == "filterrow") {
				this._updateTreeStates(e.row, false);
			}
			else if (kind == "deletemultirows") {
				var rows = obj._deleteRows;

				for (var i = rows.length - 1; i >= 0; i--) {
					this._updateTreeStates(rows[i], false);
				}
			}
			else if (kind == "deleteall" || kind == "cleardata" || kind == "clear") {
				this._clrMultiSelect();
				this._setSelectedInfo(-1, -1, -1, -1, null);
				this._destroyOverlayElements();
			}
			else if (kind == "copydata") {
				this._setSelectedInfo(null, null, this._rowposition, 0, null);
			}
			else if (kind == "addrow" || kind == "insertrow" || kind == "appendrow") {
				this._updateTreeStates(e.row, true);
			}

			if (this._is_async_recreate) {
				var win = this._getWindow();
				win._postMessage(this, "afterrowset", this._callbackPostmsg, [kind, updaterow_pos, e.row, bchange_rowcnt, prev_rowcnt]);
			}
			else {
				this._afterRowsetChanged(kind, updaterow_pos, e.row, bchange_rowcnt, prev_rowcnt);
			}
		}
	};

	_pGrid._callbackPostmsg = function (e) {
		var args = e.data;
		if (e.id == "afterrowset") {
			this._afterRowsetChanged(args[0], args[1], args[2], args[3], args[4]);
		}
		else if (e.id == "oncolumnchanged") {
			this.on_dsnotify_oncolumnchanged(args[0], args[1], true);
		}
	};

	_pGrid._afterRowsetChanged = function (kind, updaterow_pos, row, bchange_rowcnt, prev_rowcnt) {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}
		if (this.getElement() && this.enableredraw) {
			var bodyBand = this._bodyBand;

			if (kind == "moverow" || kind == "enableevent") {
				this._hideEditor(true);
			}
			else {
				this._hideEditor(true);
			}

			if (kind == "copydata" || kind == "assign") {
				this._initTreeStates();
				this._recreate_contents_all(true, true);
			}
			else if (kind == "addcolumn") {
				this._initTreeStates(true);
				this._recreate_contents_all(true, false);
			}
			else if (kind == "keystring") {
				this._initTreeStates();

				if (this.autosizingtype == "col" || this.autosizingtype == "both") {
					this._recreate_contents_all(true, false);
				}
				else {
					this._recreate_contents_all(true, false, true);
				}

				this._resetSelect(this._rowposition, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.cursubrow, this._selectinfo.curpvt);
			}
			else if (kind == "enableevent") {
				this._initTreeStates(true);

				if (bchange_rowcnt || this.autosizingtype != "none") {
					this._recreate_contents_all(true, false);
				}
				else {
					if (this._hasTree) {
						if (bodyBand) {
							bodyBand._matrix._adjustRowsDisplay(true);
							bodyBand._matrix._adjustColsDisplay();
							bodyBand._on_refresh_rows();
						}
					}
					this._refreshAll();
				}

				if (updaterow_pos == false) {
					this._select_noscroll = true;
				}

				this._resetSelect(this._rowposition, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.cursubrow, this._selectinfo.curpvt);
				this._select_noscroll = false;

				if (!this._is_created) {
					this._create_selection = {
						cell : this._selectinfo.curcell, 
						col : this._selectinfo.curcol, 
						row : this._selectinfo.curdsrow, 
						subrow : this._selectinfo.cursubrow, 
						pvt : this._selectinfo.curpvt
					};
				}
			}
			else if (kind == "addrow" || kind == "appenddata" || kind == "deleterow" || kind == "filterrow" || kind == "insertrow" || kind == "deletemultirows" || kind == "filter") {
				if (bodyBand) {
					var chk_srow;

					if (kind == "addrow" || kind == "appenddata") {
						chk_srow = prev_rowcnt;
					}

					if (row <= this._fixed_endrow) {
						this._resetRowSizeList(chk_srow);
						this._resetColSizeList(chk_srow);
						this._setFixedRow(-1);
					}
					else {
						var lastrow = this._getDataRow(this._endrowpos);
						var toppos = bodyBand._matrix._getBodyRowTopPos(lastrow + 1) - this._getScrollTop();
						var rect = this._getAvailableRect(bodyBand);
						var disp_rows_len = bodyBand._matrix._rows.length;

						if (toppos >= rect.height && lastrow < row && (disp_rows_len % 2 != 1)) {
							if (this._isUserChangeHeadRowSize || this._isUserChangeBodyRowSize || this._isUserChangeSummRowSize) {
								this._recreate_contents_all(true, false, true, undefined, chk_srow);
							}
							else {
								this._resetRowSizeList(chk_srow);
								this._resetColSizeList(chk_srow);
								this._resetScrollMax();
							}
							if (kind == "deleterow") {
								var disprow = this._dsRowToDispRow(row);
								this._jumpCurrentRow(disprow);
							}
							else {
							}
						}
						else {
							if (kind == "insertrow") {
								;
							}
							else {
								if (this._hasTree) {
									this._initTreeStates((kind == "addrow" || kind == "appenddata" || kind == "deleterow"));
								}
							}

							if (this.autosizingtype == "col" || this.autosizingtype == "both") {
								this._recreate_contents_all(true, false, false, undefined, chk_srow);
							}
							else if (this.autosizingtype == "row") {
								this._recreate_contents_all(true, false, true, undefined, chk_srow);
							}
							else {
								if (this._hasTree) {
									this._recreate_contents_all(true, false, true, undefined, chk_srow);
								}
								else {
									this._updateBodyClient(kind, row, chk_srow);
								}
							}
						}
					}
				}
				else {
					this._recreate_contents_all(true, false);
				}
			}
			else if (kind == "exchangerow" || kind == "moverow") {
				if (this.autosizingtype != "none" || this._hasTree) {
					this._initTreeStates(true);
					this._recreate_contents_all(false, false, true);
				}
				else {
					this._refreshBody();
				}
			}
			else if (kind == "rowtype") {
				this._refreshAll();
			}
			else {
				this._initTreeStates();
				this._recreate_contents_all(true, false);
			}
			this._moveCellAfterFocus();
		}
	};

	_pGrid._getDisplayRowCount = function () {
		var band = this._bodyBand;
		if (band) {
			return band._get_rows().length;
		}

		return 0;
	};

	_pGrid._needUpdateExtinner = function () {
		var _vpos = (this.vscrollbar) ? this.vscrollbar._pos : 0;
		var band = this._bodyBand;
		var ext_cnt = band._control_element._getExtendContainerCount();

		if (ext_cnt > 0 && _vpos > (this._div_max_height - (this._client_height * 2))) {
			return true;
		}

		return false;
	};

	_pGrid._updateBodyClient = function (kind, row, chk_srow) {
		var band = this._bodyBand;
		if (!band) {
			return;
		}

		this._resetRowSizeList(chk_srow);
		this._resetColSizeList(chk_srow);

		this._resetScrollMax();
		this._applyAutofittype(true);

		var beforerowcnt = this._getDisplayRowCount();

		if (kind == "insertrow") {
			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, false, true);
			}
			else {
				band._matrix._adjustRowsDisplay();
				band._matrix._adjustColsDisplay();

				var rows = band._get_rows();
				var rows_len = rows.length;

				for (var i = 0; i < rows_len; i++) {
					var datarow = this._getDataRow(rows[i]._rowidx);
					if (row > datarow) {
						continue;
					}

					band._update_rows.push(rows[i]);
				}

				band._on_refresh_rows();
			}

			var disprow = this._dsRowToDispRow(row);
			this._jumpCurrentRow(disprow);
		}
		else if (kind == "deleterow") {
			var _vpos = (this._vscrollmng) ? this._vscrollmng._pos : 0;
			_vpos -= this._is_over_scroll;

			if (_vpos < 0) {
				_vpos = 0;
			}

			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, false, true);
			}
			else {
				this._toprowpos = this._getScreenTopRowPos(_vpos);
				this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

				band._matrix._adjustRowsDisplay();
				band._matrix._adjustColsDisplay();

				var rows = band._get_rows();
				var rows_len = rows.length;

				for (var i = 0; i < rows_len; i++) {
					var datarow = this._getDataRow(rows[i]._rowidx);
					if (row > datarow) {
						continue;
					}

					band._update_rows.push(rows[i]);
				}

				band._on_refresh_rows();
			}

			row = this._binddataset.rowposition;

			var disprow = this._dsRowToDispRow(row);
			this._jumpCurrentRow(disprow);

			var lastPosition = this._last_scroll_top;

			if (lastPosition != _vpos) {
				band._update_rows = band._matrix._adjustScrollRows(_vpos);
			}

			band._on_refresh_rows();

			if (this._is_over_scroll > 0) {
				this._vscrollmng.setPos(this._vscrollmng.pos - 1);
			}
		}
		else if (kind == "load") {
			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, true, true);
			}
			else {
				this._toprowpos = this._getScreenTopRowPos(0);
				this._bottomrowpos = this._getScreenBottomRowPos(0);

				band._update_rows = band._matrix._adjustScrollRows(0);
				band._matrix._adjustRowsDisplay();
				band._matrix._adjustColsDisplay();
				band._on_refresh_rows();
				this._vscrollmng.setPos(0);
			}
		}
		else {
			var _vpos = (this._vscrollmng) ? this._vscrollmng._pos : 0;
			_vpos -= this._is_over_scroll;

			if (_vpos < 0) {
				_vpos = 0;
			}

			this._toprowpos = this._getScreenTopRowPos(_vpos);
			this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, false, true);
			}
			else {
				if (kind == "filterrow" || kind == "deletemultirows" || kind == "filter") {
					band._matrix._init();
				}

				band._matrix._adjustRowsDisplay();
				band._matrix._adjustColsDisplay();
			}

			var lastPosition = this._last_scroll_top;

			if (lastPosition != _vpos) {
				band._update_rows = band._matrix._adjustScrollRows(_vpos);
			}

			band._on_refresh_rows();

			if (this._is_over_scroll > 0) {
				this._vscrollmng.setPos(this._vscrollmng.pos - 1);
			}
		}

		var afterrowcnt = this._getDisplayRowCount();

		if (this.fillareatype != "none" || kind == "load") {
			this._refreshBody();
		}

		this._updateNodata(beforerowcnt, afterrowcnt);

		if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
			this._refreshHead(true);
		}
		if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
			this._refreshSumm(true);
		}
	};

	_pGrid.set_enableredraw = function (v) {
		if (v != null && this.enableredraw != v) {
			v = nexacro._toBoolean(v);
			this.enableredraw = v;

			if (v) {
				if (this._curFormat) {
					this._curFormat._updateFormatStr();
				}

				this.on_apply_enableredraw();
			}
		}
		return v;
	};

	_pGrid.on_apply_enableredraw = function () {
		nexacro.Component.prototype.on_apply_enableredraw.call(this);

		if (this._enable_redraw_history.recreate) {
			this.redraw();
			this._enable_redraw_history = {
			};
			return;
		}

		var ds = this._binddataset;
		if (ds && ds.oncolumnchanged && ds.oncolumnchanged._firestat) {
			this._recreate_contents_all(true, false);
			this._enable_redraw_history = {
			};
			return;
		}

		if (this._enable_redraw_history.recreate_body) {
			if (this._bodyBand) {
				this._bodyBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history.refresh_body && !this._enable_redraw_history.refreshall) {
			this._refreshBody(true);
		}

		if (this._enable_redraw_history.recreate_head) {
			if (this._headBand) {
				this._headBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history.refresh_head && !this._enable_redraw_history.refreshall) {
			this._refreshHead(true);
		}

		if (this._enable_redraw_history.recreate_summ) {
			if (this._summBand) {
				this._summBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history.refresh_summ && !this._enable_redraw_history.refreshall) {
			this._refreshSumm(true);
		}

		if (this._enable_redraw_history.resize_band) {
			this._resizeBand();
		}

		if (this._enable_redraw_history.updatecolsize) {
			var props = this._enable_redraw_history.updatecolsize;
			var props_len = props.length;
			var min = props[0];

			for (var i = 1; i < props_len; i++) {
				min = Math.min(props[i], min);
			}
			this._updateColSize(min);
		}

		if (this._enable_redraw_history.updaterowsize) {
			var props = this._enable_redraw_history.updaterowsize;
			var props_len = props.length;

			for (var i = 0; i < props_len; i++) {
				this._updateRowSize(props[i][0], props[i][1], (i < props_len - 1));
			}
		}

		if (this._enable_redraw_history.autofit) {
			var prop = this._enable_redraw_history.autofit;
			this._applyAutofittype(prop[0], prop[1]);
		}

		this._enable_redraw_history = {
		};
	};

	_pGrid._isSelectedCell = function (cell, datarow) {
		var selects = this._selectinfo.getSelectCells(datarow);

		if (!this._isSelectRowType()) {
			if (selects && selects[cell]) {
				return true;
			}
		}
		else {
			if (selects) {
				return true;
			}
		}
		return false;
	};

	_pGrid.isSelectedCell = function (nCell, strBand, nRowIdx, nPivotIdx) {
		if (strBand) {
			strBand = strBand.toLowerCase();
		}

		if (arguments.length == 0) {
			return false;
		}
		else if (arguments.length == 1) {
			strBand = "body";
			nRowIdx = 0;
			nPivotIdx = 0;
		}
		else if (arguments.length == 2) {
			if (strBand == "body") {
				nRowIdx = 0;
			}
			else if (strBand.indexOf("summ") >= 0) {
				nRowIdx = -2;
			}
			else {
				nRowIdx = -1;
			}

			nPivotIdx = 0;
		}
		else if (arguments.length == 3) {
			if (strBand.indexOf("summ") >= 0) {
				nRowIdx = -2;
			}
			else if (strBand == "head") {
				nRowIdx = -1;
			}

			nPivotIdx = 0;
		}

		return this._isSelectedCell(nCell, nRowIdx);
	};

	_pGrid.getSelectedRows = function () {
		var selects = [].concat(this._selectinfo.rows);
		var retn = [];

		for (var i = 0, n = selects.length; i < n; i++) {
			retn[i] = this._getTreeRowPosition(selects[i]);
		}

		return retn;
	};

	_pGrid.getSelectedDatasetRows = function () {
		var retn = [].concat(this._selectinfo.rows);

		for (var i = 0; i < retn.length; i++) {
			if (retn[i] < 0) {
				retn.splice(i, 1);
				i--;
			}
		}

		if (retn.length == 0) {
			retn = -9;
		}

		return retn;
	};

	_pGrid.clearSelect = function () {
		this._selectinfo.area = [];
		this._resetSelect(-1, -1, -1, -1, -9);
		return true;
	};

	_pGrid.selectRow = function (nRow, bSelect) {
		if (!this._isSelectRowType()) {
			return false;
		}

		if (bSelect == undefined) {
			bSelect = true;
		}

		nRow = this._getDataRow(nRow);
		return this._selectRow(nRow, bSelect);
	};

	_pGrid.selectCell = function (nRow, nCellidx, bSelect) {
		if (this._isSelectRowType()) {
			return false;
		}

		if (bSelect == undefined) {
			bSelect = true;
		}

		return this._selectRow(nRow, bSelect, false, nCellidx);
	};

	_pGrid.selectArea = function (nStartRow, nStartColIdx, nEndRow, nEndColIdx) {
		if (!this._isAreaSelect()) {
			return false;
		}

		var beforeCell = this._selectinfo.curcell;
		var beforeCol = this._selectinfo.curcol;
		var beforeRow = this._selectinfo.curdsrow;
		var beforeSubrow = this._selectinfo.cursubrow;
		var beforePvt = this._selectinfo.curpvt;

		if (nStartRow > nEndRow) {
			var s = nStartRow;
			nStartRow = nEndRow;
			nEndRow = s;
		}

		if (nStartColIdx > nEndColIdx) {
			var s = nStartColIdx;
			nStartColIdx = nEndColIdx;
			nEndColIdx = s;
		}

		var format = this._curFormat;
		var endsubrow = format._bodyrows.length - 1;
		var s_band = "body", e_band = "body";

		if (nStartRow == -1) {
			s_band = "head";
		}
		else if (nStartRow == -2) {
			s_band = "summ";
		}

		if (nEndRow == -1) {
			endsubrow = format._headrows.length - 1;
			e_band = "head";
		}
		else if (nEndRow == -2) {
			endsubrow = format._summrows.length - 1;
			e_band = "summ";
		}

		function getBegEnd (cells, nStartColIdx, nEndColIdx, is_start) {
			var begc, endc;
			if (is_start) {
				for (var i = 0, n = cells.length; i < n; i++) {
					if (cells[i]._col == nStartColIdx) {
						begc = i;
						break;
					}
				}
				return begc;
			}
			else {
				for (var i = cells.length - 1; i >= 0; i--) {
					if (cells[i]._col <= nEndColIdx && nEndColIdx <= (cells[i]._col + cells[i]._colspan)) {
						endc = i;
						break;
					}
				}
				return endc;
			}
		}

		var afterCell, afterCol, afterRow, afterSubrow, afterPvt, begendcell;

		if (s_band == "summ") {
			begendcell = getBegEnd(format._summcells, nStartColIdx, nEndColIdx, true);
		}
		else if (s_band == "head") {
			begendcell = getBegEnd(format._headcells, nStartColIdx, nEndColIdx, true);
		}
		else {
			begendcell = getBegEnd(format._bodycells, nStartColIdx, nEndColIdx, true);
		}

		this._setSelectedInfo(begendcell, nStartColIdx, nStartRow, 0, null);
		afterCell = begendcell;
		afterCol = nStartColIdx;
		afterRow = nStartRow;
		afterSubrow = 0;
		afterPvt = this._selectinfo.curpvt;

		if (this._isMultiSelect()) {
			this._multiselect = "ctrl";
		}
		else {
			this._clrMultiSelect();
			this._multiselect = "none";
		}
		this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, s_band, "func_area1");

		if (e_band == "summ") {
			begendcell = getBegEnd(format._summcells, nStartColIdx, nEndColIdx, false);
		}
		else if (e_band == "head") {
			begendcell = getBegEnd(format._headcells, nStartColIdx, nEndColIdx, false);
		}
		else {
			begendcell = getBegEnd(format._bodycells, nStartColIdx, nEndColIdx, false);
		}

		this._setSelectedInfo(begendcell, nEndColIdx, nEndRow, endsubrow, null);
		afterCell = begendcell;
		afterCol = nEndColIdx;
		afterRow = nEndRow;
		afterSubrow = endsubrow;
		afterPvt = this._selectinfo.curpvt;

		this._multiselect = "shift";
		return this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, e_band, "func_area2");
	};

	_pGrid._selectRow = function (row, bSelect, noDraw, cell, bDataset) {
		var beforeCell = this._selectinfo.curcell;
		var beforeCol = this._selectinfo.curcol;
		var beforeRow = this._selectinfo.curdsrow;
		var beforeSubrow = this._selectinfo.cursubrow;
		var beforePvt = this._selectinfo.curpvt;
		var band = "body";

		if (row == -1) {
			band = "head";
		}
		else if (row == -2) {
			band = "summ";
		}

		this._setSelectedInfo(null, null, row, 0, null);

		if (band != "body" && cell == undefined) {
			cell = 0;
		}

		if (cell != undefined) {
			this._setSelectedInfo(cell, null, null, null, null);
		}

		var retn = false;

		if (!bDataset) {
			bDataset = false;
		}

		var afterCell = (cell != undefined) ? cell : ((this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell);
		var afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
		var afterRow = row;
		var afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;
		var afterPvt = this._selectinfo.curpvt;
		var curselect = this.isSelectedCell((cell == undefined ? 0 : cell), band, row);

		if (bSelect != curselect) {
			if (this._isMultiSelect()) {
				this._multiselect = "ctrl";
				retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, bDataset, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "func_selectrow");
			}
			else {
				this._clrMultiSelect();
				retn = true;

				if (bSelect) {
					retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "func_selectrow");
				}
			}
		}
		else {
			this._setSelectedInfo(null, null, beforeRow, 0, null);

			if (cell != undefined) {
				this._setSelectedInfo(beforeCell, null, null, null, null);
			}
		}

		if (!noDraw) {
			this._refreshBody();

			if (band == "head") {
				this._refreshHead();
			}
			else if (band == "summ") {
				this._refreshSumm();
			}
		}

		return retn;
	};

	_pGrid._on_killfocus = function (new_focus, new_ref_focus) {
		if (!this._is_alive) {
			return;
		}

		if (this._binddataset && this._binddataset.cancolumnchange && this._binddataset.cancolumnchange._firestat) {
			this._hideEditor(true, true);
		}
		else {
			this._hideEditor(false, true);
		}

		this._focusSelectorPoint(false);

		if (nexacro._enableaccessibility) {
			this._accept_arrow = false;
			this._acceptstab = false;
		}
		this._is_async_recreate = false;
	};

	_pGrid._focusSelectorPoint = function (v) {
		if (this._isAreaSelect()) {
			if (this._select_ctrl) {
				this._select_ctrl._trackbar[0].set_visible(v);
				this._select_ctrl._trackbar[1].set_visible(v);
				this._select_ctrl._trackbar[2].set_visible(v);
				this._select_ctrl._trackbar[3].set_visible(v);
			}
		}
	};

	_pGrid._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		this._acceptstab = true;

		if (this._showEditorFocus) {
			return;
		}

		var retn = false;



		if (!self_flag) {
			this._focusSelectorPoint(true);
		}

		if (evt_name == "tabkey" || evt_name == "shifttabkey") {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

			if (this._bodyBand && (self_flag == false || nexacro._enableaccessibility)) {
				var rows = this._bodyBand._get_rows();

				if (rows.length > 0) {
					if (rows[0]._cells && rows[0]._cells.length > 0) {
						var editcell = null;
						this._showEditorFocus = true;

						if (evt_name == "shifttabkey") {
							editcell = this._getLastEditableCell();
							if (editcell.row !== null) {
								if (this._vscrollmng) {
									this._vscrollmng.setPos(this._vscrollmng.max);
								}

								retn = this._moveToPosCell(editcell.row, editcell.cell);
							}
						}
						else {
							editcell = this._getFirstEditableCell();

							if (editcell.row !== null) {
								if (this._vscrollmng) {
									this._vscrollmng.setPos(0);
								}

								retn = this._moveToPosCell(editcell.row, editcell.cell);
							}
						}
						if (nexacro._enableaccessibility && editcell.row !== null) {
							this._currentBand = "body";
							var cellobj = this._getAccessibilityCurrentCell();
							if (cellobj) {
								if (evt_name == "tabkey") {
									this._is_first_focus = true;
									this._is_first_bodycell = true;
								}
								this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
							}
						}
						this._showEditorFocus = false;
					}
				}
			}
		}
		else {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

			if (nexacro._enableaccessibility) {
				this._accept_arrow = true;
				this._acceptstab = true;
				retn = false;
				if ((nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) && evt_name === undefined) {
					this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
				}
			}
			else {
				if (self_flag == false) {
					if (evt_name == "lbuttondown" && refer_new_focus && refer_new_focus._type_name == "GridCellControl") {
						;
					}
					else if (this.autoenter == "select") {
						this._onceTime_focus = true;
						this._showEditorFocus = true;
						this._showEditor();
						this._showEditorFocus = false;
						this._onceTime_focus = false;
					}
				}
			}
		}
		if (nexacro._enableaccessibility) {
			this._is_first_focus = false;
		}
		return retn;
	};

	_pGrid.on_fire_oninput = function () {
		var cell = this._selectinfo.curcell;
		var col = this._selectinfo.curcol;
		var pivotindex = this._selectinfo.curpvt;
		var row = this._selectinfo.curdsrow;
		var subrow = this._selectinfo.cursubrow;

		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.GridInputEventInfo(this, cell, col, row, subrow, pivotindex, "oninput");
			return this.oninput._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_cantreestatuschange = function (row, realrow, reason) {
		var cell = this._selectinfo.curcell;

		if (this.cantreestatuschange && this.cantreestatuschange._has_handlers) {
			var evt = new nexacro.GridTreeStatusEventInfo(this, "cantreestatuschange", cell, realrow, row, reason);
			return this.cantreestatuschange._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_ontreestatuschanged = function (row, realrow, reason) {
		var cell = this._selectinfo.curcell;

		if (this.ontreestatuschanged && this.ontreestatuschanged._has_handlers) {
			var evt = new nexacro.GridTreeStatusEventInfo(this, "ontreestatuschanged", cell, realrow, row, reason);
			return this.ontreestatuschanged._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;
			var value = this._evtvalue(obj, postvalue);

			var evt = new nexacro.GridEditEventInfo(this, "oncloseup", cell, col, pivotindex, row, subrow, value);
			return this.oncloseup._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;
			var value = this._evtvalue(obj);

			var evt = new nexacro.GridEditEventInfo(this, "ondropdown", cell, col, pivotindex, row, subrow, value);
			return this.ondropdown._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_onenterdown = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp, postvalue) {
		if (this.onenterdown && this.onenterdown._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;
			var value = this._evtvalue(refer_comp, postvalue);

			var evt = new nexacro.GridEditEventInfo(this, "onenterdown", cell, col, pivotindex, row, subrow, value);
			return this.onenterdown._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_onexpanddown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.readonly) {
			return;
		}

		var cellobj = from_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;
		if (this.onexpanddown && this.onexpanddown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onexpanddown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onexpanddown._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_onexpandup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.readonly) {
			return;
		}

		var cellobj = from_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCellControl") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onexpandup && this.onexpandup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;
			var evt = new nexacro.GridMouseEventInfo(obj, "onexpandup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onexpandup._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_oncolresized = function (args) {
		if (this.oncolresized && this.oncolresized._has_handlers) {
			var formatindex = args[0];
			var index = args[1];
			var newvalue = args[2];
			var oldvalue = args[3];
			var subindex = args[4];
			var evt = new nexacro.GridSizeChangedEventInfo(this, "oncolresized", formatindex, index, newvalue, oldvalue, 1, subindex);
			return this.oncolresized._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_onrowresized = function (args) {
		if (this.onrowresized && this.onrowresized._has_handlers) {
			var formatindex = args[0];
			var index = args[1];
			var newvalue = args[2];
			var oldvalue = args[3];
			var subindex = args[4];
			var evt = new nexacro.GridSizeChangedEventInfo(this, "onrowresized", formatindex, index, newvalue, oldvalue, 2, subindex);
			return this.onrowresized._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid._is_recreating = false;
	_pGrid._recreate = function () {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return true;
		}

		if (!this.getElement()) {
			return false;
		}

		var down_act = this._isDownActionKeyMouse() || this._is_down_act;
		if (down_act && !this._userRowposChange && !this._is_after_recreate) {
			this._after_recreate = true;
			return;
		}

		this._is_recreating = true;
		var vpos = (this._vscrollmng) ? this._vscrollmng._pos : 0;
		var hpos = (this._hscrollmng) ? this._hscrollmng._pos : 0;

		this._destroyBands();
		this._createBandsAndAreas();
		this._refreshBody();
		this._onResetScrollBar();
		this._recreate_contents_proc = [];

		if (this._vscrollmng) {
			this._vscrollmng.setPixelPos(0);
			this._vscrollmng.setPixelPos(vpos);
		}

		if (this._hscrollmng) {
			this._hscrollmng.setPos(0);
			this._hscrollmng.setPos(hpos);
		}

		this._destroyHighlightRow();
		this._createHighlightRow();

		this._is_recreating = false;

		return true;
	};

	_pGrid.set_createcellasync = function (v) {
		if (v != null) {
			v = nexacro._toBoolean(v);
			this.createcellasync = v;

			if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
				this._async_create = v;
			}
			else {
				this._async_create = false;
			}
		}
	};

	_pGrid.set_cellcombobuttonsize = function (v) {
		if (v != this.cellcombobuttonsize) {
			this.cellcombobuttonsize = v;
			this.on_apply_cellcombobuttonsize();
		}
	};

	_pGrid.on_apply_cellcombobuttonsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcalendarbuttonsize = function (v) {
		if (v != this.cellcalendarbuttonsize) {
			this.cellcalendarbuttonsize = v;
			this.on_apply_cellcalendarbuttonsize();
		}
	};

	_pGrid.on_apply_cellcalendarbuttonsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcomboscrollbarsize = function (v) {
		if (v != this.cellcomboscrollbarsize) {
			this.cellcomboscrollbarsize = v;
			this.on_apply_cellcomboscrollbarsize();
		}
	};

	_pGrid.on_apply_cellcomboscrollbarsize = function () {
		this._refreshAll();
	};

	_pGrid.set_celltextareascrollbarsize = function (v) {
		if (v != this.celltextareascrollbarsize) {
			this.celltextareascrollbarsize = v;
			this.on_apply_celltextareascrollbarsize();
		}
	};

	_pGrid.on_apply_celltextareascrollbarsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcalendarpopuptype = function (v) {
		if (v != this.cellcalendarpopuptype) {
			this.cellcalendarpopuptype = v;
			this.on_apply_cellcalendarpopuptype();
		}
	};

	_pGrid.on_apply_cellcalendarpopuptype = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcombopopuptype = function (v) {
		if (v != this.cellcombopopuptype) {
			this.cellcombopopuptype = v;
			this.on_apply_cellcombopopuptype();
		}
	};

	_pGrid.on_apply_cellcombopopuptype = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcalendarpopupsize = function (v) {
		if (v != this.cellcalendarpopupsize) {
			this.cellcalendarpopupsize = v;
			this.on_apply_cellcalendarpopupsize();
		}
	};

	_pGrid.on_apply_cellcalendarpopupsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcombopopupsize = function (v) {
		if (v != this.cellcombopopupsize) {
			this.cellcombopopupsize = v;
			this.on_apply_cellcombopopupsize();
		}
	};

	_pGrid.on_apply_cellcombopopupsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcheckboxsize = function (v) {
		if (v != this.cellcheckboxsize) {
			this.cellcheckboxsize = v;
			this.on_apply_cellcheckboxsize();
		}
	};

	_pGrid.on_apply_cellcheckboxsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellexprupdatecondition = function (v) {
		switch (v) {
			case "all":
			case "celltext":
			case "none":
				if (v != this.cellexprupdatecondition) {
					this.cellexprupdatecondition = v;
					this.on_apply_cellexprupdatecondition();
				}
				break;
		}
	};

	_pGrid.on_apply_cellexprupdatecondition = function () {
		this._clearBindTypeFlag();
		this._refreshAll();
	};

	_pGrid._recreate_contents_all_async = function (reset_size, init_scroll, only_body, no_hide_edit) {
		nexacro._OnceCallbackTimer.callonce(this, function () {
			return this._recreate_contents_all(reset_size, init_scroll, only_body, no_hide_edit);
		});
	};

	_pGrid._isDownActionKeyMouse = function () {
		var window = this._getWindow();

		if (window && (window._cur_ldown_elem || window._keydown_element)) {
			var elem = window._cur_ldown_elem || window._keydown_element, comp = window.findComponent(elem, 0, 0)[0], isgrid = false;

			while (comp) {
				if (comp instanceof nexacro.ScrollBarControl) {
					break;
				}

				if (comp instanceof nexacro.Grid && comp == this && comp.id == this.id) {
					isgrid = true;
					break;
				}
				comp = comp.parent;
			}
			return isgrid;
		}
		return false;
	};

	_pGrid._recreate_contents_all = function (reset_size, init_scroll, only_body, no_hide_edit, chk_srow) {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}

		var down_act = this._isDownActionKeyMouse() || this._is_down_act;
		if (down_act && !this._userRowposChange && !this._is_after_recreate) {
			var args = [reset_size, init_scroll, only_body, no_hide_edit];
			if (this._after_recreate_contents_all) {
				args[0] = args[0] || this._after_recreate_contents_all[0];
				args[1] = args[1] || this._after_recreate_contents_all[1];
				args[2] = args[2] || this._after_recreate_contents_all[2];
				args[3] = args[3] && this._after_recreate_contents_all[3];
				args[2] = args[4] || this._after_recreate_contents_all[4];
			}
			this._after_recreate_contents_all = args;
			return;
		}

		var beforerowcnt = this._getDisplayRowCount();

		if (reset_size) {
			this._resetRowSizeList(chk_srow);
			this._resetColSizeList(chk_srow);
			this._resizeBand();

			if (this._bodyBand) {
				this._bodyBand._recreate_contents(init_scroll, false, no_hide_edit);
				this._bodyBand._matrix._adjustColsDisplay(true);
			}

			if (!only_body) {
				if (this._headBand) {
					this._headBand._recreate_contents();
					this._headBand._matrix._adjustColsDisplay(true);
				}

				if (this._summBand) {
					this._summBand._recreate_contents();
					this._summBand._matrix._adjustColsDisplay(true);
				}
			}
			else {
				if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
					this._refreshHead(true);
				}
				if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
					this._refreshSumm(true);
				}
			}
		}
		else {
			if (this._bodyBand) {
				this._bodyBand._recreate_contents(init_scroll, false, no_hide_edit);
			}

			if (!only_body) {
				if (this._headBand) {
					this._headBand._recreate_contents();
				}

				if (this._summBand) {
					this._summBand._recreate_contents();
				}
			}
			else {
				if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
					this._refreshHead(true);
				}
				if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
					this._refreshSumm(true);
				}
			}
		}

		var afterrowcnt = this._getDisplayRowCount();

		this._updateNodata(beforerowcnt, afterrowcnt);

		this._updateSelector();
		this._adjustOverlayElements(true, this._is_use_fakemerge);
	};

	_pGrid._updateNodata = function (beforerowcnt, afterrowcnt) {
		if ((beforerowcnt == 0 && afterrowcnt > 0) || (beforerowcnt > 0 && afterrowcnt == 0)) {
			var band = this._bodyBand;

			if (band) {
				band._updateAll(true);
			}
			else {
			}
		}
	};

	_pGrid._getRowSize = function (rowidx) {
		var format = this._curFormat;

		if (rowidx == -1) {
			if (this._rowHeadList.length > 0) {
				return this._rowHeadList[0];
			}
			else {
				return format.headHeight;
			}
		}
		else if (rowidx == -2) {
			if (this._rowSummList.length > 0) {
				return this._rowSummList[0];
			}
			else {
				return format.summHeight;
			}
		}
		else {
			var datarow = this._getDataRow(rowidx);

			if (datarow >= 0) {
				if (this._rowSizeList.length > 0) {
					return this._rowSizeList[datarow];
				}
				else {
					return format._body_height;
				}
			}
		}
		return -1;
	};

	_pGrid._getHeadHeight = function () {
		var format = this._curFormat;
		if (format == null || format._headband == null) {
			return 0;
		}

		var height = this._rowHeadList[0];

		if (height == undefined) {
			height = format.headHeight;
		}

		return height;
	};

	_pGrid._getSummHeight = function () {
		var format = this._curFormat;
		if (format == null || format._summband == null) {
			return 0;
		}

		var height = this._rowSummList[0];

		if (height == undefined) {
			height = format.summHeight;
		}

		return height;
	};

	_pGrid._createBandsAndAreas = function (grid_create) {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}

		var format = this._curFormat;
		if (format == null) {
			return;
		}

		this._applyAutofittype(false);

		var cells = this._curFormat._bodycells;
		var cellcnt = cells ? cells.length : 0;
		var cellinfo;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.suppress != 0) {
				this._is_use_suppress = true;
			}

			if (cellinfo.wordwrap != "none") {
				this._is_body_wordwrap = true;
			}

			if (this._is_use_suppress && this._is_body_wordwrap) {
				break;
			}
		}

		cells = this._curFormat._headcells;
		cellcnt = cells ? cells.length : 0;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.wordwrap != "none") {
				this._is_head_wordwrap = true;
				break;
			}
		}

		cells = this._curFormat._summcells;
		cellcnt = cells ? cells.length : 0;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.wordwrap != "none") {
				this._is_summ_wordwrap = true;
				break;
			}
		}

		var rect = this._getAvailableRect(this);
		var clientwidth = rect.width;
		var clientheight = rect.height;
		var control_elem = this.getElement();
		var top, bottom;
		var headHeight = format.headHeight;
		var summHeight = format.summHeight;

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			top = headHeight + summHeight;
			bottom = clientheight;
		}
		else {
			top = headHeight;
			bottom = clientheight - summHeight;
		}
		if (bottom < top) {
			bottom = top;
		}

		var bodyband, summband, headband;

		if (format._bodyband) {
			this._bodyBand = bodyband = new nexacro._GridBandControl("body", 0, top, clientwidth, bottom - top, null, null, this, format._bodyband);
			this.body = format._bodyband;
		}

		if (summHeight > 0) {
			rect = this._getAvailableRect(this);
			clientwidth = rect.width;
			clientheight = rect.height;

			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				top = headHeight;
				bottom = headHeight + summHeight;
			}
			else {
				bottom = clientheight;
				top = bottom - summHeight;
			}
			this._summBand = summband = new nexacro._GridBandControl("summary", 0, top, clientwidth, bottom - top, null, null, this, format._summband);
			this.summ = this.summary = format._summband;
		}
		else {
			this._summBand = null;
		}

		if (headHeight > 0) {
			rect = this._getAvailableRect(this);
			clientwidth = rect.width;
			clientheight = rect.height;
			top = 0;
			bottom = headHeight;
			this._headBand = headband = new nexacro._GridBandControl("head", 0, top, clientwidth, bottom - top, null, null, this, format._headband);
			this._headBand._is_scrollable = false;
			this.head = format._headband;
		}
		else {
			this._headBand = null;
		}

		this._resetRowSizeList();
		this._resetColSizeList();

		this._is_createbandarea = true;
		if (headband) {
			this._headBand.createComponent();
		}

		if (bodyband) {
			this._bodyBand.createComponent();
			control_elem.setVertScrollElements(this._bodyBand._control_element);
			this.on_apply_fastvscrolltype();
		}

		if (summband) {
			this._summBand.createComponent();
		}

		this._is_createbandarea = false;
		this._grid_creating = grid_create;
		this._resizeBand(false);
		this._grid_creating = false;
	};

	_pGrid._band_scroll_tops = null;
	_pGrid._setScrollMaxSize = function (scroll_width, scroll_height, band_scroll_tops) {
		if (band_scroll_tops) {
			this._band_scroll_tops = band_scroll_tops;
		}

		if (this._control_element) {
			this._control_element._setInnerElementScrollMaxTops(this._band_scroll_tops);

			if (scroll_height == undefined) {
				if (this._bodyBand) {
					scroll_height = this._bodyBand._scrollHeight;
				}
				else {
					scroll_height = 0;
				}
			}
			this._control_element.setElementScrollMaxSize(scroll_width, scroll_height);
			this._onResetScrollBar();
		}
	};

	_pGrid._resizing_band = 0;
	_pGrid._after_resizeband = false;
	_pGrid._resizeBand = function (no_autofit) {
		if (!this._grid_creating && !this._is_created) {
			this._after_resizeband = true;
			return;
		}
		if (this._is_createbandarea) {
			return;
		}

		this._after_resizeband = false;

		var clientleft = this._getClientLeft();
		var clienttop = this._getClientTop();
		var clientwidth = this._getClientWidth();
		var clientheight = this._getClientHeight();
		var headHeight = this._getHeadHeight();
		var summHeight = this._getSummHeight();
		var l, t, w, h;

		l = clientleft;
		w = clientwidth;

		this._resizing_band++;

		if (this._bodyBand) {
			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				t = headHeight + summHeight;
				h = clientheight - t;
			}
			else {
				t = headHeight;
				h = clientheight - summHeight - t;
			}
			if (h < 0) {
				h = 0;
			}

			this._bodyBand._update_size_contents = true;
			this._bodyBand.move(l, t, w, h);
			this._bodyBand._update_size_contents = false;
		}

		clientwidth = this._getClientWidth();
		clientheight = this._getClientHeight();

		if (this._summBand) {
			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				t = headHeight;
				h = headHeight + summHeight - t;
			}
			else {
				w = clientwidth;
				t = clientheight - summHeight;
				h = clientheight - t;
			}
			this._summBand._update_size_contents = true;
			this._summBand.move(l, t, w, h);
			this._summBand._update_size_contents = true;
		}

		clientwidth = this._getClientWidth();
		clientheight = this._getClientHeight();

		if (this._headBand) {
			w = clientwidth;
			t = clienttop;
			h = headHeight;
			this._headBand._update_size_contents = true;
			this._headBand.move(l, t, w, h);
			this._headBand._update_size_contents = true;
		}

		if (!no_autofit && (this._colautofit || this._rowautofit)) {
			this._applyAutofittype(true);
		}

		this._updateSelector();
		this._updateScrollInfo();
		this._resizing_band--;
		this._resetScrollMax();
	};

	_pGrid._onResetScrollBar = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var new_hbar = false;
			var new_vbar = false;

			var hscrollbar_size = this._getHScrollBarSize();
			var vscrollbar_size = this._getVScrollBarSize();

			var bcreatevscroll = false;
			var bcreatehscroll = false;

			var hscrollbartype = this._getHScrollBarType();
			var vscrollbartype = this._getVScrollBarType();

			var scrolltype = this.scrolltype;

			if (hscrollbartype != "none") {
				bcreatehscroll = true;
			}

			if (vscrollbartype != "none") {
				bcreatevscroll = true;
			}

			if (this._is_form && this.getStepCount() > 0) {
				bcreatehscroll = false;
			}

			var client_left = control_elem.client_left;
			var client_top = control_elem.client_top;
			var client_width = control_elem.client_width;
			var client_height = control_elem.client_height;
			var zoomfactor = control_elem.zoom / 100;

			var v_elements = control_elem._target_vscroll_elements, v_element = v_elements, h_elements = control_elem._target_hscroll_elements, h_element = h_elements;
			if (nexacro._isArray(v_elements)) {
				v_element = v_elements[0];
			}
			if (nexacro._isArray(h_elements)) {
				h_element = h_elements[0];
			}

			var v_client_height = (v_element) ? v_element._calculateClientHeight(0) : client_height;
			var h_client_width = (h_element) ? h_element._calculateClientWidth(client_width) : client_width;
			var scroll_left = (h_element) ? h_element.scroll_left : 0;
			var scroll_top = (v_element) ? v_element._getScrollTop() : 0;

			var zclient_width = h_client_width / zoomfactor;
			var zclient_height = v_client_height / zoomfactor;

			var paddingleft = paddingtop = paddingright = paddingbottom = 0;
			var padding = control_elem.padding ? control_elem.padding : control_elem._padding_info;

			if (control_elem._apply_client_padding && padding) {
				paddingleft = padding.left;
				paddingtop = padding.top;
				paddingright = padding.right;
				paddingbottom = padding.bottom;
			}

			var hscroll_left = client_left - paddingleft;
			var hscroll_top = client_height + paddingtop + paddingbottom;
			var hscroll_width = client_width + paddingleft + paddingright;

			var vscroll_left = client_width + paddingleft + paddingright;
			var vscroll_top = client_top - paddingtop;
			var vscroll_height = client_height + paddingtop + paddingbottom;

			if (bcreatehscroll) {
				this._createHScrollBar(hscrollbar_size);

				if (hscrollbar_size > 0) {
					if (control_elem.hscroll_limit <= 0 && hscrollbartype != "fixed") {
						hscrollbar_size = 0;
					}

					if (hscrollbartype == "autoindicator") {
						hscroll_top -= hscrollbar_size;
						this.hscrollbar.set_visible(false);
					}
					else {
						this.hscrollbar.set_visible(true);
					}
				}

				if (hscrollbar_size > 0 && (scrolltype != "none" && scrolltype != "vertical") && control_elem.hscroll_limit > 0) {
					this.hscrollbar.set_enable(true);
				}
				else {
					this.hscrollbar.set_enable(false);
				}
			}
			else {
				if (this.hscrollbar) {
					this.hscrollbar.destroy();
					this.hscrollbar = null;
				}
			}

			if (bcreatevscroll) {
				this._createVScrollBar(vscrollbar_size);

				if (vscrollbar_size > 0) {
					if (control_elem.vscroll_limit <= 0 && vscrollbartype != "fixed") {
						vscrollbar_size = 0;
					}

					if (vscrollbartype == "autoindicator") {
						vscroll_left -= vscrollbar_size;
						this.vscrollbar.set_visible(false);
					}
					else {
						this.vscrollbar.set_visible(true);
					}

					if (vscrollbar_size > 0 && (scrolltype != "none" && scrolltype != "horizontal") && control_elem.vscroll_limit > 0) {
						this.vscrollbar.set_enable(true);
					}
					else {
						this.vscrollbar.set_enable(false);
					}
				}
			}
			else {
				if (this.vscrollbar) {
					this.vscrollbar.destroy();
					this.vscrollbar = null;
				}
			}

			this._hscrollmng._setInfo(hscroll_left, hscroll_top, hscroll_width, hscrollbar_size, 0, control_elem.hscroll_limit, this._scroll_default_value, zclient_width, zclient_width, scroll_left);
			this._vscrollmng._setInfo(vscroll_left, vscroll_top, vscrollbar_size, vscroll_height, 0, control_elem.vscroll_limit, this._scroll_default_value, zclient_height, zclient_height, scroll_top);

			if (this.hscrollbar) {
				this.hscrollbar._setScrollInfo(hscroll_left, hscroll_top, hscroll_width, hscrollbar_size, 0, control_elem.hscroll_limit, this._scroll_default_value, zclient_width, zclient_width, true, scroll_left);

				if (!this.hscrollbar._is_created) {
					this.hscrollbar.on_created(this._getWindow());
				}
			}

			if (this.vscrollbar) {
				this.vscrollbar._setScrollInfo(vscroll_left, vscroll_top, vscrollbar_size, vscroll_height, 0, control_elem.vscroll_limit, this._scroll_default_value, zclient_height, zclient_height, true, scroll_top);
				if (!this.vscrollbar._is_created) {
					this.vscrollbar.on_created(this._getWindow());
				}
			}
		}
	};

	_pGrid._setHscrollElement = function () {
		if (!this._control_element) {
			return;
		}

		var horz_control_elems = [];

		if (this._bodyBand) {
			var rows = this._bodyBand._get_rows();

			for (var i = 0, n = rows.length; i < n; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}
		if (this._headBand) {
			var rows = this._headBand._matrix._rows;

			for (var i = 0, n = rows.length; i < n; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}
		if (this._summBand) {
			var rows = this._summBand._matrix._rows;

			for (var i = 0, n = rows.length; i < n; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}

		if (horz_control_elems.length == 0) {
			horz_control_elems = null;
		}

		this._control_element.setHorzScrollElements(horz_control_elems);
	};

	if (nexacro._Browser == "IE") {
		_pGrid._div_max_height = 1533000;
	}
	else if (nexacro._Browser == "Gecko") {
		_pGrid._div_max_height = 17895000;
	}
	else {
		_pGrid._div_max_height = 134217000;
	}

	_pGrid._resetScrollMax = function (body) {
		if (this._resizing_band > 0) {
			return;
		}

		if (!body) {
			body = this._bodyBand;
		}

		if (!body) {
			return;
		}

		var format = this._curFormat;
		var rowcnt = this._getGridRowCount();
		var scrollwidth = format.bodyWidth;
		var rowSizes = this._rowSizeList;
		var datarow;
		var band_scroll_tops = [];
		var band_sizes_cnt = 1;
		var band_scroll_max = this._div_max_height;
		var scrollheight = 0;

		for (var i = 0; i < rowcnt; i++) {
			datarow = this._getDataRow(i);
			scrollheight += rowSizes[datarow];

			if (scrollheight - this._fixedrow_height >= band_scroll_max * band_sizes_cnt) {
				band_scroll_tops.push(scrollheight - rowSizes[datarow]);
				band_sizes_cnt++;
			}
		}

		scrollheight -= this._fixedrow_height;
		band_scroll_tops.push(scrollheight);

		body._scrollHeight = scrollheight;
		body._scrollWidth = scrollwidth;

		if (body) {
			var flag = this._no_update_bandrect;
			this._no_update_bandrect = true;
			this._setScrollMaxSize(body._scrollWidth, body._scrollHeight, band_scroll_tops);
			this._no_update_bandrect = flag;
		}
		else {
			this._setScrollMaxSize(body._scrollWidth, body._scrollHeight, band_scroll_tops);
		}
	};

	_pGrid._setContents = function (str) {
		var contentsElem = nexacro._parseXMLDocument(str);
		var formatElems = contentsElem.getElementsByTagName("Format");
		var len = formatElems ? formatElems.length : 0;
		var firstformat = "";

		this._format_str = [];
		this._autofitcol_rate = [];

		for (var i = 0; i < len; i++) {
			var formatElem = formatElems[i];
			var idstr = formatElem.getAttribute("id");
			if (idstr == null || idstr == "") {
				idstr = "default";
			}

			if (firstformat == "" || idstr == "default") {
				firstformat = idstr;
			}

			var format = new nexacro.GridFormat(idstr, this);
			format._loadFromDOM(formatElem);
			this._formats[idstr] = format;
			this._format_str.push(idstr);
		}
		this.formats = str;

		if (this.formatid == "") {
			this.formatid = firstformat;
		}

		this._curFormat = this._formats[this.formatid];
	};

	_pGrid._destroyBands = function (parent_destroy) {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}

		if (!parent_destroy) {
			this._hideEditor(true);
		}

		if (this._bodyBand) {
			if (this._control_element) {
				this._control_element.setVertScrollElements(null);
			}

			this._bodyBand.destroy();
			this._bodyBand = null;
			this.body = null;
		}
		if (this._summBand) {
			this._summBand.destroy();
			this._summBand = null;
			this.summary = null;
			this.summ = null;
		}
		if (this._headBand) {
			this._headBand.destroy();
			this._headBand = null;
			this.head = null;
		}
		if (this._select_ctrl) {
			this._select_ctrl.destroy();
			this._select_ctrl = null;
		}
		if (this.controlbutton) {
			this.controlbutton = null;
		}
		if (this.controlcalendar) {
			this.controlcalendar = null;
		}
		if (this.controlcheckbox) {
			this.controlcheckbox = null;
		}
		if (this.controlcombo) {
			this.controlcombo = null;
		}
		if (this.controledit) {
			this.controledit = null;
		}
		if (this.controlmaskedit) {
			this.controlmaskedit = null;
		}
		if (this.controltextarea) {
			this.controltextarea = null;
		}
		if (this.controlprogressbar) {
			this.controlprogressbar = null;
		}
		if (this.controlexpand) {
			this.controlexpand = null;
		}
		this.on_apply_nodatatext();
		this._destroyOverlayElements();
	};

	_pGrid._refreshAll = function (clearCurstyle) {
		this._refreshHead(clearCurstyle);
		this._refreshSumm(clearCurstyle);
		this._refreshBody(clearCurstyle);
	};

	_pGrid._getBodyCellInfo = function (nCellIdx) {
		if (this._curFormat && this._curFormat._bodycells) {
			var cellinfo = this._curFormat._bodycells[nCellIdx];
			if (cellinfo) {
				return cellinfo;
			}
		}

		return null;
	};

	_pGrid._getBodyCellItem = function (nRowIdx, nCellIdx) {
		return (this._bodyBand._get_rows()[nRowIdx]._cells[nCellIdx]);
	};

	_pGrid._refreshBodyCell = function (cell, displayrow, styleprop, subcellidx) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_body = true;
			return;
		}

		if (displayrow < 0) {
			return;
		}

		var band = this._bodyBand;
		if (band) {
			var rows = band._get_rows();

			if (rows.length <= displayrow) {
				return;
			}

			var rowidx = rows[displayrow]._rowidx;
			var dsrowidx = (this._hasTree) ? this._treeIndexes[rowidx] : rowidx;
			var selected = this._isSelectedCell(cell, dsrowidx);

			if (rows[displayrow]) {
				var cellobj = rows[displayrow]._cells[cell];
				var datarow = cellobj._getDataRow();

				if (subcellidx >= 0) {
					var subcellinfo = cellobj._refinfo._subcells[subcellidx];
					if (styleprop && subcellinfo && cellobj.subcells[subcellidx]["set_" + styleprop]) {
						cellobj.subcells[subcellidx]["set_" + styleprop](subcellinfo._getAttrValue(subcellinfo[styleprop], datarow));
					}
				}
				else {
					var cellinfo = cellobj._refinfo;
					if (styleprop && cellobj["set_" + styleprop]) {
						cellobj["set_" + styleprop](cellinfo._getAttrValue(cellinfo[styleprop], datarow));
					}
				}

				band._refreshRowCell(displayrow, cell, selected);
			}
		}
	};

	_pGrid._refreshHead = function (clearCurstyle) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_head = true;
			return;
		}

		var band = this._headBand;
		if (band) {
			var rowcnt = band._get_rows().length;

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i);
			}
		}
		this._applyResizer();
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._refreshSumm = function (clearCurstyle) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_summ = true;
			return;
		}

		var band = this._summBand;
		if (band) {
			var rowcnt = band._get_rows().length;

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i);
			}
			band._updateAll(clearCurstyle);
		}
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._refreshBody = function (clearCurstyle, for_select, no_overlay, no_update_supp) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_body = true;
			return;
		}

		var band = this._bodyBand;
		if (band) {
			if (!no_update_supp) {
				this._suppressUpdate();
			}

			var rowcnt = this._getDispRowCnt();
			var rows = band._get_rows();
			var cellcnt;

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i, undefined, for_select);
			}

			if (!no_overlay) {
				this._adjustOverlayElements(this._is_recreating, this._is_use_fakemerge);
			}
		}
	};

	_pGrid._analyzeSuppress = function (exportFlag) {
		var cells = this._curFormat._bodycells;

		if (!cells) {
			return;
		}

		var total_dispcnt;

		if (exportFlag) {
			total_dispcnt = this._getGridRowCount();
		}
		else {
			if (this._fixed_rowcnt > 0) {
				total_dispcnt = this._fixed_rowcnt - this._fixed_startrow + this._disprowcnt;
			}
			else {
				total_dispcnt = this._disprowcnt;
			}
		}

		if (total_dispcnt == 0) {
			return;
		}

		var cellcnt = cells.length;
		var cellinfo;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];

			if (cellinfo.suppress == 0) {
				continue;
			}

			cellinfo._clearSuppressInfo();

			var rowidx, text1, text2, lvl1, lvl2, displayType, psuppinfo, pdatarow, cdatarow, csupp;

			for (var i = 0; i <= total_dispcnt; i++) {
				rowidx = (!exportFlag) ? this.__getBodyCellRowIdxFromIdx(i) : i;
				cdatarow = this._getDataRow(rowidx);
				csupp = cellinfo._getSuppress(cdatarow);

				if (i > 0) {
					psuppinfo = cellinfo._getSuppressInfo(i - 1, true);
				}

				if (csupp > 0 && i > 0) {
					if (total_dispcnt == i) {
						break;
					}

					lvl1 = 0;
					lvl2 = 0;

					pdatarow = this._getDataRow((!exportFlag) ? this.__getBodyCellRowIdxFromIdx(i - 1) : i - 1);
					cdatarow = this._getDataRow(rowidx);

					if (this._isFakeCell(cdatarow)) {
						continue;
					}

					if (this._hasTree) {
						text1 = cellinfo._getDisplayText(pdatarow);
						lvl1 = cellinfo._getTreeLevel(pdatarow);
						text2 = cellinfo._getDisplayText(cdatarow);
						lvl2 = cellinfo._getTreeLevel(cdatarow);
					}
					else {
						text1 = cellinfo._getDisplayText(pdatarow);
						text2 = cellinfo._getDisplayText(cdatarow);
					}

					displayType = cellinfo._getDisplaytype(rowidx);
					if (this._hasTree && displayType == "treeitemcontrol") {
						;
					}
					else {
						if (text1 == text2) {
							psuppinfo.last = false;
						}
						else {
							psuppinfo.last = true;
						}
					}
				}
				else if (csupp < 0 && j > 0) {
				}
			}
		}

		var suppresslevel = this.suppresslevel;
		if (suppresslevel == "sameskip" || suppresslevel == "allcompare") {
			var i = 0;
			function __analyzeSuppress_row_loop2 (grid) {
				if (i < total_dispcnt) {
					var suppressRow = [];
					var suppressCol = [];
					var cellinfo;

					rowidx = (!exportFlag) ? grid.__getBodyCellRowIdxFromIdx(i) : i;
					cdatarow = grid._getDataRow(rowidx);

					for (var j = 0; j < cellcnt; j++) {
						cellinfo = cells[j];
						csupp = cellinfo._getSuppress(cdatarow);

						if (csupp > 0) {
							suppressRow.push(cellinfo);
						}
						if (csupp < 0) {
						}
					}

					if (suppressRow.length > 0) {
						suppressRow.sort(function (a, b) {
							return a._getSuppress(cdatarow) - b._getSuppress(cdatarow);
						});

						var suppressRowLen = suppressRow.length;

						for (var jj = 0; jj < suppressRowLen; jj++) {
							cellinfo = suppressRow[jj];

							if (cellinfo) {
								for (var k = 0; k < cellcnt; k++) {
									if (k == cellinfo._col) {
										continue;
									}
									grid._compareSuppressCol(i, k, cellinfo._col, suppresslevel, cdatarow);
								}
							}
						}
					}

					if (suppressCol.length > 0) {
						suppressCol.sort(function (a, b) {
							return b._getSuppress(cdatarow) - a._getSuppress(cdatarow);
						});

						var suppressColLen = suppressCol.length;

						for (var jj = 0; jj < suppressColLen; jj++) {
							cellinfo = suppressCol[jj];

							if (cellinfo) {
								for (var k = 0; k < cellcnt; k++) {
									if (k == cellinfo._col) {
										continue;
									}
								}
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			for (; true; ) {
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
			}
		}

		if (total_dispcnt > 0) {
			var count = 0;
			var start;
			var csuppinfo, csuppinfo2, csupp, rowidx, cdatarow;

			for (var j = 0; j < cellcnt; j++) {
				start = 0;

				var cellinfo, center;

				for (var i = 0; i < total_dispcnt; i++) {
					cellinfo = cells[j];

					if (cellinfo.suppress == 0) {
						continue;
					}

					rowidx = (!exportFlag) ? this.__getBodyCellRowIdxFromIdx(i) : i;

					cdatarow = this._getDataRow(rowidx);

					if (cellinfo.suppressalign.indexOf("middle") < 0) {
						break;
					}

					csuppinfo = cellinfo._getSuppressInfo(i);
					csuppinfo.middle = false;

					csupp = cellinfo._getSuppress(cdatarow);

					if (csupp > 0) {
						count++;
						if (csuppinfo.last == true) {
							if (count == 1) {
								csuppinfo.middle = true;
							}
							else {
								center = Math.round(count / 2);
								csuppinfo2 = cellinfo._getSuppressInfo(start + center - 1);
								csuppinfo2.middle = true;
							}
							start = i + 1;
							count = 0;
						}
					}
					if (csupp < 0) {
						;
					}
				}
			}
		}
	};

	_pGrid._compareSuppressCol = function (row, col, curcol, supplvl, cdatarow) {
		var band = this._bodyBand;
		var cells = this._curFormat._bodycells;

		var pinfo = cells[col];
		var cinfo = cells[curcol];
		var psuppinfo, csuppinfo;
		var csupp = cinfo._getSuppress(cdatarow);
		var psupp = pinfo._getSuppress(cdatarow);

		if (csupp <= 0 || psupp <= 0) {
			return false;
		}

		if (psupp < csupp) {
			psuppinfo = pinfo._getSuppressInfo(row);
			csuppinfo = cinfo._getSuppressInfo(row);

			if (psuppinfo.last == true) {
				csuppinfo.last = true;
			}
			return true;
		}
		else if (supplvl == "allcompare" && psupp == csupp) {
			psuppinfo = pinfo._getSuppressInfo(row);
			csuppinfo = cinfo._getSuppressInfo(row);

			if (psuppinfo.last == true) {
				csuppinfo.last = true;
			}
			if (csuppinfo.last == true) {
				psuppinfo.last = true;
			}
			return true;
		}
		return false;
	};

	_pGrid.__getBodyCellRowIdxFromIdx = function (idx) {
		var toprowpos;
		if (this._fixed_rowcnt) {
			if (idx + this._fixed_startrow <= this._fixed_endrow) {
				toprowpos = this._fixed_startrow;
			}
			else {
				idx -= this._fixed_rowcnt - this._fixed_startrow;
				toprowpos = this._toprowpos[0];
			}
		}
		else {
			toprowpos = this._toprowpos[0];
		}
		return idx + toprowpos;
	};

	_pGrid._suppressUpdate = function () {
		if (!this._is_use_suppress || !this._curFormat || !this._curFormat._bodycells) {
			return;
		}

		this._analyzeSuppress();

		var total_dispcnt = this._fixed_rowcnt + this._disprowcnt;
		for (var i = 0; i <= total_dispcnt; i++) {
			this._suppressUpdateRow(i, 0, total_dispcnt - 1);
		}
	};

	_pGrid._suppressUpdateRow = function (row, start_rowpos, end_rowpos, exportFlag) {
		var band = this._bodyBand;

		if (band == null) {
			return;
		}

		var cells = this._curFormat._bodycells;
		var cellcnt = cells.length;
		var rowidx = (!exportFlag) ? this.__getBodyCellRowIdxFromIdx(row) : row;
		var cellinfo, prevcellitem, prelast, curlast;
		var psuppinfo, csuppinfo, csupp;
		var cdatarow = this._getDataRow(rowidx);

		for (var col = 0; col < cellcnt; col++) {
			cellinfo = cells[col];
			csuppinfo = cellinfo._getSuppressInfo(row);
			csupp = cellinfo._getSuppress(cdatarow);

			if (!csuppinfo) {
				continue;
			}

			if (csupp > 0) {
				if (csupp > 0 && (row - start_rowpos) > 0) {
					psuppinfo = cellinfo._getSuppressInfo(row - 1);
				}
				else if (cellinfo.csupp < 0 && col > 0) {
					var prevcellinfo = cells[col - 1];
					psuppinfo = prevcellinfo._getSuppressInfo(row);
				}

				prelast = (psuppinfo ? psuppinfo.last : true);
				curlast = (row == end_rowpos ? true : csuppinfo.last);

				if (cellinfo.suppressalign.indexOf("first") >= 0) {
					if (prelast == false) {
						csuppinfo.text_proc = csupp;
					}
					else {
						csuppinfo.text_proc = 0;
					}
				}
				else if (cellinfo.suppressalign.indexOf("last") >= 0) {
					if (curlast == false) {
						csuppinfo.text_proc = csupp;
					}
					else {
						csuppinfo.text_proc = 0;
					}
				}
				else if (cellinfo.suppressalign.indexOf("middle") >= 0) {
					if (csuppinfo.middle == true) {
						csuppinfo.text_proc = 0;
					}
					else {
						csuppinfo.text_proc = csupp;
					}
				}

				if (psuppinfo) {
					if (prelast == false) {
						psuppinfo.border_proc = csupp;
					}
					else {
						psuppinfo.border_proc = 0;
					}
				}
			}
			else if (csupp == undefined) {
				if (cellinfo.suppressalign.indexOf("first") >= 0 || cellinfo.suppressalign.indexOf("middle") >= 0) {
					csuppinfo.text_proc = 1;
				}
			}
		}
	};

	_pGrid._refreshBodyRow = function (displayrow, status, removecell) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_body = true;
			return;
		}

		var band = this._bodyBand;
		if (band) {
			var rows = band._get_rows();
			if (rows.length <= displayrow) {
				return;
			}

			var rowcnt = this._getDispRowCnt();
			if (displayrow >= 0 && displayrow < rowcnt) {
				var rowidx = rows[displayrow]._rowidx;
				var dsrowidx = (this._hasTree) ? this._treeIndexes[rowidx] : rowidx;

				if (dsrowidx == undefined) {
					return;
				}

				band._refreshRow(displayrow, status, false, removecell);
			}
			this._adjustOverlayElements(false, this._is_use_fakemerge);
		}
	};

	_pGrid._global_cursor = undefined;
	_pGrid._setGlobalCursor = function (cursor, obj) {
		if (this._global_cursor !== cursor) {
			this._global_cursor = cursor;

			while (obj) {
				obj._updateCursor(cursor);

				if (obj instanceof nexacro.Grid) {
					return;
				}

				obj = obj.parent;
			}
		}
	};

	_pGrid._getColMergeInfo = function (band, col_idx) {
		var cells;

		if (band == "head") {
			cells = this._curFormat._headcells;
		}
		else if (band == "summ" || band == "summary") {
			cells = this._curFormat._summcells;
		}
		else {
			cells = this._curFormat._bodycells;
		}

		if (!cells) {
			return null;
		}

		var cellsLen = cells.length;
		var cell;
		var col = col_idx;
		var colspan = 1;
		var retn = [];

		for (var i = 0; i < cellsLen; i++) {
			cell = cells[i];
			if (cell._col <= col_idx && (cell._col + cell._colspan) > col_idx) {
				if (colspan < cell._colspan) {
					colspan = cell._colspan;
					col = cell._col;
				}
			}
		}
		retn[0] = col;
		retn[1] = colspan;

		return retn;
	};

	_pGrid._applySelect = function (arrS, arrE, pos) {
		var each = false;

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			each = true;
		}

		if (arrS.length == 0 || (each && pos < 0)) {
			arrS.splice(0, 0, pos);
			arrE.splice(0, 0, pos);
		}
		else {
			var nobodys, nobodye;
			var mincnt = 0;

			if (each) {
				for (var i = 0; i < arrS.length; i++) {
					if (arrS[i] >= 0) {
						break;
					}

					mincnt++;
				}

				nobodys = arrS.splice(0, mincnt);
				nobodye = arrE.splice(0, mincnt);
			}

			var cnt = arrS.length;

			if (cnt == 0) {
				arrS.splice(0, 0, pos);
				arrE.splice(0, 0, pos);
			}
			else if (cnt == 1 || arrS[0] > pos) {
				this._addSelect(arrS, arrE, 0, pos);
			}
			else if (arrE[cnt - 1] < pos) {
				this._addSelect(arrS, arrE, cnt - 1, pos);
			}
			else {
				for (var i = 0; i < cnt; i++) {
					if (arrE[i] < pos && arrS[i + 1] > pos) {
						if ((arrE[i] + 1) == pos && (arrS[i + 1] - 1) > pos) {
							this._addSelect(arrS, arrE, i, pos);
						}
						else if ((arrE[i] + 1) < pos && (arrS[i + 1] - 1) == pos) {
							this._addSelect(arrS, arrE, i + 1, pos);
						}
						else if ((arrE[i] + 1) == pos && (arrS[i + 1] - 1) == pos) {
							this._addSelect(arrS, arrE, i, pos);
							arrE[i] = arrE[i + 1];
							arrS.splice(i + 1, 1);
							arrE.splice(i + 1, 1);
						}
						else if ((arrE[i] + 1) < pos && (arrS[i + 1] - 1) > pos) {
							arrS.push(pos);
							arrE.push(pos);
							arrS.sort();
							arrE.sort();
						}
						break;
					}
				}
			}

			if (each) {
				for (var i = 0; i < nobodys.length; i++) {
					arrS.splice(0, 0, nobodys[i]);
					arrE.splice(0, 0, nobodye[i]);
				}
			}
		}
	};

	_pGrid._addSelect = function (arrS, arrE, idx, pos) {
		if (arrE[idx] < pos) {
			if ((arrE[idx] + 1) == pos) {
				arrE[idx] = pos;
			}
			else {
				arrS.push(pos);
				arrE.push(pos);
			}
		}
		else if (arrS[idx] > pos) {
			if ((arrS[idx] - 1) == pos) {
				arrS[idx] = pos;
			}
			else {
				arrS.push(pos);
				arrE.push(pos);
				arrS.sort();
				arrE.sort();
			}
		}
	};

	_pGrid._findCellObj = function (fromComp) {
		var cellobj = fromComp;
		while (cellobj && cellobj._type_name != "GridCellControl") {
			if (cellobj instanceof nexacro.Grid) {
				if (cellobj == this) {
					break;
				}
				else {
					cellobj = fromComp;
					break;
				}
			}

			if (cellobj._cellobj && cellobj._cellobj._is_alive && cellobj._cellobj._type_name == "GridCellControl") {
				cellobj = cellobj._cellobj;
				break;
			}
			cellobj = cellobj.parent;
		}
		return cellobj;
	};

	_pGrid._findBandObj = function (fromComp) {
		var bandobj = fromComp;
		while (bandobj && bandobj._type_name != "GridBandControl") {
			if (bandobj == this) {
				break;
			}

			bandobj = bandobj.parent;
		}
		return bandobj;
	};

	_pGrid._getHScrollPos = function () {
		if (this.scrolltype == "none") {
			return 0;
		}

		return this._hscrollmng.pos;
	};

	_pGrid._isFakeCell = function (rowidx) {
		if (this._rowcount <= rowidx || rowidx < -2) {
			return true;
		}

		return false;
	};

	_pGrid._moveToPosCell = function (rowidx, cellidx) {
		var newPos = rowidx;
		var retn = true;

		if (newPos == undefined) {
			newPos = 0;
		}

		if (this._isFakeCell(newPos)) {
			return false;
		}

		var cellinfo = this._getBodyCellInfo(cellidx);
		if (!cellinfo) {
			return false;
		}

		var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
		var beforePvt = this._beforepvt = this._selectinfo.curpvt;

		var afterCell = cellidx;
		var afterCol = cellinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellinfo._row;
		var afterPvt = -9;

		this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

		while (true) {
			if (afterCell != beforeCell) {
				break;
			}
			if (afterCol != beforeCol) {
				break;
			}
			if (afterRow != beforeRow) {
				break;
			}
			if (afterSubrow != beforeSubrow) {
				break;
			}
			if (afterPvt != beforePvt) {
				break;
			}

			retn = false;
			break;
		}

		if (retn) {
			retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
		}

		if (retn && this._isSelectRowType()) {
			var disprow = this._dsRowToDispRow(afterRow);
			this._jumpCurrentRow(disprow);

			var cellobj = this._getCurrentBodyCell(afterRow, afterCell);
			if (cellobj) {
				cellobj._showfull();
			}
		}

		this._moveCellAfterFocus();

		return retn;
	};

	_pGrid._getColFixCnt = function (area) {
		if (this._curFormat) {
			return this._curFormat._getColFixCnt(area);
		}
		return -1;
	};

	_pGrid._getGridBand = function (nCell) {
		if (!this._curFormat || !this._curFormat._bodycells) {
			return -1;
		}

		var cell = this._curFormat._bodycells[nCell];
		if (cell) {
			if (this._bPivotGrid) {
				var leftcnt = this._getColFixCnt("left");
				var rightcnt = this._getColFixCnt("right");

				if (cell._col < leftcnt) {
					return -1;
				}
				else if (cell._col >= (this._curFormat._bodycells.length - right)) {
					return -2;
				}
				else {
					return 0;
				}
			}
			else {
				return 0;
			}
		}
		return -9;
	};

	_pGrid._clrMultiSelect = function () {
		this._selectinfo.rows = [];
		this._selectinfo.selects = [];

		this._selectstartrow = [];
		this._selectstartcol = [];
		this._selectstartsubrow = [];
		this._selectstartpvt = [];

		this._selectendrow = [];
		this._selectendcol = [];
		this._selectendsubrow = [];
		this._selectendpvt = [];

		this._defaultSelect();
	};

	_pGrid._isIncludeSelectpos = function (cell, row) {
		var selects = this._selectinfo.getSelectCells(row);

		if (selects && selects[cell]) {
			return true;
		}

		return false;
	};

	_pGrid._addSelectpos = function (cell, row, no_sort) {
		var select = this._selectinfo.selects;
		var rows = this._selectinfo.rows;

		if (!select[row + 2]) {
			select[row + 2] = [];
		}

		select[row + 2][cell] = true;

		for (var i = 0, n = rows.length; i < n; i++) {
			if (rows[i] == row) {
				return;
			}
		}
		rows.push(row);

		if (!no_sort) {
			rows.sort(function (a, b) {
				return a - b;
			});
		}
	};

	_pGrid._delSelectpos = function (cell, row, adjust) {
		var select = this._selectinfo.selects;
		var rows = this._selectinfo.rows;

		if (cell < 0) {
			if (nexacro._isArray(row)) {
				var rowLen = row.length;
				for (var i = rowLen - 1; i >= 0; i--) {
					if (adjust) {
						if (select.length > row[i] + 2) {
							select.splice(row[i] + 2, 1);
						}
					}
					else {
						select[row[i] + 2] = undefined;
					}

					for (var j = 0; j < rows.length; j++) {
						if (rows[j] == row[i]) {
							rows.splice(j, 1);
							break;
						}
					}
				}
			}
			else {
				if (adjust) {
					if (select.length > row + 2) {
						select.splice(row + 2, 1);
					}
				}
				else {
					select[row + 2] = undefined;
				}

				for (var j = 0; j < rows.length; j++) {
					if (rows[j] == row) {
						rows.splice(j, 1);
						break;
					}
				}
			}
		}
		else {
			if (nexacro._isArray(row)) {
				var rowLen = row.length;
				var cells, exist;

				for (var i = rowLen - 1; i >= 0; i--) {
					cells = select[row[i] + 2];

					if (cells) {
						cells[cell] = false;
					}

					exist = false;
					for (var j = 0, n = cells.length; j < n; j++) {
						if (cells[j]) {
							exist = true;
							break;
						}
					}

					if (!exist) {
						select[row + 2] = undefined;

						for (var j = 0; j < rows.length; j++) {
							if (rows[j] == row[i]) {
								rows.splice(j, 1);
								break;
							}
						}
					}
				}
			}
			else {
				var cells = select[row + 2];

				if (cells) {
					cells[cell] = false;
				}

				var exist = false;
				for (var j = 0, n = cells.length; j < n; j++) {
					if (cells[j]) {
						exist = true;
						break;
					}
				}

				if (!exist) {
					select[row + 2] = undefined;

					for (var j = 0; j < rows.length; j++) {
						if (rows[j] == row) {
							rows.splice(j, 1);
							break;
						}
					}
				}
			}
		}
	};

	_pGrid._resetSelectStartEndRow = function () {
		var select = this._selectinfo.selects;
		this._selectstartrow = [];
		this._selectendrow = [];

		for (var i = 0, n = select.length; i < n; i++) {
			if (select[i]) {
				this._applySelect(this._selectstartrow, this._selectendrow, i - 2);
			}
		}

		this.selectstartrow = this._selectstartrow;
		this.selectendrow = this._selectendrow;

		if (!this.selectstartrow.length) {
			this.selectstartrow = -9;
		}
		if (!this.selectendrow.length) {
			this.selectendrow = -9;
		}
	};

	_pGrid._isMultiSelected = function () {
		if (!this._curFormat || !this._curFormat._bodycells) {
			return false;
		}

		if (this._isSelectRowType()) {
			if (this._selectinfo.rows.length > 1) {
				return true;
			}
		}
		else {
			if (this._selectinfo.rows.length > 1) {
				return true;
			}
			else if (this._selectinfo.rows.length == 1) {
				var cells = this._selectinfo.selects[this._selectinfo.rows[0] + 2];
				var cnt = 0;

				for (var i = 0, n = cells.length; i < n; i++) {
					if (cells[i]) {
						cnt++;
					}
					if (cnt > 1) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid._initSelect = function (row, cell, col, subrow, pvt) {
		cell = (cell !== undefined) ? cell : 0;
		col = (col !== undefined) ? col : 0;
		row = (row !== undefined) ? row : 0;
		subrow = (subrow !== undefined) ? subrow : 0;
		pvt = (pvt !== undefined) ? pvt : -9;

		this._resetSelect(row, cell, col, subrow, pvt);
	};

	_pGrid._resetSelect = function (row, cell, col, subrow, pvt) {
		var bcell = this._selectinfo.curcell;
		var bcol = this._selectinfo.curcol;
		var brow = this._selectinfo.curdsrow;
		var bsubrow = this._selectinfo.cursubrow;
		var bpvt = this._selectinfo.curpvt;

		cell = (cell !== undefined) ? cell : this._selectinfo.curcell;
		col = (col !== undefined) ? col : this._selectinfo.curcol;
		row = (row !== undefined) ? row : this._selectinfo.curdsrow;
		subrow = (subrow !== undefined) ? subrow : this._selectinfo.cursubrow;
		pvt = (pvt !== undefined) ? pvt : this._selectinfo.curpvt;

		if (this.getElement()) {
			if (row >= 0 && cell < 0) {
				if (this._isSelectRowType()) {
					cell = 0;
				}
				else {
					cell = col = subrow = 0;
				}
			}

			this._clrMultiSelect();
			this._multiselect = "none";
			this._setSelectedInfo(cell, col, row, subrow, pvt);
			this._ChangeSelect(cell, col, row, subrow, pvt, true, bcell, bcol, brow, bsubrow, bpvt, "body");
			this._refreshHead(true);
			this._refreshSumm(true);
		}
	};

	_pGrid._ChangeSelect = function (cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, bandstr, evt_kind) {
		bDataset = bDataset || false;
		var selectmode = this._multiselect;

		var format = this._curFormat;

		if (!format || ((evt_kind == "lbuttondown" || evt_kind == "keydown") && this._setdataobj && this._setdataobj.succ == false)) {
			this._setdataobj = null;
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		var cells, cellcnt, cellinfo, subrowslen = 0;
		var b_select_changed = false;

		if (bandstr == "head") {
			cells = format._headcells;
			b_select_changed = (oldrow != row || oldcell != cell);

			if (format._headrows) {
				subrowslen = format._headrows.length;
			}
		}
		else if (bandstr == "summ" || bandstr == "summary") {
			cells = format._summcells;
			b_select_changed = (oldrow != row || oldcell != cell);

			if (format._summrows) {
				subrowslen = format._summrows.length;
			}
		}
		else {
			cells = format._bodycells;

			if (this._isSelectRowType()) {
				b_select_changed = (oldrow != row);
			}
			else {
				b_select_changed = (oldrow != row || oldcell != cell);
			}

			if (format._bodyrows) {
				subrowslen = format._bodyrows.length;
			}
		}

		if (!cells) {
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		cellcnt = cells.length;
		cellinfo = cells[cell];

		var clear = false;


		if ((bandstr == "body" && row < 0) || cell < 0) {
			clear = (selectmode != "normal");

			this._clrMultiSelect();
			this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, []);
			this._selectinfo.area = [];
			this._defaultSelect();

			if (b_select_changed) {
				this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
			}
			return true;
		}
		else if (!cellinfo) {
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		clear = (this._selectClear || clear);
		this._selectClear = false;

		var ctrlkey_change = false;

		if (selectmode == "ctrl") {
			if (this.selecttype == "multirow") {
				if (!this._isIncludeSelectpos(0, row)) {
					ctrlkey_change = true;
				}
			}
			if (this.selecttype == "multicell") {
				if (!this._isIncludeSelectpos(cell, row)) {
					ctrlkey_change = true;
				}
			}
		}


		if (bDataset == false) {
			if (this._binddataset && bandstr == "body" && row >= 0 && (ctrlkey_change == true || oldrow != row)) {
				this._userRowposChange = true;
				var row2 = this._binddataset._setRowPosition(row, undefined, 51);
				this._userRowposChange = false;

				if (row != row2) {
					if (row2 === undefined) {
						this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
						this._selectDraw(oldcell, oldcol, oldrow, oldsubrow, oldpvt, bDataset, cell, col, row, subrow, pvt, true, []);
						return false;
					}
					else {
						row = row2;
					}
				}
			}
		}

		var _controlpoint_cell = this._selectinfo.ctrlpoint;
		var selectRows = [];
		var b_fire = false;
		var multiidx = 0;

		function makeClearRows (grid) {
			var select_rows = grid._selectinfo.rows;
			var j = 0;

			selectRows = [];

			for (var i = 0, n = select_rows.length; i < n; i++) {
				selectRows[j++] = grid._dsRowToDispRow(select_rows[i]);
			}

			return select_rows;
		}
		;


		if (selectmode == "none") {
			if (bandstr == "body") {
				if (this._isAreaSelect() || this._isMultiSelect()) {
					if (this._isIncludeSelectpos(cell, row)) {
						if (evt_kind == "keydown" || evt_kind == "mousemove") {
							b_fire = true;
						}
						else {
							_controlpoint_cell._set(cellinfo, row, subrowslen);
							return false;
						}
					}
					else {
						if (evt_kind == "lbuttonup") {
							b_fire = true;
						}
					}

					if (evt_kind == "mousemove") {
						this._is_drag_selecting = true;
					}
					else {
						selectRows = makeClearRows(this);
						this._clrMultiSelect();

						if (evt_kind != "lbuttonup") {
							_controlpoint_cell._set(cellinfo, row, subrowslen);
						}
					}
				}
				else {
					this._clrMultiSelect();
					_controlpoint_cell._set(cellinfo, row, subrowslen);
				}
			}
			else {
				selectRows = makeClearRows(this);
				this._clrMultiSelect();
				_controlpoint_cell._set(cellinfo, row, subrowslen);
			}
			this._selectinfo.area = [];
		}
		else if (selectmode == "ctrl") {
			if (evt_kind != "mousemove") {
				_controlpoint_cell._set(cellinfo, row, subrowslen);
			}


			if (this.selecttype == "multirow") {
				if (ctrlkey_change == false && (evt_kind == "lbuttondown" || (evt_kind && evt_kind.indexOf("func") >= 0))) {
					this._delMultirowSelectInfo(row);
					this._delSelectpos(-1, row);
					this._resetSelectStartEndRow();
					this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, selectRows);
					this._defaultSelect();

					this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
					return true;
				}

				b_fire = true;
				multiidx = this._selectinfo.area.length;

				if (evt_kind == "mousemove") {
					this._is_drag_selecting = true;
					multiidx--;
				}
			}
			else if (this.selecttype == "multiarea") {
				multiidx = this._selectinfo.area.length;

				if (evt_kind == "mousemove") {
					this._is_drag_selecting = true;
					multiidx--;
				}
			}
		}
		else if (selectmode == "shift") {
			if (this.selecttype == "multiarea") {
				multiidx = this._selectinfo.area.length - 1;
			}

			this._clrMultiSelect();
			clear = true;
		}


		if (this._isSelectRowType() == false) {
			if (b_select_changed) {
				b_fire = true;
			}

			if (this._isAreaSelect()) {
				this._applyAreaSelectPos(cell, row, multiidx, "area");
			}
			else {
				this._addSelectpos(cell, row);
				this._applySelect(this._selectstartrow, this._selectendrow, row);
				this._applySelect(this._selectstartcol, this._selectendcol, col);
				this._applySelect(this._selectstartsubrow, this._selectendsubrow, subrow);
			}
		}


		else {
			if (b_select_changed) {
				b_fire = true;
			}

			if (this._isMultiSelect()) {
				this._applyAreaSelectPos(cell, row, multiidx, "row");
			}
			else {
				for (var i = 0; i < cellcnt; i++) {
					this._addSelectpos(i, row);
				}

				this._applySelect(this._selectstartrow, this._selectendrow, row);
			}
		}


		this._defaultSelect();


		var b_draw = false;

		if (bDataset == false) {
			if (this._binddataset && bandstr == "body" && row >= 0 && (ctrlkey_change == true || oldrow != row)) {
				this._rowposition = row;
				b_draw = true;
			}
			else {
				if (clear == true) {
					b_draw = true;
				}
				else if (b_fire == true) {
					b_draw = true;
				}
			}
		}
		else {
			clear = (this._isMultiSelect() || this._isAreaSelect());
			b_draw = true;
		}

		if (b_draw) {
			this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, selectRows, evt_kind);
		}


		if (b_fire && evt_kind != "func_area1") {
			this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
		}

		return true;
	};

	_pGrid._applyAreaSelectPos = function (cell, row, idx, type) {
		var format = this._curFormat;
		var cells, cellsLen, subrowsLen;
		var bodycells = [], bodycellslen = 0, bodyrowslen = 0, headcells = [], headcellslen = 0, headrowslen = 0, summcells = [], summcellslen = 0, summrowslen = 0;

		if (format._bodycells) {
			bodycells = format._bodycells;
			bodycellslen = bodycells.length;
			bodyrowslen = format._bodyrows.length;
		}
		if (format._headcells) {
			headcells = format._headcells;
			headcellslen = headcells.length;
			headrowslen = format._headrows.length;
		}
		if (format._summcells) {
			summcells = format._summcells;
			summcellslen = summcells.length;
			summrowslen = format._summrows.length;
		}

		if (row == -2) {
			cells = summcells;
			subrowsLen = summrowslen;
		}
		else if (row == -1) {
			cells = headcells;
			subrowsLen = headrowslen;
		}
		else {
			cells = bodycells;
			subrowsLen = bodyrowslen;
		}

		var cellsLen = cells.length;
		var ctrlpoint = this._selectinfo.ctrlpoint;
		var cellinfo = cells[cell];
		var begcol, endcol, begrow, endrow, begsubrow = [], endsubrow = [], last;

		begrow = Math.min(row, ctrlpoint.row);
		endrow = Math.max(row, ctrlpoint.row);
		begcol = Math.min(ctrlpoint.col, cellinfo._col);
		endcol = Math.max((ctrlpoint.col + ctrlpoint.colspan - 1), (cellinfo._col + cellinfo._colspan - 1));

		if (ctrlpoint.row < row) {
			begrow = ctrlpoint.row;
			endrow = row;

			last = endrow - begrow;

			begsubrow[0] = ctrlpoint.subrow;
			endsubrow[0] = ctrlpoint.subrowslen - 1;
			begsubrow[last] = 0;
			endsubrow[last] = cellinfo._row + cellinfo._rowspan - 1;
		}
		else if (ctrlpoint.row > row) {
			begrow = row;
			endrow = ctrlpoint.row;

			last = endrow - begrow;

			begsubrow[0] = cellinfo._row;
			endsubrow[0] = subrowsLen - 1;
			begsubrow[last] = 0;
			endsubrow[last] = ctrlpoint.subrow + ctrlpoint.rowspan - 1;
		}
		else {
			begrow = endrow = row;
			last = 0;

			begsubrow[0] = Math.min(cellinfo._row, ctrlpoint.subrow);
			endsubrow[0] = Math.max(cellinfo._row + cellinfo._rowspan - 1, ctrlpoint.subrow + ctrlpoint.rowspan - 1);
		}

		var ii;
		for (var i = begrow + 1; i < endrow; i++) {
			ii = i - begrow;
			begsubrow[ii] = 0;

			if (i == -1) {
				endsubrow[ii] = headrowslen - 1;
			}
			else {
				endsubrow[ii] = bodyrowslen - 1;
			}
		}

		var areainfo;

		if (type == "area") {
			if (begrow >= 0 || begrow == endrow) {
				areainfo = this._adjustMergeArea(cells, begcol, endcol, begrow, endrow, begsubrow, endsubrow);
			}
			else {
				var bsubrow, esubrow;
				var prevbegcol = begcol, prevendcol = endcol;

				while (true) {
					bsubrow = [].concat(begsubrow);
					esubrow = [].concat(endsubrow);

					if (begrow == -2) {
						var summbegsubrow = bsubrow.splice(0, 1);
						var summendsubrow = esubrow.splice(0, 1);
						var headbegsubrow = bsubrow.splice(0, 1);
						var headendsubrow = esubrow.splice(0, 1);

						areainfo = this._adjustMergeArea(summcells, prevbegcol, prevendcol, -2, -2, summbegsubrow, summendsubrow);

						prevbegcol = areainfo.begcol;
						prevendcol = areainfo.endcol;

						areainfo = this._adjustMergeArea(headcells, prevbegcol, prevendcol, -1, -1, headbegsubrow, headendsubrow);

						if (prevbegcol != areainfo.begcol || prevendcol != areainfo.endcol) {
							prevbegcol = areainfo.begcol;
							prevendcol = areainfo.endcol;
							continue;
						}
					}
					else if (begrow == -1) {
						var headbegsubrow = bsubrow.splice(0, 1);
						var headendsubrow = esubrow.splice(0, 1);

						areainfo = this._adjustMergeArea(headcells, prevbegcol, prevendcol, -1, -1, headbegsubrow, headendsubrow);

						prevbegcol = areainfo.begcol;
						prevendcol = areainfo.endcol;
					}

					if (endrow >= 0) {
						areainfo = this._adjustMergeArea(bodycells, prevbegcol, prevendcol, 0, endrow, bsubrow, esubrow);
					}

					if (prevbegcol != areainfo.begcol || prevendcol != areainfo.endcol) {
						prevbegcol = areainfo.begcol;
						prevendcol = areainfo.endcol;
						continue;
					}
					break;
				}
				areainfo.begrow = begrow;
				areainfo.begsubrow = begsubrow;
				areainfo.endsubrow = endsubrow;
			}
		}
		else {
			areainfo = this._adjustRowArea(begrow, endrow);
		}

		this._selectinfo.area[idx] = areainfo;

		var select_area = this._selectinfo.area;
		var select_area_len = select_area.length;

		this._clrMultiSelect();
		var cell_scol, cell_ecol, cell_ssubrow, cell_esubrow;

		if (type == "area") {
			for (var a = 0; a < select_area_len; a++) {
				begcol = select_area[a].begcol;
				endcol = select_area[a].endcol;
				begrow = select_area[a].begrow;
				endrow = select_area[a].endrow;
				begsubrow = select_area[a].begsubrow;
				endsubrow = select_area[a].endsubrow;

				this._selectstartrow[a] = begrow;
				this._selectendrow[a] = endrow;
				this._selectstartcol[a] = begcol;
				this._selectendcol[a] = endcol;
				this._selectstartsubrow[a] = begsubrow[0];
				this._selectendsubrow[a] = endsubrow[endsubrow.length - 1];

				for (var i = begrow, j = 0; i <= endrow; i++, j++) {
					if (i == -2) {
						cells = summcells;
						cellsLen = summcellslen;
					}
					else if (i == -1) {
						cells = headcells;
						cellsLen = headcellslen;
					}
					else {
						cells = bodycells;
						cellsLen = bodycellslen;
					}

					for (var k = 0; k < cellsLen; k++) {
						cell_scol = cells[k]._col;
						cell_ecol = cells[k]._col + cells[k]._colspan - 1;
						cell_ssubrow = cells[k]._row;
						cell_esubrow = cells[k]._row + cells[k]._rowspan - 1;

						if (cell_scol >= begcol && cell_ecol <= endcol && cell_ssubrow >= begsubrow[j] && cell_esubrow <= endsubrow[j]) {
							this._addSelectpos(k, i);
						}
					}
				}
			}
		}
		else {
			for (var a = 0; a < select_area_len; a++) {
				begrow = select_area[a].begrow;
				endrow = select_area[a].endrow;

				for (var i = begrow, j = 0; i <= endrow; i++, j++) {
					if (i == -2) {
						cellsLen = summcellslen;
					}
					else if (i == -1) {
						cellsLen = headcellslen;
					}
					else {
						cellsLen = bodycellslen;
					}

					if (cellsLen == 0) {
						continue;
					}

					for (var k = 0; k < cellsLen; k++) {
						this._addSelectpos(k, i, true);
					}

					this._applySelect(this._selectstartrow, this._selectendrow, i);
				}
			}

			var rows = this._selectinfo.rows;
			rows.sort(function (a, b) {
				return a - b;
			});
			rows = null;
		}
	};

	_pGrid._delMultirowSelectInfo = function (row) {
		var area = this._selectinfo.area;
		var area_len = area.length;

		for (var i = 0; i < area_len; i++) {
			if (area[i].begrow == area[i].endrow && area[i].begrow == row) {
				area.splice(i, 1);
				break;
			}
			else if (area[i].begrow == row && area[i].endrow != row) {
				area[i].begrow++;
				break;
			}
			else if (area[i].endrow == row && area[i].begrow != row) {
				area[i].endrow--;
				break;
			}
			else if (area[i].begrow < row && area[i].endrow > row) {
				var endrow = area[i].endrow;
				area[i].endrow = row - 1;
				var newarea = this._adjustRowArea(row + 1, endrow);
				area.splice(i + 1, 0, newarea);
				break;
			}
		}
	};

	_pGrid._adjustRowArea = function (begrow, endrow) {
		return {
			begcol : -1, 
			endcol : -1, 
			begrow : begrow, 
			endrow : endrow, 
			begsubrow : [], 
			endsubrow : []
		};
	};

	_pGrid._adjustMergeArea = function (cells, begcol, endcol, begrow, endrow, begsubrow, endsubrow) {
		var last = endrow - begrow;
		var cells_len = cells.length;
		var cell_scol, cell_ecol, cell_ssubrow, cell_esubrow;
		var update, rows_len = begsubrow.length;

		for (var i = 0; i < cells_len; i++) {
			cell_scol = cells[i]._col;
			cell_ecol = cells[i]._col + cells[i]._colspan - 1;
			cell_ssubrow = cells[i]._row;
			cell_esubrow = cells[i]._row + cells[i]._rowspan - 1;

			update = false;

			for (var j = 0; j < rows_len; j++) {
				if (((begcol <= cell_scol && endcol >= cell_scol) || (begcol <= cell_ecol && endcol >= cell_ecol) || (begcol > cell_scol && endcol < cell_ecol)) && ((begsubrow[j] <= cell_ssubrow && endsubrow[j] >= cell_ssubrow) || (begsubrow[j] <= cell_esubrow && endsubrow[j] >= cell_esubrow) || (begsubrow[j] > cell_ssubrow && endsubrow[j] < cell_esubrow))) {
					if (begcol > cell_scol) {
						begcol = cell_scol;
						update = true;
					}
					if (endcol < cell_ecol) {
						endcol = cell_ecol;
						update = true;
					}

					if (j == 0) {
						if (begsubrow[0] > cell_ssubrow) {
							begsubrow[0] = cell_ssubrow;
							update = true;
						}
					}

					if (j == last) {
						if (endsubrow[last] < cell_esubrow) {
							endsubrow[last] = cell_esubrow;
							update = true;
						}
					}

					if (update == true) {
						i = 0;
						break;
					}
				}
			}
		}

		return {
			begcol : begcol, 
			endcol : endcol, 
			begrow : begrow, 
			endrow : endrow, 
			begsubrow : begsubrow, 
			endsubrow : endsubrow
		};
	};

	_pGrid._defaultSelect = function () {
		this.selectstartrow = this._selectstartrow;
		this.selectstartcol = this._selectstartcol;
		this.selectstartsubrow = this._selectstartsubrow;
		this.selectstartpivot = this._selectstartpvt;
		this.selectendrow = this._selectendrow;
		this.selectendcol = this._selectendcol;
		this.selectendsubrow = this._selectendsubrow;
		this.selectendpivot = this._selectendpvt;

		if (!this.selectstartrow.length) {
			this.selectstartrow = -9;
		}
		if (!this.selectstartcol.length) {
			this.selectstartcol = -1;
		}
		if (!this.selectstartsubrow.length) {
			this.selectstartsubrow = -1;
		}
		if (!this.selectstartpivot.length) {
			this.selectstartpivot = -9;
		}
		if (!this.selectendrow.length) {
			this.selectendrow = -9;
		}
		if (!this.selectendcol.length) {
			this.selectendcol = -1;
		}
		if (!this.selectendsubrow.length) {
			this.selectendsubrow = -1;
		}
		if (!this.selectendpivot.length) {
			this.selectendpivot = -9;
		}
	};

	_pGrid._dsRowToDispRow = function (datasetRowidx, bCalcScroll) {
		var row;
		if (this._hasTree) {
			row = this._getTreeRowPosition(datasetRowidx);
		}
		else {
			row = datasetRowidx;
		}

		if (bCalcScroll) {
			row -= this._getBodyBegRowPos(row);
		}

		return row;
	};

	_pGrid._jumpCurrentRow = function (rowidx) {
		if (rowidx < 0) {
			return this._begrowpos;
		}

		var topPos = this._toprowpos[0];
		var vscroll = this._vscrollmng;
		var page_spos = this._getBodyBegRowPos(rowidx);

		if (this._lbuttondown_proc == false) {
			if (rowidx <= topPos) {
				if (!this._select_noscroll && vscroll) {
					vscroll.setRowPos(rowidx);
				}

				page_spos = this._getBodyBegRowPos(rowidx);
			}
			else if (rowidx > (topPos + this.pagerowcount - 1)) {
				var gap = (this.pagerowcount > 0) ? this._pagerowcnt - this.pagerowcount : 0;

				if (!this._select_noscroll && vscroll) {
					vscroll.setRowPos(rowidx - this._pagerowcnt + 1 + gap);
				}

				page_spos = this._getBodyBegRowPos(rowidx);
			}
			else {
				if (this._isRemainAreaScroll()) {
					if (!this._select_noscroll && vscroll) {
						vscroll.setRowPos(rowidx);
					}

					page_spos = this._getBodyBegRowPos(rowidx);
				}
			}
		}
		return page_spos;
	};

	_pGrid._getBodyBegRowPos = function (rowidx) {
		if (this._fixed_rowcnt > 0) {
			if (this._fixed_endrow >= rowidx) {
				return this._fixed_startrow;
			}

			return this._begrowpos - (this._fixed_rowcnt - this._fixed_startrow);
		}
		return this._begrowpos;
	};

	_pGrid._clearRows = function (oldrows) {
		if (oldrows.length > 0) {
			for (var i = 0, n = oldrows.length; i < n; i++) {
				if (oldrows[i] == -2) {
					this._refreshSumm(true);
					bSummRowDraw = false;
				}
				else if (oldrows[i] == -1) {
					this._refreshHead(true);
					bHeadRowDraw = false;
				}
				else {
					this._refreshBodyRow(oldrows[i] - this._getBodyBegRowPos(oldrows[i]));
				}
			}
			return true;
		}
		return false;
	};

	_pGrid._selectDraw = function (afterCell, afterCol, afterRow, afterSubrow, afterPvt, bDataset, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, bAllRowDraw, oldrows, kind) {
		var oldPos = this._dsRowToDispRow(beforeRow);
		var newPos = this._dsRowToDispRow(afterRow);
		var topPos = this._toprowpos[0];

		this._setSelectedInfo(null, null, afterRow, null, null);

		var bBodyRowDraw = false;
		var bHeadRowDraw = false;
		var bSummRowDraw = false;
		var exprbindcells = null;

		if ((exprbindcells = this._getUseBindExprProp("body"))) {
			bBodyRowDraw = this._expr_allrow_update_prop || this._expr_allrow_update_style;
		}
		if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head") || newPos == -1 || oldPos == -1) {
			bHeadRowDraw = true;
		}
		if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ") || newPos == -2 || oldPos == -2) {
			bSummRowDraw = true;
		}

		if (this._isSelectRowType()) {
			if (newPos < 0 && (kind && kind.indexOf("func") < 0)) {
				if (bAllRowDraw) {
					if (!this._clearRows(oldrows)) {
						this._refreshBody(true, false);
					}
				}
				else {
					this._refreshBodyRow(oldPos - this._getBodyBegRowPos(oldPos));

					if (bBodyRowDraw && exprbindcells) {
						for (var i = 0; i < exprbindcells.length; i++) {
							this._refreshCell("body", exprbindcells[i], undefined);
						}
					}
				}

				if (bHeadRowDraw) {
					this._refreshHead(true);
				}
				if (bSummRowDraw) {
					this._refreshSumm(true);
				}
			}
			else if (newPos != oldPos) {
				this._jumpCurrentRow(newPos);

				if (this._isMultiSelect()) {
					this._refreshBody(true, !bAllRowDraw);

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
				else {
					if (bAllRowDraw) {
						if (!this._clearRows(oldrows)) {
							this._refreshBody(true, true);
						}
						else {
							this._refreshBodyRow(newPos - this._getBodyBegRowPos(newPos));

							if (bBodyRowDraw && exprbindcells) {
								for (var i = 0; i < exprbindcells.length; i++) {
									this._refreshCell("body", exprbindcells[i], undefined);
								}
							}
						}
					}
					else {
						this._refreshBodyRow(oldPos - this._getBodyBegRowPos(oldPos));
						this._refreshBodyRow(newPos - this._getBodyBegRowPos(newPos));

						if (bBodyRowDraw && exprbindcells) {
							for (var i = 0; i < exprbindcells.length; i++) {
								this._refreshCell("body", exprbindcells[i], undefined);
							}
						}
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
			else {
				if (this._isMultiSelect()) {
					this._refreshBody(true, !bAllRowDraw);

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
		}
		else {
			if (newPos < 0 && (kind && kind.indexOf("func") < 0)) {
				if (bAllRowDraw) {
					if (!this._clearRows(oldrows)) {
						this._refreshBody(true, false);
					}
				}
				else {
					this._refreshBodyCell(beforeCell, oldPos - this._getBodyBegRowPos(oldPos));

					if (bBodyRowDraw && exprbindcells) {
						for (var i = 0; i < exprbindcells.length; i++) {
							this._refreshCell("body", exprbindcells[i], undefined);
						}
					}
				}

				if (bHeadRowDraw) {
					this._refreshHead(true);
				}
				if (bSummRowDraw) {
					this._refreshSumm(true);
				}
			}
			else if (newPos != oldPos || afterCell != beforeCell) {
				if (kind != "selectorsizing") {
					this._jumpCurrentRow(newPos);
					var cellobj;

					if (newPos == -1) {
						cellobj = this._getCurrentHeadCell(-1);
					}
					else if (newPos == -2) {
						cellobj = this._getCurrentSummCell(-1);
					}
					else {
						cellobj = this._getCurrentBodyCell(-1, -1);
					}

					if (cellobj) {
						var area = cellobj._refinfo._area;
						var select_ctrl = this._select_ctrl;

						if (select_ctrl && select_ctrl._is_tracking) {
							if (area == "body") {
								cellobj.parent._showfull(cellobj);
							}
							else if (area == "left") {
								if (this._hscrollmng) {
									this._hscrollmng.setPos(0);
								}
							}
							else {
								var scroll_max = this._getScollMaxLeft();

								if (this._hscrollmng) {
									this._hscrollmng.setPos(scroll_max);
								}
							}
						}
						else if (!kind) {
							cellobj.parent._showfull(cellobj);
						}
						else if (kind == "keydown") {
							cellobj._showfull(true);
						}
					}
				}

				if (this._isAreaSelect()) {
					if (kind == "selectorsizing") {
						if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")) {
							nexacro._OnceCallbackTimer.callonce(this, function () {
								this._refreshBody(true, !bAllRowDraw);
							}, 10);
						}
						else {
							this._refreshBody(true, !bAllRowDraw);
						}
					}
					else {
						this._refreshBody(true, !bAllRowDraw);

						if (bHeadRowDraw) {
							this._refreshHead(true);
						}
						if (bSummRowDraw) {
							this._refreshSumm(true);
						}
					}
				}
				else {
					if (bAllRowDraw) {
						this._clearRows(oldrows);
						this._refreshBody(true, !bAllRowDraw);
					}
					else {
						this._refreshBodyCell(beforeCell, oldPos - this._getBodyBegRowPos(oldPos));
						this._refreshBodyCell(afterCell, newPos - this._getBodyBegRowPos(newPos));

						if (bBodyRowDraw && exprbindcells) {
							for (var i = 0; i < exprbindcells.length; i++) {
								this._refreshCell("body", exprbindcells[i], undefined);
							}
						}
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
			else {
				if (this._isAreaSelect()) {
					if (kind == "selectorsizing") {
						if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")) {
							nexacro._OnceCallbackTimer.callonce(this, function () {
								this._refreshBody(true, !bAllRowDraw);
							}, 10);
						}
						else {
							this._refreshBody(true, !bAllRowDraw);
						}
					}
					else {
						this._refreshBody(true, !bAllRowDraw);

						if (bHeadRowDraw) {
							this._refreshHead(true);
						}
						if (bSummRowDraw) {
							this._refreshSumm(true);
						}
					}
				}
				else if (this._isMultiSelect()) {
					if (bAllRowDraw) {
						this._clearRows(oldrows);
						this._refreshBody(true, !bAllRowDraw);
					}
					else {
						this._refreshBodyCell(afterCell, newPos - this._getBodyBegRowPos(newPos));

						if (bBodyRowDraw && exprbindcells) {
							for (var i = 0; i < exprbindcells.length; i++) {
								this._refreshCell("body", exprbindcells[i], undefined);
							}
						}
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
		}

		this._adjustOverlayElements(false, this._is_use_fakemerge);
		this._updateSelector();
	};

	_pGrid.redrawExprCell = function (band) {
		var exprbindcells;

		if (!band) {
			if (exprbindcells = this._getUseBindExprFullProp("head")) {
				for (var i = 0; i < exprbindcells.length; i++) {
					this._refreshCell("head", exprbindcells[i]);
				}
			}
			if (exprbindcells = this._getUseBindExprFullProp("body")) {
				for (var i = 0; i < exprbindcells.length; i++) {
					this._refreshCell("body", exprbindcells[i]);
				}
			}
			if (exprbindcells = this._getUseBindExprFullProp("summary")) {
				for (var i = 0; i < exprbindcells.length; i++) {
					this._refreshCell("summary", exprbindcells[i]);
				}
			}
		}
		else {
			switch (band) {
				case "head":
				case "body":
				case "summary":
					if (exprbindcells = this._getUseBindExprFullProp(band)) {
						for (var i = 0; i < exprbindcells.length; i++) {
							this._refreshCell(band, exprbindcells[i]);
						}
					}
					break;
			}
		}
	};

	_pGrid._isUseBindExprStyle = function (bandstr) {
		if (this._is_use_bind_expr_style[bandstr] !== null) {
			return this._is_use_bind_expr_style[bandstr];
		}

		var retn = this._is_use_bind_expr_style[bandstr] = !!this._getUseBindExprProp(bandstr, "cssclass");

		if (bandstr == "body" && retn) {
			this._expr_allrow_update_style = true;
		}

		return !!retn;
	};

	_pGrid._getUseBindExprProp = function (bandstr, propname) {
		var band;
		var cells;
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		if (bandstr == "summary") {
			bandstr = "summ";
		}

		if (!propname) {
			if (this._use_bind_expr_cells[bandstr] !== null) {
				return this._use_bind_expr_cells[bandstr];
			}

			this._use_bind_expr_cells[bandstr] = undefined;
		}

		if (bandstr == "body") {
			band = this._bodyBand;
			cells = format ? format._bodycells : [];
		}
		else if (bandstr == "head") {
			band = this._headBand;
			cells = format ? format._headcells : [];
		}
		else {
			band = this._summBand;
			cells = format ? format._summcells : [];
		}

		if (band) {
			var key, property_map;

			if (propname) {
				var retn = [];

				for (var i = 0, n = cells.length; i < n; i++) {
					if (cells[i][propname] && cells[i][propname]._bindtype > 0) {
						retn.push(i);
					}
				}

				if (retn.length > 0) {
					return retn;
				}
				else {
					return undefined;
				}
			}
			else {
				if (bandstr == "body") {
					for (var i = 0, n = cells.length; i < n; i++) {
						property_map = cells[i]._property_map;

						for (var j = 0, nn = property_map.length; j < nn; j++) {
							key = property_map[j][0];

							if (cells[i][key] && (cells[i][key]._bindtype == 2 || key == "expr")) {
								this._expr_allrow_update_prop = true;

								if (property_map[j][3] == true) {
									this._is_use_bind_expr_style["body"] = true;
									this._expr_allrow_update_style = true;

									if (this.cellexprupdatecondition != "all") {
										continue;
									}
								}
								else {
									if (this.cellexprupdatecondition == "none") {
										continue;
									}
									if (this.cellexprupdatecondition == "celltext" && key != "text" && key != "expr") {
										continue;
									}
								}

								if (this._use_bind_expr_cells["body"] == undefined) {
									this._use_bind_expr_cells["body"] = [];
								}

								this._use_bind_expr_cells["body"].push(i);
								break;
							}
						}
					}
				}
				else {
					for (var i = 0, n = cells.length; i < n; i++) {
						property_map = cells[i]._property_map;

						for (var j = 0, nn = property_map.length; j < nn; j++) {
							key = property_map[j][0];

							if (cells[i][key] && (cells[i][key]._bindtype > 0 || key == "expr")) {
								if (property_map[j][3] == true) {
									this._is_use_bind_expr_style[bandstr] = true;
								}

								if (this._use_bind_expr_cells[bandstr] == undefined) {
									this._use_bind_expr_cells[bandstr] = [];
								}

								this._use_bind_expr_cells[bandstr].push(i);
								break;
							}
						}
					}
				}
			}
		}
		return this._use_bind_expr_cells[bandstr];
	};

	_pGrid._getUseBindExprFullProp = function (bandstr) {
		var band;
		var cells;
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		if (bandstr == "summary") {
			bandstr = "summ";
		}

		if (bandstr == "body") {
			band = this._bodyBand;
			cells = format ? format._bodycells : [];
		}
		else if (bandstr == "head") {
			band = this._headBand;
			cells = format ? format._headcells : [];
		}
		else {
			band = this._summBand;
			cells = format ? format._summcells : [];
		}

		var _use_bind_expr_cells = [];

		if (band) {
			var key, property_map;

			if (bandstr == "body") {
				for (var i = 0, n = cells.length; i < n; i++) {
					property_map = cells[i]._property_map;

					for (var j = 0, nn = property_map.length; j < nn; j++) {
						key = property_map[j][0];

						if (cells[i][key] && (cells[i][key]._bindtype == 2 || key == "expr")) {
							_use_bind_expr_cells.push(i);
							break;
						}
					}
				}
			}
			else {
				for (var i = 0, n = cells.length; i < n; i++) {
					property_map = cells[i]._property_map;

					for (var j = 0, nn = property_map.length; j < nn; j++) {
						key = property_map[j][0];

						if (cells[i][key] && (cells[i][key]._bindtype > 0 || key == "expr")) {
							_use_bind_expr_cells.push(i);
							break;
						}
					}
				}
			}
		}

		return _use_bind_expr_cells;
	};

	_pGrid._clearBindTypeFlag = function () {
		this._use_bind_expr_cells.body = null;
		this._use_bind_expr_cells.head = null;
		this._use_bind_expr_cells.summ = null;
		this._is_use_bind_expr_style.body = null;
		this._is_use_bind_expr_style.head = null;
		this._is_use_bind_expr_style.summ = null;
		this._expr_allrow_update_prop = false;
		this._expr_allrow_update_style = false;
	};

	_pGrid._toggleVal = function (datarow, cellinfo) {
		if (!cellinfo) {
			return false;
		}

		var v = cellinfo._getValue(datarow);
		v = nexacro._toBoolean(v);
		v = (v) ? 0 : 1;

		if (cellinfo.text._bindtype == 1) {
			this._dsEventOccured = true;
			var retn = this._binddataset.setColumn(datarow, cellinfo.text._bindexpr, v);
			if (nexacro._enableaccessibility) {
				var cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					cellobj._setAccessibilityStatChecked(nexacro._toBoolean(v));
				}
			}
			this._dsEventOccured = false;
			return retn;
		}
		return false;
	};

	_pGrid._isEditorKeyAction = function (elem, comp, keyCode, altKey, ctrlKey, shiftKey) {
		if (this._is_editor_keyaction == false) {
			this._is_editor_keyaction = true;
			return true;
		}

		if (!this._showEditing) {
			return false;
		}

		if (elem.isInputElement()) {
			if (elem.readonly == true) {
				return false;
			}

			if (keyCode == nexacro.Event.KEY_LEFT) {
				if (ctrlKey || shiftKey || altKey) {
					return true;
				}

				var pos = elem.getElementCaretPos();

				if ((pos && pos != -1) && pos.begin != 0) {
					return true;
				}
			}
			else if (keyCode == nexacro.Event.KEY_RIGHT) {
				if (ctrlKey || shiftKey || altKey) {
					return true;
				}

				var pos = elem.getElementCaretPos();
				var elem_val = elem.getElementValue();
				var v = elem_val ? elem_val.length : 0;

				if ((pos && pos != -1) && pos.begin != v) {
					return true;
				}
			}
			else if (keyCode == nexacro.Event.KEY_UP) {
				if (ctrlKey || shiftKey || altKey) {
					return true;
				}

				if (elem.usemultiline) {
					var line = elem.getElementCaretLine();

					if (line != 1) {
						return true;
					}
				}
			}
			else if (keyCode == nexacro.Event.KEY_DOWN) {
				if (ctrlKey || shiftKey || altKey) {
					return true;
				}

				if (elem.usemultiline) {
					var line = elem.getElementCaretLine();

					comp = elem.parent.linkedcontrol;
					var max_line = parseInt(comp._getLineCount());

					if (line != max_line) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
			this._accept_arrow = true;
		}
		return {
			want_tab : this._acceptstab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._accept_arrow
		};
	};

	_pGrid._getFirstEditableCell = function () {
		var cellinfo, editType;

		if (this._binddataset && this._curFormat && this._curFormat._bodycells) {
			var rlen = this._getGridRowCount();
			var clen = this._curFormat._bodycells.length;

			for (var i = 0; i < rlen; i++) {
				for (var j = 0; j < clen; j++) {
					var row = i;
					if (this._hasTree) {
						row = this._treeIndexes[row];
					}

					editType = this._curFormat._bodycells[j]._getEdittype(row);

					if (editType !== "" && editType !== "none") {
						return {
							row : row, 
							cell : j
						};
					}
				}
			}
		}
		return {
			row : null, 
			cell : null
		};
	};

	_pGrid._getLastEditableCell = function () {
		var cellinfo, editType;

		if (this._binddataset) {
			var rlen = this._getGridRowCount();
			var clen = this._curFormat._bodycells.length;
			for (var i = rlen - 1; i >= 0; i--) {
				for (var j = clen - 1; j >= 0; j--) {
					var row = i;
					if (this._hasTree) {
						row = this._treeIndexes[row];
					}

					editType = this._curFormat._bodycells[j]._getEdittype(row);

					if (editType !== "" && editType !== "none") {
						return {
							row : row, 
							cell : j
						};
					}
				}
			}
		}
		return {
			row : null, 
			cell : null
		};
	};

	_pGrid._isChar = function (keyCode) {
		switch (keyCode) {
			case 9:
			case 25:
			case 27:
			case 144:
			case 145:
				return false;
				break;
		}
		;

		if ((keyCode >= 16 && keyCode <= 21) || (keyCode >= 33 && keyCode <= 40) || (keyCode >= 91 && keyCode <= 93) || (keyCode >= 112 && keyCode <= 123)) {
			return false;
		}

		return true;
	};

	_pGrid._on_apply_cell_status = function (cellobj, status, value) {
		if (this.enableredraw) {
			var rowstatus = this._isSelectRowType();

			if (status == "mouseover") {
				if (this.mouseovertype == "cell") {
					rowstatus = false;
				}
				else if (this.mouseovertype == "row") {
					rowstatus = true;
				}
			}

			if (rowstatus) {
				var rowobj = cellobj._getRowControl();
				var cells = rowobj._cells;

				for (var i = 0, n = cells.length; i < n; i++) {
					cells[i]._rowstatuschange = true;
					cells[i]._changeStatus(status, value);
					cells[i]._rowstatuschange = null;
				}
			}
			else {
				cellobj._rowstatuschange = true;
				cellobj._changeStatus(status, value);
				cellobj._rowstatuschange = null;
			}
		}
	};

	_pGrid._setDSEventHandlers = function (ds) {
		ds._setEventHandler("onload", this.on_dsnotify_onload, this);
		ds._setEventHandler("onrowposchanged", this.on_dsnotify_onrowposchanged, this);
		ds._setEventHandler("oncolumnchanged", this.on_dsnotify_oncolumnchanged, this);
		ds._setEventHandler("onrowsetchanged", this.on_dsnotify_onrowsetchanged, this);
	};

	_pGrid._removeDSEventHandlers = function (ds) {
		ds._removeEventHandler("onload", this.on_dsnotify_onload, this);
		ds._removeEventHandler("onrowposchanged", this.on_dsnotify_onrowposchanged, this);
		ds._removeEventHandler("oncolumnchanged", this.on_dsnotify_oncolumnchanged, this);
		ds._removeEventHandler("onrowsetchanged", this.on_dsnotify_onrowsetchanged, this);
	};

	_pGrid._getBodyClientSize = function () {
		var format = this._curFormat;
		var height = 0, width = 0, clientrect;
		clientrect = this._getAvailableRect(this);
		width = clientrect.width;
		height = clientrect.height;

		if (format) {
			if (!this._bodyBand) {
				clientrect = this._getAvailableRect(this);
				width = clientrect.width - format.leftWidth - format.rightWidth;
				height = clientrect.height - this._getHeadHeight() - this._getSummHeight();
			}
			else {
				clientrect = this._getAvailableRect(this._bodyBand);
				width = clientrect.width - format.leftWidth - format.rightWidth;
				height = clientrect.height;
			}
		}
		return [width, height];
	};

	_pGrid._applyAutofittype = function (redraw, property_set) {
		if (this.enableredraw == false) {
			this._enable_redraw_history.autofit = [redraw, property_set];
			return;
		}

		var format = this._curFormat;
		var control_elem = this.getElement();

		if (!format || !control_elem) {
			return;
		}

		var height, width;
		var bodysize = this._getBodyClientSize();

		width = bodysize[0];
		height = bodysize[1];

		if (!this._is_created && (width <= 0 || height <= 0)) {
			width = control_elem.client_width;
			height = control_elem.client_height;
		}

		var change = false;

		switch (this.autofittype) {
			case "col":
				this._colautofit = true;
				this._rowautofit = false;
				break;
			case "row":
				this._colautofit = false;
				this._rowautofit = true;
				break;
			case "both":
				this._colautofit = true;
				this._rowautofit = true;
				break;
			case "allrow":
				this._colautofit = false;
				break;
			case "allboth":
				this._colautofit = true;
				break;
			case "col,allrow":
				this._colautofit = true;
				break;
			case "allpivot":
				this._colautofit = true;
				break;
			case "row,allpivot":
				this._colautofit = false;
				break;
			case "none":
				this._colautofit = false;
				this._rowautofit = false;
				change = property_set;
				break;
		}

		if (this._colautofit && width >= 0) {
			change = format._adjustColWidth(width, this._autofitcol_rate);
		}

		if (change) {
			if (redraw) {
				if (this.autosizingtype != "none") {
					this._autofiting = true;
					this._recreate_contents_all(true, false);
					this._autofiting = false;
				}
				else {
					this._autofiting = true;

					if (this._bodyBand) {
						var scrollheight = this._bodyBand._scrollHeight;
						var scrollwidth = this._bodyBand._scrollWidth;

						if (this._colautofit) {
							if (width != scrollwidth) {
								this._setScrollMaxSize(width, scrollheight);
								this._bodyBand._scrollWidth = width;
							}
							this._bodyBand._matrix._adjustColsDisplay(true);
						}
						else {
							this._setScrollMaxSize(format.bodyWidth, scrollheight);
							this._bodyBand._scrollWidth = format.bodyWidth;
							this._bodyBand._matrix._adjustColsDisplay(true);
						}
					}
					if (this._headBand) {
						this._headBand._matrix._adjustColsDisplay(true);
					}
					if (this._summBand) {
						this._summBand._matrix._adjustColsDisplay(true);
					}

					this._autofiting = false;
					this._onResetScrollBar();
				}
			}
			this._applyResizer();
			return true;
		}
		return false;
	};

	_pGrid._resetColSizeList = function (chk_srow) {
		var change = false;

		if (this.autofittype != "col" && this.autofittype != "both" && this.autofittype != "allboth" && this.autofittype != "col,allrow") {
			var format = this._curFormat;

			if (!format) {
				return false;
			}

			var i, size, cols = format._cols, colsLen = cols.length;

			if (this.autosizingtype == "col" || this.autosizingtype == "both") {
				for (i = 0; i < colsLen; i++) {
					size = this._getMaxColDataSizeBand(i, chk_srow);

					if (size >= 0 && this._setColSize(-9, i, size, false, false, true, (i != colsLen - 1))) {
						change = true;
					}
				}

				if (this.autofittype == "col" || this.autofittype == "both" || this.autofittype == "allboth" || this.autofittype == "col,allrow") {
					this._applyAutofittype(true);
				}
			}
			else {
				for (i = 0; i < colsLen; i++) {
					size = cols[i].size;

					if (size >= 0 && this._setColSize(-9, i, size, false, false, true, (i != colsLen - 1))) {
						change = true;
					}
				}
			}
		}

		return change;
	};

	_pGrid.redraw = function () {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}

		this._recreate();

		if (this._select_ctrl) {
			this._select_ctrl._updateAll();
		}
	};

	_pGrid._getRowSizeInfo = function (datarow) {
		var format = this._curFormat;
		var rowsize, subrowsizes = [];

		if (datarow == -1) {
			rowsize = this._rowHeadList[0];
			subrowsizes = this._rowHeadListSub;

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		else if (datarow == -2) {
			rowsize = this._rowSummList[0];
			subrowsizes = this._rowSummListSub;

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		else if (datarow >= 0) {
			var rows = format._bodyrows;
			var rowsLen = rows.length;
			var list = this._rowSizeListSub = [];
			var listsub = this._rowSizeList = [];

			rowsize = list[datarow];

			for (var i = 0; i < rowsLen; i++) {
				subrowsizes[i] = listsub[datarow * rowsLen + i];
			}

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		return null;
	};

	_pGrid._resetRowSizeList = function (chk_srow) {
		if (!this._curFormat) {
			return;
		}

		var noauto = false;

		if (this.autosizingtype != "none" && !this._preloadImage()) {
			noauto = true;
		}

		var format = this._curFormat;

		if (format._headrows) {
			var keep = this._isUserChangeHeadRowSize;

			if (!keep) {
				this._rowHeadListSub = [];
				this._rowHeadList = [];
			}

			var h = 0, rows = format._headrows, rowsLen = rows.length, _rowHeadListSub = this._rowHeadListSub, _rowHeadList = this._rowHeadList, height;

			if (!(keep && _rowHeadList[0] >= 0)) {
				if (!noauto && this._binddataset && this._headAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
					for (var j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(-1, j);
						_rowHeadListSub[j] = height;
						h += height;
					}
				}
				else {
					for (var j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowHeadListSub[j] = height;
						h += height;
					}
				}
				this._rowHeadList[0] = h;
			}
		}

		if (format._summrows) {
			var keep = this._isUserChangeSummRowSize;

			if (!keep) {
				this._rowSummListSub = [];
				this._rowSummList = [];
			}

			var h = 0, rows = format._summrows, rowsLen = rows.length, _rowSummListSub = this._rowSummListSub, _rowSummList = this._rowSummList, height;

			if (!(keep && _rowSummList[0] >= 0)) {
				if (!noauto && this._binddataset && this._summAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
					for (var j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(-2, j);
						_rowSummListSub[j] = height;
						h += height;
					}
				}
				else {
					for (var j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowSummListSub[j] = height;
						h += height;
					}
				}
				this._rowSummList[0] = h;
			}
		}

		if (format._bodyrows) {
			var keep = this._isUserChangeBodyRowSize;

			if (!keep && !chk_srow) {
				this._rowSizeList = [];
				this._rowSizeListSub = [];
			}

			var rowcount = this._rowcount, rows = format._bodyrows, rowsLen = rows.length, _rowSizeListSub = this._rowSizeListSub, _rowSizeList = this._rowSizeList, h, height;

			if (!noauto && this._binddataset && this._bodyAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
				for (var i = 0; i < rowcount; i++) {
					if (keep && _rowSizeList[i] >= 0) {
						continue;
					}

					if (chk_srow >= 0 && i < chk_srow) {
						continue;
					}

					h = 0;

					for (var j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(i, j);
						_rowSizeListSub.push(height);
						h += height;
					}
					_rowSizeList[i] = h;
				}
				this._is_variable_bodyrowsize = true;
			}
			else {
				for (var i = 0; i < rowcount; i++) {
					if (keep && _rowSizeList[i] >= 0) {
						continue;
					}

					h = 0;

					for (var j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowSizeListSub.push(height);
						h += height;
					}
					_rowSizeList[i] = h;
				}

				if (!keep) {
					this._is_variable_bodyrowsize = false;
				}
			}
		}

		this._updateRowSizeExtend();
	};

	_pGrid._updateRowSizeExtendEx = function (rows, rowSizeList, rowSizeListSub, row, isbody) {
		if (this.extendsizetype != "row" && this.extendsizetype != "both") {
			if (!rows) {
				return;
			}

			var max = [];
			var rowsLen = rows.length;

			for (var j = 0; j < rowsLen; j++) {
				max[j] = 0;
			}

			var rowSizeListSubLen = rowSizeListSub.length;

			if (row != undefined) {
				for (var i = 0; i < rowsLen; i++) {
					max[i] = rowSizeListSub[row * rowsLen + i];
				}
			}
			else {
				for (var i = 0; i < rowSizeListSubLen; ) {
					for (var j = 0; j < rowsLen; j++) {
						max[j] = Math.max(max[j], rowSizeListSub[i]);
						i++;
					}
				}
			}
			for (var i = 0; i < rowSizeListSubLen; ) {
				for (var j = 0; j < rowsLen; j++) {
					rowSizeListSub[i] = max[j];
					i++;
				}
			}
			var height = 0;

			for (var j = 0; j < rowsLen; j++) {
				height += max[j];
			}

			var rowSizeListLen = rowSizeList.length;

			for (var i = 0; i < rowSizeListLen; i++) {
				rowSizeList[i] = height;
			}
		}

		if (isbody) {
			this._resetFixSize();
		}
	};

	_pGrid._updateRowSizeExtend = function () {
		if (!this._binddataset || !this._curFormat) {
			return;
		}
		if (this._headAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._headrows, this._rowHeadList, this._rowHeadListSub);
		}
		if (this._summAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._summrows, this._rowSummList, this._rowSummListSub);
		}
		if (this._bodyAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._bodyrows, this._rowSizeList, this._rowSizeListSub, undefined, true);
		}
	};

	_pGrid._isChangeBodyColSizeList = function (columnid, cols, row) {
		if (this.autosizingtype != "both" && this.autosizingtype != "col") {
			return false;
		}

		var format = this._curFormat;
		if (!this._binddataset || !format) {
			return false;
		}

		var cells = format._bodycells;
		var colinfo, col, size, j = 0;
		var retn = false;
		var displayType;

		for (var i = 0, n = cells.length; i < n; i++) {
			if (cells[i].text._bindexpr == columnid) {
				displayType = cells[i]._getAttrValue(cells[i].displaytype, row);

				if (displayType == "checkboxcontrol") {
					continue;
				}

				col = cells[i]._col;
				colinfo = format._cols[col];
				size = this._getMaxColDataSizeBand(col);

				if (colinfo.size != size) {
					format._setColSize(col, size);
					cols[j++] = col;
					retn = true;
				}
			}
		}
		return retn;
	};

	_pGrid._isChangeBodyRowSizeList = function (rowposition) {
		if (this._rowSizeEx == false && this.autosizingtype != "both" && this.autosizingtype != "row") {
			return false;
		}

		if (!this._binddataset || !this._curFormat) {
			return false;
		}

		var row = rowposition;
		var rows = this._curFormat._bodyrows;
		var rowsLen;

		if (rows && this._bodyAutoSize == true) {
			rowsLen = rows.length;
			for (var j = 0; j < rowsLen; j++) {
				var index = (row * rows.length) + j;
				var oldsize = this._rowSizeListSub[index];
				var newsize = this._getMaxSubRowSize(row, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}

		rows = this._curFormat._headrows;

		if (rows && this._headAutoSize == true) {
			rowsLen = rows.length;

			for (var j = 0; j < rowsLen; j++) {
				var oldsize = this._rowHeadListSub[j];
				var newsize = this._getMaxSubRowSize(-1, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}

		rows = this._curFormat._summrows;

		if (rows && this._summAutoSize == true) {
			rowsLen = rows.length;

			for (var j = 0; j < rowsLen; j++) {
				var oldsize = this._rowSummListSub[j];
				var newsize = this._getMaxSubRowSize(-2, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}
		return false;
	};

	_pGrid._updateBodyRowSizeList = function (rowposition) {
		var change = false;
		if (this._rowSizeEx == false || this._bodyAutoSize == false) {
			return false;
		}

		if (!this._binddataset || !this._curFormat || !this._curFormat._bodyrows || this._curFormat._bodyrows.length == 0) {
			return false;
		}

		var row = rowposition;
		var rows = this._curFormat._bodyrows;
		var rowsLen = rows.length;

		for (var j = 0; j < rowsLen; j++) {
			var index = (row * rows.length) + j;
			var oldsize = this._rowSizeListSub[index];
			var newsize = this._getMaxSubRowSize(row, j);

			if (oldsize != newsize) {
				this._rowSizeListSub[index] = newsize;
				this._rowSizeList[row] += (newsize - oldsize);
				change = true;
			}
		}
		if (change == true) {
			this._updateRowSizeExtend();
		}
		return change;
	};

	_pGrid._getGridRowCount = function (isOnlyScreen) {
		if (isOnlyScreen && this._bodyrowheight === 0) {
			return 0;
		}

		var rowcount = 0;
		if (this._hasTree) {
			if (this._treeIndexes) {
				rowcount = this._treeIndexes.length;
			}
		}
		else {
			rowcount = this._rowcount;
		}
		return rowcount;
	};

	_pGrid._resetDisplayInfo = function (reset_bandsize) {
		this.pagerowcount = 0;
		this._pagerowcnt = 0;
		this._disprowcnt = 0;

		var format = this._curFormat;

		if (!format) {
			return;
		}

		var bodysize = this._getBodyClientSize();
		var bodyHeight = bodysize[1];
		var rowcount = this._getGridRowCount();
		var format = this._curFormat;
		this._bodyrowheight = format._body_height;

		if (this._bodyrowheight > 0) {
			if (this._is_variable_bodyrowsize == false || rowcount == 0) {
				var format = this._curFormat;
				var bodyRowHeight = this._bodyrowheight;
				this.pagerowcount = Math.floor(bodyHeight / bodyRowHeight);
				this._pagerowcnt = Math.ceil(bodyHeight / bodyRowHeight);
			}
			else {
				var _vpos = (this._vscrollmng) ? this._vscrollmng._pos : 0;
				var vlimit = this._control_element.vscroll_limit;

				if (_vpos < 0) {
					_vpos = 0;
				}
				else if (_vpos > vlimit) {
					_vpos = vlimit;
				}

				var s, i, toprowpos = this._getScreenTopRowPos(_vpos);
				var remain;

				s = i = toprowpos[0];
				remain = toprowpos[1];

				var row = this._getDataRow(i);
				var h = 0 - (this._rowSizeList[row] - remain);

				for (; i < rowcount; i++) {
					row = this._getDataRow(i);
					h += this._rowSizeList[row];

					this._pagerowcnt++;

					if (h >= bodyHeight) {
						break;
					}

					this.pagerowcount++;
				}

				if (i == rowcount && h < bodyHeight) {
					var end = (this._fixed_endrow >= 0) ? this._fixed_endrow : -1;
					for (var i = s - 1; i > end; i--) {
						row = this._getDataRow(i);
						h += this._rowSizeList[row];

						this._pagerowcnt++;

						if (h >= bodyHeight) {
							break;
						}

						this.pagerowcount++;
					}
				}

				while (h < bodyHeight) {
					h += this._bodyrowheight;
					this._pagerowcnt++;

					if (h >= bodyHeight) {
						break;
					}

					this.pagerowcount++;
				}

				if (this._pagerowcnt == 0 && toprowpos[1] >= bodyHeight) {
					this._pagerowcnt = this.pagerowcount = 1;
				}
			}
			this._disprowcnt = this._pagerowcnt;
		}
	};

	_pGrid._getCellStyleInfo = function (cellidx, prop, datarow, selected) {
		var row = this._getGridRow(datarow);
		var format = this._curFormat;
		var cellinfos, bandid;

		if (datarow == -2) {
			cellinfos = format._summcells;
			bandid = "summary";
		}
		else if (datarow == -1) {
			cellinfos = format._headcells;
			bandid = "head";
		}
		else if (datarow >= 0) {
			cellinfos = format._bodycells;
			bandid = "body";
		}

		var band = this._style_tempband[bandid];
		if (!band) {
			band = this._style_tempband[bandid] = new nexacro.Component(bandid, 0, -10, 0, 0, null, null, null, null, null, null, this);
			band._skip_mobile_tabfocus = true;
			band._is_subcontrol = true;
			band._type_name = nexacro._GridBandControl.prototype._type_name;
			band.createComponent();

			band._org_on_destroy_contents = band.on_destroy_contents;
			band.on_destroy_contents = function () {
				this._org_on_destroy_contents();

				this._stylerow.destroy();
				this._stylerow = null;
			};
		}

		var rowc = band._stylerow;
		if (!rowc) {
			rowc = band._stylerow = new nexacro._GridRowControl(band, 0, -10, 0, 0, row, true);
			rowc._style_evecells = [];
			rowc._style_oddcells = [];
			rowc.createComponent();

			rowc._org_on_destroy_contents = rowc.on_destroy_contents;
			rowc.on_destroy_contents = function () {
				this._org_on_destroy_contents();

				for (var i = 0, n = this._style_evecells.length; i < n; i++) {
					this._style_evecells[i].destroy();
					this._style_evecells[i] = null;
				}

				this._style_evecells = null;

				for (var i = 0, n = this._style_oddcells.length; i < n; i++) {
					this._style_oddcells[i].destroy();
					this._style_oddcells[i] = null;
				}

				this._style_oddcells = null;
			};
		}
		else if (rowc._rowidx != row) {
			rowc._changeRow(row);
			rowc._updateAll();
		}

		var cell = (row % 2) ? rowc._style_oddcells[cellidx] : rowc._style_evecells[cellidx];
		if (!cell) {
			cell = new nexacro._GridCellControl("tempcell", 0, -10, 0, 0, null, null, rowc, cellinfos[cellidx], row, cellidx);
			cell.createComponent(true);
			cell._updateAll();
			(row % 2) ? rowc._style_oddcells[cellidx] = cell : rowc._style_evecells[cellidx] = cell;
		}
		else {
			cell._updateAll();
		}

		if (selected) {
			cell._changeUserStatus("selected", true);
		}

		var obj;

		if (prop == "background") {
			cell.on_created();
			obj = cell._control_element._getComputedStyleBackgroundColor();
		}
		else if (prop == "align") {
			cell.on_created();
			var align = cell._getCurrentStyleAlign();
			obj = align.textAlign + "," + align.verticalAlign;
		}
		else if (prop == "font" || prop == "color" || prop == "wordSpacing" || prop == "letterSpacing") {
			if (prop == "color") {
				cell.on_created();
			}

			var nstyle = cellinfos[cellidx][prop];

			if (nstyle && nstyle instanceof nexacro.BindableValue) {
				nstyle = nstyle._value;
			}

			obj = nstyle || cell._getCurrentStyleInheritValue(prop, "enabled");
		}
		else if (prop == "border") {
			obj = cell._getCurrentStyleBorder();
		}
		else {
			var nstyle = cellinfos[cellidx][prop];

			if (nstyle && nstyle instanceof nexacro.BindableValue) {
				nstyle = nstyle._value;
			}

			obj = nstyle || cell._getCSSStyleValue(prop, "enabled");
		}

		var setobj = obj;

		if (obj && typeof obj == "object") {
			if (obj && obj._bindtype > 0) {
				setobj = "bindexpr";
			}
			else {
				setobj = obj.value;
			}

			obj = obj.value;
		}

		if (prop == "font") {
			if (!selected) {
				cellinfos[cellidx]._curfont = setobj;
			}
			else {
				cellinfos[cellidx]._curselfont = setobj;
			}
		}
		else if (prop == "border") {
			cellinfos[cellidx]._curborder = setobj;
		}
		else if (prop == "padding") {
			cellinfos[cellidx]._curpadding = setobj;
		}

		return obj;
	};

	_pGrid._getMaxColSize = function (cells, colidx, row, parentcol, maxbyte) {
		var max = 0;
		var cellsLen = cells.length;
		var cursubcol, subcolcnt, subcells;
		var format = this._curFormat;
		var maxlength = 0;
		var col, colspan;

		for (var i = 0; i < cellsLen; i++) {
			col = cells[i]._col;
			colspan = cells[i]._colspan;

			if (col <= colidx && col + colspan > colidx) {
				subcells = cells[i]._subcells;

				if (subcells.length > 0) {
					var subsize = this._getMaxColSize(subcells, colidx - col, row, colidx, maxbyte);
					max = Math.max(max, subsize);
				}
				else {
					if (colspan > 1) {
						if (col + colspan - 1 != colidx) {
							continue;
						}
					}

					if (!parentcol) {
						parentcol = 0;
					}

					var treesize = 0;

					if (this._hasTree) {
						treesize = this._getDepthWidth(row, cells[i]);
					}

					if (treesize < 0) {
						return -1;
					}

					var autosizecol = cells[i]._getAttrValue(cells[i].autosizecol, row);
					var formatsize = format._cols[colidx + parentcol].orgsize;
					var size;

					if (autosizecol == "none") {
						size = formatsize;
					}
					else {
						var displayType = cells[i]._getAttrValue(cells[i].displaytype, row);
						if (displayType == "checkboxcontrol") {
							var controlSize = cells[i]._getCheckboxsize(row);

							if (controlSize == undefined) {
								controlSize = 14;
							}

							size = controlSize + 6;
						}
						else {
							var text = cells[i]._getDisplayText(row);

							if (text && maxbyte && colspan == 1 && !this._hasTree) {
								var re_newline = /\r\n|\n|\r/;
								var lines = text.split(re_newline);
								var lcnt = lines.length;
								var nbyte, max_byte = 0, max_len = 0;

								for (var j = 0; j < lcnt; j++) {
									nbyte = this._getByteLength_UTF8(lines[j]);
									max_len = Math.max(max_len, lines[j].length);
									max_byte = Math.max(max_byte, nbyte);
								}

								if (maxbyte.max > max_byte && maxbyte.len > max_len) {
									continue;
								}

								maxbyte.len = max_len;
								maxbyte.max = max_byte;
							}

							size = this._getCellRowTextSize(cells[i], row, text);
							size = size[0];
						}

						var padd = cells[i]._curpadding, bord = cells[i]._curborder;

						if (padd === "bindexpr" || padd === undefined) {
							padd = this._getCellStyleInfo(i, "padding", row);
						}

						if (bord === "bindexpr" || bord === undefined) {
							bord = this._getCellStyleInfo(i, "border", row);
						}

						if (padd) {
							padd = new nexacro._PaddingObject(padd);
							size += padd.left + padd.right;
						}
						if (bord) {
							bord = new nexacro._BorderObject(bord);
							size += bord.right._width;
						}

						size += treesize;

						if (autosizecol == "limitmin") {
							if (size < formatsize) {
								size = formatsize;
							}
						}
						else if (autosizecol == "limitmax") {
							if (size > formatsize) {
								size = formatsize;
							}
						}

						if (colspan > 1) {
							var t_colsize = 0;
							var s = col, e = col + colspan - 1;

							for (var j = s; j < e; j++) {
								t_colsize += format._cols[j + parentcol].size;
							}
							size -= t_colsize;
						}
					}
					max = Math.max(max, size);
				}
			}
		}
		return max + 1;
	};

	_pGrid._getCellRowTextSize = function (cellinfo, rowidx, text, parent_cellinfo) {
		var font = cellinfo._curfont, select_font = cellinfo._curselfont;
		var word = cellinfo._getWordwrap(rowidx);
		var size = [], size1, size2;

		if (!word) {
			word = this._getCellStyleInfo(cellinfo._cellidx, "wordWrap", rowidx);
		}

		if (font === undefined) {
			font = this._getCellStyleInfo(cellinfo._cellidx, "font", rowidx);
			font = new nexacro._FontObject(font);
			size1 = nexacro._getTextSize("A", font);

			if (cellinfo._curfont !== "bindexpr") {
				cellinfo._cur1font_size = size1;
			}
		}
		else {
			if (font === "bindexpr") {
				font = this._getCellStyleInfo(cellinfo._cellidx, "font", rowidx);
				font = new nexacro._FontObject(font);
				size1 = nexacro._getTextSize("A", font);
			}
			else {
				font = new nexacro._FontObject(font);
				if (!(size1 = cellinfo._cur1font_size)) {
					size1 = nexacro._getTextSize("A", font);
					cellinfo._cur1font_size = size1;
				}
			}
		}

		if (select_font === undefined) {
			select_font = this._getCellStyleInfo(cellinfo._cellidx, "font", rowidx, true);
			select_font = new nexacro._FontObject(select_font);
			size2 = nexacro._getTextSize("A", select_font);

			if (cellinfo._curselfont !== "bindexpr") {
				cellinfo._cur1selectfont_size = size2;
			}
		}
		else {
			if (select_font === "bindexpr") {
				select_font = this._getCellStyleInfo(cellinfo._cellidx, "font", rowidx, true);
				select_font = new nexacro._FontObject(select_font);
				size2 = nexacro._getTextSize("A", select_font);
			}
			else {
				select_font = new nexacro._FontObject(select_font);
				if (!(size2 = cellinfo._cur1selectfont_size)) {
					size2 = nexacro._getTextSize("A", select_font);
					cellinfo._cur1selectfont_size = size2;
				}
			}
		}

		var default_height, defalut_width;

		if (!text) {
			if (size1[0] <= size2[0]) {
				size = [].concat(size2);
			}
			else {
				size = [].concat(size1);
			}

			size[0] = 1;
			size[1] = Math.ceil(size[1]);
			return size;
		}
		else {
			if (size1[0] <= size2[0]) {
				font = select_font;
				defalut_width = size2[0];
				default_height = size2[1];
			}
			else {
				defalut_width = size1[0];
				default_height = size1[1];
			}
		}

		var displayType = cellinfo._getAttrValue(cellinfo.displaytype, rowidx);

		if (displayType == "imagecontrol") {
			var str = "row" + rowidx;
			var tempWidthsize = cellinfo._imgWidthTemp[str];
			var tempHeightsize = cellinfo._imgHeightTemp[str];

			if (tempWidthsize > 0) {
				size[0] = tempWidthsize;
				size[1] = tempHeightsize;
			}
			else {
				url = nexacro._getURIValue(text);
				url = nexacro._getImageLocation(url, this._getRefFormBaseUrl());

				var imgsize = nexacro._getImageSize(url, this._on_sizeloading, this);

				if (imgsize) {
					size[0] = imgsize.width;
					size[1] = imgsize.height;
				}
				else {
					size[0] = 1;
					size[1] = default_height;
				}
			}
			size[0] = Math.ceil(size[0]);
			size[1] = Math.ceil(size[1]);
			return size;
		}
		else {
			var usewordwrap = true;
			var ctrl_width = 0;

			if (this.autosizingtype == "col" || this.autosizingtype == "both") {
				usewordwrap = false;
			}

			var wordspacing = this._getCellStyleInfo(cellinfo._cellidx, "wordSpacing", rowidx);
			var letterspacing = this._getCellStyleInfo(cellinfo._cellidx, "letterSpacing", rowidx);
			var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, rowidx);

			if (expandshow == "show") {
				ctrl_width += cellinfo._getAttrValue(cellinfo.expandsize, rowidx);
			}

			if (usewordwrap && (this._autoSizeRowProc || this._rowSizeEx) && word != null && word != "none" && word != false && word != "false") {
				var cols = this._curFormat._cols;
				var colidx = (parent_cellinfo ? parent_cellinfo._col : 0) + cellinfo._col;
				var width = cols[colidx + cellinfo._colspan - 1].right - cols[colidx].left;
				var padd = this._getCellStyleInfo(cellinfo._cellidx, "padding", rowidx);
				var bord = this._getCellStyleInfo(cellinfo._cellidx, "border", rowidx);
				var select_bord = this._getCellStyleInfo(cellinfo._cellidx, "border", rowidx, true);

				if (bord) {
					bord = new nexacro._BorderObject(bord);
				}

				if (bord && select_bord) {
					select_bord = new nexacro._BorderObject(select_bord);
					bord = (bord.right._width < select_bord.right._width) ? select_bord : bord;
				}
				if (padd) {
					padd = new nexacro._PaddingObject(padd);
					width -= (padd.left + padd.right);
				}

				if (bord) {
					width -= bord.right._width;
				}

				size = nexacro._getTextSize(text, font, true, width, word, wordspacing, letterspacing);
			}
			else {
				size = nexacro._getTextSize(text, font, true, undefined, undefined, wordspacing, letterspacing);
			}

			size[0] += ctrl_width;

			if (size[1] < default_height) {
				size[1] = default_height;
			}

			size[0] = Math.ceil(size[0]);
			size[1] = Math.ceil(size[1]);
			return size;
		}
	};

	_pGrid._getMaxSubRowSize = function (rowidx, subrowidx, cells, parentrow, parent_cellinfo) {
		var format = this._curFormat;
		var bandrows;

		if (rowidx == -2) {
			if (!cells) {
				cells = this._curFormat._summcells;
			}
			;

			bandrows = format._summrows;
		}
		else if (rowidx == -1) {
			if (!cells) {
				cells = this._curFormat._headcells;
			}

			bandrows = format._headrows;
		}
		else {
			if (!cells) {
				cells = this._curFormat._bodycells;
			}

			bandrows = format._bodyrows;
		}

		var cols = this._curFormat._cols;

		if (!this._autoSizeRowProc && this.autosizingtype != "row" && this.autosizingtype != "both") {
			return bandrows[subrowidx].size;
		}

		var max = 0;
		var cellsLen = cells.length;
		var _row, _rowspan, subcells;

		for (var i = 0; i < cellsLen; i++) {
			_row = cells[i]._row;
			_rowspan = cells[i]._rowspan;
			subcells = cells[i]._subcells;

			if (_row == subrowidx || (subcells.length > 0 && _row <= subrowidx && (_row + _rowspan) > subrowidx)) {
				var maxrow = 0;
				var cursubrow = -1;
				var subrowcnt = 0;

				if (subcells.length > 0) {
					maxrow = this._getMaxSubRowSize(rowidx, subrowidx - _row, subcells, _row, cells[i]);
					max = Math.max(max, maxrow);
				}
				else {
					if (!parentrow) {
						parentrow = 0;
					}

					var autosizerow = cells[i]._getAttrValue(cells[i].autosizerow, rowidx);
					var formatsize = bandrows[subrowidx + parentrow].size;
					var size;

					if (autosizerow == "none") {
						size = formatsize;
					}
					else {
						var displayType = cells[i]._getAttrValue(cells[i].displaytype, rowidx);
						if (displayType == "checkboxcontrol") {
							var controlSize = cells[i]._getCheckboxsize(rowidx);

							if (controlSize == undefined) {
								controlSize = 14;
							}

							size = controlSize + 6;
						}
						else {
							var text = cells[i]._getDisplayText(rowidx);
							var s = this._getCellRowTextSize(cells[i], rowidx, text, parent_cellinfo);
							size = s[1];

							var width = s[0];
							var mul = 1;
							var padd = cells[i]._curpadding, bord = cells[i]._curborder;

							if (padd === "bindexpr" || padd === undefined) {
								padd = this._getCellStyleInfo(i, "padding", rowidx);
							}

							if (bord === "bindexpr" || bord === undefined) {
								bord = this._getCellStyleInfo(i, "border", rowidx);
							}

							if (padd) {
								padd = new nexacro._PaddingObject(padd);
								size += padd.top + padd.bottom;
							}
							if (bord) {
								bord = new nexacro._BorderObject(bord);
								size += bord.bottom._width;
							}
							if (autosizerow == "limitmin") {
								if (size < formatsize) {
									size = formatsize;
								}
							}
							else if (autosizerow == "limitmax") {
								if (size > formatsize) {
									size = formatsize;
								}
							}
						}
					}
					max = Math.max(max, size);
				}
			}
		}
		return max;
	};

	_pGrid._getSubRowSizeList = function (row) {
		var format = this._curFormat;
		var rows = format._bodyrows;
		var rowsLen = rows.length;
		var sizes = [], j = 0;

		for (var i = 0; i < rowsLen; i++) {
			sizes[j++] = this._rowSizeListSub[row * rowsLen + i];
		}

		return sizes;
	};

	_pGrid._makeCssRefInfoCtrl = function (ctrl) {
		ctrl._refcssobj = this;
		ctrl._refcssid = "#" + ctrl.id;
		return this;
	};

	_pGrid._addFuncQueue = function (work, pthis, func, args_arr) {
		var info = {
			work : work, 
			pthis : pthis, 
			func : func, 
			args : args_arr
		};
		this._func_queue.push(info);
	};

	_pGrid._exeFuncQueue = function (work) {
		var arr = this._func_queue;

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].work == work) {
				arr[i].func.call(arr[i].pthis, arr[i].args);
				this._func_queue.splice(i, 1);
				i--;
			}
		}
	};

	_pGrid._addRefreshContents = function (workname, band, check) {
		if (band) {
			var arr = this._recreate_contents_proc;

			if (check) {
				for (var i = 0, n = arr.length; i < n; i++) {
					if (arr[i].workname == workname) {
						return false;
					}
				}
			}
			var add = {
				workname : workname, 
				band : band
			};
			arr.push(add);

			return true;
		}
	};

	_pGrid._execRefreshContents = function (workname, bclearcache, noupdatesupp) {
		var arr = this._recreate_contents_proc;

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].workname == workname) {
				arr[i].band._recreate_contents(false, false, false, noupdatesupp);
				this._recreate_contents_proc.splice(i, 1);
				i--;
			}
		}
	};

	_pGrid._applyColSizing = function (movepos, idx) {
		if (!this.enableredraw) {
			return;
		}

		var control_elem = this.getElement();
		var format = this._curFormat;

		if (control_elem && format && idx >= 0) {
			var band = this._headBand;
			var rows = band._get_rows();
			var cellitem = rows[0]._cells[idx];
			var cellinfo = cellitem._refinfo;

			var colidx = cellinfo._col + (cellinfo._colspan - 1);
			var area = format._cols[colidx]._area;

			if (cellinfo._area != "right") {
				var prevright = format._cols[colidx].left;
				var currright = format._cols[colidx].right + movepos;

				if (prevright > currright) {
					var next_col = format._cols[colidx + 1];
					if ((next_col && next_col._area == "right") || colidx == format._cols.length - 1) {
						movepos = prevright - format._cols[colidx].right + 7;
					}
					else {
						movepos = prevright - format._cols[colidx].right + 1;
					}
				}
			}
			else {
				var nextleft = format._cols[colidx].right;
				var currleft = format._cols[colidx].left + movepos;

				if (nextleft < currleft) {
					movepos = nextleft - format._cols[colidx].left - 1;
				}

				movepos = 0 - movepos;
			}

			var oldval = format._cols[colidx].size;
			var change = format._adjustColSizing(colidx, movepos);
			var newval = format._cols[colidx].size;

			if (change) {
				this._updateColSize(colidx);
				this._isUserChangeColSize = true;
				this._addFuncQueue("colsizing", this, this.on_fire_oncolresized, [colidx, -9, newval, oldval, colidx]);
			}
		}
	};

	_pGrid._applyRowSizing = function (movepos, idx) {
		if (this.enableredraw == false) {
			return;
		}

		var control_elem = this.getElement();
		var formatidx, oldval, newval;
		var format = this._curFormat;

		if (format && control_elem && idx >= 0) {
			var range = this._resizerRowRange[idx];
			var bandstr = range.area, size;
			var row = this._getDataRow(range.row);
			var subrow = range.cellinfo._row + range.cellinfo._rowspan - 1;
			var change = false;

			if (bandstr == "head") {
				oldval = this._rowHeadListSub[subrow];
				size = oldval + movepos;
				size = Math.max(size, 5);
				size = Math.min(size, this._getClientHeight() - 5);
				newval = size;

				var redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(-1, size, subrow, true);
				this.enableredraw = redraw;
				formatidx = subrow;

				if (movepos) {
					this._resizeBand();
					this._addRefreshContents("rowsizing", this._headBand);
					change = true;
				}
			}
			else if (bandstr == "body") {
				oldval = this._rowSizeListSub[row * format._bodyrows.length + subrow];
				size = oldval + movepos;

				var gap, remain;

				if (row == this._rowcount - 1) {
					remain = 7;
				}
				else {
					remain = 1;
				}

				gap = size - remain;

				if (gap < 0) {
					size = remain;
					movepos -= gap;
				}

				newval = size;

				if (this._getFixRowCnt() > row) {
					this._fixed_height += movepos;
					this._fixedrow_height += movepos;
				}

				var redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(row, size, subrow, true);
				this.enableredraw = redraw;
				formatidx = subrow + ((format._headrows) ? format._headrows.length : 0);

				if (movepos) {
					if (this.extendsizetype != "row" && this.extendsizetype != "both") {
						this._addRefreshContents("rowsizing", this._bodyBand);
					}
					else {
						this._updateRowSize(row, subrow);
					}
					change = true;
				}
			}
			else if (bandstr == "summ") {
				oldval = this._rowSummListSub[subrow];

				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					size = oldval + movepos;
				}
				else {
					size = oldval - movepos;
				}

				size = Math.max(size, 5);
				size = Math.min(size, this._getClientHeight() - 5);
				newval = size;

				var redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(-2, size, subrow, true);
				this.enableredraw = redraw;
				formatidx = subrow + ((format._headrows) ? format._headrows.length : 0) + ((format._bodyrows) ? format._bodyrows.length : 0);

				if (movepos) {
					this._resizeBand();
					this._addRefreshContents("rowsizing", this._summBand);
					change = true;
				}
			}

			if (change) {
				this._addFuncQueue("rowsizing", this, this.on_fire_onrowresized, [formatidx, row, newval, oldval, subrow]);
			}
		}
	};

	_pGrid._no_update_bandrect = false;
	_pGrid._updateColSize = function (col) {
		var reset_bandsize = false;
		if (this.autosizingtype == "row" || this.autosizingtype == "both") {
			this._resetRowSizeList();
			var flag = this._no_update_bandrect;
			this._no_update_bandrect = true;
			this._resizeBand(true);
			this._no_update_bandrect = flag;

			reset_bandsize = true;
			col = null;
		}

		this._autofitcol_rate = [];
		this._applyAutofittype(true);

		if (this._getScrollLeft() != 0) {
			col = 0;
		}


		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay(true, true);
			this._headBand._matrix._adjustRowsDisplay(reset_bandsize);
		}

		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay(true, true);
			this._summBand._matrix._adjustRowsDisplay(reset_bandsize);
		}

		if (this._bodyBand) {
			var _vpos = this._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			this._last_scroll_top = _vpos;
			this._toprowpos = this._getScreenTopRowPos(_vpos);
			this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

			this._bodyBand._matrix._adjustColsDisplay(true, true);
			this._bodyBand._matrix._adjustRowsDisplay(reset_bandsize);

			this._bodyBand._update_rows = this._bodyBand._matrix._adjustScrollRows(_vpos, true);
			this._bodyBand._on_refresh_rows(false, true);
			this._adjustOverlayElements(false, this._is_use_fakemerge);
		}
		this._resetScrollMax();
	};

	_pGrid._updateRowSize = function (row, subrow, no_refresh_band) {
		if (this.extendsizetype != "row" && this.extendsizetype != "both") {
			return;
		}

		var format = this._curFormat;

		if (row == -1) {
			if (!this._headBand) {
				return false;
			}

			var rowctrl = this._headBand._get_rows()[0];
			var rowsize = this._rowHeadList[0];
			var subrowsize = this._rowHeadListSub[subrow];
			var updatesize = 0;

			rowctrl.set_height(rowsize);
			rowctrl._init(format);

			var cells = rowctrl._cells;
			for (var j = 0, n = cells.length; j < n; j++) {
				var _row = cells[j]._refinfo._row, _rowspan = cells[j]._refinfo._rowspan;
				var subrowsize = 0;

				if (_row <= subrow && subrow < _row + _rowspan) {
					for (var k = _row; k < _row + _rowspan; k++) {
						subrowsize += this._rowHeadListSub[k];
					}
					updatesize = subrowsize - cells[j]._height;
					cells[j].set_height(subrowsize);
				}
				else if (_row > subrow) {
					cells[j].set_top(cells[j]._top + updatesize);
				}
			}

			this._resizeBand();

			if (this._bodyBand && !no_refresh_band) {
				this._bodyBand._matrix._adjustRowsDisplay();
				this._bodyBand._matrix._adjustColsDisplay();
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else if (row == -2) {
			if (!this._summBand) {
				return false;
			}

			var rowctrl = this._summBand._get_rows()[0];
			var rowsize = this._rowSummList[0];
			var subrowsize = this._rowSummListSub[subrow];
			var updatesize = 0;

			rowctrl.set_height(rowsize);
			rowctrl._init(format);

			var cells = rowctrl._cells;
			for (var j = 0, n = cells.length; j < n; j++) {
				var _row = cells[j]._refinfo._row, _rowspan = cells[j]._refinfo._rowspan;
				var subrowsize = 0;

				if (_row <= subrow && subrow < _row + _rowspan) {
					for (var k = _row; k < _row + _rowspan; k++) {
						subrowsize += this._rowSummListSub[k];
					}
					updatesize = subrowsize - cells[j]._height;
					cells[j].set_height(subrowsize);
				}
				else if (_row > subrow) {
					cells[j].set_top(cells[j]._top + updatesize);
				}
			}

			this._resizeBand();

			if (this._bodyBand && !no_refresh_band) {
				this._bodyBand._matrix._adjustRowsDisplay();
				this._bodyBand._matrix._adjustColsDisplay();
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else if (row >= 0) {
			if (!this._bodyBand) {
				return false;
			}

			var rows = this._bodyBand._get_rows();
			var rowctrl;

			for (var i = 0, n = rows.length; i < n; i++) {
				if (rows[i]._rowidx == row) {
					rowctrl = rows[i];
					break;
				}
			}

			if (!rowctrl) {
				return false;
			}

			rowctrl._init(format);

			if (this._fixed_height) {
				this._bodyBand._control_element._setFixArea(this._fixed_height);
			}

			var datarow = this._getDataRow(row);
			var rowsize = this._rowSizeList[datarow];
			var rowslen = this._curFormat._bodyrows.length;
			var updatesize = 0;

			rowctrl.set_height(rowsize);

			var cells = rowctrl._cells;
			for (var j = 0, n = cells.length; j < n; j++) {
				var _row = cells[j]._refinfo._row, _rowspan = cells[j]._refinfo._rowspan;
				var subrowsize = 0;

				if (_row <= subrow && subrow < _row + _rowspan) {
					for (var k = _row; k < _row + _rowspan; k++) {
						subrowsize += this._rowSizeListSub[datarow * rowslen + k];
					}
					updatesize = subrowsize - cells[j]._height;
					cells[j].set_height(subrowsize);
				}
				else if (_row > subrow) {
					cells[j].set_top(cells[j]._top + updatesize);
				}
			}

			var _vpos = this._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			if (!no_refresh_band) {
				this._last_scroll_top = _vpos;
				this._toprowpos = this._getScreenTopRowPos(_vpos);
				this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

				this._bodyBand._matrix._adjustRowsDisplay(true);
				this._bodyBand._matrix._adjustColsDisplay();

				this._bodyBand._update_rows = this._bodyBand._matrix._adjustScrollRows(_vpos, true);
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else {
			return false;
		}

		this._adjustOverlayElements(false, this._is_use_fakemerge);
		return true;
	};

	_pGrid._applyResizer = function () {
		if (!this._is_created) {
			return;
		}

		var curborder = this._border || this._getCSSStyleValue("border", this._status);
		var lborder_w = (curborder) ? curborder.left._width : 0;
		var tborder_w = (curborder) ? curborder.top._width : 0;

		if (this.cellsizingtype == "col" || this.cellsizingtype == "both") {
			var band = this._headBand;

			if (band == null) {
				return;
			}

			var rows = band._get_rows();

			if (rows.length == 0) {
				return;
			}

			var cellcnt = rows[0]._cells.length;
			var left, top, width, height;
			var cellitem, cellborder, cellinfo, cellpos;
			var resizermark_arr = this._resizerColRange = [];
			var resizermark_range = {
			};
			var mark_idx = 0;
			var resizer_colctrl = this._resizer_colctrl;
			var format = this._curFormat;

			if (resizer_colctrl) {
				resizer_colctrl.destroy();
				delete resizer_colctrl;
			}
			resizer_colctrl = new nexacro._GridResizerControl("resizertrack", 0, 0, 0, 0, null, null, this);

			resizer_colctrl._setDirection("horizon");
			resizer_colctrl._setTracksize(this._getClientHeight());
			resizer_colctrl._setCallbackFn(this._applyColSizing);
			resizer_colctrl.createComponent();
			this._resizer_colctrl = resizer_colctrl;

			for (var j = 0; j < cellcnt; j++) {
				cellitem = rows[0]._cells[j];

				if (!cellitem) {
					break;
				}

				cellinfo = cellitem._refinfo;
				cellpos = cellitem._setPositionInGrid(null, true, true);
				height = cellpos.height;
				cellborder = cellitem._refinfo._border || cellitem._getCSSStyleValue("border", cellitem._stauts);

				if (cellinfo._area == "left" || cellinfo._area == "body") {
					width = cellborder ? cellborder.right._width : 0;
					left = cellpos.left + cellitem._adjust_width - width - 4;
				}
				else {
					width = cellborder ? cellborder.left._width : 0;
					left = cellpos.left - 2;
				}

				resizermark_range = {
					left : left + lborder_w, 
					top : cellpos.top + tborder_w, 
					right : left + width + lborder_w + 6, 
					bottom : cellpos.top + height + tborder_w, 
					index : cellitem._cellidx, 
					area : cellinfo._area
				};

				switch (this.cellsizebandtype) {
					case "body":
						if (cellinfo._area == "body") {
							resizermark_arr[mark_idx++] = resizermark_range;
						}
						break;
					case "allband":
					case "nohead":
						resizermark_arr[mark_idx++] = resizermark_range;
						break;
					case "noleft":
					case "nohead,noleft":
						if (cellinfo._area != "left") {
							resizermark_arr[mark_idx++] = resizermark_range;
						}
						break;
				}
			}
		}
		else {
			var resizer_colctrl = this._resizer_colctrl;
			if (resizer_colctrl) {
				resizer_colctrl.destroy();
				this._resizer_colctrl = null;
				this._resizerColRange = [];
			}
		}

		if (this.cellsizingtype == "row" || this.cellsizingtype == "both") {
			var head = this._headBand;
			var body = this._bodyBand;
			var summ = this._summBand;
			var rows, cellitem, cellborder, cellinfo, cellpos, i;

			if (!head && !body && !summ) {
				return;
			}

			var resizermark_arr = this._resizerRowRange = [];
			var resizermark_range = {
			};
			var mark_idx = 0;
			var resizer_rowctrl = this._resizer_rowctrl;

			if (resizer_rowctrl) {
				resizer_rowctrl.destroy();
				delete resizer_rowctrl;
			}

			resizer_rowctrl = new nexacro._GridResizerControl("resizertrack", 0, 0, 0, 0, null, null, this);
			resizer_rowctrl._setDirection("vertical");
			resizer_rowctrl._setTracksize(this._getClientWidth());
			resizer_rowctrl._setCallbackFn(this._applyRowSizing);
			resizer_rowctrl.createComponent();
			this._resizer_rowctrl = resizer_rowctrl;

			while (head) {
				if (this.cellsizebandtype == "body" || this.cellsizebandtype == "nohead" || this.cellsizebandtype == "nohead,noleft") {
					break;
				}

				rows = head._get_rows();

				if (!rows.length) {
					break;
				}

				var cell_len = rows[0]._cells.length;

				for (i = 0; i < cell_len; i++) {
					cellitem = rows[0]._cells[i];
					cellinfo = cellitem._refinfo;

					cellpos = cellitem._setPositionInGrid(null, true, true);

					width = cellitem._adjust_width;
					cellborder = cellitem._refinfo._border || cellitem._getCSSStyleValue("border", cellitem._status);

					height = cellborder ? cellborder.bottom._width : 0;
					top = cellpos.top + cellitem._adjust_height - height - 4;

					resizermark_range = {
						left : cellpos.left + lborder_w, 
						top : top + tborder_w, 
						right : cellpos.left + width + lborder_w, 
						bottom : top + height + 6 + tborder_w, 
						index : mark_idx, 
						area : "head", 
						row : cellitem._rowidx, 
						cellinfo : cellinfo
					};
					resizermark_arr[mark_idx++] = resizermark_range;
				}
				break;
			}

			if (body) {
				rows = body._get_rows();
				var rows_len = rows.length;
				var cell_len = rows_len > 0 ? rows[0]._cells.length : 0;

				for (i = 0; i < rows_len; i++) {
					for (var j = 0; j < cell_len; j++) {
						cellitem = rows[i]._cells[j];
						cellinfo = cellitem._refinfo;

						cellpos = cellitem._setPositionInGrid(null, true, true);

						width = cellitem._adjust_width;
						cellborder = cellitem._refinfo._border || cellitem._getCSSStyleValue("border", cellitem._status);

						height = cellborder ? cellborder.bottom._width : 0;
						top = cellpos.top + cellitem._adjust_height - height - 4;

						resizermark_range = {
							left : cellpos.left + lborder_w, 
							top : top + tborder_w, 
							right : cellpos.left + width + lborder_w, 
							bottom : top + height + 6 + tborder_w, 
							index : mark_idx, 
							area : "body", 
							row : cellitem._rowidx, 
							cellinfo : cellinfo
						};
						resizermark_arr[mark_idx++] = resizermark_range;
					}
				}
			}

			while (summ) {
				if (this.cellsizebandtype == "body") {
					break;
				}

				rows = summ._get_rows();

				if (!rows.length) {
					break;
				}

				var cell_len = rows[0]._cells.length;

				for (i = 0; i < cell_len; i++) {
					cellitem = rows[0]._cells[i];
					cellinfo = cellitem._refinfo;
					cellpos = cellitem._setPositionInGrid(null, true, true);
					width = cellitem._adjust_width;
					cellborder = cellitem._refinfo._border || cellitem._getCSSStyleValue("border", cellitem._status);

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						height = cellborder ? cellborder.bottom._width : 0;
						top = cellpos.top + cellitem._adjust_height - height - 4;
					}
					else {
						height = cellborder ? cellborder.top._width : 0;
						top = cellpos.top - 2;
					}

					resizermark_range = {
						left : cellpos.left + lborder_w, 
						top : top + tborder_w, 
						right : cellpos.left + width + lborder_w, 
						bottom : top + height + 6 + tborder_w, 
						index : mark_idx, 
						area : "summ", 
						row : cellitem._rowidx, 
						cellinfo : cellinfo
					};
					resizermark_arr[mark_idx++] = resizermark_range;
				}
				break;
			}
		}
		else {
			var resizer_rowctrl = this._resizer_rowctrl;
			if (resizer_rowctrl) {
				resizer_rowctrl.destroy();
				this._resizer_rowctrl = null;
				this._resizerRowRange = [];
			}
		}
	};

	_pGrid._isAreaSelect = function () {
		if (this.selecttype == "area" || this.selecttype == "multiarea") {
			return true;
		}

		return false;
	};

	_pGrid._isSelectRowType = function () {
		if (this.selecttype == "row" || this.selecttype == "multirow") {
			return true;
		}

		return false;
	};

	_pGrid._isMultiSelect = function () {
		if (this.selecttype == "multirow" || this.selecttype == "multicell" || this.selecttype == "multitreecell" || this.selecttype == "multiarea") {
			return true;
		}

		return false;
	};

	_pGrid._setColSize = function (nPivotIndex, nColIndex, nSize, bBandIndex, bRedraw, autosize, noAdjust) {
		var format = this._curFormat;

		var leftcnt = this._getColFixCnt("left");
		var bodycnt = this._getColFixCnt("body");
		var rightcnt = this._getColFixCnt("right");
		var _cols = format._cols;
		var _colsLen = _cols.length;

		var areatype = "body";

		if (typeof (nPivotIndex) != "string") {
			if (nPivotIndex == -1) {
				areatype = "left";
			}
			else if (nPivotIndex == -2) {
				areatype = "right";
			}
		}
		else {
			areatype = nPivotIndex;
		}

		if (bBandIndex == true || nPivotIndex >= -2) {
			if (areatype == "body" && nColIndex >= 0) {
				nColIndex += leftcnt;
			}
			else if (areatype == "right") {
				nColIndex += leftcnt;
				nColIndex += bodycnt;
			}
		}

		var bChange = false;
		if (nColIndex == -1) {
			var change;
			for (var i = 0; i < _colsLen; i++) {
				if (autosize) {
					if (_cols[i]._area == "left" && this._AutoSizeLcol == false) {
						continue;
					}

					if (_cols[i]._area == "right" && this._AutoSizeRcol == false) {
						continue;
					}
				}

				change = format.setFormatColProperty(i, "size", nSize);

				if (change) {
					bChange = change;
					this._autofitcol_rate = [];

					if (bRedraw) {
						this._recreate_contents_all(true, false);
					}
				}
			}
		}
		else {
			while (true) {
				if (autosize) {
					if (_cols[nColIndex]._area == "left" && this._AutoSizeLcol == false) {
						break;
					}

					if (_cols[nColIndex]._area == "right" && this._AutoSizeRcol == false) {
						break;
					}
				}
				if (bChange = format._setColSize(nColIndex, nSize, noAdjust)) {
					if (bRedraw) {
						this._updateColSize(nColIndex);
					}
				}
				break;
			}
		}

		return bChange;
	};

	_pGrid._getLastRowBand = function () {
		var format = this._curFormat;
		var band = "body";

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			if (format._headrows && format._headrows.length) {
				band = "head";
			}

			if (format._summrows && format._summrows.length) {
				band = "summ";
			}

			if (format._bodyrows && format._bodyrows.length) {
				band = "body";
			}
		}
		else {
			if (format._headrows && format._headrows.length) {
				band = "head";
			}

			if (format._bodyrows && format._bodyrows.length) {
				band = "body";
			}

			if (format._summrows && format._summrows.length) {
				band = "summ";
			}
		}
		return band;
	};

	_pGrid._getDispRowCnt = function () {
		if (this._bodyBand) {
			return this._bodyBand._get_rows().length;
		}

		return 0;
	};

	_pGrid._getScreenBottomRowPos = function (vpos) {
		if (!this._is_use_suppress) {
			return -1;
		}

		var band = this._bodyBand;
		var scrolltop = (vpos != null) ? vpos : this._getScrollTop();
		var row = -1;
		var height = 0;
		var cnt = this._getGridRowCount();
		var bandh = this._getAvailableRect(band).height;

		for (var i = 0; i < cnt; i++) {
			if (i <= this._fixed_endrow) {
				continue;
			}

			height += this._getRowSize(i);

			if (height >= scrolltop + bandh) {
				row = i;
				break;
			}
		}
		return row;
	};

	_pGrid._getScreenTopRowPos = function (vpos) {
		var band = this._bodyBand;
		var scrolltop = (vpos != null) ? vpos : this._getScrollTop();
		var row = 0;
		var height = 0;
		var cnt = this._getGridRowCount();
		var remain = 0;
		var bset = false;

		for (var i = 0; i < cnt; i++) {
			if (i <= this._fixed_endrow) {
				continue;
			}

			if (height > scrolltop) {
				row = i - 1;
				remain = height - scrolltop;
				bset = true;
				break;
			}
			height += this._getRowSize(i);
		}

		if (!bset) {
			if (band._getClientHeight() < height) {
				if (height > scrolltop) {
					row = i - 1;
					remain = height - scrolltop;
				}
			}
			else {
				row = this._getFixRowCnt();
				remain = 0;
			}
		}
		return [row, remain];
	};

	_pGrid._isRemainAreaScroll = function () {
		var band = this._bodyBand;
		var rows = band._get_rows();

		if (rows.length == 0) {
			return false;
		}

		var scrolltop = this._getScrollTop();
		var height = 0;
		var rows_len = rows.length;
		var lastrow = rows[rows_len - 1];
		var lastrowidx = this._getGridRowCount() - 1;

		if (lastrow._rowidx != lastrowidx) {
			return false;
		}

		var bodyheight = this._getBodyClientSize()[1];
		var lasttoprow = 0;

		for (var i = rows.length - 1; i >= 0; i--) {
			lasttoprow = rows[i]._rowidx;
			height += this._getRowSize(lasttoprow);

			if (height >= bodyheight) {
				break;
			}
		}

		scrolltop -= rows[0]._adjust_top;

		for (i = 0; i < rows_len; i++) {
			if (height == scrolltop) {
				return false;
			}
			else if (height > scrolltop) {
				if (lasttoprow == rows[i]._rowidx - 1) {
					return true;
				}
				else {
					return false;
				}
			}
			height += this._getRowSize(rows[i]._rowidx);
		}
		return false;
	};

	_pGrid._getScollMaxLeft = function () {
		if (this._control_element) {
			return this._control_element.hscroll_limit;
		}

		return 0;
	};

	_pGrid._getScrollLeft = function () {
		if (this._control_element) {
			return this._control_element.scroll_left;
		}

		return 0;
	};

	_pGrid._getScrollTop = function () {
		if (this._control_element) {
			return this._control_element.scroll_top;
		}

		return 0;
	};

	_pGrid._getDataRow = function (rowidx) {
		if (rowidx >= this._rowcount) {
			return -9;
		}

		if (this._hasTree && rowidx >= 0) {
			rowidx = this._treeIndexes[rowidx];
			if (rowidx == undefined) {
				rowidx = -9;
			}
		}
		return rowidx;
	};

	_pGrid._getGridRow = function (datarow) {
		if (this._hasTree && datarow >= 0) {
			var _treeIndexes = this._treeIndexes;
			var _treeIndexesLen = _treeIndexes.length;

			for (var k = 0; k < _treeIndexesLen; k++) {
				if (_treeIndexes[k] == datarow) {
					return k;
				}
			}
			return -9;
		}
		return datarow;
	};

	_pGrid._refreshCol = function (nColIdx, clearCurstyle, strBand) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refreshall = true;
			return;
		}
		if (!this.getElement()) {
			return;
		}

		var band = this._headBand;
		if (band && (!strBand || strBand == "head")) {
			var cells = band._get_rows()[0];
			var cellsLen = cells.length;

			for (var i = 0; i < cellsLen; i++) {
				var cell = cells[i];
				if (cell && cell._refinfo._col == nColIdx) {
					if (clearCurstyle) {
					}
					cell._updateAll();
				}
			}
		}
		band = this._summBand;
		if (band && (!strBand || strBand == "summ")) {
			var cells = band._get_rows()[0];
			var cellsLen = cells.length;

			for (var i = 0; i < cellsLen; i++) {
				var cell = cells[i];
				if (cell && cell._refinfo._col == nColIdx) {
					if (clearCurstyle) {
					}
					cell._updateAll();
				}
			}
		}
		band = this._bodyBand;
		var rows = band._get_rows();
		if (band && rows.length && (!strBand || strBand == "body")) {
			var cells = rows[0]._cells;
			var cellsLen = cells.length;

			for (var i = 0; i < cellsLen; i++) {
				var cell = cells[i];
				if (cell && cell._refinfo._col == nColIdx) {
					for (var j = 0, nn = this._getDispRowCnt(); j < nn; j++) {
						this._refreshCell("body", cell._cellidx, j);
					}
				}
			}
		}
	};

	_pGrid._refreshCell = function (strBand, nCellIdx, nDisplayRowIdx, styleprop, nSubCellIdx) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refreshall = true;
			return;
		}

		strBand = strBand.toLowerCase();
		if (strBand == "head") {
			var band = this._headBand;
			if (band) {
				var cell = band._get_rows()[0]._cells[nCellIdx];
				if (cell) {
					if (nSubCellIdx >= 0) {
						var subcellinfo = cell._refinfo._subcells[nSubCellIdx];
						if (styleprop && subcellinfo && cell.subcells[nSubCellIdx]["set_" + styleprop]) {
							cell.subcells[nSubCellIdx]["set_" + styleprop](subcellinfo._getAttrValue(subcellinfo[styleprop], this._currentDSrow));
						}
					}
					else {
						var cellinfo = cell._refinfo;
						if (styleprop && cell["set_" + styleprop]) {
							cell["set_" + styleprop](cellinfo._getAttrValue(cellinfo[styleprop], this._currentDSrow));
						}
					}

					cell._updateAll();
				}
			}
		}
		else if (strBand == "summ" || strBand == "summary") {
			var band = this._summBand;
			if (band) {
				var cell = band._get_rows()[0]._cells[nCellIdx];
				if (cell) {
					if (nSubCellIdx >= 0) {
						var subcellinfo = cell._refinfo._subcells[nSubCellIdx];
						if (styleprop && subcellinfo && cell.subcells[nSubCellIdx]["set_" + styleprop]) {
							cell.subcells[nSubCellIdx]["set_" + styleprop](subcellinfo._getAttrValue(subcellinfo[styleprop], this._currentDSrow));
						}
					}
					else {
						var cellinfo = cell._refinfo;
						if (styleprop && cell["set_" + styleprop]) {
							cell["set_" + styleprop](cellinfo._getAttrValue(cellinfo[styleprop], this._currentDSrow));
						}
					}
					cell._updateAll();
				}
			}
		}
		else {
			if (nDisplayRowIdx >= 0) {
				this._refreshBodyCell(nCellIdx, nDisplayRowIdx, styleprop, nSubCellIdx);
			}
			else {
				for (var i = 0, n = this._getDispRowCnt(); i < n; i++) {
					this._refreshBodyCell(nCellIdx, i, styleprop, nSubCellIdx);
				}
			}
		}
	};

	_pGrid._isEnable = function () {
		this._enable = nexacro.Component.prototype._isEnable.call(this);
		return this._enable;
	};

	_pGrid._getMaxColDataSizeBand = function (nColIndex, chk_srow) {
		var totalmax = -1;
		var format = this._curFormat;

		if (this._bodyAutoSize) {
			var max = -1;

			if (this._binddataset) {
				var rowcount = this._getGridRowCount();

				if (rowcount > 0 && format._bodycells) {
					if (!this._preloadTreeImage()) {
						return -1;
					}

					if (!this._preloadImage()) {
						return -1;
					}

					var cells = format._bodycells;
					var cellsLen = cells.length;
					var colcells = [];
					var size;
					var maxbyte = {
						max : -1, 
						len : -1
					};
					var bfont, bselfont, bborder, bpadding;
					var cellinfo, prevcellinfo, subcells, subcol;

					for (var i = 0; i < cellsLen; i++) {
						cellinfo = cells[i];

						if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
							if (cellinfo != prevcellinfo) {
								colcells.push(cellinfo);
							}

							prevcellinfo = cellinfo;

							if (cellinfo._subcells.length) {
								subcells = cellinfo._subcells;

								for (var j = 0, nn = subcells.length; j < nn; j++) {
									if (cellinfo._col + subcells[j]._col <= nColIndex && (cellinfo._col + subcells[j]._col + subcells._colspan) > nColIndex) {
										cellinfo = subcells[j];
										break;
									}
								}
							}

							if (maxbyte) {
								if (cellinfo._curfont === undefined) {
									this._getCellStyleInfo(cellinfo._cellidx, "font", 0, false);
								}
								if (cellinfo._curselfont === undefined) {
									this._getCellStyleInfo(cellinfo._cellidx, "font", 0, true);
								}
								if (cellinfo._curborder === undefined) {
									this._getCellStyleInfo(cellinfo._cellidx, "border", 0, false);
								}
								if (cellinfo._curpadding === undefined) {
									this._getCellStyleInfo(cellinfo._cellidx, "padding", 0);
								}

								if (cellinfo._curfont === "bindexpr" || cellinfo._curselfont === "bindexpr" || cellinfo._curborder === "bindexpr" || cellinfo._curpadding === "bindexpr") {
									maxbyte = null;
									continue;
								}
								else if (bfont !== undefined) {
									if ((bfont != cellinfo._curfont) || (bselfont != cellinfo._curselfont) || (bborder != cellinfo._curborder) || (bpadding != cellinfo._curpadding)) {
										maxbyte = null;
										continue;
									}
								}

								bfont = cellinfo._curfont;
								bselfont = cellinfo._curselfont;
								bborder = cellinfo._curborder;
								bpadding = cellinfo._curpadding;
							}
						}
					}

					for (var j = 0; j < rowcount; j++) {
						var datarow = this._getDataRow(j);

						if (chk_srow >= 0 && j < chk_srow) {
							max = format._cols[nColIndex].size;
							continue;
						}

						size = this._getMaxColSize(colcells, nColIndex, datarow, null, maxbyte);

						if (size < 0) {
							return -1;
						}

						max = Math.max(max, size);
					}
				}
			}
			totalmax = Math.max(totalmax, max);
		}
		if (this._headAutoSize && format._headcells) {
			var cells = format._headcells;
			var cellsLen = cells.length;
			var max;
			var colcells = [], cellinfo;

			for (var i = 0; i < cellsLen; i++) {
				cellinfo = cells[i];
				if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
					colcells.push(cellinfo);
				}
			}

			max = this._getMaxColSize(colcells, nColIndex, -1);
			totalmax = Math.max(totalmax, max);
		}

		if (this._summAutoSize && format._summcells) {
			var cells = format._summcells;
			var cellsLen = cells.length;
			var max;
			var colcells = [], cellinfo;

			for (var i = 0; i < cellsLen; i++) {
				cellinfo = cells[i];
				if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
					colcells.push(cellinfo);
				}
			}

			max = this._getMaxColSize(colcells, nColIndex, -2);
			totalmax = Math.max(totalmax, max);
		}
		return totalmax;
	};

	_pGrid._on_treeloadImagetemp = function (url, imgW, imgH) {
	};

	_pGrid._tree_recreate = false;
	_pGrid._hasTree = false;
	_pGrid._treeIndexes = null;
	_pGrid._treeStates = null;
	_pGrid._treeChecked = null;
	_pGrid._treeCellinfo = null;
	_pGrid._hasSameNextNode = null;
	_pGrid._maxdepth = 0;
	_pGrid._rootlevel = 99;
	_pGrid._treeInitStatus = {
		"collapse,null" : 0, 
		"expand,null" : 1, 
		"collapse,all" : 2, 
		"expand,all" : 3
	};
	_pGrid._currentCellEditor = null;
	_pGrid._currentCellCell = -1;
	_pGrid._currentCellRow = -1;
	_pGrid._showEditing = false;
	_pGrid._beforeEditRowIdx = -1;
	_pGrid._beforeEditCellIdx = -1;
	_pGrid._onceTime_focus = false;
	_pGrid._set_focus_dir = -1;
	_pGrid._showEditorFocus = false;

	_pGrid._on_treeloadImage = function (url, imgW, imgH) {
		var tree_load = this._tree_load_all;
		tree_load[url] = true;

		var key, load = true;

		for (key in tree_load) {
			if (tree_load.hasOwnProperty(key)) {
				if (tree_load[key] == false) {
					load = false;
					break;
				}
			}
		}

		if (load) {
			if (this._is_created) {
				this._recreate_contents_all(true, true);
			}
			else {
				this._tree_recreate = true;
			}
		}
		else {
			if (this._is_created) {
				if (this._resetColSizeList()) {
					this._bodyBand._matrix._adjustColsDisplay(true);
				}
			}
		}
	};

	_pGrid._on_sizeloading = function (url, imgW, imgH) {
		var image_load = this._image_load_all;

		if (image_load[url]) {
			return;
		}

		image_load[url] = true;

		var key, load = true;

		for (key in image_load) {
			if (image_load.hasOwnProperty(key)) {
				if (image_load[key] == false) {
					load = false;
					break;
				}
			}
		}

		if (load) {
			if (this._is_created) {
				this._recreate_contents_all(true, true);
			}
			else {
				this._image_recreate = true;
			}
		}
		else {
			if (this._is_created) {
				if (this._resetColSizeList()) {
					this._bodyBand._matrix._adjustColsDisplay(true);
				}
			}
		}
	};


	_pGrid._preloadTreeImage = function () {
		if (this._tree_load_all != null) {
			return true;
		}

		if (!this._binddataset) {
			return true;
		}

		var rowcount = this._binddataset.getRowCount();
		var cellinfos = this._curFormat._bodycells;
		var state, displayType, cellinfo, prop;

		this._tree_load_all = {
		};
		for (var i = 0; i < rowcount; i++) {
			for (var j = 0, nn = cellinfos.length; j < nn; j++) {
				cellinfo = cellinfos[j];
				displayType = cellinfo._getDisplaytype(i);

				if (displayType != "treeitemcontrol") {
					continue;
				}

				state = this._treeStates[i];

				if (state == 0) {
					prop = "treecollapseimage";
				}
				else if (state == 1) {
					prop = "treeexpandimage";
				}
				else if (state == 2) {
					prop = "treeitemimage";
				}

				var image = cellinfo._query_status_treecontrol(i, prop, "enabled");
				if (image) {
					if (image.substring(0, 4).toLowerCase() == "url(") {
						image = image.substring(5, image.length - 2);
					}

					image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
					this._tree_load_all[image] = false;
				}

				prop = "";
				if (state == 0) {
					prop += "treeopenbuttonimage";
				}
				else if (state == 1) {
					prop += "treeclosebuttonimage";
				}

				if (prop) {
					var image = cellinfo._query_status_treecontrol(i, prop, "enabled");
					if (image) {
						if (image.substring(0, 4).toLowerCase() == "url(") {
							image = image.substring(5, image.length - 2);
						}

						image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());

						this._tree_load_all[image] = false;
					}
				}
			}
		}

		var key, load = true, size;

		for (key in this._tree_load_all) {
			if (this._tree_load_all.hasOwnProperty(key)) {
				size = nexacro._getImageSize(key, this._on_treeloadImage, this);
				if (!size) {
					load = false;
				}
			}
		}
		return load;
	};

	_pGrid._preloadImage = function () {
		if (this._image_load_all != null) {
			return true;
		}

		if (!this._binddataset) {
			return true;
		}

		var rowcount = this._binddataset.getRowCount();
		var cellinfos = this._curFormat._bodycells;
		var displayType, cellinfo;

		if (!cellinfos) {
			return true;
		}

		this._image_load_all = {
		};

		for (var i = 0; i < rowcount; i++) {
			for (var j = 0, nn = cellinfos.length; j < nn; j++) {
				cellinfo = cellinfos[j];
				displayType = cellinfo._getDisplaytype(i);

				if (displayType != "imagecontrol") {
					continue;
				}

				prop = "text";

				var image = cellinfo._getDisplayText_text(i);
				if (image) {
					if (image.substring(0, 4).toLowerCase() == "url(") {
						image = image.substring(5, image.length - 2);
					}

					image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
					this._image_load_all[image] = false;
				}
			}
		}

		var key, load = true, size;

		for (key in this._image_load_all) {
			if (this._image_load_all.hasOwnProperty(key)) {
				size = nexacro._getImageSize(key, this._on_sizeloading, this);

				if (size) {
					this._image_load_all[key] = true;
				}
				else {
					load = false;
				}
			}
		}
		return load;
	};

	_pGrid._getDepthWidth = function (datarow, cellinfo) {
		var displayType = cellinfo._getDisplaytype(datarow);

		if (displayType != "treeitemcontrol") {
			return 0;
		}

		var start = cellinfo._getTreeStartLevel(datarow);
		var level = cellinfo._getTreeLevel(datarow);
		var state = this._treeStates[datarow];
		var gap = 22;
		var subgap = 6;
		var defaultsize = 9;
		var imagewidth = 14;
		var buttonwidth = 14;
		var checkwidth = 14;
		var use_image, use_check, use_btn;
		var prop;
		var status = "enabled";

		if (state == 0) {
			prop = "treecollapseimage";
		}
		else if (state == 1) {
			prop = "treeexpandimage";
		}
		else if (state == 2) {
			prop = "treeitemimage";
		}

		var image = cellinfo._query_status_treecontrol(datarow, prop, status);
		if (image) {
			if (image.substring(0, 4).toLowerCase() == "url(") {
				image = image.substring(5, image.length - 2);
			}

			image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
			var size = nexacro._getImageSize(image, this._on_treeloadImagetemp, this);

			if (size) {
				imagewidth = size.width;
			}
		}

		prop = "";
		if (state == 0) {
			prop += "treeopenbuttonimage";
		}
		else if (state == 1) {
			prop += "treeclosebuttonimage";
		}

		if (prop) {
			var image = cellinfo._query_status_treecontrol(datarow, prop, status);
			if (image) {
				if (image.substring(0, 4).toLowerCase() == "url(") {
					image = image.substring(5, image.length - 2);
				}

				image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
				var size = nexacro._getImageSize(image, this._on_treeloadImagetemp, this);
				if (size) {
					buttonwidth = size.width;
				}
			}
		}

		level -= start;

		if (level < 0) {
			level = -1;
		}

		var offset = (level * gap) + defaultsize;

		if (this.treeusebutton != "no") {
			offset += buttonwidth;
		}
		else {
			offset += defaultsize;
		}

		if (this.treeusecheckbox == true) {
			var checkWidth = cellinfo._getCheckboxsize(datarow);
			offset += checkWidth;
		}

		if (this.treeuseimage == true) {
			offset += 1;
			if (imagewidth > 0) {
				offset += imagewidth;
			}
			else {
				offset += 15;
			}

			offset += 5;
		}
		else {
			offset += 4;
		}

		return offset + 2;
	};

	_pGrid._isPassPrevCell = function (area, cells, type, idx) {
		var rowcnt = area.endsubrow.length;
		var b_subrow = area.begsubrow;
		var e_subrow = area.endsubrow;
		var b_col = area.begcol;
		var e_col = area.endcol;
		var cellcnt = cells.length;

		if (type == "next" || type == "prev") {
			for (var i = 0; i < rowcnt; i++) {
				for (var j = 0; j < cellcnt; j++) {
					if (b_subrow[i] <= cells[j]._row && e_subrow[i] >= cells[j]._row) {
						if (cells[j]._colspan > 1) {
							if (type == "next" && cells[j]._col < idx && idx < cells[j]._col + cells[j]._colspan) {
								return true;
							}
							else if (type == "prev" && cells[j]._col <= idx && idx < cells[j]._col + cells[j]._colspan - 1) {
								return true;
							}
						}
					}
				}
			}
		}
		else {
			for (var i = 0, n = cells.length; i < n; i++) {
				if (b_col <= cells[i]._col && e_col >= cells[i]._col) {
					if (cells[i]._rowspan > 1) {
						if (type == "down" && cells[i]._row < idx && idx < cells[i]._row + cells[i]._rowspan) {
							return true;
						}
						else if (type == "up" && cells[i]._row <= idx && idx < cells[i]._row + cells[i]._rowspan - 1) {
							return true;
						}
					}
				}
			}
		}
		return false;
	};

	_pGrid._getAreaMoveCell = function (type, afterIdx, row) {
		var selectinfo = this._selectinfo;

		if (selectinfo.area.length == 0) {
			return true;
		}

		var area = selectinfo.area[selectinfo.area.length - 1];
		var cells = this._curFormat._bodycells;

		if (type == "next") {
			if (selectinfo.ctrlpoint.col < afterIdx) {
				if (area.endcol >= afterIdx) {
					return false;
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "prev") {
			if (selectinfo.ctrlpoint.col > afterIdx) {
				if (area.begcol <= afterIdx) {
					return false;
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "down") {
			if (selectinfo.ctrlpoint.row < row || (selectinfo.ctrlpoint.row == row && selectinfo.ctrlpoint.subrow < afterIdx)) {
				if (area.endsubrow.length == (row - selectinfo.ctrlpoint.row + 1)) {
					if (area.endsubrow[area.endsubrow.length - 1] >= afterIdx) {
						return false;
					}
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "up") {
			if (selectinfo.ctrlpoint.row > row || (selectinfo.ctrlpoint.row == row && selectinfo.ctrlpoint.subrow > afterIdx)) {
				if (area.begsubrow.length == (selectinfo.ctrlpoint.row - row + 1)) {
					if (area.begsubrow[0] <= afterIdx) {
						return false;
					}
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		return true;
	};

	_pGrid._moveToCell = function (type, editable, colmove, area, lastcol, showcell) {
		if (this._selectinfo.curdsrow < 0 && !editable) {
			if (this.rowcount > 0 && (type == "next" || type == "down")) {
				return this._moveToPosCell(0, 0);
			}

			return false;
		}

		var format = this._curFormat;
		var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
		var beforePvt = this._beforepvt = this._selectinfo.curpvt;
		var afterCell, afterCol, afterRow, afterSubrow;
		var afterPvt = -9;
		var cellarr;
		var bodycells = format._bodycells;
		var bodycells_len = bodycells.length;

		if (type == "next") {
			if (editable) {
				cellarr = this._getLastEditableCell();
				if (cellarr.row == null || (cellarr.row <= this._selectinfo.curdsrow && cellarr.cell == this._selectinfo.curcell)) {
					this._hideEditor();
					if (this._setdataobj && this._setdataobj.succ == false) {
						this._setSelectedInfo(beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt);
						this._iskey_movetocell = true;
						this._setdataobj = null;

						if (this.autoenter == "select") {
							this._showEditor();
						}

						return true;
					}
					return false;
				}
			}

			for (; true; ) {
				var rowcount = this.rowcount;
				if (this._selectinfo.currow >= (rowcount - 1) && this._selectinfo.curcell >= (format._bodycells.length - 1)) {
					return false;
				}

				if (this._selectinfo.curcell >= bodycells.length - 1) {
					if (colmove) {
						return false;
					}
					for (; true; ) {
						afterCell = 0;
						afterCol = 0;
						afterRow = this._selectinfo.curdsrow + 1;
						afterSubrow = 0;

						this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

						if (this._hasTree) {
							var exist = false;
							var _treeIndexes = this._treeIndexes;
							var _treeIndexesLen = _treeIndexes.length;

							for (var k = 0; k < _treeIndexesLen; k++) {
								if (_treeIndexes[k] == afterRow) {
									exist = true;
									break;
								}
								else if (_treeIndexes[k] > afterRow) {
									break;
								}
							}
							if (exist == false) {
								continue;
							}
						}

						break;
					}
				}
				else {
					if (colmove) {
						afterCell = this._selectinfo.curcell;
						afterCol = bodycells[this._selectinfo.curcell]._col + bodycells[this._selectinfo.curcell]._colspan;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = this._selectinfo.cursubrow;

						for (var i = 0; i < bodycells_len; i++) {
							if (bodycells[i]._col == afterCol && (bodycells[i]._row <= this._selectinfo.cursubrow && this._selectinfo.cursubrow < (bodycells[i]._row + bodycells[i]._rowspan))) {
								if (!area || area == bodycells[i]._area) {
									afterCell = i;
									afterSubrow = bodycells[i]._row;
									break;
								}
							}
						}

						if (afterCell == this._selectinfo.curcell) {
							return false;
						}
					}
					else {
						afterCell = this._selectinfo.curcell + 1;
						afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = bodycells[afterCell]._row;
					}

					if (lastcol != undefined && lastcol < afterCol) {
						return false;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

					if (format._cols[afterCol].size <= 0) {
						continue;
					}

					if (this._isAreaSelect()) {
						if (!this._getAreaMoveCell(type, afterCol, afterRow)) {
							continue;
						}
					}
				}

				if (editable) {
					if (this._hasTree) {
						var exist = false;
						var _treeIndexes = this._treeIndexes;
						var _treeIndexesLen = _treeIndexes.length;

						for (var k = 0; k < _treeIndexesLen; k++) {
							if (_treeIndexes[k] == afterRow) {
								exist = true;
								break;
							}
							else if (_treeIndexes[k] > afterRow) {
								break;
							}
						}
						if (exist == false) {
							continue;
						}
					}

					var cellinfo = bodycells[afterCell];
					var editType = cellinfo._getEdittype(afterRow);

					if (editType == "" || editType == "none") {
						continue;
					}
				}

				if (showcell && afterRow >= 0) {
					var obj = this._getCurrentBodyCell(afterRow, afterCell);
					if (obj) {
						obj._showfull(obj);
					}
				}
				break;
			}
		}
		else if (type == "prev") {
			for (; true; ) {
				if (this._selectinfo.curcell <= 0) {
					if (colmove || this._selectinfo.currow <= 0) {
						this._hideEditor();
						if (this._setdataobj && this._setdataobj.succ == false) {
							this._setSelectedInfo(beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt);
							this._iskey_movetocell = true;
							this._setdataobj = null;

							if (this.autoenter == "select") {
								this._showEditor();
							}

							return true;
						}

						return false;
					}

					for (; true; ) {
						afterCell = format._bodycells.length - 1;
						afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow - 1;
						afterSubrow = bodycells[afterCell]._row;

						this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

						if (this._hasTree) {
							var exist = false;
							var _treeIndexes = this._treeIndexes;
							var _treeIndexesLen = _treeIndexes.length;

							for (var k = 0; k < _treeIndexesLen; k++) {
								if (_treeIndexes[k] == afterRow) {
									exist = true;
									break;
								}
								else if (_treeIndexes[k] > afterRow) {
									break;
								}
							}
							if (exist == false) {
								continue;
							}
						}

						break;
					}
				}
				else {
					var newcol;
					if (colmove) {
						afterCell = this._selectinfo.curcell;
						newcol = afterCol = this._selectinfo.curcol - 1;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = this._selectinfo.cursubrow;

						for (var i = 0; i < bodycells_len; i++) {
							if ((bodycells[i]._col <= afterCol && afterCol < bodycells[i]._col + bodycells[i]._colspan) && (bodycells[i]._row <= this._selectinfo.cursubrow && this._selectinfo.cursubrow < (bodycells[i]._row + bodycells[i]._rowspan))) {
								if (!area || area == bodycells[i]._area) {
									afterCol = bodycells[i]._col;
									afterCell = i;
									afterSubrow = bodycells[i]._row;
									break;
								}
							}
						}
						if (afterCell == this._selectinfo.curcell) {
							return false;
						}
					}
					else {
						afterCell = this._selectinfo.curcell - 1;
						afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = bodycells[afterCell]._row;
					}

					if (lastcol != undefined && lastcol > afterCol) {
						return false;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

					if (format._cols[afterCol].size <= 0) {
						continue;
					}

					if (this._isAreaSelect()) {
						if (!this._getAreaMoveCell(type, newcol, afterRow)) {
							continue;
						}
					}
				}

				if (editable) {
					if (this._hasTree) {
						var exist = false;
						var _treeIndexes = this._treeIndexes;
						var _treeIndexesLen = _treeIndexes.length;

						for (var k = _treeIndexesLen - 1; k >= 0; k--) {
							if (_treeIndexes[k] == afterRow) {
								exist = true;
								break;
							}
							else if (_treeIndexes[k] < afterRow) {
								break;
							}
						}
						if (exist == false) {
							continue;
						}
					}

					var cellinfo = bodycells[afterCell];
					var editType = cellinfo._getEdittype(afterRow);

					if (editType == "" || editType == "none") {
						continue;
					}
				}

				if (showcell && afterRow >= 0) {
					var obj = this._getCurrentBodyCell(afterRow, afterCell);
					if (obj) {
						obj._showfull(obj);
					}
				}

				break;
			}
		}
		else if (type == "up") {
			var prevcell = -1, prevcol = -1, prevsubrow = -1;
			var selectedcol = this._selectinfo.curcol;
			var selectedrowspan;
			var newsubrow;
			for (; true; ) {
				if (this._isSelectRowType()) {
					if (this._selectinfo.curdsrow == 0) {
						return false;
					}

					afterCell = this._selectinfo.curcell;
					afterCol = this._selectinfo.curcol;
					afterRow = this._selectinfo.curdsrow - 1;
					afterSubrow = this._selectinfo.cursubrow;
				}
				else {
					if (this._selectinfo.curdsrow == 0 && this._selectinfo.cursubrow == 0) {
						return false;
					}

					if (this._fixed_startrow >= this._selectinfo.curdsrow) {
						return false;
					}

					selectedrowspan = bodycells[this._selectinfo.curcell]._rowspan;



					if (this._selectinfo.cursubrow == 0) {
						for (var i = bodycells_len - 1; i >= 0; i--) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan)) {
								prevcell = bodycells[i]._cellidx;
								prevcol = bodycells[i]._col;
								prevsubrow = bodycells[i]._row;
								newsubrow = prevsubrow + bodycells[i]._rowspan - 1;
								break;
							}
						}
						afterCol = prevcol;
						afterCell = prevcell;
						afterRow = this._selectinfo.curdsrow - 1;
						afterSubrow = prevsubrow;
					}
					else {
						for (var i = this._selectinfo.curcell - 1; i >= 0; i--) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan) && 
								bodycells[i]._row <= (this._selectinfo.cursubrow - 1) && (this._selectinfo.cursubrow - 1) < (bodycells[i]._row + bodycells[i]._rowspan)) {
								prevcell = bodycells[i]._cellidx;
								prevcol = bodycells[i]._col;
								prevsubrow = bodycells[i]._row;
								newsubrow = prevsubrow + bodycells[i]._rowspan - 1;
								break;
							}
						}

						afterCol = prevcol;
						afterCell = prevcell;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = prevsubrow;
					}
				}

				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

				if (this._hasTree) {
					var exist = false;
					var _treeIndexes = this._treeIndexes;
					var _treeIndexesLen = _treeIndexes.length;

					for (var k = _treeIndexesLen - 1; k >= 0; k--) {
						if (_treeIndexes[k] == afterRow) {
							exist = true;
							break;
						}
						else if (_treeIndexes[k] < afterRow) {
							break;
						}
					}
					if (exist == false) {
						continue;
					}
				}

				if (this._isAreaSelect()) {
					if (!this._getAreaMoveCell(type, newsubrow, afterRow)) {
						continue;
					}
				}

				break;
			}
		}
		else if (type == "down") {
			var rowcount = this._getGridRowCount();
			var curr = this._dsRowToDispRow(this._selectinfo.curdsrow);
			var lastsubrow = format._bodyrows.length - 1;
			var nextcell = -1, nextcol = -1, nextsubrow = -1;
			var selectedcol = this._selectinfo.curcol;
			var selectedsubrow = this._selectinfo.cursubrow;
			var selectedrowspan;

			for (; true; ) {
				if (this._isSelectRowType()) {
					if (rowcount - 1 <= curr) {
						return false;
					}

					afterCell = this._selectinfo.curcell;
					afterCol = this._selectinfo.curcol;
					afterRow = this._selectinfo.curdsrow + 1;
					afterSubrow = this._selectinfo.cursubrow;
				}
				else {
					selectedrowspan = bodycells[this._selectinfo.curcell]._rowspan;

					if (rowcount - 1 <= curr && (this._selectinfo.cursubrow + selectedrowspan) - 1 == lastsubrow) {
						if (this._vscrollmng) {
							this._vscrollmng.setPos(this._vscrollmng.max);
						}

						return false;
					}

					if ((this._selectinfo.cursubrow + selectedrowspan - 1) == lastsubrow) {
						for (var i = 0; i < bodycells_len; i++) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan)) {
								nextcell = bodycells[i]._cellidx;
								nextcol = bodycells[i]._col;
								nextsubrow = bodycells[i]._row;
								break;
							}
						}
						afterCol = nextcol;
						afterCell = nextcell;
						afterRow = this._selectinfo.curdsrow + 1;
						afterSubrow = nextsubrow;
					}
					else {
						for (var i = this._selectinfo.curcell + 1; i < bodycells_len; i++) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan) && (bodycells[i]._row == this._selectinfo.cursubrow + (selectedrowspan - 1) + 1)) {
								nextcell = bodycells[i]._cellidx;
								nextcol = bodycells[i]._col;
								nextsubrow = bodycells[i]._row;
								break;
							}
						}

						afterCol = nextcol;
						afterCell = nextcell;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = nextsubrow;
					}
				}

				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

				if (this._hasTree) {
					var exist = false;
					var _treeIndexes = this._treeIndexes;
					var _treeIndexesLen = _treeIndexes.length;

					for (var k = 0; k < _treeIndexesLen; k++) {
						if (_treeIndexes[k] == afterRow) {
							exist = true;
							break;
						}
						else if (_treeIndexes[k] > afterRow) {
							break;
						}
					}
					if (exist == false) {
						continue;
					}
				}

				if (this._isAreaSelect()) {
					if (!this._getAreaMoveCell(type, afterSubrow, afterRow)) {
						continue;
					}
				}

				break;
			}
		}

		var evt_name;
		this._iskey_movetocell = false;

		if (this._keydown_elem) {
			this._iskey_movetocell = true;
			evt_name = "keydown";
		}

		this._hideEditor();
		var change = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body", evt_name);

		var cell = this._getCurrentBodyCell(afterRow, afterCell);

		if (cell && !nexacro._enableaccessibility) {
			cell._setFocus(false);
		}

		if (!this._keydown_elem) {
			this._moveCellAfterFocus();
		}
		else {
			if (change == false) {
				if (this.autoenter == "select") {
					this._showEditor();
				}
			}
		}

		return true;
	};

	_pGrid._moveCellAfterFocus = function () {
		var retn = true;

		if (this.autoenter == "select") {
			if (nexacro._Browser == "Edge" || nexacro._Browser == "Opera" || nexacro._Browser == "IE") {
				this._onceTime_focus = true;
			}

			if (this._currentBand == "body" && !this._showEditor()) {
				this._hideEditor();
				retn = false;
			}
			this._onceTime_focus = false;
		}
		return retn;
	};

	_pGrid._setTree = function (v) {
		v = nexacro._toBoolean(v);

		if (this._hasTree != v) {
			this._hasTree = v;

			if (v == true) {
				this._setFixedRow(-1, true);
				this._initTreeStates();
			}
			else {
				this._clearTreeStates();
			}
			this._recreate_contents_all(false, false, true);
		}
	};

	_pGrid._setTreeCellinfo = function (v) {
		if (this._treeCellinfo != v) {
			this._treeCellinfo = v;
			this._setTree(true);
		}
	};

	_pGrid._removeTreeCellinfo = function (v) {
		if (this._treeCellinfo == v) {
			this._treeCellinfo = null;
			this._setTree(false);
		}
	};

	_pGrid._initTreeStates = function (keepstate, recheck_leaf) {
		if (this._hasTree && this._binddataset) {
			this._treeIndexes = this._createTreeIndexes();
			this._treeStates = this._createTreeStates(keepstate, undefined, recheck_leaf);
			this._treeChecked = this._createTreeChecked();
			this._createTreeHasChild();
			this._applyTreeStates();

			if (this._treeIndexes.length > 0) {
				this.rowcount = this._treeIndexes.length;
			}
			else {
				this.rowcount = 0;
			}
		}
	};

	_pGrid._createTreeHasChild = function () {
		var rowcount = this._rowcount;
		var cellinfo = this._treeCellinfo;

		if (this._hasSameNextNode) {
			delete this._hasSameNextNode;
		}

		this._hasSameNextNode = new Array(rowcount);

		for (var i = rowcount - 1; i >= 0; i--) {
			var lvl = cellinfo._getTreeLevel(i);
			this._maxdepth = Math.max(lvl, this._maxdepth);
			this._rootlevel = Math.min(lvl, this._rootlevel);

			if (this._hasSameNextNode[i] == undefined) {
				var val = [];
				val[0] = lvl;
				val[1] = false;
				this._hasSameNextNode[i] = val;

				for (var j = i - 1; j >= 0; j--) {
					var lvl2 = cellinfo._getTreeLevel(j);
					if (lvl == lvl2) {
						var val = [];
						val[0] = lvl;
						val[1] = true;
						this._hasSameNextNode[j] = val;
					}
					else if (lvl > lvl2) {
						break;
					}
				}
			}
		}

		this._rootlevel = Math.max(cellinfo._getTreeStartLevel(0), this._rootlevel);
	};

	_pGrid._createTreeIndexes = function () {
		if (this._binddataset == null) {
			return [];
		}

		var rowcount = this._binddataset.rowcount;
		var indexes = new Array(rowcount);

		for (var i = 0; i < rowcount; i++) {
			indexes[i] = i;
		}

		return indexes;
	};

	_pGrid._getTreeDefaultStatus = function () {
		var initstatus = this._treeInitStatus[this.treeinitstatus];

		if (initstatus == null) {
			initstatus = 0;
		}

		var defaultstatus;

		if (initstatus == 0 || initstatus == 1) {
			defaultstatus = (initstatus == 0) ? 0 : 1;
		}
		else if (initstatus == 2 || initstatus == 3) {
			defaultstatus = (initstatus == 2) ? 0 : 1;
		}

		return defaultstatus;
	};

	_pGrid._createTreeStates = function (keepstate, ignoreDS, recheck_leaf) {
		if (this._binddataset == null) {
			return [];
		}

		var dataset = this._binddataset;
		var indexes = this._treeIndexes;
		var rowcount = dataset.rowcount;
		var records = dataset._viewRecords;
		var states = new Array(rowcount);
		var cellinfo = this._treeCellinfo;
		var initstatus = this._treeInitStatus[this.treeinitstatus];
		var state = null;
		var level;

		if (initstatus == null) {
			initstatus = 0;
		}

		var oldstates = this._treeStates;

		if (keepstate && oldstates.length == rowcount) {
			for (var i = 0; i < rowcount; i++) {
				if (cellinfo.treestate._bindtype == 0) {
					states[i] = oldstates[i];
				}
			}
		}


		if (initstatus == 0 || initstatus == 1) {
			var defaultstatus = (initstatus == 0) ? 0 : 1;

			var prelevel = level = -1;
			var prestate;

			for (var i = 0; i < rowcount; i++) {
				if (!ignoreDS) {
					state = cellinfo._getTreeState(i);
				}

				if (states[i] == undefined || (recheck_leaf && states[i] == 2)) {
					if (state && state.length) {
						states[i] = parseInt(state, 10);
					}
					else {
						states[i] = defaultstatus;
					}
				}

				level = cellinfo._getTreeLevel(i);

				if (!prestate || cellinfo.treestate._bindtype == 0) {
					if (prelevel >= level) {
						states[i - 1] = 2;
					}
					else if (states[i - 1] >= 2) {
						states[i - 1] = defaultstatus;
					}
				}
				prelevel = level;
				prestate = state;
			}

			if (cellinfo.treestate._bindtype == 0 || !state) {
				states[rowcount - 1] = 2;
			}
		}
		else if (initstatus == 2 || initstatus == 3) {
			var defaultstatus = (initstatus == 2) ? 0 : 1;
			var prelevel = level = -1;

			for (var i = 0; i < rowcount; i++) {
				if (states[i] == undefined || (recheck_leaf && states[i] == 2)) {
					states[i] = defaultstatus;
				}

				level = cellinfo._getTreeLevel(i);
				if (prelevel >= level) {
					states[i - 1] = 2;
				}
				prelevel = level;
			}

			if (rowcount > 0) {
				states[rowcount - 1] = 2;
			}
		}

		if (this._org_treeStates.length == 0) {
			this._org_treeStates = this._org_treeStates.concat(states);
		}

		return states;
	};

	_pGrid._createTreeChecked = function () {
		if (this._binddataset == null) {
			return [];
		}

		var rowcount = this._binddataset.rowcount;
		var checked = new Array(rowcount);
		var cellinfo = this._treeCellinfo;
		var v = null;

		for (var i = 0; i < rowcount; i++) {
			v = cellinfo._getTreeCheck(i);

			if (v && (v > 0 || v.length)) {
				checked[i] = parseInt(v, 10);
			}
			else {
				checked[i] = 0;
			}
		}

		return checked;
	};

	_pGrid._updateTreeStates = function (row, add_row) {
		if (this._hasTree && this._binddataset) {
			if (row >= 0) {
				var states = this._treeStates;
				if (add_row) {
					states.splice(row, 0, 2);
				}
				else {
					states.splice(row, 1);
					if (states[row] != 2) {
						if (states[row - 1] == 1) {
							states[row - 1] = 2;
						}
					}
					else {
						var cellinfo = this._treeCellinfo;
						var level = cellinfo._getTreeLevel(row);
						var pre_level = cellinfo._getTreeLevel(row - 1);
						if (level == pre_level) {
							states[row - 1] = 2;
						}
					}
				}
				this._treeStates = states;
			}

			this._treeIndexes = this._createTreeIndexes();
			this._treeChecked = this._createTreeChecked();
			this._createTreeHasChild();
			this._applyTreeStates();

			if (this._treeIndexes.length > 0) {
				this.rowcount = this._treeIndexes.length;
			}
			else {
				this.rowcount = 0;
			}
		}
	};

	_pGrid._applyTreeStates = function () {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = indexes.length;
		var cellinfo = this._treeCellinfo;
		var v = indexes.slice(0, indexes.length);
		var prelevel = -1;
		var level = -1;
		var offset = 0;

		for (var i = 0; i < rowcount; i++) {
			offset++;
			if (states[i] == 0) {
				prelevel = cellinfo._getTreeLevel(v[i]);

				for (var j = i + 1; j < rowcount; j++) {
					level = cellinfo._getTreeLevel(v[j]);
					if (level > prelevel) {
						i++;
						indexes.splice(offset, 1);
					}
					else {
						break;
					}
				}
			}
		}
	};

	_pGrid._clearTreeStates = function () {
		this._treeIndexes = null;
		this._treeStates = null;
		this._treeChecked = null;

		if (this._hasTree) {
			this.rowcount = 0;
		}
	};

	_pGrid._getTreeRowPosition = function (v) {
		if (v < 0 || !this._hasTree) {
			return v;
		}

		var indexes = this._treeIndexes;
		var max = indexes.length - 1;

		for (var i = max; i >= 0; i--) {
			if (indexes[i] == v) {
				return i;
			}
			else if (indexes[i] < v) {
				break;
			}
		}
		return -1;
	};

	_pGrid._getBindTextCellInfo = function (columnid) {
		var format = this._curFormat;
		var bind = true;

		if (!format) {
			return null;
		}

		var retn = [];

		if (columnid) {
			if (format._headcells) {
				var _headcells = format._headcells;
				var _headcellsLen = _headcells.length;
				var cellinfo;

				for (var i = 0; i < _headcellsLen; i++) {
					cellinfo = _headcells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
			if (format._bodycells) {
				var _bodycells = format._bodycells;
				var _bodycellsLen = _bodycells.length;
				var cellinfo;

				for (var i = 0; i < _bodycellsLen; i++) {
					cellinfo = _bodycells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
			if (format._summcells) {
				var _summcells = format._summcells;
				var _summcellsLen = _summcells.length;
				var cellinfo;

				for (var i = 0; i < _summcellsLen; i++) {
					cellinfo = _summcells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
		}
		if (retn.length == 0 && format._bodycells) {
			retn = format._bodycells;
			bind = false;
		}
		return [retn, bind];
	};

	_pGrid._isTreeStateChanged = function (e, dsEventOccured) {
		var changed = false;

		if (this._hasTree) {
			var colid = e.columnid;
			var cellinfo = this._treeCellinfo;

			if (colid == cellinfo.treecheck._bindexpr) {
				var dsrowidx = e.row;
				var rowidx = this._getTreeRowPosition(dsrowidx);
				var v = e.newvalue;

				this._setTreeChecked(rowidx, v);
			}

			if (dsEventOccured == false) {
				if (colid == cellinfo.treestate._bindexpr) {
					var dsrowidx = e.row;
					var rowidx = this._getTreeRowPosition(dsrowidx);
					var v = e.newvalue;

					this._setTreeState(rowidx, v);
					changed = true;
				}

				var dfstatus = this._getTreeDefaultStatus();

				if (colid == cellinfo.treelevel._bindexpr) {
					var cur_level;
					var states = this._treeStates;
					var level = cellinfo._getTreeLevel(e.row);

					for (var i = e.row - 1; i >= 0; i--) {
						cur_level = cellinfo._getTreeLevel(i);
						if (cur_level < level) {
							if (states[i] >= 2) {
								states[i] = dfstatus;
							}

							break;
						}
					}

					if (states[e.row] >= 2) {
						if (this._rowcount > 0 && e.row < this._rowcount - 1) {
							cur_level = cellinfo._getTreeLevel(e.row + 1);

							if (cur_level > level) {
								states[e.row] = dfstatus;
							}
						}
					}
					changed = true;
				}
			}
		}
		return changed;
	};

	_pGrid._setTreeState = function (rowidx, v, redraw, prop_set) {
		v = parseInt(v, 10);

		if (isFinite(v)) {
			var dsrowidx = this._treeIndexes[rowidx];
			var state = this._treeStates[dsrowidx];
			var retn = 0;

			if (v != state) {
				if (v == 2) {
					if (redraw) {
						this._refreshBodyRow(rowidx - this._getBodyBegRowPos(rowidx));
					}
					return 1;
				}
				else if ((retn = this._toggleTreeState(rowidx, redraw, v, prop_set)) > 0) {
					return retn;
				}
			}
		}
		return 0;
	};

	_pGrid._getOrgTreeStates = function (rowidx) {
		var states;

		if (this._org_treeStates.length) {
			states = this._org_treeStates;
		}
		else {
			states = this._createTreeStates(false, true);
		}

		if (states[rowidx] == 2) {
			return 2;
		}
		else {
			return this._treeStates[rowidx];
		}
	};

	_pGrid._treeStateKeyAction = function (rowidx, v) {
		var dsrowidx = this._treeIndexes[rowidx];
		var state = this._treeStates[dsrowidx];

		var collapse = false;
		var retn;

		if (state < 2 && state != v) {
			return this._toggleTreeState(rowidx, true);
		}

		return 0;
	};

	_pGrid._toggleTreeState = function (rowidx, redraw, v, prop_set) {
		var dsrowidx = this._treeIndexes[rowidx];
		var state;

		if (prop_set) {
			state = this._getOrgTreeStates(dsrowidx);
		}
		else {
			state = this._treeStates[dsrowidx];
		}

		var collapse = false;
		var retn;

		if (state == 0) {
			if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 1) !== false) {
				retn = this._expandTreeState(rowidx);
				this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 1);
			}
		}
		else if (state == 1) {
			if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 0) !== false) {
				collapse = true;
				retn = this._collapseTreeState(rowidx);
				this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 0);
			}
		}
		else if (state == 2) {
			if (prop_set) {
				if (prop_set == "null_value") {
					this._treeStates[dsrowidx] = v;
				}
				else {
					this._treeStates[dsrowidx] = 2;
				}
			}
			else {
				if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 0) !== false) {
					retn = 1;
					this._treeStates[dsrowidx] = 2;
					this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 0);
				}
			}
		}

		if (redraw) {
			if (retn == 2) {
				if (this._bodyBand) {
					if (this.enableredraw) {
						var change = this._bodyBand._matrix._adjustTreeDisplay(rowidx, collapse);
						if (change) {
							if (this._headBand) {
								this._headBand._matrix._adjustColsDisplay(true);
							}
							if (this._summBand) {
								this._summBand._matrix._adjustColsDisplay(true);
							}
						}
					}
					else {
						this._enable_redraw_history.recreate_body = true;
					}
				}
			}
			else if (retn == 1) {
				this._refreshBodyRow(rowidx - this._getBodyBegRowPos(rowidx));
			}
		}
		return retn;
	};

	_pGrid._collapseTreeState = function (rowidx) {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = indexes.length;
		var dsrowidx = indexes[rowidx];
		var cellinfo = this._treeCellinfo;

		if (states[dsrowidx] == 1) {
			states[dsrowidx] = 0;
		}
		else {
			return 0;
		}

		var level = cellinfo._getTreeLevel(dsrowidx);

		if (nexacro._enableaccessibility) {
			var cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				if (nexacro._OS == "Android" && nexacro._Browser != "Runtime") {
					cellobj._setAccessibilityStatLive(true);
				}
				cellobj._setAccessibilityStatExpanded(false);
			}
		}

		var lvl = -1;
		var count = 0;

		for (var i = rowidx + 1; i < rowcount; i++) {
			lvl = cellinfo._getTreeLevel(indexes[i]);

			if (lvl > level) {
				count++;
			}
			else {
				break;
			}
		}

		if (count > 0) {
			indexes.splice(rowidx + 1, count);
			this.rowcount = indexes.length;
			return 2;
		}
		;

		return 1;
	};

	_pGrid._expandTreeState = function (rowidx) {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = states.length;
		var dsrowidx = indexes[rowidx];
		var cellinfo = this._treeCellinfo;

		if (states[dsrowidx] == 0) {
			states[dsrowidx] = 1;
		}
		else {
			return 0;
		}

		var level = cellinfo._getTreeLevel(dsrowidx);

		if (nexacro._enableaccessibility) {
			var cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				if (nexacro._OS == "Android" && nexacro._Browser != "Runtime") {
					cellobj._setAccessibilityStatLive(true);
				}
				cellobj._setAccessibilityStatExpanded(true);
			}
		}

		var lvl = -1;
		var count = 0;
		var parentidx = dsrowidx;
		var parents = [dsrowidx];
		var preidx = -1;
		var prelevel = -1;
		var close = false;
		var depth;

		for (var i = dsrowidx + 1; i < rowcount; i++) {
			lvl = cellinfo._getTreeLevel(i);

			if (lvl > level) {
				if (preidx < 0) {
					if ((depth = (lvl - level)) > 1) {
						for (var j = 0; j < depth - 1; j++) {
							parents.push(preidx);
						}
					}
				}
				else {
					prelevel = cellinfo._getTreeLevel(preidx);
					if (lvl > prelevel) {
						if (close == true) {
							continue;
						}

						parentidx = preidx;
						if ((depth = (lvl - prelevel)) > 1) {
							for (var j = 0; j < depth - 1; j++) {
								parents.push(preidx);
							}
						}
						else {
							parents.push(preidx);
						}
					}
					else if (lvl < prelevel) {
						var n = prelevel - lvl;
						parents.splice(parents.length - n, n);
						parentidx = parents[parents.length - 1];
					}
					close = false;
				}

				if (states[parentidx] > 0) {
					indexes.splice(rowidx + 1 + count, 0, i);
					count++;
				}
				else {
					close = true;
				}

				preidx = i;
			}
			else {
				break;
			}
		}

		if (count > 0) {
			this.rowcount = this._treeIndexes.length;
			return 2;
		}

		return 1;
	};

	_pGrid._setTreeChecked = function (rowidx, v) {
		v = parseInt(v, 10);

		if (isFinite(v)) {
			var dsrowidx = this._treeIndexes[rowidx];
			var checked = this._treeChecked[dsrowidx];

			if (v == checked) {
				return false;
			}
			else {
				return (this._toggleTreeChecked(rowidx));
			}
		}

		return false;
	};

	_pGrid._toggleTreeChecked = function (rowidx) {
		var dsrowidx = this._treeIndexes[rowidx];
		var checked = this._treeChecked[dsrowidx];
		var v = (checked == 0) ? 1 : 0;
		this._treeChecked[dsrowidx] = v;
		return true;
	};

	_pGrid._getCurrentBodyCell = function (ridx, cidx) {
		var band = this._bodyBand;
		if (band) {
			if (ridx < 0) {
				ridx = this._selectinfo.curdsrow;
			}
			if (cidx < 0) {
				cidx = this._selectinfo.curcell;
			}

			var row = band._get_row(ridx);

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._getCurrentHeadCell = function (cidx, noccheck) {
		var band = this._headBand;
		if (band && (noccheck || this._currentDSrow == -1)) {
			if (cidx < 0) {
				cidx = this.currentcell;
			}

			var row = band._get_rows()[0];

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._getCurrentSummCell = function (cidx, noccheck) {
		var band = this._summBand;
		if (band && (noccheck || this._currentDSrow == -2)) {
			if (cidx < 0) {
				cidx = this.currentcell;
			}

			var row = band._get_rows()[0];

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._showEditor = function () {
		if (nexacro._toBoolean(this.readonly) == true) {
			return false;
		}

		var lastfocus = this._find_lastFocused();

		if (lastfocus instanceof nexacro.Div) {
			lastfocus = lastfocus._getLastFocused();
		}

		if (lastfocus != this) {
			return false;
		}

		var cellobj = this._getCurrentBodyCell(-1, -1);

		if (!cellobj) {
			return false;
		}

		var startrow = this._getBodyBegRowPos(cellobj._rowidx);
		var endrow = this._endrowpos;
		var currow = this._selectinfo.currow;
		var curcell = this._selectinfo.curcell;

		if (startrow > currow || endrow < currow) {
			return false;
		}
		else {
			if (this._beforeEditRowIdx != currow || this._beforeEditCellIdx != curcell) {
				if (cellobj._hasEditor()) {
					cellobj._showEditor(true, true);
					this._beforeEditRowIdx = this._selectinfo.curdsrow;
					this._beforeEditCellIdx = this._selectinfo.curcell;
					this._showEditing = true;
				}
				else {
					cellobj._setFocus(false);
				}
			}
		}

		return true;
	};

	_pGrid._setdataobj = null;
	_pGrid._hideEditor = function (noApplyDataset, grid_killfocus) {
		if (!this._currentCellEditor || this._hide_applydata) {
			return false;
		}

		var editComp = this._currentCellEditor;
		var setdataobj = null;

		if (!noApplyDataset && editComp._is_alive) {
			this._hide_applydata = true;

			setdataobj = {
				succ : false
			};
			setdataobj.succ = editComp._setDataset(true);

			editComp = this._currentCellEditor;

			this._hide_applydata = false;
		}

		if (this._binddataset.enableevent == false) {
			this._refreshAll();
		}

		this._currentCellEditor = null;

		if (editComp._is_alive) {
			var cellobj = editComp._cellobj;

			cellobj._setDisplayText();
			cellobj._hideEditor();

			if (this._keydown_elem && !grid_killfocus) {
				cellobj._setFocus(false);
			}
		}

		this._showEditing = false;
		this._setdataobj = setdataobj;

		this._beforeEditCellIdx = -1;
		this._beforeEditRowIdx = -1;
		this._currentCellCell = -1;
		this._currentCellRow = -1;

		return true;
	};

	_pGrid.getShowEditor = function () {
		var refer_comp = this._currentCellEditor;
		if (refer_comp instanceof nexacro._GridEditControl || 
			refer_comp instanceof nexacro._GridTextAreaControl || 
			refer_comp instanceof nexacro._GridMaskEditControl) {
			return refer_comp;
		}
		else {
			return false;
		}
	};

	_pGrid._setFocus = function (bResetScroll, dir, block_inner_focus) {
		if (nexacro._enableaccessibility) {
			this._currentBand = "grid";
			this._accept_arrow = true;
			this._removeAccessibilityCurrentFocus();

			if (dir == 2) {
				if (!this.accessibilityenable) {
					this._setAccessibilityBandFocus("next", true, false);
				}
			}
			else if (dir == 3) {
				this._setAccessibilityBandFocus("prev", true);
			}
		}

		return nexacro.Component.prototype._setFocus.call(this, bResetScroll, dir, block_inner_focus);
	};

	_pGrid._evtvalue = function (obj, postvalue) {
		var val = "";

		if (obj && obj.value) {
			val = obj.value;
		}
		else if (postvalue) {
			val = postvalue;
		}

		return val;
	};

	_pGrid._getAvailableRect = function (comp) {
		var rect = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0, 
			width : 0, 
			height : 0
		};
		rect.left = comp._getClientLeft();
		rect.top = comp._getClientTop();
		rect.right = comp._getClientLeft() + comp._getClientWidth();
		rect.bottom = comp._getClientTop() + comp._getClientHeight();
		rect.width = comp._getClientWidth();
		rect.height = comp._getClientHeight();
		return rect;
	};

	_pGrid._getPosRect = function (comp) {
		var rect = {
			left : comp._adjust_left, 
			top : comp._adjust_top, 
			right : comp.getOffsetRight(), 
			bottom : comp.getOffsetBottom(), 
			width : comp._adjust_width, 
			height : comp._adjust_height
		};
		return rect;
	};

	_pGrid._closePopup = function () {
		var edit = this._currentCellEditor;
		if (edit && edit._popupcontrol) {
			edit._closePopup();
		}
	};


	_pGrid._destroyOverlayElements = function () {
		var overlay_elements = this._overlay_elements;
		if (overlay_elements.length) {
			for (var i = 0, n = overlay_elements.length; i < n; i++) {
				overlay_elements[i].destroy();
			}
			overlay_elements = [];
		}
		this._overlay_elements = [];
	};

	_pGrid._setOverlayElements = function (overlay_elements, overlay_index) {
		if (overlay_index > -1 && overlay_index < overlay_elements.length) {
			for (var i = overlay_elements.length - 1; i >= overlay_index; i--) {
				overlay_elements[i].destroy();
				overlay_elements.splice(i, 1);
			}
		}
		this._overlay_elements = overlay_elements;
	};

	_pGrid._getTreeStats = function (rowidx) {
		return this._treeStates[rowidx];
	};

	_pGrid._getTreeCheck = function (rowidx) {
		return this._treeChecked[rowidx];
	};

	_pGrid._setOverlayElementProperty = function (elem, left, top, width, height, style_cells, display_text, is_fake_merge) {
		if (!elem) {
			return;
		}


		elem.setElementPosition(left, top);
		elem.setElementSize(width, height);

		if (style_cells && style_cells.length > 0) {
			var cellobj = style_cells[0];
			var cellobj_last = style_cells[style_cells.length - 1];
			var cellinfo = cellobj._refinfo;

			if (!is_fake_merge && cellinfo.suppressalign.indexOf("first") != 0) {
				if (cellinfo.suppressalign.indexOf("last") == 0) {
					cellobj = cellobj_last;
				}
				else {
					cellobj = style_cells[Math.floor(style_cells.length / 2)];
				}
				cellinfo = cellobj._refinfo;
			}

			var selected = cellobj.selected;

			cellobj.selected = false;
			var datarow = this._getDataRow(cellobj._rowidx);

			var display_type = cellinfo._getDisplaytype(this._getDataRow(cellobj._rowidx));
			if (display_type == "imagecontrol") {
				elem.setElementImageUrl(cellobj._getDisplayText());
			}
			else {
				elem.setElementText(cellobj._getDisplayText());
				elem.setElementWordWrap(cellinfo._getWordwrap(datarow));
			}
			elem.setElementToolTip(cellobj.tooltiptext);


			var font = cellobj.on_find_CurrentStyle_font(cellobj._pseudo);
			var color = cellobj.on_find_CurrentStyle_color(cellobj._pseudo);
			elem.setElementFont(font);
			elem.setElementColor(color);

			var cursor = cellobj.on_find_CurrentStyle_cursor(cellobj._pseudo);
			elem.setElementCursor(cursor);

			var align = cellobj.on_find_CurrentStyle_align(cellobj._pseudo);
			if (is_fake_merge) {
				elem.setElementAlignXY(align.halign, align.valign);
			}
			else if (cellinfo.suppressalign.indexOf("first") == 0) {
				elem.setElementAlignXY(align.halign, "top");
			}
			else if (cellinfo.suppressalign.indexOf("last") == 0) {
				elem.setElementAlignXY(align.halign, "bottom");
			}
			else {
				elem.setElementAlignXY(align.halign, "middle");
			}

			var cell_hpos = 0;
			var merge_width = cellobj.width;
			if (is_fake_merge) {
				var merge_col = cellinfo._col;
				var style_cellinfo = null;
				for (var i = 1, n = style_cells.length; i < n; i++) {
					style_cellinfo = style_cells[i]._refinfo;
					if (style_cellinfo && merge_col < style_cellinfo._col) {
						merge_width += style_cells[i].width;
						merge_col = style_cellinfo._col;
					}
				}
			}

			var border = cellobj_last.on_find_CurrentStyle_border(cellobj._pseudo);
			var padding = cellobj.on_find_CurrentStyle_padding(cellobj._pseudo);
			if (merge_width > (width + padding.left + border.right._width)) {
				cell_hpos = merge_width - (width + padding.left + border.right._width);
			}
			elem.updateCellNodeClient(left, top, width, height, cell_hpos, padding.left);
			cellobj.selected = selected;
		}
	};

	_pGrid._adjustOverlayElements = function (is_create, fake_merge) {
		return;

		if (is_create || fake_merge) {
			this._destroyOverlayElements();
		}

		if (!this._curFormat || (!this._is_use_suppress && !this._is_use_fakemerge)) {
			return false;
		}

		var retn = false;
		var overlay_elements = this._overlay_elements;
		var elements = [], style_cells = [], display_text = "", cellobj = null, cellinfo = null;
		var pos = null, elem = null, style_cell = null;
		var left = 0, top = 0, width = 0, height = 0, overlay_index = 0;
		var cols_len = this._curFormat._cols.length;

		if (this._is_use_suppress) {
			var band = this._bodyBand;

			if (!band) {
				return false;
			}

			var rows = band._get_rows();
			var total_dispcnt;
			var rows_len = rows.length;
			var fixcnt = (this._fixed_rowcnt > 0) ? (this._fixed_rowcnt - this._fixed_startrow) : 0;
			var fixerow = this._fixed_endrow;
			var toprow = this._toprowpos[0];
			var dispcnt = this._disprowcnt;

			if (!rows_len) {
				return false;
			}

			var cells = rows[0]._cells;
			for (var i = 0; i < cols_len; i++) {
				cellinfo = this._getBodyCellInfo(i);

				if (cellinfo && cellinfo.suppress != 0 && cellinfo.suppressalign.indexOf("over") > 0) {
					cellidx = cellinfo._cellidx;
					top = left = -1;
					width = height = 0;
					total_dispcnt = fixcnt + dispcnt;
					elements = [];

					for (var j = 0; j < rows_len; j++) {
						cellobj = this._getBodyCellItem(j, cellidx);

						if (cellobj && cellobj._isCellSuppress()) {
							if (fixcnt > 0) {
								if (cellobj._rowidx > fixerow && cellobj._rowidx < toprow) {
									continue;
								}
							}
							else {
								if (cellobj._rowidx < toprow) {
									continue;
								}
							}

							if (total_dispcnt-- == 0) {
								break;
							}


							pos = cellobj._setPositionInGrid();
							left = (left < 0) ? pos.left : left;
							top = (top < 0) ? pos.top : top;


							if (pos.top > top) {
								elements.push(cellobj._control_element);
							}
							else {
								elements.splice(0, 1, cellobj._control_element);
							}

							var subrow_index = 1;
							var subrow_cell = null;
							if (cells.length > cols_len && cellinfo._rowspan == 1) {
								subrow_cell = this._getBodyCellItem(j, cellidx + (cols_len * subrow_index));
								while (subrow_cell) {
									elements.push(subrow_cell._control_element);
									subrow_index++;
									subrow_cell = this._getBodyCellItem(j, cellidx + (cols_len * subrow_index));
								}
								subrow_cell = elements[elements.length - 1].linkedcontrol;
								subrow_index = null;
							}

							var suppinfo = cellobj._getSuppressInfo();

							if (!suppinfo || suppinfo.text_proc == 0) {
								display_text = cellobj._display_text;
							}

							if (!cellobj._hideInner) {
								cellobj._hideInnerElement();
							}

							style_cells.push(cellobj);

							if (suppinfo && suppinfo.last) {
								if (subrow_cell) {
									pos = subrow_cell._setPositionInGrid();
									subrow_cell = null;
								}
								width = (pos.right > left) ? pos.right - left : 0;
								height = (pos.bottom > top) ? pos.bottom - top : 0;

								elem = null;
								if (elements.length > 0) {
									if (overlay_elements[overlay_index]) {
										elem = overlay_elements[overlay_index];
										elem.setTargetElements(elements);
									}
									else {
										elem = new nexacro.EventPassOverlayElement(this._control_element, elements);
										elem.create();
										overlay_elements.push(elem);
									}

									if (elem) {
										overlay_index++;
										this._setOverlayElementProperty(elem, left, top, width, height, style_cells, display_text);
									}
								}
								else {
									cellobj._showInnerElement();
								}

								elements = [];
								style_cells = [];
								display_text = "";
								pos = style_cell = null;
								left = top = -1;
								height = width = 0;
							}
						}
					}
				}
			}
			retn = true;
		}


		var fake_mergecell_arr = this._fake_mergecell_arr;
		if (this._is_use_fakemerge && fake_mergecell_arr.length) {
			var start_column, end_column, start_row, end_row, subrow_start, subrow_end;
			for (var i = 0, n = fake_mergecell_arr.length; i < n; i++) {
				elements = [];
				style_cells = [];
				fake_mergecell = fake_mergecell_arr[i];
				start_row = fake_mergecell.start_row;
				end_row = fake_mergecell.end_row;
				start_column = fake_mergecell.start_column;
				end_column = fake_mergecell.end_column;

				var j = 0;
				if (fake_mergecell.start_row == -1 || fake_mergecell.start_row == -2) {
					j = start_column;
				}

				for (; j <= end_column; j++) {
					if (fake_mergecell.start_row == -1) {
						start_row = end_row = 0;
						subrow_start = (fake_mergecell.start_subrow >= 0) ? fake_mergecell.start_subrow : 0;
						subrow_end = (fake_mergecell.end_subrow >= 0) ? fake_mergecell.end_subrow : this._curFormat._headrows.length - 1;
					}
					else if (fake_mergecell.start_row == -2) {
						start_row = end_row = 0;
						subrow_start = (fake_mergecell.start_subrow >= 0) ? fake_mergecell.start_subrow : 0;
						subrow_end = (fake_mergecell.end_subrow >= 0) ? fake_mergecell.end_subrow : this._curFormat._summrows.length - 1;
					}
					else {
						cellinfo = this._getBodyCellInfo(j);
						if (cellinfo) {
							if (cellinfo._col < start_column || cellinfo._col > end_column) {
								continue;
							}
						}
						else {
							break;
						}
					}

					for (var k = start_row; k <= end_row; k++) {
						if (fake_mergecell.start_row >= 0) {
							subrow_start = 0;
							subrow_end = this._curFormat._bodyrows.length - 1;

							if (k == end_row && fake_mergecell.end_subrow != undefined) {
								subrow_end = fake_mergecell.end_subrow;
							}

							if (k == start_row && fake_mergecell.start_subrow != undefined) {
								subrow_start = fake_mergecell.start_subrow;
							}
						}

						for (var l = subrow_start; l <= subrow_end; l++) {
							if (fake_mergecell.start_row == -1) {
								cellobj = this._getCurrentHeadCell(j + (cols_len * l), true);
							}
							else if (fake_mergecell.start_row == -2) {
								cellobj = this._getCurrentSummCell(j + (cols_len * l), true);
							}
							else {
								cellobj = this._getCurrentBodyCell(k, j + (cols_len * l));
							}

							if (cellobj) {
								elements.push(cellobj._control_element);
								style_cells.push(cellobj);
							}
						}
					}
				}

				if (style_cells.length > 0) {
					if (1) {
						style_cell = null, display_text = null;
						elem = overlay_elements[overlay_index];
						if (!elem) {
							elem = new nexacro.EventPassOverlayElement(this._control_element, elements);
							elem.create();
							overlay_elements.push(elem);
						}
						else {
							elem.setTargetElements(elements);
						}

						cellinfo = style_cells[0]._refinfo;
						if (cellinfo) {
							if (style_cells[0].subcells.length) {
								cellinfo = style_cells[0].subcells[0]._refinfo;
							}
							display_text = cellinfo._getDisplayText(fake_mergecell.start_row);
						}

						var s_pos = style_cells[0]._setPositionInGrid();
						var e_pos = style_cells[style_cells.length - 1]._setPositionInGrid();
						left = s_pos.left;
						top = s_pos.top;
						width = (e_pos.right > left) ? e_pos.right - left : 0;
						height = (e_pos.bottom > top) ? e_pos.bottom - top : 0;

						this._setOverlayElementProperty(elem, left, top, width, height, style_cells, display_text, true);

						left = top = width = height = 0;
						s_pos = null, e_pos = null, style_cell = null, display_text = "", elem = null;
						overlay_index++;
					}
					else {
						style_cells[0]._showInnerElement();
					}
				}
				fake_mergecell = null, e_cell = null;
			}
			retn = true;
		}

		this._setOverlayElements(overlay_elements, overlay_index);
		return retn;
	};


	_pGrid._moveToAccessibilityCell = function (type, tabstop, extcomp, colmove) {
		if (this._is_band_focus && !tabstop) {
			var retn = true;
			if (type == "prev" || type == "up") {
				retn = this._setAccessibilityBandFocus(type);
			}
			else {
				if (type == "next" || (type == "down" && this._currentBand == "head")) {
					this.currentcell = this.currentsubrow = this.currentcol = 0;
				}

				if (!this._moveToPosAccessibilityCell(this.currentrow, this.currentcell)) {
					retn = this._setAccessibilityBandFocus(type);
				}
			}
			return retn;
		}

		if (this._currentBand == "grid") {
			if (type == "prev" || type == "next" || type == "down") {
				if (tabstop) {
					if (type == "next") {
						if (this._bodyBand && this._bodyBand._get_rows().length > 0) {
							var editcell = null;
							editcell = this._getFirstEditableCell();

							if (editcell && editcell.row !== null) {
								this._showEditorFocus = true;
								if (this.vscrollbar && this.vscrollbar.visible) {
									this.vscrollbar.set_pos(0);
								}

								this._currentBand = "body";
								this._moveToPosAccessibilityCell(editcell.row, editcell.cell);
								this._showEditorFocus = false;
								return true;
							}
						}
					}
					return false;
				}
				return this._setAccessibilityBandFocus(type, true);
			}
			else {
				this._accept_arrow = false;
				return false;
			}
		}

		var band;
		var retn = true;
		var cellobj = null;
		var accessibility_enable = false;
		this._is_band_focus = false;
		this._beforegridrowpos = this.currentrow;
		this._beforegridcolpos = this.currentcol;

		if (this._currentBand == "body") {
			this._is_first_bodycell = false;

			for (; true; ) {
				if (tabstop) {
					retn = this._moveToCell(type, true, colmove, undefined, undefined, true);
				}
				else {
					retn = this._moveToCell(type, false, colmove, undefined, undefined, true);
				}

				if (retn) {
					if (this._showEditing) {
						this._hideEditor();
					}
					cellobj = this._getAccessibilityCurrentCell();
					if (cellobj) {
						if (tabstop) {
							cellobj._setFocus(false);
							break;
						}
						else {
							var cellinfo = cellobj._refinfo;
							var datarow = this._getDataRow(cellobj._rowidx);
							var display_type = cellinfo._getDisplaytype(datarow);

							accessibility_enable = cellobj.accessibilityenable;
							if (accessibility_enable) {
								if (this.autoenter == "select") {
									this._showEditor();
								}
								else {
									if (cellobj._subComp && display_type != "treeitemcontrol") {
										cellobj._subComp._setFocus(false);
									}
									else {
										cellobj._setFocus(false);
									}
								}
								break;
							}
						}
					}
				}
				else {
					if (!tabstop) {
						retn = this._setAccessibilityBandFocus(type);
					}
					break;
				}
			}
			return retn;
		}
		if (tabstop) {
			if (this._currentBand == "head") {
				if (this._bodyBand._get_rows().length > 0) {
					this._currentBand = "body";
					var editcell = this._getFirstEditableCell();

					if (editcell.row !== null) {
						this._is_first_bodycell = true;
						retn = this._moveToPosAccessibilityCell(editcell.row, editcell.cell);
					}
					return true;
				}
			}
			return false;
		}

		if (type == "next") {
			for (; true; ) {
				this.currentcell++;
				cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					if (cellobj.width <= 0) {
						continue;
					}
					else {
						accessibility_enable = cellobj.accessibilityenable;
						if (!accessibility_enable) {
							continue;
						}

						var cellinfo = cellobj._refinfo;
						this.currentsubrow = cellinfo._row;
						this.currentcol = cellinfo._col;
						cellobj._showfull();
						cellobj._setFocus(false);
					}
				}
				else {
					this.currentcell--;
					retn = this._setAccessibilityBandFocus(type);
				}
				break;
			}
		}
		else if (type == "prev") {
			for (; true; ) {
				this.currentcell--;
				cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					if (cellobj.width <= 0) {
						continue;
					}
					else {
						accessibility_enable = cellobj.accessibilityenable;
						if (!accessibility_enable) {
							continue;
						}

						var cellinfo = cellobj._refinfo;
						this.currentsubrow = cellinfo._row;
						this.currentcol = cellinfo._col;
						cellobj._showfull();
						cellobj._setFocus(false);
					}
				}
				else {
					this.currentcell++;
					retn = this._setAccessibilityBandFocus(type);
				}
				break;
			}
		}
		else if (type == "up") {
			if (this._currentBand == "head") {
				band = this._headBand;
			}
			else {
				band = this._summBand;
			}

			if (band) {
				var row, col;
				cellobj = this._getAccessibilityCurrentCell();

				if (cellobj) {
					var cellinfo = cellobj._refinfo;
					var curRow = cellinfo._row;
					var curCol = cellinfo._col;
					var cellidx = this.currentcell;
					while (true) {
						this.currentcell--;
						cellobj = this._getAccessibilityCurrentCell();
						if (cellobj) {
							row = cellobj._refinfo._row;
							col = cellobj._refinfo._col;

							if (col == curCol && row == curRow - 1) {
								accessibility_enable = cellobj.accessibilityenable;
								if (!accessibility_enable) {
									continue;
								}

								this.currentsubrow = row;
								this.currentcol = col;
								cellobj._setFocus(false);
								break;
							}
						}
						else {
							if (this.currentcell <= 0) {
								this.currentcol = curCol;
								this.currentcell = cellidx;
								retn = this._setAccessibilityBandFocus(type);
								break;
							}
						}
					}
				}
			}
		}
		else if (type == "down") {
			var row, col;
			cellobj = this._getAccessibilityCurrentCell();

			if (cellobj) {
				var cellinfo = cellobj._refinfo;
				var curRow = cellinfo._row;
				var curCol = cellinfo._col;
				var cellidx = this.currentcell;
				while (true) {
					this.currentcell++;
					cellobj = this._getAccessibilityCurrentCell();
					if (cellobj) {
						row = cellobj._refinfo._row;
						col = cellobj._refinfo._col;

						if (col == curCol && row == curRow + 1) {
							this.currentsubrow = row;
							this.currentcol = col;
							cellobj._setFocus(false);
							break;
						}
					}
					else {
						this.currentcell = cellidx;
						retn = this._setAccessibilityBandFocus(type);
						break;
					}
				}
			}
		}
		return retn;
	};

	_pGrid._setAccessibilityBandFocus = function (type, extcomp, hotkey) {
		var retn = true, band = null, curBand = this._currentBand;
		if (type == "next") {
			if (curBand == "grid") {
				if (this._headBand) {
					band = this._headBand;
					this._currentBand = "head";
					this._currentDSrow = this.currentrow = -1;
				}
				else if (this._bodyBand && this.body && this.summarytype != "top" && this.summarytype != "lefttop") {
					band = this._bodyBand;
					this._currentBand = "body";
					this._currentDSrow = this.currentrow = 0;
				}
				else if (this._summBand) {
					band = this._summBand;
					this._currentBand = "summary";
					this._currentDSrow = this.currentrow = -2;
				}
				else {
					this._accept_arrow = false;
					retn = false;
				}
			}
			else {
				if (curBand == "head") {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
					else if (this._summBand) {
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "body") {
					if (this._summBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "summary" && (this.summarytype == "top" || this.summarytype == "lefttop")) {
					if (this._bodyBand) {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
				}
			}

			if (band) {
				if (hotkey) {
					this.currentsubrow = 0;
					this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
				}
				else {
					var accessibility_enable = band.accessibilityenable;
					if (!(nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) && (!this._is_band_focus && (accessibility_enable || (band._isBody && this.rowcount <= 0)))) {
						if (extcomp) {
							this.currentcell = this.currentsubrow = this.currentcol = 0;
						}
						this._moveToAccessibilityBand(false);
					}
					else {
						if (curBand == "grid" && extcomp && !this.accessibilityenable) {
							this._first_focus = true;
						}
						this.currentcell = this.currentsubrow = this.currentcol = 0;
						this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
					}
				}
			}
		}
		else if (type == "prev") {
			if (curBand == "grid") {
				if (extcomp || hotkey) {
					if (this._summBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
						this.currentsubrow = band._get_rows()[0]._format_rows.length - 1;
					}
					else if (this._bodyBand && this.body) {
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = this.rowcount - 1;
						this.currentsubrow = band._get_rows()[0]._format_rows.length - 1;
					}
					else if (this._headBand) {
						band = this._headBand;
						this._currentBand = "head";
						this._currentDSrow = this.currentrow = -1;
						this.currentsubrow = band._get_rows()[0]._format_rows.length - 1;
					}
					else {
						retn = false;
					}
				}
				else {
					retn = false;
				}
			}
			else {
				if (curBand == "summary") {
					var accessibility_enable = this._summBand.accessibilityenable;
					if (!this._is_band_focus && accessibility_enable) {
						this._moveToAccessibilityBand(false);
					}
					else {
						if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
							this._is_first_bodycell = true;
							band = this._bodyBand;
							this._currentBand = "body";
							this.currentrow = this._currentDSrow = this.rowcount - 1;
						}
						else if (this._headBand) {
							band = this._headBand;
							this._currentBand = "head";
							this._currentDSrow = this.currentrow = -1;
						}
					}
				}
				else if (curBand == "body") {
					var accessibility_enable = this._bodyBand.accessibilityenable;
					if (!this._is_band_focus && accessibility_enable) {
						this._hideEditor();
						this._moveToAccessibilityBand(false);
					}
					else {
						if (this._summBand && (this.summarytype == "top" || this.summarytype == "lefttop")) {
							this._hideEditor();
							band = this._summBand;
							this._currentBand = "summary";
							this._currentDSrow = this.currentrow = -2;
							this.currentsubrow = this._curFormat._summrows.length - 1;
						}
						else if (this._headBand) {
							this._hideEditor();
							band = this._headBand;
							this._currentBand = "head";
							this._currentDSrow = this.currentrow = -1;
							this.currentsubrow = this._curFormat._headrows.length - 1;
						}
					}
				}
			}

			if (band) {
				var accessibility_enable = band.accessibilityenable;
				if (band._isBody && this.rowcount <= 0) {
					this._removeAccessibilityCurrentFocus();
					band._setFocus(false);
					this.currentcol = this._curFormat._cols.length - 1;
					this.currentcell = -1;
				}
				else {
					if (!hotkey) {
						this.currentcol = this._curFormat._cols.length - 1;
						this.currentcell = this._getAccessibilityLastCellIndex() - 1;
					}
					this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
				}
			}
		}
		else if (type == "up") {
			if (curBand == "summary") {
				var accessibility_enable = this._summBand.accessibilityenable;
				if (!this._is_band_focus && accessibility_enable) {
					this._moveToAccessibilityBand(false);
				}
				else {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = this.rowcount - 1;
						this.currentsubrow = 0;
					}
					else if (this._headBand) {
						band = this._headBand;
						this._currentBand = "head";
						this._currentDSrow = this.currentrow = -1;
						this.currentsubrow = this._curFormat._headrows.length - 1;
					}
					else {
						curBand = "grid";
					}
				}
			}
			else if (curBand == "body") {
				var accessibility_enable = this._bodyBand.accessibilityenable;
				if (!this._is_band_focus && accessibility_enable) {
					this._hideEditor();
					this._moveToAccessibilityBand(false);
				}
				else {
					if (this._summBand && (this.summarytype == "top" || this.summarytype == "lefttop")) {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
						this.currentsubrow = this._curFormat._summrows.length - 1;
					}
					else if (this._headBand) {
						this._hideEditor();
						band = this._headBand;
						this._currentBand = "head";
						this._currentDSrow = this.currentrow = -1;
						this.currentsubrow = this._curFormat._headrows.length - 1;
					}
					else {
						curBand = "grid";
					}
				}
			}
			else if (curBand == "head" && this.currentcell <= 0) {
				var accessibility_enable = this._headBand.accessibilityenable;
				if (!this._is_band_focus && accessibility_enable) {
					this._moveToAccessibilityBand(false);
				}
				else {
					curBand = "grid";
				}
			}

			if (band) {
				this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
			}
			else if (curBand == "grid") {
				this._is_band_focus = false;
				this._currentBand = curBand;

				if (this.accessibilityenable) {
					this._moveToAccessibilityBand(true);
				}
				else {
					retn = this._moveToAccessibilityCell(type);
				}
			}
		}
		else if (type == "down") {
			if (curBand == "grid") {
				retn = this._setAccessibilityBandFocus("next", true);
			}
			else {
				if (curBand == "head") {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
					else if (this._summBand) {
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "body" && this.summarytype != "top" && this.summarytype != "lefttop") {
					if (this._summBand) {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
					}
					else if (this._bodyBand && this.rowcount <= 0) {
						this._hideEditor();
						this._accept_arrow = false;
						retn = false;
					}
				}
				else if (curBand == "summary" && (this.summarytype == "top" || this.summarytype == "lefttop")) {
					if (this._bodyBand) {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
				}

				if (band) {
					var accessibility_enable = band.accessibilityenable;
					if (!this._is_band_focus && (accessibility_enable || (this.rowcount <= 0 && band._isBody))) {
						this._moveToAccessibilityBand(false);
					}
					else {
						this.currentsubrow = 0;
						this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
					}
				}
				else if (this.currentcell >= this._getAccessibilityLastCellIndex() - 1) {
					this._accept_arrow = false;
					retn = false;
				}
			}
		}
		return retn;
	};

	_pGrid._getAccessibilityCurrentCell = function (ridx, cidx) {
		var cellobj = null;

		if (ridx === undefined || cidx === undefined) {
			ridx = -1;
			cidx = -1;
		}
		else if (cidx < 0) {
			cidx = this._getAccessibilityCellIndex();
		}

		if (this._currentBand == "body") {
			cellobj = this._getCurrentBodyCell(ridx, cidx);
		}
		else {
			if (this._currentBand == "head") {
				cellobj = this._getCurrentHeadCell(cidx);
			}
			else {
				cellobj = this._getCurrentSummCell(cidx);
			}
		}
		return cellobj;
	};

	_pGrid._getAccessibilityLastCellIndex = function () {
		var cellidx = -1;
		if (this._currentBand == "head" && this._curFormat._headcells) {
			cellidx = this._curFormat._headcells.length;
		}
		else if (this._currentBand == "body" && this._curFormat._bodycells) {
			cellidx = this._curFormat._bodycells.length;
		}
		else if (this._currentBand == "summary" && this._curFormat._summcells) {
			cellidx = this._curFormat._summcells.length;
		}
		return cellidx;
	};

	_pGrid._removeAccessibilityCurrentFocus = function (togrid) {
		var win = this._getWindow();
		if (togrid) {
			win._removeFromCurrentFocusPath(this, true);
		}
		else {
			if (this._currentBand == "body") {
				win._removeFromCurrentFocusPath(this._bodyBand, true);
			}
			else if (this._currentBand == "head") {
				win._removeFromCurrentFocusPath(this._headBand, true);
			}
			else if (this._currentBand == "summary") {
				win._removeFromCurrentFocusPath(this._summBand, true);
			}
		}
	};

	_pGrid._moveToAccessibilityBand = function (togrid) {
		this._removeAccessibilityCurrentFocus(togrid);

		if (!togrid) {
			this._is_band_focus = true;
			var curBand = this._currentBand;
			if (curBand == "head") {
				this._headBand._setFocus(false);
			}
			else if (curBand == "body") {
				this._bodyBand._setFocus(false);
			}
			else if (curBand == "summary") {
				this._summBand._setFocus(false);
			}
		}
		else {
			this._setFocus(false);
		}
	};

	_pGrid._moveToPosAccessibilityCell = function (rowidx, cellidx) {
		var retn = false, cellobj = null, rowidx = this._getDataRow(rowidx), cellidx = this._getAccessibilityCellIndex(cellidx);

		if (this._currentBand == "body" && this._bodyBand._get_rows().length > 0) {
			this._hideEditor();
			cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				var cellinfo = cellobj._refinfo;
				if (cellinfo._row != rowidx || cellinfo._cellidx != cellidx) {
					cellobj._changeStatus("focused", false);
				}
			}
			this._moveToPosCell(rowidx, cellidx);
		}

		cellobj = this._getAccessibilityCurrentCell(rowidx, cellidx);

		if (cellobj) {
			var cellinfo = cellobj._refinfo;

			retn = true;
			cellobj._showfull();
			if (this._currentBand != "body" || this.autoenter != "select" || !this._showEditing) {
				if (cellobj._subComp && cellinfo._getDisplaytype(rowidx) != "treeitemcontrol") {
					cellobj._subComp._setFocus(false);
				}
				else {
					cellobj._setFocus(false);
				}
			}
			else {
				this._showEditor();
			}
			this.currentcol = cellinfo._col;
		}
		this._is_band_focus = this._is_first_focus = false;
		return retn;
	};

	_pGrid._getAccessibilityCellIndex = function (cellidx) {
		var band = null;
		if (this._currentBand == "body") {
			band = this._bodyBand;
		}
		else if (this._currentBand == "head") {
			band = this._headBand;
		}
		else if (this._currentBand == "summary") {
			band = this._summBand;
		}

		if (band) {
			var row = band._get_row(this._getDataRow(this.currentrow));
			if (row) {
				var cells = row._cells, cellinfo = null;
				for (var i = 0, n = cells.length; i < n; i++) {
					cellinfo = cells[i]._refinfo;
					if (cellinfo._col <= this.currentcol && this.currentcol <= (cellinfo._col + cellinfo._colspan - 1)) {
						if (this.currentsubrow == 0) {
							return cells[i]._cellidx;
						}
						else {
							if (cellinfo._row == this.currentsubrow) {
								return cells[i]._cellidx;
							}
						}
					}
				}
			}
		}
		return (cellidx >= 0) ? cellidx : null;
	};

	_pGrid._on_useInnerDsCells = function () {
		this._refreshAll();
	};

	_pGrid.blinkCell = function (row, cell_columns, keepsec, blinkcnt) {
		var cnt = (blinkcnt * 2), run = 1;
		var sec = keepsec / (blinkcnt * 2);
		var callback;
		var pthis = this;
		var proc = true;

		if (typeof (cell_columns) == "string") {
			var cell_columns = cell_columns.split(",");
			var cellinfos = [];

			for (var ii = 0; ii < cell_columns.length; ii++) {
				var bind_cellinfos = pthis._getBindTextCellInfo(cell_columns[ii].trim());
				cellinfos = cellinfos.concat(bind_cellinfos[0]);
			}

			callback = function (id) {
				for (var i = 0, n = cellinfos.length; i < n; i++) {
					var cell = pthis._getCurrentBodyCell(row, cellinfos[i]._cellidx);
					if (cell) {
						cell._changeUserStatus("blinked", proc);
					}
				}
				proc = !proc;

				if (cnt == run) {
					pthis._blinktask["id" + id].destroy();
					pthis._blinktask["id" + id] = undefined;
				}
				run++;
			};
		}
		else {
			var cell = pthis._getCurrentBodyCell(row, cell_columns);

			callback = function (id) {
				if (cell) {
					cell._changeUserStatus("blinked", proc);
				}

				proc = !proc;
				if (cnt == run) {
					pthis._blinktask["id" + id].destroy();
					pthis._blinktask["id" + id] = undefined;
				}
				run++;
			};
		}

		if (!this._blinktask) {
			this._blinktask = {
			};
		}

		var blinktask = new nexacro._CallbackTimer(this, callback, sec);

		this._blinktask["id" + blinktask.id] = blinktask;
		blinktask.start();
	};

	delete _pGrid;
}
