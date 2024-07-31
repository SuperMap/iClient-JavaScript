/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4537:
/***/ (function(module) {

(function (self) {
  'use strict';

  // if __disableNativeFetch is set to true, the it will always polyfill fetch
  // with Ajax.
  if (!self.__disableNativeFetch && self.fetch) {
    return;
  }
  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }
  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }
  function Headers(headers) {
    this.map = {};
    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }
  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };
  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };
  Headers.prototype.get = function (name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };
  Headers.prototype.getAll = function (name) {
    return this.map[normalizeName(name)] || [];
  };
  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };
  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  };
  Headers.prototype.forEach = function (callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function (name) {
      this.map[name].forEach(function (value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };
  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }
  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }
  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
  }
  function readBlobAsText(blob, options) {
    var reader = new FileReader();
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : '';
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/;
    var _charset = blob.type.match(regex) || contentType.match(regex);
    var args = [blob];
    if (_charset) {
      args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''));
    }
    reader.readAsText.apply(reader, args);
    return fileReaderReady(reader);
  }
  var support = {
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };
  function Body() {
    this.bodyUsed = false;
    this._initBody = function (body, options) {
      this._bodyInit = body;
      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
        this._options = options;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (!body) {
        this._bodyText = '';
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type');
      }
    };
    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };
      this.arrayBuffer = function () {
        return this.blob().then(readBlobAsArrayBuffer);
      };
      this.text = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob, this._options);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function () {
        var rejected = consumed(this);
        return rejected ? rejected : Promise.resolve(this._bodyText);
      };
    }
    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }
    this.json = function () {
      return this.text().then(JSON.parse);
    };
    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }
  function Request(input, options) {
    options = options || {};
    var body = options.body;
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = input;
    }
    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;
    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body, options);
  }
  Request.prototype.clone = function () {
    return new Request(this);
  };
  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }
  function headers(xhr) {
    var head = new Headers();
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function (header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }
  Body.call(Request.prototype);
  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }
    this._initBody(bodyInit, options);
    this.type = 'default';
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
    this.url = options.url || '';
  }
  Body.call(Response.prototype);
  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };
  Response.error = function () {
    var response = new Response(null, {
      status: 0,
      statusText: ''
    });
    response.type = 'error';
    return response;
  };
  var redirectStatuses = [301, 302, 303, 307, 308];
  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }
    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;
  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }
      var xhr = new XMLHttpRequest();
      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }
        return;
      }
      var __onLoadHandled = false;
      function onload() {
        if (xhr.readyState !== 4) {
          return;
        }
        var status = xhr.status === 1223 ? 204 : xhr.status;
        if (status < 100 || status > 599) {
          if (__onLoadHandled) {
            return;
          } else {
            __onLoadHandled = true;
          }
          reject(new TypeError('Network request failed'));
          return;
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        };
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        if (__onLoadHandled) {
          return;
        } else {
          __onLoadHandled = true;
        }
        resolve(new Response(body, options));
      }
      xhr.onreadystatechange = onload;
      xhr.onload = onload;
      xhr.onerror = function () {
        if (__onLoadHandled) {
          return;
        } else {
          __onLoadHandled = true;
        }
        reject(new TypeError('Network request failed'));
      };
      xhr.open(request.method, request.url, true);

      // `withCredentials` should be setted after calling `.open` in IE10
      // http://stackoverflow.com/a/19667959/1219343
      try {
        if (request.credentials === 'include') {
          if ('withCredentials' in xhr) {
            xhr.withCredentials = true;
          } else {
            console && console.warn && console.warn('withCredentials is not supported, you can ignore this warning');
          }
        }
      } catch (e) {
        console && console.warn && console.warn('set withCredentials error:' + e);
      }
      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }
      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;

  // Support CommonJS
  if ( true && module.exports) {
    module.exports = self.fetch;
  }
})(typeof self !== 'undefined' ? self : this);

/***/ }),

/***/ 9005:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };
  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }
  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }
  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }
  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;
    var timeoutId = undefined;
    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;
      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });
        if (timeoutId) clearTimeout(timeoutId);
        removeScript(scriptId);
        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';
      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);
      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));
        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = function () {
          clearFunction(callbackFunction);
        };
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));
        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});

/***/ }),

/***/ 3819:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
})(this, function () {
  'use strict';

  /**
   * @this {Promise}
   */
  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(function (value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        // @ts-ignore
        return constructor.reject(reason);
      });
    });
  }
  function allSettled(arr) {
    var P = this;
    return new P(function (resolve, reject) {
      if (!(arr && typeof arr.length !== 'undefined')) {
        return reject(new TypeError(_typeof(arr) + ' ' + arr + ' is not iterable(cannot read property Symbol(Symbol.iterator))'));
      }
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;
      function res(i, val) {
        if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(val, function (val) {
              res(i, val);
            }, function (e) {
              args[i] = {
                status: 'rejected',
                reason: e
              };
              if (--remaining === 0) {
                resolve(args);
              }
            });
            return;
          }
        }
        args[i] = {
          status: 'fulfilled',
          value: val
        };
        if (--remaining === 0) {
          resolve(args);
        }
      }
      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  }

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;
  function isArray(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }
  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  /**
   * @constructor
   * @param {Function} fn
   */
  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */
    this._state = 0;
    /** @type {!boolean} */
    this._handled = false;
    /** @type {Promise|undefined} */
    this._value = undefined;
    /** @type {!Array<!Function>} */
    this._deferreds = [];
    doResolve(fn, this);
  }
  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }
  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (_typeof(newValue) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }
  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }
  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }
    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  /**
   * @constructor
   */
  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }
  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };
  Promise.prototype.then = function (onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop);
    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };
  Promise.prototype['finally'] = finallyConstructor;
  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;
      function res(i, val) {
        try {
          if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }
      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };
  Promise.allSettled = allSettled;
  Promise.resolve = function (value) {
    if (value && _typeof(value) === 'object' && value.constructor === Promise) {
      return value;
    }
    return new Promise(function (resolve) {
      resolve(value);
    });
  };
  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };
  Promise.race = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }
      for (var i = 0, len = arr.length; i < len; i++) {
        Promise.resolve(arr[i]).then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn =
  // @ts-ignore
  typeof setImmediate === 'function' && function (fn) {
    // @ts-ignore
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };
  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /** @suppress {undefinedVars} */
  var globalNS = function () {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof __webpack_require__.g !== 'undefined') {
      return __webpack_require__.g;
    }
    throw new Error('unable to locate global object');
  }();

  // Expose the polyfill if Promise is undefined or set to a
  // non-function value. The latter can be due to a named HTMLElement
  // being exposed by browsers for legacy reasons.
  // https://github.com/taylorhakes/promise-polyfill/issues/114
  if (typeof globalNS['Promise'] !== 'function') {
    globalNS['Promise'] = Promise;
  } else {
    if (!globalNS.Promise.prototype['finally']) {
      globalNS.Promise.prototype['finally'] = finallyConstructor;
    }
    if (!globalNS.Promise.allSettled) {
      globalNS.Promise.allSettled = allSettled;
    }
  }
});

/***/ }),

/***/ 6369:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.19.11
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';

  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (( false ? 0 : _typeof(module)) === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";
   console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;
  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }
    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }
    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0, 1);
        } else {
          break;
        }
      }
      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }
    if (_current > _best) {
      best = current;
      _best = _current;
    }
    if (_best > 1) {
      segments.splice(best, _best, '');
    }
    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '') {
      result = ':';
    }
    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }
      result += ':';
    }
    if (segments[length - 1] === '') {
      result += ':';
    }
    return result;
  }
  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }
    return this;
  }
  return {
    best: bestPresentation,
    noConflict: noConflict
  };
});

/***/ }),

/***/ 7011:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.19.11
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';

  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (( false ? 0 : _typeof(module)) === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;
  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac': ' com gov mil net org ',
      'ae': ' ac co gov mil name net org pro sch ',
      'af': ' com edu gov net org ',
      'al': ' com edu gov mil net org ',
      'ao': ' co ed gv it og pb ',
      'ar': ' com edu gob gov int mil net org tur ',
      'at': ' ac co gv or ',
      'au': ' asn com csiro edu gov id net org ',
      'ba': ' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb': ' biz co com edu gov info net org store tv ',
      'bh': ' biz cc com edu gov info net org ',
      'bn': ' com edu gov net org ',
      'bo': ' com edu gob gov int mil net org tv ',
      'br': ' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs': ' com edu gov net org ',
      'bz': ' du et om ov rg ',
      'ca': ' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck': ' biz co edu gen gov info net org ',
      'cn': ' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co': ' com edu gov mil net nom org ',
      'cr': ' ac c co ed fi go or sa ',
      'cy': ' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do': ' art com edu gob gov mil net org sld web ',
      'dz': ' art asso com edu gov net org pol ',
      'ec': ' com edu fin gov info med mil net org pro ',
      'eg': ' com edu eun gov mil name net org sci ',
      'er': ' com edu gov ind mil net org rochest w ',
      'es': ' com edu gob nom org ',
      'et': ' biz com edu gov info name net org ',
      'fj': ' ac biz com info mil name net org pro ',
      'fk': ' ac co gov net nom org ',
      'fr': ' asso com f gouv nom prd presse tm ',
      'gg': ' co net org ',
      'gh': ' com edu gov mil org ',
      'gn': ' ac com gov net org ',
      'gr': ' com edu gov mil net org ',
      'gt': ' com edu gob ind mil net org ',
      'gu': ' com edu gov net org ',
      'hk': ' com edu gov idv net org ',
      'hu': ' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id': ' ac co go mil net or sch web ',
      'il': ' ac co gov idf k12 muni net org ',
      'in': ' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq': ' com edu gov i mil net org ',
      'ir': ' ac co dnssec gov i id net org sch ',
      'it': ' edu gov ',
      'je': ' co net org ',
      'jo': ' com edu gov mil name net org sch ',
      'jp': ' ac ad co ed go gr lg ne or ',
      'ke': ' ac co go info me mobi ne or sc ',
      'kh': ' com edu gov mil net org per ',
      'ki': ' biz com de edu gov info mob net org tel ',
      'km': ' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn': ' edu gov net org ',
      'kr': ' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw': ' com edu gov net org ',
      'ky': ' com edu gov net org ',
      'kz': ' com edu gov mil net org ',
      'lb': ' com edu gov net org ',
      'lk': ' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr': ' com edu gov net org ',
      'lv': ' asn com conf edu gov id mil net org ',
      'ly': ' com edu gov id med net org plc sch ',
      'ma': ' ac co gov m net org press ',
      'mc': ' asso tm ',
      'me': ' ac co edu gov its net org priv ',
      'mg': ' com edu gov mil nom org prd tm ',
      'mk': ' com edu gov inf name net org pro ',
      'ml': ' com edu gov net org presse ',
      'mn': ' edu gov org ',
      'mo': ' com edu gov net org ',
      'mt': ' com edu gov net org ',
      'mv': ' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw': ' ac co com coop edu gov int museum net org ',
      'mx': ' com edu gob net org ',
      'my': ' com edu gov mil name net org sch ',
      'nf': ' arts com firm info net other per rec store web ',
      'ng': ' biz com edu gov mil mobi name net org sch ',
      'ni': ' ac co com edu gob mil net nom org ',
      'np': ' com edu gov mil net org ',
      'nr': ' biz com edu gov info net org ',
      'om': ' ac biz co com edu gov med mil museum net org pro sch ',
      'pe': ' com edu gob mil net nom org sld ',
      'ph': ' com edu gov i mil net ngo org ',
      'pk': ' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl': ' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr': ' ac biz com edu est gov info isla name net org pro prof ',
      'ps': ' com edu gov net org plo sec ',
      'pw': ' belau co ed go ne or ',
      'ro': ' arts com firm info nom nt org rec store tm www ',
      'rs': ' ac co edu gov in org ',
      'sb': ' com edu gov net org ',
      'sc': ' com edu gov net org ',
      'sh': ' co com edu gov net nom org ',
      'sl': ' com edu gov net org ',
      'st': ' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv': ' com edu gob org red ',
      'sz': ' ac co org ',
      'tr': ' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt': ' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw': ' club com ebiz edu game gov idv mil net org ',
      'mu': ' ac co com gov net or org ',
      'mz': ' ac co edu gov org ',
      'na': ' co com ',
      'nz': ' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa': ' abo ac com edu gob ing med net nom org sld ',
      'pt': ' com edu gov int net nome org publ ',
      'py': ' com edu gov mil net org ',
      'qa': ' com edu gov mil net org ',
      're': ' asso com nom ',
      'ru': ' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw': ' ac co com edu gouv gov int mil net ',
      'sa': ' com edu gov med net org pub sch ',
      'sd': ' com edu gov info med net org tv ',
      'se': ' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg': ' com edu gov idn net org per ',
      'sn': ' art com edu gouv org perso univ ',
      'sy': ' com edu gov mil net news org ',
      'th': ' ac co go in mi net or ',
      'tj': ' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn': ' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz': ' ac co go ne or ',
      'ua': ' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug': ' ac co go ne or org sc ',
      'uk': ' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us': ' dni fed isa kids nsn ',
      'uy': ' com edu gub mil net org ',
      've': ' co com edu gob info mil net org web ',
      'vi': ' co com k12 net org ',
      'vn': ' ac biz com edu gov health info int name net org pro ',
      'ye': ' co com gov ltd me net org plc ',
      'yu': ' ac co edu gov org ',
      'za': ' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm': ' ac co com edu gov net org sch ',
      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
      'net': 'gb jp se uk ',
      'org': 'ae',
      'de': 'com '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function has(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset <= 0 || sldOffset >= tldOffset - 1) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') >= 0;
    },
    is: function is(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function get(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset <= 0 || sldOffset >= tldOffset - 1) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset + 1);
    },
    noConflict: function noConflict() {
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };
  return SLD;
});

/***/ }),

/***/ 9216:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.11
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict';

  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (( false ? 0 : _typeof(module)) === 'object' && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(2323), __webpack_require__(6369), __webpack_require__(7011));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2323), __webpack_require__(6369), __webpack_require__(7011)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (punycode, IPv6, SLD, root) {
  'use strict';

  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;
  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }
        return new URI(url);
      }
      return new URI();
    }
    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }
      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }
    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }
    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }
    return this;
  }
  function isInteger(value) {
    return /^[0-9]+$/.test(value);
  }
  URI.version = '1.19.11';
  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;
  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }
  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }
    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }
  function isArray(obj) {
    return getType(obj) === 'Array';
  }
  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;
    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }
    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }
    return data;
  }
  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }
      return true;
    }
    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }
    return false;
  }
  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }
    one.sort();
    two.sort();
    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }
    return true;
  }
  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }
  URI._parts = function () {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      preventInvalidHostname: URI.preventInvalidHostname,
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: throw on invalid hostname
  // see https://github.com/medialize/URI.js/pull/345
  // and https://github.com/medialize/URI.js/issues/354
  URI.preventInvalidHostname = false;
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\._-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g
  };
  URI.leading_whitespace_expression = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
  // https://infra.spec.whatwg.org/#ascii-tab-or-newline
  URI.ascii_tab_whitespace = /[\u0009\u000A\u000D]+/g;
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // list of protocols which always require a hostname
  URI.hostProtocols = ['http', 'https'];

  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src',
    // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function (node) {
    if (!node || !node.nodeName) {
      return undefined;
    }
    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }
    return URI.domAttributes[nodeName];
  };
  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string).replace(/[!'()*]/g, escapeForDumbFirefox36).replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function () {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function () {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function (string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }
    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function (string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }
    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch (e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {
    'encode': 'encode',
    'decode': 'decode'
  };
  var _part;
  var generateAccessor = function generateAccessor(_group, _part) {
    return function (string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function (c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };
  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }
  var generateSegmentedPathFunction = function generateSegmentedPathFunction(_sep, _codingFuncName, _innerCodingFuncName) {
    return function (string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function actualCodingFunc(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }
      var segments = (string + '').split(_sep);
      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }
      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');
  URI.encodeReserved = generateAccessor('reserved', 'encode');
  URI.parse = function (string, parts) {
    var pos;
    if (!parts) {
      parts = {
        preventInvalidHostname: URI.preventInvalidHostname
      };
    }
    string = string.replace(URI.leading_whitespace_expression, '');
    // https://infra.spec.whatwg.org/#ascii-tab-or-newline
    string = string.replace(URI.ascii_tab_whitespace, '');

    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // slashes and backslashes have lost all meaning for the web protocols (https, http, wss, ws)
    string = string.replace(/^(https?|ftp|wss?)?:+[/\\]*/i, '$1://');
    // slashes and backslashes have lost all meaning for scheme relative URLs
    string = string.replace(/^[/\\]{2,}/i, '//');

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3).replace(/\\/g, '/') === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function (string, parts) {
    if (!string) {
      string = '';
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;
    if (pos === -1) {
      pos = string.length;
    }
    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }
    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }
    if (parts.preventInvalidHostname) {
      URI.ensureValidHostname(parts.hostname, parts.protocol);
    }
    if (parts.port) {
      URI.ensureValidPort(parts.port);
    }
    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function (string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function (string, parts) {
    // extract username:password
    var _string = string;
    var firstBackSlash = string.indexOf('\\');
    if (firstBackSlash !== -1) {
      string = string.replace(/\\/g, '/');
    }
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path or \path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = _string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }
    return string;
  };
  URI.parseQuery = function (string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
    if (!string) {
      return {};
    }
    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;
    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;
      if (name === '__proto__') {
        // ignore attempt at exploiting JavaScript internals
        continue;
      } else if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }
        items[name].push(value);
      } else {
        items[name] = value;
      }
    }
    return items;
  };
  URI.build = function (parts) {
    var t = '';
    var requireAbsolutePath = false;
    if (parts.protocol) {
      t += parts.protocol + ':';
    }
    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
      requireAbsolutePath = true;
    }
    t += URI.buildAuthority(parts) || '';
    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && requireAbsolutePath) {
        t += '/';
      }
      t += parts.path;
    }
    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }
    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function (parts) {
    var t = '';
    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }
    if (parts.port) {
      t += ':' + parts.port;
    }
    return t;
  };
  URI.buildAuthority = function (parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function (parts) {
    var t = '';
    if (parts.username) {
      t += URI.encode(parts.username);
    }
    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }
    if (t) {
      t += '@';
    }
    return t;
  };
  URI.buildQuery = function (data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (key === '__proto__') {
        // ignore attempt at exploiting JavaScript internals
        continue;
      } else if (hasOwn.call(data, key)) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }
    return t.substring(1);
  };
  URI.buildQueryParameter = function (name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };
  URI.addQuery = function (data, name, value) {
    if (_typeof(name) === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }
      if (!isArray(value)) {
        value = [value];
      }
      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };
  URI.setQuery = function (data, name, value) {
    if (_typeof(name) === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.setQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      data[name] = value === undefined ? null : value;
    } else {
      throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
    }
  };
  URI.removeQuery = function (data, name, value) {
    var i, length, key;
    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (_typeof(name) === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function (data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;
      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }
        return false;
      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }
        return true;
      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }
    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data;
      // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;
      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);
      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }
        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);
      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }
        if (!withinArray) {
          return false;
        }
        return arrayContains(data[name], value);
      case 'Number':
        value = String(value);
      /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }
        if (!withinArray) {
          return false;
        }
        return arrayContains(data[name], value);
      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };
  URI.joinPaths = function () {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;
    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }
        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }
    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }
    var uri = new URI('').segment(segments);
    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }
    return uri.normalize();
  };
  URI.commonPath = function (one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }
    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }
    return one.substring(0, pos + 1);
  };
  URI.withinString = function (string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _parens = options.parens || URI.findUri.parens;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;
    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }
      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }
      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end);
      // make sure we include well balanced parens
      var parensEnd = -1;
      while (true) {
        var parensMatch = _parens.exec(slice);
        if (!parensMatch) {
          break;
        }
        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }
      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }
      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }
      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }
      end = start + slice.length;
      var result = callback(slice, start, end, string);
      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }
      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }
    _start.lastIndex = 0;
    return string;
  };
  URI.ensureValidHostname = function (v, protocol) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    var hasHostname = !!v; // not null and not an empty string
    var hasProtocol = !!protocol;
    var rejectEmptyHostname = false;
    if (hasProtocol) {
      rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
    }
    if (rejectEmptyHostname && !hasHostname) {
      throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
    } else if (v && v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
      }
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
      }
    }
  };
  URI.ensureValidPort = function (v) {
    if (!v) {
      return;
    }
    var port = Number(v);
    if (isInteger(port) && port > 0 && port < 65536) {
      return;
    }
    throw new TypeError('Port "' + v + '" is not a valid port');
  };

  // noConflict
  URI.noConflict = function (removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };
      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }
      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }
      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }
      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }
    return this;
  };
  p.build = function (deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }
    return this;
  };
  p.clone = function () {
    return new URI(this);
  };
  p.valueOf = p.toString = function () {
    return this.build(false)._string;
  };
  function generateSimpleAccessor(_part) {
    return function (v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }
  function generatePrefixAccessor(_part, _key) {
    return function (v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }
        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }
  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');
  p.search = function (v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? '?' + t : t;
  };
  p.hash = function (v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? '#' + t : t;
  };
  p.pathname = function (v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function (href, build) {
    var key;
    if (href === undefined) {
      return this.toString();
    }
    this._string = '';
    this._parts = URI._parts();
    var _URI = href instanceof URI;
    var _object = _typeof(href) === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }
    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (key === 'query') {
          continue;
        }
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
      if (src.query) {
        this.query(src.query, false);
      }
    } else {
      throw new TypeError('invalid input');
    }
    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function (what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;
    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }
    switch (what.toLowerCase()) {
      case 'relative':
        return relative;
      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;
      case 'sld':
        return sld;
      case 'ip':
        return ip;
      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;
      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;
      case 'idn':
        return idn;
      case 'url':
        return !this._parts.urn;
      case 'urn':
        return !!this._parts.urn;
      case 'punycode':
        return punycode;
    }
    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;
  p.protocol = function (v, build) {
    if (v) {
      // accept trailing ://
      v = v.replace(/:(\/\/)?$/, '');
      if (!v.match(URI.protocol_expression)) {
        throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
      }
    }
    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }
      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }
        URI.ensureValidPort(v);
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v !== undefined) {
      var x = {
        preventInvalidHostname: this._parts.preventInvalidHostname
      };
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
      v = x.hostname;
      if (this._parts.preventInvalidHostname) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }
    }
    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }
      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this.protocol(origin.protocol()).authority(origin.authority()).build(!build);
      return this;
    }
  };
  p.host = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
      this.build(!build);
      return this;
    }
  };
  p.authority = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
      this.build(!build);
      return this;
    }
  };
  p.userinfo = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length - 1) : t;
    } else {
      if (v[v.length - 1] !== '@') {
        v += '@';
      }
      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function (v, build) {
    var parts;
    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }
    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));
      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }
      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }
      if (v) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }
      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end - 1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }
      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }
      URI.ensureValidHostname(v, this._parts.protocol);
      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.tld = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }
      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);
      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }
      return tld;
    } else {
      var replace;
      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.directory = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }
      if (this._parts.path === '/') {
        return '/';
      }
      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');
      return v ? URI.decodePath(res) : res;
    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }
        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }
      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos + 1);
      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;
      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }
      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }
      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }
      return this;
    }
  };
  p.suffix = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }
      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;
      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos + 1);
      res = /^[a-z0-9%]+$/i.test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }
      var suffix = this.suffix();
      var replace;
      if (!suffix) {
        if (!v) {
          return this;
        }
        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }
      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.segment = function (segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);
    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }
    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }
    if (absolute) {
      segments.shift();
    }
    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }
    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined ? segments : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i = 0, l = v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length - 1].length)) {
            continue;
          }
          if (segments.length && !segments[segments.length - 1].length) {
            segments.pop();
          }
          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length - 1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length - 1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }
    if (absolute) {
      segments.unshift('');
    }
    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function (segment, v, build) {
    var segments, i, l;
    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }
    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }
      return segments;
    }
    if (!isArray(v)) {
      v = typeof v === 'string' || v instanceof String ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }
    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function (v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (_typeof(name) === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.addQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.removeQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.hasQuery = function (name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function () {
    if (this._parts.urn) {
      return this.normalizeProtocol(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
    }
    return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
  };
  p.normalizeProtocol = function (build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }
    return this;
  };
  p.normalizeHostname = function (build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }
      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }
    return this;
  };
  p.normalizePort = function (build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }
    return this;
  };
  p.normalizePath = function (build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }
    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }
    if (this._parts.path === '/') {
      return this;
    }
    _path = URI.recodePath(_path);
    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }
      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }
    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function (build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }
      this.build(!build);
    }
    return this;
  };
  p.normalizeFragment = function (build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }
    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;
  p.iso8859 = function () {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };
  p.unicode = function () {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };
  p.readable = function () {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }
    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }
    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }
    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace).replace(/&/g, '%26');
        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace).replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }
    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function (base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;
    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }
    if (!(base instanceof URI)) {
      base = new URI(base);
    }
    if (resolved._parts.protocol) {
      // Directly returns even if this._parts.hostname is empty.
      return resolved;
    } else {
      resolved._parts.protocol = base._parts.protocol;
    }
    if (this._parts.hostname) {
      return resolved;
    }
    for (i = 0; p = properties[i]; i++) {
      resolved._parts[p] = base._parts[p];
    }
    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }
      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? basedir + '/' : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }
    resolved.build();
    return resolved;
  };
  p.relativeTo = function (base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;
    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }
    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();
    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }
    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }
    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }
    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }
    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }
    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }
    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }
    var parents = baseParts.path.substring(common.length).replace(/[^\/]*$/, '').replace(/.*?\//g, '../');
    relativeParts.path = parents + relativeParts.path.substring(common.length) || './';
    return relative.build();
  };

  // comparing URIs
  p.equals = function (uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;
    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }
    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);
    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }
        checked[key] = true;
      }
    }
    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }
    return true;
  };

  // state
  p.preventInvalidHostname = function (v) {
    this._parts.preventInvalidHostname = !!v;
    return this;
  };
  p.duplicateQueryParameters = function (v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };
  p.escapeQuerySpace = function (v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };
  return URI;
});

/***/ }),

/***/ 2323:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*! https://mths.be/punycode v1.4.0 by @mathias */
;
(function (root) {
  /** Detect free variables */
  var freeExports = ( false ? 0 : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
  var freeModule = ( false ? 0 : _typeof(module)) == 'object' && module && !module.nodeType && module;
  var freeGlobal = (typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) == 'object' && __webpack_require__.g;
  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
    root = freeGlobal;
  }

  /**
   * The `punycode` object.
   * @name punycode
   * @type Object
   */
  var punycode,
    /** Highest positive signed 32-bit float value */
    maxInt = 2147483647,
    // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    base = 36,
    tMin = 1,
    tMax = 26,
    skew = 38,
    damp = 700,
    initialBias = 72,
    initialN = 128,
    // 0x80
    delimiter = '-',
    // '\x2D'

    /** Regular expressions */
    regexPunycode = /^xn--/,
    regexNonASCII = /[^\x20-\x7E]/,
    // unprintable ASCII chars + non-ASCII chars
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
    // RFC 3490 separators

    /** Error messages */
    errors = {
      'overflow': 'Overflow: input needs wider integers to process',
      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
      'invalid-input': 'Invalid input'
    },
    /** Convenience shortcuts */
    baseMinusTMin = base - tMin,
    floor = Math.floor,
    stringFromCharCode = String.fromCharCode,
    /** Temporary variable */
    key;

  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */
  function error(type) {
    throw new RangeError(errors[type]);
  }

  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */
  function map(array, fn) {
    var length = array.length;
    var result = [];
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  }

  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */
  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';
    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    }
    // Avoid `split(regex)` for IE8 compatibility. See #17.
    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map(labels, fn).join('.');
    return result + encoded;
  }

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */
  function ucs2decode(string) {
    var output = [],
      counter = 0,
      length = string.length,
      value,
      extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) {
          // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }

  /**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */
  function ucs2encode(array) {
    return map(array, function (value) {
      var output = '';
      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }
      output += stringFromCharCode(value);
      return output;
    }).join('');
  }

  /**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */
  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }
    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }
    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }
    return base;
  }

  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */
  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */
  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for /* no initialization */
    (; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }

  /**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */
  function decode(input) {
    // Don't use UCS-2
    var output = [],
      inputLength = input.length,
      out,
      i = 0,
      n = initialN,
      bias = initialBias,
      basic,
      j,
      index,
      oldi,
      w,
      k,
      digit,
      t,
      /** Cached calculation results */
      baseMinusT;

    // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.

    basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }
    for (j = 0; j < basic; ++j) {
      // if it's not a basic code point
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }
      output.push(input.charCodeAt(j));
    }

    // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.

    for /* no final expression */
    (index = basic > 0 ? basic + 1 : 0; index < inputLength;) {
      // `index` is the index of the next character to be consumed.
      // Decode a generalized variable-length integer into `delta`,
      // which gets added to `i`. The overflow checking is easier
      // if we increase `i` as we go, then subtract off its starting
      // value at the end to obtain `delta`.
      for /* no condition */
      (oldi = i, w = 1, k = base;; k += base) {
        if (index >= inputLength) {
          error('invalid-input');
        }
        digit = basicToDigit(input.charCodeAt(index++));
        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }
        i += digit * w;
        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
        if (digit < t) {
          break;
        }
        baseMinusT = base - t;
        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }
        w *= baseMinusT;
      }
      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);

      // `i` was supposed to wrap around from `out` to `0`,
      // incrementing `n` each time, so we'll fix that now:
      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }
      n += floor(i / out);
      i %= out;

      // Insert `n` at position `i` of the output
      output.splice(i++, 0, n);
    }
    return ucs2encode(output);
  }

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */
  function encode(input) {
    var n,
      delta,
      handledCPCount,
      basicLength,
      bias,
      j,
      m,
      q,
      k,
      t,
      currentValue,
      output = [],
      /** `inputLength` will hold the number of code points in `input`. */
      inputLength,
      /** Cached calculation results */
      handledCPCountPlusOne,
      baseMinusT,
      qMinusT;

    // Convert the input in UCS-2 to Unicode
    input = ucs2decode(input);

    // Cache the length
    inputLength = input.length;

    // Initialize the state
    n = initialN;
    delta = 0;
    bias = initialBias;

    // Handle the basic code points
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }
    handledCPCount = basicLength = output.length;

    // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.

    // Finish the basic string - if it is not empty - with a delimiter
    if (basicLength) {
      output.push(delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow
      handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }
      delta += (m - n) * handledCPCountPlusOne;
      n = m;
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }
        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for /* no condition */
          (q = delta, k = base;; k += base) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) {
              break;
            }
            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
            q = floor(qMinusT / baseMinusT);
          }
          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }
      ++delta;
      ++n;
    }
    return output.join('');
  }

  /**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */
  function toUnicode(input) {
    return mapDomain(input, function (string) {
      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
  }

  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */
  function toASCII(input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
  }

  /*--------------------------------------------------------------------------*/

  /** Define the public API */
  punycode = {
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */
    'version': '1.3.2',
    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */
    'ucs2': {
      'decode': ucs2decode,
      'encode': ucs2encode
    },
    'decode': decode,
    'encode': encode,
    'toASCII': toASCII,
    'toUnicode': toUnicode
  };

  /** Expose `punycode` */
  // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:
  if ( true && _typeof(__webpack_require__.amdO) == 'object' && __webpack_require__.amdO) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return punycode;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (freeExports && freeModule) {
    if (module.exports == freeExports) {
      // in Node.js, io.js, or RingoJS v0.8.0+
      freeModule.exports = punycode;
    } else {
      // in Narwhal or RingoJS v0.7.0-
      for (key in punycode) {
        punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
      }
    }
  } else {
    // in Rhino or a web browser
    root.punycode = punycode;
  }
})(this);

/***/ }),

/***/ 4257:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: AddressMatchService, BuffersAnalystJobsParameter, DatasetService, DatasourceService, ElasticSearch, FetchRequest, GeoCodingParameter, GeoDecodingParameter, KernelDensityJobParameter, MapVLayer, MapVRenderer, MappingParameters, OutputSetting, OverlayGeoJobParameter, ProcessingService, SecurityManager, SingleObjectQueryJobsParameter, SummaryAttributesJobsParameter, SummaryMeshJobParameter, SummaryRegionJobParameter, SuperMap, TopologyValidatorJobsParameter, Util, VectorClipJobsParameter

;// CONCATENATED MODULE: ./src/common/commontypes/Pixel.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class Pixel
 * @deprecatedclass SuperMap.Pixel
 * @category BaseTypes Geometry
 * @classdesc 用 x,y 坐标描绘屏幕坐标（像素点）。
 * @param {number} [x=0.0] - x 坐标。
 * @param {number} [y=0.0] - y 坐标。
 * @param {Pixel.Mode} [mode=Pixel.Mode.LeftTop] - 坐标模式。
 *
 * @example
 * //单独创建一个对象
 * var pixcel = new Pixel(100,50);
 *
 * //依据 size 创建
 *  var size = new Size(21,25);
 *  var offset = new Pixel(-(size.w/2), -size.h);
 * @usage
 */
var Pixel = /*#__PURE__*/function () {
  function Pixel(x, y, mode) {
    _classCallCheck(this, Pixel);
    /**
     * @member {number} [Pixel.prototype.x=0.0]
     * @description x 坐标。
     */
    this.x = x ? parseFloat(x) : 0.0;

    /**
     * @member {number} [Pixel.prototype.y=0.0]
     * @description y 坐标。
     */
    this.y = y ? parseFloat(y) : 0.0;

    /**
     * @member {Pixel.Mode} [Pixel.prototype.mode=Pixel.Mode.LeftTop]
     * @description 坐标模式，有左上、右上、右下、左下这几种模式，分别表示相对于左上角、右上角、右下角、左下角的坐标。
     */
    this.mode = mode;
    this.CLASS_NAME = 'SuperMap.Pixel';
  }

  /**
   * @function Pixel.prototype.toString
   * @description 返回此对象的字符串形式。
   * @example
   *
   * var pixcel = new Pixel(100,50);
   * var str = pixcel.toString();
   *
   * @returns {string} 例如: "x=200.4,y=242.2"
   */
  _createClass(Pixel, [{
    key: "toString",
    value: function toString() {
      return 'x=' + this.x + ',y=' + this.y;
    }

    /**
     * @function Pixel.prototype.clone
     * @description 克隆当前的 pixel 对象。
     * @example
     * var pixcel = new Pixel(100,50);
     * var pixcel2 = pixcel.clone();
     * @returns {Pixel} 新的与当前 pixel 对象有相同 x、y 坐标的 pixel 对象。
     */
  }, {
    key: "clone",
    value: function clone() {
      return new Pixel(this.x, this.y, this.mode);
    }

    /**
     * @function Pixel.prototype.equals
     * @description 比较两 pixel 是否相等。
     * @example
     * var pixcel = new Pixel(100,50);
     * var pixcel2 = new Pixel(100,50);
     * var isEquals = pixcel.equals(pixcel2);
     *
     * @param {Pixel} px - 用于比较相等的 pixel 对象。
     * @returns {boolean} 如果传入的像素点和当前像素点相同返回 true，如果不同或传入参数为 NULL 则返回 false。
     */
  }, {
    key: "equals",
    value: function equals(px) {
      var equals = false;
      if (px != null) {
        equals = this.x == px.x && this.y == px.y || isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y);
      }
      return equals;
    }

    /**
     * @function Pixel.prototype.distanceTo
     * @description 返回两个 pixel 的距离。
     * @example
     * var pixcel = new Pixel(100,50);
     * var pixcel2 = new Pixel(110,30);
     * var distance = pixcel.distanceTo(pixcel2);
     *
     * @param {Pixel} px - 需要计算的 pixel。
     * @returns {number} 作为参数传入的像素与当前像素点的距离。
     */
  }, {
    key: "distanceTo",
    value: function distanceTo(px) {
      return Math.sqrt(Math.pow(this.x - px.x, 2) + Math.pow(this.y - px.y, 2));
    }

    /**
     * @function Pixel.prototype.add
     * @description 在原来像素坐标基础上，x 值加上传入的 x 参数，y 值加上传入的 y 参数。
     * @example
     * var pixcel = new Pixel(100,50);
     * //pixcel2是新的对象
     * var pixcel2 = pixcel.add(20,30);
     *
     * @param {number} x - 传入的 x 值。
     * @param {number} y - 传入的 y 值。
     * @returns {Pixel} 新的 pixel 对象，该 pixel 是由当前的 pixel 与传入的 x，y 相加得到。
     */
  }, {
    key: "add",
    value: function add(x, y) {
      if (x == null || y == null) {
        throw new TypeError('Pixel.add cannot receive null values');
      }
      return new Pixel(this.x + x, this.y + y);
    }

    /**
     * @function Pixel.prototype.offset
     * @description 通过传入的 {@link Pixel} 参数对原屏幕坐标进行偏移。
     * @example
     * var pixcel = new Pixel(100,50);
     * var pixcel2 = new Pixel(130,20);
     * //pixcel3 是新的对象
     * var pixcel3 = pixcel.offset(pixcel2);
     *
     * @param {Pixel} px - 传入的 {@link Pixel} 对象。
     * @returns {Pixel} 新的 pixel，该 pixel 是由当前的 pixel 对象的 x，y 值与传入的 Pixel 对象的 x，y 值相加得到。
     */
  }, {
    key: "offset",
    value: function offset(px) {
      var newPx = this.clone();
      if (px) {
        newPx = this.add(px.x, px.y);
      }
      return newPx;
    }

    /**
     *
     * @function Pixel.prototype.destroy
     * @description 销毁此对象。销毁后此对象的所有属性为 null，而不是初始值。
     * @example
     * var pixcel = new Pixel(100,50);
     * pixcel.destroy();
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.x = null;
      this.y = null;
      this.mode = null;
    }
  }]);
  return Pixel;
}();
/**
 * @enum Mode
 * @memberOf Pixel
 * @readonly
 * @description 模式。
 * @type {string}
 */
Pixel.Mode = {
  /** 左上模式。*/
  LeftTop: 'lefttop',
  /** 右上模式。 */
  RightTop: 'righttop',
  /** 右下模式。 */
  RightBottom: 'rightbottom',
  /** 左下模式。 */
  LeftBottom: 'leftbottom'
};
;// CONCATENATED MODULE: ./src/common/commontypes/BaseTypes.js
function BaseTypes_typeof(o) { "@babel/helpers - typeof"; return BaseTypes_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, BaseTypes_typeof(o); }
function BaseTypes_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, BaseTypes_toPropertyKey(descriptor.key), descriptor); } }
function BaseTypes_createClass(Constructor, protoProps, staticProps) { if (protoProps) BaseTypes_defineProperties(Constructor.prototype, protoProps); if (staticProps) BaseTypes_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function BaseTypes_toPropertyKey(t) { var i = BaseTypes_toPrimitive(t, "string"); return "symbol" == BaseTypes_typeof(i) ? i : String(i); }
function BaseTypes_toPrimitive(t, r) { if ("object" != BaseTypes_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != BaseTypes_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function BaseTypes_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @function inherit
 * @description 除了 C 和 P 两个必要参数外，可以传递任意数量的对象，这些对象都将继承C。
 * @param {Object} C - 继承的类。
 * @param {Object} P - 被继承的父类。
 * @private
 */
var inheritExt = function inheritExt(C, P) {
  var F = function F() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  var i, l, o;
  for (i = 2, l = arguments.length; i < l; i++) {
    o = arguments[i];
    if (typeof o === "function") {
      o = o.prototype;
    }
    Util.extend(C.prototype, o);
  }
};

/**
 * @function mixinExt
 * @description 实现多重继承。
 * @param {Class|Object} ...mixins - 继承的类。
 * @private
 */
var mixinExt = function mixinExt() {
  for (var _len = arguments.length, mixins = new Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }
  var Mix = /*#__PURE__*/BaseTypes_createClass(function Mix(options) {
    BaseTypes_classCallCheck(this, Mix);
    for (var index = 0; index < mixins.length; index++) {
      copyProperties(this, new mixins[index](options));
    }
  });
  for (var index = 0; index < mixins.length; index++) {
    var mixin = mixins[index];
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
    copyProperties(Mix.prototype, new mixin());
  }
  return Mix;
  function copyProperties(target, source) {
    var ownKeys = Object.getOwnPropertyNames(source);
    if (Object.getOwnPropertySymbols) {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source));
    }
    for (var index = 0; index < ownKeys.length; index++) {
      var key = ownKeys[index];
      if (key !== "constructor" && key !== "prototype" && key !== "name" && key !== "length") {
        var desc = Object.getOwnPropertyDescriptor(source, key);
        if (window["ActiveXObject"]) {
          Object.defineProperty(target, key, desc || {});
        } else {
          Object.defineProperty(target, key, desc);
        }
      }
    }
  }
};

/**
 * @name String
 * @namespace
 * @category BaseTypes Util
 * @description 字符串操作的一系列常用扩展函数。
 * @private
 */
var StringExt = {
  /**
   * @function StringExt.startsWith
   * @description 判断目标字符串是否以指定的子字符串开头。
   * @param {string} str - 目标字符串。
   * @param {string} sub - 查找的子字符串。
   * @returns {boolean} 目标字符串以指定的子字符串开头，则返回 true；否则返回 false。
   */
  startsWith: function startsWith(str, sub) {
    return str.indexOf(sub) == 0;
  },
  /**
   * @function StringExt.contains
   * @description 判断目标字符串是否包含指定的子字符串。
   * @param {string} str - 目标字符串。
   * @param {string} sub - 查找的子字符串。
   * @returns {boolean} 目标字符串中包含指定的子字符串，则返回 true；否则返回 false。
   */
  contains: function contains(str, sub) {
    return str.indexOf(sub) != -1;
  },
  /**
   * @function StringExt.trim
   * @description 删除一个字符串的开头和结尾处的所有空白字符。
   * @param {string} str - （可能）存在空白字符填塞的字符串。
   * @returns {string} 删除开头和结尾处空白字符后的字符串。
   */
  trim: function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },
  /**
   * @function StringExt.camelize
   * @description 骆驼式("-")连字符的字符串处理。
   * 例如："chicken-head" becomes "chickenHead",
   *       "-chicken-head" becomes "ChickenHead"。
   * @param {string} str - 要处理的字符串，原始内容不应被修改。
   * @returns {string}
   */
  camelize: function camelize(str) {
    var oStringList = str.split('-');
    var camelizedString = oStringList[0];
    for (var i = 1, len = oStringList.length; i < len; i++) {
      var s = oStringList[i];
      camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }
    return camelizedString;
  },
  /**
   * @function StringExt.format
   * @description 提供带 ${token} 标记的字符串, 返回 context 对象属性中指定标记的属性值。
   * @example
   * 示例：
   * (code)
   * 1、template = "${value,getValue}";
   *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
   *         args = [2,23,12,36,21];
   *       返回值:36
   * (end)
   * 示例:
   * (code)
   * 2、template = "$${{value,getValue}}";
   *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
   *         args = [2,23,12,36,21];
   *       返回值:"${36}"
   * (end)
   * 示例:
   * (code)
   * 3、template = "${a,b}";
   *         context = {a: {b:"format"}};
   *         args = null;
   *       返回值:"format"
   * (end)
   * 示例:
   * (code)
   * 3、template = "${a,b}";
   *         context = null;
   *         args = null;
   *       返回值:"${a.b}"
   * (end)
   * @param {string} template - 带标记的字符串将要被替换。参数 template 格式为"${token}"，此处的 token 标记会替换为 context["token"] 属性的值。
   * @param {Object} [context=window] - 带有属性的可选对象的属性用于匹配格式化字符串中的标记。如果该参数为空，将使用 window 对象。
   * @param {Array.<number>} [args] - 可选参数传递给在 context 对象上找到的函数。
   * @returns {string} 从 context 对象属性中替换字符串标记位的字符串。
   */
  format: function format(template, context, args) {
    if (!context) {
      context = window;
    }

    // Example matching:
    // str   = ${foo.bar}
    // match = foo.bar
    var replacer = function replacer(str, match) {
      var replacement;

      // Loop through all subs. Example: ${a.b.c}
      // 0 -> replacement = context[a];
      // 1 -> replacement = context[a][b];
      // 2 -> replacement = context[a][b][c];
      var subs = match.split(/\.+/);
      for (var i = 0; i < subs.length; i++) {
        if (i == 0) {
          replacement = context;
        }
        replacement = replacement[subs[i]];
      }
      if (typeof replacement === "function") {
        replacement = args ? replacement.apply(null, args) : replacement();
      }

      // If replacement is undefined, return the string 'undefined'.
      // This is a workaround for a bugs in browsers not properly
      // dealing with non-participating groups in regular expressions:
      // http://blog.stevenlevithan.com/archives/npcg-javascript
      if (typeof replacement == 'undefined') {
        return 'undefined';
      } else {
        return replacement;
      }
    };
    return template.replace(StringExt.tokenRegEx, replacer);
  },
  /**
   * @member {RegExp} [StringExt.tokenRegEx]
   * @description 寻找带 token 的字符串，默认为 tokenRegEx=/\$\{([\w.]+?)\}/g。
   * @example
   * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
   */
  tokenRegEx: /\$\{([\w.]+?)\}/g,
  /**
   * @member {RegExp} [StringExt.numberRegEx]
   * @description 判断一个字符串是否只包含一个数值，默认为 numberRegEx=/^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/。
   */
  numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
  /**
   * @function StringExt.isNumeric
   * @description 判断一个字符串是否只包含一个数值。
   * @example
   * (code)
   * StringExt.isNumeric("6.02e23") // true
   * StringExt.isNumeric("12 dozen") // false
   * StringExt.isNumeric("4") // true
   * StringExt.isNumeric(" 4 ") // false
   * (end)
   * @returns {boolean} 字符串包含唯一的数值，返回 true；否则返回 false。
   */
  isNumeric: function isNumeric(value) {
    return StringExt.numberRegEx.test(value);
  },
  /**
   * @function StringExt.numericIf
   * @description 把一个看似数值型的字符串转化为一个数值。
   * @returns {(number|string)} 如果能转换为数值则返回数值，否则返回字符串本身。
   */
  numericIf: function numericIf(value) {
    return StringExt.isNumeric(value) ? parseFloat(value) : value;
  }
};

/**
 * @name Number
 * @namespace
 * @category BaseTypes Util
 * @description 数值操作的一系列常用扩展函数。
 * @private
 */
var NumberExt = {
  /**
   * @member {string} [NumberExt.decimalSeparator='.']
   * @description 格式化数字时默认的小数点分隔符。
   * @constant
   */
  decimalSeparator: ".",
  /**
   * @member {string} [NumberExt.thousandsSeparator=',']
   * @description 格式化数字时默认的千位分隔符。
   * @constant
   */
  thousandsSeparator: ",",
  /**
   * @function NumberExt.limitSigDigs
   * @description 限制浮点数的有效数字位数。
   * @param {number} num - 浮点数。
   * @param {number} sig - 有效位数。
   * @returns {number} 将数字四舍五入到指定数量的有效位数。
   */
  limitSigDigs: function limitSigDigs(num, sig) {
    var fig = 0;
    if (sig > 0) {
      fig = parseFloat(num.toPrecision(sig));
    }
    return fig;
  },
  /**
   * @function NumberExt.format
   * @description 数字格式化输出。
   * @param {number} num - 数字。
   * @param {number} [dec=0]  - 数字的小数部分四舍五入到指定的位数。设置为 null 值时小数部分不变。
   * @param {string} [tsep=','] - 千位分隔符。
   * @param {string} [dsep='.'] - 小数点分隔符。
   * @returns {string} 数字格式化后的字符串。
   */
  format: function format(num, dec, tsep, dsep) {
    dec = typeof dec != "undefined" ? dec : 0;
    tsep = typeof tsep != "undefined" ? tsep : NumberExt.thousandsSeparator;
    dsep = typeof dsep != "undefined" ? dsep : NumberExt.decimalSeparator;
    if (dec != null) {
      num = parseFloat(num.toFixed(dec));
    }
    var parts = num.toString().split(".");
    if (parts.length === 1 && dec == null) {
      // integer where we do not want to touch the decimals
      dec = 0;
    }
    var integer = parts[0];
    if (tsep) {
      var thousands = /(-?[0-9]+)([0-9]{3})/;
      while (thousands.test(integer)) {
        integer = integer.replace(thousands, "$1" + tsep + "$2");
      }
    }
    var str;
    if (dec == 0) {
      str = integer;
    } else {
      var rem = parts.length > 1 ? parts[1] : "0";
      if (dec != null) {
        rem = rem + new Array(dec - rem.length + 1).join("0");
      }
      str = integer + dsep + rem;
    }
    return str;
  }
};
if (!Number.prototype.limitSigDigs) {
  /**
   * APIMethod: Number.limitSigDigs
   * 限制浮点数的有效数字位数.
   * @param {number} sig -有效位数。
   * @returns {number} 将数字四舍五入到指定数量的有效位数。
   *           如果传入值 为 null、0、或者是负数, 返回值 0。
   */
  Number.prototype.limitSigDigs = function (sig) {
    return NumberExt.limitSigDigs(this, sig);
  };
}

/**
 * @name Function
 * @namespace
 * @category BaseTypes Util
 * @description 函数操作的一系列常用扩展函数。
 * @private
 */
var FunctionExt = {
  /**
   * @function FunctionExt.bind
   * @description 绑定函数到对象。方便创建 this 的作用域。
   * @param {function} func - 输入函数。
   * @param {Object} object - 对象绑定到输入函数（作为输入函数的 this 对象）。
   * @returns {function} object 参数作为 func 函数的 this 对象。
   */
  bind: function bind(func, object) {
    // create a reference to all arguments past the second one
    var args = Array.prototype.slice.apply(arguments, [2]);
    return function () {
      // Push on any additional arguments from the actual function call.
      // These will come after those sent to the bind call.
      var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0]));
      return func.apply(object, newArgs);
    };
  },
  /**
   * @function FunctionExt.bindAsEventListener
   * @description 绑定函数到对象，在调用该函数时配置并使用事件对象作为第一个参数。
   * @param {function} func - 用于监听事件的函数。
   * @param {Object} object - this 对象的引用。
   * @returns {function}
   */
  bindAsEventListener: function bindAsEventListener(func, object) {
    return function (event) {
      return func.call(object, event || window.event);
    };
  },
  /**
   * @function FunctionExt.False
   * @description 该函数仅仅返回 false。该函数主要是避免在 IE8 以下浏览中 DOM 事件句柄的匿名函数问题。
   * @example
   * document.onclick = FunctionExt.False;
   * @returns {boolean}
   */
  False: function False() {
    return false;
  },
  /**
   * @function FunctionExt.True
   * @description 该函数仅仅返回 true。该函数主要是避免在 IE8 以下浏览中 DOM 事件句柄的匿名函数问题。
   * @example
   * document.onclick = FunctionExt.True;
   * @returns {boolean}
   */
  True: function True() {
    return true;
  },
  /**
   * @function FunctionExt.Void
   * @description 可重用函数，仅仅返回 "undefined"。
   * @returns {undefined}
   */
  Void: function Void() {}
};

/**
 * @name Array
 * @namespace
 * @category BaseTypes Util
 * @description 数组操作的一系列常用扩展函数。
 * @private
 */
var ArrayExt = {
  /**
   * @function ArrayExt.filter
   * @description 过滤数组，提供了 ECMA-262 标准中 Array.prototype.filter 函数的扩展。详见：{@link http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter}
   * @param {Array} array - 要过滤的数组。
   * @param {function} callback - 数组中的每一个元素调用该函数。</br>
   *     如果函数的返回值为 true，该元素将包含在返回的数组中。该函数有三个参数: 数组中的元素，元素的索引，数组自身。</br>
   *     如果设置了可选参数 caller，在调用 callback 时，使用可选参数 caller 设置为 callback 的参数。</br>
   * @param {Object} [caller] - 在调用 callback 时，使用参数 caller 设置为 callback 的参数。
   * @returns {Array} callback 函数返回 true 时的元素将作为返回数组中的元素。
   */
  filter: function filter(array, callback, caller) {
    var selected = [];
    if (Array.prototype.filter) {
      selected = array.filter(callback, caller);
    } else {
      var len = array.length;
      if (typeof callback != "function") {
        throw new TypeError();
      }
      for (var i = 0; i < len; i++) {
        if (i in array) {
          var val = array[i];
          if (callback.call(caller, val, i, array)) {
            selected.push(val);
          }
        }
      }
    }
    return selected;
  }
};
;// CONCATENATED MODULE: ./src/common/commontypes/Geometry.js
function Geometry_typeof(o) { "@babel/helpers - typeof"; return Geometry_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Geometry_typeof(o); }
function Geometry_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Geometry_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Geometry_toPropertyKey(descriptor.key), descriptor); } }
function Geometry_createClass(Constructor, protoProps, staticProps) { if (protoProps) Geometry_defineProperties(Constructor.prototype, protoProps); if (staticProps) Geometry_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Geometry_toPropertyKey(t) { var i = Geometry_toPrimitive(t, "string"); return "symbol" == Geometry_typeof(i) ? i : String(i); }
function Geometry_toPrimitive(t, r) { if ("object" != Geometry_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Geometry_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
// import {WKT} from '../format/WKT';
// import {Vector} from './Vector';


/**
 * @class Geometry
 * @deprecatedclass SuperMap.Geometry
 * @category BaseTypes Geometry
 * @classdesc 几何对象类，描述地理对象的几何图形。
 * @usage
 */
var Geometry = /*#__PURE__*/function () {
  function Geometry() {
    Geometry_classCallCheck(this, Geometry);
    this.CLASS_NAME = "SuperMap.Geometry";
    /**
     * @member {string} Geometry.prototype.id
     * @description  几何对象的唯一标识符。
     *
     */
    this.id = Util_Util.createUniqueID(this.CLASS_NAME + "_");

    /**
     * @member {Geometry} Geometry.prototype.parent
     * @description 父类几何对象。
     */
    this.parent = null;

    /**
     * @member {Bounds} Geometry.prototype.bounds
     * @description 几何对象的范围。
     *
     */
    this.bounds = null;

    /**
     * @member {number} Geometry.prototype.SRID
     * @description 投影坐标参数。通过该参数，服务器判断几何对象的坐标参考系是否与数据集相同，如果不同，则在数据入库前进行投影变换。
     * @example
     * var geometry= new Geometry();
     * geometry. SRID=4326;
     *
     */
    this.SRID = null;
  }

  /**
   * @function Geometry.prototype.destroy
   * @description 解构 Geometry 类，释放资源。
   */
  Geometry_createClass(Geometry, [{
    key: "destroy",
    value: function destroy() {
      this.id = null;
      this.bounds = null;
      this.SRID = null;
    }

    /**
     * @function Geometry.prototype.clone
     * @description 克隆几何图形。克隆的几何图形不设置非标准的属性。
     * @returns {Geometry} 克隆的几何图形。
     */
  }, {
    key: "clone",
    value: function clone() {
      return new Geometry();
    }

    /**
     * @function Geometry.prototype.setBounds
     * @description 设置几何对象的边界。
     * @param {Bounds} bounds - 范围。
     */
  }, {
    key: "setBounds",
    value: function setBounds(bounds) {
      if (bounds) {
        this.bounds = bounds.clone();
      }
    }

    /**
     * @function Geometry.prototype.clearBounds
     * @description 清除几何对象的边界。
     * 如果该对象有父类，也会清除父类几何对象的边界。
     */
  }, {
    key: "clearBounds",
    value: function clearBounds() {
      this.bounds = null;
      if (this.parent) {
        this.parent.clearBounds();
      }
    }

    /**
     * @function Geometry.prototype.extendBounds
     * @description 扩展现有边界以包含新边界。如果尚未设置几何边界，则设置新边界。
     * @param {Bounds} newBounds - 几何对象的边界。
     */
  }, {
    key: "extendBounds",
    value: function extendBounds(newBounds) {
      var bounds = this.getBounds();
      if (!bounds) {
        this.setBounds(newBounds);
      } else {
        this.bounds.extend(newBounds);
      }
    }

    /**
     * @function Geometry.prototype.getBounds
     * @description 获得几何图形的边界。如果没有设置边界，可通过计算获得。
     * @returns {Bounds} 几何对象的边界。
     */
  }, {
    key: "getBounds",
    value: function getBounds() {
      if (this.bounds == null) {
        this.calculateBounds();
      }
      return this.bounds;
    }

    /**
     * @function Geometry.prototype.calculateBounds
     * @description 重新计算几何图形的边界（需要在子类中实现此方法）。
     */
  }, {
    key: "calculateBounds",
    value: function calculateBounds() {
      //
      // This should be overridden by subclasses.
      //
    }

    /**
     * @function Geometry.prototype.getVertices
     * @description 返回几何图形的所有顶点的列表（需要在子类中实现此方法）。
     * @param {boolean} [nodes] - 如果是 true，线则只返回线的末端点，如果 false，仅仅返回顶点，如果没有设置，则返回顶点。
     * @returns {Array} 几何图形的顶点列表。
     */
  }, {
    key: "getVertices",
    value: function getVertices(nodes) {// eslint-disable-line no-unused-vars
    }

    /**
     * @function Geometry.prototype.getArea
     * @description 计算几何对象的面积 ，此方法需要在子类中定义。
     * @returns {number} 计算后的对象面积。
     */
  }, {
    key: "getArea",
    value: function getArea() {
      //to be overridden by geometries that actually have an area
      //
      return 0.0;
    }

    // /**
    //  * @function Geometry.prototype.toString
    //  * @description 返回geometry对象的字符串表述，需要引入{@link WKTFormat}。此方法只能在子类实现，在父类使用会报错。
    //  * @returns {string} geometry对象的字符串表述(Well-Known Text)
    //  */
    // toString() {
    // var string;
    // if (WKT) {
    //     var wkt = new WKT();
    //     string = wkt.write(new Vector(this));
    // } else {
    //     string = Object.prototype.toString.call(this);
    // }
    // return string;
    // }
  }]);
  return Geometry;
}();
// EXTERNAL MODULE: ./node_modules/urijs/src/URI.js
var URI = __webpack_require__(9216);
var URI_default = /*#__PURE__*/__webpack_require__.n(URI);
;// CONCATENATED MODULE: ./src/common/commontypes/Util.js
function Util_typeof(o) { "@babel/helpers - typeof"; return Util_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Util_typeof(o); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @description 浏览器名称，依赖于 userAgent 属性，BROWSER_NAME 可以是空，或者以下浏览器：<br>
 *      "opera" -- Opera<br>
 *      "msie"  -- Internet Explorer<br>
 *      "safari" -- Safari<br>
 *      "firefox" -- Firefox<br>
 *      "mozilla" -- Mozilla
 * @category BaseTypes Constant
 * @constant {Object}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Browser.name;
 *
 * </script>
 * // ES6 Import
 * import { Browser } from '{npm}';
 *
 * const result = Browser.name;
 * ```
 */
var Browser = function () {
  var name = '',
    version = '',
    device = 'pc',
    uaMatch;
  //以下进行测试
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1 && ua.indexOf('rv') > -1) {
    name = 'msie';
    uaMatch = ua.match(/msie ([\d.]+)/) || ua.match(/rv:([\d.]+)/);
  } else if (ua.indexOf('chrome') > -1) {
    name = 'chrome';
    uaMatch = ua.match(/chrome\/([\d.]+)/);
  } else if (ua.indexOf('firefox') > -1) {
    name = 'firefox';
    uaMatch = ua.match(/firefox\/([\d.]+)/);
  } else if (ua.indexOf('opera') > -1) {
    name = 'opera';
    uaMatch = ua.match(/version\/([\d.]+)/);
  } else if (ua.indexOf('safari') > -1) {
    name = 'safari';
    uaMatch = ua.match(/version\/([\d.]+)/);
  }
  version = uaMatch ? uaMatch[1] : '';
  if (ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('iphone') > -1) {
    device = 'apple';
  } else if (ua.indexOf('android') > -1) {
    uaMatch = ua.match(/version\/([\d.]+)/);
    version = uaMatch ? uaMatch[1] : '';
    device = 'android';
  }
  return {
    name: name,
    version: version,
    device: device
  };
}();
var isSupportCanvas = function () {
  var checkRes = true,
    broz = Browser;
  if (document.createElement('canvas').getContext) {
    if (broz.name === 'firefox' && parseFloat(broz.version) < 5) {
      checkRes = false;
    }
    if (broz.name === 'safari' && parseFloat(broz.version) < 4) {
      checkRes = false;
    }
    if (broz.name === 'opera' && parseFloat(broz.version) < 10) {
      checkRes = false;
    }
    if (broz.name === 'msie' && parseFloat(broz.version) < 9) {
      checkRes = false;
    }
  } else {
    checkRes = false;
  }
  return checkRes;
}();

/**
 * @description 如果 userAgent 捕获到浏览器使用的是 Gecko 引擎则返回 true。
 * @constant {number}
 * @private
 */
var IS_GECKO = function () {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('webkit') === -1 && ua.indexOf('gecko') !== -1;
}();

/**
 * @constant {number}
 * @default
 * @description 分辨率与比例尺之间转换的常量。
 * @private
 */
var DOTS_PER_INCH = 96;

/**
 * @name CommonUtil
 * @namespace
 * @category BaseTypes Util
 * @description common 工具类。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.CommonUtil.getElement();
 *
 *   // 弃用的写法
 *   const result = SuperMap.Util.getElement();
 *
 * </script>
 *
 * // ES6 Import
 * import { CommonUtil } from '{npm}';
 *
 * const result = CommonUtil.getElement();
 * ```
 */

var Util_Util = {
  /**
   * @memberOf CommonUtil
   * @description 对象拷贝赋值。
   * @param {Object} dest - 目标对象。
   * @param {Object} arguments - 待拷贝的对象。
   * @returns {Object} 赋值后的目标对象。
   */
  assign: function assign(dest) {
    for (var index = 0; index < Object.getOwnPropertyNames(arguments).length; index++) {
      var arg = Object.getOwnPropertyNames(arguments)[index];
      if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
        continue;
      }
      var obj = arguments[arg];
      if (obj) {
        for (var j = 0; j < Object.getOwnPropertyNames(obj).length; j++) {
          var key = Object.getOwnPropertyNames(obj)[j];
          if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
            continue;
          }
          dest[key] = obj[key];
        }
      }
    }
    return dest;
  },
  /**
   * @memberOf CommonUtil
   * @description 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
   * @example
   * 要复制 Size 对象的所有属性到自定义对象上，使用方法如下:
   *     var size = new Size(100, 100);
   *     var obj = {}；
   *     CommonUtil.extend(obj, size);
   * @param {Object} [destination] - 目标对象。
   * @param {Object} source - 源对象，其属性将被设置到目标对象上。
   * @returns {Object} 目标对象。
   */

  extend: function extend(destination, source) {
    destination = destination || {};
    if (source) {
      for (var property in source) {
        var value = source[property];
        if (value !== undefined) {
          destination[property] = value;
        }
      }

      /**
       * IE doesn't include the toString property when iterating over an object's
       * properties with the for(property in object) syntax.  Explicitly check if
       * the source has its own toString property.
       */

      /*
       * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
       * prototype object" when calling hawOwnProperty if the source object
       * is an instance of window.Event.
       */

      var sourceIsEvt = typeof window.Event === 'function' && source instanceof window.Event;
      if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
        destination.toString = source.toString;
      }
    }
    return destination;
  },
  /**
   * @memberOf CommonUtil
   * @description 对象拷贝。
   * @param {Object} [des] - 目标对象。
   * @param {Object} soc - 源对象。
   */
  copy: function copy(des, soc) {
    des = des || {};
    var v;
    if (soc) {
      for (var p in des) {
        v = soc[p];
        if (typeof v !== 'undefined') {
          des[p] = v;
        }
      }
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 销毁对象，将其属性置空。
   * @param {Object} [obj] - 目标对象。
   */
  reset: function reset(obj) {
    obj = obj || {};
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (Util_typeof(obj[p]) === 'object' && obj[p] instanceof Array) {
          for (var i in obj[p]) {
            if (obj[p][i].destroy) {
              obj[p][i].destroy();
            }
          }
          obj[p].length = 0;
        } else if (Util_typeof(obj[p]) === 'object' && obj[p] instanceof Object) {
          if (obj[p].destroy) {
            obj[p].destroy();
          }
        }
        obj[p] = null;
      }
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 获取 HTML 元素数组。
   * @returns {Array.<HTMLElement>} HTML 元素数组。
   */
  getElement: function getElement() {
    var elements = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
      var element = arguments[i];
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (arguments.length === 1) {
        return element;
      }
      elements.push(element);
    }
    return elements;
  },
  /**
   * @memberOf CommonUtil
   * @description instance of 的跨浏览器实现。
   * @param {Object} o - 对象。
   * @returns {boolean} 是否是页面元素。
   */
  isElement: function isElement(o) {
    return !!(o && o.nodeType === 1);
  },
  /**
   * @memberOf CommonUtil
   * @description 判断一个对象是否是数组。
   * @param {Object} a - 对象。
   * @returns {boolean} 是否是数组。
   */
  isArray: function isArray(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  },
  /**
   * @memberOf CommonUtil
   * @description 从数组中删除某一项。
   * @param {Array} array - 数组。
   * @param {Object} item - 数组中要删除的一项。
   * @returns {Array} 执行删除操作后的数组。
   */
  removeItem: function removeItem(array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] === item) {
        array.splice(i, 1);
        //break;more than once??
      }
    }
    return array;
  },
  /**
   * @memberOf CommonUtil
   * @description 获取某对象在数组中的索引值。
   * @param {Array.<Object>} array - 数组。
   * @param {Object} obj - 对象。
   * @returns {number} 某对象在数组中的索引值。
   */
  indexOf: function indexOf(array, obj) {
    if (array == null) {
      return -1;
    } else {
      // use the build-in function if available.
      if (typeof array.indexOf === 'function') {
        return array.indexOf(obj);
      } else {
        for (var i = 0, len = array.length; i < len; i++) {
          if (array[i] === obj) {
            return i;
          }
        }
        return -1;
      }
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 修改某 DOM 元素的许多属性。
   * @param {HTMLElement} element - 待修改的 DOM 元素。
   * @param {string} [id] - DOM 元素的 ID。
   * @param {Pixel} [px] - DOM 元素的 style 属性的 left 和 top 属性。
   * @param {Size} [sz] - DOM 元素的 width 和 height 属性。
   * @param {string} [position] - DOM 元素的 position 属性。
   * @param {string} [border] - DOM 元素的 style 属性的 border 属性。
   * @param {string} [overflow] - DOM 元素的 style 属性的 overflow 属性。
   * @param {number} [opacity] - 不透明度值。取值范围：(0.0 - 1.0)。
   */
  modifyDOMElement: function modifyDOMElement(element, id, px, sz, position, border, overflow, opacity) {
    if (id) {
      element.id = id;
    }
    if (px) {
      element.style.left = px.x + 'px';
      element.style.top = px.y + 'px';
    }
    if (sz) {
      element.style.width = sz.w + 'px';
      element.style.height = sz.h + 'px';
    }
    if (position) {
      element.style.position = position;
    }
    if (border) {
      element.style.border = border;
    }
    if (overflow) {
      element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
      element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
      element.style.opacity = opacity;
    } else if (parseFloat(opacity) === 1.0) {
      element.style.filter = '';
      element.style.opacity = '';
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 比较两个对象并合并。
   * @param {Object} [to] - 目标对象。
   * @param {Object} from - 源对象。
   * @returns {Object} 返回合并后的对象。
   */
  applyDefaults: function applyDefaults(to, from) {
    to = to || {};
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object is an
     * instance of window.Event.
     */
    var fromIsEvt = typeof window.Event === 'function' && from instanceof window.Event;
    for (var key in from) {
      if (to[key] === undefined || !fromIsEvt && from.hasOwnProperty && from.hasOwnProperty(key) && !to.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    if (!fromIsEvt && from && from.hasOwnProperty && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
      to.toString = from.toString;
    }
    return to;
  },
  /**
   * @memberOf CommonUtil
   * @description 将参数对象转换为 HTTP 的 GET 请求中的参数字符串。例如："key1=value1&key2=value2&key3=value3"。
   * @param {Object} params - 参数对象。
   * @returns {string} HTTP 的 GET 请求中的参数字符串。
   */
  getParameterString: function getParameterString(params) {
    var paramsArray = [];
    for (var key in params) {
      var value = params[key];
      if (value != null && typeof value !== 'function') {
        var encodedValue;
        if (Array.isArray(value) || value.toString() === '[object Object]') {
          encodedValue = encodeURIComponent(JSON.stringify(value));
        } else {
          /* value is a string; simply encode */
          encodedValue = encodeURIComponent(value);
        }
        paramsArray.push(encodeURIComponent(key) + '=' + encodedValue);
      }
    }
    return paramsArray.join('&');
  },
  /**
   * @memberOf CommonUtil
   * @description 给 URL 追加查询参数。
   * @param {string} url - 待追加参数的 URL 字符串。
   * @param {string} paramStr - 待追加的查询参数。
   * @returns {string} 新的 URL。
   */
  urlAppend: function urlAppend(url, paramStr) {
    var newUrl = url;
    if (paramStr) {
      if (paramStr.indexOf('?') === 0) {
        paramStr = paramStr.substring(1);
      }
      var parts = (url + ' ').split(/[?&]/);
      newUrl += parts.pop() === ' ' ? paramStr : parts.length ? '&' + paramStr : '?' + paramStr;
    }
    return newUrl;
  },
  /**
   * @memberOf CommonUtil
   * @description 给 URL 追加 path 参数。
   * @param {string} url - 待追加参数的 URL 字符串。
   * @param {string} paramStr - 待追加的path参数。
   * @returns {string} 新的 URL。
   */
  urlPathAppend: function urlPathAppend(url, pathStr) {
    var newUrl = url;
    if (!pathStr) {
      return newUrl;
    }
    if (pathStr.indexOf('/') === 0) {
      pathStr = pathStr.substring(1);
    }
    var parts = url.split('?');
    if (parts[0].indexOf('/', parts[0].length - 1) < 0) {
      parts[0] += '/';
    }
    newUrl = "".concat(parts[0]).concat(pathStr).concat(parts.length > 1 ? "?".concat(parts[1]) : '');
    return newUrl;
  },
  /**
   * @memberOf CommonUtil
   * @description 为了避免浮点精度错误而保留的有效位数。
   * @type {number}
   * @default 14
   */
  DEFAULT_PRECISION: 14,
  /**
   * @memberOf CommonUtil
   * @description 将字符串以接近的精度转换为数字。
   * @param {string} number - 字符串。
   * @param {number} [precision=14] - 精度。
   * @returns {number} 转化后的数字。
   */
  toFloat: function toFloat(number, precision) {
    if (precision == null) {
      precision = Util_Util.DEFAULT_PRECISION;
    }
    if (typeof number !== 'number') {
      number = parseFloat(number);
    }
    return precision === 0 ? number : parseFloat(number.toPrecision(precision));
  },
  /**
   * @memberOf CommonUtil
   * @description 角度转弧度。
   * @param {number} x - 角度。
   * @returns {number} 转化后的弧度。
   */
  rad: function rad(x) {
    return x * Math.PI / 180;
  },
  /**
   * @memberOf CommonUtil
   * @description 从 URL 字符串中解析出参数对象。
   * @param {string} url - URL。
   * @returns {Object} 解析出的参数对象。
   */
  getParameters: function getParameters(url) {
    // if no url specified, take it from the location bar
    url = url === null || url === undefined ? window.location.href : url;

    //parse out parameters portion of url string
    var paramsString = '';
    if (StringExt.contains(url, '?')) {
      var start = url.indexOf('?') + 1;
      var end = StringExt.contains(url, '#') ? url.indexOf('#') : url.length;
      paramsString = url.substring(start, end);
    }
    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
      var keyValue = pairs[i].split('=');
      if (keyValue[0]) {
        var key = keyValue[0];
        try {
          key = decodeURIComponent(key);
        } catch (err) {
          key = unescape(key);
        }

        // being liberal by replacing "+" with " "
        var value = (keyValue[1] || '').replace(/\+/g, ' ');
        try {
          value = decodeURIComponent(value);
        } catch (err) {
          value = unescape(value);
        }

        // follow OGC convention of comma delimited values
        value = value.split(',');

        //if there's only one value, do not return as array
        if (value.length == 1) {
          value = value[0];
        }
        parameters[key] = value;
      }
    }
    return parameters;
  },
  /**
   * @memberOf CommonUtil
   * @description 不断递增计数变量，用于生成唯一 ID。
   * @type {number}
   * @default 0
   */
  lastSeqID: 0,
  /**
   * @memberOf CommonUtil
   * @description 创建唯一 ID 值。
   * @param {string} [prefix] - 前缀。
   * @returns {string} 唯一的 ID 值。
   */
  createUniqueID: function createUniqueID(prefix) {
    if (prefix == null) {
      prefix = 'id_';
    }
    Util_Util.lastSeqID += 1;
    return prefix + Util_Util.lastSeqID;
  },
  /**
   * @memberOf CommonUtil
   * @description 判断并转化比例尺。
   * @param {number} scale - 比例尺。
   * @returns {number} 正常的 scale 值。
   */
  normalizeScale: function normalizeScale(scale) {
    var normScale = scale > 1.0 ? 1.0 / scale : scale;
    return normScale;
  },
  /**
   * @memberOf CommonUtil
   * @description 比例尺转分辨率。
   * @param {number} scale - 比例尺。
   * @param {string} [units='degrees'] - 比例尺单位。
   * @returns {number} 转化后的分辨率。
   */
  getResolutionFromScale: function getResolutionFromScale(scale, units) {
    var resolution;
    if (scale) {
      if (units == null) {
        units = 'degrees';
      }
      var normScale = Util_Util.normalizeScale(scale);
      resolution = 1 / (normScale * INCHES_PER_UNIT[units] * DOTS_PER_INCH);
    }
    return resolution;
  },
  /**
   * @memberOf CommonUtil
   * @description 分辨率转比例尺。
   * @param {number} resolution - 分辨率。
   * @param {string} [units='degrees'] - 分辨率单位。
   * @returns {number} 转化后的比例尺。
   */
  getScaleFromResolution: function getScaleFromResolution(resolution, units) {
    if (units == null) {
      units = 'degrees';
    }
    var scale = resolution * INCHES_PER_UNIT[units] * DOTS_PER_INCH;
    return scale;
  },
  /**
   * @memberOf CommonUtil
   * @description 获取浏览器相关信息。支持的浏览器包括：Opera，Internet Explorer，Safari，Firefox。
   * @returns {Object} 浏览器名称、版本、设备名称。对应的属性分别为 name, version, device。
   */
  getBrowser: function getBrowser() {
    return Browser;
  },
  /**
   * @memberOf CommonUtil
   * @description 浏览器是否支持 Canvas。
   * @returns {boolean} 当前浏览器是否支持 HTML5 Canvas。
   */
  isSupportCanvas: isSupportCanvas,
  /**
   * @memberOf CommonUtil
   * @description 判断浏览器是否支持 Canvas。
   * @returns {boolean} 当前浏览器是否支持 HTML5 Canvas 。
   */
  supportCanvas: function supportCanvas() {
    return Util_Util.isSupportCanvas;
  },
  /**
   * @memberOf CommonUtil
   * @description 判断一个 URL 请求是否在当前域中。
   * @param {string} url - URL 请求字符串。
   * @returns {boolean} URL 请求是否在当前域中。
   */
  isInTheSameDomain: function isInTheSameDomain(url) {
    if (!url) {
      return true;
    }
    var index = url.indexOf('//');
    if (index === -1) {
      return true;
    }
    return Util_Util.isSameDomain(url, document.location.toString());
  },
  isSameDomain: function isSameDomain(url, otherUrl) {
    return new (URI_default())(url).normalize().origin() === new (URI_default())(otherUrl).normalize().origin();
  },
  /**
   * @memberOf CommonUtil
   * @description 计算 iServer 服务的 REST 图层的显示分辨率，需要从 iServer 的 REST 图层表述中获取 viewBounds、viewer、scale、coordUnit、datumAxis 五个参数，来进行计算。
   * @param {Bounds} viewBounds - 地图的参照可视范围，即地图初始化时默认的地图显示范围。
   * @param {Size} viewer - 地图初始化时默认的地图图片的尺寸。
   * @param {number} scale - 地图初始化时默认的显示比例尺。
   * @param {string} [coordUnit='degrees'] - 投影坐标系统的地图单位。
   * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则系统默认为 WGS84 参考系的椭球体长半轴 6378137。
   * @returns {number} 图层显示分辨率。
   */
  calculateDpi: function calculateDpi(viewBounds, viewer, scale, coordUnit, datumAxis) {
    //10000 是 0.1毫米与米的转换。DPI的计算公式：Viewer / DPI *  0.0254 * 10000 = ViewBounds * scale ，公式中的10000是为了提高计算结果的精度，以下出现的ratio皆为如此。
    if (!viewBounds || !viewer || !scale) {
      return;
    }
    var ratio = 10000,
      rvbWidth = viewBounds.getWidth(),
      rvbHeight = viewBounds.getHeight(),
      rvWidth = viewer.w,
      rvHeight = viewer.h;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || 'degrees';
    var dpi;
    if (coordUnit.toLowerCase() === 'degree' || coordUnit.toLowerCase() === 'degrees' || coordUnit.toLowerCase() === 'dd') {
      var num1 = rvbWidth / rvWidth,
        num2 = rvbHeight / rvHeight,
        resolution = num1 > num2 ? num1 : num2;
      dpi = 0.0254 * ratio / resolution / scale / (Math.PI * 2 * datumAxis / 360) / ratio;
    } else {
      var _resolution = rvbWidth / rvWidth;
      dpi = 0.0254 * ratio / _resolution / scale / ratio;
    }
    return dpi;
  },
  /**
   * @memberOf CommonUtil
   * @description 将对象转换成 JSON 字符串。
   * @param {Object} obj - 要转换成 JSON 的 Object 对象。
   * @returns {string} 转换后的 JSON 对象。
   */
  toJSON: function toJSON(obj) {
    var objInn = obj;
    if (objInn == null) {
      return null;
    }
    switch (objInn.constructor) {
      case String:
        //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
        objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
        objInn = objInn.replace(/\n/g, '\\n');
        objInn = objInn.replace(/\r/g, '\\r');
        objInn = objInn.replace('<', '&lt;');
        objInn = objInn.replace('>', '&gt;');
        objInn = objInn.replace(/%/g, '%25');
        objInn = objInn.replace(/&/g, '%26');
        return objInn;
      case Array:
        var arr = '';
        for (var i = 0, len = objInn.length; i < len; i++) {
          arr += Util_Util.toJSON(objInn[i]);
          if (i !== objInn.length - 1) {
            arr += ',';
          }
        }
        return "[" + arr + "]";
      case Number:
        return isFinite(objInn) ? String(objInn) : null;
      case Boolean:
        return String(objInn);
      case Date:
        var dateStr = '{' + '\'__type\':"System.DateTime",' + "'Year':" + objInn.getFullYear() + ',' + "'Month':" + (objInn.getMonth() + 1) + ',' + "'Day':" + objInn.getDate() + ',' + "'Hour':" + objInn.getHours() + ',' + "'Minute':" + objInn.getMinutes() + ',' + "'Second':" + objInn.getSeconds() + ',' + "'Millisecond':" + objInn.getMilliseconds() + ',' + "'TimezoneOffset':" + objInn.getTimezoneOffset() + '}';
        return dateStr;
      default:
        if (objInn['toJSON'] != null && typeof objInn['toJSON'] === 'function') {
          return objInn.toJSON();
        }
        if (Util_typeof(objInn) === 'object') {
          if (objInn.length) {
            var _arr = [];
            for (var _i = 0, _len = objInn.length; _i < _len; _i++) {
              _arr.push(Util_Util.toJSON(objInn[_i]));
            }
            return '[' + _arr.join(',') + ']';
          }
          var _arr2 = [];
          for (var attr in objInn) {
            //为解决Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
            if (typeof objInn[attr] !== 'function' && attr !== 'CLASS_NAME' && attr !== 'parent') {
              _arr2.push("'" + attr + "':" + Util_Util.toJSON(objInn[attr]));
            }
          }
          if (_arr2.length > 0) {
            return '{' + _arr2.join(',') + '}';
          } else {
            return '{}';
          }
        }
        return objInn.toString();
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 根据比例尺和 DPI 计算屏幕分辨率。
   * @category BaseTypes Util
   * @param {number} scale - 比例尺。
   * @param {number} dpi - 图像分辨率，表示每英寸内的像素个数。
   * @param {string} [coordUnit] - 投影坐标系统的地图单位。
   * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则 DPI 默认按照 WGS84 参考系的椭球体长半轴 6378137 来计算。
   * @returns {number} 当前比例尺下的屏幕分辨率。
   */
  getResolutionFromScaleDpi: function getResolutionFromScaleDpi(scale, dpi, coordUnit, datumAxis) {
    var resolution = null,
      ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || '';
    if (scale > 0 && dpi > 0) {
      scale = Util_Util.normalizeScale(scale);
      if (coordUnit.toLowerCase() === 'degree' || coordUnit.toLowerCase() === 'degrees' || coordUnit.toLowerCase() === 'dd') {
        //scale = Util.normalizeScale(scale);
        resolution = 0.0254 * ratio / dpi / scale / (Math.PI * 2 * datumAxis / 360) / ratio;
        return resolution;
      } else {
        resolution = 0.0254 * ratio / dpi / scale / ratio;
        return resolution;
      }
    }
    return -1;
  },
  /**
   * @memberOf CommonUtil
   * @description 根据 resolution、dpi、coordUnit 和 datumAxis 计算比例尺。
   * @param {number} resolution - 用于计算比例尺的地图分辨率。
   * @param {number} dpi - 图像分辨率，表示每英寸内的像素个数。
   * @param {string} [coordUnit] - 投影坐标系统的地图单位。
   * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则 DPI 默认按照 WGS84 参考系的椭球体长半轴 6378137 来计算。
   * @returns {number} 当前屏幕分辨率下的比例尺。
   */
  getScaleFromResolutionDpi: function getScaleFromResolutionDpi(resolution, dpi, coordUnit, datumAxis) {
    var scale = null,
      ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || '';
    if (resolution > 0 && dpi > 0) {
      if (coordUnit.toLowerCase() === 'degree' || coordUnit.toLowerCase() === 'degrees' || coordUnit.toLowerCase() === 'dd') {
        scale = 0.0254 * ratio / dpi / resolution / (Math.PI * 2 * datumAxis / 360) / ratio;
        return scale;
      } else {
        scale = 0.0254 * ratio / dpi / resolution / ratio;
        return scale;
      }
    }
    return -1;
  },
  /**
   * @memberOf CommonUtil
   * @description 转换查询结果。
   * @param {Object} result - 查询结果。
   * @returns {Object} 转换后的查询结果。
   */
  transformResult: function transformResult(result) {
    if (result.responseText && typeof result.responseText === 'string') {
      result = JSON.parse(result.responseText);
    }
    return result;
  },
  /**
   * @memberOf CommonUtil
   * @description 属性拷贝，不拷贝方法类名(CLASS_NAME)等。
   * @param {Object} [destination] - 拷贝目标。
   * @param {Object} source - 源对象。
   *
   */
  copyAttributes: function copyAttributes(destination, source) {
    destination = destination || {};
    if (source) {
      for (var property in source) {
        var value = source[property];
        if (value !== undefined && property !== 'CLASS_NAME' && typeof value !== 'function') {
          destination[property] = value;
        }
      }
    }
    return destination;
  },
  /**
   * @memberOf CommonUtil
   * @description 将源对象上的属性拷贝到目标对象上。（不拷贝 CLASS_NAME 和方法）
   * @param {Object} [destination] - 目标对象。
   * @param {Object} source - 源对象。
   * @param {Array.<string>} clip - 源对象中禁止拷贝到目标对象的属性，目的是防止目标对象上不可修改的属性被篡改。
   *
   */
  copyAttributesWithClip: function copyAttributesWithClip(destination, source, clip) {
    destination = destination || {};
    if (source) {
      for (var property in source) {
        //去掉禁止拷贝的属性
        var isInClip = false;
        if (clip && clip.length) {
          for (var i = 0, len = clip.length; i < len; i++) {
            if (property === clip[i]) {
              isInClip = true;
              break;
            }
          }
        }
        if (isInClip === true) {
          continue;
        }
        var value = source[property];
        if (value !== undefined && property !== 'CLASS_NAME' && typeof value !== 'function') {
          destination[property] = value;
        }
      }
    }
    return destination;
  },
  /**
   * @memberOf CommonUtil
   * @description 克隆一个 Object 对象。
   * @param {Object} obj - 需要克隆的对象。
   * @returns {Object} 对象的拷贝对象，注意是新的对象，不是指向。
   */
  cloneObject: function cloneObject(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || 'object' !== Util_typeof(obj)) {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      var copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      var _copy = obj.slice(0);
      return _copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      var _copy2 = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          _copy2[attr] = Util_Util.cloneObject(obj[attr]);
        }
      }
      return _copy2;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
  },
  /**
   * @memberOf CommonUtil
   * @description 判断两条线段是不是有交点。
   * @param {GeometryPoint} a1 - 第一条线段的起始节点。
   * @param {GeometryPoint} a2 - 第一条线段的结束节点。
   * @param {GeometryPoint} b1 - 第二条线段的起始节点。
   * @param {GeometryPoint} b2 - 第二条线段的结束节点。
   * @returns {Object} 如果相交返回交点，如果不相交返回两条线段的位置关系。
   */
  lineIntersection: function lineIntersection(a1, a2, b1, b2) {
    var intersectValue = null;
    var k1;
    var k2;
    var b = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var a = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var ab = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    //ab==0代表两条线断的斜率一样
    if (ab != 0) {
      k1 = b / ab;
      k2 = a / ab;
      if (k1 >= 0 && k2 <= 1 && k1 <= 1 && k2 >= 0) {
        intersectValue = new Geometry.Point(a1.x + k1 * (a2.x - a1.x), a1.y + k1 * (a2.y - a1.y));
      } else {
        intersectValue = 'No Intersection';
      }
    } else {
      if (b == 0 && a == 0) {
        var maxy = Math.max(a1.y, a2.y);
        var miny = Math.min(a1.y, a2.y);
        var maxx = Math.max(a1.x, a2.x);
        var minx = Math.min(a1.x, a2.x);
        if ((b1.y >= miny && b1.y <= maxy || b2.y >= miny && b2.y <= maxy) && b1.x >= minx && b1.x <= maxx || b2.x >= minx && b2.x <= maxx) {
          intersectValue = 'Coincident'; //重合
        } else {
          intersectValue = 'Parallel'; //平行
        }
      } else {
        intersectValue = 'Parallel'; //平行
      }
    }
    return intersectValue;
  },
  /**
   * @memberOf CommonUtil
   * @description 获取文本外接矩形宽度与高度。
   * @param {ThemeStyle} style - 文本样式。
   * @param {string} text - 文本内容。
   * @param {Object} element - DOM 元素。
   * @returns {Object} 裁剪后的宽度，高度信息。
   */
  getTextBounds: function getTextBounds(style, text, element) {
    document.body.appendChild(element);
    element.style.width = 'auto';
    element.style.height = 'auto';
    if (style.fontSize) {
      element.style.fontSize = style.fontSize;
    }
    if (style.fontFamily) {
      element.style.fontFamily = style.fontFamily;
    }
    if (style.fontWeight) {
      element.style.fontWeight = style.fontWeight;
    }
    element.style.position = 'relative';
    element.style.visibility = 'hidden';
    //fix 在某些情况下，element内的文本变成竖起排列，导致宽度计算不正确的bug
    element.style.display = 'inline-block';
    element.innerHTML = text;
    var textWidth = element.clientWidth;
    var textHeight = element.clientHeight;
    document.body.removeChild(element);
    return {
      textWidth: textWidth,
      textHeight: textHeight
    };
  },
  /**
   * @memberOf CommonUtil
   * @description 获取转换后的path路径。
   * @param {string} path - 待转换的path，包含`{param}`。
   * @param {Object} pathParams - path中待替换的参数。
   * @returns {string} 转换后的path路径。
   */
  convertPath: function convertPath(path, pathParams) {
    if (!pathParams) {
      return path;
    }
    return path.replace(/\{([\w-\.]+)\}/g, function (fullMatch, key) {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }
      return encodeURIComponent(value);
    });
  }
};

/**
 * @enum INCHES_PER_UNIT
 * @description 每单位的英尺数。
 * @type {number}
 * @private
 */
var INCHES_PER_UNIT = {
  inches: 1.0,
  ft: 12.0,
  mi: 63360.0,
  m: 39.3701,
  km: 39370.1,
  dd: 4374754,
  yd: 36
};
INCHES_PER_UNIT['in'] = INCHES_PER_UNIT.inches;
INCHES_PER_UNIT['degrees'] = INCHES_PER_UNIT.dd;
INCHES_PER_UNIT['nmi'] = 1852 * INCHES_PER_UNIT.m;

// Units from CS-Map
var METERS_PER_INCH = 0.0254000508001016002;
Util_Util.extend(INCHES_PER_UNIT, {
  Inch: INCHES_PER_UNIT.inches,
  Meter: 1.0 / METERS_PER_INCH,
  //EPSG:9001
  Foot: 0.30480060960121920243 / METERS_PER_INCH,
  //EPSG:9003
  IFoot: 0.3048 / METERS_PER_INCH,
  //EPSG:9002
  ClarkeFoot: 0.3047972651151 / METERS_PER_INCH,
  //EPSG:9005
  SearsFoot: 0.30479947153867624624 / METERS_PER_INCH,
  //EPSG:9041
  GoldCoastFoot: 0.30479971018150881758 / METERS_PER_INCH,
  //EPSG:9094
  IInch: 0.0254 / METERS_PER_INCH,
  MicroInch: 0.0000254 / METERS_PER_INCH,
  Mil: 0.0000000254 / METERS_PER_INCH,
  Centimeter: 0.01 / METERS_PER_INCH,
  Kilometer: 1000.0 / METERS_PER_INCH,
  //EPSG:9036
  Yard: 0.91440182880365760731 / METERS_PER_INCH,
  SearsYard: 0.914398414616029 / METERS_PER_INCH,
  //EPSG:9040
  IndianYard: 0.91439853074444079983 / METERS_PER_INCH,
  //EPSG:9084
  IndianYd37: 0.91439523 / METERS_PER_INCH,
  //EPSG:9085
  IndianYd62: 0.9143988 / METERS_PER_INCH,
  //EPSG:9086
  IndianYd75: 0.9143985 / METERS_PER_INCH,
  //EPSG:9087
  IndianFoot: 0.30479951 / METERS_PER_INCH,
  //EPSG:9080
  IndianFt37: 0.30479841 / METERS_PER_INCH,
  //EPSG:9081
  IndianFt62: 0.3047996 / METERS_PER_INCH,
  //EPSG:9082
  IndianFt75: 0.3047995 / METERS_PER_INCH,
  //EPSG:9083
  Mile: 1609.34721869443738887477 / METERS_PER_INCH,
  IYard: 0.9144 / METERS_PER_INCH,
  //EPSG:9096
  IMile: 1609.344 / METERS_PER_INCH,
  //EPSG:9093
  NautM: 1852.0 / METERS_PER_INCH,
  //EPSG:9030
  'Lat-66': 110943.316488932731 / METERS_PER_INCH,
  'Lat-83': 110946.25736872234125 / METERS_PER_INCH,
  Decimeter: 0.1 / METERS_PER_INCH,
  Millimeter: 0.001 / METERS_PER_INCH,
  Dekameter: 10.0 / METERS_PER_INCH,
  Decameter: 10.0 / METERS_PER_INCH,
  Hectometer: 100.0 / METERS_PER_INCH,
  GermanMeter: 1.0000135965 / METERS_PER_INCH,
  //EPSG:9031
  CaGrid: 0.999738 / METERS_PER_INCH,
  ClarkeChain: 20.1166194976 / METERS_PER_INCH,
  //EPSG:9038
  GunterChain: 20.11684023368047 / METERS_PER_INCH,
  //EPSG:9033
  BenoitChain: 20.116782494375872 / METERS_PER_INCH,
  //EPSG:9062
  SearsChain: 20.11676512155 / METERS_PER_INCH,
  //EPSG:9042
  ClarkeLink: 0.201166194976 / METERS_PER_INCH,
  //EPSG:9039
  GunterLink: 0.2011684023368047 / METERS_PER_INCH,
  //EPSG:9034
  BenoitLink: 0.20116782494375872 / METERS_PER_INCH,
  //EPSG:9063
  SearsLink: 0.2011676512155 / METERS_PER_INCH,
  //EPSG:9043
  Rod: 5.02921005842012 / METERS_PER_INCH,
  IntnlChain: 20.1168 / METERS_PER_INCH,
  //EPSG:9097
  IntnlLink: 0.201168 / METERS_PER_INCH,
  //EPSG:9098
  Perch: 5.02921005842012 / METERS_PER_INCH,
  Pole: 5.02921005842012 / METERS_PER_INCH,
  Furlong: 201.1684023368046 / METERS_PER_INCH,
  Rood: 3.778266898 / METERS_PER_INCH,
  CapeFoot: 0.3047972615 / METERS_PER_INCH,
  Brealey: 375.0 / METERS_PER_INCH,
  ModAmFt: 0.304812252984505969011938 / METERS_PER_INCH,
  Fathom: 1.8288 / METERS_PER_INCH,
  'NautM-UK': 1853.184 / METERS_PER_INCH,
  '50kilometers': 50000.0 / METERS_PER_INCH,
  '150kilometers': 150000.0 / METERS_PER_INCH
});

//unit abbreviations supported by PROJ.4
Util_Util.extend(INCHES_PER_UNIT, {
  mm: INCHES_PER_UNIT['Meter'] / 1000.0,
  cm: INCHES_PER_UNIT['Meter'] / 100.0,
  dm: INCHES_PER_UNIT['Meter'] * 100.0,
  km: INCHES_PER_UNIT['Meter'] * 1000.0,
  kmi: INCHES_PER_UNIT['nmi'],
  //International Nautical Mile
  fath: INCHES_PER_UNIT['Fathom'],
  //International Fathom
  ch: INCHES_PER_UNIT['IntnlChain'],
  //International Chain
  link: INCHES_PER_UNIT['IntnlLink'],
  //International Link
  'us-in': INCHES_PER_UNIT['inches'],
  //U.S. Surveyor's Inch
  'us-ft': INCHES_PER_UNIT['Foot'],
  //U.S. Surveyor's Foot
  'us-yd': INCHES_PER_UNIT['Yard'],
  //U.S. Surveyor's Yard
  'us-ch': INCHES_PER_UNIT['GunterChain'],
  //U.S. Surveyor's Chain
  'us-mi': INCHES_PER_UNIT['Mile'],
  //U.S. Surveyor's Statute Mile
  'ind-yd': INCHES_PER_UNIT['IndianYd37'],
  //Indian Yard
  'ind-ft': INCHES_PER_UNIT['IndianFt37'],
  //Indian Foot
  'ind-ch': 20.11669506 / METERS_PER_INCH //Indian Chain
});

//将服务端的地图单位转成SuperMap的地图单位
INCHES_PER_UNIT['degree'] = INCHES_PER_UNIT.dd;
INCHES_PER_UNIT['meter'] = INCHES_PER_UNIT.m;
INCHES_PER_UNIT['foot'] = INCHES_PER_UNIT.ft;
INCHES_PER_UNIT['inch'] = INCHES_PER_UNIT.inches;
INCHES_PER_UNIT['mile'] = INCHES_PER_UNIT.mi;
INCHES_PER_UNIT['kilometer'] = INCHES_PER_UNIT.km;
INCHES_PER_UNIT['yard'] = INCHES_PER_UNIT.yd;
function paramToString(param) {
  if (param == undefined || param == null) {
    return '';
  }
  if (param instanceof Date) {
    return param.toJSON();
  }
  if (canBeJsonified(param)) {
    return JSON.stringify(param);
  }
  return param.toString();
}
function canBeJsonified(str) {
  if (typeof str !== 'string' && Util_typeof(str) !== 'object') {
    return false;
  }
  try {
    var type = str.toString();
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
}

;// CONCATENATED MODULE: ./src/common/commontypes/Event.js
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @name Event
 * @namespace
 * @category BaseTypes Events
 * @description 事件处理函数.
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const element = {namespace}.Event.element();
 *
 *   // 弃用的写法
 *   const result = SuperMap.Event.element();
 *
 * </script>
 *
 * // ES6 Import
 * import { Event } from '{npm}';
 * 
 * const result = Event.element();
 * ```
 */
var Event = {
  /**
   * @description  事件观察者列表。
   * @type {Object}
   * @default false
   */
  observers: false,
  /**
   * @description KEY_SPACE
   * @type {number}
   * @default 32
   */
  KEY_SPACE: 32,
  /**
   * @description KEY_BACKSPACE
   * @type {number}
   * @default 8
   */
  KEY_BACKSPACE: 8,
  /**
   * @description KEY_TAB
   * @type {number}
   * @default 9
   */
  KEY_TAB: 9,
  /**
   * @description KEY_RETURN
   * @type {number}
   * @default 13
   */
  KEY_RETURN: 13,
  /**
   * @description KEY_ESC
   * @type {number}
   * @default 27
   */
  KEY_ESC: 27,
  /**
   * @description KEY_LEFT
   * @type {number}
   * @default 37
   */
  KEY_LEFT: 37,
  /**
   * @description KEY_UP
   * @type {number}
   * @default 38
   */
  KEY_UP: 38,
  /**
   * @description KEY_RIGHT
   * @type {number}
   * @default 39
   */
  KEY_RIGHT: 39,
  /**
   * @description KEY_DOWN
   * @type {number}
   * @default 40
   */
  KEY_DOWN: 40,
  /**
   * @description KEY_DELETE
   * @type {number}
   * @default 46
   */
  KEY_DELETE: 46,
  /**
   * @description 监听浏览器 DOM 事件。
   * @param {Event} event - Event 对象。
   * @returns {HTMLElement} 触发事件的 DOM 元素。
   */
  element: function element(event) {
    return event.target || event.srcElement;
  },
  /**
   * @description 判断事件是否由单次触摸引起。
   * @param {Event} event - Event 对象。
   * @returns {boolean} 是否有且只有一个当前在与触摸表面接触的 Touch 对象。
   */
  isSingleTouch: function isSingleTouch(event) {
    return event.touches && event.touches.length === 1;
  },
  /**
   * @description 判断事件是否由多点触控引起。
   * @param {Event} event - Event 对象。
   * @returns {boolean} 是否存在多个当前在与触摸表面接触的 Touch 对象。
   */
  isMultiTouch: function isMultiTouch(event) {
    return event.touches && event.touches.length > 1;
  },
  /**
   * @description 确定事件是否由左键单击引起。
   * @param {Event} event - Event 对象。
   * @returns {boolean} 是否点击鼠标左键。
   */
  isLeftClick: function isLeftClick(event) {
    return event.which && event.which === 1 || event.button && event.button === 1;
  },
  /**
   * @description 确定事件是否由鼠标右键单击引起。
   * @param {Event} event - Event 对象。
   * @returns {boolean} 是否点击鼠标右键。
   */
  isRightClick: function isRightClick(event) {
    return event.which && event.which === 3 || event.button && event.button === 2;
  },
  /**
   * @description 阻止事件冒泡。
   * @param {Event} event - Event 对象。
   * @param {boolean} allowDefault - 默认为 false，表示阻止事件的默认行为。
   */
  stop: function stop(event, allowDefault) {
    if (!allowDefault) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  /**
   * @description 查询触发指定事件的 DOM 元素。
   * @param {Event} event - Event 对象。
   * @param {string} tagName - html 标签名。
   * @returns {HTMLElement} DOM 元素。
   */
  findElement: function findElement(event, tagName) {
    var element = Event.element(event);
    while (element.parentNode && (!element.tagName || element.tagName.toUpperCase() != tagName.toUpperCase())) {
      element = element.parentNode;
    }
    return element;
  },
  /**
   * @description 监听事件，注册事件处理方法。
   * @param {(HTMLElement|string)} elementParam - 待监听的 DOM 对象或者其 ID 标识。
   * @param {string} name - 监听事件的类别名称。
   * @param {function} observer - 注册的事件处理方法。
   * @param {boolean} [useCapture=false] - 是否捕获。
   */
  observe: function observe(elementParam, name, observer, useCapture) {
    var element = Util_Util.getElement(elementParam);
    useCapture = useCapture || false;
    if (name === 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) {
      name = 'keydown';
    }

    //if observers cache has not yet been created, create it
    if (!this.observers) {
      this.observers = {};
    }

    //if not already assigned, make a new unique cache ID
    if (!element._eventCacheID) {
      var idPrefix = "eventCacheID_";
      if (element.id) {
        idPrefix = element.id + "_" + idPrefix;
      }
      element._eventCacheID = Util_Util.createUniqueID(idPrefix);
    }
    var cacheID = element._eventCacheID;

    //if there is not yet a hash entry for this element, add one
    if (!this.observers[cacheID]) {
      this.observers[cacheID] = [];
    }

    //add a new observer to this element's list
    this.observers[cacheID].push({
      'element': element,
      'name': name,
      'observer': observer,
      'useCapture': useCapture
    });

    //add the actual browser event listener
    if (element.addEventListener) {
      if (name === 'mousewheel') {
        // https://www.chromestatus.com/features/6662647093133312
        element.addEventListener(name, observer, {
          useCapture: useCapture,
          passive: false
        });
      } else {
        element.addEventListener(name, observer, useCapture);
      }
    } else if (element.attachEvent) {
      element.attachEvent('on' + name, observer);
    }
  },
  /**
   * @description 移除给定 DOM 元素的监听事件。
   * @param {(HTMLElement|string)} elementParam - 待监听的 DOM 对象或者其 ID 标识。
   */
  stopObservingElement: function stopObservingElement(elementParam) {
    var element = Util_Util.getElement(elementParam);
    var cacheID = element._eventCacheID;
    this._removeElementObservers(Event.observers[cacheID]);
  },
  _removeElementObservers: function _removeElementObservers(elementObservers) {
    if (elementObservers) {
      for (var i = elementObservers.length - 1; i >= 0; i--) {
        var entry = elementObservers[i];
        var args = new Array(entry.element, entry.name, entry.observer, entry.useCapture);
        Event.stopObserving.apply(this, args);
      }
    }
  },
  /**
   * @description 移除事件监听和注册的事件处理方法。注意：事件的移除和监听相对应，移除时的各属性信息必须监听时保持一致才能确保事件移除成功。
   * @param {(HTMLElement|string)} elementParam - 被监听的 DOM 元素或者其 ID。
   * @param {string} name - 需要移除的被监听事件名称。
   * @param {function} observer - 需要移除的事件处理方法。
   * @param {boolean} [useCapture=false] - 是否捕获。
   * @returns {boolean} 监听事件是否被移除。
   */
  stopObserving: function stopObserving(elementParam, name, observer, useCapture) {
    useCapture = useCapture || false;
    var element = Util_Util.getElement(elementParam);
    var cacheID = element._eventCacheID;
    if (name === 'keypress') {
      if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent) {
        name = 'keydown';
      }
    }

    // find element's entry in this.observers cache and remove it
    var foundEntry = false;
    var elementObservers = Event.observers[cacheID];
    if (elementObservers) {
      // find the specific event type in the element's list
      var i = 0;
      while (!foundEntry && i < elementObservers.length) {
        var cacheEntry = elementObservers[i];
        if (cacheEntry.name === name && cacheEntry.observer === observer && cacheEntry.useCapture === useCapture) {
          elementObservers.splice(i, 1);
          if (elementObservers.length == 0) {
            delete Event.observers[cacheID];
          }
          foundEntry = true;
          break;
        }
        i++;
      }
    }

    //actually remove the event listener from browser
    if (foundEntry) {
      if (element.removeEventListener) {
        element.removeEventListener(name, observer, useCapture);
      } else if (element && element.detachEvent) {
        element.detachEvent('on' + name, observer);
      }
    }
    return foundEntry;
  },
  /**
   * @description 移除缓存中的监听事件。
   */
  unloadCache: function unloadCache() {
    // check for Event before checking for observers, because
    // Event may be undefined in IE if no map instance was
    // created
    if (Event && Event.observers) {
      for (var cacheID in Event.observers) {
        var elementObservers = Event.observers[cacheID];
        Event._removeElementObservers.apply(this, [elementObservers]);
      }
      Event.observers = false;
    }
  },
  CLASS_NAME: "SuperMap.Event"
};
/* prevent memory leaks in IE */
Event.observe(window, 'resize', Event.unloadCache, false);
;// CONCATENATED MODULE: ./src/common/commontypes/Events.js
function Events_typeof(o) { "@babel/helpers - typeof"; return Events_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Events_typeof(o); }
function Events_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Events_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Events_toPropertyKey(descriptor.key), descriptor); } }
function Events_createClass(Constructor, protoProps, staticProps) { if (protoProps) Events_defineProperties(Constructor.prototype, protoProps); if (staticProps) Events_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Events_toPropertyKey(t) { var i = Events_toPrimitive(t, "string"); return "symbol" == Events_typeof(i) ? i : String(i); }
function Events_toPrimitive(t, r) { if ("object" != Events_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Events_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class Events
 * @deprecatedclass SuperMap.Events
 * @classdesc 事件类。
 * @category BaseTypes Events
 * @param {Object} object - 当前事件对象被添加到的 JS 对象。
 * @param {HTMLElement} element - 响应浏览器事件的 DOM 元素。
 * @param {Array.<string>} eventTypes - 自定义应用事件的数组。
 * @param {boolean} [fallThrough=false] - 是否允许事件处理之后向上传递（冒泡），为 false 的时候阻止事件冒泡。
 * @param {Object} options - 事件对象选项。
 * @usage
 */
var Events = /*#__PURE__*/function () {
  function Events(object, element, eventTypes, fallThrough, options) {
    Events_classCallCheck(this, Events);
    /**
     * @member {Array.<string>} Events.prototype.BROWSER_EVENTS
     * @description 支持的事件。
     * @constant
     * @default [
     "mouseover", "mouseout","mousedown", "mouseup", "mousemove",
     "click", "dblclick", "rightclick", "dblrightclick","resize",
     "focus", "blur","touchstart", "touchmove", "touchend","keydown",
     "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup",
     "MSGestureStart", "MSGestureChange", "MSGestureEnd","contextmenu"
     ]
     */
    this.BROWSER_EVENTS = ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur", "touchstart", "touchmove", "touchend", "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup", "MSGestureStart", "MSGestureChange", "MSGestureEnd", "contextmenu"];

    /**
     * @member {Object} Events.prototype.listeners
     * @description 事件监听器函数。
     */
    this.listeners = {};

    /**
     * @member {Object} Events.prototype.object
     * @description  发布应用程序事件的对象。
     */
    this.object = object;

    /**
     * @member {HTMLElement} Events.prototype.element
     * @description 接受浏览器事件的 DOM 节点。
     */
    this.element = null;

    /**
     * @member {Array.<string>} Events.prototype.eventTypes
     * @description 支持的事件类型列表。
     */
    this.eventTypes = [];

    /**
     * @member {function} Events.prototype.eventHandler
     * @description 绑定在元素上的事件处理器对象。
     */
    this.eventHandler = null;

    /**
     * @member {boolean} [Events.prototype.fallThrough=false]
     * @description 是否允许事件处理之后向上传递（冒泡），为 false 的时候阻止事件冒泡。
     */
    this.fallThrough = fallThrough;

    /**
     * @member {boolean} [Events.prototype.includeXY=false]
     * @description 判断是否让 xy 属性自动创建到浏览器上的鼠标事件，一般设置为 false，如果设置为 true，鼠标事件将会在事件传递过程中自动产生 xy 属性。可根据事件对象的 'evt.object' 属性在相关的事件句柄上调用 getMousePosition 函数。这个选项习惯默认为 false 的原因在于，当创建一个事件对象，其主要目的是管理。在一个 div 的相对定位的鼠标事件，将其设为 true 也是有意义的。这个选项也可以用来控制是否抵消缓存。如果设为 false 不抵消，如果设为 true，用 this.clearMouseCache() 清除缓存偏移（边界元素偏移，元素在页面的位置偏移）。
     * @example
     *  function named(evt) {
     *        this.xy = this.object.events.getMousePosition(evt);
     *  }
     */
    this.includeXY = false;

    /**
     * @member {Object} Events.prototype.extensions
     * @description 事件扩展。Keys 代表事件类型，values 代表事件对象。
     */
    this.extensions = {};

    /**
     * @member {Object} Events.prototype.extensionCount
     * @description 事件扩展数量。
     */
    this.extensionCount = {};
    /**
     * @member {Object} Events.prototype.clearMouseListener
     * @description 待移除的鼠标监听事件。
     */
    this.clearMouseListener = null;
    Util_Util.extend(this, options);
    if (eventTypes != null) {
      for (var i = 0, len = eventTypes.length; i < len; i++) {
        this.addEventType(eventTypes[i]);
      }
    }
    if (element != null) {
      this.attachToElement(element);
    }
    this.CLASS_NAME = "SuperMap.Events";
  }

  /**
   * @function Events.prototype.destroy
   * @description 移除当前要素 element 上的所有事件监听和处理。
   */
  Events_createClass(Events, [{
    key: "destroy",
    value: function destroy() {
      for (var e in this.extensions) {
        if (typeof this.extensions[e] !== "boolean") {
          this.extensions[e].destroy();
        }
      }
      this.extensions = null;
      if (this.element) {
        Event.stopObservingElement(this.element);
        if (this.element.hasScrollEvent) {
          Event.stopObserving(window, "scroll", this.clearMouseListener);
        }
      }
      this.element = null;
      this.listeners = null;
      this.object = null;
      this.eventTypes = null;
      this.fallThrough = null;
      this.eventHandler = null;
    }

    /**
     * @function Events.prototype.addEventType
     * @description 在此事件对象中添加新的事件类型，如果这个事件类型已经添加过了，则不做任何事情。
     * @param {string} eventName - 事件名。
     */
  }, {
    key: "addEventType",
    value: function addEventType(eventName) {
      if (!this.listeners[eventName]) {
        this.eventTypes.push(eventName);
        this.listeners[eventName] = [];
      }
    }

    /**
     * @function Events.prototype.attachToElement
     * @description 给 DOM 元素绑定浏览器事件。
     * @param {HTMLElement} element - 绑定浏览器事件的 DOM 元素。
     */
  }, {
    key: "attachToElement",
    value: function attachToElement(element) {
      if (this.element) {
        Event.stopObservingElement(this.element);
      } else {
        // keep a bound copy of handleBrowserEvent() so that we can
        // pass the same function to both Event.observe() and .stopObserving()
        this.eventHandler = FunctionExt.bindAsEventListener(this.handleBrowserEvent, this);

        // to be used with observe and stopObserving
        this.clearMouseListener = FunctionExt.bind(this.clearMouseCache, this);
      }
      this.element = element;
      for (var i = 0, len = this.BROWSER_EVENTS.length; i < len; i++) {
        var eventType = this.BROWSER_EVENTS[i];

        // every browser event has a corresponding application event
        // (whether it's listened for or not).
        this.addEventType(eventType);

        // use Prototype to register the event cross-browser
        Event.observe(element, eventType, this.eventHandler);
      }
      // disable dragstart in IE so that mousedown/move/up works normally
      Event.observe(element, "dragstart", Event.stop);
    }

    /**
     * @function Events.prototype.on
     * @description 在一个相同的范围内注册监听器的方法，此方法调用 register 函数。
     * @example
     * // 注册一个 "loadstart" 监听事件
     * events.on({"loadstart": loadStartListener});
     *
     * // 同样注册一个 "loadstart" 监听事件
     * events.register("loadstart", undefined, loadStartListener);
     *
     * // 同时为对象注册多个监听事件
     * events.on({
     *     "loadstart": loadStartListener,
     *     "loadend": loadEndListener,
     *     scope: object
     * });
     *
     * // 同时为对象注册多个监听事件，多次调用 register 方法
     * events.register("loadstart", object, loadStartListener);
     * events.register("loadend", object, loadEndListener);
     *
     *
     * @param {Object} object - 添加监听的对象。
     */
  }, {
    key: "on",
    value: function on(object) {
      for (var type in object) {
        if (type !== "scope" && object.hasOwnProperty(type)) {
          this.register(type, object.scope, object[type]);
        }
      }
    }

    /**
     * @function Events.prototype.register
     * @description 在事件对象上注册一个事件。当事件被触发时，'func' 函数被调用，假设我们触发一个事件，
     *              指定 Bounds 作为 "obj"，当事件被触发时，回调函数的上下文作为 Bounds 对象。
     * @param {string} type - 事件注册者的名字。
     * @param {Object} [obj=this.object] - 对象绑定的回调。
     * @param {function} [func] - 回调函数，如果没有特定的回调，则这个函数不做任何事情。
     * @param {(boolean|Object)} [priority] - 当为 true 时将新的监听加在事件队列的前面。
     */
  }, {
    key: "register",
    value: function register(type, obj, func, priority) {
      if (type in Events && !this.extensions[type]) {
        this.extensions[type] = new Events[type](this);
      }
      if (func != null && Util_Util.indexOf(this.eventTypes, type) !== -1) {
        if (obj == null) {
          obj = this.object;
        }
        var listeners = this.listeners[type];
        if (!listeners) {
          listeners = [];
          this.listeners[type] = listeners;
          this.extensionCount[type] = 0;
        }
        var listener = {
          obj: obj,
          func: func
        };
        if (priority) {
          listeners.splice(this.extensionCount[type], 0, listener);
          if (Events_typeof(priority) === "object" && priority.extension) {
            this.extensionCount[type]++;
          }
        } else {
          listeners.push(listener);
        }
      }
    }

    /**
     * @function Events.prototype.registerPriority
     * @description 相同的注册方法，但是在前面增加新的监听者事件查询而代替到方法的结束。
     * @param {string} type - 事件注册者的名字。
     * @param {Object} [obj=this.object] - 对象绑定的回调。
     * @param {function} [func] - 回调函数，如果没有特定的回调，则这个函数不做任何事情。
     */
  }, {
    key: "registerPriority",
    value: function registerPriority(type, obj, func) {
      this.register(type, obj, func, true);
    }

    /**
     * @function Events.prototype.un
     * @description 在一个相同的范围内取消注册监听器的方法，此方法调用 unregister 函数。
     * @example
     * // 移除 "loadstart" 事件监听
     * events.un({"loadstart": loadStartListener});
     *
     * // 使用 "unregister" 方法移除 "loadstart" 事件监听
     * events.unregister("loadstart", undefined, loadStartListener);
     *
     * // 取消对象多个事件监听
     * events.un({
     *     "loadstart": loadStartListener,
     *     "loadend": loadEndListener,
     *     scope: object
     * });
     *
     * // 取消对象多个事件监听，多次调用unregister方法。
     * events.unregister("loadstart", object, loadStartListener);
     * events.unregister("loadend", object, loadEndListener);
     *
     * @param {Object} object - 移除监听的对象。
     */
  }, {
    key: "un",
    value: function un(object) {
      for (var type in object) {
        if (type !== "scope" && object.hasOwnProperty(type)) {
          this.unregister(type, object.scope, object[type]);
        }
      }
    }

    /**
     * @function Events.prototype.unregister
     * @description 取消注册。
     * @param {string} type - 事件类型。
     * @param {Object} [obj=this.object] - 对象绑定的回调。
     * @param {function} [func] - 回调函数，如果没有特定的回调，则这个函数不做任何事情。
     */
  }, {
    key: "unregister",
    value: function unregister(type, obj, func) {
      if (obj == null) {
        obj = this.object;
      }
      var listeners = this.listeners[type];
      if (listeners != null) {
        for (var i = 0, len = listeners.length; i < len; i++) {
          if (listeners[i].obj === obj && listeners[i].func === func) {
            listeners.splice(i, 1);
            break;
          }
        }
      }
    }

    /**
     * @function Events.prototype.remove
     * @description 删除某个事件类型的所有监听，如果该事件类型没有注册，则不做任何操作。
     * @param {string} type - 事件类型。
     */
  }, {
    key: "remove",
    value: function remove(type) {
      if (this.listeners[type] != null) {
        this.listeners[type] = [];
      }
    }

    /**
     * @function Events.prototype.triggerEvent
     * @description 触发一个特定的注册事件。
     * @param {string} type - 触发事件类型。
     * @param {Event} evt - 事件对象。
     * @returns {Event|boolean} 监听对象，如果返回是 false，则停止监听。
     */
  }, {
    key: "triggerEvent",
    value: function triggerEvent(type, evt) {
      var listeners = this.listeners[type];

      // fast path
      if (!listeners || listeners.length == 0) {
        return undefined;
      }

      // prep evt object with object & div references
      if (evt == null) {
        evt = {};
      }
      evt.object = this.object;
      evt.element = this.element;
      if (!evt.type) {
        evt.type = type;
      }

      // execute all callbacks registered for specified type
      // get a clone of the listeners array to
      // allow for splicing during callbacks
      listeners = listeners.slice();
      var continueChain;
      for (var i = 0, len = listeners.length; i < len; i++) {
        var callback = listeners[i];
        // bind the context to callback.obj
        continueChain = callback.func.apply(callback.obj, [evt]);
        if (continueChain != undefined && continueChain === false) {
          // if callback returns false, execute no more callbacks.
          break;
        }
      }
      // don't fall through to other DOM elements
      if (!this.fallThrough) {
        Event.stop(evt, true);
      }
      return continueChain;
    }

    /**
     * @function Events.prototype.handleBrowserEvent
     * @description 对 triggerEvent 函数的包装，给事件对象设置了 xy 属性（即当前鼠标点的 xy 坐标）。
     * @param {Event} evt - 事件对象。
     */
  }, {
    key: "handleBrowserEvent",
    value: function handleBrowserEvent(evt) {
      var type = evt.type,
        listeners = this.listeners[type];
      if (!listeners || listeners.length == 0) {
        // noone's listening, bail out
        return;
      }
      // add clientX & clientY to all events - corresponds to average x, y
      var touches = evt.touches;
      if (touches && touches[0]) {
        var x = 0;
        var y = 0;
        var num = touches.length;
        var touch;
        for (var i = 0; i < num; ++i) {
          touch = touches[i];
          x += touch.clientX;
          y += touch.clientY;
        }
        evt.clientX = x / num;
        evt.clientY = y / num;
      }
      if (this.includeXY) {
        evt.xy = this.getMousePosition(evt);
      }
      this.triggerEvent(type, evt);
    }

    /**
     * @function Events.prototype.clearMouseCache
     * @description 清除鼠标缓存。
     */
  }, {
    key: "clearMouseCache",
    value: function clearMouseCache() {
      this.element.scrolls = null;
      this.element.lefttop = null;
      var body = document.body;
      if (body && !((body.scrollTop != 0 || body.scrollLeft != 0) && navigator.userAgent.match(/iPhone/i))) {
        this.element.offsets = null;
      }
    }

    /**
     * @function Events.prototype.getMousePosition
     * @description 获取当前鼠标的位置。
     * @param {Event} evt - 事件对象。
     * @returns {Pixel} 当前的鼠标的 xy 坐标点。
     */
  }, {
    key: "getMousePosition",
    value: function getMousePosition(evt) {
      if (!this.includeXY) {
        this.clearMouseCache();
      } else if (!this.element.hasScrollEvent) {
        Event.observe(window, "scroll", this.clearMouseListener);
        this.element.hasScrollEvent = true;
      }
      if (!this.element.scrolls) {
        var viewportElement = Util_Util.getViewportElement();
        this.element.scrolls = [viewportElement.scrollLeft, viewportElement.scrollTop];
      }
      if (!this.element.lefttop) {
        this.element.lefttop = [document.documentElement.clientLeft || 0, document.documentElement.clientTop || 0];
      }
      if (!this.element.offsets) {
        this.element.offsets = Util_Util.pagePosition(this.element);
      }
      return new Pixel(evt.clientX + this.element.scrolls[0] - this.element.offsets[0] - this.element.lefttop[0], evt.clientY + this.element.scrolls[1] - this.element.offsets[1] - this.element.lefttop[1]);
    }
  }]);
  return Events;
}();
Events.prototype.BROWSER_EVENTS = ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur", "touchstart", "touchmove", "touchend", "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup", "MSGestureStart", "MSGestureChange", "MSGestureEnd", "contextmenu"];
;// CONCATENATED MODULE: ./src/common/thirdparty/elasticsearch/ElasticSearch.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ElasticSearch_typeof(o) { "@babel/helpers - typeof"; return ElasticSearch_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ElasticSearch_typeof(o); }
function ElasticSearch_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function ElasticSearch_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, ElasticSearch_toPropertyKey(descriptor.key), descriptor); } }
function ElasticSearch_createClass(Constructor, protoProps, staticProps) { if (protoProps) ElasticSearch_defineProperties(Constructor.prototype, protoProps); if (staticProps) ElasticSearch_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ElasticSearch_toPropertyKey(t) { var i = ElasticSearch_toPrimitive(t, "string"); return "symbol" == ElasticSearch_typeof(i) ? i : String(i); }
function ElasticSearch_toPrimitive(t, r) { if ("object" != ElasticSearch_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ElasticSearch_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @class ElasticSearch
 * @deprecatedclass SuperMap.ElasticSearch
 * @classdesc ElasticSearch服务类。
 * @category ElasticSearch
 * @modulecategory Services
 * @param {string} url - ElasticSearch服务地址。
 * @param {Object} es - elasticsearch的全局变量。注意：需要@elastic/elasticsearch@5.6.22或者elasticsearch@16.7.3。
 * @param {Object} options - 参数。
 * @param {function} [options.change] - 服务器返回数据后执行的函数。废弃,不建议使用。使用search或msearch方法。
 * @param {boolean} [options.openGeoFence=false] - 是否开启地理围栏验证，默认为不开启。
 * @param {function} [options.outOfGeoFence] - 数据超出地理围栏后执行的函数。
 * @param {Object} [options.geoFence] - 地理围栏。
 * @usage
 */

var ElasticSearch = /*#__PURE__*/function () {
  function ElasticSearch(url, es, options) {
    ElasticSearch_classCallCheck(this, ElasticSearch);
    if (!es || typeof es !== 'function' && ElasticSearch_typeof(es) !== 'object' || typeof es.Client !== 'function') {
      throw Error('Please enter the global variable of @elastic/elasticsearch@5.6.22 or elasticsearch@16.7.3 for the second parameter!');
    }
    options = options || {};
    /**
     *  @member {string} ElasticSearch.prototype.url
     *  @description ElasticSearch服务地址。
     */
    this.url = url;
    /**
     *  @member {Object} ElasticSearch.prototype.client
     *  @description client ES客户端。
     */
    try {
      // 老版本
      this.client = new es.Client({
        host: this.url
      });
    } catch (e) {
      // 新版本
      this.client = new es.Client({
        node: {
          url: new URL(this.url)
        }
      });
    }
    /**
     *  @deprecated
     *  @member {function} [ElasticSearch.prototype.change]
     *  @description 服务器返回数据后执行的函数。废弃,不建议使用。使用search或msearch方法。
     */
    this.change = null;
    /**
     *  @member {boolean} [ElasticSearch.prototype.openGeoFence=false]
     *  @description 是否开启地理围栏验证，默认为不开启。
     */
    this.openGeoFence = false;
    /**
     *  @member {function} [ElasticSearch.prototype.outOfGeoFence]
     *  @description 数据超出地理围栏后执行的函数。
     */
    this.outOfGeoFence = null;

    /**
     * @member {Object} [ElasticSearch.prototype.geoFence]
     * @description 地理围栏。
     * @example {
    *    radius: 1000,//单位是m
    *    center: [104.40, 30.43],
    *    unit: 'meter|degree'
    *  }
     */
    this.geoFence = null;

    /*
     * Constant: EVENT_TYPES
     * {Array.<String>}
     * 此类支持的事件类型。
     *
     */
    this.EVENT_TYPES = ['change', 'error', 'outOfGeoFence'];

    /**
     * @member {Events} ElasticSearch.prototype.events
     * @description 事件。
     */
    this.events = new Events(this, null, this.EVENT_TYPES);

    /**
     * @member {Object} ElasticSearch.prototype.eventListeners
     * @description 监听器对象，在构造函数中设置此参数（可选），对 MapService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 Events.on(eventListeners)。
     */
    this.eventListeners = null;
    Util_Util.extend(this, options);
    if (this.eventListeners instanceof Object) {
      this.events.on(this.eventListeners);
    }
  }

  /**
   * @function ElasticSearch.prototype.setGeoFence
   * @description 设置地理围栏，openGeoFence参数为true的时候，设置的地理围栏才生效。
   * @param {Geometry} geoFence - 地理围栏。
   */
  ElasticSearch_createClass(ElasticSearch, [{
    key: "setGeoFence",
    value: function setGeoFence(geoFence) {
      this.geoFence = geoFence;
    }

    /**
     * @function ElasticSearch.prototype.bulk
     * @description 批量操作API，允许执行多个索引/删除操作。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-bulk}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "bulk",
    value: function bulk(params, callback) {
      return this.client.bulk(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.clearScroll
     * @description 通过指定scroll参数进行查询来清除已经创建的scroll请求。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-clearscroll}</br>
     *更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "clearScroll",
    value: function clearScroll(params, callback) {
      return this.client.clearScroll(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.count
     * @description 获取集群、索引、类型或查询的文档个数。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-count}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-count.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "count",
    value: function count(params, callback) {
      return this.client.count(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.create
     * @description 在特定索引中添加一个类型化的JSON文档，使其可搜索。如果具有相同index，type且ID已经存在的文档将发生错误。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-create}
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html}
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "create",
    value: function create(params, callback) {
      return this.client.create(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.delete
     * @description 根据其ID从特定索引中删除键入的JSON文档。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-delete}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "delete",
    value: function _delete(params, callback) {
      return this.client["delete"](params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.deleteByQuery
     * @description 根据其ID从特定索引中删除键入的JSON文档。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletebyquery}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "deleteByQuery",
    value: function deleteByQuery(params, callback) {
      return this.client.deleteByQuery(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.deleteScript
     * @description 根据其ID删除脚本。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletescript}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "deleteScript",
    value: function deleteScript(params, callback) {
      return this.client.deleteScript(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.deleteTemplate
     * @description 根据其ID删除模板。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletetemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "deleteTemplate",
    value: function deleteTemplate(params, callback) {
      return this.client.deleteTemplate(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.exists
     * @description 检查给定文档是否存在。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-exists}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "exists",
    value: function exists(params, callback) {
      return this.client.exists(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.existsSource
     * @description 检查资源是否存在。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-existssource}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "existsSource",
    value: function existsSource(params, callback) {
      return this.client.existsSource(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.explain
     * @description 提供与特定查询相关的特定文档分数的详细信息。它还会告诉您文档是否与指定的查询匹配。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-explain}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-explain.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "explain",
    value: function explain(params, callback) {
      return this.client.explain(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.fieldCaps
     * @description 允许检索多个索引之间的字段的功能。(实验性API，可能会在未来版本中删除)</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-fieldcaps}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-field-caps.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "fieldCaps",
    value: function fieldCaps(params, callback) {
      return this.client.fieldCaps(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.get
     * @description 从索引获取一个基于其ID的类型的JSON文档。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-get}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "get",
    value: function get(params, callback) {
      return this.client.get(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.getScript
     * @description 获取脚本。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getscript}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "getScript",
    value: function getScript(params, callback) {
      return this.client.getScript(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.getSource
     * @description 通过索引，类型和ID获取文档的源。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getsource}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "getSource",
    value: function getSource(params, callback) {
      return this.client.getSource(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.getTemplate
     * @description 获取模板。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-gettemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "getTemplate",
    value: function getTemplate(params, callback) {
      return this.client.getTemplate(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.index
     * @description 在索引中存储一个键入的JSON文档，使其可搜索。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-index}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "index",
    value: function index(params, callback) {
      return this.client.index(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.info
     * @description 从当前集群获取基本信息。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-info}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/index.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "info",
    value: function info(params, callback) {
      return this.client.info(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.mget
     * @description 根据索引，类型（可选）和ids来获取多个文档。mget所需的主体可以采用两种形式：文档位置数组或文档ID数组。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mget}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "mget",
    value: function mget(params, callback) {
      return this.client.mget(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.msearch
     * @description 在同一请求中执行多个搜索请求。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearch}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 请求返回的回调函数。也可以使用then表达式获取返回结果。
     *     回调参数：error,response，结果存储在response.responses中。
     */
  }, {
    key: "msearch",
    value: function msearch(params, callback) {
      var me = this;
      return me.client.msearch(params).then(function (resp) {
        resp = resp.body || resp;
        me._update(resp.responses, callback);
        return resp;
      }, function (err) {
        callback(err);
        me.events.triggerEvent('error', {
          error: err
        });
        return err;
      });
    }

    /**
     * @function ElasticSearch.prototype.msearchTemplate
     * @description 在同一请求中执行多个搜索模板请求。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearchtemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "msearchTemplate",
    value: function msearchTemplate(params, callback) {
      return this.client.msearchTemplate(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.mtermvectors
     * @description 多termvectors API允许一次获得多个termvectors。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mtermvectors}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-termvectors.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "mtermvectors",
    value: function mtermvectors(params, callback) {
      return this.client.mtermvectors(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.ping
     * @description 测试连接。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-ping}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/index.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "ping",
    value: function ping(params, callback) {
      return this.client.ping(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.putScript
     * @description 添加脚本。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-putscript}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "putScript",
    value: function putScript(params, callback) {
      return this.client.putScript(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.putTemplate
     * @description 添加模板。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-puttemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "putTemplate",
    value: function putTemplate(params, callback) {
      return this.client.putTemplate(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.reindex
     * @description 重新索引。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindex}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "reindex",
    value: function reindex(params, callback) {
      return this.client.reindex(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.reindexRessrottle
     * @description 重新索引。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindexrethrottle}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "reindexRessrottle",
    value: function reindexRessrottle(params, callback) {
      return this.client.reindexRessrottle(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.renderSearchTemplate
     * @description 搜索模板。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-rendersearchtemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "renderSearchTemplate",
    value: function renderSearchTemplate(params, callback) {
      return this.client.renderSearchTemplate(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.scroll
     * @description  在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-scroll}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "scroll",
    value: function scroll(params, callback) {
      return this.client.scroll(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.search
     * @description  在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 请求返回的回调函数。也可以使用then表达式获取返回结果。
     *     回调参数：error,response，结果存储在response.responses中。
     */
  }, {
    key: "search",
    value: function search(params, callback) {
      var me = this;
      return me.client.search(params).then(function (resp) {
        resp = resp.body || resp;
        me._update(resp, callback);
        return resp;
      }, function (err) {
        callback && callback(err);
        me.events.triggerEvent('error', {
          error: err
        });
        return err;
      });
    }

    /**
     * @function ElasticSearch.prototype.searchShards
     * @description  返回要执行搜索请求的索引和分片。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchshards}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-shards.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "searchShards",
    value: function searchShards(params, callback) {
      return this.client.searchShards(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.searchTemplate
     * @description  搜索模板。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchtemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "searchTemplate",
    value: function searchTemplate(params, callback) {
      return this.client.searchTemplate(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.suggest
     * @description 该建议功能通过使用特定的建议者，基于所提供的文本来建议类似的术语。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-suggest}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "suggest",
    value: function suggest(params, callback) {
      return this.client.suggest(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.termvectors
     * @description 返回有关特定文档字段中的术语的信息和统计信息。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-termvectors}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-termvectors.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "termvectors",
    value: function termvectors(params, callback) {
      return this.client.termvectors(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.update
     * @description 更新文档的部分。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-update}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "update",
    value: function update(params, callback) {
      return this.client.update(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.updateByQuery
     * @description 通过查询API来更新文档。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-updatebyquery}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
  }, {
    key: "updateByQuery",
    value: function updateByQuery(params, callback) {
      return this.client.updateByQuery(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype._handleCallback
     * @description 处理ElasticSearch 16.x和5.x的callback兼容。 5.x的回调参数多包了一层body
     * @param {function} callback - 回调函数。
     * @private
     */
  }, {
    key: "_handleCallback",
    value: function _handleCallback(callback) {
      return function () {
        var args = Array.from(arguments);
        var error = args.shift();
        var resp = args.shift();
        var body = resp && resp.body;
        if (body) {
          var _resp = resp,
            statusCode = _resp.statusCode,
            headers = _resp.headers;
          args = [statusCode, headers];
          resp = body;
        }
        callback.call.apply(callback, [this, error, resp].concat(_toConsumableArray(args)));
      };
    }
  }, {
    key: "_update",
    value: function _update(data, callback) {
      var me = this;
      if (!data) {
        return;
      }
      me.data = data;
      if (me.openGeoFence && me.geoFence) {
        me._validateDatas(data);
      }
      me.events.triggerEvent('change', {
        data: me.data
      });
      //change方法已废弃，不建议使用。建议使用search方法的第二个参数传入请求成功的回调
      if (me.change) {
        me.change && me.change(data);
      } else {
        //加responses是为了保持跟原来es自身的数据结构一致
        callback && callback(undefined, {
          responses: data
        });
      }
    }
  }, {
    key: "_validateDatas",
    value: function _validateDatas(datas) {
      if (!datas) {
        return;
      }
      if (!(datas instanceof Array)) {
        datas = [datas];
      }
      var i,
        len = datas.length;
      for (i = 0; i < len; i++) {
        this._validateData(datas[i]);
      }
    }
  }, {
    key: "_validateData",
    value: function _validateData(data) {
      var me = this;
      data.hits.hits.map(function (source) {
        var content = source._source;
        var meterUnit = me._getMeterPerMapUnit(me.geoFence.unit);
        var geoFenceCX = me.geoFence.center[0] * meterUnit;
        var geoFenceCY = me.geoFence.center[1] * meterUnit;
        var contentX = content.x * meterUnit;
        var contentY = content.y * meterUnit;
        var distance = me._distance(contentX, contentY, geoFenceCX, geoFenceCY);
        var radius = me.geoFence.radius;
        if (distance > radius) {
          me.outOfGeoFence && me.outOfGeoFence(data);
          me.events.triggerEvent('outOfGeoFence', {
            data: data
          });
        }
        return source;
      });
    }
  }, {
    key: "_distance",
    value: function _distance(x1, y1, x2, y2) {
      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
  }, {
    key: "_getMeterPerMapUnit",
    value: function _getMeterPerMapUnit(mapUnit) {
      var earchRadiusInMeters = 6378137;
      var meterPerMapUnit;
      if (mapUnit === 'meter') {
        meterPerMapUnit = 1;
      } else if (mapUnit === 'degree') {
        // 每度表示多少米。
        meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
      }
      return meterPerMapUnit;
    }
  }]);
  return ElasticSearch;
}();
// EXTERNAL MODULE: ./node_modules/promise-polyfill/dist/polyfill.js
var polyfill = __webpack_require__(3819);
// EXTERNAL MODULE: ./node_modules/fetch-ie8/fetch.js
var fetch = __webpack_require__(4537);
// EXTERNAL MODULE: ./node_modules/fetch-jsonp/build/fetch-jsonp.js
var fetch_jsonp = __webpack_require__(9005);
var fetch_jsonp_default = /*#__PURE__*/__webpack_require__.n(fetch_jsonp);
;// CONCATENATED MODULE: ./src/common/util/FetchRequest.js
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




var FetchRequest_fetch = window.fetch;
var setFetch = function setFetch(newFetch) {
  FetchRequest_fetch = newFetch;
};
var RequestJSONPPromise = {
  limitLength: 1500,
  queryKeys: [],
  queryValues: [],
  supermap_callbacks: {},
  addQueryStrings: function addQueryStrings(values) {
    var me = this;
    for (var key in values) {
      me.queryKeys.push(key);
      if (typeof values[key] !== 'string') {
        values[key] = Util_Util.toJSON(values[key]);
      }
      var tempValue = encodeURIComponent(values[key]);
      me.queryValues.push(tempValue);
    }
  },
  issue: function issue(config) {
    var me = this,
      uid = me.getUid(),
      url = config.url,
      splitQuestUrl = [];

    // me.addQueryStrings({
    //     callback: "RequestJSONPPromise.supermap_callbacks[" + uid + "]"
    // });
    var sectionURL = url,
      keysCount = 0; //此次sectionURL中有多少个key
    var length = me.queryKeys ? me.queryKeys.length : 0;
    for (var i = 0; i < length; i++) {
      if (sectionURL.length + me.queryKeys[i].length + 2 >= me.limitLength) {
        //+2 for ("&"or"?")and"="
        if (keysCount == 0) {
          return false;
        }
        splitQuestUrl.push(sectionURL);
        sectionURL = url;
        keysCount = 0;
        i--;
      } else {
        if (sectionURL.length + me.queryKeys[i].length + 2 + me.queryValues[i].length > me.limitLength) {
          var leftValue = me.queryValues[i];
          while (leftValue.length > 0) {
            var leftLength = me.limitLength - sectionURL.length - me.queryKeys[i].length - 2; //+2 for ("&"or"?")and"="
            if (sectionURL.indexOf('?') > -1) {
              sectionURL += '&';
            } else {
              sectionURL += '?';
            }
            var tempLeftValue = leftValue.substring(0, leftLength);
            //避免 截断sectionURL时，将类似于%22这样的符号截成两半，从而导致服务端组装sectionURL时发生错误
            if (tempLeftValue.substring(leftLength - 1, leftLength) === '%') {
              leftLength -= 1;
              tempLeftValue = leftValue.substring(0, leftLength);
            } else if (tempLeftValue.substring(leftLength - 2, leftLength - 1) === '%') {
              leftLength -= 2;
              tempLeftValue = leftValue.substring(0, leftLength);
            }
            sectionURL += me.queryKeys[i] + '=' + tempLeftValue;
            leftValue = leftValue.substring(leftLength);
            if (tempLeftValue.length > 0) {
              splitQuestUrl.push(sectionURL);
              sectionURL = url;
              keysCount = 0;
            }
          }
        } else {
          keysCount++;
          if (sectionURL.indexOf('?') > -1) {
            sectionURL += '&';
          } else {
            sectionURL += '?';
          }
          sectionURL += me.queryKeys[i] + '=' + me.queryValues[i];
        }
      }
    }
    splitQuestUrl.push(sectionURL);
    return me.send(splitQuestUrl, 'SuperMapJSONPCallbacks_' + uid, config && config.proxy);
  },
  getUid: function getUid() {
    var uid = new Date().getTime(),
      random = Math.floor(Math.random() * 1e17);
    return uid * 1000 + random;
  },
  send: function send(splitQuestUrl, callback, proxy) {
    var len = splitQuestUrl.length;
    if (len > 0) {
      return new Promise(function (resolve) {
        var jsonpUserID = new Date().getTime();
        for (var i = 0; i < len; i++) {
          var url = splitQuestUrl[i];
          if (url.indexOf('?') > -1) {
            url += '&';
          } else {
            url += '?';
          }
          url += 'sectionCount=' + len;
          url += '&sectionIndex=' + i;
          url += '&jsonpUserID=' + jsonpUserID;
          if (proxy) {
            url = decodeURIComponent(url);
            url = proxy + encodeURIComponent(url);
          }
          fetch_jsonp_default()(url, {
            jsonpCallbackFunction: callback,
            timeout: 30000
          }).then(function (result) {
            resolve(result.json());
          });
        }
      });
    }
  },
  GET: function GET(config) {
    var me = this;
    me.queryKeys.length = 0;
    me.queryValues.length = 0;
    me.addQueryStrings(config.params);
    return me.issue(config);
  },
  POST: function POST(config) {
    var me = this;
    me.queryKeys.length = 0;
    me.queryValues.length = 0;
    me.addQueryStrings({
      requestEntity: config.data
    });
    return me.issue(config);
  },
  PUT: function PUT(config) {
    var me = this;
    me.queryKeys.length = 0;
    me.queryValues.length = 0;
    me.addQueryStrings({
      requestEntity: config.data
    });
    return me.issue(config);
  },
  DELETE: function DELETE(config) {
    var me = this;
    me.queryKeys.length = 0;
    me.queryValues.length = 0;
    me.addQueryStrings({
      requestEntity: config.data
    });
    return me.issue(config);
  }
};
var CORS;
var RequestTimeout;
/**
 * @function setCORS
 * @description 设置是否允许跨域请求，全局配置，优先级低于 service 下的 crossOring 参数。
 * @category BaseTypes Util
 * @param {boolean} cors - 是否允许跨域请求。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   {namespace}.setCORS(cors);
 *
 *   // 弃用的写法
 *   SuperMap.setCORS(cors);
 *
 * </script>
 *
 * // ES6 Import
 * import { setCORS } from '{npm}';
 *
 * setCORS(cors);
 * ```
 */
var setCORS = function setCORS(cors) {
  CORS = cors;
};
/**
 * @function isCORS
 * @description 是是否允许跨域请求。
 * @category BaseTypes Util
 * @returns {boolean} 是否允许跨域请求。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.isCORS();
 *
 *   // 弃用的写法
 *   const result = SuperMap.isCORS();
 *
 * </script>
 *
 * // ES6 Import
 * import { isCORS } from '{npm}';
 *
 * const result = isCORS();
 * ```
 */
var isCORS = function isCORS() {
  if (CORS != undefined) {
    return CORS;
  }
  return window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest();
};
/**
 * @function setRequestTimeout
 * @category BaseTypes Util
 * @description 设置请求超时时间。
 * @param {number} [timeout=45] - 请求超时时间，单位为秒。
 * @usage
 * ```
 * // 浏览器
  <script type="text/javascript" src="{cdn}"></script>
  <script>
    {namespace}.setRequestTimeout(timeout);

    // 弃用的写法
    SuperMap.setRequestTimeout(timeout);

  </script>

  // ES6 Import
  import { setRequestTimeout } from '{npm}';

  setRequestTimeout(timeout);
 * ```
 */
var setRequestTimeout = function setRequestTimeout(timeout) {
  return RequestTimeout = timeout;
};
/**
 * @function getRequestTimeout
 * @category BaseTypes Util
 * @description 获取请求超时的时间。
 * @returns {number} 请求超时时间。
 * @usage
 * ```
 * // 浏览器
  <script type="text/javascript" src="{cdn}"></script>
  <script>
    {namespace}.getRequestTimeout();

    // 弃用的写法
    SuperMap.getRequestTimeout();

  </script>

  // ES6 Import
  import { getRequestTimeout } from '{npm}';

  getRequestTimeout();
 * ```
 */
var getRequestTimeout = function getRequestTimeout() {
  return RequestTimeout || 45000;
};

/**
 * @name FetchRequest
 * @namespace
 * @category BaseTypes Util
 * @description 获取请求。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.FetchRequest.commit(method, url, params, options);
 *
 * </script>
 *
 * // ES6 Import
 * import { FetchRequest } from '{npm}';
 *
 * const result = FetchRequest.commit(method, url, params, options);
 *
 * ```
 */
var FetchRequest = {
  /**
   * @function FetchRequest.commit
   * @description commit 请求。
   * @param {string} method - 请求方法。
   * @param {string} url - 请求地址。
   * @param {string} params - 请求参数。
   * @param {Object} options - 请求的配置属性。
   * @returns {Promise} Promise 对象。
   */
  commit: function commit(method, url, params, options) {
    method = method ? method.toUpperCase() : method;
    switch (method) {
      case 'GET':
        return this.get(url, params, options);
      case 'POST':
        return this.post(url, params, options);
      case 'PUT':
        return this.put(url, params, options);
      case 'DELETE':
        return this["delete"](url, params, options);
      default:
        return this.get(url, params, options);
    }
  },
  /**
   * @function FetchRequest.supportDirectRequest
   * @description supportDirectRequest 请求。
   * @param {string} url - 请求地址。
   * @param {Object} options - 请求的配置属性。
   * @returns {boolean} 是否允许跨域请求。
   */
  supportDirectRequest: function supportDirectRequest(url, options) {
    if (Util_Util.isInTheSameDomain(url)) {
      return true;
    }
    if (options.crossOrigin != undefined) {
      return options.crossOrigin;
    } else {
      return isCORS() || options.proxy;
    }
  },
  /**
   * @function FetchRequest.get
   * @description get 请求。
   * @param {string} url - 请求地址。
   * @param {string} params - 请求参数。
   * @param {Object} options - 请求的配置属性。
   * @returns {Promise} Promise 对象。
   */
  get: function get(url, params, options) {
    options = options || {};
    var type = 'GET';
    url = Util_Util.urlAppend(url, this._getParameterString(params || {}));
    url = this._processUrl(url, options);
    if (!this.supportDirectRequest(url, options)) {
      url = url.replace('.json', '.jsonp');
      var config = {
        url: url,
        data: params
      };
      return RequestJSONPPromise.GET(config);
    }
    if (!this.urlIsLong(url)) {
      return this._fetch(url, params, options, type);
    } else {
      return this._postSimulatie(type, url.substring(0, url.indexOf('?')), params, options);
    }
  },
  /**
   * @function FetchRequest.delete
   * @description delete 请求。
   * @param {string} url - 请求地址。
   * @param {string} params - 请求参数。
   * @param {Object} options -请求的配置属性。
   * @returns {Promise} Promise 对象。
   */
  "delete": function _delete(url, params, options) {
    options = options || {};
    var type = 'DELETE';
    url = Util_Util.urlAppend(url, this._getParameterString(params || {}));
    url = this._processUrl(url, options);
    if (!this.supportDirectRequest(url, options)) {
      url = url.replace('.json', '.jsonp');
      var config = {
        url: url += "&_method=DELETE",
        data: params
      };
      return RequestJSONPPromise.DELETE(config);
    }
    if (this.urlIsLong(url)) {
      return this._postSimulatie(type, url.substring(0, url.indexOf('?')), params, options);
    }
    return this._fetch(url, params, options, type);
  },
  /**
   * @function FetchRequest.post
   * @description post 请求。
   * @param {string} url - 请求地址。
   * @param {string} params - 请求参数。
   * @param {Object} options - 请求的配置属性。
   * @returns {Promise} Promise 对象。
   */
  post: function post(url, params, options) {
    options = options || {};
    url = this._processUrl(url, options);
    if (!this.supportDirectRequest(url, options)) {
      url = url.replace('.json', '.jsonp');
      var config = {
        url: Util_Util.urlAppend(url, "_method=POST"),
        data: params
      };
      return RequestJSONPPromise.POST(config);
    }
    return this._fetch(url, params, options, 'POST');
  },
  /**
   * @function FetchRequest.put
   * @description put 请求。
   * @param {string} url - 请求地址。
   * @param {string} params - 请求参数。
   * @param {Object} options - 请求的配置属性。
   * @returns {Promise} Promise 对象。
   */
  put: function put(url, params, options) {
    options = options || {};
    url = this._processUrl(url, options);
    if (!this.supportDirectRequest(url, options)) {
      url = url.replace('.json', '.jsonp');
      var config = {
        url: url += "&_method=PUT",
        data: params
      };
      return RequestJSONPPromise.PUT(config);
    }
    return this._fetch(url, params, options, 'PUT');
  },
  /**
   * @function FetchRequest.urlIsLong
   * @description URL 的字节长度是否太长。
   * @param {string} url - 请求地址。
   * @returns {boolean} URL 的字节长度是否太长。
   */
  urlIsLong: function urlIsLong(url) {
    //当前url的字节长度。
    var totalLength = 0,
      charCode = null;
    for (var i = 0, len = url.length; i < len; i++) {
      //转化为Unicode编码
      charCode = url.charCodeAt(i);
      if (charCode < 0x007f) {
        totalLength++;
      } else if (0x0080 <= charCode && charCode <= 0x07ff) {
        totalLength += 2;
      } else if (0x0800 <= charCode && charCode <= 0xffff) {
        totalLength += 3;
      }
    }
    return totalLength < 2000 ? false : true;
  },
  _postSimulatie: function _postSimulatie(type, url, params, options) {
    var separator = url.indexOf('?') > -1 ? '&' : '?';
    url += separator + '_method=' + type;
    if (typeof params !== 'string') {
      params = JSON.stringify(params);
    }
    return this.post(url, params, options);
  },
  _processUrl: function _processUrl(url, options) {
    if (this._isMVTRequest(url)) {
      return url;
    }
    if (url.indexOf('.json') === -1 && !options.withoutFormatSuffix) {
      if (url.indexOf('?') < 0) {
        url += '.json';
      } else {
        var urlArrays = url.split('?');
        if (urlArrays.length === 2) {
          url = urlArrays[0] + '.json?' + urlArrays[1];
        }
      }
    }
    if (options && options.proxy) {
      if (typeof options.proxy === 'function') {
        url = options.proxy(url);
      } else {
        url = decodeURIComponent(url);
        url = options.proxy + encodeURIComponent(url);
      }
    }
    return url;
  },
  _fetch: function _fetch(url, params, options, type) {
    options = options || {};
    options.headers = options.headers || {};
    if (!options.headers['Content-Type'] && !FormData.prototype.isPrototypeOf(params)) {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    if (options.timeout) {
      return this._timeout(options.timeout, FetchRequest_fetch(url, {
        method: type,
        headers: options.headers,
        body: type === 'PUT' || type === 'POST' ? params : undefined,
        credentials: this._getWithCredentials(options),
        mode: 'cors',
        timeout: getRequestTimeout()
      }).then(function (response) {
        return response;
      }));
    }
    return FetchRequest_fetch(url, {
      method: type,
      body: type === 'PUT' || type === 'POST' ? params : undefined,
      headers: options.headers,
      credentials: this._getWithCredentials(options),
      mode: 'cors',
      timeout: getRequestTimeout()
    }).then(function (response) {
      return response;
    });
  },
  _getWithCredentials: function _getWithCredentials(options) {
    if (options.withCredentials === true) {
      return 'include';
    }
    if (options.withCredentials === false) {
      return 'omit';
    }
    return 'same-origin';
  },
  _fetchJsonp: function _fetchJsonp(url, options) {
    options = options || {};
    return fetch_jsonp_default()(url, {
      method: 'GET',
      timeout: options.timeout
    }).then(function (response) {
      return response;
    });
  },
  _timeout: function _timeout(seconds, promise) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('timeout'));
      }, seconds);
      promise.then(resolve, reject);
    });
  },
  _getParameterString: function _getParameterString(params) {
    var paramsArray = [];
    for (var key in params) {
      var value = params[key];
      if (value != null && typeof value !== 'function') {
        var encodedValue;
        if (Array.isArray(value) || value.toString() === '[object Object]') {
          encodedValue = encodeURIComponent(JSON.stringify(value));
        } else {
          encodedValue = encodeURIComponent(value);
        }
        paramsArray.push(encodeURIComponent(key) + '=' + encodedValue);
      }
    }
    return paramsArray.join('&');
  },
  _isMVTRequest: function _isMVTRequest(url) {
    return url.indexOf('.mvt') > -1 || url.indexOf('.pbf') > -1;
  }
};
;// CONCATENATED MODULE: ./src/common/commontypes/Credential.js
function Credential_typeof(o) { "@babel/helpers - typeof"; return Credential_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Credential_typeof(o); }
function Credential_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Credential_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Credential_toPropertyKey(descriptor.key), descriptor); } }
function Credential_createClass(Constructor, protoProps, staticProps) { if (protoProps) Credential_defineProperties(Constructor.prototype, protoProps); if (staticProps) Credential_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Credential_toPropertyKey(t) { var i = Credential_toPrimitive(t, "string"); return "symbol" == Credential_typeof(i) ? i : String(i); }
function Credential_toPrimitive(t, r) { if ("object" != Credential_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Credential_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class Credential
 * @deprecatedclass SuperMap.Credential
 * @category Security
 * @classdesc SuperMap 的安全证书类，其中包括 token 等安全验证信息。</br>
 * 需要使用用户名和密码在："http://localhost:8090/iserver/services/security/tokens" 下申请 value。</br>
 * 获得形如："2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ.." 的 value。</br>
 * 目前支持的功能包括：地图服务、专题图、量算、查询、公交换乘、空间分析、网络分析，不支持轮询功能。</br>
 * @param {string} value - 访问受安全限制的服务时用于通过安全认证的验证信息。
 * @param {string} [name='token'] - 验证信息前缀，name=value 部分的 name 部分。
 * @example
 * var pixcel = new Credential("valueString","token");
 * pixcel.destroy();
 * @usage
 */
var Credential = /*#__PURE__*/function () {
  function Credential(value, name) {
    Credential_classCallCheck(this, Credential);
    /**
     * @member {string} Credential.prototype.value
     * @description 访问受安全限制的服务时用于通过安全认证的验证信息。
     */
    this.value = value ? value : "";

    /**
     * @member {string} [Credential.prototype.name='token']
     * @description 验证信息前缀，name=value 部分的 name 部分。
     */
    this.name = name ? name : "token";
    this.CLASS_NAME = "SuperMap.Credential";
  }

  /**
   * @function Credential.prototype.getUrlParameters
   * @description 获取 name=value 的表达式。
   * @example
   * var credential = new Credential("valueString","token");
   * //这里 str = "token=valueString";
   * var str = credential.getUrlParameters();
   * @returns {string} 安全信息组成的 url 片段。
   */
  Credential_createClass(Credential, [{
    key: "getUrlParameters",
    value: function getUrlParameters() {
      //当需要其他安全信息的时候，则需要return this.name + "=" + this.value + "&" + "...";的形式添加。
      return this.name + "=" + this.value;
    }

    /**
     * @function Credential.prototype.getValue
     * @description 获取 value。
     * @example
     * var credential = new Credential("2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..","token");
     * //这里 str = "2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..";
     * var str = credential.getValue();
     * @returns {string} value 字符串，在 SuperMap iServer 服务下该 value 值即为 token 值。
     */
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }

    /**
     *
     * @function Credential.prototype.destroy
     * @description 销毁此对象。销毁后此对象的所有属性为 null，而不是初始值。
     * @example
     * var credential = new Credential("valueString","token");
     * credential.destroy();
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.value = null;
      this.name = null;
    }
  }]);
  return Credential;
}();

/**
 * @member {Credential} Credential.CREDENTIAL
 * @description 这个对象保存一个安全类的实例，在服务端需要安全验证的时候必须进行设置。
 * @example
 * 代码实例:
 *  // 当iServer启用服务安全的时候，下边的代码是必须的。安全证书类能够接收一个value和一个name参数。
 *  var value = "(以iServer为例，这里是申请的token值)";
 *  var name = "token";
 *  // 默认name参数为token，所以当使用iServer服务的时候可以不进行设置。
 *  Credential.CREDENTIAL = new Credential(value, name);
 *
 */

Credential.CREDENTIAL = null;
;// CONCATENATED MODULE: ./src/common/security/SecurityManager.js
function SecurityManager_typeof(o) { "@babel/helpers - typeof"; return SecurityManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SecurityManager_typeof(o); }
function SecurityManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SecurityManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SecurityManager_toPropertyKey(descriptor.key), descriptor); } }
function SecurityManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) SecurityManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) SecurityManager_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SecurityManager_toPropertyKey(t) { var i = SecurityManager_toPrimitive(t, "string"); return "symbol" == SecurityManager_typeof(i) ? i : String(i); }
function SecurityManager_toPrimitive(t, r) { if ("object" != SecurityManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SecurityManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SecurityManager
 * @deprecatedclass SuperMap.SecurityManager
 * @category Security
 * @classdesc 安全管理中心，提供 iServer,iPortal,Online 统一权限认证管理。
 *  > 使用说明：
 *  > 创建任何一个服务之前调用 {@link SecurityManager.registerToken}或
 *  > {@link SecurityManager.registerKey}注册凭据。
 *  > 发送请求时根据 URL 或者服务 ID 获取相应的 key 或者 token 并自动添加到服务地址中。
 * @usage
 */
var SecurityManager = /*#__PURE__*/function () {
  function SecurityManager() {
    SecurityManager_classCallCheck(this, SecurityManager);
  }
  SecurityManager_createClass(SecurityManager, null, [{
    key: "generateToken",
    value:
    /**
     * @description 从服务器获取一个token,在此之前要注册服务器信息。
     * @function SecurityManager.generateToken
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @param {TokenServiceParameter} tokenParam - token 申请参数。
     * @returns {Promise} 包含 token 信息的 Promise 对象。
     */

    function generateToken(url, tokenParam) {
      var serverInfo = this.servers[url];
      if (!serverInfo) {
        return;
      }
      return FetchRequest.post(serverInfo.tokenServiceUrl, JSON.stringify(tokenParam.toJSON())).then(function (response) {
        return response.text();
      });
    }

    /**
     * @description 注册安全服务器相关信息。
     * @function SecurityManager.registerServers
     * @param {ServerInfo} serverInfos - 服务器信息。
     */
  }, {
    key: "registerServers",
    value: function registerServers(serverInfos) {
      this.servers = this.servers || {};
      if (!Util_Util.isArray(serverInfos)) {
        serverInfos = [serverInfos];
      }
      for (var i = 0; i < serverInfos.length; i++) {
        var serverInfo = serverInfos[i];
        this.servers[serverInfo.server] = serverInfo;
      }
    }

    /**
     * @description 服务请求都会自动带上这个 token。
     * @function SecurityManager.registerToken
     * @param {string} url -服务器域名+端口：如http://localhost:8090。
     * @param {string} token - token。
     */
  }, {
    key: "registerToken",
    value: function registerToken(url, token) {
      this.tokens = this.tokens || {};
      if (!url || !token) {
        return;
      }
      var domain = this._getTokenStorageKey(url);
      this.tokens[domain] = token;
    }

    /**
     * @description 注册 key,ids 为数组(存在一个 key 对应多个服务)。
     * @function SecurityManager.registerKey
     * @param {Array} ids - 可以是服务 ID 数组或者 URL 地址数组或者 webAPI 类型数组。
     * @param {string} key - key。
     */
  }, {
    key: "registerKey",
    value: function registerKey(ids, key) {
      this.keys = this.keys || {};
      if (!ids || ids.length < 1 || !key) {
        return;
      }
      ids = Util_Util.isArray(ids) ? ids : [ids];
      for (var i = 0; i < ids.length; i++) {
        var id = this._getUrlRestString(ids[0]) || ids[0];
        this.keys[id] = key;
      }
    }

    /**
     * @description 获取服务器信息。
     * @function SecurityManager.getServerInfo
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @returns {ServerInfo} 服务器信息。
     */
  }, {
    key: "getServerInfo",
    value: function getServerInfo(url) {
      this.servers = this.servers || {};
      return this.servers[url];
    }

    /**
     * @description 根据 URL 获取token。
     * @function SecurityManager.getToken
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @returns {string} token。
     */
  }, {
    key: "getToken",
    value: function getToken(url) {
      if (!url) {
        return;
      }
      this.tokens = this.tokens || {};
      var domain = this._getTokenStorageKey(url);
      return this.tokens[domain];
    }

    /**
     * @description 根据 URL 获取 key。
     * @function SecurityManager.getKey
     * @param {string} id - ID。
     * @returns {string} key。
     */
  }, {
    key: "getKey",
    value: function getKey(id) {
      this.keys = this.keys || {};
      var key = this._getUrlRestString(id) || id;
      return this.keys[key];
    }

    /**
     * @description SuperMap iServer 登录验证。
     * @function SecurityManager.loginiServer
     * @param {string} url - SuperMap iServer 首页地址，如：http://localhost:8090/iserver。
     * @param {string} username - 用户名。
     * @param {string} password - 密码。
     * @param {boolean} [rememberme=false] - 是否记住。
     * @returns {Promise} 包含 SuperMap iServer 登录请求结果的 Promise 对象。
     */
  }, {
    key: "loginiServer",
    value: function loginiServer(url, username, password, rememberme) {
      url = Util_Util.urlPathAppend(url, 'services/security/login');
      var loginInfo = {
        username: username && username.toString(),
        password: password && password.toString(),
        rememberme: rememberme
      };
      loginInfo = JSON.stringify(loginInfo);
      var requestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };
      return FetchRequest.post(url, loginInfo, requestOptions).then(function (response) {
        return response.json();
      });
    }

    /**
     * @description SuperMap iServer 登出。
     * @function SecurityManager.logoutiServer
     * @param {string} url - SuperMap iServer 首页地址，如：http://localhost:8090/iserver。
     * @returns {Promise} 是否登出成功。
     */
  }, {
    key: "logoutiServer",
    value: function logoutiServer(url) {
      url = Util_Util.urlPathAppend(url, 'services/security/logout');
      var requestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        withoutFormatSuffix: true
      };
      return FetchRequest.get(url, '', requestOptions).then(function () {
        return true;
      })["catch"](function () {
        return false;
      });
    }

    /**
     * @description Online 登录验证。
     * @function SecurityManager.loginOnline
     * @param {string} callbackLocation - 跳转位置。
     * @param {boolean} [newTab=true] - 是否新窗口打开。
     */
  }, {
    key: "loginOnline",
    value: function loginOnline(callbackLocation, newTab) {
      var loginUrl = SecurityManager.SSO + '/login?service=' + callbackLocation;
      this._open(loginUrl, newTab);
    }

    /**
     * @description SuperMap iPortal 登录验证。
     * @function SecurityManager.loginiPortal
     * @param {string} url - SuperMap iPortal 首页地址，如：http://localhost:8092/iportal。
     * @param {string} username - 用户名。
     * @param {string} password - 密码。
     * @returns {Promise} 包含 SuperMap iPortal 登录请求结果的 Promise 对象。
     */
  }, {
    key: "loginiPortal",
    value: function loginiPortal(url, username, password) {
      url = Util_Util.urlPathAppend(url, 'web/login');
      var loginInfo = {
        username: username && username.toString(),
        password: password && password.toString()
      };
      loginInfo = JSON.stringify(loginInfo);
      var requestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        withCredentials: false
      };
      return FetchRequest.post(url, loginInfo, requestOptions).then(function (response) {
        return response.json();
      });
    }

    /**
     * @description SuperMap iPortal 登出。
     * @function SecurityManager.logoutiPortal
     * @param {string} url - SuperMap iPortal 首页地址，如：http://localhost:8092/iportal。
     * @returns {Promise} 如果登出成功，返回 true;否则返回 false。
     */
  }, {
    key: "logoutiPortal",
    value: function logoutiPortal(url) {
      url = Util_Util.urlPathAppend(url, 'services/security/logout');
      var requestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        withCredentials: true,
        withoutFormatSuffix: true
      };
      return FetchRequest.get(url, '', requestOptions).then(function () {
        return true;
      })["catch"](function () {
        return false;
      });
    }

    /**
     * @description iManager 登录验证。
     * @function SecurityManager.loginManager
     * @param {string} url - iManager 地址。地址参数为 iManager 首页地址，如： http://localhost:8390/imanager。
     * @param {Object} [loginInfoParams] - iManager 登录参数。
     * @param {string} loginInfoParams.userName - 用户名。
     * @param {string} loginInfoParams.password - 密码。
     * @param {Object} options
     * @param {boolean} [options.isNewTab=true] - 不同域时是否在新窗口打开登录页面。
     * @returns {Promise} 包含 iManager 登录请求结果的 Promise 对象。
     */
  }, {
    key: "loginManager",
    value: function loginManager(url, loginInfoParams) {
      var requestUrl = Util_Util.urlPathAppend(url, '/security/tokens');
      var params = loginInfoParams || {};
      var loginInfo = {
        username: params.userName && params.userName.toString(),
        password: params.password && params.password.toString()
      };
      loginInfo = JSON.stringify(loginInfo);
      var requestOptions = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=UTF-8'
        }
      };
      var me = this;
      return FetchRequest.post(requestUrl, loginInfo, requestOptions).then(function (response) {
        return response.text();
      }).then(function (result) {
        me.imanagerToken = result;
        return result;
      });
    }

    /**
     * @description 清空全部验证信息。
     * @function SecurityManager.destroyAllCredentials
     */
  }, {
    key: "destroyAllCredentials",
    value: function destroyAllCredentials() {
      this.keys = null;
      this.tokens = null;
      this.servers = null;
    }

    /**
     * @description 清空令牌信息。
     * @function SecurityManager.destroyToken
     * @param {string} url - SuperMap iPortal 首页地址，如：http://localhost:8092/iportal。
     */
  }, {
    key: "destroyToken",
    value: function destroyToken(url) {
      if (!url) {
        return;
      }
      var domain = this._getTokenStorageKey(url);
      this.tokens = this.tokens || {};
      if (this.tokens[domain]) {
        delete this.tokens[domain];
      }
    }

    /**
     * @description 清空服务授权码。
     * @function SecurityManager.destroyKey
     * @param {string} url - SuperMap iServer 首页地址，如：http://localhost:8090/iserver。
     */
  }, {
    key: "destroyKey",
    value: function destroyKey(url) {
      if (!url) {
        return;
      }
      this.keys = this.keys || {};
      var key = this._getUrlRestString(url) || url;
      if (this.keys[key]) {
        delete this.keys[key];
      }
    }

    /**
     * @description 服务URL追加授权信息，授权信息需先通过SecurityManager.registerKey或SecurityManager.registerToken注册。
     * @version 10.1.2
     * @function SecurityManager.appendCredential
     * @param {string} url - 服务URL。
     * @returns {string} 绑定了token或者key的服务URL。
     */
  }, {
    key: "appendCredential",
    value: function appendCredential(url) {
      var newUrl = url;
      var value = this.getToken(url);
      var credential = value ? new Credential(value, 'token') : null;
      if (!credential) {
        value = this.getKey(url);
        credential = value ? new Credential(value, 'key') : null;
      }
      if (credential) {
        newUrl = Util_Util.urlAppend(newUrl, credential.getUrlParameters());
      }
      return newUrl;
    }
  }, {
    key: "_open",
    value: function _open(url, newTab) {
      newTab = newTab != null ? newTab : true;
      var offsetX = window.screen.availWidth / 2 - this.INNER_WINDOW_WIDTH / 2;
      var offsetY = window.screen.availHeight / 2 - this.INNER_WINDOW_HEIGHT / 2;
      var options = 'height=' + this.INNER_WINDOW_HEIGHT + ', width=' + this.INNER_WINDOW_WIDTH + ',top=' + offsetY + ', left=' + offsetX + ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
      if (newTab) {
        window.open(url, 'login');
      } else {
        window.open(url, 'login', options);
      }
    }
  }, {
    key: "_getTokenStorageKey",
    value: function _getTokenStorageKey(url) {
      var patten = /(.*?):\/\/([^\/]+)/i;
      var result = url.match(patten);
      if (!result) {
        return url;
      }
      return result[0];
    }
  }, {
    key: "_getUrlRestString",
    value: function _getUrlRestString(url) {
      if (!url) {
        return url;
      }
      // var patten = /http:\/\/(.*\/rest)/i;
      var patten = /(http|https):\/\/(.*\/rest)/i;
      var result = url.match(patten);
      if (!result) {
        return url;
      }
      return result[0];
    }
  }]);
  return SecurityManager;
}();
SecurityManager.INNER_WINDOW_WIDTH = 600;
SecurityManager.INNER_WINDOW_HEIGHT = 600;
SecurityManager.SSO = 'https://sso.supermap.com';
SecurityManager.ONLINE = 'https://www.supermapol.com';
;// CONCATENATED MODULE: ./src/common/REST.js
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
* @enum DataFormat
* @description 服务请求返回结果数据类型。
* @category BaseTypes Constant
* @type {string}
* @usage
* ```
* // 浏览器
* <script type="text/javascript" src="{cdn}"></script>
* <script>
*   const result = {namespace}.DataFormat.GEOJSON;
*
* </script>
* // ES6 Import
* import { DataFormat } from '{npm}';
*
* const result = DataFormat.GEOJSON;
* ```
*/
var DataFormat = {
  /** GeoJSON */
  GEOJSON: "GEOJSON",
  /** ISERVER */
  ISERVER: "ISERVER",
  /** FGB */
  FGB: "FGB"
};

/**
 * @enum ServerType
 * @description 服务器类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ServerType.ISERVER;
 *
 * </script>
 * // ES6 Import
 * import { ServerType } from '{npm}';
 *
 * const result = ServerType.ISERVER;
 * ```
 */
var ServerType = {
  /** ISERVER */
  ISERVER: "ISERVER",
  /** IPORTAL */
  IPORTAL: "IPORTAL",
  /** ONLINE */
  ONLINE: "ONLINE"
};

/**
 * @enum GeometryType
 * @description 几何对象枚举，定义了一系列几何对象类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GeometryType.LINE;
 *
 * </script>
 * // ES6 Import
 * import { GeometryType } from '{npm}';
 *
 * const result = GeometryType.LINE;
 * ```
 */
var GeometryType = {
  /** 线几何对象。 */
  LINE: "LINE",
  /** 路由对象。 */
  LINEM: "LINEM",
  /** 点几何对象。 */
  POINT: "POINT",
  /** 面几何对象。 */
  REGION: "REGION",
  /** EPS 点几何对象。 */
  POINTEPS: "POINTEPS",
  /** EPS 线几何对象。 */
  LINEEPS: "LINEEPS",
  /** EPS 面几何对象。 */
  REGIONEPS: "REGIONEPS",
  /** 椭圆几何对象。 */
  ELLIPSE: "ELLIPSE",
  /** 圆形几何对象。 */
  CIRCLE: "CIRCLE",
  /** 文本几何对象。 */
  TEXT: "TEXT",
  /** 矩形几何对象。 */
  RECTANGLE: "RECTANGLE",
  /** 未定义。 */
  UNKNOWN: "UNKNOWN",
  /** 复合几何对象。 */
  GEOCOMPOUND: "GEOCOMPOUND"
};

/**
 * @enum QueryOption
 * @description 查询结果类型，描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.QueryOption.ATTRIBUTE;
 *
 * </script>
 * // ES6 Import
 * import { QueryOption } from '{npm}';
 *
 * const result = QueryOption.ATTRIBUTE;
 * ```
 */
var QueryOption = {
  /** 属性。 */
  ATTRIBUTE: "ATTRIBUTE",
  /** 属性和几何对象。 */
  ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
  /** 几何对象。 */
  GEOMETRY: "GEOMETRY"
};

/**
 * @enum JoinType
 * @description 关联查询时的关联类型常量。
 * 该类定义了两个表之间的连接类型常量，决定了对两个表之间进行连接查询时，查询结果中得到的记录的情况。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.JoinType.INNERJOIN;
 *
 * </script>
 * // ES6 Import
 * import { JoinType } from '{npm}';
 *
 * const result = JoinType.INNERJOIN;
 * ```
 */
var JoinType = {
  /** 内连接。 */
  INNERJOIN: "INNERJOIN",
  /** 左连接。 */
  LEFTJOIN: "LEFTJOIN"
};

/**
 * @enum SpatialQueryMode
 * @description  空间查询模式枚举。该类定义了空间查询操作模式常量。空间查询是通过几何对象之间的空间位置关系来构建过滤条件的一种查询方式。
 * 例如：通过空间查询可以找到被包含在面中的空间对象，相离或者相邻的空间对象等。<br>
 * 注意：当前版本提供对点、线、面、网络和文本类型数据的空间查询，其中文本类型仅支持 Intersect 和 Contain 两种空间查询模式，
 * 而且只能作为被搜索对象不能作为搜索对象。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SpatialQueryMode.CONTAIN;
 *
 * </script>
 * // ES6 Import
 * import { SpatialQueryMode } from '{npm}';
 *
 * const result = SpatialQueryMode.CONTAIN;
 * ```
 */
var SpatialQueryMode = {
  /** 包含空间查询模式。 */
  CONTAIN: "CONTAIN",
  /** 交叉空间查询模式。 */
  CROSS: "CROSS",
  /** 分离空间查询模式。 */
  DISJOINT: "DISJOINT",
  /** 重合空间查询模式。 */
  IDENTITY: "IDENTITY",
  /** 相交空间查询模式。 */
  INTERSECT: "INTERSECT",
  /** 无空间查询。 */
  NONE: "NONE",
  /** 叠加空间查询模式。 */
  OVERLAP: "OVERLAP",
  /** 邻接空间查询模式。 */
  TOUCH: "TOUCH",
  /** 被包含空间查询模式。 */
  WITHIN: "WITHIN"
};

/**
 * @enum SpatialRelationType
 * @description  数据集对象间的空间关系枚举。
 * 该类定义了数据集对象间的空间关系类型常量。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SpatialRelationType.CONTAIN;
 *
 * </script>
 * // ES6 Import
 * import { SpatialRelationType } from '{npm}';
 *
 * const result = {namespace}.SpatialRelationType.CONTAIN;
 * ```
 */
var SpatialRelationType = {
  /** 包含关系。 */
  CONTAIN: "CONTAIN",
  /** 相交关系。 */
  INTERSECT: "INTERSECT",
  /** 被包含关系。 */
  WITHIN: "WITHIN"
};

/**
 * @enum MeasureMode
 * @type {string}
 * @description  量算模式枚举。
 * @category BaseTypes Constant
 * 该类定义了两种测量模式：距离测量和面积测量。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.MeasureMode.DISTANCE;
 *
 * </script>
 * // ES6 Import
 * import { MeasureMode } from '{npm}';
 *
 * const result = MeasureMode.DISTANCE;
 * ```
 */
var MeasureMode = {
  /** 距离测量。 */
  DISTANCE: "DISTANCE",
  /** 面积测量。 */
  AREA: "AREA"
};

/**
 * @enum Unit
 * @description  距离单位枚举。
 * 该类定义了一系列距离单位类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Unit.METER;
 *
 * </script>
 * // ES6 Import
 * import { Unit } from '{npm}';
 *
 * const result = Unit.METER;
 * ```
 */
var Unit = {
  /**  米。 */
  METER: "METER",
  /**  千米。 */
  KILOMETER: "KILOMETER",
  /**  英里。 */
  MILE: "MILE",
  /**  码。 */
  YARD: "YARD",
  /**  度。 */
  DEGREE: "DEGREE",
  /**  毫米。 */
  MILLIMETER: "MILLIMETER",
  /**  厘米。 */
  CENTIMETER: "CENTIMETER",
  /**  英寸。 */
  INCH: "INCH",
  /**  分米。 */
  DECIMETER: "DECIMETER",
  /**  英尺。 */
  FOOT: "FOOT",
  /**  秒。 */
  SECOND: "SECOND",
  /**  分。 */
  MINUTE: "MINUTE",
  /**  弧度。 */
  RADIAN: "RADIAN"
};

/**
 * @enum BufferRadiusUnit
 * @description  缓冲区距离单位枚举。该类定义了一系列缓冲距离单位类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.BufferRadiusUnit.CENTIMETER;
 *
 * </script>
 * // ES6 Import
 * import { BufferRadiusUnit } from '{npm}';
 *
 * const result = BufferRadiusUnit.CENTIMETER;
 * ```
 */
var BufferRadiusUnit = {
  /**  厘米。 */
  CENTIMETER: "CENTIMETER",
  /**  分米。 */
  DECIMETER: "DECIMETER",
  /**  英尺。 */
  FOOT: "FOOT",
  /**  英寸。 */
  INCH: "INCH",
  /**  千米。 */
  KILOMETER: "KILOMETER",
  /**  米。 */
  METER: "METER",
  /**  英里。 */
  MILE: "MILE",
  /**  毫米。 */
  MILLIMETER: "MILLIMETER",
  /**  码。 */
  YARD: "YARD"
};

/**
 * @enum EngineType
 * @description  数据源引擎类型枚举。SuperMap SDX+ 是 SuperMap 的空间引擎技术，
 * 它提供了一种通用的访问机制（或模式）来访问存储在不同引擎里的数据。引擎类型包括数据库引擎、文件引擎和 Web 引擎。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.EngineType.IMAGEPLUGINS;
 *
 * </script>
 * // ES6 Import
 * import { EngineType } from '{npm}';
 *
 * const result = EngineType.IMAGEPLUGINS;
 * ```
 */
var EngineType = {
  /** 影像只读引擎类型，文件引擎，针对通用影像格式如 BMP，JPG，TIFF 以及超图自定义影像格式 SIT 等。 */
  IMAGEPLUGINS: "IMAGEPLUGINS",
  /**  OGC 引擎类型，针对于 Web 数据源，Web 引擎，目前支持的类型有 WMS，WFS，WCS。 */
  OGC: "OGC",
  /**  Oracle 引擎类型，针对 Oracle 数据源，数据库引擎。 */
  ORACLEPLUS: "ORACLEPLUS",
  /**  SDB 引擎类型，文件引擎，即 SDB 数据源。 */
  SDBPLUS: "SDBPLUS",
  /**  SQL Server 引擎类型，针对 SQL Server 数据源，数据库引擎。 */
  SQLPLUS: "SQLPLUS",
  /**  UDB 引擎类型，文件引擎。 */
  UDB: "UDB"
};

/**
 * @enum ThemeGraphTextFormat
 * @description  统计专题图文本显示格式枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ThemeGraphTextFormat.CAPTION;
 *
 * </script>
 * // ES6 Import
 * import { ThemeGraphTextFormat } from '{npm}';
 *
 * const result = ThemeGraphTextFormat.CAPTION;
 * ```
 */
var ThemeGraphTextFormat = {
  /**  标题。以各子项的标题来进行标注。 */
  CAPTION: "CAPTION",
  /**  标题 + 百分数。以各子项的标题和所占的百分比来进行标注。 */
  CAPTION_PERCENT: "CAPTION_PERCENT",
  /**  标题 + 实际数值。以各子项的标题和真实数值来进行标注。 */
  CAPTION_VALUE: "CAPTION_VALUE",
  /**  百分数。以各子项所占的百分比来进行标注。 */
  PERCENT: "PERCENT",
  /**  实际数值。以各子项的真实数值来进行标注。 */
  VALUE: "VALUE"
};

/**
 * @enum ThemeGraphType
 * @description  统计专题图类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ThemeGraphType.AREA;
 *
 * </script>
 * // ES6 Import
 * import { ThemeGraphType } from '{npm}';
 *
 * const result = ThemeGraphType.AREA;
 * ```
 */
var ThemeGraphType = {
  /**  面积图。 */
  AREA: "AREA",
  /**  柱状图。 */
  BAR: "BAR",
  /**  三维柱状图。 */
  BAR3D: "BAR3D",
  /**  折线图。 */
  LINE: "LINE",
  /**  饼图。 */
  PIE: "PIE",
  /**  三维饼图。 */
  PIE3D: "PIE3D",
  /**  点状图。 */
  POINT: "POINT",
  /**  环状图。 */
  RING: "RING",
  /**  玫瑰图。 */
  ROSE: "ROSE",
  /**  三维玫瑰图。 */
  ROSE3D: "ROSE3D",
  /**  堆叠柱状图。 */
  STACK_BAR: "STACK_BAR",
  /**  三维堆叠柱状图。 */
  STACK_BAR3D: "STACK_BAR3D",
  /**  阶梯图。 */
  STEP: "STEP"
};

/**
 * @enum GraphAxesTextDisplayMode
 * @description  统计专题图坐标轴文本显示模式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GraphAxesTextDisplayMode.ALL;
 *
 * </script>
 * // ES6 Import
 * import { GraphAxesTextDisplayMode } from '{npm}';
 *
 * const result = GraphAxesTextDisplayMode.ALL;
 * ```
 */
var GraphAxesTextDisplayMode = {
  /**  显示全部文本。 */
  ALL: "ALL",
  /**  不显示文本。 */
  NONE: "NONE",
  /**  显示 Y 轴的文本。 */
  YAXES: "YAXES"
};

/**
 * @enum GraduatedMode
 * @description  主要用在统计专题图和等级符号专题图中。<br>
 * 分级主要是为了减少制作专题图时数据大小之间的差异。如果数据之间差距较大，则可以采用对数或者平方根的分级方式来进行，
 * 减少数据之间绝对大小的差异，使得专题图的视觉效果比较好，同时不同类别之间的比较也还是有意义的。
 * 有三种分级模式：常数、对数和平方根，对于有值为负数的字段，不可以采用对数和平方根的分级方式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GraduatedMode.CONSTANT;
 *
 * </script>
 * // ES6 Import
 * import { GraduatedMode } from '{npm}';
 *
 * const result = GraduatedMode.CONSTANT;
 * ```
 */
var GraduatedMode = {
  /**  常量分级模式。 */
  CONSTANT: "CONSTANT",
  /** 对数分级模式。 */
  LOGARITHM: "LOGARITHM",
  /**  平方根分级模式。 */
  SQUAREROOT: "SQUAREROOT"
};

/**
 * @enum RangeMode
 * @description  范围分段专题图分段方式枚举。在分段专题图中，作为专题变量的字段或表达式的值按照某种分段方式被分成多个范围段，
 * 要素或记录根据其所对应的字段值或表达式值被分配到其中一个分段中，在同一个范围段中要素或记录使用相同的风格进行显示。
 * 分段专题图一般用来表现连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等，
 * 从而反映现象在各区域的集中程度或发展水平的分布差异。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.RangeMode.CUSTOMINTERVAL;
 *
 * </script>
 * // ES6 Import
 * import { RangeMode } from '{npm}';
 *
 * const result = RangeMode.CUSTOMINTERVAL;
 * ```
 */
var RangeMode = {
  /**  自定义分段法。 */
  CUSTOMINTERVAL: "CUSTOMINTERVAL",
  /**  等距离分段法。 */
  EQUALINTERVAL: "EQUALINTERVAL",
  /**  对数分段法。 */
  LOGARITHM: "LOGARITHM",
  /**  等计数分段法。 */
  QUANTILE: "QUANTILE",
  /**  平方根分段法。 */
  SQUAREROOT: "SQUAREROOT",
  /**  标准差分段法。 */
  STDDEVIATION: "STDDEVIATION"
};

/**
 * @enum ThemeType
 * @description  专题图类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ThemeType.DOTDENSITY;
 *
 * </script>
 * // ES6 Import
 * import { ThemeType } from '{npm}';
 *
 * const result = ThemeType.DOTDENSITY;
 * ```
 */
var ThemeType = {
  /** 点密度专题图。 */
  DOTDENSITY: "DOTDENSITY",
  /** 等级符号专题图。 */
  GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
  /** 统计专题图。 */
  GRAPH: "GRAPH",
  /** 标签专题图。 */
  LABEL: "LABEL",
  /** 分段专题图。 */
  RANGE: "RANGE",
  /** 単值专题图。 */
  UNIQUE: "UNIQUE"
};

/**
 * @enum ColorGradientType
 * @description  渐变颜色枚举。颜色渐变是多种颜色间的逐渐混合，可以是从起始色到终止色两种颜色的渐变，
 * 或者在起始色到终止色之间具有多种中间颜色进行渐变。该颜色渐变类型可应用于专题图对象的颜色方案设置中如：
 * 单值专题图、 分段专题图、栅格分段专题图。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ColorGradientType.BLACK_WHITE;
 *
 * </script>
 * // ES6 Import
 * import { ColorGradientType } from '{npm}';
 *
 * const result = ColorGradientType.BLACK_WHITE;
 * ```
 */
var ColorGradientType = {
  /** 黑白渐变色。 */
  BLACK_WHITE: "BLACKWHITE",
  /** 蓝黑渐变色。 */
  BLUE_BLACK: "BLUEBLACK",
  /** 蓝红渐变色。 */
  BLUE_RED: "BLUERED",
  /** 蓝白渐变色。 */
  BLUE_WHITE: "BLUEWHITE",
  /** 青黑渐变色。 */
  CYAN_BLACK: "CYANBLACK",
  /** 青蓝渐变色。 */
  CYAN_BLUE: "CYANBLUE",
  /** 青绿渐变色。 */
  CYAN_GREEN: "CYANGREEN",
  /** 青白渐变色。 */
  CYAN_WHITE: "CYANWHITE",
  /** 绿黑渐变色。 */
  GREEN_BLACK: "GREENBLACK",
  /** 绿蓝渐变色。 */
  GREEN_BLUE: "GREENBLUE",
  /** 绿橙紫渐变色。 */
  GREEN_ORANGE_VIOLET: "GREENORANGEVIOLET",
  /** 绿红渐变色。 */
  GREEN_RED: "GREENRED",
  /** 蓝红渐变色。 */
  GREEN_WHITE: "GREENWHITE",
  /** 粉黑渐变色。 */
  PINK_BLACK: "PINKBLACK",
  /** 粉蓝渐变色。 */
  PINK_BLUE: "PINKBLUE",
  /** 粉红渐变色。 */
  PINK_RED: "PINKRED",
  /** 粉白渐变色。 */
  PINK_WHITE: "PINKWHITE",
  /** 彩虹色。 */
  RAIN_BOW: "RAINBOW",
  /** 红黑渐变色。 */
  RED_BLACK: "REDBLACK",
  /** 红白渐变色。 */
  RED_WHITE: "REDWHITE",
  /** 光谱渐变。 */
  SPECTRUM: "SPECTRUM",
  /** 地形渐变，用于三维显示效果较好。 */
  TERRAIN: "TERRAIN",
  /** 黄黑渐变色。 */
  YELLOW_BLACK: "YELLOWBLACK",
  /** 黄蓝渐变色。 */
  YELLOW_BLUE: "YELLOWBLUE",
  /** 黄绿渐变色。 */
  YELLOW_GREEN: "YELLOWGREEN",
  /** 黄红渐变色。 */
  YELLOW_RED: "YELLOWRED",
  /** 黄白渐变色。 */
  YELLOW_WHITE: "YELLOWWHITE"
};

/**
 * @enum TextAlignment
 * @description  文本对齐方式枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TextAlignment.TOPLEFT;
 *
 * </script>
 * // ES6 Import
 * import { TextAlignment } from '{npm}';
 *
 * const result = TextAlignment.TOPLEFT;
 * ```
 */
var TextAlignment = {
  /** 左上角对齐。 */
  TOPLEFT: "TOPLEFT",
  /** 顶部居中对齐。 */
  TOPCENTER: "TOPCENTER",
  /** 右上角对齐。 */
  TOPRIGHT: "TOPRIGHT",
  /** 基准线左对齐。 */
  BASELINELEFT: "BASELINELEFT",
  /** 基准线居中对齐。 */
  BASELINECENTER: "BASELINECENTER",
  /** 基准线右对齐。 */
  BASELINERIGHT: "BASELINERIGHT",
  /** 左下角对齐。 */
  BOTTOMLEFT: "BOTTOMLEFT",
  /** 底部居中对齐。 */
  BOTTOMCENTER: "BOTTOMCENTER",
  /** 右下角对齐。 */
  BOTTOMRIGHT: "BOTTOMRIGHT",
  /** 左中对齐。 */
  MIDDLELEFT: "MIDDLELEFT",
  /** 中心对齐。 */
  MIDDLECENTER: "MIDDLECENTER",
  /** 右中对齐。 */
  MIDDLERIGHT: "MIDDLERIGHT"
};

/**
 * @enum FillGradientMode
 * @description  渐变填充风格的渐变类型枚举。所有渐变类型都是两种颜色之间的渐变，即从渐变起始色到渐变终止色之间的渐变。
 * 渐变风格的计算都是以填充区域的边界矩形，即最小外接矩形作为基础的，因而以下提到的填充区域范围即为填充区域的最小外接矩形。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.FillGradientMode.NONE;
 *
 * </script>
 * // ES6 Import
 * import { FillGradientMode } from '{npm}';
 *
 * const result = FillGradientMode.NONE;
 * ```
 */
var FillGradientMode = {
  /** 无渐变。 */
  NONE: "NONE",
  /** 线性渐变填充。 */
  LINEAR: "LINEAR",
  /** 辐射渐变填充。 */
  RADIAL: "RADIAL",
  /** 圆锥渐变填充。 */
  CONICAL: "CONICAL",
  /** 四角渐变填充。 */
  SQUARE: "SQUARE"
};

/**
 * @enum AlongLineDirection
 * @description  标签沿线标注方向枚举。路线与水平方向的锐角夹角在 60 度以上表示上下方向，60 度以下表示左右方向。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.AlongLineDirection.NORMAL;
 *
 * </script>
 * // ES6 Import
 * import { AlongLineDirection } from '{npm}';
 *
 * const result = AlongLineDirection.NORMAL;
 * ```
 */
var AlongLineDirection = {
  /** 沿线的法线方向放置标签。 */
  NORMAL: "ALONG_LINE_NORMAL",
  /** 从下到上，从左到右放置。 */
  LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
  /** 从上到下，从左到右放置。 */
  LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
  /** 从下到上，从右到左放置。 */
  RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
  /** 从上到下，从右到左放置。 */
  RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM"
};

/**
 * @enum LabelBackShape
 * @description  标签专题图中标签背景的形状枚举。标签背景是 SuperMap iServer 支持的一种标签的显示风格，
 * 使用一定颜色的各种形状作为各标签背景，从而可以突出显示标签或者使标签专题图更美观。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.LabelBackShape.DIAMOND;
 *
 * </script>
 * // ES6 Import
 * import { LabelBackShape } from '{npm}';
 *
 * const result = LabelBackShape.DIAMOND;
 * ```
 */
var LabelBackShape = {
  /** 菱形背景，即标签背景的形状为菱形。 */
  DIAMOND: "DIAMOND",
  /** 椭圆形背景，即标签背景的行状为椭圆形。 */
  ELLIPSE: "ELLIPSE",
  /** 符号背景，即标签背景的形状为设定的符号。 */
  MARKER: "MARKER",
  /** 空背景，即不使用任何形状作为标签背景。 */
  NONE: "NONE",
  /** 矩形背景，即标签背景的形状为矩形。 */
  RECT: "RECT",
  /** 圆角矩形背景，即标签背景的形状为圆角矩形。 */
  ROUNDRECT: "ROUNDRECT",
  /** 三角形背景，即标签背景的形状为三角形。 */
  TRIANGLE: "TRIANGLE"
};

/**
 * @enum LabelOverLengthMode
 * @description  标签专题图中超长标签的处理模式枚举。对于标签的长度超过设置的标签最大长度的标签称为超长标签，
 * 标签的最大长度可以通过 ThemeLabel.maxLabelLength 来设置。
 * SuperMap 提供三种超长标签的处理方式来控制超长标签的显示行为，即换行显示、对超长标签不进行处理、省略超出部分。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.LabelOverLengthMode.NEWLINE;
 *
 * </script>
 * // ES6 Import
 * import { LabelOverLengthMode } from '{npm}';
 *
 * const result = LabelOverLengthMode.NEWLINE;
 * ```
 */
var LabelOverLengthMode = {
  /** 对超长标签换行显示。 */
  NEWLINE: "NEWLINE",
  /** 对超长标签不进行处理。 */
  NONE: "NONE",
  /** 省略标签超出的部分。 */
  OMIT: "OMIT"
};

/**
 * @enum DirectionType
 * @description  网络分析中方向枚举。
 * 在行驶引导子项中使用。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DirectionType.EAST;
 *
 * </script>
 * // ES6 Import
 * import { DirectionType } from '{npm}';
 *
 * const result = DirectionType.EAST;
 * ```
 */
var DirectionType = {
  /** 东。 */
  EAST: "EAST",
  /** 无方向。 */
  NONE: "NONE",
  /** 北。 */
  NORTH: "NORTH",
  /** 南。 */
  SOURTH: "SOURTH",
  /** 西。 */
  WEST: "WEST"
};

/**
 * @enum SideType
 * @description  行驶位置枚举。
 * 表示在行驶在路的左边、右边或者路上的枚举，该类用在行驶导引子项类中。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SideType.LEFT;
 *
 * </script>
 * // ES6 Import
 * import { SideType } from '{npm}';
 *
 * const result = SideType.LEFT;
 * ```
 */
var SideType = {
  /** 路的左侧。 */
  LEFT: "LEFT",
  /** 在路上（即路的中间）。 */
  MIDDLE: "MIDDLE",
  /** 无效值。 */
  NONE: "NONE",
  /** 路的右侧。 */
  RIGHT: "RIGHT"
};

/**
 * @enum SupplyCenterType
 * @description  资源供给中心类型枚举。
 * 该枚举定义了网络分析中资源中心点的类型，主要用于资源分配和选址分区。
 * 资源供给中心点的类型包括非中心，固定中心和可选中心。固定中心用于资源分配分析；固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SupplyCenterType.FIXEDCENTER;
 *
 * </script>
 * // ES6 Import
 * import { SupplyCenterType } from '{npm}';
 *
 * const result = SupplyCenterType.FIXEDCENTER;
 * ```
 */
var SupplyCenterType = {
  /** 固定中心点，用于资源分配和选址分区。 */
  FIXEDCENTER: "FIXEDCENTER",
  /** 非中心点，在资源分配和选址分区时都不予考虑。 */
  NULL: "NULL",
  /** 可选中心点，用于选址分区。 */
  OPTIONALCENTER: "OPTIONALCENTER"
};

/**
 * @enum TurnType
 * @description  转弯方向枚举。
 * 用在行驶引导子项类中，表示转弯的方向。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TurnType.AHEAD;
 *
 * </script>
 * // ES6 Import
 * import { TurnType } from '{npm}';
 *
 * const result = TurnType.AHEAD;
 * ```
 */
var TurnType = {
  /** 向前直行。 */
  AHEAD: "AHEAD",
  /** 掉头。 */
  BACK: "BACK",
  /** 终点，不转弯。 */
  END: "END",
  /** 左转弯。 */
  LEFT: "LEFT",
  /** 无效值。 */
  NONE: "NONE",
  /** 右转弯。 */
  RIGHT: "RIGHT"
};

/**
 * @enum BufferEndType
 * @description  缓冲区分析的缓冲端点类型。用以区分线对象缓冲区分析时的端点是圆头缓冲还是平头缓冲。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.BufferEndType.FLAT;
 *
 * </script>
 * // ES6 Import
 * import { BufferEndType } from '{npm}';
 *
 * const result = BufferEndType.FLAT;
 * ```
 */
var BufferEndType = {
  /** 平头缓冲。 */
  FLAT: "FLAT",
  /** 圆头缓冲。 */
  ROUND: "ROUND"
};
/**
 * @enum OverlayOperationType
 * @description  叠加分析类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.OverlayOperationType.CLIP;
 *
 * </script>
 * // ES6 Import
 * import { OverlayOperationType } from '{npm}';
 *
 * const result = OverlayOperationType.CLIP;
 * ```
 */
var OverlayOperationType = {
  /** 操作数据集（几何对象）裁剪被操作数据集（几何对象）。 */
  CLIP: "CLIP",
  /** 在被操作数据集（几何对象）上擦除掉与操作数据集（几何对象）相重合的部分。 */
  ERASE: "ERASE",
  /**对被操作数据集（几何对象）进行同一操作，即操作执行后，被操作数据集（几何对象）包含来自操作数据集（几何对象）的几何形状。 */
  IDENTITY: "IDENTITY",
  /** 对两个数据集（几何对象）求交，返回两个数据集（几何对象）的交集。 */
  INTERSECT: "INTERSECT",
  /** 对两个面数据集（几何对象）进行合并操作。 */
  UNION: "UNION",
  /** 对两个面数据集（几何对象）进行更新操作。 */
  UPDATE: "UPDATE",
  /** 对两个面数据集（几何对象）进行对称差操作。 */
  XOR: "XOR"
};

/**
 * @enum OutputType
 * @description  分布式分析输出类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.OutputType.INDEXEDHDFS;
 *
 * </script>
 * // ES6 Import
 * import { OutputType } from '{npm}';
 *
 * const result = OutputType.INDEXEDHDFS;
 * ```
 */
var OutputType = {
  /** HDFS 的索引文件。 */
  INDEXEDHDFS: "INDEXEDHDFS",
  /** 本地 UDB 文件。 */
  UDB: "UDB",
  /** MongoDB 数据库。 */
  MONGODB: "MONGODB",
  /** PostgreSQL 数据库。 */
  PG: "PG"
};

/**
 * @enum SmoothMethod
 * @description  平滑方法枚举。
 * 用于从 Grid 或 DEM 数据生成等值线或等值面时，对等值线或者等值面的边界线进行平滑处理的方法。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SmoothMethod.BSPLINE;
 *
 * </script>
 * // ES6 Import
 * import { SmoothMethod } from '{npm}';
 *
 * const result = SmoothMethod.BSPLINE;
 * ```
 */
var SmoothMethod = {
  /** B 样条法。 */
  BSPLINE: "BSPLINE",
  /** 磨角法。 */
  POLISH: "POLISH"
};

/**
 * @enum SurfaceAnalystMethod
 * @description  表面分析方法枚举。
 * 通过对数据进行表面分析，能够挖掘原始数据所包含的信息，使某些细节明显化，易于分析。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SurfaceAnalystMethod.ISOLINE;
 *
 * </script>
 * // ES6 Import
 * import { SurfaceAnalystMethod } from '{npm}';
 *
 * const result = SurfaceAnalystMethod.ISOLINE;
 * ```
 */
var SurfaceAnalystMethod = {
  /** 等值线提取。 */
  ISOLINE: "ISOLINE",
  /** 等值面提取。 */
  ISOREGION: "ISOREGION"
};

/**
 * @enum DataReturnMode
 * @description  数据返回模式枚举。
 * 该枚举用于指定空间分析返回结果模式，包含返回数据集标识和记录集、只返回数据集标识(数据集名称@数据源名称)及只返回记录集三种模式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DataReturnMode.DATASET_AND_RECORDSET;
 *
 * </script>
 * // ES6 Import
 * import { DataReturnMode } from '{npm}';
 *
 * const result = DataReturnMode.DATASET_AND_RECORDSET;
 * ```
 */
var DataReturnMode = {
  /** 返回结果数据集标识(数据集名称@数据源名称)和记录集（RecordSet）。 */
  DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
  /** 只返回数据集标识（数据集名称@数据源名称）。 */
  DATASET_ONLY: "DATASET_ONLY",
  /** 只返回记录集（RecordSet）。 */
  RECORDSET_ONLY: "RECORDSET_ONLY"
};

/**
 * @enum EditType
 * @description  要素集更新模式枚举。
 * 该枚举用于指定数据服务中要素集更新模式，包含添加要素集、更新要素集和删除要素集。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.EditType.ADD;
 *
 * </script>
 * // ES6 Import
 * import { EditType } from '{npm}';
 *
 * const result = {namespace}.EditType.ADD;
 * ```
 */
var EditType = {
  /** 增加操作。 */
  ADD: "add",
  /** 修改操作。 */
  UPDATE: "update",
  /** 删除操作。 */
  DELETE: "delete"
};

/**
 * @enum TransferTactic
 * @description  公交换乘策略枚举。
 * 该枚举用于指定公交服务中的公交换乘策略，包含时间最短、换乘最少、步行最少、距离最短等设置。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TransferTactic.LESS_TIME;
 *
 * </script>
 * // ES6 Import
 * import { TransferTactic } from '{npm}';
 *
 * const result = TransferTactic.LESS_TIME;
 * ```
 */
var TransferTactic = {
  /** 时间最短。 */
  LESS_TIME: "LESS_TIME",
  /** 换乘最少。 */
  LESS_TRANSFER: "LESS_TRANSFER",
  /** 步行最少。 */
  LESS_WALK: "LESS_WALK",
  /** 距离最短。 */
  MIN_DISTANCE: "MIN_DISTANCE"
};

/**
 * @enum TransferPreference
 * @description  交通换乘偏好枚举。
 * 该枚举用于指定交通换乘服务中的地铁优先、公交优先、不乘坐地铁、无乘车偏好等交通换乘偏好设置。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TransferPreference.BUS;
 *
 * </script>
 * // ES6 Import
 * import { TransferPreference } from '{npm}';
 *
 * const result = TransferPreference.BUS;
 * ```
 */
var TransferPreference = {
  /** 公交汽车优先。 */
  BUS: "BUS",
  /** 地铁优先。 */
  SUBWAY: "SUBWAY",
  /** 不乘坐地铁。 */
  NO_SUBWAY: "NO_SUBWAY",
  /** 无乘车偏好。 */
  NONE: "NONE"
};

/**
 * @enum GridType
 * @description  地图背景格网类型枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GridType.CROSS;
 *
 * </script>
 * // ES6 Import
 * import { GridType } from '{npm}';
 *
 * const result = GridType.CROSS;
 * ```
 */
var GridType = {
  /** 十字叉丝。 */
  CROSS: "CROSS",
  /** 网格线。 */
  GRID: "GRID",
  /** 点。 */
  POINT: "POINT"
};

/**
 * @enum ColorSpaceType
 * @description  色彩空间枚举。
 * 由于成色原理的不同，决定了显示器、投影仪这类靠色光直接合成颜色的颜色设备和打印机、
 * 印刷机这类靠使用颜料的印刷设备在生成颜色方式上的区别。
 * 针对上述不同成色方式，SuperMap 提供两种色彩空间，
 * 分别为 RGB 和 CMYK。RGB 主要用于显示系统中，CMYK 主要用于印刷系统中。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ColorSpaceType.CMYK;
 *
 * </script>
 * // ES6 Import
 * import { ColorSpaceType } from '{npm}';
 *
 * const result = ColorSpaceType.CMYK;
 * ```
 */
var ColorSpaceType = {
  /** CMYK色彩模式，该类型主要在印刷系统使用。 */
  CMYK: "CMYK",
  /** RGB色彩模式，该类型主要在显示系统中使用。 */
  RGB: "RGB"
};

/**
 * @enum LayerType
 * @description  图层类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.LayerType.UGC;
 *
 * </script>
 * // ES6 Import
 * import { LayerType } from '{npm}';
 *
 * const result = LayerType.UGC;
 * ```
 */
var LayerType = {
  /** SuperMap UGC 类型图层。如矢量图层、栅格(Grid)图层、影像图层。 */
  UGC: "UGC",
  /** WMS 图层。 */
  WMS: "WMS",
  /** WFS 图层。 */
  WFS: "WFS",
  /** 自定义图层。 */
  CUSTOM: "CUSTOM"
};

/**
 * @enum UGCLayerType
 * @description  SuperMap 图层类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.UGCLayerType.THEME;
 *
 * </script>
 * // ES6 Import
 * import { UGCLayerType } from '{npm}';
 *
 * const result = UGCLayerType.THEME;
 * ```
 */
var UGCLayerType = {
  /** 专题图层。 */
  THEME: "THEME",
  /** 矢量图层。 */
  VECTOR: "VECTOR",
  /** 栅格图层。 */
  GRID: "GRID",
  /** 影像图层。 */
  IMAGE: "IMAGE"
};

/**
 * @enum StatisticMode
 * @description  字段统计方法类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.StatisticMode.AVERAGE;
 *
 * </script>
 * // ES6 Import
 * import { StatisticMode } from '{npm}';
 *
 * const result = StatisticMode.AVERAGE;
 * ```
 */
var StatisticMode = {
  /** 统计所选字段的平均值。 */
  AVERAGE: "AVERAGE",
  /** 统计所选字段的最大值。 */
  MAX: "MAX",
  /** 统计所选字段的最小值。 */
  MIN: "MIN",
  /** 统计所选字段的标准差。 */
  STDDEVIATION: "STDDEVIATION",
  /** 统计所选字段的总和。 */
  SUM: "SUM",
  /** 统计所选字段的方差。 */
  VARIANCE: "VARIANCE"
};

/**
 * @enum PixelFormat
 * @description  定义栅格与影像数据存储的像素格式枚举。光栅数据结构实际上就是像元的阵列，
 * 像元（或像素）是光栅数据的最基本信息存储单位，本枚举类包含了表示一个像元（或像素）的字节长度。
 * 在 SuperMap 中有两种类型的光栅数据：栅格数据集和影像数据集（参见 DatasetGridInfo和DatasetImageInfo）。 
 * 栅格数据集多用来进行栅格分析，因而其像元值为地物的属性值，如高程，降水量等；
 * 而影像数据集一般用来进行显示或作为底图，因而其像元值为颜色值或颜色的索引值。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.PixelFormat.BIT16;
 *
 * </script>
 * // ES6 Import
 * import { PixelFormat } from '{npm}';
 *
 * const result = PixelFormat.BIT16;
 * ```
 */
var PixelFormat = {
  /** 每个像元用16个比特(即2个字节)表示。 */
  BIT16: "BIT16",
  /** 每个像元用32个比特(即4个字节)表示。 */
  BIT32: "BIT32",
  /** 每个像元用64个比特(即8个字节)表示，只提供给栅格数据集使用。 */
  BIT64: "BIT64",
  /** 每个像元用4个字节来表示，只提供给栅格数据集使用。 */
  SINGLE: "SINGLE",
  /** 每个像元用8个字节来表示，只提供给栅格数据集使用。 */
  DOUBLE: "DOUBLE",
  /** 每个像元用1个比特表示。 */
  UBIT1: "UBIT1",
  /** 每个像元用4个比特来表示。 */
  UBIT4: "UBIT4",
  /** 每个像元用8个比特(即1个字节)来表示。 */
  UBIT8: "UBIT8",
  /** 每个像元用24个比特(即3个字节)来表示。 */
  UBIT24: "UBIT24",
  /** 每个像元用32个比特(即4个字节)来表示。 */
  UBIT32: "UBIT32"
};

/**
 * @enum SearchMode
 * @description  插值分析时使用的样本点的查找方式枚举。对于同一种插值方法，样本点的选择方法不同，得到的插值结果也会不同。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SearchMode.KDTREE_FIXED_COUNT;
 *
 * </script>
 * // ES6 Import
 * import { SearchMode } from '{npm}';
 *
 * const result = SearchMode.KDTREE_FIXED_COUNT;
 * ```
 */
var SearchMode = {
  /** 使用 KDTREE 的固定点数方式查找参与内插分析的点。 */
  KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT",
  /** 使用 KDTREE 的定长方式查找参与内插分析的点。 */
  KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS",
  /** 不进行查找，使用所有的输入点进行内插分析。 */
  NONE: "NONE",
  /** 使用 QUADTREE 方式查找参与内插分析的点，仅对样条（RBF）插值和普通克吕金（Kriging）有用。 */
  QUADTREE: "QUADTREE"
};

/**
 * @enum InterpolationAlgorithmType
 * @description  插值分析所采用算法的类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.InterpolationAlgorithmType.KRIGING;
 *
 * </script>
 * // ES6 Import
 * import { InterpolationAlgorithmType } from '{npm}';
 *
 * const result = InterpolationAlgorithmType.KRIGING;
 * ```
 */
var InterpolationAlgorithmType = {
  /** 普通克吕金插值法。 */
  KRIGING: "KRIGING",
  /** 简单克吕金插值法。 */
  SimpleKriging: "SimpleKriging",
  /** 泛克吕金插值法。 */
  UniversalKriging: "UniversalKriging"
};

/**
 * @enum VariogramMode
 * @description  克吕金（Kriging）插值时的半变异函数类型枚举。<br>
 * 指数函数：适用于空间相关关系随样本间距的增加呈指数递减的情况，其空间自相关关系在样本间距的无穷远处完全消失。<br>
 * 高斯函数：适用于空间自相关关系随样本间距的增加而逐渐减少，直到超出一定的距离时空间自相关关系消失的情况。<br>
 * 球形函数：适用于半变异函数值渐进地逼近基台值的情况。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.VariogramMode.EXPONENTIAL;
 *
 * </script>
 * // ES6 Import
 * import { VariogramMode } from '{npm}';
 *
 * const result = VariogramMode.EXPONENTIAL;
 * ```
 */
var VariogramMode = {
  /** 指数函数。 */
  EXPONENTIAL: "EXPONENTIAL",
  /** 高斯函数。 */
  GAUSSIAN: "GAUSSIAN",
  /** 球型函数。 */
  SPHERICAL: "SPHERICAL"
};

/**
 * @enum Exponent
 * @description  定义了泛克吕金（UniversalKriging）插值时样点数据中趋势面方程的阶数。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Exponent.EXP1;
 *
 * </script>
 * // ES6 Import
 * import { Exponent } from '{npm}';
 *
 * const result = Exponent.EXP1;
 * ```
 */
var Exponent = {
  /** 阶数为1。 */
  EXP1: "EXP1",
  /** 阶数为2。 */
  EXP2: "EXP2"
};

/**
 * @enum ClientType
 * @description token 申请的客户端标识类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ClientType.IP;
 *
 * </script>
 * // ES6 Import
 * import { ClientType } from '{npm}';
 *
 * const result = ClientType.IP;
 * ```
 */
var ClientType = {
  /** 指定的 IP 地址。 */
  IP: "IP",
  /** 指定的 URL。 */
  REFERER: "Referer",
  /** 发送申请令牌请求的客户端 IP。 */
  REQUESTIP: "RequestIP",
  /** 不做任何验证。 */
  NONE: "NONE",
  /** 服务端。 */
  SERVER: "SERVER",
  /** 浏览器端。 */
  WEB: "WEB"
};

/**
 * @enum ChartType
 * @description 客户端专题图图表类型。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ChartType.BAR;
 *
 * </script>
 * // ES6 Import
 * import { ChartType } from '{npm}';
 *
 * const result = ChartType.BAR;
 * ```
 */
var ChartType = {
  /** 柱状图。 */
  BAR: "Bar",
  /** 三维柱状图。 */
  BAR3D: "Bar3D",
  /** 圆形图。 */
  CIRCLE: "Circle",
  /** 饼图。 */
  PIE: "Pie",
  /** 散点图。 */
  POINT: "Point",
  /** 折线图。 */
  LINE: "Line",
  /** 环状图。 */
  RING: "Ring"
};

/**
 * @enum ClipAnalystMode
 * @description  裁剪分析模式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ClipAnalystMode.CLIP;
 *
 * </script>
 * // ES6 Import
 * import { ClipAnalystMode } from '{npm}';
 *
 * const result = ClipAnalystMode.CLIP;
 * ```
 */
var ClipAnalystMode = {
  /** 裁剪分析操作。 */
  CLIP: "clip",
  /** 求交分析操作。 */
  INTERSECT: "intersect"
};

/**
 * @enum AnalystAreaUnit
 * @description 分布式分析的面积单位。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.AnalystAreaUnit.SQUAREMETER;
 *
 * </script>
 * // ES6 Import
 * import { AnalystAreaUnit } from '{npm}';
 *
 * const result = AnalystAreaUnit.SQUAREMETER;
 * ```
 */
var AnalystAreaUnit = {
  /** 平方米。 */
  "SQUAREMETER": "SquareMeter",
  /** 平方千米。 */
  "SQUAREKILOMETER": "SquareKiloMeter",
  /** 公顷。 */
  "HECTARE": "Hectare",
  /** 公亩。 */
  "ARE": "Are",
  /** 英亩。 */
  "ACRE": "Acre",
  /** 平方英尺。 */
  "SQUAREFOOT": "SquareFoot",
  /** 平方码。 */
  "SQUAREYARD": "SquareYard",
  /** 平方英里。 */
  "SQUAREMILE": "SquareMile"
};

/**
 * @enum AnalystSizeUnit
 * @description 分布式分析单位。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.AnalystSizeUnit.METER;
 *
 * </script>
 * // ES6 Import
 * import { AnalystSizeUnit } from '{npm}';
 *
 * const result = AnalystSizeUnit.METER;
 * ```
 */
var AnalystSizeUnit = {
  /** 米。 */
  "METER": "Meter",
  /** 千米。 */
  "KILOMETER": "Kilometer",
  /** 码。 */
  "YARD": "Yard",
  /** 英尺。 */
  "FOOT": "Foot",
  /** 英里。 */
  "MILE": "Mile"
};

/**
 * @enum StatisticAnalystMode
 * @description 分布式分析统计模式。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.StatisticAnalystMode.MAX;
 *
 * </script>
 * // ES6 Import
 * import { StatisticAnalystMode } from '{npm}';
 *
 * const result = StatisticAnalystMode.MAX;
 * ```
 */
var StatisticAnalystMode = {
  /** 统计所选字段的最大值。 */
  "MAX": "max",
  /** 统计所选字段的最小值。 */
  "MIN": "min",
  /** 统计所选字段的平均值。 */
  "AVERAGE": "average",
  /** 统计所选字段的总和。 */
  "SUM": "sum",
  /** 统计所选字段的方差。 */
  "VARIANCE": "variance",
  /** 统计所选字段的标准差。 */
  "STDDEVIATION": "stdDeviation"
};

/**
 * @enum SummaryType
 * @description 分布式分析聚合类型。该枚举定义了点聚合分析中点要素的划分和聚合方式。
 * 点聚合分析是指针对点数据集制作聚合图的一种空间分析作业。通过格网面或多边形对地图点要素进行划分，
 * 然后，计算每个面对象内点要素的数量，并作为面对象的统计值，也可以引入点的权重信息，
 * 考虑面对象内点的加权值作为面对象的统计值；最后基于面对象的统计值，按照统计值大小排序的结果，通过色带对面对象进行色彩填充。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SummaryType.SUMMARYMESH;
 *
 * </script>
 * // ES6 Import
 * import { SummaryType } from '{npm}';
 *
 * const result = SummaryType.SUMMARYMESH;
 * ```
 */
var SummaryType = {
  /** 格网聚合。 */
  "SUMMARYMESH": "SUMMARYMESH",
  /** 多边形聚合。 */
  "SUMMARYREGION": "SUMMARYREGION"
};

/**
 * @enum TopologyValidatorRule
 * @description  拓扑检查模规则枚举。该类定义了拓扑检查操作模式常量。
 * 拓扑检查是指根据相应的拓扑规则对点、线和面数据进行检查，返回不符合规则的对象的一种操作作业。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.TopologyValidatorRule.REGIONNOOVERLAP;
 *
 * </script>
 * // ES6 Import
 * import { TopologyValidatorRule } from '{npm}';
 *
 * const result = TopologyValidatorRule.REGIONNOOVERLAP;
 * ```
 */
var TopologyValidatorRule = {
  /** 面内无重叠，用于对面数据进行拓扑检查。 */
  REGIONNOOVERLAP: "REGIONNOOVERLAP",
  /** 面与面无重叠，用于对面数据进行拓扑检查。 */
  REGIONNOOVERLAPWITH: "REGIONNOOVERLAPWITH",
  /** 面被面包含，用于对面数据进行拓扑检查。 */
  REGIONCONTAINEDBYREGION: "REGIONCONTAINEDBYREGION",
  /** 面被面覆盖，用于对面数据进行拓扑检查。 */
  REGIONCOVEREDBYREGION: "REGIONCOVEREDBYREGION",
  /** 线与线无重叠，用于对线数据进行拓扑检查。 */
  LINENOOVERLAP: "LINENOOVERLAP",
  /** 线内无重叠，用于对线数据进行拓扑检查。 */
  LINENOOVERLAPWITH: "LINENOOVERLAPWITH",
  /** 点不相同，用于对点数据进行拓扑检查。 */
  POINTNOIDENTICAL: "POINTNOIDENTICAL"
};

/**
 * @enum BucketAggType
 * @description  格网聚合查询枚举类，该类定义了 Elasticsearch 数据服务中聚合查询模式常量。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.BucketAggType.GEOHASH_GRID;
 *
 * </script>
 * // ES6 Import
 * import { BucketAggType } from '{npm}';
 *
 * const result = BucketAggType.GEOHASH_GRID;
 * ```
 */
var BucketAggType = {
  /** 格网聚合类型。 */
  GEOHASH_GRID: "geohash_grid"
};

/**
 * @enum MetricsAggType
 * @description  指标聚合类型枚举类，该类定义了 Elasticsearch 数据服务中聚合查询模式常量。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.MetricsAggType.AVG;
 *
 * </script>
 * // ES6 Import
 * import { MetricsAggType } from '{npm}';
 *
 * const result = MetricsAggType.AVG;
 * ```
 */
var MetricsAggType = {
  /** 平均值聚合类型。 */
  AVG: 'avg',
  /** 最大值聚合类型。 */
  MAX: 'max',
  /** 最小值聚合类型。 */
  MIN: 'min',
  /** 求和聚合类型。 */
  SUM: 'sum'
};

/**
 * @enum GetFeatureMode
 * @description 数据查询的模式（获取要素的方式）枚举。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GetFeatureMode.BOUNDS;
 *
 * </script>
 * // ES6 Import
 * import { GetFeatureMode } from '{npm}';
 *
 * const result = GetFeatureMode.BOUNDS;
 * ```
 */
var GetFeatureMode = {
  /** 通过范围查询来获取要素。 */
  BOUNDS: "BOUNDS",
  /** 通过几何对象的缓冲区来获取要素。 */
  BUFFER: "BUFFER",
  /** 通过 ID 来获取要素。 */
  ID: "ID",
  /** 通过空间查询模式来获取要素。 */
  SPATIAL: "SPATIAL",
  /** 通过 SQL 查询来获取要素。 */
  SQL: 'SQL'
};

/**
 * @enum RasterFunctionType
 * @description 栅格分析方法。
 * @category BaseTypes Constant
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GetFeatureMode.NDVI;
 *
 * </script>
 * // ES6 Import
 * import { GetFeatureMode } from '{npm}';
 *
 * const result = GetFeatureMode.NDVI;
 * ```
 */
var RasterFunctionType = {
  /** 归一化植被指数。 */
  NDVI: "NDVI",
  /** 阴影面分析。 */
  HILLSHADE: "HILLSHADE"
};

/**
 * @enum ResourceType
 * @description SuperMap iPortal 资源类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.GetFeatureMode.MAP;
 *
 * </script>
 * // ES6 Import
 * import { GetFeatureMode } from '{npm}';
 *
 * const result = GetFeatureMode.MAP;
 * ```
 */
var ResourceType = {
  /** 地图资源。 */
  MAP: "MAP",
  /** 服务资源。 */
  SERVICE: "SERVICE",
  /** 三维场景资源。 */
  SCENE: "SCENE",
  /** 数据资源。 */
  DATA: "DATA",
  /** 数据洞察资源。 */
  INSIGHTS_WORKSPACE: "INSIGHTS_WORKSPACE",
  /** 地图大屏资源。 */
  MAP_DASHBOARD: "MAP_DASHBOARD"
};

/**
 * @enum OrderBy
 * @description SuperMap iPortal 资源排序字段。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.OrderBy.UPDATETIME;
 *
 * </script>
 * // ES6 Import
 * import { OrderBy } from '{npm}';
 *
 * const result = OrderBy.UPDATETIME;
 * ```
 */
var OrderBy = {
  /** 按更新时间排序。 */
  UPDATETIME: "UPDATETIME",
  /** 按热度(可能是访问量、下载量)排序。 */
  HEATLEVEL: "HEATLEVEL",
  /** 按相关性排序。 */
  RELEVANCE: "RELEVANCE"
};

/**
 * @enum OrderType
 * @description SuperMap iPortal 资源升序还是降序过滤。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.OrderType.ASC;
 *
 * </script>
 * // ES6 Import
 * import { OrderType } from '{npm}';
 *
 * const result = OrderType.ASC;
 * ```
 */
var OrderType = {
  /** 升序过滤。 */
  ASC: "ASC",
  /** 降序过滤。 */
  DESC: "DESC"
};

/**
 * @enum SearchType
 * @description 对 SuperMap iPortal 资源查询的范围进行过滤。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.SearchType.PUBLIC;
 *
 * </script>
 * // ES6 Import
 * import { SearchType } from '{npm}';
 *
 * const result = SearchType.PUBLIC;
 * ```
 */
var SearchType = {
  /** 公开资源。 */
  PUBLIC: "PUBLIC",
  /** 我的资源。 */
  MY_RES: "MY_RES",
  /** 我的群组资源。 */
  MYGROUP_RES: "MYGROUP_RES",
  /** 我的部门资源。 */
  MYDEPARTMENT_RES: "MYDEPARTMENT_RES",
  /** 分享给我的资源。 */
  SHARETOME_RES: "SHARETOME_RES"
};

/**
 * @enum AggregationTypes
 * @description SuperMap iPortal 资源支持的聚合查询类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.AggregationTypes.TAG;
 *
 * </script>
 * // ES6 Import
 * import { AggregationTypes } from '{npm}';
 *
 * const result = AggregationTypes.TAG;
 * ```
 */
var AggregationTypes = {
  /** 标签聚合。 */
  TAG: "TAG",
  /** 资源类型聚合。 */
  TYPE: "TYPE"
};

/**
 * @enum PermissionType
 * @description SuperMap iPortal 资源权限类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.PermissionType.SEARCH;
 *
 * </script>
 * // ES6 Import
 * import { PermissionType } from '{npm}';
 *
 * const result = PermissionType.SEARCH;
 * ```
 */
var PermissionType = {
  /** 可检索。 */
  SEARCH: "SEARCH",
  /** 可查看。 */
  READ: "READ",
  /** 可编辑。 */
  READWRITE: "READWRITE",
  /** 可删除。 */
  DELETE: "DELETE",
  /** 可下载，包括可查看、可检索。 */
  DOWNLOAD: "DOWNLOAD"
};

/**
 * @enum EntityType
 * @description SuperMap iPortal 资源实体类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.EntityType.DEPARTMENT;
 *
 * </script>
 * // ES6 Import
 * import { EntityType } from '{npm}';
 *
 * const result = EntityType.DEPARTMENT;
 * ```
 */
var EntityType = {
  /** 部门。 */
  DEPARTMENT: "DEPARTMENT",
  /** 用户组。 */
  GROUP: "GROUP",
  /** 群组。 */
  IPORTALGROUP: "IPORTALGROUP",
  /** 角色。 */
  ROLE: "ROLE",
  /** 用户。 */
  USER: "USER"
};

/**
 * @enum DataItemType
 * @description SuperMap iPortal 数据类型。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DataItemType.GEOJSON;
 *
 * </script>
 * // ES6 Import
 * import { DataItemType } from '{npm}';
 *
 * const result = DataItemType.GEOJSON;
 * ```
 */
var DataItemType = {
  /** GeoJSON 数据。 */
  GEOJSON: "GEOJSON",
  /** UGCV5_MVT 矢量瓦片。 */
  UGCV5_MVT: "UGCV5_MVT",
  /** JSON 数据。  */
  JSON: "JSON",
  /** 音频文件。 */
  AUDIO: "AUDIO",
  /** Color 颜色。 */
  COLOR: "COLOR",
  /** ColorScheme 颜色方案。 */
  COLORSCHEME: "COLORSCHEME",
  /** CSV 数据。 */
  CSV: "CSV",
  /** EXCEL 数据。 */
  EXCEL: "EXCEL",
  /** FillSymbol 填充符号库。 */
  FILLSYMBOL: "FILLSYMBOL",
  /** 图片类型。 */
  IMAGE: "IMAGE",
  /** LayerTemplate 图层模板。 */
  LAYERTEMPLATE: "LAYERTEMPLATE",
  /** LayoutTemplate 布局模板。 */
  LAYOUTTEMPLATE: "LAYOUTTEMPLATE",
  /** LineSymbol 线符号库。 */
  LINESYMBOL: "LINESYMBOL",
  /** MapTemplate 地图模板。 */
  MAPTEMPLATE: "MAPTEMPLATE",
  /** MarkerSymbol 点符号库。 */
  MARKERSYMBOL: "MARKERSYMBOL",
  /** MBTiles 地图瓦片。 */
  MBTILES: "MBTILES",
  /** 照片。 */
  PHOTOS: "PHOTOS",
  /** SHP 空间数据。 */
  SHP: "SHP",
  /** SMTiles 地图瓦片。 */
  SMTILES: "SMTILES",
  /** SVTiles 地图瓦片。 */
  SVTILES: "SVTILES",
  /** ThemeTemplate 专题图模板。 */
  THEMETEMPLATE: "THEMETEMPLATE",
  /** ArcGIS TPK 瓦片。 */
  TPK: "TPK",
  /** UDB 数据源。 */
  UDB: "UDB",
  /** UGCV5 矢量瓦片。 */
  UGCV5: "UGCV5",
  /** 其他类型（普通文件）。 */
  UNKNOWN: "UNKNOWN",
  /** 视频文件。 */
  VIDEO: "VIDEO",
  /** WorkEnviroment 工作环境。 */
  WORKENVIRONMENT: "WORKENVIRONMENT",
  /** 工作空间。 */
  WORKSPACE: "WORKSPACE"
};

/**
 * @enum WebExportFormatType
 * @description Web 打印输出的格式。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.WebExportFormatType.PNG;
 *
 * </script>
 * // ES6 Import
 * import { WebExportFormatType } from '{npm}';
 *
 * const result = WebExportFormatType.PNG;
 * ```
 */
var WebExportFormatType = {
  /** PNG */
  PNG: "PNG",
  /** PDF */
  PDF: "PDF"
};

/**
 * @enum WebScaleOrientationType
 * @description Web 比例尺的方位样式。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.WebScaleOrientationType.HORIZONTALLABELSBELOW;
 *
 * </script>
 * // ES6 Import
 * import { WebScaleOrientationType } from '{npm}';
 *
 * const result = WebScaleOrientationType.HORIZONTALLABELSBELOW;
 * ```
 */
var WebScaleOrientationType = {
  /** 位于地图上侧的水平方向标签。 */
  HORIZONTALLABELSBELOW: "HORIZONTALLABELSBELOW",
  /** 位于地图下侧的水平方向标签。 */
  HORIZONTALLABELSABOVE: "HORIZONTALLABELSABOVE",
  /** 位于地图左侧的垂直方向标签。 */
  VERTICALLABELSLEFT: "VERTICALLABELSLEFT",
  /** 位于地图右侧的垂直方向标签。 */
  VERTICALLABELSRIGHT: "VERTICALLABELSRIGHT"
};

/**
 * @enum WebScaleType
 * @description Web 比例尺的样式。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.WebScaleType.LINE;
 *
 * </script>
 * // ES6 Import
 * import { WebScaleType } from '{npm}';
 *
 * const result = WebScaleType.LINE;
 * ```
 */
var WebScaleType = {
  /** line. */
  LINE: "LINE",
  /** bar. */
  BAR: "BAR",
  /** bar sub. */
  BAR_SUB: "BAR_SUB"
};

/**
 * @enum WebScaleUnit
 * @description Web 打印中地图比例尺的单位制。
 * @category BaseTypes Constant
 * @version 10.0.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.WebScaleUnit.METER;
 *
 * </script>
 * // ES6 Import
 * import { WebScaleUnit } from '{npm}';
 *
 * const result = WebScaleUnit.METER;
 * ```
 */
var WebScaleUnit = {
  /** 米。 */
  METER: "METER",
  /** 英尺。 */
  FOOT: "FOOT",
  /** 度。 */
  DEGREES: "DEGREES"
};

/**
 * @enum BoundsType
 * @description 范围类型。
 * @category BaseTypes Constant
 * @version 11.1.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.BoundsType.UNION;
 *
 * </script>
 * // ES6 Import
 * import { BoundsType } from '{npm}';
 *
 * const result = BoundsType.UNION;
 * ```
 */
var BoundsType = {
  /** 自定义范围。 */
  CUSTOM: "CUSTOM",
  /** 输入栅格数据集范围的交集。 */
  INTERSECTION: "INTERSECTION",
  /** 输入栅格数据集范围的并集。 */
  UNION: "UNION"
};

/**
 * @enum CellSizeType
 * @description 单元格大小类型。
 * @category BaseTypes Constant
 * @version 11.1.1
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.CellSizeType.MAX;
 *
 * </script>
 * // ES6 Import
 * import { CellSizeType } from '{npm}';
 *
 * const result = CellSizeType.MAX;
 * ```
 */
var CellSizeType = {
  /** 将用户自己输入的单元格值大小作为单元格大小类型。 */
  CUSTOM: "CUSTOM",
  /** 输入栅格数据集中单元格最大值作为单元格大小类型。*/
  MAX: "MAX",
  /** 输入栅格数据集中单元格最小值作为单元格大小类型。 */
  MIN: "MIN"
};

/**
 * @enum ColourModeChart
 * @description 颜色模式的类型。
 * @category BaseTypes Constant
 * @version 11.2.0
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ColourModeChart.DAY_BRIGHT;
 *
 * </script>
 * // ES6 Import
 * import { ColourModeChart } from '{npm}';
 *
 * const result = ColourModeChart.DAY_BRIGHT;
 * ```
 */
var ColourModeChart = {
  /** 白昼模式。 */
  DAY_BRIGHT: "DAY_BRIGHT",
  /** 晨昏模式。*/
  DUSK: "DUSK",
  /** 夜晚模式。 */
  NIGHT: "NIGHT"
};

/**
 * @enum DisplayModeChart
 * @description 海图显示模式的类型。
 * @category BaseTypes Constant
 * @version 11.2.0
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DisplayModeChart.STANDARD;
 *
 * </script>
 * // ES6 Import
 * import { DisplayModeChart } from '{npm}';
 *
 * const result = DisplayModeChart.STANDARD;
 * ```
 */
var DisplayModeChart = {
  /** 基本显示模式 */
  BASIC: "BASIC",
  /** 标准显示模式*/
  STANDARD: "STANDARD",
  /** 其他显示模式。 */
  OTHER: "OTHER"
};

;// CONCATENATED MODULE: ./src/common/iServer/DatasourceConnectionInfo.js
function DatasourceConnectionInfo_typeof(o) { "@babel/helpers - typeof"; return DatasourceConnectionInfo_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, DatasourceConnectionInfo_typeof(o); }
function DatasourceConnectionInfo_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function DatasourceConnectionInfo_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, DatasourceConnectionInfo_toPropertyKey(descriptor.key), descriptor); } }
function DatasourceConnectionInfo_createClass(Constructor, protoProps, staticProps) { if (protoProps) DatasourceConnectionInfo_defineProperties(Constructor.prototype, protoProps); if (staticProps) DatasourceConnectionInfo_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function DatasourceConnectionInfo_toPropertyKey(t) { var i = DatasourceConnectionInfo_toPrimitive(t, "string"); return "symbol" == DatasourceConnectionInfo_typeof(i) ? i : String(i); }
function DatasourceConnectionInfo_toPrimitive(t, r) { if ("object" != DatasourceConnectionInfo_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != DatasourceConnectionInfo_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

 // eslint-disable-line no-unused-vars

/**
 * @class DatasourceConnectionInfo
 * @deprecatedclass SuperMap.DatasourceConnectionInfo
 * @category  iServer Data Datasource
 * @classdesc 数据源连接信息类。该类包括了进行数据源连接的所有信息，如所要连接的服务器名称、数据库名称、用户名以及密码等。
 *            当保存为工作空间时，工作空间中的数据源的连接信息都将存储到工作空间文件中。对于不同类型的数据源，其连接信息有所区别。
 *            所以在使用该类所包含的成员时，请注意该成员所适用的数据源类型。对于从数据源对象中返回的数据连接信息对象，只有 connect 方法可以被修改，
 *            其他内容是不可以被修改的。对于用户创建的数据源连接信息对象，其内容都可以修改。
 * @param {Object} options - 参数。
 * @param {string} options.alias - 数据源别名。
 * @param {string} options.dataBase - 数据源连接的数据库名。
 * @param {boolean} [options.connect] - 数据源是否自动连接数据。
 * @param {string} [options.driver] - 使用 ODBC(Open Database Connectivity，开放数据库互连)的数据库的驱动程序名。
 * @param {EngineType} [options.engineType] - 数据源连接的引擎类型。
 * @param {boolean} [options.exclusive] - 是否以独占方式打开数据源。
 * @param {boolean} [options.OpenLinkTable] - 是否把数据库中的其他非 SuperMap 数据表作为 LinkTable 打开。
 * @param {string} [options.password] - 登录数据源连接的数据库或文件的密码。
 * @param {boolean} [options.readOnly] - 是否以只读方式打开数据源。
 * @param {string} [options.server] - 数据库服务器名或 SDB 文件名。
 * @param {string} [options.user] - 登录数据库的用户名。
 * @usage
 */
var DatasourceConnectionInfo = /*#__PURE__*/function () {
  function DatasourceConnectionInfo(options) {
    DatasourceConnectionInfo_classCallCheck(this, DatasourceConnectionInfo);
    /**
     * @member {string} DatasourceConnectionInfo.prototype.alias
     * @description 数据源别名。
     */
    this.alias = null;

    /**
     * @member {boolean} [DatasourceConnectionInfo.prototype.connect]
     * @description 数据源是否自动连接数据。
     */
    this.connect = null;

    /**
     * @member {string} DatasourceConnectionInfo.prototype.dataBase
     * @description 数据源连接的数据库名。
     */
    this.dataBase = null;

    /**
     * @member {string} [DatasourceConnectionInfo.prototype.driver]
     * @description 使用 ODBC(Open Database Connectivity，开放数据库互连) 的数据库的驱动程序名。
     * 其中，对于 SQL Server 数据库与 SuperMap iServer 发布的 WMTS 服务，此为必设参数。
     * 对于 SQL Server 数据库，它使用 ODBC 连接，所设置的驱动程序名为 "SQL Server" 或 "SQL Native Client"；
     * 对于 SuperMap iServer 发布的 WMTS 服务，设置的驱动名称为 "WMTS"。
     */
    this.driver = null;

    /**
     * @member {EngineType} [DatasourceConnectionInfo.prototype.engineType]
     * @description 数据源连接的引擎类型。
     */
    this.engineType = null;

    /**
     * @member {boolean} [DatasourceConnectionInfo.prototype.exclusive]
     * @description 是否以独占方式打开数据源。
     */
    this.exclusive = null;

    /**
     * @member {boolean} [DatasourceConnectionInfo.prototype.OpenLinkTable]
     * @description 是否把数据库中的其他非 SuperMap 数据表作为 LinkTable 打开。
     */
    this.OpenLinkTable = null;

    /**
     * @member {string} [DatasourceConnectionInfo.prototype.password]
     * @description 登录数据源连接的数据库或文件的密码。
     */
    this.password = null;

    /**
     * @member {boolean} [DatasourceConnectionInfo.prototype.readOnly]
     * @description 是否以只读方式打开数据源。
     */
    this.readOnly = null;

    /**
     * @member {string} [DatasourceConnectionInfo.prototype.server]
     * @description 数据库服务器名、文件名或服务地址。<br>
     * 1.对于 SDB 和 UDB 文件，为其文件的绝对路径。注意：当绝对路径的长度超过 UTF-8 编码格式的 260 字节长度，该数据源无法打开。<br>
     * 2.对于 Oracle 数据库，其服务器名为其 TNS 服务名称。<br>
     * 3.对于 SQL Server 数据库，其服务器名为其系统的 DSN(Database Source Name) 名称。<br>
     * 4.对于 PostgreSQL 数据库，其服务器名为 “IP:端口号”，默认的端口号是 5432。<br>
     * 5.对于 DB2 数据库，已经进行了编目，所以不需要进行服务器的设置。<br>
     * 6.对于 Kingbase 数据库，其服务器名为其 IP 地址。<br>
     * 7.对于 GoogleMaps 数据源，其服务器地址，默认设置为 “{@link http://maps.google.com}”，且不可更改。<br>
     * 8.对于 SuperMapCould 数据源，为其服务地址。<br>
     * 9.对于 MAPWORLD 数据源，为其服务地址，默认设置为 “{@link http://www.tianditu.cn}”，且不可更改。<br>
     * 10.对于 OGC 和 REST 数据源，为其服务地址。
     */
    this.server = null;

    /**
     * @member {string} DatasourceConnectionInfo.prototype.user
     * @description 登录数据库的用户名。
     */
    this.user = null;
    if (options) {
      Util_Util.extend(this, options);
    }
    this.CLASS_NAME = "SuperMap.DatasourceConnectionInfo";
  }

  /**
   * @function DatasourceConnectionInfo.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  DatasourceConnectionInfo_createClass(DatasourceConnectionInfo, [{
    key: "destroy",
    value: function destroy() {
      var me = this;
      me.alias = null;
      me.connect = null;
      me.dataBase = null;
      me.driver = null;
      me.engineType = null;
      me.exclusive = null;
      me.OpenLinkTable = null;
      me.password = null;
      me.readOnly = null;
      me.server = null;
      me.user = null;
    }
  }]);
  return DatasourceConnectionInfo;
}();
;// CONCATENATED MODULE: ./src/common/iServer/OutputSetting.js
function OutputSetting_typeof(o) { "@babel/helpers - typeof"; return OutputSetting_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, OutputSetting_typeof(o); }
function OutputSetting_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function OutputSetting_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, OutputSetting_toPropertyKey(descriptor.key), descriptor); } }
function OutputSetting_createClass(Constructor, protoProps, staticProps) { if (protoProps) OutputSetting_defineProperties(Constructor.prototype, protoProps); if (staticProps) OutputSetting_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function OutputSetting_toPropertyKey(t) { var i = OutputSetting_toPrimitive(t, "string"); return "symbol" == OutputSetting_typeof(i) ? i : String(i); }
function OutputSetting_toPrimitive(t, r) { if ("object" != OutputSetting_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != OutputSetting_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class OutputSetting
 * @deprecatedclass SuperMap.OutputSetting
 * @category  iServer ProcessingService
 * @classdesc 分布式分析输出类型设置类。当输出分布式分析结果到数据库或文件系统时，使用此类进行设置。
 * @param {Object} options - 参数。
 * @param {DatasourceConnectionInfo} options.datasourceInfo - 分析结果数据源连接信息。
 * @param {string} [options.datasetName='analystResult'] - 分析结果数据集名称。
 * @param {OutputType} [options.type=OutputType.UDB] - 分析结果输出类型。
 * @param {string} [options.outputPath] - 分析结果输出路径。
 * @usage
 */
var OutputSetting = /*#__PURE__*/function () {
  function OutputSetting(options) {
    OutputSetting_classCallCheck(this, OutputSetting);
    /**
     * @member {OutputType} OutputSetting.prototype.type
     * @description 分布式分析的输出类型。
     */
    this.type = OutputType.UDB;

    /**
     * @member {string} [OutputSetting.prototype.datasetName='analystResult']
     * @description 分布式分析的输出结果数据集名称。
     */
    this.datasetName = "analystResult";

    /**
     * @member {DatasourceConnectionInfo} OutputSetting.prototype.datasourceInfo
     * @description 分布式分析的输出结果数据源连接信息。
     */
    this.datasourceInfo = null;

    /**
     * @member {string} [OutputSetting.prototype.outputPath]
     * @description 分布式分析的分析结果输出路径。
     */
    this.outputPath = "";
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.OutputSetting";
  }

  /**
   * @function OutputSetting.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  OutputSetting_createClass(OutputSetting, [{
    key: "destroy",
    value: function destroy() {
      var me = this;
      me.type = null;
      me.datasetName = null;
      me.outputPath = null;
      if (me.datasourceInfo instanceof DatasourceConnectionInfo) {
        me.datasourceInfo.destroy();
        me.datasourceInfo = null;
      }
    }
  }]);
  return OutputSetting;
}();
;// CONCATENATED MODULE: ./src/common/iServer/MappingParameters.js
function MappingParameters_typeof(o) { "@babel/helpers - typeof"; return MappingParameters_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, MappingParameters_typeof(o); }
function MappingParameters_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function MappingParameters_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, MappingParameters_toPropertyKey(descriptor.key), descriptor); } }
function MappingParameters_createClass(Constructor, protoProps, staticProps) { if (protoProps) MappingParameters_defineProperties(Constructor.prototype, protoProps); if (staticProps) MappingParameters_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function MappingParameters_toPropertyKey(t) { var i = MappingParameters_toPrimitive(t, "string"); return "symbol" == MappingParameters_typeof(i) ? i : String(i); }
function MappingParameters_toPrimitive(t, r) { if ("object" != MappingParameters_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != MappingParameters_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @class MappingParameters
 * @deprecatedclass SuperMap.MappingParameters
 * @category  iServer ProcessingService
 * @classdesc 分析后结果可视化的参数类。此类用于设置分布式分析结果可视化得到的专题图的子项数组、精度、分段模式、分段个数和颜色渐变模式等参数。
 * @param {Object} options - 参数。
 * @param {Array.<ThemeGridRangeItem>} [options.items] - 栅格分段专题图子项数组。
 * @param {number} [options.numericPrecision=1] - 精度，此字段用于设置分析结果标签专题图中标签数值的精度，如“1”表示精确到小数点的后一位。
 * @param {RangeMode} [options.rangeMode=RangeMode.EQUALINTERVAL] - 专题图分段模式。
 * @param {number} [options.rangeCount] - 专题图分段个数。
 * @param {ColorGradientType} [options.colorGradientType=ColorGradientType.YELLOW_RED] - 专题图颜色渐变模式。
 * @usage
 */
var MappingParameters = /*#__PURE__*/function () {
  function MappingParameters(options) {
    MappingParameters_classCallCheck(this, MappingParameters);
    /**
     * @member {Array.<ThemeGridRangeItem>} [MappingParameters.prototype.items]
     * @description 栅格分段专题图子项数组。
     */
    this.items = null;

    /**
     * @member {number} [MappingParameters.prototype.numericPrecision=1]
     * @description 精度，此字段用于设置分析结果标签专题图中标签数值的精度，如“1”表示精确到小数点的后一位。
     */
    this.numericPrecision = 1;

    /**
     * @member {RangeMode} [MappingParameters.prototype.RangeMode=RangeMode.EQUALINTERVAL]
     * @description 专题图分段模式。
     */
    this.rangeMode = RangeMode.EQUALINTERVAL;

    /**
     * @member {number} [MappingParameters.prototype.rangeCount]
     * @description 专题图分段个数。
     */
    this.rangeCount = "";

    /**
     * @member {ColorGradientType} [MappingParameters.prototype.colorGradientType=ColorGradientType.YELLOW_RED]
     * @description 专题图颜色渐变模式。
     */
    this.colorGradientType = ColorGradientType.YELLOW_RED;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.MappingParameters";
  }

  /**
   * @function MappingParameters.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  MappingParameters_createClass(MappingParameters, [{
    key: "destroy",
    value: function destroy() {
      var me = this;
      if (me.items) {
        if (me.items.length > 0) {
          for (var item in me.items) {
            me.items[item].destroy();
            me.items[item] = null;
          }
        }
        me.items = null;
      }
      me.numericPrecision = null;
      me.rangeMode = null;
      me.rangeCount = null;
      me.colorGradientType = null;
    }
  }]);
  return MappingParameters;
}();
;// CONCATENATED MODULE: ./src/common/iServer/KernelDensityJobParameter.js
function KernelDensityJobParameter_typeof(o) { "@babel/helpers - typeof"; return KernelDensityJobParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, KernelDensityJobParameter_typeof(o); }
function KernelDensityJobParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function KernelDensityJobParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, KernelDensityJobParameter_toPropertyKey(descriptor.key), descriptor); } }
function KernelDensityJobParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) KernelDensityJobParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) KernelDensityJobParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function KernelDensityJobParameter_toPropertyKey(t) { var i = KernelDensityJobParameter_toPrimitive(t, "string"); return "symbol" == KernelDensityJobParameter_typeof(i) ? i : String(i); }
function KernelDensityJobParameter_toPrimitive(t, r) { if ("object" != KernelDensityJobParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != KernelDensityJobParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class KernelDensityJobParameter
 * @deprecatedclass SuperMap.KernelDensityJobParameter
 * @category iServer ProcessingService DensityAnalyst
 * @classdesc 此类用于设置核密度分析的数据集、分析范围、分析方法、权重、影响半径、分辨率、分析单位等参数，
 * 还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.fields - 权重索引。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} [options.query] - 缓冲区分析范围（默认为全图范围）。
 * @param {number} [options.resolution=80] - 分辨率。
 * @param {number} [options.method=0] - 密度分析方法。0 表示简单密度分析，1 表示核密度分析。
 * @param {number} [options.meshType=0] - 密度分析类型。0 表示四边形网格，1 表示六边形网格。
 * @param {number} [options.radius=300] - 分析的影响半径。
 * @param {AnalystSizeUnit} [options.meshSizeUnit=AnalystSizeUnit.METER] - 网格大小单位。
 * @param {AnalystSizeUnit} [options.radiusUnit=AnalystSizeUnit.METER] - 搜索半径单位。
 * @param {AnalystAreaUnit} [options.areaUnit=AnalystAreaUnit.SQUAREMILE] - 面积单位。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var KernelDensityJobParameter = /*#__PURE__*/function () {
  function KernelDensityJobParameter(options) {
    KernelDensityJobParameter_classCallCheck(this, KernelDensityJobParameter);
    if (!options) {
      return;
    }
    /**
     * @member {string} KernelDensityJobParameter.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = "";

    /**
     * @member {SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject} [KernelDensityJobParameter.prototype.query]
     * @description 分析范围。
     */
    this.query = "";

    /**
     * @member {number} [KernelDensityJobParameter.prototype.resolution=80]
     * @description 网格大小。
     */
    this.resolution = 80;

    /**
     * @member {number} [KernelDensityJobParameter.prototype.method=0]
     * @description 密度分析方法。0 表示简单密度分析，1 表示核密度分析。
     */
    this.method = 0;

    /**
     * @member {number} [KernelDensityJobParameter.prototype.meshType=0]
     * @description 密度分析类型。0 表示四边形网格，1 表示六边形网格。
     */
    this.meshType = 0;

    /**
     * @member {string} KernelDensityJobParameter.prototype.fields
     * @description 权重索引。仅支持系统字段以外的整形、长整形、浮点型的字段的名称。
     */
    this.fields = "";

    /**
     * @member {number} [KernelDensityJobParameter.prototype.radius=300]
     * @description 分析的影响半径。
     */
    this.radius = 300;

    /**
     * @member {AnalystSizeUnit} [KernelDensityJobParameter.prototype.meshSizeUnit=AnalystSizeUnit.METER]
     * @description 网格大小单位。
     */
    this.meshSizeUnit = AnalystSizeUnit.METER;

    /**
     * @member {AnalystSizeUnit} [KernelDensityJobParameter.prototype.radiusUnit=AnalystSizeUnit.METER]
     * @description 搜索半径单位。
     */
    this.radiusUnit = AnalystSizeUnit.METER;

    /**
     * @member {AnalystAreaUnit} [KernelDensityJobParameter.prototype.areaUnit=AnalystAreaUnit.SQUAREMILE]
     * @description 面积单位。
     */
    this.areaUnit = AnalystAreaUnit.SQUAREMILE;

    /**
     * @member {OutputSetting} KernelDensityJobParameter.prototype.output
     * @description 输出参数设置类。
     */
    this.output = null;

    /**
     * @member {MappingParameters} [KernelDensityJobParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */
    this.mappingParameters = null;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.KernelDensityJobParameter";
  }

  /**
   * @function KernelDensityJobParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  KernelDensityJobParameter_createClass(KernelDensityJobParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.query = null;
      this.resolution = null;
      this.method = null;
      this.radius = null;
      this.meshType = null;
      this.fields = null;
      this.meshSizeUnit = null;
      this.radiusUnit = null;
      this.areaUnit = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function KernelDensityJobParameter.toObject
     * @param {KernelDensityJobParameter} kernelDensityJobParameter - 核密度分析任务参数类。
     * @param {KernelDensityJobParameter} tempObj - 核密度分析任务参数对象。
     * @description 将核密度分析任务参数对象转换为 JSON 对象。
     * @returns JSON 对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(kernelDensityJobParameter, tempObj) {
      for (var name in kernelDensityJobParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = kernelDensityJobParameter[name];
          continue;
        }
        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = kernelDensityJobParameter[name];
          continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        if (name === 'query' && kernelDensityJobParameter[name]) {
          tempObj['analyst'][name] = kernelDensityJobParameter[name].toBBOX();
        } else {
          tempObj['analyst'][name] = kernelDensityJobParameter[name];
        }
        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = kernelDensityJobParameter[name];
        }
      }
    }
  }]);
  return KernelDensityJobParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/SingleObjectQueryJobsParameter.js
function SingleObjectQueryJobsParameter_typeof(o) { "@babel/helpers - typeof"; return SingleObjectQueryJobsParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SingleObjectQueryJobsParameter_typeof(o); }
function SingleObjectQueryJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SingleObjectQueryJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SingleObjectQueryJobsParameter_toPropertyKey(descriptor.key), descriptor); } }
function SingleObjectQueryJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) SingleObjectQueryJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) SingleObjectQueryJobsParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SingleObjectQueryJobsParameter_toPropertyKey(t) { var i = SingleObjectQueryJobsParameter_toPrimitive(t, "string"); return "symbol" == SingleObjectQueryJobsParameter_typeof(i) ? i : String(i); }
function SingleObjectQueryJobsParameter_toPrimitive(t, r) { if ("object" != SingleObjectQueryJobsParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SingleObjectQueryJobsParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SingleObjectQueryJobsParameter
 * @deprecatedclass SuperMap.SingleObjectQueryJobsParameter
 * @category  iServer ProcessingService Query
 * @classdesc 单对象空间查询分析任务参数类。此类用于设置叠加分析的数据集、分析模式、保留字段等参数，
 * 还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.datasetQuery - 查询对象所在的数据集名称。
 * @param {SpatialQueryMode} [options.mode=SpatialQueryMode.CONTAIN] - 空间查询模式。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var SingleObjectQueryJobsParameter = /*#__PURE__*/function () {
  function SingleObjectQueryJobsParameter(options) {
    SingleObjectQueryJobsParameter_classCallCheck(this, SingleObjectQueryJobsParameter);
    if (!options) {
      return;
    }
    /**
     * @member {string} SingleObjectQueryJobsParameter.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = "";

    /**
     * @member {string} SingleObjectQueryJobsParameter.prototype.datasetQuery
     * @description 查询对象所在的数据集名称。
     */
    this.datasetQuery = "";

    /**
     * @member {string} SingleObjectQueryJobsParameter.prototype.geometryQuery
     * @description 查询对象所在的几何对象。
     */
    this.geometryQuery = "";

    /**
     * @member {SpatialQueryMode} [SingleObjectQueryJobsParameter.prototype.mode=SpatialQueryMode.CONTAIN]
     * @description 空间查询模式。
     */
    this.mode = SpatialQueryMode.CONTAIN;

    /**
     * @member {OutputSetting} [SingleObjectQueryJobsParameter.prototype.output]
     * @description 输出参数设置类。
     */
    this.output = null;

    /**
     * @member {MappingParameters} [SingleObjectQueryJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */
    this.mappingParameters = null;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.SingleObjectQueryJobsParameter";
  }

  /**
   * @function SingleObjectQueryJobsParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  SingleObjectQueryJobsParameter_createClass(SingleObjectQueryJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.datasetQuery = null;
      this.geometryQuery = null;
      this.mode = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function SingleObjectQueryJobsParameter.toObject
     * @param {Object} singleObjectQueryJobsParameter - 单对象空间查询分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成单对象空间查询分析任务对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(singleObjectQueryJobsParameter, tempObj) {
      for (var name in singleObjectQueryJobsParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = singleObjectQueryJobsParameter[name];
          continue;
        }
        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = singleObjectQueryJobsParameter[name];
          continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = singleObjectQueryJobsParameter[name];
        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = singleObjectQueryJobsParameter[name];
        }
      }
    }
  }]);
  return SingleObjectQueryJobsParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/SummaryAttributesJobsParameter.js
function SummaryAttributesJobsParameter_typeof(o) { "@babel/helpers - typeof"; return SummaryAttributesJobsParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SummaryAttributesJobsParameter_typeof(o); }
function SummaryAttributesJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SummaryAttributesJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SummaryAttributesJobsParameter_toPropertyKey(descriptor.key), descriptor); } }
function SummaryAttributesJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryAttributesJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryAttributesJobsParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SummaryAttributesJobsParameter_toPropertyKey(t) { var i = SummaryAttributesJobsParameter_toPrimitive(t, "string"); return "symbol" == SummaryAttributesJobsParameter_typeof(i) ? i : String(i); }
function SummaryAttributesJobsParameter_toPrimitive(t, r) { if ("object" != SummaryAttributesJobsParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SummaryAttributesJobsParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SummaryAttributesJobsParameter
 * @deprecatedclass SuperMap.SummaryAttributesJobsParameter
 * @category  iServer ProcessingService SummaryAttributes
 * @classdesc 属性汇总分析任务参数类。此类用于设置属性汇总分析的数据集、分组字段、属性字段、统计模式等参数，还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.groupField - 分组字段。
 * @param {string} options.attributeField - 属性字段。
 * @param {StatisticAnalystMode} options.statisticModes - 属性汇总统计模式。可设置多个字段，使用逗号“，”分离。该长度必须和属性字段保持一致。
 * @param {OutputSetting} [options.output] -输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var SummaryAttributesJobsParameter = /*#__PURE__*/function () {
  function SummaryAttributesJobsParameter(options) {
    SummaryAttributesJobsParameter_classCallCheck(this, SummaryAttributesJobsParameter);
    if (!options) {
      return;
    }
    /**
     * @member {string} SummaryAttributesJobsParameter.prototype.datasetName
     * @description 汇总数据集名称。
     */
    this.datasetName = "";
    /**
     * @member {string} SummaryAttributesJobsParameter.prototype.groupField
     * @description 分组字段。根据属性字段里的属性值进行分组，相同属性值的对象分为一组，
     * 将分好的组根据属性字段进行统计。可设置多个字段，使用逗号“，”分离。若不设置该参数，
     * 将对所有对象进行属性统计。仅支持系统字段以外的字段。
     */
    this.groupField = "";
    /**
     * @member {string} SummaryAttributesJobsParameter.prototype.attributeField
     * @description 属性字段。将分组后的对象根据该字段进行统计。可设置多个字段，使用逗号“，”分离。
     * 若不设置该参数，不进行任何统计。若分组字段为空，则把属性表中所有对象视为一组，进行属性字段统计。
     * 该长度必须和统计模式保持一致。仅支持系统字段以外的数值型的字段。
     */
    this.attributeField = "";
    /**
     * @member {StatisticAnalystMode} SummaryAttributesJobsParameter.prototype.statisticModes
     * @description 属性汇总统计模式。可设置多个字段，使用逗号“，”分离。该长度必须和属性字段保持一致。
     */
    this.statisticModes = "";
    /**
     * @member {OutputSetting} SummaryAttributesJobsParameter.prototype.output
     * @description 输出参数设置类。
     */
    this.output = null;
    /**
     * @member {MappingParameters} [SummaryAttributesJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */
    this.mappingParameters = null;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.SummaryAttributesJobsParameter";
  }

  /**
   * @function SummaryAttributesJobsParameter.prototype.destroy
   * @description 释放资源，将资源的属性置空。
   */
  SummaryAttributesJobsParameter_createClass(SummaryAttributesJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.groupField = null;
      this.attributeField = null;
      this.statisticModes = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function SummaryAttributesJobsParameter.toObject
     * @param {Object} SummaryAttributesJobsParameter - 属性汇总任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成属性汇总分析任务对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(_SummaryAttributesJobsParameter, tempObj) {
      for (var name in _SummaryAttributesJobsParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = _SummaryAttributesJobsParameter[name];
          continue;
        }
        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = _SummaryAttributesJobsParameter[name];
          continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = _SummaryAttributesJobsParameter[name];
        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = _SummaryAttributesJobsParameter[name];
        }
      }
    }
  }]);
  return SummaryAttributesJobsParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/SummaryMeshJobParameter.js
function SummaryMeshJobParameter_typeof(o) { "@babel/helpers - typeof"; return SummaryMeshJobParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SummaryMeshJobParameter_typeof(o); }
function SummaryMeshJobParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SummaryMeshJobParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SummaryMeshJobParameter_toPropertyKey(descriptor.key), descriptor); } }
function SummaryMeshJobParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryMeshJobParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryMeshJobParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SummaryMeshJobParameter_toPropertyKey(t) { var i = SummaryMeshJobParameter_toPrimitive(t, "string"); return "symbol" == SummaryMeshJobParameter_typeof(i) ? i : String(i); }
function SummaryMeshJobParameter_toPrimitive(t, r) { if ("object" != SummaryMeshJobParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SummaryMeshJobParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SummaryMeshJobParameter
 * @deprecatedclass SuperMap.SummaryMeshJobParameter
 * @category  iServer ProcessingService AggregatePoints
 * @classdesc 点聚合分析任务参数类。此类用于设置点聚合分析的数据集、分析范围、权重索引、分析模式、分析类型、聚合类型等参数，
 * 还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} [options.regionDataset ] - 聚合面数据集（聚合类型为多边形聚合时使用的参数）。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} [options.query] - 聚合分析范围（默认为全图范围）。
 * @param {number} options.fields - 权重索引。选填。仅支持系统字段以外的整形、长整形、浮点型的字段。
 * @param {number} [options.resolution=100] - 分辨率。
 * @param {StatisticAnalystMode} [options.statisticModes=StatisticAnalystMode.AVERAGE] - 统计模式，“统计模式”个数应与“权重值字段”个数一致。
 * @param {number} [options.meshType=0] - 聚合分析类型（聚合类型为网格面聚合时使用的参数）。0 表示四边形网格，1 表示六边形网格。
 * @param {SummaryType} [options.type=SummaryType.SUMMARYMESH] - 聚合类型。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var SummaryMeshJobParameter = /*#__PURE__*/function () {
  function SummaryMeshJobParameter(options) {
    SummaryMeshJobParameter_classCallCheck(this, SummaryMeshJobParameter);
    if (!options) {
      return;
    }
    /**
     * @member {string} SummaryMeshJobParameter.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = "";

    /**
     * @member {string} SummaryMeshJobParameter.prototype.regionDataset
     * @description 聚合面数据集（聚合类型为多边形聚合时使用的参数）。
     */
    this.regionDataset = "";

    /**
     * @member {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} SummaryMeshJobParameter.prototype.query
     * @description 聚合分析范围（聚合类型为网格面聚合时使用的参数）。
     */
    this.query = "";

    /**
     * @member {number} [SummaryMeshJobParameter.prototype.resolution=100]
     * @description 分辨率（聚合类型为网格面聚合时使用的参数）。
     */
    this.resolution = 100;

    /**
     * @member {number} [SummaryMeshJobParameter.prototype.meshType=0]
     * @description  网格面类型（聚合类型为网格面聚合时使用的参数），取值：0 或 1，0 表示四边形网格，1 表示六边形网格。
     */
    this.meshType = 0;

    /**
     * @member {StatisticAnalystMode} [SummaryMeshJobParameter.prototype.statisticModes=StatisticAnalystMode.AVERAGE]
     * @description 统计模式。“统计模式”个数应与“权重值字段”个数一致。
     */
    this.statisticModes = StatisticAnalystMode.AVERAGE;

    /**
     * @member {number} SummaryMeshJobParameter.prototype.fields
     * @description 权重字段。
     */
    this.fields = "";

    /**
     * @member {SummaryType} [SummaryMeshJobParameter.prototype.type=SummaryType.SUMMARYMESH]
     * @description 点聚合分析类型。
     */
    this.type = SummaryType.SUMMARYMESH;

    /**
     * @member {OutputSetting} [SummaryMeshJobParameter.prototype.output]
     * @description 输出参数设置类。
     */
    this.output = null;

    /**
     * @member {MappingParameters} [SummaryMeshJobParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */
    this.mappingParameters = null;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.SummaryMeshJobParameter";
  }

  /**
   * @function SummaryMeshJobParameter.prototype.destroy
   * @description 释放资源，将资源的属性置空。
   */
  SummaryMeshJobParameter_createClass(SummaryMeshJobParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.query = null;
      this.resolution = null;
      this.statisticModes = null;
      this.meshType = null;
      this.fields = null;
      this.regionDataset = null;
      this.type = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function SummaryMeshJobParameter.toObject
     * @param {Object} summaryMeshJobParameter - 点聚合分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成点聚合分析任务对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(summaryMeshJobParameter, tempObj) {
      for (var name in summaryMeshJobParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = summaryMeshJobParameter[name];
          continue;
        }
        if (name === "type") {
          tempObj['type'] = summaryMeshJobParameter[name];
          continue;
        }
        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = summaryMeshJobParameter[name];
          continue;
        }
        if (summaryMeshJobParameter.type === 'SUMMARYMESH' && name !== 'regionDataset' || summaryMeshJobParameter.type === 'SUMMARYREGION' && !contains(['meshType', 'resolution', 'query'], name)) {
          tempObj['analyst'] = tempObj['analyst'] || {};
          if (name === 'query' && summaryMeshJobParameter[name]) {
            tempObj['analyst'][name] = summaryMeshJobParameter[name].toBBOX();
          } else {
            tempObj['analyst'][name] = summaryMeshJobParameter[name];
          }
          if (name === 'mappingParameters') {
            tempObj['analyst'][name] = tempObj['analyst'][name] || {};
            tempObj['analyst']['mappingParameters'] = summaryMeshJobParameter[name];
          }
        }
      }
      function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      }
    }
  }]);
  return SummaryMeshJobParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/SummaryRegionJobParameter.js
function SummaryRegionJobParameter_typeof(o) { "@babel/helpers - typeof"; return SummaryRegionJobParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SummaryRegionJobParameter_typeof(o); }
function SummaryRegionJobParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SummaryRegionJobParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SummaryRegionJobParameter_toPropertyKey(descriptor.key), descriptor); } }
function SummaryRegionJobParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryRegionJobParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryRegionJobParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SummaryRegionJobParameter_toPropertyKey(t) { var i = SummaryRegionJobParameter_toPrimitive(t, "string"); return "symbol" == SummaryRegionJobParameter_typeof(i) ? i : String(i); }
function SummaryRegionJobParameter_toPrimitive(t, r) { if ("object" != SummaryRegionJobParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SummaryRegionJobParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SummaryRegionJobParameter
 * @deprecatedclass SuperMap.SummaryRegionJobParameter
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析任务参数类。此类用于设置区域汇总分析的数据集、分析范围、标准属性字段、
 * 权重字段、统计方式、汇总类型、网格类型和大小等参数，还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} [options.regionDataset] - 汇总数据集（多边形汇总时用到的参数）。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} [options.query] - 缓冲区分析范围（默认为全图范围）。
 * @param {string} [options.standardFields] - 标准属性字段名称。
 * @param {string} [options.weightedFields] - 权重字段名称。
 * @param {StatisticAnalystMode} [options.standardStatisticModes] - 标准属性字段的统计模式。standardSummaryFields 为 true 时必填。
 * @param {StatisticAnalystMode} [options.weightedStatisticModes] - 权重字段的统计模式。weightedSummaryFields 为 true 时必填。
 * @param {boolean} [options.sumShape=true] - 是否统计长度或面积。
 * @param {boolean} [options.standardSummaryFields=false] - 是否以标准属性字段统计。
 * @param {boolean} [options.weightedSummaryFields=false] - 是否以权重字段统计。
 * @param {number} [options.resolution=100] - 网格大小。
 * @param {number} [options.meshType=0] - 网格面汇总类型。0 表示四边形网格，1 表示六边形网格。
 * @param {AnalystSizeUnit} [options.meshSizeUnit=AnalystSizeUnit.METER] - 网格大小单位。
 * @param {SummaryType} [options.type=SummaryType.SUMMARYMESH] - 汇总类型。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var SummaryRegionJobParameter = /*#__PURE__*/function () {
  function SummaryRegionJobParameter(options) {
    SummaryRegionJobParameter_classCallCheck(this, SummaryRegionJobParameter);
    if (!options) {
      return;
    }

    /**
     * @member {string} SummaryRegionJobParameter.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = "";

    /**
     * @member {string} SummaryRegionJobParameter.prototype.regionDataset
     * @description 汇总数据集（多边形汇总时用到的参数）。
     */
    this.regionDataset = "";

    /**
     * @member {boolean} [SummaryRegionJobParameter.prototype.sumShape=true]
     * @description 是否统计被汇总对象的面积或者长度。
     */
    this.sumShape = true;

    /**
     * @member {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} SummaryRegionJobParameter.prototype.query
     * @description 分析范围。
     */
    this.query = "";

    /**
     * @member {boolean} [SummaryRegionJobParameter.prototype.standardSummaryFields=false]
     * @description 是否以标准属性字段统计。
     */
    this.standardSummaryFields = false;

    /**
     * @member {string} SummaryRegionJobParameter.prototype.standardFields
     * @description 标准属性字段名称。仅支持系统字段以外的整形、长整形、浮点型的字段的名称。standardSummaryFields 为 true 时必填。
     */
    this.standardFields = "";

    /**
     * @member {StatisticAnalystMode} SummaryRegionJobParameter.prototype.standardStatisticModes
     * @description 标准属性字段的统计模式。standardSummaryFields 为 true 时必填。
     */
    this.standardStatisticModes = "";

    /**
     * @member {boolean} [SummaryRegionJobParameter.prototype.weightedSummaryFields=false]
     * @description 是否以权重字段统计。
     */
    this.weightedSummaryFields = false;

    /**
     * @member {string} SummaryRegionJobParameter.prototype.weightedFields
     * @description 权重字段名称。仅支持系统字段以外的整形、长整形、浮点型的字段的名称。weightedSummaryFields 为 true 时必填。
     */
    this.weightedFields = "";

    /**
     * @member {StatisticAnalystMode} SummaryRegionJobParameter.prototype.weightedStatisticModes
     * @description 以权重字段统计的统计模式。权重字段的统计模式。weightedSummaryFields 为 true 时必填。
     */
    this.weightedStatisticModes = "";

    /**
     * @member {number} [SummaryRegionJobParameter.prototype.meshType=0]
     * @description 网格面汇总类型。0 表示四边形网格，1 表示六边形网格。
     */
    this.meshType = 0;

    /**
     * @member {number} [SummaryRegionJobParameter.prototype.resolution=100]
     * @description 网格大小。
     */
    this.resolution = 100;

    /**
     * @member {AnalystSizeUnit} [SummaryRegionJobParameter.prototype.meshSizeUnit=AnalystSizeUnit.METER]
     * @description 网格大小单位。
     */
    this.meshSizeUnit = AnalystSizeUnit.METER;

    /**
     * @member {SummaryType} [SummaryRegionJobParameter.prototype.type=SummaryType.SUMMARYMESH]
     * @description 汇总类型。
     */
    this.type = SummaryType.SUMMARYMESH;

    /**
     * @member {OutputSetting} SummaryRegionJobParameter.prototype.output
     * @description 输出参数设置类。
     */
    this.output = null;

    /**
     * @member {MappingParameters} [SummaryRegionJobParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */
    this.mappingParameters = null;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.SummaryRegionJobParameter";
  }

  /**
   * @function SummaryRegionJobParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  SummaryRegionJobParameter_createClass(SummaryRegionJobParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.sumShape = null;
      this.regionDataset = null;
      this.query = null;
      this.standardSummaryFields = null;
      this.standardFields = null;
      this.standardStatisticModes = null;
      this.weightedSummaryFields = null;
      this.weightedFields = null;
      this.weightedStatisticModes = null;
      this.meshType = null;
      this.resolution = null;
      this.meshSizeUnit = null;
      this.type = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function SummaryRegionJobParameter.toObject
     * @param {Object} summaryRegionJobParameter - 区域汇总分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成区域汇总分析服务对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(summaryRegionJobParameter, tempObj) {
      for (var name in summaryRegionJobParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = summaryRegionJobParameter[name];
          continue;
        }
        if (name === "type") {
          tempObj['type'] = summaryRegionJobParameter[name];
          continue;
        }
        if (name === "type") {
          tempObj['type'] = summaryRegionJobParameter[name];
          continue;
        }
        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = summaryRegionJobParameter[name];
          continue;
        }
        if (summaryRegionJobParameter.type === "SUMMARYREGION" || summaryRegionJobParameter.type === "SUMMARYMESH" && name !== "regionDataset") {
          tempObj['analyst'] = tempObj['analyst'] || {};
          if (name === 'query' && summaryRegionJobParameter[name]) {
            tempObj['analyst'][name] = summaryRegionJobParameter[name].toBBOX();
          } else {
            tempObj['analyst'][name] = summaryRegionJobParameter[name];
          }
          if (name === 'mappingParameters') {
            tempObj['analyst'][name] = tempObj['analyst'][name] || {};
            tempObj['analyst']['mappingParameters'] = summaryRegionJobParameter[name];
          }
        }
      }
    }
  }]);
  return SummaryRegionJobParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/OverlayGeoJobParameter.js
function OverlayGeoJobParameter_typeof(o) { "@babel/helpers - typeof"; return OverlayGeoJobParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, OverlayGeoJobParameter_typeof(o); }
function OverlayGeoJobParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function OverlayGeoJobParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, OverlayGeoJobParameter_toPropertyKey(descriptor.key), descriptor); } }
function OverlayGeoJobParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) OverlayGeoJobParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) OverlayGeoJobParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function OverlayGeoJobParameter_toPropertyKey(t) { var i = OverlayGeoJobParameter_toPrimitive(t, "string"); return "symbol" == OverlayGeoJobParameter_typeof(i) ? i : String(i); }
function OverlayGeoJobParameter_toPrimitive(t, r) { if ("object" != OverlayGeoJobParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != OverlayGeoJobParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class OverlayGeoJobParameter
 * @deprecatedclass SuperMap.OverlayGeoJobParameter
 * @category iServer ProcessingService OverlayAnalyst
 * @classdesc 叠加分析任务参数类。此类用于设置叠加分析的数据集、分析模式、保留字段等参数，还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.datasetOverlay - 叠加对象所在的数据集名称。
 * @param {string} options.srcFields - 输入数据需要保留的字段。
 * @param {string} [options.overlayFields] - 叠加数据需要保留的字段。当分析模式为 clip、update、erase 时，此参数无效。
 * @param {OverlayOperationType} [options.mode] - 叠加分析模式。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var OverlayGeoJobParameter = /*#__PURE__*/function () {
  function OverlayGeoJobParameter(options) {
    OverlayGeoJobParameter_classCallCheck(this, OverlayGeoJobParameter);
    if (!options) {
      return;
    }
    /**
     * @member {string} OverlayGeoJobParameter.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = "";

    /**
     * @member {string} OverlayGeoJobParameter.prototype.datasetOverlay
     * @description 叠加对象所在的数据集名称。
     */
    this.datasetOverlay = "";

    /**
     * @member {string} [OverlayGeoJobParameter.prototype.mode]
     * @description 叠加分析模式。
     */
    this.mode = "";

    /**
     * @member {string} OverlayGeoJobParameter.prototype.srcFields
     * @description 输入数据需要保留的字段。
     */
    this.srcFields = "";

    /**
     * @member {string} OverlayGeoJobParameter.prototype.overlayFields
     * @description 叠加数据需要保留的字段，当分析模式为 clip、update、erase 时，此参数无效。
     */
    this.overlayFields = "";

    /**
     * @member {OutputSetting} [OverlayGeoJobParameter.prototype.output]
     * @description 输出参数设置类。
     */
    this.output = null;

    /**
    * @member {MappingParameters} [OverlayGeoJobParameter.prototype.mappingParameters]
    * @description 分析后结果可视化的参数类。
    */
    this.mappingParameters = null;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.OverlayGeoJobParameter";
  }

  /**
   * @function OverlayGeoJobParameter.prototype.destroy
   * @description 释放资源，将资源的属性置空。
   */
  OverlayGeoJobParameter_createClass(OverlayGeoJobParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.datasetOverlay = null;
      this.mode = null;
      this.srcFields = null;
      this.overlayFields = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function OverlayGeoJobParameter.toObject
     * @param {Object} OverlayGeoJobParameter - 点聚合分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成点聚合分析任务对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(_OverlayGeoJobParameter, tempObj) {
      for (var name in _OverlayGeoJobParameter) {
        if (name == "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = _OverlayGeoJobParameter[name];
          continue;
        }
        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = _OverlayGeoJobParameter[name];
          continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = _OverlayGeoJobParameter[name];
        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = _OverlayGeoJobParameter[name];
        }
      }
    }
  }]);
  return OverlayGeoJobParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/BuffersAnalystJobsParameter.js
function BuffersAnalystJobsParameter_typeof(o) { "@babel/helpers - typeof"; return BuffersAnalystJobsParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, BuffersAnalystJobsParameter_typeof(o); }
function BuffersAnalystJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function BuffersAnalystJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, BuffersAnalystJobsParameter_toPropertyKey(descriptor.key), descriptor); } }
function BuffersAnalystJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) BuffersAnalystJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) BuffersAnalystJobsParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function BuffersAnalystJobsParameter_toPropertyKey(t) { var i = BuffersAnalystJobsParameter_toPrimitive(t, "string"); return "symbol" == BuffersAnalystJobsParameter_typeof(i) ? i : String(i); }
function BuffersAnalystJobsParameter_toPrimitive(t, r) { if ("object" != BuffersAnalystJobsParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != BuffersAnalystJobsParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class BuffersAnalystJobsParameter
 * @deprecatedclass SuperMap.BuffersAnalystJobsParameter
 * @category iServer ProcessingService BufferAnalyst
 * @classdesc 缓冲区分析任务参数类。此类用于设置缓冲区分析的数据集、分析范围、缓冲字段、缓冲距离、距离单位等参数，
 * 还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} [options.bounds] - 缓冲区分析范围（默认为全图范围）。
 * @param {string} [options.distance='15'] - 缓冲距离，或缓冲区半径。
 * @param {string} [options.distanceField='pickup_latitude'] - 缓冲区分析距离字段。
 * @param {AnalystSizeUnit} [options.distanceUnit=AnalystSizeUnit.METER] - 缓冲距离单位。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var BuffersAnalystJobsParameter = /*#__PURE__*/function () {
  function BuffersAnalystJobsParameter(options) {
    BuffersAnalystJobsParameter_classCallCheck(this, BuffersAnalystJobsParameter);
    /**
     * @member {string} BuffersAnalystJobsParameter.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = '';

    /**
     * @member {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} BuffersAnalystJobsParameter.prototype.bounds
     * @description 分析范围。
     */
    this.bounds = '';

    /**
     * @member {string} [BuffersAnalystJobsParameter.prototype.distance='15']
     * @description 缓冲距离，或称为缓冲区半径。当缓冲距离字段为空时，此参数有效。
     */
    this.distance = '';

    /**
     * @member {string} [BuffersAnalystJobsParameter.prototype.distanceField='pickup_latitude']
     * @description 缓冲距离字段。启用此参数时，将使用每个对象中该字段对应的值作为缓冲距离，此时 distance 无效。仅支持系统字段以外的数值型的字段。
     */
    this.distanceField = '';

    /**
     * @member {AnalystSizeUnit} [BuffersAnalystJobsParameter.prototype.distanceUnit=AnalystSizeUnit.METER]
     * @description 缓冲距离单位。
     */
    this.distanceUnit = AnalystSizeUnit.METER;

    /**
     * @member {string} BuffersAnalystJobsParameter.prototype.dissolveField
     * @description 融合字段，根据字段值对缓冲区结果面对象进行融合。
     */
    this.dissolveField = '';

    /**
     * @member {OutputSetting} [BuffersAnalystJobsParameter.prototype.output]
     * @description 输出参数设置类。
     */
    this.output = null;

    /**
     * @member {MappingParameters} [BuffersAnalystJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */
    this.mappingParameters = null;
    if (!options) {
      return this;
    }
    Util_Util.extend(this, options);
    this.CLASS_NAME = 'SuperMap.BuffersAnalystJobsParameter';
  }

  /**
   * @function BuffersAnalystJobsParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  BuffersAnalystJobsParameter_createClass(BuffersAnalystJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.bounds = null;
      this.distance = null;
      this.distanceField = null;
      this.distanceUnit = null;
      this.dissolveField = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function BuffersAnalystJobsParameter.toObject
     * @param {BuffersAnalystJobsParameter} BuffersAnalystJobsParameter - 缓冲区分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成缓冲区分析任务对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(_BuffersAnalystJobsParameter, tempObj) {
      for (var name in _BuffersAnalystJobsParameter) {
        if (name === 'datasetName') {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = _BuffersAnalystJobsParameter[name];
          continue;
        }
        if (name === 'output') {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = _BuffersAnalystJobsParameter[name];
          continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        if (name === 'bounds' && _BuffersAnalystJobsParameter[name]) {
          tempObj['analyst'][name] = _BuffersAnalystJobsParameter[name].toBBOX();
        } else {
          tempObj['analyst'][name] = _BuffersAnalystJobsParameter[name];
        }
        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = _BuffersAnalystJobsParameter[name];
        }
      }
    }
  }]);
  return BuffersAnalystJobsParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/TopologyValidatorJobsParameter.js
function TopologyValidatorJobsParameter_typeof(o) { "@babel/helpers - typeof"; return TopologyValidatorJobsParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, TopologyValidatorJobsParameter_typeof(o); }
function TopologyValidatorJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function TopologyValidatorJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, TopologyValidatorJobsParameter_toPropertyKey(descriptor.key), descriptor); } }
function TopologyValidatorJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) TopologyValidatorJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) TopologyValidatorJobsParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function TopologyValidatorJobsParameter_toPropertyKey(t) { var i = TopologyValidatorJobsParameter_toPrimitive(t, "string"); return "symbol" == TopologyValidatorJobsParameter_typeof(i) ? i : String(i); }
function TopologyValidatorJobsParameter_toPrimitive(t, r) { if ("object" != TopologyValidatorJobsParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != TopologyValidatorJobsParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class TopologyValidatorJobsParameter
 * @deprecatedclass SuperMap.TopologyValidatorJobsParameter
 * @category  iServer ProcessingService TopologyValidator
 * @classdesc 拓扑检查分析任务参数类。此类用于设置拓扑检查分析的数据集、拓扑检查规则、容限等参数，还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.datasetTopology -检查对象所在的数据集名称。
 * @param {TopologyValidatorRule} [options.rule=TopologyValidatorRule.REGIONNOOVERLAP] - 拓扑检查规则。
 * @param {string} [options.tolerance] - 容限。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var TopologyValidatorJobsParameter = /*#__PURE__*/function () {
  function TopologyValidatorJobsParameter(options) {
    TopologyValidatorJobsParameter_classCallCheck(this, TopologyValidatorJobsParameter);
    if (!options) {
      return;
    }
    /**
     * @member {string} TopologyValidatorJobsParameter.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = "";

    /**
     * @member {string} TopologyValidatorJobsParameter.prototype.datasetTopology
     * @description 拓扑检查对象所在的数据集名称。
     */
    this.datasetTopology = "";

    /**
     * @member {string} [TopologyValidatorJobsParameter.prototype.tolerance]
     * @description 容限，指定的拓扑错误检查时使用的容限。单位与进行拓扑错误检查的数据集单位相同。取值范围为大于等于 0，小于 0 将抛出异常。（默认值：0.000001）
     */
    this.tolerance = "";

    /**
     * @member {TopologyValidatorRule} [TopologyValidatorJobsParameter.prototype.rule=TopologyValidatorRule.REGIONNOOVERLAP]
     * @description 拓扑检查规则。
     */
    this.rule = TopologyValidatorRule.REGIONNOOVERLAP;

    /**
     * @member {OutputSetting} [TopologyValidatorJobsParameter.prototype.output]
     * @description 输出参数设置类。
     */
    this.output = null;

    /**
     * @member {MappingParameters} [TopologyValidatorJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */
    this.mappingParameters = null;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.TopologyValidatorJobsParameter";
  }

  /**
   * @function TopologyValidatorJobsParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  TopologyValidatorJobsParameter_createClass(TopologyValidatorJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.datasetTopology = null;
      this.tolerance = null;
      this.rule = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function TopologyValidatorJobsParameter.toObject
     * @param {Object} TopologyValidatorJobsParameter -拓扑检查分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成拓扑检查分析任务对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(_TopologyValidatorJobsParameter, tempObj) {
      for (var name in _TopologyValidatorJobsParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = _TopologyValidatorJobsParameter[name];
          continue;
        }
        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = _TopologyValidatorJobsParameter[name];
          continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = _TopologyValidatorJobsParameter[name];
        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = _TopologyValidatorJobsParameter[name];
        }
      }
    }
  }]);
  return TopologyValidatorJobsParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/GeoCodingParameter.js
function GeoCodingParameter_typeof(o) { "@babel/helpers - typeof"; return GeoCodingParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, GeoCodingParameter_typeof(o); }
function GeoCodingParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function GeoCodingParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, GeoCodingParameter_toPropertyKey(descriptor.key), descriptor); } }
function GeoCodingParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) GeoCodingParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) GeoCodingParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function GeoCodingParameter_toPropertyKey(t) { var i = GeoCodingParameter_toPrimitive(t, "string"); return "symbol" == GeoCodingParameter_typeof(i) ? i : String(i); }
function GeoCodingParameter_toPrimitive(t, r) { if ("object" != GeoCodingParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != GeoCodingParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class GeoCodingParameter
 * @deprecatedclass SuperMap.GeoCodingParameter
 * @category  iServer AddressMatch
 * @classdesc 地理正向匹配参数类。地理正向匹配是指通过地址关键词查询相关地点。
 * 此类用于设置地理正向匹配中的地点关键词、过滤字段等参数，还可以对返回结果进行一系列参数设置。
 * @param {Object} options - 参数。
 * @param {string} options.address - 地点关键词。
 * @param {number} [options.fromIndex] - 设置返回对象的起始索引值。
 * @param {number} [options.toIndex] - 设置返回对象的结束索引值。
 * @param {Array.<string>} [options.filters] - 过滤字段，限定查询区域。
 * @param {string} [options.prjCoordSys] - 查询结果的坐标系。
 * @param {number} [options.maxReturn] - 最大返回结果数。
 * @usage
 */
var GeoCodingParameter = /*#__PURE__*/function () {
  function GeoCodingParameter(options) {
    GeoCodingParameter_classCallCheck(this, GeoCodingParameter);
    if (options.filters && typeof options.filters === 'string') {
      options.filters = options.filters.split(',');
    }
    /**
     * @member {string} GeoCodingParameter.prototype.address
     * @description 地点关键词。
     */
    this.address = null;

    /**
     * @member {number} [GeoCodingParameter.prototype.fromIndex]
     * @description 设置返回对象的起始索引值。
     */
    this.fromIndex = null;

    /**
     * @member {number} [GeoCodingParameter.prototype.toIndex]
     * @description 设置返回对象的结束索引值。
     */
    this.toIndex = null;

    /**
     * @member {Array.<string>} [GeoCodingParameter.prototype.filters]
     * @description 过滤字段，限定查询区域。
     */
    this.filters = null;

    /**
     * @member {string} [GeoCodingParameter.prototype.prjCoordSys]
     * @description  查询结果的坐标系。
     */
    this.prjCoordSys = null;

    /**
     * @member {number} [GeoCodingParameter.prototype.maxReturn]
     * @description 最大返回结果数。
     */
    this.maxReturn = null;
    Util_Util.extend(this, options);
  }

  /**
   * @function GeoCodingParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  GeoCodingParameter_createClass(GeoCodingParameter, [{
    key: "destroy",
    value: function destroy() {
      this.address = null;
      this.fromIndex = null;
      this.toIndex = null;
      this.filters = null;
      this.prjCoordSys = null;
      this.maxReturn = null;
    }
  }]);
  return GeoCodingParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/GeoDecodingParameter.js
function GeoDecodingParameter_typeof(o) { "@babel/helpers - typeof"; return GeoDecodingParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, GeoDecodingParameter_typeof(o); }
function GeoDecodingParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function GeoDecodingParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, GeoDecodingParameter_toPropertyKey(descriptor.key), descriptor); } }
function GeoDecodingParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) GeoDecodingParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) GeoDecodingParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function GeoDecodingParameter_toPropertyKey(t) { var i = GeoDecodingParameter_toPrimitive(t, "string"); return "symbol" == GeoDecodingParameter_typeof(i) ? i : String(i); }
function GeoDecodingParameter_toPrimitive(t, r) { if ("object" != GeoDecodingParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != GeoDecodingParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class GeoDecodingParameter
 * @deprecatedclass SuperMap.GeoDecodingParameter
 * @category iServer AddressMatch
 * @classdesc 地理反向匹配参数类。地理反向匹配是指通过位置坐标信息查询相关地点。
 * 此类用于设置地理反向匹配中的查询位置坐标、过滤字段、查询半径等参数，还可以对返回结果进行一系列参数设置。
 * @param {Object} options - 参数。
 * @param {number} options.x - 查询位置的横坐标。
 * @param {number} options.y - 查询位置的纵坐标。
 * @param {number} [options.fromIndex] - 设置返回对象的起始索引值。
 * @param {number} [options.toIndex] - 设置返回对象的结束索引值。
 * @param {Array.<string>} [options.filters] - 过滤字段，限定查询区域。
 * @param {string} [options.prjCoordSys] - 查询结果的坐标系。
 * @param {number} [options.maxReturn] - 最大返回结果数。
 * @param {number} [options.geoDecodingRadius] - 查询半径。
 * @usage
 */
var GeoDecodingParameter = /*#__PURE__*/function () {
  function GeoDecodingParameter(options) {
    GeoDecodingParameter_classCallCheck(this, GeoDecodingParameter);
    if (options.filters) {
      options.filters = options.filters.split(',');
    }
    /**
     * @member {number} GeoDecodingParameter.prototype.x
     * @description 查询位置的横坐标。
     */
    this.x = null;

    /**
     * @member {number} GeoDecodingParameter.prototype.y
     * @description 查询位置的纵坐标。
     */
    this.y = null;
    /**
     * @member {number} [GeoDecodingParameter.prototype.fromIndex]
     * @description  设置返回对象的起始索引值。
     */
    this.fromIndex = null;

    /**
     * @member {number} [GeoDecodingParameter.prototype.toIndex]
     * @description 设置返回对象的结束索引值。
     */
    this.toIndex = null;

    /**
     * @member {Array.<string>} [GeoDecodingParameter.prototype.filters]
     * @description 过滤字段，限定查询区域。
     */
    this.filters = null;

    /**
     * @member {string} [GeoDecodingParameter.prototype.prjCoordSys]
     * @description 查询结果的坐标系。
     */
    this.prjCoordSys = null;

    /**
     *  @member {number} [GeoDecodingParameter.prototype.maxReturn]
     *  @description 最大返回结果数。
     */
    this.maxReturn = null;

    /**
     * @member {number} GeoDecodingParameter.prototype.geoDecodingRadius
     * @description 查询半径。
     */
    this.geoDecodingRadius = null;
    Util_Util.extend(this, options);
  }

  /**
   * @function GeoDecodingParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  GeoDecodingParameter_createClass(GeoDecodingParameter, [{
    key: "destroy",
    value: function destroy() {
      this.x = null;
      this.y = null;
      this.fromIndex = null;
      this.toIndex = null;
      this.filters = null;
      this.prjCoordSys = null;
      this.maxReturn = null;
      this.geoDecodingRadius = null;
    }
  }]);
  return GeoDecodingParameter;
}();
;// CONCATENATED MODULE: ./src/common/iServer/VectorClipJobsParameter.js
function VectorClipJobsParameter_typeof(o) { "@babel/helpers - typeof"; return VectorClipJobsParameter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, VectorClipJobsParameter_typeof(o); }
function VectorClipJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function VectorClipJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, VectorClipJobsParameter_toPropertyKey(descriptor.key), descriptor); } }
function VectorClipJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) VectorClipJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) VectorClipJobsParameter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function VectorClipJobsParameter_toPropertyKey(t) { var i = VectorClipJobsParameter_toPrimitive(t, "string"); return "symbol" == VectorClipJobsParameter_typeof(i) ? i : String(i); }
function VectorClipJobsParameter_toPrimitive(t, r) { if ("object" != VectorClipJobsParameter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != VectorClipJobsParameter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class VectorClipJobsParameter
 * @deprecatedclass SuperMap.VectorClipJobsParameter
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析任务参数类。此类用于设置矢量裁剪分析的数据集、裁剪分析模式、裁剪几何对象等参数，
 * 还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.datasetVectorClip - 裁剪对象数据集。
 * @param {ClipAnalystMode} [options.mode=ClipAnalystMode.CLIP] - 裁剪分析模式。
 * @param {string} [options.geometryClip] - 裁剪几何对象。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
var VectorClipJobsParameter = /*#__PURE__*/function () {
  function VectorClipJobsParameter(options) {
    VectorClipJobsParameter_classCallCheck(this, VectorClipJobsParameter);
    options = options || {};

    /**
     * @member {string} VectorClipJobsParameter.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = "";

    /**
     * @member {string} VectorClipJobsParameter.prototype.datasetVectorClip
     * @description 裁剪对象数据集。
     */
    this.datasetVectorClip = "";

    /**
     * @member {string} VectorClipJobsParameter.prototype.geometryClip
     * @description 裁剪几何对象。
     */
    this.geometryClip = "";

    /**
     * @member {ClipAnalystMode} [VectorClipJobsParameter.prototype.mode=ClipAnalystMode.CLIP]
     * @description 裁剪分析模式。
     */
    this.mode = ClipAnalystMode.CLIP;

    /**
     * @member {OutputSetting} VectorClipJobsParameter.prototype.output
     * @description 输出参数设置类。
     */
    this.output = null;

    /**
     * @member {MappingParameters} [VectorClipJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */
    this.mappingParameters = null;
    Util_Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.VectorClipJobsParameter";
  }

  /**
   * @function VectorClipJobsParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  VectorClipJobsParameter_createClass(VectorClipJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.datasetVectorClip = null;
      this.geometryClip = null;
      this.mode = null;
      if (this.output instanceof OutputSetting) {
        this.output.destroy();
        this.output = null;
      }
      if (this.mappingParameters instanceof MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }

    /**
     * @function VectorClipJobsParameter.toObject
     * @param {Object} vectorClipJobsParameter - 矢量裁剪分析服务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 矢量裁剪分析任务对象。
     */
  }], [{
    key: "toObject",
    value: function toObject(vectorClipJobsParameter, tempObj) {
      for (var name in vectorClipJobsParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = vectorClipJobsParameter[name];
          continue;
        }
        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = vectorClipJobsParameter[name];
          continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = vectorClipJobsParameter[name];
        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = vectorClipJobsParameter[name];
        }
      }
    }
  }]);
  return VectorClipJobsParameter;
}();
;// CONCATENATED MODULE: ./src/classic/SuperMap.js
var SuperMap = window.SuperMap = window.SuperMap || {};
SuperMap.REST = SuperMap.REST || {};

;// CONCATENATED MODULE: external "function(){try{return mapv}catch(e){return {}}}()"
var external_function_try_return_mapv_catch_e_return_namespaceObject = function(){try{return mapv}catch(e){return {}}}();
;// CONCATENATED MODULE: ./src/common/util/MapCalculateUtil.js


/**
 * @function getMeterPerMapUnit
 * @description 单位换算，把米|度|千米|英寸|英尺换算成米。
 * @category BaseTypes Util
 * @param {string} mapUnit 需要换算的地图单位。
 * @returns {number} 返回地图的距离单位。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.getMeterPerMapUnit(mapUnit);
 *
 * </script>
 *
 * // ES6 Import
 * import { getMeterPerMapUnit } from '{npm}';
 *
 * const result = getMeterPerMapUnit(mapUnit);
 * ```
 */
var getMeterPerMapUnit = function getMeterPerMapUnit(mapUnit) {
  var meterPerMapUnit;
  if (!mapUnit) {
    return meterPerMapUnit;
  }
  var earchRadiusInMeters = 6378137;
  if (['m', 'meter', 'meters'].indexOf(mapUnit.toLocaleLowerCase()) > -1) {
    meterPerMapUnit = 1;
  } else if (['degrees', 'deg', 'degree', 'dd'].indexOf(mapUnit.toLocaleLowerCase()) > -1) {
    // 每度表示多少米。
    meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
  } else if (mapUnit === Unit.KILOMETER) {
    meterPerMapUnit = 1.0e-3;
  } else if (mapUnit === Unit.INCH) {
    meterPerMapUnit = 1 / 2.5399999918e-2;
  } else if (mapUnit === Unit.FOOT) {
    meterPerMapUnit = 0.3048;
  }
  return meterPerMapUnit;
};

/**
 * @function getWrapNum
 * @description 获取该坐标系的经纬度范围的经度或纬度。
 * @category BaseTypes Util
 * @param {number} x 经度或纬度。
 * @param {boolean} includeMax 是否获取经度或纬度的最大值。
 * @param {boolean} includeMin 是否获取经度或纬度的最小值。
 * @param {number} range 坐标系的经纬度范围。
 * @returns {number} 返回经度或纬度的值。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.getWrapNum(x, includeMax, includeMin, range);
 *
 * </script>
 *
 * // ES6 Import
 * import { getWrapNum } from '{npm}';
 *
 * const result = getWrapNum(x, includeMax, includeMin, range);
 * ```
 */
function getWrapNum(x) {
  var includeMax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var includeMin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var range = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [-180, 180];
  var max = range[1],
    min = range[0],
    d = max - min;
  if (x === max && includeMax) {
    return x;
  }
  if (x === min && includeMin) {
    return x;
  }
  var tmp = ((x - min) % d + d) % d;
  if (tmp === 0 && includeMax) {
    return max;
  }
  return ((x - min) % d + d) % d + min;
}

/**
 * @function conversionDegree
 * @description 转换经纬度。
 * @category BaseTypes Util
 * @param {number} degrees 经度或纬度。
 * @returns {string} 返回度分秒。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.conversionDegree(degrees);
 *
 * </script>
 *
 * // ES6 Import
 * import { conversionDegree } from '{npm}';
 *
 * const result = conversionDegree(degrees);
 * ```
 */
function conversionDegree(degrees) {
  var degree = parseInt(degrees);
  var fraction = parseInt((degrees - degree) * 60);
  var second = parseInt(((degrees - degree) * 60 - fraction) * 60);
  fraction = parseInt(fraction / 10) === 0 ? "0".concat(fraction) : fraction;
  second = parseInt(second / 10) === 0 ? "0".concat(second) : second;
  return "".concat(degree, "\xB0").concat(fraction, "'").concat(second);
}

/**
  * @function scalesToResolutions
  * @description 通过比例尺数组计算分辨率数组，没有传入比例尺数组时通过地图范围与地图最大级别进行计算。
  * @version 11.0.1
  * @param {Array} scales - 比例尺数组。
  * @param {Object} bounds - 地图范围。
  * @param {number} dpi - 屏幕分辨率。
  * @param {string} mapUnit - 地图单位。
  * @param {number} [level=22] - 地图最大级别。
  * @returns {number} 分辨率。
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script>
  *   const result = {namespace}.scalesToResolutions(scales, bounds, dpi, mapUnit);
  *
  * </script>
  *
  * // ES6 Import
  * import { scalesToResolutions } from '{npm}';
  *
  * const result = scalesToResolutions(scales, bounds, dpi, mapUnit);
  * ```
 */
function scalesToResolutions(scales, bounds, dpi, mapUnit) {
  var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 22;
  var baseScale = arguments.length > 5 ? arguments[5] : undefined;
  var resolutions = [];
  if (scales && scales.length > 0) {
    for (var i = 0; i < scales.length; i++) {
      resolutions.push(scaleToResolution(scales[i], dpi, mapUnit));
    }
  } else if (baseScale) {
    var maxReolution = Math.abs(bounds.left - bounds.right) / 256;
    var baseRes = scaleToResolution(baseScale, dpi, mapUnit);
    var topRes = baseRes;
    for (var _i = 0; _i < level; _i++) {
      var temp = baseRes * Math.pow(2, _i);
      if (Math.abs(temp, maxReolution) <= 1E-6 || temp > maxReolution) {
        topRes = temp;
        break;
      }
    }
    for (var _i2 = 0; _i2 < level; _i2++) {
      resolutions.push(topRes / Math.pow(2, _i2));
    }
  } else {
    var _maxReolution = Math.abs(bounds.left - bounds.right) / 256;
    for (var _i3 = 0; _i3 < level; _i3++) {
      resolutions.push(_maxReolution / Math.pow(2, _i3));
    }
  }
  return resolutions.sort(function (a, b) {
    return b - a;
  });
}
/**
  * @function getZoomByResolution
  * @description 通过分辨率获取地图级别。
  * @version 11.0.1
  * @param {number} resolution - 分辨率。
  * @param {Array} resolutions - 分辨率数组。
  * @returns {number} 地图级别。
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script>
  *   const result = {namespace}.getZoomByResolution(resolution, resolutions);
  *
  * </script>
  *
  * // ES6 Import
  * import { getZoomByResolution } from '{npm}';
  *
  * const result = getZoomByResolution(resolution, resolutions);
  * ```
 */
function getZoomByResolution(resolution, resolutions) {
  var zoom = 0;
  var minDistance;
  for (var i = 0; i < resolutions.length; i++) {
    if (i === 0) {
      minDistance = Math.abs(resolution - resolutions[i]);
    }
    if (minDistance > Math.abs(resolution - resolutions[i])) {
      minDistance = Math.abs(resolution - resolutions[i]);
      zoom = i;
    }
  }
  return zoom;
}

/**
  * @function scaleToResolution
  * @description 通过比例尺计算分辨率。
  * @version 11.0.1
  * @param {number} scale - 比例尺。
  * @param {number} dpi - 屏幕分辨率。
  * @param {string} mapUnit - 地图单位。
  * @returns {number} 分辨率。
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script>
  *   const result = {namespace}.scaleToResolution(scale, dpi, mapUnit);
  *
  * </script>
  *
  * // ES6 Import
  * import { scaleToResolution } from '{npm}';
  *
  * const result = scaleToResolution(scale, dpi, mapUnit);
  * ```
 */
function scaleToResolution(scale, dpi, mapUnit) {
  var inchPerMeter = 1 / 0.0254;
  var meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
  var resolution = 1 / (scale * dpi * inchPerMeter * meterPerMapUnitValue);
  return resolution;
}
function getDpi(scale, resolution, mapUnit) {
  var inchPerMeter = 1 / 0.0254;
  var meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
  var dpi = 1.0 / resolution / (scale * inchPerMeter * meterPerMapUnitValue);
  return dpi;
}

/**
 * 范围是否相交。
 * @param {Array} extent1 范围 1。
 * @param {Array} extent2 范围 2。
 * @return {boolean} 范围是否相交。
 */
function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}

/**
 * 获取两个范围的交集。
 * @param {Array} extent1 范围 1。
 * @param {Array} extent2 范围 2。
 * @return {Array} 相交范围数组。
 * @api
 */
function getIntersection(extent1, extent2) {
  var intersection = [];
  if (intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }
    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }
    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }
    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  }
  return intersection;
}
;// CONCATENATED MODULE: ./src/classic/overlay/mapv/MapVRenderer.js
function MapVRenderer_typeof(o) { "@babel/helpers - typeof"; return MapVRenderer_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, MapVRenderer_typeof(o); }
function MapVRenderer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function MapVRenderer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, MapVRenderer_toPropertyKey(descriptor.key), descriptor); } }
function MapVRenderer_createClass(Constructor, protoProps, staticProps) { if (protoProps) MapVRenderer_defineProperties(Constructor.prototype, protoProps); if (staticProps) MapVRenderer_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function MapVRenderer_toPropertyKey(t) { var i = MapVRenderer_toPrimitive(t, "string"); return "symbol" == MapVRenderer_typeof(i) ? i : String(i); }
function MapVRenderer_toPrimitive(t, r) { if ("object" != MapVRenderer_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != MapVRenderer_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (MapVRenderer_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class MapVRenderer
 * @classdesc MapV渲染器。
 * @private
 * @extends {mapv.baiduMapLayer}
 * @param {SuperMap.Map} map - 待渲染的地图。
 * @param {SuperMap.Layer.MapVLayer} layer - 待渲染的图层。
 * @param {Mapv.DataSet} dataSet - 待渲染的数据集，数据所属坐标系要求与 map 保持一致。
 * @param {Object} options - 渲染的参数。
 */
var MapVBaseLayer = external_function_try_return_mapv_catch_e_return_namespaceObject.baiduMapLayer ? external_function_try_return_mapv_catch_e_return_namespaceObject.baiduMapLayer.__proto__ : Function;
var MapVRenderer = /*#__PURE__*/function (_MapVBaseLayer) {
  _inherits(MapVRenderer, _MapVBaseLayer);
  function MapVRenderer(map, layer, dataSet, options) {
    var _this;
    MapVRenderer_classCallCheck(this, MapVRenderer);
    _this = _callSuper(this, MapVRenderer, [map, dataSet, options]);
    if (!MapVBaseLayer) {
      return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
    }
    var self = _assertThisInitialized(_this);
    options = options || {};
    self.init(options);
    self.argCheck(options);
    _this.canvasLayer = layer;
    _this.clickEvent = _this.clickEvent.bind(_assertThisInitialized(_this));
    _this.mousemoveEvent = _this.mousemoveEvent.bind(_assertThisInitialized(_this));
    _this.bindEvent();
    return _this;
  }

  /**
   * @function MapvRenderer.prototype.clickEvent
   * @description 点击事件。
   * @param {Object} e -  触发对象。
   */
  MapVRenderer_createClass(MapVRenderer, [{
    key: "clickEvent",
    value: function clickEvent(e) {
      var pixel = e.xy;
      var devicePixelRatio = this.devicePixelRatio || 1;
      _get(_getPrototypeOf(MapVRenderer.prototype), "clickEvent", this).call(this, {
        x: pixel.x / devicePixelRatio,
        y: pixel.y / devicePixelRatio
      }, e);
    }

    /**
     * @function MapvRenderer.prototype.mousemoveEvent
     * @description 鼠标移动事件。
     * @param {Object} e - 触发对象。
     */
  }, {
    key: "mousemoveEvent",
    value: function mousemoveEvent(e) {
      var pixel = e.xy;
      _get(_getPrototypeOf(MapVRenderer.prototype), "mousemoveEvent", this).call(this, pixel, e);
    }

    /**
     * @function MapvRenderer.prototype.bindEvent
     * @description 绑定鼠标移动和鼠标点击事件。
     */
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var map = this.map;
      if (this.options.methods) {
        if (this.options.methods.click) {
          map.events.on({
            click: this.clickEvent
          });
        }
        if (this.options.methods.mousemove) {
          map.events.on({
            mousemove: this.mousemoveEvent
          });
        }
      }
    }

    /**
     * @function MapvRenderer.prototype.unbindEvent
     * @description 解绑鼠标移动和鼠标滑动触发的事件。
     */
  }, {
    key: "unbindEvent",
    value: function unbindEvent() {
      var map = this.map;
      if (this.options.methods) {
        if (this.options.methods.click) {
          map.events.un({
            click: this.clickEvent
          });
        }
        if (this.options.methods.mousemove) {
          map.events.un({
            mousemove: this.mousemoveEvent
          });
        }
      }
    }

    /**
     * @function MapvRenderer.prototype.getContext
     * @description 获取信息。
     */
  }, {
    key: "getContext",
    value: function getContext() {
      return this.canvasLayer && this.canvasLayer.canvasContext;
    }

    /**
     * @function MapvRenderer.prototype.addData
     * @description 追加数据
     * @param {Object} data - 待添加的数据。
     * @param {Object} options - 待添加的数据信息。
     */
  }, {
    key: "addData",
    value: function addData(data, options) {
      var _data = data;
      if (data && data.get) {
        _data = data.get();
      }
      this.dataSet.add(_data);
      this.update({
        options: options
      });
    }

    /**
     * @function MapvRenderer.prototype.updateData
     * @description 更新覆盖原数据。
     * @param {Object} data - 待更新的数据。
     * @param {Object} options - 待更新的数据信息。
     */
  }, {
    key: "setData",
    value: function setData(data, options) {
      var _data = data;
      if (data && data.get) {
        _data = data.get();
      }
      this.dataSet = this.dataSet || new external_function_try_return_mapv_catch_e_return_namespaceObject.DataSet();
      this.dataSet.set(_data);
      this.update({
        options: options
      });
    }

    /**
     * @function MapvRenderer.prototype.getData
     * @description 获取数据。
     */
  }, {
    key: "getData",
    value: function getData() {
      return this.dataSet;
    }

    /**
     * @function MapvRenderer.prototype.removeData
     * @description 删除符合过滤条件的数据。
     * @param {function} filter - 过滤条件。条件参数为数据项，返回值为 true，表示删除该元素；否则表示不删除。
     */
  }, {
    key: "removeData",
    value: function removeData(_filter) {
      if (!this.dataSet) {
        return;
      }
      var newData = this.dataSet.get({
        filter: function filter(data) {
          return _filter != null && typeof _filter === 'function' ? !_filter(data) : true;
        }
      });
      this.dataSet.set(newData);
      this.update({
        options: null
      });
    }

    /**
     * @function MapvRenderer.prototype.clearData
     * @description 清除数据。
     */
  }, {
    key: "clearData",
    value: function clearData() {
      this.dataSet && this.dataSet.clear();
      this.update({
        options: null
      });
    }

    /**
     * @function MapvRenderer.prototype.render
     * @description 着色。
     * @param {number} time
     */
  }, {
    key: "render",
    value: function render(time) {
      this._canvasUpdate(time);
    }

    /**
     * @function MapvRenderer.prototype.transferToMercator
     * @description 墨卡托坐标为经纬度。
     * @deprecated
     */
  }, {
    key: "transferToMercator",
    value: function transferToMercator() {
      if (this.options.coordType && ['bd09mc', 'coordinates_mercator'].indexOf(this.options.coordType) > -1) {
        var data = this.dataSet.get();
        data = this.dataSet.transferCoordinate(data, function (coordinates) {
          var pixel = SuperMap.Projection.transform({
            x: coordinates[0],
            y: coordinates[1]
          }, 'EPSG:3857', 'EPSG:4326');
          return [pixel.x, pixel.y];
        }, 'coordinates', 'coordinates');
        this.dataSet._set(data);
      }
    }
  }, {
    key: "_canvasUpdate",
    value: function _canvasUpdate(time) {
      if (!this.canvasLayer) {
        return;
      }
      var self = this;
      var animationOptions = self.options.animation;
      var context = this.getContext();
      var map = this.map;
      if (self.isEnabledTime()) {
        if (time === undefined) {
          this.clear(context);
          return;
        }
        if (this.context === '2d') {
          context.save();
          context.globalCompositeOperation = 'destination-out';
          context.fillStyle = 'rgba(0, 0, 0, .1)';
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);
          context.restore();
        }
      } else {
        this.clear(context);
      }
      if (this.context === '2d') {
        for (var key in self.options) {
          context[key] = self.options[key];
        }
      } else {
        context.clear(context.COLOR_BUFFER_BIT);
      }
      if (self.options.minZoom && map.getZoom() < self.options.minZoom || self.options.maxZoom && map.getZoom() > self.options.maxZoom) {
        return;
      }
      var layer = self.canvasLayer;
      var dataGetOptions = {
        fromColumn: 'coordinates',
        transferCoordinate: function transferCoordinate(coordinate) {
          var coord = {
            lon: coordinate[0],
            lat: coordinate[1]
          };
          var worldPoint = map.getViewPortPxFromLonLat(coord);
          return [worldPoint.x, worldPoint.y];
        }
      };
      if (time !== undefined) {
        dataGetOptions.filter = function (item) {
          var trails = animationOptions.trails || 10;
          return time && item.time > time - trails && item.time < time;
        };
      }
      var data = self.dataSet.get(dataGetOptions);
      this.processData(data);
      // 一个像素是多少米
      var zoomUnit = map.getResolution() * getMeterPerMapUnit('DEGREE');
      // // 兼容unit为'm'的情况
      if (self.options.unit === 'm') {
        if (self.options.size) {
          self.options._size = self.options.size / zoomUnit;
        }
        if (self.options.width) {
          self.options._width = self.options.width / zoomUnit;
        }
        if (self.options.height) {
          self.options._height = self.options.height / zoomUnit;
        }
      } else {
        self.options._size = self.options.size;
        self.options._height = self.options.height;
        self.options._width = self.options.width;
      }
      var worldPoint = map.getViewPortPxFromLonLat(layer.transferToMapLatLng({
        lon: 0,
        lat: 0
      }));
      this.drawContext(context, data, self.options, worldPoint);
      self.options.updateCallback && self.options.updateCallback(time);
    }
  }, {
    key: "init",
    value: function init(options) {
      var self = this;
      self.options = options;
      this.initDataRange(options);
      this.context = self.options.context || '2d';
      if (self.options.zIndex) {
        this.canvasLayer && this.canvasLayer.setZIndex(self.options.zIndex);
      }
      this.initAnimator();
    }

    /**
     * @function MapvRenderer.prototype.addAnimatorEvent
     * @description 添加动画事件。
     */
  }, {
    key: "addAnimatorEvent",
    value: function addAnimatorEvent() {
      this.map.events.on({
        movestart: this.animatorMovestartEvent.bind(this)
      });
      this.map.events.on({
        moveend: this.animatorMoveendEvent.bind(this)
      });
    }

    /**
     * @function MapvRenderer.prototype.clear
     * @description 清除环境。
     * @param {Object} context - 当前环境。
     */
  }, {
    key: "clear",
    value: function clear(context) {
      context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    /**
     * @function MapvRenderer.prototype.show
     * @description 展示渲染效果。
     */
  }, {
    key: "show",
    value: function show() {
      this.map.addLayer(this.canvasLayer);
    }

    /**
     * @function MapvRenderer.prototype.hide
     * @description 隐藏渲染效果。
     */
  }, {
    key: "hide",
    value: function hide() {
      this.map.removeLayer(this.canvasLayer);
    }

    /**
     * @function MapvRenderer.prototype.draw
     * @description 渲染绘制。
     */
  }, {
    key: "draw",
    value: function draw() {
      this.canvasLayer.redraw();
    }
  }]);
  return MapVRenderer;
}(MapVBaseLayer);
;// CONCATENATED MODULE: ./src/classic/overlay/MapVLayer.js
function MapVLayer_typeof(o) { "@babel/helpers - typeof"; return MapVLayer_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, MapVLayer_typeof(o); }
function MapVLayer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function MapVLayer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, MapVLayer_toPropertyKey(descriptor.key), descriptor); } }
function MapVLayer_createClass(Constructor, protoProps, staticProps) { if (protoProps) MapVLayer_defineProperties(Constructor.prototype, protoProps); if (staticProps) MapVLayer_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function MapVLayer_toPropertyKey(t) { var i = MapVLayer_toPrimitive(t, "string"); return "symbol" == MapVLayer_typeof(i) ? i : String(i); }
function MapVLayer_toPrimitive(t, r) { if ("object" != MapVLayer_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != MapVLayer_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function MapVLayer_callSuper(t, o, e) { return o = MapVLayer_getPrototypeOf(o), MapVLayer_possibleConstructorReturn(t, MapVLayer_isNativeReflectConstruct() ? Reflect.construct(o, e || [], MapVLayer_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function MapVLayer_possibleConstructorReturn(self, call) { if (call && (MapVLayer_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return MapVLayer_assertThisInitialized(self); }
function MapVLayer_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (MapVLayer_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function MapVLayer_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function MapVLayer_get() { if (typeof Reflect !== "undefined" && Reflect.get) { MapVLayer_get = Reflect.get.bind(); } else { MapVLayer_get = function _get(target, property, receiver) { var base = MapVLayer_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return MapVLayer_get.apply(this, arguments); }
function MapVLayer_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = MapVLayer_getPrototypeOf(object); if (object === null) break; } return object; }
function MapVLayer_getPrototypeOf(o) { MapVLayer_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return MapVLayer_getPrototypeOf(o); }
function MapVLayer_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) MapVLayer_setPrototypeOf(subClass, superClass); }
function MapVLayer_setPrototypeOf(o, p) { MapVLayer_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return MapVLayer_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @class SuperMap.Layer.MapVLayer
 * @category  Visualization MapV
 * @classdesc MapV 图层类。MapV 是一款地理信息可视化开源库，MapV 图层可以用来展示大量地理信息数据，点、线、面的数据，每种数据也有不同的展示类型，如直接打点、热力图、网格、聚合等方式展示数据。<br>
 * 展示大量的点数据：如热力图、网格、蜂窝状、点聚合、按颜色区间、按半径大小等方式。<br>
 * 展示大量的线数据：如普通画线、高亮叠加、热力线数据展示等方式，适合展示大量轨迹的场景。<br>
 * 展示大量的自定义面数据：按颜色区间来展示，如展示行政区划数据。
 * @modulecategory Overlay
 * @extends {SuperMap.Layer}
 * @param {string} name - 图层名。
 * @param {Object} options - 可选参数。
 * @param {Mapv.DataSet} options.dataSet - MapV 的 dataSet 对象。
 * @param {Object} options.options - MapV 绘图风格配置信息。
 */
var MapVLayer = /*#__PURE__*/function (_SuperMap$Layer) {
  MapVLayer_inherits(MapVLayer, _SuperMap$Layer);
  function MapVLayer(name, options) {
    var _this;
    MapVLayer_classCallCheck(this, MapVLayer);
    _this = MapVLayer_callSuper(this, MapVLayer, [name, options]);

    /**
     * @member {Mapv.DataSet} SuperMap.Layer.MapVLayer.prototype.dataSet
     * @description MapV 的 dataset 对象。
     */
    _this.dataSet = null;

    /**
     * @member {Object} SuperMap.Layer.MapVLayer.prototype.options
     * @description MapV 绘图风格配置信息。
     */
    _this.options = null;

    /**
     * @member {boolean} [SuperMap.Layer.MapVLayer.prototype.supported=false]
     * @description 当前浏览器是否支持 canvas 绘制。决定了 MapV 图是否可用，内部判断使用。
     */
    _this.supported = false;

    /**
     * @member {HTMLCanvasElement} SuperMap.Layer.MapVLayer.prototype.canvas
     * @description MapV 图主绘制面板。
     */
    _this.canvas = null;

    /**
     * @private
     * @member {CanvasContext} SuperMap.Layer.MapVLayer.prototype.canvasContext
     * @description MapV 图主绘制对象。
     */
    _this.canvasContext = null;
    if (options) {
      SuperMap.Util.extend(MapVLayer_assertThisInitialized(_this), options);
    }

    //MapV图要求使用canvas绘制，判断是否支持
    _this.canvas = document.createElement('canvas');
    if (!_this.canvas.getContext) {
      return MapVLayer_possibleConstructorReturn(_this);
    }
    _this.supported = true;
    //构建绘图面板
    _this.canvas.style.position = 'absolute';
    _this.canvas.style.top = 0 + 'px';
    _this.canvas.style.left = 0 + 'px';
    _this.div.appendChild(_this.canvas);
    var context = _this.options && _this.options.context || '2d';
    _this.canvasContext = _this.canvas.getContext(context);
    var global$2 = typeof window === 'undefined' ? {} : window;
    var devicePixelRatio = _this.devicePixelRatio = global$2.devicePixelRatio || 1;
    if (context === '2d') {
      _this.canvasContext.scale(devicePixelRatio, devicePixelRatio);
    }
    _this.attribution = "© 2018 百度 <a href='https://mapv.baidu.com' target='_blank'>MapV</a> with <span>© <a target='_blank' href='https://iclient.supermap.io' " + "style='color: #08c;text-decoration: none;'>SuperMap iClient</a></span>";
    _this.CLASS_NAME = 'SuperMap.Layer.MapVLayer';
    return _this;
  }

  /**
   * @function SuperMap.Layer.MapVLayer.prototype.destroy
   * @description 销毁此图层，销毁后此图层的所有属性为 null。
   * @override
   */
  MapVLayer_createClass(MapVLayer, [{
    key: "destroy",
    value: function destroy() {
      if (this.renderer && this.renderer.animator) {
        this.renderer.animator.stop();
        this.renderer.animator = null;
      }
      this.dataSet = null;
      this.options = null;
      this.renderer = null;
      this.supported = null;
      this.canvas = null;
      this.canvasContext = null;
      this.maxWidth = null;
      this.maxHeight = null;
      MapVLayer_get(MapVLayer_getPrototypeOf(MapVLayer.prototype), "destroy", this).call(this);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.addData
     * @description 追加数据。
     * @param {Mapv.DataSet} dataSet - MapV 的 dataSet 对象。
     * @param {Object} options - MapV 绘图风格配置信息。
     */
  }, {
    key: "addData",
    value: function addData(dataSet, options) {
      this.renderer && this.renderer.addData(dataSet, options);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.
     * @description 设置数据。
     * @param {Mapv.DataSet} dataSet - MapV 的 dataSet 对象。
     * @param {Object} options - MapV 绘图风格配置信息。
     */
  }, {
    key: "setData",
    value: function setData(dataSet, options) {
      this.renderer && this.renderer.setData(dataSet, options);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.getData
     * @description 获取数据。
     * @returns {Mapv.DataSet} MapV 的 dataSet 对象。
     */
  }, {
    key: "getData",
    value: function getData() {
      if (this.renderer) {
        this.dataSet = this.renderer.getData();
      }
      return this.dataSet;
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.removeData
     * @description 删除符合过滤条件的数据。
     * @param {function} filter - 过滤条件。条件参数为数据项，返回值为 true，表示删除该元素；否则表示不删除。
     * @example
     *  filter=function(data){
     *    if(data.id=="1"){
     *      return true
     *    }
     *    return false;
     *  }
     */
  }, {
    key: "removeData",
    value: function removeData(filter) {
      this.renderer && this.renderer.removeData(filter);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.clearData
     * @description 清除数据。
     */
  }, {
    key: "clearData",
    value: function clearData() {
      this.renderer.clearData();
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.setMap
     * @description 图层已经添加到 Map 中。
     *              如果当前浏览器支持 canvas，则开始渲染要素；如果不支持则移除图层。
     * @param {SuperMap.Map} map - 需要绑定的 map 对象。
     */
  }, {
    key: "setMap",
    value: function setMap(map) {
      MapVLayer_get(MapVLayer_getPrototypeOf(MapVLayer.prototype), "setMap", this).call(this, map);
      this.renderer = new MapVRenderer(map, this, this.dataSet, this.options);
      this.renderer.devicePixelRatio = this.devicePixelRatio;
      if (!this.supported) {
        this.map.removeLayer(this);
      } else {
        this.redraw();
      }
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.moveTo
     * @description 重置当前 MapV 图层的 div，再一次与 Map 控件保持一致。
     *              修改当前显示范围，当平移或者缩放结束后开始重绘 MapV 图的渲染效果。
     * @param {SuperMap.Bounds} bounds - 图层范围。
     * @param {boolean} [zoomChanged] - 缩放级别是否改变。
     * @param {boolean} [dragging] - 是否拖动。
     */
  }, {
    key: "moveTo",
    value: function moveTo(bounds, zoomChanged, dragging) {
      MapVLayer_get(MapVLayer_getPrototypeOf(MapVLayer.prototype), "moveTo", this).call(this, bounds, zoomChanged, dragging);
      if (!this.supported) {
        return;
      }
      this.zoomChanged = zoomChanged;
      if (!dragging) {
        this.div.style.visibility = 'hidden';
        this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left) + 'px';
        this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top) + 'px';
        /*this.canvas.style.left = this.div.style.left;
         this.canvas.style.top = this.div.style.top;*/
        var size = this.map.getSize();
        this.div.style.width = parseInt(size.w) + 'px';
        this.div.style.height = parseInt(size.h) + 'px';
        if (this.options.draw === 'heatmap') {
          this.canvas.width = parseInt(size.w) * this.devicePixelRatio;
          this.canvas.height = parseInt(size.h) * this.devicePixelRatio;
        } else {
          this.canvas.width = parseInt(size.w);
          this.canvas.height = parseInt(size.h);
        }
        this.canvas.style.width = this.div.style.width;
        this.canvas.style.height = this.div.style.height;
        this.maxWidth = size.w;
        this.maxHeight = size.h;
        this.div.style.visibility = '';
        if (!zoomChanged) {
          this.renderer && this.renderer.render();
        }
      }
      if (zoomChanged) {
        this.renderer && this.renderer.render();
      }
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.transferToMapLatLng
     * @description 将经纬度转成底图的投影坐标。
     * @param {SuperMap.LonLat} latLng - 经纬度坐标。
     * @deprecated
     */
  }, {
    key: "transferToMapLatLng",
    value: function transferToMapLatLng(latLng) {
      var source = 'EPSG:4326',
        dest = 'EPSG:4326';
      var unit = this.map.getUnits() || 'degree';
      if (['m', 'meter'].indexOf(unit.toLowerCase()) > -1) {
        dest = 'EPSG:3857';
      }
      return new SuperMap.LonLat(latLng.lon, latLng.lat).transform(source, dest);
    }
  }]);
  return MapVLayer;
}(SuperMap.Layer);
SuperMap.Layer.MapVLayer = MapVLayer;
;// CONCATENATED MODULE: ./src/classic/overlay/mapv/index.js
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

;// CONCATENATED MODULE: ./src/classic/overlay/index.js
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


;// CONCATENATED MODULE: ./src/common/format/Format.js
function Format_typeof(o) { "@babel/helpers - typeof"; return Format_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Format_typeof(o); }
function Format_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Format_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Format_toPropertyKey(descriptor.key), descriptor); } }
function Format_createClass(Constructor, protoProps, staticProps) { if (protoProps) Format_defineProperties(Constructor.prototype, protoProps); if (staticProps) Format_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Format_toPropertyKey(t) { var i = Format_toPrimitive(t, "string"); return "symbol" == Format_typeof(i) ? i : String(i); }
function Format_toPrimitive(t, r) { if ("object" != Format_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Format_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class Format
 * @deprecatedclass SuperMap.Format
 * @classdesc 读写各种格式的格式类基类。其子类应该包含并实现 read 和 write 方法。
 * @category BaseTypes Format
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.keepData=false] - 如果设置为 true， data 属性会指向被解析的对象（例如 JSON 或 xml 数据对象）。
 * @param {Object} [options.data] - 当 keepData 属性设置为 true，这是传递给 read 操作的要被解析的字符串。
 * @usage
 */
var Format = /*#__PURE__*/function () {
  function Format(options) {
    Format_classCallCheck(this, Format);
    /**
     * @member {Object} Format.prototype.data
     * @description 当 keepData 属性设置为 true，这是传递给 read 操作的要被解析的字符串。
     */
    this.data = null;

    /**
     * @member {Object} [Format.prototype.keepData=false]
     * @description 保持最近读到的数据的引用（通过 data 属性）。
     */
    this.keepData = false;
    Util_Util.extend(this, options);
    this.options = options;
    this.CLASS_NAME = "SuperMap.Format";
  }

  /**
   * @function Format.prototype.destroy
   * @description 销毁该格式类，释放相关资源。
   */
  Format_createClass(Format, [{
    key: "destroy",
    value: function destroy() {
      //用来销毁该格式类，释放相关资源
    }

    /**
     * @function Format.prototype.read
     * @description 从字符串中读取数据。
     * @param {string} data - 读取的数据。
     */
  }, {
    key: "read",
    value: function read(data) {// eslint-disable-line no-unused-vars
      //用来从字符串中读取数据
    }

    /**
     * @function Format.prototype.write
     * @description 将对象写成字符串。
     * @param {Object} object - 可序列化的对象。
     * @returns {string} 对象转化后的字符串。
     */
  }, {
    key: "write",
    value: function write(object) {// eslint-disable-line no-unused-vars
      //用来写字符串
    }
  }]);
  return Format;
}();
;// CONCATENATED MODULE: ./src/common/format/JSON.js
function JSON_typeof(o) { "@babel/helpers - typeof"; return JSON_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, JSON_typeof(o); }
function JSON_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function JSON_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, JSON_toPropertyKey(descriptor.key), descriptor); } }
function JSON_createClass(Constructor, protoProps, staticProps) { if (protoProps) JSON_defineProperties(Constructor.prototype, protoProps); if (staticProps) JSON_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function JSON_toPropertyKey(t) { var i = JSON_toPrimitive(t, "string"); return "symbol" == JSON_typeof(i) ? i : String(i); }
function JSON_toPrimitive(t, r) { if ("object" != JSON_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != JSON_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function JSON_callSuper(t, o, e) { return o = JSON_getPrototypeOf(o), JSON_possibleConstructorReturn(t, JSON_isNativeReflectConstruct() ? Reflect.construct(o, e || [], JSON_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function JSON_possibleConstructorReturn(self, call) { if (call && (JSON_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return JSON_assertThisInitialized(self); }
function JSON_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function JSON_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (JSON_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function JSON_getPrototypeOf(o) { JSON_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return JSON_getPrototypeOf(o); }
function JSON_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) JSON_setPrototypeOf(subClass, superClass); }
function JSON_setPrototypeOf(o, p) { JSON_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return JSON_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class JSONFormat
 * @aliasclass Format.JSON
 * @deprecatedclass SuperMap.Format.JSON
 * @classdesc 安全的读写 JSON 的解析类。使用 {@link JSONFormat} 构造函数创建新实例。
 * @category BaseTypes Format
 * @param {Object} [options] - 可选参数。
 * @param {string} [options.indent="    "] - 用于格式化输出，indent 字符串会在每次缩进的时候使用一次。
 * @param {string} [options.space=" "] - 用于格式化输出，space 字符串会在名值对的 ":" 后边添加。
 * @param {string} [options.newline="\n"] - 用于格式化输出，newline 字符串会用在每一个名值对或数组项末尾。
 * @param {number} [options.level=0] - 用于格式化输出，表示的是缩进级别。
 * @param {boolean} [options.pretty=false] - 是否在序列化的时候使用额外的空格控制结构。在 write 方法中使用。
 * @param {boolean} [options.nativeJSON] - 需要被注册的监听器对象。
 * @extends {Format}
 * @usage
 */
var JSONFormat = /*#__PURE__*/function (_Format) {
  JSON_inherits(JSONFormat, _Format);
  function JSONFormat(options) {
    var _this;
    JSON_classCallCheck(this, JSONFormat);
    _this = JSON_callSuper(this, JSONFormat, [options]);
    /**
     * @member {string} [JSONFormat.prototype.indent="    "]
     * @description 用于格式化输出，indent 字符串会在每次缩进的时候使用一次。
     */
    _this.indent = "    ";

    /**
     * @member {string} [JSONFormat.prototype.space=" "]
     * @description 用于格式化输出，space 字符串会在名值对的 ":" 后边添加。
     */
    _this.space = " ";

    /**
     * @member {string} [JSONFormat.prototype.newline="\n"]
     * @description 用于格式化输出，newline 字符串会用在每一个名值对或数组项末尾。
     */
    _this.newline = "\n";

    /**
     * @member {number} [JSONFormat.prototype.level=0]
     * @description 用于格式化输出，表示的是缩进级别。
     */
    _this.level = 0;

    /**
     * @member {boolean} [JSONFormat.prototype.pretty=false]
     * @description 是否在序列化的时候使用额外的空格控制结构。在 write 方法中使用。
     */
    _this.pretty = false;

    /**
     * @member {boolean} JSONFormat.prototype.nativeJSON
     * @description 判断浏览器是否原生支持 JSON 格式数据。
     */
    _this.nativeJSON = function () {
      return !!(window.JSON && typeof JSON.parse === "function" && typeof JSON.stringify === "function");
    }();
    _this.CLASS_NAME = "SuperMap.Format.JSON";
    /**
     * @member JSONFormat.prototype.serialize
     * @description 提供一些类型对象转 JSON 字符串的方法。
     */
    _this.serialize = {
      /**
       * @function JSONFormat.serialize.object
       * @description 把对象转换为 JSON 字符串。
       * @param {Object} object - 可序列化的对象。
       * @returns {string} JSON 字符串。
       */
      'object': function object(_object) {
        // three special objects that we want to treat differently
        if (_object == null) {
          return "null";
        }
        if (_object.constructor === Date) {
          return this.serialize.date.apply(this, [_object]);
        }
        if (_object.constructor === Array) {
          return this.serialize.array.apply(this, [_object]);
        }
        var pieces = ['{'];
        this.level += 1;
        var key, keyJSON, valueJSON;
        var addComma = false;
        for (key in _object) {
          if (_object.hasOwnProperty(key)) {
            // recursive calls need to allow for sub-classing
            keyJSON = this.write.apply(this, [key, this.pretty]);
            valueJSON = this.write.apply(this, [_object[key], this.pretty]);
            if (keyJSON != null && valueJSON != null) {
              if (addComma) {
                pieces.push(',');
              }
              pieces.push(this.writeNewline(), this.writeIndent(), keyJSON, ':', this.writeSpace(), valueJSON);
              addComma = true;
            }
          }
        }
        this.level -= 1;
        pieces.push(this.writeNewline(), this.writeIndent(), '}');
        return pieces.join('');
      },
      /**
       * @function JSONFormat.serialize.array
       * @description 把数组转换成 JSON 字符串。
       * @param {Array} array - 可序列化的数组。
       * @returns {string} JSON 字符串。
       */
      'array': function array(_array) {
        var json;
        var pieces = ['['];
        this.level += 1;
        for (var i = 0, len = _array.length; i < len; ++i) {
          // recursive calls need to allow for sub-classing
          json = this.write.apply(this, [_array[i], this.pretty]);
          if (json != null) {
            if (i > 0) {
              pieces.push(',');
            }
            pieces.push(this.writeNewline(), this.writeIndent(), json);
          }
        }
        this.level -= 1;
        pieces.push(this.writeNewline(), this.writeIndent(), ']');
        return pieces.join('');
      },
      /**
       * @function JSONFormat.serialize.string
       * @description 把字符串转换成 JSON 字符串。
       * @param {string} string - 可序列化的字符串。
       * @returns {string} JSON 字符串。
       */
      'string': function string(_string) {
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can simply slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe
        // sequences.
        var m = {
          '\b': '\\b',
          '\t': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"': '\\"',
          '\\': '\\\\'
        };
        /*eslint-disable no-control-regex*/
        if (/["\\\x00-\x1f]/.test(_string)) {
          return '"' + _string.replace(/([\x00-\x1f\\"])/g, function (a, b) {
            var c = m[b];
            if (c) {
              return c;
            }
            c = b.charCodeAt();
            return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
          }) + '"';
        }
        return '"' + _string + '"';
      },
      /**
       * @function JSONFormat.serialize.number
       * @description 把数字转换成 JSON 字符串。
       * @param {number} number - 可序列化的数字。
       * @returns {string} JSON 字符串。
       */
      'number': function number(_number) {
        return isFinite(_number) ? String(_number) : "null";
      },
      /**
       * @function JSONFormat.serialize.boolean
       * @description Transform a boolean into a JSON string.
       * @param {boolean} bool - The boolean to be serialized.
       * @returns {string} A JSON string representing the boolean.
       */
      'boolean': function boolean(bool) {
        return String(bool);
      },
      /**
       * @function JSONFormat.serialize.object
       * @description 将日期对象转换成 JSON 字符串。
       * @param {Date} date - 可序列化的日期对象。
       * @returns {string} JSON 字符串。
       */
      'date': function date(_date) {
        function format(number) {
          // Format integers to have at least two digits.
          return number < 10 ? '0' + number : number;
        }
        return '"' + _date.getFullYear() + '-' + format(_date.getMonth() + 1) + '-' + format(_date.getDate()) + 'T' + format(_date.getHours()) + ':' + format(_date.getMinutes()) + ':' + format(_date.getSeconds()) + '"';
      }
    };
    return _this;
  }

  /**
   * @function JSONFormat.prototype.read
   * @description 将一个符合 JSON 结构的字符串进行解析。
   * @param {string} json - 符合 JSON 结构的字符串。
   * @param {function} filter - 过滤方法，最终结果的每一个键值对都会调用该过滤方法，并在对应的值的位置替换成该方法返回的值。
   * @returns {(Object|string|Array|number|boolean)} 对象，数组，字符串或数字。
   */
  JSON_createClass(JSONFormat, [{
    key: "read",
    value: function read(json, filter) {
      var object;
      if (this.nativeJSON) {
        try {
          object = JSON.parse(json, filter);
        } catch (e) {
          // Fall through if the regexp test fails.
          return {
            data: json
          };
        }
      }
      if (this.keepData) {
        this.data = object;
      }
      return object;
    }

    /**
     * @function JSONFormat.prototype.write
     * @description 序列化一个对象到一个符合 JSON 格式的字符串。
     * @param {Object|string|Array|number|boolean} value - 需要被序列化的对象，数组，字符串，数字，布尔值。
     * @param {boolean} [pretty=false] - 是否在序列化的时候使用额外的空格控制结构。在 write 方法中使用。
     * @returns {string} 符合 JSON 格式的字符串。
     *
     */
  }, {
    key: "write",
    value: function write(value, pretty) {
      this.pretty = !!pretty;
      var json = null;
      var type = JSON_typeof(value);
      if (this.serialize[type]) {
        try {
          json = !this.pretty && this.nativeJSON ? JSON.stringify(value) : this.serialize[type].apply(this, [value]);
        } catch (err) {
          //console.error("Trouble serializing: " + err);
        }
      }
      return json;
    }

    /**
     * @function JSONFormat.prototype.writeIndent
     * @description 根据缩进级别输出一个缩进字符串。
     * @private
     * @returns {string} 一个适当的缩进字符串。
     */
  }, {
    key: "writeIndent",
    value: function writeIndent() {
      var pieces = [];
      if (this.pretty) {
        for (var i = 0; i < this.level; ++i) {
          pieces.push(this.indent);
        }
      }
      return pieces.join('');
    }

    /**
     * @function JSONFormat.prototype.writeNewline
     * @description 在格式化输出模式情况下输出代表新一行的字符串。
     * @private
     * @returns {string} 代表新的一行的字符串。
     */
  }, {
    key: "writeNewline",
    value: function writeNewline() {
      return this.pretty ? this.newline : '';
    }

    /**
     * @function JSONFormat.prototype.writeSpace
     * @private
     * @description 在格式化输出模式情况下输出一个代表空格的字符串。
     * @returns {string} 空格字符串。
     */
  }, {
    key: "writeSpace",
    value: function writeSpace() {
      return this.pretty ? this.space : '';
    }
  }]);
  return JSONFormat;
}(Format);
;// CONCATENATED MODULE: ./src/common/iServer/CommonServiceBase.js
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = CommonServiceBase_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function CommonServiceBase_typeof(o) { "@babel/helpers - typeof"; return CommonServiceBase_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, CommonServiceBase_typeof(o); }
function CommonServiceBase_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function CommonServiceBase_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, CommonServiceBase_toPropertyKey(descriptor.key), descriptor); } }
function CommonServiceBase_createClass(Constructor, protoProps, staticProps) { if (protoProps) CommonServiceBase_defineProperties(Constructor.prototype, protoProps); if (staticProps) CommonServiceBase_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function CommonServiceBase_toPropertyKey(t) { var i = CommonServiceBase_toPrimitive(t, "string"); return "symbol" == CommonServiceBase_typeof(i) ? i : String(i); }
function CommonServiceBase_toPrimitive(t, r) { if ("object" != CommonServiceBase_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != CommonServiceBase_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/








/**
 * @class CommonServiceBase
 * @deprecatedclass SuperMap.CommonServiceBase
 * @category  iServer Core
 * @classdesc 对接 iServer 各种服务的 Service 的基类。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var CommonServiceBase = /*#__PURE__*/function () {
  function CommonServiceBase(url, options) {
    CommonServiceBase_classCallCheck(this, CommonServiceBase);
    var me = this;
    this.EVENT_TYPES = ['processCompleted', 'processFailed'];
    this.events = null;
    this.eventListeners = null;
    this.url = null;
    this.urls = null;
    this.proxy = null;
    this.index = null;
    this.length = null;
    this.totalTimes = null;
    this.POLLING_TIMES = 3;
    this.isInTheSameDomain = null;
    this.withCredentials = false;
    if (Util_Util.isArray(url)) {
      me.urls = url;
      me.length = url.length;
      me.totalTimes = me.length;
      if (me.length === 1) {
        me.url = url[0];
      } else {
        me.index = parseInt(Math.random() * me.length);
        me.url = url[me.index];
      }
    } else {
      me.totalTimes = 1;
      me.url = url;
    }
    if (Util_Util.isArray(url) && !me.isServiceSupportPolling()) {
      me.url = url[0];
      me.totalTimes = 1;
    }
    options = options || {};
    this.crossOrigin = options.crossOrigin;
    this.headers = options.headers;
    Util_Util.extend(this, options);
    me.isInTheSameDomain = Util_Util.isInTheSameDomain(me.url);
    me.events = new Events(me, null, me.EVENT_TYPES, true);
    if (me.eventListeners instanceof Object) {
      me.events.on(me.eventListeners);
    }
    this.CLASS_NAME = 'SuperMap.CommonServiceBase';
  }

  /**
   * @function CommonServiceBase.prototype.destroy
   * @description 释放资源，将引用的资源属性置空。
   */
  CommonServiceBase_createClass(CommonServiceBase, [{
    key: "destroy",
    value: function destroy() {
      var me = this;
      if (Util_Util.isArray(me.urls)) {
        me.urls = null;
        me.index = null;
        me.length = null;
        me.totalTimes = null;
      }
      me.url = null;
      me.isInTheSameDomain = null;
      me.EVENT_TYPES = null;
      if (me.events) {
        me.events.destroy();
        me.events = null;
      }
      if (me.eventListeners) {
        me.eventListeners = null;
      }
    }

    /**
     * @function CommonServiceBase.prototype.request
     * @description: 该方法用于向服务发送请求。
     * @param {Object} options - 参数。
     * @param {string} [options.method='GET'] - 请求方式，包括 "GET"，"POST"，"PUT"，"DELETE"。
     * @param {string} [options.url] - 发送请求的地址。
     * @param {Object} [options.params] - 作为查询字符串添加到 URL 中的一组键值对，此参数只适用于 GET 方式发送的请求。
     * @param {string} [options.data] - 发送到服务器的数据。
     * @param {function} options.success - 请求成功后的回调函数。
     * @param {function} options.failure - 请求失败后的回调函数。
     * @param {Object} [options.scope] - 如果回调函数是对象的一个公共方法，设定该对象的范围。
     * @param {boolean} [options.isInTheSameDomain] - 请求是否在当前域中。
     * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
     * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
     * @param {Object} [options.headers] - 请求头。
     */
  }, {
    key: "request",
    value: function request(options) {
      var format = options.scope.format;
      // 兼容 callback 未传，dataFormat 传入的情况
      if (typeof options.success === 'string') {
        options.scope.format = options.success;
        format = options.success;
        options.success = null;
        options.failure = null;
      }
      if (format && !this.supportDataFormat(format)) {
        throw new Error("".concat(this.CLASS_NAME, " is not surport ").concat(format, " format!"));
      }
      var me = this;
      options.url = options.url || me.url;
      if (this._returnContent(options) && !options.url.includes('returnContent=true')) {
        options.url = Util_Util.urlAppend(options.url, 'returnContent=true');
      }
      options.proxy = options.proxy || me.proxy;
      options.withCredentials = options.withCredentials != undefined ? options.withCredentials : me.withCredentials;
      options.crossOrigin = options.crossOrigin != undefined ? options.crossOrigin : me.crossOrigin;
      options.headers = options.headers || me.headers;
      options.isInTheSameDomain = me.isInTheSameDomain;
      options.withoutFormatSuffix = options.scope.withoutFormatSuffix || false;
      //为url添加安全认证信息片段
      options.url = SecurityManager.appendCredential(options.url);
      me.calculatePollingTimes();
      options.scope = me;
      if (me.totalTimes > 0) {
        me.totalTimes--;
        return me.ajaxPolling(options);
      }
      return me._commit(options);
    }

    /**
     *
     * @function CommonServiceBase.prototype.ajaxPolling
     * @description 请求失败后，如果剩余请求失败次数不为 0，重新获取 URL 发送请求。
     * @param {Object} options - 请求参数对象。
     * @private
     */
  }, {
    key: "ajaxPolling",
    value: function ajaxPolling(options) {
      var me = this,
        url = options.url,
        re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/;
      me.index = parseInt(Math.random() * me.length);
      me.url = me.urls[me.index];
      url = url.replace(re, re.exec(me.url)[0]);
      options.url = url;
      options.isInTheSameDomain = Util_Util.isInTheSameDomain(url);
      return me._commit(options);
    }

    /**
     * @function CommonServiceBase.prototype.calculatePollingTimes
     * @description 计算剩余请求失败执行次数。
     */
  }, {
    key: "calculatePollingTimes",
    value: function calculatePollingTimes() {
      var me = this;
      if (me.times) {
        if (me.totalTimes > me.POLLING_TIMES) {
          if (me.times > me.POLLING_TIMES) {
            me.totalTimes = me.POLLING_TIMES;
          } else {
            me.totalTimes = me.times;
          }
        } else {
          if (me.times < me.totalTimes) {
            me.totalTimes = me.times;
          }
        }
      } else {
        if (me.totalTimes > me.POLLING_TIMES) {
          me.totalTimes = me.POLLING_TIMES;
        }
      }
      me.totalTimes--;
    }

    /**
     * @function CommonServiceBase.prototype.isServiceSupportPolling
     * @description 判断服务是否支持轮询。
     */
  }, {
    key: "isServiceSupportPolling",
    value: function isServiceSupportPolling() {
      var me = this;
      return !(me.CLASS_NAME === 'SuperMap.REST.ThemeService' || me.CLASS_NAME === 'SuperMap.REST.EditFeaturesService');
    }

    /**
     * @function CommonServiceBase.prototype.transformResult
     * @description 状态完成时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     * @private
     */
  }, {
    key: "transformResult",
    value: function transformResult(result, options) {
      result = Util_Util.transformResult(result);
      return {
        result: result,
        options: options
      };
    }

    /**
     * @function CommonServiceBase.prototype.transformErrorResult
     * @description 状态失败时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     * @private
     */
  }, {
    key: "transformErrorResult",
    value: function transformErrorResult(result, options) {
      result = Util_Util.transformResult(result);
      var error = result.error || result;
      return {
        error: error,
        options: options
      };
    }

    /**
    * @function CommonServiceBase.prototype.serviceProcessCompleted
    * @description 状态完成，执行此方法。
    * @param {Object} result - 服务器返回的结果对象。
    * @param {Object} options - 请求参数对象。
    * @private
    */
  }, {
    key: "serviceProcessCompleted",
    value: function serviceProcessCompleted(result, options) {
      result = this.transformResult(result).result;
      this.events.triggerEvent('processCompleted', {
        result: result,
        options: options
      });
    }

    /**
     * @function CommonServiceBase.prototype.serviceProcessFailed
     * @description 状态失败，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数对象。
     * @private
     */
  }, {
    key: "serviceProcessFailed",
    value: function serviceProcessFailed(result, options) {
      result = this.transformErrorResult(result).error;
      var error = result.error || result;
      this.events.triggerEvent('processFailed', {
        error: error,
        options: options
      });
    }
  }, {
    key: "_returnContent",
    value: function _returnContent(options) {
      if (options.scope.format === DataFormat.FGB) {
        return false;
      }
      if (options.scope.returnContent) {
        return true;
      }
      return false;
    }
  }, {
    key: "supportDataFormat",
    value: function supportDataFormat(foramt) {
      return this.dataFormat().includes(foramt);
    }
  }, {
    key: "dataFormat",
    value: function dataFormat() {
      return [DataFormat.GEOJSON, DataFormat.ISERVER];
    }
  }, {
    key: "_commit",
    value: function _commit(options) {
      var _this = this;
      if (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH') {
        if (options.params) {
          options.url = Util_Util.urlAppend(options.url, Util_Util.getParameterString(options.params || {}));
        }
        if (CommonServiceBase_typeof(options.data) === 'object' && !(options.data instanceof FormData)) {
          try {
            options.params = Util_Util.toJSON(options.data);
          } catch (e) {
            console.log('不是json对象');
          }
        } else {
          options.params = options.data;
        }
      }
      return FetchRequest.commit(options.method, options.url, options.params, {
        headers: options.headers,
        withoutFormatSuffix: options.withoutFormatSuffix,
        withCredentials: options.withCredentials,
        crossOrigin: options.crossOrigin,
        timeout: options.async ? 0 : null,
        proxy: options.proxy
      }).then(function (response) {
        if (response.text) {
          return response.text();
        }
        if (response.json) {
          return response.json();
        }
        return response;
      }).then(function (text) {
        var requestResult = text;
        if (typeof text === 'string') {
          requestResult = new JSONFormat().read(text);
        }
        if (!requestResult || requestResult.error || requestResult.code >= 300 && requestResult.code !== 304) {
          if (requestResult && requestResult.error) {
            requestResult = {
              error: requestResult.error
            };
          } else {
            requestResult = {
              error: requestResult
            };
          }
        }
        if (requestResult && options.scope.format === DataFormat.FGB) {
          requestResult.newResourceLocation = requestResult.newResourceLocation.replace('.json', '') + '.fgb';
        }
        return requestResult;
      })["catch"](function (e) {
        return {
          error: e
        };
      }).then(function (requestResult) {
        var response = {
          object: _this
        };
        if (requestResult.error) {
          var type = 'processFailed';
          // 兼容服务在构造函数中使用 eventListeners 的老用法
          if (_this.events && _this.events.listeners[type] && _this.events.listeners[type].length) {
            var failure = options.failure && (options.scope ? FunctionExt.bind(options.failure, options.scope) : options.failure);
            failure ? failure(requestResult, options) : _this.serviceProcessFailed(requestResult, options);
          } else {
            response = _objectSpread(_objectSpread({}, response), _this.transformErrorResult(requestResult, options));
            response.type = type;
            options.failure && options.failure(response);
          }
        } else {
          var _type = 'processCompleted';
          if (_this.events && _this.events.listeners[_type] && _this.events.listeners[_type].length) {
            var success = options.success && (options.scope ? FunctionExt.bind(options.success, options.scope) : options.success);
            success ? success(requestResult, options) : _this.serviceProcessCompleted(requestResult, options);
          } else {
            requestResult.succeed = requestResult.succeed == undefined ? true : requestResult.succeed;
            response = _objectSpread(_objectSpread({}, response), _this.transformResult(requestResult, options));
            response.type = _type;
            options.success && options.success(response);
          }
        }
        return response;
      });
    }
  }]);
  return CommonServiceBase;
}();

/**
 * 服务器请求回调函数。
 * @callback RequestCallback
 * @category BaseTypes Util
 * @example
 * var requestCallback = function (serviceResult){
 *      console.log(serviceResult.result);
 * }
 * new QueryService(url).queryByBounds(param, requestCallback);
 * @param {Object} serviceResult
 * @param {Object} serviceResult.result 服务器返回结果。
 * @param {Object} serviceResult.object 发布应用程序事件的对象。
 * @param {Object} serviceResult.type 事件类型。
 * @param {Object} serviceResult.options 请求参数。
 */
;// CONCATENATED MODULE: ./src/common/iServer/AddressMatchService.js
function AddressMatchService_typeof(o) { "@babel/helpers - typeof"; return AddressMatchService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, AddressMatchService_typeof(o); }
function AddressMatchService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function AddressMatchService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, AddressMatchService_toPropertyKey(descriptor.key), descriptor); } }
function AddressMatchService_createClass(Constructor, protoProps, staticProps) { if (protoProps) AddressMatchService_defineProperties(Constructor.prototype, protoProps); if (staticProps) AddressMatchService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function AddressMatchService_toPropertyKey(t) { var i = AddressMatchService_toPrimitive(t, "string"); return "symbol" == AddressMatchService_typeof(i) ? i : String(i); }
function AddressMatchService_toPrimitive(t, r) { if ("object" != AddressMatchService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != AddressMatchService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function AddressMatchService_callSuper(t, o, e) { return o = AddressMatchService_getPrototypeOf(o), AddressMatchService_possibleConstructorReturn(t, AddressMatchService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], AddressMatchService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function AddressMatchService_possibleConstructorReturn(self, call) { if (call && (AddressMatchService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return AddressMatchService_assertThisInitialized(self); }
function AddressMatchService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function AddressMatchService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (AddressMatchService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function AddressMatchService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { AddressMatchService_get = Reflect.get.bind(); } else { AddressMatchService_get = function _get(target, property, receiver) { var base = AddressMatchService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return AddressMatchService_get.apply(this, arguments); }
function AddressMatchService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = AddressMatchService_getPrototypeOf(object); if (object === null) break; } return object; }
function AddressMatchService_getPrototypeOf(o) { AddressMatchService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return AddressMatchService_getPrototypeOf(o); }
function AddressMatchService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) AddressMatchService_setPrototypeOf(subClass, superClass); }
function AddressMatchService_setPrototypeOf(o, p) { AddressMatchService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return AddressMatchService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class AddressMatchService
 * @deprecatedclass SuperMap.AddressMatchService
 * @category iServer AddressMatch
 * @classdesc 地址匹配服务类。此类提供了地址的正向匹配和反向匹配功能，正向匹配即通过地点名称关键词查找地址位置，反向匹配即根据位置坐标查询地点。
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var AddressMatchService_AddressMatchService = /*#__PURE__*/function (_CommonServiceBase) {
  AddressMatchService_inherits(AddressMatchService, _CommonServiceBase);
  function AddressMatchService(url, options) {
    var _this;
    AddressMatchService_classCallCheck(this, AddressMatchService);
    _this = AddressMatchService_callSuper(this, AddressMatchService, [url, options]);
    _this.options = options || {};
    _this.CLASS_NAME = 'SuperMap.AddressMatchService';
    return _this;
  }

  /**
   * @function AddressMatchService.prototype.destroy
   * @override
   */
  AddressMatchService_createClass(AddressMatchService, [{
    key: "destroy",
    value: function destroy() {
      AddressMatchService_get(AddressMatchService_getPrototypeOf(AddressMatchService.prototype), "destroy", this).call(this);
    }

    /**
     * @function AddressMatchService.prototype.code
     * @param {string} url - 正向地址匹配服务地址。
     * @param {GeoCodingParameter} params - 正向地址匹配服务参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "code",
    value: function code(url, params, callback) {
      if (!(params instanceof GeoCodingParameter)) {
        return;
      }
      return this.processAsync(url, params, callback);
    }

    /**
     * @function AddressMatchService.prototype.decode
     * @param {string} url - 反向地址匹配服务地址。
     * @param {GeoDecodingParameter} params - 反向地址匹配服务参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "decode",
    value: function decode(url, params, callback) {
      if (!(params instanceof GeoDecodingParameter)) {
        return;
      }
      return this.processAsync(url, params, callback);
    }

    /**
     * @function AddressMatchService.prototype.processAsync
     * @description 负责将客户端的动态分段服务参数传递到服务端。
     * @param {string} url - 服务地址。
     * @param {Object} params - 参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "processAsync",
    value: function processAsync(url, params, callback) {
      return this.request({
        method: 'GET',
        url: url,
        params: params,
        scope: this,
        success: callback,
        failure: callback
      });
    }
    /**
     * @function AddressMatchService.prototype.transformResult
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     * @description 状态完成时转换结果。
     */
  }, {
    key: "transformResult",
    value: function transformResult(result, options) {
      if (result.succeed) {
        delete result.succeed;
      }
      return {
        result: result,
        options: options
      };
    }
  }]);
  return AddressMatchService;
}(CommonServiceBase);
;// CONCATENATED MODULE: ./src/classic/services/AddressMatchService.js
function services_AddressMatchService_typeof(o) { "@babel/helpers - typeof"; return services_AddressMatchService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, services_AddressMatchService_typeof(o); }
function services_AddressMatchService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function services_AddressMatchService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, services_AddressMatchService_toPropertyKey(descriptor.key), descriptor); } }
function services_AddressMatchService_createClass(Constructor, protoProps, staticProps) { if (protoProps) services_AddressMatchService_defineProperties(Constructor.prototype, protoProps); if (staticProps) services_AddressMatchService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function services_AddressMatchService_toPropertyKey(t) { var i = services_AddressMatchService_toPrimitive(t, "string"); return "symbol" == services_AddressMatchService_typeof(i) ? i : String(i); }
function services_AddressMatchService_toPrimitive(t, r) { if ("object" != services_AddressMatchService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != services_AddressMatchService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function services_AddressMatchService_callSuper(t, o, e) { return o = services_AddressMatchService_getPrototypeOf(o), services_AddressMatchService_possibleConstructorReturn(t, services_AddressMatchService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], services_AddressMatchService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function services_AddressMatchService_possibleConstructorReturn(self, call) { if (call && (services_AddressMatchService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return services_AddressMatchService_assertThisInitialized(self); }
function services_AddressMatchService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function services_AddressMatchService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (services_AddressMatchService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function services_AddressMatchService_getPrototypeOf(o) { services_AddressMatchService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return services_AddressMatchService_getPrototypeOf(o); }
function services_AddressMatchService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) services_AddressMatchService_setPrototypeOf(subClass, superClass); }
function services_AddressMatchService_setPrototypeOf(o, p) { services_AddressMatchService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return services_AddressMatchService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.REST.AddressMatchService
 * @category  iServer AddressMatch
 * @classdesc 地址匹配服务类。此类提供了地址的正向匹配和反向匹配功能，正向匹配即通过地点名称关键词查找地址位置坐标，反向匹配即根据位置坐标查询地点。
 * @modulecategory Services
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
var AddressMatchService = /*#__PURE__*/function (_CommonServiceBase) {
  services_AddressMatchService_inherits(AddressMatchService, _CommonServiceBase);
  function AddressMatchService(url, options) {
    var _this;
    services_AddressMatchService_classCallCheck(this, AddressMatchService);
    _this = services_AddressMatchService_callSuper(this, AddressMatchService, [url, options]);
    _this.CLASS_NAME = "SuperMap.REST.AddressMatchService";
    return _this;
  }

  /**
   * @function SuperMap.REST.AddressMatchService.prototype.code
   * @description 正向匹配，即通过地点名称关键词查找地址位置坐标。
   * @param {GeoCodingParameter} params - 正向匹配参数。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  services_AddressMatchService_createClass(AddressMatchService, [{
    key: "code",
    value: function code(params, callback) {
      var me = this;
      var addressMatchService = new AddressMatchService_AddressMatchService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin
      });
      return addressMatchService.code(me.url + '/geocoding', params, callback);
    }

    /**
     * @function SuperMap.REST.AddressMatchService.prototype.decode
     * @description 反向匹配，即根据地址位置坐标查询地点。
     * @param {GeoDecodingParameter} params - 反向匹配参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "decode",
    value: function decode(params, callback) {
      var me = this;
      var addressMatchService = new AddressMatchService_AddressMatchService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin
      });
      return addressMatchService.decode(me.url + '/geodecoding', params, callback);
    }
  }]);
  return AddressMatchService;
}(CommonServiceBase);
SuperMap.REST.AddressMatchService = AddressMatchService;
;// CONCATENATED MODULE: ./src/common/iServer/DatasetService.js
function DatasetService_typeof(o) { "@babel/helpers - typeof"; return DatasetService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, DatasetService_typeof(o); }
function DatasetService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function DatasetService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, DatasetService_toPropertyKey(descriptor.key), descriptor); } }
function DatasetService_createClass(Constructor, protoProps, staticProps) { if (protoProps) DatasetService_defineProperties(Constructor.prototype, protoProps); if (staticProps) DatasetService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function DatasetService_toPropertyKey(t) { var i = DatasetService_toPrimitive(t, "string"); return "symbol" == DatasetService_typeof(i) ? i : String(i); }
function DatasetService_toPrimitive(t, r) { if ("object" != DatasetService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != DatasetService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function DatasetService_callSuper(t, o, e) { return o = DatasetService_getPrototypeOf(o), DatasetService_possibleConstructorReturn(t, DatasetService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], DatasetService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function DatasetService_possibleConstructorReturn(self, call) { if (call && (DatasetService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return DatasetService_assertThisInitialized(self); }
function DatasetService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (DatasetService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function DatasetService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function DatasetService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { DatasetService_get = Reflect.get.bind(); } else { DatasetService_get = function _get(target, property, receiver) { var base = DatasetService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return DatasetService_get.apply(this, arguments); }
function DatasetService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = DatasetService_getPrototypeOf(object); if (object === null) break; } return object; }
function DatasetService_getPrototypeOf(o) { DatasetService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return DatasetService_getPrototypeOf(o); }
function DatasetService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) DatasetService_setPrototypeOf(subClass, superClass); }
function DatasetService_setPrototypeOf(o, p) { DatasetService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return DatasetService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @class DatasetService
 * @deprecatedclass SuperMap.DatasetService
 * @category iServer Data Dataset
 * @classdesc 数据集查询服务。
 * @param {string} url - 服务的访问地址。如访问World Data服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {string}options.datasource - 数据源名称。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var DatasetService_DatasetService = /*#__PURE__*/function (_CommonServiceBase) {
  DatasetService_inherits(DatasetService, _CommonServiceBase);
  function DatasetService(url, options) {
    var _this;
    DatasetService_classCallCheck(this, DatasetService);
    _this = DatasetService_callSuper(this, DatasetService, [url, options]);
    if (!options) {
      return DatasetService_possibleConstructorReturn(_this);
    }
    /**
     * @member {string} DatasetService.prototype.datasource
     * @description 要查询的数据集所在的数据源名称。
     */
    _this.datasource = null;

    /**
     *  @member {string} DatasetService.prototype.dataset
     *  @description 要查询的数据集名称。
     */
    _this.dataset = null;
    if (options) {
      Util_Util.extend(DatasetService_assertThisInitialized(_this), options);
    }
    _this.CLASS_NAME = "SuperMap.DatasetService";
    return _this;
  }

  /**
   * @function DatasetService.prototype.destroy
   * @override
   */
  DatasetService_createClass(DatasetService, [{
    key: "destroy",
    value: function destroy() {
      DatasetService_get(DatasetService_getPrototypeOf(DatasetService.prototype), "destroy", this).call(this);
      var me = this;
      me.datasource = null;
      me.dataset = null;
    }

    /**
     * @function DatasetService.prototype.getDatasetsService
     * @description 执行服务，查询数据集服务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getDatasetsService",
    value: function getDatasetsService(params, callback) {
      var url = Util_Util.urlPathAppend(this.url, "datasources/name/".concat(params, "/datasets"));
      return this.processAsync(url, 'GET', callback);
    }

    /**
     * @function DatasetService.prototype.getDatasetService
     * @description 执行服务，查询数据集信息服务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getDatasetService",
    value: function getDatasetService(datasourceName, datasetName, callback) {
      var url = Util_Util.urlPathAppend(this.url, "datasources/name/".concat(datasourceName, "/datasets/name/").concat(datasetName));
      return this.processAsync(url, 'GET', callback);
    }

    /**
     * @function DatasetService.prototype.setDatasetService
     * @description 执行服务，更改数据集信息服务。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "setDatasetService",
    value: function setDatasetService(params, callback) {
      if (!params) {
        return;
      }
      var url = Util_Util.urlPathAppend(this.url, "datasources/name/".concat(params.datasourceName, "/datasets/name/").concat(params.datasetName));
      delete params.datasourceName;
      return this.processAsync(url, 'PUT', callback, params);
    }

    /**
    * @function DatasetService.prototype.deleteDatasetService
    * @description 执行服务，删除数据集信息服务。
    * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
    * @returns {Promise} Promise 对象。
    */
  }, {
    key: "deleteDatasetService",
    value: function deleteDatasetService(datasourceName, datasetName, callback) {
      var url = Util_Util.urlPathAppend(this.url, "datasources/name/".concat(datasourceName, "/datasets/name/").concat(datasetName));
      return this.processAsync(url, 'DELETE', callback);
    }
  }, {
    key: "processAsync",
    value: function processAsync(url, method, callback, params) {
      var me = this;
      var requestConfig = {
        url: url,
        method: method,
        scope: me,
        success: callback,
        failure: callback
      };
      params && (requestConfig.data = Util_Util.toJSON(params));
      return me.request(requestConfig);
    }
  }]);
  return DatasetService;
}(CommonServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/CreateDatasetParameters.js
function CreateDatasetParameters_typeof(o) { "@babel/helpers - typeof"; return CreateDatasetParameters_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, CreateDatasetParameters_typeof(o); }
function CreateDatasetParameters_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function CreateDatasetParameters_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, CreateDatasetParameters_toPropertyKey(descriptor.key), descriptor); } }
function CreateDatasetParameters_createClass(Constructor, protoProps, staticProps) { if (protoProps) CreateDatasetParameters_defineProperties(Constructor.prototype, protoProps); if (staticProps) CreateDatasetParameters_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function CreateDatasetParameters_toPropertyKey(t) { var i = CreateDatasetParameters_toPrimitive(t, "string"); return "symbol" == CreateDatasetParameters_typeof(i) ? i : String(i); }
function CreateDatasetParameters_toPrimitive(t, r) { if ("object" != CreateDatasetParameters_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != CreateDatasetParameters_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class CreateDatasetParameters
 * @deprecatedclass SuperMap.CreateDatasetParameters
 * @category iServer Data Dataset
 * @classdesc 数据集创建参数类。此类用于设置创建的数据集的名称、类型以及数据集所在的数据源等参数，
 * 可创建的数据集类型包括：点、线、面、文本、复合（CAD）和纯属性数据集。
 * @param {Object} options - 参数。
 * @param {string} options.datasourceName - 数据源名称，此为必设参数。
 * @param {string} options.datasetName - 数据集名称，此为必设参数。
 * @param {string} options.datasetType - 数据集类型。目前支持创建的数据集类型有：点、线、面、文本、复合（CAD）和属性数据集。
 * @usage
 */
var CreateDatasetParameters = /*#__PURE__*/function () {
  function CreateDatasetParameters(options) {
    CreateDatasetParameters_classCallCheck(this, CreateDatasetParameters);
    if (!options) {
      return;
    }

    /**
     * @member {string} CreateDatasetParameters.prototype.datasourceName
     * @description 数据源名称，此为必设参数。
     */
    this.datasourceName = null;

    /**
     * @member {string} CreateDatasetParameters.prototype.datasetName
     * @description 数据集名称，此为必设参数。
     */
    this.datasetName = null;

    /**
     * @member {string} CreateDatasetParameters.prototype.datasetType
     * @description 数据集类型。目前支持创建的数据集类型有：点、线、面、文本、复合（CAD）和属性数据集。
     */
    this.datasetType = null;
    if (options) {
      Util_Util.extend(this, options);
    }
    this.CLASS_NAME = "SuperMap.CreateDatasetParameters";
  }
  /**
   * @function CreateDatasetParameters.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  CreateDatasetParameters_createClass(CreateDatasetParameters, [{
    key: "destroy",
    value: function destroy() {
      var me = this;
      me.datasourceName = null;
      me.datasetName = null;
      me.datasetType = null;
    }
  }]);
  return CreateDatasetParameters;
}();
;// CONCATENATED MODULE: ./src/common/iServer/UpdateDatasetParameters.js
function UpdateDatasetParameters_typeof(o) { "@babel/helpers - typeof"; return UpdateDatasetParameters_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, UpdateDatasetParameters_typeof(o); }
function UpdateDatasetParameters_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function UpdateDatasetParameters_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, UpdateDatasetParameters_toPropertyKey(descriptor.key), descriptor); } }
function UpdateDatasetParameters_createClass(Constructor, protoProps, staticProps) { if (protoProps) UpdateDatasetParameters_defineProperties(Constructor.prototype, protoProps); if (staticProps) UpdateDatasetParameters_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function UpdateDatasetParameters_toPropertyKey(t) { var i = UpdateDatasetParameters_toPrimitive(t, "string"); return "symbol" == UpdateDatasetParameters_typeof(i) ? i : String(i); }
function UpdateDatasetParameters_toPrimitive(t, r) { if ("object" != UpdateDatasetParameters_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != UpdateDatasetParameters_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class UpdateDatasetParameters
 * @deprecatedclass SuperMap.UpdateDatasetParameters
 * @category iServer Data Dataset
 * @classdesc 数据集信息更改参数类。该类可用于更改数据集描述信息、投影坐标系等参数，
 * 还可以更改矢量数据集的字符集、影像数据集的颜色调色板、栅格数据集的缺省像元值等参数。
 * @param {Object} options - 参数。
 * @param {string} options.datasourceName - 数据源名称。
 * @param {string} options.datasetName - 数据集名称。
 * @param {boolean} options.isFileCache - 是否使用文件形式的缓存。仅对数据库型数据源中的矢量数据集有效。
 * @param {string} options.description - 数据集描述信息。
 * @param {string} options.prjCoordSys - 投影坐标系。
 * @param {Object} options.charset - 矢量数据集的字符集。当数据集类型为矢量数据集时，可以传递此参数。如果用户传递空值，则编码方式保持不变。
 * @param {Array.<string>} options.palette - 影像数据的颜色调色板。当数据集类型为影像数据集时，可以传递此参数。
 * @param {number} options.noValue - 栅格数据集中没有数据的像元的栅格值。当数据集类型为栅格数据集时，可以传递此参数。
 * @usage
 */
var UpdateDatasetParameters = /*#__PURE__*/function () {
  function UpdateDatasetParameters(options) {
    UpdateDatasetParameters_classCallCheck(this, UpdateDatasetParameters);
    if (!options) {
      return;
    }

    /**
     * @member {string} UpdateDatasetParameters.prototype.datasourceName
     * @description 数据源名称。
     */
    this.datasourceName = null;

    /**
     * @member {string} UpdateDatasetParameters.prototype.datasetName
     * @description 数据集名称。
     */
    this.datasetName = null;

    /**
     * @member {boolean} UpdateDatasetParameters.prototype.isFileCache
     * @description 是否使用文件形式的缓存。仅对数据库型数据源中的矢量数据集有效。
     */
    this.isFileCache = null;

    /**
     * @member {string} UpdateDatasetParameters.prototype.description
     * @description 数据集描述信息。
     */
    this.description = null;

    /**
     * @member {string} UpdateDatasetParameters.prototype.prjCoordSys
     * @description 投影坐标系。
     */
    this.prjCoordSys = null;

    /**
     * @member {Object} UpdateDatasetParameters.prototype.charset
     * @description 矢量数据集的字符集。
     */
    this.charset = null;

    /**
     * @member {Array.<string>} UpdateDatasetParameters.prototype.palette
     * @description 影像数据的颜色调色板。
     */
    this.palette = null;

    /**
     * @member {number} UpdateDatasetParameters.prototype.noValue
     * @description 栅格数据集中没有数据的像元的栅格值。
     */
    this.noValue = null;
    if (options) {
      Util_Util.extend(this, options);
    }
    this.CLASS_NAME = "SuperMap.UpdateDatasetParameters";
  }

  /**
   * @function UpdateDatasetParameters.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  UpdateDatasetParameters_createClass(UpdateDatasetParameters, [{
    key: "destroy",
    value: function destroy() {
      var me = this;
      me.datasourceName = null;
      me.datasetName = null;
      me.isFileCache = null;
      me.prjCoordSys = null;
      me.charset = null;
      me.palette = null;
      me.noValue = null;
    }
  }]);
  return UpdateDatasetParameters;
}();
;// CONCATENATED MODULE: ./src/classic/services/DatasetService.js
function services_DatasetService_typeof(o) { "@babel/helpers - typeof"; return services_DatasetService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, services_DatasetService_typeof(o); }
function services_DatasetService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function services_DatasetService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, services_DatasetService_toPropertyKey(descriptor.key), descriptor); } }
function services_DatasetService_createClass(Constructor, protoProps, staticProps) { if (protoProps) services_DatasetService_defineProperties(Constructor.prototype, protoProps); if (staticProps) services_DatasetService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function services_DatasetService_toPropertyKey(t) { var i = services_DatasetService_toPrimitive(t, "string"); return "symbol" == services_DatasetService_typeof(i) ? i : String(i); }
function services_DatasetService_toPrimitive(t, r) { if ("object" != services_DatasetService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != services_DatasetService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function services_DatasetService_callSuper(t, o, e) { return o = services_DatasetService_getPrototypeOf(o), services_DatasetService_possibleConstructorReturn(t, services_DatasetService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], services_DatasetService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function services_DatasetService_possibleConstructorReturn(self, call) { if (call && (services_DatasetService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return services_DatasetService_assertThisInitialized(self); }
function services_DatasetService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (services_DatasetService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function services_DatasetService_getPrototypeOf(o) { services_DatasetService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return services_DatasetService_getPrototypeOf(o); }
function services_DatasetService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function services_DatasetService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) services_DatasetService_setPrototypeOf(subClass, superClass); }
function services_DatasetService_setPrototypeOf(o, p) { services_DatasetService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return services_DatasetService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/






/**
 * @class SuperMap.REST.DatasetService
 * @category  iServer Data Dataset
 * @classdesc 数据集信息服务类。提供方法：查询数据集集合、查询指定数据集信息，在指定数据源下新增、修改、删除数据集等。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
var DatasetService = /*#__PURE__*/function (_CommonServiceBase) {
  services_DatasetService_inherits(DatasetService, _CommonServiceBase);
  function DatasetService(url, options) {
    var _this;
    services_DatasetService_classCallCheck(this, DatasetService);
    _this = services_DatasetService_callSuper(this, DatasetService, [url, options]);
    var me = services_DatasetService_assertThisInitialized(_this);
    _this._datasetService = new DatasetService_DatasetService(me.url, {
      proxy: me.proxy,
      withCredentials: me.withCredentials,
      crossOrigin: me.crossOrigin,
      headers: me.headers
    });
    _this.CLASS_NAME = "SuperMap.REST.DatasetService";
    return _this;
  }

  /**
   * @function SuperMap.REST.DatasetService.prototype.getDatasets
   * @description 数据集集合查询服务。
   * @example
   *   new SuperMap.REST.DatasetService(url).getDatasets(datasourceName,function(result){
   *     //doSomething
   *   });
   * @param {string} datasourceName - 数据源名称。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  services_DatasetService_createClass(DatasetService, [{
    key: "getDatasets",
    value: function getDatasets(datasourceName, callback) {
      if (!datasourceName) {
        return;
      }
      return this._datasetService.getDatasetsService(datasourceName, callback);
    }

    /**
     * @function SuperMap.REST.DatasetService.prototype.getDataset
     * @description 数据集信息查询服务。
     * @example
     *   new SuperMap.REST.DatasetService(url).getDataset(datasourceName, datasetName, function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {string} datasetName - 数据集名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getDataset",
    value: function getDataset(datasourceName, datasetName, callback) {
      if (!datasourceName || !datasetName) {
        return;
      }
      return this._datasetService.getDatasetService(datasourceName, datasetName, callback);
    }

    /**
     * @function SuperMap.REST.DatasetService.prototype.setDataset
     * @description 数据集信息设置服务。可实现修改已存在数据集，新增不存在数据集。
     * @example
     *   new SuperMap.REST.DatasetService(url).setDataset(params, function(result){
     *     //doSomething
     *   });
     * @param {CreateDatasetParameters | UpdateDatasetParameters } params - 数据集创建参数类或数据集信息更改参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "setDataset",
    value: function setDataset(params, callback) {
      if (!(params instanceof CreateDatasetParameters) && !(params instanceof UpdateDatasetParameters)) {
        return;
      }
      var datasetParams;
      if (params instanceof CreateDatasetParameters) {
        datasetParams = {
          "datasetType": params.datasetType,
          "datasourceName": params.datasourceName,
          "datasetName": params.datasetName
        };
      } else if (params instanceof UpdateDatasetParameters) {
        datasetParams = {
          "datasetName": params.datasetName,
          "datasourceName": params.datasourceName,
          "isFileCache": params.isFileCache,
          "description": params.description,
          "prjCoordSys": params.prjCoordSys,
          "charset": params.charset
        };
      }
      return this._datasetService.setDatasetService(datasetParams, callback);
    }

    /**
     * @function SuperMap.REST.DatasetService.prototype.deleteDataset
     * @description 指定数据源下的数据集删除服务。
     * @example
     *   new SuperMap.REST.DatasetService(url).deleteDataset(datasourceName, datasetName, function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {string} datasetName - 数据集名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "deleteDataset",
    value: function deleteDataset(datasourceName, datasetName, callback) {
      return this._datasetService.deleteDatasetService(datasourceName, datasetName, callback);
    }
  }]);
  return DatasetService;
}(CommonServiceBase);
SuperMap.REST.DatasetService = DatasetService;
;// CONCATENATED MODULE: ./src/common/iServer/DatasourceService.js
function DatasourceService_typeof(o) { "@babel/helpers - typeof"; return DatasourceService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, DatasourceService_typeof(o); }
function DatasourceService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function DatasourceService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, DatasourceService_toPropertyKey(descriptor.key), descriptor); } }
function DatasourceService_createClass(Constructor, protoProps, staticProps) { if (protoProps) DatasourceService_defineProperties(Constructor.prototype, protoProps); if (staticProps) DatasourceService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function DatasourceService_toPropertyKey(t) { var i = DatasourceService_toPrimitive(t, "string"); return "symbol" == DatasourceService_typeof(i) ? i : String(i); }
function DatasourceService_toPrimitive(t, r) { if ("object" != DatasourceService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != DatasourceService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function DatasourceService_callSuper(t, o, e) { return o = DatasourceService_getPrototypeOf(o), DatasourceService_possibleConstructorReturn(t, DatasourceService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], DatasourceService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function DatasourceService_possibleConstructorReturn(self, call) { if (call && (DatasourceService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return DatasourceService_assertThisInitialized(self); }
function DatasourceService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (DatasourceService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function DatasourceService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function DatasourceService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { DatasourceService_get = Reflect.get.bind(); } else { DatasourceService_get = function _get(target, property, receiver) { var base = DatasourceService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return DatasourceService_get.apply(this, arguments); }
function DatasourceService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = DatasourceService_getPrototypeOf(object); if (object === null) break; } return object; }
function DatasourceService_getPrototypeOf(o) { DatasourceService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return DatasourceService_getPrototypeOf(o); }
function DatasourceService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) DatasourceService_setPrototypeOf(subClass, superClass); }
function DatasourceService_setPrototypeOf(o, p) { DatasourceService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return DatasourceService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @class DatasourceService
 * @deprecatedclass SuperMap.DatasourceService
 * @category iServer Data Datasource
 * @classdesc 数据源查询服务类。
 * @param {string} url - 服务地址。如访问World Data服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {string} options.datasource - 要查询的数据集所在的数据源名称。
 * @param {string} options.dataset - 要查询的数据集名称。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @usage
 */

var DatasourceService_DatasourceService = /*#__PURE__*/function (_CommonServiceBase) {
  DatasourceService_inherits(DatasourceService, _CommonServiceBase);
  function DatasourceService(url, options) {
    var _this;
    DatasourceService_classCallCheck(this, DatasourceService);
    _this = DatasourceService_callSuper(this, DatasourceService, [url, options]);
    if (options) {
      Util_Util.extend(DatasourceService_assertThisInitialized(_this), options);
    }
    _this.CLASS_NAME = "SuperMap.DatasourceService";
    return _this;
  }

  /**
   * @function DatasourceService.prototype.destroy
   * @override
   */
  DatasourceService_createClass(DatasourceService, [{
    key: "destroy",
    value: function destroy() {
      DatasourceService_get(DatasourceService_getPrototypeOf(DatasourceService.prototype), "destroy", this).call(this);
    }

    /**
     * @function DatasourceService.prototype.getDatasourceService
     * @description 获取指定数据源信息。
     * @param {string} datasourceName - 数据源名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getDatasourceService",
    value: function getDatasourceService(datasourceName, callback) {
      var url = Util_Util.urlPathAppend(this.url, "datasources/name/".concat(datasourceName));
      return this.processAsync(url, "GET", callback);
    }

    /**
     * @function DatasourceService.prototype.getDatasourcesService
     * @description 获取所有数据源信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getDatasourcesService",
    value: function getDatasourcesService(callback) {
      var url = Util_Util.urlPathAppend(this.url, "datasources");
      return this.processAsync(url, "GET", callback);
    }
    /**
     * @function DatasourceService.prototype.setDatasourceService
     * @description 更新数据源信息。
     * @param {Object} params 请求参数信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "setDatasourceService",
    value: function setDatasourceService(params, callback) {
      if (!params) {
        return;
      }
      var url = Util_Util.urlPathAppend(this.url, "datasources/name/".concat(params.datasourceName));
      return this.processAsync(url, "PUT", callback, params);
    }
  }, {
    key: "processAsync",
    value: function processAsync(url, method, callback, params) {
      var me = this;
      var requestConfig = {
        url: url,
        method: method,
        scope: me,
        success: callback,
        failure: callback
      };
      params && (requestConfig.data = Util_Util.toJSON(params));
      return me.request(requestConfig);
    }
  }]);
  return DatasourceService;
}(CommonServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/SetDatasourceParameters.js
function SetDatasourceParameters_typeof(o) { "@babel/helpers - typeof"; return SetDatasourceParameters_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SetDatasourceParameters_typeof(o); }
function SetDatasourceParameters_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SetDatasourceParameters_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SetDatasourceParameters_toPropertyKey(descriptor.key), descriptor); } }
function SetDatasourceParameters_createClass(Constructor, protoProps, staticProps) { if (protoProps) SetDatasourceParameters_defineProperties(Constructor.prototype, protoProps); if (staticProps) SetDatasourceParameters_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SetDatasourceParameters_toPropertyKey(t) { var i = SetDatasourceParameters_toPrimitive(t, "string"); return "symbol" == SetDatasourceParameters_typeof(i) ? i : String(i); }
function SetDatasourceParameters_toPrimitive(t, r) { if ("object" != SetDatasourceParameters_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SetDatasourceParameters_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class SetDatasourceParameters
 * @deprecatedclass SuperMap.SetDatasourceParameters
 * @category iServer Data Datasource
 * @classdesc 设置数据源信息参数类。此类用于设置数据源的名称、描述信息、坐标单位、距离单位等参数。
 * @param {Object} options - 参数。
 * @param {string} options.datasourceName - 数据源名称。
 * @param {string} options.description - 数据源描述信息。
 * @param {string} options.coordUnit - 坐标单位。
 * @param {string} options.distanceUnit - 距离单位。
 * @usage
 */
var SetDatasourceParameters = /*#__PURE__*/function () {
  function SetDatasourceParameters(options) {
    SetDatasourceParameters_classCallCheck(this, SetDatasourceParameters);
    if (!options) {
      return;
    }

    /**
     * @member {string} SetDatasourceParameters.prototype.datasourceName
     * @description 数据源名称。
     */
    this.datasourceName = null;

    /**
     * @member {string} SetDatasourceParameters.prototype.description
     * @description 数据源描述信息。
     */
    this.description = null;

    /**
     * @member {string} SetDatasourceParameters.prototype.coordUnit
     * @description 坐标单位。
     */
    this.coordUnit = null;

    /**
     * @member {string} SetDatasourceParameters.prototype.distanceUnit
     * @description 距离单位。
     */
    this.distanceUnit = null;
    if (options) {
      Util_Util.extend(this, options);
    }
    this.CLASS_NAME = "SuperMap.SetDatasourceParameters";
  }

  /**
   * @function SetDatasourceParameters.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  SetDatasourceParameters_createClass(SetDatasourceParameters, [{
    key: "destroy",
    value: function destroy() {
      var me = this;
      me.datasourceName = null;
      me.description = null;
      me.coordUnit = null;
      me.distanceUnit = null;
    }
  }]);
  return SetDatasourceParameters;
}();
;// CONCATENATED MODULE: ./src/classic/services/DatasourceService.js
function services_DatasourceService_typeof(o) { "@babel/helpers - typeof"; return services_DatasourceService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, services_DatasourceService_typeof(o); }
function services_DatasourceService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function services_DatasourceService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, services_DatasourceService_toPropertyKey(descriptor.key), descriptor); } }
function services_DatasourceService_createClass(Constructor, protoProps, staticProps) { if (protoProps) services_DatasourceService_defineProperties(Constructor.prototype, protoProps); if (staticProps) services_DatasourceService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function services_DatasourceService_toPropertyKey(t) { var i = services_DatasourceService_toPrimitive(t, "string"); return "symbol" == services_DatasourceService_typeof(i) ? i : String(i); }
function services_DatasourceService_toPrimitive(t, r) { if ("object" != services_DatasourceService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != services_DatasourceService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function services_DatasourceService_callSuper(t, o, e) { return o = services_DatasourceService_getPrototypeOf(o), services_DatasourceService_possibleConstructorReturn(t, services_DatasourceService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], services_DatasourceService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function services_DatasourceService_possibleConstructorReturn(self, call) { if (call && (services_DatasourceService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return services_DatasourceService_assertThisInitialized(self); }
function services_DatasourceService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (services_DatasourceService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function services_DatasourceService_getPrototypeOf(o) { services_DatasourceService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return services_DatasourceService_getPrototypeOf(o); }
function services_DatasourceService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function services_DatasourceService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) services_DatasourceService_setPrototypeOf(subClass, superClass); }
function services_DatasourceService_setPrototypeOf(o, p) { services_DatasourceService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return services_DatasourceService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.REST.DatasourceService
 * @category  iServer Data Datasource
 * @classdesc 数据源服务类。提供方法：查询数据源集合、查询指定数据源信息、设置指定数据源信息。
 * 可以获取的数据源信息包括数据源名称、数据源描述、引擎类型、距离单位、坐标单位、投影信息等。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
var DatasourceService = /*#__PURE__*/function (_CommonServiceBase) {
  services_DatasourceService_inherits(DatasourceService, _CommonServiceBase);
  function DatasourceService(url, options) {
    var _this;
    services_DatasourceService_classCallCheck(this, DatasourceService);
    _this = services_DatasourceService_callSuper(this, DatasourceService, [url, options]);
    var me = services_DatasourceService_assertThisInitialized(_this);
    _this._datasourceService = new DatasourceService_DatasourceService(me.url, {
      proxy: me.proxy,
      withCredentials: me.withCredentials,
      crossOrigin: me.crossOrigin,
      headers: me.headers
    });
    _this.CLASS_NAME = "SuperMap.REST.DatasourceService";
    return _this;
  }

  /**
   * @function SuperMap.REST.DatasourceService.prototype.getDatasources
   * @description 数据源集合查询服务。
   * @example
   *   new SuperMap.REST.DatasourceService(url).getDatasources(function(result){
   *     //doSomething
   *   });
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  services_DatasourceService_createClass(DatasourceService, [{
    key: "getDatasources",
    value: function getDatasources(callback) {
      return this._datasourceService.getDatasourcesService(callback);
    }

    /**
     * @function SuperMap.REST.DatasourceService.prototype.getDatasource
     * @description 数据源信息查询服务。
     * @example
     *   new SuperMap.REST.DatasourceService(url).getDatasource(datasourceName,function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getDatasource",
    value: function getDatasource(datasourceName, callback) {
      if (!datasourceName) {
        return;
      }
      return this._datasourceService.getDatasourceService(datasourceName, callback);
    }

    /**
      * @function SuperMap.REST.DatasourceService.prototype.setDatasource
      * @description 数据源信息设置服务。可实现更改当前数据源信息。
      * @example
      *  new SuperMap.REST.DatasourceService(url).setDatasource(params, function(result){
      *     //doSomething
      *   });
      * @param {SetDatasourceParameters} params - 数据源信息查询参数类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @returns {Promise} Promise 对象。
      */
  }, {
    key: "setDatasource",
    value: function setDatasource(params, callback) {
      if (!(params instanceof SetDatasourceParameters)) {
        return;
      }
      var datasourceParams = {
        description: params.description,
        coordUnit: params.coordUnit,
        distanceUnit: params.distanceUnit,
        datasourceName: params.datasourceName
      };
      return this._datasourceService.setDatasourceService(datasourceParams, callback);
    }
  }]);
  return DatasourceService;
}(CommonServiceBase);
SuperMap.REST.DatasourceService = DatasourceService;
;// CONCATENATED MODULE: ./src/common/iServer/ProcessingServiceBase.js
function ProcessingServiceBase_typeof(o) { "@babel/helpers - typeof"; return ProcessingServiceBase_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ProcessingServiceBase_typeof(o); }
function ProcessingServiceBase_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function ProcessingServiceBase_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, ProcessingServiceBase_toPropertyKey(descriptor.key), descriptor); } }
function ProcessingServiceBase_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProcessingServiceBase_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProcessingServiceBase_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ProcessingServiceBase_toPropertyKey(t) { var i = ProcessingServiceBase_toPrimitive(t, "string"); return "symbol" == ProcessingServiceBase_typeof(i) ? i : String(i); }
function ProcessingServiceBase_toPrimitive(t, r) { if ("object" != ProcessingServiceBase_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ProcessingServiceBase_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function ProcessingServiceBase_callSuper(t, o, e) { return o = ProcessingServiceBase_getPrototypeOf(o), ProcessingServiceBase_possibleConstructorReturn(t, ProcessingServiceBase_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ProcessingServiceBase_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function ProcessingServiceBase_possibleConstructorReturn(self, call) { if (call && (ProcessingServiceBase_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return ProcessingServiceBase_assertThisInitialized(self); }
function ProcessingServiceBase_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function ProcessingServiceBase_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (ProcessingServiceBase_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ProcessingServiceBase_get() { if (typeof Reflect !== "undefined" && Reflect.get) { ProcessingServiceBase_get = Reflect.get.bind(); } else { ProcessingServiceBase_get = function _get(target, property, receiver) { var base = ProcessingServiceBase_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return ProcessingServiceBase_get.apply(this, arguments); }
function ProcessingServiceBase_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = ProcessingServiceBase_getPrototypeOf(object); if (object === null) break; } return object; }
function ProcessingServiceBase_getPrototypeOf(o) { ProcessingServiceBase_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ProcessingServiceBase_getPrototypeOf(o); }
function ProcessingServiceBase_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) ProcessingServiceBase_setPrototypeOf(subClass, superClass); }
function ProcessingServiceBase_setPrototypeOf(o, p) { ProcessingServiceBase_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ProcessingServiceBase_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class ProcessingServiceBase
 * @deprecatedclass SuperMap.ProcessingServiceBase
 * @category  iServer Core
 * @classdesc 分布式分析服务基类。分布式分析服务采用了分布式计算技术，可对超大体量空间数据集进行分布式空间分析和数据处理。
 * 提供方法：缓冲区分析任务、核密度分析任务、叠加分析任务、单对象空间查询任务、点聚合分析任务、区域汇总分析任务、
 * 拓扑检查分析任务、矢量裁剪分析任务等。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Events} options.events - 处理所有事件的对象。
 * @param {number} options.index - 服务访问地址在数组中的位置。
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var ProcessingServiceBase = /*#__PURE__*/function (_CommonServiceBase) {
  ProcessingServiceBase_inherits(ProcessingServiceBase, _CommonServiceBase);
  function ProcessingServiceBase(url, options) {
    var _this;
    ProcessingServiceBase_classCallCheck(this, ProcessingServiceBase);
    options = options || {};
    _this = ProcessingServiceBase_callSuper(this, ProcessingServiceBase, [url, options]);
    _this.CLASS_NAME = "SuperMap.ProcessingServiceBase";
    return _this;
  }

  /**
   * @function ProcessingServiceBase.prototype.destroy
   * @override
   */
  ProcessingServiceBase_createClass(ProcessingServiceBase, [{
    key: "destroy",
    value: function destroy() {
      ProcessingServiceBase_get(ProcessingServiceBase_getPrototypeOf(ProcessingServiceBase.prototype), "destroy", this).call(this);
    }

    /**
     * @function ProcessingServiceBase.prototype.getJobs
     * @description 获取分布式分析任务。
     * @param {string} url - 资源地址。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getJobs",
    value: function getJobs(url, callback) {
      var me = this;
      return FetchRequest.get(SecurityManager.appendCredential(url), null, {
        proxy: me.proxy
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        var res = {
          result: result,
          object: me,
          type: 'processCompleted'
        };
        callback(res);
        return res;
      })["catch"](function (e) {
        var res = {
          error: e,
          object: me,
          type: 'processFailed'
        };
        callback(res);
        return res;
      });
    }

    /**
     * @function ProcessingServiceBase.prototype.addJob
     * @description 添加分布式分析任务。
     * @param {string} url - 资源根地址。
     * @param {Object} params - 创建一个空间分析的请求参数。
     * @param {string} paramType - 请求参数类型。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addJob",
    value: function addJob(url, params, paramType, seconds, callback, processRunningCallback) {
      var me = this,
        parameterObject = null;
      if (params && params instanceof paramType) {
        parameterObject = new Object();
        paramType.toObject(params, parameterObject);
      }
      var headers = Object.assign({
        'Content-Type': 'application/x-www-form-urlencoded'
      }, me.headers || {});
      var options = {
        proxy: me.proxy,
        headers: headers,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        isInTheSameDomain: me.isInTheSameDomain
      };
      return FetchRequest.post(SecurityManager.appendCredential(url), JSON.stringify(parameterObject), options).then(function (response) {
        return response.json();
      }).then(function (result) {
        if (result.succeed) {
          return me.transformResult(result, seconds, callback, processRunningCallback);
        } else {
          result = me.transformErrorResult(result);
          result.options = me;
          result.type = 'processFailed';
          callback(result);
          return result;
        }
      })["catch"](function (e) {
        e = me.transformErrorResult({
          error: e
        });
        e.options = me;
        e.type = 'processFailed';
        callback(e);
        return e;
      });
    }
  }, {
    key: "transformResult",
    value: function transformResult(result, seconds, callback, processRunningCallback) {
      result = Util_Util.transformResult(result);
      seconds = seconds || 1000;
      var me = this;
      if (result) {
        return new Promise(function (resolve) {
          var id = setInterval(function () {
            FetchRequest.get(SecurityManager.appendCredential(result.newResourceLocation), {
              _t: new Date().getTime()
            }).then(function (response) {
              return response.json();
            }).then(function (job) {
              resolve({
                object: me,
                id: job.id,
                state: job.state
              });
              processRunningCallback({
                id: job.id,
                state: job.state,
                object: me
              });
              if (job.state.runState === 'LOST' || job.state.runState === 'KILLED' || job.state.runState === 'FAILED') {
                clearInterval(id);
                var res = {
                  error: job.state.errorMsg,
                  state: job.state.runState,
                  object: me,
                  type: 'processFailed'
                };
                resolve(res);
                callback(res);
              }
              if (job.state.runState === 'FINISHED' && job.setting.serviceInfo) {
                clearInterval(id);
                var _res = {
                  result: job,
                  object: me,
                  type: 'processCompleted'
                };
                resolve(_res);
                callback(_res);
              }
            })["catch"](function (e) {
              clearInterval(id);
              var res = {
                error: e,
                object: me,
                type: 'processFailed'
              };
              resolve(res);
              callback(res);
            });
          }, seconds);
        });
      }
    }
  }]);
  return ProcessingServiceBase;
}(CommonServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/KernelDensityJobsService.js
function KernelDensityJobsService_typeof(o) { "@babel/helpers - typeof"; return KernelDensityJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, KernelDensityJobsService_typeof(o); }
function KernelDensityJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function KernelDensityJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, KernelDensityJobsService_toPropertyKey(descriptor.key), descriptor); } }
function KernelDensityJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) KernelDensityJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) KernelDensityJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function KernelDensityJobsService_toPropertyKey(t) { var i = KernelDensityJobsService_toPrimitive(t, "string"); return "symbol" == KernelDensityJobsService_typeof(i) ? i : String(i); }
function KernelDensityJobsService_toPrimitive(t, r) { if ("object" != KernelDensityJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != KernelDensityJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function KernelDensityJobsService_callSuper(t, o, e) { return o = KernelDensityJobsService_getPrototypeOf(o), KernelDensityJobsService_possibleConstructorReturn(t, KernelDensityJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], KernelDensityJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function KernelDensityJobsService_possibleConstructorReturn(self, call) { if (call && (KernelDensityJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return KernelDensityJobsService_assertThisInitialized(self); }
function KernelDensityJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function KernelDensityJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (KernelDensityJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function KernelDensityJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { KernelDensityJobsService_get = Reflect.get.bind(); } else { KernelDensityJobsService_get = function _get(target, property, receiver) { var base = KernelDensityJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return KernelDensityJobsService_get.apply(this, arguments); }
function KernelDensityJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = KernelDensityJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function KernelDensityJobsService_getPrototypeOf(o) { KernelDensityJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return KernelDensityJobsService_getPrototypeOf(o); }
function KernelDensityJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) KernelDensityJobsService_setPrototypeOf(subClass, superClass); }
function KernelDensityJobsService_setPrototypeOf(o, p) { KernelDensityJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return KernelDensityJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class KernelDensityJobsService
 * @deprecatedclass SuperMap.KernelDensityJobsService
 * @category  iServer ProcessingService DensityAnalyst
 * @classdesc 核密度分析服务类。核密度分析是指使用核函数来计算点或线邻域范围内的每单位面积量值。
 * 其结果是中间值大周边值小的光滑曲面，在邻域边界处降为 0。<br>
 * 对于点对象，其核密度曲面与下方的平面所围成的空间的体积近似于此点的测量值；<br>
 * 对于线对象，其核密度曲面与下方的平面所围成的空间的体积近似于此线的测量值与线长度的乘积。<br>
 * 点或线的邻域叠加处，其密度值也相加。每个输出栅格的密度均为叠加在栅格上的所有核曲面值之和。    
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var KernelDensityJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  KernelDensityJobsService_inherits(KernelDensityJobsService, _ProcessingServiceBas);
  function KernelDensityJobsService(url, options) {
    var _this;
    KernelDensityJobsService_classCallCheck(this, KernelDensityJobsService);
    _this = KernelDensityJobsService_callSuper(this, KernelDensityJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/density');
    _this.CLASS_NAME = "SuperMap.KernelDensityJobsService";
    return _this;
  }

  /**
   * @function KernelDensityJobsService.prototype.destroy
   * @override
   */
  KernelDensityJobsService_createClass(KernelDensityJobsService, [{
    key: "destroy",
    value: function destroy() {
      KernelDensityJobsService_get(KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取核密度分析任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getKernelDensityJobs",
    value: function getKernelDensityJobs(callback) {
      return KernelDensityJobsService_get(KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取指定 ID 的核密度分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getKernelDensityJob",
    value: function getKernelDensityJob(id, callback) {
      return KernelDensityJobsService_get(KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function KernelDensityJobsService.prototype.addKernelDensityJob
     * @description 新建核密度分析任务。
     * @param {KernelDensityJobParameter} params - 核密度分析任务参数类。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addKernelDensityJob",
    value: function addKernelDensityJob(params, seconds, callback, processRunningCallback) {
      return KernelDensityJobsService_get(KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService.prototype), "addJob", this).call(this, this.url, params, KernelDensityJobParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return KernelDensityJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/SingleObjectQueryJobsService.js
function SingleObjectQueryJobsService_typeof(o) { "@babel/helpers - typeof"; return SingleObjectQueryJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SingleObjectQueryJobsService_typeof(o); }
function SingleObjectQueryJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SingleObjectQueryJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SingleObjectQueryJobsService_toPropertyKey(descriptor.key), descriptor); } }
function SingleObjectQueryJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) SingleObjectQueryJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) SingleObjectQueryJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SingleObjectQueryJobsService_toPropertyKey(t) { var i = SingleObjectQueryJobsService_toPrimitive(t, "string"); return "symbol" == SingleObjectQueryJobsService_typeof(i) ? i : String(i); }
function SingleObjectQueryJobsService_toPrimitive(t, r) { if ("object" != SingleObjectQueryJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SingleObjectQueryJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function SingleObjectQueryJobsService_callSuper(t, o, e) { return o = SingleObjectQueryJobsService_getPrototypeOf(o), SingleObjectQueryJobsService_possibleConstructorReturn(t, SingleObjectQueryJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], SingleObjectQueryJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function SingleObjectQueryJobsService_possibleConstructorReturn(self, call) { if (call && (SingleObjectQueryJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return SingleObjectQueryJobsService_assertThisInitialized(self); }
function SingleObjectQueryJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function SingleObjectQueryJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (SingleObjectQueryJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function SingleObjectQueryJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { SingleObjectQueryJobsService_get = Reflect.get.bind(); } else { SingleObjectQueryJobsService_get = function _get(target, property, receiver) { var base = SingleObjectQueryJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return SingleObjectQueryJobsService_get.apply(this, arguments); }
function SingleObjectQueryJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SingleObjectQueryJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function SingleObjectQueryJobsService_getPrototypeOf(o) { SingleObjectQueryJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SingleObjectQueryJobsService_getPrototypeOf(o); }
function SingleObjectQueryJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) SingleObjectQueryJobsService_setPrototypeOf(subClass, superClass); }
function SingleObjectQueryJobsService_setPrototypeOf(o, p) { SingleObjectQueryJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SingleObjectQueryJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SingleObjectQueryJobsService
 * @deprecatedclass SuperMap.SingleObjectQueryJobsService
 * @category  iServer ProcessingService Query
 * @classdesc 单对象空间查询分析服务类。空间查询是通过几何对象之间的空间位置关系来构建过滤条件的一种查询方式。例如：通过空间查询可以找到被包含在面中的空间对象，相离或者相邻的空间对象等。<br>
 * 分布式分析服务中的单对象空间查询，指的是只支持查询对象数据集中有一个对象对被查询数据集做空间查询。如果查询对象数据集中有多个对象，则默认用 SmID 最小的对象对被查询数据集做空间查询。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var SingleObjectQueryJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  SingleObjectQueryJobsService_inherits(SingleObjectQueryJobsService, _ProcessingServiceBas);
  function SingleObjectQueryJobsService(url, options) {
    var _this;
    SingleObjectQueryJobsService_classCallCheck(this, SingleObjectQueryJobsService);
    _this = SingleObjectQueryJobsService_callSuper(this, SingleObjectQueryJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/query');
    _this.CLASS_NAME = 'SuperMap.SingleObjectQueryJobsService';
    return _this;
  }

  /**
   *@override
   */
  SingleObjectQueryJobsService_createClass(SingleObjectQueryJobsService, [{
    key: "destroy",
    value: function destroy() {
      SingleObjectQueryJobsService_get(SingleObjectQueryJobsService_getPrototypeOf(SingleObjectQueryJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function SingleObjectQueryJobsService.protitype.getQueryJobs
     * @description 获取单对象空间查询分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getQueryJobs",
    value: function getQueryJobs(callback) {
      return SingleObjectQueryJobsService_get(SingleObjectQueryJobsService_getPrototypeOf(SingleObjectQueryJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.protitype.getQueryJob
     * @description 获取指定 ID 的单对象空间查询分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getQueryJob",
    value: function getQueryJob(id, callback) {
      return SingleObjectQueryJobsService_get(SingleObjectQueryJobsService_getPrototypeOf(SingleObjectQueryJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SingleObjectQueryJobsService.protitype.addQueryJob
     * @description 新建单对象空间查询分析服务。
     * @param {SingleObjectQueryJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addQueryJob",
    value: function addQueryJob(params, seconds, callback, processRunningCallback) {
      return SingleObjectQueryJobsService_get(SingleObjectQueryJobsService_getPrototypeOf(SingleObjectQueryJobsService.prototype), "addJob", this).call(this, this.url, params, SingleObjectQueryJobsParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return SingleObjectQueryJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/SummaryMeshJobsService.js
function SummaryMeshJobsService_typeof(o) { "@babel/helpers - typeof"; return SummaryMeshJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SummaryMeshJobsService_typeof(o); }
function SummaryMeshJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SummaryMeshJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SummaryMeshJobsService_toPropertyKey(descriptor.key), descriptor); } }
function SummaryMeshJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryMeshJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryMeshJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SummaryMeshJobsService_toPropertyKey(t) { var i = SummaryMeshJobsService_toPrimitive(t, "string"); return "symbol" == SummaryMeshJobsService_typeof(i) ? i : String(i); }
function SummaryMeshJobsService_toPrimitive(t, r) { if ("object" != SummaryMeshJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SummaryMeshJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function SummaryMeshJobsService_callSuper(t, o, e) { return o = SummaryMeshJobsService_getPrototypeOf(o), SummaryMeshJobsService_possibleConstructorReturn(t, SummaryMeshJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], SummaryMeshJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function SummaryMeshJobsService_possibleConstructorReturn(self, call) { if (call && (SummaryMeshJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return SummaryMeshJobsService_assertThisInitialized(self); }
function SummaryMeshJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function SummaryMeshJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (SummaryMeshJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function SummaryMeshJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { SummaryMeshJobsService_get = Reflect.get.bind(); } else { SummaryMeshJobsService_get = function _get(target, property, receiver) { var base = SummaryMeshJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return SummaryMeshJobsService_get.apply(this, arguments); }
function SummaryMeshJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SummaryMeshJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function SummaryMeshJobsService_getPrototypeOf(o) { SummaryMeshJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SummaryMeshJobsService_getPrototypeOf(o); }
function SummaryMeshJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) SummaryMeshJobsService_setPrototypeOf(subClass, superClass); }
function SummaryMeshJobsService_setPrototypeOf(o, p) { SummaryMeshJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SummaryMeshJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SummaryMeshJobsService
 * @deprecatedclass SuperMap.SummaryMeshJobsService
 * @category  iServer ProcessingService AggregatePoints
 * @classdesc 点聚合分析任务类。点聚合分析是指针对点数据集制作聚合图的一种空间分析作业。
 * 通过网格面或多边形对地图点要素进行划分，然后，计算每个面对象内点要素的数量，并作为面对象的统计值，
 * 也可以引入点的权重信息，考虑面对象内点的加权值作为面对象的统计值；
 * 最后基于面对象的统计值，按照统计值大小排序的结果，通过色带对面对象进行色彩填充。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Events} options.events - 处理所有事件的对象。
 * @param {number} options.index - 服务地址在数组中的位置。
 * @param {number} options.length - 服务地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var SummaryMeshJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  SummaryMeshJobsService_inherits(SummaryMeshJobsService, _ProcessingServiceBas);
  function SummaryMeshJobsService(url, options) {
    var _this;
    SummaryMeshJobsService_classCallCheck(this, SummaryMeshJobsService);
    _this = SummaryMeshJobsService_callSuper(this, SummaryMeshJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/aggregatepoints');
    _this.CLASS_NAME = 'SuperMap.SummaryMeshJobsService';
    return _this;
  }

  /**
   * @override
   */
  SummaryMeshJobsService_createClass(SummaryMeshJobsService, [{
    key: "destroy",
    value: function destroy() {
      SummaryMeshJobsService_get(SummaryMeshJobsService_getPrototypeOf(SummaryMeshJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function SummaryMeshJobsService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryMeshJobs",
    value: function getSummaryMeshJobs(callback) {
      return SummaryMeshJobsService_get(SummaryMeshJobsService_getPrototypeOf(SummaryMeshJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function SummaryMeshJobsService.prototype.getSummaryMeshJob
     * @description 获取指定 IP 的点聚合分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryMeshJob",
    value: function getSummaryMeshJob(id, callback) {
      return SummaryMeshJobsService_get(SummaryMeshJobsService_getPrototypeOf(SummaryMeshJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryMeshJobsService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析服务。
     * @param {SummaryMeshJobParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryMeshJob",
    value: function addSummaryMeshJob(params, seconds, callback, processRunningCallback) {
      return SummaryMeshJobsService_get(SummaryMeshJobsService_getPrototypeOf(SummaryMeshJobsService.prototype), "addJob", this).call(this, this.url, params, SummaryMeshJobParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return SummaryMeshJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/VectorClipJobsService.js
function VectorClipJobsService_typeof(o) { "@babel/helpers - typeof"; return VectorClipJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, VectorClipJobsService_typeof(o); }
function VectorClipJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function VectorClipJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, VectorClipJobsService_toPropertyKey(descriptor.key), descriptor); } }
function VectorClipJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) VectorClipJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) VectorClipJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function VectorClipJobsService_toPropertyKey(t) { var i = VectorClipJobsService_toPrimitive(t, "string"); return "symbol" == VectorClipJobsService_typeof(i) ? i : String(i); }
function VectorClipJobsService_toPrimitive(t, r) { if ("object" != VectorClipJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != VectorClipJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function VectorClipJobsService_callSuper(t, o, e) { return o = VectorClipJobsService_getPrototypeOf(o), VectorClipJobsService_possibleConstructorReturn(t, VectorClipJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], VectorClipJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function VectorClipJobsService_possibleConstructorReturn(self, call) { if (call && (VectorClipJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return VectorClipJobsService_assertThisInitialized(self); }
function VectorClipJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function VectorClipJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (VectorClipJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function VectorClipJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { VectorClipJobsService_get = Reflect.get.bind(); } else { VectorClipJobsService_get = function _get(target, property, receiver) { var base = VectorClipJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return VectorClipJobsService_get.apply(this, arguments); }
function VectorClipJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = VectorClipJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function VectorClipJobsService_getPrototypeOf(o) { VectorClipJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return VectorClipJobsService_getPrototypeOf(o); }
function VectorClipJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) VectorClipJobsService_setPrototypeOf(subClass, superClass); }
function VectorClipJobsService_setPrototypeOf(o, p) { VectorClipJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return VectorClipJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class VectorClipJobsService
 * @deprecatedclass SuperMap.VectorClipJobsService
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析服务类。矢量裁剪是指对矢量数据集进行裁剪，包括内部裁剪和外部裁剪。
 * 内部裁剪，则被裁剪的矢量数据集在裁剪区范围内的部分被保留到结果数据集中；相反，使用外部裁剪，则保留不在裁剪区范围内的那部分数据到结果数据集中。<br>
 * 分布式分析服务中的矢量裁剪，只支持裁剪对象数据集中有一个对象对源数据集做矢量裁剪。如果裁剪数据集中有多个对象，则默认用 SmID 最小的对象对源数据集做矢量裁剪。
 * @extends {ProcessingServiceBase}
 * @param {string} url -服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var VectorClipJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  VectorClipJobsService_inherits(VectorClipJobsService, _ProcessingServiceBas);
  function VectorClipJobsService(url, options) {
    var _this;
    VectorClipJobsService_classCallCheck(this, VectorClipJobsService);
    _this = VectorClipJobsService_callSuper(this, VectorClipJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/vectorclip');
    _this.CLASS_NAME = 'SuperMap.VectorClipJobsService';
    return _this;
  }

  /**
   *@override
   */
  VectorClipJobsService_createClass(VectorClipJobsService, [{
    key: "destroy",
    value: function destroy() {
      VectorClipJobsService_get(VectorClipJobsService_getPrototypeOf(VectorClipJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function VectorClipJobsService.protitype.getVectorClipJobs
     * @description 获取矢量裁剪分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getVectorClipJobs",
    value: function getVectorClipJobs(callback) {
      return VectorClipJobsService_get(VectorClipJobsService_getPrototypeOf(VectorClipJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.protitype.getVectorClipJob
     * @description 获取指定 ID 的矢量裁剪分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getVectorClipJob",
    value: function getVectorClipJob(id, callback) {
      return VectorClipJobsService_get(VectorClipJobsService_getPrototypeOf(VectorClipJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function VectorClipJobsService.protitype.addVectorClipJob
     * @description 新建矢量裁剪分析服务。
     * @param {VectorClipJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addVectorClipJob",
    value: function addVectorClipJob(params, seconds, callback, processRunningCallback) {
      return VectorClipJobsService_get(VectorClipJobsService_getPrototypeOf(VectorClipJobsService.prototype), "addJob", this).call(this, this.url, params, VectorClipJobsParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return VectorClipJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/OverlayGeoJobsService.js
function OverlayGeoJobsService_typeof(o) { "@babel/helpers - typeof"; return OverlayGeoJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, OverlayGeoJobsService_typeof(o); }
function OverlayGeoJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function OverlayGeoJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, OverlayGeoJobsService_toPropertyKey(descriptor.key), descriptor); } }
function OverlayGeoJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) OverlayGeoJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) OverlayGeoJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function OverlayGeoJobsService_toPropertyKey(t) { var i = OverlayGeoJobsService_toPrimitive(t, "string"); return "symbol" == OverlayGeoJobsService_typeof(i) ? i : String(i); }
function OverlayGeoJobsService_toPrimitive(t, r) { if ("object" != OverlayGeoJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != OverlayGeoJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function OverlayGeoJobsService_callSuper(t, o, e) { return o = OverlayGeoJobsService_getPrototypeOf(o), OverlayGeoJobsService_possibleConstructorReturn(t, OverlayGeoJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], OverlayGeoJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function OverlayGeoJobsService_possibleConstructorReturn(self, call) { if (call && (OverlayGeoJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return OverlayGeoJobsService_assertThisInitialized(self); }
function OverlayGeoJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function OverlayGeoJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (OverlayGeoJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function OverlayGeoJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { OverlayGeoJobsService_get = Reflect.get.bind(); } else { OverlayGeoJobsService_get = function _get(target, property, receiver) { var base = OverlayGeoJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return OverlayGeoJobsService_get.apply(this, arguments); }
function OverlayGeoJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = OverlayGeoJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function OverlayGeoJobsService_getPrototypeOf(o) { OverlayGeoJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return OverlayGeoJobsService_getPrototypeOf(o); }
function OverlayGeoJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) OverlayGeoJobsService_setPrototypeOf(subClass, superClass); }
function OverlayGeoJobsService_setPrototypeOf(o, p) { OverlayGeoJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return OverlayGeoJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class OverlayGeoJobsService
 * @deprecatedclass SuperMap.OverlayGeoJobsService
 * @category iServer ProcessingService OverlayAnalyst
 * @classdesc 叠加分析任务类。叠加分析是指在统一空间参考系统下，通过对两个数据集进行的一系列集合运算，产生新数据集的过程。
 * 在叠加分析中至少涉及到三个数据集，其中一个数据集的类型可以是点、线、面等，被称作源数据集；
 * 另一个数据集是面数据集，被称作叠加对象数据集；还有一个数据集就是叠加结果数据集，包含叠加后数据的几何信息和属性信息。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Events} options.events - 处理所有事件的对象。
 * @param {number} options.index - 服务访问地址在数组中的位置。
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var OverlayGeoJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  OverlayGeoJobsService_inherits(OverlayGeoJobsService, _ProcessingServiceBas);
  function OverlayGeoJobsService(url, options) {
    var _this;
    OverlayGeoJobsService_classCallCheck(this, OverlayGeoJobsService);
    _this = OverlayGeoJobsService_callSuper(this, OverlayGeoJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/overlay');
    _this.CLASS_NAME = 'SuperMap.OverlayGeoJobsService';
    return _this;
  }

  /**
   * @override
   */
  OverlayGeoJobsService_createClass(OverlayGeoJobsService, [{
    key: "destroy",
    value: function destroy() {
      OverlayGeoJobsService_get(OverlayGeoJobsService_getPrototypeOf(OverlayGeoJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function OverlayGeoJobsService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getOverlayGeoJobs",
    value: function getOverlayGeoJobs(callback) {
      return OverlayGeoJobsService_get(OverlayGeoJobsService_getPrototypeOf(OverlayGeoJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function OverlayGeoJobsService.prototype.getOverlayGeoJob
     * @description 获取指定 ID 的叠加分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getOverlayGeoJob",
    value: function getOverlayGeoJob(id, callback) {
      return OverlayGeoJobsService_get(OverlayGeoJobsService_getPrototypeOf(OverlayGeoJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function OverlayGeoJobsService.prototype.addOverlayGeoJob
     * @description 新建点叠加析服务。
     * @param {OverlayGeoJobParameter} params - 创建一个叠加分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addOverlayGeoJob",
    value: function addOverlayGeoJob(params, seconds, callback, processRunningCallback) {
      return OverlayGeoJobsService_get(OverlayGeoJobsService_getPrototypeOf(OverlayGeoJobsService.prototype), "addJob", this).call(this, this.url, params, OverlayGeoJobParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return OverlayGeoJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/SummaryRegionJobsService.js
function SummaryRegionJobsService_typeof(o) { "@babel/helpers - typeof"; return SummaryRegionJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SummaryRegionJobsService_typeof(o); }
function SummaryRegionJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SummaryRegionJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SummaryRegionJobsService_toPropertyKey(descriptor.key), descriptor); } }
function SummaryRegionJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryRegionJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryRegionJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SummaryRegionJobsService_toPropertyKey(t) { var i = SummaryRegionJobsService_toPrimitive(t, "string"); return "symbol" == SummaryRegionJobsService_typeof(i) ? i : String(i); }
function SummaryRegionJobsService_toPrimitive(t, r) { if ("object" != SummaryRegionJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SummaryRegionJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function SummaryRegionJobsService_callSuper(t, o, e) { return o = SummaryRegionJobsService_getPrototypeOf(o), SummaryRegionJobsService_possibleConstructorReturn(t, SummaryRegionJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], SummaryRegionJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function SummaryRegionJobsService_possibleConstructorReturn(self, call) { if (call && (SummaryRegionJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return SummaryRegionJobsService_assertThisInitialized(self); }
function SummaryRegionJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function SummaryRegionJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (SummaryRegionJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function SummaryRegionJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { SummaryRegionJobsService_get = Reflect.get.bind(); } else { SummaryRegionJobsService_get = function _get(target, property, receiver) { var base = SummaryRegionJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return SummaryRegionJobsService_get.apply(this, arguments); }
function SummaryRegionJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SummaryRegionJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function SummaryRegionJobsService_getPrototypeOf(o) { SummaryRegionJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SummaryRegionJobsService_getPrototypeOf(o); }
function SummaryRegionJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) SummaryRegionJobsService_setPrototypeOf(subClass, superClass); }
function SummaryRegionJobsService_setPrototypeOf(o, p) { SummaryRegionJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SummaryRegionJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SummaryRegionJobsService
 * @deprecatedclass SuperMap.SummaryRegionJobsService
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析服务类。区域汇总分析是指针对线数据集和面数据集制作聚合图的一种空间分析作业。
 * 通过网格面或多边形对地图线或面要素进行划分，然后，以标准属性字段或权重字段对每个网格单元内线或面要素进行统计，
 * 将统计结果作为该网格单元的统计值。最后按照网格单元统计值的大小进行排序，通过色带对网格单元进行色彩填充。<br>
 * 区域汇总分析的概念与点聚合分析的概念类似，不同的是点聚合分析是对点数据集进行统计计算，
 * 而区域汇总分析，是对线数据集和面数据集进行统计计算。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var SummaryRegionJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  SummaryRegionJobsService_inherits(SummaryRegionJobsService, _ProcessingServiceBas);
  function SummaryRegionJobsService(url, options) {
    var _this;
    SummaryRegionJobsService_classCallCheck(this, SummaryRegionJobsService);
    _this = SummaryRegionJobsService_callSuper(this, SummaryRegionJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/summaryregion');
    _this.CLASS_NAME = 'SuperMap.SummaryRegionJobsService';
    return _this;
  }

  /**
   *@override
   */
  SummaryRegionJobsService_createClass(SummaryRegionJobsService, [{
    key: "destroy",
    value: function destroy() {
      SummaryRegionJobsService_get(SummaryRegionJobsService_getPrototypeOf(SummaryRegionJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function SummaryRegionJobsService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析任务集合。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryRegionJobs",
    value: function getSummaryRegionJobs(callback) {
      return SummaryRegionJobsService_get(SummaryRegionJobsService_getPrototypeOf(SummaryRegionJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function SummaryRegionJobsService.prototype.getSummaryRegionJob
     * @description 获取指定 ID 的区域汇总分析任务。
     * @param {string} id -要获取区域汇总分析任务的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryRegionJob",
    value: function getSummaryRegionJob(id, callback) {
      return SummaryRegionJobsService_get(SummaryRegionJobsService_getPrototypeOf(SummaryRegionJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryRegionJobsService.prototype.addSummaryRegionJob
     * @description 新建区域汇总分析任务。
     * @param {SummaryRegionJobParameter} params - 区域汇总分析任务参数类。
     * @param {number} seconds - 创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryRegionJob",
    value: function addSummaryRegionJob(params, seconds, callback, processRunningCallback) {
      return SummaryRegionJobsService_get(SummaryRegionJobsService_getPrototypeOf(SummaryRegionJobsService.prototype), "addJob", this).call(this, this.url, params, SummaryRegionJobParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return SummaryRegionJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/BuffersAnalystJobsService.js
function BuffersAnalystJobsService_typeof(o) { "@babel/helpers - typeof"; return BuffersAnalystJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, BuffersAnalystJobsService_typeof(o); }
function BuffersAnalystJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function BuffersAnalystJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, BuffersAnalystJobsService_toPropertyKey(descriptor.key), descriptor); } }
function BuffersAnalystJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) BuffersAnalystJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) BuffersAnalystJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function BuffersAnalystJobsService_toPropertyKey(t) { var i = BuffersAnalystJobsService_toPrimitive(t, "string"); return "symbol" == BuffersAnalystJobsService_typeof(i) ? i : String(i); }
function BuffersAnalystJobsService_toPrimitive(t, r) { if ("object" != BuffersAnalystJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != BuffersAnalystJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function BuffersAnalystJobsService_callSuper(t, o, e) { return o = BuffersAnalystJobsService_getPrototypeOf(o), BuffersAnalystJobsService_possibleConstructorReturn(t, BuffersAnalystJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], BuffersAnalystJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function BuffersAnalystJobsService_possibleConstructorReturn(self, call) { if (call && (BuffersAnalystJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return BuffersAnalystJobsService_assertThisInitialized(self); }
function BuffersAnalystJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function BuffersAnalystJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (BuffersAnalystJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function BuffersAnalystJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { BuffersAnalystJobsService_get = Reflect.get.bind(); } else { BuffersAnalystJobsService_get = function _get(target, property, receiver) { var base = BuffersAnalystJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return BuffersAnalystJobsService_get.apply(this, arguments); }
function BuffersAnalystJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = BuffersAnalystJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function BuffersAnalystJobsService_getPrototypeOf(o) { BuffersAnalystJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return BuffersAnalystJobsService_getPrototypeOf(o); }
function BuffersAnalystJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) BuffersAnalystJobsService_setPrototypeOf(subClass, superClass); }
function BuffersAnalystJobsService_setPrototypeOf(o, p) { BuffersAnalystJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return BuffersAnalystJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class BuffersAnalystJobsService
 * @deprecatedclass SuperMap.BuffersAnalystJobsService
 * @category iServer ProcessingService BufferAnalyst
 * @classdesc 缓冲区分析服务类。缓冲区分析是围绕空间对象，使用与空间对象的距离值（称为缓冲半径）作为半径，生成该对象的缓冲区域的过程。
 * 缓冲半径可以是固定数值也可以是空间对象各自的属性值。缓冲区也可以理解为空间对象的影响或服务范围。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var BuffersAnalystJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  BuffersAnalystJobsService_inherits(BuffersAnalystJobsService, _ProcessingServiceBas);
  function BuffersAnalystJobsService(url, options) {
    var _this;
    BuffersAnalystJobsService_classCallCheck(this, BuffersAnalystJobsService);
    _this = BuffersAnalystJobsService_callSuper(this, BuffersAnalystJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/buffers');
    _this.CLASS_NAME = 'SuperMap.BuffersAnalystJobsService';
    return _this;
  }

  /**
   *@override
   */
  BuffersAnalystJobsService_createClass(BuffersAnalystJobsService, [{
    key: "destroy",
    value: function destroy() {
      BuffersAnalystJobsService_get(BuffersAnalystJobsService_getPrototypeOf(BuffersAnalystJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function BuffersAnalystJobsService.prototype.getBufferJobs
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @description 获取缓冲区分析所有任务。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getBuffersJobs",
    value: function getBuffersJobs(callback) {
      return BuffersAnalystJobsService_get(BuffersAnalystJobsService_getPrototypeOf(BuffersAnalystJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function BuffersAnalystJobsService.prototype.getBufferJob
     * @description 获取指定 ID 的缓冲区分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getBuffersJob",
    value: function getBuffersJob(id, callback) {
      return BuffersAnalystJobsService_get(BuffersAnalystJobsService_getPrototypeOf(BuffersAnalystJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function BuffersAnalystJobsService.prototype.addBufferJob
     * @description 新建缓冲区分析任务。
     * @param {BuffersAnalystJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addBuffersJob",
    value: function addBuffersJob(params, seconds, callback, processRunningCallback) {
      return BuffersAnalystJobsService_get(BuffersAnalystJobsService_getPrototypeOf(BuffersAnalystJobsService.prototype), "addJob", this).call(this, this.url, params, BuffersAnalystJobsParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return BuffersAnalystJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/TopologyValidatorJobsService.js
function TopologyValidatorJobsService_typeof(o) { "@babel/helpers - typeof"; return TopologyValidatorJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, TopologyValidatorJobsService_typeof(o); }
function TopologyValidatorJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function TopologyValidatorJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, TopologyValidatorJobsService_toPropertyKey(descriptor.key), descriptor); } }
function TopologyValidatorJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) TopologyValidatorJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) TopologyValidatorJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function TopologyValidatorJobsService_toPropertyKey(t) { var i = TopologyValidatorJobsService_toPrimitive(t, "string"); return "symbol" == TopologyValidatorJobsService_typeof(i) ? i : String(i); }
function TopologyValidatorJobsService_toPrimitive(t, r) { if ("object" != TopologyValidatorJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != TopologyValidatorJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function TopologyValidatorJobsService_callSuper(t, o, e) { return o = TopologyValidatorJobsService_getPrototypeOf(o), TopologyValidatorJobsService_possibleConstructorReturn(t, TopologyValidatorJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], TopologyValidatorJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function TopologyValidatorJobsService_possibleConstructorReturn(self, call) { if (call && (TopologyValidatorJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return TopologyValidatorJobsService_assertThisInitialized(self); }
function TopologyValidatorJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function TopologyValidatorJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (TopologyValidatorJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function TopologyValidatorJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { TopologyValidatorJobsService_get = Reflect.get.bind(); } else { TopologyValidatorJobsService_get = function _get(target, property, receiver) { var base = TopologyValidatorJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return TopologyValidatorJobsService_get.apply(this, arguments); }
function TopologyValidatorJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = TopologyValidatorJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function TopologyValidatorJobsService_getPrototypeOf(o) { TopologyValidatorJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TopologyValidatorJobsService_getPrototypeOf(o); }
function TopologyValidatorJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) TopologyValidatorJobsService_setPrototypeOf(subClass, superClass); }
function TopologyValidatorJobsService_setPrototypeOf(o, p) { TopologyValidatorJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TopologyValidatorJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class TopologyValidatorJobsService
 * @deprecatedclass SuperMap.TopologyValidatorJobsService
 * @category  iServer ProcessingService TopologyValidator
 * @classdesc 拓扑检查分析服务类。拓扑检查是指根据相应的拓扑规则对点、线和面数据进行检查，返回不符合规则的对象的一种操作作业。<br>
 * 支持以下 7 种拓扑规则:面数据集内部无交叠、面数据集和面数据集无交叠、面数据集被面数据集包含、面数据集被面数据集覆盖、
 * 线数据集内部无交叠、线数据集与线数据集无交叠、点数据集内部无重复点。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var TopologyValidatorJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  TopologyValidatorJobsService_inherits(TopologyValidatorJobsService, _ProcessingServiceBas);
  function TopologyValidatorJobsService(url, options) {
    var _this;
    TopologyValidatorJobsService_classCallCheck(this, TopologyValidatorJobsService);
    _this = TopologyValidatorJobsService_callSuper(this, TopologyValidatorJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/topologyvalidator');
    _this.CLASS_NAME = "SuperMap.TopologyValidatorJobsService";
    return _this;
  }

  /**
   *@override
   */
  TopologyValidatorJobsService_createClass(TopologyValidatorJobsService, [{
    key: "destroy",
    value: function destroy() {
      TopologyValidatorJobsService_get(TopologyValidatorJobsService_getPrototypeOf(TopologyValidatorJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function TopologyValidatorJobsService.protitype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getTopologyValidatorJobs",
    value: function getTopologyValidatorJobs(callback) {
      return TopologyValidatorJobsService_get(TopologyValidatorJobsService_getPrototypeOf(TopologyValidatorJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function TopologyValidatorJobsService.protitype.getTopologyValidatorJob
     * @description 获取指定 ID 的拓扑检查分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getTopologyValidatorJob",
    value: function getTopologyValidatorJob(id, callback) {
      return TopologyValidatorJobsService_get(TopologyValidatorJobsService_getPrototypeOf(TopologyValidatorJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function TopologyValidatorJobsService.protitype.addTopologyValidatorJob
     * @description 新建拓扑检查分析服务。
     * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析任务参数类。
     * @param {number} seconds -创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addTopologyValidatorJob",
    value: function addTopologyValidatorJob(params, seconds, callback, processRunningCallback) {
      return TopologyValidatorJobsService_get(TopologyValidatorJobsService_getPrototypeOf(TopologyValidatorJobsService.prototype), "addJob", this).call(this, this.url, params, TopologyValidatorJobsParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return TopologyValidatorJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/SummaryAttributesJobsService.js
function SummaryAttributesJobsService_typeof(o) { "@babel/helpers - typeof"; return SummaryAttributesJobsService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SummaryAttributesJobsService_typeof(o); }
function SummaryAttributesJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SummaryAttributesJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SummaryAttributesJobsService_toPropertyKey(descriptor.key), descriptor); } }
function SummaryAttributesJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryAttributesJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryAttributesJobsService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SummaryAttributesJobsService_toPropertyKey(t) { var i = SummaryAttributesJobsService_toPrimitive(t, "string"); return "symbol" == SummaryAttributesJobsService_typeof(i) ? i : String(i); }
function SummaryAttributesJobsService_toPrimitive(t, r) { if ("object" != SummaryAttributesJobsService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SummaryAttributesJobsService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function SummaryAttributesJobsService_callSuper(t, o, e) { return o = SummaryAttributesJobsService_getPrototypeOf(o), SummaryAttributesJobsService_possibleConstructorReturn(t, SummaryAttributesJobsService_isNativeReflectConstruct() ? Reflect.construct(o, e || [], SummaryAttributesJobsService_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function SummaryAttributesJobsService_possibleConstructorReturn(self, call) { if (call && (SummaryAttributesJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return SummaryAttributesJobsService_assertThisInitialized(self); }
function SummaryAttributesJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function SummaryAttributesJobsService_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (SummaryAttributesJobsService_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function SummaryAttributesJobsService_get() { if (typeof Reflect !== "undefined" && Reflect.get) { SummaryAttributesJobsService_get = Reflect.get.bind(); } else { SummaryAttributesJobsService_get = function _get(target, property, receiver) { var base = SummaryAttributesJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return SummaryAttributesJobsService_get.apply(this, arguments); }
function SummaryAttributesJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SummaryAttributesJobsService_getPrototypeOf(object); if (object === null) break; } return object; }
function SummaryAttributesJobsService_getPrototypeOf(o) { SummaryAttributesJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SummaryAttributesJobsService_getPrototypeOf(o); }
function SummaryAttributesJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) SummaryAttributesJobsService_setPrototypeOf(subClass, superClass); }
function SummaryAttributesJobsService_setPrototypeOf(o, p) { SummaryAttributesJobsService_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SummaryAttributesJobsService_setPrototypeOf(o, p); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SummaryAttributesJobsService
 * @deprecatedclass SuperMap.SummaryAttributesJobsService
 * @category  iServer ProcessingService SummaryAttributes
 * @classdesc 属性汇总分析服务类。属性汇总统计是指对输入的数据集中所选择的属性进行汇总统计。
 * 通过对输入的数据集设定分组字段、属性字段以及对属性字段需进行的统计模式，从而得到汇总统计的结果。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var SummaryAttributesJobsService = /*#__PURE__*/function (_ProcessingServiceBas) {
  SummaryAttributesJobsService_inherits(SummaryAttributesJobsService, _ProcessingServiceBas);
  function SummaryAttributesJobsService(url, options) {
    var _this;
    SummaryAttributesJobsService_classCallCheck(this, SummaryAttributesJobsService);
    _this = SummaryAttributesJobsService_callSuper(this, SummaryAttributesJobsService, [url, options]);
    _this.url = Util_Util.urlPathAppend(_this.url, 'spatialanalyst/summaryattributes');
    _this.CLASS_NAME = "SuperMap.SummaryAttributesJobsService";
    return _this;
  }

  /**
   *@override
   */
  SummaryAttributesJobsService_createClass(SummaryAttributesJobsService, [{
    key: "destroy",
    value: function destroy() {
      SummaryAttributesJobsService_get(SummaryAttributesJobsService_getPrototypeOf(SummaryAttributesJobsService.prototype), "destroy", this).call(this);
    }

    /**
     * @function SummaryAttributesJobsService.protitype.getSummaryAttributesJobs
     * @description 获取属性汇总分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryAttributesJobs",
    value: function getSummaryAttributesJobs(callback) {
      return SummaryAttributesJobsService_get(SummaryAttributesJobsService_getPrototypeOf(SummaryAttributesJobsService.prototype), "getJobs", this).call(this, this.url, callback);
    }

    /**
     * @function SummaryAttributesJobsService.protitype.getSummaryAttributesJob
     * @description 获取指定 ID 的属性汇总分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryAttributesJob",
    value: function getSummaryAttributesJob(id, callback) {
      return SummaryAttributesJobsService_get(SummaryAttributesJobsService_getPrototypeOf(SummaryAttributesJobsService.prototype), "getJobs", this).call(this, Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryAttributesJobsService.protitype.addSummaryAttributesJob
     * @description 新建属性汇总分析服务。
     * @param {SummaryAttributesJobsParameter} params - 属性汇总分析任务参数类。
     * @param {number} seconds - 创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryAttributesJob",
    value: function addSummaryAttributesJob(params, seconds, callback, processRunningCallback) {
      return SummaryAttributesJobsService_get(SummaryAttributesJobsService_getPrototypeOf(SummaryAttributesJobsService.prototype), "addJob", this).call(this, this.url, params, SummaryAttributesJobsParameter, seconds, callback, processRunningCallback);
    }
  }]);
  return SummaryAttributesJobsService;
}(ProcessingServiceBase);
;// CONCATENATED MODULE: ./src/common/iServer/ProcessingService.js
function ProcessingService_typeof(o) { "@babel/helpers - typeof"; return ProcessingService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ProcessingService_typeof(o); }
function ProcessingService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function ProcessingService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, ProcessingService_toPropertyKey(descriptor.key), descriptor); } }
function ProcessingService_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProcessingService_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProcessingService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ProcessingService_toPropertyKey(t) { var i = ProcessingService_toPrimitive(t, "string"); return "symbol" == ProcessingService_typeof(i) ? i : String(i); }
function ProcessingService_toPrimitive(t, r) { if ("object" != ProcessingService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ProcessingService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/











/**
 * @class ProcessingService
 * @category  iServer ProcessingService
 * @classdesc 分布式分析相关服务类。分布式分析服务采用了分布式计算技术，可对超大体量空间数据集进行分布式空间分析和数据处理。
 * 提供方法：缓冲区分析任务、核密度分析任务、叠加分析任务、单对象空间查询任务、点聚合分析任务、区域汇总分析任务、
 * 拓扑检查分析任务、矢量裁剪分析任务等。
 * @extends {ServiceBase}
 * @example
 * new ProcessingService(url,options)
 *  .getKernelDensityJobs(function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。 
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
var ProcessingService_ProcessingService = /*#__PURE__*/function () {
  function ProcessingService(url, options) {
    ProcessingService_classCallCheck(this, ProcessingService);
    this.url = url;
    this.options = options || {};
    this.kernelDensityJobs = {};
    this.summaryMeshJobs = {};
    this.queryJobs = {};
    this.summaryRegionJobs = {};
    this.vectorClipJobs = {};
    this.overlayGeoJobs = {};
    this.buffersJobs = {};
    this.topologyValidatorJobs = {};
    this.summaryAttributesJobs = {};
  }

  /**
   * @function ProcessingService.prototype.getKernelDensityJobs
   * @description 获取密度分析的列表。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
   * @returns {Promise} Promise 对象。
   */
  ProcessingService_createClass(ProcessingService, [{
    key: "getKernelDensityJobs",
    value: function getKernelDensityJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return kernelDensityJobsService.getKernelDensityJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getKernelDensityJob
     * @description 获取指定 ID 的密度分析。
     * @param {string} id - 空间分析的 ID。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getKernelDensityJob",
    value: function getKernelDensityJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return kernelDensityJobsService.getKernelDensityJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addKernelDensityJob
     * @description 新建密度分析。目前提供 1 种密度分析方法：核密度分析。<br>
    * 核密度分析是指使用核函数来计算点或线邻域范围内的每单位面积量值。
    * 其结果是中间值大周边值小的光滑曲面，在邻域边界处降为 0。
    * 对于点对象，其核密度曲面与下方的平面所围成的空间的体积近似于此点的测量值；
    * 对于线对象，其核密度曲面与下方的平面所围成的空间的体积近似于此线的测量值与线长度的乘积。
    * 点或线的邻域叠加处，其密度值也相加。每个输出栅格的密度均为叠加在栅格上的所有核曲面值之和。 
     * @param {KernelDensityJobParameter} params -密度分析参数类。 
     * @param {RequestCallback} callback 回调函数。 
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addKernelDensityJob",
    value: function addKernelDensityJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return kernelDensityJobsService.addKernelDensityJob(params, seconds, callback, function (job) {
        me.kernelDensityJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param {string} id - 密度分析的 ID。
     * @returns {Object} 密度分析的状态。
     */
  }, {
    key: "getKernelDensityJobState",
    value: function getKernelDensityJobState(id) {
      return this.kernelDensityJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryMeshJobs",
    value: function getSummaryMeshJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryMeshJobsService.getSummaryMeshJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getSummaryMeshJob
     * @description 获取指定 ID 的点聚合分析。
     * @param {string} id - 空间分析的 ID。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryMeshJob",
    value: function getSummaryMeshJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryMeshJobsService.getSummaryMeshJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析。<br>
    * 点聚合分析是指针对点数据集制作聚合图的一种空间分析作业。通过网格面或多边形对地图点要素进行划分，
    * 然后，计算每个面对象内点要素的数量，并作为面对象的统计值，也可以引入点的权重信息，
    * 考虑面对象内点的加权值作为面对象的统计值；最后基于面对象的统计值，按照统计值大小排序的结果，
    * 通过色带对面对象进行色彩填充。
     * @param {SummaryMeshJobParameter} params - 点聚合分析任务参数类。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryMeshJob",
    value: function addSummaryMeshJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryMeshJobsService.addSummaryMeshJob(params, seconds, callback, function (job) {
        me.summaryMeshJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param {string} id - 点聚合分析的 ID。
     * @returns {Object} 点聚合分析的状态。
     */
  }, {
    key: "getSummaryMeshJobState",
    value: function getSummaryMeshJobState(id) {
      return this.summaryMeshJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getQueryJobs
     * @description 获取单对象空间查询分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getQueryJobs",
    value: function getQueryJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return singleObjectQueryJobsService.getQueryJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getQueryJob
     * @description 获取指定 ID 的单对象空间查询分析。
     * @param {string} id - 空间分析的 ID。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getQueryJob",
    value: function getQueryJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return singleObjectQueryJobsService.getQueryJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addQueryJob
     * @description 新建单对象空间查询分析。<br>
    * 单对象空间查询，指的是只支持查询对象数据集中有一个对象对被查询数据集做空间查询。
    * 如果查询对象数据集中有多个对象，则默认用 SmID 最小的对象对被查询数据集做空间查询。
     * @param {SingleObjectQueryJobsParameter} params - 单对象空间查询分析的请求参数。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addQueryJob",
    value: function addQueryJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return singleObjectQueryJobsService.addQueryJob(params, seconds, callback, function (job) {
        me.queryJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getQueryJobState
     * @description 获取单对象空间查询分析的状态。
     * @param {string} id - 单对象空间查询分析的 ID。
     * @returns {Object} 单对象空间查询分析的状态。
     */
  }, {
    key: "getQueryJobState",
    value: function getQueryJobState(id) {
      return this.queryJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryRegionJobs",
    value: function getSummaryRegionJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryRegionJobsService.getSummaryRegionJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getSummaryRegionJob
     * @description 获取指定 ID 的区域汇总分析。
     * @param {string} id - 区域汇总分析的 ID。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryRegionJob",
    value: function getSummaryRegionJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryRegionJobsService.getSummaryRegionJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addSummaryRegionJob
     * @description 新建区域汇总分析。<br>
    * 区域汇总分析是指针对线数据集和面数据集制作聚合图的一种空间分析作业。
    * 通过网格面或多边形对地图线或面要素进行划分，然后，以标准属性字段或权重字段对每个网格单元内线或面要素进行统计，
    * 将统计结果作为该网格单元的统计值。最后按照网格单元统计值的大小进行排序，通过色带对网格单元进行色彩填充。
     * @param {SummaryRegionJobParameter} params - 区域汇总分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryRegionJob",
    value: function addSummaryRegionJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryRegionJobsService.addSummaryRegionJob(params, seconds, callback, function (job) {
        me.summaryRegionJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getSummaryRegionJobState
     * @description 获取区域汇总分析的状态。
     * @param {string} id - 生成区域汇总分析的 ID。
     * @returns {Object} 区域汇总分析的状态。
     */
  }, {
    key: "getSummaryRegionJobState",
    value: function getSummaryRegionJobState(id) {
      return this.summaryRegionJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getVectorClipJobs",
    value: function getVectorClipJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var vectorClipJobsService = new VectorClipJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return vectorClipJobsService.getVectorClipJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getVectorClipJob
     * @description 获取指定 ID 的矢量裁剪分析。
     * @param {string} id - 矢量裁剪分析的 ID。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getVectorClipJob",
    value: function getVectorClipJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var vectorClipJobsService = new VectorClipJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return vectorClipJobsService.getVectorClipJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addVectorClipJob
     * @description 新建矢量裁剪分析。<br>
    * 矢量裁剪是指对矢量数据集进行裁剪，包括内部裁剪和外部裁剪。
    * 内部裁剪，则被裁剪的矢量数据集在裁剪区范围内的部分被保留到结果数据集中；
    * 外部裁剪，则保留不在裁剪区范围内的那部分数据到结果数据集中。
     * @param {VectorClipJobsParameter} params - 矢量裁剪分析请求参数类。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addVectorClipJob",
    value: function addVectorClipJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var vectorClipJobsService = new VectorClipJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return vectorClipJobsService.addVectorClipJob(params, seconds, callback, function (job) {
        me.vectorClipJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param {number} id - 矢量裁剪分析的 ID。
     * @returns {Object} 矢量裁剪分析的状态。
     */
  }, {
    key: "getVectorClipJobState",
    value: function getVectorClipJobState(id) {
      return this.vectorClipJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getOverlayGeoJobs",
    value: function getOverlayGeoJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return overlayGeoJobsService.getOverlayGeoJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getOverlayGeoJob
     * @description 获取指定 ID 的叠加分析。
     * @param {string} id - 叠加分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getOverlayGeoJob",
    value: function getOverlayGeoJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return overlayGeoJobsService.getOverlayGeoJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addOverlayGeoJob
     * @description 新建叠加分析。<br>
    * 叠加分析是在统一空间参考系统下，通过对两个数据集进行的一系列集合运算，产生新数据集的过程。
    * 在叠加分析中至少涉及到三个数据集，其中一个数据集的类型可以是点、线、面等，被称作源数据集；
    * 另一个数据集是面数据集，被称作叠加对象数据集；还有一个数据集就是叠加结果数据集，包含叠加后数据的几何信息和属性信息。
     * @param {OverlayGeoJobParameter} params - 叠加分析请求参数类。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addOverlayGeoJob",
    value: function addOverlayGeoJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return overlayGeoJobsService.addOverlayGeoJob(params, seconds, callback, function (job) {
        me.overlayGeoJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getoverlayGeoJobState
     * @description 获取叠加分析的状态。
     * @param {string} id - 叠加分析的 ID。
     * @returns {Object} 叠加分析的状态。
     */
  }, {
    key: "getoverlayGeoJobState",
    value: function getoverlayGeoJobState(id) {
      return this.overlayGeoJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getBuffersJobs
     * @description 获取缓冲区分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getBuffersJobs",
    value: function getBuffersJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return buffersAnalystJobsService.getBuffersJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getBuffersJob
     * @description 获取指定 ID 的缓冲区分析。
     * @param {string} id - 缓冲区分析的 ID。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getBuffersJob",
    value: function getBuffersJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return buffersAnalystJobsService.getBuffersJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addBuffersJob
     * @description 新建缓冲区分析。<br>
    * 缓冲区分析是围绕空间对象，使用与空间对象的距离值（称为缓冲半径）作为半径，生成该对象的缓冲区域的过程，
    * 其中缓冲半径可以是固定数值也可以是空间对象各自的属性值。缓冲区也可以理解为空间对象的影响或服务范围。
     * @param {BuffersAnalystJobsParameter} params - 缓冲区分析请求参数类。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} seconds - 获取创建成功结果的时间间隔。 
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addBuffersJob",
    value: function addBuffersJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return buffersAnalystJobsService.addBuffersJob(params, seconds, callback, function (job) {
        me.buffersJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getBuffersJobState
     * @description 获取缓冲区分析的状态。
     * @param {string} id - 缓冲区分析的 ID。
     * @returns {Object} 缓冲区分析的状态。
     */
  }, {
    key: "getBuffersJobState",
    value: function getBuffersJobState(id) {
      return this.buffersJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getTopologyValidatorJobs",
    value: function getTopologyValidatorJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return topologyValidatorJobsService.getTopologyValidatorJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getTopologyValidatorJob
     * @description 获取指定 ID 的拓扑检查分析。
     * @param {string} id - 拓扑检查分析的 ID。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getTopologyValidatorJob",
    value: function getTopologyValidatorJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return topologyValidatorJobsService.getTopologyValidatorJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addTopologyValidatorJob
     * @description 新建拓扑检查分析。<br>
    * 拓扑检查是指根据相应的拓扑规则对点、线和面数据进行检查，返回不符合规则的对象的一种操作作业。
    * 支持以下种拓扑规则:面数据集内部无交叠、面数据集和面数据集无交叠、面数据集被面数据集包含、
    * 面数据集被面数据集覆盖、线数据集内部无交叠、线数据集与线数据集无交叠、点数据集内部无重复点。
     * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析请求参数类。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addTopologyValidatorJob",
    value: function addTopologyValidatorJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return topologyValidatorJobsService.addTopologyValidatorJob(params, seconds, callback, function (job) {
        me.topologyValidatorJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getTopologyValidatorJobState
     * @description 获取拓扑检查分析的状态。
     * @param {string} id - 拓扑检查分析的 ID。
     * @returns {Object} 拓扑检查分析的状态。
     */
  }, {
    key: "getTopologyValidatorJobState",
    value: function getTopologyValidatorJobState(id) {
      return this.topologyValidatorJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getSummaryAttributesJobs
     * @description 获取属性汇总分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryAttributesJobs",
    value: function getSummaryAttributesJobs(callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryAttributesJobsService.getSummaryAttributesJobs(callback);
    }

    /**
     * @function ProcessingService.prototype.getSummaryAttributesJob
     * @description 获取指定 ID 的属性汇总分析。
     * @param {string} id - 属性汇总分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryAttributesJob",
    value: function getSummaryAttributesJob(id, callback, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryAttributesJobsService.getSummaryAttributesJob(id, callback);
    }

    /**
     * @function ProcessingService.prototype.addSummaryAttributesJob
     * @description 新建属性汇总分析。<br>
    * 属性汇总分析是指对输入的数据集中所选择的属性进行汇总统计。
    * 通过对输入的数据集设定分组字段、属性字段以及对属性字段需进行的统计模式，从而得到汇总统计的结果。
     * @param {SummaryAttributesJobsParameter} params - 属性汇总分析参数类。 
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryAttributesJob",
    value: function addSummaryAttributesJob(params, callback, seconds, resultFormat) {
      var me = this,
        format = me._processFormat(resultFormat);
      var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
        proxy: me.options.proxy,
        withCredentials: me.options.withCredentials,
        crossOrigin: me.options.crossOrigin,
        headers: me.options.headers,
        format: format
      });
      return summaryAttributesJobsService.addSummaryAttributesJob(params, seconds, callback, function (job) {
        me.summaryAttributesJobs[job.id] = job.state;
      });
    }

    /**
     * @function ProcessingService.prototype.getSummaryAttributesJobState
     * @description 获取属性汇总分析的状态。
     * @param {string} id - 属性汇总分析的 ID。 
     * @returns {Object} 属性汇总分析的状态
     */
  }, {
    key: "getSummaryAttributesJobState",
    value: function getSummaryAttributesJobState(id) {
      return this.summaryAttributesJobs[id];
    }
  }, {
    key: "_processFormat",
    value: function _processFormat(resultFormat) {
      return resultFormat ? resultFormat : DataFormat.GEOJSON;
    }
  }]);
  return ProcessingService;
}();
;// CONCATENATED MODULE: ./src/classic/services/ProcessingService.js
function services_ProcessingService_typeof(o) { "@babel/helpers - typeof"; return services_ProcessingService_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, services_ProcessingService_typeof(o); }
function services_ProcessingService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function services_ProcessingService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, services_ProcessingService_toPropertyKey(descriptor.key), descriptor); } }
function services_ProcessingService_createClass(Constructor, protoProps, staticProps) { if (protoProps) services_ProcessingService_defineProperties(Constructor.prototype, protoProps); if (staticProps) services_ProcessingService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function services_ProcessingService_toPropertyKey(t) { var i = services_ProcessingService_toPrimitive(t, "string"); return "symbol" == services_ProcessingService_typeof(i) ? i : String(i); }
function services_ProcessingService_toPrimitive(t, r) { if ("object" != services_ProcessingService_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != services_ProcessingService_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @class SuperMap.REST.ProcessingService
 * @category  iServer ProcessingService
 * @classdesc 分布式分析相关服务类。分布式分析服务采用了分布式计算技术，可对超大体量空间数据集进行分布式空间分析和数据处理。
 * 提供方法：缓冲区分析任务、核密度分析任务、叠加分析任务、单对象空间查询任务、点聚合分析任务、区域汇总分析任务、
 * 拓扑检查分析任务、矢量裁剪分析任务等。
 * @modulecategory Services
 * @augments CommonServiceBase
 * @example
 * new SuperMap.REST.ProcessingService(url,options)
 *    .getKernelDensityJobs(function(result){
 *       //doSomething
 * })
 * @param {string} url - 分布式分析服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
var ProcessingService = /*#__PURE__*/function () {
  function ProcessingService(url, options) {
    services_ProcessingService_classCallCheck(this, ProcessingService);
    this._processingService = new ProcessingService_ProcessingService(url, options);
  }

  /**
   * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJobs
   * @description 获取密度分析的列表。
   * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
   * @returns {Promise} Promise 对象。
   */
  services_ProcessingService_createClass(ProcessingService, [{
    key: "getKernelDensityJobs",
    value: function getKernelDensityJobs(callback, resultFormat) {
      return this._processingService.getKernelDensityJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJob
     * @description 获取指定 ID 的密度分析。
     * @param {string} id - 空间分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getKernelDensityJob",
    value: function getKernelDensityJob(id, callback, resultFormat) {
      return this._processingService.getKernelDensityJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addKernelDensityJob
     * @description 新建密度分析。目前提供 1 种密度分析方法：核密度分析。<br>
     * 核密度分析是指使用核函数来计算点或线邻域范围内的每单位面积量值。
     * 其结果是中间值大周边值小的光滑曲面，在邻域边界处降为 0。
     * 对于点对象，其核密度曲面与下方的平面所围成的空间的体积近似于此点的测量值；
     * 对于线对象，其核密度曲面与下方的平面所围成的空间的体积近似于此线的测量值与线长度的乘积。
     * 点或线的邻域叠加处，其密度值也相加。每个输出栅格的密度均为叠加在栅格上的所有核曲面值之和。 
     * @param {KernelDensityJobParameter} params - 核密度分析任务参数类。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addKernelDensityJob",
    value: function addKernelDensityJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addKernelDensityJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param {string} id - 密度分析的 ID。
     * @returns {Object} 密度分析的状态。
     */
  }, {
    key: "getKernelDensityJobState",
    value: function getKernelDensityJobState(id) {
      return this._processingService.getKernelDensityJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryMeshJobs",
    value: function getSummaryMeshJobs(callback, resultFormat) {
      return this._processingService.getSummaryMeshJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJob
     * @description 获取指定 ID 的点聚合分析。
     * @param {string} id - 点聚合分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryMeshJob",
    value: function getSummaryMeshJob(id, callback, resultFormat) {
      return this._processingService.getSummaryMeshJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析。<br>
     * 点聚合分析是指针对点数据集制作聚合图的一种空间分析作业。通过网格面或多边形对地图点要素进行划分，
     * 然后，计算每个面对象内点要素的数量，并作为面对象的统计值，也可以引入点的权重信息，
     * 考虑面对象内点的加权值作为面对象的统计值；最后基于面对象的统计值，按照统计值大小排序的结果，
     * 通过色带对面对象进行色彩填充。
     * @param {SummaryMeshJobParameter} params - 点聚合分析任务参数类。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryMeshJob",
    value: function addSummaryMeshJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryMeshJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param {string} id - 点聚合分析的 ID。
     * @returns {Object} 点聚合分析的状态。
     */
  }, {
    key: "getSummaryMeshJobState",
    value: function getSummaryMeshJobState(id) {
      return this._processingService.getSummaryMeshJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getQueryJobs
     * @description 获取单对象空间查询分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getQueryJobs",
    value: function getQueryJobs(callback, resultFormat) {
      return this._processingService.getQueryJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getQueryJob
     * @description 获取指定 ID 的单对象空间查询分析。
     * @param {string} id - 单对象空间查询分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getQueryJob",
    value: function getQueryJob(id, callback, resultFormat) {
      return this._processingService.getQueryJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addQueryJob
     * @description 新建单对象空间查询分析。<br>
     * 单对象空间查询，指的是只支持查询对象数据集中有一个对象对被查询数据集做空间查询。
     * 如果查询对象数据集中有多个对象，则默认用 SmID 最小的对象对被查询数据集做空间查询。
     * @param {SingleObjectQueryJobsParameter} params - 单对象空间查询分析任务参数类。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addQueryJob",
    value: function addQueryJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addQueryJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getQueryJobState
     * @description 获取单对象空间查询分析的状态。
     * @param {string} id - 单对象空间查询分析的 ID。
     * @returns {Object} 单对象空间查询分析的状态。
     */
  }, {
    key: "getQueryJobState",
    value: function getQueryJobState(id) {
      return this._processingService.getQueryJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryRegionJobs",
    value: function getSummaryRegionJobs(callback, resultFormat) {
      return this._processingService.getSummaryRegionJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJob
     * @description 获取指定 ID 的区域汇总分析。
     * @param {string} id - 区域汇总分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryRegionJob",
    value: function getSummaryRegionJob(id, callback, resultFormat) {
      return this._processingService.getSummaryRegionJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addSummaryRegionJob
     * @description 新建区域汇总分析。<br>
     * 区域汇总分析是指针对线数据集和面数据集制作聚合图的一种空间分析作业。
     * 通过网格面或多边形对地图线或面要素进行划分，然后，以标准属性字段或权重字段对每个网格单元内线或面要素进行统计，
     * 将统计结果作为该网格单元的统计值。最后按照网格单元统计值的大小进行排序，通过色带对网格单元进行色彩填充。
     * @param {SummaryRegionJobParameter} params -创建一个区域汇总分析的请求参数。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryRegionJob",
    value: function addSummaryRegionJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryRegionJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJobState
     * @description 获取区域汇总分析的状态。
     * @param {string} id - 区域汇总分析的 ID。
     * @returns {Object} 区域汇总分析的状态。
     */
  }, {
    key: "getSummaryRegionJobState",
    value: function getSummaryRegionJobState(id) {
      return this._processingService.getSummaryRegionJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getVectorClipJobs",
    value: function getVectorClipJobs(callback, resultFormat) {
      return this._processingService.getVectorClipJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJob
     * @description 获取指定 ID 的矢量裁剪分析。
     * @param {string} id - 矢量裁剪分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getVectorClipJob",
    value: function getVectorClipJob(id, callback, resultFormat) {
      return this._processingService.getVectorClipJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addVectorClipJob
     * @description 新建矢量裁剪分析。<br>
     * 矢量裁剪是指对矢量数据集进行裁剪，包括内部裁剪和外部裁剪。
     * 内部裁剪，则被裁剪的矢量数据集在裁剪区范围内的部分被保留到结果数据集中；
     * 外部裁剪，则保留不在裁剪区范围内的那部分数据到结果数据集中。
     * @param {VectorClipJobsParameter} params - 矢量裁剪分析任务参数类。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addVectorClipJob",
    value: function addVectorClipJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addVectorClipJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param {string} id - 矢量裁剪分析的 ID。
     * @returns {Object} 矢量裁剪分析的状态。
     */
  }, {
    key: "getVectorClipJobState",
    value: function getVectorClipJobState(id) {
      return this._processingService.getVectorClipJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getOverlayGeoJobs",
    value: function getOverlayGeoJobs(callback, resultFormat) {
      return this._processingService.getOverlayGeoJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getOverlayGeoJob
     * @description 获取指定 ID 的叠加分析。
     * @param {string} id - 叠加分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getOverlayGeoJob",
    value: function getOverlayGeoJob(id, callback, resultFormat) {
      return this._processingService.getOverlayGeoJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addOverlayGeoJob
     * @description 新建叠加分析。<br>
     * 叠加分析是在统一空间参考系统下，通过对两个数据集进行的一系列集合运算，产生新数据集的过程。
     * 在叠加分析中至少涉及到三个数据集，其中一个数据集的类型可以是点、线、面等，被称作源数据集；
     * 另一个数据集是面数据集，被称作叠加对象数据集；还有一个数据集就是叠加结果数据集，包含叠加后数据的几何信息和属性信息。
     * @param {OverlayGeoJobParameter} params - 叠加分析任务参数类。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addOverlayGeoJob",
    value: function addOverlayGeoJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addOverlayGeoJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getoverlayGeoJobState
     * @description 获取叠加分析的状态。
     * @param {string} id - 叠加分析的 ID。
     * @returns {Object} 叠加分析的状态。
     */
  }, {
    key: "getoverlayGeoJobState",
    value: function getoverlayGeoJobState(id) {
      return this._processingService.getoverlayGeoJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getBuffersJobs
     * @description 获取缓冲区分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getBuffersJobs",
    value: function getBuffersJobs(callback, resultFormat) {
      return this._processingService.getBuffersJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getBuffersJob
     * @description 获取指定 ID 的缓冲区分析。
     * @param {string} id - 缓冲区分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getBuffersJob",
    value: function getBuffersJob(id, callback, resultFormat) {
      return this._processingService.getBuffersJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addBuffersJob
     * @description 新建缓冲区分析。<br>
     * 缓冲区分析是围绕空间对象，使用与空间对象的距离值（称为缓冲半径）作为半径，生成该对象的缓冲区域的过程，
     * 其中缓冲半径可以是固定数值也可以是空间对象各自的属性值。缓冲区也可以理解为空间对象的影响或服务范围。
     * @param {BuffersAnalystJobsParameter} params - 创建一个缓冲区分析的请求参数。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addBuffersJob",
    value: function addBuffersJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addBuffersJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getBuffersJobState
     * @description 获取缓冲区分析的状态。
     * @param {string} id - 缓冲区分析的 ID。
     * @returns {Object} 缓冲区分析的状态。
     */
  }, {
    key: "getBuffersJobState",
    value: function getBuffersJobState(id) {
      return this._processingService.getBuffersJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getTopologyValidatorJobs",
    value: function getTopologyValidatorJobs(callback, resultFormat) {
      return this._processingService.getTopologyValidatorJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getTopologyValidatorJob
     * @description 获取指定 ID 的拓扑检查分析。
     * @param {string} id - 拓扑检查分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getTopologyValidatorJob",
    value: function getTopologyValidatorJob(id, callback, resultFormat) {
      return this._processingService.getTopologyValidatorJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addTopologyValidatorJob
     * @description 新建拓扑检查分析。<br>
     * 拓扑检查是指根据相应的拓扑规则对点、线和面数据进行检查，返回不符合规则的对象的一种操作作业。
     * 支持以下种拓扑规则:面数据集内部无交叠、面数据集和面数据集无交叠、面数据集被面数据集包含、
     * 面数据集被面数据集覆盖、线数据集内部无交叠、线数据集与线数据集无交叠、点数据集内部无重复点。
     * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析任务参数类。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addTopologyValidatorJob",
    value: function addTopologyValidatorJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addTopologyValidatorJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getTopologyValidatorJobState
     * @description 获取拓扑检查分析的状态。
     * @param {string} id - 拓扑检查分析的 ID。
     * @returns {Object} 拓扑检查分析的状态。
     */
  }, {
    key: "getTopologyValidatorJobState",
    value: function getTopologyValidatorJobState(id) {
      return this._processingService.getTopologyValidatorJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryAttributesJobs
     * @description 获取属性汇总分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryAttributesJobs",
    value: function getSummaryAttributesJobs(callback, resultFormat) {
      return this._processingService.getSummaryAttributesJobs(callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryAttributesJob
     * @description 获取指定 ID 的属性汇总分析。
     * @param {string} id - 属性汇总分析的 ID。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "getSummaryAttributesJob",
    value: function getSummaryAttributesJob(id, callback, resultFormat) {
      return this._processingService.getSummaryAttributesJob(id, callback, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.addSummaryAttributesJob
     * @description 新建属性汇总分析。<br>
     * 属性汇总分析是指对输入的数据集中所选择的属性进行汇总统计。
     * 通过对输入的数据集设定分组字段、属性字段以及对属性字段需进行的统计模式，从而得到汇总统计的结果。
     * @param {SummaryAttributesJobsParameter} params - 属性汇总分析任务参数类。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
  }, {
    key: "addSummaryAttributesJob",
    value: function addSummaryAttributesJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryAttributesJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryAttributesJobState
     * @description 获取属性汇总分析的状态。
     * @param {string} id - 属性汇总分析的 ID。
     * @returns {Object} 属性汇总分析的状态。
     */
  }, {
    key: "getSummaryAttributesJobState",
    value: function getSummaryAttributesJobState(id) {
      return this._processingService.getSummaryAttributesJobState(id);
    }
  }, {
    key: "_processFormat",
    value: function _processFormat(resultFormat) {
      return resultFormat ? resultFormat : DataFormat.GEOJSON;
    }
  }, {
    key: "_processParams",
    value: function _processParams(params) {
      if (!params) {
        return {};
      }
      if (params.geometryQuery) {
        params.geometryQuery = this._convertPatams(params.geometryQuery);
      }
      if (params.geometryClip) {
        params.geometryClip = this._convertPatams(params.geometryClip);
      }
      return params;
    }
  }, {
    key: "_convertPatams",
    value: function _convertPatams(points) {
      var geometryParam = {};
      if (points.length < 1) {
        geometryParam = '';
      } else {
        var results = [];
        for (var i = 0; i < points.length; i++) {
          var point = {};
          point.x = points[i].x;
          point.y = points[i].y;
          results.push(point);
        }
        geometryParam.type = 'REGION';
        geometryParam.points = results;
      }
      return geometryParam;
    }
  }]);
  return ProcessingService;
}();
SuperMap.REST.ProcessingService = ProcessingService;
;// CONCATENATED MODULE: ./src/classic/services/index.js
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




;// CONCATENATED MODULE: ./src/classic/index.js
/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





















;// CONCATENATED MODULE: ./src/classic/namespace.js
function namespace_typeof(o) { "@babel/helpers - typeof"; return namespace_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, namespace_typeof(o); }
function namespace_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function namespace_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? namespace_ownKeys(Object(t), !0).forEach(function (r) { namespace_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : namespace_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function namespace_defineProperty(obj, key, value) { key = namespace_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function namespace_toPropertyKey(t) { var i = namespace_toPrimitive(t, "string"); return "symbol" == namespace_typeof(i) ? i : String(i); }
function namespace_toPrimitive(t, r) { if ("object" != namespace_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != namespace_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

SuperMap.ElasticSearch = ElasticSearch;
SuperMap.SecurityManager = SecurityManager;
SuperMap.VectorClipJobsParameter = VectorClipJobsParameter;
SuperMap.KernelDensityJobParameter = KernelDensityJobParameter;
SuperMap.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter;
SuperMap.SummaryAttributesJobsParameter = SummaryAttributesJobsParameter;
SuperMap.SummaryMeshJobParameter = SummaryMeshJobParameter;
SuperMap.SummaryRegionJobParameter = SummaryRegionJobParameter;
SuperMap.OverlayGeoJobParameter = OverlayGeoJobParameter;
SuperMap.BuffersAnalystJobsParameter = BuffersAnalystJobsParameter;
SuperMap.TopologyValidatorJobsParameter = TopologyValidatorJobsParameter;
SuperMap.OutputSetting = OutputSetting;
SuperMap.MappingParameters = MappingParameters;
SuperMap.GeoCodingParameter = GeoCodingParameter;
SuperMap.GeoDecodingParameter = GeoDecodingParameter;
SuperMap.FetchRequest = FetchRequest;
SuperMap.Util = namespace_objectSpread(namespace_objectSpread({}, SuperMap.Util), Util_Util);


/***/ }),

/***/ 3416:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var parent = __webpack_require__(3725);
module.exports = parent;

/***/ }),

/***/ 5641:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var parent = __webpack_require__(756);
module.exports = parent;

/***/ }),

/***/ 1606:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(6186);
var path = __webpack_require__(7520);
module.exports = path.Object.assign;

/***/ }),

/***/ 379:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(9319);
var WrappedWellKnownSymbolModule = __webpack_require__(8490);
module.exports = WrappedWellKnownSymbolModule.f('asyncIterator');

/***/ }),

/***/ 3873:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isCallable = __webpack_require__(5164);
var tryToString = __webpack_require__(6390);
var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 5546:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(5343);
var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};

/***/ }),

/***/ 5282:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(1212);
var toAbsoluteIndex = __webpack_require__(9603);
var lengthOfArrayLike = __webpack_require__(8765);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};
module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 7953:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(7889);
var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);
module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 4017:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var hasOwn = __webpack_require__(2770);
var ownKeys = __webpack_require__(6608);
var getOwnPropertyDescriptorModule = __webpack_require__(3880);
var definePropertyModule = __webpack_require__(754);
module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ 7592:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(4797);
var definePropertyModule = __webpack_require__(754);
var createPropertyDescriptor = __webpack_require__(19);
module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 19:
/***/ (function(module) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 4197:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isCallable = __webpack_require__(5164);
var definePropertyModule = __webpack_require__(754);
var makeBuiltIn = __webpack_require__(6514);
var defineGlobalProperty = __webpack_require__(9998);
module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
    } catch (error) {/* empty */}
    if (simple) O[key] = value;else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  }
  return O;
};

/***/ }),

/***/ 9998:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2928);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }
  return value;
};

/***/ }),

/***/ 4797:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(3634);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] !== 7;
});

/***/ }),

/***/ 9750:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2928);
var isObject = __webpack_require__(5343);
var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 7485:
/***/ (function(module) {

"use strict";


module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

/***/ }),

/***/ 2389:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2928);
var userAgent = __webpack_require__(7485);
var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}
module.exports = version;

/***/ }),

/***/ 3690:
/***/ (function(module) {

"use strict";


// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 3485:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var global = __webpack_require__(2928);
var getOwnPropertyDescriptor = (__webpack_require__(3880).f);
var createNonEnumerableProperty = __webpack_require__(7592);
var defineBuiltIn = __webpack_require__(4197);
var defineGlobalProperty = __webpack_require__(9998);
var copyConstructorProperties = __webpack_require__(4017);
var isForced = __webpack_require__(4857);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global[TARGET] && global[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (_typeof(sourceProperty) == _typeof(targetProperty)) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 3634:
/***/ (function(module) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 8607:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(3634);
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = function () {/* empty */}.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ 3736:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var NATIVE_BIND = __webpack_require__(8607);
var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 9071:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(4797);
var hasOwn = __webpack_require__(2770);
var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && function something() {/* empty */}.name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 7889:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var NATIVE_BIND = __webpack_require__(8607);
var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 148:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2928);
var isCallable = __webpack_require__(5164);
var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};
module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 4897:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var aCallable = __webpack_require__(3873);
var isNullOrUndefined = __webpack_require__(4350);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

/***/ }),

/***/ 2928:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var check = function check(it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
// eslint-disable-next-line es/no-global-this -- safe
check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window) ||
// eslint-disable-next-line no-restricted-globals -- safe
check((typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self) || check((typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) == 'object' && __webpack_require__.g) || check(_typeof(this) == 'object' && this) ||
// eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 2770:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(7889);
var toObject = __webpack_require__(9452);
var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 7076:
/***/ (function(module) {

"use strict";


module.exports = {};

/***/ }),

/***/ 6182:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(4797);
var fails = __webpack_require__(3634);
var createElement = __webpack_require__(9750);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a !== 7;
});

/***/ }),

/***/ 4384:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(7889);
var fails = __webpack_require__(3634);
var classof = __webpack_require__(7953);
var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;

/***/ }),

/***/ 9413:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(7889);
var isCallable = __webpack_require__(5164);
var store = __webpack_require__(3094);
var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}
module.exports = store.inspectSource;

/***/ }),

/***/ 6814:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var NATIVE_WEAK_MAP = __webpack_require__(6185);
var global = __webpack_require__(2928);
var isObject = __webpack_require__(5343);
var createNonEnumerableProperty = __webpack_require__(7592);
var hasOwn = __webpack_require__(2770);
var shared = __webpack_require__(3094);
var sharedKey = __webpack_require__(56);
var hiddenKeys = __webpack_require__(7076);
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;
var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};
var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function set(it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function get(it) {
    return store.get(it) || {};
  };
  has = function has(it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function has(it) {
    return hasOwn(it, STATE);
  };
}
module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 5164:
/***/ (function(module) {

"use strict";


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var documentAll = (typeof document === "undefined" ? "undefined" : _typeof(document)) == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 4857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(3634);
var isCallable = __webpack_require__(5164);
var replacement = /#|\.prototype\./;
var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 4350:
/***/ (function(module) {

"use strict";


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};

/***/ }),

/***/ 5343:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var isCallable = __webpack_require__(5164);
module.exports = function (it) {
  return _typeof(it) == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 2358:
/***/ (function(module) {

"use strict";


module.exports = false;

/***/ }),

/***/ 5648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var getBuiltIn = __webpack_require__(148);
var isCallable = __webpack_require__(5164);
var isPrototypeOf = __webpack_require__(6466);
var USE_SYMBOL_AS_UID = __webpack_require__(2865);
var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return _typeof(it) == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

/***/ }),

/***/ 8765:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var toLength = __webpack_require__(1995);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 6514:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(7889);
var fails = __webpack_require__(3634);
var isCallable = __webpack_require__(5164);
var hasOwn = __webpack_require__(2770);
var DESCRIPTORS = __webpack_require__(4797);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(9071).CONFIGURABLE);
var inspectSource = __webpack_require__(9413);
var InternalStateModule = __webpack_require__(6814);
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () {/* empty */}, 'length', {
    value: 8
  }).length !== 8;
});
var TEMPLATE = String(String).split('String');
var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    if (DESCRIPTORS) defineProperty(value, 'name', {
      value: name,
      configurable: true
    });else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', {
      value: options.arity
    });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', {
        writable: false
      });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) {/* empty */}
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  }
  return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

/***/ }),

/***/ 4433:
/***/ (function(module) {

"use strict";


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

/***/ }),

/***/ 8192:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(4797);
var uncurryThis = __webpack_require__(7889);
var call = __webpack_require__(3736);
var fails = __webpack_require__(3634);
var objectKeys = __webpack_require__(1185);
var getOwnPropertySymbolsModule = __webpack_require__(7260);
var propertyIsEnumerableModule = __webpack_require__(128);
var toObject = __webpack_require__(9452);
var IndexedObject = __webpack_require__(4384);

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({
    b: 1
  }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function get() {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol('assign detection');
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  }
  return T;
} : $assign;

/***/ }),

/***/ 754:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(4797);
var IE8_DOM_DEFINE = __webpack_require__(6182);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(1363);
var anObject = __webpack_require__(5546);
var toPropertyKey = __webpack_require__(8);
var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }
  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 3880:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(4797);
var call = __webpack_require__(3736);
var propertyIsEnumerableModule = __webpack_require__(128);
var createPropertyDescriptor = __webpack_require__(19);
var toIndexedObject = __webpack_require__(1212);
var toPropertyKey = __webpack_require__(8);
var hasOwn = __webpack_require__(2770);
var IE8_DOM_DEFINE = __webpack_require__(6182);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {/* empty */}
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 125:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var internalObjectKeys = __webpack_require__(3763);
var enumBugKeys = __webpack_require__(3690);
var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 7260:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 6466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(7889);
module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 3763:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(7889);
var hasOwn = __webpack_require__(2770);
var toIndexedObject = __webpack_require__(1212);
var indexOf = (__webpack_require__(5282).indexOf);
var hiddenKeys = __webpack_require__(7076);
var push = uncurryThis([].push);
module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

/***/ }),

/***/ 1185:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var internalObjectKeys = __webpack_require__(3763);
var enumBugKeys = __webpack_require__(3690);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ 128:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 8367:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var call = __webpack_require__(3736);
var isCallable = __webpack_require__(5164);
var isObject = __webpack_require__(5343);
var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 6608:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var getBuiltIn = __webpack_require__(148);
var uncurryThis = __webpack_require__(7889);
var getOwnPropertyNamesModule = __webpack_require__(125);
var getOwnPropertySymbolsModule = __webpack_require__(7260);
var anObject = __webpack_require__(5546);
var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 7520:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2928);
module.exports = global;

/***/ }),

/***/ 1365:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isNullOrUndefined = __webpack_require__(4350);
var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 56:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(1930);
var uid = __webpack_require__(6177);
var keys = shared('keys');
module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 3094:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var IS_PURE = __webpack_require__(2358);
var globalThis = __webpack_require__(2928);
var defineGlobalProperty = __webpack_require__(9998);
var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});
(store.versions || (store.versions = [])).push({
  version: '3.36.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ 1930:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var store = __webpack_require__(3094);
module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};

/***/ }),

/***/ 6576:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(2389);
var fails = __webpack_require__(3634);
var global = __webpack_require__(2928);
var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
  // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 9603:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var toIntegerOrInfinity = __webpack_require__(3784);
var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 1212:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(4384);
var requireObjectCoercible = __webpack_require__(1365);
module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 3784:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var trunc = __webpack_require__(4433);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

/***/ }),

/***/ 1995:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var toIntegerOrInfinity = __webpack_require__(3784);
var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 9452:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var requireObjectCoercible = __webpack_require__(1365);
var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 7762:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var call = __webpack_require__(3736);
var isObject = __webpack_require__(5343);
var isSymbol = __webpack_require__(5648);
var getMethod = __webpack_require__(4897);
var ordinaryToPrimitive = __webpack_require__(8367);
var wellKnownSymbol = __webpack_require__(1642);
var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 8:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var toPrimitive = __webpack_require__(7762);
var isSymbol = __webpack_require__(5648);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 6390:
/***/ (function(module) {

"use strict";


var $String = String;
module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 6177:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(7889);
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);
module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 2865:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* eslint-disable es/no-symbol -- required for testing */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var NATIVE_SYMBOL = __webpack_require__(6576);
module.exports = NATIVE_SYMBOL && !Symbol.sham && _typeof(Symbol.iterator) == 'symbol';

/***/ }),

/***/ 1363:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(4797);
var fails = __webpack_require__(3634);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {/* empty */}, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

/***/ }),

/***/ 6185:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2928);
var isCallable = __webpack_require__(5164);
var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

/***/ }),

/***/ 2860:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(7520);
var hasOwn = __webpack_require__(2770);
var wrappedWellKnownSymbolModule = __webpack_require__(8490);
var defineProperty = (__webpack_require__(754).f);
module.exports = function (NAME) {
  var _Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(_Symbol, NAME)) defineProperty(_Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

/***/ }),

/***/ 8490:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var wellKnownSymbol = __webpack_require__(1642);
exports.f = wellKnownSymbol;

/***/ }),

/***/ 1642:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2928);
var shared = __webpack_require__(1930);
var hasOwn = __webpack_require__(2770);
var uid = __webpack_require__(6177);
var NATIVE_SYMBOL = __webpack_require__(6576);
var USE_SYMBOL_AS_UID = __webpack_require__(2865);
var _Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? _Symbol['for'] || _Symbol : _Symbol && _Symbol.withoutSetter || uid;
module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(_Symbol, name) ? _Symbol[name] : createWellKnownSymbol('Symbol.' + name);
  }
  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 6186:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(3485);
var assign = __webpack_require__(8192);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({
  target: 'Object',
  stat: true,
  arity: 2,
  forced: Object.assign !== assign
}, {
  assign: assign
});

/***/ }),

/***/ 9319:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(2860);

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

/***/ }),

/***/ 3725:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var parent = __webpack_require__(1606);
module.exports = parent;

/***/ }),

/***/ 756:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var parent = __webpack_require__(379);
module.exports = parent;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(5641);
/******/ 	__webpack_require__(3416);
/******/ 	var __webpack_exports__ = __webpack_require__(4257);
/******/ 	
/******/ })()
;