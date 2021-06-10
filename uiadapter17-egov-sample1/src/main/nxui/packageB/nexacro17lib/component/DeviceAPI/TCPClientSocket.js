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

if (!nexacro.TCPClientSocket) {
	if (nexacro._Browser == "Runtime" && nexacro._OS == "Windows") {
		nexacro._createTCPClientSocket = function (obj, func_succ, func_error) {
			return nexacro.__createTCPClientSocket(obj, func_succ, func_error);
		};
		nexacro._destroyTCPClientSocket = function (obj) {
			return nexacro.__destroyTCPClientSocket(obj);
		};
		nexacro._openTCPClientSocket = function (obj, addr, port, timeout) {
			return nexacro.__openTCPClientSocket(obj, addr, port, timeout);
		};
		nexacro._closeTCPClientSocket = function (obj) {
			return nexacro.__closeTCPClientSocket(obj);
		};
		nexacro._readTCPClientSocket = function (obj, isreadline, maxsize, timeout, charset) {
			return nexacro.__readTCPClientSocket(obj, isreadline, maxsize, timeout, charset);
		};
		nexacro._writeTCPClientSocket = function (obj, data, charset) {
			return nexacro.__writeTCPClientSocket(obj, data, charset);
		};
	}
	else {
		nexacro._createTCPClientSocket = nexacro._emptyFn;
		nexacro._destroyTCPClientSocket = nexacro._emptyFn;
		nexacro._openTCPClientSocket = nexacro._emptyFn;
		nexacro._closeTCPClientSocket = nexacro._emptyFn;
		nexacro._readTCPClientSocket = nexacro._emptyFn;
		nexacro._writeTCPClientSocket = nexacro._emptyFn;
	}


	nexacro.SocketEventInfo = function (obj, id, reasonmsg, reason, bytessent, bytesremain) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = this.fromreferenceobject = obj;

		this.reasonmsg = reasonmsg;
		this.reason = reason;

		this.bytessent = bytessent;
		this.bytesremain = bytesremain;
	};
	var _pSocketEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SocketEventInfo);
	nexacro.SocketEventInfo.prototype = _pSocketEventInfo;
	_pSocketEventInfo._type_name = "SocketEventInfo";

	delete _pSocketEventInfo;
	_pSocketEventInfo = null;


	nexacro.SocketReceiveEventInfo = function (obj, id, bytesread) {
		this.id = this.eventid = id || "ondataarrived";
		this.fromobject = this.fromreferenceobject = obj;

		this.bytesread = bytesread;
	};
	var _pSocketReceiveEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SocketReceiveEventInfo);
	nexacro.SocketReceiveEventInfo.prototype = _pSocketReceiveEventInfo;
	_pSocketReceiveEventInfo._type_name = "SocketReceiveEventInfo";

	delete _pSocketReceiveEventInfo;
	_pSocketReceiveEventInfo = null;


	nexacro.SocketErrorEventInfo = function (obj, id, errormsg, statuscode) {
		this.id = this.eventid = id || "onerror";
		this.fromobject = this.fromreferenceobject = obj;

		this.errormsg = errormsg;
		this.statuscode = statuscode;
	};
	var _pSocketErrorEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SocketErrorEventInfo);
	nexacro.SocketErrorEventInfo.prototype = _pSocketErrorEventInfo;
	_pSocketErrorEventInfo._type_name = "SocketErrorEventInfo";

	delete _pSocketErrorEventInfo;
	_pSocketErrorEventInfo = null;

	nexacro.TCPClientSocket = function (id, parent) {
		this.id = this.name = id;
		if (parent) {
			this.parent = parent;
		}

		this.address = "";
		this.port = 0;
		this.isopen = false;

		this.errormsg = "";
		this.errorcode = 0;
		this._event_list = {
			"ondataarrived" : 1, 
			"onsuccess" : 1, 
			"onerror" : 1
		};

		this._handle = null;
		this.ondataarrived = null;
		this.onsuccess = null;
		this.onerror = null;

		this._handle = nexacro._createTCPClientSocket(this, this.on_success, this.on_error);
	};

	var _pTCPClientSocket = nexacro.TCPClientSocket.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.TCPClientSocket);
	_pTCPClientSocket._type_name = "TCPClientSocket";

	_pTCPClientSocket.on_created = function () {
	};

	_pTCPClientSocket.destroy = function () {
		if (this._handle) {
			nexacro._destroyTCPClientSocket(this._handle);

			this.address = "";
			this.port = 0;
			this.errormsg = "";
			this.errorcode = 0;
			this.isopen = false;
			this._handle = null;
		}

		return true;
	};

	_pTCPClientSocket.open = function (address, port, timeout) {
		if (this._handle && address && (port != undefined)) {
			var ret = nexacro._openTCPClientSocket(this._handle, address, port, timeout);
			if (ret) {
				this.address = address;
				this.port = port;
			}
			return ret;
		}
		return false;
	};

	_pTCPClientSocket.close = function () {
		if (this._handle) {
			return nexacro._closeTCPClientSocket(this._handle);
		}
		return false;
	};

	_pTCPClientSocket.read = function (size, timeout, charset) {
		if (this._handle && (size != undefined)) {
			var isreadline = false;
			return nexacro._readTCPClientSocket(this._handle, isreadline, size, timeout, charset);
		}
		return Array(false);
	};

	_pTCPClientSocket.readLine = function (maxsize, timeout, charset) {
		if (this._handle && (maxsize != undefined)) {
			var isreadline = true;
			return nexacro._readTCPClientSocket(this._handle, isreadline, maxsize, timeout, charset);
		}
		return Array(false);
	};

	_pTCPClientSocket.write = function (data, charset) {
		if (this._handle && (data != undefined)) {
			return nexacro._writeTCPClientSocket(this._handle, data, charset);
		}
		return false;
	};



	_pTCPClientSocket.on_success = function (evt_id, arg0, arg1, arg2, arg3) {
		var reasonmsg = evt_id;
		var reason;

		if (reasonmsg == "on_connect") {
			reason = 1;

			this.isopen = true;

			if (this.onsuccess && this.onsuccess._has_handlers) {
				var evt = new nexacro.SocketEventInfo(this, "onsuccess", reasonmsg, reason, undefined, undefined);
				return this.onsuccess._fireEvent(this, evt);
			}
		}
		else if (reasonmsg == "on_close") {
			reason = 2;

			this.isopen = false;

			if (this.onsuccess && this.onsuccess._has_handlers) {
				var evt = new nexacro.SocketEventInfo(this, "onsuccess", reasonmsg, reason, undefined, undefined);
				return this.onsuccess._fireEvent(this, evt);
			}
		}
		else if (reasonmsg == "on_send") {
			reason = 3;

			if (this.onsuccess && this.onsuccess._has_handlers) {
				var evt = new nexacro.SocketEventInfo(this, "onsuccess", reasonmsg, reason, arg2, arg3);
				return this.onsuccess._fireEvent(this, evt);
			}
		}
		else if (reasonmsg == "on_dataarrived") {
			return this.on_dataarrived(arg0);
		}

		return false;
	};

	_pTCPClientSocket.on_dataarrived = function (bytesread) {
		if (this.ondataarrived && this.ondataarrived._has_handlers) {
			var evt = new nexacro.SocketReceiveEventInfo(this, "ondataarrived", bytesread);
			return this.ondataarrived._fireEvent(this, evt);
		}
		return true;
	};

	_pTCPClientSocket.on_error = function (errormsg, errorcode) {
		this.errormsg = errormsg;
		this.errorcode = errorcode;

		if (errorcode == 26) {
			this.isopen = false;
		}

		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.SocketErrorEventInfo(this, "onerror", errormsg, errorcode);
			return this.onerror._fireEvent(this, evt);
		}
		return true;
	};

	delete _pTCPClientSocket;
}
