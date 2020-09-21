/*!
 * 
 *          iclient-classic.(https://iclient.supermap.io)
 *          Copyright© 2000 - 2020 SuperMap Software Co.Ltd
 *          license: Apache-2.0
 *          version: v10.1.0
 *         
 */
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]; // to avoid param reassign

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
      }; // Check if the user set their own params, and if not add a ? to start a list of params


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
      }, timeout); // Caught if got 404/500

      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));
        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  } // export as global function

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
/* 3 */
/***/ (function(module, exports) {

module.exports = function(){try{return elasticsearch}catch(e){return {}}}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  ( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
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
  } // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())


  var setTimeoutFunc = setTimeout;

  function isArray(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop() {} // Polyfill for Function.prototype.bind


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
  }; // Use polyfill for setImmediate for performance gains


  Promise._immediateFn = // @ts-ignore
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

    if (typeof global !== 'undefined') {
      return global;
    }

    throw new Error('unable to locate global object');
  }();

  if (!('Promise' in globalNS)) {
    globalNS['Promise'] = Promise;
  } else if (!globalNS.Promise.prototype['finally']) {
    globalNS.Promise.prototype['finally'] = finallyConstructor;
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).setImmediate, __webpack_require__(1)))

/***/ }),
/* 5 */
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


__webpack_require__(6); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 6 */
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(7)))

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function (self) {
  'use strict'; // if __disableNativeFetch is set to true, the it will always polyfill fetch
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
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {// Only support ArrayBuffers for POST method.
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
  } // HTTP methods whose capitalization should be normalized


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
        } // Avoid security warnings on getResponseHeader when not allowed by CORS


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

      xhr.open(request.method, request.url, true); // `withCredentials` should be setted after calling `.open` in IE10
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

  self.fetch.polyfill = true; // Support CommonJS

  if ( true && module.exports) {
    module.exports = self.fetch;
  }
})(typeof self !== 'undefined' ? self : this);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/common/SuperMap.js
/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
var SuperMap = window.SuperMap = window.SuperMap || {};
SuperMap.Components = window.SuperMap.Components || {};
// CONCATENATED MODULE: ./src/common/commontypes/Pixel.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class SuperMap.Pixel
 * @category BaseTypes Geometry
 * @classdesc 此类用 x,y 坐标描绘屏幕坐标（像素点）。
 * @param {number} [x=0.0] - x 坐标。
 * @param {number} [y=0.0] - y 坐标。
 * @param {SuperMap.Pixel.Mode} [mode=SuperMap.Pixel.Mode.LeftTop] - 坐标模式。
 *
 * @example
 * //单独创建一个对象
 * var pixcel = new SuperMap.Pixel(100,50);
 *
 * //依据 size 创建
 *  var size = new SuperMap.Size(21,25);
 *  var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
 */

var Pixel_Pixel =
/*#__PURE__*/
function () {
  function Pixel(x, y, mode) {
    _classCallCheck(this, Pixel);

    /**
     * @member {number} [SuperMap.Pixel.prototype.x=0.0]
     * @description x 坐标。
     */
    this.x = x ? parseFloat(x) : 0.0;
    /**
     * @member {number} [SuperMap.Pixel.prototype.y=0.0]
     * @description y 坐标。
     */

    this.y = y ? parseFloat(y) : 0.0;
    /**
     * @member {SuperMap.Pixel.Mode} [SuperMap.Pixel.prototype.mode=SuperMap.Pixel.Mode.LeftTop]
     * @description 坐标模式，有左上、右上、右下、左下这几种模式，分别表示相对于左上角、右上角、右下角、左下角的坐标。 
     */

    this.mode = mode;
    this.CLASS_NAME = "SuperMap.Pixel";
    /**
     * @enum SuperMap.Pixel.Mode
     * @readonly
     * @description 模式。
     * @type {string}
     */

    SuperMap.Pixel.Mode = {
      /** 左上模式。*/
      LeftTop: "lefttop",

      /** 右上模式。 */
      RightTop: "righttop",

      /** 右下模式。 */
      RightBottom: "rightbottom",

      /** 左下模式。 */
      LeftBottom: "leftbottom"
    };
  }
  /**
   * @function SuperMap.Pixel.prototype.toString
   * @description 返回此对象的字符串形式。
   * @example
   *
   * var pixcel = new SuperMap.Pixel(100,50);
   * var str = pixcel.toString();
   *
   * @returns {string} 例如: "x=200.4,y=242.2"
   */


  _createClass(Pixel, [{
    key: "toString",
    value: function toString() {
      return "x=" + this.x + ",y=" + this.y;
    }
    /**
     * @function SuperMap.Pixel.prototype.clone
     * @description 克隆当前的 pixel 对象。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = pixcel.clone();
     * @returns {SuperMap.Pixel} 返回一个新的与当前 pixel 对象有相同 x、y 坐标的 pixel 对象。
     */

  }, {
    key: "clone",
    value: function clone() {
      return new Pixel(this.x, this.y, this.mode);
    }
    /**
     * @function SuperMap.Pixel.prototype.equals
     * @description 比较两 pixel 是否相等。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(100,50);
     * var isEquals = pixcel.equals(pixcel2);
     *
     * @param {SuperMap.Pixel} px - 用于比较相等的 pixel 对象。
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
     * @function SuperMap.Pixel.prototype.distanceTo
     * @description 返回两个 pixel 的距离。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(110,30);
     * var distance = pixcel.distanceTo(pixcel2);
     *
     * @param {SuperMap.Pixel} px - 用于计算的一个 pixel。
     * @returns {float} 作为参数传入的像素与当前像素点的距离。
     */

  }, {
    key: "distanceTo",
    value: function distanceTo(px) {
      return Math.sqrt(Math.pow(this.x - px.x, 2) + Math.pow(this.y - px.y, 2));
    }
    /**
     * @function SuperMap.Pixel.prototype.add
     * @description 在原来像素坐标基础上，x 值加上传入的 x 参数，y 值加上传入的 y 参数。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * //pixcel2是新的对象
     * var pixcel2 = pixcel.add(20,30);
     *
     * @param {number} x - 传入的 x 值。
     * @param {number} y - 传入的 y 值。
     * @returns {SuperMap.Pixel} 返回一个新的 pixel 对象，该 pixel 是由当前的 pixel 与传入的 x，y 相加得到。
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
     * @function SuperMap.Pixel.prototype.offset
     * @description 通过传入的 {@link SuperMap.Pixel} 参数对原屏幕坐标进行偏移。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(130,20);
     * //pixcel3 是新的对象
     * var pixcel3 = pixcel.offset(pixcel2);
     *
     * @param {SuperMap.Pixel} px - 传入的 <SuperMap.Pixel> 对象。
     * @returns {SuperMap.Pixel} 返回一个新的 pixel，该 pixel 是由当前的 pixel 对象的 x，y 值与传入的 Pixel 对象的 x，y 值相加得到。
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
     * @function SuperMap.Pixel.prototype.destroy
     * @description 销毁此对象。销毁后此对象的所有属性为 null，而不是初始值。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
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
SuperMap.Pixel = Pixel_Pixel;
// CONCATENATED MODULE: ./src/common/commontypes/BaseTypes.js
function BaseTypes_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 *@namespace SuperMap
 *@category BaseTypes Namespace
 */

/**
 * @function SuperMap.inherit
 * @description 除了 C 和 P 两个必要参数外，可以传递任意数量的对象，这些对象都将继承C。
 * @memberOf SuperMap
 * @param {Object} C - 继承的类。
 * @param {Object} P - 被继承的父类。
 */

SuperMap.inherit = function (C, P) {
  var F = function F() {};

  F.prototype = P.prototype;
  C.prototype = new F();
  var i, l, o;

  for (i = 2, l = arguments.length; i < l; i++) {
    o = arguments[i];

    if (typeof o === "function") {
      o = o.prototype;
    }

    SuperMap.Util.extend(C.prototype, o);
  }
};
/**
 * @function SuperMap.mixin 
 * @description 实现多重继承。
 * @memberOf SuperMap
 * @param {Class|Object} ...mixins - 继承的类。
 */


SuperMap.mixin = function () {
  for (var _len = arguments.length, mixins = new Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  var Mix = function Mix(options) {
    BaseTypes_classCallCheck(this, Mix);

    for (var index = 0; index < mixins.length; index++) {
      copyProperties(this, new mixins[index](options));
    }
  };

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
 * @memberOf SuperMap
 * @category BaseTypes Util
 * @description 字符串操作的一系列常用扩展函数。
 */


var StringExt = SuperMap.String = {
  /**
   * @function SuperMap.String.startsWith
   * @description 判断目标字符串是否以指定的子字符串开头。
   * @param {string} str - 目标字符串。
   * @param {string} sub - 查找的子字符串。
   * @returns {boolean} 目标字符串以指定的子字符串开头，则返回 true；否则返回 false。
   */
  startsWith: function startsWith(str, sub) {
    return str.indexOf(sub) == 0;
  },

  /**
   * @function SuperMap.String.contains
   * @description 判断目标字符串是否包含指定的子字符串。
   * @param {string} str - 目标字符串。
   * @param {string} sub - 查找的子字符串。
   * @returns {boolean} 目标字符串中包含指定的子字符串，则返回 true；否则返回 false。
   */
  contains: function contains(str, sub) {
    return str.indexOf(sub) != -1;
  },

  /**
   * @function SuperMap.String.trim
   * @description 删除一个字符串的开头和结尾处的所有空白字符。
   * @param {string} str - （可能）存在空白字符填塞的字符串。
   * @returns {string} 删除开头和结尾处空白字符后的字符串。
   */
  trim: function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },

  /**
   * @function SuperMap.String.camelize
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
   * @function SuperMap.String.format
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
   * @param {Array} [args] - 可选参数传递给在 context 对象上找到的函数。
   * @returns {string} 从 context 对象属性中替换字符串标记位的字符串。 
   */
  format: function format(template, context, args) {
    if (!context) {
      context = window;
    } // Example matching:
    // str   = ${foo.bar}
    // match = foo.bar


    var replacer = function replacer(str, match) {
      var replacement; // Loop through all subs. Example: ${a.b.c}
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
      } // If replacement is undefined, return the string 'undefined'.
      // This is a workaround for a bugs in browsers not properly
      // dealing with non-participating groups in regular expressions:
      // http://blog.stevenlevithan.com/archives/npcg-javascript


      if (typeof replacement == 'undefined') {
        return 'undefined';
      } else {
        return replacement;
      }
    };

    return template.replace(SuperMap.String.tokenRegEx, replacer);
  },

  /**
   * @member {RegExp} [SuperMap.String.tokenRegEx]
   * @description 寻找带 token 的字符串，默认为 tokenRegEx=/\$\{([\w.]+?)\}/g。
   * @example
   * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
   */
  tokenRegEx: /\$\{([\w.]+?)\}/g,

  /**
   * @member {RegExp} [SuperMap.String.numberRegEx]
   * @description 判断一个字符串是否只包含一个数值，默认为 numberRegEx=/^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/。
   */
  numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,

  /**
   * @function SuperMap.String.isNumeric
   * @description 判断一个字符串是否只包含一个数值。
   * @example
   * (code)
   * SuperMap.String.isNumeric("6.02e23") // true
   * SuperMap.String.isNumeric("12 dozen") // false
   * SuperMap.String.isNumeric("4") // true
   * SuperMap.String.isNumeric(" 4 ") // false
   * (end)
   * @returns {boolean} 字符串包含唯一的数值，返回 true；否则返回 false。
   */
  isNumeric: function isNumeric(value) {
    return SuperMap.String.numberRegEx.test(value);
  },

  /**
   * @function SuperMap.String.numericIf
   * @description 把一个看似数值型的字符串转化为一个数值。
   * @returns {(number|string)} 如果能转换为数值则返回数值，否则返回字符串本身。
   */
  numericIf: function numericIf(value) {
    return SuperMap.String.isNumeric(value) ? parseFloat(value) : value;
  }
};
/**
 * @name Number
 * @memberOf SuperMap
 * @namespace
 * @category BaseTypes Util
 * @description 数值操作的一系列常用扩展函数。
 */

var NumberExt = SuperMap.Number = {
  /**
   * @member {string} [SuperMap.Number.decimalSeparator='.']
   * @description 格式化数字时默认的小数点分隔符。
   * @constant
   */
  decimalSeparator: ".",

  /**
   * @member {string} [SuperMap.Number.thousandsSeparator=',']
   * @description 格式化数字时默认的千位分隔符。
   * @constant
   */
  thousandsSeparator: ",",

  /**
   * @function SuperMap.Number.limitSigDigs
   * @description 限制浮点数的有效数字位数。
   * @param {number} num - 浮点数。
   * @param {integer} sig - 有效位数。
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
   * @function SuperMap.Number.format
   * @description 数字格式化输出。
   * @param {number} num - 数字。
   * @param {integer} [dec=0]  - 数字的小数部分四舍五入到指定的位数。设置为 null 值时小数部分不变。
   * @param {string} [tsep=','] - 千位分隔符。
   * @param {string} [dsep='.'] - 小数点分隔符。
   * @returns {string} 数字格式化后的字符串。
   */
  format: function format(num, dec, tsep, dsep) {
    dec = typeof dec != "undefined" ? dec : 0;
    tsep = typeof tsep != "undefined" ? tsep : SuperMap.Number.thousandsSeparator;
    dsep = typeof dsep != "undefined" ? dsep : SuperMap.Number.decimalSeparator;

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
   * @param {integer} sig -有效位数。
   * @returns {integer} 将数字四舍五入到指定数量的有效位数。
   *           如果传入值 为 null、0、或者是负数, 返回值 0。
   */
  Number.prototype.limitSigDigs = function (sig) {
    return NumberExt.limitSigDigs(this, sig);
  };
}
/**
 * @name Function
 * @memberOf SuperMap
 * @namespace
 * @category BaseTypes Util
 * @description 函数操作的一系列常用扩展函数。
 */


var FunctionExt = SuperMap.Function = {
  /**
   * @function SuperMap.Function.bind
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
   * @function SuperMap.Function.bindAsEventListener
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
   * @function SuperMap.Function.False
   * @description 该函数仅仅返回 false。该函数主要是避免在 IE8 以下浏览中 DOM 事件句柄的匿名函数问题。
   * @example
   * document.onclick = SuperMap.Function.False;
   * @returns {boolean}
   */
  False: function False() {
    return false;
  },

  /**
   * @function SuperMap.Function.True
   * @description 该函数仅仅返回 true。该函数主要是避免在 IE8 以下浏览中 DOM 事件句柄的匿名函数问题。
   * @example
   * document.onclick = SuperMap.Function.True;
   * @returns {boolean}
   */
  True: function True() {
    return true;
  },

  /**
   * @function SuperMap.Function.Void
   * @description 可重用函数，仅仅返回 "undefined"。
   * @returns {undefined}
   */
  Void: function Void() {}
};
/**
 * @name Array
 * @memberOf SuperMap
 * @namespace
 * @category BaseTypes Util
 * @description 数组操作的一系列常用扩展函数。
 */

var ArrayExt = SuperMap.Array = {
  /**
   * @function SuperMap.Array.filter
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
// CONCATENATED MODULE: ./src/common/commontypes/Util.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


var Util = SuperMap.Util = SuperMap.Util || {};
/**
 * @name Util
 * @memberOf SuperMap
 * @namespace
 * @category BaseTypes Util
 * @description common 工具类。
 */

/**
 * @description 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
 * @example
 * 要复制 SuperMap.Size 对象的所有属性到自定义对象上，使用方法如下:
 *     var size = new SuperMap.Size(100, 100);
 *     var obj = {}；
 *     SuperMap.Util.extend(obj, size);
 * @param {Object} [destination] - 目标对象。
 * @param {Object} source - 源对象，其属性将被设置到目标对象上。
 * @returns {Object} 目标对象。
 */

SuperMap.Util.extend = function (destination, source) {
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


    var sourceIsEvt = typeof window.Event === "function" && source instanceof window.Event;

    if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
      destination.toString = source.toString;
    }
  }

  return destination;
};
/**
 * @description 对象拷贝。
 * @param {Object} [des] - 目标对象。
 * @param {Object} soc - 源对象。
 */


SuperMap.Util.copy = function (des, soc) {
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
};
/**
 * @description 销毁对象，将其属性置空。
 * @param {Object} [obj] - 目标对象。
 */


SuperMap.Util.reset = function (obj) {
  obj = obj || {};

  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (_typeof(obj[p]) === "object" && obj[p] instanceof Array) {
        for (var i in obj[p]) {
          if (obj[p][i].destroy) {
            obj[p][i].destroy();
          }
        }

        obj[p].length = 0;
      } else if (_typeof(obj[p]) === "object" && obj[p] instanceof Object) {
        if (obj[p].destroy) {
          obj[p].destroy();
        }
      }

      obj[p] = null;
    }
  }
};
/**
 * @description 获取 HTML 元素数组。
 * @returns {Array.<HTMLElement>} HTML 元素数组。
 */


SuperMap.Util.getElement = function () {
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
};
/**
 * @description instance of 的跨浏览器实现。
 * @param {Object} o - 对象。
 * @returns {boolean} 是否是页面元素。
 */


SuperMap.Util.isElement = function (o) {
  return !!(o && o.nodeType === 1);
};
/**
 * @description 判断一个对象是否是数组。
 * @param {Object} a - 对象。
 * @returns {boolean} 是否是数组。
 */


SuperMap.Util.isArray = function (a) {
  return Object.prototype.toString.call(a) === '[object Array]';
};
/**
 * @description 从数组中删除某一项。
 * @param {Array} array - 数组。
 * @param {Object} item - 数组中要删除的一项。
 * @returns {Array} 执行删除操作后的数组。
 */


SuperMap.Util.removeItem = function (array, item) {
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i] === item) {
      array.splice(i, 1); //break;more than once??
    }
  }

  return array;
};
/**
 * @description 获取某对象再数组中的索引值。
 * @param {Array} array - 数组。
 * @param {Object} obj - 对象。
 * @returns {number} 某对象再数组中的索引值。
 */


SuperMap.Util.indexOf = function (array, obj) {
  if (array == null) {
    return -1;
  } else {
    // use the build-in function if available.
    if (typeof array.indexOf === "function") {
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
};
/**
 * @description 修改某 DOM 元素的许多属性。
 * @param {HTMLElement} element - 待修改的 DOM 元素。
 * @param {string} [id] - DOM 元素的 ID。
 * @param {SuperMap.Pixel} [px] - 包含 DOM 元素的 style 属性的 left 和 top 属性。
 * @param {SuperMap.Size} [sz] - 包含 DOM 元素的 width 和 height 属性。
 * @param {string} [position] - DOM 元素的 position 属性。
 * @param {string} [border] - DOM 元素的 style 属性的 border 属性。
 * @param {string} [overflow] - DOM 元素的 style 属性的 overflow 属性。
 * @param {number} [opacity] - 不透明度值。取值范围为(0.0 - 1.0)。
 */


SuperMap.Util.modifyDOMElement = function (element, id, px, sz, position, border, overflow, opacity) {
  if (id) {
    element.id = id;
  }

  if (px) {
    element.style.left = px.x + "px";
    element.style.top = px.y + "px";
  }

  if (sz) {
    element.style.width = sz.w + "px";
    element.style.height = sz.h + "px";
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
};
/**
 * @description Takes an object and copies any properties that don't exist from
 *     another properties, by analogy with SuperMap.Util.extend() from
 *     Prototype.js.
 *
 * @param {Object} [to] - 目标对象。
 * @param {Object} from - 源对象。Any properties of this object that
 *     are undefined in the to object will be set on the to object.
 *
 * @returns {Object} A reference to the to object.  Note that the to argument is modified
 *     in place and returned by this function.
 */


SuperMap.Util.applyDefaults = function (to, from) {
  to = to || {};
  /*
   * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
   * prototype object" when calling hawOwnProperty if the source object is an
   * instance of window.Event.
   */

  var fromIsEvt = typeof window.Event === "function" && from instanceof window.Event;

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
};
/**
 * @description 将参数对象转换为 HTTP 的 GET 请求中的参数字符串。例如："key1=value1&key2=value2&key3=value3"。
 * @param {Object} params - 参数对象。
 * @returns {string} HTTP 的 GET 请求中的参数字符串。
 */


SuperMap.Util.getParameterString = function (params) {
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

      paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
    }
  }

  return paramsArray.join("&");
};
/**
 * @description 给 URL 追加查询参数。
 * @param {string} url - 待追加参数的 URL 字符串。
 * @param {string} paramStr - 待追加的查询参数。
 * @returns {string} 新的 URL。
 */


SuperMap.Util.urlAppend = function (url, paramStr) {
  var newUrl = url;

  if (paramStr) {
    if (paramStr.indexOf('?') === 0) {
      paramStr = paramStr.substring(1);
    }

    var parts = (url + " ").split(/[?&]/);
    newUrl += parts.pop() === " " ? paramStr : parts.length ? "&" + paramStr : "?" + paramStr;
  }

  return newUrl;
};
/**
 * @description 给 URL 追加 path 参数。
 * @param {string} url - 待追加参数的 URL 字符串。
 * @param {string} paramStr - 待追加的path参数。
 * @returns {string} 新的 URL。
 */


SuperMap.Util.urlPathAppend = function (url, pathStr) {
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
};
/**
 * @description 为了避免浮点精度错误而保留的有效位数。
 * @type {number}
 * @default 14
 */


SuperMap.Util.DEFAULT_PRECISION = 14;
/**
 * @description 将字符串以接近的精度转换为数字。
 * @param {string} number - 字符串。
 * @param {number} [precision=14] - 精度。
 * @returns {number} 数字。
 */

SuperMap.Util.toFloat = function (number, precision) {
  if (precision == null) {
    precision = SuperMap.Util.DEFAULT_PRECISION;
  }

  if (typeof number !== "number") {
    number = parseFloat(number);
  }

  return precision === 0 ? number : parseFloat(number.toPrecision(precision));
};
/**
 * @description 角度转弧度。
 * @param {number} x - 角度。
 * @returns {number} 弧度。
 */


SuperMap.Util.rad = function (x) {
  return x * Math.PI / 180;
};
/**
 * @description 从 URL 字符串中解析出参数对象。
 * @param {string} url - URL。
 * @returns {Object} 解析出的参数对象。
 */


SuperMap.Util.getParameters = function (url) {
  // if no url specified, take it from the location bar
  url = url === null || url === undefined ? window.location.href : url; //parse out parameters portion of url string

  var paramsString = "";

  if (SuperMap.String.contains(url, '?')) {
    var start = url.indexOf('?') + 1;
    var end = SuperMap.String.contains(url, "#") ? url.indexOf('#') : url.length;
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
      } // being liberal by replacing "+" with " "


      var value = (keyValue[1] || '').replace(/\+/g, " ");

      try {
        value = decodeURIComponent(value);
      } catch (err) {
        value = unescape(value);
      } // follow OGC convention of comma delimited values


      value = value.split(","); //if there's only one value, do not return as array                    

      if (value.length == 1) {
        value = value[0];
      }

      parameters[key] = value;
    }
  }

  return parameters;
};
/**
 * @description 不断递增计数变量，用于生成唯一 ID。
 * @type {number}
 * @default 0
 */


SuperMap.Util.lastSeqID = 0;
/**
 * @description 创建唯一 ID 值。
 * @param {string} [prefix] - 前缀。
 * @returns {string} 唯一的 ID 值。
 */

SuperMap.Util.createUniqueID = function (prefix) {
  if (prefix == null) {
    prefix = "id_";
  }

  SuperMap.Util.lastSeqID += 1;
  return prefix + SuperMap.Util.lastSeqID;
};
/**
 * @memberOf SuperMap
 * @description 每单位的英尺数。
 * @type {Object}
 * @constant
 */


SuperMap.INCHES_PER_UNIT = {
  'inches': 1.0,
  'ft': 12.0,
  'mi': 63360.0,
  'm': 39.3701,
  'km': 39370.1,
  'dd': 4374754,
  'yd': 36
};
SuperMap.INCHES_PER_UNIT["in"] = SuperMap.INCHES_PER_UNIT.inches;
SuperMap.INCHES_PER_UNIT["degrees"] = SuperMap.INCHES_PER_UNIT.dd;
SuperMap.INCHES_PER_UNIT["nmi"] = 1852 * SuperMap.INCHES_PER_UNIT.m; // Units from CS-Map

SuperMap.METERS_PER_INCH = 0.02540005080010160020;
SuperMap.Util.extend(SuperMap.INCHES_PER_UNIT, {
  "Inch": SuperMap.INCHES_PER_UNIT.inches,
  "Meter": 1.0 / SuperMap.METERS_PER_INCH,
  //EPSG:9001
  "Foot": 0.30480060960121920243 / SuperMap.METERS_PER_INCH,
  //EPSG:9003
  "IFoot": 0.30480000000000000000 / SuperMap.METERS_PER_INCH,
  //EPSG:9002
  "ClarkeFoot": 0.3047972651151 / SuperMap.METERS_PER_INCH,
  //EPSG:9005
  "SearsFoot": 0.30479947153867624624 / SuperMap.METERS_PER_INCH,
  //EPSG:9041
  "GoldCoastFoot": 0.30479971018150881758 / SuperMap.METERS_PER_INCH,
  //EPSG:9094
  "IInch": 0.02540000000000000000 / SuperMap.METERS_PER_INCH,
  "MicroInch": 0.00002540000000000000 / SuperMap.METERS_PER_INCH,
  "Mil": 0.00000002540000000000 / SuperMap.METERS_PER_INCH,
  "Centimeter": 0.01000000000000000000 / SuperMap.METERS_PER_INCH,
  "Kilometer": 1000.00000000000000000000 / SuperMap.METERS_PER_INCH,
  //EPSG:9036
  "Yard": 0.91440182880365760731 / SuperMap.METERS_PER_INCH,
  "SearsYard": 0.914398414616029 / SuperMap.METERS_PER_INCH,
  //EPSG:9040
  "IndianYard": 0.91439853074444079983 / SuperMap.METERS_PER_INCH,
  //EPSG:9084
  "IndianYd37": 0.91439523 / SuperMap.METERS_PER_INCH,
  //EPSG:9085
  "IndianYd62": 0.9143988 / SuperMap.METERS_PER_INCH,
  //EPSG:9086
  "IndianYd75": 0.9143985 / SuperMap.METERS_PER_INCH,
  //EPSG:9087
  "IndianFoot": 0.30479951 / SuperMap.METERS_PER_INCH,
  //EPSG:9080
  "IndianFt37": 0.30479841 / SuperMap.METERS_PER_INCH,
  //EPSG:9081
  "IndianFt62": 0.3047996 / SuperMap.METERS_PER_INCH,
  //EPSG:9082
  "IndianFt75": 0.3047995 / SuperMap.METERS_PER_INCH,
  //EPSG:9083
  "Mile": 1609.34721869443738887477 / SuperMap.METERS_PER_INCH,
  "IYard": 0.91440000000000000000 / SuperMap.METERS_PER_INCH,
  //EPSG:9096
  "IMile": 1609.34400000000000000000 / SuperMap.METERS_PER_INCH,
  //EPSG:9093
  "NautM": 1852.00000000000000000000 / SuperMap.METERS_PER_INCH,
  //EPSG:9030
  "Lat-66": 110943.316488932731 / SuperMap.METERS_PER_INCH,
  "Lat-83": 110946.25736872234125 / SuperMap.METERS_PER_INCH,
  "Decimeter": 0.10000000000000000000 / SuperMap.METERS_PER_INCH,
  "Millimeter": 0.00100000000000000000 / SuperMap.METERS_PER_INCH,
  "Dekameter": 10.00000000000000000000 / SuperMap.METERS_PER_INCH,
  "Decameter": 10.00000000000000000000 / SuperMap.METERS_PER_INCH,
  "Hectometer": 100.00000000000000000000 / SuperMap.METERS_PER_INCH,
  "GermanMeter": 1.0000135965 / SuperMap.METERS_PER_INCH,
  //EPSG:9031
  "CaGrid": 0.999738 / SuperMap.METERS_PER_INCH,
  "ClarkeChain": 20.1166194976 / SuperMap.METERS_PER_INCH,
  //EPSG:9038
  "GunterChain": 20.11684023368047 / SuperMap.METERS_PER_INCH,
  //EPSG:9033
  "BenoitChain": 20.116782494375872 / SuperMap.METERS_PER_INCH,
  //EPSG:9062
  "SearsChain": 20.11676512155 / SuperMap.METERS_PER_INCH,
  //EPSG:9042
  "ClarkeLink": 0.201166194976 / SuperMap.METERS_PER_INCH,
  //EPSG:9039
  "GunterLink": 0.2011684023368047 / SuperMap.METERS_PER_INCH,
  //EPSG:9034
  "BenoitLink": 0.20116782494375872 / SuperMap.METERS_PER_INCH,
  //EPSG:9063
  "SearsLink": 0.2011676512155 / SuperMap.METERS_PER_INCH,
  //EPSG:9043
  "Rod": 5.02921005842012 / SuperMap.METERS_PER_INCH,
  "IntnlChain": 20.1168 / SuperMap.METERS_PER_INCH,
  //EPSG:9097
  "IntnlLink": 0.201168 / SuperMap.METERS_PER_INCH,
  //EPSG:9098
  "Perch": 5.02921005842012 / SuperMap.METERS_PER_INCH,
  "Pole": 5.02921005842012 / SuperMap.METERS_PER_INCH,
  "Furlong": 201.1684023368046 / SuperMap.METERS_PER_INCH,
  "Rood": 3.778266898 / SuperMap.METERS_PER_INCH,
  "CapeFoot": 0.3047972615 / SuperMap.METERS_PER_INCH,
  "Brealey": 375.00000000000000000000 / SuperMap.METERS_PER_INCH,
  "ModAmFt": 0.304812252984505969011938 / SuperMap.METERS_PER_INCH,
  "Fathom": 1.8288 / SuperMap.METERS_PER_INCH,
  "NautM-UK": 1853.184 / SuperMap.METERS_PER_INCH,
  "50kilometers": 50000.0 / SuperMap.METERS_PER_INCH,
  "150kilometers": 150000.0 / SuperMap.METERS_PER_INCH
}); //unit abbreviations supported by PROJ.4

SuperMap.Util.extend(SuperMap.INCHES_PER_UNIT, {
  "mm": SuperMap.INCHES_PER_UNIT["Meter"] / 1000.0,
  "cm": SuperMap.INCHES_PER_UNIT["Meter"] / 100.0,
  "dm": SuperMap.INCHES_PER_UNIT["Meter"] * 100.0,
  "km": SuperMap.INCHES_PER_UNIT["Meter"] * 1000.0,
  "kmi": SuperMap.INCHES_PER_UNIT["nmi"],
  //International Nautical Mile
  "fath": SuperMap.INCHES_PER_UNIT["Fathom"],
  //International Fathom
  "ch": SuperMap.INCHES_PER_UNIT["IntnlChain"],
  //International Chain
  "link": SuperMap.INCHES_PER_UNIT["IntnlLink"],
  //International Link
  "us-in": SuperMap.INCHES_PER_UNIT["inches"],
  //U.S. Surveyor's Inch
  "us-ft": SuperMap.INCHES_PER_UNIT["Foot"],
  //U.S. Surveyor's Foot
  "us-yd": SuperMap.INCHES_PER_UNIT["Yard"],
  //U.S. Surveyor's Yard
  "us-ch": SuperMap.INCHES_PER_UNIT["GunterChain"],
  //U.S. Surveyor's Chain
  "us-mi": SuperMap.INCHES_PER_UNIT["Mile"],
  //U.S. Surveyor's Statute Mile
  "ind-yd": SuperMap.INCHES_PER_UNIT["IndianYd37"],
  //Indian Yard
  "ind-ft": SuperMap.INCHES_PER_UNIT["IndianFt37"],
  //Indian Foot
  "ind-ch": 20.11669506 / SuperMap.METERS_PER_INCH //Indian Chain

});
/**
 * @memberOf SuperMap
 * @member [SuperMap.DOTS_PER_INCH=96]
 * @description 分辨率与比例尺之间转换的常量。
 * @type {Object}
 */

SuperMap.DOTS_PER_INCH = 96;
/**
 * @param {number} scale - 比例尺。
 * @returns {number} 返回正常的 scale 值。
 */

SuperMap.Util.normalizeScale = function (scale) {
  var normScale = scale > 1.0 ? 1.0 / scale : scale;
  return normScale;
};
/**
 * @description 比例尺转分辨率。
 * @param {number} scale - 比例尺。
 * @param {string} [units='degrees'] - 比例尺单位。
 * @returns {number} 分辨率。
 */


