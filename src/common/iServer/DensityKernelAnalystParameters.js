import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.DensityKernelAnalystParameters
 * @category  iServer SpatialAnalyst DensityAnalyst
 * @classdesc 核密度分析参数类。
 * @param options - {Object} 可选参数。如:</br>
 *        dataset - {string} 要用来做核密度分析数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：BaseMap_P@Jingjin。必设字段。</br>
 *        bounds - {Object} 核密度分析的范围，用于确定结果栅格数据集的范围。如果缺省，则默认为原数据集的范围。Bounds类型可以是SuperMap.Bounds|L.Bounds|ol.extent。</br>
 *        searchRadius - {number} 栅格邻域内用于计算密度的查找半径，单位与当前数据集相同。默认值为当前数据集的长宽中的最大值除30。</br>
 *        fieldName - {string} 用于进行核密度分析的测量值的字段名称，核密度分析不支持文本类型的字段，必设字段。</br>
 *        resultGridDatasetResolution - {number} 密度分析结果栅格数据的分辨率，单位与当前数据集相同。默认值为当前数据集的长宽中的最小值除500。</br>
 *        targetDatasource - {string} 指定的存储结果数据集的数据源，默认为当前分析的数据集所在的数据源。</br>
 *        resultGridName - {string} 指定结果数据集名称，必设字段。</br>
 *        deleteExistResultDataset - {boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。</br>
 */
export class DensityKernelAnalystParameters {


    constructor(options) {
        /**
         * @member SuperMap.DensityKernelAnalystParameters.prototype.dataset -{string}
         * @description 要用来做核密度分析数据源中数据集的名称。
         * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：Railway@Changchun。必设字段。
         * 注：核密度分析支持点数据集和线数据集。
         */
        this.dataset = null;

        /**
         * @member SuperMap.DensityKernelAnalystParameters.prototype.bounds
         * @description 核密度分析的范围，用于确定结果栅格数据集的范围。</br>
         * Bounds类型可以是SuperMap.Bounds|L.Bounds|ol.extent。</br>
         * 如果缺省，则默认为原数据集的范围。
         */
        this.bounds = null;

        /**
         * @member SuperMap.DensityKernelAnalystParameters.prototype.fieldName -{string}
         * @description 用于进行核密度分析的测量值的字段名称，核密度分析不支持文本类型的字段，必设字段。
         */
        this.fieldName = null;

        /**
         * @member SuperMap.DensityKernelAnalystParameters.prototype.resultGridDatasetResolution -{number}
         * @description 密度分析结果栅格数据的分辨率，单位与当前数据集相同。默认值为当前数据集的长宽中的最小值除500。
         */
        this.resultGridDatasetResolution = null;

        /**
         * @member SuperMap.DensityKernelAnalystParameters.prototype.searchRadius -{number}
         * @description 栅格邻域内用于计算密度的查找半径，单位与当前数据集相同。默认值为当前数据集的长宽中的最大值除30。
         */
        this.searchRadius = null;

        /**
         * @member SuperMap.DensityKernelAnalystParameters.prototype.targetDatasource -{string}
         * @description 指定的存储结果数据集的数据源，默认为当前分析的数据集所在的数据源。
         */
        this.targetDatasource = null;

        /**
         * @member SuperMap.DensityKernelAnalystParameters.prototype.resultGridName -{string}
         * @description 指定结果数据集名称，必设字段。
         */
        this.resultGridName = null;

        /**
         * @member SuperMap.DensityKernelAnalystParameters.prototype.deleteExistResultDataset -{boolean}
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
         */
        this.deleteExistResultDataset = false;
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.DensityKernelAnalystParameters";

    }


    /**
     * @function SuperMap.DensityKernelAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.dataset = null;
        me.bounds = null;
        me.fieldName = null;
        me.resultGridDatasetResolution = null;
        me.searchRadius = null;

        me.targetDatasource = null;
        me.resultGridName = null;
        me.deleteExistResultDataset = null;
    }

    /**
     * @function SuperMap.DensityKernelAnalystParameters.toObject
     * @param densityKernelAnalystParameters -{SuperMap.DensityKernelAnalystParameters} 核密度分析参数类。
     * @param tempObj - {SuperMap.DensityKernelAnalystParameters} 核密度分析参数对象。
     * @description 将核密度分析参数对象转换成JSON对象。
     * @return JSON对象。
     */
    static toObject(densityKernelAnalystParameters, tempObj) {
        for (var name in densityKernelAnalystParameters) {
            if (name !== "dataset") {
                tempObj[name] = densityKernelAnalystParameters[name];
            }
        }
    }

}

SuperMap.DensityKernelAnalystParameters = DensityKernelAnalystParameters;
