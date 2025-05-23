/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import { Util as CommonUtil } from '@supermapgis/iclient-common/commontypes/Util';
 import { LonLat } from '@supermapgis/iclient-common/commontypes/LonLat';
 import { GeoJSON as GeoJSONFormat } from '@supermapgis/iclient-common/format/GeoJSON';
 import { ServerFeature } from '@supermapgis/iclient-common/iServer/ServerFeature';
 import { Vector } from '@supermapgis/iclient-common/commontypes/Vector';
 import { Point as GeometryPoint } from '@supermapgis/iclient-common/commontypes/geometry/Point';
 import { GeoText } from '@supermapgis/iclient-common/commontypes/geometry/GeoText';
 import Attributions from '../core/Attributions';

/**
 * @class HeatMapFeature
 * @deprecatedclassinstance L.supermap.heatMapFeature
 * @category Visualization HeatMap
 * @classdesc 客户端热力图要素类。
 *            支持的 geometry 参数类型为 {@link L.Point} 点对象、{@link L.LatLng} 经纬度点坐标对象、{@link L.CircleMarker} 圆形符号对象等。
 * @modulecategory Overlay
 * @extends {L.Class}
 * @param {(L.Point|L.LatLng|L.CircleMarker)} geometry - 要素图形。
 * @param {Object} attributes - 要素属性。
 * @usage
 */
export var HeatMapFeature = L.Class.extend({
    initialize: function (geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    },

    /**
     * @function HeatMapFeature.prototype.toFeature
     * @description 转为内部矢量要素。
     * @returns {FeatureVector} 内部矢量要素。
     */
    toFeature: function () {
        var geometry = this.geometry;
        var points = [];
        if (geometry instanceof L.LatLng) {
            points = [geometry.lng, geometry.lat];
        } else if (geometry instanceof L.Point) {
            points = [geometry.x, geometry.y];
        } else if (geometry instanceof L.CircleMarker) {
            var latLng = geometry.getLatLng();
            points = [latLng.lng, latLng.lat];
        } else {
            points = geometry;
        }
        if (points.length === 2) {
            geometry = new GeometryPoint(points[0], points[1]);
        }

        return new Vector(geometry, this.attributes);
    }

});

export var heatMapFeature = function (geometry, attributes) {
    return new HeatMapFeature(geometry, attributes);
};

/**
 * @class HeatMapLayer
 * @classdesc 热力图层类。热力图是通过颜色分布，描述诸如人群分布、密度和变化趋势等的一种地图表现手法。
 * 热点图的衰减是像素级别的，视觉效果极佳，但不能与具体数据进行一一对应，只能表示权重之间的差别，
 * 因此可以用于一些对精度要求不高而需要重点突出权重渐变的行业，如制作气象温度对比动态效果图、地震区域的震点强弱图等。<br>
 * 在客户端直接渲染栅格图的三要素：<br>
 * 1.热点数据，热点数据需要点数据，每一个热点数据需要有地理位置以及权重值 （能够明显地表现某位置某事件发生频率或事物分布密度等，如可以为温度的高低、人口密集度等等)；<br>
 * 2.热点衰减渐变填充色集合， 用于渲染每一个热点从中心向外衰减时的渐变色；<br>
 * 3.热点半径，也就是衰减半径。每一个热点需要从中心点外四周根据半径计算衰减度，对在热点衰减区内的每一个像素计算需要渲染的颜色值。
 * @category Visualization HeatMap
 * @param {string} name - 图层名称。
 * @param {boolean} [loadWhileAnimating=true] - 是否实时重绘。（当绘制大数据量要素的情况下会出现卡顿，建议把该参数设为 false）。
 * @param {Object} options - 构造参数。
 * @param {L.Map} options.map - Leaflet Map 对象。
 * @param {string} [options.id] - 专题图层 ID，默认使用 CommonUtil.createUniqueID("heatMapLayer_") 创建专题图层 ID。
 * @param {boolean} [options.alwaysMapCRS=false] - 要素坐标是否和地图坐标系一致，要素默认是经纬度坐标。
 * @param {string} [options.featureWeight] - 对应 feature 属性中的热点权重字段名称，权重值类型为 number。
 * @param {number} [options.radius=50] - 热点渲染的最大半径（热点像素半径），单位为 px，当 useGeoUnit 参数 为 true 时，单位使用当前图层地理坐标单位。热点显示的时候以精确点为中心点开始往四周辐射衰减，其衰减半径和权重值成比列。
 * @param {number} [options.opacity=1] - 图层不透明度。
 * @param {Array.<string>} [options.colors=['blue', 'cyan', 'lime', 'yellow', 'red']] - 颜色线性渐变数组，颜色值必须为 canvas 所支持的。
 * @param {boolean} [options.useGeoUnit=false] - 使用地理单位，即默认热点半径默认使用像素单位。当设置为 true 时，热点半径和图层地理坐标保持一致。
 * @param {number} [options.blur] - 模糊量，单位为 px。默认值为半径的二分之一。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权描述信息。
 *
 * @extends {L.Layer}
 * @fires HeatMapLayer#featuresremoved
 * @fires HeatMapLayer#changelayer
 * @usage
 */
