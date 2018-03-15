import L from "leaflet";
import {
    CommonUtil,
    GeometryPoint,
    GeometryVector as Vector,
    GeoJSON as GeoJSONFormat,
    LonLat,
    GeometryPoint as Point,
    GeoText
} from '@supermap/iclient-common';

/**
 * @class L.supermap.heatMapLayer
 * @classdesc 热力图层类
 * @category Visualization HeatMap
 * @param name -{string} 图层名称
 * @param options - {Object} 构造参数，如下：<br>
 *        map - [L.Map]{@linkdoc-leaflet/#map} leaflet 的 map对象。必传。</br>
 *        id - {string} 专题图层ID。</br>
 *        radius - {number} 热点渲染的最大半径（热点像素半径），默认为 50，单位为 px,当 useGeoUnit参数 为 true 时，单位使用当前图层地理坐标单位。热点显示的时候以精确点为中心点开始往四周辐射衰减，其衰减半径和权重值成比列。</br>
 *        loadWhileAnimating - {boolean} 是否实时重绘，默认为true。(当绘制大数据量要素的情况下会出现卡顿，建议把该参数设为false)。</br>
 *        opacity - {number} 图层透明度。</br>
 *        colors - {Array<string>} 颜色线性渐变数组,颜色值必须为canvas所支。默认为['blue','cyan','lime','yellow','red']。</br>
 *        useGeoUnit - {boolean} 使用地理单位，默认是false，即默认热点半径默认使用像素单位。 当设置为true时，热点半径和图层地理坐标保持一致。</br>
 * @extends L.Layer{@linkdoc-leaflet/#layer}
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
        attribution: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
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
        this.featureWeight = this.options.featureWeight;
        this.colors = this.options.colors;
        this.useGeoUnit = this.options.useGeoUnit;
        this.opacity = this.options.opacity;
        this.radius = this.options.radius;
        this.movingOffset = [0, 0];
    },

    /**
     * @function L.supermap.heatMapLayer.prototype.onRemove
     * @description 删除某个地图
     * @param map - {L.map} 要删除的地图
     * @private
     */
    onRemove: function (map) {
        var me = this;
        L.DomUtil.remove(me.rootCanvas);
        map.off("mousemove", me.mouseMoveHandler);
    },

    /**
     * @function L.supermap.heatMapLayer.prototype.onAdd
     * @description 添加专题图
     * @param map - {L.map} 要添加的地图
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
     * @function L.supermap.heatMapLayer.prototype.addFeatures
     * @description 添加热点信息。
     * @param features - {geojson} 热点信息数组。
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
     * var heatMapLayer = new L.supermap.heatMapLayer("heatmaplayer",{"id":"heatmap"});
     * heatMapLayer.addFeatures(geojson);
     */
    addFeatures: function (features) {
        this.features = this.toiClientFeature(features);
        this.refresh();
    },

    /**
     * @function L.supermap.heatMapLayer.prototype.refresh
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
     * @function L.supermap.heatMapLayer.prototype.updateHeatPoints
     * @description 刷新热点图显示
     * @param bounds - {L.LngLatBounds} 当前显示范围
     */
    updateHeatPoints: function (bounds) {
        if (this.features && this.features.length > 0) {
            this.convertFastToPixelPoints(bounds);
        } else {
            this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxWidth);
        }
    },

    /**
     * @function L.supermap.heatMapLayer.prototype.convertFastToPixelPoints
     * @description 过滤位于当前显示范围内的热点，并转换其为当前分辨率下的像素坐标。
     * @param bounds - {L.LngLatBounds} 当前显示范围
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
     * @function L.supermap.heatMapLayer.prototype.draw
     * @description 绘制热点图
     * @param data -{Array} convertToPixelPoints方法计算出的点
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
     * @function L.supermap.heatMapLayer.prototype.colorize
     * @description 根据渐变色重置热点图rgb值
     * @param pixels 像素RGBA值
     * @param gradient 渐变canvas.getImageData.data
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
     * @function L.supermap.heatMapLayer.drawCircle
     * @description 绘制热点半径圆
     * @param r -{number} 热点半径
     * @private
     */
    drawCircle: function (r) {
        var blur = r / 2;

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
     * @function L.supermap.heatMapLayer.createGradient
     * @description 根据this.canvasColors设置渐变并getImageData
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
     * @function L.supermap.heatMapLayer.prototype.update
     * @description 更新图层
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
     * @function L.supermap.heatMapLayer.prototype.getLocalXY
     * @description 地理坐标转为像素坐标
     * @param coordinate - {array}
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
            if (coordinate instanceof Point || coordinate instanceof GeoText) {
                coor = L.point(coordinate.x, coordinate.y);
            } else {
                coor = L.point(coordinate.lon, coordinate.lat);
            }

        }
        var point = this._map.latLngToContainerPoint(!this.options.alwaysMapCRS ? L.latLng(coor.y, coor.x) : this._map.options.crs.unproject(coor));
        return [point.x, point.y];
    },

    /**
     * @function L.supermap.heatMapLayer.prototype.setOpacity
     * @description 设置图层的不透明度,取值[0-1]之间。
     * @param opacity - {number}不透明度
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
     * @function L.supermap.heatMapLayer.prototype.removeFeatures
     * @description 移除指定的热点信息。
     * @param features - {Array<SuperMap.Feature.Vector>} 热点信息数组。
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
        this._map.fire("featuresremoved", {features: heatPointsFailedRemoved, succeed: succeed});
        this.refresh();
    },

    /**
     * @function L.supermap.heatMapLayer.prototype.removeAllFeatures
     * @description 移除全部的热点信息。
     */
    removeAllFeatures: function () {
        this.features = [];
        this.refresh();
    },

    /**
     * @function L.supermap.heatMapLayer.prototype._createCanvasContainer
     * @description 创建热力图绘制容器
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
            me._map.fire("changelayer", {layer: me, property: "opacity"});
        }
    },

    /**
     * @function L.supermap.heatMapLayer.prototype.getEvents
     * @description 获取图层事件
     * @return {Object} 返回图层支持的事件
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
     * @function L.supermap.heatMapLayer.prototype.toiClientFeature
     * @description 转为 iClient 要素
     * @param features - {GeoJson|HeatMapFeature}待转要素,支持 geoJson 格式和 ThemeFeature 格式
     * @return {SuperMap.Feature.Vector} 转换后的iClient要素
     */
    toiClientFeature: function (features) {
        //支持传入geojson类型
        if (["FeatureCollection", "Feature", "Geometry"].indexOf(features.type) != -1) {
            var format = new GeoJSONFormat();
            return format.read(features, "FeatureCollection");
        }
        //支持传入ThemeFeature类型,ThemeFeature.geometry instanceof L.LatLng | ThemeFeature.geometry instanceof L.Point
        if (L.Util.isArray(features)) {
            var featuresTemp = [];
            for (var i = 0, len = features.length; i < len; i++) {
                //支持ThemeFeature类型的feature
                if (features[i] instanceof HeatMapFeature) {
                    featuresTemp.push(features[i].toFeature());
                }
            }
            return featuresTemp;
        }
        throw new Error("features 类型不符，请检查。");
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
L.supermap.heatMapLayer = heatMapLayer;

/**
 * @class L.supermap.heatMapFeature
 * @classdesc 客户端专题图要素类。
 *            支持的geometry参数类型为L.Point、L.LatLng、L.CircleMarker
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param geometry - {L.Point|L.LatLng|L.CircleMarker} 要素图形
 * @param attributes - {Object} 要素属性
 */
export var HeatMapFeature = L.Class.extend({
    initialize: function (geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    },

    /**
     * @function L.supermap.themeFeature.prototype.toFeature
     * @description 转为内部矢量要素
     * @return {SuperMap.Feature.Vector} 内部矢量要素
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

L.supermap.heatMapFeature = heatMapFeature;