SuperMap.Util.getResolutionFromScale = function (scale, units) {
  var resolution;

  if (scale) {
    if (units == null) {
      units = "degrees";
    }

    var normScale = SuperMap.Util.normalizeScale(scale);
    resolution = 1 / (normScale * SuperMap.INCHES_PER_UNIT[units] * SuperMap.DOTS_PER_INCH);
  }

  return resolution;
};
/**
 * @description 分辨率转比例尺。
 * @param {number} resolution - 分辨率。
 * @param {string} [units='degrees'] - 分辨率单位。
 * @returns {number} 比例尺。
 */


SuperMap.Util.getScaleFromResolution = function (resolution, units) {
  if (units == null) {
    units = "degrees";
  }

  var scale = resolution * SuperMap.INCHES_PER_UNIT[units] * SuperMap.DOTS_PER_INCH;
  return scale;
};
/**
 * @memberOf SuperMap
 * @description 如果 userAgent 捕获到浏览器使用的是 Gecko 引擎则返回 true。
 * @constant
 */


SuperMap.IS_GECKO = function () {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("webkit") === -1 && ua.indexOf("gecko") !== -1;
}();
/**
 * @memberOf SuperMap
 * @description 浏览器名称，依赖于 userAgent 属性，BROWSER_NAME 可以是空，或者以下浏览器：
 *     * "opera" -- Opera
 *     * "msie"  -- Internet Explorer
 *     * "safari" -- Safari
 *     * "firefox" -- Firefox
 *     * "mozilla" -- Mozilla
 * @constant
 */


SuperMap.Browser = function () {
  var name = '',
      version = '',
      device = 'pc',
      uaMatch; //以下进行测试

  var ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf("msie") > -1 || ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1) {
    name = 'msie';
    uaMatch = ua.match(/msie ([\d.]+)/) || ua.match(/rv:([\d.]+)/);
  } else if (ua.indexOf("chrome") > -1) {
    name = 'chrome';
    uaMatch = ua.match(/chrome\/([\d.]+)/);
  } else if (ua.indexOf("firefox") > -1) {
    name = 'firefox';
    uaMatch = ua.match(/firefox\/([\d.]+)/);
  } else if (ua.indexOf("opera") > -1) {
    name = 'opera';
    uaMatch = ua.match(/version\/([\d.]+)/);
  } else if (ua.indexOf("safari") > -1) {
    name = 'safari';
    uaMatch = ua.match(/version\/([\d.]+)/);
  }

  version = uaMatch ? uaMatch[1] : '';

  if (ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1 || ua.indexOf("iphone") > -1) {
    device = 'apple';
  } else if (ua.indexOf("android") > -1) {
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
/**
 * @description 获取浏览器相关信息。支持的浏览器包括：Opera，Internet Explorer，Safari，Firefox。
 * @returns {Object} 获取浏览器名称、版本、设备名称。对应的属性分别为 name, version, device。
 */


SuperMap.Util.getBrowser = function () {
  return SuperMap.Browser;
};
/**
 * @description 浏览器是否支持 Canvas。
 * @returns {boolean} 获取当前浏览器是否支持 HTML5 Canvas。
 */


SuperMap.Util.isSupportCanvas = function () {
  var checkRes = true,
      broz = SuperMap.Util.getBrowser();

  if (document.createElement("canvas").getContext) {
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
 * @description 判断；浏览器是否支持 Canvas。
 * @returns {boolean} 获取当前浏览器是否支持 HTML5 Canvas 。
 */


SuperMap.Util.supportCanvas = function () {
  return SuperMap.Util.isSupportCanvas;
}; //将服务端的地图单位转成SuperMap的地图单位


SuperMap.INCHES_PER_UNIT["degree"] = SuperMap.INCHES_PER_UNIT.dd;
SuperMap.INCHES_PER_UNIT["meter"] = SuperMap.INCHES_PER_UNIT.m;
SuperMap.INCHES_PER_UNIT["foot"] = SuperMap.INCHES_PER_UNIT.ft;
SuperMap.INCHES_PER_UNIT["inch"] = SuperMap.INCHES_PER_UNIT.inches;
SuperMap.INCHES_PER_UNIT["mile"] = SuperMap.INCHES_PER_UNIT.mi;
SuperMap.INCHES_PER_UNIT["kilometer"] = SuperMap.INCHES_PER_UNIT.km;
SuperMap.INCHES_PER_UNIT["yard"] = SuperMap.INCHES_PER_UNIT.yd;
/**
 * @description 判断一个 URL 请求是否在当前域中。
 * @param {string} url - URL 请求字符串。
 * @returns {boolean} URL 请求是否在当前域中。
 */

SuperMap.Util.isInTheSameDomain = function (url) {
  if (!url) {
    return true;
  }

  var index = url.indexOf("//");
  var documentUrl = document.location.toString();
  var documentIndex = documentUrl.indexOf("//");

  if (index === -1) {
    return true;
  } else {
    var protocol;
    var substring = protocol = url.substring(0, index);
    var documentSubString = documentUrl.substring(documentIndex + 2);
    documentIndex = documentSubString.indexOf("/");
    var documentPortIndex = documentSubString.indexOf(":");
    var documentDomainWithPort = documentSubString.substring(0, documentIndex); //var documentPort;

    var documentprotocol = document.location.protocol;

    if (documentPortIndex !== -1) {// documentPort = +documentSubString.substring(documentPortIndex, documentIndex);
    } else {
      documentDomainWithPort += ':' + (documentprotocol.toLowerCase() === 'http:' ? 80 : 443);
    }

    if (documentprotocol.toLowerCase() !== substring.toLowerCase()) {
      return false;
    }

    substring = url.substring(index + 2);
    var portIndex = substring.indexOf(":");
    index = substring.indexOf("/");
    var domainWithPort = substring.substring(0, index);
    var domain;

    if (portIndex !== -1) {
      domain = substring.substring(0, portIndex);
    } else {
      domain = substring.substring(0, index);
      domainWithPort += ':' + (protocol.toLowerCase() === 'http:' ? 80 : 443);
    }

    var documentDomain = document.domain;

    if (domain === documentDomain && domainWithPort === documentDomainWithPort) {
      return true;
    }
  }

  return false;
};
/**
 * @description 计算 iServer 服务的 REST 图层的显示分辨率，需要从 iServer 的 REST 图层表述中获取 viewBounds、viewer、scale、coordUnit、datumAxis 五个参数，来进行计算。
 * @param {SuperMap.Bounds} viewBounds - 地图的参照可视范围，即地图初始化时默认的地图显示范围。
 * @param {SuperMap.Size} viewer - 地图初始化时默认的地图图片的尺寸。
 * @param {number} scale - 地图初始化时默认的显示比例尺。
 * @param {string} [coordUnit='degrees'] - 投影坐标系统的地图单位。
 * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则系统默认为 WGS84 参考系的椭球体长半轴 6378137。
 * @returns {number} 返回图层显示分辨率。
 */


SuperMap.Util.calculateDpi = function (viewBounds, viewer, scale, coordUnit, datumAxis) {
  //10000 是 0.1毫米与米的转换。DPI的计算公式：Viewer / DPI *  0.0254 * 10000 = ViewBounds * scale ，公式中的10000是为了提高计算结果的精度，以下出现的ratio皆为如此。
  if (!viewBounds || !viewer || !scale) {
    return;
  }

  var ratio = 10000,
      rvbWidth = viewBounds.getWidth(),
      rvbHeight = viewBounds.getHeight(),
      rvWidth = viewer.w,
      rvHeight = viewer.h; //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。

  datumAxis = datumAxis || 6378137;
  coordUnit = coordUnit || "degrees";
  var dpi;

  if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
    var num1 = rvbWidth / rvWidth,
        num2 = rvbHeight / rvHeight,
        resolution = num1 > num2 ? num1 : num2;
    dpi = 0.0254 * ratio / resolution / scale / (Math.PI * 2 * datumAxis / 360) / ratio;
  } else {
    var _resolution = rvbWidth / rvWidth;

    dpi = 0.0254 * ratio / _resolution / scale / ratio;
  }

  return dpi;
};
/**
 * @description 将对象转换成 JSON 字符串。
 * @param {Object} obj - 要转换成 JSON 的 Object 对象。
 * @returns {string} 返回转换后的 JSON 对象。
 */


SuperMap.Util.toJSON = function (obj) {
  var objInn = obj;

  if (objInn == null) {
    return null;
  }

  switch (objInn.constructor) {
    case String:
      //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
      objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
      objInn = objInn.replace(/\n/g, "\\n");
      objInn = objInn.replace(/\r/g, "\\r");
      objInn = objInn.replace("<", "&lt;");
      objInn = objInn.replace(">", "&gt;");
      objInn = objInn.replace(/%/g, "%25");
      objInn = objInn.replace(/&/g, "%26");
      return objInn;

    case Array:
      var arr = [];

      for (var i = 0, len = objInn.length; i < len; i++) {
        arr.push(SuperMap.Util.toJSON(objInn[i]));
      }

      return "[" + arr.join(",") + "]";

    case Number:
      return isFinite(objInn) ? String(objInn) : null;

    case Boolean:
      return String(objInn);

    case Date:
      var dateStr = "{" + "'__type':\"System.DateTime\"," + "'Year':" + objInn.getFullYear() + "," + "'Month':" + (objInn.getMonth() + 1) + "," + "'Day':" + objInn.getDate() + "," + "'Hour':" + objInn.getHours() + "," + "'Minute':" + objInn.getMinutes() + "," + "'Second':" + objInn.getSeconds() + "," + "'Millisecond':" + objInn.getMilliseconds() + "," + "'TimezoneOffset':" + objInn.getTimezoneOffset() + "}";
      return dateStr;

    default:
      if (objInn["toJSON"] != null && typeof objInn["toJSON"] === "function") {
        return objInn.toJSON();
      }

      if (_typeof(objInn) === "object") {
        if (objInn.length) {
          var _arr2 = [];

          for (var _i = 0, _len = objInn.length; _i < _len; _i++) {
            _arr2.push(SuperMap.Util.toJSON(objInn[_i]));
          }

          return "[" + _arr2.join(",") + "]";
        }

        var _arr = [];

        for (var attr in objInn) {
          //为解决SuperMap.Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
          if (typeof objInn[attr] !== "function" && attr !== "CLASS_NAME" && attr !== "parent") {
            _arr.push("'" + attr + "':" + SuperMap.Util.toJSON(objInn[attr]));
          }
        }

        if (_arr.length > 0) {
          return "{" + _arr.join(",") + "}";
        } else {
          return "{}";
        }
      }

      return objInn.toString();
  }
};
/**
 * @description 根据比例尺和 dpi 计算屏幕分辨率。
 * @param {number} scale - 比例尺。
 * @param {number} dpi - 图像分辨率，表示每英寸内的像素个数。
 * @param {string} [coordUnit] - 投影坐标系统的地图单位。
 * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则 DPI 默认按照 WGS84 参考系的椭球体长半轴 6378137 来计算。
 * @returns {number} 返回当前比例尺下的屏幕分辨率。
 */


SuperMap.Util.getResolutionFromScaleDpi = function (scale, dpi, coordUnit, datumAxis) {
  var resolution = null,
      ratio = 10000; //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。

  datumAxis = datumAxis || 6378137;
  coordUnit = coordUnit || "";

  if (scale > 0 && dpi > 0) {
    scale = SuperMap.Util.normalizeScale(scale);

    if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
      //scale = SuperMap.Util.normalizeScale(scale);
      resolution = 0.0254 * ratio / dpi / scale / (Math.PI * 2 * datumAxis / 360) / ratio;
      return resolution;
    } else {
      resolution = 0.0254 * ratio / dpi / scale / ratio;
      return resolution;
    }
  }

  return -1;
};
/**
 * @description 根据 resolution、dpi、coordUnit 和 datumAxis 计算比例尺。
 * @param {number} resolution - 用于计算比例尺的地图分辨率。
 * @param {number} dpi - 图像分辨率，表示每英寸内的像素个数。
 * @param {string} [coordUnit] - 投影坐标系统的地图单位。
 * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则 DPI 默认按照 WGS84 参考系的椭球体长半轴 6378137 来计算。
 * @returns {number} 返回当前屏幕分辨率下的比例尺。
 */


SuperMap.Util.getScaleFromResolutionDpi = function (resolution, dpi, coordUnit, datumAxis) {
  var scale = null,
      ratio = 10000; //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。

  datumAxis = datumAxis || 6378137;
  coordUnit = coordUnit || "";

  if (resolution > 0 && dpi > 0) {
    if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
      scale = 0.0254 * ratio / dpi / resolution / (Math.PI * 2 * datumAxis / 360) / ratio;
      return scale;
    } else {
      scale = 0.0254 * ratio / dpi / resolution / ratio;
      return scale;
    }
  }

  return -1;
};
/**
 * @description 转换查询结果。
 * @param {Object} result - 查询结果。
 * @returns {Object} 转换后的查询结果。
 */


SuperMap.Util.transformResult = function (result) {
  if (result.responseText && typeof result.responseText === "string") {
    result = JSON.parse(result.responseText);
  }

  return result;
};
/**
 * @description 属性拷贝，不拷贝方法类名(CLASS_NAME)等。
 * @param {Object} [destination] - 拷贝目标。
 * @param {Object} source - 源对象。
 *
 */


SuperMap.Util.copyAttributes = function (destination, source) {
  destination = destination || {};

  if (source) {
    for (var property in source) {
      var value = source[property];

      if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
        destination[property] = value;
      }
    }
  }

  return destination;
};
/**
 * @description 将源对象上的属性拷贝到目标对象上。（不拷贝 CLASS_NAME 和方法）
 * @param {Object} [destination] - 目标对象。
 * @param {Object} source - 源对象。
 * @param {Array.<string>} clip - 源对象中禁止拷贝到目标对象的属性，目的是防止目标对象上不可修改的属性被篡改。
 *
 */


SuperMap.Util.copyAttributesWithClip = function (destination, source, clip) {
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

      if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
        destination[property] = value;
      }
    }
  }

  return destination;
};
/**
 * @description 克隆一个 Object 对象
 * @param {Object} obj - 需要克隆的对象。
 * @returns {Object} 返回对象的拷贝对象，注意是新的对象，不是指向。
 */


SuperMap.Util.cloneObject = function (obj) {
  // Handle the 3 simple types, and null or undefined
  if (null === obj || "object" !== _typeof(obj)) {
    return obj;
  } // Handle Date


  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  } // Handle Array


  if (obj instanceof Array) {
    var _copy = obj.slice(0);

    return _copy;
  } // Handle Object


  if (obj instanceof Object) {
    var _copy2 = {};

    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        _copy2[attr] = SuperMap.Util.cloneObject(obj[attr]);
      }
    }

    return _copy2;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};
/**
 * @description 判断两条线段是不是有交点。
 * @param {SuperMap.Geometry.Point} a1 - 第一条线段的起始节点。
 * @param {SuperMap.Geometry.Point} a2 - 第一条线段的结束节点。
 * @param {SuperMap.Geometry.Point} b1 - 第二条线段的起始节点。
 * @param {SuperMap.Geometry.Point} b2 - 第二条线段的结束节点。
 * @returns {Object} 如果相交返回交点，如果不相交返回两条线段的位置关系。
 */


SuperMap.Util.lineIntersection = function (a1, a2, b1, b2) {
  var intersectValue = null;
  var k1;
  var k2;
  var b = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
  var a = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
  var ab = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y); //ab==0代表两条线断的斜率一样

  if (ab != 0) {
    k1 = b / ab;
    k2 = a / ab;

    if (k1 >= 0 && k2 <= 1 && k1 <= 1 && k2 >= 0) {
      intersectValue = new SuperMap.Geometry.Point(a1.x + k1 * (a2.x - a1.x), a1.y + k1 * (a2.y - a1.y));
    } else {
      intersectValue = "No Intersection";
    }
  } else {
    if (b == 0 && a == 0) {
      var maxy = Math.max(a1.y, a2.y);
      var miny = Math.min(a1.y, a2.y);
      var maxx = Math.max(a1.x, a2.x);
      var minx = Math.min(a1.x, a2.x);

      if ((b1.y >= miny && b1.y <= maxy || b2.y >= miny && b2.y <= maxy) && b1.x >= minx && b1.x <= maxx || b2.x >= minx && b2.x <= maxx) {
        intersectValue = "Coincident"; //重合
      } else {
        intersectValue = "Parallel"; //平行
      }
    } else {
      intersectValue = "Parallel"; //平行
    }
  }

  return intersectValue;
};
/**
 * @description 获取文本外接矩形宽度与高度。
 * @param {SuperMap.ThemeStyle} style - 文本样式。
 * @param {string} text - 文本内容。
 * @param {Object} element - DOM 元素。
 * @returns {Object} 返回裁剪后的宽度，高度信息。
 */


SuperMap.Util.getTextBounds = function (style, text, element) {
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
  element.style.visibility = 'hidden'; //fix 在某些情况下，element内的文本变成竖起排列，导致宽度计算不正确的bug

  element.style.display = 'inline-block';
  element.innerHTML = text;
  var textWidth = element.clientWidth;
  var textHeight = element.clientHeight;
  document.body.removeChild(element);
  return {
    textWidth: textWidth,
    textHeight: textHeight
  };
};
// CONCATENATED MODULE: ./src/common/commontypes/Event.js
/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @name Event
 * @memberOf SuperMap
 * @namespace
 * @description 事件处理函数.
 */

var Event = SuperMap.Event = {
  /**
   * @description  A hash table cache of the event observers. Keyed by element._eventCacheID
   * @type {boolean}
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
   * @description Cross browser event element detection.
   * @param {Event} event - The event
   * @returns {HTMLElement} The element that caused the event
   */
  element: function element(event) {
    return event.target || event.srcElement;
  },

  /**
   * @description Determine whether event was caused by a single touch
   * @param {Event} event - The event
   * @returns {boolean}
   */
  isSingleTouch: function isSingleTouch(event) {
    return event.touches && event.touches.length === 1;
  },

  /**
   * @description Determine whether event was caused by a multi touch
   * @param {Event} event - The event
   * @returns {boolean}
   */
  isMultiTouch: function isMultiTouch(event) {
    return event.touches && event.touches.length > 1;
  },

  /**
   * @description Determine whether event was caused by a left click.
   * @param {Event} event - The event
   * @returns {boolean}
   */
  isLeftClick: function isLeftClick(event) {
    return event.which && event.which === 1 || event.button && event.button === 1;
  },

  /**
   * @description Determine whether event was caused by a right mouse click.
   * @param {Event} event - The event
   * @returns {boolean}
   */
  isRightClick: function isRightClick(event) {
    return event.which && event.which === 3 || event.button && event.button === 2;
  },

  /**
   * @description Stops an event from propagating.
   * @param {Event} event - The event
   * @param {boolean} allowDefault - If true, we stop the event chain but still allow the default browser  behaviour (text selection, radio-button clicking, etc) Default false
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
   * @param {Event} event - The event。
   * @param {string} tagName - html 标签名。
   * @returns {HTMLElement} The first node with the given tagName, starting from the node the event was triggered on and traversing the DOM upwards
   */
  findElement: function findElement(event, tagName) {
    var element = SuperMap.Event.element(event);

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
    var element = Util.getElement(elementParam);
    useCapture = useCapture || false;

    if (name === 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) {
      name = 'keydown';
    } //if observers cache has not yet been created, create it


    if (!this.observers) {
      this.observers = {};
    } //if not already assigned, make a new unique cache ID


    if (!element._eventCacheID) {
      var idPrefix = "eventCacheID_";

      if (element.id) {
        idPrefix = element.id + "_" + idPrefix;
      }

      element._eventCacheID = Util.createUniqueID(idPrefix);
    }

    var cacheID = element._eventCacheID; //if there is not yet a hash entry for this element, add one

    if (!this.observers[cacheID]) {
      this.observers[cacheID] = [];
    } //add a new observer to this element's list


    this.observers[cacheID].push({
      'element': element,
      'name': name,
      'observer': observer,
      'useCapture': useCapture
    }); //add the actual browser event listener

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
   * @description Given the id of an element to stop observing, cycle through the
   *   element's cached observers, calling stopObserving on each one,
   *   skipping those entries which can no longer be removed.
   *
   * @param {(HTMLElement|string)} elementParam - 
   */
  stopObservingElement: function stopObservingElement(elementParam) {
    var element = Util.getElement(elementParam);
    var cacheID = element._eventCacheID;

    this._removeElementObservers(SuperMap.Event.observers[cacheID]);
  },

  /**
   * @param {Array.<Object>} elementObservers - Array of (element, name,
   *                                         observer, usecapture) objects,
   *                                         taken directly from hashtable
   */
  _removeElementObservers: function _removeElementObservers(elementObservers) {
    if (elementObservers) {
      for (var i = elementObservers.length - 1; i >= 0; i--) {
        var entry = elementObservers[i];
        var args = new Array(entry.element, entry.name, entry.observer, entry.useCapture);
        SuperMap.Event.stopObserving.apply(this, args);
      }
    }
  },

  /**
   * @description 移除事件监听和注册的事件处理方法。注意：事件的移除和监听相对应，移除时的各属性信息必须监听时
   * 保持一致才能确保事件移除成功。
   * @param {(HTMLElement|string)} elementParam - 被监听的 DOM 元素或者其 ID。
   * @param {string} name - 需要移除的被监听事件名称。
   * @param {function} observer - 需要移除的事件处理方法。
   * @param {boolean} [useCapture=false] - 是否捕获。
   * @returns {boolean} Whether or not the event observer was removed
   */
  stopObserving: function stopObserving(elementParam, name, observer, useCapture) {
    useCapture = useCapture || false;
    var element = Util.getElement(elementParam);
    var cacheID = element._eventCacheID;

    if (name === 'keypress') {
      if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent) {
        name = 'keydown';
      }
    } // find element's entry in this.observers cache and remove it


    var foundEntry = false;
    var elementObservers = SuperMap.Event.observers[cacheID];

    if (elementObservers) {
      // find the specific event type in the element's list
      var i = 0;

      while (!foundEntry && i < elementObservers.length) {
        var cacheEntry = elementObservers[i];

        if (cacheEntry.name === name && cacheEntry.observer === observer && cacheEntry.useCapture === useCapture) {
          elementObservers.splice(i, 1);

          if (elementObservers.length == 0) {
            delete SuperMap.Event.observers[cacheID];
          }

          foundEntry = true;
          break;
        }

        i++;
      }
    } //actually remove the event listener from browser


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
   * @description Cycle through all the element entries in the events cache and call
   *   stopObservingElement on each.
   */
  unloadCache: function unloadCache() {
    // check for SuperMap.Event before checking for observers, because
    // SuperMap.Event may be undefined in IE if no map instance was
    // created
    if (SuperMap.Event && SuperMap.Event.observers) {
      for (var cacheID in SuperMap.Event.observers) {
        var elementObservers = SuperMap.Event.observers[cacheID];

        SuperMap.Event._removeElementObservers.apply(this, [elementObservers]);
      }

      SuperMap.Event.observers = false;
    }
  },
  CLASS_NAME: "SuperMap.Event"
};
SuperMap.Event = Event;
/* prevent memory leaks in IE */

SuperMap.Event.observe(window, 'unload', SuperMap.Event.unloadCache, false);
// CONCATENATED MODULE: ./src/common/commontypes/Events.js
function Events_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Events_typeof = function _typeof(obj) { return typeof obj; }; } else { Events_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Events_typeof(obj); }

