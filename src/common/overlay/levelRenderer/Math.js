import SuperMap from '../../SuperMap';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Tool.Math
 * LevelRenderer 工具-数学辅助类
 *
 */
export default class Math {

    /**
     * Property: _radians
     * {Number} 角度与弧度转化参数
     */
    _radians = null;

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Math
     * 构造函数。
     *
     */
    constructor() {
        this._radians = Math.PI / 180;
    }


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
    sin(angle, isDegrees) {
        return Math.sin(isDegrees ? angle * this._radians : angle);
    }


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
    cos(angle, isDegrees) {
        return Math.cos(isDegrees ? angle * this._radians : angle);
    }


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
    degreeToRadian(angle) {
        return angle * this._radians;
    }


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
    radianToDegree(angle) {
        return angle / this._radians;
    }


    CLASS_NAME = "SuperMap.LevelRenderer.Tool.Math"
}
SuperMap.LevelRenderer.Tool.Math = Math;