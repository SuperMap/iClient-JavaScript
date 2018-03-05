import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {QueryParameters} from './QueryParameters';

/**
 * @class SuperMap.QueryByBoundsParameters
 * @category  iServer Map QueryResults
 * @classdesc Bounds 查询参数类。该类用于设置 Bounds 查询的相关参数。
 * @extends SuperMap.QueryParameters
 * @param options - {Object} 可选参数。如：<br>
 *         customParams - {string} 自定义参数，供扩展使用。<br>
 *         prjCoordSys -{Object} 自定义参数，供SuperMap Online提供的动态投影查询扩展使用。如 {"epsgCode":3857}。<br>
 *         expectCount - {number}期望返回结果记录个数。<br>
 *         networkType - {{@link SuperMap.GeometryType}} 网络数据集对应的查询类型。<br>
 *         queryOption - {{@link SuperMap.QueryOption}} 查询结果类型枚举类。<br>
 *         queryParams - {Array<{@link SuperMap.FilterParameter}>} 查询过滤条件参数数组。<br>
 *         startRecord - {number}查询起始记录号。<br>
 *         holdTime - {number}资源在服务端保存的时间。<br>
 *         returnCustomResult -{boolean} 仅供三维使用。<br>
 *         returnContent - {boolean} 是否立即返回新创建资源的表述还是返回新资源的 URI。<br>
 *         bounds - {{@link SuperMap.Bounds}} 指定的查询范围。<br>
 *                  Bounds类型可以是SuperMap.Bounds|L.Bounds|ol.extent。
 */
export class QueryByBoundsParameters extends QueryParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        super(options);
        /**
         * @member SuperMap.QueryByBoundsParameters.prototype.returnContent -{boolean}
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。<br>
         *               如果为 true，则直接返回新创建资源，即查询结果的表述。<br>
         *               为 false，则返回的是查询结果资源的 URI。默认为 true。
         */
        this.returnContent = true;

        /**
         * @member SuperMap.QueryByBoundsParameters.prototype.bounds
         * @description 指定的查询范围。<br>
         * Bounds类型可以是SuperMap.Bounds|L.Bounds|ol.extent。
         */
        this.bounds = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.QueryByBoundsParameters";
    }

    /**
     * @function SuperMap.QueryByBoundsParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        if (me.bounds) {
            me.bounds = null;
        }

    }
}

SuperMap.QueryByBoundsParameters = QueryByBoundsParameters;