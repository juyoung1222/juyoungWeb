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
	!function (e) {
		if ("object" == typeof exports && "undefined" != typeof module) {
			module.exports = e();
		}
		else if ("function" == typeof define && define.amd) {
			define([], e);
		}
		else {
			var f;
			"undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.SockJS = e();
		}
	}(function () {
		var define, module, exports;
		return (function e (t, n, r) {
			function s (o, u) {
				if (!n[o]) {
					if (!t[o]) {
						var a = typeof require == "function" && require;
						if (!u && a) {
							return a(o, !0);
						}
						if (i) {
							return i(o, !0);
						}
						var f = new Error("Cannot find module '" + o + "'");
						throw f.code = "MODULE_NOT_FOUND", f;
					}
					var l = n[o] = {
						exports : {
						}
					};
					t[o][0].call(l.exports, function (e) {
						var n = t[o][1][e];
						return s(n ? n : e);
					}, l, l.exports, e, t, n, r);
				}
				return n[o].exports;
			}
			var i = typeof require == "function" && require;
			for (var o = 0; o < r.length; o++) {
				s(r[o]);
			}
			return s;
		}
)({
			1 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					var transportList = require('./transport-list');

					module.exports = require('./main')(transportList);

					if ('_sockjs_onload' in global) {
						setTimeout(global._sockjs_onload, 1);
					}
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"./main" : 14, 
				"./transport-list" : 16
			}], 
			2 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), Event = require('./event');


				function CloseEvent () {
					Event.call(this);
					this.initEvent('close', false, false);
					this.wasClean = false;
					this.code = 0;
					this.reason = '';
				}

				inherits(CloseEvent, Event);

				module.exports = CloseEvent;
			}, {
				"./event" : 4, 
				"inherits" : 57
			}], 
			3 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), EventTarget = require('./eventtarget');


				function EventEmitter () {
					EventTarget.call(this);
				}

				inherits(EventEmitter, EventTarget);

				EventEmitter.prototype.removeAllListeners = function (type) {
					if (type) {
						delete this._listeners[type];
					}
					else {
						this._listeners = {
						};
					}
				};

				EventEmitter.prototype.once = function (type, listener) {
					var self = this, fired = false;

					function g () {
						self.removeListener(type, g);

						if (!fired) {
							fired = true;
							listener.apply(this, arguments);
						}
					}

					this.on(type, g);
				};

				EventEmitter.prototype.emit = function () {
					var type = arguments[0];
					var listeners = this._listeners[type];
					if (!listeners) {
						return;
					}
					var l = arguments.length;
					var args = new Array(l - 1);
					for (var ai = 1; ai < l; ai++) {
						args[ai - 1] = arguments[ai];
					}
					for (var i = 0; i < listeners.length; i++) {
						listeners[i].apply(this, args);
					}
				};

				EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
				EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

				module.exports.EventEmitter = EventEmitter;
			}, {
				"./eventtarget" : 5, 
				"inherits" : 57
			}], 
			4 : [function (require, module, exports) {
				'use strict';

				function Event (eventType) {
					this.type = eventType;
				}

				Event.prototype.initEvent = function (eventType, canBubble, cancelable) {
					this.type = eventType;
					this.bubbles = canBubble;
					this.cancelable = cancelable;
					this.timeStamp = +new Date();
					return this;
				};

				Event.prototype.stopPropagation = function () {
				};
				Event.prototype.preventDefault = function () {
				};

				Event.CAPTURING_PHASE = 1;
				Event.AT_TARGET = 2;
				Event.BUBBLING_PHASE = 3;

				module.exports = Event;
			}, {
			}], 
			5 : [function (require, module, exports) {
				'use strict';



				function EventTarget () {
					this._listeners = {
					};
				}

				EventTarget.prototype.addEventListener = function (eventType, listener) {
					if (!(eventType in this._listeners)) {
						this._listeners[eventType] = [];
					}
					var arr = this._listeners[eventType];
					if (arr.indexOf(listener) === -1) {
						arr = arr.concat([listener]);
					}
					this._listeners[eventType] = arr;
				};

				EventTarget.prototype.removeEventListener = function (eventType, listener) {
					var arr = this._listeners[eventType];
					if (!arr) {
						return;
					}
					var idx = arr.indexOf(listener);
					if (idx !== -1) {
						if (arr.length > 1) {
							this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
						}
						else {
							delete this._listeners[eventType];
						}
						return;
					}
				};

				EventTarget.prototype.dispatchEvent = function () {
					var event = arguments[0];
					var t = event.type;
					var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
					if (this['on' + t]) {
						this['on' + t].apply(this, args);
					}
					if (t in this._listeners) {
						var listeners = this._listeners[t];
						for (var i = 0; i < listeners.length; i++) {
							listeners[i].apply(this, args);
						}
					}
				};

				module.exports = EventTarget;
			}, {
			}], 
			6 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), Event = require('./event');


				function TransportMessageEvent (data) {
					Event.call(this);
					this.initEvent('message', false, false);
					this.data = data;
				}

				inherits(TransportMessageEvent, Event);

				module.exports = TransportMessageEvent;
			}, {
				"./event" : 4, 
				"inherits" : 57
			}], 
			7 : [function (require, module, exports) {
				'use strict';

				var JSON3 = require('json3'), iframeUtils = require('./utils/iframe');


				function FacadeJS (transport) {
					this._transport = transport;
					transport.on('message', this._transportMessage.bind(this));
					transport.on('close', this._transportClose.bind(this));
				}

				FacadeJS.prototype._transportClose = function (code, reason) {
					iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
				};
				FacadeJS.prototype._transportMessage = function (frame) {
					iframeUtils.postMessage('t', frame);
				};
				FacadeJS.prototype._send = function (data) {
					this._transport.send(data);
				};
				FacadeJS.prototype._close = function () {
					this._transport.close();
					this._transport.removeAllListeners();
				};

				module.exports = FacadeJS;
			}, {
				"./utils/iframe" : 47, 
				"json3" : 58
			}], 
			8 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var urlUtils = require('./utils/url'), eventUtils = require('./utils/event'), JSON3 = require('json3'), FacadeJS = require('./facade'), InfoIframeReceiver = require('./info-iframe-receiver'), iframeUtils = require('./utils/iframe'), loc = require('./location');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:iframe-bootstrap');
					}

					module.exports = function (SockJS, availableTransports) {
						var transportMap = {
						};
						availableTransports.forEach(function (at) {
							if (at.facadeTransport) {
								transportMap[at.facadeTransport.transportName] = at.facadeTransport;
							}
						});

						transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
						var parentOrigin;


						SockJS.bootstrap_iframe = function () {
							var facade;
							iframeUtils.currentWindowId = loc.hash.slice(1);
							var onMessage = function (e) {
								if (e.source !== parent) {
									return;
								}
								if (typeof parentOrigin === 'undefined') {
									parentOrigin = e.origin;
								}
								if (e.origin !== parentOrigin) {
									return;
								}

								var iframeMessage;
								try {
									iframeMessage = JSON3.parse(e.data);
								}
								catch (ignored) {
									debug('bad json', e.data);
									return;
								}

								if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
									return;
								}
								switch (iframeMessage.type) {
									case 's':
										var p;
										try {
											p = JSON3.parse(iframeMessage.data);
										}
										catch (ignored) {
											debug('bad json', iframeMessage.data);
											break;
										}
										var version = p[0];
										var transport = p[1];
										var transUrl = p[2];
										var baseUrl = p[3];
										debug(version, transport, transUrl, baseUrl);
										if (version !== SockJS.version) {
											throw new Error('Incompatible SockJS! Main site uses:' + 
												' "' + version + '", the iframe:' + 
												' "' + SockJS.version + '".');
										}

										if (!urlUtils.isOriginEqual(transUrl, loc.href) || 
											!urlUtils.isOriginEqual(baseUrl, loc.href)) {
											throw new Error('Can\'t connect to different domain from within an ' + 
												'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
										}
										facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
										break;
									case 'm':
										facade._send(iframeMessage.data);
										break;
									case 'c':
										if (facade) {
											facade._close();
										}
										facade = null;
										break;
								}
							};

							eventUtils.attachEvent('message', onMessage);

							iframeUtils.postMessage('s');
						};
					};
				}).call(this, {
					env : {
					}
				});
			}, {
				"./facade" : 7, 
				"./info-iframe-receiver" : 10, 
				"./location" : 13, 
				"./utils/event" : 46, 
				"./utils/iframe" : 47, 
				"./utils/url" : 52, 
				"debug" : 54, 
				"json3" : 58
			}], 
			9 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var EventEmitter = require('events').EventEmitter, inherits = require('inherits'), JSON3 = require('json3'), objectUtils = require('./utils/object');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:info-ajax');
					}

					function InfoAjax (url, AjaxObject) {
						EventEmitter.call(this);

						var self = this;
						var t0 = +new Date();
						this.xo = new AjaxObject('GET', url);

						this.xo.once('finish', function (status, text) {
							var info, rtt;
							if (status === 200) {
								rtt = (+new Date()) - t0;
								if (text) {
									try {
										info = JSON3.parse(text);
									}
									catch (e) {
										debug('bad json', text);
									}
								}

								if (!objectUtils.isObject(info)) {
									info = {
									};
								}
							}
							self.emit('finish', info, rtt);
							self.removeAllListeners();
						});
					}

					inherits(InfoAjax, EventEmitter);

					InfoAjax.prototype.close = function () {
						this.removeAllListeners();
						this.xo.close();
					};

					module.exports = InfoAjax;
				}).call(this, {
					env : {
					}
				});
			}, {
				"./utils/object" : 49, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57, 
				"json3" : 58
			}], 
			10 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), EventEmitter = require('events').EventEmitter, JSON3 = require('json3'), XHRLocalObject = require('./transport/sender/xhr-local'), InfoAjax = require('./info-ajax');


				function InfoReceiverIframe (transUrl) {
					var self = this;
					EventEmitter.call(this);

					this.ir = new InfoAjax(transUrl, XHRLocalObject);
					this.ir.once('finish', function (info, rtt) {
						self.ir = null;
						self.emit('message', JSON3.stringify([info, rtt]));
					});
				}

				inherits(InfoReceiverIframe, EventEmitter);

				InfoReceiverIframe.transportName = 'iframe-info-receiver';

				InfoReceiverIframe.prototype.close = function () {
					if (this.ir) {
						this.ir.close();
						this.ir = null;
					}
					this.removeAllListeners();
				};

				module.exports = InfoReceiverIframe;
			}, {
				"./info-ajax" : 9, 
				"./transport/sender/xhr-local" : 37, 
				"events" : 3, 
				"inherits" : 57, 
				"json3" : 58
			}], 
			11 : [function (require, module, exports) {
				(function (process, global) {
					'use strict';

					var EventEmitter = require('events').EventEmitter, inherits = require('inherits'), JSON3 = require('json3'), utils = require('./utils/event'), IframeTransport = require('./transport/iframe'), InfoReceiverIframe = require('./info-iframe-receiver');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:info-iframe');
					}

					function InfoIframe (baseUrl, url) {
						var self = this;
						EventEmitter.call(this);

						var go = function () {
							var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

							ifr.once('message', function (msg) {
								if (msg) {
									var d;
									try {
										d = JSON3.parse(msg);
									}
									catch (e) {
										debug('bad json', msg);
										self.emit('finish');
										self.close();
										return;
									}

									var info = d[0], rtt = d[1];
									self.emit('finish', info, rtt);
								}
								self.close();
							});

							ifr.once('close', function () {
								self.emit('finish');
								self.close();
							});
						};

						if (!global.document.body) {
							utils.attachEvent('load', go);
						}
						else {
							go();
						}
					}

					inherits(InfoIframe, EventEmitter);

					InfoIframe.enabled = function () {
						return IframeTransport.enabled();
					};

					InfoIframe.prototype.close = function () {
						if (this.ifr) {
							this.ifr.close();
						}
						this.removeAllListeners();
						this.ifr = null;
					};

					module.exports = InfoIframe;
				}).call(this, {
					env : {
					}
				}, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"./info-iframe-receiver" : 10, 
				"./transport/iframe" : 22, 
				"./utils/event" : 46, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57, 
				"json3" : 58
			}], 
			12 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var EventEmitter = require('events').EventEmitter, inherits = require('inherits'), urlUtils = require('./utils/url'), XDR = require('./transport/sender/xdr'), XHRCors = require('./transport/sender/xhr-cors'), XHRLocal = require('./transport/sender/xhr-local'), XHRFake = require('./transport/sender/xhr-fake'), InfoIframe = require('./info-iframe'), InfoAjax = require('./info-ajax');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:info-receiver');
					}

					function InfoReceiver (baseUrl, urlInfo) {
						debug(baseUrl);
						var self = this;
						EventEmitter.call(this);

						setTimeout(function () {
							self.doXhr(baseUrl, urlInfo);
						}, 0);
					}

					inherits(InfoReceiver, EventEmitter);


					InfoReceiver._getReceiver = function (baseUrl, url, urlInfo) {
						if (urlInfo.sameOrigin) {
							return new InfoAjax(url, XHRLocal);
						}
						if (XHRCors.enabled) {
							return new InfoAjax(url, XHRCors);
						}
						if (XDR.enabled && urlInfo.sameScheme) {
							return new InfoAjax(url, XDR);
						}
						if (InfoIframe.enabled()) {
							return new InfoIframe(baseUrl, url);
						}
						return new InfoAjax(url, XHRFake);
					};

					InfoReceiver.prototype.doXhr = function (baseUrl, urlInfo) {
						var self = this, url = urlUtils.addPath(baseUrl, '/info');

						debug('doXhr', url);

						this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

						this.timeoutRef = setTimeout(function () {
							debug('timeout');
							self._cleanup(false);
							self.emit('finish');
						}, InfoReceiver.timeout);

						this.xo.once('finish', function (info, rtt) {
							debug('finish', info, rtt);
							self._cleanup(true);
							self.emit('finish', info, rtt);
						});
					};

					InfoReceiver.prototype._cleanup = function (wasClean) {
						debug('_cleanup');
						clearTimeout(this.timeoutRef);
						this.timeoutRef = null;
						if (!wasClean && this.xo) {
							this.xo.close();
						}
						this.xo = null;
					};

					InfoReceiver.prototype.close = function () {
						debug('close');
						this.removeAllListeners();
						this._cleanup(false);
					};

					InfoReceiver.timeout = 8000;

					module.exports = InfoReceiver;
				}).call(this, {
					env : {
					}
				});
			}, {
				"./info-ajax" : 9, 
				"./info-iframe" : 11, 
				"./transport/sender/xdr" : 34, 
				"./transport/sender/xhr-cors" : 35, 
				"./transport/sender/xhr-fake" : 36, 
				"./transport/sender/xhr-local" : 37, 
				"./utils/url" : 52, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			13 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					module.exports = global.location || {
						origin : 'http://localhost:80', 
						protocol : 'http', 
						host : 'localhost', 
						port : 80, 
						href : 'http://localhost/', 
						hash : ''
					};
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
			}], 
			14 : [function (require, module, exports) {
				(function (process, global) {
					'use strict';

					require('./shims');

					var URL = require('url-parse'), inherits = require('inherits'), JSON3 = require('json3'), random = require('./utils/random'), escape = require('./utils/escape'), urlUtils = require('./utils/url'), eventUtils = require('./utils/event'), transport = require('./utils/transport'), objectUtils = require('./utils/object'), browser = require('./utils/browser'), log = require('./utils/log'), Event = require('./event/event'), EventTarget = require('./event/eventtarget'), loc = require('./location'), CloseEvent = require('./event/close'), TransportMessageEvent = require('./event/trans-message'), InfoReceiver = require('./info-receiver');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:main');
					}

					var transports;

					function SockJS (url, protocols, options) {
						if (!(this instanceof SockJS)) {
							return new SockJS(url, protocols, options);
						}
						if (arguments.length < 1) {
							throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
						}
						EventTarget.call(this);

						this.readyState = SockJS.CONNECTING;
						this.extensions = '';
						this.protocol = '';

						options = options || {
						};
						if (options.protocols_whitelist) {
							log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
						}
						this._transportsWhitelist = options.transports;
						this._transportOptions = options.transportOptions || {
						};

						var sessionId = options.sessionId || 8;
						if (typeof sessionId === 'function') {
							this._generateSessionId = sessionId;
						}
						else if (typeof sessionId === 'number') {
							this._generateSessionId = function () {
								return random.string(sessionId);
							};
						}
						else {
							throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
						}

						this._server = options.server || random.numberString(1000);

						var parsedUrl = new URL(url);
						if (!parsedUrl.host || !parsedUrl.protocol) {
							throw new SyntaxError("The URL '" + url + "' is invalid");
						}
						else if (parsedUrl.hash) {
							throw new SyntaxError('The URL must not contain a fragment');
						}
						else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
							throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
						}

						var secure = parsedUrl.protocol === 'https:';
						if (loc.protocol === 'https' && !secure) {
							throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
						}

						if (!protocols) {
							protocols = [];
						}
						else if (!Array.isArray(protocols)) {
							protocols = [protocols];
						}

						var sortedProtocols = protocols.sort();
						sortedProtocols.forEach(function (proto, i) {
							if (!proto) {
								throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
							}
							if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
								throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
							}
						});

						var o = urlUtils.getOrigin(loc.href);
						this._origin = o ? o.toLowerCase() : null;

						parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

						this.url = parsedUrl.href;
						debug('using url', this.url);

						this._urlInfo = {
							nullOrigin : !browser.hasDomain(), 
							sameOrigin : urlUtils.isOriginEqual(this.url, loc.href), 
							sameScheme : urlUtils.isSchemeEqual(this.url, loc.href)
						};

						this._ir = new InfoReceiver(this.url, this._urlInfo);
						this._ir.once('finish', this._receiveInfo.bind(this));
					}

					inherits(SockJS, EventTarget);

					function userSetCode (code) {
						return code === 1000 || (code >= 3000 && code <= 4999);
					}

					SockJS.prototype.close = function (code, reason) {
						if (code && !userSetCode(code)) {
							throw new Error('InvalidAccessError: Invalid code');
						}
						if (reason && reason.length > 123) {
							throw new SyntaxError('reason argument has an invalid length');
						}

						if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
							return;
						}

						var wasClean = true;
						this._close(code || 1000, reason || 'Normal closure', wasClean);
					};

					SockJS.prototype.send = function (data) {
						if (typeof data !== 'string') {
							data = '' + data;
						}
						if (this.readyState === SockJS.CONNECTING) {
							throw new Error('InvalidStateError: The connection has not been established yet');
						}
						if (this.readyState !== SockJS.OPEN) {
							return;
						}
						this._transport.send(escape.quote(data));
					};

					SockJS.version = require('./version');

					SockJS.CONNECTING = 0;
					SockJS.OPEN = 1;
					SockJS.CLOSING = 2;
					SockJS.CLOSED = 3;

					SockJS.prototype._receiveInfo = function (info, rtt) {
						debug('_receiveInfo', rtt);
						this._ir = null;
						if (!info) {
							this._close(1002, 'Cannot connect to server');
							return;
						}

						this._rto = this.countRTO(rtt);
						this._transUrl = info.base_url ? info.base_url : this.url;
						info = objectUtils.extend(info, this._urlInfo);
						debug('info', info);
						var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
						this._transports = enabledTransports.main;
						debug(this._transports.length + ' enabled transports');

						this._connect();
					};

					SockJS.prototype._connect = function () {
						for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
							debug('attempt', Transport.transportName);
							if (Transport.needBody) {
								if (!global.document.body || (typeof global.document.readyState !== 'undefined' && 
									global.document.readyState !== 'complete' && 
									global.document.readyState !== 'interactive')) {
									debug('waiting for body');
									this._transports.unshift(Transport);
									eventUtils.attachEvent('load', this._connect.bind(this));
									return;
								}
							}

							var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
							this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
							debug('using timeout', timeoutMs);

							var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
							var options = this._transportOptions[Transport.transportName];
							debug('transport url', transportUrl);
							var transportObj = new Transport(transportUrl, this._transUrl, options);
							transportObj.on('message', this._transportMessage.bind(this));
							transportObj.once('close', this._transportClose.bind(this));
							transportObj.transportName = Transport.transportName;
							this._transport = transportObj;

							return;
						}
						this._close(2000, 'All transports failed', false);
					};

					SockJS.prototype._transportTimeout = function () {
						debug('_transportTimeout');
						if (this.readyState === SockJS.CONNECTING) {
							this._transportClose(2007, 'Transport timed out');
						}
					};

					SockJS.prototype._transportMessage = function (msg) {
						debug('_transportMessage', msg);
						var self = this, type = msg.slice(0, 1), content = msg.slice(1), payload;


						switch (type) {
							case 'o':
								this._open();
								return;
							case 'h':
								this.dispatchEvent(new Event('heartbeat'));
								debug('heartbeat', this.transport);
								return;
						}

						if (content) {
							try {
								payload = JSON3.parse(content);
							}
							catch (e) {
								debug('bad json', content);
							}
						}

						if (typeof payload === 'undefined') {
							debug('empty payload', content);
							return;
						}

						switch (type) {
							case 'a':
								if (Array.isArray(payload)) {
									payload.forEach(function (p) {
										debug('message', self.transport, p);
										self.dispatchEvent(new TransportMessageEvent(p));
									});
								}
								break;
							case 'm':
								debug('message', this.transport, payload);
								this.dispatchEvent(new TransportMessageEvent(payload));
								break;
							case 'c':
								if (Array.isArray(payload) && payload.length === 2) {
									this._close(payload[0], payload[1], true);
								}
								break;
						}
					};

					SockJS.prototype._transportClose = function (code, reason) {
						debug('_transportClose', this.transport, code, reason);
						if (this._transport) {
							this._transport.removeAllListeners();
							this._transport = null;
							this.transport = null;
						}

						if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
							this._connect();
							return;
						}

						this._close(code, reason);
					};

					SockJS.prototype._open = function () {
						debug('_open', this._transport.transportName, this.readyState);
						if (this.readyState === SockJS.CONNECTING) {
							if (this._transportTimeoutId) {
								clearTimeout(this._transportTimeoutId);
								this._transportTimeoutId = null;
							}
							this.readyState = SockJS.OPEN;
							this.transport = this._transport.transportName;
							this.dispatchEvent(new Event('open'));
							debug('connected', this.transport);
						}
						else {
							this._close(1006, 'Server lost session');
						}
					};

					SockJS.prototype._close = function (code, reason, wasClean) {
						debug('_close', this.transport, code, reason, wasClean, this.readyState);
						var forceFail = false;

						if (this._ir) {
							forceFail = true;
							this._ir.close();
							this._ir = null;
						}
						if (this._transport) {
							this._transport.close();
							this._transport = null;
							this.transport = null;
						}

						if (this.readyState === SockJS.CLOSED) {
							throw new Error('InvalidStateError: SockJS has already been closed');
						}

						this.readyState = SockJS.CLOSING;
						setTimeout(function () {
							this.readyState = SockJS.CLOSED;

							if (forceFail) {
								this.dispatchEvent(new Event('error'));
							}

							var e = new CloseEvent('close');
							e.wasClean = wasClean || false;
							e.code = code || 1000;
							e.reason = reason;

							this.dispatchEvent(e);
							this.onmessage = this.onclose = this.onerror = null;
							debug('disconnected');
						}.bind(this), 0);
					};

					SockJS.prototype.countRTO = function (rtt) {
						if (rtt > 100) {
							return 4 * rtt;
						}
						return 300 + rtt;
					};

					module.exports = function (availableTransports) {
						transports = transport(availableTransports);
						require('./iframe-bootstrap')(SockJS, availableTransports);
						return SockJS;
					};
				}).call(this, {
					env : {
					}
				}, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"./event/close" : 2, 
				"./event/event" : 4, 
				"./event/eventtarget" : 5, 
				"./event/trans-message" : 6, 
				"./iframe-bootstrap" : 8, 
				"./info-receiver" : 12, 
				"./location" : 13, 
				"./shims" : 15, 
				"./utils/browser" : 44, 
				"./utils/escape" : 45, 
				"./utils/event" : 46, 
				"./utils/log" : 48, 
				"./utils/object" : 49, 
				"./utils/random" : 50, 
				"./utils/transport" : 51, 
				"./utils/url" : 52, 
				"./version" : 53, 
				"debug" : 54, 
				"inherits" : 57, 
				"json3" : 58, 
				"url-parse" : 59
			}], 
			15 : [function (require, module, exports) {
				'use strict';


				var ArrayPrototype = Array.prototype;
				var ObjectPrototype = Object.prototype;
				var FunctionPrototype = Function.prototype;
				var StringPrototype = String.prototype;
				var array_slice = ArrayPrototype.slice;

				var _toString = ObjectPrototype.toString;
				var isFunction = function (val) {
					return ObjectPrototype.toString.call(val) === '[object Function]';
				};
				var isArray = function isArray (obj) {
					return _toString.call(obj) === '[object Array]';
				}
;
				var isString = function isString (obj) {
					return _toString.call(obj) === '[object String]';
				}
;

				var supportsDescriptors = Object.defineProperty && (function () {
					try {
						Object.defineProperty({
						}, 'x', {
						});
						return true;
					}
					catch (e) {
						return false;
					}
				}());

				var defineProperty;
				if (supportsDescriptors) {
					defineProperty = function (object, name, method, forceAssign) {
						if (!forceAssign && (name in object)) {
							return;
						}
						Object.defineProperty(object, name, {
							configurable : true, 
							enumerable : false, 
							writable : true, 
							value : method
						});
					};
				}
				else {
					defineProperty = function (object, name, method, forceAssign) {
						if (!forceAssign && (name in object)) {
							return;
						}
						object[name] = method;
					};
				}
				var defineProperties = function (object, map, forceAssign) {
					for (var name in map) {
						if (ObjectPrototype.hasOwnProperty.call(map, name)) {
							defineProperty(object, name, map[name], forceAssign);
						}
					}
				};

				var toObject = function (o) {
					if (o == null) {
						throw new TypeError("can't convert " + o + ' to object');
					}
					return Object(o);
				};



				function toInteger (num) {
					var n = +num;
					if (n !== n) {
						n = 0;
					}
					else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
						n = (n > 0 || -1) * Math.floor(Math.abs(n));
					}
					return n;
				}

				function ToUint32 (x) {
					return x >>> 0;
				}



				function Empty () {
				}

				defineProperties(FunctionPrototype, {
					bind : function (that) {
						var target = this;
						if (!isFunction(target)) {
							throw new TypeError('Function.prototype.bind called on incompatible ' + target);
						}
						var args = array_slice.call(arguments, 1);
						var binder = function () {
							if (this instanceof bound) {
								var result = target.apply(this, args.concat(array_slice.call(arguments))
								);
								if (Object(result) === result) {
									return result;
								}
								return this;
							}
							else {
								return target.apply(that, args.concat(array_slice.call(arguments))
								);
							}
						};


						var boundLength = Math.max(0, target.length - args.length);

						var boundArgs = [];
						for (var i = 0; i < boundLength; i++) {
							boundArgs.push('$' + i);
						}

						var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

						if (target.prototype) {
							Empty.prototype = target.prototype;
							bound.prototype = new Empty();
							Empty.prototype = null;
						}




						return bound;
					}
				});


				defineProperties(Array, {
					isArray : isArray
				});


				var boxedString = Object('a');
				var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

				var properlyBoxesContext = function properlyBoxed (method) {
					var properlyBoxesNonStrict = true;
					var properlyBoxesStrict = true;
					if (method) {
						method.call('foo', function (_, __, context) {
							if (typeof context !== 'object') {
								properlyBoxesNonStrict = false;
							}
						});

						method.call([1], function () {
							'use strict';
							properlyBoxesStrict = typeof this === 'string';
						}, 'x');
					}
					return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
				}
;

				defineProperties(ArrayPrototype, {
					forEach : function (fun) {
						var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, thisp = arguments[1], i = -1, length = self.length >>> 0;

						if (!isFunction(fun)) {
							throw new TypeError();
						}

						while (++i < length) {
							if (i in self) {
								fun.call(thisp, self[i], i, object);
							}
						}
					}
				}, !properlyBoxesContext(ArrayPrototype.forEach));

				var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
				defineProperties(ArrayPrototype, {
					indexOf : function (sought) {
						var self = splitString && isString(this) ? this.split('') : toObject(this), length = self.length >>> 0;

						if (!length) {
							return -1;
						}

						var i = 0;
						if (arguments.length > 1) {
							i = toInteger(arguments[1]);
						}

						i = i >= 0 ? i : Math.max(0, length + i);
						for (; i < length; i++) {
							if (i in self && self[i] === sought) {
								return i;
							}
						}
						return -1;
					}
				}, hasFirefox2IndexOfBug);




				var string_split = StringPrototype.split;
				if ('ab'.split(/(?:ab)*/).length !== 2 || 
					'.'.split(/(.?)(.?)/).length !== 4 || 
					'tesst'.split(/(s)*/)[1] === 't' || 
					'test'.split(/(?:)/, -1).length !== 4 || 
					''.split(/.?/).length || 
					'.'.split(/()()/).length > 1) {
					(function () {
						var compliantExecNpcg = /()??/.exec('')[1] === void 0;

						StringPrototype.split = function (separator, limit) {
							var string = this;
							if (separator === void 0 && limit === 0) {
								return [];
							}

							if (_toString.call(separator) !== '[object RegExp]') {
								return string_split.call(this, separator, limit);
							}

							var output = [], flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.extended ? 'x' : '') + (separator.sticky ? 'y' : ''), lastLastIndex = 0, separator2, match, lastIndex, lastLength;
							separator = new RegExp(separator.source, flags + 'g');
							string += '';
							if (!compliantExecNpcg) {
								separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
							}

							limit = limit === void 0 ? 
								-1 >>> 0 : 
								ToUint32(limit);
							while (match = separator.exec(string)) {
								lastIndex = match.index + match[0].length;
								if (lastIndex > lastLastIndex) {
									output.push(string.slice(lastLastIndex, match.index));
									if (!compliantExecNpcg && match.length > 1) {
										match[0].replace(separator2, function () {
											for (var i = 1; i < arguments.length - 2; i++) {
												if (arguments[i] === void 0) {
													match[i] = void 0;
												}
											}
										});
									}
									if (match.length > 1 && match.index < string.length) {
										ArrayPrototype.push.apply(output, match.slice(1));
									}
									lastLength = match[0].length;
									lastLastIndex = lastIndex;
									if (output.length >= limit) {
										break;
									}
								}
								if (separator.lastIndex === match.index) {
									separator.lastIndex++;
								}
							}
							if (lastLastIndex === string.length) {
								if (lastLength || !separator.test('')) {
									output.push('');
								}
							}
							else {
								output.push(string.slice(lastLastIndex));
							}
							return output.length > limit ? output.slice(0, limit) : output;
						};
					}());
				}
				else if ('0'.split(void 0, 0).length) {
					StringPrototype.split = function split (separator, limit) {
						if (separator === void 0 && limit === 0) {
							return [];
						}
						return string_split.call(this, separator, limit);
					}
;
				}

				var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + 
					'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + 
					'\u2029\uFEFF';
				var zeroWidth = '\u200b';
				var wsRegexChars = '[' + ws + ']';
				var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
				var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
				var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
				defineProperties(StringPrototype, {
					trim : function () {
						if (this === void 0 || this === null) {
							throw new TypeError("can't convert " + this + ' to object');
						}
						return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
					}
				}, hasTrimWhitespaceBug);

				var string_substr = StringPrototype.substr;
				var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
				defineProperties(StringPrototype, {
					substr : function (start, length) {
						return string_substr.call(this, start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start, length
						);
					}
				}, hasNegativeSubstrBug);
			}, {
			}], 
			16 : [function (require, module, exports) {
				'use strict';

				module.exports = [require('./transport/websocket'), require('./transport/xhr-streaming'), require('./transport/xdr-streaming'), require('./transport/eventsource'), require('./transport/lib/iframe-wrap')(require('./transport/eventsource')), require('./transport/htmlfile'), require('./transport/lib/iframe-wrap')(require('./transport/htmlfile')), require('./transport/xhr-polling'), require('./transport/xdr-polling'), require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling')), require('./transport/jsonp-polling')
				];
			}, {
				"./transport/eventsource" : 20, 
				"./transport/htmlfile" : 21, 
				"./transport/jsonp-polling" : 23, 
				"./transport/lib/iframe-wrap" : 26, 
				"./transport/websocket" : 38, 
				"./transport/xdr-polling" : 39, 
				"./transport/xdr-streaming" : 40, 
				"./transport/xhr-polling" : 41, 
				"./transport/xhr-streaming" : 42
			}], 
			17 : [function (require, module, exports) {
				(function (process, global) {
					'use strict';

					var EventEmitter = require('events').EventEmitter, inherits = require('inherits'), utils = require('../../utils/event'), urlUtils = require('../../utils/url'), XHR = global.XMLHttpRequest;


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:browser:xhr');
					}

					function AbstractXHRObject (method, url, payload, opts) {
						debug(method, url);
						var self = this;
						EventEmitter.call(this);

						setTimeout(function () {
							self._start(method, url, payload, opts);
						}, 0);
					}

					inherits(AbstractXHRObject, EventEmitter);

					AbstractXHRObject.prototype._start = function (method, url, payload, opts) {
						var self = this;

						try {
							this.xhr = new XHR();
						}
						catch (x) {
						}

						if (!this.xhr) {
							debug('no xhr');
							this.emit('finish', 0, 'no xhr support');
							this._cleanup();
							return;
						}

						url = urlUtils.addQuery(url, 't=' + (+new Date()));

						this.unloadRef = utils.unloadAdd(function () {
							debug('unload cleanup');
							self._cleanup(true);
						});
						try {
							this.xhr.open(method, url, true);
							if (this.timeout && 'timeout' in this.xhr) {
								this.xhr.timeout = this.timeout;
								this.xhr.ontimeout = function () {
									debug('xhr timeout');
									self.emit('finish', 0, '');
									self._cleanup(false);
								};
							}
						}
						catch (e) {
							debug('exception', e);
							this.emit('finish', 0, '');
							this._cleanup(false);
							return;
						}

						if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
							debug('withCredentials');

							this.xhr.withCredentials = 'true';
						}
						if (opts && opts.headers) {
							for (var key in opts.headers) {
								this.xhr.setRequestHeader(key, opts.headers[key]);
							}
						}

						this.xhr.onreadystatechange = function () {
							if (self.xhr) {
								var x = self.xhr;
								var text, status;
								debug('readyState', x.readyState);
								switch (x.readyState) {
									case 3:
										try {
											status = x.status;
											text = x.responseText;
										}
										catch (e) {
										}
										debug('status', status);
										if (status === 1223) {
											status = 204;
										}

										if (status === 200 && text && text.length > 0) {
											debug('chunk');
											self.emit('chunk', status, text);
										}
										break;
									case 4:
										status = x.status;
										debug('status', status);
										if (status === 1223) {
											status = 204;
										}
										if (status === 12005 || status === 12029) {
											status = 0;
										}

										debug('finish', status, x.responseText);
										self.emit('finish', status, x.responseText);
										self._cleanup(false);
										break;
								}
							}
						};

						try {
							self.xhr.send(payload);
						}
						catch (e) {
							self.emit('finish', 0, '');
							self._cleanup(false);
						}
					};

					AbstractXHRObject.prototype._cleanup = function (abort) {
						debug('cleanup');
						if (!this.xhr) {
							return;
						}
						this.removeAllListeners();
						utils.unloadDel(this.unloadRef);

						this.xhr.onreadystatechange = function () {
						};
						if (this.xhr.ontimeout) {
							this.xhr.ontimeout = null;
						}

						if (abort) {
							try {
								this.xhr.abort();
							}
							catch (x) {
							}
						}
						this.unloadRef = this.xhr = null;
					};

					AbstractXHRObject.prototype.close = function () {
						debug('close');
						this._cleanup(true);
					};

					AbstractXHRObject.enabled = !!XHR;
					var axo = ['Active'].concat('Object').join('X');
					if (!AbstractXHRObject.enabled && (axo in global)) {
						debug('overriding xmlhttprequest');
						XHR = function () {
							try {
								return new global[axo]('Microsoft.XMLHTTP');
							}
							catch (e) {
								return null;
							}
						};
						AbstractXHRObject.enabled = !!new XHR();
					}

					var cors = false;
					try {
						cors = 'withCredentials' in new XHR();
					}
					catch (ignored) {
					}

					AbstractXHRObject.supportsCORS = cors;

					module.exports = AbstractXHRObject;
				}).call(this, {
					env : {
					}
				}, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"../../utils/event" : 46, 
				"../../utils/url" : 52, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			18 : [function (require, module, exports) {
				(function (global) {
					module.exports = global.EventSource;
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
			}], 
			19 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					var Driver = global.WebSocket || global.MozWebSocket;
					if (Driver) {
						module.exports = function WebSocketBrowserDriver (url) {
							return new Driver(url);
						}
;
					}
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
			}], 
			20 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), AjaxBasedTransport = require('./lib/ajax-based'), EventSourceReceiver = require('./receiver/eventsource'), XHRCorsObject = require('./sender/xhr-cors'), EventSourceDriver = require('eventsource');


				function EventSourceTransport (transUrl) {
					if (!EventSourceTransport.enabled()) {
						throw new Error('Transport created when disabled');
					}

					AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
				}

				inherits(EventSourceTransport, AjaxBasedTransport);

				EventSourceTransport.enabled = function () {
					return !!EventSourceDriver;
				};

				EventSourceTransport.transportName = 'eventsource';
				EventSourceTransport.roundTrips = 2;

				module.exports = EventSourceTransport;
			}, {
				"./lib/ajax-based" : 24, 
				"./receiver/eventsource" : 29, 
				"./sender/xhr-cors" : 35, 
				"eventsource" : 18, 
				"inherits" : 57
			}], 
			21 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), HtmlfileReceiver = require('./receiver/htmlfile'), XHRLocalObject = require('./sender/xhr-local'), AjaxBasedTransport = require('./lib/ajax-based');


				function HtmlFileTransport (transUrl) {
					if (!HtmlfileReceiver.enabled) {
						throw new Error('Transport created when disabled');
					}
					AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
				}

				inherits(HtmlFileTransport, AjaxBasedTransport);

				HtmlFileTransport.enabled = function (info) {
					return HtmlfileReceiver.enabled && info.sameOrigin;
				};

				HtmlFileTransport.transportName = 'htmlfile';
				HtmlFileTransport.roundTrips = 2;

				module.exports = HtmlFileTransport;
			}, {
				"./lib/ajax-based" : 24, 
				"./receiver/htmlfile" : 30, 
				"./sender/xhr-local" : 37, 
				"inherits" : 57
			}], 
			22 : [function (require, module, exports) {
				(function (process) {
					'use strict';


					var inherits = require('inherits'), JSON3 = require('json3'), EventEmitter = require('events').EventEmitter, version = require('../version'), urlUtils = require('../utils/url'), iframeUtils = require('../utils/iframe'), eventUtils = require('../utils/event'), random = require('../utils/random');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:transport:iframe');
					}

					function IframeTransport (transport, transUrl, baseUrl) {
						if (!IframeTransport.enabled()) {
							throw new Error('Transport created when disabled');
						}
						EventEmitter.call(this);

						var self = this;
						this.origin = urlUtils.getOrigin(baseUrl);
						this.baseUrl = baseUrl;
						this.transUrl = transUrl;
						this.transport = transport;
						this.windowId = random.string(8);

						var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
						debug(transport, transUrl, iframeUrl);

						this.iframeObj = iframeUtils.createIframe(iframeUrl, function (r) {
							debug('err callback');
							self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
							self.close();
						});

						this.onmessageCallback = this._message.bind(this);
						eventUtils.attachEvent('message', this.onmessageCallback);
					}

					inherits(IframeTransport, EventEmitter);

					IframeTransport.prototype.close = function () {
						debug('close');
						this.removeAllListeners();
						if (this.iframeObj) {
							eventUtils.detachEvent('message', this.onmessageCallback);
							try {
								this.postMessage('c');
							}
							catch (x) {
							}
							this.iframeObj.cleanup();
							this.iframeObj = null;
							this.onmessageCallback = this.iframeObj = null;
						}
					};

					IframeTransport.prototype._message = function (e) {
						debug('message', e.data);
						if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
							debug('not same origin', e.origin, this.origin);
							return;
						}

						var iframeMessage;
						try {
							iframeMessage = JSON3.parse(e.data);
						}
						catch (ignored) {
							debug('bad json', e.data);
							return;
						}

						if (iframeMessage.windowId !== this.windowId) {
							debug('mismatched window id', iframeMessage.windowId, this.windowId);
							return;
						}

						switch (iframeMessage.type) {
							case 's':
								this.iframeObj.loaded();
								this.postMessage('s', JSON3.stringify([version, this.transport, this.transUrl, this.baseUrl
								]));
								break;
							case 't':
								this.emit('message', iframeMessage.data);
								break;
							case 'c':
								var cdata;
								try {
									cdata = JSON3.parse(iframeMessage.data);
								}
								catch (ignored) {
									debug('bad json', iframeMessage.data);
									return;
								}
								this.emit('close', cdata[0], cdata[1]);
								this.close();
								break;
						}
					};

					IframeTransport.prototype.postMessage = function (type, data) {
						debug('postMessage', type, data);
						this.iframeObj.post(JSON3.stringify({
							windowId : this.windowId, 
							type : type, 
							data : data || ''
						}), this.origin);
					};

					IframeTransport.prototype.send = function (message) {
						debug('send', message);
						this.postMessage('m', message);
					};

					IframeTransport.enabled = function () {
						return iframeUtils.iframeEnabled;
					};

					IframeTransport.transportName = 'iframe';
					IframeTransport.roundTrips = 2;

					module.exports = IframeTransport;
				}).call(this, {
					env : {
					}
				});
			}, {
				"../utils/event" : 46, 
				"../utils/iframe" : 47, 
				"../utils/random" : 50, 
				"../utils/url" : 52, 
				"../version" : 53, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57, 
				"json3" : 58
			}], 
			23 : [function (require, module, exports) {
				(function (global) {
					'use strict';


					var inherits = require('inherits'), SenderReceiver = require('./lib/sender-receiver'), JsonpReceiver = require('./receiver/jsonp'), jsonpSender = require('./sender/jsonp');


					function JsonPTransport (transUrl) {
						if (!JsonPTransport.enabled()) {
							throw new Error('Transport created when disabled');
						}
						SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
					}

					inherits(JsonPTransport, SenderReceiver);

					JsonPTransport.enabled = function () {
						return !!global.document;
					};

					JsonPTransport.transportName = 'jsonp-polling';
					JsonPTransport.roundTrips = 1;
					JsonPTransport.needBody = true;

					module.exports = JsonPTransport;
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"./lib/sender-receiver" : 28, 
				"./receiver/jsonp" : 31, 
				"./sender/jsonp" : 33, 
				"inherits" : 57
			}], 
			24 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var inherits = require('inherits'), urlUtils = require('../../utils/url'), SenderReceiver = require('./sender-receiver');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:ajax-based');
					}

					function createAjaxSender (AjaxObject) {
						return function (url, payload, callback) {
							debug('create ajax sender', url, payload);
							var opt = {
							};
							if (typeof payload === 'string') {
								opt.headers = {
									'Content-type' : 'text/plain'
								};
							}
							var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
							var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
							xo.once('finish', function (status) {
								debug('finish', status);
								xo = null;

								if (status !== 200 && status !== 204) {
									return callback(new Error('http status ' + status));
								}
								callback();
							});
							return function () {
								debug('abort');
								xo.close();
								xo = null;

								var err = new Error('Aborted');
								err.code = 1000;
								callback(err);
							};
						};
					}

					function AjaxBasedTransport (transUrl, urlSuffix, Receiver, AjaxObject) {
						SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
					}

					inherits(AjaxBasedTransport, SenderReceiver);

					module.exports = AjaxBasedTransport;
				}).call(this, {
					env : {
					}
				});
			}, {
				"../../utils/url" : 52, 
				"./sender-receiver" : 28, 
				"debug" : 54, 
				"inherits" : 57
			}], 
			25 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var inherits = require('inherits'), EventEmitter = require('events').EventEmitter;


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:buffered-sender');
					}

					function BufferedSender (url, sender) {
						debug(url);
						EventEmitter.call(this);
						this.sendBuffer = [];
						this.sender = sender;
						this.url = url;
					}

					inherits(BufferedSender, EventEmitter);

					BufferedSender.prototype.send = function (message) {
						debug('send', message);
						this.sendBuffer.push(message);
						if (!this.sendStop) {
							this.sendSchedule();
						}
					};

					BufferedSender.prototype.sendScheduleWait = function () {
						debug('sendScheduleWait');
						var self = this;
						var tref;
						this.sendStop = function () {
							debug('sendStop');
							self.sendStop = null;
							clearTimeout(tref);
						};
						tref = setTimeout(function () {
							debug('timeout');
							self.sendStop = null;
							self.sendSchedule();
						}, 25);
					};

					BufferedSender.prototype.sendSchedule = function () {
						debug('sendSchedule', this.sendBuffer.length);
						var self = this;
						if (this.sendBuffer.length > 0) {
							var payload = '[' + this.sendBuffer.join(',') + ']';
							this.sendStop = this.sender(this.url, payload, function (err) {
								self.sendStop = null;
								if (err) {
									debug('error', err);
									self.emit('close', err.code || 1006, 'Sending error: ' + err);
									self._cleanup();
								}
								else {
									self.sendScheduleWait();
								}
							});
							this.sendBuffer = [];
						}
					};

					BufferedSender.prototype._cleanup = function () {
						debug('_cleanup');
						this.removeAllListeners();
					};

					BufferedSender.prototype.stop = function () {
						debug('stop');
						this._cleanup();
						if (this.sendStop) {
							this.sendStop();
							this.sendStop = null;
						}
					};

					module.exports = BufferedSender;
				}).call(this, {
					env : {
					}
				});
			}, {
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			26 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					var inherits = require('inherits'), IframeTransport = require('../iframe'), objectUtils = require('../../utils/object');


					module.exports = function (transport) {
						function IframeWrapTransport (transUrl, baseUrl) {
							IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
						}

						inherits(IframeWrapTransport, IframeTransport);

						IframeWrapTransport.enabled = function (url, info) {
							if (!global.document) {
								return false;
							}

							var iframeInfo = objectUtils.extend({
							}, info);
							iframeInfo.sameOrigin = true;
							return transport.enabled(iframeInfo) && IframeTransport.enabled();
						};

						IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
						IframeWrapTransport.needBody = true;
						IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1;

						IframeWrapTransport.facadeTransport = transport;

						return IframeWrapTransport;
					};
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"../../utils/object" : 49, 
				"../iframe" : 22, 
				"inherits" : 57
			}], 
			27 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var inherits = require('inherits'), EventEmitter = require('events').EventEmitter;


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:polling');
					}

					function Polling (Receiver, receiveUrl, AjaxObject) {
						debug(receiveUrl);
						EventEmitter.call(this);
						this.Receiver = Receiver;
						this.receiveUrl = receiveUrl;
						this.AjaxObject = AjaxObject;
						this._scheduleReceiver();
					}

					inherits(Polling, EventEmitter);

					Polling.prototype._scheduleReceiver = function () {
						debug('_scheduleReceiver');
						var self = this;
						var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

						poll.on('message', function (msg) {
							debug('message', msg);
							self.emit('message', msg);
						});

						poll.once('close', function (code, reason) {
							debug('close', code, reason, self.pollIsClosing);
							self.poll = poll = null;

							if (!self.pollIsClosing) {
								if (reason === 'network') {
									self._scheduleReceiver();
								}
								else {
									self.emit('close', code || 1006, reason);
									self.removeAllListeners();
								}
							}
						});
					};

					Polling.prototype.abort = function () {
						debug('abort');
						this.removeAllListeners();
						this.pollIsClosing = true;
						if (this.poll) {
							this.poll.abort();
						}
					};

					module.exports = Polling;
				}).call(this, {
					env : {
					}
				});
			}, {
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			28 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var inherits = require('inherits'), urlUtils = require('../../utils/url'), BufferedSender = require('./buffered-sender'), Polling = require('./polling');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:sender-receiver');
					}

					function SenderReceiver (transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
						var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
						debug(pollUrl);
						var self = this;
						BufferedSender.call(this, transUrl, senderFunc);

						this.poll = new Polling(Receiver, pollUrl, AjaxObject);
						this.poll.on('message', function (msg) {
							debug('poll message', msg);
							self.emit('message', msg);
						});
						this.poll.once('close', function (code, reason) {
							debug('poll close', code, reason);
							self.poll = null;
							self.emit('close', code, reason);
							self.close();
						});
					}

					inherits(SenderReceiver, BufferedSender);

					SenderReceiver.prototype.close = function () {
						debug('close');
						this.removeAllListeners();
						if (this.poll) {
							this.poll.abort();
							this.poll = null;
						}
						this.stop();
					};

					module.exports = SenderReceiver;
				}).call(this, {
					env : {
					}
				});
			}, {
				"../../utils/url" : 52, 
				"./buffered-sender" : 25, 
				"./polling" : 27, 
				"debug" : 54, 
				"inherits" : 57
			}], 
			29 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var inherits = require('inherits'), EventEmitter = require('events').EventEmitter, EventSourceDriver = require('eventsource');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:receiver:eventsource');
					}

					function EventSourceReceiver (url) {
						debug(url);
						EventEmitter.call(this);

						var self = this;
						var es = this.es = new EventSourceDriver(url);
						es.onmessage = function (e) {
							debug('message', e.data);
							self.emit('message', decodeURI(e.data));
						};
						es.onerror = function (e) {
							debug('error', es.readyState, e);
							var reason = (es.readyState !== 2 ? 'network' : 'permanent');
							self._cleanup();
							self._close(reason);
						};
					}

					inherits(EventSourceReceiver, EventEmitter);

					EventSourceReceiver.prototype.abort = function () {
						debug('abort');
						this._cleanup();
						this._close('user');
					};

					EventSourceReceiver.prototype._cleanup = function () {
						debug('cleanup');
						var es = this.es;
						if (es) {
							es.onmessage = es.onerror = null;
							es.close();
							this.es = null;
						}
					};

					EventSourceReceiver.prototype._close = function (reason) {
						debug('close', reason);
						var self = this;
						setTimeout(function () {
							self.emit('close', null, reason);
							self.removeAllListeners();
						}, 200);
					};

					module.exports = EventSourceReceiver;
				}).call(this, {
					env : {
					}
				});
			}, {
				"debug" : 54, 
				"events" : 3, 
				"eventsource" : 18, 
				"inherits" : 57
			}], 
			30 : [function (require, module, exports) {
				(function (process, global) {
					'use strict';

					var inherits = require('inherits'), iframeUtils = require('../../utils/iframe'), urlUtils = require('../../utils/url'), EventEmitter = require('events').EventEmitter, random = require('../../utils/random');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:receiver:htmlfile');
					}

					function HtmlfileReceiver (url) {
						debug(url);
						EventEmitter.call(this);
						var self = this;
						iframeUtils.polluteGlobalNamespace();

						this.id = 'a' + random.string(6);
						url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

						debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
						var constructFunc = HtmlfileReceiver.htmlfileEnabled ? 
							iframeUtils.createHtmlfile : iframeUtils.createIframe;

						global[iframeUtils.WPrefix][this.id] = {
							start : function () {
								debug('start');
								self.iframeObj.loaded();
							}, 
							message : function (data) {
								debug('message', data);
								self.emit('message', data);
							}, 
							stop : function () {
								debug('stop');
								self._cleanup();
								self._close('network');
							}
						};
						this.iframeObj = constructFunc(url, function () {
							debug('callback');
							self._cleanup();
							self._close('permanent');
						});
					}

					inherits(HtmlfileReceiver, EventEmitter);

					HtmlfileReceiver.prototype.abort = function () {
						debug('abort');
						this._cleanup();
						this._close('user');
					};

					HtmlfileReceiver.prototype._cleanup = function () {
						debug('_cleanup');
						if (this.iframeObj) {
							this.iframeObj.cleanup();
							this.iframeObj = null;
						}
						delete global[iframeUtils.WPrefix][this.id];
					};

					HtmlfileReceiver.prototype._close = function (reason) {
						debug('_close', reason);
						this.emit('close', null, reason);
						this.removeAllListeners();
					};

					HtmlfileReceiver.htmlfileEnabled = false;

					var axo = ['Active'].concat('Object').join('X');
					if (axo in global) {
						try {
							HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
						}
						catch (x) {
						}
					}

					HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

					module.exports = HtmlfileReceiver;
				}).call(this, {
					env : {
					}
				}, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"../../utils/iframe" : 47, 
				"../../utils/random" : 50, 
				"../../utils/url" : 52, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			31 : [function (require, module, exports) {
				(function (process, global) {
					'use strict';

					var utils = require('../../utils/iframe'), random = require('../../utils/random'), browser = require('../../utils/browser'), urlUtils = require('../../utils/url'), inherits = require('inherits'), EventEmitter = require('events').EventEmitter;


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:receiver:jsonp');
					}

					function JsonpReceiver (url) {
						debug(url);
						var self = this;
						EventEmitter.call(this);

						utils.polluteGlobalNamespace();

						this.id = 'a' + random.string(6);
						var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

						global[utils.WPrefix][this.id] = this._callback.bind(this);
						this._createScript(urlWithId);

						this.timeoutId = setTimeout(function () {
							debug('timeout');
							self._abort(new Error('JSONP script loaded abnormally (timeout)'));
						}, JsonpReceiver.timeout);
					}

					inherits(JsonpReceiver, EventEmitter);

					JsonpReceiver.prototype.abort = function () {
						debug('abort');
						if (global[utils.WPrefix][this.id]) {
							var err = new Error('JSONP user aborted read');
							err.code = 1000;
							this._abort(err);
						}
					};

					JsonpReceiver.timeout = 35000;
					JsonpReceiver.scriptErrorTimeout = 1000;

					JsonpReceiver.prototype._callback = function (data) {
						debug('_callback', data);
						this._cleanup();

						if (this.aborting) {
							return;
						}

						if (data) {
							debug('message', data);
							this.emit('message', data);
						}
						this.emit('close', null, 'network');
						this.removeAllListeners();
					};

					JsonpReceiver.prototype._abort = function (err) {
						debug('_abort', err);
						this._cleanup();
						this.aborting = true;
						this.emit('close', err.code, err.message);
						this.removeAllListeners();
					};

					JsonpReceiver.prototype._cleanup = function () {
						debug('_cleanup');
						clearTimeout(this.timeoutId);
						if (this.script2) {
							this.script2.parentNode.removeChild(this.script2);
							this.script2 = null;
						}
						if (this.script) {
							var script = this.script;
							script.parentNode.removeChild(script);
							script.onreadystatechange = script.onerror = 
								script.onload = script.onclick = null;
							this.script = null;
						}
						delete global[utils.WPrefix][this.id];
					};

					JsonpReceiver.prototype._scriptError = function () {
						debug('_scriptError');
						var self = this;
						if (this.errorTimer) {
							return;
						}

						this.errorTimer = setTimeout(function () {
							if (!self.loadedOkay) {
								self._abort(new Error('JSONP script loaded abnormally (onerror)'));
							}
						}, JsonpReceiver.scriptErrorTimeout);
					};

					JsonpReceiver.prototype._createScript = function (url) {
						debug('_createScript', url);
						var self = this;
						var script = this.script = global.document.createElement('script');
						var script2;

						script.id = 'a' + random.string(8);
						script.src = url;
						script.type = 'text/javascript';
						script.charset = 'UTF-8';
						script.onerror = this._scriptError.bind(this);
						script.onload = function () {
							debug('onload');
							self._abort(new Error('JSONP script loaded abnormally (onload)'));
						};

						script.onreadystatechange = function () {
							debug('onreadystatechange', script.readyState);
							if (/loaded|closed/.test(script.readyState)) {
								if (script && script.htmlFor && script.onclick) {
									self.loadedOkay = true;
									try {
										script.onclick();
									}
									catch (x) {
									}
								}
								if (script) {
									self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
								}
							}
						};
						if (typeof script.async === 'undefined' && global.document.attachEvent) {
							if (!browser.isOpera()) {
								try {
									script.htmlFor = script.id;
									script.event = 'onclick';
								}
								catch (x) {
								}
								script.async = true;
							}
							else {
								script2 = this.script2 = global.document.createElement('script');
								script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
								script.async = script2.async = false;
							}
						}
						if (typeof script.async !== 'undefined') {
							script.async = true;
						}

						var head = global.document.getElementsByTagName('head')[0];
						head.insertBefore(script, head.firstChild);
						if (script2) {
							head.insertBefore(script2, head.firstChild);
						}
					};

					module.exports = JsonpReceiver;
				}).call(this, {
					env : {
					}
				}, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"../../utils/browser" : 44, 
				"../../utils/iframe" : 47, 
				"../../utils/random" : 50, 
				"../../utils/url" : 52, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			32 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var inherits = require('inherits'), EventEmitter = require('events').EventEmitter;


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:receiver:xhr');
					}

					function XhrReceiver (url, AjaxObject) {
						debug(url);
						EventEmitter.call(this);
						var self = this;

						this.bufferPosition = 0;

						this.xo = new AjaxObject('POST', url, null);
						this.xo.on('chunk', this._chunkHandler.bind(this));
						this.xo.once('finish', function (status, text) {
							debug('finish', status, text);
							self._chunkHandler(status, text);
							self.xo = null;
							var reason = status === 200 ? 'network' : 'permanent';
							debug('close', reason);
							self.emit('close', null, reason);
							self._cleanup();
						});
					}

					inherits(XhrReceiver, EventEmitter);

					XhrReceiver.prototype._chunkHandler = function (status, text) {
						debug('_chunkHandler', status);
						if (status !== 200 || !text) {
							return;
						}

						for (var idx = -1; ; this.bufferPosition += idx + 1) {
							var buf = text.slice(this.bufferPosition);
							idx = buf.indexOf('\n');
							if (idx === -1) {
								break;
							}
							var msg = buf.slice(0, idx);
							if (msg) {
								debug('message', msg);
								this.emit('message', msg);
							}
						}
					};

					XhrReceiver.prototype._cleanup = function () {
						debug('_cleanup');
						this.removeAllListeners();
					};

					XhrReceiver.prototype.abort = function () {
						debug('abort');
						if (this.xo) {
							this.xo.close();
							debug('close');
							this.emit('close', null, 'user');
							this.xo = null;
						}
						this._cleanup();
					};

					module.exports = XhrReceiver;
				}).call(this, {
					env : {
					}
				});
			}, {
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			33 : [function (require, module, exports) {
				(function (process, global) {
					'use strict';

					var random = require('../../utils/random'), urlUtils = require('../../utils/url');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:sender:jsonp');
					}

					var form, area;

					function createIframe (id) {
						debug('createIframe', id);
						try {
							return global.document.createElement('<iframe name="' + id + '">');
						}
						catch (x) {
							var iframe = global.document.createElement('iframe');
							iframe.name = id;
							return iframe;
						}
					}

					function createForm () {
						debug('createForm');
						form = global.document.createElement('form');
						form.style.display = 'none';
						form.style.position = 'absolute';
						form.method = 'POST';
						form.enctype = 'application/x-www-form-urlencoded';
						form.acceptCharset = 'UTF-8';

						area = global.document.createElement('textarea');
						area.name = 'd';
						form.appendChild(area);

						global.document.body.appendChild(form);
					}

					module.exports = function (url, payload, callback) {
						debug(url, payload);
						if (!form) {
							createForm();
						}
						var id = 'a' + random.string(8);
						form.target = id;
						form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

						var iframe = createIframe(id);
						iframe.id = id;
						iframe.style.display = 'none';
						form.appendChild(iframe);

						try {
							area.value = payload;
						}
						catch (e) {
						}
						form.submit();

						var completed = function (err) {
							debug('completed', id, err);
							if (!iframe.onerror) {
								return;
							}
							iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
							setTimeout(function () {
								debug('cleaning up', id);
								iframe.parentNode.removeChild(iframe);
								iframe = null;
							}, 500);
							area.value = '';
							callback(err);
						};
						iframe.onerror = function () {
							debug('onerror', id);
							completed();
						};
						iframe.onload = function () {
							debug('onload', id);
							completed();
						};
						iframe.onreadystatechange = function (e) {
							debug('onreadystatechange', id, iframe.readyState, e);
							if (iframe.readyState === 'complete') {
								completed();
							}
						};
						return function () {
							debug('aborted', id);
							completed(new Error('Aborted'));
						};
					};
				}).call(this, {
					env : {
					}
				}, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"../../utils/random" : 50, 
				"../../utils/url" : 52, 
				"debug" : 54
			}], 
			34 : [function (require, module, exports) {
				(function (process, global) {
					'use strict';

					var EventEmitter = require('events').EventEmitter, inherits = require('inherits'), eventUtils = require('../../utils/event'), browser = require('../../utils/browser'), urlUtils = require('../../utils/url');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:sender:xdr');
					}


					function XDRObject (method, url, payload) {
						debug(method, url);
						var self = this;
						EventEmitter.call(this);

						setTimeout(function () {
							self._start(method, url, payload);
						}, 0);
					}

					inherits(XDRObject, EventEmitter);

					XDRObject.prototype._start = function (method, url, payload) {
						debug('_start');
						var self = this;
						var xdr = new global.XDomainRequest();
						url = urlUtils.addQuery(url, 't=' + (+new Date()));

						xdr.onerror = function () {
							debug('onerror');
							self._error();
						};
						xdr.ontimeout = function () {
							debug('ontimeout');
							self._error();
						};
						xdr.onprogress = function () {
							debug('progress', xdr.responseText);
							self.emit('chunk', 200, xdr.responseText);
						};
						xdr.onload = function () {
							debug('load');
							self.emit('finish', 200, xdr.responseText);
							self._cleanup(false);
						};
						this.xdr = xdr;
						this.unloadRef = eventUtils.unloadAdd(function () {
							self._cleanup(true);
						});
						try {
							this.xdr.open(method, url);
							if (this.timeout) {
								this.xdr.timeout = this.timeout;
							}
							this.xdr.send(payload);
						}
						catch (x) {
							this._error();
						}
					};

					XDRObject.prototype._error = function () {
						this.emit('finish', 0, '');
						this._cleanup(false);
					};

					XDRObject.prototype._cleanup = function (abort) {
						debug('cleanup', abort);
						if (!this.xdr) {
							return;
						}
						this.removeAllListeners();
						eventUtils.unloadDel(this.unloadRef);

						this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
						if (abort) {
							try {
								this.xdr.abort();
							}
							catch (x) {
							}
						}
						this.unloadRef = this.xdr = null;
					};

					XDRObject.prototype.close = function () {
						debug('close');
						this._cleanup(true);
					};

					XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

					module.exports = XDRObject;
				}).call(this, {
					env : {
					}
				}, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"../../utils/browser" : 44, 
				"../../utils/event" : 46, 
				"../../utils/url" : 52, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			35 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), XhrDriver = require('../driver/xhr');


				function XHRCorsObject (method, url, payload, opts) {
					XhrDriver.call(this, method, url, payload, opts);
				}

				inherits(XHRCorsObject, XhrDriver);

				XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

				module.exports = XHRCorsObject;
			}, {
				"../driver/xhr" : 17, 
				"inherits" : 57
			}], 
			36 : [function (require, module, exports) {
				'use strict';

				var EventEmitter = require('events').EventEmitter, inherits = require('inherits');


				function XHRFake () {
					var self = this;
					EventEmitter.call(this);

					this.to = setTimeout(function () {
						self.emit('finish', 200, '{}');
					}, XHRFake.timeout);
				}

				inherits(XHRFake, EventEmitter);

				XHRFake.prototype.close = function () {
					clearTimeout(this.to);
				};

				XHRFake.timeout = 2000;

				module.exports = XHRFake;
			}, {
				"events" : 3, 
				"inherits" : 57
			}], 
			37 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), XhrDriver = require('../driver/xhr');


				function XHRLocalObject (method, url, payload) {
					XhrDriver.call(this, method, url, payload, {
						noCredentials : true
					});
				}

				inherits(XHRLocalObject, XhrDriver);

				XHRLocalObject.enabled = XhrDriver.enabled;

				module.exports = XHRLocalObject;
			}, {
				"../driver/xhr" : 17, 
				"inherits" : 57
			}], 
			38 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var utils = require('../utils/event'), urlUtils = require('../utils/url'), inherits = require('inherits'), EventEmitter = require('events').EventEmitter, WebsocketDriver = require('./driver/websocket');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:websocket');
					}

					function WebSocketTransport (transUrl, ignore, options) {
						if (!WebSocketTransport.enabled()) {
							throw new Error('Transport created when disabled');
						}

						EventEmitter.call(this);
						debug('constructor', transUrl);

						var self = this;
						var url = urlUtils.addPath(transUrl, '/websocket');
						if (url.slice(0, 5) === 'https') {
							url = 'wss' + url.slice(5);
						}
						else {
							url = 'ws' + url.slice(4);
						}
						this.url = url;

						this.ws = new WebsocketDriver(this.url, [], options);
						this.ws.onmessage = function (e) {
							debug('message event', e.data);
							self.emit('message', e.data);
						};
						this.unloadRef = utils.unloadAdd(function () {
							debug('unload');
							self.ws.close();
						});
						this.ws.onclose = function (e) {
							debug('close event', e.code, e.reason);
							self.emit('close', e.code, e.reason);
							self._cleanup();
						};
						this.ws.onerror = function (e) {
							debug('error event', e);
							self.emit('close', 1006, 'WebSocket connection broken');
							self._cleanup();
						};
					}

					inherits(WebSocketTransport, EventEmitter);

					WebSocketTransport.prototype.send = function (data) {
						var msg = '[' + data + ']';
						debug('send', msg);
						this.ws.send(msg);
					};

					WebSocketTransport.prototype.close = function () {
						debug('close');
						if (this.ws) {
							this.ws.close();
						}
						this._cleanup();
					};

					WebSocketTransport.prototype._cleanup = function () {
						debug('_cleanup');
						var ws = this.ws;
						if (ws) {
							ws.onmessage = ws.onclose = ws.onerror = null;
						}
						utils.unloadDel(this.unloadRef);
						this.unloadRef = this.ws = null;
						this.removeAllListeners();
					};

					WebSocketTransport.enabled = function () {
						debug('enabled');
						return !!WebsocketDriver;
					};
					WebSocketTransport.transportName = 'websocket';

					WebSocketTransport.roundTrips = 2;

					module.exports = WebSocketTransport;
				}).call(this, {
					env : {
					}
				});
			}, {
				"../utils/event" : 46, 
				"../utils/url" : 52, 
				"./driver/websocket" : 19, 
				"debug" : 54, 
				"events" : 3, 
				"inherits" : 57
			}], 
			39 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), AjaxBasedTransport = require('./lib/ajax-based'), XdrStreamingTransport = require('./xdr-streaming'), XhrReceiver = require('./receiver/xhr'), XDRObject = require('./sender/xdr');


				function XdrPollingTransport (transUrl) {
					if (!XDRObject.enabled) {
						throw new Error('Transport created when disabled');
					}
					AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
				}

				inherits(XdrPollingTransport, AjaxBasedTransport);

				XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
				XdrPollingTransport.transportName = 'xdr-polling';
				XdrPollingTransport.roundTrips = 2;

				module.exports = XdrPollingTransport;
			}, {
				"./lib/ajax-based" : 24, 
				"./receiver/xhr" : 32, 
				"./sender/xdr" : 34, 
				"./xdr-streaming" : 40, 
				"inherits" : 57
			}], 
			40 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), AjaxBasedTransport = require('./lib/ajax-based'), XhrReceiver = require('./receiver/xhr'), XDRObject = require('./sender/xdr');



				function XdrStreamingTransport (transUrl) {
					if (!XDRObject.enabled) {
						throw new Error('Transport created when disabled');
					}
					AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
				}

				inherits(XdrStreamingTransport, AjaxBasedTransport);

				XdrStreamingTransport.enabled = function (info) {
					if (info.cookie_needed || info.nullOrigin) {
						return false;
					}
					return XDRObject.enabled && info.sameScheme;
				};

				XdrStreamingTransport.transportName = 'xdr-streaming';
				XdrStreamingTransport.roundTrips = 2;

				module.exports = XdrStreamingTransport;
			}, {
				"./lib/ajax-based" : 24, 
				"./receiver/xhr" : 32, 
				"./sender/xdr" : 34, 
				"inherits" : 57
			}], 
			41 : [function (require, module, exports) {
				'use strict';

				var inherits = require('inherits'), AjaxBasedTransport = require('./lib/ajax-based'), XhrReceiver = require('./receiver/xhr'), XHRCorsObject = require('./sender/xhr-cors'), XHRLocalObject = require('./sender/xhr-local');


				function XhrPollingTransport (transUrl) {
					if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
						throw new Error('Transport created when disabled');
					}
					AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
				}

				inherits(XhrPollingTransport, AjaxBasedTransport);

				XhrPollingTransport.enabled = function (info) {
					if (info.nullOrigin) {
						return false;
					}

					if (XHRLocalObject.enabled && info.sameOrigin) {
						return true;
					}
					return XHRCorsObject.enabled;
				};

				XhrPollingTransport.transportName = 'xhr-polling';
				XhrPollingTransport.roundTrips = 2;

				module.exports = XhrPollingTransport;
			}, {
				"./lib/ajax-based" : 24, 
				"./receiver/xhr" : 32, 
				"./sender/xhr-cors" : 35, 
				"./sender/xhr-local" : 37, 
				"inherits" : 57
			}], 
			42 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					var inherits = require('inherits'), AjaxBasedTransport = require('./lib/ajax-based'), XhrReceiver = require('./receiver/xhr'), XHRCorsObject = require('./sender/xhr-cors'), XHRLocalObject = require('./sender/xhr-local'), browser = require('../utils/browser');


					function XhrStreamingTransport (transUrl) {
						if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
							throw new Error('Transport created when disabled');
						}
						AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
					}

					inherits(XhrStreamingTransport, AjaxBasedTransport);

					XhrStreamingTransport.enabled = function (info) {
						if (info.nullOrigin) {
							return false;
						}
						if (browser.isOpera()) {
							return false;
						}

						return XHRCorsObject.enabled;
					};

					XhrStreamingTransport.transportName = 'xhr-streaming';
					XhrStreamingTransport.roundTrips = 2;

					XhrStreamingTransport.needBody = !!global.document;

					module.exports = XhrStreamingTransport;
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"../utils/browser" : 44, 
				"./lib/ajax-based" : 24, 
				"./receiver/xhr" : 32, 
				"./sender/xhr-cors" : 35, 
				"./sender/xhr-local" : 37, 
				"inherits" : 57
			}], 
			43 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					if (global.crypto && global.crypto.getRandomValues) {
						module.exports.randomBytes = function (length) {
							var bytes = new Uint8Array(length);
							global.crypto.getRandomValues(bytes);
							return bytes;
						};
					}
					else {
						module.exports.randomBytes = function (length) {
							var bytes = new Array(length);
							for (var i = 0; i < length; i++) {
								bytes[i] = Math.floor(Math.random() * 256);
							}
							return bytes;
						};
					}
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
			}], 
			44 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					module.exports = {
						isOpera : function () {
							return global.navigator && 
								/opera/i.test(global.navigator.userAgent);
						}, 
						isKonqueror : function () {
							return global.navigator && 
								/konqueror/i.test(global.navigator.userAgent);
						}, 
						hasDomain : function () {
							if (!global.document) {
								return true;
							}

							try {
								return !!global.document.domain;
							}
							catch (e) {
								return false;
							}
						}
					};
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
			}], 
			45 : [function (require, module, exports) {
				'use strict';

				var JSON3 = require('json3');

				var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g, extraLookup;

				var unrollLookup = function (escapable) {
					var i;
					var unrolled = {
					};
					var c = [];
					for (i = 0; i < 65536; i++) {
						c.push(String.fromCharCode(i));
					}
					escapable.lastIndex = 0;
					c.join('').replace(escapable, function (a) {
						unrolled[a] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
						return '';
					});
					escapable.lastIndex = 0;
					return unrolled;
				};

				module.exports = {
					quote : function (string) {
						var quoted = JSON3.stringify(string);

						extraEscapable.lastIndex = 0;
						if (!extraEscapable.test(quoted)) {
							return quoted;
						}

						if (!extraLookup) {
							extraLookup = unrollLookup(extraEscapable);
						}

						return quoted.replace(extraEscapable, function (a) {
							return extraLookup[a];
						});
					}
				};
			}, {
				"json3" : 58
			}], 
			46 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					var random = require('./random');

					var onUnload = {
					}, afterUnload = false, isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime;


					module.exports = {
						attachEvent : function (event, listener) {
							if (typeof global.addEventListener !== 'undefined') {
								global.addEventListener(event, listener, false);
							}
							else if (global.document && global.attachEvent) {
								global.document.attachEvent('on' + event, listener);
								global.attachEvent('on' + event, listener);
							}
						}, 
						detachEvent : function (event, listener) {
							if (typeof global.addEventListener !== 'undefined') {
								global.removeEventListener(event, listener, false);
							}
							else if (global.document && global.detachEvent) {
								global.document.detachEvent('on' + event, listener);
								global.detachEvent('on' + event, listener);
							}
						}, 
						unloadAdd : function (listener) {
							if (isChromePackagedApp) {
								return null;
							}

							var ref = random.string(8);
							onUnload[ref] = listener;
							if (afterUnload) {
								setTimeout(this.triggerUnloadCallbacks, 0);
							}
							return ref;
						}, 
						unloadDel : function (ref) {
							if (ref in onUnload) {
								delete onUnload[ref];
							}
						}, 
						triggerUnloadCallbacks : function () {
							for (var ref in onUnload) {
								onUnload[ref]();
								delete onUnload[ref];
							}
						}
					};

					var unloadTriggered = function () {
						if (afterUnload) {
							return;
						}
						afterUnload = true;
						module.exports.triggerUnloadCallbacks();
					};

					if (!isChromePackagedApp) {
						module.exports.attachEvent('unload', unloadTriggered);
					}
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"./random" : 50
			}], 
			47 : [function (require, module, exports) {
				(function (process, global) {
					'use strict';

					var eventUtils = require('./event'), JSON3 = require('json3'), browser = require('./browser');


					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:utils:iframe');
					}

					module.exports = {
						WPrefix : '_jp', 
						currentWindowId : null, 
						polluteGlobalNamespace : function () {
							if (!(module.exports.WPrefix in global)) {
								global[module.exports.WPrefix] = {
								};
							}
						}, 
						postMessage : function (type, data) {
							if (global.parent !== global) {
								global.parent.postMessage(JSON3.stringify({
									windowId : module.exports.currentWindowId, 
									type : type, 
									data : data || ''
								}), '*');
							}
							else {
								debug('Cannot postMessage, no parent window.', type, data);
							}
						}, 
						createIframe : function (iframeUrl, errorCallback) {
							var iframe = global.document.createElement('iframe');
							var tref, unloadRef;
							var unattach = function () {
								debug('unattach');
								clearTimeout(tref);
								try {
									iframe.onload = null;
								}
								catch (x) {
								}
								iframe.onerror = null;
							};
							var cleanup = function () {
								debug('cleanup');
								if (iframe) {
									unattach();
									setTimeout(function () {
										if (iframe) {
											iframe.parentNode.removeChild(iframe);
										}
										iframe = null;
									}, 0);
									eventUtils.unloadDel(unloadRef);
								}
							};
							var onerror = function (err) {
								debug('onerror', err);
								if (iframe) {
									cleanup();
									errorCallback(err);
								}
							};
							var post = function (msg, origin) {
								debug('post', msg, origin);
								try {
									setTimeout(function () {
										if (iframe && iframe.contentWindow) {
											iframe.contentWindow.postMessage(msg, origin);
										}
									}, 0);
								}
								catch (x) {
								}
							};

							iframe.src = iframeUrl;
							iframe.style.display = 'none';
							iframe.style.position = 'absolute';
							iframe.onerror = function () {
								onerror('onerror');
							};
							iframe.onload = function () {
								debug('onload');
								clearTimeout(tref);
								tref = setTimeout(function () {
									onerror('onload timeout');
								}, 2000);
							};
							global.document.body.appendChild(iframe);
							tref = setTimeout(function () {
								onerror('timeout');
							}, 15000);
							unloadRef = eventUtils.unloadAdd(cleanup);
							return {
								post : post, 
								cleanup : cleanup, 
								loaded : unattach
							};
						}, 
						createHtmlfile : function (iframeUrl, errorCallback) {
							var axo = ['Active'].concat('Object').join('X');
							var doc = new global[axo]('htmlfile');
							var tref, unloadRef;
							var iframe;
							var unattach = function () {
								clearTimeout(tref);
								iframe.onerror = null;
							};
							var cleanup = function () {
								if (doc) {
									unattach();
									eventUtils.unloadDel(unloadRef);
									iframe.parentNode.removeChild(iframe);
									iframe = doc = null;
									CollectGarbage();
								}
							};
							var onerror = function (r) {
								debug('onerror', r);
								if (doc) {
									cleanup();
									errorCallback(r);
								}
							};
							var post = function (msg, origin) {
								try {
									setTimeout(function () {
										if (iframe && iframe.contentWindow) {
											iframe.contentWindow.postMessage(msg, origin);
										}
									}, 0);
								}
								catch (x) {
								}
							};

							doc.open();
							doc.write('<html><s' + 'cript>' + 
								'document.domain="' + global.document.domain + '";' + 
								'</s' + 'cript></html>');
							doc.close();
							doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
							var c = doc.createElement('div');
							doc.body.appendChild(c);
							iframe = doc.createElement('iframe');
							c.appendChild(iframe);
							iframe.src = iframeUrl;
							iframe.onerror = function () {
								onerror('onerror');
							};
							tref = setTimeout(function () {
								onerror('timeout');
							}, 15000);
							unloadRef = eventUtils.unloadAdd(cleanup);
							return {
								post : post, 
								cleanup : cleanup, 
								loaded : unattach
							};
						}
					};

					module.exports.iframeEnabled = false;
					if (global.document) {
						module.exports.iframeEnabled = (typeof global.postMessage === 'function' || 
							typeof global.postMessage === 'object') && (!browser.isKonqueror());
					}
				}).call(this, {
					env : {
					}
				}, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"./browser" : 44, 
				"./event" : 46, 
				"debug" : 54, 
				"json3" : 58
			}], 
			48 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					var logObject = {
					};
					['log', 'debug', 'warn'].forEach(function (level) {
						var levelExists;

						try {
							levelExists = global.console && global.console[level] && global.console[level].apply;
						}
						catch (e) {
						}

						logObject[level] = levelExists ? function () {
							return global.console[level].apply(global.console, arguments);
						} : (level === 'log' ? function () {
						} : logObject.log);
					});

					module.exports = logObject;
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
			}], 
			49 : [function (require, module, exports) {
				'use strict';

				module.exports = {
					isObject : function (obj) {
						var type = typeof obj;
						return type === 'function' || type === 'object' && !!obj;
					}, 
					extend : function (obj) {
						if (!this.isObject(obj)) {
							return obj;
						}
						var source, prop;
						for (var i = 1, length = arguments.length; i < length; i++) {
							source = arguments[i];
							for (prop in source) {
								if (Object.prototype.hasOwnProperty.call(source, prop)) {
									obj[prop] = source[prop];
								}
							}
						}
						return obj;
					}
				};
			}, {
			}], 
			50 : [function (require, module, exports) {
				'use strict';


				var crypto = require('crypto');

				var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
				module.exports = {
					string : function (length) {
						var max = _randomStringChars.length;
						var bytes = crypto.randomBytes(length);
						var ret = [];
						for (var i = 0; i < length; i++) {
							ret.push(_randomStringChars.substr(bytes[i] % max, 1));
						}
						return ret.join('');
					}, 
					number : function (max) {
						return Math.floor(Math.random() * max);
					}, 
					numberString : function (max) {
						var t = ('' + (max - 1)).length;
						var p = new Array(t + 1).join('0');
						return (p + this.number(max)).slice(-t);
					}
				};
			}, {
				"crypto" : 43
			}], 
			51 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:utils:transport');
					}

					module.exports = function (availableTransports) {
						return {
							filterToEnabled : function (transportsWhitelist, info) {
								var transports = {
									main : [], 
									facade : []
								};
								if (!transportsWhitelist) {
									transportsWhitelist = [];
								}
								else if (typeof transportsWhitelist === 'string') {
									transportsWhitelist = [transportsWhitelist];
								}

								availableTransports.forEach(function (trans) {
									if (!trans) {
										return;
									}

									if (trans.transportName === 'websocket' && info.websocket === false) {
										debug('disabled from server', 'websocket');
										return;
									}

									if (transportsWhitelist.length && 
										transportsWhitelist.indexOf(trans.transportName) === -1) {
										debug('not in whitelist', trans.transportName);
										return;
									}

									if (trans.enabled(info)) {
										debug('enabled', trans.transportName);
										transports.main.push(trans);
										if (trans.facadeTransport) {
											transports.facade.push(trans.facadeTransport);
										}
									}
									else {
										debug('disabled', trans.transportName);
									}
								});
								return transports;
							}
						};
					};
				}).call(this, {
					env : {
					}
				});
			}, {
				"debug" : 54
			}], 
			52 : [function (require, module, exports) {
				(function (process) {
					'use strict';

					var URL = require('url-parse');

					var debug = function () {
					};
					if (process.env.NODE_ENV !== 'production') {
						debug = require('debug')('sockjs-client:utils:url');
					}

					module.exports = {
						getOrigin : function (url) {
							if (!url) {
								return null;
							}

							var p = new URL(url);
							if (p.protocol === 'file:') {
								return null;
							}

							var port = p.port;
							if (!port) {
								port = (p.protocol === 'https:') ? '443' : '80';
							}

							return p.protocol + '//' + p.hostname + ':' + port;
						}, 
						isOriginEqual : function (a, b) {
							var res = this.getOrigin(a) === this.getOrigin(b);
							debug('same', a, b, res);
							return res;
						}, 
						isSchemeEqual : function (a, b) {
							return (a.split(':')[0] === b.split(':')[0]);
						}, 
						addPath : function (url, path) {
							var qs = url.split('?');
							return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
						}, 
						addQuery : function (url, q) {
							return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
						}
					};
				}).call(this, {
					env : {
					}
				});
			}, {
				"debug" : 54, 
				"url-parse" : 59
			}], 
			53 : [function (require, module, exports) {
				module.exports = '1.1.1';
			}, {
			}], 
			54 : [function (require, module, exports) {
				exports = module.exports = require('./debug');
				exports.log = log;
				exports.formatArgs = formatArgs;
				exports.save = save;
				exports.load = load;
				exports.useColors = useColors;
				exports.storage = 'undefined' != typeof chrome
					 && 'undefined' != typeof chrome.storage
					 ? chrome.storage.local
					 : localstorage();



				exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'
				];



				function useColors () {
					return ('WebkitAppearance' in document.documentElement.style) || (window.console && (console.firebug || (console.exception && console.table))) || (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
				}



				exports.formatters.j = function (v) {
					return JSON.stringify(v);
				};




				function formatArgs () {
					var args = arguments;
					var useColors = this.useColors;

					args[0] = (useColors ? '%c' : '')
						 + this.namespace
						 + (useColors ? ' %c' : ' ')
						 + args[0]
						 + (useColors ? '%c ' : ' ')
						 + '+' + exports.humanize(this.diff);

					if (!useColors) {
						return args;
					}

					var c = 'color: ' + this.color;
					args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

					var index = 0;
					var lastC = 0;
					args[0].replace(/%[a-z%]/g, function (match) {
						if ('%%' === match) {
							return;
						}
						index++;
						if ('%c' === match) {
							lastC = index;
						}
					});

					args.splice(lastC, 0, c);
					return args;
				}



				function log () {
					return 'object' === typeof console
						 && console.log
						 && Function.prototype.apply.call(console.log, console, arguments);
				}



				function save (namespaces) {
					try {
						if (null == namespaces) {
							exports.storage.removeItem('debug');
						}
						else {
							exports.storage.debug = namespaces;
						}
					}
					catch (e) {
					}
				}



				function load () {
					var r;
					try {
						r = exports.storage.debug;
					}
					catch (e) {
					}
					return r;
				}



				exports.enable(load());



				function localstorage () {
					try {
						return window.localStorage;
					}
					catch (e) {
					}
				}
			}, {
				"./debug" : 55
			}], 
			55 : [function (require, module, exports) {
				exports = module.exports = debug;
				exports.coerce = coerce;
				exports.disable = disable;
				exports.enable = enable;
				exports.enabled = enabled;
				exports.humanize = require('ms');



				exports.names = [];
				exports.skips = [];



				exports.formatters = {
				};



				var prevColor = 0;



				var prevTime;



				function selectColor () {
					return exports.colors[prevColor++ % exports.colors.length];
				}



				function debug (namespace) {
					function disabled () {
					}
					disabled.enabled = false;

					function enabled () {
						var self = enabled;

						var curr = +new Date();
						var ms = curr - (prevTime || curr);
						self.diff = ms;
						self.prev = prevTime;
						self.curr = curr;
						prevTime = curr;

						if (null == self.useColors) {
							self.useColors = exports.useColors();
						}
						if (null == self.color && self.useColors) {
							self.color = selectColor();
						}

						var args = Array.prototype.slice.call(arguments);

						args[0] = exports.coerce(args[0]);

						if ('string' !== typeof args[0]) {
							args = ['%o'].concat(args);
						}

						var index = 0;
						args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
							if (match === '%%') {
								return match;
							}
							index++;
							var formatter = exports.formatters[format];
							if ('function' === typeof formatter) {
								var val = args[index];
								match = formatter.call(self, val);

								args.splice(index, 1);
								index--;
							}
							return match;
						});

						if ('function' === typeof exports.formatArgs) {
							args = exports.formatArgs.apply(self, args);
						}
						var logFn = enabled.log || exports.log || console.log.bind(console);
						logFn.apply(self, args);
					}
					enabled.enabled = true;

					var fn = exports.enabled(namespace) ? enabled : disabled;

					fn.namespace = namespace;

					return fn;
				}



				function enable (namespaces) {
					exports.save(namespaces);

					var split = (namespaces || '').split(/[\s,]+/);
					var len = split.length;

					for (var i = 0; i < len; i++) {
						if (!split[i]) {
							continue;
						}
						namespaces = split[i].replace(/\*/g, '.*?');
						if (namespaces[0] === '-') {
							exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
						}
						else {
							exports.names.push(new RegExp('^' + namespaces + '$'));
						}
					}
				}



				function disable () {
					exports.enable('');
				}



				function enabled (name) {
					var i, len;
					for (i = 0, len = exports.skips.length; i < len; i++) {
						if (exports.skips[i].test(name)) {
							return false;
						}
					}
					for (i = 0, len = exports.names.length; i < len; i++) {
						if (exports.names[i].test(name)) {
							return true;
						}
					}
					return false;
				}



				function coerce (val) {
					if (val instanceof Error) {
						return val.stack || val.message;
					}
					return val;
				}
			}, {
				"ms" : 56
			}], 
			56 : [function (require, module, exports) {
				var s = 1000;
				var m = s * 60;
				var h = m * 60;
				var d = h * 24;
				var y = d * 365.25;



				module.exports = function (val, options) {
					options = options || {
					};
					if ('string' == typeof val) {
						return parse(val);
					}
					return options.long
						 ? long(val)
						 : short(val);
				};



				function parse (str) {
					str = '' + str;
					if (str.length > 10000) {
						return;
					}
					var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
					if (!match) {
						return;
					}
					var n = parseFloat(match[1]);
					var type = (match[2] || 'ms').toLowerCase();
					switch (type) {
						case 'years':
						case 'year':
						case 'yrs':
						case 'yr':
						case 'y':
							return n * y;
						case 'days':
						case 'day':
						case 'd':
							return n * d;
						case 'hours':
						case 'hour':
						case 'hrs':
						case 'hr':
						case 'h':
							return n * h;
						case 'minutes':
						case 'minute':
						case 'mins':
						case 'min':
						case 'm':
							return n * m;
						case 'seconds':
						case 'second':
						case 'secs':
						case 'sec':
						case 's':
							return n * s;
						case 'milliseconds':
						case 'millisecond':
						case 'msecs':
						case 'msec':
						case 'ms':
							return n;
					}
				}



				function short (ms) {
					if (ms >= d) {
						return Math.round(ms / d) + 'd';
					}
					if (ms >= h) {
						return Math.round(ms / h) + 'h';
					}
					if (ms >= m) {
						return Math.round(ms / m) + 'm';
					}
					if (ms >= s) {
						return Math.round(ms / s) + 's';
					}
					return ms + 'ms';
				}



				function long (ms) {
					return plural(ms, d, 'day')
						 || plural(ms, h, 'hour')
						 || plural(ms, m, 'minute')
						 || plural(ms, s, 'second')
						 || ms + ' ms';
				}



				function plural (ms, n, name) {
					if (ms < n) {
						return;
					}
					if (ms < n * 1.5) {
						return Math.floor(ms / n) + ' ' + name;
					}
					return Math.ceil(ms / n) + ' ' + name + 's';
				}
			}, {
			}], 
			57 : [function (require, module, exports) {
				if (typeof Object.create === 'function') {
					module.exports = function inherits (ctor, superCtor) {
						ctor.super_ = superCtor;
						ctor.prototype = Object.create(superCtor.prototype, {
							constructor : {
								value : ctor, 
								enumerable : false, 
								writable : true, 
								configurable : true
							}
						});
					}
;
				}
				else {
					module.exports = function inherits (ctor, superCtor) {
						ctor.super_ = superCtor;
						var TempCtor = function () {
						};
						TempCtor.prototype = superCtor.prototype;
						ctor.prototype = new TempCtor();
						ctor.prototype.constructor = ctor;
					}
;
				}
			}, {
			}], 
			58 : [function (require, module, exports) {
				(function (global) {
					;
					(function () {
						var isLoader = typeof define === "function" && define.amd;

						var objectTypes = {
							"function" : true, 
							"object" : true
						};

						var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

						var root = objectTypes[typeof window] && window || this, freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

						if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
							root = freeGlobal;
						}

						function runInContext (context, exports) {
							context || (context = root["Object"]());
							exports || (exports = root["Object"]());

							var Number = context["Number"] || root["Number"], String = context["String"] || root["String"], Object = context["Object"] || root["Object"], Date = context["Date"] || root["Date"], SyntaxError = context["SyntaxError"] || root["SyntaxError"], TypeError = context["TypeError"] || root["TypeError"], Math = context["Math"] || root["Math"], nativeJSON = context["JSON"] || root["JSON"];

							if (typeof nativeJSON == "object" && nativeJSON) {
								exports.stringify = nativeJSON.stringify;
								exports.parse = nativeJSON.parse;
							}

							var objectProto = Object.prototype, getClass = objectProto.toString, isProperty, forEach, undef;

							var isExtended = new Date(-3509827334573292);
							try {
								isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && 
									isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
							}
							catch (exception) {
							}

							function has (name) {
								if (has[name] !== undef) {
									return has[name];
								}
								var isSupported;
								if (name == "bug-string-char-index") {
									isSupported = "a"[0] != "a";
								}
								else if (name == "json") {
									isSupported = has("json-stringify") && has("json-parse");
								}
								else {
									var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
									if (name == "json-stringify") {
										var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
										if (stringifySupported) {
											(value = function () {
												return 1;
											}).toJSON = value;
											try {
												stringifySupported = 
													stringify(0) === "0" && 
													stringify(new Number()) === "0" && 
													stringify(new String()) == '""' && 
													stringify(getClass) === undef && 
													stringify(undef) === undef && 
													stringify() === undef && 
													stringify(value) === "1" && 
													stringify([value]) == "[1]" && 
													stringify([undef]) == "[null]" && 
													stringify(null) == "null" && 
													stringify([undef, getClass, null]) == "[null,null,null]" && 
													stringify({
													"a" : [value, true, false, null, "\x00\b\n\f\r\t"]
												}) == serialized && 
													stringify(null, value) === "1" && 
													stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && 
													stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' && 
													stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' && 
													stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && 
													stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
											}
											catch (exception) {
												stringifySupported = false;
											}
										}
										isSupported = stringifySupported;
									}
									if (name == "json-parse") {
										var parse = exports.parse;
										if (typeof parse == "function") {
											try {
												if (parse("0") === 0 && !parse(false)) {
													value = parse(serialized);
													var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
													if (parseSupported) {
														try {
															parseSupported = !parse('"\t"');
														}
														catch (exception) {
														}
														if (parseSupported) {
															try {
																parseSupported = parse("01") !== 1;
															}
															catch (exception) {
															}
														}
														if (parseSupported) {
															try {
																parseSupported = parse("1.") !== 1;
															}
															catch (exception) {
															}
														}
													}
												}
											}
											catch (exception) {
												parseSupported = false;
											}
										}
										isSupported = parseSupported;
									}
								}
								return has[name] = !!isSupported;
							}

							if (!has("json")) {
								var functionClass = "[object Function]", dateClass = "[object Date]", numberClass = "[object Number]", stringClass = "[object String]", arrayClass = "[object Array]", booleanClass = "[object Boolean]";

								var charIndexBuggy = has("bug-string-char-index");

								if (!isExtended) {
									var floor = Math.floor;
									var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
									var getDay = function (year, month) {
										return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
									};
								}

								if (!(isProperty = objectProto.hasOwnProperty)) {
									isProperty = function (property) {
										var members = {
										}, constructor;
										if ((members.__proto__ = null, members.__proto__ = {
											"toString" : 1
										}, members).toString != getClass) {
											isProperty = function (property) {
												var original = this.__proto__, result = property in (this.__proto__ = null, this);
												this.__proto__ = original;
												return result;
											};
										}
										else {
											constructor = members.constructor;
											isProperty = function (property) {
												var parent = (this.constructor || constructor).prototype;
												return property in this && !(property in parent && this[property] === parent[property]);
											};
										}
										members = null;
										return isProperty.call(this, property);
									};
								}

								forEach = function (object, callback) {
									var size = 0, Properties, members, property;
									(Properties = function () {
										this.valueOf = 0;
									}).prototype.valueOf = 0;

									members = new Properties();
									for (property in members) {
										if (isProperty.call(members, property)) {
											size++;
										}
									}
									Properties = members = null;

									if (!size) {
										members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
										forEach = function (object, callback) {
											var isFunction = getClass.call(object) == functionClass, property, length;
											var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
											for (property in object) {
												if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
													callback(property);
												}
											}
											for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) {
											}
										};
									}
									else if (size == 2) {
										forEach = function (object, callback) {
											var members = {
											}, isFunction = getClass.call(object) == functionClass, property;
											for (property in object) {
												if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
													callback(property);
												}
											}
										};
									}
									else {
										forEach = function (object, callback) {
											var isFunction = getClass.call(object) == functionClass, property, isConstructor;
											for (property in object) {
												if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
													callback(property);
												}
											}
											if (isConstructor || isProperty.call(object, (property = "constructor"))) {
												callback(property);
											}
										};
									}
									return forEach(object, callback);
								};

								if (!has("json-stringify")) {
									var Escapes = {
										92 : "\\\\", 
										34 : '\\"', 
										8 : "\\b", 
										12 : "\\f", 
										10 : "\\n", 
										13 : "\\r", 
										9 : "\\t"
									};

									var leadingZeroes = "000000";
									var toPaddedString = function (width, value) {
										return (leadingZeroes + (value || 0)).slice(-width);
									};

									var unicodePrefix = "\\u00";
									var quote = function (value) {
										var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
										var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
										for (; index < length; index++) {
											var charCode = value.charCodeAt(index);
											switch (charCode) {
												case 8:
												case 9:
												case 10:
												case 12:
												case 13:
												case 34:
												case 92:
													result += Escapes[charCode];
													break;
												default:
													if (charCode < 32) {
														result += unicodePrefix + toPaddedString(2, charCode.toString(16));
														break;
													}
													result += useCharIndex ? symbols[index] : value.charAt(index);
											}
										}
										return result + '"';
									};

									var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
										var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
										try {
											value = object[property];
										}
										catch (exception) {
										}
										if (typeof value == "object" && value) {
											className = getClass.call(value);
											if (className == dateClass && !isProperty.call(value, "toJSON")) {
												if (value > -1 / 0 && value < 1 / 0) {
													if (getDay) {
														date = floor(value / 864e5);
														for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) {
														}
														for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) {
														}
														date = 1 + date - getDay(year, month);
														time = (value % 864e5 + 864e5) % 864e5;
														hours = floor(time / 36e5) % 24;
														minutes = floor(time / 6e4) % 60;
														seconds = floor(time / 1e3) % 60;
														milliseconds = time % 1e3;
													}
													else {
														year = value.getUTCFullYear();
														month = value.getUTCMonth();
														date = value.getUTCDate();
														hours = value.getUTCHours();
														minutes = value.getUTCMinutes();
														seconds = value.getUTCSeconds();
														milliseconds = value.getUTCMilliseconds();
													}
													value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + 
														"-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + 
														"T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + 
														"." + toPaddedString(3, milliseconds) + "Z";
												}
												else {
													value = null;
												}
											}
											else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
												value = value.toJSON(property);
											}
										}
										if (callback) {
											value = callback.call(object, property, value);
										}
										if (value === null) {
											return "null";
										}
										className = getClass.call(value);
										if (className == booleanClass) {
											return "" + value;
										}
										else if (className == numberClass) {
											return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
										}
										else if (className == stringClass) {
											return quote("" + value);
										}
										if (typeof value == "object") {
											for (length = stack.length; length--; ) {
												if (stack[length] === value) {
													throw TypeError();
												}
											}
											stack.push(value);
											results = [];
											prefix = indentation;
											indentation += whitespace;
											if (className == arrayClass) {
												for (index = 0, length = value.length; index < length; index++) {
													element = serialize(index, value, callback, properties, whitespace, indentation, stack);
													results.push(element === undef ? "null" : element);
												}
												result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
											}
											else {
												forEach(properties || value, function (property) {
													var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
													if (element !== undef) {
														results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
													}
												});
												result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
											}
											stack.pop();
											return result;
										}
									};

									exports.stringify = function (source, filter, width) {
										var whitespace, callback, properties, className;
										if (objectTypes[typeof filter] && filter) {
											if ((className = getClass.call(filter)) == functionClass) {
												callback = filter;
											}
											else if (className == arrayClass) {
												properties = {
												};
												for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1)) {
												}
											}
										}
										if (width) {
											if ((className = getClass.call(width)) == numberClass) {
												if ((width -= width % 1) > 0) {
													for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") {
													}
												}
											}
											else if (className == stringClass) {
												whitespace = width.length <= 10 ? width : width.slice(0, 10);
											}
										}
										return serialize("", (value = {
										}, value[""] = source, value), callback, properties, whitespace, "", []);
									};
								}

								if (!has("json-parse")) {
									var fromCharCode = String.fromCharCode;

									var Unescapes = {
										92 : "\\", 
										34 : '"', 
										47 : "/", 
										98 : "\b", 
										116 : "\t", 
										110 : "\n", 
										102 : "\f", 
										114 : "\r"
									};

									var Index, Source;

									var abort = function () {
										Index = Source = null;
										throw SyntaxError();
									};

									var lex = function () {
										var source = Source, length = source.length, value, begin, position, isSigned, charCode;
										while (Index < length) {
											charCode = source.charCodeAt(Index);
											switch (charCode) {
												case 9:
												case 10:
												case 13:
												case 32:
													Index++;
													break;
												case 123:
												case 125:
												case 91:
												case 93:
												case 58:
												case 44:
													value = charIndexBuggy ? source.charAt(Index) : source[Index];
													Index++;
													return value;
												case 34:
													for (value = "@", Index++; Index < length; ) {
														charCode = source.charCodeAt(Index);
														if (charCode < 32) {
															abort();
														}
														else if (charCode == 92) {
															charCode = source.charCodeAt(++Index);
															switch (charCode) {
																case 92:
																case 34:
																case 47:
																case 98:
																case 116:
																case 110:
																case 102:
																case 114:
																	value += Unescapes[charCode];
																	Index++;
																	break;
																case 117:
																	begin = ++Index;
																	for (position = Index + 4; Index < position; Index++) {
																		charCode = source.charCodeAt(Index);
																		if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
																			abort();
																		}
																	}
																	value += fromCharCode("0x" + source.slice(begin, Index));
																	break;
																default:
																	abort();
															}
														}
														else {
															if (charCode == 34) {
																break;
															}
															charCode = source.charCodeAt(Index);
															begin = Index;
															while (charCode >= 32 && charCode != 92 && charCode != 34) {
																charCode = source.charCodeAt(++Index);
															}
															value += source.slice(begin, Index);
														}
													}
													if (source.charCodeAt(Index) == 34) {
														Index++;
														return value;
													}
													abort();
												default:
													begin = Index;
													if (charCode == 45) {
														isSigned = true;
														charCode = source.charCodeAt(++Index);
													}
													if (charCode >= 48 && charCode <= 57) {
														if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
															abort();
														}
														isSigned = false;
														for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++) {
														}
														if (source.charCodeAt(Index) == 46) {
															position = ++Index;
															for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++) {
															}
															if (position == Index) {
																abort();
															}
															Index = position;
														}
														charCode = source.charCodeAt(Index);
														if (charCode == 101 || charCode == 69) {
															charCode = source.charCodeAt(++Index);
															if (charCode == 43 || charCode == 45) {
																Index++;
															}
															for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++) {
															}
															if (position == Index) {
																abort();
															}
															Index = position;
														}
														return +source.slice(begin, Index);
													}
													if (isSigned) {
														abort();
													}
													if (source.slice(Index, Index + 4) == "true") {
														Index += 4;
														return true;
													}
													else if (source.slice(Index, Index + 5) == "false") {
														Index += 5;
														return false;
													}
													else if (source.slice(Index, Index + 4) == "null") {
														Index += 4;
														return null;
													}
													abort();
											}
										}
										return "$";
									};

									var get = function (value) {
										var results, hasMembers;
										if (value == "$") {
											abort();
										}
										if (typeof value == "string") {
											if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
												return value.slice(1);
											}
											if (value == "[") {
												results = [];
												for (; ; hasMembers || (hasMembers = true)) {
													value = lex();
													if (value == "]") {
														break;
													}
													if (hasMembers) {
														if (value == ",") {
															value = lex();
															if (value == "]") {
																abort();
															}
														}
														else {
															abort();
														}
													}
													if (value == ",") {
														abort();
													}
													results.push(get(value));
												}
												return results;
											}
											else if (value == "{") {
												results = {
												};
												for (; ; hasMembers || (hasMembers = true)) {
													value = lex();
													if (value == "}") {
														break;
													}
													if (hasMembers) {
														if (value == ",") {
															value = lex();
															if (value == "}") {
																abort();
															}
														}
														else {
															abort();
														}
													}
													if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
														abort();
													}
													results[value.slice(1)] = get(lex());
												}
												return results;
											}
											abort();
										}
										return value;
									};

									var update = function (source, property, callback) {
										var element = walk(source, property, callback);
										if (element === undef) {
											delete source[property];
										}
										else {
											source[property] = element;
										}
									};

									var walk = function (source, property, callback) {
										var value = source[property], length;
										if (typeof value == "object" && value) {
											if (getClass.call(value) == arrayClass) {
												for (length = value.length; length--; ) {
													update(value, length, callback);
												}
											}
											else {
												forEach(value, function (property) {
													update(value, property, callback);
												});
											}
										}
										return callback.call(source, property, value);
									};

									exports.parse = function (source, callback) {
										var result, value;
										Index = 0;
										Source = "" + source;
										result = get(lex());
										if (lex() != "$") {
											abort();
										}
										Index = Source = null;
										return callback && getClass.call(callback) == functionClass ? walk((value = {
										}, value[""] = result, value), "", callback) : result;
									};
								}
							}

							exports["runInContext"] = runInContext;
							return exports;
						}

						if (freeExports && !isLoader) {
							runInContext(root, freeExports);
						}
						else {
							var nativeJSON = root.JSON, previousJSON = root["JSON3"], isRestored = false;

							var JSON3 = runInContext(root, (root["JSON3"] = {
								"noConflict" : function () {
									if (!isRestored) {
										isRestored = true;
										root.JSON = nativeJSON;
										root["JSON3"] = previousJSON;
										nativeJSON = previousJSON = null;
									}
									return JSON3;
								}
							}));

							root.JSON = {
								"parse" : JSON3.parse, 
								"stringify" : JSON3.stringify
							};
						}

						if (isLoader) {
							define(function () {
								return JSON3;
							});
						}
					}).call(this);
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
			}], 
			59 : [function (require, module, exports) {
				'use strict';

				var required = require('requires-port'), lolcation = require('./lolcation'), qs = require('querystringify'), relativere = /^\/(?!\/)/, protocolre = /^([a-z0-9.+-]+:)?(\/\/)?(.*)$/i;


				var instructions = [['#', 'hash'], ['?', 'query'], ['/', 'pathname'], ['@', 'auth', 1], [NaN, 'host', undefined, 1, 1], [/\:(\d+)$/, 'port'], [NaN, 'hostname', undefined, 1, 1]
				];




				function extractProtocol (address) {
					var match = protocolre.exec(address);
					return {
						protocol : match[1] ? match[1].toLowerCase() : '', 
						slashes : !!match[2], 
						rest : match[3] ? match[3] : ''
					};
				}


				function URL (address, location, parser) {
					if (!(this instanceof URL)) {
						return new URL(address, location, parser);
					}

					var relative = relativere.test(address), parse, instruction, index, key, type = typeof location, url = this, i = 0;

					if ('object' !== type && 'string' !== type) {
						parser = location;
						location = null;
					}

					if (parser && 'function' !== typeof parser) {
						parser = qs.parse;
					}

					location = lolcation(location);

					var extracted = extractProtocol(address);
					url.protocol = extracted.protocol || location.protocol || '';
					url.slashes = extracted.slashes || location.slashes;
					address = extracted.rest;

					for (; i < instructions.length; i++) {
						instruction = instructions[i];
						parse = instruction[0];
						key = instruction[1];

						if (parse !== parse) {
							url[key] = address;
						}
						else if ('string' === typeof parse) {
							if (~(index = address.indexOf(parse))) {
								if ('number' === typeof instruction[2]) {
									url[key] = address.slice(0, index);
									address = address.slice(index + instruction[2]);
								}
								else {
									url[key] = address.slice(index);
									address = address.slice(0, index);
								}
							}
						}
						else if (index = parse.exec(address)) {
							url[key] = index[1];
							address = address.slice(0, address.length - index[0].length);
						}

						url[key] = url[key] || (instruction[3] || ('port' === key && relative) ? location[key] || '' : '');

						if (instruction[4]) {
							url[key] = url[key].toLowerCase();
						}
					}

					if (parser) {
						url.query = parser(url.query);
					}

					if (!required(url.port, url.protocol)) {
						url.host = url.hostname;
						url.port = '';
					}

					url.username = url.password = '';
					if (url.auth) {
						instruction = url.auth.split(':');
						url.username = instruction[0] || '';
						url.password = instruction[1] || '';
					}

					url.href = url.toString();
				}


				URL.prototype.set = function set (part, value, fn) {
					var url = this;

					if ('query' === part) {
						if ('string' === typeof value && value.length) {
							value = (fn || qs.parse)(value);
						}

						url[part] = value;
					}
					else if ('port' === part) {
						url[part] = value;

						if (!required(value, url.protocol)) {
							url.host = url.hostname;
							url[part] = '';
						}
						else if (value) {
							url.host = url.hostname + ':' + value;
						}
					}
					else if ('hostname' === part) {
						url[part] = value;

						if (url.port) {
							value += ':' + url.port;
						}
						url.host = value;
					}
					else if ('host' === part) {
						url[part] = value;

						if (/\:\d+/.test(value)) {
							value = value.split(':');
							url.hostname = value[0];
							url.port = value[1];
						}
					}
					else if ('protocol' === part) {
						url.protocol = value;
						url.slashes = !fn;
					}
					else {
						url[part] = value;
					}

					url.href = url.toString();
					return url;
				}
;


				URL.prototype.toString = function toString (stringify) {
					if (!stringify || 'function' !== typeof stringify) {
						stringify = qs.stringify;
					}

					var query, url = this, protocol = url.protocol;

					if (protocol && protocol.charAt(protocol.length - 1) !== ':') {
						protocol += ':';
					}

					var result = protocol + (url.slashes ? '//' : '');

					if (url.username) {
						result += url.username;
						if (url.password) {
							result += ':' + url.password;
						}
						result += '@';
					}

					result += url.hostname;
					if (url.port) {
						result += ':' + url.port;
					}

					result += url.pathname;

					query = 'object' === typeof url.query ? stringify(url.query) : url.query;
					if (query) {
						result += '?' !== query.charAt(0) ? '?' + query : query;
					}

					if (url.hash) {
						result += url.hash;
					}

					return result;
				}
;

				URL.qs = qs;
				URL.location = lolcation;
				module.exports = URL;
			}, {
				"./lolcation" : 60, 
				"querystringify" : 61, 
				"requires-port" : 62
			}], 
			60 : [function (require, module, exports) {
				(function (global) {
					'use strict';

					var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;


					var ignore = {
						hash : 1, 
						query : 1
					}, URL;


					module.exports = function lolcation (loc) {
						loc = loc || global.location || {
						};
						URL = URL || require('./');

						var finaldestination = {
						}, type = typeof loc, key;

						if ('blob:' === loc.protocol) {
							finaldestination = new URL(unescape(loc.pathname), {
							});
						}
						else if ('string' === type) {
							finaldestination = new URL(loc, {
							});
							for (key in ignore) {
								delete finaldestination[key];
							}
						}
						else if ('object' === type) {
							for (key in loc) {
								if (key in ignore) {
									continue;
								}
								finaldestination[key] = loc[key];
							}

							if (finaldestination.slashes === undefined) {
								finaldestination.slashes = slashes.test(loc.href);
							}
						}

						return finaldestination;
					}
;
				}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
				});
			}, {
				"./" : 59
			}], 
			61 : [function (require, module, exports) {
				'use strict';

				var has = Object.prototype.hasOwnProperty;


				function querystring (query) {
					var parser = /([^=?&]+)=([^&]*)/g, result = {
					}, part;

					for (; part = parser.exec(query); result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])) {
					}

					return result;
				}


				function querystringify (obj, prefix) {
					prefix = prefix || '';

					var pairs = [];

					if ('string' !== typeof prefix) {
						prefix = '?';
					}

					for (var key in obj) {
						if (has.call(obj, key)) {
							pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
						}
					}

					return pairs.length ? prefix + pairs.join('&') : '';
				}

				exports.stringify = querystringify;
				exports.parse = querystring;
			}, {
			}], 
			62 : [function (require, module, exports) {
				'use strict';


				module.exports = function required (port, protocol) {
					protocol = protocol.split(':')[0];
					port = +port;

					if (!port) {
						return false;
					}

					switch (protocol) {
						case 'http':
						case 'ws':
							return port !== 80;
						case 'https':
						case 'wss':
							return port !== 443;
						case 'ftp':
							return port !== 21;
						case 'gopher':
							return port !== 70;
						case 'file':
							return false;
					}

					return port !== 0;
				}
;
			}, {
			}]
		}, {
		}, [1])(1);
	});
}
