/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SpatialAnalystBase
 * @deprecatedclass SuperMap.SpatialAnalystBase
 * @category  iServer Core
 * @classdesc 空间分析服务基类。
 * @param {string} url - 地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @usage
 */
export class SpatialAnalystBase extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        /**
         * @member {DataFormat} [SpatialAnalystBase.prototype.format=DataFormat.GEOJSON]
         * @description 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
         */
        this.format = (options && options.format) || DataFormat.GEOJSON;
        this.CLASS_NAME = "SuperMap.SpatialAnalystBase";
    }

    /**
     * @function SpatialAnalystBase.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.format = null;
    }

    /**
     * @function SpatialAnalystBase.prototype.transformResult
     * @description 状态完成时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     */
    transformResult(result, options) {
        var me = this, analystResult;
        result = Util.transformResult(result);
        if (result && me.format === DataFormat.GEOJSON && typeof me.toGeoJSONResult === 'function') {
            //批量分析时会返回多个结果
            if (Util.isArray(result)) {
                for (var i = 0; i < result.length; i++) {
                    result[i] = me.toGeoJSONResult(result[i])
                }
                analystResult = result;

            } else {
                analystResult = me.toGeoJSONResult(result);
            }
        }
        if (!analystResult) {
            analystResult = result;
        }
        return { result: analystResult, options };
    }

    /**
     * @function SpatialAnalystBase.prototype.toGeoJSONResult
     * @description 将含有 geometry 的数据转换为 GeoJSON 格式。
     * @param {Object} result - 服务器返回的结果对象。
     *
     */
    toGeoJSONResult(result) {
        if (!result) {
            return null;
        }
        //批量叠加分析时结果这样处理
        if (result.result && result.result.resultGeometry) {
            result = result.result
        }
        var geoJSONFormat = new GeoJSON();
        if (result.recordsets) {
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    recordsets[i].features = geoJSONFormat.toGeoJSON(recordsets[i].features);
                }
            }
        } else if (result.recordset && result.recordset.features) {
            result.recordset.features =geoJSONFormat.toGeoJSON(result.recordset.features);
        }
        if (result.resultGeometry) {
            result.resultGeometry = geoJSONFormat.toGeoJSON(result.resultGeometry);
        }
        if (result.regions) {
            result.regions = geoJSONFormat.toGeoJSON(result.regions);
        }

        return result;
    }

}

