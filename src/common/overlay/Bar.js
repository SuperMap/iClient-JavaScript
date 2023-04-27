/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeFactory} from './feature/ShapeFactory';
import {Polygon} from './feature/Polygon';
import {Color} from './levelRenderer/Color';
import {Util as CommonUtil} from '../commontypes/Util';
import {Graph} from './Graph';
import './feature/Label';
import './feature/Line';

/**
 * @class FeatureThemeBar
 * @aliasclass Feature.Theme.Bar
 * @deprecatedclass SuperMap.Feature.Theme.Bar
 * @classdesc 柱状图 。
 * @category Visualization Theme
 * @example
 * // barStyleByCodomain参数用法如下：
 * // barStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <ShapeParametersPolygon.style> 。
 * // barStyleByCodomain 数组形如：
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
 * @param {FeatureVector} data - 用户数据。
 * @param {SuperMap.Layer.Graph} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 属性中的参与此图表生成的属性字段名称。
 * @param {FeatureThemeBar.setting} setting - 图表配置对象。
 * @param {LonLat} [lonlat] - 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @usage
 * @private
 */
export class Bar extends Graph {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "SuperMap.Feature.Theme.Bar";
    }

    /**
     * @function FeatureThemeBar.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FeatureThemeBar.prototype.assembleShapes
     * @description 图表图形装配函数。
     */
    assembleShapes() {
        //默认渐变颜色数组
        var deafaultColors = [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]];

        //默认阴影
        var deafaultShawdow = {
            showShadow: true,
            shadowBlur: 8,
            shadowColor: "rgba(100,100,100,0.8)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
        };

        // 图表配置对象
        var sets = this.setting;

        if (!sets.barLinearGradient) {
            sets.barLinearGradient = deafaultColors;
        }

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
        // 值域
        var codomain = this.DVBCodomain;
        // 重要步骤：定义图表 BaFeatureThemeBarr 数据视图框中单位值的含义
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;

        // 数据视图域
        var dvb = this.dataViewBox;
        // 用户数据值
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 数据溢出值域范围处理
        for (let i = 0, fvLen = fv.length; i < fvLen; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        // 获取 x 轴上的图形信息
        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        // 每个柱条 x 位置
        var xsLoc = xShapeInfo.xPositions;
        // 柱条宽度
        var xsWdith = xShapeInfo.width;

        // 背景框，默认启用
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            // 将背景框图形添加到模型的 shapes 数组，注意添加顺序，后添加的图形在先添加的图形之上。
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        // 坐标轴, 默认启用
        if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
            // 添加坐标轴图形数组
            this.shapes = this.shapes.concat(ShapeFactory.GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));
        }

        for (var i = 0; i < fv.length; i++) {
            // 计算柱条 top 边的 y 轴坐标值
            var yPx = dvb[1] - (fv[i] - codomain[0]) / this.DVBUnitValue;

            // 柱条节点数组
            var poiLists = [
                [xsLoc[i] - xsWdith / 2, dvb[1] - 1],
                [xsLoc[i] + xsWdith / 2, dvb[1] - 1],
                [xsLoc[i] + xsWdith / 2, yPx],
                [xsLoc[i] - xsWdith / 2, yPx]
            ];

            // 柱条参数对象（一个面参数对象）
            var barParams = new Polygon(poiLists);

            // 柱条 阴影 style
            if (typeof(sets.showShadow) === "undefined" || sets.showShadow) {
                if (sets.barShadowStyle) {
                    var sss = sets.barShadowStyle;
                    if (sss.shadowBlur) {
                        deafaultShawdow.shadowBlur = sss.shadowBlur;
                    }
                    if (sss.shadowColor) {
                        deafaultShawdow.shadowColor = sss.shadowColor;
                    }
                    if (sss.shadowOffsetX) {
                        deafaultShawdow.shadowOffsetX = sss.shadowOffsetX;
                    }
                    if (sss.shadowOffsetY) {
                        deafaultShawdow.shadowOffsetY = sss.shadowOffsetY;
                    }
                }
                barParams.style = {};
                CommonUtil.copyAttributesWithClip(barParams.style, deafaultShawdow);
            }

            // 图形携带的数据信息
            barParams.refDataID = this.data.id;
            barParams.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 柱条 hover click
            if (typeof(sets.barHoverAble) !== "undefined") {
                barParams.hoverable = sets.barHoverAble;
            }
            if (typeof(sets.barClickAble) !== "undefined") {
                barParams.clickable = sets.barClickAble;
            }

            // 创建柱条并添加到图表图形数组中
            this.shapes.push(this.shapeFactory.createShape(barParams));
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function FeatureThemeBar.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性：
     *              xShapeBlank - {Array.<number>} 水平方向上的图形空白间隔参数。
     *              长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，
     *              第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。
     * @returns {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性：
     *         xPositions - {Array.<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *         width - {number} 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *
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

        //  x 轴空白间隔参数处理
        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length == 3) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[2] + (fvc - 1) * xBlank[1]);
            if (xsLen <= fvc) {
                return null;
            }
            xShapeWidth = xsLen / fvc
        } else {
            // 默认使用等距离空白间隔，空白间隔为图形宽度
            xShapeWidth = dvbWidth / (2 * fvc + 1);
            xBlank = [xShapeWidth, xShapeWidth, xShapeWidth];
        }

        // 图形 x 轴上的位置计算
        var xOffset = 0
        for (var i = 0; i < fvc; i++) {
            if (i == 0) {
                xOffset = xBlank[0] + xShapeWidth / 2;
            } else {
                xOffset += (xShapeWidth + xBlank[1]);
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }

    /**
     * @function FeatureThemeBar.prototype.resetLinearGradient
     * @description 图表的相对坐标存在的时候，重新计算渐变的颜色(目前用于二维柱状图 所以子类实现此方法)。
     */
    resetLinearGradient() {
        if (this.RelativeCoordinate) {
            var shpelength = this.shapes.length;
            var barLinearGradient = this.setting.barLinearGradient;
            var index = -1;
            for (var i = 0; i < shpelength; i++) {
                var shape = this.shapes[i];
                if (shape.CLASS_NAME === "SuperMap.LevelRenderer.Shape.SmicPolygon") {
                    var style = shape.style;
                    //计算出当前的绝对 x y
                    var x1 = this.location[0] + style.pointList[0][0];
                    var x2 = this.location[0] + style.pointList[1][0];

                    //渐变颜色
                    index++;
                    //以防定义的颜色数组不够用
                    if (index >= barLinearGradient.length) {
                        index = index % barLinearGradient.length;
                    }
                    var color1 = barLinearGradient[index][0];
                    var color2 = barLinearGradient[index][1];

                    //颜色
                    var zcolor = new Color();
                    var linearGradient = zcolor.getLinearGradient(x1, 0, x2, 0,
                        [[0, color1], [1, color2]]);

                    //赋值
                    shape.style.color = linearGradient;
                }
            }
        }
    }

}
