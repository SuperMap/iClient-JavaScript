/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Tool.Math
 * LevelRenderer 工具-数学辅助类
 *
 */
SuperMap.LevelRenderer.Tool.Math = SuperMap.Class({

    /**
     * Property: _radians
     * {Number} 角度与弧度转化参数
     */
    _radians: null,

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Math
     * 构造函数。
     *
     */
    initialize: function() {
        this._radians = Math.PI / 180;
    },

    /**
     * APIMethod: sin
     * 正弦函数。
     *
     * Parameters:
     * angle - {Number} 弧度（角度）参数。
     * isDegrees - {Boolean} angle参数是否为角度计算，默认为false，angle为以弧度计量的角度。
     *
     * Returns:
     * {Number} sin 值。
     */
    sin: function(angle, isDegrees){
        return Math.sin(isDegrees ? angle * this._radians : angle);
    },

    /**
     * APIMethod: cos
     * 正弦函数。
     *
     * Parameters:
     * angle - {Number} 弧度（角度）参数。
     * isDegrees - {Boolean} angle参数是否为角度计算，默认为false，angle为以弧度计量的角度。
     *
     * Returns:
     * {Number} cos 值。
     */
    cos: function(angle, isDegrees){
        return Math.cos(isDegrees ? angle * this._radians : angle);
    },

    /**
     * APIMethod: degreeToRadian
     * 角度转弧度。
     *
     * Parameters:
     * angle - {Number} 角度参数。
     *
     * Returns:
     * {Number} 弧度值。
     */
    degreeToRadian: function(angle){
        return angle * this._radians;
    },

    /**
     * APIMethod: radianToDegree
     * 弧度转角度。
     *
     * Parameters:
     * angle - {Number} 弧度参数。
     *
     * Returns:
     * {Number} 角度。
     */
    radianToDegree: function(angle){
        return angle /this._radians;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Tool.Math"
});