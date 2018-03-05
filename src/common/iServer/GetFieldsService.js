import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class SuperMap.GetFieldsService
 * @category  iServer Data Field
 * @classdesc 字段查询服务，支持查询指定数据集的中所有属性字段（field）的集合。
 * @param url - {string} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param options - {Object} 可選参数。如:</br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 *        datasource - {string}</br>
 *        dataset - {string}</br>
 * @extends SuperMap.CommonServiceBase
 * @example
 * var myService = new SuperMap.GetFieldsService(url, {eventListeners: {
 *     "processCompleted": getFieldsCompleted,
 *     "processFailed": getFieldsError
 *     },
 *     datasource: "World",
 *     dataset: "Countries"
 * };
 *
 */
export class GetFieldsService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member SuperMap.GetFieldsService.prototype.datasource -{string}
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member SuperMap.GetFieldsService.prototype.dataset -{string}
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.GetFieldsService";
    }


    /**
     * @function SuperMap.GetFieldsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }


    /**
     * @function SuperMap.GetFieldsService.prototype.processAsync
     * @description 执行服务，查询指定数据集的字段信息。
     */
    processAsync() {
        var me = this,
            end = me.url.substr(me.url.length - 1, 1),
            datasetURL = "datasources/" + me.datasource + "/datasets/" + me.dataset;
        me.url += (end == "/") ? datasetURL + "/fields.json?" : "/" + datasetURL + "/fields.json?";

        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.GetFieldsService = GetFieldsService;