/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util as CommonUtil} from '../commontypes/Util';
import {ShapeFactory} from './feature/ShapeFactory';
import {Polygon} from './feature/Polygon';
import {Graph} from './Graph';

/**
 * @class Bar3D
 * @aliasclass Feature.Theme.Bar3D
 * @deprecatedclass SuperMap.Feature.Theme.Bar3D
 * @classdesc 三维柱状图 。
 * @category Visualization Theme
 * @extends CommonGraph
 * @param {GeometryVector} data - 用户数据。
 * @param {SuperMap.Layer.Graph} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 中的参与此图表生成的字段名称。
 * @param {Bar3D.setting} setting - 图表配置对象。
 * @param {LonLat} [lonlat] - 专题要素地理位置，默认为 data 指代的地理要素 Bounds 中心。
 *

 *
 * @example
 * // barFaceStyleByCodomain 用法示例如下：
 * // barFaceStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <FeaturePolygon.style> 。
 * // barFaceStyleByCodomain 数组形如：
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
 *
 * @example
 * // barSideStyleByCodomain 用法示例如下：
 * // barSideStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <FeaturePolygon.style> 。
 * // barSideStyleByCodomain 数组形如：
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
 *
 * @example
 * // barTopStyleByCodomain 用法示例如下：
 * // barTopStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性：<FeaturePolygon.style> 。
 * // barTopStyleByCodomain 数组形如：
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
 * @usage
 * @private
 */

