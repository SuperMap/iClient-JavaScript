import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {BufferAnalystParameters} from './BufferAnalystParameters';
import {DataReturnOption} from './DataReturnOption';
import {FilterParameter} from './FilterParameter';

/**
 * @class SuperMap.DatasetBufferAnalystParameters
 * @classdesc  数据集缓冲区分析参数类。
 * @param options - {Object} 可选参数。如：</br>
 *        dataset - {string} 要用来做缓冲区分析的数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。</br>
 *        filterQueryParameter - {@link SuperMap.FilterParameter} 设置数据集中几何对象的过滤条件。只有满足此条件的几何对象才参与缓冲区分析。</br>
 *        resultSetting - {@link SuperMap.DataReturnOption} 结果返回设置类。</br>
 *        isAttributeRetained - {boolean} 是否保留进行缓冲区分析的对象的字段属性，默认为 true。当 isUnion 字段为 false 时该字段有效。</br>
 *        isUnion - {boolean} 是否将缓冲区与源记录集中的对象合并后返回。对于面对象而言，要求源数据集中的面对象不相交。默认为 false。</br>
 *        bufferSetting - {@link SuperMap.BufferSetting} 设置缓冲区通用参数。</br>
 *
 * @extends SuperMap.BufferAnalystParameters
 */
export class DatasetBufferAnalystParameters extends BufferAnalystParameters {
    /**
     * @member SuperMap.DatasetBufferAnalystParameters.prototype.dataset -{string}
     * @description 要用来做缓冲区分析的数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。
     */
    dataset = null;

    /**
     *  @member SuperMap.DatasetBufferAnalystParameters.prototype.filterQueryParameter -{SuperMap.FilterParameter}
     *  @description 设置数据集中几何对象的过滤条件。只有满足此条件的几何对象才参与缓冲区分析。
     */
    filterQueryParameter = null;

    /**
     * @member SuperMap.DatasetBufferAnalystParameters.prototype.resultSetting -{SuperMap.DataReturnOption}
     * @description 结果返回设置类。
     */
    resultSetting = null;

    /**
     * @member SuperMap.DatasetBufferAnalystParameters.prototype.isAttributeRetained -{boolean}
     * @description 是否保留进行缓冲区分析的对象的字段属性，默认为 true。当 isUnion 字段为 false 时该字段有效。
     */
    isAttributeRetained = true;

    /**
     * @member SuperMap.DatasetBufferAnalystParameters.prototype.isUnion -{boolean}
     * @description 是否将缓冲区与源记录集中的对象合并后返回。对于面对象而言，要求源数据集中的面对象不相交。默认为 false。
     */
    isUnion = false;

    constructor(options) {
        super(options);
        var me = this;
        me.filterQueryParameter = new FilterParameter();
        me.resultSetting = new DataReturnOption();
        if (!options) {
            return;
        }
        Util.extend(this, options);
    }


    /**
     * @function SuperMap.DatasetBufferAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.dataset = null;
        if (me.filterQueryParameter) {
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
        if (me.resultSetting) {
            me.resultSetting.destroy();
            me.resultSetting = null;
        }
        me.isAttributeRetained = null;
        me.isUnion = null;
    }

    /**
     * @function SuperMap.DatasetBufferAnalystParameters.toObject
     * @param datasetBufferAnalystParameters - {SuperMap.DatasetBufferAnalystParameters} 数据集缓冲区分析参数类。
     * @param tempObj - {SuperMap.DatasetBufferAnalystParameters} 数据集缓冲区分析参数对象。
     * @description 将数据集缓冲区分析参数对象转换为JSON对象。
     * @return {Object} JSON对象。
     */
    static toObject(datasetBufferAnalystParameters, tempObj) {
        for (var name in datasetBufferAnalystParameters) {
            if (name === "bufferSetting") {
                datasetBufferAnalystParameters.bufferSetting.radiusUnit = datasetBufferAnalystParameters.bufferSetting.radiusUnit.toUpperCase();
                tempObj.bufferAnalystParameter = datasetBufferAnalystParameters.bufferSetting;
            } else if (name === "resultSetting") {
                tempObj.dataReturnOption = datasetBufferAnalystParameters.resultSetting;
            } else if (name === "dataset") {
                continue;
            } else {
                tempObj[name] = datasetBufferAnalystParameters[name];
            }
        }
    }

    CLASS_NAME = "SuperMap.DatasetBufferAnalystParameters"
}


SuperMap.DatasetBufferAnalystParameters = DatasetBufferAnalystParameters;