/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.EditFeaturesService
 * 数据服务中数据集添加、更新、删除服务类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../base');

SuperMap.REST.EditFeaturesService = SuperMap.Class(SuperMap.ServiceBase, {

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
     * {<SuperMap.Events>} 在 EditFeaturesService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     *
     * 例如：
     *     (start code)
     * var myService = new SuperMap.REST.EditFeaturesService(url);
     * myService.events.on({
     *     "processCompleted": editFeatureCompleted, 
     *       "processFailed": editFeatureError
     *       }
     * );
     * function editFeatureCompleted(EditFeaturesEventArgs){//todo};
     * function editFeatureError(EditFeaturesEventArgs){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 EditFeaturesService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: returnContent
     * {Boolean} 要素添加时，isUseBatch 不传或传为 false 的情况下有效。
     *           true 表示直接返回新创建的要素的 ID 数组;false 表示返回创建的 featureResult 资源的 URI。默认不传时为 false。
     */
    returnContent: false,

    /**
     * Property: isUseBatch
     * {Boolean} 是否使用批量添加要素功能，要素添加时有效。
     *           批量添加能够提高要素编辑效率。
     *           true 表示批量添加；false 表示不使用批量添加。默认不传时为 false。
     */
    isUseBatch: false,

    /**
     * Constructor: SuperMap.REST.EditFeaturesService
     * 数据集编辑服务基类构造函数。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.EditFeaturesService(url, {eventListeners: {
     *     "processCompleted": editFeatureCompleted, 
     *     "processFailed": editFeatureError
     *       }
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 服务端的数据服务资源地址。请求数据服务中数据集编辑服务，URL 应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/datasources/name/{数据源名}/datasets/name/{数据集名} 。
     * 例如：http://localhost:8090/iserver/services/data-jingjin/rest/data/datasources/name/Jingjin/datasets/name/Landuse_R
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this,
            end;
        me.events = new SuperMap.Events(
            me, null, me.EVENT_TYPES, true
        );
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? "features.json?" : "/features.json?";
        } else {
            me.url += (end == "/") ? "features.jsonp?" : "/features.jsonp?";
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.EVENT_TYPES = null;
        me.returnContent = null;
        me.isUseBatch = null;
        me.fromIndex = null;
        me.toIndex = null;
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
     * 负责将客户端的更新参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.EditFeaturesParameters>} 编辑要素参数。
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this,
            method = "POST",
            ids = "",
            editType = params.editType,
            jsonParameters = null;

        me.returnContent = params.returnContent;
        me.isUseBatch = params.isUseBatch;
        jsonParameters = SuperMap.REST.EditFeaturesParameters.toJsonParameters(params);
        if (editType === SuperMap.REST.EditType.DELETE) {
            ids = SuperMap.Util.toJSON(params.IDs);
            me.url += "ids=" + ids;
            method = "DELETE";
            jsonParameters = ids;
        } else if (editType === SuperMap.REST.EditType.UPDATE) {
            method = "PUT";
        } else {
            if (me.isUseBatch) {
                me.url += "isUseBatch=" + me.isUseBatch;
                me.returnContent = false;
            }
            if (me.returnContent) {
                me.url += "returnContent=" + me.returnContent;
                method = "POST";
            }
        }

        me.request({
            method: method,
            data: jsonParameters,
            scope: me,
            success: me.editFeaturesComplted,
            failure: me.editFeaturesFailed
        });
    },

    /**
     * Method: editFeaturesComplted
     * 编辑完成，执行此方法。
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    editFeaturesComplted: function (result) {
        result = SuperMap.Util.transformResult(result);
        this.events.triggerEvent("processCompleted", {result: result});
    },

    /**
     * Method: editFeaturesFailed
     * 编辑失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    editFeaturesFailed: function (result) {
        result = SuperMap.Util.transformResult(result);
        this.events.triggerEvent("processFailed", result);
    },

    CLASS_NAME: "SuperMap.REST.EditFeaturesService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.EditFeaturesService(url, options);
};