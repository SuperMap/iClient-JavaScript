/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import { Util, DOTS_PER_INCH, INCHES_PER_UNIT } from '@supermap/iclient-common/commontypes/Util';
import { CartoCSS } from '@supermap/iclient-common/style/CartoCSS';
import { StringExt } from '@supermap/iclient-common/commontypes/BaseTypes';
import {
    DefaultStyle
} from './CartoDefaultStyle';
import {
    CartoStyleMap,
    ServerStyleMap,
    CompOpMap
} from './CartoStyleMap';

/**
 * @class CartoCSSToLeaflet
 * @classdesc CartoCSS 样式转 Leaflet 样式类。
 * @category BaseTypes Style
 * @param {string} url - 服务地址。
 * @private
 */
export class CartoCSSToLeaflet {


    constructor(url) {
        /**
         * @member CartoCSSToLeaflet.prototype.cartoCSS
         * @description CartoCSS 样式。
         */
        this.cartoCSS = null;

        /**
         * @member CartoCSSToLeaflet.prototype.mapUrl
         * @description 地图服务地址。
         */
        this.mapUrl = url;
    }

    /**
     * @function CartoCSSToLeaflet.prototype.pretreatedCartoCSS
     * @description CartoCSS 样式预处理。
     * @param {string} cartoStr - Carto 信息。
     * @param {Object} processCharacters - 需要处理的特征对象。
     */
    pretreatedCartoCSS(cartoStr, processCharacters) {
        if (processCharacters) {
            cartoStr = this.processCharacters(cartoStr);
        }
        this.cartoCSS = this.cartoCSS || {};
        var shaders = new CartoCSS(cartoStr).getShaders();
        if (!shaders) {
            return;
        }
        for (var i = 0; i < shaders.length; i++) {
            var element = shaders[i].elements[0];
            var attachment = shaders[i].attachment;
            this.cartoCSS[element.clean] = this.cartoCSS[element.clean] || {};
            this.cartoCSS[element.clean][attachment] = this.cartoCSS[element.clean][attachment] || [];
            this.cartoCSS[element.clean][attachment].push(shaders[i]);
        }
    }

