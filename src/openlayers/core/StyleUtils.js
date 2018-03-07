import ol from 'openlayers';
import {SuperMap, CommonUtil, StringExt} from '@supermap/iclient-common';
import {StyleMap} from '../overlay/vectortile/StyleMap';
import {DeafultCanvasStyle} from '../overlay/vectortile/DeafultCanvasStyle';

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.StyleUtils
 * @classdesc 样式工具类
 * @private
 */
export class StyleUtils {

    /**
     * @function ol.supermap.StyleUtils.getValidStyleFromLayerInfo
     * @description 通过图层信息获取有效的样式
     * @param layerInfo - {Object} 图层信息
     * @param feature - [{ol.Feature}]{@linkdoc-openlayers/ol.Feature} 要素
     * @param url - {string} 图层数据地址
     * @return {ol.style.Style} 返回图层样式
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
     * @description 从Carto中获取有效的样式
     * @param zoom -{number} 缩放级别
     * @param scale - {number} 比例尺
     * @param shader -{Array} 渲染器对象数组
     * @param feature -{Object} 要素
     * @param fromServer -{string} 服务源
     * @param url -{string} 地址
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
                            if (!value || value === "") {
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
     * @description 点样式
     * @param style -{Object} 样式参数
     * @return {ol.style.Style} 获取点样式
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
     * @description 线样式
     * @param style -{Object} 样式参数
     * @return {ol.style.Style} 获取线的样式
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
     * @description 面样式
     * @param style -{Object} 样式参数
     * @return {ol.style.Style} 获取面的样式
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
     * @description 文本样式
     * @param style -{Object} 样式对象
     * @param text -{string} 文本参数
     * @return {ol.style.Style} 获取的文本样式
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
     * @description 符号样式
     * @param style -{Object} 样式参数
     * @param widthFactor -{number} 宽度系数
     */
    static dashStyle(style, widthFactor) {
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
                if (CommonUtil.isArray(str)) {
                    return str;
                }
                str = StringExt.trim(str).replace(/\s+/g, ",");
                return str.replace(/\[|\]/gi, "").split(",");
        }
    }

    /**
     * @function ol.supermap.StyleUtils.getStyleFromiPortalMarker
     * @description 从iPortal标记获取样式
     * @param icon -{Object} 图标参数
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
     * @description 从iPortal标记获取样式
     * @param iPortalStyle -{Object} iportal样式
     * @param type - {string} 样式类型
     * @param fStyle -{Object} 要素样式
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
     * @description 十六进制转RGBA格式
     * @param hex -{Object} 十六进制格式参数
     * @param opacity -{number} Alpha参数
     * @return {string} 生成的RGBA格式
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
     * @param type -{string} 类型参数

     */
    static getDefaultStyle(type) {
        var style = style || {};
        var canvasStyle = DeafultCanvasStyle[type];
        for (var prop in canvasStyle) {
            var val = canvasStyle[prop];
            style[prop] = val;
        }
        return style;
    }
}

ol.supermap.StyleUtils = StyleUtils;