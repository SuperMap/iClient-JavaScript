/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeFactory} from './feature/ShapeFactory';
import {Point as FeaturePoint} from './feature/Point';
import {Graph} from './Graph';

/**
 * @class SuperMap.Feature.Theme.Point
 * @classdesc 点状图。
 * @category Visualization Theme
 * @param {SuperMap.Feature.Vector} data - 用户数据。
 * @param {SuperMap.Layer.Graph} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 中的参与此图表生成的字段名称。
 * @param {SuperMap.Feature.Theme.Point.setting} setting - 图表配置对象。
 * @param {SuperMap.LonLat} [lonlat] - 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @example
 * // pointStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <SuperMap.Feature.ShapeParameters.Point.style> 。
 * // pointStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 *@extends {SuperMap.Feature.Theme.Graph}

 */
export class Point extends Graph {

    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);
        this.CLASS_NAME = "SuperMap.Feature.Theme.Point";
    }

    /**
     * @function SuperMap.Feature.Theme.Point.prototype.destroy
     * @description 销毁此专题要素。调用 destroy 后此对象所以属性置为 null。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.Feature.Theme.prototype.Point.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        // 图表配置对象
        var sets = this.setting;

        // 默认数据视图框
        if (!sets.dataViewBoxParameter) {
            if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 15, 15, 15];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        var dvb = this.dataViewBox;

        // 值域
        var codomain = this.DVBCodomain;
        // 重要步骤：定义图表 Bar 数据视图框中单位值的含义
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;
        var uv = this.DVBUnitValue;
        var fv = this.dataValues;

        // 获取 x 轴上的图形信息
        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        // 折线每个节点的 x 位置
        var xsLoc = xShapeInfo.xPositions;

        // 背景框，默认启用
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            // 将背景框图形添加到模型的 shapes 数组，注意添加顺序，后添加的图形在先添加的图形之上。
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        // 点状图必须使用坐标轴
        this.shapes = this.shapes.concat(ShapeFactory.GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));

        var xPx;        // 图形点 x 坐标
        var yPx;        // 图形点 y 坐标
        for (var i = 0, len = fv.length; i < len; i++) {
            // 数据溢出值域检查
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                //isDataEffective = false;
                return null;
            }

            xPx = xsLoc[i];
            yPx = dvb[1] - (fv[i] - codomain[0]) / uv;

            // 图形点参数对象
            var poiSP = new FeaturePoint(xPx, yPx);
            // 图形点 style
            poiSP.style = ShapeFactory.ShapeStyleTool({fillColor: "#ee9900"}, sets.pointStyle, sets.pointStyleByFields, sets.pointStyleByCodomain, i, fv[i]);
            // 图形点 hover 样式
            poiSP.highlightStyle = ShapeFactory.ShapeStyleTool(null, sets.pointHoverStyle);

            // 图形点 hover click
            if (typeof(sets.pointHoverAble) !== "undefined") {
                poiSP.hoverable = sets.pointHoverAble;
            }
            if (typeof(sets.pointClickAble) !== "undefined") {
                poiSP.clickable = sets.pointClickAble;
            }

            // 图形携带的数据信息
            poiSP.refDataID = this.data.id;
            poiSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 创建图形点并把此图形添加到图表图形数组
            this.shapes.push(this.shapeFactory.createShape(poiSP));
        }

        // 数据范围检测未通过，清空图形
        // if (isDataEffective === false) {
        //     this.shapes = [];
        // }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function SuperMap.Feature.Theme.Point.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性：<br>
     *              xShapeBlank - {Array.<number>} 水平方向上的图形空白间隔参数。
     *              长度为 2 的数组，第一元素表示第折线左端点与数据视图框左端的空白间距，第二个元素表示折线右端点右端与数据视图框右端端的空白间距 。
     * @returns {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性：<br>
     *         xPositions - {Array.<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *         width - {number}表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     */
    calculateXShapeInfo() {
        var dvb = this.dataViewBox;     // 数据视图框
        var sets = this.setting;     // 图表配置对象
        var fvc = this.dataValues.length;      // 数组值个数

        if (fvc < 1) {
            return null;
        }

        var xBlank;        // x 轴空白间隔参数
        var xShapePositions = [];         // x 轴上图形的位置
        var xShapeWidth = 0;          // x 轴上图形宽度(自适应)
        var dvbWidth = this.DVBWidth;            // 数据视图框宽度
        var unitOffset = 0;               // 单位偏移量

        //  x 轴空白间隔参数处理
        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length == 2) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[1]);
            if (xsLen <= fvc) {
                return null;
            }
            unitOffset = xsLen / (fvc - 1);
        } else {
            // 默认使用等距离空白间隔，空白间隔为图形宽度
            unitOffset = dvbWidth / (fvc + 1);
            xBlank = [unitOffset, unitOffset, unitOffset];
        }

        // 图形 x 轴上的位置计算
        var xOffset = 0
        for (var i = 0; i < fvc; i++) {
            if (i == 0) {
                xOffset = xBlank[0];
            } else {
                xOffset += unitOffset;
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }

}

