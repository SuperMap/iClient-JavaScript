/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Geometry} from '../commontypes/Geometry';
import {Util as CommonUtil} from '../commontypes/Util';
import {Theme} from './feature/Theme';
import {Rectangle} from '../commontypes/geometry/Rectangle';
import {Point} from '../commontypes/geometry/Point';
import {Collection} from '../commontypes/geometry/Collection';
import {MultiPoint} from '../commontypes/geometry/MultiPoint';
import {LineString} from '../commontypes/geometry/LineString';
import {MultiLineString} from '../commontypes/geometry/MultiLineString';
import {LinearRing} from '../commontypes/geometry/LinearRing';
import {Polygon} from '../commontypes/geometry/Polygon';
import {MultiPolygon} from '../commontypes/geometry/MultiPolygon';
import {Curve} from '../commontypes/geometry/Curve';
import {GeoText} from '../commontypes/geometry/GeoText';
import {SmicPoint} from './levelRenderer/SmicPoint';
import {SmicBrokenLine} from './levelRenderer/SmicBrokenLine';
import {SmicText} from './levelRenderer/SmicText';
import {SmicRectangle} from './levelRenderer/SmicRectangle';
import {SmicPolygon} from './levelRenderer/SmicPolygon';
import {LonLat} from '../commontypes/LonLat';


/**
 * @class FeatureThemeVector
 * @aliasclass Feature.Theme.ThemeVector
 * @deprecatedclass SuperMap.Feature.Theme.ThemeVector
 * @classdesc 矢量专题要素类。
 * @category Visualization Theme
 * @extends FeatureTheme
 * @param {FeatureVector} data - 用户数据，的类型为矢量数据 feature。
 * @param {SuperMap.Layer} layer - 此专题要素所在图层。
 * @param {Object} style - 样式。
 * @param {Object} options - 创建专题要素时的可选参数。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离，单位：像素。
 * @param {boolean} [options.isHoverAble=true] - 图形是否可 hover。
 * @param {boolean} [options.isMultiHover=true] - 是否使用多图形高亮，isHoverAble 为 true 时生效。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {Object} [options.highlightStyle] - 高亮样式。
 * @usage
 */
export class ThemeVector extends Theme {

    constructor(data, layer, style, options, shapeOptions) {
        super(data, layer);
        //数据的 geometry 属性必须存在且类型是 Geometry 或其子类的类型
        if (!data.geometry) {
            return;
        }
        if (!(data.geometry instanceof Geometry)) {
            return;
        }

        /**
         * @member {Bounds} [FeatureThemeVector.prototype.dataBounds]
         * @description 用户数据的（feature.geometry）地理范围。
         */
        this.dataBounds = data.geometry.getBounds();

        /**
         * @member {number} [FeatureThemeVector.prototype.nodesClipPixel=2]
         * @description 节点抽稀像素距离。
         */
        this.nodesClipPixel = 2;

        /**
         * @member {boolean} [FeatureThemeVector.prototype.isHoverAble=true]
         * @description 图形是否可 hover。
         */
        this.isHoverAble = true;

        /**
         * @member {boolean} [FeatureThemeVector.prototype.isMultiHover=true]
         * @description 是否使用多图形高亮，isHoverAble 为 true 时生效。
         */
        this.isMultiHover = true;

        /**
         * @member {boolean} [FeatureThemeVector.prototype.isClickAble=true]
         * @description 图形是否可点击。
         */
        this.isClickAble = true;

        /**
         * @member {Object} [FeatureThemeVector.prototype.highlightStyle]
         * @description 高亮样式。
         */
        this.highlightStyle = null;

        /**
         * @member {Object} [FeatureThemeVector.prototype.shapeOptions]
         * @description 添加到渲染器前修改 shape 的一些属性，非特殊情况通常不允许这么做。
         */
        this.shapeOptions = {};

        /**
         * @member {Object} [FeatureThemeVector.prototype.style]
         * @description 可视化图形的 style。在子类中规定其对象结构和默认属性值。
         */
        this.style = style || {};


        this.CLASS_NAME = "SuperMap.Feature.Theme.Vector";
        this.style = style ? style : {};
        if (options) {
            CommonUtil.copyAttributesWithClip(this, options, ["shapeOptions", "dataBounds"])
        }
        if (shapeOptions) {
            CommonUtil.copyAttributesWithClip(this.shapeOptions, shapeOptions);
        }

        //设置基础参数 dataBounds、lonlat、location
        var geometry = data.geometry;
        this.lonlat = this.dataBounds.getCenterLonLat();
        this.location = this.getLocalXY(this.lonlat);

        //将地理要素转为专题要素
        if (geometry instanceof LinearRing) {
            this.lineToTF(geometry);
        } else if (geometry instanceof LineString) {
            this.lineToTF(geometry);
        } else if (geometry instanceof Curve) {
            //独立几何体
        } else if (geometry instanceof MultiPoint) {
            this.multiPointToTF(geometry);
        } else if (geometry instanceof MultiLineString) {

            this.multiLineStringToTF(geometry);
        } else if (geometry instanceof MultiPolygon) {
            this.multiPolygonToTF(geometry);
        } else if (geometry instanceof Polygon) {
            this.polygonToTF(geometry);
        } else if (geometry instanceof Collection) {
            //独立几何体
        } else if (geometry instanceof Point) {
            this.pointToTF(geometry);
        } else if (geometry instanceof Rectangle) {
            this.rectangleToTF(geometry);
        } else if (geometry instanceof GeoText) {
            this.geoTextToTF(geometry);
        }

    }

