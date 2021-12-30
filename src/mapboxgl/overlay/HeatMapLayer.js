/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { LonLat } from '@supermap/iclient-common/commontypes/LonLat';
import { GeoJSON as GeoJSONFormat } from '@supermap/iclient-common/format/GeoJSON';
import { ServerFeature } from '@supermap/iclient-common/iServer/ServerFeature';
import { Vector as FeatureVector } from '@supermap/iclient-common/commontypes/Vector';
import { Point } from '@supermap/iclient-common/commontypes/geometry/Point';
import { GeoText } from '@supermap/iclient-common/commontypes/geometry/GeoText';
/**
 * @class HeatMapLayer
 * @classdesc 热力图层类。
 * @category  Visualization HeatMap
 * @param {string} name - 图层名称。
 * @param {Object} options - 构造参数。
 * @param {mapboxgl.Map} options.map - MapBoxGL Map 对象。
 * @param {string} options.featureWeight - 对应 feature 属性中的热点权重字段名称，权重值类型为 float。
 * @param {string} [options.id] - 专题图层ID。默认使用 CommonUtil.createUniqueID("HeatMapLayer_") 创建专题图层 ID。
 * @param {number} [options.radius=50] - 热点渲染的最大半径（热点像素半径），单位为 px,当 useGeoUnit参数 为 true 时，单位使用当前图层地理坐标单位。热点显示的时候以精确点为中心点开始往四周辐射衰减，其衰减半径和权重值成比列。
 * @param {boolean} [options.loadWhileAnimating=true] - 是否实时重绘。(当绘制大数据量要素的情况下会出现卡顿，建议把该参数设为false)。
 * @param {number} [options.opacity=1] - 图层不透明度。
 * @param {Array.<string>} [options.colors=['blue','cyan','lime','yellow','red']] - 颜色线性渐变数组,颜色值必须为canvas所支。
 * @param {boolean} [options.useGeoUnit=false] - 使用地理单位，即默认热点半径默认使用像素单位。 当设置为 true 时，热点半径和图层地理坐标保持一致。
 * @extends {mapboxgl.Evented}
 * @fires HeatMapLayer#featuresadded
 * @fires HeatMapLayer#changelayer
 * @fires HeatMapLayer#featuresremoved
 * @usage
 */
export class HeatMapLayer extends mapboxgl.Evented {

