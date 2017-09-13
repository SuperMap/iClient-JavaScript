import SuperMap from '../SuperMap';
import Feature from './Feature';
import {Util} from './Util';

// TRASH THIS
SuperMap.State = {
    /** states */
    UNKNOWN: 'Unknown',
    INSERT: 'Insert',
    UPDATE: 'Update',
    DELETE: 'Delete'
};

/**
 * @class SuperMap.Feature.Vector
 * @classdesc 矢量要素类。该类具有 Geometry 属性存放几何信息，attributes 属性存放非几何信息，另外还包含了 style 属性，
 *             用来定义矢量要素的样式，其中，默认的样式在 <SuperMap.Feature.Vector.style> 类中定义，如果没有特别的指定将使用默认的样式。
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
export default class Vector extends Feature {

    /**
     * @member SuperMap.Feature.Vector.prototype.fid - {string}
     * @description fid
     */
    fid = null;

    /**
     * @member SuperMap.Feature.Vector.prototype.geometry - {SuperMap.Geometry}
     * @description 该属性用于存放几何信息。
     */
    geometry = null;

    /**
     * @member SuperMap.Feature.Vector.prototype.attributes - {Object}
     * @description 描述要素的任意的可序列化属性。
     */
    attributes = null;

    /**
     * @member SuperMap.Feature.Vector.prototype.bounds - {SuperMap.Bounds}
     * @description 要素的Bounds范围。
     */
    bounds = null;

    /**
     * @member SuperMap.Feature.Vector.prototype.state - {string}
     * @description state
     */
    state = null;

    /**
     * @member SuperMap.Feature.Vector.prototype.style - {Object}
     * @description 要素的样式属性，地图查询返回的feature的style，8C变为null。
     */
    style = null;

    /**
     * @member SuperMap.Feature.Vector.prototype.url - {string}
     * @description 如果设置了这个属性，在更新或者删除要素时需要考虑 <SuperMap.HTTP> 。
     */
    url = null;

    /**
     * @member SuperMap.Feature.Vector.prototype.renderIntent - {string}
     * @description Feature要素即被被渲染的样式状态，对应StyleMap中的状态定义的可选值。
     */
    renderIntent = "default";

    /**
     * @member SuperMap.Feature.Vector.prototype.modified - {Object}
     * @description 一个具有可以被改变的原始几何形状和属性，被 <SuperMap.Control.ModifyFeature> 写入。
     * 应用程序可以在attributes中设置原始的能被修改的属性，需要注意的是，应用程序需要在使用某个对象及其属
     * 性前检测这个对象及其 attributes 属性是否创建，用 ModifyFeature改变之后，这个对象如下所示：
     * @example
     * {
     *     geometry: Object
     * }
     *
     * 当应用程序需要对要素的 attributes 进行修改，则需要如下设置 attributes：
     * @example
     * {
     *     attributes: {
     *         myAttribute: "original"
     *     }
     * }
     */
    modified = null;

    constructor(geometry, attributes, style) {
        super(null, null, attributes);
        this.lonlat = null;
        this.geometry = geometry ? geometry : null;
        this.state = null;
        this.attributes = {};
        if (attributes) {
            this.attributes = Util.extend(this.attributes, attributes);
        }
        this.style = style ? style : null;
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.destroy
     * @description 释放相关资源。
     */
    destroy() {
        if (this.layer) {
            this.layer.removeFeatures(this);
            this.layer = null;
        }

        this.geometry = null;
        this.modified = null;
        super.destroy();
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.clone
     * @description 克隆对象。
     * @returns {SuperMap.Feature.Vector} 克隆的SuperMap.Feature.Vector对象。
     */
    clone() {
        return new Vector(
            this.geometry ? this.geometry.clone() : null,
            this.attributes,
            this.style);
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.onScreen
     * @description 判断要素是否在地图视图范围内。
     * @param boundsOnly - {boolean} 要素的bounds范围是否与地图的视图范围相交。
     * @returns {boolean} 要素是否在地图视图范围内。
     */
    onScreen(boundsOnly) {
        var onScreen = false;
        if (this.layer && this.layer.map) {
            var screenBounds = this.layer.map.getExtent();
            if (boundsOnly) {
                var featureBounds = this.geometry.getBounds();
                onScreen = screenBounds.intersectsBounds(featureBounds);
            } else {
                var screenPoly = screenBounds.toGeometry();
                onScreen = screenPoly.intersects(this.geometry);
            }
        }
        return onScreen;
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.getVisibility
     * @description 判断要素是否可见。
     * @returns {boolean} 要素是否可见。
     */
    getVisibility() {
        return !(this.style && this.style.display === 'none' ||
            !this.layer ||
            this.layer && this.layer.styleMap &&
            this.layer.styleMap.createSymbolizer(this, this.renderIntent).display === 'none' ||
            this.layer && !this.layer.getVisibility());
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.createMarker
     * @description HACK - 需要判断是否所有的矢量要素能创建标记。
     * @returns {SuperMap.Marker} 当前返回null。
     */
    createMarker() {
        return null;
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.destroyMarker
     * @description HACK - 需要判断是否所有的矢量要素能销毁标记。当前不做任何操作。
     */
    destroyMarker() {
        // pass
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.createPopup
     * @description HACK - 需要判断是否所有的矢量要素能创建弹出窗口。
     * @returns {SuperMap.Popup} 当前返回null。
     */
    createPopup() {
        return null;
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.atPoint
     * @description 判断是否要素与制定的位置点相交。
     * @param lonlat - {SuperMap.LonLat}
     * @param toleranceLon - {float} 经度。
     * @param toleranceLat - {float} 维度。
     * @returns {boolean} 是否要素与制定的位置点相交。
     */
    atPoint(lonlat, toleranceLon, toleranceLat) {
        var atPoint = false;
        if (this.geometry) {
            atPoint = this.geometry.atPoint(lonlat, toleranceLon,
                toleranceLat);
        }
        return atPoint;
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.destroyPopup
     * @description HACK - 需要判断是否所有的矢量要素能销毁弹出窗口。
     */
    destroyPopup() {
        // pass
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.move
     * @description 移动要素并在新位置重绘要素。
     * @param location - {SuperMap.LonLat|SuperMap.Pixel} 移动到的新位置点。
     */
    move(location) {

        if (!this.layer || !this.geometry.move) {
            //do nothing if no layer or immoveable geometry
            return undefined;
        }

        var pixel;
        if (location.CLASS_NAME === "SuperMap.LonLat") {
            pixel = this.layer.getViewPortPxFromLonLat(location);
        } else {
            pixel = location;
        }

        var lastPixel = this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat());
        var res = this.layer.map.getResolution();
        this.geometry.move(res * (pixel.x - lastPixel.x),
            res * (lastPixel.y - pixel.y));
        this.layer.drawFeature(this);
        return lastPixel;
    }

    /**
     * @function SuperMap.Feature.Vector.prototype.toState
     * @description 设置新状态。
     * @param state - {string} 状态。
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

    /**
     * @member SuperMap.Feature.Vector.style
     * @description SuperMap.features有大量的样式属性，如果没有特别的指定将使用默认的样式，大部分样式通过SVG标准定义属性。
     * - fill properties资料介绍: {@link http://www.w3.org/TR/SVG/painting.html#FillProperties}
     * - stroke properties资料介绍: {@link http://www.w3.org/TR/SVG/painting.html#StrokeProperties}
     *
     *  fill - {boolean} 不需要填充则设置为false。<br>
     *  fillColor - {string} 十六进制填充颜色，默认为"#ee9900"。<br>
     *  fillOpacity - {number} 填充不透明度。默认为0.4。<br>
     *  stroke - {boolean} 不需要描边则设为false。<br>
     *  strokeColor - {string} 十六进制描边颜色。<br>
     *  strokeOpacity - {number} 描边的不透明度(0-1),默认为0.4。<br>
     *  strokeWidth - {number} 像素描边宽度，默认为1。<br>
     *  strokeLinecap - {string} strokeLinecap有三种类型butt，round，square，默认为"round"。<br>
     *  strokeDashstyle - {string} 有dot,dash,dashot,longdash,longdashdot,solid几种样式，默认为"solid"。<br>
     *  graphic - {boolean} 不需要则设置为false。<br>
     *  pointRadius - {number} 像素点半径，默认为6。<br>
     *  pointerEvents - {string}  默认为"visiblePainted"。<br>
     *  cursor - {string} 默认为""。<br>
     *  allowRotate -{string} 是否允许图标随着运行方向旋转，默认为false。用于时空数据图层。<br>
     *  externalGraphic - {string} 连接到用来渲染点的外部的图形。<br>
     *  graphicWidth - {number} 外部图表的像素宽度。<br>
     *  graphicHeight - {number} 外部图表的高宽度。<br>
     *  graphicOpacity - {number} 外部图表的不透明度(0-1)。<br>
     *  graphicXOffset - {number} 外部图表沿着x方向的偏移量。<br>
     *  graphicYOffset - {number} 外部图表沿着y方向的偏移量Pixel。<br>
     *  rotation - {number} 一个图表沿着其中心点（或者偏移中心指定点）在顺时针方向旋转。<br>
     *  graphicZIndex - {number} 渲染时使用的索引值。The integer z-index value to use in rendering。<br>
     *  graphicName - {string} 渲染点时图标使用的名字。支持"circle" , "square", "star", "x", "cross", "triangle"。默认为"circle"。<br>
     *  graphicTitle - {string} 外部图表的提示框。<br>
     *  backgroundGraphic - {string} 外部图表的背景。<br>
     *  backgroundGraphicZIndex - {number} 背景图渲染时使用的索引值。<br>
     *  backgroundXOffset - {number} 背景图在x轴的偏移量。<br>
     *  backgroundYOffset - {number} 背景图在x轴的偏移量。<br>
     *  backgroundHeight - {number} 背景图的高度。如果没有设置，将用graphicHeight。<br>
     *  backgroundWidth - {number} 背景图的宽度。如果没有设置，将用graphicWidth。<br>
     *  isUnicode - {boolean} 这个属性要配合label属性来用，当为true时，label就可以使用unicode编码，比如"a"的unicode十六进制编码为61，则label属性可以为"&#x61;",其中"&#"为前缀，标志这个为unicode编码，
     *  "x"是指16进制,这时页面显示的是"a"；当此值为false的时候，label的内容会被直接输出，比如，label为"&#x61;"，这时页面显示的也是"&#x61;"。默认为false。<br>
     *  label - {string} 可选的标签文本。<br>
     *  labelAlign - {string} 标签对齐，是由两个字符组成的字符串，如："lt", "cm", "rb"，其中第一个字符代表水平方向上的对齐，"l"=left, "c"=center, "r"=right；第二个字符代表垂直方向上的对齐，"t"=top, "m"=middle, "b"=bottom。<br>
     *  labelXOffset - {number} 标签在x轴方向的偏移量。<br>
     *  labelYOffset - {number} 标签在y轴方向的偏移量。<br>
     *  labelSelect - {boolean} 如果设为true，标签可以选用SelectFeature或者similar控件，默认为false。<br>
     *  fontColor - {string} 标签字体颜色。<br>
     *  fontOpacity - {number} 标签透明度 (0-1)。<br>
     *  fontFamily - {string} 标签的字体类型。<br>
     *  fontSize - {string} 标签的字体大小。<br>
     *  fontStyle - {string} 标签的字体样式。<br>
     *  fontWeight - {string} 标签的字体粗细。<br>
     *  display - {string} 如果display属性设置为"none"，符号将没有任何效果。
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
    static style = {
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

    CLASS_NAME = "SuperMap.Feature.Vector"
}
SuperMap.Feature.Vector = Vector;


