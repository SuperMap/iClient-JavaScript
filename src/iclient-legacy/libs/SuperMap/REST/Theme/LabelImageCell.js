/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Theme/LabelMatrixCell.js
 */

/**
 * Class: SuperMap.REST.LabelImageCell
 * 图片类型的矩阵标签元素类。
 * 该类继承自 LabelMatrixCell类，主要对矩阵标签中的专题图类型的矩阵标签元素进行设置。
 * 矩阵标签专题图是标签专题图（ThemeLabel）的一种，其中矩阵标签中的填充元素又可分为图片类型（LabelImageCell）、
 * 符号类型（LabelSymbolCell）、专题图类型（LabelThemeCell）三种，该类是这三种类型的矩阵标签元素其中的一种，
 * 用于定义符号类型的矩阵标签，如符号 ID 字段名称（符号 ID 与 SuperMap 桌面产品中点、线、面符号的 ID 对应） 、大小等。
 * 用户在实现矩阵标签专题图时只需将定义好的矩阵标签元素赋值予 ThemeLabel.matrixCells 属性即可。matrixCells 属是一个二维数组，
 * 每一维可以是任意类型的矩阵标签元素组成的数组（也可是单个标签元素组成的数组，即数组中只有一个元素）。
 *
 * Inherits from:
 *  - <SuperMap.REST.LabelMatrixCell> 
 */
SuperMap.REST.LabelImageCell = SuperMap.Class(SuperMap.REST.LabelMatrixCell, {
    
    /** 
     * APIProperty: height
     * {Number} 设置图片的高度，单位为毫米。
     */
    height: 0,
    
    /** 
     * APIProperty: pathField
     * {String} 设置矩阵标签元素所使用的图片路径对应的字段名。
     */
    pathField: null,
    
    /** 
     * APIProperty: rotation
     * {Number} 图片的旋转角度。逆时针方向为正方向，单位为度，精确到0.1度。默认值为0.0。
     */
    rotation: 0.0,
    
    /** 
     * APIProperty: width
     * {Number} 设置图片的宽度，单位为毫米。
     */
    width: 0,
    
    /** 
     * APIProperty: sizeFixed
     * {Boolean} 是否固定图片的大小。默认值为 false，即图片将随地图缩放。
     */
    sizeFixed: false,
    
    /** 
     * Property: type
     * {Boolean} 制作矩阵专题图时是必须的。
     */
    type: "IMAGE",
    
    /**
     * Constructor: SuperMap.REST.LabelImageCell 
     * 图片类型的矩阵标签元素类构造函数，用于创建 LabelImageCell 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * height - {Number} 设置图片的高度，单位为毫米。
     * pathField - {String} 设置矩阵标签元素所使用图片的路径。
     * rotation - {Number} 图片的旋转角度。逆时针方向为正方向，单位为度，精确到0.1度。默认值为0.0。
     * width - {Number} 设置图片的宽度，单位为毫米。
     * sizeFixed - {Boolean} 是否固定图片的大小。默认值为 false，即图片将随地图缩放。
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
        me.height = null;
        me.pathField = null;
        me.rotation = null;
        me.width = null;
        me.sizeFixed = null;
    },
    
    CLASS_NAME: "SuperMap.REST.LabelImageCell"
});