    constructor(name, options) {
        super();

        var _options = options ? options : {};
        /**
         * @member {string} HeatMapLayer.prototype.name
         * @description 图层名字。
         */
        this.name = name;

        /**
         * @member {string} HeatMapLayer.prototype.id
         * @description 热力图图层 id。
         */
        this.id = _options.id ? _options.id : CommonUtil.createUniqueID("HeatMapLayer_");

        /**
         * @member {mapboxgl.Map} HeatMapLayer.prototype.map
         * @description MapBoxGL Map 对象。
         */
        this.map = _options.map ? _options.map : null;

        /**
         * @member {boolean} [HeatMapLayer.prototype.loadWhileAnimating=true]
         * @description 是否实时重绘。(当绘制大数据量要素的情况下会出现卡顿，建议把该参数设为false)。
         */
        this.loadWhileAnimating = _options.loadWhileAnimating === undefined ? true : _options.loadWhileAnimating;

        /**
         * @member {boolean} [HeatMapLayer.prototype.visibility=true]
         * @description 图层显示状态属性。
         */
        this.visibility = true;
        /**
         * @member {number} [HeatMapLayer.prototype.opacity=1]
         * @description 图层不透明度，取值范围[0,1]。
         */
        this.opacity = _options.opacity ? _options.opacity : 1;

        /**
         * @member {Array.<string>} [HeatMapLayer.prototype.colors=['blue','cyan','lime','yellow','red']]
         * @description 颜色线性渐变数组 。
         */
        this.colors = _options.colors ? _options.colors : ['blue', 'cyan', 'lime', 'yellow', 'red'];

        /**
         * @member {boolean} [HeatMapLayer.prototype.useGeoUnit=false]
         * @description 使用地理单位，即默认热点半径默认使用像素单位。 当设置为 true 时，热点半径和图层地理坐标保持一致。
         */
        this.useGeoUnit = _options.useGeoUnit ? _options.useGeoUnit : false;

        /**
         * @member {number} [HeatMapLayer.prototype.radius=50]
         * @description 热点渲染的最大半径（热点像素半径）,
         *              热点显示的时候以精确点为中心点开始往四周辐射衰减，
         *              其衰减半径和权重值成比列。
         */
        this.radius = _options.radius ? _options.radius : 50;

        /**
         * @member {string} HeatMapLayer.prototype.featureWeight
         * @description 对应 feature 属性中的热点权重字段名称，权重值类型为 number。
         * @example
         * //feature.attributes中表示权重的字段为 height,则在 HeatMapLayer 的 featureWeight 参数赋值为 "height"。
         * feature1.attributes.height = 7.0;
         * feature2.attributes.height = 6.0;
         * var heatMapLayer = new HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
         * heatMapLayer.addFeatures([feature1,feature2]);
         */
        this.featureWeight = _options.featureWeight ? _options.featureWeight : null;

        /**
         * @member {Array.<FeatureVector>} HeatMapLayer.prototype.features
         * @description 热点信息数组，记录存储图层上添加的所有热点信息。
         */
        this.features = [];

        /**
         * @member {number} HeatMapLayer.prototype.maxWeight
         * @description 设置权重最大值。默认将按照当前屏幕范围内热点所拥有的权重最大值绘制热点图。
         */
        this.maxWeight = null;

        /**
         * @member {number} HeatMapLayer.prototype.minWeight
         * @description 设置权重最小值。默认将按照当前屏幕范围内热点所拥有的权重最小值绘制热点图。
         */
        this.minWeight = null;

        /**
         * @member HeatMapLayer.prototype.EVENT_TYPES
         * @description 监听一个自定义事件可用如下方式:
         *              热点图自定义事件信息，事件调用时的属性与具体事件类型相对应。
         *
         * 支持的事件如下 (另外包含 <Layer 中定义的其他事件>):
         * featuresadded - 热点添加完成时触发。回调参数为添加的热点信息数组和操作成功与否信息。
         * 参数类型：{features: features, succeed: succeed}
         * featuresremoved - 热点被删除时触发。回调参数为删除的热点信息数组和操作成功与否信息。
         * 参数类型：{features: features, succeed: succeed}
         * featuresdrawcompleted - 热点图渲染完成时触发。
         */
        this.EVENT_TYPES = ["featuresadded", "featuresremoved", "featuresdrawcompleted"];

        /**
         * @member {boolean} [HeatMapLayer.prototype.supported=false]
         * @description 当前浏览器是否支持 canvas 绘制，
         *              决定了热点图是否可用，内部判断使用。
         */
        this.supported = false;

        /**
         * @member {Object} HeatMapLayer.prototype.rootCanvas
         * @description 热点图主绘制面板。
         */
        this.rootCanvas = null;

        /**
         * @member {Object} HeatMapLayer.prototype.canvasContext
         * @description 热点图主绘制对象。
         */
        this.canvasContext = null;

        /**
         * @member {number} HeatMapLayer.prototype.maxWidth
         * @description 当前绘制面板宽度。默认和当前 map 窗口宽度一致。
         */
        this.maxWidth = null;

        /**
         * @member {number} HeatMapLayer.prototype.maxHeight
         * @description 当前绘制面板宽度。默认和当前 map 窗口高度一致。
         */
        this.maxHeight = null;

    }

    /**
     * @function HeatMapLayer.prototype.onAdd
     * @description 添加该图层
     */
    onAdd(map) {
        this.map = map;
        if (this.features.length === 0) {
            return;
        }
        //创建热力图绘制容器
        this._createCanvasContainer();

        //绑定图层事件与Map同步
        this.map.on('resize', this._resizeEvent.bind(this));
        this.map.on('zoomstart', this._zoomStartEvent.bind(this));
        this.map.on('zoomend', this._zoomEndEvent.bind(this));
        this.map.on('rotatestart', this._rotateStartEvent.bind(this));
        this.map.on('rotate', this._rotateEvent.bind(this));
        this.map.on('rotateend', this._rotateEndEvent.bind(this));
        this.map.on('dragend', this._dragEndEvent.bind(this));
        this.map.on('movestart', this._moveStartEvent.bind(this));
        this.map.on('move', this._moveEvent.bind(this));
        this.map.on('moveend', this._moveEndEvent.bind(this));
        this.map.on('remove', this.removeFromMap.bind(this));
        this.refresh();
    }

