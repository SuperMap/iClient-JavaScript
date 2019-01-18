/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Feature} from './Feature';
import {Util} from './Util';



/**
 * @class SuperMap.Feature.Vector
 * @category BaseTypes Geometry
 * @classdesc 矢量要素类。该类具有 Geometry 属性存放几何信息，
 * attributes 属性存放非几何信息，另外还包含了 style 属性，用来定义矢量要素的样式，
 * 其中，默认的样式在 {@link SuperMap.Feature.Vector.style} 类中定义，如果没有特别的指定将使用默认的样式。
 * @extends {SuperMap.Feature}
 * @param {SuperMap.Geometry} geometry - 代表要素的几何形状。
 * @param {Object} [attributes] - 描述要素的任意的可序列化属性，将要映射到 attributes 属性中的对象。
 * @param {Object} [style] - 样式对象。
 * @example
 * var geometry = new SuperMap.Geometry.Point(-115,10);
 *  var style = {
     *      strokeColor:"#339933",
     *      strokeOpacity:1,
     *      strokeWidth:3,
     *      pointRadius:6
     *  }
 *  var pointFeature = new SuperMap.Feature.Vector(geometry,null,style);
 *  vectorLayer.addFeatures(pointFeature);
 */
export class Vector extends Feature {


    constructor(geometry, attributes, style) {
        super(null, null, attributes);
        /**
         * @member {string} SuperMap.Feature.Vector.prototype.fid
         * @description fid
         */
        this.fid = null;

        /**
         * @member {SuperMap.Geometry} SuperMap.Feature.Vector.prototype.geometry
         * @description 该属性用于存放几何信息。
         */
        this.geometry = geometry ? geometry : null;

        /**
         * @member {Object} SuperMap.Feature.Vector.prototype.attributes
         * @description 描述要素的任意的可序列化属性。
         */
        this.attributes = {};

        if (attributes) {
            this.attributes = Util.extend(this.attributes, attributes);
        }

        /**
         * @member {SuperMap.Bounds} SuperMap.Feature.Vector.prototype.bounds
         * @description The box bounding that feature's geometry, that
         *     property can be set by an <SuperMap.Format> object when
         *     deserializing the feature, so in most cases it represents an
         *     information set by the server.
         */
        this.bounds = null;

        /**
         * @member {string} SuperMap.Feature.Vector.prototype.state
         * @description state
         */
        this.state = null;

        /**
         * @member {Object} SuperMap.Feature.Vector.prototype.style
         * @description 要素的样式属性，地图查询返回的 feature 的 style，8C 变为null。
         */
        this.style = style ? style : null;

        /**
         * @member {string} SuperMap.Feature.Vector.prototype.url 
         * @description 如果设置了这个属性，在更新或者删除要素时需要考虑 {@link SuperMap.HTTP} 。
         */
        this.url = null;

        this.lonlat = null;

        this.CLASS_NAME = "SuperMap.Feature.Vector";
        // TRASH THIS
        SuperMap.State = {
            /** states */
            UNKNOWN: 'Unknown',
            INSERT: 'Insert',
            UPDATE: 'Update',
            DELETE: 'Delete'
        };

        Vector.style = {
            'default': {
                fillColor: "#ee9900",
                fillOpacity: 0.4,
                hoverFillColor: "white",
                hoverFillOpacity: 0.8,
                strokeColor: "#ee9900",
                strokeOpacity: 1,
                strokeWidth: 1,
                strokeLinecap: "round",
                strokeDashstyle: "solid",
                hoverStrokeColor: "red",
                hoverStrokeOpacity: 1,
                hoverStrokeWidth: 0.2,
                pointRadius: 6,
                hoverPointRadius: 1,
                hoverPointUnit: "%",
                pointerEvents: "visiblePainted",
                cursor: "inherit",
                fontColor: "#000000",
                labelAlign: "cm",
                labelOutlineColor: "white",
                labelOutlineWidth: 3
            },
            'select': {
                fillColor: "blue",
                fillOpacity: 0.4,
                hoverFillColor: "white",
                hoverFillOpacity: 0.8,
                strokeColor: "blue",
                strokeOpacity: 1,
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeDashstyle: "solid",
                hoverStrokeColor: "red",
                hoverStrokeOpacity: 1,
                hoverStrokeWidth: 0.2,
                pointRadius: 6,
                hoverPointRadius: 1,
                hoverPointUnit: "%",
                pointerEvents: "visiblePainted",
                cursor: "pointer",
                fontColor: "#000000",
                labelAlign: "cm",
                labelOutlineColor: "white",
                labelOutlineWidth: 3

            },
            'temporary': {
                fillColor: "#66cccc",
                fillOpacity: 0.2,
                hoverFillColor: "white",
                hoverFillOpacity: 0.8,
                strokeColor: "#66cccc",
                strokeOpacity: 1,
                strokeLinecap: "round",
                strokeWidth: 2,
                strokeDashstyle: "solid",
                hoverStrokeColor: "red",
                hoverStrokeOpacity: 1,
                hoverStrokeWidth: 0.2,
                pointRadius: 6,
                hoverPointRadius: 1,
                hoverPointUnit: "%",
                pointerEvents: "visiblePainted",
                //cursor:"inherit",
                cursor: "default",
                fontColor: "#000000",
                labelAlign: "cm",
                labelOutlineColor: "white",
                labelOutlineWidth: 3

            },
            'delete': {
                display: "none"
            }
        };
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.destroy
     * @description nullify references to prevent circular references and memory leaks
     */
    destroy() {
        if (this.layer) {
            this.layer.removeFeatures(this);
            this.layer = null;
        }

        this.geometry = null;
        super.destroy();
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.clone
     * @description Create a clone of this vector feature.  Does not set any non-standard
     *     properties.
     * @returns {SuperMap.Feature.Vector} An exact clone of this vector feature.
     */
    clone() {
        return new Vector(
            this.geometry ? this.geometry.clone() : null,
            this.attributes,
            this.style);
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.toState
     * @description 设置新状态。
     * @param {string} state - 状态。
     */
    toState(state) {
        if (state === SuperMap.State.UPDATE) {
            switch (this.state) {
                case SuperMap.State.UNKNOWN:
                case SuperMap.State.DELETE:
                    this.state = state;
                    break;
                case SuperMap.State.UPDATE:
                case SuperMap.State.INSERT:
                    break;
            }
        } else if (state === SuperMap.State.INSERT) {
            switch (this.state) {
                case SuperMap.State.UNKNOWN:
                    break;
                default:
                    this.state = state;
                    break;
            }
        } else if (state === SuperMap.State.DELETE) {
            switch (this.state) {
                case SuperMap.State.INSERT:
                    // the feature should be destroyed
                    break;
                case SuperMap.State.DELETE:
                    break;
                case SuperMap.State.UNKNOWN:
                case SuperMap.State.UPDATE:
                    this.state = state;
                    break;
            }
        } else if (state === SuperMap.State.UNKNOWN) {
            this.state = state;
        }
    }
}
/**
 *
 * @typedef {Object} SuperMap.Feature.Vector.style
 * @description SuperMap.features 有大量的样式属性，如果没有特别的指定将使用默认的样式，
 * 大部分样式通过 SVG 标准定义属性。
 * - fill properties 资料介绍：{@link http://www.w3.org/TR/SVG/painting.html#FillProperties}
 * - stroke properties 资料介绍：{@link http://www.w3.org/TR/SVG/painting.html#StrokeProperties}
 * @property {boolean} [fill] - 不需要填充则设置为 false。
 * @property {string} [fillColor='#ee9900'] - 十六进制填充颜色。
 * @property {number} [fillOpacity=0.4] - 填充不透明度。
 * @property {boolean} [stroke] - 不需要描边则设为 false。
 * @property {string} [strokeColor='#ee9900'] - 十六进制描边颜色。
 * @property {number} [strokeOpacity=0.4] - 描边的不透明度(0-1)。
 * @property {number} [strokeWidth=1] - 像素描边宽度。
 * @property {string} [strokeLinecap='round'] - strokeLinecap 有三种类型 butt，round，square。
 * @property {string} [strokeDashstyle='solid'] - 有 dot，dash，dashdot，longdash，longdashdot，solid 几种样式。
 * @property {boolean} [graphic] - 不需要则设置为 false。
 * @property {number} [pointRadius=6] - 像素点半径。
 * @property {string} [pointerEvents='visiblePainted'] - pointerEvents。
 * @property {string} [cursor] - cursor。
 * @property {boolean} [allowRotate='false'] - 是否允许图标随着运行方向旋转。用于时空数据图层。
 * @property {string} [externalGraphic] - 连接到用来渲染点的外部的图形。
 * @property {number} [graphicWidth] - 外部图表的像素宽度。
 * @property {number} [graphicHeight] - 外部图表的高宽度。
 * @property {number} [graphicOpacity] - 外部图表的不透明度(0-1)。
 * @property {number} [graphicXOffset] - 外部图表沿着x方向的偏移量。
 * @property {number} [graphicYOffset] - 外部图表沿着y方向的偏移量 Pixel。
 * @property {number} [rotation] - 一个图表沿着其中心点（或者偏移中心指定点）在顺时针方向旋转。
 * @property {number} [graphicZIndex] - 渲染时使用的索引值。
 * @property {string} [graphicName='circle'] - 渲染点时图标使用的名字。支持"circle" , "square", "star", "x", "cross", "triangle"。
 * @property {string} [graphicTitle] - 外部图表的提示框。
 * @property {string} [backgroundGraphic] - 外部图表的背景。
 * @property {number} [backgroundGraphicZIndex] - 背景图渲染时使用的索引值。
 * @property {number} [backgroundXOffset] - 背景图在 x 轴的偏移量。
 * @property {number} [backgroundYOffset] - 背景图在 y 轴的偏移量。
 * @property {number} [backgroundHeight] - 背景图的高度。如果没有设置，将用 graphicHeight。
 * @property {number} [backgroundWidth] - 背景图的宽度。如果没有设置，将用 graphicWidth。
 * @property {boolean} [isUnicode=false] - 这个属性要配合 label 属性来用，当为 true时，label 就可以使用 unicode 编码，
 * 比如 "a" 的 unicode 十六进制编码为 61，则 label 属性可以为 "&#x61;",其中 "&#" 为前缀，标志这个为 unicode 编码，
 * "x" 是指 16 进制,这时页面显示的是 "a"；当此值为 false 的时候，label 的内容会被直接输出，
 * 比如，label 为 "&#x61;"，这时页面显示的也是 "&#x61;"。
 * @property {string} [label] - 可选的标签文本。
 * @property {string} [labelAlign='cm'] - 标签对齐，是由两个字符组成的字符串，如："lt", "cm", "rb"，
 * 其中第一个字符代表水平方向上的对齐，"l"=left, "c"=center, "r"=right；
 * 第二个字符代表垂直方向上的对齐，"t"=top, "m"=middle, "b"=bottom。
 * @property {number} [labelXOffset] - 标签在 x 轴方向的偏移量。
 * @property {number} [labelYOffset] - 标签在 y 轴方向的偏移量。
 * @property {boolean} [labelSelect=false] - 如果设为 true，标签可以选用 SelectFeature 或者 similar 控件。
 * @property {string} [fontColor='#000000'] - 标签字体颜色。
 * @property {number} [fontOpacity] - 标签透明度 (0-1)。
 * @property {string} [fontFamily] - 标签的字体类型。
 * @property {string} [fontSize] - 标签的字体大小。
 * @property {string} [fontStyle] - 标签的字体样式。
 * @property {string} [fontWeight] - 标签的字体粗细。
 * @property {string} [display] - 如果 display 属性设置为 “none”，符号将没有任何效果。
 * @example
 *  // label的用法如下：
 *  function addGeoTest(){
 *  var geometry = new SuperMap.Geometry.Point(105, 35);
 *  var pointFeature = new SuperMap.Feature.Vector(geometry);
 *  var styleTest = {
 *        label:"supermap",
 *        fontColor:"#0000ff",
 *        fontOpacity:"0.5",
 *        fontFamily:"隶书",
 *        fontSize:"8em",
 *        fontWeight:"bold",
 *        fontStyle:"italic",
 *        labelSelect:"true",
 *     }
 *           pointFeature.style = styleTest;
 *          vectorLayer.addFeatures([pointFeature]);
 * }
     */
SuperMap.Feature.Vector = Vector;


