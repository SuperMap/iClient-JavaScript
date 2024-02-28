/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util as CommonUtil} from '@supermap/iclient-common/commontypes/Util';
import { GeoText } from '@supermap/iclient-common/commontypes/geometry/GeoText';
import { Bounds } from '@supermap/iclient-common/commontypes/Bounds';
import { ShapeFactory } from '@supermap/iclient-common/overlay/feature/ShapeFactory';
import { ThemeVector } from '@supermap/iclient-common/overlay/ThemeVector';
import { Vector as FeatureVector } from '@supermap/iclient-common/commontypes/Vector';
import {
    GeoFeature
} from './theme/GeoFeature';
import Point from 'ol/geom/Point';

/**
 * @class Label
 * @browsernamespace ol.source
 * @category  Visualization Theme
 * @classdesc 标签专题图图层源。标签专题图是用文本形式在图层上直接显示属性表中的数据，实质上是对图层的标注。
 * 不仅帮助用户更好地区分地物要素，同时也显示了要素的某些重要属性，如行政区划、河流、机关、旅游景点的名称、等高线的高程等。
 * 在 SuperMap 中，通过制作标签专题图，用户可以轻松实现地图标注。
 * @modulecategory Overlay
 * @param {string} name - 名称。
 * @param {Object} opt_options - 参数。
 * @param {ol.Map} opt_options.map - 当前 OpenLayers 地图对象。
 * @param {string} [opt_options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [opt_options.opacity=1] - 图层不透明度。
 * @param {string|Object} [opt_options.attributions] - 版权描述信息。
 * @param {string} [opt_options.logo] - Logo（OpenLayers 5.0.0 及更高版本不再支持此参数）。
 * @param {ol.proj.Projection} [opt_options.projection] - 投影信息。
 * @param {number} [opt_options.ratio=1.5] - 视图比，1 表示画布是地图视口的大小，2 表示地图视口的宽度和高度的两倍，依此类推。必须是 1 或更高。
 * @param {Array.<number>} [opt_options.resolutions] - 分辨率数组。
 * @param {ol.source.State} [opt_options.state] - 资源状态。
 * @param {string} [opt_options.themeField] - 指定创建专题图字段。
 * @param {Object} [opt_options.style] - 专题图样式。
 * @param {Object} [opt_options.styleGroups] - 各专题类型样式组。
 * @param {boolean} [opt_options.isHoverAble = false] - 是否开启 hover 事件。
 * @param {Object} [opt_options.highlightStyle] - 开启 hover 事件后，触发的样式风格。
 * @extends {GeoFeature}
 * @usage
 */
export class Label extends GeoFeature {

    constructor(name, opt_options) {
        super(name, opt_options);
        this.isOverLay = opt_options.isOverLay != null ? opt_options.isOverLay : true;
        this.isAvoid = opt_options.isAvoid != null ? opt_options.isAvoid : true;

        this.style = opt_options.style;
        this.themeField = opt_options.themeField;
        this.styleGroups = opt_options.styleGroups;

        this.defaultStyle = {
            //默认文本样式
            fontColor: "#000000",
            fontOpacity: 1,
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "normal",
            labelAlign: "cm",
            labelXOffset: 0,
            labelYOffset: 0,
            labelRotation: 0,

            //默认背景框样式
            fill: false,
            fillColor: "#ee9900",
            fillOpacity: 0.4,
            stroke: false,
            strokeColor: "#ee9900",
            strokeOpacity: 1,
            strokeWidth: 1,
            strokeLinecap: "round",
            strokeDashstyle: "solid",

            //对用户隐藏但必须保持此值的属性
            //cursor: "pointer",
            labelSelect: true,

            //用  _isGeoTextStrategyStyle 标记此style，携带此类style的要素特指GeoText策略中的标签要素
            _isGeoTextStrategyStyle: true
        };

        //获取标签像素 bounds 的方式。0 - 表示通过文本类容和文本风格计算获取像素范围，现在支持中文、英文; 1 - 表示通过绘制的文本标签获取像素范围，支持各个语种的文字范围获取，但性能消耗较大（尤其是采用 SVG 渲染）。默认值为 0。
        this.getPxBoundsMode = 0;

        this.labelFeatures = [];
    }

