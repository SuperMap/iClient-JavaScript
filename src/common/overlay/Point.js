/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeFactory} from './feature/ShapeFactory';
import {Point as FeaturePoint} from './feature/Point';
import {Graph} from './Graph';

/**
 * @class FeatureThemePoint
 * @aliasclass Feature.Theme.Point
 * @deprecatedclass SuperMap.Feature.Theme.Point
 * @classdesc 点状图。
 * @category Visualization Theme
 * @param {FeatureVector} data - 用户数据。
 * @param {SuperMap.Layer.Graph} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 中的参与此图表生成的字段名称。
 * @param {FeatureThemePoint.setting} setting - 图表配置对象。
 * @param {LonLat} [lonlat] - 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @example
 * // pointStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <Point.style> 。
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
 * @extends FeatureThemeGraph
 * @usage
 * @private
 */
export class Point extends Graph {

    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);
        this.CLASS_NAME = "SuperMap.Feature.Theme.Point";
    }

    /**
     * @function FeatureThemePoint.prototype.destroy
     * @description 销毁此专题要素。调用 destroy 后此对象所以属性置为 null。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FeatureTheme.prototype.Point.assembleShapes
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
        // 重要步骤：定义图表 FeatureThemeBar 数据视图框中单位值的含义
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
     * @function FeatureThemePoint.prototype.calculateXShapeInfo
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
