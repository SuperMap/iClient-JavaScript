/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {QueryParameters} from './QueryParameters';

/**
 * @class QueryByDistanceParameters
 * @deprecatedclass SuperMap.QueryByDistanceParameters
 * @category  iServer Map QueryResults
 * @classdesc 距离查询参数类。此类除了能够设置通用的查询参数以外，还可以指定查询距离等参数，查询距离的单位与所查询图层对应的数据集单位相同。
 * @extends {QueryParameters}
 * @param {Object} options - 参数。
 * @param {GeoJSONObject} options.geometry - 用于查询的几何对象。
 * @param {Array.<FilterParameter>} options.queryParams - 查询过滤条件参数数组。
 * @param {number} options.distance - 查询距离，单位与所查询图层对应的数据集单位相同。距离查询时，表示距离地物的距离。最近地物查询时，表示搜索的范围。此为必选参数。
 * @param {string} [options.customParams] - 自定义参数，供扩展使用。
 * @param {Object} [options.prjCoordSys] -自定义参数，供 SuperMap Online 提供的动态投影查询扩展使用。如 {"epsgCode":3857}。
 * @param {number} [options.expectCount=100000] - 期望返回结果记录个数。
 * @param {GeometryType} [options.networkType=GeometryType.LINE] - 网络数据集对应的查询类型。
 * @param {QueryOption} [options.queryOption=QueryOption.ATTRIBUTEANDGEOMETRY] - 查询结果类型枚举类。
 * @param {number} [options.startRecord=0] - 查询起始记录号。
 * @param {number} [options.holdTime=10] - 资源在服务端保存的时间，单位为分钟。
 * @param {boolean} [options.returnCustomResult=false] -仅供三维使用。
 * @param {boolean} [options.isNearest=false] - 是否为最近距离查询。
 * @param {boolean} [options.returnContent=true] - 是否立即返回新创建资源的表述还是返回新资源的 URI。
 * @param {boolean} [options.returnFeatureWithFieldCaption = false] - 返回的查询结果要素字段标识是否为字段别名。为 false 时，返回的是字段名；为 true 时，返回的是字段别名。
 * @usage
 */
export class QueryByDistanceParameters extends QueryParameters {


    constructor(options) {
        options = options || {};
        super(options);
        /**
         * @member {number} [QueryByDistanceParameters.prototype.distance=0]
         * @description 查询距离，单位与所查询图层对应的数据集单位相同。
         *              距离查询时，表示距离地物的距离。最近地物查询时，表示搜索的范围。
         */

        /**
         * @member {GeoJSONObject} QueryByDistanceParameters.prototype.geometry
         * @description 用于查询的地理对象。<br>
         * 点类型可以是：{@link GeometryPoint}|{@link L.Marker}|{@link L.CircleMarker}|{@link L.Circle}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}|{@link mapboxgl.LngLat}|{@link mapboxgl.Point}|{@link GeoJSONObject}。<br>
         * 线类型可以是：{@link GeometryLineString}|{@link GeometryLinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}|{@link GeoJSONObject}。<br>
         * 面类型可以是：{@link GeometryPolygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}|{@link mapboxgl.LngLatBounds}|{@link GeoJSONObject}。
         */
        this.geometry = null;

        /**
         * @member {boolean} [QueryByDistanceParameters.prototype.isNearest=false]
         * @description 是否为最近距离查询。<br>
         *               建议该属性与 expectCount（继承自 {@link QueryParameters}）属性联合使用。
         *               当该属性为 true 时，即表示查找最近地物，如果查询结果数大于期望返回的结果记录数（expectCount），
         *               则查找结果为查询总记录中距离中心最近的 expectCount 个地物。
         *               当该属性为不为 true 时，如果查询结果数大于期望返回的结果记录数（expectCount），
         *               则查找结果为从查询总记录中随机抽取的 expectCount 个地物。
         *               目前查询结果不支持按远近距离排序。
         */
        this.isNearest = null;

        /**
         * @member {boolean} [QueryByDistanceParameters.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         *               如果为 true，则直接返回新创建资源，即查询结果的表述。
         *               为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = true;


        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.QueryByDistanceParameters";
    }

    /**
     * @function QueryByDistanceParameters.prototype.destroy
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