    /**
     * @function Label.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.style = null;
        this.themeField = null;
        this.styleGroups = null;
        super.destroy();
    }

    /**
     * @private
     * @function Label.prototype.createThematicFeature
     * @description 创建专题要素。
     * @param {FeatureVector} feature - 矢量要素。
     * @returns {FeatureThemeVector} 专题图矢量要素。
     */
    createThematicFeature(feature) {
        //赋 style
        var style = this.getStyleByData(feature);
        //创建专题要素时的可选参数
        var options = {};
        options.nodesClipPixel = this.nodesClipPixel;
        options.isHoverAble = this.isHoverAble;
        options.isMultiHover = this.isMultiHover;
        options.isClickAble = this.isClickAble;
        options.highlightStyle = ShapeFactory.transformStyle(this.highlightStyle);
        //将数据转为专题要素（Vector）
        var thematicFeature = new ThemeVector(feature, this, ShapeFactory.transformStyle(style), options);
        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            this.renderer.addShape(thematicFeature.shapes[m]);
        }
        return thematicFeature;
    }


    /**
     * @function Label.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     *              此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
     *              地图漫游时调用此方法进行图层刷新。
     * @param {Array.<number>} bounds - 重绘范围。
     */
    redrawThematicFeatures(bounds) {
        if (this.features.length > 0 && this.labelFeatures.length === 0) {
            var feats = this.setLabelsStyle(this.features);
            for (var i = 0, len = feats.length; i < len; i++) {
                this.labelFeatures.push(feats[i]);
            }
        }
        this.features = this.getDrawnLabels(this.labelFeatures);
        super.redrawThematicFeatures.call(this, bounds);
    }
    /**
     * @function Label.prototype.removeFeatures
     * @description 从专题图中删除要素。这个函数删除所有传递进来的矢量要素。
     * @param {(Array.<FeatureVector>|FeatureVector|Function)} features - 待删除的要素对象或用于过滤的回调函数。
     */
    removeFeatures(features) { // eslint-disable-line no-unused-vars
        this.labelFeatures = [];
        super.removeFeatures.call(this, features);
    }

    /**
     * @function Label.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        this.labelFeatures = [];
        super.removeAllFeatures.call(this, arguments);
    }
    /**
     * @function Label.prototype.getDrawnLabels
     * @description 获取经（压盖）处理后将要绘制在图层上的标签要素。
     * @param {Array.<FeatureVector>} labelFeatures - 所有标签要素的数组。
     * @returns {Array.<FeatureVector>}  最终要绘制的标签要素数组。
     */
    getDrawnLabels(labelFeatures) {
        var feas = [], //最终要绘制的标签要素集
            fea, //最终要绘制的标签要素
            fi, //临时标签要素，用户的第i个标签
            labelsB = [], //不产生压盖的标签要素范围集
            styTmp, //用于临时存储要素style的变量
            feaSty, //标签要素最终的style
            // styleTemp用于屏蔽文本style中带有偏移性质style属性，偏移已经在计算bounds的过程中参与了运算，
            // 所以在最终按照bounds来绘制标签时，需屏蔽style中带有偏移性质属性，否则文本的偏移量将扩大一倍。
            styleTemp = {
                labelAlign: "cm",
                labelXOffset: 0,
                labelYOffset: 0
            };

        var map = this.map;
        var mapSize = map.getSize();
        mapSize = {
            x: mapSize[0],
            y: mapSize[1]
        };
        var zoom = map.getView().getZoom();
        //对用户的每个标签要素进行处理与判断
        for (var i = 0, len = labelFeatures.length; i < len; i++) {
            fi = labelFeatures[i];
            //检查fi的style在避让中是否被改变，如果改变，重新设置要素的style
            if (fi.isStyleChange) {
                fi = this.setStyle(fi);
            }

            //标签最终的中心点像素位置 （偏移后）
            var loc = this.getLabelPxLocation(fi);

            //过滤掉地图范围外的标签 （偏移后）
            if ((loc.x >= 0 && loc.x <= mapSize.x) && (loc.y >= 0 && loc.y <= mapSize.y)) {
                //根据当前地图缩放级别过滤标签
                if (fi.style.minZoomLevel > -1) {
                    if (zoom <= fi.style.minZoomLevel) {
                        continue;
                    }
                }
                if (fi.style.maxZoomLevel > -1) {
                    if (zoom > fi.style.maxZoomLevel) {
                        continue;
                    }
                }

                //计算标签bounds
                var boundsQuad = null;
                if (fi.isStyleChange) {
                    fi.isStyleChange = null;
                    boundsQuad = this.calculateLabelBounds(fi, loc);
                } else {
                    if (fi.geometry.bsInfo.w && fi.geometry.bsInfo.h) {
                        //使用calculateLabelBounds2可以提高bounds的计算效率，尤其是在getPxBoundsMode = 1时
                        boundsQuad = this.calculateLabelBounds2(fi, loc);
                    } else {
                        boundsQuad = this.calculateLabelBounds(fi, loc);
                    }
                }

                //避让处理 -start
                var mapViewBounds = new Bounds(0, mapSize.y, mapSize.x, 0), //地图像素范围
                    quadlen = boundsQuad.length;

                if (this.isAvoid) {
                    var avoidInfo = this.getAvoidInfo(mapViewBounds, boundsQuad); //避让信息

                    if (avoidInfo) {
                        //横向（x方向）上的避让
                        if (avoidInfo.aspectW === "left") {
                            fi.style.labelXOffset += avoidInfo.offsetX;

                            for (let j = 0; j < quadlen; j++) {
                                boundsQuad[j].x += avoidInfo.offsetX;
                            }
                        } else if (avoidInfo.aspectW === "right") {
                            fi.style.labelXOffset += (-avoidInfo.offsetX);

                            for (let j = 0; j < quadlen; j++) {
                                boundsQuad[j].x += (-avoidInfo.offsetX);
                            }
                        }

                        //纵向（y方向）上的避让
                        if (avoidInfo.aspectH === "top") {
                            fi.style.labelYOffset += avoidInfo.offsetY;

                            for (let j = 0; j < quadlen; j++) {
                                boundsQuad[j].y += avoidInfo.offsetY;
                            }
                        } else if (avoidInfo.aspectH === "bottom") {
                            fi.style.labelYOffset += (-avoidInfo.offsetY);

                            for (let j = 0; j < quadlen; j++) {
                                boundsQuad[j].y += (-avoidInfo.offsetY);
                            }
                        }

                        //如果style发生变化，记录下来
                        fi.isStyleChange = true;
                    }
                }
                //避让处理 -end

                //压盖处理 -start
                if (this.isOverLay) {
                    //是否压盖
                    var isOL = false;
                    if (i != 0) {
                        for (let j = 0; j < labelsB.length; j++) {
                            //压盖判断
                            if (this.isQuadrilateralOverLap(boundsQuad, labelsB[j])) {
                                isOL = true;
                                break;
                            }
                        }
                    }

                    if (isOL) {
                        continue;
                    } else {
                        labelsB.push(boundsQuad);
                    }
                }
                //压盖处理 -end

                //将标签像素范围转为地理范围
                var geoBs = [];
                for (let j = 0; j < quadlen - 1; j++) {
                    geoBs.push(map.getCoordinateFromPixel([boundsQuad[j].x, boundsQuad[j].y]));
                }

                //屏蔽有偏移性质的style属性,偏移量在算bounds时已经加入计算
                var bounds = new Bounds(geoBs[3][0], geoBs[3][1], geoBs[1][0], [geoBs[1][1]]);
                var center = bounds.getCenterLonLat();
                var label = new GeoText(center.lon, center.lat, fi.attributes[this.themeField]);
                label.calculateBounds();
                styTmp = CommonUtil.cloneObject(fi.style);
                feaSty = CommonUtil.cloneObject(CommonUtil.copyAttributes(styTmp, styleTemp));
                fea = new FeatureVector(label, fi.attributes, feaSty);
                //赋予id
                fea.id = fi.id;
                fea.fid = fi.fid;
                feas.push(fea);
            }
        }

        //返回最终要绘制的标签要素
        return feas;
    }

    /**
     * @function Label.prototype.getStyleByData
     * @description 根据用户数据（feature）设置专题要素的风格。
     * @param {FeatureVector} feat - 矢量要素对象。
     * @returns {Array.<ThemeStyle>} 专题要素的风格。
     */
    getStyleByData(feat) {
        var feature = feat;
        feature.style = CommonUtil.copyAttributes(feature.style, this.defaultStyle);
        //将style赋给标签
        if (this.style && this.style.fontSize && parseFloat(this.style.fontSize) < 12) {
            this.style.fontSize = "12px";
        }
        feature.style = CommonUtil.copyAttributes(feature.style, this.style);

        if (this.themeField && this.styleGroups && feature.attributes) {
            var Sf = this.themeField;
            var attributes = feature.attributes;
            var groups = this.styleGroups;
            var isSfInAttrs = false; //指定的 groupField 是否是geotext的属性字段之一
            var attr = null; //属性值

            for (var property in attributes) {
                if (Sf === property) {
                    isSfInAttrs = true;
                    attr = attributes[property];
                    break;
                }
            }

            //判断属性值是否属于styleGroups的某一个范围，以便对标签分组
            if (isSfInAttrs) {
                for (var i = 0, len = groups.length; i < len; i++) {
                    if ((attr >= groups[i].start) && (attr < groups[i].end)) {
                        var sty1 = groups[i].style;
                        if (sty1 && sty1.fontSize && parseFloat(sty1.fontSize) < 12) {
                            sty1.fontSize = "12px";
                        }
                        feature.style = CommonUtil.copyAttributes(feature.style, sty1);
                    }
                }
            }
            feature.style.label = feature.attributes[this.themeField]
        }


        return feature.style;
    }

    /**
     * @function Label.prototype.setLabelsStyle
     * @description 设置标签要素的风格。
     * @param {Array.<FeatureVector>} labelFeatures - 需要设置风格的标签要素数组。
     * @returns {Array.<FeatureVector>} 赋予风格后的标签要素数组。
     */
    setLabelsStyle(labelFeatures) {
        var fea, labelFeas = [];
        for (var i = 0, len = labelFeatures.length; i < len; i++) {
            var feature = labelFeatures[i];
            if (feature.geometry.CLASS_NAME === "SuperMap.Geometry.GeoText") {
                //设置标签的Style
                if (feature.geometry.bsInfo.w || feature.geometry.bsInfo.h) {
                    feature.geometry.bsInfo.w = null;
                    feature.geometry.bsInfo.h = null;
                    feature.geometry.labelWTmp = null;
                }
                fea = this.setStyle(feature);
                //为标签要素指定图层
                fea.layer = this.layer;
                labelFeas.push(fea);
            } else {
                return labelFeatures;
            }
        }
        return labelFeas;
    }

    /**
     * @function Label.prototype.setStyle
     * @description 设置标签要素的风格。
     * @param {FeatureVector} feat - 需要赋予风格的要素。
     */
    setStyle(feat) {
        var feature = feat;
        feature.style = CommonUtil.copyAttributes(feature.style, this.defaultStyle);
        //将style赋给标签
        if (this.style && this.style.fontSize && parseFloat(this.style.fontSize) < 12) {
            this.style.fontSize = "12px";
        }
        feature.style = CommonUtil.copyAttributes(feature.style, this.style);

        if (this.groupField && this.styleGroups && feature.attributes) {
            var Sf = this.groupField;
            var attributes = feature.attributes;
            var groups = this.styleGroups;
            var isSfInAttrs = false; //指定的 groupField 是否是geotext的属性字段之一
            var attr = null; //属性值

            for (var property in attributes) {
                if (Sf === property) {
                    isSfInAttrs = true;
                    attr = attributes[property];
                    break;
                }
            }

            //判断属性值是否属于styleGroups的某一个范围，以便对标签分组
            if (isSfInAttrs) {
                for (var i = 0, len = groups.length; i < len; i++) {
                    if ((attr >= groups[i].start) && (attr < groups[i].end)) {
                        var sty1 = groups[i].style;
                        if (sty1 && sty1.fontSize && parseFloat(sty1.fontSize) < 12) {
                            sty1.fontSize = "12px";
                        }
                        feature.style = CommonUtil.copyAttributes(feature.style, sty1);
                    }
                }
            }
        }

        //将文本内容赋到标签要素的style上
        feature.style.label = feature.geometry.text;

        return feature;
    }

    /**
     * @function Label.prototype.getLabelPxLocation
     * @description 获取标签要素的像素坐标。
     * @param {FeatureVector} feature - 标签要素。
     * @returns {Object} 标签位置，例如：{"x":1,"y":1}。
     */
    getLabelPxLocation(feature) {
        var geoText = feature.geometry;
        var styleTmp = feature.style;

        //将标签的地理位置转为像素位置
        var locationTmp = geoText.getCentroid();
        var locTmp = this.map.getPixelFromCoordinate([locationTmp.x, locationTmp.y]);
        var loc = new Point([locTmp[0], locTmp[1]]);

        //偏移处理
        if (styleTmp.labelXOffset || styleTmp.labelYOffset) {
            var xOffset = isNaN(styleTmp.labelXOffset) ? 0 : styleTmp.labelXOffset;
            var yOffset = isNaN(styleTmp.labelYOffset) ? 0 : styleTmp.labelYOffset;
            loc.translate(xOffset, -yOffset);
        }
        return {
            x: loc.getCoordinates()[0],
            y: loc.getCoordinates()[1]
        };
    }


    /**
     * @function Label.prototype.calculateLabelBounds
     * @description 获得标签要素的最终范围。
     * @param {FeatureVector} feature - 需要计算范围的标签要素数。
     * @param {Object} loc - 标签位置，例如：{"x":1,"y":1}。
     * @returns {Array.<Object>}  四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    calculateLabelBounds(feature, loc) {
        var geoText = feature.geometry;

        //标签范围（未旋转前）
        var labB = null;
        var labelInfo = null;
        //获取bounds的方式
        if (this.getPxBoundsMode == 0) {
            labB = geoText.getLabelPxBoundsByText(loc, feature.style);
        } else if (this.getPxBoundsMode === 1) {
            //canvas
            labelInfo = this.getLabelInfo(feature.geometry.getCentroid(), feature.style);
            labB = geoText.getLabelPxBoundsByLabel(loc, labelInfo.w, labelInfo.h, feature.style);
        } else {
            return null;
        }

        //旋转Bounds
        var boundsQuad = [];
        if ((feature.style.labelRotation % 180) == 0) {
            boundsQuad = [{
                    "x": labB.left,
                    "y": labB.top
                },
                {
                    "x": labB.right,
                    "y": labB.top
                },
                {
                    "x": labB.right,
                    "y": labB.bottom
                },
                {
                    "x": labB.left,
                    "y": labB.bottom
                },
                {
                    "x": labB.left,
                    "y": labB.top
                }
            ];
        } else {
            boundsQuad = this.rotationBounds(labB, loc, feature.style.labelRotation);
        }

        //重置GeoText的bounds
        geoText.bounds = new Bounds(boundsQuad[1].x, boundsQuad[3].y, boundsQuad[2].x, boundsQuad[4].y);
        return boundsQuad;
    }

    /**
     * @function Label.prototype.calculateLabelBounds2
     * @description 获得标签要素的最终范围的另一种算法（通过记录下的标签宽高），提高计算范围的效率。
     * @param {FeatureVector} feature - 需要计算范围的标签要素数。
     * @param {Object} loc - 标签位置，例如：{"x":1,"y":1}。
     * @returns {Array.<Object>} 四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    calculateLabelBounds2(feature, loc) {
        var labB, left, bottom, top, right;
        var labelSize = feature.geometry.bsInfo;
        var style = feature.style;
        var locationPx = CommonUtil.cloneObject(loc);

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

        left = locationPx.x - labelSize.w / 2;
        bottom = locationPx.y + labelSize.h / 2;
        //处理斜体字
        if (style.fontStyle && style.fontStyle === "italic") {
            right = locationPx.x + labelSize.w / 2 + parseInt(parseFloat(style.fontSize) / 2);
        } else {
            right = locationPx.x + labelSize.w / 2;
        }
        top = locationPx.y - labelSize.h / 2;

        labB = new Bounds(left, bottom, right, top);

        //旋转Bounds
        var boundsQuad = [];
        if ((style.labelRotation % 180) == 0) {
            boundsQuad = [{
                    "x": labB.left,
                    "y": labB.top
                },
                {
                    "x": labB.right,
                    "y": labB.top
                },
                {
                    "x": labB.right,
                    "y": labB.bottom
                },
                {
                    "x": labB.left,
                    "y": labB.bottom
                },
                {
                    "x": labB.left,
                    "y": labB.top
                }
            ];
        } else {
            boundsQuad = this.rotationBounds(labB, loc, style.labelRotation);
        }

        //重置GeoText的bounds
        feature.geometry.bounds = new Bounds(boundsQuad[1].x, boundsQuad[3].y, boundsQuad[2].x, boundsQuad[4].y);
        return boundsQuad;
    }

    /**
     * @function Label.prototype.getLabelInfo
     * @description 根据当前位置获取绘制后的标签信息，包括标签的宽，高和行数等。
     * @returns {Object} 绘制后的标签信息。
     */
    getLabelInfo(location, style) {
        var LABEL_ALIGN = {
                "l": "left",
                "r": "right",
                "t": "top",
                "b": "bottom"
            },
            LABEL_FACTOR = {
                "l": 0,
                "r": -1,
                "t": 0,
                "b": -1
            };

        style = CommonUtil.extend({
            fontColor: "#000000",
            labelAlign: "cm"
        }, style);
        var pt = this.getLocalXY(location);
        var labelWidth = 0;

        if (style.labelXOffset || style.labelYOffset) {
            var xOffset = isNaN(style.labelXOffset) ? 0 : style.labelXOffset;
            var yOffset = isNaN(style.labelYOffset) ? 0 : style.labelYOffset;
            pt[0] += xOffset;
            pt[1] -= yOffset;
        }

        var canvas = document.createElement('canvas');
        canvas.globalAlpha = 0;
        canvas.lineWidth = 1;

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = style.fontColor;
        ctx.globalAlpha = style.fontOpacity || 1.0;
        var fontStyle = [style.fontStyle ? style.fontStyle : "normal",
            "normal",
            style.fontWeight ? style.fontWeight : "normal",
            style.fontSize ? style.fontSize : "1em",
            style.fontFamily ? style.fontFamily : "sans-serif"
        ].join(" ");
        var labelRows = style.label.split('\n');
        var numRows = labelRows.length;
        var vfactor, lineHeight, labelWidthTmp;
        if (ctx.fillText) {
            // HTML5
            ctx.font = fontStyle;
            ctx.textAlign = LABEL_ALIGN[style.labelAlign[0]] ||
                "center";
            ctx.textBaseline = LABEL_ALIGN[style.labelAlign[1]] ||
                "middle";
            vfactor = LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            lineHeight = ctx.measureText('Mg').height ||
                ctx.measureText('xx').width;
            pt[1] += lineHeight * vfactor * (numRows - 1);
            for (let i = 0; i < numRows; i++) {
                labelWidthTmp = ctx.measureText(labelRows[i]).width;
                if (labelWidth < labelWidthTmp) {
                    labelWidth = labelWidthTmp;
                }
            }
        } else if (ctx.mozDrawText) {
            // Mozilla pre-Gecko1.9.1 (<FF3.1)
            ctx.mozTextStyle = fontStyle;
            vfactor = LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            lineHeight = ctx.mozMeasureText('xx');
            pt[1] += lineHeight * (1 + (vfactor * numRows));
            for (let i = 0; i < numRows; i++) {
                labelWidthTmp = ctx.measureText(labelRows[i]).width;
                if (labelWidth < labelWidthTmp) {
                    labelWidth = labelWidthTmp;
                }
            }
        }
        var labelInfo = {}; //标签信息
        if (labelWidth) {
            labelInfo.w = labelWidth; //标签的宽
        } else {
            return null;
        }

        labelInfo.h = style.fontSize; //一行标签的高
        labelInfo.rows = labelRows.length; //标签的行数

        return labelInfo;
    }

    /**
     * @function Label.prototype.rotationBounds
     * @description 旋转 bounds。
     * @param {Bounds} bounds - 要旋转的 bounds。
     * @param {Object} rotationCenterPoi - 旋转中心点对象，此对象含有属性 x（横坐标），属性 y（纵坐标）。
     * @param {number} angle - 旋转角度（顺时针）。
     * @returns {Array.<Object>} bounds 旋转后形成的多边形节点数组。是一个四边形，形如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    rotationBounds(bounds, rotationCenterPoi, angle) {
        var ltPoi = new Point([bounds.left, bounds.top]);
        var rtPoi = new Point([bounds.right, bounds.top]);
        var rbPoi = new Point([bounds.right, bounds.bottom]);
        var lbPoi = new Point([bounds.left, bounds.bottom]);

        var ver = [];
        ver.push(this.getRotatedLocation(ltPoi.getCoordinates()[0], ltPoi.getCoordinates()[1], rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(rtPoi.getCoordinates()[0], rtPoi.getCoordinates()[1], rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(rbPoi.getCoordinates()[0], rbPoi.getCoordinates()[1], rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(lbPoi.getCoordinates()[0], lbPoi.getCoordinates()[1], rotationCenterPoi.x, rotationCenterPoi.y, angle));

        //bounds旋转后形成的多边形节点数组
        var quad = [];

        for (var i = 0; i < ver.length; i++) {
            quad.push({
                "x": ver[i].x,
                "y": ver[i].y
            });
        }
        quad.push({
            "x": ver[0].x,
            "y": ver[0].y
        });
        return quad;
    }

    /**
     * @function Label.prototype.getRotatedLocation
     * @description 获取一个点绕旋转中心顺时针旋转后的位置。（此方法用于屏幕坐标）。
     * @param {number} x - 旋转点横坐标。
     * @param {number} y - 旋转点纵坐标。
     * @param {number} rx - 旋转中心点横坐标。
     * @param {number} ry - 旋转中心点纵坐标。
     * @param {number} angle - 旋转角度。
     * @returns {Object} 旋转后的坐标位置对象，该对象含有属性 x（横坐标），属性 y（纵坐标）。
     */
    getRotatedLocation(x, y, rx, ry, angle) {
        var loc = {},
            x0, y0;

        y = -y;
        ry = -ry;
        angle = -angle; //顺时针旋转
        x0 = (x - rx) * Math.cos((angle / 180) * Math.PI) - (y - ry) * Math.sin((angle / 180) * Math.PI) + rx;
        y0 = (x - rx) * Math.sin((angle / 180) * Math.PI) + (y - ry) * Math.cos((angle / 180) * Math.PI) + ry;

        loc.x = x0;
        loc.y = -y0;

        return loc;
    }

    /**
     * @function Label.prototype.getAvoidInfo
     * @description 获取避让的信息。
     * @param {Bounds} bounds - 地图像素范围。
     * @param {Array.<Object>} quadrilateral - 四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     * @returns {Object} 避让的信息。
     */
    getAvoidInfo(bounds, quadrilateral) {
        if (quadrilateral.length !== 5) {
            return null;
        } //不是四边形

        //将bound序列化为点数组形式
        var bounddQuad = [{
                "x": bounds.left,
                "y": bounds.top
            },
            {
                "x": bounds.right,
                "y": bounds.top
            },
            {
                "x": bounds.right,
                "y": bounds.bottom
            },
            {
                "x": bounds.left,
                "y": bounds.bottom
            },
            {
                "x": bounds.left,
                "y": bounds.top
            }
        ];

        var isIntersection = false,
            bqLen = bounddQuad.length,
            quadLen = quadrilateral.length;

        var offsetX = 0,
            offsetY = 0,
            aspectH = "",
            aspectW = "";
        for (var i = 0; i < bqLen - 1; i++) {
            for (var j = 0; j < quadLen - 1; j++) {
                var isLineIn = CommonUtil.lineIntersection(bounddQuad[i], bounddQuad[i + 1], quadrilateral[j], quadrilateral[j + 1]);
                if (isLineIn.CLASS_NAME === "SuperMap.Geometry.Point") {
                    //设置避让信息
                    setInfo(quadrilateral[j]);
                    setInfo(quadrilateral[j + 1]);
                    isIntersection = true;
                }
            }
        }

        if (isIntersection) {
            //组织避让操作所需的信息
            return {
                "aspectW": aspectW,
                "aspectH": aspectH,
                "offsetX": offsetX,
                "offsetY": offsetY
            };
        } else {
            return null;
        }


        //内部函数：设置避让信息
        //参数：vec-{Object}  quadrilateral四边形单个节点。如：{"x":1,"y":1}。
        function setInfo(vec) {
            //四边形不在bounds内的节点
            if (!bounds.contains(vec.x, vec.y)) {
                //bounds的Top边
                if (vec.y < bounds.top) {
                    let oY = Math.abs(bounds.top - vec.y);
                    if (oY > offsetY) {
                        offsetY = oY;
                        aspectH = "top";
                    }
                }

                //bounds的Bottom边
                if (vec.y > bounds.bottom) {
                    let oY = Math.abs(vec.y - bounds.bottom);
                    if (oY > offsetY) {
                        offsetY = oY;
                        aspectH = "bottom";
                    }
                }

                //bounds的left边
                if (vec.x < bounds.left) {
                    let oX = Math.abs(bounds.left - vec.x);
                    if (oX > offsetX) {
                        offsetX = oX;
                        aspectW = "left";
                    }
                }

                //bounds的right边
                if (vec.x > bounds.right) {
                    let oX = Math.abs(vec.x - bounds.right);
                    if (oX > offsetX) {
                        offsetX = oX;
                        aspectW = "right";
                    }
                }
            }
        }

    }


    /**
     * @function Label.prototype.isQuadrilateralOverLap
     * @description 判断两个四边形是否有压盖。
     * @param {Array.<Object>} quadrilateral - 四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     * @param {Array.<Object>} quadrilateral2 - 第二个四边形节点数组。
     * @returns {boolean} 是否压盖，true 表示压盖。
     */
    isQuadrilateralOverLap(quadrilateral, quadrilateral2) {
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if (quadLen !== 5 || quad2Len !== 5) {
            return null;
        } //不是四边形

        var OverLap = false;
        //如果两四边形互不包含对方的节点，则两个四边形不相交
        for (let i = 0; i < quadLen; i++) {
            if (this.isPointInPoly(quadrilateral[i], quadrilateral2)) {
                OverLap = true;
                break;
            }
        }
        for (let i = 0; i < quad2Len; i++) {
            if (this.isPointInPoly(quadrilateral2[i], quadrilateral)) {
                OverLap = true;
                break;
            }
        }
        //加上两矩形十字相交的情况
        for (let i = 0; i < quadLen - 1; i++) {
            if (OverLap) {
                break;
            }
            for (var j = 0; j < quad2Len - 1; j++) {
                var isLineIn = CommonUtil.lineIntersection(quadrilateral[i], quadrilateral[i + 1], quadrilateral2[j], quadrilateral2[j + 1]);
                if (isLineIn.CLASS_NAME === "SuperMap.Geometry.Point") {
                    OverLap = true;
                    break;
                }
            }
        }

        return OverLap;
    }

    /**
     * @function Label.prototype.isPointInPoly
     * @description 判断一个点是否在多边形里面（射线法）。
     * @param {Object} pt - 需要判定的点对象，该对象含有属性 x（横坐标），属性 y（纵坐标）。
     * @param {Array.<Object>} poly - 多边形节点数组。例如一个四边形：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     * @returns {boolean} 点是否在多边形内。
     */
    isPointInPoly(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) &&
            (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) &&
            (isIn = !isIn);
        }
        return isIn;
    }


    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return super.canvasFunctionInternal_.apply(this, arguments);
    }
}
