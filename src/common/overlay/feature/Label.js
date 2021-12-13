/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ShapeParameters } from './ShapeParameters';

/**
 * @class CommonLabel
 * @aliasclass Feature.ShapeParameters.Label
 * @deprecatedclass SuperMap.Feature.ShapeParameters.Label
 * @category Visualization Theme
 * @classdesc 标签参数对象。
 * @extends {ShapeParameters}
 * @param {number} x - 横坐标。
 * @param {number} y - 纵坐标。
 * @param {string} text - 图形中的附加文本。
 * @usage
 */

export class Label extends ShapeParameters {
    constructor(x, y, text) {
        super(x, y, text);
        /**
         * @member {number} CommonLabel.prototype.x
         * @description 标签 x 坐标。
         */
        this.x = x;

        /**
         * @member {number} CommonLabel.prototype.y
         * @description 标签 y 坐标。
         */
        this.y = y;

        /**
         * @member {number} CommonLabel.prototype.text
         * @description 标签的文本内容。
         */
        this.text = text;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Label";
    }


    /**
     * @function CommonLabel.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.text = null;

        super.destroy();
    }


}
