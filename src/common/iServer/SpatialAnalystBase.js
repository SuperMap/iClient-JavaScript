import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.SpatialAnalystBase
 * @category  iServer SpatialAnalyst
 * @classdesc 空间分析服务基类。
 * @param url -{string} 地址d。
 * @param options -{Object} 参数。
 * @extends SuperMap.CommonServiceBase
 */
export class SpatialAnalystBase extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        /**
         * @member SuperMap.SpatialAnalystBase.prototype.format -{string}
         * @description 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式，参数格式为"ISERVER","GEOJSON",GEOJSON
         */
        this.format = DataFormat.GEOJSON;
        this.CLASS_NAME = "SuperMap.SpatialAnalystBase";
    }

    /**
     * @function SuperMap.SpatialAnalystBase.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.format = null;
    }

    /**
     * @function SuperMap.SpatialAnalystBase.prototype.serviceProcessCompleted
     * @description 分析完成，执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
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
        me.events.triggerEvent("processCompleted", {result: analystResult});
    }

    /**
     * @function SuperMap.SpatialAnalystBase.prototype.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。
     * @param result - {Object} 服务器返回的结果对象。
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
                    recordsets[i].features = JSON.parse(geoJSONFormat.write(recordsets[i].features));
                }
            }
        } else if (result.recordset && result.recordset.features) {
            result.recordset.features = JSON.parse(geoJSONFormat.write(result.recordset.features));
        }
        if (result.resultGeometry) {
            result.resultGeometry = JSON.parse(geoJSONFormat.write(result.resultGeometry));
        }
        if (result.regions) {
            result.regions = JSON.parse(geoJSONFormat.write(result.regions));
        }

        return result;
    }

}

SuperMap.SpatialAnalystBase = SpatialAnalystBase;
