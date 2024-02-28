/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { StringExt } from './BaseTypes';
import { Geometry } from './Geometry';
import URI from 'urijs';

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
const Browser = (function () {
  var name = '',
    version = '',
    device = 'pc',
    uaMatch;
  //以下进行测试
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('msie') > -1 || (ua.indexOf('trident') > -1 && ua.indexOf('rv') > -1)) {
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
  return { name: name, version: version, device: device };
})();

const isSupportCanvas = (function () {
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
})();

/**
 * @description 如果 userAgent 捕获到浏览器使用的是 Gecko 引擎则返回 true。
 * @constant {number}
 * @private
 */
const IS_GECKO = (function () {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('webkit') === -1 && ua.indexOf('gecko') !== -1;
})();

/**
 * @constant {number}
 * @default
 * @description 分辨率与比例尺之间转换的常量。
 * @private
 */
const DOTS_PER_INCH = 96;

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

const Util = {

  /**
   * @memberOf CommonUtil
   * @description 对象拷贝赋值。
   * @param {Object} dest - 目标对象。
   * @param {Object} arguments - 待拷贝的对象。
   * @returns {Object} 赋值后的目标对象。
   */
  assign(dest) {
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

  extend: function (destination, source) {
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
  copy: function (des, soc) {
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
  reset: function (obj) {
    obj = obj || {};
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (typeof obj[p] === 'object' && obj[p] instanceof Array) {
          for (var i in obj[p]) {
            if (obj[p][i].destroy) {
              obj[p][i].destroy();
            }
          }
          obj[p].length = 0;
        } else if (typeof obj[p] === 'object' && obj[p] instanceof Object) {
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
  getElement: function () {
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
  isElement: function (o) {
    return !!(o && o.nodeType === 1);
  },

  /**
   * @memberOf CommonUtil
   * @description 判断一个对象是否是数组。
   * @param {Object} a - 对象。
   * @returns {boolean} 是否是数组。
   */
  isArray: function (a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  },

  /**
   * @memberOf CommonUtil
   * @description 从数组中删除某一项。
   * @param {Array} array - 数组。
   * @param {Object} item - 数组中要删除的一项。
   * @returns {Array} 执行删除操作后的数组。
   */
  removeItem: function (array, item) {
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
  indexOf: function (array, obj) {
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
  modifyDOMElement: function (element, id, px, sz, position, border, overflow, opacity) {
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
  applyDefaults: function (to, from) {
    to = to || {};
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object is an
     * instance of window.Event.
     */
    var fromIsEvt = typeof window.Event === 'function' && from instanceof window.Event;

    for (var key in from) {
      if (
        to[key] === undefined ||
        (!fromIsEvt && from.hasOwnProperty && from.hasOwnProperty(key) && !to.hasOwnProperty(key))
      ) {
        to[key] = from[key];
      }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    if (
      !fromIsEvt &&
      from &&
      from.hasOwnProperty &&
      from.hasOwnProperty('toString') &&
      !to.hasOwnProperty('toString')
    ) {
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
  getParameterString: function (params) {
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
  urlAppend: function (url, paramStr) {
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
  urlPathAppend: function (url, pathStr) {
    let newUrl = url;
    if (!pathStr) {
      return newUrl;
    }
    if (pathStr.indexOf('/') === 0) {
      pathStr = pathStr.substring(1);
    }
    const parts = url.split('?');
    if (parts[0].indexOf('/', parts[0].length - 1) < 0) {
      parts[0] += '/';
    }
    newUrl = `${parts[0]}${pathStr}${parts.length > 1 ? `?${parts[1]}` : ''}`;
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
  toFloat: function (number, precision) {
    if (precision == null) {
      precision = Util.DEFAULT_PRECISION;
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
  rad: function (x) {
    return (x * Math.PI) / 180;
  },

  /**
   * @memberOf CommonUtil
   * @description 从 URL 字符串中解析出参数对象。
   * @param {string} url - URL。
   * @returns {Object} 解析出的参数对象。
   */
  getParameters: function (url) {
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
  createUniqueID: function (prefix) {
    if (prefix == null) {
      prefix = 'id_';
    }
    Util.lastSeqID += 1;
    return prefix + Util.lastSeqID;
  },

  /**
   * @memberOf CommonUtil
   * @description 判断并转化比例尺。
   * @param {number} scale - 比例尺。
   * @returns {number} 正常的 scale 值。
   */
  normalizeScale: function (scale) {
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
  getResolutionFromScale: function (scale, units) {
    var resolution;
    if (scale) {
      if (units == null) {
        units = 'degrees';
      }
      var normScale = Util.normalizeScale(scale);
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
  getScaleFromResolution: function (resolution, units) {
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
  getBrowser: function () {
    return Browser;
  },

  /**
   * @memberOf CommonUtil
   * @description 浏览器是否支持 Canvas。
   * @returns {boolean} 当前浏览器是否支持 HTML5 Canvas。
   */
  isSupportCanvas,

  /**
   * @memberOf CommonUtil
   * @description 判断浏览器是否支持 Canvas。
   * @returns {boolean} 当前浏览器是否支持 HTML5 Canvas 。
   */
  supportCanvas: function () {
    return Util.isSupportCanvas;
  },

  /**
   * @memberOf CommonUtil
   * @description 判断一个 URL 请求是否在当前域中。
   * @param {string} url - URL 请求字符串。
   * @returns {boolean} URL 请求是否在当前域中。
   */
  isInTheSameDomain: function (url) {
    if (!url) {
      return true;
    }
    const index = url.indexOf('//');
    if (index === -1) {
      return true;
    }
    return Util.isSameDomain(url, document.location.toString());
  },

  isSameDomain(url, otherUrl) {
    return new URI(url).normalize().origin() === new URI(otherUrl).normalize().origin();
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
  calculateDpi: function (viewBounds, viewer, scale, coordUnit, datumAxis) {
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
    if (
      coordUnit.toLowerCase() === 'degree' ||
      coordUnit.toLowerCase() === 'degrees' ||
      coordUnit.toLowerCase() === 'dd'
    ) {
      let num1 = rvbWidth / rvWidth,
        num2 = rvbHeight / rvHeight,
        resolution = num1 > num2 ? num1 : num2;
      dpi = (0.0254 * ratio) / resolution / scale / ((Math.PI * 2 * datumAxis) / 360) / ratio;
    } else {
      let resolution = rvbWidth / rvWidth;
      dpi = (0.0254 * ratio) / resolution / scale / ratio;
    }
    return dpi;
  },

  /**
   * @memberOf CommonUtil
   * @description 将对象转换成 JSON 字符串。
   * @param {Object} obj - 要转换成 JSON 的 Object 对象。
   * @returns {string} 转换后的 JSON 对象。
   */
  toJSON: function (obj) {
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
          arr += Util.toJSON(objInn[i]);
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
        var dateStr =
          '{' +
          '\'__type\':"System.DateTime",' +
          "'Year':" +
          objInn.getFullYear() +
          ',' +
          "'Month':" +
          (objInn.getMonth() + 1) +
          ',' +
          "'Day':" +
          objInn.getDate() +
          ',' +
          "'Hour':" +
          objInn.getHours() +
          ',' +
          "'Minute':" +
          objInn.getMinutes() +
          ',' +
          "'Second':" +
          objInn.getSeconds() +
          ',' +
          "'Millisecond':" +
          objInn.getMilliseconds() +
          ',' +
          "'TimezoneOffset':" +
          objInn.getTimezoneOffset() +
          '}';
        return dateStr;
      default:
        if (objInn['toJSON'] != null && typeof objInn['toJSON'] === 'function') {
          return objInn.toJSON();
        }
        if (typeof objInn === 'object') {
          if (objInn.length) {
            let arr = [];
            for (let i = 0, len = objInn.length; i < len; i++) {
              arr.push(Util.toJSON(objInn[i]));
            }
            return '[' + arr.join(',') + ']';
          }
          let arr = [];
          for (let attr in objInn) {
            //为解决Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
            if (typeof objInn[attr] !== 'function' && attr !== 'CLASS_NAME' && attr !== 'parent') {
              arr.push("'" + attr + "':" + Util.toJSON(objInn[attr]));
            }
          }

          if (arr.length > 0) {
            return '{' + arr.join(',') + '}';
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
  getResolutionFromScaleDpi: function (scale, dpi, coordUnit, datumAxis) {
    var resolution = null,
      ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || '';
    if (scale > 0 && dpi > 0) {
      scale = Util.normalizeScale(scale);
      if (
        coordUnit.toLowerCase() === 'degree' ||
        coordUnit.toLowerCase() === 'degrees' ||
        coordUnit.toLowerCase() === 'dd'
      ) {
        //scale = Util.normalizeScale(scale);
        resolution = (0.0254 * ratio) / dpi / scale / ((Math.PI * 2 * datumAxis) / 360) / ratio;
        return resolution;
      } else {
        resolution = (0.0254 * ratio) / dpi / scale / ratio;
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
  getScaleFromResolutionDpi: function (resolution, dpi, coordUnit, datumAxis) {
    var scale = null,
      ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || '';
    if (resolution > 0 && dpi > 0) {
      if (
        coordUnit.toLowerCase() === 'degree' ||
        coordUnit.toLowerCase() === 'degrees' ||
        coordUnit.toLowerCase() === 'dd'
      ) {
        scale = (0.0254 * ratio) / dpi / resolution / ((Math.PI * 2 * datumAxis) / 360) / ratio;
        return scale;
      } else {
        scale = (0.0254 * ratio) / dpi / resolution / ratio;
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
  transformResult: function (result) {
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
  copyAttributes: function (destination, source) {
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
  copyAttributesWithClip: function (destination, source, clip) {
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
  cloneObject: function (obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || 'object' !== typeof obj) {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      let copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      let copy = obj.slice(0);
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      let copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = Util.cloneObject(obj[attr]);
        }
      }
      return copy;
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
  lineIntersection: function (a1, a2, b1, b2) {
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
        if (
          (((b1.y >= miny && b1.y <= maxy) || (b2.y >= miny && b2.y <= maxy)) && b1.x >= minx && b1.x <= maxx) ||
          (b2.x >= minx && b2.x <= maxx)
        ) {
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
  getTextBounds: function (style, text, element) {
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
  convertPath: function (path, pathParams) {
    if (!pathParams) {
      return path;
    }
    return path.replace(/\{([\w-\.]+)\}/g, (fullMatch, key) => {
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
const INCHES_PER_UNIT = {
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
const METERS_PER_INCH = 0.0254000508001016002;
Util.extend(INCHES_PER_UNIT, {
  Inch: INCHES_PER_UNIT.inches,
  Meter: 1.0 / METERS_PER_INCH, //EPSG:9001
  Foot: 0.30480060960121920243 / METERS_PER_INCH, //EPSG:9003
  IFoot: 0.3048 / METERS_PER_INCH, //EPSG:9002
  ClarkeFoot: 0.3047972651151 / METERS_PER_INCH, //EPSG:9005
  SearsFoot: 0.30479947153867624624 / METERS_PER_INCH, //EPSG:9041
  GoldCoastFoot: 0.30479971018150881758 / METERS_PER_INCH, //EPSG:9094
  IInch: 0.0254 / METERS_PER_INCH,
  MicroInch: 0.0000254 / METERS_PER_INCH,
  Mil: 0.0000000254 / METERS_PER_INCH,
  Centimeter: 0.01 / METERS_PER_INCH,
  Kilometer: 1000.0 / METERS_PER_INCH, //EPSG:9036
  Yard: 0.91440182880365760731 / METERS_PER_INCH,
  SearsYard: 0.914398414616029 / METERS_PER_INCH, //EPSG:9040
  IndianYard: 0.91439853074444079983 / METERS_PER_INCH, //EPSG:9084
  IndianYd37: 0.91439523 / METERS_PER_INCH, //EPSG:9085
  IndianYd62: 0.9143988 / METERS_PER_INCH, //EPSG:9086
  IndianYd75: 0.9143985 / METERS_PER_INCH, //EPSG:9087
  IndianFoot: 0.30479951 / METERS_PER_INCH, //EPSG:9080
  IndianFt37: 0.30479841 / METERS_PER_INCH, //EPSG:9081
  IndianFt62: 0.3047996 / METERS_PER_INCH, //EPSG:9082
  IndianFt75: 0.3047995 / METERS_PER_INCH, //EPSG:9083
  Mile: 1609.34721869443738887477 / METERS_PER_INCH,
  IYard: 0.9144 / METERS_PER_INCH, //EPSG:9096
  IMile: 1609.344 / METERS_PER_INCH, //EPSG:9093
  NautM: 1852.0 / METERS_PER_INCH, //EPSG:9030
  'Lat-66': 110943.316488932731 / METERS_PER_INCH,
  'Lat-83': 110946.25736872234125 / METERS_PER_INCH,
  Decimeter: 0.1 / METERS_PER_INCH,
  Millimeter: 0.001 / METERS_PER_INCH,
  Dekameter: 10.0 / METERS_PER_INCH,
  Decameter: 10.0 / METERS_PER_INCH,
  Hectometer: 100.0 / METERS_PER_INCH,
  GermanMeter: 1.0000135965 / METERS_PER_INCH, //EPSG:9031
  CaGrid: 0.999738 / METERS_PER_INCH,
  ClarkeChain: 20.1166194976 / METERS_PER_INCH, //EPSG:9038
  GunterChain: 20.11684023368047 / METERS_PER_INCH, //EPSG:9033
  BenoitChain: 20.116782494375872 / METERS_PER_INCH, //EPSG:9062
  SearsChain: 20.11676512155 / METERS_PER_INCH, //EPSG:9042
  ClarkeLink: 0.201166194976 / METERS_PER_INCH, //EPSG:9039
  GunterLink: 0.2011684023368047 / METERS_PER_INCH, //EPSG:9034
  BenoitLink: 0.20116782494375872 / METERS_PER_INCH, //EPSG:9063
  SearsLink: 0.2011676512155 / METERS_PER_INCH, //EPSG:9043
  Rod: 5.02921005842012 / METERS_PER_INCH,
  IntnlChain: 20.1168 / METERS_PER_INCH, //EPSG:9097
  IntnlLink: 0.201168 / METERS_PER_INCH, //EPSG:9098
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
Util.extend(INCHES_PER_UNIT, {
  mm: INCHES_PER_UNIT['Meter'] / 1000.0,
  cm: INCHES_PER_UNIT['Meter'] / 100.0,
  dm: INCHES_PER_UNIT['Meter'] * 100.0,
  km: INCHES_PER_UNIT['Meter'] * 1000.0,
  kmi: INCHES_PER_UNIT['nmi'], //International Nautical Mile
  fath: INCHES_PER_UNIT['Fathom'], //International Fathom
  ch: INCHES_PER_UNIT['IntnlChain'], //International Chain
  link: INCHES_PER_UNIT['IntnlLink'], //International Link
  'us-in': INCHES_PER_UNIT['inches'], //U.S. Surveyor's Inch
  'us-ft': INCHES_PER_UNIT['Foot'], //U.S. Surveyor's Foot
  'us-yd': INCHES_PER_UNIT['Yard'], //U.S. Surveyor's Yard
  'us-ch': INCHES_PER_UNIT['GunterChain'], //U.S. Surveyor's Chain
  'us-mi': INCHES_PER_UNIT['Mile'], //U.S. Surveyor's Statute Mile
  'ind-yd': INCHES_PER_UNIT['IndianYd37'], //Indian Yard
  'ind-ft': INCHES_PER_UNIT['IndianFt37'], //Indian Foot
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
  if (typeof str !== 'string' && typeof str !== 'object') {
    return false;
  }
  try {
    const type = str.toString();
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
}

export { Util, Browser, INCHES_PER_UNIT, METERS_PER_INCH, DOTS_PER_INCH, IS_GECKO };
