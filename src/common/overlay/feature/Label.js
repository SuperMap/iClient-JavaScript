import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  SuperMap.Feature.ShapeParameters.Label
 * @category Visualization Theme
 * @classdesc 标签参数对象。
 * @extent {SuperMap.Feature.ShapeParameters}
 */
export class Label extends ShapeParameters {
    
    /**
     * @function SuperMap.Feature.ShapeParameters.Label.prototype.constructor
     * @description 创建一个标签参数对象。
     * @param {number} x - 横坐标，必设参数。
     * @param {number} y - 纵坐标，必设参数。
     * @param {string} text - 图形中的附加文本，必设参数。
     * @returns {SuperMap.Feature.ShapeParameters.Label} 标签参数对象。
     */
    constructor(x, y, text) {
        super(x, y, text);
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Label.prototype.x
         * @description 标签 x 坐标。
         */
        this.x = x;
        
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Label.prototype.y
         * @description 标签 y 坐标。
         */
        this.y = y;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Label.prototype.text
         * @description 标签的文本内容。
         */
        this.text = text;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Label";
    }


    /**
     * @function SuperMap.Feature.ShapeParameters.Label.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.text = null;

        super.destroy();
    }


}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Label = Label;