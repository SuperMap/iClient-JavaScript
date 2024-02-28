/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Theme} from './feature/Theme';
import {Circle as RenderCircle} from './feature/Circle';
import {ShapeFactory} from './feature/ShapeFactory';
import {RankSymbol} from './RankSymbol';

/**
 * @class FeatureThemeCircle
 * @aliasclass Feature.Theme.Circle
 * @deprecatedclass SuperMap.Feature.Theme.Circle
 * @classdesc 圆类。
 * @category Visualization Theme
 * @extends FeatureThemeRankSymbol
 * @param {FeatureVector} data - 用户数据。
 * @param {SuperMap.Layer.RankSymbol} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 中的参与此图表生成的字段名称。
 * @param {FeatureThemeCircle.setting} setting - 图表配置对象。
 * @param {LonLat} [lonlat] - 专题要素地理位置，默认为 data 指代的地理要素 Bounds 中心。
 * @usage
 * @private
 */
export class Circle extends RankSymbol {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "SuperMap.Feature.Theme.Circle";
    }

    /**
     * @function FeatureThemeCircle.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FeatureThemeCircle.prototype.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        //默认填充颜色
        var defaultFillColor = "#ff9277";

        // setting 属性是否已成功赋值
        if (!this.setting) {
            return false;
        }
        var sets = this.setting;
        // 检测 setting 的必设参数
        if (!(sets.codomain)) {
            return false;
        }

        // 数据
        var decimalNumber = (typeof(sets.decimalNumber) !== "undefined" && !isNaN(sets.decimalNumber)) ? sets.decimalNumber : -1;
        var dataEffective = Theme.getDataValues(this.data, this.fields, decimalNumber);
        this.dataValues = dataEffective ? dataEffective : [];

        // 数据值数组
        var fv = this.dataValues;
        //if(fv.length != 1) return;       // 没有数据 或者数据不唯一
        //if(fv[0] < 0) return;            //数据为负值

        //用户应该定义最大 最小半径  默认最大半径MaxR:100 最小半径MinR:0;
        if (!sets.maxR) {
            sets.maxR = 100;
        }
        if (!sets.minR) {
            sets.minR = 0;
        }

        // 值域范围
        var codomain = this.DVBCodomain;

        // 重要步骤：定义Circle数据视图框中单位值的含义，单位值：1所代表的长度
        // 用户定义了值域范围
        if (codomain && codomain[1] - codomain[0] > 0) {
            this.DVBUnitValue = sets.maxR / (codomain[1] - codomain[0]);
        } else {
            //this.DVBUnitValue = sets.maxR / maxValue;
            this.DVBUnitValue = sets.maxR;
        }

        var uv = this.DVBUnitValue;
        //圆半径
        var r = fv[0] * uv + sets.minR;
        this.width = 2 * r;
        this.height = 2 * r;

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        //假如用户设置了值域范围 没有在值域范围直接返回
        if (codomain) {
            if (fv[0] < codomain[0] || fv[0] > codomain[1]) {
                return;
            }
        }

        var dvbCenter = this.DVBCenterPoint;        // 数据视图框中心作为圆心

        //圆形对象参数
        var circleSP = new RenderCircle(dvbCenter[0], dvbCenter[1], r);

        //circleSP.sytle 初始化
        circleSP.style = ShapeFactory.ShapeStyleTool(null, sets.circleStyle, null, null, 0);
        //图形的填充颜色
        if (typeof (sets.fillColor) !== "undefined") {
            //用户自定义
            circleSP.style.fillColor = sets.fillColor;
        } else {
            //当前默认
            circleSP.style.fillColor = defaultFillColor;
        }
        //圆形 Hover样式
        circleSP.highlightStyle = ShapeFactory.ShapeStyleTool(null, sets.circleHoverStyle);
        //圆形 Hover 与 click 设置
        if (typeof(sets.circleHoverAble) !== "undefined") {
            circleSP.hoverable = sets.circleHoverAble;
        }
        if (typeof(sets.circleClickAble) !== "undefined") {
            circleSP.clickable = sets.circleClickAble;
        }

        //图形携带的数据信息
        circleSP.refDataID = this.data.id;
        circleSP.dataInfo = {
            field: this.fields[0],
            r: r,
            value: fv[0]
        };

        // 创建扇形并把此扇形添加到图表图形数组
        this.shapes.push(this.shapeFactory.createShape(circleSP));

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

}