    /**
     * @function CartoCSSToLeaflet.prototype.processCharacters
     * @description 替换一些关键符号。
     * @param {string} cartoCSSStr - cartoCSSS 信息。
     */
    processCharacters(cartoCSSStr) {
        var style = cartoCSSStr;
        if (!style) {
            return;
        }
        var me = this;
        style = style.replace(/[@]/gi, "___");
        style = style.replace(/\\#/gi, "\#");

        var cachedLayer = {};
        me.layersInfo && Object.keys(me.layersInfo).sort().forEach(function (attr) {
            var newAttr = attr.replace(/[@#\s]/gi, "___");
            var to = attr;
            var keys = Object.keys(cachedLayer);
            for (let index = keys.length; index > -1; index--) {
                if (attr.indexOf(keys[index]) > -1) {
                    to = attr.replace(keys[index], cachedLayer[keys[index]]);
                    break;
                }
            }
            to = to.replace(/[#]/gi, "\#");
            cachedLayer[attr] = newAttr;
            style = style.replace(new RegExp(to, "g"), newAttr);
        })
        style = style.replace(/[#]/gi, "\n#");
        //将zoom转化为scale，以免引起混淆
        style = style.replace(/\[zoom/gi, "[scale");
        return style;
    }

    /**
     * @function CartoCSSToLeaflet.prototype.pickShader
     * @description 拾取着色对象。
     * @param {string} layerName - 图层名称。
     */
    pickShader(layerName) {
        if (!this.cartoCSS) {
            return null;
        }
        var name = layerName.replace(/[@#\s]/gi, "___");
        return this.cartoCSS[name];
    }

    /**
     * @function CartoCSSToLeaflet.prototype.getDefaultStyle
     * @description 获取默认风格。
     * @param {string} type - 默认风格类型。
     */
    getDefaultStyle(type) {
        var style = {};
        //设置默认值
        var expandStyle = DefaultStyle[type];
        for (var prop in expandStyle) {
            var val = expandStyle[prop];
            style[prop] = val;
        }
        return style;
    }

    /**
     * @function CartoCSSToLeaflet.prototype.getStyleFromiPortalMarker
     * @description 从 iPortalMarker 中获取样式。
     * @param {string} icon - iPortal 图标。
     */
    getStyleFromiPortalMarker(icon) {
        if (icon.indexOf("./") == 0) {
            return null;
        }
        //兼容iportal示例的问题
        // if (icon.indexOf("http://support.supermap.com.cn:8092/static/portal") == 0) {
        //     icon = icon.replace("http://support.supermap.com.cn:8092/static/portal", "http://support.supermap.com.cn:8092/apps/viewer/static");
        // }
        return L.icon({
            iconUrl: icon,
            iconSize: L.point(48, 43),
            iconAnchor: L.point(24, 43),
            popupAnchor: L.point(0, -43)
        });
    }

    /**
     * @function CartoCSSToLeaflet.prototype.getStyleFromiPortalStyle
     * @description 从 iPortal 的风格中获取样式。
     * @param {Object} iPortalStyle - iPortal 的样式对象。
     * @param {string} type - 样式类型。
     * @param {Object} [fStyle] - 图标参数。
     */
    getStyleFromiPortalStyle(iPortalStyle, type, fStyle) {
        var featureStyle = fStyle ? JSON.parse(fStyle) : null;
        var style = {};
        if (type === 'Point' || type === 'MultiPoint') {
            var pointStyle = featureStyle || iPortalStyle.pointStyle;
            if (pointStyle.externalGraphic) {
                if (pointStyle.externalGraphic.indexOf("./") == 0) {
                    return null;
                }
                //兼容iportal示例的问题
                // if (pointStyle.externalGraphic.indexOf("http://support.supermap.com.cn:8092/static/portal") == 0) {
                //     pointStyle.externalGraphic = pointStyle.externalGraphic.replace("http://support.supermap.com.cn:8092/static/portal", "http://support.supermap.com.cn:8092/apps/viewer/static");
                // }
                return L.icon({
                    iconUrl: pointStyle.externalGraphic,
                    iconSize: L.point(pointStyle.graphicWidth, pointStyle.graphicHeight),
                    iconAnchor: L.point(-pointStyle.graphicXOffset, -pointStyle.graphicYOffset),
                    popupAnchor: L.point(0, -pointStyle.graphicHeight)
                });

            }
            style.radius = pointStyle.pointRadius;
            style.color = pointStyle.strokeColor;
            style.opacity = pointStyle.strokeOpacity;
            style.lineCap = pointStyle.strokeLineCap;
            style.weight = pointStyle.strokeWidth;
            style.fillColor = pointStyle.fillColor;
            style.fillOpacity = pointStyle.fillOpacity;
            style.dashArray = this.dashStyle(pointStyle, 1);
            return style;
        }
        if (type === 'LineString' || type === 'MultiLineString' || type === 'Box') {
            var lineStyle = featureStyle || iPortalStyle.lineStyle;
            style.color = lineStyle.strokeColor;
            style.opacity = lineStyle.strokeOpacity;
            style.fillOpacity = lineStyle.fillOpacity;
            style.lineCap = lineStyle.strokeLineCap;
            style.weight = lineStyle.strokeWidth;
            style.dashArray = this.dashStyle(lineStyle, 1);
            return style;
        }
        if (type === 'Polygon' || type === 'MultiPolygon') {
            var polygonStyle = featureStyle || iPortalStyle.polygonStyle;
            style.color = polygonStyle.strokeColor;
            style.opacity = polygonStyle.strokeOpacity;
            style.lineCap = polygonStyle.strokeLineCap;
            style.weight = polygonStyle.strokeWidth;
            style.fillColor = polygonStyle.fillColor;
            style.fillOpacity = polygonStyle.fillOpacity;
            style.dashArray = this.dashStyle(polygonStyle, 1);
            return style;
        }
    }

    /**
     * @function CartoCSSToLeaflet.prototype.dashStyle
     * @description 符号样式。
     * @param {Object} style - 样式参数。
     * @param {number} widthFactor - 宽度系数。
     */
    dashStyle(style, widthFactor) {
        if (!style) {
            return [];
        }
        var w = style.strokeWidth * widthFactor;
        var str = style.strokeDashstyle;
        switch (str) {
            case 'solid':
                return [];
            case 'dot':
                return [1, 4 * w];
            case 'dash':
                return [4 * w, 4 * w];
            case 'dashdot':
                return [4 * w, 4 * w, 1, 4 * w];
            case 'longdash':
                return [8 * w, 4 * w];
            case 'longdashdot':
                return [8 * w, 4 * w, 1, 4 * w];
            default:
                if (!str) {
                    return [];
                }
                if (Util.isArray(str)) {
                    return str;
                }
                str = StringExt.trim(str).replace(/\s+/g, ",");
                return str.replace(/\[|\]/gi, "").split(",");
        }
    }

    /**
     * @function CartoCSSToLeaflet.prototype.getValidStyleFromCarto
     * @description 从 Carto 中获取有效的样式。
     * @param {number} zoom - 缩放级别。
     * @param {number} scale - 比例尺。
     * @param {Array.<Object>} shader - 渲染器对象数组。
     * @param {Object} feature - 要素。
     * @param {string} [fromServer] - 服务源。
     */
    getValidStyleFromCarto(zoom, scale, shader, feature, fromServer) {
        if (!shader) {
            return null;
        }
        var type = feature.type,
            attributes = feature.properties.attributes || {},
            style = this.getDefaultStyle(type);
        fromServer = (fromServer === undefined) ? true : fromServer;

        attributes.FEATUREID = feature.properties.id;
        attributes.SCALE = scale;

        var cartoStyleMap = CartoStyleMap[type];

        var fontSize, fontName;
        for (var i = 0, len = shader.length; i < len; i++) {
            var _shader = shader[i];
            var prop = cartoStyleMap[_shader.property];
            var value = _shader.getValue(attributes, zoom, true);
            if ((value !== null) && prop) {
                if (prop === "fontSize") {
                    if (fromServer) {
                        value *= 0.8
                    }
                    fontSize = value + "px";
                    style.fontSize = fontSize;
                } else if (prop === "fontName") {
                    fontName = value;
                    style.fontName = fontName;
                } else {
                    if (prop === "globalCompositeOperation") {
                        value = CompOpMap[value];
                        if (!value) {
                            continue;
                        }
                    } else if (fromServer && prop === 'iconUrl') {
                        value = this.mapUrl + '/tileFeature/symbols/' + value.replace(/(___)/gi, '@');
                        value = value.replace(/(__0__0__)/gi, '__8__8__');
                        style["iconUrl"] = value;
                        continue;
                    }
                    if (prop === 'weight' && value < 1) {
                        value = Math.ceil(value);
                    }
                    style[prop] = value;
                }
            }
        }
        return style;
    }

    /**
     * @function CartoCSSToLeaflet.prototype.getValidStyleFromLayerInfo
     * @description 通过图层信息获取有效的样式。
     * @param {Feature} feature - 要素。
     * @param {Object} layerInfo - 图层信息。
     */
    getValidStyleFromLayerInfo(feature, layerInfo) {
        var type = feature.type,
            style = this.getDefaultStyle(type),
            shader = layerInfo && layerInfo.layerStyle;
        if (!shader) {
            return style;
        }
        if (type === "POINT") {
            var size = Math.ceil(shader.markerSize * DOTS_PER_INCH * INCHES_PER_UNIT["mm"]) || 8;
            var symbolParameters = {
                "transparent": true,
                "resourceType": "SYMBOLMARKER",
                "picWidth": size,
                "picHeight": size,
                "style": JSON.stringify(shader)
            };
            style.iconUrl = Util.urlAppend(this.mapUrl + "/symbol.png", Util.getParameterString(symbolParameters));
            style.iconSize = [size, size];
            return style;
        }
        if (type === "TEXT") {
            shader = feature.properties.textStyle || layerInfo.layerStyle;
            //设置文本是否使用粗体
            style.fontWeight = shader.bold ? shader.fontWeight : "normal";
            //设置文本的尺寸（对应fontHeight属性）和行高，行高iserver不支持，默认5像素
            //固定大小的时候单位是毫米
            if (shader.fontHeight) {
                var text_h = shader.fontHeight * DOTS_PER_INCH * INCHES_PER_UNIT["mm"] * 0.85; //毫米转像素,服务端的字体貌似要稍微小一点
                style.fontSize = text_h + "px";
                style.textHeight = text_h;
            }

            //设置文本字体类型
            //在桌面字体钱加@时为了解决对联那种形式，但是在canvas不支持，并且添加了@会导致
            //字体大小被固定，这里需要去掉
            if (shader.fontName) {
                style.fontFamily = (shader.fontName.indexOf("@")) ?
                    shader.fontName.replace(/@/g, "") : shader.fontName;
            }

            //设置对齐方式
            if (shader.align) {
                var alignStr = shader.align.replace(/TOP|MIDDLE|BASELINE|BOTTOM/, "");
                style.textAlign = alignStr.toLowerCase();
            }
            style.weight = shader.outline ? shader.outlineWidth : 0;
            if (shader.backColor) {
                style.color = "rgba(" + shader.backColor.red + "," +
                    shader.backColor.green + "," +
                    shader.backColor.blue +
                    ",1)";
            }
            if (shader.foreColor) {
                style.fillColor = "rgba(" + shader.foreColor.red + "," +
                    shader.foreColor.green + "," +
                    shader.foreColor.blue +
                    ",1)";
            }
            style.rotation = shader.rotation || 0;
            return style;
        }
        //目前只实现桌面系统默认的几种symbolID，非系统默认的面用颜色填充替代，线则用实线来替代
        var fillSymbolID = shader["fillSymbolID"] > 7 ? 0 : shader["fillSymbolID"];
        var lineSymbolID = shader["lineSymbolID"] > 5 ? 0 : shader["lineSymbolID"];
        for (var attr in shader) {
            var obj = ServerStyleMap[attr];
            if (!obj) {
                continue;
            }
            var leafletStyle = obj.leafletStyle;
            switch (obj.type) {
                case "number":
                    {
                        let value = shader[attr];
                        if (obj.unit) {
                            value = value * DOTS_PER_INCH * INCHES_PER_UNIT[obj.unit] * 2.5;
                        }
                        style[leafletStyle] = value;
                        break;
                    }

                case "color":
                    {
                        var color = shader[attr];
                        let value, alpha = 1;
                        if (leafletStyle === "fillColor") {
                            if (fillSymbolID === 0 || fillSymbolID === 1) {
                                //当fillSymbolID为0时，用颜色填充，为1是无填充，即为透明填充，alpha通道为0
                                alpha = 1 - fillSymbolID;
                                value = "rgba(" + color.red + "," + color.green + "," + color.blue + "," + alpha + ")";
                            }
                        } else if (leafletStyle === "color") {
                            if (lineSymbolID === 0 || lineSymbolID === 5) {
                                //对于lineSymbolID为0时，线为实线，为lineSymbolID为5时，为无线模式，即线为透明，即alpha通道为0
                                alpha = lineSymbolID === 0 ? 1 : 0;
                            } else {
                                //以下几种linePattern分别模拟了桌面的SymbolID为1~4几种符号的linePattern
                                var linePattern = [1, 0];
                                switch (lineSymbolID) {
                                    case 1:
                                        linePattern = [9.7, 3.7];
                                        break;
                                    case 2:
                                        linePattern = [3.7, 3.7];
                                        break;
                                    case 3:
                                        linePattern = [9.7, 3.7, 2.3, 3.7];
                                        break;
                                    case 4:
                                        linePattern = [9.7, 3.7, 2.3, 3.7, 2.3, 3.7];
                                        break;
                                    default:
                                        break
                                }
                                style.lineDasharray = linePattern;
                            }
                            value = "rgba(" + color.red + "," + color.green + "," + color.blue + "," + alpha + ")";
                        }
                        style[leafletStyle] = value;
                        break;
                    }
                default:
                    break;
            }
        }

        //处理标签文本的情况
        if (layerInfo.textField) {
            style.textAlign = "LEFT";
        }
        return style;
    }

}
