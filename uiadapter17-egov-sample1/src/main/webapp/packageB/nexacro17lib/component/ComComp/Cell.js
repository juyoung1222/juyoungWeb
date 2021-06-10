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

if (!nexacro.CellInfo) {
	nexacro.CellInfo = function (id, parent, view, type, idx, is_design) {
		this.parent = parent;
		this.id = this.name = id;
		this._type = type;
		this._view = view;
		this._cellidx = idx;
		this._col = 0;
		this._colspan = 0;
		this._row = 0;
		this._rowspan = 0;
		this._area = "";
		this._endcol = false;
		this._subcells = [];
		this._isSubCell = false;
		this._maskstringtypeobj = new nexacro._EditMaskTypeString();
		this._masknumbertypeobj = new nexacro._GridMaskTypeNumber();
		this._key_direction = null;
		this._expr_updatecell_props = [];

		this._allocatePropertys(this._property_map);
		this._is_design = is_design;
	};

	var _pCellInfo = nexacro._createPrototype(nexacro.Object, nexacro.CellInfo);
	nexacro.CellInfo.prototype = _pCellInfo;
	_pCellInfo._type_name = "CellInfo";

	_pCellInfo._property_map = [["cssclass", true, "", true], ["displaytype", true, "normal", false], ["edittype", true, "none", false], ["tooltiptype", false, "none", false], ["tooltiptext", true, "", false], ["autosizecol", false, "default", false, 2, ["none", "limitmin", "limitmax", "default"]], ["autosizerow", false, "default", false, 2, ["none", "limitmin", "limitmax", "default"]], ["displayexpdec", true, -1, false, 0], ["locale", true, "", false], ["text", true, null, false], ["expr", true, null, false], ["subsumtext", true, "", false], ["combodataset", true, "", false], ["combocodecol", true, "", false], ["combodatacol", true, "", false], ["combodisplaynulltext", true, "", false], ["combodisplaynulltype", true, "none", false, 2, ["none", "nulltext"]], ["combodisplayrowcount", true, undefined, false, 0], ["combotype", true, "dropdown", false, 2, ["dropdown", "search", "filter", "filterlike"]], ["comboitemheight", true, undefined, false, 0], ["combopopuptype", true, undefined, false, 2, ["normal", "center", "system", "none"]], ["comboscrollbarsize", true, undefined, false, 0], ["combobuttonsize", true, undefined, false], ["comboautoselect", true, false, false], ["comboimemode", true, "none", false, 2, ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"]], ["combopopupsize", true, undefined, false], ["calendardisplaynulltext", true, "", false], ["calendardisplaynulltype", true, "default", false, 2, ["default", "none", "nulltext", "nullmask"]], ["calendarinnerdataset", true, "", false], ["calendarbackgroundcolumn", true, "", false], ["calendarbordercolumn", true, "", false], ["calendardatecolumn", true, "", false], ["calendartextcolorcolumn", true, "", false], ["calendardaysize", true, undefined, false], ["calendarheadformat", true, "yyyy.MM", false], ["calendarheadheight", true, undefined, false, 0], ["calendarpopupsize", true, undefined, false], ["calendarshowmonthspin", true, undefined, false, 1], ["calendarshowyearspin", true, undefined, false, 1], ["calendartype", true, undefined, false], ["calendarusetrailingday", true, undefined, false], ["calendarweekformat", true, undefined, false], ["calendardateformat", true, "yyyy-MM-dd ddd", false], ["calendareditformat", true, "yyyy-MM-dd", false], ["calendarpopuptype", true, undefined, false, 2, ["normal", "center", "system", "none"]], ["calendarbuttonsize", true, undefined, false], ["calendarautoselect", true, false, false], ["editacceptsenter", true, false, false], ["editacceptstab", true, false, false], ["editautoselect", true, false, false], ["editautoskip", true, false, false], ["editimemode", true, "none", false, 2, ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"]], ["editmaxlength", true, -1, false, 0], ["edituseime", true, "global", false, 2, ["global", "local", "local,keep", "none"]], ["editinputfilter", true, undefined, false], ["editinputmode", true, undefined, false], ["editinputtype", true, undefined, false], ["maskeditautoselect", true, false, false], ["maskeditlimitbymask", true, "decimal", false, 2, ["none", "integer", "decimal", "both"]], ["maskeditformat", true, "", false], ["maskeditmaskchar", false, "_", false], ["maskeditclipmode", true, "includespace", false, 2, ["includespace", "excludespace"]], ["maskeditautoskip", true, false, false], ["maskedittrimtype", true, "none", false, 2, ["none", "left", "righ", "both"]], ["maskedittype", true, "number", false, 2, ["number", "string"]], ["textareascrollbarsize", true, undefined, false, 0], ["textareamaxlength", true, -1, false, 0], ["textareaautoselect", true, false, false], ["textareaimemode", true, "none", false, 2, ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"]], ["textareainputfilter", true, undefined, false], ["textareainputmode", true, undefined, false], ["textareainputtype", true, undefined, false], ["textareascrollbartype", true, "none", false], ["textareascrolltype", true, "both", false, 2, ["none", "both", "horizontal", "vertical"]], ["textareaautoskip", true, false, false], ["textareauseime", true, "global", false, 2, ["global", "local", "local,keep", "none"]], ["expandchar", true, "", false], ["expandimage", true, "", false], ["expandshow", true, "hide", false, 2, ["hide", "show"]], ["expandsize", true, 16, false, 0], ["treecheck", true, "", false], ["treecollapseimage", true, "", false], ["treeexpandimage", true, "", false], ["treeitemimage", true, "", false], ["treelevel", true, "", false], ["treestartlevel", true, 0, false, 0], ["treestate", true, "", false], ["progressbarblockgap", true, null, false], ["progressbarblocksize", true, null, false], ["progressbardirection", true, null, false], ["progressbarsmooth", true, null, false], ["checkboxsize", true, -1, false, 0], ["imagestretch", true, "none", false, 2, ["none", "fit", "fixaspectratio"]], ["controlautosizingtype", true, "both", false, 2, ["none", "width", "height", "both"]], ["accessibilityaction", false, null, false], ["accessibilitydesclevel", false, "all", false], ["accessibilitydescription", false, null, false], ["accessibilityenable", true, true, false, 1], ["accessibilitylabel", true, null, false], ["accessibilityrole", false, "gridcell", false], ["color", false, null, true], ["font", false, null, true], ["wordSpacing", false, null, true], ["letterSpacing", false, null, true], ["textDecoration", false, null, true], ["wordWrap", true, null, true], ["borderRadius", false, null, true], ["border", false, null, true], ["background", false, null, true], ["edge", false, null, true], ["cursor", false, null, true], ["opacity", false, null, true], ["boxShadow", false, null, true], ["padding", false, null, true], ["textAlign", false, null, true], ["verticalAlign", false, null, true]
	];

	_pCellInfo._use_controls = [["buttoncontrol"], ["checkboxcontrol"], ["imagecontrol"], ["combocontrol", [["comboedit"], ["dropbutton"]]], ["calendarcontrol", [["calendaredit"], ["dropbutton"], ["calendarspinupbutton"], ["calendarspindownbutton"]]], ["editcontrol"], ["maskeditcontrol"], ["textareacontrol", [["hscrollbar"], ["hscrollbar", "decbutton"], ["hscrollbar", "incbutton"], ["hscrollbar", "trackbar"], ["vscrollbar"], ["vscrollbar", "decbutton"], ["vscrollbar", "incbutton"], ["vscrollbar", "trackbar"]]], ["progressbarcontrol", [["progressbaritem"], ["progressbartext"], ["progressstartcap"], ["progressendcap"]]]
	];

	_pCellInfo._chkExistSubControl = function (displaytype) {
		var usecontrols = this._use_controls;

		for (var i = 0, n = usecontrols.length; i < n; i++) {
			if (usecontrols[i][0] == displaytype) {
				return displaytype;
			}
		}
		return "";
	};

	_pCellInfo._getChildControlList = function (displaytype) {
		var usecontrols = this._use_controls;

		for (var i = 0, n = usecontrols.length; i < n; i++) {
			if (usecontrols[i][0] == displaytype) {
				return usecontrols[i][1];
			}
		}
		return null;
	};

	_pCellInfo._getDefaultPropVal = function (propname) {
		var _property_map = this._property_map;
		var prop, deft;

		for (var i = 0, n = _property_map.length; i < n; i++) {
			prop = _property_map[i][0];
			deft = _property_map[i][2];

			if (prop == propname) {
				return deft;
			}
		}
		;
		return undefined;
	};

	_pCellInfo._getNormalStyleProps = function () {
		var _property_map = this._property_map;
		var prop, isstyle;
		var props = [];

		for (var i = 0, n = _property_map.length; i < n; i++) {
			prop = _property_map[i][0];
			isstyle = _property_map[i][3];

			if (isstyle) {
				props.push(prop);
			}
		}
		;
		return props;
	};

	_pCellInfo._allocatePropertys = function (_property_map) {
		var prop, bind, deft;
		for (var i = 0; i < _property_map.length; i++) {
			prop = _property_map[i][0];
			bind = _property_map[i][1];
			deft = _property_map[i][2];

			if (bind) {
				this[prop] = new nexacro.BindableValue(deft);
			}
			else {
				this[prop] = deft;
			}
		}
		;
	};

	nexacro._makeCellInfoPropertySetter = function (ptype_val, _property_map) {
		var prop, bind, deft, str, type, eval_str = "";
		function enumjoin (arr) {
			var str = "\"" + arr[0] + "\"";
			for (var i = 1; i < arr.length; i++) {
				str += ",\"" + arr[i] + "\"";
			}
			return str;
		}
		;

		for (var i = 0; i < _property_map.length; i++) {
			prop = _property_map[i][0];
			bind = _property_map[i][1];
			deft = _property_map[i][2];
			type = _property_map[i][4];

			if (bind) {
				str = "$PTYPE$.set_$ATTR$ = function (v)\n";
				str += "{\n";
				str += "    if (v != this.$ATTR$._value)\n";
				str += "    {\n";

				if (type == 0) {
					str += "        this.$ATTR$._set_intval(v);\n";
				}
				else if (type == 2) {
					str += "        this.$ATTR$._set_enumval(v, [" + enumjoin(_property_map[i][5]) + "]);\n";
				}
				else {
					str += "        this.$ATTR$._set(v);\n";
				}

				str += "        this._afterProcBindTypeProp();\n";
				str += "    }\n";
				str += "};\n\n";
			}
			else {
				str = "$PTYPE$.set_$ATTR$ = function (v)\n";
				str += "{\n";
				if (type == 2) {
					str += "    var val = this.$ATTR$;\n";
					str += "    switch (v)\n";
					str += "    {\n";

					var arr = _property_map[i][5];
					for (var j = 0; j < arr.length; j++) {
						str += "        case \"" + arr[j] + "\":\n";
					}
					str += "            val = v;\n";
					str += "    }\n";
					str += "    if (val != this.$ATTR$)\n";
				}
				else {
					str += "    if (v != this.$ATTR$)\n";
				}

				str += "    {\n";
				str += "        this.$ATTR$ = v;\n";
				str += "    }\n";
				str += "};\n\n";
			}
			str = str.replace(/\$PTYPE\$/g, ptype_val).replace(/\$ATTR\$/g, prop);
			eval_str += str;
		}
		;
		eval(eval_str);
	};

	nexacro._makeCellInfoPropertySetter("_pCellInfo", _pCellInfo._property_map);

	nexacro._makePropertyDesignSetter = function (ptype_val, _property_map) {
		var prop;
		var str = "";

		for (var i = 0; i < _property_map.length; i++) {
			prop = _property_map[i][0];

			str += "$PTYPE$.design_set_" + prop + " = function (v)\n";
			str += "{\n";
			str += "        this._refinfo.set_" + prop + "(v);\n";
			str += "        this._updateAll();\n";
			str += "        this._apply_normalproperty(\"" + prop + "\", v);\n";
			str += "};\n\n";

			str += "$PTYPE$.design_get_" + prop + " = function ()\n";
			str += "{\n";
			str += "        var prop = this._refinfo." + prop + ";\n";
			str += "        if (prop)\n";
			str += "        {\n";
			str += "            if (nexacro._isNumber(prop) || prop._bindtype == undefined)\n";
			str += "                return prop;\n";
			str += "            else\n";
			str += "                return prop._value;\n";
			str += "        }\n";
			str += "        return prop;\n";
			str += "};\n\n";
		}
		str = str.replace(/\$PTYPE\$/g, ptype_val);

		eval(str);
	};

	_pCellInfo._addPropertyMap = function (ptype_val, _property_map_add) {
		this._property_map = this._property_map.concat(_property_map_add);
		nexacro._makeCellInfoPropertySetter(ptype_val, _property_map_add);
	};

	_pCellInfo.set_id = function (id) {
		this.id = this.name = id;
	};

	_pCellInfo.set_name = function (name) {
	};

	_pCellInfo.set_displaytype = function (v) {
		if (v != this.displaytype) {
			var oldVal = this.displaytype._value;
			this.displaytype._set(v);
			this._afterProcBindTypeProp();

			if (this._view) {
				if (oldVal == "treeitemcontrol") {
					this._view._removeTreeCellinfo(this);
				}
				if (v == "treeitemcontrol") {
					this._view._setTreeCellinfo(this);
				}
			}
		}
	};

	_pCellInfo.set_maskeditmaskchar = function (v) {
		if (!v) {
			v = "_";
		}
		var val = v.toString().charAt(0);
		if (val != this.maskeditmaskchar) {
			this.maskeditmaskchar = val;
			this._afterProcBindTypeProp();
		}
	};

	_pCellInfo.set_cssclass = function (v) {
		if (v != this.cssclass._value) {
			this.cssclass._set(v);
			this._afterProcBindTypeProp();
		}
	};

	_pCellInfo.set_expr = function (v) {
		if (v != this.expr._value) {
			var str = v.toString();
			var tag = str.substr(0, 4).toUpperCase();
			if (tag != "" && tag != "EXPR") {
				v = "EXPR:" + v;
			}
			this.expr._set(v);
			this._afterProcBindTypeProp();
		}
	};


	_pCellInfo.destroy = function () {
		this.parent = null;

		for (var i = 0, n = this._subcells.length; i < n; i++) {
			this._subcells[i].destroy();
		}
		;
		this._subcells = null;
		this._maskstringtypeobj = null;
		this._masknumbertypeobj = null;

		var _property_map = this._property_map;
		var prop;

		for (var i = 0; i < _property_map.length; i++) {
			prop = _property_map[i][0];
			this[prop] = null;
		}
		;
		this._property_map = null;
		this._key_direction = null;
		this._expr_updatecell_props = null;
	};

	_pCellInfo._getBindDataset = function () {
		return this._view._getBindDataSet ? this._view._getBindDataSet() : this._view._binddataset;
	};
	_pCellInfo._getExprCacheFn = function (ctx) {
		return this._view._getExprFuncByCtx ? this._view._getExprFuncByCtx(ctx) : this._view._exprcache[ctx];
	};
	_pCellInfo._setExprCacheFn = function (ctx, func) {
		return this._view._setExprFuncByCtx ? this._view._setExprFuncByCtx(ctx, func) : this._view._exprcache[ctx] = func;
	};

	_pCellInfo._getValue = function (rowidx) {
		return this._getAttrValue(this.text, rowidx);
	};

	_pCellInfo._setValue = function (rowidx, v) {
		this._setAttrValue(this.text, rowidx, v);
	};

	_pCellInfo._getDisplaytype = function (rowidx) {
		var dt = this.displaytype;
		var d = this._getAttrValue(dt, rowidx);

		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				var dataset = this._getBindDataset();
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var coltype = dataset._getColumnType(colid);

				switch (coltype) {
					case 1:
					case 9:
						return "text";
					case 2:
					case 3:
					case 4:
						return "number";
					case 5:
						return "date";
					case 6:
						return "time";
					case 7:
						return "datetime";
					default:
						return "none";
				}
			}
			else {
				return "text";
			}
		}
		return d;
	};

	_pCellInfo._getEdittype = function (rowidx) {
		var dt = this.edittype;
		var d = this._getAttrValue(dt, rowidx);

		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				var dataset = this._getBindDataset();
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var colinfo = dataset._getColumnType(colid);
				if (!colinfo) {
					return "text";
				}

				var coltype = colinfo;

				switch (coltype) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 9:
						return "text";
					case 5:
					case 6:
					case 7:
						return "date";
					case 8:
						return "none";
				}
			}
			else {
				return "text";
			}
		}
		return d;
	};

	_pCellInfo._getWordwrap = function (rowidx) {
		var wordwrap = this._getAttrValue(this.wordWrap, rowidx);
		return wordwrap;
	};

	_pCellInfo._getAttrValue = function (attr, rowidx) {
		if (attr == undefined) {
			return undefined;
		}

		if (attr._bindtype == undefined) {
			return attr;
		}
		else if (attr._bindtype == 0) {
			return attr._value;
		}
		else {
			var dataset = this._getBindDataset();
			if (dataset == null) {
				return undefined;
			}

			if (attr._bindtype == 1) {
				return dataset.getColumn(rowidx, attr._bindexpr);
			}
			else {
				var bindexpr = attr._bindexpr;
				var val = attr._value;
				var s = val.toLowerCase().indexOf("bind:");
				if (s >= 0) {
					bindexpr = bindexpr.substring(s, bindexpr.length);
					bindexpr = dataset.getColumn(rowidx, bindexpr);
				}

				var exprfn = this._getExprCacheFn(bindexpr);
				if (exprfn == null) {
					exprfn = dataset._createExprFunc(bindexpr);
					this._setExprCacheFn(bindexpr, exprfn);
				}
				if ((typeof exprfn) == "function") {
					this.col = this._col;
					this.row = this._row;
					return exprfn.call(this, rowidx, rowidx, this._view, dataset, dataset._viewRecords, dataset._viewRecords[rowidx], []);
				}
			}
		}

		return undefined;
	};

	_pCellInfo._setAttrValue = function (attr, rowidx, v) {
		if (attr._bindtype == 1) {
			var dataset = this._getBindDataset();
			if (dataset) {
				dataset.setColumn(rowidx, attr._bindexpr, v);
			}
		}
	};

	_pCellInfo._getDefaultTextAlign = function (displayType, rowidx) {
		var align = "center";

		switch (displayType) {
			case "normal":
				var displayType = this._getDisplaytype(rowidx);
				if (displayType == "number") {
					align = "right";
				}
				else if (displayType == "date" || displayType == "time" || displayType == "datetime") {
					align = "center";
				}
				else {
					align = "left";
				}
				break;
			case "mask":
				var type = this._getAttrValue(this.maskedittype, rowidx);
				if (type == "number") {
					align = "right";
				}
				else {
					align = "left";
				}
				break;
			case "number":
			case "exponent":
			case "currency":
				align = "right";
				break;
			default:
				align = "center";
				break;
		}
		return align;
	};

	_pCellInfo._getCheckboxsize = function (rowidx) {
		var val = this._getAttrValue(this.checkboxsize, rowidx);

		if ((val === "" || val < 0) && this._view) {
			val = this._view.cellcheckboxsize;
		}

		return val;
	};

	_pCellInfo._getControlButtonsize = function (rowidx, control) {
		var val = this._getAttrValue(this[control + "buttonsize"], rowidx);

		if (val == null && this._view) {
			val = this._view["cell" + control + "buttonsize"];
		}

		return val;
	};

	_pCellInfo._getControlScrollbarsize = function (rowidx, control) {
		var val = this._getAttrValue(this[control + "scrollbarsize"], rowidx);

		if (val == null || val < 0) {
			if (this._view) {
				val = this._view["cell" + control + "scrollbarsize"];
			}
		}
		else {
			val = parseInt(val, 10);
		}

		if (val == null || val < 0) {
			val = undefined;
		}

		return val;
	};

	_pCellInfo._getControlPopuptype = function (rowidx, control) {
		var val = this._getAttrValue(this[control + "popuptype"], rowidx);

		if (!val && this._view) {
			val = this._view["cell" + control + "popuptype"];
		}

		return val;
	};

	_pCellInfo._getControlPopupsize = function (rowidx, control) {
		var val = this._getAttrValue(this[control + "popupsize"], rowidx);

		if (!val && this._view) {
			val = this._view["cell" + control + "popupsize"];
		}

		return val;
	};

	_pCellInfo._afterProcBindTypeProp = function () {
	};

	_pCellInfo._getTooltipText = function (rowidx) {
		var text = this._getAttrValue(this.tooltiptext, rowidx);
		if (!text) {
			text = "";
		}

		return text;
	};

	_pCellInfo._getTreeCheck = function (rowidx) {
		return this._getAttrValue(this.treecheck, rowidx);
	};

	_pCellInfo._getTreeCollapseImage = function (rowidx) {
		return this._getAttrValue(this.treecollapseimage, rowidx);
	};

	_pCellInfo._getTreeExpandImage = function (rowidx) {
		return this._getAttrValue(this.treeexpandimage, rowidx);
	};

	_pCellInfo._getTreeItemImage = function (rowidx) {
		return this._getAttrValue(this.treeitemimage, rowidx);
	};

	_pCellInfo._getTreeLevel = function (rowidx) {
		var v = this._getAttrValue(this.treelevel, rowidx);
		v = parseInt(v) | 0;
		return v;
	};

	_pCellInfo._getTreeStartLevel = function (rowidx) {
		var v = this._getAttrValue(this.treestartlevel, rowidx);
		v = parseInt(v) | 0;
		return v;
	};

	_pCellInfo._getTreeState = function (rowidx) {
		return this._getAttrValue(this.treestate, rowidx);
	};

	_pCellInfo._setTreeCheck = function (rowidx, v) {
		return this._setTreeBindValue(this.treecheck, rowidx, v);
	};

	_pCellInfo._setTreeCollapseImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treecollapseimage, rowidx, v);
	};

	_pCellInfo._setTreeExpandImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treeexpandimage, rowidx, v);
	};

	_pCellInfo._setTreeItemImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treeitemimage, rowidx, v);
	};

	_pCellInfo._setTreeLevel = function (rowidx, v) {
		return this._setTreeBindValue(this.treelevel, rowidx, v);
	};

	_pCellInfo._setTreeStartLevel = function (rowidx, v) {
		return this._setTreeBindValue(this.treestartlevel, rowidx, v);
	};

	_pCellInfo._setTreeState = function (rowidx, v) {
		return this._setTreeBindValue(this.treestate, rowidx, v);
	};

	_pCellInfo._setTreeBindValue = function (attr, rowidx, v) {
		if (attr._bindtype == 1) {
			var dataset = this._getBindDataset();
			if (dataset) {
				dataset._treeBindChanged = true;
				dataset.setColumn(rowidx, v);
			}
		}
	};

	_pCellInfo._getLocale = function (rowidx) {
		var locale = this._getAttrValue(this.locale, rowidx);
		if (!locale && this._view) {
			locale = this._view._getLocale();
		}

		return locale;
	};

	_pCellInfo._getDisplayText = function (rowidx) {
		if (this._is_design) {
			return this.text._value;
		}

		var d = this._getAttrValue(this.displaytype, rowidx);

		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				var dataset = this._getBindDataset();
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var coltype = dataset._getColumnType(colid);

				switch (coltype) {
					case 1:
					case 9:
						return this._getDisplayText_text(rowidx);
					case 2:
					case 3:
					case 4:
						return this._getDisplayText_number(rowidx);
					case 5:
						return this._getDisplayText_date(rowidx, 2);
					case 6:
						return this._getDisplayText_date(rowidx, 0);
					case 7:
						return this._getDisplayText_date(rowidx, 1);
					default:
						return "";
				}
			}
		}
		else {
			if (d == "mask" || d == "maskeditcontrol") {
				var type = this._getAttrValue(this.maskedittype, rowidx);

				if (type == "number") {
					return this._getDisplayText_masknumber(rowidx);
				}
				else {
					return this._getDisplayText_maskstring(rowidx);
				}
			}
			else if (d == "number") {
				return this._getDisplayText_number(rowidx);
			}
			else if (d == "currency") {
				return this._getDisplayText_currency(rowidx);
			}
			else if (d == "date") {
				return this._getDisplayText_date(rowidx);
			}
			else if (d == "calendarcontrol") {
				return this._getDisplayText_date(rowidx, null, true);
			}
			else if (d == "combotext") {
				return this._getDisplayText_combo(rowidx);
			}
			else if (d == "combocontrol") {
				return this._getDisplayText_combo(rowidx, true);
			}
			else if (d == "none") {
				return "";
			}
		}

		return this._getDisplayText_text(rowidx);
	};

	_pCellInfo._getTextValueForDisp = function (rowidx) {
		if (this.expr._value != "" && this.expr._value != null) {
			return this._getAttrValue(this.expr, rowidx);
		}

		return this._getAttrValue(this.text, rowidx);
	};

	_pCellInfo._getDisplayText_text = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);

		if (v != null) {
			v = v.toString();
		}

		return v;
	};

	_pCellInfo._getDisplayText_maskstring = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var mask = this._getAttrValue(this.maskeditformat, rowidx);

		if (v != null) {
			v = v.toString();
		}

		if (mask && mask.length) {
			var maskobj = this._maskstringtypeobj;
			var maskchar = this._getAttrValue(this.maskeditmaskchar, rowidx);
			var locale = this._getLocale(rowidx);

			maskobj.setLocale(locale);
			maskobj.setMask(mask);
			maskobj.setMaskChar(maskchar);
			v = maskobj.applyMask(v);
		}
		return v;
	};

	_pCellInfo._getDisplayText_masknumber = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var mask = this._getAttrValue(this.maskeditformat, rowidx);

		if (mask && mask.length) {
			var locale = this._getLocale(rowidx);
			var maskobj = this._masknumbertypeobj;
			var limittype = this._getAttrValue(this.maskeditlimitbymask, rowidx);

			if (mask === ".") {
				maskobj.setUseGrouping(true);
			}

			maskobj.setLimitType(limittype);
			maskobj.setLocale(locale);
			maskobj.setMask(mask);
			v = maskobj.applyMask(v);
		}
		return v;
	};

	_pCellInfo._getDisplayText_number = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var limittype = this._getAttrValue(this.maskeditlimitbymask, rowidx);
		var locale = this._getLocale(rowidx);
		var maskobj = this._masknumbertypeobj;

		maskobj.setUseGrouping(true);
		maskobj.setLimitType(limittype);
		maskobj.setLocale(locale);
		maskobj.setMask("");
		v = maskobj.applyMask(v);

		return v;
	};

	_pCellInfo._getDisplayText_currency = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var locale = this._getLocale(rowidx);

		if (!isNaN(v)) {
			var nexanum = new nexacro.Number(v);
			v = nexanum.toLocaleCurrencyString(locale);
		}

		return v;
	};

	_pCellInfo._getDisplayText_date = function (rowidx, colType, is_control) {
		var v = this._getTextValueForDisp(rowidx);
		var date = undefined;
		var null_test = 0;
		var nullmask = false;
		var is_date_empty = false;
		var mask = this._getAttrValue(this.calendardateformat, rowidx);

		v = (v) ? v : "";

		if (v.constructor == Date) {
			date = v;
		}
		else {
			var strVal = v.toString();

			for (var i = 0; i < strVal.length; i++) {
				if (strVal.charAt(i) != " ") {
					null_test = 1;
					break;
				}
			}

			if (null_test == 1) {
				if (colType == undefined) {
					if (!mask && strVal.length <= 6) {
						colType = 0;
					}
					else if (!mask && strVal.length <= 8) {
						colType = 2;
					}
					else {
						colType = 1;
					}
				}

				if (colType == 1) {
					v._timecheck = true;
				}

				date = this.__parseDate(strVal, colType, rowidx);
			}
			else {
				if (colType == 1) {
					v._timecheck = true;
				}

				if (this.calendardisplaynulltype._value == "nulltext" && !is_control) {
					return this._getAttrValue(this.calendardisplaynulltext, rowidx);
				}
				else if (this.calendardisplaynulltype._value == "nullmask" && !is_control) {
					nullmask = true;
				}
				else if (this.calendardisplaynulltype._value == "default") {
				}
				else {
					return "";
				}
			}
		}

		if (date == null) {
			is_date_empty = true;
			date = new nexacro.Date();
			date.setFullYear(0);
			date.setMonth(0);
			date.setDate(1);
		}

		var dateStr;
		var locale = this._getLocale(rowidx);
		var locale_info = nexacro.Locale.getLocaleInfo(locale);

		if (mask == "SHORTDATE" || mask == "LONGDATE") {
			var format = "";

			if (mask == "SHORTDATE") {
				format = locale_info.shortdate_format;
			}
			else {
				format = locale_info.longdate_format;
			}

			if (format == "") {
				format = nexacro.Locale._default_shortdate_format;
			}

			var b_ltr_mark = ((this._view && !this._view._isRtl()) && locale_info.direction == "rtl") ? true : false;

			dateStr = date.getLocaleFormatString(locale, format, b_ltr_mark);
		}
		else {
			var yyyy = date.getFullYear();
			if (yyyy == 0) {
				yyyy = "0000";
			}

			var MM = date.getMonth() + 1;
			MM = (MM < 10 ? "0" : "") + MM;

			var dddd = locale_info.weekday_names_long[date.getDay()];
			var ddd = locale_info.weekday_names_short[date.getDay()];
			var dd = date.getDate();

			dd = (dd < 10 ? "0" : "") + dd;

			var yy = date.getYear() % 100;
			var M = +MM;
			var d = +dd;

			var hour = date.getHours();
			hour = (hour < 10 ? "0" : "") + hour;
			var h = +hour;

			var minute = date.getMinutes();
			minute = (minute < 10 ? "0" : "") + minute;
			var mn = +minute;

			var second = date.getSeconds();
			second = (second < 10 ? "0" : "") + second;

			var s = +second;

			if (is_date_empty) {
				hour = h = "00";
				minute = mn = "00";
				second = s = "00";
			}

			var format = mask;

			if (format == null || format.length == 0 || !format.match(/[yMdHhms]/)) {
				format = "yyyy-MM-dd ddd";
			}

			if (nullmask) {
				var maskchar1 = "_";
				var maskchar2 = maskchar1 + maskchar1;
				var maskchar3 = maskchar2 + maskchar1;
				var maskchar4 = maskchar3 + maskchar1;

				dateStr = format.replace("yyyy", maskchar4);
				dateStr = dateStr.replace("MM", maskchar2);
				dateStr = dateStr.replace("ddd", "week");
				dateStr = dateStr.replace("dd", maskchar2);
				dateStr = dateStr.replace("yy", maskchar2);
				dateStr = dateStr.replace("M", maskchar1);
				dateStr = dateStr.replace("d", maskchar1);
				dateStr = dateStr.replace("tt", maskchar2);
				dateStr = dateStr.replace("HH", maskchar2);
				dateStr = dateStr.replace("hh", maskchar2);
				dateStr = dateStr.replace("H", maskchar1);
				dateStr = dateStr.replace("h", maskchar1);
				dateStr = dateStr.replace("mm", maskchar2);
				dateStr = dateStr.replace("m", maskchar1);
				dateStr = dateStr.replace("ss", maskchar2);
				dateStr = dateStr.replace("s", maskchar1);
				dateStr = dateStr.replace("weekL", maskchar4);
				dateStr = dateStr.replace("week", maskchar3);
			}
			else {
				dateStr = format.replace("yyyy", yyyy);
				dateStr = dateStr.replace("MM", MM);
				dateStr = dateStr.replace("dddd", "weekL");
				dateStr = dateStr.replace("ddd", "week");
				dateStr = dateStr.replace("dd", dd);
				dateStr = dateStr.replace("yy", yy);
				dateStr = dateStr.replace("M", M);
				dateStr = dateStr.replace("d", d);

				var hh = hour;
				var tt = "오전";
				if (hour > 12 && hour < 25) {
					hh = hour < 22 ? "0" + (hour - 12) : hour - 12;
					tt = "오후";
				}

				dateStr = dateStr.replace("tt", tt);
				dateStr = dateStr.replace("HH", hour);
				dateStr = dateStr.replace("hh", hh);
				dateStr = dateStr.replace("H", h);
				dateStr = dateStr.replace("h", h);
				dateStr = dateStr.replace("mm", minute);
				dateStr = dateStr.replace("m", mn);
				dateStr = dateStr.replace("ss", second);
				dateStr = dateStr.replace("s", s);
				dateStr = dateStr.replace("weekL", dddd);
				dateStr = dateStr.replace("week", ddd);
			}
		}

		return dateStr;
	};

	_pCellInfo.__parseDate = function (v, dFlag, rowidx) {
		var regexp;
		switch (dFlag) {
			case 0:
				regexp = /(\d{6})/;
				break;
			case 1:
				regexp = /(\d{14})/;
				break;
			default:
				regexp = /(\d{8})/;
				break;
		}

		if (regexp.test(v) == false) {
			var mask = this._getAttrValue(this.calendardateformat, rowidx);
			if (mask && mask.length) {
				var maskobj = new nexacro._EditMaskTypeDate();
				maskobj.setDateMask(mask);
				maskobj.setEditMask(mask);
				v = maskobj.changeNormalizeValue(v);

				delete maskobj;
			}
			else {
				return undefined;
			}
		}

		var date = new nexacro.Date();

		if (dFlag > 0) {
			var year = +v.substring(0, 4);
			var month = +v.substring(4, 6);
			var day = +v.substring(6, 8);


			if (month < 1 || month > 12) {
				return undefined;
			}
			if (day < 1) {
				return undefined;
			}

			if (dFlag == 1) {
				var hour = +v.substring(8, 10);
				var min = +v.substring(10, 12);
				var sec = +v.substring(12, 14);
			}
			else {
				var hour = 0;
				var min = 0;
				var sec = 0;
			}
		}
		else {
			var year = 1900;
			var month = 1;
			var day = 1;
			var hour = +v.substring(0, 2);
			var min = +v.substring(2, 4);
			var sec = +v.substring(4, 6);
		}
		date.setHours(hour, min, sec);
		date.setFullYear(year, month - 1, day);
		return date;
	};

	_pCellInfo._getDisplayText_combo = function (rowidx, is_control) {
		var combodataset = this._getAttrValue(this.combodataset, rowidx);
		var combocodecol = this._getAttrValue(this.combocodecol, rowidx);
		var combodatacol = this._getAttrValue(this.combodatacol, rowidx);
		if (combodataset && combodataset.length && combocodecol && combocodecol.length && combodatacol && combodatacol.length) {
			var ds;
			var v = this._getTextValueForDisp(rowidx);
			var text;

			ds = this._findDataset(combodataset);

			if (ds) {
				text = ds.lookupNF(combocodecol, v, combodatacol);
			}

			if (text) {
				return text.toString();
			}
		}

		if (this.combodisplaynulltype._value == "nulltext" && !is_control) {
			var v = this._getAttrValue(this.combodisplaynulltext, rowidx);
			return v;
		}
		return "";
	};

	_pCellInfo._findDataset = function (combodataset) {
	};

	_pCellInfo._loadXmlElement = function (cellElem, subcell_override_info, is_sub) {
		var col = cellElem.getAttribute("col"), row = cellElem.getAttribute("row"), colspan = cellElem.getAttribute("colspan"), rowspan = cellElem.getAttribute("rowspan"), type = this._type;

		this._col = (col == null ? 0 : parseInt(col));
		this._row = (row == null ? 0 : parseInt(row));
		this._colspan = (colspan == null ? 1 : parseInt(colspan));
		this._rowspan = (rowspan == null ? 1 : parseInt(rowspan));

		var _property_map = this._property_map;
		var prop, attrval;

		for (var i = 0, n = _property_map.length; i < n; i++) {
			prop = _property_map[i][0];
			attrval = cellElem.getAttribute(prop);

			this._loadingxml = true;
			if (attrval) {
				this["set_" + prop](attrval);
			}
			this._loadingxml = false;
		}

		if (!is_sub) {
			var subcells = cellElem.getElementsByTagName("Cell"), subinfo, subcellElem;

			if (!subcell_override_info) {
				subcell_override_info = nexacro.CellInfo;
			}

			for (var i = 0, n = subcells.length; i < n; i++) {
				subcellElem = subcells[i];
				subinfo = new subcell_override_info((this._type + this._cellidx + "_sub" + i), this.parent, this._view, this._type, i);
				subinfo._loadXmlElement(subcellElem, true);
				subinfo._isSubCell = true;
				this._subcells[i] = subinfo;
			}
		}
	};

	_pCellInfo._getXmlString = function () {
		var strContents = "";

		if (this._isSubCell) {
			strContents += "    ";
		}

		strContents += "<Cell col=\"" + this._col;
		strContents += "\" row=\"" + this._row;

		if (this._colspan > 1) {
			strContents += "\" colspan=\"" + this._colspan;
		}
		if (this._rowspan > 1) {
			strContents += "\" rowspan=\"" + this._rowspan;
		}

		var _property_map = this._property_map;
		var prop, bind, deft;

		for (var i = 0, n = _property_map.length; i < n; i++) {
			prop = _property_map[i][0];
			bind = _property_map[i][1];
			deft = _property_map[i][2];

			if (bind) {
				if (this[prop]._value != deft) {
					strContents += "\" " + prop + "=\"" + (typeof (this[prop]._value) == "string" ? nexacro._encodeXml(this[prop]._value) : this[prop]._value);
				}
			}
			else {
				if (this[prop] != deft) {
					strContents += "\" " + prop + "=\"" + (typeof (this[prop]) == "string" ? nexacro._encodeXml(this[prop]) : this[prop]);
				}
			}
		}

		var subcells = this._subcells;

		if (subcells.length > 0) {
			strContents += "\">\n";

			for (var i = 0, n = subcells.length; i < n; i++) {
				strContents += subcells[i]._getXmlString(true);
			}

			strContents += "</Cell>\n";
		}
		else {
			strContents += "\"/>\n";
		}

		return strContents;
	};
	delete _pCellInfo;
}
;

