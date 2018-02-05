import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class SuperMap.NetworkAnalystServiceBase
 * @category  iServer NetworkAnalyst
 * @classdesc 网络分析服务基类。
 * @description 网络分析服务基类。
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 网络分析服务地址
 * @param options - {Object} 网络分析可选参数。如：<br>
 *        format - {{@link SuperMap.DataFormat}} 查询结果返回格式
 *
 */
export class NetworkAnalystServiceBase extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        /**
         * @member SuperMap.NetworkAnalystServiceBase.prototype.format -{SuperMap.DataFormat}
         * @description 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
         *              参数格式为"ISERVER","GEOJSON"
         * @default "GEOJSON"
         */
        this.format = DataFormat.GEOJSON;

        this.CLASS_NAME = "SuperMap.NetworkAnalystServiceBase";
    }

    /**
     * @function SuperMap.NetworkAnalystServiceBase.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy() {
        super.destroy();
        this.format = null;
    }

    /**
     * @function SuperMap.NetworkAnalystServiceBase.prototype.serviceProcessCompleted
     * @description 分析完成，执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this, analystResult;
        result = Util.transformResult(result);
        if (result && me.format === DataFormat.GEOJSON && typeof me.toGeoJSONResult === 'function') {
            analystResult = me.toGeoJSONResult(result);
        }
        if (!analystResult) {
            analystResult = result;
        }
        me.events.triggerEvent("processCompleted", {result: analystResult});
    }

    /**
     * @function SuperMap.NetworkAnalystServiceBase.prototype.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。只处理结果中的路由，由子类实现
     * @param result - {Object} 服务器返回的结果对象。
     * @return{Object} geojson对象
     */
    toGeoJSONResult(result) { // eslint-disable-line no-unused-vars
        return null;
    }
}

SuperMap.NetworkAnalystServiceBase = NetworkAnalystServiceBase;