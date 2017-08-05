import SuperMap from '../SuperMap';

/**
 * @class SuperMap.GetGridCellInfosParameters
 * @constructs SuperMap.GetGridCellInfosParameters
 * @classdesc
 * 数据服务栅格查询参数类。。
 * @api
 */
export default  class GetGridCellInfosParameters {


    /**
     * APIProperty: datasetName
     * {String} 数据集名称。
     */
    datasetName = null;

    /**
     * APIProperty: dataSourceName
     * {String} 数据源名称。
     */
    dataSourceName = null;

    /**
     * APIProperty: X
     * {Number} 要查询的地理位置X轴
     */
    X = null;

    /**
     * APIProperty: X
     * {Number} 要查询的地理位置Y轴
     */
    Y = null;

    /**
     * @method SuperMap.GetGridCellInfosParameters.initialize
     * @description SQL 查询参数类构造函数。
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * datasetName - {String} 数据集名称。</br>
     * dataSourceName - {String} 数据源名称</br>
     * X - {Integer} 要查询的地理位置X轴。</br>
     * Y - {Integer} 要查询的地理位置Y轴。</br>
     */
    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
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
