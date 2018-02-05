import {SuperMap} from '../SuperMap';

/**
 * @class SuperMap.LabelMatrixCell
 * @category  iServer Map Theme 
 * @classdesc 矩阵标签元素抽象类。
 * @description 该类可以包含 n*n 个矩阵标签元素，矩阵标签元素的类型可以是图片，符号，标签专题图等。
 *              符号类型的矩阵标签元素类、图片类型的矩阵标签元素类和专题图类型的矩阵标签元素类均继承自该类。
 */
export class LabelMatrixCell {
    constructor() {
        this.CLASS_NAME = "LabelMatrixCell";
    }

}

SuperMap.LabelMatrixCell = LabelMatrixCell;