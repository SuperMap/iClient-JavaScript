import {SuperMap} from '../SuperMap';
import {Feature} from './Feature';
import {Util} from './Util';



/**
 * @class SuperMap.Feature.Vector
 * @classdesc 矢量要素类。该类具有 Geometry 属性存放几何信息，
 * attributes 属性存放非几何信息，另外还包含了 style 属性，用来定义矢量要素的样式，
 * 其中，默认的样式在 <SuperMap.Feature.Vector.style> 类中定义，如果没有特别的指定将使用默认的样式，
 * @extends SuperMap.Feature
 * @param geometry - {SuperMap.Geometry} 代表要素的几何形状。
 * @param attributes - {Object} 描述要素的任意的可序列化属性，将要映射到 attributes 属性中的可选对象。
 * @param style - {Object} 一个可选的样式对象。
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
         * @member SuperMap.Feature.Vector.prototype.fid -{string}
         * @description fid
         */
        this.fid = null;

        /**
         * @member SuperMap.Feature.Vector.prototype.geometry -{SuperMap.Geometry}
         * @description 该属性用于存放几何信息。
         */
        this.geometry = geometry ? geometry : null;

        /**
         * @member SuperMap.Feature.Vector.prototype.attributes -{Object}
         * @description 描述要素的任意的可序列化属性。
         */
        this.attributes = {};

        if (attributes) {
            this.attributes = Util.extend(this.attributes, attributes);
        }

        /**
         * @member SuperMap.Feature.Vector.prototype.bounds -{SuperMap.Bounds}
         * @description The box bounding that feature's geometry, that
         *     property can be set by an <SuperMap.Format> object when
         *     deserializing the feature, so in most cases it represents an
         *     information set by the server.
         */
        this.bounds = null;

        /**
         * @member SuperMap.Feature.Vector.prototype.state -{string}
         * @description state
         */
        this.state = null;

        /**
         * @member SuperMap.Feature.Vector.prototype.style -{Object}
         * @description 要素的样式属性，地图查询返回的feature的style，8C变为null。
         */
        this.style = style ? style : null;

        /**
         * @member SuperMap.Feature.Vector.prototype.url -{string}
         * @description 如果设置了这个属性，在更新或者删除要素时需要考虑 <SuperMap.HTTP> 。
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

        /**
         *
         * @member SuperMap.Feature.Vector.style
         * @description SuperMap.features有大量的样式属性，如果没有特别的指定将使用默认的样式，
         * 大部分样式通过SVG标准定义属性。
         *
         * - fill properties资料介绍: {@link http://www.w3.org/TR/SVG/painting.html#FillProperties}
         * - stroke properties资料介绍: {@link http://www.w3.org/TR/SVG/painting.html#StrokeProperties}
         *
         * #### Symbolizer properties:
         * * fill - {Boolean} 不需要填充则设置为false。
         * * fillColor - {string} 十六进制填充颜色，默认为"#ee9900"。
         * * fillOpacity - {number} 填充不透明度。默认为0.4。
         * * stroke - {Boolean} 不需要描边则设为false。
         * * strokeColor - {string} 十六进制描边颜色。
         * * strokeOpacity - {number} 描边的不透明度(0-1),默认为0.4。
         * * strokeWidth - {number} 像素描边宽度，默认为1。
         * * strokeLinecap - {string} strokeLinecap有三种类型butt，round，square，默认为"round"。
         * * strokeDashstyle - {string} 有dot,dash,dashot,longdash,longdashdot,solid几种样式，默认为"solid"。
         * * graphic - {Boolean} 不需要则设置为false。
         * * pointRadius - {number} 像素点半径，默认为6
         * * pointerEvents - {string}  默认为"visiblePainted"。
         * * cursor - {string} 默认为""。
         * * allowRotate -{string} 是否允许图标随着运行方向旋转，默认为false。用于时空数据图层
         * * externalGraphic - {string} 连接到用来渲染点的外部的图形。
         * * graphicWidth - {number} 外部图表的像素宽度。
         * * graphicHeight - {number} 外部图表的高宽度。
         * * graphicOpacity - {number} 外部图表的不透明度(0-1)。
         * * graphicXOffset - {number} 外部图表沿着x方向的偏移量。
         * * graphicYOffset - {number} 外部图表沿着y方向的偏移量Pixel。
         * * rotation - {number} 一个图表沿着其中心点（或者偏移中心指定点）在顺时针方向旋转。
         * * graphicZIndex - {number} 渲染时使用的索引值。The integer z-index value to use in rendering。
         * * graphicName - {string} 渲染点时图标使用的名字。支持"circle" , "square", "star", "x", "cross", "triangle"，
         * 默认为"circle"。
         * * graphicTitle - {string} 外部图表的提示框。
         * * backgroundGraphic - {string} 外部图表的背景。
         * * backgroundGraphicZIndex - {number} 背景图渲染时使用的索引值。
         * * backgroundXOffset - {number} 背景图在x轴的偏移量。
         * * backgroundYOffset - {number} 背景图在x轴的偏移量。
         * * backgroundHeight - {number} 背景图的高度。如果没有设置，将用graphicHeight。
         * * backgroundWidth - {number} 背景图的宽度。如果没有设置，将用graphicWidth。
         * * isUnicode - {Boolean} 这个属性要配合label属性来用，当为true时，label就可以使用unicode编码，
         * 比如"a"的unicode十六进制编码为61，则label属性可以为"&#x61;",其中"&#"为前缀，标志这个为unicode编码，
         * "x"是指16进制,这时页面显示的是"a"；当此值为false的时候，label的内容会被直接输出，
         * 比如，label为"&#x61;"，这时页面显示的也是"&#x61;"。默认为false。
         * * label - {string} 可选的标签文本。
         * * labelAlign - {string} 标签对齐，是由两个字符组成的字符串，如："lt", "cm", "rb"，
         * 其中第一个字符代表水平方向上的对齐，"l"=left, "c"=center, "r"=right；
         * 第二个字符代表垂直方向上的对齐，"t"=top, "m"=middle, "b"=bottom。
         * * labelXOffset - {number} 标签在x轴方向的偏移量。
         * * labelYOffset - {number} 标签在y轴方向的偏移量。
         * * labelSelect - {Boolean} 如果设为true，标签可以选用SelectFeature或者similar控件，默认为false。
         * * fontColor - {string} 标签字体颜色。
         * * fontOpacity - {number} 标签透明度 (0-1)。
         * * fontFamily - {string} 标签的字体类型。
         * * fontSize - {string} 标签的字体大小。
         * * fontStyle - {string} 标签的字体样式。
         * * fontWeight - {string} 标签的字体粗细。
         * * display - {string} 如果display属性设置为“none”，符号将没有任何效果。
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
     * @description Sets the new state
     * @param state - {string}
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

SuperMap.Feature.Vector = Vector;


