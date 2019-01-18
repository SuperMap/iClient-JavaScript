/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
 * @param {Object} options.geometry - 用于查询的几何对象。
 * @param {Array.<SuperMap.FilterParameter>} options.queryParams - 查询过滤条件参数数组。
 * @param {string} [options.customParams] - 自定义参数，供扩展使用。
 * @param {Object} [options.prjCoordSys] -自定义参数，供 SuperMap Online 提供的动态投影查询扩展使用。如 {"epsgCode":3857}。
 * @param {number} [options.expectCount=100000] - 期望返回结果记录个数。
 * @param {SuperMap.GeometryType} [options.networkType=SuperMap.GeometryType.LINE] - 网络数据集对应的查询类型。
 * @param {SuperMap.QueryOption} [options.queryOption=SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY] - 查询结果类型枚举类。
 * @param {number} [options.startRecord=0] - 查询起始记录号。
 * @param {number} [options.holdTime=10] - 资源在服务端保存的时间，单位为分钟。
 * @param {boolean} [options.returnCustomResult=false] -仅供三维使用。
 * @param {number} [options.distance=0] - 查询距离。
 * @param {boolean} [options.isNearest=false] - 是否为最近距离查询。
 * @param {boolean} [options.returnContent=true] - 是否立即返回新创建资源的表述还是返回新资源的 URI。
 * @param {boolean} [options.returnFeatureWithFieldCaption = false] - 返回的查询结果要素字段标识是否为字段别名。为 false 时，返回的是字段名；为 true 时，返回的是字段别名。
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
         */
        this.distance = 0;

        /**
         * @member SuperMap.QueryByDistanceParameters.prototype.geometry
         * @description 用于查询的地理对象。<br>
         * 点类型可以是：{@link SuperMap.Geometry.Point}|{@link L.Point}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}。<br>
         * 线类型可以是：{@link SuperMap.Geometry.LineString}|{@link SuperMap.Geometry.LinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}。<br>
         * 面类型可以是：{@link SuperMap.Geometry.Polygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}。
         */
        this.geometry = null;

        /**
         * @member {boolean} [SuperMap.QueryByDistanceParameters.prototype.isNearest=false]
         * @description 是否为最近距离查询。<br>
         *               建议该属性与 expectCount（继承自 {@link SuperMap.QueryParameters}）属性联合使用。
         *               当该属性为 true 时，即表示查找最近地物，如果查询结果数大于期望返回的结果记录数（expectCount），
         *               则查找结果为查询总记录中距离中心最近的 expectCount 个地物。
         *               当该属性为不为 true 时，如果查询结果数大于期望返回的结果记录数（expectCount），
         *               则查找结果为从查询总记录中随机抽取的 expectCount 个地物。
         *               目前查询结果不支持按远近距离排序。
         */
        this.isNearest = null;

        /**
         * @member {boolean} [SuperMap.QueryByDistanceParameters.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         *               如果为 true，则直接返回新创建资源，即查询结果的表述。
         *               为 false，则返回的是查询结果资源的 URI。 
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