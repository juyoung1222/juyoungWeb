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

if (nexacro.MenuItem) {
}

if (nexacro.Menu) {
	var _pMenu = nexacro.Menu.prototype;

	_pMenu.createCssDesignContents = function () {
		var obj;
		obj = new Dataset("Menu_innerdataset", this.parent);
		obj._setContents("<ColumnInfo><Column id=\"idcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"captioncolumn\" type=\"STRING\" size=\"256\"/><Column id=\"levelcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"iconcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"enablecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"checkboxcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"hotkeycolumn\" type=\"STRING\" size=\"256\"/><Column id=\"userdatcolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"idcolumn\">1</Col><Col id=\"captioncolumn\">File</Col><Col id=\"levelcolumn\">0</Col><Col id=\"checkboxcolumn\">false</Col><Col id=\"hotkeycolumn\">F</Col><Col id=\"iconcolumn\">file</Col></Row><Row><Col id=\"idcolumn\">2</Col><Col id=\"captioncolumn\">New</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">false</Col><Col id=\"hotkeycolumn\">CTRL+N</Col><Col id=\"iconcolumn\">Images::new.png</Col></Row><Row><Col id=\"idcolumn\">3</Col><Col id=\"captioncolumn\">Open</Col><Col id=\"levelcolumn\">1</Col><Col id=\"hotkeycolumn\">CTRL+O</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">open</Col></Row><Row><Col id=\"idcolumn\">4</Col><Col id=\"captioncolumn\">Project</Col><Col id=\"levelcolumn\">2</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+P</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">projectopen</Col></Row><Row><Col id=\"idcolumn\">5</Col><Col id=\"captioncolumn\">File..</Col><Col id=\"levelcolumn\">2</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+F</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">fileopen</Col></Row><Row><Col id=\"idcolumn\">6</Col><Col id=\"captioncolumn\">Save</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+S</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">save</Col></Row><Row><Col id=\"idcolumn\">7</Col><Col id=\"captioncolumn\">Exit</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">false</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+E</Col><Col id=\"iconcolumn\">exit</Col></Row><Row><Col id=\"idcolumn\">8</Col><Col id=\"captioncolumn\">Edit</Col><Col id=\"levelcolumn\">0</Col><Col id=\"enablecolumn\">false</Col><Col id=\"hotkeycolumn\">E</Col><Col id=\"iconcolumn\">edit0</Col></Row><Row><Col id=\"idcolumn\">9</Col><Col id=\"captioncolumn\">Cut</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+X</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">cut</Col></Row><Row><Col id=\"idcolumn\">10</Col><Col id=\"captioncolumn\">Copy</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+C</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">copy</Col></Row><Row><Col id=\"idcolumn\">11</Col><Col id=\"captioncolumn\">Undo</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">false</Col><Col id=\"hotkeycolumn\">CTRL+U</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">undo</Col></Row><Row><Col id=\"idcolumn\">12</Col><Col id=\"captioncolumn\">View</Col><Col id=\"levelcolumn\">0</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">titlebar_icon</Col></Row><Row><Col id=\"idcolumn\">13</Col><Col id=\"captioncolumn\">1-1</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">titlebar_icon</Col></Row><Row><Col id=\"idcolumn\">14</Col><Col id=\"captioncolumn\">1-2</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">titlebar_icon</Col></Row><Row><Col id=\"idcolumn\">15</Col><Col id=\"captioncolumn\">1-2-1</Col><Col id=\"levelcolumn\">2</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">titlebar_icon</Col></Row><Row><Col id=\"idcolumn\">16</Col><Col id=\"captioncolumn\">1-2-2</Col><Col id=\"levelcolumn\">2</Col><Col id=\"iconcolumn\">titlebar_icon</Col><Col id=\"enablecolumn\">true</Col></Row><Row><Col id=\"idcolumn\">17</Col><Col id=\"captioncolumn\">1-2-2-1</Col><Col id=\"levelcolumn\">3</Col><Col id=\"iconcolumn\">titlebar_icon</Col><Col id=\"enablecolumn\">true</Col></Row></Rows>");

		this.parent.addChild(obj.name, obj);

		this.set_innerdataset("Menu_innerdataset");

		this.set_idcolumn("idcolumn");
		this.set_captioncolumn("captioncolumn");
		this.set_levelcolumn("levelcolumn");
		this.set_iconcolumn("idcolumn");
		this.set_enablecolumn("enablecolumn");
		this.set_checkboxcolumn("checkboxcolumn");
		this.set_hotkeycolumn("hotkeycolumn");
		this.set_userdatacolumn("userdatacolumn");
	};

	_pMenu.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue) {
		nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
		if (this.isPopup != true) {
			var obj = this._items[0];
			obj._changeUserStatus("selected", true);
			this._showPopup(obj);
		}
	};

	_pMenu.updatePreviewPosition = function () {
		this.setOffsetWidth(200);
		this.setOffsetHeight(30);

		if (this.isPopup != true && !this._popupmenu) {
			this._showPopup(this._items[0]);
		}
		var popupmenu = this._popupmenu;
		var len = popupmenu._items.length;
		var h = popupmenu.itemheight;
		var item_h = h ? parseInt(h._value, 10) : 20;
		var popupmenu_h = item_h * len;

		var form = this.parent;
		var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - ((this._adjust_height / 2) + (popupmenu_h / 2));

		if (this.isPopup()) {
			this._closePopup();
		}

		this.move(offset_left, offset_top);
	};

	_pMenu.destroyCssDesignContents = function () {
		if (this.isPopup()) {
			this._closePopup();
		}

		var obj = this.parent.removeChild("Menu_innerdataset");
		obj.destroy();
		obj = null;
	};

	delete _pMenu;




	var _pMenuItemControl = nexacro._MenuItemControl.prototype;
	_pMenuItemControl.createCssDesignContents = function () {
		this.set_text("ListBoxItemControl");
	};
	delete _pMenuItemControl;
}
;