/**
 * Class: SuperMap.GetGridCellInfosParameters
 * 数据服务栅格查询参数类。
 */
var SuperMap = require('../SuperMap');
SuperMap.GetGridCellInfosParameters = SuperMap.Class({
    /**
     * APIProperty: datasetName
     * {String} 数据集名称。
     */
    datasetName: null,

    /**
     * APIProperty: dataSourceName
     * {String} 数据源名称。
     */
    dataSourceName: null,

    /**
     * APIProperty: X
     * {Number} 要查询的地理位置X轴
     */
    X: null,

    /**
     * APIProperty: X
     * {Number} 要查询的地理位置Y轴
     */
    Y: null,

    /**
     * Constructor: SuperMap.GetGridCellInfosParameters
     * SQL 查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * datasetName - {String} 数据集名称。
     * dataSourceName - {String} 数据源名称
     * X - {Integer} 要查询的地理位置X轴。
     * Y - {Integer} 要查询的地理位置Y轴。
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.datasetName = null;
        me.dataSourceName = null;
        me.X = null;
        me.Y = null;
    },

    CLASS_NAME: "SuperMap.GetGridCellInfosParameters"
});
module.exports = SuperMap.GetGridCellInfosParameters;
