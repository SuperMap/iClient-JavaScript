/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Data/GetGridCellInfosResult.js
 * @requires SuperMap/REST/Data/GetGridCellInfosEventArgs.js
 */

/**
 * Class: SuperMap.REST.GetGridCellInfosService
 * 数据栅格查询服务，支持查询指定地理位置的栅格信息
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.GetGridCellInfosService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     *
     * 此类支持的事件类型:
     * - *processCompleted* 服务端返回查询结果触发该事件。
     * - *processFailed* 服务端返回查询结果失败触发该事件。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 GetGridCellInfosService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 GetFieldsService 支持的
     * 两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * APIProperty: datasetName
     * {String} 数据集名称。
     */
    datasetName: null,

    /**
     * APIProperty: dataSourceName
     * {String} 数据源名称。
     */
    dataSourceName: null,

    /**
     * Property: dataSourceName
     * {String} 数据集类型。
     */
    datasetType: null,

    /**
     * APIProperty: X
     * {Number} 要查询的地理位置X轴
     */
    X: null,

    /**
     * APIProperty: X
     * {Number} 要查询的地理位置Y轴
     */
    Y: null,

    /**
     * Constructor: SuperMap.REST.GetGridCellInfosService
     * 字段查询服务构造函数。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.GetGridCellInfosService(url, {eventListeners: {
     *     "processCompleted": queryCompleted,
     *     "processFailed": queryError
     *     }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 查询服务地址。例如: http://localhost:8090/iserver/services/data-jingjin/rest/data
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if(!!options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this;
        me.events = new SuperMap.Events(me, null, me.EVENT_TYPES, true);
        if(me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function() {
        var me = this;
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        me.EVENT_TYPES = null;
        me.X = null;
        me.Y = null;
        me.datasetName = null;
        me.dataSourceName = null;
        me.datasetType = null;
        if (me.events) {
            me.events.destroy();
            me.events = null;
        }
        if (me.eventListeners) {
            me.eventListeners = null;
        }
    },

    /**
     * APIMethod: processAsync
     * 执行服务，查询数据集信息。
     */
    processAsync: function(options) {
        if(options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? ("datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".json") :
                ("/datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".json");
        } else {
            me.url += (end == "/") ? ("datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".jsonp") :
                ("/datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".jsonp");
        }

        me.queryRequest(me.getDatasetInfoCompleted, me.getDatasetInfoFailed);
    },

    /**
     * Method: queryRequest
     * 执行服务，查询。
     */
    queryRequest: function(successFun, failedFunc) {
        var me = this;
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: successFun,
            failure: failedFunc
        });
    },

    /**
     * Method: getDatasetInfoCompleted
     * 数据集查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getDatasetInfoCompleted: function(result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        me.datasetType = result.datasetInfo.type;
        me.queryGridInfos();
    },

    /**
     * Method: queryGridInfos
     * 执行服务，查询数据集栅格信息信息。
     */
    queryGridInfos: function() {
        var me = this,
            re = /\.json/,
            index = re.exec(me.url).index,
            urlBack = me.url.substring(index),
            urlFront = me.url.substring(0, me.url.length - urlBack.length);
        if(me.datasetType == "GRID") {
            me.url = urlFront + "/gridValue" + urlBack;
        } else {
            me.url = urlFront + "/imageValue" + urlBack;
        }

        if(me.X != null && me.Y != null) {
            me.url += '?x=' + me.X + '&y=' + me.Y;
        }
        me.queryRequest(me.getGridCellInfosCompleted, me.getGridCellInfosFailed);
    },

    /**
     * Method: getDatasetInfoFailed
     * 数据集查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getDatasetInfoFailed: function(result) {
        var me = this;
        me.getGridCellInfosFailed(result);
    } ,

    /**
     * Method: getGridCellInfosCompleted
     * 栅格信息查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getGridCellInfosCompleted: function(result) {
        var me = this,
            qe = null,
            getGridCellInfosResult = null;
        result = SuperMap.Util.transformResult(result);
        getGridCellInfosResult = SuperMap.REST.GetGridCellInfosResult.fromJson(result);

        qe = new SuperMap.REST.GetGridCellInfosEventArgs(getGridCellInfosResult, result);
        me.events.triggerEvent('processCompleted', qe);
    },

    /**
     * Method: getGridCellInfosFailed
     * 栅格信息查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getGridCellInfosFailed: function(result) {
        var me = this,
            qe = null,
            error = null,
            serviceException = null;
        result = SuperMap.Util.transformResult(result);
        error = result.error;
        if (!error) {
            return;
        }
        serviceException = SuperMap.ServiceException.fromJson(error);
        qe = new SuperMap.ServiceFailedEventArgs(serviceException, result);
        me.events.triggerEvent("processFailed", qe);
    },

    CLASS_NAME: "SuperMap.REST.GetGridCellInfosService"
});