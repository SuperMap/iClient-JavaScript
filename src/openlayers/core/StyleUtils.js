/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import {SuperMap, CommonUtil, StringExt} from '@supermap/iclient-common';
import {StyleMap} from '../overlay/vectortile/StyleMap';
import {DeafultCanvasStyle} from '../overlay/vectortile/DeafultCanvasStyle';
import {
    Util
} from '../core/Util';
import canvg from 'canvg';

ol.supermap = ol.supermap || {};
var padding = 8, doublePadding = padding*2;

/**
 * @class ol.supermap.StyleUtils
 * @classdesc 样式工具类。
 * @private
 */
export class StyleUtils {

    /**
     * @function ol.supermap.StyleUtils.getValidStyleFromLayerInfo
     * @description 通过图层信息获取有效的样式。
     * @param {Object} layerInfo - 图层信息。
     * @param {ol.Feature} feature - 要素。
     * @param {string} url - 图层数据地址。
     * @returns {ol.style.Style} 返回图层样式。
     */
    static getValidStyleFromLayerInfo(layerInfo, feature, url) {
        var type = feature.getGeometry().getType().toUpperCase(),
            shader = layerInfo.layerStyle,
            style = this.getDefaultStyle(type);
        if ((type === "POINT" || type === 'MULTIPOINT') && !feature.getProperties().textStyle && layerInfo.type !== 'LABEL' && !feature.getProperties().TEXT_FEATURE_CONTENT) {
            if (shader) {
                var symbolParameters = {
                    "transparent": true,
                    "resourceType": "SYMBOLMARKER",
                    "picWidth": Math.ceil(shader.markerSize * SuperMap.DOTS_PER_INCH * SuperMap.INCHES_PER_UNIT["mm"]) || 13,
                    "picHeight": Math.ceil(shader.markerSize * SuperMap.DOTS_PER_INCH * SuperMap.INCHES_PER_UNIT["mm"]) || 13,
                    "style": JSON.stringify(shader)
                };
                var imageUrl = CommonUtil.urlAppend(url + "/symbol.png", CommonUtil.getParameterString(symbolParameters));
                style.pointFile = imageUrl;
                return new ol.style.Style({
                    image: new ol.style.Icon({
                        src: style.pointFile
                    })
                });
            }
            return this.toOLPointStyle(style);
        } else if ((type === "POINT" || type === 'MULTIPOINT') && (feature.getProperties().textStyle || layerInfo.type === 'LABEL' || feature.getProperties().TEXT_STYLE_INFO)) {
            style = this.getDefaultStyle('TEXT');
            if (feature.getProperties().textStyle) {
                shader = feature.getProperties().textStyle;
            }
            if (feature.getProperties().TEXT_STYLE_INFO) {
                shader = JSON.parse(feature.getProperties().TEXT_STYLE_INFO).textStyle;
            }
            if (shader && shader !== "{}") {
                var fontStr = "";
                //设置文本是否倾斜
                style.fontStyle = shader.italic ? "italic" : "normal";
                //设置文本是否使用粗体
                style.fontWeight = shader.bold ? shader.fontWeight : "normal";
                //设置文本的尺寸（对应fontHeight属性）和行高，行高iserver不支持，默认5像素
                //固定大小的时候单位是毫米
                var text_h = shader.fontHeight * SuperMap.DOTS_PER_INCH * SuperMap.INCHES_PER_UNIT["mm"] * 0.85;    //毫米转像素,服务端的字体貌似要稍微小一点
                style.fontSize = text_h + "px";

                //设置文本字体类型
                //在桌面字体钱加@时为了解决对联那种形式，但是在canvas不支持，并且添加了@会导致
                //字体大小被固定，这里需要去掉
                if (shader.fontName.indexOf("@")) {
                    fontStr = shader.fontName.replace(/@/g, "");
                } else {
                    fontStr = shader.fontName
                }
                style.fontFamily = fontStr;
                style.textHeight = text_h;

                //设置对齐方式
                var alignStr = shader.align.replace(/TOP|MIDDLE|BASELINE|BOTTOM/, "");
                style.textAlign = alignStr.toLowerCase();
                var baselineStr = shader.align.replace(/LEFT|RIGHT|CENTER/, "");
                if (baselineStr === "BASELINE") {
                    baselineStr = "alphabetic";
                }
                style.textBaseline = baselineStr.toLowerCase();

                /*//首先判定是否需要绘制阴影，如果需要绘制，阴影应该在最下面
                 if(shader.shadow)
                 {

                 //桌面里面的阴影没有做模糊处理，这里统一设置为0,
                 style.shadowBlur=0;
                 //和桌面统一，往右下角偏移阴影，默认3像素
                 style.shadowOffsetX=3;
                 style.shadowOffsetY=3;
                 //颜色取一个灰色，调成半透明
                 style.shadowColor="rgba(50,50,50,0.5)";
                 }else{
                 style.shadowOffsetX=0;
                 style.shadowOffsetY=0;
                 }*/
                style.haloRadius = shader.outline ? shader.outlineWidth : 0;
                style.backColor = "rgba(" + shader.backColor.red + "," + shader.backColor.green + "," + shader.backColor.blue + ",1)";
                style.foreColor = "rgba(" + shader.foreColor.red + "," + shader.foreColor.green + "," + shader.foreColor.blue + ",1)";
                style.rotation = shader.rotation;
            }
            var text;
            if (feature.getProperties().textStyle && feature.getProperties().texts) {
                text = feature.getProperties().texts[0];
            }
            if (layerInfo.type === 'LABEL') {
                var textField = layerInfo.textField;
                if (textField && textField.indexOf('.')) {
                    var arr = textField.split('.');
                    textField = arr && arr.length > 0 && arr[arr.length - 1];
                }
                text = feature.getProperties().attributes ? feature.getProperties().attributes[textField] : feature.getProperties()[textField];
            }
            if (feature.getProperties().TEXT_FEATURE_CONTENT) {
                text = feature.getProperties().TEXT_FEATURE_CONTENT;
            }
            if (!text) {
                return this.toOLPointStyle(this.getDefaultStyle('POINT'));
            }
            return this.toOLTextStyle(style, text);
        } else if (shader) {
            //目前只实现桌面系统默认的几种symbolID，非系统默认的面用颜色填充替代，线则用实线来替代
            var fillSymbolID = shader["fillSymbolID"] > 7 ? 0 : shader["fillSymbolID"];
            var lineSymbolID = shader["lineSymbolID"] > 5 ? 0 : shader["lineSymbolID"];
            for (var attr in shader) {
                var obj = StyleMap.ServerStyleMap[attr];
                var canvasStyle = obj.canvasStyle;
                if (canvasStyle && canvasStyle != "") {
                    var value;
                    switch (obj.type) {
                        case "number":
                            value = shader[attr];
                            if (obj.unit) {
                                //将单位转换为像素单位
                                value = value * SuperMap.DOTS_PER_INCH * SuperMap.INCHES_PER_UNIT[obj.unit] * 2.5;
                            }
                            style[canvasStyle] = value;
                            break;
                        case "color":
                            var color = shader[attr];
                            var backColor = shader["fillBackColor"];
                            var alpha = 1;
                            if (canvasStyle === "fillStyle") {
                                if (fillSymbolID === 0 || fillSymbolID === 1) {
                                    //当fillSymbolID为0时，用颜色填充，为1是无填充，即为透明填充，alpha通道为0
                                    alpha = 1 - fillSymbolID;
                                    value = "rgba(" + color.red + "," + color.green + "," + color.blue + "," + alpha + ")";
                                } else {
                                    //当fillSymbolID为2~7时，用的纹理填充,但要按照前景色修改其颜色
                                    try {
                                        var tempCvs = document.createElement("canvas");
                                        tempCvs.height = 8;
                                        tempCvs.width = 8;
                                        var tempCtx = tempCvs.getContext("2d");
                                        var image = new Image();
                                        if (this.layer && this.layer.fillImages) {
                                            tempCtx.drawImage(this.layer.fillImages["System " + fillSymbolID], 0, 0);
                                        }
                                        var imageData = tempCtx.getImageData(0, 0, tempCvs.width, tempCvs.height);
                                        var pix = imageData.data;
                                        for (var i = 0, len = pix.length; i < len; i += 4) {
                                            var r = pix[i], g = pix[i + 1], b = pix[i + 2];
                                            //将符号图片中的灰色或者黑色的部分替换为前景色，其余为后景色
                                            if (r < 225 && g < 225 && b < 225) {
                                                pix[i] = color.red;
                                                pix[i + 1] = color.green;
                                                pix[i + 2] = color.blue;
                                            } else if (backColor) {
                                                pix[i] = backColor.red;
                                                pix[i + 1] = backColor.green;
                                                pix[i + 2] = backColor.blue;
                                            }
                                        }
                                        tempCtx.putImageData(imageData, 0, 0);
                                        image.src = tempCvs.toDataURL();

                                        if (this.context) {
                                            value = this.context.createPattern(image, "repeat");
                                        }
                                    } catch (e) {
                                        throw Error(e.message);
                                    }
                                }
                            } else if (canvasStyle === "strokeStyle") {
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
                            style[canvasStyle] = value;
                            break;
                        default:
                            break;

                    }
                }
            }
        }
        if (type === 'LINESTRING' || type === 'MULTILINESTRING') {
            return this.toOLLineStyle(style);
        }
        if (type === 'POLYGON' || type === 'MULTIPOLYGON') {
            return this.toOLPolygonStyle(style);
        }
    }

    /**
     * @function ol.supermap.StyleUtils.getStyleFromCarto
     * @description 从 Carto 中获取有效的样式。
     * @param {number} zoom -缩放级别。
     * @param {number} scale - 比例尺。
     * @param {Array} shader - 渲染器对象数组。
     * @param {Object} feature - 要素。
     * @param {string} fromServer - 服务源。
     * @param {string} url - 地址。
     */
    static getStyleFromCarto(zoom, scale, shader, feature, fromServer, url) {
        var type = feature.getGeometry().getType().toUpperCase(),
            attributes = {},
            style = this.getDefaultStyle(type);
        attributes.FEATUREID = feature.getProperties().id;
        attributes.SCALE = scale;
        var cartoStyleType = feature.getProperties().type === "TEXT" ? "TEXT" : type;
        var cartoStyleMap = StyleMap.CartoStyleMap[cartoStyleType];
        var fontSize, fontName;
        if (shader) {
            for (var i = 0, len = shader.length; i < len; i++) {
                var _shader = shader[i];
                var prop = cartoStyleMap[_shader.property];
                var value = _shader.getValue(attributes, zoom, true);
                if ((value !== null) && prop) {
                    if (prop === "fontSize") {
                        if (fromServer) {
                            value *= 0.8;
                        }
                        //斜杠后面为行间距，默认为0.5倍行间距
                        fontSize = value + "px";
                        style.fontSize = fontSize;
                    } else if (prop === "fontName") {
                        fontName = value;
                        style.fontName = fontName;
                    } else {
                        if (prop === "globalCompositeOperation") {
                            value = StyleMap.CartoCompOpMap[value];
                            if (!value) {
                                continue;
                            }
                        } else if (fromServer && prop === 'pointFile') {
                            value = url + '/tileFeature/symbols/' + value.replace(/(___)/gi, '@');
                            value = value.replace(/(__0__0__)/gi, '__8__8__');
                        }
                        if (prop === 'lineWidth' && value < 1) {
                            value = Math.ceil(value);
                        }
                        style[prop] = value;
                    }
                }
            }
        }
        if (feature.getProperties().type === 'TEXT') {
            var text;
            if (feature.getProperties().texts) {
                text = feature.getProperties().texts[0];
            }
            if (text == null && style.textName) {
                var textName = style.textName.substring(1, style.textName.length - 1);
                text = feature.getProperties().attributes ? feature.getProperties().attributes[textName] : feature.getProperties()[textName];
                if (text != null) {
                    var texts = feature.getProperties().texts || [];
                    texts.push(text);
                    feature.setProperties({texts: texts});
                }
            }
            return this.toOLTextStyle(style, text)
        }
        if (type === 'POINT' || type === 'MULTIPOINT') {
            return this.toOLPointStyle(style);
        }
        if (type === 'LINESTRING' || type === 'MULTILINESTRING') {
            return this.toOLLineStyle(style);
        }
        if (type === 'POLYGON' || type === 'MULTIPOLYGON') {
            return this.toOLPolygonStyle(style);
        }
    }

    /**
     * @function ol.supermap.StyleUtils.toOLPointStyle
     * @description 点样式。
     * @param {Object} style - 样式参数。
     * @returns {ol.style.Style} 获取点样式。
     */
    static toOLPointStyle(style) {
        if (style.pointFile !== '') {
            return new ol.style.Style({
                image: new ol.style.Icon({
                    src: style.pointFile
                })
            });
        }
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: style.pointRadius,
                fill: new ol.style.Fill({
                    color: style.fillStyle
                }),
                stroke: new ol.style.Stroke({
                    color: style.pointHaloColor,
                    width: style.pointHaloRadius
                })
            })
        });
    }

    /**
     * @function ol.supermap.StyleUtils.toOLLineStyle
     * @description 线样式。
     * @param {Object} style - 样式参数。
     * @returns {ol.style.Style} 获取线的样式。
     */
    static toOLLineStyle(style) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: style.strokeStyle,
                width: style.lineWidth,
                lineCap: style.lineCap,
                lineDash: style.lineDasharray,
                lineDashOffset: style.lineDashOffset,
                lineJoin: style.lineJoin,
                miterLimit: style.miterLimit
            })
        });
    }

    /**
     * @function ol.supermap.StyleUtils.toOLPolygonStyle
     * @description 面样式。
     * @param {Object} style - 样式参数。
     * @returns {ol.style.Style} 获取面的样式。
     */
    static toOLPolygonStyle(style) {
        var fill = new ol.style.Fill({
            color: style.fillStyle
        });
        var stroke = new ol.style.Stroke({
            color: style.strokeStyle,
            width: style.lineWidth,
            lineCap: style.lineCap,
            lineDash: style.lineDasharray,
            lineDashOffset: style.lineDashOffset,
            lineJoin: style.lineJoin,
            miterLimit: style.miterLimit
        });
        return new ol.style.Style({
            fill: fill,
            stroke: stroke
        });
    }

    /**
     * @function ol.supermap.StyleUtils.toOLTextStyle
     * @description 文本样式。
     * @param {Object} style - 样式对象。
     * @param {string} text - 文本参数。
     * @returns {ol.style.Style} 获取的文本样式。
     */
    static toOLTextStyle(style, text) {
        return new ol.style.Style({
            text: new ol.style.Text({
                font: (style.fontStyle || '') + ' ' + (style.fontWeight || '') + ' ' + (style.fontSize || '') + ' ' + style.fontFamily,
                text: text,
                textAlign: style.textAlign,
                textBaseline: style.textBaseline,
                fill: new ol.style.Fill({
                    color: style.foreColor
                }),
                stroke: new ol.style.Stroke({
                    color: style.backColor
                }),
                offsetX: style.offsetX,
                offsetY: style.offsetY
            })
        })
    }

    /**
     * @function ol.supermap.StyleUtils.dashStyle
     * @description 符号样式。
     * @param {Object} style - 样式参数。
     * @param {number} widthFactor - 宽度系数。
     */
    static dashStyle(style, widthFactor) {
        if (!style) {
            return [];
        }
        var w = style.strokeWidth * widthFactor;
        var str = style.strokeDashstyle || style.lineDash;
        switch (str) {
            case 'solid':
                return [0];
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
                if (CommonUtil.isArray(str)) {
                    return str;
                }
                str = StringExt.trim(str).replace(/\s+/g, ",");
                return str.replace(/\[|\]/gi, "").split(",");
        }
    }

    /**
     * @function ol.supermap.StyleUtils.getStyleFromiPortalMarker
     * @description 从 iPortal 标记获取样式。
     * @param {Object} icon - 图标参数。
     */
    static getStyleFromiPortalMarker(icon) {
        if (icon.indexOf("./") == 0) {
            return null;
        }
        //兼容iportal示例的问题
        if (icon.indexOf("http://support.supermap.com.cn:8092/static/portal") == 0) {
            icon = icon.replace("http://support.supermap.com.cn:8092/static/portal", "http://support.supermap.com.cn:8092/apps/viewer/static");
        }
        return new ol.style.Style({
            image: new ol.style.Icon({
                src: icon,
                opacity: 1,
                size: [48, 43],
                anchor: [0.5, 1]
            })
        });
    }

    /**
     * @function ol.supermap.StyleUtils.getStyleFromiPortalStyle
     * @description 从 iPortal 标记获取样式。
     * @param {Object} iPortalStyle - iportal 样式。
     * @param {string} type - 样式类型。
     * @param {Object} fStyle - 要素样式。
     */
    static getStyleFromiPortalStyle(iPortalStyle, type, fStyle) {
        var featureStyle = fStyle ? JSON.parse(fStyle) : null;
        var me = this;
        if (type === 'Point' || type === 'MultiPoint') {
            var pointStyle = featureStyle || iPortalStyle.pointStyle;
            if (pointStyle.externalGraphic) {
                if (pointStyle.externalGraphic.indexOf("./") == 0) {
                    return null;
                }
                //兼容iportal示例的问题
                if (pointStyle.externalGraphic.indexOf("http://support.supermap.com.cn:8092/static/portal") == 0) {
                    pointStyle.externalGraphic = pointStyle.externalGraphic.replace("http://support.supermap.com.cn:8092/static/portal", "http://support.supermap.com.cn:8092/apps/viewer/static");
                }
                return new ol.style.Style({
                    image: new ol.style.Icon({
                        src: pointStyle.externalGraphic,
                        opacity: pointStyle.graphicOpacity,
                        size: [pointStyle.graphicWidth, pointStyle.graphicHeight]
                        //anchor: [-pointStyle.graphicXOffset / pointStyle.graphicWidth, -pointStyle.graphicYOffset / pointStyle.graphicHeight]
                    })
                });
            }
            return new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: me.hexToRgba(pointStyle.fillColor, pointStyle.fillOpacity)
                    }),
                    stroke: new ol.style.Stroke({
                        color: me.hexToRgba(pointStyle.strokeColor, pointStyle.strokeOpacity),
                        lineCap: pointStyle.strokeLineCap,
                        lineDash: this.dashStyle(pointStyle, 1),
                        width: pointStyle.strokeWidth
                    }),
                    radius: pointStyle.pointRadius
                })
            });
        }
        if (type === 'LineString' || type === 'MultiLineString' || type === 'Box') {
            var lineStyle = featureStyle || iPortalStyle.lineStyle;
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: me.hexToRgba(lineStyle.strokeColor, lineStyle.strokeOpacity),
                    lineCap: lineStyle.strokeLineCap,
                    lineDash: this.dashStyle(lineStyle, 1),
                    width: lineStyle.strokeWidth
                })
            });
        }
        if (type === 'Polygon' || type === 'MultiPolygon') {
            var polygonStyle = featureStyle || iPortalStyle.polygonStyle;
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: me.hexToRgba(polygonStyle.fillColor, polygonStyle.fillOpacity)
                }),
                stroke: new ol.style.Stroke({
                    color: me.hexToRgba(polygonStyle.strokeColor, polygonStyle.strokeOpacity),
                    lineCap: polygonStyle.strokeLineCap,
                    lineDash: this.dashStyle(polygonStyle, 1),
                    width: polygonStyle.strokeWidth
                })
            });
        }
    }

    /**
     * @function ol.supermap.StyleUtils.hexToRgba
     * @description 十六进制转 RGBA 格式。
     * @param {Object} hex - 十六进制格式参数。
     * @param {number} opacity -Alpha 参数。
     * @returns {string} 生成的 RGBA 格式。
     */
    static hexToRgba(hex, opacity) {
        var color = [], rgba = [];
        hex = hex.replace(/#/, "");
        if (hex.length == 3) {
            var tmp = [];
            for (let i = 0; i < 3; i++) {
                tmp.push(hex.charAt(i) + hex.charAt(i));
            }
            hex = tmp.join("");
        }
        for (let i = 0; i < 6; i += 2) {
            color[i] = "0x" + hex.substr(i, 2);
            rgba.push(parseInt(Number(color[i])));
        }
        rgba.push(opacity);
        return "rgba(" + rgba.join(",") + ")";
    }

    /**
     * @function ol.supermap.StyleUtils.getDefaultStyle
     * @description 获取默认风格
     * @param {string} type - 类型参数。
     * @returns {string} 
     */
    static getDefaultStyle(type) {
        var style = {};
        var canvasStyle = DeafultCanvasStyle[type];
        for (var prop in canvasStyle) {
            var val = canvasStyle[prop];
            style[prop] = val;
        }
        return style;
    }

    /**
     * @function ol.supermap.StyleUtils.getDefaultStyle
     * @description 将样式对象转换成openlayer要求的ol.style
     * @param {string} style - 样式对象
     * @param {string} type - feature的类型
     * @returns {ol.style.Style}
     */
    static toOpenLayersStyle(style, type) {
        style = style || this.getDefaultStyle();
        let olStyle = new ol.style.Style();
        let newImage, newFill, newStroke;
        const ZERO = 0.0000001;
        let {
            fillColor,
            fillOpacity,
            strokeColor,
            strokeWidth,
            strokeOpacity,
            radius,
            lineCap,
            src,
            scale,
            //size,
            //imgSize,
            anchor
        } = style;
        let fillColorArray = this.hexToRgb(fillColor);
        if(fillColorArray){
            fillColorArray.push(fillOpacity);
        }

        let strokeColorArray = this.hexToRgb(strokeColor);
        if(strokeColorArray){
            strokeColorArray.push(strokeOpacity);
        }
        if (type === "POINT") {
            if (src) {
                if (/.+(\.svg$)/.test(src)) {
                    if(!this.svgDiv) {
                        this.svgDiv = document.createElement('div');
                        document.body.appendChild(this.svgDiv);
                    }
                    this.getCanvasFromSVG(src, this.svgDiv, (canvas) => {
                        newImage = new ol.style.Icon({
                            img: canvas,
                            scale: radius / canvas.width,
                            imgSize: [canvas.width, canvas.height],
                            anchor : [0.5, 0.5]
                        })
                    })
                } else {
                    newImage = new ol.style.Icon({
                        src: src,
                        scale: scale,
                        anchor: anchor
                    });
                }
            } else {
                newImage = new ol.style.Circle({
                    radius: radius,
                    fill: new ol.style.Fill({
                        color: fillColorArray
                    }),
                    stroke: new ol.style.Stroke({
                        width: strokeWidth || ZERO,
                        color: strokeColorArray
                    })
                });
            }
            olStyle.setImage(newImage);
        } else if (type === "LINE" || type === "LINESTRING" || type === 'MULTILINESTRING' || type === 'LINEARRING') {
            newStroke = new ol.style.Stroke({
                width: strokeWidth || ZERO,
                color: strokeColorArray,
                lineCap: lineCap || 'round',
                lineDash: this.dashStyle(style, 1)
            });
            olStyle.setStroke(newStroke);
        } else if(type === 'POLYGON' ||
            type === 'MULTIPOLYGON' || type === 'REGION'){
            newFill = new ol.style.Fill({
                color: fillColorArray
            });
            newStroke = new ol.style.Stroke({
                width: strokeWidth || ZERO,
                color: strokeColorArray,
                lineCap: lineCap || 'round',
                lineDash:this.dashStyle(style, 1)
            });
            olStyle.setFill(newFill);
            olStyle.setStroke(newStroke);
        } else {
            let result = this.getCanvas(style);
            newImage = new ol.style.Icon({
                img:  result.canvas,
                imgSize:[result.width,result.height],
                scale: 1,
                anchor : [0.5, 0.5]
            });
            olStyle.setImage(newImage);
        }
        return olStyle;
    }

    /**
     * 获取文字标注对应的canvas
     * @param style
     * @returns {{canvas: *, width: number, height: number}}
     */
    static getCanvas(style) {
        let canvas;
        if(style.canvas) {
            if(document.querySelector("#"+style.canvas)) {
                canvas = document.getElemntById(style.canvas);
            } else {
                canvas = this.createCanvas(style);
            }
        } else {
            //不存在canvas，当前feature
            canvas = this.createCanvas(style);
            style.canvas = canvas.id;
        }
        canvas.style.display = "none";
        var ctx = canvas.getContext("2d");
        //行高
        let lineHeight = Number(style.font.replace(/[^0-9]/ig,""));
        let textArray = style.text.split('\r\n');
        let lenght = textArray.length;
        //在改变canvas大小后再绘制。否则会被清除
        ctx.font = style.font;
        let size = this.drawRect(ctx, style, textArray, lineHeight, canvas);
        this.positionY = padding;
        if(lenght > 1) {
            textArray.forEach(function (text, i) {
                if(i !== 0) {
                    this.positionY = this.positionY + lineHeight;
                }
                this.canvasTextAutoLine(text,style,ctx,lineHeight, size.width);
            }, this);
        } else {
            this.canvasTextAutoLine(textArray[0],style,ctx,lineHeight, size.width);
        }
        return {
            canvas: canvas,
            width: size.width,
            height: size.height
        };
    }
    /**
     * 创建当前feature对应的canvas
     * @param style  {object}
     * @returns {HTMLElement}
     */
    static createCanvas(style) {
        let div = document.createElement('div');
        document.body.appendChild(div);
        let canvas = document.createElement('canvas');
        canvas.id = style.canvas ? style.canvas : 'textCanvas' + Util.newGuid(8);
        div.appendChild(canvas);
        return canvas;
    }
    /**
     * 绘制矩形边框背景
     * @param ctx
     * @param style
     * @param textArray
     * @param lineHeight
     * @param canvas
     * @returns {{width: number, height: number}}
     */
    static drawRect(ctx, style, textArray, lineHeight, canvas) {
        let backgroundFill = style.backgroundFill, maxWidth = style.maxWidth - doublePadding;
        let width, height = 0, lineCount=0, lineWidths = [];
        //100的宽度，去掉左右两边3padding
        textArray.forEach(function (arrText) {
            let line='', isOverMax;
            lineCount++;
            for (var n = 0; n < arrText.length; n++) {
                let textLine = line + arrText[n];
                let metrics = ctx.measureText(textLine);
                let textWidth = metrics.width;
                if ((textWidth > maxWidth && n > 0) || arrText[n] === '\n') {
                    line = arrText[n];
                    lineCount++;
                    //有换行，记录当前换行的width
                    isOverMax = true;
                } else {
                    line = textLine;
                    width = textWidth;
                }
            }
            if(isOverMax) {
                lineWidths.push(maxWidth);
            } else {
                lineWidths.push(width);
            }
        }, this);
        width = this.getCanvasWidth(lineWidths, maxWidth);
        height = lineCount * lineHeight;
        height += doublePadding;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = backgroundFill;
        ctx.fillRect(0,0,width,height);
        return {
            width: width,
            height: height
        }
    }
    /**
     * 获取自适应的宽度（如果没有超过最大宽度，就用文字的宽度）
     * @param lineWidths
     * @param maxWidth
     * @returns {number}
     */
    static getCanvasWidth(lineWidths, maxWidth) {
        let width = 0;
        for(let i=0; i< lineWidths.length; i++) {
            let lineW = lineWidths[i];
            if(lineW >= maxWidth) {
                //有任何一行超过最大高度，就用最大高度
                return maxWidth + doublePadding;
            } else if(lineW > width) {
                //自己换行，就要比较每行的最大宽度
                width = lineW;
            }
        }
        return width + doublePadding;
    }
    /**
     * 绘制文字，解决换行问题
     * @param text
     * @param style
     * @param ctx
     * @param lineHeight
     */
    static canvasTextAutoLine(text,style,ctx,lineHeight, canvasWidth) {
        // 字符分隔为数组
        ctx.font = style.font;
        let textAlign = style.textAlign;
        let x = this.getPositionX(textAlign, canvasWidth);
        let arrText = text.split('');
        let line = '', fillColor = style.fillColor;
        //每一行限制的高度
        let maxWidth= style.maxWidth - doublePadding;
        for (var n = 0; n < arrText.length; n++) {
            let testLine = line + arrText[n];
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            if ((testWidth > maxWidth && n > 0) || arrText[n] === '\n') {
                ctx.fillStyle = fillColor;
                ctx.textAlign=textAlign;
                ctx.textBaseline="top";
                ctx.fillText(line, x, this.positionY);
                line = arrText[n];
                this.positionY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillStyle = fillColor;
        ctx.textAlign=textAlign;
        ctx.textBaseline="top";
        ctx.fillText(line, x, this.positionY);
    }
    /**
     * 得到绘制的起点位置，根据align不同，位置也不同
     * @param textAlign
     * @returns {number}
     */
    static getPositionX(textAlign, canvasWidth) {
        let x;
        let width = canvasWidth - doublePadding; //减去padding
        switch (textAlign) {
            case 'center':
                x = width / 2;
                break;
            case 'right':
                x = width;
                break;
            default:
                x = 8;
                break;
        }
        return x;
    }

    /**
     * @function ol.supermap.StyleUtils.hexToRgb
     * @description 将16进制的颜色，转换成rgb格式
     * @param {string} hexColor 16进制颜色
     * @returns {string} rgb格式的颜色
     */
    static hexToRgb (hexColor) {
        if (!hexColor) {
            return;
        }
        var s = hexColor.replace('#', '').split('');
        var rgb = [s[0] + s[1], s[2] + s[3], s[4] + s[5]];
        rgb = rgb.map(function (hex) {
            return parseInt(hex, 16);
        });
        return rgb;
    }

    /**
     * @function ol.supermap.StyleUtils.formatRGB
     * @description 将颜色数组转换成标准的rgb颜色格式
     * @param {Array} colorArray - 颜色数组
     * @returns {String} 'rgb(0,0,0)'或者 rgba(0,0,0,0)
     */
    static formatRGB(colorArray) {
        let rgb;
        if(colorArray.length === 3) {
            rgb = 'rgb(';
            colorArray.forEach(function (color,index) {
                index === 2 ? rgb += color : rgb += color + ',';
            });
        } else {
            rgb = 'rgba(';
            colorArray.forEach(function (color,index) {
                index === 3 ? rgb += color : rgb += color + ',';
            });
        }
        return rgb;
    }

    /**
     * @function ol.supermap.StyleUtils.getCanvasFromSVG
     * @description 将SVG转换成Canvas
     * @param {string} svgUrl - 颜色数组
     * @param {object} divDom - div的dom对象
     * @param {function} callBack - 转换成功执行的回调函数
     */
    static getCanvasFromSVG (svgUrl, divDom, callBack) {
        //一个图层对应一个canvas
        let canvgs = window.canvg ? window.canvg : canvg;
        let canvas = document.createElement('canvas');
        canvas.id = 'dataviz-canvas-' + Util.newGuid(8);
        canvas.style.display = "none";
        divDom.appendChild(canvas);
        try {
            canvgs(canvas.id, svgUrl, {
                ignoreMouse: true,
                ignoreAnimation: true,
                renderCallback: function () {
                    if(canvas.width > 300 || canvas.height > 300) {
                        // Util.showMessage(DataViz.Language.sizeIsWrong,'WARNING');
                        return;
                    }
                    callBack(canvas);
                },
                forceRedraw: function () {
                    return false
                }
            });
        } catch(e) {
            return;
        }
    }

    /**
     * @function ol.supermap.StyleUtils.getMarkerDefaultStyle 获取默认标注图层feature的样式
     * @param featureType {String} feature的类型
     * @param server {String}  当前地图前缀
     * @returns {Object} style对象
     */
    static getMarkerDefaultStyle(featureType, server) {
        let style;
        switch (featureType) {
            case 'POINT':
                style = {
                    src: `${server}apps/dataviz/static/imgs/markers/mark_red.png`,
                    scale: 1,
                    anchor: [0.5, 1]
                };
                break;
            case 'LINE':
            case 'LINESTRING':
            case 'MULTILINESTRING':
                style = {
                    strokeColor: '#3498db',
                    strokeOpacity: 1,
                    strokeWidth: 5,
                    lineCap: 'round',
                    lineDash: 'solid'
                };
                break;
            case 'REGION':
            case 'POLYGON':
            case 'MULTIPOLYGON':
                style = {
                    fillColor: '#1abd9c',
                    fillOpacity: 1,
                    strokeColor: '#3498db',
                    strokeOpacity: 1,
                    strokeWidth: 3,
                    lineCap: 'round',
                    lineDash: 'solid'
                };
                break;
        }
        return style;
    }

    /**
     * @function ol.supermap.StyleUtils.getOpenlayerStyle 获取专题图对应的openlayers格式的style
     * @param styleParams {String} 样式参数
     * @param featureType {String} feature类型
     * @param isRank {Boolean} 是否为等级符号
     * @returns {Object} style对象
     */
    static getOpenlayersStyle(styleParams, featureType, isRank) {
        let style;
        if(styleParams.type === "BASIC_POINT") {
            style = this.toOpenLayersStyle(styleParams, featureType);
        } else if(styleParams.type === "SYMBOL_POINT") {
            style = this.getSymbolStyle(styleParams, isRank);
        } else if(styleParams.type === "SVG_POINT"){
            style = this.getSVGStyle(styleParams);
        } else if (styleParams.type === 'IMAGE_POINT') {
            style = this.getImageStyle(styleParams);
        }
        return style;
    }

    /**
     * @function ol.supermap.StyleUtils.getSymbolStyle 获取符号样式
     * @param {object} parameters - 样式参数
     * @returns {Object} style对象
     */
    static getSymbolStyle(parameters, isRank) {
        let text = '';
        if (parameters.unicode) {
            text = String.fromCharCode(parseInt(parameters.unicode.replace(/^&#x/, ''), 16));
        }
        // 填充色 + 透明度
        let fillColor = StyleUtils.hexToRgb(parameters.fillColor);
        fillColor.push(parameters.fillOpacity);
        // 边框充色 + 透明度
        let strokeColor = StyleUtils.hexToRgb(parameters.strokeColor);
        strokeColor.push(parameters.strokeOpacity);

        let fontSize = isRank ? 2 * parameters.radius + "px" : parameters.fontSize;  

        return new ol.style.Style({
            text: new ol.style.Text({
                text: text,
                font: fontSize + " supermapol-icons",
                placement: 'point',
                textAlign: 'center',
                fill: new ol.style.Fill({
                    color: fillColor
                }),
                backgroundFill: new ol.style.Fill({
                    color: [0, 0, 0, 0]
                }),
                stroke: new ol.style.Stroke({
                    width: parameters.strokeWidth || 0.000001,
                    color: strokeColor
                })
            })
        });
    }
    /**
     * @function ol.supermap.StyleUtils.getSVGStyle 获取svg的样式
     * @param {object} styleParams - 样式参数
     * @returns {Object} style对象
     */
    static getSVGStyle(styleParams) {
        let style, that = this;
        if(!that.svgDiv) {
            that.svgDiv = document.createElement('div');
            document.body.appendChild(that.svgDiv);
        }
        StyleUtils.getCanvasFromSVG(styleParams.url, that.svgDiv, function (canvas) {
            style = new ol.style.Style({
                image: new ol.style.Icon({
                    img:  that.setColorToCanvas(canvas,styleParams),
                    scale: styleParams.radius/canvas.width,
                    imgSize: [canvas.width, canvas.height],
                    anchor : [0.5, 0.5],
                    opacity: styleParams.fillOpacity
                })
            });
        });
        return style;
    }
    
    /**
     * @function ol.supermap.StyleUtils.setColorToCanvas 将颜色，透明度等样式设置到canvas上
     * @param {object} canvas - 渲染的canvas对象
     * @param {object} parameters - 样式参数
     * @returns {Object} style对象
     */
    static setColorToCanvas(canvas, parameters) {
        let context = canvas.getContext('2d');
        let fillColor = StyleUtils.hexToRgb(parameters.fillColor);
        fillColor && fillColor.push(parameters.fillOpacity);
        let strokeColor = StyleUtils.hexToRgb(parameters.strokeColor);
        strokeColor && strokeColor.push(parameters.strokeOpacity);
        context.fillStyle = StyleUtils.formatRGB(fillColor);
        context.fill();
        context.strokeStyle = StyleUtils.formatRGB(strokeColor);
        context.lineWidth = parameters.strokeWidth;
        context.stroke();
        return canvas;
    }
    /**
     * @function ol.supermap.StyleUtils.getImageStyle 获取图片样式
     * @param {object} styleParams - 样式参数
     * @returns {Object} style对象
     */
    static getImageStyle(styleParams) {
        let size = styleParams.imageInfo.size,
            scale = 2 * styleParams.radius / size.w;
        let imageInfo = styleParams.imageInfo;
        let imgDom = imageInfo.img;
        if (!imgDom || !imgDom.src) {
            imgDom = new Image();
            //要组装成完整的url
            imgDom.src = imageInfo.url;
        }
        return new ol.style.Style({
            image: new ol.style.Icon({
                img: imgDom,
                scale,
                imgSize: [size.w, size.h],
                anchor : [0.5, 0.5]
            })
        });
    }

}

ol.supermap.StyleUtils = StyleUtils;