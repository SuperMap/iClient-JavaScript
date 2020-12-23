/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {Point} from './Point';
import {Line} from './Line';
import {Polygon} from './Polygon';
import {Rectangle} from './Rectangle';
import {Sector} from './Sector';
import {Label} from './Label';
import {Image} from './Image';
import {Circle} from './Circle';
import {SmicPoint} from '../levelRenderer/SmicPoint';
import {SmicText} from '../levelRenderer/SmicText';
import {SmicCircle} from '../levelRenderer/SmicCircle';
import {SmicBrokenLine} from '../levelRenderer/SmicBrokenLine';
import {SmicImage} from '../levelRenderer/SmicImage';
import {SmicPolygon} from '../levelRenderer/SmicPolygon';
import {SmicRectangle} from '../levelRenderer/SmicRectangle';
import {SmicSector} from '../levelRenderer/SmicSector';
import {Util} from '../../commontypes/Util';

/**
 * @class  SuperMap.Feature.ShapeFactory
 * @category Visualization Theme
 * @classdesc 图形工厂类。
 * 目前支持创建的图形有：<br>
 * 用于统计专题图：<br>
 * 点 - 参数对象 <{@link SuperMap.Feature.ShapeParameters.Point}> <br>
 * 线 - 参数对象 <{@link SuperMap.Feature.ShapeParameters.Line}> <br>
 * 面 - 参数对象 <{@link SuperMap.Feature.ShapeParameters.Polygon}> <br>
 * 矩形 - 参数对象 <{@link SuperMap.Feature.ShapeParameters.Rectangle}> <br>
 * 扇形 - 参数对象 <{@link SuperMap.Feature.ShapeParameters.Sector}> <br>
 * 标签 - 参数对象 <{@link SuperMap.Feature.ShapeParameters.Label}> <br>
 * 图片 - 参数对象 <{@link SuperMap.Feature.ShapeParameters.Image}> <br>
 * 用于符号专题图：<br>
 * 圆形 -  参数对象：<{@link SuperMap.Feature.ShapeParameters.Cilcle}>
 */
export class ShapeFactory {



    /**
     * @function SuperMap.Feature.ShapeFactory.prototype.constructor
     * @description 构建图形工厂对象。
     * @param {Object} shapeParameters - 图形参数对象，<{@link SuperMap.Feature.ShapeParameters}> 子类对象，可选参数。
     * @returns {SuperMap.Feature.ShapeFactory} 返回图形工厂类对象。
     */
    constructor(shapeParameters) {
        /**
         * @member {Object} SuperMap.Feature.ShapeParameters.prototype.shapeParameters
         * @description  图形参数对象，<{@link SuperMap.Feature.ShapeParameters}> 子类对象。必设参数，默认值 null。
         */
        this.shapeParameters = shapeParameters;

        this.CLASS_NAME = "SuperMap.Feature.ShapeFactory";
    }

    
    /**
     * @function  SuperMap.Feature.ShapeParameters.prototype.destroy
     * @description 销毁图形工厂类对象。
     */
    destroy() {
        this.shapeParameters = null;
    }

    
    /**
     * @function  SuperMap.Feature.ShapeParameters.prototype.createShape
     * @description 创建一个图形。具体图形由 shapeParameters 决定。
     * @param {Object} shapeParameters - 图形参数对象，<{@link SuperMap.Feature.ShapeParameters}> 子类对象。
     * 此参数可选，如果使用此参数（不为 null），shapeParameters 属性值将被修改为参数的值，然后再使用 shapeParameters 属性值创建图形；
     * 如果不使用此参数，createShape 方法将直接使用 shapeParameters 属性创建图形。
     * @returns {Object} 图形对象（或 null - 图形创建失败）。
     */
    createShape(shapeParameters) {
        if (shapeParameters) {
            this.shapeParameters = shapeParameters;
        }

        if (!this.shapeParameters) {
            return null;
        }

        var sps = this.shapeParameters;


        if (sps instanceof Point) {        // 点
            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["r"] = sps.r;

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y']);

            //创建图形
            let shape = new SmicPoint();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Line) {        // 线
            //检查参数 pointList 是否存在
            if (!sps.pointList) {
                return null;
            }

            // 设置style
            let style = new Object();
            style["pointList"] = sps.pointList;
            style = Util.copyAttributesWithClip(style, sps.style, ['pointList']);

            // 创建图形
            let shape = new SmicBrokenLine();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['pointList', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Polygon) {        // 面
            //检查参数 pointList 是否存在
            if (!sps.pointList) {
                return null;
            }

            //设置style
            let style = new Object();
            style["pointList"] = sps.pointList;
            style = Util.copyAttributesWithClip(style, sps.style, ['pointList']);

            //创建图形
            let shape = new SmicPolygon();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['pointList', 'style', "highlightStyle"]);

            return shape;
        } else if (sps instanceof Rectangle) {        // 矩形
            //检查参数 pointList 是否存在
            if (!sps.x && !sps.y & !sps.width & !sps.height) {
                return null;
            }

            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["width"] = sps.width;
            style["height"] = sps.height;

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'width', 'height']);

