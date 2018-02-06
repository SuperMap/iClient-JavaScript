/**
 * @private
 * @class  SuperMap.LevelRenderer.Tool.Math
 * @category Visualization Theme
 * LevelRenderer 工具-数学辅助类
 *
 */
export class Math {



    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Math
     * 构造函数。
     *
     */
    constructor() {
        /**
         * Property: _radians
         * {Number} 角度与弧度转化参数
         */
        this._radians = window.Math.PI / 180;

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Math";
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
        return window.Math.sin(isDegrees ? angle * this._radians : angle);
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
        return window.Math.cos(isDegrees ? angle * this._radians : angle);
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

}