export var HeatMapLayer = L.Layer.extend({
    options: {
        //要素坐标是否和地图坐标系一致，默认为false，要素默认是经纬度坐标。
        alwaysMapCRS: false,
        //热力图默认参数：
        id: CommonUtil.createUniqueID("heatMapLayer_"),
        featureWeight: null,
        opacity: 1,
        colors: ['blue', 'cyan', 'lime', 'yellow', 'red'],
        useGeoUnit: false,
        radius: 50,
        attribution: Attributions.Common.attribution
    },

    initialize: function (name, options) {
        L.Util.setOptions(this, options);
        this.name = name;

        this.features = [];
        this.maxWeight = null;
        this.minWeight = null;
        this.rootCanvas = null;
        this.canvasContext = null;
        this.maxWidth = null;
        this.maxHeight = null;

        //热力图参数：
        this.id = this.options.id;
        /*
         * options.featureWeight对应 feature 属性中的热点权重字段名称，权重值类型为float
         * //例如：
         * //feature.attributes中表示权重的字段为height,则在HeatMapLayer的featureWeight参数赋值为"height"
         * feature1.attributes.height = 7.0;
         * feature2.attributes.height = 6.0;
         * var heatMapLayer = new HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
         * heatMapLayer.addFeatures([feature1,feature2]);
         * @type {null}
         */
        this.featureWeight = this.options.featureWeight;
        this.colors = this.options.colors;
        this.useGeoUnit = this.options.useGeoUnit;
        this.opacity = this.options.opacity;
        this.radius = this.options.radius;
        this.blur = this.options.blur;
        this.movingOffset = [0, 0];
    },

    /**
     * @function HeatMapLayer.prototype.onRemove
     * @description 删除某个地图。
     * @param {L.Map} map - Leaflet Map 对象。
     * @private
     */
    onRemove: function (map) {
        var me = this;
        L.DomUtil.remove(me.rootCanvas);
        map.off("mousemove", me.mouseMoveHandler);
    },

    /**
     * @function HeatMapLayer.prototype.onAdd
     * @description 添加专题图。
     * @param {L.Map} map - Leaflet Map 对象。
     * @private
     */
    onAdd: function (map) {
        var me = this;

        me._map = map;
        me._createCanvasContainer();
        if (!me.rootCanvas) {
            map.removeLayer(me);
            return;
        }
        //初始化渲染器
        var size = map.getSize();
        me.rootCanvas.width = me.maxWidth = size.x;
        me.rootCanvas.height = me.maxHeight = size.y;
        me._updateOpacity();

        me.mouseMoveHandler = function (e) {
            var xy = e.layerPoint;
            me.currentMousePosition = L.point(xy.x + me.movingOffset[0], xy.y + me.movingOffset[1]);
        };
        map.on("mousemove", me.mouseMoveHandler);

        me.update();
    },

    /**
     * @function HeatMapLayer.prototype.addFeatures
     * @description 添加热点信息。
     * @param {(GeoJSONObject|HeatMapFeature)} features - 待添加的要素数组。
     *
     * @example
     * var geojson = {
     *      "type": "FeatureCollection",
     *      "features": [
     *          {
     *              "type": "feature",
     *              "geometry": {
     *                  "type": "Point",  //只支持point类型
     *                  "coordinates": [0, 0]
     *              },
     *              "properties": {
     *                  "height": Math.random()*9,
     *                  "geoRadius": useGeoRadius?radius:null
     *              }
     *          }
     *      ]
     *   };
     * var heatMapLayer = new HeatMapLayer("heatmaplayer",{"id":"heatmap"});
     * heatMapLayer.addFeatures(geojson);
     */
    addFeatures: function (features) {
        this.features = this.toiClientFeature(features);
        this.refresh();
    },

    /**
     * @function HeatMapLayer.prototype.refresh
     * @description 强制刷新当前热点显示，在图层热点数组发生变化后调用，更新显示。
     */
    refresh: function () {
        if (this.features.length === 0) {
            return;
        }
        if (this._map) {
            var extent = this._map.getBounds();
            this.updateHeatPoints(extent);
        }
    },

    /**
     * @function HeatMapLayer.prototype.updateHeatPoints
     * @description 刷新热点图显示。
     * @param {L.LatLngBounds} bounds - 当前显示范围。
     */
    updateHeatPoints: function (bounds) {
        if (this.features && this.features.length > 0) {
            this.convertFastToPixelPoints(bounds);
        } else {
            this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxWidth);
        }
    },

    /**
     * @function HeatMapLayer.prototype.convertFastToPixelPoints
     * @description 过滤位于当前显示范围内的热点，并转换其为当前分辨率下的像素坐标。
     * @param {L.LatLngBounds} bounds - 当前显示范围。
     * @private
     */
    convertFastToPixelPoints: function (bounds) {
        var data = [], x, y, k, resolution, maxTemp, minTemp, maxWeightTemp;
        //获取当前像素下的地理范围
        var dw = bounds.getEast() - bounds.getWest();
        var dh = bounds.getNorth() - bounds.getSouth();
        var mapCanvas = this._map.getSize();

        if (dw / mapCanvas.x > dh / mapCanvas.y) {
            resolution = dw / mapCanvas.x;
        } else {
            resolution = dh / mapCanvas.y;
        }

        //热点半径
        this.useRadius = this.useGeoUnit ? parseInt(this.radius / resolution) : this.radius;

        for (var i = 0; i < this.features.length; i++) {
            var feature = this.features[i];
            var point = feature.geometry;
            var pixelPoint = this.getLocalXY(new LonLat(point.x, point.y));
            if (this.featureWeight) {
                pixelPoint.weight = feature.attributes[this.featureWeight];//point.value;
                if (!this.maxWeight) {
                    //找出最大最小权重值
                    maxTemp = maxTemp ? maxTemp : pixelPoint.weight;
                    minTemp = minTemp ? minTemp : pixelPoint.weight;
                    maxTemp = Math.max(maxTemp, pixelPoint.weight);
                    minTemp = Math.min(minTemp, pixelPoint.weight);
                }
            } else {
                pixelPoint.weight = 1;
            }

            x = Math.floor(pixelPoint[0]);
            y = Math.floor(pixelPoint[1]);
            k = pixelPoint.weight;

            data.push([x, y, k]);
        }

        //无最大权重设置
        if (!this.maxWeight) {
            if (maxTemp && minTemp) {
                maxWeightTemp = (maxTemp + minTemp) / 2;
            } else {
                maxWeightTemp = 1;
            }
            this.draw(data, maxWeightTemp);
        } else {
            this.draw(data, this.maxWeight);
        }

    },

    /**
     * @function HeatMapLayer.prototype.draw
     * @description 绘制热点图。
     * @param {Array} data - convertToPixelPoints 方法计算出的点。
     * @param {number} maxWeight - 最大权重。
     * @private
     */
    draw: function (data, maxWeight) {
        if (this.maxHeight > 0 && this.maxWidth > 0) {
            var ctx = this.canvasContext;
            //清空
            this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxHeight);
            this.drawCircle(this.useRadius);
            this.createGradient();

            for (var i = 0; i < data.length; i++) {
                var p = data[i];
                this.canvasContext.globalAlpha = Math.max(p[2] / maxWeight, 0.05);
                this.canvasContext.drawImage(this.circle, p[0] - this.useRadius, p[1] - this.useRadius);
            }

            var colored = ctx.getImageData(0, 0, this.maxWidth, this.maxHeight);
            this.colorize(colored.data, this.grad);
            ctx.putImageData(colored, 0, 0);
        } else {
            return false;
        }

    },

    /**
     * @function HeatMapLayer.prototype.colorize
     * @description 根据渐变色重置热点图 rgb 值。
     * @param {Array} pixels 像素 RGBA 值。
     * @param {Array} gradient 渐变 canvas.getImageData.data。
     * @private
     */
    colorize: function (pixels, gradient) {
        for (var i = 0, j; i < pixels.length; i += 4) {
            j = pixels[i + 3] * 4;
            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    },

    /**
     * @function HeatMapLayer.drawCircle
     * @description 绘制热点半径圆。
     * @param {number} r - 热点半径。
     * @private
     */
    drawCircle: function (r) {
        var blur = this.blur || r / 2;

        var circle = this.circle = document.createElement('canvas'),
            ctx = circle.getContext("2d");

        circle.height = 2 * r;
        circle.width = 2 * r;
        ctx.shadowOffsetX = ctx.shadowOffsetY = 2 * r;
        ctx.shadowBlur = blur;
        ctx.shadowColor = "#000000";

        ctx.beginPath();
        ctx.arc(-r, -r, r / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    },

    /**
     * @function HeatMapLayer.createGradient
     * @description 根据 this.canvasColors 设置渐变并 getImageData。
     * @private
     */
    createGradient: function () {
        var colors = this.colors;
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d"),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);
        canvas.height = 256;
        canvas.width = 1;

        var index = 1;
        for (var i = 0, len = colors.length; i < len; i++) {
            gradient.addColorStop(index / len, colors[i]);
            index++;
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this.grad = ctx.getImageData(0, 0, 1, 256).data;
    },

    /**
     * @function HeatMapLayer.prototype.update
     * @description 更新图层。
     */
    update: function () {
        var mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this.rootCanvas, mapOffset);

        var me = this;

        me.refresh();

        if (me.currentMousePosition) {
            me.currentMousePosition = L.point(
                me.currentMousePosition.x - me.movingOffset[0],
                me.currentMousePosition.y - me.movingOffset[1]);
        }

        me.movingOffset = [0, 0];
        me._zoom = me._map.getZoom();
        me._center = me._map.getCenter();
    },

    /**
     * @function HeatMapLayer.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param {Array} coordinate - 地理坐标。
     */
    getLocalXY: function (coordinate) {
        if (!this._map) {
            return coordinate;
        }
        var coor = coordinate;
        if (L.Util.isArray(coordinate)) {
            coor = L.point(coordinate[0], coordinate[1]);
        }
        if (!(coordinate instanceof L.Point)) {
            if (coordinate instanceof GeometryPoint || coordinate instanceof GeoText) {
                coor = L.point(coordinate.x, coordinate.y);
            } else {
                coor = L.point(coordinate.lon, coordinate.lat);
            }

        }
        var point = this._map.latLngToContainerPoint(!this.options.alwaysMapCRS ? L.latLng(coor.y, coor.x) : this._map.options.crs.unproject(coor));
        return [point.x, point.y];
    },

    /**
     * @function HeatMapLayer.prototype.setOpacity
     * @description 设置图层的不透明度，取值范围：[0-1]。
     * @param {number} opacity - 不透明度。
     */
    setOpacity: function (opacity) {
        var me = this;
        if (opacity === me.options.opacity) {
            return;
        }
        if (opacity) {
            me.options.opacity = opacity;
        }
        me._updateOpacity();
    },

    /**
     * @function HeatMapLayer.prototype.removeFeatures
     * @description 移除指定的热点信息。
     * @param {Array.<FeatureVector>} features - 热点信息数组。
     */
    removeFeatures: function (features) {
        if (!features || features.length === 0 || !this.features || this.features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        if (!(CommonUtil.isArray(features))) {
            features = [features];
        }
        var heatPoint, index, heatPointsFailedRemoved = [];
        for (var i = 0, len = features.length; i < len; i++) {
            heatPoint = features[i];
            index = CommonUtil.indexOf(this.features, heatPoint);
            //找不到视为删除失败
            if (index === -1) {
                heatPointsFailedRemoved.push(heatPoint);
                continue;
            }
            //删除热点
            this.features.splice(index, 1);
        }
        var succeed = heatPointsFailedRemoved.length == 0 ? true : false;
        //派发删除features成功的事件
        /**
         * @event HeatMapLayer#featuresremoved
         * @description 删除features成功后触发。
         * @property {Array.<FeatureVector>} features  - 事件对象。
         * @property {boolean} succeed  - 删除是否成功，false 为失败，true 为成功。
         */
        this._map.fire("featuresremoved", {features: heatPointsFailedRemoved, succeed: succeed});
        this.refresh();
    },

    /**
     * @function HeatMapLayer.prototype.removeAllFeatures
     * @description 移除全部的热点信息。
     */
    removeAllFeatures: function () {
        this.features = [];
        this.refresh();
    },

    /**
     * @function HeatMapLayer.prototype._createCanvasContainer
     * @description 创建热力图绘制容器。
     * @private
     */
    _createCanvasContainer: function () {
        //构建绘图面板
        var parentContainer = this.getPane();
        var animated = this._map.options.zoomAnimation && L.Browser.any3d;
        var className = 'heatMapLayer leaflet-layer leaflet-zoom-' + (animated ? 'animated' : 'hide');
        this.rootCanvas = L.DomUtil.create("canvas", className, parentContainer);

        var originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        this.rootCanvas.id = this.id;
        this.rootCanvas.style[originProp] = '50% 50%';

        this.rootCanvas.style.position = "absolute";
        this.rootCanvas.style.zIndex = 200;

        CommonUtil.modifyDOMElement(this.rootCanvas, null, null, null,
            null, null, null, this.opacity);
        this.canvasContext = this.rootCanvas.getContext('2d');
    },

    _updateOpacity: function () {
        var me = this;
        CommonUtil.modifyDOMElement(me.rootCanvas, null, null, null, null, null, null, me.options.opacity);
        if (me._map !== null) {
            /**
             * @event HeatMapLayer#changelayer
             * @description 图层透明度更新成功之后触发。
             * @property {HeatMapLayer} layer - 图层。
             * @property {string} property - 改变的图层属性。
             */
            me._map.fire("changelayer", {layer: me, property: "opacity"});
        }
    },

    /**
     * @function HeatMapLayer.prototype.getEvents
     * @description 获取图层事件。
     * @returns {Object} 返回图层支持的事件。
     * @private
     */
    getEvents: function () {
        var me = this;
        var events = {
            zoomend: me._reset,
            moveend: me._reset,
            resize: me._resize
        };
        if (this._map._zoomAnimated) {
            events.zoomanim = me._zoomAnim;
        }
        return events;
    },

    /**
     * @function HeatMapLayer.prototype.toiClientFeature
     * @description 转为 iClient 要素。
     * @param {(GeoJSONObject|HeatMapFeature)} features - 待添加的要素数组。
     * @returns {FeatureVector} 转换后的 iClient 要素。
     */
    toiClientFeature: function (features) {
        if (!L.Util.isArray(features)) {
            features = [features];
        }
        let featuresTemp = [];
        for (let i = 0, len = features.length; i < len; i++) {
            //支持ThemeFeature类型的feature
            //支持传入ThemeFeature类型,ThemeFeature.geometry instanceof L.LatLng | ThemeFeature.geometry instanceof L.Point
            if (features[i] instanceof HeatMapFeature) {
                featuresTemp.push(features[i].toFeature());
            } else if (["FeatureCollection", "Feature", "Geometry"].indexOf(features[i].type) != -1) {
                const format = new GeoJSONFormat();
                featuresTemp = featuresTemp.concat(format.read(features[i]));
            } else if (features[i].geometry && features[i].geometry.parts) {
                //iServer服务器返回数据格式 todo 暂未找到更好的参数判断，暂用 geometry.parts 试用
                featuresTemp.push(ServerFeature.fromJson(features[i]).toFeature());
            } else {
                throw new Error("Features's type does not match, please check.");
            }
        }
        return featuresTemp;
    },

    _zoomAnim: function (e) {
        var scale = this._map.getZoomScale(e.zoom),
            offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (L.DomUtil.setTransform) {
            L.DomUtil.setTransform(this.rootCanvas, offset, scale);

        } else {
            this.rootCanvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
        }
    },

    //缩放移动重绘
    _reset: function () {
        var me = this;
        me.update();
        var size = me._map.getSize();
        var mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this.rootCanvas, mapOffset);

        if (parseFloat(me.rootCanvas.width) !== parseFloat(size.x)) {
            me.rootCanvas.width = size.x;
        }
        if (parseFloat(me.rootCanvas.height) !== parseFloat(size.y)) {
            me.rootCanvas.height = size.y;
        }
        me.refresh();
    },

    //通知渲染器的尺寸变化
    _resize: function () {
        var me = this;
        var newSize = me._map.getSize();
        me.maxWidth = newSize.x;
        me.maxHeight = newSize.y;
    }


});
export var heatMapLayer = function (name, options) {
    return new HeatMapLayer(name, options);
};