            //创建图形
            let shape = new SmicRectangle();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'width', 'height', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Sector) {        // 扇形
            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["r"] = sps.r;
            style["startAngle"] = sps.startAngle;
            style["endAngle"] = sps.endAngle;
            if (sps["r0"]) {
                style["r0"] = sps.r0
            }

            if (sps["clockWise"]) {
                style["clockWise"] = sps.clockWise
            }


            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'r', 'startAngle', 'endAngle', 'r0', 'endAngle']);

            //创建图形
            let shape = new SmicSector();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'r', 'startAngle', 'endAngle', 'r0', 'endAngle', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Label) {        // 标签
            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["text"] = sps.text;

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'text']);

            //创建图形
            let shape = new SmicText();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'text', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Image) {        // 图片
            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            if (sps["image"]) {
                style["image"] = sps.image;
            }
            if (sps["width"]) {
                style["width"] = sps.width;
            }
            if (sps["height"]) {
                style["height"] = sps.height;
            }
            if (sps["sx"]) {
                style["sx"] = sps.sx;
            }
            if (sps["sy"]) {
                style["sy"] = sps.sy;
            }
            if (sps["sWidth"]) {
                style["sWidth"] = sps.sWidth
            }
            if (sps["sHeight"]) {
                style["sHeight"] = sps.sHeight
            }

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'image', 'width', 'height', 'sx', 'sy', 'sWidth', 'sHeight']);

            //创建图形
            let shape = new SmicImage();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'image', 'width', 'height', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Circle) {       //圆形 用于符号专题图
            //设置stytle
            let style = new Object();
            style["x"] = sps.x;
            style["r"] = sps.r;
            style["y"] = sps.y;

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'r']);

            //创建图形
            let shape = new SmicCircle();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'r', 'style', 'highlightStyle', 'lineWidth', 'text', 'textPosition']);

            return shape;
        }

        return null
    }

    
    /**
     * @function  SuperMap.Feature.ShapeParameters.prototype.transformStyle
     * @description 将用户 feature.style (类 Svg style 标准) 的样式，转换为 levelRenderer 的样式标准（类 CSS-Canvas 样式）
     * @param {Object} style - 用户 style。
     * @returns {Object} 符合 levelRenderer 的 style。
     */
    static transformStyle(style) {
        var newStyle = {};

        //字体 ["font-style", "font-variant", "font-weight", "font-size / line-height", "font-family"];
        var fontStr = ["normal", "normal", "normal", "12", "arial,sans-serif"];

        //画笔类型 ["fill", "stroke"];
        var brushType = [true, false];

        for (var ss in style) {
            switch (ss) {
                case "fill":
                    brushType[0] = style[ss];
                    break;
                case "fillColor":
                    newStyle["color"] = style[ss];
                    break;
                case "stroke":
                    brushType[1] = style[ss];
                    break;
                case "strokeWidth":
                    newStyle["lineWidth"] = style[ss];
                    break;
                case "strokeLinecap":
                    newStyle["lineCap"] = style[ss];
                    break;
                case "strokeLineJoin":
                    newStyle["lineJoin"] = style[ss];
                    break;
                case "strokeDashstyle":
                    newStyle["lineType"] = style[ss];
                    break;
                case "pointRadius":
                    newStyle["r"] = style[ss];
                    break;
                case "label":
                    newStyle["text"] = style[ss];
                    break;
                case "labelRect":
                    newStyle["labelRect"] = style[ss];
                    break;
                case "fontColor":
                    newStyle["textColor"] = style[ss];
                    break;
                case "fontStyle":
                    fontStr[0] = style[ss];
                    break;
                case "fontVariant":
                    fontStr[1] = style[ss];
                    break;
                case "fontWeight":
                    fontStr[2] = style[ss];
                    break;
                case "fontSize":
                    var unit = "";
                    if (style[ss] && style[ss].toString().indexOf("px") < 0) {
                        unit = "px";
                    }
                    fontStr[3] = style[ss] + unit;
                    break;
                case "fontFamily":
                    fontStr[4] = style[ss];
                    break;
                case "fontOpacity":
                    newStyle["opacity"] = style[ss];
                    break;
                case "labelPosition":
                    newStyle["textPosition"] = style[ss];
                    break;
                case "labelAlign":
                    newStyle["textAlign"] = style[ss];
                    break;
                case "labelBaseline":
                    newStyle["textBaseline"] = style[ss];
                    break;
                case "labelRotation":
                    newStyle["textRotation"] = style[ss];
                    break;

                default:
                    newStyle[ss] = style[ss];
                    break;
            }
        }

        //拼接字体字符串
        newStyle["textFont"] = fontStr.join(" ");

        //画笔类型
        if (brushType[0] === true && brushType[1] === false) {
            newStyle["brushType"] = "fill";
        } else if (brushType[0] === false && brushType[1] === true) {
            newStyle["brushType"] = "stroke";
        } else if (brushType[0] === true && brushType[1] === true) {
            newStyle["brushType"] = "both";
        } else {
            newStyle["brushType"] = "fill";
        }

        //默认线宽 1
        if (newStyle["lineWidth"] == null) {
            newStyle["lineWidth"] = 1;
        }

        return newStyle;
    }

    /**
     * @function  SuperMap.Feature.ShapeParameters.prototype.Background
     * @description 创建一个矩形背景框图形对象。
     * @param {SuperMap.Feature.ShapeFactory} shapeFactory - 图形工厂对象，必设参数。
     * @param {Array.<number>} box - 框区域，长度为 4 的一维数组，像素坐标，[left, bottom, right, top]，必设参数。
     * @param {Object} setting - 图表配置参数，必设参数。本函数中图形配置对象 setting 可设属性：
     * @param {Object} setting.backgroundStyle - 背景样式，此样式对象对象可设属性：<SuperMap.Feature.ShapeParameters.Rectangle#style>。
     * @param {Array} [setting.backgroundRadius=[0,0,0,0]] - 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4，则 backgroundRadius 为 [r1、r2、r3、r4 ]。
     * @returns {Object} 背景框图形，一个可视化图形（矩形）对象。
     */
    static Background(shapeFactory, box, setting) {
        var sets = setting ? setting : {};

        // 背景框图形参数对象
        var bgSP = new Rectangle(box[0], box[3], Math.abs(box[2] - box[0]), Math.abs(box[3] - box[1]));

        // 默认样式
        bgSP.style = {
            fillColor: "#f3f3f3"
        };

        // 设置用户 style
        if (sets.backgroundStyle) {
            Util.copyAttributesWithClip(bgSP.style, sets.backgroundStyle);
        }

        // 设置背景框圆角参数
        if (sets.backgroundRadius) {
            bgSP.style["radius"] = sets.backgroundRadius;
        }

        // 禁止背景框响应事件
        bgSP.clickable = false;
        bgSP.hoverable = false;

        return shapeFactory.createShape(bgSP);
    }

    /**
     * @function  SuperMap.Feature.ShapeParameters.prototype.GraphAxis
     * @description 创建一个统计图表坐标轴图形对象组。
     * @param {SuperMap.Feature.ShapeFactory} shapeFactory - 图形工厂对象，必设参数。
     * @param {Array.<number>} dataViewBox - 统计图表模型的数据视图框，长度为 4 的一维数组，像素坐标，[left, bottom, right, top]，必设参数。
     * @param {Object} setting - 图表配置参数，必设参数。
     * @param {Object} setting.axisStyle - 坐标轴样式，此样式对象对象可设属性：<SuperMap.Feature.ShapeParameters.Line#style>。
     * @param {boolean} [setting.axisUseArrow=false] - 坐标轴是否使用箭头。
     * @param {number} [setting.axisYTick=0] - y 轴刻度数量，0表示不使用箭头。
     * @param {Array.<string>} setting.axisYLabels - y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。
     * @param {Object} setting.axisYLabelsStyle - y 轴上的标签组样式，此样式对象对象可设属性：<SuperMap.Feature.ShapeParameters.Label#style>。
     * @param {Array.<number>} [setting.axisYLabelsOffset=[0,0]] - y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正，默认值：0；数组第二项表示 y 轴标签组纵向上的偏移量，向下为正，默认值：0。
     * @param {Array.<string>} setting.axisXLabels - x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。
     * 标签排布规则：当标签数量与 xShapeInfo 中的属性 xPositions 数量相同（即标签个数与数据个数相等时）, 按照 xPositions 提供的位置在水平方向上排布标签，否则沿数据视图框下面条边等距排布标签。
     * @param {Object} setting.axisXLabelsStyle - x 轴上的标签组样式，此样式对象对象可设属性：<SuperMap.Feature.ShapeParameters.Label#style>。
     * @param {Array.<number>} [setting.axisXLabelsOffset=[0,0]] - x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正，默认值：0；数组第二项表示 x 轴标签组纵向上的偏移量，向下为正，默认值：0。
     * @param {boolean} setting.useXReferenceLine - 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。
     * @param {Object} setting.xReferenceLineStyle - 水平参考线样式，此样式对象对象可设属性：<SuperMap.Feature.ShapeParameters.Line#style>。
     * @param {number} [setting.axis3DParameter=0] - 3D 坐标轴参数，此属性值在大于等于 15 时有效。
     * @param {Object} xShapeInfo - X 方向上的图形信息对象，包含两个属性。
     * @param {Array.<number>} xShapeInfo.xPositions - 图形在 x 轴方向上的像素坐标值，是一个一维数组，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     * @param {number} xShapeInfo.width - 图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     * @returns {Array.<Object>} 统计图表坐标轴图形对象数组。
     */
    static GraphAxis(shapeFactory, dataViewBox, setting, xShapeInfo) {
        var dvb = dataViewBox;
        var sets = setting ? setting : {};

        // 参考线图形对象组
        var refLines = [];
        //坐标轴箭头对象组
        var arrows = [];
        // 是否使用参水平考线，默认不使用
        var isAddRefLine = sets.useXReferenceLine ? sets.useXReferenceLine : false;
        // y 轴上的刻度
        var axisytick = (sets.axisYTick && !isNaN(sets.axisYTick)) ? sets.axisYTick : 0;
        // 坐标轴节点数组
        var pois = [];
        //z 轴箭头数组
        var zArrowPois = [];
        // x,y 轴主干节点数组
        var xMainPois = [];
        if (axisytick == 0) {
            xMainPois.push([dvb[0], dvb[3] - 5]);
            xMainPois.push([dvb[0], dvb[1]]);

            // 3D 坐标轴  第三象限平分线
            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                let axis3DParameter = parseInt(sets.axis3DParameter);
                let axis3DPoi = [dvb[0] - axis3DParameter, dvb[1] + axis3DParameter];

                // 添加 3D 轴节点
                if (sets.axisUseArrow) {      // 添加 3D 轴箭头节点坐标
                    //箭头坐标
                    zArrowPois.push([axis3DPoi[0] + 1.5, axis3DPoi[1] - 7.5]);
                    zArrowPois.push([axis3DPoi[0] - 1, axis3DPoi[1] + 1]);
                    zArrowPois.push([axis3DPoi[0] + 7.5, axis3DPoi[1] - 1.5]);
                    //3D轴
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                } else {
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                }

                xMainPois.push([dvb[0], dvb[1]]);
            }
            xMainPois.push([dvb[2] + 5, dvb[1]]);
        } else {
            // 单位刻度长度
            var unitTick = Math.abs(dvb[1] - dvb[3]) / axisytick;
            // 刻度 y 坐标
            var thckY = dvb[3];

            xMainPois.push([dvb[0], thckY - 5]);

            for (var i = 0; i < axisytick; i++) {
                xMainPois.push([dvb[0], thckY]);
                xMainPois.push([dvb[0] - 5, thckY]);
                xMainPois.push([dvb[0], thckY]);

                // 参考线
                if (isAddRefLine) {
                    // 参考线参数对象
                    var refLineSP = new Line([
                        [dvb[0], thckY],
                        [dvb[2], thckY]
                    ]);
                    // 参考线默认样式对象
                    refLineSP.style = {
                        strokeColor: "#cfcfcf",
                        strokeLinecap: "butt",
                        strokeLineJoin: "round",
                        strokeWidth: 1
                    };
                    // 禁止事件
                    refLineSP.clickable = false;
                    refLineSP.hoverable = false;
                    // 用户style
                    if (sets.xReferenceLineStyle) {
                        Util.copyAttributesWithClip(refLineSP.style, sets.xReferenceLineStyle);
                    }
                    // 生成参考线图形对象
                    refLines.push(shapeFactory.createShape(refLineSP))
                }

                // y 刻度增量
                thckY += unitTick;
            }

            xMainPois.push([dvb[0], dvb[1]]);

            // 3D 坐标轴  第三象限平分线
            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                let axis3DParameter = parseInt(sets.axis3DParameter);
                let axis3DPoi = [dvb[0] - axis3DParameter, dvb[1] + axis3DParameter];

                /*
                 // 箭头计算过程
                 var axis3DPoiRef = [axis3DPoi[0] + 7, axis3DPoi[1] - 7];  // 7 是 10 为斜边 cos（45度）时邻边的值
                 var axis3DPoiLT = [axis3DPoiRef[0] - 4, axis3DPoiRef[1] - 4];
                 var axis3DPoiRB = [axis3DPoiRef[0] + 4, axis3DPoiRef[1] + 4];
                 if(sets.axisUseArrow){
                 xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                 xMainPois.push([axis3DPoiLT[0], axis3DPoiLT[1]]);
                 xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                 xMainPois.push([axis3DPoiRB[0], axis3DPoiRB[1]]);
                 xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                 }
                 else{
                 xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                 }
                 */

                // 添加 3D 轴节点
                if (sets.axisUseArrow) {      // 添加 3D 轴和箭头坐标
                    //箭头坐标
                    zArrowPois.push([axis3DPoi[0] + 1.5, axis3DPoi[1] - 7.5]);
                    zArrowPois.push([axis3DPoi[0] - 1, axis3DPoi[1] + 1]);
                    zArrowPois.push([axis3DPoi[0] + 7.5, axis3DPoi[1] - 1.5]);
                    //3D轴
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                } else {
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                }

                xMainPois.push([dvb[0], dvb[1]]);
            }

            xMainPois.push([dvb[2] + 5, dvb[1]]);
        }
        // 坐标轴箭头
        if (sets.axisUseArrow) {
            // x 轴箭头节点数组
            var xArrowPois = [
                [dvb[2] + 5, dvb[1] + 4],
                [dvb[2] + 13, dvb[1]],
                [dvb[2] + 5, dvb[1] - 4]
            ];

            // y 轴箭头节点数组
            var yArrowPois = [
                [dvb[0] - 4, dvb[3] - 5],
                [dvb[0], dvb[3] - 13],
                [dvb[0] + 4, dvb[3] - 5]
            ];

            //x轴箭头
            var xSP = new Polygon(xArrowPois);
            xSP.style = {fillColor: "#008acd"};
            Util.copyAttributesWithClip(xSP.style, sets.axisStyle);
            arrows.push(shapeFactory.createShape(xSP));

            //y轴箭头
            var ySP = new Polygon(yArrowPois);
            ySP.style = {fillColor: "#008acd"};
            Util.copyAttributesWithClip(ySP.style, sets.axisStyle);
            arrows.push(shapeFactory.createShape(ySP));

            // z轴箭头 坐标轴箭头是否要使用
            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                var zSP = new Polygon(zArrowPois);
                zSP.style = {fillColor: "#008acd"};
                Util.copyAttributesWithClip(zSP.style, sets.axisStyle);
                arrows.push(shapeFactory.createShape(zSP));
            }

        }
        //不带箭头的坐标轴
        pois = xMainPois;

        // 坐标轴参数对象
        var axisSP = new Line(pois);
        // 坐标轴默认style
        axisSP.style = {
            strokeLinecap: "butt",
            strokeLineJoin: "round",
            strokeColor: "#008acd",
            strokeWidth: 1
        };
        // 用户 style
        if (sets.axisStyle) {
            Util.copyAttributesWithClip(axisSP.style, sets.axisStyle);
        }
        // 禁止事件
        axisSP.clickable = false;
        axisSP.hoverable = false;
        // 创建坐标轴图形对象
        var axisMain = [shapeFactory.createShape(axisSP)];

        // Y 轴标签
        var yLabels = [];
        if (sets.axisYLabels && sets.axisYLabels.length && sets.axisYLabels.length > 0) {
            var axisYLabels = sets.axisYLabels;
            let len = axisYLabels.length;

            // 标签偏移量
            var ylOffset = [0, 0];
            if (sets.axisYLabelsOffset && sets.axisYLabelsOffset.length) {
                ylOffset = sets.axisYLabelsOffset;
            }

            if (len == 1) {
                // 标签参数对象
                let labelYSP = new Label(dvb[0] - 5 + ylOffset[0], dvb[3] + ylOffset[1], axisYLabels[0]);
                labelYSP.style = {
                    labelAlign: "right"
                };
                // 用户 style
                if (sets.axisYLabelsStyle) {
                    Util.copyAttributesWithClip(labelYSP.style, sets.axisYLabelsStyle);
                }
                // 禁止事件
                labelYSP.clickable = false;
                labelYSP.hoverable = false;
                // 制作标签
                yLabels.push(shapeFactory.createShape(labelYSP));
            } else {
                var labelY = dvb[3];
                // y 轴标签单位距离
                var yUnit = Math.abs(dvb[1] - dvb[3]) / (len - 1);

                for (var j = 0; j < len; j++) {
                    // 标签参数对象
                    let labelYSP = new Label(dvb[0] - 5 + ylOffset[0], labelY + ylOffset[1], axisYLabels[j]);
                    labelYSP.style = {
                        labelAlign: "right"
                    };
                    // 用户 style
                    if (sets.axisYLabelsStyle) {
                        Util.copyAttributesWithClip(labelYSP.style, sets.axisYLabelsStyle);
                    }
                    // 禁止事件
                    labelYSP.clickable = false;
                    labelYSP.hoverable = false;
                    // 制作标签
                    yLabels.push(shapeFactory.createShape(labelYSP));
                    // y 轴标签 y 方向增量
                    labelY += yUnit;
                }
            }
        }

        // X 轴标签
        var xLabels = [];
        if (sets.axisXLabels && sets.axisXLabels.length && sets.axisXLabels.length > 0) {
            let axisXLabels = sets.axisXLabels;
            let len = axisXLabels.length;

            // 标签偏移量
            let xlOffset = [0, 0];
            if (sets.axisXLabelsOffset && sets.axisXLabelsOffset.length) {
                xlOffset = sets.axisXLabelsOffset;
            }

            // 标签个数与数据字段个数相等等时，标签在 x 轴均匀排列
            if (xShapeInfo && xShapeInfo.xPositions && xShapeInfo.xPositions.length && xShapeInfo.xPositions.length == len) {
                let xsCenter = xShapeInfo.xPositions;
                for (let K = 0; K < len; K++) {
                    // 标签参数对象
                    let labelXSP = new Label(xsCenter[K] + xlOffset[0], dvb[1] + xlOffset[1], axisXLabels[K]);
                    // 默认 style
                    labelXSP.style = {
                        labelAlign: "center",
                        labelBaseline: "top"
                    };
                    // 用户 style
                    if (sets.axisXLabelsStyle) {
                        Util.copyAttributesWithClip(labelXSP.style, sets.axisXLabelsStyle);
                    }
                    // 禁止事件
                    labelXSP.clickable = false;
                    labelXSP.hoverable = false;
                    // 创建标签对象
                    xLabels.push(shapeFactory.createShape(labelXSP));
                }
            } else {
                if (len == 1) {
                    // 标签参数对象
                    let labelXSP = new Label(dvb[0] - 5 + xlOffset[0], dvb[1] + xlOffset[0], axisXLabels[0]);
                    // 默认 style
                    labelXSP.style = {
                        labelAlign: "center",
                        labelBaseline: "top"
                    };
                    // 用户 style
                    if (sets.axisXLabelsStyle) {
                        Util.copyAttributesWithClip(labelXSP.style, sets.axisXLabelsStyle);
                    }
                    // 禁止事件
                    labelXSP.clickable = false;
                    labelXSP.hoverable = false;
                    // 创建标签对象
                    xLabels.push(shapeFactory.createShape(labelXSP));
                } else {
                    let labelX = dvb[0];
                    // x 轴标签单位距离
                    let xUnit = Math.abs(dvb[2] - dvb[0]) / (len - 1);

                    for (let m = 0; m < len; m++) {
                        // 标签参数对象
                        let labelXSP = new Label(labelX + xlOffset[0], dvb[1] + xlOffset[1], axisXLabels[m]);
                        // 默认 style
                        labelXSP.style = {
                            labelAlign: "center",
                            labelBaseline: "top"
                        };
                        // 用户 style
                        if (sets.axisXLabelsStyle) {
                            Util.copyAttributesWithClip(labelXSP.style, sets.axisXLabelsStyle);
                        }
                        // 禁止事件
                        labelXSP.clickable = false;
                        labelXSP.hoverable = false;
                        // 创建标签对象
                        xLabels.push(shapeFactory.createShape(labelXSP));
                        // x 轴标签 x 方向增量
                        labelX += xUnit;
                    }
                }
            }
        }

        // 组装并返回构成坐标轴的图形
        return ((refLines.concat(axisMain)).concat(yLabels)).concat(xLabels).concat(arrows);
    }
    
    /**
     * @function  SuperMap.Feature.ShapeParameters.prototype.ShapeStyleTool
     * @description 一个图形 style 处理工具。此工具将指定的默认 style，通用 style，按 styleGroup 取得的 style 和按数据值 value 范围取得的 style 进行合并，得到图形最终的 style。
     * @param {Object} defaultStyle - 默认style，此样式对象可设属性根据图形类型参考 <{@link SuperMap.Feature.ShapeParameters}> 子类对象的 style 属性。
     * @param {Object} style - 图形对象基础 style，此参数控制图形的基础样式，可设属性根据图形类型参考 <{@link SuperMap.Feature.ShapeParameters}> 子类对象的 style 属性。优先级低于 styleGroup，styleByCodomain。
     * @param {Array.<Object>} styleGroup - 一个 style 数组，优先级低于 styleByCodomain，高于 style。此数组每个元素是样式对象，
     * 其可设属性根据图形类型参考 <{@link SuperMap.Feature.ShapeParameters}> 子类对象的 style 属性。通过 index 参数从 styleGroup 中取 style。
     * @param {Array.<Object>} styleByCodomain - 按数据（参数 value）所在值域范围控制数据的可视化对象样式。
     * (start code)
     * // styleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
     * // start: 值域值下限（包含）;
     * // end: 值域值上限（不包含）;
     * // style: 数据可视化图形的 style，其可设属性根据图形类型参考 <SuperMap.Feature.ShapeParameters> 子类对象的 style 属性。。
     * // dataStyleByCodomain 数组形如：
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
     * (end)
     * @param {number} index - styleGroup 的索引值，用于取出 styleGroup 指定的 style。
     * @param {number} value - 数据值，用于取出 styleByCodomain 指定的 style。
     * @returns {Object} 合并后的样式 （style） 对象。
     */
    static ShapeStyleTool(defaultStyle, style, styleGroup, styleByCodomain, index, value) {
        // 用 defaultStyle 初始化 style 对象
        var finalStyle = defaultStyle ? defaultStyle : {};

        // 基础 style
        if (style) {
            Util.copyAttributesWithClip(finalStyle, style);
        }

        // 按索引赋 style
        if (styleGroup && styleGroup.length && typeof(index) !== "undefined" && !isNaN(index) && index >= 0) {
            if (styleGroup[index]) {
                Util.copyAttributesWithClip(finalStyle, styleGroup[index]);
            }
        }

        // 按值域赋 style
        if (styleByCodomain && styleByCodomain.length && typeof(value) !== "undefined") {
            var dsc = styleByCodomain;
            var dscLen = dsc.length;
            var v = parseFloat(value);
            for (var i = 0; i < dscLen; i++) {
                if (dsc[i].start <= v && v < dsc[i].end) {
                    Util.copyAttributesWithClip(finalStyle, dsc[i].style);
                    break;
                }
            }
        }

        return finalStyle;
    }

}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeFactory = ShapeFactory;