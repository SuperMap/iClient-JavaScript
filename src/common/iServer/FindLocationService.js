import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindLocationParameters} from './FindLocationParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.FindLocationService
 * @category  iServer NetworkAnalyst Location
 * @classdesc 选址分区分析服务类。
 *               选址分区分析是为了确定一个或多个待建设施的最佳或最优位置，使得设施可以用一种最经济有效的方式为需求方提供服务或者商品。
 *               选址分区不仅仅是一个选址过程，还要将需求点的需求分配到相应的新建设施的服务区中，因此称之为选址与分区。
 *               选址分区分析结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.NetworkAnalystServiceBase
 * @example
 * (start code)
 * var findLocationService = new SuperMap.FindLocationService(url, {
 *     eventListeners: {
 *         "processCompleted": findLocationCompleted,
 *		   "processFailed": findLocationError
 *		   }
 * });
 * (end)
 * @param url - {string} 服务的访问地址。<br>
 *                        如 http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FindLocationService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindLocationService";
    }

    /**
     * @function SuperMap.FindLocationService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.FindLocationService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FindLocationParameters} 选址分区分析服务参数类
     */
    processAsync(params) {
        if (!(params instanceof FindLocationParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "location" : "/location") + ".json?";
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
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.FindLocationService.prototype.getCentersJson
     * @description 将数组对象转化为JSON字符串。
     * @param params - {Array} 需要转换的参数
     * @return {string} 转化后的JSON字符串。
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
     * @function SuperMap.FindLocationService.prototype.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。
     * @param result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
        if (!result) {
            return null;
        }
        var geoJSONFormat = new GeoJSON();
        if (result.demandResults) {
            result.demandResults = JSON.parse(geoJSONFormat.write(result.demandResults));
        }
        if (result.supplyResults) {
            result.supplyResults = JSON.parse(geoJSONFormat.write(result.supplyResults));
        }

        return result;
    }

}

SuperMap.FindLocationService = FindLocationService;