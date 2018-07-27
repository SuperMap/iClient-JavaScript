import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataReturnMode} from '../REST';

/**
 * @class SuperMap.DataReturnOption
 * @category iServer SpatialAnalyst
 * @classdesc 数据返回设置类。
 * @param {Object} options - 参数。 
 * @param {number} [options.expectCount=1000] - 设置返回的最大记录数，小于或者等于 0 时表示返回所有记录数。 
 * @param {string} [options.dataset] - 设置结果数据集标识，当 dataReturnMode 为 {@link SuperMap.DataReturnMode.DATASET_ONLY}或{@link SuperMap.DataReturnMode.DATASET_AND_RECORDSET}时有效，
 *                                   作为返回数据集的名称。该名称用形如“数据集名称@数据源别名”形式来表示。 
 * @param {SuperMap.DataReturnMode} [options.dataReturnMode=SuperMap.DataReturnMode.RECORDSET_ONLY] - 数据返回模式。 
 * @param {boolean} [options.deleteExistResultDataset=true] - 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
 */
export class DataReturnOption {


    constructor(options) {

        /**
         * @member {number} [SuperMap.DataReturnOption.prototype.expectCount=1000]
         * @description 设置返回的最大记录数，小于或者等于0时表示返回所有记录数。
         */
        this.expectCount = 1000;

        /**
         * @member {string} [SuperMap.DataReturnOption.prototype.dataset]
         * @description 设置结果数据集标识，当dataReturnMode为 {@link SuperMap.DataReturnMode.DATASET_ONLY}
         * 或{@link SuperMap.DataReturnMode.DATASET_AND_RECORDSET}时有效，
         * 作为返回数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。
         */
        this.dataset = null;

        /**
         * @member {SuperMap.DataReturnMode} [SuperMap.DataReturnOption.prototype.dataReturnMode=SuperMap.DataReturnMode.RECORDSET_ONLY]
         * @description 数据返回模式。
         */
        this.dataReturnMode = DataReturnMode.RECORDSET_ONLY;

        /**
         * @member {boolean} [SuperMap.DataReturnOption.prototype.deleteExistResultDataset=true]
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
         */
        this.deleteExistResultDataset = true;

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.DataReturnOption";
    }

    /**
     * @function SuperMap.DataReturnOption.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.expectCount = null;
        me.dataset = null;
        me.dataReturnMode = null;
        me.deleteExistResultDataset = null;
    }


}

SuperMap.DataReturnOption = DataReturnOption;