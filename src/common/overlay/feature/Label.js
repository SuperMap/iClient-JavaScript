import SuperMap from '../../SuperMap';
import ShapeParameters from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Label
 * 标签参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export default class Label extends ShapeParameters {

    /**
     * APIProperty: x
     * {Number} 标签 x 坐标。
     */
    x = null;

    /**
     * APIProperty: y
     * {Number} 标签 y 坐标。
     */
    y = null;

    /**
     * APIProperty: text
     * {String} 标签的文本内容。
     */
    text = null;


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

        this.x = x;
        this.y = y;
        this.text = text;
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


    CLASS_NAME = "SuperMap.Feature.ShapeParameters.Label"
}
SuperMap.Feature.ShapeParameters.Label = Label;
