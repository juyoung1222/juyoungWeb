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


if (!nexacro.Animation) {
	"use strict";

	var _process = true;
	(function (root, factory) {
		if (typeof define === 'function' && define.amd) {
			define([], factory);
		}
		else if (typeof module === 'object' && module.exports) {
			module.exports = factory();
		}
		else {
			root.anime = factory();
		}
	}(this, function () {
		var defaultInstanceSettings = {
			update : undefined, 
			begin : undefined, 
			run : undefined, 
			complete : undefined, 
			loop : 1, 
			direction : 'normal', 
			autoplay : false, 
			offset : 0
		};
		var defaultTweenSettings = {
			duration : 1000, 
			delay : 0, 
			easing : 'easeOutElastic', 
			elasticity : 500, 
			round : 0
		};
		var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];
		var transformString;

		function stringContains (str, text) {
			return str.indexOf(text) > -1;
		}




		var crossBrowserSplit;

		crossBrowserSplit = crossBrowserSplit || function (undef) {
			var nativeSplit = String.prototype.split, compliantExecNpcg = /()??/.exec("")[1] === undef, self;

			self = function (str, separator, limit) {
				if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
					return nativeSplit.call(str, separator, limit);
				}
				var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""), lastLastIndex = 0, separator = new RegExp(separator.source, flags + "g"), separator2, match, lastIndex, lastLength;
				str += "";
				if (!compliantExecNpcg) {
					separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
				}

				limit = limit === undef ? 
					-1 >>> 0 : 
					limit >>> 0;
				while (match = separator.exec(str)) {
					lastIndex = match.index + match[0].length;
					if (lastIndex > lastLastIndex) {
						output.push(str.slice(lastLastIndex, match.index));
						if (!compliantExecNpcg && match.length > 1) {
							match[0].replace(separator2, function () {
								for (var i = 1; i < arguments.length - 2; i++) {
									if (arguments[i] === undef) {
										match[i] = undef;
									}
								}
							});
						}
						if (match.length > 1 && match.index < str.length) {
							Array.prototype.push.apply(output, match.slice(1));
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
				if (lastLastIndex === str.length) {
					if (lastLength || !separator.test("")) {
						output.push("");
					}
				}
				else {
					output.push(str.slice(lastLastIndex));
				}
				return output.length > limit ? output.slice(0, limit) : output;
			};


			return self;
		}();

		var is = {
			arr : function (a) {
				return nexacro._isArray(a);
			}, 
			obj : function (a) {
				return stringContains(Object.prototype.toString.call(a), 'Object');
			}, 
			dom : function (a) {
				return a.nodeType;
			}, 
			str : function (a) {
				return typeof a === 'string';
			}, 
			fnc : function (a) {
				return typeof a === 'function';
			}, 
			und : function (a) {
				return typeof a === 'undefined';
			}, 
			hex : function (a) {
				return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
			}, 
			rgb : function (a) {
				return /^rgb/.test(a);
			}, 
			hsl : function (a) {
				return /^hsl/.test(a);
			}, 
			col : function (a) {
				return (is.hex(a) || is.rgb(a) || is.hsl(a));
			}
		};
		var bezier = function () {
			var kSplineTableSize = 11;
			var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

			function A (aA1, aA2) {
				return 1.0 - 3.0 * aA2 + 3.0 * aA1;
			}
			;
			function B (aA1, aA2) {
				return 3.0 * aA2 - 6.0 * aA1;
			}
			;
			function C (aA1) {
				return 3.0 * aA1;
			}
			;

			function calcBezier (aT, aA1, aA2) {
				return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
			}
			;
			function getSlope (aT, aA1, aA2) {
				return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
			}
			;

			function binarySubdivide (aX, aA, aB, mX1, mX2) {
				var currentX, currentT, i = 0;
				do {
					currentT = aA + (aB - aA) / 2.0;
					currentX = calcBezier(currentT, mX1, mX2) - aX;
					if (currentX > 0.0) {
						aB = currentT;
					}
					else {
						aA = currentT;
					}
					;
				} while (Math.abs(currentX) > 0.0000001 && ++i < 10);
				return currentT;
			}

			function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
				for (var i = 0; i < 4; ++i) {
					var currentSlope = getSlope(aGuessT, mX1, mX2);
					if (currentSlope === 0.0) {
						return aGuessT;
					}
					var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
					aGuessT -= currentX / currentSlope;
				}
				return aGuessT;
			}

			function bezier (mX1, mY1, mX2, mY2) {
				if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
					return;
				}
				var sampleValues = new Array(kSplineTableSize);

				if (mX1 !== mY1 || mX2 !== mY2) {
					for (var i = 0; i < kSplineTableSize; ++i) {
						sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
					}
				}

				function getTForX (aX) {
					var intervalStart = 0.0;
					var currentSample = 1;
					var lastSample = kSplineTableSize - 1;

					for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
						intervalStart += kSampleStepSize;
					}
					--currentSample;

					var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
					var guessForT = intervalStart + dist * kSampleStepSize;
					var initialSlope = getSlope(guessForT, mX1, mX2);

					if (initialSlope >= 0.001) {
						return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
					}
					else if (initialSlope === 0.0) {
						return guessForT;
					}
					else {
						return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
					}
				}

				return function (x) {
					if (mX1 === mY1 && mX2 === mY2) {
						return x;
					}
					if (x === 0) {
						return 0;
					}
					if (x === 1) {
						return 1;
					}
					return calcBezier(getTForX(x), mY1, mY2);
				};
			}
			return bezier;
		}();

		var easings = function () {
			var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Back', 'Elastic', 'Bounce'];

			function elastic (t, p) {
				return t === 0 || t === 1 ? t : -Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2.0) * Math.asin(1))) * (Math.PI * 2)) / p);
			}

			function bounce (t) {
				if (t < (1 / 2.75)) {
					return (7.5625 * t * t);
				}
				else if (t < (2 / 2.75)) {
					t -= (1.5 / 2.75);
					return (7.5625 * (t) * t + 0.75);
				}
				else if (t < (2.5 / 2.75)) {
					t -= (2.25 / 2.75);
					return (7.5625 * (t) * t + .9375);
				}
				else {
					t -= (2.625 / 2.75);
					return (7.5625 * (t) * t + .984375);
				}
			}

			var equations = {
				In : [[0.550, 0.085, 0.680, 0.530], [0.550, 0.055, 0.675, 0.190], [0.895, 0.030, 0.685, 0.220], [0.755, 0.050, 0.855, 0.060], [0.470, 0.000, 0.745, 0.715], [0.950, 0.050, 0.795, 0.035], [0.600, 0.040, 0.980, 0.335], [0.600, -0.280, 0.735, 0.045], elastic, function (t) {
					return 1 - bounce(1 - t);
				}], 
				Out : [[0.250, 0.460, 0.450, 0.940], [0.215, 0.610, 0.355, 1.000], [0.165, 0.840, 0.440, 1.000], [0.230, 1.000, 0.320, 1.000], [0.390, 0.575, 0.565, 1.000], [0.190, 1.000, 0.220, 1.000], [0.075, 0.820, 0.165, 1.000], [0.175, 0.885, 0.320, 1.275], function (t, f) {
					return 1 - elastic(1 - t, f);
				}, bounce
				], 
				InOut : [[0.455, 0.030, 0.515, 0.955], [0.645, 0.045, 0.355, 1.000], [0.770, 0.000, 0.175, 1.000], [0.860, 0.000, 0.070, 1.000], [0.445, 0.050, 0.550, 0.950], [1.000, 0.000, 0.000, 1.000], [0.785, 0.135, 0.150, 0.860], [0.680, -0.550, 0.265, 1.550], function (t, f) {
					return t < .5 ? elastic(t * 2, f) / 2 : 1 - elastic(t * -2 + 2, f) / 2;
				}, function (t) {
					return t < .5 ? (1 - bounce(1 - (t * 2))) * 0.5 : bounce(t * 2 - 1) * 0.5 + 0.5;
				}]
			};
			var functions = {
				linear : bezier(0.250, 0.250, 0.750, 0.750)
			};
			var that = this;

			for (var type in equations) {
				if (equations.hasOwnProperty(type)) {
					for (var i = 0; i < equations[type].length; i++) {
						var f = equations[type][i];
						functions['ease' + type + names[i]] = is.fnc(f) ? f : bezier.apply(that, f);
					}
				}
			}
			return functions;
		}();

		function stringToHyphens (str) {
			return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		function selectString (str) {
			if (is.col(str)) {
				return;
			}
			try {
			}
			catch (e) {
				return;
			}
		}

		function arrayLength (arr) {
			return arr.length;
		}

		function flattenArray (arr) {
			return arr.reduce(function (a, b) {
				return a.concat(is.arr(b) ? flattenArray(b) : b);
			}, []);
		}

		function toArray (o) {
			if (is.arr(o)) {
				return o;
			}
			if (is.str(o)) {
				o = selectString(o) || o;
			}
			return [o];
		}

		function arrayContains (arr, val) {
			return arr.some(function (a) {
				return a === val;
			});
		}

		function objectHas (obj, prop) {
			return obj.hasOwnProperty(prop);
		}

		function cloneObject (o) {
			var clone = {
			};
			for (var p in o) {
				clone[p] = o[p];
			}
			return clone;
		}

		function replaceObjectProps (o1, o2) {
			var o = cloneObject(o1);
			for (var p in o1) {
				o[p] = objectHas(o2, p) ? o2[p] : o1[p];
			}
			return o;
		}

		function mergeObjects (o1, o2) {
			var o = cloneObject(o1);
			for (var p in o2) {
				o[p] = is.und(o1[p]) ? o2[p] : o1[p];
			}
			return o;
		}

		function hexToRgb (hexValue) {
			var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			var hex = hexValue.replace(rgx, function (m, r, g, b) {
				return r + r + g + g + b + b;
			});
			var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			var r = parseInt(rgb[1], 16);
			var g = parseInt(rgb[2], 16);
			var b = parseInt(rgb[3], 16);
			return "rgb(" + r + "," + g + "," + b + ")";
		}

		function hslToRgb (hslValue) {
			var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue);
			var h = parseInt(hsl[1]) / 360;
			var s = parseInt(hsl[2]) / 100;
			var l = parseInt(hsl[3]) / 100;
			function hue2rgb (p, q, t) {
				if (t < 0) {
					t += 1;
				}
				if (t > 1) {
					t -= 1;
				}
				if (t < 1 / 6) {
					return p + (q - p) * 6 * t;
				}
				if (t < 1 / 2) {
					return q;
				}
				if (t < 2 / 3) {
					return p + (q - p) * (2 / 3 - t) * 6;
				}
				return p;
			}
			var r, g, b;
			if (s == 0) {
				r = g = b = l;
			}
			else {
				var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				var p = 2 * l - q;
				r = hue2rgb(p, q, h + 1 / 3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1 / 3);
			}
			return "rgb(" + (r * 255) + "," + (g * 255) + "," + (b * 255) + ")";
		}

		function colorToRgb (val) {
			if (is.rgb(val)) {
				return val;
			}
			if (is.hex(val)) {
				return hexToRgb(val);
			}
			if (is.hsl(val)) {
				return hslToRgb(val);
			}
		}

		function getUnit (val) {
			var split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(val);
			if (split) {
				return split[2];
			}
		}

		function getTransformUnit (propName) {
			if (stringContains(propName, 'translate')) {
				return 'px';
			}
			if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) {
				return 'deg';
			}
		}

		function parseFloatValue (val) {
			return parseFloat(val);
		}

		function minMaxValue (val, min, max) {
			return Math.min(Math.max(val, min), max);
		}

		function getFunctionValue (val, animatable) {
			if (!is.fnc(val)) {
				return val;
			}
			return val(animatable.target, animatable.id, animatable.total);
		}

		function getCSSValue (el, prop) {
			if (prop in el.style) {
				return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
			}
		}

		function getAnimationType (el, prop) {
			if (is.dom(el) && arrayContains(validTransforms, prop)) {
				return 'transform';
			}
			if (is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) {
				return 'attribute';
			}
			if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) {
				return 'css';
			}
			if (el[prop] != null) {
				return 'object';
			}
		}

		function getTransformValue (el, propName) {
			var defaultUnit = getTransformUnit(propName);
			var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + defaultUnit;
			var str = el.style.transform;
			if (!str) {
				return defaultVal;
			}
			var match = [];
			var props = [];
			var values = [];
			var rgx = /(\w+)\((.+?)\)/g;
			while (match = rgx.exec(str)) {
				props.push(match[1]);
				values.push(match[2]);
			}
			var value = values.filter(function (val, i) {
				return (props[i] === propName);
			});
			return arrayLength(value) ? value[0] : defaultVal;
		}

		function getOriginalTargetValue (target, propName) {
			switch (getAnimationType(target, propName)) {
				case 'transform':
					return getTransformValue(target, propName);
				case 'css':
					return getCSSValue(target, propName);
				case 'attribute':
					return target.getAttribute(propName);
			}
			return target[propName] || 0;
		}

		function getRelativeValue (to, from) {
			var operator = /^(\*=|\+=|-=)/.exec(to);
			if (!operator) {
				return to;
			}
			var x = parseFloatValue(from);
			var y = parseFloatValue(to.replace(operator[0], ''));
			switch (operator[0][0]) {
				case '+':
					return x + y;
				case '-':
					return x - y;
				case '*':
					return x * y;
			}
		}

		function validateValue (val, unit) {
			if (is.col(val)) {
				return colorToRgb(val);
			}
			var originalUnit = getUnit(val);
			var unitLess = originalUnit ? val.substr(0, arrayLength(val) - arrayLength(originalUnit)) : val;
			return unit ? unitLess + unit : unitLess;
		}

		function isPath (val) {
			return is.obj(val) && objectHas(val, 'totalLength');
		}

		function setDashoffset (el) {
			var pathLength = el.getTotalLength();
			el.setAttribute('stroke-dasharray', pathLength);
			return pathLength;
		}

		function getPath (path, percent) {
			var el = is.str(path) ? selectString(path)[0] : path;
			var p = percent || 100;
			return function (prop) {
				return {
					el : el, 
					property : prop, 
					totalLength : el.getTotalLength() * (p / 100)
				};
			};
		}

		function getPathProgress (path, progress) {
			function point (offset) {
				var l = progress + offset >= 1 ? progress + offset : 0;
				return path.el.getPointAtLength(l);
			}
			var p = point(0);
			var p0 = point(-1);
			var p1 = point(+1);
			switch (path.property) {
				case 'x':
					return p.x;
				case 'y':
					return p.y;
				case 'angle':
					return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
			}
		}

		function decomposeValue (val, unit) {
			var rgx = /-?\d*\.?\d+/g;
			var value = validateValue((isPath(val) ? val.totalLength : val), unit) + '';
			return {
				original : value, 
				numbers : value.match(rgx) ? value.match(rgx).map(Number) : [0], 
				strings : crossBrowserSplit(value, rgx)
			};
		}

		function recomposeValue (numbers, strings) {
			return strings.reduce(function (a, b, i) {
				return (a + numbers[i - 1] + b);
			});
		}

		function parseTargets (targets) {
			var targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
			return targetsArray.filter(function (item, pos, self) {
				return self.indexOf(item) === pos;
			});
		}

		function getAnimatables (targets) {
			var parsed = parseTargets(targets);
			return parsed.map(function (t, i) {
				return {
					target : t, 
					id : i, 
					total : arrayLength(parsed)
				};
			});
		}

		function normalizePropertyTweens (prop, tweenSettings) {
			var settings = cloneObject(tweenSettings);
			if (is.arr(prop)) {
				var l = arrayLength(prop);
				var isFromTo = (l === 2 && !is.obj(prop[0]));
				if (!isFromTo) {
					if (!is.fnc(tweenSettings.duration)) {
						settings.duration = tweenSettings.duration / l;
					}
				}
				else {
					prop = {
						value : prop
					};
				}
			}
			return toArray(prop).map(function (v, i) {
				var delay = !i ? tweenSettings.delay : 0;
				var obj = is.obj(v) && !isPath(v) ? v : {
					value : v
				};
				if (is.und(obj.delay)) {
					obj.delay = delay;
				}
				return obj;
			}).map(function (k) {
				return mergeObjects(k, settings);
			});
		}

		function getProperties (instanceSettings, tweenSettings, params) {
			var properties = [];
			var settings = mergeObjects(instanceSettings, tweenSettings);
			for (var p in params) {
				if (!objectHas(settings, p) && p !== 'targets') {
					properties.push({
						name : p, 
						offset : settings["offset"], 
						tweens : normalizePropertyTweens(params[p], tweenSettings)
					});
				}
			}
			return properties;
		}

		function normalizePropertyTweens (prop, tweenSettings) {
			var settings = cloneObject(tweenSettings);
			if (is.arr(prop)) {
				var l = arrayLength(prop);
				var isFromTo = (l === 2 && !is.obj(prop[0]));
				if (!isFromTo) {
					if (!is.fnc(tweenSettings.duration)) {
						settings.duration = tweenSettings.duration / l;
					}
				}
				else {
					prop = {
						value : prop
					};
				}
			}
			return toArray(prop).map(function (v, i) {
				var delay = !i ? tweenSettings.delay : 0;
				var obj = is.obj(v) && !isPath(v) ? v : {
					value : v
				};
				if (is.und(obj.delay)) {
					obj.delay = delay;
				}
				return obj;
			}).map(function (k) {
				return mergeObjects(k, settings);
			});
		}

		function getProperties (instanceSettings, tweenSettings, animatables, params) {
			var properties = [];
			var settings = mergeObjects(instanceSettings, tweenSettings);
			animatables.map(function (animatable) {
				var props = params.props[animatable.target.id];
				for (var p in props) {
					properties.push({
						name : p, 
						animatableid : animatable.id, 
						offset : settings["offset"], 
						tweens : normalizePropertyTweens(props[p], tweenSettings)
					});
				}
			});
			return properties;
		}

		function normalizeTweenValues (tween, animatable) {
			var t = {
			};
			for (var p in tween) {
				var value = getFunctionValue(tween[p], animatable);
				if (is.arr(value)) {
					value = value.map(function (v) {
						return getFunctionValue(v, animatable);
					});
					if (arrayLength(value) === 1) {
						value = value[0];
					}
				}
				t[p] = value;
			}
			t.duration = parseFloatValue(t.duration);
			t.delay = parseFloatValue(t.delay);
			return t;
		}

		function normalizeEasing (val) {
			return is.arr(val) ? bezier.apply(this, val) : easings[val];
		}

		function normalizeTweens (prop, animatable) {
			var previousTween;
			return prop.tweens.map(function (t) {
				var tween = normalizeTweenValues(t, animatable);
				var tweenValue = tween.value;
				var originalValue = getOriginalTargetValue(animatable.target, prop.name);
				var previousValue = previousTween ? previousTween.to.original : originalValue;
				var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
				var to = getRelativeValue(is.arr(tweenValue) ? tweenValue[1] : tweenValue, from);
				var unit = getUnit(to) || getUnit(from) || getUnit(originalValue);
				tween.isPath = isPath(tweenValue);
				tween.from = decomposeValue(from, unit);
				tween.to = decomposeValue(to, unit);
				tween.start = previousTween ? previousTween.end : prop.offset;
				tween.end = tween.start + tween.delay + tween.duration;
				tween.easing = normalizeEasing(tween.easing);
				tween.elasticity = (1000 - minMaxValue(tween.elasticity, 1, 999)) / 1000;
				if (is.col(tween.from.original)) {
					tween.round = 1;
				}
				previousTween = tween;
				return tween;
			});
		}

		var setTweenProgress = {
			css : function (t, p, v) {
				t.style[p] = v;
			}, 
			attribute : function (t, p, v) {
				t.setAttribute(p, v);
			}, 
			object : function (t, p, v) {
				(t["set_" + p] && t["set_" + p](v)) || (t[p] = v);
			}, 
			transform : function (t, p, v, transforms, id) {
				if (!transforms[id]) {
					transforms[id] = [];
				}
				transforms[id].push("" + p + "" + v);
			}
		};
		function createAnimation (animatable, prop) {
			var animType = getAnimationType(animatable.target, prop.name);
			if (animType) {
				var tweens = normalizeTweens(prop, animatable);
				return {
					type : animType, 
					property : prop.name, 
					animatable : animatable, 
					tweens : tweens, 
					duration : tweens[arrayLength(tweens) - 1].end, 
					delay : tweens[0].delay
				};
			}
		}

		function getAnimations (animatables, properties) {
			return flattenArray(animatables.map(function (animatable) {
				return properties.map(function (prop) {
					if (prop.animatableid == animatable.id) {
						return createAnimation(animatable, prop);
					}
				});
			})).filter(function (a) {
				return !is.und(a);
			});
		}

		function getInstanceTimings (type, animations, tweenSettings) {
			var math = (type === 'delay') ? Math.min : Math.max;
			return arrayLength(animations) ? math.apply(Math, animations.map(function (anim) {
				return anim[type];
			})) : tweenSettings[type];
		}

		function createNewInstance (params) {
			var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
			var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
			var animatables = getAnimatables(params.targets);
			var properties = getProperties(instanceSettings, tweenSettings, animatables, params);
			var animations = getAnimations(animatables, properties);
			return mergeObjects(instanceSettings, {
				children : [], 
				animatables : animatables, 
				animations : animations, 
				duration : getInstanceTimings('duration', animations, tweenSettings), 
				delay : getInstanceTimings('delay', animations, tweenSettings)
			});
		}

		var activeInstances = [];
		var raf = 0;

		function step (t) {
			var activeLength = arrayLength(activeInstances);
			if (activeLength) {
				var i = 0;
				while (i < activeLength) {
					if (activeInstances[i]) {
						activeInstances[i].tick(Date.now());
					}
					i++;
				}
				raf.start();
			}
			else {
				raf.stop();
				raf = 0;
			}
		}

		function anime (params) {
			var now, startTime, lastTime = 0;
			var instance = createNewInstance(params);
			instance._rafTarget = params._rafTarget;


			instance.reset = function () {
				var direction = instance.direction;
				var loops = instance.loop;
				instance.currentTime = 0;
				instance.progress = 0;
				instance.paused = true;
				instance.began = false;
				instance.completed = false;
				instance.reversed = direction === 'reverse';
				instance.remaining = direction === 'alternate' && loops === 1 ? 2 : loops;
				for (var i = arrayLength(instance.children); i--; ) {
					var child = instance.children[i];
					child.seek(child.offset);
					child.reset();
				}
			};
			function toggleInstanceDirection () {
				instance.reversed = !instance.reversed;
			}

			function adjustTime (time) {
				return instance.reversed ? instance.duration - time : time;
			}

			function syncInstanceChildren (time) {
				var children = instance.children;
				if (time >= instance.currentTime) {
					for (var i = 0; i < arrayLength(children); i++) {
						children[i].seek(time);
					}
				}
				else {
					for (var i = arrayLength(children); i--; ) {
						children[i].seek(time);
					}
				}
			}

			function setAnimationsProgress (insTime) {
				var i = 0;
				var transforms = {
				};
				var animations = instance.animations;
				while (i < arrayLength(animations)) {
					var anim = animations[i];
					var animatable = anim.animatable;
					var tweens = anim.tweens;
					var tween = tweens.filter(function (t) {
						return (insTime < t.end);
					})[0] || tweens[arrayLength(tweens) - 1];
					var isPath = tween.isPath;
					var round = tween.round;
					var elapsed = minMaxValue(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
					var eased = tween.easing(elapsed, tween.elasticity);
					var progress = recomposeValue(tween.to.numbers.map(function (number, p) {
						var start = isPath ? 0 : tween.from.numbers[p];
						var value = start + eased * (number - start);
						if (isPath) {
							value = getPathProgress(tween.value, value);
						}
						if (round) {
							value = Math.round(value * round) / round;
						}
						return value;
					}), tween.to.strings);
					setTweenProgress[anim.type](animatable.target, anim.property, progress, transforms, animatable.id);
					anim.currentValue = progress;
					i++;
				}
				if (transforms) {
					var id;
					for (id in transforms) {
						if (transforms.hasOwnProperty(id)) {
							if (!transformString) {
								var t = 'transform';
								transformString = (getCSSValue(document.body, t) ? t : "-webkit-" + t);
							}
							instance.animatables[id].target.style[transformString] = transforms[id].join(' ');
						}
					}
				}
				instance.currentTime = insTime;
				instance.progress = (insTime / instance.duration) * 100;
			}

			function setCallback (cb) {
				if (instance[cb]) {
					instance[cb](instance);
				}
			}

			function countIteration () {
				if (instance.remaining && instance.remaining !== true) {
					instance.remaining--;
				}
			}

			function setInstanceProgress (engineTime) {
				var insDuration = instance.duration;
				var insOffset = instance.offset;
				var insDelay = instance.delay;
				var insCurrentTime = instance.currentTime;
				var insReversed = instance.reversed;
				var insTime = minMaxValue(adjustTime(engineTime), 0, insDuration);
				if (instance.children) {
					syncInstanceChildren(insTime);
				}
				if (insTime > insOffset && insTime < insDuration) {
					setAnimationsProgress(insTime);
					if (!instance.began && insTime >= insDelay) {
						instance.began = true;
						setCallback('begin');
					}
					setCallback('run');
				}
				else {
					if (insTime <= insOffset && insCurrentTime !== 0) {
						setAnimationsProgress(0);
						if (insReversed) {
							countIteration();
						}
					}
					if (insTime >= insDuration && insCurrentTime !== insDuration) {
						setAnimationsProgress(insDuration);
						if (!insReversed) {
							countIteration();
						}
					}
				}
				if (engineTime >= insDuration) {
					if (instance.remaining) {
						startTime = now;
						if (instance.direction === 'alternate') {
							toggleInstanceDirection();
						}
					}
					else {
						instance.pause();

						if (!instance.completed) {
							instance.completed = true;
							setCallback('complete');
						}
					}
					lastTime = 0;
				}
				setCallback('update');
			}

			instance.tick = function (t) {
				now = t;
				if (!startTime) {
					startTime = now;
				}
				var engineTime = (lastTime + now - startTime) * anime.speed;
				setInstanceProgress(engineTime);
			};
			instance.seek = function (time) {
				setInstanceProgress(adjustTime(time));
			};
			instance.pause = function () {
				var i = activeInstances.indexOf(instance);
				if (i > -1) {
					activeInstances.splice(i, 1);
				}
				instance.paused = true;
			};
			instance.play = function () {
				if (!instance.paused) {
					return;
				}
				instance.paused = false;
				startTime = 0;
				lastTime = adjustTime(instance.currentTime);
				activeInstances.push(instance);
				if (!raf) {
					raf = new nexacro.AnimationFrame(instance._rafTarget, step);
					raf.start();
				}
			};
			instance.reverse = function () {
				toggleInstanceDirection();
				startTime = 0;
				lastTime = adjustTime(instance.currentTime);
			};
			instance.restart = function () {
				instance.pause();
				instance.reset();
				instance.play();
			};
			instance.reset();

			if (instance.autoplay) {
				instance.play();
			}

			return instance;
		}

		function removeTargets (targets) {
			var targetsArray = parseTargets(targets);
			for (var i = arrayLength(activeInstances); i--; ) {
				var instance = activeInstances[i];
				var animations = instance.animations;
				for (var a = arrayLength(animations); a--; ) {
					if (arrayContains(targetsArray, animations[a].animatable.target)) {
						animations.splice(a, 1);
						if (!arrayLength(animations)) {
							instance.pause();
						}
					}
				}
			}
		}

		function timeline (params) {
			var tl = anime(params);
			tl.pause();
			tl.duration = 0;
			tl.add = function (instancesParams) {
				for (var i = 0; i < tl.children.length; i++) {
					tl.children[i].began = true;
					tl.children[i].completed = true;
				}
				var arrInstance = toArray(instancesParams);
				for (var i = 0; i < arrInstance.length; i++) {
					var tlDuration = tl.duration;
					var insOffset = arrInstance[i].offset;
					arrInstance[i].autoplay = false;
					arrInstance[i].offset = is.und(insOffset) ? tlDuration : getRelativeValue(insOffset, tlDuration);
					tl.seek(arrInstance[i].offset);
					var ins = anime(arrInstance[i]);
					if (ins.duration > tlDuration) {
						tl.duration = ins.duration;
					}
					ins.began = true;
					tl.children.push(ins);
				}
				tl.reset();
				tl.seek(0);
				if (tl.autoplay) {
					tl.restart();
				}
				return tl;
			};
			return tl;
		}

		anime.version = '2.0.2';
		anime.speed = 1;
		anime.running = activeInstances;
		anime.remove = removeTargets;
		anime.getValue = getOriginalTargetValue;
		anime.path = getPath;
		anime.setDashoffset = setDashoffset;
		anime.bezier = bezier;
		anime.easings = easings;
		anime.timeline = timeline;
		anime.random = function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		return anime;
	}));




	nexacro.AnimationItem = function (id, componentid, props) {
		nexacro.Object.call(this, id);
		this.componentid = componentid || "";
		this.props = props || "";
	};

	var _pAnimationItem = nexacro._createPrototype(nexacro.Object, nexacro.AnimationItem);
	nexacro.AnimationItem.prototype = _pAnimationItem;
	_pAnimationItem._type_name = "AnimationItem";

	_pAnimationItem.set_componentid = function (componentid) {
		if (this.componentid != componentid) {
			this.componentid = componentid;
		}
	};


	nexacro.AnimationEventInfo = function (obj, id) {
		this.id = this.eventid = id;
		this.fromobject = this.fromreferenceobject = obj;

		this.direction = obj.direction;
		this.loopcount = (obj._anime.loop === true && obj._anime.remaining === true) ? 0 : (obj._anime.loop === false ? 1 : obj.loopcount - obj._anime.remaining + 1);
		this.reversed = obj._anime.reversed;
		this.paused = obj._anime.paused;
		this.currenttime = obj._anime.currentTime;
	};
	var _pAnimationEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.AnimationEventInfo);
	nexacro.AnimationEventInfo.prototype = _pAnimationEventInfo;
	_pAnimationEventInfo._type_name = "AnimationEventInfo";

	nexacro.Animation = function (id, parent) {
		nexacro._EventSinkObject.call(this, id, parent);

		this.items = new nexacro.Collection();
	};
	var _pAnimation = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.Animation);
	nexacro.Animation.prototype = _pAnimation;
	_pAnimation._type_name = "Animation";

	_pAnimation.enableevent = true;
	_pAnimation.items = null;
	_pAnimation.loop = false;
	_pAnimation.loopcount = undefined;
	_pAnimation.direction = "normal";
	_pAnimation.duration = 1000;
	_pAnimation.delay = 0;
	_pAnimation.easing = "easeOutElastic";
	_pAnimation.beziercurve = "";
	_pAnimation.elasticity = 0;


	_pAnimation._anime = null;


	_pAnimation._event_list = {
		"onupdate" : 1, 
		"onrun" : 1, 
		"onbegin" : 1, 
		"oncomplete" : 1
	};


	_pAnimation.on_created = function () {
		this._createAnimeJSObject();
	};

	_pAnimation.destroy = function () {
		nexacro.Object.prototype.destroy.call(this);
		this._anime = null;
	};

	_pAnimation.set_enableevent = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enableevent != v) {
			this.enableevent = v;
		}
	};

	_pAnimation.setTargets = function (obj) {
		this.targets = obj;
	};
	_pAnimation.set_targets = function (v) {
		if (nexacro._isObject(v)) {
			this.setTargets(v);
		}
		else {
			this.targets = nexacro._toString(v);
		}
	};
	_pAnimation.set_loop = function (v) {
		var loop = nexacro._toBoolean(v) ? v : false;

		if (this.loop != loop) {
			this.loop = loop;
		}
	};
	_pAnimation.set_loopcount = function (v) {
		var loopcount = nexacro._isInt(v) ? (v > 0 ? v : undefined) : undefined;

		if (this.loopcount != loopcount) {
			this.loopcount = loopcount;
		}
	};
	_pAnimation.set_direction = function (v) {
		var direction = nexacro._toString(v);

		if (this.direction != direction) {
			this.direction = direction;
		}
	};
	_pAnimation.set_offset = function (v) {
		var offset = nexacro._toInt(v);

		if (this.offset != offset) {
			this.offset = offset;
		}
	};
	_pAnimation.set_duration = function (v) {
		var duration = nexacro._toInt(v);

		if (this.duration != duration) {
			this.duration = duration;
		}
	};
	_pAnimation.set_delay = function (v) {
		var delay = nexacro._toInt(v);

		if (this.delay != delay) {
			this.delay = delay;
		}
	};
	_pAnimation.set_easing = function (v) {
		var easing = nexacro._toString(v);

		if (this.easing != easing) {
			this.easing = easing;
		}
	};
	_pAnimation.set_beziercurve = function (v) {
		var beziercurve = nexacro._toString(v);
		if (this.beziercurve != beziercurve) {
			this.beziercurve = beziercurve;
		}
	};

	_pAnimation.set_elasticity = function (v) {
		var elasticity = nexacro._toInt(v);

		if (this.elasticity != elasticity) {
			this.elasticity = elasticity;
		}
	};
	_pAnimation.set_round = function (v) {
		var round = nexacro._toInt(v);

		if (this.round != round) {
			this.round = round;
		}
	};
	_pAnimation.set_targetprops = function (v) {
		this.targetprops = nexacro._toString(v);
	};
	_pAnimation.play = function () {
		if (!this._anime) {
			this.reset();
		}
		else if (!(this.getPausedStatus() && this.getBeginStatus()) || this.getCompletedStatus()) {
			this.pause();
			this.reset();
		}

		this._anime.play();
	};
	_pAnimation.stop = function () {
		this.pause();
		this.seek(0);
		this.reset();
	};
	_pAnimation.pause = function () {
		if (this._anime) {
			this._anime.pause();
		}
	};
	_pAnimation.restart = function () {
		if (this._anime) {
			this._anime.restart();
		}
	};
	_pAnimation.seek = function (time) {
		this.play();
		this.pause();
		if (this._anime) {
			this._anime.seek(time);
		}
	};
	_pAnimation.reverse = function () {
		if (this._anime) {
			this._anime.reverse();
		}
	};
	_pAnimation.reset = function () {
		if (this._anime) {
			this._anime.reset();
		}
		this._createAnimeJSObject();
	};
	_pAnimation.getReversedStatus = function () {
		if (this._anime) {
			return this._anime.reversed;
		}
		return false;
	};
	_pAnimation.getCurrentTime = function () {
		if (this._anime) {
			return this._anime.currentTime;
		}
		return 0;
	};
	_pAnimation.getPausedStatus = function () {
		if (this._anime) {
			return this._anime.paused;
		}
		return false;
	};
	_pAnimation.getBeginStatus = function () {
		if (this._anime) {
			return this._anime.began;
		}
		return false;
	};
	_pAnimation.getCompletedStatus = function () {
		if (this._anime) {
			return this._anime.completed;
		}
		return false;
	};
	_pAnimation.removeTarget = function (id) {
		var ret = -1;
		var item = this.items[id];

		if (item) {
			this.removeChild(item.componentid);
			ret = this.items.remove_item(id);
		}

		return ret;
	};


	_pAnimation.addTarget = function (id, compobj, props) {
		var ret = -1;
		var item = this.items[id];

		if (!item) {
			item = new nexacro.AnimationItem(id, compobj.id, props);
			ret = this.addChild(compobj.id, compobj);
			if (ret == 0) {
				ret = this.items.add_item(id, item);
			}
		}

		return ret;
	};

	_pAnimation.addChild = function (id, obj) {
		var ret = -1;

		if (id && id.length <= 0) {
			return -1;
		}
		if (!obj) {
			throw nexacro.MakeReferenceError(this, "reference_not_define", id);
		}

		if (this[id]) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		this[id] = obj;

		return 0;
	};




	_pAnimation.removeChild = function (id) {
		if (!id || id.length <= 0) {
			return null;
		}

		var obj = this[id];
		if (!obj) {
			return null;
		}

		delete this[id];
		return obj;
	};

	_pAnimation._on_update = function () {
		if (this._refobject && this._refobject.enableevent) {
			this._refobject.on_fire_update();
		}
	};
	_pAnimation.on_fire_update = function () {
		if (this.onupdate && this.onupdate._has_handlers) {
			var evt = new nexacro.AnimationEventInfo(this, "onupdate");
			this.onupdate._fireEvent(this, evt);
		}
	};
	_pAnimation._on_begin = function () {
		if (this._refobject && this._refobject.enableevent) {
			this._refobject.on_fire_begin();
		}
	};
	_pAnimation.on_fire_begin = function () {
		if (this.onbegin && this.onbegin._has_handlers) {
			var evt = new nexacro.AnimationEventInfo(this, "onbegin");
			this.onbegin._fireEvent(this, evt);
		}
	};
	_pAnimation._on_run = function () {
		if (this._refobject && this._refobject.enableevent) {
			this._refobject.on_fire_run();
		}
	};
	_pAnimation.on_fire_run = function () {
		if (this.onrun && this.onrun._has_handlers) {
			var evt = new nexacro.AnimationEventInfo(this, "onrun");
			this.onrun._fireEvent(this, evt);
		}
	};
	_pAnimation._on_complete = function () {
		if (this._refobject && this._refobject.enableevent) {
			this._refobject.on_fire_complete();
		}
	};
	_pAnimation.on_fire_complete = function () {
		if (this.oncomplete && this.oncomplete._has_handlers) {
			var evt = new nexacro.AnimationEventInfo(this, "oncomplete");
			this.oncomplete._fireEvent(this, evt);
		}
	};
	_pAnimation._makeParamsObject = function (offset) {
		var objParams = {
		};

		if (this._anime) {
			this._anime = null;
		}

		objParams._rafTarget = this.parent;

		var items = this.items;

		var targets = [];
		var props = {
		};
		for (var i = 0, n = items.length; i < n; i++) {
			var item = items[i];
			if (item) {
				targets.push(this[item.componentid]);
				eval('var prop = {' + item.props + '}');
				props[item.componentid] = prop;
			}
		}
		objParams.targets = targets;
		objParams.props = props;

		if (this.loop === true && this.loopcount > 1) {
			objParams.loop = this.loopcount;
		}
		else {
			objParams.loop = this.loop;
		}

		if (this.direction.length > 0) {
			objParams.direction = this.direction;
		}

		if (this.duration > 0) {
			objParams.duration = this.duration;
		}

		if (this.delay > 0) {
			objParams.delay = this.delay;
		}

		if (this.easing == "custom") {
			objParams.easing = this.beziercurve;
		}
		else if (this.easing) {
			objParams.easing = this.easing;
		}

		if (this.elasticity >= 0) {
			objParams.elasticity = this.elasticity;
		}

		if (this.round > 0) {
			objParams.round = this.round;
		}

		if (!isNaN(offset)) {
			if (offset > 0) {
				objParams.offset = "+=" + offset;
			}
		}

		return objParams;
	};
	_pAnimation._createAnimeJSObject = function () {
		var _anime = anime(this._makeParamsObject());
		this._anime = _anime;
		_anime._refobject = this;

		_anime.update = this._on_update;
		_anime.begin = this._on_begin;
		_anime.run = this._on_run;
		_anime.complete = this._on_complete;
	};
	nexacro.AnimationTimelineItem = function (id, animationid, offset) {
		nexacro.Object.call(this, id);
		this.animationid = animationid || "";
		this.offset = offset || 0;
	};
	var _pAnimationTimelineItem = nexacro._createPrototype(nexacro.Object, nexacro.AnimationTimelineItem);
	nexacro.AnimationTimelineItem.prototype = _pAnimationTimelineItem;
	_pAnimationTimelineItem._type_name = "AnimationTimelineItem";

	_pAnimationTimelineItem.animationid = "";
	_pAnimationTimelineItem.offset = 0;

	_pAnimationTimelineItem.set_offset = function (v) {
		if (this.offset != v) {
			this.offset = v;
		}
	};

	nexacro.AnimationTimeline = function (id, parent) {
		nexacro.Animation.call(this, id, parent);
	};
	var _pAnimationTimeline = nexacro._createPrototype(nexacro.Animation, nexacro.AnimationTimeline);
	nexacro.AnimationTimeline.prototype = _pAnimationTimeline;
	_pAnimationTimeline._type_name = "AnimationTimeline";

	_pAnimationTimeline._makeParamsObject = function () {
		var objParams = {
		};

		if (this._anime) {
			this._anime = null;
		}

		objParams._rafTarget = this.parent;

		if (this.loop > -1) {
			objParams.loop = this.loop;
		}

		if (this.direction.length > 0) {
			objParams.direction = this.direction;
		}

		if (this.duration > 0) {
			objParams.duration = this.duration;
		}

		if (this.delay > 0) {
			objParams.delay = this.delay;
		}

		if (this.easing) {
			objParams.easing = this.easing;
		}

		if (this.elasticity >= 0) {
			objParams.elasticity = this.elasticity;
		}

		if (this.round > 0) {
			objParams.round = this.round;
		}


		return objParams;
	};
	_pAnimationTimeline._createAnimeJSObject = function () {
		this._anime = anime.timeline(this._makeParamsObject());
		this._anime._refobject = this;

		for (var i = 0, len = this.items.length; i < len; i++) {
			var item = this.items[i];
			this._anime.add(this[item.animationid]._makeParamsObject(item.offset));
		}
		this._anime.update = this._on_update;
		this._anime.begin = this._on_begin;
		this._anime.run = this._on_run;
		this._anime.complete = this._on_complete;
	};

	_pAnimationTimeline.addTarget = function (id, obj, offset) {
		var ret = -1;
		var item = this.items[id];

		if (!item) {
			item = new nexacro.AnimationTimelineItem(id, obj.id, offset);
			ret = this.addChild(obj.id, obj);
			ret = this.items.add_item(id, item);
		}
		return ret;
	};

	_pAnimationTimeline.insertTarget = function (index, id, obj, offset) {
		var ret = -1;
		var item = this.items[id];

		if (!item) {
			item = new nexacro.AnimationTimelineItem(id, obj.id, offset);
		}
		else {
			this.items.removeTarget(id);
		}

		ret = this.addChild(obj.id, obj);
		ret = this.items.insert_item(index, id, item);
		return ret;
	};
}

if (_process) {
	delete _process;
	delete _pAnimationItem;
	delete _pAnimationEventInfo;
	delete _pAnimation;
	delete _pAnimationTimelineItem;
	delete _pAnimationTimeline;
}
