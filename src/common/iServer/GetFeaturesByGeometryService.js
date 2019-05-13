/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {GetFeaturesServiceBase} from './GetFeaturesServiceBase';
import {GetFeaturesByGeometryParameters} from './GetFeaturesByGeometryParameters';

/**
 * @class SuperMap.GetFeaturesByGeometryService
 * @category iServer Data FeatureResults
 * @classdesc 数据集几何查询服务类，查询与指定几何对象符合一定空间关系的矢量要素。
 * @param {string} url - 数据查询结果资源地址。请求数据服务中数据集查询服务。
 * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data；
 * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data"
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，iServer|iPortal|Online。 
 * @param {SuperMap.DataFormat} [options.format=SuperMap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @extends {SuperMap.GetFeaturesServiceBase}
 * @example
 * var myService = new SuperMap.GetFeaturesByGeometryService(url, {
     *     eventListeners: {
     *           "processCompleted": getFeatureCompleted,
     *           "processFailed": getFeatureError
     *           }
     * });
 * function getFeatureCompleted(object){//todo};
 * function getFeatureError(object){//todo}
 */
export class GetFeaturesByGeometryService extends GetFeaturesServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.GetFeaturesByGeometryService";
    }

    /**
     * @function SuperMap.GetFeaturesByGeometryService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.GetFeaturesByGeometryService.prototype.getJsonParameters
     * @param {SuperMap.GetFeaturesByGeometryParameters} params - 数据集几何查询参数类。
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry等）。
     * @returns {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        return GetFeaturesByGeometryParameters.toJsonParameters(params);
    }


}

SuperMap.GetFeaturesByGeometryService = GetFeaturesByGeometryService;