    /**
     * @function HeatMapLayer.prototype.removeFromMap
     * @description 删除该图层。
     */
    removeFromMap() {
        this.removeAllFeatures();
        this.map.getCanvasContainer().removeChild(this.rootCanvas);
    }

    /**
     * @function HeatMapLayer.prototype._createCanvasContainer
     * @description 创建热力图绘制容器。
     * @private
     */
    _createCanvasContainer() {
        this.supported = true;
        //构建绘图面板
        this.mapContainer = this.map.getCanvasContainer();
        //热点图要求使用canvas绘制，判断是否支持
        this.rootCanvas = document.createElement("canvas");
        this.rootCanvas.id = this.id;
        var mapCanvas = this.map.getCanvas();
        this.rootCanvas.width = this.maxWidth = parseInt(mapCanvas.width);
        this.rootCanvas.height = this.maxHeight = parseInt(mapCanvas.height);
        CommonUtil.modifyDOMElement(this.rootCanvas, null, null, null,
            "absolute", null, null, this.opacity);
        this.canvasContext = this.rootCanvas.getContext('2d');
        this.mapContainer.appendChild(this.rootCanvas);
    }

    /**
     * @function HeatMapLayer.prototype.addFeatures
     * @description 添加热点信息。
     * @param {GeoJSONObject} features - 待添加的要素数组。
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
     * var heatMapLayer = new HeatMapLayer("heatmaplayer",{"featureWeight":"height"});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   pLayer = new HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
     * heatMapLayer.addFeatures(geojson);
     * map.addLayer(heatMapLayer);
     */
    addFeatures(features) {
        this.features = this.toiClientFeature(features);
        /**
         * @event HeatMapLayer#featuresadded
         * @description 要素添加完成之后触发。
         * @property {GeoJSONObject} features - 被添加的要素。
         * @property {boolean} succeed - 要素是否成功添加。
         */
        this.fire(this.EVENT_TYPES[0], {features: features, succeed: true});
        //支持更新features，刷新底图
        this.refresh();
    }

    /**
     * @function HeatMapLayer.prototype.refresh
     * @description 强制刷新当前热点显示，在图层热点数组发生变化后调用，更新显示。
     */
    refresh() {
        if (this.features.length === 0) {
            return;
        }
        if (this.map) {
            var extent = this.map.getBounds();
            this.updateHeatPoints(extent);
        }
    }