/**
 * @typedef {Object} SuperMap.Feature.Theme.Point.setting
 * @property {number} width - 专题要素（图表）宽度。
 * @property {number} height - 专题要素（图表）高度。
 * @property {Array.<number>} codomain - 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @property {number} [XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
 * @property {number} [YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
 * @property {Array.<number>} [dataViewBoxParameter] - 数据视图框 dataViewBox 参数，
 *                     它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。
 *                     当使用坐标轴时 dataViewBoxParameter 的默认值为：[45, 15, 15, 15]；不使用坐标轴时 dataViewBoxParameter 的默认值为：[5, 5, 5, 5]。
 * @property {number} [decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @property {boolean} [useBackground] - 是否使用图表背景框。
 * @property {SuperMap.Feature.ShapeParameters.Rectangle.style} backgroundStyle - 背景样式。
 * @property {Array.<number>} [backgroundRadius=[0, 0, 0, 0]] - 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,
 *                 则 backgroundRadius 为 [r1、r2、r3、r4 ]。
 * @property {Array.<number>} xShapeBlank - 水平方向上的图形空白间隔参数。
 *                 长度为 2 的数组，第一个元素表示第一个（沿 x 轴方向）图形点与数据视图框左端的空白间距，第二个元素表示最后一个（沿 x 轴方向）图形点与数据视图框右端端的空白间距 。
 * @property {Object} axisStyle - 坐标轴样式。
 * @property {boolean} [axisUseArrow=false] - 坐标轴是否使用箭头。
 * @property {number} [axisYTick=0] - y 轴刻度数量。
 * @property {Array.<string>} [axisYLabels] - y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。
 * @property {SuperMap.Feature.ShapeParameters.Label.style} [axisYLabelsStyle] - y 轴上的标签组样式。
 * @property {Array.<number>} [axisYLabelsOffset=0] - y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正；
 *                 数组第二项表示 y 轴标签组纵向上的偏移量，向下为正。
 * @property {Array.<string>} [axisXLabels] - x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。
 *                 标签排布规则：当标签数量与 xShapeInfo 中的属性 xShapeCenter 数量相同（即标签个数与数据个数相等时）, 按照 xShapeCenter 提供的位置排布标签，
 *                 否则沿数据视图框下面条边等距排布标签。
 * @property {SuperMap.Feature.ShapeParameters.Label.style} [axisXLabelsStyle] - x 轴上的标签组样式。
 * @property {Array.<number>} [axisXLabelsOffset=0] - x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正，
 *                 数组第二项表示 x 轴标签组纵向上的偏移量，向下为正。
 * @property {boolean} [useXReferenceLine=true] - 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。
 * @property {SuperMap.Feature.ShapeParameters.Line.style} [xReferenceLineStyle] - 水平参考线样式。
 * @property {SuperMap.Feature.ShapeParameters.Point.style} [pointStyle] - 点状图中图形点基础 style，此参数控制图形点基础样式，优先级低于 pointStyleByFields 和 pointStyleByCodomain。
 * @property {Array.<SuperMap.Feature.ShapeParameters.Point.style>} [pointStyleByFields] - 按专题字段 themeFields（<SuperMap.Layer.Graph.themeFields>）为图形点赋 style，此参数按字段控制图形点样式，
 *               优先级低于 pointStyleByCodomain，高于 pointStyle。此数组中的元素是样式对象。
 *               此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<SuperMap.Layer.Graph.themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],
 * pointStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的图形点使用 style1，字段 POP_1995 对应的图形点使用 style2 ，字段 POP_1999 对应的图形点使用 style3。
 * @property {Array.<Object>} pointStyleByCodomain - 按图形点代表的数据值所在值域范围控制图形点样式，优先级高于 pointStyle 和 pointStyleByFields。
 * @property {Object} [pointHoverStyle] - 图形点 hover 状态时的样式，pointHoverAble 为 true 时有效。
 * @property {Object} [pointHoverAble=true] - 是否允许图形点使用 hover 状态。同时设置 pointHoverAble 和 pointClickAble 为 false，可以直接屏蔽图形点对专题图层事件的响应。
 * @property {Object} [pointClickAble=true] - 是否允许图形点被点击。同时设置 pointHoverAble 和 pointClickAble 为 false，可以直接屏蔽图形点对专题图层事件的响应。
 */