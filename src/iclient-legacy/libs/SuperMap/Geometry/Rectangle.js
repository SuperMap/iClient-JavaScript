/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry.js
 */

/**
 * Class: SuperMap.Geometry.Rectangle
 * 矩形几何对象类。
 * 
 * Inherits:
 *  - <SuperMap.Geometry>
 */

SuperMap.Geometry.Rectangle = SuperMap.Class(SuperMap.Geometry, {

    /** 
     * APIProperty: x
     * {Float}矩形左下角点的横坐标。
     */
    x: null,

    /** 
     * APIProperty: y
     * {Float}矩形左下角点的纵坐标。
     */
    y: null,

    /** 
     * APIProperty: width
     * {Float}矩形的宽度。
     */
    width: null,

    /** 
     * APIProperty: height
     * {Float}矩形的高度。
     */
    height: null,

    /**
     * Constructor: SuperMap.Geometry.Rectangle
     * 实例化矩形对象。
     * (code)
     * //x为矩形左下角点的横坐标；y为矩形左下角点的纵坐标；w为矩形的宽度；h为矩形的高度
     *  var x = 1;
     *  var y = 2;
     *  var w = 10;
     *  var h = 20;
     *  var recttangle = new SuperMap.Geometry.Rectangle(x, y, w, h);
     * (end)
     * 
     * Parameters:
     * x - {Float} 矩形左下角点的横坐标。
     * y - {Float} 矩形左下角点的纵坐标。
     * width - {Float} 矩形的宽度。
     * height - {Float} 矩形的高度。
     */
    initialize: function(x, y, width, height) {
        SuperMap.Geometry.prototype.initialize.apply(this, arguments);
        
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
    },
    
    /**
     * Method: calculateBounds
     * 计算出此矩形对象的bounds。
     */
    calculateBounds: function() {
        this.bounds = new SuperMap.Bounds(this.x, this.y,
                                            this.x + this.width, 
                                            this.y + this.height);
    },
    
    
    /**
     * APIMethod: getLength
     * 获取矩形对象的周长
     * Returns:
     * {Float} 矩形对象的长度。
     */
    getLength: function() {
        var length = (2 * this.width) + (2 * this.height);
        return length;
    },

    /**
     * APIMethod: getArea
     * 获取矩形对象的面积。
     * Returns:
     * {Float} 矩形对象面积。
     */
    getArea: function() {
        var area = this.width * this.height;
        return area;
    },

    /**
     * APIMethod: move
     * 沿着x、y轴的正方向上按照给定的位移移动矩形对象
     *
     * Parameters:
     * x - {Float} x轴正方向上的偏移量。
     * y - {Float} y轴正方向上偏移量。
     */
    move: function(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.calculateBounds();
    },

    /**
     * APIMethod: getCentroid
     * 获取几何对象的质心。
     * Returns:
     * {<SuperMap.Geometry.Point>} 几何图形的质心。
     */
    getCentroid: function(){
        var centroidX = this.x + this.width/2,
            centroidY = this.y + this.height/2;
        return new SuperMap.Geometry.Point(centroidX, centroidY);
    },

    CLASS_NAME: "SuperMap.Geometry.Rectangle"
});
