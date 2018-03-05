import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './FilterParameter';
import {GeometryType, QueryOption} from '../REST';

/**
 * @class SuperMap.QueryParameters
 * @category  iServer Map QueryResults
 * @classdesc 查询参数基类。距离查询、SQL 查询、几何地物查询等各自的参数均继承此类。
 * @param options - {Object} 可选参数。如：<br>
 *         customParams - {string} 自定义参数，供扩展使用。<br>
 *         prjCoordSys - {Object} 自定义参数，供SuperMap Online提供的动态投影查询扩展使用。如 {"epsgCode":3857}。<br>
 *         expectCount - {number}期望返回结果记录个数。<br>
 *         networkType - {{@link SuperMap.GeometryType}} 网络数据集对应的查询类型。<br>
 *         queryOption - {{@link SuperMap.QueryOption}} 查询结果类型枚举类。<br>
 *         queryParams - {Array<{@link SuperMap.FilterParameter}>}查询过滤条件参数数组。<br>
 *         startRecord - {number}查询起始记录号。<br>
 *         holdTime - {number}资源在服务端保存的时间。<br>
 *         returnCustomResult -{boolean} 仅供三维使用。
 */
export class QueryParameters {


    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member SuperMap.QueryParameters.prototype.customParams -{string}
         * @description 自定义参数，供扩展使用。
         */
        this.customParams = null;

        /**
         * @member SuperMap.QueryParameters.prototype.prjCoordSys -{Object}
         * @description 自定义参数，供SuperMap Online提供的动态投影查询扩展使用。如 {"epsgCode":3857}
         */
        this.prjCoordSys = null;

        /**
         * @member SuperMap.QueryParameters.prototype.expectCount -{number}
         * @description 期望返回结果记录个数，默认返回100000条查询记录，
         *               如果实际不足100000条则返回实际记录条数。
         * @default 100000
         */
        this.expectCount = 100000;

        /**
         * @member SuperMap.QueryParameters.prototype.networkType -{SuperMap.GeometryType}
         * @description 网络数据集对应的查询类型，
         *               分为点和线两种类型，默认为线几何对象类型，即{@link GeometryType.LINE | SuperMap.GeometryType.LINE}。
         * @default  {@link SuperMap.GeometryType.LINE}
         */
        this.networkType = GeometryType.LINE;

        /**
         * @member SuperMap.QueryParameters.prototype.queryOption -{SuperMap.QueryOption}
         * @description 查询结果类型枚举类。
         *               该类描述查询结果返回类型，包括只返回属性、
         *               只返回几何实体以及返回属性和几何实体。
         * @default {@link SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY}
         */
        this.queryOption = QueryOption.ATTRIBUTEANDGEOMETRY;

        /**
         * @member SuperMap.QueryParameters.prototype.queryParams -{Array<SuperMap.FilterParameter>}
         * @description 查询过滤条件参数数组。
         *               该类用于设置查询数据集的查询过滤参数。
         */
        this.queryParams = null;

        /**
         * @member SuperMap.QueryParameters.prototype.startRecord -{number}
         * @description 查询起始记录号，默认值为0。
         * @default 0
         */
        this.startRecord = 0;

        /**
         * @member SuperMap.QueryParameters.prototype.holdTime -{number}
         * @description 资源在服务端保存的时间。默认为10（分钟）。
         * @default 10
         */
        this.holdTime = 10;

        /**
         * @member SuperMap.QueryParameters.prototype.returnCustomResult -{boolean}
         * @description 仅供三维使用。
         * @default false
         */
        this.returnCustomResult = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.QueryParameters";
    }

    /**
     * @function SuperMap.QueryParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.customParams = null;
        me.expectCount = null;
        me.networkType = null;
        me.queryOption = null;
        if (me.queryParams) {
            for (var i = 0, qps = me.queryParams, len = qps.length; i < len; i++) {
                qps[i].destroy();
            }
            me.queryParams = null;
        }
        me.startRecord = null;
        me.holdTime = null;
        me.returnCustomResult = null;
        me.prjCoordSys = null;
    }

}

SuperMap.QueryParameters = QueryParameters;