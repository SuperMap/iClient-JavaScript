import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Geometry} from '../commontypes/Geometry';
import './Route';

/**
 * @class SuperMap.RouteLocatorParameters
 * @category  iServer SpatialAnalyst RouteLocator
 * @classdesc
 * 路由对象定位空间对象的参数类。
 * 参数有两种方式，分别为Geometry和Dataset两种，前者需要指定sourceRoute对象作为参数，后者需要dataset，routeIDField，routeID三个参数
 * 如果用户两种参数均设置，优先选择Dataset方式
 * @param options - {Object} 可选参数。如:</br>
 *        sourceRoute -  {Object} 【必选参数】路由对象。路由对象可以是：SuperMap.Route|L.Polyline|ol.geom.LineString。</br>
 *        type -  {string} 【必选参数】类型：点 or 线。</br>
 *        measure - {float} 【必选参数】定位点的M值。只当路由对象定位点时有意义。</br>
 *        offset - {float} 定位点偏移量。只当路由对象定位点时有意义，默认为0。</br>
 *        isIgnoreGap - {boolean} 是否忽略子对象之间的距离。默认为false，即不忽略子对象之间的距离。</br>
 *        startMeasure - {float} 定位线的起始M值。只当路由对象定位线时有意义。</br>
 *        endMeasure -  {float} 定位线的终止M值。只当路由对象定位线时有意义。</br>
 */
export class RouteLocatorParameters {

    constructor(options) {
        if (!options) {
            return this;
        }
        /**
         * @member SuperMap.RouteLocatorParameters.prototype.sourceRoute -{Object}
         * @description 路由对象。路由对象可以是：SuperMap.Route|L.Polyline|ol.geom.LineString
         */
        this.sourceRoute = null;

        /**
         * @member SuperMap.RouteLocatorParameters.prototype.dataset -{string}
         * @description 要用来做缓冲区分析的数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。
         */
        this.dataset = null;

        /**
         * @member SuperMap.RouteLocatorParameters.prototype.routeIDField -{string}
         * @description  路由对象所在的字段名称。
         *
         */
        this.routeIDField = null;

        /**
         * @member SuperMap.RouteLocatorParameters.prototype.routeID -{interger}
         * @description 路由对象标识 。
         *
         */
        this.routeID = null;

        /**
         * @member SuperMap.RouteLocatorParameters.prototype.type -{string}
         * @description 【必选参数】类型：点 or 线。
         * 可选值为:
         * LINE :根据起始 M 值及终止 M 值定位线对象。
         * POINT : 根据 M 值定位点对象。
         */
        this.type = null;

        /**
         * @member SuperMap.RouteLocatorParameters.prototype.measure -{float}
         * @description 必选参数,定位点的M值。只当路由对象定位点时有意义。
         */
        this.measure = null;

        /**
         * @member SuperMap.RouteLocatorParameters.prototype.offset -{float}
         * @description 定位点偏移量。只当路由对象定位点时有意义，默认为0。
         */
        this.offset = 0;

        /**
         * @member SuperMap.RouteLocatorParameters.prototype.isIgnoreGap -{boolean}
         * @description 是否忽略子对象之间的距离。默认为false，即不忽略子对象之间的距离。
         */
        this.isIgnoreGap = false;

        /**
         *  @member SuperMap.RouteLocatorParameters.prototype.startMeasure -{float}
         *  @description 定位线的起始M值。只当路由对象定位线时有意义。
         */
        this.startMeasure = null;

        /**
         *  @member SuperMap.RouteLocatorParameters.prototype.endMeasure -{float}
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