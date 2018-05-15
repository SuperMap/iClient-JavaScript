import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './FilterParameter';
import {GeometryType, QueryOption} from '../REST';

/**
 * @class SuperMap.QueryParameters
 * @category  iServer Map QueryResults
 * @classdesc 查询参数基类。距离查询、SQL 查询、几何地物查询等各自的参数均继承此类。
 * @param options - {Object} 参数。<br>
 * @param {string} options.customParams - 自定义参数，供扩展使用。<br>
 * @param {Object} options.prjCoordSys - 自定义参数，供SuperMap Online提供的动态投影查询扩展使用。如 {"epsgCode":3857}。<br>
 * @param {number} options.expectCount - 期望返回结果记录个数。<br>
 * @param {SuperMap.GeometryType} options.networkType - 网络数据集对应的查询类型。<br>
 * @param {SuperMap.QueryOption} options.queryOption - 查询结果类型枚举类。<br>
 * @param {Array.<SuperMap.FilterParameter>} options.queryParams - 查询过滤条件参数数组。<br>
 * @param {number} options.startRecord - 查询起始记录号。<br>
 * @param {number} options.holdTime - 资源在服务端保存的时间。<br>
 * @param {boolean} options.returnCustomResult - 仅供三维使用。
 */
export class QueryParameters {


    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SuperMap.QueryParameters.prototype.customParams
         * @description 自定义参数，供扩展使用。
         */
        this.customParams = null;

        /**
         * @member {Object} SuperMap.QueryParameters.prototype.prjCoordSys
         * @description 自定义参数，供SuperMap Online提供的动态投影查询扩展使用。如 {"epsgCode":3857}
         */
        this.prjCoordSys = null;

        /**
         * @member {number} [SuperMap.QueryParameters.prototype.expectCount=100000]
         * @description 期望返回结果记录个数，默认返回100000条查询记录，
         *              如果实际不足100000条则返回实际记录条数。
         */
        this.expectCount = 100000;

        /**
         * @member {SuperMap.GeometryType} [SuperMap.QueryParameters.prototype.networkType=SuperMap.GeometryType.LINE]
         * @description 网络数据集对应的查询类型，分为点和线两种类型。
         */
        this.networkType = GeometryType.LINE;

        /**
         * @member {SuperMap.QueryOption} [SuperMap.QueryParameters.prototype.queryOption=SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY]
         * @description 查询结果类型枚举类。
         *              该类描述查询结果返回类型，包括只返回属性、
         *              只返回几何实体以及返回属性和几何实体。
         */
        this.queryOption = QueryOption.ATTRIBUTEANDGEOMETRY;

        /**
         * @member {Array.<SuperMap.FilterParameter>} SuperMap.QueryParameters.prototype.queryParams
         * @description 查询过滤条件参数数组。
         *              该类用于设置查询数据集的查询过滤参数。
         */
        this.queryParams = null;

        /**
         * @member {number} [SuperMap.QueryParameters.prototype.startRecord=0]
         * @description 查询起始记录号。
         */
        this.startRecord = 0;

        /**
         * @member {number} [SuperMap.QueryParameters.prototype.holdTime=10]
         * @description 资源在服务端保存的时间，单位为分钟。
         */
        this.holdTime = 10;

        /**
         * @member {boolean} [SuperMap.QueryParameters.prototype.returnCustomResult=false]
         * @description 仅供三维使用。
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