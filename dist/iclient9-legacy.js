/*!
 * 
 *     iclient9-legacy.(http://iclient.supermapol.com)
 *     Copyright© 2000-2017 SuperMap Software Co. Ltd
 *     license: Apache-2.0
 *     version: v9.0.0
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);
__webpack_require__(6);
module.exports = window.SuperMap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ServiceBase = __webpack_require__(2);
var SuperMap = __webpack_require__(0);
var Request = __webpack_require__(5);

SuperMap.ProcessingJobsServiceBase = SuperMap.Class(ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型
     * - *processCompleted* 创建作业成功后触发的事件。
     * - *processFailed* 创建作业失败后触发的事件 。
     * - *processRunning* 创建作业过程的整个阶段都会触发的事件，用于获取作业创建过程的状态 。
     */
    EVENT_TYPES: ["processCompleted", "processFailed", "processRunning"],

    initialize: function initialize(url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
    },

    destroy: function destroy() {
        ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     *
     * @param url - 一个空间分析作业的资源地址。
     */
    getJobs: function getJobs(url) {
        var me = this;
        return Request.get(url).then(function (response) {
            return response.json();
        }).then(function (result) {
            me.events.triggerEvent("processCompleted", { result: result });
        }).catch(function (e) {
            me.eventListeners.processFailed({ error: e });
        });
    },

    /**
     *
     * @param url - 分布式空间分析作业资源根地址。
     * @param params - 创建一个空间分析作业的请求参数。
     * @param paramType - 请求参数类型。
     * @param seconds - 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addJob: function addJob(url, params, paramType, seconds) {
        var me = this,
            parameterObject = null;
        if (params && params instanceof paramType) {
            parameterObject = new Object();
            paramType.toObject(params, parameterObject);
        }
        var options = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        return Request.post(me._processUrl(url), JSON.stringify(parameterObject), options).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result.succeed) {
                me.serviceProcessCompleted(result, seconds);
            } else {
                me.serviceProcessFailed(result);
            }
        }).catch(function (e) {
            me.eventListeners.processFailed({ error: e });
        });
    },

    serviceProcessCompleted: function serviceProcessCompleted(result, seconds) {
        result = SuperMap.Util.transformResult(result);
        seconds = seconds || 1000;
        var me = this;
        if (result) {
            var id = setInterval(function () {
                return Request.get(result.newResourceLocation).then(function (response) {
                    return response.json();
                }).then(function (job) {
                    me.events.triggerEvent("processRunning", { id: job.id, state: job.state });
                    if (job.state.runState === 'LOST') {
                        clearInterval(id);
                        me.events.triggerEvent("processFailed", { error: job.state.errorMsg });
                    }
                    if (job.state.runState === 'FINISHED' && job.setting.serviceInfo) {
                        clearInterval(id);
                        me.events.triggerEvent("processCompleted", { result: job });
                    }
                }).catch(function (e) {
                    clearInterval(id);
                    me.events.triggerEvent("processFailed", { error: e });
                });
            }, seconds);
        }
    },

    serviceProcessFailed: function serviceProcessFailed(result) {
        ServiceBase.prototype.serviceProcessFailed.apply(this, arguments);
    },

    //为不是以.json结尾的url加上.json，并且如果有token的话，在.json后加上token参数。
    _processUrl: function _processUrl(url) {
        if (url.indexOf('.json') === -1) {
            url += '.json';
        }
        if (SuperMap.SecurityManager.getToken(url)) {
            url += '?token=' + SuperMap.SecurityManager.getToken(url);
        }
        return url;
    },

    CLASS_NAME: "SuperMap.ProcessingJobsServiceBase"
});

module.exports = SuperMap.ProcessingJobsServiceBase;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);
var SuperMap = __webpack_require__(0);
/**
 * @class SuperMap.ServiceBase common服务基类
 * @constructs SuperMap.ServiceBase
 * @param url - {String} 与客户端交互的服务地址。
 * @param options - {Object} 参数。
 */
SuperMap.ServiceBase = SuperMap.Class({

    /*
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型
     * - *processCompleted* 服务端返回信息成功触发该事件 。
     * - *processFailed* 服务端返回信息失败触发该事件 。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * @member SuperMap.ServiceBase.prototype.events -{SuperMap.Events}
     * @description 处理所有事件的对象，支持 processCompleted 、processFailed 两种事件
     *               服务端成功返回地图信息结果时触发 processCompleted 事件，服务端返回信息结果时触发 processFailed 事件。
     */
    events: null,

    /**
     * @member SuperMap.ServiceBase.prototype.eventListeners -{Object}
     * @description 听器对象，在构造函数中设置此参数（可选），对 MapService 支持的两个事件 processCompleted 、processFailed 进行监听，
     *              相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * @member SuperMap.ServiceBase.prototype.url -{String|Array}
     * @description 服务访问地址或者服务访问地址数组。
     *
     * @example
     * var url1 = "http://localhost:8090/iserver/services/map-world/rest/maps/World";
     * var url2 = ["http://192.168.17.168:8090/iserver/services/map-world/rest/maps/World",
     *            "http://192.168.17.169:8091/iserver/services/map-world/rest/maps/World"];
     */
    url: null,

    /*
     * Property: urls
     * {Array} 服务访问地址数组。
     */
    urls: null,

    /*
     *  Property: serverType
     *  {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online
     */
    serverType: null,

    /*
     * Property: index
     * {Int} 服务访问地址在数组中的位置。
     */
    index: null,

    /*
     * Property: length
     * {String} 服务访问地址数组长度。
     */
    length: null,

    /*
     * Property: options
     * {Object} 请求参数。
     */
    options: null,

    /*
     * Property: totalTimes
     * {Int} 实际请求失败次数。
     */
    totalTimes: null,

    /*
     * Property: POLLING_TIMES
     * {Int} 默认请求失败次数。
     */
    POLLING_TIMES: 3,

    /*
     * Property: _processSuccess
     * {Function} 请求参数中成功回调函数。
     */
    _processSuccess: null,

    /*
     * Property: _processFailed
     * {Function} 请求参数中失败回调函数。
     */
    _processFailed: null,

    /*
     * Property: isInTheSameDomain
     * {Boolean}
     */
    isInTheSameDomain: null,

    /**
     * @function  SuperMap.ServiceBase.prototype.initialize
     * @description  ServiceBase的构造函数
     * @param url - {String} 与客户端交互的服务地址。
     * @param options - {Object} 参数。
     */
    initialize: function initialize(url, options) {
        if (!url) {
            return false;
        }
        var me = this;

        if (SuperMap.Util.isArray(url)) {
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

        if (SuperMap.Util.isArray(url) && !me.isServiceSupportPolling()) {
            me.url = url[0];
            me.totalTimes = 1;
        }

        me.serverType = me.serverType || SuperMap.ServerType.ISERVER;

        options = options || {};

        if (options) {
            SuperMap.Util.extend(this, options);
        }

        me.isInTheSameDomain = SuperMap.Util.isInTheSameDomain(me.url);

        me.events = new SuperMap.Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    },

    /**
     * @function destroy
     * @description释放资源，将引用的资源属性置空。
     */
    destroy: function destroy() {
        var me = this;
        if (SuperMap.Util.isArray(me.urls)) {
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
    },

    /**
     * @function  request
     * @description APIMethod: 该方法用于向服务发送请求。
     *
     * Parameters:
     * @param options - {Object} 参数。
     *        method - {String} 请求方式，包括GET，POST，PUT， DELETE。<br>
     *        url - {String}  发送请求的地址。<br>
     *        params - {Object} 作为查询字符串添加到url中的一组键值对，
     *                          此参数只适用于GET方式发送的请求。<br>
     *        data - {String } 发送到服务器的数据。<br>
     *        success - {function} 请求成功后的回调函数。<br>
     *        failure - {function} 请求失败后的回调函数。<br>
     *        scope - {Object} 如果回调函数是对象的一个公共方法，设定该对象的范围。<br>
     *        isInTheSameDomain - {Boolean} 请求是否在当前域中。<br>
     */
    request: function request(options) {
        var me = this;
        options.url = options.url || me.url;
        options.isInTheSameDomain = me.isInTheSameDomain;
        //为url添加安全认证信息片段
        var credential = this.getCredential(options.url);
        if (credential) {
            //当url中含有?，并且?在url末尾的时候直接添加token *网络分析等服务请求url会出现末尾是?的情况*
            //当url中含有?，并且?不在url末尾的时候添加&token
            //当url中不含有?，在url末尾添加?token
            var endStr = options.url.substring(options.url.length - 1, options.url.length);
            if (options.url.indexOf("?") > -1 && endStr === "?") {
                options.url += credential.getUrlParameters();
            } else if (options.url.indexOf("?") > -1 && endStr !== "?") {
                options.url += "&" + credential.getUrlParameters();
            } else {
                options.url += "?" + credential.getUrlParameters();
            }
        }
        me.calculatePollingTimes();
        me._processSuccess = options.success;
        me._processFailed = options.failure;
        options.scope = me;
        options.success = me.getUrlCompleted;
        options.failure = me.getUrlFailed;
        me.options = options;
        SuperMap.Util.committer(me.options);
    },

    /*
     * 获取凭据信息
     * parameter url
     */
    getCredential: function getCredential(url) {
        var keyUrl = url,
            credential,
            value;
        switch (this.serverType) {
            case SuperMap.ServerType.ISERVER:
                value = SuperMap.SecurityManager.getToken(keyUrl);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                break;
            case SuperMap.ServerType.IPORTAL:
                value = SuperMap.SecurityManager.getToken(keyUrl);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                if (!credential) {
                    value = SuperMap.SecurityManager.getKey(keyUrl);
                    credential = value ? new SuperMap.Credential(value, "key") : null;
                }
                break;
            case SuperMap.ServerType.ONLINE:
                value = SuperMap.SecurityManager.getKey(keyUrl);
                credential = value ? new SuperMap.Credential(value, "key") : null;
                break;
            default:
                value = SuperMap.SecurityManager.getToken(keyUrl);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                break;
        }
        return credential;
    },

    /*
     * Method: getUrlCompleted
     * 请求成功后执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getUrlCompleted: function getUrlCompleted(result) {
        var me = this;
        me._processSuccess(result);
    },

    /*
     * Method: getUrlFailed
     * 请求失败后执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getUrlFailed: function getUrlFailed(result) {
        var me = this;
        if (me.totalTimes > 0) {
            me.totalTimes--;
            me.ajaxPolling();
        } else {
            me._processFailed(result);
        }
    },

    /*
     * Method: ajaxPolling
     * 请求失败后，如果剩余请求失败次数不为0，重新获取url发送请求
     */
    ajaxPolling: function ajaxPolling() {
        var me = this,
            url = me.options.url,
            re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/;
        me.index = parseInt(Math.random() * me.length);
        me.url = me.urls[me.index];
        url = url.replace(re, re.exec(me.url)[0]);
        var isInTheSameDomain = SuperMap.Util.isInTheSameDomain(url);
        if (isInTheSameDomain) {
            if (url.indexOf(".jsonp") > 0) {
                url = url.replace(/.jsonp/, ".json");
            }
        } else {
            if (!(url.indexOf(".jsonp") > 0)) {
                url = url.replace(/.json/, ".jsonp");
            }
        }
        me.options.url = url;
        me.options.isInTheSameDomain = isInTheSameDomain;
        SuperMap.Util.committer(me.options);
    },

    /*
     * Method: calculatePollingTimes
     * 计算剩余请求失败执行次数。
     */
    calculatePollingTimes: function calculatePollingTimes() {
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
    },

    /*
     * Method: isServiceSupportPolling
     * 判断服务是否支持轮询。
     */
    isServiceSupportPolling: function isServiceSupportPolling() {
        var me = this;
        return !(me.CLASS_NAME === "SuperMap.REST.ThemeService" || me.CLASS_NAME === "SuperMap.REST.EditFeaturesService");
    },

    /*
     * Method: serviceProcessCompleted
     * 状态完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted: function serviceProcessCompleted(result) {
        result = SuperMap.Util.transformResult(result);
        this.events.triggerEvent("processCompleted", { result: result });
    },

    /*
     * Method: serviceProcessFailed
     * 状态失败，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    serviceProcessFailed: function serviceProcessFailed(result) {
        result = SuperMap.Util.transformResult(result);
        var error = result.error || result;
        this.events.triggerEvent("processFailed", { error: error });
    },

    CLASS_NAME: "SuperMap.ServiceBase"
});
module.exports = SuperMap.ServiceBase;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = window.SuperMap;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
/**
 *服务请求返回结果数据类型
 *  GEOJSON: "GEOJSON",
 *  ISERVER: "ISERVER"
 */
SuperMap.DataFormat = {
    GEOJSON: "GEOJSON",
    ISERVER: "ISERVER"
};

/**
 * Constant: GeometryType
 * {Object} 几何对象枚举类。
 * 该类定义了一系列几何对象类型。
 *
 * LINE: "LINE",
 *
 * LINEM: "LINEM",
 *
 * POINT: "POINT",
 *
 * REGION: "REGION",
 *
 * ELLIPSE: "ELLIPSE",
 *
 * CIRCLE: "CIRCLE",
 *
 * TEXT: "TEXT",
 *
 * UNKNOWN: "UNKNOWN".
 */
SuperMap.GeometryType = {
    LINE: "LINE",
    LINEM: "LINEM",
    POINT: "POINT",
    REGION: "REGION",
    ELLIPSE: "ELLIPSE",
    CIRCLE: "CIRCLE",
    TEXT: "TEXT",
    UNKNOWN: "UNKNOWN"
};

/**
 * Constant: QueryOption
 * {Object} 查询结果类型枚举类。
 * 该类描述查询结果返回类型，包括只返回属性、只返回几何实体以及返回属性和几何实体。
 *
 * ATTRIBUTE: "ATTRIBUTE",
 *
 * ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
 *
 * GEOMETRY: "GEOMETRY".
 */
SuperMap.QueryOption = {
    ATTRIBUTE: "ATTRIBUTE",
    ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
    GEOMETRY: "GEOMETRY"
};

/**
 * Constant: JoinType
 * {Object} 关联查询时的关联类型常量。
 * 该类定义了两个表之间的连接类型常量，决定了对两个表之间进行连接查询时，查询结果中得到的记录的情况。
 *
 * INNERJOIN: "INNERJOIN",
 *
 * LEFTJOIN: "LEFTJOIN".
 */
SuperMap.JoinType = {
    INNERJOIN: "INNERJOIN",
    LEFTJOIN: "LEFTJOIN"
};

/**
 * Constant: SpatialQueryMode
 * {Object} 空间查询模式枚举类。
 * 该类定义了空间查询操作模式常量。
 *
 * CONTAIN: "CONTAIN",
 *
 * CROSS: "CROSS",
 *
 * DISJOINT: "DISJOINT",
 *
 * IDENTITY: "IDENTITY",
 *
 * INTERSECT: "INTERSECT",
 *
 * NONE: "NONE",
 *
 * OVERLAP: "OVERLAP",
 *
 * TOUCH: "TOUCH",
 *
 * WITHIN: "WITHIN".
 */
SuperMap.SpatialQueryMode = {
    CONTAIN: "CONTAIN",
    CROSS: "CROSS",
    DISJOINT: "DISJOINT",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    NONE: "NONE",
    OVERLAP: "OVERLAP",
    TOUCH: "TOUCH",
    WITHIN: "WITHIN"
};

/**
 * Constant: SpatialRelationType
 * {Object} 数据集对象间的空间关系枚举类。
 * 该类定义了数据集对象间的空间关系类型常量。
 *
 * 包含关系
 * CONTAIN: "CONTAIN",
 *
 * 相交关系
 * INTERSECT: "INTERSECT",
 *
 * 被包含关系
 * WITHIN: "WITHIN"。
 */
SuperMap.SpatialRelationType = {
    CONTAIN: "CONTAIN",
    INTERSECT: "INTERSECT",
    WITHIN: "WITHIN"
};

/**
 * Constant: MeasureMode
 * {Object} 量算模式枚举类。
 * 该类定义了两种测量模式：距离测量和面积测量。
 *
 * DISTANCE: "DISTANCE",
 *
 * AREA: "AREA".
 */
SuperMap.MeasureMode = {
    DISTANCE: "DISTANCE",
    AREA: "AREA"
};

/**
 * Constant: Unit
 * {Object} 距离单位枚举类。
 * 该类定义了一系列距离单位类型。
 *
 * METER: "METER",
 *
 * KILOMETER: "KILOMETER",
 *
 * MILE: "MILE",
 *
 * YARD: "YARD",
 *
 * DEGREE: "DEGREE",
 *
 * MILLIMETER: "MILLIMETER",
 *
 * CENTIMETER: "CENTIMETER",
 *
 * INCH: "INCH",
 *
 * DECIMETER: "DECIMETER",
 *
 * FOOT: "FOOT",
 *
 * SECOND: "SECOND",
 *
 * MINUTE: "MINUTE",
 *
 * RADIAN: "RADIAN".
 */
SuperMap.Unit = {
    METER: "METER",
    KILOMETER: "KILOMETER",
    MILE: "MILE",
    YARD: "YARD",
    DEGREE: "DEGREE",
    MILLIMETER: "MILLIMETER",
    CENTIMETER: "CENTIMETER",
    INCH: "INCH",
    DECIMETER: "DECIMETER",
    FOOT: "FOOT",
    SECOND: "SECOND",
    MINUTE: "MINUTE",
    RADIAN: "RADIAN"
};

/**
 * Constant: EngineType
 * {Object} 数据源引擎类型枚举类。
 *
 * IMAGEPLUGINS: "IMAGEPLUGINS",
 *
 * OGC: "OGC",
 *
 * ORACLEPLUS: "ORACLEPLUS",
 *
 * SDBPLUS: "SDBPLUS",
 *
 * SQLPLUS: "SQLPLUS",
 *
 * UDB: "UDB"。
 */
SuperMap.EngineType = {
    IMAGEPLUGINS: "IMAGEPLUGINS",
    OGC: "OGC",
    ORACLEPLUS: "ORACLEPLUS",
    SDBPLUS: "SDBPLUS",
    SQLPLUS: "SQLPLUS",
    UDB: "UDB"
};

/**
 * Constant: ThemeGraphTextFormat
 * {Object } 统计专题图文本显示格式枚举类。
 *
 * CAPTION: "CAPTION",
 *
 * CAPTION_PERCENT: "CAPTION_PERCENT",
 *
 * CAPTION_VALUE: "CAPTION_VALUE",
 *
 * PERCENT: "PERCENT",
 *
 * VALUE: "VALUE".
 */
SuperMap.ThemeGraphTextFormat = {
    CAPTION: "CAPTION",
    CAPTION_PERCENT: "CAPTION_PERCENT",
    CAPTION_VALUE: "CAPTION_VALUE",
    PERCENT: "PERCENT",
    VALUE: "VALUE"
};

/**
 * Constant: ThemeGraphType
 * {Object} 统计专题图类型枚举类。
 *
 * AREA: "AREA",
 *
 * BAR: "BAR",
 *
 * BAR3D: "BAR3D",
 *
 * LINE: "LINE",
 *
 * PIE: "PIE",
 *
 * PIE3D: "PIE3D",
 *
 * POINT: "POINT",
 *
 * RING: "RING",
 *
 * ROSE: "ROSE",
 *
 * ROSE3D: "ROSE3D",
 *
 * STACK_BAR: "STACK_BAR",
 *
 * STACK_BAR3D: "STACK_BAR3D",
 *
 * STEP: "STEP".
 */
SuperMap.ThemeGraphType = {
    AREA: "AREA",
    BAR: "BAR",
    BAR3D: "BAR3D",
    LINE: "LINE",
    PIE: "PIE",
    PIE3D: "PIE3D",
    POINT: "POINT",
    RING: "RING",
    ROSE: "ROSE",
    ROSE3D: "ROSE3D",
    STACK_BAR: "STACK_BAR",
    STACK_BAR3D: "STACK_BAR3D",
    STEP: "STEP"
};

/**
 * Constant: GraphAxesTextDisplayMode
 * {Object} 统计专题图坐标轴文本显示模式。
 * ALL: "ALL", 显示全部文本
 *
 * NONE: "NONE", 没有显示
 *
 * YAXES: "YAXES". 显示Y轴的文本
 */
SuperMap.GraphAxesTextDisplayMode = {
    ALL: "ALL",
    NONE: "NONE",
    YAXES: "YAXES"
};

/**
 * Constant: GraduatedMode
 * {Object} 专题图分级模式枚举类。 CONSTANT: "CONSTANT",
 *
 * LOGARITHM: "LOGARITHM",
 *
 * SQUAREROOT: "SQUAREROOT".
 */
SuperMap.GraduatedMode = {
    CONSTANT: "CONSTANT",
    LOGARITHM: "LOGARITHM",
    SQUAREROOT: "SQUAREROOT"
};

/**
 * Constant: RangeMode
 * {Object} 范围分段专题图分段方式枚举类。
 *
 * CUSTOMINTERVAL: "CUSTOMINTERVAL",
 *
 * EQUALINTERVAL: "EQUALINTERVAL",
 *
 * LOGARITHM: "LOGARITHM",
 *
 * QUANTILE: "QUANTILE",
 *
 * SQUAREROOT: "SQUAREROOT",
 *
 * STDDEVIATION: "STDDEVIATION".
 */
SuperMap.RangeMode = {
    CUSTOMINTERVAL: "CUSTOMINTERVAL",
    EQUALINTERVAL: "EQUALINTERVAL",
    LOGARITHM: "LOGARITHM",
    QUANTILE: "QUANTILE",
    SQUAREROOT: "SQUAREROOT",
    STDDEVIATION: "STDDEVIATION"
};

/**
 * Constant: ThemeType
 * {Object} 专题图类型枚举类。
 *
 * DOTDENSITY: "DOTDENSITY",
 *
 * GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
 *
 * GRAPH: "GRAPH",
 *
 * LABEL: "LABEL",
 *
 * RANGE: "RANGE",
 *
 * UNIQUE: "UNIQUE".
 */
SuperMap.ThemeType = {
    DOTDENSITY: "DOTDENSITY",
    GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
    GRAPH: "GRAPH",
    LABEL: "LABEL",
    RANGE: "RANGE",
    UNIQUE: "UNIQUE"
};

/**
 * Constant: ColorGradientType
 * {Object} 渐变颜色枚举类。
 *
 * BLACK_WHITE: "BLACKWHITE",
 *
 * BLUE_BLACK: "BLUEBLACK",
 *
 * BLUE_RED : "BLUERED",
 *
 * BLUE_WHITE: "BLUEWHITE",
 *
 * CYAN_BLACK: "CYANBLACK",
 *
 * CYAN_BLUE: "CYANBLUE",
 *
 * CYAN_GREEN: "CYANGREEN",
 *
 * CYAN_WHITE: "CYANWHITE",
 *
 * GREEN_BLACK: "GREENBLACK",
 *
 * GREEN_BLUE: "GREENBLUE",
 *
 * GREEN_ORANGE_VIOLET: "GREENORANGEVIOLET",
 *
 * GREEN_RED: "GREENRED",
 *
 * GREEN_WHITE: "GREENWHITE",
 *
 * PINK_BLACK: "PINKBLACK",
 *
 * PINK_BLUE: "PINKBLUE",
 *
 * PINK_RED: "PINKRED",
 *
 * PINK_WHITE: "PINKWHITE",
 *
 * RAIN_BOW: "RAINBOW",
 *
 * RED_BLACK: "REDBLACK",
 *
 * RED_WHITE: "REDWHITE",
 *
 * SPECTRUM: "SPECTRUM",
 *
 * TERRAIN: "TERRAIN",
 *
 * YELLOW_BLACK: "YELLOWBLACK",
 *
 * YELLOW_BLUE: "YELLOWBLUE",
 *
 * YELLOW_GREEN: "YELLOWGREEN",
 *
 * YELLOW_RED: "YELLOWRED",
 *
 * YELLOW_WHITE: "YELLOWWHITE".
 */
SuperMap.ColorGradientType = {
    BLACK_WHITE: "BLACKWHITE",
    BLUE_BLACK: "BLUEBLACK",
    BLUE_RED: "BLUERED",
    BLUE_WHITE: "BLUEWHITE",
    CYAN_BLACK: "CYANBLACK",
    CYAN_BLUE: "CYANBLUE",
    CYAN_GREEN: "CYANGREEN",
    CYAN_WHITE: "CYANWHITE",
    GREEN_BLACK: "GREENBLACK",
    GREEN_BLUE: "GREENBLUE",
    GREEN_ORANGE_VIOLET: "GREENORANGEVIOLET",
    GREEN_RED: "GREENRED",
    GREEN_WHITE: "GREENWHITE",
    PINK_BLACK: "PINKBLACK",
    PINK_BLUE: "PINKBLUE",
    PINK_RED: "PINKRED",
    PINK_WHITE: "PINKWHITE",
    RAIN_BOW: "RAINBOW",
    RED_BLACK: "REDBLACK",
    RED_WHITE: "REDWHITE",
    SPECTRUM: "SPECTRUM",
    TERRAIN: "TERRAIN",
    YELLOW_BLACK: "YELLOWBLACK",
    YELLOW_BLUE: "YELLOWBLUE",
    YELLOW_GREEN: "YELLOWGREEN",
    YELLOW_RED: "YELLOWRED",
    YELLOW_WHITE: "YELLOWWHITE"
};

/**
 * Constant: TextAlignment
 * {Object} 文本对齐枚举类。
 *
 * TOPLEFT: "TOPLEFT",
 *
 * TOPCENTER: "TOPCENTER",
 *
 * TOPRIGHT: "TOPRIGHT",
 *
 * BASELINELEFT: "BASELINELEFT",
 *
 * BASELINECENTER: "BASELINECENTER",
 *
 * BASELINERIGHT: "BASELINERIGHT",
 *
 * BOTTOMLEFT: "BOTTOMLEFT",
 *
 * BOTTOMCENTER: "BOTTOMCENTER",
 *
 * BOTTOMRIGHT: "BOTTOMRIGHT",
 *
 * MIDDLELEFT: "MIDDLELEFT",
 *
 * MIDDLECENTER: "MIDDLECENTER",
 *
 * MIDDLERIGHT: "MIDDLERIGHT".
 */
SuperMap.TextAlignment = {
    TOPLEFT: "TOPLEFT",
    TOPCENTER: "TOPCENTER",
    TOPRIGHT: "TOPRIGHT",
    BASELINELEFT: "BASELINELEFT",
    BASELINECENTER: "BASELINECENTER",
    BASELINERIGHT: "BASELINERIGHT",
    BOTTOMLEFT: "BOTTOMLEFT",
    BOTTOMCENTER: "BOTTOMCENTER",
    BOTTOMRIGHT: "BOTTOMRIGHT",
    MIDDLELEFT: "MIDDLELEFT",
    MIDDLECENTER: "MIDDLECENTER",
    MIDDLERIGHT: "MIDDLERIGHT"
};

/**
 * Constant: FillGradientMode
 * {Object} 渐变填充风格的渐变类型枚举类。
 *
 * NONE: "NONE",
 *
 * LINEAR: "LINEAR",
 *
 * RADIAL: "RADIAL",
 *
 * CONICAL: "CONICAL",
 *
 * SQUARE: "SQUARE".
 */
SuperMap.FillGradientMode = {
    NONE: "NONE",
    LINEAR: "LINEAR",
    RADIAL: "RADIAL",
    CONICAL: "CONICAL",
    SQUARE: "SQUARE"
};

/**
 * Constant: AlongLineDirection
 * {Object} 标签沿线标注方向枚举类。
 *
 * NORMAL: "ALONG_LINE_NORMAL",
 *
 * LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
 *
 * LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
 *
 * RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
 *
 * RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM".
 */
SuperMap.AlongLineDirection = {
    NORMAL: "ALONG_LINE_NORMAL",
    LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
    LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
    RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
    RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM"
};

/**
 * Constant: LabelBackShape
 * {Object} 标签专题图中标签背景的形状枚举类。
 *
 * DIAMOND: "DIAMOND",
 *
 * ELLIPSE: "ELLIPSE",
 *
 * MARKER: "MARKER",
 *
 * NONE: "NONE",
 *
 * RECT: "RECT",
 *
 * ROUNDRECT: "ROUNDRECT",
 *
 * TRIANGLE: "TRIANGLE".
 */
SuperMap.LabelBackShape = {
    DIAMOND: "DIAMOND",
    ELLIPSE: "ELLIPSE",
    MARKER: "MARKER",
    NONE: "NONE",
    RECT: "RECT",
    ROUNDRECT: "ROUNDRECT",
    TRIANGLE: "TRIANGLE"
};

/**
 * Constant: LabelOverLengthMode
 * {Object} 标签专题图中超长标签的处理模式枚举类。
 *
 * NEWLINE: "NEWLINE",
 *
 * NONE: "NONE",
 *
 * OMIT: "OMIT".
 */
SuperMap.LabelOverLengthMode = {
    NEWLINE: "NEWLINE",
    NONE: "NONE",
    OMIT: "OMIT"
};

/**
 * Constant: DirectionType
 * {Object} 网络分析中方向枚举类。
 * 在行驶引导子项中使用。
 *
 * EAST: "EAST",
 *
 * NONE: "NONE",
 *
 * NORTH: "NORTH",
 *
 * SOURTH: "SOURTH",
 *
 * WEST: "WEST".
 */
SuperMap.DirectionType = {
    EAST: "EAST",
    NONE: "NONE",
    NORTH: "NORTH",
    SOURTH: "SOURTH",
    WEST: "WEST"
};

/**
 * Constant: SideType
 * {Object} 行驶位置枚举类。
 * 表示在行驶在路的左边、右边或者路上的枚举,该类用在行驶导引子项类中。
 *
 * LEFT: "LEFT",
 *
 * MIDDLE: "MIDDLE",
 *
 * NONE: "NONE",
 *
 * RIGHT: "RIGHT".
 */
SuperMap.SideType = {
    LEFT: "LEFT",
    MIDDLE: "MIDDLE",
    NONE: "NONE",
    RIGHT: "RIGHT"
};

/**
 * Constant: SupplyCenterType
 * {Object} 资源供给中心类型枚举类。
 * 该枚举类定义了网络分析中资源中心点的类型，主要用于资源分配和选址分区。
 * 资源供给中心点的类型包括非中心，固定中心和可选中心。固定中心用于资源分配分析； 固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
 *
 * FIXEDCENTER: "FIXEDCENTER",
 *
 * NULL: "NULL",
 *
 * OPTIONALCENTER: "OPTIONALCENTER".
 */
SuperMap.SupplyCenterType = {
    FIXEDCENTER: "FIXEDCENTER",
    NULL: "NULL",
    OPTIONALCENTER: "OPTIONALCENTER"
};

/**
 * Constant: TurnType
 * {Object} 转弯方向枚举类。
 * 用在行驶引导子项类中，表示转弯的方向。
 *
 * AHEAD: "AHEAD",
 *
 * BACK: "BACK",
 *
 * END: "END",
 *
 * LEFT: "LEFT",
 *
 * NONE: "NONE",
 *
 * RIGHT: "RIGHT".
 */
SuperMap.TurnType = {
    AHEAD: "AHEAD",
    BACK: "BACK",
    END: "END",
    LEFT: "LEFT",
    NONE: "NONE",
    RIGHT: "RIGHT"
};

/**
 * Constant: BufferEndType
 * {Object} 缓冲区分析BufferEnd类型。
 *
 * FLAT: "FLAT",
 *
 * ROUND: "ROUND".
 */
SuperMap.BufferEndType = {
    FLAT: "FLAT",
    ROUND: "ROUND"
};

/**
 * Constant: OverlayOperationType
 * {Object} 叠加分析类型枚举。
 *
 * CLIP: "CLIP",
 *
 * ERASE: "ERASE",
 *
 * IDENTITY: "IDENTITY",
 *
 * INTERSECT: "INTERSECT",
 *
 * UNION: "UNION",
 *
 * UPDATE: "UPDATE",
 *
 * XOR: "XOR".
 */
SuperMap.OverlayOperationType = {
    CLIP: "CLIP",
    ERASE: "ERASE",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    UNION: "UNION",
    UPDATE: "UPDATE",
    XOR: "XOR"
};

/**
 * Constant: SmoothMethod
 * {Object} 光滑方法枚举类。
 * 用于从Grid 或DEM数据生成等值线或等值面时对等值线或者等值面的边界线进行平滑处理的方法。
 *
 * BSPLINE: "BSPLINE",
 *
 * POLISH: "POLISH".
 */
SuperMap.SmoothMethod = {
    BSPLINE: "BSPLINE",
    POLISH: "POLISH"
};

/**
 * Constant: SurfaceAnalystMethod
 * {Object} 表面分析方法枚举类。
 * 通过对数据进行表面分析，能够挖掘原始数据所包含的信息，使某些细节明显化，易于分析。
 *
 * ISOLINE: "ISOLINE",
 *
 * ISOREGION: "ISOREGION".
 */
SuperMap.SurfaceAnalystMethod = {
    ISOLINE: "ISOLINE",
    ISOREGION: "ISOREGION"
};
/**
 * Constant: DataReturnMode
 * {Object} 数据返回模式枚举类。
 * 该枚举类用于指定空间分析返回结果模式,包含返回数据集标识和记录集、只返回数据集标识(数据集名称@数据源名称)及只返回记录集三种模式。
 *
 * DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
 *
 * DATASET_ONLY: "DATASET_ONLY",
 *
 * RECORDSET_ONLY: "RECORDSET_ONLY".
 */
SuperMap.DataReturnMode = {
    DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
    DATASET_ONLY: "DATASET_ONLY",
    RECORDSET_ONLY: "RECORDSET_ONLY"
};

/**
 * Constant: EditType
 * {Object} 要素集更新模式枚举类。
 * 该枚举类用于指定数据服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 *
 * ADD: "add",
 *
 * UPDATE: "update",
 *
 * DELETE: "delete".
 */
SuperMap.EditType = {
    ADD: "add",
    UPDATE: "update",
    DELETE: "delete"
};

/**
 * Constant: TransferTactic
 * {Object} 公交换乘策略枚举类。
 * 该枚举类用于指定公交服务中要素集更新模式,包含添加要素集、更新要素集和删除要素集。
 *
 * LESS_TIME: "LESS_TIME",
 *
 * LESS_TRANSFER: "LESS_TRANSFER",
 *
 * LESS_WALK: "LESS_WALK",
 *
 * MIN_DISTANCE: "MIN_DISTANCE"
 */
SuperMap.TransferTactic = {
    LESS_TIME: "LESS_TIME",
    LESS_TRANSFER: "LESS_TRANSFER",
    LESS_WALK: "LESS_WALK",
    MIN_DISTANCE: "MIN_DISTANCE"
};

/**
 * Constant: TransferPreference
 * {Object} 公交换乘策略枚举类。
 * 该枚举类用于指定交通换乘服务中设置地铁优先、公交优先、不乘地铁、无偏好等偏好设置。
 *
 * BUS: "BUS",
 *
 * SUBWAY: "SUBWAY",
 *
 * NO_SUBWAY: "NO_SUBWAY",
 *
 * NONE: "NONE"
 */
SuperMap.TransferPreference = {
    BUS: "BUS",
    SUBWAY: "SUBWAY",
    NO_SUBWAY: "NO_SUBWAY",
    NONE: "NONE"
};

/**
 * Constant: GridType
 * {Object} 地图背景格网类型枚举类。
 *
 * CROSS: "CROSS",
 *
 * GRID: "GRID",
 *
 * POINT: "POINT"
 */
SuperMap.GridType = {
    CROSS: "CROSS",
    GRID: "GRID",
    POINT: "POINT"
};

/**
 * Constant: ColorSpaceType
 * {Object} 色彩空间枚举。
 * 由于成色原理的不同，决定了显示器、投影仪这类靠色光直接合成颜色的颜色设备和打印机、
 * 印刷机这类靠使用颜料的印刷设备在生成颜色方式上的区别。
 * 针对上述不同成色方式，SuperMap 提供两种色彩空间，
 * 分别为 RGB 和 CMYK。RGB 主要用于显示系统中，CMYK 主要用于印刷系统中。
 *
 * CMYK: "CMYK",
 *
 * RGB: "RGB"
 */
SuperMap.ColorSpaceType = {
    CMYK: "CMYK",
    RGB: "RGB"
};

/**
 * Constant: LayerType
 * {Object} 图层类型。
 *
 * UGC: "UGC",
 *
 * WMS: "WMS"
 *
 * WFS: "WFS",
 *
 * CUSTOM: "CUSTOM"
 */
SuperMap.LayerType = {
    UGC: "UGC",
    WMS: "WMS",
    WFS: "WFS",
    CUSTOM: "CUSTOM"

};

/**
 * Constant: StatisticMode
 * {Object} 字段统计方法类型。
 *
 * AVERAGE: "AVERAGE", 统计所选字段的平均值
 *
 * MAX: "MAX", 统计所选字段的最大值
 *
 * MIN: "MIN", 统计所选字段的最小值
 *
 * STDDEVIATION: "STDDEVIATION", 统计所选字段的标准差
 *
 * SUM: "SUM", 统计所选字段的总和
 *
 * VARIANCE: "VARIANCE", 统计所选字段的方差
 */
SuperMap.StatisticMode = {
    AVERAGE: "AVERAGE",
    MAX: "MAX",
    MIN: "MIN",
    STDDEVIATION: "STDDEVIATION",
    SUM: "SUM",
    VARIANCE: "VARIANCE"
};

/**
 * Constant: PixelFormat
 * {Object} 栅格与影像数据存储的像素格式枚举类。
 *
 * BIT16: "BIT16", 每个像元用16个比特(即2个字节)表示
 *
 * BIT32: "BIT32", 每个像元用32个比特(即4个字节)表示
 *
 * BIT64: "BIT64", 每个像元用64个比特(即8个字节)表示，只提供给栅格数据集使用
 *
 * SINGLE: "SINGLE", 每个像元用4个字节来表示，只提供给栅格数据集使用
 *
 * DOUBLE: "DOUBLE", 每个像元用8个字节来表示，只提供给栅格数据集使用
 *
 * UBIT1: "UBIT1", 每个像元用1个比特表示
 *
 * UBIT4: "UBIT4", 每个像元用4个比特来表示
 *
 * UBIT8: "UBIT8", 每个像元用8个比特(即1个字节)来表示
 *
 * UBIT24: "UBIT24", 每个像元用24个比特(即3个字节)来表示
 *
 * UBIT32: "UBIT32", 每个像元用32个比特(即4个字节)来表示
 */
SuperMap.PixelFormat = {
    BIT16: "BIT16",
    BIT32: "BIT32",
    BIT64: "BIT64",
    SINGLE: "SINGLE",
    DOUBLE: "DOUBLE",
    UBIT1: "UBIT1",
    UBIT4: "UBIT4",
    UBIT8: "UBIT8",
    UBIT24: "UBIT24",
    UBIT32: "UBIT32"
};

/**
 * Constant: SearchMode
 * {Object} 内插时使用的样本点的查找方式枚举
 *
 * KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT", 使用 KDTREE 的固定点数方式查找参与内插分析的点
 *
 * KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS", 使用 KDTREE 的定长方式查找参与内插分析的点
 *
 * NONE: "NONE", 不进行查找，使用所有的输入点进行内插分析
 *
 * QUADTREE: "QUADTREE", 使用 QUADTREE 方式查找参与内插分析的点，仅对样条（RBF）插值和普通克吕金（Kriging）有用
 */
SuperMap.SearchMode = {
    KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT",
    KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS",
    NONE: "NONE",
    QUADTREE: "QUADTREE"
};

/**
 * Constant: InterpolationAlgorithmType
 * {Object} 插值分析的算法的类型
 *
 * KRIGING: "KRIGING", 普通克吕金插值法
 *
 * SimpleKriging: "SimpleKriging", 简单克吕金插值法
 *
 * UniversalKriging: "UniversalKriging", 泛克吕金插值法
 */
SuperMap.InterpolationAlgorithmType = {
    KRIGING: "KRIGING",
    SimpleKriging: "SimpleKriging",
    UniversalKriging: "UniversalKriging"
};

/**
 * Constant: VariogramMode
 * {Object} 克吕金（Kriging）插值时的半变函数类型枚举
 *
 * EXPONENTIAL: "EXPONENTIAL", 指数函数（Exponential Variogram Mode）
 *
 * GAUSSIAN: "GAUSSIAN",  高斯函数（Gaussian Variogram Mode）
 *
 * SPHERICAL: "SPHERICAL", 球型函数（Spherical Variogram Mode）
 */
SuperMap.VariogramMode = {
    EXPONENTIAL: "EXPONENTIAL",
    GAUSSIAN: "GAUSSIAN",
    SPHERICAL: "SPHERICAL"
};

/**
 * Constant: Exponent
 * {Object} 定义了泛克吕金（UniversalKriging）插值时样点数据中趋势面方程的阶数
 *
 * EXP1: "EXP1", 阶数为1
 *
 * EXP2: "EXP2", 阶数为2
 */
SuperMap.Exponent = {
    EXP1: "EXP1",
    EXP2: "EXP2"
};
SuperMap.ServerType = {
    ISERVER: "ISERVER",
    IPORTAL: "IPORTAL",
    ONLINE: "ONLINE"
};
/**
 * token申请的客户端标识类型
 * @type {{IP: string, REFERER: string, REQUESTIP: string, NONE: string}}
 */
SuperMap.ClientType = {
    IP: "IP",
    REFERER: "Referer",
    REQUESTIP: "RequestIP",
    NONE: "NONE",
    SERVER: "SERVER",
    WEB: "WEB"
};
/**
 * 客户端专题图图表类型
 * @type {{BAR: string, BAR3D: string, CIRCLE: string, PIE: string, POINT: string, LINE: string, RING: string}}
 */
SuperMap.ChartType = {
    BAR: "Bar",
    BAR3D: "Bar3D",
    CIRCLE: "Circle",
    PIE: "Pie",
    POINT: "Point",
    LINE: "Line",
    RING: "Ring"
};

/**
 * 裁剪分析模式
 * @type {{CLIP: string, INTERSECT: string}}
 */
SuperMap.ClipAnalystMode = {
    CLIP: "clip",
    INTERSECT: "intersect"
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(31);
var fetchJsonp = __webpack_require__(30);
var SuperMap = __webpack_require__(0);

SuperMap.Support = {
    cors: window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest()
};

SuperMap.FetchRequest = {

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
                return this.delete(url, params, options);
            default:
                return this.get(url, params, options);
        }
    },

    get: function get(url, params, options) {
        var type = 'GET';
        url = this._processUrl(url);
        url = SuperMap.Util.urlAppend(url, this._getParameterString(params || {}));
        if (url.length <= 2000) {
            if (SuperMap.Util.isInTheSameDomain(url) || SuperMap.Support.cors && this._isMVTRequest(url)) {
                return this._fetch(url, params, options, type);
            }
            if (!SuperMap.Util.isInTheSameDomain(url)) {
                url = url.replace('.json', '.jsonp');
                return this._fetchJsonp(url, options);
            }
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    delete: function _delete(url, params, options) {
        var type = 'DELETE';
        url = this._processUrl(url);
        url = SuperMap.Util.urlAppend(url, this._getParameterString(params || {}));
        if (url.length <= 2000 && SuperMap.Support.cors) {
            return this._fetch(url, params, options, type);
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    post: function post(url, params, options) {
        return this._fetch(this._processUrl(url), params, options, 'POST');
    },

    put: function put(url, params, options) {
        return this._fetch(this._processUrl(url), params, options, 'PUT');
    },

    _postSimulatie: function _postSimulatie(type, url, params, options) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + '_method= ' + type;
        return this.post(url, params, options);
    },

    _processUrl: function _processUrl(url) {
        if (this._isMVTRequest(url)) {
            return url;
        }

        if (url.indexOf('.json') === -1) {
            if (url.indexOf("?") < 0) {
                url += '.json';
            } else {
                var urlArrays = url.split("?");
                if (urlArrays.length === 2) {
                    url = urlArrays[0] + ".json?" + urlArrays[1];
                }
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
            return this._timeout(options.timeout, fetch(url, {
                method: type,
                headers: options.headers,
                body: type === 'PUT' || type === 'POST' ? params : undefined,
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: 'cors'
            }).then(function (response) {
                return response;
            }));
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: 'cors'
        }).then(function (response) {
            return response;
        });
    },

    _fetchJsonp: function _fetchJsonp(url, options) {
        options = options || {};
        return fetchJsonp(url, { method: 'GET', timeout: options.timeout }).then(function (response) {
            return response;
        });
    },

    _timeout: function _timeout(seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"));
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
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Array) {
                    var encodedItemArray = [];
                    var item;
                    for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                        item = value[itemIndex];
                        encodedItemArray.push(encodeURIComponent(item === null || item === undefined ? "" : item));
                    }
                    encodedValue = '[' + encodedItemArray.join(",") + ']';
                } else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
            }
        }
        return paramsArray.join("&");
    },

    _isMVTRequest: function _isMVTRequest(url) {
        return url.indexOf('.mvt') > -1 || url.indexOf('.pbf') > -1;
    }

};
module.exports = SuperMap.FetchRequest;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = SuperMap;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Layer.MapVLayer
 * MapV图层。
 */
var SuperMap = __webpack_require__(3);
var MapVRenderer = __webpack_require__(29);
SuperMap.Layer.MapVLayer = SuperMap.Class(SuperMap.Layer, {

    /**
     * mapv dataset 对象
     */
    dataSet: null,

    /**
     *mapv 绘图风格配置信息
     */
    options: null,

    /**
     * Proterty: supported
     * {Boolean} 当前浏览器是否支持canvas绘制，默认为false。
     * 决定了MapV图是否可用，内部判断使用。
     */
    supported: false,

    /**
     * Proterty: canvas
     * {Canvas} MapV图主绘制面板。
     */
    canvas: null,

    /**
     * Proterty: canvas
     * {Canvas} MapV图主绘制对象。
     */
    canvasContext: null,

    /**
     * MapV支持webgl和普通canvas渲染.
     * 但目前本图层webgl渲染不能正确显示，待解决
     *
     * @param name
     * @param options 有两个参数
     *        dataSet: mapv 的dataSet对象
     *        options: mapv 绘图风格配置信息
     */
    initialize: function initialize(name, options) {
        this.EVENT_TYPES = SuperMap.Layer.prototype.EVENT_TYPES;

        SuperMap.Layer.prototype.initialize.apply(this, arguments);
        //MapV图要求使用canvas绘制，判断是否支持
        this.canvas = document.createElement("canvas");
        if (!this.canvas.getContext) {
            return;
        }
        this.supported = true;
        //构建绘图面板
        this.canvas.style.position = "absolute";
        this.canvas.style.top = 0 + "px";
        this.canvas.style.left = 0 + "px";
        this.div.appendChild(this.canvas);
        var context = this.options.context || "2d";
        this.canvasContext = this.canvas.getContext(context);
        this.attribution = "© 2017 百度 MapV with <a target='_blank' href='http://iclient.supermapol.com' " + "style='color: #08c;text-decoration: none;'>SuperMap iClient</a>";
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。
     */
    destroy: function destroy() {
        this.dataSet = null;
        this.options = null;
        this.renderer = null;
        this.supported = null;
        this.canvas = null;
        this.canvasContext = null;
        this.maxWidth = null;
        this.maxHeight = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);
    },

    /**
     * 追加数据
     * @param dataSet {MapV.DataSet}
     * @param options {MapV options}
     */
    addData: function addData(dataSet, options) {
        this.renderer && this.renderer.addData(dataSet, options);
    },

    /**
     * 设置数据
     * @param dataSet {MapV.DataSet}
     * @param options {MapV options}
     */
    setData: function setData(dataSet, options) {
        this.renderer && this.renderer.setData(dataSet, options);
    },

    getData: function getData() {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    },

    /**
     * 按照过滤条件移除数据
     * @param filter
     * eg: filter=function(data){
     *         if(data.id="1"){
     *            return true
     *         }
     *         return false;
     *     }
     */
    removeData: function removeData(filter) {
        this.renderer && this.renderer.removeData(filter);
    },

    clearData: function clearData() {
        this.renderer.clearData();
    },

    /**
     * Method: setMap
     * 图层已经添加到Map中。
     *
     * 如果当前浏览器支持canvas，则开始渲染要素；如果不支持则移除图层。
     *
     * Parameters:
     * map - {SuperMap.Map}需要绑定的map对象。
     */
    setMap: function setMap(map) {
        SuperMap.Layer.prototype.setMap.apply(this, arguments);
        this.renderer = new MapVRenderer(map, this, this.dataSet, this.options);
        if (!this.supported) {
            this.map.removeLayer(this);
        } else {
            this.redraw();
        }
    },

    /**
     * Method: moveTo
     * 重置当前MapV图层的div，再一次与Map控件保持一致。
     * 修改当前显示范围，当平移或者缩放结束后开始重绘MapV图的渲染效果。
     *
     * Parameters:
     * bounds - {SuperMap.Bounds}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo: function moveTo(bounds, zoomChanged, dragging) {
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);
        if (!this.supported) {
            return;
        }
        this.zoomChanged = zoomChanged;
        if (!dragging) {
            this.div.style.visibility = "hidden";
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left) + "px";
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top) + "px";
            /*this.canvas.style.left = this.div.style.left;
             this.canvas.style.top = this.div.style.top;*/
            var size = this.map.getSize();
            this.div.style.width = parseInt(size.w) + "px";
            this.div.style.height = parseInt(size.h) + "px";
            this.canvas.width = parseInt(size.w);
            this.canvas.height = parseInt(size.h);
            this.canvas.style.width = this.div.style.width;
            this.canvas.style.height = this.div.style.height;
            this.maxWidth = size.w;
            this.maxHeight = size.h;
            this.div.style.visibility = "";
            if (!zoomChanged) {
                this.renderer && this.renderer.render();
            }
        }

        if (zoomChanged) {
            this.renderer && this.renderer.render();
        }
    },

    /**
     * 将经纬度转成底图的投影坐标
     * @param latLng
     */
    transferToMapLatLng: function transferToMapLatLng(latLng) {
        var source = "EPSG:4326",
            dest = "EPSG:4326";
        var unit = this.map.getUnits();
        if (["m", "meter"].indexOf(unit.toLowerCase()) > -1) {
            dest = "EPSG:3857";
        }
        return new SuperMap.LonLat(latLng.lon, latLng.lat).transform(source, dest);
    },

    CLASS_NAME: "SuperMap.Layer.MapVLayer"
});

module.exports = SuperMap.Layer.MapVLayer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(3);
var ServiceBase = __webpack_require__(2);
var AddressMatchService = __webpack_require__(10);

/**
 * 地址匹配服务，包括正向匹配和反向匹配。
 */
SuperMap.REST.AddressMatchService = SuperMap.Class(ServiceBase, {

    initialize: function initialize(url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
    },

    code: function code(params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new AddressMatchService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.code(me.url + '/geocoding', params);
        return me;
    },

    decode: function decode(params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new AddressMatchService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
        return me;
    },

    _processFormat: function _processFormat(resultFormat) {
        return resultFormat ? resultFormat : SuperMap.DataFormat.GEOJSON;
    },

    CLASS_NAME: "SuperMap.REST.AddressMatchService"
});

module.exports = SuperMap.REST.AddressMatchService;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(3);
var ServiceBase = __webpack_require__(2);
var KernelDensityJobsService = __webpack_require__(16);
var SingleObjectQueryJobsService = __webpack_require__(18);
var BuildCacheJobsService = __webpack_require__(12);
var SummaryMeshJobsService = __webpack_require__(20);
var SummaryRegionJobsService = __webpack_require__(22);
var VectorClipJobsService = __webpack_require__(24);
/**
 * @class SuperMap.REST.ProcessingJobsService
 * @description 大数据处理相关服务类。
 * @augments SuperMap.ServiceBase
 * @example
 * 用法：
 *      new SuperMap.REST.ProcessingJobsService(url,options)
 *      .getKernelDensityJobs(function(result){
 *          //doSomething
 *      })
 * @param url -{String} 大数据服务地址。
 * @param options - {Object} 交互服务时所需可选参数
 */
SuperMap.REST.ProcessingJobsService = SuperMap.Class(ServiceBase, {

    initialize: function initialize(url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
        this.kernelDensityJobs = {};
        this.buildCacheJobs = {};
        this.summaryMeshJobs = {};
        this.queryJobs = {};
        this.summaryRegionJobs = {};
        this.vectorClipJobs = {};
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getKernelDensityJobs
     * @description 获取密度分析作业的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getKernelDensityJobs: function getKernelDensityJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        kernelDensityJobsService.getKernelDensityJobs();
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getKernelDensityJob
     * @description 获取某一个密度分析作业。
     * @param id - {String}空间分析作业的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getKernelDensityJob: function getKernelDensityJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        kernelDensityJobsService.getKernelDensityJob(id);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.addKernelDensityJob
     * @description 新建一个密度分析作业。
     * @param params -{SuperMap.KernelDensityJobParameter} 创建一个空间分析作业的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    addKernelDensityJob: function addKernelDensityJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
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
        kernelDensityJobsService.addKernelDensityJob(param, seconds);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getKernelDensityJobState
     * @description 获取密度分析作业的状态。
     * @param id - {String}密度分析作业的id。
     */
    getKernelDensityJobState: function getKernelDensityJobState(id) {
        return this.kernelDensityJobs[id];
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryMeshJobs
     * @description 获取格网聚合分析作业的列表。
     * @param callback - {function}  请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getSummaryMeshJobs: function getSummaryMeshJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryMeshJobsService.getSummaryMeshJobs();
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryMeshJob
     * @description 获取某一个格网聚合分析作业。
     * @param id - {String}空间分析作业的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getSummaryMeshJob: function getSummaryMeshJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryMeshJobsService.getSummaryMeshJob(id);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.addSummaryMeshJob
     * @description 新建一个格网聚合分析作业。
     * @param params - {SuperMap.SummaryMeshJobParameter} 格网聚合分析任务参数类。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    addSummaryMeshJob: function addSummaryMeshJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
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
        summaryMeshJobsService.addSummaryMeshJob(param, seconds);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryMeshJobState
     * @description 获取格网聚合分析作业的状态。
     * @param id - {String} 格网聚合分析作业的id。
     */
    getSummaryMeshJobState: function getSummaryMeshJobState(id) {
        return this.summaryMeshJobs[id];
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getBuildCacheJobs
     * @description 获取生成地图缓存作业的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getBuildCacheJobs: function getBuildCacheJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var buildCacheJobsService = new BuildCacheJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        buildCacheJobsService.getBuildCacheJobs();
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getBuildCacheJob
     * @description 获取某一个生成地图缓存作业。
     * @param id - {String} 空间分析作业的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getBuildCacheJob: function getBuildCacheJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var buildCacheJobsService = new BuildCacheJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        buildCacheJobsService.getBuildCacheJob(id);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.addBuildCacheJob
     * @description 新建一个生成地图缓存作业。
     * @param params - {SuperMap.BuildCacheJobParameter} 地图缓存作业参数类
     * @param callback - {function} 请求结果的回调函数
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔
     * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    addBuildCacheJob: function addBuildCacheJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var buildCacheJobsService = new BuildCacheJobsService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function processRunning(job) {
                    me.buildCacheJobs[job.id] = job.state;
                }
            },
            format: format
        });
        buildCacheJobsService.addBuildCacheJob(param, seconds);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getBuildCacheJobState
     * @description 获取生成地图缓存作业的状态。
     * @param id - {String}生成地图缓存作业的id。
     */
    getBuildCacheJobState: function getBuildCacheJobState(id) {
        return this.buildCacheJobs[id];
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getQueryJobs
     * @description 获取单对象查询分析作业的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getQueryJobs: function getQueryJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        singleObjectQueryJobsService.getQueryJobs();
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getQueryJob
     * @description 获取某一个单对象查询分析作业。
     * @param id - {String}空间分析作业的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getQueryJob: function getQueryJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        singleObjectQueryJobsService.getQueryJob(id);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.addQueryJob
     * @description 新建一个单对象查询分析作业。
     * @param params -{SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析作业的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    addQueryJob: function addQueryJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
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
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getQueryJobState
     * @description 获取单对象查询分析作业的状态。
     * @param id - {String}单对象查询分析作业的id。
     */
    getQueryJobState: function getQueryJobState(id) {
        return this.queryJobs[id];
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryRegionJobs
     * @description 获取范围分析作业的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getSummaryRegionJobs: function getSummaryRegionJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryRegionJobsService.getSummaryRegionJobs();
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryRegionJob
     * @description 获取某一个范围分析作业。
     * @param id - {String}范围分析作业的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    getSummaryRegionJob: function getSummaryRegionJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryRegionJobsService.getSummaryRegionJob(id);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.addSummaryRegionJob
     * @description 新建一个范围分析作业。
     * @param params -{SuperMap.SummaryRegionJobParameter} 创建一个范围分析作业的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.ProcessingJobsService}
     */
    addSummaryRegionJob: function addSummaryRegionJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
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
        summaryRegionJobsService.addSummaryRegionJob(param, seconds);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryRegionJobState
     * @description 获取范围分析作业的状态。
     * @param id - {String}范围分析作业的id。
     */
    getSummaryRegionJobState: function getSummaryRegionJobState(id) {
        return this.summaryRegionJobs[id];
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析作业的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.ProcessingJobsService}
     */
    getVectorClipJobs: function getVectorClipJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        vectorClipJobsService.getVectorClipJobs();
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getVectorClipJob
     * @description 获取某一个矢量裁剪分析作业。
     * @param id - {String}空间分析作业的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.ProcessingJobsService}
     */
    getVectorClipJob: function getVectorClipJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        vectorClipJobsService.getVectorClipJob(id);
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.addVectorClipJob
     * @description 新建一个矢量裁剪分析作业。
     * @param params -{SuperMap.VectorClipJobsParameter} 创建一个空间分析作业的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.ProcessingJobsService}
     */
    addVectorClipJob: function addVectorClipJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
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
        return me;
    },

    /**
     * @function SuperMap.REST.ProcessingJobsService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析作业的状态。
     * @param id - {String}矢量裁剪分析作业的id。
     */
    getVectorClipJobState: function getVectorClipJobState(id) {
        return this.vectorClipJobs[id];
    },

    _processFormat: function _processFormat(resultFormat) {
        return resultFormat ? resultFormat : SuperMap.DataFormat.GEOJSON;
    },

    _processParams: function _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.query) {
            params.query = params.query.toString();
        }
        if (params.bounds) {
            params.bounds = params.bounds.toString();
        }
        return params;
    }
});

