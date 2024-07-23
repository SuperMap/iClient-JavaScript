/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {Geometry} from '../commontypes/Geometry';

/**
 * @class RouteLocatorParameters
 * @deprecatedclass SuperMap.RouteLocatorParameters
 * @category  iServer SpatialAnalyst RouteLocator
 * @classdesc 路由对象定位空间对象的参数类。
 * 参数有两种方式，分别为 Geometry 和 Dataset 两种，前者需要指定 sourceRoute 对象作为参数，后者需要 dataset，routeIDField，routeID 三个参数。如果用户两种参数均设置，优先选择 Dataset 方式。
 * @param {Object} options - 参数。
 * @param {(Route|L.Polyline|ol.geom.LineString|GeoJSONObject)} options.sourceRoute - 路由对象。
 * @param {number} options.measure - 定位点的 M 值。只当路由对象定位点时有意义。
 * @param {string} [options.type] -  类型：点 or 线。
 * @param {number} [options.offset=0] - 定位点偏移量。只当路由对象定位点时有意义。
 * @param {boolean} [options.isIgnoreGap=false] - 是否忽略子对象之间的距离。
 * @param {number} [options.startMeasure] - 定位线的起始 M 值。只当路由对象定位线时有意义。
 * @param {number} [options.endMeasure] - 定位线的终止 M 值。只当路由对象定位线时有意义。
 * @usage
 */
export class RouteLocatorParameters {

    constructor(options) {
        if (!options) {
            return this;
        }
        /**
         * @member {(Route|L.Polyline|ol.geom.LineString|GeoJSONObject)} RouteLocatorParameters.prototype.sourceRoute
         * @description 路由对象。
         */
        this.sourceRoute = null;

        /**
         * @member {string} RouteLocatorParameters.prototype.dataset
         * @description 用于做路由定位分析的数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。
         */
        this.dataset = null;

        /**
         * @member {string} RouteLocatorParameters.prototype.routeIDField
         * @description  路由对象所在的字段名称。
         *
         */
        this.routeIDField = null;

        /**
         * @member {number} RouteLocatorParameters.prototype.routeID
         * @description 路由对象标识。
         *
         */
        this.routeID = null;

        /**
         * @member {string} [RouteLocatorParameters.prototype.type]
         * @description 类型：点 or 线。
         * 可选值为:
         * LINE :根据起始 M 值及终止 M 值定位线对象。
         * POINT : 根据 M 值定位点对象。
         */
        this.type = null;

        /**
         * @member {number} RouteLocatorParameters.prototype.measure
         * @description 定位点的 M 值。只当路由对象定位点时有意义。
         */
        this.measure = null;

        /**
         * @member {number} [RouteLocatorParameters.prototype.offset=0]
         * @description 定位点偏移量。只当路由对象定位点时有意义。
         */
        this.offset = 0;

        /**
         * @member {boolean} [RouteLocatorParameters.prototype.isIgnoreGap=false]
         * @description 是否忽略子对象之间的距离。
         */
        this.isIgnoreGap = false;

        /**
         *  @member {number} [RouteLocatorParameters.prototype.startMeasure]
         *  @description 定位线的起始 M 值。只当路由对象定位线时有意义。
         */
        this.startMeasure = null;

        /**
         *  @member {number} [RouteLocatorParameters.prototype.endMeasure]
         *  @description 定位线的终止 M 值。只当路由对象定位线时有意义。
         */
        this.endMeasure = null;

        var routeFromClient = options.sourceRoute;
        var routeHandle = {};
        if (routeFromClient && routeFromClient instanceof Geometry && routeFromClient.components) {
            routeHandle.type = routeFromClient.type;
            routeHandle.parts = routeFromClient.parts;
            var parts = [];
            for (var i = 0, len = routeFromClient.components.length; i < len; i++) {
                parts = parts.concat(routeFromClient.components[i].components);
            }
            routeHandle.points = parts;
            options.sourceRoute = routeHandle;
        }
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.RouteLocatorParameters";
    }


    /**
     * @function RouteLocatorParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.sourceRoute = null;
        me.type = null;
        me.measure = null;
        me.offset = 0;
        me.isIgnoreGap = false;
        me.startMeasure = null;
        me.endMeasure = null;
        me.dataset = null;
        me.routeID = null;
        me.routeIDField = null;
    }

}
