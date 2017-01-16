/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.ComputeWeightMatrixResult
 * 耗费矩阵分析服务结果类。
 * 该类存储了指定的任意两点间的一个耗费矩阵。
 */
SuperMap.REST.ComputeWeightMatrixResult = SuperMap.Class({
     
    /** 
     * APIProperty: weightMatrix
     * {Array} 耗费矩阵数组。 
     */
    weightMatrix: null,
    
    /**
     * Constructor: SuperMap.REST.ComputeWeightMatrixResult
     * 耗费矩阵分析服务结果类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * weightMatrix - {Array} 耗费矩阵数组。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。 
     */
    destroy: function() {
        var me = this;
        if (me.weightMatrix) {
            me.weightMatrix.length = 0;
            me.weightMatrix = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.ComputeWeightMatrixResult"
});

/**
 * Function: SuperMap.REST.ComputeWeightMatrixResult.fromJson
 * 将 JSON 对象转换为 ComputeWeightMatrixResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的耗费矩阵分析服务结果。 
 *
 * Returns:
 * {<SuperMap.REST.ComputeWeightMatrixResult>} 转化后的 ComputeWeightMatrixResult 对象。
 */
SuperMap.REST.ComputeWeightMatrixResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.ComputeWeightMatrixResult({
        weightMatrix: jsonObject
    });
    return result;
};