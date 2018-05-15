import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Geometry} from '../commontypes/Geometry';
import './Route';

/**
 * @class SuperMap.RouteLocatorParameters
 * @category  iServer SpatialAnalyst RouteLocator
 * @classdesc 路由对象定位空间对象的参数类。
 * 参数有两种方式，分别为Geometry和Dataset两种，前者需要指定sourceRoute对象作为参数，后者需要dataset，routeIDField，routeID三个参数
 * 如果用户两种参数均设置，优先选择Dataset方式
 * @param {Object} options - 参数。</br>
 * @param {Object} options.sourceRoute -  【必选参数】路由对象。路由对象可以是：SuperMap.Route|L.Polyline|ol.geom.LineString。</br>
 * @param {string} options.type -  【必选参数】类型：点 or 线。</br>
 * @param {float} options.measure - 【必选参数】定位点的M值。只当路由对象定位点时有意义。</br>
 * @param {float} options.offset - 定位点偏移量。只当路由对象定位点时有意义，默认为0。</br>
 * @param {boolean} options.isIgnoreGap - 是否忽略子对象之间的距离。默认为false，即不忽略子对象之间的距离。</br>
 * @param {float} options.startMeasure - 定位线的起始M值。只当路由对象定位线时有意义。</br>
 * @param {float} options.endMeasure -  定位线的终止M值。只当路由对象定位线时有意义。</br>
 */
export class RouteLocatorParameters {

    constructor(options) {
        if (!options) {
            return this;
        }
        /**
         * @member {(SuperMap.Route|L.Polyline|ol.geom.LineString)} SuperMap.RouteLocatorParameters.prototype.sourceRoute
         * @description 路由对象。
         */
        this.sourceRoute = null;

        /**
         * @member {string} SuperMap.RouteLocatorParameters.prototype.dataset
         * @description 要用来做缓冲区分析的数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。
         */
        this.dataset = null;

        /**
         * @member {string} SuperMap.RouteLocatorParameters.prototype.routeIDField
         * @description  路由对象所在的字段名称。
         *
         */
        this.routeIDField = null;

        /**
         * @member {number} SuperMap.RouteLocatorParameters.prototype.routeID
         * @description 路由对象标识 。
         *
         */
        this.routeID = null;

        /**
         * @member {string} SuperMap.RouteLocatorParameters.prototype.type
         * @description 【必选参数】类型：点 or 线。
         * 可选值为:
         * LINE :根据起始 M 值及终止 M 值定位线对象。
         * POINT : 根据 M 值定位点对象。
         */
        this.type = null;

        /**
         * @member {float} SuperMap.RouteLocatorParameters.prototype.measure
         * @description 必选参数,定位点的M值。只当路由对象定位点时有意义。
         */
        this.measure = null;

        /**
         * @member {float} [SuperMap.RouteLocatorParameters.prototype.offset=0]
         * @description 定位点偏移量。只当路由对象定位点时有意义。
         */
        this.offset = 0;

        /**
         * @member {boolean} [SuperMap.RouteLocatorParameters.prototype.isIgnoreGap=false]
         * @description 是否忽略子对象之间的距离。
         */
        this.isIgnoreGap = false;

        /**
         *  @member {float} SuperMap.RouteLocatorParameters.prototype.startMeasure
         *  @description 定位线的起始M值。只当路由对象定位线时有意义。
         */
        this.startMeasure = null;

        /**
         *  @member {float} SuperMap.RouteLocatorParameters.prototype.endMeasure
         *  @description 定位线的终止M值。只当路由对象定位线时有意义。
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
     * @function SuperMap.RouteLocatorParameters.prototype.destroy
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

SuperMap.RouteLocatorParameters = RouteLocatorParameters;