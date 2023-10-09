/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {QueryParameters} from './QueryParameters';

/**
 * @class QueryBySQLParameters
 * @deprecatedclass SuperMap.QueryBySQLParameters
 * @category  iServer Map QueryResults
 * @classdesc SQL 查询参数类。此类除了能够设置地图查询中通用的查询参数以外，还可以指定查询过滤条件等参数。
 * @extends {QueryParameters}
 * @param {Object} options - 参数。
 * @param {Array.<FilterParameter>} options.queryParams - 查询过滤条件参数数组。
 * @param {string} [options.customParams] - 自定义参数，供扩展使用。
 * @param {Object} [options.prjCoordSys] - 自定义参数，供 SuperMap Online 提供的动态投影查询扩展使用。如 {"epsgCode":3857}。
 * @param {number} [options.expectCount=100000] - 期望返回结果记录个数。
 * @param {GeometryType} [options.networkType=GeometryType.LINE] - 网络数据集对应的查询类型。
 * @param {QueryOption} [options.queryOption=QueryOption.ATTRIBUTEANDGEOMETRY] - 查询结果类型枚举类。
 * @param {number} [options.startRecord=0] - 查询起始记录号。
 * @param {number} [options.holdTime=10] - 资源在服务端保存的时间，单位为分钟。
 * @param {boolean} [options.returnCustomResult=false] - 仅供三维使用。
 * @param {boolean} [options.returnContent=true] - 是否立即返回新创建资源的表述还是返回新资源的 URI。
 * @param {boolean} [options.returnFeatureWithFieldCaption = false] - 返回的查询结果要素字段标识是否为字段别名。为 false 时，返回的是字段名；为 true 时，返回的是字段别名。
 * @usage
 */
export class QueryBySQLParameters extends QueryParameters {

    constructor(options) {
        options = options || {};
        super(options);
        /**
         * @member {boolean} [QueryBySQLParameters.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         *              如果为 true，则直接返回新创建资源，即查询结果的表述。
         *              为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = true;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.QueryBySQLParameters";
    }

    /**
     * @function QueryBySQLParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
    }

}
