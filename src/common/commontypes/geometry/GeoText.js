import SuperMap from '../../SuperMap';
import Geometry from '../Geometry';
import Point from './Point';
import LineString from './LineString';
import Bounds from '../Bounds';
import Pixel from '../Pixel';
import LonLat from '../LonLat';
import {Util} from '../Util';

/**
 * @class SuperMap.Geometry.GeoText
 * @classdesc 文本标签类。geometry 类型为 SuperMap.Geometry.GeoText 的要素在 Vector 中的展现由策略 {@link SuperMap.Strategy.GeoText} 控制。
 * @extends {SuperMap.Geometry}
 * @param x {float} x-坐标，必设参数。
 * @param y {float} y-坐标，必设参数。
 * @param text {string} 标签中的文本内容，必设参数。
 * @example
 * var geoText = new SuperMap.Geometry.GeoText(100, 35,"中华人民共和国");
 * var geotextFeature = new SuperMap.Feature.Vector(geoText);
 *
 * //新建一个策略并使用在矢量要素图层(vector)上。
 * var strategy = new SuperMap.Strategy.GeoText();
 * strategy.style = {
 *   fontColor:"#FF7F00",
 *   fontWeight:"bolder",
 *   fontSize:"14px",
 *   fill: true,
 *   fillColor: "#FFFFFF",
 *   fillOpacity: 1,
 *   stroke: true,
 *   strokeColor:"#8B7B8B"
 * };
 */
export default class GeoText extends Geometry {
    /**
     * @member SuperMap.Geometry.GeoText.prototype.x - {float}
     * @description 横坐标。
     */
    x = null;

    /**
     * @member SuperMap.Geometry.GeoText.prototype.y - {float}
     * @description 纵坐标。
     */
    y = null;

    /**
     * @member SuperMap.Geometry.GeoText.prototype.text - {string}
     * @description 标签中的文本内容。
     */
    text = null;

    /**
     * @member SuperMap.Geometry.GeoText.prototype.bsInfo - {Object}
     * @description 标签范围的基础信息，包含下面2个属性。
     *  * w: bounds 的宽；
     *  * h: bounds 的高度；

     */
    bsInfo = null;

