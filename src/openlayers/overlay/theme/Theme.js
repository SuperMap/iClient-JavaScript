import ol from 'openlayers';
import {Util} from '../../core/Util';
import {
    CommonUtil,
    ServerFeature,
    GeometryVector,
    GeoJSON as GeoJSONFormat,
    LonLat,
    GeometryPoint,
    LineString,
    LinearRing,
    Polygon,
    GeoText,
    LevelRenderer
} from '@supermap/iclient-common';
import {ThemeFeature} from './ThemeFeature';

/**
 * @class ol.source.Theme
 * @classdesc 专题图基类。
 * @private
 * @param name - {string} 专题图图层名称
 * @param opt_option-{Object} 可选参数，如：</br>
 *        id - {string} 专题图层ID。</br>
 *        map - {ol.Map} 当前openlayers的map对象。</br>
 *        opacity - {number} 图层透明的。</br>
 *        attributions - {string|Object} 版权信息。 </br>
 *        logo - {string} Logo</br>
 *        projection - [{ol.proj.Projection}]{@linkdoc-openlayers/ol.proj.Projection} 投影信息。</br>
 *        ratio - {number} 视图比, 1表示画布是地图视口的大小，2表示地图视口的宽度和高度的两倍，依此类推。 必须是1或更高。 默认值是1.5。</br>
 *        resolutions - {Array} 分辨率数组。</br>
 *        state - {[ol.source.html#.State]}{@linkdoc-openlayers/ol.source.html#.State} 资源状态。
 * @extends ol.source.ImageCanvas{@linkdoc-openlayers/ol.source.ImageCanvas}
 */
export class Theme extends ol.source.ImageCanvas {

    constructor(name, opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || new ol.Attribution({
                html: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
            }),
            canvasFunction: canvasFunctionInternal_,
            logo: options.logo,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        this.id = options.id ? options.id : CommonUtil.createUniqueID("themeLayer_");

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
            var mapWidth = size[0] * pixelRatio;
            var mapHeight = size[1] * pixelRatio;
            if (!this.context) {
                this.context = Util.createCanvasContext2D(mapWidth, mapHeight);
            }
            if (!this.features) {
                return this.context.canvas;
            }
            this.pixelRatio = pixelRatio;

            var width = this.map.getSize()[0] * pixelRatio;
            var height = this.map.getSize()[1] * pixelRatio;
            this.offset = [(mapWidth - width) / 2 / pixelRatio, (mapHeight - height) / 2 / pixelRatio];
            if (!this.notFirst) {
                this.redrawThematicFeatures(extent);
                this.notFirst = true;
            }
            this.div.id = this.id;
            this.div.className = "themeLayer";
            this.div.style.width = mapWidth + "px";
            this.div.style.height = mapHeight + "px";
            this.map.getViewport().appendChild(this.div);
            this.renderer.resize();
            this.map.getViewport().removeChild(this.div);
            this.themeCanvas = this.renderer.painter.root.getElementsByTagName('canvas')[0];
            this.themeCanvas.width = mapWidth;
            this.themeCanvas.height = mapHeight;
            this.themeCanvas.style.width = mapWidth + "px";
            this.themeCanvas.style.height = mapHeight + "px";
            this.themeCanvas.getContext('2d').clearRect(0, 0, mapWidth, mapHeight);

            var highLightContext = this.renderer.painter._layers.hover.ctx;
            var highlightCanvas = highLightContext.canvas;
            var copyHighLightContext = Util.createCanvasContext2D(mapWidth, mapHeight);
            copyHighLightContext.drawImage(highlightCanvas, 0, 0, highlightCanvas.width, highlightCanvas.height, 0, 0, mapWidth, mapHeight);

            this.redrawThematicFeatures(extent);
            var canvas = this.context.canvas;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = mapWidth;
            canvas.height = mapHeight;
            canvas.style.width = mapWidth + "px";
            canvas.style.height = mapHeight + "px";
            this.context.drawImage(this.themeCanvas, 0, 0, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight);
            this.context.drawImage(copyHighLightContext.canvas, 0, 0, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight);
            return this.context.canvas;
        }

