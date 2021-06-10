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
if (nexacro.Grid) {
	var _pGrid = nexacro.Grid.prototype;

	_pGrid.createCssDesignContents = function () {
		if (!this.parent.Grid_innerdataset) {
			var obj;
			obj = new Dataset("Grid_innerdataset", this.parent);
			obj._setContents("<ColumnInfo><Column id=\"Column0\" size=\"256\" type=\"STRING\"/><Column id=\"Column1\" size=\"256\" type=\"STRING\"/><Column id=\"Column2\" size=\"256\" type=\"STRING\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">000</Col><Col id=\"Column1\">Animation</Col><Col id=\"Column2\"/></Row><Row><Col id=\"Column0\">001</Col><Col id=\"Column1\">Button</Col><Col id=\"Column2\">true</Col></Row><Row><Col id=\"Column0\">002</Col><Col id=\"Column1\">CheckBox</Col><Col id=\"Column2\">true</Col></Row><Row><Col id=\"Column0\">003</Col><Col id=\"Column1\">Division</Col><Col id=\"Column2\"/></Row><Row><Col id=\"Column0\">004</Col><Col id=\"Column1\">Edit</Col><Col id=\"Column2\"/></Row><Row><Col id=\"Column0\">005</Col><Col id=\"Column1\">FilteredDataset</Col><Col id=\"Column2\">true</Col></Row><Row><Col id=\"Column0\">006</Col><Col id=\"Column1\">GroupBox</Col><Col id=\"Column2\"/></Row><Row><Col id=\"Column0\">007</Col><Col id=\"Column1\">HideAnimation</Col><Col id=\"Column2\"/></Row><Row><Col id=\"Column0\">008</Col><Col id=\"Column1\">ImageViewer</Col><Col id=\"Column2\"/></Row></Rows>");
			this.parent.addChild(obj.name, obj);
		}

		var obj = this;
		obj.set_taborder("0");
		obj.set_binddataset("Grid_innerdataset");
		obj.createFormat();
		obj = null;
	};

	_pGrid.destroyCssDesignContents = function () {
		var obj = this.parent.removeChild("Grid_innerdataset");
		if (obj) {
			obj.destroy();
			obj = null;
		}
	};

	_pGrid._org_on_created_contents = _pGrid.on_created_contents;
	_pGrid.on_created_contents = function (win) {
		this._org_on_created_contents(win);
	};
	delete _pGrid;

	var _pGridCellControl = nexacro._GridCellControl.prototype;

	_pGridCellControl._org_on_apply_status = _pGridCellControl._on_apply_status;
	_pGridCellControl._on_apply_status = function (oldstatus, status, olduserstatus, userstatus) {
		if (!this._isPreviewMode() || this.parent instanceof nexacro._GridRowControl) {
			return this._org_on_apply_status(oldstatus, status, olduserstatus, userstatus);
		}

		nexacro.Component.prototype._on_apply_status.call(this, oldstatus, status, olduserstatus, userstatus);
	};

	_pGridCellControl._org_on_create_contents = _pGridCellControl.on_create_contents;
	_pGridCellControl.on_create_contents = function () {
		if (!this._isPreviewMode() || this.parent instanceof nexacro._GridRowControl) {
			return this._org_on_create_contents();
		}

		this._text_elem = new nexacro.TextBoxElement(this._control_element, "text");
		this._text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
		this._text_elem.setElementText(this._type_name);
	};

	_pGridCellControl._org_on_created_contents = _pGridCellControl.on_created_contents;
	_pGridCellControl.on_created_contents = function (win) {
		if (!this._isPreviewMode() || this.parent instanceof nexacro._GridRowControl) {
			return this._org_on_created_contents(win);
		}

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.create(win);
		}
	};

	_pGridCellControl._org_on_destroy_contents = _pGridCellControl.on_destroy_contents;
	_pGridCellControl.on_destroy_contents = function () {
		if (!this._isPreviewMode() || this.parent instanceof nexacro._GridRowControl) {
			return this._org_on_destroy_contents();
		}

		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}
	};

	_pGridCellControl._org_on_change_containerRect = _pGridCellControl.on_change_containerRect;
	_pGridCellControl.on_change_containerRect = function (width, height) {
		if (!this._isPreviewMode() || this.parent instanceof nexacro._GridRowControl) {
			return this._org_on_change_containerRect(width, height);
		}

		if (this._text_elem) {
			this._text_elem.setElementSize(width, height);
		}
	};

	delete _pGridCellControl;

	var _pGridBandControl = nexacro._GridBandControl.prototype;

	_pGridBandControl._org_on_create_contents = _pGridBandControl.on_create_contents;
	_pGridBandControl.on_create_contents = function () {
		if (!this._isPreviewMode() || this.parent instanceof nexacro.Grid) {
			return this._org_on_create_contents();
		}

		var cellcnt = 3;
		var cell, left = 0, top = 0, height = 24, width = (this._getClientWidth() / cellcnt), cellidx = 0, row = 0;

		if (this.id == "head") {
			row = -1;
		}
		else if (this.id == "summary") {
			row = -2;
		}

		this._cells = [];

		for (var i = 0; i < cellcnt; i++) {
			cell = new nexacro._GridCellControl("cell", left, top, width, height, null, null, this, null, row, cellidx);
			left += width;
			cellidx++;
			cell.createComponent();
			this._cells.push(cell);
		}
	};

	_pGridBandControl._org_on_created_contents = _pGridBandControl.on_created_contents;
	_pGridBandControl.on_created_contents = function (win) {
		if (!this._isPreviewMode() || this.parent instanceof nexacro.Grid) {
			return this._org_on_created_contents(win);
		}

		for (var i = 0; i < this._cells.length; i++) {
			this._cells[i].on_created();
		}
	};

	_pGridBandControl._org_on_destroy_contents = _pGridBandControl.on_destroy_contents;
	_pGridBandControl.on_destroy_contents = function () {
		if (!this._isPreviewMode() || this.parent instanceof nexacro.Grid) {
			return this._org_on_destroy_contents();
		}

		for (var i = 0; i < this._cells.length; i++) {
			this._cells[i].destroy();
		}
		this._cells = null;
	};

	_pGridBandControl._org_on_change_containerRect = _pGridBandControl.on_change_containerRect;
	_pGridBandControl.on_change_containerRect = function (width, height) {
		if (!this._isPreviewMode() || this.parent instanceof nexacro.Grid) {
			return this._org_on_change_containerRect(width, height);
		}

		if (this._cells) {
			var left = 0, top = 0, width = (width / this._cells.length), height = 24;

			for (var i = 0; i < this._cells.length; i++) {
				this._cells[i].move(left, top, width, height);
				left += width;
			}
		}
	};

	delete _pGridBandControl;

	var _pCellTreeItemControl = nexacro._CellTreeItemControl.prototype;

	_pCellTreeItemControl._org_on_create_contents = _pCellTreeItemControl.on_create_contents;
	_pCellTreeItemControl.on_create_contents = function () {
		if (!this._isPreviewMode() || this.parent instanceof nexacro._GridCellControl) {
			return this._org_on_create_contents();
		}

		this._rightline_ctrl = new nexacro._CellTreeLineControl("nexatreeline", 0, 0, 0, 0, null, null, this);
		this._rightline_ctrl.createComponent(true);
		this._rightline_ctrl._control_element.setElementBorderNone(true, true, true, false);

		this._chk_ctrl = new nexacro._GridCellControlCheckbox("treeitemcheckbox", 0, 0, 0, 0, this);
		this._chk_ctrl.createComponent(true);

		this._text_ctrl = new nexacro.Static("treeitemtext", 0, 0, 0, 0, null, null, null, null, null, null, this);
		this._text_ctrl.createComponent(true);

		this._img_ctrl = new nexacro._TreeItemIconControl("treeitemimage", 0, 0, 0, 0, null, null, this);
		this._img_ctrl.createComponent(true);

		this._btnimg_ctrl = new nexacro._TreeItemIconControl("treeitembutton", 0, 0, 0, 0, null, null, this);
		this._btnimg_ctrl.createComponent(true);

		this._text_ctrl.set_text(this._type_name);
		this._adjustSubCompAlign_design();
	};

	_pCellTreeItemControl._org_on_created_contents = _pCellTreeItemControl.on_created_contents;
	_pCellTreeItemControl.on_created_contents = function (win) {
		if (!this._isPreviewMode() || this.parent instanceof nexacro._GridCellControl) {
			return this._org_on_created_contents(win);
		}

		if (this._rightline_ctrl) {
			this._rightline_ctrl.on_created();
		}
		if (this._btnimg_ctrl) {
			this._btnimg_ctrl.on_created();
		}
		if (this._chk_ctrl) {
			this._chk_ctrl.on_created();
		}
		if (this._img_ctrl) {
			this._img_ctrl.on_created();
		}
		if (this._text_ctrl) {
			this._text_ctrl.on_created();
		}

		this._is_created = true;
	};

	_pCellTreeItemControl._getLineHeight_design = function () {
		var height = this._adjust_height;
		var border = this._getCurrentStyleBorder();
		var bordbottom = (border) ? border.bottom._width : 0;
		return height - bordbottom;
	};

	_pCellTreeItemControl._adjustSubCompAlign_design = function () {
		var width = this._getClientWidth();
		var height = this._getClientHeight();
		var level = 0;
		var subgap = 6;
		var defaultsize = 9;
		var gap = 16;

		var line_adjust_top = 0;
		var padding = this._getCurrentStylePadding();
		var line_adjust_left = ((padding) ? padding.left : 0);
		var parentheight = this._getLineHeight_design();
		var offset = (level * gap) + defaultsize;
		var lineleft = offset;
		var linetop = line_adjust_top;
		var linewidth = 0;
		var halfheight = Math.round(parentheight / 2);
		var lineheight = halfheight;

		var line_button_gap_width = 0;
		var line_button_gap_height = 0;

		if (this._btnimg_ctrl) {
			var buttonWidth = this._btnimg_ctrl.width;

			if (buttonWidth <= 0) {
				buttonWidth = defaultsize;
			}

			var buttonHeight = this._btnimg_ctrl.height;

			if (buttonHeight <= 0) {
				buttonHeight = defaultsize;
			}

			var buttonLeft = offset - Math.round(buttonWidth / 2);
			if (!this._rightline_ctrl.visible) {
				buttonLeft -= (Math.round(buttonWidth / 2) * level);
			}
			var buttonTop = Math.round((height - buttonHeight) / 2);
			var buttonRight = buttonLeft + buttonWidth;
			var buttonBottom = buttonTop + buttonHeight;


			if (this._btnimg_ctrl.visible) {
				lineheight = Math.floor((parentheight - buttonHeight) / 2);
				line_button_gap_width = buttonWidth;
				line_button_gap_height = buttonHeight;
			}

			linewidth = buttonWidth;
			this._btnimg_ctrl.move(buttonLeft, buttonTop, buttonWidth, buttonHeight);
			offset = buttonLeft + buttonWidth;
		}
		else {
			linewidth = defaultsize;
		}


		if (this._rightline_ctrl && this._rightline_ctrl.visible) {
			this._rightline_ctrl.move(lineleft + line_adjust_left + Math.round(line_button_gap_width / 2), linetop, linewidth - (line_button_gap_width / 2), halfheight);
			offset = this._rightline_ctrl.left + this._rightline_ctrl.width;
		}
		else {
			offset += 1;
		}

		defaultsize = 14;
		if (this._chk_ctrl && this._chk_ctrl.visible) {
			var checkWidth = this._chk_ctrl.width;
			if (checkWidth <= 0) {
				checkWidth = defaultsize;
			}

			var checkHeight = this._chk_ctrl.height;
			if (checkHeight <= 0) {
				checkHeight = defaultsize;
			}

			var checkLeft = offset;
			var checkTop = Math.round((height - checkHeight) / 2);

			offset += checkWidth;
			this._chk_ctrl.move(checkLeft, checkTop, checkWidth, checkHeight);
		}

		if (this._img_ctrl && this._img_ctrl.visible) {
			offset += 1;

			var imageWidth = this._img_ctrl._adjust_width;
			var imageHeight = this._img_ctrl._adjust_height;

			if (imageWidth <= 0) {
				imageWidth = defaultsize;
			}
			if (imageHeight <= 0) {
				imageHeight = defaultsize;
			}

			if (imageWidth > 0 && imageHeight > 0) {
				var imageLeft = offset;
				var imageTop = Math.round((height - imageHeight) / 2);
				var imageRight = imageLeft + imageWidth;
				var imageBottom = imageTop + imageHeight;

				offset += imageWidth;
			}
			else {
				;
			}

			this._img_ctrl.move(imageLeft, imageTop, imageWidth, imageHeight);

			offset += 5;
		}
		else {
			offset += 4;
		}

		if (this._text_ctrl) {
			this._text_ctrl.move(offset, 0, width - offset, height);
		}
	};

	_pCellTreeItemControl._org_on_change_containerRect = _pCellTreeItemControl.on_change_containerRect;
	_pCellTreeItemControl.on_change_containerRect = function (width, height) {
		if (!this._isPreviewMode() || this.parent instanceof nexacro._GridCellControl) {
			return this._org_on_change_containerRect(width, height);
		}

		this._adjustSubCompAlign_design();
	};

	delete _pCellTreeItemControl;

	var _pGridLineControl = nexacro._CellTreeLineControl.prototype;
	delete _pGridLineControl;

	var _pGridCellControlCheckbox = nexacro._GridCellControlCheckbox.prototype;

	_pGridCellControlCheckbox._org_on_created_contents = _pGridCellControlCheckbox.on_created_contents;
	_pGridCellControlCheckbox.on_created_contents = function (win) {
		if (!this._isPreviewMode()) {
			return this._org_on_created_contents(win);
		}
	};
	delete _pGridCellControlCheckbox;

	var _pGridBandInfo = nexacro.GridBandInfo.prototype;
	_pGridBandInfo.on_getChildObjectforCSSPreivew = function (idcssselector) {
		return this._bandctrl;
	};
}

