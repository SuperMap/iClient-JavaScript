/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {GetFeaturesServiceBase} from './GetFeaturesServiceBase';
import {GetFeaturesByIDsParameters} from './GetFeaturesByIDsParameters';

/**
 * @class GetFeaturesByIDsService
 * @deprecatedclass SuperMap.GetFeaturesByIDsService
 * @category iServer Data FeatureResults
 * @classdesc 数据集 ID 查询服务类。在数据集集合中查找指定 ID 号对应的空间地物要素。
 * @param {string} url - 服务地址。请求数据服务中数据集查询服务。
 *                       URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；</br>
 *                       例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {GetFeaturesServiceBase}
 * @example
 * var myGetFeaturesByIDsService = new GetFeaturesByIDsService(url);
 * function getFeatureCompleted(object){//todo};
 * function getFeatureError(object){//todo}
 * @usage
 */
export class GetFeaturesByIDsService extends GetFeaturesServiceBase {


    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.GetFeaturesByIDsService";
    }

    /**
     * @function GetFeaturesByIDsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function GetFeaturesByIDsService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry 等）。
     * @param {GetFeaturesByIDsParameters} params - ID 查询参数类。
     * @returns {string} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        return GetFeaturesByIDsParameters.toJsonParameters(params);
    }

}
