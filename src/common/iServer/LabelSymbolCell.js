/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerStyle} from './ServerStyle';
import {LabelMatrixCell} from './LabelMatrixCell';

/**
 * @class LabelSymbolCell
 * @deprecatedclass SuperMap.LabelSymbolCell
 * @category  iServer Map Theme
 * @classdesc 符号类型的矩阵标签元素类。
 * 该类继承自 {@link LabelMatrixCell}类，主要对矩阵标签中的专题图类型的矩阵标签元素进行设置。
 * 矩阵标签专题图是标签专题图（{@link ThemeLabel}）的一种，其中矩阵标签中的填充元素又可分为图片类型（{@link LabelImageCell}）、
 * 符号类型（{@link LabelSymbolCell}）、专题图类型（{@link LabelThemeCell}）三种，该类是这三种类型的矩阵标签元素其中的一种，
 * 用于定义符号类型的矩阵标签，如符号 ID 字段名称（符号 ID 与 SuperMap 桌面产品中点、线、面符号的 ID 对应）、大小等。
 * 用户在实现矩阵标签专题图时只需将定义好的矩阵标签元素赋值予 {@link ThemeLabel#matrixCells} 属性即可。matrixCells 属性是一个二维数组，
 * 每一维可以是任意类型的矩阵标签元素组成的数组（也可是单个标签元素组成的数组，即数组中只有一个元素）。
 * @extends {LabelMatrixCell}
 * @param {Object} options - 参数。
 * @param {ServerStyle} options.style - 获取或设置符号样式。
 * @param {string} options.symbolIDField - 符号 ID 或符号 ID 所对应的字段名称。
 * @usage
 */
export class LabelSymbolCell extends LabelMatrixCell {

    constructor(options) {
        super(options);
        /**
         * @member {ServerStyle} LabelSymbolCell.prototype.style
         * @description 获取或设置符号样式—— {@link ServerStyle} 对象，包括符号大小（{@link ServerStyle#markerSize}）
         *              和符号旋转（{@link ServerStyle#markerAngle}）角度，其中用于设置符号 ID 的属性（{@link ServerStyle#markerSymbolID}）在此处不起作用。
         */
        this.style = new ServerStyle();

        /**
         * @member {string} LabelSymbolCell.prototype.symbolIDField
         * @description 获取或设置符号 ID 或符号 ID 所对应的字段名称。
         */
        this.symbolIDField = null;

        /**
         * @member {string} LabelSymbolCell.prototype.type
         * @description 制作矩阵专题图时是必须的。
         */
        this.type = "SYMBOL";

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.LabelSymbolCell";
    }

    /**
     * @function LabelSymbolCell.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.symbolIDField = null;
    }

}
