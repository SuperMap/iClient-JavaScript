 /* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
  * This program are made available under the terms of the Apache License, Version 2.0
  * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 
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
 * @param {Object} options - 参数。
 * @param {Array.<SuperMap.FilterParameter>} options.queryParams - 查询过滤条件参数数组。
 * @param {Object} options.geometry - 用于查询的几何对象。 
 * @param {string} [options.customParams] - 自定义参数，供扩展使用。
 * @param {SuperMap.QueryOption} [options.queryOption=SuperMap.ATTRIBUTEANDGEOMETRY] - 查询结果类型枚举类。
 * @param {Object} [options.prjCoordSys] -自定义参数，供SuperMap Online提供的动态投影查询扩展使用。如 {"epsgCode":3857}。
 * @param {number} [options.expectCount=100000] - 期望返回结果记录个数。
 * @param {SuperMap.GeometryType} [options.networkType=SuperMap.GeometryType.LINE] - 网络数据集对应的查询类型。
 * @param {boolean} [options.returnCustomResult=false] -仅供三维使用。
 * @param {number} [options.startRecord=0] - 查询起始记录号。
 * @param {number} [options.holdTime=10] - 资源在服务端保存的时间，单位为分钟。
 * @param {boolean} [options.returnContent=true] - 是否立即返回新创建资源的表述还是返回新资源的 URI。
 * @param {boolean} [options.returnFeatureWithFieldCaption = false] - 返回的查询结果要素字段标识是否为字段别名。为 false 时，返回的是字段名；为 true 时，返回的是字段别名。
 * @param {SuperMap.SpatialQueryMode} [spatialQueryMode=SuperMap.SpatialQueryMode.INTERSECT] - 空间查询模式。
 */
export class QueryByGeometryParameters extends QueryParameters {


    constructor(options) {
        options = options || {};
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
         * 点类型可以是：{@link SuperMap.Geometry.Point}|{@link L.Marker}|{@link L.CircleMarker}|{@link L.Circle}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}。<br>
         * 线类型可以是：{@link SuperMap.Geometry.LineString}|{@link SuperMap.Geometry.LinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}。<br>
         * 面类型可以是：{@link SuperMap.Geometry.Polygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}。
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