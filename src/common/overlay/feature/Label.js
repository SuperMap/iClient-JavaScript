import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Label
 * @category Visualization Theme
 * 标签参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export class Label extends ShapeParameters {

    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Label
     * 创建一个标签参数对象。
     *
     * Parameters:
     * x - {Number} 横坐标，必设参数。
     * y - {Number} 纵坐标，必设参数。
     * text - {String} 图形中的附加文本，必设参数。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Label>} 标签参数对象。
     */
    constructor(x, y, text) {
        super(x, y, text);
        /**
         * APIProperty: x
         * {Number} 标签 x 坐标。
         */
        this.x = x;

        /**
         * APIProperty: y
         * {Number} 标签 y 坐标。
         */
        this.y = y;

        /**
         * APIProperty: text
         * {String} 标签的文本内容。
         */
        this.text = text;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Label";
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
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