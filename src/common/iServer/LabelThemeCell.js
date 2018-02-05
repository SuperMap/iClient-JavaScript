import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ThemeLabel} from './ThemeLabel';
import {LabelMatrixCell} from './LabelMatrixCell';

/**
 * @class SuperMap.LabelThemeCell
 * @category  iServer Map Theme 
 * @classdesc 专题图类型的矩阵标签元素类。
 * @description 该类继承自 {@link SuperMap.LabelMatrixCell}类，主要对矩阵标签中的专题图类型的矩阵标签元素进行设置。
 *              矩阵标签专题图是标签专题图（{@link SuperMap.ThemeLabel}）的一种，其中矩阵标签中的填充元素又可分为图片类型（{@link SuperMap.LabelImageCell}）、
 *              符号类型（{@link SuperMap.LabelSymbolCell}）、专题图类型（{@link SuperMap.LabelThemeCell}）三种，该类是这三种类型的矩阵标签元素其中的一种，
 *              用于定义符号类型的矩阵标签，如符号 ID 字段名称（符号 ID 与 SuperMap 桌面产品中点、线、面符号的 ID 对应） 、大小等。
 *              用户在实现矩阵标签专题图时只需将定义好的矩阵标签元素赋值予 {@link SuperMap.ThemeLabel.matrixCells} 属性即可。matrixCells 属是一个二维数组，
 *              每一维可以是任意类型的矩阵标签元素组成的数组（也可是单个标签元素组成的数组，即数组中只有一个元素）。
 * @extends SuperMap.LabelMatrixCell
 * @param options - {Object} 可选参数。如：<br>
 *        themeLabel - {{@link SuperMap.ThemeLabel}} 使用专题图对象作为矩阵标签的一个元素。
 */
export class LabelThemeCell extends LabelMatrixCell {


    constructor(options) {
        super(options);
        /**
         * @member SuperMap.LabelThemeCell.prototype.themeLabel -{SuperMap.ThemeLabel}
         * @description 使用专题图对象作为矩阵标签的一个元素。
         */
        this.themeLabel =  new ThemeLabel();

        /**
         * @member SuperMap.LabelThemeCell.prototype.type -{string}
         * @description 制作矩阵专题图时是必须的。
         */
        this.type = "THEME";

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = " SuperMap.LabelThemeCell";
    }

    /**
     * @function SuperMap.LabelThemeCell.prototype.destroy
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

SuperMap.LabelThemeCell = LabelThemeCell;