        this.canvasFunctionInternal_ = canvasFunctionInternal_;
        this.EVENT_TYPES = ["loadstart", "loadend", "loadcancel",
            "visibilitychanged", "move", "moveend", "added", "removed",
            "tileloaded", "beforefeaturesadded", "featuresadded", "featuresremoved"];
        this.features = [];
        this.TFEvents = options.TFEvents || [];
        this.map = options.map;
        var size = this.map.getSize();
        this.div = document.createElement('div');
        this.map.getViewport().appendChild(this.div);
        this.div.style.width = size[0] + "px";
        this.div.style.height = size[1] + "px";
        this.setOpacity(options.opacity);
        this.levelRenderer = new LevelRenderer();
        this.movingOffset = [0, 0];
        this.renderer = this.levelRenderer.init(this.div);
        this.map.getViewport().removeChild(this.div);
        this.renderer.clear();
        //处理用户预先（在图层添加到 map 前）监听的事件
        this.addTFEvents();
    }

    /**
     * @function ol.source.Theme.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.EVENT_TYPES = null;
        this.isBaseLayer = null;
        this.TFEvents = null;
        this.destroyFeatures();
        this.features = null;
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.renderer = null;
        this.levelRenderer = null;
        this.movingOffset = null;
        this.currentMousePosition = null;
    }

    /**
     * @function ol.source.Theme.prototype.destroyFeatures
     * @description 销毁某个要素
     * @param features -{Object} 将被销毁的要素
     */
    destroyFeatures(features) {
        var all = (features == undefined);
        if (all) {
            features = this.features;
        }
        if (features) {
            this.removeFeatures(features);
            for (var i = features.length - 1; i >= 0; i--) {
                features[i].destroy();
            }
        }
    }

    /**
     * @function ol.source.Theme.prototype.setOpacity
     * @description 设置图层的不透明度,取值[0-1]之间。
     * @param opacity - {number} 不透明度
     */
    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.div;
            CommonUtil.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                this.dispatchEvent({type: 'changelayer', value: {layer: this, property: "opacity"}});
            }
        }
    }

    /**
     * @function ol.source.Theme.prototype.addFeatures
     * @param features -{ol.supermap.ThemeFeature|Object|ol.Feature} 待转要素包括 ol.supermap.ThemeFeature 类型、GeoJOSN 规范数据类型，以及ol.Feature
     * @description 抽象方法，可实例化子类必须实现此方法。向专题图图层中添加数据 ,
     *              专题图仅接收 SuperMap.Feature.Vector 类型数据，
     *              feature 将储存于 features 属性中，其存储形式为数组。
     */
    addFeatures(features) { // eslint-disable-line no-unused-vars

    }

    /**
     * @function ol.source.Theme.prototype.removeFeatures
     * @param features - {Array<SuperMap.Feature.Vector>} 要删除feature的数组。
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     *              参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
     *              如果无法确定 feature 数组，则可以调用 removeAllFeatures 来删除所有feature。
     *              如果要删除的 feature 数组中的元素特别多，推荐使用 removeAllFeatures，
     *              删除所有feature后再重新添加。这样效率会更高。
     */
    removeFeatures(features) {
        if (!features || features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        if (!(CommonUtil.isArray(features))) {
            features = [features];
        }
        var featuresFailRemoved = [];
        for (var i = features.length - 1; i >= 0; i--) {
            var feature = features[i];
            //如果我们传入的feature在features数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。
            var findex = CommonUtil.indexOf(this.features, feature);
            if (findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            this.features.splice(findex, 1);
        }
        var drawFeatures = [];
        for (var hex = 0, len = this.features.length; hex < len; hex++) {
            feature = this.features[hex];
            drawFeatures.push(feature);
        }
        this.features = [];
        this.addFeatures(drawFeatures);
        //绘制专题要素
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getView().calculateExtent());
        }
        var succeed = featuresFailRemoved.length == 0 ? true : false;
        this.dispatchEvent({type: "featuresremoved", value: {features: featuresFailRemoved, succeed: succeed}});
    }

    /**
     * @function ol.source.Theme.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        if (this.renderer) {
            this.renderer.clear();
        }
        this.features = [];
        this.dispatchEvent({type: 'featuresremoved', value: {features: [], succeed: true}});
    }

    /**
     * @function ol.source.Theme.prototype.getFeatures
     * @description 查看当前图层中的有效数据。
     * @return {SuperMap.Feature.Vector} 用户加入图层的有效数据。
     */
    getFeatures() {
        var len = this.features.length;
        var clonedFeatures = new Array(len);
        for (var i = 0; i < len; ++i) {
            clonedFeatures[i] = this.features[i];
            //clonedFeatures[i] = this.features[i].clone();
        }
        return clonedFeatures;
    }

    /**
     * @function ol.source.Theme.prototype.getFeatureBy
     * @description 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，
     *              返回此 feature（并且只返回第一个）。
     * @param property - {string} feature 的某个属性名称。
     * @param value - {string} property 所对应的值。
     * @return {SuperMap.Feature.Vector} 第一个匹配属性和值的矢量要素。
     */
    getFeatureBy(property, value) {
        var feature = null;
        for (var id in this.features) {
            if (this.features[id][property] === value) {
                feature = this.features[id];
                //feature = this.features[id].clone();
                break;
            }
        }
        return feature;
    }

    /**
     * @function ol.source.Theme.prototype.getFeatureById
     * @description 通过给定一个 id，返回对应的矢量要素。
     * @param featureId - {string} 矢量要素的属性 id。
     * @return {SuperMap.Feature.Vector} 对应id的 feature，如果不存在则返回 null。
     */
    getFeatureById(featureId) {
        return this.getFeatureBy('id', featureId);
    }

    /**
     * @function ol.source.Theme.prototype.getFeaturesByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param attrName - {string} 属性的 key。
     * @param attrValue - {string} 矢量要素的属性 id。
     * @return {Array<SuperMap.Feature.Vector>}一个匹配的 feature 数组。
     */
    getFeaturesByAttribute(attrName, attrValue) {
        var feature,
            foundFeatures = [];
        for (var id in this.features) {
            feature = this.features[id];
            //feature = this.features[id].clone();
            if (feature && feature.attributes) {
                if (feature.attributes[attrName] === attrValue) {
                    foundFeatures.push(feature);
                }
            }
        }
        return foundFeatures;
    }

    /**
     * @function ol.source.Theme.prototype.redrawThematicFeatures
     * @description 抽象方法，可实例化子类必须实现此方法。重绘专题要素。
     * @param extent - {Array} 当前级别下计算出的地图范围
     */
    redrawThematicFeatures(extent) { //eslint-disable-line no-unused-vars
    }

    /**
     * @function ol.source.Theme.prototype.on
     * @description 添加专题要素事件监听。支持的事件包括: click、mousedown、mousemove、mouseout、mouseover、mouseup。
     * @param event - {string} 事件名称。
     * @param callback - {Function} 事件回调函数。
     */
    on(event, callback) {
        var cb = callback;
        if (!this.renderer) {
            var evn = [];
            evn.push(event);
            evn.push(cb);
            this.TFEvents.push(evn);
        } else {
            this.renderer.on(event, cb);
        }
    }

    /**
     * @function ol.source.Theme.prototype.fire
     * @description 添加专题要素事件监听
     * @param type - {string} 事件类型。
     * @param event - {string} 事件名称。
     */
    fire(type, event) {
        if (!this.offset) {
            return;
        }
        event = event.originalEvent;
        var x = this.getX(event);
        var y = this.getY(event);
        var rotation = -this.map.getView().getRotation();
        var center = this.map.getPixelFromCoordinate(this.map.getView().getCenter());
        var scaledP = this.scale([x, y], center, this.pixelRatio);
        var rotatedP = this.rotate(scaledP, rotation, center);
        var resultP = [rotatedP[0] + this.offset[0], rotatedP[1] + this.offset[1]];
        var offsetEvent = document.createEvent('Event');
        offsetEvent.initEvent('pointermove', true, true);
        offsetEvent.offsetX = resultP[0];
        offsetEvent.offsetY = resultP[1];
        offsetEvent.layerX = resultP[0];
        offsetEvent.layerY = resultP[1];
        offsetEvent.clientX = resultP[0];
        offsetEvent.clientY = resultP[1];
        offsetEvent.x = x;
        offsetEvent.y = y;
        if (type === 'click') {
            this.renderer.handler._clickHandler(offsetEvent);
        }
        if (type === 'dblclick') {
            this.renderer.handler._dblclickHandler(offsetEvent);
        }
        if (type === 'onmousewheel') {
            this.renderer.handler._mousewheelHandler(offsetEvent);
        }
        if (type === 'mousemove') {
            this.renderer.handler._mousemoveHandler(offsetEvent);
            this.changed();
        }
        if (type === 'onmouseout') {
            this.renderer.handler._mouseoutHandler(offsetEvent);
        }
        if (type === 'onmousedown') {
            this.renderer.handler._mousedownHandler(offsetEvent);
        }
        if (type === 'onmouseup') {
            this.renderer.handler._mouseupHandler(offsetEvent);
        }

    }

    getX(e) {
        return typeof e.zrenderX != 'undefined' && e.zrenderX
            || typeof e.offsetX != 'undefined' && e.offsetX
            || typeof e.layerX != 'undefined' && e.layerX
            || typeof e.clientX != 'undefined' && e.clientX;
    }

    getY(e) {
        return typeof e.zrenderY != 'undefined' && e.zrenderY
            || typeof e.offsetY != 'undefined' && e.offsetY
            || typeof e.layerY != 'undefined' && e.layerY
            || typeof e.clientY != 'undefined' && e.clientY;
    }

    /**
     * @function ol.source.Theme.prototype.un
     * @description 移除专题要素事件监听
     * @param event - {string} 事件名称。
     * @param callback - {Function} 事件回调函数。
     */
    un(event, callback) {
        var cb = callback;
        if (!this.renderer) {
            var tfEs = this.TFEvents;
            var len = tfEs.length;
            var newtfEs = [];
            for (var i = 0; i < len; i++) {
                var tfEs_i = tfEs[i];

                if (!(tfEs_i[0] === event && tfEs_i[1] === cb)) {
                    newtfEs.push(tfEs_i)
                }
            }
            this.TFEvents = newtfEs;
        } else {
            this.renderer.un(event, cb);
        }
    }

    /**
     * @function ol.source.Theme.prototype.addTFEvents
     * @description 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
     */
    addTFEvents() {
        var tfEs = this.TFEvents;
        var len = tfEs.length;
        for (var i = 0; i < len; i++) {
            this.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    }

    /**
     * @function ol.source.Theme.prototype.getLocalXY
     * @description 获取坐标系统
     * @param coordinate - {Object} 坐标位置。
     */
    getLocalXY(coordinate) {
        var pixelP, map = this.map;
        if (coordinate instanceof GeometryPoint || coordinate instanceof GeoText) {
            pixelP = map.getPixelFromCoordinate([coordinate.x, coordinate.y]);
        }
        if (coordinate instanceof LonLat) {
            pixelP = map.getPixelFromCoordinate([coordinate.lon, coordinate.lat]);
        }
        var rotation = -map.getView().getRotation();
        var center = map.getPixelFromCoordinate(map.getView().getCenter());
        var rotatedP = pixelP;
        if (this.pixelRatio) {
            rotatedP = this.scale(pixelP, center, this.pixelRatio);
        }
        if (pixelP && center) {
            rotatedP = this.rotate(rotatedP, rotation, center);
        }
        if (this.offset && rotatedP) {
            return [rotatedP[0] + this.offset[0], rotatedP[1] + this.offset[1]];
        }
        return rotatedP;
    }

    /**
     * @function ol.source.Theme.prototype.rotate
     * @description 获取某像素坐标点pixelP绕中心center逆时针旋转rotation弧度后的像素点坐标。
     * @param pixelP - {number} 像素坐标点位置。
     * @param rotation - {number} 旋转角度
     * @param center - {number} 中心位置。
     */
    rotate(pixelP, rotation, center) {
        var x = Math.cos(rotation) * (pixelP[0] - center[0]) - Math.sin(rotation) * (pixelP[1] - center[1]) + center[0];
        var y = Math.sin(rotation) * (pixelP[0] - center[0]) + Math.cos(rotation) * (pixelP[1] - center[1]) + center[1];
        return [x, y];
    }

    /**
     * @function ol.source.Theme.prototype.scale
     * @description 获取某像素坐标点pixelP相对于中心center进行缩放scaleRatio倍后的像素点坐标。
     * @param pixelP - {Object} 像素点
     * @param center - {Object} 中心点
     * @param scaleRatio - {number} 缩放倍数
     * @return {Array<number>} 返回数组形比例
     */
    scale(pixelP, center, scaleRatio) {
        var x = (pixelP[0] - center[0]) * scaleRatio + center[0];
        var y = (pixelP[1] - center[1]) * scaleRatio + center[1];
        return [x, y];
    }

    /**
     * @function ol.source.Theme.prototype.toFeature
     * @description 转为 iClient 要素
     * @param features -{ol.supermap.ThemeFeature|Object|ol.Feature} 待转要素包括 ol.supermap.ThemeFeature 类型、GeoJOSN 规范数据类型，以及ol.Feature
     * @return {SuperMap.Feature.Vector} 转换后的iClient要素
     */
    toFeature(features) {
        if (CommonUtil.isArray(features)) {
            var featuresTemp = [];
            for (let i = 0; i < features.length; i++) {
                //mapboxgl.supermap.ThemeFeature 类型
                if (features[i] instanceof ThemeFeature) {
                    featuresTemp.push(features[i].toFeature());
                    continue;
                }
                //ol.Feature 数据类型
                if (features[i] instanceof ol.Feature) {
                    featuresTemp.push(this._toFeature(features[i]));
                    continue;
                }
                // 若是 GeometryVector 直接返回
                if (features[i] instanceof GeometryVector) {
                    featuresTemp.push(features[i]);
                    continue;
                }
                //iServer服务器返回数据格式
                featuresTemp.push(new ServerFeature.fromJson(features[i]).toFeature());
            }
            return featuresTemp;
        }
        //GeoJOSN 规范数据类型
        if (["FeatureCollection", "Feature", "Geometry"].indexOf(features.type) != -1) {
            var format = new GeoJSONFormat();
            return format.read(features, "FeatureCollection");
        }
        throw new Error(`features's type is not be supported.`);
    }

    _toFeature(feature) {
        var geometry,
            attributes = feature.getProperties()["Properties"] ? feature.getProperties()["Properties"] : {};
        //热点图支支持传入点对象要素
        if (feature.getGeometry() instanceof ol.geom.Point) {
            geometry = new GeometryPoint(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
            //固定属性字段为 "Properties"
        }
        if (geometry instanceof ol.geom.LineString) {
            let coords = geometry.getCoordinates();
            let points = [];
            for (let i = 0; i < coords.length; i++) {
                points.push(new GeometryPoint(coords[i][0], coords[i][1]));
            }
            geometry = new LineString(points);
        }
        if (geometry instanceof ol.geom.Polygon) {
            let coords = geometry.getCoordinates();
            let points = [];
            for (let i = 0; i < coords.length; i++) {
                points.push(new GeometryPoint(coords[i][0], coords[i][1]));
            }
            var linearRings = new LinearRing(points);
            geometry = new Polygon([linearRings]);
        }
        if (geometry && geometry.length === 3) {
            geometry = new GeoText(geometry[0], geometry[1], geometry[2]);
        }
        return new GeometryVector(geometry, attributes);
    }

}

ol.source.Theme = Theme;