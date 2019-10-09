/*!
 * 
 *       @supermap/react-iclient.(http://iclient.supermap.io)
 *       Copyright© 2000 - 2019 SuperMap Software Co.Ltd
 *       license: Apache-2.0
 *       version: v10.0.0
 *      
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./libs/mapboxgl/mapbox-gl-enhance.js"), require("React"), require("echarts"), require("./libs/echarts-layer/EchartsLayer.js"), require("./libs/iclient-mapboxgl/iclient9-mapboxgl.min.js"));
	else if(typeof define === 'function' && define.amd)
		define(["./libs/mapboxgl/mapbox-gl-enhance.js", "React", "echarts", "./libs/echarts-layer/EchartsLayer.js", "./libs/iclient-mapboxgl/iclient9-mapboxgl.min.js"], factory);
	else if(typeof exports === 'object')
		exports["Components"] = factory(require("./libs/mapboxgl/mapbox-gl-enhance.js"), require("React"), require("echarts"), require("./libs/echarts-layer/EchartsLayer.js"), require("./libs/iclient-mapboxgl/iclient9-mapboxgl.min.js"));
	else
		root["SuperMap"] = root["SuperMap"] || {}, root["SuperMap"]["Components"] = factory(root["mapboxgl"], root["React"], root["echarts"], root["EchartsLayer"], root["SuperMap"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__25__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__33__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

/*<replacement>*/

var pna = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/


var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;
/*<replacement>*/

var util = __webpack_require__(5);

util.inherits = __webpack_require__(3);
/*</replacement>*/

var Readable = __webpack_require__(18);

var Writable = __webpack_require__(11);

util.inherits(Duplex, Readable);
{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  if (options && options.readable === false) this.readable = false;
  if (options && options.writable === false) this.writable = false;
  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // the no-half-open enforcer

function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();
  pna.nextTick(cb, err);
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;

      var TempCtor = function TempCtor() {};

      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

/* eslint-disable no-proto */


var base64 = __webpack_require__(37);

var ieee754 = __webpack_require__(38);

var isArray = __webpack_require__(17);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */

Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
/*
 * Export kMaxLength after typed array support is determined.
 */

exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function foo() {
        return 42;
      }
    };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }

    that.length = length;
  }

  return that;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */


function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return allocUnsafe(this, arg);
  }

  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/


Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }

  return createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }

  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }

  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }

  return objectToString(arg) === '[object Array]';
}

exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}

exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}

exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function isError(e) {
  return objectToString(e) === '[object Error]' || e instanceof Error;
}

exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}

exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

exports.isPrimitive = isPrimitive;
exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4).Buffer))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (typeof process === 'undefined' || !process.version || process.version.indexOf('v0.') === 0 || process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = {
    nextTick: nextTick
  };
} else {
  module.exports = process;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }

  var len = arguments.length;
  var args, i;

  switch (len) {
    case 0:
    case 1:
      return process.nextTick(fn);

    case 2:
      return process.nextTick(function afterTickOne() {
        fn.call(null, arg1);
      });

    case 3:
      return process.nextTick(function afterTickTwo() {
        fn.call(null, arg1, arg2);
      });

    case 4:
      return process.nextTick(function afterTickThree() {
        fn.call(null, arg1, arg2, arg3);
      });

    default:
      args = new Array(len - 1);
      i = 0;

      while (i < args.length) {
        args[i++] = arguments[i];
      }

      return process.nextTick(function afterTick() {
        fn.apply(null, args);
      });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function get() {
    return defaultMaxListeners;
  },
  set: function set(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      ReflectApply(listeners[i], this, args);
    }
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = $getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  var args = [];

  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) {
    copy[i] = arr[i];
  }

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1];
  }

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(11);
exports.Duplex = __webpack_require__(2);
exports.Transform = __webpack_require__(21);
exports.PassThrough = __webpack_require__(47);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(4);

var Buffer = buffer.Buffer; // alternative to using Object.keys for old browsers

function copyProps(src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}

if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer(arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length);
} // Copy static methods from Buffer


copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number');
  }

  return Buffer(arg, encodingOrOffset, length);
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  var buf = Buffer(size);

  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }

  return buf;
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return Buffer(size);
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return buffer.SlowBuffer(size);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

/*<replacement>*/

var pna = __webpack_require__(7);
/*</replacement>*/


module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/

var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var util = __webpack_require__(5);

util.inherits = __webpack_require__(3);
/*</replacement>*/

/*<replacement>*/

var internalUtil = {
  deprecate: __webpack_require__(45)
};
/*</replacement>*/

/*<replacement>*/

var Stream = __webpack_require__(19);
/*</replacement>*/

/*<replacement>*/


var Buffer = __webpack_require__(10).Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/


var destroyImpl = __webpack_require__(20);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(2);
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  var isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm; // cast to ints.

  this.highWaterMark = Math.floor(this.highWaterMark); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(2); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.

  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end'); // TODO: defer error events consistently everywhere, not just the cb

  stream.emit('error', er);
  pna.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }

  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }

  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;
  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      stream.emit('error', err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }

  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6), __webpack_require__(43).setImmediate, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/*<replacement>*/

var Buffer = __webpack_require__(46).Buffer;
/*</replacement>*/


var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;

  switch (encoding && encoding.toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
    case 'raw':
      return true;

    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;

  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';

      case 'latin1':
      case 'binary':
        return 'latin1';

      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;

      default:
        if (retried) return; // undefined

        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
}

; // Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings

function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);

  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
} // StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.


exports.StringDecoder = StringDecoder;

function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;

  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;

    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;

    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;

    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }

  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;

  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }

  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End; // Returns only complete characters in a Buffer

StringDecoder.prototype.text = utf8Text; // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer

StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }

  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
}; // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.


function utf8CheckByte(_byte) {
  if (_byte <= 0x7F) return 0;else if (_byte >> 5 === 0x06) return 2;else if (_byte >> 4 === 0x0E) return 3;else if (_byte >> 3 === 0x1E) return 4;
  return _byte >> 6 === 0x02 ? -1 : -2;
} // Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.


function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }

  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }

  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }

    return nb;
  }

  return 0;
} // Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.


function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return "\uFFFD";
  }

  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return "\uFFFD";
    }

    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return "\uFFFD";
      }
    }
  }
} // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.


function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;

  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }

  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
} // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.


function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
} // For UTF-8, a replacement character is added when ending on a partial
// character.


function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + "\uFFFD";
  return r;
} // UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.


function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);

    if (r) {
      var c = r.charCodeAt(r.length - 1);

      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }

    return r;
  }

  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
} // For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.


function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';

  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }

  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;

  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }

  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
} // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)


function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(14).isArray;

module.exports = {
  copyOptions: function copyOptions(options) {
    var key,
        copy = {};

    for (key in options) {
      if (options.hasOwnProperty(key)) {
        copy[key] = options[key];
      }
    }

    return copy;
  },
  ensureFlagExists: function ensureFlagExists(item, options) {
    if (!(item in options) || typeof options[item] !== 'boolean') {
      options[item] = false;
    }
  },
  ensureSpacesExists: function ensureSpacesExists(options) {
    if (!('spaces' in options) || typeof options.spaces !== 'number' && typeof options.spaces !== 'string') {
      options.spaces = 0;
    }
  },
  ensureAlwaysArrayExists: function ensureAlwaysArrayExists(options) {
    if (!('alwaysArray' in options) || typeof options.alwaysArray !== 'boolean' && !isArray(options.alwaysArray)) {
      options.alwaysArray = false;
    }
  },
  ensureKeyExists: function ensureKeyExists(key, options) {
    if (!(key + 'Key' in options) || typeof options[key + 'Key'] !== 'string') {
      options[key + 'Key'] = options.compact ? '_' + key : key;
    }
  },
  checkFnExists: function checkFnExists(key, options) {
    return key + 'Fn' in options;
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {
  isArray: function isArray(value) {
    if (Array.isArray) {
      return Array.isArray(value);
    } // fallback for older browsers like  IE 8


    return Object.prototype.toString.call(value) === '[object Array]';
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var sax = __webpack_require__(36);

var expat
/*= require('node-expat');*/
= {
  on: function on() {},
  parse: function parse() {}
};

var helper = __webpack_require__(13);

var isArray = __webpack_require__(14).isArray;

var options;
var pureJsParser = true;
var currentElement;

function validateOptions(userOptions) {
  options = helper.copyOptions(userOptions);
  helper.ensureFlagExists('ignoreDeclaration', options);
  helper.ensureFlagExists('ignoreInstruction', options);
  helper.ensureFlagExists('ignoreAttributes', options);
  helper.ensureFlagExists('ignoreText', options);
  helper.ensureFlagExists('ignoreComment', options);
  helper.ensureFlagExists('ignoreCdata', options);
  helper.ensureFlagExists('ignoreDoctype', options);
  helper.ensureFlagExists('compact', options);
  helper.ensureFlagExists('alwaysChildren', options);
  helper.ensureFlagExists('addParent', options);
  helper.ensureFlagExists('trim', options);
  helper.ensureFlagExists('nativeType', options);
  helper.ensureFlagExists('nativeTypeAttributes', options);
  helper.ensureFlagExists('sanitize', options);
  helper.ensureFlagExists('instructionHasAttributes', options);
  helper.ensureFlagExists('captureSpacesBetweenElements', options);
  helper.ensureAlwaysArrayExists(options);
  helper.ensureKeyExists('declaration', options);
  helper.ensureKeyExists('instruction', options);
  helper.ensureKeyExists('attributes', options);
  helper.ensureKeyExists('text', options);
  helper.ensureKeyExists('comment', options);
  helper.ensureKeyExists('cdata', options);
  helper.ensureKeyExists('doctype', options);
  helper.ensureKeyExists('type', options);
  helper.ensureKeyExists('name', options);
  helper.ensureKeyExists('elements', options);
  helper.ensureKeyExists('parent', options);
  helper.checkFnExists('doctype', options);
  helper.checkFnExists('instruction', options);
  helper.checkFnExists('cdata', options);
  helper.checkFnExists('comment', options);
  helper.checkFnExists('text', options);
  helper.checkFnExists('instructionName', options);
  helper.checkFnExists('elementName', options);
  helper.checkFnExists('attributeName', options);
  helper.checkFnExists('attributeValue', options);
  helper.checkFnExists('attributes', options);
  return options;
}

function nativeType(value) {
  var nValue = Number(value);

  if (!isNaN(nValue)) {
    return nValue;
  }

  var bValue = value.toLowerCase();

  if (bValue === 'true') {
    return true;
  } else if (bValue === 'false') {
    return false;
  }

  return value;
}

function addField(type, value) {
  var key;

  if (options.compact) {
    if (!currentElement[options[type + 'Key']] && (isArray(options.alwaysArray) ? options.alwaysArray.indexOf(options[type + 'Key']) !== -1 : options.alwaysArray)) {
      currentElement[options[type + 'Key']] = [];
    }

    if (currentElement[options[type + 'Key']] && !isArray(currentElement[options[type + 'Key']])) {
      currentElement[options[type + 'Key']] = [currentElement[options[type + 'Key']]];
    }

    if (type + 'Fn' in options && typeof value === 'string') {
      value = options[type + 'Fn'](value, currentElement);
    }

    if (type === 'instruction' && ('instructionFn' in options || 'instructionNameFn' in options)) {
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          if ('instructionFn' in options) {
            value[key] = options.instructionFn(value[key], key, currentElement);
          } else {
            var temp = value[key];
            delete value[key];
            value[options.instructionNameFn(key, temp, currentElement)] = temp;
          }
        }
      }
    }

    if (isArray(currentElement[options[type + 'Key']])) {
      currentElement[options[type + 'Key']].push(value);
    } else {
      currentElement[options[type + 'Key']] = value;
    }
  } else {
    if (!currentElement[options.elementsKey]) {
      currentElement[options.elementsKey] = [];
    }

    var element = {};
    element[options.typeKey] = type;

    if (type === 'instruction') {
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          break;
        }
      }

      element[options.nameKey] = 'instructionNameFn' in options ? options.instructionNameFn(key, value, currentElement) : key;

      if (options.instructionHasAttributes) {
        element[options.attributesKey] = value[key][options.attributesKey];

        if ('instructionFn' in options) {
          element[options.attributesKey] = options.instructionFn(element[options.attributesKey], key, currentElement);
        }
      } else {
        if ('instructionFn' in options) {
          value[key] = options.instructionFn(value[key], key, currentElement);
        }

        element[options.instructionKey] = value[key];
      }
    } else {
      if (type + 'Fn' in options) {
        value = options[type + 'Fn'](value, currentElement);
      }

      element[options[type + 'Key']] = value;
    }

    if (options.addParent) {
      element[options.parentKey] = currentElement;
    }

    currentElement[options.elementsKey].push(element);
  }
}

function manipulateAttributes(attributes) {
  if ('attributesFn' in options && attributes) {
    attributes = options.attributesFn(attributes, currentElement);
  }

  if ((options.trim || 'attributeValueFn' in options || 'attributeNameFn' in options || options.nativeTypeAttributes) && attributes) {
    var key;

    for (key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        if (options.trim) attributes[key] = attributes[key].trim();

        if (options.nativeTypeAttributes) {
          attributes[key] = nativeType(attributes[key]);
        }

        if ('attributeValueFn' in options) attributes[key] = options.attributeValueFn(attributes[key], key, currentElement);

        if ('attributeNameFn' in options) {
          var temp = attributes[key];
          delete attributes[key];
          attributes[options.attributeNameFn(key, attributes[key], currentElement)] = temp;
        }
      }
    }
  }

  return attributes;
}

function onInstruction(instruction) {
  var attributes = {};

  if (instruction.body && (instruction.name.toLowerCase() === 'xml' || options.instructionHasAttributes)) {
    var attrsRegExp = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g;
    var match;

    while ((match = attrsRegExp.exec(instruction.body)) !== null) {
      attributes[match[1]] = match[2] || match[3] || match[4];
    }

    attributes = manipulateAttributes(attributes);
  }

  if (instruction.name.toLowerCase() === 'xml') {
    if (options.ignoreDeclaration) {
      return;
    }

    currentElement[options.declarationKey] = {};

    if (Object.keys(attributes).length) {
      currentElement[options.declarationKey][options.attributesKey] = attributes;
    }

    if (options.addParent) {
      currentElement[options.declarationKey][options.parentKey] = currentElement;
    }
  } else {
    if (options.ignoreInstruction) {
      return;
    }

    if (options.trim) {
      instruction.body = instruction.body.trim();
    }

    var value = {};

    if (options.instructionHasAttributes && Object.keys(attributes).length) {
      value[instruction.name] = {};
      value[instruction.name][options.attributesKey] = attributes;
    } else {
      value[instruction.name] = instruction.body;
    }

    addField('instruction', value);
  }
}

function onStartElement(name, attributes) {
  var element;

  if (typeof name === 'object') {
    attributes = name.attributes;
    name = name.name;
  }

  attributes = manipulateAttributes(attributes);

  if ('elementNameFn' in options) {
    name = options.elementNameFn(name, currentElement);
  }

  if (options.compact) {
    element = {};

    if (!options.ignoreAttributes && attributes && Object.keys(attributes).length) {
      element[options.attributesKey] = {};
      var key;

      for (key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          element[options.attributesKey][key] = attributes[key];
        }
      }
    }

    if (!(name in currentElement) && (isArray(options.alwaysArray) ? options.alwaysArray.indexOf(name) !== -1 : options.alwaysArray)) {
      currentElement[name] = [];
    }

    if (currentElement[name] && !isArray(currentElement[name])) {
      currentElement[name] = [currentElement[name]];
    }

    if (isArray(currentElement[name])) {
      currentElement[name].push(element);
    } else {
      currentElement[name] = element;
    }
  } else {
    if (!currentElement[options.elementsKey]) {
      currentElement[options.elementsKey] = [];
    }

    element = {};
    element[options.typeKey] = 'element';
    element[options.nameKey] = name;

    if (!options.ignoreAttributes && attributes && Object.keys(attributes).length) {
      element[options.attributesKey] = attributes;
    }

    if (options.alwaysChildren) {
      element[options.elementsKey] = [];
    }

    currentElement[options.elementsKey].push(element);
  }

  element[options.parentKey] = currentElement; // will be deleted in onEndElement() if !options.addParent

  currentElement = element;
}

function onText(text) {
  if (options.ignoreText) {
    return;
  }

  if (!text.trim() && !options.captureSpacesBetweenElements) {
    return;
  }

  if (options.trim) {
    text = text.trim();
  }

  if (options.nativeType) {
    text = nativeType(text);
  }

  if (options.sanitize) {
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  addField('text', text);
}

function onComment(comment) {
  if (options.ignoreComment) {
    return;
  }

  if (options.trim) {
    comment = comment.trim();
  }

  addField('comment', comment);
}

function onEndElement(name) {
  var parentElement = currentElement[options.parentKey];

  if (!options.addParent) {
    delete currentElement[options.parentKey];
  }

  currentElement = parentElement;
}

function onCdata(cdata) {
  if (options.ignoreCdata) {
    return;
  }

  if (options.trim) {
    cdata = cdata.trim();
  }

  addField('cdata', cdata);
}

function onDoctype(doctype) {
  if (options.ignoreDoctype) {
    return;
  }

  doctype = doctype.replace(/^ /, '');

  if (options.trim) {
    doctype = doctype.trim();
  }

  addField('doctype', doctype);
}

function onError(error) {
  error.note = error; //console.error(error);
}

module.exports = function (xml, userOptions) {
  var parser = pureJsParser ? sax.parser(true, {}) : parser = new expat.Parser('UTF-8');
  var result = {};
  currentElement = result;
  options = validateOptions(userOptions);

  if (pureJsParser) {
    parser.opt = {
      strictEntities: true
    };
    parser.onopentag = onStartElement;
    parser.ontext = onText;
    parser.oncomment = onComment;
    parser.onclosetag = onEndElement;
    parser.onerror = onError;
    parser.oncdata = onCdata;
    parser.ondoctype = onDoctype;
    parser.onprocessinginstruction = onInstruction;
  } else {
    parser.on('startElement', onStartElement);
    parser.on('text', onText);
    parser.on('comment', onComment);
    parser.on('endElement', onEndElement);
    parser.on('error', onError); //parser.on('startCdata', onStartCdata);
    //parser.on('endCdata', onEndCdata);
    //parser.on('entityDecl', onEntityDecl);
  }

  if (pureJsParser) {
    parser.write(xml).close();
  } else {
    if (!parser.parse(xml)) {
      throw new Error('XML parsing error: ' + parser.getError());
    }
  }

  if (result[options.elementsKey]) {
    var temp = result[options.elementsKey];
    delete result[options.elementsKey];
    result[options.elementsKey] = temp;
    delete result.text;
  }

  return result;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/*<replacement>*/

var pna = __webpack_require__(7);
/*</replacement>*/


module.exports = Readable;
/*<replacement>*/

var isArray = __webpack_require__(17);
/*</replacement>*/

/*<replacement>*/


var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = __webpack_require__(8).EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = __webpack_require__(19);
/*</replacement>*/

/*<replacement>*/


var Buffer = __webpack_require__(10).Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/


var util = __webpack_require__(5);

util.inherits = __webpack_require__(3);
/*</replacement>*/

/*<replacement>*/

var debugUtil = __webpack_require__(40);

var debug = void 0;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = __webpack_require__(41);

var destroyImpl = __webpack_require__(20);

var StringDecoder;
util.inherits(Readable, Stream);
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(2);
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  var isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm; // cast to ints.

  this.highWaterMark = Math.floor(this.highWaterMark); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(12).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(2);
  if (!(this instanceof Readable)) return new Readable(options);
  this._readableState = new ReadableState(options, this); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }

  return er;
} // if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.


function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(12).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
}; // Don't raise the hwm > 8MB


var MAX_HWM = 0x800000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true; // emit 'readable' now to make sure it gets picked up.

  emitReadable(stream);
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;

  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;else len = state.length;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  } // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.


  var increasedAwaitDrain = false;
  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);

    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;

    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;

      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }

  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {}
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList; // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }
  return ret;
} // Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.


function fromListPartial(n, list, hasStrings) {
  var ret;

  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }

  return ret;
} // Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.


function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;

  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;

    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }

      break;
    }

    ++c;
  }

  list.length -= c;
  return ret;
} // Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.


function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;

  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;

    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }

      break;
    }

    ++c;
  }

  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState; // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.

  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(6)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8).EventEmitter;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*<replacement>*/

var pna = __webpack_require__(7);
/*</replacement>*/
// undocumented cb() API, needed for core, not for public API


function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);

      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.


module.exports = Transform;

var Duplex = __webpack_require__(2);
/*<replacement>*/


var util = __webpack_require__(5);

util.inherits = __webpack_require__(3);
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);

    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');
  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');
  return stream.push(null);
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__(13);

var isArray = __webpack_require__(14).isArray;

var currentElement, currentElementName;

function validateOptions(userOptions) {
  var options = helper.copyOptions(userOptions);
  helper.ensureFlagExists('ignoreDeclaration', options);
  helper.ensureFlagExists('ignoreInstruction', options);
  helper.ensureFlagExists('ignoreAttributes', options);
  helper.ensureFlagExists('ignoreText', options);
  helper.ensureFlagExists('ignoreComment', options);
  helper.ensureFlagExists('ignoreCdata', options);
  helper.ensureFlagExists('ignoreDoctype', options);
  helper.ensureFlagExists('compact', options);
  helper.ensureFlagExists('indentText', options);
  helper.ensureFlagExists('indentCdata', options);
  helper.ensureFlagExists('indentAttributes', options);
  helper.ensureFlagExists('indentInstruction', options);
  helper.ensureFlagExists('fullTagEmptyElement', options);
  helper.ensureFlagExists('noQuotesForNativeAttributes', options);
  helper.ensureSpacesExists(options);

  if (typeof options.spaces === 'number') {
    options.spaces = Array(options.spaces + 1).join(' ');
  }

  helper.ensureKeyExists('declaration', options);
  helper.ensureKeyExists('instruction', options);
  helper.ensureKeyExists('attributes', options);
  helper.ensureKeyExists('text', options);
  helper.ensureKeyExists('comment', options);
  helper.ensureKeyExists('cdata', options);
  helper.ensureKeyExists('doctype', options);
  helper.ensureKeyExists('type', options);
  helper.ensureKeyExists('name', options);
  helper.ensureKeyExists('elements', options);
  helper.checkFnExists('doctype', options);
  helper.checkFnExists('instruction', options);
  helper.checkFnExists('cdata', options);
  helper.checkFnExists('comment', options);
  helper.checkFnExists('text', options);
  helper.checkFnExists('instructionName', options);
  helper.checkFnExists('elementName', options);
  helper.checkFnExists('attributeName', options);
  helper.checkFnExists('attributeValue', options);
  helper.checkFnExists('attributes', options);
  helper.checkFnExists('fullTagEmptyElement', options);
  return options;
}

function writeIndentation(options, depth, firstLine) {
  return (!firstLine && options.spaces ? '\n' : '') + Array(depth + 1).join(options.spaces);
}

function writeAttributes(attributes, options, depth) {
  if (options.ignoreAttributes) {
    return '';
  }

  if ('attributesFn' in options) {
    attributes = options.attributesFn(attributes, currentElementName, currentElement);
  }

  var key,
      attr,
      attrName,
      quote,
      result = [];

  for (key in attributes) {
    if (attributes.hasOwnProperty(key) && attributes[key] !== null && attributes[key] !== undefined) {
      quote = options.noQuotesForNativeAttributes && typeof attributes[key] !== 'string' ? '' : '"';
      attr = '' + attributes[key]; // ensure number and boolean are converted to String

      attr = attr.replace(/"/g, '&quot;');
      attrName = 'attributeNameFn' in options ? options.attributeNameFn(key, attr, currentElementName, currentElement) : key;
      result.push(options.spaces && options.indentAttributes ? writeIndentation(options, depth + 1, false) : ' ');
      result.push(attrName + '=' + quote + ('attributeValueFn' in options ? options.attributeValueFn(attr, key, currentElementName, currentElement) : attr) + quote);
    }
  }

  if (attributes && Object.keys(attributes).length && options.spaces && options.indentAttributes) {
    result.push(writeIndentation(options, depth, false));
  }

  return result.join('');
}

function writeDeclaration(declaration, options, depth) {
  currentElement = declaration;
  currentElementName = 'xml';
  return options.ignoreDeclaration ? '' : '<?' + 'xml' + writeAttributes(declaration[options.attributesKey], options, depth) + '?>';
}

function writeInstruction(instruction, options, depth) {
  if (options.ignoreInstruction) {
    return '';
  }

  var key;

  for (key in instruction) {
    if (instruction.hasOwnProperty(key)) {
      break;
    }
  }

  var instructionName = 'instructionNameFn' in options ? options.instructionNameFn(key, instruction[key], currentElementName, currentElement) : key;

  if (typeof instruction[key] === 'object') {
    currentElement = instruction;
    currentElementName = instructionName;
    return '<?' + instructionName + writeAttributes(instruction[key][options.attributesKey], options, depth) + '?>';
  } else {
    var instructionValue = instruction[key] ? instruction[key] : '';
    if ('instructionFn' in options) instructionValue = options.instructionFn(instructionValue, key, currentElementName, currentElement);
    return '<?' + instructionName + (instructionValue ? ' ' + instructionValue : '') + '?>';
  }
}

function writeComment(comment, options) {
  return options.ignoreComment ? '' : '<!--' + ('commentFn' in options ? options.commentFn(comment, currentElementName, currentElement) : comment) + '-->';
}

function writeCdata(cdata, options) {
  return options.ignoreCdata ? '' : '<![CDATA[' + ('cdataFn' in options ? options.cdataFn(cdata, currentElementName, currentElement) : cdata.replace(']]>', ']]]]><![CDATA[>')) + ']]>';
}

function writeDoctype(doctype, options) {
  return options.ignoreDoctype ? '' : '<!DOCTYPE ' + ('doctypeFn' in options ? options.doctypeFn(doctype, currentElementName, currentElement) : doctype) + '>';
}

function writeText(text, options) {
  if (options.ignoreText) return '';
  text = '' + text; // ensure Number and Boolean are converted to String

  text = text.replace(/&amp;/g, '&'); // desanitize to avoid double sanitization

  text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return 'textFn' in options ? options.textFn(text, currentElementName, currentElement) : text;
}

function hasContent(element, options) {
  var i;

  if (element.elements && element.elements.length) {
    for (i = 0; i < element.elements.length; ++i) {
      switch (element.elements[i][options.typeKey]) {
        case 'text':
          if (options.indentText) {
            return true;
          }

          break;
        // skip to next key

        case 'cdata':
          if (options.indentCdata) {
            return true;
          }

          break;
        // skip to next key

        case 'instruction':
          if (options.indentInstruction) {
            return true;
          }

          break;
        // skip to next key

        case 'doctype':
        case 'comment':
        case 'element':
          return true;

        default:
          return true;
      }
    }
  }

  return false;
}

function writeElement(element, options, depth) {
  currentElement = element;
  currentElementName = element.name;
  var xml = [],
      elementName = 'elementNameFn' in options ? options.elementNameFn(element.name, element) : element.name;
  xml.push('<' + elementName);

  if (element[options.attributesKey]) {
    xml.push(writeAttributes(element[options.attributesKey], options, depth));
  }

  var withClosingTag = element[options.elementsKey] && element[options.elementsKey].length || element[options.attributesKey] && element[options.attributesKey]['xml:space'] === 'preserve';

  if (!withClosingTag) {
    if ('fullTagEmptyElementFn' in options) {
      withClosingTag = options.fullTagEmptyElementFn(element.name, element);
    } else {
      withClosingTag = options.fullTagEmptyElement;
    }
  }

  if (withClosingTag) {
    xml.push('>');

    if (element[options.elementsKey] && element[options.elementsKey].length) {
      xml.push(writeElements(element[options.elementsKey], options, depth + 1));
      currentElement = element;
      currentElementName = element.name;
    }

    xml.push(options.spaces && hasContent(element, options) ? '\n' + Array(depth + 1).join(options.spaces) : '');
    xml.push('</' + elementName + '>');
  } else {
    xml.push('/>');
  }

  return xml.join('');
}

function writeElements(elements, options, depth, firstLine) {
  return elements.reduce(function (xml, element) {
    var indent = writeIndentation(options, depth, firstLine && !xml);

    switch (element.type) {
      case 'element':
        return xml + indent + writeElement(element, options, depth);

      case 'comment':
        return xml + indent + writeComment(element[options.commentKey], options);

      case 'doctype':
        return xml + indent + writeDoctype(element[options.doctypeKey], options);

      case 'cdata':
        return xml + (options.indentCdata ? indent : '') + writeCdata(element[options.cdataKey], options);

      case 'text':
        return xml + (options.indentText ? indent : '') + writeText(element[options.textKey], options);

      case 'instruction':
        var instruction = {};
        instruction[element[options.nameKey]] = element[options.attributesKey] ? element : element[options.instructionKey];
        return xml + (options.indentInstruction ? indent : '') + writeInstruction(instruction, options, depth);
    }
  }, '');
}

function hasContentCompact(element, options, anyContent) {
  var key;

  for (key in element) {
    if (element.hasOwnProperty(key)) {
      switch (key) {
        case options.parentKey:
        case options.attributesKey:
          break;
        // skip to next key

        case options.textKey:
          if (options.indentText || anyContent) {
            return true;
          }

          break;
        // skip to next key

        case options.cdataKey:
          if (options.indentCdata || anyContent) {
            return true;
          }

          break;
        // skip to next key

        case options.instructionKey:
          if (options.indentInstruction || anyContent) {
            return true;
          }

          break;
        // skip to next key

        case options.doctypeKey:
        case options.commentKey:
          return true;

        default:
          return true;
      }
    }
  }

  return false;
}

function writeElementCompact(element, name, options, depth, indent) {
  currentElement = element;
  currentElementName = name;
  var elementName = 'elementNameFn' in options ? options.elementNameFn(name, element) : name;

  if (typeof element === 'undefined' || element === null || element === '') {
    return 'fullTagEmptyElementFn' in options && options.fullTagEmptyElementFn(name, element) || options.fullTagEmptyElement ? '<' + elementName + '></' + elementName + '>' : '<' + elementName + '/>';
  }

  var xml = [];

  if (name) {
    xml.push('<' + elementName);

    if (typeof element !== 'object') {
      xml.push('>' + writeText(element, options) + '</' + elementName + '>');
      return xml.join('');
    }

    if (element[options.attributesKey]) {
      xml.push(writeAttributes(element[options.attributesKey], options, depth));
    }

    var withClosingTag = hasContentCompact(element, options, true) || element[options.attributesKey] && element[options.attributesKey]['xml:space'] === 'preserve';

    if (!withClosingTag) {
      if ('fullTagEmptyElementFn' in options) {
        withClosingTag = options.fullTagEmptyElementFn(name, element);
      } else {
        withClosingTag = options.fullTagEmptyElement;
      }
    }

    if (withClosingTag) {
      xml.push('>');
    } else {
      xml.push('/>');
      return xml.join('');
    }
  }

  xml.push(writeElementsCompact(element, options, depth + 1, false));
  currentElement = element;
  currentElementName = name;

  if (name) {
    xml.push((indent ? writeIndentation(options, depth, false) : '') + '</' + elementName + '>');
  }

  return xml.join('');
}

function writeElementsCompact(element, options, depth, firstLine) {
  var i,
      key,
      nodes,
      xml = [];

  for (key in element) {
    if (element.hasOwnProperty(key)) {
      nodes = isArray(element[key]) ? element[key] : [element[key]];

      for (i = 0; i < nodes.length; ++i) {
        switch (key) {
          case options.declarationKey:
            xml.push(writeDeclaration(nodes[i], options, depth));
            break;

          case options.instructionKey:
            xml.push((options.indentInstruction ? writeIndentation(options, depth, firstLine) : '') + writeInstruction(nodes[i], options, depth));
            break;

          case options.attributesKey:
          case options.parentKey:
            break;
          // skip

          case options.textKey:
            xml.push((options.indentText ? writeIndentation(options, depth, firstLine) : '') + writeText(nodes[i], options));
            break;

          case options.cdataKey:
            xml.push((options.indentCdata ? writeIndentation(options, depth, firstLine) : '') + writeCdata(nodes[i], options));
            break;

          case options.doctypeKey:
            xml.push(writeIndentation(options, depth, firstLine) + writeDoctype(nodes[i], options));
            break;

          case options.commentKey:
            xml.push(writeIndentation(options, depth, firstLine) + writeComment(nodes[i], options));
            break;

          default:
            xml.push(writeIndentation(options, depth, firstLine) + writeElementCompact(nodes[i], key, options, depth, hasContentCompact(nodes[i], options)));
        }

        firstLine = firstLine && !xml.length;
      }
    }
  }

  return xml.join('');
}

module.exports = function (js, options) {
  options = validateOptions(options);
  var xml = [];
  currentElement = js;
  currentElementName = '_root_';

  if (options.compact) {
    xml.push(writeElementsCompact(js, options, 0, true));
  } else {
    if (js[options.declarationKey]) {
      xml.push(writeDeclaration(js[options.declarationKey], options, 0));
    }

    if (js[options.elementsKey] && js[options.elementsKey].length) {
      xml.push(writeElements(js[options.elementsKey], options, 0, !xml.length));
    }
  }

  return xml.join('');
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/*jslint node:true */
var xml2js = __webpack_require__(16);

var xml2json = __webpack_require__(52);

var js2xml = __webpack_require__(22);

var json2xml = __webpack_require__(53);

module.exports = {
  xml2js: xml2js,
  xml2json: xml2json,
  js2xml: js2xml,
  json2xml: json2xml
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) {
   true ? module.exports = e(__webpack_require__(54), __webpack_require__(55)) : undefined;
}(this, function (m, d) {
  "use strict";

  var t;
  return m = m && m.hasOwnProperty("default") ? m.default : m, d = d && d.hasOwnProperty("default") ? d.default : d, function (t) {
    var u;
    t.exports;
    (u = window).DOMParser = window.DOMParser;

    function p() {
      return document.createElement("canvas");
    }

    var f,
        c = function c(t, e, i) {
      if (null != t || null != e || null != i) {
        var n = function (s) {
          var A = {
            opts: s,
            FRAMERATE: 30,
            MAX_VIRTUAL_PIXELS: 3e4,
            rootEmSize: 12,
            emSize: 12,
            log: function log(t) {}
          };
          1 == A.opts.log && "undefined" != typeof console && (A.log = function (t) {
            console.log(t);
          });
          A.init = function (t) {
            var e = 0;
            A.UniqueId = function () {
              return "canvg" + ++e;
            }, A.Definitions = {}, A.Styles = {}, A.StylesSpecificity = {}, A.Animations = [], A.Images = [], A.ctx = t, A.ViewPort = new function () {
              this.viewPorts = [], this.Clear = function () {
                this.viewPorts = [];
              }, this.SetCurrent = function (t, e) {
                this.viewPorts.push({
                  width: t,
                  height: e
                });
              }, this.RemoveCurrent = function () {
                this.viewPorts.pop();
              }, this.Current = function () {
                return this.viewPorts[this.viewPorts.length - 1];
              }, this.width = function () {
                return this.Current().width;
              }, this.height = function () {
                return this.Current().height;
              }, this.ComputeSize = function (t) {
                return null != t && "number" == typeof t ? t : "x" == t ? this.width() : "y" == t ? this.height() : Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);
              };
            }();
          }, A.init(), A.ImagesLoaded = function () {
            for (var t = 0; t < A.Images.length; t++) {
              if (!A.Images[t].loaded) return !1;
            }

            return !0;
          }, A.trim = function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          }, A.compressSpaces = function (t) {
            return t.replace(/(?!\u3000)\s+/gm, " ");
          }, A.ajax = function (t) {
            var e;
            return (e = u.XMLHttpRequest ? new u.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")) ? (e.open("GET", t, !1), e.send(null), e.responseText) : null;
          }, A.parseXml = function (e) {
            if ("undefined" != typeof Windows && void 0 !== Windows.Data && void 0 !== Windows.Data.Xml) {
              var t = new Windows.Data.Xml.Dom.XmlDocument(),
                  i = new Windows.Data.Xml.Dom.XmlLoadSettings();
              return i.prohibitDtd = !1, t.loadXml(e, i), t;
            }

            if (!u.DOMParser) {
              e = e.replace(/<!DOCTYPE svg[^>]*>/, "");
              var t = new ActiveXObject("Microsoft.XMLDOM");
              return t.async = "false", t.loadXML(e), t;
            }

            try {
              var n = s.xmldom ? new u.DOMParser(s.xmldom) : new u.DOMParser();
              return n.parseFromString(e, "image/svg+xml");
            } catch (t) {
              return (n = s.xmldom ? new u.DOMParser(s.xmldom) : new u.DOMParser()).parseFromString(e, "text/xml");
            }
          }, A.Property = function (t, e) {
            this.name = t, this.value = e;
          }, A.Property.prototype.getValue = function () {
            return this.value;
          }, A.Property.prototype.hasValue = function () {
            return null != this.value && "" !== this.value;
          }, A.Property.prototype.numValue = function () {
            if (!this.hasValue()) return 0;
            var t = parseFloat(this.value);
            return (this.value + "").match(/%$/) && (t /= 100), t;
          }, A.Property.prototype.valueOrDefault = function (t) {
            return this.hasValue() ? this.value : t;
          }, A.Property.prototype.numValueOrDefault = function (t) {
            return this.hasValue() ? this.numValue() : t;
          }, A.Property.prototype.addOpacity = function (t) {
            var e = this.value;

            if (null != t.value && "" != t.value && "string" == typeof this.value) {
              var i = new m(this.value);
              i.ok && (e = "rgba(" + i.r + ", " + i.g + ", " + i.b + ", " + t.numValue() + ")");
            }

            return new A.Property(this.name, e);
          }, A.Property.prototype.getDefinition = function () {
            var t = this.value.match(/#([^\)'"]+)/);
            return t && (t = t[1]), t || (t = this.value), A.Definitions[t];
          }, A.Property.prototype.isUrlDefinition = function () {
            return 0 == this.value.indexOf("url(");
          }, A.Property.prototype.getFillStyleDefinition = function (t, e) {
            var i = this.getDefinition();
            if (null != i && i.createGradient) return i.createGradient(A.ctx, t, e);

            if (null != i && i.createPattern) {
              if (i.getHrefAttribute().hasValue()) {
                var n = i.attribute("patternTransform");
                i = i.getHrefAttribute().getDefinition(), n.hasValue() && (i.attribute("patternTransform", !0).value = n.value);
              }

              return i.createPattern(A.ctx, t);
            }

            return null;
          }, A.Property.prototype.getDPI = function (t) {
            return 96;
          }, A.Property.prototype.getREM = function (t) {
            return A.rootEmSize;
          }, A.Property.prototype.getEM = function (t) {
            return A.emSize;
          }, A.Property.prototype.getUnits = function () {
            var t = this.value + "";
            return t.replace(/[0-9\.\-]/g, "");
          }, A.Property.prototype.isPixels = function () {
            if (!this.hasValue()) return !1;
            var t = this.value + "";
            return !!t.match(/px$/) || !!t.match(/^[0-9]+$/);
          }, A.Property.prototype.toPixels = function (t, e) {
            if (!this.hasValue()) return 0;
            var i = this.value + "";
            if (i.match(/rem$/)) return this.numValue() * this.getREM(t);
            if (i.match(/em$/)) return this.numValue() * this.getEM(t);
            if (i.match(/ex$/)) return this.numValue() * this.getEM(t) / 2;
            if (i.match(/px$/)) return this.numValue();
            if (i.match(/pt$/)) return this.numValue() * this.getDPI(t) * (1 / 72);
            if (i.match(/pc$/)) return 15 * this.numValue();
            if (i.match(/cm$/)) return this.numValue() * this.getDPI(t) / 2.54;
            if (i.match(/mm$/)) return this.numValue() * this.getDPI(t) / 25.4;
            if (i.match(/in$/)) return this.numValue() * this.getDPI(t);
            if (i.match(/%$/)) return this.numValue() * A.ViewPort.ComputeSize(t);
            var n = this.numValue();
            return e && n < 1 ? n * A.ViewPort.ComputeSize(t) : n;
          }, A.Property.prototype.toMilliseconds = function () {
            if (!this.hasValue()) return 0;
            var t = this.value + "";
            return t.match(/s$/) ? 1e3 * this.numValue() : (t.match(/ms$/), this.numValue());
          }, A.Property.prototype.toRadians = function () {
            if (!this.hasValue()) return 0;
            var t = this.value + "";
            return t.match(/deg$/) ? this.numValue() * (Math.PI / 180) : t.match(/grad$/) ? this.numValue() * (Math.PI / 200) : t.match(/rad$/) ? this.numValue() : this.numValue() * (Math.PI / 180);
          };
          var t = {
            baseline: "alphabetic",
            "before-edge": "top",
            "text-before-edge": "top",
            middle: "middle",
            central: "middle",
            "after-edge": "bottom",
            "text-after-edge": "bottom",
            ideographic: "ideographic",
            alphabetic: "alphabetic",
            hanging: "hanging",
            mathematical: "alphabetic"
          };
          return A.Property.prototype.toTextBaseline = function () {
            return this.hasValue() ? t[this.value] : null;
          }, A.Font = new function () {
            this.Styles = "normal|italic|oblique|inherit", this.Variants = "normal|small-caps|inherit", this.Weights = "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit", this.CreateFont = function (t, e, i, n, s, a) {
              var r = null != a ? this.Parse(a) : this.CreateFont("", "", "", "", "", A.ctx.font);
              return {
                fontFamily: s = s || r.fontFamily,
                fontSize: n || r.fontSize,
                fontStyle: t || r.fontStyle,
                fontWeight: i || r.fontWeight,
                fontVariant: e || r.fontVariant,
                toString: function toString() {
                  return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(" ");
                }
              };
            };
            var r = this;

            this.Parse = function (t) {
              for (var e = {}, i = A.trim(A.compressSpaces(t || "")).split(" "), n = {
                fontSize: !1,
                fontStyle: !1,
                fontWeight: !1,
                fontVariant: !1
              }, s = "", a = 0; a < i.length; a++) {
                n.fontStyle || -1 == r.Styles.indexOf(i[a]) ? n.fontVariant || -1 == r.Variants.indexOf(i[a]) ? n.fontWeight || -1 == r.Weights.indexOf(i[a]) ? n.fontSize ? "inherit" != i[a] && (s += i[a]) : ("inherit" != i[a] && (e.fontSize = i[a].split("/")[0]), n.fontStyle = n.fontVariant = n.fontWeight = n.fontSize = !0) : ("inherit" != i[a] && (e.fontWeight = i[a]), n.fontStyle = n.fontVariant = n.fontWeight = !0) : ("inherit" != i[a] && (e.fontVariant = i[a]), n.fontStyle = n.fontVariant = !0) : ("inherit" != i[a] && (e.fontStyle = i[a]), n.fontStyle = !0);
              }

              return "" != s && (e.fontFamily = s), e;
            };
          }(), A.ToNumberArray = function (t) {
            for (var e = A.trim(A.compressSpaces((t || "").replace(/,/g, " "))).split(" "), i = 0; i < e.length; i++) {
              e[i] = parseFloat(e[i]);
            }

            return e;
          }, A.Point = function (t, e) {
            this.x = t, this.y = e;
          }, A.Point.prototype.angleTo = function (t) {
            return Math.atan2(t.y - this.y, t.x - this.x);
          }, A.Point.prototype.applyTransform = function (t) {
            var e = this.x * t[0] + this.y * t[2] + t[4],
                i = this.x * t[1] + this.y * t[3] + t[5];
            this.x = e, this.y = i;
          }, A.CreatePoint = function (t) {
            var e = A.ToNumberArray(t);
            return new A.Point(e[0], e[1]);
          }, A.CreatePath = function (t) {
            for (var e = A.ToNumberArray(t), i = [], n = 0; n < e.length; n += 2) {
              i.push(new A.Point(e[n], e[n + 1]));
            }

            return i;
          }, A.BoundingBox = function (t, e, i, n) {
            this.x1 = Number.NaN, this.y1 = Number.NaN, this.x2 = Number.NaN, this.y2 = Number.NaN, this.x = function () {
              return this.x1;
            }, this.y = function () {
              return this.y1;
            }, this.width = function () {
              return this.x2 - this.x1;
            }, this.height = function () {
              return this.y2 - this.y1;
            }, this.addPoint = function (t, e) {
              null != t && ((isNaN(this.x1) || isNaN(this.x2)) && (this.x1 = t, this.x2 = t), t < this.x1 && (this.x1 = t), t > this.x2 && (this.x2 = t)), null != e && ((isNaN(this.y1) || isNaN(this.y2)) && (this.y1 = e, this.y2 = e), e < this.y1 && (this.y1 = e), e > this.y2 && (this.y2 = e));
            }, this.addX = function (t) {
              this.addPoint(t, null);
            }, this.addY = function (t) {
              this.addPoint(null, t);
            }, this.addBoundingBox = function (t) {
              this.addPoint(t.x1, t.y1), this.addPoint(t.x2, t.y2);
            }, this.addQuadraticCurve = function (t, e, i, n, s, a) {
              var r = t + 2 / 3 * (i - t),
                  o = e + 2 / 3 * (n - e),
                  l = r + 1 / 3 * (s - t),
                  h = o + 1 / 3 * (a - e);
              this.addBezierCurve(t, e, r, l, o, h, s, a);
            }, this.addBezierCurve = function (t, e, i, n, s, a, r, o) {
              var l = [t, e],
                  h = [i, n],
                  u = [s, a],
                  c = [r, o];
              this.addPoint(l[0], l[1]), this.addPoint(c[0], c[1]);

              for (var f = 0; f <= 1; f++) {
                var m = function m(t) {
                  return Math.pow(1 - t, 3) * l[f] + 3 * Math.pow(1 - t, 2) * t * h[f] + 3 * (1 - t) * Math.pow(t, 2) * u[f] + Math.pow(t, 3) * c[f];
                },
                    p = 6 * l[f] - 12 * h[f] + 6 * u[f],
                    d = -3 * l[f] + 9 * h[f] - 9 * u[f] + 3 * c[f],
                    y = 3 * h[f] - 3 * l[f];

                if (0 != d) {
                  var v = Math.pow(p, 2) - 4 * y * d;

                  if (!(v < 0)) {
                    var g = (-p + Math.sqrt(v)) / (2 * d);
                    0 < g && g < 1 && (0 == f && this.addX(m(g)), 1 == f && this.addY(m(g)));
                    var x = (-p - Math.sqrt(v)) / (2 * d);
                    0 < x && x < 1 && (0 == f && this.addX(m(x)), 1 == f && this.addY(m(x)));
                  }
                } else {
                  if (0 == p) continue;
                  var b = -y / p;
                  0 < b && b < 1 && (0 == f && this.addX(m(b)), 1 == f && this.addY(m(b)));
                }
              }
            }, this.isPointInBox = function (t, e) {
              return this.x1 <= t && t <= this.x2 && this.y1 <= e && e <= this.y2;
            }, this.addPoint(t, e), this.addPoint(i, n);
          }, A.Transform = function (t) {
            var e = this;
            this.Type = {}, this.Type.translate = function (t) {
              this.p = A.CreatePoint(t), this.apply = function (t) {
                t.translate(this.p.x || 0, this.p.y || 0);
              }, this.unapply = function (t) {
                t.translate(-1 * this.p.x || 0, -1 * this.p.y || 0);
              }, this.applyToPoint = function (t) {
                t.applyTransform([1, 0, 0, 1, this.p.x || 0, this.p.y || 0]);
              };
            }, this.Type.rotate = function (t) {
              var e = A.ToNumberArray(t);
              this.angle = new A.Property("angle", e[0]), this.cx = e[1] || 0, this.cy = e[2] || 0, this.apply = function (t) {
                t.translate(this.cx, this.cy), t.rotate(this.angle.toRadians()), t.translate(-this.cx, -this.cy);
              }, this.unapply = function (t) {
                t.translate(this.cx, this.cy), t.rotate(-1 * this.angle.toRadians()), t.translate(-this.cx, -this.cy);
              }, this.applyToPoint = function (t) {
                var e = this.angle.toRadians();
                t.applyTransform([1, 0, 0, 1, this.p.x || 0, this.p.y || 0]), t.applyTransform([Math.cos(e), Math.sin(e), -Math.sin(e), Math.cos(e), 0, 0]), t.applyTransform([1, 0, 0, 1, -this.p.x || 0, -this.p.y || 0]);
              };
            }, this.Type.scale = function (t) {
              this.p = A.CreatePoint(t), this.apply = function (t) {
                t.scale(this.p.x || 1, this.p.y || this.p.x || 1);
              }, this.unapply = function (t) {
                t.scale(1 / this.p.x || 1, 1 / this.p.y || this.p.x || 1);
              }, this.applyToPoint = function (t) {
                t.applyTransform([this.p.x || 0, 0, 0, this.p.y || 0, 0, 0]);
              };
            }, this.Type.matrix = function (t) {
              this.m = A.ToNumberArray(t), this.apply = function (t) {
                t.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
              }, this.unapply = function (t) {
                var e = this.m[0],
                    i = this.m[2],
                    n = this.m[4],
                    s = this.m[1],
                    a = this.m[3],
                    r = this.m[5],
                    o = 1 / (e * (1 * a - 0 * r) - i * (1 * s - 0 * r) + n * (0 * s - 0 * a));
                t.transform(o * (1 * a - 0 * r), o * (0 * r - 1 * s), o * (0 * n - 1 * i), o * (1 * e - 0 * n), o * (i * r - n * a), o * (n * s - e * r));
              }, this.applyToPoint = function (t) {
                t.applyTransform(this.m);
              };
            }, this.Type.SkewBase = function (t) {
              this.base = e.Type.matrix, this.base(t), this.angle = new A.Property("angle", t);
            }, this.Type.SkewBase.prototype = new this.Type.matrix(), this.Type.skewX = function (t) {
              this.base = e.Type.SkewBase, this.base(t), this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0];
            }, this.Type.skewX.prototype = new this.Type.SkewBase(), this.Type.skewY = function (t) {
              this.base = e.Type.SkewBase, this.base(t), this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0];
            }, this.Type.skewY.prototype = new this.Type.SkewBase(), this.transforms = [], this.apply = function (t) {
              for (var e = 0; e < this.transforms.length; e++) {
                this.transforms[e].apply(t);
              }
            }, this.unapply = function (t) {
              for (var e = this.transforms.length - 1; 0 <= e; e--) {
                this.transforms[e].unapply(t);
              }
            }, this.applyToPoint = function (t) {
              for (var e = 0; e < this.transforms.length; e++) {
                this.transforms[e].applyToPoint(t);
              }
            };

            for (var i = A.trim(A.compressSpaces(t)).replace(/\)([a-zA-Z])/g, ") $1").replace(/\)(\s?,\s?)/g, ") ").split(/\s(?=[a-z])/), n = 0; n < i.length; n++) {
              if ("none" !== i[n]) {
                var s = A.trim(i[n].split("(")[0]),
                    a = i[n].split("(")[1].replace(")", ""),
                    r = this.Type[s];

                if (void 0 !== r) {
                  var o = new r(a);
                  o.type = s, this.transforms.push(o);
                }
              }
            }
          }, A.AspectRatio = function (t, e, i, n, s, a, r, o, l, h) {
            var u = (e = (e = A.compressSpaces(e)).replace(/^defer\s/, "")).split(" ")[0] || "xMidYMid",
                c = e.split(" ")[1] || "meet",
                f = i / n,
                m = s / a,
                p = Math.min(f, m),
                d = Math.max(f, m);
            "meet" == c && (n *= p, a *= p), "slice" == c && (n *= d, a *= d), l = new A.Property("refX", l), h = new A.Property("refY", h), l.hasValue() && h.hasValue() ? t.translate(-p * l.toPixels("x"), -p * h.toPixels("y")) : (u.match(/^xMid/) && ("meet" == c && p == m || "slice" == c && d == m) && t.translate(i / 2 - n / 2, 0), u.match(/YMid$/) && ("meet" == c && p == f || "slice" == c && d == f) && t.translate(0, s / 2 - a / 2), u.match(/^xMax/) && ("meet" == c && p == m || "slice" == c && d == m) && t.translate(i - n, 0), u.match(/YMax$/) && ("meet" == c && p == f || "slice" == c && d == f) && t.translate(0, s - a)), "none" == u ? t.scale(f, m) : "meet" == c ? t.scale(p, p) : "slice" == c && t.scale(d, d), t.translate(null == r ? 0 : -r, null == o ? 0 : -o);
          }, A.Element = {}, A.EmptyProperty = new A.Property("EMPTY", ""), A.Element.ElementBase = function (a) {
            this.attributes = {}, this.styles = {}, this.stylesSpecificity = {}, this.children = [], this.attribute = function (t, e) {
              var i = this.attributes[t];
              return null != i ? i : (1 == e && (i = new A.Property(t, ""), this.attributes[t] = i), i || A.EmptyProperty);
            }, this.getHrefAttribute = function () {
              for (var t in this.attributes) {
                if ("href" == t || t.match(/:href$/)) return this.attributes[t];
              }

              return A.EmptyProperty;
            }, this.style = function (t, e, i) {
              var n = this.styles[t];
              if (null != n) return n;
              var s = this.attribute(t);
              if (null != s && s.hasValue()) return this.styles[t] = s;

              if (1 != i) {
                var a = this.parent;

                if (null != a) {
                  var r = a.style(t);
                  if (null != r && r.hasValue()) return r;
                }
              }

              return 1 == e && (n = new A.Property(t, ""), this.styles[t] = n), n || A.EmptyProperty;
            }, this.render = function (t) {
              if ("none" != this.style("display").value && "hidden" != this.style("visibility").value) {
                if (t.save(), this.style("mask").hasValue()) {
                  var e = this.style("mask").getDefinition();
                  null != e && e.apply(t, this);
                } else if (this.style("filter").hasValue()) {
                  var i = this.style("filter").getDefinition();
                  null != i && i.apply(t, this);
                } else this.setContext(t), this.renderChildren(t), this.clearContext(t);

                t.restore();
              }
            }, this.setContext = function (t) {}, this.clearContext = function (t) {}, this.renderChildren = function (t) {
              for (var e = 0; e < this.children.length; e++) {
                this.children[e].render(t);
              }
            }, this.addChild = function (t, e) {
              var i = t;
              e && (i = A.CreateElement(t)), i.parent = this, "title" != i.type && this.children.push(i);
            }, this.addStylesFromStyleDefinition = function () {
              for (var t in A.Styles) {
                if ("@" != t[0] && f(a, t)) {
                  var e = A.Styles[t],
                      i = A.StylesSpecificity[t];
                  if (null != e) for (var n in e) {
                    var s = this.stylesSpecificity[n];
                    void 0 === s && (s = "000"), s < i && (this.styles[n] = e[n], this.stylesSpecificity[n] = i);
                  }
                }
              }
            };
            var t,
                e = new RegExp("^[A-Z-]+$");

            if (null != a && 1 == a.nodeType) {
              for (var i = 0; i < a.attributes.length; i++) {
                var n = a.attributes[i],
                    s = (t = n.nodeName, e.test(t) ? t.toLowerCase() : t);
                this.attributes[s] = new A.Property(s, n.value);
              }

              if (this.addStylesFromStyleDefinition(), this.attribute("style").hasValue()) {
                var r = this.attribute("style").value.split(";");

                for (i = 0; i < r.length; i++) {
                  if ("" != A.trim(r[i])) {
                    var o = r[i].split(":"),
                        l = A.trim(o[0]),
                        h = A.trim(o[1]);
                    this.styles[l] = new A.Property(l, h);
                  }
                }
              }

              for (this.attribute("id").hasValue() && null == A.Definitions[this.attribute("id").value] && (A.Definitions[this.attribute("id").value] = this), i = 0; i < a.childNodes.length; i++) {
                var u = a.childNodes[i];

                if (1 == u.nodeType && this.addChild(u, !0), this.captureTextNodes && (3 == u.nodeType || 4 == u.nodeType)) {
                  var c = u.value || u.text || u.textContent || "";
                  "" != A.compressSpaces(c) && this.addChild(new A.Element.tspan(u), !1);
                }
              }
            }
          }, A.Element.RenderedElementBase = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.calculateOpacity = function () {
              for (var t = 1, e = this; null != e;) {
                var i = e.style("opacity", !1, !0);
                i.hasValue() && (t *= i.numValue()), e = e.parent;
              }

              return t;
            }, this.setContext = function (t, e) {
              if (!e) {
                var i;
                if (this.style("fill").isUrlDefinition()) null != (i = this.style("fill").getFillStyleDefinition(this, this.style("fill-opacity"))) && (t.fillStyle = i);else if (this.style("fill").hasValue()) {
                  var n;
                  "currentColor" == (n = this.style("fill")).value && (n.value = this.style("color").value), "inherit" != n.value && (t.fillStyle = "none" == n.value ? "rgba(0,0,0,0)" : n.value);
                }
                if (this.style("fill-opacity").hasValue() && (n = (n = new A.Property("fill", t.fillStyle)).addOpacity(this.style("fill-opacity")), t.fillStyle = n.value), this.style("stroke").isUrlDefinition()) null != (i = this.style("stroke").getFillStyleDefinition(this, this.style("stroke-opacity"))) && (t.strokeStyle = i);else if (this.style("stroke").hasValue()) {
                  var s;
                  "currentColor" == (s = this.style("stroke")).value && (s.value = this.style("color").value), "inherit" != s.value && (t.strokeStyle = "none" == s.value ? "rgba(0,0,0,0)" : s.value);
                }

                if (this.style("stroke-opacity").hasValue() && (s = (s = new A.Property("stroke", t.strokeStyle)).addOpacity(this.style("stroke-opacity")), t.strokeStyle = s.value), this.style("stroke-width").hasValue()) {
                  var a = this.style("stroke-width").toPixels();
                  t.lineWidth = 0 == a ? .001 : a;
                }

                if (this.style("stroke-linecap").hasValue() && (t.lineCap = this.style("stroke-linecap").value), this.style("stroke-linejoin").hasValue() && (t.lineJoin = this.style("stroke-linejoin").value), this.style("stroke-miterlimit").hasValue() && (t.miterLimit = this.style("stroke-miterlimit").value), this.style("paint-order").hasValue() && (t.paintOrder = this.style("paint-order").value), this.style("stroke-dasharray").hasValue() && "none" != this.style("stroke-dasharray").value) {
                  var r = A.ToNumberArray(this.style("stroke-dasharray").value);
                  void 0 !== t.setLineDash ? t.setLineDash(r) : void 0 !== t.webkitLineDash ? t.webkitLineDash = r : void 0 === t.mozDash || 1 == r.length && 0 == r[0] || (t.mozDash = r);
                  var o = this.style("stroke-dashoffset").toPixels();
                  void 0 !== t.lineDashOffset ? t.lineDashOffset = o : void 0 !== t.webkitLineDashOffset ? t.webkitLineDashOffset = o : void 0 !== t.mozDashOffset && (t.mozDashOffset = o);
                }
              }

              if (void 0 !== t.font) {
                t.font = A.Font.CreateFont(this.style("font-style").value, this.style("font-variant").value, this.style("font-weight").value, this.style("font-size").hasValue() ? this.style("font-size").toPixels() + "px" : "", this.style("font-family").value).toString();
                var l = this.style("font-size", !1, !1);
                l.isPixels() && (A.emSize = l.toPixels());
              }

              if (this.style("transform", !1, !0).hasValue() && new A.Transform(this.style("transform", !1, !0).value).apply(t), this.style("clip-path", !1, !0).hasValue()) {
                var h = this.style("clip-path", !1, !0).getDefinition();
                null != h && h.apply(t);
              }

              t.globalAlpha = this.calculateOpacity();
            };
          }, A.Element.RenderedElementBase.prototype = new A.Element.ElementBase(), A.Element.PathElementBase = function (t) {
            this.base = A.Element.RenderedElementBase, this.base(t), this.path = function (t) {
              return null != t && t.beginPath(), new A.BoundingBox();
            }, this.renderChildren = function (t) {
              this.path(t), A.Mouse.checkPath(this, t), "" != t.fillStyle && ("inherit" != this.style("fill-rule").valueOrDefault("inherit") ? t.fill(this.style("fill-rule").value) : t.fill()), "" != t.strokeStyle && t.stroke();
              var e = this.getMarkers();

              if (null != e) {
                if (this.style("marker-start").isUrlDefinition() && (i = this.style("marker-start").getDefinition()).render(t, e[0][0], e[0][1]), this.style("marker-mid").isUrlDefinition()) for (var i = this.style("marker-mid").getDefinition(), n = 1; n < e.length - 1; n++) {
                  i.render(t, e[n][0], e[n][1]);
                }
                this.style("marker-end").isUrlDefinition() && (i = this.style("marker-end").getDefinition()).render(t, e[e.length - 1][0], e[e.length - 1][1]);
              }
            }, this.getBoundingBox = function () {
              return this.path();
            }, this.getMarkers = function () {
              return null;
            };
          }, A.Element.PathElementBase.prototype = new A.Element.RenderedElementBase(), A.Element.svg = function (t) {
            this.base = A.Element.RenderedElementBase, this.base(t), this.baseClearContext = this.clearContext, this.clearContext = function (t) {
              this.baseClearContext(t), A.ViewPort.RemoveCurrent();
            }, this.baseSetContext = this.setContext, this.setContext = function (t) {
              if (t.strokeStyle = "rgba(0,0,0,0)", t.lineCap = "butt", t.lineJoin = "miter", t.miterLimit = 4, t.canvas.style && void 0 !== t.font && void 0 !== u.getComputedStyle) {
                t.font = u.getComputedStyle(t.canvas).getPropertyValue("font");
                var e = new A.Property("fontSize", A.Font.Parse(t.font).fontSize);
                e.hasValue() && (A.rootEmSize = A.emSize = e.toPixels("y"));
              }

              this.baseSetContext(t), this.attribute("x").hasValue() || (this.attribute("x", !0).value = 0), this.attribute("y").hasValue() || (this.attribute("y", !0).value = 0), t.translate(this.attribute("x").toPixels("x"), this.attribute("y").toPixels("y"));
              var i = A.ViewPort.width(),
                  n = A.ViewPort.height();

              if (this.attribute("width").hasValue() || (this.attribute("width", !0).value = "100%"), this.attribute("height").hasValue() || (this.attribute("height", !0).value = "100%"), void 0 === this.root) {
                i = this.attribute("width").toPixels("x"), n = this.attribute("height").toPixels("y");
                var s = 0,
                    a = 0;
                this.attribute("refX").hasValue() && this.attribute("refY").hasValue() && (s = -this.attribute("refX").toPixels("x"), a = -this.attribute("refY").toPixels("y")), "visible" != this.attribute("overflow").valueOrDefault("hidden") && (t.beginPath(), t.moveTo(s, a), t.lineTo(i, a), t.lineTo(i, n), t.lineTo(s, n), t.closePath(), t.clip());
              }

              if (A.ViewPort.SetCurrent(i, n), this.attribute("viewBox").hasValue()) {
                var r = A.ToNumberArray(this.attribute("viewBox").value),
                    o = r[0],
                    l = r[1];
                i = r[2], n = r[3], A.AspectRatio(t, this.attribute("preserveAspectRatio").value, A.ViewPort.width(), i, A.ViewPort.height(), n, o, l, this.attribute("refX").value, this.attribute("refY").value), A.ViewPort.RemoveCurrent(), A.ViewPort.SetCurrent(r[2], r[3]);
              }
            };
          }, A.Element.svg.prototype = new A.Element.RenderedElementBase(), A.Element.rect = function (t) {
            this.base = A.Element.PathElementBase, this.base(t), this.path = function (t) {
              var e = this.attribute("x").toPixels("x"),
                  i = this.attribute("y").toPixels("y"),
                  n = this.attribute("width").toPixels("x"),
                  s = this.attribute("height").toPixels("y"),
                  a = this.attribute("rx").toPixels("x"),
                  r = this.attribute("ry").toPixels("y");

              if (this.attribute("rx").hasValue() && !this.attribute("ry").hasValue() && (r = a), this.attribute("ry").hasValue() && !this.attribute("rx").hasValue() && (a = r), a = Math.min(a, n / 2), r = Math.min(r, s / 2), null != t) {
                var o = (Math.sqrt(2) - 1) / 3 * 4;
                t.beginPath(), t.moveTo(e + a, i), t.lineTo(e + n - a, i), t.bezierCurveTo(e + n - a + o * a, i, e + n, i + r - o * r, e + n, i + r), t.lineTo(e + n, i + s - r), t.bezierCurveTo(e + n, i + s - r + o * r, e + n - a + o * a, i + s, e + n - a, i + s), t.lineTo(e + a, i + s), t.bezierCurveTo(e + a - o * a, i + s, e, i + s - r + o * r, e, i + s - r), t.lineTo(e, i + r), t.bezierCurveTo(e, i + r - o * r, e + a - o * a, i, e + a, i), t.closePath();
              }

              return new A.BoundingBox(e, i, e + n, i + s);
            };
          }, A.Element.rect.prototype = new A.Element.PathElementBase(), A.Element.circle = function (t) {
            this.base = A.Element.PathElementBase, this.base(t), this.path = function (t) {
              var e = this.attribute("cx").toPixels("x"),
                  i = this.attribute("cy").toPixels("y"),
                  n = this.attribute("r").toPixels();
              return null != t && (t.beginPath(), t.arc(e, i, n, 0, 2 * Math.PI, !1), t.closePath()), new A.BoundingBox(e - n, i - n, e + n, i + n);
            };
          }, A.Element.circle.prototype = new A.Element.PathElementBase(), A.Element.ellipse = function (t) {
            this.base = A.Element.PathElementBase, this.base(t), this.path = function (t) {
              var e = (Math.sqrt(2) - 1) / 3 * 4,
                  i = this.attribute("rx").toPixels("x"),
                  n = this.attribute("ry").toPixels("y"),
                  s = this.attribute("cx").toPixels("x"),
                  a = this.attribute("cy").toPixels("y");
              return null != t && (t.beginPath(), t.moveTo(s + i, a), t.bezierCurveTo(s + i, a + e * n, s + e * i, a + n, s, a + n), t.bezierCurveTo(s - e * i, a + n, s - i, a + e * n, s - i, a), t.bezierCurveTo(s - i, a - e * n, s - e * i, a - n, s, a - n), t.bezierCurveTo(s + e * i, a - n, s + i, a - e * n, s + i, a), t.closePath()), new A.BoundingBox(s - i, a - n, s + i, a + n);
            };
          }, A.Element.ellipse.prototype = new A.Element.PathElementBase(), A.Element.line = function (t) {
            this.base = A.Element.PathElementBase, this.base(t), this.getPoints = function () {
              return [new A.Point(this.attribute("x1").toPixels("x"), this.attribute("y1").toPixels("y")), new A.Point(this.attribute("x2").toPixels("x"), this.attribute("y2").toPixels("y"))];
            }, this.path = function (t) {
              var e = this.getPoints();
              return null != t && (t.beginPath(), t.moveTo(e[0].x, e[0].y), t.lineTo(e[1].x, e[1].y)), new A.BoundingBox(e[0].x, e[0].y, e[1].x, e[1].y);
            }, this.getMarkers = function () {
              var t = this.getPoints(),
                  e = t[0].angleTo(t[1]);
              return [[t[0], e], [t[1], e]];
            };
          }, A.Element.line.prototype = new A.Element.PathElementBase(), A.Element.polyline = function (t) {
            this.base = A.Element.PathElementBase, this.base(t), this.points = A.CreatePath(this.attribute("points").value), this.path = function (t) {
              var e = new A.BoundingBox(this.points[0].x, this.points[0].y);
              null != t && (t.beginPath(), t.moveTo(this.points[0].x, this.points[0].y));

              for (var i = 1; i < this.points.length; i++) {
                e.addPoint(this.points[i].x, this.points[i].y), null != t && t.lineTo(this.points[i].x, this.points[i].y);
              }

              return e;
            }, this.getMarkers = function () {
              for (var t = [], e = 0; e < this.points.length - 1; e++) {
                t.push([this.points[e], this.points[e].angleTo(this.points[e + 1])]);
              }

              return 0 < t.length && t.push([this.points[this.points.length - 1], t[t.length - 1][1]]), t;
            };
          }, A.Element.polyline.prototype = new A.Element.PathElementBase(), A.Element.polygon = function (t) {
            this.base = A.Element.polyline, this.base(t), this.basePath = this.path, this.path = function (t) {
              var e = this.basePath(t);
              return null != t && (t.lineTo(this.points[0].x, this.points[0].y), t.closePath()), e;
            };
          }, A.Element.polygon.prototype = new A.Element.polyline(), A.Element.path = function (t) {
            this.base = A.Element.PathElementBase, this.base(t);
            var e = this.attribute("d").value;
            e = e.replace(/,/gm, " ");

            for (var i = 0; i < 2; i++) {
              e = e.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, "$1 $2");
            }

            for (e = (e = e.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, "$1 $2")).replace(/([0-9])([+\-])/gm, "$1 $2"), i = 0; i < 2; i++) {
              e = e.replace(/(\.[0-9]*)(\.)/gm, "$1 $2");
            }

            e = e.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm, "$1 $3 $4 "), e = A.compressSpaces(e), e = A.trim(e), this.PathParser = new function (t) {
              this.tokens = t.split(" "), this.reset = function () {
                this.i = -1, this.command = "", this.previousCommand = "", this.start = new A.Point(0, 0), this.control = new A.Point(0, 0), this.current = new A.Point(0, 0), this.points = [], this.angles = [];
              }, this.isEnd = function () {
                return this.i >= this.tokens.length - 1;
              }, this.isCommandOrEnd = function () {
                return !!this.isEnd() || null != this.tokens[this.i + 1].match(/^[A-Za-z]$/);
              }, this.isRelativeCommand = function () {
                switch (this.command) {
                  case "m":
                  case "l":
                  case "h":
                  case "v":
                  case "c":
                  case "s":
                  case "q":
                  case "t":
                  case "a":
                  case "z":
                    return !0;
                }

                return !1;
              }, this.getToken = function () {
                return this.i++, this.tokens[this.i];
              }, this.getScalar = function () {
                return parseFloat(this.getToken());
              }, this.nextCommand = function () {
                this.previousCommand = this.command, this.command = this.getToken();
              }, this.getPoint = function () {
                var t = new A.Point(this.getScalar(), this.getScalar());
                return this.makeAbsolute(t);
              }, this.getAsControlPoint = function () {
                var t = this.getPoint();
                return this.control = t;
              }, this.getAsCurrentPoint = function () {
                var t = this.getPoint();
                return this.current = t;
              }, this.getReflectedControlPoint = function () {
                return "c" != this.previousCommand.toLowerCase() && "s" != this.previousCommand.toLowerCase() && "q" != this.previousCommand.toLowerCase() && "t" != this.previousCommand.toLowerCase() ? this.current : new A.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
              }, this.makeAbsolute = function (t) {
                return this.isRelativeCommand() && (t.x += this.current.x, t.y += this.current.y), t;
              }, this.addMarker = function (t, e, i) {
                null != i && 0 < this.angles.length && null == this.angles[this.angles.length - 1] && (this.angles[this.angles.length - 1] = this.points[this.points.length - 1].angleTo(i)), this.addMarkerAngle(t, null == e ? null : e.angleTo(t));
              }, this.addMarkerAngle = function (t, e) {
                this.points.push(t), this.angles.push(e);
              }, this.getMarkerPoints = function () {
                return this.points;
              }, this.getMarkerAngles = function () {
                for (var t = 0; t < this.angles.length; t++) {
                  if (null == this.angles[t]) for (var e = t + 1; e < this.angles.length; e++) {
                    if (null != this.angles[e]) {
                      this.angles[t] = this.angles[e];
                      break;
                    }
                  }
                }

                return this.angles;
              };
            }(e), this.path = function (t) {
              var e = this.PathParser;
              e.reset();
              var i = new A.BoundingBox();

              for (null != t && t.beginPath(); !e.isEnd();) {
                switch (e.nextCommand(), e.command) {
                  case "M":
                  case "m":
                    var n = e.getAsCurrentPoint();

                    for (e.addMarker(n), i.addPoint(n.x, n.y), null != t && t.moveTo(n.x, n.y), e.start = e.current; !e.isCommandOrEnd();) {
                      n = e.getAsCurrentPoint(), e.addMarker(n, e.start), i.addPoint(n.x, n.y), null != t && t.lineTo(n.x, n.y);
                    }

                    break;

                  case "L":
                  case "l":
                    for (; !e.isCommandOrEnd();) {
                      var s = e.current;
                      n = e.getAsCurrentPoint(), e.addMarker(n, s), i.addPoint(n.x, n.y), null != t && t.lineTo(n.x, n.y);
                    }

                    break;

                  case "H":
                  case "h":
                    for (; !e.isCommandOrEnd();) {
                      var a = new A.Point((e.isRelativeCommand() ? e.current.x : 0) + e.getScalar(), e.current.y);
                      e.addMarker(a, e.current), e.current = a, i.addPoint(e.current.x, e.current.y), null != t && t.lineTo(e.current.x, e.current.y);
                    }

                    break;

                  case "V":
                  case "v":
                    for (; !e.isCommandOrEnd();) {
                      a = new A.Point(e.current.x, (e.isRelativeCommand() ? e.current.y : 0) + e.getScalar()), e.addMarker(a, e.current), e.current = a, i.addPoint(e.current.x, e.current.y), null != t && t.lineTo(e.current.x, e.current.y);
                    }

                    break;

                  case "C":
                  case "c":
                    for (; !e.isCommandOrEnd();) {
                      var r = e.current,
                          o = e.getPoint(),
                          l = e.getAsControlPoint(),
                          h = e.getAsCurrentPoint();
                      e.addMarker(h, l, o), i.addBezierCurve(r.x, r.y, o.x, o.y, l.x, l.y, h.x, h.y), null != t && t.bezierCurveTo(o.x, o.y, l.x, l.y, h.x, h.y);
                    }

                    break;

                  case "S":
                  case "s":
                    for (; !e.isCommandOrEnd();) {
                      r = e.current, o = e.getReflectedControlPoint(), l = e.getAsControlPoint(), h = e.getAsCurrentPoint(), e.addMarker(h, l, o), i.addBezierCurve(r.x, r.y, o.x, o.y, l.x, l.y, h.x, h.y), null != t && t.bezierCurveTo(o.x, o.y, l.x, l.y, h.x, h.y);
                    }

                    break;

                  case "Q":
                  case "q":
                    for (; !e.isCommandOrEnd();) {
                      r = e.current, l = e.getAsControlPoint(), h = e.getAsCurrentPoint(), e.addMarker(h, l, l), i.addQuadraticCurve(r.x, r.y, l.x, l.y, h.x, h.y), null != t && t.quadraticCurveTo(l.x, l.y, h.x, h.y);
                    }

                    break;

                  case "T":
                  case "t":
                    for (; !e.isCommandOrEnd();) {
                      r = e.current, l = e.getReflectedControlPoint(), e.control = l, h = e.getAsCurrentPoint(), e.addMarker(h, l, l), i.addQuadraticCurve(r.x, r.y, l.x, l.y, h.x, h.y), null != t && t.quadraticCurveTo(l.x, l.y, h.x, h.y);
                    }

                    break;

                  case "A":
                  case "a":
                    for (; !e.isCommandOrEnd();) {
                      r = e.current;
                      var u = e.getScalar(),
                          c = e.getScalar(),
                          f = e.getScalar() * (Math.PI / 180),
                          m = e.getScalar(),
                          p = e.getScalar(),
                          d = (h = e.getAsCurrentPoint(), new A.Point(Math.cos(f) * (r.x - h.x) / 2 + Math.sin(f) * (r.y - h.y) / 2, -Math.sin(f) * (r.x - h.x) / 2 + Math.cos(f) * (r.y - h.y) / 2)),
                          y = Math.pow(d.x, 2) / Math.pow(u, 2) + Math.pow(d.y, 2) / Math.pow(c, 2);
                      1 < y && (u *= Math.sqrt(y), c *= Math.sqrt(y));
                      var v = (m == p ? -1 : 1) * Math.sqrt((Math.pow(u, 2) * Math.pow(c, 2) - Math.pow(u, 2) * Math.pow(d.y, 2) - Math.pow(c, 2) * Math.pow(d.x, 2)) / (Math.pow(u, 2) * Math.pow(d.y, 2) + Math.pow(c, 2) * Math.pow(d.x, 2)));
                      isNaN(v) && (v = 0);

                      var g = new A.Point(v * u * d.y / c, v * -c * d.x / u),
                          x = new A.Point((r.x + h.x) / 2 + Math.cos(f) * g.x - Math.sin(f) * g.y, (r.y + h.y) / 2 + Math.sin(f) * g.x + Math.cos(f) * g.y),
                          b = function b(t) {
                        return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2));
                      },
                          P = function P(t, e) {
                        return (t[0] * e[0] + t[1] * e[1]) / (b(t) * b(e));
                      },
                          E = function E(t, e) {
                        return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(P(t, e));
                      },
                          w = E([1, 0], [(d.x - g.x) / u, (d.y - g.y) / c]),
                          B = [(d.x - g.x) / u, (d.y - g.y) / c],
                          C = [(-d.x - g.x) / u, (-d.y - g.y) / c],
                          T = E(B, C);

                      P(B, C) <= -1 && (T = Math.PI), 1 <= P(B, C) && (T = 0);
                      var V = 1 - p ? 1 : -1,
                          M = w + V * (T / 2),
                          S = new A.Point(x.x + u * Math.cos(M), x.y + c * Math.sin(M));

                      if (e.addMarkerAngle(S, M - V * Math.PI / 2), e.addMarkerAngle(h, M - V * Math.PI), i.addPoint(h.x, h.y), null != t) {
                        P = c < u ? u : c;
                        var k = c < u ? 1 : u / c,
                            D = c < u ? c / u : 1;
                        t.translate(x.x, x.y), t.rotate(f), t.scale(k, D), t.arc(0, 0, P, w, w + T, 1 - p), t.scale(1 / k, 1 / D), t.rotate(-f), t.translate(-x.x, -x.y);
                      }
                    }

                    break;

                  case "Z":
                  case "z":
                    null != t && i.x1 !== i.x2 && i.y1 !== i.y2 && t.closePath(), e.current = e.start;
                }
              }

              return i;
            }, this.getMarkers = function () {
              for (var t = this.PathParser.getMarkerPoints(), e = this.PathParser.getMarkerAngles(), i = [], n = 0; n < t.length; n++) {
                i.push([t[n], e[n]]);
              }

              return i;
            };
          }, A.Element.path.prototype = new A.Element.PathElementBase(), A.Element.pattern = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.createPattern = function (t, e) {
              var i = this.attribute("width").toPixels("x", !0),
                  n = this.attribute("height").toPixels("y", !0),
                  s = new A.Element.svg();
              s.attributes.viewBox = new A.Property("viewBox", this.attribute("viewBox").value), s.attributes.width = new A.Property("width", i + "px"), s.attributes.height = new A.Property("height", n + "px"), s.attributes.transform = new A.Property("transform", this.attribute("patternTransform").value), s.children = this.children;
              var a = p();
              a.width = i, a.height = n;
              var r = a.getContext("2d");
              this.attribute("x").hasValue() && this.attribute("y").hasValue() && r.translate(this.attribute("x").toPixels("x", !0), this.attribute("y").toPixels("y", !0));

              for (var o = -1; o <= 1; o++) {
                for (var l = -1; l <= 1; l++) {
                  r.save(), s.attributes.x = new A.Property("x", o * a.width), s.attributes.y = new A.Property("y", l * a.height), s.render(r), r.restore();
                }
              }

              return t.createPattern(a, "repeat");
            };
          }, A.Element.pattern.prototype = new A.Element.ElementBase(), A.Element.marker = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.baseRender = this.render, this.render = function (t, e, i) {
              if (e) {
                t.translate(e.x, e.y), "auto" == this.attribute("orient").valueOrDefault("auto") && t.rotate(i), "strokeWidth" == this.attribute("markerUnits").valueOrDefault("strokeWidth") && t.scale(t.lineWidth, t.lineWidth), t.save();
                var n = new A.Element.svg();
                n.attributes.viewBox = new A.Property("viewBox", this.attribute("viewBox").value), n.attributes.refX = new A.Property("refX", this.attribute("refX").value), n.attributes.refY = new A.Property("refY", this.attribute("refY").value), n.attributes.width = new A.Property("width", this.attribute("markerWidth").value), n.attributes.height = new A.Property("height", this.attribute("markerHeight").value), n.attributes.fill = new A.Property("fill", this.attribute("fill").valueOrDefault("black")), n.attributes.stroke = new A.Property("stroke", this.attribute("stroke").valueOrDefault("none")), n.children = this.children, n.render(t), t.restore(), "strokeWidth" == this.attribute("markerUnits").valueOrDefault("strokeWidth") && t.scale(1 / t.lineWidth, 1 / t.lineWidth), "auto" == this.attribute("orient").valueOrDefault("auto") && t.rotate(-i), t.translate(-e.x, -e.y);
              }
            };
          }, A.Element.marker.prototype = new A.Element.ElementBase(), A.Element.defs = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.render = function (t) {};
          }, A.Element.defs.prototype = new A.Element.ElementBase(), A.Element.GradientBase = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.stops = [];

            for (var e = 0; e < this.children.length; e++) {
              var i = this.children[e];
              "stop" == i.type && this.stops.push(i);
            }

            this.getGradient = function () {}, this.gradientUnits = function () {
              return this.attribute("gradientUnits").valueOrDefault("objectBoundingBox");
            }, this.attributesToInherit = ["gradientUnits"], this.inheritStopContainer = function (t) {
              for (var e = 0; e < this.attributesToInherit.length; e++) {
                var i = this.attributesToInherit[e];
                !this.attribute(i).hasValue() && t.attribute(i).hasValue() && (this.attribute(i, !0).value = t.attribute(i).value);
              }
            }, this.createGradient = function (t, e, i) {
              var n = this;
              this.getHrefAttribute().hasValue() && (n = this.getHrefAttribute().getDefinition(), this.inheritStopContainer(n));

              var s = function s(t) {
                return i.hasValue() ? new A.Property("color", t).addOpacity(i).value : t;
              },
                  a = this.getGradient(t, e);

              if (null == a) return s(n.stops[n.stops.length - 1].color);

              for (var r = 0; r < n.stops.length; r++) {
                a.addColorStop(n.stops[r].offset, s(n.stops[r].color));
              }

              if (this.attribute("gradientTransform").hasValue()) {
                var o = A.ViewPort.viewPorts[0],
                    l = new A.Element.rect();
                l.attributes.x = new A.Property("x", -A.MAX_VIRTUAL_PIXELS / 3), l.attributes.y = new A.Property("y", -A.MAX_VIRTUAL_PIXELS / 3), l.attributes.width = new A.Property("width", A.MAX_VIRTUAL_PIXELS), l.attributes.height = new A.Property("height", A.MAX_VIRTUAL_PIXELS);
                var h = new A.Element.g();
                h.attributes.transform = new A.Property("transform", this.attribute("gradientTransform").value), h.children = [l];
                var u = new A.Element.svg();
                u.attributes.x = new A.Property("x", 0), u.attributes.y = new A.Property("y", 0), u.attributes.width = new A.Property("width", o.width), u.attributes.height = new A.Property("height", o.height), u.children = [h];
                var c = p();
                c.width = o.width, c.height = o.height;
                var f = c.getContext("2d");
                return f.fillStyle = a, u.render(f), f.createPattern(c, "no-repeat");
              }

              return a;
            };
          }, A.Element.GradientBase.prototype = new A.Element.ElementBase(), A.Element.linearGradient = function (t) {
            this.base = A.Element.GradientBase, this.base(t), this.attributesToInherit.push("x1"), this.attributesToInherit.push("y1"), this.attributesToInherit.push("x2"), this.attributesToInherit.push("y2"), this.getGradient = function (t, e) {
              var i = "objectBoundingBox" == this.gradientUnits() ? e.getBoundingBox(t) : null;
              this.attribute("x1").hasValue() || this.attribute("y1").hasValue() || this.attribute("x2").hasValue() || this.attribute("y2").hasValue() || (this.attribute("x1", !0).value = 0, this.attribute("y1", !0).value = 0, this.attribute("x2", !0).value = 1, this.attribute("y2", !0).value = 0);
              var n = "objectBoundingBox" == this.gradientUnits() ? i.x() + i.width() * this.attribute("x1").numValue() : this.attribute("x1").toPixels("x"),
                  s = "objectBoundingBox" == this.gradientUnits() ? i.y() + i.height() * this.attribute("y1").numValue() : this.attribute("y1").toPixels("y"),
                  a = "objectBoundingBox" == this.gradientUnits() ? i.x() + i.width() * this.attribute("x2").numValue() : this.attribute("x2").toPixels("x"),
                  r = "objectBoundingBox" == this.gradientUnits() ? i.y() + i.height() * this.attribute("y2").numValue() : this.attribute("y2").toPixels("y");
              return n == a && s == r ? null : t.createLinearGradient(n, s, a, r);
            };
          }, A.Element.linearGradient.prototype = new A.Element.GradientBase(), A.Element.radialGradient = function (t) {
            this.base = A.Element.GradientBase, this.base(t), this.attributesToInherit.push("cx"), this.attributesToInherit.push("cy"), this.attributesToInherit.push("r"), this.attributesToInherit.push("fx"), this.attributesToInherit.push("fy"), this.getGradient = function (t, e) {
              var i = e.getBoundingBox(t);
              this.attribute("cx").hasValue() || (this.attribute("cx", !0).value = "50%"), this.attribute("cy").hasValue() || (this.attribute("cy", !0).value = "50%"), this.attribute("r").hasValue() || (this.attribute("r", !0).value = "50%");
              var n = "objectBoundingBox" == this.gradientUnits() ? i.x() + i.width() * this.attribute("cx").numValue() : this.attribute("cx").toPixels("x"),
                  s = "objectBoundingBox" == this.gradientUnits() ? i.y() + i.height() * this.attribute("cy").numValue() : this.attribute("cy").toPixels("y"),
                  a = n,
                  r = s;
              this.attribute("fx").hasValue() && (a = "objectBoundingBox" == this.gradientUnits() ? i.x() + i.width() * this.attribute("fx").numValue() : this.attribute("fx").toPixels("x")), this.attribute("fy").hasValue() && (r = "objectBoundingBox" == this.gradientUnits() ? i.y() + i.height() * this.attribute("fy").numValue() : this.attribute("fy").toPixels("y"));
              var o = "objectBoundingBox" == this.gradientUnits() ? (i.width() + i.height()) / 2 * this.attribute("r").numValue() : this.attribute("r").toPixels();
              return t.createRadialGradient(a, r, 0, n, s, o);
            };
          }, A.Element.radialGradient.prototype = new A.Element.GradientBase(), A.Element.stop = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.offset = this.attribute("offset").numValue(), this.offset < 0 && (this.offset = 0), 1 < this.offset && (this.offset = 1);
            var e = this.style("stop-color", !0);
            "" === e.value && (e.value = "#000"), this.style("stop-opacity").hasValue() && (e = e.addOpacity(this.style("stop-opacity"))), this.color = e.value;
          }, A.Element.stop.prototype = new A.Element.ElementBase(), A.Element.AnimateBase = function (t) {
            this.base = A.Element.ElementBase, this.base(t), A.Animations.push(this), this.duration = 0, this.begin = this.attribute("begin").toMilliseconds(), this.maxDuration = this.begin + this.attribute("dur").toMilliseconds(), this.getProperty = function () {
              var t = this.attribute("attributeType").value,
                  e = this.attribute("attributeName").value;
              return "CSS" == t ? this.parent.style(e, !0) : this.parent.attribute(e, !0);
            }, this.initialValue = null, this.initialUnits = "", this.removed = !1, this.calcValue = function () {
              return "";
            }, this.update = function (t) {
              if (null == this.initialValue && (this.initialValue = this.getProperty().value, this.initialUnits = this.getProperty().getUnits()), this.duration > this.maxDuration) {
                if ("indefinite" == this.attribute("repeatCount").value || "indefinite" == this.attribute("repeatDur").value) this.duration = 0;else if ("freeze" != this.attribute("fill").valueOrDefault("remove") || this.frozen) {
                  if ("remove" == this.attribute("fill").valueOrDefault("remove") && !this.removed) return this.removed = !0, this.getProperty().value = this.parent.animationFrozen ? this.parent.animationFrozenValue : this.initialValue, !0;
                } else this.frozen = !0, this.parent.animationFrozen = !0, this.parent.animationFrozenValue = this.getProperty().value;
                return !1;
              }

              this.duration = this.duration + t;
              var e = !1;

              if (this.begin < this.duration) {
                var i = this.calcValue();
                this.attribute("type").hasValue() && (i = this.attribute("type").value + "(" + i + ")"), this.getProperty().value = i, e = !0;
              }

              return e;
            }, this.from = this.attribute("from"), this.to = this.attribute("to"), this.values = this.attribute("values"), this.values.hasValue() && (this.values.value = this.values.value.split(";")), this.progress = function () {
              var t = {
                progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
              };

              if (this.values.hasValue()) {
                var e = t.progress * (this.values.value.length - 1),
                    i = Math.floor(e),
                    n = Math.ceil(e);
                t.from = new A.Property("from", parseFloat(this.values.value[i])), t.to = new A.Property("to", parseFloat(this.values.value[n])), t.progress = (e - i) / (n - i);
              } else t.from = this.from, t.to = this.to;

              return t;
            };
          }, A.Element.AnimateBase.prototype = new A.Element.ElementBase(), A.Element.animate = function (t) {
            this.base = A.Element.AnimateBase, this.base(t), this.calcValue = function () {
              var t = this.progress();
              return t.from.numValue() + (t.to.numValue() - t.from.numValue()) * t.progress + this.initialUnits;
            };
          }, A.Element.animate.prototype = new A.Element.AnimateBase(), A.Element.animateColor = function (t) {
            this.base = A.Element.AnimateBase, this.base(t), this.calcValue = function () {
              var t = this.progress(),
                  e = new m(t.from.value),
                  i = new m(t.to.value);

              if (e.ok && i.ok) {
                var n = e.r + (i.r - e.r) * t.progress,
                    s = e.g + (i.g - e.g) * t.progress,
                    a = e.b + (i.b - e.b) * t.progress;
                return "rgb(" + parseInt(n, 10) + "," + parseInt(s, 10) + "," + parseInt(a, 10) + ")";
              }

              return this.attribute("from").value;
            };
          }, A.Element.animateColor.prototype = new A.Element.AnimateBase(), A.Element.animateTransform = function (t) {
            this.base = A.Element.AnimateBase, this.base(t), this.calcValue = function () {
              for (var t = this.progress(), e = A.ToNumberArray(t.from.value), i = A.ToNumberArray(t.to.value), n = "", s = 0; s < e.length; s++) {
                n += e[s] + (i[s] - e[s]) * t.progress + " ";
              }

              return n;
            };
          }, A.Element.animateTransform.prototype = new A.Element.animate(), A.Element.font = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.horizAdvX = this.attribute("horiz-adv-x").numValue(), this.isRTL = !1, this.isArabic = !1, this.fontFace = null, this.missingGlyph = null, this.glyphs = [];

            for (var e = 0; e < this.children.length; e++) {
              var i = this.children[e];
              "font-face" == i.type ? (this.fontFace = i).style("font-family").hasValue() && (A.Definitions[i.style("font-family").value] = this) : "missing-glyph" == i.type ? this.missingGlyph = i : "glyph" == i.type && ("" != i.arabicForm ? (this.isRTL = !0, this.isArabic = !0, void 0 === this.glyphs[i.unicode] && (this.glyphs[i.unicode] = []), this.glyphs[i.unicode][i.arabicForm] = i) : this.glyphs[i.unicode] = i);
            }
          }, A.Element.font.prototype = new A.Element.ElementBase(), A.Element.fontface = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.ascent = this.attribute("ascent").value, this.descent = this.attribute("descent").value, this.unitsPerEm = this.attribute("units-per-em").numValue();
          }, A.Element.fontface.prototype = new A.Element.ElementBase(), A.Element.missingglyph = function (t) {
            this.base = A.Element.path, this.base(t), this.horizAdvX = 0;
          }, A.Element.missingglyph.prototype = new A.Element.path(), A.Element.glyph = function (t) {
            this.base = A.Element.path, this.base(t), this.horizAdvX = this.attribute("horiz-adv-x").numValue(), this.unicode = this.attribute("unicode").value, this.arabicForm = this.attribute("arabic-form").value;
          }, A.Element.glyph.prototype = new A.Element.path(), A.Element.text = function (t) {
            this.captureTextNodes = !0, this.base = A.Element.RenderedElementBase, this.base(t), this.baseSetContext = this.setContext, this.setContext = function (t) {
              this.baseSetContext(t);
              var e = this.style("dominant-baseline").toTextBaseline();
              null == e && (e = this.style("alignment-baseline").toTextBaseline()), null != e && (t.textBaseline = e);
            }, this.initializeCoordinates = function (t) {
              this.x = this.attribute("x").toPixels("x"), this.y = this.attribute("y").toPixels("y"), this.attribute("dx").hasValue() && (this.x += this.attribute("dx").toPixels("x")), this.attribute("dy").hasValue() && (this.y += this.attribute("dy").toPixels("y")), this.x += this.getAnchorDelta(t, this, 0);
            }, this.getBoundingBox = function (t) {
              this.initializeCoordinates(t);

              for (var e = null, i = 0; i < this.children.length; i++) {
                var n = this.getChildBoundingBox(t, this, this, i);
                null == e ? e = n : e.addBoundingBox(n);
              }

              return e;
            }, this.renderChildren = function (t) {
              this.initializeCoordinates(t);

              for (var e = 0; e < this.children.length; e++) {
                this.renderChild(t, this, this, e);
              }
            }, this.getAnchorDelta = function (t, e, i) {
              var n = this.style("text-anchor").valueOrDefault("start");

              if ("start" != n) {
                for (var s = 0, a = i; a < e.children.length; a++) {
                  var r = e.children[a];
                  if (i < a && r.attribute("x").hasValue()) break;
                  s += r.measureTextRecursive(t);
                }

                return -1 * ("end" == n ? s : s / 2);
              }

              return 0;
            }, this.adjustChildCoordinates = function (t, e, i, n) {
              var s = i.children[n];
              return s.attribute("x").hasValue() ? (s.x = s.attribute("x").toPixels("x") + e.getAnchorDelta(t, i, n), s.attribute("dx").hasValue() && (s.x += s.attribute("dx").toPixels("x"))) : (s.attribute("dx").hasValue() && (e.x += s.attribute("dx").toPixels("x")), s.x = e.x), e.x = s.x + s.measureText(t), s.attribute("y").hasValue() ? (s.y = s.attribute("y").toPixels("y"), s.attribute("dy").hasValue() && (s.y += s.attribute("dy").toPixels("y"))) : (s.attribute("dy").hasValue() && (e.y += s.attribute("dy").toPixels("y")), s.y = e.y), e.y = s.y, s;
            }, this.getChildBoundingBox = function (t, e, i, n) {
              var s = this.adjustChildCoordinates(t, e, i, n),
                  a = s.getBoundingBox(t);

              for (n = 0; n < s.children.length; n++) {
                var r = e.getChildBoundingBox(t, e, s, n);
                a.addBoundingBox(r);
              }

              return a;
            }, this.renderChild = function (t, e, i, n) {
              var s = this.adjustChildCoordinates(t, e, i, n);

              for (s.render(t), n = 0; n < s.children.length; n++) {
                e.renderChild(t, e, s, n);
              }
            };
          }, A.Element.text.prototype = new A.Element.RenderedElementBase(), A.Element.TextElementBase = function (t) {
            this.base = A.Element.RenderedElementBase, this.base(t), this.getGlyph = function (t, e, i) {
              var n = e[i],
                  s = null;

              if (t.isArabic) {
                var a = "isolated";
                (0 == i || " " == e[i - 1]) && i < e.length - 2 && " " != e[i + 1] && (a = "terminal"), 0 < i && " " != e[i - 1] && i < e.length - 2 && " " != e[i + 1] && (a = "medial"), 0 < i && " " != e[i - 1] && (i == e.length - 1 || " " == e[i + 1]) && (a = "initial"), void 0 !== t.glyphs[n] && null == (s = t.glyphs[n][a]) && "glyph" == t.glyphs[n].type && (s = t.glyphs[n]);
              } else s = t.glyphs[n];

              return null == s && (s = t.missingGlyph), s;
            }, this.renderChildren = function (t) {
              var e = this.parent.style("font-family").getDefinition();
              if (null == e) "stroke" == t.paintOrder ? ("" != t.strokeStyle && t.strokeText(A.compressSpaces(this.getText()), this.x, this.y), "" != t.fillStyle && t.fillText(A.compressSpaces(this.getText()), this.x, this.y)) : ("" != t.fillStyle && t.fillText(A.compressSpaces(this.getText()), this.x, this.y), "" != t.strokeStyle && t.strokeText(A.compressSpaces(this.getText()), this.x, this.y));else {
                var i = this.parent.style("font-size").numValueOrDefault(A.Font.Parse(A.ctx.font).fontSize),
                    n = this.parent.style("font-style").valueOrDefault(A.Font.Parse(A.ctx.font).fontStyle),
                    s = this.getText();
                e.isRTL && (s = s.split("").reverse().join(""));

                for (var a = A.ToNumberArray(this.parent.attribute("dx").value), r = 0; r < s.length; r++) {
                  var o = this.getGlyph(e, s, r),
                      l = i / e.fontFace.unitsPerEm;
                  t.translate(this.x, this.y), t.scale(l, -l);
                  var h = t.lineWidth;
                  t.lineWidth = t.lineWidth * e.fontFace.unitsPerEm / i, "italic" == n && t.transform(1, 0, .4, 1, 0, 0), o.render(t), "italic" == n && t.transform(1, 0, -.4, 1, 0, 0), t.lineWidth = h, t.scale(1 / l, -1 / l), t.translate(-this.x, -this.y), this.x += i * (o.horizAdvX || e.horizAdvX) / e.fontFace.unitsPerEm, void 0 === a[r] || isNaN(a[r]) || (this.x += a[r]);
                }
              }
            }, this.getText = function () {}, this.measureTextRecursive = function (t) {
              for (var e = this.measureText(t), i = 0; i < this.children.length; i++) {
                e += this.children[i].measureTextRecursive(t);
              }

              return e;
            }, this.measureText = function (t) {
              var e = this.parent.style("font-family").getDefinition();

              if (null != e) {
                var i = this.parent.style("font-size").numValueOrDefault(A.Font.Parse(A.ctx.font).fontSize),
                    n = 0,
                    s = this.getText();
                e.isRTL && (s = s.split("").reverse().join(""));

                for (var a = A.ToNumberArray(this.parent.attribute("dx").value), r = 0; r < s.length; r++) {
                  n += (this.getGlyph(e, s, r).horizAdvX || e.horizAdvX) * i / e.fontFace.unitsPerEm, void 0 === a[r] || isNaN(a[r]) || (n += a[r]);
                }

                return n;
              }

              var o = A.compressSpaces(this.getText());
              if (!t.measureText) return 10 * o.length;
              t.save(), this.setContext(t, !0);
              var l = t.measureText(o).width;
              return t.restore(), l;
            }, this.getBoundingBox = function (t) {
              var e = this.parent.style("font-size").numValueOrDefault(A.Font.Parse(A.ctx.font).fontSize);
              return new A.BoundingBox(this.x, this.y - e, this.x + this.measureText(t), this.y);
            };
          }, A.Element.TextElementBase.prototype = new A.Element.RenderedElementBase(), A.Element.tspan = function (t) {
            this.captureTextNodes = !0, this.base = A.Element.TextElementBase, this.base(t), this.text = A.compressSpaces(t.value || t.text || t.textContent || ""), this.getText = function () {
              return 0 < this.children.length ? "" : this.text;
            };
          }, A.Element.tspan.prototype = new A.Element.TextElementBase(), A.Element.tref = function (t) {
            this.base = A.Element.TextElementBase, this.base(t), this.getText = function () {
              var t = this.getHrefAttribute().getDefinition();
              if (null != t) return t.children[0].getText();
            };
          }, A.Element.tref.prototype = new A.Element.TextElementBase(), A.Element.a = function (t) {
            this.base = A.Element.TextElementBase, this.base(t), this.hasText = 0 < t.childNodes.length;

            for (var e = 0; e < t.childNodes.length; e++) {
              3 != t.childNodes[e].nodeType && (this.hasText = !1);
            }

            this.text = this.hasText ? t.childNodes[0].value || t.childNodes[0].data : "", this.getText = function () {
              return this.text;
            }, this.baseRenderChildren = this.renderChildren, this.renderChildren = function (t) {
              if (this.hasText) {
                this.baseRenderChildren(t);
                var e = new A.Property("fontSize", A.Font.Parse(A.ctx.font).fontSize);
                A.Mouse.checkBoundingBox(this, new A.BoundingBox(this.x, this.y - e.toPixels("y"), this.x + this.measureText(t), this.y));
              } else if (0 < this.children.length) {
                var i = new A.Element.g();
                i.children = this.children, i.parent = this, i.render(t);
              }
            }, this.onclick = function () {
              u.open(this.getHrefAttribute().value);
            }, this.onmousemove = function () {
              A.ctx.canvas.style.cursor = "pointer";
            };
          }, A.Element.a.prototype = new A.Element.TextElementBase(), A.Element.image = function (t) {
            this.base = A.Element.RenderedElementBase, this.base(t);
            var e = this.getHrefAttribute().value;

            if ("" != e) {
              var a = e.match(/\.svg$/);
              if (A.Images.push(this), this.loaded = !1, a) this.img = A.ajax(e), this.loaded = !0;else {
                this.img = document.createElement("img"), 1 == A.opts.useCORS && (this.img.crossOrigin = "Anonymous");
                var r = this;
                this.img.onload = function () {
                  r.loaded = !0;
                }, this.img.onerror = function () {
                  A.log('ERROR: image "' + e + '" not found'), r.loaded = !0;
                }, this.img.src = e;
              }
              this.renderChildren = function (t) {
                var e = this.attribute("x").toPixels("x"),
                    i = this.attribute("y").toPixels("y"),
                    n = this.attribute("width").toPixels("x"),
                    s = this.attribute("height").toPixels("y");
                0 != n && 0 != s && (t.save(), a ? t.drawSvg(this.img, e, i, n, s) : (t.translate(e, i), A.AspectRatio(t, this.attribute("preserveAspectRatio").value, n, this.img.width, s, this.img.height, 0, 0), r.loaded && (void 0 === this.img.complete || this.img.complete) && t.drawImage(this.img, 0, 0)), t.restore());
              }, this.getBoundingBox = function () {
                var t = this.attribute("x").toPixels("x"),
                    e = this.attribute("y").toPixels("y"),
                    i = this.attribute("width").toPixels("x"),
                    n = this.attribute("height").toPixels("y");
                return new A.BoundingBox(t, e, t + i, e + n);
              };
            }
          }, A.Element.image.prototype = new A.Element.RenderedElementBase(), A.Element.g = function (t) {
            this.base = A.Element.RenderedElementBase, this.base(t), this.getBoundingBox = function (t) {
              for (var e = new A.BoundingBox(), i = 0; i < this.children.length; i++) {
                e.addBoundingBox(this.children[i].getBoundingBox(t));
              }

              return e;
            };
          }, A.Element.g.prototype = new A.Element.RenderedElementBase(), A.Element.symbol = function (t) {
            this.base = A.Element.RenderedElementBase, this.base(t), this.render = function (t) {};
          }, A.Element.symbol.prototype = new A.Element.RenderedElementBase(), A.Element.style = function (t) {
            this.base = A.Element.ElementBase, this.base(t);

            for (var e = "", i = 0; i < t.childNodes.length; i++) {
              e += t.childNodes[i].data;
            }

            e = e.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, "");
            var n = (e = A.compressSpaces(e)).split("}");

            for (i = 0; i < n.length; i++) {
              if ("" != A.trim(n[i])) for (var s = n[i].split("{"), a = s[0].split(","), r = s[1].split(";"), o = 0; o < a.length; o++) {
                var l = A.trim(a[o]);

                if ("" != l) {
                  for (var h = A.Styles[l] || {}, u = 0; u < r.length; u++) {
                    var c = r[u].indexOf(":"),
                        f = r[u].substr(0, c),
                        m = r[u].substr(c + 1, r[u].length - c);
                    null != f && null != m && (h[A.trim(f)] = new A.Property(A.trim(f), A.trim(m)));
                  }

                  if (A.Styles[l] = h, A.StylesSpecificity[l] = w(l), "@font-face" == l) for (var p = h["font-family"].value.replace(/"/g, ""), d = h.src.value.split(","), y = 0; y < d.length; y++) {
                    if (0 < d[y].indexOf('format("svg")')) for (var v = d[y].indexOf("url"), g = d[y].indexOf(")", v), x = d[y].substr(v + 5, g - v - 6), b = A.parseXml(A.ajax(x)).getElementsByTagName("font"), P = 0; P < b.length; P++) {
                      var E = A.CreateElement(b[P]);
                      A.Definitions[p] = E;
                    }
                  }
                }
              }
            }
          }, A.Element.style.prototype = new A.Element.ElementBase(), A.Element.use = function (t) {
            this.base = A.Element.RenderedElementBase, this.base(t), this.baseSetContext = this.setContext, this.setContext = function (t) {
              this.baseSetContext(t), this.attribute("x").hasValue() && t.translate(this.attribute("x").toPixels("x"), 0), this.attribute("y").hasValue() && t.translate(0, this.attribute("y").toPixels("y"));
            };
            var n = this.getHrefAttribute().getDefinition();
            this.path = function (t) {
              null != n && n.path(t);
            }, this.elementTransform = function () {
              if (null != n && n.style("transform", !1, !0).hasValue()) return new A.Transform(n.style("transform", !1, !0).value);
            }, this.getBoundingBox = function (t) {
              if (null != n) return n.getBoundingBox(t);
            }, this.renderChildren = function (t) {
              if (null != n) {
                var e = n;
                "symbol" == n.type && ((e = new A.Element.svg()).type = "svg", e.attributes.viewBox = new A.Property("viewBox", n.attribute("viewBox").value), e.attributes.preserveAspectRatio = new A.Property("preserveAspectRatio", n.attribute("preserveAspectRatio").value), e.attributes.overflow = new A.Property("overflow", n.attribute("overflow").value), e.children = n.children), "svg" == e.type && (this.attribute("width").hasValue() && (e.attributes.width = new A.Property("width", this.attribute("width").value)), this.attribute("height").hasValue() && (e.attributes.height = new A.Property("height", this.attribute("height").value)));
                var i = e.parent;
                e.parent = null, e.render(t), e.parent = i;
              }
            };
          }, A.Element.use.prototype = new A.Element.RenderedElementBase(), A.Element.mask = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.apply = function (t, e) {
              var i = this.attribute("x").toPixels("x"),
                  n = this.attribute("y").toPixels("y"),
                  s = this.attribute("width").toPixels("x"),
                  a = this.attribute("height").toPixels("y");

              if (0 == s && 0 == a) {
                for (var r = new A.BoundingBox(), o = 0; o < this.children.length; o++) {
                  r.addBoundingBox(this.children[o].getBoundingBox(t));
                }

                i = Math.floor(r.x1), n = Math.floor(r.y1), s = Math.floor(r.width()), a = Math.floor(r.height());
              }

              var l = e.attribute("mask").value;
              e.attribute("mask").value = "";
              var h = p();
              h.width = i + s, h.height = n + a;
              var u = h.getContext("2d");
              this.renderChildren(u);
              var c = p();
              c.width = i + s, c.height = n + a;
              var f = c.getContext("2d");
              e.render(f), f.globalCompositeOperation = "destination-in", f.fillStyle = u.createPattern(h, "no-repeat"), f.fillRect(0, 0, i + s, n + a), t.fillStyle = f.createPattern(c, "no-repeat"), t.fillRect(0, 0, i + s, n + a), e.attribute("mask").value = l;
            }, this.render = function (t) {};
          }, A.Element.mask.prototype = new A.Element.ElementBase(), A.Element.clipPath = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.apply = function (t) {
              var e = "undefined" != typeof CanvasRenderingContext2D,
                  i = t.beginPath,
                  n = t.closePath;
              e && (CanvasRenderingContext2D.prototype.beginPath = function () {}, CanvasRenderingContext2D.prototype.closePath = function () {}), i.call(t);

              for (var s = 0; s < this.children.length; s++) {
                var a = this.children[s];

                if (void 0 !== a.path) {
                  var r = void 0 !== a.elementTransform && a.elementTransform();
                  !r && a.style("transform", !1, !0).hasValue() && (r = new A.Transform(a.style("transform", !1, !0).value)), r && r.apply(t), a.path(t), e && (CanvasRenderingContext2D.prototype.closePath = n), r && r.unapply(t);
                }
              }

              n.call(t), t.clip(), e && (CanvasRenderingContext2D.prototype.beginPath = i, CanvasRenderingContext2D.prototype.closePath = n);
            }, this.render = function (t) {};
          }, A.Element.clipPath.prototype = new A.Element.ElementBase(), A.Element.filter = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.apply = function (t, e) {
              var i = e.getBoundingBox(t),
                  n = Math.floor(i.x1),
                  s = Math.floor(i.y1),
                  a = Math.floor(i.width()),
                  r = Math.floor(i.height()),
                  o = e.style("filter").value;
              e.style("filter").value = "";

              for (var l = 0, h = 0, u = 0; u < this.children.length; u++) {
                var c = this.children[u].extraFilterDistance || 0;
                l = Math.max(l, c), h = Math.max(h, c);
              }

              var f = p();
              f.width = a + 2 * l, f.height = r + 2 * h;
              var m = f.getContext("2d");

              for (m.translate(-n + l, -s + h), e.render(m), u = 0; u < this.children.length; u++) {
                "function" == typeof this.children[u].apply && this.children[u].apply(m, 0, 0, a + 2 * l, r + 2 * h);
              }

              t.drawImage(f, 0, 0, a + 2 * l, r + 2 * h, n - l, s - h, a + 2 * l, r + 2 * h), e.style("filter", !0).value = o;
            }, this.render = function (t) {};
          }, A.Element.filter.prototype = new A.Element.ElementBase(), A.Element.feMorphology = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.apply = function (t, e, i, n, s) {};
          }, A.Element.feMorphology.prototype = new A.Element.ElementBase(), A.Element.feComposite = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.apply = function (t, e, i, n, s) {};
          }, A.Element.feComposite.prototype = new A.Element.ElementBase(), A.Element.feColorMatrix = function (t) {
            this.base = A.Element.ElementBase, this.base(t);
            var n = A.ToNumberArray(this.attribute("values").value);

            switch (this.attribute("type").valueOrDefault("matrix")) {
              case "saturate":
                var e = n[0];
                n = [.213 + .787 * e, .715 - .715 * e, .072 - .072 * e, 0, 0, .213 - .213 * e, .715 + .285 * e, .072 - .072 * e, 0, 0, .213 - .213 * e, .715 - .715 * e, .072 + .928 * e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                break;

              case "hueRotate":
                var s = n[0] * Math.PI / 180,
                    i = function i(t, e, _i) {
                  return t + Math.cos(s) * e + Math.sin(s) * _i;
                };

                n = [i(.213, .787, -.213), i(.715, -.715, -.715), i(.072, -.072, .928), 0, 0, i(.213, -.213, .143), i(.715, .285, .14), i(.072, -.072, -.283), 0, 0, i(.213, -.213, -.787), i(.715, -.715, .715), i(.072, .928, .072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                break;

              case "luminanceToAlpha":
                n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .2125, .7154, .0721, 0, 0, 0, 0, 0, 0, 1];
            }

            function u(t, e, i, n, s, a) {
              return t[i * n * 4 + 4 * e + a];
            }

            function c(t, e, i, n, s, a, r) {
              t[i * n * 4 + 4 * e + a] = r;
            }

            function f(t, e) {
              var i = n[t];
              return i * (i < 0 ? e - 255 : e);
            }

            this.apply = function (t, e, i, n, s) {
              var a = t.getImageData(0, 0, n, s);

              for (i = 0; i < s; i++) {
                for (e = 0; e < n; e++) {
                  var r = u(a.data, e, i, n, 0, 0),
                      o = u(a.data, e, i, n, 0, 1),
                      l = u(a.data, e, i, n, 0, 2),
                      h = u(a.data, e, i, n, 0, 3);
                  c(a.data, e, i, n, 0, 0, f(0, r) + f(1, o) + f(2, l) + f(3, h) + f(4, 1)), c(a.data, e, i, n, 0, 1, f(5, r) + f(6, o) + f(7, l) + f(8, h) + f(9, 1)), c(a.data, e, i, n, 0, 2, f(10, r) + f(11, o) + f(12, l) + f(13, h) + f(14, 1)), c(a.data, e, i, n, 0, 3, f(15, r) + f(16, o) + f(17, l) + f(18, h) + f(19, 1));
                }
              }

              t.clearRect(0, 0, n, s), t.putImageData(a, 0, 0);
            };
          }, A.Element.feColorMatrix.prototype = new A.Element.ElementBase(), A.Element.feGaussianBlur = function (t) {
            this.base = A.Element.ElementBase, this.base(t), this.blurRadius = Math.floor(this.attribute("stdDeviation").numValue()), this.extraFilterDistance = this.blurRadius, this.apply = function (t, e, i, n, s) {
              d && void 0 !== d.canvasRGBA ? (t.canvas.id = A.UniqueId(), t.canvas.style.display = "none", document.body.appendChild(t.canvas), d.canvasRGBA(t.canvas, e, i, n, s, this.blurRadius), document.body.removeChild(t.canvas)) : A.log("ERROR: StackBlur.js must be included for blur to work");
            };
          }, A.Element.feGaussianBlur.prototype = new A.Element.ElementBase(), A.Element.title = function (t) {}, A.Element.title.prototype = new A.Element.ElementBase(), A.Element.desc = function (t) {}, A.Element.desc.prototype = new A.Element.ElementBase(), A.Element.MISSING = function (t) {
            A.log("ERROR: Element '" + t.nodeName + "' not yet implemented.");
          }, A.Element.MISSING.prototype = new A.Element.ElementBase(), A.CreateElement = function (t) {
            var e = t.nodeName.replace(/^[^:]+:/, "");
            e = e.replace(/\-/g, "");
            var i = null;
            return (i = void 0 !== A.Element[e] ? new A.Element[e](t) : new A.Element.MISSING(t)).type = t.nodeName, i;
          }, A.load = function (t, e) {
            A.loadXml(t, A.ajax(e));
          }, A.loadXml = function (t, e) {
            A.loadXmlDoc(t, A.parseXml(e));
          }, A.loadXmlDoc = function (a, r) {
            A.init(a);

            var i = function i(t) {
              for (var e = a.canvas; e;) {
                t.x -= e.offsetLeft, t.y -= e.offsetTop, e = e.offsetParent;
              }

              return u.scrollX && (t.x += u.scrollX), u.scrollY && (t.y += u.scrollY), t;
            };

            1 != A.opts.ignoreMouse && (a.canvas.onclick = function (t) {
              var e = i(new A.Point(null != t ? t.clientX : event.clientX, null != t ? t.clientY : event.clientY));
              A.Mouse.onclick(e.x, e.y);
            }, a.canvas.onmousemove = function (t) {
              var e = i(new A.Point(null != t ? t.clientX : event.clientX, null != t ? t.clientY : event.clientY));
              A.Mouse.onmousemove(e.x, e.y);
            });
            var o = A.CreateElement(r.documentElement);
            o.root = !0, o.addStylesFromStyleDefinition();

            var l = !0,
                n = function n() {
              A.ViewPort.Clear(), a.canvas.parentNode ? A.ViewPort.SetCurrent(a.canvas.parentNode.clientWidth, a.canvas.parentNode.clientHeight) : A.ViewPort.SetCurrent(800, 600), 1 != A.opts.ignoreDimensions && (o.style("width").hasValue() && (a.canvas.width = o.style("width").toPixels("x"), a.canvas.style && (a.canvas.style.width = a.canvas.width + "px")), o.style("height").hasValue() && (a.canvas.height = o.style("height").toPixels("y"), a.canvas.style && (a.canvas.style.height = a.canvas.height + "px")));
              var t = a.canvas.clientWidth || a.canvas.width,
                  e = a.canvas.clientHeight || a.canvas.height;

              if (1 == A.opts.ignoreDimensions && o.style("width").hasValue() && o.style("height").hasValue() && (t = o.style("width").toPixels("x"), e = o.style("height").toPixels("y")), A.ViewPort.SetCurrent(t, e), null != A.opts.offsetX && (o.attribute("x", !0).value = A.opts.offsetX), null != A.opts.offsetY && (o.attribute("y", !0).value = A.opts.offsetY), null != A.opts.scaleWidth || null != A.opts.scaleHeight) {
                var i = null,
                    n = null,
                    s = A.ToNumberArray(o.attribute("viewBox").value);
                null != A.opts.scaleWidth && (o.attribute("width").hasValue() ? i = o.attribute("width").toPixels("x") / A.opts.scaleWidth : isNaN(s[2]) || (i = s[2] / A.opts.scaleWidth)), null != A.opts.scaleHeight && (o.attribute("height").hasValue() ? n = o.attribute("height").toPixels("y") / A.opts.scaleHeight : isNaN(s[3]) || (n = s[3] / A.opts.scaleHeight)), null == i && (i = n), null == n && (n = i), o.attribute("width", !0).value = A.opts.scaleWidth, o.attribute("height", !0).value = A.opts.scaleHeight, o.style("transform", !0, !0).value += " scale(" + 1 / i + "," + 1 / n + ")";
              }

              1 != A.opts.ignoreClear && a.clearRect(0, 0, t, e), o.render(a), l && (l = !1, "function" == typeof A.opts.renderCallback && A.opts.renderCallback(r));
            },
                s = !0;

            A.ImagesLoaded() && (s = !1, n()), A.intervalID = setInterval(function () {
              var t = !1;
              if (s && A.ImagesLoaded() && (t = !(s = !1)), 1 != A.opts.ignoreMouse && (t |= A.Mouse.hasEvents()), 1 != A.opts.ignoreAnimation) for (var e = 0; e < A.Animations.length; e++) {
                t |= A.Animations[e].update(1e3 / A.FRAMERATE);
              }
              "function" == typeof A.opts.forceRedraw && 1 == A.opts.forceRedraw() && (t = !0), t && (n(), A.Mouse.runEvents());
            }, 1e3 / A.FRAMERATE);
          }, A.stop = function () {
            A.intervalID && clearInterval(A.intervalID);
          }, A.Mouse = new function () {
            this.events = [], this.hasEvents = function () {
              return 0 != this.events.length;
            }, this.onclick = function (t, e) {
              this.events.push({
                type: "onclick",
                x: t,
                y: e,
                run: function run(t) {
                  t.onclick && t.onclick();
                }
              });
            }, this.onmousemove = function (t, e) {
              this.events.push({
                type: "onmousemove",
                x: t,
                y: e,
                run: function run(t) {
                  t.onmousemove && t.onmousemove();
                }
              });
            }, this.eventElements = [], this.checkPath = function (t, e) {
              for (var i = 0; i < this.events.length; i++) {
                var n = this.events[i];
                e.isPointInPath && e.isPointInPath(n.x, n.y) && (this.eventElements[i] = t);
              }
            }, this.checkBoundingBox = function (t, e) {
              for (var i = 0; i < this.events.length; i++) {
                var n = this.events[i];
                e.isPointInBox(n.x, n.y) && (this.eventElements[i] = t);
              }
            }, this.runEvents = function () {
              A.ctx.canvas.style.cursor = "";

              for (var t = 0; t < this.events.length; t++) {
                for (var e = this.events[t], i = this.eventElements[t]; i;) {
                  e.run(i), i = i.parent;
                }
              }

              this.events = [], this.eventElements = [];
            };
          }(), A;
        }(i || {});

        "string" == typeof t && (t = document.getElementById(t)), null != t.svg && t.svg.stop(), t.childNodes && 1 == t.childNodes.length && "OBJECT" == t.childNodes[0].nodeName || (t.svg = n);
        var s = t.getContext("2d");
        void 0 !== e.documentElement ? n.loadXmlDoc(s, e) : "<" == e.substr(0, 1) ? n.loadXml(s, e) : n.load(s, e);
      } else for (var a = document.querySelectorAll("svg"), r = 0; r < a.length; r++) {
        var o = a[r],
            l = document.createElement("canvas");
        l.width = o.clientWidth, l.height = o.clientHeight, o.parentNode.insertBefore(l, o), o.parentNode.removeChild(o);
        var h = document.createElement("div");
        h.appendChild(o), c(l, h.innerHTML);
      }
    };

    "undefined" == typeof Element || (void 0 !== Element.prototype.matches ? f = function f(t, e) {
      return t.matches(e);
    } : void 0 !== Element.prototype.webkitMatchesSelector ? f = function f(t, e) {
      return t.webkitMatchesSelector(e);
    } : void 0 !== Element.prototype.mozMatchesSelector ? f = function f(t, e) {
      return t.mozMatchesSelector(e);
    } : void 0 !== Element.prototype.msMatchesSelector ? f = function f(t, e) {
      return t.msMatchesSelector(e);
    } : void 0 !== Element.prototype.oMatchesSelector ? f = function f(t, e) {
      return t.oMatchesSelector(e);
    } : ("function" != typeof jQuery && "function" != typeof Zepto || (f = function f(t, e) {
      return $(t).is(e);
    }), void 0 === f && "undefined" != typeof Sizzle && (f = Sizzle.matchesSelector)));
    var e = /(\[[^\]]+\])/g,
        i = /(#[^\s\+>~\.\[:]+)/g,
        a = /(\.[^\s\+>~\.\[:]+)/g,
        r = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,
        o = /(:[\w-]+\([^\)]*\))/gi,
        l = /(:[^\s\+>~\.\[:]+)/g,
        h = /([^\s\+>~\.\[:]+)/g;

    function w(n) {
      var s = [0, 0, 0],
          t = function t(_t, e) {
        var i = n.match(_t);
        null != i && (s[e] += i.length, n = n.replace(_t, " "));
      };

      return n = (n = n.replace(/:not\(([^\)]*)\)/g, "     $1 ")).replace(/{[\s\S]*/gm, " "), t(e, 1), t(i, 0), t(a, 1), t(r, 2), t(o, 1), t(l, 1), n = (n = n.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " "), t(h, 2), s.join("");
    }

    "undefined" != typeof CanvasRenderingContext2D && (CanvasRenderingContext2D.prototype.drawSvg = function (t, e, i, n, s, a) {
      var r = {
        ignoreMouse: !0,
        ignoreAnimation: !0,
        ignoreDimensions: !0,
        ignoreClear: !0,
        offsetX: e,
        offsetY: i,
        scaleWidth: n,
        scaleHeight: s
      };

      for (var o in a) {
        a.hasOwnProperty(o) && (r[o] = a[o]);
      }

      c(this.canvas, t, r);
    }), t.exports = c;
  }(t = {
    exports: {}
  }, t.exports), t.exports;
});

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__25__;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26__;

/***/ }),
/* 27 */
/***/ (function(module) {

module.exports = JSON.parse("[{\"name\":\"黑龙江省\",\"coord\":[127.64559817675396,48.48668098449708]},{\"name\":\"内蒙古自治区\",\"coord\":[118.34519572208615,45.370218276977525]},{\"name\":\"新疆维吾尔自治区\",\"coord\":[87.13479065593184,41.75497055053711]},{\"name\":\"吉林省\",\"coord\":[126.12985278813787,43.57983207702637]},{\"name\":\"辽宁省\",\"coord\":[124.02494773936439,41.105743408203125]},{\"name\":\"甘肃省\",\"coord\":[102.87785725633012,37.69582366943361]},{\"name\":\"河北省\",\"coord\":[115.66327227481898,39.33383178710938]},{\"name\":\"北京市\",\"coord\":[116.62199343603638,40.25053787231445]},{\"name\":\"山西省\",\"coord\":[112.45180235808988,37.666561126708984]},{\"name\":\"天津市\",\"coord\":[117.35711842642581,39.406789779663086]},{\"name\":\"陕西省\",\"coord\":[109.56294003056632,35.64754199981689]},{\"name\":\"宁夏回族自治区\",\"coord\":[105.96110877640074,37.3081169128418]},{\"name\":\"青海省\",\"coord\":[96.07301048277901,35.44417190551758]},{\"name\":\"山东省\",\"coord\":[118.03833752951093,36.29800605773925]},{\"name\":\"西藏自治区\",\"coord\":[87.47361520439412,31.6703872680664]},{\"name\":\"河南省\",\"coord\":[113.07832397097275,33.87751102447509]},{\"name\":\"江苏省\",\"coord\":[119.93926538201052,32.945452690124505]},{\"name\":\"安徽省\",\"coord\":[117.15146765881019,32.024482727050774]},{\"name\":\"四川省\",\"coord\":[102.28998890142759,30.182161331176758]},{\"name\":\"湖北省\",\"coord\":[112.87798261431585,31.157071113586426]},{\"name\":\"重庆市\",\"coord\":[107.870126637831,30.188085556030266]},{\"name\":\"上海市\",\"coord\":[121.42561166015514,31.276043891906745]},{\"name\":\"浙江省\",\"coord\":[119.75337092707514,29.175934791564945]},{\"name\":\"湖南省\",\"coord\":[111.52770282777405,27.38110256195069]},{\"name\":\"江西省\",\"coord\":[115.51091280655628,27.283511161804206]},{\"name\":\"云南省\",\"coord\":[101.27053825991308,25.19783210754396]},{\"name\":\"贵州省\",\"coord\":[106.49672346773299,26.92267990112305]},{\"name\":\"福建省\",\"coord\":[117.9976766946587,25.939599990844727]},{\"name\":\"广西壮族自治区\",\"coord\":[108.98706831086302,23.891559600830078]},{\"name\":\"台湾省\",\"coord\":[120.82468432537434,23.602651596069336]},{\"name\":\"香港特别行政区\",\"coord\":[114.21036850371561,22.374858856201172]},{\"name\":\"海南省\",\"coord\":[109.62792940960824,19.163116455078125]},{\"name\":\"广东省\",\"coord\":[113.32127888266032,22.873867034912106]},{\"name\":\"澳门特别行政区\",\"coord\":[113.56819996291901,22.160347992976]}]");

/***/ }),
/* 28 */
/***/ (function(module) {

module.exports = JSON.parse("[{\"name\":\"克拉玛依市\",\"coord\":[85.01486759299489,45.406422237230046]},{\"name\":\"昌吉回族自治州\",\"coord\":[88.7154624754753,44.26991024636568]},{\"name\":\"石河子市\",\"coord\":[86.0208600035924,44.239045558096805]},{\"name\":\"霍林郭勒市\",\"coord\":[114.73479243733115,44.16058374713977]},{\"name\":\"本溪市\",\"coord\":[124.64357865201586,41.177197783134275]},{\"name\":\"嘉峪关市\",\"coord\":[98.16891560537093,39.76279786284264]},{\"name\":\"莱芜市\",\"coord\":[117.65723565456207,36.27916499211527]},{\"name\":\"神农架林区\",\"coord\":[110.48296222218153,31.581260143666697]},{\"name\":\"天门市\",\"coord\":[113.00615321481195,30.64105781887143]},{\"name\":\"鄂州市\",\"coord\":[114.94764081970385,30.325634953844585]},{\"name\":\"潜江市\",\"coord\":[112.70703817700621,30.349210666019893]},{\"name\":\"仙桃市\",\"coord\":[113.34688900729822,30.315951161935402]},{\"name\":\"萍乡市\",\"coord\":[113.88072263074415,27.47193090553213]},{\"name\":\"台湾省\",\"coord\":[120.14338943402045,23.596002465926095]},{\"name\":\"东莞市\",\"coord\":[113.89443658529342,22.897826158636448]},{\"name\":\"中山市\",\"coord\":[113.37118387764659,22.501478858616522]},{\"name\":\"珠海市\",\"coord\":[113.21799258934986,22.23782602992192]},{\"name\":\"北海市\",\"coord\":[109.18248083043899,21.695773689750148]},{\"name\":\"香港\",\"coord\":[114.20689279508653,22.36016760139811]},{\"name\":\"舟山市\",\"coord\":[122.22514712841459,30.338633120695956]},{\"name\":\"克孜勒苏柯尔克孜\",\"coord\":[74.62910472637343,39.59886016069875]},{\"name\":\"喀什地区\",\"coord\":[77.19899922143753,37.85462871211595]},{\"name\":\"阿克苏地区\",\"coord\":[81.43930290016381,41.067304799230456]},{\"name\":\"和田地区\",\"coord\":[80.69780509160952,36.95287032287055]},{\"name\":\"阿里地区\",\"coord\":[82.536487505389,32.69566569631762]},{\"name\":\"日喀则地区\",\"coord\":[86.5996831353606,29.54861754814263]},{\"name\":\"那曲地区\",\"coord\":[88.32523292667608,33.20600450932715]},{\"name\":\"玉树藏族自治州\",\"coord\":[95.2107128446203,33.90320387919257]},{\"name\":\"迪庆藏族自治州\",\"coord\":[99.42465312188943,28.052797714348895]},{\"name\":\"怒江傈傈族自治州\",\"coord\":[98.85737910439825,26.98345757528851]},{\"name\":\"大理白族自治州\",\"coord\":[99.93934374816013,25.684737357453045]},{\"name\":\"德宏傣族景颇族自\",\"coord\":[98.13830877778075,24.593421919561205]},{\"name\":\"保山市\",\"coord\":[99.19031013453166,24.979380341662]},{\"name\":\"临沧市\",\"coord\":[99.62483778975081,24.058807858948214]},{\"name\":\"普洱市\",\"coord\":[100.94440267992684,23.44121660743221]},{\"name\":\"西双版纳傣族自治\",\"coord\":[100.86105801845994,21.882475641324206]},{\"name\":\"拉萨市\",\"coord\":[91.3684790613129,30.14176592960237]},{\"name\":\"山南地区\",\"coord\":[92.11665242621062,28.33000201578789]},{\"name\":\"林芝地区\",\"coord\":[94.9307847458166,29.125110156601963]},{\"name\":\"昌都地区\",\"coord\":[97.33912235873476,30.48520825551814]},{\"name\":\"丽江市\",\"coord\":[100.65713436205135,26.96190318191959]},{\"name\":\"攀枝花市\",\"coord\":[101.73355913301131,26.714486678752795]},{\"name\":\"凉山彝族自治州\",\"coord\":[102.08678551422615,27.683020519860396]},{\"name\":\"楚雄彝族自治州\",\"coord\":[101.68264761198458,25.369603845264024]},{\"name\":\"红河哈尼族彝族自\",\"coord\":[102.95101719613119,23.624860095239875]},{\"name\":\"文山壮族苗族自治\",\"coord\":[104.8708359910614,23.579587266862504]},{\"name\":\"百色市\",\"coord\":[106.69546907589859,23.98220841166522]},{\"name\":\"崇左市\",\"coord\":[107.3277087317123,22.49769755349952]},{\"name\":\"防城港市\",\"coord\":[107.88939931155171,21.94550204069006]},{\"name\":\"南宁市\",\"coord\":[108.67078983716917,23.12207641861882]},{\"name\":\"钦州市\",\"coord\":[108.8532307305186,22.157690108421384]},{\"name\":\"玉林市\",\"coord\":[110.26918466489103,22.391823643610415]},{\"name\":\"湛江市\",\"coord\":[109.93033457863683,21.086751055633457]},{\"name\":\"茂名市\",\"coord\":[110.80336192333934,22.069184739040775]},{\"name\":\"阳江市\",\"coord\":[111.70471342186183,22.108751366417575]},{\"name\":\"江门市\",\"coord\":[112.53715618649149,22.297368082806777]},{\"name\":\"广州市\",\"coord\":[113.4949302208309,23.28359314707863]},{\"name\":\"清远市\",\"coord\":[113.10957368131268,24.334444053233856]},{\"name\":\"肇庆市\",\"coord\":[112.11117530204233,23.60241158796112]},{\"name\":\"梧州市\",\"coord\":[111.01709510772797,23.518132876753846]},{\"name\":\"贺州市\",\"coord\":[111.50423061842756,24.4095096817199]},{\"name\":\"桂林市\",\"coord\":[110.44046163393094,25.353966673735407]},{\"name\":\"柳州市\",\"coord\":[109.34854449214147,24.972408051485047]},{\"name\":\"河池市\",\"coord\":[107.81191841865586,24.649291651298164]},{\"name\":\"黔东南苗族侗族自\",\"coord\":[108.39952601614591,26.429286420465576]},{\"name\":\"贵阳市\",\"coord\":[106.59784062851153,26.797907456479816]},{\"name\":\"安顺市\",\"coord\":[105.76161265300635,25.988644902171018]},{\"name\":\"黔西南布依族苗族\",\"coord\":[105.5954078788574,25.404850939549405]},{\"name\":\"曲靖市\",\"coord\":[103.9164335632742,25.697243690315265]},{\"name\":\"六盘水市\",\"coord\":[104.77723228072432,26.15402255629164]},{\"name\":\"毕节地区\",\"coord\":[105.03867422931839,27.077913968069666]},{\"name\":\"昭通市\",\"coord\":[104.29730513046874,27.62418247971078]},{\"name\":\"宜宾市\",\"coord\":[104.76748901448207,28.553501804266475]},{\"name\":\"乐山市\",\"coord\":[103.56027669102787,29.160754519210577]},{\"name\":\"自贡市\",\"coord\":[104.63272827056402,29.273152614922402]},{\"name\":\"内江市\",\"coord\":[104.82644562304716,29.61272653799929]},{\"name\":\"遵义市\",\"coord\":[106.82413636302059,28.191847588570702]},{\"name\":\"达州市\",\"coord\":[107.59704170009518,31.32138258839703]},{\"name\":\"遂宁市\",\"coord\":[105.48979445433736,30.677687821242678]},{\"name\":\"广安市\",\"coord\":[106.56708164098042,30.43500706741521]},{\"name\":\"泸州市\",\"coord\":[105.42591761727707,28.50277238478137]},{\"name\":\"资阳市\",\"coord\":[104.97995126874034,30.154251886139654]},{\"name\":\"雅安市\",\"coord\":[102.69931299964517,29.892630706195035]},{\"name\":\"眉山市\",\"coord\":[104.07052881858888,29.894202166560405]},{\"name\":\"甘孜藏族自治州\",\"coord\":[100.50721042614238,30.975216556269658]},{\"name\":\"果洛藏族自治州\",\"coord\":[99.30775565051923,34.03539865224808]},{\"name\":\"海南藏族自治州\",\"coord\":[100.39969108016373,35.90048272566899]},{\"name\":\"黄南藏族自治州\",\"coord\":[101.5360706381689,35.10286360841902]},{\"name\":\"赣南藏族自治州\",\"coord\":[102.97083885806067,34.326752803339026]},{\"name\":\"陇南市\",\"coord\":[105.24780098912132,33.57031117443431]},{\"name\":\"天水市\",\"coord\":[105.53503634660417,34.62320421368087]},{\"name\":\"定西市\",\"coord\":[104.58787768541339,35.08900966621695]},{\"name\":\"临夏回族自治州\",\"coord\":[103.2612870434902,35.591577124455235]},{\"name\":\"西宁市\",\"coord\":[101.57680657999033,36.84800271717157]},{\"name\":\"海东地区\",\"coord\":[102.30909850729282,36.287400615025646]},{\"name\":\"海北藏族自治州\",\"coord\":[100.27122484450717,37.892557516083826]},{\"name\":\"金昌市\",\"coord\":[102.02244049169511,38.497330414886164]},{\"name\":\"酒泉市\",\"coord\":[95.94486678270127,40.56891536586272]},{\"name\":\"海西蒙古族藏族自\",\"coord\":[94.67143298050689,36.022725148503724]},{\"name\":\"巴音郭楞蒙古自治\",\"coord\":[88.18116214759745,39.556478810319916]},{\"name\":\"哈密地区\",\"coord\":[93.84302392518026,42.95015211178875]},{\"name\":\"叶鲁番地区\",\"coord\":[89.82035217277885,42.399368632283505]},{\"name\":\"乌鲁木齐市\",\"coord\":[88.00048109561487,43.549986370786]},{\"name\":\"阿勒泰地区\",\"coord\":[88.11213933257655,47.05593413019629]},{\"name\":\"博尔塔拉蒙古自治\",\"coord\":[82.26402238163408,44.671135542630864]},{\"name\":\"伊犁哈萨克自治州\",\"coord\":[82.80778717477179,43.53783381365267]},{\"name\":\"阿拉善盟\",\"coord\":[103.29923966842289,40.10955801781495]},{\"name\":\"武威市\",\"coord\":[102.73362058791429,37.94211141321436]},{\"name\":\"兰州市\",\"coord\":[103.73793563506032,36.27379827886003]},{\"name\":\"中卫市\",\"coord\":[105.6943786030716,37.20654236148948]},{\"name\":\"银川市\",\"coord\":[106.20022174140034,38.52103167597483]},{\"name\":\"石嘴山市\",\"coord\":[106.41544011793628,38.84054137571417]},{\"name\":\"乌海市\",\"coord\":[106.8984175998405,39.54616572239788]},{\"name\":\"鄂尔多斯市\",\"coord\":[108.43285571424619,39.24036799350715]},{\"name\":\"巴彦淖尔市\",\"coord\":[107.45840392808307,41.30159860424196]},{\"name\":\"包头市\",\"coord\":[110.46472193224272,41.48017783644221]},{\"name\":\"呼和浩特市\",\"coord\":[111.48365173603975,40.498363056149884]},{\"name\":\"乌兰察布市\",\"coord\":[112.61568977597707,41.75789561273154]},{\"name\":\"大同市\",\"coord\":[113.7107192749083,39.898956799744184]},{\"name\":\"朔州市\",\"coord\":[112.65428748167508,39.681772914701924]},{\"name\":\"忻州市\",\"coord\":[112.36127575589583,38.88990233614568]},{\"name\":\"榆林市\",\"coord\":[109.68473112169593,38.19921027134876]},{\"name\":\"延安市\",\"coord\":[109.52425222161318,36.406522726136814]},{\"name\":\"庆阳市\",\"coord\":[107.73052193155061,36.183821532624464]},{\"name\":\"固原市\",\"coord\":[106.20191575442442,36.11634909496382]},{\"name\":\"白银市\",\"coord\":[104.68634478137065,36.51582865625868]},{\"name\":\"宝鸡市\",\"coord\":[107.33534779230747,34.3387216485855]},{\"name\":\"汉中市\",\"coord\":[107.03534754266246,33.00142998064871]},{\"name\":\"广元市\",\"coord\":[105.92928137563939,32.21872447205537]},{\"name\":\"巴中市\",\"coord\":[107.03422410306194,31.99874720836291]},{\"name\":\"南充市\",\"coord\":[106.32964805032347,31.156657700184095]},{\"name\":\"绵阳市\",\"coord\":[104.58949560201106,31.88628780630976]},{\"name\":\"德阳市\",\"coord\":[104.41542984932845,31.110558133718676]},{\"name\":\"成都市\",\"coord\":[103.8852290010473,30.777258040348634]},{\"name\":\"阿坝藏族羌族自治\",\"coord\":[102.26209319552814,32.45725845387284]},{\"name\":\"安康市\",\"coord\":[109.14236501848015,32.77467694678074]},{\"name\":\"十堰市\",\"coord\":[110.39934083416314,32.376209039347906]},{\"name\":\"襄阳市\",\"coord\":[111.97539147094662,31.93399822417465]},{\"name\":\"宜昌市\",\"coord\":[111.22204852395754,30.772457669035354]},{\"name\":\"恩施市\",\"coord\":[109.42158366502872,30.260366574390105]},{\"name\":\"张家界市\",\"coord\":[110.59760006538717,29.330107409240718]},{\"name\":\"吉首市\",\"coord\":[109.72176899848378,28.681903937242495]},{\"name\":\"铜仁地区\",\"coord\":[108.54247523485463,28.11736237519646]},{\"name\":\"重庆市\",\"coord\":[107.86007108564992,30.186253395053196]},{\"name\":\"怀化市\",\"coord\":[109.94325166787243,27.43919084801186]},{\"name\":\"益阳市\",\"coord\":[112.43060358108062,28.75127294553697]},{\"name\":\"娄底市\",\"coord\":[111.41891416951897,27.696312460064604]},{\"name\":\"常德市\",\"coord\":[111.72571610131646,29.27189463838195]},{\"name\":\"荆州市\",\"coord\":[112.65896596965268,30.05161542755362]},{\"name\":\"荆门市\",\"coord\":[112.6586855902184,31.01267124474617]},{\"name\":\"岳阳市\",\"coord\":[113.2595036144316,29.106247116930163]},{\"name\":\"长沙市\",\"coord\":[113.15415586456598,28.222934680488425]},{\"name\":\"湘潭市\",\"coord\":[112.51092596317824,27.69881544105668]},{\"name\":\"株州市\",\"coord\":[113.49665538546823,27.03993794610501]},{\"name\":\"衡阳市\",\"coord\":[112.48849636578527,26.783613569970782]},{\"name\":\"邵阳市\",\"coord\":[110.6723832117475,26.81652287086792]},{\"name\":\"永州市\",\"coord\":[111.8565364154186,25.768488267811968]},{\"name\":\"韶关市\",\"coord\":[113.53420325850979,24.69848878771937]},{\"name\":\"惠州市\",\"coord\":[114.32029589634925,23.25504544231892]},{\"name\":\"佛山市\",\"coord\":[112.95925897403649,23.10116677189257]},{\"name\":\"云浮市\",\"coord\":[111.78042514904234,22.840400494105687]},{\"name\":\"深圳市\",\"coord\":[114.13138648919008,22.649563063468342]},{\"name\":\"汕尾市\",\"coord\":[115.57412892884373,23.06989642104901]},{\"name\":\"河源市\",\"coord\":[114.89746229844398,23.97971937124767]},{\"name\":\"揭阳市\",\"coord\":[116.04290004239446,23.304802704715357]},{\"name\":\"汕头市\",\"coord\":[116.7008461897183,23.35898625947344]},{\"name\":\"潮州市\",\"coord\":[116.75405548481658,23.854381508863064]},{\"name\":\"梅州市\",\"coord\":[116.13719397345734,24.15633544812716]},{\"name\":\"漳州市\",\"coord\":[117.38279760543345,24.41111215459575]},{\"name\":\"厦门市\",\"coord\":[118.04275971554665,24.675908246507944]},{\"name\":\"龙岩市\",\"coord\":[116.69341144552507,25.20284542644492]},{\"name\":\"泉州市\",\"coord\":[118.12035864630246,25.22984144365049]},{\"name\":\"莆田市\",\"coord\":[118.82439690138142,25.439653480972687]},{\"name\":\"福州市\",\"coord\":[119.1608285845262,25.99117532466728]},{\"name\":\"三明市\",\"coord\":[117.51188176216434,26.318292906961602]},{\"name\":\"南平市\",\"coord\":[118.16153136678187,27.306303151805437]},{\"name\":\"抚州市\",\"coord\":[116.3455359885574,27.487043655935366]},{\"name\":\"鹰潭市\",\"coord\":[117.01082360702333,28.241253742969946]},{\"name\":\"吉安市\",\"coord\":[114.91377151807418,26.957486660664525]},{\"name\":\"赣州市\",\"coord\":[115.046455717572,25.81565075681663]},{\"name\":\"郴州市\",\"coord\":[113.1544526703492,25.871927095452524]},{\"name\":\"新余市\",\"coord\":[114.94161795877827,27.79044654578371]},{\"name\":\"宜春市\",\"coord\":[115.04574494880995,28.306428044943356]},{\"name\":\"南昌市\",\"coord\":[115.9963824234495,28.664803351584705]},{\"name\":\"九江市\",\"coord\":[115.53225905704193,29.362905920276297]},{\"name\":\"上饶市\",\"coord\":[117.8595355766598,28.765755150094634]},{\"name\":\"景德镇市\",\"coord\":[117.25387030721845,29.33426823662448]},{\"name\":\"黄山市\",\"coord\":[117.85476357809696,29.969632034273722]},{\"name\":\"池州市\",\"coord\":[117.34517113140791,30.208089337922335]},{\"name\":\"铜陵市\",\"coord\":[117.93160431300694,30.926442655001676]},{\"name\":\"安庆市\",\"coord\":[116.54307680610799,30.524265461641296]},{\"name\":\"黄石市\",\"coord\":[115.02354597728443,29.924060229331015]},{\"name\":\"咸宁市\",\"coord\":[114.26967602231792,29.652174021136048]},{\"name\":\"黄冈市\",\"coord\":[115.2859016705373,30.65856897065683]},{\"name\":\"武汉市\",\"coord\":[114.34552076948799,30.68836237966767]},{\"name\":\"随州市\",\"coord\":[113.3850627838818,31.87891659924412]},{\"name\":\"信阳市\",\"coord\":[114.81374730587638,32.0309685135914]},{\"name\":\"驻马店市\",\"coord\":[114.07756451509235,32.896720987266114]},{\"name\":\"商洛市\",\"coord\":[109.82044421310393,33.77403373563189]},{\"name\":\"西安市\",\"coord\":[109.11839808451401,34.225257215515896]},{\"name\":\"渭南市\",\"coord\":[109.75732444226935,35.025913644359306]},{\"name\":\"铜川市\",\"coord\":[108.98695328111377,35.19235092947735]},{\"name\":\"咸阳市\",\"coord\":[108.36398776446165,34.84311348287181]},{\"name\":\"三门峡市\",\"coord\":[110.80049688104964,34.31818709571671]},{\"name\":\"运城市\",\"coord\":[111.1736679525165,35.19010372283576]},{\"name\":\"洛阳市\",\"coord\":[111.87577573098216,34.33379926109848]},{\"name\":\"平顶山市\",\"coord\":[112.80931281928427,33.759895800153096]},{\"name\":\"漯河市\",\"coord\":[113.83505724178012,33.70034266174508]},{\"name\":\"许昌市\",\"coord\":[113.78762484088509,34.051835688452435]},{\"name\":\"郑州市\",\"coord\":[113.49619951867594,34.61181797865449]},{\"name\":\"焦作市\",\"coord\":[113.13404280173008,35.134167097471625]},{\"name\":\"晋城市\",\"coord\":[112.7495732073233,35.63186423091449]},{\"name\":\"长治市\",\"coord\":[112.85900842873183,36.45872910742828]},{\"name\":\"临汾市\",\"coord\":[111.49379787924448,36.22810800777857]},{\"name\":\"太原市\",\"coord\":[112.15628804033796,37.91704444063036]},{\"name\":\"吕梁市\",\"coord\":[111.31901105774872,37.712740463356496]},{\"name\":\"晋中市\",\"coord\":[113.08199599739676,37.36532613794343]},{\"name\":\"邯郸市\",\"coord\":[114.41824047234618,36.530119932543315]},{\"name\":\"安阳市\",\"coord\":[113.88883283163116,35.7797611183252]},{\"name\":\"鹤壁市\",\"coord\":[114.3654094911545,35.75770487428472]},{\"name\":\"新乡市\",\"coord\":[113.9184107718167,35.348471214026716]},{\"name\":\"开封市\",\"coord\":[114.52801677500626,34.61371216679872]},{\"name\":\"周口市\",\"coord\":[114.88509782391864,33.69999759722657]},{\"name\":\"阜阳市\",\"coord\":[115.44595951398213,32.98060371610532]},{\"name\":\"淮南市\",\"coord\":[116.68941991880993,32.79972275772595]},{\"name\":\"蚌埠市\",\"coord\":[117.38594715783302,33.106729536033896]},{\"name\":\"淮北市\",\"coord\":[116.69651711889378,33.69527529383458]},{\"name\":\"宿州市\",\"coord\":[117.30175405886838,33.943330421260015]},{\"name\":\"亳州市\",\"coord\":[116.12410804185097,33.46769392946132]},{\"name\":\"商丘市\",\"coord\":[115.59575176872548,34.28339840831147]},{\"name\":\"菏泽市\",\"coord\":[115.53631974831816,35.197319393220624]},{\"name\":\"濮阳市\",\"coord\":[115.3070485514902,35.775883510964334]},{\"name\":\"聊城市\",\"coord\":[115.8870069012884,36.40529594548765]},{\"name\":\"邢台市\",\"coord\":[114.74259008644859,37.251396750084155]},{\"name\":\"石家庄市\",\"coord\":[114.56923838363613,38.13141710980106]},{\"name\":\"阳泉市\",\"coord\":[113.39216149668508,38.09075470547468]},{\"name\":\"保定市\",\"coord\":[115.261524468934,39.09118520781398]},{\"name\":\"衡水市\",\"coord\":[115.8182936677897,37.715661598187154]},{\"name\":\"德州市\",\"coord\":[116.4582273790399,37.19372347888644]},{\"name\":\"沧州市\",\"coord\":[116.76192710911863,38.20240042039232]},{\"name\":\"廊坊市\",\"coord\":[116.50410772133856,39.27896741763884]},{\"name\":\"天津市\",\"coord\":[117.31988934444873,39.37154482470619]},{\"name\":\"北京市\",\"coord\":[116.59734730757869,40.237112944270976]},{\"name\":\"张家口市\",\"coord\":[115.1823606483226,40.83732566607167]},{\"name\":\"唐山市\",\"coord\":[117.8693184261954,39.71862889477249]},{\"name\":\"秦皇岛市\",\"coord\":[119.30467355367742,39.990574652162564]},{\"name\":\"承德市\",\"coord\":[117.16275671911026,41.36623845548547]},{\"name\":\"葫芦岛市\",\"coord\":[119.9342336210531,40.5628822626519]},{\"name\":\"朝阳市\",\"coord\":[120.11853493535794,41.471852354885755]},{\"name\":\"赤峰市\",\"coord\":[118.50943546234379,43.25452976059767]},{\"name\":\"锦州市\",\"coord\":[121.5167549323861,41.45933087433065]},{\"name\":\"营口市\",\"coord\":[122.58571915054674,40.42093503997384]},{\"name\":\"丹东市\",\"coord\":[124.33549382902183,40.46369290272115]},{\"name\":\"辽阳市\",\"coord\":[123.34064798039414,41.152331397771356]},{\"name\":\"盘锦市\",\"coord\":[122.06718005354679,41.05573599862555]},{\"name\":\"阜新市\",\"coord\":[121.93889757908204,42.27641773244204]},{\"name\":\"鞍山市\",\"coord\":[122.78904432242356,40.77781183142038]},{\"name\":\"沈阳市\",\"coord\":[122.99508899709724,42.1162195010079]},{\"name\":\"铁岭市\",\"coord\":[124.23100515588399,42.72666083611828]},{\"name\":\"扶顺市\",\"coord\":[124.46027188217573,41.82955407638859]},{\"name\":\"通辽市\",\"coord\":[122.0729370657937,43.90889130864869]},{\"name\":\"兴安盟\",\"coord\":[120.79456431092532,45.92003249442161]},{\"name\":\"白城市\",\"coord\":[123.10619907715235,45.25475749267784]},{\"name\":\"齐齐哈尔市\",\"coord\":[124.5462214659102,47.55395009317394]},{\"name\":\"大兴安岭地区\",\"coord\":[124.50992855161529,52.18438447846694]},{\"name\":\"黑河市\",\"coord\":[127.14721400335922,49.25080134026901]},{\"name\":\"大庆市\",\"coord\":[124.40329830095243,46.401048760966745]},{\"name\":\"绥化市\",\"coord\":[126.5214484055605,46.76992452194825]},{\"name\":\"松原市\",\"coord\":[124.21244334807682,44.75779381338502]},{\"name\":\"四平市\",\"coord\":[124.27839350328821,43.52139065090318]},{\"name\":\"通化市\",\"coord\":[125.67392830706305,41.91771808663852]},{\"name\":\"辽源市\",\"coord\":[125.33529527643432,42.758340204944986]},{\"name\":\"吉林市\",\"coord\":[126.83350281902375,43.60730120049175]},{\"name\":\"长春市\",\"coord\":[125.53597875970374,44.24624314701737]},{\"name\":\"白山市\",\"coord\":[127.16780160322108,42.093893880305075]},{\"name\":\"哈尔滨市\",\"coord\":[127.39125008786029,45.36200668820575]},{\"name\":\"鹤岗市\",\"coord\":[130.4703811258197,47.66520688940109]},{\"name\":\"伊春市\",\"coord\":[128.91240831703635,47.93833794565277]},{\"name\":\"七台河市\",\"coord\":[131.2677920224311,45.945099776108584]},{\"name\":\"鸡西市\",\"coord\":[132.38059153660274,45.722934218318535]},{\"name\":\"双鸭山市\",\"coord\":[132.3184817002743,46.65813679030265]},{\"name\":\"佳木斯市\",\"coord\":[132.26174446608726,47.17569713691394]},{\"name\":\"呼伦贝尔市\",\"coord\":[122.3210739998419,50.18176996070858]},{\"name\":\"孝感市\",\"coord\":[113.83749892135485,31.11757234692128]},{\"name\":\"贵港市\",\"coord\":[110.07354588052804,23.380735604767374]},{\"name\":\"黔南布依族苗族自\",\"coord\":[107.30931767543106,26.2976919432269]},{\"name\":\"宁德市\",\"coord\":[119.52482556634342,27.013151692716413]},{\"name\":\"温州市\",\"coord\":[120.30037042732202,27.8699145504001]},{\"name\":\"台州市\",\"coord\":[120.88886782713843,28.670799172772313]},{\"name\":\"丽水市\",\"coord\":[119.56796851966463,28.170268394477755]},{\"name\":\"衢州市\",\"coord\":[118.79479802644406,28.865874397158763]},{\"name\":\"金华市\",\"coord\":[119.99381920686633,29.093455548185744]},{\"name\":\"绍兴市\",\"coord\":[120.46546691682343,29.69382513836818]},{\"name\":\"宁波市\",\"coord\":[121.42142987830871,29.70001162878972]},{\"name\":\"杭州市\",\"coord\":[119.4405685790891,29.87218307296989]},{\"name\":\"宣城市\",\"coord\":[118.68748382914703,30.628143499626418]},{\"name\":\"湖州市\",\"coord\":[119.98261306633574,30.7945175862809]},{\"name\":\"嘉兴市\",\"coord\":[120.83889215988998,30.67538495499343]},{\"name\":\"上海市\",\"coord\":[121.37534147322967,31.25628247908459]},{\"name\":\"苏州市\",\"coord\":[120.6906182622391,31.381280695137775]},{\"name\":\"无锡市\",\"coord\":[120.32182300914366,31.54113306724517]},{\"name\":\"常州市\",\"coord\":[119.61953292830165,31.611878565375576]},{\"name\":\"南京市\",\"coord\":[118.71890548838064,31.910863187910323]},{\"name\":\"镇江市\",\"coord\":[119.42349332902813,31.97942313430778]},{\"name\":\"合肥市\",\"coord\":[117.30651975617157,31.79407863049138]},{\"name\":\"六安市\",\"coord\":[116.24668220575353,31.820846193819513]},{\"name\":\"滁州市\",\"coord\":[117.88422385307969,32.51792621904418]},{\"name\":\"泰州市\",\"coord\":[120.03124303305091,32.56503102346783]},{\"name\":\"南通市\",\"coord\":[120.85599446760912,32.18496706099728]},{\"name\":\"盐城市\",\"coord\":[120.01812490612667,33.54219948734023]},{\"name\":\"淮安市\",\"coord\":[119.0749424205415,33.39203631772854]},{\"name\":\"宿迁市\",\"coord\":[118.45404943216346,33.666258719120265]},{\"name\":\"徐州市\",\"coord\":[117.77482249295966,34.30847766157078]},{\"name\":\"济宁市\",\"coord\":[116.74147276546373,35.27488504351119]},{\"name\":\"枣庄市\",\"coord\":[117.43359942491492,34.884162021736]},{\"name\":\"连云港市\",\"coord\":[119.01553213785074,34.54316517587849]},{\"name\":\"临沂市\",\"coord\":[118.31478835349617,35.28173079028279]},{\"name\":\"日照市\",\"coord\":[119.14265350444272,35.54479073199592]},{\"name\":\"青岛市\",\"coord\":[120.27779044405756,36.3464117375903]},{\"name\":\"威海市\",\"coord\":[122.12963327195605,37.13879077904251]},{\"name\":\"烟台市\",\"coord\":[120.7689567423966,37.19772002195597]},{\"name\":\"潍坊市\",\"coord\":[119.02178548592039,36.49292234053931]},{\"name\":\"淄博市\",\"coord\":[117.92936024367185,36.60871347163638]},{\"name\":\"泰安市\",\"coord\":[116.93810893944303,36.0423330118612]},{\"name\":\"济南市\",\"coord\":[117.34560282551296,36.769574973846304]},{\"name\":\"东营市\",\"coord\":[118.4915054457184,37.52194690335787]},{\"name\":\"滨州市\",\"coord\":[117.67610299757533,37.4439597758601]},{\"name\":\"昆明市\",\"coord\":[102.93100245594789,25.481300763922075]},{\"name\":\"玉溪市\",\"coord\":[102.23080854291823,24.156168324611663]},{\"name\":\"塔城地区\",\"coord\":[83.60908162840168,45.3721852373893]},{\"name\":\"张掖市\",\"coord\":[100.47710030600572,38.704239320458385]},{\"name\":\"南阳市\",\"coord\":[112.1400670951149,33.03033276715801]},{\"name\":\"扬州市\",\"coord\":[119.48949608990988,32.80956776339646]},{\"name\":\"延边朝鲜族自治州\",\"coord\":[129.3577692895626,43.24968794080283]},{\"name\":\"牡丹江市\",\"coord\":[129.87240796405672,44.7073040108322]},{\"name\":\"澳门\",\"coord\":[113.56289691515346,22.14602596262204]},{\"name\":\"吴忠市\",\"coord\":[106.76894508116403,37.72566765880316]},{\"name\":\"来宾市\",\"coord\":[109.25592217010114,23.86346274681084]},{\"name\":\"平凉市\",\"coord\":[107.0708132782897,35.30329631658711]},{\"name\":\"马鞍山市\",\"coord\":[118.27245878467022,31.657727937739004]},{\"name\":\"芜湖市\",\"coord\":[118.32992684415504,31.081688223101658]},{\"name\":\"澄迈县\",\"coord\":[110.04198076060266,19.694955078668105]},{\"name\":\"保亭黎族苗族自治\",\"coord\":[109.6055304964257,18.6101488675304]},{\"name\":\"乐东黎族自治县\",\"coord\":[109.04051999525574,18.643137437909203]},{\"name\":\"儋州市\",\"coord\":[109.3431358337404,19.550974957403195]},{\"name\":\"定安县\",\"coord\":[110.38744429685676,19.47557074114284]},{\"name\":\"屯昌县\",\"coord\":[110.00574767630334,19.367175093044388]},{\"name\":\"白沙黎族自治县\",\"coord\":[109.36860737761768,19.214416393082217]},{\"name\":\"琼中黎族苗族自治\",\"coord\":[109.86691465937548,19.073671135862682]},{\"name\":\"东方市\",\"coord\":[108.86903802405428,19.017352815445214]},{\"name\":\"昌江黎族自治县\",\"coord\":[108.9686431884767,19.182594167127824]},{\"name\":\"海口市\",\"coord\":[110.420654296875,19.806565564640795]},{\"name\":\"济源市\",\"coord\":[112.38051465474433,35.07958362422394]},{\"name\":\"五指山市\",\"coord\":[109.53595187364496,18.832908264613966]},{\"name\":\"大连市\",\"coord\":[121.96662235866603,39.444150542439914]},{\"name\":\"文昌市三沙市\",\"coord\":[110.81828537536748,19.756501444162936]},{\"name\":\"三亚市\",\"coord\":[109.38424600793707,18.39186315877128]},{\"name\":\"万宁市\",\"coord\":[110.28485046979574,18.860240588635115]},{\"name\":\"陵水黎族自治县\",\"coord\":[109.95577603229562,18.594712684620465]},{\"name\":\"临高县\",\"coord\":[109.71915395436967,19.79420403032508]},{\"name\":\"琼海市\",\"coord\":[110.41650700703043,19.22315873149372]}]");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;
/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to generate unique IDs. */

var idCounter = 0;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Built-in value references. */

var Symbol = root.Symbol;
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}
/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */


function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

module.exports = uniqueId;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match `RegExp` flags from their coerced string values. */

var reFlags = /\w*$/;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Used to identify `toStringTag` values supported by `_.clone`. */

var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Detect free variable `exports`. */

var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */

function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}
/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */


function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */


function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }

  return array;
}
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */


function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */


function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }

  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }

  return accumulator;
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */


function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */


function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */


function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */


function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */


function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}
/** Used for built-in method references. */


var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */


var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);
/* Built-in method references that are verified to be native. */

var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */


function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */


function listCacheClear() {
  this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Stack(entries) {
  this.__data__ = new ListCache(entries);
}
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function stackDelete(key) {
  return this.__data__['delete'](key);
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function stackGet(key) {
  return this.__data__.get(key);
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function stackHas(key) {
  return this.__data__.has(key);
}
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */


function stackSet(key, value) {
  var cache = this.__data__;

  if (cache instanceof ListCache) {
    var pairs = cache.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      return this;
    }

    cache = this.__data__ = new MapCache(pairs);
  }

  cache.set(key, value);
  return this;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    object[key] = value;
  }
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */


function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */


function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }

  if (result !== undefined) {
    return result;
  }

  if (!isObject(value)) {
    return value;
  }

  var isArr = isArray(value);

  if (isArr) {
    result = initCloneArray(value);

    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }

    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      if (isHostObject(value)) {
        return object ? value : {};
      }

      result = initCloneObject(isFunc ? {} : value);

      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }

      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  } // Check for circular references and return its corresponding clone.


  stack || (stack = new Stack());
  var stacked = stack.get(value);

  if (stacked) {
    return stacked;
  }

  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }

  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    } // Recursively populate clone (susceptible to call stack limits).


    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */


function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */


function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */


function baseGetTag(value) {
  return objectToString.call(value);
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */


function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */


function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }

  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */


function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */


function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */


function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor());
}
/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */


function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */


function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor());
}
/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */


function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */


function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */


function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */


function copyObject(source, props, object, customizer) {
  object || (object = {});
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }

  return object;
}
/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */


function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */


var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.

if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function getTag(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}
/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */


function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length); // Add properties assigned by `RegExp#exec`.

  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }

  return result;
}
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */


function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */


function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;

  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */


function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */


function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */


function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */


function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */


function cloneDeep(value) {
  return baseClone(value, true, true);
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */


function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */


function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */


var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */


function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */


var isBuffer = nativeIsBuffer || stubFalse;
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */


function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */


function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */


function stubArray() {
  return [];
}
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */


function stubFalse() {
  return false;
}

module.exports = cloneDeep;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(56)(module)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(57);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__33__;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
* geostats() is a tiny and standalone javascript library for classification 
* Project page - https://github.com/simogeo/geostats
* Copyright (c) 2011 Simon Georget, http://www.empreinte-urbaine.eu
* Licensed under the MIT license
*/
(function (definition) {
  // This file will function properly as a <script> tag, or a module
  // using CommonJS and NodeJS or RequireJS module formats.
  // CommonJS
  if (true) {
    module.exports = definition(); // RequireJS
  } else {}
})(function () {
  var isInt = function isInt(n) {
    return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
  }; // 6 characters


  var _t = function _t(str) {
    return str;
  }; //taking from http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric


  var isNumber = function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }; //indexOf polyfill
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf


  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      if (this === undefined || this === null) {
        throw new TypeError('"this" is null or not defined');
      }

      var length = this.length >>> 0; // Hack to convert object.length to a UInt32

      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
      }

      if (fromIndex < 0) {
        fromIndex += length;

        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }

      for (; fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
          return fromIndex;
        }
      }

      return -1;
    };
  }

  var geostats = function geostats(a) {
    this.objectID = '';
    this.separator = ' - ';
    this.legendSeparator = this.separator;
    this.method = '';
    this.precision = 0;
    this.precisionflag = 'auto';
    this.roundlength = 2; // Number of decimals, round values

    this.is_uniqueValues = false;
    this.debug = false;
    this.silent = false;
    this.bounds = Array();
    this.ranges = Array();
    this.inner_ranges = null;
    this.colors = Array();
    this.counter = Array(); // statistics information

    this.stat_sorted = null;
    this.stat_mean = null;
    this.stat_median = null;
    this.stat_sum = null;
    this.stat_max = null;
    this.stat_min = null;
    this.stat_pop = null;
    this.stat_variance = null;
    this.stat_stddev = null;
    this.stat_cov = null;
    /**
     * logging method
     */

    this.log = function (msg, force) {
      if (this.debug == true || force != null) console.log(this.objectID + "(object id) :: " + msg);
    };
    /**
     * Set bounds
     */


    this.setBounds = function (a) {
      this.log('Setting bounds (' + a.length + ') : ' + a.join());
      this.bounds = Array(); // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))

      this.bounds = a; //this.bounds = this.decimalFormat(a);
    };
    /**
     * Set a new serie
     */


    this.setSerie = function (a) {
      this.log('Setting serie (' + a.length + ') : ' + a.join());
      this.serie = Array(); // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))

      this.serie = a; //reset statistics after changing serie

      this.resetStatistics();
      this.setPrecision();
    };
    /**
     * Set colors
     */


    this.setColors = function (colors) {
      this.log('Setting color ramp (' + colors.length + ') : ' + colors.join());
      this.colors = colors;
    };
    /**
     * Get feature count
     * With bounds array(0, 0.75, 1.5, 2.25, 3); 
     * should populate this.counter with 5 keys
     * and increment counters for each key
     */


    this.doCount = function () {
      if (this._nodata()) return;
      var tmp = this.sorted();
      this.counter = new Array(); // we init counter with 0 value

      for (i = 0; i < this.bounds.length - 1; i++) {
        this.counter[i] = 0;
      }

      for (j = 0; j < tmp.length; j++) {
        // get current class for value to increment the counter
        var cclass = this.getClass(tmp[j]);
        this.counter[cclass]++;
      }
    };
    /**
     * Set decimal precision according to user input
     * or automatcally determined according
     * to the given serie.
     */


    this.setPrecision = function (decimals) {
      // only when called from user
      if (typeof decimals !== "undefined") {
        this.precisionflag = 'manual';
        this.precision = decimals;
      } // we calculate the maximal decimal length on given serie


      if (this.precisionflag == 'auto') {
        for (var i = 0; i < this.serie.length; i++) {
          // check if the given value is a number and a float
          if (!isNaN(this.serie[i] + "") && (this.serie[i] + "").toString().indexOf('.') != -1) {
            var precision = (this.serie[i] + "").split(".")[1].length;
          } else {
            var precision = 0;
          }

          if (precision > this.precision) {
            this.precision = precision;
          }
        }
      }

      if (this.precision > 20) {
        // prevent "Uncaught RangeError: toFixed() digits argument must be between 0 and 20" bug. See https://github.com/simogeo/geostats/issues/34
        this.log('this.precision value (' + this.precision + ') is greater than max value. Automatic set-up to 20 to prevent "Uncaught RangeError: toFixed()" when calling decimalFormat() method.');
        this.precision = 20;
      }

      this.log('Calling setPrecision(). Mode : ' + this.precisionflag + ' - Decimals : ' + this.precision);
      this.serie = this.decimalFormat(this.serie);
    };
    /**
     * Format array numbers regarding to precision
     */


    this.decimalFormat = function (a) {
      var b = new Array();

      for (var i = 0; i < a.length; i++) {
        // check if the given value is a number
        if (isNumber(a[i])) {
          b[i] = parseFloat(parseFloat(a[i]).toFixed(this.precision));
        } else {
          b[i] = a[i];
        }
      }

      return b;
    };
    /**
     * Transform a bounds array to a range array the following array : array(0,
     * 0.75, 1.5, 2.25, 3); becomes : array('0-0.75', '0.75-1.5', '1.5-2.25',
     * '2.25-3');
     */


    this.setRanges = function () {
      this.ranges = Array(); // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))

      for (i = 0; i < this.bounds.length - 1; i++) {
        this.ranges[i] = this.bounds[i] + this.separator + this.bounds[i + 1];
      }
    };
    /** return min value */


    this.min = function () {
      if (this._nodata()) return;
      this.stat_min = this.serie[0];

      for (i = 0; i < this.pop(); i++) {
        if (this.serie[i] < this.stat_min) {
          this.stat_min = this.serie[i];
        }
      }

      return this.stat_min;
    };
    /** return max value */


    this.max = function () {
      if (this._nodata()) return;
      this.stat_max = this.serie[0];

      for (i = 0; i < this.pop(); i++) {
        if (this.serie[i] > this.stat_max) {
          this.stat_max = this.serie[i];
        }
      }

      return this.stat_max;
    };
    /** return sum value */


    this.sum = function () {
      if (this._nodata()) return;

      if (this.stat_sum == null) {
        this.stat_sum = 0;

        for (i = 0; i < this.pop(); i++) {
          this.stat_sum += parseFloat(this.serie[i]);
        }
      }

      return this.stat_sum;
    };
    /** return population number */


    this.pop = function () {
      if (this._nodata()) return;

      if (this.stat_pop == null) {
        this.stat_pop = this.serie.length;
      }

      return this.stat_pop;
    };
    /** return mean value */


    this.mean = function () {
      if (this._nodata()) return;

      if (this.stat_mean == null) {
        this.stat_mean = parseFloat(this.sum() / this.pop());
      }

      return this.stat_mean;
    };
    /** return median value */


    this.median = function () {
      if (this._nodata()) return;

      if (this.stat_median == null) {
        this.stat_median = 0;
        var tmp = this.sorted(); // serie pop is odd

        if (tmp.length % 2) {
          this.stat_median = parseFloat(tmp[Math.ceil(tmp.length / 2) - 1]); // serie pop is even
        } else {
          this.stat_median = (parseFloat(tmp[tmp.length / 2 - 1]) + parseFloat(tmp[tmp.length / 2])) / 2;
        }
      }

      return this.stat_median;
    };
    /** return variance value */


    this.variance = function () {
      round = typeof round === "undefined" ? true : false;
      if (this._nodata()) return;

      if (this.stat_variance == null) {
        var tmp = 0,
            serie_mean = this.mean();

        for (var i = 0; i < this.pop(); i++) {
          tmp += Math.pow(this.serie[i] - serie_mean, 2);
        }

        this.stat_variance = tmp / this.pop();

        if (round == true) {
          this.stat_variance = Math.round(this.stat_variance * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength);
        }
      }

      return this.stat_variance;
    };
    /** return standard deviation value */


    this.stddev = function (round) {
      round = typeof round === "undefined" ? true : false;
      if (this._nodata()) return;

      if (this.stat_stddev == null) {
        this.stat_stddev = Math.sqrt(this.variance());

        if (round == true) {
          this.stat_stddev = Math.round(this.stat_stddev * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength);
        }
      }

      return this.stat_stddev;
    };
    /** coefficient of variation - measure of dispersion */


    this.cov = function (round) {
      round = typeof round === "undefined" ? true : false;
      if (this._nodata()) return;

      if (this.stat_cov == null) {
        this.stat_cov = this.stddev() / this.mean();

        if (round == true) {
          this.stat_cov = Math.round(this.stat_cov * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength);
        }
      }

      return this.stat_cov;
    };
    /** reset all attributes after setting a new serie */


    this.resetStatistics = function () {
      this.stat_sorted = null;
      this.stat_mean = null;
      this.stat_median = null;
      this.stat_sum = null;
      this.stat_max = null;
      this.stat_min = null;
      this.stat_pop = null;
      this.stat_variance = null;
      this.stat_stddev = null;
      this.stat_cov = null;
    };
    /** data test */


    this._nodata = function () {
      if (this.serie.length == 0) {
        if (this.silent) this.log("[silent mode] Error. You should first enter a serie!", true);else throw new TypeError("Error. You should first enter a serie!");
        return 1;
      } else return 0;
    };
    /** check if the serie contains negative value */


    this._hasNegativeValue = function () {
      for (i = 0; i < this.serie.length; i++) {
        if (this.serie[i] < 0) return true;
      }

      return false;
    };
    /** check if the serie contains zero value */


    this._hasZeroValue = function () {
      for (i = 0; i < this.serie.length; i++) {
        if (parseFloat(this.serie[i]) === 0) return true;
      }

      return false;
    };
    /** return sorted values (as array) */


    this.sorted = function () {
      if (this.stat_sorted == null) {
        if (this.is_uniqueValues == false) {
          this.stat_sorted = this.serie.sort(function (a, b) {
            return a - b;
          });
        } else {
          this.stat_sorted = this.serie.sort(function (a, b) {
            var nameA = a.toString().toLowerCase(),
                nameB = b.toString().toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
        }
      }

      return this.stat_sorted;
    };
    /** return all info */


    this.info = function () {
      if (this._nodata()) return;
      var content = '';
      content += _t('Population') + ' : ' + this.pop() + ' - [' + _t('Min') + ' : ' + this.min() + ' | ' + _t('Max') + ' : ' + this.max() + ']' + "\n";
      content += _t('Mean') + ' : ' + this.mean() + ' - ' + _t('Median') + ' : ' + this.median() + "\n";
      content += _t('Variance') + ' : ' + this.variance() + ' - ' + _t('Standard deviation') + ' : ' + this.stddev() + ' - ' + _t('Coefficient of variation') + ' : ' + this.cov() + "\n";
      return content;
    };
    /**
     * Set Manual classification Return an array with bounds : ie array(0,
     * 0.75, 1.5, 2.25, 3);
     * Set ranges and prepare data for displaying legend
     * 
     */


    this.setClassManually = function (array) {
      if (this._nodata()) return;

      if (array[0] !== this.min() || array[array.length - 1] !== this.max()) {
        if (this.silent) this.log("[silent mode] " + t('Given bounds may not be correct! please check your input.\nMin value : ' + this.min() + ' / Max value : ' + this.max()), true);else throw new TypeError(_t('Given bounds may not be correct! please check your input.\nMin value : ' + this.min() + ' / Max value : ' + this.max()));
        return;
      }

      this.setBounds(array);
      this.setRanges(); // we specify the classification method

      this.method = _t('manual classification') + ' (' + (array.length - 1) + ' ' + _t('classes') + ')';
      return this.bounds;
    };
    /**
     * Equal intervals classification Return an array with bounds : ie array(0,
     * 0.75, 1.5, 2.25, 3);
     */


    this.getClassEqInterval = function (nbClass, forceMin, forceMax) {
      if (this._nodata()) return;
      var tmpMin = typeof forceMin === "undefined" ? this.min() : forceMin;
      var tmpMax = typeof forceMax === "undefined" ? this.max() : forceMax;
      var a = Array();
      var val = tmpMin;
      var interval = (tmpMax - tmpMin) / nbClass;

      for (i = 0; i <= nbClass; i++) {
        a[i] = val;
        val += interval;
      } //-> Fix last bound to Max of values


      a[nbClass] = tmpMax;
      this.setBounds(a);
      this.setRanges(); // we specify the classification method

      this.method = _t('eq. intervals') + ' (' + nbClass + ' ' + _t('classes') + ')';
      return this.bounds;
    };

    this.getQuantiles = function (nbClass) {
      var tmp = this.sorted();
      var quantiles = [];
      var step = this.pop() / nbClass;

      for (var i = 1; i < nbClass; i++) {
        var qidx = Math.round(i * step + 0.49);
        quantiles.push(tmp[qidx - 1]); // zero-based
      }

      return quantiles;
    };
    /**
     * Quantile classification Return an array with bounds : ie array(0, 0.75,
     * 1.5, 2.25, 3);
     */


    this.getClassQuantile = function (nbClass) {
      if (this._nodata()) return;
      var tmp = this.sorted();
      var bounds = this.getQuantiles(nbClass);
      bounds.unshift(tmp[0]);
      if (bounds[tmp.length - 1] !== tmp[tmp.length - 1]) bounds.push(tmp[tmp.length - 1]);
      this.setBounds(bounds);
      this.setRanges(); // we specify the classification method

      this.method = _t('quantile') + ' (' + nbClass + ' ' + _t('classes') + ')';
      return this.bounds;
    };
    /**
     * Standard Deviation classification
     * Return an array with bounds : ie array(0,
     * 0.75, 1.5, 2.25, 3);
     */


    this.getClassStdDeviation = function (nbClass, matchBounds) {
      if (this._nodata()) return;
      var tmpMax = this.max();
      var tmpMin = this.min();
      var a = Array(); // number of classes is odd

      if (nbClass % 2 == 1) {
        // Euclidean division to get the inferior bound
        var infBound = Math.floor(nbClass / 2);
        var supBound = infBound + 1; // we set the central bounds

        a[infBound] = this.mean() - this.stddev() / 2;
        a[supBound] = this.mean() + this.stddev() / 2; // Values < to infBound, except first one

        for (i = infBound - 1; i > 0; i--) {
          var val = a[i + 1] - this.stddev();
          a[i] = val;
        } // Values > to supBound, except last one


        for (i = supBound + 1; i < nbClass; i++) {
          var val = a[i - 1] + this.stddev();
          a[i] = val;
        } // number of classes is even

      } else {
        var meanBound = nbClass / 2; // we get the mean value

        a[meanBound] = this.mean(); // Values < to the mean, except first one

        for (i = meanBound - 1; i > 0; i--) {
          var val = a[i + 1] - this.stddev();
          a[i] = val;
        } // Values > to the mean, except last one


        for (i = meanBound + 1; i < nbClass; i++) {
          var val = a[i - 1] + this.stddev();
          a[i] = val;
        }
      } // we finally set the first value
      // do we excatly match min value or not ? 


      a[0] = typeof matchBounds === "undefined" ? a[1] - this.stddev() : this.min(); // we finally set the last value
      // do we excatly match max value or not ? 

      a[nbClass] = typeof matchBounds === "undefined" ? a[nbClass - 1] + this.stddev() : this.max();
      this.setBounds(a);
      this.setRanges(); // we specify the classification method

      this.method = _t('std deviation') + ' (' + nbClass + ' ' + _t('classes') + ')';
      return this.bounds;
    };
    /**
     * Geometric Progression classification 
     * http://en.wikipedia.org/wiki/Geometric_progression
     * Return an array with bounds : ie array(0,
     * 0.75, 1.5, 2.25, 3);
     */


    this.getClassGeometricProgression = function (nbClass) {
      if (this._nodata()) return;

      if (this._hasNegativeValue() || this._hasZeroValue()) {
        if (this.silent) this.log("[silent mode] " + _t('geometric progression can\'t be applied with a serie containing negative or zero values.'), true);else throw new TypeError(_t('geometric progression can\'t be applied with a serie containing negative or zero values.'));
        return;
      }

      var a = Array();
      var tmpMin = this.min();
      var tmpMax = this.max();
      var logMax = Math.log(tmpMax) / Math.LN10; // max decimal logarithm (or base 10)

      var logMin = Math.log(tmpMin) / Math.LN10;
      ; // min decimal logarithm (or base 10)

      var interval = (logMax - logMin) / nbClass; // we compute log bounds

      for (i = 0; i < nbClass; i++) {
        if (i == 0) {
          a[i] = logMin;
        } else {
          a[i] = a[i - 1] + interval;
        }
      } // we compute antilog


      a = a.map(function (x) {
        return Math.pow(10, x);
      }); // and we finally add max value

      a.push(this.max());
      this.setBounds(a);
      this.setRanges(); // we specify the classification method

      this.method = _t('geometric progression') + ' (' + nbClass + ' ' + _t('classes') + ')';
      return this.bounds;
    };
    /**
     * Arithmetic Progression classification 
     * http://en.wikipedia.org/wiki/Arithmetic_progression
     * Return an array with bounds : ie array(0,
     * 0.75, 1.5, 2.25, 3);
     */


    this.getClassArithmeticProgression = function (nbClass) {
      if (this._nodata()) return;
      var denominator = 0; // we compute the (french) "Raison"

      for (i = 1; i <= nbClass; i++) {
        denominator += i;
      }

      var a = Array();
      var tmpMin = this.min();
      var tmpMax = this.max();
      var interval = (tmpMax - tmpMin) / denominator;

      for (i = 0; i <= nbClass; i++) {
        if (i == 0) {
          a[i] = tmpMin;
        } else {
          a[i] = a[i - 1] + i * interval;
        }
      }

      this.setBounds(a);
      this.setRanges(); // we specify the classification method

      this.method = _t('arithmetic progression') + ' (' + nbClass + ' ' + _t('classes') + ')';
      return this.bounds;
    };
    /**
     * Credits : Doug Curl (javascript) and Daniel J Lewis (python implementation)
     * http://www.arcgis.com/home/item.html?id=0b633ff2f40d412995b8be377211c47b
     * http://danieljlewis.org/2010/06/07/jenks-natural-breaks-algorithm-in-python/
     */


    this.getClassJenks = function (nbClass) {
      if (this._nodata()) return;
      dataList = this.sorted(); // now iterate through the datalist:
      // determine mat1 and mat2
      // really not sure how these 2 different arrays are set - the code for
      // each seems the same!
      // but the effect are 2 different arrays: mat1 and mat2

      var mat1 = [];

      for (var x = 0, xl = dataList.length + 1; x < xl; x++) {
        var temp = [];

        for (var j = 0, jl = nbClass + 1; j < jl; j++) {
          temp.push(0);
        }

        mat1.push(temp);
      }

      var mat2 = [];

      for (var i = 0, il = dataList.length + 1; i < il; i++) {
        var temp2 = [];

        for (var c = 0, cl = nbClass + 1; c < cl; c++) {
          temp2.push(0);
        }

        mat2.push(temp2);
      } // absolutely no idea what this does - best I can tell, it sets the 1st
      // group in the
      // mat1 and mat2 arrays to 1 and 0 respectively


      for (var y = 1, yl = nbClass + 1; y < yl; y++) {
        mat1[0][y] = 1;
        mat2[0][y] = 0;

        for (var t = 1, tl = dataList.length + 1; t < tl; t++) {
          mat2[t][y] = Infinity;
        }

        var v = 0.0;
      } // and this part - I'm a little clueless on - but it works
      // pretty sure it iterates across the entire dataset and compares each
      // value to
      // one another to and adjust the indices until you meet the rules:
      // minimum deviation
      // within a class and maximum separation between classes


      for (var l = 2, ll = dataList.length + 1; l < ll; l++) {
        var s1 = 0.0;
        var s2 = 0.0;
        var w = 0.0;

        for (var m = 1, ml = l + 1; m < ml; m++) {
          var i3 = l - m + 1;
          var val = parseFloat(dataList[i3 - 1]);
          s2 += val * val;
          s1 += val;
          w += 1;
          v = s2 - s1 * s1 / w;
          var i4 = i3 - 1;

          if (i4 != 0) {
            for (var p = 2, pl = nbClass + 1; p < pl; p++) {
              if (mat2[l][p] >= v + mat2[i4][p - 1]) {
                mat1[l][p] = i3;
                mat2[l][p] = v + mat2[i4][p - 1];
              }
            }
          }
        }

        mat1[l][1] = 1;
        mat2[l][1] = v;
      }

      var k = dataList.length;
      var kclass = []; // fill the kclass (classification) array with zeros:

      for (i = 0; i <= nbClass; i++) {
        kclass.push(0);
      } // this is the last number in the array:


      kclass[nbClass] = parseFloat(dataList[dataList.length - 1]); // this is the first number - can set to zero, but want to set to lowest
      // to use for legend:

      kclass[0] = parseFloat(dataList[0]);
      var countNum = nbClass;

      while (countNum >= 2) {
        var id = parseInt(mat1[k][countNum] - 2);
        kclass[countNum - 1] = dataList[id];
        k = parseInt(mat1[k][countNum] - 1); // spits out the rank and value of the break values:
        // console.log("id="+id,"rank = " + String(mat1[k][countNum]),"val =
        // " + String(dataList[id]))
        // count down:

        countNum -= 1;
      } // check to see if the 0 and 1 in the array are the same - if so, set 0
      // to 0:


      if (kclass[0] == kclass[1]) {
        kclass[0] = 0;
      }

      this.setBounds(kclass);
      this.setRanges();
      this.method = _t('Jenks') + ' (' + nbClass + ' ' + _t('classes') + ')';
      return this.bounds; //array of breaks
    };
    /**
     * Quantile classification Return an array with bounds : ie array(0, 0.75,
     * 1.5, 2.25, 3);
     */


    this.getClassUniqueValues = function () {
      if (this._nodata()) return;
      this.is_uniqueValues = true;
      var tmp = this.sorted(); // display in alphabetical order

      var a = Array();

      for (i = 0; i < this.pop(); i++) {
        if (a.indexOf(tmp[i]) === -1) a.push(tmp[i]);
      }

      this.bounds = a; // we specify the classification method

      this.method = _t('unique values');
      return a;
    };
    /**
     * Return the class of a given value.
     * For example value : 6
     * and bounds array = (0, 4, 8, 12);
     * Return 2
     */


    this.getClass = function (value) {
      for (i = 0; i < this.bounds.length; i++) {
        if (this.is_uniqueValues == true) {
          if (value == this.bounds[i]) return i;
        } else {
          // parseFloat() is necessary
          if (parseFloat(value) <= this.bounds[i + 1]) {
            return i;
          }
        }
      }

      return _t("Unable to get value's class.");
    };
    /**
     * Return the ranges array : array('0-0.75', '0.75-1.5', '1.5-2.25',
     * '2.25-3');
     */


    this.getRanges = function () {
      return this.ranges;
    };
    /**
     * Returns the number/index of this.ranges that value falls into
     */


    this.getRangeNum = function (value) {
      var bounds, i;

      for (i = 0; i < this.ranges.length; i++) {
        bounds = this.ranges[i].split(/ - /);

        if (value <= parseFloat(bounds[1])) {
          return i;
        }
      }
    };
    /*
     * Compute inner ranges based on serie. 
     * Produce discontinous ranges used for legend - return an array similar to : 
     * array('0.00-0.74', '0.98-1.52', '1.78-2.25', '2.99-3.14');
     * If inner ranges already computed, return array values.
     */


    this.getInnerRanges = function () {
      // if already computed, we return the result
      if (this.inner_ranges != null) return this.inner_ranges;
      var a = new Array();
      var tmp = this.sorted();
      var cnt = 1; // bounds array counter

      for (i = 0; i < tmp.length; i++) {
        if (i == 0) var range_firstvalue = tmp[i]; // we init first range value

        if (parseFloat(tmp[i]) > parseFloat(this.bounds[cnt])) {
          a[cnt - 1] = '' + range_firstvalue + this.separator + tmp[i - 1];
          var range_firstvalue = tmp[i];
          cnt++;
        } // we reach the last range, we finally complete manually
        // and return the array


        if (cnt == this.bounds.length - 1) {
          // we set the last value
          a[cnt - 1] = '' + range_firstvalue + this.separator + tmp[tmp.length - 1];
          this.inner_ranges = a;
          return this.inner_ranges;
        }
      }
    };

    this.getSortedlist = function () {
      return this.sorted().join(', ');
    };
    /**
     * Return an html legend
     * colors : specify an array of color (hexadecimal values)
     * legend :  specify a text input for the legend. By default, just displays 'legend'
     * counter : if not null, display counter value
     * callback : if not null, callback function applied on legend boundaries
     * mode : 	null, 'default', 'distinct', 'discontinuous' : 
     * 			- if mode is null, will display legend as 'default mode'
     * 			- 'default' : displays ranges like in ranges array (continuous values), sample :  29.26 - 378.80 / 378.80 - 2762.25 /  2762.25 - 6884.84
     * 			- 'distinct' : Add + 1 according to decimal precision to distinguish classes (discrete values), sample :  29.26 - 378.80 / 378.81 - 2762.25 /  2762.26 - 6884.84 
     * 			- 'discontinuous' : indicates the range of data actually falling in each class , sample :  29.26 - 225.43 / 852.12 - 2762.20 /  3001.25 - 6884.84 / not implemented yet
     * order : 	null, 'ASC', 'DESC'
     */


    this.getHtmlLegend = function (colors, legend, counter, callback, mode, order) {
      var cnt = '';
      var elements = new Array();
      this.doCount(); // we do count, even if not displayed

      if (colors != null) {
        ccolors = colors;
      } else {
        ccolors = this.colors;
      }

      if (legend != null) {
        lg = legend;
      } else {
        lg = 'Legend';
      }

      if (counter != null) {
        getcounter = true;
      } else {
        getcounter = false;
      }

      if (callback != null) {
        fn = callback;
      } else {
        fn = function fn(o) {
          return o;
        };
      }

      if (mode == null) {
        mode = 'default';
      }

      if (mode == 'discontinuous') {
        this.getInnerRanges(); // check if some classes are not populated / equivalent of in_array function

        if (this.counter.indexOf(0) !== -1) {
          if (this.silent) this.log("[silent mode] " + _t("Geostats cannot apply 'discontinuous' mode to the getHtmlLegend() method because some classes are not populated.\nPlease switch to 'default' or 'distinct' modes. Exit!"), true);else throw new TypeError(_t("Geostats cannot apply 'discontinuous' mode to the getHtmlLegend() method because some classes are not populated.\nPlease switch to 'default' or 'distinct' modes. Exit!"));
          return;
        }
      }

      if (order !== 'DESC') order = 'ASC';

      if (ccolors.length < this.ranges.length) {
        if (this.silent) this.log("[silent mode] " + _t('The number of colors should fit the number of ranges. Exit!'), true);else throw new TypeError(_t('The number of colors should fit the number of ranges. Exit!'));
        return;
      }

      if (this.is_uniqueValues == false) {
        for (i = 0; i < this.ranges.length; i++) {
          if (getcounter === true) {
            cnt = ' <span class="geostats-legend-counter">(' + this.counter[i] + ')</span>';
          } //console.log("Ranges : " + this.ranges[i]);
          // default mode 


          var tmp = this.ranges[i].split(this.separator);
          var start_value = parseFloat(tmp[0]).toFixed(this.precision);
          var end_value = parseFloat(tmp[1]).toFixed(this.precision); // if mode == 'distinct' and we are not working on the first value

          if (mode == 'distinct' && i != 0) {
            if (isInt(start_value)) {
              start_value = parseInt(start_value) + 1; // format to float if necessary

              if (this.precisionflag == 'manual' && this.precision != 0) start_value = parseFloat(start_value).toFixed(this.precision);
            } else {
              start_value = parseFloat(start_value) + 1 / Math.pow(10, this.precision); // strangely the formula above return sometimes long decimal values, 
              // the following instruction fix it

              start_value = parseFloat(start_value).toFixed(this.precision);
            }
          } // if mode == 'discontinuous'


          if (mode == 'discontinuous') {
            var tmp = this.inner_ranges[i].split(this.separator); // console.log("Ranges : " + this.inner_ranges[i]);

            var start_value = parseFloat(tmp[0]).toFixed(this.precision);
            var end_value = parseFloat(tmp[1]).toFixed(this.precision);
          } // we apply callback function


          var el = fn(start_value) + this.legendSeparator + fn(end_value);
          var block = '<div><div class="geostats-legend-block" style="background-color:' + ccolors[i] + '"></div> ' + el + cnt + '</div>';
          elements.push(block);
        }
      } else {
        // only if classification is done on unique values
        for (i = 0; i < this.bounds.length; i++) {
          if (getcounter === true) {
            cnt = ' <span class="geostats-legend-counter">(' + this.counter[i] + ')</span>';
          }

          var el = fn(this.bounds[i]);
          var block = '<div><div class="geostats-legend-block" style="background-color:' + ccolors[i] + '"></div> ' + el + cnt + '</div>';
          elements.push(block);
        }
      } // do we reverse the return legend ?


      if (order === 'DESC') elements.reverse(); // finally we create HTML and return it

      var content = '<div class="geostats-legend"><div class="geostats-legend-title">' + _t(lg) + '</div>';

      for (i = 0; i < elements.length; i++) {
        content += elements[i];
      }

      content += '</div>';
      return content;
    }; // object constructor
    // At the end of script. If not setPrecision() method is not known
    // we create an object identifier for debugging


    this.objectID = new Date().getUTCMilliseconds();
    this.log('Creating new geostats object');

    if (typeof a !== 'undefined' && a.length > 0) {
      this.serie = a;
      this.setPrecision();
      this.log('Setting serie (' + a.length + ') : ' + a.join());
    } else {
      this.serie = Array();
    }

    ; // creating aliases on classification function for backward compatibility

    this.getJenks = this.getClassJenks;
    this.getGeometricProgression = this.getClassGeometricProgression;
    this.getEqInterval = this.getClassEqInterval;
    this.getQuantile = this.getClassQuantile;
    this.getStdDeviation = this.getClassStdDeviation;
    this.getUniqueValues = this.getClassUniqueValues;
    this.getArithmeticProgression = this.getClassArithmeticProgression;
  };

  window.geostats = geostats;
  return geostats;
});

/***/ }),
/* 35 */
/***/ (function(module, exports) {

/*
 * JsonSQL
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 0.1
 * Last Modified: 1/1/2008
 *
 * Copyright 2008 Trent Richardson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
window.jsonsql = {
  query: function query(sql, json) {
    var returnfields = sql.match(/^(select)\s+([a-z0-9_\,\.\s\*]+)\s+from\s+([a-z0-9_\.]+)(?: where\s+\((.+)\))?\s*(?:order\sby\s+([a-z0-9_\,]+))?\s*(asc|desc|ascnum|descnum)?\s*(?:limit\s+([0-9_\,]+))?/i);
    var ops = {
      fields: returnfields[2].replace(' ', '').split(','),
      from: returnfields[3].replace(' ', ''),
      where: returnfields[4] == undefined ? "true" : returnfields[4],
      orderby: returnfields[5] == undefined ? [] : returnfields[5].replace(' ', '').split(','),
      order: returnfields[6] == undefined ? "asc" : returnfields[6],
      limit: returnfields[7] == undefined ? [] : returnfields[7].replace(' ', '').split(',')
    };
    return this.parse(json, ops);
  },
  parse: function parse(json, ops) {
    var o = {
      fields: ["*"],
      from: "json",
      where: "",
      orderby: [],
      order: "asc",
      limit: []
    };

    for (i in ops) {
      o[i] = ops[i];
    }

    var result = [];
    result = this.returnFilter(json, o);
    result = this.returnOrderBy(result, o.orderby, o.order);
    result = this.returnLimit(result, o.limit);
    return result;
  },
  returnFilter: function returnFilter(json, jsonsql_o) {
    var jsonsql_scope = eval(jsonsql_o.from);
    var jsonsql_result = [];
    var jsonsql_rc = 0;
    if (jsonsql_o.where == "") jsonsql_o.where = "true";

    for (var jsonsql_i in jsonsql_scope) {
      with (jsonsql_scope[jsonsql_i]) {
        if (eval(jsonsql_o.where)) {
          jsonsql_result[jsonsql_rc++] = this.returnFields(jsonsql_scope[jsonsql_i], jsonsql_o.fields);
        }
      }
    }

    return jsonsql_result;
  },
  returnFields: function returnFields(scope, fields) {
    if (fields.length == 0) fields = ["*"];
    if (fields[0] == "*") return scope;
    var returnobj = {};

    for (var i in fields) {
      returnobj[fields[i]] = scope[fields[i]];
    }

    return returnobj;
  },
  returnOrderBy: function returnOrderBy(result, orderby, order) {
    if (orderby.length == 0) return result;
    result.sort(function (a, b) {
      switch (order.toLowerCase()) {
        case "desc":
          return eval('a.' + orderby[0] + ' < b.' + orderby[0]) ? 1 : -1;

        case "asc":
          return eval('a.' + orderby[0] + ' > b.' + orderby[0]) ? 1 : -1;

        case "descnum":
          return eval('a.' + orderby[0] + ' - b.' + orderby[0]);

        case "ascnum":
          return eval('b.' + orderby[0] + ' - a.' + orderby[0]);
      }
    });
    return result;
  },
  returnLimit: function returnLimit(result, limit) {
    switch (limit.length) {
      case 0:
        return result;

      case 1:
        return result.splice(0, limit[0]);

      case 2:
        return result.splice(limit[0] - 1, limit[1]);
    }
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {;

(function (sax) {
  // wrapper for non-node envs
  sax.parser = function (strict, opt) {
    return new SAXParser(strict, opt);
  };

  sax.SAXParser = SAXParser;
  sax.SAXStream = SAXStream;
  sax.createStream = createStream; // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  // as rare as required, but as often as necessary to ensure never crossing this bound.
  // Furthermore, buffers are only tested at most once per write(), so passing a very
  // large string into write() might have undesirable effects, but this is manageable by
  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  // edge case, result in creating at most one complete copy of the string passed in.
  // Set to Infinity to have unlimited buffers.

  sax.MAX_BUFFER_LENGTH = 64 * 1024;
  var buffers = ['comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype', 'procInstName', 'procInstBody', 'entity', 'attribName', 'attribValue', 'cdata', 'script'];
  sax.EVENTS = ['text', 'processinginstruction', 'sgmldeclaration', 'doctype', 'comment', 'opentagstart', 'attribute', 'opentag', 'closetag', 'opencdata', 'cdata', 'closecdata', 'error', 'end', 'ready', 'script', 'opennamespace', 'closenamespace'];

  function SAXParser(strict, opt) {
    if (!(this instanceof SAXParser)) {
      return new SAXParser(strict, opt);
    }

    var parser = this;
    clearBuffers(parser);
    parser.q = parser.c = '';
    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
    parser.opt = opt || {};
    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase';
    parser.tags = [];
    parser.closed = parser.closedRoot = parser.sawRoot = false;
    parser.tag = parser.error = null;
    parser.strict = !!strict;
    parser.noscript = !!(strict || parser.opt.noscript);
    parser.state = S.BEGIN;
    parser.strictEntities = parser.opt.strictEntities;
    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
    parser.attribList = []; // namespaces form a prototype chain.
    // it always points at the current tag,
    // which protos to its parent tag.

    if (parser.opt.xmlns) {
      parser.ns = Object.create(rootNS);
    } // mostly just for error reporting


    parser.trackPosition = parser.opt.position !== false;

    if (parser.trackPosition) {
      parser.position = parser.line = parser.column = 0;
    }

    emit(parser, 'onready');
  }

  if (!Object.create) {
    Object.create = function (o) {
      function F() {}

      F.prototype = o;
      var newf = new F();
      return newf;
    };
  }

  if (!Object.keys) {
    Object.keys = function (o) {
      var a = [];

      for (var i in o) {
        if (o.hasOwnProperty(i)) a.push(i);
      }

      return a;
    };
  }

  function checkBufferLength(parser) {
    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
    var maxActual = 0;

    for (var i = 0, l = buffers.length; i < l; i++) {
      var len = parser[buffers[i]].length;

      if (len > maxAllowed) {
        // Text/cdata nodes can get big, and since they're buffered,
        // we can get here under normal conditions.
        // Avoid issues by emitting the text node now,
        // so at least it won't get any bigger.
        switch (buffers[i]) {
          case 'textNode':
            closeText(parser);
            break;

          case 'cdata':
            emitNode(parser, 'oncdata', parser.cdata);
            parser.cdata = '';
            break;

          case 'script':
            emitNode(parser, 'onscript', parser.script);
            parser.script = '';
            break;

          default:
            error(parser, 'Max buffer length exceeded: ' + buffers[i]);
        }
      }

      maxActual = Math.max(maxActual, len);
    } // schedule the next check for the earliest possible buffer overrun.


    var m = sax.MAX_BUFFER_LENGTH - maxActual;
    parser.bufferCheckPosition = m + parser.position;
  }

  function clearBuffers(parser) {
    for (var i = 0, l = buffers.length; i < l; i++) {
      parser[buffers[i]] = '';
    }
  }

  function flushBuffers(parser) {
    closeText(parser);

    if (parser.cdata !== '') {
      emitNode(parser, 'oncdata', parser.cdata);
      parser.cdata = '';
    }

    if (parser.script !== '') {
      emitNode(parser, 'onscript', parser.script);
      parser.script = '';
    }
  }

  SAXParser.prototype = {
    end: function end() {
      _end(this);
    },
    write: write,
    resume: function resume() {
      this.error = null;
      return this;
    },
    close: function close() {
      return this.write(null);
    },
    flush: function flush() {
      flushBuffers(this);
    }
  };
  var Stream;

  try {
    Stream = __webpack_require__(39).Stream;
  } catch (ex) {
    Stream = function Stream() {};
  }

  var streamWraps = sax.EVENTS.filter(function (ev) {
    return ev !== 'error' && ev !== 'end';
  });

  function createStream(strict, opt) {
    return new SAXStream(strict, opt);
  }

  function SAXStream(strict, opt) {
    if (!(this instanceof SAXStream)) {
      return new SAXStream(strict, opt);
    }

    Stream.apply(this);
    this._parser = new SAXParser(strict, opt);
    this.writable = true;
    this.readable = true;
    var me = this;

    this._parser.onend = function () {
      me.emit('end');
    };

    this._parser.onerror = function (er) {
      me.emit('error', er); // if didn't throw, then means error was handled.
      // go ahead and clear error, so we can write again.

      me._parser.error = null;
    };

    this._decoder = null;
    streamWraps.forEach(function (ev) {
      Object.defineProperty(me, 'on' + ev, {
        get: function get() {
          return me._parser['on' + ev];
        },
        set: function set(h) {
          if (!h) {
            me.removeAllListeners(ev);
            me._parser['on' + ev] = h;
            return h;
          }

          me.on(ev, h);
        },
        enumerable: true,
        configurable: false
      });
    });
  }

  SAXStream.prototype = Object.create(Stream.prototype, {
    constructor: {
      value: SAXStream
    }
  });

  SAXStream.prototype.write = function (data) {
    if (typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function' && Buffer.isBuffer(data)) {
      if (!this._decoder) {
        var SD = __webpack_require__(12).StringDecoder;

        this._decoder = new SD('utf8');
      }

      data = this._decoder.write(data);
    }

    this._parser.write(data.toString());

    this.emit('data', data);
    return true;
  };

  SAXStream.prototype.end = function (chunk) {
    if (chunk && chunk.length) {
      this.write(chunk);
    }

    this._parser.end();

    return true;
  };

  SAXStream.prototype.on = function (ev, handler) {
    var me = this;

    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
      me._parser['on' + ev] = function () {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        args.splice(0, 0, ev);
        me.emit.apply(me, args);
      };
    }

    return Stream.prototype.on.call(me, ev, handler);
  }; // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.


  var CDATA = '[CDATA[';
  var DOCTYPE = 'DOCTYPE';
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/';
  var rootNS = {
    xml: XML_NAMESPACE,
    xmlns: XMLNS_NAMESPACE
  }; // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
  // This implementation works on strings, a single character at a time
  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
  // without a significant breaking change to either this  parser, or the
  // JavaScript language.  Implementation of an emoji-capable xml parser
  // is left as an exercise for the reader.

  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

  function isWhitespace(c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t';
  }

  function isQuote(c) {
    return c === '"' || c === '\'';
  }

  function isAttribEnd(c) {
    return c === '>' || isWhitespace(c);
  }

  function isMatch(regex, c) {
    return regex.test(c);
  }

  function notMatch(regex, c) {
    return !isMatch(regex, c);
  }

  var S = 0;
  sax.STATE = {
    BEGIN: S++,
    // leading byte order mark or whitespace
    BEGIN_WHITESPACE: S++,
    // leading whitespace
    TEXT: S++,
    // general stuff
    TEXT_ENTITY: S++,
    // &amp and such.
    OPEN_WAKA: S++,
    // <
    SGML_DECL: S++,
    // <!BLARG
    SGML_DECL_QUOTED: S++,
    // <!BLARG foo "bar
    DOCTYPE: S++,
    // <!DOCTYPE
    DOCTYPE_QUOTED: S++,
    // <!DOCTYPE "//blah
    DOCTYPE_DTD: S++,
    // <!DOCTYPE "//blah" [ ...
    DOCTYPE_DTD_QUOTED: S++,
    // <!DOCTYPE "//blah" [ "foo
    COMMENT_STARTING: S++,
    // <!-
    COMMENT: S++,
    // <!--
    COMMENT_ENDING: S++,
    // <!-- blah -
    COMMENT_ENDED: S++,
    // <!-- blah --
    CDATA: S++,
    // <![CDATA[ something
    CDATA_ENDING: S++,
    // ]
    CDATA_ENDING_2: S++,
    // ]]
    PROC_INST: S++,
    // <?hi
    PROC_INST_BODY: S++,
    // <?hi there
    PROC_INST_ENDING: S++,
    // <?hi "there" ?
    OPEN_TAG: S++,
    // <strong
    OPEN_TAG_SLASH: S++,
    // <strong /
    ATTRIB: S++,
    // <a
    ATTRIB_NAME: S++,
    // <a foo
    ATTRIB_NAME_SAW_WHITE: S++,
    // <a foo _
    ATTRIB_VALUE: S++,
    // <a foo=
    ATTRIB_VALUE_QUOTED: S++,
    // <a foo="bar
    ATTRIB_VALUE_CLOSED: S++,
    // <a foo="bar"
    ATTRIB_VALUE_UNQUOTED: S++,
    // <a foo=bar
    ATTRIB_VALUE_ENTITY_Q: S++,
    // <foo bar="&quot;"
    ATTRIB_VALUE_ENTITY_U: S++,
    // <foo bar=&quot
    CLOSE_TAG: S++,
    // </a
    CLOSE_TAG_SAW_WHITE: S++,
    // </a   >
    SCRIPT: S++,
    // <script> ...
    SCRIPT_ENDING: S++ // <script> ... <

  };
  sax.XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'"
  };
  sax.ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'",
    'AElig': 198,
    'Aacute': 193,
    'Acirc': 194,
    'Agrave': 192,
    'Aring': 197,
    'Atilde': 195,
    'Auml': 196,
    'Ccedil': 199,
    'ETH': 208,
    'Eacute': 201,
    'Ecirc': 202,
    'Egrave': 200,
    'Euml': 203,
    'Iacute': 205,
    'Icirc': 206,
    'Igrave': 204,
    'Iuml': 207,
    'Ntilde': 209,
    'Oacute': 211,
    'Ocirc': 212,
    'Ograve': 210,
    'Oslash': 216,
    'Otilde': 213,
    'Ouml': 214,
    'THORN': 222,
    'Uacute': 218,
    'Ucirc': 219,
    'Ugrave': 217,
    'Uuml': 220,
    'Yacute': 221,
    'aacute': 225,
    'acirc': 226,
    'aelig': 230,
    'agrave': 224,
    'aring': 229,
    'atilde': 227,
    'auml': 228,
    'ccedil': 231,
    'eacute': 233,
    'ecirc': 234,
    'egrave': 232,
    'eth': 240,
    'euml': 235,
    'iacute': 237,
    'icirc': 238,
    'igrave': 236,
    'iuml': 239,
    'ntilde': 241,
    'oacute': 243,
    'ocirc': 244,
    'ograve': 242,
    'oslash': 248,
    'otilde': 245,
    'ouml': 246,
    'szlig': 223,
    'thorn': 254,
    'uacute': 250,
    'ucirc': 251,
    'ugrave': 249,
    'uuml': 252,
    'yacute': 253,
    'yuml': 255,
    'copy': 169,
    'reg': 174,
    'nbsp': 160,
    'iexcl': 161,
    'cent': 162,
    'pound': 163,
    'curren': 164,
    'yen': 165,
    'brvbar': 166,
    'sect': 167,
    'uml': 168,
    'ordf': 170,
    'laquo': 171,
    'not': 172,
    'shy': 173,
    'macr': 175,
    'deg': 176,
    'plusmn': 177,
    'sup1': 185,
    'sup2': 178,
    'sup3': 179,
    'acute': 180,
    'micro': 181,
    'para': 182,
    'middot': 183,
    'cedil': 184,
    'ordm': 186,
    'raquo': 187,
    'frac14': 188,
    'frac12': 189,
    'frac34': 190,
    'iquest': 191,
    'times': 215,
    'divide': 247,
    'OElig': 338,
    'oelig': 339,
    'Scaron': 352,
    'scaron': 353,
    'Yuml': 376,
    'fnof': 402,
    'circ': 710,
    'tilde': 732,
    'Alpha': 913,
    'Beta': 914,
    'Gamma': 915,
    'Delta': 916,
    'Epsilon': 917,
    'Zeta': 918,
    'Eta': 919,
    'Theta': 920,
    'Iota': 921,
    'Kappa': 922,
    'Lambda': 923,
    'Mu': 924,
    'Nu': 925,
    'Xi': 926,
    'Omicron': 927,
    'Pi': 928,
    'Rho': 929,
    'Sigma': 931,
    'Tau': 932,
    'Upsilon': 933,
    'Phi': 934,
    'Chi': 935,
    'Psi': 936,
    'Omega': 937,
    'alpha': 945,
    'beta': 946,
    'gamma': 947,
    'delta': 948,
    'epsilon': 949,
    'zeta': 950,
    'eta': 951,
    'theta': 952,
    'iota': 953,
    'kappa': 954,
    'lambda': 955,
    'mu': 956,
    'nu': 957,
    'xi': 958,
    'omicron': 959,
    'pi': 960,
    'rho': 961,
    'sigmaf': 962,
    'sigma': 963,
    'tau': 964,
    'upsilon': 965,
    'phi': 966,
    'chi': 967,
    'psi': 968,
    'omega': 969,
    'thetasym': 977,
    'upsih': 978,
    'piv': 982,
    'ensp': 8194,
    'emsp': 8195,
    'thinsp': 8201,
    'zwnj': 8204,
    'zwj': 8205,
    'lrm': 8206,
    'rlm': 8207,
    'ndash': 8211,
    'mdash': 8212,
    'lsquo': 8216,
    'rsquo': 8217,
    'sbquo': 8218,
    'ldquo': 8220,
    'rdquo': 8221,
    'bdquo': 8222,
    'dagger': 8224,
    'Dagger': 8225,
    'bull': 8226,
    'hellip': 8230,
    'permil': 8240,
    'prime': 8242,
    'Prime': 8243,
    'lsaquo': 8249,
    'rsaquo': 8250,
    'oline': 8254,
    'frasl': 8260,
    'euro': 8364,
    'image': 8465,
    'weierp': 8472,
    'real': 8476,
    'trade': 8482,
    'alefsym': 8501,
    'larr': 8592,
    'uarr': 8593,
    'rarr': 8594,
    'darr': 8595,
    'harr': 8596,
    'crarr': 8629,
    'lArr': 8656,
    'uArr': 8657,
    'rArr': 8658,
    'dArr': 8659,
    'hArr': 8660,
    'forall': 8704,
    'part': 8706,
    'exist': 8707,
    'empty': 8709,
    'nabla': 8711,
    'isin': 8712,
    'notin': 8713,
    'ni': 8715,
    'prod': 8719,
    'sum': 8721,
    'minus': 8722,
    'lowast': 8727,
    'radic': 8730,
    'prop': 8733,
    'infin': 8734,
    'ang': 8736,
    'and': 8743,
    'or': 8744,
    'cap': 8745,
    'cup': 8746,
    'int': 8747,
    'there4': 8756,
    'sim': 8764,
    'cong': 8773,
    'asymp': 8776,
    'ne': 8800,
    'equiv': 8801,
    'le': 8804,
    'ge': 8805,
    'sub': 8834,
    'sup': 8835,
    'nsub': 8836,
    'sube': 8838,
    'supe': 8839,
    'oplus': 8853,
    'otimes': 8855,
    'perp': 8869,
    'sdot': 8901,
    'lceil': 8968,
    'rceil': 8969,
    'lfloor': 8970,
    'rfloor': 8971,
    'lang': 9001,
    'rang': 9002,
    'loz': 9674,
    'spades': 9824,
    'clubs': 9827,
    'hearts': 9829,
    'diams': 9830
  };
  Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key];
    var s = typeof e === 'number' ? String.fromCharCode(e) : e;
    sax.ENTITIES[key] = s;
  });

  for (var s in sax.STATE) {
    sax.STATE[sax.STATE[s]] = s;
  } // shorthand


  S = sax.STATE;

  function emit(parser, event, data) {
    parser[event] && parser[event](data);
  }

  function emitNode(parser, nodeType, data) {
    if (parser.textNode) closeText(parser);
    emit(parser, nodeType, data);
  }

  function closeText(parser) {
    parser.textNode = textopts(parser.opt, parser.textNode);
    if (parser.textNode) emit(parser, 'ontext', parser.textNode);
    parser.textNode = '';
  }

  function textopts(opt, text) {
    if (opt.trim) text = text.trim();
    if (opt.normalize) text = text.replace(/\s+/g, ' ');
    return text;
  }

  function error(parser, er) {
    closeText(parser);

    if (parser.trackPosition) {
      er += '\nLine: ' + parser.line + '\nColumn: ' + parser.column + '\nChar: ' + parser.c;
    }

    er = new Error(er);
    parser.error = er;
    emit(parser, 'onerror', er);
    return parser;
  }

  function _end(parser) {
    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag');

    if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
      error(parser, 'Unexpected end');
    }

    closeText(parser);
    parser.c = '';
    parser.closed = true;
    emit(parser, 'onend');
    SAXParser.call(parser, parser.strict, parser.opt);
    return parser;
  }

  function strictFail(parser, message) {
    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
      throw new Error('bad call to strictFail');
    }

    if (parser.strict) {
      error(parser, message);
    }
  }

  function newTag(parser) {
    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
    var parent = parser.tags[parser.tags.length - 1] || parser;
    var tag = parser.tag = {
      name: parser.tagName,
      attributes: {}
    }; // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"

    if (parser.opt.xmlns) {
      tag.ns = parent.ns;
    }

    parser.attribList.length = 0;
    emitNode(parser, 'onopentagstart', tag);
  }

  function qname(name, attribute) {
    var i = name.indexOf(':');
    var qualName = i < 0 ? ['', name] : name.split(':');
    var prefix = qualName[0];
    var local = qualName[1]; // <x "xmlns"="http://foo">

    if (attribute && name === 'xmlns') {
      prefix = 'xmlns';
      local = '';
    }

    return {
      prefix: prefix,
      local: local
    };
  }

  function attrib(parser) {
    if (!parser.strict) {
      parser.attribName = parser.attribName[parser.looseCase]();
    }

    if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
      parser.attribName = parser.attribValue = '';
      return;
    }

    if (parser.opt.xmlns) {
      var qn = qname(parser.attribName, true);
      var prefix = qn.prefix;
      var local = qn.local;

      if (prefix === 'xmlns') {
        // namespace binding attribute. push the binding into scope
        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
          strictFail(parser, 'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' + 'Actual: ' + parser.attribValue);
        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
          strictFail(parser, 'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' + 'Actual: ' + parser.attribValue);
        } else {
          var tag = parser.tag;
          var parent = parser.tags[parser.tags.length - 1] || parser;

          if (tag.ns === parent.ns) {
            tag.ns = Object.create(parent.ns);
          }

          tag.ns[local] = parser.attribValue;
        }
      } // defer onattribute events until all attributes have been seen
      // so any new bindings can take effect. preserve attribute order
      // so deferred events can be emitted in document order


      parser.attribList.push([parser.attribName, parser.attribValue]);
    } else {
      // in non-xmlns mode, we can emit the event right away
      parser.tag.attributes[parser.attribName] = parser.attribValue;
      emitNode(parser, 'onattribute', {
        name: parser.attribName,
        value: parser.attribValue
      });
    }

    parser.attribName = parser.attribValue = '';
  }

  function openTag(parser, selfClosing) {
    if (parser.opt.xmlns) {
      // emit namespace binding events
      var tag = parser.tag; // add namespace info to tag

      var qn = qname(parser.tagName);
      tag.prefix = qn.prefix;
      tag.local = qn.local;
      tag.uri = tag.ns[qn.prefix] || '';

      if (tag.prefix && !tag.uri) {
        strictFail(parser, 'Unbound namespace prefix: ' + JSON.stringify(parser.tagName));
        tag.uri = qn.prefix;
      }

      var parent = parser.tags[parser.tags.length - 1] || parser;

      if (tag.ns && parent.ns !== tag.ns) {
        Object.keys(tag.ns).forEach(function (p) {
          emitNode(parser, 'onopennamespace', {
            prefix: p,
            uri: tag.ns[p]
          });
        });
      } // handle deferred onattribute events
      // Note: do not apply default ns to attributes:
      //   http://www.w3.org/TR/REC-xml-names/#defaulting


      for (var i = 0, l = parser.attribList.length; i < l; i++) {
        var nv = parser.attribList[i];
        var name = nv[0];
        var value = nv[1];
        var qualName = qname(name, true);
        var prefix = qualName.prefix;
        var local = qualName.local;
        var uri = prefix === '' ? '' : tag.ns[prefix] || '';
        var a = {
          name: name,
          value: value,
          prefix: prefix,
          local: local,
          uri: uri
        }; // if there's any attributes with an undefined namespace,
        // then fail on them now.

        if (prefix && prefix !== 'xmlns' && !uri) {
          strictFail(parser, 'Unbound namespace prefix: ' + JSON.stringify(prefix));
          a.uri = prefix;
        }

        parser.tag.attributes[name] = a;
        emitNode(parser, 'onattribute', a);
      }

      parser.attribList.length = 0;
    }

    parser.tag.isSelfClosing = !!selfClosing; // process the tag

    parser.sawRoot = true;
    parser.tags.push(parser.tag);
    emitNode(parser, 'onopentag', parser.tag);

    if (!selfClosing) {
      // special case for <script> in non-strict mode.
      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
        parser.state = S.SCRIPT;
      } else {
        parser.state = S.TEXT;
      }

      parser.tag = null;
      parser.tagName = '';
    }

    parser.attribName = parser.attribValue = '';
    parser.attribList.length = 0;
  }

  function closeTag(parser) {
    if (!parser.tagName) {
      strictFail(parser, 'Weird empty close tag.');
      parser.textNode += '</>';
      parser.state = S.TEXT;
      return;
    }

    if (parser.script) {
      if (parser.tagName !== 'script') {
        parser.script += '</' + parser.tagName + '>';
        parser.tagName = '';
        parser.state = S.SCRIPT;
        return;
      }

      emitNode(parser, 'onscript', parser.script);
      parser.script = '';
    } // first make sure that the closing tag actually exists.
    // <a><b></c></b></a> will close everything, otherwise.


    var t = parser.tags.length;
    var tagName = parser.tagName;

    if (!parser.strict) {
      tagName = tagName[parser.looseCase]();
    }

    var closeTo = tagName;

    while (t--) {
      var close = parser.tags[t];

      if (close.name !== closeTo) {
        // fail the first time in strict mode
        strictFail(parser, 'Unexpected close tag');
      } else {
        break;
      }
    } // didn't find it.  we already failed for strict, so just abort.


    if (t < 0) {
      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName);
      parser.textNode += '</' + parser.tagName + '>';
      parser.state = S.TEXT;
      return;
    }

    parser.tagName = tagName;
    var s = parser.tags.length;

    while (s-- > t) {
      var tag = parser.tag = parser.tags.pop();
      parser.tagName = parser.tag.name;
      emitNode(parser, 'onclosetag', parser.tagName);
      var x = {};

      for (var i in tag.ns) {
        x[i] = tag.ns[i];
      }

      var parent = parser.tags[parser.tags.length - 1] || parser;

      if (parser.opt.xmlns && tag.ns !== parent.ns) {
        // remove namespace bindings introduced by tag
        Object.keys(tag.ns).forEach(function (p) {
          var n = tag.ns[p];
          emitNode(parser, 'onclosenamespace', {
            prefix: p,
            uri: n
          });
        });
      }
    }

    if (t === 0) parser.closedRoot = true;
    parser.tagName = parser.attribValue = parser.attribName = '';
    parser.attribList.length = 0;
    parser.state = S.TEXT;
  }

  function parseEntity(parser) {
    var entity = parser.entity;
    var entityLC = entity.toLowerCase();
    var num;
    var numStr = '';

    if (parser.ENTITIES[entity]) {
      return parser.ENTITIES[entity];
    }

    if (parser.ENTITIES[entityLC]) {
      return parser.ENTITIES[entityLC];
    }

    entity = entityLC;

    if (entity.charAt(0) === '#') {
      if (entity.charAt(1) === 'x') {
        entity = entity.slice(2);
        num = parseInt(entity, 16);
        numStr = num.toString(16);
      } else {
        entity = entity.slice(1);
        num = parseInt(entity, 10);
        numStr = num.toString(10);
      }
    }

    entity = entity.replace(/^0+/, '');

    if (isNaN(num) || numStr.toLowerCase() !== entity) {
      strictFail(parser, 'Invalid character entity');
      return '&' + parser.entity + ';';
    }

    return String.fromCodePoint(num);
  }

  function beginWhiteSpace(parser, c) {
    if (c === '<') {
      parser.state = S.OPEN_WAKA;
      parser.startTagPosition = parser.position;
    } else if (!isWhitespace(c)) {
      // have to process this as a text node.
      // weird, but happens.
      strictFail(parser, 'Non-whitespace before first tag.');
      parser.textNode = c;
      parser.state = S.TEXT;
    }
  }

  function charAt(chunk, i) {
    var result = '';

    if (i < chunk.length) {
      result = chunk.charAt(i);
    }

    return result;
  }

  function write(chunk) {
    var parser = this;

    if (this.error) {
      throw this.error;
    }

    if (parser.closed) {
      return error(parser, 'Cannot write after close. Assign an onready handler.');
    }

    if (chunk === null) {
      return _end(parser);
    }

    if (typeof chunk === 'object') {
      chunk = chunk.toString();
    }

    var i = 0;
    var c = '';

    while (true) {
      c = charAt(chunk, i++);
      parser.c = c;

      if (!c) {
        break;
      }

      if (parser.trackPosition) {
        parser.position++;

        if (c === '\n') {
          parser.line++;
          parser.column = 0;
        } else {
          parser.column++;
        }
      }

      switch (parser.state) {
        case S.BEGIN:
          parser.state = S.BEGIN_WHITESPACE;

          if (c === "\uFEFF") {
            continue;
          }

          beginWhiteSpace(parser, c);
          continue;

        case S.BEGIN_WHITESPACE:
          beginWhiteSpace(parser, c);
          continue;

        case S.TEXT:
          if (parser.sawRoot && !parser.closedRoot) {
            var starti = i - 1;

            while (c && c !== '<' && c !== '&') {
              c = charAt(chunk, i++);

              if (c && parser.trackPosition) {
                parser.position++;

                if (c === '\n') {
                  parser.line++;
                  parser.column = 0;
                } else {
                  parser.column++;
                }
              }
            }

            parser.textNode += chunk.substring(starti, i - 1);
          }

          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
            parser.state = S.OPEN_WAKA;
            parser.startTagPosition = parser.position;
          } else {
            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
              strictFail(parser, 'Text data outside of root node.');
            }

            if (c === '&') {
              parser.state = S.TEXT_ENTITY;
            } else {
              parser.textNode += c;
            }
          }

          continue;

        case S.SCRIPT:
          // only non-strict
          if (c === '<') {
            parser.state = S.SCRIPT_ENDING;
          } else {
            parser.script += c;
          }

          continue;

        case S.SCRIPT_ENDING:
          if (c === '/') {
            parser.state = S.CLOSE_TAG;
          } else {
            parser.script += '<' + c;
            parser.state = S.SCRIPT;
          }

          continue;

        case S.OPEN_WAKA:
          // either a /, ?, !, or text is coming next.
          if (c === '!') {
            parser.state = S.SGML_DECL;
            parser.sgmlDecl = '';
          } else if (isWhitespace(c)) {// wait for it...
          } else if (isMatch(nameStart, c)) {
            parser.state = S.OPEN_TAG;
            parser.tagName = c;
          } else if (c === '/') {
            parser.state = S.CLOSE_TAG;
            parser.tagName = '';
          } else if (c === '?') {
            parser.state = S.PROC_INST;
            parser.procInstName = parser.procInstBody = '';
          } else {
            strictFail(parser, 'Unencoded <'); // if there was some whitespace, then add that in.

            if (parser.startTagPosition + 1 < parser.position) {
              var pad = parser.position - parser.startTagPosition;
              c = new Array(pad).join(' ') + c;
            }

            parser.textNode += '<' + c;
            parser.state = S.TEXT;
          }

          continue;

        case S.SGML_DECL:
          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
            emitNode(parser, 'onopencdata');
            parser.state = S.CDATA;
            parser.sgmlDecl = '';
            parser.cdata = '';
          } else if (parser.sgmlDecl + c === '--') {
            parser.state = S.COMMENT;
            parser.comment = '';
            parser.sgmlDecl = '';
          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
            parser.state = S.DOCTYPE;

            if (parser.doctype || parser.sawRoot) {
              strictFail(parser, 'Inappropriately located doctype declaration');
            }

            parser.doctype = '';
            parser.sgmlDecl = '';
          } else if (c === '>') {
            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl);
            parser.sgmlDecl = '';
            parser.state = S.TEXT;
          } else if (isQuote(c)) {
            parser.state = S.SGML_DECL_QUOTED;
            parser.sgmlDecl += c;
          } else {
            parser.sgmlDecl += c;
          }

          continue;

        case S.SGML_DECL_QUOTED:
          if (c === parser.q) {
            parser.state = S.SGML_DECL;
            parser.q = '';
          }

          parser.sgmlDecl += c;
          continue;

        case S.DOCTYPE:
          if (c === '>') {
            parser.state = S.TEXT;
            emitNode(parser, 'ondoctype', parser.doctype);
            parser.doctype = true; // just remember that we saw it.
          } else {
            parser.doctype += c;

            if (c === '[') {
              parser.state = S.DOCTYPE_DTD;
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_QUOTED;
              parser.q = c;
            }
          }

          continue;

        case S.DOCTYPE_QUOTED:
          parser.doctype += c;

          if (c === parser.q) {
            parser.q = '';
            parser.state = S.DOCTYPE;
          }

          continue;

        case S.DOCTYPE_DTD:
          parser.doctype += c;

          if (c === ']') {
            parser.state = S.DOCTYPE;
          } else if (isQuote(c)) {
            parser.state = S.DOCTYPE_DTD_QUOTED;
            parser.q = c;
          }

          continue;

        case S.DOCTYPE_DTD_QUOTED:
          parser.doctype += c;

          if (c === parser.q) {
            parser.state = S.DOCTYPE_DTD;
            parser.q = '';
          }

          continue;

        case S.COMMENT:
          if (c === '-') {
            parser.state = S.COMMENT_ENDING;
          } else {
            parser.comment += c;
          }

          continue;

        case S.COMMENT_ENDING:
          if (c === '-') {
            parser.state = S.COMMENT_ENDED;
            parser.comment = textopts(parser.opt, parser.comment);

            if (parser.comment) {
              emitNode(parser, 'oncomment', parser.comment);
            }

            parser.comment = '';
          } else {
            parser.comment += '-' + c;
            parser.state = S.COMMENT;
          }

          continue;

        case S.COMMENT_ENDED:
          if (c !== '>') {
            strictFail(parser, 'Malformed comment'); // allow <!-- blah -- bloo --> in non-strict mode,
            // which is a comment of " blah -- bloo "

            parser.comment += '--' + c;
            parser.state = S.COMMENT;
          } else {
            parser.state = S.TEXT;
          }

          continue;

        case S.CDATA:
          if (c === ']') {
            parser.state = S.CDATA_ENDING;
          } else {
            parser.cdata += c;
          }

          continue;

        case S.CDATA_ENDING:
          if (c === ']') {
            parser.state = S.CDATA_ENDING_2;
          } else {
            parser.cdata += ']' + c;
            parser.state = S.CDATA;
          }

          continue;

        case S.CDATA_ENDING_2:
          if (c === '>') {
            if (parser.cdata) {
              emitNode(parser, 'oncdata', parser.cdata);
            }

            emitNode(parser, 'onclosecdata');
            parser.cdata = '';
            parser.state = S.TEXT;
          } else if (c === ']') {
            parser.cdata += ']';
          } else {
            parser.cdata += ']]' + c;
            parser.state = S.CDATA;
          }

          continue;

        case S.PROC_INST:
          if (c === '?') {
            parser.state = S.PROC_INST_ENDING;
          } else if (isWhitespace(c)) {
            parser.state = S.PROC_INST_BODY;
          } else {
            parser.procInstName += c;
          }

          continue;

        case S.PROC_INST_BODY:
          if (!parser.procInstBody && isWhitespace(c)) {
            continue;
          } else if (c === '?') {
            parser.state = S.PROC_INST_ENDING;
          } else {
            parser.procInstBody += c;
          }

          continue;

        case S.PROC_INST_ENDING:
          if (c === '>') {
            emitNode(parser, 'onprocessinginstruction', {
              name: parser.procInstName,
              body: parser.procInstBody
            });
            parser.procInstName = parser.procInstBody = '';
            parser.state = S.TEXT;
          } else {
            parser.procInstBody += '?' + c;
            parser.state = S.PROC_INST_BODY;
          }

          continue;

        case S.OPEN_TAG:
          if (isMatch(nameBody, c)) {
            parser.tagName += c;
          } else {
            newTag(parser);

            if (c === '>') {
              openTag(parser);
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH;
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid character in tag name');
              }

              parser.state = S.ATTRIB;
            }
          }

          continue;

        case S.OPEN_TAG_SLASH:
          if (c === '>') {
            openTag(parser, true);
            closeTag(parser);
          } else {
            strictFail(parser, 'Forward-slash in opening tag not followed by >');
            parser.state = S.ATTRIB;
          }

          continue;

        case S.ATTRIB:
          // haven't read the attribute name yet.
          if (isWhitespace(c)) {
            continue;
          } else if (c === '>') {
            openTag(parser);
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH;
          } else if (isMatch(nameStart, c)) {
            parser.attribName = c;
            parser.attribValue = '';
            parser.state = S.ATTRIB_NAME;
          } else {
            strictFail(parser, 'Invalid attribute name');
          }

          continue;

        case S.ATTRIB_NAME:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE;
          } else if (c === '>') {
            strictFail(parser, 'Attribute without value');
            parser.attribValue = parser.attribName;
            attrib(parser);
            openTag(parser);
          } else if (isWhitespace(c)) {
            parser.state = S.ATTRIB_NAME_SAW_WHITE;
          } else if (isMatch(nameBody, c)) {
            parser.attribName += c;
          } else {
            strictFail(parser, 'Invalid attribute name');
          }

          continue;

        case S.ATTRIB_NAME_SAW_WHITE:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE;
          } else if (isWhitespace(c)) {
            continue;
          } else {
            strictFail(parser, 'Attribute without value');
            parser.tag.attributes[parser.attribName] = '';
            parser.attribValue = '';
            emitNode(parser, 'onattribute', {
              name: parser.attribName,
              value: ''
            });
            parser.attribName = '';

            if (c === '>') {
              openTag(parser);
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c;
              parser.state = S.ATTRIB_NAME;
            } else {
              strictFail(parser, 'Invalid attribute name');
              parser.state = S.ATTRIB;
            }
          }

          continue;

        case S.ATTRIB_VALUE:
          if (isWhitespace(c)) {
            continue;
          } else if (isQuote(c)) {
            parser.q = c;
            parser.state = S.ATTRIB_VALUE_QUOTED;
          } else {
            strictFail(parser, 'Unquoted attribute value');
            parser.state = S.ATTRIB_VALUE_UNQUOTED;
            parser.attribValue = c;
          }

          continue;

        case S.ATTRIB_VALUE_QUOTED:
          if (c !== parser.q) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_Q;
            } else {
              parser.attribValue += c;
            }

            continue;
          }

          attrib(parser);
          parser.q = '';
          parser.state = S.ATTRIB_VALUE_CLOSED;
          continue;

        case S.ATTRIB_VALUE_CLOSED:
          if (isWhitespace(c)) {
            parser.state = S.ATTRIB;
          } else if (c === '>') {
            openTag(parser);
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH;
          } else if (isMatch(nameStart, c)) {
            strictFail(parser, 'No whitespace between attributes');
            parser.attribName = c;
            parser.attribValue = '';
            parser.state = S.ATTRIB_NAME;
          } else {
            strictFail(parser, 'Invalid attribute name');
          }

          continue;

        case S.ATTRIB_VALUE_UNQUOTED:
          if (!isAttribEnd(c)) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_U;
            } else {
              parser.attribValue += c;
            }

            continue;
          }

          attrib(parser);

          if (c === '>') {
            openTag(parser);
          } else {
            parser.state = S.ATTRIB;
          }

          continue;

        case S.CLOSE_TAG:
          if (!parser.tagName) {
            if (isWhitespace(c)) {
              continue;
            } else if (notMatch(nameStart, c)) {
              if (parser.script) {
                parser.script += '</' + c;
                parser.state = S.SCRIPT;
              } else {
                strictFail(parser, 'Invalid tagname in closing tag.');
              }
            } else {
              parser.tagName = c;
            }
          } else if (c === '>') {
            closeTag(parser);
          } else if (isMatch(nameBody, c)) {
            parser.tagName += c;
          } else if (parser.script) {
            parser.script += '</' + parser.tagName;
            parser.tagName = '';
            parser.state = S.SCRIPT;
          } else {
            if (!isWhitespace(c)) {
              strictFail(parser, 'Invalid tagname in closing tag');
            }

            parser.state = S.CLOSE_TAG_SAW_WHITE;
          }

          continue;

        case S.CLOSE_TAG_SAW_WHITE:
          if (isWhitespace(c)) {
            continue;
          }

          if (c === '>') {
            closeTag(parser);
          } else {
            strictFail(parser, 'Invalid characters in closing tag');
          }

          continue;

        case S.TEXT_ENTITY:
        case S.ATTRIB_VALUE_ENTITY_Q:
        case S.ATTRIB_VALUE_ENTITY_U:
          var returnState;
          var buffer;

          switch (parser.state) {
            case S.TEXT_ENTITY:
              returnState = S.TEXT;
              buffer = 'textNode';
              break;

            case S.ATTRIB_VALUE_ENTITY_Q:
              returnState = S.ATTRIB_VALUE_QUOTED;
              buffer = 'attribValue';
              break;

            case S.ATTRIB_VALUE_ENTITY_U:
              returnState = S.ATTRIB_VALUE_UNQUOTED;
              buffer = 'attribValue';
              break;
          }

          if (c === ';') {
            parser[buffer] += parseEntity(parser);
            parser.entity = '';
            parser.state = returnState;
          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
            parser.entity += c;
          } else {
            strictFail(parser, 'Invalid character in entity name');
            parser[buffer] += '&' + parser.entity + c;
            parser.entity = '';
            parser.state = returnState;
          }

          continue;

        default:
          throw new Error(parser, 'Unknown state: ' + parser.state);
      }
    } // while


    if (parser.position >= parser.bufferCheckPosition) {
      checkBufferLength(parser);
    }

    return parser;
  }
  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */

  /* istanbul ignore next */


  if (!String.fromCodePoint) {
    (function () {
      var stringFromCharCode = String.fromCharCode;
      var floor = Math.floor;

      var fromCodePoint = function fromCodePoint() {
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var length = arguments.length;

        if (!length) {
          return '';
        }

        var result = '';

        while (++index < length) {
          var codePoint = Number(arguments[index]);

          if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
          codePoint < 0 || // not a valid Unicode code point
          codePoint > 0x10FFFF || // not a valid Unicode code point
          floor(codePoint) !== codePoint // not an integer
          ) {
              throw RangeError('Invalid code point: ' + codePoint);
            }

          if (codePoint <= 0xFFFF) {
            // BMP code point
            codeUnits.push(codePoint);
          } else {
            // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000;
            highSurrogate = (codePoint >> 10) + 0xD800;
            lowSurrogate = codePoint % 0x400 + 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
          }

          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }

        return result;
      };
      /* istanbul ignore next */


      if (Object.defineProperty) {
        Object.defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        });
      } else {
        String.fromCodePoint = fromCodePoint;
      }
    })();
  }
})( false ? undefined : exports);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4).Buffer))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;

  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
module.exports = Stream;

var EE = __webpack_require__(8).EventEmitter;

var inherits = __webpack_require__(3);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(9);
Stream.Writable = __webpack_require__(48);
Stream.Duplex = __webpack_require__(49);
Stream.Transform = __webpack_require__(50);
Stream.PassThrough = __webpack_require__(51); // Backwards-compat with node 0.4.x

Stream.Stream = Stream; // old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function (dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain); // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.

  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;

  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;
    dest.end();
  }

  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;
    if (typeof dest.destroy === 'function') dest.destroy();
  } // don't leave dangling pipes when there are errors.


  function onerror(er) {
    cleanup();

    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror); // remove all the event listeners that were added.

  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);
    source.removeListener('end', onend);
    source.removeListener('close', onclose);
    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);
    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);
    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);
  dest.on('close', cleanup);
  dest.emit('pipe', source); // Allow for unix-like usage: A.pipe(B).pipe(C)

  return dest;
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Buffer = __webpack_require__(10).Buffer;

var util = __webpack_require__(42);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = {
      data: v,
      next: null
    };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = {
      data: v,
      next: this.head
    };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;

    while (p = p.next) {
      ret += s + p.data;
    }

    return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;

    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }

    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({
      length: this.length
    });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


__webpack_require__(44); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function registerImmediate(handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function onGlobalMessage(event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function registerImmediate(handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function registerImmediate(handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function registerImmediate(handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function registerImmediate(handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(6)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module exports.
 */
module.exports = deprecate;
/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate(fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
}
/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */


function config(name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }

  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(4);

var Buffer = buffer.Buffer; // alternative to using Object.keys for old browsers

function copyProps(src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}

if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer(arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length);
}

SafeBuffer.prototype = Object.create(Buffer.prototype); // Copy static methods from Buffer

copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number');
  }

  return Buffer(arg, encodingOrOffset, length);
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  var buf = Buffer(size);

  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }

  return buf;
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return Buffer(size);
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return buffer.SlowBuffer(size);
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.


module.exports = PassThrough;

var Transform = __webpack_require__(21);
/*<replacement>*/


var util = __webpack_require__(5);

util.inherits = __webpack_require__(3);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9).Transform;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9).PassThrough;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__(13);

var xml2js = __webpack_require__(16);

function validateOptions(userOptions) {
  var options = helper.copyOptions(userOptions);
  helper.ensureSpacesExists(options);
  return options;
}

module.exports = function (xml, userOptions) {
  var options, js, json, parentKey;
  options = validateOptions(userOptions);
  js = xml2js(xml, options);
  parentKey = 'compact' in options && options.compact ? '_parent' : 'parent'; // parentKey = ptions.compact ? '_parent' : 'parent'; // consider this

  if ('addParent' in options && options.addParent) {
    json = JSON.stringify(js, function (k, v) {
      return k === parentKey ? '_' : v;
    }, options.spaces);
  } else {
    json = JSON.stringify(js, null, options.spaces);
  }

  return json.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var js2xml = __webpack_require__(22);

module.exports = function (json, options) {
  if (json instanceof Buffer) {
    json = json.toString();
  }

  var js = null;

  if (typeof json === 'string') {
    try {
      js = JSON.parse(json);
    } catch (e) {
      throw new Error('The JSON structure is invalid');
    }
  } else {
    js = json;
  }

  return js2xml(js, options);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4).Buffer))

/***/ }),
/* 54 */
/***/ (function(module, exports) {

/*
	Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
	http://www.phpied.com/rgb-color-parser-in-javascript/
*/
module.exports = function (color_string) {
  this.ok = false;
  this.alpha = 1.0; // strip any leading #

  if (color_string.charAt(0) == '#') {
    // remove # if any
    color_string = color_string.substr(1, 6);
  }

  color_string = color_string.replace(/ /g, '');
  color_string = color_string.toLowerCase(); // before getting into regexps, try simple matches
  // and overwrite the input

  var simple_colors = {
    aliceblue: 'f0f8ff',
    antiquewhite: 'faebd7',
    aqua: '00ffff',
    aquamarine: '7fffd4',
    azure: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '000000',
    blanchedalmond: 'ffebcd',
    blue: '0000ff',
    blueviolet: '8a2be2',
    brown: 'a52a2a',
    burlywood: 'deb887',
    cadetblue: '5f9ea0',
    chartreuse: '7fff00',
    chocolate: 'd2691e',
    coral: 'ff7f50',
    cornflowerblue: '6495ed',
    cornsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: '00ffff',
    darkblue: '00008b',
    darkcyan: '008b8b',
    darkgoldenrod: 'b8860b',
    darkgray: 'a9a9a9',
    darkgreen: '006400',
    darkkhaki: 'bdb76b',
    darkmagenta: '8b008b',
    darkolivegreen: '556b2f',
    darkorange: 'ff8c00',
    darkorchid: '9932cc',
    darkred: '8b0000',
    darksalmon: 'e9967a',
    darkseagreen: '8fbc8f',
    darkslateblue: '483d8b',
    darkslategray: '2f4f4f',
    darkturquoise: '00ced1',
    darkviolet: '9400d3',
    deeppink: 'ff1493',
    deepskyblue: '00bfff',
    dimgray: '696969',
    dodgerblue: '1e90ff',
    feldspar: 'd19275',
    firebrick: 'b22222',
    floralwhite: 'fffaf0',
    forestgreen: '228b22',
    fuchsia: 'ff00ff',
    gainsboro: 'dcdcdc',
    ghostwhite: 'f8f8ff',
    gold: 'ffd700',
    goldenrod: 'daa520',
    gray: '808080',
    green: '008000',
    greenyellow: 'adff2f',
    honeydew: 'f0fff0',
    hotpink: 'ff69b4',
    indianred: 'cd5c5c',
    indigo: '4b0082',
    ivory: 'fffff0',
    khaki: 'f0e68c',
    lavender: 'e6e6fa',
    lavenderblush: 'fff0f5',
    lawngreen: '7cfc00',
    lemonchiffon: 'fffacd',
    lightblue: 'add8e6',
    lightcoral: 'f08080',
    lightcyan: 'e0ffff',
    lightgoldenrodyellow: 'fafad2',
    lightgrey: 'd3d3d3',
    lightgreen: '90ee90',
    lightpink: 'ffb6c1',
    lightsalmon: 'ffa07a',
    lightseagreen: '20b2aa',
    lightskyblue: '87cefa',
    lightslateblue: '8470ff',
    lightslategray: '778899',
    lightsteelblue: 'b0c4de',
    lightyellow: 'ffffe0',
    lime: '00ff00',
    limegreen: '32cd32',
    linen: 'faf0e6',
    magenta: 'ff00ff',
    maroon: '800000',
    mediumaquamarine: '66cdaa',
    mediumblue: '0000cd',
    mediumorchid: 'ba55d3',
    mediumpurple: '9370d8',
    mediumseagreen: '3cb371',
    mediumslateblue: '7b68ee',
    mediumspringgreen: '00fa9a',
    mediumturquoise: '48d1cc',
    mediumvioletred: 'c71585',
    midnightblue: '191970',
    mintcream: 'f5fffa',
    mistyrose: 'ffe4e1',
    moccasin: 'ffe4b5',
    navajowhite: 'ffdead',
    navy: '000080',
    oldlace: 'fdf5e6',
    olive: '808000',
    olivedrab: '6b8e23',
    orange: 'ffa500',
    orangered: 'ff4500',
    orchid: 'da70d6',
    palegoldenrod: 'eee8aa',
    palegreen: '98fb98',
    paleturquoise: 'afeeee',
    palevioletred: 'd87093',
    papayawhip: 'ffefd5',
    peachpuff: 'ffdab9',
    peru: 'cd853f',
    pink: 'ffc0cb',
    plum: 'dda0dd',
    powderblue: 'b0e0e6',
    purple: '800080',
    rebeccapurple: '663399',
    red: 'ff0000',
    rosybrown: 'bc8f8f',
    royalblue: '4169e1',
    saddlebrown: '8b4513',
    salmon: 'fa8072',
    sandybrown: 'f4a460',
    seagreen: '2e8b57',
    seashell: 'fff5ee',
    sienna: 'a0522d',
    silver: 'c0c0c0',
    skyblue: '87ceeb',
    slateblue: '6a5acd',
    slategray: '708090',
    snow: 'fffafa',
    springgreen: '00ff7f',
    steelblue: '4682b4',
    tan: 'd2b48c',
    teal: '008080',
    thistle: 'd8bfd8',
    tomato: 'ff6347',
    turquoise: '40e0d0',
    violet: 'ee82ee',
    violetred: 'd02090',
    wheat: 'f5deb3',
    white: 'ffffff',
    whitesmoke: 'f5f5f5',
    yellow: 'ffff00',
    yellowgreen: '9acd32'
  };
  color_string = simple_colors[color_string] || color_string; // emd of simple type-in colors
  // array of color definition objects

  var color_defs = [{
    re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
    example: ['rgba(123, 234, 45, 0.8)', 'rgba(255,234,245,1.0)'],
    process: function process(bits) {
      return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), parseFloat(bits[4])];
    }
  }, {
    re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
    process: function process(bits) {
      return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
    }
  }, {
    re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    example: ['#00ff00', '336699'],
    process: function process(bits) {
      return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)];
    }
  }, {
    re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    example: ['#fb0', 'f0f'],
    process: function process(bits) {
      return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)];
    }
  }]; // search through the definitions to find a match

  for (var i = 0; i < color_defs.length; i++) {
    var re = color_defs[i].re;
    var processor = color_defs[i].process;
    var bits = re.exec(color_string);

    if (bits) {
      var channels = processor(bits);
      this.r = channels[0];
      this.g = channels[1];
      this.b = channels[2];

      if (channels.length > 3) {
        this.alpha = channels[3];
      }

      this.ok = true;
    }
  } // validate/cleanup values


  this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
  this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
  this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
  this.alpha = this.alpha < 0 ? 0 : this.alpha > 1.0 || isNaN(this.alpha) ? 1.0 : this.alpha; // some getters

  this.toRGB = function () {
    return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
  };

  this.toRGBA = function () {
    return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
  };

  this.toHex = function () {
    var r = this.r.toString(16);
    var g = this.g.toString(16);
    var b = this.b.toString(16);
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    return '#' + r + g + b;
  }; // help


  this.getHelpXML = function () {
    var examples = new Array(); // add regexps

    for (var i = 0; i < color_defs.length; i++) {
      var example = color_defs[i].example;

      for (var j = 0; j < example.length; j++) {
        examples[examples.length] = example[j];
      }
    } // add type-in colors


    for (var sc in simple_colors) {
      examples[examples.length] = sc;
    }

    var xml = document.createElement('ul');
    xml.setAttribute('id', 'rgbcolor-examples');

    for (var i = 0; i < examples.length; i++) {
      try {
        var list_item = document.createElement('li');
        var list_color = new RGBColor(examples[i]);
        var example_div = document.createElement('div');
        example_div.style.cssText = 'margin: 3px; ' + 'border: 1px solid black; ' + 'background:' + list_color.toHex() + '; ' + 'color:' + list_color.toHex();
        example_div.appendChild(document.createTextNode('test'));
        var list_item_value = document.createTextNode(' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex());
        list_item.appendChild(example_div);
        list_item.appendChild(list_item_value);
        xml.appendChild(list_item);
      } catch (e) {}
    }

    return xml;
  };
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

/*
    StackBlur - a fast almost Gaussian Blur For Canvas

    Version:     0.5
    Author:        Mario Klingemann
    Contact:     mario@quasimondo.com
    Website:    http://www.quasimondo.com/StackBlurForCanvas
    Twitter:    @quasimondo

    In case you find this class useful - especially in commercial projects -
    I am not totally unhappy for a small donation to my PayPal account
    mario@quasimondo.de

    Or support me on flattr:
    https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

    Copyright (c) 2010 Mario Klingemann

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
    */
var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

function processImage(img, canvas, radius, blurAlphaChannel) {
  if (typeof img == 'string') {
    var img = document.getElementById(img);
  } else if (typeof HTMLImageElement !== 'undefined' && !img instanceof HTMLImageElement) {
    return;
  }

  var w = img.naturalWidth;
  var h = img.naturalHeight;

  if (typeof canvas == 'string') {
    var canvas = document.getElementById(canvas);
  } else if (typeof HTMLCanvasElement !== 'undefined' && !canvas instanceof HTMLCanvasElement) {
    return;
  }

  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.width = w;
  canvas.height = h;
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, w, h);
  context.drawImage(img, 0, 0);
  if (isNaN(radius) || radius < 1) return;
  if (blurAlphaChannel) processCanvasRGBA(canvas, 0, 0, w, h, radius);else processCanvasRGB(canvas, 0, 0, w, h, radius);
}

function getImageDataFromCanvas(canvas, top_x, top_y, width, height) {
  if (typeof canvas == 'string') var canvas = document.getElementById(canvas);else if (typeof HTMLCanvasElement !== 'undefined' && !canvas instanceof HTMLCanvasElement) return;
  var context = canvas.getContext('2d');
  var imageData;

  try {
    try {
      imageData = context.getImageData(top_x, top_y, width, height);
    } catch (e) {
      throw new Error("unable to access local image data: " + e);
      return;
    }
  } catch (e) {
    throw new Error("unable to access image data: " + e);
  }

  return imageData;
}

function processCanvasRGBA(canvas, top_x, top_y, width, height, radius) {
  if (isNaN(radius) || radius < 1) return;
  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);
  imageData = processImageDataRGBA(imageData, top_x, top_y, width, height, radius);
  canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGBA(imageData, top_x, top_y, width, height, radius) {
  var pixels = imageData.data;
  var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
  var div = radius + radius + 1;
  var w4 = width << 2;
  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;

  for (i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();
    if (i == radiusPlus1) var stackEnd = stack;
  }

  stack.next = stackStart;
  var stackIn = null;
  var stackOut = null;
  yw = yi = 0;
  var mul_sum = mul_table[radius];
  var shg_sum = shg_table[radius];

  for (y = 0; y < height; y++) {
    r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
    a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;
    a_sum += sumFactor * pa;
    stack = stackStart;

    for (i = 0; i < radiusPlus1; i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }

    for (i = 1; i < radiusPlus1; i++) {
      p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
      r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
      g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
      b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
      a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;
      a_in_sum += pa;
      stack = stack.next;
    }

    stackIn = stackStart;
    stackOut = stackEnd;

    for (x = 0; x < width; x++) {
      pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;

      if (pa != 0) {
        pa = 255 / pa;
        pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
        pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
        pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
      } else {
        pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
      }

      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;
      a_sum -= a_out_sum;
      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;
      a_out_sum -= stackIn.a;
      p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
      r_in_sum += stackIn.r = pixels[p];
      g_in_sum += stackIn.g = pixels[p + 1];
      b_in_sum += stackIn.b = pixels[p + 2];
      a_in_sum += stackIn.a = pixels[p + 3];
      r_sum += r_in_sum;
      g_sum += g_in_sum;
      b_sum += b_in_sum;
      a_sum += a_in_sum;
      stackIn = stackIn.next;
      r_out_sum += pr = stackOut.r;
      g_out_sum += pg = stackOut.g;
      b_out_sum += pb = stackOut.b;
      a_out_sum += pa = stackOut.a;
      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;
      a_in_sum -= pa;
      stackOut = stackOut.next;
      yi += 4;
    }

    yw += width;
  }

  for (x = 0; x < width; x++) {
    g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
    yi = x << 2;
    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
    a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;
    a_sum += sumFactor * pa;
    stack = stackStart;

    for (i = 0; i < radiusPlus1; i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }

    yp = width;

    for (i = 1; i <= radius; i++) {
      yi = yp + x << 2;
      r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
      g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
      b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
      a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;
      a_in_sum += pa;
      stack = stack.next;

      if (i < heightMinus1) {
        yp += width;
      }
    }

    yi = x;
    stackIn = stackStart;
    stackOut = stackEnd;

    for (y = 0; y < height; y++) {
      p = yi << 2;
      pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;

      if (pa > 0) {
        pa = 255 / pa;
        pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
        pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
        pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
      } else {
        pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
      }

      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;
      a_sum -= a_out_sum;
      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;
      a_out_sum -= stackIn.a;
      p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
      r_sum += r_in_sum += stackIn.r = pixels[p];
      g_sum += g_in_sum += stackIn.g = pixels[p + 1];
      b_sum += b_in_sum += stackIn.b = pixels[p + 2];
      a_sum += a_in_sum += stackIn.a = pixels[p + 3];
      stackIn = stackIn.next;
      r_out_sum += pr = stackOut.r;
      g_out_sum += pg = stackOut.g;
      b_out_sum += pb = stackOut.b;
      a_out_sum += pa = stackOut.a;
      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;
      a_in_sum -= pa;
      stackOut = stackOut.next;
      yi += width;
    }
  }

  return imageData;
}

function processCanvasRGB(canvas, top_x, top_y, width, height, radius) {
  if (isNaN(radius) || radius < 1) return;
  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);
  imageData = processImageDataRGB(imageData, top_x, top_y, width, height, radius);
  canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGB(imageData, top_x, top_y, width, height, radius) {
  var pixels = imageData.data;
  var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, r_out_sum, g_out_sum, b_out_sum, r_in_sum, g_in_sum, b_in_sum, pr, pg, pb, rbs;
  var div = radius + radius + 1;
  var w4 = width << 2;
  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;

  for (i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();
    if (i == radiusPlus1) var stackEnd = stack;
  }

  stack.next = stackStart;
  var stackIn = null;
  var stackOut = null;
  yw = yi = 0;
  var mul_sum = mul_table[radius];
  var shg_sum = shg_table[radius];

  for (y = 0; y < height; y++) {
    r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;
    stack = stackStart;

    for (i = 0; i < radiusPlus1; i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }

    for (i = 1; i < radiusPlus1; i++) {
      p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
      r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
      g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
      b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;
      stack = stack.next;
    }

    stackIn = stackStart;
    stackOut = stackEnd;

    for (x = 0; x < width; x++) {
      pixels[yi] = r_sum * mul_sum >> shg_sum;
      pixels[yi + 1] = g_sum * mul_sum >> shg_sum;
      pixels[yi + 2] = b_sum * mul_sum >> shg_sum;
      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;
      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;
      p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
      r_in_sum += stackIn.r = pixels[p];
      g_in_sum += stackIn.g = pixels[p + 1];
      b_in_sum += stackIn.b = pixels[p + 2];
      r_sum += r_in_sum;
      g_sum += g_in_sum;
      b_sum += b_in_sum;
      stackIn = stackIn.next;
      r_out_sum += pr = stackOut.r;
      g_out_sum += pg = stackOut.g;
      b_out_sum += pb = stackOut.b;
      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;
      stackOut = stackOut.next;
      yi += 4;
    }

    yw += width;
  }

  for (x = 0; x < width; x++) {
    g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
    yi = x << 2;
    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;
    stack = stackStart;

    for (i = 0; i < radiusPlus1; i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }

    yp = width;

    for (i = 1; i <= radius; i++) {
      yi = yp + x << 2;
      r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
      g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
      b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;
      stack = stack.next;

      if (i < heightMinus1) {
        yp += width;
      }
    }

    yi = x;
    stackIn = stackStart;
    stackOut = stackEnd;

    for (y = 0; y < height; y++) {
      p = yi << 2;
      pixels[p] = r_sum * mul_sum >> shg_sum;
      pixels[p + 1] = g_sum * mul_sum >> shg_sum;
      pixels[p + 2] = b_sum * mul_sum >> shg_sum;
      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;
      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;
      p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
      r_sum += r_in_sum += stackIn.r = pixels[p];
      g_sum += g_in_sum += stackIn.g = pixels[p + 1];
      b_sum += b_in_sum += stackIn.b = pixels[p + 2];
      stackIn = stackIn.next;
      r_out_sum += pr = stackOut.r;
      g_out_sum += pg = stackOut.g;
      b_out_sum += pb = stackOut.b;
      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;
      stackOut = stackOut.next;
      yi += width;
    }
  }

  return imageData;
}

function BlurStack() {
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
  this.next = null;
}

module.exports = {
  image: processImage,
  canvasRGBA: processCanvasRGBA,
  canvasRGB: processCanvasRGB,
  imageDataRGBA: processImageDataRGBA,
  imageDataRGB: processImageDataRGB
};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var components_namespaceObject = {};
__webpack_require__.r(components_namespaceObject);
__webpack_require__.d(components_namespaceObject, "WebMap", function() { return web_map; });

// EXTERNAL MODULE: ./src/mapboxgl/style.scss
var mapboxgl_style = __webpack_require__(32);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: external {"root":"React","commonjs":"React","commonjs2":"React","amd":"React"}
var external_root_React_commonjs_React_commonjs2_React_amd_React_ = __webpack_require__(15);

// EXTERNAL MODULE: external {"root":"mapboxgl","commonjs":"./libs/mapboxgl/mapbox-gl-enhance.js","commonjs2":"./libs/mapboxgl/mapbox-gl-enhance.js","amd":"./libs/mapboxgl/mapbox-gl-enhance.js"}
var mapbox_gl_enhance_js_ = __webpack_require__(0);
var mapbox_gl_enhance_js_default = /*#__PURE__*/__webpack_require__.n(mapbox_gl_enhance_js_);

// CONCATENATED MODULE: ./src/mapboxgl/web-map/SourceModel.js
var SourceModel_SourceModel=/*#__PURE__*/function(){function SourceModel(options){_classCallCheck(this,SourceModel);this.id=options.source;this.sourceLayerList={};this.layers=[];this.type=null;}_createClass(SourceModel,[{key:"addLayer",value:function addLayer(layer,sourceLayer){if(sourceLayer){if(!this.sourceLayerList[sourceLayer]){this.sourceLayerList[sourceLayer]=[];}this.sourceLayerList[sourceLayer].push(layer);}else{this.sourceLayerList=undefined;}this.layers.push(layer);this.type=layer.type;if([layer.visibility,this.visibility].includes('visible')){this.visibility='visible';}else{this.visibility='none';}}}]);return SourceModel;}();/* harmony default export */ var web_map_SourceModel = (SourceModel_SourceModel);
// CONCATENATED MODULE: ./src/mapboxgl/web-map/LayerModel.js
/**
 * @class LayerModel
 * @description 图层数据模型。
 * @param {Object} options - 图层参数。
 * @param {String} [options.id] - 图层 ID。
 * @param {Number} [options.maxzoom] - 最大缩放级别。
 * @param {Number} [options.minzoom] - 最小缩放级别。
 * @param {GeoJSONObject} [options.source] - 数据源。
 * @param {String} [options.type] - 图层类型。
 * @param {String} [options.visibility] - 图层是否可见。
 * @category Model
 */var LayerModel_LayerModel=function LayerModel(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,LayerModel);this.id=options.id;this.maxzoom=options.maxzoom;this.minzoom=options.minzoom;this.source=options.source;this.type=options.type;this.visibility=options.visibility||'visible';};/* harmony default export */ var web_map_LayerModel = (LayerModel_LayerModel);
// CONCATENATED MODULE: ./src/mapboxgl/web-map/SourceListModel.js
var SourceListModel_SourceListModel=/*#__PURE__*/function(){function SourceListModel(options){_classCallCheck(this,SourceListModel);this.map=options.map;this.style=this.map.getStyle();this.layers=this.map.getStyle().layers;this.overlayLayers=this.map.overlayLayersManager;this.detailLayers=null;this.sourceList={};this.sourceNames=[];this._initLayers();this._initSource();this.excludeSourceNames=['tdt-search-','tdt-route-','smmeasure','mapbox-gl-draw'];}_createClass(SourceListModel,[{key:"getSourceList",value:function getSourceList(){var sourceList={};for(var key in this.sourceList){if(key&&this.excludeSource(key)){sourceList[key]=this.sourceList[key];}}return sourceList;}},{key:"getSourceNames",value:function getSourceNames(){var _this=this;var names=[];this.sourceNames.forEach(function(element){if(element&&_this.excludeSource(element)){names.push(element);}});return names;}},{key:"excludeSource",value:function excludeSource(key){for(var i=0;i<this.excludeSourceNames.length;i++){if(key.indexOf(this.excludeSourceNames[i])>=0){return false;}}return true;}},{key:"getLegendStyle",value:function getLegendStyle(sourceName){if(sourceName){return this.sourceList[sourceName]?this.sourceList[sourceName].style:'';}var sourceList=Object.values(this.sourceList)||[];var styles=sourceList.filter(function(item){return!!item.style;});return styles;}},{key:"getLayers",value:function getLayers(){return this.detailLayers;}},{key:"getLayersBySourceLayer",value:function getLayersBySourceLayer(sourceName,sourceLayer){return this.sourceList[sourceName]['sourceLayerList'][sourceLayer];}},{key:"getSourceLayersBySource",value:function getSourceLayersBySource(sourceName){return this.sourceList[sourceName]['sourceLayerList'];}},{key:"addSourceStyle",value:function addSourceStyle(sourceName,sourceStyle){if(this.sourceList[sourceName]){this.sourceList[sourceName]['style']=sourceStyle;}}},{key:"_initLayers",value:function _initLayers(){var _this2=this;this.layers&&(this.detailLayers=this.layers.map(function(layer){return _this2.map.getLayer(layer.id);}));var overLayerList=Object.values(this.overlayLayers);overLayerList.forEach(function(overlayer){if(overlayer.id){_this2.detailLayers.push({id:overlayer.id,visibility:overlayer.visibility?'visible':'none',source:overlayer.id});}});}},{key:"_initSource",value:function _initSource(){var _this3=this;this.detailLayers&&this.detailLayers.forEach(function(layer){if(!_this3.sourceList[layer['source']]){_this3.sourceList[layer['source']]=new web_map_SourceModel({source:layer['source']});_this3.sourceNames.push(layer['source']);}_this3.sourceList[layer['source']].addLayer(new web_map_LayerModel(layer),layer['sourceLayer']);});}}]);return SourceListModel;}();/* harmony default export */ var web_map_SourceListModel = (SourceListModel_SourceListModel);
// CONCATENATED MODULE: ./src/mapboxgl/_utils/geometry-util.js
var handleMultyPolygon=function handleMultyPolygon(features){features.forEach(function(feature){if(feature.geometry.type!=='Polygon'){return;}var coords=feature.geometry.coordinates;if(coords.length>1){var coordinates=[];coords.forEach(function(coord){coordinates.push([coord]);});feature.geometry.coordinates=coordinates;feature.geometry.type='MultiPolygon';}});return features;};
// CONCATENATED MODULE: ./src/common/_utils/util.js
// 获取当前时间返回置顶格式
// import colorcolor from 'colorcolor';
// export function getDateTime(timeType) {
//   return geti18n().d(new Date(), timeType.replace(/\+/g, '_'), getLanguage());
// }
// hex -> rgba
function hexToRgba(hex,opacity){return'rgba('+parseInt('0x'+hex.slice(1,3))+','+parseInt('0x'+hex.slice(3,5))+','+parseInt('0x'+hex.slice(5,7))+','+opacity+')';}// export function isTransparent(color) {
//   const rgba = colorcolor(color, 'rgba');
//   return +rgba.match(/(\d(\.\d+)?)+/g)[3] === 0;
// }
// 保留指定位数的小数
function reservedDecimal(val,precise){return Number(val).toFixed(precise);}// 清除数字（字符串型的）的逗号
function clearNumberComma(num){if(num.replace){num=num.replace(/,/g,'');}return num;}/**
 * 判断是否地理X坐标
 * @param data
 */function isXField(data){var lowerdata=data.toLowerCase();return lowerdata==='x'||lowerdata==='smx'||lowerdata==='jd'||lowerdata==='经度'||lowerdata==='东经'||lowerdata==='longitude'||lowerdata==='lot'||lowerdata==='lon'||lowerdata==='lng'||lowerdata==='x坐标';}/**
 * 判断是否地理Y坐标
 * @param data
 */function isYField(data){var lowerdata=data.toLowerCase();return lowerdata==='y'||lowerdata==='smy'||lowerdata==='wd'||lowerdata==='纬度'||lowerdata==='北纬'||lowerdata==='latitude'||lowerdata==='lat'||lowerdata==='y坐标';}// export function getColorWithOpacity(color, opacity) {
//   if (color.indexOf('rgba') > -1) {
//     return color.substring(0, color.lastIndexOf(',') + 1) + opacity + ')';
//   }
//   let newColor = colorcolor(color, 'rgb');
//   return 'rgba' + newColor.substring(3, newColor.length - 1) + `,${opacity})`;
// }
// EXTERNAL MODULE: external {"root":"SuperMap","commonjs":"./libs/iclient-mapboxgl/iclient9-mapboxgl.min.js","commonjs2":"./libs/iclient-mapboxgl/iclient9-mapboxgl.min.js","amd":"./libs/iclient-mapboxgl/iclient9-mapboxgl.min.js"}
var iclient9_mapboxgl_min_js_ = __webpack_require__(33);

// EXTERNAL MODULE: ./public/libs/geostats/geostats.js
var geostats = __webpack_require__(34);

// EXTERNAL MODULE: ./public/libs/json-sql/jsonsql.js
var jsonsql = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/xml-js/lib/index.js
var lib = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/canvg/dist/browser/canvg.min.js
var canvg_min = __webpack_require__(24);
var canvg_min_default = /*#__PURE__*/__webpack_require__.n(canvg_min);

// EXTERNAL MODULE: external "echarts"
var external_echarts_ = __webpack_require__(25);
var external_echarts_default = /*#__PURE__*/__webpack_require__.n(external_echarts_);

// EXTERNAL MODULE: external {"root":"EchartsLayer","commonjs":"./libs/echarts-layer/EchartsLayer.js","commonjs2":"./libs/echarts-layer/EchartsLayer.js","amd":"./libs/echarts-layer/EchartsLayer.js"}
var EchartsLayer_js_ = __webpack_require__(26);
var EchartsLayer_js_default = /*#__PURE__*/__webpack_require__.n(EchartsLayer_js_);

// EXTERNAL MODULE: ./src/mapboxgl/web-map/config/ProvinceCenter.json
var ProvinceCenter = __webpack_require__(27);

// EXTERNAL MODULE: ./src/mapboxgl/web-map/config/MunicipalCenter.json
var MunicipalCenter = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/lodash.uniqueid/index.js
var lodash_uniqueid = __webpack_require__(29);
var lodash_uniqueid_default = /*#__PURE__*/__webpack_require__.n(lodash_uniqueid);

// EXTERNAL MODULE: ./node_modules/lodash.clonedeep/index.js
var lodash_clonedeep = __webpack_require__(30);
var lodash_clonedeep_default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep);

// CONCATENATED MODULE: ./src/mapboxgl/web-map/WebMapViewModel.ts
/* eslint-disable */ /* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html. */// eslint-disable-line import/extensions
// eslint-disable-line import/extensions
var MB_SCALEDENOMINATOR_3857=['559082264.0287178','279541132.0143589','139770566.0071794','69885283.00358972','34942641.50179486','17471320.75089743','8735660.375448715','4367830.1877224357','2183915.093862179','1091957.546931089','545978.7734655447','272989.7734655447','272989.3867327723','136494.6933663862','68247.34668319309','34123.67334159654','17061.83667079827','8530.918335399136','4265.459167699568','2132.729583849784'];var MB_SCALEDENOMINATOR_4326=['5.590822640287176E8','2.795411320143588E8','1.397705660071794E8','6.98852830035897E7','3.494264150179485E7','1.7471320750897426E7','8735660.375448713','4367830.187724357','2183915.0938621783','1091957.5469310891','545978.7734655446','272989.3867327723','136494.69336638614','68247.34668319307','34123.673341596535','17061.836670798268','8530.918335399134'];var DEFAULT_WELLKNOWNSCALESET=['GoogleCRS84Quad','GoogleMapsCompatible','GlobalCRS84Scale'];// 迁徙图最大支持要素数量
var MAX_MIGRATION_ANIMATION_COUNT=1000;/**
  * @class WebMapViewModel
  * @category ViewModel
  * @classdesc 对接 iPortal/Online 地图类。目前支持地图坐标系包括：'EPSG:3857'，'EPSG:4326'，'EPSG:4490'，'EPSG:4214'，'EPSG:4610'。
  * @param {number} id - iPortal|Online 地图 ID。
  * @param {Object} options - 参数。
  * @param {string} [options.target='map'] - 地图容器 ID。
  * @param {string} [options.serverUrl="http://www.supermapol.com"] - SuperMap iPortal/Online 服务器地址。当设置 `id` 时有效。
  * @param {string} [options.accessToken] - 用于访问 SuperMap iPortal 、SuperMap Online 中受保护的服务。当设置 `id` 时有效。
  * @param {string} [options.accessKey] - SuperMap iServer 提供的一种基于 Token（令牌）的用户身份验证机制。当设置 `id` 时有效。
  * @param {String} [options.tiandituKey] - 用于访问天地图的服务。当设置 `id` 时有效。
  * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。当设置 `id` 时有效。
  * @param {boolean} [options.excludePortalProxyUrl] - server 传递过来的 URL 是否带有代理。当设置 `id` 时有效。
  * @fires WebMapViewModel#mapinitialized
  * @fires WebMapViewModel#getmapinfofailed
  * @fires WebMapViewModel#getwmtsinfofailed
  * @fires WebMapViewModel#getlayerdatasourcefailed
  * @fires WebMapViewModel#addlayerssucceeded
  */var WebMapViewModel_WebMapViewModel=/*#__PURE__*/function(_mapboxgl$Evented){_inherits(WebMapViewModel,_mapboxgl$Evented);//  on: any;
//  fire: any;
function WebMapViewModel(id){var _this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var mapOptions=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{version:8,sources:{},layers:[]};_classCallCheck(this,WebMapViewModel);_this=_possibleConstructorReturn(this,_getPrototypeOf(WebMapViewModel).call(this));_this.map=void 0;_this.mapId=void 0;_this.mapOptions=void 0;_this.serverUrl=void 0;_this.accessToken=void 0;_this.accessKey=void 0;_this.tiandituKey=void 0;_this.withCredentials=void 0;_this.target=void 0;_this.excludePortalProxyUrl=void 0;_this.center=void 0;_this.zoom=void 0;_this.mapParams={};_this.baseProjection=void 0;_this.echartslayer=[];_this._sourceListModel=void 0;_this._legendList=void 0;_this._layers=[];_this._svgDiv=void 0;_this._fieldMaxValue=void 0;_this._taskID=void 0;_this.layerAdded=void 0;_this._handleDataflowFeaturesCallback=void 0;_this._dataflowService=void 0;_this.mapId=id;_this.mapOptions=mapOptions;_this.serverUrl=options.serverUrl||'http://www.supermapol.com';_this.accessToken=options.accessToken;_this.accessKey=options.accessKey;_this.tiandituKey=options.tiandituKey||'';_this.withCredentials=options.withCredentials||false;_this.target=options.target||'map';_this.excludePortalProxyUrl=options.excludePortalProxyUrl;_this.center=mapOptions.center||[];_this.zoom=mapOptions.zoom;_this.echartslayer=[];_this._createWebMap();return _this;}/**
    * @function WebMapViewModel.prototype.resize
    * @description Map 更新大小。
    */_createClass(WebMapViewModel,[{key:"resize",value:function resize(){this.map&&this.map.resize();this.echartsLayerResize();}/**
    * @function WebMapViewModel.prototype.EchartsLayerResize
    * @description echartslayer 更新大小。
    */},{key:"echartsLayerResize",value:function echartsLayerResize(){this.echartslayer.forEach(function(echartslayer){echartslayer.chart.resize();});}/**
    * @function WebMapViewModel.prototype.setMapId
    * @description 设置地图 ID。
    * @param {String} mapId - iPortal|Online 地图 ID。
    */},{key:"setMapId",value:function setMapId(mapId){var _this2=this;this.mapId=mapId;setTimeout(function(){_this2._createWebMap();},0);}/**
    * @function WebMapViewModel.prototype.setServerUrl
    * @description 设置地图的地址。
    * @param {string} options.serverUrl - 地图的地址。
    */},{key:"setServerUrl",value:function setServerUrl(serverUrl){this.serverUrl=serverUrl;}},{key:"setWithCredentials",value:function setWithCredentials(withCredentials){this.withCredentials=withCredentials;}/**
    * @function WebMapViewModel.prototype.setCRS
    * @description 设置地图的投影。
    * @param {Number} crs - 地图投影。
    */},{key:"setCrs",value:function setCrs(crs){if(this.map){this.mapOptions.crs=crs;//@ts-ignore
crs&&this.map.setCRS(mapbox_gl_enhance_js_default.a.CRS.get(crs));}}/**
    * @function WebMapViewModel.prototype.setZoom
    * @description 设置地图的缩放级别。
    * @param {Number} zoom - 地图缩放级别。
    */},{key:"setZoom",value:function setZoom(zoom){if(this.map){this.mapOptions.zoom=zoom;(zoom||zoom===0)&&this.map.setZoom(zoom);}}/**
    * @function WebMapViewModel.prototype.setCenter
    * @description 设置地图的中心点。
    * @param {Array} center - 地图中心点。
    */},{key:"setCenter",value:function setCenter(center){if(this.map){this.mapOptions.center=center;center&&center.length>0&&this.map.setCenter(center);}}/**
    * @function WebMapViewModel.prototype.setMaxBounds
    * @description 设置地图的最大范围。
    * @param {Array} maxBounds - 地图最大范围。
    */},{key:"setMaxBounds",value:function setMaxBounds(maxBounds){if(this.map){this.mapOptions.maxBounds=maxBounds;maxBounds&&maxBounds.length>0&&this.map.setMaxBounds(maxBounds);}}/**
    * @function WebMapViewModel.prototype.setMinZoom
    * @description 设置地图的最小级别。
    * @param {Number} minZoom - 地图最小级别。
    */},{key:"setMinZoom",value:function setMinZoom(minZoom){if(this.map){this.mapOptions.minZoom=minZoom;(minZoom||minZoom===0)&&this.map.setMinZoom(minZoom);}}/**
    * @function WebMapViewModel.prototype.setMaxZoom
    * @description 设置地图的最大级别。
    * @param {Number} maxZoom - 地图最大级别。
    */},{key:"setMaxZoom",value:function setMaxZoom(maxZoom){if(this.map){this.mapOptions.maxZoom=maxZoom;(maxZoom||maxZoom===0)&&this.map.setMinZoom(maxZoom);}}/**
    * @function WebMapViewModel.prototype.setRenderWorldCopies
    * @description 设置地图的平铺。
    * @param {Boolean} renderWorldCopies - 地图是否平铺。
    */},{key:"setRenderWorldCopies",value:function setRenderWorldCopies(renderWorldCopies){if(this.map){this.mapOptions.renderWorldCopies=renderWorldCopies;renderWorldCopies&&this.map.setRenderWorldCopies(renderWorldCopies);}}/**
    * @function WebMapViewModel.prototype.setBearing
    * @description 设置地图的方位。
    * @param {Number} bearing - 地图的初始方位。
    */},{key:"setBearing",value:function setBearing(bearing){if(this.map){this.mapOptions.bearing=bearing;(bearing||bearing===0)&&this.map.setBearing(bearing);}}/**
    * @function WebMapViewModel.prototype.setPitch
    * @description 设置地图的俯仰。
    * @param {Number} pitch - 地图的初始俯仰。
    */},{key:"setPitch",value:function setPitch(pitch){if(this.map){this.mapOptions.pitch=pitch;(pitch||pitch===0)&&this.map.setPitch(pitch);}}/**
    * @function WebMapViewModel.prototype.setStyle
    * @description 设置地图的样式。
    * @param {Object} style - 地图的样式。
    */},{key:"setStyle",value:function setStyle(style){if(this.map){this.mapOptions.style=style;style&&this.map.setStyle(style);}}},{key:"_createWebMap",/**
    * @private
    * @function WebMapViewModel.prototype._createWebMap
    * @description 登陆窗口后添加地图图层。
    */value:function _createWebMap(){var _this3=this;if(this.map){this.map.remove();this.center=[];this.zoom=null;this._dataflowService&&this._dataflowService.off('messageSucceeded',this._handleDataflowFeaturesCallback);}if(!this.mapId||!this.serverUrl){this.mapOptions.container=this.target;setTimeout(function(){_this3.map=new mapbox_gl_enhance_js_default.a.Map(_this3.mapOptions);_this3.map.on('load',function(){_this3.fire('addlayerssucceeded',{map:_this3.map,mapparams:{},layers:[]});});},0);return;}this._legendList={};this._taskID=new Date();var urlArr=this.serverUrl.split('');if(urlArr[urlArr.length-1]!=='/'){this.serverUrl+='/';}var mapUrl=this.serverUrl+'web/maps/'+this.mapId+'/map';if(this.accessToken||this.accessKey){mapUrl+= true?'token='+this.accessToken:undefined;}var filter='getUrlResource.json?url=';if(this.excludePortalProxyUrl&&this.serverUrl.indexOf(filter)>-1){// 大屏需求,或者有加上代理的
var urlArray=this.serverUrl.split(filter);if(urlArray.length>1){mapUrl=urlArray[0]+filter+this.serverUrl+'web/maps/'+this.mapId+'/map.json';}}this._getMapInfo(mapUrl,this._taskID);}/**
    * @private
    * @function WebMapViewModel.prototype._createMap
    * @description 创建地图。
    */},{key:"_createMap",value:function _createMap(mapInfo){// 获取字体样式
var fonts=[];var layers=mapInfo.layers;// 获取 label 图层字体类型
if(layers&&layers.length>0){layers.forEach(function(layer){layer.labelStyle&&fonts.push(layer.labelStyle.fontFamily);},this);}fonts.push("'supermapol-icons'");var fontFamilys=fonts.join(',');// zoom
var center;center=mapInfo.center&&[mapInfo.center.x,mapInfo.center.y];// center
var zoom=mapInfo.level||0;zoom=zoom===0?0:zoom-1;if(!center){center=[0,0];}if(this.baseProjection==='EPSG:3857'){center=this._unproject(center);}center=new mapbox_gl_enhance_js_default.a.LngLat(center[0],center[1]);// 初始化 map
this.map=new mapbox_gl_enhance_js_default.a.Map({container:this.target,center:this.center.length?this.center:center,zoom:this.zoom||zoom,style:{version:8,sources:{},// "glyphs": 'http://iclsvr.supermap.io/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf',
layers:[]},// @ts-ignore -------- crs 为 enhance 新加属性
crs:this.baseProjection,localIdeographFontFamily:fontFamilys||'',renderWorldCopies:false,preserveDrawingBuffer:this.mapOptions.preserveDrawingBuffer||false});/**
      * @event WebMapViewModel#mapinitialized
      * @description Map 初始化成功。
      * @property {mapboxglTypes.Map} map - MapBoxGL Map 对象。
      */this.fire('mapinitialized',{map:this.map});}/**
    * @private
    * @function WebMapViewModel.prototype._getMapInfo
    * @description 获取地图的 JSON 信息。
    * @param {string} url - 请求地图的 url。
    */},{key:"_getMapInfo",value:function _getMapInfo(url,_taskID){var _this4=this;var mapUrl=url.indexOf('.json')===-1?"".concat(url,".json"):url;SuperMap.FetchRequest.get(mapUrl,null,{withCredentials:this.withCredentials}).then(function(response){return response.json();}).then(function(mapInfo){_this4.baseProjection=mapInfo.projection;// 存储地图的名称以及描述等信息，返回给用户
_this4.mapParams={title:mapInfo.title,description:mapInfo.description};// 坐标系异常处理
if(mapbox_gl_enhance_js_default.a.CRS.get(_this4.baseProjection)){_this4._createMap(mapInfo);var layers=mapInfo.layers;_this4.map.on('load',function(){if(mapInfo.baseLayer&&mapInfo.baseLayer.layerType==='MAPBOXSTYLE'){// 添加矢量瓦片服务作为底图
_this4._addMVTBaseMap(mapInfo);}else{_this4._addBaseMap(mapInfo);}if(!layers||layers.length===0){_this4._sendMapToUser(0,0);}else{_this4._addLayers(layers,_taskID);}});}else{throw Error('不支持当前地图的坐标系');}}).catch(function(error){/**
          * @event WebMapViewModel#getmapinfofailed
          * @description 获取地图信息失败。
          * @property {Object} error - 失败原因。
          */_this4.fire('getmapinfofailed',{error:error});});}},{key:"_addMVTBaseMap",value:function _addMVTBaseMap(mapInfo){var baseLayer=mapInfo.baseLayer,url=baseLayer.dataSource.url;// @ts-ignore
this.map.addStyle(url);}/**
    * @private
    * @function WebMapViewModel.prototype._addBaseMap
    * @description 添加底图。
    * @param {Object} mapInfo - map 信息。
    */},{key:"_addBaseMap",value:function _addBaseMap(mapInfo){this._createBaseLayer(mapInfo);}/**
    * @private
    * @function WebMapViewModel.prototype._createBaseLayer
    * @description 创建底图。
    * @param {Object} mapInfo - map 信息。
    */},{key:"_createBaseLayer",value:function _createBaseLayer(mapInfo){var layerInfo=mapInfo.baseLayer||mapInfo;var layerType=layerInfo.layerType;// 底图和rest地图兼容
if(layerType.indexOf('TIANDITU_VEC')>-1||layerType.indexOf('TIANDITU_IMG')>-1||layerType.indexOf('TIANDITU_TER')>-1){layerType=layerType.substr(0,12);}var mapUrls={CLOUD:'http://t2.supermapcloud.com/FileService/image?map=quanguo&type=web&x={x}&y={y}&z={z}',CLOUD_BLACK:'http://t3.supermapcloud.com/MapService/getGdp?x={x}&y={y}&z={z}',OSM:'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',GOOGLE:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0',GOOGLE_CN:'https://mt{0-3}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',JAPAN_STD:'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',JAPAN_PALE:'http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',JAPAN_RELIEF:'http://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',JAPAN_ORT:'http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'};var url;switch(layerType){case'TIANDITU_VEC':case'TIANDITU_IMG':case'TIANDITU_TER':this._createTiandituLayer(mapInfo);break;case'BING':this._createBingLayer(layerInfo.name);break;case'WMS':this._createWMSLayer(layerInfo);break;case'WMTS':this._createWMTSLayer(layerInfo);break;case'TILE':case'SUPERMAP_REST':this._createDynamicTiledLayer(layerInfo);break;case'CLOUD':case'CLOUD_BLACK':case'OSM':case'JAPAN_ORT':case'JAPAN_RELIEF':case'JAPAN_PALE':case'JAPAN_STD':case'GOOGLE_CN':case'GOOGLE':url=mapUrls[layerType];this._createXYZLayer(layerInfo,url);break;default:break;}}/**
    * @private
    * @function WebMapViewModel.prototype._createTiandituLayer
    * @description 创建天地图底图。
    * @param {Object} mapInfo - map 信息。
    */},{key:"_createTiandituLayer",value:function _createTiandituLayer(mapInfo){var tiandituUrls=this._getTiandituUrl(mapInfo);var layerType=mapInfo.baseLayer.layerType;var isLabel=Boolean(mapInfo.baseLayer.labelLayerVisible);var labelUrl=tiandituUrls['labelUrl'];var tiandituUrl=tiandituUrls['tiandituUrl'];this._addBaselayer(tiandituUrl,'tianditu-layers-'+layerType);isLabel&&this._addBaselayer(labelUrl,'tianditu-label-layers-'+layerType);}/**
    * @private
    * @function WebMapViewModel.prototype._createWMTSLayer
    * @description 创建 WMTS 底图。
    * @param {Object} layerInfo - 地图信息。
    */},{key:"_createWMTSLayer",value:function _createWMTSLayer(layerInfo){var _this5=this;var wmtsUrl=this._getWMTSUrl(layerInfo);this._filterWMTSIsMatched(layerInfo,function(isMatched,matchMaxZoom){isMatched&&_this5._addBaselayer([wmtsUrl],'wmts-layers'+layerInfo.name,0,matchMaxZoom);});}/**
    * @private
    * @function WebMapViewModel.prototype._filterWMTSIsMatched
    * @description 过滤能够跟mapboxgl匹配的wmts服务。
    * @param {Object} mapInfo - map 信息。
    * @callback matchedCallback
    */},{key:"_filterWMTSIsMatched",value:function _filterWMTSIsMatched(mapInfo,matchedCallback){var _this6=this;var isMatched=false;var matchMaxZoom=22;var url=mapInfo.url;var options={withCredentials:false,withoutFormatSuffix:true};SuperMap.FetchRequest.get(url,null,options).then(function(response){return response.text();}).then(function(capabilitiesText){var converts=lib||window.convert;var tileMatrixSet=JSON.parse(converts.xml2json(capabilitiesText,{compact:true,spaces:4})).Capabilities.Contents.TileMatrixSet;for(var i=0;i<tileMatrixSet.length;i++){if(tileMatrixSet[i]['ows:Identifier']&&tileMatrixSet[i]['ows:Identifier']['_text']===mapInfo.tileMatrixSet){if(DEFAULT_WELLKNOWNSCALESET.includes(tileMatrixSet[i]['WellKnownScaleSet']['_text'])){isMatched=true;}else if(tileMatrixSet[i]['WellKnownScaleSet']&&tileMatrixSet[i]['WellKnownScaleSet']['_text']==='Custom'){var matchedScaleDenominator=[];// 坐标系判断
var defaultCRSScaleDenominators=// @ts-ignore -------- crs 为 enhance 新加属性
_this6.map.crs==='EPSG:3857'?MB_SCALEDENOMINATOR_3857:MB_SCALEDENOMINATOR_4326;for(var j=0,len=defaultCRSScaleDenominators.length;j<len;j++){if(!tileMatrixSet[i].TileMatrix[j]){break;}if(defaultCRSScaleDenominators[j]!==tileMatrixSet[i].TileMatrix[j]['ScaleDenominator']['_text']){break;}matchedScaleDenominator.push(defaultCRSScaleDenominators[j]);}matchMaxZoom=matchedScaleDenominator.length-1;if(matchedScaleDenominator.length!==0){isMatched=true;}else{throw Error('不支持传入的 TileMatrixSet');}}else{throw Error('不支持传入的 TileMatrixSet');}}}matchedCallback(isMatched,matchMaxZoom);}).catch(function(error){/**
          * @event WebMapViewModel#getwmtsinfofailed
          * @description 获取 WMTS 图层信息失败。
          * @property {Object} error - 失败原因。
          * @property {mapboxglTypes.Map} map - MapBoxGL Map 对象。
          */_this6.fire('getwmtsinfofailed',{error:error,map:_this6.map});});}/**
    * @private
    * @function WebMapViewModel.prototype._createBingLayer
    * @description 创建 Bing 图层。
    */},{key:"_createBingLayer",value:function _createBingLayer(layerName){var bingUrl='http://dynamic.t0.tiles.ditu.live.com/comp/ch/{quadkey}?it=G,TW,L,LA&mkt=zh-cn&og=109&cstl=w4c&ur=CN&n=z';// @ts-ignore
this._addBaselayer([bingUrl],'bing-layers-'+layerName);}/**
    * @private
    * @function WebMapViewModel.prototype._createXYZLayer
    * @description 创建 XYZ 底图。
    * @param {String} url - url 地址。
    */},{key:"_createXYZLayer",value:function _createXYZLayer(layerInfo,url){var urlArr=[];if(layerInfo.layerType==='OSM'){var res=url.match(/\w\-\w/g)[0];var start=res[0];var end=res[2];var alphabet='';for(var i=97;i<123;i++){alphabet+=String.fromCharCode(i);}var alphabetArr=alphabet.split('');var startIndex=alphabetArr.indexOf(start);var endIndex=alphabetArr.indexOf(end);var res3=alphabetArr.slice(startIndex,endIndex+1);for(var _i=0;_i<res3.length;_i++){var replaceRes=url.replace(/{\w\-\w}/g,res3[_i]);urlArr.push(replaceRes);}}else if(layerInfo.layerType==='GOOGLE_CN'){var _res=url.match(/\d\-\d/g)[0];var _start=parseInt(_res[0]);var _end=parseInt(_res[2]);for(var _i2=_start;_i2<=_end;_i2++){var _replaceRes=url.replace(/{\d\-\d}/g,_i2.toString());urlArr.push(_replaceRes);}}else{urlArr=[url];}this._addBaselayer(urlArr,'XYZ-layers-'+layerInfo.name);}/**
    * @private
    * @function WebMapViewModel.prototype._createDynamicTiledLayer
    * @description 创建 iserver 底图。
    * @param {Object} layerInfo - 图层信息。
    */},{key:"_createDynamicTiledLayer",value:function _createDynamicTiledLayer(layerInfo){var url=layerInfo.url+'/zxyTileImage.png?z={z}&x={x}&y={y}';// @ts-ignore -------- setCRS 为 enhance 新加属性
if(this.map.setCRS&&this.baseProjection!=='EPSG:3857'){url=layerInfo.url+'/image.png?viewBounds={viewBounds}&width={width}&height={height}';}this._addBaselayer([url],'tile-layers-'+layerInfo.name);}/**
    * @private
    * @function WebMapViewModel.prototype._createWMSLayer
    * @description 创建 WMS 图层。
    * @param {Object} layerInfo - 图层信息。
    */},{key:"_createWMSLayer",value:function _createWMSLayer(layerInfo){var WMSUrl=this._getWMSUrl(layerInfo);this._addBaselayer([WMSUrl],'WMS-layers-'+layerInfo.name);}/**
    * @private
    * @function WebMapViewModel.prototype._createVectorLayer
    * @description 创建 Vector 图层。
    * @param {Object} layerInfo - map 信息。
    * @param {Array} features - 属性 信息。
    */},{key:"_createVectorLayer",value:function _createVectorLayer(layerInfo,features){var style=layerInfo.style;var type=layerInfo.featureType;var layerID=layerInfo.layerID;var visible=layerInfo.visible;var layerStyle={style:this._transformStyleToMapBoxGl(style,type),layout:{visibility:visible}};var source={type:'geojson',data:{type:'FeatureCollection',features:features}};this._addOverlayToMap(type,source,layerID,layerStyle);// 如果面有边框
type==='POLYGON'&&style.strokeColor&&this._addStrokeLineForPoly(style,source,layerID+'-strokeLine',visible);}/**
    * @function WebMapViewModel.prototype._getTiandituUrl
    * @private
    * @description 创建天地图url;
    * @param {Object} mapInfo - map 信息。
    */},{key:"_getTiandituUrl",value:function _getTiandituUrl(mapInfo){var re=/t0/gi;var tiandituUrls={tiandituUrl:[],labelUrl:[]};var layerType=mapInfo.baseLayer.layerType.split('_')[1].toLowerCase();var isLabel=Boolean(mapInfo.baseLayer.labelLayerVisible);var url="http://t0.tianditu.com/{layer}_{proj}/wmts?tk=".concat(this.tiandituKey);var labelUrl=url;var layerLabelMap={vec:'cva',ter:'cta',img:'cia'};var tilematrixSet=this.baseProjection==='EPSG:4326'?'c':'w';var options={service:'WMTS',request:'GetTile',style:'default',version:'1.0.0',layer:layerType,tilematrixSet:tilematrixSet,format:'tiles',width:256,height:256};url+=this._getParamString(options,url)+'&tilematrix={z}&tilerow={y}&tilecol={x}';var tiandituUrl=url.replace('{layer}',layerType).replace('{proj}',tilematrixSet);var tiandituUrlArr=[];for(var i=0;i<8;i++){tiandituUrlArr.push(tiandituUrl.replace(re,"t".concat(i)));}tiandituUrls['tiandituUrl']=tiandituUrlArr;// 如果有 label 图层
if(isLabel){var labelLayer=layerLabelMap[layerType];options.layer=labelLayer;labelUrl+=this._getParamString(options,labelUrl)+'&tilematrix={z}&tilerow={y}&tilecol={x}';labelUrl=labelUrl.replace('{layer}',labelLayer).replace('{proj}',tilematrixSet);var labelUrlArr=[];for(var _i3=0;_i3<8;_i3++){labelUrlArr.push(labelUrl.replace(re,"t".concat(_i3)));}tiandituUrls['labelUrl']=labelUrlArr;}return tiandituUrls;}/**
    * @function WebMapViewModel.prototype._getWMSUrl
    * @private
    * @description 创建 WMS url;
    * @param {Object} mapInfo - map 信息。
    */},{key:"_getWMSUrl",value:function _getWMSUrl(mapInfo){var url=mapInfo.url;url=url.split('?')[0];var strArr=url.split('/');var options={service:'WMS',request:'GetMap',layers:strArr[strArr.length-1],styles:'',format:'image/png',transparent:'true',version:'1.1.1',width:256,height:256,srs:this.baseProjection};var bbox=this.baseProjection==='EPSG:4326'?'{bbox-epsg-4326}':'{bbox-epsg-3857}';url+=this._getParamString(options,url)+"&bbox=".concat(bbox);return url;}/**
    * @private
    * @function WebMapViewModel.prototype._checkUploadToRelationship
    * @description 检查是否上传到关系型
    * @param {String} fileId - 文件的id
    *  @returns {Promise<T | never>} 关系型文件一些参数
    */},{key:"_checkUploadToRelationship",value:function _checkUploadToRelationship(fileId){return SuperMap.FetchRequest.get("".concat(this.serverUrl,"web/datas/").concat(fileId,"/datasets.json"),null,{withCredentials:this.withCredentials}).then(function(response){return response.json();}).then(function(result){return result;});}/**
    * @private
    * @function ol.supermap.WebMap.prototype._getDataService
    * @description 获取上传的数据信息
    * @param {String} fileId - 文件id
    * @param {String} datasetName 数据服务的数据集名称
    *  @returns {Promise<T | never>} 数据的信息
    */},{key:"_getDataService",value:function _getDataService(fileId,datasetName){return SuperMap.FetchRequest.get("".concat(this.serverUrl,"web/datas/").concat(fileId,".json"),null,{withCredentials:this.withCredentials}).then(function(response){return response.json();}).then(function(result){result.fileId=fileId;result.datasetName=datasetName;return result;});}/**
    * @private
    * @function WebMapViewModel.prototype._getService
    * @description 获取当前数据发布的服务中的某种类型服务
    * @param {Array} services 服务集合
    * @param {String} type 服务类型，RESTDATA, RESTMAP
    * @returns {Object} 服务
    */},{key:"_getService",value:function _getService(services,type){var service=services.filter(function(info){return info&&info.serviceType===type;});return service[0];}},{key:"_getServiceInfoFromLayer",value:function _getServiceInfoFromLayer(layerIndex,len,layer,dataItemServices,datasetName,featureType,info){var _this7=this;var isMapService=info?!info.isMvt:layer.layerType==='HOSTED_TILE',isAdded=false;dataItemServices.forEach(function(service,index){if(isAdded){return;}//有服务了，就不需要循环
if(service&&isMapService&&service.serviceType==='RESTMAP'){isAdded=true;//地图服务,判断使用mvt还是tile
_this7._getTileLayerInfo(service.address).then(function(restMaps){restMaps.forEach(function(restMapInfo){var bounds=restMapInfo.bounds;layer.layerType='TILE';layer.orginEpsgCode=_this7.baseProjection;layer.units=restMapInfo.coordUnit&&restMapInfo.coordUnit.toLowerCase();layer.extent=[bounds.left,bounds.bottom,bounds.right,bounds.top];layer.visibleScales=restMapInfo.visibleScales;layer.url=restMapInfo.url;layer.sourceType='TILE';_this7._createBaseLayer(layer);_this7.layerAdded++;_this7._sendMapToUser(_this7.layerAdded,len);});});}// TODO 对接 MVT
else if(service&&!isMapService&&service.serviceType==='RESTDATA'){if(info&&info.isMvt){_this7._addVectorLayer(info,layer,featureType);_this7.layerAdded++;_this7._sendMapToUser(_this7.layerAdded,len);}else{//数据服务
isAdded=true;//关系型文件发布的数据服务
_this7._getDatasources(service.address).then(function(datasourceName){layer.dataSource.dataSourceName=datasourceName+':'+datasetName;layer.dataSource.url="".concat(service.address,"/data");_this7._getFeatureBySQL(layer.dataSource.url,[layer.dataSource.dataSourceName||layer.name],function(result){var features=_this7._parseGeoJsonData2Feature({allDatas:{features:result.result.features.features},fileCode:layer.projection,featureProjection:_this7.baseProjection});_this7._addLayer(layer,features,layerIndex);_this7.layerAdded++;_this7._sendMapToUser(_this7.layerAdded,len);},function(err){_this7.layerAdded++;_this7._sendMapToUser(_this7.layerAdded,len);_this7.fire('getlayerdatasourcefailed',{error:err,layer:layer,map:_this7.map});});});}}},this);if(!isAdded){//循环完成了，也没有找到合适的服务。有可能服务被删除
this.layerAdded++;this._sendMapToUser(this.layerAdded,len);this.fire('getlayerdatasourcefailed',{error:null,layer:layer,map:this.map});}}/**
    * @private
    * @function WebMapViewModel.prototype._getDatasources
    * @description 获取关系型文件发布的数据服务中数据源的名称
    * @param {String} url - 获取数据源信息的url
    *  @returns {Promise<T | never>} 数据源名称
    */},{key:"_getDatasources",value:function _getDatasources(url){return SuperMap.FetchRequest.get("".concat(url,"/data/datasources.json")).then(function(response){return response.json();}).then(function(datasource){var datasourceNames=datasource.datasourceNames;return datasourceNames[0];});}/**
    * @private
    * @function WebMapViewModel.prototype._getTileLayerInfo
    * @description 获取地图服务的信息
    * @param {String} url 地图服务的url（没有地图名字）
    * @returns {Promise<T | never>} 地图服务信息
    */},{key:"_getTileLayerInfo",value:function _getTileLayerInfo(url){var _this8=this;var proxyUrl=this.serverUrl+'apps/viewer/getUrlResource.json?url=';var requestUrl=proxyUrl+encodeURIComponent(url);var epsgCode=this.baseProjection.split('EPSG:')[1];return SuperMap.FetchRequest.get("".concat(requestUrl,"/maps.json"),null,{withCredentials:this.withCredentials}).then(function(response){return response.json();}).then(function(mapInfo){var promises=[];if(mapInfo){mapInfo.forEach(function(info){var promise=SuperMap.FetchRequest.get("".concat(proxyUrl).concat(info.path,".json?prjCoordSys=").concat(JSON.stringify({epsgCode:epsgCode})),null,{withCredentials:_this8.withCredentials}).then(function(response){return response.json();}).then(function(restMapInfo){restMapInfo.url=info.path;return restMapInfo;});promises.push(promise);});}return Promise.all(promises).then(function(allRestMaps){return allRestMaps;});});}/**
    * @private
    * @function WebMapViewModel.prototype._addLayers
    * @description 添加叠加图层。
    * @param {Object} mapInfo - 图层信息。
    */},{key:"_addLayers",value:function _addLayers(layers,_taskID){var _this9=this;// 存储地图上所有的图层对象
this._layers=layers;var features;this.layerAdded=0;var len=layers.length;if(len>0){layers.forEach(function(layer,index){if(layer.dataSource&&layer.dataSource.serverId||layer.layerType==='MARKER'||layer.layerType==='HOSTED_TILE'){//数据存储到iportal上了
var dataSource=layer.dataSource,serverId=dataSource?dataSource.serverId:layer.serverId;if(!serverId){_this9._addLayer(layer,null,index);_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);return;}if(layer.layerType==='MARKER'||dataSource&&(!dataSource.accessType||dataSource.accessType==='DIRECT')){//原来二进制文件
var url="".concat(_this9.serverUrl,"web/datas/").concat(serverId,"/content.json?pageSize=9999999&currentPage=1");if(_this9.accessToken){url="".concat(url,"&").concat(_this9.accessKey,"=").concat(_this9.accessToken);}SuperMap.FetchRequest.get(url,null,{withCredentials:_this9.withCredentials}).then(function(response){return response.json();}).then(function(data){if(_taskID!==_this9._taskID){return;}if(data.succeed===false){//请求失败
_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);// -----------------------todo-----------------
_this9.fire('getlayerdatasourcefailed',{error:data.error,layer:layer,map:_this9.map});return;}if(data&&data.type){if(data.type==='JSON'||data.type==='GEOJSON'){data.content=JSON.parse(data.content.trim());features=_this9._formatGeoJSON(data.content);}else if(data.type==='EXCEL'||data.type==='CSV'){features=_this9._excelData2Feature(data.content);}_this9._addLayer(layer,features,index);_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);}}).catch(function(error){_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);_this9.fire('getlayerdatasourcefailed',{error:error,layer:layer,map:_this9.map});});}else{//关系型文件
var isMapService=layer.layerType==='HOSTED_TILE',_serverId=dataSource?dataSource.serverId:layer.serverId;_this9._checkUploadToRelationship(_serverId).then(function(result){if(result&&result.length>0){var datasetName=result[0].name,featureType=result[0].type.toUpperCase();_this9._getDataService(_serverId,datasetName).then(function(data){var dataItemServices=data.dataItemServices;if(dataItemServices.length===0){_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);_this9.fire('getlayerdatasourcefailed',{error:null,layer:layer,map:_this9.map});return;}if(isMapService){var dataService=dataItemServices.filter(function(info){return info&&info.serviceType==='RESTDATA';})[0];_this9._isMvt(dataService.address,datasetName).then(function(info){_this9._getServiceInfoFromLayer(index,len,layer,dataItemServices,datasetName,featureType,info);}).catch(function(){//判断失败就走之前逻辑，>数据量用tile
_this9._getServiceInfoFromLayer(index,len,layer,dataItemServices,datasetName,featureType);});}else{_this9._getServiceInfoFromLayer(index,len,layer,dataItemServices,datasetName,featureType);}});}else{_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);_this9.fire('getlayerdatasourcefailed',{error:null,layer:layer,map:_this9.map});}}).catch(function(error){_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);_this9.fire('getlayerdatasourcefailed',{error:error,layer:layer,map:_this9.map});});}}else if(layer.layerType==='SUPERMAP_REST'||layer.layerType==='TILE'||layer.layerType==='WMS'||layer.layerType==='WMTS'){_this9._createBaseLayer(layer);_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);}else if(layer.dataSource&&layer.dataSource.type==='REST_DATA'){//从restData获取数据
var _dataSource=layer.dataSource;_this9._getFeatureBySQL(_dataSource.url,[_dataSource.dataSourseName||layer.name],function(result){features=_this9._parseGeoJsonData2Feature({allDatas:{features:result.result.features.features},fileCode:layer.projection,featureProjection:_this9.baseProjection});_this9._addLayer(layer,features,index);_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);},function(err){_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);_this9.fire('getlayerdatasourcefailed',{error:err,layer:layer,map:_this9.map});});}else if(layer.dataSource&&layer.dataSource.type==='REST_MAP'&&layer.dataSource.url){_this9._queryFeatureBySQL(layer.dataSource.url,layer.dataSource.layerName,function(result){var recordsets=result&&result.result.recordsets;var recordset=recordsets&&recordsets[0];var attributes=recordset.fields;if(recordset&&attributes){var fileterAttrs=[];for(var i in attributes){var value=attributes[i];if(value.indexOf('Sm')!==0||value==='SmID'){fileterAttrs.push(value);}}_this9._getFeatures(fileterAttrs,layer,function(features){_this9._addLayer(layer,features,index);_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);},function(err){_this9.layerAdded++;_this9.fire('getlayerdatasourcefailed',{error:err,layer:layer,map:_this9.map});});}},function(err){_this9.fire('getlayerdatasourcefailed',{error:err,layer:layer,map:_this9.map});},'smid=1');}else if(layer.layerType==='DATAFLOW_POINT_TRACK'||layer.layerType==='DATAFLOW_HEAT'){_this9._getDataflowInfo(layer,function(){_this9._addLayer(layer,null,index);_this9.layerAdded++;_this9._sendMapToUser(_this9.layerAdded,len);},function(e){_this9.layerAdded++;// TODO  fire faild
});}},this);}}/**
    * @private
    * @function WebMapViewModel.prototype._getFeatures
    */},{key:"_getFeatures",value:function _getFeatures(fields,layerInfo,resolve,reject){var _this10=this;var source=layerInfo.dataSource;// 示例数据
var fileCode=layerInfo.projection;this._queryFeatureBySQL(source.url,source.layerName,function(result){var recordsets=result.result.recordsets[0];var features=recordsets.features.features;var featuresObj=_this10._parseGeoJsonData2Feature({allDatas:{features:features},fileCode:fileCode,featureProjection:_this10.baseProjection});resolve(featuresObj);},function(err){reject(err);},null,fields);}/**
    * @private
    * @function WebMapViewModel.prototype._addLayer
    * @description 将单个图层添加到地图上。
    * @param layerInfo  某个图层的图层信息
    * @param {Array.<GeoJSON>} features - feature。
    */},{key:"_addLayer",value:function _addLayer(layerInfo,features,index){var layerType=layerInfo.layerType;layerInfo.layerID=layerType+'-'+layerInfo.name+'-'+index;layerInfo.visible=layerInfo.visible?'visible':'none';// mbgl 目前不能处理 geojson 复杂面情况
// mbgl isssue https://github.com/mapbox/mapbox-gl-js/issues/7023
if(features&&features[0]&&features[0].geometry.type==='Polygon'){features=handleMultyPolygon(features);}if(layerInfo.style&&layerInfo.filterCondition){// 将 feature 根据过滤条件进行过滤, 分段专题图和单值专题图因为要计算 styleGroup 所以暂时不过滤
if(layerType!=='RANGE'&&layerType!=='UNIQUE'&&layerType!=='RANK_SYMBOL'){features=this._getFiterFeatures(layerInfo.filterCondition,features);}}if(features&&layerInfo.projection!=='EPSG:4326'){this._transformFeatures(features);}if(layerType==='VECTOR'){if(layerInfo.featureType==='POINT'){if(layerInfo.style.type==='SYMBOL_POINT'){this._createSymbolLayer(layerInfo,features);}else{this._createGraphicLayer(layerInfo,features);}}else{// 线和面
this._createVectorLayer(layerInfo,features);}}else if(layerType==='UNIQUE'){this._createUniqueLayer(layerInfo,features);}else if(layerType==='RANGE'){this._createRangeLayer(layerInfo,features);}else if(layerType==='HEAT'){this._createHeatLayer(layerInfo,features);}else if(layerType==='MARKER'){this._createMarkerLayer(layerInfo,features);}else if(layerInfo.layerType==='MIGRATION'){this._createMigrationLayer(layerInfo,features);}else if(layerInfo.layerType==='RANK_SYMBOL'){this._createRankSymbolLayer(layerInfo,features);}else if(layerInfo.layerType==='DATAFLOW_POINT_TRACK'||layerInfo.layerType==='DATAFLOW_HEAT'){this._createDataflowLayer(layerInfo);}if(layerInfo.labelStyle&&layerInfo.labelStyle.labelField&&layerInfo.layerType!=='DATAFLOW_POINT_TRACK'){// 存在标签专题图
this._addLabelLayer(layerInfo,features);}}},{key:"_createDataflowLayer",value:function _createDataflowLayer(layerInfo){var dataflowService=new mapbox_gl_enhance_js_default.a.supermap.DataFlowService(layerInfo.wsUrl).initSubscribe();this._handleDataflowFeaturesCallback=this._handleDataflowFeatures.bind(this,layerInfo);dataflowService.on('messageSucceeded',this._handleDataflowFeaturesCallback);this._dataflowService=dataflowService;}},{key:"_handleDataflowFeatures",value:function _handleDataflowFeatures(layerInfo,e){var features=JSON.parse(e.data);// this._transformFeatures([features]); // TODO 坐标系
this.fire('dataflowfeatureupdated',{features:features,identifyField:layerInfo.identifyField,layerID:layerInfo.layerID});if(layerInfo.filterCondition){//过滤条件
var condition=this._replaceFilterCharacter(layerInfo.filterCondition);var sql='select * from json where ('+condition+')';var filterResult=window['jsonsql'].query(sql,{attributes:features.properties});if(filterResult&&filterResult.length>0){this._addDataflowLayer(layerInfo,features);}}else{this._addDataflowLayer(layerInfo,features);}}},{key:"_getDataFlowRotateStyle",value:function _getDataFlowRotateStyle(features,directionField,identifyField){var iconRotateExpression=['match',['get',identifyField]];features.forEach(function(feature){var value;if(directionField!==undefined&&directionField!=='未设置'&&directionField!=='None'){value=feature.properties[directionField];}else{value=0;}if(value>360||value<0){return null;}// @ts-ignore
iconRotateExpression.push(feature.properties[identifyField],parseInt(value));});// @ts-ignore
iconRotateExpression.push(0);return iconRotateExpression;}},{key:"_addDataflowLayer",value:function _addDataflowLayer(layerInfo,feature){var layerID=layerInfo.layerID;if(layerInfo.layerType==='DATAFLOW_HEAT'){if(!this.map.getSource(layerID)){this._createHeatLayer(layerInfo,[feature]);}else{this._updateDataFlowFeature(layerID,feature,layerInfo);}}else{var layerStyle=layerInfo.pointStyle;layerInfo.style=layerStyle;if(!this.map.getSource(layerID)){var iconRotateExpression=this._getDataFlowRotateStyle([feature],layerInfo.directionField,layerInfo.identifyField);if(['BASIC_POINT','SVG_POINT','IMAGE_POINT'].includes(layerStyle.type)){this._createGraphicLayer(layerInfo,[feature],null,iconRotateExpression);}else{this._createSymbolLayer(layerInfo,[feature],null,iconRotateExpression);}}else{this._updateDataFlowFeature(layerID,feature,layerInfo,'point');}if(layerInfo.labelStyle&&layerInfo.visible){if(!this.map.getSource(layerID+'label')){this._addLabelLayer(layerInfo,[feature]);}else{this._updateDataFlowFeature(layerID+'label',feature,layerInfo);}}if(layerInfo.lineStyle&&layerInfo.visible){if(!this.map.getSource(layerID+'-line')){var geometry=feature.geometry.coordinates;var lineFeature={type:'Feature',properties:feature.properties,geometry:{type:'LineString',coordinates:[geometry]}};this._createVectorLayer({style:layerInfo.lineStyle,featureType:'LINE',visible:'visible',layerID:layerID+'-line'},[lineFeature]);}else{this._updateDataFlowFeature(layerID+'-line',feature,layerInfo,'line');}}}}},{key:"_updateDataFlowFeature",value:function _updateDataFlowFeature(sourceID,newFeature,layerInfo,type){var identifyField=layerInfo.identifyField,maxPointCount=layerInfo.maxPointCount,directionField=layerInfo.directionField;// @ts-ignore
var features=lodash_clonedeep_default()(this.map.getSource(sourceID)._data.features);var has=false;features.map(function(item,index){if(item.properties[identifyField]===newFeature.properties[identifyField]){has=true;if(type==='line'){var coordinates=item.geometry.coordinates;coordinates.push(newFeature.geometry.coordinates);if(maxPointCount&&coordinates.length>maxPointCount){coordinates.splice(0,coordinates.length-maxPointCount);}features[index].geometry.coordinates=coordinates;}else{features[index]=newFeature;}}});if(!has){if(type==='line'){features.push({type:'Feature',properties:newFeature.properties,geometry:{type:'LineString',coordinates:[newFeature.geometry.coordinates]}});}else{features.push(newFeature);}}// @ts-ignore
this.map.getSource(sourceID).setData({type:'FeatureCollection',features:features});if(type==='point'){var _type=layerInfo.pointStyle.type;var iconRotateExpression=this._getDataFlowRotateStyle(features,directionField,identifyField);if(['SVG_POINT','IMAGE_POINT'].includes(_type)){this.map.setLayoutProperty(sourceID,'icon-rotate',iconRotateExpression);}else if(_type==='SYMBOL_POINT'){this.map.setLayoutProperty(sourceID,'text-rotate',iconRotateExpression);}}}},{key:"_getDataflowInfo",value:function _getDataflowInfo(layerInfo,success,faild){var url=layerInfo.url,token;var requestUrl="".concat(url,".json");if(layerInfo.credential&&layerInfo.credential.token){token=layerInfo.credential.token;requestUrl+="?token=".concat(token);}SuperMap.FetchRequest.get(requestUrl).then(function(response){return response.json();}).then(function(result){if(result&&result.featureMetaData){layerInfo.featureType=result.featureMetaData.featureType.toUpperCase();layerInfo.dataSource={dataTypes:{}};if(result.featureMetaData.fieldInfos&&result.featureMetaData.fieldInfos.length>0){result.featureMetaData.fieldInfos.forEach(function(data){var name=data.name.trim();if(data.type==='TEXT'){layerInfo.dataSource.dataTypes[name]='STRING';}else if(['DOUBLE','INT','FLOAT','LONG','SHORT'].includes(data.type)){layerInfo.dataSource.dataTypes[name]='NUMBER';}else{layerInfo.dataSource.dataTypes[name]='UNKNOWN';}});}layerInfo.wsUrl=result.urls[0].url;layerInfo.name=result.urls[0].url.split('iserver/services/')[1].split('/dataflow')[0];success();}else{//失败也要到成功会调函数中，否则不会继续执行
faild();}}).catch(function(){faild();});}},{key:"_createMigrationLayer",value:function _createMigrationLayer(layerInfo,features){window['echarts']=external_echarts_default.a;var properties=this._getFeatureProperties(features);var lineData=this._createLinesData(layerInfo,properties);var pointData=this._createPointsData(lineData,layerInfo,properties);var options=this._createOptions(layerInfo,lineData,pointData);var echartslayer=new EchartsLayer_js_default.a(this.map);echartslayer.chart.setOption(options);this.echartslayer.push(echartslayer);}},{key:"_createOptions",value:function _createOptions(layerInfo,lineData,pointData){var series;var lineSeries=this._createLineSeries(layerInfo,lineData);if(pointData&&pointData.length){var pointSeries=this._createPointSeries(layerInfo,pointData);series=lineSeries.concat(pointSeries);}else{series=lineSeries.slice();}var options={GLMap:{roam:true},// geo: {
//   map: 'GLMap',
//   label: {
//     emphasis: {
//       show: false
//     }
//   },
//   roam: true,
//   itemStyle: {
//     normal: {
//       areaColor: '#323c48',
//       borderColor: '#404a59'
//     },
//     emphasis: {
//       areaColor: '#2a333d'
//     }
//   }
// },
series:series};return options;}},{key:"_createPointSeries",value:function _createPointSeries(layerInfo,pointData){var lineSetting=layerInfo.lineSetting;var animationSetting=layerInfo.animationSetting;var labelSetting=layerInfo.labelSetting;var pointSeries=[{name:'point-series',coordinateSystem:'GLMap',zlevel:2,label:{normal:{show:labelSetting.show,position:'right',formatter:'{b}',color:labelSetting.color,fontFamily:labelSetting.fontFamily}},itemStyle:{normal:{color:lineSetting.color||labelSetting.color}},data:pointData}];if(animationSetting.show){// 开启动画
// @ts-ignore
pointSeries[0].type='effectScatter';// @ts-ignore
pointSeries[0].rippleEffect={brushType:'stroke'};}else{// 关闭动画
// @ts-ignore
pointSeries[0].type='scatter';}return pointSeries;}},{key:"_createLineSeries",value:function _createLineSeries(layerInfo,lineData){var lineSetting=layerInfo.lineSetting;var animationSetting=layerInfo.animationSetting;var linesSeries=[// 轨迹线样式
{name:'line-series',coordinateSystem:'GLMap',type:'lines',zlevel:1,effect:{show:animationSetting.show,constantSpeed:animationSetting.constantSpeed,trailLength:0,symbol:animationSetting.symbol,symbolSize:animationSetting.symbolSize},lineStyle:{normal:{color:lineSetting.color,type:lineSetting.type,width:lineSetting.width,opacity:lineSetting.opacity,curveness:lineSetting.curveness}},data:lineData}];if(lineData.length>=MAX_MIGRATION_ANIMATION_COUNT){// @ts-ignore
linesSeries[0].large=true;// @ts-ignore
linesSeries[0].largeThreshold=100;// @ts-ignore
linesSeries[0].blendMode='lighter';}return linesSeries;}},{key:"_createLinesData",value:function _createLinesData(layerInfo,properties){var data=[];if(properties&&properties.length){// 重新获取数据
var from=layerInfo.from,to=layerInfo.to,fromCoord,toCoord;if(from.type==='XY_FIELD'&&from['xField']&&from['yField']&&to['xField']&&to['yField']){properties.forEach(function(property){var fromX=property[from['xField']],fromY=property[from['yField']],toX=property[to['xField']],toY=property[to['yField']];if(!fromX||!fromY||!toX||!toY){return;}fromCoord=[property[from['xField']],property[from['yField']]];toCoord=[property[to['xField']],property[to['yField']]];data.push({coords:[fromCoord,toCoord]});});}else if(from.type==='PLACE_FIELD'&&from['field']&&to['field']){var centerDatas=ProvinceCenter.concat(MunicipalCenter);properties.forEach(function(property){var fromField=property[from['field']],toField=property[to['field']];fromCoord=centerDatas.find(function(item){return mapbox_gl_enhance_js_default.a.supermap.Util.isMatchAdministrativeName(item.name,fromField);});toCoord=centerDatas.find(function(item){return mapbox_gl_enhance_js_default.a.supermap.Util.isMatchAdministrativeName(item.name,toField);});if(!fromCoord||!toCoord){return;}data.push({coords:[fromCoord.coord,toCoord.coord]});});}}return data;}},{key:"_createPointsData",value:function _createPointsData(lineData,layerInfo,properties){var data=[],labelSetting=layerInfo.labelSetting;// 标签隐藏则直接返回
if(!labelSetting.show||!lineData.length){return data;}var fromData=[],toData=[];lineData.forEach(function(item,idx){var coords=item.coords,fromCoord=coords[0],toCoord=coords[1],fromProperty=properties[idx][labelSetting.from],toProperty=properties[idx][labelSetting.to];// 起始字段去重
var f=fromData.find(function(d){return d.value[0]===fromCoord[0]&&d.value[1]===fromCoord[1];});!f&&fromData.push({name:fromProperty,value:fromCoord});// 终点字段去重
var t=toData.find(function(d){return d.value[0]===toCoord[0]&&d.value[1]===toCoord[1];});!t&&toData.push({name:toProperty,value:toCoord});});data=fromData.concat(toData);return data;}},{key:"_createRankSymbolLayer",value:function _createRankSymbolLayer(layerInfo,features){var fieldName=layerInfo.themeSetting.themeField;var style=layerInfo.style;var featureType=layerInfo.featureType;var styleSource=this._createRankStyleSource(layerInfo,features,layerInfo.featureType);var styleGroups=styleSource.styleGroups;features=this._getFiterFeatures(layerInfo.filterCondition,features);// 获取 expression
var expression=['match',['get','index']];features.forEach(function(row){var tartget=parseFloat(row.properties[fieldName]);if(styleGroups){for(var i=0;i<styleGroups.length;i++){if(styleGroups[i].start<=tartget&&tartget<styleGroups[i].end){var radius=style.type==='SYMBOL_POINT'||style.type==='IMAGE_POINT'?style.type==='SYMBOL_POINT'?styleGroups[i].radius*2:Number.parseFloat((styleGroups[i].radius/style.imageInfo.size.h).toFixed(2))*2:styleGroups[i].radius;expression.push(row.properties['index'],radius);}}}// @ts-ignore
!tartget&&expression.push(row.properties['index'],1);},this);// @ts-ignore
expression.push(1);if(style.type==='SYMBOL_POINT'){this._createSymbolLayer(layerInfo,features,expression);}else if(style.type==='IMAGE_POINT'){this._createGraphicLayer(layerInfo,features,expression);}else{var source={type:'geojson',data:{type:'FeatureCollection',features:features}};// 获取样式
var layerStyle={layout:{visibility:layerInfo.visible}};layerStyle.style=this._transformStyleToMapBoxGl(style,featureType,expression,'circle-radius');var layerID=layerInfo.layerID;this._addOverlayToMap(featureType,source,layerID,layerStyle);}}},{key:"_createRankStyleSource",value:function _createRankStyleSource(parameters,features,featureType){var themeSetting=parameters.themeSetting,themeField=themeSetting.themeField;var styleGroups=this._getRankStyleGroup(themeField,features,parameters,featureType);// @ts-ignore
return styleGroups?{parameters:parameters,styleGroups:styleGroups}:false;}},{key:"_getRankStyleGroup",value:function _getRankStyleGroup(themeField,features,parameters,featureType){// 找出所有的单值
var values=[],segements=[],style=parameters.style,themeSetting=parameters.themeSetting,segmentMethod=themeSetting.segmentMethod,segmentCount=themeSetting.segmentCount,customSettings=themeSetting.customSettings,minR=parameters.themeSetting.minRadius,maxR=parameters.themeSetting.maxRadius;features.forEach(function(feature){var properties=feature.properties,value=properties[themeField];// 过滤掉空值和非数值
if(value==null||!mapbox_gl_enhance_js_default.a.supermap.Util.isNumber(value)){return;}values.push(Number(value));});try{segements=SuperMap.ArrayStatistic.getArraySegments(values,segmentMethod,segmentCount);}catch(error){console.error(error);}// 处理自定义 分段
for(var i=0;i<segmentCount;i++){if(i in customSettings){var startValue=customSettings[i]['segment']['start'],endValue=customSettings[i]['segment']['end'];startValue!=null&&(segements[i]=startValue);endValue!=null&&(segements[i+1]=endValue);}}//生成styleGroup
var styleGroup=[];if(segements&&segements.length){var len=segements.length,incrementR=(maxR-minR)/(len-1),// 半径增量
start,end,radius=Number(((maxR+minR)/2).toFixed(2));for(var _i4=0;_i4<len-1;_i4++){start=Number(segements[_i4].toFixed(2));end=Number(segements[_i4+1].toFixed(2));// 这里特殊处理以下分段值相同的情况（即所有字段值相同）
radius=start===end?radius:minR+Math.round(incrementR*_i4);// 最后一个分段时将end+0.01，避免取不到最大值
end=_i4===len-2?end+0.01:end;// 处理自定义 半径
radius=customSettings[_i4]&&customSettings[_i4].radius?customSettings[_i4].radius:radius;style.radius=radius;styleGroup.push({radius:radius,start:start,end:end});}return styleGroup;}else{return false;}}/**
    * @private
    * @function WebMapViewModel.prototype._addLabelLayer
    * @description 添加标签图层。
    * @param layerInfo  某个图层的图层信息。
    * @param {Array.<GeoJSON>} features - feature。
    */},{key:"_addLabelLayer",value:function _addLabelLayer(layerInfo,features){var labelStyle=layerInfo.labelStyle;this.map.addLayer({id:layerInfo.layerID+'label',type:'symbol',source:{type:'geojson',data:{type:'FeatureCollection',features:features}},paint:{'text-color':labelStyle.fill,'text-halo-color':'rgba(255,255,255,0.8)','text-halo-width':parseFloat(labelStyle.fontSize)||12},layout:{'text-field':"{".concat(labelStyle.labelField,"}"),'text-size':parseFloat(labelStyle.fontSize)||12,'text-offset':labelStyle.offsetX?[labelStyle.offsetX/10||0,labelStyle.offsetY/10||0]:[0,-2.5],'text-font':['DIN Offc Pro Italic','Arial Unicode MS Regular'],visibility:layerInfo.visible}});}/**
    * @private
    * @function WebMapViewModel.prototype._createSymbolLayer
    * @description 添加 symbol 图层。
    * @param layerInfo  某个图层的图层信息。
    * @param {Array.<GeoJSON>} features - feature。
    */},{key:"_createSymbolLayer",value:function _createSymbolLayer(layerInfo,features,textSize,textRotateExpresion){// 用来请求symbol_point字体文件
var target=document.getElementById("".concat(this.target));target.classList.add('supermapol-icons-map');var style=layerInfo.style;var unicode=layerInfo.style.unicode;var text=String.fromCharCode(parseInt(unicode.replace(/^&#x/,''),16));var layerID=layerInfo.layerID;this.map.addSource(layerID,{type:'geojson',data:{type:'FeatureCollection',features:[]}});this.map.addLayer({id:layerID,type:'symbol',source:layerID,paint:{'text-color':style.fillColor},layout:{'text-field':text,'text-size':textSize||style.fontSize&&parseFloat(style.fontSize)||12,'text-font':['DIN Offc Pro Italic','Arial Unicode MS Regular'],'text-rotate':textRotateExpresion||0,visibility:layerInfo.visible}});// @ts-ignore
this.map.getSource(layerID).setData({type:'FeatureCollection',features:features});}/**
    * @private
    * @function WebMapViewModel.prototype._createGraphicLayer
    * @description 创建 Graphic 图层。
    * @param {Object} layerInfo - map 信息。
    * @param {Array} features - 属性 信息。
    */},{key:"_createGraphicLayer",value:function _createGraphicLayer(layerInfo,features,iconSizeExpression,iconRotateExpression){var _this11=this;var style=layerInfo.style;var layerID=layerInfo.layerID;var source={type:'geojson',data:{type:'FeatureCollection',features:features}};if(style.type==='IMAGE_POINT'){var imageInfo=style.imageInfo;this.map.loadImage(imageInfo.url,function(error,image){if(error){console.log(error);}var iconSize=Number.parseFloat((style.radius/image.height).toFixed(2))*2;_this11.map.addImage('imageIcon',image);_this11.map.addLayer({id:layerID,type:'symbol',source:source,layout:{'icon-image':'imageIcon','icon-size':iconSizeExpression||iconSize,visibility:layerInfo.visible,'icon-rotate':iconRotateExpression||0}});});}else if(style.type==='SVG_POINT'){var svgUrl=style.url;if(!this._svgDiv){this._svgDiv=document.createElement('div');document.body.appendChild(this._svgDiv);}this._getCanvasFromSVG(svgUrl,this._svgDiv,function(canvas){var imgUrl=canvas.toDataURL('img/png');imgUrl&&_this11.map.loadImage(imgUrl,function(error,image){if(error){console.log(error);}var iconSize=Number.parseFloat((style.radius/canvas.width).toFixed(2));_this11.map.addImage('imageIcon',image);_this11.map.addLayer({id:layerID,type:'symbol',source:source,layout:{'icon-image':'imageIcon','icon-size':iconSizeExpression||iconSize,visibility:layerInfo.visible,'icon-rotate':iconRotateExpression||0}});});});}else{var layerStyle={style:this._transformStyleToMapBoxGl(style,layerInfo.featureType),layout:{visibility:layerInfo.visible}};this._addOverlayToMap('POINT',source,layerID,layerStyle);}}/**
    * @private
    * @function WebMapViewModel.prototype._createUniqueLayer
    * @description 创建单值图层。
    * @param layerInfo  某个图层的图层信息
    * @param features   图层上的 feature
    */},{key:"_createUniqueLayer",value:function _createUniqueLayer(layerInfo,features){var styleGroup=this._getUniqueStyleGroup(layerInfo,features);features=this._getFiterFeatures(layerInfo.filterCondition,features);var style=layerInfo.style;var themeField=layerInfo.themeSetting.themeField;Object.keys(features[0].properties).forEach(function(key){key.toLocaleUpperCase()===themeField.toLocaleUpperCase()&&(themeField=key);});var type=layerInfo.featureType;var expression=['match',['get','index']];var layerID=layerInfo.layerID;features.forEach(function(row){styleGroup.forEach(function(item){if(item.value===row.properties[themeField]){expression.push(row.properties['index'],item.color);}});});expression.push('#ffffff');// 图例相关
this._initLegendConfigInfo(layerInfo,styleGroup);var visible=layerInfo.visible;var layerStyle={style:this._transformStyleToMapBoxGl(style,type,expression),layout:{visibility:visible}};var source={type:'geojson',data:{type:'FeatureCollection',features:features}};this._addOverlayToMap(type,source,layerID,layerStyle);type==='POLYGON'&&style.strokeColor&&this._addStrokeLineForPoly(style,source,layerID+'-strokeLine',visible);}/**
    * @private
    * @function WebMapViewModel.prototype._getUniqueStyleGroup
    * @description 获取单值的目标字段与颜色的对应数组。
    * @param layerInfo  某个图层的图层信息
    * @param features   图层上的 feature
    */},{key:"_getUniqueStyleGroup",value:function _getUniqueStyleGroup(parameters,features){// 找出所有的单值
var featureType=parameters.featureType;var style=parameters.style;var themeSetting=parameters.themeSetting;var fieldName=themeSetting.themeField;var colors=themeSetting.colors;Object.keys(features[0].properties).forEach(function(key){key.toLocaleUpperCase()===fieldName.toLocaleUpperCase()&&(fieldName=key);});var names=[];var customSettings=themeSetting.customSettings;for(var i in features){var properties=features[i].properties;var name=properties[fieldName];var isSaved=false;for(var j in names){if(names[j]===name){isSaved=true;break;}}if(!isSaved){names.push(name);}}// 获取一定量的颜色
var curentColors=colors;curentColors=SuperMap.ColorsPickerUtil.getGradientColors(curentColors,names.length);// 生成styleGroup
var styleGroup=[];names.forEach(function(name,index){var color=curentColors[index];if(name in customSettings){color=customSettings[name];}if(featureType==='LINE'){style.strokeColor=color;}else{style.fillColor=color;}styleGroup.push({color:color,value:name});},this);return styleGroup;}/**
    * @private
    * @function WebMapViewModel.prototype._getWMTSUrl
    * @description 根据传入的配置信息拼接wmts url。
    * @param options 配置对象
    */},{key:"_getWMTSUrl",value:function _getWMTSUrl(options){var obj={service:'WMTS',request:'GetTile',version:'1.0.0',style:'default',layer:options.layer,tilematrixSet:options.tileMatrixSet,format:'image/png'};var url=options.url;url+=this._getParamString(obj,url)+'&tilematrix={z}&tilerow={y}&tilecol={x}';return url;}/**
    * @private
    * @function WebMapViewModel.prototype._createMarkerLayer
    * @description 添加标记图层。
    * @param {Array.<GeoJSON>} features - feature。
    */},{key:"_createMarkerLayer",value:function _createMarkerLayer(layerInfo,features){var _this12=this;features&&features.forEach(function(feature){var geomType=feature.geometry.type.toUpperCase();var defaultStyle=feature.dv_v5_markerStyle;if(geomType==='POINT'&&defaultStyle.text){// 说明是文字的feature类型
geomType='TEXT';}var featureInfo=_this12._setFeatureInfo(feature);feature.properties['useStyle']=defaultStyle;feature.properties['featureInfo']=featureInfo;if(geomType==='POINT'&&defaultStyle.src&&defaultStyle.src.indexOf('http://')===-1&&defaultStyle.src.indexOf('https://')===-1){// 说明地址不完整
defaultStyle.src=_this12.serverUrl+defaultStyle.src;}var source={type:'geojson',data:feature};var index=feature.properties.index;var layerID=geomType+'-'+index;// image-marker
geomType==='POINT'&&defaultStyle.src&&defaultStyle.src.indexOf('svg')<=-1&&_this12.map.loadImage(defaultStyle.src,function(error,image){if(error){console.log(error);}_this12.map.addImage(index+'',image);_this12.map.addLayer({id:layerID,type:'symbol',source:source,layout:{'icon-image':index+'','icon-size':defaultStyle.scale,visibility:layerInfo.visible}});});// svg-marker
if(geomType==='POINT'&&defaultStyle.src&&defaultStyle.src.indexOf('svg')>-1){if(!_this12._svgDiv){_this12._svgDiv=document.createElement('div');document.body.appendChild(_this12._svgDiv);}_this12._getCanvasFromSVG(defaultStyle.src,_this12._svgDiv,function(canvas){var imgUrl=canvas.toDataURL('img/png');imgUrl&&_this12.map.loadImage(imgUrl,function(error,image){if(error){console.log(error);}_this12.map.addImage(index+'',image);_this12.map.addLayer({id:layerID,type:'symbol',source:source,layout:{'icon-image':index+'','icon-size':defaultStyle.scale,visibility:layerInfo.visible}});});});}// point-line-polygon-marker
if(!defaultStyle.src){var layeStyle={layout:{}};if(geomType==='LINESTRING'&&defaultStyle.lineCap){geomType='LINE';layeStyle.layout={'line-cap':defaultStyle.lineCap};}var visible=layerInfo.visible;layeStyle.layout.visibility=visible;// get style
layeStyle.style=_this12._transformStyleToMapBoxGl(defaultStyle,geomType);_this12._addOverlayToMap(geomType,source,layerID,layeStyle);// 若面有边框
geomType==='POLYGON'&&defaultStyle.strokeColor&&_this12._addStrokeLineForPoly(defaultStyle,source,layerID+'-strokeLine',visible);}},this);}/**
    * @private
    * @function WebMapViewModel.prototype._setFeatureInfo
    * @description 设置 feature 信息。
    * @param {Array.<GeoJSON>} features - feature。
    */},{key:"_setFeatureInfo",value:function _setFeatureInfo(feature){var featureInfo;var info=feature.dv_v5_markerInfo;if(info&&info.dataViz_title){// 有featureInfo信息就不需要再添加
featureInfo=info;}else{// featureInfo = this.getDefaultAttribute();
return info;}var properties=feature.properties;for(var key in featureInfo){if(properties[key]){featureInfo[key]=properties[key];delete properties[key];}}return featureInfo;}/**
    * @private
    * @function WebMapViewModel.prototype._createHeatLayer
    * @description 添加热力图。
    * @param {Array.<GeoJSON>} features - feature。
    */},{key:"_createHeatLayer",value:function _createHeatLayer(layerInfo,features){var style=layerInfo.themeSetting;var layerOption={gradient:style.colors.slice(),radius:parseInt(style.radius)};// 自定义颜色
var customSettings=style.customSettings;for(var i in customSettings){layerOption.gradient[i]=customSettings[i];}// 权重字段恢复
if(style.weight){this._changeWeight(features,style.weight);}var color=['interpolate',['linear'],['heatmap-density']];var length=layerOption.gradient.length;var step=parseFloat((1/length).toFixed(2));layerOption.gradient.forEach(function(item,index){color.push(index*step);if(index===0){item=mapbox_gl_enhance_js_default.a.supermap.Util.hexToRgba(item,0);}color.push(item);});// 图例相关
this._initLegendConfigInfo(layerInfo,layerOption.gradient);var paint={'heatmap-color':color,'heatmap-radius':style.radius+15,'heatmap-intensity':{base:1,stops:[[0,0.8],[22,1]]}};if(features[0].weight&&features.length>=4){var weight=[];features.forEach(function(item){weight.push(item.weight);});var max=SuperMap.ArrayStatistic.getMax(weight);var min=SuperMap.ArrayStatistic.getMin(weight);paint['heatmap-weight']=['interpolate',['linear'],['get','weight'],min,0,max,1];}this.map.addLayer({id:layerInfo.layerID,type:'heatmap',source:{type:'geojson',data:{type:'FeatureCollection',features:features}},paint:paint});}/**
    * @private
    * @function WebMapViewModel.prototype._changeWeight
    * @description 改变当前权重字段
    * @param {Array.<GeoJSON>} features - feature。
    * @param {String} weightFeild - 权重字段
    */},{key:"_changeWeight",value:function _changeWeight(features,weightFeild){this._fieldMaxValue={};this._getMaxValue(features,weightFeild);var maxValue=this._fieldMaxValue[weightFeild];features.forEach(function(feature){var attributes=feature.properties;var value=attributes[weightFeild];feature['weight']=value/maxValue;});}/**
    * @private
    * @function WebMapViewModel.prototype._getMaxValue
    * @description 获取当前字段对应的最大值，用于计算权重。
    * @param {Array.<GeoJSON>} features - feature。
    * @param {String} weightFeild - 权重字段
    */},{key:"_getMaxValue",value:function _getMaxValue(features,weightField){var values=[];var attributes;var field=weightField;if(this._fieldMaxValue[field]){return;}features.forEach(function(feature){// 收集当前权重字段对应的所有值
attributes=feature.properties;attributes&&parseFloat(attributes[field])&&values.push(parseFloat(attributes[field]));});this._fieldMaxValue[field]=SuperMap.ArrayStatistic.getArrayStatistic(values,'Maximum');}/**
    * @private
    * @function WebMapViewModel.prototype._createRangeLayer
    * @description 添加分段专题图。
    * @param {Array.<GeoJSON>} features - feature。
    */},{key:"_createRangeLayer",value:function _createRangeLayer(layerInfo,features){var fieldName=layerInfo.themeSetting.themeField;var style=layerInfo.style;var featureType=layerInfo.featureType;var styleGroups=this._getRangeStyleGroup(layerInfo,features);features=this._getFiterFeatures(layerInfo.filterCondition,features);var source={type:'geojson',data:{type:'FeatureCollection',features:features}};// 获取 expression
var expression=['match',['get','index']];features.forEach(function(row){var tartget=parseFloat(row.properties[fieldName]);if(styleGroups){for(var i=0;i<styleGroups.length;i++){if(styleGroups[i].start<=tartget&&tartget<styleGroups[i].end){expression.push(row.properties['index'],styleGroups[i].color);}}}!tartget&&expression.push(row.properties['index'],'rgba(0, 0, 0, 0)');},this);expression.push('rgba(0, 0, 0, 0)');// 图例处理
this._initLegendConfigInfo(layerInfo,styleGroups);// 获取样式
var layerStyle={layout:{}};if(featureType==='LINE'&&style.lineCap){layerStyle.layout={'line-cap':style.lineCap};}var visible=layerInfo.visible;layerStyle.layout.visibility=visible;layerStyle.style=this._transformStyleToMapBoxGl(style,featureType,expression);// 添加图层
var layerID=layerInfo.layerID;this._addOverlayToMap(featureType,source,layerID,layerStyle);// 如果面有边框
featureType==='POLYGON'&&style.strokeColor&&this._addStrokeLineForPoly(style,source,layerID+'-strokeline',visible);}/**
    * @private
    * @function WebMapViewModel.prototype._getFiterFeatures
    * @description 通过过滤条件查询满足的 feature。
    * @param {String} filterCondition - 过滤条件。
    * @param {array} allFeatures - 图层上的 feature 集合
    */},{key:"_getFiterFeatures",value:function _getFiterFeatures(filterCondition,allFeatures){if(!filterCondition){return allFeatures;}var condition=this._replaceFilterCharacter(filterCondition);var sql='select * from json where ('+condition+')';var filterFeatures=[];for(var i=0;i<allFeatures.length;i++){var feature=allFeatures[i];var filterResult=void 0;try{filterResult=window['jsonsql'].query(sql,{properties:feature.properties});}catch(err){// 必须把要过滤得内容封装成一个对象,主要是处理jsonsql(line : 62)中由于with语句遍历对象造成的问题
continue;}if(filterResult&&filterResult.length>0){// afterFilterFeatureIdx.push(i);
filterFeatures.push(feature);}}return filterFeatures;}/**
    * @private
    * @function WebMapViewModel.prototype._replaceFilterCharacter
    * @description 获取过滤字符串。
    * @param {String} filterString - 过滤条件。
    */},{key:"_replaceFilterCharacter",value:function _replaceFilterCharacter(filterString){filterString=filterString.replace(/=/g,'==').replace(/AND|and/g,'&&').replace(/or|OR/g,'||').replace(/<==/g,'<=').replace(/>==/g,'>=');return filterString;}/**
    * @private
    * @function WebMapViewModel.prototype._getRangeStyleGroup
    * @description 获取分段样式。
    * @param {Array.<GeoJSON>} features - feature。
    */},{key:"_getRangeStyleGroup",value:function _getRangeStyleGroup(layerInfo,features){// 找出分段值
var featureType=layerInfo.featureType;var style=layerInfo.style;var values=[];var attributes;var themeSetting=layerInfo.themeSetting;var customSettings=themeSetting.customSettings;var fieldName=themeSetting.themeField;var segmentCount=themeSetting.segmentCount;features.forEach(function(feature){attributes=feature.properties||feature.get('Properties');if(attributes){// 过滤掉非数值的数据
attributes[fieldName]&&mapbox_gl_enhance_js_default.a.supermap.Util.isNumber(attributes[fieldName])&&values.push(parseFloat(attributes[fieldName]));}else if(feature.get(fieldName)&&mapbox_gl_enhance_js_default.a.supermap.Util.isNumber(feature.get(fieldName))){feature.get(fieldName)&&values.push(parseFloat(feature.get(fieldName)));}},this);var segements=SuperMap.ArrayStatistic.getArraySegments(values,themeSetting.segmentMethod,segmentCount);if(segements){var itemNum=segmentCount;if(attributes&&segements[0]===segements[attributes.length-1]){itemNum=1;segements.length=2;}// 保留两位有效数
for(var i=0;i<segements.length;i++){var value=segements[i];value=i===0?Math.floor(value*100)/100:Math.ceil(value*100)/100+0.1;// 加0.1 解决最大值没有样式问题
segements[i]=Number(value.toFixed(2));}// 获取一定量的颜色
var curentColors=themeSetting.colors;// curentColors = SuperMap.ColorsPickerUtil.getGradientColors(curentColors, itemNum, 'RANGE');
for(var index=0;index<itemNum;index++){if(index in customSettings){if(customSettings[index]['segment']['start']){segements[index]=customSettings[index]['segment']['start'];}if(customSettings[index]['segment']['end']){segements[index+1]=customSettings[index]['segment']['end'];}}}// 生成styleGroup
var styleGroups=[];for(var _i5=0;_i5<itemNum;_i5++){var color=curentColors[_i5];if(_i5 in customSettings){if(customSettings[_i5].color){color=customSettings[_i5].color;}}if(featureType==='LINE'){style.strokeColor=color;}else{style.fillColor=color;}var start=segements[_i5];var end=segements[_i5+1];var styleObj=JSON.parse(JSON.stringify(style));styleGroups.push({style:styleObj,color:color,start:start,end:end});}return styleGroups;}}/**
    * @private
    * @function WebMapViewModel.prototype._formatGeoJSON
    * @description 格式 GeoJSON。
    * @param {GeoJSON} data - GeoJSON 数据。
    */},{key:"_formatGeoJSON",value:function _formatGeoJSON(data){var features=data.features;features.forEach(function(row,index){row.properties['index']=index;});return features;}/**
    * @private
    * @function WebMapViewModel.prototype._excelData2Feature将
    * @description csv 和 xls 文件内容转换成 geojson
    * @param content  文件内容
    * @param layerInfo  图层信息
    * @returns {Array}  feature的数组集合
    */},{key:"_excelData2Feature",value:function _excelData2Feature(dataContent){var fieldCaptions=dataContent.colTitles;// 位置属性处理
var xfieldIndex=-1;var yfieldIndex=-1;for(var i=0,len=fieldCaptions.length;i<len;i++){if(isXField(fieldCaptions[i])){xfieldIndex=i;}if(isYField(fieldCaptions[i])){yfieldIndex=i;}}// feature 构建后期支持坐标系 4326/3857
var features=[];for(var _i6=0,_len=dataContent.rows.length;_i6<_len;_i6++){var row=dataContent.rows[_i6];var x=Number(row[xfieldIndex]);var y=Number(row[yfieldIndex]);// 属性信息
var attributes={};for(var index in dataContent.colTitles){var key=dataContent.colTitles[index];attributes[key]=dataContent.rows[_i6][index];}attributes['index']=_i6+'';// 目前csv 只支持处理点，所以先生成点类型的 geojson
var feature={type:'Feature',geometry:{type:'Point',coordinates:[x,y]},properties:attributes};features.push(feature);}return features;}/**
    * @private
    * @function WebMapViewModel.prototype._sendMapToUser
    * @description 返回最终的 map 对象给用户，供他们操作使用。
    * @param count
    * @param layersLen
    */},{key:"_sendMapToUser",value:function _sendMapToUser(count,layersLen){if(count===layersLen){/**
        * @event WebMapViewModel#addlayerssucceeded
        * @description 添加图层成功。
        * @property {mapboxglTypes.Map} map - MapBoxGL Map 对象。
        * @property {Object} mapparams - 地图信息。
        * @property {string} mapParams.title - 地图标题。
        * @property {string} mapParams.description - 地图描述。
        * @property {Array.<Object>} layers - 地图上所有的图层对象。
        */this._sourceListModel=new web_map_SourceListModel({map:this.map});for(var layerID in this._legendList){this._sourceListModel.addSourceStyle(layerID,this._legendList[layerID]);}for(var index=this._layers.length-2;index>-1;index--){var targetlayerId=this._layers[index].layerID;var beforLayerId=this._layers[index+1].layerID;this.map.moveLayer(targetlayerId,beforLayerId);}this.fire('addlayerssucceeded',{map:this.map,mapparams:this.mapParams,layers:this._layers});}}/**
    * @function WebMapViewModel.prototype._unproject
    * @private
    * @description 墨卡托转经纬度。
    * @param {} point - 待转换的点。
    */},{key:"_unproject",value:function _unproject(point){var d=180/Math.PI;var r=6378137;var ts=Math.exp(-point[1]/r);var phi=Math.PI/2-2*Math.atan(ts);for(var i=0,dphi=0.1,con;i<15&&Math.abs(dphi)>1e-7;i++){con=1;dphi=Math.PI/2-2*Math.atan(ts*con)-phi;phi+=dphi;}return[point[0]*d/r,phi*d];}/**
    * @function WebMapViewModel.prototype._getParamString
    * @private
    * @param {Object} obj - 待添加的参数。
    * @param {string} existingUrl - 待添加参数的 url。
    * @param {Boolean} [uppercase] - 参数是否转换为大写。
    */},{key:"_getParamString",value:function _getParamString(obj,existingUrl){var uppercase=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var params=[];for(var i in obj){params.push((uppercase?i.toUpperCase():i)+'='+obj[i]);}return(!existingUrl||existingUrl.indexOf('?')===-1?'?':'&')+params.join('&');}/**
    * @private
    * @function WebMapViewModel.prototype._transformStyleToMapBoxGl
    * @description 根据图层类型将 layerInfo 中的 style 属性格式转换为 mapboxglTypes 中的 style 格式。
    * @param {Object} style - layerInfo中的style属性
    * @param {String} type - 图层类型
    * @param {Array} [expression] - 存储颜色值得表达式
    */},{key:"_transformStyleToMapBoxGl",value:function _transformStyleToMapBoxGl(style,type,expression,expressionType){var transTable={};if((style.type==='POINT'||style.type==='BASIC_POINT'||type==='POINT')&&type!=='LINE'){transTable={fillColor:'circle-color',strokeWidth:'circle-stroke-width',fillOpacity:'circle-opacity',radius:'circle-radius',strokeColor:'circle-stroke-color',strokeOpacity:'circle-stroke-opacity'};}else if(['LINE','LINESTRING','MULTILINESTRING'].includes(type)){transTable={strokeWidth:'line-width',strokeColor:'line-color',strokeOpacity:'line-opacity'};}else if(['REGION','POLYGON','MULTIPOLYGON'].includes(type)){transTable={fillColor:'fill-color',fillOpacity:'fill-opacity',strokeColor:'fill-outline-color'};}var newObj={};for(var item in style){if(transTable[item]){newObj[transTable[item]]=style[item];}}if(expression){if(expressionType){newObj[expressionType]=expression;}else if(newObj['circle-color']){newObj['circle-color']=expression;}else if(newObj['line-color']){newObj['line-color']=expression;}else{newObj['fill-color']=expression;}}if(style.lineDash&&style.lineDash!=='solid'&&type==='LINE'){newObj['line-dasharray']=this._dashStyle(style);}return newObj;}/**
    * @private
    * @function WebMapViewModel.prototype.._dashStyle
    * @description 符号样式。
    * @param {Object} style - 样式参数。
    * @param {number} widthFactor - 宽度系数。
    */},{key:"_dashStyle",value:function _dashStyle(style){if(!style){return[];}// var w = style.strokeWidth * widthFactor;
var w=1;var str=style.strokeDashstyle||style.lineDash;switch(str){case'solid':return[];case'dot':return[1,4*w];case'dash':return[4*w,4*w];case'dashdot':return[4*w,4*w,1*w,4*w];case'longdash':return[8*w,4*w];case'longdashdot':return[8*w,4*w,1,4*w];default:if(!str){return[];}if(SuperMap.Util.isArray(str)){return str;}str=SuperMap.String.trim(str).replace(/\s+/g,',');return str.replace(/\[|\]/gi,'').split(',');}}/**
    * @private
    * @description 将SVG转换成Canvas
    * @param svgUrl
    * @param divDom
    * @param callBack
    */},{key:"_getCanvasFromSVG",value:function _getCanvasFromSVG(svgUrl,divDom,callBack){// 一个图层对应一个canvas
var canvas=document.createElement('canvas');canvas.id='dataviz-canvas-'+mapbox_gl_enhance_js_default.a.supermap.Util.newGuid(8);canvas.style.display='none';divDom.appendChild(canvas);var canvgs=window.canvg?window.canvg:canvg_min_default.a;canvgs(canvas.id,svgUrl,{ignoreMouse:true,ignoreAnimation:true,renderCallback:function renderCallback(){if(canvas.width>300||canvas.height>300){return;}callBack(canvas);},forceRedraw:function forceRedraw(){return false;}});}/**
    * @private
    * @function WebMapViewModel.prototype._addOverlayToMap
    * @description 添加基础矢量图层到 MAP
    * @param {Object} style - mabgl style
    * @param {String} type - 图层类型
    */},{key:"_addOverlayToMap",value:function _addOverlayToMap(type,source,layerID,layerStyle){var mbglTypeMap={POINT:'circle',LINE:'line',POLYGON:'fill'};var mbglType=mbglTypeMap[type];if(mbglType==='circle'||mbglType==='line'||mbglType==='fill'){this.map.addLayer({id:layerID,type:mbglType,source:source,paint:layerStyle.style,layout:layerStyle.layout||{}});}}},{key:"_addBaselayer",value:function _addBaselayer(url,layerID){var minzoom=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var maxzoom=arguments.length>3&&arguments[3]!==undefined?arguments[3]:22;var source={type:'raster',tiles:url,tileSize:256};this.map.addLayer({id:layerID,type:'raster',source:source,minzoom:minzoom,maxzoom:maxzoom});}/**
    * @private
    * @function WebMapViewModel.prototype._addStrokeLineForPoly
    * @description 添加面的边框。
    * @param {Object} style - mabgl style
    */},{key:"_addStrokeLineForPoly",value:function _addStrokeLineForPoly(style,source,layerID,visible){var lineStyle={style:this._transformStyleToMapBoxGl(style,'LINE'),layout:{visibility:visible}};this._addOverlayToMap('LINE',source,layerID,lineStyle);}/**
    * @private
    * @function WebMapViewModel.prototype._parseGeoJsonData2Feature
    * @description 将从restData地址上获取的json转换成feature（从iserver中获取的json转换成feature）
    * @param {object} metaData - json内容
    */},{key:"_parseGeoJsonData2Feature",value:function _parseGeoJsonData2Feature(metaData){var allFeatures=metaData.allDatas.features;var features=[];for(var i=0,len=allFeatures.length;i<len;i++){var feature=allFeatures[i];var coordinate=feature.geometry.coordinates;if(allFeatures[i].geometry.type==='Point'){// 标注图层 还没有属性值时候不加
if(allFeatures[i].properties){allFeatures[i].properties.lon=coordinate[0];allFeatures[i].properties.lat=coordinate[1];}}feature.properties['index']=i+'';features.push(feature);}return features;}/**
    * @private
    * @function WebMapViewModel.prototype._getFeatureBySQL
    * @description 通过 sql 方式查询数据。
    */},{key:"_getFeatureBySQL",value:function _getFeatureBySQL(url,datasetNames,_processCompleted,processFaild){var getFeatureParam,getFeatureBySQLService,getFeatureBySQLParams;getFeatureParam=new SuperMap.FilterParameter({name:datasetNames.join().replace(':','@'),attributeFilter:'SMID > 0'});getFeatureBySQLParams=new SuperMap.GetFeaturesBySQLParameters({queryParameter:getFeatureParam,datasetNames:datasetNames,fromIndex:0,toIndex:-1,maxFeatures:-1,returnContent:true});var options={eventListeners:{processCompleted:function processCompleted(getFeaturesEventArgs){_processCompleted&&_processCompleted(getFeaturesEventArgs);},processFailed:function processFailed(e){processFaild&&processFaild(e);}}};getFeatureBySQLService=new SuperMap.GetFeaturesBySQLService(url,options);getFeatureBySQLService.processAsync(getFeatureBySQLParams);}/**
    * @private
    * @function WebMapViewModel.prototype._queryFeatureBySQL
    * @description 通过 sql 方式查询数据。
    */},{key:"_queryFeatureBySQL",value:function _queryFeatureBySQL(url,layerName,processCompleted,processFaild,attributeFilter,fields,epsgCode,startRecord,recordLength,onlyAttribute){var queryParam=new SuperMap.FilterParameter({name:layerName,attributeFilter:attributeFilter});if(fields){queryParam.fields=fields;}var params={queryParams:[queryParam]};if(onlyAttribute){params.queryOption=SuperMap.QueryOption.ATTRIBUTE;}startRecord&&(params.startRecord=startRecord);recordLength&&(params.expectCount=recordLength);if(epsgCode){params.prjCoordSys={epsgCode:epsgCode};}var queryBySQLParams=new SuperMap.QueryBySQLParameters(params);var queryBySQLService=new mapbox_gl_enhance_js_default.a.supermap.QueryService(url);queryBySQLService.queryBySQL(queryBySQLParams,function(data){data.type==='processCompleted'?processCompleted(data):processFaild(data);});}},{key:"_initLegendConfigInfo",value:function _initLegendConfigInfo(layerInfo,style){if(!this._legendList[layerInfo.layerID]){this._legendList[layerInfo.layerID]={layerType:layerInfo.layerType,featureType:layerInfo.featureType,layerId:layerInfo.layerID,themeField:layerInfo.layerType==='HEAT'?layerInfo.themeSetting.weight:layerInfo.themeSetting.themeField,styleGroup:style};}}},{key:"_getFeatureProperties",value:function _getFeatureProperties(features){var properties=[];if(features&&features.length){features.forEach(function(feature){var property=feature.properties;property&&properties.push(property);});}return properties;}},{key:"_addVectorLayer",value:function _addVectorLayer(info,layerInfo,featureType){var style=this._getDataVectorTileStyle(featureType);var paint=this._transformStyleToMapBoxGl(style,featureType);var url=info.url+'/tileFeature.mvt';var origin=mapbox_gl_enhance_js_default.a.CRS.get(this.baseProjection).getOrigin();url+="?&returnAttributes=true&width=512&height=512&x={x}&y={y}&scale={scale}&origin={x:".concat(origin[0],",y:").concat(origin[1],"}");this.map.addLayer({id:lodash_uniqueid_default()(layerInfo.name+'-'),// @ts-ignore
type:style.mbglType,source:{type:'vector',tiles:[url]},'source-layer':"".concat(info.datasetName,"@").concat(info.datasourceName),paint:paint,layout:{visibility:layerInfo.visible?'visible':'none'}});}},{key:"_isMvt",value:function _isMvt(serviceUrl,datasetName){var _this13=this;return this._getDatasetsInfo(serviceUrl,datasetName).then(function(info){//判断是否和底图坐标系一直
if(info.epsgCode==_this13.baseProjection.split('EPSG:')[1]){return SuperMap.FetchRequest.get("".concat(info.url,"/tilefeature.mvt")).then(function(response){return response.json();}).then(function(result){info.isMvt=result.error&&result.error.code===400;return info;}).catch(function(){return info;});}return info;});}},{key:"_getDatasetsInfo",value:function _getDatasetsInfo(serviceUrl,datasetName){return this._getDatasources(serviceUrl).then(function(datasourceName){//判断mvt服务是否可用
var url="".concat(serviceUrl,"/data/datasources/").concat(datasourceName,"/datasets/").concat(datasetName);return SuperMap.FetchRequest.get(url).then(function(response){return response.json();}).then(function(datasetsInfo){return{epsgCode:datasetsInfo.datasetInfo.prjCoordSys.epsgCode,bounds:datasetsInfo.datasetInfo.bounds,datasourceName:datasourceName,datasetName:datasetName,url:url//返回的是原始url，没有代理。因为用于请求mvt
};});});}},{key:"_getDataVectorTileStyle",value:function _getDataVectorTileStyle(featureType){var styleParameters={radius:8,//圆点半径
fillColor:'#EE4D5A',//填充色
fillOpacity:0.9,strokeColor:'#ffffff',//边框颜色
strokeWidth:1,strokeOpacity:1,lineDash:'solid',type:'BASIC_POINT',mbglType:'circle'};if(['LINE','LINESTRING','MULTILINESTRING'].includes(featureType)){styleParameters.strokeColor='#4CC8A3';styleParameters.strokeWidth=2;styleParameters.mbglType='line';}else if(['REGION','POLYGON','MULTIPOLYGON'].includes(featureType)){styleParameters.fillColor='#826DBA';styleParameters.mbglType='fill';}return styleParameters;}},{key:"_transformFeatures",value:function _transformFeatures(features){var _this14=this;features&&features.forEach(function(feature,index){var geometryType=feature.geometry.type;var coordinates=feature.geometry.coordinates;if(geometryType==='LineString'){coordinates.forEach(function(coordinate,index){coordinate=_this14._unproject(coordinate);coordinates[index]=coordinate;},_this14);}else if(geometryType==='Point'){coordinates=_this14._unproject(coordinates);feature.geometry.coordinates=coordinates;}else if(geometryType==='MultiPolygon'||geometryType==='Polygon'){coordinates.forEach(function(coordinate,index){var coords=geometryType==='MultiPolygon'?coordinate[0]:coordinate;coords.forEach(function(latlng,index){latlng=_this14._unproject(latlng);coords[index]=latlng;});coordinates[index]=coordinate;});}features[index]=feature;},this);}},{key:"getSourceListModel",get:function get(){return this._sourceListModel;}}]);return WebMapViewModel;}(mapbox_gl_enhance_js_default.a.Evented);
// CONCATENATED MODULE: ./src/mapboxgl/web-map/index.tsx
var web_map_WebMap=/*#__PURE__*/function(_React$Component){_inherits(WebMap,_React$Component);// state: WebMapState
function WebMap(props){var _this;_classCallCheck(this,WebMap);_this=_possibleConstructorReturn(this,_getPrototypeOf(WebMap).call(this,props));_this.initializeWebMap=function(){var _this$props=_this.props,target=_this$props.target,serverUrl=_this$props.serverUrl,accessToken=_this$props.accessToken,accessKey=_this$props.accessKey,tiandituKey=_this$props.tiandituKey,withCredentials=_this$props.withCredentials,excludePortalProxyUrl=_this$props.excludePortalProxyUrl,mapOptions=_this$props.mapOptions;_this.setState({viewModel:new WebMapViewModel_WebMapViewModel(_this.props.mapId,{target:target,serverUrl:serverUrl,accessToken:accessToken,accessKey:accessKey,tiandituKey:tiandituKey,withCredentials:withCredentials,excludePortalProxyUrl:excludePortalProxyUrl},mapOptions)});};_this.registerEvents=function(){_this.state.viewModel&&_this.state.viewModel.on('addlayerssucceeded',function(e){_this.setState({spinning:false});e.map.resize();});};_this.state={viewModelProps:['mapId','serverUrl','mapOptions.center','mapOptions.zoom','mapOptions.style','mapOptions.crs','mapOptions.minZoom','mapOptions.maxZoom','mapOptions.maxBounds','mapOptions.renderWorldCopies','mapOptions.bearing','mapOptions.pitch','withCredentials']};return _this;}_createClass(WebMap,[{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){var _this2=this;if(this.state.viewModel){this.state.viewModelProps.forEach(function(prop){var propArr=prop.split('.');var funcName="set".concat(propArr[propArr.length-1].charAt(0).toUpperCase()).concat(propArr[propArr.length-1].slice(1));if(propArr.length>1){if(_this2.props[propArr[0]]&&_this2.props[propArr[0]][propArr[1]]&&(!prevProps.mapOptions||_this2.props[propArr[0]][propArr[1]]!==prevProps[propArr[0]][propArr[1]])){_this2.state.viewModel[funcName](_this2.props[propArr[0]][propArr[1]]);}}else{if(_this2.props[propArr[0]]&&_this2.props[propArr[0]]!==prevProps[propArr[0]]){_this2.state.viewModel[funcName](_this2.props.mapId);}}});}}},{key:"componentDidMount",value:function componentDidMount(){this.initializeWebMap();this.registerEvents();}},{key:"render",value:function render(){var target=this.props.target;return external_root_React_commonjs_React_commonjs2_React_amd_React_["createElement"]("div",{id:target,className:"sm-component-web-map"});}}]);return WebMap;}(external_root_React_commonjs_React_commonjs2_React_amd_React_["Component"]);web_map_WebMap.defaultProps={target:'map'};/* harmony default export */ var web_map = (web_map_WebMap);
// CONCATENATED MODULE: ./src/mapboxgl/components.tsx

// CONCATENATED MODULE: ./src/mapboxgl/index.tsx
/* harmony default export */ var mapboxgl = __webpack_exports__["default"] = (components_namespaceObject);

/***/ })
/******/ ])["default"];
});