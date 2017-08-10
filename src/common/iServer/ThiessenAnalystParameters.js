import SuperMap from '../SuperMap';

/**
 * @class SuperMap.ThiessenAnalystParameters
 * @classdesc 泰森多边形分析参数基类。
 */
export default class ThiessenAnalystParameters {
    /**
     * @member SuperMap.ThiessenAnalystParameters.prototype.clipRegion -{SuperMap.Geometry}
     * @description 结果数据裁剪区域，可以为null，表示不对结果进行裁剪。
     */
    clipRegion = null;

    /**
     *  @member SuperMap.ThiessenAnalystParameters.prototype.createResultDataset -{Boolean}
     *  @description 是否返回结果数据集，默认值 false。如果为true，则必须设置属性resultDatasetName和resultDatasourceName。
     */
    createResultDataset = false;

    /**
     * @member SuperMap.ThiessenAnalystParameters.prototype.resultDatasetName -{String}
     * @description 指定结果数据集名称。
     */
    resultDatasetName = null;

    /**
     * @member SuperMap.ThiessenAnalystParameters.prototype.resultDatasourceName -{String}
     * @description 指定结果数据集所在数据源。
     */
    resultDatasourceName = null;

    /**
     * @member SuperMap.ThiessenAnalystParameters.prototype.returnResultRegion -{Boolean}
     * @description 是否返回分析得到的多边形面数组，默认 true，返回。
     */
    returnResultRegion = true;


    /*
     * @function SuperMap.ThiessenAnalystParameters.prototype.constructor
     * @param options - {Object} 可选参数。如:</br>
     *        clipRegion - {SuperMap.Geometry} 结果数据裁剪区域，可以为null，表示不对结果进行裁剪。</br>
     *        createResultDataset - {Boolean} 是否返回结果数据集，默认不返回。</br>
     *        resultDatasetName - {Boolean} 指定结果数据集名称。</br>
     *        resultDatasourceName - {Boolean} 指定结果数据集所在数据源，默认为当前数据源。</br>
     *        returnResultRegion - {Boolean} 是否返回分析得到的多边形面数组，默认返回。</br>
     */
    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.ThiessenAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.clipRegion) {
            me.clipRegion.destroy();
            me.clipRegion = null;
        }
        me.createResultDataset = null;
        me.resultDatasetName = null;
        me.resultDatasourceName = null;
        me.returnResultRegion = null;
    }

    CLASS_NAME = "SuperMap.ThiessenAnalystParameters"
}
SuperMap.ThiessenAnalystParameters = ThiessenAnalystParameters;