/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
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
  if ( true && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(340), __webpack_require__(430), __webpack_require__(704));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(340), __webpack_require__(430), __webpack_require__(704)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{}
}(this, function (punycode, IPv6, SLD, root) {
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
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
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

  URI._parts = function() {
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
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  URI.leading_whitespace_expression = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/
  // https://infra.spec.whatwg.org/#ascii-tab-or-newline
  URI.ascii_tab_whitespace = /[\u0009\u000A\u000D]+/g
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
  URI.hostProtocols = [
    'http',
    'https'
  ];

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
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
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
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
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
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
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

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
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

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {
        preventInvalidHostname: URI.preventInvalidHostname
      };
    }

    string = string.replace(URI.leading_whitespace_expression, '')
    // https://infra.spec.whatwg.org/#ascii-tab-or-newline
    string = string.replace(URI.ascii_tab_whitespace, '')

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
  URI.parseHost = function(string, parts) {
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
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var _string = string
    var firstBackSlash = string.indexOf('\\');
    if (firstBackSlash !== -1) {
      string = string.replace(/\\/g, '/')
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
  URI.parseQuery = function(string, escapeQuerySpace) {
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

  URI.build = function(parts) {
    var t = '';
    var requireAbsolutePath = false

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
      requireAbsolutePath = true
    }

    t += (URI.buildAuthority(parts) || '');

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
  URI.buildHost = function(parts) {
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
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
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
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
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
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
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

  URI.setQuery = function(data, name, value) {
    if (typeof name === 'object') {
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

  URI.removeQuery = function(data, name, value) {
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
    } else if (typeof name === 'object') {
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
  URI.hasQuery = function(data, name, value, withinArray) {
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
        return name in data; // data[name] !== undefined;

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


  URI.joinPaths = function() {
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

  URI.commonPath = function(one, two) {
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

  URI.withinString = function(string, callback, options) {
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

  URI.ensureValidHostname = function(v, protocol) {
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
    if (isInteger(port) && (port > 0) && (port < 65536)) {
      return;
    }

    throw new TypeError('Port "' + v + '" is not a valid port');
  };

  // noConflict
  URI.noConflict = function(removeAll) {
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

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
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

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
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
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
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
        if (key === 'query') { continue; }
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
  p.is = function(what) {
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

  p.protocol = function(v, build) {
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
  p.port = function(v, build) {
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
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = { preventInvalidHostname: this._parts.preventInvalidHostname };
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
  p.origin = function(v, build) {
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
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
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
  p.authority = function(v, build) {
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
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length -1) : t;
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
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
  p.subdomain = function(v, build) {
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
  p.domain = function(v, build) {
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
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
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
  p.tld = function(v, build) {
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
  p.directory = function(v, build) {
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
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

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
  p.suffix = function(v, build) {
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
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
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
  p.segment = function(segment, v, build) {
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
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
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
  p.segmentCoded = function(segment, v, build) {
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
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
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
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
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
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
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
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
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
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

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
  p.normalizeQuery = function(build) {
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
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
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

  p.unicode = function() {
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

  p.readable = function() {
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
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
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

    for (i = 0; (p = properties[i]); i++) {
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
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
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

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
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
  p.preventInvalidHostname = function(v) {
    this._parts.preventInvalidHostname = !!v;
    return this;
  };

  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));


/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

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
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
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
		return map(array, function(value) {
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
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
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

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

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
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
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
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
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
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
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
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else // removed by dead control flow
{}

}(this));


/***/ }),

/***/ 348:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{ var mod; }
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

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
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
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{}
}(this, function (root) {
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
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
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
    if (segments[0] === '')  {
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
}));


/***/ }),

/***/ 444:
/***/ (function(module) {

(function(self) {
  'use strict';

  // if __disableNativeFetch is set to true, the it will always polyfill fetch
  // with Ajax.
  if (!self.__disableNativeFetch && self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob, options) {
    var reader = new FileReader()
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : ''
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/
    var _charset = blob.type.match(regex) || contentType.match(regex)
    var args = [blob]

    if(_charset) {
      args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''))
    }

    reader.readAsText.apply(reader, args)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body, options) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
        this._options = options
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob, this._options)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body, options)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit, options)
    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      var __onLoadHandled = false;

      function onload() {
        if (xhr.readyState !== 4) {
          return
        }
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;

        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        resolve(new Response(body, options))
      }
      xhr.onreadystatechange = onload;
      xhr.onload = onload;
      xhr.onerror = function() {
        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

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
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true

  // Support CommonJS
  if ( true && module.exports) {
    module.exports = self.fetch;
  }
})(typeof self !== 'undefined' ? self : this);


/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
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
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{}
}(this, function (root) {
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
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch ',
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
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));


/***/ }),

/***/ 836:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory() :
	0;
}(this, (function () { 'use strict';

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

function allSettled(arr) {
  var P = this;
  return new P(function(resolve, reject) {
    if (!(arr && typeof arr.length !== 'undefined')) {
      return reject(
        new TypeError(
          typeof arr +
            ' ' +
            arr +
            ' is not iterable(cannot read property Symbol(Symbol.iterator))'
        )
      );
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        var then = val.then;
        if (typeof then === 'function') {
          then.call(
            val,
            function(val) {
              res(i, val);
            },
            function(e) {
              args[i] = { status: 'rejected', reason: e };
              if (--remaining === 0) {
                resolve(args);
              }
            }
          );
          return;
        }
      }
      args[i] = { status: 'fulfilled', value: val };
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
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
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
  Promise._immediateFn(function() {
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
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
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
    Promise._immediateFn(function() {
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
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
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

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
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
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

/** @suppress {undefinedVars} */
var globalNS = (function() {
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
})();

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

})));


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// UNUSED EXPORTS: AddressMatchService, BuffersAnalystJobsParameter, DatasetService, DatasourceService, ElasticSearch, FetchRequest, GeoCodingParameter, GeoDecodingParameter, KernelDensityJobParameter, MapVLayer, MapVRenderer, MappingParameters, OutputSetting, OverlayGeoJobParameter, ProcessingService, SecurityManager, SingleObjectQueryJobsParameter, SummaryAttributesJobsParameter, SummaryMeshJobParameter, SummaryRegionJobParameter, SuperMap, TopologyValidatorJobsParameter, Util, VectorClipJobsParameter

;// ./src/common/commontypes/Pixel.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class Pixel {
  constructor(x, y, mode) {
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
  toString() {
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
  clone() {
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
  equals(px) {
    var equals = false;
    if (px != null) {
      equals = (this.x == px.x && this.y == px.y) || (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y));
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
  distanceTo(px) {
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
  add(x, y) {
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
  offset(px) {
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
  destroy() {
    this.x = null;
    this.y = null;
    this.mode = null;
  }
}
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

;// ./src/common/commontypes/BaseTypes.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 

/**
 * @function inherit
 * @description 除了 C 和 P 两个必要参数外，可以传递任意数量的对象，这些对象都将继承C。
 * @param {Object} C - 继承的类。
 * @param {Object} P - 被继承的父类。
 * @private
 */
var inheritExt = function (C, P) {
    var F = function () {
    };
    F.prototype = P.prototype;
    C.prototype = new F;
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
var mixinExt = function (...mixins) {

    class Mix {
        constructor(options) {
            for (var index = 0; index < mixins.length; index++) {
                copyProperties(this, new mixins[index](options));
            }
        }
    }

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
            if (key !== "constructor"
                && key !== "prototype"
                && key !== "name" && key !== "length") {
                let desc = Object.getOwnPropertyDescriptor(source, key);
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
    startsWith: function (str, sub) {
        return (str.indexOf(sub) == 0);
    },

    /**
     * @function StringExt.contains
     * @description 判断目标字符串是否包含指定的子字符串。
     * @param {string} str - 目标字符串。
     * @param {string} sub - 查找的子字符串。
     * @returns {boolean} 目标字符串中包含指定的子字符串，则返回 true；否则返回 false。
     */
    contains: function (str, sub) {
        return (str.indexOf(sub) != -1);
    },

    /**
     * @function StringExt.trim
     * @description 删除一个字符串的开头和结尾处的所有空白字符。
     * @param {string} str - （可能）存在空白字符填塞的字符串。
     * @returns {string} 删除开头和结尾处空白字符后的字符串。
     */
    trim: function (str) {
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
    camelize: function (str) {
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
    format: function (template, context, args) {
        if (!context) {
            context = window;
        }

        // Example matching:
        // str   = ${foo.bar}
        // match = foo.bar
        var replacer = function (str, match) {
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
                replacement = args ?
                    replacement.apply(null, args) :
                    replacement();
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
    isNumeric: function (value) {
        return StringExt.numberRegEx.test(value);
    },

    /**
     * @function StringExt.numericIf
     * @description 把一个看似数值型的字符串转化为一个数值。
     * @returns {(number|string)} 如果能转换为数值则返回数值，否则返回字符串本身。
     */
    numericIf: function (value) {
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
    limitSigDigs: function (num, sig) {
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
    format: function (num, dec, tsep, dsep) {
        dec = (typeof dec != "undefined") ? dec : 0;
        tsep = (typeof tsep != "undefined") ? tsep :
        NumberExt.thousandsSeparator;
        dsep = (typeof dsep != "undefined") ? dsep :
        NumberExt.decimalSeparator;

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
    bind: function (func, object) {
        // create a reference to all arguments past the second one
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function () {
            // Push on any additional arguments from the actual function call.
            // These will come after those sent to the bind call.
            var newArgs = args.concat(
                Array.prototype.slice.apply(arguments, [0])
            );
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
    bindAsEventListener: function (func, object) {
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
    False: function () {
        return false;
    },

    /**
     * @function FunctionExt.True
     * @description 该函数仅仅返回 true。该函数主要是避免在 IE8 以下浏览中 DOM 事件句柄的匿名函数问题。
     * @example
     * document.onclick = FunctionExt.True;
     * @returns {boolean}
     */
    True: function () {
        return true;
    },

    /**
     * @function FunctionExt.Void
     * @description 可重用函数，仅仅返回 "undefined"。
     * @returns {undefined}
     */
    Void: function () {
    }

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
    filter: function (array, callback, caller) {
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

;// ./src/common/commontypes/Geometry.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class Geometry {


    constructor() {
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
    destroy() {
        this.id = null;
        this.bounds = null;
        this.SRID = null;
    }


    /**
     * @function Geometry.prototype.clone
     * @description 克隆几何图形。克隆的几何图形不设置非标准的属性。
     * @returns {Geometry} 克隆的几何图形。
     */
    clone() {
        return new Geometry();
    }


    /**
     * @function Geometry.prototype.setBounds
     * @description 设置几何对象的边界。
     * @param {Bounds} bounds - 范围。
     */
    setBounds(bounds) {
        if (bounds) {
            this.bounds = bounds.clone();
        }
    }


    /**
     * @function Geometry.prototype.clearBounds
     * @description 清除几何对象的边界。
     * 如果该对象有父类，也会清除父类几何对象的边界。
     */
    clearBounds() {
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
    extendBounds(newBounds) {
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
    getBounds() {
        if (this.bounds == null) {
            this.calculateBounds();
        }
        return this.bounds;
    }


    /**
     * @function Geometry.prototype.calculateBounds
     * @description 重新计算几何图形的边界（需要在子类中实现此方法）。
     */
    calculateBounds() {
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
    getVertices(nodes) { // eslint-disable-line no-unused-vars
    }

    /**
     * @function Geometry.prototype.getArea
     * @description 计算几何对象的面积 ，此方法需要在子类中定义。
     * @returns {number} 计算后的对象面积。
     */
    getArea() {
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
}

// EXTERNAL MODULE: ./node_modules/urijs/src/URI.js
var URI = __webpack_require__(193);
var URI_default = /*#__PURE__*/__webpack_require__.n(URI);
;// ./src/common/commontypes/Util.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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

const Util_Util = {

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
    Util_Util.lastSeqID += 1;
    return prefix + Util_Util.lastSeqID;
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
    return Util_Util.isSupportCanvas;
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
    return Util_Util.isSameDomain(url, document.location.toString());
  },

  isSameDomain(url, otherUrl) {
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
              arr.push(Util_Util.toJSON(objInn[i]));
            }
            return '[' + arr.join(',') + ']';
          }
          let arr = [];
          for (let attr in objInn) {
            //为解决Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
            if (typeof objInn[attr] !== 'function' && attr !== 'CLASS_NAME' && attr !== 'parent') {
              arr.push("'" + attr + "':" + Util_Util.toJSON(objInn[attr]));
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
      scale = Util_Util.normalizeScale(scale);
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
          copy[attr] = Util_Util.cloneObject(obj[attr]);
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
  },
  /**
    * @description 十六进制转 RGBA 格式。
    * @param {Object} hex - 十六进制格式。
    * @param {number} opacity - 不透明度Alpha。
    * @returns {string} 生成的 RGBA 格式。
    */
  hexToRgba(hex, opacity) {
      var color = [],
          rgba = [];
      hex = hex.replace(/#/, "");
      if (hex.length == 3) {
          var tmp = [];
          for (let i = 0; i < 3; i++) {
              tmp.push(hex.charAt(i) + hex.charAt(i));
          }
          hex = tmp.join("");
      }
      for (let i = 0; i < 6; i += 2) {
          color[i] = "0x" + hex.substr(i, 2);
          rgba.push(parseInt(Number(color[i])));
      }
      rgba.push(opacity);
      return "rgba(" + rgba.join(",") + ")";
  },
   /**
    * @description 是否是绝对地址。
    * @private
    * @param {string} url - 验证地址。
    * @returns {boolean} 是否是绝对地址。
    */
   isAbsoluteURL(url) {
    try {
      const res = new URL(url);
      return !!res;
    } catch (_) {
      return false;
    }
  },
   /**
    * @description 相对地址转绝对地址。
    * @private
    * @param {string} url - 相对地址。
    * @param {string} base - 基础地址。
    * @returns {string} 完整地址。
    */
  relative2absolute(url, base) {
    let newUrl = new URL(url, base);
    if (newUrl && newUrl.href) {
      return decodeURIComponent(newUrl.href);
    }
    return;
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
Util_Util.extend(INCHES_PER_UNIT, {
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
Util_Util.extend(INCHES_PER_UNIT, {
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



;// ./src/common/commontypes/Event.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
     element: function (event) {
         return event.target || event.srcElement;
     },

     /**
      * @description 判断事件是否由单次触摸引起。
      * @param {Event} event - Event 对象。
      * @returns {boolean} 是否有且只有一个当前在与触摸表面接触的 Touch 对象。
      */
     isSingleTouch: function (event) {
         return event.touches && event.touches.length === 1;
     },

     /**
      * @description 判断事件是否由多点触控引起。
      * @param {Event} event - Event 对象。
      * @returns {boolean} 是否存在多个当前在与触摸表面接触的 Touch 对象。
      */
     isMultiTouch: function (event) {
         return event.touches && event.touches.length > 1;
     },

     /**
      * @description 确定事件是否由左键单击引起。
      * @param {Event} event - Event 对象。
      * @returns {boolean} 是否点击鼠标左键。
      */
     isLeftClick: function (event) {
         return (((event.which) && (event.which === 1)) ||
             ((event.button) && (event.button === 1)));
     },

     /**
      * @description 确定事件是否由鼠标右键单击引起。
      * @param {Event} event - Event 对象。
      * @returns {boolean} 是否点击鼠标右键。
      */
     isRightClick: function (event) {
         return (((event.which) && (event.which === 3)) ||
             ((event.button) && (event.button === 2)));
     },

     /**
      * @description 阻止事件冒泡。
      * @param {Event} event - Event 对象。
      * @param {boolean} allowDefault - 默认为 false，表示阻止事件的默认行为。
      */
     stop: function (event, allowDefault) {

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
     findElement: function (event, tagName) {
         var element = Event.element(event);
         while (element.parentNode && (!element.tagName ||
             (element.tagName.toUpperCase() != tagName.toUpperCase()))) {
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
     observe: function (elementParam, name, observer, useCapture) {
         var element = Util_Util.getElement(elementParam);
         useCapture = useCapture || false;

         if (name === 'keypress' &&
             (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
                 || element.attachEvent)) {
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
             if(name === 'mousewheel'){
                 // https://www.chromestatus.com/features/6662647093133312
                 element.addEventListener(name, observer, {useCapture: useCapture, passive: false} );
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
     stopObservingElement: function (elementParam) {
         var element = Util_Util.getElement(elementParam);
         var cacheID = element._eventCacheID;
         this._removeElementObservers(Event.observers[cacheID]);
     },
     _removeElementObservers: function (elementObservers) {
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
     stopObserving: function (elementParam, name, observer, useCapture) {
         useCapture = useCapture || false;

         var element = Util_Util.getElement(elementParam);
         var cacheID = element._eventCacheID;

         if (name === 'keypress') {
             if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) ||
                 element.detachEvent) {
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

                 if ((cacheEntry.name === name) &&
                     (cacheEntry.observer === observer) &&
                     (cacheEntry.useCapture === useCapture)) {

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
     unloadCache: function () {
         // check for Event before checking for observers, because
         // Event may be undefined in IE if no map instance was
         // created
         if (Event && Event.observers) {
             for (var cacheID in Event.observers) {
                 var elementObservers = Event.observers[cacheID];
                 Event._removeElementObservers.apply(this,
                     [elementObservers]);
             }
             Event.observers = false;
         }
     },

     CLASS_NAME: "SuperMap.Event"
 };
 /* prevent memory leaks in IE */
 Event.observe(window, 'resize', Event.unloadCache, false);

;// ./src/common/commontypes/Events.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class Events {

    constructor(object, element, eventTypes, fallThrough, options) {
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
        this.BROWSER_EVENTS = [
            "mouseover", "mouseout",
            "mousedown", "mouseup", "mousemove",
            "click", "dblclick", "rightclick", "dblrightclick",
            "resize", "focus", "blur",
            "touchstart", "touchmove", "touchend",
            "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup",
            "MSGestureStart", "MSGestureChange", "MSGestureEnd",
            "contextmenu"
        ];

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
    destroy() {
        for (var e in this.extensions) {
            if (typeof this.extensions[e] !== "boolean") {
                this.extensions[e].destroy();
            }
        }
        this.extensions = null;
        if (this.element) {
            Event.stopObservingElement(this.element);
            if (this.element.hasScrollEvent) {
                Event.stopObserving(
                    window, "scroll", this.clearMouseListener
                );
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
    addEventType(eventName) {
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
    attachToElement(element) {
        if (this.element) {
            Event.stopObservingElement(this.element);
        } else {
            // keep a bound copy of handleBrowserEvent() so that we can
            // pass the same function to both Event.observe() and .stopObserving()
            this.eventHandler = FunctionExt.bindAsEventListener(
                this.handleBrowserEvent, this
            );

            // to be used with observe and stopObserving
            this.clearMouseListener = FunctionExt.bind(
                this.clearMouseCache, this
            );
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
    on(object) {
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
    register(type, obj, func, priority) {
        if (type in Events && !this.extensions[type]) {
            this.extensions[type] = new Events[type](this);
        }
        if ((func != null) &&
            (Util_Util.indexOf(this.eventTypes, type) !== -1)) {

            if (obj == null) {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            if (!listeners) {
                listeners = [];
                this.listeners[type] = listeners;
                this.extensionCount[type] = 0;
            }
            var listener = {obj: obj, func: func};
            if (priority) {
                listeners.splice(this.extensionCount[type], 0, listener);
                if (typeof priority === "object" && priority.extension) {
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
    registerPriority(type, obj, func) {
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
    un(object) {
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
    unregister(type, obj, func) {
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
    remove(type) {
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
    triggerEvent(type, evt) {
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

            if ((continueChain != undefined) && (continueChain === false)) {
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
    handleBrowserEvent(evt) {
        var type = evt.type, listeners = this.listeners[type];
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
    clearMouseCache() {
        this.element.scrolls = null;
        this.element.lefttop = null;
        var body = document.body;
        if (body && !((body.scrollTop != 0 || body.scrollLeft != 0) &&
                navigator.userAgent.match(/iPhone/i))) {
            this.element.offsets = null;
        }
    }

    /**
     * @function Events.prototype.getMousePosition
     * @description 获取当前鼠标的位置。
     * @param {Event} evt - 事件对象。
     * @returns {Pixel} 当前的鼠标的 xy 坐标点。
     */
    getMousePosition(evt) {
        if (!this.includeXY) {
            this.clearMouseCache();
        } else if (!this.element.hasScrollEvent) {
            Event.observe(window, "scroll", this.clearMouseListener);
            this.element.hasScrollEvent = true;
        }

        if (!this.element.scrolls) {
            var viewportElement = Util_Util.getViewportElement();
            this.element.scrolls = [
                viewportElement.scrollLeft,
                viewportElement.scrollTop
            ];
        }

        if (!this.element.lefttop) {
            this.element.lefttop = [
                (document.documentElement.clientLeft || 0),
                (document.documentElement.clientTop || 0)
            ];
        }

        if (!this.element.offsets) {
            this.element.offsets = Util_Util.pagePosition(this.element);
        }

        return new Pixel(
            (evt.clientX + this.element.scrolls[0]) - this.element.offsets[0]
            - this.element.lefttop[0],
            (evt.clientY + this.element.scrolls[1]) - this.element.offsets[1]
            - this.element.lefttop[1]
        );
    }

}
Events.prototype.BROWSER_EVENTS = [
  "mouseover", "mouseout",
  "mousedown", "mouseup", "mousemove",
  "click", "dblclick", "rightclick", "dblrightclick",
  "resize", "focus", "blur",
  "touchstart", "touchmove", "touchend",
  "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup",
  "MSGestureStart", "MSGestureChange", "MSGestureEnd",
  "contextmenu"
];

;// ./src/common/thirdparty/elasticsearch/ElasticSearch.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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

class ElasticSearch {

    constructor(url, es, options) {
        if (!es || (typeof es !== 'function' && typeof es !== 'object') || typeof es.Client !== 'function') {
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

    setGeoFence(geoFence) {
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
    bulk(params, callback) {
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
    clearScroll(params, callback) {
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
    count(params, callback) {
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
    create(params, callback) {
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
    delete(params, callback) {
        return this.client.delete(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype.deleteByQuery
     * @description 根据其ID从特定索引中删除键入的JSON文档。
     * 参数设置参考 {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletebyquery}</br>
     * 更多信息参考 {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html}</br>
     * @param {Object} params - 参数。
     * @param {function} callback - 回调函数。
     */
    deleteByQuery(params, callback) {
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
    deleteScript(params, callback) {
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
    deleteTemplate(params, callback) {
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
    exists(params, callback) {
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

    existsSource(params, callback) {
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
    explain(params, callback) {
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
    fieldCaps(params, callback) {
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
    get(params, callback) {
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
    getScript(params, callback) {
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
    getSource(params, callback) {
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
    getTemplate(params, callback) {
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
    index(params, callback) {
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
    info(params, callback) {
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
    mget(params, callback) {
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
    msearch(params, callback) {
        let me = this;

        return me.client.msearch(params)
            .then(function (resp) {
                resp = resp.body || resp;
                me._update(resp.responses, callback);
                return resp;
            }, function (err) {
                callback(err);
                me.events.triggerEvent('error', {error: err});
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
    msearchTemplate(params, callback) {
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
    mtermvectors(params, callback) {
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
    ping(params, callback) {
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
    putScript(params, callback) {
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
    putTemplate(params, callback) {
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
    reindex(params, callback) {
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
    reindexRessrottle(params, callback) {
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
    renderSearchTemplate(params, callback) {
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
    scroll(params, callback) {
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
    search(params, callback) {
        let me = this;
        return me.client.search(params)
            .then(function (resp) {
                resp = resp.body || resp;
                me._update(resp, callback);
                return resp;
            }, function (err) {
                callback && callback(err);
                me.events.triggerEvent('error', {error: err});
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
    searchShards(params, callback) {
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
    searchTemplate(params, callback) {
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
    suggest(params, callback) {
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
    termvectors(params, callback) {
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
    update(params, callback) {
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
    updateByQuery(params, callback) {
        return this.client.updateByQuery(params, this._handleCallback(callback));
    }

    /**
     * @function ElasticSearch.prototype._handleCallback
     * @description 处理ElasticSearch 16.x和5.x的callback兼容。 5.x的回调参数多包了一层body
     * @param {function} callback - 回调函数。
     * @private
     */
    _handleCallback(callback) {
      return function () {
        let args = Array.from(arguments);
        const error = args.shift();
        let resp = args.shift();
        const body = resp && resp.body;
        if (body) {
          const { statusCode, headers } = resp;
          args = [statusCode, headers];
          resp = body;
        }
        callback.call(this, error, resp, ...args);
      };
    }

    _update(data, callback) {
        let me = this;
        if (!data) {
            return;
        }
        me.data = data;
        if (me.openGeoFence && me.geoFence) {
            me._validateDatas(data);
        }
        me.events.triggerEvent('change', {data: me.data});
        //change方法已废弃，不建议使用。建议使用search方法的第二个参数传入请求成功的回调
        if (me.change) {
            me.change && me.change(data);
        } else {
            //加responses是为了保持跟原来es自身的数据结构一致
            callback && callback(undefined, {responses: data});
        }
    }

    _validateDatas(datas) {
        if (!datas) {
            return;
        }
        if (!(datas instanceof Array)) {
            datas = [datas];
        }
        var i, len = datas.length;
        for (i = 0; i < len; i++) {
            this._validateData(datas[i]);
        }
    }

    _validateData(data) {
        let me = this;
        data.hits.hits.map(function (source) {
            let content = source._source;
            let meterUnit = me._getMeterPerMapUnit(me.geoFence.unit);
            let geoFenceCX = me.geoFence.center[0] * meterUnit;
            let geoFenceCY = me.geoFence.center[1] * meterUnit;
            let contentX = content.x * meterUnit;
            let contentY = content.y * meterUnit;
            let distance = me._distance(contentX, contentY, geoFenceCX, geoFenceCY);
            let radius = me.geoFence.radius;
            if (distance > radius) {
                me.outOfGeoFence && me.outOfGeoFence(data);
                me.events.triggerEvent('outOfGeoFence', {data: data});
            }
            return source;
        });
    }

    _distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    _getMeterPerMapUnit(mapUnit) {
        let earchRadiusInMeters = 6378137;
        let meterPerMapUnit;
        if (mapUnit === 'meter') {
            meterPerMapUnit = 1;
        } else if (mapUnit === 'degree') {
            // 每度表示多少米。
            meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
        }
        return meterPerMapUnit;
    }

}


// EXTERNAL MODULE: ./node_modules/promise-polyfill/dist/polyfill.js
var polyfill = __webpack_require__(836);
// EXTERNAL MODULE: ./node_modules/fetch-ie8/fetch.js
var fetch = __webpack_require__(444);
// EXTERNAL MODULE: ./node_modules/fetch-jsonp/build/fetch-jsonp.js
var fetch_jsonp = __webpack_require__(348);
var fetch_jsonp_default = /*#__PURE__*/__webpack_require__.n(fetch_jsonp);
;// ./src/common/util/FetchRequest.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





let FetchRequest_fetch = window.fetch;
var setFetch = function (newFetch) {
    FetchRequest_fetch = newFetch;
}
var RequestJSONPPromise = {
  limitLength: 1500,
  queryKeys: [],
  queryValues: [],
  supermap_callbacks: {},
  addQueryStrings: function (values) {
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
  issue: function (config) {
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
      return me.send(
          splitQuestUrl,
          'SuperMapJSONPCallbacks_' + uid,
          config && config.proxy
      );
  },

  getUid: function () {
      var uid = new Date().getTime(),
          random = Math.floor(Math.random() * 1e17);
      return uid * 1000 + random;
  },

  send: function (splitQuestUrl, callback, proxy) {
      var len = splitQuestUrl.length;
      if (len > 0) {
         return new Promise((resolve) => {
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
              }).then((result) => {
                resolve(result.json());
              });
          }
         })
      }
  },

  GET: function (config) {
      var me = this;
      me.queryKeys.length = 0;
      me.queryValues.length = 0;
      me.addQueryStrings(config.params);
      return me.issue(config);
  },

  POST: function (config) {
      var me = this;
      me.queryKeys.length = 0;
      me.queryValues.length = 0;
      me.addQueryStrings({
          requestEntity: config.data
      });
      return me.issue(config);
  },

  PUT: function (config) {
      var me = this;
      me.queryKeys.length = 0;
      me.queryValues.length = 0;
      me.addQueryStrings({
          requestEntity: config.data
      });
      return me.issue(config);
  },
  DELETE: function (config) {
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
var RequestHeadersGetter;
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
var setCORS = function (cors) {
    CORS = cors;
}
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
var isCORS = function () {
    if (CORS != undefined) {
        return CORS;
    }
    return window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest();
}
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
var setRequestTimeout = function (timeout) {
    return RequestTimeout = timeout;
}
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
var getRequestTimeout = function () {
    return RequestTimeout || 45000;
}

/**
 * @function setRequestHeaders
 * @version 12.0.0-r
 * @category BaseTypes Util
 * @description 设置请求自定义 request headers。
 * @param {function} func - 请求自定义 request headers 回调函数。
 * @usage
 * ```
 * // 浏览器
  <script type="text/javascript" src="{cdn}"></script>
  <script>
    const headers = function (url) { return { token: !!url }; };
    {namespace}.setRequestHeaders(headers);

  </script>

  // ES6 Import
  import { setRequestHeaders } from '{npm}';

  const headers = function (url) { return { token: !!url }; };
  setRequestHeaders(headers);
 * ```
 */
var setRequestHeaders = function (headers) {
    return RequestHeadersGetter = headers;
}

/**
 * @private
 * @function getRequestTimeout
 * @category BaseTypes Util
 * @description 获取请求超时的时间。
 * @returns {number} 请求超时时间。
 */
var getRequestHeaders = function () {
    return RequestHeadersGetter;
}

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
    commit: function (method, url, params, options) {
        method = method ? method.toUpperCase() : method;
        switch (method) {
            case 'GET':
                return this.get(url, params, options);
            case 'POST':
                return this.post(url, params, options);
            case 'PUT':
                return this.put(url, params, options);
            case 'DELETE':
                return this.delete(url, params, options);
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
    supportDirectRequest: function (url, options) {
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
    get: function (url, params, options) {
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
    delete: function (url, params, options) {
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
    post: function (url, params, options) {
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
    put: function (url, params, options) {
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
    urlIsLong: function (url) {
        //当前url的字节长度。
        var totalLength = 0,
            charCode = null;
        for (var i = 0, len = url.length; i < len; i++) {
            //转化为Unicode编码
            charCode = url.charCodeAt(i);
            if (charCode < 0x007f) {
                totalLength++;
            } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
                totalLength += 2;
            } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
                totalLength += 3;
            }
        }
        return totalLength < 2000 ? false : true;
    },
    _postSimulatie: function (type, url, params, options) {
        var separator = url.indexOf('?') > -1 ? '&' : '?';
        url += separator + '_method=' + type;
        if (typeof params !== 'string') {
            params = JSON.stringify(params);
        }
        return this.post(url, params, options);
    },

    _processUrl: function (url, options) {
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

    _fetch: function (url, params, options, type) {
        options = options || {};
        options.headers = options.headers || {};
        if (!options.headers['Content-Type'] && !FormData.prototype.isPrototypeOf(params)) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        const customRequestHeadersGetter = getRequestHeaders();
        const customRequestHeaders = customRequestHeadersGetter && customRequestHeadersGetter(url);
        if (customRequestHeaders) {
            options.headers = Util_Util.extend(options.headers, customRequestHeaders);
        }
        if (options.timeout) {
            return this._timeout(
                options.timeout,
                FetchRequest_fetch(url, {
                    method: type,
                    headers: options.headers,
                    body: type === 'PUT' || type === 'POST' ? params : undefined,
                    credentials: this._getWithCredentials(options),
                    mode: 'cors',
                    timeout: getRequestTimeout()
                }).then(function (response) {
                    return response;
                })
            );
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

    _getWithCredentials: function (options) {
        if (options.withCredentials === true) {
            return 'include';
        }
        if (options.withCredentials === false) {
            return 'omit';
        }
        return 'same-origin';
    },

    _fetchJsonp: function (url, options) {
        options = options || {};
        return fetch_jsonp_default()(url, {
            method: 'GET',
            timeout: options.timeout
        }).then(function (response) {
            return response;
        });
    },

    _timeout: function (seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error('timeout'));
            }, seconds);
            promise.then(resolve, reject);
        });
    },

    _getParameterString: function (params) {
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

    _isMVTRequest: function (url) {
        return url.indexOf('.mvt') > -1 || url.indexOf('.pbf') > -1;
    }
}

;// ./src/common/commontypes/Credential.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class Credential {

    constructor(value, name) {

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
    getUrlParameters() {
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
    getValue() {
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
    destroy() {
        this.value = null;
        this.name = null;
    }

}

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

;// ./src/common/security/SecurityManager.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SecurityManager {
    /**
     * @description 从服务器获取一个token,在此之前要注册服务器信息。
     * @function SecurityManager.generateToken
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @param {TokenServiceParameter} tokenParam - token 申请参数。
     * @returns {Promise} 包含 token 信息的 Promise 对象。
     */

    static generateToken(url, tokenParam) {
        var serverInfo = this.servers[url];
        if (!serverInfo) {
            return;
        }
        return FetchRequest.post(serverInfo.tokenServiceUrl, JSON.stringify(tokenParam.toJSON())).then(function(
            response
        ) {
            return response.text();
        });
    }

    /**
     * @description 注册安全服务器相关信息。
     * @function SecurityManager.registerServers
     * @param {ServerInfo} serverInfos - 服务器信息。
     */
    static registerServers(serverInfos) {
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
    static registerToken(url, token) {
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
    static registerKey(ids, key) {
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
    static getServerInfo(url) {
        this.servers = this.servers || {};
        return this.servers[url];
    }

    /**
     * @description 根据 URL 获取token。
     * @function SecurityManager.getToken
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @returns {string} token。
     */
    static getToken(url) {
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
    static getKey(id) {
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
    static loginiServer(url, username, password, rememberme) {
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
        return FetchRequest.post(url, loginInfo, requestOptions).then(function(response) {
            return response.json();
        });
    }

    /**
     * @description SuperMap iServer 登出。
     * @function SecurityManager.logoutiServer
     * @param {string} url - SuperMap iServer 首页地址，如：http://localhost:8090/iserver。
     * @returns {Promise} 是否登出成功。
     */
    static logoutiServer(url) {
        url = Util_Util.urlPathAppend(url, 'services/security/logout');
        var requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            withoutFormatSuffix: true
        };
        return FetchRequest.get(url, '', requestOptions)
            .then(function() {
                return true;
            })
            .catch(function() {
                return false;
            });
    }

    /**
     * @description Online 登录验证。
     * @function SecurityManager.loginOnline
     * @param {string} callbackLocation - 跳转位置。
     * @param {boolean} [newTab=true] - 是否新窗口打开。
     */
    static loginOnline(callbackLocation, newTab) {
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
    static loginiPortal(url, username, password) {
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
        return FetchRequest.post(url, loginInfo, requestOptions).then(function(response) {
            return response.json();
        });
    }

    /**
     * @description SuperMap iPortal 登出。
     * @function SecurityManager.logoutiPortal
     * @param {string} url - SuperMap iPortal 首页地址，如：http://localhost:8092/iportal。
     * @returns {Promise} 如果登出成功，返回 true;否则返回 false。
     */
    static logoutiPortal(url) {
        url = Util_Util.urlPathAppend(url, 'services/security/logout');
        var requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            withCredentials: true,
            withoutFormatSuffix: true
        };
        return FetchRequest.get(url, '', requestOptions)
            .then(function() {
                return true;
            })
            .catch(function() {
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
    static loginManager(url, loginInfoParams) {
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
        return FetchRequest.post(requestUrl, loginInfo, requestOptions).then(function(response) {
          return response.text();
        }).then(function(result) {
          me.imanagerToken = result;
          return result;
        });
    }

    /**
     * @description 清空全部验证信息。
     * @function SecurityManager.destroyAllCredentials
     */
    static destroyAllCredentials() {
        this.keys = null;
        this.tokens = null;
        this.servers = null;
    }

    /**
     * @description 清空令牌信息。
     * @function SecurityManager.destroyToken
     * @param {string} url - SuperMap iPortal 首页地址，如：http://localhost:8092/iportal。
     */
    static destroyToken(url) {
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
    static destroyKey(url) {
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
    static appendCredential(url) {
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

    static _open(url, newTab) {
        newTab = newTab != null ? newTab : true;
        var offsetX = window.screen.availWidth / 2 - this.INNER_WINDOW_WIDTH / 2;
        var offsetY = window.screen.availHeight / 2 - this.INNER_WINDOW_HEIGHT / 2;
        var options =
            'height=' +
            this.INNER_WINDOW_HEIGHT +
            ', width=' +
            this.INNER_WINDOW_WIDTH +
            ',top=' +
            offsetY +
            ', left=' +
            offsetX +
            ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
        if (newTab) {
            window.open(url, 'login');
        } else {
            window.open(url, 'login', options);
        }
    }

    static _getTokenStorageKey(url) {
        var patten = /(.*?):\/\/([^\/]+)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    }

    static _getUrlRestString(url) {
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
}
SecurityManager.INNER_WINDOW_WIDTH = 600;
SecurityManager.INNER_WINDOW_HEIGHT = 600;
SecurityManager.SSO = 'https://sso.supermap.com';
SecurityManager.ONLINE = 'https://www.supermapol.com';

;// ./src/common/REST.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
    GEOCOMPOUND:"GEOCOMPOUND"
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
}

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
var OutputType =  {
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
var GridType =  {
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
  AVG:'avg',
  /** 最大值聚合类型。 */
  MAX:'max',
  /** 最小值聚合类型。 */
  MIN:'min',
  /** 求和聚合类型。 */
  SUM:'sum'
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
}

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
}

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
}

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
}

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
}

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
}

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
}

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
    SEARCH:"SEARCH",
    /** 可查看。 */
    READ: "READ",
    /** 可编辑。 */
    READWRITE: "READWRITE",
    /** 可删除。 */
    DELETE: "DELETE",
    /** 可下载，包括可查看、可检索。 */
    DOWNLOAD:"DOWNLOAD"
}

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
}

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
}

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
}

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
}

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
}

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
}

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
}

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
  MAX : "MAX",
  /** 输入栅格数据集中单元格最小值作为单元格大小类型。 */
  MIN : "MIN"
}

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
  DUSK : "DUSK",
  /** 夜晚模式。 */
  NIGHT : "NIGHT"
}

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
  STANDARD : "STANDARD",
  /** 其他显示模式。 */
  OTHER : "OTHER"
}



;// ./src/common/iServer/DatasourceConnectionInfo.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class DatasourceConnectionInfo {


    constructor(options) {

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
    destroy() {
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

}

;// ./src/common/iServer/OutputSetting.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class OutputSetting {

    constructor(options) {

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
    destroy() {
        var me = this;
        me.type = null;
        me.datasetName = null;
        me.outputPath = null;
        if (me.datasourceInfo instanceof DatasourceConnectionInfo) {
            me.datasourceInfo.destroy();
            me.datasourceInfo = null;
        }
    }

}

;// ./src/common/iServer/MappingParameters.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class MappingParameters {

    constructor(options) {

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
    destroy() {
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

}

;// ./src/common/iServer/KernelDensityJobParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class KernelDensityJobParameter {

    constructor(options) {
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
    destroy() {
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
    static toObject(kernelDensityJobParameter, tempObj) {
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
}

;// ./src/common/iServer/SingleObjectQueryJobsParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SingleObjectQueryJobsParameter {

    constructor(options) {
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
    destroy() {
        this.datasetName = null;
        this.datasetQuery = null;
        this.geometryQuery = null;
        this.mode = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
        if (this.mappingParameters instanceof MappingParameters){
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
    static toObject(singleObjectQueryJobsParameter, tempObj) {
        for (var name in singleObjectQueryJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = singleObjectQueryJobsParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = singleObjectQueryJobsParameter[name];
                continue;
            }

            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = singleObjectQueryJobsParameter[name];
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = singleObjectQueryJobsParameter[name];
            }
        }
    }

}


;// ./src/common/iServer/SummaryAttributesJobsParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SummaryAttributesJobsParameter {

    constructor(options) {
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
    destroy() {
        this.datasetName = null;
        this.groupField = null;
        this.attributeField = null;
        this.statisticModes = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
        if (this.mappingParameters instanceof MappingParameters){
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
    static toObject(SummaryAttributesJobsParameter, tempObj) {
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
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = SummaryAttributesJobsParameter[name];
            }
        }
    }

}

;// ./src/common/iServer/SummaryMeshJobParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SummaryMeshJobParameter {

    constructor(options) {
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
    destroy() {
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
        if (this.mappingParameters instanceof MappingParameters){
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
    static toObject(summaryMeshJobParameter, tempObj) {
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
                if(name === 'mappingParameters'){
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

}


;// ./src/common/iServer/SummaryRegionJobParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SummaryRegionJobParameter {

    constructor(options) {
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
    destroy() {
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
        if (this.mappingParameters instanceof MappingParameters){
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
    static toObject(summaryRegionJobParameter, tempObj) {
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
                if(name === 'mappingParameters'){
                    tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                    tempObj['analyst']['mappingParameters'] = summaryRegionJobParameter[name];
                }

            }
        }
    }

}


;// ./src/common/iServer/OverlayGeoJobParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class OverlayGeoJobParameter {

    constructor(options) {
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
    destroy() {
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
    static toObject(OverlayGeoJobParameter, tempObj) {
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
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = OverlayGeoJobParameter[name];
            }
        }
    }

}

;// ./src/common/iServer/BuffersAnalystJobsParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class BuffersAnalystJobsParameter {
    constructor(options) {
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
    destroy() {
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
    static toObject(BuffersAnalystJobsParameter, tempObj) {
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
}


;// ./src/common/iServer/TopologyValidatorJobsParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class TopologyValidatorJobsParameter {

    constructor(options) {
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
    destroy() {
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
    static toObject(TopologyValidatorJobsParameter, tempObj) {
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
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = TopologyValidatorJobsParameter[name];
            }
        }
    }
}

;// ./src/common/iServer/GeoCodingParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class GeoCodingParameter {
    constructor(options) {
        if (options.filters && typeof(options.filters) === 'string') {
            options.filters =  options.filters.split(',');
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
    destroy() {
        this.address = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
    }

}

;// ./src/common/iServer/GeoDecodingParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class GeoDecodingParameter {


    constructor(options) {

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
    destroy() {
        this.x = null;
        this.y = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
        this.geoDecodingRadius = null;
    }

}

;// ./src/common/iServer/VectorClipJobsParameter.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class VectorClipJobsParameter {

    constructor(options) {
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
    destroy() {
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
    static toObject(vectorClipJobsParameter, tempObj) {
        for (var name in vectorClipJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = vectorClipJobsParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = vectorClipJobsParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = vectorClipJobsParameter[name];
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = vectorClipJobsParameter[name];
            }
        }
    }

}


;// ./src/classic/SuperMap.js
var SuperMap = window.SuperMap = window.SuperMap || {};
SuperMap.REST = SuperMap.REST || {};

;// external "function(){try{return mapv}catch(e){return {}}}()"
const external_function_try_return_mapv_catch_e_return_namespaceObject = function(){try{return mapv}catch(e){return {}}}();
;// ./src/common/util/MapCalculateUtil.js


/**
 * @private
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
var getMeterPerMapUnit = function(mapUnit) {
    var meterPerMapUnit;
    if(!mapUnit){
      return meterPerMapUnit;
    }
    var earchRadiusInMeters = 6378137;
    
    if (['m','meter','meters'].indexOf(mapUnit.toLocaleLowerCase())>-1) {
        meterPerMapUnit = 1;
    } else if (['degrees','deg','degree','dd'].indexOf(mapUnit.toLocaleLowerCase())>-1) {
        // 每度表示多少米。
        meterPerMapUnit = (Math.PI * 2 * earchRadiusInMeters) / 360;
    } else if (mapUnit === Unit.KILOMETER) {
        meterPerMapUnit = 1000;
    } else if (mapUnit === Unit.INCH) {
        meterPerMapUnit = 2.5399999918e-2;
    } else if (mapUnit === Unit.FOOT) {
        meterPerMapUnit = 0.3048;
    }
    return meterPerMapUnit;
};

/**
 * @private
 * @function getSquareMeterPerMapUnit
 * @description 单位换算，把平方米|平方千米|平方英寸|平方英尺换算成平方米。
 * @category BaseTypes Util
 * @param {string} mapUnit 需要换算的地图面积单位。
 * @returns {number} 返回地图的面积单位。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.getSquareMeterPerMapUnit(mapUnit);
 *
 * </script>
 *
 * // ES6 Import
 * import { getMeterPerMapUnit } from '{npm}';
 *
 * const result = getMeterPerMapUnit(mapUnit);
 * ```
 */

const AREA_MAP = {
  SquareFoot: 10.763910417,
  SquareKiloMeter: 0.000001,
  SquareMeter: 1,
  SquareMile: 3.86e-7,
  SquareYard: 1.195990046
}

var getSquareMeterPerMapUnit = function(mapUnit) {
  return AREA_MAP[mapUnit];
};



/**
 * @private
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
function getWrapNum(x, includeMax = true, includeMin = true, range = [-180, 180]) {
    var max = range[1],
        min = range[0],
        d = max - min;
    if (x === max && includeMax) {
        return x;
    }
    if (x === min && includeMin) {
        return x;
    }
    var tmp = (((x - min) % d) + d) % d;
    if (tmp === 0 && includeMax) {
        return max;
    }
    return ((((x - min) % d) + d) % d) + min;
}

/**
 * @private
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
    const degree = parseInt(degrees);
    let fraction = parseInt((degrees - degree) * 60);
    let second = parseInt(((degrees - degree) * 60 - fraction) * 60);
    fraction = parseInt(fraction / 10) === 0 ? `0${fraction}` : fraction;
    second = parseInt(second / 10) === 0 ? `0${second}` : second;
    return `${degree}°${fraction}'${second}`;
}

/**
  * @private
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
 function scalesToResolutions(scales, bounds, dpi, mapUnit, level = 22, baseScale) {
  var resolutions = [];
  if (scales && scales.length > 0) {
    for (let i = 0; i < scales.length; i++) {
      resolutions.push(scaleToResolution(scales[i], dpi, mapUnit));
    }
  } else if (baseScale){
    const maxReolution = Math.abs(bounds.left - bounds.right) / 256;
    const baseRes = scaleToResolution(baseScale, dpi, mapUnit);
    let topRes = baseRes;
    for (let i = 0; i < level; i++) {
      const temp = baseRes * Math.pow(2, i);
      if(Math.abs(temp,maxReolution)<= 1E-6 || temp>maxReolution){
        topRes = temp;
        break;
      }
    }
    for (let i = 0; i < level; i++) {
      resolutions.push(topRes / Math.pow(2, i));
    }
  } else {
    const maxReolution = Math.abs(bounds.left - bounds.right) / 256;
    for (let i = 0; i < level; i++) {
      resolutions.push(maxReolution / Math.pow(2, i));
    }
  }
  return resolutions.sort(function (a, b) {
    return b - a;
  });
}
/**
  * @private
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
  let zoom = 0;
  let minDistance;
  for (let i = 0; i < resolutions.length; i++) {
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
  * @private
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
  const inchPerMeter = 1 / 0.0254;
  const meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
  const resolution = 1 / (scale * dpi * inchPerMeter * meterPerMapUnitValue);
  return resolution;
}

function getDpi(scale, resolution, mapUnit) {
  const inchPerMeter = 1 / 0.0254;
  const meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
  const dpi = 1.0/resolution/(scale * inchPerMeter * meterPerMapUnitValue);
  return dpi;
}

/**
 * @private
 * 范围是否相交。
 * @param {Array} extent1 范围 1。
 * @param {Array} extent2 范围 2。
 * @return {boolean} 范围是否相交。
 */
 function intersects(extent1, extent2) {
  return (
    extent1[0] <= extent2[2] &&
    extent1[2] >= extent2[0] &&
    extent1[1] <= extent2[3] &&
    extent1[3] >= extent2[1]
  );
}

/**
 * @private
 * 获取两个范围的交集。
 * @param {Array} extent1 范围 1。
 * @param {Array} extent2 范围 2。
 * @return {Array} 相交范围数组。
 * @api
 */
 function getIntersection(extent1, extent2) {
  const intersection = [];
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
;// ./src/classic/overlay/mapv/MapVRenderer.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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

class MapVRenderer extends MapVBaseLayer {
    constructor(map, layer, dataSet, options) {
        super(map, dataSet, options);
        if (!MapVBaseLayer) {
            return this;
        }

        var self = this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        this.canvasLayer = layer;
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        this.bindEvent();
    }

    /**
     * @function MapvRenderer.prototype.clickEvent
     * @description 点击事件。
     * @param {Object} e -  触发对象。
     */
    clickEvent(e) {
        var pixel = e.xy;
        var devicePixelRatio = this.devicePixelRatio || 1;
        super.clickEvent({ x: pixel.x / devicePixelRatio, y: pixel.y / devicePixelRatio }, e);
    }

    /**
     * @function MapvRenderer.prototype.mousemoveEvent
     * @description 鼠标移动事件。
     * @param {Object} e - 触发对象。
     */
    mousemoveEvent(e) {
        var pixel = e.xy;
        super.mousemoveEvent(pixel, e);
    }

    /**
     * @function MapvRenderer.prototype.bindEvent
     * @description 绑定鼠标移动和鼠标点击事件。
     */
    bindEvent() {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.events.on({ click: this.clickEvent });
            }
            if (this.options.methods.mousemove) {
                map.events.on({ mousemove: this.mousemoveEvent });
            }
        }
    }

    /**
     * @function MapvRenderer.prototype.unbindEvent
     * @description 解绑鼠标移动和鼠标滑动触发的事件。
     */
    unbindEvent() {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.events.un({ click: this.clickEvent });
            }
            if (this.options.methods.mousemove) {
                map.events.un({ mousemove: this.mousemoveEvent });
            }
        }
    }

    /**
     * @function MapvRenderer.prototype.getContext
     * @description 获取信息。
     */
    getContext() {
        return this.canvasLayer && this.canvasLayer.canvasContext;
    }

    /**
     * @function MapvRenderer.prototype.addData
     * @description 追加数据
     * @param {Object} data - 待添加的数据。
     * @param {Object} options - 待添加的数据信息。
     */
    addData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet.add(_data);
        this.update({ options: options });
    }

    /**
     * @function MapvRenderer.prototype.updateData
     * @description 更新覆盖原数据。
     * @param {Object} data - 待更新的数据。
     * @param {Object} options - 待更新的数据信息。
     */
    setData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet = this.dataSet || new external_function_try_return_mapv_catch_e_return_namespaceObject.DataSet();
        this.dataSet.set(_data);
        this.update({ options: options });
    }

    /**
     * @function MapvRenderer.prototype.getData
     * @description 获取数据。
     */
    getData() {
        return this.dataSet;
    }

    /**
     * @function MapvRenderer.prototype.removeData
     * @description 删除符合过滤条件的数据。
     * @param {function} filter - 过滤条件。条件参数为数据项，返回值为 true，表示删除该元素；否则表示不删除。
     */
    removeData(filter) {
        if (!this.dataSet) {
            return;
        }
        var newData = this.dataSet.get({
            filter: function (data) {
                return filter != null && typeof filter === 'function' ? !filter(data) : true;
            }
        });
        this.dataSet.set(newData);
        this.update({ options: null });
    }

    /**
     * @function MapvRenderer.prototype.clearData
     * @description 清除数据。
     */
    clearData() {
        this.dataSet && this.dataSet.clear();
        this.update({ options: null });
    }

    /**
     * @function MapvRenderer.prototype.render
     * @description 着色。
     * @param {number} time
     */
    render(time) {
        this._canvasUpdate(time);
    }

    /**
     * @function MapvRenderer.prototype.transferToMercator
     * @description 墨卡托坐标为经纬度。
     * @deprecated
     */
    transferToMercator() {
        if (this.options.coordType && ['bd09mc', 'coordinates_mercator'].indexOf(this.options.coordType) > -1) {
            var data = this.dataSet.get();
            data = this.dataSet.transferCoordinate(
                data,
                function (coordinates) {
                    var pixel = SuperMap.Projection.transform(
                        {
                            x: coordinates[0],
                            y: coordinates[1]
                        },
                        'EPSG:3857',
                        'EPSG:4326'
                    );
                    return [pixel.x, pixel.y];
                },
                'coordinates',
                'coordinates'
            );
            this.dataSet._set(data);
        }
    }

    _canvasUpdate(time) {
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

        if (
            (self.options.minZoom && map.getZoom() < self.options.minZoom) ||
            (self.options.maxZoom && map.getZoom() > self.options.maxZoom)
        ) {
            return;
        }
        var layer = self.canvasLayer;

        var dataGetOptions = {
            fromColumn: 'coordinates',
            transferCoordinate: function (coordinate) {
                var coord = { lon: coordinate[0], lat: coordinate[1] };
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

        var worldPoint = map.getViewPortPxFromLonLat(layer.transferToMapLatLng({ lon: 0, lat: 0 }));

        this.drawContext(context, data, self.options, worldPoint);

        self.options.updateCallback && self.options.updateCallback(time);
    }

    init(options) {
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
    addAnimatorEvent() {
        this.map.events.on({ movestart: this.animatorMovestartEvent.bind(this) });
        this.map.events.on({ moveend: this.animatorMoveendEvent.bind(this) });
    }

    /**
     * @function MapvRenderer.prototype.clear
     * @description 清除环境。
     * @param {Object} context - 当前环境。
     */
    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    /**
     * @function MapvRenderer.prototype.show
     * @description 展示渲染效果。
     */
    show() {
        this.map.addLayer(this.canvasLayer);
    }

    /**
     * @function MapvRenderer.prototype.hide
     * @description 隐藏渲染效果。
     */
    hide() {
        this.map.removeLayer(this.canvasLayer);
    }

    /**
     * @function MapvRenderer.prototype.draw
     * @description 渲染绘制。
     */
    draw() {
        this.canvasLayer.redraw();
    }
}
;// ./src/classic/overlay/MapVLayer.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class MapVLayer extends SuperMap.Layer {
    constructor(name, options) {
        super(name, options);

        /**
         * @member {Mapv.DataSet} SuperMap.Layer.MapVLayer.prototype.dataSet
         * @description MapV 的 dataset 对象。
         */
        this.dataSet = null;

        /**
         * @member {Object} SuperMap.Layer.MapVLayer.prototype.options
         * @description MapV 绘图风格配置信息。
         */
        this.options = null;

        /**
         * @member {boolean} [SuperMap.Layer.MapVLayer.prototype.supported=false]
         * @description 当前浏览器是否支持 canvas 绘制。决定了 MapV 图是否可用，内部判断使用。
         */
        this.supported = false;

        /**
         * @member {HTMLCanvasElement} SuperMap.Layer.MapVLayer.prototype.canvas
         * @description MapV 图主绘制面板。
         */
        this.canvas = null;

        /**
         * @private
         * @member {CanvasContext} SuperMap.Layer.MapVLayer.prototype.canvasContext
         * @description MapV 图主绘制对象。
         */
        this.canvasContext = null;

        if (options) {
          SuperMap.Util.extend(this, options);
        }

        //MapV图要求使用canvas绘制，判断是否支持
        this.canvas = document.createElement('canvas');
        if (!this.canvas.getContext) {
            return;
        }
        this.supported = true;
        //构建绘图面板
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = 0 + 'px';
        this.canvas.style.left = 0 + 'px';
        this.div.appendChild(this.canvas);
        var context = (this.options && this.options.context) || '2d';
        this.canvasContext = this.canvas.getContext(context);
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio || 1;
        if (context === '2d') {
            this.canvasContext.scale(devicePixelRatio, devicePixelRatio);
        }
        this.attribution =
            "© 2018 百度 <a href='https://mapv.baidu.com' target='_blank'>MapV</a> with <span>© <a target='_blank' href='https://iclient.supermap.io' " +
            "style='color: #08c;text-decoration: none;'>SuperMap iClient</a></span>";

        this.CLASS_NAME = 'SuperMap.Layer.MapVLayer';
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.destroy
     * @description 销毁此图层，销毁后此图层的所有属性为 null。
     * @override
     */
    destroy() {
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
        super.destroy();
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.addData
     * @description 追加数据。
     * @param {Mapv.DataSet} dataSet - MapV 的 dataSet 对象。
     * @param {Object} options - MapV 绘图风格配置信息。
     */
    addData(dataSet, options) {
        this.renderer && this.renderer.addData(dataSet, options);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.
     * @description 设置数据。
     * @param {Mapv.DataSet} dataSet - MapV 的 dataSet 对象。
     * @param {Object} options - MapV 绘图风格配置信息。
     */
    setData(dataSet, options) {
        this.renderer && this.renderer.setData(dataSet, options);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.getData
     * @description 获取数据。
     * @returns {Mapv.DataSet} MapV 的 dataSet 对象。
     */
    getData() {
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
    removeData(filter) {
        this.renderer && this.renderer.removeData(filter);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.clearData
     * @description 清除数据。
     */
    clearData() {
        this.renderer.clearData();
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.setMap
     * @description 图层已经添加到 Map 中。
     *              如果当前浏览器支持 canvas，则开始渲染要素；如果不支持则移除图层。
     * @param {SuperMap.Map} map - 需要绑定的 map 对象。
     */
    setMap(map) {
        super.setMap(map);
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
    moveTo(bounds, zoomChanged, dragging) {
        super.moveTo(bounds, zoomChanged, dragging);
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
    transferToMapLatLng(latLng) {
        var source = 'EPSG:4326',
            dest = 'EPSG:4326';
        var unit = this.map.getUnits() || 'degree';
        if (['m', 'meter'].indexOf(unit.toLowerCase()) > -1) {
            dest = 'EPSG:3857';
        }
        return new SuperMap.LonLat(latLng.lon, latLng.lat).transform(source, dest);
    }
}
SuperMap.Layer.MapVLayer = MapVLayer;

;// ./src/classic/overlay/mapv/index.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

;// ./src/classic/overlay/index.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


;// ./src/common/format/Format.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class Format {


    constructor(options) {
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
    destroy() {
        //用来销毁该格式类，释放相关资源
    }

    /**
     * @function Format.prototype.read
     * @description 从字符串中读取数据。
     * @param {string} data - 读取的数据。
     */
    read(data) { // eslint-disable-line no-unused-vars
        //用来从字符串中读取数据
    }

    /**
     * @function Format.prototype.write
     * @description 将对象写成字符串。
     * @param {Object} object - 可序列化的对象。
     * @returns {string} 对象转化后的字符串。
     */
    write(object) { // eslint-disable-line no-unused-vars
        //用来写字符串
    }
}

;// ./src/common/format/JSON.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class JSONFormat extends Format {

    constructor(options) {
        super(options);
        /**
         * @member {string} [JSONFormat.prototype.indent="    "]
         * @description 用于格式化输出，indent 字符串会在每次缩进的时候使用一次。
         */
        this.indent = "    ";

        /**
         * @member {string} [JSONFormat.prototype.space=" "]
         * @description 用于格式化输出，space 字符串会在名值对的 ":" 后边添加。
         */
        this.space = " ";

        /**
         * @member {string} [JSONFormat.prototype.newline="\n"]
         * @description 用于格式化输出，newline 字符串会用在每一个名值对或数组项末尾。
         */
        this.newline = "\n";

        /**
         * @member {number} [JSONFormat.prototype.level=0]
         * @description 用于格式化输出，表示的是缩进级别。
         */
        this.level = 0;

        /**
         * @member {boolean} [JSONFormat.prototype.pretty=false]
         * @description 是否在序列化的时候使用额外的空格控制结构。在 write 方法中使用。
         */
        this.pretty = false;

        /**
         * @member {boolean} JSONFormat.prototype.nativeJSON
         * @description 判断浏览器是否原生支持 JSON 格式数据。
         */
        this.nativeJSON = (function () {
            return !!(window.JSON && typeof JSON.parse === "function" && typeof JSON.stringify === "function");
        })();

        this.CLASS_NAME = "SuperMap.Format.JSON";
        /**
         * @member JSONFormat.prototype.serialize
         * @description 提供一些类型对象转 JSON 字符串的方法。
         */
        this.serialize = {
            /**
             * @function JSONFormat.serialize.object
             * @description 把对象转换为 JSON 字符串。
             * @param {Object} object - 可序列化的对象。
             * @returns {string} JSON 字符串。
             */
            'object': function (object) {
                // three special objects that we want to treat differently
                if (object == null) {
                    return "null";
                }
                if (object.constructor === Date) {
                    return this.serialize.date.apply(this, [object]);
                }
                if (object.constructor === Array) {
                    return this.serialize.array.apply(this, [object]);
                }
                var pieces = ['{'];
                this.level += 1;
                var key, keyJSON, valueJSON;

                var addComma = false;
                for (key in object) {
                    if (object.hasOwnProperty(key)) {
                        // recursive calls need to allow for sub-classing
                        keyJSON = this.write.apply(this,
                            [key, this.pretty]);
                        valueJSON = this.write.apply(this,
                            [object[key], this.pretty]);
                        if (keyJSON != null && valueJSON != null) {
                            if (addComma) {
                                pieces.push(',');
                            }
                            pieces.push(this.writeNewline(), this.writeIndent(),
                                keyJSON, ':', this.writeSpace(), valueJSON);
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
            'array': function (array) {
                var json;
                var pieces = ['['];
                this.level += 1;

                for (var i = 0, len = array.length; i < len; ++i) {
                    // recursive calls need to allow for sub-classing
                    json = this.write.apply(this,
                        [array[i], this.pretty]);
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
            'string': function (string) {
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
                if (/["\\\x00-\x1f]/.test(string)) {
                    return '"' + string.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    }) + '"';
                }
                return '"' + string + '"';
            },

            /**
             * @function JSONFormat.serialize.number
             * @description 把数字转换成 JSON 字符串。
             * @param {number} number - 可序列化的数字。
             * @returns {string} JSON 字符串。
             */
            'number': function (number) {
                return isFinite(number) ? String(number) : "null";
            },

            /**
             * @function JSONFormat.serialize.boolean
             * @description Transform a boolean into a JSON string.
             * @param {boolean} bool - The boolean to be serialized.
             * @returns {string} A JSON string representing the boolean.
             */
            'boolean': function (bool) {
                return String(bool);
            },

            /**
             * @function JSONFormat.serialize.object
             * @description 将日期对象转换成 JSON 字符串。
             * @param {Date} date - 可序列化的日期对象。
             * @returns {string} JSON 字符串。
             */
            'date': function (date) {
                function format(number) {
                    // Format integers to have at least two digits.
                    return (number < 10) ? '0' + number : number;
                }

                return '"' + date.getFullYear() + '-' +
                    format(date.getMonth() + 1) + '-' +
                    format(date.getDate()) + 'T' +
                    format(date.getHours()) + ':' +
                    format(date.getMinutes()) + ':' +
                    format(date.getSeconds()) + '"';
            }
        };
    }

    /**
     * @function JSONFormat.prototype.read
     * @description 将一个符合 JSON 结构的字符串进行解析。
     * @param {string} json - 符合 JSON 结构的字符串。
     * @param {function} filter - 过滤方法，最终结果的每一个键值对都会调用该过滤方法，并在对应的值的位置替换成该方法返回的值。
     * @returns {(Object|string|Array|number|boolean)} 对象，数组，字符串或数字。
     */
    read(json, filter) {
        var object;
        if (this.nativeJSON) {
            try {
                object = JSON.parse(json, filter);
            } catch (e) {
                // Fall through if the regexp test fails.
                return { data: json}
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
    write(value, pretty) {
        this.pretty = !!pretty;
        var json = null;
        var type = typeof value;
        if (this.serialize[type]) {
            try {
                json = (!this.pretty && this.nativeJSON) ?
                    JSON.stringify(value) :
                    this.serialize[type].apply(this, [value]);
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
    writeIndent() {
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
    writeNewline() {
        return (this.pretty) ? this.newline : '';
    }

    /**
     * @function JSONFormat.prototype.writeSpace
     * @private
     * @description 在格式化输出模式情况下输出一个代表空格的字符串。
     * @returns {string} 空格字符串。
     */
    writeSpace() {
        return (this.pretty) ? this.space : '';
    }

}

;// ./src/common/iServer/CommonServiceBase.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class CommonServiceBase {
    constructor(url, options) {
        let me = this;

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
    destroy() {
        let me = this;
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
    request(options) {
        let format = options.scope.format;
        // 兼容 callback 未传，dataFormat 传入的情况
        if (typeof options.success === 'string') {
          options.scope.format = options.success;
          format = options.success;
          options.success = null;
          options.failure = null;
        }
       
        if (format && !this.supportDataFormat(format)) {
          throw new Error(`${this.CLASS_NAME} is not surport ${format} format!`);
        }
       
        let me = this;
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
    ajaxPolling(options) {
        let me = this,
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
    calculatePollingTimes() {
        let me = this;
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
    isServiceSupportPolling() {
        let me = this;
        return !(
            me.CLASS_NAME === 'SuperMap.REST.ThemeService' || me.CLASS_NAME === 'SuperMap.REST.EditFeaturesService'
        );
    }

    /**
     * @function CommonServiceBase.prototype.transformResult
     * @description 状态完成时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     * @private
     */
    transformResult(result, options) {
        result = Util_Util.transformResult(result);
        return { result, options };
    }

    /**
     * @function CommonServiceBase.prototype.transformErrorResult
     * @description 状态失败时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     * @private
     */
    transformErrorResult(result, options) {
        result = Util_Util.transformResult(result);
        let error = result.error || result;
        return { error, options };
    }

    /**
    * @function CommonServiceBase.prototype.serviceProcessCompleted
    * @description 状态完成，执行此方法。
    * @param {Object} result - 服务器返回的结果对象。
    * @param {Object} options - 请求参数对象。
    * @private
    */
    serviceProcessCompleted(result, options) {
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
    serviceProcessFailed(result, options) {
      result = this.transformErrorResult(result).error;
      let error = result.error || result;
      this.events.triggerEvent('processFailed', {
          error: error,
          options: options
      });
    }

    _returnContent(options) {
      if (options.scope.format === DataFormat.FGB) {
        return false;
      }
      if (options.scope.returnContent) {
        return true;
      }
      return false;
    }

    supportDataFormat(foramt) {
      return this.dataFormat().includes(foramt);
    }

    dataFormat() {
      return [DataFormat.GEOJSON, DataFormat.ISERVER];
    }

    _commit(options) {
        if (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH') {
            if (options.params) {
                options.url = Util_Util.urlAppend(options.url, Util_Util.getParameterString(options.params || {}));
            }
            if (typeof options.data === 'object' && !(options.data instanceof FormData)) {
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
        })
            .then(function (response) {
                if (response.text) {
                    return response.text();
                }
                if (response.json) {
                    return response.json();
                }
                return response;
            })
            .then(function (text) {
                let requestResult = text;
                if (typeof text === 'string') {
                    requestResult = new JSONFormat().read(text);
                }
                if (
                    !requestResult ||
                    requestResult.error ||
                    (requestResult.code >= 300 && requestResult.code !== 304)
                ) {
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
            })
            .catch(function (e) {
                return { error: e };
            })
            .then((requestResult) => {
                let response = {
                  object: this
                };
                if (requestResult.error) {
                  const type = 'processFailed';
                  // 兼容服务在构造函数中使用 eventListeners 的老用法
                  if (this.events && this.events.listeners[type] && this.events.listeners[type].length) {
                    var failure = options.failure && (options.scope ? FunctionExt.bind(options.failure, options.scope) : options.failure);
                    failure ? failure(requestResult, options) : this.serviceProcessFailed(requestResult, options);
                  } else {
                    response = {...response, ...this.transformErrorResult(requestResult, options)};
                    response.type = type;
                    options.failure && options.failure(response);
                  }
                } else {
                  const type = 'processCompleted';
                  if (this.events && this.events.listeners[type] && this.events.listeners[type].length) {
                    var success = options.success && (options.scope ? FunctionExt.bind(options.success, options.scope) : options.success);
                    success ? success(requestResult, options) : this.serviceProcessCompleted(requestResult, options);
                  } else {
                    requestResult.succeed = requestResult.succeed == undefined ? true : requestResult.succeed;
                    response = {...response, ...this.transformResult(requestResult, options)};
                    response.type = type;
                    options.success && options.success(response);
                  }
                }
                return response;
            });
    }
}


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

;// ./src/common/iServer/AddressMatchService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class AddressMatchService_AddressMatchService extends CommonServiceBase {
    constructor(url, options) {
        super(url, options);
        this.options = options || {};
        this.CLASS_NAME = 'SuperMap.AddressMatchService';
    }

    /**
     * @function AddressMatchService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function AddressMatchService.prototype.code
     * @param {string} url - 正向地址匹配服务地址。
     * @param {GeoCodingParameter} params - 正向地址匹配服务参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    code(url, params, callback) {
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
    decode(url, params, callback) {
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

    processAsync(url, params, callback) {
      return this.request({
          method: 'GET',
          url,
          params,
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
    transformResult(result, options) {
        if (result.succeed) {
            delete result.succeed;
        }
        return { result, options };
    }
}


;// ./src/classic/services/AddressMatchService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class AddressMatchService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.REST.AddressMatchService";
    }

    /**
     * @function SuperMap.REST.AddressMatchService.prototype.code
     * @description 正向匹配，即通过地点名称关键词查找地址位置坐标。
     * @param {GeoCodingParameter} params - 正向匹配参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    code(params, callback) {
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
    decode(params, callback) {
        var me = this;
        var addressMatchService = new AddressMatchService_AddressMatchService(me.url, {
            headers: me.headers,
            proxy: me.proxy,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin
        });
        return addressMatchService.decode(me.url + '/geodecoding', params, callback);
    }
}
SuperMap.REST.AddressMatchService = AddressMatchService;

;// ./src/common/iServer/DatasetService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class DatasetService_DatasetService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        if(!options){
            return;
        }
        /**
         * @member {string} DatasetService.prototype.datasource
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member {string} DatasetService.prototype.dataset
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;
        if (options) {
            Util_Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.DatasetService";
    }

    /**
     * @function DatasetService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
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
    getDatasetsService(params, callback) {
        const url = Util_Util.urlPathAppend(this.url,`datasources/name/${params}/datasets`);
        return this.processAsync(url, 'GET', callback);
    }

    /**
     * @function DatasetService.prototype.getDatasetService
     * @description 执行服务，查询数据集信息服务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasetService(datasourceName, datasetName, callback) {
        const url = Util_Util.urlPathAppend(this.url,`datasources/name/${datasourceName}/datasets/name/${datasetName}`);
        return this.processAsync(url, 'GET', callback);
    }

    /**
     * @function DatasetService.prototype.setDatasetService
     * @description 执行服务，更改数据集信息服务。
     * @returns {Promise} Promise 对象。
     */
    setDatasetService(params, callback) {
        if (!params) {
            return;
        }
        const url = Util_Util.urlPathAppend(this.url, `datasources/name/${params.datasourceName}/datasets/name/${params.datasetName}`);
        delete params.datasourceName;
        return this.processAsync(url, 'PUT', callback, params);
    }

     /**
     * @function DatasetService.prototype.deleteDatasetService
     * @description 执行服务，删除数据集信息服务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    deleteDatasetService(datasourceName, datasetName, callback) {
      const url = Util_Util.urlPathAppend(this.url, `datasources/name/${datasourceName}/datasets/name/${datasetName}`);
      return this.processAsync(url, 'DELETE', callback);
    }

    processAsync(url, method, callback, params) {
       var me = this;
       let requestConfig = {
          url,
          method,
          scope: me,
          success: callback,
          failure: callback
        }
        params && (requestConfig.data = Util_Util.toJSON(params));
        return me.request(requestConfig);
    }
}

;// ./src/common/iServer/CreateDatasetParameters.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class CreateDatasetParameters {

    constructor(options) {
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
    destroy() {
        var me = this;
        me.datasourceName = null;
        me.datasetName = null;
        me.datasetType = null;
    }
}


;// ./src/common/iServer/UpdateDatasetParameters.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class UpdateDatasetParameters {

    constructor(options) {
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
    destroy() {
        var me = this;
        me.datasourceName = null;
        me.datasetName = null;
        me.isFileCache = null;
        me.prjCoordSys = null;
        me.charset = null;
        me.palette = null;
        me.noValue = null;
    }

}


;// ./src/classic/services/DatasetService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class DatasetService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        const me = this;
        this._datasetService = new DatasetService_DatasetService(me.url, {
          proxy: me.proxy,
          withCredentials: me.withCredentials,
          crossOrigin: me.crossOrigin,
          headers: me.headers
        });
        this.CLASS_NAME = "SuperMap.REST.DatasetService";
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
    getDatasets(datasourceName, callback) {
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
    getDataset(datasourceName, datasetName, callback) {
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
    setDataset(params, callback) {
        if (!(params instanceof CreateDatasetParameters) && !(params instanceof UpdateDatasetParameters)) {
            return;
        }
        let datasetParams;
        if (params instanceof CreateDatasetParameters) {
            datasetParams = {
                "datasetType": params.datasetType,
                "datasourceName": params.datasourceName,
                "datasetName": params.datasetName
            }
        } else if (params instanceof UpdateDatasetParameters) {
            datasetParams = {
                "datasetName": params.datasetName,
                "datasourceName": params.datasourceName,
                "isFileCache": params.isFileCache,
                "description": params.description,
                "prjCoordSys": params.prjCoordSys,
                "charset": params.charset
            }
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
    deleteDataset(datasourceName, datasetName, callback) {
        return this._datasetService.deleteDatasetService(datasourceName, datasetName, callback);
    }
}
SuperMap.REST.DatasetService = DatasetService;

;// ./src/common/iServer/DatasourceService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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

class DatasourceService_DatasourceService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        if (options) {
            Util_Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.DatasourceService";
    }


    /**
     * @function DatasourceService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function DatasourceService.prototype.getDatasourceService
     * @description 获取指定数据源信息。
     * @param {string} datasourceName - 数据源名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasourceService(datasourceName, callback) {
        let url = Util_Util.urlPathAppend(this.url,`datasources/name/${datasourceName}`);
        return this.processAsync(url, "GET", callback);
    }

    /**
     * @function DatasourceService.prototype.getDatasourcesService
     * @description 获取所有数据源信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasourcesService(callback) {
        let url = Util_Util.urlPathAppend(this.url,`datasources`);
        return this.processAsync(url, "GET", callback);
    }
    /**
     * @function DatasourceService.prototype.setDatasourceService
     * @description 更新数据源信息。
     * @param {Object} params 请求参数信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    setDatasourceService(params, callback) {
        if (!params) {
            return;
        }
        const url = Util_Util.urlPathAppend(this.url,`datasources/name/${params.datasourceName}`);
        return this.processAsync(url, "PUT", callback, params);
    }

    processAsync(url, method, callback, params) {
       var me = this;
       let requestConfig = {
          url,
          method,
          scope: me,
          success: callback,
          failure: callback
        }
        params && (requestConfig.data = Util_Util.toJSON(params));
        return me.request(requestConfig);
    }
}

;// ./src/common/iServer/SetDatasourceParameters.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SetDatasourceParameters {

    constructor(options) {
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
    destroy() {
        var me = this;
        me.datasourceName = null;
        me.description = null;
        me.coordUnit = null;
        me.distanceUnit = null;
    }

}


;// ./src/classic/services/DatasourceService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class DatasourceService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        const me = this;
        this._datasourceService = new DatasourceService_DatasourceService(me.url, {
            proxy: me.proxy,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin,
            headers: me.headers
        });
        this.CLASS_NAME = "SuperMap.REST.DatasourceService";
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
    getDatasources(callback) {
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
    getDatasource(datasourceName, callback) {
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
    setDatasource(params, callback) {
        if (!(params instanceof SetDatasourceParameters)) {
            return;
        }
        const datasourceParams = {
            description: params.description ,
            coordUnit: params.coordUnit,
            distanceUnit: params.distanceUnit,
            datasourceName: params.datasourceName
        };
        return this._datasourceService.setDatasourceService(datasourceParams, callback);
    }
}
SuperMap.REST.DatasourceService = DatasourceService;

;// ./src/common/iServer/ProcessingServiceBase.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class ProcessingServiceBase extends CommonServiceBase {

    constructor(url, options) {
        options = options || {};
        super(url, options);

        this.CLASS_NAME = "SuperMap.ProcessingServiceBase";
    }

    /**
     * @function ProcessingServiceBase.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function ProcessingServiceBase.prototype.getJobs
     * @description 获取分布式分析任务。
     * @param {string} url - 资源地址。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getJobs(url, callback) {
        var me = this;
        return FetchRequest.get(SecurityManager.appendCredential(url), null, {
            proxy: me.proxy
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            const res = { result, object: me, type: 'processCompleted' };
            callback(res);
            return res;
        }).catch(function (e) {
          const res = { error: e, object: me, type: 'processFailed' };
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
    addJob(url, params, paramType, seconds, callback, processRunningCallback) {
        var me = this,
            parameterObject = null;
        if (params && params instanceof paramType) {
            parameterObject = new Object();
            paramType.toObject(params, parameterObject);
        }
        let headers = Object.assign({
          'Content-Type': 'application/x-www-form-urlencoded'
        }, me.headers || {})
        var options = {
            proxy: me.proxy,
            headers,
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
        }).catch(function (e) {
            e = me.transformErrorResult({ error: e });
            e.options = me;
            e.type = 'processFailed';
            callback(e);
            return e;
        });
    }

    transformResult(result, seconds, callback, processRunningCallback) {
        result = Util_Util.transformResult(result);
        seconds = seconds || 1000;
        var me = this;
        if (result) {
           return new Promise((resolve) => {
              var id = setInterval(function () {
                FetchRequest.get(SecurityManager.appendCredential(result.newResourceLocation), {
                        _t: new Date().getTime()
                    })
                    .then(function (response) {
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
                            const res = {
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
                            const res = {
                              result: job,
                              object: me, 
                              type: 'processCompleted'
                            };
                            resolve(res);
                            callback(res);
                        }
                    }).catch(function (e) {
                        clearInterval(id);
                        const res = {
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
}

;// ./src/common/iServer/KernelDensityJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class KernelDensityJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/density');
        this.CLASS_NAME = "SuperMap.KernelDensityJobsService";
    }

    /**
     * @function KernelDensityJobsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取核密度分析任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJobs(callback) {
      return super.getJobs(this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取指定 ID 的核密度分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJob(id, callback) {
      return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
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
    addKernelDensityJob(params, seconds, callback, processRunningCallback) {
      return super.addJob(this.url, params, KernelDensityJobParameter, seconds, callback, processRunningCallback);
    }

}

;// ./src/common/iServer/SingleObjectQueryJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SingleObjectQueryJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/query');
        this.CLASS_NAME = 'SuperMap.SingleObjectQueryJobsService';
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SingleObjectQueryJobsService.protitype.getQueryJobs
     * @description 获取单对象空间查询分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getQueryJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.protitype.getQueryJob
     * @description 获取指定 ID 的单对象空间查询分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getQueryJob(id, callback) {
        return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SingleObjectQueryJobsService.protitype.addQueryJob
     * @description 新建单对象空间查询分析服务。
     * @param {SingleObjectQueryJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addQueryJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, SingleObjectQueryJobsParameter, seconds, callback, processRunningCallback);
    }
}


;// ./src/common/iServer/SummaryMeshJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SummaryMeshJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/aggregatepoints');
        this.CLASS_NAME = 'SuperMap.SummaryMeshJobsService';
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SummaryMeshJobsService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryMeshJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function SummaryMeshJobsService.prototype.getSummaryMeshJob
     * @description 获取指定 IP 的点聚合分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryMeshJob(id, callback) {
        return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryMeshJobsService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析服务。
     * @param {SummaryMeshJobParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addSummaryMeshJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, SummaryMeshJobParameter, seconds, callback, processRunningCallback);
    }
}


;// ./src/common/iServer/VectorClipJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class VectorClipJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/vectorclip');
        this.CLASS_NAME = 'SuperMap.VectorClipJobsService';
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function VectorClipJobsService.protitype.getVectorClipJobs
     * @description 获取矢量裁剪分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getVectorClipJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.protitype.getVectorClipJob
     * @description 获取指定 ID 的矢量裁剪分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getVectorClipJob(id, callback) {
        return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
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
    addVectorClipJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, VectorClipJobsParameter, seconds, callback, processRunningCallback);
    }
}


;// ./src/common/iServer/OverlayGeoJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class OverlayGeoJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/overlay');
        this.CLASS_NAME = 'SuperMap.OverlayGeoJobsService';
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function OverlayGeoJobsService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getOverlayGeoJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function OverlayGeoJobsService.prototype.getOverlayGeoJob
     * @description 获取指定 ID 的叠加分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getOverlayGeoJob(id, callback) {
        return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function OverlayGeoJobsService.prototype.addOverlayGeoJob
     * @description 新建点叠加析服务。
     * @param {OverlayGeoJobParameter} params - 创建一个叠加分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addOverlayGeoJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, OverlayGeoJobParameter, seconds, callback, processRunningCallback);
    }
}

;// ./src/common/iServer/SummaryRegionJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SummaryRegionJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/summaryregion');
        this.CLASS_NAME = 'SuperMap.SummaryRegionJobsService';
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SummaryRegionJobsService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析任务集合。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryRegionJobs(callback) {
      return super.getJobs(this.url, callback);
    }

    /**
     * @function SummaryRegionJobsService.prototype.getSummaryRegionJob
     * @description 获取指定 ID 的区域汇总分析任务。
     * @param {string} id -要获取区域汇总分析任务的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryRegionJob(id, callback) {
       return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryRegionJobsService.prototype.addSummaryRegionJob
     * @description 新建区域汇总分析任务。
     * @param {SummaryRegionJobParameter} params - 区域汇总分析任务参数类。
     * @param {number} seconds - 创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addSummaryRegionJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, SummaryRegionJobParameter, seconds, callback, processRunningCallback);
    }
}


;// ./src/common/iServer/BuffersAnalystJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class BuffersAnalystJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/buffers');
        this.CLASS_NAME = 'SuperMap.BuffersAnalystJobsService';
    }

    /**
     *@override
     */
    destroy() {
      super.destroy();
    }

    /**
     * @function BuffersAnalystJobsService.prototype.getBufferJobs
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @description 获取缓冲区分析所有任务。
     * @returns {Promise} Promise 对象。
     */
    getBuffersJobs(callback) {
      return super.getJobs(this.url, callback);
    }

    /**
     * @function BuffersAnalystJobsService.prototype.getBufferJob
     * @description 获取指定 ID 的缓冲区分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getBuffersJob(id, callback) {
        return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
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
    addBuffersJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, BuffersAnalystJobsParameter, seconds, callback, processRunningCallback);
    }
}


;// ./src/common/iServer/TopologyValidatorJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class TopologyValidatorJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/topologyvalidator');
        this.CLASS_NAME = "SuperMap.TopologyValidatorJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function TopologyValidatorJobsService.protitype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTopologyValidatorJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function TopologyValidatorJobsService.protitype.getTopologyValidatorJob
     * @description 获取指定 ID 的拓扑检查分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTopologyValidatorJob(id, callback) {
        return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function TopologyValidatorJobsService.protitype.addTopologyValidatorJob
     * @description 新建拓扑检查分析服务。
     * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析任务参数类。
     * @param {number} seconds -创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addTopologyValidatorJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, TopologyValidatorJobsParameter, seconds, callback, processRunningCallback);
    }

}

;// ./src/common/iServer/SummaryAttributesJobsService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class SummaryAttributesJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url = Util_Util.urlPathAppend(this.url, 'spatialanalyst/summaryattributes');
        this.CLASS_NAME = "SuperMap.SummaryAttributesJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SummaryAttributesJobsService.protitype.getSummaryAttributesJobs
     * @description 获取属性汇总分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryAttributesJobs (callback){
        return super.getJobs(this.url, callback);
    }

    /**
     * @function SummaryAttributesJobsService.protitype.getSummaryAttributesJob
     * @description 获取指定 ID 的属性汇总分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryAttributesJob(id, callback) {
        return super.getJobs(Util_Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryAttributesJobsService.protitype.addSummaryAttributesJob
     * @description 新建属性汇总分析服务。
     * @param {SummaryAttributesJobsParameter} params - 属性汇总分析任务参数类。
     * @param {number} seconds - 创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addSummaryAttributesJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, SummaryAttributesJobsParameter, seconds, callback, processRunningCallback);
    }
}

;// ./src/common/iServer/ProcessingService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
 class ProcessingService_ProcessingService {
 
     constructor(url, options) {
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
     getKernelDensityJobs(callback, resultFormat) {
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
     getKernelDensityJob(id, callback, resultFormat) {
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
     addKernelDensityJob(params, callback, seconds, resultFormat) {
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
     getKernelDensityJobState(id) {
         return this.kernelDensityJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryMeshJobs
      * @description 获取点聚合分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryMeshJobs(callback, resultFormat) {
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
     getSummaryMeshJob(id, callback, resultFormat) {
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
     addSummaryMeshJob(params, callback, seconds, resultFormat) {
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
     getSummaryMeshJobState(id) {
         return this.summaryMeshJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getQueryJobs
      * @description 获取单对象空间查询分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getQueryJobs(callback, resultFormat) {
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
     getQueryJob(id, callback, resultFormat) {
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
     addQueryJob(params, callback, seconds, resultFormat) {
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
     getQueryJobState(id) {
         return this.queryJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryRegionJobs
      * @description 获取区域汇总分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryRegionJobs(callback, resultFormat) {
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
     getSummaryRegionJob(id, callback, resultFormat) {
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
     addSummaryRegionJob(params, callback, seconds, resultFormat) {
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
     getSummaryRegionJobState(id) {
         return this.summaryRegionJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getVectorClipJobs
      * @description 获取矢量裁剪分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getVectorClipJobs(callback, resultFormat) {
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
     getVectorClipJob(id, callback, resultFormat) {
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
     addVectorClipJob(params, callback, seconds, resultFormat) {
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
     getVectorClipJobState(id) {
         return this.vectorClipJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getOverlayGeoJobs
      * @description 获取叠加分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getOverlayGeoJobs(callback, resultFormat) {
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
     getOverlayGeoJob(id, callback, resultFormat) {
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
     addOverlayGeoJob(params, callback, seconds, resultFormat) {
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
     getoverlayGeoJobState(id) {
         return this.overlayGeoJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getBuffersJobs
      * @description 获取缓冲区分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getBuffersJobs(callback, resultFormat) {
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
     getBuffersJob(id, callback, resultFormat) {
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
     addBuffersJob(params, callback, seconds, resultFormat) {
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
     getBuffersJobState(id) {
         return this.buffersJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getTopologyValidatorJobs
      * @description 获取拓扑检查分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getTopologyValidatorJobs(callback, resultFormat) {
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
     getTopologyValidatorJob(id, callback, resultFormat) {
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
     addTopologyValidatorJob(params, callback, seconds, resultFormat) {
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
     getTopologyValidatorJobState(id) {
         return this.topologyValidatorJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryAttributesJobs
      * @description 获取属性汇总分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryAttributesJobs(callback, resultFormat) {
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
     getSummaryAttributesJob(id, callback, resultFormat) {
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
     addSummaryAttributesJob(params, callback, seconds, resultFormat) {
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
     getSummaryAttributesJobState(id) {
         return this.summaryAttributesJobs[id];
     }
 
     _processFormat(resultFormat) {
         return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
     }
 }
 
;// ./src/classic/services/ProcessingService.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
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
class ProcessingService {
    constructor(url, options) {
      this._processingService = new ProcessingService_ProcessingService(url, options);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJobs
     * @description 获取密度分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJobs(callback, resultFormat) {
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
    getKernelDensityJob(id, callback, resultFormat) {
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
    addKernelDensityJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addKernelDensityJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param {string} id - 密度分析的 ID。
     * @returns {Object} 密度分析的状态。
     */
    getKernelDensityJobState(id) {
      return this._processingService.getKernelDensityJobState(id)
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryMeshJobs(callback, resultFormat) {
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
    getSummaryMeshJob(id, callback, resultFormat) {
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
    addSummaryMeshJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryMeshJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param {string} id - 点聚合分析的 ID。
     * @returns {Object} 点聚合分析的状态。
     */
    getSummaryMeshJobState(id) {
      return this._processingService.getSummaryMeshJobState(id)
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getQueryJobs
     * @description 获取单对象空间查询分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getQueryJobs(callback, resultFormat) {
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
    getQueryJob(id, callback, resultFormat) {
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
    addQueryJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addQueryJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getQueryJobState
     * @description 获取单对象空间查询分析的状态。
     * @param {string} id - 单对象空间查询分析的 ID。
     * @returns {Object} 单对象空间查询分析的状态。
     */
    getQueryJobState(id) {
      return this._processingService.getQueryJobState(id)
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryRegionJobs(callback, resultFormat) {
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
    getSummaryRegionJob(id, callback, resultFormat) {
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
    addSummaryRegionJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryRegionJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryRegionJobState
     * @description 获取区域汇总分析的状态。
     * @param {string} id - 区域汇总分析的 ID。
     * @returns {Object} 区域汇总分析的状态。
     */
    getSummaryRegionJobState(id) {
      return this._processingService.getSummaryRegionJobState(id)
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getVectorClipJobs(callback, resultFormat) {
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
    getVectorClipJob(id, callback, resultFormat) {
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
    addVectorClipJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addVectorClipJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param {string} id - 矢量裁剪分析的 ID。
     * @returns {Object} 矢量裁剪分析的状态。
     */
    getVectorClipJobState(id) {
      return this._processingService.getVectorClipJobState(id)
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getOverlayGeoJobs(callback, resultFormat) {
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
    getOverlayGeoJob(id, callback, resultFormat) {
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
    addOverlayGeoJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addOverlayGeoJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getoverlayGeoJobState
     * @description 获取叠加分析的状态。
     * @param {string} id - 叠加分析的 ID。
     * @returns {Object} 叠加分析的状态。
     */
    getoverlayGeoJobState(id) {
      return this._processingService.getoverlayGeoJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getBuffersJobs
     * @description 获取缓冲区分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getBuffersJobs(callback, resultFormat) {
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
    getBuffersJob(id, callback, resultFormat) {
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
    addBuffersJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addBuffersJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getBuffersJobState
     * @description 获取缓冲区分析的状态。
     * @param {string} id - 缓冲区分析的 ID。
     * @returns {Object} 缓冲区分析的状态。
     */
    getBuffersJobState(id) {
      return this._processingService.getBuffersJobState(id)
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getTopologyValidatorJobs(callback, resultFormat) {
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
    getTopologyValidatorJob(id, callback, resultFormat) {
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
    addTopologyValidatorJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addTopologyValidatorJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getTopologyValidatorJobState
     * @description 获取拓扑检查分析的状态。
     * @param {string} id - 拓扑检查分析的 ID。
     * @returns {Object} 拓扑检查分析的状态。
     */
    getTopologyValidatorJobState(id) {
      return this._processingService.getTopologyValidatorJobState(id);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryAttributesJobs
     * @description 获取属性汇总分析的列表。
     * @param {function} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryAttributesJobs(callback, resultFormat) {
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
    getSummaryAttributesJob(id, callback, resultFormat) {
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
    addSummaryAttributesJob(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryAttributesJob(params, callback, seconds, resultFormat);
    }

    /**
     * @function SuperMap.REST.ProcessingService.prototype.getSummaryAttributesJobState
     * @description 获取属性汇总分析的状态。
     * @param {string} id - 属性汇总分析的 ID。
     * @returns {Object} 属性汇总分析的状态。
     */
    getSummaryAttributesJobState(id) {
      return this._processingService.getSummaryAttributesJobState(id);
    }

    _processFormat(resultFormat) {
        return resultFormat ? resultFormat : DataFormat.GEOJSON;
    }

    _processParams(params) {
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

    _convertPatams(points) {
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
}

SuperMap.REST.ProcessingService = ProcessingService;

;// ./src/classic/services/index.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/




;// ./src/classic/index.js
/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/






















;// ./src/classic/namespace.js


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
SuperMap.Util = {...SuperMap.Util, ...Util_Util};


})();

/******/ })()
;