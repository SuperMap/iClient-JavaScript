import SuperMap from '../SuperMap';
import CommonServiceBase from './CommonServiceBase';
/**
 * @class SuperMap.GetFieldsService
 * @constructs SuperMap.GetFieldsService
 * @classdesc
 * 字段查询服务，支持查询指定数据集的中所有属性字段（field）的集合。
 * @extends {SuperMap.CommonServiceBase}
 * @api
 * @example 例如：
 * (start code)
 * var myService = new SuperMap.GetFieldsService(url, {eventListeners: {
     *     "processCompleted": getFieldsCompleted,
     *     "processFailed": getFieldsError
     *     },
     *     datasource: "World",
     *     dataset: "Countries"
     * };
 * (end)
 *
 */
export default  class GetFieldsService extends CommonServiceBase {


    /**
     * APIProperty: datasource
     * {String} 要查询的数据集所在的数据源名称。
     */
    datasource = null;

    /**
     * APIProperty: dataset
     * {String} 要查询的数据集名称。
     */
    dataset = null;

    /**
     * @method SuperMap.GetFieldsService.initialize
     * @description 字段查询服务构造函数。
     * @param url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/data-world/rest/data 即可。
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。</br>
     * datasource - {String}</br>
     * dataset - {String}</br>
     */
    constructor(url, options) {
        super(url, options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /*
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }


    /*
     * APIMethod: processAsync
     * 执行服务，查询指定数据集的字段信息。
     */
    processAsync() {
        var me = this,
            end = me.url.substr(me.url.length - 1, 1),
            datasetURL = "datasources/" + me.datasource + "/datasets/" + me.dataset;
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? datasetURL + "/fields.json?" : "/" + datasetURL + "/fields.json?";
        } else {
            me.url += (end == "/") ? datasetURL + "/fields.jsonp?" : "/" + datasetURL + "/fields.jsonp?";
        }

        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


    CLASS_NAME = "SuperMap.GetFieldsService"
}

SuperMap.GetFieldsService = GetFieldsService;