export class Bar3D extends Graph {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "SuperMap.Feature.Theme.Bar3D";
    }

    /**
     * @function Bar3D.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Bar3D.prototype.assembleShapes
     * @description 图形装配实现（扩展接口）。
     */
    assembleShapes() {
        // 图表配置对象
        var sets = this.setting;

        // 默认数据视图框
        if (!sets.dataViewBoxParameter) {
            if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 25, 20, 20];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        // 3d 柱图的坐标轴默认使用坐标轴箭头
        sets.axisUseArrow = (typeof(sets.axisUseArrow) !== "undefined") ? sets.axisUseArrow : true;
        sets.axisXLabelsOffset = (typeof(sets.axisXLabelsOffset) !== "undefined") ? sets.axisXLabelsOffset : [-10, 10];

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        // 值域
        var codomain = this.DVBCodomain;
        // 重要步骤：定义图表 Bar 数据视图框中单位值的含义
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

        // 坐标轴, 默认启用
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        // 坐标轴
        if (!sets.axis3DParameter || isNaN(sets.axis3DParameter) || sets.axis3DParameter < 15) {
            sets.axis3DParameter = 20;
        }
        if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
            this.shapes = this.shapes.concat(ShapeFactory.GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));
        }

        // 3d 偏移量, 默认值 10;
        var offset3d = (sets.bar3DParameter && !isNaN(sets.bar3DParameter)) ? sets.bar3DParameter : 10;

        for (let i = 0; i < fv.length; i++) {
            // 无 3d 偏移量时的柱面顶部 y 坐标
            var yPx = dvb[1] - (fv[i] - codomain[0]) / this.DVBUnitValue;
            // 无 3d 偏移量时的柱面的左、右端 x 坐标
            var iPoiL = xsLoc[i] - xsWdith / 2;
            var iPoiR = xsLoc[i] + xsWdith / 2;

            // 3d 柱顶面节点
            var bar3DTopPois = [
                [iPoiL, yPx],
                [iPoiR, yPx],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiL - offset3d, yPx + offset3d]
            ];

            // 3d 柱侧面节点
            var bar3DSidePois = [
                [iPoiR, yPx],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiR - offset3d, dvb[1] + offset3d],
                [iPoiR, dvb[1]]
            ];

            // 3d 柱正面节点
            var bar3DFacePois = [
                [iPoiL - offset3d, dvb[1] + offset3d],
                [iPoiR - offset3d, dvb[1] + offset3d],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiL - offset3d, yPx + offset3d]
            ];
            if (offset3d <= 0) {  // offset3d <= 0 时正面不偏移
                bar3DFacePois = [
                    [iPoiL, dvb[1]],
                    [iPoiR, dvb[1]],
                    [iPoiR, yPx],
                    [iPoiL, yPx]
                ];
            }

            // 新建 3d 柱面顶面、侧面、正面图形参数对象
            var polyTopSP = new Polygon(bar3DTopPois);
            var polySideSP = new Polygon(bar3DSidePois);
            var polyFaceSP = new Polygon(bar3DFacePois);


            // 侧面、正面图形 style 默认值
            sets.barSideStyle = sets.barSideStyle ? sets.barSideStyle : sets.barFaceStyle;
            sets.barSideStyleByFields = sets.barSideStyleByFields ? sets.barSideStyleByFields : sets.barFaceStyleByFields;
            sets.barSideStyleByCodomain = sets.barSideStyleByCodomain ? sets.barSideStyleByCodomain : sets.barFaceStyleByCodomain;
            sets.barTopStyle = sets.barTopStyle ? sets.barTopStyle : sets.barFaceStyle;
            sets.barTopStyleByFields = sets.barTopStyleByFields ? sets.barTopStyleByFields : sets.barFaceStyleByFields;
            sets.barTopStyleByCodomain = sets.barTopStyleByCodomain ? sets.barTopStyleByCodomain : sets.barFaceStyleByCodomain;
            // 顶面、侧面、正面图形 style
            polyFaceSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barFaceStyle, sets.barFaceStyleByFields, sets.barFaceStyleByCodomain, i, fv[i]);
            polySideSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barSideStyle, sets.barSideStyleByFields, sets.barSideStyleByCodomain, i, fv[i]);
            polyTopSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barTopStyle, sets.barTopStyleByFields, sets.barTopStyleByCodomain, i, fv[i]);

            // 3d 柱条高亮样式
            sets.barSideHoverStyle = sets.barSideHoverStyle ? sets.barSideHoverStyle : sets.barFaceHoverStyle;
            sets.barTopHoverStyle = sets.barTopHoverStyle ? sets.barTopHoverStyle : sets.barFaceHoverStyle;
            polyFaceSP.highlightStyle = ShapeFactory.ShapeStyleTool({stroke: true}, sets.barFaceHoverStyle);
            polySideSP.highlightStyle = ShapeFactory.ShapeStyleTool({stroke: true}, sets.barSideHoverStyle);
            polyTopSP.highlightStyle = ShapeFactory.ShapeStyleTool({stroke: true}, sets.barTopHoverStyle);

            // 图形携带的数据 id 信息 & 高亮模式
            polyTopSP.refDataID = polySideSP.refDataID = polyFaceSP.refDataID = this.data.id;
            // hover 模式（组合）
            polyTopSP.isHoverByRefDataID = polySideSP.isHoverByRefDataID = polyFaceSP.isHoverByRefDataID = true;
            // 高亮组(当鼠标 hover 到组内任何一个图形，整个组的图形都会高亮。refDataHoverGroup 在 isHoverByRefDataID 为 true 时有效)
            polyTopSP.refDataHoverGroup = polySideSP.refDataHoverGroup = polyFaceSP.refDataHoverGroup = CommonUtil.createUniqueID("lr_shg");
            // 图形携带的数据信息
            polyTopSP.dataInfo = polySideSP.dataInfo = polyFaceSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 3d 柱条顶面、侧面、正面图形 hover click 设置
            if (typeof(sets.barHoverAble) !== "undefined") {
                polyTopSP.hoverable = polySideSP.hoverable = polyFaceSP.hoverable = sets.barHoverAble;
            }
            if (typeof(sets.barClickAble) !== "undefined") {
                polyTopSP.clickable = polySideSP.clickable = polyFaceSP.clickable = sets.barClickAble;
            }

            // 创建3d 柱条的顶面、侧面、正面图形并添加到图表的图形列表数组
            this.shapes.push(this.shapeFactory.createShape(polySideSP));
            this.shapes.push(this.shapeFactory.createShape(polyTopSP));
            this.shapes.push(this.shapeFactory.createShape(polyFaceSP));
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function Bar3D.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性:
     *              xShapeBlank - {Array.<number>} 水平方向上的图形空白间隔参数。
     *              长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，
     *              第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。
     * @returns {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性:
     *                  xPositions - {Array.<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *                  width - {number} 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
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
            var xsLen = dvbWidth - (xBlank[0] + xBlank[2] + (fvc - 1) * xBlank[1])
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
}