module.exports = SuperMap.REST.ProcessingJobsService;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ServiceBase = __webpack_require__(2);
var SuperMap = __webpack_require__(0);
var Request = __webpack_require__(5);
__webpack_require__(13);
__webpack_require__(14);

/**
 * @class SuperMap.AddressMatchService
   @constructs SuperMap.AddressMatchService
 * @classdesc
 * 地址匹配服务，包括正向匹配和反向匹配。
 * @api

 */

SuperMap.AddressMatchService = SuperMap.Class(ServiceBase, {
    /**
     *
     * @method SuperMap.AddressMatchService.prototype.initialize
     * @param options - {Object} 参数。
     * @param url {string}
     */
    initialize: function initialize(url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
    },

    destroy: function destroy() {
        ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.AddressMatchService.prototype.code
     * @param url {string} 正向地址匹配服务地址
     * @param params {object} 正向地址匹配服务参数
     */
    code: function code(url, params) {
        this.processAsync(url, params);
    },

    /**
     * @method SuperMap.AddressMatchService.prototype.decode
     * @param url {string} 反向地址匹配服务地址
     * @param params {object} 反向地址匹配服务参数
     */
    decode: function decode(url, params) {
        this.processAsync(url, params);
    },

    processAsync: function processAsync(url, params) {
        var me = this;
        return Request.get(url, params).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result) {
                me.serviceProcessCompleted(result);
            } else {
                me.serviceProcessFailed(result);
            }
        }).catch(function (e) {
            me.eventListeners.processFailed({ error: e });
        });
    },

    serviceProcessCompleted: function serviceProcessCompleted(result) {
        ServiceBase.prototype.serviceProcessCompleted.apply(this, arguments);
    },

    serviceProcessFailed: function serviceProcessFailed(result) {
        ServiceBase.prototype.serviceProcessFailed.apply(this, arguments);
    },

    CLASS_NAME: "SuperMap.AddressMatchService"
});