_pGrid._getControlComputedStyle = function (target, type, properties) {
	this._createTempControl(target.band ? target.band.bandid : null);

	var band = this._ctse_tempband;
	var rowc = this._ctse_temprow;
	var cell = this._ctse_tempcell;
	var subcell = this._ctse_tempsubcell;
	var cellcontrol = this._ctse_tempcellcontrol;
	if (target.band) {
		band.set_cssclass(target.band.cssclass);
	}

	if (target.cell) {
		cell.set_cssclass(target.cell.cssclass);
	}

	if (target.subcell) {
		subcell.set_cssclass(target.subcell.cssclass);
	}


	var control = null;
	switch (type) {
		case 0:
			control = band;
			break;
		case 1:
			control = rowc;
			break;
		case 2:
			control = cell;
			break;
		case -2:
			control = subcell;
			break;
		case 5:
			control = this._createTempCellControl(cell, "nexacro.Edit", "celledit");
			break;
		case 6:
			control = this._createTempCellControl(cell, "nexacro.MaskEdit", "cellmaskedit");
			break;
		case 7:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			break;
		case 8:
			control = this._createTempCellControl(cell, "nexacro.Button", "cellbutton");
			break;
		case 9:
			control = this._createTempCellControl(cell, "nexacro.CheckBox", "cellcheckbox");
			control.set_value(false);
			break;
		case -9:
			control = this._createTempCellControl(cell, "nexacro.CheckBox", "cellcheckbox");
			control.set_value(true);
			break;
		case 10:
			control = this._createTempCellControl(cell, "nexacro._ImageAreaControl", "cellimage");
			break;
		case 11:
			control = this._createTempCellControl(cell, "nexacro.Combo", "cellcombo");
			break;
		case 12:
			control = this._createTempCellControl(cell, "nexacro.Combo", "cellcombo");
			control = control.comboedit;
			break;
		case 13:
			control = this._createTempCellControl(cell, "nexacro.Combo", "cellcombo");
			control = control.dropbutton;
			break;
		case 14:
			control = this._createTempCellControl(cell, "nexacro.Calendar", "cellcalendar");
			break;
		case 15:
			control = this._createTempCellControl(cell, "nexacro.Calendar", "cellcalendar");
			control = control.dropbutton;
			break;
		case 16:
			control = this._createTempCellControl(cell, "nexacro.Calendar", "cellcalendar");
			control = control.calendaredit;
			break;
		case 17:
			control = this._createTempCellControl(cell, "nexacro.Calendar", "cellcalendar");
			control = control.calendarspinupbutton;
			break;
		case 18:
			control = this._createTempCellControl(cell, "nexacro.Calendar", "cellcalendar");
			control = control.calendarspindownbutton;
			break;
		case 19:
			control = this._createTempCellControl(cell, "nexacro.ProgressBar", "cellprogressbar");
			break;
		case 20:
			control = this._createTempCellControl(cell, "nexacro.ProgressBar", "cellprogressbar");
			control = control.progressbaritem;
			break;
		case 21:
			control = this._createTempCellControl(cell, "nexacro.ProgressBar", "cellprogressbar");
			control = control.progressbartext;
			break;
		case 22:
			control = this._createTempCellControl(cell, "nexacro.ProgressBar", "cellprogressbar");
			control.set_pos(1);
			control = control.progressstartcap;
			break;
		case 23:
			control = this._createTempCellControl(cell, "nexacro.ProgressBar", "cellprogressbar");
			control.set_pos(1);
			control = control.progressendcap;
			break;
		case 24:
			control = this._createTempCellControl(cell, "nexacro.Button", "cellexpandbutton");
			break;
		case 25:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			control = control.hscrollbar;
			break;
		case 26:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			control = control.hscrollbar.decbutton;
			break;
		case 27:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			control = control.hscrollbar.incbutton;
			break;
		case 28:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			control = control.hscrollbar.trackbar;
			break;
		case 29:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			control = control.vscrollbar;
			break;
		case 30:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			control = control.vscrollbar.decbutton;
			break;
		case 31:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			control = control.vscrollbar.incbutton;
			break;
		case 32:
			control = this._createTempCellControl(cell, "nexacro.TextArea", "celltextarea");
			control = control.vscrollbar.trackbar;
			break;
	}

	if (nexacro._isNull(target)) {
		return;
	}

	if (nexacro._isNull(control)) {
		nexacro.__onNexacroStudioError("type : " + type);
		return;
	}
	nexacro._flushCommand(this._getWindow());

	var control_elem = control._control_element;
	var ret = nexacro._getComputedStyleProperties(control_elem, properties);

	this._destroyTempControl();

	return ret;
};

