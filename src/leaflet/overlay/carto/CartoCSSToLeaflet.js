/**
 *CartoCSS样式转Leaflet样式
 */
require('../../core/Base');
require('./CartoDeaultStyle');
require('./CartoStyleMap');
var CartoCSS = require('../../../common/style/CartoCSS');
var SuperMap = require('../../../common/SuperMap');
var L = require("leaflet");

L.supermap.CartoCSSToLeaflet = {

    cartoCSS: null,
    mapUrl: null,

    pretreatedCartoCSS: function (cartoStr, processCharacters) {
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
    },

    //替换一些关键符号
    processCharacters: function (cartoCSSStr) {
        var style = cartoCSSStr;
        if (!style) {
            return;
        }
        var me = this;
        style = style.replace(/[@]/gi, "___");
        style = style.replace(/\\#/gi, "___");
        for (var attr in me.layersInfo) {
            var newAttr = attr.replace(/[@#\s]/gi, "___");
            style = style.replace(attr.replace(/[#]/gi, "\\#"), newAttr);
        }
        style = style.replace(/[#]/gi, "\n#");
        //将zoom转化为scale，以免引起混淆
        style = style.replace(/\[zoom/gi, "[scale");
        return style;
    },


    pickShader: function (layerName) {
        if (!this.cartoCSS) {
            return null;
        }
        var name = layerName.replace(/[@#\s]/gi, "___");
        return this.cartoCSS[name];
    },


    getDefaultStyle: function (type) {
        var style = {};
        //设置默认值
        var expandStyle = L.supermap.DefaultStyle[type];
        for (var prop in expandStyle) {
            var val = expandStyle[prop];
            style[prop] = val;
        }
        return style;
    },

    getValidStyleFromCarto: function (zoom, scale, shader, feature, fromServer) {
        if (!shader) {
            return null;
        }
        var type = feature.type,
            attributes = feature.properties.attributes || {},
            style = this.getDefaultStyle(type);
        fromServer = (fromServer === undefined) ? true : fromServer;

        attributes.FEATUREID = feature.properties.id;
        attributes.SCALE = scale;

        var cartoStyleMap = L.supermap.CartoStyleMap[type];

        var fontSize, fontName;
        for (var i = 0, len = shader.length; i < len; i++) {
            var _shader = shader[i];
            var prop = cartoStyleMap[_shader.property];
            var value = _shader.getValue(attributes, zoom, true);
            if ((value !== null) && prop) {
                if (prop === "fontSize") {
                    value = fromServer ? value *= 0.8 : value;
                    fontSize = value + "px";
                    style.fontSize = fontSize;
                } else if (prop === "fontName") {
                    fontName = value;
                } else {
                    if (prop === "globalCompositeOperation") {
                        value = L.supermap.CompOpMap[value];
                        if (!value || value === "")continue;
                    } else if (fromServer && prop === 'iconUrl') {
                        value = this.mapUrl + '/tileFeature/symbols/' + value.replace(/(___)/gi, '@');
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
    },


    getValidStyleFromLayerInfo: function (feature, layerInfo) {
        var type = feature.type,
            style = this.getDefaultStyle(type),
            shader = layerInfo && layerInfo.layerStyle;
        if (!shader) {
            return style;
        }
        if (type === "POINT") {
            var size = Math.ceil(shader.markerSize * SuperMap.DOTS_PER_INCH * SuperMap.INCHES_PER_UNIT["mm"]) || 8;
            var symbolParameters = {
                "transparent": true,
                "resourceType": "SYMBOLMARKER",
                "picWidth": size,
                "picHeight": size,
                "style": JSON.stringify(shader)
            };
            style.iconUrl = SuperMap.Util.urlAppend(this.mapUrl + "/symbol.png", SuperMap.Util.getParameterString(symbolParameters));
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
                var text_h = shader.fontHeight * SuperMap.DOTS_PER_INCH * SuperMap.INCHES_PER_UNIT["mm"] * 0.85;    //毫米转像素,服务端的字体貌似要稍微小一点
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
                style.color = "rgba(" + shader.backColor.red + ","
                    + shader.backColor.green + ","
                    + shader.backColor.blue
                    + ",1)";
            }
            if (shader.foreColor) {
                style.fillColor = "rgba(" + shader.foreColor.red + ","
                    + shader.foreColor.green + ","
                    + shader.foreColor.blue
                    + ",1)";
            }
            style.rotation = shader.rotation || 0;
            return style;
        }
        //目前只实现桌面系统默认的几种symbolID，非系统默认的面用颜色填充替代，线则用实线来替代
        var fillSymbolID = shader["fillSymbolID"] > 7 ? 0 : shader["fillSymbolID"];
        var lineSymbolID = shader["lineSymbolID"] > 5 ? 0 : shader["lineSymbolID"];
        for (var attr in shader) {
            var obj = L.supermap.ServerStyleMap[attr];
            if (!obj) {
                continue;
            }
            var leafletStyle = obj.leafletStyle;
            switch (obj.type) {
                case "number":
                    var value = shader[attr];
                    if (obj.unit) {
                        value = value * SuperMap.DOTS_PER_INCH * SuperMap.INCHES_PER_UNIT[obj.unit] * 2.5;
                    }
                    style[leafletStyle] = value;
                    break;

                case "color":
                    var color = shader[attr];
                    var value, alpha = 1;
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
                default:
                    break;
            }
        }

        //处理标签文本的情况
        if (layerInfo && layerInfo.textField) {
            style.textAlign = "LEFT";
        }
        return style;
    }

};
module.exports = L.supermap.CartoCSSToLeaflet;