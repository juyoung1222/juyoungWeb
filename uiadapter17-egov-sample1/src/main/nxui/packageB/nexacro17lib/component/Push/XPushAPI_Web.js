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

if (nexacro._Browser != "Runtime") {
	if (!nexacro._isHybrid()) {
		nexacro._XPushController = function (control) {
			this.linkedcontrol = control;

			this.layoutlist = [];
		};

		var _pXPushController = nexacro._createPrototype(nexacro.Object, nexacro._XPushController);
		nexacro._XPushController.prototype = _pXPushController;

		_pXPushController.handle = null;
		_pXPushController._ajax = null;

		_pXPushController.userid = "";
		_pXPushController.sessionid = "";
		_pXPushController.ip_idx = 0;
		_pXPushController.keepalivetime = 30;
		_pXPushController.retry_cnt = 1;
		_pXPushController.control_retry_cnt = 1;
		_pXPushController._is_connected = false;
		_pXPushController._do_disconnect = false;

		_pXPushController.action = null;
		_pXPushController.msg_type = null;
		_pXPushController.msg_key = null;
		_pXPushController.type = null;

		_pXPushController._serverkeylist = [];

		_pXPushController.setXPushAsync = nexacro._emptyFn;
		_pXPushController.setXPushControlRetry = nexacro._emptyFn;
		_pXPushController.setXPushKeepTimeout = nexacro._emptyFn;
		_pXPushController.setXPushTimeout = nexacro._emptyFn;
		_pXPushController.setXPushDebug = nexacro._emptyFn;
		_pXPushController.setXPushRetry = nexacro._emptyFn;
		_pXPushController.resumeXPush = nexacro._emptyFn;
		_pXPushController.suspendXPush = nexacro._emptyFn;

		_pXPushController.create = nexacro._emptyFn;

		_pXPushController.destroy = function () {
			var handle = this.handle;
			if (handle) {
				handle.sockjsDisconnect();
			}
			this._destroy_handle();
			this._destroy_layout();

			this.linkedcontrol = null;
			this._serverkeylist = [];
		};

		_pXPushController._destroy_layout = function () {
			if (this._ajax) {
				if (this._ajax._destroy) {
					this._ajax._destroy();
				}
				this._ajax = null;
			}
		};

		_pXPushController._destroy_handle = function () {
			if (this.handle) {
				this.handle._destroy();
				delete this.handle;
				this.handle = null;
			}
		};

		_pXPushController.setXPushLayoutURL = function (layouturl) {
			var comp = this.linkedcontrol;
			var url = layouturl;
			if (url.substring(0, 4).toLowerCase() == "url(") {
				url = url.substring(5, url.length - 2);
			}

			var form = comp._findForm(comp.parent);
			if (form) {
				if (url.indexOf("%") < 0) {
					layouturl = nexacro._getServiceLocation(url, form._getRefFormBaseUrl());
				}
			}

			var i, j, k;
			var z, y, x;

			var pThis = this;
			var _ajax = this._ajax;
			if (_ajax) {
				this._destroy_layout();

				var layoutlist = this.layoutlist;
				for (i = 0, z = layoutlist.length; i < z; i++) {
					layoutlist[i].listfield = [];
				}

				this.layoutlist = [];
			}

			_ajax = nexacro.__createHttpRequest();
			_ajax.handle.onreadystatechange = function (e) {
				if (this.readyState >= 4) {
					var xml = _ajax.handle.responseXML;
					if (xml) {
						var rootnode;
						if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
							rootnode = xml.childNodes[1];
						}
						else {
							rootnode = xml.childNodes[0];
						}

						if (rootnode.nodeName != "message_layout") {
							return false;
						}

						var svcid = null;
						var nokey = false;
						var repeat = false;
						var noreg = false;

						var attr, fieldnode;
						var check_idx = 0;
						var layout, field;

						var childnodes = rootnode.childNodes;
						for (i = 0, z = childnodes.length; i < z; i++) {
							if (childnodes[i].nodeName == "#text") {
								continue;
							}

							attr = childnodes[i].attributes;
							for (j = 0, y = attr.length; j < y; j++) {
								if (!svcid && attr[j].nodeName == "id" || attr[j].nodeName == "type") {
									svcid = attr[j].nodeValue;
								}
								else if (attr[j].nodeName == "key") {
									nokey = attr[j].nodeValue;
								}
								else if (attr[j].nodeName == "repeat") {
									repeat = attr[j].nodeValue;
								}
								else if (attr[j].nodeName == "noreg") {
									noreg = nexacro._toBoolean(attr[j].nodeValue);
								}
							}

							fieldnode = childnodes[i];
							y = fieldnode.childNodes.length;
							if (y > 0) {
								layout = function () {
									return {
										"id" : svcid, 
										"nokey" : nokey, 
										"repeat" : repeat, 
										"noreg" : noreg, 
										"checkfieldidx" : -1, 
										"listfield" : []
									};
								}();

								for (j = 0; j < y; j++) {
									if (fieldnode.childNodes[j].nodeName == "#text") {
										continue;
									}

									field = function () {
										return {
											"id" : null, 
											"type" : null, 
											"size" : 0, 
											"key" : false, 
											"check" : false
										};
									}();

									attr = fieldnode.childNodes[j].attributes;
									for (k = 0, x = attr.length; k < x; k++) {
										if (attr[k].nodeName == "id") {
											field.id = attr[k].nodeValue;
										}
										if (attr[k].nodeName == "type") {
											field.type = attr[k].nodeValue;
										}
										if (attr[k].nodeName == "size") {
											field.type = parseInt(attr[k].nodeValue);
										}
										if (attr[k].nodeName == "key") {
											field.key = nexacro._toBoolean(attr[k].nodeValue);
										}
										if (attr[k].nodeName == "check") {
											if (nexacro._toBoolean(attr[k].nodeValue)) {
												field.check = true;
												layout.checkfieldidx = check_idx;
											}
										}
									}

									layout.listfield.push(field);
									check_idx++;
								}

								pThis.layoutlist.push(layout);
							}
						}
					}
					else {
						pThis._on_error(-703);
						return false;
					}
				}
			};

			try {
				_ajax.handle.open("GET", layouturl, false);
			}
			catch (e) {
				pThis._on_error(-703);
				_ajax = null;

				return false;
			}
			_ajax.handle.send("");
		};

		_pXPushController.connectXPush = function (userid, sessionid) {
			var comp = this.linkedcontrol;

			comp._getrandomipinfo();
			comp._resetIPList();

			this.userid = userid;
			this.sessionid = sessionid;

			this._connect();
		};

		_pXPushController.disconnectXPush = function () {
			var handle = this.handle;
			if (handle) {
				this._do_disconnect = true;
				handle.sockjsDisconnect();
			}
			else {
				this._on_error(-401, "BYEC");
			}

			this._is_connected = false;
		};

		_pXPushController.sendResponseXPush = function (msgid) {
			var commandcontrol = new nexacro.CommandControl("RECT", msgid);
			this.commandXPush(commandcontrol);
		};

		_pXPushController.requestMessageXPush = function (type, keys) {
			var handle = this.handle;
			if (handle) {
				var i, n;
				var commandcontrol = new nexacro.CommandControl("REQD", type);
				for (i = 0, n = keys.length; i < n; i++) {
					commandcontrol.messagekey = keys[i];
					this.commandXPush(commandcontrol);
				}
			}
		};

		_pXPushController.fireErrorEventXPush = function () {
			this._on_error(-701);
		};

		_pXPushController.FindKey = function (strMessageType, strMessageKey) {
			var rtn = [-1, -1];
			for (var i = 0, n = this._serverkeylist.length; i < n; i++) {
				var tmpServerKey = this._serverkeylist[i];
				if (tmpServerKey.type == strMessageType) {
					rtn[0] = i;
					for (var j = 0, tmpKeyList = tmpServerKey.keys.split(","), m = tmpKeyList.length; j < m; j++) {
						var tmpKey = tmpKeyList[j];
						if (tmpKey == strMessageKey) {
							rtn[1] = j;
							break;
						}
					}
					break;
				}
			}
			return rtn;
		};

		_pXPushController.AddServerKey = function (strMessageType, strMessageKey) {
			var serverKey = {
				"type" : strMessageType, 
				"keys" : strMessageKey
			};
			var key = this.FindKey(strMessageType, strMessageKey);
			if (key[0] == -1) {
				this._serverkeylist.push(serverKey);
				return true;
			}
			else if (key[1] == -1) {
				var tmpServerKey = this._serverkeylist[key[0]];
				tmpServerKey.keys += "," + strMessageKey;
				return true;
			}

			return false;
		};

		_pXPushController.DelServerKey = function (strMessageType, strMessageKey) {
			var key = this.FindKey(strMessageType, strMessageKey);
			if (key[0] > -1 && key[1] > -1) {
				var tmpServerKey = this._serverkeylist[key[0]];
				var tmpKeyList = tmpServerKey.keys.split(",");

				tmpKeyList.splice(key[1], 1);
				tmpServerKey.keys = tmpKeyList.join(",");

				if (tmpKeyList.length == 0) {
					this._serverkeylist.splice(key[0], 1);
				}
				return true;
			}

			return false;
		};

		_pXPushController.commandXPush = function (commandcontrol) {
			var comp = this.linkedcontrol;
			var handle = this.handle;
			if (handle) {
				var command = commandcontrol.actiontype;
				var messagetype = commandcontrol.messagetype;
				var messagekey = commandcontrol.messagekey;
				var type = commandcontrol.type;
				var userid = commandcontrol.userid || this.userid;

				if (command == "keepalive") {
					handle.sockjsKeepalive();
				}
				else {
					if (command == "ADDF") {
						if (!this.AddServerKey(messagetype, messagekey)) {
							this._on_error(-701);
							return false;
						}

						var idx = this._find_layout(messagetype);
						if (idx < 0) {
							this._on_error(-703);
							return false;
						}

						if (type == "update" || type == "allupdate") {
							if (!this._hasKey(messagetype)) {
								this._on_error(-703);
								return false;
							}
						}
					}
					else if (command == "DELF") {
						if (!this.DelServerKey(messagetype, messagekey)) {
							this._on_error(-701);
							return false;
						}

						var idx = this._find_layout(messagetype);
						if (idx < 0) {
							this._on_error(-703);
							return false;
						}
						else {
							if (this.layoutlist[idx].noreg) {
								return true;
							}
						}
					}

					this.action = command;
					this.msg_type = messagetype;
					this.msg_key = messagekey;
					this.type = type;

					handle.sockjsCommand(command, messagetype, messagekey, userid);
				}
			}
			else if (!handle || !this._is_connected || parseInt(comp.controlretry) < this.control_retry_cnt) {
				this.control_retry_cnt = 1;

				var conv_code = comp._geterrorcode(commandcontrol.actiontype);

				this._on_error(conv_code, commandcontrol.actiontype, commandcontrol.messagetype, commandcontrol.messagekey);
			}
		};

		_pXPushController._find_layout = function (id) {
			var layoutlist = this.layoutlist;
			var layoutlist_len = layoutlist.length;
			for (var i = 0; i < layoutlist_len; i++) {
				var layout = layoutlist[i];
				if (layout.id == id) {
					return i;
				}
			}

			return -1;
		};

		_pXPushController._hasKey = function (messagetype) {
			var idx = this._find_layout(messagetype);
			if (idx == -1) {
				this._on_error(-703);
				return false;
			}

			var layoutlist = this.layoutlist;
			var layout = layoutlist[idx];
			if (layout.id == messagetype) {
				var i, n, field;
				var listfield = layout.listfield;
				var key = false;

				for (i = 0, n = listfield.length; i < n; i++) {
					field = listfield[i];
					key = field.key;
					if (key) {
						break;
					}
				}

				if (!key) {
					this._on_error(-703);
					return false;
				}

				if (layout.noreg) {
					return false;
				}
			}

			return true;
		};

		_pXPushController._connect = function () {
			var comp = this.linkedcontrol;
			if (this._is_connected) {
				this._on_error(-302, "AUTH");
				return;
			}

			this._destroy_handle();

			var ip_idx = this.ip_idx;
			var ip_list = comp.iplist;
			var ip_list_len = ip_list ? ip_list.length : 0;
			if (ip_list && ip_idx >= ip_list_len) {
				this.retry_cnt++;
				ip_idx = 0;

				if ((parseInt(comp.retry) + 1) < this.retry_cnt) {
					this.ip_idx = 0;
					this.retry_cnt = 1;
					this._on_error(-201, "AUTH");
					return;
				}
			}

			var i;
			var skip = true;
			for (i = ip_idx; i < ip_list_len; i++) {
				if (ip_list[i].type == "http") {
					skip = false;
					break;
				}
			}

			ip_idx = i;

			if (skip) {
				this.ip_idx = ip_idx;
				this._on_error(-201);
				return;
			}

			comp._currentipinfo = ip_list[ip_idx];

			var ip = (ip == "localhost") ? "127.0.0.1" : comp.iplist[ip_idx].ip;
			var sockjs_url = "http://" + ip + ":" + comp.iplist[ip_idx].port + "/XPUSH";
			var sock_type = (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 9) ? ["xdr-streaming", "iframe-htmlfile"] : ["websocket"];
			var push_debug = comp.debug;
			var jsessionid = (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) ? true : false;
			var options = {
				transports : sock_type, 
				debug : push_debug, 
				jsessionid : jsessionid
			};

			this.handle = new nexacro.SockJSWrapper(sockjs_url, [], options, this.userid, this.sessionid, this);

			this.ip_idx = ip_idx;
			this._do_disconnect = false;
		};

		_pXPushController._message = function (msg_data) {
			var action = msg_data.Action;
			var result = msg_data.Result;
			var msg = msg_data.Message;

			var comp = this.linkedcontrol;

			if (msg_data == 1006) {
				this._on_error(-100);
				return;
			}

			if (msg_data == 1002) {
				this.ip_idx++;
				this._on_error(-300, "AUTH");

				this._connect();

				return;
			}
			else if (result == "NG" && action == "AUTH") {
				this._on_error(-202, "AUTH");
				return;
			}

			if (result != "OK" && (action == "ADUI" || action == "RGST" || action == "UNUI")) {
				if (action == "ADUI") {
					this._on_error(-1092, action, msg_data.TopicType, msg_data.TopicId);
				}
				else if (action == "RGST") {
					this._on_error(-1072, action);
				}
				else if (action == "UNUI") {
					this._on_error(-1003, action, msg_data.TopicType, msg_data.TopicId);
				}
				return;
			}

			var conv_action = comp ? comp._getaction(action) : -1;
			if (action == "BYEC") {
				this._destroy_handle();

				this.ip_idx = 0;
				this._is_connected = false;

				if (this._do_disconnect) {
					this._on_success(2, conv_action);
				}
				else {
					this._on_error(-100);
				}
			}
			else if (action == "KEEP") {
				this._on_keepalive(2);
			}
			else if (action == "AUTH") {
				this.control_retry_cnt = 1;
				this.retry = 1;
				this._is_connected = true;

				this._on_success(1, conv_action);
			}
			else if (action == "PUSH" || action == "RELI") {
				this.control_retry_cnt = 1;

				var idx = this._find_layout(msg_data.TopicType);
				if (idx == -1) {
					this._on_error(-703);
					return;
				}

				if (action == "RELI" && this.handle) {
					this.handle.sockjsAckn(msg_data.MessageID);
				}

				var layout = this.layoutlist[idx];
				var datalist = [];
				var data = {
				};

				var listfield = layout.listfield;
				var field = listfield[0];
				data.id = field.id;
				data.item = msg_data.TopicId;
				data.key = field.key;
				var checkfield = field.check;

				if (layout.checkfieldidx == 0) {
					checkfield = data.item;
				}
				else if (layout.checkfieldidx > 0) {
					checkfield = msg[layout.checkfieldidx - 1];
				}

				data.checkfield = checkfield;

				datalist.push(data);

				var data_val = "";
				var data_size = (msg_data.TopicType ? msg_data.TopicType.length : 0) + (msg_data.TopicId ? msg_data.TopicId.length : 0);
				var msg_len = msg.length;
				for (i = 0; i < msg_len; i++) {
					data = {
					};

					data_val = data_val + " " + msg[i];

					field = listfield[i + 1];
					if (!field) {
						continue;
					}

					data.id = field.id;
					data.item = msg[i];

					data.key = field.key;
					data.checkfield = checkfield;
					datalist.push(data);
				}

				data_size += data_val.length;

				var recvObj = {
				};
				recvObj.type = msg_data.TopicType;
				recvObj.datalist = datalist;
				recvObj.action = action;
				if (msg_data.MessageID) {
					recvObj.msgid = msg_data.MessageID;
				}


				this._on_keepalive(0);

				if (comp && comp.debug) {
					trace("SIZE:" + data_size + " CMD:" + action + " RECV Data:" + data_val);
				}


				this._on_xpush(recvObj);
			}
			else if (result == "OK") {
				this.control_retry_cnt = 1;

				var reason = 0;
				if (action == "MSGC") {
					var msgc_list = [];
					var msgc_len = msg_data.MsgcList.length;
					for (var i = 0; i < msgc_len; i++) {
						var msgcList = {
						};
						msgcList.topictype = msg_data.MsgcList[i].type;
						msgcList.topicid = msg_data.MsgcList[i].id;
						msgcList.count = msg_data.MsgcList[i].count;

						msgc_list.push(msgcList);
					}

					this._on_success(9, conv_action, action, this.msg_type, this.msg_key, msgc_list);

					msgc_list = [];

					return;
				}
				else if (action == "REQD") {
					reason = 6;
				}
				else if (action == "RECT") {
					this._on_success(5, conv_action, action, msg_data.MessageID, msg_data.TopicId);
					return;
				}

				this._on_success(reason, conv_action, action, msg_data.TopicType, msg_data.TopicId);
			}
			else if (result == "NG") {
				if (action == this.action && 
					msg_data.TopicType == this.msg_type && 
					msg_data.TopicId == this.msg_key) {
					this.control_retry_cnt++;
					this.commandXPush(this.action, this.msg_type, this.msg_key, this.type);
				}
			}
		};

		_pXPushController._on_xpush = function (recvObj) {
			var comp = this.linkedcontrol;
			if (comp) {
				comp._on_xpush(recvObj);
			}
		};

		_pXPushController._on_success = function (reason, action, classtype, messagetype, messagekey, returnvalue) {
			var comp = this.linkedcontrol;
			if (comp) {
				comp._on_success(reason, action, classtype, messagetype, messagekey, returnvalue);
			}
		};

		_pXPushController._on_error = function (errorcode, classtype, messagetype, messagekey) {
			var comp = this.linkedcontrol;
			if (comp) {
				comp._on_error(errorcode, classtype, messagetype, messagekey);
			}
		};

		_pXPushController._on_keepalive = function (type) {
			var comp = this.linkedcontrol;
			if (comp) {
				comp._on_keepalive(type);
			}
		};

		nexacro.SockJSWrapper = function (url, protocols, options, userid, sessionid, controller) {
			SockJS.call(this, url, protocols, options);

			this.userid = userid;
			this.sessionid = sessionid;
			this.interval_id = -1;

			this._xpush_controller = controller;
		};

		var _pSockJSWrapper = nexacro._createPrototype(SockJS, nexacro.SockJSWrapper);
		nexacro.SockJSWrapper.prototype = _pSockJSWrapper;

		_pSockJSWrapper._destroy = function () {
			clearInterval(this.interval_id);
		};

		_pSockJSWrapper.sockjsKeepalive = function () {
			var cmd = {
				Action : 'KEEP'
			};
			this.send(JSON.stringify(cmd));
		};

		_pSockJSWrapper.sockjsDisconnect = function () {
			clearInterval(this.interval_id);

			var cmd = {
				Action : 'BYEC'
			};
			this.send(JSON.stringify(cmd));
		};

		_pSockJSWrapper.sockjsAckn = function (messagetype) {
			var cmd = {
				Action : 'ACKN', 
				'UserID' : this.userid, 
				'MessageID' : messagetype
			};
			this.send(JSON.stringify(cmd));
		};

		_pSockJSWrapper.sockjsCommand = function (command, messagetype, messagekey, userid) {
			var cmd;
			if (command == "ADDF" || command == "DELF") {
				cmd = {
					'Action' : command, 
					'TopicType' : messagetype, 
					'TopicId' : messagekey
				};
			}
			else if (command == "MSGC") {
				cmd = {
					'Action' : command, 
					'UserID' : userid, 
					'TopicType' : messagetype, 
					'TopicId' : messagekey
				};
			}
			else if (command == "RECT") {
				cmd = {
					'Action' : command, 
					'UserID' : userid, 
					'MessageID' : messagetype
				};
			}
			else if (command == "RGST" || command == "UNRG") {
				return;
			}
			else {
				cmd = {
					'Action' : command, 
					'UserID' : userid, 
					'TopicType' : messagetype, 
					'TopicId' : messagekey
				};
			}

			this.send(JSON.stringify(cmd));
		};

		_pSockJSWrapper.onopen = function () {
			var AUTH = {
				'Action' : 'AUTH', 
				'ID' : this.userid, 
				'PW' : this.sessionid
			};
			this.send(JSON.stringify(AUTH));

			g_sockjs = this;
			if (g_sockjs) {
				g_sockjs.sockjsKeepalive();
			}

			this.interval_id = setInterval(function () {
				if (g_sockjs) {
					g_sockjs.sockjsKeepalive();
				}
			}, (this._xpush_controller.keepalivetime * 1000));
		};

		_pSockJSWrapper.onmessage = function (e) {
			var obj = JSON.parse(e.data);

			var xpush = this._xpush_controller;
			if (xpush) {
				xpush._message(obj);
			}
		};

		_pSockJSWrapper.onerror = nexacro._emptyFn;

		_pSockJSWrapper.onclose = function (e) {
			var xpush = this._xpush_controller;
			if (xpush) {
				xpush._is_connected = false;

				if (e.code == 1002 || e.code == 1006) {
					xpush._message(e.code);
				}
			}
		};
	}
	else {
		nexacro._XPushController = function (control) {
			this.linkedcontrol = control;

			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = control;

			var params = '""';
			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"constructor", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		};

		var _pXPushController = nexacro._createPrototype(nexacro.Object, nexacro._XPushController);
		nexacro._XPushController.prototype = _pXPushController;

		_pXPushController.handle = null;

		_pXPushController.retry = 1;
		_pXPushController.controlretry = 5;
		_pXPushController.layouturl = "";
		_pXPushController.keepalivetime = 30;
		_pXPushController.timeout = 30;
		_pXPushController.keeptimeout = 60;
		_pXPushController.debug = false;

		_pXPushController.create = nexacro._emptyFn;

		_pXPushController.destroy = function () {
			delete nexacro.Device._userCreatedObj[this._id];

			var params = '""';
			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"destroy", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		};

		_pXPushController.setXPushAsync = nexacro._emptyFn;

		_pXPushController.setXPushControlRetry = function (v) {
			this.controlretry = v;
		};

		_pXPushController.setXPushDebug = function (v) {
			this.debug = v;
		};

		_pXPushController.setXPushKeepAliveTime = function (v) {
			this.keepalivetime = v;
		};

		_pXPushController.setXPushKeepTimeout = function (v) {
			this.keeptimeout = v;
		};

		_pXPushController.setXPushTimeout = function (v) {
			this.timeout = v;
		};

		_pXPushController.setXPushLayoutURL = function (v) {
			var comp = this.linkedcontrol;
			var form = comp._findForm(comp.parent);

			if (v.substring(0, 9).toLowerCase() == "%userapp%") {
				this.layouturl = v;
			}
			else {
				if (comp) {
					this._on_error(-703);
					return false;
				}
			}

			var params = '{ "layouturl":"' + this.layouturl + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"setLayoutUrl", "params":' + params + '}';

			nexacro.Device.exec(jsonstr);
		};

		_pXPushController.setXPushRetry = function (v) {
			this.retry = v;
		};

		_pXPushController.connectXPush = function (userid, sessionid) {
			if (nexacro.Device.publicNumCheck(this.retry)) {
				if (this.retry >= 0) {
					retry_Cnt = Number(this.retry);
				}
			}

			var comp = this.linkedcontrol;

			var params = '{ "strUserID":"' + userid;
			params += '", "strSessionID":"' + sessionid;
			params += '", "iplist":' + JSON.stringify(comp.iplist);
			params += ', "retry":"' + retry_Cnt;
			params += '", "controlretry":"' + this.controlretry;
			params += '", "layouturl":"' + this.layouturl;
			params += '", "keepalivetime":"' + this.keepalivetime;
			params += '", "keeptimeout":"' + this.keeptimeout;
			params += '", "timeout":"' + this.timeout;
			params += '", "commandlist":' + JSON.stringify(comp.commandlist);
			params += '}';
			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"connect", "params":' + params + '}';

			nexacro.Device.exec(jsonstr);
		};

		_pXPushController.disconnectXPush = function () {
			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"disconnect", "params":""}';

			var comp = this.linkedcontrol;
			if (comp) {
				comp.commandlist.length = 0;
			}

			nexacro.Device.exec(jsonstr);
		};

		_pXPushController.sendResponseXPush = function (msgid) {
			var params = '{"msgid":"' + msgid + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"sendResponse", "params":' + params + '}';

			nexacro.Device.exec(jsonstr);
		};

		_pXPushController.requestMessageXPush = function (type, keys) {
			var messagekeyStr = "";
			var i, n;
			for (i = 0, n = keys.length; i < n; i++) {
				if (i > 1) {
					messagekeyStr += ",\"" + (keys[i]) + "\"";
				}
				else {
					messagekeyStr += "\"" + (keys[i]) + "\"";
				}
			}

			var params = '{"messagetype":"' + type + '", "messagekeys":[' + messagekeyStr + ']}';
			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"requestMessage", "params":' + params + '}';

			nexacro.Device.exec(jsonstr);
		};

		_pXPushController.fireErrorEventXPush = function () {
			this._on_error(-701);
		};

		_pXPushController.commandXPush = function (commandcontrol) {
			var params = "";
			var command = commandcontrol.actiontype;

			if (command == "ADDF") {
				var type = commandcontrol.type;
				params = '{"type":"' + type.toLowerCase() + '","parameters":' + JSON.stringify(commandcontrol) + '}';
			}
			else {
				params = JSON.stringify(commandcontrol);
			}

			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method": "' + command + '", "params":' + params + '}';

			nexacro.Device.exec(jsonstr);
		};

		_pXPushController._on_xpush = function (data) {
			var comp = this.linkedcontrol;
			if (comp) {
				var convData = eval("(" + data + ")");
				comp._on_xpush(convData.recvdata);
			}
		};

		_pXPushController._on_success = function (objData) {
			var comp = this.linkedcontrol;
			if (comp) {
				if (comp._currentipinfo == null) {
					comp._currentipinfo = [];
				}
				comp._currentipinfo.ip = objData.serverip;
				comp._currentipinfo.port = objData.serverport;
				comp._on_success(objData.reason, objData.action, objData.classtype, objData.messagetype, objData.messagekey, objData.returnvalue);
			}
		};

		_pXPushController._on_error = function (objData) {
			var comp = this.linkedcontrol;
			if (comp) {
				if (typeof (objData) == "object") {
					if (comp._currentipinfo == null) {
						comp._currentipinfo = [];
					}
					comp._currentipinfo.ip = objData.serverip;
					comp._currentipinfo.port = objData.serverport;
					comp._on_error(objData.errorcode, objData.classtype, objData.messagetype, objData.messagekey);
				}
				else {
					comp._on_error(arguments[0], arguments[1]);
				}
			}
		};

		_pXPushController._on_keepalive = function (objData) {
			var comp = this.linkedcontrol;
			if (comp) {
				comp._on_keepalive(objData.type);
			}
		};
	}
}