    constructor(x, y, text) {
        super(x, y, text);

        this.bsInfo = {
            "h": null,
            "w": null
        };

        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.text = text.toString();
        this.element = document.createElement('span');
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.destroy
     * @description 销毁文本标签类。
     */
    destroy() {
        super.destroy();
        this.x = null;
        this.y = null;
        this.text = null;
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.getCentroid
     * @description 获取标签对象的质心。
     * @returns {SuperMap.Geometry.Point} 标签对象的质心。
     */
    getCentroid() {
        return new Point(this.x, this.y);
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.clone
     * @description 克隆标签对象。
     * @returns {SuperMap.Geometry.GeoText} 克隆后的标签对象。
     */
    clone(obj) {
        if (obj == null) {
            obj = new GeoText(this.x, this.y, this.text);
        }
        Util.applyDefaults(obj, this);
        return obj;
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.calculateBounds
     * @description 计算标签对象的范围。
     */
    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x, this.y);
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.getLabelPxBoundsByLabel
     * @description 根据绘制好的标签获取文字标签的像素范围，参数的单位是像素；此方法相对于 getLabelPxBoundsByText 效率较低，但支持所有格式的文本。
     * @param locationPixel - {Object} 标签的位置点，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * @param labelWidth - {string} 标签的宽度，如：“90px”。
     * @param labelHight - {string}  标签的高度。
     * @param style - {Object}  标签的style。
     * @returns {SuperMap.Bounds}  标签的像素范围。
     */
    getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHight, style) {
        var labelPxBounds, left, bottom, top, right;
        var locationPx = Util.cloneObject(locationPixel);

        //计算文本行数
        var theText = style.label || this.text;
        var textRows = theText.split('\n');
        var laberRows = textRows.length;

        //处理文字对齐
        labelWidth = parseFloat(labelWidth);
        labelHight = parseFloat(labelHight);
        if (laberRows > 1) {
            labelHight = parseFloat(labelHight) * laberRows;
        }
        if (style.labelAlign && style.labelAlign !== "cm") {
            switch (style.labelAlign) {
                case "lt":
                    locationPx.x += labelWidth / 2;
                    locationPx.y += labelHight / 2;
                    break;
                case "lm":
                    locationPx.x += labelWidth / 2;
                    break;
                case "lb":
                    locationPx.x += labelWidth / 2;
                    locationPx.y -= labelHight / 2;
                    break;
                case "ct":
                    locationPx.y += labelHight / 2;
                    break;
                case "cb":
                    locationPx.y -= labelHight / 2;
                    break;
                case "rt":
                    locationPx.x -= labelWidth / 2;
                    locationPx.y += labelHight / 2;
                    break;
                case "rm":
                    locationPx.x -= labelWidth / 2;
                    break;
                case "rb":
                    locationPx.x -= labelWidth / 2;
                    locationPx.y -= labelHight / 2;
                    break;
                default:
                    break;
            }
        }

        this.bsInfo.h = labelHight;
        this.bsInfo.w = labelWidth;

        //bounds的四边
        left = locationPx.x - parseFloat(labelWidth) / 2;
        bottom = locationPx.y + parseFloat(labelHight) / 2;
        right = locationPx.x + parseFloat(labelWidth) / 2;
        top = locationPx.y - parseFloat(labelHight) / 2;

        labelPxBounds = new Bounds(left, bottom, right, top);

        return labelPxBounds;
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.getLabelPxBoundsByText
     * @description 根据文本内容获取文字标签的像素范围。
     * @param locationPixel - {Object} 标签的位置点，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * @param style - {Object} 标签的样式
     * @returns {SuperMap.Bounds} 标签的像素范围。
     */
    getLabelPxBoundsByText(locationPixel, style) {
        var labelPxBounds, left, bottom, top, right;
        var labelSize = this.getLabelPxSize(style);
        var locationPx = Util.cloneObject(locationPixel);

        //处理文字对齐
        if (style.labelAlign && style.labelAlign !== "cm") {
            switch (style.labelAlign) {
                case "lt":
                    locationPx.x += labelSize.w / 2;
                    locationPx.y += labelSize.h / 2;
                    break;
                case "lm":
                    locationPx.x += labelSize.w / 2;
                    break;
                case "lb":
                    locationPx.x += labelSize.w / 2;
                    locationPx.y -= labelSize.h / 2;
                    break;
                case "ct":
                    locationPx.y += labelSize.h / 2;
                    break;
                case "cb":
                    locationPx.y -= labelSize.h / 2;
                    break;
                case "rt":
                    locationPx.x -= labelSize.w / 2;
                    locationPx.y += labelSize.h / 2;
                    break;
                case "rm":
                    locationPx.x -= labelSize.w / 2;
                    break;
                case "rb":
                    locationPx.x -= labelSize.w / 2;
                    locationPx.y -= labelSize.h / 2;
                    break;
                default:
                    break;
            }
        }

        this.bsInfo.h = labelSize.h;
        this.bsInfo.w = labelSize.w;


        left = locationPx.x - labelSize.w / 2;
        bottom = locationPx.y + labelSize.h / 2;
        //处理斜体字
        if (style.fontStyle && style.fontStyle && style.fontStyle === "italic") {
            right = locationPx.x + labelSize.w / 2 + parseInt(parseFloat(style.fontSize) / 2);
        } else {
            right = locationPx.x + labelSize.w / 2;
        }
        top = locationPx.y - labelSize.h / 2;

        labelPxBounds = new Bounds(left, bottom, right, top);

        return labelPxBounds;
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.getLabelPxSize
     * @description 获取label的像素大小。
     * @param style - {Object} 标签样式。
     * @returns {Object} 标签大小对象，属性w表示标签的宽度，属性h表示标签的高度。
     */
    getLabelPxSize(style) {
        var text,//文本内容
            fontSize,//字体大小
            spacing = 1,//两个字符间的间距（单位：px）
            lineSpacing = 0.2,
            bgstrokeWidth = parseFloat(style.strokeWidth);//标签背景框边框的宽度

        text = style.label || this.text;
        if (style.fontSize) {
            fontSize = parseFloat(style.fontSize);
        } else {
            return null;
        }

        //标签宽高
        var labelW, labelH;

        var textRows = text.split('\n');
        var numRows = textRows.length;

        if (numRows > 1) {
            labelH = fontSize * numRows + numRows + bgstrokeWidth + lineSpacing * fontSize;
        } else {
            labelH = fontSize + bgstrokeWidth + lineSpacing * fontSize + 1;
        }

        //取最大宽度
        labelW = 0;
        if (this.labelWTmp && labelW < this.labelWTmp) {
            labelW = this.labelWTmp;
        }
        for (var i = 0; i < numRows; i++) {
            var textCharC = this.getTextCount(textRows[i]);
            var labelWTmp = this.labelWTmp = Util.getTextBounds(style, textRows[i], this.element).textWidth + textCharC.textC * spacing + bgstrokeWidth;
            if (labelW < labelWTmp) {
                labelW = labelWTmp;
            }
        }

        var labelSize = new Object(); //标签大小
        labelSize.h = labelH;
        labelSize.w = labelW;

        return labelSize;
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.getBoundsByText
     * @description 获取文字地理范围。
     */
    getBoundsByText(map, style) {
        this.labelWTmp = null;
        var tempStyle = {};
        tempStyle = Util.copyAttributes(tempStyle, style);
        tempStyle.label = this.text;
        tempStyle.fontSize = parseFloat(tempStyle.fontSize);
        if (tempStyle.fontSize < 12) {
            tempStyle.fontSize = 12;
        }
        tempStyle.fontSize = tempStyle.fontSize.toString() + "px";

        if (tempStyle.fontPercent === undefined) {
            tempStyle.fontPercent = 100;
        }
        if (tempStyle.fontPercent < 0) {
            tempStyle.fontPercent = 0;
        }
        if (tempStyle.fontPercent > 400) {
            tempStyle.fontPercent = 400;
        }

        if (tempStyle.fontSpace === undefined) {
            tempStyle.fontSpace = 0;
        }
        if (tempStyle.fontSpace > 30) {
            tempStyle.fontSpace = 30;
        }
        if (tempStyle.fontSpace < 0) {
            tempStyle.fontSpace = 0;
        }

        var locationPixel = map.getPixelFromLonLat(new LonLat(this.x, this.y));
        var pixelBounds = this.getLabelPxBoundsByText(locationPixel, tempStyle);
        var extendWidth = ((pixelBounds.getWidth() + tempStyle.fontSpace * (this.text.length - 1)) * (tempStyle.fontPercent / 100)) - pixelBounds.getWidth();
        if (tempStyle.labelAlign && (tempStyle.labelAlign === "lt" || tempStyle.labelAlign === "lm" || tempStyle.labelAlign === "lb")) {
            pixelBounds.right += extendWidth;
        } else if (tempStyle.labelAlign && (tempStyle.labelAlign === "rt" || tempStyle.labelAlign === "rm" || tempStyle.labelAlign === "rb")) {
            pixelBounds.left -= extendWidth;
        } else if (tempStyle.labelAlign && (tempStyle.labelAlign === "ct" || tempStyle.labelAlign === "cm" || tempStyle.labelAlign === "cb")) {
            pixelBounds.left -= extendWidth / 2;
            pixelBounds.right += extendWidth / 2;
        }


        var ltLonLat = map.getLonLatFromPixel(new Pixel(pixelBounds.left, pixelBounds.top));
        var rbLonLat = map.getLonLatFromPixel(new Pixel(pixelBounds.right, pixelBounds.bottom));

        var boundsNoRotation = new Bounds(ltLonLat.lon, rbLonLat.lat, rbLonLat.lon, ltLonLat.lat);

        if (tempStyle.labelRotation) {
            var rectBounds = [];
            rectBounds.push(new Point(boundsNoRotation.left, boundsNoRotation.top));
            rectBounds.push(new Point(boundsNoRotation.right, boundsNoRotation.top));
            rectBounds.push(new Point(boundsNoRotation.right, boundsNoRotation.bottom));
            rectBounds.push(new Point(boundsNoRotation.left, boundsNoRotation.bottom));

            for (var i = 0; i < rectBounds.length; i++) {
                rectBounds[i].rotate(-tempStyle.labelRotation, new Point(this.x, this.y));
            }

            var rectGeo = new LineString(rectBounds);
            return rectGeo.getBounds();
        } else {
            return boundsNoRotation;
        }
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.getTextCount
     * @description 获取text中的字符个数。
     * @param text - {string} 字符串。
     * @returns {Object} 字符个数统计结果，属性cnC表示中文字符个数，属性enC表示英文字符个数，属性textC表示字符总个数。
     */
    getTextCount(text) {
        var textCharCount = new Object();

        var cnCount = 0;
        var enCount = 0;

        for (var i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) > 255) { //遍历判断字符串中每个字符的Unicode码,大于255则为中文
                cnCount++;
            }
            else {
                enCount++;
            }
        }
        //中午字符个数
        textCharCount.cnC = cnCount;
        //英文字符个数
        textCharCount.enC = enCount;
        //字符总个数
        textCharCount.textC = text.length;

        return textCharCount;
    }

    CLASS_NAME = "SuperMap.Geometry.GeoText"
}
SuperMap.Geometry.GeoText = GeoText;