function Events_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Events_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Events_createClass(Constructor, protoProps, staticProps) { if (protoProps) Events_defineProperties(Constructor.prototype, protoProps); if (staticProps) Events_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.Events
 * @classdesc 事件类。
 * @param {Object} object - 当前事件对象被添加到的 JS 对象。
 * @param {HTMLElement} element - 响应浏览器事件的 DOM 元素。
 * @param {Array.<string>} eventTypes - 自定义应用事件的数组。
 * @param {boolean} [fallThrough=false] - 是否允许事件处理之后向上传递（冒泡），为 false 的时候阻止事件冒泡。
 * @param {Object} options - 事件对象选项。
 */

var Events_Events =
/*#__PURE__*/
function () {
  function Events(object, element, eventTypes, fallThrough, options) {
    Events_classCallCheck(this, Events);

    /**
     * @member {Array.<string>} SuperMap.Events.prototype.BROWSER_EVENTS
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
     * @member {Object} SuperMap.Events.prototype.listeners
     * @description Hashtable of Array(function): events listener functions
     */

    this.listeners = {};
    /**
     * @member {Object} SuperMap.Events.prototype.object
     * @description  发布应用程序事件的对象。
     */

    this.object = object;
    /**
     * @member {HTMLElement} SuperMap.Events.prototype.element
     * @description 接受浏览器事件的 DOM 节点。
     */

    this.element = null;
    /**
     * @member {Array.<string>} SuperMap.Events.prototype.eventTypes
     * @description 支持的事件类型列表。
     */

    this.eventTypes = [];
    /**
     * @member {function} SuperMap.Events.prototype.eventHandler
     * @description 绑定在元素上的事件处理器对象。
     */

    this.eventHandler = null;
    /**
     * @member {boolean} [SuperMap.Events.prototype.fallThrough=false]
     * @description 是否允许事件处理之后向上传递（冒泡），为 false 的时候阻止事件冒泡。
     */

    this.fallThrough = fallThrough;
    /**
     * @member {boolean} [SuperMap.Events.prototype.includeXY=false]
     * @description 判断是否让 xy 属性自动创建到浏览器上的鼠标事件，一般设置为 false，如果设置为 true，鼠标事件将会在事件传递过程中自动产生 xy 属性。
     *              可根据事件对象的 'evt.object' 属性在相关的事件句柄上调用 getMousePosition 函数。这个选项习惯默认为 false 的原因在于，当创建一个
     *              事件对象，其主要目的是管理。在一个 div 的相对定位的鼠标事件，将其设为 true 也是有意义的。这个选项也可以用来控制是否抵消缓存。如果
     *              设为 false 不抵消，如果设为 true，用 this.clearMouseCache() 清除缓存偏移（边界元素偏移，元素在页面的位置偏移）。
     * @example
     *  function named(evt) {
     *        this.xy = this.object.events.getMousePosition(evt);
     *  }
     */

    this.includeXY = false;
    /**
     * @member {Object} SuperMap.Events.prototype.extensions
     * @description 事件扩展。Keys 代表事件类型，values 代表事件对象。
     * @example
     * 以扩展 "foostart" 和 "fooend" 事件为例。展示替换 css 属性为 foo 的元素的 click 事件。
     *
     *   SuperMap.Events.foostart = SuperMap.Class({
    *       initialize: function(target) {
    *           this.target = target;
    *           this.target.register("click", this, this.doStuff, {extension: true});
    *           // only required if extension provides more than one event type
    *           this.target.extensions["foostart"] = true;
    *           this.target.extensions["fooend"] = true;
    *       },
    *       destroy: function() {
    *           var target = this.target;
    *           target.unregister("click", this, this.doStuff);
    *           delete this.target;
    *           // only required if extension provides more than one event type
    *           delete target.extensions["foostart"];
    *           delete target.extensions["fooend"];
    *       },
    *       doStuff: function(evt) {
    *           var propagate = true;
    *           if (SuperMap.Event.element(evt).className === "foo") {
    *               propagate = false;
    *               var target = this.target;
    *               target.triggerEvent("foostart");
    *               window.setTimeout(function() {
    *                   target.triggerEvent("fooend");
    *               }, 1000);
    *           }
    *           return propagate;
    *       }
    *   });
     *   // only required if extension provides more than one event type
     *   SuperMap.Events.fooend = SuperMap.Events.foostart;
     */

    this.extensions = {};
    /**
     * @member {Object} SuperMap.Events.prototype.extensionCount
     */

    this.extensionCount = {};
    /**
     * @member {Object} SuperMap.Events.prototype.clearMouseListener
     */

    this.clearMouseListener = null;
    Util.extend(this, options);

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
   * @function SuperMap.Events.prototype.destroy
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
     * @function SuperMap.Events.prototype.addEventType
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
     * @function SuperMap.Events.prototype.attachToElement
     * @description 给 DOM 元素绑定浏览器事件。
     * @param {HTMLDOMElement} element - 绑定浏览器事件的 DOM 元素。
     */

  }, {
    key: "attachToElement",
    value: function attachToElement(element) {
      if (this.element) {
        Event.stopObservingElement(this.element);
      } else {
        // keep a bound copy of handleBrowserEvent() so that we can
        // pass the same function to both Event.observe() and .stopObserving()
        this.eventHandler = FunctionExt.bindAsEventListener(this.handleBrowserEvent, this); // to be used with observe and stopObserving

        this.clearMouseListener = FunctionExt.bind(this.clearMouseCache, this);
      }

      this.element = element;

      for (var i = 0, len = this.BROWSER_EVENTS.length; i < len; i++) {
        var eventType = this.BROWSER_EVENTS[i]; // every browser event has a corresponding application event
        // (whether it's listened for or not).

        this.addEventType(eventType); // use Prototype to register the event cross-browser

        Event.observe(element, eventType, this.eventHandler);
      } // disable dragstart in IE so that mousedown/move/up works normally


      Event.observe(element, "dragstart", Event.stop);
    }
    /**
     * @function SuperMap.Events.prototype.on
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
     * @function SuperMap.Events.prototype.register
     * @description 在事件对象上注册一个事件。当事件被触发时，'func' 函数被调用，假设我们触发一个事件，
     *              指定 SuperMap.Bounds 作为 "obj"，当事件被触发时，回调函数的上下文作为 Bounds 对象。
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

      if (func != null && Util.indexOf(this.eventTypes, type) !== -1) {
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
     * @function SuperMap.Events.prototype.registerPriority
     * @description 相同的注册方法，但是在前面增加新的监听者事件查询而代替到方法的结束。
     * @param {string} type - 事件注册者的名字。
     * @param {Object} [obj=this.object] - 对象绑定方面的回调。
     * @param {function} [func] - 回调函数，如果没有特定的回调，则这个函数不做任何事情。
     */

  }, {
    key: "registerPriority",
    value: function registerPriority(type, obj, func) {
      this.register(type, obj, func, true);
    }
    /**
     * @function SuperMap.Events.prototype.un
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
     * @function SuperMap.Events.prototype.unregister
     * @description 取消注册。
     * @param {string} type - 事件类型。
     * @param {Object} [obj=this.object] - 对象绑定方面的回调。
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
     * @function SuperMap.Events.prototype.remove
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
     * @function SuperMap.Events.prototype.triggerEvent
     * @description 触发一个特定的注册事件。
     * @param {string} type - 触发事件类型。
     * @param {Event} evt - 事件对象。
     * @returns {boolean} 返回监听对象，如果返回是 false，则停止监听。
     */

  }, {
    key: "triggerEvent",
    value: function triggerEvent(type, evt) {
      var listeners = this.listeners[type]; // fast path

      if (!listeners || listeners.length == 0) {
        return undefined;
      } // prep evt object with object & div references


      if (evt == null) {
        evt = {};
      }

      evt.object = this.object;
      evt.element = this.element;

      if (!evt.type) {
        evt.type = type;
      } // execute all callbacks registered for specified type
      // get a clone of the listeners array to
      // allow for splicing during callbacks


      listeners = listeners.slice();
      var continueChain;

      for (var i = 0, len = listeners.length; i < len; i++) {
        var callback = listeners[i]; // bind the context to callback.obj

        continueChain = callback.func.apply(callback.obj, [evt]);

        if (continueChain != undefined && continueChain === false) {
          // if callback returns false, execute no more callbacks.
          break;
        }
      } // don't fall through to other DOM elements


      if (!this.fallThrough) {
        Event.stop(evt, true);
      }

      return continueChain;
    }
    /**
     * @function SuperMap.Events.prototype.handleBrowserEvent
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
      } // add clientX & clientY to all events - corresponds to average x, y


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
     * @function SuperMap.Events.prototype.clearMouseCache
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
     * @function SuperMap.Events.prototype.getMousePosition
     * @param {Event} evt - 事件对象。
     * @returns {SuperMap.Pixel} 当前的鼠标的 xy 坐标点。
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
        var viewportElement = Util.getViewportElement();
        this.element.scrolls = [viewportElement.scrollLeft, viewportElement.scrollTop];
      }

      if (!this.element.lefttop) {
        this.element.lefttop = [document.documentElement.clientLeft || 0, document.documentElement.clientTop || 0];
      }

      if (!this.element.offsets) {
        this.element.offsets = Util.pagePosition(this.element);
      }

      return new Pixel_Pixel(evt.clientX + this.element.scrolls[0] - this.element.offsets[0] - this.element.lefttop[0], evt.clientY + this.element.scrolls[1] - this.element.offsets[1] - this.element.lefttop[1]);
    }
  }]);

  return Events;
}();
SuperMap.Events = Events_Events;
SuperMap.Events.prototype.BROWSER_EVENTS = ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur", "touchstart", "touchmove", "touchend", "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup", "MSGestureStart", "MSGestureChange", "MSGestureEnd", "contextmenu"];
// EXTERNAL MODULE: external "function(){try{return elasticsearch}catch(e){return {}}}()"
var external_function_try_return_elasticsearch_catch_e_return_ = __webpack_require__(3);
var external_function_try_return_elasticsearch_catch_e_return_default = /*#__PURE__*/__webpack_require__.n(external_function_try_return_elasticsearch_catch_e_return_);

// CONCATENATED MODULE: ./src/common/thirdparty/elasticsearch/ElasticSearch.js
function ElasticSearch_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ElasticSearch_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ElasticSearch_createClass(Constructor, protoProps, staticProps) { if (protoProps) ElasticSearch_defineProperties(Constructor.prototype, protoProps); if (staticProps) ElasticSearch_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.ElasticSearch
 * @classdesc ElasticSearch服务类。
 * @category ElasticSearch
 * @param {string} url - ElasticSearch服务地址。
 * @param {Object} options - 参数。
 * @param {function} [options.change] - 服务器返回数据后执行的函数。废弃,不建议使用。使用search或msearch方法。
 * @param {boolean} [options.openGeoFence=false] - 是否开启地理围栏验证，默认为不开启。
 * @param {function} [options.outOfGeoFence] - 数据超出地理围栏后执行的函数。
 * @param {Object} [options.geoFence] - 地理围栏。
 */

var ElasticSearch_ElasticSearch =
/*#__PURE__*/
function () {
  function ElasticSearch(url, options) {
    ElasticSearch_classCallCheck(this, ElasticSearch);

    options = options || {};
    /**
     *  @member {string} SuperMap.ElasticSearch.prototype.url 
     *  @description ElasticSearch服务地址
     */

    this.url = url;
    /**
     *  @member {Object} SuperMap.ElasticSearch.prototype.client
     *  @description client ES客户端
     */

    this.client = new external_function_try_return_elasticsearch_catch_e_return_default.a.Client({
      host: this.url
    });
    /**
     *  @deprecated
     *  @member {function} [SuperMap.ElasticSearch.prototype.change]
     *  @description 服务器返回数据后执行的函数。废弃,不建议使用。使用search或msearch方法。
     */

    this.change = null;
    /**
     *  @member {boolean} [SuperMap.ElasticSearch.prototype.openGeoFence=false]
     *  @description 是否开启地理围栏验证，默认为不开启。
     */

    this.openGeoFence = false;
    /**
     *  @member {function} [SuperMap.ElasticSearch.prototype.outOfGeoFence]
     *  @description 数据超出地理围栏后执行的函数
     */

    this.outOfGeoFence = null;
    /**
     * @member {Object} [SuperMap.ElasticSearch.prototype.geoFence]
     * @description 地理围栏
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
     * @member {SuperMap.Events} SuperMap.ElasticSearch.prototype.events
     * @description 事件
     */

    this.events = new Events_Events(this, null, this.EVENT_TYPES);
    /**
     * @member {Object} SuperMap.ElasticSearch.prototype.eventListeners
     * @description 听器对象，在构造函数中设置此参数（可选），对 MapService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */

    this.eventListeners = null;
    Util.extend(this, options);

    if (this.eventListeners instanceof Object) {
      this.events.on(this.eventListeners);
    }
  }
  /**
   * @function  SuperMap.ElasticSearch.prototype.setGeoFence
   * @description 设置地理围栏，openGeoFence参数为true的时候，设置的地理围栏才生效。
   * @param {SuperMap.Geometry} geoFence - 地理围栏。
   */


  ElasticSearch_createClass(ElasticSearch, [{
    key: "setGeoFence",
    value: function setGeoFence(geoFence) {
      this.geoFence = geoFence;
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.bulk
     * @description 批量操作API，允许执行多个索引/删除操作。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-bulk}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "bulk",
    value: function bulk(params, callback) {
      return this.client.bulk(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.clearScroll
     * @description 通过指定scroll参数进行查询来清除已经创建的scroll请求。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-clearscroll}</br>
     *更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "clearScroll",
    value: function clearScroll(params, callback) {
      return this.client.clearScroll(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.count
     * @description 获取集群、索引、类型或查询的文档个数。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-count}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-count.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "count",
    value: function count(params, callback) {
      return this.client.count(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.count
     * @description 在特定索引中添加一个类型化的JSON文档，使其可搜索。如果具有相同index，type且id已经存在的文档将发生错误。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-create}
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html}
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "create",
    value: function create(params, callback) {
      return this.client.create(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.delete
     * @description 根据其ID从特定索引中删除键入的JSON文档。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-delete}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "delete",
    value: function _delete(params, callback) {
      return this.client["delete"](params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.delete
     * @description 根据其ID从特定索引中删除键入的JSON文档。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletebyquery}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "deleteByQuery",
    value: function deleteByQuery(params, callback) {
      return this.client.deleteByQuery(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.delete
     * @description 根据其ID删除脚本。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletescript}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "deleteScript",
    value: function deleteScript(params, callback) {
      return this.client.deleteScript(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.deleteTemplate
     * @description 根据其ID删除模板。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletetemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "deleteTemplate",
    value: function deleteTemplate(params, callback) {
      return this.client.deleteTemplate(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.exists
     * @description 检查给定文档是否存在。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-exists}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "exists",
    value: function exists(params, callback) {
      return this.client.exists(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.existsSource
     * @description 检查资源是否存在。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-existssource}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "existsSource",
    value: function existsSource(params, callback) {
      return this.client.existsSource(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.explain
     * @description 提供与特定查询相关的特定文档分数的详细信息。它还会告诉您文档是否与指定的查询匹配。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-explain}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-explain.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "explain",
    value: function explain(params, callback) {
      return this.client.explain(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.fieldCaps
     * @description 允许检索多个索引之间的字段的功能。(实验性API，可能会在未来版本中删除)</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-fieldcaps}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-field-caps.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "fieldCaps",
    value: function fieldCaps(params, callback) {
      return this.client.fieldCaps(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.get
     * @description 从索引获取一个基于其id的类型的JSON文档。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-get}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "get",
    value: function get(params, callback) {
      return this.client.get(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.getScript
     * @description 获取脚本。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getscript}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "getScript",
    value: function getScript(params, callback) {
      return this.client.getScript(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.getSource
     * @description 通过索引，类型和ID获取文档的源。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getsource}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "getSource",
    value: function getSource(params, callback) {
      return this.client.getSource(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.getTemplate
     * @description 获取模板。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-gettemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "getTemplate",
    value: function getTemplate(params, callback) {
      return this.client.getTemplate(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.index
     * @description 在索引中存储一个键入的JSON文档，使其可搜索。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-index}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "index",
    value: function index(params, callback) {
      return this.client.index(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.info
     * @description 从当前集群获取基本信息。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-info}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/index.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "info",
    value: function info(params, callback) {
      return this.client.info(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.mget
     * @description 根据索引，类型（可选）和ids来获取多个文档。mget所需的主体可以采用两种形式：文档位置数组或文档ID数组。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mget}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "mget",
    value: function mget(params, callback) {
      return this.client.mget(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.msearch
     * @description 在同一请求中执行多个搜索请求。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearch}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 请求返回的回调函数。也可以使用then表达式获取返回结果。
     *     回调参数：error,response。结果存储在response.responses中
     */

  }, {
    key: "msearch",
    value: function msearch(params, callback) {
      var me = this;
      return me.client.msearch(params).then(function (resp) {
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
     * @function  SuperMap.ElasticSearch.prototype.msearchTemplate
     * @description 在同一请求中执行多个搜索模板请求。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearchtemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "msearchTemplate",
    value: function msearchTemplate(params, callback) {
      return this.client.msearchTemplate(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.mtermvectors
     * @description 多termvectors API允许一次获得多个termvectors。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mtermvectors}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-termvectors.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "mtermvectors",
    value: function mtermvectors(params, callback) {
      return this.client.mtermvectors(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.ping
     * @description 测试连接。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-ping}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/index.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "ping",
    value: function ping(params, callback) {
      return this.client.ping(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.putScript
     * @description 添加脚本。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-putscript}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "putScript",
    value: function putScript(params, callback) {
      return this.client.putScript(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.putTemplate
     * @description 添加模板。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-puttemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "putTemplate",
    value: function putTemplate(params, callback) {
      return this.client.putTemplate(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.reindex
     * @description 重新索引。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindex}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "reindex",
    value: function reindex(params, callback) {
      return this.client.reindex(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.reindexRessrottle
     * @description 重新索引。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindexrethrottle}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "reindexRessrottle",
    value: function reindexRessrottle(params, callback) {
      return this.client.reindexRessrottle(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.renderSearchTemplate
     * @description 搜索模板。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-rendersearchtemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "renderSearchTemplate",
    value: function renderSearchTemplate(params, callback) {
      return this.client.renderSearchTemplate(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.scroll
     * @description  在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。</br>
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-scroll}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "scroll",
    value: function scroll(params, callback) {
      return this.client.scroll(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.search
     * @description  在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 请求返回的回调函数。也可以使用then表达式获取返回结果。
     *     回调参数：error,response,结果存储在response.responses中
     */

  }, {
    key: "search",
    value: function search(params, callback) {
      var me = this;
      return me.client.search(params).then(function (resp) {
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
     * @function  SuperMap.ElasticSearch.prototype.searchShards
     * @description  返回要执行搜索请求的索引和分片。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchshards}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-shards.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "searchShards",
    value: function searchShards(params, callback) {
      return this.client.searchShards(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.searchTemplate
     * @description  搜索模板。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchtemplate}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "searchTemplate",
    value: function searchTemplate(params, callback) {
      return this.client.searchTemplate(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.suggest
     * @description 该建议功能通过使用特定的建议者，基于所提供的文本来建议类似的术语。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-suggest}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "suggest",
    value: function suggest(params, callback) {
      return this.client.suggest(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.termvectors
     * @description 返回有关特定文档字段中的术语的信息和统计信息。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-termvectors}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-termvectors.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "termvectors",
    value: function termvectors(params, callback) {
      return this.client.termvectors(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.update
     * @description 更新文档的部分。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-update}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "update",
    value: function update(params, callback) {
      return this.client.update(params, callback);
    }
    /**
     * @function  SuperMap.ElasticSearch.prototype.update
     * @description 通过查询API来更新文档。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-updatebyquery}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */

  }, {
    key: "updateByQuery",
    value: function updateByQuery(params, callback) {
      return this.client.updateByQuery(params, callback);
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
      }); //change方法已废弃，不建议使用。建议使用search方法的第二个参数传入请求成功的回调

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
SuperMap.ElasticSearch = ElasticSearch_ElasticSearch;
// EXTERNAL MODULE: ./node_modules/promise-polyfill/dist/polyfill.js
var polyfill = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/fetch-ie8/fetch.js
var fetch = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/fetch-jsonp/build/fetch-jsonp.js
var fetch_jsonp = __webpack_require__(2);
var fetch_jsonp_default = /*#__PURE__*/__webpack_require__.n(fetch_jsonp);

// CONCATENATED MODULE: ./src/common/util/FetchRequest.js
/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





var FetchRequest_fetch = window.fetch;
var setFetch = function setFetch(newFetch) {
  FetchRequest_fetch = newFetch;
};
/**
 * @function SuperMap.setCORS
 * @description 设置是否允许跨域请求，全局配置，优先级低于 service 下的 crossOring 参数。
 * @param {boolean} cors - 是否允许跨域请求。
 */

var setCORS = SuperMap.setCORS = function (cors) {
  SuperMap.CORS = cors;
};
/**
 * @function SuperMap.isCORS
 * @description 是是否允许跨域请求。
 * @returns {boolean} 是否允许跨域请求。
 */

var isCORS = SuperMap.isCORS = function () {
  if (SuperMap.CORS != undefined) {
    return SuperMap.CORS;
  }

  return window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest();
};
/**
 * @function SuperMap.setRequestTimeout
 * @description 设置请求超时时间。
 * @param {number} [timeout=45] - 请求超时时间，单位秒。
 */

var setRequestTimeout = SuperMap.setRequestTimeout = function (timeout) {
  return SuperMap.RequestTimeout = timeout;
};
/**
 * @function SuperMap.getRequestTimeout
 * @description 获取请求超时时间。
 * @returns {number} 请求超时时间。
 */

var getRequestTimeout = SuperMap.getRequestTimeout = function () {
  return SuperMap.RequestTimeout || 45000;
};
var FetchRequest = SuperMap.FetchRequest = {
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
  supportDirectRequest: function supportDirectRequest(url, options) {
    if (Util.isInTheSameDomain(url)) {
      return true;
    }

    if (options.crossOrigin != undefined) {
      return options.crossOrigin;
    } else {
      return isCORS() || options.proxy;
    }
  },
  get: function get(url, params, options) {
    options = options || {};
    var type = 'GET';
    url = Util.urlAppend(url, this._getParameterString(params || {}));
    url = this._processUrl(url, options);

    if (!this.supportDirectRequest(url, options)) {
      url = url.replace('.json', '.jsonp');
      var config = {
        url: url,
        data: params
      };
      return SuperMap.Util.RequestJSONPPromise.GET(config);
    }

    if (!this.urlIsLong(url)) {
      return this._fetch(url, params, options, type);
    } else {
      return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    }
  },
  "delete": function _delete(url, params, options) {
    options = options || {};
    var type = 'DELETE';
    url = Util.urlAppend(url, this._getParameterString(params || {}));
    url = this._processUrl(url, options);

    if (!this.supportDirectRequest(url, options)) {
      url = url.replace('.json', '.jsonp');
      var config = {
        url: url += "&_method=DELETE",
        data: params
      };
      return SuperMap.Util.RequestJSONPPromise.DELETE(config);
    }

    if (this.urlIsLong(url)) {
      return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    }

    return this._fetch(url, params, options, type);
  },
  post: function post(url, params, options) {
    options = options || {};

    if (!this.supportDirectRequest(url, options)) {
      url = url.replace('.json', '.jsonp');
      var config = {
        url: url += "&_method=POST",
        data: params
      };
      return SuperMap.Util.RequestJSONPPromise.POST(config);
    }

    return this._fetch(this._processUrl(url, options), params, options, 'POST');
  },
  put: function put(url, params, options) {
    options = options || {};
    url = this._processUrl(url, options);

    if (!this.supportDirectRequest(url, options)) {
      url = url.replace('.json', '.jsonp');
      var config = {
        url: url += "&_method=PUT",
        data: params
      };
      return SuperMap.Util.RequestJSONPPromise.PUT(config);
    }

    return this._fetch(url, params, options, 'PUT');
  },
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

    if (!options.headers['Content-Type']) {
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
SuperMap.Util.RequestJSONPPromise = {
  limitLength: 1500,
  queryKeys: [],
  queryValues: [],
  supermap_callbacks: {},
  addQueryStrings: function addQueryStrings(values) {
    var me = this;

    for (var key in values) {
      me.queryKeys.push(key);

      if (typeof values[key] !== 'string') {
        values[key] = SuperMap.Util.toJSON(values[key]);
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
    var p = new Promise(function (resolve) {
      me.supermap_callbacks[uid] = function (response) {
        delete me.supermap_callbacks[uid];
        resolve(response);
      };
    }); // me.addQueryStrings({
    //     callback: "SuperMap.Util.RequestJSONPPromise.supermap_callbacks[" + uid + "]"
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

            var tempLeftValue = leftValue.substring(0, leftLength); //避免 截断sectionURL时，将类似于%22这样的符号截成两半，从而导致服务端组装sectionURL时发生错误

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
    me.send(splitQuestUrl, 'SuperMap.Util.RequestJSONPPromise.supermap_callbacks[' + uid + ']', config && config.proxy);
    return p;
  },
  getUid: function getUid() {
    var uid = new Date().getTime(),
        random = Math.floor(Math.random() * 1e17);
    return uid * 1000 + random;
  },
  send: function send(splitQuestUrl, callback, proxy) {
    var len = splitQuestUrl.length;

    if (len > 0) {
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
        });
      }
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
// CONCATENATED MODULE: ./src/common/security/SecurityManager.js
function SecurityManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SecurityManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SecurityManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) SecurityManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) SecurityManager_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @name SecurityManager
 * @memberOf SuperMap
 * @namespace
 * @category Security
 * @description 安全管理中心，提供 iServer,iPortal,Online 统一权限认证管理。
 *  > 使用说明：
 *  > 创建任何一个服务之前调用 {@link SuperMap.SecurityManager.registerToken}或
 *  > {@link SuperMap.SecurityManager.registerKey}注册凭据。
 *  > 发送请求时根据 url 或者服务 id 获取相应的 key 或者 token 并自动添加到服务地址中。
 */

var SecurityManager_SecurityManager =
/*#__PURE__*/
function () {
  function SecurityManager() {
    SecurityManager_classCallCheck(this, SecurityManager);
  }

  SecurityManager_createClass(SecurityManager, null, [{
    key: "generateToken",

    /**
     * @description 从服务器获取一个token,在此之前要注册服务器信息。
     * @function SuperMap.SecurityManager.generateToken
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @param {SuperMap.TokenServiceParameter} tokenParam - token 申请参数。
     * @returns {Promise} 返回包含 token 信息的 Promise 对象。
     */
    value: function generateToken(url, tokenParam) {
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
     * @function SuperMap.SecurityManager.registerServers
     * @param {SuperMap.ServerInfo} serverInfos - 服务器信息。
     */

  }, {
    key: "registerServers",
    value: function registerServers(serverInfos) {
      this.servers = this.servers || {};

      if (!Util.isArray(serverInfos)) {
        serverInfos = [serverInfos];
      }

      for (var i = 0; i < serverInfos.length; i++) {
        var serverInfo = serverInfos[i];
        this.servers[serverInfo.server] = serverInfo;
      }
    }
    /**
     * @description 服务请求都会自动带上这个 token。
     * @function SuperMap.SecurityManager.registerToken
     * @param {string} url -服务器域名+端口：如http://localhost:8090。
     * @param {string} token - token
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
     * @function SuperMap.SecurityManager.registerKey
     * @param {Array} ids - 可以是服务 id 数组或者 url 地址数组或者 webAPI 类型数组。
     * @param {string} key - key
     */

  }, {
    key: "registerKey",
    value: function registerKey(ids, key) {
      this.keys = this.keys || {};

      if (!ids || ids.length < 1 || !key) {
        return;
      }

      ids = Util.isArray(ids) ? ids : [ids];

      for (var i = 0; i < ids.length; i++) {
        var id = this._getUrlRestString(ids[0]) || ids[0];
        this.keys[id] = key;
      }
    }
    /**
     * @description 获取服务器信息。
     * @function SuperMap.SecurityManager.getServerInfo
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @returns {SuperMap.ServerInfo} 服务器信息。
     */

  }, {
    key: "getServerInfo",
    value: function getServerInfo(url) {
      this.servers = this.servers || {};
      return this.servers[url];
    }
    /**
     * @description 根据 Url 获取token。
     * @function SuperMap.SecurityManager.getToken
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @returns {string} token
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
     * @description 根据 Url 获取 key。
     * @function SuperMap.SecurityManager.getKey
     * @param {string} id - id
     * @returns {string} key
     */

  }, {
    key: "getKey",
    value: function getKey(id) {
      this.keys = this.keys || {};
      var key = this._getUrlRestString(id) || id;
      return this.keys[key];
    }
    /**
     * @description iServer 登录验证。
     * @function SuperMap.SecurityManager.loginiServer
     * @param {string} url - iServer 首页地址，如：http://localhost:8090/iserver。
     * @param {string} username - 用户名。
     * @param {string} password - 密码。
     * @param {boolean} [rememberme=false] - 是否记住。
     * @returns {Promise} 返回包含 iServer 登录请求结果的 Promise 对象。
     */

  }, {
    key: "loginiServer",
    value: function loginiServer(url, username, password, rememberme) {
      url = Util.urlPathAppend(url, 'services/security/login');
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
     * @description iServer登出。
     * @function SuperMap.SecurityManager.logoutiServer
     * @param {string} url - iServer 首页地址,如：http://localhost:8090/iserver。
     * @returns {Promise} 是否登出成功。
     */

  }, {
    key: "logoutiServer",
    value: function logoutiServer(url) {
      url = Util.urlPathAppend(url, 'services/security/logout');
      var requestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        withoutFormatSuffix: true
      };
      return FetchRequest.get(url, "", requestOptions).then(function () {
        return true;
      })["catch"](function () {
        return false;
      });
    }
    /**
     * @description Online 登录验证。
     * @function SuperMap.SecurityManager.loginOnline
     * @param {string} callbackLocation - 跳转位置。
     * @param {boolean} [newTab=true] - 是否新窗口打开。
     */

  }, {
    key: "loginOnline",
    value: function loginOnline(callbackLocation, newTab) {
      var loginUrl = SecurityManager.SSO + "/login?service=" + callbackLocation;

      this._open(loginUrl, newTab);
    }
    /**
     * @description iPortal登录验证。
     * @function SuperMap.SecurityManager.loginiPortal
     * @param {string} url - iportal 首页地址,如：http://localhost:8092/iportal.
     * @param {string} username - 用户名。
     * @param {string} password - 密码。
     * @returns {Promise} 返回包含 iPortal 登录请求结果的 Promise 对象。
     */

  }, {
    key: "loginiPortal",
    value: function loginiPortal(url, username, password) {
      url = Util.urlPathAppend(url, 'web/login');
      var loginInfo = {
        username: username && username.toString(),
        password: password && password.toString()
      };
      loginInfo = JSON.stringify(loginInfo);
      var requestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        withCredentials: true
      };
      return FetchRequest.post(url, loginInfo, requestOptions).then(function (response) {
        return response.json();
      });
    }
    /**
     * @description iPortal 登出。
     * @function SuperMap.SecurityManager.logoutiPortal
     * @param {string} url - iportal 首页地址,如：http://localhost:8092/iportal.
     * @returns {Promise} 如果登出成功，返回 true;否则返回 false。
     */

  }, {
    key: "logoutiPortal",
    value: function logoutiPortal(url) {
      url = Util.urlPathAppend(url, 'services/security/logout');
      var requestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        withCredentials: true,
        withoutFormatSuffix: true
      };
      return FetchRequest.get(url, "", requestOptions).then(function () {
        return true;
      })["catch"](function () {
        return false;
      });
    }
    /**
     * @description iManager 登录验证。
     * @function SuperMap.SecurityManager.loginManager
     * @param {string} url - iManager 地址。地址参数为 iManager 首页地址，如： http://localhost:8390/imanager。
     * @param {Object} [loginInfoParams] - iManager 登录参数。
     * @param {string} loginInfoParams.userName - 用户名。
     * @param {string} loginInfoParams.password - 密码。
     * @param {Object} options
     * @param {boolean} [options.isNewTab=true] - 不同域时是否在新窗口打开登录页面。
     * @returns {Promise} 返回包含 iManager 登录请求结果的 Promise 对象。
     */

  }, {
    key: "loginManager",
    value: function loginManager(url, loginInfoParams, options) {
      if (!Util.isInTheSameDomain(url)) {
        var isNewTab = options ? options.isNewTab : true;

        this._open(url, isNewTab);

        return;
      }

      var requestUrl = Util.urlPathAppend(url, 'icloud/security/tokens');
      var params = loginInfoParams || {};
      var loginInfo = {
        username: params.userName && params.userName.toString(),
        password: params.password && params.password.toString()
      };
      loginInfo = JSON.stringify(loginInfo);
      var requestOptions = {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      };
      var me = this;
      return FetchRequest.post(requestUrl, loginInfo, requestOptions).then(function (response) {
        response.text().then(function (result) {
          me.imanagerToken = result;
          return result;
        });
      });
    }
    /**
     * @description 清空全部验证信息。
     * @function SuperMap.SecurityManager.destroyAllCredentials
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
     * @function SuperMap.SecurityManager.destroyToken
     * @param {string} url - iportal 首页地址,如：http://localhost:8092/iportal.
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
     * @function SuperMap.SecurityManager.destroyKey
     * @param {string} url - iServer 首页地址,如：http://localhost:8090/iserver。
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
  }, {
    key: "_open",
    value: function _open(url, newTab) {
      newTab = newTab != null ? newTab : true;
      var offsetX = window.screen.availWidth / 2 - this.INNER_WINDOW_WIDTH / 2;
      var offsetY = window.screen.availHeight / 2 - this.INNER_WINDOW_HEIGHT / 2;
      var options = "height=" + this.INNER_WINDOW_HEIGHT + ", width=" + this.INNER_WINDOW_WIDTH + ",top=" + offsetY + ", left=" + offsetX + ",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no";

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
      } // var patten = /http:\/\/(.*\/rest)/i;


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
SecurityManager_SecurityManager.INNER_WINDOW_WIDTH = 600;
SecurityManager_SecurityManager.INNER_WINDOW_HEIGHT = 600;
SecurityManager_SecurityManager.SSO = "https://sso.supermap.com";
SecurityManager_SecurityManager.ONLINE = "https://www.supermapol.com";
SuperMap.SecurityManager = SecurityManager_SecurityManager;
// CONCATENATED MODULE: ./src/common/REST.js
/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @enum DataFormat
 * @memberOf SuperMap
 * @description 服务请求返回结果数据类型
 * @type {string}
 */

var DataFormat = SuperMap.DataFormat = {
  /** GEOJSON */
  GEOJSON: "GEOJSON",

  /** ISERVER */
  ISERVER: "ISERVER"
};

/**
 * @enum ServerType
 * @memberOf SuperMap
 * @description 服务器类型
 * @type {string}
 */

var ServerType = SuperMap.ServerType = {
  /** ISERVER */
  ISERVER: "ISERVER",

  /** IPORTAL */
  IPORTAL: "IPORTAL",

  /** ONLINE */
  ONLINE: "ONLINE"
};

/**
 * @enum GeometryType
 * @memberOf SuperMap
 * @description 几何对象枚举,定义了一系列几何对象类型。
 * @type {string}
 */

var GeometryType = SuperMap.GeometryType = {
  /** LINE */
  LINE: "LINE",

  /** LINEM */
  LINEM: "LINEM",

  /** POINT */
  POINT: "POINT",

  /** REGION */
  REGION: "REGION",

  /** POINTEPS */
  POINTEPS: "POINTEPS",

  /** LINEEPS */
  LINEEPS: "LINEEPS",

  /** REGIONEPS */
  REGIONEPS: "REGIONEPS",

  /** ELLIPSE */
  ELLIPSE: "ELLIPSE",

  /** CIRCLE */
  CIRCLE: "CIRCLE",

  /** TEXT */
  TEXT: "TEXT",

  /** RECTANGLE */
  RECTANGLE: "RECTANGLE",

  /** UNKNOWN */
  UNKNOWN: "UNKNOWN",

  /** GEOCOMPOUND */
  GEOCOMPOUND: "GEOCOMPOUND"
};

/**
 * @enum QueryOption
 * @memberOf SuperMap
 * @description 查询结果类型枚举,描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 * @type {string}
 */

var QueryOption = SuperMap.QueryOption = {
  /** 属性 */
  ATTRIBUTE: "ATTRIBUTE",

  /** 属性和几何对象 */
  ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",

  /** 几何对象 */
  GEOMETRY: "GEOMETRY"
};

/**
 * @enum JoinType
 * @memberOf SuperMap
 * @description 关联查询时的关联类型常量。
 * 该类定义了两个表之间的连接类型常量，决定了对两个表之间进行连接查询时，查询结果中得到的记录的情况。
 * @type {string}
 */

var JoinType = SuperMap.JoinType = {
  /** INNERJOIN */
  INNERJOIN: "INNERJOIN",

  /** LEFTJOIN */
  LEFTJOIN: "LEFTJOIN"
};

/**
 * @enum SpatialQueryMode
 * @memberOf SuperMap
 * @description  空间查询模式枚举。该类定义了空间查询操作模式常量。
 * @type {string}
 */

var SpatialQueryMode = SuperMap.SpatialQueryMode = {
  /** 包含空间查询模式 */
  CONTAIN: "CONTAIN",

  /** 交叉空间查询模式 */
  CROSS: "CROSS",

  /** 分离空间查询模式 */
  DISJOINT: "DISJOINT",

  /** 重合空间查询模式 */
  IDENTITY: "IDENTITY",

  /** 相交空间查询模式 */
  INTERSECT: "INTERSECT",

  /** 无空间查询 */
  NONE: "NONE",

  /** 叠加空间查询模式 */
  OVERLAP: "OVERLAP",

  /** 邻接空间查询模式 */
  TOUCH: "TOUCH",

  /** 被包含空间查询模式 */
  WITHIN: "WITHIN"
};

/**
 * @enum SpatialRelationType
 * @memberOf SuperMap
 * @description  数据集对象间的空间关系枚举。
 * 该类定义了数据集对象间的空间关系类型常量。
 * @type {string}
 */

var SpatialRelationType = SuperMap.SpatialRelationType = {
  /** 包含关系 */
  CONTAIN: "CONTAIN",

  /** 相交关系 */
  INTERSECT: "INTERSECT",

  /** 被包含关系 */
  WITHIN: "WITHIN"
};

/**
 * @enum MeasureMode
 * @memberOf SuperMap
 * @type {string}
 * @description  量算模式枚举。
 * 该类定义了两种测量模式：距离测量和面积测量。
 */

var MeasureMode = SuperMap.MeasureMode = {
  /** 距离测量 */
  DISTANCE: "DISTANCE",

  /** 面积测量 */
  AREA: "AREA"
};

/**
 * @enum Unit
 * @memberOf SuperMap
 * @description  距离单位枚举。
 * 该类定义了一系列距离单位类型。
 * @type {string}
 */

var Unit = SuperMap.Unit = {
  /**  米 */
  METER: "METER",

  /**  千米 */
  KILOMETER: "KILOMETER",

  /**  英里 */
  MILE: "MILE",

  /**  码 */
  YARD: "YARD",

  /**  度 */
  DEGREE: "DEGREE",

  /**  毫米 */
  MILLIMETER: "MILLIMETER",

  /**  厘米 */
  CENTIMETER: "CENTIMETER",

  /**  英寸 */
  INCH: "INCH",

  /**  分米 */
  DECIMETER: "DECIMETER",

  /**  英尺 */
  FOOT: "FOOT",

  /**  秒 */
  SECOND: "SECOND",

  /**  分 */
  MINUTE: "MINUTE",

  /**  弧度 */
  RADIAN: "RADIAN"
};

/**
 * @enum BufferRadiusUnit
 * @memberOf SuperMap
 * @description  缓冲区距离单位枚举。
 * 该类定义了一系列缓冲距离单位类型。
 * @type {string}
 */

var BufferRadiusUnit = SuperMap.BufferRadiusUnit = {
  /**  厘米 */
  CENTIMETER: "CENTIMETER",

  /**  分米 */
  DECIMETER: "DECIMETER",

  /**  英尺 */
  FOOT: "FOOT",

  /**  英寸 */
  INCH: "INCH",

  /**  千米 */
  KILOMETER: "KILOMETER",

  /**  米 */
  METER: "METER",

  /**  英里 */
  MILE: "MILE",

  /**  毫米 */
  MILLIMETER: "MILLIMETER",

  /**  码 */
  YARD: "YARD"
};

/**
 * @enum EngineType
 * @memberOf SuperMap
 * @description  数据源引擎类型枚举。
 * @type {string}
 */

var EngineType = SuperMap.EngineType = {
  /** 影像只读引擎类型，文件引擎，针对通用影像格式如 BMP，JPG，TIFF 以及超图自定义影像格式 SIT 等。 */
  IMAGEPLUGINS: "IMAGEPLUGINS",

  /**  OGC 引擎类型，针对于 Web 数据源，Web 引擎，目前支持的类型有 WMS，WFS，WCS。 */
  OGC: "OGC",

  /**  Oracle 引擎类型，针对 Oracle 数据源，数据库引擎。 */
  ORACLEPLUS: "ORACLEPLUS",

  /**  SDB 引擎类型，文件引擎，即 SDB 数据源。 */
  SDBPLUS: "SDBPLUS",

  /**  SQL Server 引擎类型，针对 SQL Server 数据源，数据库引擎 */
  SQLPLUS: "SQLPLUS",

  /**  UDB 引擎类型，文件引擎。 */
  UDB: "UDB"
};

/**
 * @enum ThemeGraphTextFormat
 * @memberOf SuperMap
 * @description  统计专题图文本显示格式枚举。
 * @type {string}
 */

var ThemeGraphTextFormat = SuperMap.ThemeGraphTextFormat = {
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
 * @memberOf SuperMap
 * @description  统计专题图类型枚举。
 * @type {string}
 */

var ThemeGraphType = SuperMap.ThemeGraphType = {
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
 * @memberOf SuperMap
 * @description  统计专题图坐标轴文本显示模式。
 * @type {string}
 */

var GraphAxesTextDisplayMode = SuperMap.GraphAxesTextDisplayMode = {
  /**  显示全部文本。 */
  ALL: "ALL",

  /**  不显示。 */
  NONE: "NONE",

  /**  显示Y轴的文本。 */
  YAXES: "YAXES"
};

/**
 * @enum GraduatedMode
 * @memberOf SuperMap
 * @description  专题图分级模式枚举。
 *
 * @type {string}
 */

var GraduatedMode = SuperMap.GraduatedMode = {
  /**  常量分级模式。 */
  CONSTANT: "CONSTANT",

  /** 对数分级模式。 */
  LOGARITHM: "LOGARITHM",

  /**  平方根分级模式。 */
  SQUAREROOT: "SQUAREROOT"
};

/**
 * @enum RangeMode
 * @memberOf SuperMap
 * @description  范围分段专题图分段方式枚举。
 * @type {string}
 */

var RangeMode = SuperMap.RangeMode = {
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
 * @memberOf SuperMap
 * @description  专题图类型枚举。
 * @type {string}
 */

var ThemeType = SuperMap.ThemeType = {
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
 * @memberOf SuperMap
 * @description  渐变颜色枚举。
 * @type {string}
 */

var ColorGradientType = SuperMap.ColorGradientType = {
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

  /** 地形渐变,用于三维显示效果较好。 */
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
 * @memberOf SuperMap
 * @description  文本对齐枚举。
 * @type {string}
 */

var TextAlignment = SuperMap.TextAlignment = {
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
 * @memberOf SuperMap
 * @description  渐变填充风格的渐变类型枚举。
 * @type {string}
 */

var FillGradientMode = SuperMap.FillGradientMode = {
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
 * @memberOf SuperMap
 * @description  标签沿线标注方向枚举。
 * @type {string}
 */

var AlongLineDirection = SuperMap.AlongLineDirection = {
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
 * @memberOf SuperMap
 * @description  标签专题图中标签背景的形状枚举。
 * @type {string}
 */

var LabelBackShape = SuperMap.LabelBackShape = {
  /** 菱形背景，即标签背景的形状为菱形。 */
  DIAMOND: "DIAMOND",

  /** 椭圆形背景，即标签背景的行状为椭圆形。 */
  ELLIPSE: "ELLIPSE",

  /** 符号背景，即标签背景的形状为设定的符号。 */
  MARKER: "MARKER",

  /** 空背景，即不使用任何形状作为标签的背景。 */
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
 * @memberOf SuperMap
 * @description  标签专题图中超长标签的处理模式枚举。
 * @type {string}
 */

var LabelOverLengthMode = SuperMap.LabelOverLengthMode = {
  /** 换行显示。 */
  NEWLINE: "NEWLINE",

  /** 对超长标签不进行处理。 */
  NONE: "NONE",

  /** 省略超出部分。 */
  OMIT: "OMIT"
};

/**
 * @enum DirectionType
 * @memberOf SuperMap
 * @description  网络分析中方向枚举。
 * 在行驶引导子项中使用。
 * @type {string}
 */

var DirectionType = SuperMap.DirectionType = {
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
 * @memberOf SuperMap
 * @description  行驶位置枚举。
 * 表示在行驶在路的左边、右边或者路上的枚举,该类用在行驶导引子项类中。
 * @type {string}
 */

var SideType = SuperMap.SideType = {
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
 * @memberOf SuperMap
 * @description  资源供给中心类型枚举。
 * 该枚举定义了网络分析中资源中心点的类型，主要用于资源分配和选址分区。
 * 资源供给中心点的类型包括非中心，固定中心和可选中心。固定中心用于资源分配分析； 固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
 * @type {string}
 */

var SupplyCenterType = SuperMap.SupplyCenterType = {
  /** 固定中心点。 */
  FIXEDCENTER: "FIXEDCENTER",

  /** 非中心点。 */
  NULL: "NULL",

  /** 可选中心点。 */
  OPTIONALCENTER: "OPTIONALCENTER"
};

/**
 * @enum TurnType
 * @memberOf SuperMap
 * @description  转弯方向枚举。
 * 用在行驶引导子项类中，表示转弯的方向。
 * @type {string}
 */

var TurnType = SuperMap.TurnType = {
  /** 向前直行。 */
  AHEAD: "AHEAD",

  /** 掉头。 */
  BACK: "BACK",

  /** 终点，不拐弯。 */
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
 * @memberOf SuperMap
 * @description  缓冲区分析BufferEnd类型。
 * @type {string}
 */

var BufferEndType = SuperMap.BufferEndType = {
  /** FLAT */
  FLAT: "FLAT",

  /** ROUND */
  ROUND: "ROUND"
};

/**
 * @enum OverlayOperationType
 * @memberOf SuperMap
 * @description  叠加分析类型枚举。
 * @type {string}
 */

var OverlayOperationType = SuperMap.OverlayOperationType = {
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
 * @memberOf SuperMap
 * @description  分布式分析输出类型枚举。
 * @type {string}
 */

var OutputType = SuperMap.OutputType = {
  /** INDEXEDHDFS */
  INDEXEDHDFS: "INDEXEDHDFS",

  /** UDB */
  UDB: "UDB",

  /** MONGODB */
  MONGODB: "MONGODB",

  /** PG */
  PG: "PG"
};

/**
 * @enum SmoothMethod
 * @memberOf SuperMap
 * @description  光滑方法枚举。
 * 用于从Grid 或DEM数据生成等值线或等值面时对等值线或者等值面的边界线进行平滑处理的方法。
 * @type {string}
 */

var SmoothMethod = SuperMap.SmoothMethod = {
  /** B 样条法。 */
  BSPLINE: "BSPLINE",

  /** 磨角法。 */
  POLISH: "POLISH"
};

/**
 * @enum SurfaceAnalystMethod
 * @memberOf SuperMap
 * @description  表面分析方法枚举。
 * 通过对数据进行表面分析，能够挖掘原始数据所包含的信息，使某些细节明显化，易于分析。
 * @type {string}
 */

var SurfaceAnalystMethod = SuperMap.SurfaceAnalystMethod = {
  /** 等值线提取。 */
  ISOLINE: "ISOLINE",

  /** 等值面提取。 */
  ISOREGION: "ISOREGION"
};

/**
 * @enum DataReturnMode
 * @memberOf SuperMap
 * @description  数据返回模式枚举。
 * 该枚举用于指定空间分析返回结果模式,包含返回数据集标识和记录集、只返回数据集标识(数据集名称@数据源名称)及只返回记录集三种模式。
 * @type {string}
 */

var DataReturnMode = SuperMap.DataReturnMode = {
  /** 返回结果数据集标识(数据集名称@数据源名称)和记录集（RecordSet）。 */
  DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",

  /** 只返回数据集标识（数据集名称@数据源名称）。 */
  DATASET_ONLY: "DATASET_ONLY",

  /** 只返回记录集（RecordSet）。 */
  RECORDSET_ONLY: "RECORDSET_ONLY"
};

/**
 * @enum EditType
 * @memberOf SuperMap
 * @description  要素集更新模式枚举。
 * 该枚举用于指定数据服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 * @type {string}
 */

var EditType = SuperMap.EditType = {
  /** 增加操作。 */
  ADD: "add",

  /** 修改操作。 */
  UPDATE: "update",

  /** 删除操作。 */
  DELETE: "delete"
};

/**
 * @enum TransferTactic
 * @memberOf SuperMap
 * @description  公交换乘策略枚举。
 * 该枚举用于指定公交服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 * @type {string}
 */

var TransferTactic = SuperMap.TransferTactic = {
  /** 时间短。 */
  LESS_TIME: "LESS_TIME",

  /** 少换乘。 */
  LESS_TRANSFER: "LESS_TRANSFER",

  /** 少步行。 */
  LESS_WALK: "LESS_WALK",

  /** 距离最短。 */
  MIN_DISTANCE: "MIN_DISTANCE"
};

/**
 * @enum TransferPreference
 * @memberOf SuperMap
 * @description  公交换乘策略枚举。
 * 该枚举用于指定交通换乘服务中设置地铁优先、公交优先、不乘地铁、无偏好等偏好设置。
 * @type {string}
 */

var TransferPreference = SuperMap.TransferPreference = {
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
 * @memberOf SuperMap
 * @description  地图背景格网类型枚举。
 * @type {string}
 */

var GridType = SuperMap.GridType = {
  /** 十字叉丝。 */
  CROSS: "CROSS",

  /** 网格线。 */
  GRID: "GRID",

  /** 点。 */
  POINT: "POINT"
};

/**
 * @enum ColorSpaceType
 * @memberOf SuperMap
 * @description  色彩空间枚举。
 * 由于成色原理的不同，决定了显示器、投影仪这类靠色光直接合成颜色的颜色设备和打印机、
 * 印刷机这类靠使用颜料的印刷设备在生成颜色方式上的区别。
 * 针对上述不同成色方式，SuperMap 提供两种色彩空间，
 * 分别为 RGB 和 CMYK。RGB 主要用于显示系统中，CMYK 主要用于印刷系统中。
 * @type {string}
 */

var ColorSpaceType = SuperMap.ColorSpaceType = {
  /** 该类型主要在印刷系统使用。 */
  CMYK: "CMYK",

  /** 该类型主要在显示系统中使用。 */
  RGB: "RGB"
};

/**
 * @enum LayerType
 * @memberOf SuperMap
 * @description  图层类型。
 * @type {string}
 */

var LayerType = SuperMap.LayerType = {
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
 * @memberOf SuperMap
 * @description  UGC图层类型。
 * @type {string}
 */

var UGCLayerType = SuperMap.UGCLayerType = {
  /** 专题图层。 */
  THEME: "THEME",

  /** 矢量图层。 */
  VECTOR: "VECTOR",

  /** 栅格图层。。 */
  GRID: "GRID",

  /** 影像图层。 */
  IMAGE: "IMAGE"
};

/**
 * @enum StatisticMode
 * @memberOf SuperMap
 * @description  字段统计方法类型。
 * @type {string}
 */

var StatisticMode = SuperMap.StatisticMode = {
  /** 统计所选字段的平均值。 */
  AVERAGE: "AVERAGE",

  /** 统计所选字段的最大值。 */
  MAX: "MAX",

  /** 统计所选字段的最小值。 */
  MIN: "MIN",

  /** 统计所选字段的标准差 */
  STDDEVIATION: "STDDEVIATION",

  /** 统计所选字段的总和。 */
  SUM: "SUM",

  /** 统计所选字段的方差。 */
  VARIANCE: "VARIANCE"
};

/**
 * @enum PixelFormat
 * @memberOf SuperMap
 * @description  栅格与影像数据存储的像素格式枚举。
 * @type {string}
 */

var PixelFormat = SuperMap.PixelFormat = {
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
 * @memberOf SuperMap
 * @description  内插时使用的样本点的查找方式枚举
 * @type {string}
 */

var SearchMode = SuperMap.SearchMode = {
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
 * @memberOf SuperMap
 * @description  插值分析的算法的类型
 * @type {string}
 */

var InterpolationAlgorithmType = SuperMap.InterpolationAlgorithmType = {
  /** 普通克吕金插值法。 */
  KRIGING: "KRIGING",

  /** 简单克吕金插值法。 */
  SimpleKriging: "SimpleKriging",

  /** 泛克吕金插值法。 */
  UniversalKriging: "UniversalKriging"
};

/**
 * @enum VariogramMode
 * @memberOf SuperMap
 * @description  克吕金（Kriging）插值时的半变函数类型枚举
 * @type {string}
 */

var VariogramMode = SuperMap.VariogramMode = {
  /** 指数函数。 */
  EXPONENTIAL: "EXPONENTIAL",

  /** 高斯函数。 */
  GAUSSIAN: "GAUSSIAN",

  /** 球型函数。 */
  SPHERICAL: "SPHERICAL"
};

/**
 * @enum Exponent
 * @memberOf SuperMap
 * @description  定义了泛克吕金（UniversalKriging）插值时样点数据中趋势面方程的阶数
 * @type {string}
 */

var Exponent = SuperMap.Exponent = {
  /** 阶数为1。 */
  EXP1: "EXP1",

  /** 阶数为2。 */
  EXP2: "EXP2"
};

/**
 * @enum ClientType
 * @memberOf SuperMap
 * @description token申请的客户端标识类型
 * @type {string}
 */

var ClientType = SuperMap.ClientType = {
  /** 指定的 IP 地址。 */
  IP: "IP",

  /** 指定的 URL。 */
  REFERER: "Referer",

  /** 发送申请令牌请求的客户端 IP。 */
  REQUESTIP: "RequestIP",

  /** 不做任何验证。 */
  NONE: "NONE",

  /** SERVER。 */
  SERVER: "SERVER",

  /** WEB。 */
  WEB: "WEB"
};

/**
 * @enum ChartType
 * @memberOf SuperMap
 * @description 客户端专题图图表类型
 * @type {string}
 */

var ChartType = SuperMap.ChartType = {
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
 * @memberOf SuperMap
 * @description  裁剪分析模式
 * @type {string}
 */

var ClipAnalystMode = SuperMap.ClipAnalystMode = {
  /** CLIP。 */
  CLIP: "clip",

  /** INTERSECT。 */
  INTERSECT: "intersect"
};

/**
 * @enum AnalystAreaUnit
 * @memberOf SuperMap
 * @description 分布式分析面积单位
 * @type {string}
 */

var AnalystAreaUnit = SuperMap.AnalystAreaUnit = {
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
 * @memberOf SuperMap
 * @description 分布式分析单位
 * @type {string}
 */

var AnalystSizeUnit = SuperMap.AnalystSizeUnit = {
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
 * @memberOf SuperMap
 * @description 分布式分析统计模式
 * @type {string}
 */

var StatisticAnalystMode = SuperMap.StatisticAnalystMode = {
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

  /** 统计所选字段的标准差 */
  "STDDEVIATION": "stdDeviation"
};

/**
 * @enum SummaryType
 * @memberOf SuperMap
 * @description 分布式分析聚合类型
 * @type {string}
 */

var SummaryType = SuperMap.SummaryType = {
  /** 格网聚合。 */
  "SUMMARYMESH": "SUMMARYMESH",

  /** 多边形聚合。 */
  "SUMMARYREGION": "SUMMARYREGION"
};

/**
 * @enum TopologyValidatorRule
 * @memberOf SuperMap
 * @description  拓扑检查模式枚举。该类定义了拓扑检查操作模式常量。
 * @type {string}
 */

var TopologyValidatorRule = SuperMap.TopologyValidatorRule = {
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
 * @enum AggregationType
 * @memberOf SuperMap
 * @description  聚合查询枚举类，该类定义了Es数据服务中聚合查询模式常量
 * @type {string}
 */

var AggregationType = SuperMap.AggregationType = {
  /** 格网聚合类型。 */
  GEOHASH_GRID: "geohash_grid",

  /** 过滤聚合类型。 */
  FILTER: "filter"
};

/**
 * @enum AggregationType
 * @memberOf SuperMap
 * @description  聚合查询中filter查询枚举类
 * @type {string}
 */

var AggregationQueryBuilderType = SuperMap.AggregationQueryBuilderType = {
  /** 范围查询。 */
  GEO_BOUNDING_BOX: "geo_bounding_box"
};

/**
 * @enum GetFeatureMode
 * @memberOf SuperMap
 * @description feature 查询方式。
 * @type {string}
 */

var GetFeatureMode = SuperMap.GetFeatureMode = {
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
 * @memberOf SuperMap
 * @description 栅格分析方法。
 * @type {string}
 */

var RasterFunctionType = SuperMap.RasterFunctionType = {
  /** 归一化植被指数。 */
  NDVI: "NDVI",

  /** 阴影面分析。 */
  HILLSHADE: "HILLSHADE"
};

/**
 * @enum ResourceType
 * @memberOf SuperMap
 * @description iportal资源类型。
 * @version 10.0.1
 * @type {string}
 */

var ResourceType = SuperMap.ResourceType = {
  /** 地图。 */
  MAP: "MAP",

  /** 服务。 */
  SERVICE: "SERVICE",

  /** 场景。 */
  SCENE: "SCENE",

  /** 数据。 */
  DATA: "DATA",

  /** 洞察。 */
  INSIGHTS_WORKSPACE: "INSIGHTS_WORKSPACE",

  /** 大屏。 */
  MAP_DASHBOARD: "MAP_DASHBOARD"
};

/**
 * @enum OrderBy
 * @memberOf SuperMap
 * @description iportal资源排序字段。
 * @version 10.0.1
 * @type {string}
 */

var OrderBy = SuperMap.OrderBy = {
  /** 按更新时间排序 */
  UPDATETIME: "UPDATETIME",

  /** 按热度(可能是访问量、下载量)排序 */
  HEATLEVEL: "HEATLEVEL",

  /** 按相关性排序 */
  RELEVANCE: "RELEVANCE"
};

/**
 * @enum OrderType
 * @memberOf SuperMap
 * @description iportal资源升序还是降序过滤
 * @version 10.0.1
 * @type {string}
 */

var OrderType = SuperMap.OrderType = {
  /** 升序 */
  ASC: "ASC",

  /** 降序 */
  DESC: "DESC"
};

/**
 * @enum SearchType
 * @memberOf SuperMap
 * @description iportal资源查询的范围进行过滤
 * @version 10.0.1
 * @type {string}
 */

var SearchType = SuperMap.SearchType = {
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
 * @memberOf SuperMap
 * @description iportal资源聚合查询的类型
 * @version 10.0.1
 * @type {string}
 */

var AggregationTypes = SuperMap.AggregationTypes = {
  /** 标签 */
  TAG: "TAG",

  /** 资源类型 */
  TYPE: "TYPE"
};

/**
 * @enum PermissionType
 * @memberOf SuperMap
 * @description iportal资源权限类型。
 * @version 10.0.1
 * @type {string}
 */

var PermissionType = SuperMap.PermissionType = {
  /** 可检索 */
  SEARCH: "SEARCH",

  /** 可查看 */
  READ: "READ",

  /** 可编辑 */
  READWRITE: "READWRITE",

  /** 可删除 */
  DELETE: "DELETE",

  /** 可下载，包括可读、可检索 */
  DOWNLOAD: "DOWNLOAD"
};

/**
 * @enum EntityType
 * @memberOf SuperMap
 * @description iportal资源实体类型。
 * @version 10.0.1
 * @type {string}
 */

var EntityType = SuperMap.EntityType = {
  /** 部门 */
  DEPARTMENT: "DEPARTMENT",

  /** 用户组 */
  GROUP: "GROUP",

  /** 群组 */
  IPORTALGROUP: "IPORTALGROUP",

  /** 角色 */
  ROLE: "ROLE",

  /** 用户 */
  USER: "USER"
};

/**
 * @enum DataItemType
 * @memberOf SuperMap
 * @description iportal数据类型。
 * @version 10.0.1
 * @type {string}
 */

var DataItemType = SuperMap.DataItemType = {
  /** 工作空间 sxwu, smwu, sxw, smw */
  WORKSPACE: "WORKSPACE",

  /** udb 数据源 */
  UDB: "UDB",

  /** shp空间数据 */
  SHP: "SHP",

  /** excel数据 */
  EXCEL: "EXCEL",

  /** csv数据 */
  CSV: "CSV",

  /** geojson数据。 */
  GEOJSON: "GEOJSON",

  /** smtiles */
  SMTILES: "SMTILES",

  /** svtiles */
  SVTILES: "SVTILES",

  /** mbtiles */
  MBTILES: "MBTILES",

  /** tpk */
  TPK: "TPK",

  /** ugc v5 */
  UGCV5: "UGCV5",

  /** UGCV5_MVT  */
  UGCV5_MVT: "UGCV5_MVT",

  /** json数据  */
  JSON: "JSON"
};

/**
 * @enum WebExportFormatType
 * @memberOf SuperMap
 * @description Web 打印输出的格式。
 * @version 10.0.1
 * @type {string}
 */

var WebExportFormatType = SuperMap.WebExportFormatType = {
  /** png */
  PNG: "PNG",

  /** pdf */
  PDF: "PDF"
};

/**
 * @enum WebScaleOrientationType
 * @memberOf SuperMap
 * @description Web 比例尺的方位样式。
 * @version 10.0.1
 * @type {string}
 */

var WebScaleOrientationType = SuperMap.WebScaleOrientationType = {
  /** horizontal labels below */
  HORIZONTALLABELSBELOW: "HORIZONTALLABELSBELOW",

  /** horizontal labels above */
  HORIZONTALLABELSABOVE: "HORIZONTALLABELSABOVE",

  /** vertical labels left */
  VERTICALLABELSLEFT: "VERTICALLABELSLEFT",

  /** vertical labels right */
  VERTICALLABELSRIGHT: "VERTICALLABELSRIGHT"
};

/**
 * @enum WebScaleType
 * @memberOf SuperMap
 * @description Web 比例尺的样式。
 * @version 10.0.1
 * @type {string}
 */

var WebScaleType = SuperMap.WebScaleType = {
  /** line */
  LINE: "LINE",

  /** bar */
  BAR: "BAR",

  /** bar sub */
  BAR_SUB: "BAR_SUB"
};

/**
 * @enum WebScaleUnit
 * @memberOf SuperMap
 * @description Web 比例尺的单位制。
 * @version 10.0.1
 * @type {string}
 */

var WebScaleUnit = SuperMap.WebScaleUnit = {
  /** meter */
  METER: "METER",

  /** foot */
  FOOT: "FOOT",

  /** degrees */
  DEGREES: "DEGREES"
};

// CONCATENATED MODULE: ./src/common/iServer/DatasourceConnectionInfo.js
function DatasourceConnectionInfo_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DatasourceConnectionInfo_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function DatasourceConnectionInfo_createClass(Constructor, protoProps, staticProps) { if (protoProps) DatasourceConnectionInfo_defineProperties(Constructor.prototype, protoProps); if (staticProps) DatasourceConnectionInfo_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


 // eslint-disable-line no-unused-vars

/**
 * @class SuperMap.DatasourceConnectionInfo
 * @category  iServer Data
 * @classdesc 数据源连接信息类。该类包括了进行数据源连接的所有信息，如所要连接的服务器名称、数据库名称、用户名以及密码等。
 *            当保存为工作空间时， 工作空间中的数据源的连接信息都将存储到工作空间文件中。对于不同类型的数据源，其连接信息有所区别。
 *            所以在使 用该类所包含的成员时，请注意该成员所适用的数据源类型。对于从数据源对象中返回的数据连接信息对象，只有 connect 方法可以被修改，
 *            其他内容是不可以被修改的。对于用户创建的数据源连接信息对象，其内容都可以修改。
 * @category iServer Data
 * @param {Object} options - 参数。 
 * @param {string} options.alias - 数据源别名。 
 * @param {string} options.dataBase - 数据源连接的数据库名。 
 * @param {boolean} [options.connect] - 数据源是否自动连接数据。 
 * @param {string} [options.driver] - 使用 ODBC(Open Database Connectivity，开放数据库互连)的数据库的驱动程序名。 
 * @param {SuperMap.EngineType} [options.engineType] - 数据源连接的引擎类型。 
 * @param {boolean} [options.exclusive] - 是否以独占方式打开数据源。 
 * @param {boolean} [options.OpenLinkTable] - 是否把数据库中的其他非 SuperMap 数据表作为 LinkTable 打开。 
 * @param {string} [options.password] - 登录数据源连接的数据库或文件的密码。 
 * @param {boolean} [options.readOnly] - 是否以只读方式打开数据源。 
 * @param {string} [options.server] - 数据库服务器名或 SDB 文件名。 
 * @param {string} [options.user] - 登录数据库的用户名。 
 */

var DatasourceConnectionInfo_DatasourceConnectionInfo =
/*#__PURE__*/
function () {
  function DatasourceConnectionInfo(options) {
    DatasourceConnectionInfo_classCallCheck(this, DatasourceConnectionInfo);

    /**
     * @member {string} SuperMap.DatasourceConnectionInfo.prototype.alias
     * @description 数据源别名。
     */
    this.alias = null;
    /**
     * @member {boolean} [SuperMap.DatasourceConnectionInfo.prototype.connect]
     * @description 数据源是否自动连接数据。
     */

    this.connect = null;
    /**
     * @member {string} SuperMap.DatasourceConnectionInfo.prototype.dataBase
     * @description 数据源连接的数据库名。
     */

    this.dataBase = null;
    /**
     * @member {string} [SuperMap.DatasourceConnectionInfo.prototype.driver]
     * @description 使用 ODBC(Open Database Connectivity，开放数据库互连) 的数据库的驱动程序名。
     * 其中，对于 SQL Server 数据库与 iServer 发布的 WMTS 服务，此为必设参数。
     * 对于 SQL Server 数据库，它使用 ODBC 连接，所设置的驱动程序名为 "SQL Server" 或 "SQL Native Client"；
     * 对于 iServer 发布的 WMTS 服务，设置的驱动名称为 "WMTS"。
     */

    this.driver = null;
    /**
     * @member {SuperMap.EngineType} [SuperMap.DatasourceConnectionInfo.prototype.engineType]
     * @description 数据源连接的引擎类型。
     */

    this.engineType = null;
    /**
     * @member {boolean} [SuperMap.DatasourceConnectionInfo.prototype.exclusive]
     * @description 是否以独占方式打开数据源。
     */

    this.exclusive = null;
    /**
     * @member {boolean} [SuperMap.DatasourceConnectionInfo.prototype.OpenLinkTable]
     * @description 是否把数据库中的其他非 SuperMap 数据表作为 LinkTable 打开。
     */

    this.OpenLinkTable = null;
    /**
     * @member {string} [SuperMap.DatasourceConnectionInfo.prototype.password]
     * @description 登录数据源连接的数据库或文件的密码。
     */

    this.password = null;
    /**
     * @member {boolean} [SuperMap.DatasourceConnectionInfo.prototype.readOnly]
     * @description 是否以只读方式打开数据源。
     */

    this.readOnly = null;
    /**
     * @member {string} [SuperMap.DatasourceConnectionInfo.prototype.server]
     * @description 数据库服务器名、文件名或服务地址。
     * 1.对于 SDB 和 UDB 文件，为其文件的绝对路径。注意：当绝对路径的长度超过 UTF-8 编码格式的 260 字节长度，该数据源无法打开。
     * 2.对于 Oracle 数据库，其服务器名为其 TNS 服务名称。
     * 3.对于 SQL Server 数据库，其服务器名为其系统的 DSN(Database Source Name) 名称。
     * 4.对于 PostgreSQL 数据库，其服务器名为 “IP:端口号”，默认的端口号是 5432。
     * 5.对于 DB2 数据库，已经进行了编目，所以不需要进行服务器的设置。
     * 6.对于 Kingbase 数据库，其服务器名为其 IP 地址。
     * 7.对于 GoogleMaps 数据源，其服务器地址，默认设置为 “{@link http://maps.google.com}”，且不可更改。
     * 8.对于 SuperMapCould 数据源，为其服务地址。
     * 9.对于 MAPWORLD 数据源，为其服务地址，默认设置为 “{@link http://www.tianditu.cn}”，且不可更改。
     * 10.对于 OGC 和 REST 数据源，为其服务地址。
     */

    this.server = null;
    /**
     * @member {string} SuperMap.DatasourceConnectionInfo.prototype.user
     * @description 登录数据库的用户名。
     */

    this.user = null;

    if (options) {
      Util.extend(this, options);
    }

    this.CLASS_NAME = "SuperMap.DatasourceConnectionInfo";
  }
  /**
   * @function SuperMap.DatasourceConnectionInfo.prototype.destroy
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
SuperMap.DatasourceConnectionInfo = DatasourceConnectionInfo_DatasourceConnectionInfo;
// CONCATENATED MODULE: ./src/common/iServer/OutputSetting.js
function OutputSetting_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function OutputSetting_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function OutputSetting_createClass(Constructor, protoProps, staticProps) { if (protoProps) OutputSetting_defineProperties(Constructor.prototype, protoProps); if (staticProps) OutputSetting_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.OutputSetting
 * @category  iServer ProcessingService
 * @classdesc 分布式分析输出类型设置类。
 * @param {Object} options - 参数。
 * @param {SuperMap.DatasourceConnectionInfo} options.datasourceInfo - 数据源连接信息。
 * @param {string} [options.datasetName='analystResult'] - 结果数据集名称。
 * @param {SuperMap.OutputType} [options.type=SuperMap.OutputType.UDB] - 输出类型。
 * @param {string} [options.outputPath] - 分析结果输出路径。
 */

var OutputSetting_OutputSetting =
/*#__PURE__*/
function () {
  function OutputSetting(options) {
    OutputSetting_classCallCheck(this, OutputSetting);

    /**
     * @member {SuperMap.OutputType} SuperMap.OutputSetting.prototype.type
     * @description 分布式分析的输出类型。
     */
    this.type = OutputType.UDB;
    /**
     * @member {string} [SuperMap.OutputSetting.prototype.datasetName='analystResult']
     * @description 分布式分析的输出结果数据集名称。
     */

    this.datasetName = "analystResult";
    /**
     * @member {SuperMap.DatasourceConnectionInfo} SuperMap.OutputSetting.prototype.datasourceInfo
     * @description 分布式分析的输出结果数据源连接信息。
     */

    this.datasourceInfo = null;
    /**
     * @member {string} [SuperMap.OutputSetting.prototype.outputPath]
     * @description 分布式分析的分析结果输出路径。
     */

    this.outputPath = "";
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.OutputSetting";
  }
  /**
   * @function SuperMap.OutputSetting.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */


  OutputSetting_createClass(OutputSetting, [{
    key: "destroy",
    value: function destroy() {
      var me = this;
      me.type = null;
      me.datasetName = null;
      me.outputPath = null;

      if (me.datasourceInfo instanceof DatasourceConnectionInfo_DatasourceConnectionInfo) {
        me.datasourceInfo.destroy();
        me.datasourceInfo = null;
      }
    }
  }]);

  return OutputSetting;
}();
SuperMap.OutputSetting = OutputSetting_OutputSetting;
// CONCATENATED MODULE: ./src/common/iServer/MappingParameters.js
function MappingParameters_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MappingParameters_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MappingParameters_createClass(Constructor, protoProps, staticProps) { if (protoProps) MappingParameters_defineProperties(Constructor.prototype, protoProps); if (staticProps) MappingParameters_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @class SuperMap.MappingParameters
 * @category  iServer ProcessingService
 * @classdesc 分析后结果可视化的参数类。
 * @param {Object} options - 参数。
 * @param {Array.<SuperMap.ThemeGridRangeItem>} [options.items] - 栅格分段专题图子项数组。
 * @param {number} [options.numericPrecision=1] - 精度，此字段用于设置分析结果标签专题图中标签数值的精度，如“1”表示精确到小数点的后一位。
 * @param {SuperMap.RangeMode} [options.rangeMode=SuperMap.RangeMode.EQUALINTERVAL] - 专题图分段模式。
 * @param {number} [options.rangeCount] - 专题图分段个数。
 * @param {SuperMap.ColorGradientType} [options.colorGradientType=SuperMap.ColorGradientType.YELLOW_RED] - 专题图颜色渐变模式。
 */

var MappingParameters_MappingParameters =
/*#__PURE__*/
function () {
  function MappingParameters(options) {
    MappingParameters_classCallCheck(this, MappingParameters);

    /**
     * @member {Array.<SuperMap.ThemeGridRangeItem>} [SuperMap.MappingParameters.prototype.items]
     * @description 栅格分段专题图子项数组。
     */
    this.items = null;
    /**
     * @member {number} [SuperMap.MappingParameters.prototype.numericPrecision=1]
     * @description 精度，此字段用于设置分析结果标签专题图中标签数值的精度，如“1”表示精确到小数点的后一位。
     */

    this.numericPrecision = 1;
    /**
     * @member {SuperMap.RangeMode} [SuperMap.MappingParameters.prototype.RangeMode=SuperMap.RangeMode.EQUALINTERVAL]
     * @description 专题图分段模式。
     */

    this.rangeMode = RangeMode.EQUALINTERVAL;
    /**
     * @member {number} [SuperMap.MappingParameters.prototype.rangeCount]
     * @description 专题图分段个数。
     */

    this.rangeCount = "";
    /**
     * @member {SuperMap.ColorGradientType} [SuperMap.MappingParameters.prototype.colorGradientType=SuperMap.ColorGradientType.YELLOW_RED]
     * @description 专题图颜色渐变模式。
     */

    this.colorGradientType = ColorGradientType.YELLOW_RED;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.MappingParameters";
  }
  /**
   * @function SuperMap.MappingParameters.prototype.destroy
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
SuperMap.MappingParameters = MappingParameters_MappingParameters;
// CONCATENATED MODULE: ./src/common/iServer/KernelDensityJobParameter.js
function KernelDensityJobParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function KernelDensityJobParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function KernelDensityJobParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) KernelDensityJobParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) KernelDensityJobParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.KernelDensityJobParameter
 * @category iServer ProcessingService DensityAnalyst
 * @classdesc 密度分析任务参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasetName - 数据集名。 
 * @param {string} options.fields - 权重索引。 
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} [options.query] - 分析范围（默认为全图范围）。 
 * @param {number} [options.resolution=80] - 分辨率。 
 * @param {number} [options.method=0] - 分析方法。 
 * @param {number} [options.meshType=0] - 分析类型。 
 * @param {number} [options.radius=300] - 分析的影响半径。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */

var KernelDensityJobParameter_KernelDensityJobParameter =
/*#__PURE__*/
function () {
  function KernelDensityJobParameter(options) {
    KernelDensityJobParameter_classCallCheck(this, KernelDensityJobParameter);

    if (!options) {
      return;
    }
    /**
     * @member {string} SuperMap.KernelDensityJobParameter.prototype.datasetName
     * @description 数据集名。
     */


    this.datasetName = "";
    /**
     * @member {SuperMap.Bounds|L.Bounds|ol.extent} [SuperMap.KernelDensityJobParameter.prototype.query]
     * @description 分析范围。 
     */

    this.query = "";
    /**
     * @member {number} [SuperMap.KernelDensityJobParameter.prototype.resolution=80]
     * @description 网格大小。
     */

    this.resolution = 80;
    /**
     * @member {number} [SuperMap.KernelDensityJobParameter.prototype.method=0]
     * @description 分析方法。
     */

    this.method = 0;
    /**
     * @member {number} [SuperMap.KernelDensityJobParameter.prototype.meshType=0]
     * @description 分析类型。
     */

    this.meshType = 0;
    /**
     * @member {string} SuperMap.KernelDensityJobParameter.prototype.fields
     * @description 权重索引。
     */

    this.fields = "";
    /**
     * @member {number} [SuperMap.KernelDensityJobParameter.prototype.radius=300]
     * @description 分析的影响半径。
     */

    this.radius = 300;
    /**
     * @member {SuperMap.AnalystSizeUnit} [SuperMap.KernelDensityJobParameter.prototype.meshSizeUnit=SuperMap.AnalystSizeUnit.METER]
     * @description 网格大小单位。
     */

    this.meshSizeUnit = AnalystSizeUnit.METER;
    /**
     * @member {SuperMap.AnalystSizeUnit} [SuperMap.KernelDensityJobParameter.prototype.radiusUnit=SuperMap.AnalystSizeUnit.METER]
     * @description 搜索半径单位。
     */

    this.radiusUnit = AnalystSizeUnit.METER;
    /**
     * @member {SuperMap.AnalystAreaUnit} [SuperMap.KernelDensityJobParameter.prototype.areaUnit=SuperMap.AnalystAreaUnit.SQUAREMILE]
     * @description 面积单位。
     */

    this.areaUnit = AnalystAreaUnit.SQUAREMILE;
    /**
     * @member {SuperMap.OutputSetting} SuperMap.KernelDensityJobParameter.prototype.output
     * @description 输出参数设置类
     */

    this.output = null;
    /**
     * @member {SuperMap.MappingParameters} [SuperMap.KernelDensityJobParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */

    this.mappingParameters = null;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.KernelDensityJobParameter";
  }
  /**
   * @function SuperMap.KernelDensityJobParameter.prototype.destroy
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

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.KernelDensityJobParameter.toObject
     * @param {SuperMap.KernelDensityJobParameter} kernelDensityJobParameter - 密度分析任务参数类。
     * @param {SuperMap.KernelDensityJobParameter} tempObj - 密度分析任务参数对象。
     * @description 将密度分析任务参数对象转换为 JSON 对象。
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
SuperMap.KernelDensityJobParameter = KernelDensityJobParameter_KernelDensityJobParameter;
// CONCATENATED MODULE: ./src/common/iServer/SingleObjectQueryJobsParameter.js
function SingleObjectQueryJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SingleObjectQueryJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SingleObjectQueryJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) SingleObjectQueryJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) SingleObjectQueryJobsParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.SingleObjectQueryJobsParameter
 * @category  iServer ProcessingService Query
 * @classdesc 单对象空间查询分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {string} options.datasetQuery - 查询对象所在的数据集名称。
 * @param {SuperMap.SpatialQueryMode} [options.mode=SuperMap.SpatialQueryMode.CONTAIN] - 空间查询模式。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */

var SingleObjectQueryJobsParameter_SingleObjectQueryJobsParameter =
/*#__PURE__*/
function () {
  function SingleObjectQueryJobsParameter(options) {
    SingleObjectQueryJobsParameter_classCallCheck(this, SingleObjectQueryJobsParameter);

    if (!options) {
      return;
    }
    /**
     * @member {string} SuperMap.SingleObjectQueryJobsParameter.prototype.datasetName
     * @description 数据集名。
     */


    this.datasetName = "";
    /**
     * @member {string} SuperMap.SingleObjectQueryJobsParameter.prototype.datasetQuery
     * @description 查询对象所在的数据集名称。
     */

    this.datasetQuery = "";
    /**
     * @member {string} SuperMap.SingleObjectQueryJobsParameter.prototype.geometryQuery
     * @description 查询对象所在的几何对象。
     */

    this.geometryQuery = "";
    /**
     * @member {SuperMap.SpatialQueryMode} [SuperMap.SingleObjectQueryJobsParameter.prototype.mode=SuperMap.SpatialQueryMode.CONTAIN]
     * @description 空间查询模式 。
     */

    this.mode = SpatialQueryMode.CONTAIN;
    /**
     * @member {SuperMap.OutputSetting} [SuperMap.SingleObjectQueryJobsParameter.prototype.output]
     * @description 输出参数设置类。
     */

    this.output = null;
    /**
     * @member {SuperMap.MappingParameters} [SuperMap.SingleObjectQueryJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。   
     */

    this.mappingParameters = null;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.SingleObjectQueryJobsParameter";
  }
  /**
   * @function SuperMap.SingleObjectQueryJobsParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */


  SingleObjectQueryJobsParameter_createClass(SingleObjectQueryJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.datasetQuery = null;
      this.geometryQuery = null;
      this.mode = null;

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.SingleObjectQueryJobsParameter.toObject
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
SuperMap.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter_SingleObjectQueryJobsParameter;
// CONCATENATED MODULE: ./src/common/iServer/SummaryAttributesJobsParameter.js
function SummaryAttributesJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SummaryAttributesJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SummaryAttributesJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryAttributesJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryAttributesJobsParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.SummaryAttributesJobsParameter
 * @category  iServer ProcessingService SummaryAttributes
 * @classdesc 属性汇总分析任务参数类
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {string} options.groupField - 分组字段。
 * @param {string} options.attributeField - 属性字段。
 * @param {string} options.statisticModes - 统计模式。
 * @param {SuperMap.OutputSetting} [options.output] -输出参数设置。
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */

var SummaryAttributesJobsParameter_SummaryAttributesJobsParameter =
/*#__PURE__*/
function () {
  function SummaryAttributesJobsParameter(options) {
    SummaryAttributesJobsParameter_classCallCheck(this, SummaryAttributesJobsParameter);

    if (!options) {
      return;
    }
    /**
     * @member {string} SuperMap.SummaryAttributesJobsParameter.prototype.datasetName
     * @description 汇总数据集名称。
     */


    this.datasetName = "";
    /**
     * @member {string} SuperMap.SummaryAttributesJobsParameter.prototype.groupField
     * @description 分组字段。
     */

    this.groupField = "";
    /**
     * @member {string} SuperMap.SummaryAttributesJobsParameter.prototype.attributeField
     * @description 属性字段。
     */

    this.attributeField = "";
    /**
     * @member {string} SuperMap.SummaryAttributesJobsParameter.prototype.statisticModes
     * @description 属性汇总统计模式。
     */

    this.statisticModes = "";
    /**
     * @member {SuperMap.OutputSetting} SuperMap.SummaryAttributesJobsParameter.prototype.output
     * @description 输出参数设置类。
     */

    this.output = null;
    /**
     * @member {SuperMap.MappingParameters} [SuperMap.SummaryAttributesJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。   
     */

    this.mappingParameters = null;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.SummaryAttributesJobsParameter";
  }
  /**
   * @function SuperMap.SummaryAttributesJobsParameter.destroy
   * @override
   */


  SummaryAttributesJobsParameter_createClass(SummaryAttributesJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.groupField = null;
      this.attributeField = null;
      this.statisticModes = null;

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.SummaryAttributesJobsParameter.toObject
     * @param {Object} SummaryAttributesJobsParameter - 属性汇总任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成属性汇总分析任务对象。
     */

  }], [{
    key: "toObject",
    value: function toObject(SummaryAttributesJobsParameter, tempObj) {
      for (var name in SummaryAttributesJobsParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = SummaryAttributesJobsParameter[name];
          continue;
        }

        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = SummaryAttributesJobsParameter[name];
          continue;
        }

        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = SummaryAttributesJobsParameter[name];

        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = SummaryAttributesJobsParameter[name];
        }
      }
    }
  }]);

  return SummaryAttributesJobsParameter;
}();
SuperMap.SummaryAttributesJobsParameter = SummaryAttributesJobsParameter_SummaryAttributesJobsParameter;
// CONCATENATED MODULE: ./src/common/iServer/SummaryMeshJobParameter.js
function SummaryMeshJobParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SummaryMeshJobParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SummaryMeshJobParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryMeshJobParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryMeshJobParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.SummaryMeshJobParameter
 * @category  iServer ProcessingService AggregatePoints
 * @classdesc 点聚合分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} [options.query] - 分析范围（默认为全图范围）。
 * @param {number} options.fields - 权重索引。
 * @param {number} [options.resolution=100] - 分辨率。
 * @param {SuperMap.StatisticAnalystMode} [options.statisticModes=SuperMap.StatisticAnalystMode.AVERAGE] - 分析模式。
 * @param {number} [options.meshType=0] - 分析类型。
 * @param {SuperMap.SummaryType} [options.type=SuperMap.SummaryType.SUMMARYMESH] - 聚合类型。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */

var SummaryMeshJobParameter_SummaryMeshJobParameter =
/*#__PURE__*/
function () {
  function SummaryMeshJobParameter(options) {
    SummaryMeshJobParameter_classCallCheck(this, SummaryMeshJobParameter);

    if (!options) {
      return;
    }
    /**
     * @member {string} SuperMap.SummaryMeshJobParameter.prototype.datasetName
     * @description 数据集名。
     */


    this.datasetName = "";
    /**
     * @member {string} SuperMap.SummaryMeshJobParameter.prototype.regionDataset
     * @description 聚合面数据集（聚合类型为多边形聚合时使用的参数）。
     */

    this.regionDataset = "";
    /**
     * @member {(SuperMap.Bounds|L.Bounds|ol.extent)} SuperMap.SummaryMeshJobParameter.prototype.query
     * @description 分析范围（聚合类型为网格面聚合时使用的参数）。
     */

    this.query = "";
    /**
     * @member {number} [SuperMap.SummaryMeshJobParameter.prototype.resolution=100]
     * @description 分辨率（聚合类型为网格面聚合时使用的参数）。
     */

    this.resolution = 100;
    /**
     * @member {number} [SuperMap.SummaryMeshJobParameter.prototype.meshType=0]
     * @description  网格面类型（聚合类型为网格面聚合时使用的参数），取值：0 或 1。
     */

    this.meshType = 0;
    /**
     * @member {SuperMap.StatisticAnalystMode} [SuperMap.SummaryMeshJobParameter.prototype.statisticModes=SuperMap.StatisticAnalystMode.AVERAGE]
     * @description 统计模式。
     */

    this.statisticModes = StatisticAnalystMode.AVERAGE;
    /**
     * @member {number} SuperMap.SummaryMeshJobParameter.prototype.fields
     * @description 权重字段。
     */

    this.fields = "";
    /**
     * @member {SuperMap.SummaryType} [SuperMap.SummaryMeshJobParameter.prototype.type=SuperMap.SummaryType.SUMMARYMESH]
     * @description 聚合类型。
     */

    this.type = SummaryType.SUMMARYMESH;
    /**
     * @member {SuperMap.OutputSetting} [SuperMap.SummaryMeshJobParameter.prototype.output]
     * @description 输出参数设置类。
     */

    this.output = null;
    /**
     * @member {SuperMap.MappingParameters} [SuperMap.SummaryMeshJobParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。   
     */

    this.mappingParameters = null;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.SummaryMeshJobParameter";
  }
  /**
   * @function SuperMap.SummaryMeshJobParameter.destroy
   * @override
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

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.SummaryMeshJobParameter.toObject
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
SuperMap.SummaryMeshJobParameter = SummaryMeshJobParameter_SummaryMeshJobParameter;
// CONCATENATED MODULE: ./src/common/iServer/SummaryRegionJobParameter.js
function SummaryRegionJobParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SummaryRegionJobParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SummaryRegionJobParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryRegionJobParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryRegionJobParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.SummaryRegionJobParameter
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} [options.query] - 分析范围（默认为全图范围）。
 * @param {string} [options.standardFields] - 标准属性字段名称。
 * @param {string} [options.weightedFields] - 权重字段名称。
 * @param {SuperMap.StatisticAnalystMode} [options.standardStatisticModes] - 标准属性字段的统计模式。standardSummaryFields 为 true 时必填。
 * @param {SuperMap.StatisticAnalystMode} [options.weightedStatisticModes] - 权重字段的统计模式。weightedSummaryFields 为 true 时必填。 
 * @param {boolean} [options.sumShape=true] - 是否统计长度或面积。
 * @param {boolean} [options.standardSummaryFields=false] - 是否以标准属字段统计。
 * @param {boolean} [options.weightedSummaryFields=false] - 是否以权重字段统计。
 * @param {number} [options.resolution=100] - 网格大小。
 * @param {number} [options.meshType=0] - 网格面汇总类型。
 * @param {SuperMap.AnalystSizeUnit} [options.meshSizeUnit=SuperMap.AnalystSizeUnit.METER] - 网格大小单位。
 * @param {SuperMap.SummaryType} [options.type=SuperMap.SummaryType.SUMMARYMESH] - 汇总类型。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */

var SummaryRegionJobParameter_SummaryRegionJobParameter =
/*#__PURE__*/
function () {
  function SummaryRegionJobParameter(options) {
    SummaryRegionJobParameter_classCallCheck(this, SummaryRegionJobParameter);

    if (!options) {
      return;
    }
    /**
     * @member {string} SuperMap.SummaryRegionJobParameter.prototype.datasetName
     * @description 数据集名。
     */


    this.datasetName = "";
    /**
     * @member {string} SuperMap.SummaryRegionJobParameter.prototype.regionDataset
     * @description 汇总数据源（多边形汇总时用到的参数）。
     */

    this.regionDataset = "";
    /**
     * @member {boolean} [SuperMap.SummaryRegionJobParameter.prototype.sumShape=true]
     * @description 是否统计长度或面积。
     */

    this.sumShape = true;
    /**
     * @member {(SuperMap.Bounds|L.Bounds|ol.extent)} SuperMap.SummaryRegionJobParameter.prototype.query
     * @description 分析范围。
     */

    this.query = "";
    /**
     * @member {boolean} [SuperMap.SummaryRegionJobParameter.prototype.standardSummaryFields=false]
     * @description 是否以标准属字段统计。
     */

    this.standardSummaryFields = false;
    /**
     * @member {string} SuperMap.SummaryRegionJobParameter.prototype.standardFields
     * @description 标准属性字段名称。仅支持系统字段以外的整形、长整形、浮点型的字段的名称。standardSummaryFields 为 true 时必填。 
     */

    this.standardFields = "";
    /**
     * @member {SuperMap.StatisticAnalystMode} SuperMap.SummaryRegionJobParameter.prototype.standardStatisticModes
     * @description 标准属性字段的统计模式。standardSummaryFields 为 true 时必填。
     */

    this.standardStatisticModes = "";
    /**
     * @member {boolean} [SuperMap.SummaryRegionJobParameter.prototype.weightedSummaryFields=false]
     * @description 是否以权重字段统计。
     */

    this.weightedSummaryFields = false;
    /**
     * @member {string} SuperMap.SummaryRegionJobParameter.prototype.weightedFields
     * @description 权重字段名称。仅支持系统字段以外的整形、长整形、浮点型的字段的名称。weightedSummaryFields 为 true 时必填。 
     */

    this.weightedFields = "";
    /**
     * @member {SuperMap.StatisticAnalystMode} SuperMap.SummaryRegionJobParameter.prototype.weightedStatisticModes
     * @description 以权重字段统计的统计模式。权重字段的统计模式。weightedSummaryFields 为 true 时必填。 
     */

    this.weightedStatisticModes = "";
    /**
     * @member {number} [SuperMap.SummaryRegionJobParameter.prototype.meshType=0]
     * @description 网格面汇总类型。
     */

    this.meshType = 0;
    /**
     * @member {number} [SuperMap.SummaryRegionJobParameter.prototype.resolution=100]
     * @description 网格大小。
     */

    this.resolution = 100;
    /**
     * @member {SuperMap.AnalystSizeUnit} [SuperMap.SummaryRegionJobParameter.prototype.meshSizeUnit=SuperMap.AnalystSizeUnit.METER]
     * @description 网格大小单位。
     */

    this.meshSizeUnit = AnalystSizeUnit.METER;
    /**
     * @member {SuperMap.SummaryType} [SuperMap.SummaryRegionJobParameter.prototype.type=SuperMap.SummaryType.SUMMARYMESH]
     * @description 汇总类型。
     */

    this.type = SummaryType.SUMMARYMESH;
    /**
     * @member {SuperMap.OutputSetting} SuperMap.SummaryRegionJobParameter.prototype.output
     * @description 输出参数设置类
     */

    this.output = null;
    /**
     * @member {SuperMap.MappingParameters} [SuperMap.SummaryRegionJobParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。   
     */

    this.mappingParameters = null;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.SummaryRegionJobParameter";
  }
  /**
   * @function SuperMap.SummaryRegionJobParameter.prototype.destroy
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

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.SummaryRegionJobParameter.toObject
     * @param {Object} summaryRegionJobParameter - 矢量裁剪分析任务参数。
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
SuperMap.SummaryRegionJobParameter = SummaryRegionJobParameter_SummaryRegionJobParameter;
// CONCATENATED MODULE: ./src/common/iServer/OverlayGeoJobParameter.js
function OverlayGeoJobParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function OverlayGeoJobParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function OverlayGeoJobParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) OverlayGeoJobParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) OverlayGeoJobParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.OverlayGeoJobParameter
 * @category iServer ProcessingService OverlayAnalyst
 * @classdesc 叠加分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {string} options.datasetOverlay - 叠加对象所在的数据集名称。
 * @param {string} options.srcFields - 输入数据需要保留的字段。
 * @param {string} [options.overlayFields] - 叠加数据需要保留的字段。对分析模式为 clip、update、erase 时，此参数无效。
 * @param {string} [options.mode] - 叠加分析模式。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */

var OverlayGeoJobParameter_OverlayGeoJobParameter =
/*#__PURE__*/
function () {
  function OverlayGeoJobParameter(options) {
    OverlayGeoJobParameter_classCallCheck(this, OverlayGeoJobParameter);

    if (!options) {
      return;
    }
    /**
     * @member {string} SuperMap.OverlayGeoJobParameter.prototype.datasetName
     * @description 数据集名。
     */


    this.datasetName = "";
    /**
     * @member {string} SuperMap.OverlayGeoJobParameter.prototype.datasetOverlay
     * @description 叠加对象所在的数据集名称。
     */

    this.datasetOverlay = "";
    /**
     * @member {string} [SuperMap.OverlayGeoJobParameter.prototype.mode]
     * @description 叠加分析模式。
     */

    this.mode = "";
    /**
     * @member {string} SuperMap.OverlayGeoJobParameter.prototype.srcFields
     * @description 输入数据需要保留的字段。
     */

    this.srcFields = "";
    /**
     * @member {string} SuperMap.OverlayGeoJobParameter.prototype.overlayFields
     * @description 叠加数据需要保留的字段，对分析模式为 clip、update、erase 时，此参数无效。
     */

    this.overlayFields = "";
    /**
     * @member {SuperMap.OutputSetting} [SuperMap.OverlayGeoJobParameter.prototype.output]
     * @description 输出参数设置类。
     */

    this.output = null;
    /**
    * @member {SuperMap.MappingParameters} [SuperMap.OverlayGeoJobParameter.prototype.mappingParameters]
    * @description 分析后结果可视化的参数类。   
    */

    this.mappingParameters = null;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.OverlayGeoJobParameter";
  }
  /**
   * @function SuperMap.OverlayGeoJobParameter.destroy
   * @override
   */


  OverlayGeoJobParameter_createClass(OverlayGeoJobParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.datasetOverlay = null;
      this.mode = null;
      this.srcFields = null;
      this.overlayFields = null;

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.OverlayGeoJobParameter.toObject
     * @param {Object} OverlayGeoJobParameter - 点聚合分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成点聚合分析任务对象。
     */

  }], [{
    key: "toObject",
    value: function toObject(OverlayGeoJobParameter, tempObj) {
      for (var name in OverlayGeoJobParameter) {
        if (name == "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = OverlayGeoJobParameter[name];
          continue;
        }

        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = OverlayGeoJobParameter[name];
          continue;
        }

        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = OverlayGeoJobParameter[name];

        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = OverlayGeoJobParameter[name];
        }
      }
    }
  }]);

  return OverlayGeoJobParameter;
}();
SuperMap.OverlayGeoJobParameter = OverlayGeoJobParameter_OverlayGeoJobParameter;
// CONCATENATED MODULE: ./src/common/iServer/BuffersAnalystJobsParameter.js
function BuffersAnalystJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BuffersAnalystJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function BuffersAnalystJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) BuffersAnalystJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) BuffersAnalystJobsParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.BuffersAnalystJobsParameter
 * @category iServer ProcessingService BufferAnalyst
 * @classdesc 缓冲区分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} [options.bounds] - 分析范围（默认为全图范围）。
 * @param {string} [options.distance='15'] - 缓冲距离，或缓冲区半径。
 * @param {string} [options.distanceField='pickup_latitude'] - 缓冲区分析距离字段。
 * @param {SuperMap.AnalystSizeUnit} [options.distanceUnit=SuperMap.AnalystSizeUnit.METER] - 缓冲距离单位单位。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 */

var BuffersAnalystJobsParameter_BuffersAnalystJobsParameter =
/*#__PURE__*/
function () {
  function BuffersAnalystJobsParameter(options) {
    BuffersAnalystJobsParameter_classCallCheck(this, BuffersAnalystJobsParameter);

    /**
     * @member {string} SuperMap.BuffersAnalystJobsParameter.prototype.datasetName
     * @description 数据集名。
     */
    this.datasetName = '';
    /**
     * @member {(SuperMap.Bounds|L.Bounds|ol.extent)} SuperMap.BuffersAnalystJobsParameter.prototype.bounds
     * @description 分析范围。
     */

    this.bounds = '';
    /**
     * @member {string} [SuperMap.BuffersAnalystJobsParameter.prototype.distance='15']
     * @description 缓冲距离，或称为缓冲区半径。当缓冲距离字段位空时，此参数有效。
     */

    this.distance = '';
    /**
     * @member {string} [SuperMap.BuffersAnalystJobsParameter.prototype.distanceField='pickup_latitude']
     * @description 缓冲距离字段。
     */

    this.distanceField = '';
    /**
     * @member {SuperMap.AnalystSizeUnit} [SuperMap.BuffersAnalystJobsParameter.prototype.distanceUnit=SuperMap.AnalystSizeUnit.METER]
     * @description 缓冲距离单位。
     */

    this.distanceUnit = AnalystSizeUnit.METER;
    /**
     * @member {string} SuperMap.BuffersAnalystJobsParameter.prototype.dissolveField
     * @description 融合字段，根据字段值对缓冲区结果面对象进行融合。
     */

    this.dissolveField = '';
    /**
     * @member {SuperMap.OutputSetting} [SuperMap.BuffersAnalystJobsParameter.prototype.output]
     * @description 输出参数设置类。
     */

    this.output = null;
    /**
     * @member {SuperMap.MappingParameters} [SuperMap.BuffersAnalystJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。
     */

    this.mappingParameters = null;

    if (!options) {
      return this;
    }

    Util.extend(this, options);
    this.CLASS_NAME = 'SuperMap.BuffersAnalystJobsParameter';
  }
  /**
   * @function SuperMap.BuffersAnalystJobsParameter.prototype.destroy
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

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.BuffersAnalystJobsParameter.toObject
     * @param {SuperMap.BuffersAnalystJobsParameter} BuffersAnalystJobsParameter - 缓冲区分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成缓冲区分析任务对象。
     */

  }], [{
    key: "toObject",
    value: function toObject(BuffersAnalystJobsParameter, tempObj) {
      for (var name in BuffersAnalystJobsParameter) {
        if (name === 'datasetName') {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = BuffersAnalystJobsParameter[name];
          continue;
        }

        if (name === 'output') {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = BuffersAnalystJobsParameter[name];
          continue;
        }

        tempObj['analyst'] = tempObj['analyst'] || {};

        if (name === 'bounds' && BuffersAnalystJobsParameter[name]) {
          tempObj['analyst'][name] = BuffersAnalystJobsParameter[name].toBBOX();
        } else {
          tempObj['analyst'][name] = BuffersAnalystJobsParameter[name];
        }

        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = BuffersAnalystJobsParameter[name];
        }
      }
    }
  }]);

  return BuffersAnalystJobsParameter;
}();
SuperMap.BuffersAnalystJobsParameter = BuffersAnalystJobsParameter_BuffersAnalystJobsParameter;
// CONCATENATED MODULE: ./src/common/iServer/TopologyValidatorJobsParameter.js
function TopologyValidatorJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TopologyValidatorJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TopologyValidatorJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) TopologyValidatorJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) TopologyValidatorJobsParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.TopologyValidatorJobsParameter
 * @category  iServer ProcessingService TopologyValidator
 * @classdesc 拓扑检查分析任务参数类。
 * @param {Object} options - 必填参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {string} options.datasetTopology -检查对象所在的数据集名称。
 * @param {SuperMap.TopologyValidatorRule} [options.rule=SuperMap.TopologyValidatorRule.REGIONNOOVERLAP] - 拓扑检查规则。
 * @param {string} [options.tolerance] - 容限。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */

var TopologyValidatorJobsParameter_TopologyValidatorJobsParameter =
/*#__PURE__*/
function () {
  function TopologyValidatorJobsParameter(options) {
    TopologyValidatorJobsParameter_classCallCheck(this, TopologyValidatorJobsParameter);

    if (!options) {
      return;
    }
    /**
     * @member {string} SuperMap.TopologyValidatorJobsParameter.prototype.datasetName
     * @description 数据集名。
     */


    this.datasetName = "";
    /**
     * @member {string} SuperMap.TopologyValidatorJobsParameter.prototype.datasetTopology
     * @description 拓扑检查对象所在的数据集名称。
     */

    this.datasetTopology = "";
    /**
     * @member {string} [SuperMap.TopologyValidatorJobsParameter.prototype.tolerance]
     * @description 容限，指定的拓扑错误检查时使用的容限。
     */

    this.tolerance = "";
    /**
     * @member {SuperMap.TopologyValidatorRule} [SuperMap.TopologyValidatorJobsParameter.prototype.rule=SuperMap.TopologyValidatorRule.REGIONNOOVERLAP]
     * @description 拓扑检查模式。
     */

    this.rule = TopologyValidatorRule.REGIONNOOVERLAP;
    /**
     * @member {SuperMap.OutputSetting} [SuperMap.TopologyValidatorJobsParameter.prototype.output]
     * @description 输出参数设置类。
     */

    this.output = null;
    /**
     * @member {SuperMap.MappingParameters} [SuperMap.TopologyValidatorJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。   
     */

    this.mappingParameters = null;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.TopologyValidatorJobsParameter";
  }
  /**
   * @function SuperMap.TopologyValidatorJobsParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */


  TopologyValidatorJobsParameter_createClass(TopologyValidatorJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.datasetTopology = null;
      this.tolerance = null;
      this.rule = null;

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.TopologyValidatorJobsParameter.toObject
     * @param {Object} TopologyValidatorJobsParameter -拓扑检查分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成拓扑检查分析任务对象。
     */

  }], [{
    key: "toObject",
    value: function toObject(TopologyValidatorJobsParameter, tempObj) {
      for (var name in TopologyValidatorJobsParameter) {
        if (name === "datasetName") {
          tempObj['input'] = tempObj['input'] || {};
          tempObj['input'][name] = TopologyValidatorJobsParameter[name];
          continue;
        }

        if (name === "output") {
          tempObj['output'] = tempObj['output'] || {};
          tempObj['output'] = TopologyValidatorJobsParameter[name];
          continue;
        }

        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = TopologyValidatorJobsParameter[name];

        if (name === 'mappingParameters') {
          tempObj['analyst'][name] = tempObj['analyst'][name] || {};
          tempObj['analyst']['mappingParameters'] = TopologyValidatorJobsParameter[name];
        }
      }
    }
  }]);

  return TopologyValidatorJobsParameter;
}();
SuperMap.TopologyValidatorJobsParameter = TopologyValidatorJobsParameter_TopologyValidatorJobsParameter;
// CONCATENATED MODULE: ./src/common/iServer/GeoCodingParameter.js
function GeoCodingParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GeoCodingParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GeoCodingParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) GeoCodingParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) GeoCodingParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class SuperMap.GeoCodingParameter
 * @category  iServer AddressMatch
 * @classdesc 地理正向匹配参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.address - 地点关键词。 
 * @param {number} [options.fromIndex] - 设置返回对象的起始索引值。 
 * @param {number} [options.toIndex] - 设置返回对象的结束索引值。 
 * @param {Array.<string>} [options.filters] - 过滤字段，限定查询区域。 
 * @param {string} [options.prjCoordSys] - 查询结果的坐标系。 
 * @param {number} [options.maxReturn] - 最大返回结果数。
 */

var GeoCodingParameter_GeoCodingParameter =
/*#__PURE__*/
function () {
  function GeoCodingParameter(options) {
    GeoCodingParameter_classCallCheck(this, GeoCodingParameter);

    if (options.filters && typeof options.filters === 'string') {
      options.filters = options.filters.split(',');
    }
    /**
     * @member {string} SuperMap.GeoCodingParameter.prototype.address
     * @description 地点关键词。
     */


    this.address = null;
    /**
     * @member {number} [SuperMap.GeoCodingParameter.prototype.fromIndex]
     * @description 设置返回对象的起始索引值。
     */

    this.fromIndex = null;
    /**
     * @member {number} [SuperMap.GeoCodingParameter.prototype.toIndex]
     * @description 设置返回对象的结束索引值。
     */

    this.toIndex = null;
    /**
     * @member {Array.<string>} [SuperMap.GeoCodingParameter.prototype.filters]
     * @description 过滤字段，限定查询区域。
     */

    this.filters = null;
    /**
     * @member {string} [SuperMap.GeoCodingParameter.prototype.prjCoordSys]
     * @description  查询结果的坐标系。
     */

    this.prjCoordSys = null;
    /**
     * @member {number} [SuperMap.GeoCodingParameter.prototype.maxReturn]
     * @description 最大返回结果数。
     */

    this.maxReturn = null;
    Util.extend(this, options);
  }
  /**
   * @function SuperMap.GeoCodingParameter.prototype.destroy
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
SuperMap.GeoCodingParameter = GeoCodingParameter_GeoCodingParameter;
// CONCATENATED MODULE: ./src/common/iServer/GeoDecodingParameter.js
function GeoDecodingParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GeoDecodingParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GeoDecodingParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) GeoDecodingParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) GeoDecodingParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class SuperMap.GeoDecodingParameter
 * @category iServer AddressMatch
 * @classdesc 地理反向匹配参数类。
 * @param {Object} options - 参数。 
 * @param {number} options.x - 查询位置的横坐标。 
 * @param {number} options.y - 查询位置的纵坐标。 
 * @param {number} [options.fromIndex] - 设置返回对象的起始索引值。 
 * @param {Array.<string>} [options.filters] - 过滤字段，限定查询区域。 
 * @param {string} [options.prjCoordSys] - 查询结果的坐标系。 
 * @param {number} [options.maxReturn] - 最大返回结果数。 
 * @param {number} [options.geoDecodingRadius] - 查询半径。
 */

var GeoDecodingParameter_GeoDecodingParameter =
/*#__PURE__*/
function () {
  function GeoDecodingParameter(options) {
    GeoDecodingParameter_classCallCheck(this, GeoDecodingParameter);

    if (options.filters) {
      options.filters = options.filters.split(',');
    }
    /**
     * @member {number} SuperMap.GeoDecodingParameter.prototype.x
     * @description 查询位置的横坐标。
     */


    this.x = null;
    /**
     * @member {number} SuperMap.GeoDecodingParameter.prototype.y
     * @description 查询位置的纵坐标。
     */

    this.y = null;
    /**
     * @member {number} [SuperMap.GeoDecodingParameter.prototype.fromIndex]
     * @description  设置返回对象的起始索引值。
     */

    this.fromIndex = null;
    /**
     * @member {number} [SuperMap.GeoDecodingParameter.prototype.toIndex]
     * @description 设置返回对象的结束索引值。
     */

    this.toIndex = null;
    /**
     * @member {Array.<string>} [SuperMap.GeoDecodingParameter.prototype.filters]
     * @description 过滤字段，限定查询区域。
     */

    this.filters = null;
    /**
     * @member {string} [SuperMap.GeoDecodingParameter.prototype.prjCoordSys]
     * @description 查询结果的坐标系。
     */

    this.prjCoordSys = null;
    /**
     *  @member {number} [SuperMap.GeoDecodingParameter.prototype.maxReturn]
     *  @description 最大返回结果数。
     */

    this.maxReturn = null;
    /**
     * @member {number} SuperMap.GeoDecodingParameter.prototype.geoDecodingRadius
     * @description 查询半径。
     */

    this.geoDecodingRadius = null;
    Util.extend(this, options);
  }
  /**
   * @function SuperMap.GeoDecodingParameter.prototype.destroy
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
SuperMap.GeoDecodingParameter = GeoDecodingParameter_GeoDecodingParameter;
// CONCATENATED MODULE: ./src/classic/SuperMap.js
var SuperMap_SuperMap = window.SuperMap = window.SuperMap || {};
SuperMap_SuperMap.REST = SuperMap_SuperMap.REST || {};

// EXTERNAL MODULE: external "function(){try{return mapv}catch(e){return {}}}()"
var external_function_try_return_mapv_catch_e_return_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/common/util/MapCalculateUtil.js

var MapCalculateUtil_getMeterPerMapUnit = function getMeterPerMapUnit(mapUnit) {
  var earchRadiusInMeters = 6378137;
  var meterPerMapUnit;

  if (mapUnit === Unit.METER) {
    meterPerMapUnit = 1;
  } else if (mapUnit === Unit.DEGREE) {
    // 每度表示多少米。
    meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
  } else if (mapUnit === Unit.KILOMETER) {
    meterPerMapUnit = 1.0e-3;
  } else if (mapUnit === Unit.INCH) {
    meterPerMapUnit = 1 / 2.5399999918e-2;
  } else if (mapUnit === Unit.FOOT) {
    meterPerMapUnit = 0.3048;
  } else {
    return meterPerMapUnit;
  }

  return meterPerMapUnit;
};
// CONCATENATED MODULE: ./src/classic/overlay/mapv/MapVRenderer.js
function MapVRenderer_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MapVRenderer_typeof = function _typeof(obj) { return typeof obj; }; } else { MapVRenderer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MapVRenderer_typeof(obj); }

function MapVRenderer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MapVRenderer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MapVRenderer_createClass(Constructor, protoProps, staticProps) { if (protoProps) MapVRenderer_defineProperties(Constructor.prototype, protoProps); if (staticProps) MapVRenderer_defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (MapVRenderer_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
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

var MapVBaseLayer = external_function_try_return_mapv_catch_e_return_["baiduMapLayer"] ? external_function_try_return_mapv_catch_e_return_["baiduMapLayer"].__proto__ : Function;
var MapVRenderer_MapVRenderer =
/*#__PURE__*/
function (_MapVBaseLayer) {
  _inherits(MapVRenderer, _MapVBaseLayer);

  function MapVRenderer(map, layer, dataSet, options) {
    var _this;

    MapVRenderer_classCallCheck(this, MapVRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapVRenderer).call(this, map, dataSet, options));

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

      _get(_getPrototypeOf(MapVRenderer.prototype), "clickEvent", this).call(this, pixel, e);
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
            'click': this.clickEvent
          });
        }

        if (this.options.methods.mousemove) {
          map.events.on({
            'mousemove': this.mousemoveEvent
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
            'click': this.clickEvent
          });
        }

        if (this.options.methods.mousemove) {
          map.events.un({
            'mousemove': this.mousemoveEvent
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
     * @param {oject} data - 待添加的数据。
     * @param {oject} options - 待添加的数据信息。
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
     * @param {oject} data - 待更新的数据。
     * @param {oject} options - 待更新的数据信息。
     */

  }, {
    key: "setData",
    value: function setData(data, options) {
      var _data = data;

      if (data && data.get) {
        _data = data.get();
      }

      this.dataSet = this.dataSet || new external_function_try_return_mapv_catch_e_return_["DataSet"]();
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
          return _filter != null && typeof _filter === "function" ? !_filter(data) : true;
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
      if (this.options.coordType && ["bd09mc", "coordinates_mercator"].indexOf(this.options.coordType) > -1) {
        var data = this.dataSet.get();
        data = this.dataSet.transferCoordinate(data, function (coordinates) {
          var pixel = SuperMap_SuperMap.Projection.transform({
            x: coordinates[0],
            y: coordinates[1]
          }, "EPSG:3857", "EPSG:4326");
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
          // var coord = layer.transferToMapLatLng({lon: coordinate[0], lat: coordinate[1]});
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
      this.processData(data); // 一个像素是多少米

      var zoomUnit = map.getResolution() * MapCalculateUtil_getMeterPerMapUnit('DEGREE'); // // 兼容unit为'm'的情况

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
        'movestart': this.animatorMovestartEvent.bind(this)
      });
      this.map.events.on({
        'moveend': this.animatorMoveendEvent.bind(this)
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
// CONCATENATED MODULE: ./src/classic/overlay/MapVLayer.js
function MapVLayer_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MapVLayer_typeof = function _typeof(obj) { return typeof obj; }; } else { MapVLayer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MapVLayer_typeof(obj); }

function MapVLayer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MapVLayer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MapVLayer_createClass(Constructor, protoProps, staticProps) { if (protoProps) MapVLayer_defineProperties(Constructor.prototype, protoProps); if (staticProps) MapVLayer_defineProperties(Constructor, staticProps); return Constructor; }

function MapVLayer_possibleConstructorReturn(self, call) { if (call && (MapVLayer_typeof(call) === "object" || typeof call === "function")) { return call; } return MapVLayer_assertThisInitialized(self); }

function MapVLayer_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function MapVLayer_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { MapVLayer_get = Reflect.get; } else { MapVLayer_get = function _get(target, property, receiver) { var base = MapVLayer_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return MapVLayer_get(target, property, receiver || target); }

function MapVLayer_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = MapVLayer_getPrototypeOf(object); if (object === null) break; } return object; }

function MapVLayer_getPrototypeOf(o) { MapVLayer_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return MapVLayer_getPrototypeOf(o); }

function MapVLayer_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) MapVLayer_setPrototypeOf(subClass, superClass); }

function MapVLayer_setPrototypeOf(o, p) { MapVLayer_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return MapVLayer_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class SuperMap.Layer.MapVLayer
 * @category  Visualization MapV
 * @classdesc MapV 图层。
 * @extends {SuperMap.Layer}
 * @param {string} name - 图层名。
 * @param {Object} options - 可选参数。
 * @param {Mapv.DataSet} options.dataSet - mapv 的 dataSet 对象。
 * @param {Object} options.options - mapv 绘图风格配置信息。
 */

var MapVLayer_MapVLayer =
/*#__PURE__*/
function (_SuperMap$Layer) {
  MapVLayer_inherits(MapVLayer, _SuperMap$Layer);

  function MapVLayer(name, options) {
    var _this;

    MapVLayer_classCallCheck(this, MapVLayer);

    _this = MapVLayer_possibleConstructorReturn(this, MapVLayer_getPrototypeOf(MapVLayer).call(this, name, options));
    /**
     * @member {mapv.DataSet} SuperMap.Layer.MapVLayer.prototype.dataSet
     * @description mapv dataset 对象。
     */

    _this.dataSet = null;
    /**
     * @member {Object} SuperMap.Layer.MapVLayer.prototype.options
     * @description mapv 绘图风格配置信息。
     */

    _this.options = null;
    /**
     * @member {boolean} [SuperMap.Layer.MapVLayer.prototype.supported=false]
     * @description 当前浏览器是否支持 canvas 绘制。决定了 MapV 图是否可用，内部判断使用。
     */

    _this.supported = false;
    /**
     * @member {Canvas} SuperMap.Layer.MapVLayer.prototype.canvas
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
      SuperMap_SuperMap.Util.extend(MapVLayer_assertThisInitialized(_this), options);
    } //MapV图要求使用canvas绘制，判断是否支持


    _this.canvas = document.createElement('canvas');

    if (!_this.canvas.getContext) {
      return MapVLayer_possibleConstructorReturn(_this);
    }

    _this.supported = true; //构建绘图面板

    _this.canvas.style.position = 'absolute';
    _this.canvas.style.top = 0 + 'px';
    _this.canvas.style.left = 0 + 'px';

    _this.div.appendChild(_this.canvas);

    var context = _this.options && _this.options.context || '2d';
    _this.canvasContext = _this.canvas.getContext(context);
    var global$2 = typeof window === 'undefined' ? {} : window;
    var devicePixelRatio = _this.devicePixelRatio = global$2.devicePixelRatio || 1;

    if (context == '2d') {
      _this.canvasContext.scale(devicePixelRatio, devicePixelRatio);
    }

    _this.attribution = "© 2018 百度 <a href='https://mapv.baidu.com' target='_blank'>MapV</a> with <span>© <a target='_blank' href='https://iclient.supermap.io' " + "style='color: #08c;text-decoration: none;'>SuperMap iClient</a></span>";
    _this.CLASS_NAME = 'SuperMap.Layer.MapVLayer';
    return _this;
  }
  /**
   * @function SuperMap.Layer.MapVLayer.prototype.destroy
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
     * @param {mapv.DataSet} dataSet - mapv 数据集。
     * @param {Object} options - mapv 绘图参数。
     */

  }, {
    key: "addData",
    value: function addData(dataSet, options) {
      this.renderer && this.renderer.addData(dataSet, options);
    }
    /**
     * @function SuperMap.Layer.MapVLayer.prototype.
     * @description 设置数据。
     * @param {mapv.DataSet} dataSet - mapv 数据集。
     * @param {Object} options - mapv 绘图参数。
     */

  }, {
    key: "setData",
    value: function setData(dataSet, options) {
      this.renderer && this.renderer.setData(dataSet, options);
    }
    /**
     * @function SuperMap.Layer.MapVLayer.prototype.getData
     * @description 获取数据。
     * @returns {mapv.DataSet} - mapv 数据集。
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
     * @description 清除数据
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

      this.renderer = new MapVRenderer_MapVRenderer(map, this, this.dataSet, this.options);

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
        this.canvas.width = parseInt(size.w);
        this.canvas.height = parseInt(size.h);
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
     * @param {SuperMap.Lonlat} latLng - 经纬度坐标。
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

      return new SuperMap_SuperMap.LonLat(latLng.lon, latLng.lat).transform(source, dest);
    }
  }]);

  return MapVLayer;
}(SuperMap_SuperMap.Layer);
SuperMap_SuperMap.Layer.MapVLayer = MapVLayer_MapVLayer;
// CONCATENATED MODULE: ./src/classic/overlay/mapv/index.js
/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

// CONCATENATED MODULE: ./src/classic/overlay/index.js
/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


// CONCATENATED MODULE: ./src/common/commontypes/Credential.js
function Credential_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Credential_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Credential_createClass(Constructor, protoProps, staticProps) { if (protoProps) Credential_defineProperties(Constructor.prototype, protoProps); if (staticProps) Credential_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class SuperMap.Credential
 * @category Security
 * @classdesc SuperMap 的安全证书类，其中包括 token 等安全验证信息。</br>
 * 需要使用用户名和密码在："http://localhost:8090/iserver/services/security/tokens" 下申请 value。</br>
 * 获得形如："2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ.." 的 value。</br>
 * 目前支持的功能包括：地图服务、专题图、量算、查询、公交换乘、空间分析、网络分析，不支持轮询功能。</br>
 * @param {string} value - 访问受安全限制的服务时用于通过安全认证的验证信息。
 * @param {string} [name='token'] - 验证信息前缀，name=value 部分的 name 部分。
 * @example
 * var pixcel = new SuperMap.Credential("valueString","token");
 * pixcel.destroy();
 */

var Credential =
/*#__PURE__*/
function () {
  function Credential(value, name) {
    Credential_classCallCheck(this, Credential);

    /**
     * @member {string} SuperMap.Bounds.prototype.value
     * @description 访问受安全限制的服务时用于通过安全认证的验证信息。
     */
    this.value = value ? value : "";
    /**
     * @member {string} [SuperMap.Bounds.prototype.name='token']
     * @description 验证信息前缀，name=value 部分的 name 部分。
     */

    this.name = name ? name : "token";
    this.CLASS_NAME = "SuperMap.Credential";
  }
  /**
   * @function SuperMap.Credential.prototype.getUrlParameters
   * @example
   * var credential = new SuperMap.Credential("valueString","token");
   * //这里 str = "token=valueString";
   * var str = credential.getUrlParameters();
   * @returns {string} 返回安全信息组成的 url 片段。
   */


  Credential_createClass(Credential, [{
    key: "getUrlParameters",
    value: function getUrlParameters() {
      //当需要其他安全信息的时候，则需要return this.name + "=" + this.value + "&" + "...";的形式添加。
      return this.name + "=" + this.value;
    }
    /**
     * @function SuperMap.Bounds.prototype.getValue
     * @description 获取 value。
     * @example
     * var credential = new SuperMap.Credential("2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..","token");
     * //这里 str = "2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..";
     * var str = credential.getValue();
     * @returns {string} 返回 value 字符串，在 iServer 服务下该 value 值即为 token 值。
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
    /**
     *
     * @function SuperMap.Credential.prototype.destroy
     * @description 销毁此对象。销毁后此对象的所有属性为 null，而不是初始值。
     * @example
     * var credential = new SuperMap.Credential("valueString","token");
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
 * @member {SuperMap.Credential} SuperMap.Credential.CREDENTIAL
 * @description 这个对象保存一个安全类的实例，在服务端需要安全验证的时候必须进行设置。
 * @constant
 * @example
 * 代码实例:
 *  // 当iServer启用服务安全的时候，下边的代码是必须的。安全证书类能够接收一个value和一个name参数。
 *  var value = "(以iServer为例，这里是申请的token值)";
 *  var name = "token";
 *  // 默认name参数为token，所以当使用iServer服务的时候可以不进行设置。
 *  SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(value, name);
 *
 */

Credential.CREDENTIAL = null;
SuperMap.Credential = Credential;
// CONCATENATED MODULE: ./src/common/format/Format.js
function Format_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Format_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Format_createClass(Constructor, protoProps, staticProps) { if (protoProps) Format_defineProperties(Constructor.prototype, protoProps); if (staticProps) Format_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class SuperMap.Format
 * @classdesc 读写各种格式的格式类基类。其子类应该包含并实现 read 和 write 方法。
 * @category BaseTypes Format
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.keepData=false] - 如果设置为 true， data 属性会指向被解析的对象（例如 JSON 或 xml 数据对象）。
 * @param {Object} [options.data] - 当 keepData 属性设置为 true，这是传递给 read 操作的要被解析的字符串。
 */

var Format_Format =
/*#__PURE__*/
function () {
  function Format(options) {
    Format_classCallCheck(this, Format);

    /**
     * @member {Object} SuperMap.Format.prototype.data 
     * @description 当 keepData 属性设置为 true，这是传递给 read 操作的要被解析的字符串。
     */
    this.data = null;
    /**
     * APIProperty: keepData
     * @member {Object} [SuperMap.Format.prototype.keepData=false]
     * @description 保持最近读到的数据的引用（通过 <data> 属性）。
     */

    this.keepData = false;
    Util.extend(this, options);
    this.options = options;
    this.CLASS_NAME = "SuperMap.Format";
  }
  /**
   * @function SuperMap.Format.prototype.destroy
   * @description 销毁该格式类，释放相关资源。
   */


  Format_createClass(Format, [{
    key: "destroy",
    value: function destroy() {} //用来销毁该格式类，释放相关资源

    /**
     * @function SuperMap.Format.prototype.read
     * @description 来从字符串中读取数据。
     * @param {string} data - 读取的数据。
     */

  }, {
    key: "read",
    value: function read(data) {} // eslint-disable-line no-unused-vars
    //用来从字符串中读取数据

    /**
     * @function SuperMap.Format.prototype.write
     * @description 将对象写成字符串。
     * @param {Object} object - 可序列化的对象。
     * @returns {string} 对象被写成字符串。
     */

  }, {
    key: "write",
    value: function write(object) {// eslint-disable-line no-unused-vars
      //用来写字符串
    }
  }]);

  return Format;
}();
SuperMap.Format = SuperMap.Format || Format_Format;
// CONCATENATED MODULE: ./src/common/format/JSON.js
function JSON_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { JSON_typeof = function _typeof(obj) { return typeof obj; }; } else { JSON_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return JSON_typeof(obj); }

function JSON_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function JSON_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function JSON_createClass(Constructor, protoProps, staticProps) { if (protoProps) JSON_defineProperties(Constructor.prototype, protoProps); if (staticProps) JSON_defineProperties(Constructor, staticProps); return Constructor; }

function JSON_possibleConstructorReturn(self, call) { if (call && (JSON_typeof(call) === "object" || typeof call === "function")) { return call; } return JSON_assertThisInitialized(self); }

function JSON_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function JSON_getPrototypeOf(o) { JSON_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return JSON_getPrototypeOf(o); }

function JSON_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) JSON_setPrototypeOf(subClass, superClass); }

function JSON_setPrototypeOf(o, p) { JSON_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return JSON_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @class SuperMap.Format.JSON
 * @classdesc 安全的读写 JSON 的解析类。使用 {@link SuperMap.Format.JSON} 构造函数创建新实例。
 * @category BaseTypes Format
 * @param {Object} [options] - 参数。
 * @param {string} [options.indent="    "] - 用于格式化输出，indent 字符串会在每次缩进的时候使用一次。
 * @param {string} [options.space=" "] - 用于格式化输出，space 字符串会在名值对的 ":" 后边添加。
 * @param {string} [options.newline="\n"] - 用于格式化输出, newline 字符串会用在每一个名值对或数组项末尾。
 * @param {number} [options.level=0] - 用于格式化输出, 表示的是缩进级别。
 * @param {boolean} [options.pretty=false] - 是否在序列化的时候使用额外的空格控制结构。在 write 方法中使用。
 * @param {boolean} [options.nativeJSON] - 需要被注册的监听器对象。
 * @extends {SuperMap.Format}
 */

var JSONFormat =
/*#__PURE__*/
function (_Format) {
  JSON_inherits(JSONFormat, _Format);

  function JSONFormat(options) {
    var _this;

    JSON_classCallCheck(this, JSONFormat);

    _this = JSON_possibleConstructorReturn(this, JSON_getPrototypeOf(JSONFormat).call(this, options));
    /**
     * @member {string} [SuperMap.Format.JSON.prototype.indent="    "]
     * @description 用于格式化输出，indent 字符串会在每次缩进的时候使用一次。
     */

    _this.indent = "    ";
    /**
     * @member {string} [SuperMap.Format.JSON.prototype.space=" "]
     * @description 用于格式化输出，space 字符串会在名值对的 ":" 后边添加。
     */

    _this.space = " ";
    /**
     * @member {string} [SuperMap.Format.JSON.prototype.newline="\n"]
     * @description 用于格式化输出, newline 字符串会用在每一个名值对或数组项末尾。
     */

    _this.newline = "\n";
    /**
     * @member {integer} [SuperMap.Format.JSON.prototype.level=0] 
     * @description 用于格式化输出, 表示的是缩进级别。
     */

    _this.level = 0;
    /**
     * @member {boolean} [SuperMap.Format.JSON.prototype.pretty=false]
     * @description 是否在序列化的时候使用额外的空格控制结构。在 write 方法中使用。
     */

    _this.pretty = false;
    /**
     * @member {boolean} SuperMap.Format.JSON.prototype.nativeJSON 
     * @description 判断浏览器是否原生支持 JSON 格式数据。
     */

    _this.nativeJSON = function () {
      return !!(window.JSON && typeof JSON.parse === "function" && typeof JSON.stringify === "function");
    }();

    _this.CLASS_NAME = "SuperMap.Format.JSON";
    /**
     * @member SuperMap.Format.JSON.prototype.serialize
     * @description 提供一些类型对象转 JSON 字符串的方法。
     */

    _this.serialize = {
      /**
       * @function SuperMap.Format.JSON.serialize.object
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
       * @function SuperMap.Format.JSON.serialize.array
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
       * @function SuperMap.Format.JSON.serialize.string
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
       * @function SuperMap.Format.JSON.serialize.number
       * @description 把数字转换成 JSON 字符串。
       * @param {number} number - 可序列化的数字。
       * @returns {string} JSON 字符串。
       */
      'number': function number(_number) {
        return isFinite(_number) ? String(_number) : "null";
      },

      /**
       * @function SuperMap.Format.JSON.serialize.boolean
       * @description Transform a boolean into a JSON string.
       * @param {boolean} bool - The boolean to be serialized.
       * @returns {string} A JSON string representing the boolean.
       */
      'boolean': function boolean(bool) {
        return String(bool);
      },

      /**
       * @function SuperMap.Format.JSON.serialize.object
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
   * @function SuperMap.Format.JSON.prototype.read
   * @description 将一个符合 JSON 结构的字符串进行解析。
   * @param {string} json - 符合 JSON 结构的字符串。
   * @param {function} filter - 过滤方法，最终结果的每一个键值对都会调用该过滤方法，并在对应的值的位置替换成该方法返回的值。
   * @returns {Object} 对象，数组，字符串或数字。
   */


  JSON_createClass(JSONFormat, [{
    key: "read",
    value: function read(json, filter) {
      var object;

      if (this.nativeJSON) {
        try {
          object = JSON.parse(json, filter);
        } catch (e) {// Fall through if the regexp test fails.
        }
      }

      if (this.keepData) {
        this.data = object;
      }

      return object;
    }
    /**
     * @function SuperMap.Format.JSON.prototype.write
     * @description 序列化一个对象到一个符合 JSON 格式的字符串。
     * @param {(object|string|Array|number|boolean)} value - 需要被序列化的对象，数组，字符串，数字，布尔值。
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
        } catch (err) {//SuperMap.Console.error("Trouble serializing: " + err);
        }
      }

      return json;
    }
    /**
     * @function SuperMap.Format.JSON.prototype.writeIndent
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
     * @function SuperMap.Format.JSON.prototype.writeNewline
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
     * @function SuperMap.Format.JSON.prototype.writeSpace
     * @private
     * @description 在格式化输出模式情况下输出一个代表空格的字符串。
     * @returns {string} 一个空格。
     */

  }, {
    key: "writeSpace",
    value: function writeSpace() {
      return this.pretty ? this.space : '';
    }
  }]);

  return JSONFormat;
}(Format_Format);
SuperMap.Format.JSON = JSONFormat;
// CONCATENATED MODULE: ./src/common/iServer/CommonServiceBase.js
function CommonServiceBase_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CommonServiceBase_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CommonServiceBase_createClass(Constructor, protoProps, staticProps) { if (protoProps) CommonServiceBase_defineProperties(Constructor.prototype, protoProps); if (staticProps) CommonServiceBase_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/









/**
 * @class SuperMap.CommonServiceBase
 * @category  iServer
 * @classdesc 对接 iServer 各种服务的 Service 的基类。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var CommonServiceBase_CommonServiceBase =
/*#__PURE__*/
function () {
  function CommonServiceBase(url, options) {
    CommonServiceBase_classCallCheck(this, CommonServiceBase);

    var me = this;
    this.EVENT_TYPES = ["processCompleted", "processFailed"];
    this.events = null;
    this.eventListeners = null;
    this.url = null;
    this.urls = null;
    this.proxy = null;
    this.serverType = null;
    this.index = null;
    this.length = null;
    this.options = null;
    this.totalTimes = null;
    this.POLLING_TIMES = 3;
    this._processSuccess = null;
    this._processFailed = null;
    this.isInTheSameDomain = null;
    this.withCredentials = false;

    if (Util.isArray(url)) {
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

    if (Util.isArray(url) && !me.isServiceSupportPolling()) {
      me.url = url[0];
      me.totalTimes = 1;
    }

    me.serverType = me.serverType || ServerType.ISERVER;
    options = options || {};
    this.crossOrigin = options.crossOrigin;
    this.headers = options.headers;
    Util.extend(this, options);
    me.isInTheSameDomain = Util.isInTheSameDomain(me.url);
    me.events = new Events_Events(me, null, me.EVENT_TYPES, true);

    if (me.eventListeners instanceof Object) {
      me.events.on(me.eventListeners);
    }

    this.CLASS_NAME = "SuperMap.CommonServiceBase";
  }
  /**
   * @function SuperMap.CommonServiceBase.prototype.destroy
   * @description 释放资源，将引用的资源属性置空。
   */


  CommonServiceBase_createClass(CommonServiceBase, [{
    key: "destroy",
    value: function destroy() {
      var me = this;

      if (Util.isArray(me.urls)) {
        me.urls = null;
        me.index = null;
        me.length = null;
        me.totalTimes = null;
      }

      me.url = null;
      me.options = null;
      me._processSuccess = null;
      me._processFailed = null;
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
     * @function  SuperMap.CommonServiceBase.prototype.request
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
      var me = this;
      options.url = options.url || me.url;
      options.proxy = options.proxy || me.proxy;
      options.withCredentials = options.withCredentials != undefined ? options.withCredentials : me.withCredentials;
      options.crossOrigin = options.crossOrigin != undefined ? options.crossOrigin : me.crossOrigin;
      options.headers = options.headers || me.headers;
      options.isInTheSameDomain = me.isInTheSameDomain; //为url添加安全认证信息片段

      var credential = this.getCredential(options.url);

      if (credential) {
        options.url = Util.urlAppend(options.url, credential.getUrlParameters());
      }

      me.calculatePollingTimes();
      me._processSuccess = options.success;
      me._processFailed = options.failure;
      options.scope = me;
      options.success = me.getUrlCompleted;
      options.failure = me.getUrlFailed;
      me.options = options;

      me._commit(me.options);
    }
    /**
     * @function SuperMap.CommonServiceBase.prototype.getCredential
     * @description  获取凭据信息
     * @param {string} url - 服务地址。
     * @returns {SuperMap.Credential} 凭据信息对象。
     */

  }, {
    key: "getCredential",
    value: function getCredential(url) {
      var keyUrl = url,
          credential,
          value;

      switch (this.serverType) {
        case ServerType.IPORTAL:
          value = SecurityManager_SecurityManager.getToken(keyUrl);
          credential = value ? new Credential(value, "token") : null;

          if (!credential) {
            value = SecurityManager_SecurityManager.getKey(keyUrl);
            credential = value ? new Credential(value, "key") : null;
          }

          break;

        case ServerType.ONLINE:
          value = SecurityManager_SecurityManager.getKey(keyUrl);
          credential = value ? new Credential(value, "key") : null;
          break;

        default:
          //iServer or others
          value = SecurityManager_SecurityManager.getToken(keyUrl);
          credential = value ? new Credential(value, "token") : null;
          break;
      }

      return credential;
    }
    /**
     * @function SuperMap.CommonServiceBase.prototype.getUrlCompleted
     * @description 请求成功后执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */

  }, {
    key: "getUrlCompleted",
    value: function getUrlCompleted(result) {
      var me = this;

      me._processSuccess(result);
    }
    /**
     * @function SuperMap.CommonServiceBase.prototype.getUrlFailed
     * @description 请求失败后执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */

  }, {
    key: "getUrlFailed",
    value: function getUrlFailed(result) {
      var me = this;

      if (me.totalTimes > 0) {
        me.totalTimes--;
        me.ajaxPolling();
      } else {
        me._processFailed(result);
      }
    }
    /**
     *
     * @function SuperMap.CommonServiceBase.prototype.ajaxPolling
     * @description 请求失败后，如果剩余请求失败次数不为 0，重新获取 URL 发送请求
     */

  }, {
    key: "ajaxPolling",
    value: function ajaxPolling() {
      var me = this,
          url = me.options.url,
          re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/;
      me.index = parseInt(Math.random() * me.length);
      me.url = me.urls[me.index];
      url = url.replace(re, re.exec(me.url)[0]);
      me.options.url = url;
      me.options.isInTheSameDomain = Util.isInTheSameDomain(url);

      me._commit(me.options);
    }
    /**
     * @function SuperMap.CommonServiceBase.prototype.calculatePollingTimes
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
     * @function SuperMap.CommonServiceBase.prototype.isServiceSupportPolling
     * @description 判断服务是否支持轮询。
     */

  }, {
    key: "isServiceSupportPolling",
    value: function isServiceSupportPolling() {
      var me = this;
      return !(me.CLASS_NAME === "SuperMap.REST.ThemeService" || me.CLASS_NAME === "SuperMap.REST.EditFeaturesService");
    }
    /**
     * @function SuperMap.CommonServiceBase.prototype.serviceProcessCompleted
     * @description 状态完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */

  }, {
    key: "serviceProcessCompleted",
    value: function serviceProcessCompleted(result) {
      result = Util.transformResult(result);
      this.events.triggerEvent("processCompleted", {
        result: result
      });
    }
    /**
     * @function SuperMap.CommonServiceBase.prototype.serviceProcessFailed
     * @description 状态失败，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */

  }, {
    key: "serviceProcessFailed",
    value: function serviceProcessFailed(result) {
      result = Util.transformResult(result);
      var error = result.error || result;
      this.events.triggerEvent("processFailed", {
        error: error
      });
    }
  }, {
    key: "_commit",
    value: function _commit(options) {
      if (options.method === "POST" || options.method === "PUT") {
        if (options.params) {
          options.url = Util.urlAppend(options.url, Util.getParameterString(options.params || {}));
        }

        options.params = options.data;
      }

      FetchRequest.commit(options.method, options.url, options.params, {
        headers: options.headers,
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
        var result = text;

        if (typeof text === "string") {
          result = new JSONFormat().read(text);
        }

        if (!result || result.error || result.code >= 300 && result.code !== 304) {
          if (result && result.error) {
            result = {
              error: result.error
            };
          } else {
            result = {
              error: result
            };
          }
        }

        if (result.error) {
          var failure = options.scope ? FunctionExt.bind(options.failure, options.scope) : options.failure;
          failure(result);
        } else {
          result.succeed = result.succeed == undefined ? true : result.succeed;
          var success = options.scope ? FunctionExt.bind(options.success, options.scope) : options.success;
          success(result);
        }
      })["catch"](function (e) {
        var failure = options.scope ? FunctionExt.bind(options.failure, options.scope) : options.failure;
        failure(e);
      });
    }
  }]);

  return CommonServiceBase;
}();
SuperMap.CommonServiceBase = CommonServiceBase_CommonServiceBase;
/**
 * 服务器请求回调函数
 * @callback RequestCallback
 * @example
 * var requestCallback = function (serviceResult){
 *      console.log(serviceResult.result);
 * }
 * new QueryService(url).queryByBounds(param, requestCallback);
 * @param {Object} serviceResult
 * @param {Object} serviceResult.result 服务器返回结果。
 * @param {Object} serviceResult.object 发布应用程序事件的对象。
 * @param {Object} serviceResult.type 事件类型。
 * @param {Object} serviceResult.element 接受浏览器事件的 DOM 节点。
 */
// CONCATENATED MODULE: ./src/common/iServer/AddressMatchService.js
function AddressMatchService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { AddressMatchService_typeof = function _typeof(obj) { return typeof obj; }; } else { AddressMatchService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return AddressMatchService_typeof(obj); }

function AddressMatchService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AddressMatchService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AddressMatchService_createClass(Constructor, protoProps, staticProps) { if (protoProps) AddressMatchService_defineProperties(Constructor.prototype, protoProps); if (staticProps) AddressMatchService_defineProperties(Constructor, staticProps); return Constructor; }

function AddressMatchService_possibleConstructorReturn(self, call) { if (call && (AddressMatchService_typeof(call) === "object" || typeof call === "function")) { return call; } return AddressMatchService_assertThisInitialized(self); }

function AddressMatchService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function AddressMatchService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { AddressMatchService_get = Reflect.get; } else { AddressMatchService_get = function _get(target, property, receiver) { var base = AddressMatchService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return AddressMatchService_get(target, property, receiver || target); }

function AddressMatchService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = AddressMatchService_getPrototypeOf(object); if (object === null) break; } return object; }

function AddressMatchService_getPrototypeOf(o) { AddressMatchService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return AddressMatchService_getPrototypeOf(o); }

function AddressMatchService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) AddressMatchService_setPrototypeOf(subClass, superClass); }

function AddressMatchService_setPrototypeOf(o, p) { AddressMatchService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return AddressMatchService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.AddressMatchService
 * @category iServer AddressMatch
 * @classdesc 地址匹配服务，包括正向匹配和反向匹配。
 * @param {string} url - 地址匹配服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var AddressMatchService_AddressMatchService =
/*#__PURE__*/
function (_CommonServiceBase) {
  AddressMatchService_inherits(AddressMatchService, _CommonServiceBase);

  function AddressMatchService(url, options) {
    var _this;

    AddressMatchService_classCallCheck(this, AddressMatchService);

    _this = AddressMatchService_possibleConstructorReturn(this, AddressMatchService_getPrototypeOf(AddressMatchService).call(this, url, options));
    _this.options = options || {};
    _this.CLASS_NAME = 'SuperMap.AddressMatchService';
    return _this;
  }
  /**
   * @function SuperMap.AddressMatchService.prototype.destroy
   * @override
   */


  AddressMatchService_createClass(AddressMatchService, [{
    key: "destroy",
    value: function destroy() {
      AddressMatchService_get(AddressMatchService_getPrototypeOf(AddressMatchService.prototype), "destroy", this).call(this);
    }
    /**
     * @function SuperMap.AddressMatchService.prototype.code
     * @param {string} url - 正向地址匹配服务地址。
     * @param {SuperMap.GeoCodingParameter} params - 正向地址匹配服务参数。
     */

  }, {
    key: "code",
    value: function code(url, params) {
      if (!(params instanceof GeoCodingParameter_GeoCodingParameter)) {
        return;
      }

      this.processAsync(url, params);
    }
    /**
     * @function SuperMap.AddressMatchService.prototype.decode
     * @param {string} url - 反向地址匹配服务地址。
     * @param {SuperMap.GeoDecodingParameter} params - 反向地址匹配服务参数。
     */

  }, {
    key: "decode",
    value: function decode(url, params) {
      if (!(params instanceof GeoDecodingParameter_GeoDecodingParameter)) {
        return;
      }

      this.processAsync(url, params);
    }
    /**
     * @function SuperMap.AddressMatchService.prototype.processAsync
     * @description 负责将客户端的动态分段服务参数传递到服务端。
     * @param {string} url - 服务地址。
     * @param {Object} params - 参数。
     */

  }, {
    key: "processAsync",
    value: function processAsync(url, params) {
      this.request({
        method: 'GET',
        url: url,
        params: params,
        scope: this,
        success: this.serviceProcessCompleted,
        failure: this.serviceProcessFailed
      });
    }
    /**
     * @function SuperMap.AddressMatchService.prototype.serviceProcessCompleted
     * @param {Object} result - 服务器返回的结果对象。
     * @description 服务流程是否完成
     */

  }, {
    key: "serviceProcessCompleted",
    value: function serviceProcessCompleted(result) {
      if (result.succeed) {
        delete result.succeed;
      }

      AddressMatchService_get(AddressMatchService_getPrototypeOf(AddressMatchService.prototype), "serviceProcessCompleted", this).call(this, result);
    }
    /**
     * @function SuperMap.AddressMatchService.prototype.serviceProcessCompleted
     * @param {Object} result - 服务器返回的结果对象。
     * @description 服务流程是否失败
     */

  }, {
    key: "serviceProcessFailed",
    value: function serviceProcessFailed(result) {
      AddressMatchService_get(AddressMatchService_getPrototypeOf(AddressMatchService.prototype), "serviceProcessFailed", this).call(this, result);
    }
  }]);

  return AddressMatchService;
}(CommonServiceBase_CommonServiceBase);
SuperMap.AddressMatchService = AddressMatchService_AddressMatchService;
// CONCATENATED MODULE: ./src/classic/services/AddressMatchService.js
function services_AddressMatchService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { services_AddressMatchService_typeof = function _typeof(obj) { return typeof obj; }; } else { services_AddressMatchService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return services_AddressMatchService_typeof(obj); }

function services_AddressMatchService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function services_AddressMatchService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function services_AddressMatchService_createClass(Constructor, protoProps, staticProps) { if (protoProps) services_AddressMatchService_defineProperties(Constructor.prototype, protoProps); if (staticProps) services_AddressMatchService_defineProperties(Constructor, staticProps); return Constructor; }

function services_AddressMatchService_possibleConstructorReturn(self, call) { if (call && (services_AddressMatchService_typeof(call) === "object" || typeof call === "function")) { return call; } return services_AddressMatchService_assertThisInitialized(self); }

function services_AddressMatchService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function services_AddressMatchService_getPrototypeOf(o) { services_AddressMatchService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return services_AddressMatchService_getPrototypeOf(o); }

function services_AddressMatchService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) services_AddressMatchService_setPrototypeOf(subClass, superClass); }

function services_AddressMatchService_setPrototypeOf(o, p) { services_AddressMatchService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return services_AddressMatchService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @class SuperMap.REST.AddressMatchService
 * @category  iServer AddressMatch
 * @classdesc 地址匹配服务，包括正向匹配和反向匹配。
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var services_AddressMatchService_AddressMatchService =
/*#__PURE__*/
function (_CommonServiceBase) {
  services_AddressMatchService_inherits(AddressMatchService, _CommonServiceBase);

  function AddressMatchService(url, options) {
    var _this;

    services_AddressMatchService_classCallCheck(this, AddressMatchService);

    _this = services_AddressMatchService_possibleConstructorReturn(this, services_AddressMatchService_getPrototypeOf(AddressMatchService).call(this, url, options));
    _this.CLASS_NAME = "SuperMap.REST.AddressMatchService";
    return _this;
  }
  /**
   * @function SuperMap.REST.AddressMatchService.prototype.code
   * @description 正向匹配。
   * @param {SuperMap.GeoCodingParameter} params - 正向匹配参数。
   * @param {RequestCallback} callback - 回调函数。
   */


  services_AddressMatchService_createClass(AddressMatchService, [{
    key: "code",
    value: function code(params, callback) {
      var me = this;
      var addressMatchService = new AddressMatchService_AddressMatchService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        }
      });
      addressMatchService.code(me.url + '/geocoding', params);
    }
    /**
     * @function SuperMap.REST.AddressMatchService.prototype.decode
     * @description 反向匹配。
     * @param {SuperMap.GeoDecodingParameter} params - 反向匹配参数。
     * @param {RequestCallback} callback - 回调函数。
     */

  }, {
    key: "decode",
    value: function decode(params, callback) {
      var me = this;
      var addressMatchService = new AddressMatchService_AddressMatchService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        }
      });
      addressMatchService.decode(me.url + '/geodecoding', params);
    }
  }]);

  return AddressMatchService;
}(CommonServiceBase_CommonServiceBase);
SuperMap_SuperMap.REST.AddressMatchService = services_AddressMatchService_AddressMatchService;
// CONCATENATED MODULE: ./src/common/iServer/ProcessingServiceBase.js
function ProcessingServiceBase_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ProcessingServiceBase_typeof = function _typeof(obj) { return typeof obj; }; } else { ProcessingServiceBase_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ProcessingServiceBase_typeof(obj); }

function ProcessingServiceBase_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProcessingServiceBase_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProcessingServiceBase_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProcessingServiceBase_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProcessingServiceBase_defineProperties(Constructor, staticProps); return Constructor; }

function ProcessingServiceBase_possibleConstructorReturn(self, call) { if (call && (ProcessingServiceBase_typeof(call) === "object" || typeof call === "function")) { return call; } return ProcessingServiceBase_assertThisInitialized(self); }

function ProcessingServiceBase_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ProcessingServiceBase_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { ProcessingServiceBase_get = Reflect.get; } else { ProcessingServiceBase_get = function _get(target, property, receiver) { var base = ProcessingServiceBase_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return ProcessingServiceBase_get(target, property, receiver || target); }

function ProcessingServiceBase_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = ProcessingServiceBase_getPrototypeOf(object); if (object === null) break; } return object; }

function ProcessingServiceBase_getPrototypeOf(o) { ProcessingServiceBase_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ProcessingServiceBase_getPrototypeOf(o); }

function ProcessingServiceBase_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ProcessingServiceBase_setPrototypeOf(subClass, superClass); }

function ProcessingServiceBase_setPrototypeOf(o, p) { ProcessingServiceBase_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ProcessingServiceBase_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.ProcessingServiceBase
 * @category  iServer ProcessingService
 * @classdesc 分布式分析服务基类
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 分布式分析服务地址。
 * @param {Object} options - 参数。
 * @param {SuperMap.Events} options.events - 处理所有事件的对象。
 * @param {number} options.index - 服务访问地址在数组中的位置。
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。
 * @param {Object} [options.eventListeners] - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var ProcessingServiceBase_ProcessingServiceBase =
/*#__PURE__*/
function (_CommonServiceBase) {
  ProcessingServiceBase_inherits(ProcessingServiceBase, _CommonServiceBase);

  function ProcessingServiceBase(url, options) {
    var _this;

    ProcessingServiceBase_classCallCheck(this, ProcessingServiceBase);

    options = options || {};
    /*
     * Constant: EVENT_TYPES
     * {Array.<string>}
     * 此类支持的事件类型
     * - *processCompleted* 创建成功后触发的事件。
     * - *processFailed* 创建失败后触发的事件 。
     * - *processRunning* 创建过程的整个阶段都会触发的事件，用于获取创建过程的状态 。
     */

    options.EVENT_TYPES = ["processCompleted", "processFailed", "processRunning"];
    _this = ProcessingServiceBase_possibleConstructorReturn(this, ProcessingServiceBase_getPrototypeOf(ProcessingServiceBase).call(this, url, options));
    _this.CLASS_NAME = "SuperMap.ProcessingServiceBase";
    return _this;
  }
  /**
   * @function SuperMap.ProcessingServiceBase.prototype.destroy
   * @override
   */


  ProcessingServiceBase_createClass(ProcessingServiceBase, [{
    key: "destroy",
    value: function destroy() {
      ProcessingServiceBase_get(ProcessingServiceBase_getPrototypeOf(ProcessingServiceBase.prototype), "destroy", this).call(this);
    }
    /**
     * @function SuperMap.ProcessingServiceBase.prototype.getJobs
     * @description 获取分布式分析任务。
     * @param {string} url - 资源地址。
     */

  }, {
    key: "getJobs",
    value: function getJobs(url) {
      var me = this;
      FetchRequest.get(me._processUrl(url), null, {
        proxy: me.proxy
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        me.events.triggerEvent("processCompleted", {
          result: result
        });
      })["catch"](function (e) {
        me.eventListeners.processFailed({
          error: e
        });
      });
    }
    /**
     * @function SuperMap.ProcessingServiceBase.prototype.addJob
     * @description 添加分布式分析任务。
     * @param {string} url - 资源根地址。
     * @param {Object} params - 创建一个空间分析的请求参数。
     * @param {string} paramType - 请求参数类型。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addJob",
    value: function addJob(url, params, paramType, seconds) {
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
      FetchRequest.post(me._processUrl(url), JSON.stringify(parameterObject), options).then(function (response) {
        return response.json();
      }).then(function (result) {
        if (result.succeed) {
          me.serviceProcessCompleted(result, seconds);
        } else {
          me.serviceProcessFailed(result);
        }
      })["catch"](function (e) {
        me.serviceProcessFailed({
          error: e
        });
      });
    }
  }, {
    key: "serviceProcessCompleted",
    value: function serviceProcessCompleted(result, seconds) {
      result = Util.transformResult(result);
      seconds = seconds || 1000;
      var me = this;

      if (result) {
        var id = setInterval(function () {
          FetchRequest.get(me._processUrl(result.newResourceLocation), {
            _t: new Date().getTime()
          }).then(function (response) {
            return response.json();
          }).then(function (job) {
            me.events.triggerEvent("processRunning", {
              id: job.id,
              state: job.state
            });

            if (job.state.runState === 'LOST' || job.state.runState === 'KILLED' || job.state.runState === 'FAILED') {
              clearInterval(id);
              me.events.triggerEvent("processFailed", {
                error: job.state.errorMsg,
                state: job.state.runState
              });
            }

            if (job.state.runState === 'FINISHED' && job.setting.serviceInfo) {
              clearInterval(id);
              me.events.triggerEvent("processCompleted", {
                result: job
              });
            }
          })["catch"](function (e) {
            clearInterval(id);
            me.events.triggerEvent("processFailed", {
              error: e
            });
          });
        }, seconds);
      }
    }
  }, {
    key: "serviceProcessFailed",
    value: function serviceProcessFailed(result) {
      ProcessingServiceBase_get(ProcessingServiceBase_getPrototypeOf(ProcessingServiceBase.prototype), "serviceProcessFailed", this).call(this, result);
    }
  }, {
    key: "_processUrl",
    value: function _processUrl(url) {
      if (SecurityManager_SecurityManager.getToken(url)) {
        url = Util.urlAppend(url, 'token=' + SecurityManager_SecurityManager.getToken(url));
      }

      return url;
    }
  }]);

  return ProcessingServiceBase;
}(CommonServiceBase_CommonServiceBase);
SuperMap.ProcessingServiceBase = ProcessingServiceBase_ProcessingServiceBase;
// CONCATENATED MODULE: ./src/common/iServer/KernelDensityJobsService.js
function KernelDensityJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { KernelDensityJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { KernelDensityJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return KernelDensityJobsService_typeof(obj); }

function KernelDensityJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function KernelDensityJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function KernelDensityJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) KernelDensityJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) KernelDensityJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function KernelDensityJobsService_possibleConstructorReturn(self, call) { if (call && (KernelDensityJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return KernelDensityJobsService_assertThisInitialized(self); }

function KernelDensityJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function KernelDensityJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { KernelDensityJobsService_get = Reflect.get; } else { KernelDensityJobsService_get = function _get(target, property, receiver) { var base = KernelDensityJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return KernelDensityJobsService_get(target, property, receiver || target); }

function KernelDensityJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = KernelDensityJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function KernelDensityJobsService_getPrototypeOf(o) { KernelDensityJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return KernelDensityJobsService_getPrototypeOf(o); }

function KernelDensityJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) KernelDensityJobsService_setPrototypeOf(subClass, superClass); }

function KernelDensityJobsService_setPrototypeOf(o, p) { KernelDensityJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return KernelDensityJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.KernelDensityJobsService
 * @category  iServer ProcessingService DensityAnalyst
 * @classdesc 核密度分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url -核密度分析服务地址。
 * @param {Object} options - 交互服务时所需可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var KernelDensityJobsService_KernelDensityJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  KernelDensityJobsService_inherits(KernelDensityJobsService, _ProcessingServiceBas);

  function KernelDensityJobsService(url, options) {
    var _this;

    KernelDensityJobsService_classCallCheck(this, KernelDensityJobsService);

    _this = KernelDensityJobsService_possibleConstructorReturn(this, KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/density');
    _this.CLASS_NAME = "SuperMap.KernelDensityJobsService";
    return _this;
  }
  /**
   * @function SuperMap.KernelDensityJobsService.prototype.destroy
   * @override
   */


  KernelDensityJobsService_createClass(KernelDensityJobsService, [{
    key: "destroy",
    value: function destroy() {
      KernelDensityJobsService_get(KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService.prototype), "destroy", this).call(this);
    }
    /**
     * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取核密度分析任务
     */

  }, {
    key: "getKernelDensityJobs",
    value: function getKernelDensityJobs() {
      KernelDensityJobsService_get(KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取指定id的核密度分析服务
     * @param {string} id - 指定要获取数据的id
     */

  }, {
    key: "getKernelDensityJob",
    value: function getKernelDensityJob(id) {
      KernelDensityJobsService_get(KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.KernelDensityJobsService.prototype.addKernelDensityJob
     * @description 新建核密度分析服务
     * @param {SuperMap.KernelDensityJobParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addKernelDensityJob",
    value: function addKernelDensityJob(params, seconds) {
      KernelDensityJobsService_get(KernelDensityJobsService_getPrototypeOf(KernelDensityJobsService.prototype), "addJob", this).call(this, this.url, params, KernelDensityJobParameter_KernelDensityJobParameter, seconds);
    }
  }]);

  return KernelDensityJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.KernelDensityJobsService = KernelDensityJobsService_KernelDensityJobsService;
// CONCATENATED MODULE: ./src/common/iServer/SingleObjectQueryJobsService.js
function SingleObjectQueryJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SingleObjectQueryJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { SingleObjectQueryJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SingleObjectQueryJobsService_typeof(obj); }

function SingleObjectQueryJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SingleObjectQueryJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SingleObjectQueryJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) SingleObjectQueryJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) SingleObjectQueryJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function SingleObjectQueryJobsService_possibleConstructorReturn(self, call) { if (call && (SingleObjectQueryJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return SingleObjectQueryJobsService_assertThisInitialized(self); }

function SingleObjectQueryJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SingleObjectQueryJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { SingleObjectQueryJobsService_get = Reflect.get; } else { SingleObjectQueryJobsService_get = function _get(target, property, receiver) { var base = SingleObjectQueryJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return SingleObjectQueryJobsService_get(target, property, receiver || target); }

function SingleObjectQueryJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SingleObjectQueryJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function SingleObjectQueryJobsService_getPrototypeOf(o) { SingleObjectQueryJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SingleObjectQueryJobsService_getPrototypeOf(o); }

function SingleObjectQueryJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SingleObjectQueryJobsService_setPrototypeOf(subClass, superClass); }

function SingleObjectQueryJobsService_setPrototypeOf(o, p) { SingleObjectQueryJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SingleObjectQueryJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.SingleObjectQueryJobsService
 * @category  iServer ProcessingService Query
 * @classdesc 单对象查询分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url - 单对象空间查询分析服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var SingleObjectQueryJobsService_SingleObjectQueryJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  SingleObjectQueryJobsService_inherits(SingleObjectQueryJobsService, _ProcessingServiceBas);

  function SingleObjectQueryJobsService(url, options) {
    var _this;

    SingleObjectQueryJobsService_classCallCheck(this, SingleObjectQueryJobsService);

    _this = SingleObjectQueryJobsService_possibleConstructorReturn(this, SingleObjectQueryJobsService_getPrototypeOf(SingleObjectQueryJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/query');
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
     * @function SuperMap.SingleObjectQueryJobsService.protitype.getQueryJobs
     * @description 获取单对象空间查询分析所有任务
     */

  }, {
    key: "getQueryJobs",
    value: function getQueryJobs() {
      SingleObjectQueryJobsService_get(SingleObjectQueryJobsService_getPrototypeOf(SingleObjectQueryJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getQueryJob
     * @description 获取指定id的单对象空间查询分析服务
     * @param {string} id - 指定要获取数据的id
     */

  }, {
    key: "getQueryJob",
    value: function getQueryJob(id) {
      SingleObjectQueryJobsService_get(SingleObjectQueryJobsService_getPrototypeOf(SingleObjectQueryJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.addQueryJob
     * @description 新建单对象空间查询分析服务
     * @param {SuperMap.SingleObjectQueryJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addQueryJob",
    value: function addQueryJob(params, seconds) {
      SingleObjectQueryJobsService_get(SingleObjectQueryJobsService_getPrototypeOf(SingleObjectQueryJobsService.prototype), "addJob", this).call(this, this.url, params, SingleObjectQueryJobsParameter_SingleObjectQueryJobsParameter, seconds);
    }
  }]);

  return SingleObjectQueryJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.SingleObjectQueryJobsService = SingleObjectQueryJobsService_SingleObjectQueryJobsService;
// CONCATENATED MODULE: ./src/common/iServer/SummaryMeshJobsService.js
function SummaryMeshJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SummaryMeshJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { SummaryMeshJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SummaryMeshJobsService_typeof(obj); }

function SummaryMeshJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SummaryMeshJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SummaryMeshJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryMeshJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryMeshJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function SummaryMeshJobsService_possibleConstructorReturn(self, call) { if (call && (SummaryMeshJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return SummaryMeshJobsService_assertThisInitialized(self); }

function SummaryMeshJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SummaryMeshJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { SummaryMeshJobsService_get = Reflect.get; } else { SummaryMeshJobsService_get = function _get(target, property, receiver) { var base = SummaryMeshJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return SummaryMeshJobsService_get(target, property, receiver || target); }

function SummaryMeshJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SummaryMeshJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function SummaryMeshJobsService_getPrototypeOf(o) { SummaryMeshJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SummaryMeshJobsService_getPrototypeOf(o); }

function SummaryMeshJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SummaryMeshJobsService_setPrototypeOf(subClass, superClass); }

function SummaryMeshJobsService_setPrototypeOf(o, p) { SummaryMeshJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SummaryMeshJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.SummaryMeshJobsService
 * @category  iServer ProcessingService AggregatePoints
 * @classdesc 点聚合分析任务类。
 * @param {string} url -点聚合分析任务地址。
 * @param {Object} options - 参数。
 * @param {SuperMap.Events} options.events - 处理所有事件的对象。<br>
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。
 * @param {Object} [options.eventListeners] - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {number} options.index - 服务访问地址在数组中的位置。<br>
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var SummaryMeshJobsService_SummaryMeshJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  SummaryMeshJobsService_inherits(SummaryMeshJobsService, _ProcessingServiceBas);

  function SummaryMeshJobsService(url, options) {
    var _this;

    SummaryMeshJobsService_classCallCheck(this, SummaryMeshJobsService);

    _this = SummaryMeshJobsService_possibleConstructorReturn(this, SummaryMeshJobsService_getPrototypeOf(SummaryMeshJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/aggregatepoints');
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
     * @function SuperMap.SummaryMeshJobsService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析任务
     */

  }, {
    key: "getSummaryMeshJobs",
    value: function getSummaryMeshJobs() {
      SummaryMeshJobsService_get(SummaryMeshJobsService_getPrototypeOf(SummaryMeshJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.SummaryMeshJobsService.prototype.getSummaryMeshJob
     * @description 获取指定ip的点聚合分析任务
     * @param {string} id - 指定要获取数据的id
     */

  }, {
    key: "getSummaryMeshJob",
    value: function getSummaryMeshJob(id) {
      SummaryMeshJobsService_get(SummaryMeshJobsService_getPrototypeOf(SummaryMeshJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.SummaryMeshJobsService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析服务
     * @param {SuperMap.SummaryMeshJobParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addSummaryMeshJob",
    value: function addSummaryMeshJob(params, seconds) {
      SummaryMeshJobsService_get(SummaryMeshJobsService_getPrototypeOf(SummaryMeshJobsService.prototype), "addJob", this).call(this, this.url, params, SummaryMeshJobParameter_SummaryMeshJobParameter, seconds);
    }
  }]);

  return SummaryMeshJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.SummaryMeshJobsService = SummaryMeshJobsService_SummaryMeshJobsService;
// CONCATENATED MODULE: ./src/common/iServer/SummaryRegionJobsService.js
function SummaryRegionJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SummaryRegionJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { SummaryRegionJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SummaryRegionJobsService_typeof(obj); }

function SummaryRegionJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SummaryRegionJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SummaryRegionJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryRegionJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryRegionJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function SummaryRegionJobsService_possibleConstructorReturn(self, call) { if (call && (SummaryRegionJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return SummaryRegionJobsService_assertThisInitialized(self); }

function SummaryRegionJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SummaryRegionJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { SummaryRegionJobsService_get = Reflect.get; } else { SummaryRegionJobsService_get = function _get(target, property, receiver) { var base = SummaryRegionJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return SummaryRegionJobsService_get(target, property, receiver || target); }

function SummaryRegionJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SummaryRegionJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function SummaryRegionJobsService_getPrototypeOf(o) { SummaryRegionJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SummaryRegionJobsService_getPrototypeOf(o); }

function SummaryRegionJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SummaryRegionJobsService_setPrototypeOf(subClass, superClass); }

function SummaryRegionJobsService_setPrototypeOf(o, p) { SummaryRegionJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SummaryRegionJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.SummaryRegionJobsService
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url - 区域汇总分析服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var SummaryRegionJobsService_SummaryRegionJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  SummaryRegionJobsService_inherits(SummaryRegionJobsService, _ProcessingServiceBas);

  function SummaryRegionJobsService(url, options) {
    var _this;

    SummaryRegionJobsService_classCallCheck(this, SummaryRegionJobsService);

    _this = SummaryRegionJobsService_possibleConstructorReturn(this, SummaryRegionJobsService_getPrototypeOf(SummaryRegionJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/summaryregion');
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
     * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析任务集合。
     */

  }, {
    key: "getSummaryRegionJobs",
    value: function getSummaryRegionJobs() {
      SummaryRegionJobsService_get(SummaryRegionJobsService_getPrototypeOf(SummaryRegionJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJob
     * @description 获取指定id的区域汇总分析任务。
     * @param {string} id -要获取区域汇总分析任务的id
     */

  }, {
    key: "getSummaryRegionJob",
    value: function getSummaryRegionJob(id) {
      SummaryRegionJobsService_get(SummaryRegionJobsService_getPrototypeOf(SummaryRegionJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.SummaryRegionJobsService.prototype.addSummaryRegionJob
     * @description 新建区域汇总任务。
     * @param {SuperMap.SummaryRegionJobParameter} params - 创建一个区域汇总任务的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addSummaryRegionJob",
    value: function addSummaryRegionJob(params, seconds) {
      SummaryRegionJobsService_get(SummaryRegionJobsService_getPrototypeOf(SummaryRegionJobsService.prototype), "addJob", this).call(this, this.url, params, SummaryRegionJobParameter_SummaryRegionJobParameter, seconds);
    }
  }]);

  return SummaryRegionJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.SummaryRegionJobsService = SummaryRegionJobsService_SummaryRegionJobsService;
// CONCATENATED MODULE: ./src/common/iServer/VectorClipJobsParameter.js
function VectorClipJobsParameter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function VectorClipJobsParameter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function VectorClipJobsParameter_createClass(Constructor, protoProps, staticProps) { if (protoProps) VectorClipJobsParameter_defineProperties(Constructor.prototype, protoProps); if (staticProps) VectorClipJobsParameter_defineProperties(Constructor, staticProps); return Constructor; }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @class SuperMap.VectorClipJobsParameter
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析任务参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasetName - 数据集名。 
 * @param {string} options.datasetOverlay - 裁剪对象数据集。 
 * @param {SuperMap.ClipAnalystMode} [options.mode=SuperMap.ClipAnalystMode.CLIP] - 裁剪分析模式。 
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。 
 * @param {SuperMap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */

var VectorClipJobsParameter_VectorClipJobsParameter =
/*#__PURE__*/
function () {
  function VectorClipJobsParameter(options) {
    VectorClipJobsParameter_classCallCheck(this, VectorClipJobsParameter);

    options = options || {};
    /**
     * @member {string} SuperMap.VectorClipJobsParameter.prototype.datasetName
     * @description 数据集名。
     */

    this.datasetName = "";
    /**
     * @member {string} SuperMap.VectorClipJobsParameter.prototype.datasetOverlay
     * @description 裁剪对象数据集。
     */

    this.datasetVectorClip = "";
    /**
     * @member {string} SuperMap.VectorClipJobsParameter.prototype.geometryClip
     * @description 裁剪几何对象。
     */

    this.geometryClip = "";
    /**
     * @member {SuperMap.ClipAnalystMode} [SuperMap.VectorClipJobsParameter.prototype.mode=ClipAnalystMode.CLIP]
     * @description 裁剪分析模式 。
     */

    this.mode = ClipAnalystMode.CLIP;
    /**
     * @member {SuperMap.OutputSetting} SuperMap.VectorClipJobsParameter.prototype.output
     * @description 输出参数设置类。
     */

    this.output = null;
    /**
     * @member {SuperMap.MappingParameters} [SuperMap.VectorClipJobsParameter.prototype.mappingParameters]
     * @description 分析后结果可视化的参数类。   
     */

    this.mappingParameters = null;
    Util.extend(this, options);
    this.CLASS_NAME = "SuperMap.VectorClipJobsParameter";
  }
  /**
   * @function SuperMap.VectorClipJobsParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */


  VectorClipJobsParameter_createClass(VectorClipJobsParameter, [{
    key: "destroy",
    value: function destroy() {
      this.datasetName = null;
      this.datasetVectorClip = null;
      this.geometryClip = null;
      this.mode = null;

      if (this.output instanceof OutputSetting_OutputSetting) {
        this.output.destroy();
        this.output = null;
      }

      if (this.mappingParameters instanceof MappingParameters_MappingParameters) {
        this.mappingParameters.destroy();
        this.mappingParameters = null;
      }
    }
    /**
     * @function SuperMap.VectorClipJobsParameter.toObject
     * @param {Object} vectorClipJobsParameter - 区域汇总分析服务参数。
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
SuperMap.VectorClipJobsParameter = VectorClipJobsParameter_VectorClipJobsParameter;
// CONCATENATED MODULE: ./src/common/iServer/VectorClipJobsService.js
function VectorClipJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { VectorClipJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { VectorClipJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return VectorClipJobsService_typeof(obj); }

function VectorClipJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function VectorClipJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function VectorClipJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) VectorClipJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) VectorClipJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function VectorClipJobsService_possibleConstructorReturn(self, call) { if (call && (VectorClipJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return VectorClipJobsService_assertThisInitialized(self); }

function VectorClipJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function VectorClipJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { VectorClipJobsService_get = Reflect.get; } else { VectorClipJobsService_get = function _get(target, property, receiver) { var base = VectorClipJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return VectorClipJobsService_get(target, property, receiver || target); }

function VectorClipJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = VectorClipJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function VectorClipJobsService_getPrototypeOf(o) { VectorClipJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return VectorClipJobsService_getPrototypeOf(o); }

function VectorClipJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) VectorClipJobsService_setPrototypeOf(subClass, superClass); }

function VectorClipJobsService_setPrototypeOf(o, p) { VectorClipJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return VectorClipJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.VectorClipJobsService
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url -矢量裁剪分析服务地址。
 * @param {Object} options - 交互服务时所需可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var VectorClipJobsService_VectorClipJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  VectorClipJobsService_inherits(VectorClipJobsService, _ProcessingServiceBas);

  function VectorClipJobsService(url, options) {
    var _this;

    VectorClipJobsService_classCallCheck(this, VectorClipJobsService);

    _this = VectorClipJobsService_possibleConstructorReturn(this, VectorClipJobsService_getPrototypeOf(VectorClipJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/vectorclip');
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
     * @function SuperMap.VectorClipJobsService.protitype.getVectorClipJobs
     * @description 获取矢量裁剪分析所有任务
     */

  }, {
    key: "getVectorClipJobs",
    value: function getVectorClipJobs() {
      VectorClipJobsService_get(VectorClipJobsService_getPrototypeOf(VectorClipJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getVectorClipJob
     * @description 获取指定id的矢量裁剪分析服务
     * @param {string} id - 指定要获取数据的id
     */

  }, {
    key: "getVectorClipJob",
    value: function getVectorClipJob(id) {
      VectorClipJobsService_get(VectorClipJobsService_getPrototypeOf(VectorClipJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.VectorClipJobsService.protitype.addVectorClipJob
     * @description 新建矢量裁剪分析服务
     * @param {SuperMap.VectorClipJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addVectorClipJob",
    value: function addVectorClipJob(params, seconds) {
      VectorClipJobsService_get(VectorClipJobsService_getPrototypeOf(VectorClipJobsService.prototype), "addJob", this).call(this, this.url, params, VectorClipJobsParameter_VectorClipJobsParameter, seconds);
    }
  }]);

  return VectorClipJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.VectorClipJobsService = VectorClipJobsService_VectorClipJobsService;
// CONCATENATED MODULE: ./src/common/iServer/OverlayGeoJobsService.js
function OverlayGeoJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { OverlayGeoJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { OverlayGeoJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return OverlayGeoJobsService_typeof(obj); }

function OverlayGeoJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function OverlayGeoJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function OverlayGeoJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) OverlayGeoJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) OverlayGeoJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function OverlayGeoJobsService_possibleConstructorReturn(self, call) { if (call && (OverlayGeoJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return OverlayGeoJobsService_assertThisInitialized(self); }

function OverlayGeoJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function OverlayGeoJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { OverlayGeoJobsService_get = Reflect.get; } else { OverlayGeoJobsService_get = function _get(target, property, receiver) { var base = OverlayGeoJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return OverlayGeoJobsService_get(target, property, receiver || target); }

function OverlayGeoJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = OverlayGeoJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function OverlayGeoJobsService_getPrototypeOf(o) { OverlayGeoJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return OverlayGeoJobsService_getPrototypeOf(o); }

function OverlayGeoJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) OverlayGeoJobsService_setPrototypeOf(subClass, superClass); }

function OverlayGeoJobsService_setPrototypeOf(o, p) { OverlayGeoJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return OverlayGeoJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.OverlayGeoJobsService
 * @category iServer ProcessingService OverlayAnalyst
 * @classdesc 叠加分析任务类。
 * @param {string} url - 叠加分析任务地址。
 * @param {Object} options - 参数。
 * @param {SuperMap.Events} options.events - 处理所有事件的对象。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。
 * @param {Object} [options.eventListeners] - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {number} options.index - 服务访问地址在数组中的位置。
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var OverlayGeoJobsService_OverlayGeoJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  OverlayGeoJobsService_inherits(OverlayGeoJobsService, _ProcessingServiceBas);

  function OverlayGeoJobsService(url, options) {
    var _this;

    OverlayGeoJobsService_classCallCheck(this, OverlayGeoJobsService);

    _this = OverlayGeoJobsService_possibleConstructorReturn(this, OverlayGeoJobsService_getPrototypeOf(OverlayGeoJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/overlay');
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
     * @function SuperMap.OverlayGeoJobsService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析任务
     */

  }, {
    key: "getOverlayGeoJobs",
    value: function getOverlayGeoJobs() {
      OverlayGeoJobsService_get(OverlayGeoJobsService_getPrototypeOf(OverlayGeoJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.OverlayGeoJobsService.prototype.getOverlayGeoJob
     * @description 获取指定id的叠加分析任务
     * @param {string} id - 指定要获取数据的id
     */

  }, {
    key: "getOverlayGeoJob",
    value: function getOverlayGeoJob(id) {
      OverlayGeoJobsService_get(OverlayGeoJobsService_getPrototypeOf(OverlayGeoJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.OverlayGeoJobsService.prototype.addOverlayGeoJob
     * @description 新建点叠加析服务
     * @param {SuperMap.OverlayGeoJobParameter} params - 创建一个叠加分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addOverlayGeoJob",
    value: function addOverlayGeoJob(params, seconds) {
      OverlayGeoJobsService_get(OverlayGeoJobsService_getPrototypeOf(OverlayGeoJobsService.prototype), "addJob", this).call(this, this.url, params, OverlayGeoJobParameter_OverlayGeoJobParameter, seconds);
    }
  }]);

  return OverlayGeoJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.OverlayGeoJobsService = OverlayGeoJobsService_OverlayGeoJobsService;
// CONCATENATED MODULE: ./src/common/iServer/BuffersAnalystJobsService.js
function BuffersAnalystJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { BuffersAnalystJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { BuffersAnalystJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return BuffersAnalystJobsService_typeof(obj); }

function BuffersAnalystJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BuffersAnalystJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function BuffersAnalystJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) BuffersAnalystJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) BuffersAnalystJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function BuffersAnalystJobsService_possibleConstructorReturn(self, call) { if (call && (BuffersAnalystJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return BuffersAnalystJobsService_assertThisInitialized(self); }

function BuffersAnalystJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function BuffersAnalystJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { BuffersAnalystJobsService_get = Reflect.get; } else { BuffersAnalystJobsService_get = function _get(target, property, receiver) { var base = BuffersAnalystJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return BuffersAnalystJobsService_get(target, property, receiver || target); }

function BuffersAnalystJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = BuffersAnalystJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function BuffersAnalystJobsService_getPrototypeOf(o) { BuffersAnalystJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return BuffersAnalystJobsService_getPrototypeOf(o); }

function BuffersAnalystJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) BuffersAnalystJobsService_setPrototypeOf(subClass, superClass); }

function BuffersAnalystJobsService_setPrototypeOf(o, p) { BuffersAnalystJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return BuffersAnalystJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.BuffersAnalystJobsService
 * @category iServer ProcessingService BufferAnalyst
 * @classdesc 缓冲区分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var BuffersAnalystJobsService_BuffersAnalystJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  BuffersAnalystJobsService_inherits(BuffersAnalystJobsService, _ProcessingServiceBas);

  function BuffersAnalystJobsService(url, options) {
    var _this;

    BuffersAnalystJobsService_classCallCheck(this, BuffersAnalystJobsService);

    _this = BuffersAnalystJobsService_possibleConstructorReturn(this, BuffersAnalystJobsService_getPrototypeOf(BuffersAnalystJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/buffers');
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
     * @function SuperMap.BuffersAnalystJobsService.prototype.getBufferJobs
     * @description 获取缓冲区分析所有任务
     */

  }, {
    key: "getBuffersJobs",
    value: function getBuffersJobs() {
      BuffersAnalystJobsService_get(BuffersAnalystJobsService_getPrototypeOf(BuffersAnalystJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.BuffersAnalystJobsService.prototype.getBufferJob
     * @description 获取指定id的缓冲区分析服务
     * @param {string} id - 指定要获取数据的id。
     */

  }, {
    key: "getBuffersJob",
    value: function getBuffersJob(id) {
      BuffersAnalystJobsService_get(BuffersAnalystJobsService_getPrototypeOf(BuffersAnalystJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.BuffersAnalystJobsService.prototype.addBufferJob
     * @description 新建缓冲区分析服务
     * @param {SuperMap.BuffersAnalystJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addBuffersJob",
    value: function addBuffersJob(params, seconds) {
      BuffersAnalystJobsService_get(BuffersAnalystJobsService_getPrototypeOf(BuffersAnalystJobsService.prototype), "addJob", this).call(this, this.url, params, BuffersAnalystJobsParameter_BuffersAnalystJobsParameter, seconds);
    }
  }]);

  return BuffersAnalystJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.BuffersAnalystJobsService = BuffersAnalystJobsService_BuffersAnalystJobsService;
// CONCATENATED MODULE: ./src/common/iServer/TopologyValidatorJobsService.js
function TopologyValidatorJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TopologyValidatorJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { TopologyValidatorJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TopologyValidatorJobsService_typeof(obj); }

function TopologyValidatorJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TopologyValidatorJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TopologyValidatorJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) TopologyValidatorJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) TopologyValidatorJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function TopologyValidatorJobsService_possibleConstructorReturn(self, call) { if (call && (TopologyValidatorJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return TopologyValidatorJobsService_assertThisInitialized(self); }

function TopologyValidatorJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TopologyValidatorJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { TopologyValidatorJobsService_get = Reflect.get; } else { TopologyValidatorJobsService_get = function _get(target, property, receiver) { var base = TopologyValidatorJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return TopologyValidatorJobsService_get(target, property, receiver || target); }

function TopologyValidatorJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = TopologyValidatorJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function TopologyValidatorJobsService_getPrototypeOf(o) { TopologyValidatorJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TopologyValidatorJobsService_getPrototypeOf(o); }

function TopologyValidatorJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TopologyValidatorJobsService_setPrototypeOf(subClass, superClass); }

function TopologyValidatorJobsService_setPrototypeOf(o, p) { TopologyValidatorJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TopologyValidatorJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.TopologyValidatorJobsService
 * @category  iServer ProcessingService TopologyValidator
 * @classdesc 拓扑检查分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url - 拓扑检查分析服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var TopologyValidatorJobsService_TopologyValidatorJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  TopologyValidatorJobsService_inherits(TopologyValidatorJobsService, _ProcessingServiceBas);

  function TopologyValidatorJobsService(url, options) {
    var _this;

    TopologyValidatorJobsService_classCallCheck(this, TopologyValidatorJobsService);

    _this = TopologyValidatorJobsService_possibleConstructorReturn(this, TopologyValidatorJobsService_getPrototypeOf(TopologyValidatorJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/topologyvalidator');
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
     * @function SuperMap.TopologyValidatorJobsService.protitype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析所有任务
     */

  }, {
    key: "getTopologyValidatorJobs",
    value: function getTopologyValidatorJobs() {
      TopologyValidatorJobsService_get(TopologyValidatorJobsService_getPrototypeOf(TopologyValidatorJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.TopologyValidatorJobsService.protitype.getTopologyValidatorJob
     * @description 获取指定id的拓扑检查分析服务
     * @param {string} id - 指定要获取数据的id
     */

  }, {
    key: "getTopologyValidatorJob",
    value: function getTopologyValidatorJob(id) {
      TopologyValidatorJobsService_get(TopologyValidatorJobsService_getPrototypeOf(TopologyValidatorJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.TopologyValidatorJobsService.protitype.addTopologyValidatorJob
     * @description 新建拓扑检查分析服务
     * @param {SuperMap.TopologyValidatorJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addTopologyValidatorJob",
    value: function addTopologyValidatorJob(params, seconds) {
      TopologyValidatorJobsService_get(TopologyValidatorJobsService_getPrototypeOf(TopologyValidatorJobsService.prototype), "addJob", this).call(this, this.url, params, TopologyValidatorJobsParameter_TopologyValidatorJobsParameter, seconds);
    }
  }]);

  return TopologyValidatorJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.TopologyValidatorJobsService = TopologyValidatorJobsService_TopologyValidatorJobsService;
// CONCATENATED MODULE: ./src/common/iServer/SummaryAttributesJobsService.js
function SummaryAttributesJobsService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SummaryAttributesJobsService_typeof = function _typeof(obj) { return typeof obj; }; } else { SummaryAttributesJobsService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SummaryAttributesJobsService_typeof(obj); }

function SummaryAttributesJobsService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SummaryAttributesJobsService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SummaryAttributesJobsService_createClass(Constructor, protoProps, staticProps) { if (protoProps) SummaryAttributesJobsService_defineProperties(Constructor.prototype, protoProps); if (staticProps) SummaryAttributesJobsService_defineProperties(Constructor, staticProps); return Constructor; }

function SummaryAttributesJobsService_possibleConstructorReturn(self, call) { if (call && (SummaryAttributesJobsService_typeof(call) === "object" || typeof call === "function")) { return call; } return SummaryAttributesJobsService_assertThisInitialized(self); }

function SummaryAttributesJobsService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SummaryAttributesJobsService_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { SummaryAttributesJobsService_get = Reflect.get; } else { SummaryAttributesJobsService_get = function _get(target, property, receiver) { var base = SummaryAttributesJobsService_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return SummaryAttributesJobsService_get(target, property, receiver || target); }

function SummaryAttributesJobsService_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = SummaryAttributesJobsService_getPrototypeOf(object); if (object === null) break; } return object; }

function SummaryAttributesJobsService_getPrototypeOf(o) { SummaryAttributesJobsService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SummaryAttributesJobsService_getPrototypeOf(o); }

function SummaryAttributesJobsService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SummaryAttributesJobsService_setPrototypeOf(subClass, superClass); }

function SummaryAttributesJobsService_setPrototypeOf(o, p) { SummaryAttributesJobsService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SummaryAttributesJobsService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




/**
 * @class SuperMap.SummaryAttributesJobsService
 * @category  iServer ProcessingService SummaryAttributes
 * @classdesc 属性汇总分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url - 汇总统计分析服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var SummaryAttributesJobsService_SummaryAttributesJobsService =
/*#__PURE__*/
function (_ProcessingServiceBas) {
  SummaryAttributesJobsService_inherits(SummaryAttributesJobsService, _ProcessingServiceBas);

  function SummaryAttributesJobsService(url, options) {
    var _this;

    SummaryAttributesJobsService_classCallCheck(this, SummaryAttributesJobsService);

    _this = SummaryAttributesJobsService_possibleConstructorReturn(this, SummaryAttributesJobsService_getPrototypeOf(SummaryAttributesJobsService).call(this, url, options));
    _this.url = Util.urlPathAppend(_this.url, 'spatialanalyst/summaryattributes');
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
     * @function SuperMap.SummaryAttributesJobsService.protitype.getSummaryAttributesJobs
     * @description 获取属性汇总分析所有任务
     */

  }, {
    key: "getSummaryAttributesJobs",
    value: function getSummaryAttributesJobs() {
      SummaryAttributesJobsService_get(SummaryAttributesJobsService_getPrototypeOf(SummaryAttributesJobsService.prototype), "getJobs", this).call(this, this.url);
    }
    /**
     * @function SuperMap.SummaryAttributesJobsService.protitype.getSummaryAttributesJob
     * @description 获取指定id的属性汇总分析服务
     * @param {string} id - 指定要获取数据的id
     */

  }, {
    key: "getSummaryAttributesJob",
    value: function getSummaryAttributesJob(id) {
      SummaryAttributesJobsService_get(SummaryAttributesJobsService_getPrototypeOf(SummaryAttributesJobsService.prototype), "getJobs", this).call(this, Util.urlPathAppend(this.url, id));
    }
    /**
     * @function SuperMap.SummaryAttributesJobsService.protitype.addSummaryAttributesJob
     * @description 新建属性汇总分析服务
     * @param {SuperMap.SummaryAttributesJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */

  }, {
    key: "addSummaryAttributesJob",
    value: function addSummaryAttributesJob(params, seconds) {
      SummaryAttributesJobsService_get(SummaryAttributesJobsService_getPrototypeOf(SummaryAttributesJobsService.prototype), "addJob", this).call(this, this.url, params, SummaryAttributesJobsParameter_SummaryAttributesJobsParameter, seconds);
    }
  }]);

  return SummaryAttributesJobsService;
}(ProcessingServiceBase_ProcessingServiceBase);
SuperMap.SummaryAttributesJobsService = SummaryAttributesJobsService_SummaryAttributesJobsService;
// CONCATENATED MODULE: ./src/classic/services/ProcessingService.js
function ProcessingService_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ProcessingService_typeof = function _typeof(obj) { return typeof obj; }; } else { ProcessingService_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ProcessingService_typeof(obj); }

function ProcessingService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProcessingService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProcessingService_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProcessingService_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProcessingService_defineProperties(Constructor, staticProps); return Constructor; }

function ProcessingService_possibleConstructorReturn(self, call) { if (call && (ProcessingService_typeof(call) === "object" || typeof call === "function")) { return call; } return ProcessingService_assertThisInitialized(self); }

function ProcessingService_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ProcessingService_getPrototypeOf(o) { ProcessingService_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ProcessingService_getPrototypeOf(o); }

function ProcessingService_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ProcessingService_setPrototypeOf(subClass, superClass); }

function ProcessingService_setPrototypeOf(o, p) { ProcessingService_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ProcessingService_setPrototypeOf(o, p); }

/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/












/**
 * @class SuperMap.REST.ProcessingService
 * @category  iServer ProcessingService
 * @classdesc 分布式分析相关服务类。
 * @augments SuperMap.CommonServiceBase
 * @example
 * 用法：
 * new SuperMap.REST.ProcessingService(url,options)
 *    .getKernelDensityJobs(function(result){
 *       //doSomething
 * })
 * @param {string} url - 分布式分析服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */

var ProcessingService_ProcessingService =
/*#__PURE__*/
function (_CommonServiceBase) {
  ProcessingService_inherits(ProcessingService, _CommonServiceBase);

  function ProcessingService(url, options) {
    var _this;

    ProcessingService_classCallCheck(this, ProcessingService);

    _this = ProcessingService_possibleConstructorReturn(this, ProcessingService_getPrototypeOf(ProcessingService).call(this, url, options));
    _this.kernelDensityJobs = {};
    _this.summaryMeshJobs = {};
    _this.queryJobs = {};
    _this.summaryRegionJobs = {};
    _this.vectorClipJobs = {};
    _this.overlayGeoJobs = {};
    _this.buffersJobs = {};
    _this.topologyValidatorJobs = {};
    _this.summaryAttributesJobs = {};
    return _this;
  }
  /**
   * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJobs
   * @description 获取密度分析的列表。
   * @param {function} callback - 请求结果的回调函数。
   * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
   */


  ProcessingService_createClass(ProcessingService, [{
    key: "getKernelDensityJobs",
    value: function getKernelDensityJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var kernelDensityJobsService = new KernelDensityJobsService_KernelDensityJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      kernelDensityJobsService.getKernelDensityJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJob
     * @description 获取某一个密度分析。
     * @param {string} id - 空间分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getKernelDensityJob",
    value: function getKernelDensityJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var kernelDensityJobsService = new KernelDensityJobsService_KernelDensityJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      kernelDensityJobsService.getKernelDensityJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addKernelDensityJob
     * @description 新建一个密度分析。
     * @param {SuperMap.KernelDensityJobParameter} params - 创建一个空间分析的请求参数。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "addKernelDensityJob",
    value: function addKernelDensityJob(params, callback, seconds, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var kernelDensityJobsService = new KernelDensityJobsService_KernelDensityJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.kernelDensityJobs[job.id] = job.state;
          }
        },
        format: format
      });
      kernelDensityJobsService.addKernelDensityJob(params, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param {string} id - 密度分析的 id。
     * @returns {Object} - 密度分析的状态。
     */

  }, {
    key: "getKernelDensityJobState",
    value: function getKernelDensityJobState(id) {
      return this.kernelDensityJobs[id];
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getSummaryMeshJobs",
    value: function getSummaryMeshJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryMeshJobsService = new SummaryMeshJobsService_SummaryMeshJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      summaryMeshJobsService.getSummaryMeshJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJob
     * @description 获取某一个点聚合分析。
     * @param {string} id - 空间分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getSummaryMeshJob",
    value: function getSummaryMeshJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryMeshJobsService = new SummaryMeshJobsService_SummaryMeshJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      summaryMeshJobsService.getSummaryMeshJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addSummaryMeshJob
     * @description 新建一个点聚合分析。
     * @param {SuperMap.SummaryMeshJobParameter} params - 点聚合分析任务参数类。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
    */

  }, {
    key: "addSummaryMeshJob",
    value: function addSummaryMeshJob(params, callback, seconds, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryMeshJobsService = new SummaryMeshJobsService_SummaryMeshJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.summaryMeshJobs[job.id] = job.state;
          }
        },
        format: format
      });
      summaryMeshJobsService.addSummaryMeshJob(params, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param {string} id - 点聚合分析的 id。
     * @returns {Object} 点聚合分析的状态。
     */

  }, {
    key: "getSummaryMeshJobState",
    value: function getSummaryMeshJobState(id) {
      return this.summaryMeshJobs[id];
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getQueryJobs
     * @description 获取单对象查询分析的列表。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getQueryJobs",
    value: function getQueryJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var singleObjectQueryJobsService = new SingleObjectQueryJobsService_SingleObjectQueryJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      singleObjectQueryJobsService.getQueryJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getQueryJob
     * @description 获取某一个单对象查询分析。
     * @param {string} id - 空间分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getQueryJob",
    value: function getQueryJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var singleObjectQueryJobsService = new SingleObjectQueryJobsService_SingleObjectQueryJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      singleObjectQueryJobsService.getQueryJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addQueryJob
     * @description 新建一个单对象查询分析。
     * @param {SuperMap.SingleObjectQueryJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "addQueryJob",
    value: function addQueryJob(params, callback, seconds, resultFormat) {
      var me = this,
          param = me._processParams(params),
          format = me._processFormat(resultFormat);

      var singleObjectQueryJobsService = new SingleObjectQueryJobsService_SingleObjectQueryJobsService(me.url, {
        headers: me.headers,
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.queryJobs[job.id] = job.state;
          }
        },
        format: format
      });
      singleObjectQueryJobsService.addQueryJob(param, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getQueryJobState
     * @description 获取单对象查询分析的状态。
     * @param {string} id - 单对象查询分析的 id。
     * @returns {Object} 单对象查询分析的状态
     */

  }, {
    key: "getQueryJobState",
    value: function getQueryJobState(id) {
      return this.queryJobs[id];
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析的列表。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getSummaryRegionJobs",
    value: function getSummaryRegionJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryRegionJobsService = new SummaryRegionJobsService_SummaryRegionJobsService(me.url, {
        proxy: me.proxy,
        headers: me.headers,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      summaryRegionJobsService.getSummaryRegionJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJob
     * @description 获取某一个区域汇总分析。
     * @param {string} id - 区域汇总分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getSummaryRegionJob",
    value: function getSummaryRegionJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryRegionJobsService = new SummaryRegionJobsService_SummaryRegionJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      summaryRegionJobsService.getSummaryRegionJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addSummaryRegionJob
     * @description 新建一个区域汇总分析。
     * @param {SuperMap.SummaryRegionJobParameter} params -创建一个区域汇总分析的请求参数。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "addSummaryRegionJob",
    value: function addSummaryRegionJob(params, callback, seconds, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryRegionJobsService = new SummaryRegionJobsService_SummaryRegionJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.summaryRegionJobs[job.id] = job.state;
          }
        },
        format: format
      });
      summaryRegionJobsService.addSummaryRegionJob(params, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJobState
     * @description 获取区域汇总分析的状态。
     * @param {string} id - 区域汇总分析的 id。
     * @returns {Object} 区域汇总分析的状态。
     */

  }, {
    key: "getSummaryRegionJobState",
    value: function getSummaryRegionJobState(id) {
      return this.summaryRegionJobs[id];
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getVectorClipJobs",
    value: function getVectorClipJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var vectorClipJobsService = new VectorClipJobsService_VectorClipJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      vectorClipJobsService.getVectorClipJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJob
     * @description 获取某一个矢量裁剪分析。
     * @param {string} id - 空间分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getVectorClipJob",
    value: function getVectorClipJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var vectorClipJobsService = new VectorClipJobsService_VectorClipJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      vectorClipJobsService.getVectorClipJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addVectorClipJob
     * @description 新建一个矢量裁剪分析。
     * @param {SuperMap.VectorClipJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "addVectorClipJob",
    value: function addVectorClipJob(params, callback, seconds, resultFormat) {
      var me = this,
          param = me._processParams(params),
          format = me._processFormat(resultFormat);

      var vectorClipJobsService = new VectorClipJobsService_VectorClipJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.vectorClipJobs[job.id] = job.state;
          }
        },
        format: format
      });
      vectorClipJobsService.addVectorClipJob(param, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param {string} id - 矢量裁剪分析的 id。
     * @returns {Object} 矢量裁剪分析的状态。
     */

  }, {
    key: "getVectorClipJobState",
    value: function getVectorClipJobState(id) {
      return this.vectorClipJobs[id];
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析的列表。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getOverlayGeoJobs",
    value: function getOverlayGeoJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var overlayGeoJobsService = new OverlayGeoJobsService_OverlayGeoJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      overlayGeoJobsService.getOverlayGeoJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getOverlayGeoJob
     * @description 获取某一个叠加分析。
     * @param {string} id - 空间分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getOverlayGeoJob",
    value: function getOverlayGeoJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var overlayGeoJobsService = new OverlayGeoJobsService_OverlayGeoJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      overlayGeoJobsService.getOverlayGeoJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addOverlayGeoJob
     * @description 新建一个叠加分析。
     * @param {SuperMap.OverlayGeoJobParameter} params - 创建一个空间分析的请求参数。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "addOverlayGeoJob",
    value: function addOverlayGeoJob(params, callback, seconds, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var overlayGeoJobsService = new OverlayGeoJobsService_OverlayGeoJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.overlayGeoJobs[job.id] = job.state;
          }
        },
        format: format
      });
      overlayGeoJobsService.addOverlayGeoJob(params, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getoverlayGeoJobState
     * @description 获取叠加分析的状态。
     * @param {string} id - 叠加分析的 id。
     * @returns {Object} 叠加分析的状态。
     */

  }, {
    key: "getoverlayGeoJobState",
    value: function getoverlayGeoJobState(id) {
      return this.overlayGeoJobs[id];
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getBuffersJobs
     * @description 获取缓冲区分析的列表。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getBuffersJobs",
    value: function getBuffersJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var buffersAnalystJobsService = new BuffersAnalystJobsService_BuffersAnalystJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      buffersAnalystJobsService.getBuffersJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getBuffersJob
     * @description 获取某一个缓冲区分析。
     * @param {string} id - 空间分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getBuffersJob",
    value: function getBuffersJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var buffersAnalystJobsService = new BuffersAnalystJobsService_BuffersAnalystJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      buffersAnalystJobsService.getBuffersJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addBuffersJob
     * @description 新建一个缓冲区分析。
     * @param {SuperMap.BuffersAnalystJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "addBuffersJob",
    value: function addBuffersJob(params, callback, seconds, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var buffersAnalystJobsService = new BuffersAnalystJobsService_BuffersAnalystJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.buffersJobs[job.id] = job.state;
          }
        },
        format: format
      });
      buffersAnalystJobsService.addBuffersJob(params, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getBuffersJobState
     * @description 获取缓冲区分析的状态。
     * @param {string} id - 缓冲区分析的 id。
     * @returns {Object} 缓冲区分析的状态。
     */

  }, {
    key: "getBuffersJobState",
    value: function getBuffersJobState(id) {
      return this.buffersJobs[id];
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析的列表。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getTopologyValidatorJobs",
    value: function getTopologyValidatorJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var topologyValidatorJobsService = new TopologyValidatorJobsService_TopologyValidatorJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      topologyValidatorJobsService.getTopologyValidatorJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getTopologyValidatorJob
     * @description 获取某一个拓扑检查分析。
     * @param {string} id - 空间分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getTopologyValidatorJob",
    value: function getTopologyValidatorJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var topologyValidatorJobsService = new TopologyValidatorJobsService_TopologyValidatorJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      topologyValidatorJobsService.getTopologyValidatorJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addTopologyValidatorJob
     * @description 新建一个拓扑检查分析。
     * @param {SuperMap.TopologyValidatorJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "addTopologyValidatorJob",
    value: function addTopologyValidatorJob(params, callback, seconds, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var topologyValidatorJobsService = new TopologyValidatorJobsService_TopologyValidatorJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.topologyValidatorJobs[job.id] = job.state;
          }
        },
        format: format
      });
      topologyValidatorJobsService.addTopologyValidatorJob(params, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getTopologyValidatorJobState
     * @description 获取拓扑检查分析的状态。
     * @param {string} id - 拓扑检查分析的 id。
     * @returns {Object} 拓扑检查分析的状态。
     */

  }, {
    key: "getTopologyValidatorJobState",
    value: function getTopologyValidatorJobState(id) {
      return this.topologyValidatorJobs[id];
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryAttributesJobs
     * @description 获取属性汇总分析的列表。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getSummaryAttributesJobs",
    value: function getSummaryAttributesJobs(callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryAttributesJobsService = new SummaryAttributesJobsService_SummaryAttributesJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      summaryAttributesJobsService.getSummaryAttributesJobs();
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryAttributesJob
     * @description 获取某一个属性汇总分析。
     * @param {string} id - 空间分析的 id。
     * @param {function} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "getSummaryAttributesJob",
    value: function getSummaryAttributesJob(id, callback, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryAttributesJobsService = new SummaryAttributesJobsService_SummaryAttributesJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback
        },
        format: format
      });
      summaryAttributesJobsService.getSummaryAttributesJob(id);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.addSummaryAttributesJob
     * @description 新建一个属性汇总分析。
     * @param {SuperMap.SummaryAttributesJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {function} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */

  }, {
    key: "addSummaryAttributesJob",
    value: function addSummaryAttributesJob(params, callback, seconds, resultFormat) {
      var me = this,
          format = me._processFormat(resultFormat);

      var summaryAttributesJobsService = new SummaryAttributesJobsService_SummaryAttributesJobsService(me.url, {
        proxy: me.proxy,
        withCredentials: me.withCredentials,
        crossOrigin: me.crossOrigin,
        headers: me.headers,
        serverType: me.serverType,
        eventListeners: {
          scope: me,
          processCompleted: callback,
          processFailed: callback,
          processRunning: function processRunning(job) {
            me.summaryAttributesJobs[job.id] = job.state;
          }
        },
        format: format
      });
      summaryAttributesJobsService.addSummaryAttributesJob(params, seconds);
    }
    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryAttributesJobState
     * @description 获取属性汇总分析的状态。
     * @param {string} id - 属性汇总分析的 id。
     * @returns {Object} 属性汇总分析的状态。
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
        geometryParam = "";
      } else {
        var results = [];

        for (var i = 0; i < points.length; i++) {
          var point = {};
          point.x = points[i].x;
          point.y = points[i].y;
          results.push(point);
        }

        geometryParam.type = "REGION";
        geometryParam.points = results;
      }

      return geometryParam;
    }
  }]);

  return ProcessingService;
}(CommonServiceBase_CommonServiceBase);
SuperMap_SuperMap.REST.ProcessingService = ProcessingService_ProcessingService;
// CONCATENATED MODULE: ./src/classic/services/index.js
/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


// CONCATENATED MODULE: ./src/classic/index.js
/* concated harmony reexport ElasticSearch */__webpack_require__.d(__webpack_exports__, "ElasticSearch", function() { return ElasticSearch_ElasticSearch; });
/* concated harmony reexport SecurityManager */__webpack_require__.d(__webpack_exports__, "SecurityManager", function() { return SecurityManager_SecurityManager; });
/* concated harmony reexport KernelDensityJobParameter */__webpack_require__.d(__webpack_exports__, "KernelDensityJobParameter", function() { return KernelDensityJobParameter_KernelDensityJobParameter; });
/* concated harmony reexport SingleObjectQueryJobsParameter */__webpack_require__.d(__webpack_exports__, "SingleObjectQueryJobsParameter", function() { return SingleObjectQueryJobsParameter_SingleObjectQueryJobsParameter; });
/* concated harmony reexport SummaryAttributesJobsParameter */__webpack_require__.d(__webpack_exports__, "SummaryAttributesJobsParameter", function() { return SummaryAttributesJobsParameter_SummaryAttributesJobsParameter; });
/* concated harmony reexport SummaryMeshJobParameter */__webpack_require__.d(__webpack_exports__, "SummaryMeshJobParameter", function() { return SummaryMeshJobParameter_SummaryMeshJobParameter; });
/* concated harmony reexport SummaryRegionJobParameter */__webpack_require__.d(__webpack_exports__, "SummaryRegionJobParameter", function() { return SummaryRegionJobParameter_SummaryRegionJobParameter; });
/* concated harmony reexport OverlayGeoJobParameter */__webpack_require__.d(__webpack_exports__, "OverlayGeoJobParameter", function() { return OverlayGeoJobParameter_OverlayGeoJobParameter; });
/* concated harmony reexport BuffersAnalystJobsParameter */__webpack_require__.d(__webpack_exports__, "BuffersAnalystJobsParameter", function() { return BuffersAnalystJobsParameter_BuffersAnalystJobsParameter; });
/* concated harmony reexport TopologyValidatorJobsParameter */__webpack_require__.d(__webpack_exports__, "TopologyValidatorJobsParameter", function() { return TopologyValidatorJobsParameter_TopologyValidatorJobsParameter; });
/* concated harmony reexport OutputSetting */__webpack_require__.d(__webpack_exports__, "OutputSetting", function() { return OutputSetting_OutputSetting; });
/* concated harmony reexport MappingParameters */__webpack_require__.d(__webpack_exports__, "MappingParameters", function() { return MappingParameters_MappingParameters; });
/* concated harmony reexport GeoCodingParameter */__webpack_require__.d(__webpack_exports__, "GeoCodingParameter", function() { return GeoCodingParameter_GeoCodingParameter; });
/* concated harmony reexport GeoDecodingParameter */__webpack_require__.d(__webpack_exports__, "GeoDecodingParameter", function() { return GeoDecodingParameter_GeoDecodingParameter; });
/* concated harmony reexport MapVLayer */__webpack_require__.d(__webpack_exports__, "MapVLayer", function() { return MapVLayer_MapVLayer; });
/* concated harmony reexport MapVRenderer */__webpack_require__.d(__webpack_exports__, "MapVRenderer", function() { return MapVRenderer_MapVRenderer; });
/* concated harmony reexport AddressMatchService */__webpack_require__.d(__webpack_exports__, "AddressMatchService", function() { return services_AddressMatchService_AddressMatchService; });
/* concated harmony reexport ProcessingService */__webpack_require__.d(__webpack_exports__, "ProcessingService", function() { return ProcessingService_ProcessingService; });
/* concated harmony reexport SuperMap */__webpack_require__.d(__webpack_exports__, "SuperMap", function() { return SuperMap_SuperMap; });
/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


















/***/ })
/******/ ]);