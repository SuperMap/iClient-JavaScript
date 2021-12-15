/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeFactory} from './feature/ShapeFactory';
import {Sector} from './feature/Sector';
import {Graph} from './Graph';

/**
 * @class FeatureThemeRing
 * @aliasclass Feature.Theme.Ring
 * @deprecatedclass SuperMap.Feature.Theme.Ring
 * @classdesc 环状图。
 * @category Visualization Theme
 * @description 基于路由对象计算指定点 M 值操作的参数类。通过该类提供参数信息。

 * @param {FeatureVector} data - 用户数据。
 * @param {SuperMap.Layer.Graph} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 中的参与此图表生成的字段名称。
 * @param {FeatureThemeRing.setting} setting - 图表配置对象。
 * @param {LonLat} [lonlat] - 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @example
 * // sectorStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <ShapeParametersSector.style> 。
 * // sectorStyleByCodomain 数组形如：
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
 * @param {Object} [sectorHoverStyle=true] - 环状图扇形 hover 状态时的样式，sectorHoverAble 为 true 时有效。
 * @param {boolean} [sectorHoverAble=true] - 是否允许环状图扇形使用 hover 状态。同时设置 sectorHoverAble 和 sectorClickAble 为 false，可以直接屏蔽环状图扇形对专题图层事件的响应。
 * @param {boolean} [sectorClickAble=true] - 是否允许环状图扇形被点击。同时设置 sectorHoverAble 和 sectorClickAble 为 false，可以直接屏蔽环状图扇形对专题图层事件的响应。
 *
 * @extends FeatureThemeGraph
 * @usage
 * @private
 */
export class Ring extends Graph {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "SuperMap.Feature.Theme.Ring";
    }

    /**
     * @function FeatureThemeRing.prototype.destroy
     * @description 销毁此专题要素。调用 destroy 后此对象所以属性置为 null。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FeatureThemeRing.prototype.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        // 一个默认 style 组
        var defaultStyleGroup = [
            {fillColor: "#ff9277"}, {fillColor: "#dddd00"}, {fillColor: "#ffc877"}, {fillColor: "#bbe3ff"}, {fillColor: "#d5ffbb"},
            {fillColor: "#bbbbff"}, {fillColor: "#ddb000"}, {fillColor: "#b0dd00"}, {fillColor: "#e2bbff"}, {fillColor: "#ffbbe3"},
            {fillColor: "#ff7777"}, {fillColor: "#ff9900"}, {fillColor: "#83dd00"}, {fillColor: "#77e3ff"}, {fillColor: "#778fff"},
            {fillColor: "#c877ff"}, {fillColor: "#ff77ab"}, {fillColor: "#ff6600"}, {fillColor: "#aa8800"}, {fillColor: "#77c7ff"},
            {fillColor: "#ad77ff"}, {fillColor: "#ff77ff"}, {fillColor: "#dd0083"}, {fillColor: "#777700"}, {fillColor: "#00aa00"},
            {fillColor: "#0088aa"}, {fillColor: "#8400dd"}, {fillColor: "#aa0088"}, {fillColor: "#dd0000"}, {fillColor: "#772e00"}
        ];

        // 图表配置对象
        var sets = this.setting;

        // 背景框，默认不启用
        if (sets.useBackground) {
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        // 数据值数组
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 值域范围
        var codomain = this.DVBCodomain;
        // 值域范围检测
        for (let i = 0; i < fv.length; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        // 值的绝对值总和
        var valueSum = 0;
        for (let i = 0; i < fv.length; i++) {
            valueSum += Math.abs(fv[i]);
        }

        // 重要步骤：定义图表 FeatureThemeRing 数据视图框中单位值的含义，单位值：每度代表的数值
        this.DVBUnitValue = 360 / valueSum;
        var uv = this.DVBUnitValue;

        var dvbCenter = this.DVBCenterPoint;        // 数据视图框中心作为扇心

        var startAngle = 0;         // 扇形起始边角度
        var endAngle = 0;          // 扇形终止边角度
        var startAngleTmp = startAngle;           // 扇形临时起始边角度
        // 扇形外环（自适应）半径
        var r = this.DVBHeight < this.DVBWidth ? this.DVBHeight / 2 : this.DVBWidth / 2;

        // 扇形内环（自适应）半径
        var isInRange = sets.innerRingRadius >= 0 && sets.innerRingRadius < r;
        var r0 = (
            typeof(sets.innerRingRadius) !== "undefined"
            && !isNaN(sets.innerRingRadius)
            && isInRange
        ) ? sets.innerRingRadius : 0;

        for (var i = 0; i < fv.length; i++) {
            var fvi = Math.abs(fv[i]);

            // 计算结束角度
            if (i === 0) {
                endAngle = startAngle + fvi * uv;
            } else if (i === fvi.length - 1) {
                endAngle = startAngleTmp;
            } else {
                endAngle = startAngle + fvi * uv;
            }

            // 扇形参数对象
            var sectorSP = new Sector(dvbCenter[0], dvbCenter[1], r, startAngle, endAngle, r0);
            // 扇形样式
            if (typeof(sets.sectorStyleByFields) === "undefined") {
                // 使用默认 style 组
                var colorIndex = i % defaultStyleGroup.length;
                sectorSP.style = ShapeFactory.ShapeStyleTool(null, sets.sectorStyle, defaultStyleGroup, null, colorIndex);
            } else {
                sectorSP.style = ShapeFactory.ShapeStyleTool(null, sets.sectorStyle, sets.sectorStyleByFields, sets.sectorStyleByCodomain, i, fv[i]);
            }
            // 扇形 hover 样式
            sectorSP.highlightStyle = ShapeFactory.ShapeStyleTool(null, sets.sectorHoverStyle);
            // 扇形 hover 与 click 设置
            if (typeof(sets.sectorHoverAble) !== "undefined") {
                sectorSP.hoverable = sets.sectorHoverAble;
            }
            if (typeof(sets.sectorClickAble) !== "undefined") {
                sectorSP.clickable = sets.sectorClickAble;
            }
            // 图形携带的数据信息
            sectorSP.refDataID = this.data.id;
            sectorSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 创建扇形并把此扇形添加到图表图形数组
            this.shapes.push(this.shapeFactory.createShape(sectorSP));

            // 把上一次的结束角度作为下一次的起始角度
            startAngle = endAngle;
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

}
