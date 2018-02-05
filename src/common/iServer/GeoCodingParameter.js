import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.GeoCodingParameter
 * @category  iServer AddressMatch
 * @classdesc 地理正向匹配参数类。
 * @param options - {Object} 可选参数。如:</br>
 *         address - {string} 地点关键词。</br>
 *         fromIndex - {number} 设置返回对象的起始索引值。</br>
 *         toIndex - {number} 设置返回对象的结束索引值。</br>
 *         filters - {Array<string>} 过滤字段，限定查询区域。</br>
 *         prjCoordSys - {string} 查询结果的坐标系。</br>
 *         maxReturn - {number} 最大返回结果数。
 */
export class GeoCodingParameter {




    constructor(options) {
        if (options.filters) {
            let strs = [];
            let fields = options.filters.split(',');
            fields.map(function (field) {
                strs.push("\"" + field + "\"");
                return field;
            });
            options.filters = strs;
        }
        /**
         * @member SuperMap.GeoCodingParameter.prototype.address - {string}
         * @description 地点关键词。
         */
        this.address = null;

        /**
         * @member SuperMap.GeoCodingParameter.prototype.fromIndex - {number}
         * @description 设置返回对象的起始索引值。
         */
        this.fromIndex = null;

        /**
         * @member SuperMap.GeoCodingParameter.prototype.toIndex - {number}
         * @description 设置返回对象的结束索引值。
         */
        this.toIndex = null;

        /**
         * @member SuperMap.GeoCodingParameter.prototype.filters - {Array<string>}
         * @description 过滤字段，限定查询区域。
         */
        this.filters = null;

        /**
         * @member SuperMap.GeoCodingParameter.prototype.prjCoordSys - {string}
         * @description  查询结果的坐标系。
         */
        this.prjCoordSys = null;

        /**
         * @member SuperMap.GeoCodingParameter.prototype.maxReturn - {number}
         * @description 最大返回结果数。
         */
        this.maxReturn = null;
        Util.extend(this, options);
    }

    /**
     * @function SuperMap.GeoCodingParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.address = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
    }

}

SuperMap.GeoCodingParameter = GeoCodingParameter;