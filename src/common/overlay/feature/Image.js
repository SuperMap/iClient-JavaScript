import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Image
 * @category Visualization Theme
 * 图片参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export class Image extends ShapeParameters {


    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Image
     * 创建一个图片参数对象。
     *
     * Parameters:
     * x - {Number} 左上角横坐标，必设参数。
     * y - {Number} 左上角纵坐标，必设参数。
     * image - {String/Cavans} 图片地址或cavans对象，必设参数。
     * width - {Number} 绘制到画布上的宽度，默认为图片高度。
     * height - {Number} 绘制到画布上的高度，默认为图片高度。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Image>} 图片参数对象。
     */
    //     * sx - {Number} 从图片中裁剪的左上角横坐标。
    //     * sy - {Number} 从图片中裁剪的左上角纵坐标。
    //     * sWidth - {Number} 从图片中裁剪的宽度，默认为图片高度。
    //     * sHeight - {Number} 绘制到画布上的高度，默认为图片高度。
    constructor(x, y, image, width, height, sx, sy, sWidth, sHeight) {
        super(x, y, image, width, height, sx, sy, sWidth, sHeight);
        /**
         * APIProperty: x
         * {Number} 图片左上角横坐标。
         */
        this.x = x;

        /**
         * APIProperty: y
         * {Number} 左上角纵坐标。
         */
        this.y = y;

        /**
         * APIProperty: image
         * {String} 图片地址。
         */
        this.image = image;

        /**
         * APIProperty: width
         * {Number} 绘制到画布上的宽度，默认为图片高度。
         */
        this.width = width;

        /**
         * APIProperty: height
         * {Number} 绘制到画布上的高度，默认为图片高度。
         */
        this.height = height;

        /**
         * Property: sx
         * {Number} 从图片中裁剪的左上角横坐标。
         */
        this.sx = sx;

        /**
         * Property: sy
         * {Number} 从图片中裁剪的左上角纵坐标。
         */
        this.sy = sy;

        /**
         * Property: sWidth
         * {Number} 从图片中裁剪的宽度，默认为图片高度。
         */
        this.sWidth = sWidth;

        /**
         * Property: sHeight
         * {Number} 绘制到画布上的高度，默认为图片高度。
         */
        this.sHeight = sHeight;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Image";

    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.image = null;
        this.width = null;
        this.height = null;
        this.sx = null;
        this.sy = null;
        this.sWidth = null;
        this.sHeight = null;
        super.destroy();
    }
}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Image = Image;