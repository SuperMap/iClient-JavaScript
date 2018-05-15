import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {QueryParameters} from './QueryParameters';
import {SpatialQueryMode} from '../REST';

/**
 * @class SuperMap.QueryByGeometryParameters
 * @category  iServer Map QueryResults
 * @classdesc Geometry 查询参数类。
 *            该类用于设置 Geometry查询的相关参数。
 * @extends {SuperMap.QueryParameters}
 * @param {Object} options - 参数。<br>
 * @param {string} options.customParams - 自定义参数，供扩展使用。<br>
 * @param {Object} options.prjCoordSys -自定义参数，供SuperMap Online提供的动态投影查询扩展使用。如 {"epsgCode":3857}。<br>
 * @param {number} options.expectCount - 期望返回结果记录个数。<br>
 * @param {SuperMap.GeometryType} options.networkType - 网络数据集对应的查询类型。<br>
 * @param {SuperMap.QueryOption} options.queryOption - 查询结果类型枚举类。<br>
 * @param {Array.<SuperMap.FilterParameter>} options.queryParams - 查询过滤条件参数数组。<br>
 * @param {number} options.startRecord - 查询起始记录号。<br>
 * @param {number} options.holdTime - 资源在服务端保存的时间。<br>
 * @param {boolean} options.returnCustomResult -仅供三维使用。<br>
 * @param {boolean} options.returnContent - 是否立即返回新创建资源的表述还是返回新资源的 URI。<br>
 * @param {Object} options.geometry - 用于查询的几何对象。<br>
 *                                    点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。<br>
 *                                    线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。<br>
 *                                    面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。<br>
 * @param {SuperMap.SpatialQueryMode} spatialQueryMode - 空间查询模式。
 */
export class QueryByGeometryParameters extends QueryParameters {


    constructor(options) {
        if (!options) {
            return;
        }
        super(options);

        /**
         * @member {boolean} [SuperMap.QueryByGeometryParameters.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。<br>
         *              如果为 true，则直接返回新创建资源，即查询结果的表述。<br>
         *              为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = true;

        /**
         * @member {Object} SuperMap.QueryByGeometryParameters.prototype.geometry
         * @description 用于查询的几何对象。<br>
         * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。<br>
         * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。<br>
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON
         */
        this.geometry = null;

        /**
         * @member {SuperMap.SpatialQueryMode} [SuperMap.QueryByGeometryParameters.prototype.spatialQueryMode=SuperMap.SpatialQueryMode.INTERSECT]
         * @description 空间查询模式。
         */
        this.spatialQueryMode = SpatialQueryMode.INTERSECT;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.QueryByGeometryParameters";
    }

    /**
     * @function SuperMap.QueryByGeometryParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.geometry = null;
        me.spatialQueryMode = null;
    }


}

SuperMap.QueryByGeometryParameters = QueryByGeometryParameters;