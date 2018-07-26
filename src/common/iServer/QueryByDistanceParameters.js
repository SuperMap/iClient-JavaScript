import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {QueryParameters} from './QueryParameters';

/**
 * @class SuperMap.QueryByDistanceParameters
 * @category  iServer Map QueryResults
 * @classdesc Distance 查询参数类。
 *            该类用于设置 Distance 查询的相关参数。
 * @extends {SuperMap.QueryParameters}
 * @param {Object} options - 参数。
 * @param {string} options.customParams - 自定义参数，供扩展使用。
 * @param {Object} [options.prjCoordSys] -自定义参数，供 SuperMap Online 提供的动态投影查询扩展使用。如 {"epsgCode":3857}。
 * @param {number} [options.expectCount=100000] - 期望返回结果记录个数。
 * @param {SuperMap.GeometryType} options.networkType - 网络数据集对应的查询类型。
 * @param {SuperMap.QueryOption} options.queryOption - 查询结果类型枚举类。
 * @param {Array.<SuperMap.FilterParameter>} options.queryParams - 查询过滤条件参数数组。
 * @param {number} [options.startRecord=0] - 查询起始记录号。
 * @param {number} [options.holdTime] - 资源在服务端保存的时间，单位为分钟。
 * @param {boolean} [options.returnCustomResult=false] -仅供三维使用。
 * @param {number} [options.distance=0] - 查询距离。
 * @param {Object} options.geometry - 用于查询的几何对象。
 *                                    点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。
 *                                    线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。
 *                                    面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。
 * @param {boolean} [options.isNearest] - 是否为最近距离查询。
 * @param {boolean} [options.returnContent=true] - 是否立即返回新创建资源的表述还是返回新资源的 URI。
 */
export class QueryByDistanceParameters extends QueryParameters {


    constructor(options) {
        if (!options) {
            return;
        }
        super(options);
        /**
         * @member {number} [SuperMap.QueryByDistanceParameters.prototype.distance=0]
         * @description 查询距离，单位与所查询图层对应的数据集单位相同。
         *              当查找最近地物时，该属性无效。
         * @default 0
         */
        this.distance = 0;

        /**
         * @member SuperMap.QueryByDistanceParameters.prototype.geometry
         * @description 用于查询的地理对象。
         * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。
         * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON
         */
        this.geometry = null;

        /**
         * @member {boolean} SuperMap.QueryByDistanceParameters.prototype.isNearest
         * @description 是否为最近距离查询。
         *               建议该属性与 expectCount （继承自 {@link SuperMap.QueryParameters}）属性联合使用。
         *               当该属性为 true 时，即表示查找最近地物，如果查询结果数大于期望返回的结果记录数（expectCount），
         *               则查找结果为查询总记录中距离中心最近的expectCount个地物。
         *               当该属性为不为 true 时，如果查询结果数大于期望返回的结果记录数（expectCount），
         *               则查找结果为从查询总记录中随机抽取的expectCount个地物。
         *               目前查询结果不支持按远近距离排序。
         */
        this.isNearest = null;

        /**
         * @member {boolean} [SuperMap.QueryByDistanceParameters.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         *               如果为 true，则直接返回新创建资源，即查询结果的表述。
         *               为 false，则返回的是查询结果资源的 URI。默认为 true。
         */
        this.returnContent = true;


        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.QueryByDistanceParameters";
    }

    /**
     * @function SuperMap.QueryByDistanceParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.distance = null;
        me.isNearest = null;
        if (me.geometry) {
            me.geometry.destroy();
            me.geometry = null;
        }
    }


}

SuperMap.QueryByDistanceParameters = QueryByDistanceParameters;