if (!nexacro._CellControl) {
	nexacro._CellControl = function (id, left, top, width, height, right, bottom, parent, refinfo, cellidx, view, rowidx) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);

		var add_event_list = ["onexpandup", "onexpanddown", "oninput", "ondropdown", "oncloseup"];

		this._view = view;
		this._rowidx = (rowidx != undefined) ? rowidx : -9;
		this.tabstop = false;
		this._cellidx = cellidx;
		this._refinfo = refinfo ? refinfo : this._makeCellInfo(id, null, view, id, cellidx);
		this.subcells = [];
		this.parentcell = (parent instanceof nexacro._CellControl) ? parent : null;
		this.selected = false;
		this.accessibilityrole = "gridcell";
		this._subComp = null;
		this._text_elem = null;
		this._curDisplayType = "";
		this._expand_width = 0;
		this._expandCtrl = null;
		this._isSubCell = (this.parentcell) ? true : false;
		this._fakecell = false;
		this._hideInner = false;
		this._is_real_upelem = null;
		this._editor = null;
		this._client_mode = "";
		this._disp_show = true;
		this._writable = false;

		this._cellExpandObj = "_CellExpandControl";
		this._cellButtonObj = "_CellButtonControl";
		this._cellCheckBoxObj = "_CellCheckboxControl";
		this._cellImageObj = "_CellImageControl";
		this._cellComboObj = "_CellComboControl";
		this._cellCalendarObj = "_CellCalendarControl";
		this._cellEditObj = "_CellEditControl";
		this._cellTextAreaObj = "_CellTextAreaControl";
		this._cellProgressBarObj = "_CellProgressBarControl";
		this._cellMaskEditObj = "_CellMaskEditControl";
		this._cellTreeObj = "_CellTreeControl";

		for (var i = 0, n = add_event_list.length; i < n; i++) {
			this._event_list[add_event_list[i]] = 1;
		}
	};

	var _pCellControl = nexacro._createPrototype(nexacro.Component, nexacro._CellControl);
	nexacro._CellControl.prototype = _pCellControl;

	_pCellControl._type_name = "CellControl";
	_pCellControl._is_subcontrol = true;
	_pCellControl._is_simple_control = true;
	_pCellControl._use_selected_status = true;
	_pCellControl._use_readonly_status = true;
	_pCellControl._is_use_auto_selected_status = true;

	_pCellControl.init = function (id, left, top, width, height, right, bottom, refinfo, cellidx, view, rowidx) {
		nexacro.Component.prototype.init.call(this, id, left, top, width, height, right, bottom, null, null, null, null);

		var info = this._refinfo;
		info.id = refinfo.name = id;
		info._view = view;
		info._type = "";
		info._cellidx = cellidx;
	};
	_pCellControl._makeCellInfo = function (id, parent, view, type, idx) {
		return new nexacro.CellInfo(id, parent, view, type, idx);
	};

	_pCellControl._apply_normalproperty = function (prop, val) {
	};

	_pCellControl._apply_normalstyleFromInfo = function () {
		var info = this._refinfo;
		var normal_prop = info._property_map;
		var func, prop, val, datarow = this._getDataRow();

		info._expr_updatecell_props = [];

		for (var i = 0, n = normal_prop.length; i < n; i++) {
			if ((normal_prop[i][3] == true) || (normal_prop[i][0].substring(0, 13) == "accessibility")) {
				prop = normal_prop[i][0];

				if (normal_prop[i][1] == true) {
					if (prop == "cssclass" || prop == "wordWrap") {
						continue;
					}

					val = info._getAttrValue(info[prop], datarow);
					info._expr_updatecell_props.push(prop);
				}
				else {
					val = info[prop];
				}

				func = this["set_" + prop];
				if (func) {
					func.call(this, val);
				}
			}
		}
	};

	_pCellControl._getCurrentStyleAlign = function () {
		var align = {
			textAlign : "center", 
			verticalAlign : "middle"
		};

		if (this._text_elem) {
			align = this._text_elem._getComputedStyleAlign();
		}

		return align;
	};

	_pCellControl.on_create_contents = function () {
		this._apply_normalstyleFromInfo();
		this._disp_show = this._updateDisplayer();
	};

	_pCellControl.on_created_contents = function (win) {
		var control_elem = this.getElement();
		if (control_elem) {
			var subcells = this.subcells;
			var subcells_len = subcells.length;

			if (subcells_len == 0) {
				var sub_ctrl = this._subComp;

				if (sub_ctrl) {
					sub_ctrl.on_created(win);
				}
			}

			var text_elem = this._text_elem;

			if (text_elem) {
				text_elem.create(win);
			}

			var expand_ctrl = this._expandCtrl;

			if (expand_ctrl) {
				expand_ctrl.on_created();
			}

			if (nexacro._enableaccessibility && this._view && !this._view._accept_focus) {
				var accessibility = this.accessibility;

				if (accessibility) {
					this._view._accept_focus = true;
				}
			}

			for (var i = 0; i < subcells_len; i++) {
				subcells[i].on_created();
			}
		}
	};

	_pCellControl._on_changeStatus = function (status, value) {
		this._status_changing = true;
		nexacro.Component.prototype._on_changeStatus.call(this, status, value);
		this._status_changing = false;
	};

	_pCellControl.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		if (this._isSubCell) {
			return currentstatus;
		}

		return nexacro.Component.prototype.on_changeStatus.call(this, changestatus, value, applystatus, currentstatus, currentuserstatus);
	};

	_pCellControl.on_create_contents_command = function (area) {
		var str = "";
		var control_elem = this.getElement();
		if (control_elem) {
			var subcells = this.subcells;
			var subcells_len = subcells.length;

			if (subcells_len == 0) {
				var sub_ctrl = this._subComp;

				if (sub_ctrl) {
					str += sub_ctrl.createCommand();
				}
			}
			else {
				for (var i = 0; i < subcells_len; i++) {
					str += subcells[i].createCommand();
				}
			}

			var text_elem = this._text_elem;

			if (text_elem) {
				str += text_elem.createCommand();
			}

			var expand_ctrl = this._expandCtrl;

			if (expand_ctrl) {
				str += expand_ctrl.createCommand();
			}
		}
		return str;
	};

	_pCellControl.on_attach_contents_handle = function (win) {
		var subcells = this.subcells;
		var subcells_len = subcells.length;

		for (var i = 0; i < subcells_len; i++) {
			subcells[i].attachHandle(win);
		}

		var sub_ctrl = this._subComp;
		if (sub_ctrl) {
			sub_ctrl.attachHandle(win);
		}

		var expand_ctrl = this._expandCtrl;
		if (expand_ctrl) {
			expand_ctrl.attachHandle(win);
		}

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.attachHandle(win);
		}

		if (nexacro._enableaccessibility && this._view && !this._view._accept_focus) {
			var accessibility = this.accessibility;
			if (accessibility) {
				this._view._accept_focus = true;
			}
		}
	};

	_pCellControl.on_destroy_contents = function () {
		this._destroyDisplayer();

		if (this._expandCtrl) {
			this._expandCtrl.destroy();
			this._expandCtrl = null;
		}

		var subcells = this.subcells;
		var subcells_len = subcells.length;

		for (var i = 0; i < subcells_len; i++) {
			subcells[i].destroy();
		}

		if (this._tempdestroyeditor) {
			this._tempdestroyeditor.destroy();
		}

		if (this._editor) {
			this._editor.destroy();
		}

		this._tempdestroyeditor = this._editor = this.subcells = this._refinfo = this._view = this.parentcell = this._band = this._text_elem = this._is_real_upelem = null;
	};

	_pCellControl._makeEventInfoBase = function (evt_id) {
		var cellobj = this;
		var subcellobj = null;

		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var obj = {
			cell : -1, 
			col : -1, 
			row : -9, 
			subrow : -1, 
			mergecell : -1, 
			mergecol : -1, 
			mergerow : -1, 
			pivotindex : -9, 
			eventid : "", 
			id : ""
		};

		if (evt_id) {
			obj.eventid = obj.id = evt_id;
		}

		obj.cell = cellobj._cellidx;
		obj.col = cellobj._refinfo._col;
		obj.row = cellobj._getDataRow();
		obj.subrow = cellobj._refinfo._row;

		if (subcellobj) {
			obj.mergecell = subcellobj._cellidx;
			obj.mergecol = subcellobj._refinfo._col;
			obj.mergerow = subcellobj._refinfo._row;
		}
		return obj;
	};

	_pCellControl.on_fire_onexpandup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onexpandup && this.onexpandup._has_handlers) {
			var evt = this._makeEventInfoBase("onexpandup");
			evt.button = button;
			evt.altkey = alt_key;
			evt.ctrlkey = ctrl_key;
			evt.shiftkey = shift_key;
			evt.screenX = screenX;
			evt.screenY = screenY;
			evt.canvasX = canvasX;
			evt.canvasY = canvasY;
			evt.clientX = clientX;
			evt.clientY = clientY;
			evt.fromobject = from_comp;
			evt.fromreferenceobject = from_refer_comp;
			return this.onexpandup._fireEvent(this, evt);
		}
		return false;
	};

	_pCellControl.on_fire_onexpanddown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onexpandup && this.onexpandup._has_handlers) {
			var evt = this._makeEventInfoBase("onexpanddown");
			evt.button = button;
			evt.altkey = alt_key;
			evt.ctrlkey = ctrl_key;
			evt.shiftkey = shift_key;
			evt.screenX = screenX;
			evt.screenY = screenY;
			evt.canvasX = canvasX;
			evt.canvasY = canvasY;
			evt.clientX = clientX;
			evt.clientY = clientY;
			evt.fromobject = from_comp;
			evt.fromreferenceobject = from_refer_comp;
			return this.onexpandup._fireEvent(this, evt);
		}
		return false;
	};

	_pCellControl.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = this._makeEventInfoBase("oninput");
			return this.oninput._fireEvent(this, evt);
		}
		return true;
	};

	_pCellControl.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var evt = this._makeEventInfoBase("ondropdown");
			evt.value = this.__evtvalue(obj);
			return this.ondropdown._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pCellControl.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var evt = this._makeEventInfoBase("oncloseup");
			evt.value = this.__evtvalue(obj, postvalue);
			return this.oncloseup._fireEvent(this, evt);
		}
		return true;
	};

	_pCellControl.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		if (this.onclick && this.onclick._has_handlers) {
			var evt = this._makeEventInfoBase("onclick");
			evt.button = button;
			evt.altkey = alt_key;
			evt.ctrlkey = ctrl_key;
			evt.shiftkey = shift_key;
			evt.screenX = screenX;
			evt.screenY = screenY;
			evt.canvasX = canvasX;
			evt.canvasY = canvasY;
			evt.clientX = clientX;
			evt.clientY = clientY;
			evt.fromobject = from_comp;
			evt.fromreferenceobject = from_refer_comp;
			evt.clickitem = clickitem || "";
			return this.onclick._fireEvent(this, evt);
		}
		return false;
	};

	_pCellControl.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro._fireBeforeDblclick(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		if (this.ondblclick && this.ondblclick._has_handlers) {
			var evt = this._makeEventInfoBase("ondblclick");
			evt.button = button;
			evt.altkey = alt_key;
			evt.ctrlkey = ctrl_key;
			evt.shiftkey = shift_key;
			evt.screenX = screenX;
			evt.screenY = screenY;
			evt.canvasX = canvasX;
			evt.canvasY = canvasY;
			evt.clientX = clientX;
			evt.clientY = clientY;
			evt.fromobject = from_comp;
			evt.fromreferenceobject = from_refer_comp;
			evt.clickitem = clickitem || "";
			return this.ondblclick._fireEvent(this, evt);
		}
		return false;
	};

	_pCellControl._common_fire_lbuttonup = function (touchinfos, changedtouchinfos, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, from_elem) {
		var window = this._getWindow();
		var elem = window._cur_ldown_elem;

		var comp = window.findComponent(elem, 0, 0)[0];
		var up_comp = window.findComponent(from_elem, 0, 0)[0];

		if (elem != from_elem) {
			while (comp) {
				if (comp instanceof nexacro._CellControl) {
					break;
				}

				comp = comp.parent;
			}

			while (up_comp) {
				if (up_comp instanceof nexacro._CellControl) {
					break;
				}

				up_comp = up_comp.parent;
			}

			if (comp == up_comp) {
				this.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, "");
			}
		}
	};

	_pCellControl.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttonup(touchinfos, changedtouchinfos, "", false, false, false, -1, -1, -1, -1, -1, -1, from_comp, from_refer_comp, null);
		return nexacro.Component.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
	};

	_pCellControl.on_fire_user_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem) {
		this._common_fire_lbuttonup(null, null, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem);
		return nexacro.Component.prototype.on_fire_user_onlbuttonup.call(this, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem);
	};

	_pCellControl.__evtvalue = function (obj, postvalue) {
		var val = "";

		if (obj && obj.value) {
			val = obj.value;
		}
		else if (postvalue) {
			val = postvalue;
		}

		return val;
	};

	_pCellControl._destroyDisplayer = function (b_async) {
		if (this._subComp) {
			if (b_async) {
				nexacro._OnceCallbackTimer.callonce(this, function () {
					if (this._subComp) {
						this._subComp.destroy();
						this._subComp = null;
					}
				}, 10);
			}
			else {
				this._subComp.destroy();
				this._subComp = null;
			}
		}
	};

	_pCellControl._getBindDataset = function () {
		return this._view ? (this._view._getBindDataSet ? this._view._getBindDataSet() : this._view._binddataset) : null;
	};

	_pCellControl._applyEditorDataset = function (async) {
		if (!this._editor || !this._writable) {
			return;
		}

		var dataset = this._getBindDataset();
		if (dataset) {
			var datarow = this._getDataRow();
			var colid = this._refinfo.text._bindexpr;
			var value = this._editor._getValueData();
			var view = this._view;
			var retn = true;

			if (this._refinfo.text._bindtype == 1) {
				view._is_async_recreate = async;
				view._dsEventOccured = true;

				var fail = {
					status : ""
				};
				dataset.setColumn(datarow, colid, value, fail);

				if (fail.status == "cancolumnchange") {
					this._editor.set_value(prevalue);
					retn = false;
				}
				view._is_async_recreate = false;
				view._dsEventOccured = false;
			}
		}
	};

	_pCellControl._getDataRow = function () {
		return this._rowidx;
	};

	_pCellControl._isFakeCell = function () {
		var datarow = this._getDataRow();
		var dataset = this._getBindDataset();
		var rowcount = (dataset) ? dataset.rowcount : 0;

		if (rowcount <= datarow || datarow < -2) {
			return true;
		}

		return false;
	};

	_pCellControl.on_change_containerRect = function (width, height) {
		this._updateAvailableArea();
	};

	_pCellControl.on_getIDCSSSelector = function () {
		if (this._isSubCell) {
			return "subcell";
		}

		return "cell";
	};

	_pCellControl._getClassCSSSelector = function () {
		var cssarr = nexacro.Component.prototype._getClassCSSSelector.call(this);

		if (this._rowidx >= 0 && this._rowidx % 2) {
			if (!cssarr) {
				cssarr = [];
			}

			cssarr.push("oddcell");
		}

		return cssarr;
	};

	_pCellControl._getElementClassCSSSelector = function () {
		var cssarr = this._getClassCSSSelector(this);

		if (cssarr) {
			cssarr.push("dummy");
			cssarr.push("dummy");
			cssarr.push("dummy");
		}

		return cssarr;
	};

	_pCellControl._apply_setfocus = function (evt_name, self_flag) {
		if (self_flag || nexacro._enableaccessibility) {
			nexacro.Component.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pCellControl.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();
		var datarow = this._getDataRow();

		this.tooltiptext = this._refinfo._getTooltipText(datarow);
		this.tooltiptype = this._refinfo.tooltiptype;

		if (control_elem) {
			control_elem.setElementToolTip(this.tooltiptext, this.tooltiptype);
		}
	};

	_pCellControl.on_apply_text = function () {
		var text_elem = this._text_elem;

		if (text_elem) {
			var cellinfo = this._refinfo;
			var datarow = this._getDataRow();
			var displaytype = cellinfo._getAttrValue(cellinfo.displaytype, datarow);

			var strtext = nexacro._toString(this._displaytext);

			if (displaytype == "decoratetext") {
				text_elem.setElementDecorateText(strtext);
			}
			else {
				if (text_elem.decoration != "") {
					text_elem.decoration = "";
					text_elem.text = null;
				}

				if (!text_elem.text && strtext) {
					text_elem.setElementText(strtext);
					if (this._expandCtrl) {
						this._expandCtrl.destroy();
						this._createExpandDisplayer();
					}
				}
				else {
					text_elem.setElementText(strtext);
				}
			}
		}
	};

	_pCellControl.on_apply_wordWrap = function () {
		var text_elem = this._text_elem;

		if (text_elem) {
			var datarow = this._getDataRow();
			var wordwrap = this._refinfo._getWordwrap(datarow);
			text_elem.setElementWordWrap(wordwrap);
		}
	};

	_pCellControl.on_apply_textAlign = function (halign) {
		var text_elem = this._text_elem;

		if (halign) {
			if (text_elem) {
				text_elem.setElementTextAlign(halign);
			}

			if (this._subComp) {
				if (this._subComp._setAlign) {
					this._subComp._setAlign(halign, this.verticalAlign);
				}
				else {
					this._subComp.set_textAlign(halign);
				}
			}
		}
	};

	_pCellControl.on_apply_verticalAlign = function (valign) {
		var text_elem = this._text_elem;

		if (valign) {
			if (text_elem) {
				text_elem.setElementVerticalAlign(valign);
			}

			if (this._subComp) {
				if (this._subComp._setAlign) {
					this._subComp._setAlign(this.textAlign, valign);
				}
				else {
					this._subComp.set_verticalAlign(valign);
				}
			}
		}
	};

	_pCellControl._needToggle = function () {
		var datarow = this._getDataRow();
		var cellinfo = this._refinfo;
		var displaytype = cellinfo._getDisplaytype(datarow);
		var edittype = cellinfo._getEdittype(datarow);

		if (edittype != "checkbox") {
			return;
		}

		if (displaytype == "checkboxcontrol") {
			if (this._subComp) {
				this._subComp._toggleCheck();
			}
		}
		else {
			var view = this._view;
			var v = cellinfo._getValue(datarow);
			v = nexacro._toBoolean(v);
			v = (v) ? 0 : 1;

			if (cellinfo.text._bindtype == 1) {
				var dataset = this._getBindDataset();
				view._dsEventOccured = true;

				var retn = dataset.setColumn(datarow, cellinfo.text._bindexpr, v);

				if (nexacro._enableaccessibility) {
					this._setAccessibilityStatChecked(nexacro._toBoolean(v));
				}

				view._dsEventOccured = false;
			}
		}
	};

	_pCellControl.on_apply_checkboxAlign = function (halign, valign) {
		var controlSizeW = this._subComp._adjust_width;
		var controlSizeH = this._subComp._adjust_height;
		var clientrect = this._getAvailableRect();
		var x = clientrect.left, y = clientrect.top;
		var w = clientrect.width, h = clientrect.height;

		switch (halign) {
			case "left":
				break;
			case "right":
				x += (w - controlSizeW);
				break;
			default:
				x += (((w - controlSizeW) / 2));
				break;
		}
		switch (valign) {
			case "top":
				break;
			case "bottom":
				y += (h - controlSizeH);
				break;
			default:
				y += (((h - controlSizeH) / 2));
				break;
		}
		this._subComp.move(x, y, this._subComp._adjust_width, this._subComp._adjust_height);
	};

	_pCellControl.on_apply_textDecoration = function () {
		var cellinfo = this._refinfo;

		this.textDecoration = cellinfo.textDecoration;
		var textDecoration = nexacro.TextDecorationObject(this.textDecoration);
		this._textdecoration = textDecoration;

		if (this._text_elem) {
			this._text_elem.setElementTextDecoration(textDecoration);
		}
		else if (this._subComp) {
			this._subComp.set_textDecoration(this.textDecoration);
		}
	};

	_pCellControl._hideInnerElement = function () {
		var subcells = this.subcells;

		for (var i = 0, n = subcells.length; i < n; i++) {
			subcells[i].set_visible(false);
		}

		if (this._subComp) {
			this._subComp.set_visible(false);
		}
		else if (this._text_elem) {
			this._text_elem.setElementVisible(false);
		}

		this._hideInner = true;
		this.__showExpand(false);

		if (this._curDisplayType == "treeitemcontrol") {
			this._subComp._treeline_visible(false);
		}
	};

	_pCellControl._isShowEditor = function () {
		if (this._editor) {
			return this._editor.visible;
		}

		return false;
	};

	_pCellControl._showInnerElement = function () {
		var subcells = this.subcells;

		for (var i = 0, n = subcells.length; i < n; i++) {
			subcells[i].set_visible(true);
		}

		if (this._isShowEditor() == false) {
			if (this._subComp) {
				this._subComp.set_visible(true);
			}
			else if (this._text_elem) {
				this._text_elem.setElementVisible(true);
			}
		}
		this._hideInner = false;
		this.__showExpand(true);

		if (this._curDisplayType == "treeitemcontrol") {
			this._subComp._treeline_visible(true);
		}
	};

	_pCellControl.__showExpand = function (flag) {
		if (!this._expandCtrl) {
			return;
		}

		if (this._fakecell) {
			this._expandCtrl.set_visible(false);
			return;
		}

		var cellinfo = this._refinfo;
		var datarow = this._getDataRow();
		var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, datarow);

		if (expandshow == "show") {
			if (flag == false) {
				this._expandCtrl.set_visible(this.selected);
			}
			else {
				this._expandCtrl.set_visible(true);
			}
		}
		else {
			this._expandCtrl.set_visible(false);
		}
	};

	_pCellControl._createDisplayer = function (displayType) {
		var view = this._view;
		var cellinfo = this._refinfo;

		switch (displayType) {
			case "buttoncontrol":
				this._createButtonDisplayer();
				break;
			case "checkboxcontrol":
				this._createCheckboxDisplayer();
				break;
			case "imagecontrol":
				this._createImageDisplayer();
				break;
			case "treeitemcontrol":
				this._createTreeDisplayer();
				if (view) {
					view._treeCellinfo = cellinfo;
				}
				break;
			case "combocontrol":
				this._createComboDisplayer();
				break;
			case "calendarcontrol":
				this._createCalendarDisplayer();
				break;
			case "maskeditcontrol":
				this._createMaskEditDisplayer();
				break;
			case "textareacontrol":
				this._createTextAreaDisplayer();
				break;
			case "progressbarcontrol":
				this._createBarDisplayer();
				break;
			case "editcontrol":
				this._createEditDisplayer();
				break;
			default:
				this._createTextDisplayer();
				break;
		}

		if (this._subComp) {
			this._subComp.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
				if (this._displaymode) {
					return currentstatus;
				}

				return applystatus;
			};

			this._subComp.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
				if (this._displaymode) {
					if (changestatus == "nulltext" && value) {
						return changestatus;
					}
					else {
						return currentstatus;
					}
				}
				return applyuserstatus;
			};
		}

		this._curDisplayType = displayType;
		this.on_apply_textAlign(cellinfo.textAlign);
		this.on_apply_verticalAlign(cellinfo.verticalAlign);
		this.on_apply_cursor(this.cursor);
	};

	_pCellControl._isChangeDisplayer = function (displayType, datarow) {
		var view = this._view;
		var cur_disptype = this._curDisplayType;

		if ((displayType != cur_disptype) || (view && view._changeDisplayer)) {
			return true;
		}

		return false;
	};

	_pCellControl._updateDisplayer = function () {
		var view = this._view;
		var cellinfo = this._refinfo;
		var datarow = this._getDataRow();
		var displayType = cellinfo._getAttrValue(cellinfo.displaytype, datarow);
		var show = true;

		var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, datarow);
		var expandsize = cellinfo._getAttrValue(cellinfo.expandsize, datarow);

		if (expandshow == "show") {
			if (!this._expandCtrl) {
				this._createExpandDisplayer();
			}
			else {
				if (this._expand_width != expandsize) {
					this._expandCtrl.destroy();
					this._expandCtrl = null;
					this._createExpandDisplayer();
				}
				else {
					this._changeClientmode("expand");
				}
			}
		}
		else {
			if (this._expandCtrl) {
				if (this._expandCtrl) {
					this._expand_width = 0;
					this._expandCtrl.destroy();
					this._expandCtrl = null;

					if (this._control_element._mode == "expandtext") {
						this._changeClientmode("text");
					}
				}
			}
		}

		if (displayType === undefined) {
			displayType = "normal";
		}

		if (this._isChangeDisplayer(displayType, datarow) == true) {
			if (this._curDisplayType != "") {
				this._destroyDisplayer(view ? view._lbuttondown_proc : null);
			}

			this._createDisplayer(displayType);

			var def_align = cellinfo._getDefaultTextAlign(displayType, datarow);
			var textelem = this._text_elem;

			if (textelem) {
				textelem.setElementTextAlignByClassCSSSelector(def_align);
			}

			if (this._subComp && !this._subComp._is_created) {
				this._subComp.on_created();
			}
		}
		else {
			this.on_apply_wordWrap();
		}

		var fake = this._isFakeCell();

		if (fake && view) {
			if (view.fillareatype == "datarow") {
				if (!this._isDisplayDataType(displayType)) {
					if (displayType != "date") {
						show = false;
						if (fake != this._fakecell || view._resetfillarea) {
							this._hideInnerElement();
							this._fakecell = fake;
						}
					}
				}
			}
			else if (view.fillareatype == "linerow") {
				show = false;
				if (fake != this._fakecell || view._resetfillarea) {
					this._hideInnerElement();
					this._fakecell = fake;
				}
			}
			else if (view.fillareatype == "controlrow") {
				if (this._isDisplayDataType(displayType)) {
					show = false;
					if (fake != this._fakecell || view._resetfillarea) {
						this._hideInnerElement();
						this._fakecell = fake;
					}
				}
			}
		}
		else {
			if (fake != this._fakecell) {
				this._showInnerElement();
				this._fakecell = fake;
			}
		}
		return show;
	};

	_pCellControl._isUpdateArea = function () {
		return true;
	};

	_pCellControl.set_select = function (v, no_apply) {
		if (this.selected != v) {
			this.selected = v;

			if (!no_apply) {
				this.on_apply_select(v);
			}
		}
	};

	_pCellControl.on_apply_select = function (select) {
		this._updateAll();
	};

	_pCellControl.set_border = function (v) {
		nexacro.Component.prototype.set_border.call(this, v);
		this._control_element.setElementBorderNone(false, false, false, false);
	};

	_pCellControl._isSelectedColor = function () {
		var useselcolor = this._view ? this._view.useselcolor : false;
		return (this.selected && ((useselcolor == undefined) ? true : useselcolor));
	};

	_pCellControl._getRemoveLine = function () {
		var remove_l, remove_t, remove_r, remove_b;

		if (this._isSubCell) {
			remove_l = true;
			remove_t = true;
			remove_r = true;
			remove_b = true;
		}
		else {
			remove_l = true;
			remove_t = true;
			remove_r = false;
			remove_b = false;
		}

		return [remove_l, remove_t, remove_r, remove_b];
	};

	_pCellControl.__update = function (status, onlycontents) {
		if (!this._is_alive) {
			return false;
		}

		var cellinfo = this._refinfo;
		var view = this._view;
		var evenodd_change = false;

		if (this.parent._rowidx >= 0) {
			if (this._rowidx != this.parent._rowidx) {
				var oldrowidx = this._rowidx;
				this._rowidx = this.parent._rowidx;
				if ((this._rowidx % 2) != (oldrowidx % 2)) {
					evenodd_change = true;
				}

				this._updateEditor();
			}
		}

		var datarow = this._getDataRow();

		var cssname = cellinfo._getAttrValue(cellinfo.cssclass, datarow);

		if (this.cssclass != cssname) {
			this.set_cssclass(cssname);
		}
		else {
			if (evenodd_change) {
				this.on_apply_cssclass();
			}
		}

		var update_props = cellinfo._expr_updatecell_props;
		var prop_name, prop_val;

		for (var i = 0, n = update_props.length; i < n; i++) {
			prop_name = update_props[i];
			prop_val = cellinfo._getAttrValue(cellinfo[prop_name], datarow);

			if (this[prop_name] != prop_val) {
				this["set_" + prop_name](prop_val);
			}
		}

		var control_elem = this.getElement();
		if (control_elem) {
			if (this._isUpdateArea() == false) {
				return false;
			}

			var readonly = view ? !!view.readonly : false;

			if (this._is_use_auto_selected_status) {
				this._changeUserStatus("selected", this._isSelectedColor());
			}

			this._changeStatus("readonly", readonly);

			var show = this._disp_show = this._updateDisplayer();

			if (!onlycontents && status) {
				this._changeStatus(status, true);
			}

			this._displaytext = this._getDisplayText();
			this.on_apply_text();
			this.on_apply_textDecoration();

			var subComp = this._subComp;
			if (subComp) {
				subComp._changeStatus("readonly", readonly);
				subComp._updateAll(true);
			}

			if (this._expandCtrl) {
				this._expandCtrl._changeStatus("readonly", readonly);
				this._expandCtrl._updateAll(true);
			}

			this.on_apply_prop_tooltip();
			this.on_apply_accessibility();
		}
		return true;
	};

	_pCellControl._updateAll = function (status, onlycontents) {
		if (this.__update(status, onlycontents)) {
			var control_elem = this.getElement();
			if (control_elem) {
				var remove_line = this._getRemoveLine();
				var remove_l, remove_t, remove_r, remove_b;

				remove_l = remove_line[0];
				remove_t = remove_line[1];
				remove_r = remove_line[2];
				remove_b = remove_line[3];

				if (this.subcells.length > 0) {
					for (var i = 0, n = this.subcells.length; i < n; i++) {
						this.subcells[i]._updateAll();
					}
				}
				else {
					if (this._disp_show && this._hideInner) {
						this._showInnerElement();
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

	_pCellControl.on_apply_prop_cssclass = function () {
		if (this._subComp) {
			this._subComp.on_apply_cssclass();
		}

		if (this._expandCtrl) {
			this._expandCtrl.on_apply_cssclass();
		}
	};

	_pCellControl.on_apply_cursor = function (cursor) {
		nexacro.Component.prototype.on_apply_cursor.call(this, cursor);

		if (this._subComp) {
			this._subComp.set_cursor(cursor);
		}
	};

	_pCellControl._getAvailableRect = function () {
		var rect = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0, 
			width : 0, 
			height : 0
		};
		rect.left = this._getClientLeft();
		rect.top = this._getClientTop();
		rect.right = this._getClientLeft() + this._getClientWidth();
		rect.bottom = this._getClientTop() + this._getClientHeight();
		rect.width = this._getClientWidth();
		rect.height = this._getClientHeight();

		var expand_ctrl = this._expandCtrl;

		if (expand_ctrl && expand_ctrl.visible) {
			rect.width -= expand_ctrl.width;
			rect.right -= expand_ctrl.width;
		}

		return rect;
	};

	_pCellControl._changeClientmode = function (mode) {
		var control_elem = this.getElement();

		if (control_elem) {
			var padding = this._getCurrentStylePadding();

			if (this._refinfo._subcells.length) {
				mode = "normal";
			}
			else if (mode == "expand") {
				if (this._client_mode != "normal") {
					mode = "expandtext";
				}
				else {
					mode = "normal";
				}
			}
			else if (mode == "text") {
				if (this._expandCtrl) {
					mode = "expandtext";
				}
				else if (padding) {
					mode = (padding.right > 0 || padding.bottom > 0) ? "expandtext" : "text";
				}
			}

			if (mode == "text" || mode == "expandtext") {
				if (!this._text_elem) {
					this._text_elem = new nexacro.TextBoxElement(control_elem, "text");
					this._updateAvailableArea();
				}
			}
			else {
				if (this._text_elem) {
					this._text_elem.destroy();
					this._text_elem = null;
				}
			}
			this._client_mode = mode;
		}
	};

	_pCellControl._createExpandDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var cellinfo = this._refinfo;
			var datarow = this._getDataRow();
			var border = this._getCurrentStyleBorder();
			var padding = this._getCurrentStylePadding();

			this._expand_width = cellinfo._getAttrValue(cellinfo.expandsize, datarow);

			var l = this._adjust_width - this._expand_width - ((border) ? border.right._width : 0) - ((padding) ? padding.right : 0);
			var t = this._getClientTop();
			var r = l + this._expand_width;
			var b = t + this._getClientHeight();

			if (l < 0) {
				l = 0;
				r = this._adjust_width;
			}

			var expCtrl = this._expandCtrl = new nexacro[this._cellExpandObj](this, l, t, r, b);
			expCtrl.createComponent();

			this._changeClientmode("expand");
		}
	};

	_pCellControl._createTextDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._changeClientmode("text");

			var text_elem = this._text_elem;
			if (text_elem) {
				if (!this._is_created) {
					this._displaytext = this._getDisplayText();
					this.on_apply_text();
				}
				else {
					text_elem.create(this._getWindow());
				}
				this.on_apply_textDecoration();
				this.on_apply_wordWrap();
			}
		}
	};

	_pCellControl._createButtonDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = new nexacro[this._cellButtonObj]("cellbutton", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			var datarow = this._getDataRow();
			var wordwrap = this._refinfo._getWordwrap(datarow);
			controlComp.set_wordWrap(wordwrap);

			this._subComp = controlComp;
		}
	};

	_pCellControl._createCheckboxDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._changeClientmode("normal");
			var controlComp = new nexacro[this._cellCheckBoxObj]("cellcheckbox", 0, 0, 0, 0, this, true);
			controlComp.createComponent(true);
			controlComp._skip_mobile_tabfocus = true;
			this._subComp = controlComp;
		}
	};

	_pCellControl._createImageDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = new nexacro[this._cellImageObj]("cellimage", 0, 0, rect.width, rect.height, this);
			controlComp.createComponent(true);

			this._subComp = controlComp;
		}
	};

	_pCellControl._createComboDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = new nexacro[this._cellComboObj]("cellcombo", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			controlComp.comboedit._input_element._isUseDelCaret = true;

			this._subComp = controlComp;
		}
	};

	_pCellControl._createCalendarDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellCalendarObj]("cellcalendar", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			controlComp.calendaredit._input_element._isUseDelCaret = true;

			this._subComp = controlComp;
		}
	};

	_pCellControl._createEditDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellEditObj]("celledit", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			controlComp._input_element._isUseDelCaret = true;

			this._subComp = controlComp;
		}
	};

	_pCellControl._createMaskEditDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellMaskEditObj]("cellmaskedit", rect.left, rect.top, rect.width, rect.height, this, true, true);
			controlComp.createComponent(true);
			controlComp._input_element._isUseDelCaret = true;

			this._subComp = controlComp;
		}
	};


	_pCellControl._createTextAreaDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellTextAreaObj]("celltextarea", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			controlComp._input_element._isUseDelCaret = true;
			var datarow = this._getDataRow();
			var wordwrap = this._refinfo._getWordwrap(datarow);
			controlComp.set_wordWrap(wordwrap);

			this._subComp = controlComp;
		}
	};

	_pCellControl._createBarDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellProgressBarObj]("cellprogressbar", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);

			this._subComp = controlComp;
		}
	};

	_pCellControl._createTreeDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getControlRect();
			var left = rect.left;
			var top = rect.top;
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellTreeObj]("celltreeitem", left, top, width, height, null, null, this);
			controlComp.createComponent(true);
			this._subComp = controlComp;
		}
	};

	_pCellControl._updateAvailableArea = function () {
		var rc = this._getAvailableRect();
		var subcomp = this._subComp;

		var l = rc.left;
		var t = rc.top;
		var w = rc.width;
		var h = rc.height;

		if (subcomp) {
			if (this._curDisplayType == "checkboxcontrol") {
				this.on_apply_checkboxAlign("center", "middle");
			}
			else {
				var ctrlrc = this._getControlRect();
				subcomp.move(ctrlrc.left, ctrlrc.top, ctrlrc.width, ctrlrc.height);
			}
		}

		if (this._text_elem) {
			this._text_elem.setElementPosition(l, t);
			this._text_elem.setElementSize(w, h);
		}

		if (this._editor) {
			this._editor.move(l, t, w, h);
		}

		var expand_ctrl = this._expandCtrl;

		if (expand_ctrl) {
			var left = this._getClientWidth() + this._getClientLeft() - this._expand_width;
			var top = rc.top;
			var width = this._expand_width;
			var height = rc.height;

			expand_ctrl.move(left, top, width, height);
		}
	};

	_pCellControl._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellControl._getDisplayText = function () {
		if (this._refinfo) {
			var datarow = this._getDataRow();
			return this._refinfo._getDisplayText(datarow);
		}
		return "";
	};

	_pCellControl._isDisplayDataType = function (displayType) {
		if (displayType == "number" || displayType == "exponent" || displayType == "currency" || 
			displayType == "normal" || displayType == "text" || displayType == "decoratetext" || displayType == "mask" || displayType == "combotext" || displayType == "date") {
			return true;
		}

		return false;
	};

	_pCellControl._updateEditor = function () {
		var text_elem = this._text_elem;
		var editComp = this._editor;

		if (editComp) {
			if (this._isConditionEditor()) {
				if (text_elem) {
					text_elem.setElementVisible(false);
				}
				if (this._subComp) {
					this._subComp.set_visible(false);
				}

				var rect = this._getControlRect();
				editComp.move(rect.left, rect.top, rect.width, rect.height);
			}
			else {
				if (text_elem) {
					text_elem.setElementVisible(true);
				}
				if (this._subComp) {
					this._subComp.set_visible(true);
				}

				editComp.move(-10, -10, 0, 0);
			}
		}
	};

	_pCellControl._isConditionEditor = function () {
		return true;
	};

	_pCellControl._getAutoEnter = function () {
		return this._view.autoenter;
	};

	_pCellControl._getAutoUpdateType = function () {
		return this._view.autoupdatetype;
	};

	_pCellControl._showEditor = function () {
		if (this._isShowEditor()) {
			return;
		}

		var text_elem = this._text_elem;
		var cellinfo = this._refinfo;
		var editComp;
		var view = this._view;

		if (text_elem) {
			text_elem.setElementVisible(false);
		}
		if (this._subComp) {
			this._subComp.set_visible(false);
		}

		editComp = this._createEditor();
		editComp._EditUpdateAll();
		editComp.set_visible(true);

		editComp._setFocus(false);
		if (editComp.setCaretPos && !editComp.autoselect) {
			editComp.setCaretPos(0);
		}
		else if (editComp.comboedit && editComp.comboedit.setCaretPos) {
			editComp.comboedit.setCaretPos(0);
		}

		if (nexacro._isTouchInteraction || (view && view.selectchangetype == "up")) {
			editComp._setFocus(false);
		}

		if (view && view.autoenter == "select" && view._lbuttondown_proc) {
			editComp._user_push = true;
			editComp._changeStatus("focused", true);
			editComp._is_pushed_area = true;
			editComp._is_push = true;
		}
		else {
			editComp._changeStatus("focused", true);
		}
		this._editor = editComp;
	};

	_pCellControl._hideEditor = function () {
		var text = this._text_elem;
		if (text) {
			text.setElementVisible(true);
		}

		if (this._subComp) {
			this._subComp.set_visible(true);
		}

		var value;
		if (this._editor) {
			value = this._editor._getValueData();
			this._destroyEditor();
		}
		return value;
	};

	_pCellControl._hasEditor = function () {
		var cellinfo = this._refinfo;
		var datarow = this._getDataRow();
		var editType = cellinfo._getEdittype(datarow);

		switch (editType) {
			case "none":
				return false;
			case "normal":
			case "text":
			case "combo":
			case "date":
			case "mask":
			case "textarea":
			case "button":
			case "readonly":
				return true;
		}
		return false;
	};

	_pCellControl._destroyEditor = function () {
		if (this._editor) {
			if (this._tempdestroyeditor) {
				this._tempdestroyeditor.destroy();
			}

			var editComp = this._tempdestroyeditor = this._editor;
			editComp.set_visible(false);

			if (nexacro._Browser == "Safari") {
				nexacro._OnceCallbackTimer.callonce(editComp, function () {
					editComp.set_visible(false);
				});
			}
			else {
				editComp.set_visible(false);
			}

			this._editor = null;
		}
	};

	_pCellControl._getFormatSize = function () {
		return null;
	};

	_pCellControl._getControlRect = function () {
		var rect = this._getAvailableRect();
		var fomatsize = this._getFormatSize();
		var cellinfo = this._refinfo;
		var controlautosizingtype = cellinfo._getAttrValue(cellinfo.controlautosizingtype, this._getDataRow());

		if (fomatsize != null) {
			var left = rect.left, top = rect.top, width = rect.width, height = rect.height, right = rect.right, bottom = rect.bottom;

			var border = this._getCurrentStyleBorder();
			var padding = this._getCurrentStylePadding();
			var fixwidth = fomatsize[0] - (border ? border.left._width + border.right._width : 0) - (padding ? padding.left + padding.right : 0);
			var fixheight = fomatsize[1] - (border ? border.top._width + border.bottom._width : 0) - (padding ? padding.top + padding.bottom : 0);

			if (controlautosizingtype == "none") {
				width = fixwidth;

				if (width < rect.width) {
					left += (rect.width - width) / 2;
				}

				right = left + width;

				height = fixheight;

				if (height < rect.height) {
					top += (rect.height - height) / 2;
				}

				bottom = top + height;

				rect.left = left;
				rect.top = top;
				rect.width = width;
				rect.height = height;
				rect.right = right;
				rect.bottom = bottom;
			}
			else if (controlautosizingtype == "width") {
				height = fixheight;

				if (height < rect.height) {
					top += (rect.height - height) / 2;
				}

				bottom = top + height;

				rect.top = top;
				rect.height = height;
				rect.bottom = bottom;
			}
			else if (controlautosizingtype == "height") {
				width = fixwidth;

				if (width < rect.width) {
					left += (rect.width - width) / 2;
				}

				right = left + width;

				rect.left = left;
				rect.width = width;
				rect.right = right;
			}
		}

		return rect;
	};

	_pCellControl._createEditor = function () {
		var cellinfo = this._refinfo;
		var datarow = this._getDataRow();
		var editType = cellinfo._getEdittype(datarow);

		var creator = this["_createEditor_" + editType];

		if (creator == null) {
			creator = this._createEditor_text;
		}

		this._destroyEditor();

		this._editor = creator.call(this);
		this._editor._update_datarow = this._getDataRow();
		return this._editor;
	};

	_pCellControl._createEditor_text = function () {
		var datarow = this._getDataRow();
		var rect = this._getControlRect();
		var cellinfo = this._refinfo;
		var cEdit = new nexacro[this._cellEditObj]("celledit", rect.left, rect.top, rect.width, rect.height, this);
		var v = cellinfo._getValue(datarow);
		var editmaxlength = cellinfo._getAttrValue(cellinfo.editmaxlength, datarow);
		var dataset = this._getBindDataset();

		if (editmaxlength == 0) {
			editmaxlength = dataset ? dataset._getColumnSize(cellinfo.text._bindtype == 1 ? cellinfo.text._bindexpr : 0) : 0;
		}

		cEdit.set_maxlength(editmaxlength);
		cEdit.set_value(v);

		cEdit.createComponent();

		this._writable = true;

		return cEdit;
	};

	_pCellControl._createEditor_mask = function () {
		var rect = this._getControlRect();
		var cellinfo = this._refinfo;
		var cMaskEdit = new nexacro[this._cellMaskEditObj]("cellmaskedit", rect.left, rect.top, rect.width, rect.height, this);
		var datarow = this._getDataRow();
		var value = cellinfo._getValue(datarow);
		var locale = cellinfo._getLocale(datarow);
		var mask = cellinfo._getAttrValue(cellinfo.maskeditformat, datarow);
		var type = cellinfo._getAttrValue(cellinfo.maskedittype, datarow);
		var displayType = cellinfo._getDisplaytype(datarow);

		cMaskEdit.set_type(type);
		if (mask) {
			cMaskEdit.set_format(mask);
		}

		cMaskEdit.set_locale(locale);
		cMaskEdit.set_value(value);

		cMaskEdit.createComponent();

		this._writable = true;

		return cMaskEdit;
	};

	_pCellControl._createEditor_combo = function () {
		var rect = this._getControlRect();
		var cCombo = new nexacro[this._cellComboObj]("cellcombo", rect.left, rect.top, rect.width, rect.height, this);
		cCombo.createComponent();

		this._writable = true;

		return cCombo;
	};

	_pCellControl._createEditor_date = function () {
		var datarow = this._getDataRow();
		var rect = this._getControlRect();
		var cellinfo = this._refinfo;
		var cCalendar = new nexacro[this._cellCalendarObj]("cellcalendar", rect.left, rect.top, rect.width, rect.height, this);
		var v = cellinfo._getValue(datarow);
		var calendardateformat = cellinfo._getAttrValue(cellinfo.calendardateformat, datarow);
		var calendareditformat = cellinfo._getAttrValue(cellinfo.calendareditformat, datarow);
		var locale = cellinfo._getLocale(datarow);

		if (this._displaymode == true && !v) {
			v = cellinfo._getDisplayText(datarow);
		}

		cCalendar.createComponent();

		if (!calendardateformat) {
			calendardateformat = nexacro.Calendar.prototype.dateformat;
		}
		if (!calendareditformat) {
			calendareditformat = nexacro.Calendar.prototype.editformat;
		}

		cCalendar.set_dateformat(calendardateformat);
		cCalendar.set_editformat(calendareditformat);
		cCalendar.set_locale(locale);
		cCalendar.set_value(v);

		cCalendar._recalcLayout();

		this._writable = true;

		return cCalendar;
	};

	_pCellControl._createEditor_textarea = function (readonly) {
		var datarow = this._getDataRow();
		var rect = this._getControlRect();
		var cellinfo = this._refinfo;
		var cTextArea = new nexacro[this._cellTextAreaObj]("celltextarea", rect.left, rect.top, rect.width, rect.height, this);
		var v;

		if (cTextArea._displaymode == true || readonly) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		var wordwrap = cellinfo._getWordwrap(datarow);
		var textareamaxlength = cellinfo._getAttrValue(cellinfo.textareamaxlength, datarow);
		var dataset = this._getBindDataset();

		if (textareamaxlength == 0) {
			textareamaxlength = dataset ? dataset._getColumnSize(cellinfo._col) : 0;
		}

		cTextArea.set_maxlength(textareamaxlength);
		cTextArea.set_wordWrap(wordwrap);
		cTextArea.set_value(v);

		cTextArea.createComponent();

		if (readonly) {
			cTextArea.set_readonly(true);
		}

		this._writable = !readonly;

		return cTextArea;
	};

	_pCellControl._createEditor_readonly = function () {
		return this._createEditor_textarea(true);
	};

	_pCellControl._createEditor_button = function () {
		var rect = this._getControlRect();
		var cButton = new nexacro[this._cellButtonObj]("cellbutton", rect.left, rect.top, rect.width, rect.height, this);
		cButton.createComponent();

		if (nexacro._Browser == "IE" && !nexacro._enableaccessibility) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				cButton._control_element.setElementFocus();
			}, 0);
		}

		this._writable = false;

		return cButton;
	};


	_pCellControl._getAccessibilityLabel = function (is_no_make) {
		var label = nexacro.Component.prototype._getAccessibilityLabel.call(this);

		if (!label && this.subcells.length > 0) {
			var subcells = this.subcells;
			var subcell_text;

			for (var i = 0, n = subcells.length; i < n; i++) {
				if (subcell_text = subcells[i]._getDisplayText()) {
					if (label) {
						label = label + " " + subcell_text;
					}
					else {
						label = subcell_text;
					}
				}
			}
		}

		if ((nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) && !is_no_make) {
			var tmp_label = this._getAccessibilityMakeAddLabel();
			label = tmp_label + " " + label;
		}

		return label;
	};

	_pCellControl._isEditable = function () {
		if (this._editor) {
			return (this._editor.visible && this._editor._adjust_width > 0);
		}
		return false;
	};

	_pCellControl._setAccessibilityStatFocus = function () {
		if (nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) {
			return;
		}
		var acclabel = this._refinfo._getAttrValue(this._refinfo.accessibilitylabel, this._getDataRow());
		this.set_accessibilitylabel(acclabel);
		this.on_apply_accessibility();

		this.on_apply_prop_accessibilitydescription();
		this.on_apply_prop_accessibilityaction();
		var tmp_label = "";

		tmp_label = this._getAccessibilityMakeAddLabel() + " " + this._getCellAccessibilityLabel();
		this._setAccessibilityStatSelected(this.selected);
		tmp_label = tmp_label.trim();

		this._setAccessibilityLabel(tmp_label);
		if (this._isEditable()) {
			this._editor._setAccessibilityStatFocus();
		}
		else if (this._subComp && this._curDisplayType != "treeitemcontrol") {
			this._subComp._setAccessibilityStatFocus();
		}
		else {
			nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
		}
	};

	_pCellControl._getCellAccessibilityLabel = function () {
		var tmpLabel = "";


		tmpLabel = this._getAccessibilityReadLabel();


		if (this._subComp) {
			var subComp = this._subComp;
			var displayType = this._curDisplayType;

			if (displayType == "checkboxcontrol") {
				this._setAccessibilityStatChecked(subComp.isChecked());
			}
			else if (displayType == "treeitemcontrol") {
				var datarow = this._getDataRow();
				var cellinfo = this._refinfo;
				var state = this._getTreeStatus();
				var level = cellinfo._getTreeLevel(datarow);
				var startlevel = cellinfo._getTreeStartLevel(datarow);

				switch (state) {
					case 0:
						this._setAccessibilityStatExpanded(false);
						break;
					case 1:
						this._setAccessibilityStatExpanded(true);
						break;
					default:
						this._setAccessibilityStatExpanded(undefined);
				}
				this._setAccessibilityInfoLevel(level - startlevel + 1);
			}
		}
		return tmpLabel;
	};

	_pCellControl._getTreeStatus = function () {
		;
	};

	_pCellControl.__getAccessibilityMakeAddLabelMiddleClass = function () {
		return "";
	};

	_pCellControl._getAccessibilityMakeAddLabel = function () {
		var tmpLabel = "", view = this._view;

		var desclevel = this._getDescLevel();
		if (desclevel == "none" || desclevel == "child") {
			return "";
		}

		if (view._is_first_focus && view._control_element) {
			tmpLabel = view._getAccessibilityLabel();
		}


		tmpLabel += this.__getAccessibilityMakeAddLabelMiddleClass();
		return tmpLabel;
	};

	_pCellControl._getAccessibilityRoleParentType = function () {
		;
	};

	_pCellControl._getAccessibilityRole = function () {
		var role = this.accessibilityrole;

		if (role == "gridcell") {
			var _role = this._getAccessibilityRoleParentType();

			if (_role) {
				role = _role;
			}

			if (this._curDisplayType == "treeitemcontrol") {
				role = "treeitem";
			}
			else if (this._subComp) {
				role = this._subComp._getAccessibilityRole();
			}
		}
		return role;
	};

	_pCellControl.on_get_accessibility_label = function () {
		var usedecoratetext = false;
		if (this._refinfo) {
			var dt = this._refinfo.displaytype;
			if (dt == "checkboxcontrol") {
				return "";
			}

			usedecoratetext = (dt == "decoratetext" ? true : false);
		}


		var label = this._getDisplayText();
		if (usedecoratetext) {
			return nexacro._getDisplayTextfromDecorateText(label);
		}
		return label;
	};


	_pCellControl._setAccessibilityNotifyEvent = function (direction) {
		var label = this._getAccessibilityMakeAddLabel();
		label += " " + this._getCellAccessibilityLabel();
		label = label.trim();
		this._setAccessibilityLabel(label);
		return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, (direction && direction > 0) ? 0 : 1);
	};

	nexacro._CellExpandControl = function (parent, left, top, right, bottom, controlmode) {
		nexacro.Button.call(this, "cellexpandbutton", left, top, right - left, bottom - top, null, null, null, null, null, null, parent);


		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellobj = parent;
		this._cellinfo = parent._refinfo;
		this._setControl();
	};

	var _pCellExpand = nexacro._createPrototype(nexacro.Button, nexacro._CellExpandControl);
	nexacro._CellExpandControl.prototype = _pCellExpand;
	_pCellExpand._is_subcontrol = true;

	_pCellExpand.on_destroy_contents = function () {
		nexacro.Button.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellobj = null;
		this._cellinfo = null;
	};

	_pCellExpand._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellExpand._updateAll = function (onlycontents) {
		var control_elem = this.getElement();
		if (control_elem) {
			var datarow = this._cellobj._getDataRow();

			if (!onlycontents) {
				this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
			}

			if (this._cellinfo) {
				var icon = this._cellinfo._getAttrValue(this._cellinfo.expandimage, datarow);

				if (icon) {
					this.set_icon(icon);
				}

				var text = this._cellinfo._getAttrValue(this._cellinfo.expandchar, datarow);
				this.set_text(text);
			}
		}
	};

	_pCellExpand._setAlign = function (halign, valign) {
		var elem = this._text_elem;

		if (elem) {
			if (halign) {
				this.set_textAlign(halign);
			}
			if (valign) {
				this.set_verticalAlign(valign);
			}
		}
	};

	_pCellExpand.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "expandbutton");
	};

	_pCellExpand.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "expandbutton");
	};

	_pCellExpand._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		nexacro.Button.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellExpand.on_get_accessibility_description = function () {
		if (this._cellobj) {
			this._cellobj.tooltiptext;
		}
	};

	_pCellExpand.on_get_accessibility_label = function () {
		return this.text;
	};

	nexacro._CellButtonControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.Button.call(this, id, left, top, width, height, null, null, null, null, null, null, parent);

		this.tabstop = false;
		this._clickevt_able = true;
		this._displaymode = (displaymode) ? true : false;
		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._setControl();
	};

	var _pCellButton = nexacro._createPrototype(nexacro.Button, nexacro._CellButtonControl);
	nexacro._CellButtonControl.prototype = _pCellButton;
	_pCellButton._is_subcontrol = true;

	_pCellButton.on_destroy_contents = function () {
		nexacro.Button.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellButton._apply_setfocus = function (evt_name) {
		if (!this._displaymode || nexacro._enableaccessibility) {
			nexacro.Button.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pCellButton._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellButton.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.Button.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	_pCellButton.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.Button.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	_pCellButton._EditUpdateAll = function () {
		if (this.getElement()) {
			this._updateAll();

			var datarow = this._cellobj._getDataRow();
			var wordwrap = this._cellinfo._getWordwrap(datarow);
			this.set_wordWrap(wordwrap);
		}
	};

	_pCellButton._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		var v;
		if (this._displaymode == true) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		if (v != null) {
			this.set_text(v);
		}
		else {
			this.set_text("");
		}
	};

	_pCellButton._getValueData = function () {
	};

	_pCellButton._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellButton._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellButton.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pCellButton.on_get_accessibility_label = function () {
		return this.text;
	};

	_pCellButton._getAccessibilityRole = function () {
		return this._cellobj ? this._cellobj.accessibilityrole : this.accessibilityrole ? this.accessibilityrole : "none";
	};

	nexacro._CellProgressBarControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro.ProgressBar.call(this, id, left, top, width, height, null, null, null, null, null, null, parent);

		this.tabstop = false;
		this.max = 100;
		this.min = 0;
		this.step = 1;
		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._setControl();
	};
	var _pCellBar = nexacro._CellProgressBarControl.prototype = nexacro._createPrototype(nexacro.ProgressBar, nexacro._CellProgressBarControl);
	_pCellBar._is_subcontrol = true;

	_pCellBar.on_destroy_contents = function () {
		nexacro.ProgressBar.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellBar.set_text = function (v) {
		var retn = nexacro.Component.prototype.set_text.call(this, v);
		this.set_pos(parseInt(this._displaytext));
		return retn;
	};

	_pCellBar._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellBar.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pCellBar.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pCellBar._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}

		return "";
	};

	_pCellBar._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellBar._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		var v = cellinfo._getDisplayText(datarow);

		if (v != null) {
			this.set_text(v);
		}
		else {
			this.set_text("");
		}

		v = cellinfo._getAttrValue(cellinfo.progressbarblockgap, datarow);
		if (v != null) {
			this.set_blockgap(v);
		}

		v = cellinfo._getAttrValue(cellinfo.progressbarblocksize, datarow);
		if (v != null) {
			this.set_blocksize(v);
		}

		v = cellinfo._getAttrValue(cellinfo.progressbardirection, datarow);
		if (v != null) {
			this.set_direction(v);
		}

		v = cellinfo._getAttrValue(cellinfo.progressbarsmooth, datarow);
		if (v != null) {
			this.set_smooth(v);
		}
	};

	_pCellBar._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellBar.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	nexacro._CellEditControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.Edit.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);

		this.tabstop = false;

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;

		this._setControl();
	};

	var _pCellEdit = nexacro._createPrototype(nexacro.Edit, nexacro._CellEditControl);
	nexacro._CellEditControl.prototype = _pCellEdit;
	_pCellEdit._is_subcontrol = true;

	_pCellEdit.on_destroy_contents = function () {
		nexacro.Edit.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellEdit._apply_setfocus = function (evt_name, self_flag, callback) {
		if (this._view._onceTime_focus && !callback) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				this._apply_setfocus(evt_name, self_flag, true);
			}, 0);
			return;
		}
		return nexacro.Edit.prototype._apply_setfocus.call(this, evt_name, self_flag);
	};

	_pCellEdit.setOnlyElementFocus = function () {
		if (this._input_element) {
			this._input_element._applyElementFocus();
		}
	};

	_pCellEdit.on_fire_oninput = function () {
		nexacro.Edit.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellEdit.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.Edit.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	_pCellEdit.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.Edit.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	_pCellEdit.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pCellEdit._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellEdit._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellEdit._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		var v;
		if (this._displaymode == true) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		this.set_value(v);

		v = cellinfo._getAttrValue(cellinfo.editautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}

		v = cellinfo._getAttrValue(cellinfo.editinputfilter, datarow);
		if (v != null) {
			this.set_inputfilter(v);
		}

		v = cellinfo._getAttrValue(cellinfo.editinputmode, datarow);
		if (v != null) {
			this.set_inputmode(v);
		}

		v = cellinfo._getAttrValue(cellinfo.editinputtype, datarow);
		if (v != null) {
			this.set_inputtype(v);
		}

		v = cellinfo._getAttrValue(cellinfo.editautoskip, datarow);
		if (v != null) {
			this.set_autoskip(v);
		}

		v = cellinfo._getAttrValue(cellinfo.editimemode, datarow);
		if (v != null) {
			this.set_imemode(v);
		}

		v = cellinfo._getAttrValue(cellinfo.edituseime, datarow);
		if (v != null) {
			this.set_useime(v);
		}

		if (this._view) {
			this.set_usesoftkeyboard(this._view.usesoftkeyboard);
		}
	};

	_pCellEdit._EditUpdateAll = function () {
		this._updateAll();
	};

	_pCellEdit._getValueData = function () {
		return this.value;
	};

	_pCellEdit._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		label = label.trim();
		this._setAccessibilityLabel(label);

		if (!this._displaymode) {
			this._input_element._setAccessibilityLabel(label);
		}

		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellEdit.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	nexacro._CellTextAreaControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.TextArea.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);
		this.tabstop = false;

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;

		this._setControl();
	};

	var _pCellTextArea = nexacro._createPrototype(nexacro.TextArea, nexacro._CellTextAreaControl);
	nexacro._CellTextAreaControl.prototype = _pCellTextArea;
	_pCellTextArea._is_subcontrol = true;

	_pCellTextArea.on_destroy_contents = function () {
		nexacro.TextArea.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellTextArea._apply_setfocus = function (evt_name, self_flag, callback) {
		if (this._view._onceTime_focus && !callback) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				this._apply_setfocus(evt_name, self_flag, true);
			}, 0);
			return;
		}
		return nexacro.TextArea.prototype._apply_setfocus.call(this, evt_name, self_flag);
	};

	_pCellTextArea.setOnlyElementFocus = _pCellEdit.setOnlyElementFocus;

	_pCellTextArea.on_fire_oninput = function () {
		nexacro.TextArea.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellTextArea.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.TextArea.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	_pCellTextArea.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.TextArea.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	_pCellTextArea.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp) {
		nexacro.TextArea.prototype.on_keydown_basic_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp);
		if ((ctrl_key || alt_key) && keycode == nexacro.Event.KEY_ENTER) {
			var input_elem = this._input_element;
			var pos = this.getCaretPos();
			var text = this.text;
			var chars = text.split("");

			chars.splice(pos, 0, "\n");
			var newValue = chars.join("");
			var newPos = pos + "\n".length;

			if (this.maxlength == 0 || newValue.length <= this.maxlength) {
				nexacro._OnceCallbackTimer.callonce(this, function () {
					input_elem.updateElementText(newValue, newPos);
				}, 0);
				input_elem.stopSysEvent();
			}
		}
	};

	_pCellTextArea.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pCellTextArea._isEnable = _pCellEdit._isEnable;

	_pCellTextArea._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellTextArea._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		var v;
		if (this._displaymode == true || this.readonly) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		this.set_value(v);

		v = cellinfo._getAttrValue(cellinfo.textareaautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}

		v = cellinfo._getAttrValue(cellinfo.textareainputfilter, datarow);
		if (v != null) {
			this.set_inputfilter(v);
		}

		v = cellinfo._getAttrValue(cellinfo.textareainputmode, datarow);
		if (v != null) {
			this.set_inputmode(v);
		}

		v = cellinfo._getAttrValue(cellinfo.textareainputtype, datarow);
		if (v != null) {
			this.set_inputtype(v);
		}

		v = cellinfo._getAttrValue(cellinfo.textareaautoskip, datarow);
		if (v != null) {
			this.set_autoskip(v);
		}

		v = cellinfo._getAttrValue(cellinfo.textareaimemode, datarow);
		if (v != null) {
			this.set_imemode(v);
		}

		v = cellinfo._getAttrValue(cellinfo.textareauseime, datarow);
		if (v != null) {
			this.set_useime(v);
		}

		if (this._displaymode == true) {
			this.set_scrollbartype("none");
		}
		else {
			v = cellinfo._getAttrValue(cellinfo.textareascrollbartype, datarow);

			if (v != null) {
				this.set_scrollbartype(v);
			}
			else {
				this.set_scrollbartype("none");
			}
		}
		v = cellinfo._getAttrValue(cellinfo.textareascrolltype, datarow);

		if (v != null) {
			this.set_scrolltype(v);
		}
		else {
			this.set_scrolltype("none");
		}

		v = cellinfo._getControlScrollbarsize(datarow, "textarea");
		if (v != null) {
			this.set_scrollbarsize(v);
		}

		if (this._view) {
			this.set_usesoftkeyboard(this._view.usesoftkeyboard);
		}
	};

	_pCellTextArea._EditUpdateAll = function () {
		if (this.getElement()) {
			var datarow = this._cellobj._getDataRow();

			this._updateAll();

			var wordwrap = this._cellinfo._getWordwrap(datarow);
			this.set_wordWrap(wordwrap);
		}
	};

	_pCellTextArea._getValueData = function () {
		return this.value;
	};

	_pCellTextArea._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellTextArea.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	nexacro._CellMaskEditControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.MaskEdit.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);

		this._displaymode = (displaymode) ? true : false;
		this.tabstop = false;
		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;

		this._setControl();
	};

	var _pCellMaskEdit = nexacro._createPrototype(nexacro.MaskEdit, nexacro._CellMaskEditControl);
	nexacro._CellMaskEditControl.prototype = _pCellMaskEdit;
	_pCellMaskEdit._is_subcontrol = true;

	_pCellMaskEdit.on_destroy_contents = function () {
		nexacro.MaskEdit.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellMaskEdit._apply_setfocus = function (evt_name, self_flag, callback) {
		if (this._view._onceTime_focus && !callback) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				this._apply_setfocus(evt_name, self_flag, true);
			}, 0);
			return;
		}
		return nexacro.MaskEdit.prototype._apply_setfocus.call(this, evt_name, self_flag);
	};

	_pCellMaskEdit.setOnlyElementFocus = _pCellEdit.setOnlyElementFocus;


	_pCellMaskEdit.on_fire_oninput = function () {
		nexacro.MaskEdit.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellMaskEdit.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.MaskEdit.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	_pCellMaskEdit.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.MaskEdit.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	_pCellMaskEdit._isEnable = _pCellEdit._isEnable;

	_pCellMaskEdit._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellMaskEdit._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();
		var displayType = cellinfo._getDisplaytype(datarow);

		var v = cellinfo._getValue(datarow);

		this.set_value(v);

		v = cellinfo._getAttrValue(cellinfo.maskeditformat, datarow);
		if (v != null) {
			this.set_format(v);
		}

		v = cellinfo._getAttrValue(cellinfo.maskedittype, datarow);
		if (v != null) {
			this.set_type(v);
		}

		v = cellinfo.maskeditmaskchar;
		if (v != null) {
			this.set_maskchar(v);
		}

		v = cellinfo._getAttrValue(cellinfo.maskeditautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}

		v = cellinfo._getAttrValue(cellinfo.maskeditautoskip, datarow);
		if (v != null) {
			this.set_autoskip(v);
		}

		v = cellinfo._getAttrValue(cellinfo.maskeditclipmode, datarow);
		if (v != null) {
			this.set_clipmode(v);
		}

		v = cellinfo._getAttrValue(cellinfo.maskeditlimitbymask, datarow);
		if (v != null) {
			this.set_limitbymask(v);
		}

		v = cellinfo._getAttrValue(cellinfo.maskedittrimtype, datarow);
		if (v != null) {
			this.set_trimtype(v);
		}

		if (this._view) {
			this.set_usesoftkeyboard(this._view.usesoftkeyboard);
		}
	};

	_pCellMaskEdit._EditUpdateAll = function () {
		this._updateAll();
	};

	_pCellMaskEdit._getValueData = function () {
		return this.value;
	};

	_pCellMaskEdit._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellMaskEdit.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	nexacro._CellCalendarControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.Calendar.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);

		this.tabstop = false;
		this.ondropdown = "grid";
		this.readonly = this._displaymode = (displaymode) ? true : false;
		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._setControl();
	};

	var _pCellCalendar = nexacro._createPrototype(nexacro.Calendar, nexacro._CellCalendarControl);
	nexacro._CellCalendarControl.prototype = _pCellCalendar;
	_pCellCalendar._is_subcontrol = true;

	_pCellCalendar.on_create_contents = function (win) {
		nexacro.Calendar.prototype.on_create_contents.call(this, win);

		if (this._displaymode) {
			this.calendaredit.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
				return currentstatus;
			};

			this.calendaredit.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
				return currentstatus;
			};

			if (this.dropbutton) {
				this.dropbutton.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
					return currentstatus;
				};

				this.dropbutton.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
					return currentstatus;
				};
			}
		}
	};

	_pCellCalendar.on_destroy_contents = function () {
		nexacro.Calendar.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellCalendar._apply_setfocus = function (evt_name) {
		if (!this._displaymode || nexacro._enableaccessibility) {
			return nexacro.Calendar.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pCellCalendar.setOnlyElementFocus = function () {
		if (this.calendaredit && this.calendaredit._input_element) {
			this.calendaredit._input_element._applyElementFocus();
		}
	};

	_pCellCalendar._getPopupSizeArr = function () {
		if (this.type != "monthonly") {
			return nexacro.Calendar.prototype._getPopupSizeArr.call(this);
		}

		var size = this.popupsize;
		if (!size) {
			size = this.getOffsetWidth() + " " + this.getOffsetHeight();
		}

		size = size.split(/\s+/);

		var width = +size[0];
		var height = size[1] ? +size[1] : width;

		return {
			width : width, 
			height : height
		};
	};

	_pCellCalendar._setValueCtrl = function (fire_event, post_text, post_value) {
		this._currentformat = "editformat";
		var edit = this.calendaredit;

		if (edit && edit.value != undefined) {
			var pre_value = this.value;
			var pre_text = this.text;
			var cur_value, cur_text;

			if (post_text != undefined) {
				cur_value = post_value;
				cur_text = edit.text;
			}
			else {
				cur_value = edit.value;
				cur_text = edit.text;
			}

			if (pre_value != cur_value.trim()) {
				if (fire_event) {
					if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value)) {
						cur_value = pre_value;
					}
				}

				this._setValue(cur_value);
				edit._setValue(cur_value);
				this._default_value = this.value;
				this._default_text = this.text;
			}
		}
	};

	_pCellCalendar.on_fire_oninput = function () {
		nexacro.Calendar.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellCalendar.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue, isselect) {
		this._cellobj.on_fire_oncloseup(obj, pretext, posttext, prevalue, postvalue, isselect);
	};

	_pCellCalendar.on_fire_ondropdown = function (obj) {
		return this._cellobj.on_fire_ondropdown(obj);
	};

	_pCellCalendar.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var ret = nexacro.Calendar.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);

		if (this._view) {
			if (this._isPopupVisible()) {
				this._view._is_editor_keyaction = false;
			}
			else {
				this._view._is_editor_keyaction = true;
			}
		}

		return ret;
	};

	_pCellCalendar.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.Calendar.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "control");
		return true;
	};

	_pCellCalendar.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.Calendar.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "control");
		return true;
	};

	_pCellCalendar._on_edit_oneditclick = function (obj, e) {
		nexacro.Calendar.prototype._on_edit_oneditclick.call(this, obj, e);

		if (this._displaymode) {
			return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, "control");
		}
	};

	_pCellCalendar._on_drop_onclick = function (obj, e) {
		nexacro.Calendar.prototype._on_drop_onclick.call(this, obj, e);

		if (this._displaymode) {
			return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, "control");
		}
	};

	_pCellCalendar.on_fire_onchanged = function (obj, pre_text, pre_value, post_text, post_value) {
		if (!obj._displaymode) {
			var update = this._cellobj._getAutoUpdateType();
			if (update == "dateselect" || update == "itemselect") {
				this._cellobj._applyEditorDataset(true);
			}
			return (nexacro.Calendar.prototype.on_fire_onchanged.call(this, obj, pre_text, pre_value, post_text, post_value));
		}
	};

	_pCellCalendar.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pCellCalendar._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellCalendar._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}

		return "";
	};

	_pCellCalendar._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellCalendar._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var view = this._view;
		var datarow = cellobj._getDataRow();

		var calendardateformat = cellinfo._getAttrValue(cellinfo.calendardateformat, datarow);
		if (!calendardateformat) {
			calendardateformat = nexacro.Calendar.prototype.dateformat;
		}

		this.set_dateformat(calendardateformat);

		var calendareditformat = cellinfo._getAttrValue(cellinfo.calendareditformat, datarow);

		if (!calendareditformat) {
			calendareditformat = nexacro.Calendar.prototype.editformat;
		}

		this.set_editformat(calendareditformat);

		if (view) {
			this.set_locale(view._getLocale());
			this.set_usesoftkeyboard(view.usesoftkeyboard);
		}

		var org_v = cellinfo._getValue(datarow);
		var v = org_v;

		if (this._displaymode == true && !v) {
			var maskobj = this._masktypeobj;
			v = cellinfo._getDisplayText(datarow);
			v = maskobj.removeMask(v.split(''));
			v = maskobj.changeNormalizeValue(v);
		}

		this.set_value(v);

		var buttonsize = cellinfo._getControlButtonsize(datarow, "calendar");
		this.set_buttonsize(buttonsize);
		var popuptype = cellinfo._getControlPopuptype(datarow, "calendar");
		if (popuptype) {
			this.set_popuptype(popuptype);
		}

		var autoselect = cellinfo._getAttrValue(cellinfo.calendarautoselect, datarow);
		if (autoselect) {
			this.set_autoselect(autoselect);
		}

		if (this._displaymode == true) {
			var calendardisplaynulltype = cellinfo._getAttrValue(cellinfo.calendardisplaynulltype, datarow);
			if (calendardisplaynulltype != "default" && nexacro._isNull(org_v)) {
				this.set_value(org_v);
				if (calendardisplaynulltype == "nulltext") {
					v = cellinfo._getAttrValue(cellinfo.calendardisplaynulltext, datarow);
					if (v != null) {
						this.set_displaynulltext(v);
					}
				}
				else if (calendardisplaynulltype == "nullmask") {
					this.set_displaynulltext("");
				}
				else {
					this.set_displaynulltext("");
					this.set_dateformat("");
				}
			}
		}

		var calendardaysize = cellinfo._getAttrValue(cellinfo.calendardaysize, datarow);
		if (calendardaysize) {
			this.set_daysize(calendardaysize);
		}
		var calendarheadformat = cellinfo._getAttrValue(cellinfo.calendarheadformat, datarow);
		if (calendarheadformat) {
			this.set_headformat(calendarheadformat);
		}
		var calendarheadheight = cellinfo._getAttrValue(cellinfo.calendarheadheight, datarow);
		if (calendarheadheight) {
			this.set_headheight(calendarheadheight);
		}
		var calendarpopupsize = cellinfo._getControlPopupsize(datarow, "calendar");
		if (calendarpopupsize) {
			this.set_popupsize(calendarpopupsize);
		}
		var calendarshowmonthspin = cellinfo._getAttrValue(cellinfo.calendarshowmonthspin, datarow);
		if (calendarshowmonthspin) {
			this.set_showmonthspin(calendarshowmonthspin);
		}
		var calendarshowyearspin = cellinfo._getAttrValue(cellinfo.calendarshowyearspin, datarow);
		if (calendarshowyearspin) {
			this.set_showyearspin(calendarshowyearspin);
		}
		var calendartype = cellinfo._getAttrValue(cellinfo.calendartype, datarow);
		if (calendartype) {
			this.set_type(calendartype);
		}
		var calendarusetrailingday = cellinfo._getAttrValue(cellinfo.calendarusetrailingday, datarow);
		if (calendarusetrailingday) {
			this.set_usetrailingday(calendarusetrailingday);
		}
		var calendarweekformat = cellinfo._getAttrValue(cellinfo.calendarweekformat, datarow);
		if (calendarweekformat) {
			this.set_weekformat(calendarweekformat);
		}

		var innerdataset = cellinfo._getAttrValue(cellinfo.calendarinnerdataset, datarow);
		if (innerdataset) {
			this.set_innerdataset(innerdataset);
		}
		var backgroundcolumn = cellinfo._getAttrValue(cellinfo.calendarbackgroundcolumn, datarow);
		if (backgroundcolumn) {
			this.set_backgroundcolumn(backgroundcolumn);
		}
		var bordercolumn = cellinfo._getAttrValue(cellinfo.calendarbordercolumn, datarow);
		if (bordercolumn) {
			this.set_bordercolumn(bordercolumn);
		}
		var datecolumn = cellinfo._getAttrValue(cellinfo.calendardatecolumn, datarow);
		if (datecolumn) {
			this.set_datecolumn(datecolumn);
		}
		var textcolorcolumn = cellinfo._getAttrValue(cellinfo.calendartextcolorcolumn, datarow);
		if (textcolorcolumn) {
			this.set_textcolorcolumn(textcolorcolumn);
		}
	};

	_pCellCalendar._EditUpdateAll = function () {
		this._updateAll();
	};

	_pCellCalendar._getValueData = function () {
		this._setValueCtrl(true);
		return this.value;
	};

	_pCellCalendar._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_arrows = this._want_arrows;
		this._is_first_focus = false;
		return {
			want_tab : (this._view ? this._view._acceptstab : false), 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrows
		};
	};

	_pCellCalendar._getChildren = function () {
		return [this.calendaredit, this.dropbutton];
	};

	_pCellCalendar._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		tmp_label = (tmp_label != cellobj._displaytext) ? tmp_label : "";
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellCalendar.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pCellCalendar._on_dataset_onvaluechanged = function (obj, e) {
		if (!this._displaymode) {
			nexacro.Combo.prototype._on_dataset_onvaluechanged.call(this, obj, e);
		}
	};

	_pCellCalendar._on_dataset_onrowsetchanged = function (obj, e) {
		if (!this._displaymode) {
			nexacro.Combo.prototype._on_dataset_onrowsetchanged.call(this, obj, e);
		}
	};

	nexacro._CellComboControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.Combo.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);
		this.tabstop = false;

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._setControl();
	};

	var _pCellCombo = nexacro._createPrototype(nexacro.Combo, nexacro._CellComboControl);
	nexacro._CellComboControl.prototype = _pCellCombo;
	_pCellCombo._is_subcontrol = true;

	_pCellCombo.on_create_contents = function () {
		nexacro.Combo.prototype.on_create_contents.call(this);

		if (this._displaymode) {
			this.comboedit.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
				return currentstatus;
			};

			this.comboedit.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
				return currentstatus;
			};

			if (this.dropbutton) {
				this.dropbutton.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
					return currentstatus;
				};

				this.dropbutton.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
					return currentstatus;
				};
			}
		}
	};

	_pCellCombo.setOnlyElementFocus = function () {
		if (this.comboedit && this.comboedit._input_element) {
			this.comboedit._input_element._applyElementFocus();
		}
	};

	_pCellCombo.on_destroy_contents = function () {
		nexacro.Combo.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellCombo._apply_setfocus = function (evt_name) {
		if (!this._displaymode || nexacro._enableaccessibility) {
			return nexacro.Combo.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pCellCombo.on_fire_oncloseup = function (obj, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect) {
		nexacro.Combo.prototype.on_fire_oncloseup.call(this, obj, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect);
		this._cellobj.on_fire_oncloseup(obj, beforeText, afterText, beforeValue, afterValue, isSelect);
	};

	_pCellCombo.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var view = this._view;
		if (view) {
			if (keycode == nexacro.Event.KEY_DOWN || keycode == nexacro.Event.KEY_UP
				 || (keycode == nexacro.Event.KEY_DOWN && alt_key)) {
				view._is_editor_keyaction = false;
			}
		}

		nexacro.Combo.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);

		if (!this._displaymode) {
			return this._cellobj.on_fire_user_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
		}
	};

	_pCellCombo.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp) {
		if (!this._displaymode) {
			return nexacro.Combo.prototype.on_fire_sys_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp);
		}
	};

	_pCellCombo.on_fire_ondropdown = function (obj) {
		return this._cellobj.on_fire_ondropdown(obj);
	};

	_pCellCombo.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.Combo.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "control");
		return true;
	};

	_pCellCombo.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.Combo.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "control");
		return true;
	};

	_pCellCombo._on_edit_oneditclick = function (obj, e) {
		nexacro.Combo.prototype._on_edit_oneditclick.call(this, obj, e);

		if (this._displaymode) {
			return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, "control");
		}
	};

	_pCellCombo._on_drop_onclick = function (obj, e) {
		nexacro.Combo.prototype._on_drop_onclick.call(this, obj, e);

		if (this._displaymode) {
			return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, "control");
		}
	};

	_pCellCombo.on_fire_oninput = function () {
		nexacro.Combo.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellCombo.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp) {
		var retn = nexacro.Component.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
		if (this._isPopupVisible() && this == refer_comp) {
			this._closePopup();
		}

		return retn;
	};

	_pCellCombo.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (!obj._displaymode) {
			var update = this._cellobj._getAutoUpdateType();
			if (update == "comboselect" || update == "itemselect") {
				this._cellobj._applyEditorDataset(true);
			}
			return (nexacro.Combo.prototype.on_fire_onitemchanged.call(this, obj, preindex, pretext, prevalue, postindex, posttext, postvalue));
		}
	};

	_pCellCombo.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pCellCombo._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellCombo._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellCombo._setProperty = function () {
		var cellinfo = this._cellinfo, cellobj = this._cellobj;

		var datarow = cellobj._getDataRow();
		var edittype = cellinfo._getEdittype(datarow);
		var innerds = cellinfo._getAttrValue(cellinfo.combodataset, datarow);
		if (innerds && innerds.length) {
			this.set_innerdataset(innerds);
		}
		var datanm = cellinfo._getAttrValue(cellinfo.combodatacol, datarow);
		if (datanm && datanm.length) {
			this.set_datacolumn(datanm);
		}
		var codenm = cellinfo._getAttrValue(cellinfo.combocodecol, datarow);
		if (codenm && codenm.length) {
			this.set_codecolumn(codenm);
		}
		var rowcnt = cellinfo._getAttrValue(cellinfo.combodisplayrowcount, datarow);
		if (rowcnt) {
			this.set_displayrowcount(rowcnt);
		}
		var type = cellinfo._getAttrValue(cellinfo.combotype, datarow);
		if (type) {
			this.set_type(type);
		}
		var imemode = cellinfo._getAttrValue(cellinfo.comboimemode, datarow);
		if (imemode) {
			this.set_imemode(imemode);
		}
		var comboitemheight = cellinfo._getAttrValue(cellinfo.comboitemheight, datarow);
		if (comboitemheight) {
			this.set_itemheight(comboitemheight);
		}
		var buttonsize = cellinfo._getControlButtonsize(datarow, "combo");
		this.set_buttonsize(buttonsize);
		var popuptype = cellinfo._getControlPopuptype(datarow, "combo");
		if (popuptype) {
			this.set_popuptype(popuptype);
		}
		var scrollsize = cellinfo._getControlScrollbarsize(datarow, "combo");
		if (scrollsize != null) {
			this.set_scrollbarsize(scrollsize);
		}
		var popupsize = cellinfo._getControlPopupsize(datarow, "combo");
		if (popupsize) {
			this.set_popupsize(popupsize);
		}

		var v;
		if (this._displaymode == true) {
			v = cellinfo._getDisplayText(datarow);
			this.set_text(v);
		}
		else {
			v = cellinfo._getValue(datarow);
			this.set_value(v);
		}

		v = cellinfo._getAttrValue(cellinfo.comboautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}

		v = cellinfo._getAttrValue(cellinfo.combodisplaynulltype, datarow);
		if (v == "nulltext") {
			v = cellinfo._getAttrValue(cellinfo.combodisplaynulltext, datarow);
			if (v != null) {
				this.set_displaynulltext(v);
			}
		}
		else {
			this.set_displaynulltext("");
		}

		if (this._view) {
			this.set_usesoftkeyboard(this._view.usesoftkeyboard);
		}
	};

	_pCellCombo._EditUpdateAll = function () {
		this._updateAll();
	};

	_pCellCombo._getValueData = function () {
		return this.value;
	};

	_pCellCombo._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_arrows = this._want_arrows;
		this._is_first_focus = false;
		return {
			want_tab : (this._view ? this._view._acceptstab : false), 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrows
		};
	};

	_pCellCombo._getChildren = function () {
		return [this.comboedit, this.dropbutton];
	};

	_pCellCombo._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		tmp_label = (tmp_label != cellobj._displaytext) ? tmp_label : "";
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellCombo.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pCellCombo._on_dataset_onvaluechanged = function (obj, e) {
		if (!this._displaymode) {
			nexacro.Combo.prototype._on_dataset_onvaluechanged.call(this, obj, e);
		}
	};

	_pCellCombo._on_dataset_onrowsetchanged = function (obj, e) {
		if (!this._displaymode) {
			nexacro.Combo.prototype._on_dataset_onrowsetchanged.call(this, obj, e);
		}
	};

	nexacro._CellCheckboxControlBase = function (id, left, top, width, height, parent) {
		nexacro.CheckBox.call(this, id, left, top, width, height, null, null, null, null, null, null, parent);
		this.tabstop = false;
		this._is_usetextbox = false;

		var wnd = parent;
		while (wnd) {
			if (wnd._refinfo) {
				this._cellobj = wnd;
				this._cellinfo = wnd._refinfo;
				this._view = wnd._view;
				break;
			}
			wnd = wnd.parent;
		}
		this.checked = false;
		this._setControl();
	};

	var _pCellCheckboxBase = nexacro._createPrototype(nexacro.CheckBox, nexacro._CellCheckboxControlBase);
	nexacro._CellCheckboxControlBase.prototype = _pCellCheckboxBase;
	_pCellCheckboxBase._is_subcontrol = true;

	_pCellCheckboxBase._apply_setfocus = function (evt_name, callback) {
	};

	_pCellCheckboxBase.on_create_contents = function () {
		this._adjustAlign();
		nexacro.CheckBox.prototype.on_create_contents.call(this);
	};

	_pCellCheckboxBase.on_destroy_contents = function () {
		nexacro.CheckBox.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellCheckboxBase.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pCellCheckboxBase.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pCellCheckboxBase._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellCheckboxBase._adjustAlign = function (halign, valign) {
		var prect = this._cellobj._getAvailableRect();
		var left = prect.left;
		var top = prect.top;
		var right = prect.right;
		var bottom = prect.bottom;
		var width = prect.width;
		var height = prect.height;
		var datarow = this._cellobj._getDataRow();
		var controlSize = this._cellinfo._getCheckboxsize(datarow);

		if (controlSize < 0 || controlSize === undefined) {
			var size = this._on_getFitSize();
			controlSize = size[1];
		}

		if (!halign) {
			halign = "center";
		}
		if (!valign) {
			valign = "middle";
		}

		if (halign == "center") {
			left += ((width - controlSize) / 2);
		}
		else if (halign == "right") {
			left = right - controlSize;
		}

		if (valign == "middle") {
			top += ((height - controlSize) / 2);
		}
		else if (valign == "bottom") {
			top = bottom - controlSize;
		}

		this.move(left, top, controlSize, controlSize);
	};

	_pCellCheckboxBase._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellCheckboxBase._getCheckValue = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();
		var v = cellinfo._getTextValueForDisp(datarow);

		return v;
	};

	_pCellCheckboxBase._setProperty = function () {
		var v = this._getCheckValue();

		this.set_value(v);
		this.checked = this._isChecked(v);
		this._cellobj._setAccessibilityStatChecked(this.checked);
	};

	_pCellCheckboxBase._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		this._setAccessibilityStatChecked(this.isChecked());
		cellobj._setAccessibilityStatChecked(this.isChecked());
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellCheckboxBase.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pCellCheckboxBase.on_get_accessibility_label = function () {
		return "";
	};

	nexacro._CellCheckboxControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro._CellCheckboxControlBase.call(this, id, left, top, width, height, parent);
		this._controlmode = (controlmode) ? true : false;
	};

	var _pCellCheckbox = nexacro._createPrototype(nexacro._CellCheckboxControlBase, nexacro._CellCheckboxControl);
	nexacro._CellCheckboxControl.prototype = _pCellCheckbox;

	_pCellCheckbox.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		if (this._cellobj._isFakeCell()) {
			return false;
		}

		if (this._view && this._view.selectchangetype != "down") {
			if (nexacro._toBoolean(this._view.readonly) == false) {
				this._toggleCheck();
			}
		}

		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pCellCheckbox.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._cellobj._isFakeCell()) {
			return false;
		}

		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pCellCheckbox._toggleCheck = function () {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var view = this._view;
		var datarow = cellobj._getDataRow();
		var editType = cellinfo._getEdittype(datarow);

		if (view && (editType == "checkboxcontrol" || editType == "checkbox")) {
			var v = nexacro._toBoolean(this.value);
			v = (v) ? 0 : 1;

			if (cellinfo.text._bindtype == 1) {
				view._dsEventOccured = true;
				var dataset = cellobj._getBindDataset();
				if (dataset && dataset.setColumn(datarow, cellinfo.text._bindexpr, v)) {
					v = cellinfo._getTextValueForDisp(datarow);
					this.set_value(v);
				}
				view._dsEventOccured = false;
			}
		}
	};

	_pCellCheckbox._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}

		return "";
	};

	nexacro._CellImageControl = function (id, left, top, width, height, parent) {
		nexacro._ImageAreaControl.call(this, id, left, top, width, height, null, null, null, null, null, null, parent);

		this.tabstop = false;
		this.imagewidth = 0;
		this.imageheight = 0;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._img_elem = null;
		this._img_type = "url";
		this.accessibilityrole = "image";
	};

	var _pCellImage = nexacro._createPrototype(nexacro._ImageAreaControl, nexacro._CellImageControl);
	nexacro._CellImageControl.prototype = _pCellImage;

	_pCellImage.on_destroy_contents = function () {
		nexacro._ImageAreaControl.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellImage.on_apply_text = function () {
		this.set_image(this._getDisplayText());
	};

	_pCellImage.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "cellimage");
	};

	_pCellImage.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, this, from_refer_comp);
	};

	_pCellImage.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "cellimage");
	};

	_pCellImage.on_fire_onsize = function (width, height) {
		if (this._complete) {
			this.__apply_text();
		}
		return nexacro._ImageAreaControl.prototype.on_fire_onsize.call(this, width, height);
	};

	_pCellImage._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellImage._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}

		return "";
	};

	_pCellImage._updateAll = function (onlycontents) {
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellImage._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		this.on_apply_text();

		var imagestretch = cellinfo._getAttrValue(cellinfo.imagestretch, datarow);
		this.set_stretch(imagestretch);
	};

	_pCellImage._adjustAlign = function (halign, valign) {
		if (!halign) {
			halign = "center";
		}
		if (!valign) {
			valign = "middle";
		}

		this.set_imagealign(halign + " " + valign);
		this._updateElementPositions();
	};

	_pCellImage._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		label += " " + tmp_label;
		label = label.trim();
		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellImage.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pCellImage.on_get_accessibility_label = function () {
		return this.text;
	};

	nexacro._CellTreeControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
		this.tabstop = false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._leftline_ctrls = [];
		this._btnimg_ctrl = null;
		this._chk_ctrl = null;
		this._img_ctrl = null;
		this._text_ctrl = null;
		this._displaytext = "";
		this._upline_ctrl = null;
		this._downline_ctrl = null;
		this._clicktarget = null;
		this._checkboxObj = "_CellCheckboxControlBase";
	};

	var _pCellTree = nexacro._createPrototype(nexacro.Component, nexacro._CellTreeControl);
	nexacro._CellTreeControl.prototype = _pCellTree;
	_pCellTree._is_subcontrol = true;
	_pCellTree._type_name = "CellTreeItemControl";

	_pCellTree._apply_setfocus = function (evt_name) {
	};

	_pCellTree.on_create_contents = function () {
		this._createLines(true);
		this._createCheckbox(true);
		this._createImage(true);
		this._createButton(true);
		this._createText(true);
	};

	_pCellTree._createLines = function (bCreateOnly) {
		if (!this._view || !this._view.treeuseline) {
			return;
		}

		if (!this._rightline_ctrl) {
			this._rightline_ctrl = new nexacro._CellTreeLineControl("treerightline", 0, 0, 0, 0, null, null, this.parent);
			this._childctrl_setevent(this._rightline_ctrl);
			this._rightline_ctrl.createComponent(bCreateOnly);
		}
		if (!this._upline_ctrl) {
			this._upline_ctrl = new nexacro._CellTreeLineControl("treeupline", 0, 0, 0, 0, null, null, this.parent);
			this._childctrl_setevent(this._upline_ctrl);
			this._upline_ctrl.createComponent(bCreateOnly);
		}
		if (!this._downline_ctrl) {
			this._downline_ctrl = new nexacro._CellTreeLineControl("treedownline", 0, 0, 0, 0, null, null, this.parent);
			this._childctrl_setevent(this._downline_ctrl);
			this._downline_ctrl.createComponent(bCreateOnly);
		}
	};

	_pCellTree._createCheckbox = function (bCreateOnly) {
		if (!this._view && !this._view.treeusecheckbox) {
			return;
		}

		if (!this._chk_ctrl) {
			this._chk_ctrl = new nexacro[this._checkboxObj]("treeitemcheckbox", 0, 0, 0, 0, this);
			this._childctrl_setevent(this._chk_ctrl);
			this._chk_ctrl._getCheckValue = function () {
				var cellinfo = this._cellinfo;
				var cellobj = this._cellobj;
				var datarow = cellobj._getDataRow();

				if (cellinfo.treecheck._bindtype > 0) {
					return cellinfo._getAttrValue(cellinfo.treecheck, datarow);
				}
				else {
					return this._view._treeChecked[datarow];
				}
			};
			if (nexacro._enableaccessibility) {
				this._chk_ctrl.accessibilityenable = false;
			}
			this._chk_ctrl.createComponent(bCreateOnly);
		}
	};

	_pCellTree._createImage = function (bCreateOnly) {
		if (!this._view || !this._view.treeuseimage) {
			return;
		}

		if (!this._img_ctrl) {
			this._img_ctrl = new nexacro._TreeItemIconControl("treeitemimage", 0, 0, 0, 0, null, null, this);
			this._childctrl_setevent(this._img_ctrl);

			if (nexacro._enableaccessibility) {
				this._img_ctrl.accessibilityenable = false;
			}

			this._img_ctrl.createComponent(bCreateOnly);
		}
	};

	_pCellTree._createButton = function (bCreateOnly) {
		this._btnimg_ctrl = new nexacro._TreeItemIconControl("treeitembutton", 0, 0, 0, 0, null, null, this);
		this._childctrl_setevent(this._btnimg_ctrl);

		if (nexacro._enableaccessibility) {
			this._btnimg_ctrl.accessibilityenable = false;
		}

		this._btnimg_ctrl.createComponent(bCreateOnly);
	};

	_pCellTree._createText = function (bCreateOnly) {
		this._text_ctrl = new nexacro._TreeItemTextControl("treeitemtext", 0, 0, 0, 0, null, null, null, null, null, null, this);
		this._text_ctrl._setControl();
		this._childctrl_setevent(this._text_ctrl);
		this._text_ctrl.createComponent(bCreateOnly);
	};

	_pCellTree._childctrl_setevent = function (obj) {
		obj.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
			var clickitem = this.id;

			if (clickitem == "treeitemtext" || clickitem == "treeitemimage") {
				clickitem = "";
			}

			return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		};

		obj.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
			var clickitem = this.id;

			if (clickitem == "treeitemtext" || clickitem == "treeitemimage") {
				clickitem = "";
			}

			return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		};

		obj._on_last_lbuttonup = function () {
			return this.parent._on_last_lbuttonup();
		};
	};

	_pCellTree.on_created_contents = function (win) {
		var leftlines = this._leftline_ctrls;

		for (var i = 0, n = leftlines.length; i < n; i++) {
			leftlines[i].on_created(win);
		}

		if (this._rightline_ctrl) {
			this._rightline_ctrl.on_created(win);
		}

		if (this._upline_ctrl) {
			this._upline_ctrl.on_created(win);
		}

		if (this._downline_ctrl) {
			this._downline_ctrl.on_created(win);
		}

		if (this._btnimg_ctrl) {
			this._btnimg_ctrl.on_created(win);
		}

		if (this._chk_ctrl) {
			this._chk_ctrl.on_created(win);
		}

		if (this._img_ctrl) {
			this._img_ctrl.on_created(win);
		}

		if (this._text_ctrl) {
			this._text_ctrl.on_created(win);
		}

		this._is_created = true;
	};

	_pCellTree.on_attach_contents_handle = _pCellTree.on_created_contents;

	_pCellTree.on_destroy_contents = function () {
		var leftlines = this._leftline_ctrls;

		for (var i = 0, n = leftlines.length; i < n; i++) {
			leftlines[i].destroy();
		}

		this._leftline_ctrls = null;

		if (this._rightline_ctrl) {
			this._rightline_ctrl.destroy();
			this._rightline_ctrl = null;
		}
		if (this._upline_ctrl) {
			this._upline_ctrl.destroy();
			this._upline_ctrl = null;
		}
		if (this._downline_ctrl) {
			this._downline_ctrl.destroy();
			this._downline_ctrl = null;
		}
		if (this._btnimg_ctrl) {
			this._btnimg_ctrl.destroy();
			this._btnimg_ctrl = null;
		}
		if (this._chk_ctrl) {
			this._chk_ctrl.destroy();
			this._chk_ctrl = null;
		}
		if (this._img_ctrl) {
			this._img_ctrl.destroy();
			this._img_ctrl = null;
		}
		if (this._text_ctrl) {
			this._text_ctrl.destroy();
			this._text_ctrl = null;
		}

		this._clicktarget = null;
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellTree.on_apply_text = function () {
		var text_ctrl = this._text_ctrl;

		if (text_ctrl) {
			text_ctrl.set_text(this._displaytext);
		}
	};

	_pCellTree.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
	};

	_pCellTree.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
	};

	_pCellTree._isEditTypeTree = function () {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var datarow = cellobj._getDataRow();
		var editType = cellinfo._getEdittype(datarow);

		return (editType == "tree");
	};

	_pCellTree._getLineHeight = function () {
		var height = this.parent._adjust_height;
		var border = this.parent._getCurrentStyleBorder();
		var bordbottom = (border) ? border.bottom._width : 0;
		return height - bordbottom;
	};

	_pCellTree._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellTree._load_image = function (img_ctrl, image) {
		var val = (image) ? image.toString() : null;

		if (this.getElement() && val) {
			val = nexacro._getURIValue(val);
			val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());
			img_ctrl._load_url = val;

			var size = nexacro._getImageSize(val, this._on_loadImage, this);

			if (size) {
				this._on_loadImage(val, size.width, size.height);
			}
		}
	};

	_pCellTree._on_loadImage = function (url, imgW, imgH) {
		var adjust = false;
		if (this._btnimg_ctrl && this._btnimg_ctrl._load_url == url) {
			var width = this._btnimg_ctrl._adjust_width;
			var height = this._btnimg_ctrl._adjust_height;

			if (width != imgW || height != imgH) {
				adjust = true;
				this._btnimg_ctrl.move(this._btnimg_ctrl._adjust_left, this._btnimg_ctrl._adjust_top, imgW, imgH);
			}
		}

		if (this._img_ctrl && this._img_ctrl._load_url == url) {
			var width = this._img_ctrl._adjust_width;
			var height = this._img_ctrl._adjust_height;

			if (width != imgW || height != imgH) {
				adjust = true;
				this._img_ctrl.move(this._img_ctrl._adjust_left, this._img_ctrl._adjust_top, imgW, imgH);
			}
		}

		if (adjust) {
			this._adjustSubCompAlign(this._lvl);
		}
	};

	_pCellTree._changeTreeStatus = function (changestatus, value) {
		this._userstatus = changestatus;

		if (this._img_ctrl) {
			this._img_ctrl._changeUserStatus(changestatus, value);
		}

		if (changestatus != "leaf" && this._btnimg_ctrl) {
			this._btnimg_ctrl._changeUserStatus(changestatus, value);
		}
	};

	_pCellTree._buttonUpdate = function (state) {
		var view = this._view;
		if (view && view.treeusebutton != this._treeusebutton) {
			if (view.treeusebutton == "use") {
				this._btnimg_ctrl.set_visible(true);
			}
			else {
				this._btnimg_ctrl.set_visible(false);
			}

			this._treeusebutton = view.treeusebutton;
		}

		if (state == 2 || state == 3 || state == -1) {
			this._btnimg_ctrl.set_visible(false);
			this._btnimg_ctrl.move(this._btnimg_ctrl._adjust_left, this._btnimg_ctrl._adjust_top, 0, 0);
			return;
		}

		var datarow = this._cellobj._getDataRow();
		var val = this._btnimg_ctrl._getCSSStyleValue("icon", this._userstatus);
		this._load_image(this._btnimg_ctrl, val);
	};

	_pCellTree._checkUpdate = function (check) {
		var view = this._view;
		if (view && view.treeusecheckbox != this._treeusecheckbox) {
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(view.treeusecheckbox);
			}
			else {
				this._createCheckbox();
			}

			this._treeusecheckbox = view.treeusecheckbox;
		}

		if (this._chk_ctrl) {
			this._chk_ctrl.set_value(check);
		}
	};

	_pCellTree._imageUpdate = function (state) {
		var view = this._view;
		if (view && view.treeuseimage != this._treeuseimage) {
			if (this._img_ctrl) {
				this._img_ctrl.set_visible(view.treeuseimage);
			}
			else {
				this._createImage();
			}

			this._treeuseimage = view.treeuseimage;
		}

		if (this._img_ctrl) {
			var val = this._img_ctrl._getCSSStyleValue("icon", this._userstatus);

			this._load_image(this._img_ctrl, val);

			if (val) {
				this._img_ctrl.set_visible(view ? view.treeuseimage : true);
			}
			else {
				this._img_ctrl.set_visible(false);
			}
		}

		this._adjustSubCompAlign(this._lvl);
	};

	_pCellTree._lineUpdate = function (rowidx, level) {
		var view = this._view;

		if (view && view.treeuseline != this._treeuseline) {
			this._createLines();

			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(view.treeuseline);
			}

			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(view.treeuseline);
			}

			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(view.treeuseline);
			}

			this._treeuseline = view.treeuseline;
		}

		var startlevel = this._cellinfo._getTreeStartLevel(rowidx);
		var bExistNextNode = (view && view._hasSameNextNode[rowidx]) ? view._hasSameNextNode[rowidx][1] : false;
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

	_pCellTree._createLeftLine = function (rowidx) {
		var view = this._view;

		if (!view || !view.treeuseline) {
			for (var i = 0, n = this._leftline_ctrls.length; i < n; i++) {
				this._leftline_ctrls[i].destroy();
			}
			this._leftline_ctrls = [];

			return;
		}

		var level = this._cellinfo._getTreeLevel(rowidx);
		var startlevel = this._cellinfo._getTreeStartLevel(rowidx);
		var parentlevel = level - 1;
		var bExistNextParentNode;
		var i = 0;
		var leftlines = this._leftline_ctrls;

		while (view._rootlevel < parentlevel) {
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

	_pCellTree._toggleItem = function (bHide, state) {
		var view = this._view;

		if (!view || bHide) {
			if (this._btnimg_ctrl) {
				this._btnimg_ctrl.set_visible(false);
			}
			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(false);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(false);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(false);
			}
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(false);
			}
			if (this._img_ctrl) {
				this._img_ctrl.set_visible(false);
			}
			if (this._text_ctrl) {
				this._text_ctrl.set_visible(false);
			}
		}
		else {
			if (view.treeusebutton == "use") {
				this._btnimg_ctrl.set_visible(true);
			}
			else {
				this._btnimg_ctrl.set_visible(false);
			}

			if (state == 2 || state == 3 || state == -1) {
				this._btnimg_ctrl.set_visible(false);
				this._btnimg_ctrl.move(this._btnimg_ctrl._adjust_left, this._btnimg_ctrl._adjust_top, 0, 0);
			}

			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(view.treeuseline);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(view.treeuseline);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(view.treeuseline);
			}
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(view.treeusecheckbox);
			}
			if (this._img_ctrl) {
				this._img_ctrl.set_visible(view.treeuseimage);
			}
			if (this._text_ctrl) {
				this._text_ctrl.set_visible(true);
			}
		}
	};

	_pCellTree.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();
		var datarow = this._cellobj._getDataRow();
		this.tooltiptext = this._cellinfo._getTooltipText(datarow);

		if (control_elem) {
			control_elem.setElementToolTip(this.tooltiptext);
		}
	};

	_pCellTree._treeline_visible = function (v) {
		if (v) {
			for (var i = 0, n = this._leftline_ctrls.length; i < n; i++) {
				this._leftline_ctrls[i]._control_element.setElementVisible(this._leftline_ctrls[i].visible);
			}

			if (this._rightline_ctrl) {
				this._rightline_ctrl._control_element.setElementVisible(this._rightline_ctrl.visible);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl._control_element.setElementVisible(this._upline_ctrl.visible);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl._control_element.setElementVisible(this._downline_ctrl.visible);
			}
		}
		else {
			for (var i = 0, n = this._leftline_ctrls.length; i < n; i++) {
				this._leftline_ctrls[i]._control_element.setElementVisible(false);
			}

			if (this._rightline_ctrl) {
				this._rightline_ctrl._control_element.setElementVisible(false);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl._control_element.setElementVisible(false);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl._control_element.setElementVisible(false);
			}
		}
	};

	_pCellTree.on_apply_prop_cssclass = function () {
		if (this._chk_ctrl) {
			this._chk_ctrl.on_apply_cssclass();
		}
		if (this._text_ctrl) {
			this._text_ctrl.on_apply_cssclass();
		}
	};

	_pCellTree._updateAll = function (onlycontents) {
		if (this.getElement()) {
			var view = this._view;
			var cellobj = this._cellobj;
			var rowidx = cellobj._getDataRow();
			var stats = 1;
			var check = 0;
			var level = 0;

			if (view) {
				stats = view._getTreeStats(rowidx);
				check = view._getTreeCheck(rowidx);
				level = view._getTreeLevel ? view._getTreeLevel(rowidx) : this._cellinfo._getTreeLevel(rowidx);
			}

			if (rowidx == null || rowidx == -9) {
				this._toggleItem(true, stats);
				return;
			}
			else {
				this._toggleItem(false, stats);
			}

			if (!onlycontents) {
				this._apply_status(cellobj._oldstatus, cellobj._status, cellobj._olduserstatus, cellobj._userstatus);
			}

			this._lvl = level;

			if (stats == 0) {
				this._changeTreeStatus("collapse", true);
			}
			else if (stats == 1) {
				this._changeTreeStatus("expand", true);
			}
			else if (stats >= 2) {
				this._changeTreeStatus("leaf", true);
			}

			this._buttonUpdate(stats);
			this._lineUpdate(rowidx, level);
			this._checkUpdate(check);
			this._imageUpdate(stats);

			var txt = this.parent._getDisplayText();
			if (this._displaytext != txt) {
				this._text_ctrl.set_text(txt);
				this._displaytext = txt;
			}

			this.on_apply_prop_tooltip();
			this._adjustSubCompAlign(level);
		}
	};

	_pCellTree._adjustSubCompAlign = function (level) {
		var cellobj = this.parent;
		var cellinfo = this._cellinfo;
		var rect = cellobj._getControlRect();

		var width = rect.width;
		var height = rect.height;
		var datarow = cellobj._getDataRow();
		var start = cellinfo._getTreeStartLevel(datarow);
		var defaultsize = 9;
		var gap = 16;
		var parentlevel = level - 1;

		level -= start;

		if (level < 0) {
			level = 0;
		}

		var line_adjust_top = cellobj._adjust_top;
		var padding = cellobj._getCurrentStylePadding();
		var line_adjust_left = ((padding) ? padding.left : 0);
		var parentheight = this._getLineHeight();
		var offset = (level * gap) + defaultsize;
		var lineleft = offset;
		var linetop = line_adjust_top;
		var linewidth = 0;
		var halfheight = (parentheight / 2);
		var lineheight = halfheight;
		var left_lines = this._leftline_ctrls;
		var left_lines_len = left_lines.length;
		var j = 0;

		for (var i = 0; j < left_lines_len; i++) {
			if (parentlevel == left_lines[j]._depth) {
				var elem = left_lines[j++].getElement();
				elem.setElementPosition(offset - (gap * (i + 1)) + line_adjust_left, linetop);
			}

			if (parentlevel-- < 0) {
				break;
			}
		}

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

			var buttonLeft = offset - (buttonWidth / 2);

			if (buttonLeft < 0) {
				buttonWidth = buttonWidth + buttonLeft;
				buttonLeft = offset - (defaultsize / 2);
			}

			if (!this._rightline_ctrl || !this._rightline_ctrl.visible) {
				buttonLeft -= ((buttonWidth / 2) * level);
			}

			var buttonTop = ((height - buttonHeight) / 2);

			if (this._btnimg_ctrl.visible) {
				lineheight = ((parentheight - buttonHeight) / 2);
				line_button_gap_width = buttonWidth;
				line_button_gap_height = buttonHeight;
				offset = buttonLeft + buttonWidth;
			}
			else {
				offset = lineleft;
			}

			linewidth = buttonWidth;
			this._btnimg_ctrl.move(buttonLeft, buttonTop, buttonWidth, buttonHeight);
		}
		else {
			linewidth = defaultsize;
		}

		if (this._rightline_ctrl && this._rightline_ctrl.visible) {
			this._rightline_ctrl.move(offset + line_adjust_left, linetop, linewidth - (line_button_gap_width / 2), halfheight);
			offset = this._rightline_ctrl.left + this._rightline_ctrl.width - line_adjust_left;
		}
		else {
			offset += 1;
		}

		if (this._upline_ctrl && this._upline_ctrl.visible) {
			this._upline_ctrl.move(lineleft + line_adjust_left, linetop, linewidth, lineheight);
		}

		if (this._downline_ctrl && this._downline_ctrl.visible) {
			var elem = this._downline_ctrl.getElement();
			linetop = line_adjust_top + lineheight + line_button_gap_height;

			var b = lineheight + linetop;
			var pb = parentheight + line_adjust_top;

			if (b > pb) {
				lineheight = pb - linetop;
			}

			this._downline_ctrl.move(lineleft + line_adjust_left, linetop, linewidth, lineheight);
		}

		if (this._chk_ctrl && this._chk_ctrl.visible) {
			var checkWidth = this._chk_ctrl.width;
			var checkHeight = this._chk_ctrl.height;
			var checkLeft = offset;
			var checkTop = ((height - checkHeight) / 2);

			offset += checkWidth;
			this._chk_ctrl.move(checkLeft, checkTop, checkWidth, checkHeight);
		}

		if (this._img_ctrl && this._img_ctrl.visible) {
			offset += 1;

			var imageWidth = this._img_ctrl._adjust_width;
			var imageHeight = this._img_ctrl._adjust_height;
			if (imageWidth > 0 && imageHeight > 0) {
				var imageLeft = offset;
				var imageTop = ((height - imageHeight) / 2);
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

	_pCellTree._setAlign = function (halign, valign) {
		if (halign) {
			this._text_ctrl.set_textAlign(halign);
		}
		if (valign) {
			this._text_ctrl.set_verticalAlign(valign);
		}
	};

	_pCellTree.on_change_containerRect = function (width, height) {
		if (this._lvl) {
			this._adjustSubCompAlign(this._lvl);
		}
	};

	_pCellTree._setAccessibilityStatFocus = function (evt_name) {
		var tmp_label = "";
		var cellobj = this._cellobj;
		var label = cellobj._getCellAccessibilityLabel();
		label = label.trim();
		this._setAccessibilityLabel(label);

		var datarow = cellobj._getDataRow();
		var level = this._cellinfo._getTreeLevel(datarow);
		var startlevel = this._cellinfo._getTreeStartLevel(datarow);

		if (cellobj._getTreeStatus() == 0) {
			if (this._text_ctrl) {
				this._text_ctrl._setAccessibilityStatExpanded(false);
			}
		}
		else {
			if (this._text_ctrl) {
				this._text_ctrl._setAccessibilityStatExpanded(true);
			}
		}

		this._setAccessibilityInfoLevel(level - startlevel + 1);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pCellTree.on_get_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	nexacro._TreeItemIconControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro._Icon.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
	};

	var _pTreeItemIcon = nexacro._createPrototype(nexacro._Icon, nexacro._TreeItemIconControl);
	nexacro._TreeItemIconControl.prototype = _pTreeItemIcon;
	_pTreeItemIcon._is_subcontrol = true;
	_pTreeItemIcon._type_name = "TreeItemIconControl";

	_pTreeItemIcon.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
		return changestatus;
	};
	nexacro._TreeItemTextControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Static.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
	};
	var _pTreeItemTextControl = nexacro._createPrototype(nexacro.Static, nexacro._TreeItemTextControl);
	nexacro._TreeItemTextControl.prototype = _pTreeItemTextControl;

	nexacro._CellTreeLineControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);

		this.tabstop = false;
		this._is_simple_control = true;
		this._is_nc_control = true;
		this._view = parent._view;
		this._depth = -1;
		this._showleft = false;
		this._showbottom = false;
	};

	var _pCellTreeLine = nexacro._createPrototype(nexacro.Component, nexacro._CellTreeLineControl);
	nexacro._CellTreeLineControl.prototype = _pCellTreeLine;
	_pCellTreeLine._is_subcontrol = true;
	_pCellTreeLine._type_name = "CellTreeLineControl";

	_pCellTreeLine.on_destroy_contents = function () {
		this._view = null;
	};

	_pCellTreeLine._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellTreeLine._set_line = function (left, bottom) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._showleft = left;
			this._showbottom = bottom;
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
	};

	_pCellTreeLine._on_apply_status = function (oldstatus, status, olduserstatus, userstatus) {
		nexacro.Component.prototype._on_apply_status(this, oldstatus, status, olduserstatus, userstatus);

		var remove_l = false, remove_t = false, remove_r = false, remove_b = false;

		if (this.id == "treerightline") {
			remove_l = true;
			remove_r = true;
			remove_t = true;
		}
		else if (this.id == "treeleftline" || this.id == "treeupline" || "treedownline") {
			remove_r = true;
			remove_t = true;
			remove_b = true;
		}

		if (!this._showbottom) {
			remove_b = true;
		}
		if (!this._showleft) {
			remove_l = true;
		}

		this._control_element.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
	};

	_pCellTreeLine.on_getIDCSSSelector = function () {
		return "celltreeline";
	};

	delete _pCellControl;
	delete _pSubCellControl;
	delete _pCellExpand;
	delete _pCellButton;
	delete _pCellBar;
	delete _pCellEdit;
	delete _pCellTextArea;
	delete _pCellMaskEdit;
	delete _pCellCalendar;
	delete _pCellCombo;
	delete _pCellCheckboxBase;
	delete _pCellCheckbox;
	delete _pCellImage;
	delete _pCellTree;
	delete _pTreeItemIcon;
	delete _pTreeItemTextControl;
	delete _pCellTreeLine;
}