module.exports = SuperMap.AddressMatchService;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);

/**
 * @class SuperMap.BuildCacheJobParameter
 * @description 地图缓存作业参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName - {String} 数据集名称。<br>
 *         cacheName - {String} 缓存名称。<br>
 *         cacheType - {String} 存储类型。<br>
 *         serverAdresses - {String} MongoDB地址。<br>
 *         database -- {String} 数据库。<br>
 *         version -{String} 版本。<br>
 *         bounds -{SuperMap.Bounds} 缓存范围。<br>
 *         imageType -{number} 缓存类型.<br>
 *         level -{number} 缓存比例尺级别。
 */
SuperMap.BuildCacheJobParameter = SuperMap.Class({

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.datasetName -{String}
     * @description 数据集名称。
     */
    datasetName: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.cacheName -{String}
     * @description 缓存名称。
     */
    cacheName: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.cacheType -{String}
     * @description 存储类型。
     */
    cacheType: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.serverAdresses -{String}
     * @description MongoDB地址。
     */
    serverAdresses: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.database -{String}
     * @description 数据库。
     */
    database: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.version -{String}
     * @description 版本。
     */
    version: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.bounds -{SuperMap.Bounds}
     * @description 缓存范围。
     */
    bounds: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.imageType -{number}
     * @description 缓存类型。
     */
    imageType: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.level -{number}
     * @description 缓存比例尺级别。
     */
    level: null,

    initialize: function initialize(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function destroy() {
        this.datasetName = null;
        this.cacheName = null;
        this.cacheType = null;
        this.serverAdresses = null;
        this.database = null;
        this.version = null;
        this.bounds = null;
        this.imageType = null;
        this.level = null;
    }

});

SuperMap.BuildCacheJobParameter.toObject = function (buildCacheJobParameter, tempObj) {
    for (var name in buildCacheJobParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = buildCacheJobParameter[name];
            continue;
        }
        if (SuperMap.Util.indexOf(["cacheName", "cacheType", "serverAdresses", "database", "version"], name) > -1) {
            tempObj['output'] = tempObj['output'] || {};
            tempObj['output'][name] = buildCacheJobParameter[name];
            continue;
        }
        tempObj['drawing'] = tempObj['drawing'] || {};
        tempObj['drawing'][name] = buildCacheJobParameter[name];
    }
};

