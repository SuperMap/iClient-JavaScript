import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.FieldParameters
 * @category  iServer Data
 * @classdesc 字段信息查询参数类。
 * @param options - {Object} 可选参数。如:<br>
 *         datasource - {string} 数据源名称。<br>
 *         dataset - {string} 数据集名称。
 */
export class FieldParameters {


    constructor(options) {
        /**
         * @member SuperMap.FieldParameters.prototype.datasource - {string}
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member SuperMap.FieldParameters.prototype.dataset - {string}
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.FieldParameters";
    }

    /**
     * @function SuperMap.FieldParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }

}

SuperMap.FieldParameters = FieldParameters;
