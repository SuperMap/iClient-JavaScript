/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ThemeLabel} from './ThemeLabel';
import {LabelMatrixCell} from './LabelMatrixCell';

/**
 * @class LabelThemeCell
 * @deprecatedclass SuperMap.LabelThemeCell
 * @category iServer Map Theme
 * @classdesc 专题图类型的矩阵标签元素类。
 * 主要对矩阵标签中的专题图类型的矩阵标签元素进行设置。
 * 矩阵标签专题图是标签专题图（{@link ThemeLabel}）的一种，其中矩阵标签中的填充元素又可分为图片类型（{@link LabelImageCell}）、
 * 符号类型（{@link LabelSymbolCell}）、专题图类型（{@link LabelThemeCell}）三种，该类是这三种类型的矩阵标签元素其中的一种，
 * 用于定义符号类型的矩阵标签，如符号 ID 字段名称（符号 ID 与 SuperMap 桌面产品中点、线、面符号的 ID 对应）、大小等。
 * 用户在实现矩阵标签专题图时只需将定义好的矩阵标签元素赋值予 {@link ThemeLabel#matrixCells} 属性即可。matrixCells 属性是一个二维数组，
 * 每一维可以是任意类型的矩阵标签元素组成的数组（也可是单个标签元素组成的数组，即数组中只有一个元素）。
 * @extends {LabelMatrixCell}
 * @param {Object} options -参数。
 * @param {ThemeLabel} options.themeLabel - 作为矩阵标签元素的标签专题图类。
 * @usage
 */
export class LabelThemeCell extends LabelMatrixCell {


    constructor(options) {
        super(options);
        /**
         * @member {ThemeLabel} LabelThemeCell.prototype.themeLabel
         * @description 使用专题图对象作为矩阵标签的一个元素。
         */
        this.themeLabel =  new ThemeLabel();

        /**
         * @member {string} LabelThemeCell.prototype.type
         * @description 设置矩阵标签元素的类型，在制作矩阵标签元素时必须指定元素类型。
         */
        this.type = "THEME";

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = " SuperMap.LabelThemeCell";
    }

    /**
     * @function LabelThemeCell.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.themeLabel) {
            me.themeLabel.destroy();
            me.themeLabel = null;
        }
    }


}
