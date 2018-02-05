import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {LabelMatrixCell} from './LabelMatrixCell';

/**
 * @class SuperMap.LabelImageCell
 * @category  iServer Map Theme 
 * @classdesc 图片类型的矩阵标签元素类。
 * @description 该类继承自 {@link SuperMap.LabelMatrixCell}类，主要对矩阵标签中的专题图类型的矩阵标签元素进行设置。
 *              矩阵标签专题图是标签专题图（ThemeLabel）的一种，其中矩阵标签中的填充元素又可分为图片类型（{@link SuperMap.LabelImageCell}）、
 *              符号类型（{@link SuperMap.LabelSymbolCell}）、专题图类型（{@link SuperMap.LabelThemeCell}）三种，该类是这三种类型的矩阵标签元素其中的一种，
 *              用于定义符号类型的矩阵标签，如符号 ID 字段名称（符号 ID 与 SuperMap 桌面产品中点、线、面符号的 ID 对应） 、大小等。
 *              用户在实现矩阵标签专题图时只需将定义好的矩阵标签元素赋值予 {@link SuperMap.ThemeLabel.matrixCells} 属性即可。matrixCells 属是一个二维数组，
 *              每一维可以是任意类型的矩阵标签元素组成的数组（也可是单个标签元素组成的数组，即数组中只有一个元素）。
 * @extends SuperMap.LabelMatrixCell
 * @param options - {Object} 可选参数。如：<br>
 *        height - {number}设置图片的高度，单位为毫米。<br>
 *        pathField - {string} 设置矩阵标签元素所使用图片的路径。<br>
 *        rotation - {number}图片的旋转角度。逆时针方向为正方向，单位为度，精确到0.1度。默认值为0.0。<br>
 *        width - {number}设置图片的宽度，单位为毫米。<br>
 *        sizeFixed - {boolean} 是否固定图片的大小。默认值为 false，即图片将随地图缩放。
 */
export class LabelImageCell extends LabelMatrixCell {

    constructor(options) {
        super(options);
        /**
         * @member SuperMap.LabelImageCell.prototype.height -{number}
         * @description 设置图片的高度，单位为毫米。
         */
        this.height = 0;

        /**
         * @member SuperMap.LabelImageCell.prototype.pathField -{string}
         * @description 设置矩阵标签元素所使用的图片路径对应的字段名。
         */
        this.pathField = null;

        /**
         * @member SuperMap.LabelImageCell.prototype.rotation -{number}
         * @description 图片的旋转角度。逆时针方向为正方向，单位为度，精确到0.1度。默认值为0.0。
         */
        this.rotation = 0.0;

        /**
         * @member SuperMap.LabelImageCell.prototype.width -{number}
         * @description 设置图片的宽度，单位为毫米。
         */
        this.width = 0;

        /**
         * @member SuperMap.LabelImageCell.prototype.sizeFixed -{boolean}
         * @description 是否固定图片的大小。默认值为 false，即图片将随地图缩放。
         */
        this.sizeFixed = false;

        /**
         * @member SuperMap.LabelImageCell.prototype.type -{boolean}
         * @description 制作矩阵专题图时是必须的。
         */
        this.type = "IMAGE";

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.LabelImageCell";
    }

    /**
     * @function SuperMap.LabelImageCell.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.height = null;
        me.pathField = null;
        me.rotation = null;
        me.width = null;
        me.sizeFixed = null;
    }
}

SuperMap.LabelImageCell = LabelImageCell;