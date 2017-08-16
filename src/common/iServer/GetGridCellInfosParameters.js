import SuperMap from '../SuperMap';

/**
 * @class SuperMap.GetGridCellInfosParameters
 * @classdesc 数据服务栅格查询参数类。
 * @param options - {Object} 可選参数。如:</br>
 *        datasetName - {string} 数据集名称。</br>
 *        dataSourceName - {string} 数据源名称</br>
 *        X - {Integer} 要查询的地理位置X轴。</br>
 *        Y - {Integer} 要查询的地理位置Y轴。</br>
 */
export default  class GetGridCellInfosParameters {
    /**
     * @member SuperMap.GetGridCellInfosParameters.prototype.datasetName -{string}
     * @description 数据集名称。
     */
    datasetName = null;

    /**
     * @member SuperMap.GetGridCellInfosParameters.prototype.dataSourceName -{string}
     * @description  数据源名称。
     */
    dataSourceName = null;

    /**
     * @member SuperMap.GetGridCellInfosParameters.prototype.X -{number}
     * @description 要查询的地理位置X轴
     */
    X = null;

    /**
     * @member SuperMap.GetGridCellInfosParameters.prototype.Y -{number}
     * @description 要查询的地理位置Y轴
     */
    Y = null;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function SuperMap.GetGridCellInfosParameters.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy() {
        var me = this;
        me.datasetName = null;
        me.dataSourceName = null;
        me.X = null;
        me.Y = null;
    }


    CLASS_NAME = "SuperMap.GetGridCellInfosParameters"
}

SuperMap.GetGridCellInfosParameters = GetGridCellInfosParameters;
