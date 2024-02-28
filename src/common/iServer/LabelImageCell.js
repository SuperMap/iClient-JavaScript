/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {LabelMatrixCell} from './LabelMatrixCell';

/**
 * @class LabelImageCell
 * @deprecatedclass SuperMap.LabelImageCell
 * @category iServer Map Theme
 * @classdesc 图片类型的矩阵标签元素类。主要对矩阵标签中的专题图类型的矩阵标签元素进行设置。
 * 矩阵标签专题图是标签专题图（ThemeLabel）的一种，其中矩阵标签中的填充元素又可分为图片类型（{@link LabelImageCell}）、
 * 符号类型（{@link LabelSymbolCell}）、专题图类型（{@link LabelThemeCell}）三种，该类是这三种类型的矩阵标签元素其中的一种，
 * 用于定义符号类型的矩阵标签，如符号 ID 字段名称（符号 ID 与 SuperMap 桌面产品中点、线、面符号的 ID 对应）、大小等。
 * 用户在实现矩阵标签专题图时只需将定义好的矩阵标签元素赋值予 {@link ThemeLabel#matrixCells} 属性即可。matrixCells 是一个二维数组，
 * 每一维可以是任意类型的矩阵标签元素组成的数组（也可是单个标签元素组成的数组，即数组中只有一个元素）。
 * @extends {LabelMatrixCell}
 * @param {Object} options - 可选参数。
 * @param {number} [options.height=0] - 设置图片的高度，单位为毫米。
 * @param {string} [options.pathField] - 设置矩阵标签元素所使用图片的路径。
 * @param {number} [options.rotation=0.0] - 图片的旋转角度。逆时针方向为正方向，单位为度，精确到 0.1 度。
 * @param {number} [options.width=0] - 设置图片的宽度，单位为毫米。
 * @param {boolean} [options.sizeFixed=false] - 是否固定图片的大小。
 * @usage
 */
export class LabelImageCell extends LabelMatrixCell {

    constructor(options) {
        super(options);
        /**
         * @member {number} LabelImageCell.prototype.height
         * @description 设置图片的高度，单位为毫米。
         */
        this.height = 0;

        /**
         * @member {string} LabelImageCell.prototype.pathField
         * @description 设置矩阵标签元素所使用的图片路径对应的字段名称。
         */
        this.pathField = null;

        /**
         * @member {number} [LabelImageCell.prototype.rotation=0.0]
         * @description 图片的旋转角度。逆时针方向为正方向，单位为度，精确到 0.1 度。
         */
        this.rotation = 0.0;

        /**
         * @member {number} LabelImageCell.prototype.width
         * @description 设置图片的宽度，单位为毫米。
         */
        this.width = 0;

        /**
         * @member {boolean} [LabelImageCell.prototype.sizeFixed=false]
         * @description 是否固定图片的大小。
         */
        this.sizeFixed = false;

        /**
         * @member {string} LabelImageCell.prototype.type
         * @description 设置矩阵标签元素的类型，在制作矩阵标签元素时必须指定元素类型。
         */
        this.type = "IMAGE";

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.LabelImageCell";
    }

    /**
     * @function LabelImageCell.prototype.destroy
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