    /**
     * @function HeatMapLayer.prototype.setOpacity
     * @description 设置图层的不透明度，取值[0-1]之间。
     * @param {number} [opacity] - 不透明度。
     */
    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            CommonUtil.modifyDOMElement(this.rootCanvas, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                /**
                 * @event HeatMapLayer#changelayer
                 * @description 图层属性改变之后触发。
                 * @property {Object} layer - 图层。
                 * @property {string} property - 被改变的图层属性。
                 */
                this.fire('changelayer', {layer: this, property: "opacity"});
            }
        }
    }

    /**
     * @function HeatMapLayer.prototype.updateHeatPoints
     * @description 刷新热点图显示。
     * @param {mapboxgl.LngLatBounds} bounds - 当前显示范围。
     */
    updateHeatPoints(bounds) {
        if (this.features && this.features.length > 0) {
            this.convertFastToPixelPoints(bounds);
        } else {
            this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxWidth);
        }
    }

    /**
     * @function HeatMapLayer.prototype.convertFastToPixelPoints
     * @description 过滤位于当前显示范围内的热点，并转换其为当前分辨率下的像素坐标。
     * @param {mapboxgl.LngLatBounds} bounds - 当前显示范围。
     * @private
     */
    convertFastToPixelPoints(bounds) {
        var data = [], x, y, k, resolution, maxTemp, minTemp, maxWeightTemp;
        //获取当前像素下的地理范围
        var dw = bounds.getEast() - bounds.getWest();
        var dh = bounds.getNorth() - bounds.getSouth();
        var mapCanvas = this.map.getCanvas();

        if (dw / mapCanvas.width > dh / mapCanvas.height) {
            resolution = dw / mapCanvas.width;
        } else {
            resolution = dh / mapCanvas.height;
        }

        //热点半径
        this.useRadius = this.useGeoUnit ? parseInt(this.radius / resolution) : this.radius;

        for (var i = 0; i < this.features.length; i++) {
            var feature = this.features[i];
            var point = feature.geometry;

            //可通过bounds过滤需绘制的features以优化性能，但mapboxgl旋转获取得bounds不适

            var pixelPoint = this.getPixelXY(new LonLat(point.x, point.y));
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

            x = Math.floor(pixelPoint.x);
            y = Math.floor(pixelPoint.y);
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

    }

    /**
     * @function HeatMapLayer.prototype.draw
     * @description 绘制热点图。
     * @param {Array} data - convertToPixelPoints方法计算出的点。
     * @private
     */
    draw(data, maxWeight) {
        if (this.maxHeight > 0 && this.maxWidth > 0) {
            //清空
            var ctx = this.canvasContext;
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

    }

    /**
     * @function HeatMapLayer.prototype.colorize
     * @description 根据渐变色重置热点图rgb值。
     * @param {Array} pixels - 像素 RGBA 值。
     * @param {Array} gradient - 渐变 canvas.getImageData.data。
     * @private
     */
    colorize(pixels, gradient) {
        for (var i = 0, j; i < pixels.length; i += 4) {
            j = pixels[i + 3] * 4;
            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    }

    /**
     * @function HeatMapLayer.drawCircle
     * @description 绘制热点半径圆。
     * @param {number} r - 热点半径。
     * @private
     */
    drawCircle(r) {
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
    }

    /**
     * @function HeatMapLayer.createGradient
     * @description 根据 options.colors 设置渐变。
     * @private
     */
    createGradient() {
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
    }


    /**
     * @function HeatMapLayer.prototype.getPixelXY
     * @description 转换地理坐标为相对于当前窗口左上角的像素坐标。
     * @param {number} x - 热点的像素 x 坐标。
     * @param {number} y - 热点的像素 y 坐标。
     */
    getPixelXY(coordinate) {
        var pixelP, map = this.map;
        if (coordinate instanceof Point || coordinate instanceof GeoText) {
            let tempPoint = map.project(new mapboxgl.LngLat(coordinate.x, coordinate.y));
            pixelP = {x: parseInt(tempPoint.x), y: parseInt(tempPoint.y)};
        }
        if (coordinate instanceof LonLat) {
            let tempPoint = map.project(new mapboxgl.LngLat(coordinate.lon, coordinate.lat));
            pixelP = {x: parseInt(tempPoint.x), y: parseInt(tempPoint.y)};
        }
        return pixelP;
    }

    /**
     * @function HeatMapLayer.prototype.toiClientFeature
     * @description 转为 iClient 要素。
     * @param {GeoJSONObject} features - 待添加的要素数组。
     */
    toiClientFeature(features) {
        if (!CommonUtil.isArray(features)) {
            features = [features];
        }
        let featuresTemp = [];
        for (let i = 0; i < features.length; i++) {
            if (features[i] instanceof FeatureVector) {
                // 若是 FeatureVector 直接返回
                featuresTemp.push(features[i]);
            } else if (["FeatureCollection", "Feature", "Geometry"].indexOf(features[i].type) != -1) {
                //GeoJSON 规范数据类型
                let format = new GeoJSONFormat();
                featuresTemp = featuresTemp.concat(format.read(features[i]));
            } else if (features[i].geometry && features[i].geometry.parts) {
                //iServer服务器返回数据格式
                featuresTemp.push(ServerFeature.fromJson(features[i]).toFeature());
            } else {
                throw new Error(`Features[${i}]'s type does not match, please check.`);
            }
        }
        return featuresTemp;
    }

    /**
     * @function HeatMapLayer.prototype.removeFeatures
     * @description 移除指定的热点信息。
     * @param {Array.<FeatureVector>} features - 热点信息数组。
     */
    removeFeatures(features) {
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
         * @description 要素删除之后触发。
         * @property {Array.<FeatureVector>} features - 需要被删除的要素。
         * @property {boolean} succeed - 要素删除成功与否。
         */
        this.fire(this.EVENT_TYPES[1], {features: heatPointsFailedRemoved, succeed: succeed});
        this.refresh();
    }

    /**
     * @function HeatMapLayer.prototype.removeAllFeatures
     * @description 移除全部的热点信息。
     */
    removeAllFeatures() {
        this.features = [];
        this.refresh();
    }

    /**
     * @function HeatMapLayer.prototype.moveTo
     * @description 将图层移动到某个图层之前。
     * @param {string} layerID - 待插入的图层ID。
     * @param {boolean} [before=true] - 是否将本图层插入到图层 id 为 layerID 的图层之前(如果为 false 则将本图层插入到图层 id 为 layerID 的图层之后)。
     */
    moveTo(layerID, before) {
        var layer = document.getElementById(this.rootCanvas.id);
        before = before !== undefined ? before : true;
        if (before) {
            var beforeLayer = document.getElementById(layerID);
            if (layer && beforeLayer) {
                beforeLayer.parentNode.insertBefore(layer, beforeLayer);
            }
            return;
        }
        var nextLayer = document.getElementById(layerID);
        if (layer) {
            if (nextLayer.nextSibling) {
                nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                return;
            }
            nextLayer.parentNode.appendChild(layer);
        }
    }

    /**
     * @function HeatMapLayer.prototype.setVisibility
     * @description 设置图层可见性。
     * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
     */
    setVisibility(visibility) {
        if (this.rootCanvas && visibility !== this.visibility) {
            this.visibility = visibility;
            this.rootCanvas.style.display = visibility ? "block" : "none";
        }
    }

    //事件绑定
    _resizeEvent() {
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var canvas = this.map.getCanvas();
        this.rootCanvas.style.width = canvas.style.width;
        this.rootCanvas.style.height = canvas.style.height;
        this.rootCanvas.width = this.maxWidth = parseInt(canvas.width);
        this.rootCanvas.height = this.maxHeight = parseInt(canvas.height);
        let devicePixelRatio = window.devicePixelRatio || 1;
        devicePixelRatio !== 1 && this.canvasContext && this.canvasContext.scale(devicePixelRatio, devicePixelRatio);
        this.refresh();
    }

    _zoomStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.zooming = true;
        this._hide();
    }

    _zoomEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.zooming = false;
        this._show();
    }

    _rotateStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rotating = true;
    }

    _rotateEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        if (this.map.getPitch() !== 0) {
            this._hide();
        }
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var tPitch = this.map.getPitch() - this.startPitch;
        var tBearing = -this.map.getBearing() + this.startBearing;
        this.rootCanvas.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)'
    }

    _rotateEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rotating = false;
        this._show();
    }

    _dragEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this._hide();
    }

    _moveEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rootCanvas.style.transform = '';
        this.refresh();
        this._show();
    }

    _moveStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.startPitch = this.map.getPitch();
        this.startBearing = this.map.getBearing();
        var startMovePoint = this.map.project(new mapboxgl.LngLat(0, 0));
        this.startMoveX = startMovePoint.x;
        this.startMoveY = startMovePoint.y;
    }

    _moveEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            this.refresh();
            return;
        }
        if (this.rotating || this.zooming) {
            return;
        }
        if (this.map.getPitch() !== 0) {
            this._hide();
        }
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var tPitch = this.map.getPitch() - this.startPitch;
        var tBearing = -this.map.getBearing() + this.startBearing;
        var endMovePoint = this.map.project(new mapboxgl.LngLat(0, 0));
        var tMoveX = endMovePoint.x - this.startMoveX;
        var tMoveY = endMovePoint.y - this.startMoveY;
        this.rootCanvas.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)' + ' translate3d(' + tMoveX + 'px, ' + tMoveY + 'px, 0px)';
    }

    _hide() {
        this.rootCanvas.style.display = 'none';
    }

    _show() {
        this.rootCanvas.style.display = 'block';
    }

}