_pGrid._createTempControl = function (bandid) {
	var band = this._ctse_tempband = new nexacro.Static("ctse_tempband", 0, -10, 0, 0, 0, 0, null, null, null, null, this);
	band._is_subcontrol = true;
	band._type_name = nexacro._GridBandControl.prototype._type_name;
	band._bandid = bandid ? bandid : "head";

	band.on_getIDCSSSelector = function () {
		return this._bandid;
	};
	band.createComponent();

	var rowc = this._ctse_temprow = new nexacro.Static("ctse_temprow", 0, -10, 0, 0, 0, 0, null, null, null, null, band);
	rowc._is_subcontrol = true;
	rowc._type_name = nexacro._GridRowControl.prototype._type_name;
	rowc.on_getIDCSSSelector = function () {
		return "row";
	};
	rowc.createComponent();

	var cell = this._ctse_tempcell = new nexacro.Static("ctse_tempcell", 0, -10, 0, 0, 0, 0, null, null, null, null, rowc);
	cell._is_subcontrol = true;
	cell._type_name = nexacro._GridCellControl.prototype._type_name;
	cell.on_getIDCSSSelector = function () {
		return "cell";
	};
	cell.createComponent();

	var subcell = this._ctse_tempsubcell = new nexacro.Static("ctse_tempsubcell", 0, -10, 0, 0, 0, 0, null, null, null, null, cell);
	subcell._is_subcontrol = true;
	subcell._type_name = nexacro._GridSubCellControl.prototype._type_name;
	subcell.on_getIDCSSSelector = function () {
		return "subcell";
	};
	subcell.createComponent();
};

_pGrid._createTempCellControl = function (parent, classname, control_name) {
	var classnameobj = eval(classname);
	var cellcontrol = this._ctse_tempcellcontrol = new classnameobj("ctse_tempcellcontrol", 0, -10, 0, 0, 0, 0, null, null, null, null, parent);
	cellcontrol._is_subcontrol = true;
	cellcontrol._type_name = classnameobj.prototype._type_name;

	cellcontrol.on_getIDCSSSelector = function () {
		return control_name;
	};
	cellcontrol.createComponent();

	return cellcontrol;
};
_pGrid._destroyTempControl = function () {
	this._ctse_tempsubcell.destroy();
	this._ctse_tempcell.destroy();
	this._ctse_temprow.destroy();
	this._ctse_tempband.destroy();

	this._ctse_tempsubcell = null;
	this._ctse_tempcell = null;
	this._ctse_temprow = null;
	this._ctse_tempband = null;

	if (this._ctse_tempcellcontrol) {
		this._ctse_tempcellcontrol.destroy();
		this._ctse_tempcellcontrol = null;
	}
};