    /**
     * @function FeatureThemeVector.prototype.destroy
     * @override
     */
    destroy() {
        this.style = null;
        this.dataBounds = null;
        this.nodesClipPixel = null;
        this.isHoverAble = null;
        this.isMultiHover = null;
        this.isClickAble = null;
        this.highlightStyle = null;
        this.shapeOptions = null;
        super.destroy();
    }


    /**
     * @function FeatureThemeVector.prototype.lineToTF
     * @description 转换线和线环要素。
     * @param {Geometry} geometry - 用户数据几何地理信息，这里必须是 GeometryLineString 或 GeometryLineRing。
     */
    lineToTF(geometry) {
        var components = geometry.components;

        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            refLocal = [];
            localLX = this.getLocalXY(components_i);

            refLocal[0] = localLX[0] - location[0];
            refLocal[1] = localLX[1] - location[1];

            //抽稀 - 2 px
            if (pointList.length > 0) {
                var lastLocalXY = pointList[pointList.length - 1];
                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                    continue;
                }
            }

            //使用参考点
            pointList.push(refLocal);
        }

        if (pointList.length < 2) {
            return null;
        }

        //赋 style
        var style = new Object();
        style = CommonUtil.copyAttributesWithClip(style, this.style, ['pointList']);
        style.pointList = pointList;

        //创建图形
        var shape = new SmicBrokenLine({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = this.location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.id;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //添加到渲染器前修改 shape 的一些属性，非特殊情况通常不允许这么做
        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }


    /**
     * @function FeatureThemeVector.prototype.multiPointToTF
     * @description 转多点要素。
     * @param {Geometry} geometry - 用户数据几何地理信息，这里必须是 MultiPoint。
     */
    multiPointToTF(geometry) {
        /*   //-- 不抽稀
         var components = geometry.components;

         for(var i = 0; i < components.length; i++){
         var components_i = components[i];
         this.pointToTF(components_i);
         }
         */

        var components = geometry.components;

        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            refLocal = [];
            localLX = this.getLocalXY(components_i);

            refLocal[0] = localLX[0] - location[0];
            refLocal[1] = localLX[1] - location[1];

            //抽稀
            if (pointList.length > 0) {
                var lastLocalXY = pointList[pointList.length - 1];
                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                    continue;
                }
            }

            //使用参考点
            pointList.push(refLocal);

            //赋 style
            var style = new Object();
            style.r = 6; //防止漏设此参数，默认 6 像素
            style = CommonUtil.copyAttributesWithClip(style, this.style);
            style.x = refLocal[0];
            style.y = refLocal[1];

            //创建图形
            var shape = new SmicPoint({
                style: style,
                clickable: this.isClickAble,
                hoverable: this.isHoverAble
            });

            //设置高亮样式
            if (this.highlightStyle) {
                shape.highlightStyle = this.highlightStyle;
            }

            //设置参考中心，指定图形位置
            shape.refOriginalPosition = location;

            //储存数据 id 属性，用于事件
            shape.refDataID = this.data.id;

            //储存数据 id 属性，用于事件-多图形同时高亮
            shape.isHoverByRefDataID = this.isMultiHover;

            //修改一些 shape 可选属性，通常不需要这么做
            if (this.shapeOptions) {
                CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
            }

            this.shapes.push(shape);
        }
    }


    /**
     * @function FeatureThemeVector.prototype.multiLineStringToTF
     * @description 转换多线要素。
     * @param {Geometry} geometry - 用户数据几何地理信息，这里必须是 MultiLineString。
     */
    multiLineStringToTF(geometry) {
        var components = geometry.components;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            this.lineToTF(components_i);
        }
    }


    /**
     * @function FeatureThemeVector.prototype.multiPolygonToTF
     * @description 转换多面要素。
     * @param {Geometry} geometry - 用户数据几何地理信息，这里必须是 MultiPolygon。
     */
    multiPolygonToTF(geometry) {
        var components = geometry.components;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            this.polygonToTF(components_i);
        }
    }


    /**
     * @function FeatureThemeVector.prototype.pointToTF
     * @description 转换点要素。
     * @param {Geometry} geometry - 用户数据几何地理信息，这里必须是 Point。
     */
    pointToTF(geometry) {
        //参考位置，参考中心为
        var location = this.location;
        //geometry 像素坐标
        var localLX = this.getLocalXY(geometry);

        //赋 style
        var style = new Object();
        style.r = 6; //防止漏设此参数，默认 6 像素
        style = CommonUtil.copyAttributesWithClip(style, this.style);
        style.x = localLX[0] - location[0];
        style.y = localLX[1] - location[1];

        //创建图形
        var shape = new SmicPoint({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.id;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //修改一些 shape 可选属性，通常不需要这么做
        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }


    /**
     * @function FeatureThemeVector.prototype.polygonToThemeFeature
     * @description 转换面要素。
     * @param {Geometry} geometry - 用户数据几何地理信息，这里必须是 Polygon。
     */
    polygonToTF(geometry) {
        var components = geometry.components;


        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];
        //岛洞
        var holePolygonPointList = [];
        var holePolygonPointLists = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i].components;


            if (i === 0) {
                // 第一个 component 正常绘制
                pointList = [];

                for (var j = 0; j < components_i.length; j++) {
                    refLocal = [];
                    localLX = this.getLocalXY(components_i[j]);

                    refLocal[0] = localLX[0] - location[0];
                    refLocal[1] = localLX[1] - location[1];

                    //抽稀 - 2 px
                    if (pointList.length > 0) {
                        var lastLocalXY = pointList[pointList.length - 1];
                        if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                            continue;
                        }
                    }

                    //使用参考点
                    pointList.push(refLocal);
                }
            } else {
                // 其它 component 作为岛洞
                holePolygonPointList = [];

                for (var k = 0; k < components_i.length; k++) {
                    refLocal = [];
                    localLX = this.getLocalXY(components_i[k]);

                    refLocal[0] = localLX[0] - location[0];
                    refLocal[1] = localLX[1] - location[1];

                    //抽稀 - 2 px
                    if (holePolygonPointList.length > 0) {
                        var lastXY = holePolygonPointList[holePolygonPointList.length - 1];
                        if ((Math.abs(lastXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastXY[1] - refLocal[1]) <= nCPx)) {
                            continue;
                        }
                    }

                    //使用参考点
                    holePolygonPointList.push(refLocal);
                }
            }

            if (holePolygonPointList.length < 2) {
                continue;
            }

            holePolygonPointLists.push(holePolygonPointList);
        }

        if (pointList.length < 2) {
            return;
        }

        //赋 style
        var style = {};
        style = CommonUtil.copyAttributesWithClip(style, this.style, ['pointList']);
        style.pointList = pointList;

        //创建图形
        var shape = new SmicPolygon({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = this.location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.id;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //岛洞面
        if (holePolygonPointLists.length > 0) {
            shape.holePolygonPointLists = holePolygonPointLists;
        }

        //修改一些 shape 可选属性，通常不需要这么做
        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }


    /**
     * @function FeatureThemeVector.prototype.rectangleToTF
     * @description 转换矩形要素。
     * @param {Geometry} geometry - 用户数据几何地理信息，这里必须是 Rectangle。
     */
    rectangleToTF(geometry) {
        //参考位置，参考中心为
        var location = this.location;
        var ll = new LonLat(geometry.x, geometry.y);

        //地图分辨率
        var res = this.layer.map.getResolution();

        //geometry 像素坐标
        var localLX = this.getLocalXY(ll);

        //赋 style
        var style = new Object();
        style.r = 6; //防止漏设此参数，默认 6 像素
        style = CommonUtil.copyAttributesWithClip(style, this.style);
        style.x = localLX[0] - location[0];
        // Rectangle 使用左下角定位， SmicRectangle 使用左上角定位，需要转换
        style.y = (localLX[1] - location[1]) - 2 * geometry.width / res;
        style.width = geometry.width / res;
        style.height = geometry.height / res;

        //创建图形
        var shape = new SmicRectangle({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.id;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //修改一些 shape 可选属性，通常不需要这么做
        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }


    /**
     * @function FeatureThemeVector.prototype.geoTextToTF
     * @description 转换文本要素。
     * @param {Geometry} geometry - 用户数据几何地理信息，这里必须是 GeoText。
     */
    geoTextToTF(geometry) {
        //参考位置，参考中心为
        var location = this.location;
        //geometry 像素坐标
        var localLX = this.getLocalXY(geometry);

        //赋 style
        var style = new Object();
        style.r = 6; //防止漏设此参数，默认 6 像素
        style = CommonUtil.copyAttributesWithClip(style, this.style, ["x", "y", "text"]);
        style.x = localLX[0] - location[0];
        style.y = localLX[1] - location[1];
        style.text = geometry.text;

        //创建图形
        var shape = new SmicText({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.id;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //修改一些 shape 可选属性，通常不需要这么做
        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }


    /**
     * @function FeatureThemeVector.prototype.updateAndAddShapes
     * @description 修改位置，针对地图平移操作，地图漫游操作后调用此函数。
     */
    updateAndAddShapes() {
        var newLocalLX = this.getLocalXY(this.lonlat);
        this.location = newLocalLX;

        var render = this.layer.renderer;
        for (var i = 0, len = this.shapes.length; i < len; i++) {
            var shape = this.shapes[i];
            //设置参考中心，指定图形位置
            shape.refOriginalPosition = newLocalLX;
            render.addShape(shape);
        }
    }


    /**
     * @function FeatureThemeVector.prototype.getShapesCount
     * @description 获得专题要素中可视化图形的数量。
     * @returns {number} 可视化图形的数量。
     */
    getShapesCount() {
        return this.shapes.length;
    }


    /**
     * @function FeatureThemeVector.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param {LonLat} lonlat - 专题要素地理位置。
     */
    getLocalXY(lonlat) {
        return this.layer.getLocalXY(lonlat);
    }

}
