/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindLocationParameters} from './FindLocationParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class FindLocationService
 * @deprecatedclass SuperMap.FindLocationService
 * @category iServer NetworkAnalyst Location
 * @classdesc 选址分区分析服务类。
 *            选址分区分析是为了确定一个或多个待建设施的最佳或最优位置，使得设施可以用一种最经济有效的方式为需求方提供服务或者商品。
 *            选址分区不仅仅是一个选址过程，还要将需求点的需求分配到相应的新建设施的服务区中，因此称之为选址与分区。
 *            选址分区分析结果通过该类支持的事件的监听函数参数获取
 * @extends {NetworkAnalystServiceBase}
 * @example
 * (start code)
 * var findLocationService = new FindLocationService(url);
 * (end)
 * @param {string} url - 服务地址。
 *                       如 http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class FindLocationService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindLocationService";
    }

    /**
     * @function FindLocationService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FindLocationService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {FindLocationParameters} params - 选址分区分析服务参数类
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof FindLocationParameters)) {
            return;
        }
        var me = this,
            jsonObject;
        me.url = Util.urlPathAppend(me.url, 'location');
        jsonObject = {
            isFromCenter: params.isFromCenter,
            expectedSupplyCenterCount: params.expectedSupplyCenterCount,
            weightName: params.weightName,
            turnWeightField: params.turnWeightField,
            returnEdgeFeature: true,
            returnEdgeGeometry: true,
            returnNodeFeature: true,
            mapParameter: Util.toJSON(params.mapParameter),
            supplyCenters: me.getCentersJson(params.supplyCenters)
        };
        return me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: callback,
            failure: callback
        });
    }

    /**
     * @function FindLocationService.prototype.getCentersJson
     * @description 将数组对象转化为JSON字符串。
     * @param {Array} params - 需要转换的参数
     * @returns {string} 转化后的JSON字符串。
     */
    getCentersJson(params) {
        var json = "[",
            len = params ? params.length : 0;
        for (var i = 0; i < len; i++) {
            if (i > 0) {
                json += ",";
            }
            json += Util.toJSON(params[i]);
        }
        json += "]";
        return json;
    }

    /**
     * @function FindLocationService.prototype.toGeoJSONResult
     * @description 将含有 geometry 的数据转换为 GeoJSON 格式。
     * @param {Object} result - 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
        if (!result) {
            return null;
        }
        var geoJSONFormat = new GeoJSON();
        if (result.demandResults) {
            result.demandResults = geoJSONFormat.toGeoJSON(result.demandResults);
        }
        if (result.supplyResults) {
            result.supplyResults = geoJSONFormat.toGeoJSON(result.supplyResults);
        }

        return result;
    }

}
