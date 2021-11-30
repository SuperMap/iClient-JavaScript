/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @private
 * @class  LevelRenderer.Tool.Math
 * @category Visualization Theme
 * @classdesc LevelRenderer 工具-数学辅助类
 */
export class MathTool {

     /**
     * @function LevelRenderer.Tool.Math.constructor
     * @description 构造函数。
     */

    constructor() {

        /**
         * @member {number} LevelRenderer.Tool.Math._radians
         * @description 角度与弧度转化参数
         */
        this._radians = window.Math.PI / 180;

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Math";
    }

    /**
     * @function LevelRenderer.Tool.Math.prototype.sin
     * @description 正弦函数。
     * @param {number} angle - 弧度（角度）参数。
     * @param {boolean} [isDegrees=false] - angle参数是否为角度计算，angle为以弧度计量的角度。
     * @returns {number} sin 值。
     */
    sin(angle, isDegrees) {
        return window.Math.sin(isDegrees ? angle * this._radians : angle);
    }

    /**
     * @function LevelRenderer.Tool.Math.prototype.cos
     * @description 余弦函数。
     * @param {number} angle - 弧度（角度）参数。
     * @param {boolean} [isDegrees=false] - angle参数是否为角度计算，angle为以弧度计量的角度。
     * @returns {number} cos 值。
     */
    cos(angle, isDegrees) {
        return window.Math.cos(isDegrees ? angle * this._radians : angle);
    }

    /**
     * @function LevelRenderer.Tool.Math.prototype.degreeToRadian
     * @description 角度转弧度。
     * @param {number} angle - 弧度（角度）参数。
     * @param {boolean} [isDegrees=false] - angle参数是否为角度计算，angle为以弧度计量的角度。
     * @returns {number} 弧度值。
     */
    degreeToRadian(angle) {
        return angle * this._radians;
    }

    /**
     * @function LevelRenderer.Tool.Math.prototype.radianToDegree
     * @description 弧度转角度。
     * @param {number} angle - 弧度（角度）参数。
     * @param {boolean} [isDegrees=false] - angle参数是否为角度计算，angle为以弧度计量的角度。
     * @returns {number} 角度。
     */

    radianToDegree(angle) {
        return angle / this._radians;
    }

}
