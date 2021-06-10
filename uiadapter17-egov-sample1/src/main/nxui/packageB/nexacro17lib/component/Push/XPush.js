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

if (!nexacro.XPush) {
	nexacro.XPushEventInfo = function (eventid, action, serverip, serverport, pushmessageobject) {
		this.eventid = eventid;

		this.action = action;
		this.message = pushmessageobject;
		this.serverip = serverip;
		this.serverport = serverport;

		if (pushmessageobject && pushmessageobject.returnvalue != undefined && pushmessageobject.returnvalue[0] != undefined) {
			this.returnvalue = pushmessageobject.returnvalue[0].count;
		}
		else {
			this.returnvalue = null;
		}
	};

	var _pXPushEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.XPushEventInfo);
	nexacro.XPushEventInfo.prototype = _pXPushEventInfo;
	_pXPushEventInfo._type_name = "XPushEventInfo";

	delete _pXPushEventInfo;
	_pXPushEventInfo = null;

	nexacro.XPushErrorEventInfo = function (eventid, action, errormsg, serverip, serverport, statuscode, pushmessageobject) {
		this.eventid = eventid;

		this.action = action;
		this.errormsg = errormsg;
		this.errortype = "ObjectError";
		this.message = pushmessageobject;
		this.serverip = serverip;
		this.serverport = serverport;
		this.statuscode = statuscode;
		this.reply = null;
	};

	var _pXPushErrorEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.XPushErrorEventInfo);
	nexacro.XPushErrorEventInfo.prototype = _pXPushErrorEventInfo;
	_pXPushErrorEventInfo._type_name = "XPushErrorEventInfo";

	delete _pXPushErrorEventInfo;
	_pXPushErrorEventInfo = null;

	nexacro.XPushKeepAliveEventInfo = function (eventid, type) {
		this.eventid = eventid;
		this.type = type;
	};

	var _pXPushKeepAliveEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.XPushKeepAliveEventInfo);
	nexacro.XPushKeepAliveEventInfo.prototype = _pXPushKeepAliveEventInfo;
	_pXPushKeepAliveEventInfo._type_name = "XPushKeepAliveEventInfo";

	delete _pXPushErrorEventInfo;
	_pXPushErrorEventInfo = null;

	nexacro.CommandControl = function (strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack, strUserID) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;

		this.actiontype = strCommand;
		this.callback = strCallBack;
		this.check = strCheck ? strCheck : "0";
		this.messagekey = strMessageKey;
		this.messagetype = strMessageType;
		this.objdataset = objDataset;
		this.objform = objForm;
		this.row = nexacro._isNull(nRow) ? -1 : nRow;
		this.type = strType ? strType : "update";
		this.useactiveformcallback = bUseActiveFormCallBack ? nexacro._toBoolean(bUseActiveFormCallBack) : false;
		this.userid = strUserID ? strUserID : "";
	};

	var _pCommandControl = nexacro.CommandControl.prototype = nexacro._createPrototype(nexacro.EventSinkObject);
	_pCommandControl._type_name = "CommandControl";

	_pCommandControl.destroy = function () {
	};
	_pCommandControl.on_created = function () {
	};

	_pCommandControl.equal = function (other) {
		if (this.callback != other.callback) {
			return false;
		}
		if (this.check != other.check) {
			return false;
		}
		if (this.messagekey != other.messagekey) {
			return false;
		}
		if (this.messagetype != other.messagetype) {
			return false;
		}

		if (this.objdataset !== other.objdataset) {
			return false;
		}
		if (this.objform !== other.objform) {
			return false;
		}

		if (this.row != other.row) {
			return false;
		}
		if (this.type != other.type) {
			return false;
		}
		if (this.useactiveformcallback != other.useactiveformcallback) {
			return false;
		}
		if (this.userid != other.userid) {
			return false;
		}

		return true;
	};

	_pCommandControl.toJSON = function (idx) {
		return eval('({"_id":"' + this._id + '","messagetype":"' + this.messagetype + '","messagekey":"' + this.messagekey + '"})');
	};

	_pCommandControl.remove = function (idx) {
		return (idx < 0 || idx > this.length) ? this : this.slice(0, idx).concat(this.slice(idx + 1, this.length));
	};

	_pCommandControl = null;
	delete _pCommandControl;

	nexacro.PushMessage = function (strMessageId, strMessageType, strMessageKey, retVal) {
		this.messageid = strMessageId || "";
		this.messagetype = strMessageType || "";
		this.messagekey = strMessageKey || "";
		this.returnvalue = retVal || "";
	};

	var _pPushMessage = nexacro.PushMessage.prototype = nexacro._createPrototype(nexacro.EventSinkObject);
	_pPushMessage._type_name = "PushMessage";

	_pPushMessage = null;
	delete _pPushMessage;

	nexacro.XPush = function (id, parent) {
		this.id = this.name = id;
		if (parent) {
			this.parent = parent;
		}

		this._xpush_controller = new nexacro._XPushController(this);
		this._xpush_controller.create();
		this.commandlist = [];
		this.iplist = [];
	};

	var _pXPush = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.XPush);
	nexacro.XPush.prototype = _pXPush;
	_pXPush._type_name = "XPush";


	_pXPush.enableevent = true;
	_pXPush.async = true;
	_pXPush.controlretry = 5;
	_pXPush.debug = false;
	_pXPush.errorcode;
	_pXPush.errormsg;
	_pXPush.keepalivetime = 30;
	_pXPush.keeptimeout = 60;
	_pXPush.layouturl = "";
	_pXPush.retry = 1;
	_pXPush.sessionid = "";
	_pXPush.timeout = 30;
	_pXPush.userid = "";


	_pXPush._connectSuccess = false;
	_pXPush._registerDeviceSuccess = false;
	_pXPush._currentipinfo = null;


	_pXPush._event_list = {
		"onsuccess" : 1, 
		"onerror" : 1, 
		"onkeepalive" : 1
	};


	_pXPush.set_commandlist = nexacro._emptyFn;
	_pXPush.set_errorcode = nexacro._emptyFn;
	_pXPush.set_errormsg = nexacro._emptyFn;


	nexacro.XPushAction.AUTH = 0;
	nexacro.XPushAction.BYEC = 1;
	nexacro.XPushAction.ADDF = 2;
	nexacro.XPushAction.DELF = 3;
	nexacro.XPushAction.REQD = 4;
	nexacro.XPushAction.RECT = 5;
	nexacro.XPushAction.RGST = 6;
	nexacro.XPushAction.UNRG = 7;
	nexacro.XPushAction.ADUI = 8;
	nexacro.XPushAction.UNUI = 9;
	nexacro.XPushAction.MSGC = 10;

	_pXPush.on_created = function () {
	};

	_pXPush.destroy = function () {
		if (this._xpush_controller) {
			this._xpush_controller.destroy();
		}
		this._xpush_controller = null;

		if (this.parent) {
			this.parent.removeChild(this.id);
		}
		this.parent = null;

		nexacro._EventSinkObject.prototype.destroy.call(this);
	};

	_pXPush._findForm = function (comp) {
		var form = comp;
		while (form && form._is_form == false) {
			form = form.parent;
		}
		return form;
	};

	_pXPush._getWindow = function () {
		var form = this.parent;
		if (form._is_form) {
			return form._getWindow();
		}
		return null;
	};

	_pXPush.set_name = function (v) {
		this.id = this.name = v;
	};

	_pXPush.set_enableevent = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enableevent != v) {
			this.enableevent = v;
		}
	};

	_pXPush.set_async = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		this.async = v;

		this.on_apply_async();
		return true;
	};

	_pXPush.on_apply_async = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush.setXPushAsync(this.async);
		}
	};

	_pXPush.set_controlretry = function (v) {
		v = parseInt(v);
		if (v === undefined || v === null || !nexacro._isNumber(v) || v < 0) {
			v = 5;
		}

		if (this.controlretry != v) {
			this.controlretry = v;
		}

		this.on_apply_controlretry();
	};

	_pXPush.on_apply_controlretry = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush.setXPushControlRetry(this.controlretry);
		}
	};

	_pXPush.set_debug = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		if (this.debug != v) {
			this.debug = v;
		}

		this.on_apply_debug();
	};

	_pXPush.on_apply_debug = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush.setXPushDebug(this.debug);
		}
	};

	_pXPush.set_iplist = function (v) {
		var len = this.iplist.length;
		if (len > 0) {
			this.iplist.splice(0, len);
		}

		if (v === "undefined" || v === null || v === "") {
		}
		else {
			if (v.indexOf(",") >= 0) {
				var ipinfolist = v.split(",");
				if (ipinfolist.length > 0) {
					for (var i = 0; i < ipinfolist.length; i++) {
						var trim_ipinfolist = ipinfolist[i];
						trim_ipinfolist = trim_ipinfolist.replace(/(^\s*)|(\s*$)/gi, "");
						var temp = trim_ipinfolist.split(":");
						var ipinfo = {
						};

						if (temp[0] == "tcp" || temp[0] == "http") {
							if ((!this._isWebPush() && temp[0] == "http") || (this._isWebPush() && temp[0] == "tcp")) {
								continue;
							}

							ipinfo.type = temp[0];
							ipinfo.ip = temp[1].split("//")[1];
							ipinfo.port = temp[2].valueOf();
						}
						else {
							if (this._isWebPush()) {
								continue;
							}

							ipinfo.type = "tcp";
							ipinfo.ip = temp[0];
							ipinfo.port = temp[1].valueOf();
						}

						ipinfo.retry = false;
						this.iplist.push(ipinfo);
					}
				}
			}
			else {
				var temp = v.replace(/(^\s*)|(\s*$)/gi, "");
				temp = temp.split(":");
				var ipinfo = {
				};

				if (temp[0] == "tcp" || temp[0] == "http") {
					ipinfo.type = temp[0];
					ipinfo.ip = temp[1].split("//")[1];
					ipinfo.port = temp[2].valueOf();
				}
				else {
					ipinfo.type = "tcp";
					ipinfo.ip = temp[0];
					ipinfo.port = temp[1].valueOf();
				}

				ipinfo.retry = false;
				this.iplist.push(ipinfo);
			}
		}
		return true;
	};

	_pXPush.set_keepalivetime = function (v) {
		v = parseInt(v);
		if (v === undefined || v === null || !nexacro._isNumber(v) || v < 0) {
			v = 30;
		}

		if (this.keepalivetime != v) {
			this.keepalivetime = v;
		}

		this.on_apply_keepalivetime();
	};

	_pXPush.on_apply_keepalivetime = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush.setXPushKeepAliveTime(this.keepalivetime);
		}
	};

	_pXPush.set_keeptimeout = function (v) {
		v = parseInt(v);
		if (v === undefined || v === null || !nexacro._isNumber(v) || v <= 0) {
			v = 60;
		}

		if (this.keeptimeout != v) {
			this.keeptimeout = v;
		}

		this.on_apply_keeptimeout();
	};

	_pXPush.on_apply_keeptimeout = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush.setXPushKeepTimeout(this.keeptimeout);
		}
	};

	_pXPush.set_layouturl = function (v) {
		if (v === undefined || v === null) {
			v = "";
		}

		if (this.layouturl != v) {
			this.layouturl = v;
		}

		this.on_apply_layouturl();
	};

	_pXPush.on_apply_layouturl = function () {
		var layouturl = this.layouturl;
		if (layouturl != "") {
			var xpush = this._xpush_controller;
			if (xpush) {
				xpush.setXPushLayoutURL(layouturl);
			}
		}
	};

	_pXPush.set_retry = function (v) {
		v = parseInt(v);
		if (v === undefined || v === null || !nexacro._isNumber(v) || v < 0) {
			v = 1;
		}

		if (this.retry != v) {
			this.retry = v;
		}

		this.on_apply_retry();
	};

	_pXPush.on_apply_retry = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush.setXPushRetry(this.retry);
		}
	};

	_pXPush.set_timeout = function (v) {
		v = parseInt(v);
		if (v === undefined || v === null || !nexacro._isNumber(v) || v <= 0) {
			v = 30;
		}

		if (this.timeout != v) {
			this.timeout = v;
		}

		this.on_apply_timeout;
	};

	_pXPush.on_apply_timeout = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush.setXPushTimeout(this.timeout);
		}
	};

	_pXPush.set_userid = function (v) {
		if (v === undefined || v === null) {
			v = "";
		}

		if (this.userid != v) {
			this.userid = v;
		}
	};

	_pXPush.set_sessionid = function (v) {
		if (v === undefined || v === null) {
			v = "";
		}

		if (this.sessionid != v) {
			this.sessionid = v;
		}
	};

	_pXPush.subscribe = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (nexacro._isNull(objForm) || nexacro._isNull(objDataset) || 
				strMessageType === undefined || strMessageType === null || strMessageType === "" || 
				strMessageKey === undefined || strMessageKey === null || strMessageKey === "" || 
				strType === undefined || strType === null || strType == "" || 
				strCallBack === undefined || strCallBack === null || strCallBack == "") {
				xpush.fireErrorEventXPush();
				return;
			}

			strType = strType.toLowerCase();
			if (strType != "append" && strType != "update" && strType != "insert" && strType != "replace" && strType != "allupdate") {
				xpush.fireErrorEventXPush();
				return;
			}

			strCallBack = strCallBack.toString();
			if (!objForm[strCallBack]) {
				xpush.fireErrorEventXPush();
				return;
			}

			var i, n;
			var item;
			var commandlist = this.commandlist;
			var commandcontrol = new nexacro.CommandControl("ADDF", strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
			for (i = 0, n = commandlist.length; i < n; i++) {
				item = commandlist[i];
				if (item.equal(commandcontrol)) {
					break;
				}
			}
			if (i == n) {
				commandlist.push(commandcontrol);
			}

			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.unsubscribe = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (nexacro._isNull(objForm) || nexacro._isNull(objDataset) || 
				strMessageType === undefined || strMessageType === null || strMessageType === "" || 
				strMessageKey === undefined || strMessageKey === null || strMessageKey === "" || 
				strType === undefined || strType === null || strType == "" || 
				strCallBack === undefined || strCallBack === null || strCallBack == "") {
				xpush.fireErrorEventXPush();
				return;
			}

			strType = strType.toLowerCase();
			if (strType != "append" && strType != "update" && strType != "insert" && strType != "replace" && strType != "allupdate") {
				xpush.fireErrorEventXPush();
				return;
			}

			strCallBack = strCallBack.toString();
			if (!objForm[strCallBack]) {
				xpush.fireErrorEventXPush();
				return;
			}

			var commandcontrol = new nexacro.CommandControl("DELF", strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack);

			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.registerDevice = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (!this._connectSuccess) {
				xpush._on_error(-1001, "RGST");
				return;
			}

			var commandcontrol = new nexacro.CommandControl("RGST");

			this.commandlist.push(commandcontrol);
			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.unregisterDevice = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (!this._connectSuccess) {
				xpush._on_error(-1001, "UNRG");
				return;
			}

			var commandcontrol = new nexacro.CommandControl("UNRG");

			this.commandlist.push(commandcontrol);
			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.registerTopic = function (strMessageType, strMessageKey) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (!this._connectSuccess) {
				this._onerror(-1002, "ADUI");
				return;
			}

			var commandcontrol = new nexacro.CommandControl("ADUI", strMessageType, strMessageKey);

			this.commandlist.push(commandcontrol);
			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.unregisterTopic = function (strMessageType, strMessageKey) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (!this._connectSuccess) {
				this._onerror(-1003, "UNUI");
				return;
			}

			var commandcontrol = new nexacro.CommandControl("UNUI", strMessageType, strMessageKey);

			this.commandlist.push(commandcontrol);
			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.requestMessageCount = function (strMessageType, strMessageKey) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (!this._connectSuccess) {
				xpush._on_error(-1004, "MSGC");
				return;
			}

			var commandcontrol = new nexacro.CommandControl("MSGC", strMessageType, strMessageKey);

			this.commandlist.push(commandcontrol);
			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.registerTopicWithUserID = function (strMessageType, strMessageKey, strUserID) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (!this._connectSuccess) {
				this._onerror(-1002, "ADUI");
				return;
			}

			var commandcontrol = new nexacro.CommandControl("ADUI", strMessageType, strMessageKey, "", "", "", "", "", "", "", strUserID);

			this.commandlist.push(commandcontrol);
			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.unregisterTopicWithUserID = function (strMessageType, strMessageKey, strUserID) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (!this._connectSuccess) {
				this._onerror(-1003, "UNUI");
				return;
			}

			var commandcontrol = new nexacro.CommandControl("UNUI", strMessageType, strMessageKey, "", "", "", "", "", "", "", strUserID);

			this.commandlist.push(commandcontrol);
			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.requestMessageCountWithUserID = function (strMessageType, strMessageKey, strUserID) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (!this._connectSuccess) {
				xpush._on_error(-1004, "MSGC");
				return;
			}

			var commandcontrol = new nexacro.CommandControl("MSGC", strMessageType, strMessageKey, "", "", "", "", "", "", "", strUserID);

			this.commandlist.push(commandcontrol);
			xpush.commandXPush(commandcontrol);
		}
	};

	_pXPush.connect = function (userid, sessionid) {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (userid == null) {
				userid = this.userid;
			}

			if (sessionid == null) {
				sessionid = this.sessionid;
			}

			xpush.connectXPush(userid, sessionid);
		}
	};

	_pXPush.disconnect = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (this._connectSuccess) {
				this._connectSuccess = false;
				xpush.disconnectXPush();
			}
			else {
				xpush._on_error(-401, "BYEC");
			}
		}
	};

	_pXPush.sendResponse = function (msgid) {
		var xpush = this._xpush_controller;
		msgid = nexacro._toString(msgid);

		if (xpush) {
			if (this._connectSuccess) {
				xpush.sendResponseXPush(msgid);
			}
			else {
				xpush._on_error(-901, "RECT");
			}
		}
	};

	_pXPush.requestMessage = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			if (this._connectSuccess) {
				if (arguments.length < 2) {
					return;
				}

				var messagetype = arguments[0];
				var messagekeys = new Array();
				for (var i = 1; i < arguments.length; i++) {
					messagekeys.push(arguments[i]);
				}
				if (messagekeys.length > 0) {
					xpush.requestMessageXPush(messagetype, messagekeys);
				}
			}
			else {
				xpush._on_error(-902, "REQD");
			}
		}
	};

	_pXPush.getCurrentIP = function () {
		if (this._currentipinfo) {
			return this._currentipinfo.ip;
		}
		return null;
	};

	_pXPush.getCurrentPort = function () {
		if (this._currentipinfo) {
			return this._currentipinfo.port;
		}
		return null;
	};

	_pXPush._onxpush = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush._on_xpush.apply(xpush, arguments);
		}
	};

	_pXPush._onsuccess = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush._on_success.apply(xpush, arguments);
		}
	};

	_pXPush._onerror = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush._on_error.apply(xpush, arguments);
		}
	};

	_pXPush._onkeepalive = function () {
		var xpush = this._xpush_controller;
		if (xpush) {
			xpush._on_keepalive.apply(xpush, arguments);
		}
	};

	_pXPush._on_xpush = function (recv) {
		var paramRow;
		var paramChangeColumns = new Array();
		var paramAllColumns = new Array();
		var paramChangeRows = new Array();
		var paramobjChangeList = new Array();
		var paramChangeRowsTemp = new Array();

		for (var j = 0; j < this.commandlist.length; j++) {
			var cc = this.commandlist[j];
			if (!cc.objdataset) {
				continue;
			}

			if (cc.messagetype == recv.type) {
				var cr = -1;
				var data_key = false;
				var datasetColIndexList = new Array();
				var datalistlen = recv.datalist.length;

				for (var dlidx = 0; dlidx < datalistlen; dlidx++) {
					var data = recv.datalist[dlidx];
					var layoutKey = data.id;
					var messageKey = data.item;
					var idx = cc.objdataset.colinfos.indexOf(data.id);
					datasetColIndexList.push(idx);

					if (data.key) {
						data_key = data.key;
					}

					if (cr == -1 && cc.type == "update") {
						cr = cc.objdataset.findRow(layoutKey, messageKey);
					}
				}

				var bfind = false;
				var callfunc = false;
				var callfunc1 = false;
				for (var dlidx = 0; dlidx < datalistlen; dlidx++) {
					var data = recv.datalist[dlidx];
					var layoutKey = data.id;
					var messageKey = data.item;
					var checkfield = data.checkfield;
					var colIdx = datasetColIndexList[dlidx];

					if (colIdx == undefined) {
						continue;
					}
					if (dlidx == 0 && messageKey != cc.messagekey) {
						break;
					}

					if (cc.type == "append") {
						if (cr == -1) {
							if (cc.messagekey == data.item) {
								cr = cc.objdataset.addRow();
								cc.objdataset.setColumn(cr, colIdx, data.item);
								paramAllColumns.push(data.id);
								paramChangeColumns.push(data.id);
							}
						}
						else {
							callfunc = true;
							cc.objdataset.setColumn(cr, colIdx, data.item);
							paramAllColumns.push(data.id);
							paramChangeColumns.push(data.id);
							paramRow = cr;
						}
						callfunc1 = true;
					}
					else if (cc.type == "insert") {
						if (cr == -1) {
							if (cc.messagekey == data.item) {
								cr = cc.objdataset.insertRow(cc.row);
								cc.objdataset.setColumn(cr, colIdx, data.item);
								paramAllColumns.push(data.id);
								paramChangeColumns.push(data.id);
							}
						}
						else {
							callfunc = true;
							cc.objdataset.setColumn(cr, colIdx, data.item);
							paramAllColumns.push(data.id);
							paramChangeColumns.push(data.id);
							paramRow = cr;
						}
						callfunc1 = true;
					}
					else if (cc.type == "replace") {
						if (cc.row < cc.objdataset.getRowCount()) {
							var value = cc.objdataset.getColumn(cc.row, colIdx);
							if (value != data.item) {
								cc.objdataset.setColumn(cc.row, colIdx, data.item);
								paramChangeColumns.push(data.id);
								paramRow = cc.row;
								callfunc = true;
							}
							callfunc1 = true;
							paramAllColumns.push(data.id);
						}
					}
					else if (cc.type == "update") {
						if (!data_key) {
							this._onerror(-703);
							break;
						}

						paramAllColumns.push(data.id);
						var value = cc.objdataset.getColumn(cr, colIdx);
						if (value != data.item) {
							callfunc1 = true;
							callfunc = true;

							if ((cc.check == "0") || (checkfield && checkfield == cc.check)) {
								var ret = cc.objdataset.setColumn(cr, colIdx, data.item);
								paramChangeColumns.push(data.id);
							}
						}
						paramRow = cr;
					}
					else if (cc.type == "allupdate") {
						if (!data_key) {
							this._onerror(-703);
							break;
						}

						if (paramChangeRowsTemp.length == 0) {
							for (var cr = 0; cr < cc.objdataset.getRowCount(); cr++) {
								if (messageKey == cc.objdataset.getColumn(cr, layoutKey)) {
									paramChangeRows.push(cr);
									paramChangeRowsTemp.push(cr);
									continue;
								}
							}
						}
						else {
							while (paramChangeRowsTemp.length) {
								cr = paramChangeRowsTemp.splice(0, 1);
								var value = cc.objdataset.getColumn(cr, colIdx);
								if (value != data.item) {
									if ((cc.check == "0") || (checkfield && checkfield == cc.check)) {
										cc.objdataset.setColumn(cr, colIdx, data.item);
										var change_val = cr + "," + data.id;

										paramobjChangeList.push(change_val);
									}
								}
							}
							paramChangeRowsTemp = paramChangeRows.slice();

							callfunc = true;
						}
						callfunc1 = true;
					}
				}

				if (recv.action == "RELI" && recv.msgid != undefined && recv.msgid != null) {
					callfunc = true;
				}
				else if (callfunc == false) {
					continue;
				}

				if (!callfunc1) {
					continue;
				}

				if ((!cc.useactiveformcallback) || (cc.useactiveformcallback && (cc.objform === _application.getActiveForm()))) {
					if (cc.type != "allupdate") {
						var callbackFn = cc.objform[cc.callback];
						if (callbackFn instanceof Function) {
							callbackFn.call(cc.objform, paramRow, paramChangeColumns.join(), paramAllColumns.join(), "DATA", recv.action, recv.msgid);
							paramChangeRows.splice(0, paramChangeRows.length);
							paramAllColumns.splice(0, paramAllColumns.length);
						}
					}
					else if (cc.type == "allupdate") {
						var callbackFn = cc.objform[cc.callback];
						if (callbackFn instanceof Function) {
							callbackFn.call(cc.objform, paramChangeRows.join(), null, paramobjChangeList, "DATA", recv.action, recv.msgid);
							paramChangeRows.splice(0, paramChangeRows.length);
							paramobjChangeList.splice(0, paramobjChangeList.length);
						}
					}
				}
			}
		}
	};

	_pXPush._on_success = function (reason, action, classtype, messagetype, messagekey, returnvalue) {
		var msg_id = "";
		var msg_type = "";
		var msg_key = "";
		var ret_val = "";

		if (action == 0) {
			this._connectSuccess = true;
		}

		if (classtype == "RECT") {
			msg_id = messagetype;
		}
		else if (classtype == "RGST") {
			if (nexacro._OS == "Android") {
				this._registerDeviceSuccess = true;
			}
		}
		else if (classtype == "MSGC") {
			msg_type = messagetype;
			msg_key = messagekey;
			ret_val = returnvalue;
		}
		else if (action == 0 || action == 1) {
		}
		else {
			msg_type = messagetype;
			msg_key = messagekey;
		}

		var pushmessageobject = null;
		if (classtype == "ADDF" || classtype == "DELF" || classtype == "REQD" || classtype == "RECT" || classtype == "ADUI" || classtype == "UNUI" || classtype == "MSGC") {
			pushmessageobject = new nexacro.PushMessage(msg_id, msg_type, msg_key, ret_val);
		}

		var command;
		var listlength = this.commandlist.length;
		var index;

		for (index = 0; index < listlength; index++) {
			command = this.commandlist[index].valueOf();

			if (command.messagetype == messagetype) {
				if (command.messagekey == messagekey && command.actiontype == classtype) {
					break;
				}
			}
		}
		if (index == listlength) {
			command = null;
		}
		if (command && (classtype == "DELF" || classtype == "ADUI" || classtype == "DELF" || classtype == "UNUI" || classtype == "MSGC" || classtype == "RGST " || classtype == "UNRG")) {
			command.actiontype = classtype;

			this.on_fire_onsuccess(action, this.getCurrentIP(), this.getCurrentPort(), pushmessageobject);
			this.commandlist.splice(index, 1);
		}
		else {
			this.on_fire_onsuccess(action, this.getCurrentIP(), this.getCurrentPort(), pushmessageobject);

			if (nexacro._OS != "iOS" && !(nexacro._isHybrid && nexacro._isHybrid())) {
				if (action == 1) {
					this._currentipinfo = null;
					this.commandlist = null;
					this.commandlist = new Array;
				}
			}
		}
	};

	_pXPush._on_error = function (errorcode, classtype, messagetype, messagekey, reply) {
		var action = this._getaction(classtype);
		var errormsg = this._geterrormsg(errorcode);

		var msg_id = "";
		var msg_type = "";
		var msg_key = "";
		var ret_val = "";

		if (classtype == "RECT") {
			msg_id = messagetype;
		}
		else {
			msg_type = messagetype;
			msg_key = messagekey;
		}

		var pushmessageobject = null;
		if (classtype == "ADDF" || classtype == "DELF" || classtype == "REQD" || classtype == "RECT" || classtype == "ADUI" || classtype == "UNUI" || classtype == "MSGC") {
			pushmessageobject = new nexacro.PushMessage(msg_id, msg_type, msg_key, ret_val);
		}

		var command;
		var listlength = this.commandlist.length;
		for (var i = 0; i < listlength; i++) {
			command = this.commandlist[i];
			if (command.messagetype == messagetype) {
				if (command.messagekey == messagekey) {
					break;
				}
			}
			command = null;
		}

		this._seterror(errorcode, errormsg);
		this.on_fire_onerror(action, errormsg, this.getCurrentIP(), this.getCurrentPort(), errorcode, pushmessageobject, reply);
	};

	_pXPush._on_keepalive = function (type) {
		this.on_fire_onkeepalive(type);
	};

	_pXPush.on_fire_onsuccess = function (action, ip, port, pushmessageobject) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			var evt = new nexacro.XPushEventInfo("onsuccess", action, ip, port, pushmessageobject);
			return this.onsuccess._fireEvent(this, evt);
		}
		return true;
	};

	_pXPush.on_fire_onerror = function (action, errormsg, ip, port, code, pushmessageobject, reply) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.XPushErrorEventInfo("onerror", action, errormsg, ip, port, code, pushmessageobject, reply);
			return this.onerror._fireEvent(this, evt);
		}
		return true;
	};

	_pXPush.on_fire_onkeepalive = function (type) {
		if (this.onkeepalive && this.onkeepalive._has_handlers) {
			var evt = new nexacro.XPushKeepAliveEventInfo("onkeepalive", type);
			return this.onkeepalive._fireEvent(this, evt);
		}
	};

	_pXPush._resetIPList = function () {
		var length = this.iplist.length;
		for (var i = 0; i < length; i++) {
			if (this.iplist[i].retry) {
				this.iplist[i].retry = false;
			}
		}
	};

	_pXPush._getaction = function (action) {
		var actiontable = {
			"AUTH" : nexacro.XPushAction.AUTH, 
			"BYEC" : nexacro.XPushAction.BYEC, 
			"ADDF" : nexacro.XPushAction.ADDF, 
			"DELF" : nexacro.XPushAction.DELF, 
			"REQD" : nexacro.XPushAction.REQD, 
			"RECT" : nexacro.XPushAction.RECT, 
			"RGST" : nexacro.XPushAction.RGST, 
			"UNRG" : nexacro.XPushAction.UNRG, 
			"ADUI" : nexacro.XPushAction.ADUI, 
			"UNUI" : nexacro.XPushAction.UNUI, 
			"MSGC" : nexacro.XPushAction.MSGC, 
			"ERROR" : -1
		};

		var action_code = actiontable[action];
		return nexacro._isNull(action_code) ? -1 : action_code;
	};

	_pXPush._geterrorcode = function (action) {
		var actiontable = {
			"REQD" : -902, 
			"RECT" : -901, 
			"ADUI" : -1002, 
			"UNUI" : -1003, 
			"MSGC" : -1004
		};

		return actiontable[action] ? actiontable[action] : -701;
	};
	_pXPush._geterrormsg = function (errorcode) {
		var codetable = {
			"-100" : "object_push_send_byec", 
			"-101" : "object_push_socket_timeout", 
			"-200" : "object_push_fail_command_auth", 
			"-201" : "object_push_fail_all_command_auth", 
			"-202" : "object_push_fail_data_auth", 
			"-300" : "object_push_fail_connect", 
			"-301" : "object_push_fail_send_receive", 
			"-302" : "object_push_connected_already", 
			"-401" : "object_push_fail_disconnect", 
			"-501" : "object_push_fail_suspend", 
			"-601" : "object_push_fail_resume", 
			"-701" : "object_push_fail_command", 
			"-702" : "object_push_notfound_layouturl", 
			"-703" : "object_push_invalid_layouturl", 
			"-801" : "object_push_fail_protocol_version", 
			"-901" : "object_push_fail_rect", 
			"-902" : "object_push_fail_reqd", 
			"-1001" : "object_push_fail_rgst_unrg", 
			"-1002" : "object_push_fail_adui", 
			"-1003" : "object_push_fail_unui", 
			"-1004" : "object_push_fail_msgc", 
			"-1072" : "object_push_fail_already_device_token_exists", 
			"-1092" : "object_push_fail_already_topic_exists"
		};

		return nexacro._getErrorMessge(codetable[errorcode]);
	};

	_pXPush._getrandomipinfo = function () {
		var length = this.iplist.length;
		if (length > 0) {
			for (var i = 0; i < length; i++) {
				if (this.iplist[i].retry == false) {
					break;
				}
			}

			if (i == length) {
				return null;
			}

			var randidx;
			do {
				randidx = Math.floor((Math.random() * ((length - 1) - 0 + 1))) + 0;
			} while (this.iplist[randidx].retry);

			this.iplist[randidx].retry = true;
			this._currentipinfo = this.iplist[randidx];
			return this._currentipinfo;
		}
		return null;
	};

	_pXPush._seterror = function (errorcode, errormsg) {
		this.errorcode = errorcode;
		this.errormsg = errormsg;
	};

	_pXPush._isWebPush = function () {
		if (nexacro._Browser != "Runtime" && !nexacro.Device._isHybrid()) {
			return true;
		}
		else {
			return false;
		}
	};

	_pXPush.getObject = function (sid) {
		if (sid == undefined) {
			willrunfunc = null;
		}
		else {
			sid = sid * 1;
			var willrunfunc = nexacro.Device._userCreatedObj[sid];

			if (typeof willrunfunc == "undefined" || willrunfunc == null) {
				willrunfunc = null;
			}
		}
		return willrunfunc;
	};

	delete _pXPush;
}