module.exports = SuperMap.BuildCacheJobParameter;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
var ProcessingJobsServiceBase = __webpack_require__(1);
var BuildCacheJobParameter = __webpack_require__(11);

/**
 * @class SuperMap.BuildCacheJobsService
 * @description 创建大数据缓存服务类
 * @augments SuperMap.ProcessingJobsServiceBase
 * @param url -{String} 大数据缓存服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.BuildCacheJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    /*
     * @function SuperMap.BuildCacheJobsService.prototype.initialize
     * @description SuperMap.BuildCacheJobsService 的构造函数
     * @param url -{String} 大数据缓存服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
    initialize: function initialize(url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/mapping/buildCache";
    },

    /**
     * @inheritDoc
     */
    destroy: function destroy() {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.BuildCacheJobsService.prototype.getBuildCacheJobs
     * @description 获取创建的大数据缓存
     */
    getBuildCacheJobs: function getBuildCacheJobs() {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.BuildCacheJobsService.prototype.getBuildCacheJob
     * @description 获取指定 id的大数据缓存
     * @param id - {String} 大数据缓存id
     */
    getBuildCacheJob: function getBuildCacheJob(id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.BuildCacheJobsService.prototype.addBuildCacheJob
     * @description 新建大数据缓存服务
     * @param params - {BuildCacheJobParameter}地图缓存作业参数类
     * @param seconds - {String} 开始创建作业后，获取创建成功结果的时间间隔
     */
    addBuildCacheJob: function addBuildCacheJob(params, seconds) {
        ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, BuildCacheJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.BuildCacheJobsService"
});

module.exports = SuperMap.BuildCacheJobsService;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @class SuperMap.GeoCodingParameter
 * @constructs SuperMap.GeoCodingParameter
 * @classdesc
 * 地理正向匹配参数类。
 * @api
 */
var SuperMap = __webpack_require__(0);
SuperMap.GeoCodingParameter = SuperMap.Class({

    /**
     * APIProperty: address
     * {String} 地点关键词。
     */
    address: null,

    /**
     * APIProperty: fromIndex
     * {number} 设置返回对象的起始索引值。
     */
    fromIndex: null,

    /**
     * APIProperty: toIndex
     * {number} 设置返回对象的结束索引值。
     */
    toIndex: null,

    /**
     * APIProperty: filters
     * {Array} 过滤字段，限定查询区域。
     */
    filters: null,

    /**
     * APIProperty: filters
     * String 查询结果的坐标系。
     */
    prjCoordSys: null,

    /**
     * APIProperty: maxReturn
     * String 最大返回结果数。
     */
    maxReturn: null,

    /**
     * @method SuperMap.GeoCodingParameter.initialize
     * @param options - {Object} 参数。
     */

    initialize: function initialize(options) {
        if (!options) {
            return;
        }
        if (options.filters) {
            var strs = [];
            var fields = options.filters.split(',');
            fields.map(function (field) {
                strs.push("\"" + field + "\"");
            });
            options.filters = strs;
        }
        SuperMap.Util.extend(this, options);
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function destroy() {
        this.address = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
    }

});

module.exports = SuperMap.GeoCodingParameter;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @class SuperMap.GeoDecodingParameter
 * @constructs SuperMap.GeoDecodingParameter
 * @classdesc
 * 地理反向匹配参数类。
 * @api
 */
var SuperMap = __webpack_require__(0);
SuperMap.GeoDecodingParameter = SuperMap.Class({

    /**
     * APIProperty : x
     * {number} 查询位置的横坐标。
     */
    x: null,

    /**
     * APIProperty: y
     * {number} 查询位置的纵坐标。
     */
    y: null,

    /**
     * APIProperty: fromIndex
     * {number} 设置返回对象的起始索引值。
     */
    fromIndex: null,

    /**
     * APIProperty: toIndex
     * {number} 设置返回对象的结束索引值。
     */
    toIndex: null,

    /**
     * APIProperty: filters
     * {Array} 过滤字段，限定查询区域。
     */
    filters: null,

    /**
     * APIProperty: prjCoordSys
     * {String} 查询结果的坐标系。
     */
    prjCoordSys: null,

    /**
     * APIProperty: maxReturn
     * {number} 最大返回结果数。
     */
    maxReturn: null,

    /**
     * APIProperty: geoDecodingRadius
     * {number} 查询半径。
     */
    geoDecodingRadius: null,

    /**
     *
     * @method SuperMap.GeoDecodingParameter.initialize
     * @param options - {Object} 参数。
     */
    initialize: function initialize(options) {
        if (!options) {
            return;
        }
        if (options.filters) {
            var strs = [];
            var fields = options.filters.split(',');
            fields.map(function (field) {
                strs.push("\"" + field + "\"");
            });
            options.filters = strs;
        }
        SuperMap.Util.extend(this, options);
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function destroy() {
        this.x = null;
        this.y = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
        this.geoDecodingRadius = null;
    }

});

module.exports = SuperMap.GeoDecodingParameter;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);

/**
 * @class SuperMap.KernelDensityJobParameter
 * @description 密度分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName -{String} 数据集名。 <br>
 *         query -{SuperMap.Bounds} 分析范围。 <br>
 *         resolution -{number} 分辨率。 <br>
 *         method -{number} 分析方法。 <br>
 *         meshType -{number} 分析类型。 <br>
 *         fields -{String} 权重索引。 <br>
 *         radius -{number} 分析的影响半径。
 */
SuperMap.KernelDensityJobParameter = SuperMap.Class({

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.query -{SuperMap.Bounds}
     * @description 分析范围。
     */
    query: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.resolution -{number}
     * @description 网格大小。
     */
    resolution: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.method -{numbert}
     * @description 分析方法。
     */
    method: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.meshType -{numbert}
     * @description 分析类型。
     */
    meshType: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.fields -{String}
     * @description 权重索引。
     */
    fields: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.radius -{number}
     * @description 分析的影响半径。
     */
    radius: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.meshSizeUnit -{String}
     * @description 网格大小单位。
     */
    meshSizeUnit: 'Meter',

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.radiusUnit -{String}
     * @description 搜索半径单位。
     */
    radiusUnit: 'Meter',

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.areaUnit -{String}
     * @description 面积单位。
     */
    areaUnit: 'SquareMile',

    initialize: function initialize(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function destroy() {
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
    }

});

SuperMap.KernelDensityJobParameter.toObject = function (kernelDensityJobParameter, tempObj) {
    for (var name in kernelDensityJobParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = kernelDensityJobParameter[name];
            continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = kernelDensityJobParameter[name];
    }
};

module.exports = SuperMap.KernelDensityJobParameter;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
var ProcessingJobsServiceBase = __webpack_require__(1);
var KernelDensityJobParameter = __webpack_require__(15);
/**
 * @class SuperMap.KernelDensityJobsService
 * @description 核密度大数据服务类
 * @augments SuperMap.ProcessingJobsServiceBase
 * @param url -{String} 核密度大数据服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.KernelDensityJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.initialize
     * @description SuperMap.KernelDensityJobsService 的构造函数
     * @param url -{String} 核密度大数据服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
    initialize: function initialize(url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/density";
    },

    /**
     *@inheritDoc
     */
    destroy: function destroy() {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getKernelDensityJobs
     * @description 获取核密度大数据
     * @return {*}
     */
    getKernelDensityJobs: function getKernelDensityJobs() {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getKernelDensityJobs
     * @description 获取指定id的核密度大数据服务
     * @param id -{String} 指定要获取数据的id
     */
    getKernelDensityJob: function getKernelDensityJob(id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.addKernelDensityJob
     * @description 新建核密度大数据服务
     * @param params - {SuperMap.KernelDensityJobParameter} 创建一个空间分析作业的请求参数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addKernelDensityJob: function addKernelDensityJob(params, seconds) {
        return ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, KernelDensityJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.KernelDensityJobsService"
});

module.exports = SuperMap.KernelDensityJobsService;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
/**
 * @class SuperMap.SingleObjectQueryJobsParameter
 * @description 单对象空间查询分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{String} 数据集名。 <br>
 *         datasetQuery -{String} 查询对象所在的数据集名称。 <br>
 *         mode -{SuperMap.SpatialQueryMode} 空间查询模式 。 <br>
 */
SuperMap.SingleObjectQueryJobsParameter = SuperMap.Class({

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: null,

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetQuery -{String}
     * @description 查询对象所在的数据集名称。
     */
    datasetQuery: null,

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.mode -{SuperMap.SpatialQueryMode}
     * @description 空间查询模式 。
     */
    mode: null,

    initialize: function initialize(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function destroy() {
        this.datasetName = null;
        this.datasetQuery = null;
        this.mode = null;
    }

});

SuperMap.SingleObjectQueryJobsParameter.toObject = function (singleObjectQueryJobsParameter, tempObj) {
    for (var name in singleObjectQueryJobsParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = singleObjectQueryJobsParameter[name];
            continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = singleObjectQueryJobsParameter[name];
    }
};

module.exports = SuperMap.SingleObjectQueryJobsParameter;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
var ProcessingJobsServiceBase = __webpack_require__(1);
var SingleObjectQueryJobsParameter = __webpack_require__(17);
/**
 * @class SuperMap.SingleObjectQueryJobsService
 * @description 大数据单对象查询分析服务类
 * @augments SuperMap.ProcessingJobsServiceBase
 * @param url -{String} 大数据单对象空间查询分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.SingleObjectQueryJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.initialize
     * @description SuperMap.SingleObjectQueryJobsService 的构造函数
     * @param url -{String} 大数据单对象空间查询分析服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
    initialize: function initialize(url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/query";
    },

    /**
     *@inheritDoc
     */
    destroy: function destroy() {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.getQueryJobs
     * @description 获取大数据单对象空间查询分析所有作业
     * @return {*}
     */
    getQueryJobs: function getQueryJobs() {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getQueryJob
     * @description 获取指定id的单对象空间查询分析服务
     * @param id -{String} 指定要获取数据的id
     */
    getQueryJob: function getQueryJob(id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.addQueryJob
     * @description 新建大数据单对象空间查询分析服务
     * @param params - {SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析作业的请求参数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addQueryJob: function addQueryJob(params, seconds) {
        return ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, SingleObjectQueryJobsParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.SingleObjectQueryJobsService"
});

module.exports = SuperMap.SingleObjectQueryJobsService;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);

/**
 * @class SuperMap.SummaryMeshJobParameter
 * @description 格网聚合分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName -{String} 数据集名。<br>
 *        query -{SuperMap.Bounds} 分析范围。<br>
 *        resolution -{number} 分辨率。<br>
 *        statisticModes -{String} 分析模式。<br>
 *        meshType -{number} 分析类型。<br>
 *        fields -{number} 权重索引。<br>
 *        type -{String} 聚合类型。
 */
SuperMap.SummaryMeshJobParameter = SuperMap.Class({

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.regionDataset -{String}
     * @description 聚合面数据集(聚合类型为多边形聚合时使用的参数)。
     */
    regionDataset: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.query -{SuperMap.Bounds}
     * @description 分析范围(聚合类型为网格面聚合时使用的参数)。
     */
    query: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.resolution -{number}
     * @description 分辨率(聚合类型为网格面聚合时使用的参数)。
     */
    resolution: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.meshType -{number}
     * @description  网格面类型(聚合类型为网格面聚合时使用的参数)。
     */
    meshType: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.statisticModes -{String}
     * @description 统计模式。
     */
    statisticModes: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.fields -{number}
     * @description 权重字段。
     */
    fields: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.type -{String}
     * @description 聚合类型。
     */
    type: null,

    initialize: function initialize(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @inheritDoc
     */
    destroy: function destroy() {
        this.datasetName = null;
        this.query = null;
        this.resolution = null;
        this.statisticModes = null;
        this.meshType = null;
        this.fields = null;
        this.regionDataset = null;
        this.type = null;
    }

});

SuperMap.SummaryMeshJobParameter.toObject = function (summaryMeshJobParameter, tempObj) {
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
        if (summaryMeshJobParameter.type === 'SUMMARYMESH' && name !== 'regionDataset' || summaryMeshJobParameter.type === 'SUMMARYREGION' && !contains(['meshType', 'resolution', 'query'], name)) {
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = summaryMeshJobParameter[name];
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
};

module.exports = SuperMap.SummaryMeshJobParameter;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
var ProcessingJobsServiceBase = __webpack_require__(1);
var SummaryMeshJobParameter = __webpack_require__(19);

/**
 * @class SuperMap.SummaryMeshJobsService
 * @description 格网聚合分析大数据任务类。
 * @param url -{String} 格网聚合分析任务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.SummaryMeshJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    initialize: function initialize(url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/aggregatepoints";
    },

    /**
     * @inheritDoc
     */
    destroy: function destroy() {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.getSummaryMeshJobs
     * @description 获取格网聚合分析大数据
     */
    getSummaryMeshJobs: function getSummaryMeshJobs() {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.getSummaryMeshJob
     * @description 获取指定ip的格网聚合分析大数据
     * @param id -{String} 指定要获取数据的id
     */
    getSummaryMeshJob: function getSummaryMeshJob(id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.addSummaryMeshJob
     * @description 新建格网聚合分析大数据服务
     * @param params - {SuperMap.SummaryMeshJobParameter} 创建一个空间分析作业的请求参数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addSummaryMeshJob: function addSummaryMeshJob(params, seconds) {
        ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, SummaryMeshJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.SummaryMeshJobsService"
});

module.exports = SuperMap.SummaryMeshJobsService;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);

/**
 * @class SuperMap.SummaryRegionJobParameter
 * @description 范围汇总分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName -{String} 数据集名。 <br>
 *         sumShape -{Boolean} 是否统计长度或面积。 <br>
 *         query -{SuperMap.Bounds} 分析范围。 <br>
 *         standardSummaryFields -{Boolean} 以标准属字段统计。 <br>
 *         standardFields -{String} 以标准属字段统计的字段名称。 <br>
 *         standardStatisticModes -{String} 以标准属字段统计的统计模式。 <br>
 *         weightedSummaryFields -{Boolean} 以权重字段统计。 <br>
 *         weightedFields -{String} 以权重字段统计的字段名称。 <br>
 *         weightedStatisticModes -{String} 以权重字段统计的统计模式。 <br>
 *         resolution -{number} 网格大小。 <br>
 *         meshType -{number} 网格面汇总类型。 <br>
 *         meshSizeUnit -{String} 网格大小单位。 <br>
 *         type -{String} 汇总类型。 <br>
 */
SuperMap.SummaryRegionJobParameter = SuperMap.Class({

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: null,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.regionDataset -{String}
     * @description 汇总数据源（多边形汇总时用到的参数）。
     */
    regionDataset: null,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.sumShape -{Boolean}
     * @description 是否统计长度或面积。
     */
    sumShape: true,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.query -{SuperMap.Bounds}
     * @description 分析范围。
     */
    query: null,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardSummaryFields -{Boolean}
     * @description 以标准属字段统计。
     */
    standardSummaryFields: false,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardFields -{String}
     * @description 以标准属字段统计的字段名称。
     */
    standardFields: "",

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardStatisticModes -{String}
     * @description 以标准属字段统计的统计模式。
     */
    standardStatisticModes: "",

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedSummaryFields -{Boolean}
     * @description 以权重字段统计。
     */
    weightedSummaryFields: false,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedFields -{String}
     * @description 以权重字段统计的字段名称。
     */
    weightedFields: "",

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedStatisticModes -{String}
     * @description 以权重字段统计的统计模式。
     */
    weightedStatisticModes: "",

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.meshType -{number}
     * @description 网格面汇总类型。
     */
    meshType: 0,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.resolution -{number}
     * @description 网格大小。
     */
    resolution: null,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.meshSizeUnit -{String}
     * @description 网格大小单位。
     */
    meshSizeUnit: null,

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.type -{String}
     * @description 汇总类型。
     */
    type: "",

    initialize: function initialize(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function destroy() {
        this.datasetName = null;
        this.sumShape = null;
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
    }

});

SuperMap.SummaryRegionJobParameter.toObject = function (summaryRegionJobParameter, tempObj) {
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
        if (summaryRegionJobParameter.type === "SUMMARYREGION" || summaryRegionJobParameter.type === "SUMMARYMESH" && name !== "regionDataset") {
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = summaryRegionJobParameter[name];
        }
    }
};

module.exports = SuperMap.SummaryRegionJobParameter;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
var ProcessingJobsServiceBase = __webpack_require__(1);
var SummaryRegionJobParameter = __webpack_require__(21);
/**
 * @class SuperMap.SummaryRegionJobsService
 * @description 范围汇总分析服务类
 * @augments SuperMap.ProcessingJobsServiceBase
 * @param url -{String} 范围汇总分析服务地址。
 * @param options - {Object} 范围汇总分析服务可选参数。
 */
SuperMap.SummaryRegionJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.initialize
     * @description SuperMap.SummaryRegionJobsService 的构造函数
     * @param url -{String} 范围汇总分析服务地址。
     * @param options - {Object} 范围汇总分析服务可选参数。
     */
    initialize: function initialize(url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/summaryregion";
    },

    /**
     *@inheritDoc
     */
    destroy: function destroy() {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.getSummaryRegionJobs
     * @description 获取范围汇总分析任务集合。
     * @return {*}
     */
    getSummaryRegionJobs: function getSummaryRegionJobs() {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.getSummaryRegionJob
     * @description 获取指定id的范围汇总分析任务。
     * @param id -{String} 要获取范围汇总分析任务的id
     */
    getSummaryRegionJob: function getSummaryRegionJob(id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.addSummaryRegionJob
     * @description 新建范围汇总任务。
     * @param params - {SuperMap.SummaryRegionJobParameter} 创建一个范围汇总任务的请求参数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addSummaryRegionJob: function addSummaryRegionJob(params, seconds) {
        return ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, SummaryRegionJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.SummaryRegionJobsService"
});

module.exports = SuperMap.SummaryRegionJobsService;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
/**
 * @class SuperMap.VectorClipJobsParameter
 * @description 矢量裁剪分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{String} 数据集名。 <br>
 *         datasetOverlay -{String} 裁剪对象数据集。 <br>
 *         mode -{SuperMap.SpatialQueryMode} 裁剪分析模式 。 <br>
 */
SuperMap.VectorClipJobsParameter = SuperMap.Class({

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: null,

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.datasetOverlay -{String}
     * @description 裁剪对象数据集。
     */
    datasetOverlay: null,

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.mode -{SuperMap.ClipAnalystMode}
     * @description 裁剪分析模式 。
     */
    mode: null,

    initialize: function initialize(options) {
        options = options || {};
        if (options.mode && typeof options.mode === "string") {
            options.mode = options.mode.toLowerCase();
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function destroy() {
        this.datasetName = null;
        this.datasetOverlay = null;
        this.mode = null;
    }

});

SuperMap.VectorClipJobsParameter.toObject = function (vectorClipJobsParameter, tempObj) {
    for (var name in vectorClipJobsParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = vectorClipJobsParameter[name];
            continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = vectorClipJobsParameter[name];
    }
};

module.exports = SuperMap.VectorClipJobsParameter;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SuperMap = __webpack_require__(0);
var ProcessingJobsServiceBase = __webpack_require__(1);
var VectorClipJobsParameter = __webpack_require__(23);
/**
 * @class SuperMap.VectorClipJobsService
 * @description 大数据矢量裁剪分析服务类
 * @augments SuperMap.ProcessingJobsServiceBase
 * @param url -{String} 大数据矢量裁剪分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.VectorClipJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    /**
     * @function SuperMap.VectorClipJobsService.protitype.initialize
     * @description SuperMap.VectorClipJobsService 的构造函数
     * @param url -{String} 大数据矢量裁剪分析服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
    initialize: function initialize(url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/vectorclip";
    },

    /**
     *@inheritDoc
     */
    destroy: function destroy() {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.VectorClipJobsService.protitype.getVectorClipJobs
     * @description 获取大数据矢量裁剪分析所有作业
     * @return {*}
     */
    getVectorClipJobs: function getVectorClipJobs() {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getVectorClipJob
     * @description 获取指定id的矢量裁剪分析服务
     * @param id -{String} 指定要获取数据的id
     */
    getVectorClipJob: function getVectorClipJob(id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.VectorClipJobsService.protitype.addVectorClipJob
     * @description 新建大数据矢量裁剪分析服务
     * @param params - {SuperMap.VectorClipJobsParameter} 创建一个空间分析作业的请求参数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addVectorClipJob: function addVectorClipJob(params, seconds) {
        return ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, VectorClipJobsParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.VectorClipJobsService"
});

module.exports = SuperMap.VectorClipJobsService;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * key申请参数
 */
__webpack_require__(4);
var SuperMap = __webpack_require__(0);
/**
 * @class SuperMap.KeyServiceParameter
 * @constructs SuperMap.KeyServiceParameter
 * @classdesc
 * key申请参数

 * @api
 */
SuperMap.KeyServiceParameter = SuperMap.Class({
  name: null,
  serviceIds: null,
  clientType: SuperMap.ClientType.SERVER,
  limitation: null,
  /**
   * @method SuperMap.KeyServiceParameter.initialize
   * @param options - {Object} 参数。
   */
  initialize: function initialize(options) {
    SuperMap.Util.extend(this, options);
  },
  /**
   * @method SuperMap.KeyServiceParameter.toJSON
   * @return {string} 参数的JSON字符串
   */
  toJSON: function toJSON() {
    return {
      name: this.name,
      serviceIds: this.serviceIds,
      clientType: this.clientType,
      limitation: this.limitation
    };
  },
  CLASS_NAME: "SuperMap.KeyServiceParameter"
});

module.exports = SuperMap.KeyServiceParameter;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(25);
var Request = __webpack_require__(5);
var SuperMap = __webpack_require__(0);

/**
 * @class SuperMap.SecurityManager
 * @constructs SuperMap.SecurityManager
 * @classdesc
 *  安全管理中心
 *  提供iServer,iPortal,Online统一权限认证管理
 *  使用说明：
 *  创建任何一个服务之前调用SuperMap.SecurityManager.registerToken或
 *  SuperMap.SecurityManager.registerKey注册凭据。
 *  发送请求时根据url或者服务id获取相应的key或者token并自动添加到服务地址中
 * @api
 */

SuperMap.SecurityManager = {

    INNER_WINDOW_WIDTH: 600,
    INNER_WINDOW_HEIGHT: 600,

    /**
     *
     * @description 从服务器获取一个token,在此之前要注册服务器信息
     * @param url {String} -服务器域名+端口，如：http://localhost:8092
     * @param tokenParam {SuperMap.TokenServiceParameter}
     */
    generateToken: function generateToken(url, tokenParam) {
        var serverInfo = this.servers[url];
        if (!serverInfo) {
            return;
        }
        return Request.post(serverInfo.tokenServiceUrl, JSON.stringify(tokenParam.toJSON())).then(function (response) {
            return response.text();
        });
    },

    /**
     *
     * @description 注册安全服务器相关信息
     * @param serverInfos {SuperMap.ServerInfo}
     */
    registerServers: function registerServers(serverInfos) {
        this.servers = this.servers || {};
        if (!SuperMap.Util.isArray(serverInfos)) {
            serverInfos = [serverInfos];
        }
        for (var i = 0; i < serverInfos.length; i++) {
            var serverInfo = serverInfos[i];
            this.servers[serverInfo.server] = serverInfo;
        }
    },

    /**
     * @description 服务请求都会自动带上这个token
     * @param url {String} - 服务器域名+端口：如http://localhost:8090
     * @param token {String}
     */
    registerToken: function registerToken(url, token) {
        this.tokens = this.tokens || {};
        if (!url || !token) {
            return;
        }
        var domain = this._getTokenStorageKey(url);
        this.tokens[domain] = token;
    },

    /**
     * @description 注册key,ids为数组(存在一个key对应多个服务)
     * @param ids   {Array} 可以是服务id数组或者url地址数组或者webAPI类型数组
     * @param key   {String}
     */
    registerKey: function registerKey(ids, key) {
        this.keys = this.keys || {};
        if (!ids || ids.length < 1 || !key) {
            return;
        }

        ids = SuperMap.Util.isArray(ids) ? ids : [ids];
        for (var i = 0; i < ids.length; i++) {
            var id = this._getUrlRestString(ids[0]) || ids[0];
            this.keys[id] = key;
        }
    },

    getServerInfo: function getServerInfo(url) {
        this.servers = this.servers || {};
        return this.servers[url];
    },

    //token按照域名存储
    getToken: function getToken(url) {
        if (!url) {
            return;
        }
        this.tokens = this.tokens || {};
        var domain = this._getTokenStorageKey(url);
        return this.tokens[domain];
    },

    getKey: function getKey(id) {
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        return this.keys[key];
    },

    //Online登录验证
    loginOnline: function loginOnline(callbackLocation, newTab) {
        var loginUrl = SuperMap.SecurityManager.SSO + "/login?service=" + callbackLocation;
        this._open(loginUrl, newTab);
    },

    //iPortal登录验证
    loginPortal: function loginPortal(url, newTab) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "web/login" : "/web/login";
        this._open(url, newTab);
    },

    destroyAllCredentials: function destroyAllCredentials() {
        this.keys = null;
        this.tokens = null;
        this.servers = null;
    },

    destroyToken: function destroyToken(url) {
        if (!url) {
            return;
        }
        var domain = this._getTokenStorageKey(url);
        this.tokens = this.tokens || {};
        if (this.tokens[domain]) {
            delete this.tokens[domain];
        }
    },

    destroyKey: function destroyKey(id) {
        if (!id) {
            return;
        }
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        if (this.keys[key]) {
            delete this.keys[key];
        }
    },

    _open: function _open(url, newTab) {
        newTab = newTab != null ? newTab : true;
        var offsetX = window.screen.availWidth / 2 - this.INNER_WINDOW_WIDTH / 2;
        var offsetY = window.screen.availHeight / 2 - this.INNER_WINDOW_HEIGHT / 2;
        var options = "height=" + this.INNER_WINDOW_HEIGHT + ", width=" + this.INNER_WINDOW_WIDTH + ",top=" + offsetY + ", left=" + offsetX + ",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no";
        if (newTab) {
            window.open(url, 'login');
        } else {
            window.open(url, 'login', options);
        }
    },

    _getTokenStorageKey: function _getTokenStorageKey(url) {
        var patten = /http:\/\/([^\/]+)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    },

    _getUrlRestString: function _getUrlRestString(url) {
        if (!url) {
            return url;
        }
        var patten = /http:\/\/(.*\/rest)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    }

};
SuperMap.SecurityManager.SSO = "https://sso.supermap.com";
SuperMap.SecurityManager.ONLINE = "http://www.supermapol.com";
module.exports = SuperMap.SecurityManager;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * 服务器信息(安全相关)，包含服务器类型，服务地址，token服务地址等
 */
__webpack_require__(4);
var SuperMap = __webpack_require__(0);
/**
 * @class SuperMap.ServerInfo
 * @constructs SuperMap.ServerInfo
 * @classdesc
 * 服务器信息(安全相关)，包含服务器类型，服务地址，token服务地址等
 * @api
 */

SuperMap.ServerInfo = SuperMap.Class({
    //服务器类型:SuperMap.ServerType
    type: null,
    //如：http://supermapiserver:8090
    server: null,
    //非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json
    tokenServiceUrl: null,
    //非必填，如：http://supermapiserver:8092/web/mycontent/keys/register.json
    keyServiceUrl: null,
    /**
     * @method SuperMap.ServerInfo.initialize
     * @param type
     * @param options - {Object} 参数。
     */
    initialize: function initialize(type, options) {
        this.type = type || SuperMap.ServerType.ISERVER;
        SuperMap.Util.extend(this, options);
        if (!this.server) {
            console.error('server url require is not  undefined');
        }
        var patten = /http:\/\/([^\/]+)/i;
        this.server = this.server.match(patten)[0];

        var tokenServiceSuffix = "/services/security/tokens.json";
        if (this.type === SuperMap.ServerType.ISERVER && this.server.indexOf("iserver") < 0) {
            tokenServiceSuffix = "/iserver" + tokenServiceSuffix;
        }

        if (!this.tokenServiceUrl) {
            this.tokenServiceUrl = this.server + tokenServiceSuffix;
        }

        if (!this.keyServiceUrl) {
            if (this.type === SuperMap.ServerType.IPORTAL) {
                this.keyServiceUrl = this.server + "/web/mycontent/keys/register.json";
            } else if (this.type === SuperMap.ServerType.ONLINE) {
                this.keyServiceUrl = this.server + "/web/mycontent/keys.json";
            }
        }
    },
    CLASS_NAME: "SuperMap.ServerInfo"
});
module.exports = SuperMap.ServerInfo;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * token申请参数
 */
__webpack_require__(4);
var SuperMap = __webpack_require__(0);
/**
 * @class SuperMap.TokenServiceParameter
 * @constructs  SuperMap.TokenServiceParameter
 * @classdesc
 * token申请参数
 * @api
 */
SuperMap.TokenServiceParameter = SuperMap.Class({
    userName: null,
    password: null,
    //token申请的客户端标识类型
    clientType: SuperMap.ClientType.NONE,
    ip: null,
    //clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则传递相应的 URL。
    referer: null,
    //申请令牌的有效期，从发布令牌的时间开始计算，单位为分钟。
    expiration: 60,

    /**
     * @method SuperMap.TokenServiceParameter.initialize
     * @param options - {Object} 参数。
     */
    initialize: function initialize(options) {
        SuperMap.Util.extend(this, options);
    },
    /**
     * @method SuperMap.TokenServiceParameter.toJSON
     * @return {String} 参数的JSON字符串
     */
    toJSON: function toJSON() {
        return {
            userName: this.userName,
            password: this.password,
            clientType: this.clientType,
            ip: this.ip,
            referer: this.referer,
            expiration: this.expiration
        };
    },
    CLASS_NAME: "SuperMap.TokenServiceParameter"
});

module.exports = SuperMap.TokenServiceParameter;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * MapV renderer
 */

var SuperMap = __webpack_require__(3);
var mapv = {};
try {
    mapv = __webpack_require__(32);
} catch (ex) {
    mapv = {};
}
var MapVBaseLayer = mapv.baiduMapLayer ? mapv.baiduMapLayer.__proto__ : Function;

var MapVRenderer = function (_MapVBaseLayer) {
    _inherits(MapVRenderer, _MapVBaseLayer);

    function MapVRenderer(map, layer, dataSet, options) {
        _classCallCheck(this, MapVRenderer);

        if (!MapVBaseLayer) {
            return _possibleConstructorReturn(_this);
        }

        var _this = _possibleConstructorReturn(this, (MapVRenderer.__proto__ || Object.getPrototypeOf(MapVRenderer)).call(this, map, dataSet, options));

        var self = _this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        _this.canvasLayer = layer;
        self.transferToMercator();
        _this.clickEvent = _this.clickEvent.bind(_this);
        _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);
        _this.bindEvent();
        return _this;
    }

    _createClass(MapVRenderer, [{
        key: 'clickEvent',
        value: function clickEvent(e) {
            var pixel = e.layerPoint;
            _get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), 'clickEvent', this).call(this, pixel, e);
        }
    }, {
        key: 'mousemoveEvent',
        value: function mousemoveEvent(e) {
            var pixel = e.layerPoint;
            _get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), 'mousemoveEvent', this).call(this, pixel, e);
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.events.on({ 'click': this.clickEvent });
                }
                if (this.options.methods.mousemove) {
                    map.events.on({ 'mousemove': this.mousemoveEvent });
                }
            }
        }
    }, {
        key: 'unbindEvent',
        value: function unbindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.events.un({ 'click': this.clickEvent });
                }
                if (this.options.methods.mousemove) {
                    map.events.un({ 'mousemove': this.mousemoveEvent });
                }
            }
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.canvasLayer && this.canvasLayer.canvasContext;
        }

        //追加数据

    }, {
        key: 'addData',
        value: function addData(data, options) {
            var _data = data;
            if (data && data.get) {
                _data = data.get();
            }
            this.dataSet.add(_data);
            this.update({ options: options });
        }

        //更新覆盖原数据

    }, {
        key: 'setData',
        value: function setData(data, options) {
            var _data = data;
            if (data && data.get) {
                _data = data.get();
            }
            this.dataSet = this.dataSet || new mapv.DataSet();
            this.dataSet.set(_data);
            this.update({ options: options });
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.dataSet;
        }
    }, {
        key: 'removeData',
        value: function removeData(filter) {
            if (!this.dataSet) {
                return;
            }
            var newData = this.dataSet.get(filter);
            this.dataSet.set(newData);
            this.update({ options: null });
        }
    }, {
        key: 'clearData',
        value: function clearData() {
            this.dataSet && this.dataSet.clear();
            this.update({ options: null });
        }
    }, {
        key: 'render',
        value: function render(time) {
            this._canvasUpdate(time);
        }

        //墨卡托坐标为经纬度

    }, {
        key: 'transferToMercator',
        value: function transferToMercator() {
            if (this.options.coordType && ["bd09mc", "coordinates_mercator"].indexOf(this.options.coordType) > -1) {
                var data = this.dataSet.get();
                data = this.dataSet.transferCoordinate(data, function (coordinates) {
                    var pixel = SuperMap.Projection.transform({
                        x: coordinates[0],
                        y: coordinates[1]
                    }, "EPSG:3857", "EPSG:4326");
                    return [pixel.x, pixel.y];
                }, 'coordinates', 'coordinates');
                this.dataSet._set(data);
            }
        }
    }, {
        key: '_canvasUpdate',
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
                    var coord = layer.transferToMapLatLng({ lon: coordinate[0], lat: coordinate[1] });
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

            self.options._size = self.options.size;

            var worldPoint = map.getViewPortPxFromLonLat(layer.transferToMapLatLng({ lon: 0, lat: 0 }));

            var zoomUnit = Math.pow(2, 14 - map.getZoom());
            if (self.options.unit == 'm') {
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

            this.drawContext(context, new mapv.DataSet(data), self.options, worldPoint);

            self.options.updateCallback && self.options.updateCallback(time);
        }
    }, {
        key: 'init',
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
    }, {
        key: 'addAnimatorEvent',
        value: function addAnimatorEvent() {
            this.map.events.on({ 'movestart': this.animatorMovestartEvent.bind(this) });
            this.map.events.on({ 'moveend': this.animatorMoveendEvent.bind(this) });
        }
    }, {
        key: 'clear',
        value: function clear(context) {
            context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
    }, {
        key: 'show',
        value: function show() {
            this.map.addLayer(this.canvasLayer);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.map.removeLayer(this.canvasLayer);
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.canvasLayer.redraw();
        }
    }]);

    return MapVRenderer;
}(MapVBaseLayer);

module.exports = MapVRenderer;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.fetchJsonp = mod.exports;
  }
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

  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined'
  // error if request timeout
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
    document.getElementsByTagName('head')[0].removeChild(script);
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
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
      }, timeout);
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
/* 31 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
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

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
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
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
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
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
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
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
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

    if (input instanceof Request) {
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
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
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
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
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

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
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

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
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
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 32 */
/***/ (function(module, exports) {

if(typeof mapv === 'undefined') {var e = new Error("Cannot find module \"mapv\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = mapv;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
__webpack_require__(8);
module.exports = __webpack_require__(7);


/***/ })
/******/ ]);